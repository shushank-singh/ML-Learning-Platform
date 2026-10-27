'use client';

import React, { useState, useEffect } from 'react';
import {
  List,
  Sparkles,
  Bookmark,
  FileText,
  Save,
  CheckCircle2,
  ChevronRight,
  Lightbulb,
  BookOpen,
  Calculator,
  Workflow,
  Code2,
  BarChart2,
  Scale,
  Award,
} from 'lucide-react';
import { saveNote } from '@/lib/storage';

interface LessonNavigationProps {
  lessonId: string;
  initialNote: string;
}

export const LessonNavigation: React.FC<LessonNavigationProps> = ({
  lessonId,
  initialNote,
}) => {
  const [activeSection, setActiveSection] = useState<string>('intro');
  const [userNote, setUserNote] = useState<string>(initialNote);
  const [noteSaved, setNoteSaved] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    setUserNote(initialNote);
  }, [initialNote]);

  // Track window scroll progress and active section
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.round((window.scrollY / totalHeight) * 100));
        setScrollProgress(progress);
      }

      // Check which section is in view
      const sections = [
        'intro',
        'analogy',
        'concept',
        'visuals',
        'animation',
        'mathematics',
        'workflow',
        'python',
        'results',
        'evaluation',
        'practice',
        'cheatsheet',
      ];

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 180) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSaveNote = () => {
    saveNote(lessonId, userNote);
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2000);
  };

  const navItems = [
    { id: 'intro', label: 'A. Overview & Objectives', icon: Sparkles },
    { id: 'analogy', label: 'B. Intuitive Analogy', icon: Lightbulb },
    { id: 'concept', label: 'C. Plain English Concept', icon: BookOpen },
    { id: 'visuals', label: 'D. Interactive Diagrams', icon: Sparkles },
    { id: 'animation', label: 'E. Step-by-Step Animation', icon: Workflow },
    { id: 'mathematics', label: 'F. Math Intuition & Numbers', icon: Calculator },
    { id: 'workflow', label: 'G. Algorithm Pipeline', icon: Workflow },
    { id: 'python', label: 'H. Practical Python Code', icon: Code2 },
    { id: 'results', label: 'I. Output Diagnostics', icon: BarChart2 },
    { id: 'evaluation', label: 'J & K. Assumptions & Metrics', icon: Scale },
    { id: 'practice', label: 'L. Active Practice & MCQs', icon: Award },
    { id: 'cheatsheet', label: 'M. 60-Sec Revision Sheet', icon: FileText },
  ];

  return (
    <div className="sticky top-24 space-y-5">
      {/* Table of Contents Box */}
      <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <List className="w-3.5 h-3.5 text-indigo-500" />
              <span>Lesson Structure</span>
            </span>
            <span className="font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
              {scrollProgress}%
            </span>
          </div>

          {/* Reading progress line */}
          <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full transition-all duration-150"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        </div>

        {/* Section Navigation Links */}
        <nav className="space-y-1 max-h-[360px] overflow-y-auto pr-1 text-xs">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            const Icon = item.icon;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-colors ${
                  isActive
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold border-l-2 border-indigo-600'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <Icon className={`w-3 h-3 shrink-0 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`} />
                  <span className="truncate">{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-3 h-3 shrink-0 text-indigo-500" />}
              </a>
            );
          })}
        </nav>
      </div>

      {/* Personal Lesson Notes Box */}
      <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-indigo-500" />
            Study Notes Vault
          </span>
          {noteSaved && (
            <span className="text-[10px] text-emerald-500 font-bold animate-pulse">
              Saved!
            </span>
          )}
        </div>

        <textarea
          value={userNote}
          onChange={(e) => setUserNote(e.target.value)}
          placeholder="Personal notes, formula intuition, key takeaways..."
          className="w-full h-28 p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none font-sans"
        />

        <button
          onClick={handleSaveNote}
          className="w-full py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors border border-slate-200 dark:border-slate-700"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Save Lesson Notes</span>
        </button>
      </div>
    </div>
  );
};
