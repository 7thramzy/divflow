"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { api, extractPaginatedData, apiGet, apiPost, apiPut, apiDelete } from "@/lib/api";
import { Customer, PaginatedResponse } from "@/lib/types";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Pagination } from "@/components/ui/Pagination";
import { SortableHeader } from "@/components/ui/SortableHeader";
import { SkeletonTable, SkeletonChart } from "@/components/ui/SkeletonTable";
import { Modal } from "@/components/ui/Modal";
import { CHART_COLORS } from "@/lib/constants";
import { exportToCSV } from "@/lib/utils";
import { Plus, Search, X, Users, Download, RefreshCw, MoreVertical, Eye, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const SOURCE_OPTIONS = [
  { id: "direct", name: "مباشر" },
  { id: "referral", name: "إحالة" },
  { id: "social_media", name: "وسائل التواصل" },
  { id: "facebook", name: "فيسبوك" },
  { id: "twitter", name: "تويتر" },
  { id: "instagram", name: "انستغرام" },
  { id: "linkedin", name: "لينكد إن" },
  { id: "google", name: "جوجل" },
  { id: "friend", name: "صديق" },
  { id: "other", name: "أخرى" },
];
const TYPE_OPTIONS = [
  { id: "individual", name: "فرد" },
  { id: "company", name: "شركة" },
  { id: "government", name: "حكومي" },
  { id: "other", name: "أخرى" },
];

const SOURCE_LABELS: Record<string, string> = Object.fromEntries(SOURCE_OPTIONS.map(o => [o.id, o.name]));
const TYPE_LABELS: Record<string, string> = Object.fromEntries(TYPE_OPTIONS.map(o => [o.id, o.name]));

// ── Customer Form ─────────────────────────────────────────────────────────────

interface CustomerFormData {
  name: string;
  phone: string;
  secondary_phone: string;
  email: string;
  website: string;
  company: string;
  country: string;
  city: string;
  address: string;
  source: string;
  type: string;
  tax_number: string;
  note: string;
  tags: string;
}

const EMPTY_FORM: CustomerFormData = {
  name: "", phone: "", secondary_phone: "", email: "", website: "",
  company: "", country: "", city: "", address: "", source: "", type: "",
  tax_number: "", note: "", tags: "",
};

function CustomerForm({
  initial, onSubmit, submitting,
}: {
  initial: CustomerFormData;
  onSubmit: (data: CustomerFormData) => void;
  submitting: boolean;
}) {
  // Source and type options are defined at module level
  const [form, setForm] = useState<CustomerFormData>(initial);
  const set = (k: keyof CustomerFormData, v: string) => setForm(f => ({ ...f, [k]: v }));

  return (
    <form onSubmit={e => { e.preventDefault(); onSubmit(form); }} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">الاسم *</label>
          <input required className="input-base" value={form.name} onChange={e => set("name", e.target.value)} placeholder="اسم العميل" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">رقم الهاتف *</label>
          <input required className="input-base" value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="+966..." dir="ltr" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">الهاتف الإضافي</label>
          <input className="input-base" value={form.secondary_phone} onChange={e => set("secondary_phone", e.target.value)} placeholder="+966..." dir="ltr" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">البريد الإلكتروني</label>
          <input type="email" className="input-base" value={form.email} onChange={e => set("email", e.target.value)} placeholder="example@email.com" dir="ltr" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">الموقع الإلكتروني</label>
          <input className="input-base" value={form.website} onChange={e => set("website", e.target.value)} placeholder="https://..." dir="ltr" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">الشركة</label>
          <input className="input-base" value={form.company} onChange={e => set("company", e.target.value)} placeholder="اسم الشركة" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">النوع</label>
          <select className="select-base" value={form.type} onChange={e => set("type", e.target.value)}>
            <option value="">اختر النوع</option>
            {TYPE_OPTIONS.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">مصدر العميل</label>
          <select className="select-base" value={form.source} onChange={e => set("source", e.target.value)}>
            <option value="">اختر المصدر</option>
            {SOURCE_OPTIONS.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">الدولة</label>
          <input className="input-base" value={form.country} onChange={e => set("country", e.target.value)} placeholder="الدولة" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">المدينة</label>
          <input className="input-base" value={form.city} onChange={e => set("city", e.target.value)} placeholder="المدينة" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">الرقم الضريبي</label>
          <input className="input-base" value={form.tax_number} onChange={e => set("tax_number", e.target.value)} placeholder="الرقم الضريبي" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">الوسوم (مفصولة بفاصلة)</label>
          <input className="input-base" value={form.tags} onChange={e => set("tags", e.target.value)} placeholder="وسم1, وسم2" />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">ملاحظات</label>
          <textarea rows={2} className="input-base resize-none" value={form.note} onChange={e => set("note", e.target.value)} placeholder="ملاحظات إضافية" />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">العنوان</label>
          <input className="input-base" value={form.address} onChange={e => set("address", e.target.value)} placeholder="العنوان" />
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-2">
        <button type="submit" disabled={submitting} className="btn-primary">
          {submitting ? "جاري الحفظ..." : "حفظ"}
        </button>
      </div>
    </form>
  );
}

function CustomersPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") || 1);
  const perPage = Number(searchParams.get("per_page") || 20);
  const search = searchParams.get("search") || "";
  const sourceFilter = searchParams.get("source") || "";
  const typeFilter = searchParams.get("type") || "";
  const sortBy = searchParams.get("sort_by") || "created_at";
  const sortOrder = (searchParams.get("sort_order") || "desc") as "asc" | "desc";

  const [data, setData] = useState<PaginatedResponse<Customer> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [editCustomer, setEditCustomer] = useState<Customer | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const pushParams = useCallback((updates: Record<string, string | number>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([k, v]) => {
      if (v === "" || v === null || v === undefined) params.delete(k);
      else params.set(k, String(v));
    });
    router.push(`?${params.toString()}`);
  }, [router, searchParams]);

  const fetchCustomers = useCallback(async () => {
    setIsLoading(true); setIsError(false);
    try {
      const params: Record<string, string | number> = { page, per_page: perPage, sort_by: sortBy, sort_order: sortOrder };
      if (search) params.search = search;
      if (sourceFilter) params.source = sourceFilter;
      if (typeFilter) params.type = typeFilter;
      
      const res = await api.get("/customers", { params });
      const paginatedData = extractPaginatedData<Customer>(res);
      setData(paginatedData);
    } catch (error: unknown) { 
      console.error("Failed to fetch customers:", error);
      setIsError(true);
      const err = error as { isNetworkError?: boolean; message?: string };
      if (err.isNetworkError) {
        alert(err.message || "فشل الاتصال بالخادم");
      }
    } finally { setIsLoading(false); }
  }, [page, perPage, search, sourceFilter, typeFilter, sortBy, sortOrder]);

  useEffect(() => { fetchCustomers(); }, [fetchCustomers]);
  useEffect(() => {
    const close = () => setActiveMenu(null);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const handleSort = (field: string) => pushParams({ sort_by: field, sort_order: sortBy === field && sortOrder === "asc" ? "desc" : "asc", page: 1 });
  const handleFilter = (key: string, value: string) => pushParams({ [key]: value, page: 1 });
  const resetFilters = () => router.push("?page=1");

  const handleDelete = async (id: number) => {
    if (!confirm("هل أنت متأكد من حذف هذا العميل؟")) return;
    try { 
      await apiDelete(`/customers/${id}`); 
      fetchCustomers(); 
    } catch (error: unknown) { 
      const err = error as { message?: string };
      alert(err.message || "حدث خطأ أثناء حذف العميل"); 
    }
  };

  const handleCreate = async (form: CustomerFormData) => {
    setSubmitting(true);
    try {
      await apiPost("/customers", {
        name: form.name,
        phone: form.phone,
        secondary_phone: form.secondary_phone || null,
        email: form.email || null,
        website: form.website || null,
        company: form.company || null,
        country: form.country || null,
        city: form.city || null,
        address: form.address || null,
        source: form.source || null,
        type: form.type || null,
        tax_number: form.tax_number || null,
        note: form.note || null,
        tags: form.tags ? form.tags.split(',').map(t => t.trim()) : [],
      });
      setCreateOpen(false);
      fetchCustomers();
    } catch (error: unknown) { 
      const err = error as { message?: string };
      alert(err.message || "حدث خطأ أثناء إنشاء العميل"); 
    }
    finally { setSubmitting(false); }
  };

  const handleEdit = async (form: CustomerFormData) => {
    if (!editCustomer) return;
    setSubmitting(true);
    try {
      await apiPut(`/customers/${editCustomer.id}`, {
        name: form.name,
        phone: form.phone,
        secondary_phone: form.secondary_phone || null,
        email: form.email || null,
        website: form.website || null,
        company: form.company || null,
        country: form.country || null,
        city: form.city || null,
        address: form.address || null,
        source: form.source || null,
        type: form.type || null,
        tax_number: form.tax_number || null,
        note: form.note || null,
        tags: form.tags ? form.tags.split(',').map(t => t.trim()) : [],
      });
      setEditCustomer(null);
      fetchCustomers();
    } catch (error: unknown) { 
      const err = error as { message?: string };
      alert(err.message || "حدث خطأ أثناء تعديل العميل"); 
    }
    finally { setSubmitting(false); }
  };

  const openEdit = (c: Customer) => { setEditCustomer(c); setActiveMenu(null); };

  const customers = data?.data || [];
  const hasFilters = search || sourceFilter || typeFilter;

  // Charts data
  const typeCount = customers.reduce<Record<string, number>>((a, c) => { a[c.type] = (a[c.type] || 0) + 1; return a; }, {});
  const sourceCount = customers.reduce<Record<string, number>>((a, c) => { a[c.source] = (a[c.source] || 0) + 1; return a; }, {});
  const typeData = Object.entries(typeCount).map(([k, v]) => ({ name: TYPE_LABELS[k] || k, value: v }));
  const sourceData = Object.entries(sourceCount).map(([k, v]) => ({ name: SOURCE_LABELS[k] || k, value: v }));

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">العملاء</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">إدارة بيانات العملاء وجهات الاتصال</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => exportToCSV(customers.map(c => ({ الاسم: c.name, الهاتف: c.phone, الشركة: c.company || "", النوع: TYPE_LABELS[c.type] || c.type, المصدر: SOURCE_LABELS[c.source] || c.source })), "customers")} className="btn-ghost flex items-center gap-1.5 text-sm" aria-label="تصدير CSV">
            <Download className="h-4 w-4" /> تصدير
          </button>
          <button onClick={() => setCreateOpen(true)} className="btn-primary"><Plus className="h-4 w-4" /> إضافة عميل</button>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-4 flex flex-col sm:flex-row gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[160px]">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          <input type="text" placeholder="ابحث بالاسم أو الهاتف..." value={search} onChange={e => handleFilter("search", e.target.value)} className="input-base pr-9" aria-label="بحث" />
        </div>
        <select value={sourceFilter} onChange={e => handleFilter("source", e.target.value)} className="select-base w-auto min-w-[130px]" aria-label="المصدر">
          <option value="">جميع المصادر</option>
          {SOURCE_OPTIONS.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
        <select value={typeFilter} onChange={e => handleFilter("type", e.target.value)} className="select-base w-auto min-w-[120px]" aria-label="النوع">
          <option value="">جميع الأنواع</option>
          {TYPE_OPTIONS.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
        {hasFilters && (
          <button onClick={resetFilters} className="btn-ghost flex items-center gap-1.5 text-sm text-red-600 border-red-200 hover:bg-red-50">
            <X className="h-4 w-4" /> إعادة تعيين
          </button>
        )}
      </div>

      {/* Charts */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><SkeletonChart height={200} /><SkeletonChart height={200} /></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="card p-5">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">توزيع حسب النوع</h3>
            {typeData.length < 2 ? <p className="text-center text-xs text-gray-400 py-8">لا توجد بيانات كافية</p> : (
              <ResponsiveContainer width="100%" height={180}>
                <PieChart><Pie data={typeData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" paddingAngle={3}>
                  {typeData.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
                </Pie><Tooltip /><Legend iconType="circle" iconSize={8} /></PieChart>
              </ResponsiveContainer>
            )}
          </div>
          <div className="card p-5">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">توزيع حسب المصدر</h3>
            {sourceData.length < 2 ? <p className="text-center text-xs text-gray-400 py-8">لا توجد بيانات كافية</p> : (
              <ResponsiveContainer width="100%" height={180}>
                <PieChart><Pie data={sourceData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" paddingAngle={3}>
                  {sourceData.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
                </Pie><Tooltip /><Legend iconType="circle" iconSize={8} /></PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      )}

      {/* Table */}
      <div className="card overflow-hidden">
        {isLoading ? <SkeletonTable cols={7} rows={5} /> : isError ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <p className="text-gray-500">فشل تحميل البيانات</p>
            <button onClick={fetchCustomers} className="btn-ghost flex items-center gap-2"><RefreshCw className="h-4 w-4" /> إعادة المحاولة</button>
          </div>
        ) : customers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Users className="h-12 w-12 text-gray-300 dark:text-gray-600" />
            <p className="text-gray-500 font-medium">لا يوجد عملاء</p>
            <button onClick={() => setCreateOpen(true)} className="btn-primary text-sm"><Plus className="h-4 w-4" /> إضافة عميل</button>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm" aria-label="جدول العملاء">
                <caption className="sr-only">قائمة العملاء</caption>
                <thead className="bg-gray-50 dark:bg-gray-800/50">
                  <tr>
                    <th className="px-4 py-3 text-right"><SortableHeader label="الاسم" field="name" sortBy={sortBy} sortOrder={sortOrder} onSort={handleSort} /></th>
                    <th className="px-4 py-3 text-right hidden md:table-cell">الشركة</th>
                    <th className="px-4 py-3 text-right">النوع</th>
                    <th className="px-4 py-3 text-right hidden md:table-cell">المصدر</th>
                    <th className="px-4 py-3 text-right hidden lg:table-cell">الهاتف</th>
                    <th className="px-4 py-3 text-right hidden lg:table-cell"><SortableHeader label="تاريخ الإنشاء" field="created_at" sortBy={sortBy} sortOrder={sortOrder} onSort={handleSort} /></th>
                    <th className="px-4 py-3 w-10" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {customers.map(c => (
                    <tr key={c.id} className="hover:bg-gray-50/60 dark:hover:bg-gray-800/30 transition-colors group">
                      <td className="px-4 py-3">
                        <Link href={`/dashboard/customers/${c.id}`} className="font-medium text-gray-900 dark:text-white hover:text-primary dark:hover:text-accent">{c.name}</Link>
                      </td>
                      <td className="px-4 py-3 text-gray-500 dark:text-gray-400 hidden md:table-cell">{c.company || "—"}</td>
                      <td className="px-4 py-3"><StatusBadge status={c.type} label={TYPE_LABELS[c.type] || c.type} /></td>
                      <td className="px-4 py-3 text-gray-500 dark:text-gray-400 hidden md:table-cell">{SOURCE_LABELS[c.source] || c.source}</td>
                      <td className="px-4 py-3 hidden lg:table-cell"><span dir="ltr" className="text-gray-500 dark:text-gray-400">{c.phone}</span></td>
                      <td className="px-4 py-3 text-gray-500 dark:text-gray-400 hidden lg:table-cell">
                        <span dir="ltr">{c.created_at ? format(new Date(c.created_at), "dd/MM/yyyy") : "—"}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="relative" onClick={e => e.stopPropagation()}>
                          <button onClick={() => setActiveMenu(activeMenu === c.id ? null : c.id)} className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all" aria-label="خيارات">
                            <MoreVertical className="h-4 w-4 text-gray-400" />
                          </button>
                          {activeMenu === c.id && (
                            <div className="absolute left-0 top-full mt-1 w-36 rounded-xl bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black/5 dark:ring-white/10 z-20 py-1">
                              <Link href={`/dashboard/customers/${c.id}`} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                <Eye className="h-4 w-4 text-gray-400" /> عرض
                              </Link>
                              <button onClick={() => openEdit(c)} className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                <Edit className="h-4 w-4 text-gray-400" /> تعديل
                              </button>
                              <button onClick={() => handleDelete(c.id)} className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10">
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

      {/* Create Modal */}
      <Modal open={createOpen} onClose={() => setCreateOpen(false)} title="إضافة عميل جديد" size="lg">
        <CustomerForm initial={EMPTY_FORM} onSubmit={handleCreate} submitting={submitting} />
      </Modal>

      {/* Edit Modal */}
      <Modal open={editCustomer !== null} onClose={() => setEditCustomer(null)} title="تعديل بيانات العميل" size="lg">
        {editCustomer && (
          <CustomerForm
            initial={{
              name: editCustomer.name,
              phone: editCustomer.phone,
              secondary_phone: editCustomer.secondary_phone || "",
              email: editCustomer.email || "",
              website: editCustomer.website || "",
              company: editCustomer.company || "",
              country: editCustomer.country || "",
              city: editCustomer.city || "",
              address: editCustomer.address || "",
              source: editCustomer.source || "",
              type: editCustomer.type || "",
              tax_number: editCustomer.tax_number || "",
              note: editCustomer.note || "",
              tags: editCustomer.tags?.join(', ') || "",
            }}
            onSubmit={handleEdit}
            submitting={submitting}
          />
        )}
      </Modal>
    </div>
  );
}

export default function CustomersPage() {
  return <Suspense><CustomersPageInner /></Suspense>;
}
