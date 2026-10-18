'use client';

import React from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  FastForward,
  Volume2,
} from 'lucide-react';

export interface StepPlayerProps {
  currentStep: number;
  totalSteps: number;
  isPlaying: boolean;
  speedMs: number;
  explanation?: string;
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  onReset: () => void;
  onSpeedChange: (speedMs: number) => void;
  onStepSelect?: (step: number) => void;
}

export const StepPlayer: React.FC<StepPlayerProps> = ({
  currentStep,
  totalSteps,
  isPlaying,
  speedMs,
  explanation,
  onPlay,
  onPause,
  onNext,
  onPrev,
  onReset,
  onSpeedChange,
  onStepSelect,
}) => {
  const isAtStart = currentStep <= 0;
  const isAtEnd = currentStep >= totalSteps - 1;

  const speedOptions = [
    { label: '0.5x', value: 1600 },
    { label: '1x', value: 800 },
    { label: '2x', value: 400 },
    { label: '4x', value: 200 },
  ];

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-4 space-y-3">
      {/* Explanation Text */}
      {explanation && (
        <div className="p-3 rounded-lg bg-violet-50/70 dark:bg-violet-950/30 border border-violet-200/60 dark:border-violet-800/40 text-xs sm:text-sm text-slate-800 dark:text-slate-200 min-h-[44px] flex items-center">
          <span className="font-semibold text-violet-600 dark:text-violet-400 mr-2 shrink-0">
            Step {currentStep + 1}/{Math.max(1, totalSteps)}:
          </span>
          <span className="leading-snug">{explanation}</span>
        </div>
      )}

      {/* Progress Timeline Slider */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span>Start</span>
          <span>
            {currentStep + 1} / {totalSteps}
          </span>
          <span>End</span>
        </div>
        <input
          type="range"
          min={0}
          max={Math.max(0, totalSteps - 1)}
          value={currentStep}
          onChange={(e) => onStepSelect && onStepSelect(Number(e.target.value))}
          disabled={totalSteps <= 1}
          className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-violet-600 disabled:opacity-40"
        />
      </div>

      {/* Playback Controls & Speed */}
      <div className="flex items-center justify-between flex-wrap gap-2 pt-1">
        {/* Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onReset}
            disabled={isAtStart && !isPlaying}
            title="Reset to start"
            className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={onPrev}
            disabled={isAtStart || isPlaying}
            title="Previous step"
            className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            onClick={isPlaying ? onPause : onPlay}
            disabled={isAtEnd && !isPlaying}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-semibold text-xs transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>{isAtEnd ? 'Replay' : 'Play'}</span>
              </>
            )}
          </button>

          <button
            onClick={onNext}
            disabled={isAtEnd || isPlaying}
            title="Next step"
            className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        {/* Speed Selector */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg text-[11px] font-semibold">
          <span className="px-2 text-slate-400 text-[10px] hidden sm:inline">Speed:</span>
          {speedOptions.map((s) => (
            <button
              key={s.label}
              onClick={() => onSpeedChange(s.value)}
              className={`px-2 py-0.5 rounded transition-colors ${
                speedMs === s.value
                  ? 'bg-white dark:bg-slate-700 text-violet-600 dark:text-violet-300 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
