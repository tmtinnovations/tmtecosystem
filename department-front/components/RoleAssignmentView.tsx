
import React from 'react';
import { Search, RefreshCw, CheckCircle2, AlertTriangle, Shield, Copy, Pencil, Trash2 } from 'lucide-react';

const RoleAssignmentView = () => {
  const users = [
    { id: 1, name: 'Alex Johnson', discord: 'alex_trader#9921', role: 'Get Funded Student', status: 'Synced', lastSync: '10 mins ago' },
    { id: 2, name: 'Sarah Williams', discord: 'sarah_w#1122', role: 'TAT Member', status: 'Synced', lastSync: '15 mins ago' },
    { id: 3, name: 'Michael Brown', discord: 'mike_b_88', role: 'Premium Member', status: 'Failed', lastSync: '1 hour ago' },
    { id: 4, name: 'Emily Davis', discord: 'emily_d#5544', role: 'TMT Basic', status: 'Pending', lastSync: 'Just now' },
    { id: 5, name: 'Chris Wilson', discord: 'cwilson#0001', role: 'Premium Lite', status: 'Synced', lastSync: '1 day ago' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight uppercase">Discord Roles</h2>
          <p className="text-gray-300 text-sm mt-1 font-bold">Manage and troubleshoot automated role synchronization.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-tmt-emerald text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-tmt-emerald/80 transition-all shadow-xl shadow-tmt-emerald/30 active:scale-95">
            <RefreshCw className="w-4 h-4" /> Force Sync Hub
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-tmt-black/60 backdrop-blur-md border border-white/10 p-6 rounded-3xl flex items-center gap-5 shadow-2xl">
              <div className="p-4 bg-tmt-emerald/10 border border-tmt-emerald/20 rounded-2xl text-tmt-emerald shadow-lg shadow-tmt-emerald/10">
                  <Shield className="w-7 h-7" />
              </div>
              <div>
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em]">Bot Integration</p>
                  <p className="text-xl font-black text-white flex items-center gap-3 mt-1 uppercase">
                    Connected 
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                  </p>
              </div>
          </div>
      </div>

      <div className="bg-tmt-black/60 backdrop-blur-md rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
        <div className="p-6 border-b border-white/10 flex gap-4 bg-white/5">
            <div className="relative flex-1 max-w-md group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-tmt-emerald" />
                <input 
                    type="text" 
                    placeholder="Search Discord ID or Student..." 
                    className="w-full pl-11 pr-4 py-3 text-sm bg-white/10 border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-tmt-emerald/10 focus:border-tmt-emerald transition-all"
                />
            </div>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="bg-tmt-black text-gray-300">
                    <tr>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em]">Student Name</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em]">Discord Handle</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em]">Target Role</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em]">Sync Status</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em]">Last Pulse</th>
                        <th className="px-6 py-4 text-right text-[10px] font-black uppercase tracking-[0.2em]">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                    {users.map((user) => (
                        <tr key={user.id} className="hover:bg-white/5 transition-colors group">
                            <td className="px-6 py-5 font-black text-white text-sm uppercase tracking-tight group-hover:text-tmt-emerald transition-colors">{user.name}</td>
                            <td className="px-6 py-5 text-gray-300 flex items-center gap-2 group cursor-pointer">
                                <span className="bg-white/5 border border-white/10 text-white px-2.5 py-1 rounded-lg text-[10px] font-mono font-black tracking-widest">{user.discord}</span>
                                <Copy className="w-3.5 h-3.5 text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity hover:text-tmt-emerald" />
                            </td>
                            <td className="px-6 py-5">
                                <span className="bg-white/5 text-gray-200 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border border-white/10">{user.role}</span>
                            </td>
                            <td className="px-6 py-5">
                                {user.status === 'Synced' && (
                                    <span className="flex items-center gap-2 text-tmt-emerald font-black text-[10px] uppercase tracking-widest">
                                        <CheckCircle2 className="w-4 h-4" /> Synced
                                    </span>
                                )}
                                {user.status === 'Failed' && (
                                    <span className="flex items-center gap-2 text-rose-500 font-black text-[10px] uppercase tracking-widest">
                                        <AlertTriangle className="w-4 h-4" /> Error Logged
                                    </span>
                                )}
                                {user.status === 'Pending' && (
                                    <span className="flex items-center gap-2 text-amber-500 font-black text-[10px] uppercase tracking-widest">
                                        <RefreshCw className="w-4 h-4 animate-spin" /> Retrying...
                                    </span>
                                )}
                            </td>
                            <td className="px-6 py-5 text-gray-400 text-[10px] font-bold uppercase tracking-widest">{user.lastSync}</td>
                            <td className="px-6 py-5 text-right">
                                <div className="flex justify-end gap-2">
                                    <button 
                                      className="p-2 bg-white/10 border border-white/10 rounded-xl hover:border-tmt-emerald hover:bg-tmt-emerald hover:text-white transition-all shadow-sm"
                                      title="Edit Record"
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </button>
                                    <button 
                                      className="p-2 bg-white/10 border border-white/10 rounded-xl hover:border-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                                      title="Delete Record"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default RoleAssignmentView;
