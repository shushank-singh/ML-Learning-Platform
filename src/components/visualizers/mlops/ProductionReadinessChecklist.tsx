'use client';

import React, { useState } from 'react';
import { ShieldCheck, CheckSquare, Square, AlertOctagon, FileText, CheckCircle2, Lock } from 'lucide-react';

interface ChecklistItem {
  id: string;
  category: 'reproducibility' | 'infra' | 'testing' | 'telemetry' | 'security' | 'governance';
  title: string;
  description: string;
  isCritical: boolean;
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: 'c1',
    category: 'reproducibility',
    title: 'Data & Model Version Cryptographic Lineage',
    description: 'All datasets tracked via DVC hashes and model weights registered with signed checksums.',
    isCritical: true,
  },
  {
    id: 'c2',
    category: 'reproducibility',
    title: 'Deterministic Random Seeds & Pinned Dependencies',
    description: 'RNG seeds fixed in preprocessing/training and requirements.txt / lockfiles strictly pinned.',
    isCritical: true,
  },
  {
    id: 'c3',
    category: 'infra',
    title: 'Containerized Minimal Runtime (Multi-stage Docker)',
    description: 'Non-root user in container, slim base image, zero development compilers in production.',
    isCritical: true,
  },
  {
    id: 'c4',
    category: 'infra',
    title: 'Health & Readiness Probes Implemented',
    description: 'FastAPI /healthz and /ready endpoints verify model loaded into memory before receiving traffic.',
    isCritical: true,
  },
  {
    id: 'c5',
    category: 'testing',
    title: 'Automated CI/CD Quality Gates',
    description: 'Pull requests blocked if validation accuracy drops below champion or if P95 latency > SLA.',
    isCritical: true,
  },
  {
    id: 'c6',
    category: 'telemetry',
    title: 'Real-Time Drift & Distribution Alarms',
    description: 'Prometheus metrics export and Kolmogorov-Smirnov / PSI drift monitors fire PagerDuty alerts.',
    isCritical: false,
  },
  {
    id: 'c7',
    category: 'telemetry',
    title: 'Distributed Tracing & Structured JSON Logging',
    description: 'Correlation request IDs propagate through all microservices and LLM spans without logging plain text PII.',
    isCritical: false,
  },
  {
    id: 'c8',
    category: 'security',
    title: 'Zero Hardcoded Secrets & PII Redaction',
    description: 'API keys retrieved strictly via environment variables/K8s secrets; user inputs scrubbed for PII.',
    isCritical: true,
  },
  {
    id: 'c9',
    category: 'security',
    title: 'Safe Model Deserialization & Schema Validation',
    description: 'Strict Pydantic request body validation; avoid arbitrary untrusted pickle loading.',
    isCritical: true,
  },
  {
    id: 'c10',
    category: 'governance',
    title: '1-Click Rollback Plan & Canary Traffic Gate',
    description: 'Documented runbook and automated reverse routing to previous stable champion within 30 seconds.',
    isCritical: true,
  },
];

export const ProductionReadinessChecklist: React.FC = () => {
  const [checkedIds, setCheckedIds] = useState<Set<string>>(
    new Set(['c1', 'c2', 'c3', 'c4', 'c5', 'c8', 'c9'])
  );

  const toggleItem = (id: string) => {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const totalItems = CHECKLIST_ITEMS.length;
  const passedItems = checkedIds.size;
  const readinessScore = Math.round((passedItems / totalItems) * 100);

  const missingCriticalItems = CHECKLIST_ITEMS.filter(
    (item) => item.isCritical && !checkedIds.has(item.id)
  );

  const isReadyForProd = missingCriticalItems.length === 0 && readinessScore >= 90;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            Production AI Readiness &amp; Governance Audit
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">
            Enterprise Deployment Verification Checklist
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Interactive audit tool across reproducibility, containerization, security, observability, and rollback safety.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block font-mono">Readiness Score</span>
            <span className={`text-2xl font-bold font-mono ${
              readinessScore >= 90 ? 'text-emerald-600' : readinessScore >= 70 ? 'text-amber-500' : 'text-rose-600'
            }`}>
              {readinessScore}%
            </span>
          </div>
        </div>
      </div>

      {/* Production Status Banner */}
      <div className={`p-4 rounded-xl border flex items-start gap-3 ${
        isReadyForProd
          ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300'
          : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-900 text-rose-800 dark:text-rose-300'
      }`}>
        {isReadyForProd ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        ) : (
          <AlertOctagon className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
        )}
        <div className="text-xs space-y-1">
          <p className="font-bold">
            {isReadyForProd
              ? 'PRODUCTION RELEASE AUTHORIZED: System meets all strict production criteria.'
              : `RELEASE BLOCKED: ${missingCriticalItems.length} mandatory critical blocker(s) unresolved.`}
          </p>
          <p className="text-[11px] opacity-90">
            {isReadyForProd
              ? 'Safe progressive canary rollout can proceed under automated monitoring.'
              : 'Enterprise compliance prohibits deploying systems with open security, reproducibility, or unhandled rollback vulnerabilities.'}
          </p>
        </div>
      </div>

      {/* Checklist items list */}
      <div className="space-y-2">
        {CHECKLIST_ITEMS.map((item) => {
          const isChecked = checkedIds.has(item.id);
          return (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                isChecked
                  ? 'border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/20 dark:bg-emerald-950/20'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
              }`}
            >
              <button
                type="button"
                className="mt-0.5 text-slate-400 hover:text-slate-600 focus:outline-none"
              >
                {isChecked ? (
                  <CheckSquare className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Square className="w-4 h-4" />
                )}
              </button>

              <div className="flex-1 text-xs">
                <div className="flex items-center gap-2">
                  <span className={`font-bold ${isChecked ? 'text-slate-900 dark:text-slate-100' : 'text-slate-700 dark:text-slate-300'}`}>
                    {item.title}
                  </span>
                  {item.isCritical && (
                    <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300">
                      Critical Blocker
                    </span>
                  )}
                </div>
                <p className="text-slate-500 dark:text-slate-400 mt-0.5 text-[11px]">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

