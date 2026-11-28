'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  Box,
  PlayCircle,
  BookOpen,
  CheckSquare,
  Layers,
  Stethoscope,
  Bookmark,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import {
  getTopicById,
  getSubjectById,
  getModuleById,
  getMCQsForTopic,
  getFlashcardsForTopic,
  getCasesForTopic,
  MEDVERSE_NOTES,
  SCIENTIFIC_ANIMATIONS_BY_ID,
  ANATOMY_ASSETS,
} from '@/data/medverse';
import { NotesRenderer } from '@/components/medverse/NotesRenderer';
import { QuizEnginePanel } from '@/components/medverse/QuizEnginePanel';
import { FlashcardSM2Panel } from '@/components/medverse/FlashcardSM2Panel';
import { DoctorTopicTutorWidget } from '@/components/medverse/DoctorTopicTutorWidget';
import {
  getMedVerseProgress,
  recordMedVerseStudySession,
  toggleMedVerseTopicBookmark,
  toggleMedVerseTopicCompletion,
} from '@/lib/medverse/progress';

const AnatomyGLBViewer = dynamic(
  () => import('@/components/medverse/three/AnatomyGLBViewer').then((m) => m.AnatomyGLBViewer),
  {
    ssr: false,
    loading: () => (
      <div className="h-[440px] rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-center gap-2 text-xs text-slate-600 dark:text-slate-400">
        <Loader2 className="w-5 h-5 text-teal-600 dark:text-teal-400 animate-spin" />
        <span>Loading 3D Anatomy Viewer...</span>
      </div>
    ),
  }
);

const AnimationTimelinePlayer = dynamic(
  () =>
    import('@/components/medverse/three/AnimationTimelinePlayer').then(
      (m) => m.AnimationTimelinePlayer
    ),
  {
    ssr: false,
    loading: () => (
      <div className="h-[460px] rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-center gap-2 text-xs text-slate-600 dark:text-slate-400">
        <Loader2 className="w-5 h-5 text-cyan-600 dark:text-cyan-400 animate-spin" />
        <span>Loading Scientific Animation Engine...</span>
      </div>
    ),
  }
);

type WorkspaceTab = '3d-model' | 'animation' | 'notes' | 'quiz' | 'flashcards' | 'cases';

export default function SynchronizedTopicWorkspacePage() {
  const params = useParams<{ topicId: string }>();
  const topicId = params?.topicId || '';
  const topic = getTopicById(topicId);

  const [activeTab, setActiveTab] = useState<WorkspaceTab>('notes');
  const [isCompleted, setIsCompleted] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (!topic) return;
    const asset = topic.assetId ? ANATOMY_ASSETS[topic.assetId] : null;
    if (asset?.kind === 'glb_anatomical') setActiveTab('3d-model');
    else if (topic.animationId) setActiveTab('animation');
    else setActiveTab('notes');

    const syncProg = () => {
      const p = getMedVerseProgress();
      setIsCompleted(Boolean(p.completedTopics[topic.id]));
      setIsBookmarked(p.bookmarkedTopicIds.includes(topic.id));
    };
    syncProg();
    window.addEventListener('medverse_progress_updated', syncProg);

    const startedAt = Date.now();
    return () => {
      window.removeEventListener('medverse_progress_updated', syncProg);
      const elapsedSec = Math.round((Date.now() - startedAt) / 1000);
      if (elapsedSec >= 3) {
        recordMedVerseStudySession(topic.id, 'notes', elapsedSec);
      }
    };
  }, [topic]);

  if (!topic) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
        <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
        <h1 className="text-xl font-extrabold text-slate-900 dark:text-white">Topic Not Found</h1>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          Could not locate topic <code className="font-mono text-teal-600 dark:text-teal-300">{topicId}</code>.
        </p>
        <Link
          href="/doctor/curriculum"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-600 text-white text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" /> Back to MBBS Curriculum
        </Link>
      </div>
    );
  }

  const subject = getSubjectById(topic.subjectId);
  const mod = getModuleById(topic.moduleId);
  const notes = MEDVERSE_NOTES[topic.id];
  const animation = topic.animationId ? SCIENTIFIC_ANIMATIONS_BY_ID[topic.animationId] : null;
  const asset = topic.assetId ? ANATOMY_ASSETS[topic.assetId] : null;
  const mcqs = getMCQsForTopic(topic.id);
  const flashcards = getFlashcardsForTopic(topic.id);
  const cases = getCasesForTopic(topic.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Synchronized Topic Header */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-5 sm:p-6 space-y-4 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/doctor/curriculum"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-300"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Curriculum</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border uppercase ${
                topic.status === 'published'
                  ? 'bg-emerald-50 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300'
                  : 'bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-700 text-amber-800 dark:text-amber-300'
              }`}
            >
              Status: {topic.status.replace('_', ' ')} · v{topic.contentVersion}
            </span>

            <button
              type="button"
              onClick={() => toggleMedVerseTopicBookmark(topic.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors ${
                isBookmarked
                  ? 'bg-cyan-50 dark:bg-cyan-950 border-cyan-300 dark:border-cyan-600 text-cyan-800 dark:text-cyan-200'
                  : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-cyan-500'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>{isBookmarked ? 'Saved' : 'Save Topic'}</span>
            </button>

            <button
              type="button"
              onClick={() => toggleMedVerseTopicCompletion(topic.id)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border text-xs font-bold transition-colors ${
                isCompleted
                  ? 'bg-emerald-600 border-emerald-500 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-teal-600 hover:text-white hover:border-teal-500'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isCompleted ? 'Topic Completed' : 'Mark Complete'}</span>
            </button>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="text-xs font-bold text-teal-600 dark:text-teal-400">
            {subject?.title} · {mod?.title}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {topic.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">{topic.subtitle}</p>
        </div>

        {/* Learning Objectives */}
        {topic.learningObjectives.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
            {topic.learningObjectives.map((obj) => (
              <div
                key={obj.code}
                className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2"
              >
                <span className="font-mono font-bold text-teal-600 dark:text-teal-400 shrink-0">{obj.code}</span>
                <span>{obj.statement}</span>
              </div>
            ))}
          </div>
        )}

        {/* Synchronized Tab Switcher */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-200 dark:border-slate-800">
          {asset?.kind === 'glb_anatomical' && (
            <button
              type="button"
              onClick={() => setActiveTab('3d-model')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
                activeTab === '3d-model'
                  ? 'bg-teal-600 text-white'
                  : 'bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Box className="w-3.5 h-3.5" />
              <span>3D Anatomical Model</span>
            </button>
          )}
          {animation && (
            <button
              type="button"
              onClick={() => setActiveTab('animation')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'animation'
                  ? 'bg-cyan-600 text-white'
                  : 'bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <PlayCircle className="w-3.5 h-3.5" />
              <span>Scientific Animation</span>
            </button>
          )}
          <button
            type="button"
            onClick={() => setActiveTab('notes')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'notes'
                ? 'bg-teal-600 text-white'
                : 'bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>MBBS Short Notes</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('quiz')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'quiz'
                ? 'bg-violet-600 text-white'
                : 'bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>MCQs ({mcqs.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('flashcards')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'flashcards'
                ? 'bg-cyan-600 text-white'
                : 'bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Flashcards ({flashcards.length})</span>
          </button>
          {cases.length > 0 && (
            <button
              type="button"
              onClick={() => setActiveTab('cases')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'cases'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Clinical Case ({cases.length})</span>
            </button>
          )}
        </div>
      </div>

      {/* Synchronized Workspace Content */}
      {activeTab === '3d-model' && asset?.kind === 'glb_anatomical' && (
        <AnatomyGLBViewer
          assetId={asset.id}
          initialSelectedStructureId={topic.focusStructureIds?.[0] || null}
          compact
        />
      )}

      {activeTab === 'animation' && animation && (
        <AnimationTimelinePlayer animation={animation} />
      )}

      {activeTab === 'notes' &&
        (notes ? (
          <NotesRenderer notes={notes} />
        ) : (
          <div className="rounded-2xl border border-amber-200 dark:border-amber-800/50 bg-amber-50 dark:bg-amber-950/20 p-6 space-y-2 text-xs text-amber-900 dark:text-amber-200">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Topic Status: {topic.status.replace('_', ' ').toUpperCase()}
            </h3>
            <p>
              This NMC curriculum topic is queued for content authoring and medical peer review. We only mark topics as Published once verified notes, 3D/visual assets, and assessments are complete.
            </p>
          </div>
        ))}

      {activeTab === 'quiz' && <QuizEnginePanel questions={mcqs} />}

      {activeTab === 'flashcards' && <FlashcardSM2Panel cards={flashcards} />}

      {activeTab === 'cases' &&
        cases.map((cs) => (
          <div
            key={cs.id}
            className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-5 sm:p-6 space-y-4 text-xs sm:text-sm"
          >
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-xs text-amber-900 dark:text-amber-200">
              {cs.disclaimer}
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">{cs.title}</h3>
            <p className="text-slate-700 dark:text-slate-200 leading-relaxed">{cs.scenario}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5">
                <span className="text-[11px] font-bold uppercase text-teal-600 dark:text-teal-400">
                  Findings &amp; Examination
                </span>
                {cs.examinationAndFindings.map((f) => (
                  <p key={f} className="text-xs text-slate-600 dark:text-slate-300">
                    • {f}
                  </p>
                ))}
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5">
                <span className="text-[11px] font-bold uppercase text-cyan-700 dark:text-cyan-400">
                  Anatomy &amp; Physiology Correlation
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {cs.anatomyPhysiologyLink}
                </p>
              </div>
            </div>
          </div>
        ))}

      <DoctorTopicTutorWidget topic={topic} />
    </div>
  );
}
