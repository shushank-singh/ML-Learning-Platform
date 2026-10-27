'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import {
  Lock,
  Mail,
  ArrowRight,
  RefreshCw,
  LogOut,
  AlertTriangle,
  Brain,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const {
    user,
    isLoading,
    isConfigured,
    isEmailVerified,
    resendVerificationEmail,
    signOut,
  } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const [resendCooldown, setResendCooldown] = useState<number>(0);
  const [resendStatus, setResendStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  const [isResending, setIsResending] = useState<boolean>(false);

  // Countdown timer for resend email
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="relative mb-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center animate-pulse">
            <Brain className="w-6 h-6 text-indigo-500" />
          </div>
          <div className="absolute inset-0 rounded-2xl border-2 border-indigo-500 border-t-transparent animate-spin" />
        </div>
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
          Verifying security credentials...
        </p>
      </div>
    );
  }

  // Not configured notice
  if (!isConfigured) {
    return (
      <div className="max-w-2xl mx-auto my-12 p-8 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-slate-800 dark:text-slate-200">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-amber-700 dark:text-amber-400">
              Supabase Authentication Setup Required
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              To activate user sign-in and protect course content, configure your Supabase credentials in{' '}
              <code className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-xs text-amber-600 dark:text-amber-300">
                .env.local
              </code>
              :
            </p>
            <div className="p-3 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs space-y-1">
              <div>NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co</div>
              <div>NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-publishable-key</div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Review <code className="font-mono">.env.example</code> and <code className="font-mono">supabase/schema.sql</code> for comprehensive instructions.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Unauthenticated: Require login
  if (!user) {
    const loginTarget = `/login?redirectTo=${encodeURIComponent(pathname || '/curriculum')}`;
    const signupTarget = `/signup?redirectTo=${encodeURIComponent(pathname || '/curriculum')}`;

    return (
      <div className="min-h-[75vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/80 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-inner">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
              <Sparkles className="w-3 h-3" />
              <span>Members-Only Learning Area</span>
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
              Authentication Required
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Please sign in to access lessons, runnable code environments, interactive visualizers, and formula proofs.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <Link
              href={loginTarget}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40"
            >
              <span>Sign In to Continue</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href={signupTarget}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium text-sm transition-colors"
            >
              <span>Create New Free Account</span>
            </Link>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <Link
              href="/"
              className="text-xs text-slate-500 hover:text-indigo-500 transition-colors inline-block"
            >
              ← Back to Platform Overview
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated but unverified email: Email Verification Barrier
  if (!isEmailVerified) {
    const handleResend = async () => {
      if (resendCooldown > 0 || !user.email || isResending) return;
      setIsResending(true);
      setResendStatus({ type: null, message: '' });

      const res = await resendVerificationEmail(user.email);
      setIsResending(false);

      if (res.error) {
        setResendStatus({ type: 'error', message: res.error });
      } else {
        setResendStatus({
          type: 'success',
          message: 'A fresh confirmation link has been sent to your email address.',
        });
        setResendCooldown(60); // 60s cooldown rate limit
      }
    };

    return (
      <div className="min-h-[75vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/80 flex items-center justify-center text-amber-600 dark:text-amber-400 shadow-inner">
            <Mail className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="inline-block px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-[11px] font-semibold text-amber-600 dark:text-amber-400">
              Email Verification Pending
            </span>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
              Verify Your Email Address
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              We dispatched an activation link to:
            </p>
            <p className="font-mono text-sm font-semibold text-indigo-600 dark:text-indigo-400 break-all px-3 py-1.5 rounded-lg bg-indigo-50/70 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-900">
              {user.email}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed pt-1">
              Please click the link in your email to verify your address and unlock the full ML Mastery Lab curriculum. Be sure to check your spam or promotions folder.
            </p>
          </div>

          {resendStatus.message && (
            <div
              className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                resendStatus.type === 'success'
                  ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                  : 'bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
              }`}
            >
              {resendStatus.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
              ) : (
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-500" />
              )}
              <span className="text-left">{resendStatus.message}</span>
            </div>
          )}

          <div className="space-y-3 pt-1">
            <button
              onClick={() => window.location.reload()}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-600/25"
            >
              <RefreshCw className="w-4 h-4" />
              <span>I&apos;ve Verified My Email — Refresh</span>
            </button>

            <button
              onClick={handleResend}
              disabled={resendCooldown > 0 || isResending}
              className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium text-xs transition-colors"
            >
              {isResending ? (
                <span>Sending...</span>
              ) : resendCooldown > 0 ? (
                <span>Resend email in {resendCooldown}s</span>
              ) : (
                <span>Resend Verification Email</span>
              )}
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <Link href="/" className="hover:text-indigo-500 transition-colors">
              Platform Home
            </Link>
            <button
              onClick={() => signOut()}
              className="flex items-center gap-1 text-slate-500 hover:text-rose-500 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated & email verified: Render content
  return <>{children}</>;
};

