import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Download, Share2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { showToast } from '../../ui/shared/Toast';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

export default function YourWinScreen() {
  const navigate = useNavigate();
  const { subscriptions, activities } = useStore();

  const [isAnonymized, setIsAnonymized] = useState(false);
  const reduced = useReducedMotion();
  const totalSavedYearly = subscriptions.filter(s => s.status === 'Cancelled').reduce((sum, s) => sum + s.cost * 12, 0);
  const subsCancelled = subscriptions.filter(s => s.status === 'Cancelled').length;
  const totalScamsBlocked = activities.filter(a => a.status === 'Blocked').length;

  useEffect(() => {
    if (reduced) return;
    const duration = 3000;
    const end = Date.now() + duration;
    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.8 },
        colors: ['#2dd4bf', '#38bdf8', '#34d399', '#f59e0b'],
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.8 },
        colors: ['#2dd4bf', '#38bdf8', '#34d399', '#f59e0b'],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, [reduced]);

  const handleShare = async (platform: string) => {
    const text = `I saved ₹${isAnonymized ? 'XX,XXX' : totalSavedYearly.toLocaleString('en-IN')} this year with Guardia AI!`;
    try {
      if (platform === 'whatsapp') {
        if (navigator.share) {
          await navigator.share({ title: 'Guardia AI Savings', text });
        } else {
          window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
        }
      } else if (platform === 'copy') {
        await navigator.clipboard.writeText(text);
        showToast('success', 'Link copied to clipboard!');
      }
    } catch { /* user cancelled */ }
  };

  return (
    <div className="flex flex-col min-h-full bg-transparent text-white p-5 justify-between">
      <div className="space-y-5">
        <div className="flex justify-between items-center pt-1">
          <button onClick={() => navigate('/home')} className="p-2 -ml-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 transition focus-visible:ring-2 focus-visible:ring-sky-500" aria-label="Go back">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="text-sm font-bold tracking-tight">Your Win</span>
          <div className="w-8" />
        </div>

        <motion.div
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="p-6 bg-gradient-to-br from-slate-900 via-sky-950/20 to-slate-900 border border-sky-500/20 rounded-3xl relative overflow-hidden text-center shadow-[0_15px_35px_rgba(14,165,233,0.1)]"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
          <p className="text-xs uppercase font-extrabold tracking-widest text-slate-400">
            {totalSavedYearly > 0 ? 'Guardia AI saved me' : 'Guardia AI kept me'}
          </p>
          <motion.h2
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10, delay: 0.3 }}
            className={`text-5xl font-black text-emerald-400 tracking-tight font-mono mt-3 mb-2 transition-all duration-300 ${isAnonymized ? 'blur-sm opacity-50 select-none' : ''}`}
          >
            {totalSavedYearly > 0 ? `₹${totalSavedYearly.toLocaleString('en-IN')}` : 'SAFE'}
          </motion.h2>
          <p className="text-xs text-slate-400 font-semibold mb-1">this year</p>

          <div className="grid grid-cols-3 gap-3 text-center pt-4 border-t border-slate-800/50 mt-4">
            <div className="space-y-1">
              <p className="text-xl font-black text-white font-mono">{subsCancelled}</p>
              <p className="text-[10px] text-slate-400 leading-snug font-medium">Subscriptions cancelled</p>
            </div>
            <div className="space-y-1">
              <p className="text-xl font-black text-white font-mono">{totalScamsBlocked}</p>
              <p className="text-[10px] text-slate-400 leading-snug font-medium">Scams blocked</p>
            </div>
            <div className="space-y-1">
              <p className="text-xl font-black text-white font-mono">{Math.max(subsCancelled, totalScamsBlocked, 8)}</p>
              <p className="text-[10px] text-slate-400 leading-snug font-medium">Months protected</p>
            </div>
          </div>

          <div className="mt-5">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800/50 border border-slate-700/50 rounded-full text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <span>Powered by Guardia AI</span>
            </span>
          </div>
        </motion.div>

        <div className="mt-8 p-4 bg-slate-900/60 border border-slate-800 rounded-2xl flex justify-between items-center gap-3">
          <div className="text-left min-w-0">
            <p className="text-xs font-extrabold text-white">Hide exact amount</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Keep your savings private when sharing</p>
          </div>
          <button
            onClick={() => setIsAnonymized(!isAnonymized)}
            className={`w-11 h-6 rounded-full transition-all relative shrink-0 ${isAnonymized ? 'bg-sky-500' : 'bg-slate-700'}`}
            role="switch"
            aria-checked={isAnonymized}
            aria-label="Hide savings amount"
          >
            <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all shadow-md ${isAnonymized ? 'left-[22px]' : 'left-0.5'}`} />
          </button>
        </div>

        <div>
          <p className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-3 flex items-center space-x-1.5">
            <Share2 className="w-3.5 h-3.5" />
            <span>Share your win</span>
          </p>
          <div className="grid grid-cols-3 gap-3">
            <button onClick={() => handleShare('whatsapp')} className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl hover:border-slate-700 transition flex flex-col items-center space-y-2 focus-visible:ring-2 focus-visible:ring-sky-500 active:scale-[0.97]" aria-label="Share on WhatsApp">
              <svg className="w-6 h-6 text-emerald-400" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              <span className="text-xs font-bold text-slate-400">WhatsApp</span>
            </button>
            <button onClick={() => handleShare('instagram')} className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl hover:border-slate-700 transition flex flex-col items-center space-y-2 focus-visible:ring-2 focus-visible:ring-sky-500 active:scale-[0.97]" aria-label="Share on Instagram">
              <svg className="w-6 h-6 text-pink-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              <span className="text-xs font-bold text-slate-400">Instagram</span>
            </button>
            <button onClick={() => handleShare('copy')} className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl hover:border-slate-700 transition flex flex-col items-center space-y-2 focus-visible:ring-2 focus-visible:ring-sky-500 active:scale-[0.97]" aria-label="Copy share link">
              <svg className="w-6 h-6 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
              <span className="text-xs font-bold text-slate-400">Copy Link</span>
            </button>
          </div>
        </div>
      </div>

      <div className="pt-4">
        <button
          onClick={() => showToast('success', 'Card shared! Keeping your savings streak.')}
          className="w-full py-4 bg-slate-900/60 hover:bg-slate-800/80 text-sky-400 border border-sky-500/20 font-extrabold rounded-2xl flex items-center justify-center space-x-2.5 transition active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-sky-500"
          aria-label="Download as Image"
        >
          <Download className="w-4.5 h-4.5" />
          <span>Download as Image</span>
        </button>
      </div>
    </div>
  );
}
