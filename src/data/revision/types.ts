export type RevisionSubject = 'ml' | 'python' | 'java' | 'dsa';

export type RevisionDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export type RevisionStatus = 'not_started' | 'learning' | 'revised';

export interface QuickRecallQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface FormulaOrSyntax {
  label: string;
  codeOrLatex: string;
  isLatex?: boolean;
  language?: string;
  description?: string;
}

export interface ComplexityInfo {
  time: string;
  space: string;
  bestCase?: string;
  worstCase?: string;
  explanation?: string;
}

export interface CommonMistakeOrTrap {
  mistake: string;
  fix: string;
  interviewTrap?: string;
  codeSnippet?: string;
}

export interface PracticalCodeSnippet {
  title: string;
  language: string;
  code: string;
  input?: string;
  output?: string;
  explanation: string;
}

export interface QuickRecallData {
  oneLiner: string;
  simpleAnalogy?: string;
  whenToUse: string;
  whyItMatters: string;
  keyPoints: string[];
  formulaOrSyntax?: FormulaOrSyntax;
  complexity?: ComplexityInfo;
  commonMistakeOrTrap: CommonMistakeOrTrap;
  examCheatsheet: string[]; // Essential facts hidden in exam mode until revealed
}

export interface VisualData {
  type:
    | 'flowchart'
    | 'diagram'
    | 'memory-layout'
    | 'comparison-table'
    | 'boundary-plot'
    | 'architecture'
    | 'step-trace'
    | 'custom';
  title: string;
  caption: string;
  visualKey: string;
  details?: {
    inputOutput?: { input: string; output: string };
    comparison?: { headers: string[]; rows: string[][] };
    steps?: { label: string; desc: string; highlight?: boolean }[];
    annotations?: { label: string; text: string }[];
  };
}

export interface AnimationStep {
  step: number;
  label: string;
  description: string;
  state: Record<string, any>;
  highlightIndices?: number[];
}

export interface AnimationData {
  type: string;
  title: string;
  description: string;
  stepsTotal?: number;
  hasInteractiveInputs?: boolean;
  inputConfig?: {
    type: 'slider' | 'buttons' | 'select' | 'stepper';
    label: string;
    min?: number;
    max?: number;
    step?: number;
    options?: string[];
    defaultVal?: any;
  };
  steps?: AnimationStep[];
}

export interface RevisionTopic {
  id: string;
  subject: RevisionSubject;
  category: string;
  title: string;
  subtitle: string;
  difficulty: RevisionDifficulty;
  isInterviewFavorite?: boolean;
  readTimeSeconds: number; // 30 - 90 seconds
  tags: string[];

  // Strict Section A: Quick Recall (20% Text)
  quickRecall: QuickRecallData;

  // Strict Section B: Visual Understanding (50% Visuals)
  visual: VisualData;

  // Strict Section C: See It in Action (30% Animation)
  animation: AnimationData;

  // Practical Code Example (Clean, runnable code with input & output)
  codeSnippet?: PracticalCodeSnippet;

  // Smart Feature: Lightweight Quiz (3 recall questions)
  quiz: QuickRecallQuestion[];
}

export interface SubjectMeta {
  id: RevisionSubject;
  name: string;
  fullName: string;
  shortDescription: string;
  color: {
    primary: string;
    border: string;
    bgBadge: string;
    textAccent: string;
    gradient: string;
  };
  categories: string[];
  illustrationType: 'neural-net' | 'data-flow' | 'jvm-memory' | 'algorithm-tree';
}

export interface RevisionFilterOptions {
  subject: RevisionSubject | 'all';
  searchQuery: string;
  category: string;
  difficulty: RevisionDifficulty | 'all';
  isInterviewFavoriteOnly: boolean;
  status: RevisionStatus | 'all' | 'bookmarked';
}
