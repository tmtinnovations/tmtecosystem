
import React from 'react';
import { Search, RefreshCw, CheckCircle2, AlertTriangle, Shield, Copy, Pencil, Trash2 } from 'lucide-react';

const RoleAssignmentView = () => {
  const users = [{ id: 1, name: 'Alex Johnson', discord: 'alex_trader#9921', role: 'Get Funded Student', status: 'Synced', lastSync: '10 mins ago' }, { id: 3, name: 'Michael Brown', discord: 'mike_b_88', role: 'Premium Member', status: 'Failed', lastSync: '1 hour ago' }];
  return (
    <div className="h-full animate-in fade-in duration-500">
      <div className="bg-tmt-black/60 backdrop-blur-md rounded-3xl shadow-2xl border border-white/10 overflow-hidden h-full flex flex-col">
        <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-tmt-emerald" />
            <input type="text" placeholder="Search Discord ID..." className="w-full pl-10 pr-4 py-2.5 text-sm bg-white/10 border border-white/10 rounded-xl text-white outline-none" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-tmt-emerald text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg active:scale-95">
            <RefreshCw className="w-4 h-4" /> Force Sync Hub
          </button>
        </div>
        <div className="flex-1 overflow-x-auto">
          <table className="w-full text-left">
                <thead className="bg-tmt-black text-gray-300"><tr><th className="px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em]">Student Name</th><th className="px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em]">Discord Handle</th><th className="px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em]">Target Role</th><th className="px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em]">Sync Status</th><th className="px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em]">Last Pulse</th><th className="px-4 py-3 text-right text-[10px] font-black uppercase tracking-[0.2em]">Actions</th></tr></thead>
                <tbody className="divide-y divide-white/10">{users.map((user) => (
                    <tr key={user.id} className="hover:bg-white/5 group transition-colors"><td className="px-4 py-3 font-black text-white text-sm uppercase group-hover:text-tmt-emerald transition-colors">{user.name}</td><td className="px-4 py-3 text-gray-300 flex items-center gap-2"><span className="bg-white/5 border border-white/10 text-white px-2 py-1 rounded-lg text-[10px] font-mono tracking-widest">{user.discord}</span><Copy className="w-3 h-3 text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" /></td><td className="px-4 py-3"><span className="bg-white/5 text-gray-200 px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border border-white/10">{user.role}</span></td><td className="px-4 py-3">{user.status === 'Synced' ? <span className="flex items-center gap-2 text-tmt-emerald font-black text-[10px] uppercase tracking-widest"><CheckCircle2 className="w-4 h-4" /> Synced</span> : <span className="flex items-center gap-2 text-rose-500 font-black text-[10px] uppercase tracking-widest"><AlertTriangle className="w-4 h-4" /> Error Logged</span>}</td><td className="px-4 py-3 text-gray-400 text-[10px] font-bold uppercase">{user.lastSync}</td><td className="px-4 py-3 text-right"><div className="flex justify-end gap-1"><button className="p-2 bg-white/10 border border-white/10 rounded-lg hover:bg-tmt-emerald hover:text-white transition-all"><Pencil className="w-4 h-4" /></button><button className="p-2 bg-white/10 border border-white/10 rounded-lg hover:bg-rose-500 hover:text-white transition-all"><Trash2 className="w-4 h-4" /></button></div></td></tr>
                ))}</tbody></table></div>
      </div>
    </div>
  );
};

export default RoleAssignmentView;
