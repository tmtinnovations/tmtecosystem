
import React from 'react';
import { ResponseMetric, MessageVolume, InquiryTheme, Insight } from '../types';
import { TrendingUp, TrendingDown, Minus, Info, AlertTriangle, Zap, ArrowRight, ExternalLink } from 'lucide-react';

interface OperationsPanelProps {
  metrics: ResponseMetric[];
  volume: MessageVolume;
  inquiries: InquiryTheme[];
  insights: Insight[];
}

const OperationsPanel: React.FC<OperationsPanelProps> = ({ metrics, volume, inquiries, insights }) => {
  return (
    <div className="space-y-8 mt-12 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/20 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-tmt-emerald fill-tmt-emerald" />
            <h2 className="text-2xl font-black text-white tracking-tight uppercase">Admin Intel Hub</h2>
          </div>
          <p className="text-white text-xs font-black uppercase tracking-[0.3em]">Operational Update • Dec 2025 Cycle</p>
        </div>
        <div className="px-4 py-2 bg-tmt-emerald text-tmt-black rounded-2xl flex items-center gap-3 font-black">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            <span className="text-[10px] uppercase tracking-widest">Live Engine Monitoring</span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Main Intel Stream */}
        <div className="xl:col-span-3 space-y-8">
            
            {/* Response Performance Hub */}
            <div className="bg-tmt-black/80 backdrop-blur-md rounded-[2.5rem] shadow-2xl border border-white/10 overflow-hidden group">
                <div className="p-8 border-b border-white/10 flex justify-between items-center">
                    <div>
                        <h3 className="text-lg font-black text-white tracking-tight flex items-center gap-3 uppercase">
                            <span className="w-1.5 h-6 bg-tmt-emerald rounded-full"></span>
                            Performance Audit
                        </h3>
                        <p className="text-[10px] text-gray-200 font-black uppercase tracking-widest mt-1">Human response benchmarks (Meta Rule Validated)</p>
                    </div>
                    <button className="p-3 bg-white/10 rounded-2xl text-white hover:text-tmt-emerald hover:bg-white transition-all border border-white/10">
                        <ExternalLink className="w-5 h-5" />
                    </button>
                </div>
                <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {metrics.map((metric) => (
                        <div key={metric.id} className="relative group/metric">
                            <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-3 h-8 leading-tight">{metric.label}</p>
                            <div className="flex items-end gap-2">
                                <span className={`text-2xl font-black tracking-tighter ${
                                    metric.trend === 'improved' ? 'text-tmt-emerald' : 
                                    metric.trend === 'dropped' ? 'text-rose-400' : 'text-amber-400'
                                }`}>
                                    {metric.value}
                                </span>
                            </div>
                            <div className="flex items-center gap-1.5 mt-3">
                                <div className={`px-2 py-0.5 rounded-full flex items-center gap-1 text-[9px] font-black ${
                                    metric.trend === 'improved' ? 'bg-tmt-emerald text-white' : 
                                    metric.trend === 'dropped' ? 'bg-rose-500 text-white shadow-lg' : 'bg-amber-500 text-white'
                                }`}>
                                    {metric.trend === 'improved' ? <TrendingUp className="w-3 h-3" /> :
                                     metric.trend === 'dropped' ? <TrendingDown className="w-3 h-3" /> :
                                     <Minus className="w-3 h-3" />}
                                    {metric.delta}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Traffic Volume */}
                <div className="bg-tmt-black rounded-[2.5rem] shadow-2xl border border-white/20 p-10 flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-tmt-emerald opacity-20 blur-[100px] -mr-32 -mt-32"></div>
                    <div className="relative z-10">
                        <h3 className="text-white text-lg font-black uppercase tracking-tight mb-10">Traffic Surge</h3>
                        
                        <div className="flex items-center justify-between mb-10">
                            <div className="space-y-2">
                                <p className="text-[10px] text-tmt-emerald font-black uppercase tracking-[0.2em]">Today's Inbound</p>
                                <p className="text-6xl font-black text-white tracking-tighter">{volume.today}</p>
                            </div>
                            <div className="text-right space-y-2">
                                <p className="text-[10px] text-gray-200 font-black uppercase tracking-[0.2em]">7-Day Cumulative</p>
                                <p className="text-3xl font-black text-tmt-emerald tracking-tight">{volume.week.toLocaleString()}</p>
                            </div>
                        </div>
                        
                        {volume.isPeakSeason && (
                             <div className="bg-amber-500 text-white border border-amber-600 rounded-[2rem] p-6 flex items-start gap-5 shadow-2xl">
                                 <AlertTriangle className="w-6 h-6 text-white flex-shrink-0 mt-0.5" />
                                 <div>
                                     <p className="text-xs font-black uppercase tracking-wider">High Volume Alert</p>
                                     <p className="text-xs text-white/90 mt-1.5 leading-relaxed font-bold">Currently in Peak Season. Prioritize high-intent human responses to protect account health.</p>
                                 </div>
                             </div>
                        )}
                    </div>
                </div>

                {/* Hot Topics */}
                <div className="bg-tmt-black/60 backdrop-blur-md rounded-[2.5rem] shadow-2xl border border-white/10 p-10">
                    <h3 className="text-white text-lg font-black uppercase tracking-tight mb-8">Hot Inquiry Themes</h3>
                    <div className="space-y-4">
                        {inquiries.slice(0, 4).map((theme, idx) => (
                            <div key={idx} className="group/item flex items-center gap-5 p-4 rounded-[1.5rem] hover:bg-white transition-all cursor-default border border-transparent hover:border-white/20 shadow-sm">
                                <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-xl group-hover/item:scale-110 group-hover/item:rotate-3 group-hover/item:bg-tmt-emerald group-hover/item:text-white transition-all">
                                    {theme.icon}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-black text-white group-hover/item:text-tmt-black transition-colors uppercase tracking-tight">{theme.category}</p>
                                    <p className="text-[10px] text-gray-300 font-black uppercase tracking-wider mt-1 line-clamp-1 group-hover/item:text-tmt-dark transition-colors">{theme.description}</p>
                                </div>
                                <ArrowRight className="w-4 h-4 text-tmt-emerald group-hover/item:text-tmt-black group-hover/item:translate-x-1 transition-all" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        {/* Tactical Insights Column */}
        <div className="bg-gradient-to-br from-tmt-black to-[#011a14] rounded-[2.5rem] shadow-2xl border border-white/20 flex flex-col overflow-hidden relative group">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-tmt-emerald shadow-[0_0_30px_rgba(16,185,129,0.8)]"></div>
            <div className="p-10 border-b border-white/10 bg-white/5">
                <h3 className="text-white text-lg font-black uppercase tracking-tight flex items-center gap-3">
                    <Info className="w-5 h-5 text-tmt-emerald" />
                    Tactical Insights
                </h3>
            </div>
            
            <div className="p-10 flex-1 space-y-10 overflow-y-auto bg-tmt-black/40">
                <div className="space-y-8">
                    {insights.map((insight) => (
                        <div key={insight.id} className="flex gap-4 items-start relative group/insight">
                             <div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 shadow-[0_0_15px_rgba(255,255,255,0.5)] ${
                                insight.type === 'alert' ? 'bg-rose-500 shadow-rose-500' :
                                insight.type === 'success' ? 'bg-tmt-emerald shadow-tmt-emerald' :
                                'bg-blue-400 shadow-blue-400'
                             }`}></div>
                             <p className="text-xs text-white leading-relaxed font-black group-hover:text-tmt-emerald transition-colors">
                                {insight.text}
                             </p>
                        </div>
                    ))}
                </div>
                
                <div className="mt-12 p-8 bg-white/10 border border-white/10 rounded-[2rem] relative overflow-hidden">
                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-tmt-emerald opacity-20 rounded-full blur-3xl"></div>
                    <p className="text-[10px] font-black text-tmt-emerald uppercase tracking-[0.3em] mb-4">Command Directive</p>
                    <p className="text-xs text-white italic leading-relaxed font-bold">
                        "Metric variance is within seasonal tolerance. Maintain aggressive focus on TAT and MOM onboarding cycles."
                    </p>
                    <div className="mt-6 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-tmt-emerald border border-white/20 flex items-center justify-center text-[10px] font-black text-white">JD</div>
                        <span className="text-[10px] text-white font-black uppercase tracking-widest">Ops Lead Approval</span>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default OperationsPanel;
