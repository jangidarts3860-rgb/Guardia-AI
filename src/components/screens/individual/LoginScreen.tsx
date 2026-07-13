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
  const { profile, setProfile } = useStore();
  const reduced = useReducedMotion();
  const [authLoading, setAuthLoading] = useState(false);
  const [phoneBlurred, setPhoneBlurred] = useState(false);
  const [pinVal, setPinVal] = useState('');
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [isPanicMode, setIsPanicMode] = useState(false);
  const [showPhoneInput, setShowPhoneInput] = useState(!APP_PIN);

  const hasPin = !!APP_PIN;
  const STORED_PIN = APP_PIN;
  const MAX_ATTEMPTS = 3;
  const phoneDigits = profile.phone.replace('+91', '').replace(/\s/g, '');
  const isValidPhone = phoneDigits.length === 10;

  const triggerBiometric = useCallback(() => {
    navigate('/home');
  }, [navigate]);

  const handlePinSubmit = useCallback((newVal: string) => {
    if (newVal.length === 4) {
      if (newVal === STORED_PIN) {
        setTimeout(() => {
          navigate('/home');
          setPinVal('');
          setWrongAttempts(0);
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

  const handlePhoneSubmit = () => {
    if (!isValidPhone || authLoading) return;
    setAuthLoading(true);
    setProfile(prev => ({ ...prev, phone: '+91 ' + phoneDigits.replace(/(\d{5})(\d{5})/, '$1 $2') }));
    setTimeout(() => {
      setAuthLoading(false);
      navigate('/verify-otp');
    }, 1200);
  };

  const switchToPhoneInput = () => {
    setProfile({ name: '', phone: '', email: '', language: '', photo: '' });
    setShowPhoneInput(true);
  };

  const formatPhone = (p: string) => {
    const d = p.replace('+91', '').replace(/\s/g, '');
    if (d.length === 10) return '+91 ' + d.replace(/(\d{5})(\d{5})/, '$1 $2');
    return p;
  };

  return (
    <div className="flex flex-col justify-between min-h-full bg-slate-950 text-white p-6 relative overflow-hidden">
      <div className="pt-2 z-10 self-start">
        <button onClick={() => navigate('/splash')} className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 transition focus-visible:ring-2 focus-visible:ring-sky-500" aria-label="Go back">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-300"><path d="m19 12-14 0"/><path d="m12 19-7-7 7-7"/></svg>
        </button>
      </div>

      {hasPin && !showPhoneInput ? (
        <>
          <div className="flex-1 flex flex-col justify-center z-10 space-y-6 -mt-12">
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

              <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl flex items-center justify-between max-w-xs px-2 mx-auto">
                <div className="flex items-center space-x-2 text-left">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-xs text-slate-400 font-bold font-mono">
                    SECURED: {formatPhone(profile.phone)}
                  </span>
                </div>
                <button onClick={switchToPhoneInput} className="text-xs text-sky-400 font-bold uppercase hover:underline p-2 -mr-2 -my-2 focus-visible:ring-2 focus-visible:ring-sky-500 rounded">
                  Switch
                </button>
              </div>

              {wrongAttempts > 0 && !isPanicMode && (
                <p className="text-center text-xs text-red-400 font-bold" role="alert">
                  Incorrect PIN. {MAX_ATTEMPTS - wrongAttempts} attempt{MAX_ATTEMPTS - wrongAttempts !== 1 ? 's' : ''} remaining.
                </p>
              )}
              {isPanicMode && (
                <motion.p initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center text-xs text-red-500 font-bold tracking-wider" role="alert">
                  Too many attempts. Account temporarily locked for your safety.
                </motion.p>
              )}

              {isPanicMode ? (
                <div className="space-y-3 pt-2">
                  <button onClick={() => navigate('/reset-pin')} className="w-full bg-sky-500 hover:bg-sky-400 text-white font-bold py-4 rounded-2xl transition focus-visible:ring-2 focus-visible:ring-sky-500 active:scale-[0.98]">
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
                        <button key={num} onClick={() => handleNumPress(num.toString())} className="w-14 h-14 rounded-full bg-slate-900 border border-slate-800 text-lg font-black transition-all flex items-center justify-center active:bg-slate-700 active:scale-90 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none" aria-label={`Press ${num}`}>
                          {num}
                        </button>
                      ))}
                      <button onClick={handleBackspace} className="w-14 h-14 rounded-full bg-transparent text-slate-500 text-xl font-bold transition-all flex items-center justify-center active:bg-slate-800/50 active:scale-90 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none" aria-label="Delete last digit">
                        ⌫
                      </button>
                      <button onClick={() => handleNumPress('0')} className="w-14 h-14 rounded-full bg-slate-900 border border-slate-800 text-lg font-black transition-all flex items-center justify-center active:bg-slate-700 active:scale-90 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none" aria-label="Press 0">
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
                    <div>
                      <span className="inline-flex items-center space-x-1 px-3 py-1 bg-slate-900 border border-slate-800/40 rounded-full text-xs font-bold text-slate-500 font-mono">
                        <span className={`w-1 h-1 rounded-full bg-emerald-500 inline-block ${reduced ? '' : 'animate-pulse'}`} aria-hidden="true" />
                        <span>ENCRYPTED & SECURED</span>
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex-1 flex flex-col justify-center z-10 space-y-8 -mt-8">
            <div className="text-center space-y-3">
              <GuardiaLogo size={80} variant="icon" animated={false} />
              <h2 className="text-3xl font-black tracking-tight mt-4">Sign In</h2>
              <p className="text-sm text-slate-400">Enter your mobile to continue</p>
            </div>

            <div className="space-y-4 max-w-sm mx-auto w-full">
              <div className="space-y-1.5 text-left">
                <label htmlFor="login-phone" className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Mobile Number
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center" aria-hidden="true">
                    <span className="text-xs font-bold text-sky-400">+91</span>
                  </div>
                  <input id="login-phone" type="tel" inputMode="numeric" autoComplete="tel"
                    value={phoneDigits}
                    onChange={(e) => {
                      const num = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
                      setProfile({ ...profile, phone: '+91 ' + num });
                    }}
                    onBlur={() => setPhoneBlurred(true)}
                    onFocus={() => setPhoneBlurred(false)}
                    placeholder="99999 99999"
                    className="w-full pl-14 pr-4 py-3.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/50 focus-visible:border-sky-500 transition font-mono font-bold tracking-wider"
                    aria-describedby="phone-error"
                  />
                </div>
                <div className="min-h-4 mt-1" role="alert" aria-live="polite">
                  {phoneBlurred && phoneDigits.length > 0 && !isValidPhone && (
                    <p id="phone-error" className="text-xs text-red-400 font-semibold">
                      Mobile number must be exactly 10 digits
                    </p>
                  )}
                </div>
              </div>

              <button disabled={!isValidPhone || authLoading} onClick={handlePhoneSubmit}
                className={`w-full font-bold py-4 rounded-2xl shadow-lg transition flex items-center justify-center space-x-2 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${
                  isValidPhone
                    ? 'bg-sky-500 hover:bg-sky-400 text-white cursor-pointer active:scale-[0.98]'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed shadow-none border-2 border-slate-700'
                }`}
              >
                {authLoading ? (
                  <><span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" aria-hidden="true" /><span>Verifying...</span></>
                ) : (
                  <span>Continue</span>
                )}
              </button>
            </div>
          </div>

          <div className="z-10 pb-6 text-center space-y-4">
            <p className="text-xs text-slate-400">Don't have an account?</p>
            <button onClick={() => navigate('/create-account')}
              className="w-full max-w-sm mx-auto bg-slate-900 border border-slate-800 hover:bg-slate-800 text-white font-bold py-4 rounded-2xl transition focus-visible:ring-2 focus-visible:ring-sky-500">
              Create New Account
            </button>
          </div>
        </>
      )}
    </div>
  );
}
