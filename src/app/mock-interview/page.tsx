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
  Sliders,
  Infinity as InfinityIcon,
  Loader2,
  Trash2,
} from 'lucide-react';
import {
  CODING_CHALLENGES_BANK,
  generateProceduralMCQs,
  InterviewCodingChallenge,
  InterviewDifficulty,
  InterviewDifficultyFilter,
  InterviewTrackId,
  MOCK_INTERVIEW_TRACKS,
  MockInterviewTrack,
  TRACK_METADATA,
} from '@/data/mockInterviews';
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

const SEEN_STORAGE_KEY = 'ml_mock_seen_ids_v1';

interface RoundConfig {
  trackId: InterviewTrackId;
  difficulty: InterviewDifficultyFilter;
  questionCount: number;
  codingCount: number;
  durationMinutes: number;
  useAI: boolean;
}

const DEFAULT_CONFIG: RoundConfig = {
  trackId: 'ml-engineer',
  difficulty: 'Mixed',
  questionCount: 10,
  codingCount: 1,
  durationMinutes: 20,
  useAI: true,
};

function formatClock(totalSeconds: number): string {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function difficultyBadgeClass(diff: InterviewDifficulty): string {
  switch (diff) {
    case 'Beginner':
      return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    case 'Intermediate':
      return 'bg-amber-100 text-amber-700 border-amber-200';
    case 'Advanced':
      return 'bg-rose-100 text-rose-700 border-rose-200';
  }
}

function loadSeenIds(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(SEEN_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === 'string') : [];
  } catch {
    return [];
  }
}

function saveSeenIds(ids: string[]): string[] {
  const deduped = Array.from(new Set(ids)).slice(-500);
  try {
    localStorage.setItem(SEEN_STORAGE_KEY, JSON.stringify(deduped));
  } catch {
    // Ignore storage quota errors
  }
  return deduped;
}

function buildLocalFallbackRound(config: RoundConfig, seenIds: string[]): MockInterviewTrack {
  const excludeSet = new Set(seenIds);
  const poolMcqs = MOCK_INTERVIEW_TRACKS.filter(
    (t) => config.trackId === 'mixed' || t.id === config.trackId
  )
    .flatMap((t) => t.mcqs)
    .filter(
      (q) =>
        !excludeSet.has(q.id) &&
        (config.difficulty === 'Mixed' || q.difficulty === config.difficulty)
    );

  const chosenBank = poolMcqs.slice(0, config.questionCount);
  const neededProc = Math.max(0, config.questionCount - chosenBank.length);
  const procMcqs = generateProceduralMCQs(config.trackId, config.difficulty, neededProc);
  const mcqs = [...chosenBank, ...procMcqs].slice(0, config.questionCount);

  const codingPool = CODING_CHALLENGES_BANK.filter(
    (c) =>
      (config.trackId === 'mixed' || c.trackId === config.trackId) &&
      (config.difficulty === 'Mixed' || c.difficulty === config.difficulty)
  );
  const codingFallback =
    codingPool.length > 0
      ? codingPool
      : CODING_CHALLENGES_BANK.filter(
          (c) => config.trackId === 'mixed' || c.trackId === config.trackId
        );
  const codingChallenges = codingFallback.slice(0, config.codingCount);
  const meta = TRACK_METADATA[config.trackId];

  return {
    id: `local-${config.trackId}-${Date.now().toString(36)}`,
    title: meta.title,
    roleBadge: meta.roleBadge,
    durationMinutes: config.durationMinutes,
    description: meta.description,
    accentColor: meta.accentColor,
    mcqs,
    codingChallenge: codingChallenges[0] || CODING_CHALLENGES_BANK[0],
    codingChallenges,
    roundDifficulty: config.difficulty,
    sourceBreakdown: {
      ai: 0,
      procedural: procMcqs.length,
      bank: chosenBank.length,
    },
  };
}

export default function MockInterviewPage() {
  const [config, setConfig] = useState<RoundConfig>(DEFAULT_CONFIG);
  const [activeTrack, setActiveTrack] = useState<MockInterviewTrack | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [seenIds, setSeenIds] = useState<string[]>([]);
  const [secondsLeft, setSecondsLeft] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  // Per-challenge coding state (supports 0..3 coding challenges per round)
  const [activeChallengeIdx, setActiveChallengeIdx] = useState<number>(0);
  const [codeByChallenge, setCodeByChallenge] = useState<Record<string, string>>({});
  const [outputByChallenge, setOutputByChallenge] = useState<Record<string, string>>({});
  const [passedByChallenge, setPassedByChallenge] = useState<Record<string, boolean>>({});
  const [solutionOpenByChallenge, setSolutionOpenByChallenge] = useState<Record<string, boolean>>({});
  const [runningChallengeId, setRunningChallengeId] = useState<string | null>(null);

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [progress, setProgress] = useState<UserProgressState | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const autoSubmitRef = useRef<boolean>(false);

  const { runCode, isLoading: pyodideLoading } = usePyodide();

  useEffect(() => {
    setProgress(getProgress());
    setSeenIds(loadSeenIds());
  }, []);

  // Countdown Timer
  useEffect(() => {
    if (!activeTrack || submitted) return;
    if (secondsLeft <= 0) {
      if (!autoSubmitRef.current) {
        autoSubmitRef.current = true;
        handleSubmitInterview();
      }
      return;
    }
    const timer = setInterval(() => {
      setSecondsLeft((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [activeTrack, submitted, secondsLeft]);

  const initializeRound = (round: MockInterviewTrack) => {
    const challenges =
      round.codingChallenges ?? (round.codingChallenge ? [round.codingChallenge] : []);
    const initialCode: Record<string, string> = {};
    for (const ch of challenges) {
      initialCode[ch.id] = ch.starterCode;
    }

    autoSubmitRef.current = false;
    setActiveTrack(round);
    setSecondsLeft(round.durationMinutes * 60);
    setAnswers({});
    setActiveChallengeIdx(0);
    setCodeByChallenge(initialCode);
    setOutputByChallenge({});
    setPassedByChallenge({});
    setSolutionOpenByChallenge({});
    setSubmitted(false);
    startTimeRef.current = Date.now();
  };

  const handleStartCustomRound = async (overrideConfig?: Partial<RoundConfig>) => {
    const effective = { ...config, ...overrideConfig };
    if (overrideConfig) setConfig(effective);

    setIsGenerating(true);
    try {
      const res = await fetch('/api/mock-interview/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          trackId: effective.trackId,
          difficulty: effective.difficulty,
          questionCount: effective.questionCount,
          codingCount: effective.codingCount,
          durationMinutes: effective.durationMinutes,
          excludeIds: seenIds,
          useAI: effective.useAI,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data?.round) {
          initializeRound(data.round);
          return;
        }
      }

      // Client-side procedural + curated fallback if API unavailable or offline
      initializeRound(buildLocalFallbackRound(effective, seenIds));
    } catch {
      initializeRound(buildLocalFallbackRound(effective, seenIds));
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRunCodingTests = async (challenge: InterviewCodingChallenge) => {
    if (!activeTrack) return;
    setRunningChallengeId(challenge.id);
    setOutputByChallenge((prev) => ({
      ...prev,
      [challenge.id]: 'Running Python automated test harness...',
    }));

    const userCode = codeByChallenge[challenge.id] ?? challenge.starterCode;
    const fullScript = `${userCode}\n\n${challenge.testHarness}`;
    const res = await runCode(fullScript);

    if (res.error) {
      setOutputByChallenge((prev) => ({
        ...prev,
        [challenge.id]: `Error:\n${res.error}\n${res.stderr}`,
      }));
      setPassedByChallenge((prev) => ({ ...prev, [challenge.id]: false }));
    } else {
      const out = (res.stdout || '').trim();
      const passedAll = out.includes(`ALL_TESTS_PASSED:${challenge.testCount}/${challenge.testCount}`);
      setOutputByChallenge((prev) => ({
        ...prev,
        [challenge.id]: out || '(No output)',
      }));
      setPassedByChallenge((prev) => ({ ...prev, [challenge.id]: passedAll }));
    }
    setRunningChallengeId(null);
  };

  const handleSubmitInterview = () => {
    if (!activeTrack || submitted) return;
    setSubmitted(true);

    const mcqCorrect = activeTrack.mcqs.filter(
      (q) => answers[q.id] === q.correctIndex
    ).length;
    const mcqPct =
      activeTrack.mcqs.length > 0 ? (mcqCorrect / activeTrack.mcqs.length) * 100 : 100;

    const challenges = activeTrack.codingChallenges ?? [];
    const passedCount = challenges.filter((c) => passedByChallenge[c.id]).length;
    const codingPct = challenges.length > 0 ? (passedCount / challenges.length) * 100 : 100;

    const finalScore =
      challenges.length > 0 && activeTrack.mcqs.length > 0
        ? Math.round(mcqPct * 0.6 + codingPct * 0.4)
        : challenges.length > 0
          ? Math.round(codingPct)
          : Math.round(mcqPct);

    const elapsedMinutes = Math.max(1, Math.round((Date.now() - startTimeRef.current) / 60000));
    logStudyTime(elapsedMinutes);
    recordQuizScore(`mock-${config.trackId}`, finalScore, 100);
    setProgress(getProgress());

    // Record seen IDs so future rounds serve brand-new questions
    const newlySeen = [
      ...activeTrack.mcqs.map((q) => q.id),
      ...challenges.map((c) => c.id),
    ];
    setSeenIds((prev) => saveSeenIds([...prev, ...newlySeen]));
  };

  const handleClearHistory = () => {
    try {
      localStorage.removeItem(SEEN_STORAGE_KEY);
    } catch {
      // Ignore
    }
    setSeenIds([]);
  };

  // =========================================================================
  // LOBBY / ROUND CONFIGURATION VIEW
  // =========================================================================
  if (!activeTrack) {
    const trackEntries = Object.entries(TRACK_METADATA) as Array<
      [InterviewTrackId, (typeof TRACK_METADATA)[InterviewTrackId]]
    >;

    return (
      <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-4">
              <InfinityIcon className="w-4 h-4" />
              Unlimited Mock Interview Simulator
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
              Customize & Practice Unlimited Technical Interviews
            </h1>
            <p className="text-slate-600">
              Choose your role track, difficulty, number of questions, coding problems, and timer.
              Every round mixes fresh procedural math/code problems, 200+ curated concept banks, and
              optional AI-crafted scenarios so you never run out of practice.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Track Picker */}
            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                  1. Select Interview Track
                </h2>
                {seenIds.length > 0 && (
                  <button
                    onClick={handleClearHistory}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-rose-600 transition-colors"
                    title="Reset seen-question history"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    {seenIds.length} seen problems (Reset)
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {trackEntries.map(([id, meta]) => {
                  const selected = config.trackId === id;
                  const scoreEntry = progress?.quizScores[`mock-${id}`];
                  const bestScore =
                    scoreEntry && scoreEntry.total > 0
                      ? Math.round((scoreEntry.score / scoreEntry.total) * 100)
                      : undefined;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setConfig((prev) => ({ ...prev, trackId: id }))}
                      className={`text-left rounded-2xl border-2 p-5 transition-all flex flex-col justify-between bg-white ${
                        selected
                          ? 'border-indigo-600 ring-4 ring-indigo-50 shadow-md'
                          : 'border-slate-200 hover:border-slate-300 shadow-sm'
                      } ${id === 'mixed' ? 'sm:col-span-2' : ''}`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2.5">
                          <span
                            className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-gradient-to-r ${meta.accentColor} text-white`}
                          >
                            {meta.roleBadge}
                          </span>
                          {bestScore !== undefined && (
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                              <Award className="w-3 h-3" /> {bestScore}%
                            </span>
                          )}
                        </div>
                        <h3 className="text-base font-bold text-slate-900 mb-1">{meta.title}</h3>
                        <p className="text-xs text-slate-600 leading-relaxed">{meta.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Controls Panel */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <Sliders className="w-4 h-4 text-indigo-600" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
                  2. Configure Round Parameters
                </h2>
              </div>

              {/* Difficulty */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Difficulty Level
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(['Mixed', 'Beginner', 'Intermediate', 'Advanced'] as InterviewDifficultyFilter[]).map(
                    (diff) => (
                      <button
                        key={diff}
                        type="button"
                        onClick={() => setConfig((prev) => ({ ...prev, difficulty: diff }))}
                        className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all ${
                          config.difficulty === diff
                            ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {diff}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Number of Theory Questions */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-700">
                    Number of Questions (1–30)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={30}
                    value={config.questionCount}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        questionCount: Math.max(1, Math.min(30, Number(e.target.value) || 1)),
                      }))
                    }
                    className="w-16 text-center text-xs font-bold py-1 px-2 rounded-lg border border-slate-300 text-slate-900"
                  />
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {[3, 5, 10, 15, 25].map((cnt) => (
                    <button
                      key={cnt}
                      type="button"
                      onClick={() => setConfig((prev) => ({ ...prev, questionCount: cnt }))}
                      className={`py-1.5 rounded-lg text-xs font-bold border transition-all ${
                        config.questionCount === cnt
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {cnt} Qs
                    </button>
                  ))}
                </div>
              </div>

              {/* Live Coding Challenges */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Live Python Coding Challenges
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[0, 1, 2, 3].map((cnt) => (
                    <button
                      key={cnt}
                      type="button"
                      onClick={() => setConfig((prev) => ({ ...prev, codingCount: cnt }))}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                        config.codingCount === cnt
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {cnt === 0 ? 'None' : `${cnt} Problem${cnt > 1 ? 's' : ''}`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Limit */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-700">
                    Timer Limit (Minutes)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={120}
                    value={config.durationMinutes}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        durationMinutes: Math.max(1, Math.min(120, Number(e.target.value) || 5)),
                      }))
                    }
                    className="w-16 text-center text-xs font-bold py-1 px-2 rounded-lg border border-slate-300 text-slate-900"
                  />
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {[5, 10, 20, 30, 45].map((mins) => (
                    <button
                      key={mins}
                      type="button"
                      onClick={() => setConfig((prev) => ({ ...prev, durationMinutes: mins }))}
                      className={`py-1.5 rounded-lg text-xs font-bold border transition-all ${
                        config.durationMinutes === mins
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {mins}m
                    </button>
                  ))}
                </div>
              </div>

              {/* AI Generation Toggle */}
              <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-indigo-50/70 border border-indigo-100">
                <div>
                  <p className="text-xs font-bold text-indigo-950 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                    AI-Crafted Fresh Questions
                  </p>
                  <p className="text-[11px] text-indigo-700">
                    Synthesizes unique interview questions on the fly alongside procedural math &
                    bank questions.
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={config.useAI}
                  onClick={() => setConfig((prev) => ({ ...prev, useAI: !prev.useAI }))}
                  className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
                    config.useAI ? 'bg-indigo-600' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      config.useAI ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <button
                type="button"
                disabled={isGenerating}
                onClick={() => handleStartCustomRound()}
                className="w-full py-3.5 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating Fresh Interview Round...
                  </>
                ) : (
                  <>
                    Start Custom Interview ({config.questionCount} Qs
                    {config.codingCount > 0 ? ` + ${config.codingCount} Code` : ''},{' '}
                    {config.durationMinutes}m)
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // ACTIVE INTERVIEW SIMULATOR VIEW
  // =========================================================================
  const challenges =
    activeTrack.codingChallenges ??
    (activeTrack.codingChallenge ? [activeTrack.codingChallenge] : []);
  const activeChallenge = challenges[activeChallengeIdx] || challenges[0] || null;

  const mcqCorrect = activeTrack.mcqs.filter((q) => answers[q.id] === q.correctIndex).length;
  const mcqPct =
    activeTrack.mcqs.length > 0 ? (mcqCorrect / activeTrack.mcqs.length) * 100 : 100;
  const passedChallenges = challenges.filter((c) => passedByChallenge[c.id]).length;
  const codingPct = challenges.length > 0 ? (passedChallenges / challenges.length) * 100 : 100;
  const finalScore =
    challenges.length > 0 && activeTrack.mcqs.length > 0
      ? Math.round(mcqPct * 0.6 + codingPct * 0.4)
      : challenges.length > 0
        ? Math.round(codingPct)
        : Math.round(mcqPct);

  const urgentTimer = secondsLeft < 180 && !submitted;

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Sticky Interview Timer Header */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200 px-4 sm:px-6 py-3">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                {activeTrack.roleBadge}
              </span>
              {activeTrack.roundDifficulty && (
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                  {activeTrack.roundDifficulty}
                </span>
              )}
              {activeTrack.sourceBreakdown && (
                <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
                  {activeTrack.sourceBreakdown.ai > 0 && (
                    <span className="px-1.5 py-0.5 rounded bg-violet-50 text-violet-700 border border-violet-200">
                      {activeTrack.sourceBreakdown.ai} AI
                    </span>
                  )}
                  {activeTrack.sourceBreakdown.procedural > 0 && (
                    <span className="px-1.5 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200">
                      {activeTrack.sourceBreakdown.procedural} Procedural
                    </span>
                  )}
                  {activeTrack.sourceBreakdown.bank > 0 && (
                    <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                      {activeTrack.sourceBreakdown.bank} Bank
                    </span>
                  )}
                </span>
              )}
            </div>
            <h1 className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">
              {activeTrack.title}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-sm font-bold border ${
                urgentTimer
                  ? 'bg-rose-50 text-rose-700 border-rose-300 animate-pulse'
                  : 'bg-slate-100 text-slate-800 border-slate-200'
              }`}
            >
              <Timer className="w-4 h-4" />
              {formatClock(secondsLeft)}
            </div>

            <button
              onClick={() => setActiveTrack(null)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100"
            >
              Configure
            </button>

            {!submitted && (
              <button
                onClick={handleSubmitInterview}
                className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold shadow-sm transition-colors"
              >
                Submit Round
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        {/* Post-Submission Results Card */}
        {submitted && (
          <div className="bg-white rounded-2xl border-2 border-indigo-500 shadow-lg p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
                <ShieldCheck className="w-4 h-4" /> Evaluation Complete
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900">
                Interview Score: {finalScore}%
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Theory MCQs: <strong>{mcqCorrect}/{activeTrack.mcqs.length}</strong>
                {challenges.length > 0 && (
                  <>
                    {' • '}Live Coding:{' '}
                    <strong>
                      {passedChallenges}/{challenges.length} passed
                    </strong>
                  </>
                )}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                disabled={isGenerating}
                onClick={() => handleStartCustomRound()}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white text-sm font-bold shadow-sm"
              >
                {isGenerating ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
                Next Fresh Round (Unlimited)
              </button>
              <button
                type="button"
                onClick={() => initializeRound(activeTrack)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-semibold"
              >
                <RotateCcw className="w-4 h-4" /> Retry Same Questions
              </button>
              <button
                type="button"
                onClick={() => setActiveTrack(null)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-semibold"
              >
                Change Config
              </button>
            </div>
          </div>
        )}

        {/* Section 1: Theory & Architecture MCQs */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            Part 1: Technical Concepts & Scenarios ({activeTrack.mcqs.length} Questions)
          </h2>

          <div className="grid grid-cols-1 gap-4">
            {activeTrack.mcqs.map((q, idx) => {
              const chosen = answers[q.id];
              return (
                <div
                  key={q.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm"
                >
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                      Q{idx + 1} · {q.topic}
                    </span>
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded border ${difficultyBadgeClass(
                        q.difficulty
                      )}`}
                    >
                      {q.difficulty}
                    </span>
                    {q.source && (
                      <span className="text-[11px] font-medium text-slate-400 uppercase">
                        {q.source}
                      </span>
                    )}
                  </div>
                  <p className="font-semibold text-slate-900 mb-4 whitespace-pre-line">
                    {q.question}
                  </p>

                  <div className="space-y-2">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = chosen === optIdx;
                      const isCorrect = q.correctIndex === optIdx;

                      let btnStyle = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800';
                      if (submitted) {
                        if (isCorrect) {
                          btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-medium';
                        } else if (isSelected && !isCorrect) {
                          btnStyle = 'border-rose-400 bg-rose-50 text-rose-900';
                        }
                      } else if (isSelected) {
                        btnStyle = 'border-indigo-600 bg-indigo-50 text-indigo-900 font-medium';
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={submitted}
                          onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: optIdx }))}
                          className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all flex items-center justify-between gap-3 ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {submitted && isCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          )}
                          {submitted && isSelected && !isCorrect && (
                            <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {submitted && (
                    <div className="mt-4 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-700">
                      <strong className="text-slate-900">Interviewer Note:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 2: Live Coding Sandbox(es) */}
        {challenges.length > 0 && activeChallenge && (
          <section className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Code2 className="w-5 h-5 text-indigo-600" />
                Part 2: Live Coding Challenge{challenges.length > 1 ? 's' : ''} ({challenges.length})
              </h2>

              {challenges.length > 1 && (
                <div className="flex flex-wrap items-center gap-2">
                  {challenges.map((ch, idx) => {
                    const passed = passedByChallenge[ch.id];
                    const selected = idx === activeChallengeIdx;
                    return (
                      <button
                        key={ch.id}
                        type="button"
                        onClick={() => setActiveChallengeIdx(idx)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                          selected
                            ? 'bg-slate-900 text-white border-slate-900'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        Problem {idx + 1}
                        {passed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-5 sm:p-6 border-b border-slate-200">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900">{activeChallenge.title}</h3>
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded border ${difficultyBadgeClass(
                        activeChallenge.difficulty
                      )}`}
                    >
                      {activeChallenge.difficulty}
                    </span>
                  </div>
                  {passedByChallenge[activeChallenge.id] && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                      <CheckCircle2 className="w-4 h-4" /> All {activeChallenge.testCount} Tests
                      Passed
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-600">{activeChallenge.prompt}</p>
              </div>

              <div className="border-b border-slate-200">
                <MonacoEditor
                  height="300px"
                  defaultLanguage="python"
                  theme="vs-dark"
                  value={codeByChallenge[activeChallenge.id] ?? activeChallenge.starterCode}
                  onChange={(val) =>
                    setCodeByChallenge((prev) => ({
                      ...prev,
                      [activeChallenge.id]: val ?? '',
                    }))
                  }
                  options={{
                    minimap: { enabled: false },
                    fontSize: 13,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    padding: { top: 14 },
                  }}
                />
              </div>

              <div className="p-4 bg-slate-950 text-slate-200 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleRunCodingTests(activeChallenge)}
                    disabled={runningChallengeId === activeChallenge.id || pyodideLoading}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs sm:text-sm font-bold transition-colors"
                  >
                    <Play className="w-4 h-4" />
                    {pyodideLoading
                      ? 'Loading Python Engine...'
                      : runningChallengeId === activeChallenge.id
                        ? 'Running Tests...'
                        : 'Run Automated Tests'}
                  </button>

                  {submitted && (
                    <button
                      onClick={() =>
                        setSolutionOpenByChallenge((prev) => ({
                          ...prev,
                          [activeChallenge.id]: !prev[activeChallenge.id],
                        }))
                      }
                      className="text-xs font-semibold text-indigo-300 hover:text-indigo-200 underline"
                    >
                      {solutionOpenByChallenge[activeChallenge.id]
                        ? 'Hide Reference Solution'
                        : 'Show Reference Solution'}
                    </button>
                  )}
                </div>

                <span className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" /> Pyodide Automated Verifier
                </span>
              </div>

              {outputByChallenge[activeChallenge.id] && (
                <div className="p-4 bg-slate-900 border-t border-slate-800 font-mono text-xs text-emerald-300 whitespace-pre-wrap">
                  {outputByChallenge[activeChallenge.id]}
                </div>
              )}

              {submitted && solutionOpenByChallenge[activeChallenge.id] && (
                <div className="p-4 bg-indigo-950/90 border-t border-indigo-900 text-indigo-100">
                  <p className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-2">
                    Reference Solution
                  </p>
                  <pre className="text-xs font-mono overflow-x-auto">
                    {activeChallenge.sampleSolution}
                  </pre>
                </div>
              )}
            </div>
          </section>
        )}
      </div>

      {/* Built-in AI Tutor Sidekick (collapsed by default) */}
      <AITutorPanel
        track={
          config.trackId === 'dsa-round'
            ? 'dsa'
            : config.trackId === 'python-backend'
              ? 'python'
              : 'ml'
        }
        lessonId={activeChallenge?.id || activeTrack.id}
        lessonTitle={activeChallenge?.title || activeTrack.title}
        codeSnippet={activeChallenge ? codeByChallenge[activeChallenge.id] : ''}
        defaultOpen={false}
      />
    </div>
  );
}
