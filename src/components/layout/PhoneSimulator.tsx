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
      {/* Clean Screen Container for Case Study */}
      <div id="phone-simulator-frame" className="relative w-full h-full md:w-[390px] md:h-[844px] bg-slate-950 flex flex-col overflow-hidden">
        <div id="phone-viewport" className="w-full h-full flex flex-col relative transform-gpu bg-[#020617] overflow-hidden isolate">
          {/* Ambient Reference-Style Glows (Deep & Visible — Per-Screen Adaptive) */}
          <div className="absolute top-[-10%] left-[-20%] w-[120%] h-[60%] rounded-full blur-[80px] pointer-events-none z-0 mix-blend-screen animate-blob transform-gpu will-change-transform will-change-filter" style={{ background: colors.blob1 }} aria-hidden="true" />
          <div className="absolute top-[10%] right-[-20%] w-[80%] h-[50%] rounded-full blur-[80px] pointer-events-none z-0 mix-blend-screen animate-blob-reverse transform-gpu will-change-transform will-change-filter" style={{ background: colors.blob2 }} aria-hidden="true" />
          <div className="absolute bottom-[-8%] left-[25%] w-[60%] h-[35%] rounded-full blur-[70px] pointer-events-none z-0 mix-blend-screen animate-blob transform-gpu will-change-transform will-change-filter" style={{ background: colors.blob3, animationDelay: '-8s' }} aria-hidden="true" />
          <div className="absolute inset-0 bg-[#020617]/20 pointer-events-none z-[1]" aria-hidden="true" /> {/* Dark overlay ensures text contrast */}
          <div className="absolute inset-0 pointer-events-none z-[2] opacity-[0.025]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat', backgroundSize: '192px 192px' }} aria-hidden="true" />

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
        </div>
      </div>
    </div>
  );
}
