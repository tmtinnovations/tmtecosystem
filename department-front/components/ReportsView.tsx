
import React from 'react';
import { BarChart3, TrendingUp, Users, PieChart, Download, Calendar, ExternalLink } from 'lucide-react';

const ReportsView = () => {
  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight uppercase">Analytics & Reports</h2>
          <p className="text-gray-300 text-sm mt-1 font-bold">Comprehensive data intelligence for automated programs.</p>
        </div>
        <div className="flex items-center gap-3">
             <div className="relative">
                <button className="flex items-center gap-2 px-4 py-2.5 bg-white/10 border border-white/10 rounded-2xl text-xs font-black text-white uppercase tracking-widest hover:bg-white/20 transition-all">
                    <Calendar className="w-4 h-4 text-tmt-emerald" /> Last 30 Days
                </button>
             </div>
             <button className="flex items-center gap-2 px-6 py-3 bg-tmt-emerald text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-tmt-emerald/80 transition-all shadow-xl shadow-tmt-emerald/20">
                <Download className="w-4 h-4" /> Export Master CSV
            </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-tmt-black/60 backdrop-blur-md p-8 rounded-[2.5rem] shadow-2xl border border-white/10 group hover:border-tmt-emerald transition-all">
             <div className="flex justify-between items-start mb-6">
                 <div className="p-4 bg-tmt-emerald/10 border border-tmt-emerald/20 rounded-2xl text-tmt-emerald shadow-lg shadow-tmt-emerald/5">
                     <TrendingUp className="w-7 h-7" />
                 </div>
                 <span className="text-[10px] font-black text-tmt-emerald bg-tmt-emerald/10 border border-tmt-emerald/20 px-2.5 py-1 rounded-lg uppercase tracking-widest">+12.5%</span>
             </div>
             <p className="text-gray-400 text-[10px] uppercase tracking-[0.2em] font-black">Total Net Revenue</p>
             <h3 className="text-4xl font-black text-white mt-2 tracking-tighter">$128,450</h3>
          </div>
          <div className="bg-tmt-black/60 backdrop-blur-md p-8 rounded-[2.5rem] shadow-2xl border border-white/10 group hover:border-blue-500 transition-all">
             <div className="flex justify-between items-start mb-6">
                 <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl text-blue-400 shadow-lg shadow-blue-500/5">
                     <Users className="w-7 h-7" />
                 </div>
                 <span className="text-[10px] font-black text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-lg uppercase tracking-widest">+5.2%</span>
             </div>
             <p className="text-gray-400 text-[10px] uppercase tracking-[0.2em] font-black">Gross Enrollments</p>
             <h3 className="text-4xl font-black text-white mt-2 tracking-tighter">482</h3>
          </div>
          <div className="bg-tmt-black/60 backdrop-blur-md p-8 rounded-[2.5rem] shadow-2xl border border-white/10 group hover:border-amber-500 transition-all">
             <div className="flex justify-between items-start mb-6">
                 <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-amber-400 shadow-lg shadow-amber-500/5">
                     <PieChart className="w-7 h-7" />
                 </div>
                 <span className="text-[10px] font-black text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-lg uppercase tracking-widest">98.5% ACCURACY</span>
             </div>
             <p className="text-gray-400 text-[10px] uppercase tracking-[0.2em] font-black">Automation Success</p>
             <h3 className="text-4xl font-black text-white mt-2 tracking-tighter">1,240 <span className="text-lg text-gray-500">/ 1,258</span></h3>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Program Distribution */}
          <div className="bg-tmt-black/60 backdrop-blur-md p-10 rounded-[2.5rem] shadow-2xl border border-white/10">
              <h3 className="text-lg font-black text-white uppercase tracking-tight mb-10 flex items-center gap-3">
                  <BarChart3 className="w-6 h-6 text-tmt-emerald" /> Program Distribution
              </h3>
              <div className="space-y-8">
                  <div>
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-3">
                          <span className="text-white">Get Funded Program</span>
                          <span className="text-tmt-emerald">45.0% Share</span>
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-3 border border-white/10 overflow-hidden">
                          <div className="bg-gradient-to-r from-tmt-emerald to-emerald-400 h-full rounded-full shadow-[0_0_15px_rgba(16,185,129,0.3)]" style={{ width: '45%' }}></div>
                      </div>
                  </div>
                  <div>
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-3">
                          <span className="text-white">TAT Masterclass</span>
                          <span className="text-blue-400">25.0% Share</span>
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-3 border border-white/10 overflow-hidden">
                          <div className="bg-gradient-to-r from-blue-500 to-blue-400 h-full rounded-full shadow-[0_0_15px_rgba(59,130,246,0.3)]" style={{ width: '25%' }}></div>
                      </div>
                  </div>
                   <div>
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-3">
                          <span className="text-white">Premium Elite Packages</span>
                          <span className="text-purple-400">20.0% Share</span>
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-3 border border-white/10 overflow-hidden">
                          <div className="bg-gradient-to-r from-purple-500 to-purple-400 h-full rounded-full shadow-[0_0_15px_rgba(168,85,247,0.3)]" style={{ width: '20%' }}></div>
                      </div>
                  </div>
              </div>
          </div>

          {/* Recent Export Logs */}
           <div className="bg-tmt-black/60 backdrop-blur-md p-10 rounded-[2.5rem] shadow-2xl border border-white/10">
              <h3 className="text-lg font-black text-white uppercase tracking-tight mb-8">Recent System Reports</h3>
              <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                      <div key={i} className="group flex items-center justify-between p-5 bg-white/5 border border-white/5 rounded-[1.5rem] hover:bg-white hover:border-white transition-all cursor-pointer shadow-lg">
                          <div className="flex items-center gap-4">
                              <div className="bg-white/10 p-3 rounded-2xl text-white border border-white/10 group-hover:bg-tmt-emerald group-hover:border-tmt-emerald transition-all">
                                  <Download className="w-5 h-5" />
                              </div>
                              <div>
                                  <p className="text-sm font-black text-white group-hover:text-tmt-black uppercase tracking-tight transition-colors">Monthly_Enrollment_Oct.csv</p>
                                  <p className="text-[10px] text-gray-500 group-hover:text-gray-800 font-bold uppercase tracking-widest transition-colors mt-1">Generated on Oct 26, 2023 • Station A-1</p>
                              </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-[10px] text-gray-400 font-black uppercase group-hover:text-tmt-black transition-colors">2.4 MB</span>
                            <ExternalLink className="w-4 h-4 text-gray-700 group-hover:text-tmt-black transition-all" />
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </div>
    </div>
  );
};

export default ReportsView;
