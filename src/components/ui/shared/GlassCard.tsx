import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'dark' | 'light';
  hover?: boolean;
  glow?: 'sky' | 'emerald' | 'red' | 'amber' | 'none';
  as?: 'div' | 'button';
  onClick?: () => void;
}

const glowMap: Record<string, string> = {
  sky: 'shadow-[0_0_18px_-6px_rgba(14,165,233,0.2)] border-sky-500/15',
  emerald: 'shadow-[0_0_18px_-6px_rgba(16,185,129,0.2)] border-emerald-500/15',
  red: 'shadow-[0_0_18px_-6px_rgba(239,68,68,0.2)] border-red-500/15',
  amber: 'shadow-[0_0_18px_-6px_rgba(245,158,11,0.2)] border-amber-500/15',
  none: '',
};

export default function GlassCard({
  children, className = '', variant = 'dark', hover = false,
  glow = 'none', as: Tag = 'div', onClick,
}: GlassCardProps) {
  const base = variant === 'dark'
    ? 'bg-slate-900/60 backdrop-blur-xl border border-slate-800/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]'
    : 'bg-white/60 backdrop-blur-xl border border-gray-200/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]';

  const hoverEffect = hover ? 'hover:border-slate-700/60 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:bg-slate-900/70 transition-all duration-300 cursor-pointer' : '';

  return (
    <Tag
      onClick={onClick}
      className={`rounded-2xl ${base} ${glowMap[glow]} ${hoverEffect} ${className}`}
    >
      {children}
    </Tag>
  );
}
