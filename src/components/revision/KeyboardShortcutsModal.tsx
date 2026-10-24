'use client';

import React, { useEffect } from 'react';
import { X, Keyboard } from 'lucide-react';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const shortcuts = [
    { key: 'J / [', desc: 'Navigate to Previous Short Note' },
    { key: 'K / ]', desc: 'Navigate to Next Short Note' },
    { key: 'B', desc: 'Toggle Bookmark on Active Note' },
    { key: 'R', desc: 'Mark Active Note as Revised (with Confetti)' },
    { key: 'E', desc: 'Toggle Exam Mode (Active Recall Flashcard)' },
    { key: 'Q', desc: 'Toggle Quick Review Mode (Ultra-Scan)' },
    { key: 'S', desc: 'Surprise Me (Jump to Random Topic)' },
    { key: 'Space', desc: 'Play / Pause Interactive Animation' },
    { key: '← / →', desc: 'Step Animation Backward / Forward' },
    { key: 'Esc', desc: 'Close Shortcuts Window / Dialog' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Keyboard className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100">Speed Keyboard Shortcuts</h3>
              <p className="text-[11px] text-slate-400">Revise without touching your mouse</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Shortcuts list */}
        <div className="space-y-2 py-1 max-h-80 overflow-y-auto">
          {shortcuts.map((s, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs"
            >
              <span className="text-slate-300 font-medium">{s.desc}</span>
              <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 font-mono text-[11px] font-bold text-indigo-300 shadow-sm">
                {s.key}
              </kbd>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-2 text-center text-[11px] text-slate-500">
          Press <kbd className="font-mono text-slate-400">Esc</kbd> anytime to dismiss
        </div>
      </div>
    </div>
  );
};
