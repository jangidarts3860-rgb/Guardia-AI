import { ScreenId } from '../types';
import {
  Users, ShieldAlert, Layers, LayoutGrid, Bell, Settings
} from 'lucide-react';
import React from 'react';

export interface ScreenGroup {
  category: string;
  icon: React.ComponentType<any>;
  color: string;
  screens: { id: ScreenId; label: string; desc: string }[];
}

/**
 * Sab screen groups ka data — FlowNavigator mein use hota hai
 * Isko alag file mein rakha taaki FlowNavigator clean rahe
 */
export const screenGroups: ScreenGroup[] = [
  {
    category: '1. Onboarding & Identity',
    icon: Users,
    color: 'border-sky-500/20 text-sky-400 bg-sky-500/5',
    screens: [
      { id: 'splash', label: 'Splash Screen', desc: 'Secure branding card with premium radial glowing shield.' },
      { id: 'onboarding', label: 'Intro Onboarding', desc: 'Real-time threat detection value carousel.' },
      { id: 'permissions', label: 'Permissions Granter', desc: 'Clean on-device consent checklist with security seal.' },
      { id: 'create-account', label: 'Create Account', desc: 'Interactive phone & name configuration step.' },
      { id: 'verify-otp', label: 'OTP Verification', desc: 'Secure progressive code entry with device reset note.' },
      { id: 'welcome-back', label: 'Welcome Back / Login', desc: 'Biometric FaceID / PIN verification stage.' },
    ]
  },
  {
    category: '2. Shield & Security Scans',
    icon: ShieldAlert,
    color: 'border-emerald-500/20 text-emerald-400 bg-emerald-500/5',
    screens: [
      { id: 'home', label: 'Your Shield (Home)', desc: 'Central command dashboard featuring waste meter & nudges.' },
      { id: 'analyzing-merchant', label: 'Merchant Scanning Loader', desc: 'Dynamic circular progress checking heuristics.' },
      { id: 'merchant-verified', label: 'Merchant Verified Safe', desc: 'Score meter 96/100 showing verified status.' },
      { id: 'scam-detected', label: 'High Risk Scam Detected', desc: 'Bright red urgency warning with protective advice.' },
      { id: 'receipt-dark', label: 'Success Receipt (Dark)', desc: 'Sleek, dark-mode variant with trust scores.' },
    ]
  },
  {
    category: '3. Subscription Guard',
    icon: Layers,
    color: 'border-amber-500/20 text-amber-400 bg-amber-500/5',
    screens: [
      { id: 'subs-dashboard', label: 'Subscriptions List', desc: 'Segmented spend map donut graph breakout.' },
      { id: 'sub-detail', label: 'Subscription Details', desc: 'Usage percentage bars & slide-to-cancel trigger.' },
      { id: 'cancel-success', label: 'Cancel Confirmation', desc: 'Undo countdown alert with saving calculation.' },
    ]
  },
  {
    category: '4. Bank Vault',
    icon: LayoutGrid,
    color: 'border-purple-500/20 text-purple-400 bg-purple-500/5',
    screens: [
      { id: 'vault', label: 'Vault Security', desc: 'Critical drag-to-freeze bank link and AI privacy toggles.' },
      { id: 'freeze-accounts-confirm', label: 'Freeze Confirm', desc: 'Confirm emergency blockage of all connected bank accounts.' },
      { id: 'link-bank', label: 'Link Bank List', desc: 'Interactive bank grid compliant with RBI aggregator.' },
      { id: 'link-bank-progress', label: 'Linking Bank Progress', desc: 'Sandboxed RBI aggregator loading spinner.' },
      { id: 'scan-qr', label: 'QR Scan / Link Verify', desc: 'Camera access handler with SMS paste input.' },
    ]
  },
  {
    category: '5. Alerts & History',
    icon: Bell,
    color: 'border-teal-500/20 text-teal-400 bg-teal-500/5',
    screens: [
      { id: 'notifications', label: 'Notifications Hub', desc: 'Risk-graded urgent notifications filtered by categories.' },
      { id: 'activity-log', label: 'Security Activity Log', desc: 'Complete audited list of blocked scams & approvals.' },
    ]
  },
  {
    category: '6. Safety & Profiles',
    icon: Settings,
    color: 'border-rose-500/20 text-rose-400 bg-rose-500/5',
    screens: [
      { id: 'me-profile', label: 'Profile', desc: 'Lifetime statistics cards & account configurations.' },
      { id: 'edit-profile', label: 'Edit Profile Settings', desc: 'Interactive form containing photo picker and language selects.' },
      { id: 'delete-account-confirm', label: 'Delete Account Modal', desc: 'Strict uppercase confirmation to protect user details.' },
      { id: 'safe-report', label: 'Everything Looks Safe', desc: 'Satisfying secure report card showing 0 threats.' },
      { id: 'your-win', label: 'Shareable Savings card', desc: 'Anonymized financial win layout to download & share.' },
      { id: 'emergency', label: 'Emergency Helpdesk', desc: 'Instant hotline dials & immediate safety protocols.' },
      { id: 'offline', label: 'You are Offline screen', desc: 'Modern offline view showcasing local features.' },
    ]
  }
];
