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
import { NextTokenPredictionExplorer } from './genai/NextTokenPredictionExplorer';
import { TemperatureSamplingExplorer } from './genai/TemperatureSamplingExplorer';
import { TopKTopPExplorer } from './genai/TopKTopPExplorer';
import { ContextBudgetExplorer } from './genai/ContextBudgetExplorer';
import { EmbeddingSimilarityExplorer } from './genai/EmbeddingSimilarityExplorer';
import { PerplexityLossExplorer } from './genai/PerplexityLossExplorer';
import { LoRARankExplorer } from './genai/LoRARankExplorer';
import { QuantizationSizeExplorer } from './genai/QuantizationSizeExplorer';
import { LLMEvalBenchmarkExplorer } from './genai/LLMEvalBenchmarkExplorer';
import { DocumentChunkingExplorer } from './rag/DocumentChunkingExplorer';
import { TopKRetrievalExplorer } from './rag/TopKRetrievalExplorer';
import { ChunkTradeoffExplorer } from './rag/ChunkTradeoffExplorer';
import { BM25DenseRetrievalExplorer } from './rag/BM25DenseRetrievalExplorer';
import { HybridRRFExplorer } from './rag/HybridRRFExplorer';
import { RerankingExplorer } from './rag/RerankingExplorer';
import { RAGContextBudgetExplorer } from './rag/RAGContextBudgetExplorer';
import { RetrievalMetricsExplorer } from './rag/RetrievalMetricsExplorer';
import { GroundedCitationExplorer } from './rag/GroundedCitationExplorer';
import { AgentControlLoopExplorer } from './agents/AgentControlLoopExplorer';
import { AgentToolCallingExplorer } from './agents/AgentToolCallingExplorer';
import { AgentMemoryStateExplorer } from './agents/AgentMemoryStateExplorer';
import { AgentPlanningExplorer } from './agents/AgentPlanningExplorer';
import { AgentWorkflowGraphExplorer } from './agents/AgentWorkflowGraphExplorer';
import { AgentMultiAgentHandoffExplorer } from './agents/AgentMultiAgentHandoffExplorer';
import { AgentHITLApprovalExplorer } from './agents/AgentHITLApprovalExplorer';
import { AgentEvaluationExplorer } from './agents/AgentEvaluationExplorer';
import { AgentSafetyGuardrailsExplorer } from './agents/AgentSafetyGuardrailsExplorer';
import { AgentTraceBudgetExplorer } from './agents/AgentTraceBudgetExplorer';
import { MLLifecycleExplorer } from './mlops/MLLifecycleExplorer';
import { ExperimentComparisonExplorer } from './mlops/ExperimentComparisonExplorer';
import { PipelineDAGExplorer } from './mlops/PipelineDAGExplorer';
import { ModelReleaseWorkflowExplorer } from './mlops/ModelReleaseWorkflowExplorer';
import { DataDriftExplorer } from './mlops/DataDriftExplorer';
import { CICDQualityGateExplorer } from './mlops/CICDQualityGateExplorer';
import { LLMEvaluationExplorer } from './mlops/LLMEvaluationExplorer';
import { LLMTraceTimelineExplorer } from './mlops/LLMTraceTimelineExplorer';
import { LLMCostLatencyExplorer } from './mlops/LLMCostLatencyExplorer';
import { ProductionReadinessChecklist } from './mlops/ProductionReadinessChecklist';

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
    case 'next-token-prediction-explorer':
      return <NextTokenPredictionExplorer />;
    case 'temperature-sampling-explorer':
      return <TemperatureSamplingExplorer />;
    case 'topk-topp-explorer':
      return <TopKTopPExplorer />;
    case 'context-budget-explorer':
      return <ContextBudgetExplorer />;
    case 'embedding-similarity-explorer':
      return <EmbeddingSimilarityExplorer />;
    case 'perplexity-loss-explorer':
      return <PerplexityLossExplorer />;
    case 'lora-rank-explorer':
      return <LoRARankExplorer />;
    case 'quantization-size-explorer':
      return <QuantizationSizeExplorer />;
    case 'llm-eval-benchmark-explorer':
      return <LLMEvalBenchmarkExplorer />;
    case 'rag-chunking-explorer':
      return <DocumentChunkingExplorer />;
    case 'rag-topk-retrieval-explorer':
    case 'rag-vector-space-explorer':
      return <TopKRetrievalExplorer />;
    case 'rag-chunk-tradeoff-explorer':
      return <ChunkTradeoffExplorer />;
    case 'rag-bm25-dense-explorer':
      return <BM25DenseRetrievalExplorer />;
    case 'rag-hybrid-rrf-explorer':
      return <HybridRRFExplorer />;
    case 'rag-reranking-explorer':
      return <RerankingExplorer />;
    case 'rag-context-budget-explorer':
      return <RAGContextBudgetExplorer />;
    case 'rag-retrieval-metrics-explorer':
      return <RetrievalMetricsExplorer />;
    case 'rag-citation-grounding-explorer':
      return <GroundedCitationExplorer />;
    case 'agent-control-loop-explorer':
      return <AgentControlLoopExplorer />;
    case 'agent-tool-calling-explorer':
      return <AgentToolCallingExplorer />;
    case 'agent-memory-state-explorer':
      return <AgentMemoryStateExplorer />;
    case 'agent-planning-explorer':
      return <AgentPlanningExplorer />;
    case 'agent-workflow-graph-explorer':
      return <AgentWorkflowGraphExplorer />;
    case 'agent-multiagent-handoff-explorer':
      return <AgentMultiAgentHandoffExplorer />;
    case 'agent-hitl-approval-explorer':
      return <AgentHITLApprovalExplorer />;
    case 'agent-evaluation-explorer':
      return <AgentEvaluationExplorer />;
    case 'agent-safety-guardrails-explorer':
      return <AgentSafetyGuardrailsExplorer />;
    case 'agent-trace-budget-explorer':
      return <AgentTraceBudgetExplorer />;
    case 'mlops-lifecycle-explorer':
      return <MLLifecycleExplorer />;
    case 'mlops-experiment-comparison-explorer':
      return <ExperimentComparisonExplorer />;
    case 'mlops-pipeline-dag-explorer':
      return <PipelineDAGExplorer />;
    case 'mlops-model-release-explorer':
      return <ModelReleaseWorkflowExplorer />;
    case 'mlops-data-drift-explorer':
      return <DataDriftExplorer />;
    case 'mlops-cicd-quality-gate-explorer':
      return <CICDQualityGateExplorer />;
    case 'mlops-llm-evaluation-explorer':
      return <LLMEvaluationExplorer />;
    case 'mlops-trace-timeline-explorer':
      return <LLMTraceTimelineExplorer />;
    case 'mlops-cost-latency-explorer':
      return <LLMCostLatencyExplorer />;
    case 'mlops-production-readiness-explorer':
      return <ProductionReadinessChecklist />;
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
