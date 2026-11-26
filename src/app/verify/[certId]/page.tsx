import React from 'react';
import Link from 'next/link';
import { Award, ShieldCheck, AlertTriangle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { getSupabaseAdminClient } from '@/lib/supabase/admin';
import { getSupabaseServerClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

interface VerifyPageProps {
  params: { certId: string };
}

interface VerifiedCertRecord {
  id: string;
  recipient_name: string;
  track_id: string;
  track_title: string;
  lessons_completed: number;
  total_lessons: number;
  score_pct: number;
  issued_at: string;
}

async function fetchVerifiedCertificate(rawId: string): Promise<VerifiedCertRecord | null> {
  const certId = decodeURIComponent(rawId || '').trim().toUpperCase();
  if (!certId || !/^AZL-[A-Z0-9-]+$/.test(certId)) return null;

  try {
    const admin = getSupabaseAdminClient();
    if (admin) {
      const { data } = await admin
        .from('user_certificates')
        .select('id, recipient_name, track_id, track_title, lessons_completed, total_lessons, score_pct, issued_at')
        .eq('id', certId)
        .maybeSingle();
      return (data as VerifiedCertRecord) || null;
    }

    const supabase = getSupabaseServerClient();
    const { data } = await supabase.rpc('verify_certificate_by_id', {
      cert_id: certId,
    });
    if (Array.isArray(data) && data.length > 0) {
      return data[0] as VerifiedCertRecord;
    }
  } catch {
    return null;
  }
  return null;
}

export default async function VerifyCertificatePage({ params }: VerifyPageProps) {
  const cert = await fetchVerifiedCertificate(params.certId);

  if (!cert) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-6">
        <div className="max-w-md w-full rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 text-center space-y-5 shadow-xl">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <div className="space-y-2">
            <h1 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
              Certificate Not Found
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              We could not verify credential <code className="font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">{params.certId}</code>. Please check the verification URL.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700"
          >
            <span>Explore AzurLearn</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] py-12 px-4 sm:px-8 max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
        <ShieldCheck className="w-5 h-5" />
        <span>Official Credential Verified by AzurLearn</span>
      </div>

      <div className="rounded-3xl border-4 border-indigo-600/30 dark:border-indigo-500/40 bg-white dark:bg-slate-900 p-8 sm:p-12 shadow-2xl text-center space-y-6">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white flex items-center justify-center shadow-lg">
          <Award className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-[11px] uppercase tracking-widest font-bold text-slate-400 block">
            Verified Certificate of Completion
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {cert.recipient_name}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            successfully completed all engineering modules and assessments for
          </p>
          <p className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">
            {cert.track_title}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl mx-auto pt-6 border-t border-slate-200 dark:border-slate-800 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
            <span className="text-slate-400 block">Curriculum Scope</span>
            <span className="font-mono font-bold text-slate-900 dark:text-slate-100">
              {cert.lessons_completed} / {cert.total_lessons} Lessons
            </span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
            <span className="text-slate-400 block">Assessment Score</span>
            <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
              {cert.score_pct}% Verified
            </span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
            <span className="text-slate-400 block">Issue Date</span>
            <span className="font-mono font-bold text-slate-900 dark:text-slate-100">
              {new Date(cert.issued_at).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1.5 font-mono">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            Credential ID: <strong className="text-slate-900 dark:text-slate-100">{cert.id}</strong>
          </span>
        </div>
      </div>

      <div className="text-center">
        <Link
          href="/curriculum"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md"
        >
          <span>Explore AzurLearn Curriculum</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
