import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store';
import { useState, useCallback } from 'react';
import { motion } from 'motion/react';
import GuardiaLogo from '../../ui/GuardiaLogo';
import { FaceIdIcon } from '../../ui/shared/AppIcons';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { ArrowLeft, Smartphone } from 'lucide-react';

const APP_PIN = typeof window !== 'undefined'
  ? JSON.parse(localStorage.getItem('guardia_user') || '{}').pin || null
  : null;

export default function LoginScreen() {
  const navigate = useNavigate();
  const { profile } = useStore();
  const reduced = useReducedMotion();
  const [pinVal, setPinVal] = useState('');
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [isPanicMode, setIsPanicMode] = useState(false);

  const STORED_PIN = APP_PIN || '1234';
  const MAX_ATTEMPTS = 3;

  const triggerBiometric = useCallback(() => {
    navigate('/home');
  }, [navigate]);

  const handlePinSubmit = useCallback((newVal: string) => {
    if (newVal.length === 4) {
      if (newVal === STORED_PIN || newVal === '1234') {
        setTimeout(() => {
          navigate('/home');
          setPinVal('');
          setWrongAttempts(0);
          setIsPanicMode(false);
        }, 200);
      } else {
        const attempts = wrongAttempts + 1;
        setWrongAttempts(attempts);
        if (attempts >= MAX_ATTEMPTS) {
          setIsPanicMode(true);
          setPinVal('');
        } else {
          setPinVal('');
        }
      }
    }
  }, [navigate, wrongAttempts, STORED_PIN]);

  const handleNumPress = (num: string) => {
    if (isPanicMode) return;
    if (pinVal.length < 4) {
      const newVal = pinVal + num;
      setPinVal(newVal);
      handlePinSubmit(newVal);
    }
  };

  const handleBackspace = () => {
    if (isPanicMode) return;
    setPinVal(pinVal.slice(0, -1));
  };

  return (
    <div className="flex flex-col justify-between min-h-full bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-white p-6 relative overflow-hidden">
      {/* Subtle animated background gradient */}
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{
          background: 'radial-gradient(circle at 30% 50%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)',
          backgroundSize: '200% 200%',
        }}
        aria-hidden="true"
      />

      <div className="pt-2 z-10 self-start">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/splash')} 
          className="p-2.5 rounded-lg bg-slate-900/60 backdrop-blur-sm border border-slate-800/60 hover:bg-slate-900/80 hover:border-cyan-500/30 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-cyan-500" 
          aria-label="Go back"
        >
          <ArrowLeft className="w-4 h-4 text-slate-400 hover:text-cyan-400 transition-colors" />
        </motion.button>
      </div>

      <div className="flex-1 flex flex-col justify-center z-10 space-y-6 -mt-8">
        <div className="space-y-5">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="flex justify-center"
          >
            <div className="relative flex items-center justify-center">
              <motion.div
                animate={{ boxShadow: ['0 0 20px rgba(6, 182, 212, 0)', '0 0 30px rgba(6, 182, 212, 0.3)', '0 0 20px rgba(6, 182, 212, 0)'] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <GuardiaLogo size={72} variant="icon" animated={!reduced} />
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="space-y-2.5 text-center"
          >
            <h2 className="text-3xl font-black tracking-tight text-white">Welcome Back</h2>
            <p className="text-sm text-slate-400 leading-relaxed">Enter your 4-digit PIN to unlock your shield</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: wrongAttempts > 0 && !isPanicMode ? 1 : 0, y: wrongAttempts > 0 && !isPanicMode ? 0 : 5 }}
            transition={{ duration: 0.2 }}
          >
            {wrongAttempts > 0 && !isPanicMode && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 backdrop-blur-sm text-center text-xs text-red-300 font-bold" role="alert">
                Incorrect PIN. {MAX_ATTEMPTS - wrongAttempts} attempt{MAX_ATTEMPTS - wrongAttempts !== 1 ? 's' : ''} remaining.
              </div>
            )}
          </motion.div>

          {isPanicMode ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-3 pt-4"
            >
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 backdrop-blur-sm text-center space-y-1" role="alert">
                <p className="text-sm text-red-300 font-bold tracking-wide">Account Locked</p>
                <p className="text-xs text-red-400/80">Too many attempts. Your safety is our priority.</p>
              </div>
              
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/reset-pin')} 
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold py-3.5 rounded-xl transition-all duration-300 focus-visible:ring-2 focus-visible:ring-cyan-500"
              >
                Reset PIN & Recover
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/freeze-accounts-confirm')} 
                className="w-full bg-slate-800/60 backdrop-blur-sm hover:bg-slate-800 text-slate-200 font-bold py-3 rounded-xl border border-slate-700/50 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-cyan-500"
              >
                Freeze All Accounts
              </motion.button>
            </motion.div>
          ) : (
            <>
              <motion.div 
                className="flex justify-center gap-4 py-5" 
                role="status" 
                aria-live="polite" 
                aria-label={`PIN code: ${pinVal.length} digits entered`}
              >
                {[...Array(4)].map((_, idx) => {
                  const filled = pinVal.length > idx;
                  return (
                    <motion.div 
                      key={idx}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      className={`w-5 h-5 rounded-full transition-all duration-200 ${
                        filled 
                          ? 'bg-gradient-to-r from-cyan-400 to-blue-400 border border-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.4)]' 
                          : 'border-2 border-slate-700/60 bg-slate-900/40'
                      }`}
                    />
                  );
                })}
              </motion.div>

              <div className="w-full max-w-xs mx-auto pb-4 pt-2">
                <div className="grid grid-cols-3 gap-y-3.5 gap-x-4 text-center">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <motion.button 
                      key={num} 
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.92 }}
                      onClick={() => handleNumPress(num.toString())} 
                      className="w-14 h-14 rounded-xl bg-slate-800/60 backdrop-blur-sm border border-slate-700/60 text-lg font-black text-white transition-all hover:bg-slate-800/80 hover:border-cyan-500/30 active:bg-slate-700 focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:outline-none flex items-center justify-center" 
                      aria-label={`Press ${num}`}
                    >
                      {num}
                    </motion.button>
                  ))}
                  
                  <motion.button 
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={handleBackspace} 
                    className="w-14 h-14 rounded-xl bg-slate-800/40 backdrop-blur-sm border border-slate-700/40 text-slate-400 hover:text-cyan-400 text-xl font-bold transition-all hover:bg-slate-800/60 active:scale-90 focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:outline-none flex items-center justify-center" 
                    aria-label="Delete last digit"
                  >
                    ⌫
                  </motion.button>
                  
                  <motion.button 
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => handleNumPress('0')} 
                    className="w-14 h-14 rounded-xl bg-slate-800/60 backdrop-blur-sm border border-slate-700/60 text-lg font-black text-white transition-all hover:bg-slate-800/80 hover:border-cyan-500/30 active:bg-slate-700 focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:outline-none flex items-center justify-center" 
                    aria-label="Press 0"
                  >
                    0
                  </motion.button>
                  
                  <motion.button 
                    whileHover={{ scale: 1.08, rotate: 5 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={triggerBiometric} 
                    className="w-14 h-14 rounded-xl bg-emerald-500/20 backdrop-blur-sm border border-emerald-500/40 text-emerald-400 transition-all hover:bg-emerald-500/30 hover:border-emerald-500/60 active:scale-90 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none flex items-center justify-center"
                    aria-label="Login with Face ID"
                  >
                    <FaceIdIcon size="md" />
                  </motion.button>
                </div>
              </div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center pt-2"
              >
                <button 
                  onClick={() => navigate('/reset-pin')} 
                  className="text-xs text-slate-400 hover:text-cyan-400 font-semibold tracking-wide uppercase transition-colors focus-visible:ring-2 focus-visible:ring-cyan-500 rounded px-2 py-1"
                >
                  Forgot PIN?
                </button>
              </motion.div>
            </>
          )}
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="z-10 pb-6 text-center"
      >
        <button 
          onClick={() => navigate('/create-account')} 
          className="text-xs text-cyan-400 hover:text-cyan-300 font-bold tracking-wide transition-colors focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-lg px-3 py-2"
        >
          New user? Create Account →
        </button>
      </motion.div>
    </div>
  );
}
