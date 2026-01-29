import React, { useState } from 'react';
import { Terminal, Search, AlertCircle, Info, CheckCircle2, AlertTriangle, Download, Trash2, Filter } from 'lucide-react';

const LogsView = () => {
  const [filter, setFilter] = useState('');

  const logs = [
    { id: 1024, timestamp: '2023-10-26 14:05:22', level: 'INFO', module: 'Auth', message: 'User Alex Johnson logged in successfully from authorized IP.' },
    { id: 1023, timestamp: '2023-10-26 14:04:10', level: 'SUCCESS', module: 'Payment', message: 'Webhook received: Stripe payment confirmed for transaction #TRX-9932.' },
    { id: 1022, timestamp: '2023-10-26 14:04:11', level: 'SUCCESS', module: 'Onboarding', message: 'Welcome email and course access credentials sent to j.lee@example.com.' },
    { id: 1021, timestamp: '2023-10-26 13:55:00', level: 'ERROR', module: 'Discord', message: 'Failed to assign role "Elite Member" to user ID 88291. Discord API returned 504 Gateway Timeout.' },
    { id: 1020, timestamp: '2023-10-26 13:50:45', level: 'INFO', module: 'System', message: 'Daily database redundancy backup completed successfully.' },
    { id: 1019, timestamp: '2023-10-26 13:45:12', level: 'WARNING', module: 'Payment', message: 'Manual verification pending for high-value crypto transaction #TRX-9931.' },
    { id: 1018, timestamp: '2023-10-26 13:40:05', level: 'INFO', module: 'Cron', message: 'Starting scheduled sync for Discord roles...' },
    { id: 1017, timestamp: '2023-10-26 13:38:22', level: 'ERROR', module: 'API', message: 'Connection refused to external meta-data provider. Retrying in 30s.' },
  ];

  const filteredLogs = logs.filter(log => 
    log.message.toLowerCase().includes(filter.toLowerCase()) || 
    log.module.toLowerCase().includes(filter.toLowerCase()) ||
    log.level.toLowerCase().includes(filter.toLowerCase())
  );

  const getLevelStyles = (level: string) => {
    switch (level) {
      case 'ERROR':
        return {
          text: 'text-rose-400',
          bg: 'bg-rose-500/10',
          border: 'border-rose-500/20',
          icon: AlertCircle,
          rowBg: 'hover:bg-rose-500/5'
        };
      case 'WARNING':
        return {
          text: 'text-amber-400',
          bg: 'bg-amber-500/10',
          border: 'border-amber-500/20',
          icon: AlertTriangle,
          rowBg: 'hover:bg-amber-500/5'
        };
      case 'SUCCESS':
        return {
          text: 'text-emerald-400',
          bg: 'bg-emerald-500/10',
          border: 'border-emerald-500/20',
          icon: CheckCircle2,
          rowBg: 'hover:bg-emerald-500/5'
        };
      default:
        return {
          text: 'text-sky-400',
          bg: 'bg-sky-500/10',
          border: 'border-sky-500/20',
          icon: Info,
          rowBg: 'hover:bg-sky-500/5'
        };
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight uppercase">System Logs</h2>
          <div className="flex items-center gap-3 mt-1.5">
             <p className="text-gray-400 text-sm font-medium">Real-time automation engine telemetry</p>
             <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[10px] text-emerald-500 font-black uppercase tracking-widest">Live Feed</span>
             </div>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-300 text-xs font-bold uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all">
                <Download className="w-4 h-4" /> Export
            </button>
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-xs font-bold uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all">
                <Trash2 className="w-4 h-4" /> Clear Logs
            </button>
        </div>
      </div>

      <div className="bg-zinc-950/80 backdrop-blur-xl rounded-[2rem] shadow-2xl overflow-hidden border border-white/5 flex flex-col h-[700px]">
        {/* Terminal Header */}
        <div className="bg-zinc-900 px-6 py-4 border-b border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex gap-4 items-center">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-rose-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500/50"></div>
                </div>
                <div className="h-4 w-px bg-white/10 mx-1"></div>
                <div className="flex gap-2 items-center">
                    <Terminal className="w-4 h-4 text-tmt-emerald" />
                    <span className="text-gray-400 text-xs font-mono font-bold tracking-tight">automation_core_v2.log</span>
                </div>
            </div>
            
            <div className="relative w-full sm:w-72 group">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-tmt-emerald transition-colors" />
                 <input 
                    type="text" 
                    placeholder="Filter by keyword or module..." 
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 text-gray-200 text-xs rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-tmt-emerald/30 focus:bg-black/60 transition-all placeholder-gray-600"
                />
            </div>
        </div>

        {/* Logs Feed */}
        <div className="flex-1 overflow-auto bg-black/20 p-2 sm:p-4">
            <table className="w-full border-separate border-spacing-y-1 text-left">
                <thead className="hidden lg:table-header-group">
                    <tr>
                        <th className="px-4 py-2 text-[10px] font-black text-gray-500 uppercase tracking-widest">Timestamp</th>
                        <th className="px-4 py-2 text-[10px] font-black text-gray-500 uppercase tracking-widest">Level</th>
                        <th className="px-4 py-2 text-[10px] font-black text-gray-500 uppercase tracking-widest">Module</th>
                        <th className="px-4 py-2 text-[10px] font-black text-gray-500 uppercase tracking-widest">Message</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredLogs.map((log) => {
                        const style = getLevelStyles(log.level);
                        const LevelIcon = style.icon;

                        return (
                            <tr key={log.id} className={`group transition-all ${style.rowBg} border-l-2 border-transparent hover:border-l-tmt-emerald`}>
                                <td className="px-4 py-4 whitespace-nowrap align-top">
                                    <span className="font-mono text-[11px] text-gray-500 font-bold">{log.timestamp}</span>
                                </td>
                                <td className="px-4 py-4 align-top">
                                    <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-lg border ${style.bg} ${style.border} ${style.text} transition-transform group-hover:scale-105`}>
                                        <LevelIcon className="w-3.5 h-3.5" />
                                        <span className="text-[10px] font-black uppercase tracking-wider">{log.level}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-4 align-top">
                                    <span className="font-mono text-[11px] text-gray-400 bg-white/5 px-2 py-0.5 rounded border border-white/5 uppercase font-black">{log.module}</span>
                                </td>
                                <td className="px-4 py-4">
                                    <p className="text-sm text-gray-200 leading-relaxed font-medium group-hover:text-white transition-colors">
                                        {log.message}
                                    </p>
                                    <div className="lg:hidden mt-2 flex gap-4 text-[10px] text-gray-500 font-mono">
                                        <span>ID: {log.id}</span>
                                        <span>{log.timestamp}</span>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            
            {filteredLogs.length === 0 && (
                <div className="flex flex-col items-center justify-center py-32 space-y-4">
                    <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center">
                        <Filter className="w-8 h-8 text-gray-700" />
                    </div>
                    <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">No matching logs found</p>
                </div>
            )}
            
            <div className="mt-8 flex items-center gap-3 px-4">
                <div className="w-2 h-4 bg-tmt-emerald animate-pulse rounded-sm"></div>
                <span className="text-[10px] text-tmt-emerald font-black uppercase tracking-[0.3em]">System Listening...</span>
            </div>
        </div>
        
        {/* Terminal Footer */}
        <div className="bg-zinc-900/50 px-6 py-3 border-t border-white/5 flex justify-between items-center text-[10px] text-gray-500 font-bold uppercase tracking-widest">
            <div className="flex gap-6">
                <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Engine Sync: OK</span>
                <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Buffer: 88%</span>
            </div>
            <div className="hidden sm:block">
                Session Active: 14h 22m
            </div>
        </div>
      </div>
    </div>
  );
};

export default LogsView;