import { Subscription, Bank, NotificationItem, ActivityItem } from '../types';

export const initialSubscriptions: Subscription[] = [
  {
    id: 'netflix',
    name: 'Netflix',
    category: 'OTT',
    cost: 649,
    billingCycle: 'monthly',
    renewDate: '15 Jul',
    usedDaysAgo: 47,
    usagePercentage: 3,
    status: 'Active',
    isUnused: true,
    alert: 'You haven\'t opened Netflix in 47 days. Cancel today and save ₹7,788 this year. That\'s 6 months of Spotify for free.',
    icon: '🎬'
  },
  {
    id: 'spotify',
    name: 'Spotify Premium',
    category: 'Music',
    cost: 119,
    billingCycle: 'monthly',
    renewDate: '22 Jul',
    usedDaysAgo: 1,
    usagePercentage: 85,
    status: 'Active',
    isUnused: false,
    icon: '🎵'
  },
  {
    id: 'adobe',
    name: 'Adobe Creative Cloud',
    category: 'SaaS',
    cost: 4999,
    billingCycle: 'monthly',
    renewDate: '8 Aug',
    usedDaysAgo: 5,
    usagePercentage: 45,
    status: 'Active',
    isUnused: false,
    icon: '🎨'
  },
  {
    id: 'unknown-app',
    name: 'Unknown App Billing',
    category: 'Unknown',
    cost: 299,
    billingCycle: 'monthly',
    renewDate: 'Pending',
    usedDaysAgo: 90,
    usagePercentage: 0,
    status: 'Active',
    isUnused: true,
    alert: 'Review Needed — Source is unclear and has had 0 activity.',
    icon: '❓'
  }
];

export const initialBanks: Bank[] = [
  { id: 'sbi', name: 'SBI', color: 'bg-blue-600', logoColor: '#0066cc', isConnected: true, balance: 21050, accNumber: '•••• 8834', lastSynced: '14 min ago' },
  { id: 'hdfc', name: 'HDFC Bank', color: 'bg-blue-900', logoColor: '#003366', isConnected: true, balance: 84200, accNumber: '•••• 4521', lastSynced: '2 min ago' },
  { id: 'icici', name: 'ICICI Bank', color: 'bg-orange-600', logoColor: '#ff6600', isConnected: false },
  { id: 'axis', name: 'Axis Bank', color: 'bg-red-700', logoColor: '#ae275f', isConnected: false },
  { id: 'kotak', name: 'Kotak Mahindra', color: 'bg-red-600', logoColor: '#ff0000', isConnected: false },
  { id: 'idfc', name: 'IDFC First Bank', color: 'bg-amber-900', logoColor: '#990033', isConnected: false },
  { id: 'yes', name: 'Yes Bank', color: 'bg-sky-500', logoColor: '#0099ff', isConnected: false },
  { id: 'pnb', name: 'Punjab National Bank', color: 'bg-yellow-600', logoColor: '#ffcc00', isConnected: false }
];

export const initialNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    title: '🚨 HIGH RISK: Scam link detected',
    description: 'Fake HDFC bank link in SMS',
    time: 'now',
    type: 'Fraud',
    risk: 'High',
    unread: true
  },
  {
    id: 'notif-2',
    title: '🎬 Netflix renews tomorrow',
    description: '₹649 will be charged. You haven\'t used Netflix in 47 days',
    time: '5m',
    type: 'Subscriptions',
    risk: 'Warning',
    unread: true
  },
  {
    id: 'notif-3',
    title: '🏦 HDFC Bank linked',
    description: 'Account Aggregator connection successful',
    time: '1h',
    type: 'System',
    risk: 'Success',
    unread: false
  },
  {
    id: 'notif-4',
    title: '🛡️ AI Shield updated',
    description: 'New fraud patterns database loaded',
    time: '3h',
    type: 'System',
    risk: 'Info',
    unread: false
  },
  {
    id: 'notif-5',
    title: '❓ ₹299 unknown charge flagged',
    description: 'Review needed — unrecognized source',
    time: '6h',
    type: 'Subscriptions',
    risk: 'Warning',
    unread: false
  },
  {
    id: 'notif-6',
    title: '💳 Unknown card debit block',
    description: 'Blocked ₹1,299 unverified overseas transaction',
    time: '1d',
    type: 'Fraud',
    risk: 'High',
    unread: false
  },
  {
    id: 'notif-7',
    title: '🎵 Spotify plan update',
    description: 'Voted top active subscription this month',
    time: '2d',
    type: 'Subscriptions',
    risk: 'Info',
    unread: false
  }
];

export const initialActivities: ActivityItem[] = [
  {
    id: 'act-1',
    title: '🍿 Scam blocked',
    description: 'Netflix fake login link',
    time: '2h ago',
    status: 'Blocked'
  },
  {
    id: 'act-2',
    title: '🍔 Swiggy verified',
    description: 'Swiggy Instacart • ₹342',
    time: '5h ago',
    status: 'Verified'
  },
  {
    id: 'act-3',
    title: '🎬 Hotstar cancelled',
    description: 'Saving ₹299/mo',
    time: 'Yesterday',
    status: 'Cancelled'
  },
  {
    id: 'act-4',
    title: '❓ Unknown charge flagged',
    description: '₹99 from unrecognized source',
    time: '2d ago',
    status: 'Blocked'
  },
  {
    id: 'act-5',
    title: '🏦 UPI scam blocked',
    description: 'Fake HDFC collect request',
    time: '3d ago',
    status: 'Blocked'
  },
  {
    id: 'act-6',
    title: '🛒 Amazon QR verified',
    description: 'Safe • Score 94/100',
    time: '4d ago',
    status: 'Verified'
  },
  {
    id: 'act-7',
    title: '💳 Paytm QR verified',
    description: 'Safe • Score 98/100',
    time: '5d ago',
    status: 'Verified'
  },
  {
    id: 'act-8',
    title: '🍿 SonyLIV cancelled',
    description: 'Saved ₹199/mo',
    time: '1w ago',
    status: 'Cancelled'
  }
];
