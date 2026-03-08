"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { InternalNote } from "@/lib/types";
import { 
  Plus, 
  Search, 
  Pin, 
  MessageSquare,
  AlertCircle,
  X,
  Trash2,
  PinOff
} from "lucide-react";

export default function NotesPage() {
  const [notes, setNotes] = useState<InternalNote[]>([]);
  const [projectsList, setProjectsList] = useState<any[]>([]);
  const [usersList, setUsersList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
    importance_level: "normal",
    project_id: "",
    is_pinned: false,
    mentions: [] as string[],
  });

  useEffect(() => {
    const fetchNotesAndProjects = async () => {
      try {
        const [notesRes, projRes, usersRes] = await Promise.all([
          api.get("/internal-notes"),
          api.get("/projects").catch(() => ({ data: { data: [] } })),
          api.get("/admin/users").catch(() => ({ data: { data: [] } }))
        ]);
        setNotes(notesRes.data.data || notesRes.data || []);
        
        const projs = projRes.data.data || projRes.data || [];
        setProjectsList(projs);
        if (projs.length > 0) {
           setNewNote(prev => ({ ...prev, project_id: projs[0].id.toString() }));
        }

        const users = usersRes.data.data || usersRes.data || [];
        setUsersList(users);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotesAndProjects();
  }, []);

  const refreshNotes = async () => {
    const response = await api.get("/internal-notes");
    setNotes(response.data.data || response.data || []);
  };

  const handlePinToggle = async (noteId: number) => {
    try {
      await api.post(`/internal-notes/${noteId}/pin`);
      await refreshNotes();
    } catch (error: any) {
      alert(error.response?.data?.message || "حدث خطأ أثناء تغيير حالة التثبيت.");
    }
  };

  const handleDelete = async (noteId: number) => {
    if (!confirm("هل أنت متأكد من حذف هذه الملاحظة؟")) return;
    try {
      await api.delete(`/internal-notes/${noteId}`);
      await refreshNotes();
    } catch (error: any) {
      alert(error.response?.data?.message || "حدث خطأ أثناء الحذف.");
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.project_id) {
       alert("الرجاء اختيار مشروع");
       return;
    }
    setIsSubmitting(true);
    try {
      const payload = {
        ...newNote,
        project_id: Number(newNote.project_id),
        mentions: newNote.mentions.map(id => Number(id))
      };
      await api.post("/internal-notes", payload);
      setIsCreating(false);
      setNewNote({
        title: "",
        content: "",
        importance_level: "normal",
        project_id: projectsList[0]?.id?.toString() || "",
        is_pinned: false,
        mentions: [],
      });
      await refreshNotes();
    } catch (error) {
      console.error("Failed to create note", error);
      alert("حدث خطأ أثناء الإنشاء. تأكد من صحة البيانات.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMentionToggle = (userId: string) => {
    setNewNote(prev => {
      const isSelected = prev.mentions.includes(userId);
      if (isSelected) {
        return { ...prev, mentions: prev.mentions.filter(id => id !== userId) };
      } else {
        return { ...prev, mentions: [...prev.mentions, userId] };
      }
    });
  };

  const getImportanceColor = (level: string) => {
    switch (level) {
      case "critical":
        return "bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-900/20 dark:text-red-400 dark:ring-red-500/20";
      case "high":
        return "bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-900/20 dark:text-amber-400 dark:ring-amber-500/20";
      case "low":
        return "bg-blue-50 text-blue-700 ring-blue-600/20 dark:bg-blue-900/20 dark:text-blue-400 dark:ring-blue-500/20";
      default:
        return "bg-gray-50 text-gray-600 ring-gray-500/10 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700/50";
    }
  };

  const getImportanceText = (level: string) => {
    switch(level) {
      case "critical": return "حرج";
      case "high": return "عالي";
      case "low": return "منخفض";
      default: return "عادي";
    }
  }

  const filteredNotes = notes.filter((n) => 
    n.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.content?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
            الملاحظات الداخلية
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            تواصل مع الفريق وشارك التحديثات الهامة.
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
              placeholder="ابحث في الملاحظات..."
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
            ملاحظة جديدة
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-48 rounded-2xl bg-gray-100 dark:bg-gray-800 animate-pulse border border-gray-200 dark:border-gray-700"></div>
          ))}
        </div>
      ) : filteredNotes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-[#fffcb1]/40 dark:bg-yellow-900/10 shadow-sm ring-1 ring-yellow-200 dark:ring-yellow-900/30 transition-all hover:shadow-md"
            >
              {note.is_pinned && (
                <div className="absolute top-4 left-4 text-red-500 animate-pulse">
                   <Pin className="h-5 w-5 fill-current" />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${getImportanceColor(note.importance_level)}`}>
                    {getImportanceText(note.importance_level)}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handlePinToggle(note.id)}
                      className={`p-1.5 rounded-md transition-colors ${
                        note.is_pinned 
                          ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30' 
                          : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-600'
                      }`}
                      title={note.is_pinned ? 'إلغاء التثبيت' : 'تثبيت'}
                    >
                      {note.is_pinned ? <PinOff className="h-4 w-4" /> : <Pin className="h-4 w-4" />}
                    </button>
                    <button
                      onClick={() => handleDelete(note.id)}
                      className="p-1.5 rounded-md text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                      title="حذف"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold leading-6 text-gray-900 dark:text-white mb-2 line-clamp-1">
                  {note.title}
                </h3>
                
                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-4 leading-relaxed">
                  {note.content}
                </p>
              </div>
              
              <div className="bg-yellow-100/30 dark:bg-yellow-900/20 px-6 py-4 border-t border-yellow-200/50 dark:border-yellow-900/50 flex items-center justify-between mt-4">
                <div className="flex items-center gap-x-2 text-sm text-gray-600 dark:text-gray-400">
                  {note.project_id && <span>مشروع #{note.project_id}</span>}
                  {note.task_id && <span>مهمة #{note.task_id}</span>}
                </div>
                {note.mentions && note.mentions.length > 0 && (
                  <div className="flex -space-x-2 space-x-reverse">
                    {note.mentions.map((mention: any, idx) => {
                      const initial = typeof mention === 'object' && mention !== null && mention.name 
                        ? mention.name.charAt(0).toUpperCase() 
                        : typeof mention === 'number' || typeof mention === 'string' 
                          ? `U${mention}` 
                          : 'U';
                      return (
                        <div key={idx} className="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-[#0f172a] bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-[10px] font-medium text-indigo-700 dark:text-indigo-400" title={typeof mention === 'object' ? mention.name : `User ${mention}`}>
                          {initial}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center bg-white dark:bg-[#0f172a] py-16 px-6 rounded-2xl border border-dashed border-gray-300 dark:border-gray-800">
          <MessageSquare className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600" />
          <h3 className="mt-4 text-sm font-semibold text-gray-900 dark:text-white">لا توجد ملاحظات</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">كن أول من يشارك ملاحظة مع الفريق.</p>
        </div>
      )}

      {/* Create Modal */}
      {isCreating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:p-0 backdrop-blur-sm transition-opacity">
          <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-[#0f172a] shadow-2xl sm:w-full sm:max-w-lg w-full ring-1 ring-gray-200 dark:ring-gray-800 transform transition-all">
            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
               <h3 className="text-xl font-bold text-gray-900 dark:text-white">إضافة ملاحظة جديدة</h3>
               <button onClick={() => setIsCreating(false)} className="text-gray-400 hover:text-gray-500">
                  <X className="h-5 w-5" />
               </button>
            </div>
            <form onSubmit={handleCreate}>
              <div className="px-6 py-4 space-y-4 max-h-[70vh] overflow-y-auto">
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                    المشروع ذو الصلة
                  </label>
                  <select
                    required
                    className="mt-1 block w-full rounded-md border-0 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white dark:bg-[#0f172a]"
                    value={newNote.project_id}
                    onChange={(e) => setNewNote({...newNote, project_id: e.target.value})}
                  >
                    <option value="" disabled>اختر مشروعاً</option>
                    {projectsList.map((p) => (
                      <option key={p.id} value={p.id}>{p.project_name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                    العنوان
                  </label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full rounded-md border-0 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-transparent"
                    value={newNote.title}
                    onChange={(e) => setNewNote({...newNote, title: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                    المحتوى
                  </label>
                  <textarea
                    rows={4}
                    required
                    className="mt-1 block w-full rounded-md border-0 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-transparent"
                    value={newNote.content}
                    onChange={(e) => setNewNote({...newNote, content: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                      مستوى الأهمية
                    </label>
                    <select
                        className="mt-1 block w-full rounded-md border-0 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white dark:bg-[#0f172a]"
                        value={newNote.importance_level}
                        onChange={(e) => setNewNote({...newNote, importance_level: e.target.value})}
                      >
                        <option value="low">منخفض</option>
                        <option value="normal">عادي</option>
                        <option value="high">عالي</option>
                        <option value="critical">حرج</option>
                    </select>
                  </div>
                  <div className="flex items-center mt-6">
                    <input
                      id="is_pinned"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 bg-transparent"
                      checked={newNote.is_pinned}
                      onChange={(e) => setNewNote({...newNote, is_pinned: e.target.checked})}
                    />
                    <label htmlFor="is_pinned" className="ml-2 block text-sm text-gray-900 dark:text-gray-200 mr-2">
                       تثبيت الملاحظة
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200 mb-2">
                    الإشارة للمستخدمين (Mentions)
                  </label>
                  {usersList.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 border border-gray-200 dark:border-gray-700 rounded-md p-3 max-h-40 overflow-y-auto">
                      {usersList.map((user) => (
                        <label key={user.id} className="flex items-center space-x-2 space-x-reverse cursor-pointer p-1.5 hover:bg-gray-50 dark:hover:bg-gray-800 rounded">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 bg-transparent"
                            checked={newNote.mentions.includes(user.id.toString())}
                            onChange={() => handleMentionToggle(user.id.toString())}
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
                        value={newNote.mentions.join(', ')}
                        onChange={(e) => setNewNote({...newNote, mentions: e.target.value.split(',').map(s => s.trim()).filter(Boolean)})}
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
                  {isSubmitting ? 'جاري الحفظ...' : 'حفظ الملاحظة'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
