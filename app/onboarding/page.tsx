'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Shield, CreditCard, Lock, Sparkles, ArrowRight } from 'lucide-react'
import MobileFrame from '@/components/MobileFrame'

interface OnboardingSlide {
  title: string
  headline: string
  body: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  color: string
}

export default function OnboardingPage() {
  const router = useRouter()
  const [activeSlide, setActiveSlide] = useState(0)

  const slides: OnboardingSlide[] = [
    {
      title: 'AI Protection',
      headline: 'We stop fraud before it happens',
      body: 'AI analyzes every QR code and payment link before you pay, calculating risk index scores.',
      icon: Shield,
      color: '#E837FD'
    },
    {
      title: 'Subscription Map',
      headline: 'See where every rupee goes',
      body: 'All your hidden recurring mandates and e-debits in one place. Inspect and cancel in 1 tap.',
      icon: CreditCard,
      color: '#AFFD37'
    },
    {
      title: 'Privacy Promise',
      headline: 'Your data stays on your phone',
      body: 'On-Device AI processing conforms with RBI Aggregator and DPDP rules. Zero metrics sold.',
      icon: Lock,
      color: '#38BDF8'
    }
  ]

  const handleNext = () => {
    if (activeSlide < slides.length - 1) {
      setActiveSlide(activeSlide + 1)
    } else {
      router.push('/link-bank')
    }
  }

  const currentSlide = slides[activeSlide]
  const Icon = currentSlide.icon

  return (
    <MobileFrame>
      <div className="relative px-5 pt-8 pb-10 flex flex-col text-slate-100 min-h-full select-none bg-[#0C0C0C]">
        
        {/* Top Header Indicators */}
        <div className="flex justify-between items-center z-10 relative">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#8537FD]">Guardia AI</span>
          <button 
            onClick={() => router.push('/link-bank')}
            className="text-[10px] font-bold text-slate-500 hover:text-white uppercase tracking-wider cursor-pointer"
          >
            Skip
          </button>
        </div>

        {/* Dynamic Slide Illustration Frame */}
        <div className="flex-1 flex flex-col items-center justify-center text-center z-10 relative mt-4">
          
          {/* Animated Background Lights */}
          <div 
            style={{ backgroundColor: `${currentSlide.color}15`, boxShadow: `0 0 60px 20px ${currentSlide.color}05` }}
            className="absolute w-40 h-40 rounded-full blur-[40px] transition-all duration-500 ease-in-out pointer-events-none" 
          />

          <div 
            style={{ color: currentSlide.color, borderColor: `${currentSlide.color}20`, backgroundColor: `${currentSlide.color}05` }}
            className="w-20 h-20 rounded-[28px] border flex items-center justify-center shadow-lg transition-all duration-500 ease-in-out animate-[bounce_3s_infinite]"
          >
            <Icon size={36} />
          </div>

          <div className="mt-8 px-2 max-w-[280px]">
            <span 
              style={{ color: currentSlide.color }}
              className="text-[9px] font-extrabold uppercase tracking-[0.2em] transition-all duration-500"
            >
              {currentSlide.title}
            </span>
            <h2 className="text-xl font-extrabold text-white mt-2 leading-tight tracking-tight">
              {currentSlide.headline}
            </h2>
            <p className="text-[10px] text-slate-400 mt-3 leading-relaxed">
              {currentSlide.body}
            </p>
          </div>
        </div>

        {/* Dot Pagination indicators */}
        <div className="flex justify-center gap-2 mb-8 z-10 relative">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeSlide ? 'w-6 bg-[#AFFD37]' : 'w-1.5 bg-[#181818] border border-white/5'
              }`}
            />
          ))}
        </div>

        {/* CTA Action button */}
        <button
          onClick={handleNext}
          className="w-full h-12 rounded-full bg-gradient-to-r from-[#8537FD] to-[#E837FD] hover:shadow-[0_8px_20px_rgba(133,55,253,0.2)] text-white font-extrabold text-xs uppercase tracking-wider active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-1.5 z-10 relative"
        >
          <span>{activeSlide === slides.length - 1 ? 'Link My Bank' : 'Continue'}</span>
          <ArrowRight size={14} />
        </button>

      </div>
    </MobileFrame>
  )
}
