'use client';

import React, { Suspense, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { PlayCircle, Loader2 } from 'lucide-react';
import { SCIENTIFIC_ANIMATIONS, SCIENTIFIC_ANIMATIONS_BY_ID } from '@/data/medverse';

const AnimationTimelinePlayer = dynamic(
  () =>
    import('@/components/medverse/three/AnimationTimelinePlayer').then(
      (m) => m.AnimationTimelinePlayer
    ),
  {
    ssr: false,
    loading: () => (
      <div className="h-[540px] rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center gap-3 text-slate-600 dark:text-slate-300 text-xs">
        <Loader2 className="w-6 h-6 text-teal-400 animate-spin" />
        <span>Loading Timeline Scientific Animation Engine...</span>
      </div>
    ),
  }
);

function AnimationsStudioInner() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get('anim') || SCIENTIFIC_ANIMATIONS[0].id;
  const [activeAnimId, setActiveAnimId] = useState<string>(
    SCIENTIFIC_ANIMATIONS_BY_ID[initialId] ? initialId : SCIENTIFIC_ANIMATIONS[0].id
  );

  useEffect(() => {
    const p = searchParams.get('anim');
    if (p && SCIENTIFIC_ANIMATIONS_BY_ID[p]) {
      setActiveAnimId(p);
    }
  }, [searchParams]);

  const activeAnim = SCIENTIFIC_ANIMATIONS_BY_ID[activeAnimId] || SCIENTIFIC_ANIMATIONS[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-5">
      {/* Header & Animation Selector */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-4 sm:p-5 space-y-4 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
              <PlayCircle className="w-4 h-4" />
              <span>Deterministic Single-Clock Scientific Animation Studio</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Physiological &amp; Molecular Mechanism Animations
            </h1>
          </div>
          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
            {SCIENTIFIC_ANIMATIONS.length} Interactive Mechanisms Ready
          </span>
        </div>

        {/* Selector Pills */}
        <div className="flex flex-wrap gap-2">
          {SCIENTIFIC_ANIMATIONS.map((anim) => {
            const active = anim.id === activeAnim.id;
            return (
              <button
                key={anim.id}
                type="button"
                onClick={() => setActiveAnimId(anim.id)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-colors text-left ${
                  active
                    ? 'bg-teal-600 border-teal-500 text-white'
                    : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-teal-500/50'
                }`}
              >
                <span className="block">{anim.title}</span>
                <span className="text-[10px] opacity-75">
                  {anim.isSchematic ? '3D Schematic' : 'BodyParts3D GLB'} · {anim.durationSeconds}s
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Timeline Player */}
      <AnimationTimelinePlayer animation={activeAnim} />
    </div>
  );
}

export default function MedVerseAnimationsPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-xs text-slate-400">Loading Animation Studio...</div>
      }
    >
      <AnimationsStudioInner />
    </Suspense>
  );
}
