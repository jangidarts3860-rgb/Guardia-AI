import { motion } from 'motion/react';

interface FilterPillsProps<T extends string> {
  options: readonly T[];
  selected: T;
  onChange: (value: T) => void;
  layoutId: string;
}

export default function FilterPills<T extends string>({
  options,
  selected,
  onChange,
  layoutId,
}: FilterPillsProps<T>) {
  return (
    <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-none shrink-0 relative" role="tablist" aria-label="Filter options">
      {options.map((opt) => (
        <button
          key={opt}
          role="tab"
          aria-selected={selected === opt}
          onClick={() => onChange(opt)}
          className={`relative px-4 py-1.5 rounded-full text-xs font-semibold border transition ${
            selected === opt
              ? 'border-sky-400 text-white'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <span className="relative z-10">{opt}</span>
          {selected === opt && (
            <motion.div
              layoutId={layoutId}
              className="absolute inset-0 bg-sky-500 rounded-full shadow-md shadow-sky-500/10"
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            />
          )}
        </button>
      ))}
    </div>
  );
}
