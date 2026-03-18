"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, Lock, Mail, KeyRound, CheckCircle2, ArrowRight } from "lucide-react";
import { api } from "@/lib/api";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1); // 1: Email, 2: OTP, 3: Reset, 4: Success
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await api.post("/forgot-password", { email });
      setStep(2);
    } catch (err: any) {
       setError(err.response?.data?.message || "فشل في إرسال الرمز. يرجى التحقق من البريد الإلكتروني.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await api.post("/verify-otp", { email, otp });
      setStep(3);
    } catch (err: any) {
      setError(err.response?.data?.message || "رمز التحقق غير صحيح أو منتهي الصلاحية.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      setError("كلمتا المرور غير متطابقتين.");
      return;
    }
    
    setIsLoading(true);
    setError("");

    try {
      await api.post("/reset-password", { 
        email, 
        otp, 
        password, 
        password_confirmation: passwordConfirmation 
      });
      setStep(4);
    } catch (err: any) {
      setError(err.response?.data?.message || "فشل في إعادة تعيين كلمة المرور. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[var(--background)] relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse pointer-events-none" />

      <div className="w-full max-w-md p-8 relative z-10">
        <div className="glass rounded-2xl shadow-xl p-8 border border-white/20 dark:border-white/10 relative overflow-hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
          
          <Link href="/login" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors mb-6">
            <ArrowRight className="h-4 w-4 ml-1" />
            العودة لتسجيل الدخول
          </Link>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {step === 1 && "استعادة كلمة المرور"}
              {step === 2 && "التحقق من الرمز"}
              {step === 3 && "كلمة مرور جديدة"}
              {step === 4 && "تمت العملية بنجاح"}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {step === 1 && "أدخل بريدك الإلكتروني وسنرسل لك رمز OTP لإعادة التعيين."}
              {step === 2 && `أدخل الرمز المكون من 6 أرقام المرسل إلى ${email}`}
              {step === 3 && "الرجاء إدخال كلمة المرور الجديدة وتأكيدها."}
              {step === 4 && "تم تغيير كلمة المرور الخاصة بك بنجاح. يمكنك الآن تسجيل الدخول."}
            </p>
          </div>

          <div className="space-y-5">
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 rounded-lg text-center animate-in fade-in slide-in-from-top-2">
                {error}
              </div>
            )}

            {step === 1 && (
              <form onSubmit={handleRequestOtp} className="space-y-5">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">البريد الإلكتروني</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                      <Mail className="h-4 w-4" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pr-10 pl-4 py-2 bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-gray-800 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all dark:text-white"
                      placeholder="admin@example.com"
                      dir="ltr"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center py-2.5 px-4 rounded-lg text-white bg-primary hover:bg-primary-hover transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
                >
                  {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : "إرسال الرمز"}
                </button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleVerifyOtp} className="space-y-5">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">رمز التحقق (OTP)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                      <KeyRound className="h-4 w-4" />
                    </div>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                      className="w-full pr-10 pl-4 py-2 text-center tracking-[0.2em] font-mono text-lg bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-gray-800 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all dark:text-white"
                      placeholder="000000"
                      dir="ltr"
                      maxLength={6}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center py-2.5 px-4 rounded-lg text-white bg-primary hover:bg-primary-hover transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
                >
                  {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : "تحقق من الرمز"}
                </button>
              </form>
            )}

            {step === 3 && (
              <form onSubmit={handleResetPassword} className="space-y-5">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">كلمة المرور الجديدة</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                      <Lock className="h-4 w-4" />
                    </div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full pr-10 pl-4 py-2 bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-gray-800 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all dark:text-white"
                      placeholder="••••••••"
                      dir="ltr"
                      minLength={8}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">تأكيد كلمة المرور</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                      <Lock className="h-4 w-4" />
                    </div>
                    <input
                      type="password"
                      value={passwordConfirmation}
                      onChange={(e) => setPasswordConfirmation(e.target.value)}
                      required
                      className="w-full pr-10 pl-4 py-2 bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-gray-800 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all dark:text-white"
                      placeholder="••••••••"
                      dir="ltr"
                      minLength={8}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center py-2.5 px-4 rounded-lg text-white bg-primary hover:bg-primary-hover transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
                >
                  {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : "تغيير كلمة المرور"}
                </button>
              </form>
            )}

            {step === 4 && (
              <div className="flex flex-col items-center justify-center py-4 space-y-6">
                <div className="h-16 w-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                  <CheckCircle2 className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                </div>
                <button
                  onClick={() => router.push("/login")}
                  className="w-full flex items-center justify-center py-2.5 px-4 rounded-lg text-white bg-primary hover:bg-primary-hover transition-all shadow-md"
                >
                  العودة لتسجيل الدخول
                </button>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}
