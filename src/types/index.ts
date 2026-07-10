export type ScreenId =
  | 'splash'
  | 'login'
  | 'onboarding'
  | 'permissions'
  | 'create-account'
  | 'verify-otp'

  | 'home'
  | 'analyzing-merchant'
  | 'merchant-verified'
  | 'scam-detected'
  | 'receipt-light'
  | 'receipt-dark'
  | 'subs-dashboard'
  | 'sub-detail'
  | 'cancel-success'
  | 'vault'
  | 'link-bank'
  | 'scan-qr'
  | 'notifications'
  | 'activity-log'
  | 'offline'
  | 'emergency'
  | 'safe-report'
  | 'your-win'
  | 'me-profile'
  | 'edit-profile'
  | 'delete-account-confirm'
  | 'freeze-accounts-confirm'
  | 'link-bank-progress'
  | 'account-deleted'
  | 'create-pin'
  | 'reset-pin'
  | 'family-spend-hub';

export interface Subscription {
  id: string;
  name: string;
  category: 'OTT' | 'SaaS' | 'Music' | 'Wellness' | 'Unknown';
  cost: number;
  billingCycle: 'monthly' | 'yearly';
  renewDate: string;
  usedDaysAgo: number;
  usagePercentage: number;
  status: 'Active' | 'Cancelled' | 'Paused';
  isUnused: boolean;
  alert?: string;
  icon: string;
}

export interface Bank {
  id: string;
  name: string;
  color: string;
  logoColor: string;
  isConnected: boolean;
  balance?: number;
  accNumber?: string;
  lastSynced?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'Fraud' | 'Subscriptions' | 'System';
  risk: 'High' | 'Warning' | 'Success' | 'Info';
  unread: boolean;
}

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  time: string;
  status: 'Blocked' | 'Verified' | 'Cancelled' | 'Pending';
  amount?: string;
  score?: number;
}
