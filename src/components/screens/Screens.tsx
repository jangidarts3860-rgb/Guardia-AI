
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { useStore } from '../../store';

const SplashScreen = React.lazy(() => import('./individual/SplashScreen'));
const LoginScreen = React.lazy(() => import('./individual/LoginScreen'));
const OnboardingScreen = React.lazy(() => import('./individual/OnboardingScreen'));
const PermissionsScreen = React.lazy(() => import('./individual/PermissionsScreen'));
const CreateAccountScreen = React.lazy(() => import('./individual/CreateAccountScreen'));
const VerifyOtpScreen = React.lazy(() => import('./individual/VerifyOtpScreen'));

const HomeScreen = React.lazy(() => import('./individual/HomeScreen'));
const AnalyzingMerchantScreen = React.lazy(() => import('./individual/AnalyzingMerchantScreen'));
const MerchantVerifiedScreen = React.lazy(() => import('./individual/MerchantVerifiedScreen'));
const ScamDetectedScreen = React.lazy(() => import('./individual/ScamDetectedScreen'));
const ReceiptScreen = React.lazy(() => import('./individual/ReceiptScreen'));
const SubsDashboardScreen = React.lazy(() => import('./individual/SubsDashboardScreen'));
const SubDetailScreen = React.lazy(() => import('./individual/SubDetailScreen'));
const CancelSuccessScreen = React.lazy(() => import('./individual/CancelSuccessScreen'));
const VaultScreen = React.lazy(() => import('./individual/VaultScreen'));
const LinkBankScreen = React.lazy(() => import('./individual/LinkBankScreen'));
const LinkBankProgressScreen = React.lazy(() => import('./individual/LinkBankProgressScreen'));
const ScanQRScreen = React.lazy(() => import('./individual/ScanQRScreen'));
const NotificationsScreen = React.lazy(() => import('./individual/NotificationsScreen'));
const ActivityLogScreen = React.lazy(() => import('./individual/ActivityLogScreen'));
const OfflineScreen = React.lazy(() => import('./individual/OfflineScreen'));
const EmergencyScreen = React.lazy(() => import('./individual/EmergencyScreen'));
const SafeReportScreen = React.lazy(() => import('./individual/SafeReportScreen'));
const YourWinScreen = React.lazy(() => import('./individual/YourWinScreen'));
const MeProfileScreen = React.lazy(() => import('./individual/MeProfileScreen'));
const EditProfileScreen = React.lazy(() => import('./individual/EditProfileScreen'));
const DeleteAccountConfirmScreen = React.lazy(() => import('./individual/DeleteAccountConfirmScreen'));
const AccountDeletedScreen = React.lazy(() => import('./individual/AccountDeletedScreen'));
const FreezeAccountsConfirmScreen = React.lazy(() => import('./individual/FreezeAccountsConfirmScreen'));
const CreatePinScreen = React.lazy(() => import('./individual/CreatePinScreen'));
const ResetPinScreen = React.lazy(() => import('./individual/ResetPinScreen'));
const FamilySpendHubScreen = React.lazy(() => import('./individual/FamilySpendHubScreen'));

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
          <svg viewBox="0 0 100 100" className="w-3.5 h-3.5 fill-white"><path d="M50 15 L85 80 L65 80 L50 45 L35 80 L15 80 Z" /></svg>
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
          <div className="w-full h-full rounded-full bg-[#A6192E] flex items-center justify-center text-[5px] text-white font-black leading-none">PNB</div>
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

export default function Screens() {
  const location = useLocation();
  const [showBiometricState, setShowBiometricState] = React.useState(false);

  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.15, ease: "easeInOut" }}
          className="w-full h-full"
        >
          <React.Suspense fallback={<div className="flex flex-col h-full items-center justify-center bg-slate-950"><div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin"></div></div>}>
            <Routes location={location}>
          <Route path="/splash" element={<SplashScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/onboarding" element={<OnboardingScreen />} />
          <Route path="/permissions" element={<PermissionsScreen />} />
          <Route path="/create-account" element={<CreateAccountScreen />} />
          <Route path="/verify-otp" element={<VerifyOtpScreen />} />

          <Route path="/home" element={<HomeScreen />} />
          <Route path="/analyzing-merchant" element={<AnalyzingMerchantScreen />} />
          <Route path="/merchant-verified" element={<MerchantVerifiedScreen />} />
          <Route path="/scam-detected" element={<ScamDetectedScreen />} />
          <Route path="/receipt-light" element={<ReceiptScreen />} />
          <Route path="/receipt-dark" element={<ReceiptScreen />} />
          <Route path="/subs-dashboard" element={<SubsDashboardScreen />} />
          <Route path="/sub-detail" element={<SubDetailScreen />} />
          <Route path="/cancel-success" element={<CancelSuccessScreen />} />
          <Route path="/vault" element={<VaultScreen />} />
          <Route path="/link-bank" element={<LinkBankScreen />} />
          <Route path="/link-bank-progress" element={<LinkBankProgressScreen />} />
          <Route path="/scan-qr" element={<ScanQRScreen />} />
          <Route path="/notifications" element={<NotificationsScreen />} />
          <Route path="/activity-log" element={<ActivityLogScreen />} />
          <Route path="/offline" element={<OfflineScreen />} />
          <Route path="/emergency" element={<EmergencyScreen />} />
          <Route path="/safe-report" element={<SafeReportScreen />} />
          <Route path="/your-win" element={<YourWinScreen />} />
          <Route path="/me-profile" element={<MeProfileScreen />} />
          <Route path="/edit-profile" element={<EditProfileScreen />} />
          <Route path="/delete-account-confirm" element={<DeleteAccountConfirmScreen />} />
          <Route path="/account-deleted" element={<AccountDeletedScreen />} />
          <Route path="/freeze-accounts-confirm" element={<FreezeAccountsConfirmScreen />} />
          <Route path="/create-pin" element={<CreatePinScreen />} />
          <Route path="/reset-pin" element={<ResetPinScreen />} />
          <Route path="/family-spend-hub" element={<FamilySpendHubScreen />} />
          <Route path="/" element={<SplashScreen />} />
          <Route path="*" element={<SplashScreen />} />

            </Routes>
          </React.Suspense>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
