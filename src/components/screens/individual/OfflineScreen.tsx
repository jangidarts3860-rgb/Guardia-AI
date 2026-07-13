import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store';
import { Check, XCircle, Lock, RefreshCw, WifiOff } from 'lucide-react';
import React from 'react';
import { Bank, ActivityItem } from '../../../types';
import { AppIcons } from '../../ui/shared/AppIcons';



export default function OfflineScreen() {
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

  return (
    <div className="flex flex-col min-h-full bg-slate-950 text-white p-6 justify-between relative">
      <div className="space-y-6 z-10 text-center flex-1 flex flex-col justify-center">
        <div className="w-20 h-20 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
          <WifiOff className="w-10 h-10" aria-hidden="true" />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-extrabold tracking-tight">You're offline</h2>
          <p className="text-sm text-slate-400 leading-relaxed px-4">
            Scanning is paused. Scan requests will be securely queued and verified as soon as you are back online.
          </p>
        </div>

        <div className="space-y-2 max-w-sm mx-auto w-full pt-4 text-left">
          {[
            { title: 'Emergency Freeze — works offline', ok: true },
            { title: 'View saved data — works offline', ok: true },
            { title: 'AI fraud scan — needs internet', ok: false },
            { title: 'Subscription sync — needs internet', ok: false },
          ].map((item, i) => (
            <div key={i} className={`p-3 rounded-xl border text-xs flex items-center justify-between ${item.ok ? 'bg-emerald-500/5 border-emerald-500/10 text-emerald-400' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
              <span>{item.title}</span>
              {item.ok ? <Check className="w-4 h-4 text-emerald-400" /> : <XCircle className="w-4 h-4 text-red-400" />}
            </div>
          ))}
        </div>
      </div>

<div className="space-y-3 pt-6 z-10 pb-4">
        <button onClick={() => { setIsOffline(false); navigate('/home'); }} className="w-full py-4 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-2xl shadow-lg shadow-sky-500/10 transition active:scale-[0.98] flex items-center justify-center space-x-1.5 focus-visible:ring-2 focus-visible:ring-sky-500" aria-label="Retry connection">
          <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Retry Connection</span>
        </button>
        <p className="text-xs text-slate-500 leading-snug px-6 pt-1">
          Emergency freeze will be queued and executed when you're back online.
        </p>
        <button onClick={() => { setIsOffline(false); setBanks(prev => prev.map(b => ({ ...b, isConnected: false }))); setActivities(prev => [{ id: 'off-freez-' + Date.now(), title: 'Offline Emergency Block', description: 'Queued for execution when online', time: 'Just now', status: 'Blocked' }, ...prev]); navigate('/home'); }}
          className="w-full py-3 bg-transparent border border-red-500/30 hover:border-red-500/50 text-red-500 text-xs font-bold rounded-2xl flex items-center justify-center space-x-2 transition focus-visible:ring-2 focus-visible:ring-red-500">
          <Lock className="w-4 h-4" aria-hidden="true" />
          <span>Queue Emergency Freeze</span>
        </button>
      </div>
    </div>
  );
}

