'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { JavaConceptType } from '@/lib/types';

const LoadingBox = () => (
  <div className="h-64 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-center text-xs font-mono text-slate-400">
    Loading Java Visualizer...
  </div>
);

const JVMArchitectureVisualizer = dynamic(() => import('./JVMArchitectureVisualizer').then((m) => m.JVMArchitectureVisualizer), { ssr: false, loading: LoadingBox });
const JavaMemoryVisualizer = dynamic(() => import('./JavaMemoryVisualizer').then((m) => m.JavaMemoryVisualizer), { ssr: false, loading: LoadingBox });
const JavaControlFlowVisualizer = dynamic(() => import('./JavaControlFlowVisualizer').then((m) => m.JavaControlFlowVisualizer), { ssr: false, loading: LoadingBox });
const JavaCallStackVisualizer = dynamic(() => import('./JavaCallStackVisualizer').then((m) => m.JavaCallStackVisualizer), { ssr: false, loading: LoadingBox });
const JavaOOPVisualizer = dynamic(() => import('./JavaOOPVisualizer').then((m) => m.JavaOOPVisualizer), { ssr: false, loading: LoadingBox });
const JavaArrayAlgorithmVisualizer = dynamic(() => import('./JavaArrayAlgorithmVisualizer').then((m) => m.JavaArrayAlgorithmVisualizer), { ssr: false, loading: LoadingBox });
const JavaCollectionsVisualizer = dynamic(() => import('./JavaCollectionsVisualizer').then((m) => m.JavaCollectionsVisualizer), { ssr: false, loading: LoadingBox });

interface JavaVisualizerDispatcherProps {
  type: JavaConceptType;
}

export const JavaVisualizerDispatcher: React.FC<JavaVisualizerDispatcherProps> = ({ type }) => {
  switch (type) {
    case 'jvm-architecture':
      return <JVMArchitectureVisualizer />;
    case 'memory-model':
      return <JavaMemoryVisualizer />;
    case 'control-flow':
      return <JavaControlFlowVisualizer />;
    case 'call-stack':
      return <JavaCallStackVisualizer />;
    case 'oop-hierarchy':
      return <JavaOOPVisualizer />;
    case 'array-algorithm':
      return <JavaArrayAlgorithmVisualizer />;
    case 'collections-visual':
      return <JavaCollectionsVisualizer />;
    case 'none':
    default:
      return null;
  }
};
