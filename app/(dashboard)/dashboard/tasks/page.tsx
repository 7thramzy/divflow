"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { api, extractPaginatedData, apiGet, apiPost, apiPut, apiDelete } from "@/lib/api";
import { Task, PaginatedResponse, Milestone, User } from "@/lib/types";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Pagination } from "@/components/ui/Pagination";
import { SortableHeader } from "@/components/ui/SortableHeader";
import { SkeletonTable, SkeletonStatCards, SkeletonChart, SkeletonCards } from "@/components/ui/SkeletonTable";
import { CHART_COLORS } from "@/lib/constants";
import { getStatusLabel, exportToCSV, cn } from "@/lib/utils";
import {
  Plus, Search, X, List, LayoutGrid, Download, RefreshCw,
  CheckSquare, CheckCircle2, Clock, AlertCircle, MoreVertical, Eye, Edit, Trash2,
  Calendar, Flag, User as UserIcon
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell
} from "recharts";
import {
  DndContext, DragEndEvent, DragOverlay, DragStartEvent,
  PointerSensor, useSensor, useSensors, useDroppable, useDraggable
} from "@dnd-kit/core";
import { Modal } from "@/components/ui/Modal";

// ── Task Form ────────────────────────────────────────────────────────────────

interface TaskFormData {
  project_id: string;
  milestone_id: string;
  parent_task_id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  estimated_hours: string;
  task_weight: string;
  billing_type: string;
  internal_price: string;
  initial_note: string;
  assigned_users: number[];
}

const EMPTY_TASK_FORM: TaskFormData = {
  project_id: "", milestone_id: "", parent_task_id: "", title: "",
  description: "", priority: "medium", status: "pending",
  estimated_hours: "", task_weight: "", billing_type: "fixed",
  internal_price: "", initial_note: "", assigned_users: [],
};

function TaskForm({
  initial, projects, allMilestones, allUsers, onSubmit, submitting,
}: {
  initial: TaskFormData;
  projects: { id: number; project_name: string }[];
  allMilestones: Milestone[];
  allUsers: User[];
  onSubmit: (data: TaskFormData) => void;
  submitting: boolean;
}) {
  const [form, setForm] = useState<TaskFormData>(initial);
  const [milestones, setMilestones] = useState<Milestone[]>(allMilestones);
  const set = (k: keyof TaskFormData, v: TaskFormData[keyof TaskFormData]) => setForm(f => ({ ...f, [k]: v }));

  useEffect(() => {
    if (!form.project_id) { 
      Promise.resolve().then(() => setMilestones([])); 
      return; 
    }
    api.get(`/projects/${form.project_id}`)
      .then(r => setMilestones(r.data.data?.milestones || r.data.milestones || []))
      .catch(() => setMilestones([]));
  }, [form.project_id]);

  return (
    <form onSubmit={e => { e.preventDefault(); onSubmit(form); }} className="space-y-6 pt-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">عنوان المهمة *</label>
          <input required className="input-base" value={form.title} onChange={e => set("title", e.target.value)} placeholder="مثلاً: تصميم واجهة المستخدم" />
        </div>
        <div>
          <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">المشروع *</label>
          <select required className="select-base" value={form.project_id} onChange={e => { set("project_id", e.target.value); setForm(f => ({ ...f, milestone_id: "", parent_task_id: "" })); }}>
            <option value="">اختر المشروع</option>
            {projects.map(p => <option key={p.id} value={p.id}>{p.project_name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">المرحلة</label>
          <select className="select-base" value={form.milestone_id} onChange={e => set("milestone_id", e.target.value)} disabled={!form.project_id}>
            <option value="">{form.project_id ? "بدون مرحلة" : "اختر المشروع أولاً"}</option>
            {milestones.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">الأولوية</label>
          <select className="select-base" value={form.priority} onChange={e => set("priority", e.target.value)}>
            <option value="low">منخفضة</option>
            <option value="medium">متوسطة</option>
            <option value="high">عالية</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">الحالة</label>
          <select className="select-base" value={form.status} onChange={e => set("status", e.target.value)}>
            <option value="pending">قيد الانتظار</option>
            <option value="in_progress">قيد التنفيذ</option>
            <option value="completed">مكتمل</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">نوع التسعير</label>
          <select className="select-base" value={form.billing_type} onChange={e => set("billing_type", e.target.value)}>
            <option value="fixed">ثابت</option>
            <option value="hourly">بالساعة</option>
            <option value="non-billable">غير مدفوع</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">الساعات المقدرة</label>
          <input type="number" min="0" step="0.5" className="input-base" value={form.estimated_hours} onChange={e => set("estimated_hours", e.target.value)} placeholder="0" />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">الوصف</label>
          <textarea rows={3} className="input-base resize-none" value={form.description} onChange={e => set("description", e.target.value)} placeholder="تفاصيل المهمة والمتطلبات" />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">المكلفون بالعمل</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 border border-border rounded-2xl bg-white/[0.02]">
            {allUsers.map(user => (
              <label key={user.id} className="flex items-center gap-2.5 text-xs font-medium cursor-pointer hover:bg-white/5 p-2 rounded-xl transition-all">
                <input
                  type="checkbox"
                  checked={form.assigned_users.includes(user.id)}
                  onChange={e => {
                    const ids = e.target.checked 
                      ? [...form.assigned_users, user.id]
                      : form.assigned_users.filter(id => id !== user.id);
                    set("assigned_users", ids);
                  }}
                  className="rounded border-border bg-transparent text-primary focus:ring-primary h-4 w-4"
                />
                <span className="truncate text-foreground">{user.name}</span>
              </label>
            ))}
            {allUsers.length === 0 && <p className="text-[10px] text-text-muted col-span-full text-center py-4">لا يوجد موظفون متاحون للعرض</p>}
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-6 border-t border-border mt-6">
        <button type="submit" disabled={submitting} className="btn-primary min-w-[120px]">
          {submitting ? "جاري الحفظ..." : "حفظ المهمة"}
        </button>
      </div>
    </form>
  );
}

// ── Kanban components ───────────────────────────────────────────────────────
const KANBAN_COLS = [
  { id: "pending", label: "قيد الانتظار", color: "text-text-muted", bg: "bg-white/5" },
  { id: "in_progress", label: "قيد التنفيذ", color: "text-accent", bg: "bg-accent/10" },
  { id: "completed", label: "مكتمل", color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { id: "on_hold", label: "معلق", color: "text-red-500", bg: "bg-red-500/10" },
] as const;

function KanbanCard({ task }: { task: Task }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: task.id });
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{ transform: transform ? `translate(${transform.x}px,${transform.y}px)` : undefined, opacity: isDragging ? 0.4 : 1, zIndex: isDragging ? 50 : 1 }}
      className="group card p-4 cursor-grab active:cursor-grabbing select-none border border-border hover:border-primary/30 transition-all shadow-sm"
    >
      <div className="flex items-start justify-between mb-3">
         <StatusBadge status={task.priority} />
         <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider">#{task.id}</span>
      </div>
      <Link href={`/dashboard/dashboard/tasks/${task.id}`} onClick={e => e.stopPropagation()} className="block font-bold text-sm text-foreground hover:text-primary transition-colors mb-3 line-clamp-2 leading-relaxed">
        {task.title}
      </Link>
      <div className="flex items-center justify-between pt-3 border-t border-white/5">
        <div className="flex -space-x-2 overflow-hidden">
           {task.assigned_users?.slice(0, 3).map((u, i) => (
              <div key={i} className="h-6 w-6 rounded-full bg-primary/20 border-2 border-card flex items-center justify-center text-[8px] font-bold text-primary shadow-inner" title={u.name}>
                 {u.name.substring(0, 2).toUpperCase()}
              </div>
           ))}
        </div>
        <span className="text-[10px] font-bold text-text-muted flex items-center gap-1"><Clock className="h-3 w-3" /> {task.estimated_hours}h</span>
      </div>
    </div>
  );
}

function KanbanColumn({ col, tasks }: { col: typeof KANBAN_COLS[number]; tasks: Task[] }) {
  const { setNodeRef, isOver } = useDroppable({ id: col.id });
  return (
    <div ref={setNodeRef} className={cn("flex flex-col gap-3 min-h-[500px] p-4 rounded-2xl transition-all border", isOver ? "bg-primary/5 border-primary/20 scale-[1.01]" : "bg-card/30 border-border")}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
           <div className={cn("w-2 h-2 rounded-full", col.id === 'pending' ? 'bg-text-muted' : col.id === 'in_progress' ? 'bg-accent' : col.id === 'completed' ? 'bg-emerald-500' : 'bg-red-500')} />
           <span className="text-xs font-bold text-foreground uppercase tracking-widest">{col.label}</span>
        </div>
        <span className="text-[10px] font-bold bg-white/5 text-text-muted rounded-lg px-2 py-0.5 border border-white/5">{tasks.length}</span>
      </div>
      <div className="flex flex-col gap-3">
         {tasks.map(t => <KanbanCard key={t.id} task={t} />)}
      </div>
    </div>
  );
}

// ── Main page ───────────────────────────────────────────────────────────────
function TasksPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") || 1);
  const perPage = Number(searchParams.get("per_page") || 20);
  const search = searchParams.get("search") || "";
  const statusFilter = searchParams.get("status") || "";
  const priorityFilter = searchParams.get("priority") || "";
  const billingFilter = searchParams.get("billing_type") || "";
  const projectFilter = searchParams.get("project_id") || "";
  const milestoneFilter = searchParams.get("milestone_id") || "";
  const assignedFilter = searchParams.get("assigned_to") || "";
  const sortBy = searchParams.get("sort_by") || "created_at";
  const sortOrder = (searchParams.get("sort_order") || "desc") as "asc" | "desc";
  const viewMode = (searchParams.get("view") || "table") as "table" | "kanban";

  const [data, setData] = useState<PaginatedResponse<Task> | null>(null);
  const [projects, setProjects] = useState<{ id: number; project_name: string }[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [users, setUsers] = useState<{ id: number; name: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [dragActive, setDragActive] = useState<Task | null>(null);
  const [optimisticTasks, setOptimisticTasks] = useState<Task[]>([]);
  const [createOpen, setCreateOpen] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  const pushParams = useCallback((updates: Record<string, string | number>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([k, v]) => {
      if (v === "" || v === null || v === undefined) params.delete(k);
      else params.set(k, String(v));
    });
    router.push(`?${params.toString()}`);
  }, [router, searchParams]);

  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const params: Record<string, string | number> = { page, per_page: perPage, sort_by: sortBy, sort_order: sortOrder };
      if (search) params.search = search;
      if (statusFilter) params.status = statusFilter;
      if (priorityFilter) params.priority = priorityFilter;
      if (billingFilter) params.billing_type = billingFilter;
      if (projectFilter) params.project_id = projectFilter;
      if (milestoneFilter) params.milestone_id = milestoneFilter;
      if (assignedFilter) params.assigned_to = assignedFilter;
      
      const res = await api.get("/tasks", { params });
      const result = extractPaginatedData<Task>(res);
      setData(result);
      setOptimisticTasks(result.data);
    } catch (error: unknown) {
      console.error("Failed to fetch tasks:", error);
      setIsError(true);
      const err = error as { isNetworkError?: boolean; message?: string };
      if (err.isNetworkError) {
        alert(err.message || "فشل الاتصال بالخادم");
      }
    } finally {
      setIsLoading(false);
    }
  }, [page, perPage, search, statusFilter, priorityFilter, billingFilter, projectFilter, milestoneFilter, assignedFilter, sortBy, sortOrder]);

  useEffect(() => { fetchTasks(); }, [fetchTasks]);

  useEffect(() => {
    const fetchRelatedData = async () => {
      try {
        const [projectsRes, usersRes] = await Promise.all([
          apiGet<{ id: number; project_name: string }[]>("/projects", { params: { per_page: 200 } }),
          apiGet<{ id: number; name: string }[]>("/admin/users", { params: { per_page: 200 } }),
        ]);
        setProjects(projectsRes || []);
        setUsers(usersRes || []);
      } catch (error) {
        console.error("Failed to fetch related data:", error);
      }
    };
    fetchRelatedData();
  }, []);

  useEffect(() => {
    if (!projectFilter) { setMilestones([]); return; }
    api.get(`/projects/${projectFilter}`).then(r => setMilestones(r.data.data?.milestones || r.data.milestones || [])).catch(() => {});
  }, [projectFilter]);

  useEffect(() => {
    const close = () => setActiveMenu(null);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const handleSort = (field: string) => {
    pushParams({ sort_by: field, sort_order: sortBy === field && sortOrder === "asc" ? "desc" : "asc", page: 1 });
  };

  const handleFilter = (key: string, value: string) => {
    const updates: Record<string, string | number> = { [key]: value, page: 1 };
    if (key === "project_id") { updates.milestone_id = ""; }
    pushParams(updates);
  };

  const resetFilters = () => router.push("?page=1");

  const handleDelete = async (id: number) => {
    if (!confirm("هل أنت متأكد من حذف هذه المهمة؟")) return;
    try { 
      await apiDelete(`/tasks/${id}`); 
      fetchTasks(); 
    } catch (error: unknown) { 
      const err = error as { message?: string };
      alert(err.message || "حدث خطأ أثناء حذف المهمة"); 
    }
  };

  const handleCreate = async (form: TaskFormData) => {
    setSubmitting(true);
    try {
      await apiPost("/tasks", {
        project_id: Number(form.project_id),
        milestone_id: form.milestone_id ? Number(form.milestone_id) : null,
        parent_task_id: form.parent_task_id ? Number(form.parent_task_id) : null,
        title: form.title,
        description: form.description || "",
        priority: form.priority,
        status: form.status,
        estimated_hours: form.estimated_hours ? Number(form.estimated_hours) : null,
        task_weight: form.task_weight ? Number(form.task_weight) : null,
        billing_type: form.billing_type,
        internal_price: form.internal_price ? Number(form.internal_price) : null,
        initial_note: form.initial_note || null,
        assigned_users: form.assigned_users,
      });
      setCreateOpen(false);
      fetchTasks();
    } catch (error: unknown) { 
      const err = error as { message?: string };
      alert(err.message || "حدث خطأ أثناء إنشاء المهمة"); 
    }
    finally { setSubmitting(false); }
  };

  const handleEdit = async (form: TaskFormData) => {
    if (!editTask) return;
    setSubmitting(true);
    try {
      await apiPut(`/tasks/${editTask.id}`, {
        title: form.title,
        description: form.description || "",
        priority: form.priority,
        status: form.status,
        estimated_hours: form.estimated_hours ? Number(form.estimated_hours) : null,
        task_weight: form.task_weight ? Number(form.task_weight) : null,
        billing_type: form.billing_type,
        internal_price: form.internal_price ? Number(form.internal_price) : null,
        assigned_users: form.assigned_users,
      });
      setEditTask(null);
      fetchTasks();
    } catch (error: unknown) { 
      const err = error as { message?: string };
      alert(err.message || "حدث خطأ أثناء تعديل المهمة"); 
    }
    finally { setSubmitting(false); }
  };

  const openEdit = (t: Task) => { setEditTask(t); setActiveMenu(null); };

  // Kanban DnD
  const handleDragStart = (e: DragStartEvent) => {
    const task = optimisticTasks.find(t => t.id === e.active.id);
    setDragActive(task || null);
  };

  const handleDragEnd = async (e: DragEndEvent) => {
    setDragActive(null);
    const { active, over } = e;
    if (!over) return;
    const newStatus = String(over.id) as Task["status"];
    const task = optimisticTasks.find(t => t.id === active.id);
    if (!task || task.status === newStatus) return;
    // Optimistic update
    setOptimisticTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: newStatus } : t));
    try {
      await apiPut(`/tasks/${task.id}`, { status: newStatus });
    } catch (error: unknown) {
      setOptimisticTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: task.status } : t));
      const err = error as { message?: string };
      alert(err.message || "فشل تحديث الحالة");
    }
  };

  const tasks = optimisticTasks;
  const hasFilters = search || statusFilter || priorityFilter || billingFilter || projectFilter || milestoneFilter || assignedFilter;

  // Stats
  const stats = [
    { label: "إجمالي المهام", value: data?.total ?? 0, icon: CheckSquare, color: "text-primary", bg: "bg-primary/10", border: "border-primary/20" },
    { label: "مكتملة", value: tasks.filter(t => t.status === "completed").length, icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
    { label: "قيد التنفيذ", value: tasks.filter(t => t.status === "in_progress").length, icon: Clock, color: "text-accent", bg: "bg-accent/10", border: "border-accent/20" },
  ];

  // Priority chart
  const priorityData = [
    { name: "منخفضة", value: tasks.filter(t => t.priority === "low").length },
    { name: "متوسطة", value: tasks.filter(t => t.priority === "normal").length },
    { name: "عالية", value: tasks.filter(t => t.priority === "high").length },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500" dir="rtl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-foreground">المهام</h1>
          <p className="text-sm text-text-muted">نظرة عامة على جميع المهام المسندة والتقدم المحرز</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => exportToCSV(tasks.map(t => ({ العنوان: t.title, الحالة: getStatusLabel(t.status), الأولوية: getStatusLabel(t.priority), "الساعات المقدرة": t.estimated_hours })), "tasks")} className="btn-ghost flex items-center gap-2 px-4 py-2.5" aria-label="تصدير CSV">
            <Download className="h-4 w-4" /> تصدير
          </button>
          <button onClick={() => setCreateOpen(true)} className="btn-primary px-5 py-2.5"><Plus className="h-5 w-5" /> مهمة جديدة</button>
        </div>
      </div>

      {/* Stats and Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {isLoading ? <SkeletonStatCards count={3} /> : (
              stats.map(s => (
                <div key={s.label} className={cn("stat-card p-6 border flex flex-col justify-between transition-all hover:scale-[1.02]", s.border)}>
                  <div className="flex items-center justify-between mb-4">
                     <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest leading-none">{s.label}</p>
                     <div className={cn("p-2 rounded-lg shadow-inner", s.bg)}>
                       <s.icon className={cn("h-4 w-4", s.color)} />
                     </div>
                  </div>
                  <p className="text-3xl font-bold text-foreground" dir="ltr">{s.value}</p>
                </div>
              ))
            )}
          </div>
          <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
             <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-4">الأولويات</h3>
             {isLoading ? <SkeletonChart height={100} /> : (
                <ResponsiveContainer width="100%" height={80}>
                  <BarChart data={priorityData} layout="vertical">
                    <XAxis type="number" hide />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fontWeight: 700, fill: 'var(--color-text-muted)' }} width={60} />
                    <Tooltip 
                       contentStyle={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)', borderRadius: '12px', fontSize: '12px' }}
                       cursor={{ fill: 'transparent' }}
                    />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={12}>
                      {priorityData.map((_, i) => <Cell key={i} fill={i === 0 ? '#94a3b8' : i === 1 ? 'var(--color-primary)' : 'var(--color-accent)'} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
             )}
          </div>
      </div>

      {/* Filters */}
      <div className="bg-card p-5 flex flex-col lg:flex-row gap-4 flex-wrap border border-border rounded-2xl shadow-sm items-center">
        <div className="relative flex-1 min-w-[240px] w-full lg:w-auto">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted pointer-events-none" />
          <input type="text" placeholder="ابحث عن مهمة بالعنوان أو المحتوى..." value={search} onChange={e => handleFilter("search", e.target.value)} className="input-base pr-11" />
        </div>
        <div className="flex gap-4 w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0 scroll-m-2">
           <select value={statusFilter} onChange={e => handleFilter("status", e.target.value)} className="select-base min-w-[130px]" aria-label="الحالة">
             <option value="">جميع الحالات</option>
             <option value="pending">قيد الانتظار</option>
             <option value="in_progress">قيد التنفيذ</option>
             <option value="completed">مكتمل</option>
             <option value="on_hold">معلق</option>
           </select>
           <select value={priorityFilter} onChange={e => handleFilter("priority", e.target.value)} className="select-base min-w-[130px]" aria-label="الأولوية">
             <option value="">كل الأولويات</option>
             <option value="low">منخفضة</option>
             <option value="normal">متوسطة</option>
             <option value="high">عالية</option>
           </select>
           <select value={projectFilter} onChange={e => handleFilter("project_id", e.target.value)} className="select-base min-w-[150px]" aria-label="المشروع">
             <option value="">جميع المشاريع</option>
             {projects.map(p => <option key={p.id} value={p.id}>{p.project_name}</option>)}
           </select>
        </div>
        
        <div className="flex items-center gap-2 mr-auto w-full lg:w-auto justify-end border-t lg:border-t-0 border-border pt-4 lg:pt-0">
           <div className="flex items-center bg-white/5 p-1 rounded-xl border border-white/5">
              <button onClick={() => pushParams({ view: "table" })} className={cn("p-2 rounded-lg transition-all", viewMode === "table" ? "bg-primary text-white shadow-lg" : "text-text-muted hover:text-foreground")} aria-label="عرض جدول"><List className="h-4 w-4" /></button>
              <button onClick={() => pushParams({ view: "kanban" })} className={cn("p-2 rounded-lg transition-all", viewMode === "kanban" ? "bg-primary text-white shadow-lg" : "text-text-muted hover:text-foreground")} aria-label="عرض كانبان"><LayoutGrid className="h-4 w-4" /></button>
           </div>
           {hasFilters && (
             <button onClick={resetFilters} className="p-2.5 rounded-xl text-red-500 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all shadow-sm" title="إعادة تعيين">
               <X className="h-5 w-5" />
             </button>
           )}
        </div>
      </div>

      {/* Main Content */}
      <div className={cn("min-h-[400px]", viewMode === 'table' ? "bg-card border border-border rounded-2xl shadow-sm overflow-hidden" : "")}>
        {isLoading ? (
          viewMode === "table" ? <SkeletonTable cols={6} rows={8} /> : <div className="grid grid-cols-1 md:grid-cols-3 gap-6"><SkeletonCards count={3} /></div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
             <div className="p-4 bg-red-500/10 rounded-full"><AlertCircle className="h-8 w-8 text-red-500" /></div>
             <p className="text-text-muted font-bold">عذراً، تعذر تحميل قائمة المهام</p>
             <button onClick={fetchTasks} className="btn-ghost text-xs font-bold uppercase tracking-wider py-2 px-6">إعادة المحاولة</button>
          </div>
        ) : tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
             <div className="p-5 bg-white/5 rounded-full"><CheckSquare className="h-10 w-10 text-border" /></div>
             <div className="text-center">
                <p className="text-foreground font-bold text-lg">لا توجد مهام حالياً</p>
                <p className="text-text-muted text-sm mt-1">ابدأ بإنشاء مهمة جديدة وتتبع سير العمل</p>
             </div>
             <button onClick={() => setCreateOpen(true)} className="btn-primary mt-2"><Plus className="h-4 w-4" /> إضافة أول مهمة</button>
          </div>
        ) : viewMode === "table" ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="px-6 py-4"><SortableHeader label="المهمة" field="title" sortBy={sortBy} sortOrder={sortOrder} onSort={handleSort} /></th>
                  <th className="px-6 py-4 hidden md:table-cell">المشروع</th>
                  <th className="px-6 py-4"><SortableHeader label="الأولوية" field="priority" sortBy={sortBy} sortOrder={sortOrder} onSort={handleSort} /></th>
                  <th className="px-6 py-4"><SortableHeader label="الحالة" field="status" sortBy={sortBy} sortOrder={sortOrder} onSort={handleSort} /></th>
                  <th className="px-6 py-4 hidden lg:table-cell">المكلفون</th>
                  <th className="px-6 py-4 text-center w-16">إجراء</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {tasks.map(t => (
                  <tr key={t.id} className="hover:bg-white/[0.03] transition-all group">
                    <td className="px-6 py-4">
                      <Link href={`/dashboard/dashboard/tasks/${t.id}`} className="block">
                        <p className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">{t.title}</p>
                        <p className="text-[10px] text-text-muted mt-1 uppercase tracking-wider font-bold">#{t.id}</p>
                      </Link>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell font-medium text-xs text-text-muted">
                        <Link href={`/dashboard/dashboard/projects/${t.project_id}`} className="hover:text-foreground">مشروع #{t.project_id}</Link>
                    </td>
                    <td className="px-6 py-4"><StatusBadge status={t.priority} /></td>
                    <td className="px-6 py-4"><StatusBadge status={t.status} /></td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <div className="flex -space-x-1.5 overflow-hidden">
                         {t.assigned_users?.slice(0, 4).map((u, i) => (
                            <div key={i} className="h-7 w-7 rounded-full bg-primary/20 border-2 border-card flex items-center justify-center text-[10px] font-bold text-primary shadow-sm" title={u.name}>
                               {u.name.substring(0, 2).toUpperCase()}
                            </div>
                         ))}
                         {t.assigned_users && t.assigned_users.length > 4 && (
                            <div className="h-7 w-7 rounded-full bg-white/5 border-2 border-card flex items-center justify-center text-[9px] font-bold text-text-muted overflow-hidden">
                               +{t.assigned_users.length - 4}
                            </div>
                         )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                       <div className="relative inline-block">
                          <button onClick={() => setActiveMenu(activeMenu === t.id ? null : t.id)} className="p-2 rounded-xl hover:bg-white/10 transition-colors">
                             <MoreVertical className="h-4 w-4 text-text-muted" />
                          </button>
                          {activeMenu === t.id && (
                            <div className="absolute left-0 top-full mt-2 w-40 rounded-2xl bg-card shadow-2xl ring-1 ring-white/10 z-50 py-2 border border-border animate-in fade-in zoom-in-95 duration-200">
                               <Link href={`/dashboard/dashboard/tasks/${t.id}`} className="flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-gray-400 hover:text-white hover:bg-primary/10 transition-colors">
                                  <Eye className="h-4 w-4" /> عرض التفاصيل
                               </Link>
                               <button onClick={() => openEdit(t)} className="flex w-full items-center gap-3 px-4 py-2.5 text-xs font-bold text-gray-400 hover:text-white hover:bg-primary/10 transition-colors">
                                  <Edit className="h-4 w-4" /> تعديل المهمة
                               </button>
                               <div className="h-px bg-border my-1 mx-2" />
                               <button onClick={() => handleDelete(t.id)} className="flex w-full items-center gap-3 px-4 py-2.5 text-xs font-bold text-red-500 hover:bg-red-500/10 transition-colors">
                                  <Trash2 className="h-4 w-4" /> حذف المهمة
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
          /* Kanban View */
          <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {KANBAN_COLS.map(col => (
                <KanbanColumn key={col.id} col={col} tasks={tasks.filter(t => t.status === col.id)} />
              ))}
            </div>
            <DragOverlay>
              {dragActive && <div className="card p-4 shadow-2xl rotate-2 opacity-95 scale-105 border-primary/40"><p className="text-sm font-bold text-foreground line-clamp-2">{dragActive.title}</p></div>}
            </DragOverlay>
          </DndContext>
        )}
      </div>

      {data && data.last_page > 1 && viewMode === 'table' && (
        <div className="px-6 py-4 bg-card border border-border rounded-2xl shadow-sm mt-4">
           <Pagination currentPage={data.current_page} lastPage={data.last_page} total={data.total} perPage={data.per_page} onPageChange={p => pushParams({ page: p })} onPerPageChange={pp => pushParams({ per_page: pp, page: 1 })} />
        </div>
      )}

      {/* Modals */}
      <Modal open={createOpen} onClose={() => setCreateOpen(false)} title="إضافة مهمة جديدة" size="lg">
        <TaskForm
          initial={EMPTY_TASK_FORM}
          projects={projects}
          allMilestones={milestones}
          allUsers={users as User[]}
          onSubmit={handleCreate}
          submitting={submitting}
        />
      </Modal>

      <Modal open={editTask !== null} onClose={() => setEditTask(null)} title="تعديل المهمة" size="lg">
        {editTask && (
          <TaskForm
            initial={{
              project_id: String(editTask.project_id),
              milestone_id: String(editTask.milestone_id || ""),
              parent_task_id: String(editTask.parent_task_id || ""),
              title: editTask.title,
              description: editTask.description || "",
              priority: editTask.priority,
              status: editTask.status,
              estimated_hours: String(editTask.estimated_hours || ""),
              task_weight: String(editTask.task_weight || ""),
              billing_type: editTask.billing_type,
               internal_price: String(editTask.internal_price || ""),
               initial_note: "",
               assigned_users: editTask.assigned_users?.map(u => u.id) || [],
             }}
            projects={projects}
            allMilestones={milestones}
            allUsers={users as User[]}
            onSubmit={handleEdit}
            submitting={submitting}
          />
        )}
      </Modal>
    </div>
  );
}

export default function TasksPage() {
  return <Suspense><TasksPageInner /></Suspense>;
}
