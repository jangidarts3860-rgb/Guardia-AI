import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store';
import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Lock } from 'lucide-react';
import { useReducedMotion } from '../../../hooks/useReducedMotion';


export default function VerifyOtpScreen() {
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

  const [otpVal, setOtpVal] = useState('');
  const [otpSuccess, setOtpSuccess] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const reduced = useReducedMotion();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setOtpVal('');
    const timer = setInterval(() => {
      setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const proceedToNext = () => {
    setOtpSuccess(true);
    setTimeout(() => {
      navigate('/create-pin');
      setOtpVal('');
    }, 400);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      const digits = text.replace(/[^0-9]/g, '').slice(0, 6);
      if (digits.length === 6) {
        setOtpVal(digits);
        proceedToNext();
      }
    } catch { /* Clipboard access denied */ }
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-950 text-white p-6 justify-between relative">
      <div className="space-y-6 z-10">
        <div className="flex items-center space-x-2 pt-2">
          <button onClick={() => navigate('/create-account')} className="p-2 -ml-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 transition focus-visible:ring-2 focus-visible:ring-sky-500" aria-label="Go back">
            <ArrowLeft className="w-4 h-4 text-slate-300" />
          </button>
          <span className="text-xs font-black tracking-widest text-slate-500 font-mono">STEP 2 OF 3</span>
        </div>

          <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden flex">
            <div className="bg-sky-500 h-full w-2/3 rounded-full" />
            <div className="bg-slate-800 h-full flex-1" />
          </div>

        <div className="space-y-2 text-left">
          <h2 className="text-2xl font-black tracking-tight text-white">Enter OTP Code</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Enter the 6-digit confirmation code sent to{' '}
            <strong className="text-slate-200">{profile.phone || '+91 98765 43210'}</strong>
          </p>
        </div>

          <div className="pt-4 relative">
            <input
              ref={inputRef}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              value={otpVal}
              disabled={otpSuccess}
              onChange={(e) => {
                const val = e.target.value.replace(/[^0-9]/g, '');
                setOtpVal(val);
                if (val.length === 6) proceedToNext();
              }}
              className="absolute inset-0 w-full h-full opacity-0 cursor-default z-20"
              autoFocus
              aria-label="OTP code, 6 digits"
            />

            <div className="grid grid-cols-6 gap-2.5 justify-center relative z-10">
              {[...Array(6)].map((_, idx) => {
                const digit = otpVal[idx] || '';
                const isActive = otpVal.length === idx;
                return (
                  <div
                    key={idx}
                    className={`h-14 rounded-2xl border flex items-center justify-center text-lg font-mono font-black transition-all duration-200 ${
                      otpSuccess
                        ? 'border-emerald-500 bg-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.4)] text-white scale-105'
                        : isActive
                          ? 'border-sky-500 bg-sky-500/10 shadow-[0_0_12px_rgba(14,165,233,0.35)] text-white scale-105'
                          : digit
                            ? 'border-slate-700 bg-slate-900/60 text-sky-400'
                            : 'border-slate-800 bg-slate-900/20 text-slate-600'
                    }`}
                  >
                    {digit ? (
                      <span className={reduced ? '' : 'animate-[scaleIn_0.15s_ease-out]'}>{digit}</span>
                    ) : (
                      <span className={`${isActive ? 'w-0.5 h-6 bg-sky-400 animate-[blink_1s_step-end_infinite]' : 'w-1.5 h-1.5 rounded-full bg-slate-700'}`} aria-hidden="true" />
                    )}
                    <span className="sr-only">{digit ? `Digit ${idx + 1}: ${digit}` : isActive ? 'Active, waiting for input' : 'Empty'}</span>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between items-center mt-4 px-1" role="status" aria-live="polite" aria-label={`OTP: ${otpVal.length} of 6 digits entered`}>
              <div className="flex space-x-3">
                <button
                  onClick={handlePaste}
                  className="text-xs font-bold text-sky-400 hover:underline focus-visible:ring-2 focus-visible:ring-sky-500 rounded px-1"
                  aria-label="Paste OTP from clipboard"
                >
                  Paste from SMS
                </button>
                <button
                  disabled={resendTimer > 0}
                  onClick={() => {
                    setResendTimer(30);
                    setOtpVal('');
                  }}
                  className={`text-xs font-bold focus-visible:ring-2 focus-visible:ring-sky-500 rounded px-1 ${
                    resendTimer > 0 ? 'text-slate-600 cursor-not-allowed' : 'text-sky-400 hover:underline'
                  }`}
                >
                  {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend Now'}
                </button>
              </div>
            </div>

            <div className="sr-only" aria-live="polite" aria-atomic="true">
              {resendTimer > 0 ? `Resend available in ${resendTimer} seconds` : 'Resend available'}
            </div>
          </div>

        <div className="p-3.5 bg-slate-900/40 border border-slate-800/60 rounded-2xl flex space-x-3 items-center">
          <div className="p-2 bg-slate-950 border border-slate-800 rounded-xl text-sky-400 shrink-0">
            <Lock className="w-4 h-4" />
          </div>
          <p className="text-xs text-slate-400 text-left leading-normal">
            This verification helps secure your account. Guardia AI{' '}
            <strong className="text-white font-medium">never accesses</strong> or requests your bank password.
          </p>
        </div>
      </div>

      <div className="pb-6 z-10">
        <button
          disabled={authLoading || otpVal.length !== 6}
          onClick={() => {
            if (otpVal.length !== 6) return;
            setAuthLoading(true);
            setTimeout(() => {
              setAuthLoading(false);
              proceedToNext();
            }, 600);
          }}
          className={`w-full text-white font-bold py-4 rounded-2xl shadow-lg transition active:scale-[0.98] flex items-center justify-center space-x-2 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${
            authLoading ? 'bg-sky-500/80 cursor-not-allowed' : 'bg-sky-500 hover:bg-sky-400 shadow-sky-500/10'
          } disabled:opacity-40 disabled:cursor-not-allowed`}
        >
          {authLoading ? (
            <>
              <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" aria-hidden="true" />
              <span>Verifying...</span>
            </>
          ) : (
            <span>Verify & Proceed →</span>
          )}
        </button>
      </div>
    </div>
  );
}

