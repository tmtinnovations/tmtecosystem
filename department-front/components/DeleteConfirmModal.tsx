import React from 'react';
import { AlertTriangle, Loader2, Trash2 } from 'lucide-react';
import { Student } from '../types';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  student: Student | null;
  isLoading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ 
  isOpen, 
  student, 
  isLoading, 
  onClose, 
  onConfirm 
}) => {
  if (!isOpen || !student) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-gradient-to-b from-[#12100f] to-[#0a0908] border border-rose-500/20 rounded-2xl w-full max-w-sm shadow-2xl shadow-rose-500/10 animate-in zoom-in-95 duration-300">
        <div className="p-6 text-center">
          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-rose-400" />
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-white mb-2">Delete Student Record</h3>
          
          {/* Description */}
          <p className="text-sm text-white/50 mb-2">
            Are you sure you want to delete
          </p>
          <p className="text-base font-semibold text-rose-400 mb-1">{student.name}</p>
          <p className="text-xs text-white/30 mb-6">{student.email}</p>

          {/* Warning */}
          <div className="bg-rose-500/5 border border-rose-500/10 rounded-xl p-3 mb-6">
            <p className="text-xs text-rose-300/80">
              ⚠️ This action cannot be undone. All associated data will be permanently removed.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-white/70 text-sm font-semibold hover:bg-white/10 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className="flex-1 py-3 px-4 rounded-xl bg-rose-500 hover:bg-rose-400 text-white text-sm font-bold transition-colors shadow-lg shadow-rose-500/20 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4" />
                  Delete
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
