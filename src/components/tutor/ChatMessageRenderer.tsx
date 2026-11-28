'use client';

import React from 'react';
import { CodeSnippet } from './CodeSnippet';

interface ChatMessageRendererProps {
  content: string;
  tone?: 'dark' | 'adaptive';
}

/**
 * Parses lightweight Markdown content with code blocks, bold text, lists, and headings.
 */
export const ChatMessageRenderer: React.FC<ChatMessageRendererProps> = ({ content, tone = 'dark' }) => {
  // Split content by code blocks: ```[language]\ncode\n```
  const parts = content.split(/(```[\s\S]*?```)/g);
  const adaptive = tone === 'adaptive';
  const baseText = adaptive ? 'text-slate-800 dark:text-slate-200' : 'text-slate-200';
  const subText = adaptive ? 'text-slate-700 dark:text-slate-300' : 'text-slate-300';
  const h4Text = adaptive ? 'text-slate-900 dark:text-slate-100' : 'text-slate-100';
  const h3Text = adaptive ? 'text-teal-700 dark:text-teal-300' : 'text-indigo-300';

  return (
    <div className={`space-y-2 text-sm leading-relaxed ${baseText} break-words`}>
      {parts.map((part, index) => {
        if (part.startsWith('```') && part.endsWith('```')) {
          const firstLineEnd = part.indexOf('\n');
          let language = '';
          let code = '';

          if (firstLineEnd !== -1) {
            language = part.slice(3, firstLineEnd).trim();
            code = part.slice(firstLineEnd + 1, -3);
          } else {
            code = part.slice(3, -3);
          }

          return <CodeSnippet key={index} code={code.trimEnd()} language={language} />;
        }

        // Render standard text with paragraphs, bullet points, and inline formatting
        const paragraphs = part.split(/\n\n+/);
        return (
          <div key={index} className="space-y-2">
            {paragraphs.map((para, pIdx) => {
              const trimmed = para.trim();
              if (!trimmed) return null;

              // Headings
              if (trimmed.startsWith('### ')) {
                return (
                  <h4 key={pIdx} className={`font-bold ${h4Text} text-sm mt-3 mb-1`}>
                    {renderInlineFormatted(trimmed.slice(4), adaptive)}
                  </h4>
                );
              }
              if (trimmed.startsWith('## ')) {
                return (
                  <h3 key={pIdx} className={`font-bold ${h3Text} text-sm mt-3 mb-1`}>
                    {renderInlineFormatted(trimmed.slice(3), adaptive)}
                  </h3>
                );
              }

              // Bullet list items
              const lines = trimmed.split('\n');
              const isList = lines.every((line) => line.trim().startsWith('- ') || line.trim().startsWith('* '));

              if (isList) {
                return (
                  <ul key={pIdx} className={`list-disc list-inside space-y-1 ${subText} pl-1`}>
                    {lines.map((line, lIdx) => (
                      <li key={lIdx}>
                        {renderInlineFormatted(line.replace(/^[-*]\s+/, ''), adaptive)}
                      </li>
                    ))}
                  </ul>
                );
              }

              // Standard Paragraph with inline formatting
              return (
                <p key={pIdx} className={subText}>
                  {renderInlineFormatted(trimmed, adaptive)}
                </p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

/**
 * Handles inline bold (**text**) and inline code (`code`).
 */
function renderInlineFormatted(text: string, adaptive = false): React.ReactNode {
  // Regex to match **bold** or `code`
  const tokenRegex = /(\*\*.*?\*\*|`.*?`)/g;
  const tokens = text.split(tokenRegex);
  const strongCls = adaptive ? 'font-semibold text-slate-900 dark:text-slate-100' : 'font-semibold text-slate-100';
  const codeCls = adaptive
    ? 'px-1.5 py-0.5 rounded bg-slate-200/80 dark:bg-slate-800 text-teal-800 dark:text-teal-300 font-mono text-xs border border-slate-300 dark:border-slate-700/60'
    : 'px-1.5 py-0.5 rounded bg-slate-800 text-indigo-300 font-mono text-xs border border-slate-700/60';

  return tokens.map((token, idx) => {
    if (token.startsWith('**') && token.endsWith('**')) {
      return (
        <strong key={idx} className={strongCls}>
          {token.slice(2, -2)}
        </strong>
      );
    }
    if (token.startsWith('`') && token.endsWith('`')) {
      return (
        <code
          key={idx}
          className={codeCls}
        >
          {token.slice(1, -1)}
        </code>
      );
    }
    return token;
  });
}

