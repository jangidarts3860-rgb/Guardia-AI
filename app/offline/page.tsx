'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ShieldAlert, RefreshCw, Snowflake, CheckCircle2, ArrowLeft } from 'lucide-react'
import MobileFrame from '@/components/MobileFrame'

export default function OfflinePage() {
  const router = useRouter()
  const [retrying, setRetrying] = useState(false)
  const [frozen, setFrozen] = useState(false)

  const handleRetry = () => {
    setRetrying(true)
    setTimeout(() => {
      setRetrying(false)
      router.push('/home')
    }, 1500)
  }

  const handleFreeze = () => {
    localStorage.setItem('guardia_accounts_frozen', 'true')
    setFrozen(true)
  }

  return (
    <MobileFrame>
      <div className="relative px-5 pt-8 pb-10 flex flex-col items-center justify-center text-slate-100 min-h-full select-none bg-[#0C0C0C]">
        
        {/* Top Header */}
        <div className="absolute top-5 left-5 z-10">
          <button 
            onClick={() => router.push('/home')}
            className="w-9 h-9 rounded-full bg-[#181818] border border-white/5 flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
          >
            <ArrowLeft size={16} className="text-slate-300" />
          </button>
        </div>

        {/* Offline Warning Card */}
        <div className="flex flex-col items-center text-center mt-6">
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 shadow-md">
            <ShieldAlert size={28} className="animate-pulse" />
          </div>

          <h2 className="text-base font-bold text-white mt-6">You're Offline</h2>
          <p className="text-[10px] text-slate-400 mt-2.5 max-w-[210px] leading-relaxed">
            Phishing links and data sync are temporarily paused. However, your <span className="text-white font-bold">Emergency Freeze</span> continues to function offline.
          </p>
        </div>

        {/* SOS Action Card (Offline working) */}
        <div className="mt-8 w-full max-w-[260px] bg-[#181818] rounded-2xl p-5 border border-white/5 text-center flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-[#0C0C0C] border border-white/5 flex items-center justify-center text-red-400">
            <Snowflake size={18} className={frozen ? '' : 'animate-spin'} />
          </div>
          
          <h4 className="text-xs font-extrabold text-white mt-3.5">Offline Emergency Block</h4>
          <p className="text-[9px] text-slate-500 mt-1 max-w-[190px] leading-relaxed">
            Freeze linked cards directly using on-device secure cached banking hashes.
          </p>

          {frozen ? (
            <div className="mt-4 w-full h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center gap-2 text-[10px] font-bold text-[#AFFD37]">
              <CheckCircle2 size={14} />
              <span>ACCOUNTS FROZEN</span>
            </div>
          ) : (
            <button
              onClick={handleFreeze}
              className="mt-4 w-full h-11 rounded-xl bg-red-600 hover:bg-red-500 text-white font-extrabold text-[10px] uppercase tracking-wider active:scale-95 transition-transform cursor-pointer"
            >
              Freeze All Accounts
            </button>
          )}
        </div>

        {/* Retry controls */}
        <button
          onClick={handleRetry}
          disabled={retrying}
          className="mt-10 flex items-center gap-2 text-[10px] font-bold text-[#8537FD] uppercase tracking-widest hover:text-white cursor-pointer"
        >
          <RefreshCw size={12} className={retrying ? 'animate-spin' : ''} />
          <span>{retrying ? 'Connecting...' : 'Try connecting again'}</span>
        </button>

      </div>
    </MobileFrame>
  )
}
