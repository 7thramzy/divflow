"use client";

import { useEffect, useState, use } from "react";
import { api } from "@/lib/api";
import { Project, Task, Milestone, InternalNote, User, MediaItem } from "@/lib/types";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { SkeletonChart, SkeletonTable } from "@/components/ui/SkeletonTable";
import { CHART_COLORS } from "@/lib/constants";
import { getStatusLabel, formatCurrency, cn } from "@/lib/utils";
import Link from "next/link";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import {
  ChevronRight, Users, Layers, FileText, MessageSquare,
  CheckSquare, Pin, Download, CheckCircle2, Circle, ChevronDown, ChevronUp,
  TrendingUp, Wallet, Activity
} from "lucide-react";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import MediaUploader from "@/components/MediaUploader";
import ProjectMembersPanel from "@/components/ProjectMembersPanel";

const TABS = ["المهام", "الأعضاء", "المراحل", "الملفات", "الملاحظات"] as const;
type Tab = typeof TABS[number];

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [notes, setNotes] = useState<InternalNote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("المهام");
  const [taskStatusFilter, setTaskStatusFilter] = useState("");
  const [taskPriorityFilter, setTaskPriorityFilter] = useState("");
  const [expandedTasks, setExpandedTasks] = useState<Set<number>>(new Set());

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const [projRes, tasksRes, msRes, notesRes] = await Promise.all([
          api.get(`/projects/${id}`),
          api.get(`/projects/${id}/tasks`), // fixed: Removed incorrect users endpoint
          api.get(`/projects/${id}/milestones`).catch(() => ({ data: [] })),
          api.get(`/projects/${id}/internal-notes`).catch(() => ({ data: [] })),
        ]);
        setProject(projRes.data.data || projRes.data);
        setTasks(tasksRes.data.data || tasksRes.data || []);
        setMilestones(msRes.data.data || msRes.data || []);
        setNotes(notesRes.data.data || notesRes.data || []);
      } catch {
        // handled by empty states
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-96 bg-gray-200 dark:bg-gray-800 rounded-2xl" />
          <div className="h-96 bg-gray-200 dark:bg-gray-800 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!project) {
    return <div className="text-center py-20 text-gray-500" dir="rtl">المشروع غير موجود</div>;
  }

  // Task stats for donut
  const taskStatusCounts = tasks.reduce<Record<string, number>>((acc, t) => {
    acc[t.status] = (acc[t.status] || 0) + 1;
    return acc;
  }, {});
  const donutData = Object.entries(taskStatusCounts).map(([status, count]) => ({
    name: getStatusLabel(status), value: count, status,
  }));
  const completedCount = taskStatusCounts["completed"] || 0;
  const completionPct = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  // Financial
  const totalPaid = (project.payment_stages || []).filter(s => s.status === "paid").reduce((sum, s) => sum + s.amount, 0);
  const totalCost = project.total_cost || 0;
  const paidPct = totalCost > 0 ? Math.round((totalPaid / totalCost) * 100) : 0;

  // Filtered tasks
  const rootTasks = tasks.filter(t => !t.parent_task_id);
  const filteredRoot = rootTasks.filter(t => {
    if (taskStatusFilter && t.status !== taskStatusFilter) return false;
    if (taskPriorityFilter && t.priority !== taskPriorityFilter) return false;
    return true;
  });

  const getSubtasks = (parentId: number) => tasks.filter(t => t.parent_task_id === parentId);

  const toggleExpand = (id: number) => {
    setExpandedTasks(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const pinnedNotes = notes.filter(n => n.is_pinned);
  const unpinnedNotes = notes.filter(n => !n.is_pinned);

  const getFileIcon = (mime: string) => {
    if (mime?.includes("pdf")) return "📄";
    if (mime?.includes("image")) return "🖼️";
    if (mime?.includes("word") || mime?.includes("document")) return "📝";
    if (mime?.includes("sheet") || mime?.includes("excel")) return "📊";
    return "📎";
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <Link href="/dashboard/projects" className="hover:text-primary dark:hover:text-accent transition-colors">المشاريع</Link>
        <ChevronRight className="h-4 w-4 rotate-180" />
        <span className="text-gray-900 dark:text-white font-medium truncate">{project.project_name}</span>
      </nav>

      {/* Title row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{project.project_name}</h1>
          <StatusBadge status={project.status} />
        </div>
      </div>

      {/* Main layout: 70/30 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main column — Tabs */}
        <div className="lg:col-span-2 space-y-4">
          {/* Tab bar */}
          <div className="card overflow-hidden">
            <div className="flex border-b border-gray-200 dark:border-gray-800 overflow-x-auto">
              {TABS.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 -mb-px ${
                    activeTab === tab
                      ? "border-primary text-primary dark:border-accent dark:text-accent"
                      : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="p-4">
              {/* Tab: المهام */}
              {activeTab === "المهام" && (
                <div className="space-y-3">
                  <div className="flex gap-2 flex-wrap">
                    <select value={taskStatusFilter} onChange={e => setTaskStatusFilter(e.target.value)} className="select-base w-auto text-xs py-1.5">
                      <option value="">جميع الحالات</option>
                      <option value="pending">قيد الانتظار</option>
                      <option value="in_progress">قيد التنفيذ</option>
                      <option value="completed">مكتمل</option>
                      <option value="on_hold">معلق</option>
                    </select>
                    <select value={taskPriorityFilter} onChange={e => setTaskPriorityFilter(e.target.value)} className="select-base w-auto text-xs py-1.5">
                      <option value="">جميع الأولويات</option>
                      <option value="low">منخفضة</option>
                      <option value="medium">متوسطة</option>
                      <option value="high">عالية</option>
                    </select>
                  </div>
                  {filteredRoot.length === 0 ? (
                    <p className="text-center py-8 text-gray-400">لا توجد مهام</p>
                  ) : (
                    <div className="divide-y divide-gray-100 dark:divide-gray-800">
                      {filteredRoot.map(task => {
                        const subs = getSubtasks(task.id);
                        const expanded = expandedTasks.has(task.id);
                        return (
                          <div key={task.id}>
                            <div className="flex items-center gap-3 py-3 hover:bg-gray-50/50 dark:hover:bg-gray-800/20 px-2 rounded-lg transition-colors">
                              {subs.length > 0 && (
                                <button onClick={() => toggleExpand(task.id)} className="text-gray-400 hover:text-gray-600 shrink-0" aria-label={expanded ? "طي" : "توسيع"}>
                                  {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                </button>
                              )}
                              {subs.length === 0 && <div className="w-4 shrink-0" />}
                              <Link href={`/dashboard/tasks/${task.id}`} className="flex-1 font-medium text-sm text-gray-900 dark:text-white hover:text-primary dark:hover:text-accent truncate">
                                {task.title}
                              </Link>
                              <StatusBadge status={task.priority} />
                              <StatusBadge status={task.status} />
                              <span className="text-xs text-gray-400 hidden sm:block" dir="ltr">{task.estimated_hours}h</span>
                            </div>
                            {expanded && subs.map(sub => (
                              <div key={sub.id} className="flex items-center gap-3 py-2 pr-8 pl-2 hover:bg-gray-50/50 dark:hover:bg-gray-800/20 rounded-lg transition-colors">
                                <div className="w-4 shrink-0 border-r-2 border-gray-200 dark:border-gray-700 h-4" />
                                <Link href={`/dashboard/tasks/${sub.id}`} className="flex-1 text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-accent truncate">
                                  {sub.title}
                                </Link>
                                <StatusBadge status={sub.status} />
                              </div>
                            ))}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Tab: الأعضاء */}
              {activeTab === "الأعضاء" && (
                <ProjectMembersPanel projectId={Number(id)} />
              )}

              {/* Tab: المراحل */}
              {activeTab === "المراحل" && (
                <div className="space-y-4">
                  {milestones.length === 0 ? (
                    <p className="text-center py-8 text-gray-400">لا توجد مراحل</p>
                  ) : (
                    <div className="relative">
                      <div className="absolute right-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />
                      {milestones.map((ms, i) => {
                        const msTasks = tasks.filter(t => t.milestone_id === ms.id);
                        const done = msTasks.filter(t => t.status === "completed").length;
                        return (
                          <div key={ms.id} className="relative flex gap-4 pb-6 pr-10">
                            <div className={`absolute right-2.5 top-1 h-3 w-3 rounded-full border-2 ${ms.status === "completed" ? "bg-green-500 border-green-500" : "bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600"}`} />
                            <div className="flex-1 card p-4">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="font-medium text-gray-900 dark:text-white">{ms.name}</h4>
                                {ms.due_date && <span className="text-xs text-gray-400" dir="ltr">{format(new Date(ms.due_date), "dd/MM/yyyy")}</span>}
                              </div>
                              {ms.description && <p className="text-xs text-gray-500 mb-2">{ms.description}</p>}
                              <p className="text-xs text-gray-400">{done}/{msTasks.length} مهمة مكتملة</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Tab: الملفات */}
              {activeTab === "الملفات" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300">مرفقات المشروع</h3>
                  </div>
                  <MediaUploader
                    modelType="projects"
                    modelId={Number(id)}
                    media={project.media || []}
                    onMediaChange={(newMedia) => setProject(prev => prev ? { ...prev, media: newMedia } : null)}
                  />
                </div>
              )}

              {/* Tab: الملاحظات */}
              {activeTab === "الملاحظات" && (
                <div className="space-y-3">
                  {pinnedNotes.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-1"><Pin className="h-3 w-3" /> مثبّتة</p>
                      {pinnedNotes.map(n => (
                        <div key={n.id} className="rounded-xl p-4 border border-accent/20 bg-primary-light/50 dark:bg-primary-light/10">
                          <p className="font-medium text-sm text-primary">{n.title}</p>
                          <p className="text-xs text-gray-600 mt-1 line-clamp-2">{n.content}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {unpinnedNotes.map(n => (
                    <div key={n.id} className="card p-4">
                      <p className="font-medium text-sm text-gray-900 dark:text-white">{n.title}</p>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{n.content}</p>
                    </div>
                  ))}
                  {notes.length === 0 && <p className="text-center py-8 text-gray-400">لا توجد ملاحظات</p>}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar — 30% */}
        <div className="space-y-4">
          {/* Project info */}
          <div className="card p-5 space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm flex items-center gap-2">
              <Layers className="h-4 w-4 text-primary" /> معطيات المشروع
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center py-1 border-b border-gray-50 dark:border-gray-800/50">
                <span className="text-gray-500">النوع</span>
                <span className="font-medium text-gray-900 dark:text-white">{project.type}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-gray-50 dark:border-gray-800/50">
                <span className="text-gray-500">العميل</span>
                <span className="font-medium text-gray-900 dark:text-white">{project.customer?.name || "—"}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-gray-50 dark:border-gray-800/50">
                <span className="text-gray-500">المالك</span>
                <span className="font-medium text-gray-900 dark:text-white">{project.owner?.name || `#${project.owner_id}`}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-gray-50 dark:border-gray-800/50">
                <span className="text-gray-500">تاريخ البدء</span>
                <span className="font-medium text-gray-900 dark:text-white">{project.start_date ? format(new Date(project.start_date), "dd MMMM yyyy", { locale: ar }) : "—"}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-500">الموعد النهائي</span>
                <span className="font-medium text-gray-900 dark:text-white">{project.end_date ? format(new Date(project.end_date), "dd MMMM yyyy", { locale: ar }) : "—"}</span>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="card p-5 space-y-3">
             <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm flex items-center gap-2">
                  <Activity className="h-4 w-4 text-accent" /> التقدم الإجمالي
                </h3>
                <span className="font-bold text-gray-900 dark:text-white text-base">{completionPct}%</span>
             </div>
            <div className="h-2.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-accent rounded-full transition-all duration-1000 ease-out" style={{ width: `${completionPct}%` }} />
            </div>
            <div className="flex justify-between text-[10px] text-gray-400">
               <span>{completedCount} مهمة مكتملة</span>
               <span>من أصل {tasks.length}</span>
            </div>
          </div>

          {/* Financial Summary */}
          <div className="card p-5 space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm flex items-center gap-2">
              <Wallet className="h-4 w-4 text-emerald-500" /> الملخص المالي
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-500">الميزانية الداخلية</span>
                <span className="font-bold text-gray-900 dark:text-white">{formatCurrency(project.internal_budget)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">التكلفة الفعلية</span>
                <span className="font-bold text-gray-900 dark:text-white">{formatCurrency(totalCost)}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-gray-50 dark:border-gray-800/50">
                <span className="text-gray-500">إجمالي المدفوع</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(totalPaid)}</span>
              </div>
            </div>
            
            <div className="space-y-1.5">
               <div className="flex justify-between text-[10px] text-gray-400">
                  <span>نسبة التسديد</span>
                  <span>{paidPct}%</span>
               </div>
               <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                 <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000" style={{ width: `${paidPct}%` }} />
               </div>
            </div>
          </div>

          {/* Donut chart */}
          <div className="card p-5">
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-4">توزيع الحالات</h3>
            {donutData.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-6 text-gray-400">
                <CheckSquare className="h-8 w-8 mb-2 opacity-20" />
                <p className="text-xs">لا توجد مهام حالياً</p>
              </div>
            ) : (
              <div className="relative h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie 
                      data={donutData} 
                      cx="50%" 
                      cy="50%" 
                      innerRadius={50} 
                      outerRadius={75} 
                      dataKey="value" 
                      paddingAngle={4}
                      stroke="none"
                    >
                      {donutData.map((entry, i) => (
                        <Cell key={i} fill={
                          entry.status === 'completed' ? '#10b981' : 
                          entry.status === 'in_progress' ? '#f59e0b' : 
                          entry.status === 'pending' ? '#94a3b8' : 
                          CHART_COLORS[i % CHART_COLORS.length]
                        } />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                   <span className="text-2xl font-bold text-gray-900 dark:text-white">{tasks.length}</span>
                   <span className="text-[10px] text-gray-400 uppercase tracking-wider">مهمة</span>
                </div>
              </div>
            )}
          </div>

          {/* Payment stages stepper */}
          {project.payment_stages && project.payment_stages.length > 0 && (
            <div className="card p-5">
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-5">دفعات التعاقد</h3>
              <div className="space-y-4">
                {project.payment_stages.map((stage, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={cn(
                      "h-8 w-8 rounded-full flex items-center justify-center shrink-0 border-2 transition-colors",
                      stage.status === "paid" 
                        ? "bg-emerald-500 border-emerald-500 text-white" 
                        : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-400"
                    )}>
                      {stage.status === "paid" ? <CheckCircle2 className="h-4 w-4" /> : <span className="text-xs font-bold">{i + 1}</span>}
                    </div>
                    <div className="flex-1 min-w-0">
                       <p className="text-xs font-bold text-gray-900 dark:text-white truncate">{stage.name}</p>
                       <p className="text-[10px] text-gray-500">{formatCurrency(stage.amount)}</p>
                    </div>
                    {stage.status === 'paid' && (
                      <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-full">تم الدفع</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
