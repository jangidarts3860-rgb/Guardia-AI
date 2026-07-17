import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store';
import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, ShieldCheck, ShieldAlert, ChevronRight, X } from 'lucide-react';
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
  const [dismissedNudges, setDismissedNudges] = useState<string[]>([]);

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
      <div className="flex flex-col min-h-full pb-[calc(6rem+env(safe-area-inset-bottom))] p-4 space-y-4 bg-transparent text-white">
        {isRefreshing && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-2 bg-slate-900/90 border border-slate-800 rounded-full px-4 py-2 shadow-lg">
            <span className="w-3.5 h-3.5 border-2 border-sky-400/30 border-t-sky-400 rounded-full animate-spin" />
            <span className="text-xs font-bold text-sky-400">Refreshing...</span>
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
            <div className="sticky top-0 z-30 bg-transparent -mx-4 -mt-4 px-4 pt-4 pb-2">
              <div className="flex justify-between items-center">
                <div className="text-left flex-1 min-w-0 pr-2">
                  <p className="text-sm text-slate-400 font-medium truncate">
                    {(function() { const h = new Date().getHours(); return h < 12 ? 'Good morning,' : h < 18 ? 'Good afternoon,' : 'Good evening,'; })()}
                  </p>
                  <h2 className="text-3xl font-extrabold tracking-tight text-white truncate mt-0.5">
                    {profile.name ? profile.name.split(' ')[0] : 'Rohan'}
                  </h2>
                </div>
                <div className="flex items-center space-x-2">
                  <button onClick={() => navigate('/notifications')} className="relative p-2.5 rounded-full border bg-slate-900 border-slate-800" aria-label="Notifications">
                    <Bell className="w-5 h-5 text-sky-400" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" aria-hidden="true" />
                  </button>
                  <button onClick={() => navigate('/me-profile')} className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center overflow-hidden" aria-label="Profile">
                    {profile.photo ? <img src={profile.photo} alt="" className="w-full h-full object-cover" /> : <span className="text-sky-400 font-bold text-sm">{profile.name ? profile.name.charAt(0).toUpperCase() : 'R'}</span>}
                  </button>
                </div>
              </div>
            </div>

            {/* AI Shield Status Card — exactly matches reference */}
            <div onClick={() => setIsShieldActive(!isShieldActive)} className={`p-5 rounded-3xl border transition-all duration-300 flex items-center space-x-5 text-left cursor-pointer select-none active:scale-[0.98] ${isShieldActive ? 'bg-[#0f1c18] border-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.05)]' : 'bg-slate-900 border-slate-800'}`} role="switch" aria-checked={isShieldActive} tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setIsShieldActive(!isShieldActive); }}>
              <div className="relative shrink-0 flex items-center justify-center w-[68px] h-[68px]">
                {isShieldActive ? (
                  <div className="relative w-full h-full rounded-full border-[1px] border-emerald-900/40 flex items-center justify-center shadow-[inset_0_0_15px_rgba(16,185,129,0.05)]">
                    <div className="absolute inset-0 rounded-full animate-ping border border-emerald-500/30 opacity-20" style={{ animationDuration: '3s' }}></div>
                    <div className="absolute inset-1 rounded-full border-[1px] border-emerald-800/40 flex items-center justify-center animate-pulse" style={{ animationDuration: '4s' }}>
                      <div className="absolute inset-1.5 rounded-full border-[1.5px] border-emerald-700/50 flex items-center justify-center bg-[#020617]/50">
                        <ShieldCheck className="w-6 h-6 text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.6)] animate-pulse" strokeWidth={1.5} style={{ animationDuration: '2s' }} />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative w-full h-full rounded-full border-[1px] border-slate-800 flex items-center justify-center animate-[spin_20s_linear_infinite]">
                    <div className="absolute inset-1 rounded-full border-[1px] border-slate-700/50 flex items-center justify-center animate-[spin_15s_linear_infinite_reverse]">
                      <div className="absolute inset-1.5 rounded-full border-[1.5px] border-slate-600/50 flex items-center justify-center bg-[#020617]/50 shadow-[0_0_15px_rgba(34,211,238,0.2)] animate-pulse">
                        <ShieldAlert className="w-6 h-6 text-slate-400 drop-shadow-md" strokeWidth={1.5} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className={`inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full border ${isShieldActive ? 'border-emerald-500/10 bg-[#132a22] text-emerald-400' : 'border-slate-700 bg-slate-800 text-slate-400'} text-[9px] font-bold mb-1.5`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${isShieldActive ? 'bg-emerald-400' : 'bg-slate-500'}`} aria-hidden="true" />
                  <span className="tracking-widest uppercase">{isShieldActive ? 'Protected' : 'Paused'}</span>
                </div>
                <h3 className="text-xl font-bold tracking-tight text-white leading-tight">{isShieldActive ? 'AI Shield Active' : 'Shield is Paused'}</h3>
                <p className="text-xs text-slate-400 leading-tight mt-1">{isShieldActive ? `${blockedCount} scams blocked • 0 threats today` : 'Tap to resume active defense.'}</p>
              </div>
            </div>

            {/* Monthly Waste Tracker — compact reference style */}
            <div className="p-4 rounded-2xl border text-left card-surface transition-all duration-300 active:scale-[0.98]">
              <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-slate-400 font-mono">Monthly Waste Tracker</span>
              <div className="flex items-baseline justify-between mt-2">
                <div className="flex items-baseline space-x-2">
                  <span className={`text-3xl font-black tracking-tight ${wastedAmount > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                    <AnimatedNumber value={wastedAmount} prefix="₹" format />
                  </span>
                  <span className="text-xs text-slate-400 font-medium">this month</span>
                </div>
                {wastedAmount > 0 && (
                  <button onClick={(e) => { e.stopPropagation(); navigate('/subs-dashboard'); }} className="flex items-center space-x-0.5 text-xs text-cyan-400 font-bold hover:text-cyan-300 transition focus-visible:ring-2 focus-visible:ring-sky-500 rounded">
                    <span>Fix now</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <p className="text-[11px] text-slate-400 mt-1.5">
                {wastedAmount > 0 ? `wasted on ${subscriptions.filter(s => s.isUnused && s.status === 'Active').length} unused subscription${subscriptions.filter(s => s.isUnused && s.status === 'Active').length > 1 ? 's' : ''}` : 'No unused subscriptions detected'}
              </p>
              <div className="w-full bg-slate-800/50 rounded-full h-2 mt-3 overflow-hidden" role="progressbar" aria-valuenow={wastedAmount > 0 ? 45 : 0} aria-valuemin={0} aria-valuemax={100} aria-label="Waste progress">
                <div className={`h-2 rounded-full transition-all duration-700 ${wastedAmount > 0 ? 'bg-gradient-to-r from-red-500 via-orange-500 to-amber-400' : 'bg-emerald-500'}`} style={{ width: wastedAmount > 0 ? '45%' : '0%' }} />
                <span className="sr-only">{wastedAmount > 0 ? '45% potential savings identified' : 'No unused subscriptions'}</span>
              </div>
            </div>

            {/* Smart Nudges */}
            <div className="text-left">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Smart Nudges</h3>
                <span className="text-[10px] font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-full">New Alerts</span>
              </div>
              <div className="relative">
                <div className="flex space-x-3 overflow-x-auto pb-1 scrollbar-none">
                  <AnimatePresence>
                    {subscriptions.length > 0 && !dismissedNudges.includes('sub') && (
                      <motion.div initial={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8, width: 0, marginLeft: 0, marginRight: 0, padding: 0, overflow: 'hidden' }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => { setSelectedSub(subscriptions[0]); navigate('/sub-detail'); }} className="p-4 rounded-2xl border shrink-0 w-44 text-left cursor-pointer bg-slate-900/80 border-slate-800 shadow-sm relative overflow-hidden group">
                        <button onClick={(e) => { e.stopPropagation(); setDismissedNudges(prev => [...prev, 'sub']); }} className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-800/50 hover:bg-slate-700 text-slate-400 hover:text-white transition z-20" aria-label="Dismiss alert"><X className="w-3 h-3" /></button>
                        <div className="absolute top-0 -inset-full h-full w-1/2 z-0 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 animate-shine" />
                        <div className="mb-2 relative z-10">
                          {getSubscriptionLogo(subscriptions[0].id, subscriptions[0].name, "w-8 h-8 rounded-lg shadow-md")}
                        </div>
                        <h4 className="font-bold text-xs text-white relative z-10">{subscriptions[0].name} Alert</h4>
                        <p className="text-[10px] text-slate-400 mt-0.5 relative z-10">Not used in 47 days</p>
                        <p className="text-[10px] text-emerald-400 font-extrabold mt-3 relative z-10 drop-shadow-[0_0_4px_rgba(16,185,129,0.4)]">Save ₹{subscriptions[0].cost}/mo</p>
                      </motion.div>
                    )}
                    {!dismissedNudges.includes('scam') && (
                      <motion.div initial={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8, width: 0, marginLeft: 0, marginRight: 0, padding: 0, overflow: 'hidden' }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => navigate('/scan-qr')} className="p-4 rounded-2xl border shrink-0 w-44 text-left cursor-pointer bg-slate-900/80 border-slate-800 shadow-sm relative overflow-hidden group">
                        <button onClick={(e) => { e.stopPropagation(); setDismissedNudges(prev => [...prev, 'scam']); }} className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-800/50 hover:bg-slate-700 text-slate-400 hover:text-white transition z-20" aria-label="Dismiss alert"><X className="w-3 h-3" /></button>
                        <div className="absolute top-0 -inset-full h-full w-1/2 z-0 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 animate-shine" style={{ animationDelay: '1s' }} />
                        <div className="mb-2 w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center relative z-10 shadow-[inset_0_0_8px_rgba(239,68,68,0.2)]">
                          <ShieldAlert className="w-4.5 h-4.5 text-red-500 drop-shadow-[0_0_4px_rgba(239,68,68,0.5)]" />
                        </div>
                        <h4 className="font-bold text-xs text-white relative z-10">Scam SMS</h4>
                        <p className="text-[10px] text-slate-400 mt-0.5 relative z-10">Urgency phrase detected</p>
                        <p className="text-[10px] text-red-400 font-extrabold mt-3 relative z-10 drop-shadow-[0_0_4px_rgba(239,68,68,0.4)]">High Risk Alert</p>
                      </motion.div>
                    )}
                    {!dismissedNudges.includes('security') && (
                      <motion.div initial={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8, width: 0, marginLeft: 0, marginRight: 0, padding: 0, overflow: 'hidden' }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => navigate('/security')} className="p-4 rounded-2xl border shrink-0 w-44 text-left cursor-pointer bg-slate-900/80 border-slate-800 shadow-sm relative overflow-hidden group">
                        <button onClick={(e) => { e.stopPropagation(); setDismissedNudges(prev => [...prev, 'security']); }} className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-800/50 hover:bg-slate-700 text-slate-400 hover:text-white transition z-20" aria-label="Dismiss alert"><X className="w-3 h-3" /></button>
                        <div className="absolute top-0 -inset-full h-full w-1/2 z-0 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 animate-shine" style={{ animationDelay: '2s' }} />
                        <div className="mb-2 w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center relative z-10 shadow-[inset_0_0_8px_rgba(16,185,129,0.2)]">
                          <ShieldCheck className="w-4.5 h-4.5 text-emerald-500 drop-shadow-[0_0_4px_rgba(16,185,129,0.5)]" />
                        </div>
                        <h4 className="font-bold text-xs text-white relative z-10">Device Scan</h4>
                        <p className="text-[10px] text-slate-400 mt-0.5 relative z-10">All systems secure</p>
                        <p className="text-[10px] text-emerald-400 font-extrabold mt-3 relative z-10 drop-shadow-[0_0_4px_rgba(16,185,129,0.4)]">100% Protected</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                {/* Scroll Hint Overlay */}
                <div className="absolute right-0 top-0 bottom-1 w-8 bg-gradient-to-l from-[#020617] to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Recent Activity */}
            <div className="text-left">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Recent Activity</h3>
                <button onClick={() => navigate('/activity-log')} className="text-xs text-sky-400 hover:underline">View all</button>
              </div>
              <div className="space-y-2">
                {activities.slice(0, 3).map((act, i) => (
                  <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + (i * 0.1) }} key={act.id} onClick={() => navigate('/receipt-dark')} className="p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer card-surface hover:border-sky-500/40">
                    <div className="flex items-center space-x-3 text-left">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-slate-900 border border-slate-800 shadow-inner">
                        <span className={`w-2 h-2 rounded-full ${act.status === 'Blocked' ? 'bg-red-500 shadow-[0_0_8px_#ef4444]' : 'bg-emerald-500 shadow-[0_0_8px_#10b981]'}`} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">{act.title}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{act.description} • {act.time}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
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
