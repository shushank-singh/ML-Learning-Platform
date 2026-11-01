'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Server,
  Lock,
  Activity,
  FileCode,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CheckItem {
  id: string;
  pillar: 'security' | 'api' | 'secrets' | 'ops';
  title: string;
  desc: string;
  remediation: string;
  completed: boolean;
}

export const DeploymentReadinessChecklist: React.FC = () => {
  const [checks, setChecks] = useState<CheckItem[]>([
    {
      id: 'c1',
      pillar: 'security',
      title: 'Non-Root Container Execution',
      desc: 'Container enforces USER appuser (UID 1000) rather than root UID 0.',
      remediation: 'Add `RUN useradd -m -u 1000 appuser && USER appuser` in Dockerfile runtime stage.',
      completed: true,
    },
    {
      id: 'c2',
      pillar: 'security',
      title: 'Minimal Base Image & Zero Compilers',
      desc: 'Build uses python:3.11-slim or distroless without gcc or git in final image.',
      remediation: 'Use multi-stage Docker build; isolate compiler wheels in builder stage.',
      completed: true,
    },
    {
      id: 'c3',
      pillar: 'api',
      title: 'Liveness & Readiness Endpoints',
      desc: 'Separate /health/liveness (process alive) and /health/readiness (model weights loaded).',
      remediation: 'Expose FastAPI endpoints returning 200 OK only after model.load_state_dict() completes.',
      completed: true,
    },
    {
      id: 'c4',
      pillar: 'api',
      title: 'Pydantic Strict Validation & Bounds',
      desc: 'Input features are type-checked and clamped (e.g. float between 0.0 and 1.0).',
      remediation: 'Define Pydantic schema with Field(ge=0, le=100) and strict typing.',
      completed: true,
    },
    {
      id: 'c5',
      pillar: 'secrets',
      title: 'Zero Committed Secrets or .env Files',
      desc: 'API keys, database URLs, and cloud tokens loaded strictly via environment variables.',
      remediation: 'Include .env, *.pem, and credentials.json in .dockerignore and .gitignore.',
      completed: true,
    },
    {
      id: 'c6',
      pillar: 'secrets',
      title: 'PII Sanitization in Log Aggregation',
      desc: 'Names, emails, and raw prompt text scrubbed before writing to stdout/datadog.',
      remediation: 'Implement logging filter regex masking emails and bearer tokens.',
      completed: false,
    },
    {
      id: 'c7',
      pillar: 'ops',
      title: 'Automated Rollback & Canary Gate',
      desc: 'Deployment strategy automatically reverts to prior container if 5xx exceeds 1%.',
      remediation: 'Configure cloud runner health check failure action to route 100% to previous revision.',
      completed: false,
    },
    {
      id: 'c8',
      pillar: 'ops',
      title: 'Distributed Tracing & Request Correlation ID',
      desc: 'X-Request-ID propagated across gateway, background workers, and logs.',
      remediation: 'Add correlation middleware injecting uuid4 into request state and log context.',
      completed: false,
    },
  ]);

  const [selectedId, setSelectedId] = useState<string>('c1');

  const toggleCheck = (id: string) => {
    setChecks((prev) =>
      prev.map((c) => (c.id === id ? { ...c, completed: !c.completed } : c))
    );
  };

  const completedCount = checks.filter((c) => c.completed).length;
  const readinessPct = Math.round((completedCount / checks.length) * 100);
  const isReady = readinessPct === 100;

  const triggerPromotion = () => {
    if (isReady) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // Safe fallback
      }
    }
  };

  const selectedCheck = checks.find((c) => c.id === selectedId) || checks[0];

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 text-slate-100 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              MODULE 13 &amp; 15 VISUALIZER
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              Production Deployment Readiness &amp; Security Gate
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Audit container security, least privilege, zero secrets leakage, health probes, and rollback readiness before production release.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-right">
            <div className="text-xs text-slate-400 font-mono">Readiness Score</div>
            <div className="text-lg font-extrabold text-white font-mono">
              {readinessPct}% <span className="text-xs font-normal text-slate-400">({completedCount}/{checks.length})</span>
            </div>
          </div>
          <button
            onClick={triggerPromotion}
            disabled={!isReady}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              isReady
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30 ring-1 ring-emerald-400'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{isReady ? 'Promote to Production' : 'Pass Gate First'}</span>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ${
            isReady ? 'bg-emerald-500' : readinessPct >= 70 ? 'bg-amber-500' : 'bg-rose-500'
          }`}
          style={{ width: `${readinessPct}%` }}
        />
      </div>

      {/* Main Checklist & Detail Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Check Items List */}
        <div className="lg:col-span-2 space-y-2">
          {checks.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                selectedId === item.id
                  ? 'bg-slate-950 border-emerald-500 ring-1 ring-emerald-500/40'
                  : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
              }`}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCheck(item.id);
                }}
                className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center shrink-0 border transition-all ${
                  item.completed
                    ? 'bg-emerald-600 border-emerald-500 text-white'
                    : 'bg-slate-800 border-slate-700 hover:border-slate-500 text-transparent'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-xs font-semibold ${item.completed ? 'text-slate-200' : 'text-slate-300'}`}>
                    {item.title}
                  </span>
                  <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                    {item.pillar}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Audit Item Deep Dive */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between space-y-3">
          <div className="space-y-2">
            <div className="text-[10px] font-mono text-emerald-400 font-semibold flex items-center gap-1.5 uppercase">
              <FileCode className="w-3.5 h-3.5" />
              REMEDIATION &amp; VERIFICATION GUIDE
            </div>
            <h4 className="text-sm font-bold text-white">{selectedCheck.title}</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {selectedCheck.desc}
            </p>
            <div className="mt-3 p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-300">
              <div className="text-[10px] text-slate-500 font-semibold mb-1">RECOMMENDED ACTION:</div>
              {selectedCheck.remediation}
            </div>
          </div>

          <button
            onClick={() => toggleCheck(selectedCheck.id)}
            className={`w-full py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
              selectedCheck.completed
                ? 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
                : 'bg-emerald-600 border-emerald-500 text-white hover:bg-emerald-500'
            }`}
          >
            {selectedCheck.completed ? 'Mark Incomplete' : '✓ Mark Criteria Satisfied'}
          </button>
        </div>
      </div>
    </div>
  );
};

