
import React from 'react';
import { Save, Bell, Lock, Webhook, Mail, Shield, ChevronRight } from 'lucide-react';

const SettingsView = () => {
  return (
    <div className="space-y-10 max-w-5xl mx-auto animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight uppercase">System Settings</h2>
          <p className="text-gray-300 text-sm mt-1 font-bold">Configure automation engine logic and encryption keys.</p>
        </div>
        <button className="flex items-center gap-2 px-8 py-3 bg-tmt-emerald text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-tmt-emerald/80 transition-all shadow-xl shadow-tmt-emerald/20 active:scale-95">
            <Save className="w-4 h-4" /> Deploy Changes
        </button>
      </div>

      <div className="grid grid-cols-1 gap-10">
        {/* General Automation */}
        <div className="bg-tmt-black/60 backdrop-blur-md rounded-[2.5rem] shadow-2xl border border-white/10 overflow-hidden">
            <div className="p-8 border-b border-white/10 bg-white/5 flex items-center justify-between">
                <h3 className="font-black text-white flex items-center gap-4 uppercase tracking-tight">
                    <div className="p-2 bg-tmt-emerald/10 border border-tmt-emerald/20 rounded-xl">
                      <Webhook className="w-5 h-5 text-tmt-emerald" />
                    </div>
                    Automation Rules Engine
                </h3>
                <span className="text-[10px] font-black text-tmt-emerald uppercase tracking-widest">Active Core</span>
            </div>
            <div className="p-8 space-y-6">
                <div className="flex items-center justify-between p-6 bg-white/[0.02] border border-white/5 rounded-3xl hover:bg-white/5 transition-all">
                    <div>
                        <p className="text-sm font-black text-white uppercase tracking-tight">Auto-Approve Stripe Gateway</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Automatically verify and enroll students who pay via Stripe Checkout.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-14 h-7 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-tmt-emerald shadow-inner"></div>
                    </label>
                </div>
                <div className="flex items-center justify-between p-6 bg-white/[0.02] border border-white/5 rounded-3xl hover:bg-white/5 transition-all">
                    <div>
                        <p className="text-sm font-black text-white uppercase tracking-tight">Strict Email Validation</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Halt automation if payment provider email differs from registration source.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-14 h-7 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-tmt-emerald shadow-inner"></div>
                    </label>
                </div>
            </div>
        </div>

        {/* API Keys */}
        <div className="bg-tmt-black/60 backdrop-blur-md rounded-[2.5rem] shadow-2xl border border-white/10 overflow-hidden">
            <div className="p-8 border-b border-white/10 bg-white/5">
                <h3 className="font-black text-white flex items-center gap-4 uppercase tracking-tight">
                    <div className="p-2 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                      <Lock className="w-5 h-5 text-amber-500" />
                    </div>
                    Security & API Integration
                </h3>
            </div>
            <div className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Discord Bot Token (Auth)</label>
                      <div className="relative group">
                          <input type="password" value="********************************" className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white font-mono focus:outline-none focus:ring-4 focus:ring-tmt-emerald/10 focus:border-tmt-emerald transition-all" readOnly />
                          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-tmt-emerald uppercase tracking-widest hover:text-white transition-colors">Reveal Secret</button>
                      </div>
                  </div>
                  <div className="space-y-3">
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Stripe Webhook Secret (Live)</label>
                      <div className="relative group">
                          <input type="password" value="whsec_************************" className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white font-mono focus:outline-none focus:ring-4 focus:ring-tmt-emerald/10 focus:border-tmt-emerald transition-all" readOnly />
                          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-tmt-emerald uppercase tracking-widest hover:text-white transition-colors">Reveal Secret</button>
                      </div>
                  </div>
                </div>
            </div>
        </div>

        {/* Notifications */}
        <div className="bg-tmt-black/60 backdrop-blur-md rounded-[2.5rem] shadow-2xl border border-white/10 overflow-hidden">
            <div className="p-8 border-b border-white/10 bg-white/5">
                <h3 className="font-black text-white flex items-center gap-4 uppercase tracking-tight">
                    <div className="p-2 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                      <Bell className="w-5 h-5 text-blue-400" />
                    </div>
                    Alerting & Channels
                </h3>
            </div>
            <div className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Admin Escalation Email</label>
                        <div className="relative group">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-tmt-emerald group-focus-within:text-white transition-colors" />
                          <input type="email" defaultValue="admin@the30minutetrader.com" className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm text-white font-bold focus:outline-none focus:ring-4 focus:ring-tmt-emerald/10 focus:border-tmt-emerald transition-all" />
                        </div>
                    </div>
                     <div className="space-y-3">
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Report Sync Cycle</label>
                        <div className="relative">
                          <select className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm text-white font-black appearance-none focus:outline-none focus:ring-4 focus:ring-tmt-emerald/10 focus:border-tmt-emerald transition-all">
                              <option className="bg-tmt-black">09:00 AM UTC (MORNING)</option>
                              <option className="bg-tmt-black">12:00 PM UTC (MIDDAY)</option>
                              <option className="bg-tmt-black">05:00 PM UTC (CLOSING)</option>
                          </select>
                          <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none rotate-90" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
