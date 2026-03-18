export interface MediaItem {
  id: number;
  name: string;
  file_name: string;
  mime_type: string;
  size: number;
  url: string;
}

export interface Customer {
  id: number;
  name: string;
  phone: string;
  secondary_phone?: string;
  email?: string;
  website?: string;
  country?: string;
  city?: string;
  address?: string;
  company?: string;
  source: string;
  type: string;
  tax_number?: string;
  tags?: string[];
  note?: string;
  created_at?: string;
  updated_at?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  default_hourly_rate?: number;
  roles: string[];
  created_at?: string;
  updated_at?: string;
}

export interface AssignedUser {
  id: number;
  name: string;
  email?: string;
  pivot?: {
    assigned_at?: string;
    change_reason?: string;
    is_active?: boolean;
  };
}

export interface PaymentStage {
  name: string;
  amount: number;
  status: 'pending' | 'paid';
}

export interface RequirementStudy {
  team_member: string;
  estimated_time: string;
  expenses: number;
}

export interface Milestone {
  id: number;
  project_id: number;
  name: string;
  description?: string;
  due_date?: string;
  status?: string;
}

export interface ProjectLink {
  name: string;
  url: string;
}

export interface Project {
  id: number;
  project_name: string;
  description: string;
  project_type_id: number;
  type?: string; // Human readable name
  features?: string;
  internal_budget: number;
  total_cost?: number;
  payment_stages?: PaymentStage[];
  requirements_study?: RequirementStudy[];
  requirements_study_text?: string;
  project_links?: ProjectLink[];
  customer_id?: number | null;
  customer?: Customer;
  start_date: string;
  end_date: string;
  status: 'pending' | 'in_progress' | 'completed' | 'on_hold';
  owner_id: number;
  owner?: User;
  media?: MediaItem[];
  project_images?: MediaItem[];
  created_at?: string;
  updated_at?: string;
}

export interface Task {
  id: number;
  project_id: number;
  milestone_id?: number;
  parent_task_id?: number;
  dependent_task_id?: number;
  title: string;
  description: string;
  priority: 'low' | 'normal' | 'high' | 'critical';
  status: 'pending' | 'in_progress' | 'completed' | 'on_hold';
  estimated_hours: number;
  task_weight: number;
  billing_type: 'hourly' | 'fixed' | 'non-billable';
  internal_price: number;
  sort_order?: number;
  is_deductible_if_late?: boolean;
  assigned_users: AssignedUser[];
  initial_note?: string;
  media?: MediaItem[];
  subtasks?: Task[];
  created_at?: string;
  updated_at?: string;
}

export interface TimeLog {
  id: number;
  task_id: number;
  task?: Task;
  user_id?: number;
  user?: User;
  actual_hours: number;
  work_date: string;
  comment?: string;
}

export interface InternalNote {
  id: number;
  project_id?: number;
  task_id?: number;
  parent_id?: number;
  title?: string;
  content: string;
  importance_level: 'low' | 'normal' | 'high' | 'critical';
  is_pinned: boolean;
  read_at?: string;
  mentions: (number | User)[];
  replies?: InternalNote[];
  media?: MediaItem[];
  created_at?: string;
  user?: User;
}

export interface InternalPayout {
  id: number;
  user_id: number;
  user?: User;
  task_id: number;
  task?: Task;
  amount_paid: number;
  type: 'payment' | 'deduction';
  status: 'pending' | 'paid' | 'cancelled';
  notes?: string;
  media?: MediaItem[];
  created_at?: string;
}

export interface DashboardStats {
  projects_count: number;
  tasks_count: number;
  customers_count: number;
  internal_notes_count: number;
  total_payouts: number;
  remaining_payouts: number;
}

export interface FinancialSummary {
  total_revenue: number;
  total_cost: number;
  gross_profit: number;
  net_profit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

