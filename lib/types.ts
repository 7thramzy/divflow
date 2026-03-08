export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  default_hourly_rate?: number;
  roles: string[];
}

export interface Project {
  id: number;
  project_name: string;
  description: string;
  internal_budget: number;
  start_date: string;
  end_date: string;
  status: 'active' | 'completed' | 'on_hold';
  owner_id: number;
  created_at?: string;
  updated_at?: string;
}

export interface Task {
  id: number;
  project_id: number;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in_progress' | 'completed';
  estimated_hours: number;
  task_weight: number;
  billing_type: 'hourly' | 'fixed' | 'non-billable';
  internal_price: number;
  assigned_users: any[];
  initial_note?: string;
  created_at?: string;
  updated_at?: string;
}

export interface TimeLog {
  id: number;
  task_id: number;
  actual_hours: number;
  work_date: string;
  comment?: string;
}

export interface InternalNote {
  id: number;
  project_id?: number;
  task_id?: number;
  title: string;
  content: string;
  importance_level: 'low' | 'normal' | 'high' | 'critical';
  is_pinned: boolean;
  mentions: number[];
  created_at?: string;
}

export interface InternalPayout {
  id: number;
  user_id: number;
  task_id: number;
  amount_paid: number;
  notes?: string;
  created_at?: string;
}
