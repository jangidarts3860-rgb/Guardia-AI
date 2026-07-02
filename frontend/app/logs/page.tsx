'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Share2, Calendar, ShieldCheck, ShieldAlert, AlertTriangle, CheckCircle2, ChevronRight, X, Sparkles, MessageSquare, Download, MessageCircle } from 'lucide-react'
import MobileFrame from '@/components/MobileFrame'
import { getStoredSubscriptions, StoredSubscription } from '@/lib/storage'

interface LogItem {
  id: string
  type: 'blocked' | 'cancelled' | 'verified' | 'warning'
  title: string
  description: string
  time: string
  score?: number
  payload?: string
  details: string[]
}

export default function SafetyLogs() {
  const router = useRouter()
  const [filter, setFilter] = useState<'all' | 'blocked' | 'cancelled' | 'verified'>('all')
  const [subs, setSubs] = useState<StoredSubscription[]>([])

  // Modal states
  const [selectedLog, setSelectedLog] = useState<LogItem | null>(null)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showShareCard, setShowShareCard] = useState(false)

  // Date picker selection mockup
  const [startDate, setStartDate] = useState('01 Jul 2026')
  const [endDate, setEndDate] = useState('02 Jul 2026')
  const [selectedStartDay, setSelectedStartDay] = useState<number | null>(1)
  const [selectedEndDay, setSelectedEndDay] = useState<number | null>(2)

  useEffect(() => {
    setSubs(getStoredSubscriptions())
  }, [])

  // Dynamic cancel savings calculation
  const cancelledSubs = subs.filter(s => s.isCancelled)
  const totalSavedYearly = cancelledSubs.reduce((acc, s) => acc + (s.cost * 12), 0)
  const totalCancelledCount = cancelledSubs.length

  // Base static logs
  const staticLogs: LogItem[] = [
    {
      id: 'log-1',
      type: 'blocked',
      title: 'Scam Blocked',
      description: 'Electricity bill phishing link blocked',
      time: '2h ago',
      score: 12,
      payload: 'verify.kyc-update.com/electricity-bill',
      details: [
        'Payee: Unregistered unknown merchant',
        'Requested: ₹8,500 via auto-debit',
        'Flagged: Domain registered 2 hours ago',
        'Reports: 47 spam reports in the last hour'
      ]
    },
    {
      id: 'log-2',
      type: 'verified',
      title: 'Payment Verified Safe',
      description: 'Swiggy Instamart Order',
      time: '5h ago',
      score: 96,
      payload: 'pay.swiggy.in/order-93821',
      details: [
        'Payee: Swiggy Instamart (Verified)',
        'Requested: ₹342 via UPI mandate',
        'GST invoice attached & validated',
        'Merchant tenure: Verified since 2019'
      ]
    },
    {
      id: 'log-3',
      type: 'warning',
      title: 'Warning Alert Sent',
      description: 'Unusual auto-debit of ₹299 detected',
      time: '2d ago',
      score: 45,
      payload: 'axis-collect.in/merchant-trial',
      details: [
        'Payee: Unknown recurring merchant',
        'Requested: ₹299 monthly billing',
        'Flagged: Rolling mandate without explicit user use',
        'Recommendation: Inspect mandate detail'
      ]
    }
  ]

  // Add cancelled mandates from local storage to logs dynamically!
  const dynamicLogs: LogItem[] = cancelledSubs.map((sub, i) => ({
    id: `dyn-log-${sub.id}`,
    type: 'cancelled',
    title: 'Mandate Revoked',
    description: `Axis e-mandate for ${sub.name} cancelled`,
    time: '1h ago',
    score: 100,
    payload: `mandate:axis:${sub.id}`,
    details: [
      `Payee: ${sub.name}`,
      `Mandate Rate: ₹${sub.cost}/mo`,
      `Savings generated: ₹${sub.cost * 12}/yr`,
      `Status: Suspended & revoked on Axis Bank API`
    ]
  }))

  const allLogs = [...dynamicLogs, ...staticLogs]

  // Filter logs
  const filteredLogs = allLogs.filter(log => {
    if (filter === 'all') return true
    return log.type === filter
  })

  // Log icons helper
  const getLogIcon = (type: LogItem['type']) => {
    switch (type) {
      case 'blocked': return <ShieldAlert size={16} className="text-red-400" aria-hidden="true" />
      case 'cancelled': return <X size={16} className="text-slate-400" aria-hidden="true" />
      case 'verified': return <ShieldCheck size={16} className="text-[#AFFD37]" aria-hidden="true" />
      case 'warning': return <AlertTriangle size={16} className="text-yellow-400" aria-hidden="true" />
    }
  }

  // Border helper
  const getLogBorder = (type: LogItem['type']) => {
    switch (type) {
      case 'blocked': return 'border-red-500/20 hover:border-red-500/35 bg-red-500/5'
      case 'cancelled': return 'border-white/5 hover:border-white/10'
      case 'verified': return 'border-emerald-500/10 hover:border-emerald-500/20 bg-emerald-500/5'
      case 'warning': return 'border-yellow-500/15 hover:border-yellow-500/25 bg-yellow-500/5'
    }
  }

  return (
    <MobileFrame>
      <div className="relative px-5 pt-5 pb-28 flex flex-col text-slate-100 min-h-full select-none bg-[#0C0C0C]">
        
        {/* Top Header Navigation */}
        <div className="flex items-center justify-between mt-2 z-10 relative">
          <button 
            onClick={() => router.push('/home')}
            className="w-9 h-9 rounded-full bg-[#181818] border border-white/5 flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
            aria-label="Back to Home"
          >
            <ArrowLeft size={16} className="text-slate-300" aria-hidden="true" />
          </button>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Safety Timeline</span>
          <button 
            onClick={() => setShowShareCard(true)}
            className="w-9 h-9 rounded-full bg-[#8537FD]/20 border border-[#8537FD]/30 flex items-center justify-center text-white cursor-pointer active:scale-95 transition-transform"
            title="Share Victory Card"
            aria-label="Share Victory Card"
          >
            <Share2 size={15} aria-hidden="true" />
          </button>
        </div>

        {/* Date Filter & Search bar row */}
        <div className="mt-6 flex items-center gap-3.5 z-10 relative">
          <button
            onClick={() => setShowDatePicker(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#181818] border border-white/5 text-[10px] font-bold text-slate-300 hover:border-white/10 active:scale-95 transition-all cursor-pointer"
            aria-label="Open date range filter"
          >
            <Calendar size={12} className="text-[#8537FD]" aria-hidden="true" />
            <span>{startDate} – {endDate}</span>
          </button>
        </div>

        {/* Horizontal Filter Pills */}
        <div className="mt-5 flex gap-2 overflow-x-auto no-scrollbar pb-1 z-10 relative">
          {[
            { id: 'all', label: 'All Spends' },
            { id: 'blocked', label: 'Blocked Scams' },
            { id: 'cancelled', label: 'Cancelled' },
            { id: 'verified', label: 'Verified' }
          ].map((pill) => (
            <button
              key={pill.id}
              onClick={() => setFilter(pill.id as any)}
              className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer shrink-0 border ${
                filter === pill.id 
                  ? 'bg-gradient-to-r from-[#8537FD] to-[#E837FD] text-white border-transparent' 
                  : 'bg-[#181818] text-slate-400 border-white/5 hover:text-white'
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>

        {/* Timeline Log Items list */}
        <div className="mt-6 flex-1 flex flex-col gap-3.5 z-10 relative">
          {filteredLogs.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-10">
              <ShieldCheck size={40} className="text-slate-600 animate-pulse" />
              <p className="text-xs font-bold text-slate-500 mt-4">No logged items in this category</p>
              <button
                onClick={() => setFilter('all')}
                className="mt-3 px-4 py-1.5 rounded-full border border-[#8537FD]/40 text-[#E837FD] text-[9px] font-bold uppercase tracking-wider active:scale-95 transition-all cursor-pointer"
              >
                Reset Filter
              </button>
            </div>
          ) : (
            filteredLogs.map((log) => (
              <div
                key={log.id}
                onClick={() => setSelectedLog(log)}
                className={`p-4 rounded-2xl border flex items-start justify-between gap-3 cursor-pointer transition-all active:scale-[0.99] ${getLogBorder(log.type)}`}
              >
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#0C0C0C] border border-white/5 flex items-center justify-center shrink-0">
                    {getLogIcon(log.type)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white leading-tight">{log.title}</h4>
                    <p className="text-[10px] text-slate-400 mt-1">{log.description}</p>
                    <p className="text-[8px] text-slate-600 mt-1 font-mono">{log.time}</p>
                  </div>
                </div>
                <ChevronRight size={14} className="text-slate-500 shrink-0 self-center" />
              </div>
            ))
          )}
        </div>

        {/* 1. DATE PICKER OVERLAY (Screen 21) */}
        {showDatePicker && (
          <div className="absolute inset-0 bg-[#0C0C0C]/90 backdrop-blur-sm z-50 flex flex-col justify-end">
            <div className="bg-[#181818] rounded-t-[32px] p-6 border-t border-white/10 flex flex-col items-center text-center">
              
              <button 
                onClick={() => setShowDatePicker(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#0C0C0C] flex items-center justify-center text-slate-400 active:scale-95 cursor-pointer"
              >
                <X size={16} />
              </button>

              <h3 className="text-xs font-bold text-white">Select Date Range</h3>
              
              {/* Fully Interactive Calendar Grid */}
              <div className="mt-5 bg-[#0C0C0C] border border-white/5 rounded-2xl p-4 w-full grid grid-cols-7 gap-y-2 text-[10px] font-mono text-center">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
                  <span key={idx} className="font-bold text-slate-600">{day}</span>
                ))}
                {[...Array(28)].map((_, idx) => {
                  const date = idx + 1
                  
                  // Check if selected
                  let isSelected = false
                  if (selectedStartDay !== null && selectedEndDay !== null) {
                    isSelected = date >= selectedStartDay && date <= selectedEndDay
                  } else if (selectedStartDay !== null) {
                    isSelected = date === selectedStartDay
                  }

                  const handleDateClick = () => {
                    if (selectedStartDay !== null && selectedEndDay !== null) {
                      // Reset selection
                      setSelectedStartDay(date)
                      setSelectedEndDay(null)
                      setStartDate(`${date < 10 ? '0' + date : date} Jul 2026`)
                    } else if (selectedStartDay !== null) {
                      if (date < selectedStartDay) {
                        setSelectedStartDay(date)
                        setStartDate(`${date < 10 ? '0' + date : date} Jul 2026`)
                      } else {
                        setSelectedEndDay(date)
                        setEndDate(`${date < 10 ? '0' + date : date} Jul 2026`)
                      }
                    } else {
                      setSelectedStartDay(date)
                      setStartDate(`${date < 10 ? '0' + date : date} Jul 2026`)
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={handleDateClick}
                      className={`h-7 w-7 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
                        isSelected 
                          ? 'bg-[#8537FD] text-white font-bold shadow-[0_0_10px_rgba(133,55,253,0.3)]' 
                          : 'text-slate-400 hover:bg-white/5'
                      }`}
                    >
                      {date}
                    </button>
                  )
                })}
              </div>

              <button
                onClick={() => setShowDatePicker(false)}
                className="mt-6 w-full h-12 rounded-full bg-gradient-to-r from-[#8537FD] to-[#E837FD] text-white font-bold text-xs uppercase tracking-wider active:scale-[0.98] transition-transform cursor-pointer"
              >
                Apply Date Range
              </button>
            </div>
          </div>
        )}

        {/* 2. LOG ITEM DETAILS OVERLAY */}
        {selectedLog && (
          <div className="absolute inset-0 bg-[#0C0C0C]/90 backdrop-blur-sm z-50 flex flex-col justify-end">
            <div className="bg-[#181818] rounded-t-[32px] p-6 border-t border-white/10 flex flex-col items-center text-center">
              
              <button 
                onClick={() => setSelectedLog(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#0C0C0C] flex items-center justify-center text-slate-400 active:scale-95 cursor-pointer"
              >
                <X size={16} />
              </button>

              <div className="w-12 h-12 rounded-full bg-[#0C0C0C] border border-white/5 flex items-center justify-center mx-auto text-white">
                {getLogIcon(selectedLog.type)}
              </div>

              <h3 className="text-sm font-bold text-white mt-4">{selectedLog.title}</h3>
              <p className="text-[10px] text-slate-500 font-mono mt-1">{selectedLog.payload}</p>

              {selectedLog.score !== undefined && (
                <div className="mt-3 flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    selectedLog.score < 50 
                      ? 'bg-red-500/10 text-red-400' 
                      : 'bg-emerald-500/10 text-emerald-400'
                  }`}>
                    Trust Score: {selectedLog.score} / 100
                  </span>
                </div>
              )}

              {/* Bento Details */}
              <div className="mt-5 w-full bg-[#0C0C0C] rounded-2xl p-4 border border-white/5 text-left flex flex-col gap-2.5">
                {selectedLog.details.map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-[10px] text-slate-400 leading-normal">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#AFFD37] mt-1.5 shrink-0" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setSelectedLog(null)}
                className="mt-6 w-full h-12 rounded-full bg-[#181818] border border-white/5 hover:border-white/10 text-white font-bold text-xs uppercase tracking-wider active:scale-[0.98] transition-transform cursor-pointer"
              >
                Close Report
              </button>
            </div>
          </div>
        )}

        {/* 3. SHARE VICTORY CARD OVERLAY (Screen 23) */}
        {showShareCard && (
          <div className="absolute inset-0 bg-[#0C0C0C]/90 backdrop-blur-md z-50 flex flex-col justify-center p-6">
            
            {/* The Shareable Glass-morphism Card Frame */}
            <div className="bg-gradient-to-br from-[#8537FD]/80 via-[#B237FD]/60 to-[#E837FD]/80 backdrop-blur-xl rounded-[32px] p-6 border border-white/20 shadow-2xl relative overflow-hidden text-center text-white">
              
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/10 rounded-full blur-[40px] pointer-events-none" />

              <button 
                onClick={() => setShowShareCard(false)}
                className="absolute top-4 right-4 w-7 h-7 rounded-full bg-black/25 flex items-center justify-center text-white/80 active:scale-95 cursor-pointer"
              >
                <X size={14} />
              </button>

              {/* Logo block */}
              <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center mx-auto text-[#AFFD37] shadow-lg">
                <Sparkles size={20} className="animate-spin" />
              </div>

              <span className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#AFFD37] mt-4 block">
                Guardia AI • Report Card
              </span>

              <h2 className="text-xl font-extrabold mt-1.5 leading-tight tracking-tight">
                My Finances are Protected!
              </h2>

              {/* Stats Block */}
              <div className="mt-6 grid grid-cols-2 gap-3.5">
                <div className="bg-black/20 backdrop-blur-md rounded-2xl p-3 border border-white/5">
                  <span className="text-[8px] uppercase tracking-wider text-white/60 block">Zombie Saved</span>
                  <span className="text-sm font-extrabold font-mono text-[#AFFD37] mt-1 block">
                    ₹{totalSavedYearly > 0 ? totalSavedYearly : 7788}/yr
                  </span>
                </div>
                <div className="bg-black/20 backdrop-blur-md rounded-2xl p-3 border border-white/5">
                  <span className="text-[8px] uppercase tracking-wider text-white/60 block">Blocked Scams</span>
                  <span className="text-sm font-extrabold font-mono text-[#AFFD37] mt-1 block">
                    {totalCancelledCount > 0 ? totalCancelledCount + 1 : 2} Items
                  </span>
                </div>
              </div>

              <p className="text-[10px] text-white/80 mt-5 leading-relaxed max-w-[210px] mx-auto">
                On-device AI intercepted 47 phishing signals Axis Bank e-mandate protected.
              </p>

              {/* QR placeholder */}
              <div className="mt-6 w-20 h-20 bg-white p-2 rounded-xl mx-auto flex items-center justify-center shadow-lg">
                <div className="w-full h-full bg-[#0C0C0C] rounded-lg flex items-center justify-center text-[#AFFD37] font-extrabold text-[8px] tracking-tighter">
                  GUARDIA AI
                </div>
              </div>
              <span className="text-[8px] text-white/60 block mt-1.5 uppercase font-mono tracking-wider">Scan to secure spends</span>
            </div>

            {/* Sharing Intents list */}
            <div className="mt-6 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  alert('Victory card image saved to device storage.')
                  setShowShareCard(false)
                }}
                className="w-full h-12 rounded-full bg-[#181818] border border-white/5 hover:border-white/10 flex items-center justify-center gap-2 text-xs font-bold text-slate-300 cursor-pointer active:scale-95 transition-transform"
              >
                <Download size={14} className="text-[#AFFD37]" />
                <span>Save to Device</span>
              </button>
              <button
                onClick={() => {
                  const savedText = totalSavedYearly > 0 ? `saved ₹${totalSavedYearly}/yr` : "saved ₹7788/yr";
                  const shareMsg = `🛡️ Guardia AI just ${savedText} from zombie subscription leaks! Protect your savings before they charge: http://guardia-ai.in`;
                  window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareMsg)}`, '_blank')
                  setShowShareCard(false)
                }}
                className="w-full h-12 rounded-full bg-[#AFFD37] text-slate-950 flex items-center justify-center gap-2 text-xs font-extrabold uppercase tracking-wider cursor-pointer active:scale-95 transition-transform"
              >
                <MessageCircle size={14} />
                <span>Share via WhatsApp</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </MobileFrame>
  )
}
