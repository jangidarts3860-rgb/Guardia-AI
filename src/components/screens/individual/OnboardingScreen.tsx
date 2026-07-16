import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store';
import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import React from 'react';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

const slides = [
  {
    badge: { text: 'Feature 1 of 3', color: 'text-sky-400 bg-sky-400/10 border-sky-500/20' },
    icon: (
      <svg className="w-12 h-12 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    title: 'Scam Defense',
    cardDesc: 'Real merchant check results',
    headline: 'Know who you\'re paying',
    desc: 'Real-time merchant verification before you scan any QR or UPI ID.',
    cta: 'Next →',
  },
  {
    badge: { text: 'Feature 2 of 3', color: 'text-amber-300 bg-amber-400/10 border-amber-500/20' },
    icon: (
      <svg className="w-12 h-12 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="2" x2="12" y2="22" />
        <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
    title: 'Subscription Control',
    cardDesc: 'Renews-today timeline mapping',
    headline: 'Track every subscription',
    desc: 'See what renews today, this week, or this month. Cancel unused plans in one tap — no more forgotten payments.',
    cta: 'Next →',
  },
  {
    badge: { text: 'Feature 3 of 3', color: 'text-emerald-400 bg-emerald-400/10 border-emerald-500/20' },
    icon: (
      <svg className="w-12 h-12 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
      </svg>
    ),
    title: 'Your Privacy Promise',
    cardDesc: 'RBI Account Aggregator privacy promise',
    headline: 'Your data stays yours',
    desc: 'Read-only access through RBI-regulated channels. You control what you share, and you can revoke access anytime from Settings.',
    cta: 'Link My Bank →',
  },
];

export default function OnboardingScreen() {
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
  const [step, setStep] = useState(0);
  const slide = slides[step];

  const goNext = useCallback(() => {
    if (step < slides.length - 1) setStep(s => s + 1);
    else navigate('/permissions');
  }, [step, navigate]);

  const goPrev = useCallback(() => {
    if (step > 0) setStep(s => s - 1);
  }, [step]);

  return (
    <div className="flex flex-col justify-between min-h-full bg-transparent text-white p-6 relative overflow-y-auto">
      <div className="pt-2 z-10 flex justify-between items-center w-full">
        <span className="text-[10px] font-bold tracking-widest text-slate-400 font-mono">STEP {step + 1} OF 3</span>
        <button onClick={() => navigate('/permissions')} className="text-xs text-sky-400 font-bold hover:text-sky-300 transition px-2 py-1 rounded focus-visible:ring-2 focus-visible:ring-sky-500">Skip</button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center z-10 px-2 space-y-6">
      <div className="w-full max-w-xs relative min-h-[200px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={reduced ? { opacity: 1 } : { opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduced ? { opacity: 1 } : { opacity: 0, x: -40 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="w-full p-5 bg-slate-900 border border-slate-800 rounded-2xl text-left relative flex flex-col items-center text-center"
            >
              <div className="flex justify-between items-center w-full mb-4">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wider font-mono ${slide.badge.color}`}>
                  {slide.badge.text}
                </span>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-transparent border border-slate-800 flex items-center justify-center mb-4" aria-hidden="true">
                {slide.icon}
              </div>
              <h3 className="font-black text-lg text-white tracking-tight">{slide.title}</h3>
              <p className="text-xs text-slate-400 mt-0.5 leading-normal">{slide.cardDesc}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="space-y-2.5 px-1">
          <h1 className="text-2xl font-extrabold tracking-tight text-white leading-tight">
            {slide.headline}
          </h1>
          <p className="text-xs text-slate-400 leading-relaxed px-2">
            {slide.desc}
          </p>
        </div>

        <div className="flex items-center space-x-2.5 pt-1" role="tablist" aria-label="Progress steps">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setStep(idx)}
              role="tab"
              aria-selected={step === idx}
              aria-label={`Step ${idx + 1} of 3`}
              className={`h-1.5 rounded-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-sky-500 ${
                step === idx ? 'w-6 bg-sky-500' : 'w-2 bg-slate-700 hover:bg-slate-600'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="space-y-4 z-10 pb-6">
        <div className="flex space-x-3">
          {step > 0 && (
            <button
              onClick={goPrev}
              className="flex-1 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-white font-bold py-4 rounded-2xl transition active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-sky-500"
            >
              ← Back
            </button>
          )}
          <button
            onClick={goNext}
            className={`${step > 0 ? 'flex-[2]' : 'w-full'} bg-sky-500 hover:bg-sky-400 text-white font-bold py-4 rounded-2xl shadow-lg shadow-sky-500/15 transition active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617]`}
          >
            {slide.cta}
          </button>
        </div>
      </div>
    </div>
  );
}
