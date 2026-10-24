'use client';

import React, { useState } from 'react';
import { PracticalCodeSnippet } from '@/data/revision/types';
import { Code2, Copy, Check, Terminal, Play } from 'lucide-react';

interface PracticalCodeCardProps {
  snippet: PracticalCodeSnippet;
}

export const PracticalCodeCard: React.FC<PracticalCodeCardProps> = ({ snippet }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden space-y-0">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-slate-900 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-indigo-400" />
          <span className="font-semibold text-slate-200">{snippet.title}</span>
          <span className="px-1.5 py-0.2 rounded text-[10px] font-mono uppercase bg-slate-800 text-slate-400 font-bold">
            {snippet.language}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200 px-2 py-0.5 rounded bg-slate-800/80 hover:bg-slate-800 transition-colors"
        >
          {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
          <span>{copied ? 'Copied' : 'Copy Code'}</span>
        </button>
      </div>

      {/* Code Block */}
      <div className="p-3.5 overflow-x-auto bg-[#0a0f1d] font-mono text-xs leading-relaxed text-emerald-300">
        <pre>
          <code>{snippet.code}</code>
        </pre>
      </div>

      {/* Input / Output Bar */}
      {(snippet.input || snippet.output) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-800/80 border-t border-slate-800/80 text-[11px] bg-slate-900/60 font-mono">
          {snippet.input && (
            <div className="p-2.5 space-y-0.5">
              <span className="text-[10px] uppercase tracking-wider text-slate-500 font-sans font-bold block">
                Sample Input
              </span>
              <span className="text-slate-300">{snippet.input}</span>
            </div>
          )}
          {snippet.output && (
            <div className="p-2.5 space-y-0.5">
              <span className="text-[10px] uppercase tracking-wider text-cyan-400 font-sans font-bold block">
                Output
              </span>
              <span className="text-cyan-300 font-bold">{snippet.output}</span>
            </div>
          )}
        </div>
      )}

      {/* Explanation Footer */}
      {snippet.explanation && (
        <div className="p-3 bg-slate-900/90 border-t border-slate-800 text-xs text-slate-300 leading-relaxed">
          <span className="font-bold text-slate-200">How it works: </span>
          {snippet.explanation}
        </div>
      )}
    </div>
  );
};
