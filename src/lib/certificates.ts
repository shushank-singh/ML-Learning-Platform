import {
  MODULES_CATALOG_PHASE0,
  MODULES_CATALOG_ML_CORE,
  MODULES_CATALOG_DEEP_LEARNING,
  MODULES_CATALOG_TRANSFORMERS,
  MODULES_CATALOG_GENAI,
  MODULES_CATALOG_RAG,
  MODULES_CATALOG_AGENTS,
  MODULES_CATALOG_MLOPS,
  MODULES_CATALOG_DEPLOYMENT,
  MODULES_CATALOG_NUMPY,
  MODULES_CATALOG_PANDAS,
} from '@/data/catalogs/ml';
import { MODULES_CATALOG_DSA } from '@/data/catalogs/dsa';
import { MODULES_CATALOG_PYTHON } from '@/data/catalogs/python';
import { MODULES_CATALOG_JAVA } from '@/data/catalogs/java';
import type { UserProgressState } from '@/lib/types';

export interface CertificateTrackSpec {
  trackId: string;
  trackTitle: string;
  subtitle: string;
  badgeColor: string;
  lessonIds: string[];
}

export interface IssuedCertificate {
  id: string;
  recipient_name: string;
  track_id: string;
  track_title: string;
  lessons_completed: number;
  total_lessons: number;
  score_pct: number;
  issued_at: string;
}

const collectIds = (modules: { lessons: { id: string }[] }[]): string[] =>
  modules.flatMap((m) => m.lessons.map((l) => l.id));

export const CERTIFICATE_TRACKS: CertificateTrackSpec[] = [
  {
    trackId: 'ml',
    trackTitle: 'Machine Learning Core',
    subtitle: 'Foundations, Mathematics, Classical ML, Ensembles & Production',
    badgeColor: 'from-indigo-600 to-violet-600',
    lessonIds: collectIds([...MODULES_CATALOG_PHASE0, ...MODULES_CATALOG_ML_CORE]),
  },
  {
    trackId: 'deep-learning',
    trackTitle: 'Deep Learning Engineering',
    subtitle: 'Neural Networks, Backpropagation, CNNs, PyTorch & Optimization',
    badgeColor: 'from-violet-600 to-purple-600',
    lessonIds: collectIds(MODULES_CATALOG_DEEP_LEARNING),
  },
  {
    trackId: 'transformers',
    trackTitle: 'Transformers & Attention Architecture',
    subtitle: 'Tokenization, Positional Encoding, Multi-Head Attention & nano-GPT',
    badgeColor: 'from-amber-600 to-orange-600',
    lessonIds: collectIds(MODULES_CATALOG_TRANSFORMERS),
  },
  {
    trackId: 'genai',
    trackTitle: 'Generative AI & Large Language Models',
    subtitle: 'Sampling, LoRA Fine-Tuning, Quantization & LLM Evaluation',
    badgeColor: 'from-rose-600 to-pink-600',
    lessonIds: collectIds(MODULES_CATALOG_GENAI),
  },
  {
    trackId: 'rag',
    trackTitle: 'RAG & Vector Search Systems',
    subtitle: 'Chunking, HNSW Indexing, Hybrid BM25+Vector RRF & Reranking',
    badgeColor: 'from-teal-600 to-emerald-600',
    lessonIds: collectIds(MODULES_CATALOG_RAG),
  },
  {
    trackId: 'agents',
    trackTitle: 'Autonomous AI Agents',
    subtitle: 'ReAct Loops, Tool Calling, Multi-Agent Teams & Guardrails',
    badgeColor: 'from-sky-600 to-indigo-600',
    lessonIds: collectIds(MODULES_CATALOG_AGENTS),
  },
  {
    trackId: 'mlops',
    trackTitle: 'MLOps & LLMOps Engineering',
    subtitle: 'Drift Detection, Experiment Tracking, CI/CD Gates & Tracing',
    badgeColor: 'from-emerald-600 to-teal-600',
    lessonIds: collectIds(MODULES_CATALOG_MLOPS),
  },
  {
    trackId: 'deployment',
    trackTitle: 'AI Deployment, Cloud & Serving',
    subtitle: 'Docker, FastAPI, GPU Inference, vLLM & Multi-AZ Scaling',
    badgeColor: 'from-purple-600 to-indigo-600',
    lessonIds: collectIds(MODULES_CATALOG_DEPLOYMENT),
  },
  {
    trackId: 'numpy',
    trackTitle: 'NumPy Mastery',
    subtitle: 'Vectorization, Broadcasting, Memory Striding & Linear Algebra',
    badgeColor: 'from-cyan-600 to-blue-600',
    lessonIds: collectIds(MODULES_CATALOG_NUMPY),
  },
  {
    trackId: 'pandas',
    trackTitle: 'Pandas Mastery',
    subtitle: 'DataFrames, Cleaning, GroupBy Aggregations & High-Speed Pipelines',
    badgeColor: 'from-emerald-600 to-green-600',
    lessonIds: collectIds(MODULES_CATALOG_PANDAS),
  },
  {
    trackId: 'dsa',
    trackTitle: 'Data Structures & Algorithms',
    subtitle: 'Trees, Graphs, Dynamic Programming & Algorithmic Problem Solving',
    badgeColor: 'from-violet-600 to-fuchsia-600',
    lessonIds: collectIds(MODULES_CATALOG_DSA),
  },
  {
    trackId: 'python',
    trackTitle: 'Python Programming Mastery',
    subtitle: 'CPython Internals, OOP, Generators, Decorators & Memory Model',
    badgeColor: 'from-emerald-600 to-cyan-600',
    lessonIds: collectIds(MODULES_CATALOG_PYTHON),
  },
  {
    trackId: 'java',
    trackTitle: 'Java Programming Mastery',
    subtitle: 'JVM Architecture, Concurrency, Collections & DSA in Java',
    badgeColor: 'from-amber-600 to-red-600',
    lessonIds: collectIds(MODULES_CATALOG_JAVA),
  },
];

export function getTrackCertificateStats(
  track: CertificateTrackSpec,
  progress: UserProgressState | null
) {
  const total = track.lessonIds.length;
  const completedMap = progress?.completedLessons || {};
  let completed = 0;
  for (const id of track.lessonIds) {
    if (completedMap[id]) completed++;
  }
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  const quizEntries = track.lessonIds
    .map((id) => progress?.quizScores?.[id])
    .filter((q): q is { score: number; total: number; timestamp: string } =>
      Boolean(q && q.total > 0)
    );
  const avgQuizPct =
    quizEntries.length > 0
      ? Math.round(
          quizEntries.reduce((acc, q) => acc + (q.score / q.total) * 100, 0) /
            quizEntries.length
        )
      : 100;

  return {
    completed,
    total,
    pct,
    avgQuizPct,
    eligible: total > 0 && completed >= total,
  };
}
