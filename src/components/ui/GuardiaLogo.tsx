import React from 'react';

interface GuardiaLogoProps {
  size?: number;
  variant?: 'icon' | 'full' | 'compact';
  animated?: boolean;
  className?: string;
}

export default function GuardiaLogo({
  size = 64,
  variant = 'icon',
  animated = false,
  className = '',
}: GuardiaLogoProps) {
  const s = size;

  const ShieldSVG = (
    <svg
      width={s}
      height={s}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${animated ? 'drop-shadow-[0_0_20px_rgba(34,211,238,0.8)]' : 'drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]'} transition-all duration-500 ${className}`}
      aria-label="Guardia AI Logo"
      role="img"
    >
      <defs>
        {/* Core background gradient: dark cyan to deep indigo */}
        <linearGradient id="shieldBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" /> {/* cyan-500 */}
          <stop offset="50%" stopColor="#0284c7" /> {/* sky-600 */}
          <stop offset="100%" stopColor="#1e3a8a" /> {/* blue-900 */}
        </linearGradient>
        
        {/* Top-down light sweep for a subtle 3D/glass effect */}
        <linearGradient id="shieldHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.9" /> {/* cyan-300 */}
          <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" /> {/* sky-500 */}
        </linearGradient>

        {/* Crisp white-to-light-cyan gradient for the 'G' */}
        <linearGradient id="gMark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#a5f3fc" />
        </linearGradient>

        {/* Bright cyan accent for tech elements */}
        <linearGradient id="gAccent" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>

        {/* Cyber grid pattern */}
        <pattern id="cyberGrid" width="8" height="8" patternUnits="userSpaceOnUse">
          <path d="M 8 0 L 0 0 0 8" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />
        </pattern>
      </defs>

      {/* 1. Main Outer Shield Silhouette */}
      <path
        d="M50 4 L92 18 L92 48 C92 76 72 92 50 98 C28 92 8 76 8 48 L8 18 Z"
        fill="url(#shieldBg)"
      />
      
      {/* Grid Pattern Overlay */}
      <path
        d="M50 4 L92 18 L92 48 C92 76 72 92 50 98 C28 92 8 76 8 48 L8 18 Z"
        fill="url(#cyberGrid)"
        className={animated ? "animate-[pulse_4s_ease-in-out_infinite]" : ""}
      />
      
      {/* 2. Inner glowing edge (glassmorphism feel) */}
      <path
        d="M50 7 L89 20 L89 48 C89 74 70 89 50 95 C30 89 11 74 11 48 L11 20 Z"
        fill="url(#shieldHighlight)"
        opacity="0.7"
        className={animated ? "animate-[pulse_3s_ease-in-out_infinite]" : ""}
      />
      
      {/* 3. Deep inner shadow to give depth to the central mark */}
      <path
        d="M50 14 L82 25 L82 48 C82 69 66 82 50 88 C34 82 18 69 18 48 L18 25 Z"
        fill="#020617"
        opacity="0.5"
      />

      {/* Futuristic Shield/G Monogram */}

      {/* 4. Modern Tech 'G' Monogram - Clean, geometric, readable */}
      <g 
        className={animated ? "animate-[pulse_2s_ease-in-out_infinite]" : ""}
        transform="translate(2, 2)"
      >
        <path
          d="M66 48 C66 58 58 66 48 66 C38 66 30 58 30 48 C30 38 38 30 48 30 C53 30 57 32 60 35 L54 41 C52 39 50 38 48 38 C42 38 38 42 38 48 C38 54 42 58 48 58 C52 58 55 56 57 52 L48 52 L48 44 L66 44 L66 48 Z"
          fill="url(#gMark)"
          filter="drop-shadow(0px 4px 8px rgba(0,0,0,0.6))"
        />
        {/* Glowing stroke around the G */}
        <path
          d="M66 48 C66 58 58 66 48 66 C38 66 30 58 30 48 C30 38 38 30 48 30 C53 30 57 32 60 35 L54 41 C52 39 50 38 48 38 C42 38 38 42 38 48 C38 54 42 58 48 58 C52 58 55 56 57 52 L48 52 L48 44 L66 44 L66 48 Z"
          fill="none"
          stroke="url(#gAccent)"
          strokeWidth="2"
        />
      </g>
    </svg>
  );

  if (variant === 'icon') {
    return (
      <span className={`inline-flex items-center justify-center ${className}`}>
        {ShieldSVG}
      </span>
    );
  }

  if (variant === 'compact') {
    return (
      <span className={`inline-flex items-center space-x-2 ${className}`}>
        {ShieldSVG}
        <span
          className="font-black tracking-tight bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent"
          style={{ fontSize: s * 0.4 }}
        >
          Guardia
        </span>
      </span>
    );
  }

  // variant === 'full'
  return (
    <div className={`flex flex-col items-center space-y-2 ${className}`}>
      {ShieldSVG}
      <div className="flex flex-col items-center">
        <span
          className="font-black tracking-tight bg-gradient-to-r from-cyan-400 via-white to-sky-400 bg-clip-text text-transparent leading-none"
          style={{ fontSize: s * 0.4 }}
        >
          Guardia AI
        </span>
        <span
          className="font-mono font-bold tracking-widest text-cyan-500/80 uppercase leading-none mt-1.5"
          style={{ fontSize: s * 0.15 }}
        >
          Shield Protocol
        </span>
      </div>
    </div>
  );
}
