"use client";

import {
  useEffect, useState, useCallback, Suspense, useMemo, useRef,
} from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { api, apiGet, apiPost, apiDelete } from "@/lib/api";
import { InternalNote, Project, Task } from "@/lib/types";
import { getStatusBadge, cn } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Modal } from "@/components/ui/Modal";
import {
  Plus, Search, Pin, MessageSquare, AlertCircle, X,
  Trash2, RefreshCcw, Files, Send, ChevronDown,
  Calendar, FolderKanban, CheckSquare, User as UserIcon,
  Download, ExternalLink,
} from "lucide-react";
import { format } from "date-fns";
import MediaUploader from "@/components/MediaUploader";
import { MediaItem } from "@/lib/types";

// ─── helpers ────────────────────────────────────────────────────────────────

const IMPORTANCE_LABELS: Record<string, string> = {
  critical: "حرج",
  high: "عالي",
  normal: "عادي",
  low: "منخفض",
};

function importanceBadge(level: string) {
  return { 
    classes: getStatusBadge(level), 
    label: IMPORTANCE_LABELS[level] ?? level 
  };
}

function fileIcon(mime: string) {
  if (mime.startsWith("image/")) return "🖼️";
  if (mime === "application/pdf") return "📄";
  if (mime.includes("word")) return "📝";
  if (mime.includes("sheet") || mime.includes("excel")) return "📊";
  return "📎";
}

// ─── NoteCard ───────────────────────────────────────────────────────────────

function NoteCard({
  note,
  onClick,
  onPinToggle,
}: {
  note: InternalNote;
  onClick: () => void;
  onPinToggle: (id: number, e: React.MouseEvent) => void;
}) {
  const imp = importanceBadge(note.importance_level);
  return (
    <div
      onClick={onClick}
      className="card p-4 flex flex-col gap-3 cursor-pointer hover:ring-2 hover:ring-primary/30 transition-all group"
    >
      {/* top row */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {!note.read_at && (
            <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_rgba(59,130,246,0.5)]" title="ملاحظة غير مقروءة"></span>
          )}
          <span
            className={cn("badge text-[10px] py-0 px-2", imp.classes)}
          >
            {imp.label}
          </span>
        </div>
        <button
          onClick={(e) => onPinToggle(note.id, e)}
          title={note.is_pinned ? "إلغاء التثبيت" : "تثبيت"}
          className={`p-1 rounded-md transition-colors ${
            note.is_pinned
              ? "text-amber-500 bg-amber-50"
              : "text-gray-300 hover:text-gray-500 opacity-0 group-hover:opacity-100"
          }`}
        >
          <Pin className={`h-4 w-4 ${note.is_pinned ? "fill-current" : ""}`} />
        </button>
      </div>

      {/* title */}
      {note.title && (
        <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1 text-sm">
          {note.title}
        </h3>
      )}

      {/* content */}
      <p className="text-xs text-secondary line-clamp-3 flex-1 leading-relaxed">
        {note.content}
      </p>

      {/* footer */}
      <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-[10px] text-gray-400 flex-wrap">
          {note.project_id && (
            <span className="flex items-center gap-1">
              <FolderKanban className="h-3 w-3" />
              <span dir="ltr">#{note.project_id}</span>
            </span>
          )}
          {note.task_id && (
            <span className="flex items-center gap-1">
              <CheckSquare className="h-3 w-3" />
              <span dir="ltr">#{note.task_id}</span>
            </span>
          )}
          {note.created_at && (
            <span dir="ltr">{format(new Date(note.created_at), "MM/dd")}</span>
          )}
        </div>
        <div className="flex items-center gap-2 text-[10px] text-gray-400">
          {note.replies && note.replies.length > 0 && (
            <span className="flex items-center gap-1">
              <MessageSquare className="h-3 w-3" />
              {note.replies.length}
            </span>
          )}
          {note.media && note.media.length > 0 && (
            <span className="flex items-center gap-1">
              <Files className="h-3 w-3" />
              {note.media.length}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── NoteDrawer ─────────────────────────────────────────────────────────────

function NoteDrawer({
  note,
  onClose,
  onPinToggle,
  onDelete,
  onReplyAdded,
  onRead,
  onMediaChange,
}: {
  note: InternalNote;
  onClose: () => void;
  onPinToggle: (id: number, e: React.MouseEvent) => void;
  onDelete: (id: number) => void;
  onReplyAdded: (reply: InternalNote) => void;
  onRead: (id: number) => void;
  onMediaChange: (id: number, media: MediaItem[]) => void;
}) {
  const [replies, setReplies] = useState<InternalNote[]>(note.replies ?? []);
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const imp = importanceBadge(note.importance_level);

  // mark as read
  useEffect(() => {
    if (!note.read_at) {
      onRead(note.id);
    }
  }, [note.id, note.read_at, onRead]);

  // fetch replies
  useEffect(() => {
    const fetchReplies = async () => {
      try {
        const items = await apiGet<InternalNote[]>("/internal-notes", { params: { parent_id: note.id } });
        setReplies((items || []).filter((n) => n.parent_id === note.id));
      } catch (error) {
        console.error("Failed to fetch replies:", error);
      }
    };
    fetchReplies();
  }, [note.id]);

  // focus trap + Escape
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const focusable = panel.querySelectorAll<HTMLElement>(
      'button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])'
    );
    focusable[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey ? document.activeElement === first : document.activeElement === last) {
          e.preventDefault();
          (e.shiftKey ? last : first)?.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const sendReply = async () => {
    if (!replyText.trim()) return;
    setSending(true);
    try {
      const newReply = await apiPost<InternalNote>("/internal-notes", {
        content: replyText,
        parent_id: note.id,
        project_id: note.project_id,
        task_id: note.task_id,
        importance_level: "normal",
        is_pinned: false,
      });
      setReplies((prev) => [...prev, newReply]);
      onReplyAdded(newReply);
      setReplyText("");
    } catch (error: unknown) {
      const err = error as { message?: string };
      alert(err.message || "تعذر إرسال الرد");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <div className="drawer-overlay" onClick={onClose} aria-hidden="true" />
      <div
        ref={panelRef}
        className="drawer-panel"
        role="dialog"
        aria-modal="true"
        aria-label="تفاصيل الملاحظة"
      >
        {/* header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-800 shrink-0 bg-gray-50/60 dark:bg-gray-900/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <MessageSquare className="h-4 w-4" />
            </div>
            <h2 className="text-base font-bold text-gray-900 dark:text-white">
              تفاصيل الملاحظة
            </h2>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={(e) => onPinToggle(note.id, e)}
              title={note.is_pinned ? "إلغاء التثبيت" : "تثبيت"}
              className={`p-1.5 rounded-lg transition-colors ${
                note.is_pinned
                  ? "text-amber-500 bg-amber-50"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400"
              }`}
            >
              <Pin className={`h-4 w-4 ${note.is_pinned ? "fill-current" : ""}`} />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400"
              aria-label="إغلاق"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* meta */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span
              className={cn("badge", imp.classes)}
            >
              {imp.label}
            </span>
            {note.created_at && (
              <span className="text-xs text-secondary flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span dir="ltr">{format(new Date(note.created_at), "yyyy-MM-dd HH:mm")}</span>
              </span>
            )}
          </div>

          {/* title + content */}
          {note.title && (
            <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-snug">
              {note.title}
            </h3>
          )}
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
            {note.content}
          </p>

          {/* project / task links */}
          <div className="grid grid-cols-2 gap-3">
            {note.project_id && (
              <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
                <p className="text-[10px] text-secondary mb-1">المشروع</p>
                <a
                  href={`/dashboard/projects/${note.project_id}`}
                  className="text-sm font-semibold text-primary flex items-center gap-1 hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FolderKanban className="h-3 w-3" />
                  <span dir="ltr">#{note.project_id}</span>
                  <ExternalLink className="h-3 w-3 opacity-50" />
                </a>
              </div>
            )}
            {note.task_id && (
              <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
                <p className="text-[10px] text-secondary mb-1">المهمة</p>
                <a
                  href={`/dashboard/tasks/${note.task_id}`}
                  className="text-sm font-semibold text-primary flex items-center gap-1 hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  <CheckSquare className="h-3 w-3" />
                  <span dir="ltr">#{note.task_id}</span>
                  <ExternalLink className="h-3 w-3 opacity-50" />
                </a>
              </div>
            )}
          </div>

          {/* author */}
          {note.user && (
            <div className="flex items-center gap-2 text-sm text-secondary">
              <UserIcon className="h-4 w-4" />
              <span>بواسطة: <span className="font-medium text-gray-800 dark:text-gray-200">{note.user.name}</span></span>
            </div>
          )}

          {/* mentions */}
          {note.mentions && note.mentions.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-secondary uppercase tracking-wider mb-2">
                الإشارات ({note.mentions.length})
              </p>
              <div className="flex flex-wrap gap-2">
                {note.mentions.map((m, i) => (
                  <span
                    key={i}
                    className="badge text-xs bg-primary-light text-primary border-primary-light"
                  >
                    {typeof m === "object" ? m.name : `مستخدم #${m}`}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* attachments */}
          <div className="space-y-3">
            <p className="text-xs font-semibold text-secondary uppercase tracking-wider">
              المرفقات ({note.media?.length ?? 0})
            </p>
            <MediaUploader
              modelType="internal-notes"
              modelId={note.id}
              media={note.media || []}
              onMediaChange={(newMedia) => onMediaChange(note.id, newMedia)}
            />
          </div>

          {/* replies thread */}
          <div>
            <p className="text-xs font-semibold text-secondary uppercase tracking-wider mb-3">
              الردود ({replies.length})
            </p>
            {replies.length === 0 ? (
              <p className="text-xs text-secondary text-center py-4">لا توجد ردود بعد</p>
            ) : (
              <div className="space-y-3">
                {replies
                  .slice()
                  .sort((a, b) =>
                    new Date(a.created_at ?? 0).getTime() -
                    new Date(b.created_at ?? 0).getTime()
                  )
                  .map((reply) => (
                    <div
                      key={reply.id}
                      className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                          {reply.user?.name ?? "مستخدم"}
                        </span>
                        {reply.created_at && (
                          <span className="text-[10px] text-secondary" dir="ltr">
                            {format(new Date(reply.created_at), "MM/dd HH:mm")}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-wrap">
                        {reply.content}
                      </p>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>

        {/* quick reply */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 space-y-3 shrink-0">
          <textarea
            rows={2}
            className="input-base resize-none text-sm"
            placeholder="اكتب ردًا..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) sendReply();
            }}
          />
          <div className="flex items-center justify-between gap-2">
            {confirmDelete ? (
              <>
                <span className="text-xs text-red-600">هل أنت متأكد من الحذف؟</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setConfirmDelete(false)}
                    className="btn-ghost text-xs py-1 px-3"
                  >
                    إلغاء
                  </button>
                  <button
                    onClick={() => onDelete(note.id)}
                    className="btn-primary bg-red-600 hover:bg-red-700 text-xs py-1 px-3"
                  >
                    حذف
                  </button>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => setConfirmDelete(true)}
                  className="btn-ghost text-red-600 hover:bg-red-50 hover:text-red-700 text-xs py-1 px-3 gap-1"
                >
                  <Trash2 className="h-3.5 w-3.5" /> حذف
                </button>
                <button
                  onClick={sendReply}
                  disabled={sending || !replyText.trim()}
                  className="btn-primary gap-2 text-sm"
                >
                  <Send className="h-4 w-4" />
                  {sending ? "جاري الإرسال..." : "إرسال"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// ─── SkeletonCards ───────────────────────────────────────────────────────────

function SkeletonCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="h-44 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse"
        />
      ))}
    </div>
  );
}

// ─── NotesPageInner ──────────────────────────────────────────────────────────

function NotesPageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [notes, setNotes] = useState<InternalNote[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [selectedNote, setSelectedNote] = useState<InternalNote | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [noteForm, setNoteForm] = useState({ title: "", content: "", importance_level: "normal", project_id: "", task_id: "", is_pinned: false });
  const [noteSubmitting, setNoteSubmitting] = useState(false);

  // URL filters
  const search = searchParams.get("search") ?? "";
  const projectId = searchParams.get("project_id") ?? "";
  const taskId = searchParams.get("task_id") ?? "";
  const importance = searchParams.get("importance") ?? "";
  const pinnedOnly = searchParams.get("pinned") === "1";

  const updateFilter = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([k, v]) => {
        if (v) params.set(k, v);
        else params.delete(k);
      });
      // reset task when project changes
      if ("project_id" in updates) params.delete("task_id");
      router.push(`?${params.toString()}`);
    },
    [searchParams, router]
  );

  const resetFilters = () => router.push("?");

  // fetch all notes (API has no server-side filters, we filter client-side)
  const fetchNotes = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const items = await apiGet<InternalNote[]>("/internal-notes");
      // only top-level notes (no parent)
      setNotes((items || []).filter((n) => !n.parent_id));
    } catch (error: unknown) {
      console.error("Failed to fetch notes:", error);
      setIsError(true);
      const err = error as { isNetworkError?: boolean; message?: string };
      if (err.isNetworkError) {
        alert(err.message || "فشل الاتصال بالخادم");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  // fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsRes = await apiGet<Project[]>("/projects", { params: { per_page: 200 } });
        setProjects(projectsRes || []);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };
    fetchProjects();
  }, []);

  // fetch tasks when project selected
  useEffect(() => {
    if (!projectId) { setTasks([]); return; }
    const fetchTasks = async () => {
      try {
        const tasksRes = await apiGet<Task[]>("/tasks", { params: { project_id: projectId, per_page: 200 } });
        setTasks(tasksRes || []);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };
    fetchTasks();
  }, [projectId]);

  // client-side filtering
  const filtered = useMemo(() => {
    return notes.filter((n) => {
      if (pinnedOnly && !n.is_pinned) return false;
      if (projectId && String(n.project_id) !== projectId) return false;
      if (taskId && String(n.task_id) !== taskId) return false;
      if (importance && n.importance_level !== importance) return false;
      if (search) {
        const q = search.toLowerCase();
        const inTitle = n.title?.toLowerCase().includes(q) ?? false;
        const inContent = n.content.toLowerCase().includes(q);
        if (!inTitle && !inContent) return false;
      }
      return true;
    });
  }, [notes, search, projectId, taskId, importance, pinnedOnly]);

  const pinned = useMemo(() => filtered.filter((n) => n.is_pinned), [filtered]);
  const regular = useMemo(() => filtered.filter((n) => !n.is_pinned), [filtered]);

  const hasFilters = search || projectId || taskId || importance || pinnedOnly;

  const handlePinToggle = async (noteId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const res = await apiPost<{ is_pinned: boolean }>(`/internal-notes/${noteId}/pin`);
      const newPinned = res.is_pinned;
      setNotes((prev) =>
        prev.map((n) => (n.id === noteId ? { ...n, is_pinned: newPinned } : n))
      );
      if (selectedNote?.id === noteId) {
        setSelectedNote((prev) => prev ? { ...prev, is_pinned: newPinned } : prev);
      }
    } catch (error: unknown) {
      const err = error as { message?: string };
      alert(err.message || "تعذر تغيير حالة التثبيت");
    }
  };

  const handleDelete = async (noteId: number) => {
    try {
      await apiDelete(`/internal-notes/${noteId}`);
      setNotes((prev) => prev.filter((n) => n.id !== noteId));
      setSelectedNote(null);
    } catch (error: unknown) {
      const err = error as { message?: string };
      alert(err.message || "تعذر حذف الملاحظة");
    }
  };

  const handleReplyAdded = (reply: InternalNote) => {
    // update reply count on parent card
    setNotes((prev) =>
      prev.map((n) =>
        n.id === reply.parent_id
          ? { ...n, replies: [...(n.replies ?? []), reply] }
          : n
      )
    );
  };

  const handleMarkAsRead = async (noteId: number) => {
    try {
      await apiPost(`/internal-notes/${noteId}/read`);
      const now = new Date().toISOString();
      setNotes((prev) =>
        prev.map((n) => (n.id === noteId ? { ...n, read_at: now } : n))
      );
      if (selectedNote?.id === noteId) {
        setSelectedNote((prev) => prev ? { ...prev, read_at: now } : prev);
      }
    } catch (error) {
      console.error("Failed to mark note as read:", error);
    }
  };

  const handleCreateNote = async (e: React.FormEvent) => {
    e.preventDefault();
    setNoteSubmitting(true);
    try {
      const newNote = await apiPost<InternalNote>("/internal-notes", {
        title: noteForm.title || null,
        content: noteForm.content,
        importance_level: noteForm.importance_level,
        project_id: noteForm.project_id ? Number(noteForm.project_id) : null,
        task_id: noteForm.task_id ? Number(noteForm.task_id) : null,
        is_pinned: noteForm.is_pinned,
      });
      if (!newNote.parent_id) setNotes(prev => [newNote, ...prev]);
      setCreateOpen(false);
      setNoteForm({ title: "", content: "", importance_level: "normal", project_id: "", task_id: "", is_pinned: false });
    } catch (error: unknown) {
      const err = error as { message?: string };
      alert(err.message || "تعذر إنشاء الملاحظة");
    } finally {
      setNoteSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            الملاحظات الداخلية
          </h2>
          <p className="mt-1 text-sm text-secondary">
            المنصة المركزية لتبادل الملاحظات والتنبيهات للفريق.
          </p>
        </div>
        <button className="btn-primary gap-1.5" onClick={() => setCreateOpen(true)}>
          <Plus className="h-4 w-4" /> ملاحظة جديدة
        </button>
      </div>

      {/* Filters */}
      <div className="card p-4 flex flex-col sm:flex-row gap-3 flex-wrap">
        {/* search */}
        <div className="relative flex-1 min-w-[180px]">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          <input
            className="input-base pr-9"
            placeholder="ابحث في العناوين والمحتوى..."
            value={search}
            onChange={(e) => updateFilter({ search: e.target.value })}
          />
        </div>

        {/* importance */}
        <select
          className="select-base sm:w-40"
          value={importance}
          onChange={(e) => updateFilter({ importance: e.target.value })}
        >
          <option value="">جميع المستويات</option>
          <option value="critical">حرج</option>
          <option value="high">عالي</option>
          <option value="normal">عادي</option>
          <option value="low">منخفض</option>
        </select>

        {/* project */}
        <select
          className="select-base sm:w-48"
          value={projectId}
          onChange={(e) => updateFilter({ project_id: e.target.value })}
        >
          <option value="">جميع المشاريع</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.project_name}
            </option>
          ))}
        </select>

        {/* task (cascading) */}
        <select
          className="select-base sm:w-44"
          value={taskId}
          onChange={(e) => updateFilter({ task_id: e.target.value })}
          disabled={!projectId}
        >
          <option value="">جميع المهام</option>
          {tasks.map((t) => (
            <option key={t.id} value={t.id}>
              {t.title}
            </option>
          ))}
        </select>

        {/* pinned toggle */}
        <button
          onClick={() => updateFilter({ pinned: pinnedOnly ? "" : "1" })}
          className={`btn-ghost gap-2 shrink-0 ${
            pinnedOnly ? "bg-amber-50 border-amber-200 text-amber-700" : ""
          }`}
        >
          <Pin className={`h-4 w-4 ${pinnedOnly ? "fill-current text-amber-500" : ""}`} />
          المثبتة فقط
        </button>

        {/* reset */}
        {hasFilters && (
          <button onClick={resetFilters} className="btn-ghost gap-1.5 shrink-0">
            <X className="h-4 w-4" /> مسح
          </button>
        )}
      </div>

      {/* Content */}
      {isLoading ? (
        <SkeletonCards />
      ) : isError ? (
        <div className="flex flex-col items-center gap-4 py-20">
          <AlertCircle className="h-10 w-10 text-red-400" />
          <p className="text-secondary">تعذر تحميل البيانات</p>
          <button onClick={fetchNotes} className="btn-primary gap-2">
            <RefreshCcw className="h-4 w-4" /> إعادة المحاولة
          </button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="card text-center py-20 border-dashed">
          <MessageSquare className="mx-auto h-12 w-12 text-gray-300" />
          <h3 className="mt-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
            لا توجد ملاحظات
          </h3>
          <p className="mt-1 text-xs text-secondary">
            لم يتم العثور على ملاحظات تطابق معايير البحث.
          </p>
          {hasFilters && (
            <button onClick={resetFilters} className="btn-ghost mt-4 mx-auto gap-1.5">
              <X className="h-4 w-4" /> مسح الفلاتر
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-8">
          {/* Pinned section */}
          {pinned.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Pin className="h-4 w-4 fill-amber-500 text-amber-500" />
                <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300">
                  مثبتة ({pinned.length})
                </h3>
              </div>
              <div
                className="rounded-2xl p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                style={{ backgroundColor: "var(--primary-light)" }}
              >
                {pinned.map((note) => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    onClick={() => setSelectedNote(note)}
                    onPinToggle={handlePinToggle}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Regular notes */}
          {regular.length > 0 && (
            <section>
              {pinned.length > 0 && (
                <div className="flex items-center gap-2 mb-4">
                  <MessageSquare className="h-4 w-4 text-gray-400" />
                  <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300">
                    الملاحظات ({regular.length})
                  </h3>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {regular.map((note) => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    onClick={() => setSelectedNote(note)}
                    onPinToggle={handlePinToggle}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      {/* Drawer */}
      {selectedNote && (
        <NoteDrawer
          note={selectedNote}
          onClose={() => setSelectedNote(null)}
          onPinToggle={handlePinToggle}
          onDelete={handleDelete}
          onReplyAdded={handleReplyAdded}
          onRead={handleMarkAsRead}
          onMediaChange={(id, media) => {
            setNotes(prev => prev.map(n => n.id === id ? { ...n, media } : n));
            if (selectedNote?.id === id) setSelectedNote(prev => prev ? { ...prev, media } : null);
          }}
        />
      )}

      {/* Create Note Modal */}
      <Modal open={createOpen} onClose={() => setCreateOpen(false)} title="ملاحظة جديدة">
        <form onSubmit={handleCreateNote} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">العنوان (اختياري)</label>
            <input className="input-base" value={noteForm.title} onChange={e => setNoteForm(f => ({ ...f, title: e.target.value }))} placeholder="عنوان الملاحظة" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">المحتوى *</label>
            <textarea required rows={4} className="input-base resize-none" value={noteForm.content} onChange={e => setNoteForm(f => ({ ...f, content: e.target.value }))} placeholder="محتوى الملاحظة..." />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">مستوى الأهمية</label>
              <select className="select-base" value={noteForm.importance_level} onChange={e => setNoteForm(f => ({ ...f, importance_level: e.target.value }))}>
                <option value="low">منخفض</option>
                <option value="normal">عادي</option>
                <option value="high">عالي</option>
                <option value="critical">حرج</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">المشروع</label>
              <select className="select-base" value={noteForm.project_id} onChange={e => setNoteForm(f => ({ ...f, project_id: e.target.value, task_id: "" }))}>
                <option value="">بدون مشروع</option>
                {projects.map(p => <option key={p.id} value={p.id}>{p.project_name}</option>)}
              </select>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 dark:text-gray-400">
              <input type="checkbox" checked={noteForm.is_pinned} onChange={e => setNoteForm(f => ({ ...f, is_pinned: e.target.checked }))} className="rounded" />
              تثبيت الملاحظة
            </label>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="submit" disabled={noteSubmitting} className="btn-primary">
              {noteSubmitting ? "جاري الحفظ..." : "إنشاء"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

// ─── Page export ─────────────────────────────────────────────────────────────

export default function NotesPage() {
  return (
    <Suspense
      fallback={
        <div className="h-96 flex items-center justify-center text-secondary animate-pulse">
          جاري التحميل...
        </div>
      }
    >
      <NotesPageInner />
    </Suspense>
  );
}
