'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { ANATOMY_ASSETS } from '@/data/medverse';

const AnatomyGLBViewer = dynamic(
  () => import('@/components/medverse/three/AnatomyGLBViewer').then((m) => m.AnatomyGLBViewer),
  {
    ssr: false,
    loading: () => (
      <div className="h-[500px] bg-white dark:bg-slate-950 flex flex-col items-center justify-center gap-2 text-slate-600 dark:text-slate-300 text-xs">
        <Loader2 className="w-6 h-6 text-teal-600 dark:text-teal-400 animate-spin" />
        <span>Loading MedVerse 3D Embed...</span>
      </div>
    ),
  }
);

function EmbedViewerInner() {
  const params = useSearchParams();
  const assetParam = params.get('asset') || 'heart-bp3d';
  const structureParam = params.get('structure');
  const xrayParam = params.get('xray') === '1';

  const validAsset =
    ANATOMY_ASSETS[assetParam]?.kind === 'glb_anatomical' ? assetParam : 'heart-bp3d';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-2 sm:p-4 transition-colors duration-200">
      <AnatomyGLBViewer
        key={validAsset}
        assetId={validAsset}
        initialSelectedStructureId={structureParam}
        initialXRayMode={xrayParam}
        compact
        embedMode
      />
    </div>
  );
}

export default function MedVerseEmbedPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center text-xs text-slate-500 dark:text-slate-400">
          Initializing embed viewer...
        </div>
      }
    >
      <EmbedViewerInner />
    </Suspense>
  );
}
