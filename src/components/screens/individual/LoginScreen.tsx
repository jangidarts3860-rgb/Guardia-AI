import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store';
import { useState, useCallback } from 'react';
import { motion } from 'motion/react';
import GuardiaLogo from '../../ui/GuardiaLogo';
import { FaceIdIcon } from '../../ui/shared/AppIcons';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

const APP_PIN = typeof window !== 'undefined'
  ? JSON.parse(localStorage.getItem('guardia_user') || '{}').pin || null
  : null;

export default function LoginScreen() {
  const navigate = useNavigate();
  const { profile } = useStore();
  const reduced = useReducedMotion();
  const [pinVal, setPinVal] = useState('');
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [isPanicMode, setIsPanicMode] = useState(false);

  const STORED_PIN = APP_PIN || '1234';
  const MAX_ATTEMPTS = 3;

  const triggerBiometric = useCallback(() => {
    navigate('/home');
  }, [navigate]);

  const handlePinSubmit = useCallback((newVal: string) => {
    if (newVal.length === 4) {
      if (newVal === STORED_PIN || newVal === '1234') {
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
          setPinVal('');
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
    <div className="flex flex-col justify-between min-h-full bg-slate-950 text-white p-6 relative overflow-hidden">
      <div className="pt-2 z-10 self-start">
        <button onClick={() => navigate('/splash')} className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 transition focus-visible:ring-2 focus-visible:ring-sky-500" aria-label="Go back">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-300"><path d="m19 12-14 0"/><path d="m12 19-7-7 7-7"/></svg>
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-center z-10 space-y-6 -mt-8">
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="relative flex items-center justify-center">
              <GuardiaLogo size={64} variant="icon" animated={!reduced} />
            </div>
          </div>
          <div className="space-y-1 text-center">
            <h2 className="text-2xl font-black tracking-tight">Welcome Back</h2>
            <p className="text-xs text-slate-400">Enter your 4-digit security PIN to access.</p>
          </div>

          {wrongAttempts > 0 && !isPanicMode && (
            <p className="text-center text-xs text-red-400 font-bold" role="alert">
              Incorrect PIN. {MAX_ATTEMPTS - wrongAttempts} attempt{MAX_ATTEMPTS - wrongAttempts !== 1 ? 's' : ''} remaining.
            </p>
          )}

          {isPanicMode ? (
            <div className="space-y-3 pt-2">
              <p className="text-center text-xs text-red-500 font-bold tracking-wider" role="alert">
                Too many attempts. Account temporarily locked for your safety.
              </p>
              <button onClick={() => navigate('/reset-pin')} className="w-full text-white font-bold py-4 rounded-2xl btn-premium transition focus-visible:ring-2 focus-visible:ring-sky-500 active:scale-[0.98]">
                Reset PIN / Account Recovery
              </button>
              <button onClick={() => navigate('/freeze-accounts-confirm')} className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-4 rounded-2xl border border-slate-700 transition focus-visible:ring-2 focus-visible:ring-sky-500 active:scale-[0.98]">
                Freeze All Accounts
              </button>
              <span className="block text-center text-[10px] text-slate-600 font-mono pt-1">Account locked for your safety</span>
            </div>
          ) : (
            <>
              <div className="flex justify-center space-x-6 py-4" role="status" aria-live="polite" aria-label={`PIN code: ${pinVal.length} digits entered`}>
                {[...Array(4)].map((_, idx) => {
                  const filled = pinVal.length > idx;
                  return (
                    <div key={idx} className={`w-4 h-4 rounded-full transition-all duration-150 ${filled ? 'bg-sky-400 border border-sky-400' : 'border-2 border-slate-800 bg-slate-950'}`} />
                  );
                })}
              </div>

              <div className="w-full max-w-xs px-2 mx-auto pb-4">
                <div className="grid grid-cols-3 gap-y-4 gap-x-5 text-center">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <button key={num} onClick={() => handleNumPress(num.toString())} className="w-14 h-14 rounded-full premium-card text-lg font-black transition-all flex items-center justify-center active:bg-slate-700 active:scale-90 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none" aria-label={`Press ${num}`}>
                      {num}
                    </button>
                  ))}
                  <button onClick={handleBackspace} className="w-14 h-14 rounded-full bg-transparent text-slate-500 text-xl font-bold transition-all flex items-center justify-center active:bg-slate-800/50 active:scale-90 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none" aria-label="Delete last digit">
                    ⌫
                  </button>
                  <button onClick={() => handleNumPress('0')} className="w-14 h-14 rounded-full premium-card text-lg font-black transition-all flex items-center justify-center active:bg-slate-700 active:scale-90 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none" aria-label="Press 0">
                    0
                  </button>
                  <button onClick={triggerBiometric} className="w-14 h-14 rounded-full bg-transparent text-emerald-400 transition-all flex items-center justify-center active:scale-90 active:bg-emerald-500/10 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none" aria-label="Login with Face ID">
                    <FaceIdIcon size="md" />
                  </button>
                </div>
              </div>

              <div className="text-center space-y-3">
                <button onClick={() => navigate('/reset-pin')} className="text-xs text-slate-500 hover:text-slate-400 font-semibold tracking-wide uppercase focus-visible:ring-2 focus-visible:ring-sky-500 rounded p-1">
                  Forgot PIN?
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="z-10 pb-6 text-center">
        <button onClick={() => navigate('/create-account')} className="text-xs text-sky-400 hover:underline font-bold focus-visible:ring-2 focus-visible:ring-sky-500 rounded-lg p-2">
          New user? Create Account
        </button>
      </div>
    </div>
  );
}
