import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store';
import { ShieldCheck, Lock, Info } from 'lucide-react';

export default function PermissionsScreen() {
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
    <div className="flex flex-col min-h-full bg-transparent text-white p-6 justify-between relative">

      <div className="space-y-5 z-10">
        <div className="pt-2">
          <span className="text-[10px] font-bold tracking-widest text-slate-400 font-mono">STEP 2 OF 3</span>
        </div>

        <div className="space-y-2 text-left">
          <h1 className="text-2xl font-extrabold tracking-tight text-white">Permissions We Need</h1>
          <p className="text-xs text-slate-400 leading-relaxed">
            Guardia AI requests permissions only when you use a feature that needs them — nothing runs in the background.
          </p>
        </div>

        <div className="space-y-3 pt-1">
          <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-2xl flex space-x-3 items-start">
            <Info className="w-4.5 h-4.5 text-sky-400 shrink-0 mt-0.5" />
            <p className="text-xs text-slate-300 leading-relaxed">
              Camera access will be requested when you open the QR scanner.
            </p>
          </div>
          <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-2xl flex space-x-3 items-start">
            <Info className="w-4.5 h-4.5 text-sky-400 shrink-0 mt-0.5" />
            <p className="text-xs text-slate-300 leading-relaxed">
              Notifications can be enabled when you receive your first alert.
            </p>
          </div>
          <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-2xl flex space-x-3 items-start">
            <Info className="w-4.5 h-4.5 text-sky-400 shrink-0 mt-0.5" />
            <p className="text-xs text-slate-300 leading-relaxed">
              SMS access will be requested when you verify a payment link.
            </p>
          </div>
        </div>

        <div className="flex justify-center pt-2 pb-1">
          <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center space-x-1.5">
            <Lock className="w-3 h-3 text-emerald-400" />
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Bank-Grade Encryption</span>
          </div>
        </div>

        <div className="p-3.5 bg-slate-900/30 border border-slate-800/50 rounded-2xl flex space-x-3 items-start text-left">
          <ShieldCheck className="w-4.5 h-4.5 text-sky-400 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-400 leading-normal">
            Your data <strong className="text-white font-medium">never leaves your phone</strong>. All AI runs on-device, offline.
          </p>
        </div>
      </div>

      <div className="pt-4 z-10 pb-6">
        <button
          onClick={() => navigate('/link-bank')}
          className="w-full bg-sky-500 hover:bg-sky-400 text-white font-bold py-4 rounded-2xl shadow-lg shadow-sky-500/15 transition active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617]"
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
