'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ShieldAlert,
  Lock,
  CheckCircle2,
  AlertTriangle,
  Database,
  FilePlus2,
  Loader2,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import {
  MBBS_MODULES_CATALOG,
  MBBS_PHASES,
  MBBS_SUBJECTS_CATALOG,
  ANATOMY_ASSET_LIST,
} from '@/data/medverse';
import { ContentStatus, MBBSPhaseId } from '@/types/medverse';

interface StudioAuditResponse {
  success: boolean;
  error?: string;
  editor?: { userId: string; email: string | null; role: string };
  summary?: {
    subjectsCount: number;
    topicsCount: number;
    publishedCount: number;
    inDevelopmentCount: number;
    plannedCount: number;
    assetsCount: number;
    animationsCount: number;
    missingAssetTopicsCount: number;
  };
  missingAssetTopics?: Array<{ id: string; title: string; subjectId: string; status: string }>;
}

export default function MedVerseAdminStudioPage() {
  const { user, isAdmin, isOwner, isLoading } = useAuth();
  const [audit, setAudit] = useState<StudioAuditResponse | null>(null);
  const [loadingAudit, setLoadingAudit] = useState(false);

  // Zod-validated Editor Form State
  const [topicId, setTopicId] = useState('cv-coronary-circulation');
  const [title, setTitle] = useState('Coronary Arterial Dominance & Territory Mapping');
  const [subtitle, setSubtitle] = useState('LAD, LCx & RCA branching mapped on 3D Heart');
  const [subjectId, setSubjectId] = useState('mbbs-anatomy');
  const [phaseId, setPhaseId] = useState<MBBSPhaseId>('phase-1-preclinical');
  const [moduleId, setModuleId] = useState(MBBS_MODULES_CATALOG[0].id);
  const [assetId, setAssetId] = useState('heart-bp3d');
  const [status, setStatus] = useState<ContentStatus>('ready_for_review');
  const [saveFeedback, setSaveFeedback] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    setLoadingAudit(true);
    fetch('/api/medverse/studio', { headers: { 'Cache-Control': 'no-cache' } })
      .then((r) => r.json())
      .then((data: StudioAuditResponse) => setAudit(data))
      .catch(() => setAudit({ success: false, error: 'Failed reaching studio API.' }))
      .finally(() => setLoadingAudit(false));
  }, [user]);

  const handleSaveTopic = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveFeedback(null);
    setSaveError(null);
    try {
      const res = await fetch('/api/medverse/studio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: topicId.trim(),
          moduleId,
          subjectId,
          phaseId,
          title: title.trim(),
          subtitle: subtitle.trim(),
          status,
          difficulty: 'Intermediate',
          estimatedMinutes: 25,
          assetId: assetId || undefined,
          contentVersion: '1.0.0',
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setSaveError(data.error || 'Failed validation or authorization.');
        return;
      }
      setSaveFeedback(
        data.message || `Saved topic "${data.topic.title}" with status "${data.topic.status}".`
      );
    } catch {
      setSaveError('Network error submitting studio update.');
    }
  };

  if (isLoading || loadingAudit) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 flex flex-col items-center justify-center gap-3 text-xs text-slate-400">
        <Loader2 className="w-6 h-6 text-teal-400 animate-spin" />
        <span>Verifying editor authorization...</span>
      </div>
    );
  }

  // Real Authorization Gate (Backed by server /api/medverse/studio check)
  if (!user || (!isAdmin && !isOwner && audit?.success !== true)) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="rounded-3xl border border-rose-900/60 bg-slate-900/95 p-8 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-950/70 border border-rose-800 text-rose-400 flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-extrabold text-white">
            Admin / Medical Reviewer Authorization Required
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            The MedVerse Content Studio enforces server-side role authorization (`admin` or `owner` in <code className="text-teal-300">profiles.role</code> or server owner configuration).
            {audit?.error ? ` Server response: "${audit.error}"` : ''}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {!user && (
              <Link
                href="/login?redirectTo=/doctor/studio"
                className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold"
              >
                Sign In as Authorized Editor
              </Link>
            )}
            <Link
              href="/doctor"
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
            >
              Back to MedVerse Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-5 sm:p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-teal-400 uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4" />
            <span>MedVerse Admin Content Studio</span>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs font-mono">
            Authorized: {audit?.editor?.email} ({audit?.editor?.role})
          </span>
        </div>

        <h1 className="text-2xl font-extrabold text-white">
          Curriculum Authoring, Asset Audit &amp; Medical Review Gate
        </h1>

        {audit?.summary && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase block">Published Topics</span>
              <span className="text-xl font-mono font-bold text-emerald-300">
                {audit.summary.publishedCount}/{audit.summary.topicsCount}
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase block">Verified 3D Assets</span>
              <span className="text-xl font-mono font-bold text-cyan-300">
                {audit.summary.assetsCount}
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase block">Animations</span>
              <span className="text-xl font-mono font-bold text-teal-300">
                {audit.summary.animationsCount}
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase block">Missing 3D Assets</span>
              <span className="text-xl font-mono font-bold text-amber-300">
                {audit.summary.missingAssetTopicsCount}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Topic Editor Form (Validated with Zod on Server) */}
        <form
          onSubmit={handleSaveTopic}
          className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-900/90 p-5 space-y-4"
        >
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-400">
            <FilePlus2 className="w-4 h-4" />
            <span>Create / Update Topic Specification</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <label className="space-y-1">
              <span className="text-slate-400 font-semibold block">Topic ID (slug)</span>
              <input
                value={topicId}
                onChange={(e) => setTopicId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
              />
            </label>
            <label className="space-y-1">
              <span className="text-slate-400 font-semibold block">Review &amp; Publish Status</span>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ContentStatus)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
              >
                <option value="planned">planned</option>
                <option value="in_development">in_development</option>
                <option value="ready_for_review">ready_for_review</option>
                <option value="medically_reviewed">medically_reviewed</option>
                <option value="published">published</option>
              </select>
            </label>
          </div>

          <label className="space-y-1 text-xs block">
            <span className="text-slate-400 font-semibold block">Topic Title</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
            />
          </label>

          <label className="space-y-1 text-xs block">
            <span className="text-slate-400 font-semibold block">Subtitle</span>
            <input
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
            />
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <label className="space-y-1">
              <span className="text-slate-400 font-semibold block">Phase</span>
              <select
                value={phaseId}
                onChange={(e) => setPhaseId(e.target.value as MBBSPhaseId)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
              >
                {MBBS_PHASES.map((ph) => (
                  <option key={ph.id} value={ph.id}>
                    {ph.shortTitle}
                  </option>
                ))}
              </select>
            </label>
            <label className="space-y-1">
              <span className="text-slate-400 font-semibold block">Subject</span>
              <select
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
              >
                {MBBS_SUBJECTS_CATALOG.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.title}
                  </option>
                ))}
              </select>
            </label>
            <label className="space-y-1">
              <span className="text-slate-400 font-semibold block">Bound 3D Asset</span>
              <select
                value={assetId}
                onChange={(e) => setAssetId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
              >
                <option value="">None (Missing Asset)</option>
                {ANATOMY_ASSET_LIST.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.id} ({a.fileFormat})
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="space-y-1 text-xs block">
            <span className="text-slate-400 font-semibold block">Parent Module</span>
            <select
              value={moduleId}
              onChange={(e) => setModuleId(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
            >
              {MBBS_MODULES_CATALOG.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.title} ({m.organSystem})
                </option>
              ))}
            </select>
          </label>

          {saveFeedback && (
            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800 text-xs text-emerald-200 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{saveFeedback}</span>
            </div>
          )}

          {saveError && (
            <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800 text-xs text-rose-200 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{saveError}</span>
            </div>
          )}

          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-colors"
          >
            Validate &amp; Submit Topic Update
          </button>
        </form>

        {/* Missing Assets & Completeness Inspector */}
        <aside className="lg:col-span-5 rounded-2xl border border-slate-800 bg-slate-900/90 p-5 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
            <Database className="w-4 h-4" />
            <span>Missing 3D Asset Queue ({audit?.missingAssetTopics?.length || 0})</span>
          </div>
          <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
            {(audit?.missingAssetTopics || []).map((t) => (
              <div
                key={t.id}
                className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-white">{t.title}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {t.status}
                  </span>
                </div>
                <div className="text-[11px] font-mono text-slate-500">
                  {t.id} · {t.subjectId}
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
