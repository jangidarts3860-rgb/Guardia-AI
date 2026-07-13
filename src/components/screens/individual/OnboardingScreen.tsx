import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store';
import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import React from 'react';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
    <div className="flex flex-col justify-between min-h-full bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-white p-6 relative overflow-hidden">
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{ 
          background: [
            'radial-gradient(circle at 0% 0%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 100% 100%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 0% 0%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)',
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      
      <div className="pt-2 z-10">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-between"
        >
          <span className="text-xs font-black tracking-widest text-cyan-400/70 font-mono">STEP {step + 1} / 3</span>
          <motion.div 
            className="w-32 h-1.5 bg-slate-800/60 rounded-full overflow-hidden border border-slate-700/40"
            layout
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((step + 1) / 3) * 100}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center z-10 px-2 space-y-8">
        {/* Card Carousel */}
        <div className="w-full max-w-sm relative min-h-[240px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={reduced ? { opacity: 1 } : { opacity: 0, x: 100, rotateZ: 5 }}
              animate={{ opacity: 1, x: 0, rotateZ: 0 }}
              exit={reduced ? { opacity: 1 } : { opacity: 0, x: -100, rotateZ: -5 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="w-full p-6 bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-slate-800/60 backdrop-blur-xl rounded-3xl text-center relative flex flex-col items-center shadow-2xl shadow-slate-950/50 overflow-hidden"
            >
              {/* Card background gradient */}
              <div className="absolute inset-0 opacity-50 bg-gradient-to-br from-slate-900 to-slate-950" aria-hidden="true" />
              
              <div className="relative z-10 w-full space-y-5">
                {/* Badge */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <span className={`inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider font-mono border ${slide.badge.color}`}>
                    {slide.badge.text}
                  </span>
                </motion.div>

                {/* Icon */}
                <motion.div 
                  initial={{ scale: 0, rotateZ: -20 }}
                  animate={{ scale: 1, rotateZ: 0 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900 border border-slate-700/60 flex items-center justify-center mx-auto shadow-lg" 
                  aria-hidden="true"
                >
                  {slide.icon}
                </motion.div>

                {/* Card Title & Desc */}
                <div className="space-y-1.5">
                  <motion.h3 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="font-black text-2xl text-white tracking-tight"
                  >
                    {slide.title}
                  </motion.h3>
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-sm text-cyan-300/90 leading-relaxed font-medium"
                  >
                    {slide.cardDesc}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Headline & Description */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`text-${step}`}
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 1 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-3.5 max-w-md"
          >
            <h2 className="text-3xl font-black tracking-tight text-white leading-tight">
              {slide.headline}
            </h2>
            <p className="text-sm text-slate-300/90 leading-relaxed">
              {slide.desc}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Progress Indicator Dots */}
        <motion.div 
          className="flex items-center justify-center gap-2.5 pt-4" 
          role="tablist" 
          aria-label="Progress steps"
        >
          {slides.map((_, idx) => (
            <motion.button
              key={idx}
              onClick={() => setStep(idx)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              role="tab"
              aria-selected={step === idx}
              aria-label={`Step ${idx + 1} of 3`}
              className={`rounded-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-cyan-500 ${
                step === idx 
                  ? 'h-2.5 w-8 bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/30' 
                  : 'h-2 w-2 bg-slate-700 hover:bg-slate-600'
              }`}
            />
          ))}
        </motion.div>
      </div>

      {/* Action Buttons */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-3 z-10 pb-2"
      >
        <div className="flex gap-3">
          {step > 0 && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={goPrev}
              className="flex-1 bg-slate-900/60 backdrop-blur-sm border border-slate-800/60 hover:bg-slate-900/80 hover:border-cyan-500/30 text-white font-bold py-3.5 rounded-xl transition-all duration-300 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-cyan-500 flex items-center justify-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </motion.button>
          )}
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={goNext}
            className={`${
              step > 0 ? 'flex-[1.5]' : 'flex-1'
            } bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-cyan-500/20 transition-all duration-300 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-cyan-500 flex items-center justify-center gap-2`}
          >
            {slide.cta.includes('Link') ? (
              <>
                Link My Bank
                <ChevronRight className="w-4 h-4" />
              </>
            ) : (
              <>
                {slide.cta.split('→')[0].trim()}
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
