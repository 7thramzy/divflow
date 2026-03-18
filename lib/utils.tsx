import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ─── Status config ───────────────────────────────────────────────────────────

export function getStatusBadge(status: string): string {
  const map: Record<string, string> = {
    active:       'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    completed:    'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-primary',
    on_hold:      'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
    pending:      'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    in_progress:  'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    paid:         'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    cancelled:    'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    payment:      'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    deduction:    'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    low:          'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
    medium:       'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    high:         'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    critical:     'bg-red-200 text-red-800 dark:bg-red-900/50 dark:text-red-300 font-bold',
    active_user:  'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    inactive:     'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-500',
  }
  const classes = map[status] ?? 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
  return `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${classes}`
}

/** Returns shaded badge classes for user roles */
export function getRoleBadge(role: string): string {
  const map: Record<string, string> = {
    'admin':        'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    'unit_manager': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    'pm':           'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    'employee':     'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-primary',
  }
  const classes = map[role.toLowerCase()] ?? 'bg-gray-100 text-gray-600'
  return `inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${classes}`
}

/** Returns Arabic label for a status/priority/billing key */
export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    completed:    'مكتملة',
    in_progress:  'قيد التنفيذ',
    pending:      'قيد الانتظار',
    on_hold:      'موقوف',
    fixed:        'سعر ثابت',
    hourly:       'بالساعة',
    non_billable: 'غير مدفوع',
    payment:      'دفعة',
    deduction:    'خصم',
    paid:         'تم الدفع',
    cancelled:    'ملغي',
    high:         'عالية',
    medium:       'متوسطة',
    low:          'منخفضة',
    active:       'نشط',
    inactive:     'غير نشط',
  };
  return labels[status] ?? status
}

/** Returns a full JSX badge element */
export function StatusBadgeInline({ status }: { status: string }) {
  const label = getStatusLabel(status)
  const classes = getStatusBadge(status)
  
  return (
    <span className={classes}>
      {label}
    </span>
  )
}

export function getPriorityBadge(priority: string) {
  const label = getStatusLabel(priority)
  const classes = getStatusBadge(priority)
  
  return (
    <span className={classes}>
      {label}
    </span>
  )
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('ar-SA', {
    style: 'currency',
    currency: 'SAR',
    minimumFractionDigits: 0,
  }).format(amount)
}

export function formatHours(hours: number | undefined | null): string {
  if (hours == null) return "0 س"
  return `${hours.toLocaleString("en-US", { maximumFractionDigits: 1 })} س`
}

export function exportToCSV(data: Record<string, unknown>[], filename: string) {
  if (!data.length) return
  const headers = Object.keys(data[0])
  const rows = data.map(row =>
    headers.map(h => {
      const val = row[h]
      const str = val === null || val === undefined ? '' : String(val)
      return `"${str.replace(/"/g, '""')}"`
    }).join(',')
  )
  const csv = [headers.join(','), ...rows].join('\n')
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${filename}.csv`
  a.click()
  URL.revokeObjectURL(url)
}
