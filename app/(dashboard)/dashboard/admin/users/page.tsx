"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { api, extractPaginatedData, apiGet, apiPost, apiPut, apiDelete } from "@/lib/api";
import { User, PaginatedResponse } from "@/lib/types";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Pagination } from "@/components/ui/Pagination";
import { SortableHeader } from "@/components/ui/SortableHeader";
import { SkeletonTable } from "@/components/ui/SkeletonTable";
import { Modal } from "@/components/ui/Modal";
import { Plus, Search, X, Users, RefreshCw, MoreVertical, Edit, Trash2, Mail, Phone, Shield } from "lucide-react";
import { format } from "date-fns";

// ── User Form ────────────────────────────────────────────────────────────────

interface UserFormData {
  name: string;
  email: string;
  phone: string;
  default_hourly_rate: string;
  roles: string[];
}

const EMPTY_FORM: UserFormData = {
  name: "", email: "", phone: "", default_hourly_rate: "", roles: ["employee"],
};

const AVAILABLE_ROLES = [
  { id: "admin", name: "مدير نظام" },
  { id: "manager", name: "مدير مشروع" },
  { id: "employee", name: "موظف" },
];

function UserForm({
  initial, onSubmit, submitting,
}: {
  initial: UserFormData;
  onSubmit: (data: UserFormData) => void;
  submitting: boolean;
}) {
  const [form, setForm] = useState<UserFormData>(initial);
  const set = (k: keyof UserFormData, v: any) => setForm(f => ({ ...f, [k]: v }));

  return (
    <form onSubmit={e => { e.preventDefault(); onSubmit(form); }} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">الاسم الكامل *</label>
          <input required className="input-base" value={form.name} onChange={e => set("name", e.target.value)} placeholder="اسم الموظف" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">البريد الإلكتروني *</label>
          <input required type="email" className="input-base" value={form.email} onChange={e => set("email", e.target.value)} placeholder="email@example.com" dir="ltr" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">رقم الهاتف</label>
          <input className="input-base" value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="+966..." dir="ltr" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">سعر الساعة الافتراضي</label>
          <input type="number" className="input-base" value={form.default_hourly_rate} onChange={e => set("default_hourly_rate", e.target.value)} placeholder="0.00" />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">الأدوار / الصلاحيات</label>
          <div className="grid grid-cols-3 gap-2">
            {AVAILABLE_ROLES.map(role => (
              <label key={role.id} className="flex items-center gap-2 p-2 rounded-lg border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={form.roles.includes(role.id)}
                  onChange={e => {
                    const roles = e.target.checked 
                      ? [...form.roles, role.id]
                      : form.roles.filter(r => r !== role.id);
                    set("roles", roles);
                  }}
                  className="rounded border-gray-300 dark:border-gray-600 text-primary focus:ring-primary"
                />
                <span className="text-xs">{role.name}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-2">
        <button type="submit" disabled={submitting} className="btn-primary w-full sm:w-auto">
          {submitting ? "جاري الحفظ..." : "حفظ الموظف"}
        </button>
      </div>
    </form>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────

function UserManagementPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") || 1);
  const perPage = Number(searchParams.get("per_page") || 20);
  const search = searchParams.get("search") || "";
  const sortBy = searchParams.get("sort_by") || "created_at";
  const sortOrder = (searchParams.get("sort_order") || "desc") as "asc" | "desc";

  const [data, setData] = useState<PaginatedResponse<User> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const pushParams = useCallback((updates: Record<string, string | number>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([k, v]) => {
      if (v === "" || v === null || v === undefined) params.delete(k);
      else params.set(k, String(v));
    });
    router.push(`?${params.toString()}`);
  }, [router, searchParams]);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true); setIsError(false);
    try {
      const params: Record<string, string | number> = { page, per_page: perPage, sort_by: sortBy, sort_order: sortOrder };
      if (search) params.search = search;
      
      const res = await api.get("/admin/users", { params });
      const paginatedData = extractPaginatedData<User>(res);
      setData(paginatedData);
    } catch (error: unknown) { 
      console.error("Failed to fetch users:", error);
      setIsError(true);
    } finally { setIsLoading(false); }
  }, [page, perPage, search, sortBy, sortOrder]);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);
  useEffect(() => {
    const close = () => setActiveMenu(null);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const handleSort = (field: string) => pushParams({ sort_by: field, sort_order: sortBy === field && sortOrder === "asc" ? "desc" : "asc", page: 1 });
  const handleFilter = (key: string, value: string) => pushParams({ [key]: value, page: 1 });

  const handleDelete = async (id: number) => {
    if (!confirm("هل أنت متأكد من حذف هذا الموظف؟ لا يمكن التراجع عن هذا الإجراء.")) return;
    try { 
      await apiDelete(`/admin/users/${id}`); 
      fetchUsers(); 
    } catch (error: unknown) { 
      const err = error as { message?: string };
      alert(err.message || "حدث خطأ أثناء حذف الموظف"); 
    }
  };

  const handleCreate = async (form: UserFormData) => {
    setSubmitting(true);
    try {
      await apiPost("/admin/users", {
        ...form,
        default_hourly_rate: Number(form.default_hourly_rate) || 0,
      });
      setCreateOpen(false);
      fetchUsers();
    } catch (error: unknown) { 
      const err = error as { message?: string };
      alert(err.message || "حدث خطأ أثناء إضافة الموظف"); 
    } finally { setSubmitting(false); }
  };

  const handleEdit = async (form: UserFormData) => {
    if (!editUser) return;
    setSubmitting(true);
    try {
      await apiPut(`/admin/users/${editUser.id}`, {
        ...form,
        default_hourly_rate: Number(form.default_hourly_rate) || 0,
      });
      setEditUser(null);
      fetchUsers();
    } catch (error: unknown) { 
      const err = error as { message?: string };
      alert(err.message || "حدث خطأ أثناء تعديل بيانات الموظف"); 
    } finally { setSubmitting(false); }
  };

  const users = data?.data || [];

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Users className="h-6 w-6 text-primary" />
            إدارة الموظفين
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">إدارة حسابات الفريق والصلاحيات والأسعار الافتراضية</p>
        </div>
        <button onClick={() => setCreateOpen(true)} className="btn-primary">
          <Plus className="h-4 w-4" /> إضافة موظف جديد
        </button>
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="relative max-w-md">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          <input 
            type="text" 
            placeholder="البحث بالاسم أو البريد..." 
            value={search} 
            onChange={e => handleFilter("search", e.target.value)} 
            className="input-base pr-9" 
            aria-label="بحث" 
          />
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        {isLoading ? <SkeletonTable cols={5} rows={5} /> : isError ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <p className="text-gray-500">فشل تحميل بيانات الموظفين</p>
            <button onClick={fetchUsers} className="btn-ghost flex items-center gap-2"><RefreshCw className="h-4 w-4" /> إعادة المحاولة</button>
          </div>
        ) : users.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Users className="h-12 w-12 text-gray-300" />
            <p className="text-gray-500 font-medium">لا يوجد موظفون متاحون حالياً</p>
            <button onClick={() => setCreateOpen(true)} className="btn-primary text-sm">إضافة موظف</button>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-800/50">
                  <tr>
                    <th className="px-4 py-3 text-right"><SortableHeader label="الاسم" field="name" sortBy={sortBy} sortOrder={sortOrder} onSort={handleSort} /></th>
                    <th className="px-4 py-3 text-right">البريد والهاتف</th>
                    <th className="px-4 py-3 text-right">الأدوار</th>
                    <th className="px-4 py-3 text-right hidden md:table-cell">سعر الساعة</th>
                    <th className="px-4 py-3 w-10" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {users.map(u => (
                    <tr key={u.id} className="hover:bg-gray-50/60 dark:hover:bg-gray-800/30 transition-colors group">
                      <td className="px-4 py-3">
                        <div className="font-medium text-gray-900 dark:text-white">{u.name}</div>
                        <div className="text-[10px] text-gray-400 font-mono">ID: #{u.id}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400 text-xs">
                            <Mail className="h-3 w-3" /> {u.email}
                          </div>
                          {u.phone && (
                            <div className="flex items-center gap-1.5 text-gray-500 text-[11px]" dir="ltr">
                              <Phone className="h-3 w-3" /> {u.phone}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {u.roles.map(role => (
                            <span key={role} className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              role === 'admin' ? 'bg-red-50 text-red-600 dark:bg-red-500/10' :
                              role === 'manager' ? 'bg-primary-light text-primary dark:bg-primary-light/10 dark:text-accent' :
                              'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                            }`}>
                              {AVAILABLE_ROLES.find(r => r.id === role)?.name || role}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span className="text-gray-700 dark:text-gray-300 font-medium" dir="ltr">${u.default_hourly_rate || 0}</span>
                        <span className="text-gray-400 text-[10px] mr-1">/ساعة</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="relative" onClick={e => e.stopPropagation()}>
                          <button onClick={() => setActiveMenu(activeMenu === u.id ? null : u.id)} className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
                            <MoreVertical className="h-4 w-4 text-gray-400" />
                          </button>
                          {activeMenu === u.id && (
                            <div className="absolute left-0 top-full mt-1 w-32 rounded-xl bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black/5 z-20 py-1 border border-gray-100 dark:border-gray-700">
                              <button onClick={() => { setEditUser(u); setActiveMenu(null); }} className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                <Edit className="h-4 w-4" /> تعديل
                              </button>
                              <button onClick={() => handleDelete(u.id)} className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10">
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
      <Modal open={createOpen} onClose={() => setCreateOpen(false)} title="إضافة موظف جديد" size="md">
        <UserForm initial={EMPTY_FORM} onSubmit={handleCreate} submitting={submitting} />
      </Modal>

      {/* Edit Modal */}
      <Modal open={editUser !== null} onClose={() => setEditUser(null)} title="تعديل بيانات الموظف" size="md">
        {editUser && (
          <UserForm
            initial={{
              name: editUser.name,
              email: editUser.email,
              phone: editUser.phone || "",
              default_hourly_rate: String(editUser.default_hourly_rate || ""),
              roles: editUser.roles,
            }}
            onSubmit={handleEdit}
            submitting={submitting}
          />
        )}
      </Modal>
    </div>
  );
}

export default function UserManagementPage() {
  return <Suspense><UserManagementPageInner /></Suspense>;
}
