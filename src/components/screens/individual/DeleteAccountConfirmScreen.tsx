import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store';
import { useState } from 'react';
import React from 'react';
import { motion } from 'motion/react';
import { Trash2, AlertTriangle } from 'lucide-react';
import ConfirmationDialog from '../../ui/shared/ConfirmationDialog';


export default function DeleteAccountConfirmScreen() {
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

  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [showFinalConfirm, setShowFinalConfirm] = useState(false);

  const handleDelete = () => {
    setShowFinalConfirm(false);
    setProfile({ name: '', phone: '', email: '', language: 'English', photo: '' });
    setSubscriptions([]);
    setBanks([]);
    setNotifications([]);
    setActivities([]);
    navigate('/account-deleted');
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-950 text-white p-5 justify-between">
      <div className="space-y-6 text-center flex-1 flex flex-col justify-center">
        <motion.div animate={{ x: [-5, 5, -5, 5, 0] }} transition={{ repeat: Infinity, duration: 2, repeatDelay: 1 }}
          className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto text-red-500">
          <Trash2 className="w-8 h-8" aria-hidden="true" />
        </motion.div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-red-500 tracking-tight">Delete Account</h2>
          <p className="text-xs text-slate-400 px-6 leading-relaxed">
            This will permanently remove your linked bank logins, notification settings, activity audits, and subscriptions tracker logs.
          </p>
        </div>

        <div className="p-3.5 bg-red-500/5 border border-red-500/20 rounded-2xl flex space-x-2.5 items-start text-left max-w-sm mx-auto w-full">
          <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-[11px] text-slate-400 leading-normal">This permanently deletes all your data. Cannot be undone.</p>
        </div>

        <div className="space-y-2 text-left max-w-sm mx-auto w-full pt-2">
          <label htmlFor="delete-confirm" className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Type &lsquo;DELETE&rsquo; to confirm</label>
          <input id="delete-confirm" type="text" placeholder="Type 'DELETE' to confirm" value={deleteConfirmText} onChange={(e) => setDeleteConfirmText(e.target.value)}
            className="w-full px-4 py-3.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-red-500 transition text-center font-bold tracking-widest placeholder:tracking-normal placeholder:font-normal"
          />
        </div>
      </div>

      <div className="space-y-2.5 pb-4">
        <button disabled={deleteConfirmText.trim().toUpperCase() !== 'DELETE'} onClick={() => setShowFinalConfirm(true)}
          className={`w-full py-4 text-white font-bold rounded-2xl transition-all duration-300 ${deleteConfirmText.trim().toUpperCase() === 'DELETE' ? 'bg-red-600 hover:bg-red-500 cursor-pointer shadow-lg shadow-red-500/20 border border-red-500/50' : 'bg-slate-900/50 text-slate-600 cursor-not-allowed opacity-40 border border-slate-800/30'}`}>
          Delete My Account
        </button>
        <button onClick={() => navigate('/me-profile')} className="w-full py-3.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 text-xs font-semibold rounded-2xl transition focus-visible:ring-2 focus-visible:ring-sky-500">
          Cancel
        </button>
      </div>

      {showFinalConfirm && (
        <ConfirmationDialog
          open={showFinalConfirm}
          title="Permanently Delete Account?"
          message="This action cannot be undone. All your data, bank links, and subscriptions will be permanently removed."
          confirmLabel="Yes, Delete Forever"
          cancelLabel="Keep My Account"
          variant="danger"
          onConfirm={handleDelete}
          onCancel={() => setShowFinalConfirm(false)}
        />
      )}
    </div>
  );
}

