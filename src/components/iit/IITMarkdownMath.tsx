'use client';

import React from 'react';
import { MathBlock, MathInline } from '@/components/math/Math';

interface IITMarkdownMathProps {
  content: string;
  className?: string;
}

/**
 * Renders text containing inline LaTeX ($...$), display LaTeX ($$...$$),
 * bold (**text**), and inline code (`code`) using KaTeX.
 */
export const IITMarkdownMath: React.FC<IITMarkdownMathProps> = ({ content, className = '' }) => {
  if (!content) return null;

  // Split out display math blocks $$...$$ first
  const blocks = content.split(/(\$\$[\s\S]*?\$\$)/g);

  return (
    <span className={className}>
      {blocks.map((block, bIdx) => {
        if (block.startsWith('$$') && block.endsWith('$$') && block.length > 4) {
          const tex = block.slice(2, -2).trim();
          return <MathBlock key={bIdx} math={tex} />;
        }
        return <React.Fragment key={bIdx}>{renderInlineTokens(block)}</React.Fragment>;
      })}
    </span>
  );
};

function renderInlineTokens(text: string): React.ReactNode {
  // Match inline $...$ (non-greedy, not starting/ending with space-only), **bold**, or `code`
  const tokenRegex = /(\*\*[^*]+\*\*|`[^`]+`|\$(?:\\.|[^$\n])+\$)/g;
  const parts = text.split(tokenRegex);

  return parts.map((part, idx) => {
    if (!part) return null;
    if (part.startsWith('$$') && part.endsWith('$$')) {
      return <MathInline key={idx} math={part.slice(2, -2).trim()} />;
    }
    if (part.startsWith('$') && part.endsWith('$') && part.length >= 2) {
      return <MathInline key={idx} math={part.slice(1, -1)} />;
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={idx} className="font-semibold text-slate-900 dark:text-slate-100">
          {renderInlineTokens(part.slice(2, -2))}
        </strong>
      );
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={idx}
          className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-amber-700 dark:text-amber-300 font-mono text-xs border border-slate-200 dark:border-slate-700"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return <React.Fragment key={idx}>{part}</React.Fragment>;
  });
}
