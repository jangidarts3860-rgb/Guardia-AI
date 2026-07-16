import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Check, Heart, Star } from 'lucide-react';
import { showToast } from '../../ui/shared/Toast';
import { useStore } from '../../../store';

export default function AccountDeletedScreen() {
  const navigate = useNavigate();
  const { setProfile, setBanks, setSubscriptions, setActivities, setNotifications } = useStore();

  const handleStartOver = () => {
    setProfile({ name: '', phone: '', email: '', language: '', photo: '' });
    setBanks([]);
    setSubscriptions([]);
    setActivities([]);
    setNotifications([]);
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('guardia_user');
    }
    navigate('/splash');
  };

  return (
    <div className="flex flex-col flex-1 bg-transparent text-white p-5 relative">

      <div className="flex-1 flex flex-col justify-center items-center text-center max-w-sm mx-auto w-full space-y-6">
        <motion.div
          initial={{ scale: 0, rotate: -15 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.15)]"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 400, damping: 10 }}
          >
            <Check className="w-10 h-10 text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-2"
        >
          <h1 className="text-2xl font-black text-white tracking-tight">Account Deleted</h1>
          <p className="text-sm text-slate-400 leading-relaxed max-w-xs mx-auto">
            Your account and all associated data have been permanently removed. We're sorry to see you go.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="w-full p-5 bg-slate-900/60 border border-slate-800 rounded-2xl text-left space-y-4 backdrop-blur-sm"
        >
          <div className="flex items-center space-x-2 text-amber-400">
            <Star className="w-4 h-4" aria-hidden="true" />
            <span className="text-xs font-extrabold uppercase tracking-wider">Help us improve</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Your feedback helps us build better protection for everyone. Mind sharing why you left?
          </p>
          <button
            onClick={() => showToast('success', 'Opening feedback form...')}
            className="w-full py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-sm font-bold text-white transition active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-sky-500"
          >
            <span className="flex items-center justify-center space-x-2">
              <Heart className="w-4 h-4 text-sky-400" aria-hidden="true" />
              <span>Send Feedback</span>
            </span>
          </button>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={handleStartOver}
          className="w-full py-4 bg-sky-500 hover:bg-sky-400 text-white font-extrabold rounded-2xl transition active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-sky-500 shadow-lg shadow-sky-500/15 text-sm tracking-tight"
        >
          Start Over
        </motion.button>
      </div>
    </div>
  );
}
