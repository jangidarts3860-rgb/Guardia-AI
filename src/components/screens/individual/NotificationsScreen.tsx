import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store';
import { useState } from 'react';
import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, AlertTriangle, CreditCard, ShieldCheck } from 'lucide-react';
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
    if (risk === 'High') return 'bg-red-500/10 border-red-500/20 text-red-400';
    if (risk === 'Warning') return 'bg-amber-500/10 border-amber-500/20 text-amber-500';
    if (risk === 'Success') return 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400';
    return 'bg-sky-500/10 border-sky-500/20 text-sky-400';
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-950 text-white p-4 justify-between">
      <div className="space-y-4 flex-1 flex flex-col">
        {/* Header + Filter Tabs */}
        <div className="pb-3 space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <button onClick={() => navigate('/home')} className="p-2 -ml-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 transition focus-visible:ring-2 focus-visible:ring-sky-500" aria-label="Go back">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <h2 className="text-lg font-bold">Notifications</h2>
          </div>
          <button onClick={() => setNotifications(prev => prev.map(n => ({ ...n, unread: false })))} className="text-xs text-sky-400 font-bold hover:underline focus-visible:ring-2 focus-visible:ring-sky-500 rounded">
            Mark all read
          </button>
        </div>

        <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-none shrink-0 relative">
          {(['All', 'Fraud', 'Subscriptions', 'System'] as const).map((cat) => (
            <button key={cat} onClick={() => setNotifFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition relative ${notifFilter === cat ? 'border-sky-400 text-white' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'} focus-visible:ring-2 focus-visible:ring-sky-500`}
              aria-pressed={notifFilter === cat}
            >
              <span className="relative z-10">{cat}</span>
              {notifFilter === cat && <motion.div layoutId="notifTab" className="absolute inset-0 bg-sky-500 rounded-full shadow-md shadow-sky-500/10" />}
            </button>
          ))}
        </div>
        </div>

        <motion.div className="space-y-2.5 flex-1 overflow-y-auto text-left" variants={containerVariants} initial="hidden" animate="show">
          {notifications.filter(n => notifFilter === 'All' || n.type === notifFilter).length === 0 ? (
            <motion.div variants={itemVariants}><EmptyState icon="bell" title="No notifications" description="You're all caught up!" /></motion.div>
          ) : (
            notifications.filter(n => notifFilter === 'All' || n.type === notifFilter).map((notif) => {
              const target = notif.type === 'Fraud' ? 'safe-report' : notif.type === 'Subscriptions' ? 'subs-dashboard' : 'home';
              return (
              <motion.div key={notif.id} variants={itemVariants} layout whileTap={{ scale: 0.98 }}
                onClick={() => navigate(target)}
                className={`p-4 rounded-2xl border relative flex space-x-3 items-start transition hover:border-slate-700 cursor-pointer ${getRiskStyle(notif.risk)}`}
                role="listitem"
              >
                {notif.unread && <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-sky-400" aria-label="Unread" />}
                <div className="w-8 h-8 rounded-lg bg-slate-950/60 border border-slate-800/40 flex items-center justify-center shrink-0">
                  {notif.type === 'Fraud' && <AlertTriangle className="w-4 h-4 text-red-400" />}
                  {notif.type === 'Subscriptions' && <CreditCard className="w-4 h-4 text-amber-500" />}
                  {notif.type === 'System' && <ShieldCheck className="w-4 h-4 text-emerald-400" />}
                </div>
                <div className="flex-1 space-y-0.5">
                  <div className="flex justify-between items-center">
                    <p className="font-extrabold text-xs">{notif.title}</p>
                    <span className="text-xs text-slate-500 font-mono pr-2">{notif.time}</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">{notif.description}</p>
                </div>
              </motion.div>
              );
            })
          )}
        </motion.div>
      </div>
    </div>
  );
}

