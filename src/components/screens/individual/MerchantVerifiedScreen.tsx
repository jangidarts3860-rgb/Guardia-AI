import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store';
import { CheckCircle2, ArrowLeft, ExternalLink, Receipt } from 'lucide-react';
import { useReducedMotion } from '../../../hooks/useReducedMotion';



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

  const onScanAgain = () => navigate('/scan-qr');

  return (
    <div className="flex flex-col items-center justify-between min-h-full bg-slate-950 text-white p-5 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className={`absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-br from-emerald-500/5 via-transparent to-sky-500/5 ${reduced ? '' : 'animate-[ambientShift_30s_linear_infinite]'}`} />
        <div className="absolute inset-0 bg-radial-[circle_at_bottom,rgba(16,185,129,0.08)_0%,transparent_70%]" />
      </div>
      
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

        <div className={`w-full bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 mt-8 space-y-3 ${!reduced ? 'animate-[fadeIn_0.7s_ease-out]' : ''}`}>
          <div className="flex justify-between">
            <span className="text-xs text-slate-500">Merchant</span>
            <span className="text-xs text-white font-bold">Flipkart</span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-slate-500">Risk Score</span>
            <span className="text-xs bg-emerald-500/10 text-emerald-400 font-bold px-2 py-0.5 rounded-full">12/100 — Safe</span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-slate-500">Registered</span>
            <span className="text-xs text-slate-300">8 years ago</span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-slate-500">GST Verified</span>
            <span className="text-xs text-emerald-400 font-bold">Yes ✓</span>
          </div>
        </div>
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
        <button onClick={() => navigate('/safe-report')} className="text-[10px] text-center text-slate-500 flex items-center justify-center space-x-1 mx-auto focus-visible:ring-2 focus-visible:ring-sky-500 rounded p-1">
          <ExternalLink className="w-3 h-3" aria-hidden="true" />
          <span>Report an issue with this merchant</span>
        </button>
      </div>
    </div>
  );
}

