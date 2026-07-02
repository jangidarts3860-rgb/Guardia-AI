'use client'

import React, { Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { CheckCircle2, ShieldCheck, ArrowLeft, ArrowUpRight } from 'lucide-react'
import MobileFrame from '@/components/MobileFrame'

function GreenAlertContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const payload = searchParams.get('payload') || 'pay.swiggy-instamart.in/order-38291'

  return (
    <MobileFrame>
      <div className="relative px-5 pt-5 pb-28 flex flex-col text-slate-100 min-h-full select-none bg-[#030A05]">
        
        {/* Soft Emerald/Green Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] h-[30%] rounded-full bg-emerald-600/10 blur-[90px] pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between mt-2 z-10 relative">
          <button 
            onClick={() => router.push('/verify')}
            className="w-10 h-10 rounded-full bg-emerald-950/20 border border-emerald-500/10 flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
          >
            <ArrowLeft size={18} className="text-emerald-400" />
          </button>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400/80">Source Verified</span>
          <div className="w-10 h-10" /> {/* Spacer */}
        </div>

        {/* Success Indicator (Frentix style) */}
        <div className="mt-8 flex flex-col items-center z-10 relative">
          <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-[#AFFD37] shadow-[0_0_24px_rgba(16,185,129,0.15)] animate-pulse">
            <ShieldCheck size={40} />
          </div>
          
          <h2 className="text-xl font-bold text-white mt-5 tracking-tight text-center">
            VERIFIED SAFE
          </h2>
          <p className="text-xs text-emerald-400 mt-1 font-medium text-center max-w-[240px] leading-normal">
            No malicious vectors or scam records found.
          </p>
        </div>

        {/* Trust Score Card */}
        <div className="mt-6 bg-[#181818] rounded-[24px] p-5 border border-emerald-500/10 z-10 relative">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Security Index</span>
            <span className="text-[10px] font-bold text-[#AFFD37] bg-[#AFFD37]/5 px-2 py-0.5 rounded border border-[#AFFD37]/15">Verified</span>
          </div>

          <div className="mt-4 flex items-center justify-between gap-4">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-[#AFFD37] font-mono">96</span>
              <span className="text-slate-500 text-sm font-bold">/100</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-normal max-w-[170px]">
              Highly trusted merchant with long operational history and clean ratings.
            </p>
          </div>
        </div>

        {/* Verification Checkpoints (Bento List) */}
        <div className="mt-3.5 bg-[#181818] rounded-[24px] p-5 border border-white/5 z-10 relative flex flex-col gap-3.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Security Logs</span>

          <div className="flex flex-col gap-2.5">
            {/* Check item 1 */}
            <div className="flex items-start gap-2.5">
              <CheckCircle2 size={14} className="text-[#AFFD37] shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-white">Registered Merchant</span>
                <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">
                  Matches Swiggy/Zomato verified commercial nodes since 2021.
                </p>
              </div>
            </div>

            {/* Check item 2 */}
            <div className="flex items-start gap-2.5">
              <CheckCircle2 size={14} className="text-[#AFFD37] shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-white">SSL & Encryption Verified</span>
                <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">
                  Connection gateway is secure, certified, and compliant with RBI rules.
                </p>
              </div>
            </div>

            {/* Check item 3 */}
            <div className="flex items-start gap-2.5">
              <CheckCircle2 size={14} className="text-[#AFFD37] shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-white">NPCI Mandate Checked</span>
                <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">
                  UPI VPA has zero reported anomalies or chargeback spikes.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Controls / Payment routing */}
        <div className="mt-6 flex flex-col gap-3 z-10 relative">
          {/* Main Action: Proceed to Pay */}
          <button
            onClick={() => {
              alert('Redirecting secure payment token...')
              router.push('/home')
            }}
            className="w-full h-12 rounded-full bg-gradient-to-r from-[#8537FD] to-[#E837FD] text-white text-xs font-bold shadow-[0_8px_20px_rgba(133,55,253,0.2)] hover:shadow-[0_8px_24px_rgba(133,55,253,0.3)] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>Proceed to Safe Pay</span>
            <ArrowUpRight size={14} />
          </button>

          {/* Quick Pay Options (GPay & PhonePe Brand styling) */}
          <div className="flex gap-2">
            {/* GPay */}
            <button
              onClick={() => {
                alert('Launching Google Pay secure intent...')
                router.push('/home')
              }}
              className="flex-1 h-11 rounded-xl bg-[#181818] border border-white/5 hover:border-white/10 text-[10px] font-bold text-slate-300 transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-1.5"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
              <span>Google Pay</span>
            </button>

            {/* PhonePe */}
            <button
              onClick={() => {
                alert('Launching PhonePe secure intent...')
                router.push('/home')
              }}
              className="flex-1 h-11 rounded-xl bg-[#181818] border border-white/5 hover:border-white/10 text-[10px] font-bold text-slate-300 transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-1.5"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#E837FD]" />
              <span>PhonePe</span>
            </button>
          </div>
        </div>

      </div>
    </MobileFrame>
  )
}

export default function GreenAlert() {
  return (
    <Suspense fallback={
      <MobileFrame>
        <div className="relative px-5 pt-5 pb-28 flex flex-col items-center justify-center text-slate-100 min-h-full select-none bg-[#030A05]">
          <span className="text-xs font-bold text-emerald-400 animate-pulse">Loading Trust Details...</span>
        </div>
      </MobileFrame>
    }>
      <GreenAlertContent />
    </Suspense>
  )
}
