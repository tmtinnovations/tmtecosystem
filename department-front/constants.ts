
import { Student, Notification, DashboardStats, ResponseMetric, MessageVolume, InquiryTheme, Insight } from './types';

// Helper to generate dates relative to now
const getRelDate = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
};

export const MOCK_STUDENTS: Student[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex.j@example.com',
    program: 'Get Funded',
    paymentStatus: 'Paid',
    onboardingStatus: 'Completed',
    discordRoleAssigned: true,
    joinedDate: '2023-10-25',
    dueDate: getRelDate(15),
    lastReminderSent: '2023-11-01',
    timelineSteps: [
      { label: 'Payment Received', status: 'completed', timestamp: '10:00 AM' },
      { label: 'Auto Logged', status: 'completed', timestamp: '10:01 AM' },
      { label: 'Role Assigned', status: 'completed', timestamp: '10:02 AM' },
      { label: 'Student Notified', status: 'completed', timestamp: '10:02 AM' },
    ]
  },
  {
    id: '2',
    name: 'Sarah Williams',
    email: 'sarah.w@example.com',
    program: 'TAT',
    paymentStatus: 'Paid',
    onboardingStatus: 'In Progress',
    discordRoleAssigned: false,
    joinedDate: '2023-10-26',
    dueDate: getRelDate(3), // Near due
    lastReminderSent: getRelDate(-1), // Reminder sent yesterday
    timelineSteps: [
      { label: 'Payment Received', status: 'completed', timestamp: '09:15 AM' },
      { label: 'Auto Logged', status: 'completed', timestamp: '09:16 AM' },
      { label: 'Role Assigned', status: 'current', timestamp: 'Processing...' },
      { label: 'Student Notified', status: 'pending' },
    ]
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'm.brown@example.com',
    program: 'Premium',
    paymentStatus: 'Failed',
    onboardingStatus: 'Not Started',
    discordRoleAssigned: false,
    joinedDate: '2023-10-26',
    dueDate: getRelDate(0), // Due today
    timelineSteps: [
      { label: 'Payment Received', status: 'failed', timestamp: '11:30 AM' },
      { label: 'Auto Logged', status: 'pending' },
      { label: 'Role Assigned', status: 'pending' },
      { label: 'Student Notified', status: 'pending' },
    ]
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.d@example.com',
    program: 'TMT Basic',
    paymentStatus: 'Pending',
    onboardingStatus: 'Not Started',
    discordRoleAssigned: false,
    joinedDate: '2023-10-26',
    dueDate: getRelDate(-2), // Overdue
    timelineSteps: [
      { label: 'Payment Initiated', status: 'completed', timestamp: '12:45 PM' },
      { label: 'Payment Verified', status: 'current', timestamp: 'Verifying...' },
      { label: 'Auto Logged', status: 'pending' },
      { label: 'Role Assigned', status: 'pending' },
    ]
  },
  {
    id: '5',
    name: 'Chris Wilson',
    email: 'chris.w@example.com',
    program: 'Premium Lite',
    paymentStatus: 'Paid',
    onboardingStatus: 'Completed',
    discordRoleAssigned: true,
    joinedDate: '2023-10-24',
    dueDate: getRelDate(30),
    timelineSteps: [
      { label: 'Payment Received', status: 'completed', timestamp: 'Oct 24' },
      { label: 'Auto Logged', status: 'completed', timestamp: 'Oct 24' },
      { label: 'Role Assigned', status: 'completed', timestamp: 'Oct 24' },
      { label: 'Student Notified', status: 'completed', timestamp: 'Oct 24' },
    ]
  },
    {
    id: '6',
    name: 'Jessica Lee',
    email: 'j.lee@example.com',
    program: 'MOM',
    paymentStatus: 'Paid',
    onboardingStatus: 'In Progress',
    discordRoleAssigned: true,
    joinedDate: '2023-10-26',
    dueDate: getRelDate(6), // Near due
    timelineSteps: [
      { label: 'Payment Received', status: 'completed', timestamp: '01:20 PM' },
      { label: 'Auto Logged', status: 'completed', timestamp: '01:21 PM' },
      { label: 'Role Assigned', status: 'completed', timestamp: '01:22 PM' },
      { label: 'Student Notified', status: 'failed', timestamp: 'Email Bounce' },
    ]
  },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: '1', message: 'Reminder: 4 student payments near due (triggering auto-emails)', type: 'info', time: '5m ago' },
  { id: '2', message: 'Sarah Williams: 1-week reminder sent successfully', type: 'success', time: '10m ago' },
  { id: '3', message: '3 new students auto-added to the system', type: 'success', time: '15m ago' },
];

export const MOCK_STATS: DashboardStats = {
  newPayments: 24,
  studentsAutoLogged: 18,
  pendingVerifications: 5,
  failedAutomations: 1,
};

// New Operations Data
export const MOCK_OPERATIONS_DATA = {
  metrics: [
    { id: '1', label: 'FB Page Response Rate', value: '31.70%', trend: 'dropped', delta: '-56.09%' },
    { id: '2', label: 'FB Page Response Time', value: '3h 48m', trend: 'dropped', delta: '+1h 51m', isTime: true },
    { id: '3', label: 'FB Group/IG Resp. Rate', value: '0.00%', trend: 'dropped', delta: '-100%', isTime: false },
    { id: '4', label: 'FB Group/IG Resp. Time', value: '0m', trend: 'neutral', delta: '0', isTime: true },
  ] as ResponseMetric[],
  
  volume: {
    today: 492,
    week: 2002,
    trend: 'up',
    isPeakSeason: true
  } as MessageVolume,

  topInquiries: [
    { category: 'Get Funded next steps', description: 'Upon paying, what is the next step?', icon: '💬' },
    { category: 'Backtesting / TradingView', description: 'Is there free backtesting on Discord?', icon: '❓' },
    { category: 'Live session schedule', description: 'Where is the live session today?', icon: '📅' },
    { category: 'Promo inquiries', description: 'Can the Black Friday promo be extended?', icon: '🏷️' },
    { category: 'Discord onboarding', description: 'How do I change my server name?', icon: '🔧' },
    { category: 'International customers', description: 'Can I join from another country?', icon: '🌍' },
  ] as InquiryTheme[],

  insights: [
    { id: '1', text: 'Response rate drops due to high volume of new conversation threads.', type: 'alert' },
    { id: '2', text: 'Automated replies do NOT count as valid responses (Meta rule).', type: 'info' },
    { id: '3', text: 'Message overflow causes manual response delays.', type: 'alert' },
    { id: '4', text: 'Inquiries are longer and more technical this season.', type: 'info' },
    { id: '5', text: 'Human replies define the real response time metrics.', type: 'success' },
  ] as Insight[]
};
