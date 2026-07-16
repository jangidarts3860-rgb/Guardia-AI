import { ScreenId } from '../types';

export interface GlowColors {
  blob1: string;
  blob2: string;
  blob3: string;
  label: string;
}

export const GLOW_PRESETS: Record<string, GlowColors> = {
  default: {
    blob1: 'rgba(37, 99, 235, 0.6)',    // blue-600
    blob2: 'rgba(6, 182, 212, 0.4)',    // cyan-500
    blob3: 'rgba(139, 92, 246, 0.25)',  // purple-400
    label: 'default',
  },
  danger: {
    blob1: 'rgba(220, 38, 38, 0.5)',    // red-600
    blob2: 'rgba(239, 68, 68, 0.35)',   // red-500
    blob3: 'rgba(244, 63, 94, 0.2)',    // rose-500
    label: 'danger',
  },
  safe: {
    blob1: 'rgba(16, 185, 129, 0.5)',   // emerald-500
    blob2: 'rgba(20, 184, 166, 0.35)',  // teal-500
    blob3: 'rgba(34, 197, 94, 0.2)',    // green-500
    label: 'safe',
  },
  security: {
    blob1: 'rgba(99, 102, 241, 0.5)',   // indigo-500
    blob2: 'rgba(139, 92, 246, 0.35)',  // purple-500
    blob3: 'rgba(168, 85, 247, 0.2)',   // violet-500
    label: 'security',
  },
  warning: {
    blob1: 'rgba(245, 158, 11, 0.5)',   // amber-500
    blob2: 'rgba(234, 179, 8, 0.35)',   // yellow-500
    blob3: 'rgba(251, 146, 60, 0.2)',   // orange-400
    label: 'warning',
  },
};

const SCREEN_GLOW_MAP: Partial<Record<ScreenId, string>> = {
  splash: 'default',
  login: 'default',
  onboarding: 'default',
  permissions: 'default',
  'create-account': 'default',
  'verify-otp': 'default',
  'create-pin': 'default',
  'reset-pin': 'default',
  home: 'default',
  'analyzing-merchant': 'default',
  'merchant-verified': 'default',
  'cancel-success': 'default',
  'your-win': 'default',
  'scam-detected': 'default',
  emergency: 'default',
  'freeze-accounts-confirm': 'default',
  'delete-account-confirm': 'default',
  'account-deleted': 'default',
  'subs-dashboard': 'default',
  'family-spend-hub': 'default',
  'sub-detail': 'default',
  offline: 'default',
  vault: 'default',
  security: 'default',
  'link-bank': 'default',
  'link-bank-progress': 'default',
  'scan-qr': 'default',
  notifications: 'default',
  'activity-log': 'default',
  'me-profile': 'default',
  'edit-profile': 'default',
  'safe-report': 'default',
  'receipt-dark': 'default',
};

export function getGlowColors(screenId: ScreenId): GlowColors {
  const preset = SCREEN_GLOW_MAP[screenId] || 'default';
  return GLOW_PRESETS[preset];
}

export function getOuterShadow(screenId: ScreenId): string {
  const preset = SCREEN_GLOW_MAP[screenId] || 'default';
  switch (preset) {
    case 'danger':
      return '0 0 60px -20px rgba(239, 68, 68, 0.2)';
    case 'safe':
      return '0 0 60px -20px rgba(16, 185, 129, 0.15)';
    case 'security':
      return '0 0 60px -20px rgba(99, 102, 241, 0.15)';
    case 'warning':
      return '0 0 60px -20px rgba(245, 158, 11, 0.15)';
    default:
      return '0 0 60px -15px rgba(14, 165, 233, 0.12)';
  }
}
