
import React, { useState } from 'react';
import { Student, OnboardingStatus } from '../../types';
import { MoreHorizontal, Plus, CheckCircle2, Trash2, Pencil, ArrowRightLeft, AlertTriangle, X } from 'lucide-react';

interface OnboardingViewProps {
  students: Student[];
  onUpdateStatus: (id: string, status: OnboardingStatus) => void;
  onDeleteStudent: (id: string) => void;
  onAddClick: () => void;
}

const OnboardingView: React.FC<OnboardingViewProps> = ({ students, onUpdateStatus, onDeleteStudent, onAddClick }) => {
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);
  const columns: { id: OnboardingStatus; title: string; color: string }[] = [{ id: 'Not Started', title: 'Pending Setup', color: 'bg-white/20' }, { id: 'In Progress', title: 'Activating', color: 'bg-blue-500' }, { id: 'Completed', title: 'Successfully Deployed', color: 'bg-tmt-emerald' }];
  const getStudentsForColumn = (status: OnboardingStatus) => students.filter(s => s.onboardingStatus === status);

  return (
    <div className="h-full flex flex-col space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div><h2 className="text-3xl font-bold text-white tracking-tight uppercase">Onboarding Pipeline</h2><p className="text-gray-300 text-sm mt-1 font-medium">Monitor and manage the progression of student enrollments.</p></div>
        <button onClick={onAddClick} className="flex items-center gap-2 px-6 py-3 bg-tmt-emerald text-white rounded-2xl text-xs font-bold uppercase tracking-widest shadow-xl active:scale-95"><Plus className="w-4 h-4" /> New Enrollment</button>
      </div>
      <div className="flex-1 overflow-x-auto pb-4">
        <div className="flex gap-8 h-full min-w-[1100px]">
          {columns.map((col) => (
            <div key={col.id} className="flex-1 flex flex-col bg-[#030906] backdrop-blur-xl rounded-[2.5rem] border border-white/10 max-w-md shadow-2xl overflow-hidden">
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                <div className="flex items-center gap-3"><div className={`w-3 h-3 rounded-full ${col.color}`}></div><h3 className="font-bold text-white uppercase tracking-tight text-sm">{col.title}</h3><span className="bg-white/10 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold">{getStudentsForColumn(col.id).length}</span></div>
                <button className="text-gray-400 hover:text-white p-2 hover:bg-white/10 rounded-xl"><MoreHorizontal className="w-5 h-5" /></button>
              </div>
              <div className="p-4 space-y-4 overflow-y-auto flex-1 bg-white/[0.02]">
                {getStudentsForColumn(col.id).map((student) => (
                    <div key={student.id} className="bg-white/10 backdrop-blur-xl p-5 rounded-[2rem] shadow-xl border border-white/10 group hover:border-tmt-emerald/50 transition-all">
                        <div className="flex justify-between items-start mb-4"><span className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-white/10 text-white border border-white/10 uppercase tracking-[0.2em]">{student.program?.name || 'Unknown'}</span>
                            <div className="flex gap-2"><button onClick={() => setStudentToDelete(student)} className="p-1.5 bg-rose-500/10 text-rose-500 border border-rose-500/20 rounded-lg hover:bg-rose-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"><Trash2 className="w-3.5 h-3.5" /></button><button className="p-1.5 bg-white/10 text-gray-400 border border-white/10 rounded-lg hover:text-tmt-emerald transition-all opacity-0 group-hover:opacity-100"><Pencil className="w-3.5 h-3.5" /></button></div>
                        </div>
                        <div className="flex items-center gap-4 mb-6"><div className="w-10 h-10 bg-tmt-emerald/20 border border-tmt-emerald/30 text-tmt-emerald rounded-2xl flex items-center justify-center text-xs font-bold group-hover:scale-110 transition-transform">{student.name.charAt(0)}</div><div className="flex-1 min-w-0"><h4 className="text-sm font-bold text-white group-hover:text-tmt-emerald transition-colors uppercase tracking-tight truncate">{student.name}</h4><p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest truncate">{student.email}</p></div></div>
                        <div className="pt-4 border-t border-white/5 space-y-3">
                            <div className="flex items-center justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest"><span>Update Progression</span><ArrowRightLeft className="w-3.5 h-3.5" /></div>
                            <div className="grid grid-cols-1 gap-2"><select value={student.onboardingStatus} onChange={(e) => onUpdateStatus(student.id, e.target.value as OnboardingStatus)} className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-xl text-[10px] font-bold text-white outline-none appearance-none cursor-pointer"><option value="Not Started" className="bg-tmt-black">Pending Setup</option><option value="In Progress" className="bg-tmt-black">In Progress</option><option value="Completed" className="bg-tmt-black">Completed</option></select></div>
                            {student.onboardingStatus === 'In Progress' && <div className="mt-4 flex items-center gap-2"><div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden"><div className="bg-blue-500 h-full rounded-full" style={{ width: '65%' }}></div></div><span className="text-[9px] font-bold text-blue-400">65%</span></div>}
                            {student.onboardingStatus === 'Completed' && <div className="mt-2 flex items-center gap-2 text-tmt-emerald text-[9px] font-bold uppercase tracking-widest"><CheckCircle2 className="w-3.5 h-3.5" /> Profile Setup Complete</div>}
                        </div>
                    </div>
                ))}
                {getStudentsForColumn(col.id).length === 0 && <div className="py-12 flex flex-col items-center justify-center opacity-20"><Plus className="w-8 h-8 text-white mb-2" /><p className="text-[10px] font-bold uppercase tracking-widest text-white">No items in this stage</p></div>}
              </div>
            </div>
          ))}
        </div>
      </div>
      {studentToDelete && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setStudentToDelete(null)} />
          <div className="relative bg-[#0d1a15] w-full max-w-md rounded-[2.5rem] border border-white/10 shadow-2xl p-10 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-start mb-6"><div className="w-14 h-14 bg-rose-500/10 border border-rose-500/20 rounded-[1.5rem] flex items-center justify-center text-rose-500"><AlertTriangle className="w-7 h-7" /></div><button onClick={() => setStudentToDelete(null)} className="text-gray-500 hover:text-white"><X className="w-6 h-6" /></button></div>
            <h3 className="text-2xl font-bold text-white uppercase tracking-tight">Delete Enrollment?</h3>
            <p className="text-sm text-gray-300 mt-3 font-medium leading-relaxed">Removing <span className="text-white font-bold">{studentToDelete.name}</span> will erase all pipeline history. This action cannot be undone.</p>
            <div className="flex gap-4 mt-10"><button onClick={() => setStudentToDelete(null)} className="flex-1 py-4 bg-white/5 border border-white/10 rounded-2xl text-gray-400 text-[10px] font-bold uppercase tracking-widest">Cancel</button><button onClick={() => { onDeleteStudent(studentToDelete.id); setStudentToDelete(null); }} className="flex-1 py-4 bg-rose-500 text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest">Remove Record</button></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OnboardingView;
