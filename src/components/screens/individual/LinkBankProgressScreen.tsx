import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, X, Check } from 'lucide-react';
import { useState, useEffect } from 'react';

const steps = [
  "Consent Established",
  "RBI Sandbox Handshake",
  "Accounts Discovered",
  "Secure Connection Complete",
];

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
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (phase === 'loading' && step < steps.length) {
      const t = setTimeout(() => setStep(s => s + 1), 400);
      return () => clearTimeout(t);
    }
    if (step === steps.length && phase === 'loading') {
      setPhase('success');
    }
  }, [phase, step]);

  useEffect(() => {
    if (phase === 'success') {
      const query = new URLSearchParams(window.location.search);
      const bankId = query.get('bankId');
      if (bankId) {
        setBanks(prev => {
          const bank = prev.find(b => b.id === bankId);
          if (bank) {
            setActivities(actPrev => [{ 
              id: 'act-link-' + Date.now(), 
              title: `${bank.name} linked`, 
              description: 'Account Aggregator connected successfully', 
              time: 'Just now', 
              status: 'Verified' 
            }, ...actPrev]);
            setNotifications(notPrev => [{ 
              id: 'not-link-' + Date.now(), 
              title: `${bank.name} linked successfully`, 
              description: 'Security monitoring initiated.', 
              time: 'now', 
              type: 'System' as const, 
              risk: 'Success', 
              unread: true 
            }, ...notPrev]);
          }
          return prev.map(b => b.id === bankId ? { 
            ...b, 
            isConnected: true, 
            balance: Math.floor(Math.random() * 50000) + 10000, 
            accNumber: '•••• ' + Math.floor(Math.random() * 9000 + 1000), 
            lastSynced: 'Just now' 
          } : b);
        });
      }
    }
  }, [phase, setBanks, setActivities, setNotifications]);

  useEffect(() => {
    if (phase === 'success') {
      const t = setTimeout(() => navigate('/home'), 1200);
      return () => clearTimeout(t);
    }
  }, [phase, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-full bg-slate-950 text-white p-6 space-y-6">
      <motion.div
        key={phase}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={phase === 'success' ? { type: "spring", stiffness: 300, damping: 15 } : { duration: 0.3 }}
        className="relative w-20 h-20 flex items-center justify-center"
      >
        <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center ${
          phase === 'success'
            ? 'bg-emerald-900/40 border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.3)]'
            : 'bg-slate-900 border-slate-800'
        }`}>
          {phase === 'loading' && (
            <ShieldCheck className="w-7 h-7 text-sky-400" />
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

      {phase === 'loading' && (
        <div className="space-y-3 w-full max-w-xs">
          {steps.map((label, i) => (
            <div key={i} className={`flex items-center space-x-3 p-3 rounded-xl border transition-all duration-300 ${
              i < step 
                ? 'bg-emerald-900/20 border-emerald-800/30 text-emerald-400' 
                : i === step 
                ? 'bg-sky-900/20 border-sky-800/30 text-sky-400' 
                : 'bg-slate-900/50 border-slate-800/50 text-slate-500'
            }`}>
              {i < step ? (
                <Check className="w-4 h-4 shrink-0" />
              ) : i === step ? (
                <div className="w-4 h-4 shrink-0 border-2 border-current rounded-full animate-pulse" />
              ) : (
                <div className="w-4 h-4 shrink-0 border-2 border-slate-600 rounded-full" />
              )}
              <span className="text-sm font-semibold">{label}</span>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-2 text-center">
        <AnimatePresence mode="wait">
          {phase === 'loading' && (
            <motion.div key="loading" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <h3 className="text-lg font-bold text-white tracking-wide">Connecting to your bank...</h3>
              <p className="text-xs text-slate-400 mt-1">Securing your connection...</p>
            </motion.div>
          )}
          {phase === 'success' && (
            <motion.div key="success" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <h3 className="text-lg font-bold text-emerald-400 tracking-wide">Bank linked successfully!</h3>
              <p className="text-xs text-slate-400 mt-1">Your bank is now connected</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <button onClick={() => navigate('/home')} className="text-xs text-slate-500 hover:text-slate-300 font-bold tracking-wider focus-visible:ring-2 focus-visible:ring-sky-500 rounded-lg p-2 flex items-center space-x-1">
        <X className="w-3 h-3" />
        <span>Cancel</span>
      </button>
    </div>
  );
}
