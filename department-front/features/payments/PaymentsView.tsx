
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
  CreditCard,
  Plus,
  ChevronDown
} from 'lucide-react';

const INITIAL_TRANSACTIONS = [
  { id: 'TRX-9928', student: 'Alex Johnson', amount: '$497.00', method: 'Stripe', date: 'Oct 25, 10:00 AM', status: 'Verified' },
  { id: 'TRX-9929', student: 'Sarah Williams', amount: '$997.00', method: 'PayPal', date: 'Oct 25, 09:15 AM', status: 'Verified' },
  { id: 'TRX-9930', student: 'Michael Brown', amount: '$497.00', method: 'Bank Transfer', date: 'Oct 25, 11:30 AM', status: 'Failed' },
  { id: 'TRX-9931', student: 'Emily Davis', amount: '$2,497.00', method: 'Crypto', date: 'Oct 25, 12:45 PM', status: 'Pending' },
  { id: 'TRX-9932', student: 'Jessica Lee', amount: '$497.00', method: 'Stripe', date: 'Oct 25, 01:20 PM', status: 'Verified' },
  { id: 'TRX-9933', student: 'Chris Evans', amount: '$1,497.00', method: 'Stripe', date: 'Oct 25, 02:45 PM', status: 'Verified' },
  { id: 'TRX-9934', student: 'Robert Downey', amount: '$497.00', method: 'PayPal', date: 'Oct 25, 03:10 PM', status: 'Pending' },
  { id: 'TRX-9935', student: 'Scarlett Joh', amount: '$997.00', method: 'Crypto', date: 'Oct 25, 03:55 PM', status: 'Verified' },
  { id: 'TRX-9936', student: 'Mark Ruffalo', amount: '$497.00', method: 'Stripe', date: 'Oct 25, 04:20 PM', status: 'Failed' },
  { id: 'TRX-9937', student: 'Jeremy Renner', amount: '$2,497.00', method: 'Bank Transfer', date: 'Oct 25, 05:00 PM', status: 'Verified' },
  { id: 'TRX-9938', student: 'Paul Rudd', amount: '$497.00', method: 'Stripe', date: 'Oct 25, 05:30 PM', status: 'Verified' },
];

const PaymentsView = () => {
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [transactionToDelete, setTransactionToDelete] = useState<typeof INITIAL_TRANSACTIONS[0] | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<typeof INITIAL_TRANSACTIONS[0] | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [methodFilter, setMethodFilter] = useState<string>('All');
  const [newTrx, setNewTrx] = useState({
    student: '',
    amount: '',
    method: 'Stripe',
    status: 'Pending'
  });

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.student.toLowerCase().includes(searchTerm.toLowerCase()) || 
      t.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
    const matchesMethod = methodFilter === 'All' || t.method === methodFilter;
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const handleDelete = () => {
    if (transactionToDelete) {
      setTransactions(transactions.filter(t => t.id !== transactionToDelete.id));
      setTransactionToDelete(null);
    }
  };

  const handleUpdateStatus = (id: string, newStatus: string) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `TRX-${Math.floor(1000 + Math.random() * 9000)}`;
    const date = new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    
    const formattedAmount = newTrx.amount.startsWith('$') ? newTrx.amount : `$${newTrx.amount}`;

    setTransactions([{
      id,
      student: newTrx.student,
      amount: formattedAmount,
      method: newTrx.method,
      date,
      status: newTrx.status
    }, ...transactions]);

    setIsModalOpen(false);
    setNewTrx({ student: '', amount: '', method: 'Stripe', status: 'Pending' });
  };

  const handleExportLedger = () => {
    const csvContent = [
      ['Transaction ID', 'Student', 'Amount', 'Method', 'Date', 'Status'],
      ...filteredTransactions.map(t => [t.id, t.student, t.amount, t.method, t.date, t.status])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `payment-ledger-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500 relative text-white bg-[#030906]">
      {/* Header & Summary Section */}
      <div className="sticky top-0 z-[60] px-4 md:px-6 lg:px-10 pt-0 pb-4 bg-[#030906]">
        <div className="px-6 md:px-8 py-2 space-y-6">

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          <div className="bg-[#030906] p-4 md:p-5 rounded-2xl md:rounded-[2rem] border border-white/10">
              <p className="text-gray-500 text-[8px] md:text-[9px] uppercase tracking-[0.15em] md:tracking-[0.2em] font-black">Verified Revenue</p>
              <p className="text-xl md:text-2xl font-black text-white mt-1 tracking-tight">
                ${transactions.filter(t => t.status === 'Verified').reduce((acc, curr) => acc + parseFloat(curr.amount.replace('$', '').replace(',', '')), 0).toLocaleString()}
              </p>
              {/* Mini Bar Graph */}
              <div className="mt-3 pt-3 border-t border-white/5">
                <div className="flex items-end gap-1 h-8">
                  {[65, 45, 75, 55, 85, 70, 90, 60, 95, 80].map((height, i) => (
                    <div key={i} className="flex-1 bg-gradient-to-t from-tmt-emerald to-tmt-emerald/40 rounded-t transition-all hover:from-tmt-emerald hover:to-tmt-emerald/60" style={{height: `${height}%`}} />
                  ))}
                </div>
              </div>
          </div>
          <div className="bg-[#030906] p-4 md:p-5 rounded-2xl md:rounded-[2rem] border border-white/10">
              <p className="text-gray-500 text-[8px] md:text-[9px] uppercase tracking-[0.15em] md:tracking-[0.2em] font-black">Held for Review</p>
              <p className="text-xl md:text-2xl font-black text-white mt-1 tracking-tight">
                ${transactions.filter(t => t.status === 'Pending').reduce((acc, curr) => acc + parseFloat(curr.amount.replace('$', '').replace(',', '')), 0).toLocaleString()}
              </p>
              {/* Mini Line Graph */}
              <div className="mt-3 pt-3 border-t border-white/5">
                <div className="relative h-8">
                  <svg className="w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="pendingGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.05" />
                      </linearGradient>
                    </defs>
                    <path d="M0,40 L10,35 L20,30 L30,32 L40,25 L50,28 L60,20 L70,22 L80,15 L90,18 L100,10" fill="none" stroke="#f59e0b" strokeWidth="2" />
                    <path d="M0,40 L10,35 L20,30 L30,32 L40,25 L50,28 L60,20 L70,22 L80,15 L90,18 L100,10 L100,50 L0,50 Z" fill="url(#pendingGradient)" />
                  </svg>
                </div>
              </div>
          </div>
          <div className="bg-[#030906] p-4 md:p-5 rounded-2xl md:rounded-[2rem] border border-white/10 sm:col-span-2 lg:col-span-1">
              <p className="text-gray-500 text-[8px] md:text-[9px] uppercase tracking-[0.15em] md:tracking-[0.2em] font-black">Failed Vol.</p>
              <p className="text-xl md:text-2xl font-black text-white mt-1 tracking-tight">
                ${transactions.filter(t => t.status === 'Failed').reduce((acc, curr) => acc + parseFloat(curr.amount.replace('$', '').replace(',', '')), 0).toLocaleString()}
              </p>
              {/* Mini Dot Graph */}
              <div className="mt-3 pt-3 border-t border-white/5">
                <div className="flex items-center justify-between h-8">
                  {[30, 20, 45, 25, 50, 35, 40, 30, 55, 40, 60, 45].map((size, i) => (
                    <div key={i} className="relative" style={{height: `${size}%`}}>
                      <div className="absolute bottom-0 w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-rose-500 opacity-60 hover:opacity-100 transition-opacity" style={{marginBottom: `${size}%`}} />
                    </div>
                  ))}
                </div>
              </div>
          </div>
        </div>
        
        {/* Table Controls (Search etc) */}
        <div className="pt-3 border-t border-white/10 flex flex-col gap-3 md:gap-4 lg:flex-row lg:items-center lg:justify-between">
             <div className="relative flex-1 w-full group">
                <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-3.5 md:w-4 h-3.5 md:h-4 text-tmt-emerald" />
                <input 
                    type="text" 
                    placeholder="Search by ID or Student..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 md:pl-11 pr-3 md:pr-4 py-2.5 md:py-3.5 text-[11px] md:text-xs font-bold bg-white/5 border border-white/10 rounded-xl md:rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-[#1cdf8a]/30 focus:border-[#1cdf8a]/60 transition-all"
                />
            </div>
            <div className="flex flex-wrap gap-2 justify-start md:justify-end w-full lg:w-auto">
                <button 
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className={`p-2.5 md:p-3 bg-white/5 border border-white/10 rounded-lg md:rounded-xl hover:bg-white/10 text-white transition-all ${isFilterOpen ? 'bg-tmt-emerald/20 border-tmt-emerald' : ''}`}
                >
              <Filter className="w-4 md:w-5 h-4 md:h-5" />
            </button>
            <button 
              onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-1.5 md:gap-2 px-3 md:px-5 py-2.5 md:py-3 bg-tmt-emerald text-white rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-black uppercase tracking-wider md:tracking-widest hover:bg-tmt-emerald/80 transition-all shadow-xl shadow-tmt-emerald/25 active:scale-95"
            >
              <Plus className="w-3.5 md:w-4 h-3.5 md:h-4" /> <span className="hidden xs:inline">Manual</span> Entry
            </button>
                <button 
                  onClick={handleExportLedger}
                  className="flex items-center gap-1.5 md:gap-2 px-3 md:px-5 py-2.5 md:py-3 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-black uppercase tracking-wider md:tracking-widest text-white hover:bg-white/10 transition-all"
                >
              <Download className="w-3.5 md:w-4 h-3.5 md:h-4" /> <span className="hidden xs:inline">Export</span> <span className="hidden sm:inline">Ledger</span>
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        {isFilterOpen && (
          <div className="mt-4 p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-2">Status</label>
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white font-bold focus:outline-none focus:ring-2 focus:ring-tmt-emerald/50"
                >
                  <option value="All">All Statuses</option>
                  <option value="Verified">Verified</option>
                  <option value="Pending">Pending</option>
                  <option value="Failed">Failed</option>
                </select>
              </div>
              <div>
                <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-2">Payment Method</label>
                <select 
                  value={methodFilter}
                  onChange={(e) => setMethodFilter(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white font-bold focus:outline-none focus:ring-2 focus:ring-tmt-emerald/50"
                >
                  <option value="All">All Methods</option>
                  <option value="Stripe">Stripe</option>
                  <option value="PayPal">PayPal</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Crypto">Crypto</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button 
                onClick={() => { setStatusFilter('All'); setMethodFilter('All'); }}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all"
              >
                Clear Filters
              </button>
              <button 
                onClick={() => setIsFilterOpen(false)}
                className="px-4 py-2 bg-tmt-emerald text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-tmt-emerald/80 transition-all"
              >
                Apply
              </button>
            </div>
          </div>
        )}

        {/* Fixed Table Header - Hidden on Mobile */}
        <div className="hidden lg:block bg-[#030906] border border-white/5 rounded-2xl -mx-6 md:-mx-8 mt-6 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[1000px]" style={{tableLayout: 'fixed'}}>
              <colgroup>
                <col style={{width: '12%'}} />
                <col style={{width: '16%'}} />
                <col style={{width: '12%'}} />
                <col style={{width: '14%'}} />
                <col style={{width: '14%'}} />
                <col style={{width: '18%'}} />
                <col style={{width: '14%'}} />
              </colgroup>
              <thead className="bg-black/40 backdrop-blur-md">
                <tr>
                  <th className="px-10 py-8 text-xs font-black text-gray-400 uppercase tracking-widest">Transaction ID</th>
                  <th className="px-10 py-8 text-xs font-black text-gray-400 uppercase tracking-widest">Identity</th>
                  <th className="px-10 py-8 text-xs font-black text-gray-400 uppercase tracking-widest">Volume</th>
                  <th className="px-10 py-8 text-xs font-black text-gray-400 uppercase tracking-widest">Method</th>
                  <th className="px-10 py-8 text-xs font-black text-gray-400 uppercase tracking-widest">Pulse Time</th>
                  <th className="px-10 py-8 text-xs font-black text-gray-400 uppercase tracking-widest">Status Management</th>
                  <th className="px-10 py-8 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Command</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
        </div>
      </div>

      {/* SCROLLABLE TABLE BODY - Desktop */}
      <div className="hidden lg:block relative flex-1 min-h-0 bg-[#030906]">
        <div className="h-full pb-16 overflow-y-auto bg-[#030906]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-0 min-w-[1000px]" style={{tableLayout: 'fixed'}}>
            <colgroup>
              <col style={{width: '12%'}} />
              <col style={{width: '16%'}} />
              <col style={{width: '12%'}} />
              <col style={{width: '14%'}} />
              <col style={{width: '14%'}} />
              <col style={{width: '18%'}} />
              <col style={{width: '14%'}} />
            </colgroup>
            <tbody className="divide-y divide-white/5">
              {filteredTransactions.map((trx) => (
                <tr 
                  key={trx.id} 
                  className="group hover:bg-white/[0.03] transition-all"
                >
                  <td className="px-10 py-6">
                    <div className="font-mono text-[10px] text-gray-500 font-black tracking-widest">{trx.id}</div>
                  </td>
                  <td className="px-10 py-6">
                    <div className="font-black text-white text-sm uppercase tracking-tight group-hover:text-tmt-emerald transition-colors">{trx.student}</div>
                  </td>
                  <td className="px-10 py-6">
                    <div className="text-white font-black text-sm">{trx.amount}</div>
                  </td>
                  <td className="px-10 py-6">
                    <span className="bg-white/10 border border-white/10 px-2.5 py-1 rounded-lg text-[10px] text-gray-200 font-black uppercase tracking-widest whitespace-nowrap">{trx.method}</span>
                  </td>
                  <td className="px-10 py-6">
                    <div className="text-gray-500 text-[10px] font-black uppercase tracking-widest">{trx.date}</div>
                  </td>
                  <td className="px-10 py-6">
                    <div className="relative inline-block w-48">
                      <select 
                        value={trx.status}
                        onChange={(e) => handleUpdateStatus(trx.id, e.target.value)}
                        className={`w-full appearance-none px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all cursor-pointer focus:outline-none
                          ${trx.status === 'Verified' ? 'bg-tmt-emerald/20 text-tmt-emerald border-tmt-emerald/30' : 
                            trx.status === 'Pending' ? 'bg-amber-500/20 text-amber-500 border-amber-500/30' : 
                            'bg-rose-500/20 text-rose-500 border-rose-500/30'}`}
                      >
                        <option value="Verified">Verified</option>
                        <option value="Pending">Pending</option>
                        <option value="Failed">Failed</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50 text-white">
                        <ChevronDown className="w-3 h-3" />
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-6 text-right">
                    <div className="flex justify-end gap-3">
                      <button 
                        onClick={() => setSelectedTransaction(trx)}
                        className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-tmt-emerald hover:text-white transition-all shadow-lg"
                        title="View Details"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-rose-500 hover:text-white transition-all shadow-lg"
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
            <div className="flex flex-col items-center justify-center py-24 bg-[#030906] rounded-[2.5rem] mt-8 mx-10 border border-white/10">
              <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-[1.5rem] flex items-center justify-center mb-4 text-gray-600">
                <CreditCard className="w-8 h-8" />
              </div>
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">No matching ledger entries</p>
            </div>
          )}
          </div>
        </div>
      </div>

      {/* MOBILE CARD LAYOUT */}
      <div className="lg:hidden flex-1 overflow-y-auto px-4 md:px-6 pb-6 space-y-3">
        {filteredTransactions.map((trx) => (
          <div key={trx.id} className="bg-[#030906] border border-white/10 rounded-2xl p-4 space-y-3">
            {/* Header Row */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="font-mono text-[10px] text-gray-500 font-black tracking-widest mb-1">{trx.id}</div>
                <div className="font-black text-white text-sm uppercase tracking-tight truncate">{trx.student}</div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button 
                  onClick={() => setSelectedTransaction(trx)}
                  className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-tmt-emerald hover:text-white transition-all"
                  title="View Details"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
                <button 
                  className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-rose-500 hover:text-white transition-all"
                  onClick={() => setTransactionToDelete(trx)}
                  title="Void Transaction"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/5">
              <div>
                <div className="text-[9px] text-gray-500 font-black uppercase tracking-widest mb-1">Volume</div>
                <div className="text-white font-black text-sm">{trx.amount}</div>
              </div>
              <div>
                <div className="text-[9px] text-gray-500 font-black uppercase tracking-widest mb-1">Method</div>
                <span className="inline-block bg-white/10 border border-white/10 px-2 py-0.5 rounded-lg text-[9px] text-gray-200 font-black uppercase tracking-widest">{trx.method}</span>
              </div>
              <div className="col-span-2">
                <div className="text-[9px] text-gray-500 font-black uppercase tracking-widest mb-1">Pulse Time</div>
                <div className="text-gray-400 text-[10px] font-black uppercase tracking-widest">{trx.date}</div>
              </div>
              <div className="col-span-2">
                <div className="text-[9px] text-gray-500 font-black uppercase tracking-widest mb-2">Status</div>
                <div className="relative">
                  <select 
                    value={trx.status}
                    onChange={(e) => handleUpdateStatus(trx.id, e.target.value)}
                    className={`w-full appearance-none px-3 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest border transition-all cursor-pointer focus:outline-none
                      ${trx.status === 'Verified' ? 'bg-tmt-emerald/20 text-tmt-emerald border-tmt-emerald/30' : 
                        trx.status === 'Pending' ? 'bg-amber-500/20 text-amber-500 border-amber-500/30' : 
                        'bg-rose-500/20 text-rose-500 border-rose-500/30'}`}
                  >
                    <option value="Verified">Verified</option>
                    <option value="Pending">Pending</option>
                    <option value="Failed">Failed</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                    <ChevronDown className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredTransactions.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 bg-[#030906] rounded-2xl border border-white/10">
            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mb-3 text-gray-600">
              <CreditCard className="w-6 h-6" />
            </div>
            <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">No matching ledger entries</p>
          </div>
        )}
      </div>

      {/* Manual Entry Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-[#0d0d0d] w-full max-w-lg rounded-[3rem] border border-white/10 shadow-2xl p-10 animate-in fade-in zoom-in duration-300">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-black text-white uppercase tracking-tight">Manual Transaction</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-gray-600 hover:text-white"><X className="w-6 h-6" /></button>
            </div>
            
            <form onSubmit={handleAddTransaction} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">Student Name</label>
                  <input 
                    type="text" 
                    required
                    value={newTrx.student}
                    onChange={(e) => setNewTrx({...newTrx, student: e.target.value})}
                    placeholder="Enter personnel identity"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm focus:ring-4 focus:ring-tmt-emerald/10 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">Volume (Amount)</label>
                    <input 
                      type="text" 
                      required
                      value={newTrx.amount}
                      onChange={(e) => setNewTrx({...newTrx, amount: e.target.value})}
                      placeholder="e.g. 497.00"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm focus:ring-4 focus:ring-tmt-emerald/10 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">Method</label>
                    <select 
                      value={newTrx.method}
                      onChange={(e) => setNewTrx({...newTrx, method: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm outline-none appearance-none"
                    >
                      <option value="Stripe">Stripe</option>
                      <option value="PayPal">PayPal</option>
                      <option value="Crypto">Crypto</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">Initial Status</label>
                  <div className="flex gap-2">
                    {['Verified', 'Pending', 'Failed'].map(s => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setNewTrx({...newTrx, status: s})}
                        className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all
                          ${newTrx.status === s ? 'bg-tmt-emerald border-tmt-emerald text-white' : 'bg-white/5 border-white/10 text-gray-500'}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-10">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-4 bg-white/5 border border-white/10 rounded-2xl text-gray-500 text-[10px] font-black uppercase tracking-widest hover:text-white transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-4 bg-tmt-emerald text-white rounded-2xl text-[10px] font-black uppercase tracking-widest border border-tmt-emerald/20 shadow-lg shadow-tmt-emerald/20"
                >
                  Verify & Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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

      {/* Transaction Details Modal */}
      {selectedTransaction && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setSelectedTransaction(null)} />
          <div className="relative bg-[#0d0d0d] w-full max-w-2xl rounded-[3rem] border border-white/10 shadow-2xl p-10 animate-in fade-in zoom-in duration-300">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-black text-white uppercase tracking-tight">Transaction Details</h3>
              <button onClick={() => setSelectedTransaction(null)} className="p-2 text-gray-600 hover:text-white"><X className="w-6 h-6" /></button>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Transaction ID</label>
                  <p className="text-white font-mono text-sm font-bold">{selectedTransaction.id}</p>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Status</label>
                  <span className={`inline-block px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border
                    ${selectedTransaction.status === 'Verified' ? 'bg-tmt-emerald/20 text-tmt-emerald border-tmt-emerald/30' : 
                      selectedTransaction.status === 'Pending' ? 'bg-amber-500/20 text-amber-500 border-amber-500/30' : 
                      'bg-rose-500/20 text-rose-500 border-rose-500/30'}`}>
                    {selectedTransaction.status}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Student Name</label>
                  <p className="text-white text-sm font-bold">{selectedTransaction.student}</p>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Amount</label>
                  <p className="text-white text-lg font-black">{selectedTransaction.amount}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Payment Method</label>
                  <p className="text-white text-sm font-bold">{selectedTransaction.method}</p>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Date & Time</label>
                  <p className="text-white text-sm font-bold">{selectedTransaction.date}</p>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                <button 
                  onClick={() => setSelectedTransaction(null)}
                  className="w-full py-4 bg-tmt-emerald text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-tmt-emerald/80 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentsView;