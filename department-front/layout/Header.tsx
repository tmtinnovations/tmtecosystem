
import React from 'react';
import { Bell, User, Search, Menu, Command } from 'lucide-react';

const Header: React.FC<{ title: string; onMenuClick: () => void }> = ({ title, onMenuClick }) => {
  return (
    <header className="h-12 bg-[#030906] border-b border-white/5 flex items-center justify-between px-4 lg:px-6 z-40 sticky top-0 shrink-0">
      <div className="flex items-center gap-3 md:gap-4 min-w-0">
        <button 
          className="md:hidden text-white p-1.5 hover:bg-white/10 rounded-lg transition-colors shrink-0" 
          onClick={onMenuClick}
          aria-label="Open menu"
        >
            <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-4">
          <h1 className="text-white font-bold text-sm md:text-base tracking-tight uppercase truncate leading-none">
            {title}
          </h1>
          <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <p className="text-[9px] text-emerald-400 font-bold uppercase tracking-widest whitespace-nowrap leading-none">
              Administrative Control Panel
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4 shrink-0">
        <button className="relative p-1.5 hover:bg-white/10 rounded-lg text-white/60 hover:text-white transition-all group">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-rose-500 rounded-full border border-[#030906]"></span>
        </button>
        
        <div className="h-6 w-px bg-white/10 mx-1 hidden sm:block"></div>
        
        <div className="flex items-center gap-3 pl-1">
          <div className="text-right hidden xl:block">
            <p className="text-[10px] font-bold text-white uppercase tracking-wider leading-none">Administrator</p>
            <p className="text-[8px] text-emerald-500/80 font-bold uppercase tracking-widest mt-0.5">Region: NA</p>
          </div>
          <button className="w-7 h-7 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400 hover:bg-emerald-500/20 transition-all">
            <User className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
