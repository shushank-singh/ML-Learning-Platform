'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  FastForward,
  Eye,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { LessonContent } from '@/lib/types';

interface LessonAnimationPlayerProps {
  lesson: LessonContent;
}

export const LessonAnimationPlayer: React.FC<LessonAnimationPlayerProps> = ({ lesson }) => {
  const steps = lesson.intuition.steps && lesson.intuition.steps.length > 0
    ? lesson.intuition.steps
    : [
        { step: 1, title: 'Input & Initialization', description: 'Data points and initial parameters are loaded into memory.' },
        { step: 2, title: 'Transformation & Compute', description: 'The model maps features and computes predictions or distances.' },
        { step: 3, title: 'Objective Optimization', description: 'Loss is evaluated and parameters converge toward the optimal minimum.' },
      ];

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1); // 1 = 2000ms, 1.5 = 1333ms, 2 = 1000ms
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const totalSteps = steps.length;
  const activeStepData = steps[currentStep] || steps[0];

  useEffect(() => {
    if (isPlaying) {
      const interval = Math.round(2200 / speed);
      timerRef.current = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= totalSteps - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, interval);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, speed, totalSteps]);

  const handlePlayPause = () => {
    if (currentStep >= totalSteps - 1 && !isPlaying) {
      setCurrentStep(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
  };

  const handleNext = () => {
    setIsPlaying(false);
    setCurrentStep((prev) => Math.min(totalSteps - 1, prev + 1));
  };

  const handlePrev = () => {
    setIsPlaying(false);
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
      {/* Animation Control Bar */}
      <div className="p-4 sm:px-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
            <Sparkles className="w-4 h-4" />
          </span>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <span>Step-by-Step Algorithm Execution</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400 font-semibold">
                Step {currentStep + 1} of {totalSteps}
              </span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Observe how the algorithm transforms data and converges step by step.
            </p>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 transition-colors"
            title="Previous Step"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={handlePlayPause}
            className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm transition-colors"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{currentStep >= totalSteps - 1 ? 'Replay' : 'Play'}</span>
              </>
            )}
          </button>

          <button
            onClick={handleNext}
            disabled={currentStep >= totalSteps - 1}
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 transition-colors"
            title="Next Step"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={handleReset}
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors ml-1"
            title="Reset to Step 1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Speed Toggle */}
          <button
            onClick={() => setSpeed((s) => (s === 1 ? 1.5 : s === 1.5 ? 2 : 1))}
            className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-xs font-semibold hover:bg-slate-50 transition-colors"
            title="Change Playback Speed"
          >
            {speed}x
          </button>
        </div>
      </div>

      {/* Synchronized Animated Visual Stage */}
      <div className="p-4 sm:p-6 space-y-5">
        {/* Progress Bar Timeline */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Progress: {Math.round(((currentStep + 1) / totalSteps) * 100)}%</span>
            <span>{currentStep === totalSteps - 1 ? 'Convergence Reached' : 'Iterating...'}</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-indigo-600 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Animated SVG Simulation Area */}
        <div className="w-full bg-slate-950 p-4 rounded-xl border border-slate-800 text-slate-200">
          <svg viewBox="0 0 650 200" className="w-full h-auto select-none">
            {/* Background grid */}
            <defs>
              <pattern id="anim-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1E293B" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="650" height="200" fill="url(#anim-grid)" rx="6" />

            {/* Stepped Process Pipeline Display */}
            {steps.map((st, idx) => {
              const isActive = idx === currentStep;
              const isPast = idx < currentStep;
              const xPos = 40 + idx * ((650 - 80) / Math.max(1, totalSteps - 1));

              return (
                <g key={idx} className="transition-all duration-300">
                  {/* Connecting lines */}
                  {idx < totalSteps - 1 && (
                    <line
                      x1={xPos}
                      y1={100}
                      x2={40 + (idx + 1) * ((650 - 80) / Math.max(1, totalSteps - 1))}
                      y2={100}
                      stroke={isPast ? '#10B981' : '#334155'}
                      strokeWidth={isPast ? 3 : 2}
                      strokeDasharray={isPast ? 'none' : '4 3'}
                    />
                  )}

                  {/* Pulsing ring for active step */}
                  {isActive && (
                    <circle
                      cx={xPos}
                      cy={100}
                      r="24"
                      fill="#6366F1"
                      fillOpacity="0.25"
                      className="animate-pulse"
                    />
                  )}

                  {/* Node Circle */}
                  <circle
                    cx={xPos}
                    cy={100}
                    r={isActive ? 18 : 14}
                    fill={isPast ? '#065F46' : isActive ? '#4F46E5' : '#1E293B'}
                    stroke={isPast ? '#10B981' : isActive ? '#818CF8' : '#475569'}
                    strokeWidth={isActive ? 3 : 2}
                  />

                  <text
                    x={xPos}
                    y={105}
                    fill="#FFFFFF"
                    fontSize={isActive ? 12 : 10}
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {isPast ? '✓' : st.step}
                  </text>

                  {/* Label below node */}
                  <text
                    x={xPos}
                    y={135}
                    fill={isActive ? '#A5B4FC' : isPast ? '#A7F3D0' : '#64748B'}
                    fontSize="11"
                    fontWeight={isActive ? 'bold' : 'normal'}
                    textAnchor="middle"
                  >
                    {st.title.length > 16 ? st.title.slice(0, 14) + '...' : st.title}
                  </text>
                </g>
              );
            })}

            {/* Bottom State Annotation Box */}
            <rect x="150" y="160" width="350" height="28" rx="6" fill="#0F172A" stroke="#334155" />
            <text x="325" y="178" fill="#F8FAFC" fontSize="10" fontWeight="bold" textAnchor="middle">
              State: {activeStepData.title}
            </text>
          </svg>
        </div>

        {/* Synchronized Step Explanation Card */}
        <div className="p-4 sm:p-5 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/20 border border-indigo-200/80 dark:border-indigo-900/40 text-slate-800 dark:text-slate-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              Stage {activeStepData.step}: {activeStepData.title}
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">
              Click next or play to observe next transition
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {activeStepData.description}
          </p>
        </div>
      </div>
    </div>
  );
};
