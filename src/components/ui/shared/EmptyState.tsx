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
    <div className="flex flex-col items-center justify-center py-12 text-center space-y-3 opacity-80" role="status">
      {icon || <ShieldCheck className="w-12 h-12 text-slate-600" />}
      <div className="space-y-1">
        <h3 className="text-sm font-bold text-slate-400">{title}</h3>
        <p className="text-xs text-slate-500 max-w-[220px] mx-auto">{description}</p>
      </div>
      {action}
    </div>
  );
}
