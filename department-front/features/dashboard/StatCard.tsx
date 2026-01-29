
import React from 'react';
import { LucideIcon, ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subValue?: string;
  icon: LucideIcon;
  trend?: {
    label: string;
    type: 'positive' | 'negative' | 'neutral' | 'action';
  };
  accentColor: 'emerald' | 'blue' | 'yellow' | 'red';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, subValue, icon: Icon, trend, accentColor }) => {
  const themes = {
    emerald: { 
      bg: 'bg-emerald-500/10', 
      iconBg: 'bg-emerald-500/10', 
      iconText: 'text-emerald-500', 
      pillBg: 'bg-tmt-emerald', 
      pillText: 'text-white',
      glow: 'bg-emerald-500/5'
    },
    blue: { 
      bg: 'bg-blue-500/10', 
      iconBg: 'bg-blue-500/10', 
      iconText: 'text-blue-400', 
      pillBg: 'bg-rose-500', 
      pillText: 'text-white',
      glow: 'bg-blue-500/5'
    },
    yellow: { 
      bg: 'bg-amber-500/10', 
      iconBg: 'bg-amber-500/10', 
      iconText: 'text-amber-400', 
      pillBg: 'bg-rose-500', 
      pillText: 'text-white',
      glow: 'bg-amber-500/5'
    },
    red: { 
      bg: 'bg-rose-500/10', 
      iconBg: 'bg-rose-500/10', 
      iconText: 'text-rose-400', 
      pillBg: 'bg-rose-500', 
      pillText: 'text-white',
      glow: 'bg-rose-500/5'
    },
  };

  const theme = themes[accentColor];

  return (
    <div className="bg-white/[0.03] backdrop-blur-xl rounded-2xl p-4 border border-white/10 relative overflow-hidden group hover:border-white/20 transition-all duration-500 shadow-2xl shadow-black/20 ring-1 ring-white/5 flex flex-col justify-between h-full">
      {/* Background Decorative Glow */}
      <div className={`absolute -right-5 -top-5 w-24 h-24 rounded-full ${theme.glow} blur-2xl group-hover:scale-125 transition-transform duration-700`}></div>
      
      {/* Top Header Row */}
      <div className="flex justify-between items-start mb-2 relative z-10">
        <div className={`w-10 h-10 rounded-xl ${theme.iconBg} backdrop-blur-sm border border-white/10 flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${theme.iconText}`} />
        </div>
        
        {trend && (
          <div className={`${theme.pillBg} ${theme.pillText} px-2 py-1 rounded-lg flex items-center gap-1 shadow-lg backdrop-blur-sm`}>
            {trend.type === 'positive' && <ArrowUpRight className="w-3 h-3" />}
            {trend.type === 'negative' && <ArrowDownRight className="w-3 h-3" />}
            {trend.type === 'neutral' && <TrendingUp className="w-3 h-3 rotate-90" />}
            {trend.type === 'action' && <ArrowDownRight className="w-3 h-3" />}
            <span className="text-[9px] font-black uppercase tracking-widest">{trend.label}</span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="relative z-10">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 truncate">{title}</p>
        <h3 className="text-2xl font-black text-white tracking-tight mb-0.5">{value}</h3>
        {subValue && (
          <p className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">{subValue}</p>
        )}
      </div>
    </div>
  );
};

export default StatCard;
