import React from 'react';
import { ScreenId } from '../../types';
import StatusBarOverlay from './StatusBarOverlay';
import GuardiaLogo from '../ui/GuardiaLogo';

interface PhoneSimulatorProps {
  children: React.ReactNode;
  bottomNav?: React.ReactNode;
  isOffline: boolean;
  currentScreen?: ScreenId;
}

const screenGlowMap: Record<string, string> = {
  home: 'shadow-[0_0_80px_-20px_rgba(14,165,233,0.15)]',
  'scan-qr': 'shadow-[0_0_80px_-20px_rgba(14,165,233,0.2)]',
  'analyzing-merchant': 'shadow-[0_0_80px_-20px_rgba(99,102,241,0.2)]',
  'merchant-verified': 'shadow-[0_0_80px_-20px_rgba(34,197,94,0.15)]',
  'scam-detected': 'shadow-[0_0_80px_-20px_rgba(239,68,68,0.25)]',
  vault: 'shadow-[0_0_80px_-20px_rgba(168,85,247,0.15)]',
  emergency: 'shadow-[0_0_80px_-20px_rgba(239,68,68,0.2)]',
  'cancel-success': 'shadow-[0_0_80px_-20px_rgba(34,197,94,0.15)]',
  'receipt-light': 'shadow-[0_0_80px_-20px_rgba(16,185,129,0.12)]',
  'receipt-dark': 'shadow-[0_0_80px_-20px_rgba(16,185,129,0.12)]',
  'freeze-accounts-confirm': 'shadow-[0_0_80px_-20px_rgba(239,68,68,0.2)]',
  splash: 'shadow-[0_0_100px_-20px_rgba(14,165,233,0.25)]',
  onboarding: 'shadow-[0_0_80px_-20px_rgba(99,102,241,0.15)]',
};

export default function PhoneSimulator({ children, bottomNav, isOffline, currentScreen = 'splash' }: PhoneSimulatorProps) {
  const glowClass = screenGlowMap[currentScreen] || 'shadow-[0_0_60px_-15px_rgba(14,165,233,0.1)]';

  return (
    <div className="relative mx-auto flex items-center justify-center p-0 md:p-4 w-full h-full md:w-auto md:h-auto">
      {/* Ambient glow behind phone */}
      <div className={`absolute inset-0 hidden md:block pointer-events-none transition-all duration-1000 ${glowClass} rounded-[52px] blur-xl`} aria-hidden="true" />

      {/* Phone Frame */}
      <div id="phone-simulator-frame" className="relative w-full h-full md:w-[375px] md:h-[780px] md:rounded-[52px] md:border-[10px] md:border-slate-900/90 bg-slate-950 md:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_1px_0_rgba(148,163,184,0.1)] flex flex-col overflow-hidden md:ring-1 md:ring-slate-700/30">
        <div id="phone-viewport" className="w-full h-full flex flex-col relative bg-slate-950 overflow-hidden md:rounded-[42px]">
          {/* Dynamic Island / Camera Notch */}
          <div className="hidden md:flex absolute top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-50 items-center justify-between px-2.5 transition-all hover:w-36 shadow-lg shadow-black/50">
            <div className="w-2.5 h-2.5 bg-zinc-900 rounded-full border border-zinc-800/80" />
            <div className="flex space-x-1.5 items-center">
              <GuardiaLogo size={14} variant="icon" animated={true} />
              <span className="text-[7px] text-cyan-400 font-bold font-mono">Shield ON</span>
            </div>
          </div>

          {/* Status Bar */}
          <StatusBarOverlay 
            currentScreen={currentScreen} 
            isOffline={isOffline} 
          />

          {/* Screen Content Window */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden relative flex flex-col overscroll-behavior-contain" style={{ overscrollBehavior: 'contain' }}>
            {children}
          </div>

          {/* Bottom Navigation */}
          {bottomNav && (
            <div className="shrink-0 z-50">
              {bottomNav}
            </div>
          )}

          {/* iPhone bottom home bar pill */}
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-neutral-800/80 rounded-full z-40 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
