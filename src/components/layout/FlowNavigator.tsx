import React from 'react';
import { ScreenId } from '../../types';
import { WifiOff, Settings } from 'lucide-react';
import GuardiaLogo from '../ui/GuardiaLogo';
import { screenGroups } from '../../constants/screenGroups';

interface FlowNavigatorProps {
  currentScreen: ScreenId;
  navigate: (screen: ScreenId) => void;
  isOffline: boolean;
  setIsOffline: (offline: boolean) => void;
}

export default function FlowNavigator({
  currentScreen,
  navigate,
  isOffline,
  setIsOffline
}: FlowNavigatorProps) {
  return (
    <div className="flex flex-col h-full bg-slate-900 border-r border-slate-800 p-5 space-y-6 overflow-y-auto text-left">

      {/* ── HEADER: Guardia AI Logo + Branding ── */}
      <div>
        <div className="flex items-center space-x-3">
          {/* Official Guardia Shield Logo */}
          <GuardiaLogo size={42} variant="icon" animated={false} />
          <div className="flex flex-col">
            <h1 className="text-lg font-black text-white tracking-tight leading-none">
              Guardia AI
            </h1>
            <span className="text-[9px] font-mono font-bold text-cyan-500/70 tracking-widest uppercase mt-0.5">
              Design Studio
            </span>
          </div>
        </div>
        <p className="text-xs text-slate-400 mt-3 leading-relaxed">
          Explore all <strong className="text-white font-semibold">29 UI/UX Screen States</strong> requested. Fully responsive navigation, smooth animations, and active flow states.
        </p>
      </div>

      {/* ── QUICK SIMULATION MODIFIERS ── */}
      <div className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-xl space-y-3">
        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-1">
          <Settings className="w-3 h-3 text-cyan-400 animate-spin" />
          <span>Interactive Preview Controls</span>
        </h3>
        <div className="flex flex-col space-y-2">
          <button
            onClick={() => setIsOffline(!isOffline)}
            className={`w-full px-3 py-2.5 rounded-xl text-xs font-bold border flex items-center justify-center space-x-2.5 transition duration-300 ${isOffline ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'}`}
          >
            <WifiOff className="w-4 h-4 animate-pulse" />
            <span>Simulate Network Status: {isOffline ? 'Offline Mode' : 'Online / Connected'}</span>
          </button>
        </div>
      </div>

      {/* ── SCROLLABLE SCREEN GROUPS ── */}
      <div className="space-y-5 flex-1 overflow-y-auto pr-1">
        {screenGroups.map((group, groupIndex) => {
          const GroupIcon = group.icon;
          return (
            <div key={groupIndex} className="space-y-2">
              <div className={`p-2 rounded-lg border flex items-center space-x-2 font-bold text-xs uppercase tracking-wider ${group.color}`}>
                <GroupIcon className="w-4 h-4 shrink-0" />
                <span>{group.category}</span>
              </div>
              <div className="space-y-1.5 pl-1">
                {group.screens.map((scr) => {
                  const isActive = currentScreen === scr.id;
                  return (
                    <button
                      key={scr.id}
                      onClick={() => navigate(scr.id)}
                      className={`w-full p-2.5 rounded-xl border text-left transition duration-200 group flex flex-col justify-between ${isActive ? 'bg-cyan-500/10 border-cyan-500 text-white shadow-md' : 'bg-slate-950/20 border-slate-800/40 text-slate-300 hover:bg-slate-800/50 hover:border-slate-700'}`}
                    >
                      <p className={`text-xs font-extrabold ${isActive ? 'text-cyan-400' : 'text-slate-200 group-hover:text-cyan-400 transition'}`}>
                        {scr.label}
                      </p>
                      <p className="text-[10px] text-slate-500 mt-1 leading-normal font-medium">
                        {scr.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
