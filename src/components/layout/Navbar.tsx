'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Search,
  Sun,
  Moon,
  Flame,
  Menu,
  Terminal,
  Clock,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { getProgress } from '@/lib/storage';

interface NavbarProps {
  onToggleSidebar?: () => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar, onOpenSearch }) => {
  const [isDark, setIsDark] = useState<boolean>(true);
  const [streak, setStreak] = useState<number>(1);
  const [studyMinutes, setStudyMinutes] = useState<number>(45);

  useEffect(() => {
    // Check initial theme from html class or system preference
    if (typeof window !== 'undefined') {
      const isDarkMode =
        document.documentElement.classList.contains('dark') ||
        localStorage.getItem('ml_theme') === 'dark' ||
        (!localStorage.getItem('ml_theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);

      if (isDarkMode) {
        document.documentElement.classList.add('dark');
        setIsDark(true);
      } else {
        document.documentElement.classList.remove('dark');
        setIsDark(false);
      }

      const syncProgress = () => {
        const progress = getProgress();
        setStreak(progress.streak.currentStreak);
        setStudyMinutes(progress.totalMinutesLearned);
      };

      syncProgress();
      window.addEventListener('ml_progress_updated', syncProgress);
      return () => window.removeEventListener('ml_progress_updated', syncProgress);
    }
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
  };

  const pathname = usePathname();
  const isDsa = pathname.startsWith('/dsa');
  const isPython = pathname.startsWith('/python');
  const isJava = pathname.startsWith('/java');
  const isMl = !isDsa && !isPython && !isJava;

  return (
    <header className="sticky top-0 z-30 h-14 border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between">
      {/* Left: Mobile hamburger & Brand */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-lg text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label="Toggle Navigation Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-600 to-indigo-600 flex items-center justify-center text-white font-bold text-base shadow-sm">
            ML
          </div>
        <div className="hidden sm:block">
          <span className="font-extrabold text-sm tracking-tight text-slate-900 dark:text-slate-100 block leading-tight">
            Learning Platform
          </span>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium block leading-tight">
            ML · DSA · Python · Java
          </span>
        </div>
        </Link>
      </div>

      {/* Track Selector Tabs (Desktop) */}
      <div className="hidden lg:flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl text-xs font-semibold">
        <Link
          href="/"
          className={`px-3 py-1 rounded-lg transition-all ${
            isMl
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 hover:bg-white dark:hover:bg-slate-700'
          }`}
        >
          ML Mastery
        </Link>
        <Link
          href="/dsa"
          className={`px-3 py-1 rounded-lg transition-all ${
            isDsa
              ? 'bg-violet-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:text-violet-600 hover:bg-white dark:hover:bg-slate-700'
          }`}
        >
          DSA Mastery
        </Link>
        <Link
          href="/python"
          className={`px-3 py-1 rounded-lg transition-all ${
            isPython
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600 hover:bg-white dark:hover:bg-slate-700'
          }`}
        >
          Python Mastery
        </Link>
        <Link
          href="/java"
          className={`px-3 py-1 rounded-lg transition-all ${
            isJava
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:text-amber-600 hover:bg-white dark:hover:bg-slate-700'
          }`}
        >
          Java Mastery
        </Link>
      </div>

      {/* Middle: Global Search bar pill */}
      <div className="flex-1 max-w-xs mx-4 hidden md:block">
        <button
          onClick={onOpenSearch}
          className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-400 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-600 dark:hover:text-slate-300 transition-colors text-xs"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5" />
            <span>Search ML, DSA & Python...</span>
          </div>
          <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-[10px] font-mono">
            Ctrl+K
          </kbd>
        </button>
      </div>

      {/* Right: Badges, Theme Toggle & Code Lab Shortcut */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={onOpenSearch}
          className="md:hidden p-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 rounded-lg"
          aria-label="Search"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Streak Pill */}
        <div
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-amber-600 dark:text-amber-400 text-xs font-semibold"
          title="Daily Learning Streak"
        >
          <Flame className="w-3.5 h-3.5 fill-current animate-bounce" />
          <span>{streak}d</span>
        </div>

        {/* Study Time Pill */}
        <div
          className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium"
          title="Total Minutes Learned"
        >
          <Clock className="w-3 h-3 text-slate-400" />
          <span>{studyMinutes}m</span>
        </div>

        {/* Visual Short Notes shortcut */}
        <Link
          href="/revision-notes"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-900 text-xs font-medium hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-500" />
          <span className="hidden sm:inline">Short Notes</span>
        </Link>

        {/* Code Lab shortcut */}
        <Link
          href="/code-lab"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-900 text-xs font-medium hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
        >
          <Terminal className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Code Lab</span>
        </Link>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Toggle Theme"
        >
          {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
        </button>
      </div>
    </header>
  );
};
