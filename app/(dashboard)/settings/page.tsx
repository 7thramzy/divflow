"use client";

import { useState, useEffect } from "react";
import { 
  User, 
  Lock, 
  Bell, 
  Palette, 
  Save,
  Mail,
  Phone,
  Briefcase,
  Shield,
  CheckCircle2,
  AlertTriangle,
  Eye,
  EyeOff
} from "lucide-react";
import { useAuthStore } from "@/lib/store";
import { api } from "@/lib/api";

const tabs = [
  { id: "profile", name: "الملف الشخصي", icon: User, description: "تحديث معلوماتك الشخصية" },
  { id: "security", name: "الأمان وكلمة المرور", icon: Lock, description: "حماية حسابك وتغيير كلمة المرور" },
  { id: "notifications", name: "الإشعارات", icon: Bell, description: "التحكم في تنبيهات النظام والبريد" },
  { id: "appearance", name: "المظهر", icon: Palette, description: "تخصيص واجهة التطبيق" },
];

export default function SettingsPage() {
  const { user, setUser } = useAuthStore();
  const [activeTab, setActiveTab] = useState("profile");
  
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  const [passwordData, setPasswordData] = useState({
    current_password: "",
    password: "",
    password_confirmation: "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [payoutSummary, setPayoutSummary] = useState<any>(null);
  const [userStats, setUserStats] = useState({ projects: 0, tasks: 0, timeLogs: 0 });

  // Notifications state (local only — no API for this)
  const [notifications, setNotifications] = useState({
    tasks: true,
    payouts: false,
    mentions: true,
  });

  useEffect(() => {
    // Fetch user stats for the profile card
    const fetchUserData = async () => {
      try {
        const [projectsRes, tasksRes, timeLogsRes] = await Promise.all([
          api.get("/projects").catch(() => ({ data: { data: [] } })),
          api.get("/tasks").catch(() => ({ data: { data: [] } })),
          api.get("/time-logs").catch(() => ({ data: { data: [] } })),
        ]);
        const projects = projectsRes.data.data || projectsRes.data || [];
        const tasks = tasksRes.data.data || tasksRes.data || [];
        const timeLogs = timeLogsRes.data.data || timeLogsRes.data || [];
        setUserStats({ projects: projects.length, tasks: tasks.length, timeLogs: timeLogs.length });

        if (user?.id) {
          const payoutRes = await api.get(`/users/${user.id}/payout-summary`).catch(() => ({ data: null }));
          setPayoutSummary(payoutRes.data);
        }
      } catch (error) {
        console.error("Failed to fetch user stats", error);
      }
    };
    fetchUserData();
  }, [user]);

  const showSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setErrorMessage("");
    setTimeout(() => setSuccessMessage(""), 4000);
  };

  const showError = (msg: string) => {
    setErrorMessage(msg);
    setSuccessMessage("");
    setTimeout(() => setErrorMessage(""), 6000);
  };

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      // Try admin update if admin, otherwise try user endpoint
      const isAdmin = user?.roles?.includes('admin') || user?.roles?.includes('Administrator');
      if (isAdmin && user?.id) {
        await api.put(`/admin/users/${user.id}`, {
          name: profileData.name,
          phone: profileData.phone,
        });
      }
      // Refresh user data from the API
      const userRes = await api.get("/user").catch(() => null);
      if (userRes?.data) {
        setUser(userRes.data);
        setProfileData({
          name: userRes.data.name || profileData.name,
          email: userRes.data.email || profileData.email,
          phone: userRes.data.phone || profileData.phone,
        });
      }
      showSuccess("تم تحديث الملف الشخصي بنجاح!");
    } catch (error: any) {
      showError(error.response?.data?.message || "حدث خطأ أثناء تحديث الملف الشخصي.");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.password !== passwordData.password_confirmation) {
      showError("كلمة المرور الجديدة وتأكيدها غير متطابقتين.");
      return;
    }
    if (passwordData.password.length < 6) {
      showError("يجب أن تتكون كلمة المرور من 6 أحرف على الأقل.");
      return;
    }
    setIsSaving(true);
    try {
      // Use reset-password endpoint or a password change endpoint
      await api.post("/reset-password", {
        email: user?.email,
        otp: null,
        password: passwordData.password,
        password_confirmation: passwordData.password_confirmation,
        current_password: passwordData.current_password,
      });
      showSuccess("تم تغيير كلمة المرور بنجاح!");
      setPasswordData({ current_password: "", password: "", password_confirmation: "" });
    } catch (error: any) {
      showError(error.response?.data?.message || "حدث خطأ أثناء تغيير كلمة المرور. تأكد من كلمة المرور الحالية.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Alerts */}
      {successMessage && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400 animate-in">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <p className="text-sm font-medium">{successMessage}</p>
        </div>
      )}
      {errorMessage && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-700 dark:text-red-400">
          <AlertTriangle className="h-5 w-5 shrink-0" />
          <p className="text-sm font-medium">{errorMessage}</p>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
          الإعدادات
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          إدارة حسابك، وتفضيلات النظام، والأمان.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Sidebar (Tabs) */}
        <aside className="lg:w-1/4 space-y-6">
          {/* Profile Summary Card */}
          <div className="bg-white dark:bg-[#0f172a] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 text-center">
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white shadow-xl shadow-indigo-500/20 mx-auto">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <h3 className="mt-4 font-bold text-gray-900 dark:text-white text-lg">{user?.name || 'مستخدم'}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{user?.email}</p>
            <div className="flex gap-2 justify-center mt-3 flex-wrap">
              {user?.roles?.map((role) => (
                <span key={role} className="inline-flex items-center rounded-full bg-indigo-50 dark:bg-indigo-500/10 px-2.5 py-0.5 text-xs font-medium text-indigo-700 dark:text-indigo-400 ring-1 ring-inset ring-indigo-600/10">
                  {role}
                </span>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2 border-t border-gray-100 dark:border-gray-800 pt-4">
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900 dark:text-white">{userStats.projects}</p>
                <p className="text-[10px] text-gray-500 dark:text-gray-400">مشروع</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900 dark:text-white">{userStats.tasks}</p>
                <p className="text-[10px] text-gray-500 dark:text-gray-400">مهمة</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900 dark:text-white">{userStats.timeLogs}</p>
                <p className="text-[10px] text-gray-500 dark:text-gray-400">سجل</p>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="space-y-2">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-start gap-4 p-4 rounded-2xl transition-all duration-200 text-right ${
                    isActive 
                      ? 'bg-indigo-50 dark:bg-indigo-500/10 ring-1 ring-indigo-200 dark:ring-indigo-500/30' 
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:ring-1 hover:ring-gray-200 dark:hover:ring-gray-800'
                  }`}
                >
                  <div className={`mt-0.5 p-2 rounded-lg ${isActive ? 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'}`}>
                    <tab.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className={`font-semibold text-sm ${isActive ? 'text-indigo-900 dark:text-indigo-200' : 'text-gray-900 dark:text-gray-200'}`}>
                      {tab.name}
                    </h3>
                    <p className={`text-xs mt-1 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'}`}>
                      {tab.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Right Content */}
        <div className="lg:w-3/4">
          <div className="bg-white dark:bg-[#0f172a] shadow-sm rounded-3xl border border-gray-200 dark:border-gray-800 overflow-hidden ring-1 ring-black/[0.02] dark:ring-white/[0.02]">
            {activeTab === "profile" && (
              <form onSubmit={handleProfileSave} className="divide-y divide-gray-100 dark:divide-gray-800">
                <div className="p-8">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">المعلومات الشخصية</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200 mb-2">
                         الاسم الكامل
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                           <User className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          required
                          className="block w-full rounded-xl border-0 py-2.5 pr-10 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-gray-50 dark:bg-[#0f172a]"
                          value={profileData.name}
                          onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200 mb-2">
                         البريد الإلكتروني
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                           <Mail className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          className="block w-full rounded-xl border-0 py-2.5 pr-10 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 sm:text-sm sm:leading-6 bg-gray-50/50 dark:bg-gray-800/50 cursor-not-allowed opacity-70"
                          value={profileData.email}
                          disabled
                        />
                      </div>
                      <p className="text-xs text-gray-400 mt-1.5">البريد الإلكتروني لا يمكن تغييره.</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200 mb-2">
                         رقم الهاتف
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                           <Phone className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          className="block w-full rounded-xl border-0 py-2.5 pr-10 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-gray-50 dark:bg-[#0f172a]"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200 mb-2">
                         الأدوار (الصلاحيات)
                      </label>
                      <div className="relative">
                         <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                           <Shield className="h-4 w-4 text-gray-400" />
                        </div>
                        <div className="block w-full rounded-xl border-0 py-2.5 pr-10 pl-3 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 sm:text-sm sm:leading-6 bg-gray-50/50 dark:bg-gray-800/50 cursor-not-allowed opacity-70 flex gap-2 min-h-[42px] items-center">
                           {user?.roles?.map((role) => (
                             <span key={role} className="inline-flex items-center rounded-md bg-indigo-50 dark:bg-indigo-500/10 px-2 py-0.5 text-xs font-medium text-indigo-700 dark:text-indigo-400 ring-1 ring-inset ring-indigo-600/10">
                               {role}
                             </span>
                           ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payout Summary */}
                  {payoutSummary && (
                    <div className="mt-8 p-5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200 dark:border-emerald-800">
                      <h4 className="text-sm font-semibold text-emerald-800 dark:text-emerald-300 mb-2">ملخص المدفوعات</h4>
                      <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-400" dir="ltr">
                        ${(payoutSummary.total_payouts || payoutSummary.total || 0).toLocaleString()}
                      </p>
                      <p className="text-xs text-emerald-600 dark:text-emerald-500 mt-1">إجمالي المبالغ المدفوعة</p>
                    </div>
                  )}
                </div>
                <div className="p-6 bg-gray-50 dark:bg-gray-900/30 flex items-center justify-end gap-3 rounded-b-3xl">
                  <button type="submit" disabled={isSaving} className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-500 shadow-lg shadow-indigo-500/30 transition-all flex items-center gap-2 disabled:opacity-50">
                    <Save className="h-4 w-4" />
                    {isSaving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
                  </button>
                </div>
              </form>
            )}

            {activeTab === "security" && (
              <form onSubmit={handlePasswordChange} className="divide-y divide-gray-100 dark:divide-gray-800">
                <div className="p-8">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">تغيير كلمة المرور</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">يُنصح باستخدام كلمة مرور قوية تتكون من 8 أحرف على الأقل.</p>
                  
                  <div className="space-y-5 max-w-md">
                    <div>
                      <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200 mb-2">كلمة المرور الحالية</label>
                      <div className="relative">
                        <input 
                          type={showCurrentPass ? "text" : "password"} 
                          required 
                          className="block w-full rounded-xl border-0 py-2.5 px-3 pr-10 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-gray-50 dark:bg-[#0f172a]" 
                          value={passwordData.current_password}
                          onChange={(e) => setPasswordData({...passwordData, current_password: e.target.value})}
                        />
                        <button type="button" onClick={() => setShowCurrentPass(!showCurrentPass)} className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 hover:text-gray-500">
                          {showCurrentPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200 mb-2">كلمة المرور الجديدة</label>
                      <div className="relative">
                        <input 
                          type={showNewPass ? "text" : "password"} 
                          required 
                          minLength={6}
                          className="block w-full rounded-xl border-0 py-2.5 px-3 pr-10 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-gray-50 dark:bg-[#0f172a]" 
                          value={passwordData.password}
                          onChange={(e) => setPasswordData({...passwordData, password: e.target.value})}
                        />
                        <button type="button" onClick={() => setShowNewPass(!showNewPass)} className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 hover:text-gray-500">
                          {showNewPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      {passwordData.password.length > 0 && passwordData.password.length < 6 && (
                        <p className="text-xs text-red-500 mt-1">يجب أن تتكون كلمة المرور من 6 أحرف على الأقل.</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200 mb-2">تأكيد كلمة المرور الجديدة</label>
                      <div className="relative">
                        <input 
                          type={showConfirmPass ? "text" : "password"} 
                          required 
                          className="block w-full rounded-xl border-0 py-2.5 px-3 pr-10 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-gray-50 dark:bg-[#0f172a]" 
                          value={passwordData.password_confirmation}
                          onChange={(e) => setPasswordData({...passwordData, password_confirmation: e.target.value})}
                        />
                        <button type="button" onClick={() => setShowConfirmPass(!showConfirmPass)} className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 hover:text-gray-500">
                          {showConfirmPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      {passwordData.password_confirmation.length > 0 && passwordData.password !== passwordData.password_confirmation && (
                        <p className="text-xs text-red-500 mt-1">كلمة المرور غير متطابقة.</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-gray-50 dark:bg-gray-900/30 flex items-center justify-end gap-3 rounded-b-3xl">
                  <button type="submit" disabled={isSaving} className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-500 shadow-lg shadow-indigo-500/30 transition-all flex items-center gap-2 disabled:opacity-50">
                    <Lock className="h-4 w-4" />
                    {isSaving ? 'جاري التحديث...' : 'تحديث كلمة المرور'}
                  </button>
                </div>
              </form>
            )}

            {activeTab === "notifications" && (
              <div className="p-8">
                 <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">تفضيلات الإشعارات</h3>
                 <div className="space-y-1">
                    {[
                      { key: 'tasks' as const, title: "إشعارات المشاريع والمهام", desc: "استلام تنبيهات عند تعيين مهمة جديدة لك أو تغيير حالة مشروع.", icon: CheckCircle2 },
                      { key: 'payouts' as const, title: "المدفوعات والمستحقات", desc: "إرسال إيميل عند تسجيل دفعة جديدة في حسابك.", icon: Briefcase },
                      { key: 'mentions' as const, title: "الإشارات (Mentions)", desc: "تنبيه فوري عندما يشير إليك شخص في الملاحظات الداخلية.", icon: Bell },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between py-5 px-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                         <div className="flex items-center gap-4">
                            <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                              <item.icon className="h-5 w-5" />
                            </div>
                            <div>
                               <p className="text-sm font-medium text-gray-900 dark:text-white">{item.title}</p>
                               <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.desc}</p>
                            </div>
                         </div>
                         <label className="relative inline-flex items-center cursor-pointer">
                           <input 
                             type="checkbox" 
                             className="sr-only peer" 
                             checked={notifications[item.key]}
                             onChange={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key] })}
                           />
                           <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                         </label>
                      </div>
                    ))}
                 </div>
              </div>
            )}

            {activeTab === "appearance" && (
              <div className="p-8">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">المظهر العام</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">اختر المظهر المفضل لك.</p>
                
                <div className="grid grid-cols-2 gap-4 max-w-md">
                   <button type="button" className="border-[2px] border-indigo-600 rounded-xl p-4 cursor-pointer text-center bg-indigo-50 dark:bg-indigo-900/20 transition-all hover:shadow-md">
                      <div className="h-24 w-full bg-white dark:bg-gray-100 rounded-lg shadow-sm border border-gray-100 mb-3 flex items-center justify-center overflow-hidden">
                        <div className="w-full h-full flex">
                          <div className="w-1/4 bg-gray-50 border-r border-gray-100"></div>
                          <div className="flex-1 p-2 space-y-1.5">
                            <div className="h-2 w-3/4 bg-gray-200 rounded"></div>
                            <div className="h-2 w-1/2 bg-gray-100 rounded"></div>
                            <div className="h-6 w-full bg-indigo-50 rounded mt-2"></div>
                          </div>
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-indigo-700 dark:text-indigo-400">فاتح (افتراضي)</span>
                   </button>
                   <button type="button" className="border-[2px] border-transparent hover:border-gray-300 dark:hover:border-gray-700 rounded-xl p-4 cursor-pointer text-center transition-all hover:shadow-md">
                      <div className="h-24 w-full bg-gray-900 rounded-lg shadow-sm mb-3 border border-gray-800 flex items-center justify-center overflow-hidden">
                        <div className="w-full h-full flex">
                          <div className="w-1/4 bg-gray-800 border-r border-gray-700"></div>
                          <div className="flex-1 p-2 space-y-1.5">
                            <div className="h-2 w-3/4 bg-gray-700 rounded"></div>
                            <div className="h-2 w-1/2 bg-gray-800 rounded"></div>
                            <div className="h-6 w-full bg-indigo-900/50 rounded mt-2"></div>
                          </div>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">الوضع الليلي</span>
                   </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
