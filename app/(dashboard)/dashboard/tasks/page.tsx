"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Task } from "@/lib/types";
import { 
  Plus, 
  Search, 
  Clock, 
  AlertCircle,
  MoreHorizontal,
  FolderKanban,
  CheckCircle2,
  ListTodo,
  AlignLeft,
  X,
  Eye,
  Edit,
  Trash2
} from "lucide-react";

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projectsList, setProjectsList] = useState<any[]>([]);
  const [usersList, setUsersList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<number | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isViewingDetails, setIsViewingDetails] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTask, setEditTask] = useState({ title: "", description: "", priority: "medium", status: "pending", estimated_hours: 0, internal_price: 0 });
  
  const [newTask, setNewTask] = useState({
    project_id: "",
    title: "",
    description: "",
    priority: "medium",
    status: "pending",
    estimated_hours: 0,
    internal_price: 0,
    assigned_users: [] as string[],
  });

  useEffect(() => {
    const fetchTasksAndProjects = async () => {
      try {
        const [tasksRes, projRes, usersRes] = await Promise.all([
           api.get("/tasks"),
           api.get("/projects").catch(() => ({ data: { data: [] } })),
           api.get("/admin/users").catch(() => ({ data: { data: [] } }))
        ]);
        
        setTasks(tasksRes.data.data || tasksRes.data || []);
        
        const projs = projRes.data.data || projRes.data || [];
        setProjectsList(projs);
        if (projs.length > 0) {
           setNewTask(prev => ({ ...prev, project_id: projs[0].id.toString() }));
        }

        const users = usersRes.data.data || usersRes.data || [];
        setUsersList(users);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasksAndProjects();
  }, []);

  const refreshTasks = async () => {
    const response = await api.get("/tasks");
    setTasks(response.data.data || response.data || []);
  };

  const openEditModal = (task: Task) => {
    setEditingId(task.id);
    setEditTask({
      title: task.title || "",
      description: task.description || "",
      priority: task.priority || "medium",
      status: task.status || "pending",
      estimated_hours: task.estimated_hours || 0,
      internal_price: task.internal_price || 0,
    });
    setIsEditing(true);
    setIsViewingDetails(false);
    setActiveMenuId(null);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;
    setIsSubmitting(true);
    try {
      await api.put(`/tasks/${editingId}`, editTask);
      setIsEditing(false);
      setEditingId(null);
      await refreshTasks();
    } catch (error: any) {
      alert(error.response?.data?.message || "حدث خطأ أثناء تحديث المهمة.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (taskId: number) => {
    if (!confirm("هل أنت متأكد من حذف هذه المهمة؟")) return;
    try {
      await api.delete(`/tasks/${taskId}`);
      setIsViewingDetails(false);
      setActiveMenuId(null);
      await refreshTasks();
    } catch (error: any) {
      alert(error.response?.data?.message || "حدث خطأ أثناء حذف المهمة.");
    }
  };

  const handleStatusChange = async (taskId: number, newStatus: string) => {
    try {
      await api.put(`/tasks/${taskId}`, { status: newStatus });
      await refreshTasks();
      if (selectedTask && selectedTask.id === taskId) {
        setSelectedTask({ ...selectedTask, status: newStatus as any });
      }
    } catch (error: any) {
      alert(error.response?.data?.message || "حدث خطأ أثناء تغيير الحالة.");
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.project_id) {
       alert("الرجاء اختيار مشروع للمهمة");
       return;
    }
    setIsSubmitting(true);
    try {
      const payload = {
        ...newTask,
        project_id: Number(newTask.project_id),
        estimated_hours: Number(newTask.estimated_hours),
        internal_price: Number(newTask.internal_price),
        assigned_users: newTask.assigned_users.map(id => Number(id))
      };
      await api.post("/tasks", payload);
      setIsCreating(false);
      setNewTask({
        project_id: projectsList[0]?.id?.toString() || "",
        title: "",
        description: "",
        priority: "medium",
        status: "pending",
        estimated_hours: 0,
        internal_price: 0,
        assigned_users: [],
      });
      await refreshTasks();
    } catch (error) {
      console.error("Failed to create task", error);
      alert("حدث خطأ أثناء الإنشاء. تأكد من صحة البيانات.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUserToggle = (userId: string) => {
    setNewTask(prev => {
      const isSelected = prev.assigned_users.includes(userId);
      if (isSelected) {
        return { ...prev, assigned_users: prev.assigned_users.filter(id => id !== userId) };
      } else {
        return { ...prev, assigned_users: [...prev.assigned_users, userId] };
      }
    });
  };

  const getPriorityIconAndColor = (priority: string) => {
    switch (priority) {
      case "high":
        return { icon: AlertCircle, color: "text-red-500", bg: "bg-red-50 dark:bg-red-500/10" };
      case "medium":
        return { icon: AlertCircle, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-500/10" };
      case "low":
        return { icon: AlertCircle, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10" };
      default:
        return { icon: AlertCircle, color: "text-gray-500", bg: "bg-gray-50 dark:bg-gray-500/10" };
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <span className="inline-flex items-center gap-x-1.5 rounded-md bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 ring-1 ring-inset ring-emerald-600/20">
            <CheckCircle2 className="h-3.5 w-3.5" />
            مكتملة
          </span>
        );
      case "in_progress":
        return (
          <span className="inline-flex items-center gap-x-1.5 rounded-md bg-blue-50 dark:bg-blue-500/10 px-2 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-600/20">
            <ListTodo className="h-3.5 w-3.5" />
            قيد التنفيذ
          </span>
        );
      case "pending":
      default:
        return (
          <span className="inline-flex items-center gap-x-1.5 rounded-md bg-gray-100 dark:bg-gray-800 px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 ring-1 ring-inset ring-gray-600/20 dark:ring-gray-700">
            <AlignLeft className="h-3.5 w-3.5" />
            قيد الانتظار
          </span>
        );
    }
  };

  const filteredTasks = tasks.filter((t) => 
    t.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setActiveMenuId(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
            مهامي
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            تتبع وإدارة مهامك في جميع المشاريع.
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
              placeholder="ابحث عن المهام..."
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
            مهمة جديدة
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-20 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse border border-gray-200 dark:border-gray-700"></div>
          ))}
        </div>
      ) : filteredTasks.length > 0 ? (
        <div className="bg-white dark:bg-[#0f172a] shadow-sm rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden divide-y divide-gray-100 dark:divide-gray-800">
          {filteredTasks.map((task) => {
            const priorityInfo = getPriorityIconAndColor(task.priority);
            const PriorityIcon = priorityInfo.icon;
            
            return (
              <div
                key={task.id}
                className="group flex flex-col sm:flex-row sm:items-center justify-between p-5 hover:bg-gray-50/80 dark:hover:bg-gray-800/30 transition-all gap-4"
              >
                <div className="flex items-start gap-4 flex-1">
                  <div className={`mt-0.5 p-2 rounded-lg ${priorityInfo.bg}`}>
                    <PriorityIcon className={`h-5 w-5 ${priorityInfo.color}`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-base font-medium text-gray-900 dark:text-white truncate">
                        <button 
                          onClick={() => {
                            setSelectedTask(task);
                            setIsViewingDetails(true);
                          }}
                          className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-right"
                        >
                          {task.title}
                        </button>
                      </h4>
                      {getStatusBadge(task.status)}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 gap-4 mt-2">
                       <span className="flex items-center gap-1.5">
                         <FolderKanban className="h-4 w-4" /> مشروع #{task.project_id}
                       </span>
                       <span className="flex items-center gap-1.5">
                         <Clock className="h-4 w-4" /> {task.estimated_hours} ساعة مقدرة
                       </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-end gap-2 sm:mr-4 sm:flex-shrink-0">
                  <div className="flex space-x-reverse -space-x-2 ml-4">
                     {/* Dummy assigned users avatars */}
                    {task.assigned_users?.slice(0, 3).map((user: any, idx) => {
                      const initial = typeof user === 'object' && user !== null && user.name 
                        ? user.name.charAt(0).toUpperCase() 
                        : typeof user === 'number' || typeof user === 'string' 
                          ? `U${user}` 
                          : 'U';
                      return (
                        <div key={idx} className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-[#0f172a] bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-xs font-medium text-indigo-700 dark:text-indigo-400" title={typeof user === 'object' ? user.name : `User ${user}`}>
                          {initial}
                        </div>
                      );
                    })}
                  </div>

                  <div className="relative">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveMenuId(activeMenuId === task.id ? null : task.id);
                      }}
                      className="text-gray-400 hover:text-gray-500 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                    >
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                    
                    {/* Dropdown Menu */}
                    {activeMenuId === task.id && (
                      <div className="absolute left-0 top-full mt-1 w-48 rounded-xl bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black/5 dark:ring-white/10 z-10 py-1 overflow-hidden">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTask(task);
                            setIsViewingDetails(true);
                            setActiveMenuId(null);
                          }}
                          className="flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                        >
                          <Eye className="mr-3 ml-2 h-4 w-4 text-gray-400" />
                          عرض التفاصيل
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openEditModal(task);
                          }}
                          className="flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                        >
                          <Edit className="mr-3 ml-2 h-4 w-4 text-gray-400" />
                          تعديل
                        </button>
                        <div className="h-px bg-gray-100 dark:bg-gray-700/50 my-1" />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveMenuId(null);
                            handleDelete(task.id);
                          }}
                          className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10"
                        >
                          <Trash2 className="mr-3 ml-2 h-4 w-4 text-red-500" />
                          حذف
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center bg-white dark:bg-[#0f172a] py-16 px-6 rounded-2xl border border-dashed border-gray-300 dark:border-gray-800">
          <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-400/50" />
          <h3 className="mt-4 text-sm font-semibold text-gray-900 dark:text-white">كُل شيء مُنجز!</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">ليس لديك أي مهام مسندة إليك في الوقت الحالي.</p>
        </div>
      )}

      {/* Create Modal */}
      {isCreating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:p-0 backdrop-blur-sm transition-opacity overflow-y-auto">
          <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-[#0f172a] shadow-2xl sm:w-full sm:max-w-xl w-full ring-1 ring-gray-200 dark:ring-gray-800 transform transition-all my-8">
            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
               <h3 className="text-xl font-bold text-gray-900 dark:text-white">مهمة جديدة</h3>
               <button onClick={() => setIsCreating(false)} className="text-gray-400 hover:text-gray-500">
                  <X className="h-5 w-5" />
               </button>
            </div>
            <form onSubmit={handleCreate}>
              <div className="px-6 py-4 space-y-4 max-h-[70vh] overflow-y-auto">
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                    المشروع
                  </label>
                  <select
                    required
                    className="mt-1 block w-full rounded-md border-0 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white dark:bg-[#0f172a]"
                    value={newTask.project_id}
                    onChange={(e) => setNewTask({...newTask, project_id: e.target.value})}
                  >
                    <option value="" disabled>اختر مشروعاً</option>
                    {projectsList.map((p) => (
                      <option key={p.id} value={p.id}>{p.project_name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                    عنوان المهمة
                  </label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full rounded-md border-0 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-transparent"
                    value={newTask.title}
                    onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                    الوصف
                  </label>
                  <textarea
                    rows={2}
                    className="mt-1 block w-full rounded-md border-0 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-transparent"
                    value={newTask.description}
                    onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                      الأولوية
                    </label>
                    <select
                        className="mt-1 block w-full rounded-md border-0 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white dark:bg-[#0f172a]"
                        value={newTask.priority}
                        onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                      >
                        <option value="low">منخفضة</option>
                        <option value="medium">متوسطة</option>
                        <option value="high">عالية</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                      الحالة
                    </label>
                    <select
                        className="mt-1 block w-full rounded-md border-0 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white dark:bg-[#0f172a]"
                        value={newTask.status}
                        onChange={(e) => setNewTask({...newTask, status: e.target.value})}
                      >
                        <option value="pending">قيد الانتظار</option>
                        <option value="in_progress">قيد التنفيذ</option>
                        <option value="completed">مكتملة</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">الساعات المقدرة</label>
                    <input
                      type="number"
                      step="0.5"
                      min="0"
                      className="mt-1 block w-full rounded-md border-0 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-transparent"
                      value={newTask.estimated_hours}
                      onChange={(e) => setNewTask({...newTask, estimated_hours: Number(e.target.value)})}
                    />
                  </div>
                  <div>
                     <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">السعر الداخلي</label>
                    <input
                      type="number"
                      min="0"
                      className="mt-1 block w-full rounded-md border-0 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-transparent"
                      value={newTask.internal_price}
                      onChange={(e) => setNewTask({...newTask, internal_price: Number(e.target.value)})}
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200 mb-2">
                    المستخدمين المسندين (Assigned Users)
                  </label>
                  {usersList.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 border border-gray-200 dark:border-gray-700 rounded-md p-3 max-h-40 overflow-y-auto">
                      {usersList.map((user) => (
                        <label key={user.id} className="flex items-center space-x-2 space-x-reverse cursor-pointer p-1.5 hover:bg-gray-50 dark:hover:bg-gray-800 rounded">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 bg-transparent"
                            checked={newTask.assigned_users.includes(user.id.toString())}
                            onChange={() => handleUserToggle(user.id.toString())}
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300 truncate" title={user.name}>{user.name}</span>
                        </label>
                      ))}
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-md border border-gray-200 dark:border-gray-700">
                      لا تملك صلاحية الوصول لقائمة المستخدمين، أو لا يوجد مستخدمين. يمكنك إضافة الأرقام يدوياً:
                      <input
                        type="text"
                        placeholder="أرقام المعرفات مفصولة بفاصلة (مثال: 1, 2)"
                        className="mt-2 block w-full rounded-md border-0 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-transparent"
                        value={newTask.assigned_users.join(', ')}
                        onChange={(e) => setNewTask({...newTask, assigned_users: e.target.value.split(',').map(s => s.trim()).filter(Boolean)})}
                      />
                    </div>
                  )}
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
                  {isSubmitting ? 'جاري الحفظ...' : 'إنشاء المهمة'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {isViewingDetails && selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:p-0 backdrop-blur-sm transition-opacity">
          <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-[#0f172a] shadow-2xl sm:w-full sm:max-w-2xl w-full ring-1 ring-gray-200 dark:ring-gray-800 transform transition-all max-h-[90vh] flex flex-col">
            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-900/50">
               <div>
                 <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                    {selectedTask.title}
                    {getStatusBadge(selectedTask.status)}
                 </h3>
                 <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                    <FolderKanban className="h-4 w-4 inline" />
                    مشروع رقم #{selectedTask.project_id}
                 </p>
               </div>
               <button onClick={() => setIsViewingDetails(false)} className="text-gray-400 hover:text-gray-500 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-full transition-colors shadow-sm ring-1 ring-gray-200 dark:ring-gray-700">
                  <X className="h-5 w-5" />
               </button>
            </div>
            <div className="px-6 py-6 space-y-6 overflow-y-auto flex-1">
               <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">الوصف</h4>
                  <p className="text-gray-900 dark:text-gray-200 whitespace-pre-wrap leading-relaxed bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
                     {selectedTask.description || "لا يوجد وصف محدد لهذه المهمة."}
                  </p>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
                     <div className={`p-2.5 rounded-lg ${getPriorityIconAndColor(selectedTask.priority).bg} ${getPriorityIconAndColor(selectedTask.priority).color}`}>
                        <AlertCircle className="h-5 w-5" />
                     </div>
                     <div>
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">الأولوية</p>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">
                           {selectedTask.priority === "high" ? "عالية" : selectedTask.priority === "medium" ? "متوسطة" : "منخفضة"}
                        </p>
                     </div>
                  </div>
                  
                  <div className="flex items-center gap-3 bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
                     <div className="p-2.5 bg-indigo-50 dark:bg-indigo-500/10 rounded-lg text-indigo-600 dark:text-indigo-400">
                        <Clock className="h-5 w-5" />
                     </div>
                     <div>
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">المقاييس (Estimation/Price)</p>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">
                           {selectedTask.estimated_hours} ساعة / ${selectedTask.internal_price}
                        </p>
                     </div>
                  </div>
               </div>

               <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">المستخدمين المسندين</h4>
                  {selectedTask.assigned_users && selectedTask.assigned_users.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {selectedTask.assigned_users.map((user: any, idx) => (
                        <div key={idx} className="flex items-center gap-2 bg-white dark:bg-gray-800 p-2 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm pr-4">
                          <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-xs font-medium text-indigo-700 dark:text-indigo-400">
                             {typeof user === 'object' && user.name ? user.name.charAt(0).toUpperCase() : `U`}
                          </div>
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {typeof user === 'object' && user.name ? user.name : `User ${user}`}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400">لم يتم إسناد أي مستخدم لهذه المهمة بعد.</p>
                  )}
               </div>

               <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">تغيير الحالة</h4>
                  <div className="flex gap-2">
                    {(['pending', 'in_progress', 'completed'] as const).map((s) => (
                      <button
                        key={s}
                        onClick={() => handleStatusChange(selectedTask.id, s)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          selectedTask.status === s
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                        }`}
                      >
                        {s === 'pending' ? 'قيد الانتظار' : s === 'in_progress' ? 'قيد التنفيذ' : 'مكتمل'}
                      </button>
                    ))}
                  </div>
               </div>

            </div>
            <div className="bg-gray-50 dark:bg-gray-900/50 px-6 py-4 flex items-center justify-end gap-3 border-t border-gray-100 dark:border-gray-800">
              <button type="button" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" onClick={() => setIsViewingDetails(false)}>إغلاق</button>
              <button type="button" className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500 shadow-sm transition-colors flex items-center gap-2" onClick={() => handleDelete(selectedTask.id)}>
                <Trash2 className="h-4 w-4" /> حذف
              </button>
              <button type="button" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 shadow-sm transition-colors flex items-center gap-2" onClick={() => openEditModal(selectedTask)}>
                <Edit className="h-4 w-4" /> تعديل
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:p-0 backdrop-blur-sm transition-opacity">
          <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-[#0f172a] shadow-2xl sm:w-full sm:max-w-md w-full ring-1 ring-gray-200 dark:ring-gray-800 transform transition-all">
            <div className="px-6 py-6 border-b border-gray-100 dark:border-gray-800">
               <h3 className="text-xl font-bold text-gray-900 dark:text-white">تعديل المهمة</h3>
            </div>
            <form onSubmit={handleUpdate}>
              <div className="px-6 py-4 space-y-4 max-h-[70vh] overflow-y-auto">
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">العنوان</label>
                  <input type="text" required className="mt-2 block w-full rounded-md border-0 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm bg-transparent" value={editTask.title} onChange={(e) => setEditTask({...editTask, title: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">الوصف</label>
                  <textarea rows={3} className="mt-2 block w-full rounded-md border-0 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm bg-transparent" value={editTask.description} onChange={(e) => setEditTask({...editTask, description: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">الأولوية</label>
                    <select className="mt-2 block w-full rounded-md border-0 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm bg-white dark:bg-[#0f172a]" value={editTask.priority} onChange={(e) => setEditTask({...editTask, priority: e.target.value})}>
                      <option value="low">منخفضة</option>
                      <option value="medium">متوسطة</option>
                      <option value="high">عالية</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">الحالة</label>
                    <select className="mt-2 block w-full rounded-md border-0 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm bg-white dark:bg-[#0f172a]" value={editTask.status} onChange={(e) => setEditTask({...editTask, status: e.target.value})}>
                      <option value="pending">قيد الانتظار</option>
                      <option value="in_progress">قيد التنفيذ</option>
                      <option value="completed">مكتمل</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">الساعات المقدرة</label>
                    <input type="number" step="0.5" min="0" className="mt-2 block w-full rounded-md border-0 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm bg-transparent" value={editTask.estimated_hours} onChange={(e) => setEditTask({...editTask, estimated_hours: Number(e.target.value)})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">السعر الداخلي</label>
                    <input type="number" step="0.01" min="0" className="mt-2 block w-full rounded-md border-0 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm bg-transparent" value={editTask.internal_price} onChange={(e) => setEditTask({...editTask, internal_price: Number(e.target.value)})} />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900/50 px-6 py-4 flex items-center justify-end gap-3 border-t border-gray-100 dark:border-gray-800">
                <button type="button" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" onClick={() => setIsEditing(false)}>إلغاء</button>
                <button type="submit" disabled={isSubmitting} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 shadow-sm transition-colors disabled:opacity-50">{isSubmitting ? 'جاري الحفظ...' : 'حفظ التغييرات'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
