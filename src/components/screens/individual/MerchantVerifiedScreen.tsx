import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store';
import { CheckCircle2, ArrowLeft, ExternalLink, ChevronDown, Info, Globe, Shield, Clock, Check } from 'lucide-react';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

export default function MerchantVerifiedScreen() {
  const navigate = useNavigate();
  const reduced = useReducedMotion();
  const [showDetails, setShowDetails] = useState(false);

  const safeDetails = [
    { icon: Globe, label: 'Domain Age', value: 'Verified (> 5 years)', color: 'text-emerald-400' },
    { icon: Shield, label: 'UPI ID Match', value: 'Verified — NPCI registered', color: 'text-emerald-400' },
    { icon: Check, label: 'Historical Reports', value: '0 reports in last 90 days', color: 'text-emerald-400' },
    { icon: Clock, label: 'Scan Timestamp', value: new Date().toLocaleString('en-IN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short' }), color: 'text-slate-300' },
  ];

  return (
    <div className="flex flex-col flex-1 bg-transparent text-white p-5 relative overflow-y-auto">
      <button
        onClick={() => navigate('/home')}
        className="absolute top-4 left-4 z-50 w-9 h-9 flex items-center justify-center rounded-full bg-slate-900/80 border border-slate-700/50 backdrop-blur-md hover:bg-slate-800 transition shadow-lg"
        aria-label="Go home"
      >
        <ArrowLeft className="w-5 h-5 text-slate-300" aria-hidden="true" />
      </button>

      <div className="flex-1 flex flex-col items-center justify-center px-4 pt-12">
        {/* Verified Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 12 }}
          className="w-24 h-24 rounded-full bg-emerald-500/10 border-2 border-emerald-500/20 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(16,185,129,0.1)]"
        >
          <CheckCircle2 className="w-14 h-14 text-emerald-400 drop-shadow-[0_0_20px_rgba(52,211,153,0.3)]" aria-hidden="true" />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-2xl font-extrabold tracking-tight"
        >
          Merchant Verified
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="text-xs text-slate-400 mt-2 text-center max-w-xs px-2"
        >
          This payment link is legitimate. Always{' '}
          <strong className="text-slate-200">review merchant history.</strong>
        </motion.p>

        {/* Merchant Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="w-full rounded-2xl p-4 mt-8 space-y-3 card-success"
        >
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-slate-400">Merchant</span>
            <span className="text-xs font-semibold text-white">Flipkart</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-slate-400">Risk Assessment</span>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 font-bold px-2 py-0.5 rounded-full border border-emerald-500/20">No risks detected</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-slate-400">Registered</span>
            <span className="text-xs font-semibold text-slate-200">8 years ago</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-slate-400">GST Verified</span>
            <span className="text-xs font-semibold text-emerald-400">Yes ✓</span>
          </div>
          <div className="border-t border-slate-800/40" />
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-slate-400">Verified at</span>
            <span className="text-xs font-semibold text-slate-200">{new Date().toLocaleString('en-IN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short', year: 'numeric' })}</span>
          </div>
        </motion.div>

        {/* Why this score? */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          onClick={() => setShowDetails(!showDetails)}
          className="w-full mt-4 flex items-center justify-between p-3 card-surface text-left"
          aria-expanded={showDetails}
        >
          <span className="flex items-center space-x-2 text-xs font-semibold text-sky-400">
            <span className="w-5 h-5 rounded-full bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
              <Info className="w-3 h-3" aria-hidden="true" />
            </span>
            <span>Why is it verified?</span>
          </span>
          <motion.span
            animate={{ rotate: showDetails ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-slate-400"
          >
            <ChevronDown className="w-4 h-4" aria-hidden="true" />
          </motion.span>
        </motion.button>
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-2 overflow-hidden w-full"
            >
              <div className="bg-transparent/60 border border-slate-800/60 rounded-2xl p-4 space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-mono">Evidence Details</p>
                <div className="space-y-2.5">
                  {safeDetails.map((detail, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.08 }}
                      className="flex items-center space-x-3 p-2 card-surface rounded-xl"
                    >
                      <span className={`w-6 h-6 rounded-full bg-slate-800/50 flex items-center justify-center shrink-0 ${detail.color}`}>
                        <detail.icon className="w-3.5 h-3.5" aria-hidden="true" />
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-slate-400 font-medium">{detail.label}</p>
                        <p className="text-xs font-semibold text-slate-200 truncate">{detail.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Buttons */}
      <div className="pb-4 pt-4 w-full space-y-3">
        <button
          onClick={() => navigate('/receipt-dark')}
          className="w-full text-white font-bold py-4 rounded-2xl btn-premium transition focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617]"
        >
          Proceed to Pay →
        </button>
        <button
          onClick={() => navigate('/scan-qr')}
          className="w-full text-slate-300 font-bold py-4 rounded-2xl bg-slate-900/50 border border-slate-800/60 hover:bg-slate-800 transition active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-sky-500"
        >
          Scan Again
        </button>
        <button
          onClick={() => navigate('/safe-report')}
          className="text-xs text-center text-slate-400 flex items-center justify-center space-x-1 mx-auto focus-visible:ring-2 focus-visible:ring-sky-500 rounded p-1"
        >
          <ExternalLink className="w-3 h-3" aria-hidden="true" />
          <span>Report an issue with this merchant</span>
        </button>
      </div>
    </div>
  );
}
