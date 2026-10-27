'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Brain,
  BookOpen,
  Sliders,
  Terminal,
  Calculator,
  CheckSquare,
  Briefcase,
  Bookmark,
  BarChart2,
  Settings,
  ChevronRight,
  Flame,
  Clock,
  Menu,
  Sun,
  Moon,
  Search,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Zap,
} from 'lucide-react';
import { MODULES_CATALOG } from '@/data/modules/curriculum';
import { getProgress } from '@/lib/storage';
import { getMLProgress } from '@/data/learningPlatformConfig';
import { UserProgressState } from '@/lib/types';
import { SearchModal } from './SearchModal';

const ML_NAV_ITEMS = [
  { name: 'ML Curriculum', href: '/curriculum', icon: BookOpen },
  { name: 'Visual Short Notes', href: '/revision-notes', icon: Zap },
  { name: 'ML Visual Playground', href: '/playground', icon: Sliders },
  { name: 'Python Code Lab', href: '/code-lab', icon: Terminal },
  { name: 'Formula Explorer', href: '/formulas', icon: Calculator },
  { name: 'ML Quiz Center', href: '/quizzes', icon: CheckSquare },
  { name: 'Capstone Projects', href: '/projects', icon: Briefcase },
  { name: 'Bookmarks & Notes', href: '/notes', icon: Bookmark },
  { name: 'Learning Analytics', href: '/analytics', icon: BarChart2 },
  { name: 'ML Settings', href: '/settings', icon: Settings },
];

export const MLLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [progress, setProgress] = useState<UserProgressState | null>(null);
  const [isDark, setIsDark] = useState<boolean>(true);
  const pathname = usePathname();

  useEffect(() => {
    const syncState = () => {
      const current = getProgress();
      setProgress(current);
    };

    syncState();
    window.addEventListener('ml_progress_updated', syncState);

    const syncTheme = () => {
      const isDarkMode = document.documentElement.classList.contains('dark');
      setIsDark(isDarkMode);
    };

    if (typeof window !== 'undefined') {
      const isDarkMode =
        document.documentElement.classList.contains('dark') ||
        localStorage.getItem('ml_theme') === 'dark';
      setIsDark(isDarkMode);
    }

    window.addEventListener('ml_theme_changed', syncTheme);
    return () => {
      window.removeEventListener('ml_progress_updated', syncState);
      window.removeEventListener('ml_theme_changed', syncTheme);
    };
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('ml_theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('ml_theme', 'dark');
      setIsDark(true);
    }
    window.dispatchEvent(new Event('ml_theme_changed'));
  };

  const mlProgress = getMLProgress(progress);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased font-sans">
      {/* ML Environment Navbar */}
      <header className="sticky top-0 z-30 h-14 border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen((prev) => !prev)}
            className="lg:hidden p-2 rounded-lg text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Toggle ML Navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link href="/" className="flex items-center gap-2 group text-xs text-slate-400 hover:text-indigo-400 transition-colors mr-1">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span className="hidden sm:inline font-medium">Platform Home</span>
          </Link>

          <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block" />

          <Link href="/curriculum" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
              <Brain className="w-4 h-4" />
            </div>
            <div>
              <span className="font-extrabold text-sm tracking-tight text-slate-900 dark:text-slate-100 block leading-tight">
                ML Mastery Lab
              </span>
              <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold block leading-tight">
                Machine Learning Environment
              </span>
            </div>
          </Link>
        </div>

        {/* Middle Search Pill */}
        <div className="flex-1 max-w-xs mx-4 hidden md:block">
          <button
            onClick={() => setSearchOpen(true)}
            className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-400 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-600 dark:hover:text-slate-300 transition-colors text-xs"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5" />
              <span>Search ML Lessons &amp; Formulas...</span>
            </div>
            <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-[10px] font-mono">
              Ctrl+K
            </kbd>
          </button>
        </div>

        {/* Right Indicators & Quick Links */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <button
            onClick={() => setSearchOpen(true)}
            className="md:hidden p-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 rounded-lg"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Daily Streak */}
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-amber-600 dark:text-amber-400 text-xs font-semibold"
            title="Daily Learning Streak"
          >
            <Flame className="w-3.5 h-3.5 fill-current" />
            <span>{progress?.streak.currentStreak || 1}d</span>
          </div>

          {/* Study Minutes */}
          <div
            className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium"
            title="Total Study Minutes"
          >
            <Clock className="w-3 h-3 text-slate-400" />
            <span>{progress?.totalMinutesLearned || 45}m</span>
          </div>

          {/* Visual Notes Shortcut */}
          <Link
            href="/revision-notes"
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-900 text-xs font-medium hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
          >
            <Zap className="w-3.5 h-3.5 text-indigo-500" />
            <span>Notes</span>
          </Link>

          {/* Playground Shortcut */}
          <Link
            href="/playground"
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-900 text-xs font-medium hover:bg-cyan-100 dark:hover:bg-cyan-900/50 transition-colors"
          >
            <Sliders className="w-3.5 h-3.5 text-cyan-500" />
            <span>Playground</span>
          </Link>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>
        </div>
      </header>

      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ML Environment Sidebar */}
      <aside
        className={`fixed top-14 bottom-0 left-0 z-40 w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } flex flex-col justify-between overflow-y-auto`}
      >
        <div className="p-4 space-y-5">
          {/* Back to Platform Home Link */}
          <Link
            href="/"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold transition-colors border border-slate-200 dark:border-slate-700/60"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Platform Dashboard</span>
          </Link>

          {/* ML Navigation Section */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-2 block mb-1.5">
              ML Environment Tools
            </span>
            {ML_NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* ML Curriculum 12 Modules */}
          <div className="space-y-1 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between px-2 mb-1.5">
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                12 ML Curriculum Modules
              </span>
              <span className="text-[10px] font-mono text-indigo-500 dark:text-indigo-400">
                107 Lessons
              </span>
            </div>

            <div className="space-y-0.5">
              {MODULES_CATALOG.map((mod) => {
                const isActive = pathname.startsWith(`/curriculum/${mod.id}`);
                return (
                  <Link
                    key={mod.id}
                    href={`/curriculum/${mod.id}`}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[11px] transition-colors ${
                      isActive
                        ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="w-4 text-center font-mono text-[10px] text-slate-400">
                        {mod.number}
                      </span>
                      <span className="truncate">{mod.title}</span>
                    </div>
                    <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar Footer: ML Progress */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500" />
                <span>ML Progress</span>
              </span>
              <span className="font-mono font-semibold text-slate-900 dark:text-slate-100">
                {mlProgress.percentage}%
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-indigo-600 transition-all duration-300"
                style={{ width: `${mlProgress.percentage}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-400 block text-right font-mono">
              {mlProgress.completedLessons} / {mlProgress.totalLessons} lessons completed
            </span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="lg:pl-64 transition-all min-h-[calc(100vh-3.5rem)]">
        {children}
      </main>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
};

