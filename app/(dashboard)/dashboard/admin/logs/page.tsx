"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { api, extractPaginatedData, apiGet } from "@/lib/api";
import { User, PaginatedResponse } from "@/lib/types";
import { Pagination } from "@/components/ui/Pagination";
import { SortableHeader } from "@/components/ui/SortableHeader";
import { SkeletonTable } from "@/components/ui/SkeletonTable";
import { Search, RefreshCw, History, Filter, User as UserIcon, Calendar, Info, X } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

interface AuditLog {
  id: number;
  user_id: number;
  user?: User;
  event: 'created' | 'updated' | 'deleted' | 'restored';
  auditable_type: string;
  auditable_id: number;
  old_values: Record<string, any>;
  new_values: Record<string, any>;
  url: string;
  ip_address: string;
  user_agent: string;
  created_at: string;
}

const EVENT_LABELS: Record<string, { label: string, color: string }> = {
  created: { label: "إنشاء", color: "text-green-600 bg-green-50 dark:bg-green-500/10" },
  updated: { label: "تعديل", color: "text-primary bg-primary-light dark:bg-primary/10" },
  deleted: { label: "حذف", color: "text-red-600 bg-red-50 dark:bg-red-500/10" },
  restored: { label: "استعادة", color: "text-purple-600 bg-purple-50 dark:bg-purple-500/10" },
};

const MODEL_LABELS: Record<string, string> = {
  "App\\Models\\Project": "مشروع",
  "App\\Models\\Task": "مهمة",
  "App\\Models\\Customer": "عميل",
  "App\\Models\\InternalNote": "ملاحظة داخلية",
  "App\\Models\\InternalPayout": "دفعة مالية",
  "App\\Models\\TimeLog": "سجل وقت",
  "App\\Models\\User": "مستخدم",
};

function LogDetailsModal({ log, onClose }: { log: AuditLog, onClose: () => void }) {
  return (
    <div className="space-y-4 max-h-[70vh] overflow-y-auto p-1 custom-scrollbar">
      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
          <p className="text-[10px] text-gray-400 mb-1 uppercase tracking-wider">الحدث</p>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${EVENT_LABELS[log.event]?.color || ''}`}>
              {EVENT_LABELS[log.event]?.label || log.event}
            </span>
          </div>
        </div>
        <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
          <p className="text-[10px] text-gray-400 mb-1 uppercase tracking-wider">التوقيت</p>
          <p className="text-xs font-medium dark:text-gray-200" dir="ltr">{format(new Date(log.created_at), "yyyy-MM-dd HH:mm:ss")}</p>
        </div>
        <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
          <p className="text-[10px] text-gray-400 mb-1 uppercase tracking-wider">المستخدم</p>
          <p className="text-xs font-medium dark:text-gray-200">{log.user?.name || `User #${log.user_id}`}</p>
        </div>
        <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
          <p className="text-[10px] text-gray-400 mb-1 uppercase tracking-wider">عنوان IP</p>
          <p className="text-xs font-medium dark:text-gray-200 font-mono" dir="ltr">{log.ip_address}</p>
        </div>
      </div>

      <div className="space-y-3">
        {Object.keys(log.new_values).length > 0 && (
          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <h4 className="text-sm font-bold mb-3 flex items-center gap-2 text-gray-800 dark:text-gray-200">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" /> القيم الجديدة
            </h4>
            <div className="space-y-2 overflow-x-auto">
              <table className="w-full text-xs">
                <tbody>
                  {Object.entries(log.new_values).map(([key, value]) => (
                    <tr key={key} className="border-b border-gray-50 dark:border-gray-800 last:border-0">
                      <td className="py-2 font-medium text-gray-500 w-1/3">{key}</td>
                      <td className="py-2 text-gray-900 dark:text-gray-300 break-all">{JSON.stringify(value)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {Object.keys(log.old_values).length > 0 && (
          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <h4 className="text-sm font-bold mb-3 flex items-center gap-2 text-gray-800 dark:text-gray-200">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500" /> القيم السابقة
            </h4>
            <div className="space-y-2 overflow-x-auto">
              <table className="w-full text-xs">
                <tbody>
                  {Object.entries(log.old_values).map(([key, value]) => (
                    <tr key={key} className="border-b border-gray-50 dark:border-gray-800 last:border-0">
                      <td className="py-2 font-medium text-gray-500 w-1/3">{key}</td>
                      <td className="py-2 text-gray-900 dark:text-gray-300 break-all">{JSON.stringify(value)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 flex justify-end">
        <button onClick={onClose} className="btn-ghost text-sm">إغلاق</button>
      </div>
    </div>
  );
}

function LogsPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") || 1);
  const perPage = Number(searchParams.get("per_page") || 20);
  const modelFilter = searchParams.get("model_type") || "";
  const userFilter = searchParams.get("user_id") || "";
  const eventFilter = searchParams.get("event") || "";

  const [data, setData] = useState<PaginatedResponse<AuditLog> | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

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
      const params: Record<string, string | number> = { page, per_page: perPage };
      if (modelFilter) params.model_type = modelFilter;
      if (userFilter) params.user_id = userFilter;
      if (eventFilter) params.event = eventFilter;
      
      const res = await api.get("/admin/audit-logs", { params });
      setData(extractPaginatedData<AuditLog>(res));
    } catch (error) {
      console.error("Failed to fetch audit logs:", error);
      setIsError(true);
    } finally { setIsLoading(false); }
  }, [page, perPage, modelFilter, userFilter, eventFilter]);

  useEffect(() => { fetchLogs(); }, [fetchLogs]);
  useEffect(() => {
    apiGet<User[]>("/admin/users", { params: { per_page: 200 } }).then(res => setUsers(res || []));
  }, []);

  const handleFilter = (key: string, value: string) => pushParams({ [key]: value, page: 1 });
  const resetFilters = () => router.push("?page=1");

  const logs = data?.data || [];

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <History className="h-6 w-6 text-amber-500" />
            سجل العمليات
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">تتبع جميع التغييرات والعمليات الحساسة في النظام</p>
        </div>
        <button onClick={fetchLogs} className="btn-ghost flex items-center gap-2">
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} /> تحديث
        </button>
      </div>

      {/* Filters */}
      <div className="card p-4 flex flex-col sm:flex-row gap-3 flex-wrap">
        <div className="flex items-center gap-2 flex-1 min-w-[200px]">
          <Filter className="h-4 w-4 text-gray-400 shrink-0" />
          <select value={modelFilter} onChange={e => handleFilter("model_type", e.target.value)} className="select-base text-sm">
            <option value="">جميع الوحدات</option>
            {Object.entries(MODEL_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-2 flex-1 min-w-[150px]">
          <UserIcon className="h-4 w-4 text-gray-400 shrink-0" />
          <select value={userFilter} onChange={e => handleFilter("user_id", e.target.value)} className="select-base text-sm">
            <option value="">جميع الموظفين</option>
            {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-2 flex-1 min-w-[130px]">
          <Info className="h-4 w-4 text-gray-400 shrink-0" />
          <select value={eventFilter} onChange={e => handleFilter("event", e.target.value)} className="select-base text-sm">
            <option value="">جميع الأحداث</option>
            {Object.entries(EVENT_LABELS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
          </select>
        </div>
        {(modelFilter || userFilter || eventFilter) && (
          <button onClick={resetFilters} className="btn-ghost text-xs text-red-600 hover:bg-red-50 py-1">إلغاء الفلاتر</button>
        )}
      </div>

      {/* Content */}
      <div className="card overflow-hidden">
        {isLoading ? <SkeletonTable cols={6} rows={8} /> : isError ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-red-500">
            <p className="text-sm">حدث خطأ أثناء تحميل السجل</p>
            <button onClick={fetchLogs} className="btn-primary text-xs">إعادة المحاولة</button>
          </div>
        ) : logs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <History className="h-12 w-12 text-gray-200" />
            <p className="text-gray-500 text-sm">لا توجد عمليات مسجلة حالياً</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-800/50">
                  <tr>
                    <th className="px-4 py-3 text-right">الحدث</th>
                    <th className="px-4 py-3 text-right">الوحدة</th>
                    <th className="px-4 py-3 text-right">بواسطة</th>
                    <th className="px-4 py-3 text-right">التاريخ</th>
                    <th className="px-4 py-3 text-right hidden lg:table-cell">IP</th>
                    <th className="px-4 py-3 w-10" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {logs.map(log => (
                    <tr key={log.id} className="hover:bg-gray-50/60 dark:hover:bg-gray-800/30 transition-colors group cursor-pointer" onClick={() => setSelectedLog(log)}>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${EVENT_LABELS[log.event]?.color || ''}`}>
                          {EVENT_LABELS[log.event]?.label || log.event}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-xs font-medium text-gray-900 dark:text-gray-200">{MODEL_LABELS[log.auditable_type] || log.auditable_type.split('\\').pop()}</div>
                        <div className="text-[10px] text-gray-400"># {log.auditable_id}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-xs text-gray-700 dark:text-gray-300">{log.user?.name || `USR-${log.user_id}`}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 text-[11px] text-gray-500" dir="ltr">
                          <Calendar className="h-3 w-3" /> {format(new Date(log.created_at), "dd/MM HH:mm")}
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <span className="text-[10px] font-mono text-gray-400">{log.ip_address}</span>
                      </td>
                      <td className="px-4 py-3">
                        <button className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">
                          <Info className="h-4 w-4 text-gray-400" />
                        </button>
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

      {/* Details Modal */}
      {selectedLog && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setSelectedLog(null)} />
          <div className="relative w-full max-w-2xl bg-white dark:bg-[var(--card)] rounded-3xl shadow-2xl overflow-hidden border border-white/20 scale-in animate-in duration-200">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" /> تفاصيل العملية
              </h3>
              <button onClick={() => setSelectedLog(null)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6">
              <LogDetailsModal log={selectedLog} onClose={() => setSelectedLog(null)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}



export default function LogsPage() {
  return <Suspense><LogsPageInner /></Suspense>;
}
