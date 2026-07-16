import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store';
import { useMemo } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck } from 'lucide-react';
import EmptyState from '../../ui/shared/EmptyState';
import { getSubscriptionLogo } from '../Screens';
import { Subscription } from '../../../types';
import AnimatedNumber from '../../ui/shared/AnimatedNumber';

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function SubsDashboardScreen() {
  const navigate = useNavigate();
  const { subscriptions, setSelectedSub } = useStore();

  const myTotal = subscriptions.reduce((sum, s) => sum + s.cost, 0);

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
    <div className="flex flex-col min-h-full pb-24 bg-transparent text-white">
      <div className="sticky top-0 z-30 bg-transparent/95 backdrop-blur-md px-4 pt-4 pb-1 space-y-3">
        <div className="flex justify-between items-center text-left">
          <div>
            <span className="text-xs font-extrabold tracking-widest text-slate-500 uppercase font-mono">SUBSCRIPTIONS</span>
            <h2 className="text-xl font-black tracking-tight mt-0.5">Subscriptions</h2>
          </div>
          <div className="text-right">
            <span className="text-xs font-extrabold tracking-widest text-slate-500 uppercase font-mono block">MONTHLY SPEND</span>
            <span className="text-sm bg-red-950/40 text-red-400 border border-red-500/15 px-2.5 py-0.5 rounded-full font-black font-mono inline-block mt-0.5">
              ₹{myTotal.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        <div className="p-1 rounded-2xl bg-slate-900/90 border border-slate-800/60 flex space-x-1" role="tablist" aria-label="Subscription tabs">
          <button role="tab" aria-selected={true} className="relative z-10 flex-1 py-2.5 text-xs font-bold rounded-xl bg-sky-500 text-white shadow-md shadow-sky-500/10 text-center focus-visible:ring-2 focus-visible:ring-white">
            My spending
          </button>
          <button onClick={() => navigate('/family-spend-hub')} role="tab" className="relative z-10 flex-1 py-2.5 text-xs font-bold rounded-xl transition duration-300 text-slate-400 hover:text-white text-center">
            Family spending
          </button>
        </div>
      </div>

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
