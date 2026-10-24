import { RevisionSubject, RevisionDifficulty } from './types';

export interface PlannedTopic {
  id: string;
  subject: RevisionSubject;
  category: string;
  title: string;
  subtitle: string;
  difficulty: RevisionDifficulty;
  plannedQuarter: string;
  tags: string[];
}

export const PLANNED_REVISION_TOPICS: PlannedTopic[] = [
  // ML Planned
  {
    id: 'ml-plan-naive-bayes',
    subject: 'ml',
    category: 'Naive Bayes',
    title: 'Naive Bayes Classifier & Laplace Smoothing',
    subtitle: 'Conditional Independence Assumption and Text Classification',
    difficulty: 'Beginner',
    plannedQuarter: 'Upcoming Release',
    tags: ['Probability', 'Bayes Theorem', 'NLP', 'Laplace Smoothing'],
  },
  {
    id: 'ml-plan-dbscan',
    subject: 'ml',
    category: 'K-Means and DBSCAN',
    title: 'DBSCAN: Density-Based Clustering of Noisy Data',
    subtitle: 'Core Points, Border Points, and Arbitrary Spatial Manifolds',
    difficulty: 'Intermediate',
    plannedQuarter: 'Upcoming Release',
    tags: ['Density', 'Epsilon', 'MinPts', 'Noise Filtering'],
  },
  {
    id: 'ml-plan-neural-networks',
    subject: 'ml',
    category: 'Neural Networks',
    title: 'Multi-Layer Perceptrons & Backpropagation',
    subtitle: 'Chain Rule Derivatives, Activations, and Matrix Weights',
    difficulty: 'Advanced',
    plannedQuarter: 'Upcoming Release',
    tags: ['Deep Learning', 'Backprop', 'Activations', 'Tensors'],
  },
  {
    id: 'ml-plan-mlops',
    subject: 'ml',
    category: 'Model Deployment and MLOps',
    title: 'Model Drift, Latency & MLOps Pipelines',
    subtitle: 'Data Drift vs Concept Drift, Feature Stores, and Inference Serving',
    difficulty: 'Advanced',
    plannedQuarter: 'Upcoming Release',
    tags: ['MLOps', 'Concept Drift', 'Docker', 'Monitoring'],
  },

  // Python Planned
  {
    id: 'py-plan-recursion',
    subject: 'python',
    category: 'Recursion',
    title: 'Recursion Depth & Tail Call Optimization in Python',
    subtitle: 'Call Stack Limits, `sys.setrecursionlimit`, and Memoization',
    difficulty: 'Intermediate',
    plannedQuarter: 'Upcoming Release',
    tags: ['Recursion', 'Call Stack', 'Memoization'],
  },
  {
    id: 'py-plan-file-handling',
    subject: 'python',
    category: 'File Handling',
    title: 'Context Managers & Low-Level File Buffering',
    subtitle: 'Binary vs Text Streams, `open()` Buffering, and `os.walk`',
    difficulty: 'Beginner',
    plannedQuarter: 'Upcoming Release',
    tags: ['I/O', 'Context Managers', 'Files', 'Streams'],
  },
  {
    id: 'py-plan-numpy-pandas',
    subject: 'python',
    category: 'NumPy and Pandas essentials',
    title: 'NumPy Strides & Pandas Vectorization',
    subtitle: 'Broadcasting, Memory Views, and Vectorized Cython Acceleration',
    difficulty: 'Intermediate',
    plannedQuarter: 'Upcoming Release',
    tags: ['NumPy', 'Pandas', 'Broadcasting', 'Vectorization'],
  },

  // Java Planned
  {
    id: 'java-plan-generics',
    subject: 'java',
    category: 'Generics',
    title: 'Java Generics: Type Erasure & Wildcards',
    subtitle: 'PECS Rule (Producer Extends, Consumer Super) and Bridge Methods',
    difficulty: 'Advanced',
    plannedQuarter: 'Upcoming Release',
    tags: ['Generics', 'Type Erasure', 'Wildcards', 'PECS'],
  },
  {
    id: 'java-plan-constructors-super',
    subject: 'java',
    category: 'Constructors and this / super',
    title: 'Constructor Chaining: `this()` and `super()`',
    subtitle: 'Initialization Order: Static Blocks, Instance Blocks, and Constructors',
    difficulty: 'Beginner',
    plannedQuarter: 'Upcoming Release',
    tags: ['Constructors', 'super', 'Initialization Order'],
  },

  // DSA Planned
  {
    id: 'dsa-plan-tries',
    subject: 'dsa',
    category: 'Tries',
    title: 'Trie (Prefix Tree) Architecture',
    subtitle: 'Prefix Autocomplete, Spell Checking, and Bitwise XOR Tries',
    difficulty: 'Intermediate',
    plannedQuarter: 'Upcoming Release',
    tags: ['Trie', 'Prefix Tree', 'Strings', 'Autocomplete'],
  },
  {
    id: 'dsa-plan-dsu',
    subject: 'dsa',
    category: 'Disjoint Set Union',
    title: 'Disjoint Set Union (Union-Find) with Rank & Path Compression',
    subtitle: 'Near O(1) Amortized Inverse Ackermann Function α(N)',
    difficulty: 'Advanced',
    plannedQuarter: 'Upcoming Release',
    tags: ['DSU', 'Union-Find', 'Kruskal', 'Inverse Ackermann'],
  },
  {
    id: 'dsa-plan-greedy',
    subject: 'dsa',
    category: 'Greedy Algorithms',
    title: 'Greedy Choice Property & Interval Scheduling',
    subtitle: 'Locally Optimal Choices, Activity Selection, and Huffman Coding',
    difficulty: 'Intermediate',
    plannedQuarter: 'Upcoming Release',
    tags: ['Greedy', 'Intervals', 'Activity Selection', 'Optimization'],
  },
];
