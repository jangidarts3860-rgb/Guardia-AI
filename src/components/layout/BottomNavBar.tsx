import { useNavigate } from 'react-router-dom';
import { ScreenId } from '../../types';
import { Home, CreditCard, ShieldCheck, User, Scan } from 'lucide-react';

interface BottomNavBarProps {
  currentScreen: ScreenId;
}

export default function BottomNavBar({ currentScreen }: BottomNavBarProps) {
  const navigate = useNavigate();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, path: '/home' },
    { id: 'subs-dashboard', label: 'Subs', icon: CreditCard, path: '/subs-dashboard' },
    { id: 'security', label: 'Vault', icon: ShieldCheck, path: '/security' },
    { id: 'me-profile', label: 'Profile', icon: User, path: '/me-profile' },
  ];

  /* Split items into left pair (before scan) and right pair (after scan) */
  const leftItems = navItems.slice(0, 2);
  const rightItems = navItems.slice(2, 4);

  const renderNavButton = (item: typeof navItems[0]) => {
    const isActive = currentScreen === item.id;
    return (
      <button
        key={item.id}
        onClick={() => navigate(item.path)}
        className="relative flex flex-col items-center justify-center flex-1 h-14 transition-all duration-300 group"
      >
        <div className="relative flex flex-col items-center z-10 w-full h-full justify-center">
          <item.icon
            className={`w-5 h-5 transition-all duration-300 mt-2 ${isActive ? 'text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.7)] transform -translate-y-0.5' : 'text-slate-500 group-hover:text-slate-400'}`}
            strokeWidth={isActive ? 2.5 : 1.8}
          />
          <span className={`text-[9px] font-bold tracking-widest uppercase transition-all duration-300 mt-1 ${isActive ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]' : 'text-slate-600 group-hover:text-slate-500'}`}>
            {item.label}
          </span>
        </div>
      </button>
    );
  };

  return (
    <div className="relative pb-5 pt-6 px-4 w-full mt-auto">
      {/* Full-width Glassmorphism Bottom Frame (Opaque at bottom, fading up) */}
      <div className="absolute top-0 -bottom-10 left-0 right-0 bg-gradient-to-t from-[#020617] via-[#020617]/80 to-transparent backdrop-blur-xl border-t border-white/[0.02] shadow-[0_-10px_40px_rgba(0,0,0,0.5)] pointer-events-none mask-image-b" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 25%)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 25%)' }} />
      
      {/* Navbar Pill (Faded at edges) */}
      <div className="relative py-1.5 rounded-[2.5rem] border backdrop-blur-2xl bg-gradient-to-r from-slate-950/10 via-slate-950/80 to-slate-950/10 border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.08)] max-w-sm mx-auto pointer-events-auto">
        {/* 5 column grid: 2 left icons | center scan gap | 2 right icons */}
        <div className="grid grid-cols-5 items-center">
          {leftItems.map(renderNavButton)}

          {/* Empty center column — reserved for the floating scan FAB */}
          <div className="flex items-center justify-center" />

          {rightItems.map(renderNavButton)}
        </div>

        {/* Center Scan FAB — absolutely positioned over the gap */}
        <button
          onClick={() => navigate('/scan-qr')}
          className="absolute left-1/2 -translate-x-1/2 -top-3 flex items-center justify-center w-[52px] h-[52px] rounded-full shadow-[0_0_25px_rgba(34,211,238,0.3)] active:scale-95 transition-transform"
          aria-label="Scan QR"
        >
          <div
            className="absolute inset-0 p-[2px] rounded-full animate-spin"
            style={{ animationDuration: '3s', background: 'conic-gradient(from 0deg, #22d3ee, #6366f1, #06b6d4, #38bdf8, #22d3ee)' }}
            aria-hidden="true"
          >
            <div className="w-full h-full rounded-full bg-[#020617]" />
          </div>
          <div className="absolute inset-[3px] bg-gradient-to-br from-cyan-500/20 via-sky-500/10 to-indigo-500/20 rounded-full backdrop-blur-sm border border-white/20" aria-hidden="true" />
          <Scan className="w-5.5 h-5.5 text-white relative z-10 drop-shadow-lg" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
