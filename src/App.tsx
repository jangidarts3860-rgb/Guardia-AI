import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ScreenId } from './types';
import FlowNavigator from './components/layout/FlowNavigator';
import PhoneSimulator from './components/layout/PhoneSimulator';
import Screens from './components/screens/Screens';
import ToastContainer from './components/ui/shared/Toast';
import BottomNavBar from './components/layout/BottomNavBar';
import { useStore } from './store';
import { getGlowColors } from './constants/glowConfig';

export default function App() {
  const isDev = (typeof import.meta !== 'undefined' && import.meta.env?.DEV) || (typeof window !== 'undefined' && (window.location.search.includes('dev=true') || window.location.search.includes('debug=true') || window.location.search.includes('explorer=true')));
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
  const currentPath = location.pathname.replace(/^\/+/, '');
  const currentScreen = (currentPath || 'splash') as ScreenId;

  const { isOffline, setIsOffline } = useStore();

  const showBottomBar = ['home', 'subs-dashboard', 'security', 'me-profile'].includes(currentScreen);
  const isScreenshotMode = window.location.search.includes('screenshot=1');

  if (isScreenshotMode) {
    return (
      <div id="pure-screen-container" style={{ width: 390, height: 844, overflow: 'hidden', background: '#020617', position: 'relative', display: 'flex', flexDirection: 'column' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, isolation: 'isolate' }} aria-hidden="true">
          {(function() { const c = getGlowColors(currentScreen); return <>
            <div className="absolute top-[-10%] left-[-20%] w-[120%] h-[60%] rounded-full blur-[80px] mix-blend-screen animate-blob" style={{ transform: 'translateZ(0)', willChange: 'transform, filter', background: c.blob1 }} />
            <div className="absolute top-[10%] right-[-20%] w-[80%] h-[50%] rounded-full blur-[80px] mix-blend-screen animate-blob-reverse" style={{ transform: 'translateZ(0)', willChange: 'transform, filter', background: c.blob2 }} />
            <div className="absolute bottom-[-8%] left-[25%] w-[60%] h-[35%] rounded-full blur-[70px] mix-blend-screen animate-blob" style={{ transform: 'translateZ(0)', willChange: 'transform, filter', background: c.blob3, animationDelay: '-8s' }} />
          </>})()}
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(2,6,23,0.2)', pointerEvents: 'none', zIndex: 1 }} />
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2, opacity: 0.025, backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.5\'/%3E%3C/svg%3E")', backgroundRepeat: 'repeat', backgroundSize: '192px 192px' }} />
        </div>
        <div style={{ flex: 1, overflow: 'hidden', position: 'relative', zIndex: 1 }}>
          <Screens />
          <ToastContainer />
        </div>
        {showBottomBar && (
          <div style={{ position: 'absolute', bottom: 16, left: 0, right: 0, zIndex: 50 }}>
            <BottomNavBar currentScreen={currentScreen} />
          </div>
        )}
      </div>
    );
  }

  if (isMobileDevice) {
    return (
      <div className="w-full h-[100dvh] bg-[#020617] flex flex-col relative overflow-hidden font-sans">
        <div className="absolute top-[0%] left-[0%] w-[100%] h-[100%] pointer-events-none z-0 isolate" aria-hidden="true">
          {(function() { const c = getGlowColors(currentScreen); return <>
            <div className="absolute top-[-10%] left-[-20%] w-[120%] h-[60%] rounded-full blur-[80px] mix-blend-screen animate-blob transform-gpu will-change-transform will-change-filter" style={{ background: c.blob1 }} />
            <div className="absolute top-[10%] right-[-20%] w-[80%] h-[50%] rounded-full blur-[80px] mix-blend-screen animate-blob-reverse transform-gpu will-change-transform will-change-filter" style={{ background: c.blob2 }} />
            <div className="absolute bottom-[-8%] left-[25%] w-[60%] h-[35%] rounded-full blur-[70px] mix-blend-screen animate-blob transform-gpu will-change-transform will-change-filter" style={{ background: c.blob3, animationDelay: '-8s' }} />
          </>})()}
          <div className="absolute inset-0 bg-[#020617]/20 pointer-events-none z-[1]" />
          <div className="absolute inset-0 pointer-events-none z-[2] opacity-[0.025]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.5\'/%3E%3C/svg%3E")', backgroundRepeat: 'repeat', backgroundSize: '192px 192px' }} />
        </div>
        <div className="flex-1 overflow-y-auto overflow-x-hidden relative z-10">
          <Screens />
          <ToastContainer />
        </div>
        {showBottomBar && (
          <div className="absolute bottom-0 left-0 right-0 z-50 pointer-events-none">
            <div className="pointer-events-auto">
              <BottomNavBar currentScreen={currentScreen} />
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] flex font-sans overflow-hidden relative isolate">
      {/* Global Ambient Glow — Per-Screen Adaptive */}
      {(function() { const c = getGlowColors(currentScreen); return <>
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[70%] rounded-full blur-[140px] pointer-events-none z-0 mix-blend-screen animate-blob transform-gpu will-change-transform will-change-filter" style={{ background: c.blob1 }} aria-hidden="true" />
        <div className="absolute top-[10%] right-[10%] w-[40%] h-[50%] rounded-full blur-[120px] pointer-events-none z-0 mix-blend-screen animate-blob-reverse transform-gpu will-change-transform will-change-filter" style={{ background: c.blob2 }} aria-hidden="true" />
        <div className="absolute bottom-0 left-[30%] w-[40%] h-[35%] rounded-full blur-[100px] pointer-events-none z-0 mix-blend-screen animate-blob transform-gpu will-change-transform will-change-filter" style={{ background: c.blob3, animationDelay: '-8s' }} aria-hidden="true" />
      </>})()}
      <div className="absolute inset-0 bg-[#020617]/15 pointer-events-none z-0" aria-hidden="true" />
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.025]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.5\'/%3E%3C/svg%3E")', backgroundRepeat: 'repeat', backgroundSize: '192px 192px' }} aria-hidden="true" />
      {isDev && <FlowNavigator currentScreen={currentScreen} navigate={(s) => navigate('/' + s)} isOffline={isOffline} setIsOffline={setIsOffline} />}
      <div className="flex-1 flex flex-col items-center justify-center p-4 lg:p-8 relative z-10">
        <PhoneSimulator isOffline={isOffline} currentScreen={currentScreen}
          bottomNav={showBottomBar ? (
            <BottomNavBar currentScreen={currentScreen} />
          ) : undefined}
        >
          <Screens />
          <ToastContainer />
        </PhoneSimulator>
      </div>
    </div>
  );
}
