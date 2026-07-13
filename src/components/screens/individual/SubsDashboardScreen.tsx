import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store';
import { useMemo } from 'react';
import { motion } from 'motion/react';
import { Home, ShieldCheck } from 'lucide-react';
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
    <div className="flex flex-col min-h-full pb-24 bg-slate-950 text-white">
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
              ₹{myTotal.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        <div className="p-1 rounded-2xl bg-slate-900/90 border border-slate-800/60 flex space-x-1" role="tablist" aria-label="Subscription tabs">
          <div role="tab" aria-selected={true} className="relative z-10 flex-1 py-2.5 text-xs font-bold rounded-xl bg-sky-500 text-white shadow-md shadow-sky-500/10 text-center">
            My spending
          </div>
          <button onClick={() => navigate('/family-spend-hub')} role="tab" className="relative z-10 flex-1 py-2.5 text-xs font-bold rounded-xl transition duration-300 text-slate-400 hover:text-white text-center">
            Family spending
          </button>
        </div>
      </div>

      <div className="px-4 pt-4 space-y-4">
        {avoidableSpend > 0 && (
          <div className="p-4 rounded-2xl border border-amber-500/30 bg-amber-500/5 text-left">
            <div className="flex items-center space-x-2 mb-1">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <h3 className="text-xs font-extrabold tracking-wider text-amber-400 font-mono uppercase">Avoidable Spend</h3>
            </div>
            <p className="text-2xl font-extrabold text-amber-300">₹{avoidableSpend.toLocaleString('en-IN')}</p>
            <p className="text-xs text-slate-400 mt-1">Can be saved monthly by reviewing unused subscriptions</p>
          </div>
        )}
      </div>

      <div className="text-left flex-1 flex flex-col px-4 pb-4 pt-4 space-y-4" style={{ minHeight: 220 }}>
        {subscriptions.length === 0 ? (
          <EmptyState icon="credit-card" title="No subscriptions" description="Add your first subscription to start tracking." />
        ) : (
          <>
            {todaySubs.length > 0 && (
              <div>
                <h3 className="text-xs font-bold tracking-wider uppercase text-slate-400 mb-2">Renews Today</h3>
                <div className="space-y-2">
                  {todaySubs.map((sub) => (
                    <SubscriptionRow key={sub.id} sub={sub} onClick={() => { setSelectedSub(sub); navigate('/sub-detail'); }} />
                  ))}
                </div>
              </div>
            )}
            {weekSubs.length > 0 && (
              <div>
                <h3 className="text-xs font-bold tracking-wider uppercase text-slate-400 mb-2">Renews this Week</h3>
                <div className="space-y-2">
                  {weekSubs.map((sub) => (
                    <SubscriptionRow key={sub.id} sub={sub} onClick={() => { setSelectedSub(sub); navigate('/sub-detail'); }} />
                  ))}
                </div>
              </div>
            )}
            {upcomingSubs.length > 0 && (
              <div>
                <h3 className="text-xs font-bold tracking-wider uppercase text-slate-400 mb-2">Upcoming Renewals</h3>
                <div className="space-y-2">
                  {upcomingSubs.map((sub) => (
                    <SubscriptionRow key={sub.id} sub={sub} onClick={() => { setSelectedSub(sub); navigate('/sub-detail'); }} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function SubscriptionRow({ sub, onClick }: { key?: string; sub: Subscription; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={onClick}
      className="p-3.5 rounded-2xl border border-slate-800 bg-slate-900/30 flex items-center justify-between cursor-pointer hover:border-sky-500/40 transition duration-200"
    >
      <div className="flex items-center space-x-3 text-left">
        {getSubscriptionLogo(sub.id, sub.name, "w-10 h-10")}
        <div>
          <p className="text-sm font-extrabold text-white">{sub.name}</p>
          <p className="text-xs text-slate-500">Renews {sub.renewDate}</p>
        </div>
      </div>
      <AnimatedNumber value={sub.cost} prefix="₹" className="text-sm font-extrabold font-mono text-white" format />
    </motion.div>
  );
}
