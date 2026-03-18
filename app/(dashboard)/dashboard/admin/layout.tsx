"use client";

import { useAuthStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";
import { ShieldAlert } from "lucide-react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  const isAdmin = user?.roles?.includes("admin");

  useEffect(() => {
    if (user && !isAdmin) {
      // Not an admin, redirect to main dashboard
      const timer = setTimeout(() => {
        router.push("/dashboard");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [user, isAdmin, router]);

  if (!user) return null; // Wait for auth hydration

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6" dir="rtl">
        <div className="w-20 h-20 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center mb-6 animate-bounce">
          <ShieldAlert className="h-10 w-10 text-red-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">عذراً، لا تملك الصلاحية الكافية</h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-md">
          هذه الصفحة مخصصة لمدراء النظام فقط. سيتم تحويلك إلى لوحة التحكم الرئيسية خلال لحظات...
        </p>
        <button 
          onClick={() => router.push("/dashboard")}
          className="mt-8 btn-primary"
        >
          العودة للوحة التحكم الآن
        </button>
      </div>
    );
  }

  return <>{children}</>;
}
