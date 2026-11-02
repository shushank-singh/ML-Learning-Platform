'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Brain,
  BookOpen,
  Briefcase,
  Compass,
  Sliders,
  Terminal,
  Zap,
  CheckSquare,
  Sparkles,
  Search,
  Menu,
  X,
  Flame,
  Clock,
  LogIn,
  UserPlus,
  ChevronDown,
  LayoutDashboard,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { getProgress } from '@/lib/storage';
import { UserProgressState } from '@/lib/types';
import { UserMenu } from '@/components/auth/UserMenu';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { AzurLearnLogo } from '@/components/shared/AzurLearnLogo';
import { SearchModal } from './SearchModal';

interface NavbarProps {
  isAuthPage?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ isAuthPage = false }) => {
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [progress, setProgress] = useState<UserProgressState | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const syncState = () => {
      setProgress(getProgress());
    };
    syncState();
    window.addEventListener('ml_progress_updated', syncState);
    return () => window.removeEventListener('ml_progress_updated', syncState);
  }, []);

  // Keyboard shortcut listener for Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: 'Learning Tracks', href: '/curriculum', icon: BookOpen },
    { label: 'Learning Journey', href: '/#learning-journey', icon: Compass },
    { label: 'Projects', href: '/projects', icon: Briefcase },
    { label: 'AI & ML Playground', href: '/playground', icon: Sliders },
    { label: 'Python Code Lab', href: '/code-lab', icon: Terminal },
    { label: 'Visual Notes', href: '/revision-notes', icon: Zap },
    { label: 'Quizzes', href: '/quizzes', icon: CheckSquare },
    { label: 'AI Tutor', href: '/ai-tutor', icon: Sparkles },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          scrolled
            ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-sm border-b border-slate-200/90 dark:border-slate-800'
            : 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-800/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 gap-1.5 sm:gap-4">
            {/* Left: AzurLearn Brand Logo */}
            <div className="flex items-center shrink-0 min-w-0">
              <Link
                href="/"
                className="flex items-center group focus:outline-none"
                aria-label="AzurLearn Home"
              >
                <AzurLearnLogo size="md" />
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            {!isAuthPage && (
              <nav className="hidden xl:flex items-center gap-1">
                <Link
                  href="/curriculum"
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    pathname.startsWith('/curriculum')
                      ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40'
                      : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Learning Tracks</span>
                </Link>

                <Link
                  href="/#learning-journey"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <Compass className="w-3.5 h-3.5 text-violet-500" />
                  <span>Roadmap</span>
                </Link>

                <Link
                  href="/projects"
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    pathname.startsWith('/projects')
                      ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40'
                      : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5 text-blue-500" />
                  <span>Projects</span>
                </Link>

                <Link
                  href="/playground"
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    pathname.startsWith('/playground')
                      ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40'
                      : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Sliders className="w-3.5 h-3.5 text-cyan-500" />
                  <span>Playground</span>
                </Link>

                <Link
                  href="/code-lab"
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    pathname.startsWith('/code-lab')
                      ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40'
                      : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Code Lab</span>
                </Link>

                <Link
                  href="/revision-notes"
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    pathname.startsWith('/revision-notes')
                      ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40'
                      : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>Notes</span>
                </Link>

                <Link
                  href="/quizzes"
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    pathname.startsWith('/quizzes')
                      ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40'
                      : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <CheckSquare className="w-3.5 h-3.5 text-purple-500" />
                  <span>Quizzes</span>
                </Link>

                <Link
                  href="/ai-tutor"
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    pathname.startsWith('/ai-tutor')
                      ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40'
                      : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                  <span>AI Tutor</span>
                </Link>
              </nav>
            )}

            {/* Right: Actions, Search, Theme, Auth */}
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              {/* Global Search Button */}
              {!isAuthPage && (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="hidden md:flex items-center gap-2 px-3 py-1.5 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200/80 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-xl transition-all shadow-xs"
                  aria-label="Search lessons and topics"
                >
                  <Search className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-medium">Search lessons...</span>
                  <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded text-slate-400">
                    Ctrl+K
                  </kbd>
                </button>
              )}

              {/* Mobile search icon button */}
              {!isAuthPage && (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="md:hidden w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors shrink-0"
                  aria-label="Search"
                >
                  <Search className="w-4 h-4" />
                </button>
              )}

              {/* Logged-in Streak and Minutes indicator */}
              {user && (
                <div className="hidden sm:flex items-center gap-2">
                  <div
                    className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-amber-700 dark:text-amber-400 text-xs font-semibold"
                    title="Daily Learning Streak"
                  >
                    <Flame className="w-3.5 h-3.5 fill-current text-amber-500" />
                    <span>{progress?.streak.currentStreak || 1}d</span>
                  </div>
                  <div
                    className="hidden lg:flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium"
                    title="Total Study Minutes"
                  >
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{progress?.totalMinutesLearned || 45}m</span>
                  </div>
                </div>
              )}

              {/* Theme Switcher */}
              <ThemeToggle showLabel={false} className="w-8 h-8 sm:w-auto sm:h-auto p-1.5 sm:p-2.5 rounded-xl justify-center shrink-0" />

              {/* User Account or Sign In */}
              {!isAuthPage && (
                <div className="flex items-center shrink-0">
                  <UserMenu />
                </div>
              )}

              {/* Mobile Menu Hamburger */}
              {!isAuthPage && (
                <button
                  onClick={() => setMobileMenuOpen((prev) => !prev)}
                  className="xl:hidden w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
                  aria-label="Toggle navigation menu"
                  aria-expanded={mobileMenuOpen}
                >
                  {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Responsive Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-slate-200 dark:border-slate-800 bg-white/98 dark:bg-slate-900/98 backdrop-blur-xl transition-all shadow-xl">
            <div className="px-4 pt-4 pb-6 space-y-3 max-h-[85vh] overflow-y-auto">
              {/* Quick Search in Drawer */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSearchOpen(true);
                }}
                className="w-full flex items-center justify-between px-3.5 py-2.5 text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
              >
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-indigo-500" />
                  <span className="font-medium">Search curriculum, topics, code...</span>
                </div>
                <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded">
                  Ctrl+K
                </kbd>
              </button>

              {/* Nav links with icons */}
              <div className="space-y-1 pt-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 block mb-1">
                  Learning Navigation
                </span>
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                        isActive
                          ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400'
                          : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-indigo-500" />
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Auth actions if logged out */}
              {!user && (
                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-xl transition-colors min-h-[44px]"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Sign In</span>
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm transition-colors min-h-[44px]"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Sign Up</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

