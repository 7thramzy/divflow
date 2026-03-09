"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Clock,
  MessageSquare,
  CreditCard,
  Settings,
  X,
  ChevronLeft,
  ChevronRight,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/lib/store";

const navigation = [
  { name: "لوحة التحكم", href: "/dashboard", icon: LayoutDashboard },
  { name: "المشاريع", href: "/dashboard/projects", icon: FolderKanban },
  { name: "المهام", href: "/dashboard/tasks", icon: CheckSquare },
  { name: "سجلات الوقت", href: "/dashboard/time-logs", icon: Clock },
  { name: "الملاحظات", href: "/dashboard/notes", icon: MessageSquare },
  { name: "المدفوعات", href: "/dashboard/payouts", icon: CreditCard },
];

export function Sidebar() {
  const pathname = usePathname();
  const isSidebarOpen = useAuthStore((state) => state.isSidebarOpen);
  const setSidebarOpen = useAuthStore((state) => state.setSidebarOpen) || (() => {});

  // Safe mobile detection with useEffect to avoid hydration mismatch
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Keyboard shortcut: Ctrl/Cmd + B
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

  // Touch swipe for mobile
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
      // RTL: swipe right (positive) = close, swipe left (negative) = open
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
      {/* Mobile menu button (visible when sidebar is closed on mobile) */}
      {isMobile && !isSidebarOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 right-4 z-50 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Open menu"
          title="Open sidebar (Ctrl+B)"
        >
          <Menu className="h-5 w-5" />
        </button>
      )}

      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm lg:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Edge Swipe Zone for Mobile (to open when closed) */}
      {!isSidebarOpen && isMobile && (
        <div
          className="fixed inset-y-0 right-0 z-40 w-8"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex h-full flex-col bg-white dark:bg-[#0f172a] border-l border-gray-200 dark:border-gray-800 transition-all duration-300 ease-in-out transform lg:static lg:translate-x-0 shadow-2xl lg:shadow-none touch-pan-y",
          isSidebarOpen
            ? "w-72 translate-x-0"
            : "w-72 translate-x-full lg:w-20 lg:translate-x-0"
        )}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        role="navigation"
        aria-label="Main sidebar"
      >
        {/* Header with Logo and Toggle Button */}
        <div
          className={cn(
            "flex h-16 shrink-0 items-center border-b border-gray-200 dark:border-gray-800 transition-all duration-300",
            isSidebarOpen ? "px-4 justify-between" : "px-0 justify-center"
          )}
        >
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="h-9 w-9 shrink-0 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 ring-2 ring-white/10 dark:ring-gray-800/50">
              <span className="text-white font-bold text-lg leading-none">D</span>
            </div>
            {isSidebarOpen && (
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 whitespace-nowrap animate-in fade-in slide-in-from-right-2 duration-300">
                ديف فلو
              </span>
            )}
          </div>

          {/* Toggle Button - adapts to state and screen */}
          {(!isMobile || isSidebarOpen) && ( // Hide on mobile when closed (already have menu button)
            <button
              type="button"
              onClick={toggleSidebar}
              className={cn(
                "p-2 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95",
                "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200",
                "hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
              )}
              aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
              title={`Toggle sidebar (Ctrl+B)`}
            >
              {isSidebarOpen ? (
                // When open: on mobile show X, on desktop show chevron to collapse
                isMobile ? (
                  <X className="h-5 w-5" />
                ) : (
                  <ChevronRight className="h-5 w-5" />
                )
              ) : (
                // When closed (desktop only, because on mobile we hide the button)
                <ChevronLeft className="h-5 w-5" />
              )}
            </button>
          )}
        </div>

        {/* Navigation Links */}
        <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden pt-6 px-3">
          <nav className="flex-1 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  title={!isSidebarOpen ? item.name : undefined}
                  onClick={() => {
                    if (isMobile) setSidebarOpen(false);
                  }}
                  className={cn(
                    "group flex items-center h-11 transition-all duration-300 relative rounded-xl",
                    isSidebarOpen ? "px-4" : "justify-center",
                    isActive
                      ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white"
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-5 w-5 shrink-0 transition-all duration-200 group-hover:scale-110",
                      isActive
                        ? "text-indigo-600 dark:text-indigo-400"
                        : "text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-200"
                    )}
                    aria-hidden="true"
                  />
                  {isSidebarOpen && (
                    <span className="mr-3 text-sm font-medium whitespace-nowrap animate-in fade-in slide-in-from-right-2 duration-300">
                      {item.name}
                    </span>
                  )}
                  {isActive && !isSidebarOpen && (
                    <div className="absolute right-0 w-1 h-6 bg-indigo-600 dark:bg-indigo-400 rounded-l-full" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer: Settings Link */}
        <div className="flex shrink-0 border-t border-gray-200 dark:border-gray-800 p-3">
          <Link
            href="/settings"
            title={!isSidebarOpen ? "الإعدادات" : undefined}
            onClick={() => {
              if (isMobile) setSidebarOpen(false);
            }}
            className={cn(
              "group flex items-center h-11 w-full transition-all duration-300 relative rounded-xl",
              isSidebarOpen ? "px-4" : "justify-center",
              pathname === "/settings"
                ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white"
            )}
          >
            <Settings
              className={cn(
                "h-5 w-5 transition-all duration-200 group-hover:scale-110",
                pathname === "/settings"
                  ? "text-gray-900 dark:text-white"
                  : "text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-200"
              )}
            />
            {isSidebarOpen && (
              <span className="mr-3 text-sm font-medium whitespace-nowrap animate-in fade-in slide-in-from-right-2 duration-300">
                الإعدادات
              </span>
            )}
            {pathname === "/settings" && !isSidebarOpen && (
              <div className="absolute right-0 w-1 h-6 bg-gray-600 dark:bg-gray-400 rounded-l-full" />
            )}
          </Link>
        </div>
      </div>
    </>
  );
}