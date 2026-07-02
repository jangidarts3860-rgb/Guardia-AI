'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Bell, User, Lock, Landmark, ShieldCheck, Trash2, X, AlertTriangle, KeyRound, CheckCircle2 } from 'lucide-react'
import MobileFrame from '@/components/MobileFrame'
import BottomNav from '@/components/BottomNav'
import { getStoredSubscriptions } from '@/lib/storage'

export default function ProfileSettings() {
  const router = useRouter()

  // Profile data state loaded from localStorage
  const [name, setName] = useState('Rohan Kumar')
  const [email, setEmail] = useState('rohan.kumar@gmail.com')
  const [phone, setPhone] = useState('+91 98765 43210')
  const [altPhone, setAltPhone] = useState('+91 99887 76655')
  
  // UI states
  const [isEditing, setIsEditing] = useState(false)
  const [showPinModal, setShowPinModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showSuccessToast, setShowSuccessToast] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')

  // Pin reset wizard states
  const [pinStep, setPinStep] = useState(1)
  const [otpVal, setOtpVal] = useState(['', '', '', ''])
  const [newPin, setNewPin] = useState(['', '', '', '', '', ''])

  const otpRefs = [
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null)
  ]

  const pinRefs = [
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null)
  ]

  // Stats calculation
  const [savedAmount, setSavedAmount] = useState(24400)
  const [blockedCount, setBlockedCount] = useState(5)

  useEffect(() => {
    // Load dynamic name
    const storedName = localStorage.getItem('guardia_user_name')
    if (storedName) setName(storedName)
    
    const storedEmail = localStorage.getItem('guardia_user_email')
    if (storedEmail) setEmail(storedEmail)

    const storedPhone = localStorage.getItem('guardia_user_phone')
    if (storedPhone) setPhone(storedPhone)

    const storedAltPhone = localStorage.getItem('guardia_user_alt_phone')
    if (storedAltPhone) setAltPhone(storedAltPhone)

    // Calculate dynamic savings
    const subs = getStoredSubscriptions()
    const cancelledSubs = subs.filter(s => s.isCancelled)
    const annualSavings = cancelledSubs.reduce((acc, s) => acc + (s.cost * 12), 0)
    
    // Add baseline ₹24,400 from PRD stats
    setSavedAmount(24400 + annualSavings)
    setBlockedCount(5 + (cancelledSubs.length > 0 ? 1 : 0))
  }, [])

  const handleSaveChanges = () => {
    localStorage.setItem('guardia_user_name', name)
    localStorage.setItem('guardia_user_email', email)
    localStorage.setItem('guardia_user_phone', phone)
    localStorage.setItem('guardia_user_alt_phone', altPhone)
    setIsEditing(false)
    
    setSuccessMsg('Profile changes saved successfully!')
    setShowSuccessToast(true)
    setTimeout(() => setShowSuccessToast(false), 3000)
  }

  const handlePinReset = () => {
    if (pinStep === 1) {
      // Simulate verification -> go to new PIN entry
      setPinStep(2)
    } else {
      // Complete reset
      setShowPinModal(false)
      setPinStep(1)
      setOtpVal(['', '', '', ''])
      setNewPin(['', '', '', '', '', ''])
      
      setSuccessMsg('Guardian PIN reset successfully!')
      setShowSuccessToast(true)
      setTimeout(() => setShowSuccessToast(false), 3000)
    }
  }

  const handleDeleteAccount = () => {
    setShowDeleteModal(false)
    alert('Account suspend request initiated via RBI Aggregator mandate. Deleting local keys...')
    localStorage.clear()
    router.push('/')
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
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Profile & Settings</span>
          <div className="w-9 h-9" />
        </div>

        {/* Dynamic Success Toast banner */}
        {showSuccessToast && (
          <div className="mt-4 bg-emerald-500/10 border border-emerald-500/35 rounded-xl p-3 flex items-center gap-2.5 animate-slide-up text-[10px] text-white">
            <CheckCircle2 size={14} className="text-emerald-400" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Profile Card / Header Info */}
        <div className="mt-6 flex flex-col items-center text-center z-10 relative">
          <div className="w-18 h-18 rounded-full bg-gradient-to-tr from-[#8537FD] to-[#E837FD] p-[2px] shadow-lg">
            <div className="w-full h-full rounded-full bg-[#0C0C0C] flex items-center justify-center">
              <span className="text-lg font-bold text-white uppercase">{name.slice(0, 2)}</span>
            </div>
          </div>
          
          <h2 className="text-base font-bold text-white mt-4">{name}</h2>
          <p className="text-[10px] text-slate-500 font-semibold tracking-wider">{phone}</p>
        </div>

        {/* Quick Stats Bento Box */}
        <div className="mt-6 grid grid-cols-2 gap-3.5 z-10 relative">
          <div className="bg-[#181818] rounded-2xl p-4 border border-white/5 text-center">
            <span className="text-[9px] uppercase tracking-wider text-slate-500 font-extrabold block">Total Saved</span>
            <span className="text-base font-extrabold font-mono text-[#AFFD37] mt-1 block">₹{savedAmount}</span>
            <span className="text-[8px] text-slate-600 block mt-0.5">from zombie spend leaks</span>
          </div>
          <div className="bg-[#181818] rounded-2xl p-4 border border-white/5 text-center">
            <span className="text-[9px] uppercase tracking-wider text-slate-500 font-extrabold block">Fraud Blocked</span>
            <span className="text-base font-extrabold font-mono text-[#E837FD] mt-1 block">{blockedCount} Scams</span>
            <span className="text-[8px] text-slate-600 block mt-0.5">before transactions</span>
          </div>
        </div>

        {/* Edit profile form or settings menu */}
        {isEditing ? (
          <div className="mt-6 bg-[#181818] rounded-[28px] p-5 border border-white/5 z-10 relative flex flex-col gap-4">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Edit Personal Information</span>
            
            <div className="flex flex-col gap-3">
              <div>
                <label className="text-[9px] text-slate-500 font-bold uppercase block mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl bg-[#0C0C0C] border border-white/5 focus:border-[#8537FD] outline-none text-xs font-semibold text-white"
                />
              </div>
              <div>
                <label className="text-[9px] text-slate-500 font-bold uppercase block mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl bg-[#0C0C0C] border border-white/5 focus:border-[#8537FD] outline-none text-xs font-semibold text-white"
                />
              </div>
              <div>
                <label className="text-[9px] text-slate-500 font-bold uppercase block mb-1">Alternate Phone</label>
                <input
                  type="text"
                  value={altPhone}
                  onChange={(e) => setAltPhone(e.target.value)}
                  placeholder="Not Configured"
                  className="w-full h-11 px-4 rounded-xl bg-[#0C0C0C] border border-white/5 focus:border-[#8537FD] outline-none text-xs font-semibold text-white"
                />
              </div>
            </div>

            <div className="flex gap-2.5 mt-2">
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 h-11 rounded-full bg-[#0C0C0C] border border-white/5 text-[10px] font-bold text-slate-400 uppercase tracking-wider cursor-pointer active:scale-95 transition-transform"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                className="flex-1 h-11 rounded-full bg-gradient-to-r from-[#8537FD] to-[#E837FD] text-white font-extrabold text-[10px] uppercase tracking-wider cursor-pointer active:scale-95 transition-transform"
              >
                Save Info
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-6 flex flex-col gap-3.5 z-10 relative">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-1">Settings Dashboard</span>
            
            <div className="bg-[#181818] rounded-[24px] p-1.5 border border-white/5 flex flex-col gap-0.5">
              {/* Menu 1: Edit Profile */}
              <button 
                onClick={() => setIsEditing(true)}
                className="w-full flex items-center justify-between p-3.5 border-b border-white/5 text-left hover:bg-white/5 rounded-t-[18px] cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <User size={15} className="text-[#38BDF8]" />
                  <span className="text-xs font-bold text-slate-200">Edit Profile Info</span>
                </div>
                <span className="text-[9px] font-bold text-slate-500 uppercase">Modify</span>
              </button>

              {/* Menu 2: Reset PIN */}
              <button 
                onClick={() => setShowPinModal(true)}
                className="w-full flex items-center justify-between p-3.5 border-b border-white/5 text-left hover:bg-white/5 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Lock size={15} className="text-[#AFFD37]" />
                  <span className="text-xs font-bold text-slate-200">Reset Guardian PIN</span>
                </div>
                <span className="text-[9px] font-bold text-slate-500 uppercase">6-digit</span>
              </button>

              {/* Menu 3: Manage Banks */}
              <button 
                onClick={() => router.push('/vault')}
                className="w-full flex items-center justify-between p-3.5 border-b border-white/5 text-left hover:bg-white/5 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Landmark size={15} className="text-[#8537FD]" />
                  <span className="text-xs font-bold text-slate-200">Manage Linked Banks</span>
                </div>
                <span className="text-[9px] font-bold text-[#AFFD37] uppercase">2 linked</span>
              </button>

              {/* Menu 4: Notifications settings */}
              <button 
                onClick={() => alert('Notification categories: Block alerts (ON), Renewal alerts (ON).')}
                className="w-full flex items-center justify-between p-3.5 border-b border-white/5 text-left hover:bg-white/5 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Bell size={15} className="text-yellow-400" />
                  <span className="text-xs font-bold text-slate-200">Notification Alerts</span>
                </div>
                <span className="text-[9px] font-bold text-slate-500 uppercase">Active</span>
              </button>

              {/* Menu 5: Suspend / Delete Account */}
              <button 
                onClick={() => setShowDeleteModal(true)}
                className="w-full flex items-center justify-between p-3.5 text-left hover:bg-red-500/5 rounded-b-[18px] cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Trash2 size={15} className="text-red-400" />
                  <span className="text-xs font-bold text-red-400">Suspend Account</span>
                </div>
                <span className="text-[9px] font-bold text-red-500/50 uppercase">Danger</span>
              </button>
            </div>
          </div>
        )}

        {/* DPDP Compliance and Version footer */}
        <div className="mt-auto text-center py-4 z-10 relative">
          <div className="flex items-center justify-center gap-1.5 text-slate-600 text-[9px] font-bold uppercase tracking-wider">
            <ShieldCheck size={11} className="text-emerald-500" />
            <span>v1.0.0 · RBI DPDP 2023 Compliant</span>
          </div>
        </div>

        {/* 1. RESET PIN MODAL OVERLAY (Screen 24) */}
        {showPinModal && (
          <div className="absolute inset-0 bg-[#0C0C0C]/90 backdrop-blur-sm z-50 flex flex-col justify-end">
            <div className="bg-[#181818] rounded-t-[32px] p-6 border-t border-white/10 flex flex-col items-center text-center">
              
              <button 
                onClick={() => { setShowPinModal(false); setPinStep(1); }}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#0C0C0C] flex items-center justify-center text-slate-400 active:scale-95 cursor-pointer"
              >
                <X size={16} />
              </button>

              <div className="w-11 h-11 rounded-full bg-[#0C0C0C] border border-white/5 flex items-center justify-center text-[#AFFD37]">
                <KeyRound size={18} />
              </div>

              {pinStep === 1 ? (
                <div className="w-full py-2">
                  <h3 className="text-sm font-bold text-white mt-4">Reset Guardian PIN</h3>
                  <p className="text-[10px] text-slate-400 mt-2 leading-relaxed max-w-[220px] mx-auto">
                    We have sent a verification OTP to <span className="font-bold text-white">{phone}</span> to reset your credentials.
                  </p>

                  <div className="mt-5 flex justify-center gap-3">
                    {[...Array(4)].map((_, i) => (
                      <input
                        key={i}
                        ref={(el) => { otpRefs[i].current = el }}
                        type="text"
                        maxLength={1}
                        value={otpVal[i]}
                        onChange={(e) => {
                          const val = e.target.value
                          const updated = [...otpVal]
                          updated[i] = val
                          setOtpVal(updated)

                          // Auto-focus next input
                          if (val && i < 3) {
                            otpRefs[i + 1].current?.focus()
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Backspace' && !otpVal[i] && i > 0) {
                            otpRefs[i - 1].current?.focus()
                          }
                        }}
                        placeholder="•"
                        className="w-10 h-12 bg-[#0C0C0C] border border-white/5 text-center text-sm font-extrabold text-white rounded-xl focus:border-[#8537FD] outline-none"
                      />
                    ))}
                  </div>

                  <button
                    onClick={handlePinReset}
                    className="mt-6 w-full h-12 rounded-full bg-gradient-to-r from-[#8537FD] to-[#E837FD] text-white font-bold text-xs uppercase tracking-wider active:scale-[0.98] transition-transform cursor-pointer"
                  >
                    Verify OTP code
                  </button>
                </div>
              ) : (
                <div className="w-full py-2 animate-fade-in">
                  <h3 className="text-sm font-bold text-white mt-4">Enter New 6-Digit PIN</h3>
                  <p className="text-[10px] text-slate-400 mt-2 leading-relaxed max-w-[200px] mx-auto">
                    Define a secure Guardian PIN to lock emergency freeze parameters.
                  </p>

                  <div className="mt-5 flex justify-center gap-2">
                    {[...Array(6)].map((_, i) => (
                      <input
                        key={i}
                        ref={(el) => { pinRefs[i].current = el }}
                        type="text"
                        maxLength={1}
                        value={newPin[i]}
                        onChange={(e) => {
                          const val = e.target.value
                          const updated = [...newPin]
                          updated[i] = val
                          setNewPin(updated)

                          // Auto-focus next input
                          if (val && i < 5) {
                            pinRefs[i + 1].current?.focus()
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Backspace' && !newPin[i] && i > 0) {
                            pinRefs[i - 1].current?.focus()
                          }
                        }}
                        placeholder="•"
                        className="w-9 h-11 bg-[#0C0C0C] border border-white/5 text-center text-sm font-extrabold text-[#AFFD37] rounded-xl focus:border-[#8537FD] outline-none"
                      />
                    ))}
                  </div>

                  <button
                    onClick={handlePinReset}
                    className="mt-6 w-full h-12 rounded-full bg-[#AFFD37] text-slate-950 font-bold text-xs uppercase tracking-wider active:scale-[0.98] transition-transform cursor-pointer"
                  >
                    Confirm PIN Reset
                  </button>
                </div>
              )}

            </div>
          </div>
        )}

        {/* 2. DELETE ACCOUNT MODAL SHEET (Screen 26) */}
        {showDeleteModal && (
          <div className="absolute inset-0 bg-[#0C0C0C]/90 backdrop-blur-sm z-50 flex flex-col justify-end">
            <div className="bg-[#181818] rounded-t-[32px] p-6 border-t border-white/10 flex flex-col items-center text-center">
              
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#0C0C0C] flex items-center justify-center text-slate-400 active:scale-95 cursor-pointer"
              >
                <X size={16} />
              </button>

              <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 mx-auto">
                <AlertTriangle size={22} className="animate-bounce" />
              </div>

              <h3 className="text-sm font-bold text-white mt-4">Confirm Account Suspension</h3>
              <p className="text-[10px] text-slate-400 mt-2 leading-relaxed max-w-[240px] mx-auto">
                Warning: This will suspend your profile, revoke all connected Axis bank aggregation mandates, and delete on-device encryption keys. This action cannot be undone.
              </p>

              <button
                onClick={handleDeleteAccount}
                className="mt-6 w-full h-12 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider active:scale-[0.98] transition-transform cursor-pointer"
              >
                Suspend Account
              </button>

              <button
                onClick={() => setShowDeleteModal(false)}
                className="mt-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest hover:text-slate-300 cursor-pointer"
              >
                Go Back
              </button>
            </div>
          </div>
        )}

      </div>
    </MobileFrame>
  )
}
