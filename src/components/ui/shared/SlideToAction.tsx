import { useRef, useState, useCallback, useEffect } from 'react';
import React from 'react';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

interface SlideToActionProps {
  label: string;
  onComplete: () => void;
  completeThreshold?: number;
  disabled?: boolean;
  variant?: 'danger' | 'default';
}

export default function SlideToAction({
  label,
  onComplete,
  completeThreshold = 92,
  disabled = false,
  variant = 'default',
}: SlideToActionProps) {
  const [progress, setProgress] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);
  const [showGlow, setShowGlow] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const completeCalled = useRef(false);

  const thumbX = useMotionValue(0);
  const springX = useSpring(thumbX, { stiffness: 400, damping: 25 });
  const glowOpacity = useTransform(thumbX, [0, 300], [variant === 'danger' ? 0 : 0, 0.6]);

  useEffect(() => {
    completeCalled.current = false;
  }, []);

  const accentColor = variant === 'danger' ? 'red' : 'sky';

  const handleMove = useCallback((clientX: number) => {
    if (!isSliding || disabled || completeCalled.current) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const relativeX = clientX - rect.left;
    const pct = Math.min(Math.max((relativeX / rect.width) * 100, 0), 100);
    setProgress(pct);
    thumbX.set(Math.max(0, pct * 2.8));

    if (pct >= completeThreshold) {
      completeCalled.current = true;
      setIsSliding(false);
      setProgress(100);
      thumbX.set(rect.width - 60);
      setShowGlow(true);
      setTimeout(() => setShowGlow(false), 500);
      setTimeout(() => {
        onComplete();
        setTimeout(() => { setProgress(0); thumbX.set(0); }, 300);
      }, 200);
    }
  }, [isSliding, disabled, completeThreshold, onComplete, thumbX]);

  const handleEnd = useCallback(() => {
    if (!isSliding || completeCalled.current) return;
    setIsSliding(false);
    if (progress < completeThreshold) {
      setHasFailed(true);
      setTimeout(() => {
        setProgress(0);
        thumbX.set(0);
        setHasFailed(false);
      }, 600);
    }
  }, [isSliding, progress, completeThreshold, thumbX]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!disabled && !completeCalled.current) {
        completeCalled.current = true;
        setShowGlow(true);
        setTimeout(() => setShowGlow(false), 500);
        setTimeout(onComplete, 200);
      }
    }
  };

  const progressWidth = (variant === 'danger' && !reduced)
    ? `max(${progress}%, ${Math.min(progress * 1.5, 100)}%)`
    : `${Math.max(0, progress - 5)}%`;

  return (
    <div
      ref={containerRef}
      role="slider"
      aria-label={label}
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseMove={(e) => handleMove(e.clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      onMouseUp={handleEnd}
      onTouchEnd={handleEnd}
      onMouseLeave={handleEnd}
      className={`relative h-14 rounded-2xl flex items-center justify-center overflow-hidden cursor-pointer select-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${
        variant === 'danger' ? 'focus-visible:ring-red-500' : 'focus-visible:ring-sky-500'
      } ${
        variant === 'danger'
          ? 'bg-red-950/60 border border-red-900/30'
          : 'bg-slate-900 border border-slate-800'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <div
        className={`absolute left-0 top-0 bottom-0 rounded-2xl ${
          reduced ? '' : 'transition-all duration-150'
        } ${variant === 'danger' ? 'bg-gradient-to-r from-red-900/80 via-red-700/50 to-red-600/30' : 'bg-sky-500/20'}`}
        style={{
          width: reduced ? `${progress}%` : progressWidth,
          boxShadow: variant === 'danger' && !reduced
            ? `0 0 ${20 + progress * 1.5}px rgba(220, 38, 38, ${progress / 200})`
            : 'none',
        }}
      />

      {showGlow && !reduced && (
        <motion.div
          initial={{ opacity: 0.6, scale: 1 }}
          animate={{ opacity: 0, scale: 1.4 }}
          transition={{ duration: 0.5 }}
          className={`absolute inset-0 rounded-2xl pointer-events-none ${
            variant === 'danger' ? 'shadow-[0_0_40px_rgba(220,38,38,0.5)]' : 'shadow-[0_0_40px_rgba(14,165,233,0.4)]'
          }`}
        />
      )}

      {hasFailed && (
        <span className="absolute inset-0 flex items-center justify-center text-[10px] text-red-400 font-bold animate-pulse" role="alert">
          Not far enough — try again
        </span>
      )}

      <span className={`relative z-10 text-xs font-bold select-none pointer-events-none transition-opacity ${
        hasFailed ? 'opacity-0' : 'opacity-100'
      } ${variant === 'danger' ? 'text-red-300' : 'text-slate-400'}`}>
        {label}
      </span>

      <motion.div
        onMouseDown={() => { if (!disabled && !completeCalled.current) setIsSliding(true); }}
        onTouchStart={() => { if (!disabled && !completeCalled.current) setIsSliding(true); }}
        style={{ x: springX }}
        className={`absolute left-1.5 top-1.5 w-11 h-11 rounded-xl flex items-center justify-center shadow-md z-20 ${
          variant === 'danger'
            ? 'bg-red-600 hover:bg-red-500 text-white'
            : 'bg-cyan-500 hover:bg-cyan-400 text-white'
        }`}
      >
        <motion.div
          animate={progress > 70 ? { rotate: 0, scale: 1 } : { rotate: 0, scale: [1, 1.1, 1] }}
          transition={{ duration: 0.3 }}
        >
          {progress > 70 ? (
            <motion.div
              initial={{ x: -5, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
