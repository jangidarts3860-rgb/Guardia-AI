'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface PhoneInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
}

export function PhoneInput({
  value,
  onChange,
  placeholder = '9876543210',
  disabled = false,
}: PhoneInputProps) {
  const [isFocused, setIsFocused] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let cleaned = e.target.value.replace(/\D/g, '')
    cleaned = cleaned.slice(0, 10)
    onChange(cleaned)
  }

  return (
    <motion.div
      className="relative"
      animate={{
        boxShadow: isFocused
          ? '0 0 0 1px #38BDF8, 0 0 12px rgba(56, 189, 248, 0.1)'
          : '0 0 0 1px rgba(255, 255, 255, 0.12)',
      }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center h-14 bg-[#1E293B] rounded-[12px] px-4 border border-[rgba(255,255,255,0.12)]">
        <span className="text-[#38BDF8] font-medium mr-2">+91</span>
        <input
          type="tel"
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={10}
          className="flex-1 bg-transparent text-white placeholder-[#4B5563] outline-none text-base"
          aria-label="Mobile number"
        />
      </div>
    </motion.div>
  )
}
