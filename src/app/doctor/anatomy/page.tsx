'use client';

import React, { Suspense, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import {
  Box,
  HeartPulse,
  Bone,
  Brain,
  Wind,
  Activity,
  Droplets,
  Eye,
  Loader2,
} from 'lucide-react';
import { ANATOMY_ASSET_LIST, ANATOMY_ASSETS } from '@/data/medverse';

const AnatomyGLBViewer = dynamic(
  () => import('@/components/medverse/three/AnatomyGLBViewer').then((m) => m.AnatomyGLBViewer),
  {
    ssr: false,
    loading: () => (
      <div className="h-[540px] rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center gap-3 text-slate-600 dark:text-slate-300 text-xs">
        <Loader2 className="w-6 h-6 text-teal-400 animate-spin" />
        <span>Initializing Three.js WebGL 3D Anatomy Engine...</span>
      </div>
    ),
  }
);

const ORGAN_SHORT_LABELS: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  'heart-bp3d': { label: 'Heart (11)', icon: HeartPulse, color: 'text-rose-300' },
  'skeleton-bp3d': { label: 'Skeleton (242)', icon: Bone, color: 'text-amber-300' },
  'brain-bp3d': { label: 'Brain (19)', icon: Brain, color: 'text-indigo-300' },
  'lungs-bp3d': { label: 'Lungs (20)', icon: Wind, color: 'text-sky-300' },
  'kidneys-bp3d': { label: 'Kidneys (6)', icon: Droplets, color: 'text-amber-300' },
  'liver-bp3d': { label: 'Liver (7)', icon: Activity, color: 'text-red-300' },
  'eye-bp3d': { label: 'Eye & Orbit (21)', icon: Eye, color: 'text-cyan-300' },
};

function AnatomyAtlasInner() {
  const searchParams = useSearchParams();
  const initialAsset = searchParams.get('asset') || 'heart-bp3d';
  const initialStructure = searchParams.get('structure');

  const [activeAssetId, setActiveAssetId] = useState<string>(
    ANATOMY_ASSETS[initialAsset]?.kind === 'glb_anatomical' ? initialAsset : 'heart-bp3d'
  );
  const [focusedStructureId, setFocusedStructureId] = useState<string | null>(initialStructure);

  useEffect(() => {
    const paramAsset = searchParams.get('asset');
    if (paramAsset && ANATOMY_ASSETS[paramAsset]?.kind === 'glb_anatomical') {
      setActiveAssetId(paramAsset);
    }
    const paramStruct = searchParams.get('structure');
    if (paramStruct) {
      setFocusedStructureId(paramStruct);
    }
  }, [searchParams]);

  const glbAssets = ANATOMY_ASSET_LIST.filter((a) => a.kind === 'glb_anatomical');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-5">
      {/* Header & Asset Selector */}
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-4 sm:p-5 shadow-xs">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
            <Box className="w-4 h-4" />
            <span>Interactive 3D Anatomy Workstation ({glbAssets.length} BodyParts3D Organs)</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            MedVerse 3D Anatomical Atlas
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Explore Heart, Skeleton, Brain, Lungs, Kidneys, Liver, and Eye in WebGL with X-Ray mode, 3D surface pins, drawing annotations, pathology overlays, Latin/FMA terminology, and saved collections.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {glbAssets.map((asset) => {
            const active = activeAssetId === asset.id;
            const meta = ORGAN_SHORT_LABELS[asset.id] || {
              label: asset.title,
              icon: Box,
              color: 'text-teal-500 dark:text-teal-300',
            };
            const Icon = meta.icon;
            return (
              <button
                key={asset.id}
                type="button"
                onClick={() => {
                  setFocusedStructureId(null);
                  setActiveAssetId(asset.id);
                }}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                  active
                    ? 'bg-teal-600 border-teal-500 text-white shadow-md shadow-teal-600/20'
                    : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-teal-500/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-white' : meta.color}`} />
                <span>{meta.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main 3D Viewport */}
      <AnatomyGLBViewer
        key={activeAssetId}
        assetId={activeAssetId}
        initialSelectedStructureId={focusedStructureId}
        onRequestAssetSwitch={(nextAsset, focusIds) => {
          if (ANATOMY_ASSETS[nextAsset]?.kind === 'glb_anatomical') {
            setActiveAssetId(nextAsset);
            setFocusedStructureId(focusIds?.[0] || null);
          }
        }}
      />
    </div>
  );
}

export default function MedVerseAnatomyPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-xs text-slate-400">Loading 3D Anatomy Atlas...</div>
      }
    >
      <AnatomyAtlasInner />
    </Suspense>
  );
}
