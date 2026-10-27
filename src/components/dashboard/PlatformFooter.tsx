'use client';

import React from 'react';
import Link from 'next/link';
import {
  Brain,
  Cpu,
  Terminal,
  Coffee,
  Sparkles,
  Sliders,
  Calculator,
  Briefcase,
  CheckSquare,
  BarChart2,
  Bookmark,
  Settings,
  Zap,
} from 'lucide-react';

export const PlatformFooter: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 rounded-t-3xl pt-12 pb-10 px-6 sm:px-10 text-slate-600 dark:text-slate-400 transition-colors duration-200">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand & Mission Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 to-indigo-600 flex items-center justify-center text-white font-extrabold text-base shadow-md">
                ML
              </div>
              <div>
                <span className="font-extrabold text-base text-slate-900 dark:text-slate-100 block tracking-tight">
                  ML Mastery Lab
                </span>
                <span className="text-[11px] text-slate-500 font-medium block">
                  Interactive Engineering &amp; Algorithms Platform
                </span>
              </div>
            </Link>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-light max-w-sm">
              An open, production-quality educational platform designed to master machine learning, algorithms, and software engineering through first-principles mathematics, step-by-step visualizers, runnable code, and real-world architectures.
            </p>

            <div className="flex items-center gap-3 text-xs">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                4 Active Tracks
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                434 Lessons
              </span>
            </div>
          </div>

          {/* Learning Tracks */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
              Learning Tracks
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/curriculum"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5"
                >
                  <Brain className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span>Machine Learning</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dsa"
                  className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors flex items-center gap-1.5"
                >
                  <Cpu className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
                  <span>DSA Mastery Lab</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/python"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <Terminal className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Python Mastery</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/java"
                  className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <Coffee className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  <span>Java Mastery</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Interactive Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
              Interactive Laboratories
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/revision-notes"
                  className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center gap-1.5"
                >
                  <Zap className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                  <span>Visual Short Notes</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/playground"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5"
                >
                  <Sliders className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span>ML Visual Playground</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/code-lab"
                  className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                >
                  <Terminal className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  <span>Python Code Lab</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/formulas"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <Calculator className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Formula Explorer</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <Briefcase className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  <span>Capstone Projects</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Student Hub & Settings */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
              Student Workspace
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/quizzes"
                  className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors flex items-center gap-1.5"
                >
                  <CheckSquare className="w-3.5 h-3.5" />
                  <span>Quiz Center</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/analytics"
                  className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors flex items-center gap-1.5"
                >
                  <BarChart2 className="w-3.5 h-3.5" />
                  <span>Learning Analytics</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/notes"
                  className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors flex items-center gap-1.5"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>Bookmarks &amp; Notes</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/settings"
                  className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors flex items-center gap-1.5"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Settings &amp; Backup</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} ML Mastery Lab. Built for curious engineers and researchers.
          </p>
          <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
            <span>Client-side Storage</span>
            <span>·</span>
            <span>Zero Tracking</span>
            <span>·</span>
            <span>Open Educational Resource</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
