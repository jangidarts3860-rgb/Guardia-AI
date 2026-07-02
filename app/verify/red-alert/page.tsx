'use client'

import React, { Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ShieldAlert, AlertTriangle, ArrowLeft, PhoneCall } from 'lucide-react'
import MobileFrame from '@/components/MobileFrame'

function RedAlertContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const payload = searchParams.get('payload') || 'verify.kyc-update.com/electricity-bill'

  return (
    <MobileFrame>
      <div className="relative px-5 pt-5 pb-28 flex flex-col text-slate-100 min-h-full select-none bg-[#100303]">
        
        {/* Strong Red Ambient Warning Glow (Cyberpunk theme) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] h-[30%] rounded-full bg-red-600/10 blur-[90px] pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between mt-2 z-10 relative">
          <button 
            onClick={() => router.push('/verify')}
            className="w-10 h-10 rounded-full bg-red-950/20 border border-red-500/10 flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
          >
            <ArrowLeft size={18} className="text-red-400" />
          </button>
          <span className="text-xs font-bold uppercase tracking-wider text-red-400/80">Threat Intercepted</span>
          <div className="w-10 h-10" /> {/* Spacer */}
        </div>

        {/* Warning Indicator & Trust Score (Frentix style) */}
        <div className="mt-8 flex flex-col items-center z-10 relative">
          <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 shadow-[0_0_24px_rgba(239,68,68,0.15)] animate-pulse">
            <ShieldAlert size={40} />
          </div>
          
          <h2 className="text-xl font-bold text-white mt-5 tracking-tight text-center">
            DO NOT PAY
          </h2>
          <p className="text-xs text-red-400 mt-1 font-medium text-center max-w-[240px] leading-normal">
            This payment request has high fraud indicators.
          </p>
        </div>

        {/* Trust Score Ring Indicator */}
        <div className="mt-6 bg-[#181818] rounded-[24px] p-5 border border-red-500/10 z-10 relative">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Security Index</span>
            <span className="text-[10px] font-bold text-[#E837FD] bg-[#E837FD]/5 px-2 py-0.5 rounded border border-[#E837FD]/15">High Risk</span>
          </div>

          <div className="mt-4 flex items-center justify-between gap-4">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-red-500 font-mono">12</span>
              <span className="text-slate-500 text-sm font-bold">/100</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-normal max-w-[170px]">
              RBI security checks flagged this source as matching known scam vectors.
            </p>
          </div>
        </div>

        {/* Flag Details Card (Bento List) */}
        <div className="mt-3.5 bg-[#181818] rounded-[24px] p-5 border border-white/5 z-10 relative flex flex-col gap-3.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Scan Metadata</span>

          <div className="flex flex-col gap-2.5">
            {/* Flag item 1 */}
            <div className="flex items-start gap-2.5">
              <AlertTriangle size={14} className="text-red-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-white">Domain Created: 2h ago</span>
                <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">
                  The domain {payload} was registered recently today.
                </p>
              </div>
            </div>

            {/* Flag item 2 */}
            <div className="flex items-start gap-2.5">
              <AlertTriangle size={14} className="text-red-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-white">Active Reports: 47 Flags</span>
                <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">
                  47 users reported this source for utility bill fraud.
                </p>
              </div>
            </div>

            {/* Flag item 3 */}
            <div className="flex items-start gap-2.5">
              <AlertTriangle size={14} className="text-red-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-white">Unverified Gateway</span>
                <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">
                  Matches standard phishing patterns for Indian electricity consumers.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-6 flex flex-col gap-3 z-10 relative">
          {/* Main Action: Block & Report */}
          <button
            onClick={() => {
              alert('Merchant reported and blocked in bank feeds.')
              router.push('/home')
            }}
            className="w-full h-12 rounded-full bg-gradient-to-r from-red-600 to-red-500 text-white text-xs font-bold shadow-[0_8px_20px_rgba(220,38,38,0.25)] hover:shadow-[0_8px_24px_rgba(220,38,38,0.35)] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>Block & Report Merchant</span>
          </button>

          {/* Action 2: SOS Helpline */}
          <button
            onClick={() => window.open('tel:1930')}
            className="w-full h-11 rounded-full border border-red-500/20 hover:bg-red-500/5 text-xs font-bold text-red-400 transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-1.5"
          >
            <PhoneCall size={14} />
            <span>Call 1930 Cyber Helpline</span>
          </button>

          {/* Proceed anyway link (very faded) */}
          <button
            onClick={() => {
              if (confirm('WARNING: Paying unknown links can lead to wallet draining. Proceed?')) {
                router.push('/home')
              }
            }}
            className="mt-2 text-[10px] text-slate-500 hover:text-slate-400 underline transition-all w-fit mx-auto cursor-pointer"
          >
            I trust this merchant, proceed anyway
          </button>
        </div>

      </div>
    </MobileFrame>
  )
}

export default function RedAlert() {
  return (
    <Suspense fallback={
      <MobileFrame>
        <div className="relative px-5 pt-5 pb-28 flex flex-col items-center justify-center text-slate-100 min-h-full select-none bg-[#100303]">
          <span className="text-xs font-bold text-red-400 animate-pulse">Loading Threat Details...</span>
        </div>
      </MobileFrame>
    }>
      <RedAlertContent />
    </Suspense>
  )
}
