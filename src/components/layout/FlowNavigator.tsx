import React, { useState } from 'react';
import { ScreenId } from '../../types';
import { WifiOff, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const [collapsed, setCollapsed] = useState(false);

  if (collapsed) {
    return (
      <div className="flex flex-col items-center bg-slate-950/90 border-r border-slate-800/40 p-2 py-4 space-y-4">
        <button onClick={() => setCollapsed(false)} className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition">
          <ChevronRight className="w-4 h-4" />
        </button>
        <GuardiaLogo size={24} variant="icon" animated={false} />
        <div className="flex flex-col space-y-1 w-full items-center">
          {screenGroups.flatMap(g => g.screens).map(scr => (
            <button
              key={scr.id}
              onClick={() => navigate(scr.id)}
              title={scr.label}
              className={`w-7 h-7 rounded-lg text-[9px] font-bold transition ${
                currentScreen === scr.id
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                  : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
              }`}
            >
              {scr.label.charAt(0)}
            </button>
          ))}
        </div>
        <button
          onClick={() => setIsOffline(!isOffline)}
          className={`p-1.5 rounded-lg transition ${
            isOffline ? 'bg-red-500/20 text-red-400' : 'text-slate-500 hover:text-slate-300'
          }`}
          title={isOffline ? 'Offline' : 'Online'}
        >
          <WifiOff className={`w-3.5 h-3.5 ${isOffline ? 'animate-pulse' : ''}`} />
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-slate-950/95 border-r border-slate-800/40 w-56 shrink-0">
      <div className="flex items-center justify-between p-3 border-b border-slate-800/30">
        <div className="flex items-center space-x-2">
          <GuardiaLogo size={20} variant="icon" animated={false} />
          <span className="text-xs font-bold text-white tracking-tight">Guardia Studio</span>
        </div>
        <button onClick={() => setCollapsed(true)} className="p-1 rounded-md hover:bg-slate-800 text-slate-500 hover:text-white transition">
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex items-center px-3 py-1.5 border-b border-slate-800/20">
        <button
          onClick={() => setIsOffline(!isOffline)}
          className={`flex items-center space-x-1.5 px-2 py-1 rounded-md text-[10px] font-bold transition ${
            isOffline ? 'bg-red-500/15 text-red-400' : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          <WifiOff className={`w-3 h-3 ${isOffline ? 'animate-pulse' : ''}`} />
          <span>{isOffline ? 'Offline' : 'Online'}</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {screenGroups.map((group, groupIndex) => (
          <div key={groupIndex}>
            <div className="px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-slate-500 sticky top-0 bg-slate-950/95">
              {group.category}
            </div>
            {group.screens.map(scr => (
              <button
                key={scr.id}
                onClick={() => navigate(scr.id)}
                className={`w-full px-3 py-1.5 text-left text-[11px] font-medium transition border-l-2 ${
                  currentScreen === scr.id
                    ? 'bg-cyan-500/8 text-cyan-400 border-l-cyan-500'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30 border-l-transparent'
                }`}
              >
                {scr.label}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
