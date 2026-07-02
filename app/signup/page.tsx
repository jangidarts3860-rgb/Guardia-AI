'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Shield, ArrowRight, ArrowLeft, KeyRound, CheckCircle2, RefreshCw } from 'lucide-react'
import MobileFrame from '@/components/MobileFrame'

export default function SignupPage() {
  const router = useRouter()
  
  // Step control
  const [step, setStep] = useState(1)

  // Step 1: Info inputs
  const [name, setName] = useState('')
  const [mobile, setMobile] = useState('')

  // Step 2: OTP inputs
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [timer, setTimer] = useState(42)

  // Step 3: PIN Setup
  const [pin, setPin] = useState(['', '', '', '', '', ''])
  const [confirmPin, setConfirmPin] = useState(['', '', '', '', '', ''])
  const [pinError, setPinError] = useState(false)

  // Refs for auto-focusing
  const otpRefs = [
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
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
  const confirmPinRefs = [
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null)
  ]

  // OTP Timer countdown
  useEffect(() => {
    if (step !== 2) return
    if (timer <= 0) return

    const countdown = setInterval(() => {
      setTimer((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(countdown)
  }, [timer, step])

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim() && mobile.length === 10) {
      setStep(2)
      setTimer(42)
    }
  }

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault()
    // Verify OTP mockup (e.g. 6 digits filled)
    if (otp.every(d => d !== '')) {
      setStep(3)
    }
  }

  const handleStep3Submit = (e: React.FormEvent) => {
    e.preventDefault()
    const pinStr = pin.join('')
    const confirmPinStr = confirmPin.join('')

    if (pinStr.length === 6 && pinStr === confirmPinStr) {
      // Save info
      localStorage.setItem('guardia_user_name', name)
      localStorage.setItem('guardia_user_phone', `+91 ${mobile}`)
      router.push('/permissions')
    } else {
      setPinError(true)
      setPin(['', '', '', '', '', ''])
      setConfirmPin(['', '', '', '', '', ''])
      setTimeout(() => setPinError(false), 2000)
    }
  }

  return (
    <MobileFrame>
      <div className="relative px-5 pt-8 pb-10 flex flex-col text-slate-100 min-h-full select-none bg-[#0C0C0C]">
        
        {/* Header */}
        <div className="flex items-center justify-between z-10 relative">
          {step > 1 ? (
            <button 
              onClick={() => setStep(step - 1)}
              className="w-9 h-9 rounded-full bg-[#181818] border border-white/5 flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
              aria-label="Back to previous step"
            >
              <ArrowLeft size={16} className="text-slate-300" aria-hidden="true" />
            </button>
          ) : (
            <button 
              onClick={() => router.push('/login')}
              className="w-9 h-9 rounded-full bg-[#181818] border border-white/5 flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
              aria-label="Back to login screen"
            >
              <ArrowLeft size={16} className="text-slate-300" aria-hidden="true" />
            </button>
          )}
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Step {step} of 3</span>
          <div className="w-9 h-9" />
        </div>

        {/* Brand logo & header description */}
        <div className="mt-8 flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-xl bg-[#181818] border border-white/10 flex items-center justify-center text-[#AFFD37]">
            <Shield size={20} aria-hidden="true" />
          </div>
          <h2 className="text-base font-bold text-white mt-4">
            {step === 1 ? 'Create Guardian Profile' : step === 2 ? 'Verify OTP Code' : 'Secure Guardian PIN'}
          </h2>
          <p className="text-[9px] text-slate-500 font-semibold uppercase tracking-wider mt-1">
            {step === 1 ? 'Verify identity via aggregated phone keys' : step === 2 ? `Enter OTP code sent to +91 ${mobile}` : 'Create your 6-digit credential passcode'}
          </p>
        </div>

        {/* STEP 1: IDENTITY */}
        {step === 1 && (
          <form onSubmit={handleStep1Submit} className="mt-8 flex-1 flex flex-col gap-4">
            <div>
              <label className="text-[9px] text-slate-500 font-bold uppercase block mb-1 px-1">Full Name</label>
              <input
                type="text"
                required
                name="name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rohan Kumar…"
                className="w-full h-12 px-4 rounded-2xl bg-[#181818] border border-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8537FD] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0C0C] text-xs font-semibold text-white placeholder-slate-600"
              />
            </div>
            <div>
              <label className="text-[9px] text-slate-500 font-bold uppercase block mb-1 px-1">Mobile Number</label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-xs font-bold text-slate-400 font-mono">+91</span>
                <input
                  type="tel"
                  maxLength={10}
                  required
                  name="mobile"
                  autoComplete="tel-national"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                  placeholder="e.g. 98765 43210…"
                  className="w-full h-12 pl-12 pr-4 rounded-2xl bg-[#181818] border border-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8537FD] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0C0C] text-xs font-extrabold text-white placeholder-slate-600 font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!name.trim() || mobile.length !== 10}
              className={`mt-auto w-full h-12 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-center gap-1 shadow-md ${
                name.trim() && mobile.length === 10
                  ? 'bg-gradient-to-r from-[#8537FD] to-[#E837FD] text-white hover:shadow-[0_8px_20px_rgba(133,55,253,0.2)] active:scale-[0.98]'
                  : 'bg-[#181818] text-slate-500 border border-white/5'
              }`}
            >
              <span>Send OTP Verification</span>
              <ArrowRight size={14} />
            </button>
          </form>
        )}

        {/* STEP 2: OTP VERIFICATION */}
        {step === 2 && (
          <form onSubmit={handleStep2Submit} className="mt-8 flex-1 flex flex-col gap-6">
            <div className="flex justify-center gap-2">
              {[...Array(6)].map((_, i) => (
                <input
                  key={i}
                  ref={(el) => { otpRefs[i].current = el }}
                  type="text"
                  maxLength={1}
                  required
                  value={otp[i]}
                  onChange={(e) => {
                    const val = e.target.value
                    const updated = [...otp]
                    updated[i] = val
                    setOtp(updated)

                    // Auto-focus next input
                    if (val && i < 5) {
                      otpRefs[i + 1].current?.focus()
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace' && !otp[i] && i > 0) {
                      otpRefs[i - 1].current?.focus()
                    }
                  }}
                  placeholder="•"
                  className="w-9 h-11 bg-[#181818] border border-white/5 text-center text-sm font-extrabold text-[#AFFD37] rounded-xl focus:border-[#8537FD] outline-none"
                />
              ))}
            </div>

            <div className="text-center">
              {timer > 0 ? (
                <p className="text-[10px] text-slate-500 font-bold">Resend code in <span className="font-mono text-[#AFFD37]">{timer}s</span></p>
              ) : (
                <button
                  type="button"
                  onClick={() => setTimer(42)}
                  className="text-[10px] text-[#8537FD] font-bold uppercase tracking-wider cursor-pointer hover:text-white flex items-center justify-center gap-1 mx-auto"
                >
                  <RefreshCw size={11} />
                  <span>Resend Verification Code</span>
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={!otp.every(d => d !== '')}
              className={`mt-auto w-full h-12 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-center gap-1 shadow-md ${
                otp.every(d => d !== '')
                  ? 'bg-gradient-to-r from-[#8537FD] to-[#E837FD] text-white hover:shadow-[0_8px_20px_rgba(133,55,253,0.2)] active:scale-[0.98]'
                  : 'bg-[#181818] text-slate-500 border border-white/5'
              }`}
            >
              <span>Verify Code</span>
              <ArrowRight size={14} />
            </button>
          </form>
        )}

        {/* STEP 3: PIN SETUP */}
        {step === 3 && (
          <form onSubmit={handleStep3Submit} className="mt-8 flex-1 flex flex-col gap-5">
            <div>
              <label className="text-[9px] text-slate-500 font-bold uppercase block mb-1 px-1">Define PIN</label>
              <div className="flex justify-center gap-2 mb-2">
                {[...Array(6)].map((_, i) => (
                  <input
                    key={i}
                    ref={(el) => { pinRefs[i].current = el }}
                    type="password"
                    maxLength={1}
                    required
                    value={pin[i]}
                    onChange={(e) => {
                      const val = e.target.value
                      const updated = [...pin]
                      updated[i] = val
                      setPin(updated)

                      // Auto-focus next input
                      if (val && i < 5) {
                        pinRefs[i + 1].current?.focus()
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Backspace' && !pin[i] && i > 0) {
                        pinRefs[i - 1].current?.focus()
                      }
                    }}
                    placeholder="•"
                    className="w-9 h-11 bg-[#181818] border border-white/5 text-center text-sm font-extrabold text-[#AFFD37] rounded-xl focus:border-[#8537FD] outline-none"
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="text-[9px] text-slate-500 font-bold uppercase block mb-1 px-1">Confirm PIN</label>
              <div className="flex justify-center gap-2">
                {[...Array(6)].map((_, i) => (
                  <input
                    key={i}
                    ref={(el) => { confirmPinRefs[i].current = el }}
                    type="password"
                    maxLength={1}
                    required
                    value={confirmPin[i]}
                    onChange={(e) => {
                      const val = e.target.value
                      const updated = [...confirmPin]
                      updated[i] = val
                      setConfirmPin(updated)

                      // Auto-focus next input
                      if (val && i < 5) {
                        confirmPinRefs[i + 1].current?.focus()
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Backspace' && !confirmPin[i] && i > 0) {
                        confirmPinRefs[i - 1].current?.focus()
                      }
                    }}
                    placeholder="•"
                    className="w-9 h-11 bg-[#181818] border border-white/5 text-center text-sm font-extrabold text-[#AFFD37] rounded-xl focus:border-[#8537FD] outline-none"
                  />
                ))}
              </div>
            </div>

            {pinError && (
              <span className="text-[9px] text-red-400 font-bold text-center uppercase animate-pulse">PIN codes do not match. Resetting inputs...</span>
            )}

            <button
              type="submit"
              disabled={!pin.every(d => d !== '') || !confirmPin.every(d => d !== '')}
              className={`mt-auto w-full h-12 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-center gap-1 shadow-md ${
                pin.every(d => d !== '') && confirmPin.every(d => d !== '')
                  ? 'bg-gradient-to-r from-[#AFFD37] to-[#8537FD] text-slate-950 hover:shadow-[0_8px_20px_rgba(175,253,55,0.2)] active:scale-[0.98]'
                  : 'bg-[#181818] text-slate-500 border border-white/5'
              }`}
            >
              <span>Create Account</span>
              <CheckCircle2 size={14} />
            </button>
          </form>
        )}

      </div>
    </MobileFrame>
  )
}
