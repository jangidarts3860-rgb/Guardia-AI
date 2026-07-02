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
      <div className="relative px-5 pt-5 pb-28 flex flex-col text-slate-100 min-h-full select-none bg-[#0C0C0C]">
        
        {/* Top Header Section (Frentix style) */}
        <div className="flex items-center justify-between mt-2 z-10 relative">
          <div className="flex items-center gap-3">
            {/* User Profile Avatar with glowing border */}
            <div 
              className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#8537FD] to-[#E837FD] p-[1.5px] cursor-pointer active:scale-95 transition-transform"
              onClick={() => router.push('/profile')}
            >
              <div className="w-full h-full rounded-full bg-[#0C0C0C] flex items-center justify-center">
                <span className="text-xs font-bold text-white uppercase">{userName.slice(0, 2)}</span>
              </div>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-medium">Good Morning</span>
              <h1 className="text-sm font-bold text-white tracking-tight leading-none mt-0.5">{userName}</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Shield State Simulator Toggle */}
            <button
              onClick={() => setShieldSecure(!shieldSecure)}
              className="h-7 px-3 rounded-full text-[9px] font-bold uppercase tracking-wider bg-[#181818] border border-white/10 hover:border-[#8537FD]/50 text-slate-300 transition-all active:scale-95 cursor-pointer"
            >
              Simulate {shieldSecure ? 'Attack' : 'Secure'}
            </button>
            {/* Notification Bell */}
            <div 
              className="relative cursor-pointer active:scale-95 transition-transform"
              onClick={() => router.push('/notifications')}
            >
              <div className="w-9 h-9 rounded-full bg-[#181818] border border-white/5 flex items-center justify-center">
                <Bell size={16} className="text-slate-300" />
              </div>
              <span className="absolute top-0 right-0 w-2 h-2 bg-[#E837FD] rounded-full border-2 border-[#0C0C0C]" />
            </div>
          </div>
        </div>

        {/* HERO CARD: The Leak Meter (Vibrant Frentix Solid Gradient Block) */}
        <div className="mt-6 bg-gradient-to-br from-[#8537FD] via-[#B237FD] to-[#E837FD] rounded-[28px] p-6 shadow-[0_15px_30px_-5px_rgba(133,55,253,0.3)] relative overflow-hidden z-10 select-none text-white">
          {/* Futuristic geometric shape overlay */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-[40px] pointer-events-none" />
          
          <div className="flex items-center justify-between opacity-80">
            <span className="text-[10px] font-extrabold uppercase tracking-widest">Monthly Leak Meter</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/15 uppercase">AI Pulse</span>
          </div>

          <div className="mt-5 flex items-baseline gap-1">
            <span className="text-[42px] font-extrabold tracking-tight leading-none font-mono">₹{wastedAmount}.00</span>
          </div>
          <p className="text-[12px] text-white/80 mt-2">wasted on 3 unused subscriptions this month</p>

          <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between text-xs">
            <div>
              <span className="text-[9px] uppercase tracking-wider text-white/60">Annual Savings</span>
              <p className="font-bold font-mono mt-0.5 text-sm">₹{annualSavings}.00</p>
            </div>
            <div>
              <span className="text-[9px] uppercase tracking-wider text-white/60">Limit Setup</span>
              <p className="font-bold font-mono mt-0.5 text-sm">₹{totalBudget}.00</p>
            </div>
          </div>
        </div>

        {/* Action Grid (Horizontal rounded action items like Frentix app) */}
        <div className="mt-6 flex justify-between gap-2 z-10 relative px-2">
          {/* Action 1: Verify QR */}
          <button 
            onClick={() => router.push('/verify')}
            className="flex flex-col items-center gap-2 cursor-pointer active:scale-95 transition-transform"
          >
            <div className="w-12 h-12 rounded-full bg-[#181818] border border-white/5 flex items-center justify-center text-[#8537FD] hover:border-[#8537FD]/30 shadow-lg">
              <QrCode size={18} />
            </div>
            <span className="text-[10px] font-bold text-slate-300">Scan QR</span>
          </button>
          
          {/* Action 2: Subs Map */}
          <button 
            onClick={() => router.push('/subs')}
            className="flex flex-col items-center gap-2 cursor-pointer active:scale-95 transition-transform"
          >
            <div className="w-12 h-12 rounded-full bg-[#181818] border border-white/5 flex items-center justify-center text-[#AFFD37] hover:border-[#AFFD37]/30 shadow-lg">
              <CreditCard size={18} />
            </div>
            <span className="text-[10px] font-bold text-slate-300">Subs Map</span>
          </button>

          {/* Action 3: Freeze Lock */}
          <button 
            onClick={() => router.push('/vault')}
            className="flex flex-col items-center gap-2 cursor-pointer active:scale-95 transition-transform"
          >
            <div className="w-12 h-12 rounded-full bg-[#181818] border border-white/5 flex items-center justify-center text-[#E837FD] hover:border-[#E837FD]/30 shadow-lg">
              <Flame size={18} className="animate-pulse" />
            </div>
            <span className="text-[10px] font-bold text-slate-300">Freeze All</span>
          </button>

          {/* Action 4: Link Bank */}
          <button 
            onClick={() => router.push('/vault?tab=bank')}
            className="flex flex-col items-center gap-2 cursor-pointer active:scale-95 transition-transform"
          >
            <div className="w-12 h-12 rounded-full bg-[#181818] border border-white/5 flex items-center justify-center text-[#38BDF8] hover:border-[#38BDF8]/30 shadow-lg">
              <Plus size={18} />
            </div>
            <span className="text-[10px] font-bold text-slate-300">Link Bank</span>
          </button>
        </div>

        {/* AI Shield Horizontal Bar Status */}
        <div className={`mt-6 rounded-2xl p-4 border z-10 relative transition-all duration-300 ${
          shieldSecure 
            ? 'bg-[#181818] border-emerald-500/10' 
            : 'bg-[#181818] border-red-500/20'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${shieldSecure ? 'bg-[#AFFD37] animate-pulse' : 'bg-[#E837FD] animate-bounce'}`} />
              <span className="text-xs font-bold text-white">
                {shieldSecure ? 'AI Shield: Active & Monitoring' : 'Threat Blocked: Action Required'}
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-medium">RBI Secure</span>
          </div>
        </div>

        {/* Stacked Smart Alerts (Replaced the sliding carousel with premium list) */}
        <div className="mt-6 flex flex-col gap-3 z-10 relative">
          <div className="flex items-center justify-between select-none">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Critical Alerts</h3>
            <span className="text-[10px] font-bold text-[#8537FD]">AI Insights</span>
          </div>

          {alerts.length === 0 ? (
            <div className="bg-[#181818] rounded-2xl p-6 border border-white/5 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mx-auto">
                <ShieldCheck size={20} className="animate-pulse" aria-hidden="true" />
              </div>
              <h4 className="text-xs font-bold text-white mt-4">Everything looks safe right now! ✨</h4>
              <p className="text-[10px] text-slate-400 mt-2 max-w-[210px] leading-relaxed mx-auto">
                No suspicious auto-debits or leaking subscriptions in the last 30 days. Your finances are protected.
              </p>
              <button
                onClick={() => router.push('/logs')}
                className="mt-4 px-4 py-1.5 rounded-full bg-[#181818] border border-white/5 text-[9px] font-extrabold uppercase tracking-wider text-slate-300 active:scale-95 transition-transform cursor-pointer"
                aria-label="View Full Report"
              >
                View Full Report
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2.5">
              {alerts.map((alert) => {
                const Icon = alert.icon
                return (
                  <div 
                    key={alert.id}
                    onClick={() => setSelectedAlert(alert)}
                    className="bg-[#181818] rounded-2xl p-4 border border-white/5 flex items-start justify-between gap-3 cursor-pointer hover:border-[#8537FD]/20 transition-all active:scale-[0.99]"
                    aria-label={`Inspect details for ${alert.title}: ${alert.message}`}
                  >
                    <div className="flex gap-3">
                      <div 
                        style={{ color: alert.color, backgroundColor: `${alert.color}08`, borderColor: `${alert.color}20` }}
                        className="w-9 h-9 rounded-xl border flex items-center justify-center shrink-0"
                      >
                        <Icon size={16} aria-hidden="true" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-white">{alert.title}</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" aria-hidden="true" />
                        </div>
                        <h4 className="text-xs font-bold text-slate-300 mt-1 leading-tight">{alert.message}</h4>
                        <p className="text-[10px] text-slate-500 mt-0.5">{alert.detail}</p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        router.push(alert.actionRoute)
                      }}
                      className="h-7 px-3 rounded-full bg-[#0C0C0C] border border-white/10 hover:border-[#8537FD] text-[10px] font-bold text-white transition-all active:scale-95 cursor-pointer shrink-0"
                      aria-label={`${alert.actionText} ${alert.message}`}
                    >
                      {alert.actionText}
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Activity Logs Timeline List (Frentix style) */}
        <div className="mt-6 flex flex-col gap-3 z-10 relative px-5">
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Activity Log</h3>
          
          <div className="flex flex-col gap-2">
            {/* Item 1 */}
            <div className="flex items-center justify-between p-4 bg-[#181818]/60 rounded-xl border border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#AFFD37]/5 border border-[#AFFD37]/10 flex items-center justify-center text-[#AFFD37]">
                  <CheckCircle2 size={15} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Netflix Cancelled</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">Saved ₹649/mo · mandate revoked</p>
                </div>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">1h ago</span>
            </div>

            {/* Item 2 */}
            <div className="flex items-center justify-between p-4 bg-[#181818]/60 rounded-xl border border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#8537FD]/5 border border-[#8537FD]/10 flex items-center justify-center text-[#8537FD]">
                  <Shield size={15} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Scam SMS Intercepted</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">Blocked payment collect request</p>
                </div>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">2m ago</span>
            </div>
          </div>

          <button
            onClick={() => router.push('/logs')}
            className="flex items-center justify-center gap-1 text-[11px] text-[#8537FD] font-bold hover:text-[#E837FD] active:scale-[0.98] transition-all w-fit mx-auto mt-2 cursor-pointer"
          >
            <span>View Full Timeline Logs</span>
            <ChevronRight size={14} />
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
