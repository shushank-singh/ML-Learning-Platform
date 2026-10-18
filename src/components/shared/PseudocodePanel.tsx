'use client';

import React from 'react';

export interface PseudocodePanelProps {
  title?: string;
  code: string;
  activeLine?: number; // 1-indexed
  language?: 'pseudocode' | 'python';
}

export const PseudocodePanel: React.FC<PseudocodePanelProps> = ({
  title = 'Pseudocode Execution',
  code,
  activeLine,
  language = 'pseudocode',
}) => {
  const lines = code.trim().split('\n');

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-950 text-slate-100 overflow-hidden font-mono text-xs shadow-sm">
      {/* Header */}
      <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          {title}
        </span>
        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">
          {language}
        </span>
      </div>

      {/* Code with active line highlight */}
      <div className="p-3 overflow-x-auto max-h-80 leading-relaxed">
        {lines.map((line, idx) => {
          const lineNumber = idx + 1;
          const isActive = activeLine === lineNumber;

          return (
            <div
              key={lineNumber}
              className={`flex items-start gap-3 px-2 py-0.5 rounded transition-colors ${
                isActive
                  ? 'bg-violet-600/30 text-violet-200 font-bold border-l-2 border-violet-400 -ml-2 pl-2.5'
                  : 'text-slate-300 hover:bg-slate-900/60'
              }`}
            >
              <span className="w-6 shrink-0 text-right select-none text-[10px] text-slate-600 font-mono">
                {lineNumber}
              </span>
              <span className="whitespace-pre">{line || ' '}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
