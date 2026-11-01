'use client';

import React, { useState } from 'react';
import { Play, CheckCircle2, XCircle, ShieldCheck, Terminal, AlertOctagon, RefreshCw, GitCommit } from 'lucide-react';

interface GateStep {
  id: string;
  name: string;
  category: 'code' | 'data' | 'model' | 'security';
  description: string;
  threshold?: string;
  status: 'idle' | 'running' | 'passed' | 'failed';
  log: string;
}

const INITIAL_GATES: GateStep[] = [
  {
    id: 'lint',
    name: 'Lint & Type Check',
    category: 'code',
    description: 'Ruff linter and mypy strict static typing validation',
    status: 'idle',
    log: 'All 42 source files passed ruff & mypy checks. Zero type errors.',
  },
  {
    id: 'unit_preproc',
    name: 'Preprocessing Unit Tests',
    category: 'data',
    description: 'Verify train/inference pipeline transforms are bit-for-bit identical',
    status: 'idle',
    log: 'PASSED: 18 preprocessing tests (StandardScaler, OneHotEncoder, null-handling).',
  },
  {
    id: 'accuracy_gate',
    name: 'Model Quality Gate (Accuracy)',
    category: 'model',
    description: 'Ensure candidate model matches or exceeds champion accuracy',
    threshold: 'F1 >= 0.900',
    status: 'idle',
    log: 'Evaluating against 5,000-sample golden validation test split...',
  },
  {
    id: 'latency_gate',
    name: 'Latency SLA Gate',
    category: 'model',
    description: 'Ensure batch=1 P95 inference latency satisfies service budget',
    threshold: 'P95 <= 35.0ms',
    status: 'idle',
    log: 'Benchmarking 1,000 requests on container runtime...',
  },
  {
    id: 'security_scan',
    name: 'Container & Secrets Scan',
    category: 'security',
    description: 'Trivy container CVE vulnerability scanner & git-secrets check',
    status: 'idle',
    log: 'Scanning Docker image layers. Zero CRITICAL or HIGH vulnerabilities detected.',
  },
];

export const CICDQualityGateExplorer: React.FC = () => {
  const [candidateF1, setCandidateF1] = useState<number>(0.925);
  const [candidateLatency, setCandidateLatency] = useState<number>(28.4);
  const [hasSecretLeak, setHasSecretLeak] = useState<boolean>(false);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [gates, setGates] = useState<GateStep[]>(INITIAL_GATES);
  const [selectedGateId, setSelectedGateId] = useState<string>('accuracy_gate');

  const selectedGate = gates.find((g) => g.id === selectedGateId) || gates[2];

  const handleRunPipeline = async () => {
    if (isExecuting) return;
    setIsExecuting(true);

    const updated: GateStep[] = gates.map((g) => ({ ...g, status: 'idle' }));
    setGates([...updated]);

    for (let i = 0; i < updated.length; i++) {
      const g = updated[i];
      g.status = 'running';
      setGates([...updated]);

      await new Promise((r) => setTimeout(r, 450));

      if (g.id === 'accuracy_gate') {
        if (candidateF1 < 0.90) {
          g.status = 'failed';
          g.log = `FAILED: Candidate F1 score ${(candidateF1 * 100).toFixed(1)}% is below mandatory gate threshold 90.0%. Deployment aborted.`;
          setGates([...updated]);
          setIsExecuting(false);
          return;
        } else {
          g.status = 'passed';
          g.log = `PASSED: Candidate F1 ${(candidateF1 * 100).toFixed(1)}% satisfies gate (Threshold: >= 90.0%).`;
        }
      } else if (g.id === 'latency_gate') {
        if (candidateLatency > 35.0) {
          g.status = 'failed';
          g.log = `FAILED: Candidate P95 latency ${candidateLatency}ms exceeds 35.0ms maximum SLA limit. Deployment blocked.`;
          setGates([...updated]);
          setIsExecuting(false);
          return;
        } else {
          g.status = 'passed';
          g.log = `PASSED: Candidate P95 latency ${candidateLatency}ms within SLA budget (Threshold: <= 35.0ms).`;
        }
      } else if (g.id === 'security_scan') {
        if (hasSecretLeak) {
          g.status = 'failed';
          g.log = 'FAILED: Secret detected! git-secrets identified an unencrypted API secret token in config.yml. Deployment blocked.';
          setGates([...updated]);
          setIsExecuting(false);
          return;
        } else {
          g.status = 'passed';
          g.log = 'PASSED: Zero hardcoded API keys detected. Container image CVE scan clean.';
        }
      } else {
        g.status = 'passed';
      }

      setGates([...updated]);
    }

    setIsExecuting(false);
  };

  const handleReset = () => {
    setGates(INITIAL_GATES.map((g) => ({ ...g, status: 'idle' })));
    setIsExecuting(false);
  };

  const allPassed = gates.every((g) => g.status === 'passed');
  const anyFailed = gates.some((g) => g.status === 'failed');

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <GitCommit className="w-3.5 h-3.5" />
            GitHub Actions / ML Quality Gates
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">
            Automated CI/CD Quality Gates &amp; Deployment Blocker
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Verify candidate model metrics against rigorous regression thresholds before triggering automated deployment.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRunPipeline}
            disabled={isExecuting}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-all disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5" />
            <span>{isExecuting ? 'Running CI Workflow...' : 'Run CI Pipeline'}</span>
          </button>
          <button
            onClick={handleReset}
            disabled={isExecuting}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Candidate Hyperparameters Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-xs">
        <div className="space-y-1">
          <div className="flex justify-between font-semibold">
            <span>Candidate F1: {(candidateF1 * 100).toFixed(1)}%</span>
            <span className={candidateF1 >= 0.90 ? 'text-emerald-500' : 'text-rose-500 font-bold'}>
              {candidateF1 >= 0.90 ? 'Meets Gate' : 'Fails Gate (<90%)'}
            </span>
          </div>
          <input
            type="range"
            min="0.82"
            max="0.96"
            step="0.005"
            value={candidateF1}
            disabled={isExecuting}
            onChange={(e) => setCandidateF1(parseFloat(e.target.value))}
            className="w-full accent-blue-600 cursor-pointer"
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between font-semibold">
            <span>Candidate Latency: {candidateLatency} ms</span>
            <span className={candidateLatency <= 35.0 ? 'text-emerald-500' : 'text-rose-500 font-bold'}>
              {candidateLatency <= 35.0 ? 'Meets SLA' : 'Exceeds 35ms'}
            </span>
          </div>
          <input
            type="range"
            min="20.0"
            max="48.0"
            step="1.0"
            value={candidateLatency}
            disabled={isExecuting}
            onChange={(e) => setCandidateLatency(parseFloat(e.target.value))}
            className="w-full accent-blue-600 cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between pt-2 md:pt-0">
          <label className="flex items-center gap-2 cursor-pointer font-semibold">
            <input
              type="checkbox"
              checked={hasSecretLeak}
              disabled={isExecuting}
              onChange={(e) => setHasSecretLeak(e.target.checked)}
              className="rounded text-rose-600 focus:ring-rose-500 w-4 h-4"
            />
            <span>Inject Hardcoded API Key</span>
          </label>
        </div>
      </div>

      {/* CI Stages Pipeline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
        {gates.map((g, idx) => {
          const isSelected = selectedGateId === g.id;
          let statusBadge = 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400';
          if (g.status === 'running') statusBadge = 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 animate-pulse';
          if (g.status === 'passed') statusBadge = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300';
          if (g.status === 'failed') statusBadge = 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300';

          return (
            <button
              key={g.id}
              onClick={() => setSelectedGateId(g.id)}
              className={`p-3 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'border-blue-600 bg-blue-50/40 dark:bg-blue-950/30 shadow-sm'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono text-slate-400">Step {idx + 1}</span>
                <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${statusBadge}`}>
                  {g.status}
                </span>
              </div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-100 line-clamp-1">
                {g.name}
              </p>
              {g.threshold && (
                <p className="text-[10px] text-blue-600 dark:text-blue-400 font-mono mt-1">
                  {g.threshold}
                </p>
              )}
            </button>
          );
        })}
      </div>

      {/* Terminal Log Output for Selected Gate */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 font-mono text-xs space-y-2">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-blue-400" />
            <span>Workflow Log: {selectedGate.name}</span>
          </div>
          <span className="uppercase text-[10px] font-bold text-slate-400">
            {selectedGate.status}
          </span>
        </div>
        <p className="text-slate-300 leading-relaxed">
          {selectedGate.log}
        </p>
      </div>

      {/* Pipeline Status Summary */}
      {allPassed && (
        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-900 flex items-center gap-2 text-xs text-emerald-800 dark:text-emerald-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span className="font-semibold">
            All 5 CI/CD Quality Gates Passed! Automated deployment to Staging authorized.
          </span>
        </div>
      )}

      {anyFailed && (
        <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-900 flex items-center gap-2 text-xs text-rose-800 dark:text-rose-300">
          <XCircle className="w-4 h-4 text-rose-600" />
          <span className="font-semibold">
            Quality Gate Violation Detected! Pipeline stopped automatically. Release rejected.
          </span>
        </div>
      )}
    </div>
  );
};
