import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store';
import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Check, Sparkles, Eye, EyeOff } from 'lucide-react';
import confetti from 'canvas-confetti';
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
  const savedAmount = selectedSub?.cost ?? 649;
  const [isAnonymized, setIsAnonymized] = useState(true);

  useEffect(() => {
    if (reduced) return;
    const duration = 2000;
    const end = Date.now() + duration;
    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ['#2dd4bf', '#38bdf8', '#34d399'],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ['#2dd4bf', '#38bdf8', '#34d399'],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, [reduced]);

  return (
    <div className="flex flex-col min-h-full bg-slate-950 text-white p-6 justify-between relative">
      <div className="absolute inset-0 bg-radial-[circle_at_top,rgba(16,185,129,0.1)_0%,transparent_60%] pointer-events-none" aria-hidden="true" />
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
          <motion.p
            initial={reduced ? {} : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduced ? {} : { delay: 0.2 }}
            className="text-xs uppercase font-extrabold tracking-wider text-emerald-400"
          >
            Done! You saved
          </motion.p>
          <motion.h2
            initial={reduced ? {} : { scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={reduced ? {} : { type: "spring", stiffness: 150, delay: 0.3 }}
            className="text-5xl font-black text-emerald-400"
          >
            ₹{isAnonymized ? 'X,XXX' : savedAmount}
          </motion.h2>
          <motion.p
            initial={reduced ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={reduced ? {} : { delay: 0.5 }}
            className="text-sm text-slate-400 font-semibold"
          >
            this month
          </motion.p>
        </div>
        <motion.h3
          initial={reduced ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduced ? {} : { delay: 0.6 }}
          className="text-lg font-bold text-slate-200"
        >
          ₹{isAnonymized ? 'XX,XXX' : savedAmount * 12} saved this year
        </motion.h3>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex justify-between items-center w-full max-w-xs">
          <div className="text-left">
            <p className="text-xs font-bold text-white">Hide exact amount</p>
            <p className="text-xs text-slate-500 mt-0.5">Hide the exact amount when sharing</p>
          </div>
          <button onClick={() => setIsAnonymized(!isAnonymized)} className={`w-11 h-6 rounded-full transition relative ${isAnonymized ? 'bg-sky-500' : 'bg-slate-800'}`} role="switch" aria-checked={isAnonymized} aria-label="Hide savings amount">
            <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${isAnonymized ? 'left-[22px]' : 'left-0.5'}`} />
          </button>
        </div>

        <button
          onClick={() => navigate('/your-win')}
          className="w-full py-4 bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-400 hover:to-sky-400 text-white font-bold rounded-2xl transition active:scale-[0.98] mt-2 shadow-lg focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 flex items-center justify-center space-x-2"
        >
          <Sparkles className="w-4 h-4" aria-hidden="true" />
          <span>Share Your Savings</span>
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