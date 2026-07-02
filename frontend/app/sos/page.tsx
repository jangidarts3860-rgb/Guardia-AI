'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Phone, MessageCircle, Mail, ShieldAlert, X, AlertTriangle, Snowflake, ShieldCheck } from 'lucide-react'
import MobileFrame from '@/components/MobileFrame'

export default function CyberSOSPage() {
  const router = useRouter()
  
  // Call simulation state
  const [calling, setCalling] = useState(false)
  const [callDuration, setCallDuration] = useState(0)

  // Account freeze feedback state
  const [frozenStatus, setFrozenStatus] = useState(false)

  useEffect(() => {
    if (!calling) return
    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [calling])

  const triggerCall = () => {
    setCalling(true)
    setCallDuration(0)
  }

  const formatDuration = (sec: number) => {
    const mins = Math.floor(sec / 60)
    const secs = sec % 60
    return `${mins}:${secs < 10 ? '0' + secs : secs}`
  }

  const triggerFreezeAll = () => {
    localStorage.setItem('guardia_accounts_frozen', 'true')
    setFrozenStatus(true)
  }

  return (
    <MobileFrame>
      <div className="relative px-5 pt-5 pb-28 flex flex-col text-slate-100 min-h-full select-none bg-[#0C0C0C]">
        
        {/* Top Header */}
        <div className="flex items-center justify-between mt-2 z-10 relative">
          <button 
            onClick={() => router.push('/home')}
            className="w-9 h-9 rounded-full bg-[#181818] border border-white/5 flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
          >
            <ArrowLeft size={16} className="text-slate-300" />
          </button>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Emergency Help</span>
          <div className="w-9 h-9" />
        </div>

        {/* SOS Dialing Pulse Button */}
        <div className="mt-8 flex flex-col items-center text-center z-10 relative">
          <button
            onClick={triggerCall}
            className="w-32 h-32 rounded-full bg-red-600/10 border-4 border-red-600/30 flex items-center justify-center cursor-pointer active:scale-95 hover:border-red-500/50 shadow-[0_0_40px_rgba(220,38,38,0.25)] relative transition-all animate-[pulse_1.5s_infinite]"
          >
            {/* Pulsing ring */}
            <div className="absolute inset-0 rounded-full border border-red-500 animate-ping opacity-75" />
            <Phone size={44} className="text-red-500 fill-red-500" />
          </button>

          <h3 className="text-base font-extrabold text-white mt-6">Call Cyber Cell 1930</h3>
          <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mt-1">
            Immediate helpline for financial cybercrime
          </p>
        </div>

        {/* Action Shortcuts */}
        <div className="mt-8 flex flex-col gap-3 z-10 relative">
          
          <button
            onClick={triggerFreezeAll}
            className="bg-red-950/20 border border-red-900/30 rounded-2xl p-4 flex items-center justify-between cursor-pointer active:scale-[0.99] transition-transform text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-950/40 border border-red-900/40 flex items-center justify-center text-red-400">
                <Snowflake size={16} className="animate-spin" />
              </div>
              <div>
                <h4 className="text-xs font-extrabold text-red-400">Freeze All Accounts Now</h4>
                <p className="text-[9px] text-red-500/60 mt-0.5 font-bold">Instantly blocks linked UPI and mandates</p>
              </div>
            </div>
          </button>

          <div className="grid grid-cols-2 gap-3">
            <a
              href="https://api.whatsapp.com/send?phone=9111111111&text=I%20need%20cybercell%20support"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#181818] border border-white/5 rounded-2xl p-4 flex flex-col gap-2.5 active:scale-[0.98] transition-transform text-left"
            >
              <MessageCircle size={20} className="text-[#38BDF8]" />
              <div>
                <h4 className="text-[11px] font-bold text-slate-200">Chat Support</h4>
                <span className="text-[8px] font-bold text-slate-500 uppercase mt-0.5 block">WhatsApp Portal</span>
              </div>
            </a>

            <a
              href="mailto:report@cybercrime.gov.in?subject=Report%20Financial%20Fraud&body=Type%20transaction%20details%20here..."
              className="bg-[#181818] border border-white/5 rounded-2xl p-4 flex flex-col gap-2.5 active:scale-[0.98] transition-transform text-left"
            >
              <Mail size={20} className="text-yellow-400" />
              <div>
                <h4 className="text-[11px] font-bold text-slate-200">Email Incident</h4>
                <span className="text-[8px] font-bold text-slate-500 uppercase mt-0.5 block">Direct report pdf</span>
              </div>
            </a>
          </div>

        </div>

        {/* Cyber safety tips */}
        <div className="mt-6 bg-[#181818] rounded-2xl p-4 border border-white/5 z-10 relative">
          <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-500 block mb-2 px-0.5">Defensive Steps</span>
          
          <div className="flex flex-col gap-3 text-[10px] text-slate-400">
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-md bg-[#0C0C0C] border border-white/5 flex items-center justify-center text-slate-500 shrink-0 font-bold font-mono">1</span>
              <p className="leading-snug">Do not share your OTP or UPI PIN with anyone claiming to be bank staff.</p>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-md bg-[#0C0C0C] border border-white/5 flex items-center justify-center text-slate-500 shrink-0 font-bold font-mono">2</span>
              <p className="leading-snug">Freeze bank debit cards immediately via NetBanking or your bank SOS line.</p>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-md bg-[#0C0C0C] border border-white/5 flex items-center justify-center text-slate-500 shrink-0 font-bold font-mono">3</span>
              <p className="leading-snug">Register a formal cyber incident log complaint on <span className="text-[#AFFD37]">cybercrime.gov.in</span>.</p>
            </div>
          </div>
        </div>

        {/* DPDP and RBI Helpline */}
        <div className="mt-auto text-center py-4 z-10 relative">
          <span className="text-[9px] font-extrabold text-slate-600 uppercase tracking-widest font-mono">
            RBI Helpline: 14440
          </span>
        </div>

        {/* 1. MOCK ACTIVE CALL OVERLAY */}
        {calling && (
          <div className="absolute inset-0 bg-red-950/95 backdrop-blur-md z-50 flex flex-col items-center justify-center text-center p-6 animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-red-900 border-4 border-white/20 flex items-center justify-center text-white shadow-2xl animate-pulse">
              <Phone size={32} className="fill-white" />
            </div>

            <h2 className="text-lg font-black text-white mt-8 tracking-tight">Cyber Crime Helpline</h2>
            <span className="text-[10px] text-white/60 font-bold uppercase tracking-widest mt-1 block">Dialing 1930</span>

            <span className="text-xl font-bold font-mono text-[#AFFD37] mt-8 block">
              {formatDuration(callDuration)}
            </span>

            <button
              onClick={() => setCalling(false)}
              className="mt-16 w-14 h-14 rounded-full bg-red-600 hover:bg-red-500 border border-white/10 flex items-center justify-center text-white active:scale-95 transition-transform cursor-pointer"
            >
              <X size={24} />
            </button>
          </div>
        )}

        {/* 2. FROZEN ACCOUNTS SUCCESS MODAL */}
        {frozenStatus && (
          <div className="absolute inset-0 bg-[#0C0C0C]/90 backdrop-blur-sm z-50 flex flex-col justify-end">
            <div className="bg-[#181818] rounded-t-[32px] p-6 border-t border-white/10 flex flex-col items-center text-center">
              
              <button 
                onClick={() => setFrozenStatus(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#0C0C0C] flex items-center justify-center text-slate-400 active:scale-95 cursor-pointer"
              >
                <X size={16} />
              </button>

              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-[#AFFD37] mx-auto animate-bounce">
                <ShieldCheck size={24} />
              </div>

              <h3 className="text-sm font-bold text-white mt-4">All Accounts Frozen Successfully</h3>
              <p className="text-[10px] text-slate-400 mt-2 leading-relaxed max-w-[240px] mx-auto">
                We have suspended communication and issued immediate block request flags to HDFC Bank and State Bank of India.
              </p>

              <button
                onClick={() => setFrozenStatus(false)}
                className="mt-6 w-full h-12 rounded-full bg-[#181818] border border-white/5 text-white font-bold text-xs uppercase tracking-wider active:scale-[0.98] transition-transform cursor-pointer"
              >
                Close SOS
              </button>
            </div>
          </div>
        )}

      </div>
    </MobileFrame>
  )
}
