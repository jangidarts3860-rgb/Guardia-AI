'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    setMounted(true)
    const isDarkMode = document.documentElement.classList.contains('dark')
    setIsDark(isDarkMode)
  }, [])

  const handleToggle = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)
    if (typeof window !== 'undefined' && (window as any).__toggleGuardiaTheme) {
      (window as any).__toggleGuardiaTheme()
    }
  }

  if (!mounted) return null

  return (
    <button
      onClick={handleToggle}
      className="w-10 h-10 rounded-2xl bg-white/10 dark:bg-white/10 border border-white/20 hover:bg-white/20 flex items-center justify-center cursor-pointer active:scale-90 transition-all hover-lift group"
      aria-label="Toggle theme"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <Sun size={18} className="text-yellow-400 group-hover:text-yellow-300 transition-colors" />
      ) : (
        <Moon size={18} className="text-slate-600 group-hover:text-slate-700 transition-colors" />
      )}
    </button>
  )
}
