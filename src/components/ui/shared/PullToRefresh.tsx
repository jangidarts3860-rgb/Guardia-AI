import { useState, useCallback } from 'react';
import React from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';
import { RefreshCw } from 'lucide-react';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

interface PullToRefreshProps {
  onRefresh: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

const THRESHOLD = 70;

export default function PullToRefresh({ onRefresh, children, disabled }: PullToRefreshProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const y = useMotionValue(0);
  const pullProgress = useTransform(y, [0, THRESHOLD], [0, 1]);
  const reduced = useReducedMotion();

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    y.set(0);
    Promise.resolve(onRefresh()).finally(() => {
      setTimeout(() => setIsRefreshing(false), 400);
    });
  }, [onRefresh, y]);

  return (
    <div className="relative overflow-hidden">
      <motion.div className="flex items-center justify-center w-full overflow-hidden" style={{ height: useTransform(y, [0, THRESHOLD], [0, 56]) }}>
        {isRefreshing ? (
          <RefreshCw className={`w-5 h-5 text-sky-400 ${reduced ? '' : 'animate-spin'}`} />
        ) : (
          <motion.div style={{ rotate: useTransform(pullProgress, [0, 1], [0, 180]) }}>
            <RefreshCw className="w-5 h-5 text-slate-400" style={{ opacity: useTransform(pullProgress, [0, 1], [0.2, 1]) }} />
          </motion.div>
        )}
      </motion.div>
      <motion.div
        style={{ y }}
        drag={disabled || isRefreshing ? false : 'y'}
        onDrag={(_event, info) => {
          if (info.offset.y > 0) {
            y.set(Math.min(info.offset.y * 0.4, 120));
          }
        }}
        onDragEnd={() => {
          const currentY = y.get();
          if (currentY >= THRESHOLD && !disabled) {
            handleRefresh();
          } else {
            y.set(0);
          }
        }}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.2}
      >
        {children}
      </motion.div>
    </div>
  );
}
