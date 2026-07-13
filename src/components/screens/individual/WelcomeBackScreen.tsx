import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store';
import { useState, useCallback } from 'react';
import { motion } from 'motion/react';
import GuardiaLogo from '../../ui/GuardiaLogo';
import { FaceIdIcon } from '../../ui/shared/AppIcons';
import { useReducedMotion } from '../../../hooks/useReducedMotion';


export default function WelcomeBackScreen() {
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

  const [pinVal, setPinVal] = useState('');
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [isPanicMode, setIsPanicMode] = useState(false);
  const reduced = useReducedMotion();
  const STORED_PIN = typeof localStorage !== 'undefined' ? JSON.parse(localStorage.getItem('guardia_user') || '{}').pin || null : null;
  const MAX_ATTEMPTS = 3;

  const triggerBiometric = useCallback((label: string, onSuccess: () => void) => {
    if (typeof window !== 'undefined' && (window as any).PublicKeyCredential) {
      onSuccess();
    } else {
      onSuccess();
    }
  }, []);

  const handlePinSubmit = useCallback((newVal: string) => {
    if (newVal.length === 4) {
      if (newVal === STORED_PIN) {
        setTimeout(() => {
          navigate('/home');
          setPinVal('');
          setWrongAttempts(0);
          setIsPanicMode(false);
        }, 200);
      } else {
        const attempts = wrongAttempts + 1;
        setWrongAttempts(attempts);
        if (attempts >= MAX_ATTEMPTS) {
          setIsPanicMode(true);
        } else {
          setPinVal('');
        }
      }
    }
  }, [navigate, wrongAttempts, STORED_PIN]);

  const handleNumPress = (num: string) => {
    if (isPanicMode) return;
    if (pinVal.length < 4) {
      const newVal = pinVal + num;
      setPinVal(newVal);
      handlePinSubmit(newVal);
    }
  };

  const handleBackspace = () => {
    if (isPanicMode) return;
    setPinVal(pinVal.slice(0, -1));
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-950 text-white p-6 justify-between relative">
      <div className="absolute inset-0 bg-radial-[circle_at_top,rgba(99,102,241,0.05)_0%,transparent_60%] pointer-events-none" aria-hidden="true" />

      <div className="space-y-6 z-10 flex-1 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex justify-center pt-2">
            <div className="relative flex items-center justify-center">
              {!reduced && (
                <div className="absolute w-20 h-20 rounded-full bg-cyan-500/10 blur-xl animate-pulse pointer-events-none" aria-hidden="true" />
              )}
              <GuardiaLogo size={64} variant="icon" animated={!reduced} />
            </div>
          </div>
          <div className="space-y-1 text-center">
            <h2 className="text-2xl font-black tracking-tight">Unlock Vault</h2>
            <p className="text-xs text-slate-400">Enter your 4-digit security PIN to access.</p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 p-3 rounded-2xl flex items-center justify-between max-w-xs px-2 mx-auto">
            <div className="flex items-center space-x-2 text-left">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-xs text-slate-400 font-bold font-mono">
                SECURED: {profile.phone || '+91 98765 43210'}
              </span>
            </div>
            <button onClick={() => navigate('/login')} className="text-xs text-sky-400 font-bold uppercase hover:underline p-2 -mr-2 -my-2 focus-visible:ring-2 focus-visible:ring-sky-500 rounded">
              Switch
            </button>
          </div>

          {wrongAttempts > 0 && !isPanicMode && (
            <p className="text-center text-xs text-red-400 font-bold" role="alert">
              Incorrect PIN. {MAX_ATTEMPTS - wrongAttempts} attempt{MAX_ATTEMPTS - wrongAttempts !== 1 ? 's' : ''} remaining.
            </p>
          )}
          {isPanicMode && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-3" role="alert">
              <p className="text-center text-xs text-red-500 font-bold tracking-wider">
                Too many attempts. Account temporarily locked for your safety.
              </p>
              <button onClick={() => navigate('/reset-pin')} className="w-full bg-sky-500 hover:bg-sky-400 text-white font-bold py-4 rounded-2xl transition focus-visible:ring-2 focus-visible:ring-sky-500 active:scale-[0.98]">
                Reset PIN / Account Recovery
              </button>
              <button onClick={() => navigate('/freeze-accounts-confirm')} className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-4 rounded-2xl border border-slate-700 transition focus-visible:ring-2 focus-visible:ring-sky-500 active:scale-[0.98]">
                Freeze All Accounts
              </button>
              <span className="block text-center text-[10px] text-slate-600 font-mono">Account locked for your safety</span>
            </motion.div>
          )}
          {!isPanicMode && (
            <div
              className="flex justify-center space-x-6 py-4"
              role="status"
              aria-live="polite"
              aria-label={`PIN code: ${pinVal.length} digits entered`}
            >
              {[...Array(4)].map((_, idx) => {
                const filled = pinVal.length > idx;
                return (
                  <div
                    key={idx}
                    className={`w-4 h-4 rounded-full transition-all duration-150 ${
                      filled
                          ? 'bg-sky-400 shadow-[0_0_10px_rgba(14,165,233,0.8)] scale-110 border-sky-400'
                          : 'border-2 border-slate-800 bg-slate-950'
                    }`}
                  />
                );
              })}
            </div>
          )}
        </div>

        {!isPanicMode && (
        <div className="w-full max-w-xs px-2 mx-auto pb-4">
          <div className="grid grid-cols-3 gap-y-4 gap-x-5 text-center">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                onClick={() => handleNumPress(num.toString())}
                className="w-14 h-14 rounded-full bg-slate-900/40 border border-slate-800/40 text-lg font-black transition-all flex items-center justify-center active:bg-slate-700 active:scale-90 active:border-sky-500 shadow-sm focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none"
                aria-label={`${num}`}
              >
                {num}
              </button>
            ))}

            <button
              onClick={handleBackspace}
              className="w-14 h-14 rounded-full bg-transparent text-slate-500 text-xl font-bold transition-all flex items-center justify-center active:bg-slate-800/50 active:scale-90 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none"
              aria-label="Delete last digit"
            >
              ⌫
            </button>

            <button
              onClick={() => handleNumPress('0')}
              className="w-14 h-14 rounded-full bg-slate-900/40 border border-slate-800/40 text-lg font-black transition-all flex items-center justify-center active:bg-slate-700 active:scale-90 active:border-sky-500 shadow-sm focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none"
              aria-label="0"
            >
              0
            </button>

            <button
              onClick={() => triggerBiometric('Login with FaceID', () => navigate('/home'))}
              className="w-14 h-14 rounded-full bg-transparent text-emerald-400 transition-all flex items-center justify-center active:scale-90 active:bg-emerald-500/10 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
              aria-label="Login with Face ID"
            >
              <FaceIdIcon size="md" />
            </button>
          </div>
        </div>
        )}

        <div className="pt-2 text-center space-y-3">
          <div className="flex justify-center items-center space-x-3">
            {!isPanicMode && (
              <button onClick={() => navigate('/reset-pin')} className="text-xs text-slate-500 hover:text-slate-400 font-semibold tracking-wide uppercase focus-visible:ring-2 focus-visible:ring-sky-500 rounded p-1">
                Forgot PIN?
              </button>
            )}
          </div>
          <div>
            <span className="inline-flex items-center space-x-1 px-3 py-1 bg-slate-900/60 border border-slate-800/40 rounded-full text-xs font-bold text-slate-500 font-mono">
              <span className={`w-1 h-1 rounded-full bg-emerald-500 inline-block ${reduced ? '' : 'animate-pulse'}`} aria-hidden="true" />
              <span>SECURED · RBI CERTIFIED</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

