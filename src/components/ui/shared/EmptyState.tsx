import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export default function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center space-y-4" role="status">
      <div className="w-16 h-16 rounded-full bg-slate-800/40 border border-slate-700/30 flex items-center justify-center backdrop-blur-sm mb-2">
        {icon || <ShieldCheck className="w-8 h-8 text-slate-400" />}
      </div>
      <div className="space-y-2">
        <h3 className="text-base font-semibold text-slate-200">{title}</h3>
        <p className="text-sm text-slate-400 max-w-xs mx-auto leading-relaxed">{description}</p>
      </div>
      {action && <div className="pt-2">{action}</div>}
    </div>
  );
}
