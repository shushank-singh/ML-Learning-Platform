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
import { NeuronCalculator } from './dl/NeuronCalculator';
import { ActivationExplorer } from './dl/ActivationExplorer';
import { ForwardPropExplorer } from './dl/ForwardPropExplorer';
import { LossExplorer } from './dl/LossExplorer';
import { GradientDescentPlayground } from './dl/GradientDescentPlayground';
import { OverfittingExplorer } from './dl/OverfittingExplorer';
import { CNNConvolutionExplorer } from './dl/CNNConvolutionExplorer';
import { AttentionExplorer } from './dl/AttentionExplorer';
import { TokenizationExplorer } from './transformers/TokenizationExplorer';
import { PositionalEncodingExplorer } from './transformers/PositionalEncodingExplorer';
import { CausalMaskExplorer } from './transformers/CausalMaskExplorer';
import { MultiHeadAttentionExplorer } from './transformers/MultiHeadAttentionExplorer';

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
    case 'neuron-calculator':
      return <NeuronCalculator />;
    case 'activation-explorer':
      return <ActivationExplorer />;
    case 'forward-prop-explorer':
      return <ForwardPropExplorer />;
    case 'loss-explorer':
      return <LossExplorer />;
    case 'gradient-descent-playground':
      return <GradientDescentPlayground />;
    case 'overfitting-explorer':
      return <OverfittingExplorer />;
    case 'cnn-convolution-explorer':
      return <CNNConvolutionExplorer />;
    case 'attention-explorer':
      return <AttentionExplorer />;
    case 'tokenization-explorer':
      return <TokenizationExplorer />;
    case 'positional-encoding-explorer':
      return <PositionalEncodingExplorer />;
    case 'causal-mask-explorer':
      return <CausalMaskExplorer />;
    case 'multi-head-attention-explorer':
      return <MultiHeadAttentionExplorer />;
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
