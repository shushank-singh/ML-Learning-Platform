'use client';

import React, { useState } from 'react';
import { RefreshCw, Database, Cpu, CheckCircle2, AlertTriangle, ArrowRight, Activity, ShieldCheck, Server } from 'lucide-react';

interface StageInfo {
  id: string;
  name: string;
  category: 'data' | 'model' | 'deploy' | 'monitor';
  tools: string[];
  artifacts: string[];
  risks: string[];
  metrics: string[];
  description: string;
}

const STAGES: StageInfo[] = [
  {
    id: 'data-prep',
    name: '1. Data Ingestion & Versioning',
    category: 'data',
    tools: ['DVC', 'Delta Lake', 'Feast Feature Store'],
    artifacts: ['Raw CSV/Parquet', 'dvc.lock', 'Data Hash: sha256:4a8b...'],
    risks: ['Data leakage between splits', 'Schema mutations', 'Corrupted distributions'],
    metrics: ['Row count', 'Null percentage', 'Feature cardinality'],
    description: 'Ingest raw datasets, validate incoming schemas, split deterministically into train/val/test, and pin versions with cryptographic hashes.'
  },
  {
    id: 'experimentation',
    name: '2. Experimentation & Training',
    category: 'model',
    tools: ['MLflow Tracking', 'Weights & Biases', 'PyTorch / Scikit-learn'],
    artifacts: ['Model weights (.bin / .safetensors)', 'Hyperparams YAML', 'Training run ID'],
    risks: ['Unseeded non-determinism', 'Silent gradient vanishing', 'Overfitting validation set'],
    metrics: ['Train loss', 'Val loss', 'Epoch duration', 'GPU/RAM utilization'],
    description: 'Systematically train candidate architectures with strict seed control, logging every hyperparameter, metric, and artifact to an experiment tracking server.'
  },
  {
    id: 'evaluation',
    name: '3. Evaluation & Quality Gate',
    category: 'model',
    tools: ['Pytest', 'Great Expectations', 'Deepchecks'],
    artifacts: ['Confusion Matrix PNG', 'Evaluation Report JSON', 'Fairness audit log'],
    risks: ['Sub-population performance dips', 'Latency regressions', 'Threshold overfitting'],
    metrics: ['F1-score', 'ROC-AUC', 'P95 latency (<40ms)', 'Disparate impact ratio'],
    description: 'Run automated assertions against golden test sets. Block promotion if accuracy drops below baseline or if P95 inference latency exceeds service SLA.'
  },
  {
    id: 'packaging',
    name: '4. Packaging & Model Registry',
    category: 'deploy',
    tools: ['Docker', 'MLflow Model Registry', 'ONNX Runtime'],
    artifacts: ['OCI Container image', 'Model Signature', 'Conda / requirements.txt'],
    risks: ['Dependency hell / conflicting C-libs', 'Unsafe pickle deserialization', 'Environment skew'],
    metrics: ['Image size (MB)', 'Cold start time', 'Vulnerability scan report'],
    description: 'Package serialized weights with pinned runtime dependencies into a minimal multi-stage Docker container. Register version in Staging tier.'
  },
  {
    id: 'serving',
    name: '5. Serving & Canary Deployment',
    category: 'deploy',
    tools: ['FastAPI', 'Triton Inference Server', 'Kubernetes / Envoy'],
    artifacts: ['OpenAPI specification', 'Traffic routing rules', 'Helm chart'],
    risks: ['Thread pool starvation under load', 'Memory leaks in workers', 'Uncaught payload exceptions'],
    metrics: ['Requests per second (RPS)', 'P99 Latency (ms)', '5xx HTTP error rate'],
    description: 'Expose REST/gRPC prediction endpoints. Route 10% canary traffic to candidate version while monitoring error rates against champion baseline.'
  },
  {
    id: 'monitoring',
    name: '6. Telemetry & Drift Monitoring',
    category: 'monitor',
    tools: ['Prometheus', 'Evidently AI', 'Grafana'],
    artifacts: ['Drift report JSON', 'Alert notifications', 'Prediction feedback log'],
    risks: ['Covariate shift (input distribution change)', 'Concept drift (ground truth shift)', 'Silent degradation'],
    metrics: ['Kolmogorov-Smirnov p-value', 'PSI (Population Stability Index)', 'Alert count'],
    description: 'Monitor real-time payload distributions against training baseline. Fire automated webhook to re-trigger training pipeline when drift threshold is breached.'
  }
];

export const MLLifecycleExplorer: React.FC = () => {
  const [selectedStageIdx, setSelectedStageIdx] = useState(0);
  const [simulatedCycle, setSimulatedCycle] = useState(false);

  const stage = STAGES[selectedStageIdx];

  const handleNext = () => {
    setSelectedStageIdx((prev) => (prev + 1) % STAGES.length);
  };

  const handleSimulateRetrain = () => {
    setSimulatedCycle(true);
    setSelectedStageIdx(0);
    setTimeout(() => {
      setSimulatedCycle(false);
    }, 2500);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider">
            <RefreshCw className="w-3.5 h-3.5" />
            MLOps Architecture &amp; System Lifecycle
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">
            End-to-End Production ML Feedback Loop
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Explore how data, code, and model artifacts transition across automated stages from raw ingestion to live drift detection.
          </p>
        </div>

        <button
          onClick={handleSimulateRetrain}
          disabled={simulatedCycle}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-all disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${simulatedCycle ? 'animate-spin' : ''}`} />
          <span>{simulatedCycle ? 'Triggering Retrain Pipeline...' : 'Simulate Drift Trigger'}</span>
        </button>
      </div>

      {/* Stepper bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {STAGES.map((st, idx) => {
          const isSelected = selectedStageIdx === idx;
          return (
            <button
              key={st.id}
              onClick={() => setSelectedStageIdx(idx)}
              className={`p-2.5 rounded-xl text-left border transition-all ${
                isSelected
                  ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 shadow-sm'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-850/40 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold uppercase tracking-wider ${
                  isSelected ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'
                }`}>
                  Stage {idx + 1}
                </span>
                {idx === selectedStageIdx && (
                  <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
                )}
              </div>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-1 line-clamp-1">
                {st.name.split('. ')[1]}
              </p>
            </button>
          );
        })}
      </div>

      {/* Stage Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Stage Info */}
        <div className="lg:col-span-2 border border-slate-200 dark:border-slate-800 rounded-xl p-4 bg-slate-50/30 dark:bg-slate-850/30 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">
                {stage.name}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                {stage.description}
              </p>
            </div>
            <button
              onClick={handleNext}
              className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              <span>Next Stage</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {/* Artifacts */}
            <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                <Database className="w-3.5 h-3.5 text-blue-500" />
                <span>Produced Artifacts &amp; Manifests</span>
              </div>
              <ul className="space-y-1">
                {stage.artifacts.map((a, i) => (
                  <li key={i} className="text-xs font-mono text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Production Failure Modes */}
            <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                <span>Critical Failure Modes</span>
              </div>
              <ul className="space-y-1">
                {stage.risks.map((r, i) => (
                  <li key={i} className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Tools & Telemetry */}
        <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 bg-slate-50/30 dark:bg-slate-850/30 space-y-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
              <Server className="w-3.5 h-3.5 text-purple-500" />
              <span>Standard MLOps Stack Tools</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {stage.tools.map((t, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 text-xs font-mono font-medium"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
              <Activity className="w-3.5 h-3.5 text-emerald-500" />
              <span>Observed Quality Metrics</span>
            </div>
            <div className="space-y-1.5">
              {stage.metrics.map((m, i) => (
                <div key={i} className="flex items-center justify-between text-xs bg-white dark:bg-slate-900 px-2 py-1 rounded border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-600 dark:text-slate-400">{m}</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

