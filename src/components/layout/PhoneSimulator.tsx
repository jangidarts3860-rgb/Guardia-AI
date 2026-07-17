import React from 'react';
import { ScreenId } from '../../types';
import StatusBarOverlay from './StatusBarOverlay';
import GuardiaLogo from '../ui/GuardiaLogo';
import { getGlowColors, getOuterShadow } from '../../constants/glowConfig';

interface PhoneSimulatorProps {
  children: React.ReactNode;
  bottomNav?: React.ReactNode;
  isOffline: boolean;
  currentScreen?: ScreenId;
}

export default function PhoneSimulator({ children, bottomNav, isOffline, currentScreen = 'splash' }: PhoneSimulatorProps) {
  const colors = getGlowColors(currentScreen);
  const outerShadow = getOuterShadow(currentScreen);

  return (
    <div className="relative mx-auto flex items-center justify-center p-0 md:p-4 w-full h-full md:w-auto md:h-auto">
      {/* Ambient glow behind phone */}
      <div
        className="absolute inset-0 hidden md:block pointer-events-none transition-all duration-1000 rounded-[52px] blur-xl will-change-transform will-change-filter"
        style={{ boxShadow: outerShadow }}
        aria-hidden="true"
      />

      {/* Phone Frame */}
      <div id="phone-simulator-frame" className="relative w-full h-full md:w-[375px] md:h-[780px] md:rounded-[52px] md:border-[10px] md:border-slate-900/90 bg-slate-950 md:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_1px_0_rgba(148,163,184,0.1)] flex flex-col overflow-hidden md:ring-1 md:ring-slate-700/30">
        <div id="phone-viewport" className="w-full h-full flex flex-col relative transform-gpu bg-[#020617] overflow-hidden md:rounded-[42px] isolate">
          {/* Ambient Reference-Style Glows (Deep & Visible — Per-Screen Adaptive) */}
          <div className="absolute top-[-10%] left-[-20%] w-[120%] h-[60%] rounded-full blur-[80px] pointer-events-none z-0 mix-blend-screen animate-blob transform-gpu will-change-transform will-change-filter" style={{ background: colors.blob1 }} aria-hidden="true" />
          <div className="absolute top-[10%] right-[-20%] w-[80%] h-[50%] rounded-full blur-[80px] pointer-events-none z-0 mix-blend-screen animate-blob-reverse transform-gpu will-change-transform will-change-filter" style={{ background: colors.blob2 }} aria-hidden="true" />
          <div className="absolute bottom-[-8%] left-[25%] w-[60%] h-[35%] rounded-full blur-[70px] pointer-events-none z-0 mix-blend-screen animate-blob transform-gpu will-change-transform will-change-filter" style={{ background: colors.blob3, animationDelay: '-8s' }} aria-hidden="true" />
          <div className="absolute inset-0 bg-[#020617]/20 pointer-events-none z-[1]" aria-hidden="true" /> {/* Dark overlay ensures text contrast */}
          <div className="absolute inset-0 pointer-events-none z-[2] opacity-[0.025]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat', backgroundSize: '192px 192px' }} aria-hidden="true" />
          {/* Dynamic Island / Camera Notch */}
          <div className="hidden md:flex absolute top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-50 items-center justify-between px-2.5 transition-all hover:w-36 shadow-lg shadow-black/50" aria-hidden="true">
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
            <div className="absolute bottom-0 left-0 right-0 z-50 pointer-events-none">
              <div className="pointer-events-auto">
                {bottomNav}
              </div>
            </div>
          )}

          {/* iPhone bottom home bar pill */}
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-neutral-500/50 rounded-full z-[60] pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
