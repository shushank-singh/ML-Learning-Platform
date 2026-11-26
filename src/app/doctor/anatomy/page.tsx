'use client';

import React, { Suspense, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { Box, HeartPulse, Bone, Loader2 } from 'lucide-react';
import { ANATOMY_ASSET_LIST } from '@/data/medverse';

const AnatomyGLBViewer = dynamic(
  () => import('@/components/medverse/three/AnatomyGLBViewer').then((m) => m.AnatomyGLBViewer),
  {
    ssr: false,
    loading: () => (
      <div className="h-[540px] rounded-3xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center gap-3 text-slate-300 text-xs">
        <Loader2 className="w-6 h-6 text-teal-400 animate-spin" />
        <span>Initializing Three.js WebGL 3D Anatomy Engine...</span>
      </div>
    ),
  }
);

function AnatomyAtlasInner() {
  const searchParams = useSearchParams();
  const initialAsset = searchParams.get('asset') || 'heart-bp3d';
  const initialStructure = searchParams.get('structure');

  const [activeAssetId, setActiveAssetId] = useState<string>(
    initialAsset === 'skeleton-bp3d' ? 'skeleton-bp3d' : 'heart-bp3d'
  );

  useEffect(() => {
    const paramAsset = searchParams.get('asset');
    if (paramAsset === 'heart-bp3d' || paramAsset === 'skeleton-bp3d') {
      setActiveAssetId(paramAsset);
    }
  }, [searchParams]);

  const glbAssets = ANATOMY_ASSET_LIST.filter((a) => a.kind === 'glb_anatomical');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-5">
      {/* Header & Asset Selector */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/90 p-4 sm:p-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-teal-400 uppercase tracking-wider">
            <Box className="w-4 h-4" />
            <span>Real Interactive 3D Anatomy Engine (BodyParts3D GLB)</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            MedVerse 3D Anatomical Atlas
          </h1>
          <p className="text-xs text-slate-400">
            Click any structure in 3D or the explorer to inspect FMA metadata, relationships, clinical correlations, isolation, opacity, and cross-sections.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {glbAssets.map((asset) => {
            const active = activeAssetId === asset.id;
            return (
              <button
                key={asset.id}
                type="button"
                onClick={() => setActiveAssetId(asset.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                  active
                    ? 'bg-teal-600 border-teal-500 text-white shadow-md shadow-teal-600/20'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-teal-500/60'
                }`}
              >
                {asset.id === 'heart-bp3d' ? (
                  <HeartPulse className="w-4 h-4 text-rose-300" />
                ) : (
                  <Bone className="w-4 h-4 text-amber-300" />
                )}
                <span>
                  {asset.id === 'heart-bp3d'
                    ? 'Human Heart (11 Structures)'
                    : 'Human Skeleton (242 Bones)'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main 3D Viewport */}
      <AnatomyGLBViewer
        key={activeAssetId}
        assetId={activeAssetId}
        initialSelectedStructureId={initialStructure}
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
