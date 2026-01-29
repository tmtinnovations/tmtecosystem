
import React from 'react';
import { Bell, User, Search, Menu, Command } from 'lucide-react';

const Header: React.FC<{ title: string; onMenuClick: () => void }> = ({ title, onMenuClick }) => {
  return (
    <header className="h-16 bg-tmt-black/80 backdrop-blur-xl flex items-center justify-between px-6 md:px-10 z-40 sticky top-0 border-b border-white/10">
      <div className="flex items-center gap-6">
        <button className="md:hidden text-white p-2 hover:bg-white/10 rounded-xl transition-colors" onClick={onMenuClick}>
            <Menu className="w-6 h-6" />
        </button>
        <div className="flex flex-col">
          <h1 className="text-white font-black text-xl tracking-tight hidden sm:block">{title}</h1>
          <p className="text-[10px] text-tmt-emerald font-black uppercase tracking-[0.2em] hidden sm:block">Operations Control Center</p>
        </div>
      </div>

      <div className="flex-1 max-w-2xl mx-12 hidden lg:block">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-tmt-emerald group-focus-within:text-white transition-colors" />
          <input 
            type="text" 
            placeholder="Search records, transactions, or logs..." 
            className="w-full bg-white/10 text-white placeholder-gray-400 rounded-2xl pl-12 pr-12 py-3 text-sm focus:outline-none focus:bg-white/20 focus:ring-4 focus:ring-tmt-emerald/20 border border-white/10 transition-all"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 bg-white/10 border border-white/20 px-1.5 py-0.5 rounded-lg text-[10px] text-gray-200 font-bold">
            <Command className="w-2.5 h-2.5" /> K
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative p-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl text-white transition-all group">
          <Bell className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-tmt-black"></span>
        </button>
        
        <div className="h-10 w-[1px] bg-white/20 mx-2 hidden sm:block"></div>
        
        <div className="flex items-center gap-4 pl-2">
          <div className="text-right hidden xl:block">
            <p className="text-xs font-black text-white uppercase tracking-wider">Super Admin</p>
            <p className="text-[9px] text-tmt-emerald font-bold uppercase tracking-widest">Station 01-A</p>
          </div>
          <button className="w-12 h-12 bg-gradient-to-br from-tmt-emerald to-tmt-dark border-2 border-white/20 rounded-2xl flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-all shadow-xl shadow-tmt-emerald/20 overflow-hidden">
            <User className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
