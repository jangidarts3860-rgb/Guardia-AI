import { motion, AnimatePresence } from 'motion/react';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AlertTriangle, X, XCircle, CheckCircle2 } from 'lucide-react';
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const target = document.getElementById('phone-viewport') || document.getElementById('pure-screen-container') || document.body;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={reduced ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduced ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-6"
        >
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onCancel} />
          <motion.div
            initial={reduced ? { scale: 1 } : { scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={reduced ? { scale: 1 } : { scale: 0.9, opacity: 0 }}
            transition={{ type: reduced ? 'tween' : 'spring', stiffness: 300, damping: 25 }}
            className="relative w-full max-w-sm bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-2xl"
          >
            <button onClick={onCancel} className="absolute top-4 right-4 p-1 rounded-lg hover:bg-neutral-800 transition" aria-label="Close dialog">
              <X className="w-4 h-4 text-neutral-400" />
            </button>

            <div className="flex flex-col items-center text-center space-y-4">
              {icon || (
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                  variant === 'danger' ? 'bg-error-500/10 border-error-500/30 border' :
                  variant === 'warning' ? 'bg-warning-500/10 border-warning-500/30 border' :
                  'bg-brand-500/10 border-brand-500/30 border'
                }`}>
                  <AlertTriangle className={`w-6 h-6 ${
                    variant === 'danger' ? 'text-error-500' :
                    variant === 'warning' ? 'text-warning-500' :
                    'text-brand-500'
                  }`} />
                </div>
              )}

              <div className="space-y-1">
                <h3 className="text-base font-bold text-white">{title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{message}</p>
              </div>

              <div className="flex flex-col w-full space-y-2 pt-2">
                <button
                  onClick={onConfirm}
                  disabled={confirmDisabled}
                  className={`w-full py-3 rounded-xl font-bold text-xs transition active:scale-[0.98] ${
                    variant === 'danger'
                      ? 'bg-error-600 hover:bg-error-500 text-white shadow-lg shadow-error-500/10 flex items-center justify-center space-x-2'
                      : variant === 'warning'
                        ? 'bg-warning-600 hover:bg-warning-500 text-white flex items-center justify-center space-x-2'
                        : 'bg-brand-500 hover:bg-brand-400 text-white flex items-center justify-center space-x-2'
                  } disabled:opacity-40 disabled:cursor-not-allowed`}
                >
                  {variant === 'danger' && <XCircle className="w-4 h-4" aria-hidden="true" />}
                  {variant === 'warning' && <AlertTriangle className="w-4 h-4" aria-hidden="true" />}
                  {variant === 'default' && <CheckCircle2 className="w-4 h-4" aria-hidden="true" />}
                  <span>{confirmLabel}</span>
                </button>
                <button
                  onClick={onCancel}
                  className="w-full py-3 rounded-xl font-bold text-xs text-neutral-400 hover:text-white bg-neutral-800/50 hover:bg-neutral-800 transition"
                >
                  {cancelLabel}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    target
  );
}
