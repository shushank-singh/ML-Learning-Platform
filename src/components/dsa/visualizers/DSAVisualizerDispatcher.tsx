'use client';

import React from 'react';
import { DSAAlgorithmType } from '@/lib/types';
import { BinarySearchVisualizer } from './BinarySearchVisualizer';
import { SortingVisualizer } from './SortingVisualizer';
import { LinkedListVisualizer } from './LinkedListVisualizer';
import { StackQueueVisualizer } from './StackQueueVisualizer';
import { TreeVisualizer } from './TreeVisualizer';
import { GraphVisualizer } from './GraphVisualizer';
import { DPTableVisualizer } from './DPTableVisualizer';
import { RecursionTreeVisualizer } from './RecursionTreeVisualizer';

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
