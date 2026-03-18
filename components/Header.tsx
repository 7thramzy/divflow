"use client";

import { useEffect, useState, useRef } from "react";
import { useAuthStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import Link from "next/link";
import { InternalNote } from "@/lib/types";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { Menu, Bell, X, Pin, MessageSquare, User, LogOut } from "lucide-react";

export function Header() {
  const { user, logout, toggleSidebar, isSidebarOpen } = useAuthStore();
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notes, setNotes] = useState<InternalNote[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch notes when dropdown opens
  useEffect(() => {
    if (showNotifications) {
      setIsLoading(true);
      api.get("/internal-notes")
        .then((res) => {
          const data = res.data.data || res.data || [];
          setNotes(data.slice(0, 8));
        })
        .catch(() => setNotes([]))
        .finally(() => setIsLoading(false));
    }
  }, [showNotifications]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await api.post("/logout");
    } catch (error) {
      console.error("Logout error", error);
    } finally {
      logout();
      router.push("/login");
    }
  };

  const getImportanceColor = (level?: string) => {
    switch (level) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-primary';
      default: return 'bg-accent';
    }
  };

  const pinnedCount = notes.filter(n => n.is_pinned).length;

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center border-b border-border bg-bg/80 backdrop-blur-md px-4 sm:px-6 lg:px-8 shadow-sm">
      <button
        type="button"
        className="p-2 text-foreground lg:hidden"
        onClick={toggleSidebar}
      >
        <span className="sr-only">فتح القائمة الجانبية</span>
        <Menu className="h-6 w-6 text-primary" aria-hidden="true" />
      </button>

      <div className="flex flex-1 justify-end gap-x-4 self-stretch lg:gap-x-6">
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          
          {/* Notification Bell */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 text-text-muted hover:text-foreground relative transition-colors"
            >
              <span className="sr-only">عرض الإشعارات</span>
              <Bell className="h-5 w-5" aria-hidden="true" />
              {notes.length > 0 && (
                <span className="absolute top-2 left-2 h-2 w-2 rounded-full bg-primary ring-2 ring-bg animate-pulse" />
              )}
            </button>

            {/* Dropdown */}
            {showNotifications && (
              <div className="absolute left-0 top-full mt-3 w-80 sm:w-96 rounded-2xl bg-card shadow-2xl ring-1 ring-white/10 z-50 overflow-hidden border border-border">
                {/* Header */}
                <div className="px-5 py-4 border-b border-border flex items-center justify-between bg-bg/50">
                  <div>
                    <h3 className="text-sm font-bold text-foreground">الملاحظات الداخلية</h3>
                    <p className="text-[10px] text-text-muted mt-0.5">
                      {notes.length} ملاحظة {pinnedCount > 0 && `• ${pinnedCount} مثبتة`}
                    </p>
                  </div>
                  <button onClick={() => setShowNotifications(false)} className="p-1 rounded-lg text-text-muted hover:text-foreground hover:bg-input transition-colors">
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Notes List */}
                <div className="max-h-[400px] overflow-y-auto divide-y divide-border">
                  {isLoading ? (
                    <div className="p-6 text-center">
                      <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
                      <p className="text-[10px] text-text-muted mt-2">جاري التحميل...</p>
                    </div>
                  ) : notes.length > 0 ? (
                    notes.map((note) => (
                      <div key={note.id} className="px-5 py-4 hover:bg-input/50 transition-colors cursor-pointer group">
                        <div className="flex items-start gap-4">
                          <div className={`mt-1.5 h-2 w-2 rounded-full shrink-0 ${getImportanceColor(note.importance_level)}`} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <p className="text-sm font-bold text-foreground truncate group-hover:text-primary transition-colors">{note.title}</p>
                              {note.is_pinned && <Pin className="h-3 w-3 text-red-500 shrink-0" />}
                            </div>
                            <p className="text-xs text-text-muted mt-1 line-clamp-2 leading-relaxed">{note.content}</p>
                            <p className="text-[10px] text-text-muted mt-2 font-medium opacity-60">
                              {note.created_at ? format(new Date(note.created_at), 'dd MMM yyyy - HH:mm', { locale: ar }) : ''}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-10 text-center">
                      <MessageSquare className="h-10 w-10 text-border mx-auto mb-3" />
                      <p className="text-xs text-text-muted">لا توجد ملاحظات حالياً.</p>
                    </div>
                  )}
                </div>

                {/* Footer */}
                {notes.length > 0 && (
                  <div className="px-5 py-3 border-t border-border bg-bg/50">
                    <Link
                      href="/dashboard/notes"
                      onClick={() => setShowNotifications(false)}
                      className="block text-center text-xs font-bold text-primary hover:text-accent transition-all"
                    >
                      عرض جميع الملاحظات
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-border" aria-hidden="true" />

          <div className="flex items-center gap-x-4">
            <div className="hidden lg:flex lg:flex-col lg:items-end">
              <span className="text-sm font-bold leading-6 text-foreground" aria-hidden="true">
                {user?.name || "مدير النظام"}
              </span>
              <span className="text-[10px] uppercase tracking-wider font-medium leading-4 text-primary" aria-hidden="true">
                {user?.roles?.[0] || "مسؤول"}
              </span>
            </div>
            
            <div className="h-10 w-10 rounded-xl bg-primary/10 p-0.5 flex items-center justify-center border border-primary/20 shadow-inner">
              <User className="h-5 w-5 text-primary" />
            </div>

            <button
              onClick={handleLogout}
              className="mr-2 flex items-center p-2 text-text-muted rounded-xl hover:bg-red-500/10 hover:text-red-500 transition-all duration-200"
              title="تسجيل الخروج"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
