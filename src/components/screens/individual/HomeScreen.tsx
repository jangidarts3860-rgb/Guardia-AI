import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store';
import { useState, useCallback, useEffect } from 'react';
import { motion } from 'motion/react';
import { Bell, WifiOff, ShieldCheck, ShieldAlert } from 'lucide-react';
import { Subscription, Bank, NotificationItem, ActivityItem } from '../../../types';
import GuardiaLogo from '../../ui/GuardiaLogo';
import PullToRefresh from '../../ui/shared/PullToRefresh';
import Skeleton from '../../ui/shared/Skeleton';

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
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="space-y-4">
            <div className="sticky top-0 z-30 bg-slate-950 -mx-4 px-4 pt-4 pb-2">
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

            <div>
              <h3 className="text-sm font-semibold tracking-wide mb-2 text-left text-slate-300">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => navigate('/subs-dashboard')} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-left hover:border-sky-500/40 transition">
                  <p className="text-xs font-bold text-white">Review Subscriptions</p>
                  <p className="text-xs text-slate-500 mt-1">Check your spending</p>
                </button>
                <button onClick={() => navigate('/scan-qr')} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-left hover:border-sky-500/40 transition">
                  <p className="text-xs font-bold text-white">Scan Message</p>
                  <p className="text-xs text-slate-500 mt-1">Check for scams</p>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </PullToRefresh>
  );
}
