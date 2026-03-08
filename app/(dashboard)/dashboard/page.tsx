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
import { Project, Task, TimeLog, InternalPayout } from "@/lib/types";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

interface DashboardStats {
  total_projects: number;
  active_projects: number;
  total_tasks: number;
  completed_tasks: number;
  total_users: number;
}

interface FinancialSummary {
  total_payouts: number;
  pending_payments?: number;
}

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
            api.get("/admin/dashboard/stats").catch(() => ({ data: { total_projects: projectsData.length, active_projects: projectsData.filter(p => p.status === 'active').length, total_tasks: tasksData.length, completed_tasks: tasksData.filter(t => t.status === 'completed').length, total_users: 0 } })),
            api.get("/admin/dashboard/financial-summary").catch(() => ({ data: { total_payouts: payoutsData.reduce((sum, p) => sum + (p.amount_paid || 0), 0) } })),
          ]);
          setStats(statsRes.data);
          setFinancials(finRes.data);
        } else {
          const activeProjects = projectsData.filter((p) => p.status === 'active').length;
          const completedTasks = tasksData.filter((t) => t.status === 'completed').length;
          
          setStats({ 
            total_projects: projectsData.length, 
            active_projects: activeProjects, 
            total_tasks: tasksData.length, 
            completed_tasks: completedTasks, 
            total_users: 0
          });
          
          if (user?.id) {
            const payoutRes = await api.get(`/users/${user.id}/payout-summary`).catch(() => ({ data: { total_payouts: payoutsData.reduce((sum, p) => sum + (p.amount_paid || 0), 0) } }));
            setFinancials({ total_payouts: payoutRes.data.total_payouts || payoutRes.data.total || 0 });
          } else {
            setFinancials({ total_payouts: payoutsData.reduce((sum, p) => sum + (p.amount_paid || 0), 0) });
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
  const completedTasks = stats?.completed_tasks || 0;
  const totalTasks = stats?.total_tasks || 0;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const totalLoggedHours = Number(recentTimeLogs.reduce((sum, l) => sum + (Number(l.actual_hours) || 0), 0)) || 0;

  const statCards = [
    {
      name: "إجمالي المشاريع",
      value: stats?.total_projects || 0,
      subtitle: `${stats?.active_projects || 0} نشط`,
      icon: FolderKanban,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-100 dark:bg-blue-900/30",
      borderColor: "border-blue-200 dark:border-blue-800",
    },
    {
      name: "إجمالي المهام",
      value: stats?.total_tasks || 0,
      subtitle: `${completedTasks} مكتمل`,
      icon: ListTodo,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-100 dark:bg-emerald-900/30",
      borderColor: "border-emerald-200 dark:border-emerald-800",
    },
    {
      name: "إجمالي المدفوعات",
      value: `$${(financials?.total_payouts || 0).toLocaleString()}`,
      subtitle: `${recentPayouts.length} دفعة أخيرة`,
      icon: Banknote,
      color: "text-indigo-600 dark:text-indigo-400",
      bg: "bg-indigo-100 dark:bg-indigo-900/30",
      borderColor: "border-indigo-200 dark:border-indigo-800",
    },
    {
      name: "نسبة الإنجاز",
      value: `${completionRate}%`,
      subtitle: `${totalLoggedHours.toFixed(1)} ساعة مسجلة`,
      icon: TrendingUp,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-100 dark:bg-purple-900/30",
      borderColor: "border-purple-200 dark:border-purple-800",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-500';
      case 'completed': return 'bg-blue-500';
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
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
            مرحباً، {user?.name || 'مستخدم'} 👋
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            إليك ملخص ما يحدث في مشاريعك اليوم.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-[#0f172a] px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-800">
          <CalendarDays className="h-4 w-4" />
          {format(new Date(), 'EEEE, dd MMMM yyyy', { locale: ar })}
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <div
            key={card.name}
            className={`overflow-hidden rounded-2xl bg-white dark:bg-[#0f172a] p-6 shadow-sm border ${card.borderColor} transition-all hover:shadow-lg hover:-translate-y-0.5 duration-300`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {card.name}
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  {card.value}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  {card.subtitle}
                </p>
              </div>
              <div className={`p-3 rounded-xl ${card.bg}`}>
                <card.icon className={`h-6 w-6 ${card.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Task Progress Overview */}
      {totalTasks > 0 && (
        <div className="rounded-2xl bg-white dark:bg-[#0f172a] p-6 shadow-sm border border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">تقدم المهام</h3>
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden flex">
                {completedTasks > 0 && (
                  <div className="bg-emerald-500 h-full transition-all duration-700" style={{ width: `${(completedTasks / totalTasks) * 100}%` }} title={`مكتمل: ${completedTasks}`} />
                )}
                {inProgressTasks > 0 && (
                  <div className="bg-amber-500 h-full transition-all duration-700" style={{ width: `${(inProgressTasks / totalTasks) * 100}%` }} title={`قيد التنفيذ: ${inProgressTasks}`} />
                )}
                {pendingTasks > 0 && (
                  <div className="bg-gray-300 dark:bg-gray-600 h-full transition-all duration-700" style={{ width: `${(pendingTasks / totalTasks) * 100}%` }} title={`قيد الانتظار: ${pendingTasks}`} />
                )}
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium">
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> مكتمل ({completedTasks})</span>
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-amber-500" /> قيد التنفيذ ({inProgressTasks})</span>
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-gray-300 dark:bg-gray-600" /> قيد الانتظار ({pendingTasks})</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Projects */}
        <div className="rounded-2xl bg-white dark:bg-[#0f172a] shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <FolderKanban className="h-5 w-5 text-blue-500" /> أحدث المشاريع
            </h3>
            <Link href="/dashboard/projects" className="text-xs text-indigo-600 dark:text-indigo-400 font-medium hover:underline flex items-center gap-1">
              عرض الكل <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
          {recentProjects.length > 0 ? (
            <div className="divide-y divide-gray-50 dark:divide-gray-800/50">
              {recentProjects.map((project) => (
                <div key={project.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-colors">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className={`h-2.5 w-2.5 rounded-full shrink-0 ${getStatusColor(project.status)}`} />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{project.project_name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">{project.description || 'لا يوجد وصف'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 mr-3">
                    <span className="text-xs text-gray-400 dark:text-gray-500">${project.internal_budget?.toLocaleString() || '0'}</span>
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${
                      project.status === 'active' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' :
                      project.status === 'completed' ? 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400' :
                      'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400'
                    }`}>
                      {getStatusText(project.status)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-48 text-center p-6">
              <AlertCircle className="h-8 w-8 text-gray-300 dark:text-gray-600 mb-2" />
              <p className="text-sm text-gray-500 dark:text-gray-400">لم يتم العثور على مشاريع.</p>
            </div>
          )}
        </div>

        {/* Priority / Pending Tasks */}
        <div className="rounded-2xl bg-white dark:bg-[#0f172a] shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <CheckSquare className="h-5 w-5 text-red-500" /> المهام المعلقة
            </h3>
            <Link href="/dashboard/tasks" className="text-xs text-indigo-600 dark:text-indigo-400 font-medium hover:underline flex items-center gap-1">
              عرض الكل <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
          {priorityTasks.length > 0 ? (
            <div className="divide-y divide-gray-50 dark:divide-gray-800/50">
              {priorityTasks.map((task) => (
                <div key={task.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-colors">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{task.title}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {task.estimated_hours || 0} ساعة
                      </span>
                      <span className="text-xs text-gray-400">#مشروع {task.project_id}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 mr-3">
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${
                      task.priority === 'high' ? 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                      task.priority === 'medium' ? 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                      'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                    }`}>
                      {task.priority === 'high' ? 'عالية' : task.priority === 'medium' ? 'متوسطة' : 'منخفضة'}
                    </span>
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${
                      task.status === 'pending' ? 'bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-400' :
                      task.status === 'in_progress' ? 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' :
                      'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'
                    }`}>
                      {getStatusText(task.status)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-48 text-center p-6">
              <CheckSquare className="h-8 w-8 text-emerald-300 dark:text-emerald-700 mb-2" />
              <p className="text-sm font-medium text-gray-900 dark:text-white">ممتاز!</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">لا توجد مهام معلقة.</p>
            </div>
          )}
        </div>

        {/* Recent Time Logs */}
        <div className="rounded-2xl bg-white dark:bg-[#0f172a] shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Clock className="h-5 w-5 text-indigo-500" /> آخر سجلات الوقت
            </h3>
            <Link href="/dashboard/time-logs" className="text-xs text-indigo-600 dark:text-indigo-400 font-medium hover:underline flex items-center gap-1">
              عرض الكل <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
          {recentTimeLogs.length > 0 ? (
            <div className="divide-y divide-gray-50 dark:divide-gray-800/50">
              {recentTimeLogs.map((log) => (
                <div key={log.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-colors">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{log.actual_hours} ساعة <span className="text-xs text-gray-400">- مهمة #{log.task_id}</span></p>
                      {log.comment && <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">{log.comment}</p>}
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 shrink-0 mr-3">
                    {log.work_date ? format(new Date(log.work_date), 'dd MMM', { locale: ar }) : ''}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-40 text-center p-6">
              <Clock className="h-8 w-8 text-gray-300 dark:text-gray-600 mb-2" />
              <p className="text-sm text-gray-500 dark:text-gray-400">لا توجد سجلات وقت حديثة.</p>
            </div>
          )}
        </div>

        {/* Recent Payouts */}
        <div className="rounded-2xl bg-white dark:bg-[#0f172a] shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Banknote className="h-5 w-5 text-emerald-500" /> آخر المدفوعات
            </h3>
            <Link href="/dashboard/payouts" className="text-xs text-indigo-600 dark:text-indigo-400 font-medium hover:underline flex items-center gap-1">
              عرض الكل <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
          {recentPayouts.length > 0 ? (
            <div className="divide-y divide-gray-50 dark:divide-gray-800/50">
              {recentPayouts.map((payout) => (
                <div key={payout.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-colors">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      <Banknote className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-gray-900 dark:text-white">${payout.amount_paid?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                      {payout.notes && <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">{payout.notes}</p>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 mr-3">
                    <span className="text-xs text-gray-400">مستخدم #{payout.user_id}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-40 text-center p-6">
              <Banknote className="h-8 w-8 text-gray-300 dark:text-gray-600 mb-2" />
              <p className="text-sm text-gray-500 dark:text-gray-400">لا توجد مدفوعات حديثة.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
