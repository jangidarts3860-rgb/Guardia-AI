import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store';
import { useState } from 'react';
import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Camera, User, Mail, Smartphone, Globe } from 'lucide-react';
import { showToast } from '../../ui/shared/Toast';


export default function EditProfileScreen() {
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

  const [local, setLocal] = useState(profile || { name: '', phone: '', email: '', language: 'English', photo: '' });

  const handleSave = () => {
    setProfile(local);
    navigate('/me-profile');
  };

  return (
    <div className="flex flex-col min-h-full bg-transparent text-white p-5 justify-between">
      <div className="space-y-6 text-left">
        <div className="flex justify-between items-center pt-2">
          <button onClick={() => {
            const changed = local.name !== profile.name || local.email !== profile.email || local.language !== profile.language || local.photo !== profile.photo;
            if (changed) {
              if (window.confirm('You have unsaved changes. Are you sure you want to go back?')) {
                navigate('/me-profile');
              }
            } else {
              navigate('/me-profile');
            }
          }} className="p-2 -ml-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 transition focus-visible:ring-2 focus-visible:ring-sky-500" aria-label="Go back">
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          </button>
          <span className="text-sm font-bold tracking-tight text-white">Edit Profile</span>
          <div className="w-8" />
        </div>

        <div className="flex flex-col items-center space-y-2 py-2">
            <input id="profile-photo-input" type="file" accept="image/*" className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  if (file.size > 2 * 1024 * 1024) {
                    showToast('error', 'Image size must be less than 2MB');
                    return;
                  }
                  const reader = new FileReader();
                  reader.onloadend = () => setLocal({ ...local, photo: reader.result as string });
                  reader.readAsDataURL(file);
                }
              }}
          />
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('profile-photo-input')?.click()}
            className="relative w-24 h-24 rounded-full bg-gradient-to-br from-sky-950 to-indigo-950 border-2 border-sky-500/80 flex items-center justify-center cursor-pointer group shadow-lg shadow-sky-500/10 hover:border-sky-400 transition-all duration-300 overflow-hidden"
            role="button" tabIndex={0} aria-label="Change profile photo"
            onKeyDown={(e) => { if (e.key === 'Enter') document.getElementById('profile-photo-input')?.click(); }}
          >
            {local.photo ? (
              <img src={local.photo} alt="" className="w-full h-full object-cover" onError={() => setLocal({ ...local, photo: '' })} />
            ) : (
              <span className="text-sky-300 text-3xl font-black tracking-tight font-sans">
                {local.name ? local.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase() : 'RS'}
              </span>
            )}
            <div className="absolute right-1.5 bottom-1.5 w-7 h-7 rounded-full bg-sky-500 flex items-center justify-center border-2 border-slate-950 group-hover:bg-sky-400 transition-all z-10">
              <Camera className="w-3.5 h-3.5 text-white" />
            </div>
          </motion.div>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Change Profile Photo</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="name-input" className="text-xs font-bold uppercase tracking-wider text-slate-400">Full Name</label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-slate-400"><User className="w-4 h-4" aria-hidden="true" /></span>
              <input id="name-input" type="text" value={local.name} onChange={(e) => setLocal({ ...local, name: e.target.value })}
                className="w-full pl-11 pr-4 py-3 bg-slate-900/60 border border-slate-800/80 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-sky-500 focus:bg-slate-900 transition-all"
                placeholder="Enter full name" aria-label="Full name"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="email-input" className="text-xs font-bold uppercase tracking-wider text-slate-400">Email Address</label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-slate-400"><Mail className="w-4 h-4" aria-hidden="true" /></span>
              <input id="email-input" type="email" value={local.email} onChange={(e) => setLocal({ ...local, email: e.target.value })}
                className="w-full pl-11 pr-4 py-3 bg-slate-900/60 border border-slate-800/80 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-sky-500 focus:bg-slate-900 transition-all"
                placeholder="your.email@example.com" aria-label="Email address"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between">
              <label htmlFor="phone-input" className="text-xs font-bold uppercase tracking-wider text-slate-400">Mobile Number</label>
              <span className="text-[8px] bg-emerald-500/10 text-emerald-400 font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border border-emerald-500/10">Verified SIM 1</span>
            </div>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-slate-400"><Smartphone className="w-4 h-4" aria-hidden="true" /></span>
              <input id="phone-input" type="tel" disabled value={local.phone || '+91 98765 43210'}
                className="w-full pl-11 pr-4 py-3 bg-transparent/40 border border-slate-900 rounded-xl text-xs text-slate-400 cursor-not-allowed font-mono" aria-label="Mobile number (verified)"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="lang-select" className="text-xs font-bold uppercase tracking-wider text-slate-400">Language preference</label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-slate-400"><Globe className="w-4 h-4" aria-hidden="true" /></span>
              <select id="lang-select" value={local.language} onChange={(e) => setLocal({ ...local, language: e.target.value })}
                className="w-full pl-11 pr-4 py-3 bg-slate-900/60 border border-slate-800/80 rounded-xl text-xs text-white focus:outline-none focus:border-sky-500 focus:bg-slate-900 transition-all appearance-none" aria-label="Language preference"
              >
                <option value="English">English (IN)</option>
                <option value="Hindi">IN English / Hindi (हिन्दी)</option>
                <option value="Marathi">Marathi (मराठी)</option>
                <option value="Gujarati">Gujarati (ગુજરાતી)</option>
              </select>
              <span className="absolute right-4 text-slate-400 pointer-events-none text-xs" aria-hidden="true">▼</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2 pt-6 pb-4">
        <button onClick={handleSave} className="w-full py-3.5 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-2xl shadow-lg shadow-sky-500/10 transition active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-sky-500">
          Save Changes
        </button>
        <button onClick={() => navigate('/me-profile')} className="w-full py-3.5 bg-transparent hover:bg-slate-900 text-slate-400 font-bold rounded-2xl transition focus-visible:ring-2 focus-visible:ring-sky-500">
          Cancel
        </button>
      </div>
    </div>
  );
}

