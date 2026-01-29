
import React from 'react';
import { LayoutDashboard, Database, CreditCard, FileText, Activity, UserCog, Filter, Settings, Shield, ChevronRight } from 'lucide-react';

interface SidebarProps {
  activeItem: string;
  onNavigate: (item: string) => void;
}

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'database', label: 'Student Database', icon: Database },
  { id: 'payments', label: 'Payments Verification', icon: CreditCard },
  { id: 'logs', label: 'Enrollment Logs', icon: FileText },
  { id: 'status', label: 'Onboarding Status', icon: Activity },
  { id: 'roles', label: 'Role Assignment', icon: UserCog },
  { id: 'reports', label: 'Filters & Reports', icon: Filter },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const Sidebar: React.FC<SidebarProps> = ({ activeItem, onNavigate }) => {
  return (
    <aside className="w-72 bg-tmt-black border-r border-tmt-emerald/20 h-full flex flex-col hidden md:flex z-30">
      <div className="h-20 flex items-center px-8 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-tmt-emerald to-tmt-dark rounded-xl flex items-center justify-center font-bold text-white text-lg shadow-lg shadow-tmt-emerald/20">
            T
          </div>
          <div>
            <h1 className="text-white font-bold text-base tracking-tight">TMT Admin</h1>
            <p className="text-[10px] text-tmt-emerald font-bold tracking-widest uppercase">Automation Pro</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-8">
        <div>
          <p className="px-4 text-[10px] font-bold text-tmt-emerald/90 uppercase tracking-[0.2em] mb-4">Main Menu</p>
          <ul className="space-y-1.5">
            {NAV_ITEMS.slice(0, 5).map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;
              
              return (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className={`w-full flex items-center px-4 py-3 text-sm font-medium transition-all duration-200 rounded-xl group
                      ${isActive 
                        ? 'text-white bg-tmt-emerald/20 shadow-sm border border-tmt-emerald/10' 
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                      }`}
                  >
                    <Icon className={`w-5 h-5 mr-3 transition-colors ${isActive ? 'text-tmt-emerald' : 'text-gray-400 group-hover:text-tmt-emerald'}`} />
                    <span className="flex-1 text-left">{item.label}</span>
                    {isActive && <ChevronRight className="w-4 h-4 text-tmt-emerald" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <p className="px-4 text-[10px] font-bold text-tmt-emerald/90 uppercase tracking-[0.2em] mb-4">Management</p>
          <ul className="space-y-1.5">
            {NAV_ITEMS.slice(5).map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;
              
              return (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className={`w-full flex items-center px-4 py-3 text-sm font-medium transition-all duration-200 rounded-xl group
                      ${isActive 
                        ? 'text-white bg-tmt-emerald/20 shadow-sm border border-tmt-emerald/10' 
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                      }`}
                  >
                    <Icon className={`w-5 h-5 mr-3 transition-colors ${isActive ? 'text-tmt-emerald' : 'text-gray-400 group-hover:text-tmt-emerald'}`} />
                    <span className="flex-1 text-left">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      <div className="p-6 mt-auto">
        <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-4 shadow-2xl">
            <div className="w-10 h-10 rounded-full bg-tmt-emerald/20 flex items-center justify-center border border-tmt-emerald/30">
                <Shield className="w-5 h-5 text-tmt-emerald" />
            </div>
            <div>
                <p className="text-xs font-bold text-white">System Secure</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <p className="text-[10px] text-tmt-emerald font-bold">v2.5 Stable</p>
                </div>
            </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
