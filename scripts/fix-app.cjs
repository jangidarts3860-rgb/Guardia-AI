const fs = require('fs');

const appTsx = `import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ScreenId } from './types';
import FlowNavigator from './components/layout/FlowNavigator';
import PhoneSimulator from './components/layout/PhoneSimulator';
import Screens from './components/screens/Screens';
import ToastContainer from './components/ui/shared/Toast';
import { Home, CreditCard, ShieldCheck, User, Scan } from 'lucide-react';
import { motion } from 'motion/react';
import { useStore } from './store';

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

  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname.replace(/^\\/+/, '');
  const currentScreen = (currentPath || 'splash') as ScreenId;

  const { isLightMode } = useStore();

  const showBottomBar = ['home', 'subs-dashboard', 'vault', 'me-profile'].includes(currentScreen);
  const isScreenshotMode = window.location.search.includes('screenshot=1');

  if (isScreenshotMode) {
    return (
      <div id="pure-screen-container" style={{ width: 390, height: 844, overflow: 'hidden', background: '#020617', position: 'relative', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
          <Screens />
          <ToastContainer />
        </div>
        {showBottomBar && (
          <div style={{ position: 'absolute', bottom: 24, left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 50 }}>
            <div className="flex justify-between items-center px-2 py-2 rounded-full border backdrop-blur-xl bg-slate-900/60 border-slate-700/50 shadow-black/80 shadow-2xl w-[320px]">
              <button onClick={() => navigate('/home')} className="relative flex flex-col items-center justify-center py-2 px-3 rounded-full transition-all">
                {currentScreen === 'home' && <motion.div layoutId="ssNavBg" className="absolute inset-0 bg-cyan-500/15 border border-cyan-500/30 rounded-full" />}
                <div className="relative flex flex-col items-center z-10">
                  <Home className={\`w-5 h-5 \${currentScreen === 'home' ? 'text-cyan-400' : 'text-slate-400'}\`} strokeWidth={currentScreen === 'home' ? 2.5 : 2} />
                  <span className={\`text-[9px] font-bold tracking-wide uppercase mt-0.5 \${currentScreen === 'home' ? 'text-cyan-400' : 'text-slate-500'}\`}>Home</span>
                </div>
              </button>
              <button onClick={() => navigate('/subs-dashboard')} className="relative flex flex-col items-center justify-center py-2 px-3 rounded-full transition-all">
                {currentScreen === 'subs-dashboard' && <motion.div layoutId="ssNavBg" className="absolute inset-0 bg-cyan-500/15 border border-cyan-500/30 rounded-full" />}
                <div className="relative flex flex-col items-center z-10">
                  <CreditCard className={\`w-5 h-5 \${currentScreen === 'subs-dashboard' ? 'text-cyan-400' : 'text-slate-400'}\`} strokeWidth={currentScreen === 'subs-dashboard' ? 2.5 : 2} />
                  <span className={\`text-[9px] font-bold tracking-wide uppercase mt-0.5 \${currentScreen === 'subs-dashboard' ? 'text-cyan-400' : 'text-slate-500'}\`}>Subs</span>
                </div>
              </button>
              <motion.button whileTap={{ scale: 0.95 }} onClick={() => navigate('/scan-qr')} className="relative flex items-center justify-center w-12 h-12 rounded-full mx-1">
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400 to-indigo-500 rounded-full blur-md opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400 to-indigo-500 rounded-full border border-white/20" />
                <Scan className="w-5 h-5 text-white relative z-10" strokeWidth={2.5} />
              </motion.button>
              <button onClick={() => navigate('/vault')} className="relative flex flex-col items-center justify-center py-2 px-3 rounded-full transition-all">
                {currentScreen === 'vault' && <motion.div layoutId="ssNavBg" className="absolute inset-0 bg-cyan-500/15 border border-cyan-500/30 rounded-full" />}
                <div className="relative flex flex-col items-center z-10">
                  <ShieldCheck className={\`w-5 h-5 \${currentScreen === 'vault' ? 'text-cyan-400' : 'text-slate-400'}\`} strokeWidth={currentScreen === 'vault' ? 2.5 : 2} />
                  <span className={\`text-[9px] font-bold tracking-wide uppercase mt-0.5 \${currentScreen === 'vault' ? 'text-cyan-400' : 'text-slate-500'}\`}>Vault</span>
                </div>
              </button>
              <button onClick={() => navigate('/me-profile')} className="relative flex flex-col items-center justify-center py-2 px-3 rounded-full transition-all">
                {currentScreen === 'me-profile' && <motion.div layoutId="ssNavBg" className="absolute inset-0 bg-cyan-500/15 border border-cyan-500/30 rounded-full" />}
                <div className="relative flex flex-col items-center z-10">
                  <User className={\`w-5 h-5 \${currentScreen === 'me-profile' ? 'text-cyan-400' : 'text-slate-400'}\`} strokeWidth={currentScreen === 'me-profile' ? 2.5 : 2} />
                  <span className={\`text-[9px] font-bold tracking-wide uppercase mt-0.5 \${currentScreen === 'me-profile' ? 'text-cyan-400' : 'text-slate-500'}\`}>Profile</span>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (isMobileDevice) {
    return (
      <div className="w-full h-[100dvh] bg-slate-950 flex flex-col relative overflow-hidden font-sans">
        <div className="absolute top-[-10%] right-[-10%] w-[120%] h-[120%] pointer-events-none z-0">
          <div className={\`absolute top-0 right-0 w-96 h-96 rounded-full blur-[100px] opacity-40 transition-colors duration-1000 \${isLightMode ? 'bg-sky-200' : 'bg-cyan-500/10'}\`} />
          <div className={\`absolute bottom-0 left-0 w-80 h-80 rounded-full blur-[100px] opacity-30 transition-colors duration-1000 \${isLightMode ? 'bg-indigo-100' : 'bg-indigo-500/10'}\`} />
        </div>
        <div className="flex-1 overflow-y-auto overflow-x-hidden relative z-10">
          <Screens />
          <ToastContainer />
        </div>
        {showBottomBar && (
          <div className="absolute bottom-0 left-0 right-0 pb-6 pt-4 px-4 bg-gradient-to-t from-slate-950 via-slate-950/95 to-transparent z-50">
            <div className="flex justify-between items-center px-2 py-2 rounded-full border backdrop-blur-xl bg-slate-900/60 border-slate-700/50 shadow-black/80 shadow-2xl max-w-sm mx-auto">
              <button onClick={() => navigate('/home')} className="relative flex flex-col items-center justify-center py-2 px-3 rounded-full transition-all">
                {currentScreen === 'home' && <motion.div layoutId="navBg" className="absolute inset-0 bg-cyan-500/15 border border-cyan-500/30 rounded-full" />}
                <div className="relative flex flex-col items-center z-10">
                  <Home className={\`w-5 h-5 \${currentScreen === 'home' ? 'text-cyan-400' : 'text-slate-400'}\`} strokeWidth={currentScreen === 'home' ? 2.5 : 2} />
                  <span className={\`text-[9px] font-bold tracking-wide uppercase mt-0.5 \${currentScreen === 'home' ? 'text-cyan-400' : 'text-slate-500'}\`}>Home</span>
                </div>
              </button>
              <button onClick={() => navigate('/subs-dashboard')} className="relative flex flex-col items-center justify-center py-2 px-3 rounded-full transition-all">
                {currentScreen === 'subs-dashboard' && <motion.div layoutId="navBg" className="absolute inset-0 bg-cyan-500/15 border border-cyan-500/30 rounded-full" />}
                <div className="relative flex flex-col items-center z-10">
                  <CreditCard className={\`w-5 h-5 \${currentScreen === 'subs-dashboard' ? 'text-cyan-400' : 'text-slate-400'}\`} strokeWidth={currentScreen === 'subs-dashboard' ? 2.5 : 2} />
                  <span className={\`text-[9px] font-bold tracking-wide uppercase mt-0.5 \${currentScreen === 'subs-dashboard' ? 'text-cyan-400' : 'text-slate-500'}\`}>Subs</span>
                </div>
              </button>
              <motion.button whileTap={{ scale: 0.95 }} onClick={() => navigate('/scan-qr')} className="relative flex items-center justify-center w-12 h-12 rounded-full mx-1">
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400 to-indigo-500 rounded-full blur-md opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400 to-indigo-500 rounded-full border border-white/20" />
                <Scan className="w-5 h-5 text-white relative z-10" strokeWidth={2.5} />
              </motion.button>
              <button onClick={() => navigate('/vault')} className="relative flex flex-col items-center justify-center py-2 px-3 rounded-full transition-all">
                {currentScreen === 'vault' && <motion.div layoutId="navBg" className="absolute inset-0 bg-cyan-500/15 border border-cyan-500/30 rounded-full" />}
                <div className="relative flex flex-col items-center z-10">
                  <ShieldCheck className={\`w-5 h-5 \${currentScreen === 'vault' ? 'text-cyan-400' : 'text-slate-400'}\`} strokeWidth={currentScreen === 'vault' ? 2.5 : 2} />
                  <span className={\`text-[9px] font-bold tracking-wide uppercase mt-0.5 \${currentScreen === 'vault' ? 'text-cyan-400' : 'text-slate-500'}\`}>Vault</span>
                </div>
              </button>
              <button onClick={() => navigate('/me-profile')} className="relative flex flex-col items-center justify-center py-2 px-3 rounded-full transition-all">
                {currentScreen === 'me-profile' && <motion.div layoutId="navBg" className="absolute inset-0 bg-cyan-500/15 border border-cyan-500/30 rounded-full" />}
                <div className="relative flex flex-col items-center z-10">
                  <User className={\`w-5 h-5 \${currentScreen === 'me-profile' ? 'text-cyan-400' : 'text-slate-400'}\`} strokeWidth={currentScreen === 'me-profile' ? 2.5 : 2} />
                  <span className={\`text-[9px] font-bold tracking-wide uppercase mt-0.5 \${currentScreen === 'me-profile' ? 'text-cyan-400' : 'text-slate-500'}\`}>Profile</span>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex font-sans overflow-hidden">
      {isDev && <FlowNavigator currentScreen={currentScreen} onNavigate={(s) => navigate('/' + s)} />}
      <div className="flex-1 flex flex-col items-center justify-center p-4 lg:p-8 relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
        <PhoneSimulator isLightMode={isLightMode}>
          <Screens />
          <ToastContainer />
          
          {showBottomBar && (
            <div className="absolute bottom-0 left-0 right-0 pb-8 pt-4 px-6 bg-gradient-to-t from-slate-950 via-slate-950/95 to-transparent z-50">
              <div className="flex justify-between items-center px-2 py-2 rounded-full border backdrop-blur-xl bg-slate-900/60 border-slate-700/50 shadow-black/80 shadow-2xl">
                <button onClick={() => navigate('/home')} className="relative flex flex-col items-center justify-center py-2 px-3 rounded-full transition-all">
                  {currentScreen === 'home' && <motion.div layoutId="navBgSim" className="absolute inset-0 bg-cyan-500/15 border border-cyan-500/30 rounded-full" />}
                  <div className="relative flex flex-col items-center z-10">
                    <Home className={\`w-5 h-5 \${currentScreen === 'home' ? 'text-cyan-400' : 'text-slate-400'}\`} strokeWidth={currentScreen === 'home' ? 2.5 : 2} />
                    <span className={\`text-[9px] font-bold tracking-wide uppercase mt-0.5 \${currentScreen === 'home' ? 'text-cyan-400' : 'text-slate-500'}\`}>Home</span>
                  </div>
                </button>
                <button onClick={() => navigate('/subs-dashboard')} className="relative flex flex-col items-center justify-center py-2 px-3 rounded-full transition-all">
                  {currentScreen === 'subs-dashboard' && <motion.div layoutId="navBgSim" className="absolute inset-0 bg-cyan-500/15 border border-cyan-500/30 rounded-full" />}
                  <div className="relative flex flex-col items-center z-10">
                    <CreditCard className={\`w-5 h-5 \${currentScreen === 'subs-dashboard' ? 'text-cyan-400' : 'text-slate-400'}\`} strokeWidth={currentScreen === 'subs-dashboard' ? 2.5 : 2} />
                    <span className={\`text-[9px] font-bold tracking-wide uppercase mt-0.5 \${currentScreen === 'subs-dashboard' ? 'text-cyan-400' : 'text-slate-500'}\`}>Subs</span>
                  </div>
                </button>
                <motion.button whileTap={{ scale: 0.95 }} onClick={() => navigate('/scan-qr')} className="relative flex items-center justify-center w-12 h-12 rounded-full mx-1">
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400 to-indigo-500 rounded-full blur-md opacity-60" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400 to-indigo-500 rounded-full border border-white/20" />
                  <Scan className="w-5 h-5 text-white relative z-10" strokeWidth={2.5} />
                </motion.button>
                <button onClick={() => navigate('/vault')} className="relative flex flex-col items-center justify-center py-2 px-3 rounded-full transition-all">
                  {currentScreen === 'vault' && <motion.div layoutId="navBgSim" className="absolute inset-0 bg-cyan-500/15 border border-cyan-500/30 rounded-full" />}
                  <div className="relative flex flex-col items-center z-10">
                    <ShieldCheck className={\`w-5 h-5 \${currentScreen === 'vault' ? 'text-cyan-400' : 'text-slate-400'}\`} strokeWidth={currentScreen === 'vault' ? 2.5 : 2} />
                    <span className={\`text-[9px] font-bold tracking-wide uppercase mt-0.5 \${currentScreen === 'vault' ? 'text-cyan-400' : 'text-slate-500'}\`}>Vault</span>
                  </div>
                </button>
                <button onClick={() => navigate('/me-profile')} className="relative flex flex-col items-center justify-center py-2 px-3 rounded-full transition-all">
                  {currentScreen === 'me-profile' && <motion.div layoutId="navBgSim" className="absolute inset-0 bg-cyan-500/15 border border-cyan-500/30 rounded-full" />}
                  <div className="relative flex flex-col items-center z-10">
                    <User className={\`w-5 h-5 \${currentScreen === 'me-profile' ? 'text-cyan-400' : 'text-slate-400'}\`} strokeWidth={currentScreen === 'me-profile' ? 2.5 : 2} />
                    <span className={\`text-[9px] font-bold tracking-wide uppercase mt-0.5 \${currentScreen === 'me-profile' ? 'text-cyan-400' : 'text-slate-500'}\`}>Profile</span>
                  </div>
                </button>
              </div>
            </div>
          )}
        </PhoneSimulator>
      </div>
    </div>
  );
}
`;

fs.writeFileSync('c:/Users/Dell/Downloads/guardia-ai/src/App.tsx', appTsx, 'utf8');
console.log('Fixed App.tsx successfully');
