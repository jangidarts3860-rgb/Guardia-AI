import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store';
import { useState } from 'react';
import React from 'react';
import { motion } from 'motion/react';
import { Trash2, AlertTriangle, Download, FileText } from 'lucide-react';
import ConfirmationDialog from '../../ui/shared/ConfirmationDialog';
import { showToast } from '../../ui/shared/Toast';


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
  const [showAuditLog, setShowAuditLog] = useState(false);

  const handleDelete = () => {
    setShowFinalConfirm(false);
    setProfile({ name: '', phone: '', email: '', language: 'English', photo: '' });
    setSubscriptions([]);
    setBanks([]);
    setNotifications([]);
    setActivities([]);
    navigate('/account-deleted');
  };

  const handleDownloadAuditLog = () => {
    const auditLog = {
      profile: { name: profile.name, phone: profile.phone, email: profile.email },
      subscriptions: subscriptions.map(s => ({ name: s.name, cost: s.cost, status: s.status, category: s.category })),
      banks: banks.map(b => ({ name: b.name, connected: b.isConnected, lastSynced: b.lastSynced })),
      activities: activities,
      notifications: notifications,
      generatedAt: new Date().toISOString(),
      note: 'Security audit log generated before account deletion. Retained for 30-day safety period.'
    };
    const blob = new Blob([JSON.stringify(auditLog, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `guardia-security-audit-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('success', 'Security audit log downloaded');
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
            This will permanently delete your profile, app settings, and tracked subscriptions. Active bank connections will be disconnected instantly. Note: Active subscriptions and merchant auto-debits must be cancelled separately with each provider.
          </p>
        </div>

        <div className="p-3.5 bg-red-500/5 border border-red-500/20 rounded-2xl flex space-x-2.5 items-start text-left max-w-sm mx-auto w-full">
          <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-xs text-slate-400 leading-normal">This permanently deletes all your data. Cannot be undone.</p>
        </div>

        <div className="space-y-2 text-left max-w-sm mx-auto w-full pt-2">
          <label htmlFor="delete-confirm" className="text-xs font-bold uppercase tracking-wider text-slate-500">Type &lsquo;DELETE&rsquo; to confirm</label>
          <input id="delete-confirm" type="text" placeholder="Type 'DELETE' to confirm" value={deleteConfirmText} onChange={(e) => setDeleteConfirmText(e.target.value)}
            className="w-full px-4 py-3.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-red-500 transition text-center font-bold tracking-widest placeholder:tracking-normal placeholder:font-normal"
          />
        </div>

        <div className="pt-4 space-y-2">
          <button onClick={handleDownloadAuditLog} className="w-full py-3 bg-slate-900 border border-slate-800 hover:border-sky-500/50 text-slate-300 text-xs font-bold rounded-2xl flex items-center justify-center space-x-2 transition focus-visible:ring-2 focus-visible:ring-sky-500">
            <Download className="w-4 h-4" aria-hidden="true" />
            <span>Download My Security Audit Log</span>
          </button>
          <p className="text-xs text-slate-600 text-center leading-snug px-2">
            Your profile details will be scheduled for permanent deletion after a 30-day safety retention period.
          </p>
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
          message="This action cannot be undone. All your data, bank links, and subscriptions will be permanently removed. Active bank connections will be immediately disconnected."
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