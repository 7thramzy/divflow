"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/lib/store";
import { 
  LayoutDashboard, 
  Users, 
  FolderKanban, 
  CheckSquare, 
  Clock, 
  MessageSquare, 
  CreditCard,
  History,
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  LogOut
} from "lucide-react";

const navigation = [
  { name: "لوحة التحكم", href: "/dashboard", icon: LayoutDashboard },
  { name: "العملاء", href: "/dashboard/customers", icon: Users },
  { name: "المشاريع", href: "/dashboard/projects", icon: FolderKanban },
  { name: "المهام", href: "/dashboard/tasks", icon: CheckSquare },
  { name: "سجلات الوقت", href: "/dashboard/time-logs", icon: Clock },
  { name: "الملاحظات", href: "/dashboard/notes", icon: MessageSquare },
  { name: "المدفوعات", href: "/dashboard/payouts", icon: CreditCard },
];

const adminNavigation = [
  { name: "الموظفون", href: "/dashboard/admin/users", icon: Users },
  { name: "سجل العمليات", href: "/dashboard/admin/logs", icon: History },
];

export function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const isSidebarOpen = useAuthStore((state) => state.isSidebarOpen);
  const setSidebarOpen = useAuthStore((state) => state.setSidebarOpen) || (() => {});
  const { user, logout } = useAuthStore();
  
  const handleLogout = async () => {
    try {
      logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  const isAdmin = user?.roles?.includes("admin");
  const isPM = user?.roles?.includes("pm") || user?.roles?.includes("unit_manager");
  const isEmployee = user?.roles?.includes("employee");

  const filteredNavigation = navigation.filter(item => {
    if (isAdmin || isPM) return true;
    if (isEmployee) {
      return ["لوحة التحكم", "المهام", "سجلات الوقت", "الملاحظات"].includes(item.name);
    }
    return true;
  }).map(item => {
    if (isEmployee) {
      if (item.name === "المهام") return { ...item, name: "مهامي" };
      if (item.name === "سجلات الوقت") return { ...item, name: "سجلاتي" };
    }
    return item;
  });

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        setSidebarOpen(!isSidebarOpen);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSidebarOpen, setSidebarOpen]);

  const touchStartX = React.useRef<number | null>(null);
  const touchCurrentX = React.useRef<number | null>(null);
  const SWIPE_THRESHOLD = 70;

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchCurrentX.current = e.touches[0].clientX;
  };

  const onTouchEnd = () => {
    if (touchStartX.current !== null && touchCurrentX.current !== null) {
      const deltaX = touchCurrentX.current - touchStartX.current;
      if (deltaX > SWIPE_THRESHOLD && isSidebarOpen) {
        setSidebarOpen(false);
      } else if (deltaX < -SWIPE_THRESHOLD && !isSidebarOpen) {
        setSidebarOpen(true);
      }
    }
    touchStartX.current = null;
    touchCurrentX.current = null;
  };

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <>
      {isMobile && !isSidebarOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 right-4 z-50 p-3 rounded-xl bg-card shadow-2xl border border-border text-foreground hover:bg-input transition-colors duration-200"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6 text-primary" />
        </button>
      )}

      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md lg:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex h-full flex-col bg-card border-l border-border transition-all duration-300 ease-in-out transform lg:static lg:translate-x-0 shadow-2xl lg:shadow-none touch-pan-y",
          isSidebarOpen
            ? "w-72 translate-x-0"
            : "w-72 translate-x-full lg:w-20 lg:translate-x-0"
        )}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        role="navigation"
      >
        <div className={cn("flex h-16 shrink-0 items-center border-b border-border transition-all duration-300", isSidebarOpen ? "px-6 justify-between" : "px-0 justify-center")}>
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="h-10 w-10 shrink-0 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20 ring-1 ring-white/10">
              <span className="text-white font-bold text-xl leading-none">D</span>
            </div>
            {isSidebarOpen && (
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent whitespace-nowrap animate-in fade-in slide-in-from-right-2 duration-300">
                ديف فلو
              </span>
            )}
          </div>

          {(!isMobile || isSidebarOpen) && (
            <button
              type="button"
              onClick={toggleSidebar}
              className={cn("p-2 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 text-text-muted hover:text-foreground hover:bg-input focus:outline-none")}
            >
              {isSidebarOpen ? (isMobile ? <X className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />) : <ChevronLeft className="h-5 w-5" />}
            </button>
          )}
        </div>

        <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden pt-6 px-4">
          <nav className="flex-1 space-y-2">
            {filteredNavigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  title={!isSidebarOpen ? item.name : undefined}
                  onClick={() => { if (isMobile) setSidebarOpen(false); }}
                  className={cn(
                    "group flex items-center h-12 transition-all duration-300 relative rounded-xl my-1",
                    isSidebarOpen ? "px-4" : "justify-center",
                    isActive 
                      ? "bg-primary/10 text-primary font-bold shadow-sm" 
                      : "text-text-muted hover:bg-input hover:text-foreground"
                  )}
                >
                  <item.icon className={cn("h-5 w-5 shrink-0 transition-all duration-200 group-hover:scale-110", isActive ? "text-primary" : "text-text-muted group-hover:text-foreground")} />
                  {isSidebarOpen && <span className="mr-3 text-sm whitespace-nowrap animate-in fade-in slide-in-from-right-2 duration-300">{item.name}</span>}
                  {isActive && !isSidebarOpen && <div className="absolute right-0 w-1 h-6 bg-primary rounded-l-full shadow-[0_0_8px_rgba(255,117,15,0.5)]" />}
                </Link>
              );
            })}

            {isAdmin && (
              <div className="pt-4 mt-4 border-t border-border">
                {isSidebarOpen && <div className="px-4 mb-2 flex items-center gap-2 text-[10px] font-bold text-text-muted uppercase tracking-widest"><ShieldCheck className="h-3 w-3" /> الإدارة</div>}
                {adminNavigation.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      title={!isSidebarOpen ? item.name : undefined}
                      onClick={() => { if (isMobile) setSidebarOpen(false); }}
                      className={cn(
                        "group flex items-center h-11 transition-all duration-300 relative rounded-xl mt-1",
                        isSidebarOpen ? "px-4" : "justify-center",
                        isActive 
                          ? "bg-primary/10 text-primary font-bold" 
                          : "text-text-muted hover:bg-input hover:text-foreground"
                      )}
                    >
                      <item.icon className={cn("h-5 w-5 shrink-0 transition-all duration-200 group-hover:scale-110", isActive ? "text-primary" : "text-text-muted group-hover:text-foreground")} />
                      {isSidebarOpen && <span className="mr-3 text-sm whitespace-nowrap animate-in fade-in slide-in-from-right-2 duration-300">{item.name}</span>}
                      {isActive && !isSidebarOpen && <div className="absolute right-0 w-1 h-6 bg-primary rounded-l-full" />}
                    </Link>
                  );
                })}
              </div>
            )}
          </nav>
        </div>

        <div className="flex shrink-0 border-t border-border p-4">
          <div className="w-full bg-black/40 rounded-2xl p-4 border border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 shrink-0 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold border border-primary/20">{user?.name?.[0] || "A"}</div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-foreground truncate">{user?.name || "Admin User"}</p>
                <p className="text-[10px] text-text-muted truncate">{user?.email || "admin@divflow.com"}</p>
              </div>
            </div>
            <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-red-500 hover:bg-red-500/10 rounded-xl transition-all duration-200">
              <LogOut className="h-3.5 w-3.5" /> تسجيل الخروج
            </button>
          </div>
        </div>
      </div>
    </>
  );
}