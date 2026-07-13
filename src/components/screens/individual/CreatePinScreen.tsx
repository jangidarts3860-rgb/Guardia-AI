import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store';
import { useState } from 'react';
import { Lock, CheckCircle2, ArrowLeft, XCircle } from 'lucide-react';
import GuardiaLogo from '../../ui/GuardiaLogo';


export default function CreatePinScreen() {
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

  const [step, setStep] = useState<'enter' | 'confirm' | 'done'>('enter');
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [error, setError] = useState('');

  const handleDigit = (num: string) => {
    if (step === 'done' || error) return;
    setError('');
    if (step === 'enter') {
      if (pin.length < 4) {
        const newPin = pin + num;
        setPin(newPin);
        if (newPin.length === 4) {
          setTimeout(() => setStep('confirm'), 200);
        }
      }
    } else {
      if (confirmPin.length < 4) {
        const newConfirm = confirmPin + num;
        setConfirmPin(newConfirm);
          if (newConfirm.length === 4) {
          if (newConfirm === pin) {
            setStep('done');
            if (typeof window !== 'undefined') {
              const existing = JSON.parse(localStorage.getItem('guardia_user') || '{}');
              localStorage.setItem('guardia_user', JSON.stringify({ ...existing, name: profile.name, phone: profile.phone, email: profile.email, pin }));
            }
            setTimeout(() => navigate('/onboarding'), 600);
          } else {
            setError("PINs don't match. Try again.");
            setTimeout(() => { setConfirmPin(''); setPin(''); setStep('enter'); setError(''); }, 1200);
          }
        }
      }
    }
  };

  const handleBackspace = () => {
    if (step === 'enter') setPin(prev => prev.slice(0, -1));
    else setConfirmPin(prev => prev.slice(0, -1));
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-950 text-white p-6 justify-between relative">
      <div className="absolute inset-0 bg-radial-[circle_at_top,rgba(99,102,241,0.05)_0%,transparent_60%] pointer-events-none" aria-hidden="true" />

      <div className="space-y-6 z-10 flex-1 flex flex-col justify-between">
        <div className="space-y-4 pt-2">
          <div className="flex justify-between items-center">
            {step !== 'done' ? (
              <button onClick={() => navigate('/verify-otp')} className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 transition focus-visible:ring-2 focus-visible:ring-sky-500" aria-label="Go back">
                <ArrowLeft className="w-4 h-4" />
              </button>
            ) : <div />}
            <span className="text-xs font-black tracking-widest text-slate-500 font-mono">STEP 3 OF 3</span>
          </div>
          <div className="flex justify-center">
            <GuardiaLogo size={56} variant="icon" animated={false} />
          </div>

          {step === 'done' ? (
            <div className="text-center space-y-2">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </div>
              </div>
              <h2 className="text-xl font-black tracking-tight">PIN Created!</h2>
              <p className="text-xs text-slate-400">Your vault is now secured.</p>
            </div>
          ) : (
            <div className="text-center space-y-2">
              <h2 className="text-xl font-black tracking-tight">
                {step === 'enter' ? 'Create Security PIN' : 'Confirm Your PIN'}
              </h2>
              <p className="text-xs text-slate-400">
                {step === 'enter'
                  ? 'Set a 4-digit PIN to protect your vault.'
                  : 'Enter the same PIN again to confirm.'}
              </p>
            </div>
          )}

<div className="flex justify-center space-x-6 py-6" role="status" aria-live="polite" aria-label={`PIN code: ${(step === 'enter' ? pin : confirmPin).length} digits entered`}>
            {[...Array(4)].map((_, idx) => {
              const val = step === 'enter' ? pin : confirmPin;
              const filled = val.length > idx;
              return (
                <div
                  key={idx}
                  className={`w-4 h-4 rounded-full transition-all duration-200 ${
                    step === 'done'
                      ? 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]'
                      : filled
                        ? 'bg-sky-400 shadow-[0_0_10px_rgba(14,165,233,0.8)] scale-110'
                        : 'border-2 border-slate-800 bg-slate-950'
                  }`}
                />
              );
            })}
          </div>

          {error && (
            <p className="text-center text-xs font-bold flex items-center justify-center space-x-1" role="alert">
              <XCircle className="w-3.5 h-3.5 text-red-400" aria-hidden="true" />
              <span>{error}</span>
            </p>
          )}

          <div className="text-center text-xs text-slate-500">
            <Lock className="w-3 h-3 inline mr-1" />
            {profile.phone || '+91 98765 43210'}
          </div>
        </div>

        <div className="w-full max-w-[280px] mx-auto pb-4">
          <div className="grid grid-cols-3 gap-y-4 gap-x-5 text-center">
{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                onClick={() => handleDigit(num.toString())}
                className="w-14 h-14 rounded-full bg-slate-900/40 border border-slate-800/40 text-lg font-black transition-all flex items-center justify-center active:bg-slate-700 active:scale-90 active:border-sky-500 shadow-sm focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none"
                aria-label={`Press ${num}`}
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
              onClick={() => handleDigit('0')}
              className="w-14 h-14 rounded-full bg-slate-900/40 border border-slate-800/40 text-lg font-black transition-all flex items-center justify-center active:bg-slate-700 active:scale-90 active:border-sky-500 shadow-sm focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none"
              aria-label="0"
            >
              0
            </button>
            <div />
          </div>
        </div>
      </div>
    </div>
  );
}

