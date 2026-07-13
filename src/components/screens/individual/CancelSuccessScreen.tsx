import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { useReducedMotion } from '../../../hooks/useReducedMotion';


export default function CancelSuccessScreen() {
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

  const reduced = useReducedMotion();

  return (
    <div className="flex flex-col min-h-full bg-slate-950 text-white p-6 justify-between relative">
      <div className="flex-1 flex flex-col justify-center items-center text-center space-y-6 z-10">
        <motion.div
          initial={reduced ? { opacity: 1 } : { scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={reduced ? {} : { type: "spring", stiffness: 200, damping: 10 }}
          className="w-20 h-20 rounded-full bg-emerald-950/80 border-2 border-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/10"
        >
          <Check className="w-10 h-10 text-emerald-400" />
        </motion.div>
        <div className="space-y-2">
          <motion.h2
            initial={reduced ? {} : { scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={reduced ? {} : { type: "spring", stiffness: 150, delay: 0.3 }}
            className="text-2xl font-black text-white"
          >
            Subscription Cancelled
          </motion.h2>
          <motion.p
            initial={reduced ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={reduced ? {} : { delay: 0.5 }}
            className="text-sm text-slate-400 font-medium leading-relaxed max-w-xs"
          >
            Access ends on {selectedSub?.renewDate || 'the current billing period'}. No future charges will be billed to your card.
          </motion.p>
        </div>

        <button
          onClick={() => navigate('/your-win')}
          className="w-full py-4 bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-400 hover:to-sky-400 text-white font-bold rounded-2xl transition active:scale-[0.98] mt-2 shadow-lg focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
        >
          Share Your Savings
        </button>
        <button
          onClick={() => navigate('/home')}
          className="w-full py-4 bg-slate-900/60 hover:bg-slate-800 text-slate-300 font-bold rounded-2xl transition active:scale-[0.98] mt-2 border border-slate-800/80 shadow-lg focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}