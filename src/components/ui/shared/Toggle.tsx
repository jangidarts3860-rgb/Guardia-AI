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
      className="w-full flex items-center justify-between p-3 bg-slate-900/60 border border-slate-800/80 rounded-2xl cursor-pointer hover:border-slate-700 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 text-left"
    >
      <div className="flex space-x-3 items-center">
        {icon && (
          <div className="w-10 h-10 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center shrink-0">
            {icon}
          </div>
        )}
        <div>
          <p className="font-extrabold text-xs text-slate-200">{label}</p>
          {description && <p className="text-[10px] text-slate-400 leading-snug">{description}</p>}
        </div>
      </div>
      <div
        className={`w-11 h-6 p-0.5 rounded-full transition-colors duration-200 flex items-center shrink-0 ${
          enabled ? 'bg-sky-500 justify-end' : 'bg-slate-700 justify-start'
        }`}
      >
        <motion.div
          layout
          transition={{ type: 'spring', stiffness: 700, damping: 30 }}
          className="w-5 h-5 rounded-full bg-white shadow-sm"
        />
      </div>
    </button>
  );
}
