'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Award,
  CheckCircle2,
  Copy,
  Check,
  Printer,
  ExternalLink,
  Lock,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { getProgress } from '@/lib/storage';
import { UserProgressState } from '@/lib/types';
import {
  CERTIFICATE_TRACKS,
  getTrackCertificateStats,
  IssuedCertificate,
} from '@/lib/certificates';
import { useAuth } from '@/context/AuthContext';

export default function CertificatesPage() {
  const { isOwner } = useAuth();
  const [progress, setProgress] = useState<UserProgressState | null>(null);
  const [issued, setIssued] = useState<IssuedCertificate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [issuingTrack, setIssuingTrack] = useState<string | null>(null);
  const [activePreview, setActivePreview] = useState<IssuedCertificate | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    setProgress(getProgress());
    const handleUpdate = () => setProgress(getProgress());
    window.addEventListener('ml_progress_updated', handleUpdate);

    fetch('/api/certificates', { headers: { 'Cache-Control': 'no-cache' } })
      .then((r) => r.json())
      .then((d) => {
        if (d.success && Array.isArray(d.certificates)) {
          setIssued(d.certificates);
          if (d.certificates.length > 0) {
            setActivePreview(d.certificates[0]);
          }
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));

    return () => window.removeEventListener('ml_progress_updated', handleUpdate);
  }, []);

  const issuedByTrack = useMemo(() => {
    const map: Record<string, IssuedCertificate> = {};
    for (const cert of issued) {
      map[cert.track_id] = cert;
    }
    return map;
  }, [issued]);

  const handleIssue = async (trackId: string, scorePct: number) => {
    setIssuingTrack(trackId);
    setErrorMsg(null);
    try {
      const current = getProgress();
      const res = await fetch('/api/certificates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          trackId,
          completedLessons: current.completedLessons,
          scorePct,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrorMsg(data.error || 'Could not issue certificate.');
        return;
      }
      const cert: IssuedCertificate = data.certificate;
      setIssued((prev) => [cert, ...prev.filter((c) => c.track_id !== cert.track_id)]);
      setActivePreview(cert);
    } catch {
      setErrorMsg('Network error while issuing certificate.');
    } finally {
      setIssuingTrack(null);
    }
  };

  const handleCopyVerifyLink = (certId: string) => {
    const url = `${window.location.origin}/verify/${certId}`;
    navigator.clipboard.writeText(url);
    setCopiedId(certId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-2 print:hidden">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
          <Award className="w-4 h-4" />
          <span>Verifiable Engineering Credentials</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Completion Certificates &amp; Verification
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
          Complete 100% of any curriculum track to earn an official AzurLearn certificate with a unique public verification URL for LinkedIn and resumes.
        </p>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-xl border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40 text-xs text-amber-900 dark:text-amber-200 print:hidden">
          {errorMsg}
        </div>
      )}

      {/* Certificate Showcase / Printable Card */}
      {activePreview && (
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-3 print:hidden">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              <span>Issued Credential Preview</span>
            </h2>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => handleCopyVerifyLink(activePreview.id)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700"
              >
                {copiedId === activePreview.id ? (
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>{copiedId === activePreview.id ? 'Verification Link Copied' : 'Copy Verify Link'}</span>
              </button>
              <Link
                href={`/verify/${activePreview.id}`}
                target="_blank"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/60 text-xs font-semibold text-indigo-700 dark:text-indigo-300"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Public Verify Page</span>
              </Link>
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Save PDF</span>
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border-4 border-indigo-600/30 dark:border-indigo-500/40 bg-white dark:bg-slate-900 p-8 sm:p-12 shadow-xl text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-600 text-white text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AzurLearn Verified Certificate of Mastery</span>
            </div>

            <div className="space-y-2">
              <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
                This certifies that
              </p>
              <h3 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                {activePreview.recipient_name}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                has successfully completed the rigorous engineering curriculum for
              </p>
              <p className="text-xl sm:text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">
                {activePreview.track_title}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto pt-4 border-t border-slate-200 dark:border-slate-800 text-xs">
              <div>
                <span className="text-slate-400 block">Lessons Completed</span>
                <span className="font-mono font-bold text-slate-900 dark:text-slate-100">
                  {activePreview.lessons_completed} / {activePreview.total_lessons}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">Assessment Mastery</span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  {activePreview.score_pct}%
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">Issued On</span>
                <span className="font-mono font-bold text-slate-900 dark:text-slate-100">
                  {new Date(activePreview.issued_at).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>
            </div>

            <div className="pt-2 text-[11px] font-mono text-slate-400">
              Credential ID: <span className="text-slate-700 dark:text-slate-200 font-bold">{activePreview.id}</span>
            </div>
          </div>
        </div>
      )}

      {/* Track Eligibility Grid */}
      <div className="space-y-4 print:hidden">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          All 13 Curriculum Tracks {loading ? '(Syncing...)' : ''}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CERTIFICATE_TRACKS.map((track) => {
            const stats = getTrackCertificateStats(track, progress);
            const existingCert = issuedByTrack[track.trackId];
            const canClaim = stats.eligible || isOwner;

            return (
              <div
                key={track.trackId}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white bg-gradient-to-r ${track.badgeColor}`}
                    >
                      {stats.total} Lessons
                    </span>
                    {existingCert ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Issued</span>
                      </span>
                    ) : canClaim ? (
                      <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
                        Ready to Claim
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] text-slate-400">
                        <Lock className="w-3 h-3" />
                        <span>{stats.pct}% Done</span>
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    {track.trackTitle}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {track.subtitle}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-mono text-slate-500">
                      <span>{stats.completed} / {stats.total} lessons</span>
                      <span>{stats.pct}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-indigo-600 rounded-full transition-all"
                        style={{ width: `${stats.pct}%` }}
                      />
                    </div>
                  </div>

                  {existingCert ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setActivePreview(existingCert)}
                        className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors"
                      >
                        View Certificate
                      </button>
                      <button
                        onClick={() => handleCopyVerifyLink(existingCert.id)}
                        className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300"
                        title="Copy Verification Link"
                      >
                        {copiedId === existingCert.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  ) : canClaim ? (
                    <button
                      onClick={() => handleIssue(track.trackId, stats.avgQuizPct)}
                      disabled={issuingTrack === track.trackId}
                      className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white text-xs font-bold transition-colors"
                    >
                      {issuingTrack === track.trackId ? 'Issuing Certificate...' : 'Issue Verified Certificate'}
                    </button>
                  ) : (
                    <Link
                      href={
                        ['dsa', 'python', 'java'].includes(track.trackId)
                          ? `/${track.trackId}`
                          : '/curriculum'
                      }
                      className="block w-full py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-center text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors"
                    >
                      Continue Track ({stats.total - stats.completed} left)
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
