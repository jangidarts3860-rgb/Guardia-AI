'use client'

import React, { useState, useEffect } from 'react'
import { Bell, Shield, ShieldAlert, AlertTriangle, AlertCircle, Info, CheckCircle2, ChevronRight, QrCode, CreditCard, Flame, Plus, ShieldCheck, X, Check } from 'lucide-react'
import MobileFrame from '@/components/MobileFrame'
import BottomNav from '@/components/BottomNav'
import { useRouter } from 'next/navigation'
import { getStoredSubscriptions, StoredSubscription } from '@/lib/storage'

export default function HomeDashboard() {
  const router = useRouter()
  const [shieldSecure, setShieldSecure] = useState(true)
  const [subs, setSubs] = useState<StoredSubscription[]>([])
  const [userName, setUserName] = useState('Rohan Kumar')
  const [selectedAlert, setSelectedAlert] = useState<any | null>(null)

  useEffect(() => {
    setSubs(getStoredSubscriptions())
    const storedName = localStorage.getItem('guardia_user_name')
    if (storedName) setUserName(storedName)
  }, [])

  // Calculate dynamic totals based on uncancelled leaks
  const activeLeaks = subs.filter(s => !s.isCancelled && (s.isUnused || s.isUnknown))
  const wastedAmount = activeLeaks.reduce((acc, s) => acc + s.cost, 0)
  
  // Annual savings from cancelled subscriptions
  const cancelledSubs = subs.filter(s => s.isCancelled)
  const annualSavings = cancelledSubs.reduce((acc, s) => acc + (s.cost * 12), 0)

  const totalBudget = 3200
  const wastedPercentage = (wastedAmount / totalBudget) * 100

  // Smart Alerts stacked list dynamically populated
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


  return (
    <MobileFrame>
      <div className="relative px-4 pt-4 pb-28 flex flex-col text-slate-100 min-h-full select-none bg-[#0A0A0A]">
        
        {/* Top Header Section - Streamlined */}
        <div className="flex items-center justify-between mt-1 z-10 relative">
          <div className="flex items-center gap-3">
            {/* User Profile Avatar - Refined */}
            <button 
              className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8537FD] to-[#E837FD] p-0.5 cursor-pointer hover:shadow-lg hover:shadow-[#8537FD]/20 active:scale-95 transition-all flex items-center justify-center"
              onClick={() => router.push('/profile')}
              aria-label="View profile"
            >
              <div className="w-full h-full rounded-full bg-[#0A0A0A] flex items-center justify-center font-semibold text-xs text-white">
                {userName.slice(0, 2).toUpperCase()}
              </div>
            </button>
            <div>
              <span className="text-xs text-slate-500 font-medium">Good Morning</span>
              <h1 className="text-sm font-semibold text-white tracking-tight leading-tight mt-0.5">{userName}</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Notification Bell */}
            <button 
              className="relative w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center cursor-pointer active:scale-95 transition-all"
              onClick={() => router.push('/notifications')}
              aria-label="View notifications"
            >
              <Bell size={16} className="text-slate-300" />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#E837FD] rounded-full" />
            </button>
          </div>
        </div>

        {/* HERO CARD: The Leak Meter - Refined Design */}
        <div className="mt-5 bg-gradient-to-br from-[#8537FD] to-[#E837FD] rounded-3xl p-6 shadow-xl shadow-[#8537FD]/15 relative overflow-hidden z-10 select-none text-white">
          {/* Accent blur */}
          <div className="absolute -top-8 -right-8 w-40 h-40 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-white/90">Monthly Leak Meter</span>
              <span className="text-[9px] font-semibold px-2.5 py-1 rounded-full bg-white/20 uppercase text-white/80 backdrop-blur-sm">Active</span>
            </div>

            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-5xl font-black tracking-tight leading-none font-mono">₹{wastedAmount}</span>
              <span className="text-sm text-white/70 font-medium">/month</span>
            </div>
            <p className="text-sm text-white/85 mt-2 font-medium">wasted on {activeLeaks.length} unused {activeLeaks.length === 1 ? 'subscription' : 'subscriptions'}</p>

            <div className="mt-6 pt-5 border-t border-white/20 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-white/70 font-semibold">Annual Savings</span>
                <p className="font-bold font-mono mt-1 text-lg text-white">₹{annualSavings}</p>
              </div>
              <div className="text-right">
                <span className="text-xs uppercase tracking-wider text-white/70 font-semibold">Limit Setup</span>
                <p className="font-bold font-mono mt-1 text-lg text-white">₹{totalBudget}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Grid - Refined */}
        <div className="mt-6 grid grid-cols-4 gap-3 z-10 relative">
          {/* Action 1: Scan QR */}
          <button 
            onClick={() => router.push('/verify')}
            className="flex flex-col items-center gap-2 cursor-pointer group"
            aria-label="Scan QR code"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 hover:border-[#8537FD]/30 hover:bg-[#8537FD]/10 flex items-center justify-center text-[#8537FD] transition-all group-active:scale-90">
              <QrCode size={20} />
            </div>
            <span className="text-[10px] font-semibold text-slate-300 text-center">Scan QR</span>
          </button>
          
          {/* Action 2: Subs Map */}
          <button 
            onClick={() => router.push('/subs')}
            className="flex flex-col items-center gap-2 cursor-pointer group"
            aria-label="View subscriptions map"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 hover:border-[#AFFD37]/30 hover:bg-[#AFFD37]/10 flex items-center justify-center text-[#AFFD37] transition-all group-active:scale-90">
              <CreditCard size={20} />
            </div>
            <span className="text-[10px] font-semibold text-slate-300 text-center">Subs Map</span>
          </button>

          {/* Action 3: Freeze Lock */}
          <button 
            onClick={() => router.push('/vault')}
            className="flex flex-col items-center gap-2 cursor-pointer group"
            aria-label="Freeze all subscriptions"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 hover:border-[#E837FD]/30 hover:bg-[#E837FD]/10 flex items-center justify-center text-[#E837FD] transition-all group-active:scale-90">
              <Flame size={20} />
            </div>
            <span className="text-[10px] font-semibold text-slate-300 text-center">Freeze All</span>
          </button>

          {/* Action 4: Link Bank */}
          <button 
            onClick={() => router.push('/vault?tab=bank')}
            className="flex flex-col items-center gap-2 cursor-pointer group"
            aria-label="Link bank account"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 hover:border-[#38BDF8]/30 hover:bg-[#38BDF8]/10 flex items-center justify-center text-[#38BDF8] transition-all group-active:scale-90">
              <Plus size={20} />
            </div>
            <span className="text-[10px] font-semibold text-slate-300 text-center">Link Bank</span>
          </button>
        </div>

        {/* AI Shield Status Bar - Refined */}
        <div className={`mt-6 rounded-2xl p-4 border z-10 relative backdrop-blur-sm transition-all duration-300 ${
          shieldSecure 
            ? 'bg-emerald-500/5 border-emerald-500/20' 
            : 'bg-red-500/5 border-red-500/20'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full animate-pulse ${shieldSecure ? 'bg-emerald-400' : 'bg-red-400'}`} />
              <span className="text-xs font-semibold text-white">
                {shieldSecure ? '✓ AI Shield Active' : '⚠ Threat Detected'}
              </span>
            </div>
            <span className="text-xs text-slate-400 font-medium">RBI Secure</span>
          </div>
        </div>

        {/* Critical Alerts Section - Refined */}
        <div className="mt-8 flex flex-col gap-4 z-10 relative">
          <div className="flex items-center justify-between select-none px-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Critical Alerts</h3>
            {alerts.length > 0 && <span className="text-xs font-semibold text-[#E837FD]">{alerts.length} {alerts.length === 1 ? 'Alert' : 'Alerts'}</span>}
          </div>

          {alerts.length === 0 ? (
            <div className="bg-white/5 rounded-2xl p-8 border border-emerald-500/10 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mx-auto">
                <ShieldCheck size={24} aria-hidden="true" />
              </div>
              <h4 className="text-sm font-bold text-white mt-4">All Clear!</h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed max-w-xs">
                No suspicious activity detected. Your subscriptions are secure.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {alerts.map((alert) => {
                const Icon = alert.icon
                return (
                  <button 
                    key={alert.id}
                    onClick={() => setSelectedAlert(alert)}
                    className="bg-white/5 rounded-2xl p-4 border border-white/10 hover:border-[#8537FD]/30 flex items-start justify-between gap-3 cursor-pointer transition-all active:scale-95 text-left"
                    aria-label={`Inspect details for ${alert.title}: ${alert.message}`}
                  >
                    <div className="flex gap-3 flex-1 min-w-0">
                      <div 
                        style={{ color: alert.color, backgroundColor: `${alert.color}10`, borderColor: `${alert.color}20` }}
                        className="w-10 h-10 rounded-xl border flex items-center justify-center shrink-0"
                      >
                        <Icon size={18} aria-hidden="true" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">{alert.title}</span>
                          <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: alert.color }} />
                        </div>
                        <h4 className="text-xs font-semibold text-slate-300 mt-1 leading-tight">{alert.message}</h4>
                        <p className="text-xs text-slate-500 mt-1">{alert.detail}</p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          router.push(alert.actionRoute)
                        }}
                        className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#8537FD] to-[#E837FD] text-white text-xs font-semibold hover:shadow-lg hover:shadow-[#8537FD]/20 transition-all active:scale-95"
                        aria-label={`${alert.actionText} ${alert.message}`}
                      >
                        {alert.actionText}
                      </button>
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Activity Logs Section - Refined */}
        <div className="mt-8 flex flex-col gap-4 z-10 relative">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">Recent Activity</h3>
          
          <div className="flex flex-col gap-2">
            {/* Item 1 */}
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 hover:border-white/20 transition-all">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <CheckCircle2 size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-semibold text-white">Netflix Cancelled</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Saved ₹649/mo · mandate revoked</p>
                </div>
              </div>
              <span className="text-xs text-slate-500 font-mono ml-2 flex-shrink-0">1h ago</span>
            </div>

            {/* Item 2 */}
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 hover:border-white/20 transition-all">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-[#8537FD]/10 border border-[#8537FD]/20 flex items-center justify-center text-[#8537FD] shrink-0">
                  <Shield size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-semibold text-white">Fraud Intercepted</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Blocked payment collect request</p>
                </div>
              </div>
              <span className="text-xs text-slate-500 font-mono ml-2 flex-shrink-0">2m ago</span>
            </div>
          </div>

          <button
            onClick={() => router.push('/logs')}
            className="flex items-center justify-center gap-1 text-xs text-[#8537FD] font-semibold hover:text-[#E837FD] active:scale-95 transition-all mt-2 cursor-pointer group"
          >
            <span>View Timeline Logs</span>
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>

      {/* 3. RICH TRUST SCORE RADAR DETAILS BOTTOM SHEET */}
      {selectedAlert && (
        <div className="absolute inset-0 bg-[#0C0C0C]/90 backdrop-blur-sm z-50 flex flex-col justify-end">
          <div className="bg-[#181818] rounded-t-[32px] p-6 border-t border-white/10 flex flex-col items-center text-center max-h-[85%] overflow-y-auto">
            
            <button 
              onClick={() => setSelectedAlert(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#0C0C0C] flex items-center justify-center text-slate-400 active:scale-95 cursor-pointer"
              aria-label="Close details"
            >
              <X size={16} aria-hidden="true" />
            </button>

            <div className="w-12 h-12 rounded-full bg-[#8537FD]/15 border border-[#8537FD]/20 flex items-center justify-center text-[#8537FD] mx-auto">
              <Shield size={22} />
            </div>

            <h3 className="text-sm font-bold text-white mt-4">{selectedAlert.title}</h3>
            <p className="text-[10px] text-slate-400 mt-1 leading-normal max-w-[220px]">
              {selectedAlert.message}
            </p>

            {/* Circular Radar Trust Score Gauge */}
            <div className="relative w-24 h-24 flex items-center justify-center mt-6">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="#222" strokeWidth="8" fill="transparent" />
                <circle 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  stroke={selectedAlert.type === 'danger' ? '#E837FD' : '#FDE837'} 
                  strokeWidth="8" 
                  strokeDasharray={`${selectedAlert.trustScore} ${100 - selectedAlert.trustScore}`}
                  fill="transparent" 
                  pathLength="100" 
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-[8px] uppercase tracking-wider text-slate-500 font-semibold">Trust Index</span>
                <span className="text-lg font-black font-mono text-white">{selectedAlert.trustScore}</span>
              </div>
            </div>

            {/* Signals Checklist */}
            <div className="mt-6 w-full max-w-[280px] flex flex-col gap-2">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest text-left px-1">Evaluation checklist</span>
              {selectedAlert.threatSignals.map((signal: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-[#0C0C0C] rounded-xl border border-white/5 text-[10px]">
                  <span className="text-slate-300 font-semibold">{signal.label}</span>
                  {signal.status === 'pass' ? (
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[#AFFD37] font-extrabold uppercase text-[8px]">Pass</span>
                  ) : signal.status === 'fail' ? (
                    <span className="px-2 py-0.5 rounded bg-red-500/10 border border-red-500/20 text-red-400 font-extrabold uppercase text-[8px]">Fail</span>
                  ) : (
                    <span className="px-2 py-0.5 rounded bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 font-extrabold uppercase text-[8px]">Audit</span>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                setSelectedAlert(null)
                router.push(selectedAlert.actionRoute)
              }}
              className="mt-6 w-full max-w-[280px] h-12 rounded-full bg-gradient-to-r from-[#8537FD] to-[#E837FD] text-white font-bold text-xs uppercase tracking-wider active:scale-[0.98] transition-transform cursor-pointer"
            >
              Resolve Alert
            </button>
          </div>
        </div>
      )}

      {/* Floating Bottom Nav */}
      <BottomNav activeTab="home" />
    </MobileFrame>
  )
}
