
import React from 'react';
import { Student } from '../../types';
import { Check, Clock, AlertTriangle, ArrowRight, Mail, ExternalLink } from 'lucide-react';

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

  const isFailed = (student.timelineSteps || []).some(s => s.status === 'failed');

  const handleContactStudent = () => {
    const subject = encodeURIComponent('Inquiry Regarding Your Enrollment');
    const body = encodeURIComponent(`Hello ${student.name},\n\nWe are reaching out regarding your enrollment in the ${student.program?.name || 'program'} program.`);
    window.location.href = `mailto:${student.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="bg-tmt-black/60 backdrop-blur-md rounded-xl shadow-xl border border-white/10 flex flex-col h-full overflow-hidden">
      {/* Student Detail Header */}
      <div className="p-4 border-b border-white/10 bg-white/5">
        <div className="flex justify-between items-center mb-3">
          <div>
            <h3 className="font-black text-white uppercase tracking-tight text-sm">Profile Intelligence</h3>
            <p className="text-[9px] text-tmt-emerald font-black uppercase tracking-[0.2em] mt-0.5">Timeline</p>
          </div>
          <button 
            onClick={handleContactStudent}
            className="flex items-center gap-2 px-3 py-1.5 bg-tmt-emerald text-white rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-tmt-emerald/80 transition-all shadow-lg active:scale-95"
          >
            <Mail className="w-3 h-3" />
            Contact
          </button>
        </div>
        
        <div className="bg-black/40 p-3 rounded-lg border border-white/5 mt-0">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-xl bg-tmt-emerald/20 border border-tmt-emerald/20 flex items-center justify-center font-black text-tmt-emerald text-lg shadow-inner">
                {student.name.charAt(0)}
             </div>
             <div className="min-w-0">
                <p className="text-white font-black text-sm uppercase tracking-tight truncate">{student.name}</p>
                <p className="text-[10px] text-gray-400 font-bold lowercase tracking-wider truncate flex items-center gap-1.5">
                  <Mail className="w-3 h-3 text-tmt-emerald" /> {student.email}
                </p>
             </div>
          </div>
        </div>
      </div>
      
      <div className="p-6 flex-1 overflow-auto scrollbar-hide">
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
            {(student.timelineSteps || []).map((step, index) => {
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

              return (
                <div key={index} className="flex gap-4 items-start group">
                  <div className={`relative z-10 w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 ${bgClass}`}>
                    {step.status === 'pending' ? <div className="w-1.5 h-1.5 rounded-full bg-white/40" /> : <Icon className={`w-3.5 h-3.5 ${textClass}`} />}
                  </div>
                  <div className="pt-0.5">
                    <p className={`text-[11px] uppercase tracking-wide ${labelClass}`}>{step.label}</p>
                    {(step.timestamp || step.timestamp_label) && (
                      <p className="text-[9px] text-gray-400 mt-1 font-mono font-bold">{step.timestamp || step.timestamp_label}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="p-4 bg-black/40 border-t border-white/5">
        <button 
          onClick={() => window.open(`https://dashboard.stripe.com/search?query=${student.email}`, '_blank')}
          className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black text-gray-400 uppercase tracking-widest hover:text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2 group"
        >
          View in Stripe Payment Engine
          <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default TimelinePanel;
