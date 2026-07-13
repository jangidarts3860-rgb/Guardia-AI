import { motion } from 'motion/react';
import React from 'react';

interface ToggleProps {
  enabled: boolean;
  onChange: () => void;
  label: string;
  description?: string;
  icon?: React.ReactNode;
}

export default function Toggle({ enabled, onChange, label, description, icon }: ToggleProps) {
  return (
    <button
      onClick={onChange}
      role="switch"
      aria-checked={enabled}
      aria-label={label}
      className={`w-full flex items-center justify-between p-4 bg-slate-800/50 border backdrop-blur-md rounded-2xl cursor-pointer transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 text-left ${
        enabled
          ? 'border-cyan-500/30 hover:border-cyan-500/50 shadow-[0_0_20px_-8px_rgba(6,182,212,0.2)]'
          : 'border-slate-700/50 hover:border-slate-600/50'
      }`}
    >
      <div className="flex space-x-3 items-center min-w-0">
        {icon && (
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${
            enabled
              ? 'bg-cyan-500/15 border-cyan-500/30'
              : 'bg-slate-700/30 border-slate-600/30'
          }`}>
            {icon}
          </div>
        )}
        <div className="min-w-0">
          <p className={`font-semibold text-xs ${enabled ? 'text-white' : 'text-slate-200'}`}>{label}</p>
          {description && <p className="text-[11px] text-slate-400 leading-snug mt-0.5 truncate">{description}</p>}
        </div>
      </div>
      <div
        className={`w-12 h-7 p-0.5 rounded-full transition-colors duration-300 flex items-center shrink-0 ${
          enabled ? 'bg-cyan-500/80 justify-end shadow-[0_0_12px_rgba(6,182,212,0.3)]' : 'bg-slate-700/50 justify-start'
        }`}
      >
        <motion.div
          layout
          transition={{ type: 'spring', stiffness: 600, damping: 30 }}
          className="w-6 h-6 rounded-full bg-white shadow-lg"
        />
      </div>
    </button>
  );
}
