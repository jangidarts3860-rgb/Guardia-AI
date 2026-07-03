'use client'

import React, { useState, useEffect } from 'react'
import { Bell, Shield, ShieldAlert, AlertTriangle, AlertCircle, Info, CheckCircle2, ChevronRight, QrCode, CreditCard, Flame, Plus, ShieldCheck, X, Check, TrendingDown, Lock, Zap } from 'lucide-react'
import MobileFrame from '@/components/MobileFrame'
import BottomNav from '@/components/BottomNav'
import { ThemeToggle } from '@/components/theme-toggle'
import { useRouter } from 'next/navigation'
import { getStoredSubscriptions, StoredSubscription } from '@/lib/storage'

export default function HomeDashboard() {
  const router = useRouter()
  const [shieldSecure, setShieldSecure] = useState(true)
  const [subs, setSubs] = useState<StoredSubscription[]>([])
  const [userName, setUserName] = useState('Rohan Kumar')
  const [selectedAlert, setSelectedAlert] = useState<any | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setSubs(getStoredSubscriptions())
    const storedName = localStorage.getItem('guardia_user_name')
    if (storedName) setUserName(storedName)
  }, [])

  const activeLeaks = subs.filter(s => !s.isCancelled && (s.isUnused || s.isUnknown))
  const wastedAmount = activeLeaks.reduce((acc, s) => acc + s.cost, 0)
  
  const cancelledSubs = subs.filter(s => s.isCancelled)
  const annualSavings = cancelledSubs.reduce((acc, s) => acc + (s.cost * 12), 0)

  const totalBudget = 3200
  const wastedPercentage = (wastedAmount / totalBudget) * 100

  const alerts = subs
    .filter(s => !s.isCancelled && (s.isUnused || s.isUnknown))
    .map((s, index) => {
      if (s.id === 'netflix') {
        return {
          id: 1,
          type: 'warning',
          title: 'Subscription Leak',
          message: 'Netflix · Unused for 47 days',
          detail: 'Next billing on 15 Jul · ₹649/mo auto-debit',
          actionText: 'Cancel',
          actionRoute: '/subs/netflix',
          icon: AlertTriangle,
          color: '#FDE837',
          tagColor: 'text-[#FDE837] bg-[#FDE837]/10 border-[#FDE837]/20',
          trustScore: 45,
          threatSignals: [
            { label: 'Unused tenure: 47 days', status: 'fail' },
            { label: 'Merchant domain verified', status: 'pass' },
            { label: 'Mandate terms: Rolling debit', status: 'info' }
          ]
        }
      } else {
        return {
          id: 2,
          type: 'danger',
          title: 'Fraud Alert',
          message: 'Phishing SMS detected',
          detail: `${s.name} collects ₹${s.cost}/mo via Axis Bank`,
          actionText: 'Block',
          actionRoute: `/subs/${s.id}`,
          icon: AlertCircle,
          color: '#E837FD',
          tagColor: 'text-[#E837FD] bg-[#E837FD]/10 border-[#E837FD]/20',
          trustScore: 12,
          threatSignals: [
            { label: 'Sender similarity: Fake Axis handle', status: 'fail' },
            { label: 'Domain age: 12 days', status: 'fail' },
            { label: 'SSL certificate validation failed', status: 'fail' }
          ]
        }
      }
    })

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
          
          {/* HEADER - Animated entrance */}
          <div className="animate-fade-in-down">
            <div className="flex items-center justify-between mt-1 z-10 relative">
              <div className="flex items-center gap-3">
                <button 
                  className="w-11 h-11 rounded-full bg-gradient-to-br from-[#8537FD] to-[#E837FD] p-0.5 cursor-pointer hover:shadow-lg hover:shadow-[#8537FD]/40 active:scale-90 transition-all flex items-center justify-center hover-lift group"
                  onClick={() => router.push('/profile')}
                  aria-label="View profile"
                >
                  <div className="w-full h-full rounded-full bg-[#0A0A0A] flex items-center justify-center font-bold text-xs text-white group-hover:scale-110 transition-transform">
                    {userName.slice(0, 2).toUpperCase()}
                  </div>
                </button>
                <div>
                  <span className="text-xs text-slate-500 font-medium">Good Morning</span>
                  <h1 className="text-sm font-bold text-white tracking-tight leading-tight mt-0.5">{userName}</h1>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  className="relative w-10 h-10 rounded-2xl bg-white/10 border border-white/20 hover:bg-white/20 hover:border-[#8537FD]/40 flex items-center justify-center cursor-pointer active:scale-90 transition-all hover-lift group"
                  onClick={() => router.push('/notifications')}
                  aria-label="View notifications"
                >
                  <Bell size={18} className="text-slate-300 group-hover:text-[#8537FD] transition-colors" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-gradient-to-r from-[#E837FD] to-[#FDE837] rounded-full animate-glow-pulse" />
                </button>
                <ThemeToggle />
              </div>
            </div>
          </div>

          {/* HERO CARD - Premium animated entrance with spring effect */}
          <div className="mt-6 animate-scale-in-spring" style={{ animationDelay: '0.1s' }}>
            <div className="relative group">
              {/* Animated gradient border */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#8537FD] via-[#E837FD] to-[#AFFD37] rounded-3xl opacity-0 group-hover:opacity-75 blur-xl transition-opacity duration-500 animate-pulse-scale" />
              
              {/* Main card */}
              <div className="relative bg-gradient-to-br from-[#8537FD] to-[#E837FD] rounded-3xl p-6 shadow-xl shadow-[#8537FD]/10 overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-3xl animate-float" />
                <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-white/5 rounded-full blur-2xl animate-drift" />
                <div className="absolute inset-0 opacity-20 animate-shimmer" />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest text-white/95">📊 Monthly Leak Meter</span>
                    <div className="px-3 py-1 rounded-full bg-white/25 backdrop-blur-md border border-white/30 text-[9px] font-bold uppercase text-white">
                      {shieldSecure ? '🛡️ Secure' : '⚠️ Alert'}
                    </div>
                  </div>

                  <div className="mt-5 space-y-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-6xl font-black tracking-tighter leading-none font-mono animate-count-up">₹{wastedAmount}</span>
                      <span className="text-sm text-white/80 font-semibold">/month</span>
                    </div>
                    <p className="text-sm text-white/90 font-medium leading-snug">
                      wasted on {activeLeaks.length} {activeLeaks.length === 1 ? 'subscription' : 'subscriptions'}
                    </p>
                  </div>

                  {/* Progress bar with animation */}
                  <div className="mt-5 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white/70 font-semibold">Budget Usage</span>
                      <span className="text-white font-bold">{Math.round(wastedPercentage)}%</span>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-white to-white/60 transition-all duration-1000 ease-out"
                        style={{ width: `${Math.min(wastedPercentage, 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-6 pt-5 border-t border-white/25 grid grid-cols-2 gap-4">
                    <div className="group/stat">
                      <span className="text-xs uppercase tracking-wider text-white/70 font-semibold">Annual Savings</span>
                      <p className="font-black font-mono mt-1.5 text-2xl text-white group-hover/stat:scale-110 transition-transform origin-left">₹{annualSavings}</p>
                    </div>
                    <div className="group/stat text-right">
                      <span className="text-xs uppercase tracking-wider text-white/70 font-semibold">Limit Setup</span>
                      <p className="font-black font-mono mt-1.5 text-2xl text-white group-hover/stat:scale-110 transition-transform origin-right">₹{totalBudget}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ACTION GRID - Staggered animation */}
          <div className="mt-7 grid grid-cols-4 gap-3 z-10 relative stagger-children" style={{ animationDelay: '0.2s' }}>
            {/* Scan QR */}
            <button 
              onClick={() => router.push('/verify')}
              className="flex flex-col items-center gap-2.5 cursor-pointer group hover-lift"
              aria-label="Scan QR code"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#8537FD]/30 to-[#E837FD]/20 border border-[#8537FD]/40 hover:border-[#8537FD]/80 hover:bg-gradient-to-br hover:from-[#8537FD]/50 hover:to-[#E837FD]/40 flex items-center justify-center text-[#8537FD] transition-all group-hover:shadow-lg group-hover:shadow-[#8537FD]/30 group-active:scale-75">
                <QrCode size={22} />
              </div>
              <span className="text-[10px] font-bold text-slate-300 text-center group-hover:text-white transition-colors">Scan QR</span>
            </button>
            
            {/* Subs Map */}
            <button 
              onClick={() => router.push('/subs')}
              className="flex flex-col items-center gap-2.5 cursor-pointer group hover-lift"
              aria-label="View subscriptions"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#AFFD37]/30 to-[#8537FD]/20 border border-[#AFFD37]/40 hover:border-[#AFFD37]/80 hover:bg-gradient-to-br hover:from-[#AFFD37]/50 hover:to-[#8537FD]/40 flex items-center justify-center text-[#AFFD37] transition-all group-hover:shadow-lg group-hover:shadow-[#AFFD37]/30 group-active:scale-75">
                <CreditCard size={22} />
              </div>
              <span className="text-[10px] font-bold text-slate-300 text-center group-hover:text-white transition-colors">Subs Map</span>
            </button>

            {/* Freeze All */}
            <button 
              onClick={() => router.push('/vault')}
              className="flex flex-col items-center gap-2.5 cursor-pointer group hover-lift"
              aria-label="Freeze subscriptions"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#E837FD]/30 to-[#FDE837]/20 border border-[#E837FD]/40 hover:border-[#E837FD]/80 hover:bg-gradient-to-br hover:from-[#E837FD]/50 hover:to-[#FDE837]/40 flex items-center justify-center text-[#E837FD] transition-all group-hover:shadow-lg group-hover:shadow-[#E837FD]/30 group-active:scale-75 animate-pulse-scale">
                <Lock size={22} />
              </div>
              <span className="text-[10px] font-bold text-slate-300 text-center group-hover:text-white transition-colors">Freeze All</span>
            </button>

            {/* Link Bank */}
            <button 
              onClick={() => router.push('/vault?tab=bank')}
              className="flex flex-col items-center gap-2.5 cursor-pointer group hover-lift"
              aria-label="Link bank"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#38BDF8]/30 to-[#0EA5E9]/20 border border-[#38BDF8]/40 hover:border-[#38BDF8]/80 hover:bg-gradient-to-br hover:from-[#38BDF8]/50 hover:to-[#0EA5E9]/40 flex items-center justify-center text-[#38BDF8] transition-all group-hover:shadow-lg group-hover:shadow-[#38BDF8]/30 group-active:scale-75">
                <Plus size={22} />
              </div>
              <span className="text-[10px] font-bold text-slate-300 text-center group-hover:text-white transition-colors">Link Bank</span>
            </button>
          </div>

          {/* SHIELD STATUS - Enhanced animated appearance */}
          <div className="mt-7 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className={`rounded-2xl p-4 border backdrop-blur-lg transition-all duration-500 ${
              shieldSecure 
                ? 'bg-emerald-500/5 border-emerald-500/30 shadow-lg shadow-emerald-500/10' 
                : 'bg-red-500/5 border-red-500/30 shadow-lg shadow-red-500/10'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full animate-glow-pulse ${shieldSecure ? 'bg-emerald-400' : 'bg-red-400'}`} />
                  <span className="text-xs font-bold text-white">
                    {shieldSecure ? '✓ AI Shield: Monitoring Active' : '⚠ Threat Detected: Action Required'}
                  </span>
                </div>
                <span className="text-xs text-slate-500 font-medium">RBI Secure</span>
              </div>
            </div>
          </div>

          {/* CRITICAL ALERTS - Staggered list with smooth animations */}
          <div className="mt-8 flex flex-col gap-4 stagger-children" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center justify-between select-none px-1">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">⚡ Critical Alerts</h3>
              {alerts.length > 0 && (
                <div className="px-2.5 py-1 rounded-full bg-[#E837FD]/20 border border-[#E837FD]/30 text-xs font-bold text-[#E837FD] animate-glow-pulse">
                  {alerts.length} {alerts.length === 1 ? 'Alert' : 'Alerts'}
                </div>
              )}
            </div>

            {alerts.length === 0 ? (
              <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 rounded-2xl p-8 border border-emerald-500/20 flex flex-col items-center text-center animate-scale-in">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto">
                  <ShieldCheck size={28} />
                </div>
                <h4 className="text-sm font-bold text-white mt-4">All Clear! ✨</h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed max-w-xs">
                  No suspicious activity detected. Your subscriptions are secure and protected.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {alerts.slice(0, 3).map((alert, idx) => {
                  const Icon = alert.icon
                  return (
                    <button 
                      key={alert.id}
                      onClick={() => setSelectedAlert(alert)}
                      className="group bg-gradient-to-r from-white/5 to-white/[0.02] rounded-2xl p-4 border border-white/15 hover:border-[#8537FD]/50 hover:bg-white/10 flex items-start justify-between gap-3 cursor-pointer transition-all active:scale-95 text-left hover:shadow-lg hover:shadow-[#8537FD]/20"
                      aria-label={`Alert: ${alert.message}`}
                      style={{ animationDelay: `${0.1 * (idx + 1)}s` }}
                    >
                      <div className="flex gap-3 flex-1 min-w-0">
                        <div 
                          style={{ color: alert.color, backgroundColor: `${alert.color}15`, borderColor: `${alert.color}40` }}
                          className="w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"
                        >
                          <Icon size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white">{alert.title}</span>
                            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-gradient-to-r from-[#E837FD] to-[#FDE837]" />
                          </div>
                          <h4 className="text-xs font-semibold text-slate-200 mt-1 leading-tight">{alert.message}</h4>
                          <p className="text-xs text-slate-500 mt-1">{alert.detail}</p>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          router.push(alert.actionRoute)
                        }}
                        className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#8537FD] to-[#E837FD] text-white text-xs font-bold hover:shadow-lg hover:shadow-[#8537FD]/40 transition-all active:scale-90 flex-shrink-0 group-hover:scale-110"
                      >
                        {alert.actionText}
                      </button>
                    </button>
                  )
                })}
                {alerts.length > 3 && (
                  <button 
                    className="text-center text-xs text-[#8537FD] font-semibold hover:text-[#E837FD] transition-colors py-2"
                    onClick={() => router.push('/alerts')}
                  >
                    View all {alerts.length} alerts →
                  </button>
                )}
              </div>
            )}
          </div>

          {/* RECENT ACTIVITY - Final staggered section */}
          <div className="mt-8 flex flex-col gap-4 pb-4 stagger-children" style={{ animationDelay: '0.5s' }}>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 px-1">🔔 Recent Activity</h3>
            
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-all group cursor-pointer">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-11 h-11 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 group-hover:scale-110 transition-transform">
                    <CheckCircle2 size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-white">Netflix Cancelled</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Saved ₹649/mo · mandate revoked</p>
                  </div>
                </div>
                <span className="text-xs text-slate-500 font-mono ml-2 flex-shrink-0">1h</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 hover:border-[#8537FD]/40 hover:bg-[#8537FD]/5 transition-all group cursor-pointer">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-11 h-11 rounded-xl bg-[#8537FD]/15 border border-[#8537FD]/30 flex items-center justify-center text-[#8537FD] shrink-0 group-hover:scale-110 transition-transform">
                    <Shield size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-white">Fraud Blocked</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Payment collect request intercepted</p>
                  </div>
                </div>
                <span className="text-xs text-slate-500 font-mono ml-2 flex-shrink-0">2m</span>
              </div>
            </div>

            <button
              onClick={() => router.push('/logs')}
              className="flex items-center justify-center gap-2 text-xs text-[#8537FD] font-bold hover:text-[#E837FD] active:scale-95 transition-all mt-2 group"
            >
              <span>View Timeline Logs</span>
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        <BottomNav />
      </div>
    </MobileFrame>
  )
}
