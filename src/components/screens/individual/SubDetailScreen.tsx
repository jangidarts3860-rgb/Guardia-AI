import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store';
import { motion } from 'motion/react';
import { useState } from 'react';
import React from 'react';
import { ArrowLeft, ShieldCheck, AlertTriangle } from 'lucide-react';
import { getSubscriptionLogo } from '../Screens';
import { Subscription } from '../../../types';
import AnimatedNumber from '../../ui/shared/AnimatedNumber';

export default function SubDetailScreen() {
  const navigate = useNavigate();
  const { 
    subscriptions, setSubscriptions, 
    selectedSub, setSelectedSub
  } = useStore();

  if (!selectedSub) {
    navigate('/home');
    return null;
  }

  return (
    <div className="flex flex-col min-h-full bg-slate-950 text-white p-4 justify-between relative">
      <div className="space-y-5">
        {/* Sticky Nav Row */}
        <div className="sticky top-0 z-30 bg-slate-950/95 backdrop-blur-md -mx-4 px-4 pt-2 pb-2">
          <div className="flex justify-between items-center">
            <button onClick={() => navigate('/subs-dashboard')} className="p-2 -ml-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 transition focus-visible:ring-2 focus-visible:ring-sky-500" aria-label="Go back">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="text-sm font-bold">Details</span>
            <div className="w-8" />
          </div>
        </div>

        <div className="flex items-center space-x-4 text-left">
          {getSubscriptionLogo(selectedSub.id, selectedSub.name, "w-16 h-16 rounded-2xl")}
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-2xl font-bold tracking-tight">{selectedSub.name}</h3>
              <span className={`text-xs px-2 py-0.5 rounded font-bold uppercase ${selectedSub.status === 'Cancelled' ? 'bg-red-500/10 text-red-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                {selectedSub.status}
              </span>
            </div>
            {selectedSub.status === 'Cancelled' ? (
              <p className="text-xs text-red-400 mt-0.5 font-medium">Access available until {selectedSub.renewDate} · No future charges</p>
            ) : (
              <p className="text-xs text-slate-500 mt-0.5">Renews on {selectedSub.renewDate}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-left">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-4 bg-slate-900 border border-slate-800/80 rounded-2xl">
            <span className="text-xs text-slate-500 block font-bold uppercase tracking-wide">Monthly Cost</span>
            <AnimatedNumber value={selectedSub.cost} prefix="₹" className="text-2xl font-black font-mono text-white mt-1 block" format />
            <span className="text-xs text-slate-500">per month</span>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-4 bg-slate-900 border border-slate-800/80 rounded-2xl">
            <span className="text-xs text-slate-500 block font-bold uppercase tracking-wide">Estimated Annual Cost</span>
            <AnimatedNumber value={(selectedSub.cost || 0) * 12} prefix="₹" className="text-2xl font-black font-mono text-red-500 mt-1 block" format />
            <span className="text-xs text-slate-500">annual projection</span>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-slate-900 border border-slate-800/80 rounded-2xl p-4 text-left space-y-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wide">Usage this month</span>
            <span className={`text-xs px-2 py-0.5 rounded font-bold uppercase ${(selectedSub.usagePercentage || 0) > 50 ? 'bg-emerald-500/10 text-emerald-500' : (selectedSub.usagePercentage || 0) > 20 ? 'bg-amber-500/10 text-amber-500' : 'bg-red-500/10 text-red-500'}`}>
              {(selectedSub.usagePercentage || 0) > 50 ? 'High' : (selectedSub.usagePercentage || 0) > 20 ? 'Medium' : 'Low'}
            </span>
          </div>
          <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800/40" role="progressbar" aria-valuenow={selectedSub.usagePercentage || 0} aria-valuemin={0} aria-valuemax={100} aria-label={`Usage: ${selectedSub.usagePercentage || 0}%`}>
            <motion.div initial={{ width: 0 }} animate={{ width: `${selectedSub.usagePercentage || 0}%` }} transition={{ duration: 1, ease: "easeOut", delay: 0.5 }} className="bg-gradient-to-r from-red-500 to-amber-500 h-2 rounded-full" />
          </div>
          <div className="flex justify-between text-xs text-slate-500 pt-0.5">
            <span>Last opened {selectedSub.usedDaysAgo || 0} days ago</span>
            <span className="font-bold text-white">{selectedSub.usagePercentage || 0}% usage</span>
          </div>
        </motion.div>

        {selectedSub.alert && (
          <div className="bg-sky-500/5 border border-sky-500/20 rounded-2xl p-4 text-left">
            <div className="flex items-center space-x-1.5 mb-1.5 text-sky-400">
              <ShieldCheck className="w-4.5 h-4.5" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-wider">AI Security Insight</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">{selectedSub.alert}</p>
          </div>
        )}
      </div>

      <div className="space-y-3 pb-4">
        {selectedSub.status !== 'Cancelled' ? (
          <>
            <div className="p-3 bg-amber-500/5 border border-amber-500/20 rounded-xl flex space-x-2.5 items-start text-left mb-2">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-xs text-slate-400">You&apos;ll be charged ₹{selectedSub.cost || 0} on {selectedSub.renewDate || 'soon'}. Cancel now to avoid this charge.</p>
            </div>

            <button
              onClick={() => {
                setSubscriptions(prev => prev.map(s => s.id === selectedSub.id ? { ...s, status: 'Cancelled' } : s));
                navigate('/cancel-success');
              }}
              className="w-full py-4 bg-red-500 hover:bg-red-400 text-white font-bold rounded-2xl transition active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-red-500"
            >
              Cancel {selectedSub.name}
            </button>
            <button
              onClick={() => navigate('/subs-dashboard')}
              className="w-full py-4 bg-slate-900/60 border border-slate-800 hover:bg-slate-800 text-slate-300 font-bold rounded-2xl transition active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-sky-500"
            >
              Keep My Plan
            </button>
          </>
        ) : (
          <button
            onClick={() => {
              setSubscriptions(prev => prev.map(s => s.id === selectedSub.id ? { ...s, status: 'Active' } : s));
              navigate('/subs-dashboard');
            }}
            className="w-full py-4 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-2xl transition active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-sky-500"
          >
            Reactivate Subscription
          </button>
        )}
      </div>


    </div>
  );
}