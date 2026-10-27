'use client';

import React from 'react';
import { AlgorithmType } from '@/lib/types';
import { LinearRegressionVisualizer } from './LinearRegressionVisualizer';
import { GradientDescentVisualizer } from './GradientDescentVisualizer';
import { LogisticBoundaryVisualizer } from './LogisticBoundaryVisualizer';
import { KMeansVisualizer } from './KMeansVisualizer';
import { MetricsRocVisualizer } from './MetricsRocVisualizer';
import { DecisionTreeVisualizer } from './DecisionTreeVisualizer';
import { KNNVisualizer } from './KNNVisualizer';
import { PCAVisualizer } from './PCAVisualizer';
import { NeuralNetVisualizer } from './NeuralNetVisualizer';
import { NumPyVisualizer } from './NumPyVisualizer';
import { PandasVisualizer } from './PandasVisualizer';

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
    case 'decision-tree':
      return <DecisionTreeVisualizer />;
    case 'knn':
      return <KNNVisualizer />;
    case 'kmeans':
      return <KMeansVisualizer />;
    case 'neural-net':
      return <NeuralNetVisualizer />;
    case 'metrics-roc':
      return <MetricsRocVisualizer />;
    case 'pca':
      return <PCAVisualizer />;
    case 'numpy-interactive':
      return <NumPyVisualizer />;
    case 'pandas-interactive':
      return <PandasVisualizer />;
    case 'none':
    default:
      return null;
  }
};
