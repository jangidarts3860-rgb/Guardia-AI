'use client'

import React, { useState } from 'react'
import { ArrowLeft, Zap, Scan, Clipboard, CheckCircle2, AlertTriangle, AlertCircle, Sparkles, QrCode } from 'lucide-react'
import MobileFrame from '@/components/MobileFrame'
import BottomNav from '@/components/BottomNav'
import { useRouter } from 'next/navigation'

export default function VerifyScanner() {
  const router = useRouter()
  const [flashlight, setFlashlight] = useState(false)
  const [manualInput, setManualInput] = useState('')
  const [pasteSuccess, setPasteSuccess] = useState(false)
  const [pasteSource, setPasteSource] = useState<'clipboard' | 'simulated' | ''>('')

  // Popular/recent scans logs
  const recentScans = [
    { name: 'Swiggy Instamart', status: 'safe' },
    { name: 'Fake Electricity Link', status: 'scam' },
    { name: 'Zomato Merchant', status: 'safe' },
  ]

  const handleVerify = (text: string) => {
    const trimmed = (text || '').trim()
    if (!trimmed) return

    const isScam = trimmed.toLowerCase().includes('scam') || 
                  trimmed.toLowerCase().includes('bill') || 
                  trimmed.toLowerCase().includes('free') || 
                  trimmed.toLowerCase().includes('electricity') ||
                  trimmed.toLowerCase().includes('verify.kyc')

    // Redirect to analyzing with simulated state
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
      // Fallback for sandboxed browser environment
      setManualInput('http://verify.kyc-update.com/electricity-bill/pay-now')
      setPasteSource('simulated')
      setPasteSuccess(true)
      setTimeout(() => setPasteSuccess(false), 2000)
    }
  }

  return (
    <MobileFrame>
      <div className="relative px-5 pt-5 pb-28 flex flex-col text-slate-100 min-h-full select-none bg-[#0C0C0C]">
        
        {/* Top Header Navigation (Frentix style) */}
        <div className="flex items-center justify-between mt-2 z-10 relative">
          <button 
            onClick={() => router.push('/home')}
            className="w-10 h-10 rounded-full bg-[#181818] border border-white/5 flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
          >
            <ArrowLeft size={18} className="text-slate-300" />
          </button>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Verify Scan</span>
          <button 
            onClick={() => setFlashlight(!flashlight)}
            className={`w-10 h-10 rounded-full border flex items-center justify-center cursor-pointer active:scale-95 transition-transform ${
              flashlight 
                ? 'bg-[#8537FD]/20 border-[#8537FD]/40 text-[#AFFD37]' 
                : 'bg-[#181818] border-white/5 text-slate-300'
            }`}
          >
            <Zap size={18} />
          </button>
        </div>

        {/* Viewfinder Area (Centered) */}
        <div className="mt-8 flex-1 flex flex-col items-center justify-center z-10 relative">
          {/* Animated Viewfinder Box */}
          <div className="relative w-60 h-60 rounded-[32px] overflow-hidden flex items-center justify-center border border-white/5 bg-slate-950/20">
            {/* Viewfinder Corners (Frentix Glowing Purple style) */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-3 border-l-3 border-[#8537FD] rounded-tl-2xl" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-3 border-r-3 border-[#8537FD] rounded-tr-2xl" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-3 border-l-3 border-[#8537FD] rounded-bl-2xl" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-3 border-r-3 border-[#8537FD] rounded-br-2xl" />
            
            {/* Grid Mesh lines inside viewfinder */}
            <div className="absolute inset-4 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:12px_12px] rounded-[20px]" />

            {/* Glowing Scan QR Icon inside */}
            <QrCode size={64} className="text-[#8537FD] opacity-25 animate-pulse" />

            {/* Laser Line Scanning Animation */}
            <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#AFFD37] to-transparent shadow-[0_0_12px_#AFFD37] animate-[scan_2s_ease-in-out_infinite]" />
          </div>

          <p className="text-xs text-slate-400 mt-5 flex items-center gap-1.5 animate-pulse">
            <Scan size={12} className="text-[#8537FD]" />
            <span>Align QR code inside the frame</span>
          </p>
        </div>

        {/* Manual Input Panel (Frentix Bottom Sheet Card) */}
        <div className="mt-6 bg-[#181818] rounded-[28px] p-5 border border-white/5 z-10 relative">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Manual Entry</span>
            {pasteSuccess && (
              <span className="text-[10px] font-bold text-[#AFFD37] animate-fade-in">
                {pasteSource === 'clipboard' ? 'Pasted!' : 'Simulated Link Pasted!'}
              </span>
            )}
          </div>

          {/* Input Box with Paste Button */}
          <div className="mt-3.5 relative flex items-center">
            <input
              type="text"
              name="verify_url"
              autoComplete="off"
              value={manualInput}
              onChange={(e) => setManualInput(e.target.value)}
              placeholder="e.g. pay.swiggy-instamart.in/order-38291…"
              className="w-full h-12 pl-4 pr-12 rounded-xl bg-[#0C0C0C] border border-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8537FD] focus-visible:ring-offset-2 focus-visible:ring-offset-[#181818] text-xs font-medium text-white placeholder-slate-500"
            />
            <button
              onClick={handlePaste}
              className="absolute right-2.5 w-8 h-8 rounded-lg bg-[#181818] border border-white/5 flex items-center justify-center text-[#8537FD] active:scale-95 transition-transform hover:border-white/10 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8537FD]"
              title="Paste clipboard"
              aria-label="Paste from clipboard"
            >
              <Clipboard size={14} aria-hidden="true" />
            </button>
          </div>

          {/* Quick-Test Scenarios (For Behance Presentation) */}
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => handleVerify('verify.kyc-update.com/electricity-bill')}
              className="flex-1 h-7 rounded-lg bg-[#E837FD]/5 border border-[#E837FD]/20 text-[9px] font-extrabold uppercase tracking-wider text-[#E837FD] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1"
            >
              <AlertCircle size={10} />
              <span>Test Scam Link</span>
            </button>
            <button
              onClick={() => handleVerify('pay.swiggy-instamart.in/order-38291')}
              className="flex-1 h-7 rounded-lg bg-[#AFFD37]/5 border border-[#AFFD37]/20 text-[9px] font-extrabold uppercase tracking-wider text-[#AFFD37] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1"
            >
              <CheckCircle2 size={10} />
              <span>Test Safe Link</span>
            </button>
          </div>

          {/* Verify Button */}
          <button
            onClick={() => handleVerify(manualInput)}
            disabled={!manualInput}
            className={`mt-4 w-full h-11 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer flex items-center justify-center gap-1 shadow-md ${
              manualInput 
                ? 'bg-gradient-to-r from-[#8537FD] to-[#E837FD] text-white hover:shadow-[0_8px_20px_rgba(133,55,253,0.2)] active:scale-[0.98]' 
                : 'bg-[#0C0C0C] text-slate-500 border border-white/5'
            }`}
          >
            <span>Verify Source</span>
            <Sparkles size={12} />
          </button>
        </div>

        {/* Recent Scans Pill Logs */}
        <div className="mt-5 flex flex-col gap-2.5 z-10 relative">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1">Recent Checks</span>
          <div className="flex gap-2 flex-wrap">
            {recentScans.map((scan, i) => (
              <div
                key={i}
                className="h-8 px-3 rounded-full bg-[#181818] border border-white/5 flex items-center gap-1.5 cursor-pointer hover:border-white/10"
                onClick={() => handleVerify(scan.name)}
              >
                <div className={`w-1.5 h-1.5 rounded-full ${scan.status === 'safe' ? 'bg-[#AFFD37]' : 'bg-[#E837FD]'}`} />
                <span className="text-[10px] font-bold text-slate-300">{scan.name}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
      
      {/* Floating Bottom Nav */}
      <BottomNav activeTab="verify" />
    </MobileFrame>
  )
}
