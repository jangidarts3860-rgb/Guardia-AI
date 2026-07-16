import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store';
import { motion } from 'motion/react';
import { Check, Sparkles, ArrowRight } from 'lucide-react';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

export default function CancelSuccessScreen() {
  const navigate = useNavigate();
  const { selectedSub } = useStore();
  const reduced = useReducedMotion();

  return (
    <div className="flex flex-col flex-1 bg-transparent text-white p-6 overflow-y-auto">
      <div className="flex-1 flex flex-col justify-center items-center text-center space-y-6 max-w-sm mx-auto w-full">
        {/* Animated Checkmark */}
        <motion.div
          initial={reduced ? { opacity: 1 } : { scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={reduced ? {} : { type: 'spring', stiffness: 200, damping: 10 }}
          className="w-20 h-20 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.15)]"
        >
          <motion.div
            initial={reduced ? {} : { scale: 0 }}
            animate={{ scale: 1 }}
            transition={reduced ? {} : { delay: 0.15, type: 'spring', stiffness: 400, damping: 8 }}
          >
            <Check className="w-10 h-10 text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          </motion.div>
        </motion.div>

        {/* Title & Description */}
        <motion.div
          initial={reduced ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduced ? {} : { delay: 0.25, type: 'spring', stiffness: 150 }}
          className="space-y-2"
        >
          <h1 className="text-2xl font-black text-white tracking-tight">Subscription Cancelled</h1>
          <p className="text-sm text-slate-400 leading-relaxed max-w-xs mx-auto">
            Access ends on <span className="text-slate-200 font-semibold">{selectedSub?.renewDate || 'the current billing period'}</span>. No future charges will be billed to your card.
          </p>
        </motion.div>

        {/* Savings Card */}
        <motion.div
          initial={reduced ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduced ? {} : { delay: 0.35 }}
          className="w-full p-5 bg-gradient-to-br from-emerald-950/30 to-slate-900/60 border border-emerald-500/15 rounded-2xl space-y-3 text-left"
        >
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-emerald-400" aria-hidden="true" />
            <span className="text-xs font-black uppercase tracking-widest text-emerald-400">You're saving big</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            By cancelling unused subscriptions, you've taken control of your finances. Keep monitoring with Guardia AI.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={reduced ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduced ? {} : { delay: 0.45 }}
          className="w-full space-y-3 pt-2"
        >
          <button
            onClick={() => navigate('/your-win')}
            className="w-full py-4 bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-400 hover:to-sky-400 text-white font-bold rounded-2xl transition active:scale-[0.98] shadow-lg shadow-emerald-500/15 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617] flex items-center justify-center space-x-2"
          >
            <span>Share Your Savings</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
          <button
            onClick={() => navigate('/home')}
            className="w-full py-4 bg-slate-900/50 hover:bg-slate-800/80 text-slate-300 font-bold rounded-2xl transition active:scale-[0.98] border border-slate-800/50 shadow-lg focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617]"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    </div>
  );
}
