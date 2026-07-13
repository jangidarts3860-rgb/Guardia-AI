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
      <div className="flex flex-col min-h-full pb-24 p-4 space-y-4 bg-slate-950 text-white">
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

            <div onClick={() => setIsShieldActive(!isShieldActive)} className="p-5 rounded-[24px] border bg-slate-900 border-slate-800 text-left cursor-pointer select-none" role="switch" aria-checked={isShieldActive} tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setIsShieldActive(!isShieldActive); }}>
              <span className="text-xs font-bold tracking-wider uppercase text-slate-300">Today's Status</span>
              <div className="flex items-center space-x-4 mt-3">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center ${isShieldActive ? 'bg-emerald-900/30 border border-emerald-800/50' : 'bg-slate-800 border border-slate-700'}`}>
                  {isShieldActive ? (
                    <ShieldCheck className="w-7 h-7 text-emerald-400" />
                  ) : (
                    <ShieldAlert className="w-7 h-7 text-slate-500" />
                  )}
                </div>
                <div>
                  <p className="text-lg font-bold">{isShieldActive ? 'AI Shield Active' : 'Shield is Paused'}</p>
                  <p className="text-xs text-slate-400">{isShieldActive ? `${blockedCount} scam${blockedCount !== 1 ? 's' : ''} blocked today` : 'Tap to resume active defense.'}</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-800">
                <p className="text-xs text-slate-400">Potential Monthly Savings</p>
                <p className="text-2xl font-extrabold text-sky-400">₹{wastedAmount.toLocaleString('en-IN')}</p>
              </div>
            </div>

            {/* Smart Nudges */}
            <div className="text-left">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Smart Nudges</h3>
                <span className="text-[10px] font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-full">New Alerts</span>
              </div>
              <div className="flex space-x-3 overflow-x-auto pb-1 scrollbar-none">
                {subscriptions.length > 0 && (
                  <div onClick={() => { setSelectedSub(subscriptions[0]); navigate('/sub-detail'); }} className="p-4 rounded-2xl border border-slate-800 bg-slate-900/50 shrink-0 w-44 text-left cursor-pointer hover:border-sky-500/40 transition">
                    <div className="mb-2">
                      {getSubscriptionLogo(subscriptions[0].id, subscriptions[0].name, "w-8 h-8 rounded-lg")}
                    </div>
                    <h4 className="font-bold text-xs text-white">{subscriptions[0].name} Alert</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">Not used in 47 days</p>
                    <p className="text-[10px] text-emerald-400 font-extrabold mt-3">Save ₹{subscriptions[0].cost}/mo</p>
                  </div>
                )}
                <div onClick={() => navigate('/scan-qr')} className="p-4 rounded-2xl border border-slate-800 bg-slate-900/50 shrink-0 w-44 text-left cursor-pointer hover:border-sky-500/40 transition">
                  <div className="mb-2 w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                    <ShieldAlert className="w-4.5 h-4.5 text-red-500" />
                  </div>
                  <h4 className="font-bold text-xs text-white">Scam SMS</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Urgency phrase detected</p>
                  <p className="text-[10px] text-red-400 font-extrabold mt-3">High Risk Alert</p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="text-left">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Recent Activity</h3>
                <button onClick={() => navigate('/activity-log')} className="text-xs text-sky-400 hover:underline">View all</button>
              </div>
              <div className="space-y-2">
                {activities.slice(0, 3).map((act) => (
                  <div key={act.id} onClick={() => navigate('/receipt-dark')} className="p-3.5 rounded-2xl border border-slate-800 bg-slate-900/30 flex items-center justify-between cursor-pointer hover:border-sky-500/40 transition">
                    <div className="flex items-center space-x-3 text-left">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-slate-900 border border-slate-800">
                        <span className={`w-2 h-2 rounded-full ${act.status === 'Blocked' ? 'bg-red-500 shadow-[0_0_8px_#ef4444]' : 'bg-emerald-500 shadow-[0_0_8px_#10b981]'}`} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">{act.title}</p>
                        <p className="text-[10px] text-slate-500 mt-0.5">{act.description} • {act.time}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </PullToRefresh>
  );
}
