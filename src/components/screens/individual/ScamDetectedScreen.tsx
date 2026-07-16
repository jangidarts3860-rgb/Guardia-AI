import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store';
import { ShieldAlert, ArrowLeft, Info, ChevronDown, Shield, Globe, Clock, Search } from 'lucide-react';
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
    <div className="flex flex-col items-center justify-between min-h-full bg-transparent text-white p-5 relative">


      <div className="pt-4 w-full z-10">
        <button onClick={() => navigate('/home')} className="inline-flex items-center space-x-2 text-slate-400 hover:text-white transition p-2 -ml-2 focus-visible:ring-2 focus-visible:ring-sky-500 rounded-lg" aria-label="Go home">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-xs font-bold">Home</span>
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center z-10 px-4">
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-full bg-red-500/15 border border-red-500/20 flex items-center justify-center animate-[pulse_2s_ease-in-out_infinite]">
            <ShieldAlert className="w-14 h-14 text-red-400" />
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-500 animate-ping" aria-hidden="true" />
        </div>

        <h1 className="text-2xl font-extrabold tracking-tight text-center leading-tight text-red-400 animate-[fadeIn_0.5s_ease-out]">
          Verified Scam URL Detected
        </h1>
        <p className="text-sm text-slate-400 mt-2 text-center max-w-xs px-2 animate-[fadeIn_0.6s_ease-out]">
          This merchant exhibits <strong className="text-red-300">fraudulent patterns.</strong> Please avoid entering payment or identity details.
        </p>

        <div className="w-full max-w-sm animate-[fadeIn_0.7s_ease-out]">
          <div className="rounded-2xl p-4 space-y-3 card-danger">
            <div className="flex justify-between items-start gap-4">
              <span className="text-xs text-slate-400 shrink-0">Merchant</span>
              <span className="text-xs text-white font-bold text-right flex-1 break-words">Unknown Seller</span>
            </div>
            <div className="flex justify-between items-start gap-4">
              <span className="text-xs text-slate-400 shrink-0">Evidence</span>
              <span className="text-xs text-red-400 font-bold text-right flex-1 break-words leading-relaxed">
                Urgency phrases & spoofed domain detected
              </span>
            </div>
            <div className="flex justify-between items-start gap-4">
              <span className="text-xs text-slate-400 shrink-0">Domain Age</span>
              <span className="text-xs text-red-300 font-bold text-right flex-1 break-words">&lt; 7 days</span>
            </div>
            <div className="flex justify-between items-start gap-4">
              <span className="text-xs text-slate-400 shrink-0">Threat Type</span>
              <span className="text-xs text-red-400 font-bold text-right flex-1 break-words leading-relaxed">
                Phishing + Identity Theft
              </span>
            </div>
          </div>

          {/* Why this flagged? Expandable Panel */}
          <button onClick={() => setShowDetails(!showDetails)} className="w-full mt-3 flex items-center justify-between p-3 card-surface text-left transition focus-visible:ring-2 focus-visible:ring-sky-500" aria-expanded={showDetails}>
            <span className="flex items-center space-x-2 text-xs font-medium text-sky-400">
              <span className="w-5 h-5 rounded-full bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
                <Info className="w-3 h-3" aria-hidden="true" />
              </span>
              <span>Why was this flagged?</span>
            </span>
            <motion.span initial={{ rotate: 0 }} animate={{ rotate: showDetails ? 180 : 0 }} transition={{ duration: 0.2 }} className="text-slate-400">
              <ChevronDown className="w-4 h-4" aria-hidden="true" />
            </motion.span>
          </button>
          <AnimatePresence>
            {showDetails && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }} className="mt-2 overflow-hidden">
                <div className="bg-transparent/60 border border-slate-800/60 rounded-2xl p-4 space-y-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">Evidence Details</p>
                  <div className="space-y-2.5">
                    {scamDetails.map((detail, idx) => (
                      <motion.div key={idx} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.08 }} className="flex items-center space-x-3 p-2 card-surface rounded-xl">
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

        <div className="mt-4 p-3 rounded-2xl flex items-center space-x-3 text-left card-surface">
          <div className="w-8 h-8 shrink-0 rounded-full bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
            <Info className="w-4 h-4 text-sky-400" />
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Do not enter payment details. Report this merchant to your bank.
          </p>
        </div>
      </div>

      <div className="pb-6 w-full z-10 space-y-3 mt-6">
        <button onClick={() => navigate('/home')} className="w-full text-white font-bold py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 transition active:scale-[0.98] shadow-lg shadow-emerald-500/10 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617]">
          ✓ Back to safety (Recommended)
        </button>
        <button onClick={onScanAgain} className="w-full text-slate-300 font-bold py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 transition active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-slate-500">
          Scan Another
        </button>
      </div>
    </div>
  );
}

