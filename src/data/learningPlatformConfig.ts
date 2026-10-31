import React from 'react';
import {
  Brain,
  Cpu,
  Terminal,
  Coffee,
  BookOpen,
  Eye,
  PlayCircle,
  Lightbulb,
  CheckCircle2,
  GitFork,
  Activity,
  History,
  Sliders,
  Calculator,
  Briefcase,
  Sparkles,
  Layers,
  Flame,
  Award,
  Zap,
  GraduationCap,
  ArrowRight,
  Code2,
  Workflow,
  Search,
  CheckSquare,
  BarChart2,
} from 'lucide-react';
import { MODULES_CATALOG, MODULES_CATALOG_NUMPY, MODULES_CATALOG_PANDAS } from '@/data/modules/curriculum';
import { MODULES_CATALOG_DSA } from '@/data/dsa/curriculum';
import { MODULES_CATALOG_PYTHON } from '@/data/python/curriculum';
import { MODULES_CATALOG_JAVA } from '@/data/java/curriculum';
import { UserProgressState } from '@/lib/types';

export const CANONICAL_BRANDING = {
  academyTitle: 'Complete AI & ML Academy',
  trackTitle: 'Complete AI & ML',
  shortSubtitle: 'From ML Foundations to Production AI',
  description:
    'Learn Machine Learning, Deep Learning, Transformers, LLMs, RAG, AI Agents, and MLOps through visual explanations, interactive labs, practical coding, and real-world projects.',
  categoryBadge: 'Category 1 · Artificial Intelligence & Machine Learning',
} as const;

export type CategoryId = 'machine-learning' | 'algorithms' | 'programming';

export interface LearningSectionStats {
  totalModules: number;
  totalLessons: number;
  estimatedHours: number;
}

export interface LearningSectionProgress {
  completedLessons: number;
  totalLessons: number;
  percentage: number;
}

export interface LearningSectionConfig {
  id: string;
  categoryId: CategoryId;
  title: string;
  badge: string;
  shortDescription: string;
  route: string;
  primaryActionLabel: string;
  icon: React.ElementType;
  theme: {
    accent: string;
    border: string;
    borderHover: string;
    bgHover: string;
    badgeBg: string;
    badgeText: string;
    iconBg: string;
    iconColor: string;
    gradient: string;
    glow: string;
    progressBar: string;
  };
  highlights: string[];
  features: string[];
  stats: LearningSectionStats;
  quickLinks: { label: string; href: string }[];
  getProgress: (progress: UserProgressState | null) => LearningSectionProgress;
}

export interface LearningCategoryConfig {
  id: CategoryId;
  title: string;
  tagline: string;
  description: string;
  badge: string;
  icon: React.ElementType;
  accentColor: string;
  sections: LearningSectionConfig[];
}

export interface PlatformFeatureItem {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  badge?: string;
  accent: string;
}

export interface LearningWorkflowStep {
  step: number;
  title: string;
  description: string;
  highlight: string;
  icon: React.ElementType;
}

export interface ResumeLessonInfo {
  lessonId: string;
  moduleId: string;
  title: string;
  trackId: 'ml' | 'dsa' | 'python' | 'java';
  trackTitle: string;
  route: string;
  completionPercentage: number;
  timestamp?: string;
}

// =========================================================================
// DYNAMIC PROGRESS CALCULATORS FOR EACH TRACK
// =========================================================================

export function getMLProgress(progress: UserProgressState | null): LearningSectionProgress {
  const allLessons = MODULES_CATALOG.flatMap((m) => m.lessons);
  const totalLessons = allLessons.length;
  if (!progress || totalLessons === 0) return { completedLessons: 0, totalLessons, percentage: 0 };
  const completedLessons = allLessons.filter((l) => Boolean(progress.completedLessons[l.id])).length;
  return {
    completedLessons,
    totalLessons,
    percentage: Math.round((completedLessons / totalLessons) * 100),
  };
}

export function getNumPyProgress(progress: UserProgressState | null): LearningSectionProgress {
  const allLessons = MODULES_CATALOG_NUMPY.flatMap((m) => m.lessons);
  const totalLessons = allLessons.length;
  if (!progress || totalLessons === 0) return { completedLessons: 0, totalLessons, percentage: 0 };
  const completedLessons = allLessons.filter((l) => Boolean(progress.completedLessons[l.id])).length;
  return {
    completedLessons,
    totalLessons,
    percentage: Math.round((completedLessons / totalLessons) * 100),
  };
}

export function getPandasProgress(progress: UserProgressState | null): LearningSectionProgress {
  const allLessons = MODULES_CATALOG_PANDAS.flatMap((m) => m.lessons);
  const totalLessons = allLessons.length;
  if (!progress || totalLessons === 0) return { completedLessons: 0, totalLessons, percentage: 0 };
  const completedLessons = allLessons.filter((l) => Boolean(progress.completedLessons[l.id])).length;
  return {
    completedLessons,
    totalLessons,
    percentage: Math.round((completedLessons / totalLessons) * 100),
  };
}

export function getDSAProgress(progress: UserProgressState | null): LearningSectionProgress {
  const allLessons = MODULES_CATALOG_DSA.flatMap((m) => m.lessons);
  const totalLessons = allLessons.length;
  if (!progress || totalLessons === 0) return { completedLessons: 0, totalLessons, percentage: 0 };
  const completedLessons = allLessons.filter((l) => Boolean(progress.completedLessons[l.id])).length;
  return {
    completedLessons,
    totalLessons,
    percentage: Math.round((completedLessons / totalLessons) * 100),
  };
}

export function getPythonProgress(progress: UserProgressState | null): LearningSectionProgress {
  const allLessons = MODULES_CATALOG_PYTHON.flatMap((m) => m.lessons);
  const totalLessons = allLessons.length;
  if (!progress || totalLessons === 0) return { completedLessons: 0, totalLessons, percentage: 0 };
  const completedLessons = allLessons.filter((l) => Boolean(progress.completedLessons[l.id])).length;
  return {
    completedLessons,
    totalLessons,
    percentage: Math.round((completedLessons / totalLessons) * 100),
  };
}

export function getJavaProgress(progress: UserProgressState | null): LearningSectionProgress {
  const allLessons = MODULES_CATALOG_JAVA.flatMap((m) => m.lessons);
  const totalLessons = allLessons.length;
  if (!progress || totalLessons === 0) return { completedLessons: 0, totalLessons, percentage: 0 };
  const completedLessons = allLessons.filter((l) => Boolean(progress.completedLessons[l.id])).length;
  return {
    completedLessons,
    totalLessons,
    percentage: Math.round((completedLessons / totalLessons) * 100),
  };
}

// Calculate platform-wide aggregate statistics
export function getOverallPlatformStats(progress: UserProgressState | null) {
  const mlProg = getMLProgress(progress);
  const dsaProg = getDSAProgress(progress);
  const pyProg = getPythonProgress(progress);
  const javaProg = getJavaProgress(progress);

  const totalLessons = mlProg.totalLessons + dsaProg.totalLessons + pyProg.totalLessons + javaProg.totalLessons;
  const completedLessons = mlProg.completedLessons + dsaProg.completedLessons + pyProg.completedLessons + javaProg.completedLessons;
  const totalModules = MODULES_CATALOG.length + MODULES_CATALOG_DSA.length + MODULES_CATALOG_PYTHON.length + MODULES_CATALOG_JAVA.length;
  const totalHours =
    MODULES_CATALOG.reduce((acc, m) => acc + m.estimatedHours, 0) +
    MODULES_CATALOG_DSA.reduce((acc, m) => acc + m.estimatedHours, 0) +
    MODULES_CATALOG_PYTHON.reduce((acc, m) => acc + m.estimatedHours, 0) +
    MODULES_CATALOG_JAVA.reduce((acc, m) => acc + m.estimatedHours, 0);

  const percentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return {
    totalModules,
    totalLessons,
    completedLessons,
    percentage,
    totalHours,
    tracksCount: 4,
  };
}

// Key for storing last visited lesson in localStorage
export const LAST_VISITED_KEY = 'ml_mastery_lab_last_visited_v1';

export function saveLastVisitedLesson(info: Omit<ResumeLessonInfo, 'completionPercentage'>): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LAST_VISITED_KEY, JSON.stringify(info));
  } catch (e) {
    console.error('Failed to save last visited lesson', e);
  }
}

export function getLastVisitedLesson(): ResumeLessonInfo | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(LAST_VISITED_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed;
  } catch {
    return null;
  }
}

// Resolve active resume lesson from real user progress
export function resolveUserResumeLesson(progress: UserProgressState | null): ResumeLessonInfo | null {
  // 1. Try explicit last-visited storage
  const explicit = getLastVisitedLesson();
  if (explicit && explicit.route) {
    let pct = 0;
    if (explicit.trackId === 'ml') pct = getMLProgress(progress).percentage;
    else if (explicit.trackId === 'dsa') pct = getDSAProgress(progress).percentage;
    else if (explicit.trackId === 'python') pct = getPythonProgress(progress).percentage;
    else if (explicit.trackId === 'java') pct = getJavaProgress(progress).percentage;
    return { ...explicit, completionPercentage: pct };
  }

  // 2. Check completed lessons map for the most recently completed topic
  if (progress && progress.completedLessons) {
    const completedIds = Object.keys(progress.completedLessons).filter((id) => progress.completedLessons[id]);
    if (completedIds.length > 0) {
      const lastId = completedIds[completedIds.length - 1];

      // Check ML
      for (const mod of MODULES_CATALOG) {
        const found = mod.lessons.find((l) => l.id === lastId);
        if (found) {
          return {
            lessonId: found.id,
            moduleId: mod.id,
            title: found.title,
            trackId: 'ml',
            trackTitle: CANONICAL_BRANDING.trackTitle,
            route: `/curriculum/${mod.id}/${found.id}`,
            completionPercentage: getMLProgress(progress).percentage,
          };
        }
      }

      // Check DSA
      for (const mod of MODULES_CATALOG_DSA) {
        const found = mod.lessons.find((l) => l.id === lastId);
        if (found) {
          return {
            lessonId: found.id,
            moduleId: mod.id,
            title: found.title,
            trackId: 'dsa',
            trackTitle: 'DSA Mastery Lab',
            route: `/dsa/${mod.id}/${found.id}`,
            completionPercentage: getDSAProgress(progress).percentage,
          };
        }
      }

      // Check Python
      for (const mod of MODULES_CATALOG_PYTHON) {
        const found = mod.lessons.find((l) => l.id === lastId);
        if (found) {
          return {
            lessonId: found.id,
            moduleId: mod.id,
            title: found.title,
            trackId: 'python',
            trackTitle: 'Python Mastery Lab',
            route: `/python/${mod.id}/${found.id}`,
            completionPercentage: getPythonProgress(progress).percentage,
          };
        }
      }

      // Check Java
      for (const mod of MODULES_CATALOG_JAVA) {
        const found = mod.lessons.find((l) => l.id === lastId);
        if (found) {
          return {
            lessonId: found.id,
            moduleId: mod.id,
            title: found.title,
            trackId: 'java',
            trackTitle: 'Java Mastery Lab',
            route: `/java/${mod.id}/${found.id}`,
            completionPercentage: getJavaProgress(progress).percentage,
          };
        }
      }
    }
  }

  return null;
}

// =========================================================================
// CENTRALIZED LEARNING CATEGORIES & SECTIONS REGISTRY
// =========================================================================

export const LEARNING_SECTIONS: Record<string, LearningSectionConfig> = {
  ml: {
    id: 'ml',
    categoryId: 'machine-learning',
    title: CANONICAL_BRANDING.trackTitle,
    badge: 'Curriculum Track · Foundations to Production',
    shortDescription: CANONICAL_BRANDING.description,
    route: '/curriculum',
    primaryActionLabel: `Explore ${CANONICAL_BRANDING.trackTitle}`,
    icon: Brain,
    theme: {
      accent: 'text-indigo-400',
      border: 'border-indigo-500/30',
      borderHover: 'hover:border-indigo-500/80',
      bgHover: 'hover:bg-indigo-950/20',
      badgeBg: 'bg-indigo-500/10 border-indigo-400/20',
      badgeText: 'text-indigo-400',
      iconBg: 'bg-indigo-600/15 border border-indigo-500/30 text-indigo-400',
      iconColor: 'text-indigo-400',
      gradient: 'from-indigo-600/20 via-indigo-900/10 to-transparent',
      glow: 'shadow-indigo-500/10',
      progressBar: 'bg-gradient-to-r from-indigo-500 to-cyan-400',
    },
    highlights: [
      'Comprehensive AI & ML Syllabus Across 12 Structured Phases',
      'From Foundations to Deep Learning, Transformers, LLMs & Agents',
      'Deep Learning: 22 In-Depth Interactive Lessons (DL-01 to DL-22)',
      'Interactive Parameter Visualizers & PyTorch Runnable Labs',
      'NumPy & Pandas Mastery Data Science Foundations',
    ],
    features: [
      'Foundations: Preprocessing, Classical ML, Regression, Classification, Ensembles, SVMs',
      'Deep Learning: Perceptrons, Backprop, Optimizers, Regularization, PyTorch, CNNs, Attention',
      'GenAI & Advanced AI: Transformers, LLMs, Fine-Tuning, Embeddings, RAG Pipelines & AI Agents',
      'Production Engineering: MLOps, LLMOps, Docker, FastAPI Serving, and Real-World Capstones',
    ],
    stats: {
      totalModules: MODULES_CATALOG.length,
      totalLessons: MODULES_CATALOG.reduce((acc, m) => acc + m.lessons.length, 0),
      estimatedHours: MODULES_CATALOG.reduce((acc, m) => acc + m.estimatedHours, 0),
    },
    quickLinks: [
      { label: 'Full Syllabus', href: '/curriculum' },
      { label: 'Visual Playground', href: '/playground' },
      { label: 'Python Code Lab', href: '/code-lab' },
      { label: 'Formula Explorer', href: '/formulas' },
      { label: 'Real-World Projects', href: '/projects' },
      { label: 'Visual Short Notes', href: '/revision-notes' },
    ],
    getProgress: getMLProgress,
  },

  dsa: {
    id: 'dsa',
    categoryId: 'algorithms',
    title: 'DSA Mastery Lab',
    badge: 'Algorithms & Problem Solving',
    shortDescription:
      'Master data structures and algorithms from core memory layouts to advanced graph theory and dynamic programming, backed by step-by-step visual state animations and complexity analysis.',
    route: '/dsa',
    primaryActionLabel: 'Explore DSA Section',
    icon: Cpu,
    theme: {
      accent: 'text-violet-400',
      border: 'border-violet-500/30',
      borderHover: 'hover:border-violet-500/80',
      bgHover: 'hover:bg-violet-950/20',
      badgeBg: 'bg-violet-500/10 border-violet-400/20',
      badgeText: 'text-violet-400',
      iconBg: 'bg-violet-600/15 border border-violet-500/30 text-violet-400',
      iconColor: 'text-violet-400',
      gradient: 'from-violet-600/20 via-purple-900/10 to-transparent',
      glow: 'shadow-violet-500/10',
      progressBar: 'bg-gradient-to-r from-violet-500 to-purple-400',
    },
    highlights: [
      '12 Modules & 106 Algorithmic Topics',
      'Interactive Step-by-Step Visual Tracers',
      'Rigorous Time & Space Complexity Analysis',
      'Pseudocode, Python & Java Implementations',
      'Technical Interview Problem-Solving Patterns',
    ],
    features: [
      'Arrays, Linked Lists, Stacks, Queues, Binary Trees & Heaps',
      'Sorting Visualizers: QuickSort, MergeSort, HeapSort step-by-step',
      'Graph Algorithms: BFS, DFS, Dijkstra, TopoSort & MST',
      'Dynamic Programming: 1D/2D memoization & table visualization',
    ],
    stats: {
      totalModules: MODULES_CATALOG_DSA.length,
      totalLessons: MODULES_CATALOG_DSA.reduce((acc, m) => acc + m.lessons.length, 0),
      estimatedHours: MODULES_CATALOG_DSA.reduce((acc, m) => acc + m.estimatedHours, 0),
    },
    quickLinks: [
      { label: 'DSA Track Overview', href: '/dsa' },
      { label: 'Dynamic Programming', href: '/dsa/dsa-module-11' },
      { label: 'Graph Algorithms', href: '/dsa/dsa-module-10' },
      { label: 'Trees & BSTs', href: '/dsa/dsa-module-8' },
      { label: 'Sorting Visualizers', href: '/dsa/dsa-module-7' },
    ],
    getProgress: getDSAProgress,
  },

  python: {
    id: 'python',
    categoryId: 'programming',
    title: 'Python Mastery Lab',
    badge: 'Python 3.12+ & Internals',
    shortDescription:
      'A complete journey from Python fundamentals to CPython internals, memory references, OOP architecture, functional paradigms, data science libraries, and 8 production capstones.',
    route: '/python',
    primaryActionLabel: 'Explore Python Section',
    icon: Terminal,
    theme: {
      accent: 'text-emerald-400',
      border: 'border-emerald-500/30',
      borderHover: 'hover:border-emerald-500/80',
      bgHover: 'hover:bg-emerald-950/20',
      badgeBg: 'bg-emerald-500/10 border-emerald-400/20',
      badgeText: 'text-emerald-400',
      iconBg: 'bg-emerald-600/15 border border-emerald-500/30 text-emerald-400',
      iconColor: 'text-emerald-400',
      gradient: 'from-emerald-600/20 via-teal-900/10 to-transparent',
      glow: 'shadow-emerald-500/10',
      progressBar: 'bg-gradient-to-r from-emerald-500 to-teal-400',
    },
    highlights: [
      '12 Modules & 101 Comprehensive Lessons',
      'Zero-Install In-Browser Pyodide Engine',
      'CPython Execution Model & Memory Visualizer',
      'NumPy, Pandas & Data Science Tooling',
      '8 Real-World Industry Projects',
    ],
    features: [
      'Built-in data structures, memory references & mutability',
      'Object-Oriented Design, dunder methods & inheritance',
      'Advanced closures, decorators, generators & context managers',
      'NumPy array vectorization & Pandas data pipeline operations',
    ],
    stats: {
      totalModules: MODULES_CATALOG_PYTHON.length,
      totalLessons: MODULES_CATALOG_PYTHON.reduce((acc, m) => acc + m.lessons.length, 0),
      estimatedHours: MODULES_CATALOG_PYTHON.reduce((acc, m) => acc + m.estimatedHours, 0),
    },
    quickLinks: [
      { label: 'Python Curriculum', href: '/python' },
      { label: 'CPython Internals', href: '/python/python-module-9' },
      { label: 'Python for Data Science', href: '/python/python-module-11' },
      { label: 'Interactive Code Lab', href: '/code-lab' },
    ],
    getProgress: getPythonProgress,
  },

  java: {
    id: 'java',
    categoryId: 'programming',
    title: 'Java Mastery Lab',
    badge: 'Java 21 LTS & Enterprise',
    shortDescription:
      'Master modern enterprise Java across 12 modules and 120 lessons. Covers JVM architecture, heap vs stack memory, OOP, generics, collections, multithreading, and a live compiler runner.',
    route: '/java',
    primaryActionLabel: 'Explore Java Section',
    icon: Coffee,
    theme: {
      accent: 'text-amber-400',
      border: 'border-amber-500/30',
      borderHover: 'hover:border-amber-500/80',
      bgHover: 'hover:bg-amber-950/20',
      badgeBg: 'bg-amber-500/10 border-amber-400/20',
      badgeText: 'text-amber-400',
      iconBg: 'bg-amber-600/15 border border-amber-500/30 text-amber-400',
      iconColor: 'text-amber-400',
      gradient: 'from-amber-600/20 via-orange-900/10 to-transparent',
      glow: 'shadow-amber-500/10',
      progressBar: 'bg-gradient-to-r from-amber-500 to-orange-400',
    },
    highlights: [
      '12 Modules & 120 Complete Lessons',
      'Interactive JVM Architecture Visualizer',
      'Stack & Heap Memory Execution Tracers',
      'Collections Framework In-Depth Comparison',
      'Live Java Code Runner & Compiler API',
    ],
    features: [
      'Java 21 modern syntax, records, pattern matching & virtual threads',
      'JVM ClassLoader, Execution Engine & Garbage Collection',
      'Deep OOP: Polymorphism, abstraction, interfaces & SOLID design',
      'Collections: List, Set, Map, Queue implementations & performance',
    ],
    stats: {
      totalModules: MODULES_CATALOG_JAVA.length,
      totalLessons: MODULES_CATALOG_JAVA.reduce((acc, m) => acc + m.lessons.length, 0),
      estimatedHours: MODULES_CATALOG_JAVA.reduce((acc, m) => acc + m.estimatedHours, 0),
    },
    quickLinks: [
      { label: 'Java Curriculum', href: '/java' },
      { label: 'JVM Architecture', href: '/java/java-module-1' },
      { label: 'Collections Framework', href: '/java/java-module-10' },
      { label: 'OOP Deep Dive', href: '/java/java-module-6' },
      { label: 'DSA Using Java', href: '/java/java-module-11' },
    ],
    getProgress: getJavaProgress,
  },
};

// =========================================================================
// TOP-LEVEL CATEGORIES SPECIFIED IN REQUIREMENTS
// =========================================================================

export const LEARNING_CATEGORIES: LearningCategoryConfig[] = [
  {
    id: 'machine-learning',
    title: CANONICAL_BRANDING.academyTitle,
    badge: CANONICAL_BRANDING.categoryBadge,
    tagline: CANONICAL_BRANDING.shortSubtitle,
    description: CANONICAL_BRANDING.description,
    icon: Brain,
    accentColor: 'indigo',
    sections: [LEARNING_SECTIONS.ml],
  },
  {
    id: 'algorithms',
    title: 'Algorithms',
    badge: 'Category 2 · Computational Thinking',
    tagline: 'Data Structures, Algorithmic Analysis & Visual Tracers',
    description:
      'Build unshakeable problem-solving intuition with animated state transitions, asymptotic proofs, and comprehensive structural visualizations.',
    icon: Cpu,
    accentColor: 'violet',
    sections: [LEARNING_SECTIONS.dsa],
  },
  {
    id: 'programming',
    title: 'Programming',
    badge: 'Category 3 · Modern Languages & Internals',
    tagline: 'Deep Language Mechanics, Memory Models & Software Engineering',
    description:
      'Gain industrial proficiency in the two dominant paradigms of modern engineering: dynamic Python and strongly-typed enterprise Java.',
    icon: Terminal,
    accentColor: 'emerald',
    sections: [LEARNING_SECTIONS.python, LEARNING_SECTIONS.java],
  },
];

// =========================================================================
// PLATFORM FEATURES (8 CAPABILITIES REQUIRED BY SPEC)
// =========================================================================

export const PLATFORM_FEATURES: PlatformFeatureItem[] = [
  {
    id: 'notes',
    title: 'Easy-to-Understand Notes',
    description:
      'Clear, accessible explanations written in simple English with step-by-step examples that demystify complex theory without compromising mathematical rigor.',
    icon: BookOpen,
    badge: 'Clear Pedagogy',
    accent: 'border-blue-500/30 text-blue-400 bg-blue-500/10',
  },
  {
    id: 'visual-learning',
    title: 'Visual Learning',
    description:
      'Interactive canvas visualizers, dynamic SVG memory diagrams, and step-by-step algorithm players that turn abstract concepts into visual intuition.',
    icon: Eye,
    badge: 'Interactive Lab',
    accent: 'border-indigo-500/30 text-indigo-400 bg-indigo-500/10',
  },
  {
    id: 'code-playground',
    title: 'Code Playground',
    description:
      'Zero-setup coding environments right in your browser. Run Python with client-side WebAssembly Pyodide and test Java code against our live backend runner.',
    icon: PlayCircle,
    badge: 'Browser Execution',
    accent: 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10',
  },
  {
    id: 'analogies',
    title: 'Real-World Analogies',
    description:
      'Every complex technical theorem, algorithmic state, or memory mechanism is paired with everyday physical analogies before formal mathematical notation.',
    icon: Lightbulb,
    badge: 'Intuitive Models',
    accent: 'border-amber-500/30 text-amber-400 bg-amber-500/10',
  },
  {
    id: 'practice-quizzes',
    title: 'Practice and Quizzes',
    description:
      'Reinforce your learning at every milestone with interactive quizzes, multiple-choice checkpoints, and guided coding exercises with instant feedback.',
    icon: CheckCircle2,
    badge: 'Retention Checks',
    accent: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10',
  },
  {
    id: 'structured-paths',
    title: 'Structured Learning Paths',
    description:
      'Carefully sequenced roadmaps organized from foundational building blocks to senior-level architectural design across ML, DSA, Python, and Java.',
    icon: GitFork,
    badge: 'Zero Knowledge Gaps',
    accent: 'border-purple-500/30 text-purple-400 bg-purple-500/10',
  },
  {
    id: 'progress-tracking',
    title: 'Progress Tracking',
    description:
      'Track your completed lessons, daily learning streaks, cumulative study minutes, personal bookmarks, and detailed per-track completion metrics.',
    icon: Activity,
    badge: 'Live Analytics',
    accent: 'border-rose-500/30 text-rose-400 bg-rose-500/10',
  },
  {
    id: 'revision-content',
    title: 'Revision-Friendly Content',
    description:
      'High-yield visual short notes, mathematical formula explorers with variable definitions, and quick-recall interview cards for rapid revision.',
    icon: History,
    badge: 'Quick Recall',
    accent: 'border-teal-500/30 text-teal-400 bg-teal-500/10',
  },
];

// =========================================================================
// LEARNING PLATFORM OVERVIEW WORKFLOW (6 STEPS REQUIRED BY SPEC)
// =========================================================================

export const LEARNING_WORKFLOW_STEPS: LearningWorkflowStep[] = [
  {
    step: 1,
    title: 'Choose a Learning Path',
    description:
      'Select between Complete AI & ML, Algorithms (DSA), Python, or Java based on your personal engineering goals and career focus.',
    highlight: '4 Structured Tracks',
    icon: GitFork,
  },
  {
    step: 2,
    title: 'Understand Concepts',
    description:
      'Read clear, modular notes breaking down mathematical proofs, data structures, and syntax through accessible real-world analogies.',
    highlight: 'First-Principles Theory',
    icon: BookOpen,
  },
  {
    step: 3,
    title: 'Explore Visualizations',
    description:
      'Interact with live sliders, algorithm step players, memory layout diagrams, and decision boundaries to build geometric intuition.',
    highlight: 'Real-Time Simulators',
    icon: Eye,
  },
  {
    step: 4,
    title: 'Practice with Code',
    description:
      'Write and execute runnable code in our integrated browser environment with zero local setup or package installation needed.',
    highlight: 'Hands-on Execution',
    icon: Terminal,
  },
  {
    step: 5,
    title: 'Solve Exercises',
    description:
      'Work through implementation challenges, hand-calculated examples, and production blueprints designed to solidify problem-solving skills.',
    highlight: 'Practical Application',
    icon: Code2,
  },
  {
    step: 6,
    title: 'Test Your Knowledge',
    description:
      'Take interactive module quizzes and checkpoints to diagnose weak areas, earn topic badges, and measure your real progress over time.',
    highlight: 'Self-Testing & Mastery',
    icon: CheckCircle2,
  },
];

