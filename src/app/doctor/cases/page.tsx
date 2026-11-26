'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ClipboardCheck,
  AlertTriangle,
  Box,
  PlayCircle,
  BookOpen,
  CheckCircle2,
} from 'lucide-react';
import {
  SYNTHETIC_CLINICAL_CASES,
  MEDVERSE_MCQS,
  ANATOMY_ASSETS,
} from '@/data/medverse';
import { QuizEnginePanel } from '@/components/medverse/QuizEnginePanel';

export default function MedVerseClinicalCasesPage() {
  const [activeCaseId, setActiveCaseId] = useState(SYNTHETIC_CLINICAL_CASES[0].id);
  const activeCase =
    SYNTHETIC_CLINICAL_CASES.find((c) => c.id === activeCaseId) ||
    SYNTHETIC_CLINICAL_CASES[0];

  const caseQuestions = MEDVERSE_MCQS.filter((q) => activeCase.questionIds.includes(q.id));
  const asset = activeCase.assetId ? ANATOMY_ASSETS[activeCase.assetId] : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header & Educational Disclaimer */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-5 sm:p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
            <ClipboardCheck className="w-4 h-4" />
            <span>Synthetic Educational Clinical Case Studies</span>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            {SYNTHETIC_CLINICAL_CASES.length} Published Cases
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Bedside Reasoning Linked to 3D Anatomy &amp; Physiology
        </h1>

        <div className="p-3 rounded-xl bg-amber-950/35 border border-amber-800/60 flex items-start gap-2.5 text-xs text-amber-200">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span>{activeCase.disclaimer}</span>
        </div>

        {/* Case Selector */}
        <div className="flex flex-wrap gap-2">
          {SYNTHETIC_CLINICAL_CASES.map((cs) => (
            <button
              key={cs.id}
              type="button"
              onClick={() => setActiveCaseId(cs.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-colors ${
                cs.id === activeCase.id
                  ? 'bg-emerald-600 border-emerald-500 text-white'
                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-emerald-500/60'
              }`}
            >
              {cs.title}
            </button>
          ))}
        </div>
      </div>

      {/* Case Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7 space-y-5">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 space-y-4">
            <h2 className="text-lg font-extrabold text-white">{activeCase.title}</h2>
            <p className="text-sm text-slate-200 leading-relaxed">{activeCase.scenario}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="text-[11px] font-bold uppercase text-teal-400">
                  Relevant History
                </span>
                {activeCase.relevantHistory.map((h) => (
                  <p key={h} className="text-xs text-slate-300 leading-relaxed">
                    • {h}
                  </p>
                ))}
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="text-[11px] font-bold uppercase text-cyan-400">
                  Examination &amp; Diagnostics
                </span>
                {activeCase.examinationAndFindings.map((f) => (
                  <p key={f} className="text-xs text-slate-300 leading-relaxed">
                    • {f}
                  </p>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase text-violet-400 block">
                Differential Diagnosis Discussion
              </span>
              <div className="space-y-2">
                {activeCase.differentialDiagnosis.map((ddx) => (
                  <div
                    key={ddx.condition}
                    className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1"
                  >
                    <div className="text-xs font-bold text-white">{ddx.condition}</div>
                    <p className="text-xs text-slate-300">
                      <strong className="text-slate-400">Supporting:</strong> {ddx.supportingFeatures}
                    </p>
                    <p className="text-xs text-teal-300">
                      <strong className="text-slate-400">Confirmation / Rule-out:</strong>{' '}
                      {ddx.rulingOutOrConfirming}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <QuizEnginePanel questions={caseQuestions} title="Case Assessment MCQs" />
        </div>

        <aside className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 space-y-4">
            <h3 className="text-sm font-extrabold text-teal-300 uppercase tracking-wider">
              Linked Anatomy &amp; Physiology
            </h3>
            <p className="text-xs text-slate-200 leading-relaxed">
              {activeCase.anatomyPhysiologyLink}
            </p>

            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase text-slate-400 block">
                Learning Objectives
              </span>
              {activeCase.learningObjectives.map((obj) => (
                <div key={obj} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{obj}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2 pt-2 border-t border-slate-800">
              {asset?.kind === 'glb_anatomical' && (
                <Link
                  href={`/doctor/anatomy?asset=${asset.id}${
                    activeCase.focusStructureIds?.[0]
                      ? `&structure=${activeCase.focusStructureIds[0]}`
                      : ''
                  }`}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold"
                >
                  <Box className="w-4 h-4" />
                  <span>Inspect Structure in 3D Viewer</span>
                </Link>
              )}

              {activeCase.animationId && (
                <Link
                  href={`/doctor/animations?anim=${activeCase.animationId}`}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-cyan-300 text-xs font-bold"
                >
                  <PlayCircle className="w-4 h-4" />
                  <span>Launch Mechanism Animation</span>
                </Link>
              )}

              <Link
                href={`/doctor/topics/${activeCase.topicId}`}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-semibold"
              >
                <BookOpen className="w-4 h-4" />
                <span>Open Full Synchronized Topic</span>
              </Link>
            </div>

            <div className="pt-2 border-t border-slate-800 space-y-1">
              <span className="text-[10px] font-bold uppercase text-slate-500 block">
                References
              </span>
              {activeCase.references.map((r) => (
                <p key={r.id} className="text-[10px] text-slate-400">
                  • {r.citation}
                </p>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
