
import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Download, 
  ExternalLink, 
  Pencil, 
  Trash2, 
  AlertTriangle, 
  X,
  // Added missing CreditCard import
  CreditCard 
} from 'lucide-react';

const INITIAL_TRANSACTIONS = [
  { id: 'TRX-9928', student: 'Alex Johnson', amount: '$497.00', method: 'Stripe', date: 'Oct 25, 10:00 AM', status: 'Verified' },
  { id: 'TRX-9929', student: 'Sarah Williams', amount: '$997.00', method: 'PayPal', date: 'Oct 25, 09:15 AM', status: 'Verified' },
  { id: 'TRX-9930', student: 'Michael Brown', amount: '$497.00', method: 'Bank Transfer', date: 'Oct 25, 11:30 AM', status: 'Failed' },
  { id: 'TRX-9931', student: 'Emily Davis', amount: '$2,497.00', method: 'Crypto', date: 'Oct 25, 12:45 PM', status: 'Pending' },
  { id: 'TRX-9932', student: 'Jessica Lee', amount: '$497.00', method: 'Stripe', date: 'Oct 25, 01:20 PM', status: 'Verified' },
];

const PaymentsView = () => {
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [transactionToDelete, setTransactionToDelete] = useState<typeof INITIAL_TRANSACTIONS[0] | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTransactions = transactions.filter(t => 
    t.student.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = () => {
    if (transactionToDelete) {
      setTransactions(transactions.filter(t => t.id !== transactionToDelete.id));
      setTransactionToDelete(null);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight uppercase">Payments Verification</h2>
          <p className="text-gray-300 text-sm mt-1 font-bold uppercase tracking-wide">Financial audit & manual transaction override.</p>
        </div>
        <div className="flex gap-3">
            <button className="flex items-center gap-2 px-5 py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all">
                <Download className="w-4 h-4" /> Export Ledger
            </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-zinc-950/40 backdrop-blur-md p-6 rounded-[2rem] shadow-2xl border border-white/5 border-l-4 border-l-tmt-emerald">
            <p className="text-gray-500 text-[9px] uppercase tracking-[0.2em] font-black">Verified (24h)</p>
            <p className="text-3xl font-black text-white mt-1 tracking-tight">$12,450.00</p>
        </div>
        <div className="bg-zinc-950/40 backdrop-blur-md p-6 rounded-[2rem] shadow-2xl border border-white/5 border-l-4 border-l-amber-500">
            <p className="text-gray-500 text-[9px] uppercase tracking-[0.2em] font-black">Held for Review</p>
            <p className="text-3xl font-black text-white mt-1 tracking-tight">$2,497.00</p>
        </div>
        <div className="bg-zinc-950/40 backdrop-blur-md p-6 rounded-[2rem] shadow-2xl border border-white/5 border-l-4 border-l-rose-500">
            <p className="text-gray-500 text-[9px] uppercase tracking-[0.2em] font-black">System Faults</p>
            <p className="text-3xl font-black text-white mt-1 tracking-tight">$497.00</p>
        </div>
      </div>

      <div className="bg-zinc-950/60 backdrop-blur-md rounded-[2.5rem] shadow-2xl border border-white/10 overflow-hidden">
        <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row gap-4 justify-between items-center bg-white/[0.02]">
             <div className="relative flex-1 w-full sm:max-w-md group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-tmt-emerald" />
                <input 
                    type="text" 
                    placeholder="Search by ID or Student..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 text-xs font-bold bg-white/5 border border-white/5 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-tmt-emerald/10 focus:border-tmt-emerald transition-all"
                />
            </div>
            <div className="flex gap-2">
                <button className="p-3 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 text-white transition-all">
                    <Filter className="w-5 h-5" />
                </button>
            </div>
        </div>

        <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-0">
                <thead className="bg-black text-gray-500">
                    <tr>
                        <th className="px-8 py-5 text-[9px] font-black uppercase tracking-[0.2em]">Transaction ID</th>
                        <th className="px-8 py-5 text-[9px] font-black uppercase tracking-[0.2em]">Identity</th>
                        <th className="px-8 py-5 text-[9px] font-black uppercase tracking-[0.2em]">Volume</th>
                        <th className="px-8 py-5 text-[9px] font-black uppercase tracking-[0.2em]">Method</th>
                        <th className="px-8 py-5 text-[9px] font-black uppercase tracking-[0.2em]">Pulse Time</th>
                        <th className="px-8 py-5 text-[9px] font-black uppercase tracking-[0.2em]">Status</th>
                        <th className="px-8 py-5 text-right text-[9px] font-black uppercase tracking-[0.2em]">Command</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {filteredTransactions.map((trx) => (
                        <tr key={trx.id} className="hover:bg-white/[0.03] transition-colors group">
                            <td className="px-8 py-6 font-mono text-[10px] text-gray-500 font-black tracking-widest">{trx.id}</td>
                            <td className="px-8 py-6 font-black text-white text-sm uppercase tracking-tight group-hover:text-tmt-emerald transition-colors">{trx.student}</td>
                            <td className="px-8 py-6 text-white font-black text-sm">{trx.amount}</td>
                            <td className="px-8 py-6">
                                <span className="bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg text-[10px] text-gray-400 font-black uppercase tracking-widest">{trx.method}</span>
                            </td>
                            <td className="px-8 py-6 text-gray-500 text-[10px] font-black uppercase tracking-widest">{trx.date}</td>
                            <td className="px-8 py-6">
                                {trx.status === 'Verified' && <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-tmt-emerald/20 text-tmt-emerald border border-tmt-emerald/30 shadow-lg shadow-tmt-emerald/5"><CheckCircle2 className="w-3 h-3"/> Verified</span>}
                                {trx.status === 'Pending' && <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-amber-500/20 text-amber-500 border border-amber-500/30"><Clock className="w-3 h-3"/> Pending</span>}
                                {trx.status === 'Failed' && <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-rose-500/20 text-rose-500 border border-rose-500/30"><XCircle className="w-3 h-3"/> Failed</span>}
                            </td>
                            <td className="px-8 py-6 text-right">
                                <div className="flex justify-end gap-2 items-center">
                                    <button 
                                        className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all" 
                                        title="View Details"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                    </button>
                                    <button 
                                        className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-tmt-emerald hover:bg-tmt-emerald hover:text-white transition-all shadow-sm"
                                        title="Edit Entry"
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </button>
                                    <button 
                                        className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                                        onClick={() => setTransactionToDelete(trx)}
                                        title="Void Transaction"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            {filteredTransactions.length === 0 && (
                <div className="flex flex-col items-center justify-center py-24 bg-black/20">
                    <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-[1.5rem] flex items-center justify-center mb-4 text-gray-600">
                        <CreditCard className="w-8 h-8" />
                    </div>
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">No matching ledger entries</p>
                </div>
            )}
        </div>
      </div>

      {/* Transaction Void Confirmation Modal */}
      {transactionToDelete && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity" onClick={() => setTransactionToDelete(null)} />
          <div className="relative bg-[#0d0d0d] w-full max-w-md rounded-[3rem] border border-white/10 shadow-2xl p-10 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-start mb-8">
              <div className="w-16 h-16 bg-rose-500/10 border border-rose-500/20 rounded-[1.5rem] flex items-center justify-center text-rose-500 shadow-xl shadow-rose-500/5">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <button onClick={() => setTransactionToDelete(null)} className="p-2 text-gray-600 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <h3 className="text-2xl font-black text-white uppercase tracking-tight">Void Transaction?</h3>
            <p className="text-sm text-gray-400 mt-4 font-medium leading-relaxed">
              You are about to purge <span className="text-white font-black">{transactionToDelete.id}</span> from the ledger. This will revoke system-wide access for <span className="text-white font-black">{transactionToDelete.student}</span>.
            </p>

            <div className="flex gap-4 mt-10">
              <button 
                onClick={() => setTransactionToDelete(null)}
                className="flex-1 py-4 px-4 bg-white/5 border border-white/10 rounded-2xl text-gray-500 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all"
              >
                Abort
              </button>
              <button 
                onClick={handleDelete}
                className="flex-1 py-4 px-4 bg-rose-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 transition-all shadow-xl shadow-rose-500/30 border border-rose-400/20"
              >
                Void Ledger
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentsView;
