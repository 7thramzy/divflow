"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useAuthStore } from "@/lib/store";
import Link from "next/link";
import { 
  FolderKanban, 
  CheckSquare, 
  TrendingUp, 
  Users,
  AlertCircle,
  Clock,
  ListTodo,
  Banknote,
  ArrowUpRight,
  Activity,
  CalendarDays
} from "lucide-react";
import { Project, Task, TimeLog, InternalPayout, DashboardStats, FinancialSummary } from "@/lib/types";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

export default function DashboardOverview() {
  const { user } = useAuthStore();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [financials, setFinancials] = useState<FinancialSummary | null>(null);
  const [recentProjects, setRecentProjects] = useState<Project[]>([]);
  const [priorityTasks, setPriorityTasks] = useState<Task[]>([]);
  const [recentTimeLogs, setRecentTimeLogs] = useState<TimeLog[]>([]);
  const [recentPayouts, setRecentPayouts] = useState<InternalPayout[]>([]);
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const isAdmin = user?.roles?.includes('admin') || user?.roles?.includes('Administrator');
        
        let projectsData: Project[] = [];
        let tasksData: Task[] = [];
        
        // Fetch common data for all users
        const [projectsRes, tasksRes, timeLogsRes, payoutsRes] = await Promise.all([
          api.get("/projects").catch(() => ({ data: { data: [] } })),
          api.get("/tasks").catch(() => ({ data: { data: [] } })),
          api.get("/time-logs").catch(() => ({ data: { data: [] } })),
          api.get("/internal-payouts").catch(() => ({ data: { data: [] } })),
        ]);

        projectsData = projectsRes.data.data || projectsRes.data || [];
        tasksData = tasksRes.data.data || tasksRes.data || [];
        const timeLogsData: TimeLog[] = timeLogsRes.data.data || timeLogsRes.data || [];
        const payoutsData: InternalPayout[] = payoutsRes.data.data || payoutsRes.data || [];

        setAllTasks(tasksData);
        setRecentTimeLogs(timeLogsData.slice(0, 5));
        setRecentPayouts(payoutsData.slice(0, 5));

        if (isAdmin) {
          const [statsRes, finRes] = await Promise.all([
            api.get<DashboardStats>("/admin/dashboard/stats").catch(() => ({ data: { projects_count: projectsData.length, tasks_count: tasksData.length, customers_count: 0, internal_notes_count: 0, total_payouts: 0, remaining_payouts: 0 } as DashboardStats })),
            api.get<FinancialSummary>("/admin/dashboard/financial-summary").catch(() => ({ data: { total_revenue: 0, total_cost: 0, gross_profit: 0, net_profit: 0 } as FinancialSummary })),
          ]);
          setStats(statsRes.data);
          setFinancials(finRes.data);
        } else {
          setStats({ 
            projects_count: projectsData.length, 
            tasks_count: tasksData.length,
            customers_count: 0,
            internal_notes_count: 0,
            total_payouts: payoutsData.reduce((sum, p) => sum + (p.amount_paid || 0), 0),
            remaining_payouts: 0
          });
          
          if (user?.id) {
            const payoutRes = await api.get(`/users/${user.id}/payout-summary`).catch(() => ({ data: { total_payouts: 0, remaining: 0 } }));
            setFinancials({ total_revenue: 0, total_cost: 0, gross_profit: 0, net_profit: payoutRes.data.total_payouts || 0 });
          }
        }

        setRecentProjects(projectsData.slice(0, 5));
        const highPriority = tasksData.filter(t => t.priority === 'high' && t.status !== 'completed').slice(0, 5);
        setPriorityTasks(highPriority.length > 0 ? highPriority : tasksData.filter(t => t.status !== 'completed').slice(0, 5));
      } catch (error) {
        console.error("Dashboard error", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 w-64 bg-border rounded"></div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-card border border-border rounded-2xl"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="h-64 bg-card border border-border rounded-2xl"></div>
          <div className="h-64 bg-card border border-border rounded-2xl"></div>
        </div>
      </div>
    );
  }

  const pendingTasks = allTasks.filter(t => t.status === 'pending').length;
  const inProgressTasks = allTasks.filter(t => t.status === 'in_progress').length;
  const completedTasks = allTasks.filter(t => t.status === 'completed').length;
  const totalTasks = stats?.tasks_count || allTasks.length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const statCards = [
    {
      name: "إجمالي المشاريع",
      value: stats?.projects_count || 0,
      subtitle: `${allTasks.filter(t => t.status === 'in_progress').length} مهام نشطة`,
      icon: FolderKanban,
      color: "text-primary",
      bg: "bg-primary/10",
      borderColor: "border-primary/20",
    },
    {
      name: "إجمالي المهام",
      value: stats?.tasks_count || 0,
      subtitle: `${completedTasks} مكتمل`,
      icon: ListTodo,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
    },
    {
      name: "إجمالي المدفوعات",
      value: `$${(stats?.total_payouts || 0).toLocaleString()}`,
      subtitle: `بانتظار $${(stats?.remaining_payouts || 0).toLocaleString()}`,
      icon: Banknote,
      color: "text-accent",
      bg: "bg-accent/10",
      borderColor: "border-accent/20",
    },
    {
      name: "العملاء والملاحظات",
      value: stats?.customers_count || 0,
      subtitle: `${stats?.internal_notes_count || 0} ملاحظة داخلية`,
      icon: Users,
      color: "text-primary",
      bg: "bg-primary/10",
      borderColor: "border-primary/20",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-500';
      case 'completed': return 'bg-primary';
      case 'on_hold': return 'bg-amber-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'نشط';
      case 'completed': return 'مكتمل';
      case 'on_hold': return 'معلق';
      case 'pending': return 'قيد الانتظار';
      case 'in_progress': return 'قيد التنفيذ';
      default: return status;
    }
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            مرحباً، {user?.name || 'مستخدم'} 👋
          </h2>
          <p className="text-sm text-text-muted">
            إليك ملخص ما يحدث في مشاريعك اليوم.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-text-muted bg-card px-5 py-2.5 rounded-2xl border border-border shadow-sm">
          <CalendarDays className="h-4 w-4 text-primary" />
          {format(new Date(), 'EEEE, dd MMMM yyyy', { locale: ar })}
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <div
            key={card.name}
            className={`stat-card relative overflow-hidden rounded-2xl bg-card p-6 shadow-sm border ${card.borderColor} transition-all duration-300`}
          >
            <div className="flex items-start justify-between relative z-10">
              <div>
                <p className="text-sm font-medium text-text-muted">
                  {card.name}
                </p>
                <p className="text-3xl font-bold text-foreground mt-2 tracking-tight">
                  {card.value}
                </p>
                <div className="flex items-center gap-1.5 mt-2">
                   <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                   <p className="text-[10px] font-medium text-text-muted uppercase tracking-wider">
                     {card.subtitle}
                   </p>
                </div>
              </div>
              <div className={`p-3.5 rounded-xl ${card.bg} shadow-inner`}>
                <card.icon className={`h-6 w-6 ${card.color}`} />
              </div>
            </div>
            {/* Subtle background glow */}
            <div className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full opacity-5 blur-3xl ${card.bg}`} />
          </div>
        ))}
      </div>

      {/* Task Progress Overview */}
      {totalTasks > 0 && (
        <div className="rounded-2xl bg-card p-6 shadow-sm border border-border relative overflow-hidden">
          <div className="flex items-center justify-between mb-6">
             <h3 className="text-lg font-bold text-foreground">تقدم المهام</h3>
             <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">{completionRate}% مكتمل</span>
          </div>
          <div className="space-y-6">
            <div className="h-3 bg-white/5 rounded-full overflow-hidden flex shadow-inner">
              {completedTasks > 0 && (
                <div className="bg-primary h-full transition-all duration-1000 shadow-[0_0_10px_rgba(255,117,15,0.3)]" style={{ width: `${(completedTasks / totalTasks) * 100}%` }} />
              )}
              {inProgressTasks > 0 && (
                <div className="bg-accent h-full transition-all duration-1000 opacity-80" style={{ width: `${(inProgressTasks / totalTasks) * 100}%` }} />
              )}
              {pendingTasks > 0 && (
                <div className="bg-white/10 h-full transition-all duration-1000" style={{ width: `${(pendingTasks / totalTasks) * 100}%` }} />
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
               <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                  <p className="text-[10px] text-text-muted uppercase mb-1">المجموع</p>
                  <p className="text-lg font-bold text-foreground">{totalTasks}</p>
               </div>
               <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                  <p className="text-[10px] text-emerald-500 uppercase mb-1">مكتمل</p>
                  <p className="text-lg font-bold text-foreground">{completedTasks}</p>
               </div>
               <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                  <p className="text-[10px] text-accent uppercase mb-1">قيد التنفيذ</p>
                  <p className="text-lg font-bold text-foreground">{inProgressTasks}</p>
               </div>
               <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                  <p className="text-[10px] text-text-muted uppercase mb-1">بالانتظار</p>
                  <p className="text-lg font-bold text-foreground">{pendingTasks}</p>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Recent Projects */}
        <div className="rounded-2xl bg-card shadow-sm border border-border overflow-hidden flex flex-col">
          <div className="px-6 py-5 border-b border-border flex items-center justify-between bg-white/5">
            <div className="flex items-center gap-3">
               <div className="p-2 bg-primary/10 rounded-lg">
                  <FolderKanban className="h-5 w-5 text-primary" />
               </div>
               <h3 className="text-lg font-bold text-foreground">أحدث المشاريع</h3>
            </div>
            <Link href="/dashboard/projects" className="text-xs font-bold text-primary hover:text-accent transition-colors flex items-center gap-1.5">
              عرض الكل <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          {recentProjects.length > 0 ? (
            <div className="divide-y divide-border">
              {recentProjects.map((project) => (
                <div key={project.id} className="px-6 py-5 flex items-center justify-between hover:bg-white/5 transition-all group">
                  <div className="flex items-center gap-4 min-w-0 flex-1">
                    <div className={`h-2.5 w-2.5 rounded-full shrink-0 shadow-[0_0_8px_currentColor] ${getStatusColor(project.status).replace('bg-', 'text-')}`} />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors truncate">{project.project_name}</p>
                      <p className="text-[10px] text-text-muted mt-1 truncate max-w-xs">{project.description || 'لا يوجد وصف متاح'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 shrink-0 mr-4">
                    <div className="text-left">
                       <p className="text-xs font-bold text-foreground">${project.internal_budget?.toLocaleString()}</p>
                       <p className="text-[9px] text-text-muted uppercase text-right">الميزانية</p>
                    </div>
                    <span className={`inline-flex items-center rounded-lg px-2.5 py-1 text-[10px] font-bold ${
                      project.status === 'in_progress' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                      project.status === 'completed' ? 'bg-primary/10 text-primary border border-primary/20' :
                      'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                    }`}>
                      {getStatusText(project.status)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="p-4 bg-white/5 rounded-full mb-4">
                 <AlertCircle className="h-8 w-8 text-text-muted" />
              </div>
              <p className="text-sm font-medium text-text-muted">لا توجد مشاريع حالية</p>
            </div>
          )}
        </div>

        {/* Priority tasks */}
        <div className="rounded-2xl bg-card shadow-sm border border-border overflow-hidden flex flex-col">
          <div className="px-6 py-5 border-b border-border flex items-center justify-between bg-white/5">
            <div className="flex items-center gap-3">
               <div className="p-2 bg-red-500/10 rounded-lg">
                  <CheckSquare className="h-5 w-5 text-red-500" />
               </div>
               <h3 className="text-lg font-bold text-foreground">المهام العاجلة</h3>
            </div>
            <Link href="/dashboard/tasks" className="text-xs font-bold text-primary hover:text-accent transition-colors flex items-center gap-1.5">
              عرض الكل <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          {priorityTasks.length > 0 ? (
            <div className="divide-y divide-border">
              {priorityTasks.map((task) => (
                <div key={task.id} className="px-6 py-5 flex items-center justify-between hover:bg-white/5 transition-all group">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors truncate">{task.title}</p>
                    <div className="flex items-center gap-4 mt-1.5">
                      <span className="text-[10px] font-medium text-text-muted flex items-center gap-1.5">
                        <Clock className="h-3 w-3 text-primary" /> {task.estimated_hours || 0} ساعة عمل
                      </span>
                      <span className="text-[10px] font-bold text-white/40 bg-white/5 px-2 py-0.5 rounded-md border border-white/5">#مشروع {task.project_id}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 mr-4">
                    <span className={`inline-flex items-center rounded-lg px-2 py-1 text-[9px] font-bold uppercase tracking-wider ${
                      task.priority === 'high' ? 'bg-red-500 text-white shadow-[0_0_12px_rgba(239,68,68,0.3)]' :
                      task.priority === 'normal' ? 'bg-amber-500 text-white' :
                      'bg-emerald-500 text-white'
                    }`}>
                      {task.priority === 'high' ? 'عاجل' : task.priority === 'normal' ? 'متوسط' : 'عادي'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="p-4 bg-emerald-500/10 rounded-full mb-4">
                 <Activity className="h-8 w-8 text-emerald-500" />
              </div>
              <p className="text-sm font-bold text-foreground">رائع! جميع المهام تحت السيطرة</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
