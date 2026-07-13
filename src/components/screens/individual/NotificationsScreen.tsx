import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store';
import { useState } from 'react';
import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, AlertTriangle, CreditCard, ShieldCheck, Trash2, Eye, EyeOff } from 'lucide-react';
import { NotificationItem } from '../../../types';
import EmptyState from '../../ui/shared/EmptyState';



const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};

export default function NotificationsScreen() {
  const navigate = useNavigate();
  const { 
    profile, setProfile, 
    subscriptions, setSubscriptions, 
    banks, setBanks, 
    notifications, setNotifications, 
    activities, setActivities, 
    selectedSub, setSelectedSub, 
    isOffline, setIsOffline, 
    scanOutcome, setScanOutcome 
  } = useStore();

  const [notifFilter, setNotifFilter] = useState<'All' | 'Fraud' | 'Subscriptions' | 'System'>('All');

  const getRiskStyle = (risk: string) => {
    if (risk === 'High') return 'bg-red-500/10 border-red-500/20 hover:border-red-500/40 hover:bg-red-500/15';
    if (risk === 'Warning') return 'bg-amber-500/10 border-amber-500/20 hover:border-amber-500/40 hover:bg-amber-500/15';
    if (risk === 'Success') return 'bg-emerald-500/10 border-emerald-500/20 hover:border-emerald-500/40 hover:bg-emerald-500/15';
    return 'bg-cyan-500/10 border-cyan-500/20 hover:border-cyan-500/40 hover:bg-cyan-500/15';
  };

  const getRiskTextColor = (risk: string) => {
    if (risk === 'High') return 'text-red-300';
    if (risk === 'Warning') return 'text-amber-300';
    if (risk === 'Success') return 'text-emerald-300';
    return 'text-cyan-300';
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-950 text-white pb-24">
      <div className="sticky top-0 z-30 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-950/80 backdrop-blur-xl px-4 pt-4 pb-4 border-b border-slate-800/30 space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/home')} 
              className="p-2.5 rounded-lg bg-slate-900/60 backdrop-blur-sm border border-slate-800/60 hover:bg-slate-900/80 hover:border-cyan-500/30 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-cyan-500" 
              aria-label="Go back"
            >
              <ArrowLeft className="w-4 h-4 text-slate-400" />
            </motion.button>
            <div>
              <h2 className="text-xl font-black tracking-tight">Notifications</h2>
              <p className="text-xs text-slate-400 mt-0.5">{notifications.filter(n => n.unread).length} new</p>
            </div>
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setNotifications(prev => prev.map(n => ({ ...n, unread: false })))} 
            className="px-3 py-1.5 text-xs text-cyan-400 font-bold bg-cyan-500/10 hover:bg-cyan-500/15 border border-cyan-500/30 rounded-lg transition-all duration-300 focus-visible:ring-2 focus-visible:ring-cyan-500"
          >
            Mark all
          </motion.button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1.5 scrollbar-none">
          {(['All', 'Fraud', 'Subscriptions', 'System'] as const).map((cat) => (
            <motion.button 
              key={cat} 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setNotifFilter(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all duration-300 whitespace-nowrap relative focus-visible:ring-2 focus-visible:ring-cyan-500 ${
                notifFilter === cat 
                  ? 'border-cyan-500/50 text-cyan-300 bg-cyan-500/10' 
                  : 'bg-slate-900/60 border-slate-800/60 text-slate-400 hover:text-slate-200'
              }`}
              aria-pressed={notifFilter === cat}
            >
              <span className="relative z-10">{cat}</span>
              {notifFilter === cat && <motion.div layoutId="notifTab" className="absolute inset-0 bg-cyan-500/5 rounded-full" />}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col px-4 pt-4">

        {notifications.filter(n => notifFilter === 'All' || n.type === notifFilter).length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 flex items-center justify-center"
          >
            <EmptyState icon="bell" title="No notifications" description="You're all caught up!" />
          </motion.div>
        ) : (
          <motion.div 
            className="space-y-3 pb-4"
            variants={containerVariants} 
            initial="hidden" 
            animate="show"
            role="list"
            aria-label="Notifications list"
          >
            {notifications.filter(n => notifFilter === 'All' || n.type === notifFilter).map((notif, idx) => {
              const target = notif.type === 'Fraud' ? 'safe-report' : notif.type === 'Subscriptions' ? 'subs-dashboard' : 'home';
              return (
                <motion.div 
                  key={notif.id} 
                  variants={itemVariants} 
                  layout 
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(target)}
                  className={`group p-4 rounded-xl border backdrop-blur-sm transition-all duration-300 cursor-pointer flex gap-3 items-start relative overflow-hidden ${getRiskStyle(notif.risk)}`}
                  role="listitem"
                >
                  {/* Background gradient on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                  
                  {/* Icon Container */}
                  <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center border transition-all duration-300 ${
                    notif.type === 'Fraud' 
                      ? 'bg-red-500/20 border-red-500/30 text-red-300' 
                      : notif.type === 'Subscriptions' 
                      ? 'bg-amber-500/20 border-amber-500/30 text-amber-300'
                      : notif.type === 'System'
                      ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300'
                      : 'bg-cyan-500/20 border-cyan-500/30 text-cyan-300'
                  }`}>
                    {notif.type === 'Fraud' && <AlertTriangle className="w-5 h-5" />}
                    {notif.type === 'Subscriptions' && <CreditCard className="w-5 h-5" />}
                    {notif.type === 'System' && <ShieldCheck className="w-5 h-5" />}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-sm leading-tight group-hover:text-white transition-colors">{notif.title}</h3>
                      {notif.unread && (
                        <motion.span 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="flex-shrink-0 w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.5)]" 
                          aria-label="Unread"
                        />
                      )}
                    </div>
                    <p className={`text-xs leading-relaxed ${getRiskTextColor(notif.risk)} opacity-90`}>
                      {notif.description}
                    </p>
                    <p className="text-xs text-slate-500 font-mono pt-0.5">{notif.time}</p>
                  </div>

                  {/* Action hint */}
                  <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
}

