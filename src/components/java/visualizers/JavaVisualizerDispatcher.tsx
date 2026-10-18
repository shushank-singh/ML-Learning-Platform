'use client';

import React from 'react';
import { JavaConceptType } from '@/lib/types';
import { JVMArchitectureVisualizer } from './JVMArchitectureVisualizer';
import { JavaMemoryVisualizer } from './JavaMemoryVisualizer';
import { JavaControlFlowVisualizer } from './JavaControlFlowVisualizer';
import { JavaCallStackVisualizer } from './JavaCallStackVisualizer';
import { JavaOOPVisualizer } from './JavaOOPVisualizer';
import { JavaArrayAlgorithmVisualizer } from './JavaArrayAlgorithmVisualizer';
import { JavaCollectionsVisualizer } from './JavaCollectionsVisualizer';

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
