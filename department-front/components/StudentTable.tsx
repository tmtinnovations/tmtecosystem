
import React, { useState } from 'react';
import { Student, ProgramType } from '../types';
import { Search, CheckCircle2, XCircle, UserPlus, Mail, Pencil, Trash2, AlertTriangle, X } from 'lucide-react';

interface StudentTableProps {
  students: Student[];
  onSelectStudent: (student: Student) => void;
  onDeleteStudent: (id: string) => void;
  selectedStudentId?: string;
  onAddClick: () => void;
}

const StudentTable: React.FC<StudentTableProps> = ({ students, onSelectStudent, onDeleteStudent, selectedStudentId, onAddClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProgram, setFilterProgram] = useState<ProgramType | 'All'>('All');
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProgram = filterProgram === 'All' || student.program?.name === filterProgram;
    return matchesSearch && matchesProgram;
  });

  const getStatusBadge = (status: string, type: 'payment' | 'onboarding' | 'role') => {
    if (type === 'role') {
        return status === 'true' 
            ? <div className="flex items-center gap-1.5 text-tmt-emerald font-black text-[9px] uppercase tracking-wider"><CheckCircle2 className="w-3.5 h-3.5" /> Assigned</div>
            : <div className="flex items-center gap-1.5 text-gray-500 font-black text-[9px] uppercase tracking-wider"><XCircle className="w-3.5 h-3.5" /> None</div>;
    }

    let baseClasses = "px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all shadow-sm";
    let colorClasses = "";

    if (status === 'Paid' || status === 'Completed') {
        colorClasses = "bg-tmt-emerald/20 text-tmt-emerald border-tmt-emerald/30";
    } else if (status === 'Pending' || status === 'In Progress') {
        colorClasses = "bg-amber-500/20 text-amber-500 border-amber-500/30";
    } else if (status === 'Failed' || status === 'Not Started') {
        colorClasses = "bg-rose-500/20 text-rose-500 border-rose-500/30";
    }

    return (
      <span className={`${baseClasses} ${colorClasses}`}>
        {status}
      </span>
    );
  };

  const confirmDelete = () => {
    if (studentToDelete) {
      onDeleteStudent(studentToDelete.id);
      setStudentToDelete(null);
    }
  };

  return (
    <div className="bg-zinc-950/60 backdrop-blur-md rounded-[2.5rem] shadow-2xl border border-white/10 flex flex-col h-full overflow-hidden">
      <div className="p-8 border-b border-white/10 flex flex-col md:flex-row gap-6 justify-between items-center bg-white/[0.02]">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-4">
             <h3 className="text-xl font-black text-white tracking-tight uppercase">Database Hub</h3>
             <span className="bg-white/5 text-gray-400 text-[10px] font-black px-2.5 py-1 rounded-lg border border-white/10">
                {filteredStudents.length} RECORDS
             </span>
          </div>
          <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-black">Real-time automation ecosystem</p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-tmt-emerald" />
            <input
              type="text"
              placeholder="Filter master records..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 text-xs font-bold bg-white/5 border border-white/5 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-tmt-emerald/10 transition-all outline-none"
            />
          </div>
          <button 
            onClick={onAddClick}
            className="flex items-center gap-2 px-6 py-3.5 bg-tmt-emerald text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-tmt-emerald/80 transition-all shadow-xl shadow-tmt-emerald/30 active:scale-95 whitespace-nowrap"
          >
            <UserPlus className="w-4 h-4" />
            Enroll New
          </button>
        </div>
      </div>

      <div className="px-8 py-4 border-b border-white/10 flex gap-2 overflow-x-auto bg-black scrollbar-hide">
        {(['All', 'TMT Basic', 'TAT', 'Get Funded', 'Premium', 'Premium Lite', 'MOM'] as const).map(prog => (
            <button 
                key={prog}
                onClick={() => setFilterProgram(prog)}
                className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl border transition-all whitespace-nowrap
                    ${filterProgram === prog 
                        ? 'bg-white text-black border-white shadow-lg' 
                        : 'bg-transparent text-gray-500 border-white/5 hover:border-white/20 hover:text-white'}`}
            >
                {prog}
            </button>
        ))}
      </div>

      <div className="overflow-auto flex-1">
        <table className="w-full text-left border-separate border-spacing-0">
          <thead className="bg-black sticky top-0 z-10 shadow-sm">
            <tr>
              <th className="px-8 py-5 text-[9px] uppercase tracking-[0.2em] font-black text-gray-500">Identity</th>
              <th className="px-8 py-5 text-[9px] uppercase tracking-[0.2em] font-black text-gray-500">Program</th>
              <th className="px-8 py-5 text-[9px] uppercase tracking-[0.2em] font-black text-gray-500">Payment</th>
              <th className="px-8 py-5 text-[9px] uppercase tracking-[0.2em] font-black text-gray-500">Pipeline</th>
              <th className="px-8 py-5 text-center text-[9px] uppercase tracking-[0.2em] font-black text-gray-500">Discord</th>
              <th className="px-8 py-5 text-right text-[9px] uppercase tracking-[0.2em] font-black text-gray-500">Command</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredStudents.map((student) => (
              <tr 
                key={student.id} 
                onClick={() => onSelectStudent(student)}
                className={`group hover:bg-white/[0.03] transition-all cursor-pointer relative
                    ${selectedStudentId === student.id ? 'bg-white/[0.05]' : ''}
                `}
              >
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center font-black text-tmt-emerald group-hover:bg-tmt-emerald group-hover:text-white transition-all">
                        {student.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                        <p className="font-black text-white text-sm group-hover:text-tmt-emerald transition-colors uppercase tracking-tight truncate">{student.name}</p>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest truncate mt-0.5">{student.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 bg-white/5 border border-white/10 px-2.5 py-1.5 rounded-lg">{student.program?.name || 'Unknown'}</span>
                </td>
                <td className="px-8 py-6">
                  {getStatusBadge(student.paymentStatus, 'payment')}
                </td>
                <td className="px-8 py-6">
                  {getStatusBadge(student.onboardingStatus, 'onboarding')}
                </td>
                <td className="px-8 py-6 text-center">
                  <div className="flex justify-center">
                    {getStatusBadge(student.discordRoleAssigned ? 'true' : 'false', 'role')}
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                        <button 
                          className="p-2.5 bg-white/5 border border-white/5 rounded-xl hover:border-tmt-emerald hover:text-white hover:bg-tmt-emerald transition-all shadow-sm"
                          onClick={(e) => e.stopPropagation()}
                          title="Edit Record"
                        >
                            <Pencil className="w-4 h-4" />
                        </button>
                        <button 
                          className="p-2.5 bg-white/5 border border-white/5 rounded-xl hover:border-rose-500 hover:text-white hover:bg-rose-500 transition-all shadow-sm"
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            setStudentToDelete(student);
                          }}
                          title="Purge Record"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredStudents.length === 0 && (
            <div className="flex flex-col items-center justify-center py-32 bg-black/20">
                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-[2rem] flex items-center justify-center mb-4 text-gray-700">
                    <Search className="w-8 h-8" />
                </div>
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">No matching telemetry found</p>
                <button onClick={() => {setSearchTerm(''); setFilterProgram('All');}} className="mt-4 text-[9px] font-black text-tmt-emerald hover:text-white uppercase tracking-widest bg-tmt-emerald/10 px-4 py-2 rounded-xl transition-all border border-tmt-emerald/20">Reset Core Filters</button>
            </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {studentToDelete && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity" onClick={() => setStudentToDelete(null)} />
          <div className="relative bg-[#0d0d0d] w-full max-w-md rounded-[3rem] border border-white/10 shadow-2xl p-10 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-start mb-8">
              <div className="w-16 h-16 bg-rose-500/10 border border-rose-500/20 rounded-[1.5rem] flex items-center justify-center text-rose-500 shadow-xl shadow-rose-500/5">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <button onClick={() => setStudentToDelete(null)} className="p-2 text-gray-600 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <h3 className="text-2xl font-black text-white uppercase tracking-tight">Purge Record?</h3>
            <p className="text-sm text-gray-400 mt-4 font-medium leading-relaxed">
              Are you sure you want to erase <span className="text-white font-black">{studentToDelete.name}</span>? This bypasses standard protocols and is permanent.
            </p>

            <div className="flex gap-4 mt-10">
              <button 
                onClick={() => setStudentToDelete(null)}
                className="flex-1 py-4 px-4 bg-white/5 border border-white/10 rounded-2xl text-gray-500 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all"
              >
                Abort
              </button>
              <button 
                onClick={confirmDelete}
                className="flex-1 py-4 px-4 bg-rose-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 transition-all shadow-xl shadow-rose-500/30 border border-rose-400/20"
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

export default StudentTable;
