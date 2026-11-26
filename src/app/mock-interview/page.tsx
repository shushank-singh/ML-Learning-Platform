'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import {
  Timer,
  Play,
  CheckCircle2,
  XCircle,
  Award,
  RotateCcw,
  Code2,
  ArrowRight,
  Sparkles,
  Terminal,
  ShieldCheck,
} from 'lucide-react';
import { MOCK_INTERVIEW_TRACKS, MockInterviewTrack } from '@/data/mockInterviews';
import { usePyodide } from '@/lib/pyodide';
import { getProgress, recordQuizScore, logStudyTime } from '@/lib/storage';
import { UserProgressState } from '@/lib/types';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div className="h-64 flex items-center justify-center bg-slate-900 text-slate-400 font-mono text-xs">
      Loading Coding Sandbox...
    </div>
  ),
});

const AITutorPanel = dynamic(
  () => import('@/components/tutor/AITutorPanel').then((m) => m.AITutorPanel),
  { ssr: false }
);

function formatClock(totalSeconds: number): string {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export default function MockInterviewPage() {
  const [activeTrack, setActiveTrack] = useState<MockInterviewTrack | null>(null);
  const [secondsLeft, setSecondsLeft] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [code, setCode] = useState<string>('');
  const [testOutput, setTestOutput] = useState<string | null>(null);
  const [codingPassed, setCodingPassed] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [progress, setProgress] = useState<UserProgressState | null>(null);

  const { isLoading: pyLoading, loadingStatus, isRunning, runCode, initPyodide } = usePyodide();
  const submittedRef = useRef(false);
  submittedRef.current = submitted;

  useEffect(() => {
    setProgress(getProgress());
    const sync = () => setProgress(getProgress());
    window.addEventListener('ml_progress_updated', sync);
    return () => window.removeEventListener('ml_progress_updated', sync);
  }, []);

  const handleStart = (track: MockInterviewTrack) => {
    setActiveTrack(track);
    setSecondsLeft(track.durationMinutes * 60);
    setAnswers({});
    setCode(track.codingChallenge.starterCode);
    setTestOutput(null);
    setCodingPassed(false);
    setSubmitted(false);
    setShowSolution(false);
    initPyodide().catch(() => {});
  };

  const handleSubmitInterview = () => {
    if (!activeTrack || submittedRef.current) return;
    setSubmitted(true);
    const mcqScore = activeTrack.mcqs.reduce(
      (acc, q) => acc + (answers[q.id] === q.correctIndex ? 1 : 0),
      0
    );
    const totalPoints = activeTrack.mcqs.length + 1;
    const earnedPoints = mcqScore + (codingPassed ? 1 : 0);
    recordQuizScore(`mock-${activeTrack.id}`, earnedPoints, totalPoints);
    logStudyTime(Math.max(5, activeTrack.durationMinutes - Math.floor(secondsLeft / 60)));

    if (earnedPoints / totalPoints >= 0.7) {
      import('canvas-confetti')
        .then((m) => m.default({ particleCount: 100, spread: 75, origin: { y: 0.6 } }))
        .catch(() => {});
    }
  };

  useEffect(() => {
    if (!activeTrack || submitted) return;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitInterview();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [activeTrack, submitted]);

  const handleRunTests = async () => {
    if (!activeTrack) return;
    const fullScript = `${code}\n\n${activeTrack.codingChallenge.testHarness}`;
    const res = await runCode(fullScript);
    if (!res.error && res.stdout.includes(`ALL_TESTS_PASSED:${activeTrack.codingChallenge.testCount}/${activeTrack.codingChallenge.testCount}`)) {
      setCodingPassed(true);
      setTestOutput(`✅ All ${activeTrack.codingChallenge.testCount}/${activeTrack.codingChallenge.testCount} automated test cases passed! (${res.executionTimeMs}ms)`);
    } else {
      setCodingPassed(false);
      setTestOutput(res.error || res.stderr || res.stdout || 'Tests did not pass yet.');
    }
  };

  if (!activeTrack) {
    return (
      <div className="p-4 sm:p-8 max-w-6xl mx-auto space-y-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
            <Timer className="w-4 h-4" />
            <span>Timed Technical Interview Simulator</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Mock Interview &amp; Coding Challenge Mode
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
            Practice under real interview pressure: timed concept questions paired with a live Python coding challenge graded automatically by unit tests in your browser.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MOCK_INTERVIEW_TRACKS.map((track) => {
            const past = progress?.quizScores?.[`mock-${track.id}`];
            const pastPct = past && past.total > 0 ? Math.round((past.score / past.total) * 100) : null;

            return (
              <div
                key={track.id}
                className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-bold text-white bg-gradient-to-r ${track.accentColor}`}
                    >
                      {track.roleBadge}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-mono text-slate-500">
                      <Timer className="w-3.5 h-3.5" />
                      {track.durationMinutes} min
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                    {track.title}
                  </h2>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {track.description}
                  </p>

                  <div className="flex items-center gap-3 text-[11px] font-mono text-slate-500 pt-1">
                    <span>{track.mcqs.length} Theory Rounds</span>
                    <span>•</span>
                    <span>1 Live Coding Problem ({track.codingChallenge.testCount} tests)</span>
                    {pastPct !== null && (
                      <>
                        <span>•</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                          Last: {pastPct}%
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => handleStart(track)}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Start Timed Interview</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const mcqScore = activeTrack.mcqs.reduce(
    (acc, q) => acc + (answers[q.id] === q.correctIndex ? 1 : 0),
    0
  );
  const totalPoints = activeTrack.mcqs.length + 1;
  const earnedPoints = mcqScore + (codingPassed ? 1 : 0);
  const finalPct = Math.round((earnedPoints / totalPoints) * 100);

  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto space-y-8 pb-24">
      {/* Sticky Timer Bar */}
      <div className="sticky top-16 z-20 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block">
            {activeTrack.roleBadge}
          </span>
          <h1 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-slate-100">
            {activeTrack.title}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div
            className={`px-3 py-1.5 rounded-xl font-mono text-sm font-bold flex items-center gap-1.5 border ${
              secondsLeft < 180
                ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-600 dark:text-rose-400'
                : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100'
            }`}
          >
            <Timer className="w-4 h-4" />
            <span>{formatClock(secondsLeft)}</span>
          </div>

          {!submitted ? (
            <button
              onClick={handleSubmitInterview}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm"
            >
              Finish &amp; Grade
            </button>
          ) : (
            <button
              onClick={() => setActiveTrack(null)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>All Tracks</span>
            </button>
          )}
        </div>
      </div>

      {/* Results Banner */}
      {submitted && (
        <div
          className={`p-6 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
            finalPct >= 70
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100'
              : 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-100'
          }`}
        >
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl text-white ${finalPct >= 70 ? 'bg-emerald-600' : 'bg-amber-600'}`}>
              <Award className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider block">
                {finalPct >= 70 ? 'Strong Hire Signal' : 'Needs Review'}
              </span>
              <h2 className="text-2xl font-black">
                {earnedPoints} / {totalPoints} ({finalPct}%)
              </h2>
              <p className="text-xs opacity-90">
                Theory: {mcqScore}/{activeTrack.mcqs.length} · Coding Challenge: {codingPassed ? 'Passed' : 'Not Passed'}
              </p>
            </div>
          </div>

          <button
            onClick={() => handleStart(activeTrack)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-100"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake Round</span>
          </button>
        </div>
      )}

      {/* Part 1: Conceptual & System Design Questions */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-indigo-500" />
          <span>Part 1 · Conceptual &amp; Design Questions ({activeTrack.mcqs.length})</span>
        </h2>

        {activeTrack.mcqs.map((q, idx) => (
          <div
            key={q.id}
            className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4 shadow-sm"
          >
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Q{idx + 1} · {q.topic}</span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
              {q.question}
            </h3>

            <div className="space-y-2">
              {q.options.map((opt, optIdx) => {
                const isSelected = answers[q.id] === optIdx;
                const isCorrect = q.correctIndex === optIdx;
                let cls =
                  'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60';
                if (!submitted && isSelected) {
                  cls = 'border-indigo-500 bg-indigo-50/70 dark:bg-indigo-950/40';
                } else if (submitted && isCorrect) {
                  cls = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100';
                } else if (submitted && isSelected && !isCorrect) {
                  cls = 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-100';
                }

                return (
                  <button
                    key={optIdx}
                    disabled={submitted}
                    onClick={() => setAnswers((p) => ({ ...p, [q.id]: optIdx }))}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm flex items-center justify-between gap-2 transition-colors ${cls}`}
                  >
                    <span>{opt}</span>
                    {submitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
                    {submitted && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-500 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {submitted && (
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
                <strong className="text-indigo-600 dark:text-indigo-400">Interviewer Note: </strong>
                {q.explanation}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Part 2: Live Coding Challenge */}
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Code2 className="w-4 h-4 text-emerald-500" />
            <span>Part 2 · Live Coding Challenge ({activeTrack.codingChallenge.testCount} Automated Tests)</span>
          </h2>
          {codingPassed && (
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/30">
              ✓ Automated Tests Passed
            </span>
          )}
        </div>

        <div className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4 shadow-sm">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              {activeTrack.codingChallenge.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
              {activeTrack.codingChallenge.prompt}
            </p>
          </div>

          <div className="rounded-xl overflow-hidden border border-slate-800">
            <MonacoEditor
              height="240px"
              defaultLanguage="python"
              theme="vs-dark"
              value={code}
              onChange={(v) => setCode(v ?? '')}
              options={{
                minimap: { enabled: false },
                fontSize: 13,
                scrollBeyondLastLine: false,
                automaticLayout: true,
              }}
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={handleRunTests}
                disabled={isRunning || pyLoading}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white text-xs font-bold"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>
                  {pyLoading
                    ? loadingStatus || 'Loading Python...'
                    : isRunning
                    ? 'Running Tests...'
                    : `Run ${activeTrack.codingChallenge.testCount} Automated Tests`}
                </span>
              </button>

              {submitted && (
                <button
                  onClick={() => setShowSolution((s) => !s)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>{showSolution ? 'Hide Reference Solution' : 'View Reference Solution'}</span>
                </button>
              )}
            </div>
          </div>

          {testOutput && (
            <pre
              className={`p-3.5 rounded-xl font-mono text-xs whitespace-pre-wrap border ${
                codingPassed
                  ? 'bg-emerald-950/30 border-emerald-700/50 text-emerald-300'
                  : 'bg-slate-950 border-slate-800 text-amber-300'
              }`}
            >
              {testOutput}
            </pre>
          )}

          {submitted && showSolution && (
            <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-mono text-xs overflow-x-auto">
              {activeTrack.codingChallenge.sampleSolution}
            </pre>
          )}
        </div>
      </div>

      <AITutorPanel
        track={activeTrack.id === 'dsa-round' ? 'dsa' : activeTrack.id === 'python-backend' ? 'python' : 'ml'}
        moduleId={`mock-${activeTrack.id}`}
        lessonId={activeTrack.codingChallenge.id}
        lessonTitle={activeTrack.title}
        language="python"
        codeSnippet={code}
      />
    </div>
  );
}
