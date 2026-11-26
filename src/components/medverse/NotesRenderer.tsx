'use client';

import React, { useState } from 'react';
import {
  Clock,
  BookOpen,
  AlertTriangle,
  Sparkles,
  CheckCircle2,
  FileText,
  Lightbulb,
} from 'lucide-react';
import { MBBSNoteSection } from '@/types/medverse';

interface NotesRendererProps {
  notes: MBBSNoteSection;
}

type NoteDepthMode = '60s' | '2m' | 'detailed';

export const NotesRenderer: React.FC<NotesRendererProps> = ({ notes }) => {
  const [mode, setMode] = useState<NoteDepthMode>('2m');

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 text-slate-100 p-4 sm:p-6 space-y-5">
      {/* Header & Depth Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2 text-[11px]">
            <span className="px-2 py-0.5 rounded-full bg-teal-950 border border-teal-800 text-teal-300 font-bold uppercase">
              {notes.status} · v{notes.version}
            </span>
            <span className="text-slate-400 font-mono">Reviewed: {notes.lastReviewedAt}</span>
          </div>
          <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-teal-400" />
            <span>High-Yield MBBS Notes</span>
          </h3>
        </div>

        <div className="inline-flex items-center p-1 rounded-xl bg-slate-950 border border-slate-800">
          {[
            { id: '60s' as const, label: '60-Sec Revision' },
            { id: '2m' as const, label: '2-Min Revision' },
            { id: 'detailed' as const, label: 'Detailed Notes' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setMode(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                mode === tab.id
                  ? 'bg-teal-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 1. 60-Second Revision */}
      {mode === '60s' && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-teal-300 uppercase tracking-wider">
            <Clock className="w-4 h-4" />
            <span>60-Second Rapid Recall</span>
          </div>
          <div className="space-y-2">
            {notes.sixtySecondSummary.map((bullet, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed"
              >
                <span className="w-5 h-5 rounded-full bg-teal-950 border border-teal-800 text-teal-300 font-mono text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{bullet}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Two-Minute Revision */}
      {mode === '2m' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-teal-950/25 border border-teal-800/60 space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-teal-300">
              Core Concept
            </span>
            <p className="text-xs sm:text-sm text-slate-100 leading-relaxed">
              {notes.twoMinuteRevision.coreConcept}
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-300 block">
              Essential High-Yield Facts
            </span>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {notes.twoMinuteRevision.essentialFacts.map((fact) => (
                <li
                  key={fact}
                  className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-200 flex items-start gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Mechanism / Pathway Sequence
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              {notes.twoMinuteRevision.highYieldSequence.map((step, i) => (
                <React.Fragment key={step}>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-medium text-cyan-200">
                    {step}
                  </span>
                  {i < notes.twoMinuteRevision.highYieldSequence.length - 1 && (
                    <span className="text-slate-600 font-bold">→</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-violet-950/30 border border-violet-800/60 flex items-start gap-2.5 text-xs text-violet-200">
            <Lightbulb className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-violet-300">Memory Aid:</strong>{' '}
              {notes.twoMinuteRevision.memoryAid}
            </div>
          </div>
        </div>
      )}

      {/* 3. Detailed Notes (Canonical 7-part Medical Structure) */}
      {mode === 'detailed' && (
        <div className="space-y-5 text-xs sm:text-sm">
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400">
              1. Core Concept
            </h4>
            <p className="text-slate-200 leading-relaxed">{notes.detailedNotes.coreConcept}</p>
          </div>

          {notes.detailedNotes.definitions.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                2. Definitions &amp; Essential Parameters
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {notes.detailedNotes.definitions.map((d) => (
                  <div
                    key={d.term}
                    className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1"
                  >
                    <div className="font-bold text-white text-xs">{d.term}</div>
                    <p className="text-xs text-slate-300 leading-relaxed">{d.definition}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {notes.detailedNotes.classifications.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400">
                Classifications
              </h4>
              {notes.detailedNotes.classifications.map((cls) => (
                <div
                  key={cls.title}
                  className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5"
                >
                  <div className="font-bold text-white text-xs">{cls.title}</div>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {cls.items.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              3. Mechanism &amp; Sequence
            </h4>
            <ol className="space-y-1.5 list-decimal list-inside text-xs text-slate-200 bg-slate-950/60 border border-slate-800 rounded-xl p-4">
              {notes.detailedNotes.mechanismSteps.map((step) => (
                <li key={step} className="leading-relaxed">
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {notes.detailedNotes.importantRelationships.length > 0 && (
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400">
                4. Important Anatomical &amp; Physiological Relationships
              </h4>
              <ul className="space-y-1 text-xs text-slate-300">
                {notes.detailedNotes.importantRelationships.map((rel) => (
                  <li key={rel}>• {rel}</li>
                ))}
              </ul>
            </div>
          )}

          {notes.detailedNotes.comparisonTable && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                {notes.detailedNotes.comparisonTable.title}
              </h4>
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-300">
                    <tr>
                      {notes.detailedNotes.comparisonTable.headers.map((h) => (
                        <th key={h} className="px-3 py-2 font-bold border-b border-slate-800">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 bg-slate-900/50">
                    {notes.detailedNotes.comparisonTable.rows.map((row, idx) => (
                      <tr key={idx}>
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="px-3 py-2 text-slate-200">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-violet-400">
              5. Clinical Relevance
            </h4>
            <div className="space-y-1.5">
              {notes.detailedNotes.clinicalCorrelations.map((c) => (
                <div
                  key={c}
                  className="p-3 rounded-xl bg-violet-950/20 border border-violet-800/50 text-xs text-slate-200 flex items-start gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-violet-400 shrink-0 mt-0.5" />
                  <span>{c}</span>
                </div>
              ))}
            </div>
          </div>

          {notes.detailedNotes.commonMistakes.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Common Conceptual Mistakes
              </h4>
              {notes.detailedNotes.commonMistakes.map((m) => (
                <div
                  key={m}
                  className="p-3 rounded-xl bg-amber-950/20 border border-amber-800/50 text-xs text-amber-100 flex items-start gap-2"
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>{m}</span>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-1.5 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400">
              6. Rapid Revision Summary
            </h4>
            <ul className="space-y-1 text-xs text-slate-300">
              {notes.detailedNotes.rapidRevisionSummary.map((r) => (
                <li key={r}>• {r}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* 7. Verified References */}
      <div className="pt-3 border-t border-slate-800 space-y-1.5">
        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          <FileText className="w-3.5 h-3.5 text-teal-400" />
          <span>7. Verified References &amp; Editorial Metadata</span>
        </div>
        <p className="text-[11px] text-slate-500">
          Author: {notes.author} · Reviewer: {notes.reviewer}
        </p>
        {notes.references.map((ref) => (
          <p key={ref.id} className="text-[11px] text-slate-400">
            • {ref.citation}
          </p>
        ))}
      </div>
    </div>
  );
};
