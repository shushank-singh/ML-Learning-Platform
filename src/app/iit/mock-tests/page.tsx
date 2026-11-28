'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import {
  ClipboardCheck,
  Clock,
  Play,
  Flag,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { IIT_MOCK_TESTS, IIT_QUESTIONS_BY_ID } from '@/data/iit';
import { IITMarkdownMath } from '@/components/iit/IITMarkdownMath';
import { getIITProgress, recordIITMockTestResult } from '@/lib/iit/progress';
import {
  IITMockTest,
  IITMockTestResult,
  IITMockTestSubjectScore,
  IITQuestion,
  IITSubjectId,
  IITUserProgress,
} from '@/types/iit';

type PaletteStatus = 'not_visited' | 'not_answered' | 'answered' | 'marked_review' | 'answered_marked';

interface AnswerDraft {
  selectedIndices?: number[];
  numericalValue?: string;
}

export default function IITMockTestsPage() {
  const [progress, setProgress] = useState<IITUserProgress | null>(null);
  const [activeTest, setActiveTest] = useState<IITMockTest | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerDraft>>({});
  const [visited, setVisited] = useState<Record<string, boolean>>({});
  const [markedReview, setMarkedReview] = useState<Record<string, boolean>>({});
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [lastSubmitted, setLastSubmitted] = useState<IITMockTestResult | null>(null);

  useEffect(() => {
    const sync = () => setProgress(getIITProgress());
    sync();
    window.addEventListener('iit_progress_updated', sync);
    return () => window.removeEventListener('iit_progress_updated', sync);
  }, []);

  const activeQuestions: IITQuestion[] = useMemo(() => {
    if (!activeTest) return [];
    return activeTest.questionIds
      .map((id) => IIT_QUESTIONS_BY_ID[id])
      .filter((q): q is IITQuestion => Boolean(q));
  }, [activeTest]);

  // Countdown timer
  useEffect(() => {
    if (!activeTest || lastSubmitted) return;
    if (secondsLeft <= 0) {
      handleSubmitTest();
      return;
    }
    const t = setInterval(() => setSecondsLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTest, secondsLeft, lastSubmitted]);

  const startTest = (test: IITMockTest) => {
    setActiveTest(test);
    setCurrentIdx(0);
    setAnswers({});
    setMarkedReview({});
    const firstId = test.questionIds[0];
    setVisited(firstId ? { [firstId]: true } : {});
    setSecondsLeft(test.durationMinutes * 60);
    setLastSubmitted(null);
  };

  const goToQuestion = (idx: number) => {
    if (idx < 0 || idx >= activeQuestions.length) return;
    setCurrentIdx(idx);
    const q = activeQuestions[idx];
    if (q) setVisited((prev) => ({ ...prev, [q.id]: true }));
  };

  const hasAnswer = (q: IITQuestion): boolean => {
    const draft = answers[q.id];
    if (!draft) return false;
    if (q.type === 'numerical') return Boolean(draft.numericalValue && draft.numericalValue.trim() !== '');
    return Boolean(draft.selectedIndices && draft.selectedIndices.length > 0);
  };

  const getPaletteStatus = (q: IITQuestion): PaletteStatus => {
    const ans = hasAnswer(q);
    const mrk = Boolean(markedReview[q.id]);
    const vis = Boolean(visited[q.id]);
    if (ans && mrk) return 'answered_marked';
    if (mrk) return 'marked_review';
    if (ans) return 'answered';
    if (vis) return 'not_answered';
    return 'not_visited';
  };

  const handleOptionClick = (q: IITQuestion, optIdx: number) => {
    setAnswers((prev) => {
      const existing = prev[q.id]?.selectedIndices || [];
      if (q.type === 'scq') {
        return { ...prev, [q.id]: { selectedIndices: [optIdx] } };
      }
      const next = existing.includes(optIdx)
        ? existing.filter((x) => x !== optIdx)
        : [...existing, optIdx].sort();
      return { ...prev, [q.id]: { selectedIndices: next } };
    });
  };

  const handleSubmitTest = () => {
    if (!activeTest || lastSubmitted) return;

    let score = 0;
    let maxScore = 0;
    let correctCount = 0;
    let incorrectCount = 0;
    let unattemptedCount = 0;

    const subjectMap: Record<IITSubjectId, IITMockTestSubjectScore> = {
      physics: { subject: 'physics', attempted: 0, correct: 0, incorrect: 0, score: 0, maxScore: 0 },
      chemistry: { subject: 'chemistry', attempted: 0, correct: 0, incorrect: 0, score: 0, maxScore: 0 },
      mathematics: { subject: 'mathematics', attempted: 0, correct: 0, incorrect: 0, score: 0, maxScore: 0 },
    };

    for (const q of activeQuestions) {
      maxScore += activeTest.markingScheme.correct;
      subjectMap[q.subject].maxScore += activeTest.markingScheme.correct;

      const draft = answers[q.id];
      const attempted = hasAnswer(q);

      if (!attempted) {
        unattemptedCount += 1;
        continue;
      }

      subjectMap[q.subject].attempted += 1;
      let correct = false;
      let qMarks = 0;

      if (q.type === 'numerical') {
        const val = Number(draft?.numericalValue);
        const tol = q.numericalTolerance ?? 0.05;
        correct = !Number.isNaN(val) && Math.abs(val - (q.numericalAnswer ?? 0)) <= tol;
        qMarks = correct ? activeTest.markingScheme.correct : activeTest.markingScheme.numericalIncorrect;
      } else if (q.type === 'scq') {
        const picked = draft?.selectedIndices?.[0];
        correct = picked !== undefined && picked === q.correctIndices?.[0];
        qMarks = correct ? activeTest.markingScheme.correct : activeTest.markingScheme.incorrect;
      } else {
        const expected = [...(q.correctIndices || [])].sort();
        const actual = [...(draft?.selectedIndices || [])].sort();
        correct = expected.length === actual.length && expected.every((v, i) => v === actual[i]);
        if (correct) qMarks = activeTest.markingScheme.correct;
        else if (actual.some((v) => !expected.includes(v))) qMarks = -2;
        else qMarks = actual.length;
      }

      score += qMarks;
      subjectMap[q.subject].score += qMarks;
      if (correct) {
        correctCount += 1;
        subjectMap[q.subject].correct += 1;
      } else {
        incorrectCount += 1;
        subjectMap[q.subject].incorrect += 1;
      }
    }

    const attemptedTotal = correctCount + incorrectCount;
    const accuracyPct = attemptedTotal > 0 ? Math.round((correctCount / attemptedTotal) * 100) : 0;
    const timeTakenSec = Math.max(1, activeTest.durationMinutes * 60 - secondsLeft);

    const result: IITMockTestResult = {
      id: `mt-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      testId: activeTest.id,
      title: activeTest.title,
      examPattern: activeTest.examPattern,
      score,
      maxScore,
      correctCount,
      incorrectCount,
      unattemptedCount,
      accuracyPct,
      timeTakenSec,
      subjectBreakdown: (Object.values(subjectMap) as IITMockTestSubjectScore[]).filter(
        (s) => s.maxScore > 0
      ),
      submittedAt: new Date().toISOString(),
    };

    recordIITMockTestResult(result);
    setLastSubmitted(result);
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // ============================================================================
  // 1. TEST CATALOG VIEW
  // ============================================================================
  if (!activeTest) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 space-y-3 shadow-xs">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/70 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-xs font-bold">
            <ClipboardCheck className="w-3.5 h-3.5" />
            <span>NTA CBT Mock Test Engine · +4 / -1 Scoring</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            JEE Main &amp; JEE Advanced Mock Tests
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
            Realistic Computer-Based Test (CBT) interface with live countdown timer, 5-state question palette, review marking, negative marking, and instant subject-wise analytics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {IIT_MOCK_TESTS.map((test) => (
            <div
              key={test.id}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 flex flex-col justify-between gap-4 shadow-xs"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2 text-[10px]">
                  <span
                    className={`px-2 py-0.5 rounded-full font-bold border ${
                      test.examPattern === 'JEE Advanced'
                        ? 'bg-violet-50 dark:bg-violet-950 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800'
                        : 'bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800'
                    }`}
                  >
                    {test.examPattern}
                  </span>
                  <span className="font-mono text-slate-500">
                    {test.questionIds.length} Qs · {test.durationMinutes} min
                  </span>
                </div>
                <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                  {test.title}
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-400">{test.subtitle}</p>
              </div>

              <button
                type="button"
                onClick={() => startTest(test)}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition-colors"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Start CBT Mock Test</span>
              </button>
            </div>
          ))}
        </div>

        {/* Past Mock Attempts */}
        {progress && progress.mockTestResults.length > 0 && (
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-4">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
              Your Recorded Mock Test History
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="text-slate-500 border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="py-2 pr-4">Test</th>
                    <th className="py-2 pr-4">Pattern</th>
                    <th className="py-2 pr-4">Score</th>
                    <th className="py-2 pr-4">Accuracy</th>
                    <th className="py-2 pr-4">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {[...progress.mockTestResults].reverse().map((res) => (
                    <tr key={res.id}>
                      <td className="py-2.5 pr-4 font-semibold text-slate-900 dark:text-white">
                        {res.title}
                      </td>
                      <td className="py-2.5 pr-4 font-mono">{res.examPattern}</td>
                      <td className="py-2.5 pr-4 font-mono font-bold text-amber-600 dark:text-amber-400">
                        {res.score}/{res.maxScore}
                      </td>
                      <td className="py-2.5 pr-4 font-mono">{res.accuracyPct}%</td>
                      <td className="py-2.5 pr-4 font-mono">{formatTime(res.timeTakenSec)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ============================================================================
  // 2. POST-TEST ANALYTICS & SOLUTION REVIEW
  // ============================================================================
  if (lastSubmitted) {
    const chartData = lastSubmitted.subjectBreakdown.map((sb) => ({
      subject: sb.subject.toUpperCase(),
      Score: sb.score,
      Max: sb.maxScore,
    }));

    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 space-y-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Mock Test Submitted &amp; Saved
              </span>
              <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {lastSubmitted.title}
              </h1>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => startTest(activeTest)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Retake
              </button>
              <button
                type="button"
                onClick={() => setActiveTest(null)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 text-white text-xs font-bold"
              >
                All Mock Tests <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
              <span className="text-[10px] font-bold uppercase text-amber-700 dark:text-amber-300">Total Score</span>
              <div className="text-2xl font-mono font-extrabold text-amber-700 dark:text-amber-300">
                {lastSubmitted.score}/{lastSubmitted.maxScore}
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
              <span className="text-[10px] font-bold uppercase text-emerald-700 dark:text-emerald-300">Correct / Wrong</span>
              <div className="text-2xl font-mono font-extrabold text-emerald-700 dark:text-emerald-300">
                {lastSubmitted.correctCount} / {lastSubmitted.incorrectCount}
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800">
              <span className="text-[10px] font-bold uppercase text-indigo-700 dark:text-indigo-300">Accuracy</span>
              <div className="text-2xl font-mono font-extrabold text-indigo-700 dark:text-indigo-300">
                {lastSubmitted.accuracyPct}%
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] font-bold uppercase text-slate-500">Time Taken</span>
              <div className="text-2xl font-mono font-extrabold text-slate-900 dark:text-white">
                {formatTime(lastSubmitted.timeTakenSec)}
              </div>
            </div>
          </div>

          <div className="h-56 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                <XAxis dataKey="subject" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="Score" fill="#d97706" radius={[6, 6, 0, 0]} />
                <Bar dataKey="Max" fill="#94a3b8" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Question-by-Question Review */}
        <div className="space-y-4">
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
            Detailed Solution Review
          </h2>
          {activeQuestions.map((q, idx) => (
            <div
              key={q.id}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-3"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-amber-600">
                  Q{idx + 1} · {q.subject.toUpperCase()} ({q.pyqYear || q.exam})
                </span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  Verified Answer: <IITMarkdownMath content={q.finalAnswerLabel} />
                </span>
              </div>
              <div className="text-sm text-slate-900 dark:text-slate-100">
                <IITMarkdownMath content={q.stem} />
              </div>
              <ol className="list-decimal list-inside space-y-1 text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                {q.solutionSteps.map((s, sIdx) => (
                  <li key={sIdx}>
                    <IITMarkdownMath content={s} />
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ============================================================================
  // 3. LIVE CBT EXAM INTERFACE
  // ============================================================================
  const currentQ = activeQuestions[currentIdx];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4">
      {/* Top CBT Status Bar */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
            {activeTest.title}
          </h1>
          <span className="text-[11px] font-mono text-slate-500">
            Question {currentIdx + 1} of {activeQuestions.length} · {currentQ?.subject.toUpperCase()}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-sm font-extrabold border ${
              secondsLeft < 180
                ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 border-rose-300'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border-slate-200 dark:border-slate-700'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>{formatTime(secondsLeft)}</span>
          </div>

          <button
            type="button"
            onClick={handleSubmitTest}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs"
          >
            Submit Test
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Question Canvas */}
        {currentQ && (
          <div className="lg:col-span-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 space-y-5">
            <div className="flex items-center justify-between text-xs border-b border-slate-200 dark:border-slate-800 pb-3">
              <span className="font-bold text-amber-600 dark:text-amber-400">
                Q{currentIdx + 1} ·{' '}
                {currentQ.type === 'scq'
                  ? 'Single Correct (+4 / -1)'
                  : currentQ.type === 'mcq_multi'
                  ? 'Multiple Correct (+4 / -2)'
                  : 'Numerical (+4 / 0)'}
              </span>
              <span className="font-mono text-slate-500">{currentQ.difficulty}</span>
            </div>

            <div className="text-sm sm:text-base font-medium text-slate-900 dark:text-slate-100 leading-relaxed">
              <IITMarkdownMath content={currentQ.stem} />
            </div>

            {currentQ.type !== 'numerical' && currentQ.options ? (
              <div className="space-y-2.5">
                {currentQ.options.map((opt, optIdx) => {
                  const picked = (answers[currentQ.id]?.selectedIndices || []).includes(optIdx);
                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => handleOptionClick(currentQ, optIdx)}
                      className={`w-full text-left px-4 py-3 rounded-xl border text-xs sm:text-sm flex items-start gap-3 transition-colors ${
                        picked
                          ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-500 text-amber-900 dark:text-amber-200 font-semibold'
                          : 'bg-slate-50 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-amber-400'
                      }`}
                    >
                      <span className="font-mono font-bold text-slate-500 shrink-0">
                        ({String.fromCharCode(65 + optIdx)})
                      </span>
                      <span>
                        <IITMarkdownMath content={opt} />
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div>
                <input
                  type="number"
                  step="any"
                  value={answers[currentQ.id]?.numericalValue || ''}
                  onChange={(e) =>
                    setAnswers((prev) => ({
                      ...prev,
                      [currentQ.id]: { numericalValue: e.target.value },
                    }))
                  }
                  placeholder="Enter numerical value..."
                  className="w-60 px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm font-mono"
                />
              </div>
            )}

            {/* CBT Navigation Controls */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setMarkedReview((prev) => ({ ...prev, [currentQ.id]: true }));
                    if (currentIdx + 1 < activeQuestions.length) goToQuestion(currentIdx + 1);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-violet-50 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800 text-xs font-bold"
                >
                  <Flag className="w-3.5 h-3.5" />
                  <span>Mark for Review &amp; Next</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setAnswers((prev) => {
                      const next = { ...prev };
                      delete next[currentQ.id];
                      return next;
                    })
                  }
                  className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold"
                >
                  Clear Response
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={currentIdx === 0}
                  onClick={() => goToQuestion(currentIdx - 1)}
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 disabled:opacity-40 text-xs font-bold"
                >
                  <ChevronLeft className="w-4 h-4" /> Prev
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (currentIdx + 1 < activeQuestions.length) goToQuestion(currentIdx + 1);
                  }}
                  className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold"
                >
                  <span>Save &amp; Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Question Palette */}
        <div className="lg:col-span-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            NTA CBT Question Palette
          </h2>

          <div className="grid grid-cols-5 gap-2">
            {activeQuestions.map((q, idx) => {
              const st = getPaletteStatus(q);
              const isCurrent = idx === currentIdx;
              const paletteCls =
                st === 'answered'
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : st === 'answered_marked'
                  ? 'bg-violet-600 text-white border-emerald-400 ring-2 ring-emerald-400'
                  : st === 'marked_review'
                  ? 'bg-violet-600 text-white border-violet-600'
                  : st === 'not_answered'
                  ? 'bg-rose-500 text-white border-rose-500'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700';

              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => goToQuestion(idx)}
                  className={`h-9 rounded-lg border text-xs font-mono font-bold transition-all ${paletteCls} ${
                    isCurrent ? 'ring-2 ring-amber-500 ring-offset-1 dark:ring-offset-slate-900' : ''
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200 dark:border-slate-800 text-[10px] text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-emerald-600 inline-block" /> Answered
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-rose-500 inline-block" /> Not Answered
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-violet-600 inline-block" /> Marked Review
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-slate-200 dark:bg-slate-800 inline-block" /> Not Visited
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

