import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

interface ToastItem {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

let toastListeners: ((toast: ToastItem) => void)[] = [];

export function showToast(type: ToastItem['type'], message: string) {
  const toast: ToastItem = { id: Date.now().toString(), type, message };
  toastListeners.forEach(fn => fn(toast));
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const reduced = useReducedMotion();

  useEffect(() => {
    const handler = (t: ToastItem) => {
      setToasts(prev => [...prev, t]);
      setTimeout(() => {
        setToasts(prev => prev.filter(x => x.id !== t.id));
      }, 3500);
    };
    toastListeners.push(handler);
    return () => { toastListeners = toastListeners.filter(fn => fn !== handler); };
  }, []);

  const dismiss = (id: string) => setToasts(prev => prev.filter(t => t.id !== id));

  const iconMap = {
    success: (
      <>
        <CheckCircle2 className="w-4 h-4 text-emerald-400" aria-hidden="true" />
        <span className="sr-only">Success</span>
      </>
    ),
    error: (
      <>
        <XCircle className="w-4 h-4 text-red-400" aria-hidden="true" />
        <span className="sr-only">Error</span>
      </>
    ),
    warning: (
      <>
        <AlertTriangle className="w-4 h-4 text-amber-400" aria-hidden="true" />
        <span className="sr-only">Warning</span>
      </>
    ),
    info: (
      <>
        <Info className="w-4 h-4 text-sky-400" aria-hidden="true" />
        <span className="sr-only">Info</span>
      </>
    ),
  };

  const borderMap = {
    success: 'border-emerald-500/20',
    error: 'border-red-500/20',
    warning: 'border-amber-500/20',
    info: 'border-sky-500/20',
  };

  return (
    <div className="absolute bottom-20 left-4 right-4 z-[60] flex flex-col space-y-2 pointer-events-none" role="log" aria-live="polite" aria-label="Notifications">
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div
            key={t.id}
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className={`pointer-events-auto flex items-center space-x-2.5 px-4 py-3 rounded-2xl border bg-slate-900/95 backdrop-blur-md shadow-xl ${borderMap[t.type]}`}
          >
            {iconMap[t.type]}
            <span className="text-xs text-slate-200 font-medium flex-1">{t.message}</span>
            <button onClick={() => dismiss(t.id)} className="p-0.5 rounded hover:bg-slate-800 transition" aria-label="Dismiss">
              <X className="w-3.5 h-3.5 text-slate-500" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
