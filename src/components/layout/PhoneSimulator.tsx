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

export default function PhoneSimulator({ children, bottomNav, isOffline, currentScreen = 'splash' }: PhoneSimulatorProps) {
  return (
    <div className="relative mx-auto flex items-center justify-center p-0 md:p-4 w-full h-full md:w-auto md:h-auto">
      {/* Phone Frame wrapper */}
      <div id="phone-simulator-frame" className="relative w-full h-full md:w-[375px] md:h-[780px] md:rounded-[52px] md:border-[10px] md:border-slate-900 bg-slate-950 md:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden md:ring-4 md:ring-slate-800/50">
        <div id="phone-viewport" className="w-full h-full flex flex-col relative bg-slate-950 overflow-hidden md:rounded-[42px]">
          {/* Dynamic Island / Camera Notch — Guardia logo ke saath (Hidden on mobile) */}
          <div className="hidden md:flex absolute top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-50 items-center justify-between px-2.5 transition-all hover:w-36">
            <div className="w-2.5 h-2.5 bg-zinc-900 rounded-full border border-zinc-800/80" />
            <div className="flex space-x-1.5 items-center">
              {/* Mini shield logo in dynamic island */}
              <GuardiaLogo size={14} variant="icon" animated={true} />
              <span className="text-[7px] text-cyan-400 font-bold font-mono">Shield ON</span>
            </div>
          </div>

          {/* Status Bar — in flow (not absolute) so scroll container starts naturally below it */}
          <StatusBarOverlay 
            currentScreen={currentScreen} 
            isOffline={isOffline} 
          />

          {/* Screen Content Window — no pt-* needed, status bar is in flow above */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden relative flex flex-col overscroll-behavior-contain" style={{ overscrollBehavior: 'contain' }}>
            {children}
          </div>

          {/* Bottom Navigation - fixed below scroll, above home bar */}
          {bottomNav && (
            <div className="shrink-0 z-50">
              {bottomNav}
            </div>
          )}

          {/* iPhone bottom home bar pill */}
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-neutral-800 rounded-full z-40 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
