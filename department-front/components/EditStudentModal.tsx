import React, { useState, useEffect } from 'react';
import { X, User, Mail, Hash, GraduationCap, Calendar, CreditCard, Activity, CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';
import { Student } from '../types';

interface EditStudentModalProps {
  isOpen: boolean;
  student: Student | null;
  onClose: () => void;
  onSave: (id: string, updates: Partial<Student>) => Promise<void>;
}

const EditStudentModal: React.FC<EditStudentModalProps> = ({ isOpen, student, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    discord_handle: '',
    program_id: 1,
    payment_status: 'Pending' as 'Paid' | 'Pending' | 'Failed',
    onboarding_status: 'Not Started' as 'Not Started' | 'In Progress' | 'Completed',
    due_date: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || '',
        email: student.email || '',
        discord_handle: student.discord_handle || '',
        program_id: student.program_id || student.program?.id || 1,
        payment_status: student.paymentStatus || 'Pending',
        onboarding_status: student.onboardingStatus || 'Not Started',
        due_date: student.dueDate || student.due_date || new Date().toISOString().split('T')[0],
      });
    }
  }, [student]);

  if (!isOpen || !student) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const handleConfirmSave = async () => {
    setIsLoading(true);
    try {
      await onSave(student.id, {
        name: formData.name,
        email: formData.email,
        discord_handle: formData.discord_handle,
        program_id: formData.program_id,
        payment_status: formData.payment_status,
        onboarding_status: formData.onboarding_status,
        due_date: formData.due_date,
      });
      setShowConfirm(false);
      onClose();
    } catch (error) {
      console.error('Failed to update student:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = "w-full bg-black/40 border border-white/10 text-white text-sm rounded-xl px-4 py-3 pl-11 outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all placeholder:text-white/30";
  const selectClass = "w-full bg-black/40 border border-white/10 text-white text-sm rounded-xl px-4 py-3 pl-11 outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all appearance-none cursor-pointer";

  return (
    <>
      {/* Main Edit Modal */}
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
        <div className="bg-gradient-to-b from-[#0a0f0d] to-[#050805] border border-white/10 rounded-3xl w-full max-w-lg shadow-2xl shadow-black/50 animate-in zoom-in-95 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <User className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Edit Student</h2>
                <p className="text-xs text-white/40">Update student information</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-xl hover:bg-white/5 text-white/40 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Name */}
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className={inputClass}
              />
            </div>

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
                className={inputClass}
              />
            </div>

            {/* Discord Handle */}
            <div className="relative">
              <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="text"
                name="discord_handle"
                value={formData.discord_handle}
                onChange={handleChange}
                placeholder="Discord Handle (optional)"
                className={inputClass}
              />
            </div>

            {/* Program & Due Date Row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <select
                  name="program_id"
                  value={formData.program_id}
                  onChange={handleChange}
                  className={selectClass}
                >
                  <option value={1}>ELITE</option>
                  <option value={2}>MASTERY</option>
                  <option value={3}>STARTER</option>
                </select>
              </div>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="date"
                  name="due_date"
                  value={formData.due_date}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>
            </div>

            {/* Payment & Onboarding Status Row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <select
                  name="payment_status"
                  value={formData.payment_status}
                  onChange={handleChange}
                  className={selectClass}
                >
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                  <option value="Failed">Failed</option>
                </select>
              </div>
              <div className="relative">
                <Activity className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <select
                  name="onboarding_status"
                  value={formData.onboarding_status}
                  onChange={handleChange}
                  className={selectClass}
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-white/70 text-sm font-semibold hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-bold transition-colors shadow-lg shadow-emerald-500/20"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-gradient-to-b from-[#0f1512] to-[#080a09] border border-white/10 rounded-2xl w-full max-w-sm shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-6 text-center">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Confirm Changes</h3>
              <p className="text-sm text-white/50 mb-6">
                Are you sure you want to save changes to <span className="text-white font-medium">{formData.name}</span>?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirm(false)}
                  disabled={isLoading}
                  className="flex-1 py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-white/70 text-sm font-semibold hover:bg-white/10 transition-colors disabled:opacity-50"
                >
                  Go Back
                </button>
                <button
                  onClick={handleConfirmSave}
                  disabled={isLoading}
                  className="flex-1 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-bold transition-colors shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Confirm'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditStudentModal;
