import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store';
import { ShieldAlert, ArrowLeft, ExternalLink, Receipt, Info, ChevronDown, ChevronUp, Shield, Globe, Clock, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { useState } from 'react';


export default function ScamDetectedScreen() {
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

  const scamDetails = [
    { icon: Globe, label: 'Domain Age', value: '< 7 days (Suspicious)', color: 'text-red-300' },
    { icon: Search, label: 'UPI ID Match', value: 'No match found', color: 'text-red-300' },
    { icon: Shield, label: 'Historical Reports', value: '12 reports in last 30 days', color: 'text-red-300' },
    { icon: Clock, label: 'Scan Timestamp', value: new Date().toLocaleString('en-IN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short' }), color: 'text-slate-300' },
  ];

  return (
    <div className="flex flex-col items-center justify-between min-h-full bg-slate-950 text-white p-5 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className={`absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-br from-red-500/5 via-transparent to-amber-500/5 ${reduced ? '' : 'animate-[ambientShift_25s_linear_infinite]'}`} />
        <div className="absolute inset-0 bg-radial-[circle_at_top,rgba(239,68,68,0.08)_0%,transparent_70%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-red-950/10 via-transparent to-transparent" />
      </div>

      <div className="pt-4 w-full z-10">
        <button onClick={() => navigate('/home')} className="inline-flex items-center space-x-2 text-slate-400 hover:text-white transition p-2 -ml-2 focus-visible:ring-2 focus-visible:ring-sky-500 rounded-lg" aria-label="Go home">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-xs font-bold">Home</span>
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center z-10 px-4">
        <div className="relative mb-6">
          <div className={`w-24 h-24 rounded-full bg-red-500/15 border border-red-500/20 flex items-center justify-center ${!reduced ? 'animate-[pulse_2s_ease-in-out_infinite]' : ''}`}>
            <ShieldAlert className="w-14 h-14 text-red-400" />
          </div>
          <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-500 ${!reduced ? 'animate-ping' : ''}`} aria-hidden="true" />
        </div>

        <h2 className={`text-2xl font-black tracking-tight text-red-300 ${!reduced ? 'animate-[fadeIn_0.5s_ease-out]' : ''}`}>Scam Detected!</h2>
        <p className={`text-sm text-slate-400 mt-2 text-center max-w-xs px-2 ${!reduced ? 'animate-[fadeIn_0.6s_ease-out]' : ''}`}>
          This merchant exhibits <strong className="text-red-300">fraudulent patterns.</strong> Please avoid entering payment or identity details.
        </p>

        <div className={`w-full ${!reduced ? 'animate-[fadeIn_0.7s_ease-out]' : ''}`}>
          <div className="flex items-center justify-center mb-4">
            <svg className="w-24 h-12" viewBox="0 0 120 60" fill="none">
              <path d="M10 55 A 50 50 0 0 1 110 55" stroke="#1e293b" strokeWidth="8" strokeLinecap="round" />
              <motion.path
                d="M10 55 A 50 50 0 0 1 110 55"
                stroke="#ef4444"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={251.2}
                initial={{ strokeDashoffset: 251.2 }}
                animate={{ strokeDashoffset: 251.2 * (1 - 12 / 100) }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            </svg>
            <div className="absolute flex flex-col items-center mt-10">
              <span className="text-xl font-black text-red-400 font-mono">12</span>
              <span className="text-[8px] text-slate-500 font-bold uppercase tracking-wider">Trust Score</span>
            </div>
          </div>
          <div className="bg-red-950/30 backdrop-blur-xl border border-red-800/40 rounded-2xl p-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-xs text-slate-400">Merchant</span>
              <span className="text-xs text-white font-bold">Unknown Seller</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-slate-400">Confidence</span>
              <span className="text-xs bg-red-500/10 text-red-400 font-bold px-2 py-0.5 rounded-full">12/100 Trust — High Risk</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-slate-400">Domain Age</span>
              <span className="text-xs text-red-300 font-bold">&lt; 7 days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-slate-400">Threat Type</span>
              <span className="text-xs text-red-400 font-bold">Phishing + Identity Theft (नकली वेबसाइट + पहचान चोरी)</span>
            </div>
          </div>

          {/* Why this score? Expandable Panel */}
          <button onClick={() => setShowDetails(!showDetails)} className="w-full mt-3 flex items-center justify-between p-3 bg-slate-900/40 border border-slate-800/60 rounded-2xl text-left transition hover:bg-slate-900/60 focus-visible:ring-2 focus-visible:ring-sky-500" aria-expanded={showDetails}>
            <span className="flex items-center space-x-2 text-xs font-medium text-sky-400">
              <span className="w-5 h-5 rounded-full bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
                <Info className="w-3 h-3" aria-hidden="true" />
              </span>
              <span>Why this score?</span>
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
                    {scamDetails.map((detail, idx) => (
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

        <div className="mt-4 p-3 bg-slate-900/40 border border-slate-800/60 rounded-2xl flex items-center space-x-3 text-left">
          <div className="w-8 h-8 shrink-0 rounded-full bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
            <Info className="w-4 h-4 text-sky-400" />
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Do not enter payment details. Report this merchant to your bank.
          </p>
        </div>
      </div>

      <div className="pb-6 w-full z-10 space-y-3">
        <button onClick={onScanAgain} className="w-full text-white font-bold py-4 rounded-2xl bg-red-500 hover:bg-red-400 transition active:scale-[0.98] shadow-lg shadow-red-500/10 focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950">
          Scan Another
        </button>
        <button onClick={() => navigate('/receipt-dark')} className="w-full text-slate-300 font-bold py-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:bg-slate-800 transition active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-sky-500 flex items-center justify-center space-x-2">
          <Receipt className="w-4 h-4" aria-hidden="true" />
          <span>View Receipt</span>
        </button>
        <button onClick={() => navigate('/safe-report')} className="text-xs text-center text-slate-500 flex items-center justify-center space-x-1 mx-auto focus-visible:ring-2 focus-visible:ring-sky-500 rounded p-1">
          <ExternalLink className="w-3 h-3" aria-hidden="true" />
          <span>File a cyber crime report</span>
        </button>
      </div>
    </div>
  );
}

