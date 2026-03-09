"use client";

import { useEffect, useState, useRef } from "react";
import { useAuthStore } from "@/lib/store";
import { LogOut, Bell, User as UserIcon, X, Pin, MessageSquare, Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import Link from "next/link";
import { InternalNote } from "@/lib/types";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

export function Header() {
  const { user, logout, toggleSidebar } = useAuthStore();
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
      case 'medium': return 'bg-amber-500';
      default: return 'bg-blue-500';
    }
  };

  const pinnedCount = notes.filter(n => n.is_pinned).length;

  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-md px-4 sm:gap-x-6 sm:px-6 lg:px-8">
      <button
        type="button"
        className="-m-2.5 p-2.5 text-gray-700 dark:text-gray-200 lg:hidden"
        onClick={toggleSidebar}
      >
        <span className="sr-only">فتح القائمة الجانبية</span>
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>

      <div className="flex flex-1 justify-end gap-x-4 self-stretch lg:gap-x-6">
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          
          {/* Notification Bell */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setShowNotifications(!showNotifications)}
              className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 relative transition-colors"
            >
              <span className="sr-only">عرض الإشعارات</span>
              <Bell className="h-5 w-5" aria-hidden="true" />
              {notes.length > 0 && (
                <span className="absolute top-1.5 left-2 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white dark:ring-[#0f172a] animate-pulse" />
              )}
            </button>

            {/* Dropdown */}
            {showNotifications && (
              <div className="absolute left-0 top-full mt-3 w-96 rounded-2xl bg-white dark:bg-[#0f172a] shadow-2xl ring-1 ring-black/5 dark:ring-white/10 z-50 overflow-hidden transform transition-all">
                {/* Header */}
                <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white">الملاحظات الداخلية</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {notes.length} ملاحظة {pinnedCount > 0 && `• ${pinnedCount} مثبتة`}
                    </p>
                  </div>
                  <button onClick={() => setShowNotifications(false)} className="p-1 rounded-lg text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Notes List */}
                <div className="max-h-[400px] overflow-y-auto divide-y divide-gray-50 dark:divide-gray-800/50">
                  {isLoading ? (
                    <div className="p-6 text-center">
                      <div className="animate-spin h-6 w-6 border-2 border-indigo-600 border-t-transparent rounded-full mx-auto"></div>
                      <p className="text-xs text-gray-400 mt-2">جاري التحميل...</p>
                    </div>
                  ) : notes.length > 0 ? (
                    notes.map((note) => (
                      <div key={note.id} className="px-5 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors cursor-pointer">
                        <div className="flex items-start gap-3">
                          <div className={`mt-1 h-2 w-2 rounded-full shrink-0 ${getImportanceColor(note.importance_level)}`} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{note.title}</p>
                              {note.is_pinned && <Pin className="h-3 w-3 text-red-500 shrink-0" />}
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">{note.content}</p>
                            <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1.5">
                              {note.created_at ? format(new Date(note.created_at), 'dd MMM yyyy - HH:mm', { locale: ar }) : ''}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center">
                      <MessageSquare className="h-8 w-8 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-500 dark:text-gray-400">لا توجد ملاحظات حالياً.</p>
                    </div>
                  )}
                </div>

                {/* Footer */}
                {notes.length > 0 && (
                  <div className="px-5 py-3 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30">
                    <Link
                      href="/dashboard/notes"
                      onClick={() => setShowNotifications(false)}
                      className="block text-center text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition-colors"
                    >
                      عرض جميع الملاحظات →
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200 dark:lg:bg-gray-800" aria-hidden="true" />

          <div className="flex items-center gap-x-4">
            <div className="hidden lg:flex lg:flex-col lg:items-end">
              <span className="text-sm font-medium leading-6 text-gray-900 dark:text-white" aria-hidden="true">
                {user?.name || "مدير النظام"}
              </span>
              <span className="text-xs leading-4 text-gray-500 dark:text-gray-400" aria-hidden="true">
                {user?.roles?.[0] || "مسؤول"}
              </span>
            </div>
            
            <div className="h-9 w-9 rounded-full bg-indigo-100 dark:bg-indigo-900/50 p-0.5 flex items-center justify-center border border-indigo-200 dark:border-indigo-800">
              <UserIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </div>

            <button
              onClick={handleLogout}
              className="mr-2 flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <LogOut className="h-4 w-4 ml-2" />
              تسجيل الخروج
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
