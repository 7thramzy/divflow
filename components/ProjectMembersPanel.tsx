"use client";

import { useState, useEffect, useCallback } from "react";
import { api, apiGet, apiPost, apiDelete } from "@/lib/api";
import { User } from "@/lib/types";
import { Plus, Trash2, X, RefreshCw, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectMember extends User {
  pivot?: {
    role: "manager" | "employee" | "client";
  };
}

export default function ProjectMembersPanel({ projectId }: { projectId: number }) {
  const [members, setMembers] = useState<ProjectMember[]>([]);
  const [availableUsers, setAvailableUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedRole, setSelectedRole] = useState("employee");
  const [submitting, setSubmitting] = useState(false);

  const fetchMembers = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await apiGet<ProjectMember[]>(`/projects/${projectId}/members`);
      setMembers(res || []);
    } catch (error) {
      console.error("Failed to fetch project members", error);
    } finally {
      setIsLoading(false);
    }
  }, [projectId]);

  const fetchUsers = useCallback(async () => {
    try {
      const res = await apiGet<User[]>("/admin/users", { params: { per_page: 200 } });
      setAvailableUsers(res || []);
    } catch (error) {
      console.error("Failed to fetch all users", error);
    }
  }, []);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const handleAddClick = () => {
    setIsAdding(true);
    if (availableUsers.length === 0) {
      fetchUsers();
    }
  };

  const handleAddMember = async () => {
    if (!selectedUserId || !selectedRole) return;
    setSubmitting(true);
    try {
      await apiPost(`/projects/${projectId}/members`, {
        user_id: Number(selectedUserId),
        role: selectedRole
      });
      setSelectedUserId("");
      setSelectedRole("employee");
      setIsAdding(false);
      fetchMembers();
    } catch (error: any) {
      console.error("Failed to add member", error);
      alert(error.response?.data?.message || "حدث خطأ أثناء إضافة العضو");
    } finally {
      setSubmitting(false);
    }
  };

  const handleRemoveMember = async (userId: number, userName: string) => {
    if (!confirm(`هل أنت متأكد من إزالة ${userName} من المشروع؟`)) return;
    try {
      await apiDelete(`/projects/${projectId}/members/${userId}`);
      fetchMembers();
    } catch (error: any) {
      console.error("Failed to remove member", error);
      alert(error.response?.data?.message || "حدث خطأ أثناء إزالة العضو");
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'manager': return 'مدير';
      case 'employee': return 'موظف';
      case 'client': return 'عميل';
      default: return role;
    }
  };

  if (isLoading) {
    return <div className="py-8 flex justify-center"><RefreshCw className="h-6 w-6 animate-spin text-primary" /></div>;
  }

  // Filter out users that are already members
  const memberIds = new Set(members.map(m => m.id));
  const addableUsers = availableUsers.filter(u => !memberIds.has(u.id));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300">أعضاء المشروع</h3>
        {!isAdding && (
          <button onClick={handleAddClick} className="btn-primary text-xs px-3 py-1.5 flex items-center gap-1">
            <Plus className="h-3.5 w-3.5" /> إضافة عضو
          </button>
        )}
      </div>

      {isAdding && (
        <div className="bg-white/5 border border-border p-4 rounded-xl space-y-3 animate-in fade-in slide-in-from-top-2">
          <div className="flex justify-between items-center mb-1">
             <span className="text-xs font-bold text-text-muted">إضافة مساهم جديد</span>
             <button onClick={() => setIsAdding(false)} className="text-gray-400 hover:text-white transition-colors"><X className="h-4 w-4" /></button>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <select className="select-base flex-1" value={selectedUserId} onChange={e => setSelectedUserId(e.target.value)}>
              <option value="">اختر المستخدم...</option>
              {addableUsers.map(u => (
                <option key={u.id} value={u.id}>{u.name} ({u.email})</option>
              ))}
            </select>
            <select className="select-base w-full sm:w-32" value={selectedRole} onChange={e => setSelectedRole(e.target.value)}>
              <option value="manager">مدير</option>
              <option value="employee">موظف</option>
              <option value="client">عميل</option>
            </select>
            <button 
              onClick={handleAddMember} 
              disabled={submitting || !selectedUserId} 
              className="btn-primary"
            >
              {submitting ? "جاري الحفظ..." : "إضافة"}
            </button>
          </div>
        </div>
      )}

      {members.length === 0 ? (
        <p className="text-center py-8 text-gray-400">لا يوجد أعضاء في هذا المشروع</p>
      ) : (
        <div className="divide-y divide-gray-100 dark:divide-gray-800 border border-t-0 border-x-0 border-b-0 border-transparent">
          {members.map(m => (
            <div key={m.id} className="flex items-center gap-3 py-3 group">
              <div className="h-9 w-9 rounded-full bg-primary-light dark:bg-primary-light/10 flex items-center justify-center text-primary dark:text-accent font-bold text-sm shrink-0">
                {m.name?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{m.name}</p>
                <p className="text-xs text-gray-400">{m.email}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="badge bg-primary-light text-primary dark:bg-primary-light/10 dark:text-accent border border-primary/20">
                  {getRoleLabel(m.pivot?.role || "employee")}
                </span>
                <button
                  onClick={() => handleRemoveMember(m.id, m.name)}
                  className="p-1.5 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors border border-transparent hover:border-red-500/20 md:opacity-0 md:group-hover:opacity-100"
                  title="إزالة العضو"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
