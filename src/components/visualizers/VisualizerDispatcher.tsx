'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { AlgorithmType } from '@/lib/types';

const VisualizerLoading = () => (
  <div className="h-64 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-center text-xs font-mono text-slate-400">
    Loading Interactive Visualizer...
  </div>
);

const LinearRegressionVisualizer = dynamic(() => import('./LinearRegressionVisualizer').then((m) => m.LinearRegressionVisualizer), { ssr: false, loading: VisualizerLoading });
const GradientDescentVisualizer = dynamic(() => import('./GradientDescentVisualizer').then((m) => m.GradientDescentVisualizer), { ssr: false, loading: VisualizerLoading });
const LogisticBoundaryVisualizer = dynamic(() => import('./LogisticBoundaryVisualizer').then((m) => m.LogisticBoundaryVisualizer), { ssr: false, loading: VisualizerLoading });
const KMeansVisualizer = dynamic(() => import('./KMeansVisualizer').then((m) => m.KMeansVisualizer), { ssr: false, loading: VisualizerLoading });
const MetricsRocVisualizer = dynamic(() => import('./MetricsRocVisualizer').then((m) => m.MetricsRocVisualizer), { ssr: false, loading: VisualizerLoading });
const DecisionTreeVisualizer = dynamic(() => import('./DecisionTreeVisualizer').then((m) => m.DecisionTreeVisualizer), { ssr: false, loading: VisualizerLoading });
const KNNVisualizer = dynamic(() => import('./KNNVisualizer').then((m) => m.KNNVisualizer), { ssr: false, loading: VisualizerLoading });
const PCAVisualizer = dynamic(() => import('./PCAVisualizer').then((m) => m.PCAVisualizer), { ssr: false, loading: VisualizerLoading });
const NeuralNetVisualizer = dynamic(() => import('./NeuralNetVisualizer').then((m) => m.NeuralNetVisualizer), { ssr: false, loading: VisualizerLoading });
const NumPyVisualizer = dynamic(() => import('./NumPyVisualizer').then((m) => m.NumPyVisualizer), { ssr: false, loading: VisualizerLoading });
const PandasVisualizer = dynamic(() => import('./PandasVisualizer').then((m) => m.PandasVisualizer), { ssr: false, loading: VisualizerLoading });

const NeuronCalculator = dynamic(() => import('./dl/NeuronCalculator').then((m) => m.NeuronCalculator), { ssr: false, loading: VisualizerLoading });
const ActivationExplorer = dynamic(() => import('./dl/ActivationExplorer').then((m) => m.ActivationExplorer), { ssr: false, loading: VisualizerLoading });
const ForwardPropExplorer = dynamic(() => import('./dl/ForwardPropExplorer').then((m) => m.ForwardPropExplorer), { ssr: false, loading: VisualizerLoading });
const LossExplorer = dynamic(() => import('./dl/LossExplorer').then((m) => m.LossExplorer), { ssr: false, loading: VisualizerLoading });
const GradientDescentPlayground = dynamic(() => import('./dl/GradientDescentPlayground').then((m) => m.GradientDescentPlayground), { ssr: false, loading: VisualizerLoading });
const OverfittingExplorer = dynamic(() => import('./dl/OverfittingExplorer').then((m) => m.OverfittingExplorer), { ssr: false, loading: VisualizerLoading });
const CNNConvolutionExplorer = dynamic(() => import('./dl/CNNConvolutionExplorer').then((m) => m.CNNConvolutionExplorer), { ssr: false, loading: VisualizerLoading });
const AttentionExplorer = dynamic(() => import('./dl/AttentionExplorer').then((m) => m.AttentionExplorer), { ssr: false, loading: VisualizerLoading });

const TokenizationExplorer = dynamic(() => import('./transformers/TokenizationExplorer').then((m) => m.TokenizationExplorer), { ssr: false, loading: VisualizerLoading });
const PositionalEncodingExplorer = dynamic(() => import('./transformers/PositionalEncodingExplorer').then((m) => m.PositionalEncodingExplorer), { ssr: false, loading: VisualizerLoading });
const CausalMaskExplorer = dynamic(() => import('./transformers/CausalMaskExplorer').then((m) => m.CausalMaskExplorer), { ssr: false, loading: VisualizerLoading });
const MultiHeadAttentionExplorer = dynamic(() => import('./transformers/MultiHeadAttentionExplorer').then((m) => m.MultiHeadAttentionExplorer), { ssr: false, loading: VisualizerLoading });

const NextTokenPredictionExplorer = dynamic(() => import('./genai/NextTokenPredictionExplorer').then((m) => m.NextTokenPredictionExplorer), { ssr: false, loading: VisualizerLoading });
const TemperatureSamplingExplorer = dynamic(() => import('./genai/TemperatureSamplingExplorer').then((m) => m.TemperatureSamplingExplorer), { ssr: false, loading: VisualizerLoading });
const TopKTopPExplorer = dynamic(() => import('./genai/TopKTopPExplorer').then((m) => m.TopKTopPExplorer), { ssr: false, loading: VisualizerLoading });
const ContextBudgetExplorer = dynamic(() => import('./genai/ContextBudgetExplorer').then((m) => m.ContextBudgetExplorer), { ssr: false, loading: VisualizerLoading });
const EmbeddingSimilarityExplorer = dynamic(() => import('./genai/EmbeddingSimilarityExplorer').then((m) => m.EmbeddingSimilarityExplorer), { ssr: false, loading: VisualizerLoading });
const PerplexityLossExplorer = dynamic(() => import('./genai/PerplexityLossExplorer').then((m) => m.PerplexityLossExplorer), { ssr: false, loading: VisualizerLoading });
const LoRARankExplorer = dynamic(() => import('./genai/LoRARankExplorer').then((m) => m.LoRARankExplorer), { ssr: false, loading: VisualizerLoading });
const QuantizationSizeExplorer = dynamic(() => import('./genai/QuantizationSizeExplorer').then((m) => m.QuantizationSizeExplorer), { ssr: false, loading: VisualizerLoading });
const LLMEvalBenchmarkExplorer = dynamic(() => import('./genai/LLMEvalBenchmarkExplorer').then((m) => m.LLMEvalBenchmarkExplorer), { ssr: false, loading: VisualizerLoading });

const DocumentChunkingExplorer = dynamic(() => import('./rag/DocumentChunkingExplorer').then((m) => m.DocumentChunkingExplorer), { ssr: false, loading: VisualizerLoading });
const TopKRetrievalExplorer = dynamic(() => import('./rag/TopKRetrievalExplorer').then((m) => m.TopKRetrievalExplorer), { ssr: false, loading: VisualizerLoading });
const ChunkTradeoffExplorer = dynamic(() => import('./rag/ChunkTradeoffExplorer').then((m) => m.ChunkTradeoffExplorer), { ssr: false, loading: VisualizerLoading });
const BM25DenseRetrievalExplorer = dynamic(() => import('./rag/BM25DenseRetrievalExplorer').then((m) => m.BM25DenseRetrievalExplorer), { ssr: false, loading: VisualizerLoading });
const HybridRRFExplorer = dynamic(() => import('./rag/HybridRRFExplorer').then((m) => m.HybridRRFExplorer), { ssr: false, loading: VisualizerLoading });
const RerankingExplorer = dynamic(() => import('./rag/RerankingExplorer').then((m) => m.RerankingExplorer), { ssr: false, loading: VisualizerLoading });
const RAGContextBudgetExplorer = dynamic(() => import('./rag/RAGContextBudgetExplorer').then((m) => m.RAGContextBudgetExplorer), { ssr: false, loading: VisualizerLoading });
const RetrievalMetricsExplorer = dynamic(() => import('./rag/RetrievalMetricsExplorer').then((m) => m.RetrievalMetricsExplorer), { ssr: false, loading: VisualizerLoading });
const GroundedCitationExplorer = dynamic(() => import('./rag/GroundedCitationExplorer').then((m) => m.GroundedCitationExplorer), { ssr: false, loading: VisualizerLoading });

const AgentControlLoopExplorer = dynamic(() => import('./agents/AgentControlLoopExplorer').then((m) => m.AgentControlLoopExplorer), { ssr: false, loading: VisualizerLoading });
const AgentToolCallingExplorer = dynamic(() => import('./agents/AgentToolCallingExplorer').then((m) => m.AgentToolCallingExplorer), { ssr: false, loading: VisualizerLoading });
const AgentMemoryStateExplorer = dynamic(() => import('./agents/AgentMemoryStateExplorer').then((m) => m.AgentMemoryStateExplorer), { ssr: false, loading: VisualizerLoading });
const AgentPlanningExplorer = dynamic(() => import('./agents/AgentPlanningExplorer').then((m) => m.AgentPlanningExplorer), { ssr: false, loading: VisualizerLoading });
const AgentWorkflowGraphExplorer = dynamic(() => import('./agents/AgentWorkflowGraphExplorer').then((m) => m.AgentWorkflowGraphExplorer), { ssr: false, loading: VisualizerLoading });
const AgentMultiAgentHandoffExplorer = dynamic(() => import('./agents/AgentMultiAgentHandoffExplorer').then((m) => m.AgentMultiAgentHandoffExplorer), { ssr: false, loading: VisualizerLoading });
const AgentHITLApprovalExplorer = dynamic(() => import('./agents/AgentHITLApprovalExplorer').then((m) => m.AgentHITLApprovalExplorer), { ssr: false, loading: VisualizerLoading });
const AgentEvaluationExplorer = dynamic(() => import('./agents/AgentEvaluationExplorer').then((m) => m.AgentEvaluationExplorer), { ssr: false, loading: VisualizerLoading });
const AgentSafetyGuardrailsExplorer = dynamic(() => import('./agents/AgentSafetyGuardrailsExplorer').then((m) => m.AgentSafetyGuardrailsExplorer), { ssr: false, loading: VisualizerLoading });
const AgentTraceBudgetExplorer = dynamic(() => import('./agents/AgentTraceBudgetExplorer').then((m) => m.AgentTraceBudgetExplorer), { ssr: false, loading: VisualizerLoading });

const MLLifecycleExplorer = dynamic(() => import('./mlops/MLLifecycleExplorer').then((m) => m.MLLifecycleExplorer), { ssr: false, loading: VisualizerLoading });
const ExperimentComparisonExplorer = dynamic(() => import('./mlops/ExperimentComparisonExplorer').then((m) => m.ExperimentComparisonExplorer), { ssr: false, loading: VisualizerLoading });
const PipelineDAGExplorer = dynamic(() => import('./mlops/PipelineDAGExplorer').then((m) => m.PipelineDAGExplorer), { ssr: false, loading: VisualizerLoading });
const ModelReleaseWorkflowExplorer = dynamic(() => import('./mlops/ModelReleaseWorkflowExplorer').then((m) => m.ModelReleaseWorkflowExplorer), { ssr: false, loading: VisualizerLoading });
const DataDriftExplorer = dynamic(() => import('./mlops/DataDriftExplorer').then((m) => m.DataDriftExplorer), { ssr: false, loading: VisualizerLoading });
const CICDQualityGateExplorer = dynamic(() => import('./mlops/CICDQualityGateExplorer').then((m) => m.CICDQualityGateExplorer), { ssr: false, loading: VisualizerLoading });
const LLMEvaluationExplorer = dynamic(() => import('./mlops/LLMEvaluationExplorer').then((m) => m.LLMEvaluationExplorer), { ssr: false, loading: VisualizerLoading });
const LLMTraceTimelineExplorer = dynamic(() => import('./mlops/LLMTraceTimelineExplorer').then((m) => m.LLMTraceTimelineExplorer), { ssr: false, loading: VisualizerLoading });
const LLMCostLatencyExplorer = dynamic(() => import('./mlops/LLMCostLatencyExplorer').then((m) => m.LLMCostLatencyExplorer), { ssr: false, loading: VisualizerLoading });
const ProductionReadinessChecklist = dynamic(() => import('./mlops/ProductionReadinessChecklist').then((m) => m.ProductionReadinessChecklist), { ssr: false, loading: VisualizerLoading });

const DeploymentArchitectureExplorer = dynamic(() => import('./deployment/DeploymentArchitectureExplorer').then((m) => m.DeploymentArchitectureExplorer), { ssr: false, loading: VisualizerLoading });
const HttpRequestJourneyExplorer = dynamic(() => import('./deployment/HttpRequestJourneyExplorer').then((m) => m.HttpRequestJourneyExplorer), { ssr: false, loading: VisualizerLoading });
const DockerLayerExplorer = dynamic(() => import('./deployment/DockerLayerExplorer').then((m) => m.DockerLayerExplorer), { ssr: false, loading: VisualizerLoading });
const CloudServiceComparisonExplorer = dynamic(() => import('./deployment/CloudServiceComparisonExplorer').then((m) => m.CloudServiceComparisonExplorer), { ssr: false, loading: VisualizerLoading });
const ScalingLoadBalancerExplorer = dynamic(() => import('./deployment/ScalingLoadBalancerExplorer').then((m) => m.ScalingLoadBalancerExplorer), { ssr: false, loading: VisualizerLoading });
const AsyncJobQueueExplorer = dynamic(() => import('./deployment/AsyncJobQueueExplorer').then((m) => m.AsyncJobQueueExplorer), { ssr: false, loading: VisualizerLoading });
const GpuInferenceResourceExplorer = dynamic(() => import('./deployment/GpuInferenceResourceExplorer').then((m) => m.GpuInferenceResourceExplorer), { ssr: false, loading: VisualizerLoading });
const LLMServingLatencyExplorer = dynamic(() => import('./deployment/LLMServingLatencyExplorer').then((m) => m.LLMServingLatencyExplorer), { ssr: false, loading: VisualizerLoading });
const ProductionObservabilityDashboard = dynamic(() => import('./deployment/ProductionObservabilityDashboard').then((m) => m.ProductionObservabilityDashboard), { ssr: false, loading: VisualizerLoading });
const DeploymentReadinessChecklist = dynamic(() => import('./deployment/DeploymentReadinessChecklist').then((m) => m.DeploymentReadinessChecklist), { ssr: false, loading: VisualizerLoading });

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
    case 'deploy-architecture-explorer':
      return <DeploymentArchitectureExplorer />;
    case 'deploy-http-journey-explorer':
      return <HttpRequestJourneyExplorer />;
    case 'deploy-docker-layer-explorer':
      return <DockerLayerExplorer />;
    case 'deploy-cloud-comparison-explorer':
      return <CloudServiceComparisonExplorer />;
    case 'deploy-scaling-lb-explorer':
      return <ScalingLoadBalancerExplorer />;
    case 'deploy-async-job-queue-explorer':
      return <AsyncJobQueueExplorer />;
    case 'deploy-gpu-resource-explorer':
      return <GpuInferenceResourceExplorer />;
    case 'deploy-llm-serving-latency-explorer':
      return <LLMServingLatencyExplorer />;
    case 'deploy-observability-dashboard':
      return <ProductionObservabilityDashboard />;
    case 'deploy-readiness-checklist':
      return <DeploymentReadinessChecklist />;
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
