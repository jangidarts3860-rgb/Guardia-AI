'use client'

export interface StoredSubscription {
  id: string
  name: string
  category: 'ott' | 'music' | 'fitness' | 'other'
  cost: number
  renewDate: string
  isUnused: boolean
  isUnknown: boolean
  isCancelled: boolean
  unusedDays?: number
}

const DEFAULT_SUBS: StoredSubscription[] = [
  {
    id: 'netflix',
    name: 'Netflix Premium',
    category: 'ott',
    cost: 649,
    renewDate: '15 Jul',
    isUnused: true,
    isUnknown: false,
    isCancelled: false,
    unusedDays: 47
  },
  {
    id: 'spotify',
    name: 'Spotify Family',
    category: 'music',
    cost: 119,
    renewDate: '22 Jul',
    isUnused: false,
    isUnknown: false,
    isCancelled: false
  },
  {
    id: 'cultfit',
    name: 'Cult.fit Gym Pack',
    category: 'fitness',
    cost: 2133,
    renewDate: '05 Aug',
    isUnused: false,
    isUnknown: false,
    isCancelled: false
  },
  {
    id: 'unknown-charge',
    name: 'Unknown Auto-Debit',
    category: 'other',
    cost: 299,
    renewDate: '18 Jul',
    isUnused: false,
    isUnknown: true,
    isCancelled: false
  }
]

export function getStoredSubscriptions(): StoredSubscription[] {
  if (typeof window === 'undefined') return DEFAULT_SUBS
  const stored = localStorage.getItem('guardia_subs')
  if (!stored) {
    localStorage.setItem('guardia_subs', JSON.stringify(DEFAULT_SUBS))
    return DEFAULT_SUBS
  }
  return JSON.parse(stored)
}

export function cancelStoredSubscription(id: string) {
  if (typeof window === 'undefined') return
  const subs = getStoredSubscriptions()
  const updated = subs.map(sub => sub.id === id ? { ...sub, isCancelled: true } : sub)
  localStorage.setItem('guardia_subs', JSON.stringify(updated))
}

export function undoCancelStoredSubscription(id: string) {
  if (typeof window === 'undefined') return
  const subs = getStoredSubscriptions()
  const updated = subs.map(sub => sub.id === id ? { ...sub, isCancelled: false } : sub)
  localStorage.setItem('guardia_subs', JSON.stringify(updated))
}

export function resetStoredSubscriptions() {
  if (typeof window === 'undefined') return
  localStorage.setItem('guardia_subs', JSON.stringify(DEFAULT_SUBS))
}
