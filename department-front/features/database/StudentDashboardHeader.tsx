import React from 'react';
import { Download, UserPlus, Search, Filter } from 'lucide-react';
import { Student } from '../../types';

interface StudentDashboardHeaderProps {
    onExport: () => void;
    onAddClick: () => void;
    stats: { label: string; value: string; helper: string }[];
    searchTerm: string;
    onSearchChange: (term: string) => void;
    showFilters: boolean;
    onToggleFilters: () => void;
    onResetFilters: () => void;
    filterProgram: string;
    onFilterProgramChange: (val: any) => void;
    filterOnboarding: string;
    onFilterOnboardingChange: (val: any) => void;
    filterDiscord: string;
    onFilterDiscordChange: (val: any) => void;
}

const StudentDashboardHeader: React.FC<StudentDashboardHeaderProps> = ({
    onExport,
    onAddClick,
    stats,
    searchTerm,
    onSearchChange,
    showFilters,
    onToggleFilters,
    onResetFilters,
    filterProgram,
    onFilterProgramChange,
    filterOnboarding,
    onFilterOnboardingChange,
    filterDiscord,
    onFilterDiscordChange
}) => {
    return (
        <div className="flex-shrink-0 z-10 space-y-4">
            {/* Row 2: KPI Cards */}
            <div className="grid grid-cols-3 gap-4">
                {stats.map(({ label, value, helper }) => (
                    <div key={label} className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex flex-col justify-center">
                        <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-1">{label}</span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-white/90">{value}</span>
                            <span className="text-[10px] text-emerald-400/80 font-medium">{helper}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Row 3: Controls */}
            <div className="flex items-center gap-4 bg-white/[0.02] border border-white/5 p-0.5 rounded-lg">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />
                    <input
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Search..."
                        className="w-full bg-transparent text-xs text-white/80 border-none focus:ring-0 pl-9 py-1.5 placeholder:text-white/20"
                    />
                </div>
                <div className="h-4 w-px bg-white/5" />
                <div className="flex items-center gap-1 pr-1">
                    <button
                        onClick={onToggleFilters}
                        className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition ${showFilters ? 'bg-emerald-500/10 text-emerald-400' : 'text-white/40 hover:text-white/60'}`}
                    >
                        <Filter className="w-3 h-3" /> Filters
                    </button>
                    <button
                        onClick={onResetFilters}
                        className="px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider text-white/40 hover:text-white/60 transition"
                    >
                        Reset
                    </button>
                </div>
            </div>

            {/* Filters Panel */}
            {showFilters && (
                <div className="grid gap-4 md:grid-cols-3 pt-2 pb-2 border-t border-white/5 animate-in fade-in slide-in-from-top-2">
                    <div>
                        <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-2">Program</p>
                        <div className="flex flex-wrap gap-2">
                            {(['All', 'TMT Basic', 'TAT', 'Get Funded', 'Premium', 'Premium Lite', 'MOM'] as const).map(prog => (
                                <button
                                    key={prog}
                                    onClick={() => onFilterProgramChange(prog)}
                                    className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider transition ${filterProgram === prog ? 'bg-emerald-500/20 text-emerald-300' : 'text-white/40 hover:text-white/60'}`}
                                >
                                    {prog}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-2">Onboarding</p>
                        <div className="flex flex-wrap gap-2">
                            {(['All', 'Not Started', 'In Progress', 'Completed'] as const).map(status => (
                                <button
                                    key={status}
                                    onClick={() => onFilterOnboardingChange(status)}
                                    className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider transition ${filterOnboarding === status ? 'bg-amber-500/20 text-amber-300' : 'text-white/40 hover:text-white/60'}`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-2">Discord</p>
                        <div className="flex flex-wrap gap-2">
                            {(['All', 'Assigned', 'Not Assigned'] as const).map(role => (
                                <button
                                    key={role}
                                    onClick={() => onFilterDiscordChange(role)}
                                    className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider transition ${filterDiscord === role ? 'bg-sky-500/20 text-sky-300' : 'text-white/40 hover:text-white/60'}`}
                                >
                                    {role}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentDashboardHeader;
