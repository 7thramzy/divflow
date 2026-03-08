"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Task } from "@/lib/types";
import { 
  Plus, 
  Search, 
  Clock, 
  AlertCircle,
  MoreHorizontal,
  FolderKanban,
  CheckCircle2,
  ListTodo,
  AlignLeft
} from "lucide-react";

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get("/tasks");
        const items = response.data.data || response.data || [];
        setTasks(items);
      } catch (error) {
        console.error("Failed to fetch tasks", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const getPriorityIconAndColor = (priority: string) => {
    switch (priority) {
      case "high":
        return { icon: AlertCircle, color: "text-red-500", bg: "bg-red-50 dark:bg-red-500/10" };
      case "medium":
        return { icon: AlertCircle, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-500/10" };
      case "low":
        return { icon: AlertCircle, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10" };
      default:
        return { icon: AlertCircle, color: "text-gray-500", bg: "bg-gray-50 dark:bg-gray-500/10" };
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <span className="inline-flex items-center gap-x-1.5 rounded-md bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 ring-1 ring-inset ring-emerald-600/20">
            <CheckCircle2 className="h-3.5 w-3.5" />
            مكتملة
          </span>
        );
      case "in_progress":
        return (
          <span className="inline-flex items-center gap-x-1.5 rounded-md bg-blue-50 dark:bg-blue-500/10 px-2 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-600/20">
            <ListTodo className="h-3.5 w-3.5" />
            قيد التنفيذ
          </span>
        );
      case "pending":
      default:
        return (
          <span className="inline-flex items-center gap-x-1.5 rounded-md bg-gray-100 dark:bg-gray-800 px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 ring-1 ring-inset ring-gray-600/20 dark:ring-gray-700">
            <AlignLeft className="h-3.5 w-3.5" />
            قيد الانتظار
          </span>
        );
    }
  };

  const filteredTasks = tasks.filter((t) => 
    t.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
            مهامي
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            تتبع وإدارة مهامك في جميع المشاريع.
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
              placeholder="ابحث عن المهام..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all shadow-indigo-500/30"
          >
            <Plus className="-mr-0.5 ml-1.5 h-5 w-5" aria-hidden="true" />
            مهمة جديدة
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-20 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse border border-gray-200 dark:border-gray-700"></div>
          ))}
        </div>
      ) : filteredTasks.length > 0 ? (
        <div className="bg-white dark:bg-[#0f172a] shadow-sm rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden divide-y divide-gray-100 dark:divide-gray-800">
          {filteredTasks.map((task) => {
            const priorityInfo = getPriorityIconAndColor(task.priority);
            const PriorityIcon = priorityInfo.icon;
            
            return (
              <div
                key={task.id}
                className="group flex flex-col sm:flex-row sm:items-center justify-between p-5 hover:bg-gray-50/80 dark:hover:bg-gray-800/30 transition-all gap-4"
              >
                <div className="flex items-start gap-4 flex-1">
                  <div className={`mt-0.5 p-2 rounded-lg ${priorityInfo.bg}`}>
                    <PriorityIcon className={`h-5 w-5 ${priorityInfo.color}`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-base font-medium text-gray-900 dark:text-white truncate">
                        {task.title}
                      </h4>
                      {getStatusBadge(task.status)}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 gap-4 mt-2">
                       <span className="flex items-center gap-1.5">
                         <FolderKanban className="h-4 w-4" /> مشروع #{task.project_id}
                       </span>
                       <span className="flex items-center gap-1.5">
                         <Clock className="h-4 w-4" /> {task.estimated_hours} ساعة مقدرة
                       </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-end gap-2 sm:mr-4 sm:flex-shrink-0">
                  <div className="flex space-x-reverse -space-x-2 ml-4">
                     {/* Dummy assigned users avatars */}
                    {task.assigned_users?.slice(0, 3).map((userId, idx) => (
                      <div key={idx} className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-[#0f172a] bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-xs font-medium text-indigo-700 dark:text-indigo-400">
                        U{userId}
                      </div>
                    ))}
                  </div>

                  <button className="text-gray-400 hover:text-gray-500 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center bg-white dark:bg-[#0f172a] py-16 px-6 rounded-2xl border border-dashed border-gray-300 dark:border-gray-800">
          <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-400/50" />
          <h3 className="mt-4 text-sm font-semibold text-gray-900 dark:text-white">كُل شيء مُنجز!</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">ليس لديك أي مهام مسندة إليك في الوقت الحالي.</p>
        </div>
      )}
    </div>
  );
}
