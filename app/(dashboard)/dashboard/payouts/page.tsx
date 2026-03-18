"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { api, extractPaginatedData, apiGet, apiPost, apiDelete } from "@/lib/api";
import { InternalPayout, User, PaginatedResponse } from "@/lib/types";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Pagination } from "@/components/ui/Pagination";
import { SortableHeader } from "@/components/ui/SortableHeader";
import { SkeletonTable, SkeletonStatCards, SkeletonChart } from "@/components/ui/SkeletonTable";
import { Drawer } from "@/components/ui/Drawer";
import { Modal } from "@/components/ui/Modal";
import { CHART_COLORS } from "@/lib/constants";
import { getStatusLabel, exportToCSV, cn, formatCurrency } from "@/lib/utils";
import { Plus, Search, X, Download, RefreshCw, Banknote, TrendingDown, DollarSign, MoreVertical, Trash2 } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, Cell } from "recharts";

interface PayoutSummary { total_earned: number; total_paid: number; remaining: number; default_hourly_rate?: number; }

function PayoutsPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") || 1);
  const perPage = Number(searchParams.get("per_page") || 20);
  const typeFilter = searchParams.get("type") || "";
  const statusFilter = searchParams.get("status") || "";
  const userFilter = searchParams.get("user_id") || "";
  const dateFrom = searchParams.get("date_from") || "";
  const dateTo = searchParams.get("date_to") || "";
  const sortBy = searchParams.get("sort_by") || "created_at";
  const sortOrder = (searchParams.get("sort_order") || "desc") as "asc" | "desc";

  const [data, setData] = useState<PaginatedResponse<InternalPayout> | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [drawerUserId, setDrawerUserId] = useState<number | null>(null);
  const [drawerSummary, setDrawerSummary] = useState<PayoutSummary | null>(null);
  const [drawerPayouts, setDrawerPayouts] = useState<InternalPayout[]>([]);
  const [drawerLoading, setDrawerLoading] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [payoutForm, setPayoutForm] = useState({ user_id: "", task_id: "", amount_paid: "", type: "payment", notes: "" });
  const [payoutSubmitting, setPayoutSubmitting] = useState(false);

  const pushParams = useCallback((updates: Record<string, string | number>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([k, v]) => {
      if (v === "" || v === null || v === undefined) params.delete(k);
      else params.set(k, String(v));
    });
    router.push(`?${params.toString()}`);
  }, [router, searchParams]);

  const fetchPayouts = useCallback(async () => {
    setIsLoading(true); setIsError(false);
    try {
      const params: Record<string, string | number> = { page, per_page: perPage, sort_by: sortBy, sort_order: sortOrder };
      if (typeFilter) params.type = typeFilter;
      if (statusFilter) params.status = statusFilter;
      if (userFilter) params.user_id = userFilter;
      if (dateFrom) params.date_from = dateFrom;
      if (dateTo) params.date_to = dateTo;
      
      const res = await api.get("/internal-payouts", { params });
      const paginatedData = extractPaginatedData<InternalPayout>(res);
      setData(paginatedData);
    } catch (error: unknown) { 
      console.error("Failed to fetch payouts:", error);
      setIsError(true);
      const err = error as { isNetworkError?: boolean; message?: string };
      if (err.isNetworkError) {
        alert(err.message || "فشل الاتصال بالخادم");
      }
    } finally { setIsLoading(false); }
  }, [page, perPage, typeFilter, statusFilter, userFilter, dateFrom, dateTo, sortBy, sortOrder]);

  useEffect(() => { fetchPayouts(); }, [fetchPayouts]);
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRes = await apiGet<User[]>("/admin/users", { params: { per_page: 200 } });
        setUsers(usersRes || []);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    fetchUsers();
  }, []);
  useEffect(() => {
    const close = () => setActiveMenu(null);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const openDrawer = async (userId: number) => {
    setDrawerUserId(userId);
    setDrawerLoading(true);
    try {
      const [sumRes, payRes] = await Promise.all([
        apiGet<PayoutSummary>(`/users/${userId}/payout-summary`).catch(() => null),
        api.get(`/internal-payouts`, { params: { user_id: userId, per_page: 10 } }),
      ]);
      setDrawerSummary(sumRes);
      const payoutsData = extractPaginatedData<InternalPayout>(payRes);
      setDrawerPayouts(payoutsData.data);
    } catch (error) {
      console.error("Failed to fetch drawer data:", error);
      setDrawerSummary(null);
    } finally {
      setDrawerLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("هل أنت متأكد من حذف هذه الدفعة؟")) return;
    try { 
      await apiDelete(`/internal-payouts/${id}`); 
      fetchPayouts(); 
    } catch (error: unknown) { 
      const err = error as { message?: string };
      alert(err.message || "حدث خطأ أثناء حذف الدفعة"); 
    }
  };

  const handleCreatePayout = async (e: React.FormEvent) => {
    e.preventDefault();
    setPayoutSubmitting(true);
    try {
      await apiPost("/internal-payouts", {
        user_id: Number(payoutForm.user_id),
        task_id: payoutForm.task_id ? Number(payoutForm.task_id) : null,
        amount_paid: Number(payoutForm.amount_paid),
        type: payoutForm.type,
        notes: payoutForm.notes || null,
      });
      setCreateOpen(false);
      setPayoutForm({ user_id: "", task_id: "", amount_paid: "", type: "payment", notes: "" });
      fetchPayouts();
    } catch (error: unknown) { 
      const err = error as { message?: string };
      alert(err.message || "حدث خطأ أثناء إنشاء الدفعة"); 
    }
    finally { setPayoutSubmitting(false); }
  };

  const payouts = data?.data || [];
  const hasFilters = typeFilter || statusFilter || userFilter || dateFrom || dateTo;

  const totalPayments = payouts.filter(p => p.type === "payment").reduce((s, p) => s + p.amount_paid, 0);
  const totalDeductions = payouts.filter(p => p.type === "deduction").reduce((s, p) => s + p.amount_paid, 0);
  const net = totalPayments - totalDeductions;

  const stats = [
    { label: "إجمالي المدفوعات", value: totalPayments, icon: Banknote, color: "text-emerald-700", bg: "bg-emerald-100" },
    { label: "إجمالي الخصومات", value: totalDeductions, icon: TrendingDown, color: "text-red-700", bg: "bg-red-100" },
    { label: "الصافي", value: net, icon: DollarSign, color: "text-primary", bg: "bg-primary-light" },
  ];

  // Monthly bar chart
  const monthlyMap: Record<string, { payments: number; deductions: number }> = {};
  payouts.forEach(p => {
    if (!p.created_at) return;
    const month = format(new Date(p.created_at), "MMM yyyy", { locale: ar });
    if (!monthlyMap[month]) monthlyMap[month] = { payments: 0, deductions: 0 };
    if (p.type === "payment") monthlyMap[month].payments += p.amount_paid;
    else monthlyMap[month].deductions += p.amount_paid;
  });
  const monthlyData = Object.entries(monthlyMap).map(([month, v]) => ({ month, ...v }));

  const paidPct = drawerSummary && drawerSummary.total_earned > 0
    ? Math.round((drawerSummary.total_paid / drawerSummary.total_earned) * 100)
    : 0;

  const drawerUser = users.find(u => u.id === drawerUserId);

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">المدفوعات والمستحقات</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">تتبع المبالغ المالية للموظفين</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => exportToCSV(payouts.map(p => ({ الموظف: p.user?.name || p.user_id, المهمة: p.task_id, النوع: getStatusLabel(p.type), المبلغ: p.amount_paid, الحالة: getStatusLabel(p.status), التاريخ: p.created_at })), "payouts")} className="btn-ghost flex items-center gap-1.5 text-sm" aria-label="تصدير CSV">
            <Download className="h-4 w-4" /> تصدير
          </button>
          <button onClick={() => setCreateOpen(true)} className="btn-primary"><Plus className="h-4 w-4" /> تسجيل دفعة</button>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-4 flex flex-col sm:flex-row gap-3 flex-wrap">
        <select value={typeFilter} onChange={e => pushParams({ type: e.target.value, page: 1 })} className="select-base w-auto min-w-[110px]" aria-label="النوع">
          <option value="">جميع الأنواع</option>
          <option value="payment">دفعة</option>
          <option value="deduction">خصم</option>
        </select>
        <select value={statusFilter} onChange={e => pushParams({ status: e.target.value, page: 1 })} className="select-base w-auto min-w-[110px]" aria-label="الحالة">
          <option value="">جميع الحالات</option>
          <option value="pending">قيد الانتظار</option>
          <option value="paid">مدفوع</option>
          <option value="cancelled">ملغي</option>
        </select>
        <select value={userFilter} onChange={e => pushParams({ user_id: e.target.value, page: 1 })} className="select-base w-auto min-w-[130px]" aria-label="الموظف">
          <option value="">جميع الموظفين</option>
          {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
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

      {/* Stats */}
      {isLoading ? <SkeletonStatCards count={3} /> : (
        <div className="grid grid-cols-3 gap-4">
          {stats.map(s => (
            <div key={s.label} className="stat-card">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{s.label}</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white mt-1">{formatCurrency(s.value)}</p>
              </div>
              <div className={cn("p-2.5 rounded-xl", s.bg)}>
                <s.icon className={cn("h-5 w-5", s.color)} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Monthly chart */}
      {isLoading ? <SkeletonChart height={200} /> : monthlyData.length >= 2 ? (
        <div className="card p-5">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">المدفوعات مقابل الخصومات شهرياً</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={monthlyData}>
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="payments" name="مدفوعات" fill={CHART_COLORS[0]} radius={[4, 4, 0, 0]} />
              <Bar dataKey="deductions" name="خصومات" fill={CHART_COLORS[5]} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : null}

      {/* Table */}
      <div className="card overflow-hidden">
        {isLoading ? <SkeletonTable cols={6} rows={5} /> : isError ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <p className="text-gray-500">فشل تحميل البيانات</p>
            <button onClick={fetchPayouts} className="btn-ghost flex items-center gap-2"><RefreshCw className="h-4 w-4" /> إعادة المحاولة</button>
          </div>
        ) : payouts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Banknote className="h-12 w-12 text-gray-300 dark:text-gray-600" />
            <p className="text-gray-500 font-medium">لا توجد مدفوعات</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm" aria-label="جدول المدفوعات">
                <caption className="sr-only">قائمة المدفوعات</caption>
                <thead className="bg-gray-50 dark:bg-gray-800/50">
                  <tr>
                    <th className="px-4 py-3 text-right"><SortableHeader label="الموظف" field="user_id" sortBy={sortBy} sortOrder={sortOrder} onSort={f => pushParams({ sort_by: f, sort_order: sortBy === f && sortOrder === "asc" ? "desc" : "asc", page: 1 })} /></th>
                    <th className="px-4 py-3 text-right hidden md:table-cell">المهمة</th>
                    <th className="px-4 py-3 text-right">النوع</th>
                    <th className="px-4 py-3 text-right"><SortableHeader label="المبلغ" field="amount_paid" sortBy={sortBy} sortOrder={sortOrder} onSort={f => pushParams({ sort_by: f, sort_order: sortBy === f && sortOrder === "asc" ? "desc" : "asc", page: 1 })} /></th>
                    <th className="px-4 py-3 text-right hidden md:table-cell">الحالة</th>
                    <th className="px-4 py-3 text-right hidden lg:table-cell"><SortableHeader label="التاريخ" field="created_at" sortBy={sortBy} sortOrder={sortOrder} onSort={f => pushParams({ sort_by: f, sort_order: sortBy === f && sortOrder === "asc" ? "desc" : "asc", page: 1 })} /></th>
                    <th className="px-4 py-3 w-10" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {payouts.map(p => (
                    <tr key={p.id} className="hover:bg-gray-50/60 dark:hover:bg-gray-800/30 transition-colors group">
                      <td className="px-4 py-3">
                        <button onClick={() => openDrawer(p.user_id)} className="font-medium text-primary dark:text-accent hover:underline">
                          {p.user?.name || `موظف #${p.user_id}`}
                        </button>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        {p.task_id ? <Link href={`/dashboard/tasks/${p.task_id}`} className="text-gray-500 hover:text-primary dark:hover:text-accent">مهمة #{p.task_id}</Link> : "—"}
                      </td>
                      <td className="px-4 py-3"><StatusBadge status={p.type} /></td>
                      <td className="px-4 py-3 font-semibold text-gray-900 dark:text-white"><span>{formatCurrency(p.amount_paid || 0)}</span></td>
                      <td className="px-4 py-3 hidden md:table-cell"><StatusBadge status={p.status} /></td>
                      <td className="px-4 py-3 text-gray-500 dark:text-gray-400 hidden lg:table-cell">
                        <span>{p.created_at ? format(new Date(p.created_at), "dd/MM/yyyy") : "—"}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="relative" onClick={e => e.stopPropagation()}>
                          <button onClick={() => setActiveMenu(activeMenu === p.id ? null : p.id)} className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all" aria-label="خيارات">
                            <MoreVertical className="h-4 w-4 text-gray-400" />
                          </button>
                          {activeMenu === p.id && (
                            <div className="absolute left-0 top-full mt-1 w-32 rounded-xl bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black/5 dark:ring-white/10 z-20 py-1">
                              <button onClick={() => handleDelete(p.id)} className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10">
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

      {/* User Drawer */}
      <Drawer open={drawerUserId !== null} onClose={() => setDrawerUserId(null)} title={drawerUser ? `ملخص: ${drawerUser.name}` : "ملخص الموظف"}>
        {drawerLoading ? (
          <div className="p-5 space-y-4 animate-pulse">
            {[1, 2, 3].map(i => <div key={i} className="h-12 bg-gray-200 dark:bg-gray-700 rounded-xl" />)}
          </div>
        ) : (
          <div className="p-5 space-y-5">
            {drawerUser && (
              <div className="flex items-center justify-between p-4 rounded-2xl bg-primary-light/30 dark:bg-primary-light/5 border border-primary/10">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {drawerUser.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{drawerUser.name}</p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider">{drawerUser.roles?.[0] || 'Member'}</p>
                  </div>
                </div>
                {drawerUser.default_hourly_rate && (
                  <div className="text-right">
                    <p className="text-[10px] text-gray-500 mb-0.5">سعر الساعة</p>
                    <p className="text-xs font-bold text-primary">{formatCurrency(drawerUser.default_hourly_rate)}</p>
                  </div>
                )}
              </div>
            )}

            {drawerSummary && (
              <>
                <div className="grid grid-cols-3 gap-3">
                  <div className="card p-3 text-center">
                    <p className="text-xs text-gray-500 mb-1">المستحقات</p>
                    <p className="font-bold text-gray-900 dark:text-white text-sm">{formatCurrency(drawerSummary.total_earned || 0)}</p>
                  </div>
                  <div className="card p-3 text-center">
                    <p className="text-xs text-gray-500 mb-1">المدفوع</p>
                    <p className="font-bold text-green-600 text-sm">{formatCurrency(drawerSummary.total_paid || 0)}</p>
                  </div>
                  <div className="card p-3 text-center">
                    <p className="text-xs text-gray-500 mb-1">المتبقي</p>
                    {drawerSummary.remaining <= 0 ? (
                      <p className="font-bold text-emerald-600 text-[10px]">تم الدفع بالكامل</p>
                    ) : (
                      <p className="font-bold text-amber-600 text-sm">{formatCurrency(drawerSummary.remaining)}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>نسبة الدفع</span>
                    <span>{drawerSummary.remaining <= 0 ? "100%" : `${paidPct}%`}</span>
                  </div>
                  <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div className={cn(
                      "h-full rounded-full transition-all duration-500",
                      drawerSummary.remaining <= 0 ? "bg-emerald-500 w-full" : "bg-primary"
                    )} style={{ width: drawerSummary.remaining <= 0 ? "100%" : `${paidPct}%` }} />
                  </div>
                </div>
              </>
            )}
            <div>
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">آخر المدفوعات</h4>
              {drawerPayouts.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-4">لا توجد مدفوعات</p>
              ) : (
                <div className="space-y-2">
                  {drawerPayouts.map(p => (
                    <div key={p.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                      <div>
                        {/* Use custom StatusBadge or similar here */}
                        <span className={cn(
                          "px-2 py-0.5 rounded-full text-[10px] font-medium",
                          p.type === 'payment' ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                        )}>
                          {getStatusLabel(p.type)}
                        </span>
                        {p.notes && <p className="text-[10px] text-gray-500 mt-1 truncate max-w-[140px]">{p.notes}</p>}
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-sm text-gray-900 dark:text-white">{formatCurrency(p.amount_paid || 0)}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">{p.created_at ? format(new Date(p.created_at), "dd/MM/yyyy") : ""}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </Drawer>

      {/* Create Payout Modal */}
      <Modal open={createOpen} onClose={() => setCreateOpen(false)} title="تسجيل دفعة">
        <form onSubmit={handleCreatePayout} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">الموظف *</label>
            <select required className="select-base" value={payoutForm.user_id} onChange={e => setPayoutForm(f => ({ ...f, user_id: e.target.value }))}>
              <option value="">اختر الموظف</option>
              {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">النوع</label>
              <select className="select-base" value={payoutForm.type} onChange={e => setPayoutForm(f => ({ ...f, type: e.target.value }))}>
                <option value="payment">دفعة</option>
                <option value="deduction">خصم</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">المبلغ *</label>
              <input required type="number" min="0" step="0.01" className="input-base" value={payoutForm.amount_paid} onChange={e => setPayoutForm(f => ({ ...f, amount_paid: e.target.value }))} placeholder="0.00" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">رقم المهمة (اختياري)</label>
            <input type="number" min="1" className="input-base" value={payoutForm.task_id} onChange={e => setPayoutForm(f => ({ ...f, task_id: e.target.value }))} placeholder="ID المهمة" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">ملاحظات</label>
            <textarea rows={2} className="input-base resize-none" value={payoutForm.notes} onChange={e => setPayoutForm(f => ({ ...f, notes: e.target.value }))} placeholder="ملاحظات إضافية" />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="submit" disabled={payoutSubmitting} className="btn-primary">
              {payoutSubmitting ? "جاري الحفظ..." : "تسجيل"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default function PayoutsPage() {
  return <Suspense><PayoutsPageInner /></Suspense>;
}