import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store';
import { useMemo } from 'react';
import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ChevronRight, ShieldCheck, Home } from 'lucide-react';
import EmptyState from '../../ui/shared/EmptyState';
import { getSubscriptionLogo } from '../Screens';
import { Subscription } from '../../../types';
import AnimatedNumber from '../../ui/shared/AnimatedNumber';

const categoryConfig: Record<string, { color: string; label: string }> = {
  OTT: { color: '#38bdf8', label: 'OTT' },
  SaaS: { color: '#f59e0b', label: 'SaaS' },
  Music: { color: '#22c55e', label: 'Music' },
  Wellness: { color: '#a855f7', label: 'Wellness' },
  Unknown: { color: '#ef4444', label: 'Unknown' },
};

function DonutChart({ subscriptions, total, formatTotal }: { subscriptions: Subscription[]; total: number; formatTotal: (n: number) => string }) {
  const segments = useMemo(() => {
    const catTotals: Record<string, number> = {};
    for (const sub of subscriptions) {
      catTotals[sub.category] = (catTotals[sub.category] || 0) + sub.cost;
    }
    const entries = Object.entries(catTotals);
    if (entries.length === 0 || total === 0) return [];
    const totalCost = total;
    return entries
      .map(([cat, cost]) => ({ name: cat, cost, percent: Math.round((cost / totalCost) * 100), color: categoryConfig[cat]?.color || '#94a3b8' }))
      .filter(s => s.percent > 0)
      .sort((a, b) => b.percent - a.percent);
  }, [subscriptions, total]);

  const cx = 40, cy = 40, r = 28, strokeW = 7;
  const circ = 2 * Math.PI * r;

  return (
    <div className="flex items-center space-x-6 mt-3 relative z-10">
      <motion.div initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 100, damping: 15 }} className="relative w-20 h-20 flex items-center justify-center shrink-0">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80" role="img" aria-label="Category allocation donut chart">
          <circle cx={cx} cy={cy} r={r} stroke="#1e293b" strokeWidth={strokeW} fill="transparent" />
          {segments.map((seg, i) => {
            const prevPct = segments.slice(0, i).reduce((sum, s) => sum + s.percent, 0);
            const offset = (prevPct / 100) * circ;
            const dashLen = (seg.percent / 100) * circ;
            return (
              <circle key={seg.name} cx={cx} cy={cy} r={r} stroke={seg.color} strokeWidth={strokeW} fill="transparent"
                strokeDasharray={`${dashLen} ${circ - dashLen}`} strokeDashoffset={-offset} />
            );
          })}
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-[8px] font-extrabold text-slate-500 font-mono leading-none uppercase">Total</span>
          <span className="text-xs font-black text-white font-mono mt-0.5">{formatTotal(total)}</span>
        </div>
      </motion.div>
      <div className="flex-1 space-y-1.5 text-xs font-bold" role="list" aria-label="Category breakdown">
        {segments.map((seg) => (
          <div key={seg.name} className="flex items-center justify-between" role="listitem">
            <div className="flex items-center space-x-1.5 text-slate-400"><span className="w-2 h-2 rounded shrink-0" style={{ backgroundColor: seg.color }} aria-hidden="true" /><span>{categoryConfig[seg.name]?.label || seg.name}</span></div>
            <span className="font-mono text-white">{seg.percent}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SubsDashboardScreen() {
  const navigate = useNavigate();
  const { 
    subscriptions, setSelectedSub
  } = useStore();

  const myTotal = subscriptions.reduce((sum, s) => sum + s.cost, 0);
  const monthlyBurn = myTotal;
  const formatTotal = (n: number) => n >= 1000 ? `₹${(n / 1000).toFixed(1)}k` : `₹${n}`;

  return (
    <div className="flex flex-col min-h-full pb-24 bg-slate-950 text-white">
      {/* Sticky Nav + Tabs */}
      <div className="sticky top-0 z-30 bg-slate-950/95 backdrop-blur-md px-4 pt-4 pb-1 space-y-3">
        <div className="flex justify-between items-center text-left">
          <div className="flex items-center space-x-2">
            <button onClick={() => navigate('/home')} className="p-2 -ml-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 transition focus-visible:ring-2 focus-visible:ring-sky-500" aria-label="Go home">
              <Home className="w-4 h-4 text-slate-300" />
            </button>
            <div>
              <span className="text-xs font-extrabold tracking-widest text-slate-500 uppercase font-mono">SUBSCRIPTIONS</span>
              <h2 className="text-xl font-black tracking-tight mt-0.5">Subscriptions</h2>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-extrabold tracking-widest text-slate-500 uppercase font-mono block">MONTHLY SPEND</span>
            <span className="text-sm bg-red-950/40 text-red-400 border border-red-500/15 px-2.5 py-0.5 rounded-full font-black font-mono inline-block mt-0.5">
              ₹{monthlyBurn.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        <div className="p-1 rounded-2xl bg-slate-900/90 border border-slate-800/60 flex space-x-1 relative" role="tablist" aria-label="Subscription tabs">
          <div role="tab" aria-selected={true} aria-controls="subscription-panel" className="relative z-10 flex-1 py-2.5 text-xs font-bold rounded-xl bg-sky-500 text-white shadow-md shadow-sky-500/10 text-center">
            My spending
          </div>
          <button onClick={() => navigate('/family-spend-hub')} role="tab" className={`relative z-10 flex-1 py-2.5 text-xs font-bold rounded-xl transition duration-300 text-slate-400 hover:text-white`}>
            Family spending
          </button>
        </div>
      </div>

      {/* Scrollable: Donut + List */}
      <div className="px-4 pt-4 space-y-4">
        <div className="p-4 rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/60 to-slate-950/80 text-left relative overflow-hidden shadow-xl" role="tabpanel" id="subscription-panel">
          <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/5 rounded-full blur-2xl pointer-events-none" />
          <span className="text-xs font-extrabold tracking-wider uppercase text-slate-500 font-mono">Category Allocation</span>
          <DonutChart subscriptions={subscriptions} total={monthlyBurn} formatTotal={formatTotal} />
        </div>
      </div>

      <div className="text-left flex-1 flex flex-col px-4 pb-4 pt-4" style={{ minHeight: 220 }}>
        <h3 className="text-xs font-bold tracking-wider uppercase text-slate-500 mb-2">Active Subscriptions</h3>
        <div className="space-y-2 flex-1 overflow-y-auto">
          {subscriptions.length === 0 ? (
            <EmptyState icon="credit-card" title="No subscriptions" description="Add your first subscription to start tracking." />
          ) : subscriptions.map((sub) => {
            const isCritical = sub.usagePercentage < 15;
            const isModerate = sub.usagePercentage >= 15 && sub.usagePercentage < 60;
            const progressColor = isCritical ? 'bg-red-500' : isModerate ? 'bg-amber-500' : 'bg-emerald-500';
            const textColor = isCritical ? 'text-red-400' : isModerate ? 'text-amber-400' : 'text-emerald-400';
            const statusLabel = isCritical ? 'Critical: Unused' : isModerate ? 'Moderate Usage' : 'Highly Utilized';

            return (
              <motion.div key={sub.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                onClick={() => { setSelectedSub(sub); navigate('/sub-detail'); }}
                className="p-3.5 rounded-2xl border border-slate-800 bg-slate-900/30 flex flex-col cursor-pointer hover:border-sky-500/40 transition duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 text-left">
                    {getSubscriptionLogo(sub.id, sub.name, "w-12 h-12")}
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-extrabold text-white">{sub.name}</p>
                        {isCritical && <span className="bg-red-500/10 text-red-400 text-[8px] font-black px-1.5 py-0.5 rounded border border-red-500/10 uppercase">Low Usage</span>}
                        {sub.id === 'unknown-app' && <span className="bg-amber-500/10 text-amber-500 text-[8px] font-black px-1.5 py-0.5 rounded border border-amber-500/10 uppercase">Unknown Bill</span>}
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">Renews {sub.renewDate} • {sub.category}</p>
                    </div>
                  </div>
                  <div className="text-right flex items-center space-x-1.5">
                    <div className="text-right">
                      <AnimatedNumber value={sub.cost} prefix="₹" className="text-sm font-extrabold font-mono text-white" format />
                      <p className="text-[8px] uppercase text-slate-500 font-bold">/mo</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-600" />
                  </div>
                </div>
                <div className="mt-3 flex items-center space-x-3 text-xs">
                  <div className="flex-1 bg-slate-800/40 border border-slate-800/10 rounded-full h-1.5 overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${sub.usagePercentage}%` }} transition={{ duration: 1, ease: "easeOut", delay: 0.3 }} className={`${progressColor} h-1.5 rounded-full`} />
                  </div>
                  <span className={`${textColor} shrink-0 font-bold text-xs uppercase font-mono`}>{statusLabel} ({sub.usagePercentage}%)</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
