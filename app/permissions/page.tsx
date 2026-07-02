'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Shield, Camera, MessageSquare, Bell, ArrowRight, ShieldCheck } from 'lucide-react'
import MobileFrame from '@/components/MobileFrame'

export default function PermissionsPage() {
  const router = useRouter()

  const [camera, setCamera] = useState(true)
  const [sms, setSms] = useState(true)
  const [notifications, setNotifications] = useState(true)

  const handleGrant = () => {
    // Navigate to Onboarding walkthrough
    router.push('/onboarding')
  }

  return (
    <MobileFrame>
      <div className="relative px-5 pt-8 pb-10 flex flex-col text-slate-100 min-h-full select-none bg-[#0C0C0C]">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mt-4">
          <div className="w-14 h-14 rounded-2xl bg-[#181818] border border-white/10 flex items-center justify-center text-[#AFFD37]">
            <Shield size={24} className="animate-pulse" />
          </div>
          <h2 className="text-lg font-bold text-white mt-4">Guardian Superpowers</h2>
          <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mt-0.5">Define OS Permissions</p>
        </div>

        {/* Permissions Bento Cards */}
        <div className="mt-8 flex flex-col gap-3">
          
          {/* Card 1: Camera */}
          <div className="bg-[#181818] rounded-2xl p-4 border border-white/5 flex items-center justify-between gap-4">
            <div className="flex gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#0C0C0C] border border-white/5 flex items-center justify-center text-[#38BDF8] shrink-0">
                <Camera size={16} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Camera Access</h4>
                <p className="text-[9px] text-slate-400 mt-1 leading-normal">Required to scan merchant UPI QR codes instantly</p>
              </div>
            </div>
            <button 
              onClick={() => setCamera(!camera)}
              className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer shrink-0 ${camera ? 'bg-[#AFFD37]' : 'bg-slate-800'}`}
            >
              <div className={`w-4 h-4 rounded-full bg-[#0C0C0C] transition-transform ${camera ? 'translate-x-4' : 'translate-x-0'}`} />
            </button>
          </div>

          {/* Card 2: SMS */}
          <div className="bg-[#181818] rounded-2xl p-4 border border-white/5 flex items-center justify-between gap-4">
            <div className="flex gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#0C0C0C] border border-white/5 flex items-center justify-center text-[#E837FD] shrink-0">
                <MessageSquare size={16} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">SMS Notifications</h4>
                <p className="text-[9px] text-slate-400 mt-1 leading-normal">Scans incoming banking alerts for spam & fraud links</p>
              </div>
            </div>
            <button 
              onClick={() => setSms(!sms)}
              className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer shrink-0 ${sms ? 'bg-[#AFFD37]' : 'bg-slate-800'}`}
            >
              <div className={`w-4 h-4 rounded-full bg-[#0C0C0C] transition-transform ${sms ? 'translate-x-4' : 'translate-x-0'}`} />
            </button>
          </div>

          {/* Card 3: Notifications */}
          <div className="bg-[#181818] rounded-2xl p-4 border border-white/5 flex items-center justify-between gap-4">
            <div className="flex gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#0C0C0C] border border-white/5 flex items-center justify-center text-yellow-400 shrink-0">
                <Bell size={16} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">System Alerts</h4>
                <p className="text-[9px] text-slate-400 mt-1 leading-normal">Allows real-time pre-block alerts during threat detections</p>
              </div>
            </div>
            <button 
              onClick={() => setNotifications(!notifications)}
              className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer shrink-0 ${notifications ? 'bg-[#AFFD37]' : 'bg-slate-800'}`}
            >
              <div className={`w-4 h-4 rounded-full bg-[#0C0C0C] transition-transform ${notifications ? 'translate-x-4' : 'translate-x-0'}`} />
            </button>
          </div>
        </div>

        {/* Privacy verification card */}
        <div className="mt-6 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 border border-emerald-500/10 rounded-2xl p-4 flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
            <ShieldCheck size={16} />
          </div>
          <div>
            <span className="text-[10px] font-bold text-white font-mono">100% On-Device Protection</span>
            <p className="text-[10px] text-slate-400 mt-1 leading-normal">
              Guardia AI parses local content securely. Zero data leaves your device.
            </p>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleGrant}
          className="mt-auto w-full h-12 rounded-full bg-gradient-to-r from-[#8537FD] to-[#E837FD] hover:shadow-[0_8px_20px_rgba(133,55,253,0.2)] text-white font-extrabold text-xs uppercase tracking-wider active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-1.5"
        >
          <span>Grant OS Permissions</span>
          <ArrowRight size={14} />
        </button>

      </div>
    </MobileFrame>
  )
}
