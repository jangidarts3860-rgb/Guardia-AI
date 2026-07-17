import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store';
import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, ChevronRight, Users } from 'lucide-react';
import EmptyState from '../../ui/shared/EmptyState';
import { getSubscriptionLogo } from '../Screens';
import { Subscription } from '../../../types';
import AnimatedNumber from '../../ui/shared/AnimatedNumber';

interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  emoji: string;
  subscriptions: Subscription[];
}

const familyMembers: FamilyMember[] = [
  {
    id: 'priya',
    name: 'Priya',
    relation: 'Wife',
    emoji: '👩',
    subscriptions: [
      { id: 'netflix-priya', name: 'Netflix Premium', category: 'OTT', cost: 649, billingCycle: 'monthly', renewDate: '15 Jul', usedDaysAgo: 2, usagePercentage: 78, status: 'Active', isUnused: false, alert: 'Watched regularly.', icon: '🎬' },
      { id: 'spotify-priya', name: 'Spotify Family', category: 'Music', cost: 179, billingCycle: 'monthly', renewDate: '22 Jul', usedDaysAgo: 0, usagePercentage: 94, status: 'Active', isUnused: false, alert: 'Daily active user.', icon: '🎵' },
      { id: 'amazon-priya', name: 'Amazon Prime', category: 'OTT', cost: 299, billingCycle: 'monthly', renewDate: '10 Aug', usedDaysAgo: 5, usagePercentage: 45, status: 'Active', isUnused: false, alert: 'Used occasionally.', icon: '🎬' },
    ]
  },
  {
    id: 'arjun',
    name: 'Arjun',
    relation: 'Son',
    emoji: '👦',
    subscriptions: [
      { id: 'youtube-arjun', name: 'YouTube Premium', category: 'OTT', cost: 189, billingCycle: 'monthly', renewDate: '18 Jul', usedDaysAgo: 0, usagePercentage: 92, status: 'Active', isUnused: false, alert: 'Used daily.', icon: '🎬' },
      { id: 'hotstar-arjun', name: 'Disney+ Hotstar', category: 'OTT', cost: 299, billingCycle: 'monthly', renewDate: '25 Jul', usedDaysAgo: 1, usagePercentage: 86, status: 'Active', isUnused: false, alert: 'Regular viewer.', icon: '🎬' },
    ]
  },
  {
    id: 'papa',
    name: 'Papa',
    relation: 'Father',
    emoji: '👴',
    subscriptions: [
      { id: 'icloud-papa', name: 'iCloud+ 2TB', category: 'SaaS', cost: 749, billingCycle: 'monthly', renewDate: '5 Aug', usedDaysAgo: 3, usagePercentage: 65, status: 'Active', isUnused: false, alert: 'Shared storage.', icon: '☁️' },
    ]
  },
];

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function SubsDashboardScreen() {
  const navigate = useNavigate();
  const { subscriptions, setSelectedSub } = useStore();
  const [activeTab, setActiveTab] = useState<'my' | 'family'>('my');
  const [selectedMember, setSelectedMember] = useState<string | null>(null);

  const myTotal = subscriptions.reduce((sum, s) => sum + s.cost, 0);
  const totalFamilySpend = familyMembers.reduce((sum, m) => sum + m.subscriptions.reduce((s, sub) => s + sub.cost, 0), 0);

  const avoidableSpend = subscriptions
    .filter(s => s.isUnused && s.status === 'Active')
    .reduce((sum, s) => sum + s.cost, 0);

  const { todaySubs, weekSubs, upcomingSubs } = useMemo(() => {
    const now = new Date();
    const today = now.getDate();
    const todayMonth = now.getMonth();

    const todayList: Subscription[] = [];
    const thisWeekList: Subscription[] = [];
    const upcomingList: Subscription[] = [];

    for (const sub of subscriptions) {
      const parts = sub.renewDate.split(' ');
      if (parts.length !== 2) {
        upcomingList.push(sub);
        continue;
      }
      const day = parseInt(parts[0]);
      const month = monthNames.indexOf(parts[1]);

      if (day === today && month === todayMonth) {
        todayList.push(sub);
      } else if (month === todayMonth && day > today && day <= today + 7) {
        thisWeekList.push(sub);
      } else {
        upcomingList.push(sub);
      }
    }

    return { todaySubs: todayList, weekSubs: thisWeekList, upcomingSubs: upcomingList };
  }, [subscriptions]);

  return (
    <div className="flex flex-col min-h-full pb-24 bg-transparent text-white overflow-x-hidden">
      <div className="sticky top-0 z-30 bg-transparent/95 backdrop-blur-md px-4 pt-4 pb-1 space-y-3">
        <div className="flex justify-between items-center text-left">
          <AnimatePresence mode="wait">
            {activeTab === 'my' ? (
              <motion.div key="my-title" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} transition={{ duration: 0.2 }}>
                <span className="text-xs font-extrabold tracking-widest text-slate-500 uppercase font-mono">SUBSCRIPTIONS</span>
                <h2 className="text-xl font-black tracking-tight mt-0.5">Subscriptions</h2>
              </motion.div>
            ) : (
              <motion.div key="family-title" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} transition={{ duration: 0.2 }}>
                <span className="text-xs font-extrabold tracking-widest text-slate-500 uppercase font-mono">FAMILY GUARD</span>
                <h2 className="text-xl font-black tracking-tight mt-0.5">Family Spends</h2>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="text-right">
            <AnimatePresence mode="wait">
              {activeTab === 'my' ? (
                <motion.div key="my-spend" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.2 }}>
                  <span className="text-xs font-extrabold tracking-widest text-slate-500 uppercase font-mono block">MONTHLY SPEND</span>
                  <span className="text-sm bg-red-950/40 text-red-400 border border-red-500/15 px-2.5 py-0.5 rounded-full font-black font-mono inline-block mt-0.5">
                    ₹{myTotal.toLocaleString('en-IN')}
                  </span>
                </motion.div>
              ) : (
                <motion.div key="family-spend" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.2 }}>
                  <span className="text-xs font-extrabold tracking-widest text-slate-500 uppercase font-mono block">FAMILY TOTAL</span>
                  <span className="text-sm bg-red-950/40 text-red-400 border border-red-500/15 px-2.5 py-0.5 rounded-full font-black font-mono inline-block mt-0.5">
                    ₹{totalFamilySpend.toLocaleString('en-IN')}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="relative p-1 rounded-2xl bg-slate-900/90 border border-slate-800/60 flex space-x-1" role="tablist" aria-label="Subscription tabs">
          <motion.div 
            className="absolute top-1 bottom-1 w-[calc(50%-6px)] rounded-xl bg-sky-500 shadow-md shadow-sky-500/10 z-0"
            initial={false}
            animate={{ left: activeTab === 'family' ? 'calc(50% + 2px)' : '4px' }}
            transition={{ type: 'spring', stiffness: 350, damping: 35, mass: 1 }}
          />
          <button onClick={() => setActiveTab('my')} role="tab" aria-selected={activeTab === 'my'} className={`relative z-10 flex-1 py-2.5 text-xs font-bold rounded-xl focus-visible:ring-2 focus-visible:ring-white transition-colors duration-300 ${activeTab === 'my' ? 'text-white' : 'text-slate-400 hover:text-white'}`}>
            My spending
          </button>
          <button onClick={() => setActiveTab('family')} role="tab" aria-selected={activeTab === 'family'} className={`relative z-10 flex-1 py-2.5 text-xs font-bold rounded-xl transition-colors duration-300 ${activeTab === 'family' ? 'text-white' : 'text-slate-400 hover:text-white'}`}>
            Family spending
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {activeTab === 'my' ? (
          <motion.div 
            key="my-view" 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: -20 }} 
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="w-full flex-1 flex flex-col"
          >
            <div className="px-4 pt-4 space-y-4">
              {/* Category Allocation Chart */}
              <div className="p-4 rounded-2xl card-surface text-left border border-slate-800">
                <h3 className="text-[10px] font-mono tracking-widest text-slate-400 uppercase mb-4">Category Allocation</h3>
                <div className="flex items-center justify-between">
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                      <circle cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="#1e293b" strokeWidth="4"></circle>
                      <circle cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="#f59e0b" strokeWidth="4" strokeDasharray="82 18" strokeDashoffset="0"></circle>
                      <circle cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="#38bdf8" strokeWidth="4" strokeDasharray="11 89" strokeDashoffset="-82"></circle>
                      <circle cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="#64748b" strokeWidth="4" strokeDasharray="5 95" strokeDashoffset="-93"></circle>
                      <circle cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="#10b981" strokeWidth="4" strokeDasharray="2 98" strokeDashoffset="-98"></circle>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-[8px] font-bold text-slate-400 tracking-wider">TOTAL</span>
                      <span className="text-sm font-bold text-white">₹{(myTotal / 1000).toFixed(1)}k</span>
                    </div>
                  </div>
                  <div className="flex-1 ml-6 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-2"><span className="w-2 h-2 rounded-full bg-amber-500"></span><span className="text-white font-medium">SaaS</span></div>
                      <span className="text-white font-bold">82%</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-2"><span className="w-2 h-2 rounded-full bg-sky-400"></span><span className="text-white font-medium">OTT</span></div>
                      <span className="text-white font-bold">11%</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-2"><span className="w-2 h-2 rounded-full bg-slate-500"></span><span className="text-white font-medium">Unknown</span></div>
                      <span className="text-white font-bold">5%</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-2"><span className="w-2 h-2 rounded-full bg-emerald-500"></span><span className="text-white font-medium">Music</span></div>
                      <span className="text-white font-bold">2%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-left flex-1 flex flex-col px-4 pb-4 pt-4 space-y-4" style={{ minHeight: 220 }}>
              {subscriptions.length === 0 ? (
                <EmptyState icon="credit-card" title="No subscriptions" description="Add your first subscription to start tracking." />
              ) : (
                <div>
                  <h3 className="text-[10px] font-mono tracking-widest uppercase text-slate-400 mb-3">Active Subscriptions</h3>
                  <div className="space-y-3">
                    {subscriptions.map((sub) => (
                      <SubscriptionRow key={sub.id} sub={sub} onClick={() => { setSelectedSub(sub); navigate('/sub-detail'); }} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="family-view" 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: 20 }} 
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="w-full flex-1 flex flex-col px-4 pt-4 space-y-3"
          >
            <div className="flex items-center space-x-2 text-xs text-slate-400 bg-slate-900/50 rounded-2xl px-3 py-2 border border-slate-800/60 mb-1">
              <Users className="w-4 h-4 text-sky-400 shrink-0" aria-hidden="true" />
              <span>{familyMembers.length} family profiles • Tap a member to see their subscriptions</span>
            </div>

            {familyMembers.map((member) => {
              const memberTotal = member.subscriptions.reduce((s, sub) => s + sub.cost, 0);
              const isExpanded = selectedMember === member.id;
              return (
                <motion.div key={member.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-slate-800 bg-slate-900/30 overflow-hidden">
                  <button onClick={() => setSelectedMember(isExpanded ? null : member.id)}
                    className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-800/20 transition focus-visible:ring-2 focus-visible:ring-sky-500"
                    aria-expanded={isExpanded} aria-controls={`member-${member.id}-subs`}>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-lg" role="img" aria-label={`${member.name}'s profile avatar`}>{member.emoji}</div>
                      <div>
                        <p className="font-extrabold text-sm text-white">{member.name}</p>
                        <p className="text-xs text-slate-400">{member.relation} • {member.subscriptions.length} subscription{member.subscriptions.length !== 1 ? 's' : ''}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono font-extrabold text-white">₹{memberTotal.toLocaleString('en-IN')}<span className="text-[8px] text-slate-400 font-bold">/mo</span></span>
                      <motion.div animate={{ rotate: isExpanded ? 90 : 0 }} transition={{ duration: 0.2 }}>
                        <ChevronRight className="w-4 h-4 text-slate-600" />
                      </motion.div>
                    </div>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div id={`member-${member.id}-subs`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="border-t border-slate-800/60 px-4 py-3 space-y-2">
                        {member.subscriptions.map((sub) => {
                          const isCritical = sub.usagePercentage < 15;
                          const isModerate = sub.usagePercentage >= 15 && sub.usagePercentage < 60;
                          const textColor = isCritical ? 'text-red-400' : isModerate ? 'text-amber-400' : 'text-emerald-400';
                          const statusLabel = isCritical ? 'Low Usage' : isModerate ? 'Moderate' : 'Active';

                          return (
                            <div key={sub.id} className="p-3 rounded-xl bg-transparent/50 border border-slate-800/40 flex items-center justify-between">
                              <div className="flex items-center space-x-2.5 text-left flex-1 min-w-0">
                                {getSubscriptionLogo(sub.id, sub.name, 'w-8 h-8')}
                                <div className="min-w-0">
                                  <p className="text-xs font-bold text-white truncate">{sub.name}</p>
                                  <p className="text-xs text-slate-400">Renews {sub.renewDate}</p>
                                </div>
                              </div>
                              <div className="text-right flex items-center space-x-2">
                                <AnimatedNumber value={sub.cost} prefix="₹" className="text-xs font-extrabold font-mono text-white" format />
                                <span className={`text-[8px] font-bold uppercase ${textColor}`}>{statusLabel}</span>
                              </div>
                            </div>
                          );
                        })}
                        {member.relation !== 'Wife' && (
                          <div className="pt-2 pb-1 text-xs text-slate-400 leading-relaxed">
                            Detailed transaction history is hidden according to privacy laws. Cost totals only.
                          </div>
                        )}
                        <div className="flex items-center space-x-1.5 pt-1 text-xs text-sky-400">
                          <ShieldCheck className="w-3 h-3" aria-hidden="true" />
                          <span>Protected by Guardia AI</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SubscriptionRow({ sub, onClick }: { key?: string; sub: Subscription; onClick: () => void }) {
  const isWaste = sub.isUnused && sub.status === 'Active';
  const utilization = isWaste ? 3 : 85;
  const category = sub.name === 'Netflix' ? 'OTT' : sub.name.includes('Spotify') ? 'Music' : sub.name.includes('Adobe') ? 'SaaS' : 'Unknown';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={onClick}
      className="p-4 rounded-2xl bg-[#0f172a]/60 border border-slate-800 flex flex-col justify-center cursor-pointer hover:border-sky-500/40 transition duration-200"
    >
      <div className="flex items-center justify-between w-full mb-3">
        <div className="flex items-center space-x-3 text-left">
          {getSubscriptionLogo(sub.id, sub.name, "w-11 h-11 rounded-full border border-slate-800")}
          <div>
            <div className="flex items-center space-x-2">
              <p className="text-base font-extrabold text-white leading-none">{sub.name}</p>
              {isWaste && (
                <span className="px-1.5 py-0.5 rounded text-[8px] font-black tracking-wider bg-red-950/60 text-red-400 border border-red-500/20">CRITICAL WASTE</span>
              )}
            </div>
            <p className="text-[10px] text-slate-400 mt-1">Renews {sub.renewDate} • {category}</p>
          </div>
        </div>
        <div className="text-right flex items-center space-x-1 text-slate-400">
          <div className="flex flex-col items-end">
            <AnimatedNumber value={sub.cost} prefix="₹" className="text-sm font-bold text-white leading-none" format />
            <span className="text-[8px] font-bold uppercase tracking-wider mt-0.5">/MO</span>
          </div>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 opacity-50"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </div>
      </div>
      
      <div className="flex items-center justify-between w-full space-x-3 mt-1">
        <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
          <div className={`h-full rounded-full ${isWaste ? 'bg-red-500' : 'bg-emerald-500'}`} style={{ width: `${utilization}%` }}></div>
        </div>
        <span className={`text-[8px] font-mono tracking-widest uppercase whitespace-nowrap ${isWaste ? 'text-red-400' : 'text-emerald-400'}`}>
          {isWaste ? `CRITICAL: UNUSED TRIAL (${utilization}%)` : `HIGHLY UTILIZED (${utilization}%)`}
        </span>
      </div>
    </motion.div>
  );
}
