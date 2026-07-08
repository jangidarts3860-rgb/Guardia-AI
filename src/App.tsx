import { useState, useEffect } from 'react';
import { ScreenId, Subscription, Bank, NotificationItem, ActivityItem } from './types';
import {
  initialSubscriptions,
  initialBanks,
  initialNotifications,
  initialActivities
} from './data/mockData';
import FlowNavigator from './components/layout/FlowNavigator';
import PhoneSimulator from './components/layout/PhoneSimulator';
import Screens from './components/screens/Screens';
import { Home, CreditCard, ShieldCheck, User, Scan } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
export default function App() {
  const isDev = typeof window !== 'undefined' && (window.location.search.includes('dev=true') || window.location.search.includes('debug=true') || window.location.search.includes('explorer=true'));
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobileDevice(
        window.innerWidth < 500 || 
        window.location.search.includes('pure=true') ||
        window.location.search.includes('mobile=true') ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      );
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const [currentScreen, setCurrentScreen] = useState<ScreenId>('splash');
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(initialSubscriptions);
  const [banks, setBanks] = useState<Bank[]>(initialBanks);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [activities, setActivities] = useState<ActivityItem[]>(initialActivities);
  const [selectedSub, setSelectedSub] = useState<Subscription | null>(initialSubscriptions[0]);
  const [isOffline, setIsOffline] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);

  const [profile, setProfile] = useState({
    name: 'Rohan Sharma',
    phone: '+91 98765 43210',
    email: 'rohan.sharma@gmail.com',
    language: 'English',
    photo: ''
  });

  // Main navigation helper
  const navigate = (screen: ScreenId) => {
    // If the system is offline, restrict to certain pages or trigger offline block
    if (isOffline && screen !== 'offline' && screen !== 'splash' && screen !== 'emergency') {
      setCurrentScreen('offline');
    } else {
      setCurrentScreen(screen);
    }
  };

  // Helper to determine if bottom nav should show
  const showBottomBar = ['home', 'subs-dashboard', 'vault', 'me-profile'].includes(currentScreen);

  // Screenshot mode: renders pure app screens without any chrome
  const isScreenshotMode = window.location.search.includes('screenshot=1');
  if (isScreenshotMode) {
    return (
      <div id="pure-screen-container" style={{ width: 390, height: 844, overflow: 'hidden', background: '#020617', position: 'relative', display: 'flex', flexDirection: 'column' }}>
        {/* Hidden select for Playwright automation */}
        <select
          value={currentScreen}
          onChange={(e) => navigate(e.target.value as ScreenId)}
          style={{ opacity: 0, position: 'absolute', pointerEvents: 'none', zIndex: -1 }}
        >
          <option value="splash">Splash Screen</option>
          <option value="onboarding">Intro Onboarding</option>
          <option value="permissions">Device Permissions</option>
          <option value="create-account">Create Account</option>
          <option value="verify-otp">Verify OTP</option>
          <option value="welcome-back">Welcome Back / Login</option>
          <option value="home">Home (Your Shield)</option>
          <option value="analyzing-merchant">Scanning Merchant</option>
          <option value="merchant-verified">Merchant Verified Safe</option>
          <option value="scam-detected">Scam Detected Alert</option>
          <option value="receipt-dark">Success Receipt (Dark)</option>
          <option value="subs-dashboard">Subscriptions List</option>
          <option value="sub-detail">Subscription Details</option>
          <option value="cancel-success">Cancellation Success</option>
          <option value="vault">Vault Security Dashboard</option>
          <option value="link-bank">RBI Link Bank List</option>
          <option value="scan-qr">Scan QR Code</option>
          <option value="notifications">Notifications Center</option>
          <option value="activity-log">Security Activity Log</option>
          <option value="offline">Offline Handler</option>
          <option value="emergency">Emergency Helpdesk</option>
          <option value="safe-report">Safe Protection Report</option>
          <option value="your-win">Shareable Savings Card</option>
          <option value="me-profile">Profile</option>
          <option value="edit-profile">Edit Profile Settings</option>
          <option value="delete-account-confirm">Delete Account Confirmation</option>
          <option value="freeze-accounts-confirm">Freeze Accounts Confirmation</option>
          <option value="link-bank-progress">Linking Bank Progress</option>
        </select>

        {/* Screen content fills remaining space */}
        <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
          <Screens
            currentScreen={currentScreen} navigate={navigate}
            subscriptions={subscriptions} setSubscriptions={setSubscriptions}
            banks={banks} setBanks={setBanks}
            notifications={notifications} setNotifications={setNotifications}
            activities={activities} setActivities={setActivities}
            selectedSub={selectedSub} setSelectedSub={setSelectedSub}
            profile={profile} setProfile={setProfile}
            isOffline={isOffline} setIsOffline={setIsOffline}
            isLightMode={isLightMode} setIsLightMode={setIsLightMode}
          />
        </div>

        {/* Bottom Navigation — shown only on main tab screens */}
        {showBottomBar && (
          <div style={{ position: 'absolute', bottom: 24, left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 50 }}>
            <div className="flex justify-between items-center px-2 py-2 rounded-full border backdrop-blur-xl bg-slate-900/60 border-slate-700/50 shadow-black/80 shadow-2xl w-[320px]">
              <button onClick={() => navigate('home')} className="relative flex flex-col items-center justify-center py-2 px-3 rounded-full transition-all">
                {currentScreen === 'home' && <motion.div layoutId="ssNavBg" className="absolute inset-0 bg-cyan-500/15 border border-cyan-500/30 rounded-full" />}
                <div className="relative flex flex-col items-center z-10">
                  <Home className={`w-5 h-5 ${currentScreen === 'home' ? 'text-cyan-400' : 'text-slate-400'}`} strokeWidth={currentScreen === 'home' ? 2.5 : 2} />
                  <span className={`text-[9px] font-bold tracking-wide uppercase mt-0.5 ${currentScreen === 'home' ? 'text-cyan-400' : 'text-slate-500'}`}>Home</span>
                </div>
              </button>
              <button onClick={() => navigate('subs-dashboard')} className="relative flex flex-col items-center justify-center py-2 px-3 rounded-full transition-all">
                {currentScreen === 'subs-dashboard' && <motion.div layoutId="ssNavBg" className="absolute inset-0 bg-cyan-500/15 border border-cyan-500/30 rounded-full" />}
                <div className="relative flex flex-col items-center z-10">
                  <CreditCard className={`w-5 h-5 ${currentScreen === 'subs-dashboard' ? 'text-cyan-400' : 'text-slate-400'}`} strokeWidth={currentScreen === 'subs-dashboard' ? 2.5 : 2} />
                  <span className={`text-[9px] font-bold tracking-wide uppercase mt-0.5 ${currentScreen === 'subs-dashboard' ? 'text-cyan-400' : 'text-slate-500'}`}>Subs</span>
                </div>
              </button>
              <motion.button whileTap={{ scale: 0.95 }} onClick={() => navigate('scan-qr')} className="relative flex items-center justify-center w-12 h-12 rounded-full mx-1">
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400 to-indigo-500 rounded-full blur-md opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400 to-indigo-500 rounded-full border border-white/20" />
                <Scan className="w-5 h-5 text-white relative z-10" strokeWidth={2.5} />
              </motion.button>
              <button onClick={() => navigate('vault')} className="relative flex flex-col items-center justify-center py-2 px-3 rounded-full transition-all">
                {currentScreen === 'vault' && <motion.div layoutId="ssNavBg" className="absolute inset-0 bg-cyan-500/15 border border-cyan-500/30 rounded-full" />}
                <div className="relative flex flex-col items-center z-10">
                  <ShieldCheck className={`w-5 h-5 ${currentScreen === 'vault' ? 'text-cyan-400' : 'text-slate-400'}`} strokeWidth={currentScreen === 'vault' ? 2.5 : 2} />
                  <span className={`text-[9px] font-bold tracking-wide uppercase mt-0.5 ${currentScreen === 'vault' ? 'text-cyan-400' : 'text-slate-500'}`}>Vault</span>
                </div>
              </button>
              <button onClick={() => navigate('me-profile')} className="relative flex flex-col items-center justify-center py-2 px-3 rounded-full transition-all">
                {currentScreen === 'me-profile' && <motion.div layoutId="ssNavBg" className="absolute inset-0 bg-cyan-500/15 border border-cyan-500/30 rounded-full" />}
                <div className="relative flex flex-col items-center z-10">
                  <User className={`w-5 h-5 ${currentScreen === 'me-profile' ? 'text-cyan-400' : 'text-slate-400'}`} strokeWidth={currentScreen === 'me-profile' ? 2.5 : 2} />
                  <span className={`text-[9px] font-bold tracking-wide uppercase mt-0.5 ${currentScreen === 'me-profile' ? 'text-cyan-400' : 'text-slate-500'}`}>Profile</span>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Early return for mobile device views to ensure pure fullscreen display with zero margins or paddings
  if (isMobileDevice) {
    return (
      <div className="w-full h-[100dvh] bg-slate-950 flex flex-col relative overflow-hidden font-sans">
        {/* Global Ambient Lighting & Depth (Glassmorphism Base) */}
        <div className="absolute top-[-10%] right-[-10%] w-[120%] h-[120%] pointer-events-none z-0">
          <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-[100px] opacity-40 transition-colors duration-1000 ${isLightMode ? 'bg-sky-200' : 'bg-cyan-500/10'}`} />
          <div className={`absolute bottom-0 left-0 w-80 h-80 rounded-full blur-[100px] opacity-30 transition-colors duration-1000 ${isLightMode ? 'bg-indigo-100' : 'bg-indigo-500/10'}`} />
        </div>

        {/* Dynamic Screen Content */}
        <div className="flex-1 overflow-y-auto relative z-10">
          <Screens
            currentScreen={currentScreen}
            navigate={navigate}
            subscriptions={subscriptions}
            setSubscriptions={setSubscriptions}
            banks={banks}
            setBanks={setBanks}
            notifications={notifications}
            setNotifications={setNotifications}
            activities={activities}
            setActivities={setActivities}
            selectedSub={selectedSub}
            setSelectedSub={setSelectedSub}
            profile={profile}
            setProfile={setProfile}
            isOffline={isOffline}
            setIsOffline={setIsOffline}
            isLightMode={isLightMode}
            setIsLightMode={setIsLightMode}
          />
        </div>

        {/* Core bottom navigation inside home states */}
        {showBottomBar && (
          <div className="absolute bottom-6 left-0 right-0 px-6 z-50 pointer-events-none flex justify-center">
            <div className={`pointer-events-auto flex justify-between items-center px-2 py-2 rounded-full border backdrop-blur-xl transition-colors shadow-2xl w-full max-w-[320px] ${isLightMode ? 'bg-white/70 border-white/60 shadow-gray-300/50' : 'bg-slate-900/60 border-slate-700/50 shadow-black/80'}`}>
              
              <button
                onClick={() => navigate('home')}
                className="relative group flex flex-col items-center justify-center py-2 px-3 rounded-full transition-all focus:outline-none"
              >
                {currentScreen === 'home' && (
                  <motion.div
                    layoutId="navTabBg"
                    className="absolute inset-0 bg-cyan-500/15 border border-cyan-500/30 rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  />
                )}
                <div className="relative flex flex-col items-center z-10">
                  <Home className={`w-5 h-5 transition-colors ${currentScreen === 'home' ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]' : 'text-slate-400 hover:text-slate-300'}`} strokeWidth={currentScreen === 'home' ? 2.5 : 2} />
                  <span className={`text-[9px] font-bold tracking-wide uppercase mt-0.5 transition-colors ${currentScreen === 'home' ? 'text-cyan-400' : 'text-slate-500'}`}>Home</span>
                </div>
              </button>

              <button
                onClick={() => navigate('subs-dashboard')}
                className="relative group flex flex-col items-center justify-center py-2 px-3 rounded-full transition-all focus:outline-none"
              >
                {currentScreen === 'subs-dashboard' && (
                  <motion.div
                    layoutId="navTabBg"
                    className="absolute inset-0 bg-cyan-500/15 border border-cyan-500/30 rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  />
                )}
                <div className="relative flex flex-col items-center z-10">
                  <CreditCard className={`w-5 h-5 transition-colors ${currentScreen === 'subs-dashboard' ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]' : 'text-slate-400 hover:text-slate-300'}`} strokeWidth={currentScreen === 'subs-dashboard' ? 2.5 : 2} />
                  <span className={`text-[9px] font-bold tracking-wide uppercase mt-0.5 transition-colors ${currentScreen === 'subs-dashboard' ? 'text-cyan-400' : 'text-slate-500'}`}>Subs</span>
                </div>
              </button>

              {/* Integrated Cyber Scanner Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('scan-qr')}
                className="relative flex items-center justify-center w-12 h-12 rounded-full mx-1 focus:outline-none"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400 to-indigo-500 rounded-full blur-md opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400 to-indigo-500 rounded-full border border-white/20" />
                <Scan className="w-5 h-5 text-white relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]" strokeWidth={2.5} />
              </motion.button>

              <button
                onClick={() => navigate('vault')}
                className="relative group flex flex-col items-center justify-center py-2 px-3 rounded-full transition-all focus:outline-none"
              >
                {currentScreen === 'vault' && (
                  <motion.div
                    layoutId="navTabBg"
                    className="absolute inset-0 bg-cyan-500/15 border border-cyan-500/30 rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  />
                )}
                <div className="relative flex flex-col items-center z-10">
                  <ShieldCheck className={`w-5 h-5 transition-colors ${currentScreen === 'vault' ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]' : 'text-slate-400 hover:text-slate-300'}`} strokeWidth={currentScreen === 'vault' ? 2.5 : 2} />
                  <span className={`text-[9px] font-bold tracking-wide uppercase mt-0.5 transition-colors ${currentScreen === 'vault' ? 'text-cyan-400' : 'text-slate-500'}`}>Vault</span>
                </div>
              </button>

              <button
                onClick={() => navigate('me-profile')}
                className="relative group flex flex-col items-center justify-center py-2 px-3 rounded-full transition-all focus:outline-none"
              >
                {currentScreen === 'me-profile' && (
                  <motion.div
                    layoutId="navTabBg"
                    className="absolute inset-0 bg-cyan-500/15 border border-cyan-500/30 rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  />
                )}
                <div className="relative flex flex-col items-center z-10">
                  <User className={`w-5 h-5 transition-colors ${currentScreen === 'me-profile' ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]' : 'text-slate-400 hover:text-slate-300'}`} strokeWidth={currentScreen === 'me-profile' ? 2.5 : 2} />
                  <span className={`text-[9px] font-bold tracking-wide uppercase mt-0.5 transition-colors ${currentScreen === 'me-profile' ? 'text-cyan-400' : 'text-slate-500'}`}>Profile</span>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-950 text-white overflow-hidden font-sans">
      {/* 1. Left side - Developer Screen Explorer */}
      {isDev && (
        <div className="hidden lg:block w-[400px] h-full shrink-0">
          <FlowNavigator
            currentScreen={currentScreen}
            navigate={navigate}
            isOffline={isOffline}
            setIsOffline={(offline) => {
              setIsOffline(offline);
              if (offline) navigate('offline');
              else navigate('home');
            }}
            isLightMode={isLightMode}
            setIsLightMode={setIsLightMode}
          />
        </div>
      )}

      {/* 2. Main content side - Phone Simulator & UX Audit details */}
      <div className="flex-1 flex flex-col md:flex-row items-center justify-center p-4 md:p-8 overflow-y-auto space-y-6 md:space-y-0 md:space-x-8">
        
        {/* Mobile quick header selector */}
        {isDev && !isMobileDevice && (
          <div className="lg:hidden w-full max-w-sm flex flex-col space-y-2 mb-2">
            <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500 text-left">
              Select Screen to Simulate
            </label>
            <select
              value={currentScreen}
              onChange={(e) => navigate(e.target.value as ScreenId)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-sky-500"
            >
              <option value="splash">Splash Screen</option>
              <option value="onboarding">Intro Onboarding</option>
              <option value="permissions">Device Permissions</option>
              <option value="create-account">Create Account</option>
              <option value="verify-otp">Verify OTP</option>
              <option value="welcome-back">Welcome Back / Login</option>
              <option value="home">Home (Your Shield)</option>
              <option value="analyzing-merchant">Scanning Merchant</option>
              <option value="merchant-verified">Merchant Verified Safe</option>
              <option value="scam-detected">Scam Detected Alert</option>
              <option value="receipt-dark">Success Receipt (Dark)</option>
              <option value="subs-dashboard">Subscriptions List</option>
              <option value="sub-detail">Subscription Details</option>
              <option value="cancel-success">Cancellation Success</option>
              <option value="vault">Vault Security Dashboard</option>
              <option value="link-bank">RBI Link Bank List</option>
              <option value="scan-qr">Scan QR Code</option>
              <option value="notifications">Notifications Center</option>
              <option value="activity-log">Security Activity Log</option>
              <option value="offline">Offline Handler</option>
              <option value="emergency">Emergency Helpdesk</option>
              <option value="safe-report">Safe Protection Report</option>
              <option value="your-win">Shareable Savings Card</option>
              <option value="me-profile">Profile</option>
              <option value="edit-profile">Edit Profile Settings</option>
              <option value="delete-account-confirm">Delete Account Confirmation</option>
              <option value="freeze-accounts-confirm">Freeze Accounts Confirmation</option>
              <option value="link-bank-progress">Linking Bank Progress</option>
            </select>
          </div>
        )}

        {/* The Premium Interactive Phone Simulator */}
        <div className="shrink-0 flex flex-col">
          <PhoneSimulator isOffline={isOffline} isLightMode={isLightMode} currentScreen={currentScreen}>
            <div className="flex-1 flex flex-col overflow-hidden relative">
              
              {/* Global Ambient Lighting & Depth (Glassmorphism Base) */}
              <div className="absolute top-[-10%] right-[-10%] w-[120%] h-[120%] pointer-events-none z-0">
                <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-[100px] opacity-40 transition-colors duration-1000 ${isLightMode ? 'bg-sky-200' : 'bg-cyan-500/10'}`} />
                <div className={`absolute bottom-0 left-0 w-80 h-80 rounded-full blur-[100px] opacity-30 transition-colors duration-1000 ${isLightMode ? 'bg-indigo-100' : 'bg-indigo-500/10'}`} />
              </div>

              {/* Dynamic Screen Content */}
              <div className="flex-1 overflow-y-auto relative z-10">
                <Screens
                  currentScreen={currentScreen}
                  navigate={navigate}
                  subscriptions={subscriptions}
                  setSubscriptions={setSubscriptions}
                  banks={banks}
                  setBanks={setBanks}
                  notifications={notifications}
                  setNotifications={setNotifications}
                  activities={activities}
                  setActivities={setActivities}
                  selectedSub={selectedSub}
                  setSelectedSub={setSelectedSub}
                  profile={profile}
                  setProfile={setProfile}
                  isOffline={isOffline}
                  setIsOffline={setIsOffline}
                  isLightMode={isLightMode}
                  setIsLightMode={setIsLightMode}
                />
              </div>

              {/* Core bottom navigation inside home states */}
              {showBottomBar && (
                <div className="absolute bottom-6 left-0 right-0 px-6 z-50 pointer-events-none flex justify-center">
                  <div className={`pointer-events-auto flex justify-between items-center px-2 py-2 rounded-full border backdrop-blur-xl transition-colors shadow-2xl w-full max-w-[320px] ${isLightMode ? 'bg-white/70 border-white/60 shadow-gray-300/50' : 'bg-slate-900/60 border-slate-700/50 shadow-black/80'}`}>
                    
                    <button
                      onClick={() => navigate('home')}
                      className="relative group flex flex-col items-center justify-center py-2 px-3 rounded-full transition-all focus:outline-none"
                    >
                      {currentScreen === 'home' && (
                        <motion.div
                          layoutId="navTabBg"
                          className="absolute inset-0 bg-cyan-500/15 border border-cyan-500/30 rounded-full"
                          transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        />
                      )}
                      <div className="relative flex flex-col items-center z-10">
                        <Home className={`w-5 h-5 transition-colors ${currentScreen === 'home' ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]' : 'text-slate-400 hover:text-slate-300'}`} strokeWidth={currentScreen === 'home' ? 2.5 : 2} />
                        <span className={`text-[9px] font-bold tracking-wide uppercase mt-0.5 transition-colors ${currentScreen === 'home' ? 'text-cyan-400' : 'text-slate-500'}`}>Home</span>
                      </div>
                    </button>

                    <button
                      onClick={() => navigate('subs-dashboard')}
                      className="relative group flex flex-col items-center justify-center py-2 px-3 rounded-full transition-all focus:outline-none"
                    >
                      {currentScreen === 'subs-dashboard' && (
                        <motion.div
                          layoutId="navTabBg"
                          className="absolute inset-0 bg-cyan-500/15 border border-cyan-500/30 rounded-full"
                          transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        />
                      )}
                      <div className="relative flex flex-col items-center z-10">
                        <CreditCard className={`w-5 h-5 transition-colors ${currentScreen === 'subs-dashboard' ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]' : 'text-slate-400 hover:text-slate-300'}`} strokeWidth={currentScreen === 'subs-dashboard' ? 2.5 : 2} />
                        <span className={`text-[9px] font-bold tracking-wide uppercase mt-0.5 transition-colors ${currentScreen === 'subs-dashboard' ? 'text-cyan-400' : 'text-slate-500'}`}>Subs</span>
                      </div>
                    </button>

                    {/* Integrated Cyber Scanner Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate('scan-qr')}
                      className="relative flex items-center justify-center w-12 h-12 rounded-full mx-1 focus:outline-none"
                    >
                      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400 to-indigo-500 rounded-full blur-md opacity-60" />
                      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400 to-indigo-500 rounded-full border border-white/20" />
                      <Scan className="w-5 h-5 text-white relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]" strokeWidth={2.5} />
                    </motion.button>

                    <button
                      onClick={() => navigate('vault')}
                      className="relative group flex flex-col items-center justify-center py-2 px-3 rounded-full transition-all focus:outline-none"
                    >
                      {currentScreen === 'vault' && (
                        <motion.div
                          layoutId="navTabBg"
                          className="absolute inset-0 bg-cyan-500/15 border border-cyan-500/30 rounded-full"
                          transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        />
                      )}
                      <div className="relative flex flex-col items-center z-10">
                        <ShieldCheck className={`w-5 h-5 transition-colors ${currentScreen === 'vault' ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]' : 'text-slate-400 hover:text-slate-300'}`} strokeWidth={currentScreen === 'vault' ? 2.5 : 2} />
                        <span className={`text-[9px] font-bold tracking-wide uppercase mt-0.5 transition-colors ${currentScreen === 'vault' ? 'text-cyan-400' : 'text-slate-500'}`}>Vault</span>
                      </div>
                    </button>

                    <button
                      onClick={() => navigate('me-profile')}
                      className="relative group flex flex-col items-center justify-center py-2 px-3 rounded-full transition-all focus:outline-none"
                    >
                      {currentScreen === 'me-profile' && (
                        <motion.div
                          layoutId="navTabBg"
                          className="absolute inset-0 bg-cyan-500/15 border border-cyan-500/30 rounded-full"
                          transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        />
                      )}
                      <div className="relative flex flex-col items-center z-10">
                        <User className={`w-5 h-5 transition-colors ${currentScreen === 'me-profile' ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]' : 'text-slate-400 hover:text-slate-300'}`} strokeWidth={currentScreen === 'me-profile' ? 2.5 : 2} />
                        <span className={`text-[9px] font-bold tracking-wide uppercase mt-0.5 transition-colors ${currentScreen === 'me-profile' ? 'text-cyan-400' : 'text-slate-500'}`}>Profile</span>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </PhoneSimulator>
        </div>

        {/* 3. Empty div to maintain layout balance */}
        <div className="hidden md:flex flex-col text-left max-w-sm space-y-4">
        </div>

      </div>
    </div>
  );
}
