import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store';
import { useState, useRef, useEffect } from 'react';
import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Search, Check, ShieldCheck } from 'lucide-react';
import { Bank, ActivityItem, NotificationItem } from '../../../types';
import { getBankLogo } from '../Screens';



export default function LinkBankScreen() {
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

  const [bankSearch, setBankSearch] = useState('');
  const [selectedBankId, setSelectedBankId] = useState<string | null>(null);
  const linkTimeout = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    return () => {
      if (linkTimeout.current) clearTimeout(linkTimeout.current);
    };
  }, []);

  const handleLinkBankSubmit = () => {
    if (!selectedBankId) return;
    navigate(`/link-bank-progress?bankId=${selectedBankId}`);
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-950 text-white p-5 justify-between relative">
      <div className="space-y-5 flex-1 flex flex-col">
        <div className="flex justify-between items-center pt-2">
          <button onClick={() => navigate('/onboarding')} className="p-2 -ml-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 transition focus-visible:ring-2 focus-visible:ring-sky-500" aria-label="Go back">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="text-sm font-bold">Link Your Bank</span>
          <div className="w-8" />
        </div>

        <div className="text-left space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">Select your bank</h2>
          <p className="text-xs text-slate-500 leading-normal">
            We use RBI-approved secure channels to connect your bank.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="p-3 rounded-xl bg-sky-900/20 border border-sky-800/30 flex items-start space-x-2">
            <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-sky-300">Data Shared:</p>
              <p className="text-xs text-slate-400">Read-only access to subscription bills.</p>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-sky-900/20 border border-sky-800/30 flex items-start space-x-2">
            <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-sky-300">Consent Period:</p>
              <p className="text-xs text-slate-400">12 months (Revocable anytime in Settings).</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500" aria-hidden="true" />
          <input type="text" placeholder="Search bank name..." value={bankSearch} onChange={(e) => setBankSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-sky-500 transition"
            aria-label="Search bank name"
          />
        </div>

<div className="grid grid-cols-2 gap-2 flex-1 overflow-y-auto max-h-[300px] pt-1">
          {/* Linked Accounts Section */}
          {banks.filter(b => b.isConnected).map((bank) => (
            <motion.div key={bank.id} layout initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl border border-slate-700 bg-emerald-500/5 flex flex-col justify-between items-start text-left relative"
              aria-label={`${bank.name} - Already linked`}
            >
              <div className="mb-3">{getBankLogo(bank.id, bank.name, "w-8 h-8 rounded-lg")}</div>
              <div>
                <p className="text-xs font-bold text-white">{bank.name}</p>
                <p className="text-xs text-emerald-400 mt-0.5 flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                  <span>Linked • {bank.lastSynced}</span>
                </p>
              </div>
            </motion.div>
          ))}
          
          {/* Available Banks Section */}
          {banks.filter(b => !b.isConnected && b.name.toLowerCase().includes(bankSearch.toLowerCase())).length === 0 ? (
            <div className="col-span-2 text-center py-8 text-slate-500 text-xs">No banks found matching your search.</div>
          ) : (
            banks.filter(b => !b.isConnected && b.name.toLowerCase().includes(bankSearch.toLowerCase())).map((bank) => {
              const isSelected = selectedBankId === bank.id;
              return (
                <motion.button key={bank.id} layout initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                  onClick={() => setSelectedBankId(bank.id)}
                  className={`p-4 rounded-xl border flex flex-col justify-between items-start text-left transition relative ${isSelected ? 'border-sky-500 bg-sky-500/10 shadow-md shadow-sky-500/5' : 'border-slate-800 bg-slate-900/60 hover:bg-slate-900'}`}
                  aria-pressed={isSelected} aria-label={`Select ${bank.name}`}
                >
                  <div className="mb-3">{getBankLogo(bank.id, bank.name, "w-8 h-8 rounded-lg")}</div>
                  <div>
                    <p className="text-xs font-bold text-white">{bank.name}</p>
                    <p className="text-xs text-slate-500 mt-0.5">Tap to connect</p>
                  </div>
                  {isSelected && (
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-2 right-2 w-4 h-4 rounded-full bg-sky-500 flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                    </motion.span>
                  )}
                </motion.button>
              );
            })
          )}
        </div>
      </div>

      <div className="space-y-3 pt-4 z-10">
        <button onClick={handleLinkBankSubmit} disabled={!selectedBankId}
          className={`w-full py-4 text-white font-bold rounded-2xl transition shadow-lg ${selectedBankId ? 'bg-sky-500 hover:bg-sky-400 cursor-pointer shadow-sky-500/10 focus-visible:ring-2 focus-visible:ring-sky-500' : 'bg-slate-800 cursor-not-allowed text-slate-500'}`}
        >
          {selectedBankId ? 'Link Selected Bank' : 'Select a bank'}
        </button>
        <button onClick={() => navigate('/home')} className="w-full py-3 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 text-xs font-semibold rounded-2xl transition focus-visible:ring-2 focus-visible:ring-sky-500">
          Do this later / Skip
        </button>
        <p className="text-xs text-slate-500 text-center">
          Bank-grade encryption • Regulated by RBI
        </p>
      </div>
    </div>
  );
}

