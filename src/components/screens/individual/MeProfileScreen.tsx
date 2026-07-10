import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store';
import { motion } from 'motion/react';
import React from 'react';
import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import ConfirmationDialog from '../../ui/shared/ConfirmationDialog';


export default function MeProfileScreen() {
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

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const cardBg = 'bg-slate-900/90 border-slate-800/80 text-white';
  const textMuted = 'text-slate-400';

  const lifetimeSaved = subscriptions.filter(s => s.status === 'Cancelled').reduce((sum, s) => sum + s.cost * 6, 0);
  const scamsBlocked = activities.filter(a => a.status === 'Blocked').length;
  const subsCut = subscriptions.filter(s => s.status === 'Cancelled').length;

  const handleLogout = () => {
    setShowLogoutConfirm(false);
    navigate('/login');
  };

  return (
    <div className="flex flex-col min-h-full pb-24 space-y-4 bg-slate-950 text-white">
      {/* Sticky Nav Row */}
      <div className="sticky top-0 z-30 bg-slate-950/95 backdrop-blur-md px-4 pt-4">
      <div className="flex justify-between items-center text-left">
        <h2 className="text-xl font-extrabold tracking-tight">Profile</h2>
        <button onClick={() => navigate('/home')} className="text-xs text-sky-400 hover:underline focus-visible:ring-2 focus-visible:ring-sky-500 rounded">Done</button>
      </div>
      </div>

      <div className={`p-4 rounded-2xl border text-left flex items-center space-x-4 mx-4 ${cardBg}`}>
        <div className="w-14 h-14 rounded-full bg-sky-950 border border-sky-800 flex items-center justify-center overflow-hidden shrink-0">
          {profile.photo ? (
            <img src={profile.photo} alt="" className="w-full h-full object-cover" />
          ) : (
            <span className="text-sky-400 text-lg font-bold">
              {profile.name ? profile.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase() : 'RS'}
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-extrabold text-base leading-tight truncate max-w-[150px]">{profile.name || 'Rohan Sharma'}</h3>
          <p className={`text-xs ${textMuted} font-mono mt-0.5 truncate max-w-[150px]`}>{profile.phone || '+91 98765 43210'}</p>
          <div className="flex space-x-1.5 mt-2">
            <span className="bg-emerald-500/10 text-emerald-500 text-[8px] font-bold px-1.5 py-0.5 rounded font-mono uppercase border border-emerald-500/20">Verified ✓</span>
            <span className="bg-slate-800 text-slate-400 text-[8px] font-bold px-1.5 py-0.5 rounded font-mono uppercase">RBI</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 px-4 text-center">
        <div className={`p-3 rounded-xl border ${cardBg}`}>
          <p className="text-emerald-500 font-extrabold text-xs font-mono">₹{lifetimeSaved.toLocaleString('en-IN')}</p>
          <p className={`text-[8px] uppercase font-bold tracking-wider mt-0.5 ${textMuted}`}>Saved (Lifetime)</p>
        </div>
        <div className={`p-3 rounded-xl border ${cardBg}`}>
          <p className="text-sky-400 font-extrabold text-xs font-mono">{scamsBlocked}</p>
          <p className={`text-[8px] uppercase font-bold tracking-wider mt-0.5 ${textMuted}`}>Scams Blocked</p>
        </div>
        <div className={`p-3 rounded-xl border ${cardBg}`}>
          <p className="text-amber-500 font-extrabold text-xs font-mono">{subsCut}</p>
          <p className={`text-[8px] uppercase font-bold tracking-wider mt-0.5 ${textMuted}`}>Subs Cut</p>
        </div>
        </div>

      <div className="border rounded-2xl divide-y text-left overflow-hidden bg-slate-900 border-slate-800 divide-slate-800/40 mx-4">
        {[
          { label: 'Notifications', count: 3, action: () => navigate('/notifications') },
          { label: 'Edit Profile', action: () => navigate('/edit-profile') },
          { label: 'Reset Security PIN', action: () => navigate('/reset-pin') },
          { label: 'Manage Banks', action: () => navigate('/vault') },
          { label: 'Privacy Controls', action: () => navigate('/vault') },
          { label: 'Activity Log', action: () => navigate('/activity-log') },
          { label: 'Emergency Help', action: () => navigate('/emergency') },
          { label: 'Log Out', action: () => setShowLogoutConfirm(true) },
          { label: 'Delete Account', action: () => navigate('/delete-account-confirm'), danger: true as const },
        ].map((opt: { label: string; count?: number; action: () => void; danger?: boolean }, i) => (
          <motion.button key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            onClick={opt.action} className="w-full px-4 py-3.5 flex justify-between items-center hover:bg-slate-900/10 transition text-xs font-medium focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-500">
            <span className={opt.danger ? 'text-red-500' : 'text-white'}>{opt.label}</span>
            <div className="flex items-center space-x-2">
              {opt.count && <span className="w-5 h-5 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center" aria-label={`${opt.count} new`}>{opt.count}</span>}
              <ChevronRight className="w-4 h-4 text-slate-600" />
            </div>
          </motion.button>
        ))}
      </div>

      {showLogoutConfirm && (
        <ConfirmationDialog
          open={showLogoutConfirm}
          title="Log Out?"
          message="You'll need to sign in again to access your account."
          confirmLabel="Yes, Log Out"
          cancelLabel="Cancel"
          variant="default"
          onConfirm={() => { setShowLogoutConfirm(false); handleLogout(); }}
          onCancel={() => setShowLogoutConfirm(false)}
        />
      )}
    </div>
  );
}

