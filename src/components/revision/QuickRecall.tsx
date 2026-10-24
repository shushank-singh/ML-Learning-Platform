'use client';

import React, { useState } from 'react';
import { QuickRecallData } from '@/data/revision/types';
import { MathBlock } from '@/components/math/Math';
import {
  Zap,
  CheckCircle2,
  AlertTriangle,
  Clock,
  HardDrive,
  Eye,
  EyeOff,
  Copy,
  Check,
  HelpCircle,
  Sparkles,
  Lightbulb,
} from 'lucide-react';

interface QuickRecallProps {
  data: QuickRecallData;
  isExamMode?: boolean;
  isQuickReviewOnly?: boolean;
}

export const QuickRecall: React.FC<QuickRecallProps> = ({
  data,
  isExamMode = false,
  isQuickReviewOnly = false,
}) => {
  const [revealed, setRevealed] = useState<boolean>(!isExamMode);
  const [copied, setCopied] = useState<boolean>(false);

  // Sync with prop or topic data change
  React.useEffect(() => {
    setRevealed(!isExamMode);
  }, [data, isExamMode]);

  const copyFormula = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Exam Mode Flashcard Banner (if active) */}
      {isExamMode && (
        <div className="flex items-center justify-between p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-purple-400 shrink-0" />
            <span className="font-semibold">
              Exam Mode Active — Test your recall before revealing answers!
            </span>
          </div>
          <button
            onClick={() => setRevealed(!revealed)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-600/80 hover:bg-purple-600 text-white font-medium text-xs transition-colors"
          >
            {revealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{revealed ? 'Conceal Answers' : 'Reveal Answers'}</span>
          </button>
        </div>
      )}

      {/* 1. One-Liner Core Definition */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-950/50 via-slate-900 to-slate-900 border border-indigo-500/30 shadow-sm relative overflow-hidden">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5">
            <Zap className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 mb-1 flex items-center gap-1">
              <span>One-Sentence Recall</span>
              <span className="text-slate-500">• 20s Scan</span>
            </div>
            <p className="text-sm font-semibold text-slate-100 leading-snug">
              {data.oneLiner}
            </p>
          </div>
        </div>
      </div>

      {/* Simple Real-World Analogy (ELI5) */}
      {data.simpleAnalogy && (
        <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30 flex items-start gap-2.5">
          <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
              Simple Everyday Analogy
            </span>
            <p className="text-xs text-amber-100/90 leading-relaxed font-medium">
              {data.simpleAnalogy}
            </p>
          </div>
        </div>
      )}

      {/* Hidden container when in Exam Mode */}
      <div
        className={`space-y-4 transition-all duration-300 ${
          isExamMode && !revealed ? 'filter blur-sm select-none opacity-40 pointer-events-none' : ''
        }`}
      >
        {/* 2. When & Why It Matters (Two-Column Micro Box) */}
        {!isQuickReviewOnly && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">
                When to Use
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">{data.whenToUse}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                Why It Matters
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">{data.whyItMatters}</p>
            </div>
          </div>
        )}

        {/* 3. Three to Five Bullet Key Points */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2.5">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            Core Revision Points
          </span>
          <ul className="space-y-2">
            {data.keyPoints.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-200 leading-relaxed">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 4. Formula or Syntax (If Present) */}
        {data.formulaOrSyntax && (
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">
                {data.formulaOrSyntax.label}
              </span>
              <button
                onClick={() => copyFormula(data.formulaOrSyntax?.codeOrLatex || '')}
                className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200 px-2 py-0.5 rounded bg-slate-800/60 hover:bg-slate-800 transition-colors"
                title="Copy to clipboard"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {data.formulaOrSyntax.isLatex ? (
              <MathBlock math={data.formulaOrSyntax.codeOrLatex} className="my-1" />
            ) : (
              <pre className="p-3 rounded-lg bg-slate-900 border border-slate-800/80 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
                <code>{data.formulaOrSyntax.codeOrLatex}</code>
              </pre>
            )}
          </div>
        )}

        {/* 5. Complexity Breakdown (If Present) */}
        {data.complexity && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                <Clock className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Time Complexity
                </span>
                <span className="font-mono text-xs font-semibold text-amber-300">
                  {data.complexity.time}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                <HardDrive className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Space Complexity
                </span>
                <span className="font-mono text-xs font-semibold text-cyan-300">
                  {data.complexity.space}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 6. One Common Mistake or Interview Trap */}
        <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-2">
          <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>Common Trap & Fix</span>
          </div>
          <div className="space-y-1.5 text-xs">
            <div className="text-slate-300">
              <span className="font-bold text-rose-300">Mistake: </span>
              {data.commonMistakeOrTrap.mistake}
            </div>
            <div className="text-slate-300">
              <span className="font-bold text-emerald-400">Fix: </span>
              {data.commonMistakeOrTrap.fix}
            </div>
            {data.commonMistakeOrTrap.interviewTrap && (
              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] text-amber-300/90 leading-relaxed mt-2">
                <span className="font-bold text-amber-400">Interview Question: </span>
                {data.commonMistakeOrTrap.interviewTrap}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
