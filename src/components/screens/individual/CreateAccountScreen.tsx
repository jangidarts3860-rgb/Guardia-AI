import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store';
import { useState } from 'react';
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { showToast } from '../../ui/shared/Toast';


export default function CreateAccountScreen() {
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

  const [local, setLocal] = useState(profile);
  const [phoneBlurred, setPhoneBlurred] = useState(false);
  const [emailBlurred, setEmailBlurred] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const reduced = useReducedMotion();

  const phoneDigits = local.phone.replace('+91', '').replace(/\s/g, '');
  const isValidName = local.name.trim().length >= 2;
  const isValidPhone = phoneDigits.length === 10;
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(local.email.trim());
  const canSubmit = isValidName && isValidPhone && isValidEmail && !authLoading;

  const handleSubmit = () => {
    if (!canSubmit) return;
    setProfile(local);
    setAuthLoading(true);
    setTimeout(() => {
      setAuthLoading(false);
      navigate('/verify-otp');
    }, 1200);
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-950 text-white p-6 justify-between relative">
      <div className="absolute inset-0 bg-radial-[circle_at_bottom,rgba(99,102,241,0.05)_0%,transparent_60%] pointer-events-none" />

      <div className="space-y-6 z-10 flex-1 flex flex-col">
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-2">
            <button onClick={() => navigate('/permissions')} className="p-2 -ml-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 transition focus-visible:ring-2 focus-visible:ring-sky-500" aria-label="Go back">
              <ArrowLeft className="w-4 h-4 text-slate-300" />
            </button>
            <span className="text-[10px] font-black tracking-widest text-slate-500 font-mono">STEP 3 OF 3</span>
          </div>
          <button
            onClick={() => {
              setProfile({ name: 'Rohan Sharma', phone: '+91 98765 43210', email: 'rohan.sharma@gmail.com', language: 'English', photo: '' });
              navigate('/verify-otp');
            }}
            className="text-xs text-sky-400 hover:text-sky-300 transition font-extrabold tracking-wide uppercase p-3 -mr-3 focus-visible:ring-2 focus-visible:ring-sky-500 rounded-lg"
          >
            Skip
          </button>
        </div>

        <div className="space-y-2 text-left">
          <h2 className="text-2xl font-black tracking-tight text-white">Create Security Profile</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Enter your details to bind your safe device tokens to Guardia Shield.
          </p>
        </div>

        <div className="space-y-4 pt-3 text-left">
          <div className="space-y-1.5">
            <label htmlFor="full-name" className="text-xs font-bold uppercase tracking-wider text-slate-300">Full Name</label>
            <input
              id="full-name"
              type="text"
              value={local.name}
              onChange={(e) => setLocal({ ...local, name: e.target.value })}
              placeholder="e.g. Rohan Sharma"
              className="w-full px-4 py-3.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/50 focus-visible:border-sky-500 transition font-medium"
              aria-describedby="name-error"
            />
            <div className="min-h-[16px] mt-1" role="alert" aria-live="polite">
              {local.name.trim() && !isValidName && (
                <p id="name-error" className="text-[10px] text-red-400 font-semibold">Name must be at least 2 characters</p>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="create-phone" className="text-xs font-bold uppercase tracking-wider text-slate-300">Mobile Number (Secure Bank Link)</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2" aria-hidden="true">
                <span className="text-xs font-bold text-sky-400">+91</span>
              </div>
              <input
                id="create-phone"
                type="tel"
                inputMode="numeric"
                value={phoneDigits}
                onChange={(e) => {
                  const num = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
                  setLocal({ ...local, phone: '+91 ' + num });
                }}
                onBlur={() => setPhoneBlurred(true)}
                onFocus={() => setPhoneBlurred(false)}
                placeholder="99999 99999"
                className="w-full pl-14 pr-4 py-3.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/50 focus-visible:border-sky-500 transition font-mono font-bold tracking-wider"
                aria-describedby="create-phone-error"
              />
            </div>
            <div className="min-h-[16px] mt-1" role="alert" aria-live="polite">
              {phoneBlurred && phoneDigits.length > 0 && !isValidPhone && (
                <p id="create-phone-error" className="text-[10px] text-red-400 font-semibold">Mobile number must be exactly 10 digits</p>
              )}
              {isValidPhone && (
                <p className="text-[10px] text-emerald-400 font-semibold">Secure bank-linked number verified</p>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="create-email" className="text-xs font-bold uppercase tracking-wider text-slate-300">Email Address (Security Reports & Alerts)</label>
            <input
              id="create-email"
              type="email"
              autoComplete="email"
              value={local.email}
              onChange={(e) => setLocal({ ...local, email: e.target.value })}
              onBlur={() => setEmailBlurred(true)}
              onFocus={() => setEmailBlurred(false)}
              placeholder="e.g. rohan.sharma@gmail.com"
              className="w-full px-4 py-3.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/50 focus-visible:border-sky-500 transition font-medium"
              aria-describedby="email-error"
            />
            <div className="min-h-[16px] mt-1" role="alert" aria-live="polite">
              {emailBlurred && local.email.trim() && !isValidEmail && (
                <p id="email-error" className="text-[10px] text-red-400 font-semibold">Enter a valid email address</p>
              )}
              {emailBlurred && isValidEmail && (
                <p className="text-[10px] text-emerald-400 font-semibold">Email registered for security backup</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 z-10 pb-6">
        <button
          disabled={!canSubmit}
          onClick={handleSubmit}
          className={`w-full font-bold py-4 rounded-2xl shadow-lg transition flex items-center justify-center space-x-2 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${
            canSubmit
              ? 'bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-400 hover:to-indigo-400 text-white cursor-pointer shadow-sky-500/10 active:scale-[0.98]'
              : 'bg-slate-700/50 text-slate-400 cursor-not-allowed shadow-none border border-slate-700'
          }`}
        >
          {authLoading ? (
            <>
              <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" aria-hidden="true" />
              <span>Processing...</span>
            </>
          ) : (
            <span>Send OTP Verification →</span>
          )}
        </button>
        <p className="text-xs text-slate-500 leading-relaxed text-center px-4">
          By proceeding, you consent to secure OTP binding in compliance with RBI Account Aggregator guidelines.{' '}
          <button onClick={() => showToast('info', 'Opening Privacy Policy...')} className="text-sky-400 hover:underline font-semibold focus-visible:ring-2 focus-visible:ring-sky-500 rounded">Privacy Policy</button>
        </p>
      </div>
    </div>
  );
}

