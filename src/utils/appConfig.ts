export const APP_VERSION = '1.0.0';
export const BUILD_NUMBER = '2026.07.09';
export const IS_DEV = typeof window !== 'undefined' && (
  window.location.search.includes('dev=true') ||
  window.location.search.includes('debug=true') ||
  window.location.search.includes('explorer=true')
);

export function isScreenImmersive(screen: string): boolean {
  return [
    'splash', 'onboarding', 'permissions', 'create-account',
    'verify-otp', 'analyzing-merchant',
    'merchant-verified', 'scam-detected', 'receipt-light',
    'receipt-dark', 'cancel-success', 'your-win',
  ].includes(screen);
}

export function showBottomBar(screen: string): boolean {
  return ['home', 'subs-dashboard', 'vault', 'me-profile'].includes(screen);
}
