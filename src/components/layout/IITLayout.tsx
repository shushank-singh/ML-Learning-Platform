'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  GraduationCap,
  BookOpen,
  Calculator,
  CheckSquare,
  Timer,
  CalendarClock,
  BarChart3,
  Sparkles,
  ArrowLeft,
  Menu,
  X,
  CheckCircle2,
  Cpu,
  Stethoscope,
  Flame,
} from 'lucide-react';
import { UserMenu } from '@/components/auth/UserMenu';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { AzurLearnLogo } from '@/components/shared/AzurLearnLogo';
import { IIT_CHAPTERS } from '@/data/iit';
import { computeIITDashboardAnalytics } from '@/lib/iit/analytics';
import { getIITProgress, syncIITProgressFromCloud } from '@/lib/iit/progress';
import { useAuth } from '@/context/AuthContext';
import { IITUserProgress } from '@/types/iit';

const IIT_NAV_ITEMS = [
  { name: 'JEE Dashboard', href: '/iit', icon: GraduationCap, exact: true },
  { name: 'Complete Syllabus', href: '/iit/syllabus', icon: BookOpen },
  { name: 'Formula Vault', href: '/iit/formulas', icon: Calculator },
  { name: 'Practice & PYQs', href: '/iit/practice', icon: CheckSquare },
  { name: 'CBT Mock Tests', href: '/iit/mock-tests', icon: Timer },
  { name: 'Revision & SM-2', href: '/iit/planner', icon: CalendarClock },
  { name: 'Analytics', href: '/iit/analytics', icon: BarChart3 },
  { name: 'IIT AI Tutor', href: '/iit/ai-tutor', icon: Sparkles },
];

export const IITLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname() || '/iit';
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [progress, setProgress] = useState<IITUserProgress | null>(null);

  useEffect(() => {
    const syncLocal = () => setProgress(getIITProgress());
    syncLocal();
    window.addEventListener('iit_progress_updated', syncLocal);
    if (user) {
      void syncIITProgressFromCloud();
    }
    return () => window.removeEventListener('iit_progress_updated', syncLocal);
  }, [user]);

  const analytics = useMemo(
    () => (progress ? computeIITDashboardAnalytics(progress) : null),
    [progress]
  );

  const highYieldChapters = useMemo(
    () => IIT_CHAPTERS.filter((c) => c.syllabusStatus === 'full_mastery').slice(0, 14),
    []
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased font-sans transition-colors duration-200">
      {/* Top Bar */}
      <header className="sticky top-0 z-30 h-14 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between transition-colors">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setSidebarOpen((p) => !p)}
            className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Toggle IIT JEE Navigation"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline font-medium">Hub</span>
          </Link>

          <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block" />

          <Link href="/iit" className="flex items-center group">
            <AzurLearnLogo size="sm" subtitle="IIT JEE · Main & Advanced" />
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {analytics && (
            <div
              className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/70 text-amber-700 dark:text-amber-300 text-xs font-semibold"
              title="Real Active Study Streak"
            >
              <Flame className="w-3.5 h-3.5 fill-current text-amber-500" />
              <span>{analytics.streakDays}d</span>
            </div>
          )}

          <Link
            href="/engineering"
            className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:border-indigo-400 transition-colors"
          >
            <Cpu className="w-3.5 h-3.5 text-indigo-500" />
            <span>Engineering</span>
          </Link>
          <Link
            href="/doctor"
            className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:border-teal-400 transition-colors"
          >
            <Stethoscope className="w-3.5 h-3.5 text-teal-500" />
            <span>Doctor</span>
          </Link>
          <ThemeToggle showLabel={false} className="p-2 rounded-xl" />
          <UserMenu />
        </div>
      </header>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-xs lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Left Sidebar */}
      <aside
        className={`fixed top-14 bottom-0 left-0 z-40 w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } flex flex-col justify-between overflow-y-auto`}
      >
        <div className="p-4 space-y-5">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider px-2 block mb-1.5">
              IIT JEE Workspace
            </span>
            {IIT_NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = item.exact
                ? pathname === item.href
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Quick Jump to High-Yield Chapters */}
          <div className="space-y-1 pt-3 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between px-2 mb-1.5">
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Core JEE Chapters
              </span>
              <Link
                href="/iit/syllabus"
                onClick={() => setSidebarOpen(false)}
                className="text-[10px] font-semibold text-amber-600 dark:text-amber-400 hover:underline"
              >
                All {IIT_CHAPTERS.length}
              </Link>
            </div>
            <div className="space-y-0.5 max-h-60 overflow-y-auto pr-1">
              {highYieldChapters.map((ch) => {
                const isDone = Boolean(progress?.completedChapters?.[ch.id]);
                const isActive = pathname === `/iit/chapters/${ch.id}`;
                return (
                  <Link
                    key={ch.id}
                    href={`/iit/chapters/${ch.id}`}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg text-[11px] transition-colors ${
                      isActive
                        ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 font-semibold border border-amber-200 dark:border-amber-800/70'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-900'
                    }`}
                  >
                    <span className="truncate">{ch.title}</span>
                    {isDone && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Real Progress Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-600 dark:text-slate-400 font-medium">
              {progress?.targetExam || 'Both'} Syllabus
            </span>
            <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
              {analytics?.overallCompletionPct ?? 0}%
            </span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300"
              style={{ width: `${analytics?.overallCompletionPct ?? 0}%` }}
            />
          </div>
          <span className="text-[10px] text-slate-500 block font-mono text-right">
            {analytics?.completedChaptersCount ?? 0} / {analytics?.applicableChaptersCount ?? IIT_CHAPTERS.length} chapters
          </span>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:pl-64 min-h-[calc(100vh-3.5rem)]">{children}</main>
    </div>
  );
};
