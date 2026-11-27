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
  Stethoscope,
  HeartPulse,
  ClipboardCheck,
} from 'lucide-react';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { AzurLearnLogo } from '@/components/shared/AzurLearnLogo';
import { useDivision } from '@/context/DivisionContext';

export const PlatformFooter: React.FC = () => {
  const { division } = useDivision();

  return (
    <footer className="mt-14 sm:mt-20 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-t-3xl pt-8 sm:pt-12 pb-8 sm:pb-10 px-4 sm:px-8 text-slate-600 dark:text-slate-400 transition-colors duration-200">
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
          {/* Brand & Mission Column (col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center group">
              <AzurLearnLogo
                size="md"
                subtitle={division === 'doctor' ? 'MBBS Medical Academy' : 'Engineering & AI Academy'}
              />
            </Link>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
              A dual-academy learning platform divided into Engineering (AI &amp; ML, DSA, Python, Java) and Doctor / MBBS (19 Medical Subjects, Clinical Simulators, and Case Vignettes).
            </p>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              <Link
                href="/engineering"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 font-medium hover:bg-indigo-100 transition-colors"
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>Engineering Platform</span>
              </Link>
              <Link
                href="/doctor"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 font-medium hover:bg-emerald-100 transition-colors"
              >
                <Stethoscope className="w-3.5 h-3.5" />
                <span>Doctor Platform</span>
              </Link>
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
                <Link href="/curriculum/p6-m1" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                  <span>Transformers</span>
                </Link>
              </li>
              <li>
                <Link href="/curriculum/p7-m1" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>Generative AI &amp; LLMs</span>
                </Link>
              </li>
              <li>
                <Link href="/curriculum/p8-m1" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-cyan-500" />
                  <span>RAG &amp; Vector Search</span>
                </Link>
              </li>
              <li>
                <Link href="/curriculum/p9-m1" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <Bot className="w-3.5 h-3.5 text-emerald-500" />
                  <span>AI Agents</span>
                </Link>
              </li>
              <li>
                <Link href="/curriculum/p10-m1" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-blue-500" />
                  <span>MLOps &amp; LLMOps</span>
                </Link>
              </li>
              <li>
                <Link href="/curriculum/p11-m1" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5">
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

          {/* Complementary Labs & MBBS Wing */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
              CS &amp; Medical Wings
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
                <Link href="/doctor/anatomy" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <Stethoscope className="w-3.5 h-3.5 text-emerald-500" />
                  <span>3D Anatomy Atlas</span>
                </Link>
              </li>
              <li>
                <Link href="/doctor/animations" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <HeartPulse className="w-3.5 h-3.5 text-rose-500" />
                  <span>Scientific Animations</span>
                </Link>
              </li>
              <li>
                <Link href="/doctor/cases" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <ClipboardCheck className="w-3.5 h-3.5 text-cyan-500" />
                  <span>Clinical Case Lab</span>
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
        <div className="pt-6 sm:pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left">
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
