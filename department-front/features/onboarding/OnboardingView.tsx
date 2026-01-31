
import React, { useState } from 'react';
import { Student, OnboardingStatus } from '../../types';
import { MoreHorizontal, Plus, CheckCircle2, Trash2, Pencil, ArrowRightLeft, AlertTriangle, X, User, Mail, BookOpen, Loader2, CheckCircle } from 'lucide-react';

interface OnboardingViewProps {
  students: Student[];
  onUpdateStatus: (id: string, status: OnboardingStatus) => void;
  onDeleteStudent: (id: string) => void;
  onAddStudent: (studentData: {
    name: string;
    email: string;
    discord_handle?: string;
    program_id: number;
    due_date: string;
  }) => Promise<void>;
  onUpdateStudent: (id: string, updates: Partial<Student>) => Promise<void>;
}

const PROGRAMS = [
  { id: 1, name: 'TMT Basic', price: 297.00 },
  { id: 2, name: 'TAT', price: 997.00 },
  { id: 3, name: 'Get Funded', price: 497.00 },
  { id: 4, name: 'Premium', price: 1997.00 },
  { id: 5, name: 'Premium Lite', price: 997.00 },
  { id: 6, name: 'MOM', price: 497.00 },
];

const OnboardingView: React.FC<OnboardingViewProps> = ({ students, onUpdateStatus, onDeleteStudent, onAddStudent, onUpdateStudent }) => {
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);
  const [studentToEdit, setStudentToEdit] = useState<Student | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [notification, setNotification] = useState<{message: string; type: 'success' | 'error'} | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    discord_handle: '',
    program_id: 1,
  });

  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    discord_handle: '',
    program_id: 1,
  });

  const columns: { id: OnboardingStatus; title: string; color: string }[] = [
    { id: 'Not Started', title: 'Pending Setup', color: 'bg-white/20' }, 
    { id: 'In Progress', title: 'Activating', color: 'bg-blue-500' }, 
    { id: 'Completed', title: 'Successfully Deployed', color: 'bg-tmt-emerald' }
  ];
  
  const getStudentsForColumn = (status: OnboardingStatus) => students.filter(s => s.onboardingStatus === status);

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const handleConfirmAdd = async () => {
    setIsLoading(true);
    try {
      const calculatedDueDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      await onAddStudent({
        name: formData.name,
        email: formData.email,
        discord_handle: formData.discord_handle || undefined,
        program_id: formData.program_id,
        due_date: calculatedDueDate,
      });
      setFormData({ name: '', email: '', discord_handle: '', program_id: 1 });
      setShowConfirm(false);
      setIsAddModalOpen(false);
      showNotification(`${formData.name} has been enrolled successfully!`, 'success');
    } catch (error) {
      showNotification('Failed to add student', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentToEdit) return;
    
    setIsLoading(true);
    try {
      await onUpdateStudent(studentToEdit.id, {
        name: editFormData.name,
        email: editFormData.email,
        discord_handle: editFormData.discord_handle,
        program_id: editFormData.program_id,
      });
      setStudentToEdit(null);
      showNotification(`${editFormData.name} has been updated successfully!`, 'success');
    } catch (error) {
      showNotification('Failed to update student', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const openEditModal = (student: Student) => {
    setEditFormData({
      name: student.name,
      email: student.email,
      discord_handle: student.discord_handle || '',
      program_id: student.program_id || student.program?.id || 1,
    });
    setStudentToEdit(student);
  };

  const handleDelete = async () => {
    if (!studentToDelete) return;
    setIsLoading(true);
    try {
      await onDeleteStudent(studentToDelete.id);
      showNotification(`${studentToDelete.name} has been removed from the pipeline.`, 'success');
      setStudentToDelete(null);
    } catch (error) {
      showNotification('Failed to delete student', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (studentId: string, status: OnboardingStatus) => {
    try {
      await onUpdateStatus(studentId, status);
      const student = students.find(s => s.id === studentId);
      showNotification(`${student?.name}'s status updated to ${status}`, 'success');
    } catch (error) {
      showNotification('Failed to update status', 'error');
    }
  };

  return (
    <div className="h-full flex flex-col animate-in fade-in duration-500">
      {/* Success/Error Notification */}
      {notification && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none">
          <div className={`flex items-center gap-3 px-8 py-5 rounded-2xl shadow-2xl border pointer-events-auto animate-in fade-in zoom-in-95 duration-300 ${
            notification.type === 'success' 
              ? 'bg-emerald-500/90 border-emerald-400/30 text-white' 
              : 'bg-rose-500/90 border-rose-400/30 text-white'
          }`}>
            {notification.type === 'success' ? <CheckCircle className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
            <span className="font-bold text-base">{notification.message}</span>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-x-auto pb-4">
        <div className="flex gap-8 h-full min-w-[1100px]">
          {columns.map((col) => (
            <div key={col.id} className="flex-1 flex flex-col bg-[#030906] backdrop-blur-xl rounded-[2.5rem] border border-white/10 max-w-md shadow-2xl overflow-hidden">
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${col.color}`}></div>
                  <h3 className="font-bold text-white uppercase tracking-tight text-sm">{col.title}</h3>
                  <span className="bg-white/10 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold">{getStudentsForColumn(col.id).length}</span>
                </div>
                {col.id === 'Not Started' ? (
                  <button onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-tmt-emerald text-white rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-xl hover:bg-tmt-emerald/80 transition-all">
                    <Plus className="w-3.5 h-3.5" /> Add
                  </button>
                ) : (
                  <button className="text-gray-400 hover:text-white p-2 hover:bg-white/10 rounded-xl">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                )}
              </div>
              <div className="p-4 space-y-4 overflow-y-auto flex-1 bg-white/[0.02]">
                {getStudentsForColumn(col.id).map((student) => (
                  <div key={student.id} className="bg-white/10 backdrop-blur-xl p-5 rounded-[2rem] shadow-xl border border-white/10 group hover:border-tmt-emerald/50 transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-white/10 text-white border border-white/10 uppercase tracking-[0.2em]">
                        {student.program?.name || 'Unknown'}
                      </span>
                      <div className="flex gap-2">
                        <button onClick={() => setStudentToDelete(student)} className="p-1.5 bg-rose-500/10 text-rose-500 border border-rose-500/20 rounded-lg hover:bg-rose-500 hover:text-white transition-all opacity-0 group-hover:opacity-100">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => openEditModal(student)} className="p-1.5 bg-white/10 text-gray-400 border border-white/10 rounded-lg hover:text-tmt-emerald hover:border-tmt-emerald/30 transition-all opacity-0 group-hover:opacity-100">
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-10 h-10 bg-tmt-emerald/20 border border-tmt-emerald/30 text-tmt-emerald rounded-2xl flex items-center justify-center text-xs font-bold group-hover:scale-110 transition-transform">
                        {student.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-white group-hover:text-tmt-emerald transition-colors uppercase tracking-tight truncate">{student.name}</h4>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest truncate">{student.email}</p>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-white/5 space-y-3">
                      <div className="flex items-center justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        <span>Update Progression</span>
                        <ArrowRightLeft className="w-3.5 h-3.5" />
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        <select 
                          value={student.onboardingStatus} 
                          onChange={(e) => handleStatusChange(student.id, e.target.value as OnboardingStatus)} 
                          className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-xl text-[10px] font-bold text-white outline-none appearance-none cursor-pointer"
                        >
                          <option value="Not Started" className="bg-tmt-black">Pending Setup</option>
                          <option value="In Progress" className="bg-tmt-black">In Progress</option>
                          <option value="Completed" className="bg-tmt-black">Completed</option>
                        </select>
                      </div>
                      {student.onboardingStatus === 'In Progress' && (
                        <div className="mt-4 flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div className="bg-blue-500 h-full rounded-full" style={{ width: '65%' }}></div>
                          </div>
                          <span className="text-[9px] font-bold text-blue-400">65%</span>
                        </div>
                      )}
                      {student.onboardingStatus === 'Completed' && (
                        <div className="mt-2 flex items-center gap-2 text-tmt-emerald text-[9px] font-bold uppercase tracking-widest">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Profile Setup Complete
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {getStudentsForColumn(col.id).length === 0 && (
                  <div className="py-12 flex flex-col items-center justify-center opacity-20">
                    <Plus className="w-8 h-8 text-white mb-2" />
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white">No items in this stage</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Student Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={() => !showConfirm && setIsAddModalOpen(false)} />
          <div className="relative bg-[#08211d] w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-white/10 animate-in fade-in zoom-in duration-300">
            <div className="bg-white/5 px-8 py-5 flex items-center justify-between border-b border-white/5">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-tmt-emerald/10 border border-tmt-emerald/20 rounded-2xl">
                  <User className="w-5 h-5 text-tmt-emerald" />
                </div>
                <div>
                  <h2 className="text-white font-black text-xl tracking-tight uppercase">New Enrollment</h2>
                  <p className="text-tmt-emerald/60 text-[10px] uppercase tracking-[0.2em] font-bold">Pipeline Entry</p>
                </div>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-500 hover:text-white p-2 hover:bg-white/10 rounded-xl">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleAddSubmit} className="p-8 space-y-5">
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input required type="text" placeholder="e.g. John Doe" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/5 rounded-2xl text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-4 focus:ring-tmt-emerald/10 focus:border-tmt-emerald/50" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input required type="email" placeholder="e.g. john@example.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/5 rounded-2xl text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-4 focus:ring-tmt-emerald/10 focus:border-tmt-emerald/50" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Program</label>
                <div className="relative">
                  <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <select value={formData.program_id} onChange={(e) => setFormData({...formData, program_id: parseInt(e.target.value)})}
                    className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/5 rounded-2xl text-sm text-white focus:outline-none focus:ring-4 focus:ring-tmt-emerald/10 focus:border-tmt-emerald/50 appearance-none cursor-pointer">
                    {PROGRAMS.map((p) => <option key={p.id} value={p.id} className="bg-[#033a2f]">{p.name} - ${p.price}</option>)}
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Discord Handle <span className="text-gray-600">(Optional)</span></label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">#</span>
                  <input type="text" placeholder="e.g. username#1234" value={formData.discord_handle} onChange={(e) => setFormData({...formData, discord_handle: e.target.value})}
                    className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/5 rounded-2xl text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-4 focus:ring-tmt-emerald/10 focus:border-tmt-emerald/50" />
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="flex-1 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-gray-300 text-sm font-black uppercase tracking-widest hover:bg-white/10">Cancel</button>
                <button type="submit" className="flex-1 px-6 py-4 bg-tmt-emerald border border-tmt-emerald/50 rounded-2xl text-white text-sm font-black uppercase tracking-widest hover:bg-tmt-emerald/80 shadow-xl shadow-tmt-emerald/30">Add to Pipeline</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-gradient-to-b from-[#0f1512] to-[#080a09] border border-white/10 rounded-2xl w-full max-w-sm shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-6 text-center">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Confirm New Enrollment</h3>
              <p className="text-sm text-white/50 mb-6">Are you sure you want to enroll <span className="text-white font-medium">{formData.name}</span>?</p>
              <div className="flex gap-3">
                <button onClick={() => setShowConfirm(false)} disabled={isLoading} className="flex-1 py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-white/70 text-sm font-semibold hover:bg-white/10 disabled:opacity-50">Go Back</button>
                <button onClick={handleConfirmAdd} disabled={isLoading} className="flex-1 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-bold shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 disabled:opacity-70">
                  {isLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Enrolling...</> : 'Confirm'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Student Modal */}
      {studentToEdit && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={() => setStudentToEdit(null)} />
          <div className="relative bg-[#08211d] w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-white/10 animate-in fade-in zoom-in duration-300">
            <div className="bg-white/5 px-8 py-5 flex items-center justify-between border-b border-white/5">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
                  <Pencil className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-white font-black text-xl tracking-tight uppercase">Edit Student</h2>
                  <p className="text-blue-400/60 text-[10px] uppercase tracking-[0.2em] font-bold">Update Record</p>
                </div>
              </div>
              <button onClick={() => setStudentToEdit(null)} className="text-gray-500 hover:text-white p-2 hover:bg-white/10 rounded-xl">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="p-8 space-y-5">
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input required type="text" value={editFormData.name} onChange={(e) => setEditFormData({...editFormData, name: e.target.value})}
                    className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/5 rounded-2xl text-sm text-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input required type="email" value={editFormData.email} onChange={(e) => setEditFormData({...editFormData, email: e.target.value})}
                    className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/5 rounded-2xl text-sm text-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Program</label>
                <div className="relative">
                  <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <select value={editFormData.program_id} onChange={(e) => setEditFormData({...editFormData, program_id: parseInt(e.target.value)})}
                    className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/5 rounded-2xl text-sm text-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 appearance-none cursor-pointer">
                    {PROGRAMS.map((p) => <option key={p.id} value={p.id} className="bg-[#033a2f]">{p.name} - ${p.price}</option>)}
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Discord Handle</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">#</span>
                  <input type="text" value={editFormData.discord_handle} onChange={(e) => setEditFormData({...editFormData, discord_handle: e.target.value})}
                    className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/5 rounded-2xl text-sm text-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50" />
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setStudentToEdit(null)} className="flex-1 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-gray-300 text-sm font-black uppercase tracking-widest hover:bg-white/10">Cancel</button>
                <button type="submit" disabled={isLoading} className="flex-1 px-6 py-4 bg-blue-500 border border-blue-500/50 rounded-2xl text-white text-sm font-black uppercase tracking-widest hover:bg-blue-400 shadow-xl shadow-blue-500/30 flex items-center justify-center gap-2 disabled:opacity-70">
                  {isLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {studentToDelete && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setStudentToDelete(null)} />
          <div className="relative bg-[#0d1a15] w-full max-w-md rounded-[2.5rem] border border-white/10 shadow-2xl p-10 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-start mb-6">
              <div className="w-14 h-14 bg-rose-500/10 border border-rose-500/20 rounded-[1.5rem] flex items-center justify-center text-rose-500">
                <AlertTriangle className="w-7 h-7" />
              </div>
              <button onClick={() => setStudentToDelete(null)} className="text-gray-500 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            <h3 className="text-2xl font-bold text-white uppercase tracking-tight">Delete Enrollment?</h3>
            <p className="text-sm text-gray-300 mt-3 font-medium leading-relaxed">
              Removing <span className="text-white font-bold">{studentToDelete.name}</span> will erase all pipeline history. This action cannot be undone.
            </p>
            <div className="flex gap-4 mt-10">
              <button onClick={() => setStudentToDelete(null)} className="flex-1 py-4 bg-white/5 border border-white/10 rounded-2xl text-gray-400 text-[10px] font-bold uppercase tracking-widest hover:bg-white/10">Cancel</button>
              <button onClick={handleDelete} disabled={isLoading} className="flex-1 py-4 bg-rose-500 text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-rose-600 flex items-center justify-center gap-2 disabled:opacity-70">
                {isLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Deleting...</> : 'Remove Record'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OnboardingView;
