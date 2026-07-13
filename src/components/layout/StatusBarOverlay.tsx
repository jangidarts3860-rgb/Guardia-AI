import React from 'react';
import { Shield, ShieldAlert, Lock, AlertTriangle, Scan } from 'lucide-react';
import { ScreenId } from '../../types';

interface StatusBarOverlayProps {
  currentScreen: ScreenId;
  isOffline: boolean;
}

export default function StatusBarOverlay({ currentScreen, isOffline }: StatusBarOverlayProps) {
  let opacityClass = 'opacity-100';
  let backgroundClass = 'bg-slate-950/40';
  let textClass = 'text-slate-300';
  let accentIcon: React.ReactNode = null;
  let customBadge: React.ReactNode = null;

  const isImmersive = [
    'splash',
    'onboarding',
    'permissions',
    'create-account',
    'verify-otp',
    'analyzing-merchant',
    'merchant-verified',
    'scam-detected',
    'receipt-light',
    'receipt-dark',
    'cancel-success',
    'your-win'
  ].includes(currentScreen);

  if (isImmersive) {
    backgroundClass = 'bg-transparent';
    opacityClass = 'opacity-90';
  } else {
    backgroundClass = 'bg-slate-950/85 border-b border-slate-800/30';
  }

  switch (currentScreen) {
    case 'splash':
      opacityClass = 'opacity-50';
      accentIcon = <Shield className="w-3 h-3 text-sky-400 animate-pulse" />;
      break;

    case 'home':
      accentIcon = (
        <span className="flex items-center space-x-1 text-[8px] text-emerald-400 font-extrabold font-mono bg-emerald-500/10 px-1.5 py-0.5 rounded-full border border-emerald-500/15">
          <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
          <span>SHIELD ON</span>
        </span>
      );
      break;

    case 'scam-detected':
      textClass = 'text-red-100';
      backgroundClass = 'bg-red-950/40 border-b border-red-900/30';
      accentIcon = <ShieldAlert className="w-3 h-3 text-red-500 animate-ping" />;
      customBadge = (
        <span className="text-[7px] bg-red-500 text-white font-extrabold px-1.5 py-0.5 rounded animate-pulse">
          RISK
        </span>
      );
      break;

    case 'analyzing-merchant':
      accentIcon = (
        <span className="flex items-center space-x-1 text-[7px] text-sky-400 font-extrabold bg-sky-500/10 px-1.5 py-0.5 rounded-full border border-sky-500/15 animate-pulse">
          <Scan className="w-2.5 h-2.5" />
          <span>SCANNING</span>
        </span>
      );
      break;

    case 'merchant-verified':
      accentIcon = (
        <span className="flex items-center space-x-1 text-[8px] text-emerald-400 font-extrabold font-mono bg-emerald-500/10 px-1.5 py-0.5 rounded-full border border-emerald-500/15">
          <span>VERIFIED</span>
        </span>
      );
      break;

    case 'vault':
      accentIcon = (
        <span className="flex items-center space-x-0.5 text-[8px] text-purple-400 font-bold bg-purple-500/10 px-1.5 py-0.5 rounded border border-purple-500/15">
          <Lock className="w-2.5 h-2.5 text-purple-400" />
          <span>SECURE</span>
        </span>
      );
      break;

    case 'receipt-light':
      textClass = 'text-emerald-400';
      backgroundClass = 'bg-transparent';
      break;

    case 'receipt-dark':
      textClass = 'text-emerald-400';
      backgroundClass = 'bg-transparent';
      break;

    case 'offline':
      textClass = 'text-amber-100';
      backgroundClass = 'bg-amber-950/40 border-b border-amber-900/30';
      accentIcon = <AlertTriangle className="w-3 h-3 text-amber-500" />;
      break;

    case 'emergency':
      textClass = 'text-red-100';
      backgroundClass = 'bg-red-950/30 border-b border-red-900/20';
      break;

    case 'freeze-accounts-confirm':
      textClass = 'text-red-200';
      backgroundClass = 'bg-red-950/30 border-b border-red-900/20';
      break;

    case 'delete-account-confirm':
      textClass = 'text-slate-400';
      opacityClass = 'opacity-60';
      break;
  }

  if (textClass === 'text-slate-300') {
    textClass = 'text-white/90';
  }

  return (
    <div className={`shrink-0 w-full h-11 flex items-center justify-center select-none transition-all duration-300 ${opacityClass} ${backgroundClass} ${textClass}`}>
      {accentIcon && (
        <div className="flex items-center justify-center">
          {accentIcon}
        </div>
      )}
      {customBadge && (
        <div className="absolute right-4 top-0 h-11 flex items-center">
          {customBadge}
        </div>
      )}
    </div>
  );
}
