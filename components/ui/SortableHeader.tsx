"use client";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";

interface Props {
  label: string;
  field: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  onSort: (field: string) => void;
}

export function SortableHeader({ label, field, sortBy, sortOrder, onSort }: Props) {
  const active = sortBy === field;
  return (
    <button
      onClick={() => onSort(field)}
      className="flex items-center gap-1 font-semibold text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors group"
    >
      {label}
      <span className="text-gray-300 dark:text-gray-600 group-hover:text-gray-500">
        {active ? (
          sortOrder === 'asc' ? <ChevronUp className="h-3.5 w-3.5 text-primary dark:text-accent" /> : <ChevronDown className="h-3.5 w-3.5 text-primary dark:text-accent" />
        ) : (
          <ChevronsUpDown className="h-3.5 w-3.5" />
        )}
      </span>
    </button>
  );
}
