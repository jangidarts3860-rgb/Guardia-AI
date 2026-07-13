import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'dark' | 'light';
  hover?: boolean;
  glow?: 'sky' | 'emerald' | 'red' | 'amber' | 'purple' | 'none';
  as?: 'div' | 'button';
  onClick?: () => void;
}

const glowMap: Record<string, string> = {
  sky: 'shadow-[0_0_24px_-8px_rgba(14,165,233,0.25)] border-sky-500/20',
  emerald: 'shadow-[0_0_24px_-8px_rgba(16,185,129,0.25)] border-emerald-500/20',
  red: 'shadow-[0_0_24px_-8px_rgba(239,68,68,0.25)] border-red-500/20',
  amber: 'shadow-[0_0_24px_-8px_rgba(245,158,11,0.25)] border-amber-500/20',
  purple: 'shadow-[0_0_24px_-8px_rgba(168,85,247,0.25)] border-purple-500/20',
  none: '',
};

export default function GlassCard({
  children, className = '', variant = 'dark', hover = false,
  glow = 'none', as: Tag = 'div', onClick,
}: GlassCardProps) {
  const base = variant === 'dark'
    ? 'bg-slate-900 border-slate-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_2px_8px_-2px_rgba(0,0,0,0.3)]'
    : 'bg-white border-white/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_2px_8px_-2px_rgba(0,0,0,0.1)]';

  const hoverEffect = hover
    ? 'hover:border-slate-700/60 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_4px_12px_-2px_rgba(0,0,0,0.4)] hover:bg-slate-900/80 transition-all duration-300 cursor-pointer'
    : '';

  const isButton = Tag === 'button' || onClick != null;

  return (
    <Tag
      onClick={onClick}
      onKeyDown={(e) => { if ((e.key === 'Enter' || e.key === ' ') && onClick) onClick(); }}
      tabIndex={isButton ? 0 : undefined}
      role={isButton ? 'button' : undefined}
      className={`rounded-2xl ${base} ${glowMap[glow]} ${hoverEffect} ${className} ${isButton ? 'focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950' : ''}`}
    >
      {children}
    </Tag>
  );
}
