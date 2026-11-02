'use client';

import React from 'react';

interface AzurLearnLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  showSubtitle?: boolean;
  className?: string;
}

export const AzurLearnLogo: React.FC<AzurLearnLogoProps> = ({
  size = 'md',
  showText = true,
  showSubtitle = true,
  className = '',
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base sm:text-lg',
    lg: 'text-xl sm:text-2xl',
    xl: 'text-3xl sm:text-4xl',
  };

  const subtitleSizes = {
    sm: 'text-[9px]',
    md: 'text-[10px]',
    lg: 'text-xs',
    xl: 'text-sm',
  };

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* AzurLearn Mark / Icon */}
      <div
        className={`${iconSizes[size]} relative shrink-0 rounded-xl bg-gradient-to-tr from-sky-500 via-indigo-600 to-cyan-400 p-[1.5px] shadow-md shadow-sky-500/20 group-hover:shadow-sky-500/35 transition-all`}
      >
        <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center p-1.5 overflow-hidden relative">
          {/* Subtle inner background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-indigo-500/30 pointer-events-none" />

          {/* Precision SVG Vector Emblem: Interlocking Azure Beam 'A' with Neural Vertex */}
          <svg
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full relative z-10 transition-transform group-hover:scale-105 duration-300"
          >
            <defs>
              <linearGradient id="azurBeamLeft" x1="8" y1="34" x2="20" y2="6" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#0284c7" />
                <stop offset="100%" stopColor="#38bdf8" />
              </linearGradient>
              <linearGradient id="azurBeamRight" x1="20" y1="6" x2="32" y2="34" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
              <linearGradient id="azurCross" x1="12" y1="24" x2="28" y2="24" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#818cf8" />
              </linearGradient>
            </defs>

            {/* Left Wing of 'A' */}
            <path
              d="M7 33L18.5 7.5C19.1 6.2 20.9 6.2 21.5 7.5L33 33"
              stroke="url(#azurBeamLeft)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Right Dimension Accent */}
            <path
              d="M20 7L33 33"
              stroke="url(#azurBeamRight)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Glowing Intersecting Crossbar */}
            <path
              d="M13 23.5H27"
              stroke="url(#azurCross)"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Central Neural Synapse Vertex Node */}
            <circle cx="20" cy="17" r="3" fill="#ffffff" />
            <circle cx="20" cy="17" r="5" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.8" />
          </svg>
        </div>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col text-left leading-tight">
          <div className={`${textSizes[size]} font-black tracking-tight text-slate-900 dark:text-slate-100 flex items-center`}>
            <span>Azur</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-indigo-600 to-cyan-500 dark:from-sky-400 dark:via-cyan-300 dark:to-indigo-400">
              Learn
            </span>
          </div>
          {showSubtitle && (
            <span className={`${subtitleSizes[size]} font-semibold text-slate-500 dark:text-slate-400 tracking-wide mt-0.5`}>
              AI &amp; Machine Learning Academy
            </span>
          )}
        </div>
      )}
    </div>
  );
};

