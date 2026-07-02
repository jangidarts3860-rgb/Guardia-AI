'use client'

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface PINInputProps {
  value: string
  onChange: (value: string) => void
  onComplete?: (value: string) => void
  disabled?: boolean
}

export function PINInput({ value, onChange, onComplete, disabled = false }: PINInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [showPin, setShowPin] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let cleaned = e.target.value.replace(/\D/g, '')
    cleaned = cleaned.slice(0, 6)
    onChange(cleaned)

    if (cleaned.length === 6) {
      onComplete?.(cleaned)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && value.length > 0) {
      e.preventDefault()
      onChange(value.slice(0, -1))
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text')
    let cleaned = pasted.replace(/\D/g, '')
    cleaned = cleaned.slice(0, 6)
    onChange(cleaned)

    if (cleaned.length === 6) {
      onComplete?.(cleaned)
    }
  }

  useEffect(() => {
    if (inputRef.current && isFocused) {
      inputRef.current.focus()
    }
  }, [isFocused])

  return (
    <div className="space-y-3">
      <input
        ref={inputRef}
        type={showPin ? 'text' : 'password'}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        maxLength={6}
        disabled={disabled}
        className="absolute opacity-0 w-0 h-0"
        aria-label="Security PIN"
      />

      {/* PIN Display Circles with Modern Morphing */}
      <div className="flex gap-2 justify-center" onClick={() => inputRef.current?.focus()}>
        {Array.from({ length: 6 }).map((_, index) => {
          const isFilled = index < value.length
          const isActive = isFocused && index === value.length
          
          return (
            <motion.button
              key={index}
              type="button"
              onClick={() => {
                inputRef.current?.focus()
                setIsFocused(true)
              }}
              className="relative"
              disabled={disabled}
            >
              <motion.div
                className={`w-11 h-11 rounded-[12px] border-2 flex items-center justify-center font-bold text-lg backdrop-blur-sm ${
                  isFilled
                    ? 'bg-[#38BDF8] border-[#38BDF8] text-[#0F172A]'
                    : isActive
                      ? 'bg-[rgba(30,41,59,0.5)] border-[#38BDF8]'
                      : 'bg-[rgba(30,41,59,0.3)] border-[rgba(56,189,248,0.1)]'
                }`}
                animate={{
                  scale: isFilled ? 1.08 : 1,
                  boxShadow: isFilled
                    ? '0 0 12px rgba(56, 189, 248, 0.4)'
                    : isActive
                      ? '0 0 0 2px rgba(56, 189, 248, 0.3)'
                      : 'none',
                }}
                transition={
                  isFilled
                    ? { type: 'spring', stiffness: 300, damping: 30, delay: index * 0.05 }
                    : { duration: 0.2 }
                }
              >
                {isFilled && '●'}
              </motion.div>
            </motion.button>
          )
        })}
      </div>

      {/* Show/Hide Toggle */}
      <div className="flex justify-center pt-2">
        <button
          type="button"
          onClick={() => setShowPin(!showPin)}
          className="text-[12px] text-[#38BDF8] font-medium hover:text-[#0EA5E9] transition-colors"
          aria-label={showPin ? 'Hide PIN' : 'Show PIN'}
        >
          {showPin ? 'Hide PIN' : 'Show PIN'}
        </button>
      </div>
    </div>
  )
}
