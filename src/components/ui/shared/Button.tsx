import React from 'react';
import { motion } from 'motion/react';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'danger' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit';
  ariaLabel?: string;
}

export default function Button({
  children, onClick, variant = 'primary', size = 'md',
  disabled, className = '', type = 'button', ariaLabel,
}: ButtonProps) {
  const reduced = useReducedMotion();

  const base = 'font-bold rounded-2xl transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:opacity-40 disabled:cursor-not-allowed';

  const variants: Record<string, string> = {
    primary: 'bg-sky-500 hover:bg-sky-400 text-white shadow-lg shadow-sky-500/10',
    danger: 'bg-red-500 hover:bg-red-400 text-white shadow-lg shadow-red-500/10',
    ghost: 'bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white',
    glass: 'bg-slate-900/60 backdrop-blur-xl border border-slate-800/50 hover:border-slate-700/60 text-white',
  };

  const sizes: Record<string, string> = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-5 py-3 text-xs',
    lg: 'w-full py-4 text-sm',
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      whileTap={reduced ? {} : { scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 500, damping: 20 }}
    >
      {children}
    </motion.button>
  );
}
