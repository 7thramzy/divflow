"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { TimeLog } from "@/lib/types";
import { 
  Plus, 
  Search, 
  Clock, 
  AlignLeft,
  CalendarDays,
  MoreVertical,
  X,
  Edit,
  Trash2,
  Eye
} from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

export default function TimeLogsPage() {
  const [logs, setLogs] = useState<TimeLog[]>([]);
  const [tasksList, setTasksList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editLog, setEditLog] = useState({ actual_hours: 0, work_date: "", comment: "" });
  
  const [newLog, setNewLog] = useState({
    task_id: "",
    actual_hours: 0,
    work_date: new Date().toISOString().split('T')[0],
    comment: "",
  });

  useEffect(() => {
    const fetchLogsAndTasks = async () => {
      try {
        const [logsRes, tasksRes] = await Promise.all([
          api.get("/time-logs"),
          api.get("/tasks").catch(() => ({ data: { data: [] } }))
        ]);
        setLogs(logsRes.data.data || logsRes.data || []);
        
        const tasks = tasksRes.data.data || tasksRes.data || [];
        setTasksList(tasks);
        if (tasks.length > 0) {
           setNewLog(prev => ({ ...prev, task_id: tasks[0].id.toString() }));
        }
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLogsAndTasks();
  }, []);

  useEffect(() => {
    const handleClickOutside = () => setActiveMenuId(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const refreshLogs = async () => {
    const response = await api.get("/time-logs");
    setLogs(response.data.data || response.data || []);
  };

  const openEditModal = (log: TimeLog) => {
    setEditingId(log.id);
    setEditLog({ actual_hours: log.actual_hours, work_date: log.work_date || "", comment: log.comment || "" });
    setIsEditing(true);
    setActiveMenuId(null);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;
    setIsSubmitting(true);
    try {
      await api.put(`/time-logs/${editingId}`, { ...editLog, actual_hours: Number(editLog.actual_hours) });
      setIsEditing(false);
      setEditingId(null);
      await refreshLogs();
    } catch (error: any) {
      alert(error.response?.data?.message || "حدث خطأ أثناء التحديث.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (logId: number) => {
    if (!confirm("هل أنت متأكد من حذف هذا السجل؟")) return;
    try {
      await api.delete(`/time-logs/${logId}`);
      setActiveMenuId(null);
      await refreshLogs();
    } catch (error: any) {
      alert(error.response?.data?.message || "حدث خطأ أثناء الحذف.");
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLog.task_id) {
       alert("الرجاء اختيار مهمة");
       return;
    }
    setIsSubmitting(true);
    try {
      const payload = {
        ...newLog,
        task_id: Number(newLog.task_id),
        actual_hours: Number(newLog.actual_hours)
      };
      await api.post("/time-logs", payload);
      setIsCreating(false);
      setNewLog({
        task_id: tasksList[0]?.id?.toString() || "",
        actual_hours: 0,
        work_date: new Date().toISOString().split('T')[0],
        comment: "",
      });
      await refreshLogs();
    } catch (error) {
      console.error("Failed to create time log", error);
      alert("حدث خطأ أثناء التسجيل. تأكد من صحة البيانات.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredLogs = logs.filter((log) => 
    log.comment?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
            سجلات الوقت
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            تتبع أوقات العمل المسجلة على المهام المختلفة.
          </p>
        </div>
        <div className="flex mt-4 sm:mr-16 sm:mt-0 gap-3">
          <div className="relative rounded-md shadow-sm xl:w-80">
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <Search className="h-4 w-4 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              name="search"
              id="search"
              className="block w-full rounded-lg border-0 py-2 pr-10 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-indigo-500 sm:text-sm sm:leading-6 bg-white dark:bg-[#0f172a] transition-all"
              placeholder="ابحث في السجلات..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            type="button"
            onClick={() => setIsCreating(true)}
            className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all shadow-indigo-500/30"
          >
            <Plus className="-mr-0.5 ml-1.5 h-5 w-5" aria-hidden="true" />
            تسجيل وقت
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse border border-gray-200 dark:border-gray-700"></div>
          ))}
        </div>
      ) : filteredLogs.length > 0 ? (
        <div className="bg-white dark:bg-[#0f172a] shadow-sm rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden divide-y divide-gray-100 dark:divide-gray-800">
          {filteredLogs.map((log) => (
            <div
              key={log.id}
              className="group flex flex-col sm:flex-row sm:items-center justify-between p-5 hover:bg-gray-50/80 dark:hover:bg-gray-800/30 transition-all gap-4"
            >
              <div className="flex items-start gap-4 flex-1">
                <div className="mt-0.5 p-2 rounded-lg bg-indigo-50 dark:bg-indigo-500/10">
                  <Clock className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-base font-medium text-gray-900 dark:text-white truncate">
                      {log.actual_hours} ساعات مسجلة
                    </h4>
                    <span className="inline-flex items-center rounded-md bg-gray-100 dark:bg-gray-800 px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 ring-1 ring-inset ring-gray-600/20 dark:ring-gray-700">
                      مهمة #{log.task_id}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 gap-4 mt-2">
                     <span className="flex items-center gap-1.5">
                       <CalendarDays className="h-4 w-4" /> 
                       {log.work_date ? format(new Date(log.work_date), 'dd MMMM yyyy', { locale: ar }) : 'بدون تاريخ'}
                     </span>
                     {log.comment && (
                       <span className="flex items-center gap-1.5 truncate max-w-sm">
                         <AlignLeft className="h-4 w-4 shrink-0" /> {log.comment}
                       </span>
                     )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-end gap-2 sm:mr-4 sm:flex-shrink-0">
                <div className="relative">
                  <button onClick={(e) => { e.stopPropagation(); setActiveMenuId(activeMenuId === log.id ? null : log.id); }} className="text-gray-400 hover:text-gray-500 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                  {activeMenuId === log.id && (
                    <div className="absolute left-0 top-full mt-1 w-40 rounded-xl bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black/5 dark:ring-white/10 z-10 py-1 overflow-hidden">
                      <button onClick={(e) => { e.stopPropagation(); openEditModal(log); }} className="flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <Edit className="mr-3 ml-2 h-4 w-4 text-gray-400" /> تعديل
                      </button>
                      <div className="h-px bg-gray-100 dark:bg-gray-700/50 my-1" />
                      <button onClick={(e) => { e.stopPropagation(); setActiveMenuId(null); handleDelete(log.id); }} className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10">
                        <Trash2 className="mr-3 ml-2 h-4 w-4 text-red-500" /> حذف
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center bg-white dark:bg-[#0f172a] py-16 px-6 rounded-2xl border border-dashed border-gray-300 dark:border-gray-800">
          <Clock className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600" />
          <h3 className="mt-4 text-sm font-semibold text-gray-900 dark:text-white">لا توجد سجلات وقت</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">قم بتسجيل الوقت الذي قضيته في المهام ليظهر هنا.</p>
          <div className="mt-6">
            <button
              type="button"
              onClick={() => setIsCreating(true)}
              className="inline-flex items-center rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <Plus className="-mr-0.5 ml-1.5 h-5 w-5" aria-hidden="true" />
              تسجيل جديد
            </button>
          </div>
        </div>
      )}

      {/* Create Modal */}
      {isCreating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:p-0 backdrop-blur-sm transition-opacity">
          <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-[#0f172a] shadow-2xl sm:w-full sm:max-w-md w-full ring-1 ring-gray-200 dark:ring-gray-800 transform transition-all">
            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
               <h3 className="text-xl font-bold text-gray-900 dark:text-white">تسجيل وقت جديد</h3>
               <button onClick={() => setIsCreating(false)} className="text-gray-400 hover:text-gray-500">
                  <X className="h-5 w-5" />
               </button>
            </div>
            <form onSubmit={handleCreate}>
              <div className="px-6 py-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                    المهمة
                  </label>
                  <select
                    required
                    className="mt-1 block w-full rounded-md border-0 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white dark:bg-[#0f172a]"
                    value={newLog.task_id}
                    onChange={(e) => setNewLog({...newLog, task_id: e.target.value})}
                  >
                    <option value="" disabled>اختر المهمة</option>
                    {tasksList.map((t) => (
                      <option key={t.id} value={t.id}>{t.title} - مشروع #{t.project_id}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">الساعات الفعلية</label>
                    <input
                      type="number"
                      step="0.5"
                      min="0.5"
                      required
                      className="mt-1 block w-full rounded-md border-0 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-transparent"
                      value={newLog.actual_hours}
                      onChange={(e) => setNewLog({...newLog, actual_hours: Number(e.target.value)})}
                    />
                  </div>
                  <div>
                     <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">التاريخ</label>
                    <input
                      type="date"
                      required
                      className="mt-1 block w-full rounded-md border-0 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-transparent"
                      value={newLog.work_date}
                      onChange={(e) => setNewLog({...newLog, work_date: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                    ملاحظات 
                  </label>
                  <textarea
                    rows={2}
                    className="mt-1 block w-full rounded-md border-0 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-transparent"
                    value={newLog.comment}
                    onChange={(e) => setNewLog({...newLog, comment: e.target.value})}
                  />
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900/50 px-6 py-4 flex items-center justify-end gap-3 border-t border-gray-100 dark:border-gray-800">
                <button
                  type="button"
                  className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  onClick={() => setIsCreating(false)}
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 shadow-sm transition-colors disabled:opacity-50 flex items-center"
                >
                  {isSubmitting ? 'جاري الحفظ...' : 'حفظ السجل'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:p-0 backdrop-blur-sm">
          <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-[#0f172a] shadow-2xl sm:w-full sm:max-w-md w-full ring-1 ring-gray-200 dark:ring-gray-800">
            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
               <h3 className="text-xl font-bold text-gray-900 dark:text-white">تعديل سجل الوقت</h3>
               <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-500"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleUpdate}>
              <div className="px-6 py-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-gray-200">الساعات الفعلية</label>
                    <input type="number" step="0.5" min="0.5" required className="mt-1 block w-full rounded-md border-0 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-indigo-600 sm:text-sm bg-transparent" value={editLog.actual_hours} onChange={(e) => setEditLog({...editLog, actual_hours: Number(e.target.value)})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-gray-200">التاريخ</label>
                    <input type="date" required className="mt-1 block w-full rounded-md border-0 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-indigo-600 sm:text-sm bg-transparent" value={editLog.work_date} onChange={(e) => setEditLog({...editLog, work_date: e.target.value})} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-gray-200">ملاحظات</label>
                  <textarea rows={2} className="mt-1 block w-full rounded-md border-0 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-indigo-600 sm:text-sm bg-transparent" value={editLog.comment} onChange={(e) => setEditLog({...editLog, comment: e.target.value})} />
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900/50 px-6 py-4 flex items-center justify-end gap-3 border-t border-gray-100 dark:border-gray-800">
                <button type="button" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setIsEditing(false)}>إلغاء</button>
                <button type="submit" disabled={isSubmitting} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 shadow-sm disabled:opacity-50">{isSubmitting ? 'جاري الحفظ...' : 'حفظ التغييرات'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
