import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, X, Check } from 'lucide-react';
import { useState, useEffect } from 'react';



export default function LinkBankProgressScreen() {
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

  const [phase, setPhase] = useState<'loading' | 'success'>('loading');

  useEffect(() => {
    const t = setTimeout(() => setPhase('success'), 1500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (phase === 'success') {
      const t = setTimeout(() => navigate('/vault'), 1200);
      return () => clearTimeout(t);
    }
  }, [phase, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-full bg-slate-950 text-white p-6 space-y-6 relative">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30" aria-hidden="true">
        <AnimatePresence>
          {phase === 'loading' && (
            <motion.div
              key="spinner"
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute w-[400px] h-[400px] rounded-full origin-center"
              style={{ background: "conic-gradient(from 0deg, rgba(14,165,233,0.4) 0deg, transparent 60deg)" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, ease: "linear", repeat: Infinity }}
            />
          )}
        </AnimatePresence>
        <div className="absolute w-[200px] h-[200px] rounded-full border border-sky-500/20" />
        <div className="absolute w-[300px] h-[300px] rounded-full border border-sky-500/10" />
      </div>

      <motion.div
        key={phase}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={phase === 'success' ? { type: "spring", stiffness: 300, damping: 15 } : { duration: 0.3 }}
        className="relative w-20 h-20 flex items-center justify-center z-10"
      >
        <div className={`absolute inset-0 rounded-full blur-xl ${phase === 'success' ? 'bg-emerald-500/25' : 'bg-sky-500/15'}`} aria-hidden="true" />
        <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center relative ${
          phase === 'success'
            ? 'bg-emerald-900/40 border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.3)]'
            : 'bg-slate-900 border-slate-800 shadow-[0_0_20px_rgba(14,165,233,0.2)]'
        }`}>
          {phase === 'loading' && (
            <>
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="28" stroke="rgba(14,165,233,0.15)" strokeWidth="3" fill="none" />
                <motion.circle cx="32" cy="32" r="28" stroke="#38bdf8" strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray="176" initial={{ strokeDashoffset: 176 }} animate={{ strokeDashoffset: 0 }} transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }} />
              </svg>
              <ShieldCheck className="w-7 h-7 text-sky-400" />
            </>
          )}
          {phase === 'success' && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 12 }}
            >
              <Check className="w-8 h-8 text-emerald-400" strokeWidth={3} />
            </motion.div>
          )}
        </div>
      </motion.div>

      <div className="space-y-2 text-center z-10">
        <AnimatePresence mode="wait">
          {phase === 'loading' && (
            <motion.div key="loading" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <h3 className="text-lg font-bold text-white tracking-wide">Securing RBI Sandbox...</h3>
              <p className="text-xs text-slate-400 mt-1">Establishing 256-bit encrypted handshake</p>
            </motion.div>
          )}
          {phase === 'success' && (
            <motion.div key="success" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <h3 className="text-lg font-bold text-emerald-400 tracking-wide">Bank linked successfully!</h3>
              <p className="text-xs text-slate-400 mt-1">Account Aggregator connected</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <button onClick={() => navigate('/vault')} className="text-[10px] text-slate-500 hover:text-slate-300 font-bold tracking-wider z-20 focus-visible:ring-2 focus-visible:ring-sky-500 rounded-lg p-2 flex items-center space-x-1">
        <X className="w-3 h-3" />
        <span>Cancel</span>
      </button>
    </div>
  );
}

