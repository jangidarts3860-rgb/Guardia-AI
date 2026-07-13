import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store';
import { useState, useCallback, useEffect } from 'react';
import { motion } from 'motion/react';
import { Bell, WifiOff, ShieldCheck, ShieldAlert, ChevronRight, ArrowUpRight } from 'lucide-react';
import { Subscription, Bank, NotificationItem, ActivityItem } from '../../../types';
import GuardiaLogo from '../../ui/GuardiaLogo';
import PullToRefresh from '../../ui/shared/PullToRefresh';
import Skeleton from '../../ui/shared/Skeleton';
import { getSubscriptionLogo } from '../Screens';
import AnimatedNumber from '../../ui/shared/AnimatedNumber';

export default function HomeScreen() {
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

  const [isShieldActive, setIsShieldActive] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsInitialLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const handleRefresh = useCallback(() => {
    return new Promise<void>((resolve) => {
      setIsRefreshing(true);
      setTimeout(() => {
        setIsRefreshing(false);
        resolve();
      }, 600);
    });
  }, []);

  const wastedAmount = subscriptions
    .filter(s => s.isUnused && s.status === 'Active')
    .reduce((acc, curr) => acc + curr.cost, 0);
  const blockedCount = activities.filter(a => a.status === 'Blocked').length;

  const greeting = (function() { 
    const h = new Date().getHours(); 
    return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening'; 
  })();

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="flex flex-col min-h-full pb-24 bg-slate-950 text-white">
        {isRefreshing && (
          <motion.div 
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="sticky top-4 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-2.5 bg-slate-900/95 backdrop-blur-xl border border-slate-800/50 rounded-full px-3.5 py-2.5 shadow-lg"
          >
            <span className="w-3 h-3 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
            <span className="text-xs font-semibold text-cyan-300">Refreshing...</span>
          </motion.div>
        )}

        {isOffline && (
          <motion.div 
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-4 mt-4 bg-amber-500/10 backdrop-blur-sm border border-amber-500/30 text-amber-300 text-xs font-semibold p-3.5 rounded-lg flex items-center justify-between shadow-sm group hover:border-amber-500/50 transition-all duration-300" 
            role="alert"
          >
            <div className="flex items-center space-x-2.5">
              <WifiOff className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
              <span>Offline mode active • Scanning paused</span>
            </div>
            <button onClick={() => navigate('/security')} className="text-amber-400 hover:text-amber-300 font-semibold text-xs underline focus-visible:ring-2 focus-visible:ring-amber-500 rounded px-1.5">Resume</button>
          </motion.div>
        )}

        <div className="flex-1 px-4 pt-4">
          {isInitialLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Skeleton className={i === 1 ? 'h-24' : i === 2 ? 'h-32' : 'h-20'} />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.1 }} className="space-y-6">
              {/* Header Section */}
              <div className="flex justify-between items-start pt-1">
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-slate-400 tracking-wide">{greeting}</p>
                  <div className="flex items-center gap-2">
                    <GuardiaLogo size={18} variant="icon" />
                    <h1 className="text-2xl font-black tracking-tight text-white">Your Shield</h1>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/notifications')} 
                    className="relative p-2.5 rounded-lg border border-slate-800/60 bg-slate-900/40 backdrop-blur-sm hover:bg-slate-900/60 hover:border-cyan-500/30 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-cyan-500 group"
                    aria-label="Notifications"
                  >
                    <Bell className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-[0_0_12px_rgba(6,182,212,0.5)]" 
                      aria-hidden="true" 
                    />
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/me-profile')} 
                    className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 flex items-center justify-center overflow-hidden hover:border-cyan-500/30 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-cyan-500"
                    aria-label="Profile"
                  >
                    {profile.photo ? <img src={profile.photo} alt="" className="w-full h-full object-cover" /> : <span className="text-cyan-400 font-bold text-sm">{profile.name ? profile.name.charAt(0).toUpperCase() : 'R'}</span>}
                  </motion.button>
                </div>
              </div>

              {/* Shield Status Card - Premium Bento */}
              <motion.button
                onClick={() => setIsShieldActive(!isShieldActive)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full p-6 rounded-2xl border border-slate-800/40 bg-gradient-to-br from-slate-900/60 to-slate-900/40 backdrop-blur-xl hover:border-cyan-500/20 hover:from-slate-900/80 hover:to-slate-900/50 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-cyan-500 text-left group"
                role="switch"
                aria-checked={isShieldActive}
              >
                <div className="flex items-center gap-4">
                  <motion.div 
                    layoutId="shield-icon"
                    className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      isShieldActive 
                        ? 'bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 border border-cyan-500/30' 
                        : 'bg-slate-800/40 border border-slate-700/40'
                    }`}
                  >
                    <motion.div initial={false} animate={{ scale: isShieldActive ? 1 : 0.8 }}>
                      {isShieldActive ? (
                        <ShieldCheck className="w-6 h-6 text-cyan-400" />
                      ) : (
                        <ShieldAlert className="w-6 h-6 text-slate-500" />
                      )}
                    </motion.div>
                  </motion.div>
                  
                  <div className="flex-1 min-w-0 text-left space-y-2">
                    <div className="flex items-center gap-2">
                      <motion.div 
                        layoutId="shield-badge"
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold tracking-wide transition-all duration-300 ${
                          isShieldActive
                            ? 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300'
                            : 'border-slate-700/40 bg-slate-800/40 text-slate-400'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full transition-all ${isShieldActive ? 'bg-cyan-400' : 'bg-slate-500'}`} />
                        {isShieldActive ? 'PROTECTED' : 'PAUSED'}
                      </motion.div>
                    </div>
                    <div className="space-y-0.5">
                      <h3 className="text-base font-black text-white">{isShieldActive ? 'AI Shield Active' : 'Shield is Paused'}</h3>
                      <p className="text-xs text-slate-400">{isShieldActive ? `${blockedCount} threats blocked • Zero risk` : 'Tap to resume protection'}</p>
                    </div>
                  </div>
                </div>
              </motion.button>

              {/* Savings Card - Premium Variant */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="p-6 rounded-2xl border border-slate-800/40 bg-gradient-to-br from-slate-900/60 to-slate-900/40 backdrop-blur-xl hover:border-cyan-500/20 transition-all duration-300 cursor-pointer group"
                onClick={() => wastedAmount > 0 && navigate('/subs-dashboard')}
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-slate-400 tracking-wider uppercase">Potential Savings</p>
                      <div className="flex items-baseline gap-2">
                        <AnimatedNumber 
                          value={wastedAmount} 
                          prefix="₹" 
                          className={`text-3xl font-black tracking-tight ${wastedAmount > 0 ? 'text-cyan-400' : 'text-emerald-400'}`} 
                          format 
                        />
                        <span className="text-xs font-semibold text-slate-400">/month</span>
                      </div>
                    </div>
                    {wastedAmount > 0 && (
                      <motion.div 
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="flex items-center gap-1 text-cyan-400 text-xs font-bold"
                      >
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </motion.div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-slate-400">
                        {wastedAmount > 0 
                          ? `${subscriptions.filter(s => s.isUnused && s.status === 'Active').length} unused subscription${subscriptions.filter(s => s.isUnused && s.status === 'Active').length > 1 ? 's' : ''}`
                          : 'No unused subscriptions'
                        }
                      </p>
                      {wastedAmount > 0 && (
                        <span className="text-xs font-bold text-cyan-400 group-hover:underline">Review →</span>
                      )}
                    </div>
                    <div className="w-full h-1.5 bg-slate-800/60 rounded-full overflow-hidden" role="progressbar">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: wastedAmount > 0 ? '65%' : '0%' }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className={`h-full rounded-full transition-colors ${wastedAmount > 0 ? 'bg-gradient-to-r from-cyan-500 to-blue-500' : 'bg-emerald-500'}`}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Smart Nudges - Refined */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-300">Smart Alerts</h3>
                  <motion.span 
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-[10px] font-bold text-cyan-400 bg-cyan-500/15 px-2.5 py-1 rounded-full border border-cyan-500/30"
                  >
                    {subscriptions.filter(s => s.isUnused && s.status === 'Active').length} Active
                  </motion.span>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  {subscriptions.length > 0 && (
                    <motion.div
                      whileHover={{ scale: 1.04, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => { setSelectedSub(subscriptions[0]); navigate('/sub-detail'); }}
                      className="p-4 rounded-xl border border-slate-800/40 bg-slate-900/40 backdrop-blur-sm hover:border-cyan-500/30 hover:bg-slate-900/60 transition-all duration-300 cursor-pointer text-left group"
                    >
                      <div className="mb-3">
                        {getSubscriptionLogo(subscriptions[0].id, subscriptions[0].name, "w-7 h-7 rounded-md")}
                      </div>
                      <h4 className="font-bold text-xs text-white group-hover:text-cyan-400 transition-colors">{subscriptions[0].name}</h4>
                      <p className="text-[10px] text-slate-400 mt-1.5">Unused 47 days</p>
                      <p className="text-[10px] text-cyan-400 font-bold mt-2.5">Save ₹{subscriptions[0].cost}</p>
                    </motion.div>
                  )}
                  
                  <motion.div
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/scan-qr')}
                    className="p-4 rounded-xl border border-red-500/20 bg-red-500/10 backdrop-blur-sm hover:border-red-500/40 hover:bg-red-500/15 transition-all duration-300 cursor-pointer text-left"
                  >
                    <div className="mb-3 w-7 h-7 rounded-md bg-red-500/20 flex items-center justify-center">
                      <ShieldAlert className="w-4 h-4 text-red-400" />
                    </div>
                    <h4 className="font-bold text-xs text-red-200">Scam Alert</h4>
                    <p className="text-[10px] text-red-400/70 mt-1.5">High Risk SMS</p>
                    <p className="text-[10px] text-red-400 font-bold mt-2.5">Review</p>
                  </motion.div>
                </div>
              </div>

              {/* Recent Activity - Refined */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-300">Activity</h3>
                  <button onClick={() => navigate('/activity-log')} className="text-xs text-cyan-400 font-semibold hover:text-cyan-300 transition-colors focus-visible:ring-2 focus-visible:ring-cyan-500 rounded px-1.5">View all →</button>
                </div>
                
                <div className="space-y-2">
                  {activities.slice(0, 3).map((act, idx) => (
                    <motion.div
                      key={act.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.08 }}
                      whileHover={{ scale: 1.02, x: 2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => navigate('/receipt-dark')}
                      className="p-3.5 rounded-lg border border-slate-800/40 bg-slate-900/30 backdrop-blur-sm hover:border-cyan-500/20 hover:bg-slate-900/50 transition-all duration-300 cursor-pointer flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3 text-left min-w-0">
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center bg-slate-800/60 border border-slate-700/50 group-hover:border-slate-600 transition-colors">
                          <span className={`w-2 h-2 rounded-full ${act.status === 'Blocked' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]'}`} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-white truncate">{act.title}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5 truncate">{act.description}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-600 flex-shrink-0 group-hover:text-slate-400 transition-colors" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </PullToRefresh>
  );
}
