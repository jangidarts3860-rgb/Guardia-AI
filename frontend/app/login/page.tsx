'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Shield, Fingerprint, Lock, CheckCircle2, UserPlus, Info } from 'lucide-react'
import MobileFrame from '@/components/MobileFrame'

export default function LoginPage() {
  const router = useRouter()
  
  const [mobile, setMobile] = useState('')
  const [pin, setPin] = useState<string[]>([])
  const [pinError, setPinError] = useState(false)
  const [biometricScanning, setBiometricScanning] = useState(false)

  const handleKeypadPress = (val: string) => {
    if (pin.length < 6) {
      const newPin = [...pin, val]
      setPin(newPin)
      setPinError(false)

      if (newPin.length === 6) {
        const pinString = newPin.join('')
        // Simulate login verification
        if (pinString === '123456' || mobile.length === 10) {
          // Store basic profile info if not present
          if (!localStorage.getItem('guardia_user_name')) {
            localStorage.setItem('guardia_user_name', 'Rohan Kumar')
          }
          
          const onboarded = localStorage.getItem('guardia_onboarded')
          if (onboarded === 'true') {
            router.push('/home')
          } else {
            router.push('/permissions') // Direct entry to onboarding permissions
          }
        } else {
          setPinError(true)
          setTimeout(() => setPin([]), 805)
        }
      }
    }
  }

  const handleBackspace = () => {
    setPin(prev => prev.slice(0, prev.length - 1))
  }

  const triggerBiometrics = () => {
    setBiometricScanning(true)
    setTimeout(() => {
      setBiometricScanning(false)
      if (!localStorage.getItem('guardia_user_name')) {
        localStorage.setItem('guardia_user_name', 'Rohan Kumar')
      }
      const onboarded = localStorage.getItem('guardia_onboarded')
      if (onboarded === 'true') {
        router.push('/home')
      } else {
        router.push('/permissions')
      }
    }, 2000)
  }

  return (
    <MobileFrame>
      <div className="relative px-4 pt-8 pb-10 flex flex-col text-slate-100 min-h-full select-none bg-[#0A0A0A]">
        
        {/* Header logo - Refined */}
        <div className="flex flex-col items-center text-center mt-6">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-[#8537FD]/20 to-[#E837FD]/20 border border-[#8537FD]/30 flex items-center justify-center text-[#AFFD37] shadow-xl shadow-[#8537FD]/10">
            <Shield size={28} aria-hidden="true" />
          </div>
          <h2 className="text-2xl font-black text-white mt-6 tracking-tight">Welcome back</h2>
          <p className="text-xs text-slate-500 font-semibold uppercase tracking-widest mt-2">Guardian AI</p>
        </div>

        {/* Input Details - Refined */}
        <div className="mt-8 flex flex-col gap-5">
          <div>
            <label className="text-xs text-slate-500 font-bold uppercase tracking-widest block mb-2 px-1">Mobile Number</label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-sm font-bold text-slate-500 font-mono">+91</span>
              <input
                type="tel"
                maxLength={10}
                name="mobile"
                autoComplete="tel-national"
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                placeholder="98765 43210"
                className="w-full h-12 pl-14 pr-4 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8537FD] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A] hover:border-white/20 transition-all text-sm font-semibold text-white placeholder-slate-600 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-500 font-bold uppercase tracking-widest block mb-3 px-1">Guardian PIN</label>
            <div className={`flex justify-center gap-3 ${pinError ? 'animate-shake' : ''}`}>
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                    i < pin.length
                      ? 'bg-[#AFFD37] border-[#AFFD37] shadow-lg shadow-[#AFFD37]/30'
                      : pinError
                        ? 'border-red-500/50 bg-red-500/10'
                        : 'border-white/30 bg-transparent'
                  }`}
                />
              ))}
            </div>
            {pinError && <p className="text-xs text-red-400 mt-2 text-center font-semibold">Incorrect PIN</p>}
          </div>
        </div>

        {/* Custom Keypad - Refined */}
        <div className="mt-auto w-full max-w-80 mx-auto grid grid-cols-3 gap-3 text-center text-white pt-8">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((val) => (
            <button
              key={val}
              onClick={() => handleKeypadPress(val)}
              className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 hover:bg-white/20 flex items-center justify-center font-bold text-xl hover:border-white/30 active:scale-90 transition-all cursor-pointer text-white"
              aria-label={`Press ${val}`}
            >
              {val}
            </button>
          ))}
          
          {/* Biometrics button */}
          <button
            onClick={triggerBiometrics}
            className="w-14 h-14 rounded-2xl bg-[#8537FD]/20 border border-[#8537FD]/40 hover:bg-[#8537FD]/30 flex items-center justify-center hover:border-[#8537FD]/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8537FD] active:scale-90 transition-all cursor-pointer text-[#8537FD]"
            title="Biometric Login"
            aria-label="Biometric Login"
          >
            <Fingerprint size={22} aria-hidden="true" />
          </button>
          
          <button
            onClick={() => handleKeypadPress('0')}
            className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 hover:bg-white/20 flex items-center justify-center font-bold text-xl hover:border-white/30 active:scale-90 transition-all cursor-pointer text-white"
            aria-label="Press 0"
          >
            0
          </button>
          
          <button
            onClick={handleBackspace}
            className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 hover:bg-white/20 flex items-center justify-center text-xl active:scale-90 transition-all cursor-pointer text-slate-400 hover:text-slate-300 hover:border-white/30"
            aria-label="Clear PIN"
          >
            ←
          </button>
        </div>

        {/* Signup Link - Refined */}
        <div className="mt-8 text-center flex flex-col gap-3">
          <button 
            onClick={() => router.push('/signup')}
            className="text-slate-400 font-semibold hover:text-white flex items-center justify-center gap-2 cursor-pointer text-sm"
          >
            <UserPlus size={16} className="text-[#8537FD]" />
            <span>New to Guardian? Create Account</span>
          </button>
          <p className="text-xs text-slate-600 font-mono tracking-wider">Demo PIN: 123456</p>
        </div>

        {/* Biometrics scanning sheet overlay */}
        {biometricScanning && (
          <div className="absolute inset-0 bg-[#0C0C0C]/95 backdrop-blur-md z-50 flex flex-col items-center justify-center text-center p-6">
            <div className="relative w-24 h-24 flex items-center justify-center rounded-[24px] overflow-hidden border border-white/10 bg-[#181818] shadow-[0_0_24px_rgba(133,55,253,0.15)]">
              {/* Laser Scanning line */}
              <div className="absolute left-0 right-0 h-[2px] bg-[#AFFD37] shadow-[0_0_8px_#AFFD37] animate-[scan_1.5s_ease-in-out_infinite] z-20" />
              
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:8px_8px]" />
              
              <div className="absolute inset-3 rounded-full border border-dashed border-[#8537FD]/30 animate-[spin_8s_linear_infinite]" />
              
              <Fingerprint size={38} className="text-[#AFFD37] animate-pulse relative z-10" />
            </div>
            <h3 className="text-xs font-bold text-white mt-6 uppercase tracking-widest">Scanning Biometrics</h3>
            <span className="text-[8px] text-[#AFFD37] block mt-1 uppercase font-mono tracking-widest animate-pulse">HUD Sensor Active</span>
            <p className="text-[9px] text-slate-500 mt-2.5 max-w-[180px] leading-relaxed mx-auto">
              Simulating standard hardware sensor validation on local environment…
            </p>
          </div>
        )}

      </div>
    </MobileFrame>
  )
}
