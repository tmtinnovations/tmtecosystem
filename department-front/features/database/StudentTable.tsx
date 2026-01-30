import React, { useMemo, useState } from 'react';
import { Student, ProgramType, OnboardingStatus } from '../../types';
import StudentDashboardHeader from './StudentDashboardHeader';
import {
  Pencil,
  Trash2,
  AlertTriangle,
  Filter,
  BellRing,
  ShieldCheck,
  ShieldAlert,
  Users,
  GraduationCap,
  BookOpen
} from 'lucide-react';

interface StudentTableProps {
  students: Student[];
  onSelectStudent: (student: Student) => void;
  onDeleteStudent: (id: string) => void;
  onUpdateStudent?: (id: string, updates: Partial<Student>) => void;
  selectedStudentId?: string;
  onAddClick: () => void;
}

const StudentTable: React.FC<StudentTableProps> = ({
  students,
  onSelectStudent,
  onDeleteStudent,
  onUpdateStudent,
  selectedStudentId,
  onAddClick
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProgram, setFilterProgram] = useState<ProgramType | 'All'>('All');
  const [filterOnboarding, setFilterOnboarding] = useState<OnboardingStatus | 'All'>('All');
  const [filterDiscord, setFilterDiscord] = useState<'All' | 'Assigned' | 'Not Assigned'>('All');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const toggleSort = () => {
    if (sortDirection === 'asc') setSortDirection('desc');
    else if (sortDirection === 'desc') setSortDirection(null);
    else setSortDirection('asc');
  };

  const filteredAndSortedStudents = useMemo(() => {
    let result = students.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesProgram = filterProgram === 'All' || student.program?.name === filterProgram;
      const matchesOnboarding = filterOnboarding === 'All' || student.onboardingStatus === filterOnboarding;
      const matchesDiscord = filterDiscord === 'All' ||
        (filterDiscord === 'Assigned' ? student.discordRoleAssigned : !student.discordRoleAssigned);

      return matchesSearch && matchesProgram && matchesOnboarding && matchesDiscord;
    });

    if (sortDirection) {
      result.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (sortDirection === 'asc') return nameA.localeCompare(nameB);
        return nameB.localeCompare(nameA);
      });
    }

    return result;
  }, [students, searchTerm, filterProgram, filterOnboarding, filterDiscord, sortDirection]);

  const hasActiveFilters = filterProgram !== 'All' || filterDiscord !== 'All' || filterOnboarding !== 'All' || searchTerm !== '' || sortDirection !== null;
  const paidCount = students.filter(student => student.paymentStatus === 'Paid').length;
  const onboardingCompleted = students.filter(student => student.onboardingStatus === 'Completed').length;
  const discordSynced = students.filter(student => student.discordRoleAssigned).length;
  const verificationRate = students.length ? Math.round((paidCount / students.length) * 100) : 0;
  const onboardingRate = students.length ? Math.round((onboardingCompleted / students.length) * 100) : 0;
  const discordRate = students.length ? Math.round((discordSynced / students.length) * 100) : 0;

  const handleExport = () => {
    const csvContent = [
      ['Name', 'Email', 'Program', 'Payment Status', 'Onboarding Status', 'Discord Roles'],
      ...filteredAndSortedStudents.map(student => [
        student.name,
        student.email,
        student.program?.name || 'N/A',
        student.paymentStatus,
        student.onboardingStatus,
        student.discordRoleAssigned ? 'Assigned' : 'Pending'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `student-ledger-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const stats = [
    {
      label: 'Active Cohort',
      value: students.length.toString(),
      helper: '+12 this cycle',
      icon: Users,
      accent: 'from-emerald-500/70 to-emerald-500/10'
    },
    {
      label: 'Payment Integrity',
      value: `${verificationRate}%`,
      helper: `${paidCount} verified`,
      icon: GraduationCap,
      accent: 'from-sky-500/70 to-sky-500/10'
    },
    {
      label: 'Onboarding Completion',
      value: `${onboardingRate}%`,
      helper: `${onboardingCompleted} cleared`,
      icon: BookOpen,
      accent: 'from-amber-500/70 to-amber-500/10'
    }
  ];

  const onboardingBadgeClass = (status: OnboardingStatus) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-500/10 text-emerald-300 border-emerald-400/30';
      case 'In Progress':
        return 'bg-amber-500/10 text-amber-300 border-amber-400/30';
      default:
        return 'bg-white/5 text-white/60 border-white/15';
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#030906] text-white relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.05),transparent_40%)] pointer-events-none" />
      
      {/* Sticky Header Section matching PaymentsView logic */}
      <div className="sticky top-0 z-[60] px-4 pt-2 pb-2 bg-[#030906]">
        <StudentDashboardHeader
            onExport={handleExport}
            onAddClick={onAddClick}
            stats={stats}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            showFilters={showFilters}
            onToggleFilters={() => setShowFilters(v => !v)}
            onResetFilters={() => { setSearchTerm(''); setFilterProgram('All'); setFilterOnboarding('All'); setFilterDiscord('All'); setSortDirection(null); }}
            filterProgram={filterProgram}
            onFilterProgramChange={setFilterProgram}
            filterOnboarding={filterOnboarding}
            onFilterOnboardingChange={setFilterOnboarding}
            filterDiscord={filterDiscord}
            onFilterDiscordChange={setFilterDiscord}
        />

        {/* Fixed Table Header */}
        <div className="hidden lg:block bg-[#030906] border border-white/5 rounded-2xl mt-2 overflow-hidden">
             <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[1000px]" style={{tableLayout: 'fixed'}}>
                    <colgroup>
                        <col style={{width: '20%'}} />
                        <col style={{width: '14%'}} />
                        <col style={{width: '16%'}} />
                        <col style={{width: '16%'}} />
                        <col style={{width: '18%'}} />
                        <col style={{width: '16%'}} />
                    </colgroup>
                    <thead>
                        <tr>
                        <th className="px-8 py-2 text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Student Identity</th>
                        <th className="px-8 py-2 text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Program</th>
                        <th className="px-8 py-2 text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Payment</th>
                        <th className="px-8 py-2 text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Onboarding</th>
                        <th className="px-8 py-2 text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Discord</th>
                        <th className="px-8 py-2 text-right">
                            <div className="flex items-center justify-end gap-3">
                                <button
                                    onClick={handleExport}
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-medium text-white/50 hover:text-white transition whitespace-nowrap"
                                >
                                    <span className="hidden xl:inline">Export Matrix</span>
                                    <span className="xl:hidden">Export</span>
                                </button>
                                <button
                                    onClick={onAddClick}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black text-[10px] font-bold uppercase tracking-wider transition shadow-lg shadow-emerald-900/20 whitespace-nowrap"
                                >
                                    <Users className="w-3.5 h-3.5" />
                                    <span>Add Record</span>
                                </button>
                            </div>
                        </th>
                        </tr>
                    </thead>
                </table>
             </div>
        </div>
      </div>

      {/* Scrollable Table Body Content */}
      <div className="hidden lg:block relative flex-1 min-h-0 bg-[#030906]">
        <div className="h-full pb-4 overflow-y-auto bg-[#030906]">
          <div className="overflow-x-auto px-4">
            <table className="w-full text-left border-separate border-spacing-0 min-w-[1000px]" style={{tableLayout: 'fixed'}}>
            <colgroup>
              <col style={{width: '20%'}} />
              <col style={{width: '14%'}} />
              <col style={{width: '16%'}} />
              <col style={{width: '16%'}} />
              <col style={{width: '18%'}} />
              <col style={{width: '16%'}} />
            </colgroup>
            <tbody className="divide-y divide-white/5">
              {filteredAndSortedStudents.map((student) => {
                const dueDate = student.dueDate || student.due_date || new Date().toISOString().split('T')[0];
                const due = new Date(dueDate);
                const remainingDays = Math.ceil((due.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                const isOverdue = remainingDays <= 0;
                const dueCopy = isOverdue ? 'Overdue' : `Due in ${remainingDays}d`;

                return (
                  <tr 
                    key={student.id} 
                    className={`group transition-colors cursor-pointer ${selectedStudentId === student.id ? 'bg-emerald-500/5' : 'hover:bg-white/[0.02]'}`}
                    onClick={() => onSelectStudent(student)}
                  >
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center font-bold text-xs ${selectedStudentId === student.id ? 'bg-emerald-500/20 text-emerald-300' : 'bg-white/5 text-emerald-300/60'}`}>
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-white text-xs">{student.name}</div>
                          <div className="text-[10px] text-white/40">{student.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-4">
                       <span className="text-[10px] font-medium text-white/60">{student.program?.name || 'N/A'}</span>
                    </td>
                    <td className="px-8 py-4">
                       <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${student.paymentStatus === 'Paid' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                        <span className="text-[10px] font-medium text-white/60">{student.paymentStatus}</span>
                       </div>
                    </td>
                    <td className="px-8 py-4">
                        <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${onboardingBadgeClass(student.onboardingStatus)}`}>
                            {student.onboardingStatus}
                        </span>
                    </td>
                    <td className="px-8 py-4">
                        <div className="flex items-center gap-2 text-[10px] font-medium text-white/60">
                           {student.discordRoleAssigned ? <ShieldCheck className="w-3 h-3 text-emerald-500" /> : <ShieldAlert className="w-3 h-3 text-amber-500" />}
                           {student.discordRoleAssigned ? 'Synced' : 'Pending'}
                        </div>
                    </td>
                    <td className="px-8 py-4 text-right">
                       <button onClick={(e) => { e.stopPropagation(); onSelectStudent(student); }} className="p-1.5 hover:bg-white/10 rounded-md text-white/40 hover:text-white transition">
                            <Pencil className="w-3.5 h-3.5" />
                       </button>
                    </td>
                  </tr>
                );
              })}
              {filteredAndSortedStudents.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-10 py-12 text-center text-white/20">
                    <p className="text-xs font-bold uppercase tracking-widest">No matching records found</p>
                  </td>
                </tr>
              )}
            </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Mobile View (Simplified) */}
      <div className="lg:hidden p-4 space-y-3">
           {filteredAndSortedStudents.map(student => (
              <div key={student.id} className="p-4 rounded-xl bg-white/5 border border-white/5" onClick={() => onSelectStudent(student)}>
                  <div className="flex justify-between items-start mb-2">
                      <div>
                          <div className="text-sm font-bold text-white">{student.name}</div>
                          <div className="text-xs text-white/40">{student.email}</div>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${onboardingBadgeClass(student.onboardingStatus)}`}>{student.onboardingStatus}</span>
                  </div>
              </div>
           ))}
      </div>

      {/* Delete Modal - Keeping original logic */}
      {studentToDelete && (
         <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
             <div className="bg-[#0A0A0A] border border-white/10 p-6 rounded-2xl max-w-sm w-full shadow-2xl">
                 <h3 className="text-lg font-bold text-white mb-2">Delete Student?</h3>
                 <p className="text-sm text-white/60 mb-6">Are you sure you want to delete {studentToDelete.name}? This action cannot be undone.</p>
                 <div className="flex gap-3">
                     <button onClick={() => setStudentToDelete(null)} className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-bold text-white transition">Cancel</button>
                     <button onClick={() => { onDeleteStudent(studentToDelete.id); setStudentToDelete(null); }} className="flex-1 py-2 rounded-lg bg-rose-500 hover:bg-rose-600 text-xs font-bold text-white transition">Delete</button>
                 </div>
             </div>
         </div>
      )}
    </div>
  );
};

export default StudentTable;
