'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  BookOpen,
  Calculator,
  CheckCircle2,
  Bookmark,
  CheckSquare,
  Layers,
  Zap,
  AlertTriangle,
  HelpCircle,
  Save,
  RotateCw,
} from 'lucide-react';
import {
  getChapterById,
  getFlashcardsForChapter,
  getFormulasForChapter,
  getLessonsForChapter,
  getQuestionsForChapter,
  getRevisionNotesForChapter,
} from '@/data/iit';
import {
  getIITProgress,
  recordIITFlashcardReview,
  recordIITLastVisited,
  recordIITStudySession,
  saveIITChapterNote,
  toggleIITChapterBookmark,
  toggleIITChapterCompletion,
  toggleIITLessonCompletion,
} from '@/lib/iit/progress';
import { IITMarkdownMath } from '@/components/iit/IITMarkdownMath';
import { MathBlock } from '@/components/math/Math';
import { IITQuestionCard } from '@/components/iit/IITQuestionCard';
import { IITTopicTutorWidget } from '@/components/iit/IITTopicTutorWidget';
import { IITUserProgress } from '@/types/iit';

type ChapterTab = 'lessons' | 'revision' | 'formulas' | 'practice' | 'flashcards';

export default function IITChapterWorkspacePage() {
  const params = useParams<{ chapterId: string }>();
  const chapterId = params?.chapterId || '';
  const chapter = getChapterById(chapterId);

  const lessons = useMemo(() => (chapter ? getLessonsForChapter(chapter.id) : []), [chapter]);
  const revisionNotes = useMemo(
    () => (chapter ? getRevisionNotesForChapter(chapter.id) : null),
    [chapter]
  );
  const formulas = useMemo(() => (chapter ? getFormulasForChapter(chapter.id) : []), [chapter]);
  const questions = useMemo(() => (chapter ? getQuestionsForChapter(chapter.id) : []), [chapter]);
  const flashcards = useMemo(() => (chapter ? getFlashcardsForChapter(chapter.id) : []), [chapter]);

  const [activeTab, setActiveTab] = useState<ChapterTab>('lessons');
  const [selectedLessonIdx, setSelectedLessonIdx] = useState(0);
  const [progress, setProgress] = useState<IITUserProgress | null>(null);
  const [noteDraft, setNoteDraft] = useState('');
  const [noteSavedMsg, setNoteSavedMsg] = useState(false);
  const [questionFilter, setQuestionFilter] = useState<'all' | 'pyq' | 'main' | 'advanced'>('all');
  const [cardIdx, setCardIdx] = useState(0);
  const [cardFlipped, setCardFlipped] = useState(false);

  useEffect(() => {
    if (!chapter) return;
    const sync = () => {
      const p = getIITProgress();
      setProgress(p);
      setNoteDraft(p.personalNotes[chapter.id] || '');
    };
    sync();
    recordIITLastVisited(chapter.id, lessons[0]?.id);
    window.addEventListener('iit_progress_updated', sync);

    const startedAt = Date.now();
    return () => {
      window.removeEventListener('iit_progress_updated', sync);
      const sec = Math.round((Date.now() - startedAt) / 1000);
      if (sec >= 3) {
        recordIITStudySession(chapter.id, chapter.subject, 'lesson', sec);
      }
    };
  }, [chapter, lessons]);

  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      if (questionFilter === 'pyq') return q.isPyq;
      if (questionFilter === 'main') return q.exam === 'JEE Main';
      if (questionFilter === 'advanced') return q.exam === 'JEE Advanced';
      return true;
    });
  }, [questions, questionFilter]);

  if (!chapter) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
        <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto" />
        <h1 className="text-xl font-extrabold text-slate-900 dark:text-white">
          Chapter Not Found
        </h1>
        <p className="text-xs text-slate-500">
          Could not locate chapter <code className="font-mono">{chapterId}</code>.
        </p>
        <Link
          href="/iit/syllabus"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600 text-white text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" /> Back to JEE Syllabus
        </Link>
      </div>
    );
  }

  const activeLesson = lessons[selectedLessonIdx] || lessons[0];
  const isChapterDone = Boolean(progress?.completedChapters?.[chapter.id]);
  const isBookmarked = Boolean(progress?.bookmarkedChapterIds?.includes(chapter.id));

  const tabs: { id: ChapterTab; label: string; count?: number; icon: any }[] = [
    { id: 'lessons', label: 'Theory & Examples', count: lessons.length, icon: BookOpen },
    { id: 'revision', label: 'Revision Notes', icon: Zap },
    { id: 'formulas', label: 'Formula Sheet', count: formulas.length, icon: Calculator },
    { id: 'practice', label: 'Practice & PYQs', count: questions.length, icon: CheckSquare },
    { id: 'flashcards', label: 'SM-2 Flashcards', count: flashcards.length, icon: Layers },
  ];

  const activeCard = flashcards[cardIdx];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      {/* Breadcrumb & Header */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-7 space-y-4 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/iit/syllabus"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-amber-600 dark:hover:text-amber-400"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Syllabus Explorer</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => toggleIITChapterBookmark(chapter.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors ${
                isBookmarked
                  ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-400 text-amber-700 dark:text-amber-300'
                  : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
            </button>

            <button
              type="button"
              onClick={() => toggleIITChapterCompletion(chapter.id)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                isChapterDone
                  ? 'bg-emerald-600 text-white'
                  : 'bg-amber-600 hover:bg-amber-500 text-white'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isChapterDone ? 'Chapter Completed' : 'Mark Chapter Complete'}</span>
            </button>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2 text-[11px]">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 font-bold capitalize">
              {chapter.subject}
              {chapter.branch ? ` · ${chapter.branch}` : ''} · Class {chapter.classLevel}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono">
              {chapter.examApplicability.replace(/_/g, ' ').toUpperCase()}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-semibold">
              {chapter.weightage} Weightage · ~{chapter.estimatedHours}h
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {chapter.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-4xl">
            <IITMarkdownMath content={chapter.subtitle} />
          </p>
        </div>

        {/* Official Syllabus Scope Callout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 text-xs">
          <div className="p-3 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/20 border border-indigo-200/80 dark:border-indigo-900/50">
            <span className="font-bold text-indigo-700 dark:text-indigo-300 block mb-0.5">
              JEE Main Syllabus Focus
            </span>
            <span className="text-slate-700 dark:text-slate-300">
              <IITMarkdownMath content={chapter.jeeMainNotes} />
            </span>
          </div>
          <div className="p-3 rounded-xl bg-violet-50/60 dark:bg-violet-950/20 border border-violet-200/80 dark:border-violet-900/50">
            <span className="font-bold text-violet-700 dark:text-violet-300 block mb-0.5">
              JEE Advanced Syllabus Focus
            </span>
            <span className="text-slate-700 dark:text-slate-300">
              <IITMarkdownMath content={chapter.jeeAdvancedNotes} />
            </span>
          </div>
        </div>

        {chapter.excludedFromJeeMain && chapter.excludedFromJeeMain.length > 0 && (
          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong>Official Syllabus Note: </strong>
              {chapter.excludedFromJeeMain.join(' · ')}
            </div>
          </div>
        )}
      </div>

      {/* Workspace Tabs */}
      <div className="flex flex-wrap gap-1.5 p-1.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
                active
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                    active ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: THEORY, DERIVATIONS & SOLVED EXAMPLES */}
      {activeTab === 'lessons' && activeLesson && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Topic -> Lesson Selector + Personal Notes */}
          <div className="lg:col-span-4 space-y-5">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Topics &amp; Lessons
              </h2>
              <div className="space-y-1.5">
                {lessons.map((les, idx) => {
                  const done = Boolean(progress?.completedLessons?.[les.id]);
                  const isSel = idx === selectedLessonIdx;
                  return (
                    <button
                      key={les.id}
                      type="button"
                      onClick={() => setSelectedLessonIdx(idx)}
                      className={`w-full text-left p-3 rounded-xl border text-xs transition-colors flex items-center justify-between gap-2 ${
                        isSel
                          ? 'bg-amber-50 dark:bg-amber-950/50 border-amber-500 text-slate-900 dark:text-white font-bold'
                          : 'bg-slate-50 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span className="truncate">
                        {idx + 1}. {les.title}
                      </span>
                      {done && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Personal Chapter Notes */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Personal Chapter Notes
                </h3>
                {noteSavedMsg && (
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                    Saved!
                  </span>
                )}
              </div>
              <textarea
                rows={5}
                value={noteDraft}
                onChange={(e) => setNoteDraft(e.target.value)}
                placeholder="Write key shortcuts, errors you made in PYQs, or formulas to revise..."
                className="w-full rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-2.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-amber-500"
              />
              <button
                type="button"
                onClick={() => {
                  saveIITChapterNote(chapter.id, noteDraft);
                  setNoteSavedMsg(true);
                  setTimeout(() => setNoteSavedMsg(false), 1800);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 dark:bg-amber-600 text-white text-xs font-bold"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Notes</span>
              </button>
            </div>
          </div>

          {/* Right: Active Lesson Content */}
          <div className="lg:col-span-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-7 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div>
                <span className="text-[11px] font-mono text-amber-600 dark:text-amber-400 font-bold">
                  Lesson {selectedLessonIdx + 1} of {lessons.length} · ~{activeLesson.estimatedMinutes} min
                </span>
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  {activeLesson.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => toggleIITLessonCompletion(activeLesson.id, chapter.id)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
                  progress?.completedLessons?.[activeLesson.id]
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-emerald-600 hover:text-white'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>
                  {progress?.completedLessons?.[activeLesson.id]
                    ? 'Lesson Done'
                    : 'Mark Lesson Done'}
                </span>
              </button>
            </div>

            {/* Core Concept */}
            <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/25 border border-amber-200 dark:border-amber-800/60 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">
                Core Principle
              </span>
              <p className="text-sm text-slate-800 dark:text-slate-100 leading-relaxed">
                <IITMarkdownMath content={activeLesson.coreConcept} />
              </p>
            </div>

            {/* Detailed Theory */}
            <div className="space-y-2.5">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                Conceptual Theory &amp; Key Rules
              </h3>
              <ul className="space-y-2">
                {activeLesson.detailedTheory.map((pt, idx) => (
                  <li
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed"
                  >
                    <IITMarkdownMath content={pt} />
                  </li>
                ))}
              </ul>
            </div>

            {/* Step-by-Step Derivations */}
            {activeLesson.derivations.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                  Step-by-Step Derivations
                </h3>
                {activeLesson.derivations.map((der, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-200/80 dark:border-indigo-900/50 space-y-2"
                  >
                    <h4 className="text-xs font-bold text-indigo-700 dark:text-indigo-300">
                      {der.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                      <IITMarkdownMath content={der.explanation} />
                    </p>
                    {der.latex && <MathBlock math={der.latex} />}
                  </div>
                ))}
              </div>
            )}

            {/* Solved Examples */}
            {activeLesson.solvedExamples.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                  Solved JEE Examples
                </h3>
                {activeLesson.solvedExamples.map((ex) => (
                  <div
                    key={ex.id}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-2.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                        {ex.title}
                      </h4>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                        {ex.level}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">
                      <IITMarkdownMath content={ex.problem} />
                    </p>
                    <ol className="list-decimal list-inside space-y-1 text-xs text-slate-700 dark:text-slate-300">
                      {ex.steps.map((st, sIdx) => (
                        <li key={sIdx}>
                          <IITMarkdownMath content={st} />
                        </li>
                      ))}
                    </ol>
                    <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
                      <span className="font-bold text-emerald-700 dark:text-emerald-400">
                        Answer: <IITMarkdownMath content={ex.finalAnswer} />
                      </span>
                      <span className="text-slate-500 dark:text-slate-400">
                        Takeaway: <IITMarkdownMath content={ex.keyTakeaway} />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Common Mistakes & Checkpoint */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-300 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" /> Common JEE Traps
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                  {activeLesson.commonMistakes.map((m, i) => (
                    <li key={i}>
                      • <IITMarkdownMath content={m} />
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5" /> Quick Concept Checkpoint
                </h4>
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  <IITMarkdownMath content={activeLesson.checkpointQuestion.prompt} />
                </p>
                <details className="text-xs text-emerald-800 dark:text-emerald-300 cursor-pointer">
                  <summary className="font-bold hover:underline">Reveal Answer</summary>
                  <p className="mt-1.5 leading-relaxed">
                    <IITMarkdownMath content={activeLesson.checkpointQuestion.answer} />
                  </p>
                </details>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CONCISE REVISION NOTES */}
      {activeTab === 'revision' && revisionNotes && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-7 space-y-6">
          <div className="space-y-3">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>60-Second Rapid Revision Sheet</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {revisionNotes.sixtySecondSummary.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-200 flex items-start gap-2.5"
                >
                  <span className="w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-mono text-[11px] font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span>
                    <IITMarkdownMath content={item} />
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/50 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
              High-Yield Core Idea
            </span>
            <p className="text-sm text-slate-800 dark:text-slate-100">
              <IITMarkdownMath content={revisionNotes.twoMinuteHighYield.coreIdea} />
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                Key Laws &amp; Boundary Conditions
              </h3>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                {revisionNotes.twoMinuteHighYield.keyLawsAndConditions.map((law, i) => (
                  <li key={i} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800">
                    <IITMarkdownMath content={law} />
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400">
                Exam Traps to Avoid
              </h3>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                {revisionNotes.twoMinuteHighYield.examTraps.map((trap, i) => (
                  <li key={i} className="p-2.5 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50">
                    <IITMarkdownMath content={trap} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: FORMULA SHEET */}
      {activeTab === 'formulas' && (
        <div className="space-y-4">
          {formulas.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 text-center text-xs text-slate-500">
              No standalone formula cards mapped for this chapter yet — check the Theory tab or explore the global{' '}
              <Link href="/iit/formulas" className="text-amber-600 underline">
                Formula Vault
              </Link>
              .
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formulas.map((f) => (
                <div
                  key={f.id}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">{f.title}</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
                      {f.examTags.join(' · ')}
                    </span>
                  </div>
                  <MathBlock math={f.latex} />
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    <strong>Variables:</strong> <IITMarkdownMath content={f.variables} />
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: PRACTICE & PYQS */}
      {activeTab === 'practice' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-1.5">
              {(
                [
                  { id: 'all', label: `All (${questions.length})` },
                  { id: 'pyq', label: 'PYQs Only' },
                  { id: 'main', label: 'JEE Main' },
                  { id: 'advanced', label: 'JEE Advanced' },
                ] as const
              ).map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setQuestionFilter(f.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                    questionFilter === f.id
                      ? 'bg-amber-600 text-white'
                      : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <Link
              href="/iit/practice"
              className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline"
            >
              Open Full PCM Question Bank →
            </Link>
          </div>

          {filteredQuestions.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 text-center text-xs text-slate-500 space-y-2">
              <p>No chapter-specific questions match this filter yet.</p>
              <Link
                href="/iit/practice"
                className="inline-block px-3 py-1.5 rounded-lg bg-amber-600 text-white font-bold"
              >
                Practice All Subject Questions
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredQuestions.map((q, idx) => (
                <IITQuestionCard
                  key={q.id}
                  question={q}
                  index={idx}
                  isBookmarked={progress?.bookmarkedQuestionIds?.includes(q.id)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 5: SM-2 FLASHCARDS */}
      {activeTab === 'flashcards' && (
        <div className="max-w-2xl mx-auto">
          {flashcards.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 text-center text-xs text-slate-500">
              No flashcards for this chapter yet — visit the{' '}
              <Link href="/iit/planner" className="text-amber-600 underline">
                SM-2 Revision Queue
              </Link>{' '}
              for all due cards.
            </div>
          ) : (
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-5 shadow-sm">
              <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                <span>
                  Card {cardIdx + 1} of {flashcards.length}
                </span>
                <button
                  type="button"
                  onClick={() => setCardFlipped((p) => !p)}
                  className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 font-sans font-bold"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Flip Card</span>
                </button>
              </div>

              <div
                onClick={() => setCardFlipped((p) => !p)}
                className="min-h-[180px] rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-6 flex flex-col items-center justify-center text-center cursor-pointer space-y-3"
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {cardFlipped ? 'Answer & Key Equation' : 'Prompt (Click to Flip)'}
                </span>
                <div className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
                  <IITMarkdownMath content={cardFlipped ? activeCard.back : activeCard.front} />
                </div>
                {cardFlipped && activeCard.formulaLatex && (
                  <div className="w-full">
                    <MathBlock math={activeCard.formulaLatex} />
                  </div>
                )}
              </div>

              {cardFlipped && (
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-slate-500 block text-center">
                    Rate recall quality (SM-2 Spaced Repetition):
                  </span>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { q: 1 as const, label: 'Again (1d)', cls: 'bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800' },
                      { q: 3 as const, label: 'Hard', cls: 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800' },
                      { q: 4 as const, label: 'Good', cls: 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800' },
                      { q: 5 as const, label: 'Easy', cls: 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800' },
                    ].map((btn) => (
                      <button
                        key={btn.q}
                        type="button"
                        onClick={() => {
                          recordIITFlashcardReview(activeCard.id, btn.q);
                          setCardFlipped(false);
                          setCardIdx((i) => (i + 1) % flashcards.length);
                        }}
                        className={`py-2 rounded-xl border text-xs font-bold ${btn.cls}`}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Contextual IIT JEE AI Tutor Drawer */}
      <IITTopicTutorWidget
        subject={chapter.subject}
        chapterId={chapter.id}
        chapterTitle={chapter.title}
        lessonTitle={activeLesson?.title}
      />
    </div>
  );
}
