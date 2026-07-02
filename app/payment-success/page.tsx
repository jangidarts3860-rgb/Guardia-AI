'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle2, Share2, Home, Download, ShieldCheck, Sparkles } from 'lucide-react'
import MobileFrame from '@/components/MobileFrame'

export default function PaymentSuccessPage() {
  const router = useRouter()

  const handleShare = () => {
    alert('Sharing receipt link: TXN#847291 generated from HDFC bank mandate.')
  }

  return (
    <MobileFrame>
      <div className="relative px-5 pt-8 pb-10 flex flex-col text-slate-100 min-h-full select-none bg-[#0C0C0C]">
        
        {/* Animated Confetti Lights */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff01_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        <div className="absolute top-10 left-10 w-28 h-28 bg-[#AFFD37]/10 rounded-full blur-[40px] animate-pulse pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-[#8537FD]/10 rounded-full blur-[40px] animate-pulse pointer-events-none" />

        {/* Checkmark icon with ring */}
        <div className="flex flex-col items-center text-center mt-10">
          <div className="relative w-20 h-20 rounded-full bg-emerald-500/10 border-2 border-emerald-500/20 flex items-center justify-center text-[#AFFD37] shadow-[0_0_24px_rgba(16,185,129,0.15)] animate-[bounce_2s_infinite]">
            <CheckCircle2 size={36} />
            <Sparkles size={16} className="absolute -top-1 -right-1 text-yellow-400 animate-pulse" />
          </div>

          <span className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#AFFD37] mt-6 block">
            Payment Verified Safe
          </span>
          <h2 className="text-xl font-black text-white mt-1.5 leading-none">
            ₹342.00 Paid
          </h2>
          <p className="text-[10px] text-slate-500 font-semibold mt-1">To: Swiggy Instamart</p>
        </div>

        {/* Bento Receipt details Card */}
        <div className="mt-8 bg-[#181818] rounded-[28px] p-5 border border-white/5 flex flex-col gap-3.5">
          <div className="flex items-center justify-between text-[9px] text-slate-500 font-bold uppercase tracking-wider border-b border-white/5 pb-2.5">
            <span>Transaction Receipt</span>
            <span className="text-[#AFFD37] flex items-center gap-1 font-mono">
              <ShieldCheck size={10} />
              <span>96/100 Trust</span>
            </span>
          </div>

          <div className="flex flex-col gap-2.5 text-[10px]">
            <div className="flex justify-between">
              <span className="text-slate-500">Transaction ID</span>
              <span className="font-mono text-slate-300 font-bold">#TXN847291</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Timestamp</span>
              <span className="text-slate-300 font-bold">30 Jun 2026, 10:32 AM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Payment Source</span>
              <span className="text-slate-300 font-bold">HDFC Bank •••• 4521</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Merchant GST</span>
              <span className="text-slate-300 font-bold font-mono">₹52.00 (Included)</span>
            </div>
          </div>
        </div>

        {/* AI Insight banner */}
        <div className="mt-4 bg-gradient-to-r from-[#8537FD]/5 to-[#E837FD]/5 border border-[#8537FD]/15 rounded-2xl p-4 flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#8537FD]/10 border border-[#8537FD]/20 flex items-center justify-center text-[#E837FD] shrink-0 font-bold font-mono text-[10px]">
            ✨
          </div>
          <div>
            <span className="text-[10px] font-bold text-white leading-none">Guardia AI Protection Insight</span>
            <p className="text-[9px] text-slate-400 mt-1 leading-normal">
              You have completed 12 safe transactions this month. No phishing risk detected.
            </p>
          </div>
        </div>

        {/* Bottom actions */}
        <div className="mt-auto flex flex-col gap-2.5">
          <button
            onClick={handleShare}
            className="w-full h-12 rounded-full bg-[#181818] border border-white/5 hover:border-white/10 flex items-center justify-center gap-2 text-xs font-bold text-slate-300 cursor-pointer active:scale-95 transition-transform"
          >
            <Share2 size={14} className="text-[#AFFD37]" />
            <span>Share Safe Receipt</span>
          </button>
          
          <button
            onClick={() => router.push('/home')}
            className="w-full h-12 rounded-full bg-gradient-to-r from-[#8537FD] to-[#E837FD] text-white flex items-center justify-center gap-2 text-xs font-extrabold uppercase tracking-wider cursor-pointer active:scale-95 transition-transform"
          >
            <Home size={14} />
            <span>Back to Home</span>
          </button>
        </div>

      </div>
    </MobileFrame>
  )
}
