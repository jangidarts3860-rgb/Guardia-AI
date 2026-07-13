import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store';
import { useState, useCallback, useEffect } from 'react';
import { motion } from 'motion/react';
import { Bell, WifiOff, ShieldCheck, ShieldAlert, ChevronRight } from 'lucide-react';
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

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="flex flex-col min-h-full pb-24 p-4 space-y-6 bg-slate-950 text-white">
        {isRefreshing && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-2 bg-slate-900/90 border border-slate-800 rounded-full px-4 py-2 shadow-lg">
            <span className="w-3.5 h-3.5 border-2 border-sky-400/30 border-t-sky-400 rounded-full animate-spin" />
            <span className="text-xs font-bold text-sky-400">Refreshing...</span>
          </div>
        )}
        {isOffline && (
          <div className="bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold p-3 rounded-xl flex items-center justify-between shadow-sm" role="alert">
            <div className="flex items-center space-x-2">
              <WifiOff className="w-4 h-4" aria-hidden="true" />
              <span>You're offline. Live scanning paused.</span>
            </div>
            <button onClick={() => navigate('/security')} className="underline focus-visible:ring-2 focus-visible:ring-amber-500 rounded">View Security</button>
          </div>
        )}

        {isInitialLoading ? (
          <div className="space-y-4">
            {[1, 2].map(i => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Skeleton className={i === 1 ? 'h-[120px]' : 'h-[100px]'} />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="space-y-5">
            <div className="sticky top-0 z-30 bg-slate-950 -mx-4 -mt-4 px-4 pt-4 pb-2">
              <div className="flex justify-between items-center">
                <div className="text-left">
                  <p className="text-xs text-slate-300">{(function() { const h = new Date().getHours(); return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening'; })()}, {profile.name ? profile.name.split(' ')[0] : 'Rohan'}</p>
                  <div className="flex items-center space-x-1.5 mt-0.5">
                    <GuardiaLogo size={20} variant="icon" />
                    <h2 className="text-xl font-bold tracking-tight">Your Shield</h2>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button onClick={() => navigate('/notifications')} className="relative p-2.5 rounded-full border border-slate-700/50 bg-slate-800/40 hover:bg-slate-800/60 hover:border-cyan-500/30 transition-all duration-200 backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-cyan-500" aria-label="Notifications">
                    <Bell className="w-5 h-5 text-cyan-400" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 shadow-[0_0_6px_#ef4444]" aria-hidden="true" />
                  </button>
                  <button onClick={() => navigate('/me-profile')} className="w-10 h-10 rounded-full bg-slate-800/40 border border-slate-700/50 hover:border-cyan-500/30 flex items-center justify-center overflow-hidden transition-all duration-200 focus-visible:ring-2 focus-visible:ring-cyan-500" aria-label="Profile">
                    {profile.photo ? <img src={profile.photo} alt="" className="w-full h-full object-cover" /> : <span className="text-cyan-400 font-bold text-sm">{profile.name ? profile.name.charAt(0).toUpperCase() : 'R'}</span>}
                  </button>
                </div>
              </div>
            </div>

            {/* Today's Status Card */}
            <div onClick={() => setIsShieldActive(!isShieldActive)} className={`p-6 rounded-[24px] border backdrop-blur-md transition-all duration-300 flex items-center space-x-5 text-left cursor-pointer select-none ${isShieldActive ? 'bg-slate-800/60 border-emerald-500/20 shadow-[0_0_28px_-8px_rgba(16,185,129,0.2)]' : 'bg-slate-900/50 border-slate-800/50 opacity-85 hover:border-slate-700/50'}`} role="switch" aria-checked={isShieldActive} tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setIsShieldActive(!isShieldActive); }}>
              <div className="relative shrink-0 flex items-center justify-center w-16 h-16">
                {isShieldActive ? (
                  <div className="absolute w-16 h-16 rounded-full bg-emerald-500/10 blur-xl" aria-hidden="true" />
                ) : (
                  <div className="absolute w-16 h-16 rounded-full bg-slate-700/10 blur-xl" aria-hidden="true" />
                )}
                <div className={`relative w-14 h-14 rounded-full border flex items-center justify-center ${isShieldActive ? 'bg-emerald-950/40 border-emerald-500/40 shadow-[inset_0_1px_0_rgba(16,185,129,0.2)]' : 'bg-slate-700/30 border-slate-600/40'}`}>
                  {isShieldActive ? (
                    <ShieldCheck className="w-7 h-7 text-emerald-400" />
                  ) : (
                    <ShieldAlert className="w-7 h-7 text-slate-500" />
                  )}
                </div>
              </div>
              <div className="flex-1 space-y-1.5 min-w-0">
                <div className={`inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full border ${isShieldActive ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400' : 'border-slate-700 bg-slate-800 text-slate-400'} text-[10px] font-bold`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${isShieldActive ? 'bg-emerald-400' : 'bg-slate-500'}`} aria-hidden="true" />
                  <span className="tracking-wide uppercase">{isShieldActive ? 'Protected' : 'Paused'}</span>
                </div>
                <h3 className="text-base font-extrabold tracking-tight text-white leading-none mt-0.5">{isShieldActive ? 'AI Shield Active' : 'Shield is Paused'}</h3>
                <p className="text-xs text-slate-400 leading-tight">{isShieldActive ? `${blockedCount} scam${blockedCount !== 1 ? 's' : ''} blocked • No threats detected` : 'Tap to resume active defense.'}</p>
              </div>
            </div>

            {/* Potential Monthly Savings Card */}
            <div className="p-5 rounded-2xl border bg-slate-800/50 border-cyan-500/15 backdrop-blur-md shadow-[0_0_24px_-8px_rgba(6,182,212,0.15)] text-left hover:border-cyan-500/25 transition-all duration-300">
              <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400">Potential Monthly Savings</span>
              <div className="flex justify-between items-end mt-2 mb-2">
                <div>
                  <div className="flex items-baseline space-x-1.5">
                    <AnimatedNumber value={wastedAmount} prefix="₹" className={`text-3xl font-extrabold ${wastedAmount > 0 ? 'text-cyan-400' : 'text-emerald-500'}`} format />
                  </div>
                  <span className="text-xs font-medium text-slate-400 mt-1 block">possible savings</span>
                </div>
                {wastedAmount > 0 ? (
                  <button onClick={() => navigate('/subs-dashboard')} className="flex items-center space-x-1.5 text-xs text-cyan-400 font-semibold hover:text-cyan-300 hover:gap-1 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-cyan-500 rounded px-2 py-1">
                    <span>Review</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <span className="inline-flex items-center space-x-1 text-xs text-emerald-400 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" aria-hidden="true" />
                    <span>All Good!</span>
                  </span>
                )}
              </div>
              <span className="text-xs text-slate-400">
                {wastedAmount > 0 ? `can be saved on ${subscriptions.filter(s => s.isUnused && s.status === 'Active').length} unused subscription${subscriptions.filter(s => s.isUnused && s.status === 'Active').length > 1 ? 's' : ''}` : 'No unused subscriptions detected'}
              </span>
              <div className="w-full bg-slate-800/40 rounded-full h-1.5 mt-3 overflow-hidden border border-slate-800/10" role="progressbar" aria-valuenow={wastedAmount > 0 ? 45 : 0} aria-valuemin={0} aria-valuemax={100} aria-label="Potential savings progress">
                <div className={`h-1.5 rounded-full ${wastedAmount > 0 ? 'bg-gradient-to-r from-red-500 to-amber-500' : 'bg-emerald-500'}`} style={{ width: wastedAmount > 0 ? '45%' : '0%' }} />
                <span className="sr-only">{wastedAmount > 0 ? '45% potential savings identified' : 'No unused subscriptions'}</span>
              </div>
            </div>

            {/* Smart Nudges */}
            <div className="text-left">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">Smart Alerts</h3>
                <span className="text-[10px] font-bold text-cyan-400 bg-cyan-500/15 px-2.5 py-1 rounded-full border border-cyan-500/20">New</span>
              </div>
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {subscriptions.length > 0 && (
                  <div onClick={() => { setSelectedSub(subscriptions[0]); navigate('/sub-detail'); }} className="p-5 rounded-2xl border border-slate-800/60 bg-slate-800/50 backdrop-blur-md shrink-0 w-48 text-left cursor-pointer hover:border-amber-500/30 hover:shadow-[0_0_20px_-8px_rgba(245,158,11,0.2)] transition-all duration-300">
                    <div className="mb-2">
                      {getSubscriptionLogo(subscriptions[0].id, subscriptions[0].name, "w-9 h-9 rounded-lg")}
                    </div>
                    <h4 className="font-semibold text-xs text-white">{subscriptions[0].name}</h4>
                    <p className="text-[11px] text-slate-400 mt-1">Not used in 47 days</p>
                    <p className="text-[11px] text-amber-400 font-bold mt-3">Save ₹{subscriptions[0].cost}/mo</p>
                  </div>
                )}
                <div onClick={() => navigate('/scan-qr')} className="p-5 rounded-2xl border border-red-500/20 bg-red-500/10 backdrop-blur-md shrink-0 w-48 text-left cursor-pointer hover:border-red-500/40 hover:shadow-[0_0_20px_-8px_rgba(239,68,68,0.2)] transition-all duration-300">
                  <div className="mb-2 w-9 h-9 rounded-lg bg-red-500/20 flex items-center justify-center">
                    <ShieldAlert className="w-5 h-5 text-red-400" />
                  </div>
                  <h4 className="font-semibold text-xs text-white">Scam SMS</h4>
                  <p className="text-[11px] text-slate-300 mt-1">Urgency phrase detected</p>
                  <p className="text-[11px] text-red-400 font-bold mt-3">High Risk</p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="text-left">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">Recent Activity</h3>
                <button onClick={() => navigate('/activity-log')} className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">View all</button>
              </div>
              <div className="space-y-2.5">
                {activities.slice(0, 3).map((act) => (
                  <motion.div 
                    key={act.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ x: 4 }}
                    onClick={() => navigate('/receipt-dark')} 
                    className={`p-4 rounded-2xl border backdrop-blur-sm flex items-center justify-between cursor-pointer transition-all duration-300 ${act.status === 'Blocked' ? 'border-red-500/20 bg-red-500/5 hover:border-red-500/40 hover:shadow-[0_0_16px_-6px_rgba(239,68,68,0.15)]' : 'border-emerald-500/20 bg-emerald-500/5 hover:border-emerald-500/40 hover:shadow-[0_0_16px_-6px_rgba(16,185,129,0.15)]'}`}
                  >
                    <div className="flex items-center space-x-3 text-left min-w-0">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${act.status === 'Blocked' ? 'bg-red-500/15 border border-red-500/30' : 'bg-emerald-500/15 border border-emerald-500/30'}`}>
                        <span className={`w-2.5 h-2.5 rounded-full ${act.status === 'Blocked' ? 'bg-red-400 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.5)]'}`} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-white truncate">{act.title}</p>
                        <p className={`text-[11px] mt-0.5 ${act.status === 'Blocked' ? 'text-red-400/80' : 'text-emerald-400/80'}`}>{act.description} • {act.time}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500 shrink-0 ml-2" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </PullToRefresh>
  );
}
