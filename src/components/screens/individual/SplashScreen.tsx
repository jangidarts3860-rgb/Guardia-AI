import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store';
import { useEffect, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import GuardiaLogo from '../../ui/GuardiaLogo';
import { APP_VERSION } from '../../../utils/appConfig';
import { useReducedMotion } from '../../../hooks/useReducedMotion';



export default function SplashScreen() {
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
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const duration = 3000;

  const onComplete = useCallback(() => {
    if (typeof window !== 'undefined') {
      const stored = JSON.parse(localStorage.getItem('guardia_user') || '{}');
      if (stored.pin) {
        setProfile({ name: stored.name || '', phone: stored.phone || '', email: stored.email || '', language: stored.language || '', photo: stored.photo || '' });
        navigate('/login');
      } else {
        navigate('/onboarding');
      }
    } else {
      navigate('/onboarding');
    }
  }, [navigate, setProfile]);

  useEffect(() => {
    timerRef.current = setTimeout(onComplete, duration);
    return () => clearTimeout(timerRef.current);
  }, [onComplete, duration]);

  const handleSkip = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    onComplete();
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-full bg-slate-950 text-white p-6 relative overflow-hidden">
      <div className={`absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-br from-sky-500/5 via-transparent to-emerald-500/5 ${reduced ? '' : 'animate-[ambientShift_30s_linear_infinite]'}`} aria-hidden="true" />
      <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(14,165,233,0.18)_0%,transparent_65%]" aria-hidden="true" />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-sky-500/20 to-transparent" aria-hidden="true" />

      {/* Removed Skip button — loading screen */}

      <div className="flex-1 flex flex-col items-center justify-center relative z-10 w-full">
        <motion.div
          animate={reduced ? {} : {
            scale: [1, 1.04, 1],
            filter: [
              'drop-shadow(0 0 15px rgba(6,182,212,0.25))',
              'drop-shadow(0 0 25px rgba(6,182,212,0.5))',
              'drop-shadow(0 0 15px rgba(6,182,212,0.25))',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="relative mb-6 flex items-center justify-center"
        >
          {!reduced && (
            <>
              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.25, 0.12] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute w-44 h-44 rounded-full bg-cyan-500/10 blur-2xl pointer-events-none"
              />
              <motion.div
                animate={{ scale: [1, 1.35, 1.7], opacity: [0.35, 0.15, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
                className="absolute w-36 h-36 rounded-full border border-cyan-500/25 pointer-events-none"
              />
            </>
          )}
          <GuardiaLogo size={140} variant="icon" animated={!reduced} />
        </motion.div>

        <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-sky-400 bg-clip-text text-transparent">
          Guardia AI
        </h1>

        <div className="mt-3 px-3 py-1 bg-sky-950/40 border border-sky-500/15 rounded-full">
          <p className="text-[9px] text-sky-400 font-bold font-mono tracking-wider uppercase">
            Active Shield Protocol
          </p>
        </div>
      </div>

      <div className="w-full max-w-xs px-2 flex flex-col items-center space-y-4 z-10 pb-8">
        <div className="w-full bg-slate-900/80 h-1.5 rounded-full overflow-hidden border border-slate-800/80 p-[1px] relative" role="progressbar" aria-label="Loading" aria-hidden="true">
          <motion.div
            className="bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-400 h-full rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.5, ease: 'easeInOut' }}
          />
        </div>

        <div className="text-center space-y-1">
          <span className="text-[9px] text-slate-500 font-extrabold tracking-widest block font-mono">
            BANK-GRADE SECURITY - RBI AA CERTIFIED
          </span>
          <span className="text-[8px] text-slate-600 block">
            MILITARY-GRADE AES-256 ENCRYPTION
          </span>
        </div>

        <span className="text-[7px] text-slate-700 font-mono">v{APP_VERSION}</span>
      </div>
    </div>
  );
}

