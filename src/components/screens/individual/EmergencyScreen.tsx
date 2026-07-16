import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, PhoneCall, Shield, AlertTriangle, ExternalLink, ChevronRight } from 'lucide-react';

const steps = [
  'Do NOT share OTP with anyone — ever',
  'Freeze your cards using the button above',
  'File complaint at cybercrime.gov.in',
  'Screenshot any suspicious messages',
  'Call 1930 immediately if money was lost',
];

export default function EmergencyScreen() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-full bg-transparent text-white p-5 justify-between overflow-y-auto pb-10">
      <div className="space-y-4">
        <div className="flex justify-between items-center pt-1">
          <button onClick={() => navigate('/home')} className="p-2 -ml-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 transition focus-visible:ring-2 focus-visible:ring-sky-500" aria-label="Go back">
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          </button>
          <span className="text-sm font-bold tracking-tight">Emergency Help</span>
          <div className="w-8" />
        </div>

        <motion.a
          href="tel:1930"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="block w-full py-5 bg-gradient-to-br from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 rounded-2xl flex items-center justify-center space-x-3 shadow-lg shadow-red-500/20 active:scale-[0.98] transition-all focus-visible:ring-2 focus-visible:ring-red-500 relative overflow-hidden"
          aria-label="Call Cyber Cell 1930"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-400/10 rounded-full blur-2xl pointer-events-none" aria-hidden="true" />
          <PhoneCall className="w-5 h-5 drop-shadow" aria-hidden="true" />
          <span className="font-extrabold text-lg tracking-tight">Call 1930 — Cyber Helpline</span>
        </motion.a>

        <div className="space-y-2.5">
          <motion.button
            onClick={() => navigate('/freeze-accounts-confirm')}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="w-full p-4 bg-red-950/20 border border-red-500/30 rounded-2xl flex items-center space-x-4 hover:border-red-400/50 transition text-left group"
          >
            <div className="w-12 h-12 rounded-xl bg-red-500/15 border border-red-500/25 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
              <Shield className="w-6 h-6 text-red-400" aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-extrabold text-sm text-white">Freeze All Accounts</p>
              <p className="text-xs text-slate-400 mt-0.5">Block cards, UPI & mandates instantly</p>
            </div>
            <ChevronRight className="w-4 h-4 text-red-400/60 shrink-0" />
          </motion.button>

          <motion.a
            href="tel:14440"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="w-full p-4 bg-slate-900/80 border border-slate-800 rounded-2xl flex items-center space-x-4 hover:border-slate-700 transition group"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
              <PhoneCall className="w-6 h-6 text-amber-400" aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-extrabold text-sm text-white">RBI Ombudsman Helpline</p>
              <p className="text-xs text-slate-400 mt-0.5">Dial 14440 for banking complaints</p>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-500 shrink-0" />
          </motion.a>

          <motion.a
            href="https://cybercrime.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="w-full p-4 bg-slate-900/80 border border-slate-800 rounded-2xl flex items-center space-x-4 hover:border-slate-700 transition group"
          >
            <div className="w-12 h-12 rounded-xl bg-sky-500/15 border border-sky-500/25 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
              <Shield className="w-6 h-6 text-sky-400" aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-extrabold text-sm text-white">File Cyber Crime Complaint</p>
              <p className="text-xs text-slate-400 mt-0.5">cybercrime.gov.in — official portal</p>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-500 shrink-0" />
          </motion.a>
        </div>

        <div className="bg-slate-900/60 border border-slate-800/60 rounded-2xl p-4 text-left backdrop-blur-sm">
          <div className="flex items-center space-x-1.5 text-amber-400 mb-3">
            <AlertTriangle className="w-4 h-4" aria-hidden="true" />
            <span className="text-xs font-extrabold uppercase tracking-wider">Immediate Steps</span>
          </div>
          <ol className="space-y-3 text-xs list-none">
            {steps.map((step, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
                className="flex space-x-3 items-start"
              >
                <span className="w-5 h-5 rounded-full bg-slate-800 text-[10px] font-extrabold flex items-center justify-center shrink-0 text-slate-400">
                  {i + 1}
                </span>
                <span className="text-slate-300 leading-tight pt-0.5">{step}</span>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>

      <p className="text-[10px] text-slate-500 text-center pb-1 pt-6">
        All emergency contacts are verified and directly from official sources
      </p>
    </div>
  );
}
