'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { DSAAlgorithmType } from '@/lib/types';

const LoadingBox = () => (
  <div className="h-64 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-center text-xs font-mono text-slate-400">
    Loading DSA Visualizer...
  </div>
);

const BinarySearchVisualizer = dynamic(() => import('./BinarySearchVisualizer').then((m) => m.BinarySearchVisualizer), { ssr: false, loading: LoadingBox });
const SortingVisualizer = dynamic(() => import('./SortingVisualizer').then((m) => m.SortingVisualizer), { ssr: false, loading: LoadingBox });
const LinkedListVisualizer = dynamic(() => import('./LinkedListVisualizer').then((m) => m.LinkedListVisualizer), { ssr: false, loading: LoadingBox });
const StackQueueVisualizer = dynamic(() => import('./StackQueueVisualizer').then((m) => m.StackQueueVisualizer), { ssr: false, loading: LoadingBox });
const TreeVisualizer = dynamic(() => import('./TreeVisualizer').then((m) => m.TreeVisualizer), { ssr: false, loading: LoadingBox });
const GraphVisualizer = dynamic(() => import('./GraphVisualizer').then((m) => m.GraphVisualizer), { ssr: false, loading: LoadingBox });
const DPTableVisualizer = dynamic(() => import('./DPTableVisualizer').then((m) => m.DPTableVisualizer), { ssr: false, loading: LoadingBox });
const RecursionTreeVisualizer = dynamic(() => import('./RecursionTreeVisualizer').then((m) => m.RecursionTreeVisualizer), { ssr: false, loading: LoadingBox });

interface DSAVisualizerDispatcherProps {
  type: DSAAlgorithmType;
}

export const DSAVisualizerDispatcher: React.FC<DSAVisualizerDispatcherProps> = ({ type }) => {
  switch (type) {
    case 'binary-search':
      return <BinarySearchVisualizer />;
    case 'sorting':
      return <SortingVisualizer initialAlgo="quick" />;
    case 'heap':
      return <SortingVisualizer initialAlgo="heap" />;
    case 'linked-list':
      return <LinkedListVisualizer />;
    case 'stack-queue':
      return <StackQueueVisualizer />;
    case 'tree':
    case 'trie':
      return <TreeVisualizer initialOp="inorder" />;
    case 'graph':
      return <GraphVisualizer />;
    case 'dp-table':
    case 'hash-table':
      return <DPTableVisualizer initialProblem="knapsack" />;
    case 'recursion-tree':
      return <RecursionTreeVisualizer />;
    case 'none':
    default:
      return null;
  }
};
