'use client'

import React, { use, useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Tv, Music, Dumbbell, AlertTriangle, HelpCircle, ShieldAlert, X, CheckCircle2 } from 'lucide-react'
import MobileFrame from '@/components/MobileFrame'
import { getStoredSubscriptions, cancelStoredSubscription, undoCancelStoredSubscription, StoredSubscription } from '@/lib/storage'

interface DetailPageProps {
  params: Promise<{ id: string }>
}

const ICON_MAP = {
  ott: Tv,
  music: Music,
  fitness: Dumbbell,
  other: HelpCircle
}

const COLOR_MAP = {
  ott: '#E837FD',
  music: '#AFFD37',
  fitness: '#38BDF8',
  other: '#FDE837'
}

export default function SubscriptionDetail({ params }: DetailPageProps) {
  const router = useRouter()
  const { id } = use(params)
  
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [cancelling, setCancelling] = useState(false)
  const [subs, setSubs] = useState<StoredSubscription[]>([])
  const [justReactivated, setJustReactivated] = useState(false)
  
  const cancelTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setSubs(getStoredSubscriptions())
  }, [])

  // Find sub item
  const currentSub = subs.find(s => s.id === id)

  // Clean-up timeout on unmount
  useEffect(() => {
    return () => {
      if (cancelTimeoutRef.current) clearTimeout(cancelTimeoutRef.current)
    }
  }, [])

  if (!currentSub) {
    return (
      <MobileFrame>
        <div className="relative px-5 pt-5 pb-28 flex flex-col items-center justify-center text-slate-100 min-h-full bg-[#0C0C0C]">
          <span className="text-xs font-bold text-slate-500 animate-pulse">Loading mandate details...</span>
        </div>
      </MobileFrame>
    )
  }

  const Icon = ICON_MAP[currentSub.category]
  const color = COLOR_MAP[currentSub.category]

  const handleCancelClick = () => {
    setShowCancelModal(true)
  }

  const handleCloseModal = () => {
    if (cancelTimeoutRef.current) {
      clearTimeout(cancelTimeoutRef.current)
      cancelTimeoutRef.current = null
    }
    setCancelling(false)
    setShowCancelModal(false)
  }

  const confirmCancel = () => {
    setCancelling(true)
    cancelTimeoutRef.current = setTimeout(() => {
      setCancelling(false)
      setShowCancelModal(false)
      cancelStoredSubscription(id)
      router.push(`/subs/${id}/success`)
    }, 2500)
  }

  const handleReactivate = () => {
    undoCancelStoredSubscription(id)
    setSubs(getStoredSubscriptions())
    setJustReactivated(true)
    setTimeout(() => setJustReactivated(false), 3000)
  }

  return (
    <MobileFrame>
      <div className="relative px-5 pt-5 pb-28 flex flex-col text-slate-100 min-h-full select-none bg-[#0C0C0C]">
        
        {/* Top Navigation */}
        <div className="flex items-center justify-between mt-2 z-10 relative">
          <button 
            onClick={() => router.push('/subs')}
            className="w-9 h-9 rounded-full bg-[#181818] border border-white/5 flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
            aria-label="Back to Subscriptions"
          >
            <ArrowLeft size={16} className="text-slate-300" aria-hidden="true" />
          </button>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Mandate Detail</span>
          <div className="w-9 h-9" />
        </div>

        {/* Just Reactivated Success Alert Banner */}
        {justReactivated && (
          <div className="mt-4 bg-[#AFFD37]/10 border border-[#AFFD37]/35 rounded-xl p-3 flex items-center gap-2.5 animate-slide-up text-[10px] text-white">
            <CheckCircle2 size={14} className="text-[#AFFD37]" />
            <span>Axis Bank e-mandate re-activated successfully!</span>
          </div>
        )}

        {/* Central Logo & Brand Header */}
        <div className="mt-8 flex flex-col items-center text-center z-10 relative">
          <div 
            style={{ color: color, backgroundColor: `${color}08`, borderColor: `${color}20` }}
            className={`w-18 h-18 rounded-[24px] border flex items-center justify-center shadow-lg ${currentSub.isCancelled ? 'opacity-40' : 'animate-pulse'}`}
          >
            <Icon size={32} />
          </div>

          <h2 className="text-lg font-bold text-white mt-4">{currentSub.name}</h2>
          <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mt-1">{currentSub.category} Mandate</p>

          <div className="mt-3 flex items-center gap-2">
            <span className={`h-5 px-2.5 rounded-full text-[9px] font-bold uppercase tracking-wide flex items-center gap-1 ${
              currentSub.isCancelled
                ? 'bg-slate-800 text-slate-400 border border-white/5'
                : currentSub.isUnknown
                  ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                  : currentSub.isUnused
                    ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                    : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
            }`}>
              {currentSub.isCancelled ? 'Revoked' : currentSub.isUnknown ? 'Action Needed' : currentSub.isUnused ? 'Zombie Mandate' : 'Active & Clean'}
            </span>
            <span className="h-5 px-2.5 rounded-full bg-[#181818] border border-white/5 text-[9px] font-bold text-slate-400 uppercase tracking-wide">
              ₹{currentSub.cost}/mo
            </span>
          </div>
        </div>

        {/* Metrics Grid Cards */}
        <div className="mt-7 grid grid-cols-2 gap-3 z-10 relative">
          <div className="bg-[#181818] rounded-2xl p-3.5 border border-white/5">
            <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">Annual Burden</span>
            <p className="text-base font-bold font-mono text-white mt-1">₹{currentSub.cost * 12}</p>
            <p className="text-[8px] text-slate-600 font-medium mt-0.5">Projected outflow</p>
          </div>
          <div className="bg-[#181818] rounded-2xl p-3.5 border border-white/5">
            <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">Auto-Debit Day</span>
            <p className="text-base font-bold font-mono text-white mt-1">{currentSub.renewDate}</p>
            <p className="text-[8px] text-slate-600 font-medium mt-0.5">Axis Bank account</p>
          </div>
        </div>

        {/* AI Insight Glow Card */}
        <div className={`mt-5 rounded-[24px] p-5 border z-10 relative overflow-hidden transition-all ${
          currentSub.isCancelled 
            ? 'bg-slate-900/50 border-white/5' 
            : currentSub.isUnknown 
              ? 'bg-yellow-500/5 border-yellow-500/20' 
              : currentSub.isUnused 
                ? 'bg-[#E837FD]/5 border-[#E837FD]/20' 
                : 'bg-[#AFFD37]/5 border-[#AFFD37]/10'
        }`}>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: currentSub.isCancelled ? '#444' : currentSub.isUnknown ? '#FDE837' : currentSub.isUnused ? '#E837FD' : '#AFFD37' }} />
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300">Guardia AI Pulse</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2.5 leading-relaxed font-medium">
            {currentSub.isCancelled 
              ? 'This mandate was revoked. No further auto-debit payments will be allowed by Axis Bank.' 
              : currentSub.isUnknown
                ? 'WARNING: This auto-debit pattern matches typical zombie charges or dark-pattern trial roll-overs. Block recommended.'
                : currentSub.isUnused
                  ? `You haven't opened Netflix Premium in ${currentSub.unusedDays} days. Revoking this mandate will save you ₹7,788 annually with zero friction.`
                  : 'Your usage matches the subscription values. Mandate remains secure under on-device active protection.'
            }
          </p>
        </div>

        {/* Action Buttons Stack */}
        <div className="mt-auto flex flex-col gap-2.5 z-10 relative pt-6">
          {currentSub.isCancelled ? (
            <button
              onClick={handleReactivate}
              className="w-full h-12 rounded-full bg-gradient-to-r from-[#8537FD] to-[#E837FD] text-white font-bold text-xs uppercase tracking-wider shadow-lg active:scale-[0.98] transition-transform cursor-pointer"
            >
              Re-activate Auto-Debit
            </button>
          ) : (
            <button
              onClick={handleCancelClick}
              className="w-full h-12 rounded-full bg-gradient-to-r from-red-600 to-[#E837FD] text-white font-bold text-xs uppercase tracking-wider shadow-lg active:scale-[0.98] transition-transform cursor-pointer"
            >
              Cancel Subscription
            </button>
          )}
          
          {!currentSub.isCancelled && (
            <button
              onClick={() => alert('Subscription paused for 30 days.')}
              className="w-full h-12 rounded-full bg-[#181818] border border-white/5 hover:border-white/10 text-xs font-bold text-slate-300 uppercase tracking-wider active:scale-[0.98] transition-transform cursor-pointer"
            >
              Pause for 1 month
            </button>
          )}

          <button
            onClick={() => router.push('/subs')}
            className="w-full h-11 rounded-full text-[10px] font-bold text-slate-500 uppercase tracking-widest active:scale-95 transition-all cursor-pointer"
          >
            {currentSub.isCancelled ? 'Back to Spends Map' : 'Keep Active'}
          </button>
        </div>

        {/* Revocation Mandate Modal Sheet */}
        {showCancelModal && (
          <div className="absolute inset-0 bg-[#0C0C0C]/90 backdrop-blur-sm z-50 flex flex-col justify-end">
            <div className="bg-[#181818] rounded-t-[32px] p-6 border-t border-white/10 flex flex-col items-center text-center max-h-[85%] overflow-y-auto">
              
              {/* Close Button */}
              <button 
                onClick={handleCloseModal}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#0C0C0C] flex items-center justify-center text-slate-400 active:scale-95 cursor-pointer"
                aria-label="Close modal"
              >
                <X size={16} aria-hidden="true" />
              </button>

              {cancelling ? (
                <div className="py-10 flex flex-col items-center">
                  {/* Glowing Radar Rings Loader */}
                  <div className="relative w-20 h-20 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-2 border-red-500/20 animate-ping" />
                    <div className="absolute w-14 h-14 rounded-full border-2 border-[#E837FD]/40 animate-pulse" />
                    <div className="w-10 h-10 rounded-full bg-[#0C0C0C] border border-red-500/40 flex items-center justify-center text-red-500 animate-spin">
                      <ShieldAlert size={20} />
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-white mt-6">Revoking Auto-Debit Mandate</h3>
                  <p className="text-[10px] text-slate-400 mt-2 max-w-[200px]">
                    Sending revocation request to Axis Bank Aggregator API…
                  </p>
                </div>
              ) : (
                <div className="py-2">
                  <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 mx-auto">
                    <ShieldAlert size={22} />
                  </div>

                  <h3 className="text-sm font-bold text-white mt-4">Confirm Cancellation</h3>
                  <p className="text-[10px] text-slate-400 mt-2 leading-relaxed max-w-[240px]">
                    This will immediately instruct Axis Bank to block and revoke the e-mandate for <span className="font-bold text-white">{currentSub.name}</span>. No further charges will be debited.
                  </p>

                  {/* Statutory RBI Consent Warning Box */}
                  <div className="mt-4 bg-red-950/20 border border-red-500/25 rounded-2xl p-3 text-left">
                    <span className="text-[8px] font-extrabold uppercase tracking-wider text-red-400 flex items-center gap-1.5">
                      <AlertTriangle size={10} aria-hidden="true" />
                      <span>Statutory RBI Disclosure</span>
                    </span>
                    <p className="text-[9px] text-slate-400 mt-1 leading-normal">
                      Revoking this mandate does not terminate your contract with the merchant. You may still remain liable for outstanding dues.
                    </p>
                  </div>

                  {/* Summary row */}
                  <div className="mt-5 bg-[#0C0C0C] rounded-xl p-3 border border-white/5 w-full min-w-[260px] flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-bold">Monthly Savings</span>
                    <span className="font-mono font-bold text-[#AFFD37]">₹{currentSub.cost}.00</span>
                  </div>

                  <button
                    onClick={confirmCancel}
                    className="mt-6 w-full h-12 rounded-full bg-gradient-to-r from-red-600 to-red-500 text-white font-bold text-xs uppercase tracking-wider active:scale-[0.98] transition-transform cursor-pointer"
                  >
                    Confirm Mandate Revocation
                  </button>

                  <button
                    onClick={handleCloseModal}
                    className="mt-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest hover:text-slate-300 cursor-pointer"
                  >
                    Go Back
                  </button>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </MobileFrame>
  )
}
