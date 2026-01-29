
import React, { useState } from 'react';
import { Student } from '../../types';
import { CreditCard, UserCheck, RefreshCw, ArrowRight, CheckCircle2, Zap, MailWarning, Clock } from 'lucide-react';

interface PriorityActionHubProps {
  students: Student[];
  onSelectStudent: (student: Student) => void;
}

const PriorityActionHub: React.FC<PriorityActionHubProps> = ({ students, onSelectStudent }) => {
  const [activeTab, setActiveTab] = useState<'critical' | 'due' | 'pending' | 'active'>('critical');

  const getDueDays = (dateStr: string) => {
    const today = new Date(); today.setHours(0,0,0,0);
    const due = new Date(dateStr); due.setHours(0,0,0,0);
    return Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  };

  const criticalActions = students
    .filter(s => s.paymentStatus === 'Failed' || getDueDays(s.dueDate) < 0)
    .map(s => ({
      id: s.id,
      name: s.name,
      issue: getDueDays(s.dueDate) < 0 ? 'Overdue Payment' : 'Payment Error',
      detail: getDueDays(s.dueDate) < 0 ? `Billed ${s.dueDate}` : `Transaction failed for ${s.program?.name || 'program'}`,
      time: 'Immediate Action',
      icon: CreditCard,
      student: s
    }));

  const nearDueActions = students
    .filter(s => {
      const days = getDueDays(s.dueDate);
      return days >= 0 && days <= 7;
    })
    .map(s => ({
      id: s.id,
      name: s.name,
      issue: getDueDays(s.dueDate) === 0 ? 'Due Today' : `Due in ${getDueDays(s.dueDate)} Days`,
      detail: s.lastReminderSent ? `Automated Reminder Sent: ${s.lastReminderSent}` : 'Auto-Reminder Queueing',
      time: 'Triggered',
      icon: MailWarning,
      student: s
    }));

  const pendingActions = students
    .filter(s => s.onboardingStatus === 'Not Started' && s.paymentStatus === 'Paid')
    .map(s => ({
      id: s.id,
      name: s.name,
      task: 'Pending Setup',
      detail: `Paid for ${s.program?.name || 'program'}, awaiting system entry`,
      time: 'Pending',
      icon: UserCheck,
      student: s
    }));

  const stats = {
    health: students.length > 0 ? Math.round((students.filter(s => s.onboardingStatus === 'Completed').length / students.length) * 100) : 100,
    ops: students.length * 4,
    latency: 'Optimal'
  };

  return (
    <div className="bg-zinc-950/80 backdrop-blur-xl rounded-xl shadow-xl border border-white/5 flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b border-white/5 bg-white/[0.02]">
        <div className="flex flex-row justify-between items-center gap-4 mb-4">
            <div>
                <h3 className="text-lg font-bold text-white tracking-tight uppercase">Ops Command</h3>
                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Alert Distribution</p>
            </div>
            <div className="flex bg-black/40 p-1 rounded-lg border border-white/5 overflow-x-auto scrollbar-hide shrink-0">
                <button 
                    onClick={() => setActiveTab('critical')}
                    className={`px-3 py-1.5 rounded-md text-[9px] font-bold uppercase tracking-wider transition-all whitespace-nowrap ${activeTab === 'critical' ? 'bg-rose-500 text-white shadow-sm' : 'text-gray-500 hover:text-white'}`}
                >
                    Crit ({criticalActions.length})
                </button>
                <button 
                    onClick={() => setActiveTab('due')}
                    className={`px-3 py-1.5 rounded-md text-[9px] font-bold uppercase tracking-wider transition-all whitespace-nowrap ${activeTab === 'due' ? 'bg-amber-500 text-white shadow-sm' : 'text-gray-500 hover:text-white'}`}
                >
                    Due ({nearDueActions.length})
                </button>
                <button 
                    onClick={() => setActiveTab('pending')}
                    className={`px-3 py-1.5 rounded-md text-[9px] font-bold uppercase tracking-wider transition-all whitespace-nowrap ${activeTab === 'pending' ? 'bg-tmt-emerald text-white shadow-sm' : 'text-gray-500 hover:text-white'}`}
                >
                    Wait ({pendingActions.length})
                </button>
            </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/5 p-3 rounded-xl border border-white/5 group transition-all">
                <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">Queue</p>
                <p className="text-sm font-bold text-white uppercase tracking-tight group-hover:text-tmt-emerald transition-colors">{stats.health}%</p>
            </div>
            <div className="bg-white/5 p-3 rounded-xl border border-white/5 group transition-all">
                <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">Signals</p>
                <p className="text-sm font-bold text-tmt-emerald uppercase tracking-tight">{stats.ops}</p>
            </div>
            <div className="bg-white/5 p-3 rounded-xl border border-white/5 group transition-all">
                <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">Pulse</p>
                <p className="text-sm font-bold text-amber-500 uppercase tracking-tight">{stats.latency}</p>
            </div>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-4 space-y-3 min-h-[220px]">
        {activeTab === 'critical' && criticalActions.map((item) => (
            <div key={item.id} onClick={() => onSelectStudent(item.student)} className="flex items-center gap-3 p-3 bg-rose-500/5 border border-rose-500/10 rounded-xl group hover:bg-rose-500/10 transition-all cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-rose-500/20 flex items-center justify-center text-rose-400 border border-rose-500/20 flex-shrink-0">
                    <item.icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                    <h4 className="text-white font-bold text-xs uppercase tracking-tight truncate group-hover:text-rose-400 transition-colors">{item.name}</h4>
                    <p className="text-[10px] text-gray-400 font-medium truncate">{item.issue}</p>
                </div>
                <button className="px-3 py-1.5 bg-white/5 text-rose-500 rounded-lg text-[9px] font-bold uppercase tracking-wider hover:bg-white/10 transition-all whitespace-nowrap border border-white/5">Action</button>
            </div>
        ))}

        {activeTab === 'due' && nearDueActions.map((item) => (
            <div key={item.id} onClick={() => onSelectStudent(item.student)} className="flex items-center gap-3 p-3 bg-amber-500/5 border border-amber-500/10 rounded-xl group hover:bg-amber-500/10 transition-all cursor-pointer">
                <div className={`w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 border border-amber-500/20 flex-shrink-0 ${item.issue.includes('Today') ? 'animate-pulse' : ''}`}>
                    <Clock className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                    <h4 className="text-white font-bold text-xs uppercase tracking-tight truncate">{item.name}</h4>
                    <p className="text-[10px] text-gray-400 font-medium truncate">{item.issue}</p>
                </div>
                <button className="p-1.5 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-tmt-emerald hover:border-tmt-emerald transition-all shadow-sm">
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        ))}

        {activeTab === 'pending' && pendingActions.map((item) => (
             <div key={item.id} onClick={() => onSelectStudent(item.student)} className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl group hover:bg-tmt-emerald/10 transition-all cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-tmt-emerald/20 flex items-center justify-center text-tmt-emerald border border-tmt-emerald/20 flex-shrink-0">
                    <item.icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                    <h4 className="text-white font-bold text-xs uppercase tracking-tight truncate">{item.name}</h4>
                    <p className="text-[10px] text-gray-400 font-medium truncate">{item.task}</p>
                </div>
                <button className="px-3 py-1.5 bg-tmt-emerald/10 border border-tmt-emerald/20 text-tmt-emerald rounded-lg text-[9px] font-bold uppercase tracking-wider hover:bg-tmt-emerald hover:text-white transition-all whitespace-nowrap">Provision</button>
            </div>
        ))}

        {((activeTab === 'critical' && criticalActions.length === 0) ||
          (activeTab === 'due' && nearDueActions.length === 0) ||
          (activeTab === 'pending' && pendingActions.length === 0)) && (
          <div className="flex flex-col items-center justify-center py-10 opacity-30">
            <CheckCircle2 className="w-8 h-8 text-tmt-emerald mb-4" />
            <p className="text-[10px] font-bold text-white uppercase tracking-widest">Cleared</p>
          </div>
        )}
      </div>
      <div className="p-3 bg-zinc-900 border-t border-white/5 flex flex-row justify-between items-center gap-2">
            <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Automation Online</span>
            <button className="text-[9px] font-bold text-tmt-emerald uppercase tracking-widest hover:text-white transition-colors flex items-center gap-1 group">
                <Zap className="w-3 h-3 group-hover:scale-125 transition-transform" />
                Pulse
            </button>
      </div>
    </div>
  );
};

export default PriorityActionHub;
