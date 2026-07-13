import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store';
import { Camera, Phone, Bell, ShieldCheck, Lock, X } from 'lucide-react';
import Toggle from '../../ui/shared/Toggle';
import { useState } from 'react';

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

  const [screenScanner, setScreenScanner] = useState<'granted' | 'denied' | 'pending'>('pending');
  const [callProtection, setCallProtection] = useState<'granted' | 'denied' | 'pending'>('pending');
  const [pushAlerts, setPushAlerts] = useState<'granted' | 'denied' | 'pending'>('pending');

  const handlePermissionToggle = (permission: 'screenScanner' | 'callProtection' | 'pushAlerts', value: 'granted' | 'denied') => {
    switch (permission) {
      case 'screenScanner':
        setScreenScanner(value);
        break;
      case 'callProtection':
        setCallProtection(value);
        break;
      case 'pushAlerts':
        setPushAlerts(value);
        break;
    }
  };

  const allGranted = screenScanner === 'granted' && callProtection === 'granted' && pushAlerts === 'granted';
  const anyGranted = screenScanner === 'granted' || callProtection === 'granted' || pushAlerts === 'granted';

  return (
    <div className="flex flex-col min-h-full bg-slate-950 text-white p-6 justify-between relative">
      <div className="absolute inset-0 bg-radial-[circle_at_bottom,rgba(14,165,233,0.05)_0%,transparent_60%] pointer-events-none" aria-hidden="true" />

      <div className="space-y-5 z-10">
        <div className="flex justify-between items-center pt-2">
          <span className="text-xs font-black tracking-widest text-slate-500 font-mono">STEP 2 OF 3</span>
          <button onClick={() => navigate('/link-bank')} className="text-xs text-slate-400 hover:text-white transition font-medium p-3 -m-3 focus-visible:ring-2 focus-visible:ring-sky-500 rounded-lg">
            Skip All
          </button>
        </div>

        <div className="space-y-2 text-left">
          <h2 className="text-2xl font-black tracking-tight text-white">Enable Protection Features</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Choose which features to enable. Each works independently.
          </p>
        </div>

        <div className="space-y-3 pt-1 font-sans" role="group" aria-label="Shield permissions">
          <Toggle
            enabled={screenScanner === 'granted'}
            onChange={() => handlePermissionToggle('screenScanner', screenScanner === 'granted' ? 'denied' : 'granted')}
            label="Screen Scanner"
            description="Camera permission — Scan QR codes & verify trust score"
            icon={<Camera className="w-5 h-5 text-sky-400" />}
          />

          <Toggle
            enabled={callProtection === 'granted'}
            onChange={() => handlePermissionToggle('callProtection', callProtection === 'granted' ? 'denied' : 'granted')}
            label="Call Protection"
            description="SMS & Contacts — Block spam calls & voice scams"
            icon={<Phone className="w-5 h-5 text-amber-400" />}
          />

          <Toggle
            enabled={pushAlerts === 'granted'}
            onChange={() => handlePermissionToggle('pushAlerts', pushAlerts === 'granted' ? 'denied' : 'granted')}
            label="Security Push Alerts"
            description="Notifications — Immediate fraud alerts & bill warnings"
            icon={<Bell className="w-5 h-5 text-emerald-400" />}
          />
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
          onClick={() => {
            if (screenScanner === 'granted') navigate('/link-bank');
            else navigate('/link-bank');
          }}
          className={`w-full text-white font-bold py-4 rounded-2xl shadow-lg transition active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${anyGranted ? 'bg-sky-500 hover:bg-sky-400 shadow-sky-500/10' : 'bg-slate-800 hover:bg-slate-700'}`}
        >
          {anyGranted ? 'Continue with Selected →' : 'Skip & Continue to Bank Linking'}
        </button>
      </div>
    </div>
  );
}