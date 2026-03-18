"use client";

import { useEffect, useState, use } from "react";
import { api, apiGet } from "@/lib/api";
import { User, TimeLog, InternalPayout } from "@/lib/types";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { SkeletonTable } from "@/components/ui/SkeletonTable";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import Link from "next/link";
import { 
  ChevronRight, 
  Mail, 
  Phone, 
  DollarSign, 
  Clock, 
  ArrowLeft,
  Calendar,
  History,
  TrendingUp,
  CreditCard
} from "lucide-react";

export default function UserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [user, setUser] = useState<User | null>(null);
  const [timeLogs, setTimeLogs] = useState<TimeLog[]>([]);
  const [payouts, setPayouts] = useState<InternalPayout[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"logs" | "payouts">("logs");

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const [userRes, logsRes, payRes] = await Promise.all([
          api.get(`/admin/users/${id}`),
          api.get(`/time-logs`, { params: { user_id: id, per_page: 10 } }),
          api.get(`/internal-payouts`, { params: { user_id: id, per_page: 10 } }),
        ]);
        
        setUser(userRes.data.data || userRes.data);
        setTimeLogs(logsRes.data.data || []);
        setPayouts(payRes.data.data || []);
      } catch (error) {
        console.error("Failed to load user details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [id]);

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse" dir="rtl">
        <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded" />
        <div className="h-48 bg-gray-200 dark:bg-gray-800 rounded-2xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-2xl" />
          <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!user) return <div className="text-center py-20 text-gray-500" dir="rtl">الموظف غير موجود</div>;

  const totalHours = timeLogs.reduce((acc, log) => acc + Number(log.actual_hours || 0), 0);
  const totalPaid = payouts.filter(p => p.type === "payment" && p.status === "paid").reduce((acc, p) => acc + Number(p.amount_paid || 0), 0);

  return (
    <div className="space-y-6" dir="rtl">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <Link href="/dashboard/admin/users" className="hover:text-primary transition-colors">إدارة الموظفين</Link>
        <ChevronRight className="h-4 w-4 rotate-180" />
        <span className="text-gray-900 dark:text-white font-medium">{user.name}</span>
      </nav>

      {/* Profile Header */}
      <div className="card overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-primary/20 to-accent/20 dark:from-primary/10 dark:to-accent/10" />
        <div className="px-6 pb-6 relative">
          <div className="absolute -top-12 right-6">
            <div className="h-24 w-24 rounded-2xl bg-white dark:bg-gray-900 p-1 shadow-xl">
              <div className="h-full w-full rounded-xl bg-primary-light flex items-center justify-center text-primary text-3xl font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
          <div className="pt-16 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                {user.roles.map(role => (
                  <span key={role} className="badge bg-primary-light text-primary border-primary/10">
                    {role === "admin" ? "مدير نظام" : role === "manager" ? "مدير مشاريع" : "موظف"}
                  </span>
                ))}
                <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  عضو منذ {format(new Date(user.created_at || new Date()), "MMMM yyyy", { locale: ar })}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-left md:text-right">
                <p className="text-xs text-gray-500 uppercase tracking-wider">سعر الساعة</p>
                <p className="text-xl font-bold text-primary" dir="ltr">${user.default_hourly_rate || 0}/hr</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="card p-5">
            <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-4">معلومات الاتصال</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase">البريد الإلكتروني</p>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase">رقم الهاتف</p>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300" dir="ltr">{user.phone || "—"}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card p-5">
            <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-4">ملخص النشاط</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-xl bg-primary-light/30 border border-primary/10">
                <Clock className="h-4 w-4 text-primary mb-2" />
                <p className="text-xl font-bold text-primary" dir="ltr">{totalHours}</p>
                <p className="text-[10px] text-gray-600 dark:text-gray-400">إجمالي الساعات</p>
              </div>
              <div className="p-3 rounded-xl bg-green-50 dark:bg-green-500/10 border border-green-100 dark:border-green-500/20">
                <CreditCard className="h-4 w-4 text-green-600 mb-2" />
                <p className="text-xl font-bold text-green-600" dir="ltr">${totalPaid.toLocaleString()}</p>
                <p className="text-[10px] text-gray-600 dark:text-gray-400">إجمالي المدفوعات</p>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Tabs */}
        <div className="lg:col-span-2">
          <div className="card h-full flex flex-col">
            <div className="flex border-b border-gray-100 dark:border-gray-800 px-4">
              <button 
                onClick={() => setActiveTab("logs")}
                className={`px-4 py-4 text-sm font-medium transition-colors border-b-2 -mb-px ${
                  activeTab === "logs" 
                  ? "border-primary text-primary" 
                  : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                آخر سجلات الوقت
              </button>
              <button 
                onClick={() => setActiveTab("payouts")}
                className={`px-4 py-4 text-sm font-medium transition-colors border-b-2 -mb-px ${
                  activeTab === "payouts" 
                  ? "border-primary text-primary" 
                  : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                آخر المدفوعات
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto max-h-[400px]">
              {activeTab === "logs" ? (
                timeLogs.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                    <History className="h-8 w-8 mb-2 opacity-20" />
                    <p className="text-sm">لا توجد سجلات وقت مؤخراً</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {timeLogs.map(log => (
                      <div key={log.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/40 hover:bg-gray-100 dark:hover:bg-gray-800/60 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-lg bg-primary-light flex items-center justify-center text-primary">
                            <Clock className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-200">سجل وقت #{log.id}</p>
                            <p className="text-[10px] text-gray-400">{log.work_date ? format(new Date(log.work_date), "dd MMMM yyyy", { locale: ar }) : "—"}</p>
                          </div>
                        </div>
                        <div className="text-left px-3">
                          <p className="text-sm font-bold text-gray-900 dark:text-white" dir="ltr">{log.actual_hours}h</p>
                          <StatusBadge status={log.task?.status || "n/a"} />
                        </div>
                      </div>
                    ))}
                    <Link href="/dashboard/time-logs" className="block text-center py-2 text-xs text-primary hover:underline">عرض الكل</Link>
                  </div>
                )
              ) : (
                payouts.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                    <DollarSign className="h-8 w-8 mb-2 opacity-20" />
                    <p className="text-sm">لا توجد مدفوعات مسجلة</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {payouts.map(p => (
                      <div key={p.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/40">
                        <div className="flex items-center gap-3">
                          <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${p.type === 'payment' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                            {p.type === 'payment' ? <TrendingUp className="h-4 w-4" /> : <CreditCard className="h-4 w-4" />}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{p.type === 'payment' ? 'دفعة مالية' : 'خصم'}</p>
                            <p className="text-[10px] text-gray-400">{p.created_at ? format(new Date(p.created_at), "dd MMMM yyyy", { locale: ar }) : "—"}</p>
                          </div>
                        </div>
                        <div className="text-left px-3">
                          <p className={`text-sm font-bold ${p.type === 'payment' ? 'text-green-600' : 'text-red-600'}`} dir="ltr">
                            {p.type === 'payment' ? '+' : '-'}${p.amount_paid.toLocaleString()}
                          </p>
                          <StatusBadge status={p.status} />
                        </div>
                      </div>
                    ))}
                    <Link href="/dashboard/payouts" className="block text-center py-2 text-xs text-primary hover:underline">عرض الكل</Link>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
