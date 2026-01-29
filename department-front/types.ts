
export type ProgramType = 'TMT Basic' | 'TAT' | 'Get Funded' | 'Premium' | 'Premium Lite' | 'MOM';
export type PaymentStatus = 'Paid' | 'Pending' | 'Failed';
export type OnboardingStatus = 'Not Started' | 'In Progress' | 'Completed';

export interface Student {
  id: string;
  uuid: string;
  name: string;
  email: string;
  discord_handle?: string;
  program_id: number;
  program?: {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
  };
  paymentStatus: PaymentStatus;
  onboardingStatus: OnboardingStatus;
  discordRoleAssigned: boolean;
  joinedDate: string;
  dueDate: string;
  lastReminderSent?: string;
  timelineSteps: TimelineStep[];
  created_at?: string;
  updated_at?: string;
  // Legacy frontend properties for compatibility
  payment_status?: PaymentStatus;
  onboarding_status?: OnboardingStatus;
  discord_role_assigned?: boolean;
  joined_date?: string;
  due_date?: string;
  last_reminder_sent?: string;
}

export interface TimelineStep {
  id?: number;
  label: string;
  status: 'completed' | 'current' | 'pending' | 'failed';
  timestamp?: string;
  timestamp_label?: string;
  sort_order?: number;
}

export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'warning' | 'info' | 'error';
  time: string;
}

export interface DashboardStats {
  newPayments: number;
  studentsAutoLogged: number;
  pendingVerifications: number;
  failedAutomations: number;
}

// New Operations Types
export interface ResponseMetric {
  id: string;
  label: string;
  value: string;
  trend: 'improved' | 'dropped' | 'neutral';
  delta: string;
  isTime?: boolean;
}

export interface MessageVolume {
  today: number;
  week: number;
  trend: 'up' | 'down';
  isPeakSeason: boolean;
}

export interface InquiryTheme {
  category: string;
  description: string;
  icon?: string;
}

export interface Insight {
  id: string;
  text: string;
  type: 'alert' | 'info' | 'success';
}
