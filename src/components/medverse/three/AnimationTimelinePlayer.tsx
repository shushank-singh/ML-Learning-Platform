'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import {
  Play,
  Pause,
  RotateCcw,
  SkipBack,
  SkipForward,
  Camera,
  Captions,
  Tag,
  CheckCircle2,
  BookOpen,
  Sparkles,
  Info,
  Repeat,
  Accessibility,
} from 'lucide-react';
import { ScientificAnimationSpec } from '@/types/medverse';
import { MedVerseSceneCanvas } from './MedVerseSceneCanvas';
import {
  ScientificAnimationScene,
  TimelinePlaybackState,
} from './ScientificAnimationScene';

interface AnimationTimelinePlayerProps {
  animation: ScientificAnimationSpec;
}

function formatClockTime(seconds: number): string {
  const s = Math.max(0, Math.round(seconds));
  const mins = Math.floor(s / 60);
  const rem = s % 60;
  return `${String(mins).padStart(2, '0')}:${String(rem).padStart(2, '0')}`;
}

export const AnimationTimelinePlayer: React.FC<AnimationTimelinePlayerProps> = ({
  animation,
}) => {
  const playbackRef = useRef<TimelinePlaybackState>({
    progress: 0,
    isPlaying: false,
    speed: 1,
    stepByStep: false,
  });

  const [progress, setProgress] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<0.5 | 1 | 2>(1);
  const [stepByStep, setStepByStep] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);
  const [followCamera, setFollowCamera] = useState<boolean>(true);
  const [showCaptions, setShowCaptions] = useState<boolean>(true);
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) setReducedMotion(true);
  }, []);

  // Reset timeline cleanly whenever animation changes
  useEffect(() => {
    playbackRef.current = {
      progress: 0,
      isPlaying: false,
      speed,
      stepByStep,
    };
    setProgress(0);
    setIsPlaying(false);
    setCompleted(false);
  }, [animation.id]);

  const activeStepIndex = useMemo(() => {
    const idx = animation.steps.findIndex(
      (step) => progress >= step.startProgress && progress <= step.endProgress
    );
    return idx >= 0 ? idx : animation.steps.length - 1;
  }, [animation.steps, progress]);

  const activeStep = animation.steps[activeStepIndex] || animation.steps[0];

  const handleClockTick = useCallback((nextProgress: number, reachedEnd: boolean) => {
    setProgress(nextProgress);
    setIsPlaying(playbackRef.current.isPlaying);
    if (reachedEnd) setCompleted(true);
  }, []);

  const togglePlay = () => {
    if (progress >= 0.999) {
      playbackRef.current.progress = 0;
      setProgress(0);
      setCompleted(false);
    }
    const next = !playbackRef.current.isPlaying;
    playbackRef.current.isPlaying = next;
    setIsPlaying(next);
  };

  const handleScrub = (val: number) => {
    const clamped = Math.max(0, Math.min(1, val));
    playbackRef.current.progress = clamped;
    setProgress(clamped);
    setCompleted(clamped >= 1);
  };

  const handleRestart = () => {
    playbackRef.current.progress = 0;
    playbackRef.current.isPlaying = true;
    setProgress(0);
    setCompleted(false);
    setIsPlaying(true);
  };

  const handleSpeedChange = (nextSpeed: 0.5 | 1 | 2) => {
    playbackRef.current.speed = nextSpeed;
    setSpeed(nextSpeed);
  };

  const handleStepByStepToggle = () => {
    const next = !stepByStep;
    playbackRef.current.stepByStep = next;
    setStepByStep(next);
  };

  const jumpToStep = (stepIdx: number, autoPlay = false) => {
    const clampedIdx = Math.max(0, Math.min(animation.steps.length - 1, stepIdx));
    const target = animation.steps[clampedIdx];
    const startP = target.startProgress + (clampedIdx > 0 ? 0.002 : 0);
    playbackRef.current.progress = startP;
    playbackRef.current.isPlaying = autoPlay;
    setProgress(startP);
    setCompleted(false);
    setIsPlaying(autoPlay);
  };

  const currentSeconds = progress * animation.durationSeconds;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 rounded-3xl border border-slate-200 dark:border-slate-800/90 p-3 sm:p-4 shadow-sm dark:shadow-2xl transition-colors duration-200">
      {/* LEFT / MAIN: 3D Animation Viewport + Deterministic Timeline Controls */}
      <div className="xl:col-span-8 flex flex-col gap-3">
        {/* Top Metadata & Mode Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 px-3.5 py-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                animation.isSchematic
                  ? 'bg-cyan-50 dark:bg-cyan-950 border-cyan-200 dark:border-cyan-800 text-cyan-800 dark:text-cyan-300'
                  : 'bg-teal-50 dark:bg-teal-950 border-teal-200 dark:border-teal-800 text-teal-800 dark:text-teal-300'
              }`}
            >
              {animation.isSchematic
                ? 'Educational Physiological Schematic'
                : '3D Organ Mechanism (BodyParts3D)'}
            </span>
            <h2 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">{animation.title}</h2>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setFollowCamera((f) => !f)}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-colors ${
                followCamera
                  ? 'bg-teal-50 dark:bg-teal-600/20 border-teal-500 text-teal-800 dark:text-teal-300'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Auto-Camera</span>
            </button>
            <button
              type="button"
              onClick={() => setShowLabels((l) => !l)}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-colors ${
                showLabels
                  ? 'bg-cyan-50 dark:bg-cyan-600/20 border-cyan-500 text-cyan-800 dark:text-cyan-300'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
              }`}
            >
              <Tag className="w-3.5 h-3.5" />
              <span>Callouts</span>
            </button>
            <button
              type="button"
              onClick={() => setShowCaptions((c) => !c)}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-colors ${
                showCaptions
                  ? 'bg-violet-50 dark:bg-violet-600/20 border-violet-500 text-violet-800 dark:text-violet-300'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
              }`}
            >
              <Captions className="w-3.5 h-3.5" />
              <span>Captions</span>
            </button>
            <button
              type="button"
              onClick={() => setReducedMotion((r) => !r)}
              title="Toggle Reduced Motion / Accessible Mode"
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-colors ${
                reducedMotion
                  ? 'bg-amber-50 dark:bg-amber-600/20 border-amber-500 text-amber-800 dark:text-amber-300'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
              }`}
            >
              <Accessibility className="w-3.5 h-3.5" />
              <span>Reduced Motion</span>
            </button>
          </div>
        </div>

        {/* 3D Animation Viewport */}
        <div className="relative h-[380px] sm:h-[460px] rounded-2xl bg-[radial-gradient(circle_at_center,#122238_0%,#060a12_100%)] border border-slate-800 overflow-hidden">
          {reducedMotion ? (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-4">
              <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-950/60 border border-amber-800 text-amber-300">
                Reduced-Motion Accessible Step View · Step {activeStep.order} of {animation.steps.length}
              </span>
              <h3 className="text-lg sm:text-xl font-extrabold text-white max-w-lg">
                {activeStep.title}
              </h3>
              <p className="text-sm text-cyan-200 max-w-xl leading-relaxed">{activeStep.caption}</p>
              <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
                {activeStep.explanation}
              </p>
            </div>
          ) : (
            <MedVerseSceneCanvas frameloop="always" cameraPosition={activeStep.cameraPosition}>
              <ScientificAnimationScene
                animation={animation}
                playbackRef={playbackRef}
                activeStep={activeStep}
                followCamera={followCamera}
                showLabels={showLabels}
                reducedMotion={reducedMotion}
                onClockTick={handleClockTick}
              />
            </MedVerseSceneCanvas>
          )}

          {/* Synchronized Bottom Caption Bar */}
          {showCaptions && !reducedMotion && (
            <div className="absolute bottom-3 left-3 right-3 z-10 rounded-xl bg-slate-950/88 backdrop-blur-md border border-slate-700/80 px-3.5 py-2.5">
              <div className="flex items-center justify-between gap-2 mb-0.5">
                <span className="text-[11px] font-bold text-teal-400">
                  Step {activeStep.order}/{animation.steps.length}: {activeStep.title}
                </span>
                {completed && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700">
                    <CheckCircle2 className="w-3 h-3" /> Complete
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-100 leading-snug">{activeStep.caption}</p>
            </div>
          )}
        </div>

        {/* Timeline Scrubber & Playback Controls */}
        <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 p-3.5 space-y-3">
          {/* Scrubber Slider with Step Tick Indicators */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-600 dark:text-slate-400">
              <span>
                {formatClockTime(currentSeconds)} / {formatClockTime(animation.durationSeconds)}
              </span>
              <span>{Math.round(progress * 100)}% Timeline</span>
            </div>
            <input
              type="range"
              min={0}
              max={1}
              step={0.002}
              value={progress}
              onChange={(e) => handleScrub(Number(e.target.value))}
              aria-label="Animation timeline scrubber"
              className="w-full accent-teal-600 dark:accent-teal-400 cursor-pointer"
            />
            <div className="flex items-center gap-1">
              {animation.steps.map((step, idx) => (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => jumpToStep(idx, false)}
                  style={{
                    width: `${Math.max(10, (step.endProgress - step.startProgress) * 100)}%`,
                  }}
                  title={step.title}
                  className={`h-2 rounded-full transition-colors ${
                    idx === activeStepIndex
                      ? 'bg-teal-500 dark:bg-teal-400'
                      : idx < activeStepIndex
                      ? 'bg-teal-700'
                      : 'bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700'
                  }`}
                  aria-label={`Jump to ${step.title}`}
                />
              ))}
            </div>
          </div>

          {/* Primary Transport Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={togglePlay}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-colors shadow-sm"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                <span>{isPlaying ? 'Pause' : completed ? 'Replay' : 'Play'}</span>
              </button>

              <button
                type="button"
                onClick={handleRestart}
                aria-label="Restart animation"
                className="p-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-transparent text-slate-700 dark:text-slate-200 transition-colors"
                title="Restart"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => jumpToStep(activeStepIndex - 1, false)}
                disabled={activeStepIndex === 0}
                aria-label="Previous step"
                className="p-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-transparent disabled:opacity-40 text-slate-700 dark:text-slate-200 transition-colors"
                title="Previous Step"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => jumpToStep(activeStepIndex + 1, false)}
                disabled={activeStepIndex >= animation.steps.length - 1}
                aria-label="Next step"
                className="p-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-transparent disabled:opacity-40 text-slate-700 dark:text-slate-200 transition-colors"
                title="Next Step"
              >
                <SkipForward className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => jumpToStep(activeStepIndex, true)}
                className="inline-flex items-center gap-1 px-2.5 py-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-transparent text-cyan-700 dark:text-cyan-300 text-xs font-semibold transition-colors"
                title="Replay Current Step"
              >
                <Repeat className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Replay Step</span>
              </button>
            </div>

            {/* Playback Speed + Step-by-Step Mode */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center p-0.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                {([0.5, 1, 2] as const).map((sp) => (
                  <button
                    key={sp}
                    type="button"
                    onClick={() => handleSpeedChange(sp)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold transition-colors ${
                      speed === sp
                        ? 'bg-teal-600 text-white'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {sp}x
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={handleStepByStepToggle}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${
                  stepByStep
                    ? 'bg-violet-50 dark:bg-violet-600/20 border-violet-500 text-violet-800 dark:text-violet-300'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                Step-by-Step: {stepByStep ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: Synchronized Explanation, Step Breakdown & Simplification Disclosure */}
      <aside className="xl:col-span-4 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 p-4 flex flex-col justify-between gap-4 max-h-[680px] overflow-y-auto">
        <div className="space-y-4">
          <div className="space-y-1.5 border-b border-slate-200 dark:border-slate-800 pb-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400">
              {animation.system} · Step {activeStep.order} of {animation.steps.length}
            </span>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">{activeStep.title}</h3>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{activeStep.explanation}</p>
          </div>

          {activeStep.clinicalPearl && (
            <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950/35 border border-teal-200 dark:border-teal-800/60 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Clinical Correlation
              </span>
              <p className="text-xs text-teal-950 dark:text-teal-100 leading-relaxed">{activeStep.clinicalPearl}</p>
            </div>
          )}

          {/* Step List */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
              Mechanism Sequence
            </span>
            <div className="space-y-1.5">
              {animation.steps.map((step, idx) => {
                const active = idx === activeStepIndex;
                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => jumpToStep(idx, false)}
                    className={`w-full text-left p-2.5 rounded-xl border text-xs transition-colors ${
                      active
                        ? 'bg-teal-50 dark:bg-teal-950/60 border-teal-500 text-teal-950 dark:text-white'
                        : 'bg-white dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="font-bold">{step.title}</div>
                    <div className="text-[11px] opacity-85 line-clamp-2 mt-0.5">{step.caption}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-3 pt-3 border-t border-slate-200 dark:border-slate-800">
          <div className="p-2.5 rounded-xl bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed flex items-start gap-2">
            <Info className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
            <span>
              <strong className="text-slate-800 dark:text-slate-200">Scientific Disclosure:</strong>{' '}
              {animation.simplificationNotice}
            </span>
          </div>

          <Link
            href={`/doctor/topics/${animation.topicId}`}
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            <span>Open Synchronized Notes &amp; Quiz</span>
          </Link>
        </div>
      </aside>
    </div>
  );
};
