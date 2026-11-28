'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CalendarClock,
  CheckCircle2,
  Plus,
  Trash2,
  RotateCw,
  AlertTriangle,
} from 'lucide-react';
import { ALL_IIT_FLASHCARDS, IIT_CHAPTERS, IIT_CHAPTERS_BY_ID } from '@/data/iit';
import {
  addIITRevisionTask,
  deleteIITRevisionTask,
  getIITProgress,
  getTodayDateStr,
  recordIITFlashcardReview,
  toggleIITRevisionTask,
} from '@/lib/iit/progress';
import { computeIITDashboardMetrics } from '@/lib/iit/analytics';
import { IITRevisionTaskFormSchema, IITRevisionTaskFormValues } from '@/lib/iit/validation';
import { IITMarkdownMath } from '@/components/iit/IITMarkdownMath';
import { MathBlock } from '@/components/math/Math';
import { IITUserProgress } from '@/types/iit';

export default function IITPlannerPage() {
  const [progress, setProgress] = useState<IITUserProgress | null>(null);
  const [cardIdx, setCardIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IITRevisionTaskFormValues>({
    resolver: zodResolver(IITRevisionTaskFormSchema),
    defaultValues: {
      chapterId: IIT_CHAPTERS[0]?.id || '',
      title: '',
      dueDate: getTodayDateStr(),
      priority: 'High',
    },
  });

  useEffect(() => {
    const sync = () => setProgress(getIITProgress());
    sync();
    window.addEventListener('iit_progress_updated', sync);
    return () => window.removeEventListener('iit_progress_updated', sync);
  }, []);

  const dueCards = useMemo(() => {
    if (!progress) return ALL_IIT_FLASHCARDS;
    const now = Date.now();
    return ALL_IIT_FLASHCARDS.filter((c) => {
      const rev = progress.flashcardReviews[c.id];
      return !rev || new Date(rev.nextReviewAt).getTime() <= now;
    });
  }, [progress]);

  const metrics = useMemo(
    () => (progress ? computeIITDashboardMetrics(progress) : null),
    [progress]
  );

  const onSubmitTask = (values: IITRevisionTaskFormValues) => {
    const ch = IIT_CHAPTERS_BY_ID[values.chapterId];
    addIITRevisionTask({
      chapterId: values.chapterId,
      subject: ch?.subject || 'physics',
      title: values.title,
      dueDate: values.dueDate,
      priority: values.priority,
    });
    reset({
      chapterId: values.chapterId,
      title: '',
      dueDate: getTodayDateStr(),
      priority: 'High',
    });
  };

  const activeCard = dueCards[cardIdx % Math.max(1, dueCards.length)];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 space-y-2 shadow-xs">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
          <CalendarClock className="w-3.5 h-3.5" />
          <span>SM-2 Spaced Repetition &amp; JEE Revision Planner</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Revision Queue &amp; Weak-Topic Schedule
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Review due formula/concept flashcards using the SM-2 interval scheduler and plan targeted chapter revisions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: SM-2 Flashcard Queue */}
        <div className="lg:col-span-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
              SM-2 Flashcard Queue ({dueCards.length} due)
            </h2>
            {dueCards.length > 0 && (
              <button
                type="button"
                onClick={() => setFlipped((p) => !p)}
                className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400"
              >
                <RotateCw className="w-3.5 h-3.5" /> Flip
              </button>
            )}
          </div>

          {dueCards.length === 0 ? (
            <div className="py-10 text-center space-y-2 text-xs text-slate-500">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
              <p className="font-bold text-slate-800 dark:text-slate-200">
                All SM-2 flashcards reviewed for today!
              </p>
              <p>New cards will reappear automatically on their scheduled intervals.</p>
            </div>
          ) : (
            activeCard && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>{IIT_CHAPTERS_BY_ID[activeCard.chapterId]?.title || activeCard.subject}</span>
                  <span>
                    {(cardIdx % dueCards.length) + 1} / {dueCards.length}
                  </span>
                </div>

                <div
                  onClick={() => setFlipped((p) => !p)}
                  className="min-h-[190px] rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-5 flex flex-col items-center justify-center text-center cursor-pointer space-y-3"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {flipped ? 'Verified Answer' : 'Click to Reveal Answer'}
                  </span>
                  <div className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
                    <IITMarkdownMath content={flipped ? activeCard.back : activeCard.front} />
                  </div>
                  {flipped && activeCard.formulaLatex && (
                    <div className="w-full">
                      <MathBlock math={activeCard.formulaLatex} />
                    </div>
                  )}
                </div>

                {flipped && (
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { q: 1 as const, label: 'Again', cls: 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800' },
                      { q: 3 as const, label: 'Hard', cls: 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800' },
                      { q: 4 as const, label: 'Good', cls: 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800' },
                      { q: 5 as const, label: 'Easy', cls: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800' },
                    ].map((btn) => (
                      <button
                        key={btn.q}
                        type="button"
                        onClick={() => {
                          recordIITFlashcardReview(activeCard.id, btn.q);
                          setFlipped(false);
                          setCardIdx((i) => i + 1);
                        }}
                        className={`py-2 rounded-xl border text-xs font-bold ${btn.cls}`}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          )}
        </div>

        {/* Right: Revision Task Planner (React Hook Form + Zod) */}
        <div className="lg:col-span-6 space-y-5">
          <form
            onSubmit={handleSubmit(onSubmitTask)}
            className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-3"
          >
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
              Schedule Chapter Revision Task
            </h2>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500">Chapter</label>
              <select
                {...register('chapterId')}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs"
              >
                {IIT_CHAPTERS.map((c) => (
                  <option key={c.id} value={c.id}>
                    [{c.subject.toUpperCase()} · Cl {c.classLevel}] {c.title}
                  </option>
                ))}
              </select>
              {errors.chapterId && (
                <p className="text-[11px] text-rose-500">{errors.chapterId.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500">Revision Goal</label>
              <input
                type="text"
                {...register('title')}
                placeholder="e.g., Solve 25 JEE Main PYQs + revise formula sheet"
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs"
              />
              {errors.title && <p className="text-[11px] text-rose-500">{errors.title.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-500">Due Date</label>
                <input
                  type="date"
                  {...register('dueDate')}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs"
                />
                {errors.dueDate && (
                  <p className="text-[11px] text-rose-500">{errors.dueDate.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-500">Priority</label>
                <select
                  {...register('priority')}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Normal">Normal</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Revision Task</span>
            </button>
          </form>

          {/* Task List */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-3">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
              Scheduled Tasks ({progress?.revisionTasks?.length || 0})
            </h3>
            {!progress || progress.revisionTasks.length === 0 ? (
              <p className="text-xs text-slate-500 py-3">
                No custom revision tasks yet. Add one above or review weak chapters below.
              </p>
            ) : (
              <div className="space-y-2">
                {progress.revisionTasks.map((t) => (
                  <div
                    key={t.id}
                    className="flex items-center justify-between gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-xs"
                  >
                    <label className="flex items-start gap-2.5 cursor-pointer flex-1 min-w-0">
                      <input
                        type="checkbox"
                        checked={t.completed}
                        onChange={() => toggleIITRevisionTask(t.id)}
                        className="mt-0.5 rounded border-slate-300 text-amber-600"
                      />
                      <div className="min-w-0">
                        <p
                          className={`font-semibold truncate ${
                            t.completed ? 'line-through text-slate-400' : 'text-slate-900 dark:text-white'
                          }`}
                        >
                          {t.title}
                        </p>
                        <p className="text-[10px] text-slate-500 font-mono">
                          {IIT_CHAPTERS_BY_ID[t.chapterId]?.title} · {t.dueDate} · {t.priority}
                        </p>
                      </div>
                    </label>
                    <button
                      type="button"
                      onClick={() => deleteIITRevisionTask(t.id)}
                      aria-label="Delete task"
                      className="p-1.5 text-slate-400 hover:text-rose-500"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Weak Chapters Auto-Suggested */}
          {metrics && metrics.weakChapters.length > 0 && (
            <div className="rounded-2xl border border-rose-200 dark:border-rose-900/50 bg-rose-50/40 dark:bg-rose-950/10 p-5 space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-300 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" /> Weak Chapters Needing Revision
              </h3>
              <div className="space-y-1.5">
                {metrics.weakChapters.map((w) => (
                  <Link
                    key={w.chapter.id}
                    href={`/iit/chapters/${w.chapter.id}`}
                    className="flex items-center justify-between text-xs p-2 rounded-lg bg-white dark:bg-slate-900 border border-rose-200/60 dark:border-rose-900/40"
                  >
                    <span className="font-semibold">{w.chapter.title}</span>
                    <span className="font-mono text-rose-600 font-bold">{w.accuracyPct}%</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

