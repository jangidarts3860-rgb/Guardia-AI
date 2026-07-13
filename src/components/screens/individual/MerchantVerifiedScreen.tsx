import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store';
import { CheckCircle2, ArrowLeft, ExternalLink, Receipt, ChevronDown, Info, Globe, Shield, Clock, Check } from 'lucide-react';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';


export default function MerchantVerifiedScreen() {
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
  const [showDetails, setShowDetails] = useState(false);

  const onScanAgain = () => navigate('/scan-qr');

  const safeDetails = [
    { icon: Globe, label: 'Domain Age', value: 'Verified (> 5 years)', color: 'text-emerald-400' },
    { icon: Shield, label: 'UPI ID Match', value: 'Verified — NPCI registered', color: 'text-emerald-400' },
    { icon: Check, label: 'Historical Reports', value: '0 reports in last 90 days', color: 'text-emerald-400' },
    { icon: Clock, label: 'Scan Timestamp', value: new Date().toLocaleString('en-IN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short' }), color: 'text-slate-300' },
  ];

  return (
    <div className="flex flex-col items-center justify-between min-h-full bg-slate-950 text-white p-5 relative">
      
      <div className="pt-4 w-full z-10">
        <button onClick={() => navigate('/home')} className="inline-flex items-center space-x-2 text-slate-400 hover:text-white transition p-2 -ml-2 focus-visible:ring-2 focus-visible:ring-sky-500 rounded-lg" aria-label="Go home">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-xs font-bold">Home</span>
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center z-10 px-4">
        <div className="w-24 h-24 rounded-full bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center mb-6">
          <CheckCircle2 className={`w-14 h-14 text-emerald-400 ${!reduced ? 'animate-[scaleIn_0.4s_ease-out] drop-shadow-[0_0_20px_rgba(52,211,153,0.3)]' : ''}`} aria-hidden="true" />
        </div>
        <h2 className={`text-2xl font-black tracking-tight ${!reduced ? 'animate-[fadeIn_0.5s_ease-out]' : ''}`}>Merchant Verified</h2>
        <p className={`text-sm text-slate-400 mt-2 text-center max-w-xs px-2 ${!reduced ? 'animate-[fadeIn_0.6s_ease-out]' : ''}`}>
          This payment link is legitimate. Always{' '}
          <strong className="text-slate-200">review merchant history.</strong>
        </p>

        <div className={`w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 mt-8 space-y-3 ${!reduced ? 'animate-[fadeIn_0.7s_ease-out]' : ''}`}>
          <div className="flex justify-between">
            <span className="text-xs text-slate-500">Merchant</span>
            <span className="text-xs text-white font-bold">Flipkart</span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-slate-500">Risk Assessment</span>
            <span className="text-xs bg-emerald-500/10 text-emerald-400 font-bold px-2 py-0.5 rounded-full">No known security risks detected</span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-slate-500">Registered</span>
            <span className="text-xs text-slate-300">8 years ago</span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-slate-500">GST Verified</span>
            <span className="text-xs text-emerald-400 font-bold">Yes ✓</span>
          </div>
          <div className="border-t border-slate-800/40" />
          <div className="flex justify-between">
            <span className="text-xs text-slate-500">Verified at</span>
            <span className="text-xs text-slate-300">{new Date().toLocaleString('en-IN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short', year: 'numeric' })}</span>
          </div>
        </div>

        {/* Why this score? Expandable Panel */}
        <button onClick={() => setShowDetails(!showDetails)} className="w-full mt-4 flex items-center justify-between p-3 bg-slate-900/40 border border-slate-800/60 rounded-2xl text-left transition hover:bg-slate-900/60 focus-visible:ring-2 focus-visible:ring-sky-500" aria-expanded={showDetails}>
          <span className="flex items-center space-x-2 text-xs font-medium text-sky-400">
            <span className="w-5 h-5 rounded-full bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
              <Info className="w-3 h-3" aria-hidden="true" />
            </span>
            <span>Why is it verified?</span>
          </span>
          <motion.span initial={{ rotate: 0 }} animate={{ rotate: showDetails ? 180 : 0 }} transition={{ duration: 0.2 }} className="text-slate-500">
            <ChevronDown className="w-4 h-4" aria-hidden="true" />
          </motion.span>
        </button>
        <AnimatePresence>
          {showDetails && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }} className="mt-2 overflow-hidden">
              <div className="bg-slate-950/60 border border-slate-800/60 rounded-2xl p-4 space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">Evidence Details</p>
                <div className="space-y-2.5">
                  {safeDetails.map((detail, idx) => (
                    <motion.div key={idx} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.08 }} className="flex items-center space-x-3 p-2 bg-slate-900/50 rounded-xl">
                      <span className={`w-6 h-6 rounded-full bg-slate-800/50 flex items-center justify-center shrink-0 ${detail.color}`}>
                        <detail.icon className="w-3.5 h-3.5" aria-hidden="true" />
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-slate-400 font-medium">{detail.label}</p>
                        <p className="text-xs font-medium truncate">{detail.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="pb-6 w-full z-10 space-y-3">
        <button onClick={() => navigate('/scan-qr')} className="w-full text-white font-bold py-4 rounded-2xl bg-sky-500 hover:bg-sky-400 transition active:scale-[0.98] shadow-lg focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950">
          Proceed to Pay →
        </button>
        <button onClick={onScanAgain} className="w-full text-slate-300 font-bold py-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:bg-slate-800 transition active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-sky-500">
          Scan Again
        </button>
        <button onClick={() => navigate('/receipt-dark')} className="w-full text-slate-300 font-bold py-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:bg-slate-800 transition active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-sky-500 flex items-center justify-center space-x-2">
          <Receipt className="w-4 h-4" aria-hidden="true" />
          <span>View Receipt</span>
        </button>
        <button onClick={() => navigate('/safe-report')} className="text-xs text-center text-slate-500 flex items-center justify-center space-x-1 mx-auto focus-visible:ring-2 focus-visible:ring-sky-500 rounded p-1">
          <ExternalLink className="w-3 h-3" aria-hidden="true" />
          <span>Report an issue with this merchant</span>
        </button>
      </div>
    </div>
  );
}