
import React, { useEffect, useState } from 'react';
import { CheckCircle, X } from 'lucide-react';
import StudentTable from './StudentTable';
import CreateStudentModalNew from '../../components/CreateStudentModalNew';
import EditStudentModal from '../../components/EditStudentModal';
import DeleteConfirmModal from '../../components/DeleteConfirmModal';
import SuccessNotification from '../../components/SuccessNotification';
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
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [deletingStudent, setDeletingStudent] = useState<Student | null>(null);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  
  // Success notification state
  const [notification, setNotification] = useState<{
    isVisible: boolean;
    type: 'success' | 'error' | 'warning';
    title: string;
    message: string;
  }>({ isVisible: false, type: 'success', title: '', message: '' });

  const showNotification = (type: 'success' | 'error' | 'warning', title: string, message: string) => {
    setNotification({ isVisible: true, type, title, message });
  };

  const handleSave = async (studentData: {
    name: string;
    email: string;
    discord_handle?: string;
    program_id: number;
    due_date: string;
  }) => {
    await onAddStudent(studentData);
    setIsCreateModalOpen(false);
    showNotification('success', 'Student Added!', `${studentData.name} has been successfully enrolled.`);
  };

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
  };

  const handleUpdateStudent = async (id: string, updates: Partial<Student>) => {
    await onUpdateStudent(id, updates);
    setEditingStudent(null);
    showNotification('success', 'Updated Successfully!', 'Student information has been saved.');
  };

  const handleDeleteClick = (student: Student) => {
    setDeletingStudent(student);
  };

  const handleConfirmDelete = async () => {
    if (!deletingStudent) return;
    setIsDeleteLoading(true);
    try {
      await onDeleteStudent(deletingStudent.id);
      showNotification('warning', 'Record Deleted', `${deletingStudent.name} has been removed from the database.`);
      setDeletingStudent(null);
    } catch (error) {
      showNotification('error', 'Delete Failed', 'Could not delete the student record.');
    } finally {
      setIsDeleteLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 animate-in fade-in duration-500 px-4 md:px-6 lg:px-10">
      {/* Success/Error Notification */}
      <SuccessNotification
        isVisible={notification.isVisible}
        type={notification.type}
        title={notification.title}
        message={notification.message}
        onClose={() => setNotification(prev => ({ ...prev, isVisible: false }))}
      />

      <StudentTable 
        students={students} 
        onSelectStudent={onSelectStudent}
        onEditStudent={handleEditStudent}
        onDeleteStudent={handleDeleteClick}
        onUpdateStudent={onUpdateStudent}
        selectedStudentId={selectedStudentId}
        onAddClick={() => setIsCreateModalOpen(true)}
      />
      
      {/* Create Modal */}
      <CreateStudentModalNew 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleSave}
      />

      {/* Edit Modal */}
      <EditStudentModal
        isOpen={!!editingStudent}
        student={editingStudent}
        onClose={() => setEditingStudent(null)}
        onSave={handleUpdateStudent}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={!!deletingStudent}
        student={deletingStudent}
        isLoading={isDeleteLoading}
        onClose={() => setDeletingStudent(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default DatabaseView;
