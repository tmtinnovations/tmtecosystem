
import React, { useState } from 'react';
import { Student } from '../types';
import { 
  AlertCircle, 
  Clock, 
  CheckCircle2, 
  ShieldAlert, 
  CreditCard, 
  UserCheck, 
  ArrowRight, 
  Zap, 
  RefreshCw 
} from 'lucide-react';

interface PriorityActionHubProps {
  students: Student[];
  onSelectStudent: (student: Student) => void;
}

const PriorityActionHub: React.FC<PriorityActionHubProps> = ({ students, onSelectStudent }) => {
  const [activeTab, setActiveTab] = useState<'critical' | 'pending' | 'active'>('critical');

  // Derive live actions from the actual students state
  const criticalActions = students
    .filter(s => s.paymentStatus === 'Failed')
    .map(s => ({
      id: s.id,
      name: s.name,
      issue: 'Payment Failed',
      detail: `Stripe rejected transaction for ${s.program?.name || 'program'}`,
      time: 'Immediate',
      icon: CreditCard,
      student: s
    }));

  const pendingActions = students
    .filter(s => s.onboardingStatus === 'Not Started' && s.paymentStatus !== 'Failed')
    .map(s => ({
      id: s.id,
      name: s.name,
      task: 'Awaiting Onboarding',
      detail: `Paid for ${s.program?.name || 'program'}, queue entry pending`,
      time: 'Pending',
      icon: UserCheck,
      student: s
    }));

  const activeSyncs = students
    .filter(s => s.onboardingStatus === 'In Progress')
    .map(s => ({
      id: s.id,
      name: s.name,
      status: 'Active Deployment',
      detail: 'Provisioning Discord Roles',
      progress: s.discordRoleAssigned ? 90 : 45,
      student: s
    }));

  const stats = {
    health: students.length > 0 ? Math.round((students.filter(s => s.onboardingStatus === 'Completed').length / students.length) * 100) : 100,
    ops: students.length * 4,
    latency: '0.8s'
  };

  return (
    <div className="bg-zinc-950/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white/5 flex flex-col h-full overflow-hidden">
      <div className="p-8 border-b border-white/5 bg-white/[0.02]">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
            <div>
                <h3 className="text-xl font-black text-white tracking-tight uppercase">Priority Command</h3>
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mt-1">Operational focus & manual overrides</p>
            </div>
            <div className="flex bg-black/40 p-1 rounded-2xl border border-white/5 w-full lg:w-auto overflow-x-auto scrollbar-hide">
                <button 
                    onClick={() => setActiveTab('critical')}
                    className={`flex-1 lg:flex-none px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === 'critical' ? 'bg-rose-500 text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}
                >
                    Critical ({criticalActions.length})
                </button>
                <button 
                    onClick={() => setActiveTab('pending')}
                    className={`flex-1 lg:flex-none px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === 'pending' ? 'bg-amber-500 text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}
                >
                    Review ({pendingActions.length})
                </button>
                <button 
                    onClick={() => setActiveTab('active')}
                    className={`flex-1 lg:flex-none px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === 'active' ? 'bg-tmt-emerald text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}
                >
                    Live ({activeSyncs.length})
                </button>
            </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/5 p-4 rounded-2xl border border-white/5 group hover:border-white/10 transition-all">
                <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest mb-1">Queue Health</p>
                <p className="text-xl font-black text-white uppercase tracking-tight group-hover:text-tmt-emerald transition-colors">{stats.health}%</p>
            </div>
            <div className="bg-white/5 p-4 rounded-2xl border border-white/5 group hover:border-white/10 transition-all">
                <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest mb-1">Total Signals</p>
                <p className="text-xl font-black text-tmt-emerald uppercase tracking-tight group-hover:scale-105 origin-left transition-transform">{stats.ops} SIG</p>
            </div>
            <div className="bg-white/5 p-4 rounded-2xl border border-white/5 group hover:border-white/10 transition-all">
                <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest mb-1">Bot Pulse</p>
                <p className="text-xl font-black text-amber-500 uppercase tracking-tight">{stats.latency}</p>
            </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6 space-y-4 min-h-[400px]">
        {activeTab === 'critical' && criticalActions.map((item) => (
            <div key={item.id} onClick={() => onSelectStudent(item.student)} className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-5 bg-rose-500/5 border border-rose-500/10 rounded-[1.5rem] group hover:bg-rose-500/10 transition-all cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-rose-500/20 flex items-center justify-center text-rose-400 shadow-lg shadow-rose-500/5 border border-rose-500/20 group-hover:scale-110 transition-transform flex-shrink-0">
                    <item.icon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-rose-400 font-black uppercase tracking-[0.2em] mb-1">Critical Fault</p>
                    <h4 className="text-white font-black text-base uppercase tracking-tight truncate group-hover:text-rose-400 transition-colors">{item.name}</h4>
                    <p className="text-xs text-gray-300 font-bold mt-1 uppercase tracking-wider truncate">{item.issue} — <span className="text-gray-500 italic">{item.detail}</span></p>
                </div>
                <div className="flex items-center gap-4 w-full sm:w-auto justify-between">
                    <span className="text-[10px] font-mono font-black text-gray-500 uppercase">{item.time}</span>
                    <button className="px-5 py-2.5 bg-white text-rose-500 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-white/10 active:scale-95 whitespace-nowrap">
                        Override
                    </button>
                </div>
            </div>
        ))}

        {activeTab === 'pending' && pendingActions.map((item) => (
             <div key={item.id} onClick={() => onSelectStudent(item.student)} className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-5 bg-amber-500/5 border border-amber-500/10 rounded-[1.5rem] group hover:bg-amber-500/10 transition-all cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-400 border border-amber-500/20 flex-shrink-0">
                    <item.icon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-amber-400 font-black uppercase tracking-[0.2em] mb-1">Human Review</p>
                    <h4 className="text-white font-black text-base uppercase tracking-tight truncate">{item.name}</h4>
                    <p className="text-xs text-gray-300 font-bold mt-1 uppercase tracking-wider truncate">{item.task} — <span className="text-gray-500 italic">{item.detail}</span></p>
                </div>
                <div className="flex items-center gap-4 w-full sm:w-auto justify-between">
                    <span className="text-[10px] font-mono font-black text-gray-500 uppercase">{item.time}</span>
                    <button className="px-5 py-2.5 bg-amber-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-amber-600 transition-all shadow-xl shadow-amber-500/20 whitespace-nowrap">
                        Enroll
                    </button>
                </div>
            </div>
        ))}

        {activeTab === 'active' && activeSyncs.map((item) => (
            <div key={item.id} onClick={() => onSelectStudent(item.student)} className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-5 bg-tmt-emerald/5 border border-tmt-emerald/10 rounded-[1.5rem] group cursor-pointer hover:bg-tmt-emerald/10 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-tmt-emerald/20 flex items-center justify-center text-tmt-emerald border border-tmt-emerald/20 animate-pulse flex-shrink-0">
                    <RefreshCw className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0 w-full">
                    <p className="text-[10px] text-tmt-emerald font-black uppercase tracking-[0.2em] mb-1">Syncing Data</p>
                    <h4 className="text-white font-black text-base uppercase tracking-tight truncate">{item.name}</h4>
                    <div className="flex items-center gap-4 mt-2">
                        <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                            <div className="bg-tmt-emerald h-full rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(16,185,129,0.5)]" style={{ width: `${item.progress}%` }}></div>
                        </div>
                        <span className="text-[10px] font-black text-white">{item.progress}%</span>
                    </div>
                </div>
                <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
                    <button className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 text-white transition-all">
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        ))}

        {((activeTab === 'critical' && criticalActions.length === 0) ||
          (activeTab === 'pending' && pendingActions.length === 0) ||
          (activeTab === 'active' && activeSyncs.length === 0)) && (
          <div className="flex flex-col items-center justify-center py-20 opacity-30">
            <CheckCircle2 className="w-12 h-12 text-tmt-emerald mb-4" />
            <p className="text-sm font-black text-white uppercase tracking-widest">Clear Skies</p>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">No tasks in this category</p>
          </div>
        )}
      </div>

      <div className="p-6 bg-zinc-900 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
            <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Master Intelligence Unit v2.5.0</span>
            <button className="text-[10px] font-black text-tmt-emerald uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2 group">
                <Zap className="w-3.5 h-3.5 group-hover:scale-125 transition-transform" />
                Deploy Master Sync Override
            </button>
      </div>
    </div>
  );
};

export default PriorityActionHub;
