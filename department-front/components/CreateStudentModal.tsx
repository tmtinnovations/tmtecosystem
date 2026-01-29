
import React, { useState } from 'react';
import { X, User, Mail, Shield, BookOpen, CheckCircle2 } from 'lucide-react';
import { Student, ProgramType } from '../types';

interface CreateStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (student: Student) => void;
}

const CreateStudentModal: React.FC<CreateStudentModalProps> = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    program: 'TMT Basic' as ProgramType,
    discordHandle: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Calculate a default due date (30 days from now) for the new student record
    const calculatedDueDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const newStudent: Student = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name,
      email: formData.email,
      program: formData.program,
      paymentStatus: 'Pending',
      onboardingStatus: 'Not Started',
      discordRoleAssigned: false,
      joinedDate: new Date().toISOString().split('T')[0],
      dueDate: calculatedDueDate,
      timelineSteps: [
        { label: 'Form Submitted', status: 'completed', timestamp: 'Just now' },
        { label: 'Payment Verification', status: 'current', timestamp: 'Awaiting...' },
        { label: 'Auto Logged', status: 'pending' },
        { label: 'Role Assigned', status: 'pending' },
      ]
    };

    onSave(newStudent);
    onClose();
    setFormData({ name: '', email: '', program: 'TMT Basic', discordHandle: '' });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div 
        className="absolute inset-0 bg-tmt-black/90 backdrop-blur-md transition-opacity" 
        onClick={onClose} 
      />
      
      <div className="relative bg-[#033a2f] w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/10 transform transition-all animate-in fade-in zoom-in duration-300">
        {/* Modal Header */}
        <div className="bg-white/5 px-8 py-6 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-tmt-emerald/10 border border-tmt-emerald/20 rounded-2xl shadow-lg shadow-tmt-emerald/10">
              <User className="w-5 h-5 text-tmt-emerald" />
            </div>
            <div>
              <h2 className="text-white font-black text-xl tracking-tight uppercase">New Enrollment</h2>
              <p className="text-tmt-emerald/60 text-[10px] uppercase tracking-[0.2em] font-bold">Manual Record Entry</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-xl"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-5">
            {/* Name Input */}
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-tmt-emerald transition-colors" />
                <input 
                  required
                  type="text"
                  placeholder="e.g. John Doe"
                  className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/5 rounded-2xl text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-4 focus:ring-tmt-emerald/10 focus:border-tmt-emerald/50 transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-tmt-emerald transition-colors" />
                <input 
                  required
                  type="email"
                  placeholder="john@example.com"
                  className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/5 rounded-2xl text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-4 focus:ring-tmt-emerald/10 focus:border-tmt-emerald/50 transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {/* Program Selection */}
                <div className="space-y-2">
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Program</label>
                    <div className="relative group">
                        <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-tmt-emerald transition-colors" />
                        <select 
                        className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/5 rounded-2xl text-sm text-white focus:outline-none focus:ring-4 focus:ring-tmt-emerald/10 focus:border-tmt-emerald/50 transition-all appearance-none"
                        value={formData.program}
                        onChange={(e) => setFormData({...formData, program: e.target.value as ProgramType})}
                        >
                        <option value="TMT Basic">TMT Basic</option>
                        <option value="TAT">TAT</option>
                        <option value="Get Funded">Get Funded</option>
                        <option value="Premium">Premium</option>
                        <option value="Premium Lite">Premium Lite</option>
                        <option value="MOM">MOM</option>
                        </select>
                    </div>
                </div>

                {/* Discord Handle */}
                <div className="space-y-2">
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Discord ID</label>
                    <div className="relative group">
                        <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-tmt-emerald transition-colors" />
                        <input 
                        type="text"
                        placeholder="user#1234"
                        className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/5 rounded-2xl text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-4 focus:ring-tmt-emerald/10 focus:border-tmt-emerald/50 transition-all"
                        value={formData.discordHandle}
                        onChange={(e) => setFormData({...formData, discordHandle: e.target.value})}
                        />
                    </div>
                </div>
            </div>
          </div>

          <div className="pt-6 flex gap-4">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 py-4 px-4 rounded-[1.5rem] border border-white/5 text-gray-400 text-[10px] font-black uppercase tracking-widest hover:bg-white/5 hover:text-white transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-2 py-4 px-8 rounded-[1.5rem] bg-tmt-emerald text-white text-[10px] font-black uppercase tracking-widest hover:bg-tmt-emerald/90 transition-all shadow-xl shadow-tmt-emerald/20 flex items-center justify-center gap-3 border border-tmt-emerald/20 flex-[2]"
            >
              <CheckCircle2 className="w-4 h-4" />
              Initialize Automation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateStudentModal;