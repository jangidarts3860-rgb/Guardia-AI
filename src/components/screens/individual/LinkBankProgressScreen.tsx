import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, X, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getBankLogo } from '../Screens';

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

  const query = new URLSearchParams(window.location.search);
  const bankId = query.get('bankId') || 'sbi';

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
    if (phase === 'success' && bankId) {
      const bank = banks.find(b => b.id === bankId);
      if (bank && !bank.isConnected) {
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

        setBanks(prev => prev.map(b => b.id === bankId ? { 
          ...b, 
          isConnected: true, 
          balance: Math.floor(Math.random() * 50000) + 10000, 
          accNumber: '•••• ' + Math.floor(Math.random() * 9000 + 1000), 
          lastSynced: 'Just now' 
        } : b));
      }
    }
  }, [phase, bankId, banks, setBanks, setActivities, setNotifications]);

  useEffect(() => {
    if (phase === 'success') {
      const t = setTimeout(() => navigate('/home'), 1200);
      return () => clearTimeout(t);
    }
  }, [phase, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-full bg-transparent text-white p-6 space-y-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={phase === 'success' ? { type: "spring", stiffness: 300, damping: 15 } : { duration: 0.3 }}
        className="relative w-32 h-32 flex items-center justify-center"
      >
        {phase === 'loading' && (
          <>
             {/* Radar Sweep Effect */}
             <div className="absolute inset-0 rounded-full border-[2px] border-cyan-500/20" />
             <div className="absolute inset-0 rounded-full bg-cyan-500/5 animate-pulse" />
             <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-cyan-400 animate-spin" style={{ animationDuration: '1.5s' }} />
             <div className="absolute inset-0 rounded-full animate-ping" style={{ animationDuration: '3s', background: 'radial-gradient(circle, rgba(34,211,238,0.1) 0%, transparent 70%)' }} />
          </>
        )}
        <div className={`w-20 h-20 rounded-[1.2rem] flex items-center justify-center relative z-10 transition-all duration-500 ${
          phase === 'success'
            ? 'bg-emerald-500 shadow-[0_0_40px_rgba(16,185,129,0.5)]'
            : 'bg-transparent shadow-[0_0_25px_rgba(34,211,238,0.2)]'
        }`}>
          {phase === 'loading' && (
            <div className="scale-[1.2]">
              {getBankLogo(bankId, 'Bank', 'w-16 h-16 rounded-[1.2rem]')}
            </div>
          )}
          {phase === 'success' && (
            <motion.div
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 12, delay: 0.1 }}
            >
              <Check className="w-12 h-12 text-white" strokeWidth={4} />
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
                : 'bg-slate-900/50 border-slate-800/50 text-slate-400'
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

      <button onClick={() => navigate('/home')} className="text-xs text-slate-400 hover:text-slate-300 font-bold tracking-wider focus-visible:ring-2 focus-visible:ring-sky-500 rounded-lg p-2 flex items-center space-x-1">
        <X className="w-3 h-3" />
        <span>Cancel</span>
      </button>
    </div>
  );
}
