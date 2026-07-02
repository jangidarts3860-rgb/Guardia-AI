'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ShieldAlert, CheckCircle2, Lock, Unlock, PhoneCall, MessageCircle, AlertTriangle, AlertCircle, Info, Landmark, HelpCircle, Check, EyeOff, ShieldCheck, Sparkles, X } from 'lucide-react'
import MobileFrame from '@/components/MobileFrame'
import BottomNav from '@/components/BottomNav'

interface BankAccount {
  id: string
  bankName: string
  accNumber: string
  status: 'active' | 'frozen'
  logoColor: string
}

export default function VaultDashboard() {
  const router = useRouter()

  // State controls
  const [isFrozen, setIsFrozen] = useState(false)
  const [showFreezeModal, setShowFreezeModal] = useState(false)
  const [freezing, setFreezing] = useState(false)
  
  // Passcode entry for unfreezing
  const [passcode, setPasscode] = useState<string[]>([])
  const [passcodeError, setPasscodeError] = useState(false)

  // Toggle controls
  const [smsScanning, setSmsScanning] = useState(true)
  const [callProtection, setCallProtection] = useState(true)
  const [autoCancelTrials, setAutoCancelTrials] = useState(true)

  // Linked accounts
  const [accounts, setAccounts] = useState<BankAccount[]>([
    { id: 'hdfc', bankName: 'HDFC Bank Savings', accNumber: '•••• 4521', status: 'active', logoColor: '#3B82F6' },
    { id: 'sbi', bankName: 'State Bank of India', accNumber: '•••• 8834', status: 'active', logoColor: '#0ea5e9' }
  ])

  // Reset passcode states on unlock
  const handleKeypadPress = (val: string) => {
    if (passcode.length < 6) {
      const newPasscode = [...passcode, val]
      setPasscode(newPasscode)
      setPasscodeError(false)

      if (newPasscode.length === 6) {
        const pinString = newPasscode.join('')
        if (pinString === '123456') {
          // Success unfreeze
          setIsFrozen(false)
          setPasscode([])
          setAccounts(prev => prev.map(acc => ({ ...acc, status: 'active' })))
        } else {
          // Failure shake
          setPasscodeError(true)
          setTimeout(() => setPasscode([]), 800)
        }
      }
    }
  }

  const handleKeypadBackspace = () => {
    setPasscode(prev => prev.slice(0, prev.length - 1))
  }

  const triggerFreeze = () => {
    setFreezing(true)
    setTimeout(() => {
      setFreezing(false)
      setShowFreezeModal(false)
      setIsFrozen(true)
      setAccounts(prev => prev.map(acc => ({ ...acc, status: 'frozen' })))
    }, 2500)
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
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Security Vault</span>
          {/* Encrypted status badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#AFFD37] animate-pulse" />
            <span className="text-[8px] font-extrabold text-[#AFFD37] uppercase tracking-wide">Shield On</span>
          </div>
        </div>

        {/* 🚨 FREEZE EMERGENCY BUTTON BLOCK */}
        <div className="mt-6 bg-[#181818] rounded-[28px] p-5 border border-white/5 relative overflow-hidden z-10 flex flex-col items-center text-center">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-[40px] pointer-events-none" />
          
          <div className="w-11 h-11 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500">
            <ShieldAlert size={22} className="animate-pulse" />
          </div>

          <h3 className="text-xs font-bold text-white mt-3.5">Panic Mode Suspension</h3>
          <p className="text-[10px] text-slate-400 mt-1 max-w-[210px] leading-relaxed">
            In case of suspected fraud, block all digital banking and UPI mandates instantly.
          </p>

          <button
            onClick={() => setShowFreezeModal(true)}
            className="mt-4 w-full h-12 rounded-full bg-gradient-to-r from-red-600 via-red-500 to-[#E837FD] hover:shadow-[0_8px_20px_rgba(239,68,68,0.2)] text-white font-extrabold text-xs uppercase tracking-wider active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>Freeze Everything</span>
          </button>
        </div>

        {/* Linked Accounts List */}
        <div className="mt-6 flex flex-col gap-3 z-10 relative">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-1">Linked Accounts</span>
          
          <div className="flex flex-col gap-2.5">
            {accounts.map((acc) => (
              <div 
                key={acc.id}
                className="bg-[#181818] rounded-2xl p-4 border border-white/5 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div 
                    style={{ backgroundColor: acc.logoColor }}
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0"
                  >
                    <Landmark size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white leading-none">{acc.bankName}</h4>
                    <p className="text-[9px] text-slate-500 mt-1.5">{acc.accNumber} · e-Mandate Link</p>
                  </div>
                </div>

                <span className={`h-5 px-2 rounded-full text-[8px] font-bold uppercase tracking-wide flex items-center gap-1 ${
                  acc.status === 'frozen' 
                    ? 'bg-red-500/10 text-red-400 border border-red-500/20' 
                    : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                }`}>
                  <span className={`w-1 h-1 rounded-full ${acc.status === 'frozen' ? 'bg-red-400' : 'bg-emerald-400'}`} />
                  <span>{acc.status}</span>
                </span>
              </div>
            ))}
            
            <button
              onClick={() => alert('Redirecting to RBI Account Aggregator framework onboarding...')}
              className="h-11 rounded-2xl border border-dashed border-white/10 hover:border-[#8537FD]/30 flex items-center justify-center gap-1.5 text-xs text-slate-400 font-bold active:scale-95 transition-all cursor-pointer"
            >
              <span>+ Add Bank Account</span>
            </button>
          </div>
        </div>

        {/* On-Device AI Controls */}
        <div className="mt-6 flex flex-col gap-3 z-10 relative">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-1">AI Privacy & Security Toggles</span>
          
          <div className="bg-[#181818] rounded-[24px] p-1.5 border border-white/5 flex flex-col gap-0.5">
            {/* Toggle 1: SMS Scanning */}
            <div className="flex items-center justify-between p-3.5 border-b border-white/5">
              <div>
                <h4 className="text-xs font-bold text-white">SMS Phishing Scanning</h4>
                <p className="text-[9px] text-slate-500 mt-0.5">Scans UPI collects & OTP urgency details</p>
              </div>
              <button 
                onClick={() => setSmsScanning(!smsScanning)}
                className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${smsScanning ? 'bg-[#AFFD37]' : 'bg-slate-800'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-[#0C0C0C] transition-transform ${smsScanning ? 'translate-x-4' : 'translate-x-0'}`} />
              </button>
            </div>

            {/* Toggle 2: Call Protection */}
            <div className="flex items-center justify-between p-3.5 border-b border-white/5">
              <div>
                <h4 className="text-xs font-bold text-white">Spam Call Shield</h4>
                <p className="text-[9px] text-slate-500 mt-0.5">Real-time warning on voice phishing scams</p>
              </div>
              <button 
                onClick={() => setCallProtection(!callProtection)}
                className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${callProtection ? 'bg-[#AFFD37]' : 'bg-slate-800'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-[#0C0C0C] transition-transform ${callProtection ? 'translate-x-4' : 'translate-x-0'}`} />
              </button>
            </div>

            {/* Toggle 3: Auto-Cancel Trials */}
            <div className="flex items-center justify-between p-3.5">
              <div>
                <h4 className="text-xs font-bold text-white">e-Mandate Pre-revocation</h4>
                <p className="text-[9px] text-slate-500 mt-0.5">Auto-cancels free trials before renewal date</p>
              </div>
              <button 
                onClick={() => setAutoCancelTrials(!autoCancelTrials)}
                className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${autoCancelTrials ? 'bg-[#AFFD37]' : 'bg-slate-800'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-[#0C0C0C] transition-transform ${autoCancelTrials ? 'translate-x-4' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Privacy verification card */}
        <div className="mt-5 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 border border-emerald-500/10 rounded-2xl p-4 z-10 relative flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
            <ShieldCheck size={16} />
          </div>
          <div>
            <span className="text-[10px] font-bold text-white">RBI DPDP Privacy Promise</span>
            <p className="text-[10px] text-slate-400 mt-1 leading-normal">
              0 bytes shared. On-device encryption ensures bank keys never leave this hardware mockup.
            </p>
          </div>
        </div>

        {/* SOS Action List */}
        <div className="mt-6 flex flex-col gap-2 z-10 relative">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-1">Cyber Helpline Shortcuts</span>
          
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => alert('Calling Cyber Cell 1930 Helpline…')}
              className="h-12 rounded-xl bg-[#181818] border border-white/5 flex items-center justify-center gap-2 hover:border-[#8537FD]/30 cursor-pointer active:scale-95 transition-transform"
            >
              <PhoneCall size={14} className="text-red-500" />
              <span className="text-[10px] font-extrabold uppercase tracking-wider">Call 1930 SOS</span>
            </button>
            <button
              onClick={() => alert('Launching cyber crime complaint wizard…')}
              className="h-12 rounded-xl bg-[#181818] border border-white/5 flex items-center justify-center gap-2 hover:border-[#8537FD]/30 cursor-pointer active:scale-95 transition-transform"
            >
              <MessageCircle size={14} className="text-[#38BDF8]" />
              <span className="text-[10px] font-extrabold uppercase tracking-wider">Report Fraud</span>
            </button>
          </div>
        </div>

        {/* 1. CONFIRMATION SHEET OVERLAY */}
        {showFreezeModal && (
          <div className="absolute inset-0 bg-[#0C0C0C]/90 backdrop-blur-sm z-50 flex flex-col justify-end">
            <div className="bg-[#181818] rounded-t-[32px] p-6 border-t border-white/10 flex flex-col items-center text-center max-h-[85%] overflow-y-auto">
              
              <button 
                onClick={() => setShowFreezeModal(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#0C0C0C] flex items-center justify-center text-slate-400 active:scale-95 cursor-pointer"
              >
                <X size={16} />
              </button>

              {freezing ? (
                <div className="py-10 flex flex-col items-center">
                  <div className="relative w-20 h-20 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-2 border-red-500/20 animate-ping" />
                    <div className="absolute w-14 h-14 rounded-full border-2 border-red-500/40 animate-pulse" />
                    <div className="w-10 h-10 rounded-full bg-[#0C0C0C] border border-red-500/40 flex items-center justify-center text-red-500 animate-spin">
                      <Lock size={20} />
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-white mt-6">Suspending All Mandates</h3>
                  <p className="text-[10px] text-slate-400 mt-2 max-w-[200px]">
                    Instructing Axis Aggregator to freeze e-mandate interfaces…
                  </p>
                </div>
              ) : (
                <div className="py-2">
                  <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 mx-auto">
                    <AlertTriangle size={22} className="animate-bounce" />
                  </div>

                  <h3 className="text-sm font-bold text-white mt-4">Confirm Emergency Suspension</h3>
                  <p className="text-[10px] text-slate-400 mt-2 leading-relaxed max-w-[240px]">
                    This will block all linked savings accounts (HDFC, SBI) and immediately reject all incoming auto-debit payments.
                  </p>

                  <div className="mt-5 bg-[#0C0C0C] rounded-xl p-3 border border-white/5 w-full min-w-[260px] flex justify-between items-center text-[10px] text-slate-500">
                    <span>Block target</span>
                    <span className="font-bold text-red-400">All Linked savings & mandates</span>
                  </div>

                  <button
                    onClick={triggerFreeze}
                    className="mt-6 w-full h-12 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider active:scale-[0.98] transition-transform cursor-pointer"
                  >
                    Confirm Blockade
                  </button>

                  <button
                    onClick={() => setShowFreezeModal(false)}
                    className="mt-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest hover:text-slate-300 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              )}

            </div>
          </div>
        )}

        {/* 2. FROZEN BLOCKED MODE LOCK OVERLAY */}
        {isFrozen && (
          <div className="absolute inset-0 bg-[#1F0606]/95 backdrop-blur-md z-50 flex flex-col justify-between p-6">
            
            {/* Header Lock Info */}
            <div className="flex flex-col items-center text-center mt-12">
              <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 shadow-[0_0_24px_rgba(239,68,68,0.2)] animate-pulse">
                <Lock size={28} />
              </div>
              <h2 className="text-xl font-extrabold text-white mt-4 tracking-tight">ALL ACCOUNTS FROZEN</h2>
              <span className="text-[9px] font-extrabold text-red-400 uppercase tracking-wider mt-1.5 px-2.5 py-1 rounded bg-red-500/10 border border-red-500/20">
                Mandates Suspended
              </span>
              <p className="text-[10px] text-slate-400 mt-3 max-w-[220px] leading-relaxed">
                UPI interfaces, debit cards, and auto-debit payments are blocked. Enter your security PIN to restore.
              </p>
            </div>

            {/* Passcode dots */}
            <div className="flex flex-col items-center">
              <div className={`flex justify-center gap-3.5 ${passcodeError ? 'animate-shake' : ''}`}>
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-3.5 h-3.5 rounded-full border transition-all duration-150 ${
                      i < passcode.length
                        ? 'bg-red-500 border-red-500'
                        : passcodeError
                          ? 'border-red-500 bg-red-500/10'
                          : 'border-white/20 bg-transparent'
                    }`}
                  />
                ))}
              </div>
              
              {passcodeError ? (
                <span className="text-[9px] font-bold text-red-400 mt-4 uppercase animate-pulse">Incorrect security PIN. Try again.</span>
              ) : (
                <span className="text-[9px] text-slate-500 mt-4 uppercase">Enter security PIN (hint: 123456)</span>
              )}
            </div>

            {/* Custom Keypad block */}
            <div className="w-full max-w-[280px] mx-auto grid grid-cols-3 gap-y-3 gap-x-6 pb-6 text-center text-white">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((val) => (
                <button
                  key={val}
                  onClick={() => handleKeypadPress(val)}
                  className="w-14 h-14 rounded-full bg-white/5 border border-white/5 flex items-center justify-center font-bold text-lg hover:bg-white/10 active:scale-90 transition-transform cursor-pointer mx-auto"
                >
                  {val}
                </button>
              ))}
              <div />
              <button
                onClick={() => handleKeypadPress('0')}
                className="w-14 h-14 rounded-full bg-white/5 border border-white/5 flex items-center justify-center font-bold text-lg hover:bg-white/10 active:scale-90 transition-transform cursor-pointer mx-auto"
              >
                0
              </button>
              <button
                onClick={handleKeypadBackspace}
                className="w-14 h-14 rounded-full bg-transparent flex items-center justify-center font-bold text-sm active:scale-90 transition-transform cursor-pointer mx-auto text-slate-400"
              >
                Clear
              </button>
            </div>

          </div>
        )}

      </div>

      {/* Bottom nav menu */}
      <BottomNav activeTab="vault" />
    </MobileFrame>
  )
}
