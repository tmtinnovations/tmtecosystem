
import React from 'react';
import { LayoutDashboard, Database, CreditCard, FileText, Activity, UserCog, Filter, Settings, Shield, ChevronRight, ChevronLeft, LogOut, X } from 'lucide-react';

interface SidebarProps {
  activeItem: string;
  onNavigate: (item: string) => void;
  onLogout: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
  { id: 'database', label: 'Student Directory', icon: Database },
  { id: 'payments', label: 'Payment Verification', icon: CreditCard },
  { id: 'logs', label: 'System Audit Logs', icon: FileText },
  { id: 'status', label: 'Onboarding Status', icon: Activity },
  { id: 'roles', label: 'User Role Management', icon: UserCog },
  { id: 'reports', label: 'Analytics & Reporting', icon: Filter },
  { id: 'settings', label: 'System Configuration', icon: Settings },
];

const Sidebar: React.FC<SidebarProps> = ({ activeItem, onNavigate, onLogout, isCollapsed = false, onToggleCollapse, isMobileOpen = false, onCloseMobile }) => {
  return (
    <aside className={`${isCollapsed ? 'md:w-20' : 'w-72'} bg-[#050505] border-r border-[#151515] h-full flex flex-col z-30 font-sans shadow-2xl relative overflow-hidden transition-all duration-300`}>
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from- emerald-900/10 via-transparent to-transparent pointer-events-none" />

      {/* Mobile Close Button - Arrow to collapse/close */}
      <button
        onClick={onCloseMobile}
        className="md:hidden absolute top-4 right-4 z-50 p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all flex items-center justify-center"
        aria-label="Close menu"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <div className={`${isCollapsed ? 'h-20 px-2 justify-center' : 'h-24 px-8 justify-between'} flex items-center shrink-0 relative transition-all duration-300`}>
        <div className={`flex items-center gap-4 group cursor-pointer ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="w-11 h-11 bg-gradient-to-br from- emerald-500 to-emerald-700 rounded-xl flex items-center justify-center font-bold text-white text-xl shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/30 transition-all duration-300 group-hover:scale-105 border border-white/10 shrink-0">
            T
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <h1 className="text-white font-bold text-lg tracking-tight group-hover:text-emerald-400 transition-colors">TMT Department</h1>
              <p className="text-[10px] text-emerald-500 font-bold tracking-[0.2em] uppercase opacity-80 group-hover:opacity-100 transition-opacity">Management Suite</p>
            </div>
          )}
        </div>
        
        {/* Desktop Collapse Toggle - Only show when NOT collapsed */}
        {onToggleCollapse && !isCollapsed && (
          <button
            onClick={onToggleCollapse}
            className="hidden md:flex p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all items-center justify-center"
            title="Collapse sidebar"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Expand Button - Show when collapsed */}
      {isCollapsed && onToggleCollapse && (
        <button
          onClick={onToggleCollapse}
          className="hidden md:flex mx-auto mb-4 p-2 text-emerald-400 hover:text-white bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-lg transition-all items-center justify-center"
          title="Expand sidebar"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
      
      <nav className="flex-1 py-4 px-4 flex flex-col gap-6 overflow-hidden relative">
        <div>
          {!isCollapsed && (
            <p className="px-4 text-[10px] font-bold text-emerald-500/70 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              Main Navigation
              <span className="h-px bg-emerald-500/20 flex-1"></span>
            </p>
          )}
          <ul className="space-y-1">
            {NAV_ITEMS.slice(0, 5).map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;
              
              return (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className={`w-full flex items-center ${isCollapsed ? 'md:justify-center md:px-2' : 'px-4'} px-4 py-2.5 text-sm font-medium transition-all duration-300 rounded-xl group relative overflow-hidden
                      ${isActive 
                        ? 'text-white' 
                        : 'text-gray-400 hover:text-white'
                      }`}
                    title={isCollapsed ? item.label : undefined}
                  >
                    {/* Active/Hover Background */}
                    <div className={`absolute inset-0 rounded-xl transition-all duration-300 ${isActive ? 'bg-gradient-to-r from-emerald-500/20 to-emerald-500/5 border border-emerald-500/10 translate-x-0 opacity-100' : 'bg-white/5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0'}`} />
                    
                    {/* Active Left Indicator */}
                    {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-emerald-500 rounded-r-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />}

                    <div className="relative flex items-center w-full">
                      <Icon className={`w-5 h-5 ${isCollapsed ? 'md:mr-0' : 'mr-3'} mr-3 transition-colors duration-300 ${isActive ? 'text-emerald-400' : 'text-gray-500 group-hover:text-emerald-400'}`} />
                      {!isCollapsed && (
                        <>
                          <span className="flex-1 text-left tracking-wide">{item.label}</span>
                          <ChevronRight className={`w-4 h-4 text-emerald-500 transition-all duration-300 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100'}`} />
                        </>
                      )}
                      <span className={`md:hidden flex-1 text-left tracking-wide`}>{item.label}</span>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          {!isCollapsed && (
            <p className="px-4 text-[10px] font-bold text-emerald-500/70 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              Administration
              <span className="h-px bg-emerald-500/20 flex-1"></span>
            </p>
          )}
          <ul className="space-y-1">
            {NAV_ITEMS.slice(5).map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;
              
              return (
                <li key={item.id}>
                 <button
                    onClick={() => onNavigate(item.id)}
                    className={`w-full flex items-center ${isCollapsed ? 'md:justify-center md:px-2' : 'px-4'} px-4 py-2.5 text-sm font-medium transition-all duration-300 rounded-xl group relative overflow-hidden
                      ${isActive 
                        ? 'text-white' 
                        : 'text-gray-400 hover:text-white'
                      }`}
                    title={isCollapsed ? item.label : undefined}
                  >
                     <div className={`absolute inset-0 rounded-xl transition-all duration-300 ${isActive ? 'bg-gradient-to-r from-emerald-500/20 to-emerald-500/5 border border-emerald-500/10 translate-x-0 opacity-100' : 'bg-white/5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0'}`} />
                    
                     {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-emerald-500 rounded-r-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />}

                    <div className="relative flex items-center w-full">
                      <Icon className={`w-5 h-5 ${isCollapsed ? 'md:mr-0' : 'mr-3'} mr-3 transition-colors duration-300 ${isActive ? 'text-emerald-400' : 'text-gray-500 group-hover:text-emerald-400'}`} />
                      {!isCollapsed && (
                        <>
                          <span className="flex-1 text-left tracking-wide">{item.label}</span>
                          <ChevronRight className={`w-4 h-4 text-emerald-500 transition-all duration-300 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100'}`} />
                        </>
                      )}
                      <span className={`md:hidden flex-1 text-left tracking-wide`}>{item.label}</span>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      <div className={`${isCollapsed ? 'md:p-2' : 'p-6'} p-6 mt-auto space-y-4 shrink-0 relative`}>
        {!isCollapsed && <div className="h-px w-full bg-gradient-to-r from-transparent via-white/5 to-transparent mb-4"></div>}
        <button 
          onClick={onLogout}
          className={`w-full flex items-center ${isCollapsed ? 'md:justify-center md:px-2' : 'px-4'} px-4 py-3 text-xs font-bold text-rose-500 bg-rose-500/5 hover:bg-rose-500/10 border border-rose-500/10 hover:border-rose-500/20 rounded-xl transition-all group duration-300`}
          title={isCollapsed ? 'Sign Out' : undefined}
        >
          <LogOut className={`w-4 h-4 ${isCollapsed ? 'md:mr-0' : 'mr-3'} mr-3 transition-transform group-hover:-translate-x-1`} />
          {!isCollapsed && <span className="font-bold uppercase tracking-widest flex-1 text-left">Sign Out</span>}
          <span className="md:hidden font-bold uppercase tracking-widest flex-1 text-left">Sign Out</span>
        </button>

        {!isCollapsed && (
          <div className="bg-[#080a09] border border-white/5 p-4 rounded-2xl flex items-center gap-4 shadow-xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shrink-0 shadow-[0_0_10px_rgba(16,185,129,0.1)] group-hover:shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-shadow">
                  <Shield className="w-5 h-5 text-emerald-500" />
              </div>
              <div className="relative">
                  <p className="text-xs font-bold text-gray-200 group-hover:text-white transition-colors">Security Verified</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <p className="text-[10px] text-emerald-500/80 font-mono font-bold">System Status: Optimal</p>
                  </div>
              </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
