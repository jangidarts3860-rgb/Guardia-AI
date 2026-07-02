'use client'

import React, { useState } from 'react'
import { Smartphone, Sparkles } from 'lucide-react'

interface MobileFrameProps {
  children: React.ReactNode
}

export default function MobileFrame({ children }: MobileFrameProps) {
  const [isFullScreen, setIsFullScreen] = useState(false)
  const time = '9:41'

  if (isFullScreen) {
    return (
      <div className="relative min-h-screen w-full bg-[#030712] text-white overflow-x-hidden">
        {/* Toggle Button for Full Screen */}
        <button
          onClick={() => setIsFullScreen(false)}
          className="fixed top-4 right-4 z-50 flex items-center gap-2 px-3.5 h-10 rounded-full bg-slate-900/90 border border-white/10 backdrop-blur-xl text-xs font-semibold text-slate-200 hover:text-white transition-all shadow-lg shadow-[#00F2FE]/5 active:scale-95 cursor-pointer"
          title="Show Device Mockup"
        >
          <Smartphone size={14} className="text-[#38BDF8]" />
          <span>Device Mockup</span>
        </button>
        {children}
      </div>
    )
  }

  return (
    <div className="relative min-h-screen w-full bg-[#030712] flex flex-col items-center justify-center p-4 font-sans select-none antialiased overflow-hidden">
      {/* High-End Ambient Glowing Orbs in the background (Behance style) */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[50%] rounded-full bg-gradient-to-br from-[#38BDF8]/10 to-transparent blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[50%] rounded-full bg-gradient-to-tr from-[#10B981]/8 to-transparent blur-[140px] pointer-events-none" />
      <div className="absolute top-[30%] right-[10%] w-[350px] h-[350px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />

      {/* Floating Toggle on Desktop View */}
      <button
        onClick={() => setIsFullScreen(true)}
        className="absolute top-6 right-6 z-40 flex items-center gap-2 px-4 h-9 rounded-full bg-slate-900/60 border border-white/5 backdrop-blur-md text-xs font-semibold text-slate-300 hover:text-white transition-all active:scale-95 cursor-pointer shadow-xl hover:border-[#38BDF8]/30"
      >
        <Sparkles size={12} className="text-[#38BDF8]" />
        <span>Full Screen Preview</span>
      </button>

      {/* Phone Chassis - iPhone 15 Pro Matte Black Look */}
      <div className="relative w-[408px] h-[860px] bg-[#0c111d] rounded-[56px] p-[10px] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.95)] border-[5px] border-[#1e293b] flex items-center justify-center overflow-hidden">
        {/* Subtle Matte Reflection lines */}
        <div className="absolute inset-0 border border-white/5 rounded-[50px] pointer-events-none z-40" />

        {/* Dynamic Island / Notch */}
        <div className="w-[110px] h-[28px] bg-black rounded-full absolute left-1/2 -translate-x-1/2 top-4.5 flex items-center justify-end px-3 z-50">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-950 border border-slate-900" />
        </div>

        {/* Viewport Screen Area (Exact iPhone 15 viewport: 390x844px) */}
        <div className="relative w-[388px] h-[840px] bg-[#070a13] rounded-[46px] overflow-hidden flex flex-col select-text border border-white/5">
          
          {/* iOS Status Bar */}
          <div className="absolute top-0 left-0 right-0 h-14 px-7 flex items-center justify-between z-40 bg-transparent pointer-events-none select-none text-white">
            <span className="text-[13px] font-bold tracking-tight">{time}</span>

            {/* Status Icons */}
            <div className="flex items-center gap-1.5">
              {/* Signal */}
              <svg className="w-[17px] h-[11px]" viewBox="0 0 17 11" fill="currentColor">
                <rect x="0" y="8" width="2.5" height="3" rx="0.5" />
                <rect x="4" y="6" width="2.5" height="5" rx="0.5" />
                <rect x="8" y="4" width="2.5" height="7" rx="0.5" />
                <rect x="12" y="1" width="2.5" height="10" rx="0.5" />
              </svg>
              {/* Wifi */}
              <svg className="w-[16px] h-[11px]" viewBox="0 0 16 11" fill="currentColor">
                <path d="M8 11a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm-3.8-3.8A5.3 5.3 0 0 1 8 5.7c1.5 0 2.9.6 3.8 1.5.3.3.7.3 1 0l.5-.5c.3-.3.3-.7 0-1a7.2 7.2 0 0 0-10.6 0c-.3.3-.3.7 0 1l.5.5c.3.3.7.3 1 0Zm-3.5-3.5A10.3 10.3 0 0 1 8 1c2.8 0 5.4 1.1 7.3 3a.9.9 0 0 0 1.2 0l.5-.5a.9.9 0 0 0 0-1.2A12.3 12.3 0 0 0 .7 2.3c-.3.3-.3.9 0 1.2l.5.5a.9.9 0 0 0 1.3 0Z" />
              </svg>
              {/* Battery */}
              <div className="w-[22px] h-[11px] border border-white/80 rounded-[3px] p-[1.5px] flex items-center justify-start">
                <div className="h-full w-[85%] bg-white rounded-[1.2px]" />
              </div>
            </div>
          </div>

          {/* Child content viewport (rendered inside the mobile layout) */}
          <div className="flex-1 w-full h-full pt-14 pb-8 overflow-y-auto overflow-x-hidden scrollbar-none bg-[#070A13]">
            {children}
          </div>

          {/* iOS Bottom Home Indicator */}
          <div className="absolute bottom-2 left-0 right-0 h-2 flex items-center justify-center z-40 bg-transparent pointer-events-none select-none">
            <div className="w-[130px] h-[4px] bg-white rounded-full opacity-40" />
          </div>

        </div>
      </div>
    </div>
  )
}
