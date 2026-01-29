
import React, { useState } from 'react';
import { Student, OnboardingStatus } from '../types';
import { 
  MoreHorizontal, 
  Plus, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  Trash2, 
  Pencil, 
  ArrowRightLeft,
  AlertTriangle,
  X
} from 'lucide-react';

interface OnboardingViewProps {
  students: Student[];
  onUpdateStatus: (id: string, status: OnboardingStatus) => void;
  onDeleteStudent: (id: string) => void;
  onAddClick: () => void;
}

const OnboardingView: React.FC<OnboardingViewProps> = ({ students, onUpdateStatus, onDeleteStudent, onAddClick }) => {
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);

  const columns: { id: OnboardingStatus; title: string; color: string }[] = [
    { id: 'Not Started', title: 'Awaiting Action', color: 'bg-white/20' },
    { id: 'In Progress', title: 'Processing', color: 'bg-blue-500' },
    { id: 'Completed', title: 'Deployment Success', color: 'bg-tmt-emerald' }
  ];

  const getStudentsForColumn = (status: OnboardingStatus) => {
    return students.filter(s => s.onboardingStatus === status);
  };

  const confirmDelete = () => {
    if (studentToDelete) {
      onDeleteStudent(studentToDelete.id);
      setStudentToDelete(null);
    }
  };

  return (
    <div className="h-full flex flex-col space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight uppercase">Onboarding Pipeline</h2>
          <p className="text-gray-300 text-sm mt-1 font-bold">Manage student lifecycle and automation states.</p>
        </div>
        <button 
          onClick={onAddClick}
          className="flex items-center gap-2 px-6 py-3 bg-tmt-emerald text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-tmt-emerald/80 transition-all shadow-xl shadow-tmt-emerald/20 active:scale-95"
        >
          <Plus className="w-4 h-4" /> Initialize Task
        </button>
      </div>

      <div className="flex-1 overflow-x-auto pb-4">
        <div className="flex gap-8 h-full min-w-[1100px]">
          {columns.map((col) => (
            <div key={col.id} className="flex-1 flex flex-col bg-tmt-black/40 backdrop-blur-md rounded-[2.5rem] border border-white/10 max-w-md shadow-2xl overflow-hidden">
              {/* Column Header */}
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${col.color} shadow-[0_0_10px_currentColor]`}></div>
                    <h3 className="font-black text-white uppercase tracking-tight text-sm">{col.title}</h3>
                    <span className="bg-white/10 text-white px-2.5 py-1 rounded-lg text-[10px] font-black border border-white/10">
                        {getStudentsForColumn(col.id).length}
                    </span>
                </div>
                <button className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-xl">
                    <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
              
              {/* Column Content */}
              <div className="p-4 space-y-4 overflow-y-auto flex-1 bg-white/[0.02]">
                {getStudentsForColumn(col.id).map((student) => (
                    <div key={student.id} className="bg-white/5 p-5 rounded-[2rem] shadow-xl border border-white/10 group hover:bg-white/10 hover:border-tmt-emerald/50 transition-all">
                        {/* Top Metadata */}
                        <div className="flex justify-between items-start mb-4">
                            <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg bg-white/10 text-white border border-white/10 uppercase tracking-[0.2em]`}>
                                {student.program?.name || 'Unknown'}
                            </span>
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => setStudentToDelete(student)}
                                    className="p-1.5 bg-rose-500/10 text-rose-500 border border-rose-500/20 rounded-lg hover:bg-rose-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                                <button className="p-1.5 bg-white/10 text-gray-400 border border-white/10 rounded-lg hover:text-tmt-emerald transition-all opacity-0 group-hover:opacity-100">
                                    <Pencil className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>

                        {/* Student Identity */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-10 h-10 bg-tmt-emerald/20 border border-tmt-emerald/30 text-tmt-emerald rounded-2xl flex items-center justify-center text-xs font-black group-hover:scale-110 transition-transform">
                                {student.name.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-black text-white group-hover:text-tmt-emerald transition-colors uppercase tracking-tight truncate">{student.name}</h4>
                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest truncate">{student.email}</p>
                            </div>
                        </div>

                        {/* Status Update Actions */}
                        <div className="pt-4 border-t border-white/5 space-y-3">
                            <div className="flex items-center justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                <span>Lifecycle Transition</span>
                                <ArrowRightLeft className="w-3.5 h-3.5" />
                            </div>
                            
                            <div className="grid grid-cols-1 gap-2">
                                <select 
                                    value={student.onboardingStatus}
                                    onChange={(e) => onUpdateStatus(student.id, e.target.value as OnboardingStatus)}
                                    className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-xl text-[10px] font-black text-white uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-tmt-emerald/30 appearance-none cursor-pointer hover:bg-black/60 transition-all"
                                >
                                    <option value="Not Started" className="bg-tmt-black">Awaiting Action</option>
                                    <option value="In Progress" className="bg-tmt-black">In Progress</option>
                                    <option value="Completed" className="bg-tmt-black">Completed</option>
                                </select>
                            </div>

                            {student.onboardingStatus === 'In Progress' && (
                                <div className="mt-4 flex items-center gap-2">
                                    <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                                        <div className="bg-blue-500 h-full rounded-full animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.5)]" style={{ width: '65%' }}></div>
                                    </div>
                                    <span className="text-[9px] font-black text-blue-400">65%</span>
                                </div>
                            )}

                            {student.onboardingStatus === 'Completed' && (
                                <div className="mt-2 flex items-center gap-2 text-tmt-emerald text-[9px] font-black uppercase tracking-widest">
                                    <CheckCircle2 className="w-3.5 h-3.5" /> System Deployment Success
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                
                {getStudentsForColumn(col.id).length === 0 && (
                    <div className="py-12 flex flex-col items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity">
                        <Plus className="w-8 h-8 text-white mb-2" />
                        <p className="text-[10px] font-black uppercase tracking-widest text-white">No tasks queued</p>
                    </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Confirmation Modal */}
      {studentToDelete && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setStudentToDelete(null)} />
          <div className="relative bg-[#0d1a15] w-full max-w-md rounded-[2.5rem] border border-white/10 shadow-2xl p-10 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-start mb-6">
              <div className="w-14 h-14 bg-rose-500/10 border border-rose-500/20 rounded-[1.5rem] flex items-center justify-center text-rose-500">
                <AlertTriangle className="w-7 h-7" />
              </div>
              <button onClick={() => setStudentToDelete(null)} className="text-gray-500 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <h3 className="text-2xl font-black text-white uppercase tracking-tight">Erase Lifecycle?</h3>
            <p className="text-sm text-gray-300 mt-3 font-medium leading-relaxed">
              Removing <span className="text-white font-black">{studentToDelete.name}</span> will purge all automation logs and pipeline data. This action is irreversible.
            </p>

            <div className="flex gap-4 mt-10">
              <button 
                onClick={() => setStudentToDelete(null)}
                className="flex-1 py-4 px-4 bg-white/5 border border-white/10 rounded-2xl text-gray-400 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all"
              >
                Abort
              </button>
              <button 
                onClick={confirmDelete}
                className="flex-1 py-4 px-4 bg-rose-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 transition-all shadow-xl shadow-rose-500/30"
              >
                Erase Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OnboardingView;
