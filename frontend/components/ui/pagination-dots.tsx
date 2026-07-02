'use client'

import { FC } from 'react'

interface PaginationDotsProps {
  currentIndex: number
  totalDots: number
}

export const PaginationDots: FC<PaginationDotsProps> = ({ currentIndex, totalDots }) => {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: totalDots }).map((_, index) => (
        <div
          key={index}
          className={`h-1 rounded-full transition-all ${
            index === currentIndex
              ? 'w-6 bg-cyan-400'
              : 'w-2 bg-gray-600'
          }`}
        />
      ))}
    </div>
  )
}
