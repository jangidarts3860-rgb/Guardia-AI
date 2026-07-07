import React, { useEffect, useState } from 'react';
import { Wifi, Battery, Signal, Shield, ShieldAlert, Lock, AlertTriangle, EyeOff } from 'lucide-react';
import { ScreenId } from '../../types';

interface StatusBarOverlayProps {
  currentScreen: ScreenId;
  isOffline: boolean;
  isLightMode: boolean;
}

export default function StatusBarOverlay({ currentScreen, isOffline, isLightMode }: StatusBarOverlayProps) {
  const [time, setTime] = useState('09:41');

  useEffect(() => {
    // Keep local time formatted nicely
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      let minutes = now.getMinutes();
      const formattedHours = hours < 10 ? `0${hours}` : hours;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      setTime(`${formattedHours}:${formattedMinutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  // Determine styles and configurations based on active screen state
  let opacityClass = 'opacity-100';
  let backgroundClass = 'bg-slate-950/40 backdrop-blur-sm';
  let textClass = 'text-slate-300';
  let accentIcon: React.ReactNode = null;
  let customBadge: React.ReactNode = null;

  // Immersive screens with transparent status bars
  const isImmersive = [
    'splash',
    'onboarding',
    'permissions',
    'create-account',
    'verify-otp',
    'welcome-back',
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
    backgroundClass = 'bg-slate-950/85 border-b border-slate-900/40 backdrop-blur-md';
  }

  // Handle specific screen configurations
  switch (currentScreen) {
    case 'splash':
      opacityClass = 'opacity-50';
      accentIcon = <Shield className="w-3 h-3 text-sky-400 animate-pulse" />;
      break;

    case 'home':
      accentIcon = (
        <span className="flex items-center space-x-1 text-[8px] text-emerald-400 font-extrabold font-mono bg-emerald-500/10 px-1.5 py-0.5 rounded-full border border-emerald-500/10">
          <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
          <span>SHIELD ON</span>
        </span>
      );
      break;

    case 'scam-detected':
      textClass = 'text-red-100';
      backgroundClass = 'bg-red-950/30 backdrop-blur-sm';
      accentIcon = <ShieldAlert className="w-3 h-3 text-red-500 animate-ping" />;
      customBadge = (
        <span className="text-[7px] bg-red-500 text-white font-extrabold px-1 rounded animate-pulse">
          RISK
        </span>
      );
      break;

    case 'analyzing-merchant':
      accentIcon = (
        <span className="flex items-center space-x-1 text-[7px] text-sky-400 font-extrabold bg-sky-500/10 px-1.5 py-0.5 rounded-full animate-pulse">
          <span>SCANNING</span>
        </span>
      );
      break;

    case 'vault':
      accentIcon = (
        <span className="flex items-center space-x-0.5 text-[8px] text-purple-400 font-bold bg-purple-500/10 px-1 py-0.5 rounded">
          <Lock className="w-2.5 h-2.5 text-purple-400" />
          <span>SECURE</span>
        </span>
      );
      break;

    case 'receipt-light':
      textClass = 'text-emerald-950';
      backgroundClass = 'bg-transparent';
      break;

    case 'receipt-dark':
      textClass = 'text-emerald-400';
      backgroundClass = 'bg-transparent';
      break;

    case 'offline':
      textClass = 'text-amber-100';
      backgroundClass = 'bg-amber-950/30 backdrop-blur-sm';
      accentIcon = <AlertTriangle className="w-3 h-3 text-amber-500" />;
      break;
      
    case 'delete-account-confirm':
    case 'freeze-accounts-confirm':
      textClass = 'text-slate-400';
      opacityClass = 'opacity-60';
      break;
  }

  // Force strict light/dark override for receipts
  if (isLightMode || (currentScreen as string) === 'receipt-light') {
    textClass = 'text-gray-900';
  } else if (!isLightMode && (currentScreen as string) !== 'receipt-light') {
    if (textClass === 'text-slate-300') {
      textClass = 'text-white/90';
    }
  }

  return (
    <div 
      className={`absolute top-0 inset-x-0 h-10 px-6 pt-1.5 flex justify-between items-center z-40 text-[11px] font-bold select-none transition-all duration-300 ${opacityClass} ${backgroundClass} ${textClass}`}
    >
      <div className="flex items-center space-x-2">
        <span className="font-sans font-black tracking-tight">{time}</span>
        {accentIcon}
      </div>

      {/* Center notch spacing buffer */}
      <div className="w-16 h-3" />

      <div className="flex items-center space-x-1.5">
        {customBadge}
        <Signal className="w-3.5 h-3.5" />
        {isOffline ? (
          <span className="text-[8px] bg-red-500/20 text-red-500 px-1 py-0.5 rounded font-bold uppercase tracking-wide border border-red-500/20">
            Offline
          </span>
        ) : (
          <Wifi className="w-3.5 h-3.5" />
        )}
        <div className="flex items-center space-x-0.5">
          <Battery className="w-4 h-4 rotate-180 opacity-90" />
          <span className="text-[9px] font-sans font-bold">94%</span>
        </div>
      </div>
    </div>
  );
}
