import React from 'react';
import { ScreenId } from '../../types';
import StatusBarOverlay from './StatusBarOverlay';
import GuardiaLogo from '../ui/GuardiaLogo';

interface PhoneSimulatorProps {
  children: React.ReactNode;
  isOffline: boolean;
  isLightMode: boolean;
  currentScreen?: ScreenId;
}

export default function PhoneSimulator({ children, isOffline, isLightMode, currentScreen = 'splash' }: PhoneSimulatorProps) {
  return (
    <div className="relative mx-auto flex items-center justify-center p-4">
      {/* Phone Frame wrapper */}
      <div className="relative w-[375px] h-[780px] rounded-[52px] border-[10px] border-slate-900 bg-slate-950 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden ring-4 ring-slate-800/50">
        
        {/* Dynamic Island / Camera Notch — Guardia logo ke saath */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-50 flex items-center justify-between px-2.5 transition-all hover:w-36">
          <div className="w-2.5 h-2.5 bg-zinc-900 rounded-full border border-zinc-800/80" />
          <div className="flex space-x-1.5 items-center">
            {/* Mini shield logo in dynamic island */}
            <GuardiaLogo size={14} variant="icon" animated={true} />
            <span className="text-[7px] text-cyan-400 font-bold font-mono">Shield ON</span>
          </div>
        </div>

        {/* Dynamic Status Bar Overlay */}
        <StatusBarOverlay 
          currentScreen={currentScreen} 
          isOffline={isOffline} 
          isLightMode={isLightMode} 
        />

        {/* Screen Content Window */}
        <div className="flex-1 pt-10 pb-4 overflow-hidden relative flex flex-col">
          {children}
        </div>

        {/* iPhone bottom home bar pill */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-neutral-800 rounded-full z-40 pointer-events-none" />
      </div>
    </div>
  );
}
