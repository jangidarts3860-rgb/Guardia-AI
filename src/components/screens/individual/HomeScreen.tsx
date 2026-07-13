import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store';
import { useState, useCallback, useRef, useEffect } from 'react';
import React from 'react';
import { motion, useInView } from 'motion/react';
import { Bell, WifiOff, ShieldAlert, ChevronRight, XCircle, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Subscription, Bank, NotificationItem, ActivityItem } from '../../../types';
import GuardiaLogo from '../../ui/GuardiaLogo';
import { AppIcons } from '../../ui/shared/AppIcons';
import EmptyState from '../../ui/shared/EmptyState';
import AnimatedNumber from '../../ui/shared/AnimatedNumber';
import PullToRefresh from '../../ui/shared/PullToRefresh';
import GlassCard from '../../ui/shared/GlassCard';
import Skeleton from '../../ui/shared/Skeleton';
import { getSubscriptionLogo } from '../Screens';

const cardBgDark = 'bg-slate-900/90 border-slate-800/80 text-white';
const textMutedDark = 'text-slate-300';

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};

function SectionReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

const gradientKeyframes = [
  "radial-gradient(ellipse 80% 60% at 0% 20%, rgba(14,165,233,0.08) 0%, transparent 50%), radial-gradient(ellipse 60% 50% at 100% 40%, rgba(16,185,129,0.06) 0%, transparent 50%)",
  "radial-gradient(ellipse 80% 60% at 20% 30%, rgba(16,185,129,0.08) 0%, transparent 50%), radial-gradient(ellipse 60% 50% at 80% 20%, rgba(99,102,241,0.06) 0%, transparent 50%)",
  "radial-gradient(ellipse 80% 60% at 10% 10%, rgba(99,102,241,0.08) 0%, transparent 50%), radial-gradient(ellipse 60% 50% at 90% 50%, rgba(14,165,233,0.06) 0%, transparent 50%)",
  "radial-gradient(ellipse 80% 60% at 0% 20%, rgba(14,165,233,0.08) 0%, transparent 50%), radial-gradient(ellipse 60% 50% at 100% 40%, rgba(16,185,129,0.06) 0%, transparent 50%)",
];

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

  const cardBg = cardBgDark;
  const textMuted = textMutedDark;
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
  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="flex flex-col min-h-full pb-24 p-4 space-y-4 relative bg-slate-950 text-white">
        <motion.div
          className="fixed inset-0 pointer-events-none"
          aria-hidden="true"
          animate={{ background: gradientKeyframes }}
          transition={{ duration: 12, ease: "easeInOut", repeat: Infinity }}
        />
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
            {[1, 2, 3].map(i => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Skeleton className={i === 1 ? 'h-[120px]' : i === 2 ? 'h-[100px]' : 'h-[160px]'} />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="space-y-4">
            {/* Sticky Nav Bar only */}
            <div className="sticky top-0 z-30 bg-slate-950/95 backdrop-blur-md -mx-4 px-4 pt-4 pb-2">
              <div className="flex justify-between items-center">
                <div className="text-left">
                  <p className={`text-xs ${textMuted}`}>{(function() { const h = new Date().getHours(); return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening'; })()}, {profile.name ? profile.name.split(' ')[0] : 'Rohan'}</p>
                  <div className="flex items-center space-x-1.5 mt-0.5">
                    <GuardiaLogo size={20} variant="icon" animated={isShieldActive && !isOffline} />
                    <h2 className="text-xl font-bold tracking-tight">Your Shield</h2>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button onClick={() => navigate('/notifications')} className="p-2.5 rounded-full border relative bg-slate-900 border-slate-800 focus-visible:ring-2 focus-visible:ring-sky-500" aria-label="Notifications">
                    <Bell className="w-5 h-5 text-sky-400" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" aria-hidden="true" />
                  </button>
                  <button onClick={() => navigate('/me-profile')} className="w-10 h-10 rounded-full bg-sky-950 border border-sky-800 flex items-center justify-center overflow-hidden cursor-pointer focus-visible:ring-2 focus-visible:ring-sky-500" aria-label="Profile">
                    {profile.photo ? <img src={profile.photo} alt="" className="w-full h-full object-cover" /> : <span className="text-sky-400 font-bold text-sm">{profile.name ? profile.name.charAt(0).toUpperCase() : 'R'}</span>}
                  </button>
                </div>
              </div>
            </div>

            <div onClick={() => setIsShieldActive(!isShieldActive)} className={`p-5 rounded-[24px] border transition-all duration-300 flex items-center space-x-5 text-left cursor-pointer group select-none ${isShieldActive ? 'bg-[#1a2325] border-emerald-900/40 shadow-sm' : 'bg-slate-900/60 border-slate-800'}`} role="switch" aria-checked={isShieldActive} tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setIsShieldActive(!isShieldActive); }}>
              <div className="relative shrink-0 flex items-center justify-center w-16 h-16">
                {isShieldActive ? (
                  <div className="absolute inset-0 rounded-full bg-[#0a1516] flex items-center justify-center shadow-[0_0_15px_rgba(45,212,191,0.2)]" aria-hidden="true">
                    <div className="w-12 h-12 rounded-full border-[1.5px] border-[#153229] flex items-center justify-center">
                      <div className="w-9 h-9 rounded-full border-[1.5px] border-[#1b4334] flex items-center justify-center bg-[#0d1e18] relative">
                        <svg width="18" height="20" viewBox="0 0 24 28" fill="none"><path d="M12 2.5L2 6.5V13.5C2 19.5 6.5 25 12 27C17.5 25 22 19.5 22 13.5V6.5L12 2.5Z" stroke="#2dd4bf" strokeWidth="2.5" strokeLinecap="round"/></svg>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center border border-slate-800">
                    <ShieldAlert className="w-8 h-8 text-slate-500" />
                  </div>
                )}
              </div>
              <div className="flex-1 space-y-2 z-10 min-w-0">
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full border border-emerald-900/50 bg-[#163a2e]/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2dd4bf] shadow-[0_0_8px_#2dd4bf]" aria-hidden="true" />
                  <span className="text-xs font-semibold text-[#2dd4bf] tracking-wide">{isShieldActive ? 'Protected' : 'Paused'}</span>
                </div>
                <h3 className="text-lg font-bold tracking-tight text-white leading-none mt-1">{isShieldActive ? 'AI Shield Active' : 'Shield is Paused'}</h3>
                <p className="text-xs leading-tight text-slate-400 font-medium">{isShieldActive ? `${blockedCount} scam${blockedCount !== 1 ? 's' : ''} blocked • No threats detected today` : 'Tap to resume active defense.'}</p>
              </div>
            </div>

            <GlassCard className="p-4 text-left">
              <span className={`text-xs font-bold tracking-wider uppercase ${textMuted}`}>Potential Monthly Savings</span>
              <div className="flex justify-between items-end mt-1.5 mb-1">
                <div>
                  <AnimatedNumber value={wastedAmount} prefix="₹" className={`text-3xl font-extrabold ${wastedAmount > 0 ? 'text-sky-400' : 'text-emerald-500'}`} format />
                  <span className={`text-xs font-semibold ml-1.5 ${textMuted}`}>possible savings</span>
                </div>
                {wastedAmount > 0 ? (
                  <button onClick={() => navigate('/subs-dashboard')} className="flex items-center space-x-1 text-xs text-sky-400 font-semibold hover:underline focus-visible:ring-2 focus-visible:ring-sky-500 rounded">
                    <span>Review subscriptions</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <span className="inline-flex items-center space-x-1 text-xs text-emerald-500 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                    <span>All Good!</span>
                  </span>
                )}
              </div>
              <span className={`text-xs ${textMuted}`}>
                {wastedAmount > 0 ? `can be saved on ${subscriptions.filter(s => s.isUnused && s.status === 'Active').length} unused subscription${subscriptions.filter(s => s.isUnused && s.status === 'Active').length > 1 ? 's' : ''}` : 'No unused subscriptions detected'}
              </span>
              <div className="w-full bg-slate-800/40 rounded-full h-2 mt-3 overflow-hidden" role="progressbar" aria-valuenow={wastedAmount > 0 ? 45 : 0} aria-valuemin={0} aria-valuemax={100} aria-label="Potential savings progress">
                <div className={`h-2 rounded-full ${wastedAmount > 0 ? 'bg-gradient-to-r from-red-500 to-amber-500' : 'bg-emerald-500'}`} style={{ width: wastedAmount > 0 ? '45%' : '0%' }} />
                <span className="sr-only">{wastedAmount > 0 ? '45% potential savings identified' : 'No unused subscriptions'}</span>
              </div>
            </GlassCard>

            <SectionReveal>
              <div className="text-left">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-semibold tracking-wide">Smart Nudges</h3>
                  <span className="text-xs bg-sky-500/10 text-sky-400 font-semibold px-2 py-0.5 rounded-full">{unreadCount} new</span>
                </div>
                <motion.div className="flex space-x-3 overflow-x-auto pb-1 scrollbar-none" variants={containerVariants} initial="hidden" animate="show">
                  {subscriptions.length > 0 && (
                    <motion.div variants={itemVariants} as="div">
                      <GlassCard hover onClick={() => { setSelectedSub(subscriptions[0]); navigate('/sub-detail'); }} className="p-4 border border-red-500/30 bg-red-500/5 shrink-0 w-44 text-left">
                        <div className="mb-2">
                          {getSubscriptionLogo(subscriptions[0].id, subscriptions[0].name, "w-10 h-10")}
                        </div>
                        <h4 className="font-bold text-sm mt-2">Netflix Alert</h4>
                        <p className={`text-xs mt-0.5`} style={{ color: '#94a3b8' }}>Not used in 47 days</p>
                        <div className="flex items-center justify-between mt-3">
                          <span className="inline-flex items-center space-x-1 text-xs text-emerald-500 font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                            <span>Save ₹649/mo</span>
                          </span>
                          <span className="flex items-center text-xs text-red-400 font-semibold hover:underline">Cancel <ChevronRight className="w-3.5 h-3.5 ml-0.5" /></span>
                        </div>
                      </GlassCard>
                    </motion.div>
                  )}
                  <motion.div variants={itemVariants} as="div">
                    <GlassCard hover onClick={() => navigate('/scan-qr')} className="p-4 border border-amber-500/30 bg-amber-500/5 shrink-0 w-44 text-left">
                      <AppIcons name="warning" size="sm" />
                      <h4 className="font-bold text-sm mt-2">Scam SMS</h4>
                      <p className={`text-xs ${textMuted} mt-0.5`}>Suspicious language detected</p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="inline-flex items-center space-x-1 text-xs text-red-500 font-semibold">
                          <XCircle className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>High Risk</span>
                        </span>
                        <span className="flex items-center text-xs text-amber-400 font-semibold hover:underline">Check <ChevronRight className="w-3.5 h-3.5 ml-0.5" /></span>
                      </div>
                    </GlassCard>
                  </motion.div>
                </motion.div>
              </div>
            </SectionReveal>

            <SectionReveal>
              <div className="text-left flex-1 flex flex-col min-h-40">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-semibold tracking-wide">Recent Activity</h3>
                  <button onClick={() => navigate('/activity-log')} className="text-xs text-sky-400 hover:underline focus-visible:ring-2 focus-visible:ring-sky-500 rounded">View all</button>
                </div>
                <motion.div className="space-y-2 flex-1 overflow-y-auto" variants={containerVariants} initial="hidden" animate="show">
                  {activities.length === 0 ? (
                    <motion.div variants={itemVariants}><EmptyState icon="shield" title="No recent activity" description="You're all clear." /></motion.div>
                  ) : (
                    activities.slice(0, 4).map((act) => (
                      <motion.div key={act.id} variants={itemVariants} as="div">
                        <GlassCard hover onClick={() => navigate('/receipt-dark')} className="p-3 flex items-center justify-between">
                          <div className="flex items-center space-x-3 flex-1 min-w-0">
                            <div className={`w-8 h-8 shrink-0 rounded-lg flex items-center justify-center ${act.status === 'Blocked' ? 'bg-red-500/10 text-red-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                              {act.status === 'Blocked' ? <XCircle className="w-4.5 h-4.5" aria-hidden="true" /> : <CheckCircle2 className="w-4.5 h-4.5" aria-hidden="true" />}
                            </div>
                            <div className="text-left flex-1 min-w-0">
                              <p className="text-xs font-bold truncate">{act.title}</p>
                              <p className={`text-xs ${textMuted} truncate`}>{act.description}</p>
                            </div>
                          </div>
                          <span className={`inline-flex items-center space-x-1 text-xs px-2 py-0.5 rounded-full font-semibold ${act.status === 'Blocked' ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                            {act.status === 'Blocked' ? (
                              <>
                                <XCircle className="w-3.5 h-3.5" aria-hidden="true" />
                                <span>Blocked</span>
                              </>
                            ) : (
                              <>
                                <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                                <span>Allowed</span>
                              </>
                            )}
                          </span>
                        </GlassCard>
                      </motion.div>
                    ))
                  )}
                </motion.div>
              </div>
            </SectionReveal>
          </motion.div>
        )}
      </div>
    </PullToRefresh>
  );
}
