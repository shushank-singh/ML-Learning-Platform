'use client';

import React, { useMemo } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface MathProps {
  math: string;
  className?: string;
}

export const MathInline: React.FC<MathProps> = ({ math, className = '' }) => {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: false,
        throwOnError: false,
      });
    } catch (e) {
      console.error('KaTeX rendering error:', e);
      return `<span class="text-rose-500 font-mono text-sm">${math}</span>`;
    }
  }, [math]);

  return (
    <span
      className={`inline-math ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export const MathBlock: React.FC<MathProps & { caption?: string }> = ({
  math,
  className = '',
  caption,
}) => {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: true,
        throwOnError: false,
      });
    } catch (e) {
      console.error('KaTeX block rendering error:', e);
      return `<div class="p-3 bg-rose-500/10 text-rose-500 font-mono text-sm border border-rose-500/30 rounded">${math}</div>`;
    }
  }, [math]);

  return (
    <div className={`my-4 overflow-x-auto ${className}`}>
      <div
        className="rounded-lg bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 p-4 shadow-sm"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {caption && (
        <div className="mt-1.5 text-center text-xs font-medium text-slate-500 dark:text-slate-400">
          {caption}
        </div>
      )}
    </div>
  );
};
