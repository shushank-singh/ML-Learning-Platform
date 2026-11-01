'use client';

import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, FileText, CheckCircle2, Bookmark, Eye, HelpCircle } from 'lucide-react';

interface GroundedClaim {
  id: string;
  claimText: string;
  citationId: number | null;
  sourceTitle: string;
  sourceSnippet: string;
  status: 'grounded' | 'hallucination' | 'extrapolation';
}

const SCENARIOS = [
  {
    title: 'Grounded Financial Summary (High Faithfulness)',
    hasInsufficientEvidence: false,
    claims: [
      {
        id: 'c1',
        claimText: 'Acme Corp reported Q3 revenues of $4.2B, an increase of 14% year-over-year.',
        citationId: 1,
        sourceTitle: 'Acme-Q3-Earnings-Release.pdf (Page 2)',
        sourceSnippet: 'Total consolidated revenue for the third quarter reached $4,210 million, reflecting 14.1% YoY top-line growth.',
        status: 'grounded' as const,
      },
      {
        id: 'c2',
        claimText: 'Operating margins contracted by 120 basis points due to accelerated GPU server procurement costs.',
        citationId: 2,
        sourceTitle: 'Acme-10Q-Filing.pdf (Page 18)',
        sourceSnippet: 'Operating margin compressed 120 bps to 22.4%, driven primarily by capital expenditures in AI infrastructure and high-density compute.',
        status: 'grounded' as const,
      },
      {
        id: 'c3',
        claimText: 'The CEO announced immediate plans to acquire an autonomous robotics company in December.',
        citationId: null,
        sourceTitle: 'No Matching Document in Corpus',
        sourceSnippet: 'The ingested document corpus contains zero mentions of future robotics mergers or acquisitions.',
        status: 'hallucination' as const,
      },
    ],
  },
  {
    title: 'Insufficient Evidence Scenario (Abstention Guard)',
    hasInsufficientEvidence: true,
    claims: [
      {
        id: 'c4',
        claimText: 'I cannot answer what Acme Corp’s planned 2028 dividend payout ratio will be because the provided financial disclosures only extend through fiscal year 2025.',
        citationId: 1,
        sourceTitle: 'Audited-Disclosures-2025.pdf',
        sourceSnippet: 'Projections and capital allocation guidance are provided solely through the conclusion of FY 2025.',
        status: 'grounded' as const,
      },
    ],
  },
];

export const GroundedCitationExplorer: React.FC = () => {
  const [selectedScenarioIdx, setSelectedScenarioIdx] = useState<number>(0);
  const [activeClaimId, setActiveClaimId] = useState<string>('c1');

  const currentScenario = SCENARIOS[selectedScenarioIdx];
  const activeClaim = currentScenario.claims.find((c) => c.id === activeClaimId) || currentScenario.claims[0];

  const groundedCount = currentScenario.claims.filter((c) => c.status === 'grounded').length;
  const hallucinatedCount = currentScenario.claims.filter((c) => c.status === 'hallucination').length;
  const faithfulnessScore = Math.round((groundedCount / currentScenario.claims.length) * 100);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            Faithfulness & Grounding Engine
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">
            Grounded Answer Citations & Hallucination Auditor
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Deconstruct model responses into individual claims and verify factual provenance against specific retrieved context chunks.
          </p>
        </div>

        {/* Faithfulness Badge */}
        <div className="flex items-center gap-2">
          <div className="text-right">
            <div className="text-[10px] text-slate-400">Faithfulness Score</div>
            <div className={`font-mono font-bold text-sm ${faithfulnessScore >= 90 ? 'text-emerald-500' : 'text-amber-500'}`}>
              {faithfulnessScore}% Grounded
            </div>
          </div>
        </div>
      </div>

      {/* Scenario Selector */}
      <div className="flex flex-wrap gap-2 text-xs">
        {SCENARIOS.map((sc, idx) => (
          <button
            key={sc.title}
            onClick={() => {
              setSelectedScenarioIdx(idx);
              setActiveClaimId(sc.claims[0].id);
            }}
            className={`px-3 py-1.5 rounded-xl border transition-all ${
              selectedScenarioIdx === idx
                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-semibold'
                : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
            }`}
          >
            {sc.title}
          </button>
        ))}
      </div>

      {/* Generated Response Interactive View */}
      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850 space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span className="font-semibold text-slate-700 dark:text-slate-300">Generated Synthesis with Citation References</span>
          <span>Click any claim to trace source provenance</span>
        </div>

        <div className="space-y-2 leading-relaxed text-xs">
          {currentScenario.claims.map((claim) => {
            const isSelected = claim.id === activeClaim.id;
            const isGrounded = claim.status === 'grounded';

            return (
              <span
                key={claim.id}
                onClick={() => setActiveClaimId(claim.id)}
                className={`inline cursor-pointer px-1.5 py-1 rounded transition-all mr-1.5 ${
                  isSelected
                    ? 'ring-2 ring-emerald-500 bg-emerald-100 dark:bg-emerald-950 text-slate-900 dark:text-slate-100 font-medium'
                    : isGrounded
                    ? 'hover:bg-slate-200 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-200'
                    : 'bg-rose-100/60 dark:bg-rose-950/40 text-rose-900 dark:text-rose-300 border-b-2 border-rose-500'
                }`}
              >
                {claim.claimText}{' '}
                {claim.citationId ? (
                  <sup className="font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-200 dark:bg-emerald-900 px-1 py-0.5 rounded text-[9px]">
                    [{claim.citationId}]
                  </sup>
                ) : (
                  <sup className="font-mono font-bold text-rose-600 dark:text-rose-400 bg-rose-200 dark:bg-rose-900 px-1 py-0.5 rounded text-[9px]">
                    [UNVERIFIED]
                  </sup>
                )}
              </span>
            );
          })}
        </div>
      </div>

      {/* Claim Provenance Diagnostic */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start text-xs">
        {/* Source Evidence Box */}
        <div className="md:col-span-8 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
            <span className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-emerald-600" /> Evidence Attribution: {activeClaim.sourceTitle}
            </span>
            <span className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${
              activeClaim.status === 'grounded'
                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
            }`}>
              {activeClaim.status === 'grounded' ? 'GROUNDED IN EVIDENCE' : 'PARAMETRIC HALLUCINATION'}
            </span>
          </div>

          <div>
            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Exact Chunk Source Snippet:
            </div>
            <p className="p-3 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-mono text-[11px] leading-relaxed">
              &ldquo;{activeClaim.sourceSnippet}&rdquo;
            </p>
          </div>

          <div className="text-[11px] text-slate-500 leading-relaxed">
            {activeClaim.status === 'grounded' ? (
              <span className="text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                This claim maps verbatim to facts in the retrieved document chunk. The LLM refrained from introducing unsupported assertions.
              </span>
            ) : (
              <span className="text-rose-700 dark:text-rose-300 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                <strong>Hallucination Caught:</strong> The model relied on parametric training bias to assert future M&A plans not backed by retrieved evidence.
              </span>
            )}
          </div>
        </div>

        {/* Audit Metrics */}
        <div className="md:col-span-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 space-y-3">
          <div className="font-semibold text-slate-900 dark:text-slate-100">RAGAS Faithfulness Audit</div>
          <div className="space-y-2 text-[11px]">
            <div className="flex justify-between">
              <span className="text-slate-500">Total Claims:</span>
              <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{currentScenario.claims.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Verified Grounded:</span>
              <span className="font-mono font-bold text-emerald-600">{groundedCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Ungrounded Claims:</span>
              <span className="font-mono font-bold text-rose-600">{hallucinatedCount}</span>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[10px] text-slate-500 leading-relaxed">
            <strong>Abstention Strategy:</strong> Prompt instructions should enforce: <em>&ldquo;If the retrieved documents do not contain sufficient evidence to answer the user question with certainty, politely state that the answer is unknown rather than guessing.&rdquo;</em>
          </div>
        </div>
      </div>
    </div>
  );
};

