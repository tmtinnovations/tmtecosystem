
import React from 'react';
import { Bell, User, Search, Menu, Command } from 'lucide-react';

const Header: React.FC<{ title: string; onMenuClick: () => void }> = ({ title, onMenuClick }) => {
  return (
    <header className="h-16 bg-white/5 backdrop-blur-2xl flex items-center justify-between px-4 md:px-10 z-40 sticky top-0 border border-white/10 rounded-3xl mx-4 md:mx-6 lg:mx-10 mt-2 shrink-0 shadow-xl shadow-black/20">
      <div className="flex items-center gap-3 md:gap-6 min-w-0">
        <button 
          className="md:hidden text-white p-2 hover:bg-white/10 rounded-xl transition-colors shrink-0" 
          onClick={onMenuClick}
          aria-label="Open menu"
        >
            <Menu className="w-6 h-6" />
        </button>
        <div className="flex flex-col min-w-0 py-1">
          <h1 className="text-white font-black text-sm md:text-xl tracking-tight uppercase truncate leading-tight">
            {title}
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-tmt-emerald animate-pulse"></span>
            <p className="text-[9px] md:text-[10px] text-tmt-emerald font-black uppercase tracking-[0.2em] whitespace-nowrap opacity-90 leading-tight">
              Administrative Control Panel
            </p>
          </div>
        </div>
      </div>



      <div className="flex items-center gap-2 md:gap-4 shrink-0">
        <button className="relative p-2.5 md:p-3 bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl text-white transition-all group">
          <Bell className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full"></span>
        </button>
        
        <div className="h-8 w-[1px] bg-white/10 mx-1 md:mx-2 hidden sm:block"></div>
        
        <div className="flex items-center gap-3 md:gap-4 pl-1">
          <div className="text-right hidden xl:block">
            <p className="text-[10px] md:text-xs font-black text-white uppercase tracking-wider leading-none">Administrator</p>
            <p className="text-[8px] md:text-[9px] text-tmt-emerald font-black uppercase tracking-widest opacity-80 mt-1">Region: NA</p>
          </div>
          <button className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-tmt-emerald/80 to-tmt-dark/80 backdrop-blur-xl border-2 border-white/20 rounded-2xl md:rounded-3xl flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-all shadow-xl shadow-tmt-emerald/20 overflow-hidden">
            <User className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
