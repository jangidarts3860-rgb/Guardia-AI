import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store';
import { motion } from 'motion/react';
import { ArrowLeft, ShieldCheck, CheckCircle2 } from 'lucide-react';



export default function SafeReportScreen() {
  const navigate = useNavigate();
  const { 
    profile, setProfile, 
    subscriptions, setSubscriptions, 
    banks, setBanks, 
    notifications, setNotifications, 
    activities, setActivities, 
    selectedSub, setSelectedSub, 
    isOffline, setIsOffline, 
    scanOutcome, setScanOutcome 
  } = useStore();

  return (
    <div className="flex flex-col min-h-full bg-slate-950 text-white p-5 justify-between">
      <div className="flex justify-between items-center pt-2">
        <button onClick={() => navigate('/home')} className="p-2 -ml-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 transition focus-visible:ring-2 focus-visible:ring-sky-500" aria-label="Go back">
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
        </button>
        <span className="text-xs font-black tracking-widest text-emerald-500 font-mono uppercase bg-emerald-950/15 border border-emerald-500/20 px-3 py-1 rounded-full">System Safe</span>
        <div className="w-8" />
      </div>

      <div className="flex-1 flex flex-col justify-center items-center text-center space-y-6 py-4">
        <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 12 }} className="relative my-2">
          <div className="absolute inset-0 rounded-full border-2 border-emerald-500/20 scale-150 opacity-60" aria-hidden="true" />
          <div className="absolute inset-0 rounded-full border border-emerald-500/10 scale-200 opacity-30" aria-hidden="true" />
          <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-emerald-950 to-slate-950 border-2 border-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <ShieldCheck className="w-10 h-10 text-emerald-400" />
          </div>
        </motion.div>

        <div className="space-y-2">
          <h2 className="text-xl font-black tracking-tight text-white px-2">Everything looks safe right now!</h2>
          <p className="text-[11px] text-slate-400 leading-relaxed max-w-xs mx-auto">
            No critical threats, unapproved auto-debits, or malicious SMS links have been intercepted in the last 30 days.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
          <div className="p-3 bg-gradient-to-br from-slate-900/80 to-slate-950 border border-slate-800 rounded-2xl text-center shadow-sm">
            <ShieldCheck className="w-5 h-5 text-sky-400 mx-auto mb-1" aria-hidden="true" />
            <p className="text-lg font-extrabold font-mono text-white">0 Threats</p>
            <p className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">detected today</p>
          </div>
          <div className="p-3 bg-gradient-to-br from-slate-900/80 to-slate-950 border border-slate-800 rounded-2xl text-center shadow-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 mx-auto mb-1" aria-hidden="true" />
            <p className="text-lg font-extrabold font-mono text-white">12 Safe</p>
            <p className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">transacts audited</p>
          </div>
        </div>

        <div className="w-full max-w-xs bg-slate-900/40 border border-slate-900 rounded-2xl p-3.5 space-y-2.5 text-left overflow-hidden">
          <span className="text-[8px] font-black uppercase tracking-widest text-slate-500 font-mono">Continuous Shield Auditing</span>
          <div className="space-y-2 text-[10px]">
            {[
              { label: 'Auto-Debit Monitor', status: 'Live & Intercepting', color: 'text-emerald-400' },
              { label: 'UPI Collect Request Guard', status: '100% Protection', color: 'text-emerald-400' },
              { label: 'Bank Link Aggregator', status: 'SSL Encrypted', color: 'text-sky-400' },
              { label: 'Threat Database', status: 'Synced & Secure', color: 'text-emerald-400' }
            ].map((sys, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + (idx * 0.15) }}
                className={`flex justify-between items-center py-0.5 ${idx < 3 ? 'border-b border-slate-800/30' : ''}`}>
                <span className="text-slate-400 font-medium">{sys.label}</span>
                <span className={`${sys.color} font-bold font-mono`}>{sys.status}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="text-[9px] text-slate-600 font-mono tracking-wider">
          LAST AUDIT COMPLETED 2 MINUTES AGO • Guardia AI Core
        </div>
      </div>

      <div className="pt-2 pb-4">
        <button onClick={() => navigate('/home')} className="w-full py-3.5 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-2xl transition active:scale-[0.98] shadow-lg shadow-sky-500/10 focus-visible:ring-2 focus-visible:ring-sky-500">
          Return to Safety Dashboard
        </button>
      </div>
    </div>
  );
}

