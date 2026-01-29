import React, { useState, useEffect } from 'react';
import { X, User, Mail, BookOpen } from 'lucide-react';
import { apiClient } from '../services/api';

interface Program {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  is_active: boolean;
}

interface CreateStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (studentData: {
    name: string;
    email: string;
    discord_handle?: string;
    program_id: number;
    due_date: string;
  }) => void;
}

const CreateStudentModal: React.FC<CreateStudentModalProps> = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    program_id: 1,
    discord_handle: ''
  });

  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load programs (you'll need to add this API endpoint later)
  useEffect(() => {
    if (isOpen) {
      // For now, use hardcoded programs matching your seeder
      setPrograms([
        { id: 1, name: 'TMT Basic', slug: 'tmt-basic', description: 'TMT Basic trading program', price: 297.00, is_active: true },
        { id: 2, name: 'TAT', slug: 'tat', description: 'Trade And Transform program', price: 997.00, is_active: true },
        { id: 3, name: 'Get Funded', slug: 'get-funded', description: 'Get Funded trading challenge', price: 497.00, is_active: true },
        { id: 4, name: 'Premium', slug: 'premium', description: 'Premium membership with full access', price: 1997.00, is_active: true },
        { id: 5, name: 'Premium Lite', slug: 'premium-lite', description: 'Premium Lite membership', price: 997.00, is_active: true },
        { id: 6, name: 'MOM', slug: 'mom', description: 'Mastery of Markets program', price: 497.00, is_active: true },
      ]);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Calculate a default due date (30 days from now)
      const calculatedDueDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

      const studentData = {
        name: formData.name,
        email: formData.email,
        discord_handle: formData.discord_handle || undefined,
        program_id: formData.program_id,
        due_date: calculatedDueDate,
      };

      await onSave(studentData);
      onClose();
      setFormData({ name: '', email: '', program_id: 1, discord_handle: '' });
    } catch (error) {
      console.error('Error creating student:', error);
    } finally {
      setIsLoading(false);
    }
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
                  placeholder="e.g. john@example.com"
                  className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/5 rounded-2xl text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-4 focus:ring-tmt-emerald/10 focus:border-tmt-emerald/50 transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            {/* Program Selection */}
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Program</label>
              <div className="relative group">
                <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-tmt-emerald transition-colors" />
                <select
                  required
                  className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/5 rounded-2xl text-sm text-white focus:outline-none focus:ring-4 focus:ring-tmt-emerald/10 focus:border-tmt-emerald/50 transition-all appearance-none cursor-pointer"
                  value={formData.program_id}
                  onChange={(e) => setFormData({...formData, program_id: parseInt(e.target.value)})}
                >
                  {programs.map((program) => (
                    <option key={program.id} value={program.id} className="bg-[#033a2f] text-white">
                      {program.name} - ${program.price}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Discord Handle Input */}
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Discord Handle <span className="text-gray-600">(Optional)</span></label>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-tmt-emerald transition-colors text-sm">#</span>
                <input 
                  type="text"
                  placeholder="e.g. username#1234"
                  className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/5 rounded-2xl text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-4 focus:ring-tmt-emerald/10 focus:border-tmt-emerald/50 transition-all"
                  value={formData.discord_handle}
                  onChange={(e) => setFormData({...formData, discord_handle: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-gray-300 text-sm font-black uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-6 py-4 bg-tmt-emerald border border-tmt-emerald/50 rounded-2xl text-white text-sm font-black uppercase tracking-widest hover:bg-tmt-emerald/80 transition-all shadow-xl shadow-tmt-emerald/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating...' : 'Initialize'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateStudentModal;