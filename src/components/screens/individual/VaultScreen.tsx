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
      <div className="sticky top-0 z-30 bg-slate-950/95 backdrop-blur-md p-4 pb-2.5 border-b border-slate-900">
      <div className="flex justify-between items-center text-left">
        <div>
          <h2 className="text-xl font-extrabold tracking-tight">Security</h2>
          <p className={`text-xs ${textMuted}`}>Security & privacy controls</p>
        </div>
        <button onClick={() => navigate('/link-bank')} className="p-2 bg-sky-500/10 text-sky-400 border border-sky-500/20 rounded-xl flex items-center space-x-1 hover:bg-sky-500/20 transition text-xs font-semibold focus-visible:ring-2 focus-visible:ring-sky-500" aria-label="Add bank">
          <Plus className="w-4.5 h-4.5" aria-hidden="true" />
          <span>Add</span>
        </button>
      </div>
      </div>

      {/* Emergency Freeze */}
      <div className="p-4 pt-3.5 space-y-4">
        <div className="p-4 rounded-2xl bg-red-600/10 border border-red-500/20 text-left relative overflow-hidden group">
          <div className="flex items-center space-x-2.5 mb-3">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-ping" aria-hidden="true" />
            <span className="text-red-500 font-bold text-xs uppercase tracking-wider">Emergency Freeze Mode</span>
          </div>
          <p className="text-xs text-slate-400 mb-4 leading-normal">
            Suspicious billing or phone theft? Slide to freeze all connected accounts instantly.
          </p>
          <SlideToAction
            onComplete={() => navigate('/freeze-accounts-confirm')}
            label="Slide to freeze everything"
          />
        </div>
      </div>

      <div className="p-4 pt-2 space-y-4">
        <div className="text-left space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Linked Bank Accounts</h3>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/10">Secure Connection</span>
          </div>
          <div className="space-y-2">
            {banks.filter(b => b.isConnected).length === 0 ? (
              <div className="p-6 text-center border border-dashed border-slate-800 rounded-2xl bg-slate-900/10 space-y-3.5 relative overflow-hidden group">
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

        <div className="text-left space-y-2 pb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">AI & Privacy Controls</h3>
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
        </div>

        {/* Privacy Dashboard */}
        <div className="text-left space-y-2 pb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Privacy Dashboard</h3>
          <div className="p-4 rounded-2xl border border-slate-800 bg-slate-900/30">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                <span className="text-xs font-bold text-white">On-Device AI Status</span>
              </div>
              <span className="flex items-center space-x-1 text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" aria-hidden="true" />
                <span>Active</span>
              </span>
            </div>
            <div className="space-y-2.5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Data sent to cloud</span>
                <span className="font-mono font-bold text-emerald-400 flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" aria-hidden="true" />
                  <span>0 bytes</span>
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
                  <span>View privacy details → Zero data shared</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

