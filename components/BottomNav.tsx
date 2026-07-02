'use client'

import React from 'react'
import { Home, CreditCard, Scan, Lock } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface BottomNavProps {
  activeTab: 'home' | 'subs' | 'verify' | 'vault'
}

export default function BottomNav({ activeTab }: BottomNavProps) {
  const router = useRouter()

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, route: '/home' },
    { id: 'subs', label: 'Subs', icon: CreditCard, route: '/subs' },
    { id: 'verify', label: 'Verify', icon: null, route: '/verify' }, // Center FAB handles this
    { id: 'vault', label: 'Vault', icon: Lock, route: '/vault' },
  ]

  const handleNav = (route: string) => {
    router.push(route)
  }

  return (
    <div className="absolute bottom-4 left-4 right-4 h-20 bg-[#1E293B]/80 backdrop-blur-md rounded-3xl border border-white/6 flex items-center justify-between px-6 z-40 select-none">
      {navItems.map((item) => {
        // Render empty spot for Center FAB
        if (item.id === 'verify') {
          return (
            <div key={item.id} className="relative w-14 h-14 flex items-center justify-center">
              {/* Elevated FAB Verify Button */}
              <button
                onClick={() => handleNav('/verify')}
                className="absolute -top-7 w-14 h-14 bg-[#38BDF8] hover:bg-[#0EA5E9] rounded-full flex items-center justify-center text-[#0F172A] shadow-[0_0_24px_rgba(56,189,248,0.35)] transition-all active:scale-95 duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8537FD] focus-visible:ring-offset-2 focus-visible:ring-offset-[#070a13]"
                title="Verify Merchant"
                aria-label="Verify QR Scan"
              >
                <Scan size={24} strokeWidth={2.5} aria-hidden="true" />
              </button>
            </div>
          )
        }

        const IconComponent = item.icon
        const isActive = activeTab === item.id

        return (
          <button
            key={item.id}
            onClick={() => handleNav(item.route)}
            className="flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all active:scale-95 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8537FD] focus-visible:ring-offset-2 focus-visible:ring-offset-[#070a13]"
            aria-label={`Go to ${item.label}`}
          >
            {IconComponent && (
              <IconComponent
                size={22}
                strokeWidth={2}
                className={`transition-colors duration-200 ${
                  isActive ? 'text-[#38BDF8]' : 'text-slate-400'
                }`}
                aria-hidden="true"
              />
            )}
            <span
              className={`text-[10px] font-semibold mt-1 transition-colors duration-200 uppercase tracking-wider ${
                isActive ? 'text-[#38BDF8]' : 'text-slate-400'
              }`}
            >
              {item.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
