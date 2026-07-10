import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';



export default function AccountDeletedScreen() {
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
    <div className="flex flex-col min-h-full bg-slate-950 text-white p-5 justify-center items-center">
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mb-6">
        <Check className="w-8 h-8 text-emerald-500" />
      </motion.div>
      <h2 className="text-2xl font-black text-white mb-2">Account Deleted</h2>
      <p className="text-sm text-slate-400 text-center mb-8">
        Your account and all associated data have been permanently removed.
      </p>
      <button onClick={() => navigate('/splash')}
        className="w-full max-w-xs py-4 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-2xl transition active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-sky-500">
        Start Over
      </button>
    </div>
  );
}

