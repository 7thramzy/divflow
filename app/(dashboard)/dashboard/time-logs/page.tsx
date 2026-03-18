"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { api, extractPaginatedData, apiGet, apiPost, apiDelete } from "@/lib/api";
import { TimeLog, PaginatedResponse } from "@/lib/types";
import { Pagination } from "@/components/ui/Pagination";
import { SortableHeader } from "@/components/ui/SortableHeader";
import { SkeletonTable, SkeletonChart } from "@/components/ui/SkeletonTable";
import { Modal } from "@/components/ui/Modal";
import { CHART_COLORS } from "@/lib/constants";
import { exportToCSV } from "@/lib/utils";
import { Plus, X, Download, RefreshCw, Clock, MoreVertical, Trash2 } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, Legend, Cell } from "recharts";

function TimeLogsPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") || 1);
  const perPage = Number(searchParams.get("per_page") || 20);
  const userFilter = searchParams.get("user_id") || "";
  const taskFilter = searchParams.get("task_id") || "";
  const projectFilter = searchParams.get("project_id") || "";
  const dateFrom = searchParams.get("date_from") || "";
  const dateTo = searchParams.get("date_to") || "";
  const sortBy = searchParams.get("sort_by") || "work_date";
  const sortOrder = (searchParams.get("sort_order") || "desc") as "asc" | "desc";

  const [data, setData] = useState<PaginatedResponse<TimeLog> | null>(null);
  const [users, setUsers] = useState<{ id: number; name: string }[]>([]);
  const [tasks, setTasks] = useState<{ id: number; title: string; project_id: number }[]>([]);
  const [projects, setProjects] = useState<{ id: number; project_name: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [logForm, setLogForm] = useState({ task_id: "", actual_hours: "", work_date: "", comment: "" });
  const [logSubmitting, setLogSubmitting] = useState(false);

  const pushParams = useCallback((updates: Record<string, string | number>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([k, v]) => {
      if (v === "" || v === null || v === undefined) params.delete(k);
      else params.set(k, String(v));
    });
    router.push(`?${params.toString()}`);
  }, [router, searchParams]);

  const fetchLogs = useCallback(async () => {
    setIsLoading(true); setIsError(false);
    try {
      const params: Record<string, string | number> = { page, per_page: perPage, sort_by: sortBy, sort_order: sortOrder };
      if (userFilter) params.user_id = userFilter;
      if (taskFilter) params.task_id = taskFilter;
      if (projectFilter) params.project_id = projectFilter;
      if (dateFrom) params.date_from = dateFrom;
      if (dateTo) params.date_to = dateTo;
      
      const res = await api.get("/time-logs", { params });
      const paginatedData = extractPaginatedData<TimeLog>(res);
      setData(paginatedData);
    } catch (error: unknown) { 
      console.error("Failed to fetch time logs:", error);
      setIsError(true);
      const err = error as { isNetworkError?: boolean; message?: string };
      if (err.isNetworkError) {
        alert(err.message || "فشل الاتصال بالخادم");
      }
    } finally { setIsLoading(false); }
  }, [page, perPage, userFilter, taskFilter, projectFilter, dateFrom, dateTo, sortBy, sortOrder]);

  useEffect(() => { fetchLogs(); }, [fetchLogs]);
  
  useEffect(() => {
    const fetchRelatedData = async () => {
      try {
        const [usersRes, tasksRes, projectsRes] = await Promise.all([
          apiGet<{ id: number; name: string }[]>("/admin/users", { params: { per_page: 200 } }),
          apiGet<{ id: number; title: string; project_id: number }[]>("/tasks", { params: { per_page: 200 } }),
          apiGet<{ id: number; project_name: string }[]>("/projects", { params: { per_page: 200 } }),
        ]);
        setUsers(usersRes || []);
        setTasks(tasksRes || []);
        setProjects(projectsRes || []);
      } catch (error) {
        console.error("Failed to fetch related data:", error);
      }
    };
    fetchRelatedData();
  }, []);
  useEffect(() => {
    const close = () => setActiveMenu(null);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("هل أنت متأكد من حذف هذا السجل؟")) return;
    try { 
      await apiDelete(`/time-logs/${id}`); 
      fetchLogs(); 
    } catch (error: unknown) { 
      const err = error as { message?: string };
      alert(err.message || "حدث خطأ أثناء حذف السجل"); 
    }
  };

  const handleCreateLog = async (e: React.FormEvent) => {
    e.preventDefault();
    setLogSubmitting(true);
    try {
      await apiPost("/time-logs", {
        task_id: Number(logForm.task_id),
        actual_hours: Number(logForm.actual_hours),
        work_date: logForm.work_date,
        comment: logForm.comment || null,
      });
      setCreateOpen(false);
      setLogForm({ task_id: "", actual_hours: "", work_date: "", comment: "" });
      fetchLogs();
    } catch (error: unknown) { 
      const err = error as { message?: string };
      alert(err.message || "حدث خطأ أثناء إنشاء السجل"); 
    }
    finally { setLogSubmitting(false); }
  };

  const logs = data?.data || [];
  const hasFilters = userFilter || taskFilter || projectFilter || dateFrom || dateTo;

  // Daily bar chart (last 30 days)
  const dailyMap: Record<string, number> = {};
  logs.forEach(l => {
    const d = l.work_date?.split("T")[0] || l.work_date;
    if (d) dailyMap[d] = (dailyMap[d] || 0) + Number(l.actual_hours || 0);
  });
  const dailyData = Object.entries(dailyMap).sort().slice(-30).map(([date, hours]) => ({ date, hours }));

  // Project comparison line chart
  const projMap: Record<string, { estimated: number; actual: number }> = {};
  logs.forEach(l => {
    const pid = l.task?.project_id ? `مشروع #${l.task.project_id}` : `مشروع #${l.task_id}`;
    if (!projMap[pid]) projMap[pid] = { estimated: 0, actual: 0 };
    projMap[pid].actual += Number(l.actual_hours || 0);
    projMap[pid].estimated += Number(l.task?.estimated_hours || 0);
  });
  const projData = Object.entries(projMap).map(([name, v]) => ({ name, ...v }));

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">سجلات الوقت</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">تتبع أوقات العمل المسجلة على المهام</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => exportToCSV(logs.map(l => ({ الموظف: l.user?.name || l.user_id, المهمة: l.task_id, المشروع: l.task?.project_id, الساعات: l.actual_hours, التاريخ: l.work_date, التعليق: l.comment })), "time-logs")} className="btn-ghost flex items-center gap-1.5 text-sm" aria-label="تصدير CSV">
            <Download className="h-4 w-4" /> تصدير
          </button>
          <button onClick={() => setCreateOpen(true)} className="btn-primary"><Plus className="h-4 w-4" /> تسجيل وقت</button>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-4 flex flex-col sm:flex-row gap-3 flex-wrap">
        <select value={userFilter} onChange={e => pushParams({ user_id: e.target.value, page: 1 })} className="select-base w-auto min-w-[130px]" aria-label="الموظف">
          <option value="">جميع الموظفين</option>
          {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
        </select>
        <select value={projectFilter} onChange={e => pushParams({ project_id: e.target.value, page: 1 })} className="select-base w-auto min-w-[130px]" aria-label="المشروع">
          <option value="">جميع المشاريع</option>
          {projects.map(p => <option key={p.id} value={p.id}>{p.project_name}</option>)}
        </select>
        <select value={taskFilter} onChange={e => pushParams({ task_id: e.target.value, page: 1 })} className="select-base w-auto min-w-[130px]" aria-label="المهمة">
          <option value="">جميع المهام</option>
          {tasks.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
        </select>
        <div className="flex items-center gap-2">
          <input type="date" value={dateFrom} onChange={e => pushParams({ date_from: e.target.value, page: 1 })} className="input-base w-auto" aria-label="من تاريخ" />
          <span className="text-gray-400 text-sm">—</span>
          <input type="date" value={dateTo} onChange={e => pushParams({ date_to: e.target.value, page: 1 })} className="input-base w-auto" aria-label="إلى تاريخ" />
        </div>
        {hasFilters && (
          <button onClick={() => router.push("?page=1")} className="btn-ghost flex items-center gap-1.5 text-sm text-red-600 border-red-200 hover:bg-red-50">
            <X className="h-4 w-4" /> إعادة تعيين
          </button>
        )}
      </div>

      {/* Charts */}
      {isLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4"><SkeletonChart height={200} /><SkeletonChart height={200} /></div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="card p-5">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">ساعات العمل اليومية (آخر 30 يوم)</h3>
            {dailyData.length < 2 ? <p className="text-center text-xs text-gray-400 py-8">لا توجد بيانات كافية</p> : (
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={dailyData}>
                  <XAxis dataKey="date" tick={{ fontSize: 9 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Bar dataKey="hours" name="ساعات" fill={CHART_COLORS[1]} radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
          <div className="card p-5">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">المقدّر مقابل الفعلي لكل مشروع</h3>
            {projData.length < 2 ? <p className="text-center text-xs text-gray-400 py-8">لا توجد بيانات كافية</p> : (
              <ResponsiveContainer width="100%" height={160}>
                <LineChart data={projData}>
                  <XAxis dataKey="name" tick={{ fontSize: 9 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="estimated" name="مقدّر" stroke={CHART_COLORS[0]} strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="actual" name="فعلي" stroke={CHART_COLORS[1]} strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      )}

      {/* Table */}
      <div className="card overflow-hidden">
        {isLoading ? <SkeletonTable cols={6} rows={5} /> : isError ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <p className="text-gray-500">فشل تحميل البيانات</p>
            <button onClick={fetchLogs} className="btn-ghost flex items-center gap-2"><RefreshCw className="h-4 w-4" /> إعادة المحاولة</button>
          </div>
        ) : logs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Clock className="h-12 w-12 text-gray-300 dark:text-gray-600" />
            <p className="text-gray-500 font-medium">لا توجد سجلات وقت</p>
            <button onClick={() => setCreateOpen(true)} className="btn-primary text-sm"><Plus className="h-4 w-4" /> تسجيل وقت</button>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm" aria-label="جدول سجلات الوقت">
                <caption className="sr-only">سجلات الوقت</caption>
                <thead className="bg-gray-50 dark:bg-gray-800/50">
                  <tr>
                    <th className="px-4 py-3 text-right hidden lg:table-cell">الموظف</th>
                    <th className="px-4 py-3 text-right">المهمة</th>
                    <th className="px-4 py-3 text-right hidden md:table-cell">المشروع</th>
                    <th className="px-4 py-3 text-right"><SortableHeader label="الساعات" field="actual_hours" sortBy={sortBy} sortOrder={sortOrder} onSort={f => pushParams({ sort_by: f, sort_order: sortBy === f && sortOrder === "asc" ? "desc" : "asc", page: 1 })} /></th>
                    <th className="px-4 py-3 text-right"><SortableHeader label="تاريخ العمل" field="work_date" sortBy={sortBy} sortOrder={sortOrder} onSort={f => pushParams({ sort_by: f, sort_order: sortBy === f && sortOrder === "asc" ? "desc" : "asc", page: 1 })} /></th>
                    <th className="px-4 py-3 text-right hidden md:table-cell">التعليق</th>
                    <th className="px-4 py-3 w-10" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {logs.map(l => (
                    <tr key={l.id} className="hover:bg-gray-50/60 dark:hover:bg-gray-800/30 transition-colors group">
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300 hidden lg:table-cell">{l.user?.name || `#${l.user_id || "—"}`}</td>
                      <td className="px-4 py-3">
                        <Link href={`/dashboard/tasks/${l.task_id}`} className="text-primary dark:text-accent hover:underline">مهمة #{l.task_id}</Link>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        {l.task?.project_id ? <Link href={`/dashboard/projects/${l.task.project_id}`} className="text-gray-500 hover:text-primary dark:hover:text-accent">مشروع #{l.task.project_id}</Link> : "—"}
                      </td>
                      <td className="px-4 py-3 font-semibold text-gray-900 dark:text-white"><span dir="ltr">{l.actual_hours}h</span></td>
                      <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                        <span dir="ltr">{l.work_date ? format(new Date(l.work_date), "dd/MM/yyyy") : "—"}</span>
                      </td>
                      <td className="px-4 py-3 text-gray-500 dark:text-gray-400 hidden md:table-cell truncate max-w-[200px]">{l.comment || "—"}</td>
                      <td className="px-4 py-3">
                        <div className="relative" onClick={e => e.stopPropagation()}>
                          <button onClick={() => setActiveMenu(activeMenu === l.id ? null : l.id)} className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all" aria-label="خيارات">
                            <MoreVertical className="h-4 w-4 text-gray-400" />
                          </button>
                          {activeMenu === l.id && (
                            <div className="absolute left-0 top-full mt-1 w-32 rounded-xl bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black/5 dark:ring-white/10 z-20 py-1">
                              <button onClick={() => handleDelete(l.id)} className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10">
                                <Trash2 className="h-4 w-4" /> حذف
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {data && data.last_page > 1 && (
              <Pagination currentPage={data.current_page} lastPage={data.last_page} total={data.total} perPage={data.per_page} onPageChange={p => pushParams({ page: p })} onPerPageChange={pp => pushParams({ per_page: pp, page: 1 })} />
            )}
          </>
        )}
      </div>

      {/* Create Time Log Modal */}
      <Modal open={createOpen} onClose={() => setCreateOpen(false)} title="تسجيل وقت">
        <form onSubmit={handleCreateLog} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">المهمة *</label>
            <select required className="select-base" value={logForm.task_id} onChange={e => setLogForm(f => ({ ...f, task_id: e.target.value }))}>
              <option value="">اختر المهمة</option>
              {tasks.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">الساعات الفعلية *</label>
              <input required type="number" min="0.1" step="0.1" className="input-base" value={logForm.actual_hours} onChange={e => setLogForm(f => ({ ...f, actual_hours: e.target.value }))} placeholder="0.0" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">تاريخ العمل *</label>
              <input required type="date" className="input-base" value={logForm.work_date} onChange={e => setLogForm(f => ({ ...f, work_date: e.target.value }))} />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">تعليق</label>
            <textarea rows={2} className="input-base resize-none" value={logForm.comment} onChange={e => setLogForm(f => ({ ...f, comment: e.target.value }))} placeholder="ملاحظات عن العمل المنجز" />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="submit" disabled={logSubmitting} className="btn-primary">
              {logSubmitting ? "جاري الحفظ..." : "تسجيل"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default function TimeLogsPage() {
  return <Suspense><TimeLogsPageInner /></Suspense>;
}
