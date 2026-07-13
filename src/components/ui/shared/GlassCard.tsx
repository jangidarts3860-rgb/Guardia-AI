import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'dark' | 'light' | 'elevated' | 'minimal';
  hover?: boolean;
  glow?: 'sky' | 'emerald' | 'red' | 'amber' | 'purple' | 'none';
  as?: 'div' | 'button';
  onClick?: () => void;
  interactive?: boolean;
}

const glowMap: Record<string, string> = {
  sky: 'shadow-[0_0_28px_-8px_rgba(6,182,212,0.3)] border-cyan-500/25',
  emerald: 'shadow-[0_0_28px_-8px_rgba(16,185,129,0.3)] border-emerald-500/25',
  red: 'shadow-[0_0_28px_-8px_rgba(239,68,68,0.3)] border-red-500/25',
  amber: 'shadow-[0_0_28px_-8px_rgba(245,158,11,0.3)] border-amber-500/25',
  purple: 'shadow-[0_0_28px_-8px_rgba(168,85,247,0.3)] border-purple-500/25',
  none: '',
};

export default function GlassCard({
  children, className = '', variant = 'dark', hover = false,
  glow = 'none', as: Tag = 'div', onClick, interactive = false,
}: GlassCardProps) {
  const variants = {
    dark: 'bg-slate-900/70 backdrop-blur-md border border-slate-800/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_8px_24px_-6px_rgba(0,0,0,0.4)]',
    elevated: 'bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_12px_32px_-8px_rgba(0,0,0,0.5)]',
    minimal: 'bg-slate-900/50 backdrop-blur-sm border border-slate-800/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_4px_16px_-4px_rgba(0,0,0,0.3)]',
    light: 'bg-white/70 backdrop-blur-md border border-white/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_8px_24px_-6px_rgba(0,0,0,0.15)]',
  };

  const base = variants[variant] || variants.dark;

  const hoverEffect = hover || interactive
    ? 'hover:bg-slate-800/60 hover:border-slate-700/70 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_12px_32px_-6px_rgba(0,0,0,0.5)] transition-all duration-300 cursor-pointer'
    : '';

  const isButton = Tag === 'button' || onClick != null;

  return (
    <Tag
      onClick={onClick}
      onKeyDown={(e) => { if ((e.key === 'Enter' || e.key === ' ') && onClick) onClick(); }}
      tabIndex={isButton ? 0 : undefined}
      role={isButton ? 'button' : undefined}
      className={`rounded-2xl ${base} ${glowMap[glow]} ${hoverEffect} ${className} ${isButton ? 'focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950' : ''}`}
    >
      {children}
    </Tag>
  );
}
