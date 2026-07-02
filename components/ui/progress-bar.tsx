'use client'

import { FC } from 'react'

interface ProgressBarProps {
  currentStep: number
  totalSteps: number
}

export const ProgressBar: FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100

  return (
    <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
      <div
        className="h-full bg-cyan-400 transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
