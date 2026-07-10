import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Lock, Check, AlertTriangle } from 'lucide-react';
import React from 'react';
import SlideToAction from '../../ui/shared/SlideToAction';
import ConfirmationDialog from '../../ui/shared/ConfirmationDialog';
import { useState } from 'react';

export default function FreezeAccountsConfirmScreen() {
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

  const [showConfirm, setShowConfirm] = useState(false);
  const [showBurst, setShowBurst] = useState(false);

  const handleSlideComplete = () => {
    setShowBurst(true);
    setTimeout(() => {
      setShowBurst(false);
      setShowConfirm(true);
    }, 600);
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-950 text-white p-5 justify-between relative">
      <div className="absolute inset-0 bg-gradient-to-b from-red-950/10 via-transparent to-transparent pointer-events-none" aria-hidden="true" />
      <AnimatePresence>
        {showBurst && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 2.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute inset-0 bg-red-600/20 rounded-[inherit] pointer-events-none z-50"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
      <div className="space-y-5 z-10 text-left">
        <div className="flex justify-between items-center pt-2">
          <button onClick={() => navigate('/vault')} className="p-2 -ml-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 transition focus-visible:ring-2 focus-visible:ring-sky-500" aria-label="Go back">
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          </button>
          <span className="text-xs font-mono text-red-500 bg-red-500/10 border border-red-500/20 px-2.5 py-1 rounded-full uppercase font-bold tracking-wider">Security Verification</span>
          <div className="w-8" />
        </div>

        <div className="text-center py-2 space-y-2">
          <motion.div animate={{ x: [-5, 5, -5, 5, 0] }} transition={{ repeat: Infinity, duration: 2, repeatDelay: 1 }}
            className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto text-red-500">
            <Lock className="w-8 h-8" aria-hidden="true" />
          </motion.div>
          <h2 className="text-2xl font-black text-red-500 tracking-tight">Confirm Freeze</h2>
          <p className="text-xs text-slate-400 px-4 leading-normal">
            This will freeze all cards & disconnect active UPI mandates.
          </p>
        </div>

        <div className="space-y-2.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Accounts to lock</span>
          {[
            { name: 'HDFC Bank savings (*4321)', desc: 'Blocks all ATM and NetBanking debits' },
            { name: 'ICICI Credit Card (*8823)', desc: 'Locks swipe & international e-com transactions' },
            { name: 'UPI Aggregator Token', desc: 'Revokes active mandates on Swiggy, Paytm, etc.' },
          ].map((item, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }}
              className="p-3 bg-slate-900 border border-slate-800/80 rounded-xl flex items-start space-x-3 text-xs">
              <div className="mt-0.5 w-4.5 h-4.5 rounded bg-red-600/10 border border-red-600/30 flex items-center justify-center text-red-500">
                <Check className="w-3 h-3" strokeWidth={3} />
              </div>
              <div>
                <p className="font-bold text-white">{item.name}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="p-3.5 bg-amber-500/5 border border-amber-500/20 rounded-xl flex space-x-2.5 items-start text-left">
          <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-[11px] text-slate-400 leading-normal">
            <strong className="text-white font-semibold">Warning:</strong> Biometric OTP required to restore access after freeze.
          </p>
        </div>
      </div>

      <div className="space-y-4 z-10 pb-4">
        <SlideToAction onComplete={handleSlideComplete} label="Slide to execute freeze" variant="danger" />
        <button onClick={() => navigate('/vault')} className="w-full py-3.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 text-xs font-semibold rounded-2xl transition focus-visible:ring-2 focus-visible:ring-sky-500">
          Cancel & Keep Active
        </button>
      </div>

      {showConfirm && (
        <ConfirmationDialog
          open={showConfirm}
          title="Freeze All Accounts?"
          message="This will immediately block all linked bank accounts, cards, and UPI tokens. You will need biometric verification to restore access."
          confirmLabel="Yes, Freeze Everything"
          cancelLabel="Keep Active"
          variant="danger"
          onConfirm={() => {
            setBanks(prev => prev.map(b => ({ ...b, isConnected: false })));
            setShowConfirm(false);
            navigate('/home');
          }}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}

