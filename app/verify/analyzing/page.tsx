'use client'

import React, { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Shield } from 'lucide-react'
import MobileFrame from '@/components/MobileFrame'

function AnalyzingContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const type = searchParams.get('type') || 'safe'
  const payload = searchParams.get('payload') || 'Unknown Source'

  const [statusIndex, setStatusIndex] = useState(0)
  const statusTexts = [
    'Deconstructing URL payload...',
    'Querying RBI centralized scam database...',
    'Analyzing domain creation age...',
    'Evaluating merchant trust signals...',
    'Calculating security index score...'
  ]

  useEffect(() => {
    // Cycle text updates
    const textInterval = setInterval(() => {
      setStatusIndex((prev) => (prev < statusTexts.length - 1 ? prev + 1 : prev))
    }, 900)

    // Complete scan after 4.5s and redirect to outcome screen
    const redirectTimer = setTimeout(() => {
      if (type === 'scam') {
        router.push(`/verify/red-alert?payload=${encodeURIComponent(payload)}`)
      } else {
        router.push(`/verify/green-alert?payload=${encodeURIComponent(payload)}`)
      }
    }, 4500)

    return () => {
      clearInterval(textInterval)
      clearTimeout(redirectTimer)
    }
  }, [type, payload, router])

  return (
    <MobileFrame>
      <div className="relative px-5 pt-5 pb-28 flex flex-col items-center justify-center text-slate-100 min-h-full select-none bg-[#0C0C0C]">
        
        {/* Subtle grid mesh background */}
        <div className="absolute inset-0 animate-grid-scroll pointer-events-none" />

        {/* Animated AI Engine Graphic */}
        <div className="relative flex items-center justify-center">
          {/* Rotating Outer Radar Rings (Frentix Violet Glow) */}
          <div className="absolute w-44 h-44 rounded-full border border-[#8537FD]/20 animate-[spin_10s_linear_infinite]" />
          <div className="absolute w-36 h-36 rounded-full border border-dashed border-[#E837FD]/30 animate-[spin_6s_linear_infinite_reverse]" />
          
          {/* Pulse Halo Glow Backlight */}
          <div className="absolute w-24 h-24 rounded-full bg-gradient-to-tr from-[#8537FD] to-[#E837FD] blur-[40px] opacity-40 animate-pulse" />

          {/* Central Logo Container */}
          <div className="relative w-24 h-24 rounded-full bg-[#181818] border border-white/10 flex items-center justify-center shadow-[0_0_24px_rgba(133,55,253,0.2)] animate-[bounce_2s_infinite]">
            <Shield size={40} className="text-[#AFFD37]" />
          </div>
        </div>

        {/* Dynamic Analyzing Headers */}
        <div className="mt-12 text-center z-10 relative">
          <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#8537FD] animate-pulse">
            Guardia Engine v4
          </span>
          <h2 className="text-xl font-bold text-white mt-1.5 tracking-tight">
            AI Analyzing Security
          </h2>
          <p className="text-xs text-slate-400 max-w-[280px] mx-auto mt-2 truncate font-mono bg-[#181818] px-3 py-1 rounded-lg border border-white/5">
            {payload}
          </p>
        </div>

        {/* Cycling Status Indicators */}
        <div className="mt-10 w-full max-w-[280px] flex flex-col gap-3.5 z-10 relative">
          <div className="flex items-center justify-between text-[10px] text-slate-500 font-bold uppercase tracking-wider px-1">
            <span>Security Checklist</span>
            <span className="text-[#8537FD]">Checking...</span>
          </div>

          <div className="h-10 flex items-center justify-center bg-[#181818] rounded-xl border border-white/5 px-4">
            <span className="text-xs font-semibold text-[#AFFD37] text-center animate-pulse">
              {statusTexts[statusIndex]}
            </span>
          </div>

          {/* Progress dots */}
          <div className="flex justify-center gap-1.5 mt-2">
            {statusTexts.map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === statusIndex ? 'w-5 bg-[#AFFD37]' : 'w-1.5 bg-[#181818] border border-white/5'
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </MobileFrame>
  )
}

export default function AIAnalyzing() {
  return (
    <Suspense fallback={
      <MobileFrame>
        <div className="relative px-5 pt-5 pb-28 flex flex-col items-center justify-center text-slate-100 min-h-full select-none bg-[#0C0C0C]">
          <span className="text-xs font-bold text-[#8537FD] animate-pulse">Initializing Engine...</span>
        </div>
      </MobileFrame>
    }>
      <AnalyzingContent />
    </Suspense>
  )
}
