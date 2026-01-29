
import React, { useState } from 'react';
import { Save, Bell, Lock, Webhook, Mail, Shield, ChevronRight, Eye, EyeOff } from 'lucide-react';

const SettingsView = () => {
  const [showDiscordToken, setShowDiscordToken] = useState(false);
  const [showStripeSecret, setShowStripeSecret] = useState(false);

  return (
    <div className="space-y-10 max-w-5xl mx-auto animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight uppercase">System Configuration</h2>
          <p className="text-gray-300 text-sm mt-1 font-bold">Configure automation engine logic and encryption keys.</p>
        </div>
        <button className="flex items-center gap-2 px-8 py-3 bg-tmt-emerald text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-tmt-emerald/80 transition-all shadow-xl shadow-tmt-emerald/20 active:scale-95">
            <Save className="w-4 h-4" /> Deploy Changes
        </button>
      </div>

      <div className="grid grid-cols-1 gap-10">
        {/* General Automation */}
        <div className="glass-card rounded-[2.5rem] overflow-hidden">
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
            </div>
        </div>

        {/* API Keys - The Security Integration Section */}
        <div className="glass-card rounded-[2.5rem] overflow-hidden">
            <div className="p-8 border-b border-white/10 bg-white/5 flex items-center justify-between">
                <h3 className="font-black text-white flex items-center gap-4 uppercase tracking-tight">
                    <div className="p-2 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                      <Lock className="w-5 h-5 text-amber-500" />
                    </div>
                    Security Integration
                </h3>
                <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Encrypted</span>
            </div>
            <div className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Discord Bot Token (Auth)</label>
                      <div className="relative group">
                          <input 
                            type={showDiscordToken ? 'text' : 'password'} 
                            value="MTA5MjM0NzkxODIzNzg5NzA5Mg.GzVzV.XzVzVzVzVzVzVzVzVzVzVzVzVzVzV" 
                            className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 pr-12 text-sm text-white font-mono focus:outline-none focus:ring-4 focus:ring-tmt-emerald/10 focus:border-tmt-emerald transition-all" 
                            readOnly 
                          />
                          <button 
                            type="button"
                            onClick={() => setShowDiscordToken(!showDiscordToken)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-[10px] font-black text-tmt-emerald uppercase tracking-widest hover:text-white transition-colors p-1"
                          >
                            {showDiscordToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            <span className="hidden sm:inline">Reveal Secret</span>
                          </button>
                      </div>
                  </div>
                  <div className="space-y-3">
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Stripe Webhook Secret (Live)</label>
                      <div className="relative group">
                          <input 
                            type={showStripeSecret ? 'text' : 'password'} 
                            value="whsec_5f7e3c1d2b4a5f7e3c1d2b4a5f7e3c1d2b4a5f7e3c1d2b4a" 
                            className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 pr-12 text-sm text-white font-mono focus:outline-none focus:ring-4 focus:ring-tmt-emerald/10 focus:border-tmt-emerald transition-all" 
                            readOnly 
                          />
                          <button 
                            type="button"
                            onClick={() => setShowStripeSecret(!showStripeSecret)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-[10px] font-black text-tmt-emerald uppercase tracking-widest hover:text-white transition-colors p-1"
                          >
                            {showStripeSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            <span className="hidden sm:inline">Reveal Secret</span>
                          </button>
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
