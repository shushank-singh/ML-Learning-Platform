'use client';

import React, { useState } from 'react';
import { Network, Clock, ShieldCheck, Database, Bot, Terminal, AlertCircle, Eye, EyeOff } from 'lucide-react';

interface TraceSpan {
  id: string;
  name: string;
  service: string;
  startMs: number;
  durationMs: number;
  status: 'ok' | 'error';
  tokensIn?: number;
  tokensOut?: number;
  costUsd?: number;
  ttftMs?: number;
  details: {
    input: string;
    output: string;
    redactedFields?: string[];
  };
}

const TRACE_SPANS: TraceSpan[] = [
  {
    id: 'span-root',
    name: 'POST /v1/chat/completions',
    service: 'api-gateway',
    startMs: 0,
    durationMs: 980,
    status: 'ok',
    tokensIn: 820,
    tokensOut: 110,
    costUsd: 0.0028,
    details: {
      input: 'Correlation ID: req-889a-021b | User IP: [REDACTED_CLIENT_IP]',
      output: 'HTTP 200 OK (980ms)',
    },
  },
  {
    id: 'span-guardrail',
    name: 'pii_and_injection_guardrail',
    service: 'security-filter',
    startMs: 15,
    durationMs: 45,
    status: 'ok',
    details: {
      input: 'Patient SSN [REDACTED_PII], symptoms query',
      output: 'PASSED: Prompt injection risk score 0.02. SSN token replaced with <REDACTED_SSN>.',
      redactedFields: ['SSN', 'Client IP'],
    },
  },
  {
    id: 'span-embedding',
    name: 'text-embedding-3-small',
    service: 'vector-search',
    startMs: 65,
    durationMs: 110,
    status: 'ok',
    tokensIn: 45,
    tokensOut: 0,
    costUsd: 0.000004,
    details: {
      input: 'Vector embedding generated for 45 tokens',
      output: 'Retrieved top-3 clinical documents from pgvector (Cosine Sim > 0.84)',
    },
  },
  {
    id: 'span-llm-1',
    name: 'gemini-1.5-pro (Generation)',
    service: 'llm-provider',
    startMs: 185,
    durationMs: 580,
    status: 'ok',
    ttftMs: 195,
    tokensIn: 720,
    tokensOut: 65,
    costUsd: 0.0021,
    details: {
      input: 'System prompt + Retrieved Context + Redacted User Query',
      output: 'Emitted tool call: query_clinical_formulary(drug_id="RX-901")',
    },
  },
  {
    id: 'span-tool-call',
    name: 'tool: query_clinical_formulary',
    service: 'internal-database',
    startMs: 775,
    durationMs: 75,
    status: 'ok',
    details: {
      input: 'drug_id="RX-901"',
      output: '{"approved": true, "copay": 15.00, "tier": "Tier-1 Generic"}',
    },
  },
  {
    id: 'span-llm-2',
    name: 'gemini-1.5-pro (Final Synthesis)',
    service: 'llm-provider',
    startMs: 860,
    durationMs: 115,
    status: 'ok',
    ttftMs: 45,
    tokensIn: 810,
    tokensOut: 45,
    costUsd: 0.0007,
    details: {
      input: 'Formulary tool result returned to context window',
      output: 'Medication RX-901 is fully covered under your Tier-1 plan with a $15.00 copay.',
    },
  },
];

export const LLMTraceTimelineExplorer: React.FC = () => {
  const [selectedSpanId, setSelectedSpanId] = useState<string>('span-llm-1');
  const [privacyRedactionEnabled, setPrivacyRedactionEnabled] = useState<boolean>(true);

  const selectedSpan = TRACE_SPANS.find((s) => s.id === selectedSpanId) || TRACE_SPANS[0];
  const totalDuration = 980; // ms

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 text-xs font-semibold uppercase tracking-wider">
            <Network className="w-3.5 h-3.5" />
            OpenTelemetry &amp; Langfuse Tracing
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">
            Distributed LLM Trace Timeline &amp; Span Latency Waterfall
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Inspect request correlation IDs, Time-to-First-Token (TTFT), token expenditure, and privacy redaction.
          </p>
        </div>

        <button
          onClick={() => setPrivacyRedactionEnabled((p) => !p)}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
            privacyRedactionEnabled
              ? 'bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 border-teal-300 dark:border-teal-800'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
          }`}
        >
          {privacyRedactionEnabled ? <ShieldCheck className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          <span>{privacyRedactionEnabled ? 'PII Redaction: ON' : 'PII Redaction: OFF'}</span>
        </button>
      </div>

      {/* Waterfall Timeline */}
      <div className="space-y-2 border border-slate-200 dark:border-slate-800 rounded-xl p-4 bg-slate-50/50 dark:bg-slate-850/50">
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-b border-slate-200 dark:border-slate-800 pb-2">
          <span>Span Name &amp; Service</span>
          <span>Timeline (0ms &rarr; 980ms)</span>
        </div>

        <div className="space-y-2 pt-1">
          {TRACE_SPANS.map((span) => {
            const isSelected = span.id === selectedSpanId;
            const leftPercent = (span.startMs / totalDuration) * 100;
            const widthPercent = Math.max(3, (span.durationMs / totalDuration) * 100);

            return (
              <div
                key={span.id}
                onClick={() => setSelectedSpanId(span.id)}
                className={`p-2 rounded-lg cursor-pointer transition-all border ${
                  isSelected
                    ? 'border-teal-600 bg-teal-50/40 dark:bg-teal-950/30'
                    : 'border-transparent hover:bg-slate-100/70 dark:hover:bg-slate-800/70'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
                      {span.name}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-slate-600 dark:text-slate-400">
                      {span.service}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {span.durationMs}ms
                    </span>
                  </div>

                  {/* Waterfall Bar */}
                  <div className="w-full sm:w-1/2 h-3 bg-slate-200 dark:bg-slate-800 rounded relative overflow-hidden">
                    <div
                      style={{
                        left: `${leftPercent}%`,
                        width: `${widthPercent}%`,
                      }}
                      className={`absolute h-full rounded transition-all duration-300 ${
                        span.id.includes('llm')
                          ? 'bg-purple-500'
                          : span.id.includes('guardrail')
                          ? 'bg-teal-500'
                          : span.id.includes('tool')
                          ? 'bg-amber-500'
                          : 'bg-indigo-500'
                      }`}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Span Telemetry Inspector */}
      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600">
              Span Telemetry Inspector
            </span>
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-mono mt-0.5">
              {selectedSpan.name}
            </h4>
          </div>

          <div className="flex items-center gap-2 text-xs">
            {selectedSpan.ttftMs && (
              <span className="px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-mono">
                TTFT: {selectedSpan.ttftMs}ms
              </span>
            )}
            {selectedSpan.tokensIn !== undefined && (
              <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-slate-700 dark:text-slate-300">
                In: {selectedSpan.tokensIn} | Out: {selectedSpan.tokensOut}
              </span>
            )}
            {selectedSpan.costUsd !== undefined && (
              <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-mono font-bold">
                ${selectedSpan.costUsd.toFixed(5)}
              </span>
            )}
          </div>
        </div>

        <div className="space-y-2 text-xs font-mono">
          <div>
            <span className="text-slate-400 text-[10px] uppercase font-bold block">Input Payload</span>
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-850 text-slate-800 dark:text-slate-200">
              {privacyRedactionEnabled
                ? selectedSpan.details.input
                : selectedSpan.details.input.replace('[REDACTED_CLIENT_IP]', '192.168.1.104').replace('[REDACTED_PII]', 'SSN: 984-12-8841')}
            </div>
          </div>

          <div>
            <span className="text-slate-400 text-[10px] uppercase font-bold block">Output / State</span>
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-850 text-slate-800 dark:text-slate-200">
              {selectedSpan.details.output}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

