'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
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
  GraduationCap,
  Code2,
  Cpu,
} from 'lucide-react';
import { MODULES_CATALOG_DSA } from '@/data/dsa/curriculum';
import { MODULES_CATALOG_PYTHON } from '@/data/python/curriculum';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

type TrackType = 'ml' | 'dsa' | 'python';

const ML_NAV_ITEMS = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'ML Curriculum', href: '/curriculum', icon: BookOpen },
  { name: 'ML Playground', href: '/playground', icon: Sliders },
  { name: 'Python Code Lab', href: '/code-lab', icon: Terminal },
  { name: 'Formula Explorer', href: '/formulas', icon: Calculator },
  { name: 'Quiz Center', href: '/quizzes', icon: CheckSquare },
  { name: 'Real-World Projects', href: '/projects', icon: Briefcase },
  { name: 'Bookmarks & Notes', href: '/notes', icon: Bookmark },
  { name: 'Learning Analytics', href: '/analytics', icon: BarChart2 },
  { name: 'Settings', href: '/settings', icon: Settings },
];

const ML_MODULE_NAV = [
  { id: 'module-0', num: 0, title: 'Prerequisites & Foundations' },
  { id: 'module-1', num: 1, title: 'Mathematics for ML' },
  { id: 'module-2', num: 2, title: 'Data Preprocessing & EDA' },
  { id: 'module-3', num: 3, title: 'Linear & Regularized Regression' },
  { id: 'module-4', num: 4, title: 'Classification Algorithms' },
  { id: 'module-5', num: 5, title: 'Model Evaluation & Selection' },
  { id: 'module-6', num: 6, title: 'Ensemble Learning & Boosting' },
  { id: 'module-7', num: 7, title: 'Unsupervised Learning & Clustering' },
  { id: 'module-8', num: 8, title: 'Advanced Classical ML' },
  { id: 'module-9', num: 9, title: 'Neural Networks & Deep Learning' },
  { id: 'module-10', num: 10, title: 'ML Engineering & Deployment' },
  { id: 'module-11', num: 11, title: 'Real-World Project Workspace' },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();

  const getActiveTrackFromPath = (path: string): TrackType => {
    if (path.startsWith('/dsa')) return 'dsa';
    if (path.startsWith('/python')) return 'python';
    return 'ml';
  };

  const [activeTrack, setActiveTrack] = useState<TrackType>('ml');

  useEffect(() => {
    setActiveTrack(getActiveTrackFromPath(pathname));
  }, [pathname]);

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-14 bottom-0 left-0 z-40 w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } flex flex-col justify-between overflow-y-auto`}
      >
        <div className="p-4 space-y-5">
          {/* Track Switcher Segmented Control */}
          <div>
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-1 block mb-1.5">
              Learning Lab Track
            </span>
            <div className="grid grid-cols-3 gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl text-[11px] font-semibold">
              <Link
                href="/"
                onClick={() => {
                  setActiveTrack('ml');
                  onClose();
                }}
                className={`py-1.5 text-center rounded-lg transition-all ${
                  activeTrack === 'ml'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                ML
              </Link>
              <Link
                href="/dsa"
                onClick={() => {
                  setActiveTrack('dsa');
                  onClose();
                }}
                className={`py-1.5 text-center rounded-lg transition-all ${
                  activeTrack === 'dsa'
                    ? 'bg-violet-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                DSA
              </Link>
              <Link
                href="/python"
                onClick={() => {
                  setActiveTrack('python');
                  onClose();
                }}
                className={`py-1.5 text-center rounded-lg transition-all ${
                  activeTrack === 'python'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                Python
              </Link>
            </div>
          </div>

          {/* Track-specific Section Header & Quick Links */}
          {activeTrack === 'dsa' && (
            <div className="space-y-1">
              <div className="flex items-center justify-between px-2 mb-2">
                <span className="text-[11px] font-semibold text-violet-600 dark:text-violet-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5" />
                  DSA Track
                </span>
                <Link
                  href="/dsa"
                  onClick={onClose}
                  className="text-[10px] text-slate-400 hover:underline"
                >
                  Overview
                </Link>
              </div>

              <div className="space-y-1">
                {MODULES_CATALOG_DSA.map((mod) => {
                  const isActive = pathname.includes(`/dsa/${mod.id}`);
                  return (
                    <Link
                      key={mod.id}
                      href={`/dsa/${mod.id}`}
                      onClick={onClose}
                      className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[11px] transition-colors ${
                        isActive
                          ? 'bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 font-semibold'
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
          )}

          {activeTrack === 'python' && (
            <div className="space-y-1">
              <div className="flex items-center justify-between px-2 mb-2">
                <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5" />
                  Python Track
                </span>
                <Link
                  href="/python"
                  onClick={onClose}
                  className="text-[10px] text-slate-400 hover:underline"
                >
                  Overview
                </Link>
              </div>

              <div className="space-y-1">
                {MODULES_CATALOG_PYTHON.map((mod) => {
                  const isActive = pathname.includes(`/python/${mod.id}`);
                  return (
                    <Link
                      key={mod.id}
                      href={`/python/${mod.id}`}
                      onClick={onClose}
                      className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[11px] transition-colors ${
                        isActive
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-semibold'
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
          )}

          {activeTrack === 'ml' && (
            <>
              {/* Main Navigation Links */}
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-2 block mb-2">
                  ML Navigation
                </span>
                {ML_NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>

              {/* ML Modules Syllabus */}
              <div className="space-y-1 pt-4 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between px-2 mb-2">
                  <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    12 ML Modules
                  </span>
                  <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                </div>

                <div className="space-y-1">
                  {ML_MODULE_NAV.map((mod) => {
                    const isActive = pathname.includes(`/curriculum/${mod.id}`);
                    return (
                      <Link
                        key={mod.id}
                        href={`/curriculum/${mod.id}`}
                        onClick={onClose}
                        className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[11px] transition-colors ${
                          isActive
                            ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span className="w-4 text-center font-mono text-[10px] text-slate-400">
                            {mod.num}
                          </span>
                          <span className="truncate">{mod.title}</span>
                        </div>
                        <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {/* Quick Cross-Track Navigation Links if not in ML */}
          {activeTrack !== 'ml' && (
            <div className="space-y-1 pt-4 border-t border-slate-200 dark:border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-2 block mb-1">
                Common Utilities
              </span>
              <Link
                href="/code-lab"
                onClick={onClose}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <Terminal className="w-3.5 h-3.5 text-emerald-500" />
                <span>Python Code Lab</span>
              </Link>
              <Link
                href="/notes"
                onClick={onClose}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <Bookmark className="w-3.5 h-3.5 text-amber-500" />
                <span>Bookmarks &amp; Notes</span>
              </Link>
              <Link
                href="/analytics"
                onClick={onClose}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <BarChart2 className="w-3.5 h-3.5 text-indigo-500" />
                <span>Learning Analytics</span>
              </Link>
            </div>
          )}
        </div>

        {/* Bottom Status Info */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <span>Client-side WASM Engine</span>
          </div>
          <span className="text-[10px] text-slate-400 block mt-1">
            ML · DSA · Python Platform v2.0
          </span>
        </div>
      </aside>
    </>
  );
};
