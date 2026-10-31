'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  Bookmark,
  ChevronRight,
  BookOpen,
  Share2,
  Sparkles,
} from 'lucide-react';
import { LessonContent } from '@/lib/types';
import {
  getProgress,
  toggleLessonCompletion,
  toggleBookmark,
} from '@/lib/storage';
import confetti from 'canvas-confetti';

import { LessonIntroduction } from './LessonIntroduction';
import { LessonAnalogy } from './LessonAnalogy';
import { LessonSimpleConcept } from './LessonSimpleConcept';
import { TopicVisualizer } from './TopicVisualizer';
import { LessonAnimationPlayer } from './LessonAnimationPlayer';
import { LessonMathematics } from './LessonMathematics';
import { LessonWorkflow } from './LessonWorkflow';
import { LessonPythonCode } from './LessonPythonCode';
import { LessonResultsVisualization } from './LessonResultsVisualization';
import { LessonEvaluation } from './LessonEvaluation';
import { LessonPractice } from './LessonPractice';
import { LessonCheatSheet } from './LessonCheatSheet';
import { LessonNavigation } from './LessonNavigation';
import { AITutorPanel } from '@/components/tutor/AITutorPanel';

interface LessonViewProps {
  lesson: LessonContent;
}

export const LessonView: React.FC<LessonViewProps> = ({ lesson }) => {
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [userNote, setUserNote] = useState<string>('');

  useEffect(() => {
    const progress = getProgress();
    setIsCompleted(!!progress.completedLessons[lesson.id]);
    setIsBookmarked(progress.bookmarks.includes(lesson.id));
    setUserNote(progress.notes[lesson.id] || '');
  }, [lesson.id]);

  const handleToggleComplete = () => {
    const newState = toggleLessonCompletion(lesson.id);
    setIsCompleted(newState);
    if (newState) {
      confetti({
        particleCount: 90,
        spread: 60,
        origin: { y: 0.8 },
      });
    }
  };

  const handleToggleBookmark = () => {
    const newState = toggleBookmark(lesson.id);
    setIsBookmarked(newState);
  };

  return (
    <div className="min-h-screen pb-24 bg-slate-50/50 dark:bg-slate-950 font-sans">
      {/* ========================================================================= */}
      {/* TOP STICKY BREADCRUMB & UTILITY BAR */}
      {/* ========================================================================= */}
      <div className="sticky top-14 z-20 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur px-4 sm:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Link
              href="/curriculum"
              className="hover:text-indigo-600 transition-colors font-medium"
            >
              AI & ML Curriculum
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link
              href={`/curriculum/${lesson.moduleId}`}
              className="hover:text-indigo-600 transition-colors font-medium capitalize"
            >
              {lesson.moduleId.replace('-', ' ')}
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-900 dark:text-slate-200 font-semibold truncate max-w-[200px] sm:max-w-xs">
              {lesson.title.split(':')[0]}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleBookmark}
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm ${
                isBookmarked
                  ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-700 dark:text-amber-400'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
              <span className="hidden sm:inline">{isBookmarked ? 'Saved' : 'Bookmark'}</span>
            </button>

            <button
              onClick={handleToggleComplete}
              className={`px-3.5 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm ${
                isCompleted
                  ? 'bg-emerald-600 border-emerald-600 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-700 border-indigo-600 text-white'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isCompleted ? 'Completed' : 'Mark Complete'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MAIN TEXTBOOK LEARNING CONTAINER */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Central Reading Column (Sections A through M) */}
        <main className="lg:col-span-9 max-w-4xl space-y-14">
          {/* SECTION A: Lesson Introduction */}
          <section id="intro" className="scroll-mt-28">
            <LessonIntroduction lesson={lesson} />
          </section>

          {/* SECTION B: Real-Life Analogy */}
          <section id="analogy" className="scroll-mt-28">
            <LessonAnalogy lesson={lesson} />
          </section>

          {/* SECTION C: Concept Explained in Simple English */}
          <section id="concept" className="scroll-mt-28">
            <LessonSimpleConcept lesson={lesson} />
          </section>

          {/* SECTION D: Interactive Diagrams and Visual Explanations */}
          <section id="visuals" className="scroll-mt-28">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest block">
                    Section D · Visual Understanding
                  </span>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                    Interactive Diagrams & Topic Visualizer
                  </h2>
                </div>
              </div>
              <TopicVisualizer lesson={lesson} />
            </div>
          </section>

          {/* SECTION E: Animations for Understanding */}
          <section id="animation" className="scroll-mt-28">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest block">
                    Section E · Dynamic Simulation
                  </span>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                    Step-by-Step Algorithm Animation
                  </h2>
                </div>
              </div>
              <LessonAnimationPlayer lesson={lesson} />
            </div>
          </section>

          {/* SECTION F: Mathematical Intuition */}
          <section id="mathematics" className="scroll-mt-28">
            <LessonMathematics lesson={lesson} />
          </section>

          {/* SECTION G: Step-by-Step Algorithm Workflow */}
          <section id="workflow" className="scroll-mt-28">
            <LessonWorkflow lesson={lesson} />
          </section>

          {/* SECTION H: Practical Python Implementation */}
          <section id="python" className="scroll-mt-28">
            <LessonPythonCode lesson={lesson} />
          </section>

          {/* SECTION I: Results and Visualization */}
          <section id="results" className="scroll-mt-28">
            <LessonResultsVisualization lesson={lesson} />
          </section>

          {/* SECTION J & K: Assumptions, Advantages, Limitations & Model Evaluation */}
          <section id="evaluation" className="scroll-mt-28">
            <LessonEvaluation lesson={lesson} />
          </section>

          {/* SECTION L: Interactive Practice and Active Recall */}
          <section id="practice" className="scroll-mt-28">
            <LessonPractice lesson={lesson} />
          </section>

          {/* SECTION M: Revision Notes and Cheat Sheet */}
          <section id="cheatsheet" className="scroll-mt-28">
            <LessonCheatSheet lesson={lesson} />
          </section>
        </main>

        {/* Right Sidebar: Compact Table of Contents & Personal Notes Drawer */}
        <aside className="hidden lg:block lg:col-span-3">
          <LessonNavigation lessonId={lesson.id} initialNote={userNote} />
        </aside>
      </div>

      {/* Floating Reusable AI Coding & Concept Tutor */}
      <AITutorPanel
        track="ml"
        moduleId={lesson.moduleId}
        lessonId={lesson.id}
        lessonTitle={lesson.title}
        language="python"
        codeSnippet={lesson.runnableCode?.code || lesson.scratchCode?.code}
      />
    </div>
  );
};
