"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { InternalPayout } from "@/lib/types";
import { 
  Plus, 
  Search, 
  CreditCard,
  Banknote,
  FileText,
  X,
  MoreVertical,
  Edit,
  Trash2
} from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

export default function PayoutsPage() {
  const [payouts, setPayouts] = useState<InternalPayout[]>([]);
  const [tasksList, setTasksList] = useState<any[]>([]);
  const [usersList, setUsersList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editPayout, setEditPayout] = useState({ amount_paid: 0, notes: "" });
  
  const [newPayout, setNewPayout] = useState({
    user_id: "",
    task_id: "",
    amount_paid: 0,
    notes: "",
  });

  useEffect(() => {
    const fetchPayoutsAndTasks = async () => {
      try {
        const [payoutsRes, tasksRes, usersRes] = await Promise.all([
          api.get("/internal-payouts"),
          api.get("/tasks").catch(() => ({ data: { data: [] } })),
          api.get("/admin/users").catch(() => ({ data: { data: [] } }))
        ]);
        setPayouts(payoutsRes.data.data || payoutsRes.data || []);
        
        const tasks = tasksRes.data.data || tasksRes.data || [];
        setTasksList(tasks);
        if (tasks.length > 0) {
           setNewPayout(prev => ({ ...prev, task_id: tasks[0].id.toString() }));
        }

        const users = usersRes.data.data || usersRes.data || [];
        setUsersList(users);
        if (users.length > 0) {
           setNewPayout(prev => ({ ...prev, user_id: users[0].id.toString() }));
        }
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPayoutsAndTasks();
  }, []);

  useEffect(() => {
    const handleClickOutside = () => setActiveMenuId(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const refreshPayouts = async () => {
    const response = await api.get("/internal-payouts");
    setPayouts(response.data.data || response.data || []);
  };

  const openEditModal = (payout: InternalPayout) => {
    setEditingId(payout.id);
    setEditPayout({ amount_paid: payout.amount_paid, notes: payout.notes || "" });
    setIsEditing(true);
    setActiveMenuId(null);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;
    setIsSubmitting(true);
    try {
      await api.put(`/internal-payouts/${editingId}`, { ...editPayout, amount_paid: Number(editPayout.amount_paid) });
      setIsEditing(false);
      setEditingId(null);
      await refreshPayouts();
    } catch (error: any) {
      alert(error.response?.data?.message || "حدث خطأ أثناء التحديث.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (payoutId: number) => {
    if (!confirm("هل أنت متأكد من حذف هذه الدفعة؟")) return;
    try {
      await api.delete(`/internal-payouts/${payoutId}`);
      setActiveMenuId(null);
      await refreshPayouts();
    } catch (error: any) {
      alert(error.response?.data?.message || "حدث خطأ أثناء الحذف.");
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPayout.user_id) {
       alert("الرجاء اختيار مستخدم");
       return;
    }
    setIsSubmitting(true);
    try {
      const payload = {
        ...newPayout,
        user_id: Number(newPayout.user_id),
        task_id: newPayout.task_id ? Number(newPayout.task_id) : undefined,
        amount_paid: Number(newPayout.amount_paid)
      };
      await api.post("/internal-payouts", payload);
      setIsCreating(false);
      setNewPayout({
        user_id: usersList[0]?.id?.toString() || "",
        task_id: tasksList[0]?.id?.toString() || "",
        amount_paid: 0,
        notes: "",
      });
      await refreshPayouts();
    } catch (error) {
      console.error("Failed to create payout", error);
      alert("حدث خطأ أثناء الإنشاء. تأكد من صحة البيانات.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredPayouts = payouts.filter((p) => 
    p.notes?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
            المدفوعات والمستحقات
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            تتبع المبالغ المالية والمكافآت المدفوعة للموظفين.
          </p>
        </div>
        <div className="flex mt-4 sm:mr-16 sm:mt-0 gap-3">
          <div className="relative rounded-md shadow-sm xl:w-80">
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <Search className="h-4 w-4 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              name="search"
              id="search"
              className="block w-full rounded-lg border-0 py-2 pr-10 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-indigo-500 sm:text-sm sm:leading-6 bg-white dark:bg-[#0f172a] transition-all"
              placeholder="ابحث في المدفوعات..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            type="button"
            onClick={() => setIsCreating(true)}
            className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all shadow-indigo-500/30"
          >
            <Plus className="-mr-0.5 ml-1.5 h-5 w-5" aria-hidden="true" />
            تسجيل دفعة
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse border border-gray-200 dark:border-gray-700"></div>
          ))}
        </div>
      ) : filteredPayouts.length > 0 ? (
        <div className="bg-white dark:bg-[#0f172a] shadow-sm rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden divide-y divide-gray-100 dark:divide-gray-800">
          {filteredPayouts.map((payout) => (
            <div
              key={payout.id}
              className="group flex flex-col sm:flex-row sm:items-center justify-between p-5 hover:bg-gray-50/80 dark:hover:bg-gray-800/30 transition-all gap-4"
            >
              <div className="flex items-start gap-4 flex-1">
                <div className="mt-0.5 p-3 rounded-full bg-emerald-50 dark:bg-emerald-500/10">
                  <Banknote className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white truncate">
                      ${payout.amount_paid?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </h4>
                    <span className="inline-flex items-center rounded-md bg-indigo-50 dark:bg-indigo-500/10 px-2 py-1 text-xs font-medium text-indigo-700 dark:text-indigo-400 ring-1 ring-inset ring-indigo-600/10 dark:ring-indigo-500/20">
                      مستخدم #{payout.user_id}
                    </span>
                    {payout.task_id && (
                       <span className="inline-flex items-center rounded-md bg-gray-100 dark:bg-gray-800 px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 ring-1 ring-inset ring-gray-600/20 dark:ring-gray-700">
                         مهمة #{payout.task_id}
                       </span>
                    )}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 gap-4 mt-2">
                     <span className="flex items-center gap-1.5">
                       تاريخ الدفع: {payout.created_at ? format(new Date(payout.created_at), 'dd MMMM yyyy', { locale: ar }) : 'غير متوفر'}
                     </span>
                  </div>
                  {payout.notes && (
                    <div className="mt-3 flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg border border-gray-100 dark:border-gray-800">
                      <FileText className="h-4 w-4 mt-0.5 text-gray-400 shrink-0" />
                      <p>{payout.notes}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 sm:mr-4 sm:flex-shrink-0">
                <div className="relative">
                  <button onClick={(e) => { e.stopPropagation(); setActiveMenuId(activeMenuId === payout.id ? null : payout.id); }} className="text-gray-400 hover:text-gray-500 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                  {activeMenuId === payout.id && (
                    <div className="absolute left-0 top-full mt-1 w-40 rounded-xl bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black/5 dark:ring-white/10 z-10 py-1 overflow-hidden">
                      <button onClick={(e) => { e.stopPropagation(); openEditModal(payout); }} className="flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <Edit className="mr-3 ml-2 h-4 w-4 text-gray-400" /> تعديل
                      </button>
                      <div className="h-px bg-gray-100 dark:bg-gray-700/50 my-1" />
                      <button onClick={(e) => { e.stopPropagation(); setActiveMenuId(null); handleDelete(payout.id); }} className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10">
                        <Trash2 className="mr-3 ml-2 h-4 w-4 text-red-500" /> حذف
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center bg-white dark:bg-[#0f172a] py-16 px-6 rounded-2xl border border-dashed border-gray-300 dark:border-gray-800">
          <CreditCard className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600" />
          <h3 className="mt-4 text-sm font-semibold text-gray-900 dark:text-white">لا توجد مدفوعات</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">لم يتم تسجيل أي مدفوعات داخلية بعد.</p>
        </div>
      )}

      {/* Create Modal */}
      {isCreating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:p-0 backdrop-blur-sm transition-opacity">
          <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-[#0f172a] shadow-2xl sm:w-full sm:max-w-md w-full ring-1 ring-gray-200 dark:ring-gray-800 transform transition-all">
            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
               <h3 className="text-xl font-bold text-gray-900 dark:text-white">تسجيل دفعة جديدة</h3>
               <button onClick={() => setIsCreating(false)} className="text-gray-400 hover:text-gray-500">
                  <X className="h-5 w-5" />
               </button>
            </div>
            <form onSubmit={handleCreate}>
              <div className="px-6 py-4 space-y-4 max-h-[70vh] overflow-y-auto">
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                    المستخدم
                  </label>
                  {usersList.length > 0 ? (
                    <select
                      required
                      className="mt-1 block w-full rounded-md border-0 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white dark:bg-[#0f172a]"
                      value={newPayout.user_id}
                      onChange={(e) => setNewPayout({...newPayout, user_id: e.target.value})}
                    >
                      <option value="" disabled>اختر المستخدم</option>
                      {usersList.map((user) => (
                        <option key={user.id} value={user.id}>{user.name}</option>
                      ))}
                    </select>
                  ) : (
                    <div className="mt-1">
                      <input
                        type="number"
                        placeholder="رقم المستخدم (مثال: 1)"
                        required
                        min="1"
                        className="block w-full rounded-md border-0 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-transparent"
                        value={newPayout.user_id}
                        onChange={(e) => setNewPayout({...newPayout, user_id: e.target.value})}
                      />
                      <p className="mt-1 text-xs text-gray-500">أدخل رقم المعرف يدوياً (لا تملك صلاحية الوصول لقائمة المستخدمين)</p>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                    المهمة (اختياري)
                  </label>
                  <select
                    className="mt-1 block w-full rounded-md border-0 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white dark:bg-[#0f172a]"
                    value={newPayout.task_id}
                    onChange={(e) => setNewPayout({...newPayout, task_id: e.target.value})}
                  >
                    <option value="">بدون مهمة مرتبطة</option>
                    {tasksList.map((t) => (
                      <option key={t.id} value={t.id}>{t.title} - مشروع #{t.project_id}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                    المبلغ المدفوع ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    className="mt-1 block w-full rounded-md border-0 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-transparent"
                    value={newPayout.amount_paid}
                    onChange={(e) => setNewPayout({...newPayout, amount_paid: Number(e.target.value)})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                    ملاحظات
                  </label>
                  <textarea
                    rows={3}
                    className="mt-1 block w-full rounded-md border-0 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-transparent"
                    value={newPayout.notes}
                    onChange={(e) => setNewPayout({...newPayout, notes: e.target.value})}
                  />
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900/50 px-6 py-4 flex items-center justify-end gap-3 border-t border-gray-100 dark:border-gray-800">
                <button
                  type="button"
                  className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  onClick={() => setIsCreating(false)}
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 shadow-sm transition-colors disabled:opacity-50 flex items-center"
                >
                  {isSubmitting ? 'جاري الحفظ...' : 'تسجيل الدفعة'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:p-0 backdrop-blur-sm">
          <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-[#0f172a] shadow-2xl sm:w-full sm:max-w-md w-full ring-1 ring-gray-200 dark:ring-gray-800">
            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
               <h3 className="text-xl font-bold text-gray-900 dark:text-white">تعديل الدفعة</h3>
               <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-500"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleUpdate}>
              <div className="px-6 py-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-gray-200">المبلغ المدفوع ($)</label>
                  <input type="number" step="0.01" min="0" required className="mt-1 block w-full rounded-md border-0 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-indigo-600 sm:text-sm bg-transparent" value={editPayout.amount_paid} onChange={(e) => setEditPayout({...editPayout, amount_paid: Number(e.target.value)})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-gray-200">ملاحظات</label>
                  <textarea rows={3} className="mt-1 block w-full rounded-md border-0 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-indigo-600 sm:text-sm bg-transparent" value={editPayout.notes} onChange={(e) => setEditPayout({...editPayout, notes: e.target.value})} />
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900/50 px-6 py-4 flex items-center justify-end gap-3 border-t border-gray-100 dark:border-gray-800">
                <button type="button" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setIsEditing(false)}>إلغاء</button>
                <button type="submit" disabled={isSubmitting} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 shadow-sm disabled:opacity-50">{isSubmitting ? 'جاري الحفظ...' : 'حفظ التغييرات'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
