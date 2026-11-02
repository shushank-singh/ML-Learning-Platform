'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  TreePine,
  Code2,
  Coffee,
  Cpu,
  Bot,
  Activity,
  Server,
  Layers,
  Calculator,
  ChevronRight,
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
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [progress, setProgress] = useState<UserProgressState | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);

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

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const aiMlTracks = [
    { title: 'Machine Learning Core', href: '/curriculum', icon: Brain, badge: 'Phase 0-4', desc: 'Regression, Classification, SVM, Clustering' },
    { title: 'Deep Learning & Neural Networks', href: '/curriculum', icon: Cpu, badge: 'Phase 5', desc: 'Backprop, CNNs, RNNs & PyTorch' },
    { title: 'Transformers & LLM Foundations', href: '/curriculum', icon: Layers, badge: 'Phase 6', desc: 'Self-Attention, BERT, GPT Architectures' },
    { title: 'Generative AI & LLM Systems', href: '/curriculum', icon: Sparkles, badge: 'Phase 7', desc: 'Fine-Tuning, LoRA, Quantization, RLHF' },
    { title: 'RAG & Vector Search', href: '/curriculum', icon: Activity, badge: 'Phase 8', desc: 'Embeddings, Hybrid Search & Pinecone' },
    { title: 'Autonomous AI Agents', href: '/curriculum', icon: Bot, badge: 'Phase 9', desc: 'ReAct, Tool Calling, Multi-Agent Swarms' },
    { title: 'MLOps & LLMOps', href: '/curriculum', icon: Sliders, badge: 'Phase 10', desc: 'Pipelines, CI/CD, MLflow & Monitoring' },
    { title: 'AI Deployment & Cloud', href: '/curriculum', icon: Server, badge: 'Phase 11', desc: 'Triton, ONNX, FastAPI & AWS/GCP' },
  ];

  const programmingTracks = [
    { title: 'Data Structures & Algorithms', href: '/dsa', icon: TreePine, badge: '13 Topics', desc: 'Trees, Graphs, DP & Big-O Masterclass' },
    { title: 'Python Programming', href: '/python', icon: Code2, badge: '10 Modules', desc: 'CPython Internals, OOP & Pyodide In-Browser' },
    { title: 'Java Programming', href: '/java', icon: Coffee, badge: '8 Modules', desc: 'JVM Architecture, Memory Model & Concurrency' },
  ];

  const practiceAndTools = [
    { title: 'Interactive Coding Hub', href: '/#coding-hub', icon: Terminal, desc: 'Multi-language live execution for Python, Java & DSA' },
    { title: 'AI & ML Playground', href: '/playground', icon: Sliders, desc: 'Interactive hyperparameter & model simulation' },
    { title: 'Python Code Lab', href: '/code-lab', icon: Code2, desc: 'Interactive in-browser Pyodide sandbox' },
    { title: 'Capstone Projects', href: '/projects', icon: Briefcase, desc: 'Production-grade ML & Full-Stack portfolios' },
    { title: 'Quizzes & Assessments', href: '/quizzes', icon: CheckSquare, desc: 'Track-wide conceptual quizzes and knowledge checks' },
    { title: 'Visual Revision Notes', href: '/revision-notes', icon: Zap, desc: 'Cheat sheets, diagrams and quick concept cards' },
    { title: 'Mathematical Formulas', href: '/formulas', icon: Calculator, desc: 'Equations, derivations and proof references' },
  ];

  const toggleDropdown = (name: string) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  return (
    <>
      <header
        ref={navRef}
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          scrolled
            ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-sm border-b border-slate-200/90 dark:border-slate-800'
            : 'bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-800/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 gap-1.5 sm:gap-3">
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
              <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
                {/* 1. AI & ML Tracks Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => toggleDropdown('aiml')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                      activeDropdown === 'aiml' || pathname.startsWith('/curriculum')
                        ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40'
                        : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Brain className="w-3.5 h-3.5 text-indigo-500" />
                    <span>AI & ML Tracks</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'aiml' ? 'rotate-180' : ''}`} />
                  </button>

                  {activeDropdown === 'aiml' && (
                    <div className="absolute left-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                          8 Curriculum Phases
                        </span>
                        <Link
                          href="/curriculum"
                          onClick={() => setActiveDropdown(null)}
                          className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                        >
                          View All <ChevronRight className="w-3 h-3" />
                        </Link>
                      </div>
                      <div className="max-h-[380px] overflow-y-auto py-1 space-y-0.5">
                        {aiMlTracks.map((track) => {
                          const Icon = track.icon;
                          return (
                            <Link
                              key={track.title}
                              href={track.href}
                              onClick={() => setActiveDropdown(null)}
                              className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-indigo-50/70 dark:hover:bg-slate-800 transition-colors group"
                            >
                              <div className="w-7 h-7 rounded-lg bg-indigo-100/70 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between gap-1">
                                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 truncate">
                                    {track.title}
                                  </span>
                                  <span className="text-[10px] font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-1.5 py-0.5 rounded-md shrink-0">
                                    {track.badge}
                                  </span>
                                </div>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                                  {track.desc}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. Programming & Computer Science Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => toggleDropdown('cs')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                      activeDropdown === 'cs' || pathname.startsWith('/dsa') || pathname.startsWith('/python') || pathname.startsWith('/java')
                        ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40'
                        : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Code2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Programming &amp; CS</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'cs' ? 'rotate-180' : ''}`} />
                  </button>

                  {activeDropdown === 'cs' && (
                    <div className="absolute left-0 mt-2 w-80 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                          Core CS Tracks
                        </span>
                      </div>
                      <div className="py-1 space-y-1">
                        {programmingTracks.map((track) => {
                          const Icon = track.icon;
                          return (
                            <Link
                              key={track.title}
                              href={track.href}
                              onClick={() => setActiveDropdown(null)}
                              className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-emerald-50/70 dark:hover:bg-slate-800 transition-colors group"
                            >
                              <div className="w-8 h-8 rounded-lg bg-emerald-100/70 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between gap-1">
                                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 truncate">
                                    {track.title}
                                  </span>
                                  <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded-md shrink-0">
                                    {track.badge}
                                  </span>
                                </div>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                                  {track.desc}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. Practice & Projects Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => toggleDropdown('practice')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                      activeDropdown === 'practice' ||
                      pathname.startsWith('/playground') ||
                      pathname.startsWith('/code-lab') ||
                      pathname.startsWith('/projects') ||
                      pathname.startsWith('/quizzes') ||
                      pathname.startsWith('/revision-notes') ||
                      pathname.startsWith('/formulas')
                        ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40'
                        : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Sliders className="w-3.5 h-3.5 text-cyan-500" />
                    <span>Practice &amp; Tools</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'practice' ? 'rotate-180' : ''}`} />
                  </button>

                  {activeDropdown === 'practice' && (
                    <div className="absolute left-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                          Practice Hub &amp; Blueprints
                        </span>
                      </div>
                      <div className="max-h-[380px] overflow-y-auto py-1 space-y-0.5">
                        {practiceAndTools.map((item) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={item.title}
                              href={item.href}
                              onClick={() => setActiveDropdown(null)}
                              className="flex items-start gap-3 p-2 rounded-xl hover:bg-cyan-50/70 dark:hover:bg-slate-800 transition-colors group"
                            >
                              <div className="w-7 h-7 rounded-lg bg-cyan-100/70 dark:bg-cyan-950/70 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <span className="text-xs font-semibold text-slate-800 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 block truncate">
                                  {item.title}
                                </span>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                                  {item.desc}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* 4. Learning Journey Roadmap Link */}
                <Link
                  href="/#learning-journey"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <Compass className="w-3.5 h-3.5 text-violet-500" />
                  <span>Roadmap</span>
                </Link>

                {/* 5. AI Tutor Direct Link */}
                <Link
                  href="/ai-tutor"
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    pathname.startsWith('/ai-tutor')
                      ? 'text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-950/40'
                      : 'text-slate-600 dark:text-slate-300 hover:text-pink-600 dark:hover:text-pink-400 hover:bg-slate-100 dark:hover:bg-slate-800'
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
                  <span className="font-medium">Search curriculum...</span>
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
                  className="lg:hidden w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
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
          <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white/98 dark:bg-slate-900/98 backdrop-blur-xl transition-all shadow-xl">
            <div className="px-4 pt-4 pb-6 space-y-4 max-h-[85vh] overflow-y-auto">
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

              {/* Section 1: Quick Navigation */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 block mb-1">
                  Home &amp; Roadmap
                </span>
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                    pathname === '/'
                      ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4 text-indigo-500" />
                  <span>Dashboard Home</span>
                </Link>
                <Link
                  href="/curriculum"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                    pathname.startsWith('/curriculum')
                      ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <BookOpen className="w-4 h-4 text-indigo-500" />
                  <span>My Learning (All Modules)</span>
                </Link>
                <Link
                  href="/#learning-journey"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <Compass className="w-4 h-4 text-violet-500" />
                  <span>Learning Journey Roadmap</span>
                </Link>
              </div>

              {/* Section 2: Programming & Computer Science */}
              <div className="space-y-1 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider px-3 block mb-1">
                  💻 Programming &amp; Computer Science
                </span>
                {programmingTracks.map((track) => {
                  const Icon = track.icon;
                  const isActive = pathname.startsWith(track.href);
                  return (
                    <Link
                      key={track.title}
                      href={track.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                        isActive
                          ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400'
                          : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4 text-emerald-500" />
                        <span>{track.title}</span>
                      </div>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded">
                        {track.badge}
                      </span>
                    </Link>
                  );
                })}
              </div>

              {/* Section 3: AI & Machine Learning Tracks */}
              <div className="space-y-1 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider px-3 block mb-1">
                  🤖 AI &amp; Machine Learning Tracks
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                  {aiMlTracks.map((track) => {
                    const Icon = track.icon;
                    return (
                      <Link
                        key={track.title}
                        href={track.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        <Icon className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                        <span className="truncate">{track.title}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Section 4: Practice, Projects & Tools */}
              <div className="space-y-1 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[10px] font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider px-3 block mb-1">
                  🧪 Practice, Projects &amp; Tools
                </span>
                {practiceAndTools.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                  return (
                    <Link
                      key={item.title}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                        isActive
                          ? 'bg-cyan-50 dark:bg-cyan-950/50 text-cyan-600 dark:text-cyan-400'
                          : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-cyan-500" />
                      <span>{item.title}</span>
                    </Link>
                  );
                })}
                <Link
                  href="/ai-tutor"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                    pathname.startsWith('/ai-tutor')
                      ? 'bg-pink-50 dark:bg-pink-950/50 text-pink-600 dark:text-pink-400'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-pink-500" />
                  <span>AI Tutor &amp; Mentorship</span>
                </Link>
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
