import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store';
import { motion } from 'motion/react';
import { ArrowLeft, PhoneCall, AlertTriangle, Shield } from 'lucide-react';


export default function EmergencyScreen() {
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

  return (
    <div className="flex flex-col min-h-full bg-slate-950 text-white p-5 justify-between">
      <div className="space-y-5">
        <div className="flex justify-between items-center pt-2">
          <button onClick={() => navigate('/home')} className="p-2 -ml-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 transition focus-visible:ring-2 focus-visible:ring-sky-500" aria-label="Go back">
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          </button>
          <span className="text-sm font-bold">Emergency Help</span>
          <div className="w-8" />
        </div>

        <motion.a href="tel:1930" animate={{ scale: [1, 1.02, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="block w-full py-4 bg-red-600 hover:bg-red-500 rounded-2xl flex items-center justify-center space-x-2.5 shadow-lg shadow-red-500/15 active:scale-[0.98] transition focus-visible:ring-2 focus-visible:ring-red-500" aria-label="Call Cyber Cell 1930">
          <PhoneCall className="w-5 h-5" aria-hidden="true" />
          <span className="font-bold text-lg">Call National Cyber Crime Helpline 1930</span>
        </motion.a>

        <div className="space-y-3">
          <button onClick={() => navigate('/freeze-accounts-confirm')} className="w-full p-4 bg-red-950/30 border border-red-500/40 ring-1 ring-red-500/20 rounded-2xl flex items-center space-x-4 hover:border-red-400/50 transition text-left focus-visible:ring-2 focus-visible:ring-red-500">
            <div className="w-12 h-12 rounded-xl bg-red-500/15 border border-red-500/20 flex items-center justify-center shrink-0">
              <Shield className="w-6 h-6 text-red-400" aria-hidden="true" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-bold text-sm text-white">Freeze All Accounts Now</p>
              <p className="text-xs text-slate-400 mt-0.5">Block all cards, UPI & mandates instantly</p>
            </div>
            <PhoneCall className="w-5 h-5 text-red-400" aria-hidden="true" />
          </button>

          <a href="tel:14440" className="w-full p-4 bg-slate-900 border border-slate-800 rounded-2xl flex items-center space-x-4 hover:border-slate-700 transition focus-visible:ring-2 focus-visible:ring-sky-500">
            <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/20 flex items-center justify-center shrink-0">
              <PhoneCall className="w-6 h-6 text-amber-400" aria-hidden="true" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-bold text-sm text-white">RBI Ombudsman Helpline</p>
              <p className="text-xs text-slate-400 mt-0.5">Dial 14440 for banking complaints</p>
            </div>
          </a>

          <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer" className="w-full p-4 bg-slate-900 border border-slate-800 rounded-2xl flex items-center space-x-4 hover:border-slate-700 transition focus-visible:ring-2 focus-visible:ring-sky-500">
            <div className="w-12 h-12 rounded-xl bg-sky-500/15 border border-sky-500/20 flex items-center justify-center shrink-0">
              <Shield className="w-6 h-6 text-sky-400" aria-hidden="true" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-bold text-sm text-white">File Cyber Crime Complaint</p>
              <p className="text-xs text-slate-400 mt-0.5">cybercrime.gov.in — official portal</p>
            </div>
          </a>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-left">
          <div className="flex items-center space-x-1.5 text-amber-500 mb-3">
            <AlertTriangle className="w-4 h-4" aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-wider">Immediate Steps</span>
          </div>
          <ol className="space-y-2.5 text-xs list-none">
            {[
              'Do NOT share OTP with anyone — ever',
              'Freeze your cards using the button above',
              'File complaint at cybercrime.gov.in',
              'Screenshot any suspicious messages',
              'Call 1930 immediately if money was lost',
            ].map((step, i) => (
              <li key={i} className="flex space-x-2.5 items-start">
                <span className="w-5 h-5 rounded-full bg-slate-950 border border-slate-800 text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                <span className="text-slate-300 leading-tight">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}