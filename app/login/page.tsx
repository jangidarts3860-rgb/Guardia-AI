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
      <div className="relative px-5 pt-8 pb-10 flex flex-col text-slate-100 min-h-full select-none bg-[#0C0C0C]">
        
        {/* Header logo */}
        <div className="flex flex-col items-center text-center mt-4">
          <div className="w-14 h-14 rounded-2xl bg-[#181818] border border-white/10 flex items-center justify-center text-[#AFFD37] shadow-[0_0_24px_rgba(133,55,253,0.15)] animate-[bounce_3s_infinite]">
            <Shield size={24} aria-hidden="true" />
          </div>
          <h2 className="text-lg font-bold text-white mt-4">Welcome back</h2>
          <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mt-0.5">Secure Guardian Gateway</p>
        </div>

        {/* Input Details */}
        <div className="mt-8 flex flex-col gap-3.5">
          <div>
            <label className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block mb-1 px-1">Mobile Number</label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-xs font-bold text-slate-400 font-mono">+91</span>
              <input
                type="tel"
                maxLength={10}
                name="mobile"
                autoComplete="tel-national"
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                placeholder="e.g. 98765 43210…"
                className="w-full h-12 pl-12 pr-4 rounded-2xl bg-[#181818] border border-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8537FD] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0C0C] text-xs font-extrabold text-white placeholder-slate-600 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block mb-2.5 px-1">Guardian PIN</label>
            <div className={`flex justify-center gap-3.5 ${pinError ? 'animate-bounce' : ''}`}>
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className={`w-3.5 h-3.5 rounded-full border transition-all duration-150 ${
                    i < pin.length
                      ? 'bg-[#AFFD37] border-[#AFFD37] shadow-[0_0_10px_rgba(175,253,55,0.4)]'
                      : pinError
                        ? 'border-red-500 bg-red-500/10'
                        : 'border-white/20 bg-transparent'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Custom keypad */}
        <div className="mt-auto w-full max-w-[270px] mx-auto grid grid-cols-3 gap-y-3.5 gap-x-5 text-center text-white pt-6">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((val) => (
            <button
              key={val}
              onClick={() => handleKeypadPress(val)}
              className="w-12 h-12 rounded-full bg-white/5 border border-white/5 flex items-center justify-center font-bold text-lg hover:bg-white/10 active:scale-90 transition-transform cursor-pointer mx-auto"
            >
              {val}
            </button>
          ))}
          
          {/* Biometrics button */}
          <button
            onClick={triggerBiometrics}
            className="w-12 h-12 rounded-full bg-[#8537FD]/10 border border-[#8537FD]/20 flex items-center justify-center hover:bg-[#8537FD]/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8537FD] active:scale-90 transition-transform cursor-pointer mx-auto text-[#8537FD]"
            title="Biometric Login"
            aria-label="Biometric Login"
          >
            <Fingerprint size={20} aria-hidden="true" />
          </button>
          
          <button
            onClick={() => handleKeypadPress('0')}
            className="w-12 h-12 rounded-full bg-white/5 border border-white/5 flex items-center justify-center font-bold text-lg hover:bg-white/10 active:scale-90 transition-transform cursor-pointer mx-auto"
          >
            0
          </button>
          
          <button
            onClick={handleBackspace}
            className="w-12 h-12 rounded-full bg-transparent flex items-center justify-center font-bold text-xs active:scale-90 transition-transform cursor-pointer mx-auto text-slate-500"
          >
            Clear
          </button>
        </div>

        {/* Redirect toggle to signup */}
        <div className="mt-8 text-center flex flex-col gap-2 text-[10px]">
          <button 
            onClick={() => router.push('/signup')}
            className="text-slate-400 font-bold hover:text-white flex items-center justify-center gap-1 cursor-pointer"
          >
            <UserPlus size={12} className="text-[#8537FD]" />
            <span>New user? Create Account</span>
          </button>
          <span className="text-slate-600 font-bold uppercase tracking-wider font-mono">PIN hint: 123456</span>
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
