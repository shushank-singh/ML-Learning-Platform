'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Stethoscope,
  Box,
  PlayCircle,
  BookOpen,
  ClipboardCheck,
  CheckSquare,
  ShieldAlert,
  ArrowLeft,
  Menu,
  X,
  CheckCircle2,
  Cpu,
} from 'lucide-react';
import { UserMenu } from '@/components/auth/UserMenu';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { AzurLearnLogo } from '@/components/shared/AzurLearnLogo';
import { MBBS_CURRICULUM_STATS, MBBS_TOPICS_CATALOG } from '@/data/medverse';
import { getMedVerseProgress, syncMedVerseProgressFromCloud } from '@/lib/medverse/progress';
import { useAuth } from '@/context/AuthContext';
import { MedVerseUserProgress } from '@/types/medverse';

const MEDVERSE_NAV_ITEMS = [
  { name: 'Doctor Dashboard', href: '/doctor', icon: Stethoscope, exact: true },
  { name: '3D Anatomy Atlas', href: '/doctor/anatomy', icon: Box },
  { name: 'Animation Studio', href: '/doctor/animations', icon: PlayCircle },
  { name: 'MBBS Curriculum', href: '/doctor/curriculum', icon: BookOpen },
  { name: 'Clinical Cases', href: '/doctor/cases', icon: ClipboardCheck },
  { name: 'Quizzes & Flashcards', href: '/doctor/quizzes', icon: CheckSquare },
  { name: 'Content Studio (Admin)', href: '/doctor/studio', icon: ShieldAlert },
];

export const MedVerseLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname() || '/doctor';
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [progress, setProgress] = useState<MedVerseUserProgress | null>(null);

  useEffect(() => {
    const syncLocal = () => setProgress(getMedVerseProgress());
    syncLocal();
    window.addEventListener('medverse_progress_updated', syncLocal);
    if (user) {
      void syncMedVerseProgressFromCloud();
    }
    return () => window.removeEventListener('medverse_progress_updated', syncLocal);
  }, [user]);

  const publishedTopics = MBBS_TOPICS_CATALOG.filter((t) => t.status === 'published');
  const completedCount = progress
    ? publishedTopics.filter((t) => progress.completedTopics[t.id]).length
    : 0;
  const pct =
    publishedTopics.length > 0
      ? Math.round((completedCount / publishedTopics.length) * 100)
      : 0;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased font-sans transition-colors duration-200">
      {/* Top Bar */}
      <header className="sticky top-0 z-30 h-14 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between transition-colors">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setSidebarOpen((p) => !p)}
            className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Toggle MedVerse Navigation"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link
            href="/doctor"
            className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline font-medium">MedVerse Home</span>
          </Link>

          <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block" />

          <Link href="/doctor" className="flex items-center group">
            <AzurLearnLogo size="sm" subtitle="MedVerse 3D · MBBS Academy" />
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/engineering"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500/60 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors"
          >
            <Cpu className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
            <span>Engineering Platform</span>
          </Link>
          <ThemeToggle showLabel={false} className="p-2 rounded-xl" />
          <UserMenu />
        </div>
      </header>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/50 dark:bg-slate-950/70 backdrop-blur-xs lg:hidden"
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
            <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider px-2 block mb-1.5">
              MedVerse 3D Workspace
            </span>
            {MEDVERSE_NAV_ITEMS.map((item) => {
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
                      ? 'bg-teal-600 text-white shadow-sm'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Published Interactive Topics Quick Jump */}
          <div className="space-y-1 pt-3 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between px-2 mb-1.5">
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Published Topics
              </span>
              <span className="text-[10px] font-mono text-teal-600 dark:text-teal-400">
                {MBBS_CURRICULUM_STATS.publishedTopicsCount}/{MBBS_CURRICULUM_STATS.totalTopicsCount}
              </span>
            </div>

            <div className="space-y-0.5">
              {publishedTopics.map((topic) => {
                const isDone = Boolean(progress?.completedTopics?.[topic.id]);
                const isActive = pathname === `/doctor/topics/${topic.id}`;
                return (
                  <Link
                    key={topic.id}
                    href={`/doctor/topics/${topic.id}`}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg text-[11px] transition-colors ${
                      isActive
                        ? 'bg-teal-50 dark:bg-teal-950/70 text-teal-700 dark:text-teal-300 font-semibold border border-teal-200 dark:border-teal-800/70'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-900'
                    }`}
                  >
                    <span className="truncate">{topic.title}</span>
                    {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0" />}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Real Progress Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-600 dark:text-slate-400 font-medium">Published Topics</span>
            <span className="font-mono font-bold text-teal-600 dark:text-teal-300">{pct}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-teal-500 to-cyan-400 transition-all duration-300"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="text-[10px] text-slate-500 block font-mono text-right">
            {completedCount} / {publishedTopics.length} completed
          </span>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:pl-64 min-h-[calc(100vh-3.5rem)]">{children}</main>
    </div>
  );
};
