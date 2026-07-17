import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store';
import { motion } from 'motion/react';
import { ShieldCheck, ScanLine } from 'lucide-react';
import React from 'react';
import GuardiaLogo from '../../ui/GuardiaLogo';

function getScanLog(prog: number): string {
  if (prog <= 20) return "Establishing secure connection...";
  if (prog <= 45) return "Checking global blacklists...";
  if (prog <= 75) return "Analyzing merchant reputation...";
  if (prog <= 95) return "Verifying SSL certificates...";
  return "Finalizing security assessment...";
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

  const [analyzeProgress, setAnalyzeProgress] = React.useState(0);
  const animRef = React.useRef<ReturnType<typeof setInterval>>();

  React.useEffect(() => {
    const steps = [20, 45, 75, 90, 100];
    let i = 0;
    animRef.current = setInterval(() => {
      if (i < steps.length) {
        setAnalyzeProgress(steps[i]);
        i++;
      } else {
        clearInterval(animRef.current);
      }
    }, 800); // 800ms per step = 4 seconds total (better labor illusion UX)
    return () => clearInterval(animRef.current);
  }, []);

  React.useEffect(() => {
    if (analyzeProgress >= 100) {
      const t = setTimeout(() => {
        navigate(scanOutcome === 'safe' ? '/merchant-verified' : '/scam-detected');
      }, 800);
      return () => clearTimeout(t);
    }
  }, [analyzeProgress, scanOutcome, navigate]);

  const onCancel = () => {
    clearInterval(animRef.current);
    navigate('/home');
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-full bg-transparent text-white p-5">
      
      <div className="pt-6 text-center z-10 w-full">
        <div className="inline-flex items-center space-x-1.5 bg-slate-900 border border-slate-800/80 px-3 py-1 rounded-full text-xs font-bold font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
          <span className="text-emerald-400">ACTIVE</span>
          <span className="text-slate-600">|</span>
          <ScanLine className="w-3.5 h-3.5 text-sky-400" aria-hidden="true" />
          <span className="text-sky-400">SCANNING</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center z-10 w-full px-4">
        <div className="relative mb-12 mt-4 flex items-center justify-center">
          
          {/* Expanding Radar Rings */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-24 h-24 rounded-full border-2 border-sky-400/40"
              initial={{ scale: 0.8, opacity: 0.8 }}
              animate={{ scale: 3, opacity: 0 }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.8,
                ease: "easeOut",
              }}
            />
          ))}

          {/* Logo without any circular background box */}
          <div className="relative z-10 flex items-center justify-center">
            <GuardiaLogo size={80} variant="icon" animated={true} />
          </div>
        </div>

        <h2 className="text-lg font-black tracking-tight mb-2">Analyzing Merchant</h2>
        <p className="text-xs text-slate-400 font-medium text-center" style={{ maxWidth: 220, minHeight: 40 }}>
          {getScanLog(analyzeProgress)}
        </p>

        <div className="w-full max-w-xs mt-4 space-y-2" role="progressbar" aria-valuenow={analyzeProgress} aria-valuemin={0} aria-valuemax={100} aria-label={`Scan progress: ${analyzeProgress}%`}>
          <div className="w-full h-1.5 bg-slate-800/40 rounded-full overflow-hidden border border-slate-800/20">
            <div className="h-full bg-gradient-to-r from-sky-500 via-indigo-500 to-sky-400 rounded-full transition-all duration-300 ease-out" style={{ width: `${analyzeProgress}%` }} />
          </div>
          <div className="flex justify-center text-xs font-mono">
            <span className="text-sky-400">{analyzeProgress}%</span>
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

