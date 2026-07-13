import { motion } from 'motion/react';

interface SkeletonProps {
  className?: string;
}

export default function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <motion.div
      className={`bg-gradient-to-r from-slate-800/40 to-slate-700/40 backdrop-blur-sm rounded-2xl relative overflow-hidden border border-slate-700/20 ${className}`}
      aria-hidden="true"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-600/20 to-transparent"
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 1.5, ease: 'easeInOut', repeat: Infinity }}
      />
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity }}
      />
    </motion.div>
  );
}
