import React, { useMemo, useState } from 'react';
import { Student, ProgramType, OnboardingStatus } from '../../types';
import {
  Search,
  UserPlus,
  Pencil,
  Trash2,
  AlertTriangle,
  Filter,
  BellRing,
  ShieldCheck,
  ShieldAlert,
  ArrowUpDown,
  Users,
  GraduationCap,
  BookOpen,
  Download,
  BadgeCheck,
  ChevronUp
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
  const flaggedStudents = filteredAndSortedStudents
    .filter(student => !student.discordRoleAssigned || student.onboardingStatus !== 'Completed')
    .slice(0, 3);

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
    <div className="flex flex-col h-full bg-gradient-to-b from-[#050d08] via-[#030907] to-[#030c0a] text-white overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 md:px-8 lg:px-12 pt-6 pb-4">
        <div className="space-y-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-[11px] font-black tracking-[0.4em] text-emerald-300/70 uppercase">student operations</p>
              <div className="flex items-center gap-4 mt-2">
                <h1 className="text-3xl font-black tracking-tight">Directory Visibility Grid</h1>
                <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-[0.25em] bg-emerald-400/10 text-emerald-300 border border-emerald-400/30">Live</span>
              </div>
              <p className="text-sm text-white/60 max-w-2xl mt-2">Monitor onboarding flow, payment integrity, and community sync in one illuminated surface. Filters and exports keep your ops narrative crisp.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-5 py-3 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-black uppercase tracking-widest transition"
              >
                <Download className="w-4 h-4" /> Export Matrix
              </button>
              <button
                onClick={onAddClick}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-400 text-black text-xs font-black uppercase tracking-[0.25em] shadow-[0_10px_40px_rgba(16,185,129,0.35)]"
              >
                <UserPlus className="w-4 h-4" /> Add Record
              </button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {stats.map(({ label, value, helper, icon: Icon, accent }) => (
              <div key={label} className="p-5 rounded-[1.75rem] border border-white/10 bg-white/5">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] uppercase tracking-[0.35em] text-white/60 font-black">{label}</p>
                  <span className="text-[10px] text-white/40 font-black">{helper}</span>
                </div>
                <div className="flex items-center gap-4 mt-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${accent} border border-white/10 flex items-center justify-center`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-3xl font-black tracking-tight">{value}</p>
                    <div className="flex items-center gap-1 text-xs text-emerald-300 mt-1">
                      <ChevronUp className="w-3 h-3" />
                      <span>Stability window</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>

        <div className="sticky top-0 z-40 px-4 md:px-8 lg:px-12 py-4 bg-[#030907]/95 backdrop-blur-xl border-y border-white/5 mb-6 shadow-2xl shadow-black/50">
          <div className="p-1 rounded-[1.75rem]">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-300" />
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by student, email, or program keyword..."
                  className="w-full bg-black/40 border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-sm font-semibold placeholder:text-white/40 focus:outline-none focus:ring-4 focus:ring-emerald-400/20"
                />
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setShowFilters(v => !v)}
                  className={`px-4 py-2 rounded-xl border text-xs font-black uppercase tracking-[0.25em] flex items-center gap-2 ${showFilters ? 'border-emerald-300 text-emerald-300 bg-emerald-400/10' : 'border-white/10 text-white/70 bg-white/5'}`}
                >
                  <Filter className="w-4 h-4" /> Filters
                </button>
                <button
                  onClick={() => { setSearchTerm(''); setFilterProgram('All'); setFilterOnboarding('All'); setFilterDiscord('All'); setSortDirection(null); }}
                  className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-xs font-black uppercase tracking-[0.25em] text-white/70 hover:text-white"
                >
                  Reset
                </button>
              </div>
            </div>

            {showFilters && (
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.35em] text-white/50 font-black mb-2">Program</p>
                  <div className="flex flex-wrap gap-2">
                    {(['All', 'TMT Basic', 'TAT', 'Get Funded', 'Premium', 'Premium Lite', 'MOM'] as const).map(prog => (
                      <button
                        key={prog}
                        onClick={() => setFilterProgram(prog)}
                        className={`px-3 py-1.5 rounded-xl border text-[11px] font-black tracking-[0.2em] ${filterProgram === prog ? 'border-emerald-300 text-emerald-300 bg-emerald-400/10' : 'border-white/10 text-white/60'}`}
                      >
                        {prog}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.35em] text-white/50 font-black mb-2">Onboarding</p>
                  <div className="flex flex-wrap gap-2">
                    {(['All', 'Not Started', 'In Progress', 'Completed'] as const).map(status => (
                      <button
                        key={status}
                        onClick={() => setFilterOnboarding(status)}
                        className={`px-3 py-1.5 rounded-xl border text-[11px] font-black tracking-[0.2em] ${filterOnboarding === status ? 'border-amber-300 text-amber-300 bg-amber-400/10' : 'border-white/10 text-white/60'}`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.35em] text-white/50 font-black mb-2">Discord roles</p>
                  <div className="flex flex-wrap gap-2">
                    {(['All', 'Assigned', 'Not Assigned'] as const).map(role => (
                      <button
                        key={role}
                        onClick={() => setFilterDiscord(role)}
                        className={`px-3 py-1.5 rounded-xl border text-[11px] font-black tracking-[0.2em] flex items-center gap-2 ${filterDiscord === role ? 'border-sky-300 text-sky-300 bg-sky-400/10' : 'border-white/10 text-white/60'}`}
                      >
                        {role === 'Assigned' ? <ShieldCheck className="w-3.5 h-3.5" /> : role === 'Not Assigned' ? <ShieldAlert className="w-3.5 h-3.5" /> : null}
                        {role}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${hasActiveFilters ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}`}></div>
                <p className="text-[11px] uppercase tracking-[0.35em] text-white/60 font-black">
                  {filteredAndSortedStudents.length} matching records in view
                </p>
              </div>
              {flaggedStudents.length > 0 && (
                <div className="flex flex-wrap items-center gap-3 text-xs text-white/70">
                  <span className="uppercase tracking-[0.3em] font-black text-rose-300">Attention</span>
                  {flaggedStudents.map(student => (
                    <span key={student.id} className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-200 text-[11px] font-black tracking-[0.25em]">
                      {student.name.split(' ')[0]}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

      <div className="hidden lg:block px-4 md:px-8 lg:px-12 pb-12">
        <div className="rounded-[2.5rem] border border-white/10 bg-black/20 backdrop-blur-xl overflow-hidden">
          <div className="px-10 py-6 border-b border-white/5 flex items-center justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.35em] text-white/50 font-black">records control</p>
              <p className="text-sm text-white/60">Sorted alphabetically unless toggled</p>
            </div>
            <button onClick={toggleSort} className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/70">
              Sort by Name
              <ArrowUpDown className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-6 px-10 py-4 text-[11px] font-black uppercase tracking-[0.35em] text-white/50 border-b border-white/5">
            <span>Identity</span>
            <span>Program</span>
            <span>Payment</span>
            <span>Onboarding</span>
            <span>Discord</span>
            <span className="text-right">Actions</span>
          </div>

          <div>
            {filteredAndSortedStudents.map((student) => {
              const dueDate = student.dueDate || student.due_date || new Date().toISOString().split('T')[0];
              const due = new Date(dueDate);
              const remainingDays = Math.ceil((due.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
              const isOverdue = remainingDays <= 0;
              const dueCopy = isOverdue ? 'Overdue' : `Due in ${remainingDays}d`;
              const paymentBadge = student.paymentStatus === 'Paid'
                ? 'bg-emerald-500/10 text-emerald-300 border-emerald-400/30'
                : student.paymentStatus === 'Pending'
                  ? 'bg-amber-500/10 text-amber-300 border-amber-400/30'
                  : 'bg-rose-500/10 text-rose-300 border-rose-400/30';

              return (
                <div
                  key={student.id}
                  onClick={() => onSelectStudent(student)}
                  className={`grid grid-cols-6 px-10 py-6 gap-4 border-b border-white/5 transition-colors cursor-pointer ${selectedStudentId === student.id ? 'bg-white/5' : 'hover:bg-white/5/50'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl border border-white/10 flex items-center justify-center font-black text-lg ${selectedStudentId === student.id ? 'bg-emerald-400/20 text-emerald-200' : 'bg-white/5 text-emerald-300'}`}>
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-black tracking-tight">{student.name}</p>
                      <p className="text-xs text-white/50">{student.email}</p>
                      <div className="flex items-center gap-2 mt-2 text-[11px] uppercase tracking-[0.3em] text-white/40">
                        <BellRing className={`w-3.5 h-3.5 ${isOverdue ? 'text-rose-300' : 'text-white/40'}`} />
                        {dueCopy}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <span className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-black uppercase tracking-[0.3em] truncate">
                      {student.program?.name || 'N / A'}
                    </span>
                  </div>

                  <div>
                    <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-[11px] font-black tracking-[0.3em] ${paymentBadge}`}>
                      <BadgeCheck className="w-3.5 h-3.5" />
                      {student.paymentStatus}
                    </span>
                  </div>

                  <div>
                    <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-[11px] font-black tracking-[0.3em] ${onboardingBadgeClass(student.onboardingStatus)}`}>
                      {student.onboardingStatus}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.3em]">
                    {student.discordRoleAssigned ? (
                      <span className="flex items-center gap-2 text-emerald-300">
                        <ShieldCheck className="w-4 h-4" /> Synced
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 text-amber-200">
                        <ShieldAlert className="w-4 h-4" /> Pending
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-end gap-3">
                    <button
                      onClick={(e) => { e.stopPropagation(); onSelectStudent(student); }}
                      className="p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-emerald-500/20"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setStudentToDelete(student); }}
                      className="p-3 rounded-xl border border-rose-400/20 bg-rose-500/10 text-rose-200 hover:bg-rose-500/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}

            {filteredAndSortedStudents.length === 0 && (
              <div className="px-10 py-24 text-center text-white/40">
                <Filter className="w-16 h-16 mx-auto mb-4" />
                <p className="text-lg font-black tracking-tight">No records match the current filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="lg:hidden px-4 py-6 space-y-4">
        {filteredAndSortedStudents.map(student => {
          const dueDate = student.dueDate || student.due_date || new Date().toISOString().split('T')[0];
          const due = new Date(dueDate);
          const remainingDays = Math.ceil((due.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
          const dueCopy = remainingDays <= 0 ? 'Overdue' : `Due in ${remainingDays}d`;

          return (
            <div
              key={student.id}
              className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 space-y-3"
              onClick={() => onSelectStudent(student)}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-black text-lg">{student.name}</p>
                  <p className="text-xs text-white/60">{student.email}</p>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); setStudentToDelete(student); }}
                  className="p-2 rounded-xl border border-rose-400/20 bg-rose-500/10 text-rose-200"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3 text-[11px] uppercase tracking-[0.2em] text-white/60">
                <div>
                  <p>Program</p>
                  <p className="mt-1 text-white">{student.program?.name || 'N/A'}</p>
                </div>
                <div>
                  <p>Payment</p>
                  <span className="mt-1 inline-flex px-3 py-1 rounded-xl bg-white/10 border border-white/15 text-white text-[11px]">{student.paymentStatus}</span>
                </div>
                <div>
                  <p>Onboarding</p>
                  <span className="mt-1 inline-flex px-3 py-1 rounded-xl border border-white/15 text-white text-[11px]">{student.onboardingStatus}</span>
                </div>
                <div>
                  <p>Discord</p>
                  <span className="mt-1 inline-flex items-center gap-2 text-white">
                    {student.discordRoleAssigned ? <ShieldCheck className="w-4 h-4 text-emerald-300" /> : <ShieldAlert className="w-4 h-4 text-amber-300" />}
                    {student.discordRoleAssigned ? 'Synced' : 'Pending'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-white/60">
                <BellRing className="w-4 h-4" />
                {dueCopy}
              </div>
            </div>
          );
        })}

        {filteredAndSortedStudents.length === 0 && (
          <div className="text-center text-white/50 py-12 border border-white/10 rounded-2xl">
            <Filter className="w-10 h-10 mx-auto mb-4" />
            <p className="text-sm font-black tracking-tight">No records match the current filters.</p>
          </div>
        )}
      </div>

      {studentToDelete && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-3xl" onClick={() => setStudentToDelete(null)}></div>
          <div className="relative bg-[#0d0d0d] border border-white/10 rounded-[3rem] w-full max-w-md p-10 shadow-2xl">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 rounded-[1.5rem] bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500">
                <AlertTriangle className="w-10 h-10" />
              </div>
              <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-none">Purge Profile?</h3>
            </div>
            <p className="text-gray-400 font-medium leading-relaxed text-sm">
              Confirming this will permanently erase <span className="text-white font-black">{studentToDelete.name}</span> from the directory and halt all automated sequences. This action is irreversible.
            </p>
            <div className="flex gap-4 mt-10">
              <button onClick={() => setStudentToDelete(null)} className="flex-1 py-5 rounded-2xl bg-white/5 border border-white/10 text-sm font-black uppercase tracking-widest text-gray-500 hover:text-white">Abort Command</button>
              <button
                onClick={() => { onDeleteStudent(studentToDelete.id); setStudentToDelete(null); }}
                className="flex-1 py-5 rounded-2xl bg-rose-500 text-white text-sm font-black uppercase tracking-widest hover:bg-rose-600 border border-rose-400/20"
              >
                Erase Record
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default StudentTable;
