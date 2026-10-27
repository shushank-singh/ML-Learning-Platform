'use client';

import React, { useState } from 'react';
import {
  Code2,
  Cpu,
  Terminal,
  FileText,
  Copy,
  Check,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { LessonContent } from '@/lib/types';
import { CodeRunner } from '../code/CodeRunner';

interface LessonPythonCodeProps {
  lesson: LessonContent;
}

export const LessonPythonCode: React.FC<LessonPythonCodeProps> = ({ lesson }) => {
  const { scratchCode, sklearnCode, runnableCode, lineByLineExplanation } = lesson;
  const [activeCodeTab, setActiveCodeTab] = useState<'scratch' | 'sklearn' | 'sandbox'>('scratch');
  const [copied, setCopied] = useState<boolean>(false);

  const getActiveCode = () => {
    if (activeCodeTab === 'scratch') return scratchCode.code;
    if (activeCodeTab === 'sklearn') return sklearnCode.code;
    return runnableCode.code;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getActiveCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <Code2 className="w-5 h-5" />
          </span>
          <div>
            <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest block">
              Section H · Production & Scratch Code
            </span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Practical Python Implementation
            </h2>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 transition-colors shadow-sm"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied to Clipboard!' : 'Copy Code'}</span>
        </button>
      </div>

      {/* Code Tabs Header */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <div className="p-3 sm:px-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveCodeTab('scratch')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeCodeTab === 'scratch'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Code2 className="w-4 h-4" />
              <span>1. NumPy From Scratch</span>
            </button>

            <button
              onClick={() => setActiveCodeTab('sklearn')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeCodeTab === 'sklearn'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>2. Production Scikit-Learn</span>
            </button>

            <button
              onClick={() => setActiveCodeTab('sandbox')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeCodeTab === 'sandbox'
                  ? 'bg-violet-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Terminal className="w-4 h-4" />
              <span>3. Full Runnable Sandbox</span>
            </button>
          </div>

          <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
            Python 3.10+ Compatible
          </span>
        </div>

        {/* Tab Content Display */}
        <div className="p-5 sm:p-6 space-y-4">
          {activeCodeTab === 'scratch' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  {scratchCode.title}
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-200 dark:border-emerald-800">
                  First-Principles Logic
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {scratchCode.explanation}
              </p>
              <CodeRunner
                initialCode={scratchCode.code}
                title="NumPy From Scratch Implementation"
                readOnly={false}
              />
            </div>
          )}

          {activeCodeTab === 'sklearn' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  {sklearnCode.title}
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-semibold border border-indigo-200 dark:border-indigo-800">
                  Industry Standard Pipeline
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {sklearnCode.explanation}
              </p>
              <CodeRunner
                initialCode={sklearnCode.code}
                title="Scikit-Learn Production Pipeline"
                readOnly={false}
              />
            </div>
          )}

          {activeCodeTab === 'sandbox' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  Complete End-to-End Executable Script
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-violet-50 dark:bg-violet-950 text-violet-600 dark:text-violet-400 font-semibold border border-violet-200 dark:border-violet-800">
                  Verified In-Browser Execution
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Execute this script directly inside your browser using Pyodide WebAssembly or inspect the author-verified output below:
              </p>
              <CodeRunner
                initialCode={runnableCode.code}
                expectedOutput={runnableCode.expectedOutput}
                title="Full End-to-End Pipeline Sandbox"
                readOnly={false}
              />
            </div>
          )}
        </div>
      </div>

      {/* Line-by-Line Code Breakdown */}
      {lineByLineExplanation && lineByLineExplanation.length > 0 && (
        <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500">
              <FileText className="w-4 h-4" />
            </span>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Line-by-Line Code Breakdown
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Why each line was written this way, and what happens behind the scenes:
          </p>

          <div className="space-y-3">
            {lineByLineExplanation.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex flex-col md:flex-row gap-4 text-xs"
              >
                <div className="md:w-5/12 shrink-0">
                  <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 block mb-1">
                    {item.lines}
                  </span>
                  <pre className="p-2.5 rounded-lg bg-slate-900 text-slate-100 font-mono text-[11px] overflow-x-auto border border-slate-800">
                    {item.codeSnippet || item.code}
                  </pre>
                </div>
                <div className="md:w-7/12 flex items-center text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.explanation}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
