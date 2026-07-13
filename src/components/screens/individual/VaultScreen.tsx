import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store';
import { useState } from 'react';
import React from 'react';
import { motion } from 'motion/react';
import { Plus, ChevronRight, Check, ShieldCheck, AlertTriangle } from 'lucide-react';
import { Bank } from '../../../types';
import { getBankLogo } from '../Screens';
import SlideToAction from '../../ui/shared/SlideToAction';
import EmptyState from '../../ui/shared/EmptyState';
import AnimatedNumber from '../../ui/shared/AnimatedNumber';
import { showToast } from '../../ui/shared/Toast';



export default function VaultScreen() {
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

  const cardBg = 'bg-slate-900/90 border-slate-800/80 text-white';
  const textMuted = 'text-slate-400';
  const [smsScan, setSmsScan] = useState(true);
  const [callProtection, setCallProtection] = useState(true);
  const [autoCancel, setAutoCancel] = useState(false);

  return (
    <div className="flex flex-col min-h-full pb-24 bg-slate-950 text-white">
      {/* Sticky Nav Row */}
      <div className="sticky top-0 z-30 bg-slate-950/90 backdrop-blur-md p-4 pb-3 border-b border-slate-800/50">
        <div className="flex justify-between items-center text-left">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <h2 className="text-xl font-extrabold tracking-tight">Security</h2>
            <p className={`text-xs ${textMuted} mt-0.5`}>Security & privacy controls</p>
          </motion.div>
          <motion.button 
            onClick={() => navigate('/link-bank')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="p-2.5 bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 rounded-xl flex items-center space-x-1.5 hover:bg-cyan-500/25 hover:border-cyan-500/50 transition-all duration-200 text-xs font-semibold focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950" 
            aria-label="Add bank"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
            <span>Add</span>
          </motion.button>
        </div>
      </div>

      <div className="p-4 pt-4 space-y-6">

        {/* ── Security Center ── */}
        <div className="text-left space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 px-0.5">Security Center</h3>

          {/* Emergency Freeze */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="p-5 rounded-2xl bg-red-500/15 backdrop-blur-md border border-red-500/30 shadow-[0_0_20px_-8px_rgba(239,68,68,0.25)] text-left relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="flex items-center space-x-2.5 mb-3">
                <motion.span 
                  className="w-2.5 h-2.5 bg-red-500 rounded-full"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  aria-hidden="true" 
                />
                <span className="text-red-400 font-bold text-xs uppercase tracking-widest">Emergency Freeze</span>
              </div>
              <p className="text-xs text-slate-300 mb-4 leading-normal font-medium">
                Tap to instantly freeze all connected accounts.
              </p>
              <SlideToAction
                onComplete={() => navigate('/freeze-accounts-confirm')}
                label="Slide to freeze"
              />
            </div>
          </motion.div>

          {/* AI & Privacy Controls */}
          <div className="border rounded-2xl divide-y bg-slate-900 border-slate-800/80 divide-slate-800/40">
            {[
              { label: 'SMS Scanning', desc: 'Scans local text alerts for security threats', val: smsScan, set: setSmsScan },
              { label: 'Call Protection', desc: 'Detects potential AI-voice scams', val: callProtection, set: setCallProtection },
              { label: 'Auto-Cancel Trials', desc: 'Cancels unused trials before renewal hits', val: autoCancel, set: setAutoCancel },
            ].map((item, i) => (
              <div key={i} className="p-4 flex justify-between items-center">
                <div className="text-left pr-4">
                  <p className="text-xs font-bold">{item.label}</p>
                  <p className={`text-xs ${textMuted} mt-0.5`}>{item.desc}</p>
                </div>
                <button onClick={() => item.set(!item.val)} className={`w-11 h-6 p-0.5 rounded-full transition-colors flex items-center ${item.val ? 'bg-sky-500 justify-end' : 'bg-slate-800 justify-start'}`} role="switch" aria-checked={item.val} aria-label={item.label}>
                  <motion.div layout transition={{ type: "spring", stiffness: 700, damping: 30 }} className="w-5 h-5 rounded-full bg-white shadow-sm" />
                </button>
              </div>
            ))}
          </div>

          {/* Privacy Dashboard */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.3 }}
            className="p-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/8 backdrop-blur-md shadow-[0_0_20px_-8px_rgba(16,185,129,0.2)]"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                </div>
                <span className="text-xs font-semibold text-white">On-Device AI</span>
              </div>
              <motion.span 
                className="flex items-center space-x-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/15 px-2.5 py-1 rounded-full border border-emerald-500/30"
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <motion.span 
                  className="w-1.5 h-1.5 bg-emerald-400 rounded-full"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  aria-hidden="true" 
                />
                <span>Active</span>
              </motion.span>
            </div>
            <div className="space-y-2.5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Cloud Transmission</span>
                <span className="font-mono font-bold text-emerald-400 flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" aria-hidden="true" />
                  <span>None (On-device only)</span>
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Fraud patterns processed</span>
                <span className="font-mono font-bold text-white">100% on-device</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Last privacy audit</span>
                <span className="font-mono font-bold text-white">{new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              <div className="mt-2 pt-2 border-t border-slate-800/40">
                <button onClick={() => showToast('success', 'Your data never leaves your device. All AI processing happens locally.')}
                  className="w-full py-2 text-xs font-bold text-sky-400 hover:text-sky-300 transition flex items-center justify-center space-x-1 focus-visible:ring-2 focus-visible:ring-sky-500 rounded-lg"
                  aria-label="View privacy proof">
                  <ShieldCheck className="w-3 h-3" aria-hidden="true" />
                  <span>View privacy details → Local processing only</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Connected Accounts ── */}
        <div className="text-left space-y-3">
          <div className="flex justify-between items-center px-0.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Connected Accounts</h3>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/10">Secure Connection</span>
          </div>
          <div className="space-y-2">
            {banks.filter(b => b.isConnected).length === 0 ? (
              <div className="p-6 text-center border border-dashed border-slate-800 rounded-2xl bg-slate-900/10 space-y-3.5">
                <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mx-auto">
                  <Plus className="w-5 h-5 text-cyan-400" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-xs text-slate-200">No bank account linked</h4>
                  <p className="text-xs text-slate-500 mx-auto mt-0.5 leading-relaxed" style={{ maxWidth: 210 }}>
                    Link your bank to enable AI protection, balance tracking & instant freeze.
                  </p>
                </div>
                <button onClick={() => navigate('/link-bank')} className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black uppercase tracking-wider rounded-xl transition active:scale-95 shadow-lg shadow-cyan-500/10 focus-visible:ring-2 focus-visible:ring-cyan-500">
                  Connect Bank
                </button>
              </div>
            ) : (
              banks.filter(b => b.isConnected).map((bank) => (
                <div key={bank.id} className={`p-4 rounded-2xl border flex items-center justify-between transition hover:border-slate-800 ${cardBg}`}>
                  <div className="flex items-center space-x-3">
                    {getBankLogo(bank.id, bank.name, "w-10 h-10")}
                    <div>
                      <p className="text-xs font-bold">{bank.name}</p>
                      <p className={`text-xs ${textMuted} mt-0.5`}>Savings {bank.accNumber || '****'} • Sync {bank.lastSynced || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <AnimatedNumber value={bank.balance ?? 0} prefix="₹" className="text-xs font-extrabold font-mono text-emerald-400" format />
                    <span className="inline-flex items-center space-x-1 text-[8px] uppercase bg-emerald-500/10 text-emerald-500 px-1.5 py-0.5 rounded-full font-bold mt-1">
                      <span className="w-1 h-1 bg-emerald-500 rounded-full" aria-hidden="true" />
                      <span>Active</span>
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

