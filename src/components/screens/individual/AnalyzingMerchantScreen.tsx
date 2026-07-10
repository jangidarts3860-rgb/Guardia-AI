import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store';
import { motion } from 'motion/react';
import { ShieldCheck, ScanLine } from 'lucide-react';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import React from 'react';



function getScanLog(prog: number): string {
  if (prog === 0) return "Initializing secure shield handshake...";
  if (prog <= 15) return "Establishing sandboxed intercept environment...";
  if (prog <= 35) return "Querying offline local fraud database...";
  if (prog <= 55) return "Evaluating dynamic merchant threat metrics...";
  if (prog <= 75) return "Verifying merchant behavioral patterns...";
  if (prog <= 95) return "Cross-referencing known scam signatures...";
  return "Finalizing security Threat Assessment report...";
}

export default function AnalyzingMerchantScreen() {
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

  const [analyzeProgress, setAnalyzeProgress] = React.useState(0);
  const animRef = React.useRef<ReturnType<typeof setInterval>>();

  React.useEffect(() => {
    animRef.current = setInterval(() => {
      setAnalyzeProgress(p => {
        if (p >= 100) {
          clearInterval(animRef.current);
          return 100;
        }
        return p + Math.floor(Math.random() * 8) + 2;
      });
    }, 200);
    return () => clearInterval(animRef.current);
  }, []);

  React.useEffect(() => {
    if (analyzeProgress >= 100) {
      const t = setTimeout(() => {
        navigate(scanOutcome === 'safe' ? '/merchant-verified' : '/scam-detected');
      }, 600);
      return () => clearTimeout(t);
    }
  }, [analyzeProgress, scanOutcome, navigate]);

  const onCancel = () => {
    clearInterval(animRef.current);
    navigate('/home');
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-full bg-slate-950 text-white p-5 relative">
      <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(14,165,233,0.06)_0%,transparent_70%] pointer-events-none" aria-hidden="true" />
      
      <div className="pt-6 text-center z-10 w-full">
        <div className="inline-flex items-center space-x-1.5 bg-slate-900 border border-slate-800/80 px-3 py-1 rounded-full text-[10px] font-bold font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
          <span className="text-emerald-400">ACTIVE</span>
          <span className="text-slate-600">|</span>
          <ScanLine className="w-3.5 h-3.5 text-sky-400 animate-pulse" aria-hidden="true" />
          <span className="text-sky-400">SCANNING</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center z-10 w-full px-4">
        <div className="relative mb-8">
          <div className="w-28 h-28 rounded-full bg-slate-900/80 border border-slate-800/60 flex items-center justify-center">
            <div className={`w-20 h-20 rounded-full bg-slate-800/60 flex items-center justify-center ${!reduced ? 'animate-[pulse_2s_ease-in-out_infinite]' : ''}`}>
              <svg className={`w-12 h-12 text-sky-400 ${!reduced ? 'animate-[spin_3s_linear_infinite]' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
          </div>
          <div className={`absolute inset-0 w-28 h-28 rounded-full border-2 border-transparent border-t-sky-500/40 border-r-transparent border-b-sky-500/20 border-l-transparent ${!reduced ? 'animate-[spin_2s_linear_infinite]' : ''}`} aria-hidden="true" />
        </div>

        <h2 className="text-lg font-black tracking-tight mb-2">Analyzing Merchant</h2>
        <p className={`text-xs ${!reduced ? 'animate-pulse' : ''} text-slate-400 font-medium max-w-[200px]`}>{getScanLog(analyzeProgress)}</p>

        <div className="w-full max-w-xs mt-8 space-y-2" role="progressbar" aria-valuenow={analyzeProgress} aria-valuemin={0} aria-valuemax={100} aria-label={`Scan progress: ${analyzeProgress}%`}>
          <div className="w-full h-1.5 bg-slate-800/40 rounded-full overflow-hidden border border-slate-800/20">
            <div className="h-full bg-gradient-to-r from-sky-500 via-indigo-500 to-sky-400 rounded-full transition-all duration-300 ease-out" style={{ width: `${analyzeProgress}%` }} />
          </div>
          <div className="flex justify-between text-[10px] font-mono">
            <span className="text-sky-400">{analyzeProgress}%</span>
            <span className="text-slate-500">verifying 7/7 checkpoints</span>
          </div>
        </div>
      </div>

      <div className="pb-4 z-10 w-full">
        <button onClick={onCancel} className="w-full text-sm font-bold text-slate-400 bg-slate-900/40 border border-slate-800/40 py-3.5 rounded-2xl transition active:scale-[0.98] hover:bg-slate-900/60 focus-visible:ring-2 focus-visible:ring-sky-500" aria-label="Cancel scan">
          Cancel Scan
        </button>
      </div>
    </div>
  );
}

