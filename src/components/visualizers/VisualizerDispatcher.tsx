'use client';

import React from 'react';
import { AlgorithmType } from '@/lib/types';
import { LinearRegressionVisualizer } from './LinearRegressionVisualizer';
import { GradientDescentVisualizer } from './GradientDescentVisualizer';
import { LogisticBoundaryVisualizer } from './LogisticBoundaryVisualizer';
import { KMeansVisualizer } from './KMeansVisualizer';
import { MetricsRocVisualizer } from './MetricsRocVisualizer';

interface VisualizerDispatcherProps {
  type: AlgorithmType;
}

export const VisualizerDispatcher: React.FC<VisualizerDispatcherProps> = ({ type }) => {
  switch (type) {
    case 'linear-regression':
      return <LinearRegressionVisualizer />;
    case 'gradient-descent':
      return <GradientDescentVisualizer />;
    case 'logistic-boundary':
    case 'svm-boundary':
      return <LogisticBoundaryVisualizer />;
    case 'kmeans':
      return <KMeansVisualizer />;
    case 'metrics-roc':
      return <MetricsRocVisualizer />;
    default:
      return <LinearRegressionVisualizer />;
  }
};
