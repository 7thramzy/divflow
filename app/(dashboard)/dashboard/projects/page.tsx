"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { api, extractPaginatedData, apiGet, apiPost, apiPut, apiDelete } from "@/lib/api";
import { Project, Customer, User, PaginatedResponse } from "@/lib/types";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Pagination } from "@/components/ui/Pagination";
import { SortableHeader } from "@/components/ui/SortableHeader";
import { SkeletonTable, SkeletonCards, SkeletonStatCards } from "@/components/ui/SkeletonTable";
import { Modal } from "@/components/ui/Modal";
import { getStatusLabel, exportToCSV, cn } from "@/lib/utils";
import {
  Plus, Search, X, LayoutGrid, List, Download,
  FolderKanban, CheckCircle2, Pause, Activity,
  MoreVertical, Eye, Edit, Trash2, RefreshCw,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

// ── Project Form ─────────────────────────────────────────────────────────────

interface ProjectFormData {
  project_name: string;
  description: string;
  type: string;
  internal_budget: string;
  total_cost: string;
  requirements_study_text: string;
  start_date: string;
  end_date: string;
  status: string;
  owner_id: string;
  customer_id: string;
  features: string;
  payment_stages: { name: string; amount: string }[];
}

interface ProjectType {
  id: number;
  name: string;
}

const EMPTY_FORM: ProjectFormData = {
  project_name: "", description: "", type: "", internal_budget: "",
  total_cost: "", requirements_study_text: "",
  start_date: "", end_date: "", status: "pending", owner_id: "", customer_id: "",
  features: "", payment_stages: [],
};

function ProjectForm({
  initial, customers, users, projectTypes, onSubmit, submitting,
}: {
  initial: ProjectFormData;
  customers: Customer[];
  users: User[];
  projectTypes: ProjectType[];
  onSubmit: (data: ProjectFormData) => void;
  submitting: boolean;
}) {
  const [form, setForm] = useState<ProjectFormData>(initial);
  const set = (k: keyof ProjectFormData, v: string | number | { name: string; amount: string }[]) => setForm(f => ({ ...f, [k]: v }));

  return (
    <form onSubmit={e => { e.preventDefault(); onSubmit(form); }} className="space-y-6 pt-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">اسم المشروع *</label>
          <input required className="input-base" value={form.project_name} onChange={e => set("project_name", e.target.value)} placeholder="مثلاً: تطبيق المتجر الإلكتروني" />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">الوصف</label>
          <textarea rows={3} className="input-base resize-none" value={form.description} onChange={e => set("description", e.target.value)} placeholder="وصف موجز للمشروع والأهداف الرئيسية" />
        </div>
        <div>
          <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">النوع</label>
          <select className="select-base" value={form.type} onChange={e => set("type", e.target.value)}>
            <option value="">اختر النوع</option>
            {projectTypes.map((pt) => (
              <option key={pt.id} value={pt.id}>{pt.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">الحالة</label>
          <select className="select-base" value={form.status} onChange={e => set("status", e.target.value)}>
            <option value="pending">قيد الانتظار</option>
            <option value="in_progress">قيد التنفيذ</option>
            <option value="active">نشط</option>
            <option value="completed">مكتمل</option>
            <option value="on_hold">معلق</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">الميزانية الداخلية</label>
          <div className="relative">
             <span className="absolute right-3 top-1/2 -translate-y-1/2 text-primary font-bold">$</span>
             <input type="number" min="0" step="0.01" className="input-base pr-8" value={form.internal_budget} onChange={e => set("internal_budget", e.target.value)} placeholder="0.00" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">التكلفة الإجمالية</label>
          <div className="relative">
             <span className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500 font-bold">$</span>
             <input type="number" min="0" step="0.01" className="input-base pr-8" value={form.total_cost} onChange={e => set("total_cost", e.target.value)} placeholder="0.00" />
          </div>
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">دراسة المتطلبات</label>
          <textarea rows={2} className="input-base resize-none" value={form.requirements_study_text} onChange={e => set("requirements_study_text", e.target.value)} placeholder="تحليل المتطلبات التقنية والوظيفية" />
        </div>
        <div>
          <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">العميل</label>
          <select className="select-base" value={form.customer_id} onChange={e => set("customer_id", e.target.value)}>
            <option value="">بدون عميل</option>
            {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">المسؤول</label>
          <select className="select-base" value={form.owner_id} onChange={e => set("owner_id", e.target.value)}>
            <option value="">اختر المسؤول</option>
            {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">تاريخ البدء</label>
          <input type="date" className="input-base" value={form.start_date} onChange={e => set("start_date", e.target.value)} />
        </div>
        <div>
          <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">تاريخ الانتهاء</label>
          <input type="date" className="input-base" value={form.end_date} onChange={e => set("end_date", e.target.value)} />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">المميزات (Features)</label>
          <textarea rows={2} className="input-base resize-none" value={form.features} onChange={e => set("features", e.target.value)} placeholder="قائمة بالمميزات والخصائص التقنية" />
        </div>
        <div className="sm:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <label className="block text-xs font-bold text-text-muted uppercase tracking-wider">مراحل الدفع</label>
            <button type="button" onClick={() => set("payment_stages", [...form.payment_stages, { name: "", amount: "" }])} className="text-xs font-bold text-primary hover:text-accent flex items-center gap-1.5 px-3 py-1 rounded-lg bg-primary/10 border border-primary/20 transition-all">
              <Plus className="h-3.5 w-3.5" /> إضافة مرحلة
            </button>
          </div>
          <div className="space-y-3">
            {form.payment_stages.map((stage, idx) => (
              <div key={idx} className="flex gap-3 items-start animate-in fade-in slide-in-from-top-2">
                <input className="input-base flex-1" value={stage.name} onChange={e => {
                  const copy = [...form.payment_stages];
                  copy[idx].name = e.target.value;
                  set("payment_stages", copy);
                }} placeholder="اسم المرحلة" />
                <div className="relative w-36">
                   <span className="absolute right-3 top-1/2 -translate-y-1/2 text-primary font-bold">$</span>
                   <input type="number" className="input-base pr-8" value={stage.amount} onChange={e => {
                    const copy = [...form.payment_stages];
                    copy[idx].amount = e.target.value;
                    set("payment_stages", copy);
                   }} placeholder="المبلغ" />
                </div>
                <button type="button" onClick={() => set("payment_stages", form.payment_stages.filter((_, i) => i !== idx))} className="p-2.5 text-red-500 hover:bg-red-500/10 rounded-xl border border-transparent hover:border-red-500/20 transition-all">
                  <X className="h-5 w-5" />
                </button>
              </div>
            ))}
            {form.payment_stages.length === 0 && (
              <div className="flex flex-col items-center justify-center py-8 rounded-2xl border-2 border-dashed border-border bg-white/[0.02] text-center">
                 <p className="text-xs text-text-muted font-bold">لا توجد مراحل دفع مضافة حالياً</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-6 border-t border-border mt-6">
        <button type="submit" disabled={submitting} className="btn-primary min-w-[120px]">
          {submitting ? "جاري الحفظ..." : "حفظ المشروع"}
        </button>
      </div>
    </form>
  );
}

function ProjectsPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL-synced state
  const page = Number(searchParams.get("page") || 1);
  const perPage = Number(searchParams.get("per_page") || 20);
  const search = searchParams.get("search") || "";
  const statusFilter = searchParams.get("status") || "";
  const typeFilter = searchParams.get("type") || "";
  const customerFilter = searchParams.get("customer_id") || "";
  const sortBy = searchParams.get("sort_by") || "created_at";
  const sortOrder = (searchParams.get("sort_order") || "desc") as "asc" | "desc";
  const viewMode = (searchParams.get("view") || "table") as "table" | "card";

  const [data, setData] = useState<PaginatedResponse<Project> | null>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [projectTypes, setProjectTypes] = useState<ProjectType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const pushParams = useCallback((updates: Record<string, string | number>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([k, v]) => {
      if (v === "" || v === null || v === undefined) params.delete(k);
      else params.set(k, String(v));
    });
    router.push(`?${params.toString()}`);
  }, [router, searchParams]);

  const fetchProjects = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const params: Record<string, string | number> = {
        page, per_page: perPage,
        sort_by: sortBy, sort_order: sortOrder,
      };
      if (search) params.search = search;
      if (statusFilter) params.status = statusFilter;
      if (typeFilter) params.type = typeFilter;
      if (customerFilter) params.customer_id = customerFilter;
      
      const res = await api.get("/projects", { params });
      const paginatedData = extractPaginatedData<Project>(res);
      setData(paginatedData);
    } catch (error: unknown) {
      console.error("Failed to fetch projects:", error);
      setIsError(true);
      const err = error as { isNetworkError?: boolean; message?: string };
      if (err.isNetworkError) {
        alert(err.message || "فشل الاتصال بالخادم");
      }
    } finally {
      setIsLoading(false);
    }
  }, [page, perPage, search, statusFilter, typeFilter, customerFilter, sortBy, sortOrder]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  useEffect(() => {
    const fetchRelatedData = async () => {
      try {
        const [customersRes, usersRes, typesRes] = await Promise.all([
           apiGet<Customer[]>("/customers", { params: { per_page: 200 } }),
           apiGet<User[]>("/admin/users", { params: { per_page: 200 } }),
           apiGet<ProjectType[]>("/projects/types"),
         ]);
        setCustomers(customersRes || []);
        setUsers(usersRes || []);
        setProjectTypes(typesRes || []);
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

  const handleSort = (field: string) => {
    pushParams({
      sort_by: field,
      sort_order: sortBy === field && sortOrder === "asc" ? "desc" : "asc",
      page: 1,
    });
  };

  const handleFilter = (key: string, value: string) => {
    pushParams({ [key]: value, page: 1 });
  };

  const resetFilters = () => {
    router.push("?page=1");
  };

  const handleDelete = async (id: number) => {
    if (!confirm("هل أنت متأكد من حذف هذا المشروع؟")) return;
    try {
      await apiDelete(`/projects/${id}`);
      fetchProjects();
    } catch (error: unknown) {
      console.error("Delete project error:", error);
      const err = error as { message?: string };
      alert(err.message || "حدث خطأ أثناء حذف المشروع");
    }
  };

  const handleCreate = async (form: ProjectFormData) => {
    setSubmitting(true);
    try {
      const payload = {
        project_name: form.project_name,
        description: form.description || "",
        type: form.type || null,
        status: form.status,
        internal_budget: form.internal_budget ? Number(form.internal_budget) : 0,
        total_cost: form.total_cost ? Number(form.total_cost) : 0,
        requirements_study: form.requirements_study_text || "",
        start_date: form.start_date || null,
         end_date: form.end_date || null,
         owner_id: form.owner_id ? Number(form.owner_id) : null,
         customer_id: form.customer_id ? Number(form.customer_id) : null,
         features: form.features,
         payment_stages: form.payment_stages.map(s => ({ name: s.name, amount: Number(s.amount) })),
       };
      await apiPost("/projects", payload);
      setCreateOpen(false);
      fetchProjects();
    } catch (error: unknown) {
      console.error("Create project error:", error);
      const err = error as { message?: string };
      alert(err.message || "حدث خطأ أثناء إنشاء المشروع");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = async (form: ProjectFormData) => {
    if (!editProject) return;
    setSubmitting(true);
    try {
      const payload = {
        project_name: form.project_name,
        description: form.description || "",
        type: form.type || null,
        status: form.status,
        internal_budget: form.internal_budget ? Number(form.internal_budget) : 0,
        total_cost: form.total_cost ? Number(form.total_cost) : 0,
        requirements_study: form.requirements_study_text || "",
        start_date: form.start_date || null,
         end_date: form.end_date || null,
         owner_id: form.owner_id ? Number(form.owner_id) : null,
         customer_id: form.customer_id ? Number(form.customer_id) : null,
         features: form.features,
         payment_stages: form.payment_stages.map(s => ({ name: s.name, amount: Number(s.amount) })),
       };
      await apiPut(`/projects/${editProject.id}`, payload);
      setEditProject(null);
      fetchProjects();
    } catch (error: unknown) {
      console.error("Edit project error:", error);
      const err = error as { message?: string };
      alert(err.message || "حدث خطأ أثناء تعديل المشروع");
    } finally {
      setSubmitting(false);
    }
  };

  const openEdit = (p: Project) => {
    setEditProject(p);
    setActiveMenu(null);
  };

  const handleExport = () => {
    if (!data?.data.length) return;
    exportToCSV(
      data.data.map(p => ({
        الاسم: p.project_name,
        النوع: p.type,
        الحالة: getStatusLabel(p.status),
        الميزانية: p.internal_budget,
        "تاريخ البدء": p.start_date,
        "تاريخ الانتهاء": p.end_date,
      })),
      "projects"
    );
  };

  // Stats computed from current page data
  const projects = data?.data || [];
  const stats = [
    { label: "إجمالي المشاريع", value: data?.total ?? 0, icon: FolderKanban, color: "text-primary", bg: "bg-primary/10", border: "border-primary/20" },
    { label: "قيد التنفيذ", value: projects.filter(p => p.status === "in_progress").length, icon: Activity, color: "text-accent", bg: "bg-accent/10", border: "border-accent/20" },
    { label: "مكتملة", value: projects.filter(p => p.status === "completed").length, icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
    { label: "موقوفة", value: projects.filter(p => p.status === "on_hold").length, icon: Pause, color: "text-text-muted", bg: "bg-white/5", border: "border-white/10" },
  ];

  const hasFilters = search || statusFilter || typeFilter || customerFilter;

  return (
    <div className="space-y-8 animate-in fade-in duration-500" dir="rtl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-foreground">المشاريع</h1>
          <p className="text-sm text-text-muted">إدارة وتتبع دورة حياة المشاريع والميزانيات</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleExport} className="btn-ghost flex items-center gap-2 px-4 py-2.5" aria-label="تصدير CSV">
            <Download className="h-4 w-4" /> تصدير
          </button>
          <button onClick={() => setCreateOpen(true)} className="btn-primary px-5 py-2.5">
            <Plus className="h-5 w-5" /> مشروع جديد
          </button>
        </div>
      </div>

      {/* Filter Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
         {/* Stats - Left on Desktop */}
         <div className="lg:col-span-1 grid grid-cols-2 lg:grid-cols-1 gap-4">
            {isLoading ? <SkeletonStatCards count={4} /> : (
              stats.map(s => (
                <div key={s.label} className={cn("stat-card p-5 border flex items-center justify-between transition-all hover:scale-[1.02]", s.border)}>
                  <div>
                    <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1">{s.label}</p>
                    <p className="text-2xl font-bold text-foreground">{s.value}</p>
                  </div>
                  <div className={cn("p-2.5 rounded-xl shadow-inner", s.bg)}>
                    <s.icon className={cn("h-5 w-5", s.color)} />
                  </div>
                </div>
              ))
            )}
         </div>

         {/* Projects Table/Grid - Right on Desktop */}
         <div className="lg:col-span-3 space-y-6">
            <div className="bg-card p-5 flex flex-col sm:flex-row gap-4 flex-wrap border border-border rounded-2xl shadow-sm">
               <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted pointer-events-none" />
                  <input
                    type="text"
                    placeholder="ابحث عن مشروع بالاسم أو الوصف..."
                    value={search}
                    onChange={e => handleFilter("search", e.target.value)}
                    className="input-base pr-11"
                  />
               </div>
               <div className="flex gap-4 scroll-m-2 overflow-x-auto pb-1 sm:pb-0">
                  <select value={statusFilter} onChange={e => handleFilter("status", e.target.value)} className="select-base min-w-[130px]" aria-label="الحالة">
                    <option value="">كل الحالات</option>
                    <option value="pending">قيد الانتظار</option>
                    <option value="in_progress">قيد التنفيذ</option>
                    <option value="completed">مكتمل</option>
                    <option value="on_hold">معلق</option>
                  </select>
                  <select value={typeFilter} onChange={e => handleFilter("type", e.target.value)} className="select-base min-w-[130px]" aria-label="النوع">
                    <option value="">كل الأنواع</option>
                    {projectTypes.map(pt => (
                      <option key={pt.id} value={pt.id}>{pt.name}</option>
                    ))}
                  </select>
               </div>
               
               <div className="flex items-center gap-2 mr-auto pt-1 sm:pt-0 border-t sm:border-t-0 border-border">
                  <div className="flex items-center bg-white/5 p-1 rounded-xl border border-white/5">
                     <button onClick={() => pushParams({ view: "table" })} className={cn("p-2 rounded-lg transition-all", viewMode === "table" ? "bg-primary text-white shadow-lg" : "text-text-muted hover:text-foreground")} aria-label="عرض جدول">
                       <List className="h-4 w-4" />
                     </button>
                     <button onClick={() => pushParams({ view: "card" })} className={cn("p-2 rounded-lg transition-all", viewMode === "card" ? "bg-primary text-white shadow-lg" : "text-text-muted hover:text-foreground")} aria-label="عرض بطاقات">
                       <LayoutGrid className="h-4 w-4" />
                     </button>
                  </div>
                  {hasFilters && (
                    <button onClick={resetFilters} className="p-2.5 rounded-xl text-red-500 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all shadow-sm" title="إعادة تعيين">
                      <X className="h-5 w-5" />
                    </button>
                  )}
               </div>
            </div>

            <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden min-h-[400px]">
              {isLoading ? (
                viewMode === "table" ? <SkeletonTable cols={6} rows={6} /> : <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6"><SkeletonCards count={4} /></div>
              ) : isError ? (
                <div className="flex flex-col items-center justify-center py-24 gap-4">
                  <div className="p-4 bg-red-500/10 rounded-full">
                     <AlertCircle className="h-8 w-8 text-red-500" />
                  </div>
                  <p className="text-text-muted font-bold">فشل في جلب البيانات</p>
                  <button onClick={fetchProjects} className="btn-ghost text-xs font-bold uppercase tracking-wider py-2 px-6">إعادة المحاولة</button>
                </div>
              ) : projects.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-32 gap-4">
                  <div className="p-5 bg-white/5 rounded-full">
                    <FolderKanban className="h-10 w-10 text-border" />
                  </div>
                  <div className="text-center">
                    <p className="text-foreground font-bold text-lg">لم يتم العثور على مشاريع</p>
                    <p className="text-text-muted text-sm mt-1">ابدأ بإنشاء مشروعك الأول الآن</p>
                  </div>
                  <button onClick={() => setCreateOpen(true)} className="btn-primary mt-2">
                    <Plus className="h-4 w-4" /> إنشاء مشروع جديد
                  </button>
                </div>
              ) : viewMode === "table" ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr>
                        <th className="px-6 py-4"><SortableHeader label="المشروع" field="project_name" sortBy={sortBy} sortOrder={sortOrder} onSort={handleSort} /></th>
                        <th className="px-6 py-4 hidden md:table-cell">النوع والعميل</th>
                        <th className="px-6 py-4"><SortableHeader label="الحالة" field="status" sortBy={sortBy} sortOrder={sortOrder} onSort={handleSort} /></th>
                        <th className="px-6 py-4 hidden sm:table-cell"><SortableHeader label="الميزانية" field="internal_budget" sortBy={sortBy} sortOrder={sortOrder} onSort={handleSort} /></th>
                        <th className="px-6 py-4 hidden lg:table-cell text-right">بداية / نهاية</th>
                        <th className="px-6 py-4 text-center w-16">إجراء</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {projects.map(p => (
                        <tr key={p.id} className="hover:bg-white/[0.03] transition-all group">
                          <td className="px-6 py-4">
                            <Link href={`/dashboard/dashboard/projects/${p.id}`} className="block">
                              <p className="font-bold text-foreground group-hover:text-primary transition-colors">{p.project_name}</p>
                              <p className="text-[10px] text-text-muted mt-1 truncate max-w-[200px]">{p.description || "لا يوجد وصف"}</p>
                            </Link>
                          </td>
                          <td className="px-6 py-4 hidden md:table-cell">
                            <p className="text-xs font-bold text-foreground">{p.type || "عام"}</p>
                            <p className="text-[10px] text-text-muted mt-0.5">{p.customer?.name || "بدون عميل"}</p>
                          </td>
                          <td className="px-6 py-4">
                            <StatusBadge status={p.status} />
                          </td>
                          <td className="px-6 py-4 hidden sm:table-cell">
                            <div className="flex items-center gap-1.5">
                               <span className="text-primary font-bold">$</span>
                               <span className="font-bold text-foreground">{p.internal_budget?.toLocaleString()}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 hidden lg:table-cell text-right">
                             <div className="flex flex-col items-end gap-1 font-medium text-[10px] text-text-muted">
                                <span className="px-2 py-0.5 bg-white/5 rounded border border-white/5" dir="ltr">{p.start_date || "—"}</span>
                                <span className="px-2 py-0.5 bg-red-500/5 rounded border border-red-500/10" dir="ltr">{p.end_date || "—"}</span>
                             </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="relative flex justify-center">
                              <button onClick={(e) => { e.stopPropagation(); setActiveMenu(activeMenu === p.id ? null : p.id) }} className="p-2 rounded-xl hover:bg-white/10 transition-colors">
                                <MoreVertical className="h-4 w-4 text-text-muted" />
                              </button>
                              {activeMenu === p.id && (
                                <div className="absolute left-0 top-full mt-2 w-44 rounded-2xl bg-card shadow-2xl ring-1 ring-white/10 z-50 py-2 border border-border animate-in fade-in zoom-in-95 duration-200">
                                  <Link href={`/dashboard/dashboard/projects/${p.id}`} className="flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-gray-400 hover:text-white hover:bg-primary/10 transition-colors">
                                    <Eye className="h-4 w-4" /> عرض التفاصيل
                                  </Link>
                                  <button onClick={() => openEdit(p)} className="flex w-full items-center gap-3 px-4 py-2.5 text-xs font-bold text-gray-400 hover:text-white hover:bg-primary/10 transition-colors">
                                    <Edit className="h-4 w-4" /> تعديل البيانات
                                  </button>
                                  <div className="h-px bg-border my-1 mx-2" />
                                  <button onClick={() => handleDelete(p.id)} className="flex w-full items-center gap-3 px-4 py-2.5 text-xs font-bold text-red-500 hover:bg-red-500/10 transition-colors">
                                    <Trash2 className="h-4 w-4" /> حذف المشروع
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
              ) : (
                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {projects.map(p => {
                    const projectExt = p as Project & { tasks_count?: number; completed_tasks_count?: number };
                    const total = projectExt.tasks_count ?? 0;
                    const done = projectExt.completed_tasks_count ?? 0;
                    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
                    return (
                      <Link key={p.id} href={`/dashboard/dashboard/projects/${p.id}`} className="group card p-6 border border-border hover:border-primary/40 hover:shadow-xl transition-all duration-300 relative overflow-hidden block">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[40px] rounded-full pointer-events-none group-hover:bg-primary/10 transition-all" />
                        
                        <div className="flex items-start justify-between relative z-10 mb-4">
                           <StatusBadge status={p.status} />
                           <span className="text-[10px] uppercase font-bold text-text-muted bg-white/5 px-2 py-1 rounded-md">{p.type || "عام"}</span>
                        </div>
                        
                        <h3 className="font-bold text-foreground group-hover:text-primary transition-colors text-lg mb-2 relative z-10">{p.project_name}</h3>
                        <p className="text-xs text-text-muted line-clamp-2 mb-6 h-8 leading-relaxed relative z-10">{p.description || "لا يوجد وصف حالياً للمشروع."}</p>
                        
                        <div className="space-y-4 relative z-10">
                           <div className="space-y-1.5">
                              <div className="flex justify-between items-end">
                                 <span className="text-[10px] font-bold text-text-muted flex items-center gap-1.5"><Activity className="h-3 w-3 text-primary" /> التقدم المحرز</span>
                                 <span className="text-[10px] font-bold text-foreground" dir="ltr">{pct}%</span>
                              </div>
                              <div className="h-2 bg-white/5 rounded-full overflow-hidden shadow-inner">
                                 <div className="h-full bg-primary shadow-[0_0_10px_rgba(255,117,15,0.4)] transition-all duration-1000" style={{ width: `${pct}%` }} />
                              </div>
                           </div>
                           
                           <div className="flex items-center justify-between pt-4 border-t border-white/5">
                              <div className="flex flex-col">
                                 <p className="text-[10px] font-bold text-text-muted uppercase">الميزانية</p>
                                 <p className="text-sm font-bold text-foreground">${p.internal_budget?.toLocaleString()}</p>
                              </div>
                              <div className="flex flex-col items-end">
                                 <p className="text-[10px] font-bold text-text-muted uppercase">العميل</p>
                                 <p className="text-xs font-medium text-foreground truncate max-w-[100px]">{p.customer?.name || "بدون عميل"}</p>
                              </div>
                           </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
              
              {data && data.last_page > 1 && (
                <div className="px-6 py-4 bg-white/5 border-t border-border">
                  <Pagination
                    currentPage={data.current_page}
                    lastPage={data.last_page}
                    total={data.total}
                    perPage={data.per_page}
                    onPageChange={p => pushParams({ page: p })}
                    onPerPageChange={pp => pushParams({ per_page: pp, page: 1 })}
                  />
                </div>
              )}
            </div>
         </div>
      </div>

      {/* Modals */}
      <Modal open={createOpen} onClose={() => setCreateOpen(false)} title="مشروع جديد" size="lg">
        <ProjectForm
          initial={EMPTY_FORM}
          customers={customers}
          users={users}
          projectTypes={projectTypes}
          onSubmit={handleCreate}
          submitting={submitting}
        />
      </Modal>

      <Modal open={editProject !== null} onClose={() => setEditProject(null)} title="تعديل المشروع" size="lg">
        {editProject && (
          <ProjectForm
            initial={{
              project_name: editProject.project_name,
              description: editProject.description || "",
              type: String(editProject.type || ""),
              internal_budget: String(editProject.internal_budget || ""),
              total_cost: String(editProject.total_cost || ""),
              requirements_study_text: editProject.requirements_study_text || (typeof editProject.requirements_study === 'string' ? editProject.requirements_study : ""),
              start_date: editProject.start_date || "",
              end_date: editProject.end_date || "",
               status: editProject.status,
               owner_id: String(editProject.owner_id || ""),
               customer_id: String(editProject.customer_id || ""),
               features: editProject.features || "",
               payment_stages: editProject.payment_stages?.map(s => ({ name: s.name, amount: String(s.amount) })) || [],
             }}
            customers={customers}
            users={users}
            projectTypes={projectTypes}
            onSubmit={handleEdit}
            submitting={submitting}
          />
        )}
      </Modal>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense>
      <ProjectsPageInner />
    </Suspense>
  );
}
