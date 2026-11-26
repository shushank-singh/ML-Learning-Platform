'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import {
  Flame,
  RotateCw,
  CheckCircle2,
  Sparkles,
  Brain,
  ArrowRight,
  AlertTriangle,
  Layers,
} from 'lucide-react';
import { RevisionSubject, RevisionTopic } from '@/data/revision/types';
import { loadRevisionSubjectTopics } from '@/data/revision/loader';
import { getProgress, logStudyTime } from '@/lib/storage';
import {
  getSpacedRepetitionMap,
  scheduleCardReview,
  computeNextSm2,
  isCardDue,
  CardReviewRecord,
  RecallQuality,
} from '@/lib/spacedRepetition';

const SUBJECTS: RevisionSubject[] = ['ml', 'python', 'java', 'dsa'];

export default function DailyReviewPage() {
  const [topics, setTopics] = useState<RevisionTopic[]>([]);
  const [srMap, setSrMap] = useState<Record<string, CardReviewRecord>>({});
  const [weakTopicIds, setWeakTopicIds] = useState<string[]>([]);
  const [subjectFilter, setSubjectFilter] = useState<'all' | RevisionSubject>('all');
  const [flipped, setFlipped] = useState<boolean>(false);
  const [reviewedToday, setReviewedToday] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setSrMap(getSpacedRepetitionMap());
    const p = getProgress();
    setWeakTopicIds(p.weakTopics || []);

    Promise.all(SUBJECTS.map((s) => loadRevisionSubjectTopics(s)))
      .then((lists) => {
        setTopics(lists.flat());
      })
      .finally(() => setLoading(false));
  }, []);

  // Prioritize weak-topic-matching cards, then due cards, capped to a crisp 15-card daily session
  const dueDeck = useMemo(() => {
    const filtered =
      subjectFilter === 'all'
        ? topics
        : topics.filter((t) => t.subject === subjectFilter);

    const weakSet = new Set(weakTopicIds.map((w) => w.toLowerCase()));
    const due = filtered.filter((t) => isCardDue(srMap[t.id]));

    due.sort((a, b) => {
      const aWeak = weakSet.has(a.id.toLowerCase()) || a.isInterviewFavorite ? 0 : 1;
      const bWeak = weakSet.has(b.id.toLowerCase()) || b.isInterviewFavorite ? 0 : 1;
      if (aWeak !== bWeak) return aWeak - bWeak;
      const aSeen = srMap[a.id] ? 1 : 0;
      const bSeen = srMap[b.id] ? 1 : 0;
      return bSeen - aSeen;
    });

    return due.slice(0, 15);
  }, [topics, srMap, subjectFilter, weakTopicIds]);

  const currentCard = dueDeck[0] || null;

  const handleRate = useCallback(
    (quality: RecallQuality) => {
      if (!currentCard) return;
      const updated = scheduleCardReview(currentCard.id, quality);
      setSrMap((prev) => ({ ...prev, [currentCard.id]: updated }));
      setFlipped(false);
      setReviewedToday((n) => n + 1);
      logStudyTime(1);
    },
    [currentCard]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!currentCard) return;
      if (e.code === 'Space') {
        e.preventDefault();
        setFlipped((f) => !f);
      } else if (flipped && e.key === '1') {
        handleRate(1);
      } else if (flipped && e.key === '2') {
        handleRate(3);
      } else if (flipped && e.key === '3') {
        handleRate(4);
      } else if (flipped && e.key === '4') {
        handleRate(5);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [currentCard, flipped, handleRate]);

  const currentRecord = currentCard ? srMap[currentCard.id] : undefined;

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400 text-xs font-semibold">
            <Flame className="w-4 h-4" />
            <span>SM-2 Spaced-Repetition Flashcards</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Daily Active Recall Queue
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
            Review due high-yield concepts and weak areas in 3 minutes a day. Cards reschedule automatically based on your recall confidence.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
            Due: <strong>{dueDeck.length}</strong>
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
            Reviewed: <strong>{reviewedToday}</strong>
          </span>
        </div>
      </div>

      {/* Subject Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {(['all', ...SUBJECTS] as const).map((subj) => (
          <button
            key={subj}
            onClick={() => {
              setSubjectFilter(subj);
              setFlipped(false);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider border transition-colors ${
              subjectFilter === subj
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800'
            }`}
          >
            {subj === 'all' ? 'All Tracks' : subj}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="h-72 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center text-xs font-mono text-slate-400">
          Loading your spaced-repetition deck...
        </div>
      ) : !currentCard ? (
        <div className="p-10 rounded-3xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/20 text-center space-y-4">
          <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            All Caught Up for Today!
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
            You completed your spaced-repetition queue ({reviewedToday} cards reviewed today). Come back tomorrow or test yourself in a timed mock interview.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <Link
              href="/mock-interview"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold"
            >
              <span>Try Mock Interview</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/analytics"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200"
            >
              <span>View Analytics</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          {/* Flashcard */}
          <div
            onClick={() => setFlipped((f) => !f)}
            className="cursor-pointer rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-10 shadow-xl min-h-[320px] flex flex-col justify-between space-y-6 transition-all hover:border-indigo-500/40"
          >
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold uppercase tracking-wider">
                  {currentCard.subject.toUpperCase()} · {currentCard.category}
                </span>
                {currentCard.isInterviewFavorite && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 text-[10px] font-bold">
                    ★ Interview Favorite
                  </span>
                )}
              </div>
              <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                <RotateCw className="w-3 h-3" />
                <span>Click or Press Space to {flipped ? 'Hide' : 'Flip'}</span>
              </span>
            </div>

            {!flipped ? (
              <div className="space-y-4 py-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                  <Brain className="w-4 h-4 text-indigo-500" />
                  <span>Active Recall Prompt</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  {currentCard.title}
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {currentCard.subtitle} — What is the core mechanism, formula/syntax, and primary interview trap?
                </p>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
                  <strong>Analogy Hint:</strong> {currentCard.quickRecall.simpleAnalogy}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/50 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    Core Definition
                  </span>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {currentCard.quickRecall.oneLiner}
                  </p>
                </div>

                {currentCard.quickRecall.formulaOrSyntax && (
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-300 overflow-x-auto">
                    <span className="text-slate-400 block text-[10px] mb-1">
                      {currentCard.quickRecall.formulaOrSyntax.label}
                    </span>
                    {currentCard.quickRecall.formulaOrSyntax.codeOrLatex}
                  </div>
                )}

                <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                  {currentCard.quickRecall.keyPoints.slice(0, 3).map((pt, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                {currentCard.quickRecall.commonMistakeOrTrap && (
                  <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <strong>Trap:</strong> {currentCard.quickRecall.commonMistakeOrTrap.mistake}{' '}
                      <strong>Fix:</strong> {currentCard.quickRecall.commonMistakeOrTrap.fix}
                    </div>
                  </div>
                )}

                <div className="flex justify-end">
                  <Link
                    href={`/revision-notes?subject=${currentCard.subject}&topic=${currentCard.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Open Full Visual Note</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* SM-2 Rating Controls */}
          {flipped ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(
                [
                  { q: 1 as RecallQuality, label: 'Again', key: '1', cls: 'bg-rose-600 hover:bg-rose-700 text-white' },
                  { q: 3 as RecallQuality, label: 'Hard', key: '2', cls: 'bg-amber-600 hover:bg-amber-700 text-white' },
                  { q: 4 as RecallQuality, label: 'Good', key: '3', cls: 'bg-indigo-600 hover:bg-indigo-700 text-white' },
                  { q: 5 as RecallQuality, label: 'Easy', key: '4', cls: 'bg-emerald-600 hover:bg-emerald-700 text-white' },
                ] as const
              ).map((btn) => {
                const next = computeNextSm2(currentRecord, currentCard.id, btn.q);
                return (
                  <button
                    key={btn.q}
                    onClick={() => handleRate(btn.q)}
                    className={`py-3 px-4 rounded-2xl font-bold text-xs shadow-sm transition-all flex flex-col items-center gap-0.5 ${btn.cls}`}
                  >
                    <span>
                      [{btn.key}] {btn.label}
                    </span>
                    <span className="text-[10px] opacity-85 font-mono">
                      Next: {next.intervalDays}d
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <button
              onClick={() => setFlipped(true)}
              className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md transition-colors"
            >
              Show Answer &amp; Rate Recall (Space)
            </button>
          )}
        </div>
      )}
    </div>
  );
}
