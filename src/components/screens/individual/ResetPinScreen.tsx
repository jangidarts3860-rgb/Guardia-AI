import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store';
import { useState } from 'react';
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, CheckCircle2, ShieldCheck } from 'lucide-react';
import GuardiaLogo from '../../ui/GuardiaLogo';

export default function ResetPinScreen() {
  const navigate = useNavigate();
  const { profile } = useStore();

  const [step, setStep] = useState<'phone' | 'otp' | 'pin' | 'confirm' | 'done'>('phone');
  const [phoneVal, setPhoneVal] = useState('');
  const [otpVal, setOtpVal] = useState<string[]>(['', '', '', '', '', '']);
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [error, setError] = useState('');
  const [otpTimer, setOtpTimer] = useState(45);

  const startOtpTimer = () => {
    setOtpTimer(45);
    const interval = setInterval(() => {
      setOtpTimer(prev => { if (prev <= 1) { clearInterval(interval); return 0; } return prev - 1; });
    }, 1000);
  };

  const handleSendOtp = () => {
    if (phoneVal.replace(/\D/g, '').length !== 10) return;
    setStep('otp');
    startOtpTimer();
  };

  const handleOtpDigit = (idx: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const newOtp = [...otpVal];
    newOtp[idx] = val;
    setOtpVal(newOtp);
    if (val && idx < 5) {
      const next = document.getElementById(`otp-${idx + 1}`);
      next?.focus();
    }
    if (val && idx === 5 || newOtp.every(d => d)) {
      setTimeout(() => setStep('pin'), 300);
    }
  };

  const handleOtpKeyDown = (idx: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otpVal[idx] && idx > 0) {
      const prev = document.getElementById(`otp-${idx - 1}`);
      prev?.focus();
    }
  };

  const handlePinDigit = (num: string) => {
    if (step === 'done') return;
    setError('');
    if (step === 'pin') {
      if (pin.length < 4) {
        const newPin = pin + num;
        setPin(newPin);
        if (newPin.length === 4) setTimeout(() => setStep('confirm'), 200);
      }
    } else {
      if (confirmPin.length < 4) {
        const newConfirm = confirmPin + num;
        setConfirmPin(newConfirm);
        if (newConfirm.length === 4) {
          if (newConfirm === pin) {
            setStep('done');
            if (typeof localStorage !== 'undefined') {
              const existing = JSON.parse(localStorage.getItem('guardia_user') || '{}');
              localStorage.setItem('guardia_user', JSON.stringify({ ...existing, pin: newConfirm }));
            }
            setTimeout(() => navigate('/home'), 1000);
          } else {
            setError("PINs don't match. Try again.");
            setTimeout(() => { setConfirmPin(''); setPin(''); setStep('pin'); setError(''); }, 1200);
          }
        }
      }
    }
  };

  const handleBackspace = () => {
    if (step === 'pin') setPin(prev => prev.slice(0, -1));
    else setConfirmPin(prev => prev.slice(0, -1));
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-950 text-white p-6 justify-between relative">
      <div className="absolute inset-0 bg-radial-[circle_at_top,rgba(99,102,241,0.05)_0%,transparent_60%] pointer-events-none" aria-hidden="true" />

      <div className="space-y-6 z-10 flex-1 flex flex-col justify-between">
        <div className="space-y-4 pt-2">
          <button onClick={() => navigate(-1)} className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 transition focus-visible:ring-2 focus-visible:ring-sky-500 self-start" aria-label="Go back">
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="flex justify-center">
            <GuardiaLogo size={56} variant="icon" animated={false} />
          </div>

          <AnimatePresence mode="wait">
            {step === 'phone' && (
              <motion.div key="phone" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-center space-y-2">
                <h2 className="text-xl font-black tracking-tight">Reset Security PIN</h2>
                <p className="text-xs text-slate-400">Enter your registered mobile to receive OTP.</p>
                <div className="max-w-xs mx-auto mt-4">
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-sky-400" aria-hidden="true">+91</span>
                    <input type="tel" inputMode="numeric" value={phoneVal} onChange={(e) => { const v = e.target.value.replace(/\D/g, '').slice(0, 10); setPhoneVal(v); }}
                      placeholder="99999 99999" className="w-full pl-14 pr-4 py-3.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/50 focus-visible:border-sky-500 transition font-mono font-bold tracking-wider"
                      aria-label="Mobile number" />
                  </div>
                  <button onClick={handleSendOtp} disabled={phoneVal.replace(/\D/g, '').length !== 10}
                    className={`w-full mt-3 py-3.5 font-bold rounded-xl transition text-xs ${phoneVal.replace(/\D/g, '').length === 10 ? 'bg-sky-500 hover:bg-sky-400 text-white' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}>
                    Send OTP
                  </button>
                </div>
              </motion.div>
            )}

            {step === 'otp' && (
              <motion.div key="otp" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-center space-y-2">
                <h2 className="text-xl font-black tracking-tight">Enter OTP</h2>
                <p className="text-xs text-slate-400">Sent to +91 {phoneVal.replace(/(\d{5})(\d{5})/, '$1 $2')}</p>
                <div className="flex justify-center space-x-3 py-6" role="group" aria-label="OTP input">
                  {otpVal.map((d, i) => (
                    <input key={i} id={`otp-${i}`} type="text" inputMode="numeric" maxLength={1} value={d}
                      autoComplete={i === 0 ? "one-time-code" : undefined}
                      onChange={(e) => handleOtpDigit(i, e.target.value)} onKeyDown={(e) => handleOtpKeyDown(i, e)}
                      className={`w-11 h-14 rounded-xl text-center text-lg font-black font-mono bg-slate-900 border-2 focus:outline-none focus:border-sky-500 transition ${d ? 'border-sky-500 text-white' : 'border-slate-800 text-transparent'}`}
                      aria-label={`Digit ${i + 1}`} />
                  ))}
                </div>
                <p className="text-xs text-slate-500">
                  {otpTimer > 0 ? `Resend in 0:${otpTimer.toString().padStart(2, '0')}` : <button onClick={() => { setOtpVal(['', '', '', '', '', '']); startOtpTimer(); }} className="text-sky-400 font-bold hover:underline">Resend OTP</button>}
                </p>
              </motion.div>
            )}

            {(step === 'pin' || step === 'confirm') && (
              <motion.div key="pin-step" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-center space-y-2">
                <h2 className="text-xl font-black tracking-tight">
                  {step === 'pin' ? 'Create New PIN' : 'Confirm New PIN'}
                </h2>
                <p className="text-xs text-slate-400">
                  {step === 'pin' ? 'Set a new 4-digit security PIN.' : 'Enter the same PIN again to confirm.'}
                </p>
                <div className="flex justify-center space-x-6 py-6">
                  {[...Array(4)].map((_, idx) => {
                    const val = step === 'pin' ? pin : confirmPin;
                    return <div key={idx}
                      className={`w-4 h-4 rounded-full transition-all duration-200 ${val.length > idx ? 'bg-sky-400 shadow-[0_0_10px_rgba(14,165,233,0.8)] scale-110' : 'border-2 border-slate-800 bg-slate-950'}`} />;
                  })}
                </div>
                {error && <p className="text-center text-xs text-red-400 font-bold">{error}</p>}
              </motion.div>
            )}

            {step === 'done' && (
              <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-3">
                <div className="flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  </div>
                </div>
                <h2 className="text-xl font-black tracking-tight">PIN Reset Successful!</h2>
                <p className="text-xs text-slate-400">Your security PIN has been updated.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {(step === 'pin' || step === 'confirm') && (
          <div className="w-full max-w-xs mx-auto pb-4">
            <div className="grid grid-cols-3 gap-y-4 gap-x-5 text-center">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button key={num} onClick={() => handlePinDigit(num.toString())}
                  className="w-14 h-14 rounded-full bg-slate-900/40 border border-slate-800/40 text-lg font-black transition-all flex items-center justify-center active:bg-slate-700 active:scale-90 active:border-sky-500 shadow-sm focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none"
                  aria-label={`${num}`}>{num}</button>
              ))}
              <button onClick={handleBackspace} className="w-14 h-14 rounded-full bg-transparent text-slate-500 text-xl font-bold transition-all flex items-center justify-center active:bg-slate-800/50 active:scale-90 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none" aria-label="Delete last digit">⌫</button>
              <button onClick={() => handlePinDigit('0')} className="w-14 h-14 rounded-full bg-slate-900/40 border border-slate-800/40 text-lg font-black transition-all flex items-center justify-center active:bg-slate-700 active:scale-90 active:border-sky-500 shadow-sm focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none" aria-label="0">0</button>
              <div />
            </div>
          </div>
        )}

        <div className="pt-2 text-center">
          <span className="inline-flex items-center space-x-1 px-3 py-1 bg-slate-900/60 border border-slate-800/40 rounded-full text-xs font-bold text-slate-500 font-mono">
            <ShieldCheck className="w-3 h-3 text-emerald-500" />
            <span>RBI CERTIFIED</span>
          </span>
        </div>
      </div>
    </div>
  );
}
