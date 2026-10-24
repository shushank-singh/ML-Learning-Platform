'use client';

import React, { useState, useEffect, useRef } from 'react';
import { AnimationData } from '@/data/revision/types';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  SkipBack,
  Sliders,
  Activity,
  Gauge,
} from 'lucide-react';

interface AnimatedVisualizerProps {
  data: AnimationData;
}

export const AnimatedVisualizer: React.FC<AnimatedVisualizerProps> = ({ data }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [customInputValue, setCustomInputValue] = useState<any>(
    data.inputConfig?.defaultVal ?? 1
  );

  const totalSteps = data.stepsTotal || 5;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Play / Pause ticker
  useEffect(() => {
    if (isPlaying) {
      const delay = Math.round(1500 / speedMultiplier);
      intervalRef.current = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= totalSteps) {
            setIsPlaying(false);
            return totalSteps;
          }
          return prev + 1;
        });
      }, delay);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, speedMultiplier, totalSteps]);

  // Handle keyboard shortcut for space (play/pause)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.code === 'Space') {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        handleStepForward();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        handleStepBackward();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalSteps]);

  const handleStepForward = () => {
    setIsPlaying(false);
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const handleStepBackward = () => {
    setIsPlaying(false);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(1);
  };

  const progressPercent = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
              Section C • See It in Action (30%)
            </span>
            <h4 className="text-sm font-bold text-slate-100">{data.title}</h4>
          </div>
        </div>

        {/* Step Counter Badge */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700/80 font-mono text-xs text-slate-300 font-semibold">
            Step {currentStep} / {totalSteps}
          </span>
          {/* Speed Selector */}
          <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700/80 text-[11px] font-mono">
            {[0.5, 1, 2].map((s) => (
              <button
                key={s}
                onClick={() => setSpeedMultiplier(s)}
                className={`px-2 py-0.5 rounded transition-all ${
                  speedMultiplier === s
                    ? 'bg-emerald-600 text-white font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Animation Canvas / Visual Frame */}
      <div className="relative overflow-hidden rounded-xl bg-slate-950 border border-slate-800 p-6 flex flex-col items-center justify-center min-h-[220px]">
        {/* Visual State Canvas */}
        <div className="w-full max-w-lg space-y-4">
          {/* Dynamic Progress indicator */}
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Execution State</span>
            <span>{progressPercent}% Complete</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Dynamic State Simulator Visualizer */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800/80 flex flex-col items-center justify-center space-y-3">
            {/* Step visualization track */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center">
              {Array.from({ length: totalSteps }).map((_, i) => {
                const stepNum = i + 1;
                const isCurrent = stepNum === currentStep;
                const isPassed = stepNum < currentStep;
                return (
                  <div
                    key={i}
                    onClick={() => {
                      setIsPlaying(false);
                      setCurrentStep(stepNum);
                    }}
                    className={`cursor-pointer w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-xs transition-all duration-300 ${
                      isCurrent
                        ? 'bg-emerald-500 text-slate-950 scale-110 shadow-lg shadow-emerald-500/25 ring-2 ring-emerald-400'
                        : isPassed
                        ? 'bg-slate-800 text-emerald-400 border border-emerald-500/30'
                        : 'bg-slate-900 text-slate-500 border border-slate-800'
                    }`}
                  >
                    {stepNum}
                  </div>
                );
              })}
            </div>

            {/* Step Explanation Callout */}
            <div className="text-center pt-2 max-w-md">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-0.5">
                Current Phase Action
              </span>
              <p className="text-xs text-slate-200 leading-relaxed">
                {currentStep === 1 && `Initial State: Setting parameters and loading inputs. Ready to run.`}
                {currentStep === 2 && `Phase 1: Evaluating conditions and dispatching forward pass.`}
                {currentStep === 3 && `Phase 2: Updating internal variables and adjusting interval pointers.`}
                {currentStep === 4 && `Phase 3: Converging on target threshold and validating invariants.`}
                {currentStep >= 5 && `Completion: Termination condition met! Optimal result obtained.`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Parameter Control (if supported by topic) */}
      {data.inputConfig && (
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
            <Sliders className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{data.inputConfig.label}</span>
          </div>

          {data.inputConfig.type === 'slider' && (
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={data.inputConfig.min ?? 1}
                max={data.inputConfig.max ?? 10}
                step={data.inputConfig.step ?? 1}
                value={customInputValue}
                onChange={(e) => {
                  setCustomInputValue(Number(e.target.value));
                  setCurrentStep(1);
                }}
                className="w-36 accent-emerald-500 cursor-pointer"
              />
              <span className="font-mono text-xs text-emerald-400 font-bold w-12 text-right">
                {customInputValue}
              </span>
            </div>
          )}

          {data.inputConfig.type === 'select' && (
            <select
              value={customInputValue}
              onChange={(e) => {
                setCustomInputValue(e.target.value);
                setCurrentStep(1);
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              {data.inputConfig.options?.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          )}

          {data.inputConfig.type === 'stepper' && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCustomInputValue((prev: number) => Math.max(data.inputConfig?.min ?? 1, prev - 1))}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-bold"
              >
                -
              </button>
              <span className="font-mono text-xs text-emerald-400 font-bold w-8 text-center">
                {customInputValue}
              </span>
              <button
                onClick={() => setCustomInputValue((prev: number) => Math.min(data.inputConfig?.max ?? 10, prev + 1))}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-bold"
              >
                +
              </button>
            </div>
          )}
        </div>
      )}

      {/* Animation Control Bar */}
      <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
        <div className="flex items-center gap-1.5">
          {/* Step Backward */}
          <button
            onClick={handleStepBackward}
            disabled={currentStep <= 1}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-300 transition-colors"
            title="Step Backward (Left Arrow)"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          {/* Play / Pause Primary Button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-all"
            title="Play / Pause (Spacebar)"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>{currentStep >= totalSteps ? 'Replay' : 'Play'}</span>
              </>
            )}
          </button>

          {/* Step Forward */}
          <button
            onClick={handleStepForward}
            disabled={currentStep >= totalSteps}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-300 transition-colors"
            title="Step Forward (Right Arrow)"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          {/* Reset */}
          <button
            onClick={handleReset}
            className="p-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors ml-1"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        <span className="text-[11px] text-slate-500 hidden sm:inline-block">
          Use <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] font-mono">Space</kbd> to play/pause, <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] font-mono">← / →</kbd> to step
        </span>
      </div>
    </div>
  );
};
