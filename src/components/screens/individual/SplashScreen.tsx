import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store';
import { useEffect, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import GuardiaLogo from '../../ui/GuardiaLogo';
import { APP_VERSION } from '../../../utils/appConfig';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

export default function SplashScreen() {
  const navigate = useNavigate();
  const { profile, setProfile } = useStore();

  const reduced = useReducedMotion();
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const duration = 1500;

  const onComplete = useCallback(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = JSON.parse(localStorage.getItem('guardia_user') || '{}');
        if (stored.pin) {
          setProfile({ name: stored.name || '', phone: stored.phone || '', email: stored.email || '', language: stored.language || '', photo: stored.photo || '' });
          navigate('/login');
          return;
        }
      } catch (e) {
        console.warn('localStorage not accessible');
      }
    }
    navigate('/create-account');
  }, [navigate, setProfile]);

  useEffect(() => {
    timerRef.current = setTimeout(onComplete, duration);
    return () => clearTimeout(timerRef.current);
  }, [onComplete, duration]);

  return (
    <div className="flex flex-col items-center justify-between min-h-full bg-transparent text-white p-6 relative overflow-hidden">
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 w-full">
        <motion.div
          animate={reduced ? {} : {
            scale: [1, 1.02, 1],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="relative mb-6 flex items-center justify-center"
        >
          <GuardiaLogo size={140} variant="icon" animated={!reduced} />
        </motion.div>

        <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-sky-400 bg-clip-text text-transparent">
          Guardia AI
        </h1>

        <div className="mt-3 px-3 py-1 bg-sky-950/40 border border-sky-500/15 rounded-full">
          <p className="text-xs text-sky-400 font-bold font-mono tracking-wider uppercase">
            Protection Active
          </p>
        </div>
      </div>

      <div className="w-full max-w-xs px-2 flex flex-col items-center space-y-4 z-10 pb-8">
        <div className="w-full bg-slate-900/80 h-1.5 rounded-full overflow-hidden border border-slate-800/80 p-[1px] relative" role="progressbar" aria-label="Loading" aria-valuemin={0} aria-valuemax={100} aria-valuenow={100}>
          <motion.div
            className="bg-sky-500 h-full rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />
        </div>

          <p className="text-xs text-slate-400 text-center font-medium leading-relaxed max-w-xs">
            Your on-device cybersecurity shield. Active and private.
          </p>

        <span className="text-[7px] text-slate-700 font-mono">v{APP_VERSION}</span>
      </div>
    </div>
  );
}
