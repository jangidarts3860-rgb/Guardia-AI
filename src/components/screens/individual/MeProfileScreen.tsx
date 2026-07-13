import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store';
import { motion } from 'motion/react';
import React from 'react';
import { useState } from 'react';
import { ChevronRight, Shield, Zap, TrendingUp, LogOut, Trash2 } from 'lucide-react';
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
  const cardBg = 'bg-slate-900/60 backdrop-blur-sm border-slate-800/40';
  const textMuted = 'text-slate-400';

  const lifetimeSaved = subscriptions.filter(s => s.status === 'Cancelled').reduce((sum, s) => sum + s.cost * 6, 0);
  const scamsBlocked = activities.filter(a => a.status === 'Blocked').length;
  const subsCut = subscriptions.filter(s => s.status === 'Cancelled').length;

  const handleLogout = () => {
    setShowLogoutConfirm(false);
    navigate('/login');
  };

  return (
    <div className="flex flex-col min-h-full pb-24 bg-slate-950 text-white">
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-950/80 backdrop-blur-xl px-4 pt-4 pb-4 border-b border-slate-800/30">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-black tracking-tight">Your Profile</h2>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/home')} 
            className="px-3 py-1.5 text-xs text-cyan-400 font-bold bg-cyan-500/10 hover:bg-cyan-500/15 border border-cyan-500/30 rounded-lg transition-all duration-300"
          >
            Done
          </motion.button>
        </div>
      </div>

      <div className="px-4 pt-6 space-y-6 flex-1">
        {/* Profile Card */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-5 rounded-2xl border text-left flex items-center gap-4 ${cardBg} hover:border-cyan-500/30 transition-all duration-300`}
        >
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-lg shadow-cyan-500/10"
          >
            {profile.photo ? (
              <img src={profile.photo} alt="" className="w-full h-full object-cover" />
            ) : (
              <span className="text-cyan-400 text-xl font-bold">
                {profile.name ? profile.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase() : 'RS'}
              </span>
            )}
          </motion.div>
          
          <div className="flex-1 min-w-0 space-y-1">
            <h3 className="font-black text-lg leading-tight text-white">{profile.name || 'Your Name'}</h3>
            <p className={`text-xs ${textMuted} font-mono`}>{profile.phone || '+91 XXXXX XXXXX'}</p>
            <div className="flex gap-1.5 pt-1 flex-wrap">
              <motion.span 
                whileHover={{ scale: 1.05 }}
                className="bg-emerald-500/15 text-emerald-300 text-[9px] font-bold px-2 py-1 rounded-full border border-emerald-500/30 inline-flex items-center gap-1"
              >
                <span>✓</span> Verified
              </motion.span>
              <span className="bg-slate-800/60 text-slate-300 text-[9px] font-bold px-2 py-1 rounded-full border border-slate-700/40 font-mono">RBI Auth</span>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0 }}
            whileHover={{ scale: 1.05, y: -4 }}
            className="p-4 rounded-xl border border-slate-800/40 bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 backdrop-blur-sm hover:border-slate-700 transition-all duration-300"
          >
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-emerald-300" />
            </div>
            <p className="font-black text-lg text-emerald-300 leading-none">₹{lifetimeSaved.toLocaleString('en-IN')}</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1.5">Saved</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.05, y: -4 }}
            className="p-4 rounded-xl border border-slate-800/40 bg-gradient-to-br from-cyan-500/20 to-blue-500/10 backdrop-blur-sm hover:border-slate-700 transition-all duration-300"
          >
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-cyan-300" />
            </div>
            <p className="font-black text-lg text-cyan-300 leading-none">{scamsBlocked}</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1.5">Blocked</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05, y: -4 }}
            className="p-4 rounded-xl border border-slate-800/40 bg-gradient-to-br from-amber-500/20 to-orange-500/10 backdrop-blur-sm hover:border-slate-700 transition-all duration-300"
          >
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-amber-300" />
            </div>
            <p className="font-black text-lg text-amber-300 leading-none">{subsCut}</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1.5">Cancelled</p>
          </motion.div>
        </div>
      </div>

      <div className="space-y-6 px-4 pb-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="border rounded-xl overflow-hidden bg-slate-900/60 backdrop-blur-sm border-slate-800/40 divide-y divide-slate-800/40"
        >
          <p className="px-4 pt-4 pb-2 text-slate-400 text-xs font-bold uppercase tracking-widest">Account Settings</p>
          {[
            { label: 'Edit Profile', action: () => navigate('/edit-profile'), icon: null },
            { label: 'Notifications', count: 3, action: () => navigate('/notifications'), icon: null },
          ].map((opt: { label: string; count?: number; action: () => void; icon?: any }, i) => (
            <motion.button 
              key={i} 
              initial={{ opacity: 0, x: -10 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ delay: i * 0.05 }}
              whileHover={{ x: 4 }}
              onClick={opt.action} 
              className="w-full px-4 py-3 flex justify-between items-center hover:bg-slate-800/40 transition-all duration-300 text-xs font-semibold focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-500 group"
            >
              <span className="text-slate-200 group-hover:text-white transition-colors">{opt.label}</span>
              <div className="flex items-center gap-2">
                {opt.count && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold flex items-center justify-center border border-cyan-500/30" 
                    aria-label={`${opt.count} new`}
                  >
                    {opt.count}
                  </motion.span>
                )}
                <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-colors" />
              </div>
            </motion.button>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="border rounded-xl overflow-hidden bg-slate-900/60 backdrop-blur-sm border-slate-800/40 divide-y divide-slate-800/40">
          <p className="px-4 pt-4 pb-2 text-slate-400 text-xs font-bold uppercase tracking-widest">Security</p>
          {[{ label: 'Reset Security PIN', action: () => navigate('/reset-pin') }].map((opt, i) => (
            <motion.button key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} whileHover={{ x: 4 }} onClick={opt.action} className="w-full px-4 py-3 flex justify-between items-center hover:bg-slate-800/40 transition-all text-xs font-semibold focus-visible:ring-2 focus-visible:ring-cyan-500 group">
              <span className="text-slate-200 group-hover:text-white transition-colors">{opt.label}</span>
              <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-colors" />
            </motion.button>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="border rounded-xl overflow-hidden bg-slate-900/60 backdrop-blur-sm border-slate-800/40 divide-y divide-slate-800/40">
          <p className="px-4 pt-4 pb-2 text-slate-400 text-xs font-bold uppercase tracking-widest">Data & Banks</p>
          {[
            { label: 'Manage Banks', action: () => navigate('/security') },
            { label: 'Privacy Controls', action: () => navigate('/security') },
            { label: 'Activity Log', action: () => navigate('/activity-log') },
          ].map((opt, i) => (
            <motion.button key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} whileHover={{ x: 4 }} onClick={opt.action} className="w-full px-4 py-3 flex justify-between items-center hover:bg-slate-800/40 transition-all text-xs font-semibold focus-visible:ring-2 focus-visible:ring-cyan-500 group">
              <span className="text-slate-200 group-hover:text-white transition-colors">{opt.label}</span>
              <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-colors" />
            </motion.button>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="border rounded-xl overflow-hidden bg-slate-900/60 backdrop-blur-sm border-slate-800/40 divide-y divide-slate-800/40">
          <p className="px-4 pt-4 pb-2 text-slate-400 text-xs font-bold uppercase tracking-widest">Support</p>
          {[{ label: 'Emergency Help', action: () => navigate('/emergency') }].map((opt, i) => (
            <motion.button key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} whileHover={{ x: 4 }} onClick={opt.action} className="w-full px-4 py-3 flex justify-between items-center hover:bg-slate-800/40 transition-all text-xs font-semibold focus-visible:ring-2 focus-visible:ring-cyan-500 group">
              <span className="text-slate-200 group-hover:text-white transition-colors">{opt.label}</span>
              <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-colors" />
            </motion.button>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="border rounded-xl overflow-hidden bg-slate-900/60 backdrop-blur-sm border-red-500/20 divide-y divide-red-500/10">
          <motion.button 
            initial={{ opacity: 0, x: -10 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: 0 }} 
            whileHover={{ x: 4 }}
            onClick={() => setShowLogoutConfirm(true)} 
            className="w-full px-4 py-3 flex justify-between items-center hover:bg-slate-800/40 transition-all text-xs font-semibold focus-visible:ring-2 focus-visible:ring-cyan-500 group"
          >
            <div className="flex items-center gap-2">
              <LogOut className="w-4 h-4 text-slate-400 group-hover:text-slate-300 transition-colors" />
              <span className="text-slate-200 group-hover:text-white transition-colors">Log Out</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-colors" />
          </motion.button>

          <motion.button 
            initial={{ opacity: 0, x: -10 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: 0.05 }} 
            whileHover={{ x: 4 }}
            onClick={() => navigate('/delete-account-confirm')} 
            className="w-full px-4 py-3 flex justify-between items-center hover:bg-red-500/10 transition-all text-xs font-semibold focus-visible:ring-2 focus-visible:ring-red-500 group"
          >
            <div className="flex items-center gap-2">
              <Trash2 className="w-4 h-4 text-red-400 group-hover:text-red-300 transition-colors" />
              <span className="text-red-400 group-hover:text-red-300 transition-colors">Delete Account</span>
            </div>
            <ChevronRight className="w-4 h-4 text-red-600 group-hover:text-red-500 transition-colors" />
          </motion.button>
        </motion.div>
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
