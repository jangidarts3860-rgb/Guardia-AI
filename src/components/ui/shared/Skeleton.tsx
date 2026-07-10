import { motion } from 'motion/react';

interface SkeletonProps {
  className?: string;
}

export default function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <motion.div
      className={`bg-slate-800/60 rounded-xl relative overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-700/30 to-transparent"
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 1.2, ease: 'easeInOut', repeat: Infinity }}
      />
    </motion.div>
  );
}
