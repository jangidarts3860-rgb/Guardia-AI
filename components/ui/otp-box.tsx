'use client'

import { FC, useEffect, useRef } from 'react'

interface OTPBoxProps {
  value: string
  index: number
  isActive: boolean
  onChangeValue: (index: number, value: string) => void
  onKeyDown: (index: number, event: React.KeyboardEvent<HTMLInputElement>) => void
}

export const OTPBox: FC<OTPBoxProps> = ({
  value,
  index,
  isActive,
  onChangeValue,
  onKeyDown,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isActive])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '')
    if (val.length <= 1) {
      onChangeValue(index, val)
    }
  }

  return (
    <input
      ref={inputRef}
      type="text"
      inputMode="numeric"
      maxLength={1}
      value={value}
      onChange={handleChange}
      onKeyDown={(e) => onKeyDown(index, e)}
      className={`h-14 w-12 text-center text-xl font-bold rounded-lg transition-all ${
        isActive
          ? 'border-2 border-cyan-400 bg-slate-900 text-cyan-400 ring-2 ring-cyan-500/20'
          : 'border border-white/12 bg-slate-900 text-white'
      }`}
    />
  )
}
