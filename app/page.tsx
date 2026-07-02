'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Shield } from 'lucide-react'
import MobileFrame from '@/components/MobileFrame'

export default function SplashPage() {
  const router = useRouter()
  const [pulseCount, setPulseCount] = useState(0)

  useEffect(() => {
    // Check onboarding status and redirect after 2.5s
    const timer = setTimeout(() => {
      const onboarded = localStorage.getItem('guardia_onboarded')
      if (onboarded === 'true') {
        router.push('/home')
      } else {
        router.push('/login')
      }
    }, 2800)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <MobileFrame>
      <div className="relative px-5 flex flex-col items-center justify-center text-slate-100 min-h-full select-none bg-[#0C0C0C]">
        
        {/* Decorative Grid backdrop */}
        <div className="absolute inset-0 animate-grid-scroll pointer-events-none" />

        {/* Pulsing AI shield logo */}
        <div className="relative flex items-center justify-center">
          
          {/* Animated Glow backlights */}
          <div className="absolute w-36 h-36 rounded-full bg-gradient-to-tr from-[#8537FD] to-[#E837FD] blur-[60px] opacity-40 animate-[pulse_1.5s_infinite]" />
          
          {/* Outer rotating dots */}
          <div className="absolute w-28 h-28 rounded-full border border-dashed border-[#8537FD]/30 animate-[spin_8s_linear_infinite]" />
          
          {/* Core Shield Wrapper */}
          <div className="relative w-20 h-20 rounded-[24px] bg-[#181818] border border-white/10 flex items-center justify-center shadow-[0_0_32px_rgba(133,55,253,0.35)] animate-[bounce_2s_infinite]">
            <Shield size={38} className="text-[#AFFD37]" />
          </div>
        </div>

        {/* Brand Text */}
        <div className="mt-8 text-center animate-pulse">
          <h1 className="text-xl font-black text-white tracking-tight flex items-center justify-center gap-1">
            <span>🛡️</span>
            <span>Guardia AI</span>
          </h1>
          <p className="text-[10px] text-[#8537FD] font-extrabold uppercase tracking-[0.25em] mt-1.5">
            Your Financial Bodyguard
          </p>
        </div>

        {/* Compliance details */}
        <div className="absolute bottom-10 text-center text-[8px] text-slate-600 font-bold uppercase tracking-wider">
          <span>RBI e-Mandate Compliant · On-Device AI</span>
        </div>

      </div>
    </MobileFrame>
  )
}
