
import React from 'react';
import { LucideIcon, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  trend?: string;
  accentColor: 'emerald' | 'blue' | 'yellow' | 'red';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, trend, accentColor }) => {
  
  const colors = {
    emerald: { bg: 'bg-emerald-500', text: 'text-emerald-400', border: 'border-emerald-500/20', glow: 'shadow-emerald-500/10' },
    blue: { bg: 'bg-blue-500', text: 'text-blue-400', border: 'border-blue-500/20', glow: 'shadow-blue-500/10' },
    yellow: { bg: 'bg-amber-500', text: 'text-amber-400', border: 'border-amber-500/20', glow: 'shadow-amber-500/10' },
    red: { bg: 'bg-rose-500', text: 'text-rose-400', border: 'border-rose-500/20', glow: 'shadow-rose-500/10' },
  };

  const isPositive = trend?.includes('+');

  return (
    <div className={`bg-tmt-black/60 backdrop-blur-md rounded-3xl p-6 border border-white/10 ${colors[accentColor].glow} hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 group overflow-hidden relative`}>
      <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full ${colors[accentColor].bg} opacity-10 group-hover:scale-150 transition-transform duration-500`}></div>
      
      <div className="flex justify-between items-start relative z-10">
        <div className={`p-3 rounded-2xl ${colors[accentColor].bg} bg-opacity-20 transition-all duration-300 border border-${accentColor}-400/20`}>
          <Icon className={`w-6 h-6 ${colors[accentColor].text}`} />
        </div>
        {trend && (
           <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-black ${isPositive ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white shadow-lg'}`}>
              {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              {trend.split(' ')[0]}
           </div>
        )}
      </div>

      <div className="mt-6 relative z-10">
        <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">{title}</p>
        <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-black text-white tracking-tight">{value.toLocaleString()}</h3>
        </div>
        {trend && <p className="text-[10px] text-white/70 mt-2 font-bold uppercase tracking-wider">{trend.split(' ').slice(1).join(' ')}</p>}
      </div>
    </div>
  );
};

export default StatCard;
