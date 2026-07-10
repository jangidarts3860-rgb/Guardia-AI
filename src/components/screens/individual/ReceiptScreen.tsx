import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store';
import { useState } from 'react';
import { ArrowLeft, Download, Share2, ShieldCheck, CheckCircle2 } from 'lucide-react';
import GuardiaLogo from '../../ui/GuardiaLogo';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { showToast } from '../../ui/shared/Toast';



export default function ReceiptScreen() {
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

  const receiptType = scanOutcome === 'scam' ? 'scam' : 'safe';
  const reduced = useReducedMotion();

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Guardia AI Receipt', text: 'Download your secure verification receipt from Guardia AI.' });
      }
    } catch { /* user cancelled share */ }
  };

  return (
    <div className="flex flex-col min-h-full p-5 bg-slate-950 text-white relative">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => navigate('/home')} className="p-2 -ml-2 rounded-xl hover:bg-slate-900/40 transition focus-visible:ring-2 focus-visible:ring-sky-500" aria-label="Go back">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center space-x-2">
          <button onClick={handleShare} className="p-2 rounded-xl hover:bg-slate-900/40 transition focus-visible:ring-2 focus-visible:ring-sky-500" aria-label="Share receipt">
            <Share2 className="w-4 h-4 text-sky-400" />
          </button>
          <button onClick={() => showToast('success', 'Receipt saved to gallery.')} className="p-2 rounded-xl hover:bg-slate-900/40 transition focus-visible:ring-2 focus-visible:ring-sky-500" aria-label="Download receipt">
            <Download className="w-4 h-4 text-sky-400" />
          </button>
        </div>
      </div>

      <div className="flex-1 rounded-3xl p-6 border bg-slate-900/60 border-slate-800/60">
        <div className="flex items-center space-x-2 mb-6">
          <GuardiaLogo size={24} variant="icon" animated={!reduced} />
          <span className="font-black text-sm tracking-tight">Guardia AI</span>
        </div>

        <div className="text-center space-y-2 mb-6">
          <div className="flex justify-center">
            <div className={`w-12 h-12 rounded-full ${receiptType === 'safe' ? 'bg-emerald-500/15' : 'bg-red-500/15'} flex items-center justify-center`}>
              {receiptType === 'safe' ? (
                <CheckCircle2 className="w-7 h-7 text-emerald-400" />
              ) : (
                <svg className="w-7 h-7 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              )}
            </div>
          </div>
          <h2 className="text-lg font-black tracking-tight">{receiptType === 'safe' ? 'Safe Transaction Report' : 'Scam Detection Report'}</h2>
          <p className="text-[10px] text-slate-400">Verified by Guardia AI Shield • RBI Certified</p>
        </div>

        <div className="rounded-2xl p-4 space-y-3 text-left bg-slate-950/60">
          <div className="flex justify-between">
            <span className="text-xs text-slate-500">Merchant</span>
            <span className="text-xs font-bold">{receiptType === 'safe' ? 'Flipkart Internet Pvt Ltd' : 'Unknown Seller'}</span>
          </div>
          <div className="border-t border-slate-800/40" />
          <div className="flex justify-between">
            <span className="text-xs text-slate-500">Amount</span>
            <span className="text-xs font-bold">{receiptType === 'safe' ? '₹6,499' : '₹24,999'}</span>
          </div>
          <div className="border-t border-slate-800/40" />
          <div className="flex justify-between">
            <span className="text-xs text-slate-500">Risk Score</span>
            <span className={`text-xs font-bold ${receiptType === 'safe' ? 'text-emerald-400' : 'text-red-400'}`}>{receiptType === 'safe' ? '12/100 ✓ Safe' : '92/100 ✗ Critical'}</span>
          </div>
          <div className="border-t border-slate-800/40" />
          <div className="flex justify-between">
            <span className="text-xs text-slate-500">Payment ID</span>
            <span className="text-[9px] font-mono text-slate-400 truncate max-w-[160px]">TXN_GUARDIA_8F3A2C1B</span>
          </div>
          <div className="border-t border-slate-800/40" />
          <div className="flex justify-between">
            <span className="text-xs text-slate-500">Timestamp</span>
            <span className="text-[10px] text-slate-400">12 Jan 2025, 10:42 AM</span>
          </div>
        </div>

        <div className="mt-4 flex items-center space-x-2 justify-center">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-[9px] text-slate-500 font-bold">Secured by Guardia AI Shield • RBI Certified</span>
        </div>
      </div>
    </div>
  );
}

