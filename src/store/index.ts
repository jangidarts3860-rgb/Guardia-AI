import { create } from 'zustand';
import { Subscription, Bank, NotificationItem, ActivityItem } from '../types';
import { initialSubscriptions, initialBanks, initialNotifications, initialActivities } from '../data/mockData';

interface Profile {
  name: string;
  phone: string;
  email: string;
  language: string;
  photo: string;
}

interface AppState {
  subscriptions: Subscription[];
  setSubscriptions: (updater: Subscription[] | ((prev: Subscription[]) => Subscription[])) => void;
  banks: Bank[];
  setBanks: (updater: Bank[] | ((prev: Bank[]) => Bank[])) => void;
  notifications: NotificationItem[];
  setNotifications: (updater: NotificationItem[] | ((prev: NotificationItem[]) => NotificationItem[])) => void;
  activities: ActivityItem[];
  setActivities: (updater: ActivityItem[] | ((prev: ActivityItem[]) => ActivityItem[])) => void;
  selectedSub: Subscription | null;
  setSelectedSub: (sub: Subscription | null) => void;
  isOffline: boolean;
  setIsOffline: (offline: boolean) => void;

  scanOutcome: 'safe' | 'scam';
  setScanOutcome: (outcome: 'safe' | 'scam') => void;
  profile: Profile;
  setProfile: (updater: Profile | ((prev: Profile) => Profile)) => void;
  resetAllState: () => void;
}

export const useStore = create<AppState>((set) => ({
  subscriptions: initialSubscriptions,
  setSubscriptions: (updater) => set((state) => ({ subscriptions: typeof updater === 'function' ? updater(state.subscriptions) : updater })),
  banks: initialBanks,
  setBanks: (updater) => set((state) => ({ banks: typeof updater === 'function' ? updater(state.banks) : updater })),
  notifications: initialNotifications,
  setNotifications: (updater) => set((state) => ({ notifications: typeof updater === 'function' ? updater(state.notifications) : updater })),
  activities: initialActivities,
  setActivities: (updater) => set((state) => ({ activities: typeof updater === 'function' ? updater(state.activities) : updater })),
  selectedSub: initialSubscriptions[0],
  setSelectedSub: (sub) => set({ selectedSub: sub }),
  isOffline: false,
  setIsOffline: (offline) => set({ isOffline: offline }),

  scanOutcome: 'safe',
  setScanOutcome: (outcome) => set({ scanOutcome: outcome }),
  profile: {
    name: '',
    phone: '',
    email: '',
    language: '',
    photo: ''
  },
  setProfile: (updater) => set((state) => ({ profile: typeof updater === 'function' ? updater(state.profile) : updater })),
  resetAllState: () => set({
    subscriptions: initialSubscriptions,
    banks: initialBanks,
    notifications: initialNotifications,
    activities: initialActivities,
    selectedSub: initialSubscriptions[0],
    isOffline: false,
    profile: { name: '', phone: '', email: '', language: '', photo: '' }
  })
}));
