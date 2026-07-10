import { useCounter } from '../../../hooks/useCounter';

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  enabled?: boolean;
  prefix?: string;
  suffix?: string;
  className?: string;
  format?: boolean;
}

export default function AnimatedNumber({
  value,
  duration,
  enabled = true,
  prefix = '',
  suffix = '',
  className = '',
  format = false,
}: AnimatedNumberProps) {
  const count = useCounter(value, duration, enabled);
  const display = format ? count.toLocaleString('en-IN') : count.toString();

  return (
    <span className={className} aria-live="polite" aria-label={`${prefix}${value}${suffix}`}>
      {prefix}{display}{suffix}
    </span>
  );
}
