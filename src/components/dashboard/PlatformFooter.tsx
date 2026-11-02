'use client';

import React from 'react';
import Link from 'next/link';
import {
  Brain,
  Cpu,
  Sparkles,
  Zap,
  Target,
  Bot,
  Activity,
  Server,
  Sliders,
  Terminal,
  Calculator,
  Briefcase,
  CheckSquare,
  Coffee,
  Bookmark,
  BarChart2,
} from 'lucide-react';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { AzurLearnLogo } from '@/components/shared/AzurLearnLogo';

export const PlatformFooter: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-t-3xl pt-12 pb-10 px-4 sm:px-8 text-slate-600 dark:text-slate-400 transition-colors duration-200">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand & Mission Column (col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center group">
              <AzurLearnLogo size="md" />
            </Link>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
              An open, production-grade educational platform designed to master artificial intelligence, machine learning, and deep learning through first-principles mathematics, interactive visualizers, zero-install runnable code, and industrial deployment blueprints.
            </p>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                8 AI/ML Tracks Active
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium">
                100+ Interactive Lessons
              </span>
            </div>
          </div>

          {/* AI & ML Tracks */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
              AI &amp; ML Tracks
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/curriculum" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <Brain className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Machine Learning</span>
                </Link>
              </li>
              <li>
                <Link href="/curriculum/dl-module-1" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-violet-500" />
                  <span>Deep Learning</span>
                </Link>
              </li>
              <li>
                <Link href="/curriculum/tf-module-1" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                  <span>Transformers</span>
                </Link>
              </li>
              <li>
                <Link href="/curriculum/genai-module-1" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>Generative AI &amp; LLMs</span>
                </Link>
              </li>
              <li>
                <Link href="/curriculum/rag-module-1" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-cyan-500" />
                  <span>RAG &amp; Vector Search</span>
                </Link>
              </li>
              <li>
                <Link href="/curriculum/agent-module-1" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <Bot className="w-3.5 h-3.5 text-emerald-500" />
                  <span>AI Agents</span>
                </Link>
              </li>
              <li>
                <Link href="/curriculum/mlops-module-1" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-blue-500" />
                  <span>MLOps &amp; LLMOps</span>
                </Link>
              </li>
              <li>
                <Link href="/curriculum/deployment-module-1" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5 text-slate-500" />
                  <span>AI Deployment &amp; Cloud</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Interactive Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
              Interactive Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/code-lab" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Python Code Lab</span>
                </Link>
              </li>
              <li>
                <Link href="/playground" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-cyan-500" />
                  <span>AI &amp; ML Playground</span>
                </Link>
              </li>
              <li>
                <Link href="/formulas" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <Calculator className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Formula Explorer</span>
                </Link>
              </li>
              <li>
                <Link href="/ai-tutor" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                  <span>AI Tutor Studio</span>
                </Link>
              </li>
              <li>
                <Link href="/quizzes" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <CheckSquare className="w-3.5 h-3.5 text-violet-500" />
                  <span>Quiz Center</span>
                </Link>
              </li>
              <li>
                <Link href="/revision-notes" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>Visual Short Notes</span>
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-blue-500" />
                  <span>Capstone Projects</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Complementary Labs & System */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
              Complementary Labs
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/dsa" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-violet-500" />
                  <span>DSA Mastery Lab</span>
                </Link>
              </li>
              <li>
                <Link href="/python" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Python Mastery Lab</span>
                </Link>
              </li>
              <li>
                <Link href="/java" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <Coffee className="w-3.5 h-3.5 text-amber-500" />
                  <span>Java Mastery Lab</span>
                </Link>
              </li>
              <li>
                <Link href="/analytics" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <BarChart2 className="w-3.5 h-3.5 text-cyan-500" />
                  <span>Learning Analytics</span>
                </Link>
              </li>
              <li>
                <Link href="/notes" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Bookmarks &amp; Notes</span>
                </Link>
              </li>
            </ul>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <span className="text-[11px] font-semibold text-slate-500 block mb-2">
                Appearance Preference
              </span>
              <ThemeToggle showLabel={true} />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} AzurLearn. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/curriculum" className="hover:text-slate-800 dark:hover:text-slate-300 transition-colors">
              Curriculum Syllabus
            </Link>
            <span>·</span>
            <Link href="/projects" className="hover:text-slate-800 dark:hover:text-slate-300 transition-colors">
              Capstone Projects
            </Link>
            <span>·</span>
            <Link href="/login" className="hover:text-slate-800 dark:hover:text-slate-300 transition-colors">
              Learner Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
