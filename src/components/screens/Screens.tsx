import React, { useState, useEffect } from 'react';
import {
  ShieldCheck, AlertCircle, CheckCircle2, XCircle, Bell, ArrowLeft, Search,
  Share2, Eye, EyeOff, RotateCw, Lock, Radio, KeyRound, WifiOff, PhoneCall,
  Check, Play, Pause, CreditCard, ChevronRight, Download, RefreshCw, Send,
  Camera, Plus, Trash2, Sliders, Smartphone, AlertTriangle, ShieldAlert,
  User, Mail, Globe, Home, Scan
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ScreenId, Subscription, Bank, NotificationItem, ActivityItem } from '../../types';
import GuardiaLogo from '../ui/GuardiaLogo';

interface ScreensProps {
  currentScreen: ScreenId;
  navigate: (screen: ScreenId) => void;
  subscriptions: Subscription[];
  setSubscriptions: React.Dispatch<React.SetStateAction<Subscription[]>>;
  banks: Bank[];
  setBanks: React.Dispatch<React.SetStateAction<Bank[]>>;
  notifications: NotificationItem[];
  setNotifications: React.Dispatch<React.SetStateAction<NotificationItem[]>>;
  activities: ActivityItem[];
  setActivities: React.Dispatch<React.SetStateAction<ActivityItem[]>>;
  selectedSub: Subscription | null;
  setSelectedSub: (sub: Subscription | null) => void;
  profile: { name: string; phone: string; email: string; language: string; photo: string };
  setProfile: React.Dispatch<React.SetStateAction<{ name: string; phone: string; email: string; language: string; photo: string }>>;
  isOffline: boolean;
  setIsOffline: (offline: boolean) => void;
  isLightMode: boolean;
  setIsLightMode: (light: boolean) => void;
  scanOutcome: 'safe' | 'scam';
  setScanOutcome: (outcome: 'safe' | 'scam') => void;
}

export function getSubscriptionLogo(subId: string, name: string, sizeClass = 'w-12 h-12 rounded-xl') {
  const id = subId.toLowerCase();
  
  if (id.includes('netflix')) {
    return (
      <div className={`${sizeClass} bg-[#141414] border border-neutral-900 flex items-center justify-center shrink-0 relative overflow-hidden shadow-md rounded-2xl`}>
        <div className="absolute inset-0 bg-gradient-to-t from-red-950/10 to-transparent pointer-events-none" />
        <svg className="w-7 h-7 relative z-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="netRed1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff0a12" />
              <stop offset="100%" stopColor="#a80000" />
            </linearGradient>
            <linearGradient id="netRed2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e50914" />
              <stop offset="100%" stopColor="#960004" />
            </linearGradient>
          </defs>
          <path d="M22 10 H38 V90 H22 Z" fill="url(#netRed1)" />
          <path d="M62 10 H78 V90 H62 Z" fill="url(#netRed1)" />
          <path d="M22 10 H38 L62 90 H78 Z" fill="url(#netRed2)" filter="drop-shadow(-4px 0px 6px rgba(0,0,0,0.6))" />
        </svg>
      </div>
    );
  }
  
  if (id.includes('spotify')) {
    return (
      <div className={`${sizeClass} bg-[#121212] border border-neutral-900 flex items-center justify-center shrink-0 relative overflow-hidden shadow-md rounded-2xl`}>
        <svg className="w-8 h-8" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="45" fill="#1DB954" />
          <path d="M72.2 39.8 C 65.5 35.8 54.5 34.5 41.8 38.3 C 39.8 39 37.6 37.8 37 35.8 C 36.3 33.8 37.5 31.6 39.5 31 C 53.6 26.8 65.8 28.3 73.5 32.9 C 75.3 34 75.9 36.3 74.8 38.1 C 73.7 39.9 71.4 40.5 69.6 39.8 Z" fill="#000000" />
          <path d="M66.5 48.7 C 60.9 45.4 51.1 44.2 41.8 47.1 C 39.9 47.7 37.9 46.6 37.3 44.7 C 36.7 42.8 37.8 40.8 39.7 40.2 C 50.4 37 61.2 38.3 67.7 42.2 C 69.4 43.2 69.9 45.4 68.9 47.1 C 67.9 48.7 65.7 49.3 64 48.3 Z" fill="#000000" />
          <path d="M60.8 57.2 C 56.1 54.4 48.2 53.5 41.8 55.5 C 40 56.1 38.1 55.1 37.5 53.3 C 36.9 51.5 37.9 49.6 39.7 49 C 47.2 46.7 56 47.7 61.5 51 C 63.1 52 63.6 54.1 62.6 55.7 C 61.6 57.3 59.5 57.8 57.9 56.8 Z" fill="#000000" />
        </svg>
      </div>
    );
  }
  
  if (id.includes('adobe')) {
    return (
      <div className={`${sizeClass} bg-[#FF0000] border border-red-700 flex items-center justify-center shrink-0 relative overflow-hidden shadow-md rounded-2xl`}>
        <svg className="w-8 h-8" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 18 L80 81 H63.5 L58.5 70 H41.5 L36.5 81 H20 L50 18 Z M50 39.5 L45 52 H55 L50 39.5 Z" fill="#ffffff" />
        </svg>
      </div>
    );
  }
  
  if (id.includes('icloud')) {
    return (
      <div className={`${sizeClass} bg-gradient-to-br from-[#5ac8fa] via-[#34aadc] to-[#007aff] border border-sky-400/20 flex items-center justify-center shrink-0 relative overflow-hidden shadow-md rounded-2xl`}>
        <svg className="w-8 h-8" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M28 66 A 11 11 0 0 1 28 44 A 15 15 0 0 1 58 35 A 13 13 0 0 1 72 47 A 10 10 0 0 1 72 67 Z" fill="#ffffff" />
        </svg>
      </div>
    );
  }

  if (id.includes('hotstar') || id.includes('disney')) {
    return (
      <div className={`${sizeClass} bg-[#0c111b] border border-slate-800 flex items-center justify-center shrink-0 relative overflow-hidden shadow-md rounded-2xl`}>
        <svg className="w-8 h-8" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="hotstarGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#172e59" />
              <stop offset="100%" stopColor="#0a0e17" />
            </linearGradient>
            <linearGradient id="starGold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffdf73" />
              <stop offset="100%" stopColor="#d19c00" />
            </linearGradient>
          </defs>
          <rect width="100" height="100" rx="20" fill="url(#hotstarGrad)" />
          <path d="M50 18 L59 38 L81 41 L65 56 L69 78 L50 67 L31 78 L35 56 L19 41 L41 38 Z" fill="url(#starGold)" />
        </svg>
      </div>
    );
  }

  if (id.includes('youtube')) {
    return (
      <div className={`${sizeClass} bg-white border border-neutral-200 flex items-center justify-center shrink-0 relative overflow-hidden shadow-md rounded-2xl`}>
        <svg className="w-8 h-8" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M92 27 C92 27 91.1 20.7 88.4 18 C84.9 14.3 80.9 14.3 79.1 14.1 C66.1 13.1 50 13.1 50 13.1 C50 13.1 33.9 13.1 20.9 14.1 C19.1 14.3 15.1 14.3 11.6 18 C8.9 20.7 8 27 8 27 C8 27 7.1 34.3 7.1 41.6 V49.5 C7.1 56.8 8 64.1 8 64.1 C8 64.1 8.9 70.4 11.6 73.1 C15.1 76.8 19.8 76.7 21.9 77.1 C29.4 77.8 50 78 50 78 C50 78 66.1 77.9 79.1 77 C80.9 76.8 84.9 76.8 88.4 73.1 C91.1 70.4 92 64.1 92 64.1 C92 64.1 92.9 56.8 92.9 49.5 V41.6 C92.9 34.3 92 27 92 27 Z" fill="#FF0000" />
          <path d="M42 34 L66 49.5 L42 65 Z" fill="#ffffff" />
        </svg>
      </div>
    );
  }

  if (id.includes('amazon') || id.includes('prime')) {
    return (
      <div className={`${sizeClass} bg-[#1A237E] border border-indigo-900 flex flex-col items-center justify-center shrink-0 relative overflow-hidden shadow-md rounded-2xl`}>
        <span className="text-white font-black text-xs italic tracking-tighter">prime</span>
        <div className="w-6 h-1.5 border-b border-amber-400 rounded-full rotate-[-4deg] -mt-0.5" />
      </div>
    );
  }

  return (
    <div className={`${sizeClass} bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 relative overflow-hidden shadow-md rounded-2xl`}>
      <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(245,158,11,0.08)_0%,transparent_60%] pointer-events-none" />
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <circle cx="12" cy="12" r="3" fill="#f59e0b" opacity="0.3" />
        <path d="M12 10.5v3" />
        <path d="M12 15.5h.01" />
      </svg>
    </div>
  );
}

export function getBankLogo(bankId: string, name: string, sizeClass = 'w-10 h-10 rounded-xl') {
  const id = bankId.toLowerCase();
  
  if (id === 'sbi') {
    return (
      <div className={`${sizeClass} bg-[#0054a6] border border-[#004385] flex items-center justify-center shrink-0 relative overflow-hidden shadow-md rounded-2xl`}>
        <svg className="w-7 h-7" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="42" fill="#0054a6" />
          <circle cx="50" cy="50" r="12" fill="#ffffff" />
          <rect x="46.5" y="50" width="7" height="36" fill="#ffffff" />
        </svg>
      </div>
    );
  }
  
  if (id === 'hdfc') {
    return (
      <div className={`${sizeClass} bg-[#003366] border border-[#002244] flex flex-col items-center justify-center shrink-0 relative overflow-hidden shadow-md`}>
        <div className="w-5.5 h-5.5 border border-white/60 bg-white flex items-center justify-center relative p-[1px] rounded-sm">
          <div className="w-full h-full bg-[#003366] flex items-center justify-center">
            <span className="text-[6px] text-white font-black scale-95 leading-none">HDFC</span>
          </div>
        </div>
      </div>
    );
  }
  
  if (id === 'icici') {
    return (
      <div className={`${sizeClass} bg-gradient-to-br from-[#990000] to-[#E55B00] border border-orange-700 flex flex-col items-center justify-center shrink-0 relative overflow-hidden shadow-md`}>
        <span className="text-white font-black text-sm italic tracking-tighter leading-none">i</span>
        <span className="text-[5px] text-amber-300 font-bold scale-90 uppercase leading-none mt-[-2px]">ICICI</span>
      </div>
    );
  }
  
  if (id === 'axis') {
    return (
      <div className={`${sizeClass} bg-[#861A3D] border border-[#6b1531] flex flex-col items-center justify-center shrink-0 relative overflow-hidden shadow-md`}>
        <div className="w-5 h-5 flex flex-col items-center justify-center relative">
          <svg viewBox="0 0 100 100" className="w-3.5 h-3.5 fill-white">
            <path d="M50 15 L85 80 L65 80 L50 45 L35 80 L15 80 Z" />
          </svg>
        </div>
      </div>
    );
  }
  
  if (id === 'kotak') {
    return (
      <div className={`${sizeClass} bg-[#e91c24] border border-red-700 flex flex-col items-center justify-center shrink-0 relative overflow-hidden shadow-md`}>
        <span className="text-white font-black text-xs font-sans tracking-tighter leading-none">K</span>
        <span className="text-[5px] text-white/80 font-bold mt-[-1px] uppercase tracking-wider leading-none">KOTAK</span>
      </div>
    );
  }

  if (id === 'idfc') {
    return (
      <div className={`${sizeClass} bg-gradient-to-r from-[#990033] to-[#cc3333] border border-red-800 flex flex-col items-center justify-center shrink-0 relative overflow-hidden shadow-md`}>
        <div className="w-5 h-5 border border-amber-400/40 flex flex-wrap items-center justify-center p-[1px] rounded-sm">
          <div className="w-full h-full bg-[#1e1e1e]/20 flex items-center justify-center">
            <span className="text-[7px] text-amber-400 font-extrabold leading-none">1st</span>
          </div>
        </div>
      </div>
    );
  }

  if (id === 'yes') {
    return (
      <div className={`${sizeClass} bg-[#004B87] border border-[#003865] flex flex-col items-center justify-center shrink-0 relative overflow-hidden shadow-md`}>
        <span className="text-white font-black text-xs italic tracking-tighter leading-none">YES</span>
        <div className="w-3 h-[1px] bg-red-500 mt-0.5" />
      </div>
    );
  }

  if (id === 'pnb') {
    return (
      <div className={`${sizeClass} bg-[#A6192E] border border-red-800 flex items-center justify-center shrink-0 relative overflow-hidden shadow-md`}>
        <div className="w-5 h-5 rounded-full bg-yellow-500 border border-yellow-600 flex items-center justify-center p-[1.5px]">
          <div className="w-full h-full rounded-full bg-[#A6192E] flex items-center justify-center text-[5px] text-white font-black leading-none">
            PNB
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`${sizeClass} bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 relative overflow-hidden shadow-md`}>
      <span className="text-slate-400 font-extrabold text-xs">{name.substring(0, 2).toUpperCase()}</span>
    </div>
  );
}



export default function Screens({
  currentScreen,
  navigate,
  subscriptions,
  setSubscriptions,
  banks,
  setBanks,
  notifications,
  setNotifications,
  activities,
  setActivities,
  selectedSub,
  setSelectedSub,
  profile,
  setProfile,
  isOffline,
  setIsOffline,
  isLightMode,
  setIsLightMode,
  scanOutcome,
  setScanOutcome,
}: ScreensProps) {
  const [showBiometric, setShowBiometric] = useState(false);
  const [biometricState, setBiometricState] = useState<'idle' | 'scanning' | 'success'>('idle');
  const [biometricTitle, setBiometricTitle] = useState('');
  const [biometricCallback, setBiometricCallback] = useState<(() => void) | null>(null);

  const triggerBiometric = (title: string, callback: () => void) => {
    setBiometricTitle(title);
    setBiometricCallback(() => callback);
    setShowBiometric(true);
    setBiometricState('scanning');
  };

  useEffect(() => {
    if (showBiometric && biometricState === 'scanning') {
      const scanTimer = setTimeout(() => {
        setBiometricState('success');
      }, 1600); // 1.6s scan simulation

      return () => clearTimeout(scanTimer);
    } else if (showBiometric && biometricState === 'success') {
      const successTimer = setTimeout(() => {
        setShowBiometric(false);
        setBiometricState('idle');
        if (biometricCallback) {
          biometricCallback();
        }
      }, 900); // 900ms success confirmation

      return () => clearTimeout(successTimer);
    }
  }, [showBiometric, biometricState, biometricCallback]);

  // Skeleton Loading States for preventing layout shifts
  const [isHomeLoading, setIsHomeLoading] = useState(false);
  const [isVaultLoading, setIsVaultLoading] = useState(false);
  const [isNotificationsLoading, setIsNotificationsLoading] = useState(false);
  const [isSubsLoading, setIsSubsLoading] = useState(false);
  const [isActivityLoading, setIsActivityLoading] = useState(false);

  useEffect(() => {
    if (currentScreen === 'home') {
      setIsHomeLoading(true);
      const timer = setTimeout(() => setIsHomeLoading(false), 200);
      return () => clearTimeout(timer);
    }
    if (currentScreen === 'vault') {
      setIsVaultLoading(true);
      const timer = setTimeout(() => setIsVaultLoading(false), 200);
      return () => clearTimeout(timer);
    }
    if (currentScreen === 'notifications') {
      setIsNotificationsLoading(true);
      const timer = setTimeout(() => setIsNotificationsLoading(false), 200);
      return () => clearTimeout(timer);
    }
    if (currentScreen === 'subs-dashboard') {
      setIsSubsLoading(true);
      const timer = setTimeout(() => setIsSubsLoading(false), 750);
      return () => clearTimeout(timer);
    }
    if (currentScreen === 'activity-log') {
      setIsActivityLoading(true);
      const timer = setTimeout(() => setIsActivityLoading(false), 650);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  // Local interaction states
  const [otpSent, setOtpSent] = useState(false);
  const [otpVal, setOtpVal] = useState('');
  const [pinVal, setPinVal] = useState('');
  const [bankSearch, setBankSearch] = useState('');
  const [selectedBankId, setSelectedBankId] = useState<string | null>(null);
  const [pasteText, setPasteText] = useState('');
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [slideCancelProgress, setSlideCancelProgress] = useState(0);
  const [isSlidingCancel, setIsSlidingCancel] = useState(false);
  const [slideFreezeProgress, setSlideFreezeProgress] = useState(0);
  const [isSlidingFreeze, setIsSlidingFreeze] = useState(false);
  const [isAnonymized, setIsAnonymized] = useState(false);
  const [smsScan, setSmsScan] = useState(true);
  const [callProtection, setCallProtection] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(true);
  const [autoCancel, setAutoCancel] = useState(false);
  const [isShieldActive, setIsShieldActive] = useState(true);
  const [analyzingProgress, setAnalyzingProgress] = useState(0);
  const [notifFilter, setNotifFilter] = useState<'All' | 'Fraud' | 'Subscriptions' | 'System'>('All');
  const [activityFilter, setActivityFilter] = useState<'All' | 'Blocked' | 'Verified' | 'Cancelled'>('All');
  const [undoSeconds, setUndoSeconds] = useState(8);
  const [activeSpendsTab, setActiveSpendsTab] = useState<'my' | 'family'>('my');
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [phoneBlurred, setPhoneBlurred] = useState(false);
  const [emailBlurred, setEmailBlurred] = useState(false);

  // Keep camera permission persistent once granted, similar to standard mobile OS permission storage

  // Simulate auto-scanning success after 2.5 seconds is disabled to give the user manual control

  // Triggering merchant scan sequence in screen 8
  useEffect(() => {
    if (currentScreen === 'analyzing-merchant') {
      setAnalyzingProgress(0);
      const timer = setInterval(() => {
        setAnalyzingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            // Navigate based on user-controlled scanOutcome
            setTimeout(() => {
              navigate(scanOutcome === 'safe' ? 'merchant-verified' : 'scam-detected');
            }, 800);
            return 100;
          }
          return prev + 10;
        });
      }, 250);
      return () => clearInterval(timer);
    }
  }, [currentScreen, navigate]);

  // Splash Screen auto-redirect
  useEffect(() => {
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => {
        navigate('onboarding');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [currentScreen, navigate]);

  // OTP Resend Timer
  const [resendTimer, setResendTimer] = useState(30);
  const [otpSuccess, setOtpSuccess] = useState(false);

  useEffect(() => {
    if (currentScreen === 'verify-otp') {
      setResendTimer(30);
      setOtpSuccess(false);
      const timer = setInterval(() => {
        setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [currentScreen]);

  // Undo cancellation countdown
  useEffect(() => {
    if (currentScreen === 'cancel-success' && undoSeconds > 0) {
      const timer = setTimeout(() => {
        setUndoSeconds((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentScreen, undoSeconds]);

  // Handle Bank select
  const handleBankSelect = (bankId: string) => {
    setSelectedBankId(bankId);
  };

  const handleLinkBankSubmit = () => {
    if (!selectedBankId) return;
    navigate('link-bank-progress');
    setTimeout(() => {
      setBanks(prev => prev.map(b => b.id === selectedBankId ? { ...b, isConnected: true, balance: Math.floor(Math.random() * 50000) + 10000, accNumber: '•••• ' + Math.floor(Math.random() * 9000 + 1000), lastSynced: 'Just now' } : b));
      // Add activity
      const selectedBank = banks.find(b => b.id === selectedBankId);
      if (selectedBank) {
        setActivities(prev => [
          { id: 'act-new-' + Date.now(), title: `${selectedBank.name} linked`, description: 'Account Aggregator connected successfully', time: 'Just now', status: 'Verified' },
          ...prev
        ]);
        setNotifications(prev => [
          { id: 'not-new-' + Date.now(), title: `${selectedBank.name} linked successfully`, description: 'Security monitoring initiated.', time: 'now', type: 'System', risk: 'Success', unread: true },
          ...prev
        ]);
      }
      navigate('vault');
    }, 1500);
  };

  // Drag simulation logic for Slider
  const handleSlideCancel = (e: React.MouseEvent | React.TouchEvent) => {
    setIsSlidingCancel(true);
  };

  const handleSlideCancelMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!isSlidingCancel) return;
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const relativeX = clientX - rect.left;
    const progress = Math.min(Math.max((relativeX / rect.width) * 100, 0), 100);
    setSlideCancelProgress(progress);

    if (progress >= 92) {
      setIsSlidingCancel(false);
      setSlideCancelProgress(100);
      
      const performCancel = () => {
        if (selectedSub) {
          setSubscriptions(prev => prev.map(s => s.id === selectedSub.id ? { ...s, status: 'Cancelled' } : s));
          setActivities(prev => [
            { id: 'act-cancel-' + Date.now(), title: `${selectedSub.name} cancelled`, description: `Saved ₹${selectedSub.cost}/mo`, time: 'Just now', status: 'Cancelled' },
            ...prev
          ]);
        }
        setTimeout(() => {
          setUndoSeconds(8);
          navigate('cancel-success');
          setSlideCancelProgress(0);
        }, 200);
      };

      triggerBiometric(`Cancel ${selectedSub ? selectedSub.name : 'Subscription'}`, performCancel);
    }
  };

  const handleSlideCancelEnd = () => {
    setIsSlidingCancel(false);
    if (slideCancelProgress < 92) {
      setSlideCancelProgress(0);
    }
  };

  // Freeze Slide slider logic
  const handleSlideFreezeMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!isSlidingFreeze) return;
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const relativeX = clientX - rect.left;
    const progress = Math.min(Math.max((relativeX / rect.width) * 100, 0), 100);
    setSlideFreezeProgress(progress);

    if (progress >= 92) {
      setIsSlidingFreeze(false);
      setSlideFreezeProgress(100);

      if (currentScreen === 'vault') {
        setTimeout(() => {
          navigate('freeze-accounts-confirm');
          setSlideFreezeProgress(0);
        }, 200);
      } else {
        const performFreeze = () => {
          // From freeze-accounts-confirm -> Perform freeze logic
          setBanks(prev => prev.map(b => ({ ...b, isConnected: false })));
          setActivities(prev => [
            { id: 'act-freeze-' + Date.now(), title: 'All Accounts Frozen', description: 'Emergency blockage issued to bank APIs', time: 'Just now', status: 'Blocked' },
            ...prev
          ]);
          setNotifications(prev => [
            { id: 'not-freeze-' + Date.now(), title: 'Accounts Frozen Successfully', description: 'Immediate shield block active.', time: 'now', type: 'Fraud', risk: 'High', unread: true },
            ...prev
          ]);
          setTimeout(() => {
            navigate('home');
            setSlideFreezeProgress(0);
          }, 500);
        };

        triggerBiometric('Emergency API Account Blockade', performFreeze);
      }
    }
  };

  const handleSlideFreezeEnd = () => {
    setIsSlidingFreeze(false);
    if (slideFreezeProgress < 92) {
      setSlideFreezeProgress(0);
    }
  };

  // General theme-aware card styles
  const cardBg = isLightMode ? 'bg-white border-gray-100 shadow-sm text-gray-900' : 'bg-slate-900/90 border-slate-800/80 text-white';
  const textMuted = isLightMode ? 'text-gray-500' : 'text-slate-400';
  const headerText = isLightMode ? 'text-gray-900' : 'text-white';
  const inputBg = isLightMode ? 'bg-gray-50 border-gray-200 text-gray-900 focus:bg-white' : 'bg-slate-950/80 border-slate-800/80 text-white focus:bg-slate-950';

  // Dispatch view based on screen ID
  const activeView = (() => {
    switch (currentScreen) {
    // ==========================================
    // 1. ONBOARDING & AUTHENTICATION FLOW
    // ==========================================
    case 'splash':
      return (
        <div className="flex flex-col items-center justify-between h-full bg-slate-950 text-white p-6 relative overflow-hidden">
          {/* Neon cosmic background lights */}
          <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(14,165,233,0.18)_0%,transparent_65%]" />
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-sky-500/20 to-transparent" />
          
          <div className="flex-1 flex flex-col items-center justify-center relative z-10 w-full">
            {/* Pulsing shield check icon with cosmic subtle rings */}
            <motion.div 
              animate={{ 
                scale: [1, 1.04, 1],
                filter: ["drop-shadow(0 0 15px rgba(6,182,212,0.25))", "drop-shadow(0 0 25px rgba(6,182,212,0.5))", "drop-shadow(0 0 15px rgba(6,182,212,0.25))"]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="relative mb-6 flex items-center justify-center"
            >
              {/* Glow rings behind logo */}
              <motion.div 
                animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.25, 0.12] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-44 h-44 rounded-full bg-cyan-500/10 blur-2xl pointer-events-none" 
              />
              <motion.div 
                animate={{ scale: [1, 1.35, 1.7], opacity: [0.35, 0.15, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
                className="absolute w-36 h-36 rounded-full border border-cyan-500/25 pointer-events-none" 
              />
              <GuardiaLogo size={140} variant="icon" animated={false} />
            </motion.div>
            
            <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-sky-400 bg-clip-text text-transparent">
              Guardia AI
            </h1>
            
            <div className="mt-3 flex items-center space-x-1.5 px-3 py-1 bg-sky-950/40 border border-sky-500/15 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
              <p className="text-[9px] text-sky-400 font-bold font-mono tracking-wider uppercase">
                Active Shield Protocol
              </p>
            </div>
          </div>
          
          <div className="w-full max-w-[280px] flex flex-col items-center space-y-4 z-10 pb-8">
            <div className="w-full bg-slate-900/80 h-1.5 rounded-full overflow-hidden border border-slate-800/80 p-[1px] relative">
              <motion.div 
                className="bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-400 h-full rounded-full" 
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{
                  duration: 2.2,
                  ease: "easeInOut",
                  repeat: 0
                }}
              />
            </div>
            
            <div className="text-center space-y-1">
              <span className="text-[9px] text-slate-500 font-extrabold tracking-widest block font-mono">
                SECURED SYSTEM • RBI AA CERTIFIED
              </span>
              <span className="text-[8px] text-slate-600 block">
                AES-256 END-TO-END LEDGER ENCRYPTION
              </span>
            </div>
          </div>
        </div>
      );

    case 'onboarding':
      return (
        <div className="flex flex-col justify-between h-full bg-transparent text-white p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-sky-950/20 via-transparent to-slate-950" />
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-cyan-500/15 rounded-full blur-[90px] pointer-events-none" />
          
          <div className="flex justify-between items-center pt-2 z-10">
            <span className="text-[10px] font-black tracking-widest text-slate-500 font-mono">STEP 1 OF 3</span>
            <button onClick={() => {
              setProfile({ name: 'Rohan Sharma', phone: '+91 98765 43210', email: 'rohan.sharma@gmail.com', language: 'English', photo: '' });
              navigate('welcome-back');
            }} className="text-xs text-sky-400 hover:text-sky-300 transition font-extrabold tracking-wide uppercase p-3 -m-3">Skip</button>
          </div>
          
          <div className="flex-1 flex flex-col items-center justify-center text-center z-10 px-2 space-y-6">
            {/* Interactive Mock Card to convey product functionality */}
            <motion.div 
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-full max-w-[280px] p-4 bg-slate-900/80 border border-slate-800/80 rounded-2xl text-left relative overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full blur-2xl" />
              <div className="flex justify-between items-center mb-3">
                <span className="text-[9px] font-bold text-red-400 bg-red-400/10 border border-red-500/20 px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">🚨 Risk Intercepted</span>
                <span className="text-[9px] text-slate-500 font-mono">Just Now</span>
              </div>
              
              <h3 className="font-extrabold text-xs text-white flex items-center space-x-1.5">
                <span>🎬</span>
                <span>Netflix Renewal Blocked</span>
              </h3>
              <p className="text-[10px] text-slate-400 mt-0.5 leading-normal">
                Guardia AI intercepted an unwanted auto-debit of <strong className="text-white font-semibold">₹1,499</strong>. Unused trial detected.
              </p>
              
              <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex justify-between items-center">
                <span className="text-[9px] font-bold text-emerald-400">✓ Saved ₹1,499</span>
                <span className="text-[9px] text-slate-500 font-mono">Score: 98% safe</span>
              </div>
            </motion.div>

            <div className="space-y-2.5">
              <h2 className="text-2xl font-black tracking-tight text-white leading-tight">We stop financial scams before they happen</h2>
              <p className="text-xs text-slate-400 leading-relaxed px-2">
                Real-time AI scores every UPI request, QR scan, and payment page instantly — protecting you from dark-pattern auto-renewals.
              </p>
            </div>
            
            <div className="flex space-x-2 pt-1">
              <span className="w-6 h-1.5 bg-sky-500 rounded-full" />
              <span className="w-2 h-1.5 bg-slate-700 rounded-full" />
              <span className="w-2 h-1.5 bg-slate-700 rounded-full" />
            </div>
          </div>
          
          <div className="space-y-4 z-10 pb-6">
            <button onClick={() => navigate('permissions')} className="w-full bg-sky-500 hover:bg-sky-400 text-white font-bold py-4 rounded-2xl shadow-lg shadow-sky-500/15 transition active:scale-[0.98]">
              Continue →
            </button>
          </div>
        </div>
      );

    case 'permissions':
      return (
        <div className="flex flex-col h-full bg-slate-950 text-white p-6 justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-radial-[circle_at_bottom,rgba(14,165,233,0.05)_0%,transparent_60%] pointer-events-none" />
          
          <div className="space-y-5 z-10">
            <div className="flex justify-between items-center pt-2">
              <span className="text-[10px] font-black tracking-widest text-slate-500 font-mono">STEP 2 OF 3</span>
              <button onClick={() => navigate('create-account')} className="text-xs text-slate-400 hover:text-white transition font-medium p-3 -m-3">Skip</button>
            </div>
            
            <div className="space-y-2 text-left">
              <h2 className="text-2xl font-black tracking-tight text-white">Enable Shield Layers</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Allow permissions to activate Guardia AI on-device fraud scanning and active transaction protection.
              </p>
            </div>

            <div className="space-y-2.5 pt-1">
              {[
                { title: 'Screen Scanner', desc: 'Scan QR codes & verify safety score', enabled: smsScan, toggle: () => setSmsScan(!smsScan) },
                { title: 'SMS Guardian', desc: 'Intercept OTP stealers & scam links', enabled: callProtection, toggle: () => setCallProtection(!callProtection) },
                { title: 'Push Alerts', desc: 'Immediate fraud alerts & bill warnings', enabled: pushAlerts, toggle: () => setPushAlerts(!pushAlerts) },
              ].map((perm, index) => (
                <button 
                  key={index} 
                  onClick={perm.toggle}
                  role="switch"
                  aria-checked={perm.enabled}
                  aria-label={`Toggle ${perm.title}`}
                  className="w-full flex items-center justify-between p-3 bg-slate-900/60 border border-slate-800/80 rounded-2xl cursor-pointer hover:border-slate-700 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus:outline-none text-left"
                >
                  <div className="flex space-x-3 items-center text-left">
                    <div className="w-10 h-10 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center shrink-0">
                      {index === 0 && <Camera className="w-4.5 h-4.5 text-sky-400" />}
                      {index === 1 && <Send className="w-4.5 h-4.5 text-sky-400" />}
                      {index === 2 && <Bell className="w-4.5 h-4.5 text-sky-400" />}
                    </div>
                    <div>
                      <p className="font-extrabold text-xs text-slate-200">{perm.title}</p>
                      <p className="text-[10px] text-slate-400 leading-snug">{perm.desc}</p>
                    </div>
                  </div>
                  
                  {/* Apple iOS-style custom toggle */}
                  <div className={`w-10 h-6 rounded-full transition-all duration-300 relative shrink-0 shadow-inner ${perm.enabled ? 'bg-sky-500' : 'bg-slate-700'}`}>
                    <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all duration-300 shadow-sm ${perm.enabled ? 'left-[18px]' : 'left-0.5'}`} />
                  </div>
                </button>
              ))}
            </div>

            <div className="flex justify-center pt-2 pb-1">
              <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center space-x-1.5">
                <Lock className="w-3 h-3 text-emerald-400" />
                <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest">Bank-Grade Encryption</span>
              </div>
            </div>

            <div className="p-3.5 bg-slate-900/30 border border-slate-800/50 rounded-2xl flex space-x-3 items-start text-left">
              <ShieldCheck className="w-4.5 h-4.5 text-sky-400 shrink-0 mt-0.5" />
              <p className="text-[10px] text-slate-400 leading-normal">
                Your credentials <strong className="text-white font-medium">never leave your phone</strong>. On-device heuristics run offline without cloud storage.
              </p>
            </div>
          </div>
          
          <div className="pt-4 z-10 pb-6">
            <button 
              onClick={() => {
                if (smsScan) {
                  setHasCameraPermission(true);
                }
                navigate('create-account');
              }} 
              className="w-full bg-sky-500 hover:bg-sky-400 text-white font-bold py-4 rounded-2xl shadow-lg shadow-sky-500/10 transition active:scale-[0.98]"
            >
              Grant & Activate Shield →
            </button>
          </div>
        </div>
      );

    case 'create-account':
      return (
        <div className="flex flex-col h-full bg-transparent text-white p-6 justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-radial-[circle_at_bottom,rgba(99,102,241,0.05)_0%,transparent_60%] pointer-events-none" />
          
          <div className="space-y-6 z-10 flex-1 flex flex-col">
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center space-x-2">
                <button onClick={() => navigate('permissions')} className="p-2 -ml-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 transition">
                  <ArrowLeft className="w-4 h-4 text-slate-300" />
                </button>
                <span className="text-[10px] font-black tracking-widest text-slate-500 font-mono">STEP 3 OF 3</span>
              </div>
              <button 
                onClick={() => {
                  setProfile({ name: 'Rohan Sharma', phone: '+91 98765 43210', email: 'rohan.sharma@gmail.com', language: 'English', photo: '' });
                  navigate('welcome-back');
                }} 
                className="text-xs text-sky-400 hover:text-sky-300 transition font-extrabold tracking-wide uppercase p-3 -mr-3"
              >
                Skip
              </button>
            </div>
            
            <div className="space-y-2 text-left">
              <h2 className="text-2xl font-black tracking-tight text-white">Create Security Profile</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Enter your details to bind your safe device tokens to Guardia Shield.
              </p>
            </div>

            <div className="space-y-4 pt-3 text-left">
              <div className="space-y-1.5">
                <label htmlFor="full-name" className="text-[10px] font-bold uppercase tracking-wider text-slate-300">Full Name</label>
                <div className="relative">
                  <input
                    id="full-name"
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    placeholder="e.g. Rohan Sharma"
                    className="w-full px-4 py-3.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 transition font-medium"
                  />
                </div>
                <div className="min-h-[16px] mt-1">
                  {profile.name.trim() && profile.name.trim().length < 3 && (
                    <p className="text-[10px] text-red-400 font-semibold">⚠️ Name must be at least 3 characters</p>
                  )}
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label htmlFor="mobile-number" className="text-[10px] font-bold uppercase tracking-wider text-slate-300">Mobile Number (Secure Bank Link)</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                    <span className="text-xs font-bold text-sky-400">🇮🇳 +91</span>
                  </div>
                  <input
                    id="mobile-number"
                    type="tel"
                    value={profile.phone.replace('+91 ', '')}
                    onChange={(e) => {
                      const num = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
                      setProfile({ ...profile, phone: '+91 ' + num });
                    }}
                    onBlur={() => setPhoneBlurred(true)}
                    onFocus={() => setPhoneBlurred(false)}
                    placeholder="98765 43210"
                    className="w-full pl-17 pr-4 py-3.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 transition font-mono font-bold tracking-wider"
                  />
                </div>
                <div className="min-h-[16px] mt-1">
                  {phoneBlurred && profile.phone.replace('+91', '').replace(/\s/g, '') && profile.phone.replace('+91', '').replace(/\s/g, '').length !== 10 && (
                    <p className="text-[10px] text-red-400 font-semibold">⚠️ Mobile number must be exactly 10 digits</p>
                  )}
                  {profile.phone.replace('+91', '').replace(/\s/g, '').length === 10 && (
                    <p className="text-[10px] text-emerald-400 font-semibold">✓ Secure bank-linked number verified</p>
                  )}
                </div>
              </div>
              <div className="space-y-1.5">
                <label htmlFor="email-address" className="text-[10px] font-bold uppercase tracking-wider text-slate-300">Email Address (Security Reports & Alerts)</label>
                <div className="relative">
                  <input
                    id="email-address"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    onBlur={() => setEmailBlurred(true)}
                    onFocus={() => setEmailBlurred(false)}
                    placeholder="e.g. rohan.sharma@gmail.com"
                    className="w-full px-4 py-3.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 transition font-medium"
                  />
                </div>
                <div className="min-h-[16px] mt-1">
                  {emailBlurred && profile.email.trim() && !(profile.email.includes('@') && profile.email.split('@')[1]?.includes('.')) && (
                    <p className="text-[10px] text-red-400 font-semibold">⚠️ Enter a valid email address</p>
                  )}
                  {emailBlurred && profile.email.trim() && profile.email.includes('@') && profile.email.split('@')[1]?.includes('.') && (
                    <p className="text-[10px] text-emerald-400 font-semibold">✓ Email registered for security backup</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4 z-10 pb-6">
            <button 
              disabled={
                !profile.name.trim() || 
                profile.name.trim().length < 3 || 
                profile.phone.replace('+91', '').replace(/\s/g, '').length !== 10 ||
                !profile.email.trim() ||
                !(profile.email.includes('@') && profile.email.split('@')[1]?.includes('.'))
              }
              onClick={() => {
                navigate('verify-otp');
              }} 
              className={`w-full font-bold py-4 rounded-2xl shadow-lg transition active:scale-[0.98] ${
                profile.name.trim() && 
                profile.name.trim().length >= 3 && 
                profile.phone.replace('+91', '').replace(/\s/g, '').length === 10 &&
                profile.email.trim() &&
                profile.email.includes('@') && 
                profile.email.split('@')[1]?.includes('.')
                  ? 'bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-400 hover:to-indigo-400 text-white cursor-pointer shadow-sky-500/10'
                  : 'bg-slate-700/50 text-slate-400 cursor-not-allowed shadow-none border border-slate-700'
              }`}
            >
              Send OTP Verification →
            </button>
            <p className="text-[9px] text-slate-500 leading-relaxed text-center px-4">
              By proceeding, you consent to secure OTP binding in compliance with RBI Account Aggregator guidelines. <span className="text-sky-400 hover:underline cursor-pointer">Privacy Policy</span>
            </p>
          </div>
        </div>
      );

    case 'verify-otp':
      return (
        <div className="flex flex-col h-full bg-transparent text-white p-6 justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-radial-[circle_at_top,rgba(14,165,233,0.05)_0%,transparent_60%] pointer-events-none" />
          <div className="space-y-6 z-10">
            <div className="flex items-center space-x-2 pt-2">
              <button onClick={() => navigate('create-account')} className="p-2 -ml-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 transition">
                <ArrowLeft className="w-4 h-4 text-slate-300" />
              </button>
              <span className="font-bold text-xs tracking-wide uppercase text-slate-400">Security Guard</span>
            </div>
            
            <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden flex">
              <div className="bg-gradient-to-r from-sky-500 to-indigo-500 h-full w-2/3 rounded-full" />
              <div className="bg-slate-800 h-full flex-1" />
            </div>

            <div className="space-y-2 text-left">
              <h2 className="text-2xl font-black tracking-tight text-white">Enter OTP Code</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Enter the 6-digit confirmation code sent to <strong className="text-slate-200">{profile.phone || '+91 98765 43210'}</strong>
              </p>
            </div>

            {/* Premium 6-Block OTP Input Visualizer */}
            <div className="pt-4 relative">
              <input
                type="text"
                maxLength={6}
                value={otpVal}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9]/g, '');
                  setOtpVal(val);
                  if (val.length === 6) {
                    setOtpSuccess(true);
                    setTimeout(() => {
                      navigate('welcome-back');
                      setOtpVal('');
                      setOtpSuccess(false);
                    }, 400);
                  }
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-default z-20"
                autoFocus
              />
              <div className="grid grid-cols-6 gap-2.5 justify-center relative z-10">
                {[...Array(6)].map((_, idx) => {
                  const digit = otpVal[idx] || '';
                  const isActive = otpVal.length === idx || (idx === 5 && otpVal.length === 6);
                  return (
                    <div
                      key={idx}
                      className={`h-14 rounded-2xl border flex items-center justify-center text-lg font-mono font-black transition-all duration-200 ${
                        otpSuccess
                          ? 'border-emerald-500 bg-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.4)] text-white scale-105'
                          : isActive 
                            ? 'border-sky-500 bg-sky-500/10 shadow-[0_0_12px_rgba(14,165,233,0.35)] text-white scale-105' 
                            : digit 
                              ? 'border-slate-700 bg-slate-900/60 text-sky-400' 
                              : 'border-slate-800 bg-slate-900/20 text-slate-600'
                      }`}
                    >
                      {digit ? (
                        <span className="animate-[scaleIn_0.15s_ease-out]">{digit}</span>
                      ) : (
                        <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-sky-400 animate-pulse' : 'bg-slate-700'}`} />
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between items-center mt-4 px-1">
                <span className="text-[10px] text-slate-500 font-medium">Didn&apos;t receive code?</span>
                <button 
                  disabled={resendTimer > 0} 
                  className={`text-[10px] font-bold ${resendTimer > 0 ? 'text-slate-600 cursor-not-allowed' : 'text-sky-400 hover:underline'}`}
                >
                  {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend Now'}
                </button>
              </div>

            </div>

            <div className="p-3.5 bg-slate-900/40 border border-slate-800/60 rounded-2xl flex space-x-3 items-center">
              <div className="p-2 bg-slate-950 border border-slate-800 rounded-xl text-sky-400 shrink-0">
                <Lock className="w-4 h-4" />
              </div>
              <p className="text-[10px] text-slate-400 text-left leading-normal">
                This verification secures on-device biometric tokens. Guardia AI <strong className="text-white font-medium">never accesses</strong> or requests your bank password.
              </p>
            </div>
          </div>

          <div className="pb-6 z-10">
            <button
              onClick={() => {
                if (!profile.name.trim()) {
                  setProfile({ name: 'Rohan Sharma', phone: '+91 98765 43210', email: 'rohan.sharma@gmail.com', language: 'English', photo: '' });
                }
                if (otpVal.length === 6) {
                  navigate('welcome-back');
                } else {
                  // Fallback for simulation
                  setOtpVal('123456');
                  setTimeout(() => navigate('welcome-back'), 200);
                }
              }}
              className="w-full bg-sky-500 hover:bg-sky-400 text-white font-bold py-4 rounded-2xl shadow-lg shadow-sky-500/10 transition active:scale-[0.98]"
            >
              Verify & Proceed →
            </button>
          </div>
        </div>
      );

    case 'welcome-back':
      return (
        <div className="flex flex-col h-full bg-slate-950 text-white p-6 justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-radial-[circle_at_top,rgba(99,102,241,0.05)_0%,transparent_60%] pointer-events-none" />
          
          <div className="space-y-6 z-10 flex-1 flex flex-col justify-between">
            {/* Top Area */}
            <div className="space-y-4">
              <div className="flex justify-center pt-2">
                <div className="relative flex items-center justify-center">
                  {/* Subtle cosmic glow like splash screen */}
                  <div className="absolute w-20 h-20 rounded-full bg-cyan-500/10 blur-xl animate-pulse pointer-events-none" />
                  <GuardiaLogo size={64} variant="icon" animated={true} />
                </div>
              </div>
              <div className="space-y-1 text-center">
                <h2 className="text-2xl font-black tracking-tight">Welcome back</h2>
                <p className="text-xs text-slate-400">Security vault locked. Enter your secret PIN.</p>
              </div>

              {/* Connected Registered phone banner */}
              <div className="bg-slate-900/60 border border-slate-800/80 p-3 rounded-2xl flex items-center justify-between max-w-[280px] mx-auto">
                <div className="flex items-center space-x-2 text-left">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-[10px] text-slate-400 font-bold font-mono">SECURED: {profile.phone || '+91 98765 43210'}</span>
                </div>
                <button onClick={() => navigate('create-account')} className="text-[9px] text-sky-400 font-bold uppercase hover:underline p-2 -mr-2 -my-2">Switch</button>
              </div>

              {/* Passcode dots display */}
              <div className="flex justify-center space-x-6 py-6">
                {[...Array(4)].map((_, idx) => {
                  const filled = pinVal.length > idx;
                  return (
                    <div
                      key={idx}
                      className={`w-4 h-4 rounded-full transition-all duration-150 ${
                        filled 
                          ? 'bg-sky-400 shadow-[0_0_10px_rgba(14,165,233,0.8)] scale-110' 
                          : 'border-2 border-slate-800 bg-slate-950'
                      }`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Custom Interactive Tactile Keypad */}
            <div className="w-full max-w-[280px] mx-auto pb-4">
              <div className="grid grid-cols-3 gap-y-4 gap-x-5 text-center">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <button
                    key={num}
                    onClick={() => {
                      if (pinVal.length < 4) {
                        const newVal = pinVal + num;
                        setPinVal(newVal);
                        if (newVal.length === 4) {
                          setTimeout(() => {
                            navigate('home');
                            setPinVal('');
                          }, 300);
                        }
                      }
                    }}
                    className="w-14 h-14 rounded-full bg-slate-900/40 border border-slate-800/40 text-lg font-black transition-all flex items-center justify-center active:bg-slate-700 active:scale-90 active:border-sky-500 shadow-sm"
                  >
                    {num}
                  </button>
                ))}
                
                {/* Backspace */}
                <button
                  onClick={() => {
                    setPinVal(pinVal.slice(0, -1));
                  }}
                  className="w-14 h-14 rounded-full bg-transparent text-slate-500 text-xl font-bold transition-all flex items-center justify-center active:bg-slate-800/50 active:scale-90"
                >
                  ⌫
                </button>

                {/* 0 */}
                <button
                  onClick={() => {
                    if (pinVal.length < 4) {
                      const newVal = pinVal + '0';
                      setPinVal(newVal);
                      if (newVal.length === 4) {
                        setTimeout(() => {
                          navigate('home');
                          setPinVal('');
                        }, 300);
                      }
                    }
                  }}
                  className="w-14 h-14 rounded-full bg-slate-900/40 border border-slate-800/40 text-lg font-black transition-all flex items-center justify-center active:bg-slate-700 active:scale-90 active:border-sky-500 shadow-sm"
                >
                  0
                </button>

                {/* Biometric Icon */}
                <button
                  onClick={() => triggerBiometric('Login with FaceID', () => {
                    navigate('home');
                  })}
                  className="w-14 h-14 rounded-full bg-transparent text-emerald-400 transition-all flex items-center justify-center active:scale-90 active:bg-emerald-500/10"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11a3 3 0 1 0 6 0 3 3 0 0 0-6 0z"/><path d="M17.62 14c2.228-1.572 3.342-2.358 3.342-3.218 0-.86-1.114-1.646-3.342-3.218C15.392 6.002 14.278 5.216 13 5.216c-1.278 0-2.392.786-4.62 2.348C6.152 9.136 5.038 9.922 5.038 10.782c0 .86 1.114 1.646 3.342 3.218 2.228 1.572 3.342 2.358 4.62 2.358 1.278 0 2.392-.786 4.62-2.358z"/></svg>
                </button>
              </div>
            </div>

            <div className="pt-2 text-center space-y-3">
              <div className="flex justify-center items-center">
                <button onClick={() => navigate('verify-otp')} className="text-[10px] text-slate-500 hover:text-slate-400 font-semibold tracking-wide uppercase">Forgot Passcode? Reset Here</button>
              </div>
              <div>
                <span className="inline-flex items-center space-x-1 px-3 py-1 bg-slate-900/60 border border-slate-800/40 rounded-full text-[9px] font-bold text-slate-500 font-mono">
                  <span className="w-1 h-1 rounded-full bg-emerald-500 inline-block animate-pulse" />
                  <span>SECURED • RBI CERTIFIED VAULT LAYER</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      );

    // ==========================================
    // 2. DASHBOARDS (HOME, SECURITY, SCAM)
    // ==========================================
    case 'home':
      if (isHomeLoading) {
        return (
          <div className={`flex flex-col h-full p-4 space-y-4 animate-pulse ${isLightMode ? 'bg-slate-50' : 'bg-slate-950'}`}>
            {/* Header Skeleton */}
            <div className="flex justify-between items-center">
              <div className="space-y-2 text-left">
                <div className="h-3 w-28 bg-slate-800/80 rounded-full" />
                <div className="h-6 w-36 bg-slate-800/80 rounded-lg" />
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-xl bg-slate-800/80" />
                <div className="w-10 h-10 rounded-xl bg-slate-800/80" />
              </div>
            </div>

            {/* Active Shield Skeleton */}
            <div className="p-4 rounded-2xl border border-slate-800/50 bg-slate-900/40 text-left h-28 flex flex-col justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2.5 h-2.5 bg-slate-700 rounded-full" />
                <div className="h-3.5 w-20 bg-slate-700 rounded" />
              </div>
              <div className="space-y-2">
                <div className="h-6 w-48 bg-slate-800/80 rounded" />
                <div className="h-3 w-40 bg-slate-800/50 rounded" />
              </div>
            </div>

            {/* Waste Tracker Skeleton */}
            <div className="p-4 rounded-2xl border border-slate-800/50 bg-slate-900/40 text-left space-y-4">
              <div className="h-3 w-32 bg-slate-800/50 rounded" />
              <div className="flex justify-between items-end">
                <div className="h-8 w-24 bg-slate-800/80 rounded" />
                <div className="h-4 w-12 bg-slate-800/50 rounded" />
              </div>
              <div className="h-3 w-56 bg-slate-800/50 rounded" />
              <div className="h-2 w-full bg-slate-800/20 rounded-full overflow-hidden">
                <div className="bg-slate-800/80 h-full w-2/5 rounded-full" />
              </div>
            </div>

            {/* Smart Nudges Carousel Skeleton */}
            <div className="text-left space-y-2">
              <div className="flex justify-between items-center">
                <div className="h-4 w-24 bg-slate-800/80 rounded" />
                <div className="h-4 w-14 bg-slate-800/50 rounded-full" />
              </div>
              <div className="flex space-x-3 overflow-x-hidden">
                {[1, 2].map((i) => (
                  <div key={i} className="p-4 rounded-2xl border border-slate-800/50 bg-slate-900/40 shrink-0 w-44 space-y-3">
                    <div className="w-8 h-8 rounded-full bg-slate-800/80" />
                    <div className="h-4 w-28 bg-slate-800/80 rounded" />
                    <div className="h-3 w-20 bg-slate-800/50 rounded" />
                    <div className="flex items-center justify-between pt-2">
                      <div className="h-3 w-16 bg-slate-800/50 rounded" />
                      <div className="h-4 w-10 bg-slate-800/80 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity Skeleton */}
            <div className="text-left flex-1 flex flex-col space-y-2">
              <div className="flex justify-between items-center">
                <div className="h-4 w-28 bg-slate-800/80 rounded" />
                <div className="h-4 w-12 bg-slate-800/50 rounded" />
              </div>
              <div className="space-y-2 flex-1">
                {[1, 2].map((i) => (
                  <div key={i} className="p-3 rounded-xl border border-slate-800/50 bg-slate-900/40 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-800/80" />
                      <div className="space-y-1.5 text-left">
                        <div className="h-3 w-24 bg-slate-800/80 rounded" />
                        <div className="h-2.5 w-36 bg-slate-800/50 rounded" />
                      </div>
                    </div>
                    <div className="w-12 h-4 bg-slate-800/80 rounded-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      }

      return (
        <div className={`flex flex-col h-full p-4 space-y-4 ${isLightMode ? 'bg-slate-50 text-gray-900' : 'bg-slate-950 text-white'}`}>
          <div className="flex justify-between items-center">
            <div className="text-left">
              <p className={`text-xs ${textMuted}`}>Good morning, {profile.name ? profile.name.split(' ')[0] : 'Rohan'} 👋</p>
              <div className="flex items-center space-x-1.5 mt-0.5">
                <GuardiaLogo size={20} variant="icon" animated={isShieldActive} />
                <h2 className="text-xl font-bold tracking-tight">Your Shield</h2>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button onClick={() => navigate('notifications')} className={`p-2.5 rounded-xl border relative ${isLightMode ? 'bg-white border-gray-200' : 'bg-slate-900 border-slate-800'}`}>
                <Bell className="w-5 h-5 text-sky-400" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
              </button>
              <button onClick={() => navigate('me-profile')} className="w-10 h-10 rounded-full bg-sky-950 border border-sky-800 flex items-center justify-center overflow-hidden cursor-pointer">
                {profile.photo ? (
                  <img src={profile.photo} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-sky-400 text-sm font-bold">
                    {profile.name ? profile.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase() : 'RS'}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* ACTIVE SHIELD STATE CARD (Redesigned to match reference image) */}
          <div 
            onClick={() => setIsShieldActive(!isShieldActive)}
            className={`p-5 rounded-[24px] border transition-all duration-300 flex items-center space-x-5 text-left cursor-pointer group select-none ${
              isShieldActive 
                ? 'bg-[#1a2325] border-emerald-900/40 shadow-sm' 
                : 'bg-slate-900/60 border-slate-800'
            }`}
          >
            {/* Left Shield Icon with Concentric Circles & Animations */}
            <div className="relative shrink-0 flex items-center justify-center w-16 h-16">
              {isShieldActive ? (
                <>
                  <div className="absolute inset-0 rounded-full bg-[#0a1516] flex items-center justify-center shadow-[0_0_15px_rgba(45,212,191,0.2)]">
                    {/* Outer animated rotating dashed border */}
                    <div className="absolute inset-0 rounded-full border border-dashed border-[#2dd4bf]/20 animate-[spin_10s_linear_infinite]" />
                    <div className="w-[52px] h-[52px] rounded-full border-[1.5px] border-[#153229] flex items-center justify-center relative">
                      {/* Pulsing glow ring */}
                      <div className="absolute inset-0 rounded-full border border-[#2dd4bf]/30 animate-ping opacity-50" />
                      <div className="w-[38px] h-[38px] rounded-full border-[1.5px] border-[#1b4334] flex items-center justify-center bg-[#0d1e18] relative overflow-hidden group">
                        {/* Radar sweep effect inside the innermost circle */}
                        <div className="absolute w-[200%] h-[200%] top-1/2 left-1/2 bg-[conic-gradient(from_0deg_at_50%_50%,rgba(45,212,191,0)_0%,rgba(45,212,191,0.2)_100%)] animate-[spin_3s_linear_infinite] origin-top-left -translate-x-1/2 -translate-y-1/2" />
                        <svg className="relative z-10 animate-pulse drop-shadow-[0_0_8px_rgba(45,212,191,0.8)]" width="18" height="20" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2.5L2 6.5V13.5C2 19.5 6.5 25 12 27C17.5 25 22 19.5 22 13.5V6.5L12 2.5Z" stroke="#2dd4bf" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center border border-slate-800">
                  <ShieldAlert className="w-8 h-8 text-slate-500" />
                </div>
              )}
            </div>

            {/* Right Side Text and Badge */}
            <div className="flex-1 space-y-2 z-10 min-w-0">
              {/* Protected Badge */}
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full border border-emerald-900/50 bg-[#163a2e]/60">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2dd4bf] shadow-[0_0_8px_#2dd4bf]" />
                <span className="text-[10px] font-semibold text-[#2dd4bf] tracking-wide">
                  {isShieldActive ? 'Protected' : 'Paused'}
                </span>
              </div>
              
              {/* Main Title */}
              <h3 className="text-lg font-bold tracking-tight text-white leading-none mt-1">
                {isShieldActive ? 'AI Shield Active' : 'Shield is Paused'}
              </h3>
              
              {/* Subtitle Stats */}
              <p className="text-[11px] leading-tight text-slate-400 font-medium">
                {isShieldActive 
                  ? '5 scams blocked • 0 threats today' 
                  : 'Tap to resume active defense.'}
              </p>
            </div>
          </div>

          {/* WASTE TRACKER BAR */}
          <div className={`p-4 rounded-2xl border text-left ${cardBg}`}>
            <span className={`text-[9px] font-bold tracking-wider uppercase ${textMuted}`}>Monthly Waste Tracker</span>
            <div className="flex justify-between items-end mt-1.5 mb-1">
              <div>
                <span className="text-3xl font-extrabold text-red-500">₹850</span>
                <span className={`text-[10px] font-semibold ml-1.5 ${textMuted}`}>this month</span>
              </div>
              <button onClick={() => navigate('subs-dashboard')} className="flex items-center space-x-1 text-xs text-sky-400 font-semibold hover:underline">
                <span>Fix now</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <span className={`text-xs ${textMuted}`}>wasted on 3 unused subscriptions</span>
            <div className="w-full bg-slate-800/40 border border-slate-800/10 rounded-full h-2 mt-3 overflow-hidden">
              <div className="bg-gradient-to-r from-red-500 to-amber-500 h-2 rounded-full" style={{ width: '45%' }} />
            </div>
          </div>

          {/* DYNAMIC SMART NUDGES CAROUSEL */}
          <div className="text-left">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-semibold tracking-wide">Smart Nudges</h3>
              <span className="text-[10px] bg-sky-500/10 text-sky-400 font-semibold px-2 py-0.5 rounded-full">3 new</span>
            </div>
            <div className="flex space-x-3 overflow-x-auto pb-1 scrollbar-none">
              {/* Priority 1 — Danger: left red border */}
              <div onClick={() => { setSelectedSub(subscriptions[0]); navigate('sub-detail'); }} className={`p-4 rounded-2xl border border-l-4 border-l-red-500 shrink-0 w-44 cursor-pointer hover:border-sky-500/40 transition text-left ${cardBg}`}>
                <span className="text-2xl">🎬</span>
                <h4 className="font-bold text-sm mt-2">Netflix Alert</h4>
                <p className={`text-[10px] ${textMuted} mt-0.5`}>Not used in 47 days</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-[10px] text-emerald-500 font-semibold">Save ₹649/mo</span>
                  <span className="text-[9px] bg-red-500/10 text-red-400 px-1.5 py-0.5 rounded font-semibold">Cancel?</span>
                </div>
              </div>
              {/* Priority 2 — Warning: left amber border */}
              <div onClick={() => navigate('scan-qr')} className={`p-4 rounded-2xl border border-l-4 border-l-amber-500 shrink-0 w-44 cursor-pointer hover:border-sky-500/40 transition text-left ${cardBg}`}>
                <span className="text-2xl">⚠️</span>
                <h4 className="font-bold text-sm mt-2">Scam SMS</h4>
                <p className={`text-[10px] ${textMuted} mt-0.5`}>Urgency phrase detected</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-[10px] text-red-500 font-semibold">High Risk</span>
                  <span className="text-[9px] bg-amber-500/10 text-amber-400 px-1.5 py-0.5 rounded font-semibold">Check →</span>
                </div>
              </div>
            </div>
          </div>

          {/* RECENT SECURE ACTIVITY LIST */}
          <div className="text-left flex-1 flex flex-col min-h-[160px]">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-semibold tracking-wide">Recent Activity</h3>
              <button onClick={() => navigate('activity-log')} className="text-xs text-sky-400 hover:underline">View all</button>
            </div>
            <div className="space-y-2 flex-1 overflow-y-auto">
              {activities.slice(0, 4).map((act) => (
                <div key={act.id} className={`p-3 rounded-xl border flex items-center justify-between ${cardBg}`}>
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${act.status === 'Blocked' ? 'bg-red-500/10 text-red-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                      {act.status === 'Blocked' ? <XCircle className="w-4.5 h-4.5" /> : <CheckCircle2 className="w-4.5 h-4.5" />}
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold">{act.title}</p>
                      <p className={`text-[10px] ${textMuted}`}>{act.description}</p>
                    </div>
                  </div>
                  <span className={`text-[9px] px-2 py-0.5 rounded-full font-semibold ${act.status === 'Blocked' ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                    {act.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case 'analyzing-merchant':
      const getScanLog = (prog: number) => {
        if (prog === 0) return "Initializing secure shield handshake...";
        if (prog <= 25) return "Establishing sandboxed intercept environment...";
        if (prog <= 50) return "Querying offline local fraud database...";
        if (prog <= 75) return "Evaluating dynamic merchant threat metrics...";
        if (prog <= 90) return "Verifying merchant behavioral patterns...";
        return "Finalizing security Threat Assessment report...";
      };

      return (
        <div className="flex flex-col items-center justify-between h-full bg-slate-950 text-white p-5 relative overflow-hidden">
          <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(14,165,233,0.06)_0%,transparent_70%]" />
          
          {/* Top Header info */}
          <div className="pt-6 text-center z-10 w-full">
            <div className="inline-flex items-center space-x-1.5 bg-slate-900 border border-slate-800/80 px-3 py-1 rounded-full text-[10px] font-bold font-mono">
              <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-ping" />
              <span className="text-sky-400 uppercase tracking-wider">On-Device Shield Scan</span>
            </div>
          </div>

          {/* Central Scanning Animation and Text */}
          <div className="flex-1 flex flex-col items-center justify-center relative z-10 space-y-6 w-full px-2">
            <div className="relative w-40 h-40 flex items-center justify-center">
              {/* Outer dotted decorative ring */}
              <div className="absolute inset-[-4px] rounded-full border border-sky-500/10 border-dashed animate-[spin_30s_linear_infinite]" />
              
              {/* Dynamic SVG with clean rings */}
              <svg className="absolute w-full h-full transform -rotate-90">
                <circle cx="80" cy="80" r="70" stroke="#0f172a" strokeWidth="6" fill="transparent" />
                <circle cx="80" cy="80" r="70" stroke="#0ea5e9" strokeWidth="6" fill="transparent"
                  strokeDasharray={440}
                  strokeDashoffset={440 - (440 * analyzingProgress) / 100}
                  className="transition-all duration-300 stroke-linecap-round"
                />
              </svg>
              
              {/* Inner Shield Logo and Progress */}
              <div className="w-28 h-28 rounded-full bg-slate-900 border border-slate-800/80 flex flex-col items-center justify-center shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(14,165,233,0.1)_0%,transparent_60%] animate-pulse" />
                <ShieldCheck className="w-9 h-9 text-sky-400 animate-[pulse_1s_ease-in-out_infinite] relative z-10" />
                <span className="text-base font-black text-white font-mono mt-1 relative z-10">{analyzingProgress}%</span>
              </div>
            </div>

            {/* Explanatory subtitle and dynamic live statement */}
            <div className="space-y-1.5 text-center w-full">
              <h3 className="text-base font-extrabold tracking-tight">Security Audit In Progress</h3>
              <p className="text-[11px] text-sky-400/80 font-semibold font-mono animate-pulse min-h-[16px] px-2 leading-tight">
                {getScanLog(analyzingProgress)}
              </p>
            </div>

            {/* Terminal Live-Check Logs */}
            <div className="w-full bg-slate-950/60 border border-slate-900 rounded-xl p-3 font-mono text-[9px] text-left space-y-1.5 text-slate-400 shadow-inner">
              <div className="flex items-center justify-between text-slate-500 border-b border-slate-900 pb-1.5 mb-1">
                <span>GUARDIA AI ENGINE</span>
                <span>STATUS: RUNNING</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="text-sky-500">→</span>
                <span className={analyzingProgress >= 20 ? 'text-emerald-400 font-bold' : 'text-slate-600'}>
                  [1/4] Sandboxed sandbox initialized {analyzingProgress >= 20 ? '✓' : '...'}
                </span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="text-sky-500">→</span>
                <span className={analyzingProgress >= 50 ? 'text-emerald-400 font-bold' : 'text-slate-600'}>
                  [2/4] Local Fraud DB signature matches {analyzingProgress >= 50 ? '✓' : '...'}
                </span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="text-sky-500">→</span>
                <span className={analyzingProgress >= 80 ? 'text-emerald-400 font-bold' : 'text-slate-600'}>
                  [3/4] Reputation check parsed {analyzingProgress >= 80 ? '✓' : '...'}
                </span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="text-sky-500">→</span>
                <span className={analyzingProgress >= 100 ? 'text-emerald-400 font-bold' : 'text-slate-600'}>
                  [4/4] Threat Assessment report finalized {analyzingProgress >= 100 ? '✓' : '...'}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Simulation controls / Abort Scan */}
          <div className="pb-6 z-10 w-full px-2">
            <button 
              onClick={() => navigate('home')} 
              className="w-full py-4 bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 hover:border-red-500/50 rounded-xl text-xs text-red-400 font-bold transition flex items-center justify-center space-x-2 active:scale-[0.98]"
            >
              <XCircle className="w-4 h-4" />
              <span>Abort Security Scan</span>
            </button>
          </div>
        </div>
      );

    case 'merchant-verified':
      return (
        <div className="flex flex-col h-full bg-slate-950 text-white p-5 justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-radial-[circle_at_top,rgba(16,185,129,0.05)_0%,transparent_60%] pointer-events-none" />
          
          <div className="space-y-5 z-10">
            {/* Header */}
            <div className="flex justify-between items-center pt-2">
              <button onClick={() => navigate('home')} className="p-2 -ml-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-850 transition">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full uppercase font-bold tracking-wider animate-pulse">
                ✓ VERIFIED SAFE — SECURE PAY
              </span>
              <div className="w-8" />
            </div>

            {/* Centered Safe Trust Ring */}
            <div className="flex flex-col items-center py-4 text-center space-y-4">
              <div className="relative w-32 h-32 flex items-center justify-center">
                {/* Glowing decorative rings */}
                <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-xl animate-pulse" />
                <div className="absolute inset-2 border border-emerald-500/15 rounded-full" />
                <div className="absolute inset-4 border border-dashed border-emerald-500/25 rounded-full animate-[spin_30s_linear_infinite]" />
                
                <svg className="absolute w-full h-full transform -rotate-90" viewBox="0 0 128 128">
                  {/* Clean base track */}
                  <circle cx="64" cy="64" r="52" stroke="#1e293b" strokeWidth="6" fill="transparent" />
                  {/* Mathematical progress arc */}
                  <motion.circle 
                    cx="64" 
                    cy="64" 
                    r="52" 
                    stroke="#10b981" 
                    strokeWidth="6" 
                    fill="transparent" 
                    strokeDasharray={326.7} 
                    initial={{ strokeDashoffset: 326.7 }}
                    animate={{ strokeDashoffset: 326.7 - (326.7 * 96) / 100 }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                    strokeLinecap="round"
                    className="drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-3xl font-black text-emerald-400 font-sans tracking-tight">96</span>
                  <span className="text-[9px] text-emerald-500/80 font-mono font-bold tracking-widest uppercase">TRUST</span>
                </div>
              </div>
              
              <div className="space-y-1">
                <h3 className="text-2xl font-black tracking-tight text-white flex items-center justify-center space-x-1.5">
                  <span>Swiggy Instacart</span>
                  <span className="p-0.5 bg-emerald-500 text-white rounded-full flex items-center justify-center">
                    <Check className="w-3.5 h-3.5" strokeWidth={3} />
                  </span>
                </h3>
                <p className="text-xs text-slate-400">Official Partner Merchant • Verified since 2019</p>
              </div>
            </div>

            {/* Trust Certification Checklist */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="grid grid-cols-3 gap-1.5"
            >
              {[
                { title: 'UPI Crypt', desc: 'Secure Handshake' },
                { title: 'Reputation', desc: '99% Clean rate' },
                { title: 'Anti-Spoof', desc: 'Verified Payload' }
              ].map((pill, idx) => (
                <div key={idx} className="p-2.5 bg-emerald-500/5 border border-emerald-500/10 rounded-xl text-center">
                  <p className="text-[11px] font-black text-emerald-400 leading-none">✓ {pill.title}</p>
                  <p className="text-[9px] text-slate-400 mt-1">{pill.desc}</p>
                </div>
              ))}
            </motion.div>

            {/* High-fidelity Receipt Slip design */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 100, damping: 15 }}
              className="bg-slate-900 border border-slate-800/80 rounded-2xl relative overflow-hidden"
            >
              {/* Receipt decorative barcode/mesh on the top */}
              <div className="h-1 w-full bg-gradient-to-r from-emerald-500/30 via-teal-500/30 to-emerald-500/30" />
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-slate-800/60">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Payment Details</span>
                  <span className="text-[9px] font-mono text-slate-500 uppercase">TXID: #847291</span>
                </div>
                <div className="space-y-2 text-xs text-left">
                  <div className="flex justify-between py-0.5">
                    <span className="text-slate-500">Merchant Name</span>
                    <span className="font-semibold text-white">Swiggy Instacart Pvt Ltd</span>
                  </div>
                  <div className="flex justify-between py-0.5">
                    <span className="text-slate-500">UPI VPA Link</span>
                    <span className="font-mono text-slate-300">swiggy@hdfcbank</span>
                  </div>
                  <div className="flex justify-between py-0.5">
                    <span className="text-slate-500">Order Amount</span>
                    <span className="font-bold text-white">₹342.00</span>
                  </div>
                  <div className="flex justify-between py-0.5">
                    <span className="text-slate-500">Security Audit Fee</span>
                    <span className="text-emerald-400 font-bold">₹0.00 (Waived)</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Secure Payment Actions */}
          <div className="space-y-2.5 pb-4 z-10">
            <button onClick={() => navigate('receipt-dark')} className="w-full py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-bold rounded-2xl shadow-lg shadow-emerald-500/10 active:scale-[0.98] transition flex items-center justify-center space-x-2">
              <ShieldCheck className="w-4.5 h-4.5" />
              <span>Pay ₹342 Securely via GPay</span>
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => navigate('receipt-dark')} className="py-3 bg-slate-900 border border-slate-800 hover:border-slate-700 text-white text-xs font-semibold rounded-2xl transition">
                PhonePe
              </button>
              <button onClick={() => navigate('receipt-dark')} className="py-3 bg-slate-900 border border-slate-800 hover:border-slate-700 text-white text-xs font-semibold rounded-2xl transition">
                Paytm UPI
              </button>
            </div>
          </div>
        </div>
      );

    case 'scam-detected':
      return (
        <div className="flex flex-col h-full bg-slate-950 text-white p-5 justify-between relative overflow-hidden">
          {/* Intense red gradient and scanning grid patterns */}
          <div className="absolute inset-0 bg-radial-[circle_at_top,rgba(239,68,68,0.15)_0%,transparent_60%] pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
          
          <div className="space-y-5 z-10">
            {/* Header */}
            <div className="flex justify-between items-center pt-2">
              <button onClick={() => navigate('home')} className="p-2 -ml-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-850 transition">
                <Home className="w-4 h-4 text-slate-400" />
              </button>
              <span className="text-[10px] font-mono text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-1 rounded-full uppercase font-black tracking-widest animate-pulse">
                ⚠️ BLOCK RISK CRITICAL
              </span>
              <button onClick={() => navigate('scan-qr')} className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-850 transition">
                <Scan className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {/* Completely unique Crimson Octagon Hazard Badge (No Circles!) */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              className="flex flex-col items-center py-4 text-center space-y-4"
            >
              <div className="relative w-32 h-32 flex items-center justify-center">
                {/* Intense glowing crimson background */}
                <div className="absolute inset-0 bg-red-500/15 rounded-full blur-xl animate-pulse" />
                
                {/* Tactical radar/bracket lines */}
                <div className="absolute inset-0 border border-red-500/5 rounded-full" />
                <div className="absolute left-0 right-0 h-[1px] bg-red-500/10" />
                <div className="absolute top-0 bottom-0 w-[1px] bg-red-500/10" />
                
                {/* Glowing octagon frame */}
                <svg className="absolute w-full h-full transform" viewBox="0 0 128 128">
                  {/* Flashing danger outer octagon */}
                  <polygon 
                    points="38,12 90,12 116,38 116,90 90,116 38,116 12,90 12,38" 
                    fill="rgba(239,68,68,0.05)" 
                    stroke="#ef4444" 
                    strokeWidth="5" 
                    strokeLinejoin="round"
                    className="animate-pulse drop-shadow-[0_0_12px_rgba(239,68,68,0.75)]"
                  />
                  {/* Inner dashed warning octagon */}
                  <polygon 
                    points="42,18 86,18 110,42 110,86 86,110 42,110 18,86 18,42" 
                    fill="transparent" 
                    stroke="#991b1b" 
                    strokeWidth="2" 
                    strokeLinejoin="round"
                    strokeDasharray="4 4"
                  />
                </svg>
                
                {/* Stark danger symbol and active threat classification */}
                <div className="absolute flex flex-col items-center justify-center space-y-0.5">
                  <ShieldAlert className="w-10 h-10 text-red-500 animate-[bounce_0.5s_infinite]" />
                  <span className="text-[10px] text-red-400 font-mono font-black tracking-widest uppercase">98% RISK</span>
                </div>
              </div>
              
              <div className="space-y-1">
                <h3 className="text-2xl font-black text-red-500 tracking-tight">Scam Detected</h3>
                <p className="text-xs text-slate-400 px-4 leading-normal">
                  UPI request matches known active phishing parameters.
                </p>
              </div>

              {/* Segmented LED Threat Level Meter */}
              <div className="w-full bg-slate-900 border border-red-500/20 rounded-xl p-3 flex items-center justify-between text-left space-x-3">
                <div className="space-y-0.5">
                  <p className="text-[9px] uppercase font-bold tracking-wider text-slate-500">Threat Severity</p>
                  <p className="text-sm font-black text-red-500 font-mono">
                    98% <span className="text-[10px] font-normal text-slate-400 ml-1">(Extreme Risk)</span>
                  </p>
                </div>
                {/* Horizontal flashing LED segments */}
                <div className="flex space-x-1.5">
                  {[...Array(8)].map((_, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0.2 }}
                      animate={{ opacity: i < 8 ? 1 : 0.2 }}
                      transition={{ delay: 0.5 + (i * 0.1) }}
                      className={`w-1.5 h-6 rounded-sm transition-all duration-300 ${
                        i < 8 
                          ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.85)] animate-pulse' 
                          : 'bg-slate-800'
                      }`} 
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Explicit Heuristics Breach Checklist */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.4 }}
              className="bg-red-500/5 border border-red-500/10 rounded-2xl p-4 text-left space-y-3"
            >
              <h4 className="text-[10px] font-bold text-red-400 uppercase tracking-widest">Heuristic Violations Triggered</h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center py-1 border-b border-red-500/10">
                  <span className="text-slate-400">High Request Velocity</span>
                  <span className="text-red-400 font-black font-mono bg-red-500/10 px-2 py-0.5 rounded text-[10px]">🚨 47 times/hr</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-red-500/10">
                  <span className="text-slate-400">Payee Account State</span>
                  <span className="text-red-400 font-black font-mono bg-red-500/10 px-2 py-0.5 rounded text-[10px]">Unverified VPA</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-red-500/10">
                  <span className="text-slate-400">Requested Amount</span>
                  <span className="text-slate-200 font-black font-mono">₹8,500.00</span>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="text-slate-400">Scam Category Tag</span>
                  <span className="text-amber-500 font-bold uppercase text-[10px]">UPI Collect Spoof</span>
                </div>
              </div>
            </motion.div>

            {/* Security Caution Notice */}
            <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl flex space-x-3 items-start text-left">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-[11px] text-slate-400 leading-normal">
                <strong className="text-white font-semibold">Guardia Advice:</strong> Phishing entities send bulk UPI collect requests expecting instant clicks. Official merchants never request money this way.
              </p>
            </div>
          </div>

          {/* Aggressive Threat Intervention Buttons */}
          <div className="space-y-2.5 pb-4 z-10 w-full px-2">
            <button 
              onClick={() => {
                setActivities(prev => [
                  { 
                    id: 'act-reported-' + Date.now(), 
                    title: 'Reported Phishing Payee', 
                    description: 'Blocked ₹8,500 unverified VPA payload', 
                    time: 'Just now', 
                    status: 'Blocked' 
                  },
                  ...prev
                ]);
                navigate('home');
              }} 
              className="w-full py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-2xl shadow-[0_0_20px_rgba(239,68,68,0.3)] active:scale-[0.98] transition flex items-center justify-center space-x-2"
            >
              <ShieldAlert className="w-5 h-5" />
              <span>Block Request & Return Safe</span>
            </button>
            <button 
              onClick={() => navigate('merchant-verified')} 
              className="w-full py-3 bg-transparent text-slate-400 hover:text-slate-300 text-xs font-bold transition"
            >
              Bypass Security (Highly Unsafe)
            </button>
          </div>
        </div>
      );

    case 'receipt-light':
    case 'receipt-dark':
      const isReceiptLight = false;
      return (
        <div className={`flex flex-col h-full justify-between p-6 relative overflow-hidden transition-all ${isReceiptLight ? 'bg-emerald-50/70 text-gray-900' : 'bg-slate-950 text-white'}`}>
          <div className="absolute inset-0 bg-radial-[circle_at_top,rgba(16,185,129,0.08)_0%,transparent_60%]" />
          <div className="flex-1 flex flex-col justify-center items-center space-y-6 z-10">
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.1 }}
              className={`w-20 h-20 rounded-full flex items-center justify-center border-2 shadow-lg transition-all ${isReceiptLight ? 'bg-emerald-500 border-emerald-400 text-white shadow-emerald-500/10' : 'bg-emerald-950/80 border-emerald-500/50 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.2)]'}`}
            >
              <Check className="w-10 h-10" strokeWidth={3} />
            </motion.div>

            <div className="text-center space-y-2">
              <p className={`text-xs uppercase font-bold tracking-widest ${isReceiptLight ? 'text-emerald-700' : 'text-emerald-400'}`}>Paid successfully</p>
              <h2 className="text-5xl font-extrabold tracking-tight">₹342</h2>
              <div className="pt-2">
                <p className="font-bold text-lg">Swiggy Instacart</p>
                <div className="flex items-center justify-center space-x-1.5 mt-1 text-xs">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block" />
                  <span className={`${isReceiptLight ? 'text-emerald-800 font-semibold' : 'text-emerald-400 font-medium'}`}>Verified Merchant</span>
                </div>
              </div>
            </div>

            <div className="inline-flex items-center space-x-1 px-3 py-1 rounded-full border text-xs font-semibold bg-emerald-500/10 border-emerald-500/20 text-emerald-500">
              Trust Score: 96/100 — Safe ✓
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.4 }}
              className={`w-full max-w-sm rounded-2xl border p-4 text-left space-y-3 text-xs ${isReceiptLight ? 'bg-white border-emerald-200/50 text-gray-900 shadow-sm' : 'bg-slate-900 border-slate-800'}`}
            >
              <div className="flex justify-between py-1 border-b border-slate-800/10">
                <span className={`${isReceiptLight ? 'text-gray-500' : 'text-slate-400'}`}>Transaction ID</span>
                <span className="font-mono font-bold">#TXN847291</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/10">
                <span className={`${isReceiptLight ? 'text-gray-500' : 'text-slate-400'}`}>Time</span>
                <span className="font-semibold">3 Jul 2026, 10:32 AM</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className={`${isReceiptLight ? 'text-gray-500' : 'text-slate-400'}`}>Method</span>
                <span className="font-bold">GPay • UPI</span>
              </div>
            </motion.div>

            <p className={`text-xs ${isReceiptLight ? 'text-emerald-800' : 'text-emerald-500'} font-medium`}>
              You&apos;ve made <strong className="font-bold text-lg font-mono">12 safe transactions</strong> this month 🎉
            </p>
          </div>

          <div className="space-y-3 z-10 pb-4">
            <button onClick={() => navigate('your-win')} className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center space-x-2 transition ${isReceiptLight ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800 border border-emerald-200' : 'bg-slate-900 hover:bg-slate-850 text-white border border-slate-800'}`}>
              <Share2 className="w-4 h-4" />
              <span>Share Receipt</span>
            </button>
            <button onClick={() => navigate('home')} className="w-full py-4 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-2xl transition active:scale-[0.98]">
              Go Home
            </button>
          </div>
        </div>
      );

    // ==========================================
    // 3. SUBSCRIPTIONS MANAGEMENT FLOW
    // ==========================================
    case 'subs-dashboard':
      if (isSubsLoading) {
        return (
          <div className="flex flex-col h-full p-4 space-y-4 bg-slate-950 text-white animate-pulse">
            {/* Header Skeleton */}
            <div className="flex justify-between items-center text-left">
              <div>
                <div className="h-2 w-24 bg-slate-800 rounded-full mb-2" />
                <div className="h-6 w-32 bg-slate-800 rounded-lg" />
              </div>
              <div className="text-right space-y-2">
                <div className="h-2 w-20 bg-slate-800 rounded-full ml-auto" />
                <div className="h-5 w-16 bg-slate-800/80 rounded-full" />
              </div>
            </div>

            {/* Tab Control Skeleton */}
            <div className="p-1 rounded-2xl bg-slate-900 border border-slate-800 flex space-x-1">
              <div className="flex-1 py-4 bg-slate-850 rounded-xl" />
              <div className="flex-1 py-4 bg-transparent rounded-xl" />
            </div>

            {/* Spend Map Card Skeleton */}
            <div className="p-4 rounded-2xl border border-slate-800/60 bg-slate-900/40 text-left space-y-4">
              <div className="h-2 w-28 bg-slate-800 rounded-full" />
              <div className="flex items-center space-x-6">
                {/* Circular chart skeleton */}
                <div className="w-20 h-20 rounded-full border-[7px] border-slate-850 flex items-center justify-center shrink-0">
                  <div className="w-6 h-6 rounded-full bg-slate-850/60" />
                </div>
                {/* Legend Skeletons */}
                <div className="flex-1 space-y-2.5">
                  <div className="flex justify-between">
                    <div className="h-2.5 w-16 bg-slate-800 rounded" />
                    <div className="h-2.5 w-8 bg-slate-800 rounded" />
                  </div>
                  <div className="flex justify-between">
                    <div className="h-2.5 w-16 bg-slate-800 rounded" />
                    <div className="h-2.5 w-8 bg-slate-800 rounded" />
                  </div>
                  <div className="flex justify-between">
                    <div className="h-2.5 w-16 bg-slate-800 rounded" />
                    <div className="h-2.5 w-8 bg-slate-800 rounded" />
                  </div>
                </div>
              </div>
            </div>

            {/* Active Subscriptions List Skeleton */}
            <div className="text-left flex-1 flex flex-col space-y-2">
              <div className="h-2.5 w-32 bg-slate-850 rounded mb-1" />
              <div className="space-y-2 flex-1 overflow-hidden">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-3.5 rounded-2xl border border-slate-900 bg-slate-900/20 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-xl bg-slate-800/80" />
                      <div className="space-y-2">
                        <div className="h-3.5 w-32 bg-slate-800 rounded" />
                        <div className="h-2.5 w-24 bg-slate-800/50 rounded" />
                      </div>
                    </div>
                    <div className="text-right space-y-1.5">
                      <div className="h-3.5 w-12 bg-slate-800 rounded ml-auto" />
                      <div className="h-2 w-8 bg-slate-800/50 rounded ml-auto" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      }

      const familySubscriptions: Subscription[] = [
        { id: 'netflix-family', name: 'Netflix Premium (Papa)', category: 'OTT', cost: 649, billingCycle: 'monthly', renewDate: 'in 3 days', usedDaysAgo: 18, usagePercentage: 8, status: 'Active', isUnused: true, alert: 'Papa hasn’t logged in since 18 days. Save ₹649 by downgrading.', icon: '🍿' },
        { id: 'spotify-family', name: 'Spotify Family (Sister)', category: 'Music', cost: 179, billingCycle: 'monthly', renewDate: 'in 12 days', usedDaysAgo: 0, usagePercentage: 94, status: 'Active', isUnused: false, alert: 'Highly utilized by Sister this week.', icon: '🎵' },
        { id: 'icloud-family', name: 'iCloud+ 2TB (Everyone)', category: 'SaaS', cost: 749, billingCycle: 'monthly', renewDate: 'in 19 days', usedDaysAgo: 0, usagePercentage: 65, status: 'Active', isUnused: false, alert: 'Shared storage is 85% full.', icon: '☁️' },
        { id: 'youtube-family', name: 'YouTube Premium (Brother)', category: 'OTT', cost: 189, billingCycle: 'monthly', renewDate: 'in 15 days', usedDaysAgo: 1, usagePercentage: 82, status: 'Active', isUnused: false, alert: 'Used daily by Brother.', icon: '📺' },
        { id: 'hotstar-family', name: 'Disney+ Hotstar (Mother)', category: 'OTT', cost: 299, billingCycle: 'monthly', renewDate: 'in 21 days', usedDaysAgo: 30, usagePercentage: 11, status: 'Active', isUnused: true, alert: 'Zero hours watched in the last 30 days.', icon: '🎬' }
      ];
      const currentDisplayedSubs = activeSpendsTab === 'my' ? subscriptions : familySubscriptions;

      return (
        <div className="flex flex-col h-full p-4 space-y-4 bg-slate-950 text-white">
          <div className="flex justify-between items-center text-left">
            <div>
              <span className="text-[9px] font-extrabold tracking-widest text-slate-500 uppercase font-mono">SUBSCRIPTION GUARD</span>
              <h2 className="text-xl font-black tracking-tight mt-0.5">Subscriptions</h2>
            </div>
            <div className="text-right">
              <span className="text-[9px] font-extrabold tracking-widest text-slate-500 uppercase font-mono block">MONTHLY BURN</span>
              <span className="text-sm bg-red-950/40 text-red-400 border border-red-500/15 px-2.5 py-0.5 rounded-full font-black font-mono inline-block mt-0.5">
                ₹{activeSpendsTab === 'my' ? '6,465' : '2,065'}
              </span>
            </div>
          </div>

          {/* Premium Segmented Controls Tab Toggle */}
          <div className="p-1 rounded-2xl bg-slate-900/90 border border-slate-800/60 flex space-x-1 relative">
            <button 
              onClick={() => setActiveSpendsTab('my')}
              className={`relative z-10 flex-1 py-2 text-xs font-bold rounded-xl transition duration-300 ${activeSpendsTab === 'my' ? 'text-white' : 'text-slate-400 hover:text-white'}`}
            >
              My Spends
              {activeSpendsTab === 'my' && (
                <motion.div layoutId="activeTab" className="absolute inset-0 bg-sky-500 rounded-xl shadow-md shadow-sky-500/10 -z-10" />
              )}
            </button>
            <button 
              onClick={() => setActiveSpendsTab('family')}
              className={`relative z-10 flex-1 py-2 text-xs font-bold rounded-xl transition duration-300 ${activeSpendsTab === 'family' ? 'text-white' : 'text-slate-400 hover:text-white'}`}
            >
              Family Spends
              {activeSpendsTab === 'family' && (
                <motion.div layoutId="activeTab" className="absolute inset-0 bg-sky-500 rounded-xl shadow-md shadow-sky-500/10 -z-10" />
              )}
            </button>
          </div>

          {/* SPEND MAP card with circular SVG donut layout */}
          <div className="p-4 rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/60 to-slate-950/80 text-left relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/5 rounded-full blur-2xl pointer-events-none" />
            <span className="text-[9px] font-extrabold tracking-wider uppercase text-slate-500 font-mono">Category Allocation</span>
            
            <div className="flex items-center space-x-6 mt-3 relative z-10">
              {/* Dynamic circular SVG donut chart */}
              <motion.div 
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                className="relative w-20 h-20 flex items-center justify-center shrink-0"
              >
                {activeSpendsTab === 'my' ? (
                  <>
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 80 80">
                      <circle cx="40" cy="40" r="28" stroke="#1e293b" strokeWidth="7" fill="transparent" />
                      <circle cx="40" cy="40" r="28" stroke="#38bdf8" strokeWidth="7" fill="transparent" strokeDasharray="175.9" strokeDashoffset="0" />
                      <circle cx="40" cy="40" r="28" stroke="#f59e0b" strokeWidth="7" fill="transparent" strokeDasharray="175.9" strokeDashoffset="-61.5" />
                      <circle cx="40" cy="40" r="28" stroke="#22c55e" strokeWidth="7" fill="transparent" strokeDasharray="175.9" strokeDashoffset="-128.3" />
                      <circle cx="40" cy="40" r="28" stroke="#a855f7" strokeWidth="7" fill="transparent" strokeDasharray="175.9" strokeDashoffset="-145.9" />
                      <circle cx="40" cy="40" r="28" stroke="#ef4444" strokeWidth="7" fill="transparent" strokeDasharray="175.9" strokeDashoffset="-167.0" />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span className="text-[8px] font-extrabold text-slate-500 font-mono leading-none uppercase">Total</span>
                      <span className="text-xs font-black text-white font-mono mt-0.5">₹6.4k</span>
                    </div>
                  </>
                ) : (
                  <>
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 80 80">
                      <circle cx="40" cy="40" r="28" stroke="#1e293b" strokeWidth="7" fill="transparent" />
                      <circle cx="40" cy="40" r="28" stroke="#38bdf8" strokeWidth="7" fill="transparent" strokeDasharray="175.9" strokeDashoffset="0" />
                      <circle cx="40" cy="40" r="28" stroke="#f59e0b" strokeWidth="7" fill="transparent" strokeDasharray="175.9" strokeDashoffset="-96.7" />
                      <circle cx="40" cy="40" r="28" stroke="#22c55e" strokeWidth="7" fill="transparent" strokeDasharray="175.9" strokeDashoffset="-160.1" />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span className="text-[8px] font-extrabold text-slate-500 font-mono leading-none uppercase">Total</span>
                      <span className="text-xs font-black text-white font-mono mt-0.5">₹2.0k</span>
                    </div>
                  </>
                )}
              </motion.div>

              {/* Legend with matching mockup layout */}
              <div className="flex-1 space-y-1.5 text-[10px] font-bold">
                {activeSpendsTab === 'my' ? (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1.5 text-slate-400">
                        <span className="w-2 h-2 rounded bg-sky-500 shrink-0" />
                        <span>OTT</span>
                      </div>
                      <span className="font-mono text-white">35%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1.5 text-slate-400">
                        <span className="w-2 h-2 rounded bg-amber-500 shrink-0" />
                        <span>SaaS</span>
                      </div>
                      <span className="font-mono text-white">38%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1.5 text-slate-400">
                        <span className="w-2 h-2 rounded bg-emerald-500 shrink-0" />
                        <span>Music</span>
                      </div>
                      <span className="font-mono text-white">10%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1.5 text-slate-400">
                        <span className="w-2 h-2 rounded bg-purple-500 shrink-0" />
                        <span>Wellness</span>
                      </div>
                      <span className="font-mono text-white">12%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1.5 text-slate-400">
                        <span className="w-2 h-2 rounded bg-red-500 shrink-0" />
                        <span>Unused App</span>
                      </div>
                      <span className="font-mono text-white">5%</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1.5 text-slate-400">
                        <span className="w-2 h-2 rounded bg-sky-500 shrink-0" />
                        <span>OTT (Papa/Mom/Bro)</span>
                      </div>
                      <span className="font-mono text-white">55%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1.5 text-slate-400">
                        <span className="w-2 h-2 rounded bg-amber-500 shrink-0" />
                        <span>SaaS (Everyone)</span>
                      </div>
                      <span className="font-mono text-white">36%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1.5 text-slate-400">
                        <span className="w-2 h-2 rounded bg-emerald-500 shrink-0" />
                        <span>Music (Sister)</span>
                      </div>
                      <span className="font-mono text-white">9%</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="text-left flex-1 flex flex-col min-h-[220px]">
            <h3 className="text-[10px] font-bold tracking-wider uppercase text-slate-500 mb-2">Active Subscriptions</h3>
            <div className="space-y-2 flex-1 overflow-y-auto">
              {currentDisplayedSubs.map((sub) => {
                const isNetflix = sub.id.startsWith('netflix');
                const isUnknown = sub.id === 'unknown-app';

                // Color-code usage metrics
                const isCritical = sub.usagePercentage < 15;
                const isModerate = sub.usagePercentage >= 15 && sub.usagePercentage < 60;
                const progressColor = isCritical ? 'bg-red-500' : isModerate ? 'bg-amber-500' : 'bg-emerald-500';
                const textColor = isCritical ? 'text-red-400' : isModerate ? 'text-amber-400' : 'text-emerald-400';
                const statusLabel = isCritical ? 'Critical: Unused Trial' : isModerate ? 'Moderate Usage' : 'Highly Utilized';

                return (
                  <motion.div
                    key={sub.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    onClick={() => { setSelectedSub(sub); navigate('sub-detail'); }}
                    className="p-3.5 rounded-2xl border border-slate-800 bg-slate-900/30 flex flex-col cursor-pointer hover:border-sky-500/40 transition duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 text-left">
                        {/* Icon Box */}
                        {getSubscriptionLogo(sub.id, sub.name, "w-12 h-12")}
                        <div>
                          <div className="flex items-center space-x-2">
                            <p className="text-sm font-extrabold text-white">{sub.name}</p>
                            {isNetflix && (
                              <span className="bg-red-500/10 text-red-400 text-[8px] font-black px-1.5 py-0.5 rounded border border-red-500/10 uppercase">Critical Waste</span>
                            )}
                            {isUnknown && (
                              <span className="bg-amber-500/10 text-amber-500 text-[8px] font-black px-1.5 py-0.5 rounded border border-amber-500/10 uppercase">
                                Unknown Bill
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-slate-500 mt-0.5">Renews {sub.renewDate} • {sub.category}</p>
                        </div>
                      </div>
                      <div className="text-right flex items-center space-x-1.5">
                        <div className="text-right">
                          <p className="text-sm font-extrabold font-mono text-white">₹{sub.cost}</p>
                          <p className="text-[8px] uppercase text-slate-500 font-bold">/mo</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-600" />
                      </div>
                    </div>

                    {/* Highly polished usage visualizer on all cards */}
                    <div className="mt-3 flex items-center space-x-3 text-[10px]">
                      <div className="flex-1 bg-slate-800/40 border border-slate-800/10 rounded-full h-1.5 overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${sub.usagePercentage}%` }}
                          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                          className={`${progressColor} h-1.5 rounded-full`} 
                        />
                      </div>
                      <span className={`${textColor} shrink-0 font-bold text-[9px] uppercase font-mono`}>
                        {statusLabel} ({sub.usagePercentage}%)
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      );

    case 'sub-detail':
      if (!selectedSub) return null;
      return (
        <div className="flex flex-col h-full bg-slate-950 text-white p-4 justify-between relative overflow-hidden">
          <div className="space-y-5">
            <div className="flex justify-between items-center pt-2">
              <button onClick={() => navigate('subs-dashboard')} className="p-2 -ml-2 rounded-xl bg-slate-900 border border-slate-800">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <span className="text-sm font-bold">Details</span>
              <div className="w-8" />
            </div>

            <div className="flex items-center space-x-4 text-left">
              {getSubscriptionLogo(selectedSub.id, selectedSub.name, "w-16 h-16 rounded-2xl")}
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-2xl font-bold tracking-tight">{selectedSub.name}</h3>
                  <span className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase ${selectedSub.status === 'Cancelled' ? 'bg-red-500/10 text-red-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                    {selectedSub.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">Renews {selectedSub.renewDate}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-left">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="p-4 bg-slate-900 border border-slate-800/80 rounded-2xl"
              >
                <span className="text-[9px] text-slate-500 block font-bold uppercase tracking-wide">Monthly Cost</span>
                <span className="text-2xl font-black font-mono text-white mt-1 block">₹{selectedSub.cost}</span>
                <span className="text-[10px] text-slate-500">per month</span>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-4 bg-slate-900 border border-slate-800/80 rounded-2xl"
              >
                <span className="text-[9px] text-slate-500 block font-bold uppercase tracking-wide">Annual Burn</span>
                <span className="text-2xl font-black font-mono text-red-500 mt-1 block">₹{selectedSub.cost * 12}</span>
                <span className="text-[10px] text-slate-500">this year</span>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-slate-900 border border-slate-800/80 rounded-2xl p-4 text-left space-y-3"
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">Usage this month</span>
                <span className="text-[10px] bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded font-bold uppercase">Very low</span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800/40">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${selectedSub.usagePercentage}%` }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                  className="bg-gradient-to-r from-red-500 to-amber-500 h-2 rounded-full" 
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 pt-0.5">
                <span>Last opened 47 days ago</span>
                <span className="font-bold text-white">{selectedSub.usagePercentage}% usage</span>
              </div>
            </motion.div>

            {selectedSub.alert && (
              <div className="bg-sky-500/5 border border-sky-500/20 rounded-2xl p-4 text-left">
                <div className="flex items-center space-x-1.5 mb-1.5 text-sky-400">
                  <ShieldCheck className="w-4.5 h-4.5" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">AI Security Insight</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">{selectedSub.alert}</p>
              </div>
            )}
          </div>

          <div className="space-y-3 pb-4">
            {selectedSub.status !== 'Cancelled' ? (
              <>
                <div className="p-3 bg-amber-500/5 border border-amber-500/20 rounded-xl flex space-x-2.5 items-start text-left mb-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-slate-400">You&apos;ll be charged ₹{selectedSub.cost} {selectedSub.renewDate}. Cancel now via our on-device assistant to avoid it.</p>
                </div>

                {/* SWIPE TO CANCEL BAR */}
                <div
                  onMouseMove={handleSlideCancelMove}
                  onTouchMove={handleSlideCancelMove}
                  onMouseUp={handleSlideCancelEnd}
                  onTouchEnd={handleSlideCancelEnd}
                  className="relative h-14 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center overflow-hidden cursor-pointer"
                >
                  <div
                    className="absolute left-0 top-0 bottom-0 bg-red-600/20 transition-all"
                    style={{ width: `${slideCancelProgress}%` }}
                  />
                  <span className="relative z-10 text-xs font-bold text-slate-400 select-none pointer-events-none">
                    Slide to cancel {selectedSub.name}
                  </span>
                  <div
                    onMouseDown={handleSlideCancel}
                    onTouchStart={handleSlideCancel}
                    className="absolute left-1.5 top-1.5 w-11 h-11 bg-red-600 hover:bg-red-500 text-white rounded-xl flex items-center justify-center transition-transform duration-75 active:scale-95 shadow-md shadow-red-600/10 cursor-grab"
                    style={{ transform: `translateX(${Math.max(0, slideCancelProgress * 2.8)}px)` }}
                  >
                    <ChevronRight className="w-5 h-5 animate-pulse text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSubscriptions(prev => prev.map(s => s.id === selectedSub.id ? { ...s, status: 'Paused' } : s));
                    navigate('subs-dashboard');
                  }}
                  className="w-full py-4 bg-slate-900/60 border border-slate-800 hover:bg-slate-900 text-white font-semibold rounded-2xl transition"
                >
                  Pause for 1 Month
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setSubscriptions(prev => prev.map(s => s.id === selectedSub.id ? { ...s, status: 'Active' } : s));
                  navigate('subs-dashboard');
                }}
                className="w-full py-4 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-2xl transition active:scale-[0.98]"
              >
                Reactive Subscription
              </button>
            )}
          </div>
        </div>
      );

    case 'cancel-success':
      return (
        <div className="flex flex-col h-full bg-slate-950 text-white p-6 justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-radial-[circle_at_top,rgba(16,185,129,0.1)_0%,transparent_60%]" />
          <div className="flex-1 flex flex-col justify-center items-center text-center space-y-6 z-10">
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              className="w-20 h-20 rounded-full bg-emerald-950/80 border-2 border-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/10"
            >
              <Check className="w-10 h-10 text-emerald-400" />
            </motion.div>
            <div className="space-y-2">
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xs uppercase font-extrabold tracking-wider text-emerald-400"
              >
                Done! You saved
              </motion.p>
              <motion.h2 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 150, delay: 0.3 }}
                className="text-5xl font-black text-emerald-400"
              >
                ₹649
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-sm text-slate-400 font-semibold"
              >
                this month
              </motion.p>
            </div>
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-lg font-bold text-slate-200"
            >
              ₹7,788 saved this year 🥳
            </motion.h3>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 text-left"
            >
              <div className="flex items-center space-x-1.5 text-sky-400 mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">AI Insight</span>
              </div>
              <p className="text-xs text-slate-300 leading-normal">
                2 more unused apps detected. Review them to unlock potentially ₹1,100/mo more in monthly budget.
              </p>
              <button onClick={() => navigate('subs-dashboard')} className="text-[10px] text-sky-400 font-bold hover:underline mt-2 inline-block">
                Review them →
              </button>
            </motion.div>
          </div>

          <div className="space-y-4 z-10 pb-4">
            <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl flex items-center justify-between">
              <span className="text-xs text-slate-400">Netflix cancelled successfully</span>
              <button
                onClick={() => {
                  if (selectedSub) {
                    setSubscriptions(prev => prev.map(s => s.id === selectedSub.id ? { ...s, status: 'Active' } : s));
                  }
                  navigate('sub-detail');
                }}
                className="text-xs text-sky-400 font-bold hover:underline"
              >
                UNDO ({undoSeconds}s)
              </button>
            </div>
            <button onClick={() => navigate('subs-dashboard')} className="w-full py-4 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-2xl transition active:scale-[0.98]">
              Back to Subscriptions
            </button>
          </div>
        </div>
      );

    // ==========================================
    // 4. VAULT & BANK AGGREGATOR FLOW
    // ==========================================
    case 'vault':
      if (isVaultLoading) {
        return (
          <div className="flex flex-col h-full p-4 space-y-4 animate-pulse bg-slate-950">
            {/* Header Skeleton */}
            <div className="flex justify-between items-center">
              <div className="space-y-1.5 text-left">
                <div className="h-6 w-24 bg-slate-800/80 rounded" />
                <div className="h-3.5 w-32 bg-slate-800/50 rounded" />
              </div>
              <div className="h-8 w-16 bg-slate-800/80 rounded-xl" />
            </div>

            {/* Emergency Freeze Card Skeleton */}
            <div className="p-4 rounded-2xl border border-slate-800/50 bg-slate-900/40 text-left space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-slate-700 rounded-full" />
                <div className="h-3.5 w-36 bg-slate-700 rounded" />
              </div>
              <div className="space-y-1.5">
                <div className="h-3.5 w-full bg-slate-800/80 rounded" />
                <div className="h-3.5 w-5/6 bg-slate-800/80 rounded" />
              </div>
              {/* Fake Slider */}
              <div className="h-14 bg-slate-900/60 border border-slate-800/50 rounded-2xl flex items-center justify-center" />
            </div>

            {/* Linked Bank Accounts list Skeleton */}
            <div className="text-left space-y-2">
              <div className="h-4 w-32 bg-slate-800/80 rounded" />
              <div className="space-y-2">
                {[1, 2].map((i) => (
                  <div key={i} className="p-4 rounded-2xl border border-slate-800/50 bg-slate-900/40 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-800/80" />
                      <div className="space-y-1.5 text-left">
                        <div className="h-3.5 w-20 bg-slate-800/80 rounded" />
                        <div className="h-2.5 w-36 bg-slate-800/50 rounded" />
                      </div>
                    </div>
                    <div className="space-y-1.5 text-right">
                      <div className="h-4 w-16 bg-slate-800/80 rounded" />
                      <div className="h-3 w-10 bg-slate-800/50 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Privacy Controls Panel Skeleton */}
            <div className="text-left space-y-2 flex-1">
              <div className="h-4 w-36 bg-slate-800/80 rounded" />
              <div className="border border-slate-800/50 rounded-2xl divide-y divide-slate-800/30 bg-slate-900/40">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-4 flex justify-between items-center">
                    <div className="space-y-1.5">
                      <div className="h-3.5 w-24 bg-slate-800/80 rounded" />
                      <div className="h-2.5 w-48 bg-slate-800/50 rounded" />
                    </div>
                    <div className="w-11 h-6 rounded-full bg-slate-800/80" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      }

      return (
        <div className="flex flex-col h-full bg-slate-950 text-white">
          {/* STICKY/FIXED HEADER (Never Scrolls Out of View) */}
          <div className="flex justify-between items-center text-left p-4 pb-2.5 shrink-0 border-b border-slate-900">
            <div>
              <h2 className="text-xl font-extrabold tracking-tight">Vault</h2>
              <p className={`text-xs ${textMuted}`}>Security & privacy controls</p>
            </div>
            <button onClick={() => navigate('link-bank')} className="p-2 bg-sky-500/10 text-sky-400 border border-sky-500/20 rounded-xl flex items-center space-x-1 hover:bg-sky-500/20 transition text-xs font-semibold">
              <Plus className="w-4.5 h-4.5" />
              <span>Add</span>
            </button>
          </div>

          {/* SCROLLABLE MAIN CONTENT AREA */}
          <div className="flex-1 overflow-y-auto p-4 pt-3.5 space-y-4">
            {/* CRITICAL SLIDER TO FREEZE EVERYTHING */}
            <div className="p-4 rounded-2xl bg-red-600/10 border border-red-500/20 text-left relative overflow-hidden group">
              <div className="flex items-center space-x-2.5 mb-3">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
                <span className="text-red-500 font-bold text-xs uppercase tracking-wider">Emergency Freeze Mode</span>
              </div>
              <p className="text-xs text-slate-400 mb-4 leading-normal">
                Suspicious billing or phone theft? Slide the trigger to instantly send a secure webhook block command to all registered bank APIs.
              </p>

              {/* SLIDE BAR */}
              <div
                onMouseMove={handleSlideFreezeMove}
                onTouchMove={handleSlideFreezeMove}
                onMouseUp={handleSlideFreezeEnd}
                onTouchEnd={handleSlideFreezeEnd}
                className="relative h-14 bg-red-950/60 border border-red-900/30 rounded-2xl flex items-center justify-center overflow-hidden cursor-pointer"
              >
                <div
                  className="absolute left-0 top-0 bottom-0 bg-red-600/40 transition-all"
                  style={{ width: `${slideFreezeProgress}%` }}
                />
                <span className="relative z-10 text-[11px] font-bold text-red-300 uppercase tracking-widest select-none pointer-events-none">
                  Slide to freeze everything
                </span>
                <div
                  onMouseDown={() => setIsSlidingFreeze(true)}
                  onTouchStart={() => setIsSlidingFreeze(true)}
                  className="absolute left-1.5 top-1.5 w-11 h-11 bg-red-600 text-white rounded-xl flex items-center justify-center shadow-md cursor-grab"
                  style={{ transform: `translateX(${Math.max(0, slideFreezeProgress * 2.8)}px)` }}
                >
                  <ChevronRight className="w-5 h-5 animate-pulse" />
                </div>
              </div>
            </div>

            {/* LINKED ACCOUNTS PANEL */}
            <div className="text-left space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Linked Bank Accounts</h3>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/10">RBI Sandbox</span>
              </div>
              <div className="space-y-2">
                {banks.filter(b => b.isConnected).length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 text-center border border-dashed border-slate-800 rounded-2xl bg-slate-900/10 space-y-3.5 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(6,182,212,0.03)_0%,transparent_70%]" />
                    <motion.div 
                      animate={{ y: [0, -4, 0] }}
                      transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                      className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mx-auto shadow-inner relative z-10"
                    >
                      <Plus className="w-5 h-5 text-cyan-400 group-hover:rotate-90 transition duration-300" />
                    </motion.div>
                    <div className="space-y-1 relative z-10">
                      <h4 className="font-bold text-xs text-slate-200">No bank account linked</h4>
                      <p className="text-[10px] text-slate-500 max-w-[210px] mx-auto mt-0.5 leading-relaxed">
                        Link your bank account using Account Aggregator to enable live AI protection, balance tracking, and transaction freeze commands.
                      </p>
                    </div>
                    <button 
                      onClick={() => navigate('link-bank')}
                      className="relative z-10 px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-[10px] font-black uppercase tracking-wider rounded-xl transition active:scale-95 shadow-lg shadow-cyan-500/10"
                    >
                      Connect via secure AA
                    </button>
                  </motion.div>
                ) : (
                  banks.filter(b => b.isConnected).map((bank, index) => (
                    <motion.div 
                      key={bank.id} 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-4 rounded-2xl border flex items-center justify-between transition hover:border-slate-800 ${cardBg}`}
                    >
                      <div className="flex items-center space-x-3">
                        {getBankLogo(bank.id, bank.name, "w-10 h-10")}
                        <div>
                          <p className="text-xs font-bold">{bank.name}</p>
                          <p className={`text-[10px] ${textMuted} mt-0.5`}>Savings {bank.accNumber} • Sync {bank.lastSynced}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-extrabold font-mono text-emerald-400">₹{bank.balance?.toLocaleString()}</p>
                        <span className="inline-flex items-center space-x-1 text-[8px] uppercase bg-emerald-500/10 text-emerald-500 px-1.5 py-0.5 rounded-full font-bold mt-1">
                          <span className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
                          <span>Active</span>
                        </span>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>

            {/* AI PRIVACY CONTROL SWITCHES */}
            <div className="text-left space-y-2 pb-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">AI & Privacy Controls</h3>
              <div className="border rounded-2xl divide-y bg-slate-900 border-slate-800/80 divide-slate-800/40">
                <div className="p-4 flex justify-between items-center">
                  <div className="text-left pr-4">
                    <p className="text-xs font-bold">SMS Scanning</p>
                    <p className={`text-[10px] ${textMuted} mt-0.5`}>Scans local text alerts for security threats</p>
                  </div>
                  <button onClick={() => setSmsScan(!smsScan)} className={`w-11 h-6 p-0.5 rounded-full transition-colors flex items-center ${smsScan ? 'bg-sky-500 justify-end' : 'bg-slate-800 justify-start'}`}>
                    <motion.div layout transition={{ type: "spring", stiffness: 700, damping: 30 }} className="w-5 h-5 rounded-full bg-white shadow-sm" />
                  </button>
                </div>
                <div className="p-4 flex justify-between items-center">
                  <div className="text-left pr-4">
                    <p className="text-xs font-bold">Call Protection</p>
                    <p className={`text-[10px] ${textMuted} mt-0.5`}>Detects potential AI-voice scams</p>
                  </div>
                  <button onClick={() => setCallProtection(!callProtection)} className={`w-11 h-6 p-0.5 rounded-full transition-colors flex items-center ${callProtection ? 'bg-sky-500 justify-end' : 'bg-slate-800 justify-start'}`}>
                    <motion.div layout transition={{ type: "spring", stiffness: 700, damping: 30 }} className="w-5 h-5 rounded-full bg-white shadow-sm" />
                  </button>
                </div>
                <div className="p-4 flex justify-between items-center">
                  <div className="text-left pr-4">
                    <p className="text-xs font-bold">Auto-Cancel Trials</p>
                    <p className={`text-[10px] ${textMuted} mt-0.5`}>Cancels unused trials before renewal hits</p>
                  </div>
                  <button onClick={() => setAutoCancel(!autoCancel)} className={`w-11 h-6 p-0.5 rounded-full transition-colors flex items-center ${autoCancel ? 'bg-sky-500 justify-end' : 'bg-slate-800 justify-start'}`}>
                    <motion.div layout transition={{ type: "spring", stiffness: 700, damping: 30 }} className="w-5 h-5 rounded-full bg-white shadow-sm" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case 'link-bank':
      return (
        <div className="flex flex-col h-full bg-slate-950 text-white p-5 justify-between relative overflow-hidden">
          <div className="space-y-5 flex-1 flex flex-col">
            <div className="flex justify-between items-center pt-2">
              <button onClick={() => navigate('vault')} className="p-2 -ml-2 rounded-xl bg-slate-900 border border-slate-800">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <span className="text-sm font-bold">Link Your Bank</span>
              <div className="w-8" />
            </div>

            <div className="text-left space-y-1">
              <h2 className="text-2xl font-bold tracking-tight">Select your bank</h2>
              <p className="text-xs text-slate-500 leading-normal">
                Secured via secure end-to-end sandbox, sanctioned by the RBI Account Aggregator protocol.
              </p>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500" />
              <input
                type="text"
                placeholder="Search bank name..."
                value={bankSearch}
                onChange={(e) => setBankSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-sky-500 transition"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 flex-1 overflow-y-auto max-h-[300px] pt-1">
              {banks
                .filter(b => b.name.toLowerCase().includes(bankSearch.toLowerCase()))
                .map((bank, index) => {
                  const isSelected = selectedBankId === bank.id;
                  return (
                    <motion.button
                      key={bank.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, ease: "easeOut" }}
                      onClick={() => handleBankSelect(bank.id)}
                      className={`p-4 rounded-xl border flex flex-col justify-between items-start text-left transition relative ${isSelected ? 'border-sky-500 bg-sky-500/10 shadow-md shadow-sky-500/5' : 'border-slate-800 bg-slate-900/60 hover:bg-slate-900'}`}
                    >
                      <div className="mb-3">
                        {getBankLogo(bank.id, bank.name, "w-8 h-8 rounded-lg")}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">{bank.name}</p>
                        <p className="text-[9px] text-slate-500 mt-0.5">{bank.isConnected ? 'Already linked' : 'Tap to connect'}</p>
                      </div>
                      {isSelected && (
                        <motion.span 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 300, damping: 15 }}
                          className="absolute top-2 right-2 w-4 h-4 rounded-full bg-sky-500 flex items-center justify-center"
                        >
                          <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                        </motion.span>
                      )}
                    </motion.button>
                  );
                })}
            </div>
          </div>

          <div className="space-y-4 pt-4 z-10">
            <button
              onClick={handleLinkBankSubmit}
              disabled={!selectedBankId}
              className={`w-full py-4 text-white font-bold rounded-2xl transition shadow-lg ${selectedBankId ? 'bg-sky-500 hover:bg-sky-400 cursor-pointer shadow-sky-500/10' : 'bg-slate-800 cursor-not-allowed text-slate-500'}`}
            >
              {selectedBankId ? 'Link Selected Bank' : 'Select a bank'}
            </button>
            <p className="text-[9px] text-slate-600 font-mono tracking-wider">
              🔒 256-BIT SSL • RBI LICENSED ACCOUNT AGGREGATOR
            </p>
          </div>
        </div>
      );

    case 'link-bank-progress':
      return (
        <div className="flex flex-col items-center justify-center h-full bg-slate-950 text-white p-6 space-y-6 overflow-hidden relative">
          {/* Sweeping connection radar */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
            <motion.div 
              className="absolute w-[400px] h-[400px] rounded-full origin-center"
              style={{ background: "conic-gradient(from 0deg, rgba(14,165,233,0.4) 0deg, transparent 60deg)" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, ease: "linear", repeat: Infinity }}
            />
            <div className="absolute w-[200px] h-[200px] rounded-full border border-sky-500/20" />
            <div className="absolute w-[300px] h-[300px] rounded-full border border-sky-500/10" />
          </div>

          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="relative w-20 h-20 flex items-center justify-center z-10"
          >
            <div className="absolute inset-0 bg-sky-500/15 rounded-full blur-xl animate-pulse" />
            <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center shadow-[0_0_20px_rgba(14,165,233,0.2)] relative">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="28" stroke="rgba(14,165,233,0.15)" strokeWidth="3" fill="none" />
                <motion.circle cx="32" cy="32" r="28" stroke="#38bdf8" strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray="176" initial={{ strokeDashoffset: 176 }} animate={{ strokeDashoffset: 0 }} transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }} />
              </svg>
              <ShieldCheck className="w-7 h-7 text-sky-400" />
            </div>
          </motion.div>
          <div className="space-y-2 text-center z-10">
            <motion.h3 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg font-bold text-white tracking-wide"
            >
              Securing RBI Sandbox...
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-xs text-slate-400"
            >
              Establishing 256-bit encrypted handshake
            </motion.p>
          </div>
        </div>
      );

    case 'scan-qr':
      return (
        <div className={`flex flex-col h-full ${isLightMode ? 'bg-slate-50 text-gray-900' : 'bg-slate-950 text-white'}`}>
          <div className="p-4 flex justify-between items-center border-b border-slate-800/10 shrink-0">
            <h2 className="text-base font-bold">Scan QR Code</h2>
            <button onClick={() => navigate('home')} className="p-1.5 rounded-lg border border-slate-800/30 text-xs hover:bg-slate-900/30">Close</button>
          </div>

          {!hasCameraPermission ? (
            /* DYNAMIC CAMERA ACCESS DENIED CONTAINER */
            <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-4 text-center bg-slate-900/40 relative">
              <div className="w-16 h-16 rounded-full bg-slate-800 border border-slate-700/60 flex items-center justify-center text-slate-500">
                <Camera className="w-7 h-7 text-cyan-400" />
              </div>
              <div className="space-y-1.5 max-w-[240px]">
                <h3 className="font-bold text-sm">Camera Permission Required</h3>
                <p className={`text-xs ${textMuted} leading-relaxed`}>
                  Enable camera access to scan UPI QR codes directly and decrypt merchant risk status instantly.
                </p>
              </div>
              <button 
                onClick={() => setHasCameraPermission(true)} 
                className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black uppercase tracking-wider rounded-xl shadow-md transition active:scale-95"
              >
                Allow Access
              </button>
            </div>
          ) : (
            /* ACTIVE CAMERA SCANNER VIEW */
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex-1 relative bg-black overflow-hidden flex flex-col justify-between p-4 min-h-[300px]"
            >
              {/* Matrix grid/scanner animation */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.04)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
              
              {/* Subtle High-Tech Radar Sweep Animation Overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                {/* Concentric radar grid rings */}
                <div className="absolute w-[320px] h-[320px] rounded-full border border-cyan-500/5" />
                <div className="absolute w-[220px] h-[220px] rounded-full border border-cyan-500/10" />
                <div className="absolute w-[120px] h-[120px] rounded-full border border-cyan-500/15" />
                <div className="absolute w-[40px] h-[40px] rounded-full border border-cyan-500/20" />
                
                {/* Cardinal axis lines */}
                <div className="absolute w-[360px] h-[1px] bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent" />
                <div className="absolute h-[360px] w-[1px] bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent" />
                
                {/* Rotating sweep cone using conic gradient */}
                <motion.div 
                  className="absolute w-[400px] h-[400px] rounded-full origin-center opacity-40 mix-blend-screen"
                  style={{
                    background: "conic-gradient(from 0deg, rgba(6,182,212,0.3) 0deg, rgba(6,182,212,0.01) 60deg, transparent 180deg)",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 3.5,
                    ease: "linear",
                    repeat: Infinity,
                  }}
                />

                {/* Sweeping blips - representing secure payment nodes in real-time */}
                <motion.div 
                  className="absolute w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]"
                  style={{ top: "35%", left: "40%" }}
                  animate={{ opacity: [0, 0.8, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, delay: 0.8, ease: "easeInOut" }}
                />
                <motion.div 
                  className="absolute w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                  style={{ bottom: "30%", right: "35%" }}
                  animate={{ opacity: [0, 0.9, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, delay: 2.2, ease: "easeInOut" }}
                />
              </div>

              {/* Radial Vignette background for premium contrast */}
              <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_35%,rgba(0,0,0,0.9)_100%] pointer-events-none" />

              {/* Status indicator badge */}
              <div className="z-10 flex justify-center pt-2">
                <div className="bg-slate-900/90 border border-slate-800/80 px-3.5 py-1.5 rounded-full flex items-center space-x-2 shadow-2xl">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <span className="text-[10px] font-black tracking-widest text-cyan-400 font-mono uppercase">LIVE FEED • ENCRYPTED SHIELD</span>
                </div>
              </div>

              {/* Viewfinder box with brackets */}
              <div 
                className="z-10 flex-1 flex items-center justify-center my-4 relative cursor-pointer"
                onClick={() => {
                  setScanOutcome(Math.random() > 0.45 ? 'safe' : 'scam');
                  navigate('analyzing-merchant');
                }}
              >
                <div className="absolute inset-0 bg-transparent z-20" /> {/* Large hit area */}
                <div 
                  className="w-52 h-52 relative border border-cyan-500/10 flex items-center justify-center bg-cyan-500/[0.02] shadow-[0_0_60px_rgba(6,182,212,0.08)] group"
                >
                  {/* Corner L-Brackets */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-cyan-400 rounded-tl-md transition-all group-hover:scale-110 origin-top-left" />
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-cyan-400 rounded-tr-md transition-all group-hover:scale-110 origin-top-right" />
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-cyan-400 rounded-bl-md transition-all group-hover:scale-110 origin-bottom-left" />
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-cyan-400 rounded-br-md transition-all group-hover:scale-110 origin-bottom-right" />

                  {/* Pulsing focal point */}
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping opacity-75 absolute" />

                  {/* Cyber Laser Scanner line */}
                  <motion.div 
                    className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_rgba(6,182,212,0.9)]"
                    initial={{ top: "0%" }}
                    animate={{ top: "100%" }}
                    transition={{
                      duration: 2.0,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />

                  {/* Instructions on viewfinder */}
                  <div className="text-[9px] font-mono font-bold tracking-widest text-cyan-400/35 uppercase select-none">
                    TAP ANYWHERE TO SCAN
                  </div>
                </div>
              </div>

              {/* Viewfinder helper note & Simulation Selector */}
              <div className="z-10 text-center pb-4 space-y-4">
                <div>
                  <p className="text-[11px] font-medium text-slate-300">Align QR code inside the brackets</p>
                  <p className="text-[9px] text-slate-500 font-mono mt-0.5 uppercase tracking-wide">Select simulation scan path below</p>
                </div>

                <div className="grid grid-cols-2 gap-3 max-w-[280px] mx-auto">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setScanOutcome('safe');
                      navigate('analyzing-merchant');
                    }}
                    className="py-2.5 px-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[10px] font-black uppercase tracking-wider transition active:scale-95 flex items-center justify-center space-x-1"
                  >
                    <span>🟢</span>
                    <span>Scan Safe QR</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setScanOutcome('scam');
                      navigate('analyzing-merchant');
                    }}
                    className="py-2.5 px-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 text-[10px] font-black uppercase tracking-wider transition active:scale-95 flex items-center justify-center space-x-1"
                  >
                    <span>🔴</span>
                    <span>Scan Scam QR</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* MANUAL SMS / PASTE LINK INTERACTION SHEET */}
          <div className={`p-4 border-t rounded-t-3xl space-y-4 text-left shrink-0 ${cardBg}`}>
            <div className="w-12 h-1 bg-slate-800 rounded-full mx-auto -mt-1.5 mb-2" />
            <span className={`text-[10px] font-bold tracking-wider uppercase ${textMuted}`}>Or verify a link / SMS</span>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Paste link or SMS content..."
                value={pasteText}
                onChange={(e) => setPasteText(e.target.value)}
                className={`flex-1 px-4 py-3 text-xs border rounded-xl focus:outline-none focus:border-sky-500 transition ${inputBg}`}
              />
              <button
                onClick={() => {
                  if (pasteText.trim()) navigate('analyzing-merchant');
                }}
                className="px-5 bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs rounded-xl transition"
              >
                Verify
              </button>
            </div>

            <div className="space-y-2">
              <span className={`text-[10px] font-bold tracking-wider uppercase ${textMuted}`}>Recent Scans</span>
              <div className="space-y-2 max-h-[140px] overflow-y-auto">
                <div onClick={() => navigate('merchant-verified')} className={`p-3 rounded-xl border border-l-2 border-l-emerald-500 flex items-center justify-between cursor-pointer hover:border-slate-700 text-xs ${cardBg}`}>
                  <span className="font-semibold">Swiggy Instacart QR</span>
                  <span className="text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded text-[10px]">96/100 Safe</span>
                </div>
                <div onClick={() => navigate('scam-detected')} className={`p-3 rounded-xl border border-l-2 border-l-red-500 flex items-center justify-between cursor-pointer hover:border-slate-700 text-xs ${cardBg}`}>
                  <span className="font-semibold">Unknown UPI request</span>
                  <span className="text-red-500 font-bold bg-red-500/10 px-2 py-0.5 rounded text-[10px]">12/100 Blocked</span>
                </div>
                <div onClick={() => navigate('merchant-verified')} className={`p-3 rounded-xl border border-l-2 border-l-emerald-500 flex items-center justify-between cursor-pointer hover:border-slate-700 text-xs ${cardBg}`}>
                  <span className="font-semibold">Amazon Pay QR</span>
                  <span className="text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded text-[10px]">91/100 Safe</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    // ==========================================
    // 5. NOTIFICATIONS & ACTIVITY LOGS
    // ==========================================
    case 'notifications':
      if (isNotificationsLoading) {
        return (
          <div className="flex flex-col h-full bg-slate-950 text-white p-4 justify-between animate-pulse">
            <div className="space-y-4 flex-1 flex flex-col overflow-hidden">
              {/* Header Skeleton */}
              <div className="flex justify-between items-center pt-2">
                <div className="flex items-center space-x-2">
                  <div className="p-2 -ml-2 rounded-xl bg-slate-900 w-8 h-8 animate-pulse" />
                  <div className="h-6 w-28 bg-slate-800/80 rounded" />
                </div>
                <div className="h-4 w-20 bg-slate-800/50 rounded" />
              </div>

              {/* Filter Pills Skeleton */}
              <div className="flex space-x-2 overflow-x-hidden shrink-0">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="px-5 py-3 rounded-full bg-slate-900 border border-slate-800/80 w-20 h-7" />
                ))}
              </div>

              {/* Notifications list Skeleton */}
              <div className="space-y-2.5 flex-1 overflow-y-auto">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-4 rounded-2xl border border-slate-800/40 bg-slate-900/30 flex space-x-3 items-start animate-pulse">
                    <div className="w-8 h-8 rounded-lg bg-slate-950/60 border border-slate-800/40 shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="h-3.5 w-24 bg-slate-800/80 rounded" />
                        <div className="h-2.5 w-10 bg-slate-800/50 rounded" />
                      </div>
                      <div className="space-y-1.5">
                        <div className="h-3 w-5/6 bg-slate-800/60 rounded" />
                        <div className="h-3 w-3/4 bg-slate-800/60 rounded" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      }

      return (
        <div className="flex flex-col h-full bg-slate-950 text-white p-4 justify-between">
          <div className="space-y-4 flex-1 flex flex-col overflow-hidden">
            <div className="flex justify-between items-center pt-2">
              <div className="flex items-center space-x-2">
                <button onClick={() => navigate('home')} className="p-2 -ml-2 rounded-xl bg-slate-900 border border-slate-800">
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <h2 className="text-lg font-bold">Notifications</h2>
              </div>
              <button
                onClick={() => setNotifications(prev => prev.map(n => ({ ...n, unread: false })))}
                className="text-xs text-sky-400 font-bold hover:underline"
              >
                Mark all read
              </button>
            </div>

            {/* SELECTION FILTER PILLS */}
            <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-none shrink-0 relative">
              {(['All', 'Fraud', 'Subscriptions', 'System'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setNotifFilter(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition relative ${notifFilter === cat ? 'border-sky-400 text-white' : isLightMode ? 'bg-white border-gray-250 text-gray-650 hover:bg-gray-205 hover:text-gray-900 shadow-sm' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'}`}
                >
                  <span className="relative z-10">{cat}</span>
                  {notifFilter === cat && (
                    <motion.div layoutId="notifTab" className="absolute inset-0 bg-sky-500 rounded-full shadow-md shadow-sky-500/10" />
                  )}
                </button>
              ))}
            </div>

            {/* NOTIFICATIONS LIST */}
            <div className="space-y-2.5 flex-1 overflow-y-auto text-left">
              {notifications
                .filter(n => notifFilter === 'All' || n.type === notifFilter)
                .map((notif, index) => {
                  const getRiskStyle = () => {
                    if (notif.risk === 'High') return 'bg-red-500/10 border-red-500/20 text-red-400';
                    if (notif.risk === 'Warning') return 'bg-amber-500/10 border-amber-500/20 text-amber-500';
                    if (notif.risk === 'Success') return 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400';
                    return 'bg-sky-500/10 border-sky-500/20 text-sky-400';
                  };
                  return (
                    <motion.div
                      key={notif.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-4 rounded-2xl border relative flex space-x-3 items-start transition hover:border-slate-700 cursor-pointer ${getRiskStyle()}`}
                    >
                      {notif.unread && (
                        <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                      )}
                      <div className="w-8 h-8 rounded-lg bg-slate-950/60 border border-slate-800/40 flex items-center justify-center shrink-0">
                        {notif.type === 'Fraud' && <AlertTriangle className="w-4 h-4 text-red-400" />}
                        {notif.type === 'Subscriptions' && <CreditCard className="w-4 h-4 text-amber-500" />}
                        {notif.type === 'System' && <ShieldCheck className="w-4 h-4 text-emerald-400" />}
                      </div>
                      <div className="flex-1 space-y-0.5">
                        <div className="flex justify-between items-center">
                          <p className="font-extrabold text-xs">{notif.title}</p>
                          <span className="text-[9px] text-slate-500 font-mono pr-2">{notif.time}</span>
                        </div>
                        <p className="text-[10px] text-slate-400 leading-relaxed font-medium">{notif.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
            </div>
          </div>
        </div>
      );

    case 'activity-log':
      if (isActivityLoading) {
        return (
          <div className="flex flex-col h-full bg-slate-950 text-white p-4 animate-pulse">
            <div className="space-y-4 flex-1 flex flex-col overflow-hidden text-left">
              {/* Header Skeleton */}
              <div className="flex justify-between items-center pt-2 shrink-0">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-xl bg-slate-800" />
                  <div className="h-5 w-24 bg-slate-800 rounded" />
                </div>
                <div className="w-8 h-8 rounded-xl bg-slate-800" />
              </div>

              {/* Selection Filter Pills Skeleton */}
              <div className="flex space-x-2 overflow-x-hidden shrink-0 pb-1">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="px-6 py-4 rounded-full bg-slate-800 shrink-0" />
                ))}
              </div>

              {/* Activity List Skeletons */}
              <div className="space-y-2.5 flex-1 overflow-hidden">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="p-4 bg-slate-900/30 border border-slate-900 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="w-10 h-10 rounded-xl bg-slate-800" />
                      <div className="space-y-2 flex-1">
                        <div className="h-3 w-1/3 bg-slate-800 rounded" />
                        <div className="h-2.5 w-2/3 bg-slate-800/60 rounded" />
                      </div>
                    </div>
                    <div className="text-right space-y-2 ml-4 shrink-0">
                      <div className="h-2 w-8 bg-slate-800 rounded ml-auto" />
                      <div className="h-4 w-12 bg-slate-800/80 rounded ml-auto" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      }

      return (
        <div className="flex flex-col h-full bg-slate-950 text-white p-4">
          <div className="space-y-4 flex-1 flex flex-col overflow-hidden">
            <div className="flex justify-between items-center pt-2 shrink-0">
              <div className="flex items-center space-x-2">
                <button onClick={() => navigate('home')} className="p-2 -ml-2 rounded-xl bg-slate-900 border border-slate-800">
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <h2 className="text-lg font-bold">Activity</h2>
              </div>
              <button className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                <Share2 className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {/* SELECTION FILTER PILLS */}
            <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-none shrink-0 relative">
              {(['All', 'Blocked', 'Verified', 'Cancelled'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActivityFilter(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition relative ${activityFilter === cat ? 'border-sky-400 text-white' : isLightMode ? 'bg-white border-gray-250 text-gray-650 hover:bg-gray-205 hover:text-gray-900 shadow-sm' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'}`}
                >
                  <span className="relative z-10">{cat}</span>
                  {activityFilter === cat && (
                    <motion.div layoutId="activityTab" className="absolute inset-0 bg-sky-500 rounded-full shadow-md shadow-sky-500/10" />
                  )}
                </button>
              ))}
            </div>

            {/* RECENT SECURE ACTIVITY LIST */}
            <div className="space-y-2.5 flex-1 overflow-y-auto text-left">
              {activities
                .filter(a => activityFilter === 'All' || a.status === activityFilter)
                .map((act, index) => (
                  <motion.div 
                    key={act.id} 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-4 bg-slate-900 border border-slate-800/80 rounded-2xl flex items-center justify-between cursor-pointer hover:border-slate-700 transition"
                  >
                    <div className="flex items-center space-x-3 text-left">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${act.status === 'Blocked' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : act.status === 'Verified' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-300'}`}>
                        {act.status === 'Blocked' && <XCircle className="w-5 h-5" />}
                        {act.status === 'Verified' && <CheckCircle2 className="w-5 h-5" />}
                        {act.status === 'Cancelled' && <Trash2 className="w-5 h-5" />}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">{act.title}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{act.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center shrink-0">
                      <div className="text-right">
                        <span className="text-[9px] text-slate-500 font-mono block">{act.time}</span>
                        <span className={`inline-block text-[8px] font-bold px-2 py-0.5 rounded mt-1 uppercase ${act.status === 'Blocked' ? 'bg-red-500/10 text-red-400' : act.status === 'Verified' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                          {act.status}
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-600 ml-2" />
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        </div>
      );

    // ==========================================
    // 6. EMERGENCY, REPORT & OFFLINE SCREEN
    // ==========================================
    case 'offline':
      return (
        <div className="flex flex-col h-full bg-slate-950 text-white p-6 justify-between relative overflow-hidden">
          <div className="space-y-6 z-10 text-center flex-1 flex flex-col justify-center">
            <div className="w-20 h-20 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500 animate-pulse">
              <WifiOff className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-extrabold tracking-tight">You&apos;re offline</h2>
              <p className="text-sm text-slate-400 leading-relaxed px-4">
                Some features need internet. Safe on-device emergency freeze works fully offline.
              </p>
            </div>

            <div className="space-y-2 max-w-sm mx-auto w-full pt-4 text-left">
              {[
                { title: 'Emergency Freeze — works offline', ok: true },
                { title: 'View saved data — works offline', ok: true },
                { title: 'AI fraud scan — needs internet', ok: false },
                { title: 'Subscription sync — needs internet', ok: false },
              ].map((item, i) => (
                <div key={i} className={`p-3 rounded-xl border text-xs flex items-center justify-between ${item.ok ? 'bg-emerald-500/5 border-emerald-500/10 text-emerald-400' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
                  <span>{item.title}</span>
                  {item.ok ? <Check className="w-4 h-4 text-emerald-400" /> : <XCircle className="w-4 h-4 text-red-400" />}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3 pt-6 z-10 pb-4">
            <button 
              onClick={() => { setIsOffline(false); navigate('home'); }} 
              className="w-full py-4 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-2xl shadow-lg shadow-sky-500/10 transition active:scale-[0.98] flex items-center justify-center space-x-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry Connection</span>
            </button>
            <p className="text-[10px] text-slate-500 leading-snug px-6 pt-1">
              Need immediate system block? Safe on-device emergency freeze works fully offline.
            </p>
            <button
              onClick={() => {
                setBanks(prev => prev.map(b => ({ ...b, isConnected: false })));
                setActivities(prev => [{ id: 'off-freez-' + Date.now(), title: 'Offline Emergency Block', description: 'Webhooks queued locally', time: 'Just now', status: 'Blocked' }, ...prev]);
                navigate('home');
              }}
              className="w-full py-3 bg-transparent border border-red-500/30 hover:border-red-500/50 text-red-500 text-xs font-bold rounded-2xl flex items-center justify-center space-x-2 transition"
            >
              <Lock className="w-4 h-4 animate-pulse" />
              <span>Freeze All Accounts</span>
            </button>
          </div>
        </div>
      );

    case 'emergency':
      return (
        <div className="flex flex-col h-full bg-slate-950 text-white p-5 justify-between">
          <div className="space-y-5">
            <div className="flex justify-between items-center pt-2">
              <button onClick={() => navigate('home')} className="p-2 -ml-2 rounded-xl bg-slate-900 border border-slate-800">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <span className="text-sm font-bold">Emergency Help</span>
              <div className="w-8" />
            </div>

            <motion.button 
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-full py-4 bg-red-600 hover:bg-red-500 rounded-2xl flex items-center justify-center space-x-2.5 shadow-lg shadow-red-500/15 active:scale-[0.98] transition"
            >
              <PhoneCall className="w-5 h-5 animate-pulse" />
              <span className="font-bold text-lg">Call Cyber Cell 1930</span>
            </motion.button>

            <div className="grid grid-cols-2 gap-3 text-left">
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col justify-between h-28 cursor-pointer hover:border-slate-700">
                <span className="text-2xl">💬</span>
                <div>
                  <p className="font-bold text-xs text-white">WhatsApp Support</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">24/7 fast chat help</p>
                </div>
              </div>
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col justify-between h-28 cursor-pointer hover:border-slate-700">
                <span className="text-2xl">✉️</span>
                <div>
                  <p className="font-bold text-xs text-white">Email Report</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">Get immediate file log</p>
                </div>
              </div>
              <div onClick={() => navigate('freeze-accounts-confirm')} className="p-4 bg-red-950/30 border border-red-500/40 ring-1 ring-red-500/20 rounded-2xl flex flex-col justify-between h-28 cursor-pointer hover:border-red-400/50 transition">
                <span className="text-2xl">❄️</span>
                <div>
                  <p className="font-bold text-xs text-white">Freeze Accounts</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">Block all cards now</p>
                </div>
              </div>
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col justify-between h-28 cursor-pointer hover:border-slate-700">
                <span className="text-2xl">📞</span>
                <div>
                  <p className="font-bold text-xs text-white">RBI Helpline</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">Dial 14440 security</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-left">
              <div className="flex items-center space-x-1.5 text-amber-500 mb-3">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Immediate Steps</span>
              </div>
              <div className="space-y-2.5 text-xs">
                {[
                  'Do NOT share OTP with anyone — ever',
                  'Freeze your cards from the Vault tab',
                  'File complaint at cybercrime.gov.in',
                  'Screenshot any suspicious messages',
                ].map((step, i) => (
                  <div key={i} className="flex space-x-2.5 items-start">
                    <span className="w-5 h-5 rounded-full bg-slate-950 border border-slate-800 text-[10px] font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                    <span className="text-slate-300 leading-tight">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );

    case 'safe-report':
      return (
        <div className="flex flex-col h-full bg-slate-950 text-white p-5 justify-between overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center pt-2">
            <button onClick={() => navigate('home')} className="p-2 -ml-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-850 transition">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-black tracking-widest text-emerald-500 font-mono uppercase bg-emerald-950/15 border border-emerald-500/20 px-3 py-1 rounded-full">System Safe</span>
            <div className="w-8" />
          </div>

          <div className="flex-1 flex flex-col justify-center items-center text-center space-y-6 py-4">
            {/* Pulsing Concentric Visual Center */}
            <div className="relative my-2">
              <div className="absolute inset-0 rounded-full border-2 border-emerald-500/20 scale-150 animate-ping opacity-60" />
              <div className="absolute inset-0 rounded-full border border-emerald-500/10 scale-200 animate-pulse opacity-30" />
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-emerald-950 to-slate-950 border-2 border-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <ShieldCheck className="w-10 h-10 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-black tracking-tight text-white px-2">Everything looks safe right now!</h2>
              <p className="text-[11px] text-slate-400 leading-relaxed max-w-xs mx-auto">
                No critical threats, unapproved auto-debits, or malicious SMS links have been intercepted in the last 30 days.
              </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
              <div className="p-3 bg-gradient-to-br from-slate-900/80 to-slate-950 border border-slate-800 rounded-2xl text-center shadow-sm">
                <ShieldCheck className="w-5 h-5 text-sky-400 mx-auto mb-1" />
                <p className="text-lg font-extrabold font-mono text-white">0 Threats</p>
                <p className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">detected today</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-slate-900/80 to-slate-950 border border-slate-800 rounded-2xl text-center shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                <p className="text-lg font-extrabold font-mono text-white">12 Safe</p>
                <p className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">transacts audited</p>
              </div>
            </div>

            {/* System Status Sub-Systems Audit */}
            <div className="w-full max-w-xs bg-slate-900/40 border border-slate-900 rounded-2xl p-3.5 space-y-2.5 text-left overflow-hidden">
              <span className="text-[8px] font-black uppercase tracking-widest text-slate-500 font-mono">Continuous Shield Auditing</span>
              
              <div className="space-y-2 text-[10px]">
                {[
                  { label: 'Auto-Debit Monitor', status: '🟢 Live & Intercepting', color: 'text-emerald-400' },
                  { label: 'UPI Collect Request Guard', status: '🟢 100% Protection', color: 'text-emerald-400' },
                  { label: 'Bank Link Aggregator', status: '🛡️ SSL Encrypted', color: 'text-sky-400' },
                  { label: 'Threat Database', status: 'Synced & Secure', color: 'text-emerald-400' }
                ].map((sys, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + (idx * 0.15) }}
                    className={`flex justify-between items-center py-0.5 ${idx < 3 ? 'border-b border-slate-800/30' : ''}`}
                  >
                    <span className="text-slate-400 font-medium">{sys.label}</span>
                    <span className={`${sys.color} font-bold font-mono`}>{sys.status}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Micro scan caption */}
            <div className="text-[9px] text-slate-600 font-mono tracking-wider">
              LAST AUDIT COMPLETED 2 MINUTES AGO • Guardia AI Core
            </div>
          </div>

          <div className="pt-2 pb-4">
            <button onClick={() => navigate('home')} className="w-full py-3.5 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-2xl transition active:scale-[0.98] shadow-lg shadow-sky-500/10">
              Return to Safety Dashboard
            </button>
          </div>
        </div>
      );

    // ==========================================
    // 7. SAVINGS CELEBRATIONS
    // ==========================================
    case 'your-win':
      return (
        <div className="flex flex-col h-full bg-slate-950 text-white p-5 justify-between">
          <div className="space-y-5">
            <div className="flex justify-between items-center pt-2">
              <button onClick={() => navigate('home')} className="p-2 -ml-2 rounded-xl bg-slate-900 border border-slate-800">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <span className="text-sm font-bold">Your Win</span>
              <div className="w-8" />
            </div>

            {/* HIGH-FIDELITY SAVINGS CARD TO DOWNLOAD */}
            <motion.div 
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: [0, -5, 0], opacity: 1 }}
              transition={{ 
                scale: { type: "spring", stiffness: 300, damping: 20 },
                opacity: { duration: 0.4 },
                y: { repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.4 }
              }}
              className="p-6 bg-gradient-to-br from-slate-900 via-sky-950/20 to-slate-900 border border-sky-500/20 rounded-3xl relative overflow-hidden text-center space-y-4 shadow-[0_15px_35px_rgba(14,165,233,0.1)]"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 rounded-full blur-3xl" />
              <p className="text-xs uppercase font-extrabold tracking-widest text-slate-400">Guardia AI saved me</p>
              <motion.h2 
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10, delay: 0.3 }}
                className="text-5xl font-black text-emerald-400 tracking-tight font-mono"
              >
                {isAnonymized ? '₹XX,XXX' : '₹12,400'}
              </motion.h2>
              <p className="text-xs text-slate-500 font-semibold">this year</p>

              <div className="grid grid-cols-3 gap-2 text-center pt-2">
                <div>
                  <p className="text-lg font-black text-white font-mono">3</p>
                  <p className="text-[9px] text-slate-500 leading-snug">Subscriptions cancelled</p>
                </div>
                <div>
                  <p className="text-lg font-black text-white font-mono">2</p>
                  <p className="text-[9px] text-slate-500 leading-snug">Scams blocked</p>
                </div>
                <div>
                  <p className="text-lg font-black text-white font-mono">8</p>
                  <p className="text-[9px] text-slate-500 leading-snug">Months protected</p>
                </div>
              </div>

              <div className="pt-2">
                <span className="inline-flex items-center space-x-1 px-3 py-1 bg-slate-950 border border-slate-800 rounded-full text-[9px] text-slate-500 font-bold uppercase tracking-wider font-mono">
                  🛡️ Powered by Guardia AI
                </span>
              </div>
            </motion.div>

            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex justify-between items-center">
              <div className="text-left">
                <p className="text-xs font-bold text-white">Anonymize savings card</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Mask exact rupee amount in preview</p>
              </div>
              <button onClick={() => setIsAnonymized(!isAnonymized)} className={`w-11 h-6 rounded-full transition relative ${isAnonymized ? 'bg-sky-500' : 'bg-slate-800'}`}>
                <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${isAnonymized ? 'left-5.5' : 'left-0.5'}`} />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2.5 text-center">
              {[
                { label: 'WhatsApp', icon: '💬' },
                { label: 'Instagram', icon: '📸' },
                { label: 'Copy Link', icon: '📋' },
              ].map((plat, i) => (
                <button key={i} className="p-3 bg-slate-900 border border-slate-800 rounded-xl hover:border-slate-700 transition flex flex-col items-center space-y-1.5">
                  <span className="text-xl">{plat.icon}</span>
                  <span className="text-[10px] font-bold text-slate-400">{plat.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pb-4">
            <button className="w-full py-4 bg-slate-900 hover:bg-slate-850 text-sky-400 border border-sky-500/20 font-bold rounded-2xl flex items-center justify-center space-x-2 transition active:scale-95">
              <Download className="w-4.5 h-4.5" />
              <span>↓ Download as Image</span>
            </button>
          </div>
        </div>
      );

    // ==========================================
    // 8. PROFILE & DESTRUCTIVE ACTIONS FLOW
    // ==========================================
    case 'me-profile':
      return (
        <div className={`flex flex-col h-full p-4 space-y-4 overflow-y-auto ${isLightMode ? 'bg-slate-50 text-gray-900' : 'bg-slate-950 text-white'}`}>
          <div className="flex justify-between items-center text-left">
            <h2 className="text-xl font-extrabold tracking-tight">Profile</h2>
            <button onClick={() => navigate('home')} className="text-xs text-sky-400 hover:underline">Done</button>
          </div>

          {/* USER INFO BLOCK */}
          <div className={`p-4 rounded-2xl border text-left flex items-center space-x-4 ${cardBg}`}>
            <div className="w-14 h-14 rounded-full bg-sky-950 border border-sky-800 flex items-center justify-center overflow-hidden shrink-0">
              {profile.photo ? (
                <img src={profile.photo} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-sky-400 text-lg font-bold">
                  {profile.name ? profile.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase() : 'RS'}
                </span>
              )}
            </div>
            <div>
              <h3 className="font-extrabold text-base leading-tight">{profile.name}</h3>
              <p className={`text-xs ${textMuted} font-mono mt-0.5`}>{profile.phone}</p>
              <div className="flex space-x-1.5 mt-2">
                <span className="bg-emerald-500/10 text-emerald-500 text-[8px] font-bold px-1.5 py-0.5 rounded font-mono uppercase border border-emerald-500/20">Verified ✓</span>
                <span className="bg-slate-800 text-slate-400 text-[8px] font-bold px-1.5 py-0.5 rounded font-mono uppercase">RBI</span>
              </div>
            </div>
          </div>

          {/* CELEBRATION BENTO STATISTICS */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className={`p-3 rounded-xl border ${cardBg}`}>
              <p className="text-emerald-500 font-extrabold text-xs font-mono">₹24,400</p>
              <p className={`text-[8px] uppercase font-bold tracking-wider mt-0.5 ${textMuted}`}>Saved (Lifetime)</p>
            </div>
            <div className={`p-3 rounded-xl border ${cardBg}`}>
              <p className="text-sky-400 font-extrabold text-xs font-mono">5</p>
              <p className={`text-[8px] uppercase font-bold tracking-wider mt-0.5 ${textMuted}`}>Scams Blocked</p>
            </div>
            <div className={`p-3 rounded-xl border ${cardBg}`}>
              <p className="text-amber-500 font-extrabold text-xs font-mono">8</p>
              <p className={`text-[8px] uppercase font-bold tracking-wider mt-0.5 ${textMuted}`}>Subs Cut</p>
            </div>
          </div>

          {/* SETTINGS OPTION ROWS */}
          <div className="border rounded-2xl divide-y text-left overflow-hidden bg-slate-900 border-slate-800 divide-slate-800/40">
            {[
              { label: 'Notifications', count: 3, action: () => navigate('notifications') },
              { label: 'Edit Profile', action: () => navigate('edit-profile') },
              { label: 'Reset Security PIN', action: () => navigate('verify-otp') },
              { label: 'Manage Banks', action: () => navigate('vault') },
              { label: 'Privacy Controls', action: () => navigate('vault') },
              { label: 'Activity Log', action: () => navigate('activity-log') },
              { label: 'Emergency Help', action: () => navigate('emergency') },
              { label: 'Simulate Offline State', action: () => { setIsOffline(true); navigate('offline'); } },
              { label: 'Delete Account', action: () => navigate('delete-account-confirm'), danger: true },
            ].map((opt, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={opt.action}
                className="w-full px-4 py-3.5 flex justify-between items-center hover:bg-slate-900/10 transition text-xs font-medium"
              >
                <span className={opt.danger ? 'text-red-500' : 'text-white'}>{opt.label}</span>
                <div className="flex items-center space-x-2">
                  {opt.count && (
                    <span className="w-5 h-5 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">{opt.count}</span>
                  )}
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      );

    case 'edit-profile':
      return (
        <div className="flex flex-col h-full bg-slate-950 text-white p-5 justify-between overflow-y-auto">
          <div className="space-y-6 text-left">
            <div className="flex justify-between items-center pt-2">
              <button onClick={() => navigate('me-profile')} className="p-2 -ml-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-850 transition">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <span className="text-sm font-bold tracking-tight text-white">Edit Profile</span>
              <div className="w-8" />
            </div>

            {/* PHOTO EDITOR BLOCK */}
            <div className="flex flex-col items-center space-y-2 py-2">
              <input
                id="profile-photo-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setProfile({ ...profile, photo: reader.result as string });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('profile-photo-input')?.click()}
                className="relative w-24 h-24 rounded-full bg-gradient-to-br from-sky-950 to-indigo-950 border-2 border-sky-500/80 flex items-center justify-center cursor-pointer group shadow-lg shadow-sky-500/10 hover:border-sky-400 transition-all duration-300 overflow-hidden"
              >
                {profile.photo ? (
                  <img src={profile.photo} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-sky-300 text-3xl font-black tracking-tight font-sans">
                    {profile.name ? profile.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase() : 'RS'}
                  </span>
                )}
                <div className="absolute right-1.5 bottom-1.5 w-7 h-7 rounded-full bg-sky-500 flex items-center justify-center border-2 border-slate-950 group-hover:bg-sky-400 transition-all z-10">
                  <Camera className="w-3.5 h-3.5 text-white" />
                </div>
              </motion.div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Change Profile Photo</p>
            </div>

            {/* INPUT FIELDS */}
            <div className="space-y-4">
              {/* Name Field */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Full Name</label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-slate-500">
                    <User className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full pl-11 pr-4 py-3 bg-slate-900/60 border border-slate-800/80 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-sky-500 focus:bg-slate-900 transition-all"
                    placeholder="Enter full name"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Email Address</label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-slate-500">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full pl-11 pr-4 py-3 bg-slate-900/60 border border-slate-800/80 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-sky-500 focus:bg-slate-900 transition-all"
                    placeholder="rohan.sharma@gmail.com"
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Mobile Number</label>
                  <span className="text-[8px] bg-emerald-500/10 text-emerald-400 font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border border-emerald-500/10">Verified SIM 1</span>
                </div>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-slate-500">
                    <Smartphone className="w-4 h-4" />
                  </span>
                  <input
                    type="tel"
                    disabled
                    value={profile.phone}
                    className="w-full pl-11 pr-4 py-3 bg-slate-950/40 border border-slate-900 rounded-xl text-xs text-slate-500 cursor-not-allowed font-mono"
                  />
                </div>
              </div>

              {/* Language Field */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Language preference</label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-slate-500">
                    <Globe className="w-4 h-4" />
                  </span>
                  <select
                    value={profile.language}
                    onChange={(e) => setProfile({ ...profile, language: e.target.value })}
                    className="w-full pl-11 pr-4 py-3 bg-slate-900/60 border border-slate-800/80 rounded-xl text-xs text-white focus:outline-none focus:border-sky-500 focus:bg-slate-900 transition-all appearance-none"
                  >
                    <option value="English">English (IN)</option>
                    <option value="Hindi">IN English / Hindi (हिन्दी)</option>
                    <option value="Marathi">Marathi (मराठी)</option>
                    <option value="Gujarati">Gujarati (ગુજરાતી)</option>
                  </select>
                  <span className="absolute right-4 text-slate-500 pointer-events-none text-xs">▼</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-6 pb-4">
            <button onClick={() => navigate('me-profile')} className="w-full py-3.5 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-2xl shadow-lg shadow-sky-500/10 transition active:scale-[0.98]">
              Save Changes
            </button>
            <button onClick={() => navigate('me-profile')} className="w-full py-3.5 bg-transparent hover:bg-slate-900 text-slate-400 font-bold rounded-2xl transition">
              Cancel
            </button>
          </div>
        </div>
      );

    case 'delete-account-confirm':
      return (
        <div className="flex flex-col h-full bg-slate-950 text-white p-5 justify-between">
          <div className="space-y-6 text-center flex-1 flex flex-col justify-center">
            <motion.div 
              animate={{ x: [-5, 5, -5, 5, 0] }}
              transition={{ repeat: Infinity, duration: 2, repeatDelay: 1 }}
              className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto text-red-500"
            >
              <Trash2 className="w-8 h-8" />
            </motion.div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-red-500 tracking-tight">Delete Account</h2>
              <p className="text-xs text-slate-400 px-6 leading-relaxed">
                This will permanently remove your linked bank logins, notification settings, activity audits, and subscriptions tracker logs.
              </p>
            </div>

            <div className="p-3.5 bg-red-500/5 border border-red-500/20 rounded-2xl flex space-x-2.5 items-start text-left max-w-sm mx-auto w-full">
              <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <p className="text-[11px] text-slate-400 leading-normal">
                This permanently deletes all your data. Cannot be undone.
              </p>
            </div>

            <div className="space-y-2 text-left max-w-sm mx-auto w-full pt-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Type DELETE in all caps to confirm</label>
              <input
                type="text"
                placeholder="Type 'DELETE' to confirm"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                className="w-full px-4 py-3.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-red-500 transition text-center font-bold tracking-widest placeholder:tracking-normal placeholder:font-normal"
              />
            </div>
          </div>

          <div className="space-y-2.5 pb-4">
            <button
              disabled={deleteConfirmText !== 'DELETE'}
              onClick={() => {
                setProfile({ name: 'Rohan Sharma', phone: '+91 98765 43210', email: '', language: 'English', photo: '' });
                navigate('splash');
              }}
              className={`w-full py-4 text-white font-bold rounded-2xl transition-all duration-300 ${deleteConfirmText === 'DELETE' ? 'bg-red-600 hover:bg-red-500 cursor-pointer shadow-lg shadow-red-500/20 border border-red-500/50 animate-pulse' : 'bg-slate-900/50 text-slate-600 cursor-not-allowed opacity-40 border border-slate-800/30'}`}
            >
              Delete My Account
            </button>
            <button onClick={() => navigate('me-profile')} className="w-full py-3.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 text-xs font-semibold rounded-2xl transition">
              Cancel
            </button>
          </div>
        </div>
      );

    case 'freeze-accounts-confirm':
      return (
        <div className="flex flex-col h-full bg-slate-950 text-white p-5 justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-red-950/10 via-transparent to-transparent pointer-events-none" />
          <div className="space-y-5 z-10 text-left">
            <div className="flex justify-between items-center pt-2">
              <button onClick={() => navigate('vault')} className="p-2 -ml-2 rounded-xl bg-slate-900 border border-slate-800">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono text-red-500 bg-red-500/10 border border-red-500/20 px-2.5 py-1 rounded-full uppercase font-bold tracking-wider">
                🔒 Security Verification
              </span>
              <div className="w-8" />
            </div>

            <div className="text-center py-2 space-y-2">
              <motion.div 
                animate={{ x: [-5, 5, -5, 5, 0] }}
                transition={{ repeat: Infinity, duration: 2, repeatDelay: 1 }}
                className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto text-red-500"
              >
                <Lock className="w-8 h-8" />
              </motion.div>
              <h2 className="text-2xl font-black text-red-500 tracking-tight">Confirm Freeze</h2>
              <p className="text-xs text-slate-400 px-4 leading-normal">
                This will immediately freeze all your cards and disconnect active UPI aggregator tokens.
              </p>
            </div>

            <div className="space-y-2.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Accounts to lock</span>
              {[
                { name: 'HDFC Bank savings (*4321)', desc: 'Blocks all ATM and NetBanking debits', checked: true },
                { name: 'ICICI Credit Card (*8823)', desc: 'Locks swipe & international e-com transactions', checked: true },
                { name: 'UPI Aggregator Token', desc: 'Revokes active mandates on Swiggy, Paytm, etc.', checked: true },
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-3 bg-slate-900 border border-slate-800/80 rounded-xl flex items-start space-x-3 text-xs"
                >
                  <div className="mt-0.5 w-4.5 h-4.5 rounded bg-red-600/10 border border-red-600/30 flex items-center justify-center text-red-500">
                    <Check className="w-3 h-3" strokeWidth={3} />
                  </div>
                  <div>
                    <p className="font-bold text-white">{item.name}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-3.5 bg-amber-500/5 border border-amber-500/20 rounded-xl flex space-x-2.5 items-start text-left">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-[11px] text-slate-400 leading-normal">
                <strong className="text-white font-semibold">Heuristic warning:</strong> After freezing, you must verify your identity using biometric OTP to restore access.
              </p>
            </div>
          </div>

          <div className="space-y-4 z-10 pb-4">
            {/* SWIPE TO CONFIRM FREEZE */}
            <div
              onMouseMove={handleSlideFreezeMove}
              onTouchMove={handleSlideFreezeMove}
              onMouseUp={handleSlideFreezeEnd}
              onTouchEnd={handleSlideFreezeEnd}
              className="relative h-14 bg-red-950/60 border border-red-900/30 rounded-2xl flex items-center justify-center overflow-hidden cursor-pointer"
            >
              <div
                className="absolute left-0 top-0 bottom-0 bg-red-600/40 transition-all"
                style={{ width: `${slideFreezeProgress}%` }}
              />
              <span className="relative z-10 text-[10px] font-bold text-red-300 uppercase tracking-widest select-none pointer-events-none">
                {slideFreezeProgress >= 90 ? 'RELEASING CMD...' : 'Slide to execute freeze'}
              </span>
              <div
                onMouseDown={() => setIsSlidingFreeze(true)}
                onTouchStart={() => setIsSlidingFreeze(true)}
                className="absolute left-1.5 top-1.5 w-11 h-11 bg-red-600 text-white rounded-xl flex items-center justify-center shadow-md cursor-grab active:cursor-grabbing"
                style={{ transform: `translateX(${Math.min(240, slideFreezeProgress * 2.8)}px)` }}
              >
                <ChevronRight className="w-5 h-5 animate-pulse" />
              </div>
            </div>

            <button onClick={() => navigate('vault')} className="w-full py-3.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 text-xs font-semibold rounded-2xl transition">
              Cancel & Keep Active
            </button>
          </div>
        </div>
      );

    default:
      return (
        <div className="flex items-center justify-center h-full text-slate-500 p-6 text-center">
          <p className="text-xs">Select a screen from the developer control panel to begin.</p>
        </div>
      );
    }
  })();

  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.15, ease: "easeInOut" }}
          className="w-full h-full"
        >
          {activeView}
        </motion.div>
      </AnimatePresence>
      {showBiometric && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-6">
          <div className="w-full max-w-[280px] bg-slate-900/95 border border-slate-800 rounded-3xl p-6 flex flex-col items-center justify-center space-y-6 shadow-2xl animate-[scaleIn_0.3s_ease-out] relative overflow-hidden">
            <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(56,189,248,0.05)_0%,transparent_75%] pointer-events-none" />
            
            {/* Beautiful Apple-style FaceID scanner box */}
            <div className="relative w-28 h-28 flex items-center justify-center">
              {biometricState === 'scanning' ? (
                <>
                  {/* Outer scanning pulse */}
                  <div className="absolute inset-0 border border-sky-500/20 rounded-2xl animate-ping" />
                  
                  {/* FaceID grid brackets */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-sky-500" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-sky-500" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-sky-500" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-sky-500" />
                  
                  {/* Face outline / Scanning smile element */}
                  <div className="w-16 h-16 border-2 border-sky-500/40 rounded-full flex items-center justify-center animate-pulse">
                    <div className="w-10 h-10 border border-sky-500/30 rounded-full flex items-center justify-center">
                      <div className="w-4 h-2 border-b-2 border-sky-500/60 rounded-b-full" />
                    </div>
                  </div>
                  
                  {/* Scanning beam line */}
                  <div className="absolute left-2 right-2 h-[2px] bg-gradient-to-r from-transparent via-sky-400 to-transparent shadow-[0_0_8px_rgba(56,189,248,0.8)] animate-[scan_2s_ease-in-out_infinite]" />
                </>
              ) : (
                <>
                  {/* Success check state */}
                  <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-xl animate-pulse" />
                  <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center animate-[scaleIn_0.2s_ease-out]">
                    <Check className="w-10 h-10 text-emerald-400" strokeWidth={3} />
                  </div>
                </>
              )}
            </div>

            <div className="text-center space-y-1 z-10">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                {biometricState === 'scanning' ? 'Verifying FaceID' : 'Authenticated'}
              </h3>
              <p className="text-[10px] text-slate-500 font-mono">
                {biometricState === 'scanning' ? biometricTitle : 'Identity Secured'}
              </p>
            </div>
            
            {biometricState === 'scanning' && (
              <button 
                onClick={() => {
                  setShowBiometric(false);
                  setBiometricState('idle');
                }}
                className="text-[10px] text-slate-500 hover:text-slate-400 font-bold uppercase tracking-wider pt-2"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
