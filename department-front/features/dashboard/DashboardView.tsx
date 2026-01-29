
import React, { useMemo } from 'react';
import { CreditCard, Users, Activity, AlertCircle, BarChart3, TrendingUp, TrendingDown, Database, FileText, UserCog, CheckCircle, Clock, XCircle, Shield, Bell, ArrowUpRight, Circle, Sparkles } from 'lucide-react';
import { Student, Notification } from '../../types';

interface DashboardViewProps {
  students: Student[];
  selectedStudent: Student | null;
  notifications: Notification[];
  onSelectStudent: (student: Student) => void;
}

const DiscordMark: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 245 240" className={className} fill="currentColor" aria-hidden>
    <path d="M104.4 103.9c-5.7 0-10.2 5-10.2 11.1 0 6.1 4.6 11.1 10.2 11.1 5.7 0 10.2-5 10.2-11.1.1-6.2-4.5-11.1-10.2-11.1zm36.2 0c-5.7 0-10.2 5-10.2 11.1 0 6.1 4.6 11.1 10.2 11.1 5.7 0 10.2-5 10.2-11.1 0-6.2-4.5-11.1-10.2-11.1z" />
    <path d="M189.5 20h-134C38.5 20 25 33.4 25 49.9v116.2c0 16.5 13.5 29.9 30.5 29.9h114.3l-5.3-18.5 12.8 11.8 12.1 11.1 21.6 19V49.9C211 33.4 197.5 20 180.5 20zm-35.4 124s-3.3-3.9-6-7.3c12-3.4 16.5-10.9 16.5-10.9-3.7 2.4-7.2 4.1-10.4 5.3-4.6 1.9-9 3.1-13.4 3.9-8.8 1.6-16.9 1.1-23.8-.1-5.2-1-9.6-2.3-13.3-3.9-2.1-.8-4.4-1.9-6.7-3.2-.3-.2-.6-.3-.9-.5-.2-.1-.3-.2-.4-.3-1.8-1-2.8-1.7-2.8-1.7s4.4 7.4 16 10.8c-2.7 3.4-6.1 7.5-6.1 7.5-20.2-.6-27.8-13.9-27.8-13.9 0-29.4 13.3-53.2 13.3-53.2 13.3-10 25.9-9.7 25.9-9.7l.9 1c-16.6 4.8-24.2 12-24.2 12s2 1.1 5.3 2.7c9.6 4.2 17.2 5.3 20.3 5.6.5.1 1 .1 1.5.1 5.4.7 11.6.9 18 .2 8.5-1 17.6-3.8 26.9-9.4 0 0-7.3-6.9-23-11.7l1.3-1.5s12.6-.3 25.9 9.7c0 0 13.3 23.8 13.3 53.2 0 .1-7.7 13.4-27.9 13.8z" />
  </svg>
);

const DashboardView: React.FC<DashboardViewProps> = ({ 
  students, 
  selectedStudent, 
  notifications, 
  onSelectStudent 
}) => {
  const stats = useMemo(() => {
    const paid = students.filter(s => s.paymentStatus === 'Paid');
    const pending = students.filter(s => s.paymentStatus === 'Pending');
    const failed = students.filter(s => s.paymentStatus === 'Failed');
    const onboardingComplete = students.filter(s => s.onboardingStatus === 'Completed');
    const onboardingInProgress = students.filter(s => s.onboardingStatus === 'In Progress');
    const onboardingNotStarted = students.filter(s => s.onboardingStatus === 'Not Started');
    const rolesAssigned = students.filter(s => s.discordRoleAssigned);
    
    return {
      revenue: paid.length * 497,
      population: students.length,
      paidCount: paid.length,
      pendingPayments: pending.length,
      failedPayments: failed.length,
      onboardingComplete: onboardingComplete.length,
      onboardingInProgress: onboardingInProgress.length,
      onboardingNotStarted: onboardingNotStarted.length,
      rolesAssigned: rolesAssigned.length,
      rolesUnassigned: students.length - rolesAssigned.length,
      completionRate: students.length > 0 ? Math.round((onboardingComplete.length / students.length) * 100) : 0,
      paymentRate: students.length > 0 ? Math.round((paid.length / students.length) * 100) : 0,
    };
  }, [students]);

  const recentStudents = useMemo(() => students.slice(0, 4), [students]);
  const criticalStudents = useMemo(() => 
    students.filter(s => s.paymentStatus === 'Failed' || s.onboardingStatus === 'Not Started').slice(0, 3),
  [students]);

  // Mini stat component
  const MiniStat = ({ icon: Icon, label, value, trend, color }: { icon: any, label: string, value: string | number, trend?: string, color: string }) => (
    <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/[0.06] hover:border-white/10 transition-all group">
      <div className={`w-11 h-11 rounded-xl ${color} flex items-center justify-center shrink-0`}>
        <Icon className="w-5 h-5 text-white/90" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">{label}</p>
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-semibold text-white leading-tight">{value}</span>
          {trend && <span className="text-xs text-emerald-400 font-semibold">{trend}</span>}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col min-h-0 p-6">
      <div className="max-w-[1600px] mx-auto w-full flex flex-col space-y-4">
        {/* Header Stats Row stays fixed within the main page scroll */}
        <div className="sticky top-0 z-40 -mx-1 px-1 pt-1 pb-4 bg-[#0b0f0e]/95 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-emerald-900/10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <MiniStat icon={CreditCard} label="Revenue" value={`$${stats.revenue.toLocaleString()}`} trend="+12%" color="bg-emerald-500/80" />
            <MiniStat icon={Users} label="Students" value={stats.population} color="bg-blue-500/80" />
            <MiniStat icon={Activity} label="In Pipeline" value={stats.pendingPayments + stats.onboardingNotStarted} color="bg-amber-500/80" />
            <MiniStat icon={AlertCircle} label="Issues" value={stats.failedPayments} color="bg-rose-500/80" />
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-12 gap-4">
          
          {/* Left Column - 8 cols */}
          <div className="col-span-12 lg:col-span-8 space-y-4">
            
            {/* Performance Chart */}
            <div className="bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm rounded-2xl p-6 border border-white/[0.06] shadow-2xl">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-base font-semibold text-white">Weekly Overview</h3>
                </div>
                <div className="flex items-center gap-5 text-xs">
                  <span className="flex items-center gap-2"><Circle className="w-2.5 h-2.5 fill-emerald-400 text-emerald-400" /> Revenue</span>
                  <span className="flex items-center gap-2 text-gray-500"><Circle className="w-2.5 h-2.5 fill-blue-400 text-blue-400" /> Enrollments</span>
                </div>
              </div>
              <div className="h-36 flex items-end gap-3 mb-4">
                {[
                  { day: 'Mon', r: 45, e: 30 },
                  { day: 'Tue', r: 62, e: 45 },
                  { day: 'Wed', r: 55, e: 38 },
                  { day: 'Thu', r: 80, e: 55 },
                  { day: 'Fri', r: 42, e: 28 },
                  { day: 'Sat', r: 68, e: 48 },
                  { day: 'Sun', r: 75, e: 52 },
                ].map(({ day, r, e }) => (
                  <div key={day} className="flex-1 flex flex-col items-center gap-1.5 group">
                    <div className="w-full flex items-end justify-center gap-1.5 h-28">
                      <div className="w-3.5 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-sm transition-all group-hover:from-emerald-500 group-hover:to-emerald-300" style={{ height: `${r}%` }} />
                      <div className="w-3.5 bg-gradient-to-t from-blue-600/60 to-blue-400/60 rounded-sm transition-all group-hover:from-blue-500 group-hover:to-blue-300" style={{ height: `${e}%` }} />
                    </div>
                    <span className="text-[11px] text-gray-500 group-hover:text-gray-300 transition-colors">{day}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex gap-6">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Avg Daily</p>
                    <p className="text-lg font-semibold text-white">$2,485</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Growth</p>
                    <p className="text-lg font-semibold text-emerald-400 flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4" /> 12.5%
                    </p>
                  </div>
                </div>
                <button className="text-xs text-gray-300 hover:text-white flex items-center gap-1.5 transition-colors">
                  View Details <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Middle Row - 2 columns */}
            <div className="grid grid-cols-2 gap-5">
              
              {/* Payment Breakdown */}
              <div className="bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm rounded-2xl p-5 border border-white/[0.06]">
                <div className="flex items-center gap-3 mb-4">
                  <CreditCard className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-sm font-semibold text-white">Payments</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="text-sm text-gray-300">Paid</span>
                    </div>
                    <span className="text-sm font-semibold text-white">{stats.paidCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-amber-400" />
                      <span className="text-sm text-gray-300">Pending</span>
                    </div>
                    <span className="text-sm font-semibold text-white">{stats.pendingPayments}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-rose-400" />
                      <span className="text-sm text-gray-300">Failed</span>
                    </div>
                    <span className="text-sm font-semibold text-white">{stats.failedPayments}</span>
                  </div>
                </div>
                <div className="mt-4 h-2 bg-white/5 rounded-full overflow-hidden flex">
                  <div className="bg-emerald-500 h-full" style={{ width: `${stats.paymentRate}%` }} />
                  <div className="bg-amber-500 h-full" style={{ width: `${students.length > 0 ? (stats.pendingPayments / students.length) * 100 : 0}%` }} />
                  <div className="bg-rose-500 h-full" style={{ width: `${students.length > 0 ? (stats.failedPayments / students.length) * 100 : 0}%` }} />
                </div>
                <p className="text-xs text-gray-400 mt-3">{stats.paymentRate}% collection rate</p>
              </div>

              {/* Onboarding Progress */}
              <div className="bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm rounded-2xl p-5 border border-white/[0.06]">
                <div className="flex items-center gap-3 mb-4">
                  <Activity className="w-5 h-5 text-purple-400" />
                  <h3 className="text-sm font-semibold text-white">Onboarding</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span className="text-sm text-gray-300">Complete</span>
                    </div>
                    <span className="text-sm font-semibold text-white">{stats.onboardingComplete}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-400" />
                      <span className="text-sm text-gray-300">In Progress</span>
                    </div>
                    <span className="text-sm font-semibold text-white">{stats.onboardingInProgress}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-300">Not Started</span>
                    </div>
                    <span className="text-sm font-semibold text-white">{stats.onboardingNotStarted}</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-500 to-purple-400 h-full" style={{ width: `${stats.completionRate}%` }} />
                  </div>
                  <span className="text-sm font-semibold text-purple-400">{stats.completionRate}%</span>
                </div>
              </div>
            </div>

            {/* Student Directory */}
            <div className="bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm rounded-2xl p-5 border border-white/[0.06]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Database className="w-5 h-5 text-blue-400" />
                  <h3 className="text-sm font-semibold text-white">Recent Students</h3>
                </div>
                <span className="text-xs text-gray-500">{students.length} total</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {recentStudents.length > 0 ? recentStudents.map(s => (
                  <div 
                    key={s.id} 
                    onClick={() => onSelectStudent(s)} 
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.05] hover:border-white/20 cursor-pointer transition-all group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500/30 to-blue-600/20 flex items-center justify-center text-blue-200 text-sm font-semibold shrink-0">
                      {s.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white truncate group-hover:text-blue-300 transition-colors">{s.name}</p>
                      <p className="text-xs text-gray-500 truncate">{s.program?.name || 'No Program'}</p>
                    </div>
                    <div className={`w-2 h-2 rounded-full shrink-0 ${
                      s.paymentStatus === 'Paid' ? 'bg-emerald-400' :
                      s.paymentStatus === 'Pending' ? 'bg-amber-400' : 'bg-rose-400'
                    }`} />
                  </div>
                )) : (
                  <div className="col-span-2 text-center py-8 text-gray-500 text-sm">No students found</div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - 4 cols */}
          <div className="col-span-12 lg:col-span-4 space-y-5">
            
            {/* Discord Roles */}
            <div className="bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm rounded-2xl p-5 border border-white/[0.06]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#5865F2]/15 border border-[#5865F2]/30 flex items-center justify-center text-[#5865F2]">
                  <DiscordMark className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Discord Roles</h3>
                  <p className="text-xs text-gray-500">Synced with Discord</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-center">
                  <p className="text-2xl font-bold text-white">{stats.rolesAssigned}</p>
                  <p className="text-xs text-cyan-300 uppercase tracking-wide">Assigned</p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
                  <p className="text-2xl font-bold text-white">{stats.rolesUnassigned}</p>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Pending</p>
                </div>
              </div>
              <div className="mt-4 h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className="bg-cyan-500 h-full transition-all" style={{ width: `${students.length > 0 ? (stats.rolesAssigned / students.length) * 100 : 0}%` }} />
              </div>
            </div>

            {/* Attention Required */}
            <div className="bg-gradient-to-br from-rose-500/[0.03] to-white/[0.01] backdrop-blur-sm rounded-2xl p-5 border border-rose-500/10">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-5 h-5 text-rose-400" />
                <h3 className="text-sm font-semibold text-white">Needs Attention</h3>
              </div>
              {criticalStudents.length > 0 ? (
                <div className="space-y-3">
                  {criticalStudents.map(s => (
                    <div 
                      key={s.id} 
                      onClick={() => onSelectStudent(s)}
                      className="flex items-center gap-3 p-3 rounded-lg bg-rose-500/5 hover:bg-rose-500/10 border border-rose-500/15 cursor-pointer transition-all"
                    >
                      <div className="w-8 h-8 rounded bg-rose-500/20 flex items-center justify-center text-rose-200 text-sm font-semibold">
                        {s.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white truncate">{s.name}</p>
                        <p className="text-xs text-rose-300">{s.paymentStatus === 'Failed' ? 'Payment failed' : 'Pending setup'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center py-6 text-center">
                  <Sparkles className="w-7 h-7 text-emerald-400 mb-2" />
                  <p className="text-sm font-semibold text-white">All Clear</p>
                  <p className="text-xs text-gray-500">No issues detected</p>
                </div>
              )}
            </div>

            {/* Activity Feed */}
            <div className="bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm rounded-2xl p-5 border border-white/[0.06]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-amber-400" />
                  <h3 className="text-sm font-semibold text-white">Activity</h3>
                </div>
                <span className="text-xs text-gray-500">{notifications.length} events</span>
              </div>
              <div className="space-y-2">
                {notifications.length > 0 ? notifications.slice(0, 4).map(n => (
                  <div key={n.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/[0.03] transition-colors">
                    <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                      n.type === 'success' ? 'bg-emerald-400' :
                      n.type === 'warning' ? 'bg-amber-400' :
                      n.type === 'error' ? 'bg-rose-400' : 'bg-blue-400'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-200 leading-relaxed">{n.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{n.time}</p>
                    </div>
                  </div>
                )) : (
                  <p className="text-center py-6 text-gray-500 text-sm">No recent activity</p>
                )}
              </div>
            </div>

            {/* System Status */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs text-gray-500 uppercase">Status</span>
                </div>
                <p className="text-sm font-semibold text-emerald-300">Online</p>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/10">
                <div className="flex items-center gap-2 mb-2">
                  <Database className="w-3 h-3 text-blue-300" />
                  <span className="text-xs text-gray-500 uppercase">Records</span>
                </div>
                <p className="text-sm font-semibold text-white">{students.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
