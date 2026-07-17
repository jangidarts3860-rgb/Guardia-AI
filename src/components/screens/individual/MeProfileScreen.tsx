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
  const cardBg = 'card-surface text-white';
  const textMuted = 'text-slate-400';

  const rawLifetimeSaved = subscriptions.filter(s => s.status === 'Cancelled').reduce((sum, s) => sum + s.cost * 6, 0);
  const lifetimeSaved = Math.max(0, rawLifetimeSaved);
  const scamsBlocked = activities.filter(a => a.status === 'Blocked').length;
  const subsCut = subscriptions.filter(s => s.status === 'Cancelled').length;

  const handleLogout = () => {
    setShowLogoutConfirm(false);
    setProfile({ name: '', phone: '', email: '', language: 'English', photo: '' });
    navigate('/splash');
  };

  return (
    <div className="flex flex-col min-h-full pb-24 space-y-4 bg-transparent text-white">
      {/* Sticky Nav Row */}
      <div className="sticky top-0 z-30 bg-transparent backdrop-blur-md px-6 pt-4 pb-2">
        <div className="flex justify-between items-center text-left">
          <h2 className="text-xl font-extrabold tracking-tight">Profile</h2>
          <button onClick={() => navigate('/home')} className="text-sm font-bold bg-sky-500/10 text-sky-400 px-4 py-2 rounded-xl transition hover:bg-sky-500/20 focus-visible:ring-2 focus-visible:ring-sky-500">Done</button>
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
          <h3 className="font-extrabold text-base leading-tight truncate" style={{ maxWidth: 150 }}>{profile.name || 'Your Name'}</h3>
          <p className={`text-xs ${textMuted} font-mono mt-0.5 truncate`} style={{ maxWidth: 150 }}>{profile.phone || '+91 XXXXX XXXXX'}</p>
          <div className="flex space-x-1.5 mt-2">
            <span className="bg-emerald-500/10 text-emerald-500 text-[8px] font-bold px-1.5 py-0.5 rounded font-mono uppercase border border-emerald-500/20">Verified ✓</span>
            <span className="bg-slate-800 text-slate-400 text-[8px] font-bold px-1.5 py-0.5 rounded font-mono uppercase">RBI</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 px-4 text-center">
        <div className={`p-3 rounded-xl ${cardBg}`}>
          <p className="text-emerald-500 font-extrabold text-xs font-mono">₹{lifetimeSaved.toLocaleString('en-IN')}</p>
          <p className={`text-[8px] uppercase font-bold tracking-wider mt-0.5 ${textMuted}`}>Lifetime Saved</p>
        </div>
        <div className={`p-3 rounded-xl ${cardBg}`}>
          <p className="text-sky-400 font-extrabold text-xs font-mono">{scamsBlocked}</p>
          <p className={`text-[8px] uppercase font-bold tracking-wider mt-0.5 ${textMuted}`}>Scams Blocked</p>
        </div>
        <div className={`p-3 rounded-xl ${cardBg}`}>
          <p className="text-amber-500 font-extrabold text-xs font-mono">{subsCut}</p>
          <p className={`text-[8px] uppercase font-bold tracking-wider mt-0.5 ${textMuted}`}>Cancelled Subscriptions</p>
        </div>
      </div>

      <div className="space-y-6 mx-4">
        <div className="rounded-2xl divide-y overflow-hidden card-surface divide-slate-800/40">
          <p className="px-4 pt-3 pb-1 text-slate-400 text-xs font-bold uppercase tracking-wider">Account Settings</p>
          {[
            { label: 'Edit Profile', action: () => navigate('/edit-profile') },
            { label: 'Notifications', count: 3, action: () => navigate('/notifications') },
          ].map((opt: { label: string; count?: number; action: () => void; danger?: boolean }, i) => (
            <motion.button key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              onClick={opt.action} className="w-full px-4 py-3.5 flex justify-between items-center hover:bg-slate-900/10 transition text-xs font-medium focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-500">
              <span className="text-white">{opt.label}</span>
              <div className="flex items-center space-x-2">
                {opt.count && <span className="w-5 h-5 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center" aria-label={`${opt.count} new`}>{opt.count}</span>}
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </div>
            </motion.button>
          ))}
        </div>

        <div className="rounded-2xl divide-y overflow-hidden card-surface divide-slate-800/40">
          <p className="px-4 pt-3 pb-1 text-slate-400 text-xs font-bold uppercase tracking-wider">Security &amp; PIN</p>
          {[
            { label: 'Reset Security PIN', action: () => navigate('/reset-pin') },
          ].map((opt: { label: string; action: () => void }, i) => (
            <motion.button key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              onClick={opt.action} className="w-full px-4 py-3.5 flex justify-between items-center hover:bg-slate-900/10 transition text-xs font-medium focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-500">
              <span className="text-white">{opt.label}</span>
              <ChevronRight className="w-4 h-4 text-slate-600" />
            </motion.button>
          ))}
        </div>

        <div className="rounded-2xl divide-y overflow-hidden card-surface divide-slate-800/40">
          <p className="px-4 pt-3 pb-1 text-slate-400 text-xs font-bold uppercase tracking-wider">Data &amp; Connected Banks</p>
          {[
            { label: 'Manage Banks', action: () => navigate('/security') },
            { label: 'Privacy Controls', action: () => navigate('/security') },
            { label: 'Activity Log', action: () => navigate('/activity-log') },
          ].map((opt: { label: string; action: () => void }, i) => (
            <motion.button key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              onClick={opt.action} className="w-full px-4 py-3.5 flex justify-between items-center hover:bg-slate-900/10 transition text-xs font-medium focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-500">
              <span className="text-white">{opt.label}</span>
              <ChevronRight className="w-4 h-4 text-slate-600" />
            </motion.button>
          ))}
        </div>

        <div className="rounded-2xl divide-y overflow-hidden card-surface divide-slate-800/40">
          <p className="px-4 pt-3 pb-1 text-slate-400 text-xs font-bold uppercase tracking-wider">Help &amp; Support</p>
          {[
            { label: 'Emergency Help', action: () => navigate('/emergency') },
          ].map((opt: { label: string; action: () => void }, i) => (
            <motion.button key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              onClick={opt.action} className="w-full px-4 py-3.5 flex justify-between items-center hover:bg-slate-900/10 transition text-xs font-medium focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-500">
              <span className="text-white">{opt.label}</span>
              <ChevronRight className="w-4 h-4 text-slate-600" />
            </motion.button>
          ))}
        </div>

        <hr className="border-slate-800" />
        <div className="rounded-2xl overflow-hidden card-surface border border-slate-800">
          <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            onClick={() => setShowLogoutConfirm(true)} className="w-full px-4 py-3.5 flex justify-center items-center hover:bg-slate-900/10 transition text-xs font-bold text-slate-300 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-500">
            Log Out
          </motion.button>
        </div>
        
        <div className="rounded-2xl overflow-hidden card-surface border border-red-500/10 bg-red-500/5 mt-4">
          <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            onClick={() => navigate('/delete-account-confirm')} className="w-full px-4 py-3.5 flex justify-between items-center hover:bg-red-500/10 transition text-xs font-medium focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-red-500">
            <span className="text-red-500 font-bold">Delete Account</span>
            <ChevronRight className="w-4 h-4 text-red-500/50" />
          </motion.button>
        </div>
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
