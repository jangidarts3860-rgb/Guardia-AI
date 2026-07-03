'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Shield, Fingerprint, Lock, CheckCircle2, UserPlus, Info, Zap, Eye } from 'lucide-react'
import Image from 'next/image'
import MobileFrame from '@/components/MobileFrame'
import { ThemeToggle } from '@/components/theme-toggle'

export default function LoginPage() {
  const router = useRouter()
  
  const [mobile, setMobile] = useState('')
  const [pin, setPin] = useState<string[]>([])
  const [pinError, setPinError] = useState(false)
  const [biometricScanning, setBiometricScanning] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleKeypadPress = (val: string) => {
    if (pin.length < 6) {
      const newPin = [...pin, val]
      setPin(newPin)
      setPinError(false)

      if (newPin.length === 6) {
        const pinString = newPin.join('')
        if (pinString === '123456' || mobile.length === 10) {
          if (!localStorage.getItem('guardia_user_name')) {
            localStorage.setItem('guardia_user_name', 'Rohan Kumar')
          }
          
          const onboarded = localStorage.getItem('guardia_onboarded')
          setTimeout(() => {
            if (onboarded === 'true') {
              router.push('/home')
            } else {
              router.push('/permissions')
            }
          }, 300)
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
      setTimeout(() => {
        if (onboarded === 'true') {
          router.push('/home')
        } else {
          router.push('/permissions')
        }
      }, 300)
    }, 2000)
  }

  if (!mounted) return null

  return (
    <MobileFrame>
      <div className="relative min-h-full bg-gradient-to-b from-[#0A0A0A] via-[#0F0F1E] to-[#0A0A0A] overflow-hidden flex flex-col">
        {/* Animated background gradient orbs */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-30%] right-[-10%] w-96 h-96 bg-gradient-to-br from-[#8537FD]/15 to-transparent rounded-full blur-3xl animate-float-slow" />
          <div className="absolute bottom-[-20%] left-[-10%] w-80 h-80 bg-gradient-to-br from-[#E837FD]/10 to-transparent rounded-full blur-3xl animate-drift" />
        </div>

        <div className="relative px-4 pt-8 pb-10 flex flex-col text-slate-100 select-none flex-1">
          
          {/* Theme Toggle Button */}
          <div className="flex justify-end mb-4 animate-fade-in-right" style={{ animationDelay: '0.3s' }}>
            <ThemeToggle />
          </div>

          {/* HEADER - Animated entrance with spring effect */}
          <div className="flex flex-col items-center text-center mt-6 animate-fade-in-down" style={{ animationDelay: '0.1s' }}>
            <div className="relative animate-bounce-soft">
              {/* Glow effect behind logo */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#8537FD]/40 to-[#AFFD37]/20 rounded-full blur-2xl animate-pulse-scale" />
              
              {/* Animated Shield Logo */}
              <div className="relative w-28 h-28 rounded-full flex items-center justify-center animate-scale-in-spring">
                <Image
                  src="/guardia-logo.png"
                  alt="Guardia AI Shield Logo"
                  width={112}
                  height={112}
                  className="w-28 h-28 object-contain drop-shadow-2xl animate-glow-pulse"
                  priority
                />
              </div>
            </div>
            
            <h2 className="text-3xl font-black bg-gradient-to-r from-[#8537FD] to-[#AFFD37] bg-clip-text text-transparent mt-8 tracking-tight animate-fade-in-up" style={{ animationDelay: '0.2s' }}>Guardian AI</h2>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-2 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>Financial Protection Powered by AI</p>
          </div>

          {/* MOBILE NUMBER INPUT - Animated with focus states */}
          <div className="mt-10 flex flex-col gap-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="group">
              <label className="text-xs text-slate-500 font-bold uppercase tracking-widest block mb-2.5 px-1 group-focus-within:text-[#8537FD] transition-colors">📱 Mobile Number</label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-sm font-bold text-slate-600 group-focus-within:text-[#8537FD] transition-colors font-mono">+91</span>
                <input
                  type="tel"
                  maxLength={10}
                  name="mobile"
                  autoComplete="tel-national"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                  placeholder="98765 43210"
                  className="w-full h-13 pl-16 pr-4 rounded-2xl bg-white/5 border border-white/15 focus:outline-none focus:ring-2 focus:ring-[#8537FD] focus:ring-offset-2 focus:ring-offset-[#0A0A0A] hover:border-white/30 focus:border-[#8537FD] group-focus-within:bg-[#8537FD]/5 transition-all text-sm font-bold text-white placeholder-slate-600 font-mono shadow-lg shadow-black/20"
                />
              </div>
            </div>

            {/* PIN INPUT - Premium dots with animation */}
            <div className="group">
              <label className="text-xs text-slate-500 font-bold uppercase tracking-widest block mb-4 px-1 group-focus-within:text-[#8537FD] transition-colors">🔐 Guardian PIN</label>
              <div className={`flex justify-center gap-4 px-6 py-8 bg-white/3 rounded-3xl border border-white/10 group-focus-within:border-[#8537FD]/40 group-focus-within:bg-[#8537FD]/5 transition-all shadow-lg shadow-black/20 ${pinError ? 'animate-wiggle' : ''}`}>
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-5 h-5 rounded-full border-2 transition-all duration-300 ${
                      i < pin.length
                        ? 'bg-gradient-to-br from-[#AFFD37] to-[#8537FD] border-[#AFFD37] shadow-lg shadow-[#AFFD37]/50 scale-110 animate-scale-in-spring'
                        : pinError
                          ? 'border-red-500/60 bg-red-500/10 animate-pulse'
                          : 'border-white/40 bg-white/5'
                    }`}
                  />
                ))}
              </div>
              {pinError && (
                <p className="text-xs text-red-400 mt-3 text-center font-bold animate-fade-in-up">
                  Incorrect PIN. Try again. Demo: 123456
                </p>
              )}
            </div>
          </div>

          {/* KEYPAD - Premium design with stagger animation */}
          <div className="mt-auto mb-8 w-full max-w-80 mx-auto">
            <div className="grid grid-cols-3 gap-4 stagger-children">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((val) => (
                <button
                  key={val}
                  onClick={() => handleKeypadPress(val)}
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/15 to-white/5 border border-white/20 hover:from-white/25 hover:to-white/10 hover:border-[#8537FD]/50 flex items-center justify-center font-black text-2xl text-white hover:text-[#AFFD37] active:scale-75 transition-all cursor-pointer shadow-lg shadow-black/30 hover:shadow-[#8537FD]/20 group"
                  aria-label={`Press ${val}`}
                >
                  <span className="group-active:scale-125 transition-transform">{val}</span>
                </button>
              ))}
              
              {/* Biometric button */}
              <button
                onClick={triggerBiometrics}
                disabled={biometricScanning}
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8537FD]/40 to-[#E837FD]/30 border border-[#8537FD]/60 hover:from-[#8537FD]/60 hover:to-[#E837FD]/50 hover:border-[#8537FD]/80 flex items-center justify-center text-[#AFFD37] active:scale-75 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#8537FD]/20 hover:shadow-[#8537FD]/40 group"
                title="Biometric Login"
                aria-label="Biometric Login"
              >
                <div className="relative">
                  {biometricScanning && (
                    <div className="absolute inset-0 animate-spin">
                      <Zap size={24} className="animate-pulse" />
                    </div>
                  )}
                  <Fingerprint size={24} className={biometricScanning ? 'opacity-0' : 'group-active:scale-125 transition-transform'} />
                </div>
              </button>
              
              {/* 0 button */}
              <button
                onClick={() => handleKeypadPress('0')}
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/15 to-white/5 border border-white/20 hover:from-white/25 hover:to-white/10 hover:border-[#8537FD]/50 flex items-center justify-center font-black text-2xl text-white hover:text-[#AFFD37] active:scale-75 transition-all cursor-pointer shadow-lg shadow-black/30 hover:shadow-[#8537FD]/20 group"
                aria-label="Press 0"
              >
                <span className="group-active:scale-125 transition-transform">0</span>
              </button>
              
              {/* Backspace button */}
              <button
                onClick={handleBackspace}
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/15 to-white/5 border border-white/20 hover:from-white/25 hover:to-white/10 hover:border-red-500/50 flex items-center justify-center text-xl active:scale-75 transition-all cursor-pointer text-slate-500 hover:text-red-400 shadow-lg shadow-black/30 hover:shadow-red-500/20 group font-black"
                aria-label="Clear PIN"
              >
                <span className="group-active:scale-125 transition-transform">←</span>
              </button>
            </div>
          </div>

          {/* SIGNUP LINK - Bottom section */}
          <div className="mt-6 text-center flex flex-col gap-4 animate-fade-in-up pb-4" style={{ animationDelay: '0.5s' }}>
            <button 
              onClick={() => router.push('/signup')}
              className="text-slate-400 font-semibold hover:text-white flex items-center justify-center gap-2 cursor-pointer text-sm group transition-all"
            >
              <UserPlus size={16} className="text-[#8537FD] group-hover:scale-110 transition-transform" />
              <span>New to Guardian? Create Account</span>
            </button>
            <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-500 font-mono">
              Demo PIN: <span className="text-[#AFFD37] font-bold">123456</span> or any 10-digit mobile
            </div>
          </div>
        </div>
      </div>
    </MobileFrame>
  )
}
