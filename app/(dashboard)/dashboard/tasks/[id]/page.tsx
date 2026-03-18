"use client";

import { useEffect, useState, use } from "react";
import { api } from "@/lib/api";
import { Task, TimeLog, MediaItem } from "@/lib/types";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { SkeletonChart } from "@/components/ui/SkeletonTable";
import { CHART_COLORS } from "@/lib/constants";
import { getStatusLabel, formatCurrency, cn } from "@/lib/utils";
import Link from "next/link";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { ChevronRight, Download, Link2, CheckSquare, Clock, Users, Activity, FileText, History, Trash2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import MediaUploader from "@/components/MediaUploader";

const TABS = ["المهام الفرعية", "المكلّفون", "سجلات الوقت", "التاريخ", "الملفات"] as const;
type Tab = typeof TABS[number];

export default function TaskDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [task, setTask] = useState<Task | null>(null);
  const [subtasks, setSubtasks] = useState<Task[]>([]);
  const [timeLogs, setTimeLogs] = useState<TimeLog[]>([]);
  const [auditLogs, setAuditLogs] = useState<{ id?: number; description?: string; event?: string; causer?: { name: string }; created_at?: string }[]>([]);
  const [dependentTask, setDependentTask] = useState<Task | null>(null);
  const [parentTask, setParentTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("المهام الفرعية");

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const [taskRes, logsRes] = await Promise.all([
          api.get(`/tasks/${id}`),
          api.get(`/time-logs`, { params: { task_id: id } }).catch(() => ({ data: [] })),
        ]);
        const t: Task = taskRes.data.data || taskRes.data;
        setTask(t);
        setTimeLogs(logsRes.data.data || logsRes.data || []);
        if (t.dependent_task_id) {
          api.get(`/tasks/${t.dependent_task_id}`).then(r => setDependentTask(r.data.data || r.data)).catch(() => {});
        }
        if (t.parent_task_id) {
          api.get(`/tasks/${t.parent_task_id}`).then(r => setParentTask(r.data.data || r.data)).catch(() => {});
        }
        // subtasks
        api.get(`/tasks`, { params: { parent_task_id: id } }).then(r => setSubtasks(r.data.data || r.data || [])).catch(() => {});
        // audit logs
        api.get(`/admin/audit-logs`, { params: { task_id: id } }).then(r => setAuditLogs(r.data.data || r.data || [])).catch(() => {});
      } catch {
        // handled
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [id]);

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse" dir="rtl">
        <div className="h-8 w-64 bg-gray-200 dark:bg-gray-800 rounded" />
        <div className="h-48 bg-gray-200 dark:bg-gray-800 rounded-2xl" />
      </div>
    );
  }

  if (!task) return <div className="text-center py-20 text-gray-500" dir="rtl">المهمة غير موجودة</div>;

  const totalActual = timeLogs.reduce((s, l) => s + Number(l.actual_hours || 0), 0);
  const overBudget = totalActual > task.estimated_hours;
  
  // Progress logic: Hourly vs Fixed
  let progressPct = 0;
  if (task.billing_type === 'hourly') {
    progressPct = task.estimated_hours > 0 ? Math.min(Math.round((totalActual / task.estimated_hours) * 100), 100) : 0;
  } else {
    // Fixed tasks: if they have subtasks, progress is % of completed subtasks.
    // Otherwise, it's 0/50/100 based on status.
    if (subtasks.length > 0) {
      const completed = subtasks.filter(s => s.status === 'completed').length;
      progressPct = Math.round((completed / subtasks.length) * 100);
    } else {
      progressPct = task.status === 'completed' ? 100 : (task.status === 'in_progress' ? 50 : 0);
    }
  }

  // Daily hours chart
  const dailyMap: Record<string, number> = {};
  timeLogs.forEach(l => {
    const d = l.work_date?.split("T")[0] || l.work_date;
    if (d) dailyMap[d] = (dailyMap[d] || 0) + Number(l.actual_hours || 0);
  });
  const dailyData = Object.entries(dailyMap).sort().map(([date, hours]) => ({ date, hours }));

  const completedSubs = subtasks.filter(s => s.status === "completed").length;
  const subPct = subtasks.length > 0 ? Math.round((completedSubs / subtasks.length) * 100) : 0;

  return (
    <div className="space-y-6" dir="rtl">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 flex-wrap">
        <Link href="/dashboard/projects" className="hover:text-primary dark:hover:text-accent">المشاريع</Link>
        <ChevronRight className="h-4 w-4 rotate-180" />
        <Link href={`/dashboard/projects/${task.project_id}`} className="hover:text-primary dark:hover:text-accent">مشروع #{task.project_id}</Link>
        {task.milestone_id && (
          <>
            <ChevronRight className="h-4 w-4 rotate-180" />
            <span>مرحلة #{task.milestone_id}</span>
          </>
        )}
        {parentTask && (
          <>
            <ChevronRight className="h-4 w-4 rotate-180" />
            <Link href={`/dashboard/tasks/${parentTask.id}`} className="hover:text-primary dark:hover:text-accent truncate max-w-[120px]">{parentTask.title}</Link>
          </>
        )}
        <ChevronRight className="h-4 w-4 rotate-180" />
        <span className="text-gray-900 dark:text-white font-medium truncate max-w-[200px]">{task.title}</span>
      </nav>

      {/* Main card */}
      <div className="card p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-2 flex-1">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{task.title}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-2xl">{task.description || 'لا يوجد وصف متاح هذه المهمة.'}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <StatusBadge status={task.priority} />
            <StatusBadge status={task.status} />
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 py-4 border-y border-gray-50 dark:border-gray-800/50">
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">نوع المحاسبة</p>
            <p className="text-sm font-bold text-gray-900 dark:text-white">{getStatusLabel(task.billing_type)}</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">السعر الداخلي</p>
            <p className="text-sm font-bold text-primary">{formatCurrency(task.internal_price)}</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">الساعات المقدرة</p>
            <p className="text-sm font-bold text-gray-900 dark:text-white" dir="ltr">{task.estimated_hours}h</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">الوزن النسبي</p>
            <p className="text-sm font-bold text-gray-900 dark:text-white">{task.task_weight}%</p>
          </div>
        </div>

        {/* Dependent task info */}
        {dependentTask && (
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
            <Link2 className="h-5 w-5 text-amber-600 shrink-0" />
            <div className="text-sm">
              <span className="text-amber-700 dark:text-amber-400 font-medium">هذه المهمة تعتمد على: </span>
              <Link href={`/dashboard/tasks/${dependentTask.id}`} className="font-bold text-amber-800 dark:text-amber-300 hover:underline">
                {dependentTask.title}
              </Link>
            </div>
          </div>
        )}

        {/* Progress Section */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
               <Activity className="h-4 w-4 text-accent" />
               <span className="text-sm font-bold text-gray-700 dark:text-gray-300">تقدم المهمة</span>
            </div>
            <span className="text-lg font-black text-primary dark:text-accent" dir="ltr">{progressPct}%</span>
          </div>
          
          <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-1000 ease-out",
                overBudget && task.billing_type === 'hourly' ? "bg-red-500" : "bg-accent"
              )}
              style={{ width: `${progressPct}%` }}
            />
          </div>
          
          <div className="flex justify-between items-center text-[10px]">
            {task.billing_type === 'hourly' ? (
              <span className={cn("font-medium", overBudget ? "text-red-500" : "text-gray-500")}>
                {overBudget ? '⚠️ تم تجاوز الساعات المقدرة' : `${totalActual.toFixed(1)} من أصل ${task.estimated_hours} ساعة`}
              </span>
            ) : (
              <span className="text-gray-500">
                {subtasks.length > 0 ? `${completedSubs} من ${subtasks.length} مهام فرعية مكتملة` : `الحالة: ${getStatusLabel(task.status)}`}
              </span>
            )}
            <span className="text-gray-400">نظام المحاسبة: {getStatusLabel(task.billing_type)}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="card overflow-hidden">
        <div className="flex border-b border-gray-200 dark:border-gray-800 overflow-x-auto">
          {TABS.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 -mb-px ${activeTab === tab ? "border-primary text-primary dark:border-accent dark:text-accent" : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}>
              {tab}
            </button>
          ))}
        </div>
        <div className="p-4">
          {/* Subtasks */}
          {activeTab === "المهام الفرعية" && (
            <div className="space-y-3">
              {subtasks.length > 0 && (
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">{completedSubs}/{subtasks.length} مكتملة</span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white" dir="ltr">{subPct}%</span>
                </div>
              )}
              {subtasks.length === 0 ? (
                <p className="text-center py-8 text-gray-400">لا توجد مهام فرعية</p>
              ) : (
                <div className="space-y-2">
                  {subtasks.map(s => (
                    <div key={s.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                      <CheckSquare className={`h-4 w-4 shrink-0 ${s.status === "completed" ? "text-green-500" : "text-gray-300"}`} />
                      <Link href={`/dashboard/tasks/${s.id}`} className="flex-1 text-sm text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-accent">{s.title}</Link>
                      <StatusBadge status={s.status} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Assignees */}
          {activeTab === "المكلّفون" && (
            <div className="space-y-3">
              {(!task.assigned_users || task.assigned_users.length === 0) ? (
                <p className="text-center py-8 text-gray-400">لا يوجد مكلّفون</p>
              ) : (
                task.assigned_users.map(u => (
                  <div key={u.id} className={`flex items-center gap-3 p-3 rounded-xl ${u.pivot?.is_active ? "bg-primary-light dark:bg-primary-light/10" : "opacity-60"}`}>
                    <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {u.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{u.name}</p>
                      {u.pivot?.change_reason && <p className="text-xs text-gray-400">{u.pivot.change_reason}</p>}
                    </div>
                    {u.pivot?.is_active && <span className="badge bg-green-100 text-green-700">نشط</span>}
                    {u.pivot?.assigned_at && <span className="text-xs text-gray-400" dir="ltr">{format(new Date(u.pivot.assigned_at), "dd/MM/yyyy")}</span>}
                    <button
                      onClick={async () => {
                        if (confirm(`هل أنت متأكد من إلغاء تعيين ${u.name}؟`)) {
                          try {
                            await api.post(`/tasks/${id}/unassign`, { user_id: u.id });
                            setTask(prev => prev ? { ...prev, assigned_users: prev.assigned_users?.filter(user => user.id !== u.id) } : null);
                          } catch (error) {
                            alert("حدث خطأ أثناء إلغاء التعيين");
                          }
                        }
                      }}
                      className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors border border-transparent hover:border-red-500/20"
                      title="إلغاء التعيين"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Time logs */}
          {activeTab === "سجلات الوقت" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">إجمالي الساعات</span>
                <span className="font-bold text-gray-900 dark:text-white" dir="ltr">{totalActual.toFixed(1)}h</span>
              </div>
              {dailyData.length >= 2 ? (
                <ResponsiveContainer width="100%" height={160}>
                  <BarChart data={dailyData}>
                    <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Bar dataKey="hours" fill={CHART_COLORS[1]} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : dailyData.length > 0 ? (
                <p className="text-xs text-gray-400 text-center">لا توجد بيانات كافية للرسم البياني</p>
              ) : null}
              {timeLogs.length === 0 ? (
                <p className="text-center py-6 text-gray-400">لا توجد سجلات وقت</p>
              ) : (
                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                  {timeLogs.map(l => (
                    <div key={l.id} className="flex items-center justify-between py-2.5">
                      <div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white" dir="ltr">{l.actual_hours}h</span>
                        {l.comment && <p className="text-xs text-gray-400 mt-0.5">{l.comment}</p>}
                      </div>
                      <span className="text-xs text-gray-400" dir="ltr">{l.work_date ? format(new Date(l.work_date), "dd/MM/yyyy") : "—"}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Audit history */}
          {activeTab === "التاريخ" && (
            <div className="space-y-3">
              {auditLogs.length === 0 ? (
                <p className="text-center py-8 text-gray-400">لا يوجد سجل تغييرات</p>
              ) : (
                <div className="relative">
                  <div className="absolute right-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />
                  {auditLogs.map((log, i) => (
                    <div key={i} className="relative flex gap-4 pb-5 pr-10">
                      <div className="absolute right-2.5 top-1 h-3 w-3 rounded-full bg-accent border-2 border-white dark:border-gray-900" />
                      <div className="flex-1 card p-3">
                        <p className="text-sm text-gray-700 dark:text-gray-300">{log.description || log.event}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-gray-400">{log.causer?.name || "النظام"}</span>
                          <span className="text-xs text-gray-400" dir="ltr">{log.created_at ? format(new Date(log.created_at), "dd/MM/yyyy HH:mm") : ""}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

              {/* Files */}
              {activeTab === "الملفات" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300">مرفقات المهمة</h3>
                  </div>
                  <MediaUploader
                    modelType="tasks"
                    modelId={Number(id)}
                    media={task.media || []}
                    onMediaChange={(newMedia: MediaItem[]) => setTask(prev => prev ? { ...prev, media: newMedia } : null)}
                  />
                </div>
              )}
        </div>
      </div>
    </div>
  );
}
