'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Landmark, ArrowLeft, ArrowRight, Search, ShieldCheck, RefreshCw, CheckCircle2, Lock } from 'lucide-react'
import MobileFrame from '@/components/MobileFrame'

interface BankOption {
  id: string
  name: string
  logoColor: string
}

export default function BankLinkingPage() {
  const router = useRouter()
  
  // Step control
  const [step, setStep] = useState(1)
  
  // Bank selection state
  const [search, setSearch] = useState('')
  const [selectedBank, setSelectedBank] = useState<BankOption | null>(null)

  // Aggregator auth loading state
  const [loaderIndex, setLoaderIndex] = useState(0)
  const loaderTexts = [
    "Establishing RBI secure channel...",
    "Querying phone account registration...",
    "Authenticating with HDFC Aggregator API...",
    "Fetching active debit mandates..."
  ]

  // Scan state on Success confirmation
  const [scanning, setScanning] = useState(true)
  const [scanText, setScanText] = useState("Analyzing transactions for auto-debits...")

  const banksList: BankOption[] = [
    { id: 'hdfc', name: 'HDFC Bank', logoColor: '#3B82F6' },
    { id: 'sbi', name: 'State Bank of India', logoColor: '#0ea5e9' },
    { id: 'icici', name: 'ICICI Bank', logoColor: '#EA580C' },
    { id: 'axis', name: 'Axis Bank', logoColor: '#BE185D' },
    { id: 'kotak', name: 'Kotak Mahindra', logoColor: '#E11D48' }
  ]

  const filteredBanks = banksList.filter(b => 
    b.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleBankSelect = (bank: BankOption) => {
    setSelectedBank(bank)
    setStep(2)
  }

  // Handle Aggregator loading timer
  useEffect(() => {
    if (step !== 2) return

    const interval = setInterval(() => {
      setLoaderIndex((prev) => (prev < loaderTexts.length - 1 ? prev + 1 : prev))
    }, 800)

    const timer = setTimeout(() => {
      setStep(3)
      // Start scan animation on step 3
      setTimeout(() => {
        setScanText("AI Scanning complete! Found 3 zombie e-mandates.")
        setScanning(false)
      }, 2500)
    }, 3500)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [step])

  const handleComplete = () => {
    // Set onboarding status flags
    localStorage.setItem('guardia_onboarded', 'true')
    router.push('/home')
  }

  return (
    <MobileFrame>
      <div className="relative px-5 pt-8 pb-10 flex flex-col text-slate-100 min-h-full select-none bg-[#0C0C0C]">
        
        {/* Header */}
        <div className="flex items-center justify-between z-10 relative">
          {step > 1 ? (
            <button 
              onClick={() => {
                setStep(step - 1)
                setScanning(true)
                setScanText("Analyzing transactions for auto-debits...")
              }}
              className="w-9 h-9 rounded-full bg-[#181818] border border-white/5 flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
            >
              <ArrowLeft size={16} className="text-slate-300" />
            </button>
          ) : (
            <button 
              onClick={() => router.push('/onboarding')}
              className="w-9 h-9 rounded-full bg-[#181818] border border-white/5 flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
            >
              <ArrowLeft size={16} className="text-slate-300" />
            </button>
          )}
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Step {step} of 3</span>
          <div className="w-9 h-9" />
        </div>

        {/* STEP 1: SELECT BANK */}
        {step === 1 && (
          <div className="mt-6 flex-1 flex flex-col z-10 relative">
            <div>
              <h2 className="text-base font-bold text-white">Select your Bank</h2>
              <p className="text-[9px] text-slate-500 font-semibold uppercase tracking-wider mt-1">Select the bank registered with your phone number</p>
            </div>

            {/* Search filter input */}
            <div className="mt-4 relative flex items-center">
              <Search size={14} className="absolute left-4 text-slate-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search popular banks..."
                className="w-full h-11 pl-10 pr-4 rounded-xl bg-[#181818] border border-white/5 focus:border-[#8537FD] outline-none text-xs font-semibold text-white placeholder-slate-600"
              />
            </div>

            {/* Grid list of popular banks */}
            <div className="mt-6 flex flex-col gap-2.5 overflow-y-auto no-scrollbar max-h-[60%]">
              {filteredBanks.map((bank) => (
                <div
                  key={bank.id}
                  onClick={() => handleBankSelect(bank)}
                  className="bg-[#181818] rounded-xl p-4 border border-white/5 hover:border-[#8537FD]/20 cursor-pointer active:scale-[0.99] transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div 
                      style={{ backgroundColor: bank.logoColor }}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                    >
                      {bank.name.charAt(0)}
                    </div>
                    <span className="text-xs font-bold text-white">{bank.name}</span>
                  </div>
                  <ArrowRight size={14} className="text-slate-600" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: ACC AGGREGATOR CONSENT LOADER */}
        {step === 2 && (
          <div className="mt-8 flex-1 flex flex-col items-center justify-center text-center z-10 relative">
            <div className="relative w-24 h-24 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-[#8537FD]/15 animate-ping" />
              <div className="absolute w-16 h-16 rounded-full border border-dashed border-[#E837FD]/30 animate-[spin_6s_linear_infinite]" />
              <div className="w-12 h-12 rounded-full bg-[#181818] border border-white/10 flex items-center justify-center text-[#AFFD37]">
                <Lock size={20} className="animate-pulse" />
              </div>
            </div>

            <div className="mt-8 max-w-[240px]">
              <span className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#8537FD]">
                Account Aggregator framework
              </span>
              <h2 className="text-base font-bold text-white mt-2 leading-tight">
                Securely Connecting Bank
              </h2>
              <p className="text-[10px] text-slate-400 mt-2">
                RBI-licensed framework provides secure e-mandate data connection.
              </p>
            </div>

            {/* Status list */}
            <div className="mt-8 w-full max-w-[240px] h-10 flex items-center justify-center bg-[#181818] border border-white/5 rounded-xl px-4">
              <span className="text-[10px] font-semibold text-[#AFFD37] animate-pulse">
                {loaderTexts[loaderIndex]}
              </span>
            </div>
          </div>
        )}

        {/* STEP 3: CONFIRMATION & MOCK INITIAL SCAN */}
        {step === 3 && (
          <div className="mt-8 flex-1 flex flex-col items-center justify-center text-center z-10 relative">
            
            <div className="absolute w-44 h-44 bg-gradient-to-tr from-emerald-500/10 to-teal-500/10 rounded-full blur-[40px] opacity-40 animate-pulse" />

            <div className="relative w-20 h-20 rounded-full bg-slate-900 border border-emerald-500/30 flex items-center justify-center shadow-lg">
              <CheckCircle2 size={36} className="text-[#AFFD37]" />
            </div>

            <div className="mt-8 max-w-[240px]">
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#AFFD37]">
                LINK SUCCESSFUL ✓
              </span>
              <h2 className="text-lg font-bold text-white mt-2 tracking-tight">
                {selectedBank?.name} Linked
              </h2>
              <p className="text-[9px] text-slate-500 mt-1 font-mono leading-none">
                Masked A/C: •••• 4521 · Axis AA
              </p>
            </div>

            {/* Initial Scan animation block */}
            <div className="mt-8 w-full max-w-[250px] bg-[#181818] border border-white/5 rounded-2xl p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between text-[9px] text-slate-500 font-bold uppercase tracking-wider">
                <span>Auto-Debit Audit</span>
                {scanning ? (
                  <span className="text-[#8537FD] flex items-center gap-1">
                    <RefreshCw size={8} className="animate-spin" />
                    <span>Auditing...</span>
                  </span>
                ) : (
                  <span className="text-[#AFFD37]">Done</span>
                )}
              </div>

              <p className="text-[10px] font-bold text-slate-300 leading-normal">
                {scanText}
              </p>
            </div>

            <button
              onClick={handleComplete}
              disabled={scanning}
              className={`mt-auto w-full h-12 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-center gap-1 shadow-md ${
                !scanning
                  ? 'bg-gradient-to-r from-[#AFFD37] to-[#8537FD] text-slate-950 hover:shadow-[0_8px_20px_rgba(175,253,55,0.2)] active:scale-[0.98]'
                  : 'bg-[#181818] text-slate-500 border border-white/5'
              }`}
            >
              <span>Go to Dashboard</span>
              <ArrowRight size={14} />
            </button>
          </div>
        )}

      </div>
    </MobileFrame>
  )
}
