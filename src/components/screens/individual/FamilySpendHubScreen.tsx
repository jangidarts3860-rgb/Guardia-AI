import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store';
import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ChevronRight, ShieldCheck, Users } from 'lucide-react';
import AnimatedNumber from '../../ui/shared/AnimatedNumber';
import { getSubscriptionLogo } from '../Screens';
import { Subscription } from '../../../types';

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

export default function FamilySpendHubScreen() {
  const navigate = useNavigate();
  const { subscriptions } = useStore();
  const [selectedMember, setSelectedMember] = useState<string | null>(null);

  const totalFamilySpend = familyMembers.reduce((sum, m) => sum + m.subscriptions.reduce((s, sub) => s + sub.cost, 0), 0);

  return (
    <div className="flex flex-col min-h-full pb-24 bg-transparent text-white">
      <div className="sticky top-0 z-30 bg-transparent/95 backdrop-blur-md px-4 pt-4 pb-2 space-y-3">
        <div className="flex justify-between items-center text-left">
          <div className="flex items-center space-x-2">
            <button onClick={() => navigate('/subs-dashboard')} className="p-2 -ml-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 transition focus-visible:ring-2 focus-visible:ring-sky-500" aria-label="Go back">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <span className="text-xs font-extrabold tracking-widest text-slate-400 uppercase font-mono">FAMILY GUARD</span>
              <h1 className="text-2xl font-extrabold tracking-tight mt-0.5">Family Spends</h1>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-extrabold tracking-widest text-slate-400 uppercase font-mono block">FAMILY TOTAL</span>
            <span className="text-sm bg-red-950/40 text-red-400 border border-red-500/15 px-2.5 py-0.5 rounded-full font-black font-mono inline-block mt-0.5">
              ₹{totalFamilySpend.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs text-slate-400 bg-slate-900/50 rounded-2xl px-3 py-2 border border-slate-800/60">
          <Users className="w-4 h-4 text-sky-400 shrink-0" aria-hidden="true" />
          <span>{familyMembers.length} family profiles • Tap a member to see their subscriptions</span>
        </div>
      </div>

      <div className="px-4 pt-4 space-y-3">
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

              {isExpanded && (
                <motion.div id={`member-${member.id}-subs`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="border-t border-slate-800/60 px-4 py-3 space-y-2">
                  {member.subscriptions.map((sub) => {
                    const isCritical = sub.usagePercentage < 15;
                    const isModerate = sub.usagePercentage >= 15 && sub.usagePercentage < 60;
                    const progressColor = isCritical ? 'bg-red-500' : isModerate ? 'bg-amber-500' : 'bg-emerald-500';
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
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
