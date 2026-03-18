"use client";

import { useEffect, useState, use } from "react";
import { api } from "@/lib/api";
import { Customer, Project } from "@/lib/types";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { CHART_COLORS } from "@/lib/constants";
import { getStatusLabel } from "@/lib/utils";
import Link from "next/link";
import { format } from "date-fns";
import { ChevronRight, Phone, Building2 } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const SOURCE_LABELS: Record<string, string> = { social_media: "وسائل التواصل", referral: "إحالة", direct: "مباشر", other: "أخرى", facebook: "فيسبوك", twitter: "تويتر", instagram: "انستغرام", linkedin: "لينكد إن", google: "جوجل", friend: "صديق" };
const TYPE_LABELS: Record<string, string> = { individual: "فرد", company: "شركة", other: "أخرى", government: "حكومي" };

export default function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const [custRes, projRes] = await Promise.all([
          api.get(`/customers/${id}`),
          api.get(`/projects`, { params: { customer_id: id, per_page: 100 } }),
        ]);
        setCustomer(custRes.data.data || custRes.data);
        setProjects(projRes.data.data || projRes.data || []);
      } catch {
        // handled
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
        <div className="h-40 bg-gray-200 dark:bg-gray-800 rounded-2xl" />
      </div>
    );
  }

  if (!customer) return <div className="text-center py-20 text-gray-500" dir="rtl">العميل غير موجود</div>;

  const statusCounts = projects.reduce<Record<string, number>>((a, p) => { a[p.status] = (a[p.status] || 0) + 1; return a; }, {});
  const donutData = Object.entries(statusCounts).map(([s, v]) => ({ name: getStatusLabel(s), value: v }));

  return (
    <div className="space-y-6" dir="rtl">
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <Link href="/dashboard/customers" className="hover:text-primary dark:hover:text-accent">العملاء</Link>
        <ChevronRight className="h-4 w-4 rotate-180" />
        <span className="text-gray-900 dark:text-white font-medium">{customer.name}</span>
      </nav>

      {/* Customer card */}
      <div className="card p-6">
        <div className="flex items-start gap-4">
          <div className="h-14 w-14 rounded-2xl bg-primary-light dark:bg-primary-light/10 flex items-center justify-center text-primary dark:text-accent font-bold text-2xl shrink-0">
            {customer.name?.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">{customer.name}</h1>
            <div className="flex flex-wrap items-center gap-3 mt-2">
              <StatusBadge status={customer.type} label={TYPE_LABELS[customer.type] || customer.type} />
              <span className="text-sm text-gray-500">{SOURCE_LABELS[customer.source] || customer.source}</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5 pt-5 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <Phone className="h-4 w-4 text-gray-400" />
            <span dir="ltr">{customer.phone}</span>
          </div>
          {customer.company && (
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <Building2 className="h-4 w-4 text-gray-400" />
              <span>{customer.company}</span>
            </div>
          )}
          {customer.created_at && (
            <div className="text-sm text-gray-500">
              عضو منذ <span dir="ltr">{format(new Date(customer.created_at), "dd/MM/yyyy")}</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Donut chart */}
        <div className="card p-5">
          <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-3">توزيع المشاريع حسب الحالة</h3>
          {donutData.length < 2 ? (
            <p className="text-center text-xs text-gray-400 py-8">لا توجد بيانات كافية</p>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={donutData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" paddingAngle={3}>
                  {donutData.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
                </Pie>
                <Tooltip />
                <Legend iconType="circle" iconSize={8} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Projects table */}
        <div className="lg:col-span-2 card overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm">مشاريع العميل ({projects.length})</h3>
          </div>
          {projects.length === 0 ? (
            <p className="text-center py-10 text-gray-400 text-sm">لا توجد مشاريع مرتبطة</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm" aria-label="مشاريع العميل">
                <thead className="bg-gray-50 dark:bg-gray-800/50">
                  <tr>
                    <th className="px-4 py-3 text-right font-semibold text-xs text-gray-500 uppercase">المشروع</th>
                    <th className="px-4 py-3 text-right font-semibold text-xs text-gray-500 uppercase">الحالة</th>
                    <th className="px-4 py-3 text-right font-semibold text-xs text-gray-500 uppercase hidden md:table-cell">الميزانية</th>
                    <th className="px-4 py-3 text-right font-semibold text-xs text-gray-500 uppercase hidden md:table-cell">تاريخ الانتهاء</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {projects.map(p => (
                    <tr key={p.id} className="hover:bg-gray-50/60 dark:hover:bg-gray-800/30 transition-colors">
                      <td className="px-4 py-3">
                        <Link href={`/dashboard/projects/${p.id}`} className="font-medium text-gray-900 dark:text-white hover:text-primary dark:hover:text-accent">{p.project_name}</Link>
                      </td>
                      <td className="px-4 py-3"><StatusBadge status={p.status} /></td>
                      <td className="px-4 py-3 hidden md:table-cell"><span dir="ltr" className="text-gray-500">${p.internal_budget?.toLocaleString()}</span></td>
                      <td className="px-4 py-3 hidden md:table-cell"><span dir="ltr" className="text-gray-500">{p.end_date ? format(new Date(p.end_date), "dd/MM/yyyy") : "—"}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
