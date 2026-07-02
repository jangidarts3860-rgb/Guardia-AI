'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ShieldAlert, CreditCard, CheckCircle2, Info, ChevronRight, X, Eye } from 'lucide-react'
import MobileFrame from '@/components/MobileFrame'

interface NotificationItem {
  id: string
  category: 'fraud' | 'subscriptions' | 'system'
  title: string
  body: string
  time: string
  unread: boolean
  details: string[]
  actionRoute?: string
  actionLabel?: string
}

export default function NotificationCenter() {
  const router = useRouter()
  const [filter, setFilter] = useState<'all' | 'fraud' | 'subscriptions' | 'system'>('all')

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      category: 'fraud',
      title: 'HIGH RISK ALERT',
      body: 'Phishing SMS detected: "verify.kyc-update.com"',
      time: 'Just now',
      unread: true,
      details: [
        'SMS Sender: AX-ADBK',
        'Payload: Phishing links matching electricity scam patterns',
        'Action taken: blocked domain navigation and notified user'
      ],
      actionLabel: 'View Safety logs',
      actionRoute: '/logs'
    },
    {
      id: 'notif-2',
      category: 'subscriptions',
      title: 'Netflix Renewal Tomorrow',
      body: 'Mandate charge of ₹649 is scheduled from HDFC bank.',
      time: '1h ago',
      unread: true,
      details: [
        'Mandate Vendor: Netflix Entertainment',
        'Amount: ₹649.00 monthly',
        'Mandate Source: HDFC Savings Bank account',
        'AI Warning: You have not opened Netflix in 47 days. Consider cancelling.'
      ],
      actionLabel: 'Inspect Mandate',
      actionRoute: '/subs'
    },
    {
      id: 'notif-3',
      category: 'system',
      title: 'Bank Linked Successfully',
      body: 'HDFC Savings account connected via RBI Aggregator.',
      time: '2h ago',
      unread: false,
      details: [
        'Bank Provider: HDFC Bank Limited',
        'Framework: RBI Account Aggregator platform',
        'Shared Data: Active e-mandates & recurring spend logs'
      ]
    },
    {
      id: 'notif-4',
      category: 'system',
      title: 'AI Shield Engines Updated',
      body: 'Threat database version updated to v1.08.',
      time: '1d ago',
      unread: false,
      details: [
        'Version: v1.0.8',
        'Updates: Added 1,480 new phishing UPI merchant addresses',
        'Status: Active on-device scan running'
      ]
    }
  ])

  const [selectedNotif, setSelectedNotif] = useState<NotificationItem | null>(null)

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })))
  }

  const handleNotifClick = (notif: NotificationItem) => {
    setSelectedNotif(notif)
    setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, unread: false } : n))
  }

  const filteredNotifs = notifications.filter(n => {
    if (filter === 'all') return true
    return n.category === filter
  })

  const getIcon = (category: NotificationItem['category']) => {
    switch (category) {
      case 'fraud': return <ShieldAlert size={15} className="text-red-400" />
      case 'subscriptions': return <CreditCard size={15} className="text-[#AFFD37]" />
      case 'system': return <CheckCircle2 size={15} className="text-[#38BDF8]" />
    }
  }

  const getBorder = (n: NotificationItem) => {
    if (n.unread) {
      return 'border-[#8537FD]/30 bg-[#8537FD]/5'
    }
    return 'border-white/5 hover:border-white/10'
  }

  return (
    <MobileFrame>
      <div className="relative px-5 pt-5 pb-28 flex flex-col text-slate-100 min-h-full select-none bg-[#0C0C0C]">
        
        {/* Top Header */}
        <div className="flex items-center justify-between mt-2 z-10 relative">
          <button 
            onClick={() => router.push('/home')}
            className="w-9 h-9 rounded-full bg-[#181818] border border-white/5 flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
          >
            <ArrowLeft size={16} className="text-slate-300" />
          </button>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Notification Center</span>
          <button 
            onClick={handleMarkAllRead}
            className="w-9 h-9 rounded-full bg-[#181818] border border-white/5 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer active:scale-95 transition-transform"
            title="Mark all as read"
          >
            <Eye size={14} />
          </button>
        </div>

        {/* Filter Horizontal scrollbar */}
        <div className="mt-6 flex gap-2 overflow-x-auto no-scrollbar pb-1 z-10 relative">
          {[
            { id: 'all', label: 'All Alerts' },
            { id: 'fraud', label: 'Fraud Risks' },
            { id: 'subscriptions', label: 'Subscriptions' },
            { id: 'system', label: 'System Info' }
          ].map((pill) => (
            <button
              key={pill.id}
              onClick={() => setFilter(pill.id as any)}
              className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer shrink-0 border ${
                filter === pill.id 
                  ? 'bg-[#8537FD] text-white border-transparent' 
                  : 'bg-[#181818] text-slate-400 border-white/5 hover:text-white'
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>

        {/* List of alerts */}
        <div className="mt-6 flex-1 flex flex-col gap-3 z-10 relative">
          {filteredNotifs.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-10">
              <Info size={36} className="text-slate-700" />
              <p className="text-[10px] font-bold text-slate-500 mt-3.5 uppercase tracking-wider">No notifications yet</p>
            </div>
          ) : (
            filteredNotifs.map((notif) => (
              <div
                key={notif.id}
                onClick={() => handleNotifClick(notif)}
                className={`p-4 rounded-2xl border flex items-start justify-between gap-3 cursor-pointer transition-all active:scale-[0.99] ${getBorder(notif)}`}
              >
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#0C0C0C] border border-white/5 flex items-center justify-center shrink-0">
                    {getIcon(notif.category)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-bold text-white leading-tight">{notif.title}</h4>
                      {notif.unread && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8537FD]" />
                      )}
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">{notif.body}</p>
                    <span className="text-[8px] text-slate-600 block mt-1 font-mono">{notif.time}</span>
                  </div>
                </div>
                <ChevronRight size={14} className="text-slate-500 shrink-0 self-center" />
              </div>
            ))
          )}
        </div>

        {/* 1. NOTIFICATION DETAILED BOTTOM SHEET */}
        {selectedNotif && (
          <div className="absolute inset-0 bg-[#0C0C0C]/90 backdrop-blur-sm z-50 flex flex-col justify-end">
            <div className="bg-[#181818] rounded-t-[32px] p-6 border-t border-white/10 flex flex-col items-center text-center">
              
              <button 
                onClick={() => setSelectedNotif(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#0C0C0C] flex items-center justify-center text-slate-400 active:scale-95 cursor-pointer"
              >
                <X size={16} />
              </button>

              <div className="w-12 h-12 rounded-full bg-[#0C0C0C] border border-white/5 flex items-center justify-center mx-auto text-white">
                {getIcon(selectedNotif.category)}
              </div>

              <h3 className="text-sm font-bold text-white mt-4">{selectedNotif.title}</h3>
              <p className="text-[10px] text-slate-500 mt-1">{selectedNotif.body}</p>

              {/* Bento report details */}
              <div className="mt-5 w-full bg-[#0C0C0C] rounded-2xl p-4 border border-white/5 text-left flex flex-col gap-2.5">
                {selectedNotif.details.map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-[10px] text-slate-400 leading-normal">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#AFFD37] mt-1.5 shrink-0" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>

              {selectedNotif.actionRoute && selectedNotif.actionLabel ? (
                <button
                  onClick={() => {
                    router.push(selectedNotif.actionRoute!)
                    setSelectedNotif(null)
                  }}
                  className="mt-6 w-full h-12 rounded-full bg-gradient-to-r from-[#8537FD] to-[#E837FD] text-white font-bold text-xs uppercase tracking-wider active:scale-[0.98] transition-transform cursor-pointer"
                >
                  {selectedNotif.actionLabel}
                </button>
              ) : (
                <button
                  onClick={() => setSelectedNotif(null)}
                  className="mt-6 w-full h-12 rounded-full bg-[#181818] border border-white/5 hover:border-white/10 text-white font-bold text-xs uppercase tracking-wider active:scale-[0.98] transition-transform cursor-pointer"
                >
                  Dismiss Report
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </MobileFrame>
  )
}
