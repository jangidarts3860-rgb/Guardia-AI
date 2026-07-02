'use client'

import React, { use, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronRight, RefreshCw, X, ArrowLeft, ShieldCheck } from 'lucide-react'
import MobileFrame from '@/components/MobileFrame'
import { undoCancelStoredSubscription } from '@/lib/storage'

interface SuccessPageProps {
  params: Promise<{ id: string }>
}

export default function CancellationSuccess({ params }: SuccessPageProps) {
  const router = useRouter()
  const { id } = use(params)

  const [undoTimer, setUndoTimer] = useState(5)
  const [showSnackbar, setShowSnackbar] = useState(true)

  // Map IDs to subscriptions
  const subsDict: Record<string, { name: string; cost: number; annual: number }> = {
    netflix: { name: 'Netflix Premium', cost: 649, annual: 7788 },
    spotify: { name: 'Spotify Family', cost: 119, annual: 1428 },
    cultfit: { name: 'Cult.fit Gym Pack', cost: 2133, annual: 25596 },
    'unknown-charge': { name: 'Unknown Auto-Debit', cost: 299, annual: 3588 }
  }

  const sub = subsDict[id] || { name: 'Netflix Premium', cost: 649, annual: 7788 }

  useEffect(() => {
    if (undoTimer <= 0) {
      setShowSnackbar(false)
      return
    }

    const timer = setInterval(() => {
      setUndoTimer((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [undoTimer])

  const handleUndo = () => {
    undoCancelStoredSubscription(id)
    router.push(`/subs/${id}`)
  }

  return (
    <MobileFrame>
      <div className="relative px-5 pt-5 pb-28 flex flex-col text-slate-100 min-h-full select-none bg-[#0C0C0C]">
        
        {/* Top Header Navigation (Frentix style) */}
        <div className="flex items-center justify-between mt-2 z-10 relative">
          <button 
            onClick={() => router.push('/subs')}
            className="w-9 h-9 rounded-full bg-[#181818] border border-white/5 flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
          >
            <ArrowLeft size={16} className="text-slate-300" />
          </button>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Revocation Success</span>
          <div className="w-9 h-9" />
        </div>

        {/* Victory Celebration Area (Centered) */}
        <div className="mt-8 flex-1 flex flex-col items-center justify-center z-10 relative text-center">
          
          {/* Sparkles / Confetti Backdrop Effects */}
          <div className="absolute w-48 h-48 bg-gradient-to-tr from-[#AFFD37]/10 to-[#38BDF8]/10 rounded-full blur-[40px] opacity-60 animate-pulse pointer-events-none" />
          
          {/* Animated Success Badge */}
          <div className="relative w-20 h-20 rounded-full bg-slate-900 border border-[#AFFD37]/30 flex items-center justify-center shadow-[0_0_32px_rgba(175,253,55,0.15)] animate-[bounce_2.5s_infinite]">
            <div className="absolute inset-2 rounded-full border border-dashed border-[#AFFD37]/20 animate-spin" />
            <ShieldCheck size={40} className="text-[#AFFD37]" />
          </div>

          <div className="mt-8">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#AFFD37]">
              MANDATE REVOKED ✓
            </span>
            <h2 className="text-2xl font-extrabold text-white mt-2 tracking-tight">
              Done! Saved ₹{sub.cost}
            </h2>
            <p className="text-xs text-slate-400 mt-2 max-w-[220px] mx-auto leading-relaxed">
              Axis Bank has successfully removed auto-debit approval for <span className="font-bold text-white">{sub.name}</span>. No further charges will be debited.
            </p>
          </div>

          {/* Annual Savings Badge Block */}
          <div className="mt-6 bg-[#181818] border border-white/5 rounded-2xl p-4 w-full max-w-[260px]">
            <span className="text-[9px] uppercase tracking-wider text-slate-500 font-extrabold">Annual Savings Boost</span>
            <p className="text-xl font-bold font-mono text-[#AFFD37] mt-1">+ ₹{sub.annual}.00</p>
            <p className="text-[8px] text-slate-600 mt-0.5">saved from zombie auto-debit leak</p>
          </div>
        </div>

        {/* AI Next Steps Suggestion Card */}
        <div 
          onClick={() => router.push('/subs')}
          className="mt-4 bg-[#181818] rounded-2xl p-4 border border-white/5 hover:border-[#8537FD]/30 cursor-pointer active:scale-[0.99] transition-all z-10 relative flex items-center justify-between gap-3"
        >
          <div className="flex gap-3 items-center">
            <div className="w-8 h-8 rounded-lg bg-[#8537FD]/10 border border-[#8537FD]/20 flex items-center justify-center text-[#8537FD] shrink-0">
              <RefreshCw size={14} className="animate-spin" />
            </div>
            <div className="text-left">
              <h4 className="text-xs font-bold text-white leading-tight">2 Inactive Mandates Detected</h4>
              <p className="text-[9px] text-slate-500 mt-0.5">Let&apos;s audit the remaining monthly spends.</p>
            </div>
          </div>
          <ChevronRight size={14} className="text-slate-500" />
        </div>

        {/* Action Button */}
        <button
          onClick={() => router.push('/subs')}
          className="mt-6 w-full h-12 rounded-full bg-[#181818] border border-white/5 hover:border-white/10 text-xs font-bold text-slate-200 uppercase tracking-wider shadow-md active:scale-[0.98] transition-transform cursor-pointer z-10 relative"
        >
          Back to Subscriptions
        </button>

        {/* Interactive Undo Snackbar (Fades out after 5s) */}
        {showSnackbar && (
          <div className="absolute bottom-24 left-4 right-4 bg-[#1e1e1e] border border-white/10 rounded-2xl p-3.5 shadow-2xl z-50 flex items-center justify-between gap-3 animate-slide-up">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white font-mono">
                {undoTimer}s
              </div>
              <span className="text-[11px] font-bold text-slate-300">Cancelled {sub.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleUndo}
                className="px-3.5 py-1.5 rounded-lg bg-[#AFFD37] text-slate-950 text-[10px] font-extrabold uppercase tracking-wider active:scale-95 transition-transform cursor-pointer"
              >
                Undo
              </button>
              <button 
                onClick={() => setShowSnackbar(false)}
                className="text-slate-500 hover:text-white"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        )}

      </div>
    </MobileFrame>
  )
}
