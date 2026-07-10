import { motion, AnimatePresence } from 'motion/react';
import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

interface ConfirmationDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning' | 'default';
  onConfirm: () => void;
  onCancel: () => void;
  confirmDisabled?: boolean;
  icon?: React.ReactNode;
}

export default function ConfirmationDialog({
  open,
  title,
  message,
  confirmLabel,
  cancelLabel = 'Cancel',
  variant = 'default',
  onConfirm,
  onCancel,
  confirmDisabled = false,
  icon,
}: ConfirmationDialogProps) {
  const reduced = useReducedMotion();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={reduced ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduced ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="absolute inset-0 z-50 flex items-center justify-center p-6"
        >
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onCancel} />
          <motion.div
            initial={reduced ? { scale: 1 } : { scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={reduced ? { scale: 1 } : { scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="relative w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl"
          >
            <button onClick={onCancel} className="absolute top-4 right-4 p-1 rounded-lg hover:bg-slate-800 transition" aria-label="Close dialog">
              <X className="w-4 h-4 text-slate-400" />
            </button>

            <div className="flex flex-col items-center text-center space-y-4">
              {icon || (
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                  variant === 'danger' ? 'bg-red-500/10 border-red-500/30 border' :
                  variant === 'warning' ? 'bg-amber-500/10 border-amber-500/30 border' :
                  'bg-sky-500/10 border-sky-500/30 border'
                }`}>
                  <AlertTriangle className={`w-6 h-6 ${
                    variant === 'danger' ? 'text-red-500' :
                    variant === 'warning' ? 'text-amber-500' :
                    'text-sky-500'
                  }`} />
                </div>
              )}

              <div className="space-y-1">
                <h3 className="text-base font-bold text-white">{title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{message}</p>
              </div>

              <div className="flex flex-col w-full space-y-2 pt-2">
                <button
                  onClick={onConfirm}
                  disabled={confirmDisabled}
                  className={`w-full py-3 rounded-xl font-bold text-xs transition active:scale-[0.98] ${
                    variant === 'danger'
                      ? 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-500/10'
                      : variant === 'warning'
                        ? 'bg-amber-600 hover:bg-amber-500 text-white'
                        : 'bg-sky-500 hover:bg-sky-400 text-white'
                  } disabled:opacity-40 disabled:cursor-not-allowed`}
                >
                  {confirmLabel}
                </button>
                <button
                  onClick={onCancel}
                  className="w-full py-3 rounded-xl font-bold text-xs text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 transition"
                >
                  {cancelLabel}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
