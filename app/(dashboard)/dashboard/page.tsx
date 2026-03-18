"use client";

import { useEffect, useState } from "react";
import { apiGet } from "@/lib/api";
import { useAuthStore } from "@/lib/store";
import Link from "next/link";
import { 
  getStatusBadge, 
  getStatusLabel, 
  getRoleBadge, 
  formatCurrency, 
  formatHours 
} from "@/lib/utils";
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
        
        // Fetch common data for all users with better error handling
        const [projectsData, tasksData, timeLogsData, payoutsData] = await Promise.all([
          apiGet<Project[]>("/projects").catch(() => []),
          apiGet<Task[]>("/tasks").catch(() => []),
          apiGet<TimeLog[]>("/time-logs").catch(() => []),
          apiGet<InternalPayout[]>("/internal-payouts").catch(() => []),
        ]);

        setAllTasks(tasksData);
        setRecentTimeLogs(timeLogsData.slice(0, 5));
        setRecentPayouts(payoutsData.slice(0, 5));

        if (isAdmin) {
          const [statsData, finData] = await Promise.all([
            apiGet<DashboardStats>("/admin/dashboard/stats").catch(() => ({ projects_count: projectsData.length, tasks_count: tasksData.length, customers_count: 0, internal_notes_count: 0, total_payouts: 0, remaining_payouts: 0 } as DashboardStats)),
            apiGet<FinancialSummary>("/admin/dashboard/financial-summary").catch(() => ({ total_revenue: 0, total_cost: 0, gross_profit: 0, net_profit: 0 } as FinancialSummary)),
          ]);
          setStats(statsData);
          setFinancials(finData);
        } else {
          // For non-admins, we calculate from visible data or specific endpoints
          setStats({ 
            projects_count: projectsData.length, 
            tasks_count: tasksData.length,
            customers_count: 0,
            internal_notes_count: 0,
            total_payouts: payoutsData.reduce((sum, p) => sum + (p.amount_paid || 0), 0),
            remaining_payouts: 0
          });
          
          if (user?.id) {
            const payoutSummary = await apiGet<{ total_payouts: number; remaining: number }>(`/users/${user.id}/payout-summary`).catch(() => ({ total_payouts: 0, remaining: 0 }));
            setStats(prev => prev ? { ...prev, total_payouts: payoutSummary.total_payouts || 0, remaining_payouts: payoutSummary.remaining || 0 } : null);
            setFinancials({ total_revenue: 0, total_cost: 0, gross_profit: 0, net_profit: payoutSummary.total_payouts || 0 });
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
        <div className="h-8 w-64 bg-gray-200 dark:bg-gray-800 rounded"></div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
        </div>
      </div>
    );
  }

  const pendingTasks = allTasks.filter(t => t.status === 'pending').length;
  const inProgressTasks = allTasks.filter(t => t.status === 'in_progress').length;
  const totalLoggedHours = recentTimeLogs.reduce((sum, l) => sum + (Number(l.actual_hours) || 0), 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_progress': return 'bg-blue-500';
      case 'completed': return 'bg-primary';
      case 'on_hold': return 'bg-amber-500';
      case 'pending': return 'bg-gray-400';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'in_progress': return 'قيد التنفيذ';
      case 'completed': return 'مكتمل';
      case 'on_hold': return 'معلق';
      case 'pending': return 'قيد الانتظار';
      default: return status;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* Hero Welcome Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#121212] to-[#080808] p-8 border border-white/5 shadow-2x">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] pointer-events-none" />
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              مرحباً بعودتك، {user?.name || "Admin"} <span className="animate-bounce">👋</span>
            </h1>
            <p className="text-gray-400 text-lg">
              إليك نظرة سريعة على مهامك وإنجازاتك اليوم.
            </p>
          </div>
          <Link 
            href="/dashboard/tasks"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-bold shadow-[0_0_20px_rgba(255,117,15,0.4)] hover:shadow-[0_0_30px_rgba(255,117,15,0.6)] transition-all hover:scale-105 active:scale-95 shrink-0"
          >
            <CheckSquare className="h-5 w-5" />
            الذهاب للمهام
          </Link>
        </div>
      </div>

      {/* Modern Stat Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Hours Logged Today */}
        <div className="group relative overflow-hidden rounded-2xl bg-card p-6 border border-white/5 hover:border-primary/20 transition-all">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">ساعات العمل (اليوم)</p>
              <div className="flex items-baseline gap-2 mt-2">
                <h2 className="text-4xl font-bold text-white">{totalLoggedHours}</h2>
                <span className="text-xs text-gray-500 font-bold">ساعات</span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500 ring-1 ring-purple-500/20">
              <Clock className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Active Projects */}
        <div className="group relative overflow-hidden rounded-2xl bg-card p-6 border border-white/5 hover:border-primary/20 transition-all">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">المشاريع النشطة</p>
              <h2 className="text-4xl font-bold text-white mt-2">{stats?.projects_count || 0}</h2>
            </div>
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500 ring-1 ring-emerald-500/20">
              <FolderKanban className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="group relative overflow-hidden rounded-2xl bg-card p-6 border border-white/5 hover:border-primary/20 transition-all">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">مهام قيد الانتظار</p>
              <h2 className="text-4xl font-bold text-white mt-2">{pendingTasks}</h2>
            </div>
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-500 ring-1 ring-amber-500/20">
              <AlertCircle className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* In Progress Tasks */}
        <div className="group relative overflow-hidden rounded-2xl bg-card p-6 border border-white/5 hover:border-primary/20 transition-all">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">مهام قيد التنفيذ</p>
              <h2 className="text-4xl font-bold text-white mt-2">{inProgressTasks}</h2>
            </div>
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500 ring-1 ring-blue-500/20">
              <Activity className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Recent Time Logs */}
        <div className="rounded-3xl bg-card shadow-sm border border-white/5 overflow-hidden">
          <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" /> أحدث سجلات الوقت
            </h3>
            <Link href="/dashboard/time-logs" className="text-xs text-primary font-bold hover:underline flex items-center gap-1">
              عرض الكل <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
          {recentTimeLogs.length > 0 ? (
            <div className="divide-y divide-white/5">
              {recentTimeLogs.map((log) => (
                <div key={log.id} className="px-6 py-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="p-2.5 rounded-xl bg-primary-light/10 text-primary">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1 px-1">
                      <p className="text-sm font-bold text-white">{log.actual_hours} ساعة <span className="text-[10px] text-gray-500 font-bold uppercase mx-2 tracking-widest">مهمة عامة</span></p>
                      <p className="text-[10px] text-gray-500 font-medium">{log.work_date ? format(new Date(log.work_date), 'dd/MM/yyyy', { locale: ar }) : ''}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-white/5 border border-white/5">
                    <CalendarDays className="h-4 w-4 text-primary" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-48 text-center p-6">
              <Clock className="h-8 w-8 text-gray-600 mb-2" />
              <p className="text-sm text-gray-400">لا توجد سجلات وقت حديثة.</p>
            </div>
          )}
        </div>

        {/* Latest Tasks Table-like view */}
        <div className="rounded-3xl bg-card shadow-sm border border-white/5 overflow-hidden">
          <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <CheckSquare className="h-5 w-5 text-primary" /> أحدث المهام
            </h3>
            <Link href="/dashboard/tasks" className="text-xs text-primary font-bold hover:underline flex items-center gap-1">
              عرض الكل <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
          {priorityTasks.length > 0 ? (
            <div className="p-6">
              <div className="space-y-4">
                {priorityTasks.slice(0, 3).map((task) => (
                  <Link key={task.id} href={`/dashboard/tasks/${task.id}`} className="block group">
                    <div className="bg-white/5 border border-white/5 rounded-2xl p-6 transition-all group-hover:bg-white/[0.08] group-hover:border-white/10">
                      <div className="flex flex-col items-center justify-center text-center space-y-4">
                        <p className="text-sm font-bold text-gray-400">لا توجد مهام حالية.</p>
                      </div>
                    </div>
                  </Link>
                ))}
                {priorityTasks.length === 0 && (
                   <div className="bg-white/5 border border-white/5 rounded-2xl p-12 text-center">
                      <p className="text-gray-400 font-bold">لا توجد مهام حالية.</p>
                   </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-12 text-center h-48">
              <p className="text-gray-400 font-bold">لا توجد مهام حالية.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

