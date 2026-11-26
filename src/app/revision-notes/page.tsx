'use client';

import React, { useState, useEffect, useMemo, useCallback, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  RevisionSubject,
  RevisionTopic,
  RevisionFilterOptions,
} from '@/data/revision/types';
import { REVISION_SUBJECTS } from '@/data/revision/categories';
import { PLANNED_REVISION_TOPICS } from '@/data/revision/plannedTopics';
import { loadRevisionSubjectTopics } from '@/data/revision/loader';
import {
  getRevisionState,
  toggleTopicBookmark,
  toggleTopicRevised,
  recordTopicViewed,
  setExamMode,
  setQuickReviewMode,
  RevisionStorageState,
} from '@/lib/revisionStorage';
import { SubjectCard } from '@/components/revision/SubjectCard';
import { TopicSidebar } from '@/components/revision/TopicSidebar';
import { QuickRecall } from '@/components/revision/QuickRecall';
import { RevisionControls } from '@/components/revision/RevisionControls';
import {
  Zap,
  Sparkles,
  CheckCircle2,
  Clock,
} from 'lucide-react';

const VisualDiagram = dynamic(
  () => import('@/components/revision/VisualDiagram').then((m) => m.VisualDiagram),
  { ssr: false }
);
const AnimatedVisualizer = dynamic(
  () => import('@/components/revision/AnimatedVisualizer').then((m) => m.AnimatedVisualizer),
  { ssr: false }
);
const LightweightQuiz = dynamic(
  () => import('@/components/revision/LightweightQuiz').then((m) => m.LightweightQuiz),
  { ssr: false }
);
const PracticalCodeCard = dynamic(
  () => import('@/components/revision/PracticalCodeCard').then((m) => m.PracticalCodeCard),
  { ssr: false }
);
const KeyboardShortcutsModal = dynamic(
  () => import('@/components/revision/KeyboardShortcutsModal').then((m) => m.KeyboardShortcutsModal),
  { ssr: false }
);

const ALL_SUBJECTS: RevisionSubject[] = ['ml', 'python', 'java', 'dsa'];

function filterSubjectTopics(
  topics: RevisionTopic[],
  filters: RevisionFilterOptions,
  bookmarkedIds: string[] = [],
  revisedIds: string[] = []
): RevisionTopic[] {
  return topics.filter((t) => {
    if (filters.subject !== 'all' && t.subject !== filters.subject) return false;
    if (filters.category && filters.category !== 'All' && t.category !== filters.category) return false;
    if (filters.difficulty !== 'all' && t.difficulty !== filters.difficulty) return false;
    if (filters.isInterviewFavoriteOnly && !t.isInterviewFavorite) return false;
    if (filters.status === 'bookmarked' && !bookmarkedIds.includes(t.id)) return false;
    if (filters.status === 'revised' && !revisedIds.includes(t.id)) return false;

    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase();
      const match =
        t.title.toLowerCase().includes(q) ||
        t.subtitle.toLowerCase().includes(q) ||
        t.quickRecall.oneLiner.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q)) ||
        t.category.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });
}

function RevisionNotesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [storageState, setStorageState] = useState<RevisionStorageState>({
    revisionStatus: {},
    bookmarks: [],
    lastReviewed: {},
    recentTopicIds: [],
    quizScores: {},
    examModeEnabled: false,
    quickReviewModeEnabled: false,
  });

  const [topicsBySubject, setTopicsBySubject] = useState<Partial<Record<RevisionSubject, RevisionTopic[]>>>({});
  const [activeSubject, setActiveSubject] = useState<RevisionSubject>('ml');
  const [activeTopicId, setActiveTopicId] = useState<string | null>(null);
  const [shortcutsModalOpen, setShortcutsModalOpen] = useState<boolean>(false);

  const [filters, setFilters] = useState<RevisionFilterOptions>({
    subject: 'ml',
    searchQuery: '',
    category: 'All',
    difficulty: 'all',
    isInterviewFavoriteOnly: false,
    status: 'all',
  });

  // Sync storage on mount and when event fires
  const syncStorage = useCallback(() => {
    setStorageState(getRevisionState());
  }, []);

  useEffect(() => {
    syncStorage();
    window.addEventListener('ml_revision_updated', syncStorage);
    return () => window.removeEventListener('ml_revision_updated', syncStorage);
  }, [syncStorage]);

  // Load active subject first, then warm remaining subjects asynchronously
  useEffect(() => {
    let cancelled = false;

    loadRevisionSubjectTopics(activeSubject).then((topics) => {
      if (!cancelled) {
        setTopicsBySubject((prev) => ({ ...prev, [activeSubject]: topics }));
      }
    });

    const timer = setTimeout(() => {
      ALL_SUBJECTS.filter((s) => s !== activeSubject).forEach((subj) => {
        loadRevisionSubjectTopics(subj).then((topics) => {
          if (!cancelled) {
            setTopicsBySubject((prev) => (prev[subj] ? prev : { ...prev, [subj]: topics }));
          }
        });
      });
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [activeSubject]);

  const allLoadedTopics = useMemo(() => {
    return ALL_SUBJECTS.flatMap((s) => topicsBySubject[s] || []);
  }, [topicsBySubject]);

  const findTopicById = useCallback(
    (id: string): RevisionTopic | undefined => {
      return allLoadedTopics.find((t) => t.id === id);
    },
    [allLoadedTopics]
  );

  // Read URL query parameters on load
  useEffect(() => {
    const subjParam = searchParams.get('subject') as RevisionSubject | null;
    const topicParam = searchParams.get('topic');

    if (subjParam && REVISION_SUBJECTS[subjParam]) {
      setActiveSubject(subjParam);
      setFilters((prev) => ({ ...prev, subject: subjParam }));
    }

    if (topicParam) {
      const topic = findTopicById(topicParam);
      if (topic) {
        setActiveTopicId(topic.id);
        setActiveSubject(topic.subject);
        setFilters((prev) => ({ ...prev, subject: topic.subject }));
        recordTopicViewed(topic.id);
      } else {
        setActiveTopicId(topicParam);
      }
    } else {
      setActiveTopicId(null);
    }
  }, [searchParams, findTopicById]);

  const activeTopic = useMemo(() => {
    if (!activeTopicId) return null;
    return findTopicById(activeTopicId) || null;
  }, [activeTopicId, findTopicById]);

  const subjectTopics = useMemo(() => {
    return topicsBySubject[activeSubject] || [];
  }, [topicsBySubject, activeSubject]);

  const subjectPlanned = useMemo(() => {
    return PLANNED_REVISION_TOPICS.filter((t) => t.subject === activeSubject);
  }, [activeSubject]);

  const revisedIds = useMemo(
    () =>
      Object.keys(storageState.revisionStatus).filter(
        (id) => storageState.revisionStatus[id] === 'revised'
      ),
    [storageState.revisionStatus]
  );

  const filteredTopics = useMemo(() => {
    return filterSubjectTopics(
      subjectTopics,
      filters,
      storageState.bookmarks,
      revisedIds
    );
  }, [subjectTopics, filters, storageState.bookmarks, revisedIds]);

  const totalNotesCount = allLoadedTopics.length;
  const totalRevisedCount = revisedIds.length;
  const overallPercentage =
    totalNotesCount > 0 ? Math.round((totalRevisedCount / totalNotesCount) * 100) : 0;

  const recentTopics = useMemo(() => {
    return storageState.recentTopicIds
      .map((id) => findTopicById(id))
      .filter((t): t is RevisionTopic => Boolean(t))
      .slice(0, 5);
  }, [storageState.recentTopicIds, findTopicById]);

  const getStatsForSubject = useCallback(
    (subj: RevisionSubject) => {
      const list = topicsBySubject[subj] || [];
      const total = list.length;
      const revised = list.filter((t) => revisedIds.includes(t.id)).length;
      const bookmarked = list.filter((t) => storageState.bookmarks.includes(t.id)).length;
      return {
        total,
        revised,
        bookmarked,
        percentage: total > 0 ? Math.round((revised / total) * 100) : 0,
      };
    },
    [topicsBySubject, revisedIds, storageState.bookmarks]
  );

  const handleSelectTopic = (topicId: string) => {
    const topic = findTopicById(topicId);
    if (!topic) return;
    setActiveTopicId(topic.id);
    setActiveSubject(topic.subject);
    recordTopicViewed(topic.id);
    router.push(`/revision-notes?subject=${topic.subject}&topic=${topic.id}`);
  };

  const handleSelectSubject = async (subject: RevisionSubject) => {
    setActiveSubject(subject);
    setFilters((prev) => ({ ...prev, subject, category: 'All' }));
    const topics = await loadRevisionSubjectTopics(subject);
    setTopicsBySubject((prev) => ({ ...prev, [subject]: topics }));
    const firstTopic = topics[0];
    if (firstTopic) {
      setActiveTopicId(firstTopic.id);
      recordTopicViewed(firstTopic.id);
      router.push(`/revision-notes?subject=${firstTopic.subject}&topic=${firstTopic.id}`);
    }
  };

  const currentTopicIndex = useMemo(() => {
    if (!activeTopicId) return -1;
    return filteredTopics.findIndex((t) => t.id === activeTopicId);
  }, [filteredTopics, activeTopicId]);

  const hasPrevious = currentTopicIndex > 0;
  const hasNext = currentTopicIndex >= 0 && currentTopicIndex < filteredTopics.length - 1;

  const handlePreviousTopic = () => {
    if (hasPrevious) {
      handleSelectTopic(filteredTopics[currentTopicIndex - 1].id);
    }
  };

  const handleNextTopic = () => {
    if (hasNext) {
      handleSelectTopic(filteredTopics[currentTopicIndex + 1].id);
    }
  };

  const handleRandomTopic = () => {
    const pool = filteredTopics.length > 0 ? filteredTopics : subjectTopics;
    if (pool.length === 0) return;
    const randomIndex = Math.floor(Math.random() * pool.length);
    handleSelectTopic(pool[randomIndex].id);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === 'j' || e.key === '[') {
        e.preventDefault();
        handlePreviousTopic();
      } else if (e.key === 'k' || e.key === ']') {
        e.preventDefault();
        handleNextTopic();
      } else if (e.key === 'b' || e.key === 'B') {
        e.preventDefault();
        if (activeTopicId) toggleTopicBookmark(activeTopicId);
      } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        if (activeTopicId) toggleTopicRevised(activeTopicId);
      } else if (e.key === 'e' || e.key === 'E') {
        e.preventDefault();
        setExamMode(!storageState.examModeEnabled);
      } else if (e.key === 'q' || e.key === 'Q') {
        e.preventDefault();
        setQuickReviewMode(!storageState.quickReviewModeEnabled);
      } else if (e.key === 's' || e.key === 'S') {
        e.preventDefault();
        handleRandomTopic();
      } else if (e.key === '?') {
        e.preventDefault();
        setShortcutsModalOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    activeTopicId,
    currentTopicIndex,
    filteredTopics,
    storageState.examModeEnabled,
    storageState.quickReviewModeEnabled,
  ]);

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex flex-col bg-slate-950 text-slate-100">
      {/* Top Banner / Subject Switcher Bar */}
      <div className="border-b border-slate-800 bg-slate-900/90 backdrop-blur px-4 sm:px-6 py-2.5 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 via-purple-600 to-amber-500 flex items-center justify-center text-white shadow-sm">
            <Zap className="w-4 h-4 fill-current" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-extrabold tracking-tight text-white">
                Visual Short Notes &amp; Revision
              </h1>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                30–90s Recall
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              20% Text • 50% Visuals • 30% Interactive Animation
            </p>
          </div>
        </div>

        {/* Subject Navigation Tabs */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
          {ALL_SUBJECTS.map((subjKey) => {
            const meta = REVISION_SUBJECTS[subjKey];
            const isTabActive = activeSubject === subjKey;
            const stats = getStatsForSubject(subjKey);

            return (
              <button
                key={subjKey}
                onClick={() => handleSelectSubject(subjKey)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
                  isTabActive
                    ? 'bg-indigo-600 text-white shadow-sm font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <span>{meta.name}</span>
                {stats.total > 0 && (
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                      isTabActive ? 'bg-indigo-800 text-indigo-100' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {stats.total}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Global Progress Pill */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 text-xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-slate-400">Total Progress:</span>
            <span className="font-mono font-bold text-slate-200">
              {totalRevisedCount} / {totalNotesCount || '…'} ({overallPercentage}%)
            </span>
          </div>

          {activeTopicId && (
            <button
              onClick={() => {
                setActiveTopicId(null);
                router.push('/revision-notes');
              }}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
            >
              <span>Dashboard</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      {!activeTopicId ? (
        <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 space-y-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 p-6 sm:p-8 shadow-xl">
            <div className="max-w-2xl space-y-3 relative z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                Ultra-Fast Visual Revision Engine
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Revise Critical Concepts in 30 to 90 Seconds
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Zero fluff. No lengthy textbook walls of text. Every note pairs concise recall definitions with animated diagrams, decision boundaries, memory layouts, and active recall tests.
              </p>
              <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>{totalNotesCount || 46} High-Yield Notes</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-indigo-400" />
                  <span>Interactive Animation Controllers</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  <span>Flashcard Exam Mode Ready</span>
                </div>
              </div>
            </div>
          </div>

          {recentTopics.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  Recently Reviewed Topics
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {recentTopics.map((rt) => (
                  <div
                    key={rt.id}
                    onClick={() => handleSelectTopic(rt.id)}
                    className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 cursor-pointer transition-all space-y-1.5 group"
                  >
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-bold text-indigo-400 uppercase tracking-wider truncate">
                        {rt.subject.toUpperCase()}
                      </span>
                      <span className="font-mono text-slate-500">{rt.readTimeSeconds}s</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-200 group-hover:text-white truncate">
                      {rt.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 line-clamp-1">
                      {rt.quickRecall.oneLiner}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Choose a Subject to Revise
                </h3>
                <p className="text-xs text-slate-400">
                  Select any subject to launch visual short notes and interactive tracers.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {ALL_SUBJECTS.map((subjKey) => {
                const meta = REVISION_SUBJECTS[subjKey];
                const stats = getStatsForSubject(subjKey);

                return (
                  <SubjectCard
                    key={subjKey}
                    meta={meta}
                    totalTopics={stats.total}
                    revisedTopics={stats.revised}
                    bookmarkedTopics={stats.bookmarked}
                    isSelected={activeSubject === subjKey}
                    onSelect={() => handleSelectSubject(subjKey)}
                  />
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          <TopicSidebar
            topics={subjectTopics}
            plannedTopics={subjectPlanned}
            activeTopicId={activeTopicId}
            onSelectTopic={handleSelectTopic}
            filters={filters}
            onUpdateFilters={(partial) => setFilters((prev) => ({ ...prev, ...partial }))}
            bookmarkedIds={storageState.bookmarks}
            revisedIds={revisedIds}
            onToggleBookmark={toggleTopicBookmark}
            subjectCategories={REVISION_SUBJECTS[activeSubject].categories}
          />

          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6 max-w-5xl">
            {activeTopic ? (
              <>
                <div className="space-y-2 pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2 text-xs text-slate-400 flex-wrap">
                    <button
                      onClick={() => {
                        setActiveTopicId(null);
                        router.push('/revision-notes');
                      }}
                      className="hover:text-indigo-400 transition-colors"
                    >
                      Revision Dashboard
                    </button>
                    <span>/</span>
                    <span className="font-semibold text-slate-300">
                      {REVISION_SUBJECTS[activeTopic.subject].name}
                    </span>
                    <span>/</span>
                    <span className="text-slate-400">{activeTopic.category}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                            activeTopic.difficulty === 'Beginner'
                              ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-400'
                              : activeTopic.difficulty === 'Intermediate'
                              ? 'bg-indigo-950/40 border-indigo-500/40 text-indigo-400'
                              : 'bg-purple-950/40 border-purple-500/40 text-purple-400'
                          }`}
                        >
                          {activeTopic.difficulty}
                        </span>

                        <span className="flex items-center gap-1 text-[11px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded-lg border border-slate-800">
                          <Clock className="w-3 h-3 text-slate-500" />
                          <span>{activeTopic.readTimeSeconds}s Read</span>
                        </span>

                        {activeTopic.isInterviewFavorite && (
                          <span className="flex items-center gap-1 text-[11px] font-semibold text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded-lg border border-amber-500/30">
                            ★ Interview Favorite
                          </span>
                        )}
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                        {activeTopic.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                        {activeTopic.subtitle}
                      </p>
                    </div>
                  </div>
                </div>

                <RevisionControls
                  isExamMode={storageState.examModeEnabled}
                  onToggleExamMode={() => setExamMode(!storageState.examModeEnabled)}
                  isQuickReview={storageState.quickReviewModeEnabled}
                  onToggleQuickReview={() =>
                    setQuickReviewMode(!storageState.quickReviewModeEnabled)
                  }
                  onRandomTopic={handleRandomTopic}
                  onPreviousTopic={handlePreviousTopic}
                  onNextTopic={handleNextTopic}
                  hasPrevious={hasPrevious}
                  hasNext={hasNext}
                  isBookmarked={storageState.bookmarks.includes(activeTopic.id)}
                  onToggleBookmark={() => toggleTopicBookmark(activeTopic.id)}
                  isRevised={storageState.revisionStatus[activeTopic.id] === 'revised'}
                  onToggleRevised={() => toggleTopicRevised(activeTopic.id)}
                  lastReviewedIso={storageState.lastReviewed[activeTopic.id]}
                  onOpenShortcuts={() => setShortcutsModalOpen(true)}
                />

                <section className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400">
                    <span className="w-2 h-2 rounded-full bg-indigo-500" />
                    <span>Section A • Quick Recall (20% Text)</span>
                  </div>
                  <QuickRecall
                    data={activeTopic.quickRecall}
                    isExamMode={storageState.examModeEnabled}
                    isQuickReviewOnly={storageState.quickReviewModeEnabled}
                  />
                </section>

                {!storageState.quickReviewModeEnabled && (
                  <section className="space-y-2 pt-4 border-t border-slate-800/80">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
                      <span className="w-2 h-2 rounded-full bg-cyan-500" />
                      <span>Section B • Visual Understanding (50% Visuals)</span>
                    </div>
                    <VisualDiagram data={activeTopic.visual} />
                  </section>
                )}

                {!storageState.quickReviewModeEnabled && (
                  <section className="space-y-2 pt-4 border-t border-slate-800/80">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span>Section C • See It In Action (30% Animation)</span>
                    </div>
                    <AnimatedVisualizer data={activeTopic.animation} />
                  </section>
                )}

                {activeTopic.codeSnippet && !storageState.quickReviewModeEnabled && (
                  <section className="space-y-2 pt-4 border-t border-slate-800/80">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
                      <span className="w-2 h-2 rounded-full bg-cyan-500" />
                      <span>Code in Action • Runnable Syntax &amp; Output</span>
                    </div>
                    <PracticalCodeCard snippet={activeTopic.codeSnippet} />
                  </section>
                )}

                <section className="space-y-2 pt-4 border-t border-slate-800/80">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span>Smart Feature • 3-Question Active Recall Quiz</span>
                  </div>
                  <LightweightQuiz
                    topicId={activeTopic.id}
                    questions={activeTopic.quiz}
                  />
                </section>

                <div className="flex items-center justify-between pt-6 border-t border-slate-800">
                  <button
                    onClick={handlePreviousTopic}
                    disabled={!hasPrevious}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-semibold text-slate-300 transition-colors"
                  >
                    <span>← Previous Note</span>
                  </button>

                  <button
                    onClick={handleNextTopic}
                    disabled={!hasNext}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-bold text-white transition-all shadow-md"
                  >
                    <span>Next Note →</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="py-20 flex items-center justify-center text-xs font-mono text-slate-400">
                Loading visual revision note...
              </div>
            )}
          </main>
        </div>
      )}

      <KeyboardShortcutsModal
        isOpen={shortcutsModalOpen}
        onClose={() => setShortcutsModalOpen(false)}
      />
    </div>
  );
}

export default function RevisionNotesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center bg-slate-950 text-slate-400">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-mono">Loading Visual Revision Lab...</span>
          </div>
        </div>
      }
    >
      <RevisionNotesContent />
    </Suspense>
  );
}
