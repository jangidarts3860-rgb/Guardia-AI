import React from 'react';

type IconSize = 'sm' | 'md' | 'lg' | 'xl';

const sizes: Record<IconSize, number> = { sm: 14, md: 18, lg: 24, xl: 32 };

function icon(size: IconSize): number {
  return typeof size === 'number' ? size : sizes[size] || 18;
}

export function BankIcon({ size = 'sm' }: { size?: IconSize }) {
  const s = icon(size);
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

export function ShieldPulseIcon({ size = 'sm' }: { size?: IconSize }) {
  const s = icon(size);
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M8 12l2 2 4-4" />
    </svg>
  );
}

export function ScamAlertIcon({ size = 'sm' }: { size?: IconSize }) {
  const s = icon(size);
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

export function MovieIcon({ size = 'sm' }: { size?: IconSize }) {
  const s = icon(size);
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
      <line x1="7" y1="2" x2="7" y2="22" />
      <line x1="17" y1="2" x2="17" y2="22" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <line x1="2" y1="7" x2="7" y2="7" />
      <line x1="2" y1="17" x2="7" y2="17" />
      <line x1="17" y1="7" x2="22" y2="7" />
      <line x1="17" y1="17" x2="22" y2="17" />
    </svg>
  );
}

export function MusicNoteIcon({ size = 'sm' }: { size?: IconSize }) {
  const s = icon(size);
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}

export function CloudIcon({ size = 'sm' }: { size?: IconSize }) {
  const s = icon(size);
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z" />
    </svg>
  );
}

export function TvIcon({ size = 'sm' }: { size?: IconSize }) {
  const s = icon(size);
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
      <polyline points="16 21 16 2 8 2 8 21" />
    </svg>
  );
}

export function GreenDotIcon({ size = 'sm' }: { size?: IconSize }) {
  const s = icon(size);
  return (
    <svg width={s} height={s} viewBox="0 0 8 8" fill="currentColor">
      <circle cx="4" cy="4" r="4" />
    </svg>
  );
}

export function RiskHighIcon({ size = 'sm' }: { size?: IconSize }) {
  const s = icon(size);
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  );
}

export function FaceIdIcon({ size = 'md' }: { size?: IconSize }) {
  const s = icon(size);
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 11a3 3 0 1 0 6 0 3 3 0 0 0-6 0z" />
      <path d="M17.62 14c2.228-1.572 3.342-2.358 3.342-3.218 0-.86-1.114-1.646-3.342-3.218C15.392 6.002 14.278 5.216 13 5.216c-1.278 0-2.392.786-4.62 2.348C6.152 9.136 5.038 9.922 5.038 10.782c0 .86 1.114 1.646 3.342 3.218 2.228 1.572 3.342 2.358 4.62 2.358 1.278 0 2.392-.786 4.62-2.358z" />
    </svg>
  );
}

export function ConfettiIcon({ size = 'lg' }: { size?: IconSize }) {
  const s = icon(size);
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.2 7.8l-3.6-2.1M8 21l-2-3.5M17 3l-2 4M3 13l6 3" />
      <circle cx="14" cy="18" r="2" fill="currentColor" opacity="0.3" />
      <circle cx="19" cy="12" r="1.5" fill="currentColor" opacity="0.3" />
      <circle cx="6" cy="9" r="1.5" fill="currentColor" opacity="0.3" />
      <circle cx="12" cy="5" r="1" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

const iconMap: Record<string, React.FC<{ size?: IconSize }>> = {
  movie: MovieIcon,
  warning: ScamAlertIcon,
  check: CheckShieldIcon,
  x: ({ size: sizeProp = 'sm' }: { size?: IconSize }) => {
    const s = icon(sizeProp);
    return (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    );
  },
  bank: BankIcon,
  shield: ShieldPulseIcon,
  music: MusicNoteIcon,
  cloud: CloudIcon,
  tv: TvIcon,
  'risk-high': RiskHighIcon,
  'face-id': FaceIdIcon,
  confetti: ConfettiIcon,
  'green-dot': GreenDotIcon,
  bell: ({ size: sizeProp = 'sm' }: { size?: IconSize }) => {
    const s = icon(sizeProp);
    return (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    );
  },
};

export function AppIcons({ name, size = 'sm' }: { name: string; size?: IconSize }) {
  const Icon = iconMap[name];
  if (!Icon) return null;
  return <Icon size={size} />;
}

export function CheckShieldIcon({ size = 'sm' }: { size?: IconSize }) {
  const s = icon(size);
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}
