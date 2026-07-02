'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Users, User, Tv, Music, Dumbbell, AlertTriangle, ChevronRight, Plus, HelpCircle, X, RefreshCw } from 'lucide-react'
import MobileFrame from '@/components/MobileFrame'
import BottomNav from '@/components/BottomNav'
import { getStoredSubscriptions, StoredSubscription } from '@/lib/storage'

const ICON_MAP = {
  ott: Tv,
  music: Music,
  fitness: Dumbbell,
  other: HelpCircle
}

const COLOR_MAP = {
  ott: '#E837FD',
  music: '#AFFD37',
  fitness: '#38BDF8',
  other: '#FDE837'
}

export default function SubscriptionsHub() {
  const router = useRouter()
  const [spendTab, setSpendTab] = useState<'my' | 'family'>('my')
  const [subs, setSubs] = useState<StoredSubscription[]>([])
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  // Modal states for family spends
  const [selectedFamilySub, setSelectedFamilySub] = useState<{ memberId: string; subId: string; subName: string; cost: number; memberName: string } | null>(null)
  const [familySending, setFamilySending] = useState(false)

  const [familySubs, setFamilySubs] = useState([
    {
      id: 'priya',
      member: 'Priya (Wife)',
      subs: [
        { id: 'f-amazon', name: 'Amazon Prime', cost: 299, category: 'ott', renewDate: '12 Jul', isCancelled: false },
        { id: 'f-disney', name: 'Disney+ Hotstar', cost: 299, category: 'ott', renewDate: '18 Jul', isCancelled: false },
        { id: 'f-canva', name: 'Canva Pro', cost: 602, category: 'other', renewDate: '24 Jul', isCancelled: false }
      ]
    },
    {
      id: 'arjun',
      member: 'Arjun (Son)',
      subs: [
        { id: 'f-youtube', name: 'YouTube Premium', cost: 129, category: 'music', renewDate: '10 Jul', isCancelled: false },
        { id: 'f-roblox', name: 'Roblox Plus', cost: 321, category: 'other', renewDate: '19 Jul', isCancelled: false }
      ]
    }
  ])

  useEffect(() => {
    setMounted(true)
    setSubs(getStoredSubscriptions())
  }, [])

  // Spends data for Rohan (Only non-cancelled or include cancelled but styled accordingly)
  const myActiveSubs = subs.filter(s => !s.isCancelled)

  // Totals
  const myTotal = myActiveSubs.reduce((acc, sub) => acc + sub.cost, 0)
  const familyTotal = familySubs.reduce((acc, member) => {
    const activeMemberTotal = member.subs.filter(s => !s.isCancelled).reduce((sum, s) => sum + s.cost, 0)
    return acc + activeMemberTotal
  }, 0) + myTotal

  // Category breakdown for SVG flow chart
  const categories = [
    { name: 'OTT', value: myActiveSubs.filter(s => s.category === 'ott').reduce((acc, s) => acc + s.cost, 0) + 299 + 299, color: '#E837FD' },
    { name: 'Music', value: myActiveSubs.filter(s => s.category === 'music').reduce((acc, s) => acc + s.cost, 0) + 129, color: '#AFFD37' },
    { name: 'Fitness', value: myActiveSubs.filter(s => s.category === 'fitness').reduce((acc, s) => acc + s.cost, 0), color: '#38BDF8' },
    { name: 'Other', value: myActiveSubs.filter(s => s.category === 'other').reduce((acc, s) => acc + s.cost, 0) + 602 + 321, color: '#FDE837' }
  ]
  const totalCategoryVal = categories.reduce((acc, c) => acc + c.value, 0) || 1

  // Check if Netflix is uncancelled and active for AI alert
  const hasNetflixLeak = subs.some(s => s.id === 'netflix' && !s.isCancelled)

  // Calculate SVG stroke offset ratios
  let accumulatedPercent = 0

  if (!mounted) return null

  return (
    <MobileFrame>
      <div className="relative min-h-full bg-gradient-to-b from-[#0A0A0A] via-[#0F0F1E] to-[#0A0A0A] overflow-hidden">
        {/* Animated background gradient orbs */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-gradient-to-br from-[#8537FD]/20 to-transparent rounded-full blur-3xl animate-float-slow" />
          <div className="absolute bottom-[-20%] right-[-10%] w-96 h-96 bg-gradient-to-br from-[#E837FD]/15 to-transparent rounded-full blur-3xl animate-drift" />
          <div className="absolute top-[50%] right-[-5%] w-72 h-72 bg-gradient-to-br from-[#AFFD37]/10 to-transparent rounded-full blur-3xl animate-float" />
        </div>

        <div className="relative px-4 pt-4 pb-28 flex flex-col text-slate-100 select-none">
        
        {/* Top Header - Animated entrance */}
        <div className="flex items-center justify-between mt-1 z-10 relative animate-fade-in-down">
          <button 
            onClick={() => router.push('/home')}
            className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 hover:bg-white/20 hover:border-[#8537FD]/40 flex items-center justify-center cursor-pointer active:scale-90 transition-all hover-lift group"
            aria-label="Go back"
          >
            <ArrowLeft size={18} className="text-slate-300 group-hover:text-[#8537FD] transition-colors" />
          </button>
          <span className="text-xs font-bold uppercase tracking-widest text-slate-300 group-hover:text-white transition-colors">💳 Subscriptions Hub</span>
          <button 
            className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 hover:bg-white/20 hover:border-[#AFFD37]/40 flex items-center justify-center cursor-pointer active:scale-90 transition-all hover-lift group"
            onClick={() => router.push('/vault')}
            aria-label="Add new subscription"
          >
            <Plus size={18} className="text-slate-300 group-hover:text-[#AFFD37] transition-colors" />
          </button>
        </div>

        {/* Spend Context Toggle - Premium animated tabs */}
        <div className="mt-6 flex bg-white/5 p-1.5 rounded-2xl border border-white/10 z-10 relative animate-fade-in-up gap-1" style={{ animationDelay: '0.1s' }}>
          <button
            onClick={() => setSpendTab('my')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
              spendTab === 'my' 
                ? 'bg-gradient-to-r from-[#8537FD] to-[#E837FD] text-white shadow-lg shadow-[#8537FD]/30 scale-105' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <User size={15} />
            <span>My Spends</span>
          </button>
          <button
            onClick={() => setSpendTab('family')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
              spendTab === 'family' 
                ? 'bg-gradient-to-r from-[#8537FD] to-[#E837FD] text-white shadow-lg shadow-[#8537FD]/30 scale-105' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Users size={15} />
            <span>Family</span>
          </button>
        </div>

        {spendTab === 'my' ? (
          <>
            {/* Spend Hero Card - Premium animated entrance */}
            <div className="mt-6 animate-scale-in-spring" style={{ animationDelay: '0.15s' }}>
              <div className="relative group">
                {/* Animated gradient border */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#8537FD] via-[#E837FD] to-[#AFFD37] rounded-3xl opacity-0 group-hover:opacity-60 blur-xl transition-opacity duration-500 animate-pulse-scale" />
                
                <div className="relative bg-gradient-to-br from-[#AFFD37]/20 to-[#8537FD]/10 rounded-3xl p-7 border border-[#AFFD37]/30 overflow-hidden shadow-2xl shadow-[#AFFD37]/10">
                  <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#AFFD37]/15 rounded-full blur-3xl animate-float" />
                  <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-[#8537FD]/10 rounded-full blur-2xl animate-drift" />
                  
                  <div className="relative z-10 flex items-start justify-between">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-slate-500">📊 Total Monthly Spend</span>
                      <div className="mt-3 flex items-baseline gap-2">
                        <span className="text-5xl font-black font-mono text-white animate-count-up">₹{myTotal}</span>
                        <span className="text-sm text-slate-400 font-semibold">/month</span>
                      </div>
                    </div>
                    {/* Insights Pill */}
                    {hasNetflixLeak && (
                      <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-[#E837FD]/30 to-[#FDE837]/20 border border-[#E837FD]/50 text-xs font-bold text-[#AFFD37] animate-glow-pulse">
                        ⚡ {subs.filter(s => !s.isCancelled && (s.isUnused || s.isUnknown)).length} Leaks
                      </div>
                    )}
                  </div>              {/* Visual Donut Spend Map */}
              <div className="mt-6 flex items-center gap-6">
                <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="38" stroke="#222" strokeWidth="10" fill="transparent" />
                    {categories.map((c, i) => {
                      const percentage = (c.value / totalCategoryVal) * 100
                      const strokeDasharray = `${percentage} ${100 - percentage}`
                      const strokeDashoffset = -accumulatedPercent
                      accumulatedPercent += percentage
                      const isSelected = activeCategoryFilter === c.name
                      return (
                        <circle
                          key={i}
                          cx="50"
                          cy="50"
                          r="38"
                          stroke={c.color}
                          strokeWidth={isSelected ? '14' : '10'}
                          strokeDasharray={strokeDasharray}
                          strokeDashoffset={strokeDashoffset}
                          fill="transparent"
                          pathLength="100"
                          onClick={() => setActiveCategoryFilter(isSelected ? null : c.name)}
                          className="transition-all duration-300 ease-out cursor-pointer hover:stroke-[12px]"
                        />
                      )
                    })}
                  </svg>
                  {/* Central Text */}
                  <div className="absolute flex flex-col items-center justify-center text-center pointer-events-none">
                    <span className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold">Spend flow</span>
                    <span className="text-[10px] font-bold font-mono text-[#AFFD37]">
                      {activeCategoryFilter ? activeCategoryFilter : 'Active'}
                    </span>
                  </div>
                </div>

                {/* Donut Legend */}
                <div className="flex-1 grid grid-cols-2 gap-x-2 gap-y-2 text-[10px]">
                  {categories.map((c, i) => {
                    const isSelected = activeCategoryFilter === c.name
                    return (
                      <button 
                        key={i} 
                        onClick={() => setActiveCategoryFilter(isSelected ? null : c.name)}
                        className={`flex items-center gap-1.5 p-1 rounded-xl text-left transition-all cursor-pointer active:scale-95 border ${
                          isSelected 
                            ? 'bg-white/5 border-white/10 shadow-sm' 
                            : 'border-transparent opacity-85 hover:opacity-100'
                        }`}
                        aria-label={`Filter by ${c.name}`}
                      >
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: c.color }} aria-hidden="true" />
                        <div className="truncate">
                          <p className="font-bold text-slate-300 leading-none">{c.name}</p>
                          <p className="text-[8px] text-slate-500 font-mono mt-0.5">₹{c.value}</p>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Inactive Alert Box (Screen 10 AI nudge trigger) */}
            {hasNetflixLeak && (
              <div className="mt-5 bg-[#E837FD]/5 border border-[#E837FD]/20 rounded-2xl p-4 z-10 relative flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#E837FD]/10 border border-[#E837FD]/20 flex items-center justify-center text-[#E837FD] shrink-0">
                  <AlertTriangle size={15} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold text-white">Zombie Subscription Detected</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E837FD] animate-ping" />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1 leading-normal">
                    You haven&apos;t opened Netflix Premium in 47 days. Revoke this mandate to save ₹7,788/yr.
                  </p>
                  <button
                    onClick={() => router.push('/subs/netflix')}
                    className="mt-2.5 px-3 py-1 rounded-lg bg-[#E837FD] text-[#0C0C0C] font-extrabold text-[9px] uppercase tracking-wider active:scale-95 transition-transform cursor-pointer"
                  >
                    Inspect & Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Active Subscriptions List */}
            <div className="mt-6 flex flex-col gap-3 z-10 relative">
              <div className="flex items-center justify-between px-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Active Subscriptions</span>
                {activeCategoryFilter && (
                  <button 
                    onClick={() => setActiveCategoryFilter(null)}
                    className="text-[9px] font-bold text-[#8537FD] hover:text-[#E837FD] uppercase tracking-wider cursor-pointer"
                  >
                    Clear Filter
                  </button>
                )}
              </div>
              <div className="flex flex-col gap-2.5">
                {subs.filter(sub => {
                  if (!activeCategoryFilter) return true
                  return sub.category === activeCategoryFilter.toLowerCase()
                }).map((sub) => {
                  const Icon = ICON_MAP[sub.category]
                  const color = COLOR_MAP[sub.category]
                  return (
                    <div
                      key={sub.id}
                      onClick={() => router.push(`/subs/${sub.id}`)}
                      className={`bg-[#181818] rounded-2xl p-4 border transition-all active:scale-[0.99] cursor-pointer flex items-center justify-between gap-4 ${
                        sub.isCancelled
                          ? 'opacity-40 border-dashed border-white/5'
                          : sub.isUnknown
                            ? 'border-yellow-500/20 hover:border-yellow-500/30'
                            : 'border-white/5 hover:border-[#8537FD]/20'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div 
                          style={{ color: color, backgroundColor: `${color}08`, borderColor: `${color}20` }}
                          className="w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 shadow-sm"
                        >
                          <Icon size={18} />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <h4 className={`text-xs font-bold ${sub.isCancelled ? 'line-through text-slate-500' : 'text-white'}`}>{sub.name}</h4>
                            {sub.isCancelled ? (
                              <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-white/5 text-[8px] font-bold uppercase">Cancelled</span>
                            ) : (
                              <>
                                {sub.isUnused && (
                                  <span className="px-1.5 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/10 text-[8px] font-bold uppercase">Unused</span>
                                )}
                                {sub.isUnknown && (
                                  <span className="px-1.5 py-0.5 rounded bg-yellow-500/10 text-yellow-400 border border-yellow-500/10 text-[8px] font-bold uppercase">Unknown</span>
                                )}
                              </>
                            )}
                          </div>
                          <p className="text-[9px] text-slate-500 mt-1">
                            {sub.isCancelled ? 'Mandate Revoked' : `Renews ${sub.renewDate} · Auto-debit`}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-right">
                        <div>
                          <p className={`text-xs font-bold font-mono ${sub.isCancelled ? 'text-slate-500' : 'text-white'}`}>₹{sub.cost}</p>
                          <p className="text-[9px] text-slate-500">/mo</p>
                        </div>
                        <ChevronRight size={14} className="text-slate-500" />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* FAMILY SPENDS SUMMARY (Screen 12) */}
            <div className="mt-6 bg-gradient-to-br from-[#8537FD] to-[#E837FD] rounded-[28px] p-5 shadow-lg relative overflow-hidden z-10 text-white">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-[40px] pointer-events-none" />
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-white/60">Family Collective Spend</span>
              <div className="mt-1.5 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold font-mono">₹{familyTotal}</span>
                <span className="text-[10px] text-white/70 font-bold">/ month</span>
              </div>
              <p className="text-[10px] text-white/80 mt-2 leading-relaxed">
                Includes your spends + 2 members linked via RBI Account Aggregator.
              </p>
            </div>

            {/* Family Members Stack */}
            <div className="mt-6 flex flex-col gap-4 z-10 relative">
              {familySubs.map((member, i) => (
                <div key={i} className="bg-[#181818] rounded-2xl p-4 border border-white/5">
                  <div className="flex items-center justify-between pb-3 border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300">
                        {member.member.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">{member.member}</h4>
                        <span className="text-[9px] text-slate-500">Linked mandate account</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold font-mono text-[#AFFD37]">
                        ₹{member.subs.filter(s => !s.isCancelled).reduce((sum, s) => sum + s.cost, 0)}
                      </span>
                      <span className="text-[8px] text-slate-500 block">/mo</span>
                    </div>
                  </div>

                  {/* Member's individual list */}
                  <div className="mt-3 flex flex-col gap-2">
                    {member.subs.map((s, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          if (!s.isCancelled) {
                            setSelectedFamilySub({
                              memberId: member.id,
                              subId: s.id,
                              subName: s.name,
                              cost: s.cost,
                              memberName: member.member
                            })
                          }
                        }}
                        className={`flex items-center justify-between text-[11px] py-1.5 px-2 rounded-xl cursor-pointer text-left w-full transition-all active:scale-[0.99] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8537FD] ${
                          s.isCancelled 
                            ? 'opacity-30 line-through cursor-not-allowed' 
                            : 'hover:bg-white/5 border border-transparent'
                        }`}
                        disabled={s.isCancelled}
                        aria-label={`Inspect ${s.name} under ${member.member}`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#8537FD]" aria-hidden="true" />
                          <span className="text-slate-300 font-semibold">{s.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-slate-400 font-mono">₹{s.cost}</span>
                          <span className="text-[8px] text-slate-500 font-mono">Renew {s.renewDate}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

      </div>

      {/* 1. FAMILY CONSENT MANDATE REVOCATION BOTTOM SHEET */}
      {selectedFamilySub && (
        <div className="absolute inset-0 bg-[#0C0C0C]/90 backdrop-blur-sm z-50 flex flex-col justify-end">
          <div className="bg-[#181818] rounded-t-[32px] p-6 border-t border-white/10 flex flex-col items-center text-center max-h-[85%] overflow-y-auto">
            
            <button 
              onClick={() => setSelectedFamilySub(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#0C0C0C] flex items-center justify-center text-slate-400 active:scale-95 cursor-pointer"
              aria-label="Close modal"
            >
              <X size={16} aria-hidden="true" />
            </button>

            {familySending ? (
              <div className="py-10 flex flex-col items-center">
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-2 border-[#8537FD]/20 animate-ping" />
                  <div className="w-10 h-10 rounded-full bg-[#0C0C0C] border border-[#8537FD]/40 flex items-center justify-center text-[#8537FD] animate-spin">
                    <RefreshCw size={16} />
                  </div>
                </div>
                <h3 className="text-xs font-bold text-white mt-6">Requesting Consent…</h3>
                <p className="text-[9px] text-slate-500 mt-2 max-w-[200px]">
                  Sending DPDP mandate consent request to {selectedFamilySub.memberName}’s mobile client…
                </p>
              </div>
            ) : (
              <div className="py-2 w-full flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#8537FD]/15 border border-[#8537FD]/20 flex items-center justify-center text-[#8537FD] mx-auto">
                  <Users size={22} />
                </div>

                <h3 className="text-sm font-bold text-white mt-4">Request Family Consent</h3>
                <p className="text-[10px] text-slate-400 mt-2 leading-relaxed max-w-[240px]">
                  Under DPDP rules, cancelling a linked account mandate requires permission. We will send a secure request to <span className="font-bold text-white">{selectedFamilySub.memberName}</span> to confirm revoking the <span className="font-bold text-white">{selectedFamilySub.subName}</span> charge.
                </p>

                <div className="mt-5 bg-[#0C0C0C] rounded-xl p-3.5 border border-white/5 w-full max-w-[280px] flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-bold">Monthly Charge</span>
                  <span className="font-mono font-bold text-white">₹{selectedFamilySub.cost}.00</span>
                </div>

                <button
                  onClick={() => {
                    setFamilySending(true)
                    setTimeout(() => {
                      // Update State
                      setFamilySubs(prev => prev.map(member => {
                        if (member.id === selectedFamilySub.memberId) {
                          return {
                            ...member,
                            subs: member.subs.map(sub => sub.id === selectedFamilySub.subId ? { ...sub, isCancelled: true } : sub)
                          }
                        }
                        return member
                      }))
                      setFamilySending(false)
                      setSelectedFamilySub(null)
                      alert(`Consent request sent! ${selectedFamilySub.subName} mandate will be revoked immediately upon ${selectedFamilySub.memberName} approval.`)
                    }, 2000)
                  }}
                  className="mt-6 w-full max-w-[280px] h-12 rounded-full bg-gradient-to-r from-[#8537FD] to-[#E837FD] text-white font-bold text-xs uppercase tracking-wider active:scale-[0.98] transition-transform cursor-pointer"
                >
                  Send Consent Request
                </button>

                <button
                  onClick={() => setSelectedFamilySub(null)}
                  className="mt-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest hover:text-slate-300 cursor-pointer"
                >
                  Keep Active
                </button>
              </div>
            )}

          </div>
        </div>
      )}
      
      <BottomNav activeTab="subs" />
    </MobileFrame>
  )
}
