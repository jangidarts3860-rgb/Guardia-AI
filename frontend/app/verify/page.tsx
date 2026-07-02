'use client'

import React, { useState, useEffect } from 'react'
import { ArrowLeft, Zap, Scan, Clipboard, CheckCircle2, AlertTriangle, AlertCircle, Sparkles, QrCode, Lock, ChevronRight } from 'lucide-react'
import MobileFrame from '@/components/MobileFrame'
import BottomNav from '@/components/BottomNav'
import { useRouter } from 'next/navigation'

export default function VerifyScanner() {
  const router = useRouter()
  const [flashlight, setFlashlight] = useState(false)
  const [manualInput, setManualInput] = useState('')
  const [pasteSuccess, setPasteSuccess] = useState(false)
  const [pasteSource, setPasteSource] = useState<'clipboard' | 'simulated' | ''>('')
  const [mounted, setMounted] = useState(false)
  const [scanActive, setScanActive] = useState(true)

  const recentScans = [
    { name: 'Swiggy Instamart', status: 'safe', icon: CheckCircle2 },
    { name: 'Fake Electricity Link', status: 'scam', icon: AlertTriangle },
    { name: 'Zomato Merchant', status: 'safe', icon: CheckCircle2 },
  ]

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleVerify = (text: string) => {
    const trimmed = (text || '').trim()
    if (!trimmed) return

    const isScam = trimmed.toLowerCase().includes('scam') || 
                  trimmed.toLowerCase().includes('bill') || 
                  trimmed.toLowerCase().includes('free') || 
                  trimmed.toLowerCase().includes('electricity') ||
                  trimmed.toLowerCase().includes('verify.kyc')

    router.push(`/verify/analyzing?type=${isScam ? 'scam' : 'safe'}&payload=${encodeURIComponent(trimmed)}`)
  }

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      setManualInput((text || '').trim())
      setPasteSource('clipboard')
      setPasteSuccess(true)
      setTimeout(() => setPasteSuccess(false), 2000)
    } catch (err) {
      setManualInput('http://verify.kyc-update.com/electricity-bill/pay-now')
      setPasteSource('simulated')
      setPasteSuccess(true)
      setTimeout(() => setPasteSuccess(false), 2000)
    }
  }

  if (!mounted) return null

  return (
    <MobileFrame>
      <div className="relative min-h-full bg-gradient-to-b from-[#0A0A0A] via-[#0F0F1E] to-[#0A0A0A] overflow-hidden flex flex-col">
        {/* Animated background gradients */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-30%] right-[-10%] w-96 h-96 bg-gradient-to-br from-[#8537FD]/20 to-transparent rounded-full blur-3xl animate-float-slow" />
          <div className="absolute bottom-[-20%] left-[-10%] w-80 h-80 bg-gradient-to-br from-[#E837FD]/10 to-transparent rounded-full blur-3xl animate-drift" />
        </div>

        <div className="relative px-4 pt-4 pb-28 flex flex-col text-slate-100 min-h-full select-none">
          
          {/* HEADER - Animated entrance */}
          <div className="flex items-center justify-between mt-2 z-10 relative animate-fade-in-down">
            <button 
              onClick={() => router.push('/home')}
              className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 hover:bg-white/20 hover:border-[#8537FD]/40 flex items-center justify-center cursor-pointer active:scale-90 transition-all hover-lift group"
            >
              <ArrowLeft size={18} className="text-slate-300 group-hover:text-[#8537FD] transition-colors" />
            </button>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-300">🔍 Verify & Scan</span>
            <button 
              onClick={() => setFlashlight(!flashlight)}
              className={`w-10 h-10 rounded-2xl border flex items-center justify-center cursor-pointer active:scale-90 transition-all hover-lift group ${
                flashlight 
                  ? 'bg-gradient-to-br from-[#AFFD37]/30 to-[#8537FD]/20 border-[#AFFD37]/60 text-[#AFFD37] shadow-lg shadow-[#AFFD37]/30' 
                  : 'bg-white/10 border-white/20 text-slate-300 hover:bg-white/20 hover:border-[#AFFD37]/40 group-hover:text-[#AFFD37]'
              }`}
            >
              <Zap size={18} />
            </button>
          </div>

          {/* SCANNER AREA - Premium animated viewfinder */}
          <div className="mt-10 flex-1 flex flex-col items-center justify-center z-10 relative animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            {/* Animated Viewfinder */}
            <div className="relative group">
              {/* Outer glow effect */}
              <div className="absolute inset-0 w-72 h-72 rounded-3xl bg-gradient-to-r from-[#8537FD] via-[#E837FD] to-[#AFFD37] opacity-0 group-hover:opacity-40 blur-2xl transition-opacity duration-500 animate-pulse-scale" />
              
              {/* Main viewfinder */}
              <div className="relative w-72 h-72 rounded-3xl overflow-hidden flex items-center justify-center border-2 border-[#8537FD]/40 bg-gradient-to-br from-slate-950/40 to-slate-900/20 shadow-2xl shadow-[#8537FD]/20">
                {/* Grid pattern background */}
                <div className="absolute inset-4 bg-[linear-gradient(rgba(133,55,253,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(133,55,253,0.05)_1px,transparent_1px)] bg-[size:16px_16px] rounded-2xl" />

                {/* Corner markers */}
                <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#8537FD]/60" />
                <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#8537FD]/60" />
                <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#8537FD]/60" />
                <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#8537FD]/60" />

                {/* Central QR icon with pulsing effect */}
                <div className="relative z-10">
                  <div className="absolute inset-0 w-20 h-20 rounded-full bg-gradient-to-br from-[#8537FD]/30 to-[#E837FD]/20 blur-2xl animate-pulse-scale" />
                  <QrCode size={72} className="relative text-[#AFFD37] drop-shadow-lg animate-float" />
                </div>

                {/* Scanning laser line */}
                {scanActive && (
                  <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#AFFD37] to-transparent shadow-[0_0_16px_#AFFD37] animate-[scan_2.5s_ease-in-out_infinite]" />
                )}

                {/* Animated borders */}
                <div className="absolute inset-0 rounded-3xl border border-transparent animate-border-glow" style={{ borderColor: 'rgba(133, 55, 253, 0.4)' }} />
              </div>
            </div>

            {/* Scanning instructions */}
            <div className="mt-8 text-center space-y-2 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <p className="text-sm font-bold text-white">Position QR code in frame</p>
              <p className="text-xs text-slate-500 flex items-center justify-center gap-1.5">
                <Scan size={13} className="text-[#8537FD] animate-pulse" />
                <span>Scanning active</span>
              </p>
            </div>
          </div>

          {/* MANUAL INPUT SECTION */}
          <div className="mt-8 space-y-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Or enter URL manually</label>
              <div className="relative group">
                <input
                  type="text"
                  value={manualInput}
                  onChange={(e) => setManualInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleVerify(manualInput)}
                  placeholder="Paste suspicious link here..."
                  className="w-full h-12 pl-4 pr-16 rounded-2xl bg-white/5 border border-white/15 focus:outline-none focus:ring-2 focus:ring-[#8537FD] focus:ring-offset-2 focus:ring-offset-[#0A0A0A] hover:border-white/30 focus:border-[#8537FD] group-focus-within:bg-[#8537FD]/5 transition-all text-sm font-medium text-white placeholder-slate-600"
                />
                <button
                  onClick={handlePaste}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#8537FD] to-[#E837FD] text-white text-xs font-bold hover:shadow-lg hover:shadow-[#8537FD]/40 active:scale-90 transition-all"
                >
                  Paste
                </button>
              </div>
            </div>

            {/* Verify Button */}
            <button
              onClick={() => handleVerify(manualInput)}
              disabled={!manualInput}
              className="w-full h-12 rounded-2xl bg-gradient-to-r from-[#8537FD] to-[#E837FD] text-white font-bold uppercase tracking-widest text-sm hover:shadow-lg hover:shadow-[#8537FD]/40 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-all flex items-center justify-center gap-2 group"
            >
              <Lock size={16} />
              <span>Verify Link</span>
            </button>
          </div>

          {/* RECENT SCANS */}
          <div className="mt-8 space-y-3 animate-fade-in-up stagger-children" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">Recent Scans</h3>
            {recentScans.map((scan, idx) => {
              const Icon = scan.status === 'safe' ? CheckCircle2 : AlertTriangle
              return (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/10 hover:border-white/20 transition-all group cursor-pointer"
                  style={{ animationDelay: `${0.1 * (idx + 1)}s` }}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                    scan.status === 'safe'
                      ? 'bg-emerald-500/20 border border-emerald-500/40'
                      : 'bg-red-500/20 border border-red-500/40'
                  }`}>
                    <Icon size={18} className={scan.status === 'safe' ? 'text-emerald-400' : 'text-red-400'} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-white">{scan.name}</p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {scan.status === 'safe' ? '✓ Safe & verified' : '⚠ Potential scam detected'}
                    </p>
                  </div>
                  <ChevronRight size={16} className="text-slate-600 group-hover:text-slate-400 transition-colors" />
                </div>
              )
            })}
          </div>
        </div>

        <BottomNav />
      </div>
    </MobileFrame>
  )
}
