"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useAuthStore } from "@/lib/store";
import { Project } from "@/lib/types";
import { 
  Plus, 
  Search, 
  CalendarDays, 
  Wallet,
  MoreVertical,
  Activity,
  Eye,
  Edit,
  Trash2,
  X
} from "lucide-react";
import { format } from "date-fns";

export default function ProjectsPage() {
  const { user } = useAuthStore();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isViewingDetails, setIsViewingDetails] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editProject, setEditProject] = useState({
    project_name: "",
    description: "",
    internal_budget: 0,
    start_date: "",
    end_date: "",
    status: "active",
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [newProject, setNewProject] = useState({
    project_name: "",
    description: "",
    internal_budget: 0,
    start_date: "",
    end_date: "",
    status: "active",
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get("/projects");
        // API might return data in a paginated format like response.data.data
        const items = response.data.data || response.data || [];
        setProjects(items);
      } catch (error) {
        console.error("Failed to fetch projects", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const refreshProjects = async () => {
    const response = await api.get("/projects");
    setProjects(response.data.data || response.data || []);
  };

  const openEditModal = (project: Project) => {
    setEditingId(project.id);
    setEditProject({
      project_name: project.project_name || "",
      description: project.description || "",
      internal_budget: project.internal_budget || 0,
      start_date: project.start_date || "",
      end_date: project.end_date || "",
      status: project.status || "active",
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
      await api.put(`/projects/${editingId}`, {
        ...editProject,
        internal_budget: Number(editProject.internal_budget),
      });
      setIsEditing(false);
      setEditingId(null);
      await refreshProjects();
    } catch (error: any) {
      console.error("Failed to update project", error);
      alert(error.response?.data?.message || "حدث خطأ أثناء تحديث المشروع.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (projectId: number) => {
    if (!confirm("هل أنت متأكد من حذف هذا المشروع؟ لا يمكن التراجع عن هذا الإجراء.")) return;
    try {
      await api.delete(`/projects/${projectId}`);
      setIsViewingDetails(false);
      setActiveMenuId(null);
      await refreshProjects();
    } catch (error: any) {
      console.error("Failed to delete project", error);
      alert(error.response?.data?.message || "حدث خطأ أثناء حذف المشروع.");
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        ...newProject,
        owner_id: user?.id || 1,
        internal_budget: Number(newProject.internal_budget)
      };
      await api.post("/projects", payload);
      setIsCreating(false);
      setNewProject({
        project_name: "",
        description: "",
        internal_budget: 0,
        start_date: "",
        end_date: "",
        status: "active",
      });
      await refreshProjects();
    } catch (error) {
      console.error("Failed to create project", error);
      alert("حدث خطأ أثناء إنشاء المشروع. تأكد من صحة البيانات.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <span className="inline-flex items-center gap-x-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 ring-1 ring-inset ring-emerald-600/20">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            نشط
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center gap-x-1.5 rounded-full bg-blue-50 dark:bg-blue-500/10 px-2 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-600/20">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            مكتمل
          </span>
        );
      case "on_hold":
        return (
          <span className="inline-flex items-center gap-x-1.5 rounded-full bg-amber-50 dark:bg-amber-500/10 px-2 py-1 text-xs font-medium text-amber-600 dark:text-amber-400 ring-1 ring-inset ring-amber-600/20">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            قيد الانتظار
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-600/20">
            {status}
          </span>
        );
    }
  };

  const filteredProjects = projects.filter((p) => 
    p.project_name?.toLowerCase().includes(searchQuery.toLowerCase())
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
            المشاريع
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            إدارة مشاريع شركتك والميزانيات والجداول الزمنية.
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
              placeholder="ابحث عن المشاريع..."
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
            مشروع جديد
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-48 rounded-2xl bg-gray-100 dark:bg-gray-800 animate-pulse border border-gray-200 dark:border-gray-700"></div>
          ))}
        </div>
      ) : filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white dark:bg-[#0f172a] shadow-sm ring-1 ring-gray-200 dark:ring-gray-800 transition-all hover:shadow-lg hover:ring-indigo-500 dark:hover:ring-indigo-400"
            >
              {/* Card top colorful border */}
              <div className={`h-2 w-full ${project.status === 'active' ? 'bg-emerald-500' : project.status === 'completed' ? 'bg-blue-500' : 'bg-amber-500'}`} />
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  {getStatusBadge(project.status)}
                  <div className="relative">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveMenuId(activeMenuId === project.id ? null : project.id);
                      }}
                      className="text-gray-400 hover:text-gray-500 p-1.5 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                    >
                      <MoreVertical className="h-5 w-5" />
                    </button>
                    
                    {/* Dropdown Menu */}
                    {activeMenuId === project.id && (
                      <div className="absolute left-0 top-full mt-1 w-48 rounded-xl bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black/5 dark:ring-white/10 z-10 py-1 overflow-hidden">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProject(project);
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
                            openEditModal(project);
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
                            handleDelete(project.id);
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
                
                <div>
                  <h3 className="text-lg font-semibold leading-6 text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    <button 
                      onClick={() => {
                        setSelectedProject(project);
                        setIsViewingDetails(true);
                      }}
                      className="text-right w-full"
                    >
                      {project.project_name}
                    </button>
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-gray-500 dark:text-gray-400 cursor-pointer" onClick={() => { setSelectedProject(project); setIsViewingDetails(true); }}>
                    {project.description || "لم يتم تقديم وصف. انقر لعرض المزيد من التفاصيل حول هذا المشروع."}
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-900/50 px-6 py-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <Wallet className="h-4 w-4" />
                  <span>${project.internal_budget?.toLocaleString() || '0'}</span>
                </div>
                <div className="flex items-center gap-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <CalendarDays className="h-4 w-4" />
                  <span>
                    {project.end_date ? format(new Date(project.end_date), 'yyyy-MM-dd') : 'لا يوجد تاريخ'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center bg-white dark:bg-[#0f172a] py-16 px-6 rounded-2xl border border-dashed border-gray-300 dark:border-gray-800">
          <Activity className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600" />
          <h3 className="mt-4 text-sm font-semibold text-gray-900 dark:text-white">لا توجد مشاريع</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">ابدأ بإنشاء مشروع جديد.</p>
          <div className="mt-6">
            <button
              type="button"
              onClick={() => setIsCreating(true)}
              className="inline-flex items-center rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <Plus className="-mr-0.5 ml-1.5 h-5 w-5" aria-hidden="true" />
              مشروع جديد
            </button>
          </div>
        </div>
      )}

      {/* Create Modal */}
      {isCreating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:p-0 backdrop-blur-sm transition-opacity">
          <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-[#0f172a] shadow-2xl sm:w-full sm:max-w-md w-full ring-1 ring-gray-200 dark:ring-gray-800 transform transition-all">
            <div className="px-6 py-6 border-b border-gray-100 dark:border-gray-800">
               <h3 className="text-xl font-bold text-gray-900 dark:text-white">إنشاء مشروع جديد</h3>
            </div>
            <form onSubmit={handleCreate}>
              <div className="px-6 py-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                    اسم المشروع
                  </label>
                  <input
                    type="text"
                    required
                    className="mt-2 block w-full rounded-md border-0 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-transparent"
                    value={newProject.project_name}
                    onChange={(e) => setNewProject({...newProject, project_name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                    الوصف
                  </label>
                  <textarea
                    rows={3}
                    className="mt-2 block w-full rounded-md border-0 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-transparent"
                    value={newProject.description}
                    onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                      الميزانية
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      className="mt-2 block w-full rounded-md border-0 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-transparent"
                      value={newProject.internal_budget}
                      onChange={(e) => setNewProject({...newProject, internal_budget: Number(e.target.value)})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                      الحالة
                    </label>
                    <select
                        className="mt-2 block w-full rounded-md border-0 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white dark:bg-[#0f172a]"
                        value={newProject.status}
                        onChange={(e) => setNewProject({...newProject, status: e.target.value})}
                      >
                        <option value="active">نشط</option>
                        <option value="completed">مكتمل</option>
                        <option value="on_hold">قيد الانتظار</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">تاريخ البدء</label>
                    <input
                      type="date"
                      className="mt-2 block w-full rounded-md border-0 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-transparent"
                      value={newProject.start_date}
                      onChange={(e) => setNewProject({...newProject, start_date: e.target.value})}
                    />
                  </div>
                  <div>
                     <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">تاريخ الانتهاء</label>
                    <input
                      type="date"
                      className="mt-2 block w-full rounded-md border-0 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-transparent"
                      value={newProject.end_date}
                      onChange={(e) => setNewProject({...newProject, end_date: e.target.value})}
                    />
                  </div>
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
                  {isSubmitting ? 'جاري الحفظ...' : 'إنشاء المشروع'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {isViewingDetails && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:p-0 backdrop-blur-sm transition-opacity">
          <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-[#0f172a] shadow-2xl sm:w-full sm:max-w-2xl w-full ring-1 ring-gray-200 dark:ring-gray-800 transform transition-all max-h-[90vh] flex flex-col">
            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-900/50">
               <div>
                 <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                    {selectedProject.project_name}
                    {getStatusBadge(selectedProject.status)}
                 </h3>
                 <p className="text-sm text-gray-500 mt-1">مشروع رقم #{selectedProject.id}</p>
               </div>
               <button onClick={() => setIsViewingDetails(false)} className="text-gray-400 hover:text-gray-500 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-full transition-colors shadow-sm ring-1 ring-gray-200 dark:ring-gray-700">
                  <X className="h-5 w-5" />
               </button>
            </div>
            <div className="px-6 py-6 space-y-6 overflow-y-auto flex-1">
               <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">الوصف</h4>
                  <p className="text-gray-900 dark:text-gray-200 whitespace-pre-wrap leading-relaxed bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
                     {selectedProject.description || "لا يوجد وصف محدد لهذا المشروع."}
                  </p>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
                     <div className="p-2.5 bg-indigo-50 dark:bg-indigo-500/10 rounded-lg text-indigo-600 dark:text-indigo-400">
                        <Wallet className="h-5 w-5" />
                     </div>
                     <div>
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">الميزانية الداخلية</p>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white text-right" dir="ltr">
                           ${selectedProject.internal_budget?.toLocaleString() || "0"}
                        </p>
                     </div>
                  </div>
                  
                  <div className="flex items-center gap-3 bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
                     <div className="p-2.5 bg-indigo-50 dark:bg-indigo-500/10 rounded-lg text-indigo-600 dark:text-indigo-400">
                        <CalendarDays className="h-5 w-5" />
                     </div>
                     <div>
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">تاريخ البدء - الانتهاء</p>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">
                           {selectedProject.start_date ? format(new Date(selectedProject.start_date), 'yyyy-MM-dd') : '---'}
                           {" إلى "}
                           {selectedProject.end_date ? format(new Date(selectedProject.end_date), 'yyyy-MM-dd') : '---'}
                        </p>
                     </div>
                  </div>
               </div>

            </div>
            <div className="bg-gray-50 dark:bg-gray-900/50 px-6 py-4 flex items-center justify-end gap-3 border-t border-gray-100 dark:border-gray-800">
              <button
                type="button"
                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setIsViewingDetails(false)}
              >
                إغلاق
              </button>
              <button
                type="button"
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500 shadow-sm transition-colors flex items-center gap-2"
                onClick={() => handleDelete(selectedProject.id)}
              >
                <Trash2 className="h-4 w-4" /> حذف
              </button>
              <button
                type="button"
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 shadow-sm transition-colors flex items-center gap-2"
                onClick={() => openEditModal(selectedProject)}
              >
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
               <h3 className="text-xl font-bold text-gray-900 dark:text-white">تعديل المشروع</h3>
            </div>
            <form onSubmit={handleUpdate}>
              <div className="px-6 py-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">اسم المشروع</label>
                  <input type="text" required className="mt-2 block w-full rounded-md border-0 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-transparent" value={editProject.project_name} onChange={(e) => setEditProject({...editProject, project_name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">الوصف</label>
                  <textarea rows={3} className="mt-2 block w-full rounded-md border-0 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-transparent" value={editProject.description} onChange={(e) => setEditProject({...editProject, description: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">الميزانية</label>
                    <input type="number" required min="0" className="mt-2 block w-full rounded-md border-0 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-transparent" value={editProject.internal_budget} onChange={(e) => setEditProject({...editProject, internal_budget: Number(e.target.value)})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">الحالة</label>
                    <select className="mt-2 block w-full rounded-md border-0 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white dark:bg-[#0f172a]" value={editProject.status} onChange={(e) => setEditProject({...editProject, status: e.target.value})}>
                      <option value="active">نشط</option>
                      <option value="completed">مكتمل</option>
                      <option value="on_hold">قيد الانتظار</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">تاريخ البدء</label>
                    <input type="date" className="mt-2 block w-full rounded-md border-0 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-transparent" value={editProject.start_date} onChange={(e) => setEditProject({...editProject, start_date: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">تاريخ الانتهاء</label>
                    <input type="date" className="mt-2 block w-full rounded-md border-0 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-transparent" value={editProject.end_date} onChange={(e) => setEditProject({...editProject, end_date: e.target.value})} />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900/50 px-6 py-4 flex items-center justify-end gap-3 border-t border-gray-100 dark:border-gray-800">
                <button type="button" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" onClick={() => setIsEditing(false)}>إلغاء</button>
                <button type="submit" disabled={isSubmitting} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 shadow-sm transition-colors disabled:opacity-50 flex items-center">{isSubmitting ? 'جاري الحفظ...' : 'حفظ التغييرات'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
