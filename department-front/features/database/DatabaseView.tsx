
import React, { useEffect, useState } from 'react';
import { CheckCircle, X } from 'lucide-react';
import StudentTable from './StudentTable';
import CreateStudentModalNew from '../../components/CreateStudentModalNew';
import { Student } from '../../types';

interface DatabaseViewProps {
  students: Student[];
  selectedStudentId?: string;
  onSelectStudent: (student: Student) => void;
  onAddStudent: (studentData: {
    name: string;
    email: string;
    discord_handle?: string;
    program_id: number;
    due_date: string;
  }) => void;
  onDeleteStudent: (id: string) => void;
  onUpdateStudent: (id: string, updates: Partial<Student>) => void;
}

const DatabaseView: React.FC<DatabaseViewProps> = ({ 
  students, 
  selectedStudentId, 
  onSelectStudent, 
  onAddStudent, 
  onDeleteStudent,
  onUpdateStudent
}) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = async (studentData: {
    name: string;
    email: string;
    discord_handle?: string;
    program_id: number;
    due_date: string;
  }) => {
    await onAddStudent(studentData);
    setShowSuccess(true);
    setIsCreateModalOpen(false);
  };

  useEffect(() => {
    if (!showSuccess) return;
    const timer = setTimeout(() => setShowSuccess(false), 3200);
    return () => clearTimeout(timer);
  }, [showSuccess]);

  return (
    <div className="flex-1 flex flex-col min-h-0 animate-in fade-in duration-500 px-4 md:px-6 lg:px-10">
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pointer-events-none">
          <div className="mt-12 flex items-start gap-3 px-5 py-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-400 text-white shadow-[0_20px_60px_rgba(16,185,129,0.45)] border border-white/10 animate-in fade-in slide-in-from-top-4 pointer-events-auto">
            <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div className="pr-4">
              <p className="text-sm font-semibold">Added successfully</p>
              <p className="text-xs text-emerald-50/90">Record saved and synced.</p>
            </div>
            <button 
              aria-label="Close success toast"
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setShowSuccess(false)}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
      <StudentTable 
        students={students} 
        onSelectStudent={onSelectStudent}
        onDeleteStudent={onDeleteStudent}
        onUpdateStudent={onUpdateStudent}
        selectedStudentId={selectedStudentId}
        onAddClick={() => setIsCreateModalOpen(true)}
      />
      
      <CreateStudentModalNew 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
};

export default DatabaseView;
