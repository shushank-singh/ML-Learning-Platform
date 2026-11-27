'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  CheckSquare,
  Timer,
  Layers,
  AlertCircle,
  Award,
  Play,
} from 'lucide-react';
import {
  MEDVERSE_MCQS,
  MEDVERSE_FLASHCARDS,
  MBBS_TOPICS_CATALOG,
} from '@/data/medverse';
import { QuizEnginePanel } from '@/components/medverse/QuizEnginePanel';
import { FlashcardSM2Panel } from '@/components/medverse/FlashcardSM2Panel';
import {
  computeMedVerseAccuracyStats,
  getMedVerseProgress,
} from '@/lib/medverse/progress';
import { MedVerseUserProgress } from '@/types/medverse';

type QuizMode = 'topic' | 'structure-id' | 'timed' | 'incorrect' | 'flashcards';

export default function MedVerseQuizzesPage() {
  const [mode, setMode] = useState<QuizMode>('topic');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('all');
  const [progress, setProgress] = useState<MedVerseUserProgress | null>(null);
  const [timedSecondsLeft, setTimedSecondsLeft] = useState<number>(300);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);

  const refreshProgress = () => setProgress(getMedVerseProgress());

  useEffect(() => {
    refreshProgress();
    window.addEventListener('medverse_progress_updated', refreshProgress);
    return () => window.removeEventListener('medverse_progress_updated', refreshProgress);
  }, []);

  useEffect(() => {
    if (!timerRunning || timedSecondsLeft <= 0) return;
    const t = setInterval(() => {
      setTimedSecondsLeft((prev) => {
        if (prev <= 1) {
          setTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [timerRunning, timedSecondsLeft]);

  const stats = useMemo(
    () => (progress ? computeMedVerseAccuracyStats(progress) : null),
    [progress]
  );

  const publishedTopics = MBBS_TOPICS_CATALOG.filter((t) => t.status === 'published');

  const incorrectQuestionIds = useMemo(() => {
    if (!progress) return new Set<string>();
    const latestByQ = new Map<string, boolean>();
    for (const att of progress.attempts) {
      latestByQ.set(att.questionId, att.isCorrect);
    }
    const wrong = new Set<string>();
    latestByQ.forEach((ok, qid) => {
      if (!ok) wrong.add(qid);
    });
    return wrong;
  }, [progress]);

  const activeQuestions = useMemo(() => {
    if (mode === 'structure-id') {
      return MEDVERSE_MCQS.filter((q) => q.questionType === 'structure_identification');
    }
    if (mode === 'incorrect') {
      return MEDVERSE_MCQS.filter((q) => incorrectQuestionIds.has(q.id));
    }
    if (mode === 'timed') {
      return MEDVERSE_MCQS.slice(0, 10);
    }
    if (selectedTopicId === 'all') return MEDVERSE_MCQS;
    return MEDVERSE_MCQS.filter((q) => q.topicId === selectedTopicId);
  }, [mode, selectedTopicId, incorrectQuestionIds]);

  const dueFlashcardsCount = useMemo(() => {
    if (!progress) return MEDVERSE_FLASHCARDS.length;
    const now = Date.now();
    return MEDVERSE_FLASHCARDS.filter((c) => {
      const rev = progress.flashcardReviews[c.id];
      return !rev || new Date(rev.nextReviewAt).getTime() <= now;
    }).length;
  }, [progress]);

  const mins = Math.floor(timedSecondsLeft / 60);
  const secs = timedSecondsLeft % 60;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header & Real Attempt Metrics */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-5 sm:p-6 space-y-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wider">
              <CheckSquare className="w-4 h-4" />
              <span>Assessment &amp; SM-2 Spaced Repetition</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              MBBS Quizzes, Structure ID &amp; Flashcard Revision
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              All scores and accuracy metrics reflect your actual recorded attempts. Practice items are labeled as synthetic MedVerse questions.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2.5 shrink-0">
            <div className="px-3.5 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center">
              <span className="text-[10px] text-slate-500 uppercase block">Attempts</span>
              <span className="text-lg font-mono font-extrabold text-slate-900 dark:text-white">
                {stats?.totalAttempts ?? 0}
              </span>
            </div>
            <div className="px-3.5 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center">
              <span className="text-[10px] text-slate-500 uppercase block">Accuracy</span>
              <span className="text-lg font-mono font-extrabold text-teal-600 dark:text-teal-300">
                {stats?.accuracyPercentage !== null && stats?.accuracyPercentage !== undefined
                  ? `${stats.accuracyPercentage}%`
                  : '—'}
              </span>
            </div>
            <div className="px-3.5 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center">
              <span className="text-[10px] text-slate-500 uppercase block">Due Cards</span>
              <span className="text-lg font-mono font-extrabold text-cyan-600 dark:text-cyan-300">
                {dueFlashcardsCount}
              </span>
            </div>
          </div>
        </div>

        {/* Mode Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
          {[
            { id: 'topic' as const, label: `Topic MCQs (${MEDVERSE_MCQS.length})`, icon: CheckSquare },
            { id: 'structure-id' as const, label: 'Structure ID Drills', icon: Award },
            { id: 'timed' as const, label: 'Timed 10-Q Test', icon: Timer },
            { id: 'incorrect' as const, label: `Incorrect Review (${incorrectQuestionIds.size})`, icon: AlertCircle },
            { id: 'flashcards' as const, label: `SM-2 Flashcards (${MEDVERSE_FLASHCARDS.length})`, icon: Layers },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setMode(tab.id)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-colors ${
                  mode === tab.id
                    ? 'bg-teal-600 border-teal-500 text-white'
                    : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-teal-500/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Topic Filter or Timed Mode Controls */}
        {mode === 'topic' && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Filter Topic:</span>
            <select
              value={selectedTopicId}
              onChange={(e) => setSelectedTopicId(e.target.value)}
              aria-label="Filter MCQs by topic"
              className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-teal-500"
            >
              <option value="all">All Published Topics ({MEDVERSE_MCQS.length} Questions)</option>
              {publishedTopics.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.title} ({t.mcqCount})
                </option>
              ))}
            </select>
          </div>
        )}

        {mode === 'timed' && (
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <Timer className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
              <span className="text-sm font-mono font-extrabold text-slate-900 dark:text-white">
                {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
              </span>
              <span className="text-xs text-slate-600 dark:text-slate-400">10-Question Timed Assessment (5 mins)</span>
            </div>
            <button
              type="button"
              onClick={() => {
                if (timedSecondsLeft === 0) setTimedSecondsLeft(300);
                setTimerRunning((r) => !r);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold"
            >
              <Play className="w-3.5 h-3.5" />
              <span>{timerRunning ? 'Pause Timer' : 'Start Timer'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Active Mode Content */}
      {mode === 'flashcards' ? (
        <FlashcardSM2Panel cards={MEDVERSE_FLASHCARDS} />
      ) : (
        <QuizEnginePanel
          questions={activeQuestions}
          title={
            mode === 'incorrect'
              ? 'Incorrect-Answer Review Queue'
              : mode === 'structure-id'
              ? '3D Anatomical Structure Identification'
              : mode === 'timed'
              ? 'Timed Practice Test'
              : 'Topic MCQs'
          }
          onAttemptRecorded={refreshProgress}
        />
      )}
    </div>
  );
}
