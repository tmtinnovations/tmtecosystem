
import React from 'react';
import { Student } from '../types';
import { Check, Clock, AlertTriangle, ArrowRight } from 'lucide-react';

interface TimelinePanelProps {
  student: Student | null;
}

const TimelinePanel: React.FC<TimelinePanelProps> = ({ student }) => {
  if (!student) {
    return (
      <div className="bg-tmt-black/60 backdrop-blur-md rounded-3xl shadow-2xl border border-white/10 p-6 h-full flex items-center justify-center text-center">
        <div>
            <div className="w-12 h-12 bg-white/10 border border-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <ArrowRight className="w-6 h-6 text-tmt-emerald" />
            </div>
            <p className="text-white text-sm font-black uppercase tracking-widest">Select record for timeline</p>
        </div>
      </div>
    );
  }

  const isFailed = student.timelineSteps.some(s => s.status === 'failed');

  return (
    <div className="bg-tmt-black/60 backdrop-blur-md rounded-3xl shadow-2xl border border-white/10 flex flex-col h-full overflow-hidden">
      <div className="p-5 border-b border-white/10 bg-white/5">
        <h3 className="font-black text-white uppercase tracking-tight text-sm">Automation Timeline</h3>
        <p className="text-[10px] text-gray-200 mt-1 uppercase tracking-wider font-black">
          Tracking: <span className="text-tmt-emerald">{student.name}</span>
        </p>
      </div>
      
      <div className="p-6 flex-1 overflow-auto">
        {isFailed && (
            <div className="mb-6 p-4 bg-rose-500 text-white border border-rose-600 rounded-2xl flex items-start gap-3 shadow-xl">
                <AlertTriangle className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                <div>
                    <p className="text-xs font-black uppercase tracking-wider">Manual Review Needed</p>
                    <p className="text-[10px] text-white/90 mt-1 leading-relaxed font-bold">Automation halted due to a critical system error.</p>
                    <button className="mt-3 text-[10px] font-black uppercase tracking-widest bg-white text-rose-500 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors shadow-lg shadow-white/20">
                        Retry Engine
                    </button>
                </div>
            </div>
        )}

        <div className="relative pl-2">
          {/* Vertical Line */}
          <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-white/20"></div>

          <div className="space-y-8 relative">
            {student.timelineSteps.map((step, index) => {
              let Icon = Check;
              let bgClass = 'bg-white/10 border-white/20';
              let textClass = 'text-white/40';
              let labelClass = 'text-white/60';

              if (step.status === 'completed') {
                bgClass = 'bg-tmt-emerald border-tmt-emerald shadow-lg shadow-tmt-emerald/20';
                textClass = 'text-white';
                labelClass = 'text-white font-black';
              } else if (step.status === 'current') {
                Icon = Clock;
                bgClass = 'bg-blue-500 border-blue-600 shadow-lg shadow-blue-500/20 animate-pulse';
                textClass = 'text-white';
                labelClass = 'text-blue-200 font-black';
              } else if (step.status === 'failed') {
                Icon = AlertTriangle;
                bgClass = 'bg-rose-500 border-rose-600 shadow-lg shadow-rose-500/20';
                textClass = 'text-white';
                labelClass = 'text-white font-black';
              }
              // Removed redundant and type-breaking else block for 'pending' state

              return (
                <div key={index} className="flex gap-4 items-start group">
                  <div className={`relative z-10 w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 ${bgClass}`}>
                    {step.status === 'pending' ? <div className="w-1.5 h-1.5 rounded-full bg-white/40" /> : <Icon className={`w-3.5 h-3.5 ${textClass}`} />}
                  </div>
                  <div className="pt-0.5">
                    <p className={`text-xs uppercase tracking-wide ${labelClass}`}>{step.label}</p>
                    {step.timestamp && (
                      <p className="text-[10px] text-gray-300 mt-1 font-mono font-bold">{step.timestamp}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelinePanel;
