"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Project } from "@/lib/types";
import { 
  Plus, 
  Search, 
  CalendarDays, 
  Wallet,
  MoreVertical,
  Activity
} from "lucide-react";
import { format } from "date-fns";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get("/projects");
        // API might return data in a paginated format like response.data.data
        const items = response.data.data || response.data || [];
        setProjects(items);
      } catch (error) {
        console.error("Failed to fetch projects", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <span className="inline-flex items-center gap-x-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 ring-1 ring-inset ring-emerald-600/20">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            نشط
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center gap-x-1.5 rounded-full bg-blue-50 dark:bg-blue-500/10 px-2 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-600/20">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            مكتمل
          </span>
        );
      case "on_hold":
        return (
          <span className="inline-flex items-center gap-x-1.5 rounded-full bg-amber-50 dark:bg-amber-500/10 px-2 py-1 text-xs font-medium text-amber-600 dark:text-amber-400 ring-1 ring-inset ring-amber-600/20">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            قيد الانتظار
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-600/20">
            {status}
          </span>
        );
    }
  };

  const filteredProjects = projects.filter((p) => 
    p.project_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
            المشاريع
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            إدارة مشاريع شركتك والميزانيات والجداول الزمنية.
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
              placeholder="ابحث عن المشاريع..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all shadow-indigo-500/30"
          >
            <Plus className="-mr-0.5 ml-1.5 h-5 w-5" aria-hidden="true" />
            مشروع جديد
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-48 rounded-2xl bg-gray-100 dark:bg-gray-800 animate-pulse border border-gray-200 dark:border-gray-700"></div>
          ))}
        </div>
      ) : filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white dark:bg-[#0f172a] shadow-sm ring-1 ring-gray-200 dark:ring-gray-800 transition-all hover:shadow-lg hover:ring-indigo-500 dark:hover:ring-indigo-400"
            >
              {/* Card top colorful border */}
              <div className={`h-2 w-full ${project.status === 'active' ? 'bg-emerald-500' : project.status === 'completed' ? 'bg-blue-500' : 'bg-amber-500'}`} />
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  {getStatusBadge(project.status)}
                  <button className="text-gray-400 hover:text-gray-500 p-1.5 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold leading-6 text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    <a href={`/projects/${project.id}`}>
                      <span className="absolute inset-x-0 top-2 bottom-0" />
                      {project.project_name}
                    </a>
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
                    {project.description || "لم يتم تقديم وصف. انقر لعرض المزيد من التفاصيل حول هذا المشروع."}
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-900/50 px-6 py-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <Wallet className="h-4 w-4" />
                  <span>${project.internal_budget?.toLocaleString() || '0'}</span>
                </div>
                <div className="flex items-center gap-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <CalendarDays className="h-4 w-4" />
                  <span>
                    {project.end_date ? format(new Date(project.end_date), 'yyyy-MM-dd') : 'لا يوجد تاريخ'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center bg-white dark:bg-[#0f172a] py-16 px-6 rounded-2xl border border-dashed border-gray-300 dark:border-gray-800">
          <Activity className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600" />
          <h3 className="mt-4 text-sm font-semibold text-gray-900 dark:text-white">لا توجد مشاريع</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">ابدأ بإنشاء مشروع جديد.</p>
          <div className="mt-6">
            <button
              type="button"
              className="inline-flex items-center rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <Plus className="-mr-0.5 ml-1.5 h-5 w-5" aria-hidden="true" />
              مشروع جديد
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
