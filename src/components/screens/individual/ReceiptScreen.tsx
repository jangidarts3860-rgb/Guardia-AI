import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store';
import { ArrowLeft, Download, Share2, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import GuardiaLogo from '../../ui/GuardiaLogo';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { showToast } from '../../ui/shared/Toast';



export default function ReceiptScreen() {
  const navigate = useNavigate();
  const { scanOutcome } = useStore();

  const receiptType = scanOutcome === 'scam' ? 'scam' : 'safe';
  const reduced = useReducedMotion();

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Guardia AI Receipt', text: 'Secure verification receipt from Guardia AI.' });
      } else {
        showToast('error', 'Sharing is not supported on this device.');
      }
    } catch {
      showToast('error', 'Failed to share receipt.');
    }
  };

  return (
    <div className="flex flex-col min-h-0 flex-1 bg-transparent text-white p-5">
      <div className="shrink-0 flex items-center justify-between mb-4">
        <button onClick={() => navigate('/home')} className="p-2 -ml-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 transition focus-visible:ring-2 focus-visible:ring-sky-500" aria-label="Go back">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="flex items-center space-x-2">
          <button onClick={handleShare} className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 transition focus-visible:ring-2 focus-visible:ring-sky-500" aria-label="Share receipt">
            <Share2 className="w-4 h-4 text-sky-400" />
          </button>
          <button onClick={() => showToast('success', 'Receipt saved to gallery.')} className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 transition focus-visible:ring-2 focus-visible:ring-sky-500" aria-label="Download receipt">
            <Download className="w-4 h-4 text-sky-400" />
          </button>
        </div>
      </div>

      <div className={`flex-1 overflow-y-auto min-h-0 rounded-3xl border bg-gradient-to-b from-slate-900/70 to-slate-950/70 border-slate-800/60 flex flex-col relative ${!reduced ? 'shadow-lg shadow-sky-500/5' : ''}`}>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-500/30 to-transparent" aria-hidden="true" />

        <div className="shrink-0 p-6 pb-0 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <GuardiaLogo size={22} variant="icon" animated={!reduced} />
            <span className="font-black text-sm tracking-tight">Guardia AI</span>
          </div>
          <span className="text-[9px] font-mono uppercase tracking-widest text-slate-500 bg-slate-800/40 px-2.5 py-1 rounded-full border border-slate-700/40">Verified Receipt</span>
        </div>

        <div className="flex-1 flex flex-col justify-center px-6 py-6 text-center space-y-4">
          <motion.div
            initial={!reduced ? { scale: 0, opacity: 0 } : undefined}
            animate={!reduced ? { scale: 1, opacity: 1 } : undefined}
            transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.1 }}
            className="flex justify-center"
          >
            <div className={`w-16 h-16 rounded-full ${receiptType === 'safe' ? 'bg-emerald-500/15' : 'bg-red-500/15'} flex items-center justify-center relative`}>
              <div className={`absolute inset-0 rounded-full border ${receiptType === 'safe' ? 'border-emerald-500/20' : 'border-red-500/20'} scale-125`} aria-hidden="true" />
              {receiptType === 'safe' ? (
                <CheckCircle2 className="w-9 h-9 text-emerald-400" />
              ) : (
                <svg className="w-9 h-9 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              )}
            </div>
          </motion.div>
          <div>
            <h2 className="text-xl font-black tracking-tight">{receiptType === 'safe' ? 'Transaction Verified' : 'Threat Intercepted'}</h2>
            <p className="text-xs text-slate-400 mt-1">{receiptType === 'safe' ? 'Merchant verified. No risks detected.' : 'Payment blocked — suspicious merchant.'}</p>
          </div>
        </div>

        <div className="shrink-0 px-6 pb-6">
          <div className="rounded-2xl p-5 space-y-4 text-left bg-slate-950/50 border border-slate-800/30">
            <div className="flex justify-between items-center py-0.5">
              <span className="text-xs text-slate-400">Merchant</span>
              <span className="text-xs font-bold text-white">{receiptType === 'safe' ? 'Flipkart Internet Pvt Ltd' : 'Unknown Seller'}</span>
            </div>
            <div className="border-t border-slate-800/30" />
            <div className="flex justify-between items-center py-0.5">
              <span className="text-xs text-slate-400">Amount</span>
              <span className={`text-xs font-extrabold font-mono ${receiptType === 'safe' ? 'text-emerald-400' : 'text-red-400'}`}>{receiptType === 'safe' ? '₹6,499' : '₹24,999'}</span>
            </div>
            <div className="border-t border-slate-800/30" />
            <div className="flex justify-between items-center py-0.5">
              <span className="text-xs text-slate-400">Payment ID</span>
              <span className="text-[10px] font-mono text-slate-400 truncate max-w-[150px]">TXN_GUARDIA_8F3A2C1B</span>
            </div>
            <div className="border-t border-slate-800/30" />
            <div className="flex justify-between items-center py-0.5">
              <span className="text-xs text-slate-400">Timestamp</span>
              <span className="text-[10px] text-slate-400">{new Date().toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
        </div>

        <div className="shrink-0 px-6 pb-6">
          <button onClick={handleShare} className="w-full py-3.5 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-2xl transition active:scale-[0.98] shadow-lg shadow-sky-500/10 focus-visible:ring-2 focus-visible:ring-sky-500 flex items-center justify-center space-x-2">
            <Share2 className="w-4 h-4" />
            <span>Share Receipt</span>
          </button>
        </div>
      </div>
    </div>
  );
}

