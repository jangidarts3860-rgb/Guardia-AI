import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store';
import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera } from 'lucide-react';
import { AppIcons } from '../../ui/shared/AppIcons';



type ScanPhase = 'idle' | 'flash' | 'result';

export default function ScanQRScreen() {
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

  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [pasteText, setPasteText] = useState('');
  const [scanPhase, setScanPhase] = useState<ScanPhase>('idle');
  const [scanResult, setScanResult] = useState<'safe' | 'scam'>('safe');
  const cardBg = 'bg-slate-900/90 border-slate-800/80 text-white';
  const textMuted = 'text-slate-400';
  const inputBg = 'bg-slate-950/80 border-slate-800/80 text-white focus:bg-slate-950';

  const handleScan = useCallback((outcome: 'safe' | 'scam') => {
    setScanResult(outcome);
    setScanPhase('flash');
    setTimeout(() => setScanPhase('result'), 200);
    setTimeout(() => {
      setScanOutcome(outcome);
      navigate('/analyzing-merchant');
      setScanPhase('idle');
    }, 600);
  }, [setScanOutcome, navigate]);

  const bracketColor = scanPhase === 'result'
    ? (scanResult === 'safe' ? 'border-emerald-400' : 'border-red-500')
    : 'border-cyan-400';

  const bracketShadow = scanPhase === 'result'
    ? (scanResult === 'safe' ? 'shadow-[0_0_40px_rgba(52,211,153,0.3)]' : 'shadow-[0_0_40px_rgba(239,68,68,0.3)]')
    : 'shadow-[0_0_60px_rgba(6,182,212,0.08)]';

  return (
    <div className="flex flex-col min-h-full bg-slate-950 text-white">
      <div className="p-4 flex justify-between items-center border-b border-slate-800/10 shrink-0">
        <h2 className="text-base font-bold">Scan QR Code</h2>
        <button onClick={() => navigate('/home')} className="p-1.5 rounded-lg border border-slate-800/30 text-xs hover:bg-slate-900/30 focus-visible:ring-2 focus-visible:ring-sky-500" aria-label="Close scanner">Close</button>
      </div>

      {!hasCameraPermission ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-4 text-center bg-slate-900/40 relative">
          <div className="w-16 h-16 rounded-full bg-slate-800 border border-slate-700/60 flex items-center justify-center text-slate-500">
            <Camera className="w-7 h-7 text-cyan-400" />
          </div>
          <div className="space-y-1.5 max-w-[240px]">
            <h3 className="font-bold text-sm">Camera Permission Required</h3>
            <p className={`text-xs ${textMuted} leading-relaxed`}>Scan QR codes to check if a merchant is safe.</p>
          </div>
          <button onClick={() => setHasCameraPermission(true)} className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black uppercase tracking-wider rounded-xl shadow-md transition active:scale-95 focus-visible:ring-2 focus-visible:ring-cyan-500">
            Allow Access
          </button>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex-1 relative bg-black overflow-hidden flex flex-col justify-between p-4 min-h-[300px]">


          <AnimatePresence>
            {scanPhase === 'flash' && (
              <motion.div
                key="flash"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="absolute inset-0 bg-white z-50 pointer-events-none"
                aria-hidden="true"
              />
            )}
          </AnimatePresence>

          <div className="z-10 flex justify-center pt-2">
            <div className={`bg-slate-900/90 border px-3.5 py-1.5 rounded-full flex items-center space-x-2 shadow-2xl transition-colors ${
              scanPhase === 'result'
                ? (scanResult === 'safe' ? 'border-emerald-500/40' : 'border-red-500/40')
                : 'border-slate-800/80'
            }`}>
              <div className={`w-2 h-2 rounded-full transition-colors ${
                scanPhase === 'result'
                  ? (scanResult === 'safe' ? 'bg-emerald-400' : 'bg-red-500')
                  : 'bg-cyan-400'
              }`} aria-hidden="true" />
              <span className={`text-xs font-black tracking-widest font-mono uppercase transition-colors ${
                scanPhase === 'result'
                  ? (scanResult === 'safe' ? 'text-emerald-400' : 'text-red-500')
                  : 'text-cyan-400'
              }`}>
                {scanPhase === 'result' ? (scanResult === 'safe' ? 'SAFE • NO THREAT DETECTED' : 'SCAM • FRAUD FLAGGED') : 'SCANNING...'}
              </span>
            </div>
          </div>

          <div className="z-10 flex-1 flex items-center justify-center my-4 relative cursor-pointer" onClick={() => { if (scanPhase === 'idle') handleScan(Math.random() > 0.45 ? 'safe' : 'scam'); }} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' && scanPhase === 'idle') handleScan(Math.random() > 0.45 ? 'safe' : 'scam'); }} aria-label="Tap to scan QR code">
            <div className={`w-52 h-52 relative border flex items-center justify-center rounded-lg transition-all duration-300 ${bracketShadow} ${
              scanPhase === 'result'
                ? (scanResult === 'safe' ? 'bg-emerald-500/[0.04] border-emerald-500/30' : 'bg-red-500/[0.04] border-red-500/30')
                : 'bg-cyan-500/[0.02] border-cyan-500/10'
            }`}>
              <div className={`absolute top-0 left-0 w-6 h-6 rounded-tl-md transition-colors duration-300 border-t-4 border-l-4 ${bracketColor}`} />
              <div className={`absolute top-0 right-0 w-6 h-6 rounded-tr-md transition-colors duration-300 border-t-4 border-r-4 ${bracketColor}`} />
              <div className={`absolute bottom-0 left-0 w-6 h-6 rounded-bl-md transition-colors duration-300 border-b-4 border-l-4 ${bracketColor}`} />
              <div className={`absolute bottom-0 right-0 w-6 h-6 rounded-br-md transition-colors duration-300 border-b-4 border-r-4 ${bracketColor}`} />
              <div className="w-2.5 h-2.5 rounded-full opacity-75 absolute" aria-hidden="true" />
              <span className="text-xs font-mono font-bold tracking-widest text-cyan-400/35 uppercase select-none mt-10">ALIGN QR CODE HERE</span>
            </div>
          </div>

          <div className="flex justify-center z-10 mb-4 mt-2">
            <button onClick={() => { if (scanPhase === 'idle') handleScan(Math.random() > 0.45 ? 'safe' : 'scam'); }} className="w-16 h-16 rounded-full bg-cyan-500 hover:bg-cyan-400 border-[4px] border-slate-900 shadow-[0_0_0_2px_rgba(6,182,212,0.5)] flex items-center justify-center transition active:scale-90 focus-visible:ring-2 focus-visible:ring-cyan-500 disabled:opacity-50" disabled={scanPhase !== 'idle'} aria-label="Start scan">
              <div className="w-12 h-12 rounded-full border-2 border-white/50" />
            </button>
          </div>

          <div className="z-10 text-center pb-4">
            <p className="text-xs font-medium text-slate-300">Align QR code inside the brackets</p>
          </div>
        </motion.div>
      )}

      <div className={`p-4 border-t rounded-t-3xl space-y-4 text-left shrink-0 ${cardBg}`}>
        <div className="w-12 h-1 bg-slate-800 rounded-full mx-auto -mt-1.5 mb-2" />
        <span className={`text-xs font-bold tracking-wider uppercase ${textMuted}`}>Or verify a link / SMS</span>
        <div className="flex space-x-2">
          <input type="text" placeholder="Paste link or SMS content..." value={pasteText} onChange={(e) => setPasteText(e.target.value)}
            className={`flex-1 px-4 py-3 text-xs border rounded-xl focus:outline-none focus:border-sky-500 transition ${inputBg}`} aria-label="Paste link or SMS content"
          />
          <button onClick={() => { if (pasteText.trim()) navigate('/analyzing-merchant'); }} className="px-5 bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs rounded-xl transition focus-visible:ring-2 focus-visible:ring-sky-500" aria-label="Verify link">
            Verify
          </button>
        </div>

        <div className="space-y-2">
          <span className={`text-xs font-bold tracking-wider uppercase ${textMuted}`}>Recent Scans</span>
          <div className="space-y-2 max-h-36 overflow-y-auto">
            {[
              { name: 'Swiggy Instacart QR', score: '96/100 Safe', path: '/merchant-verified', color: 'text-emerald-500' },
              { name: 'Unknown UPI request', score: '12/100 Blocked', path: '/scam-detected', color: 'text-red-500' },
              { name: 'Amazon Pay QR', score: '91/100 Safe', path: '/merchant-verified', color: 'text-emerald-500' },
            ].map((item, i) => (
              <div key={i} onClick={() => navigate(item.path as '/merchant-verified' | '/scam-detected')} className={`p-3 rounded-xl border border-l-2 flex items-center justify-between cursor-pointer hover:border-slate-700 text-xs ${cardBg} ${item.color === 'text-emerald-500' ? 'border-l-emerald-500' : 'border-l-red-500'}`}>
                <span className="font-semibold">{item.name}</span>
                <span className={`${item.color} font-bold px-2 py-0.5 rounded text-xs ${item.color === 'text-emerald-500' ? 'bg-emerald-500/10' : 'bg-red-500/10'}`}>{item.score}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

