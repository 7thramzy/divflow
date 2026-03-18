"use client";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface Props {
  currentPage: number;
  lastPage: number;
  total: number;
  perPage: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
}

export function Pagination({ currentPage, lastPage, total, perPage, onPageChange, onPerPageChange }: Props) {
  const from = total === 0 ? 0 : (currentPage - 1) * perPage + 1;
  const to = Math.min(currentPage * perPage, total);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-gray-200 dark:border-gray-800">
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <span>عرض</span>
        <select
          value={perPage}
          onChange={e => onPerPageChange(Number(e.target.value))}
          className="select-base w-16 py-1 text-xs"
          aria-label="عدد العناصر في الصفحة"
        >
          {[10, 20, 50].map(n => <option key={n} value={n}>{n}</option>)}
        </select>
        <span>من أصل <span dir="ltr">{total}</span> نتيجة</span>
        {total > 0 && <span>(<span dir="ltr">{from}–{to}</span>)</span>}
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          aria-label="الصفحة السابقة"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
        {Array.from({ length: Math.min(lastPage, 5) }, (_, i) => {
          let page = i + 1;
          if (lastPage > 5) {
            if (currentPage <= 3) page = i + 1;
            else if (currentPage >= lastPage - 2) page = lastPage - 4 + i;
            else page = currentPage - 2 + i;
          }
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                page === currentPage
                  ? 'bg-primary text-white'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'
              }`}
            >
              {page}
            </button>
          );
        })}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= lastPage}
          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          aria-label="الصفحة التالية"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
