import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store';
import { motion } from 'motion/react';
import { ArrowLeft, PhoneCall, AlertTriangle } from 'lucide-react';



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
          <span className="font-bold text-lg">Call Cyber Cell 1930</span>
        </motion.a>

        <div className="grid grid-cols-2 gap-3 text-left">
          <a href="https://wa.me/919731765735" target="_blank" rel="noopener noreferrer" className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col justify-between h-28 cursor-pointer hover:border-slate-700 transition focus-visible:ring-2 focus-visible:ring-sky-500">
            <svg className="w-6 h-6 text-emerald-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            <div>
              <p className="font-bold text-xs text-white">WhatsApp Support</p>
              <p className="text-[10px] text-slate-500 mt-0.5">24/7 fast chat help</p>
            </div>
          </a>
          <a href="mailto:report@cybercrime.gov.in" className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col justify-between h-28 cursor-pointer hover:border-slate-700 transition focus-visible:ring-2 focus-visible:ring-sky-500">
            <svg className="w-6 h-6 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/></svg>
            <div>
              <p className="font-bold text-xs text-white">Email Report</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Get immediate file log</p>
            </div>
          </a>
          <button onClick={() => navigate('/freeze-accounts-confirm')} className="p-4 bg-red-950/30 border border-red-500/40 ring-1 ring-red-500/20 rounded-2xl flex flex-col justify-between h-28 cursor-pointer hover:border-red-400/50 transition text-left focus-visible:ring-2 focus-visible:ring-red-500">
            <svg className="w-6 h-6 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
            <div>
              <p className="font-bold text-xs text-white">Freeze Accounts</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Block all cards now</p>
            </div>
          </button>
          <a href="tel:14440" className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col justify-between h-28 cursor-pointer hover:border-slate-700 transition focus-visible:ring-2 focus-visible:ring-sky-500">
            <PhoneCall className="w-6 h-6 text-amber-400" aria-hidden="true" />
            <div>
              <p className="font-bold text-xs text-white">RBI Helpline</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Dial 14440 security</p>
            </div>
          </a>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-left">
          <div className="flex items-center space-x-1.5 text-amber-500 mb-3">
            <AlertTriangle className="w-4 h-4" aria-hidden="true" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Immediate Steps</span>
          </div>
          <ol className="space-y-2.5 text-xs list-none">
            {[
              'Do NOT share OTP with anyone — ever',
              'Freeze your cards from the Vault tab',
              'File complaint at cybercrime.gov.in',
              'Screenshot any suspicious messages',
            ].map((step, i) => (
              <li key={i} className="flex space-x-2.5 items-start">
                <span className="w-5 h-5 rounded-full bg-slate-950 border border-slate-800 text-[10px] font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                <span className="text-slate-300 leading-tight">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

