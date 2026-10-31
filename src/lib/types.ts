export type AlgorithmType =
  | 'linear-regression'
  | 'gradient-descent'
  | 'logistic-boundary'
  | 'kmeans'
  | 'knn'
  | 'decision-tree'
  | 'neural-net'
  | 'metrics-roc'
  | 'pca'
  | 'svm-boundary'
  | 'numpy-interactive'
  | 'pandas-interactive'
  | 'neuron-calculator'
  | 'activation-explorer'
  | 'forward-prop-explorer'
  | 'loss-explorer'
  | 'gradient-descent-playground'
  | 'overfitting-explorer'
  | 'cnn-convolution-explorer'
  | 'attention-explorer'
  | 'none';

export interface LessonSummary {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  order: number;
  readTimeMinutes: number;
  visualizerType: AlgorithmType;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface ModuleData {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  badge: string;
  estimatedHours: number;
  topicsCount: number;
  lessons: LessonSummary[];
}

export interface MathFoundationItem {
  name: string;
  latex: string;
  explanation: string;
}

export interface DerivationStep {
  step: number;
  label: string;
  latex: string;
  explanation: string;
}

export interface VariableItem {
  symbol: string;
  name: string;
  description: string;
  dimensions?: string;
}

export interface NumericalCalculation {
  step: string;
  math: string;
  result: string;
}

export interface NumericalExample {
  scenario: string;
  dataset: Record<string, number | string>[];
  calculations: NumericalCalculation[];
  finalConclusion: string;
}

export interface LineExplanation {
  lines: string;
  codeSnippet: string;
  line?: number | string;
  code?: string;
  explanation: string;
}

export interface HyperparameterItem {
  name: string;
  defaultVal: string;
  range: string;
  effect: string;
  recommendation: string;
}

export interface AssumptionItem {
  assumption: string;
  whyItMatters: string;
  howToVerify: string;
}

export interface CommonMistake {
  mistake: string;
  solution: string;
  whyWrong?: string;
  howToFix?: string;
  correction?: string;
  codeExample?: string;
}

export interface UseCaseItem {
  industry?: string;
  application?: string;
  benefit?: string;
  useCase?: string;
  impact?: string;
  title?: string;
  description?: string;
}

export interface PracticeQuestion {
  id: string;
  question: string;
  hint?: string;
  answer: string;
  explanation?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  correctAnswer?: number;
  explanation: string;
}

export interface ExerciseItem {
  id?: string;
  title: string;
  problem: string;
  description?: string;
  difficulty?: string;
  hints: string[];
  starterCode: string;
  solution: string;
  solutionCode?: string;
  testCases?: any;
}

export interface JavaExerciseItem {
  id?: string;
  title: string;
  problem?: string;
  description?: string;
  difficulty?: string;
  hints?: string[];
  starterCode: string;
  solution?: string;
  solutionCode?: string;
  testCases?: any;
}

export interface LessonContent {
  id: string;
  moduleId: string;
  title: string;
  subtitle: string;
  order: number;
  readTimeMinutes: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  visualizerType: AlgorithmType;
  
  // Learning Objectives & Prerequisites
  objectives?: string[];
  prerequisites?: string[];
  previousLesson?: {
    id: string;
    title: string;
    moduleId?: string;
  };
  
  // 1. Real-World Analogy
  analogy: {
    title: string;
    text: string;
    metaphor: string;
  };

  // 2. What problem does this solve?
  problemSolved: {
    title: string;
    description: string;
    keyPoints: string[];
  };

  // 3. Intuition & mechanics
  intuition: {
    overview: string;
    steps: { step: number; title: string; description: string }[];
  };

  // 4. Mathematical foundations
  mathematics: {
    overview: string;
    foundations: MathFoundationItem[];
  };

  // 5. Step-by-step mathematical derivation
  derivation: {
    title: string;
    objective: string;
    steps: DerivationStep[];
  };

  // 6. Formula breakdown with every variable
  variables: VariableItem[];

  // 7. Small numerical example solved by hand
  numericalExample: NumericalExample;

  // 8. Visual explanation text
  visualExplanation: {
    title: string;
    description: string;
    features: string[];
  };

  // 9. Python from scratch (NumPy)
  scratchCode: {
    title: string;
    code: string;
    explanation: string;
  };

  // 10. Scikit-learn implementation
  sklearnCode: {
    title: string;
    code: string;
    explanation: string;
  };

  // 11. Runnable code with expected output
  runnableCode: {
    code: string;
    expectedOutput: string;
  };

  // 12. Line-by-line code explanation
  lineByLineExplanation: LineExplanation[];

  // 13. Important hyperparameters
  hyperparameters: HyperparameterItem[];

  // 14. Assumptions and limitations
  assumptions: AssumptionItem[];

  // 15. Common mistakes and debugging tips
  commonMistakes: CommonMistake[];

  // 16. Real-world use cases
  realWorldUseCases: UseCaseItem[];

  // 17. 3-5 Practice questions
  practiceQuestions: PracticeQuestion[];

  // 18. Short quiz with explanations
  quiz: QuizQuestion[];

  // 19. Independent exercise
  independentExercise: ExerciseItem;

  // 20. Summary and next lesson bridge
  summary: {
    keyTakeaways: string[];
    nextLessonId?: string;
    nextLessonTitle?: string;
    nextLessonModuleId?: string;
  };
}

export interface FormulaCatalogItem {
  id: string;
  name: string;
  category: 'Linear Algebra' | 'Calculus' | 'Probability & Stats' | 'Loss Functions' | 'Optimization' | 'Metrics';
  latex: string;
  description: string;
  variables: { symbol: string; explanation: string }[];
  derivationNotes: string;
  relatedLessonId?: string;
  relatedModuleId?: string;
}

export interface ProjectMilestone {
  step: number;
  title: string;
  description: string;
  tasks: string[];
  starterCodeSnippet: string;
}

export interface ProjectData {
  id: string;
  title: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  businessObjective: string;
  datasetInfo: {
    name: string;
    description: string;
    featuresCount: number;
    rowsCount: string;
    source: string;
    dataDictionary: { column: string; type: string; description: string }[];
  };
  edaChecklist: string[];
  preprocessingPlan: string[];
  baselineModel: string;
  evaluationCriteria: string[];
  errorAnalysis: string[];
  deploymentPlan: string[];
  deliverables: string[];
  milestones: ProjectMilestone[];
}

export interface UserProgressState {
  completedLessons: Record<string, boolean>;
  bookmarks: string[];
  notes: Record<string, string>;
  quizScores: Record<string, { score: number; total: number; timestamp: string }>;
  streak: {
    currentStreak: number;
    longestStreak: number;
    lastActiveDate: string; // YYYY-MM-DD
  };
  totalMinutesLearned: number;
  weakTopics: string[];
}

// ============================================================
// DSA MASTERY LAB TYPES
// ============================================================

export type DSAAlgorithmType =
  | 'sorting'
  | 'binary-search'
  | 'linked-list'
  | 'stack-queue'
  | 'tree'
  | 'graph'
  | 'dp-table'
  | 'recursion-tree'
  | 'heap'
  | 'hash-table'
  | 'trie'
  | 'none';

export interface DSALessonSummary {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  order: number;
  readTimeMinutes: number;
  visualizerType: DSAAlgorithmType;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  prerequisites?: string[];
}

export interface DSAModuleData {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  badge: string;
  estimatedHours: number;
  topicsCount: number;
  lessons: DSALessonSummary[];
}

export interface DSAComplexityItem {
  case: 'Best' | 'Average' | 'Worst';
  time: string;
  space: string;
  explanation: string;
}

export interface DSAWorkedExampleStep {
  step: number;
  action: string;
  state: string;
  explanation: string;
}

export interface DSALessonContent {
  id: string;
  moduleId: string;
  title: string;
  subtitle: string;
  order: number;
  readTimeMinutes: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  visualizerType: DSAAlgorithmType;

  objectives: string[];
  prerequisites: string[];
  previousLesson?: { id: string; title: string; moduleId: string };

  analogy: { title: string; text: string; metaphor: string };
  problemSolved: { title: string; description?: string; text?: string; keyPoints: string[] };
  intuition: {
    overview: string;
    steps: { step: number; title: string; description: string }[];
  };
  formalDefinition: { text: string; latex?: string };

  complexity: {
    overview: string;
    cases: DSAComplexityItem[];
    spaceNote: string;
  };

  workedExample: {
    title: string;
    input: string;
    steps: DSAWorkedExampleStep[];
    finalOutput: string;
  };

  visualExplanation: { title: string; description: string; features: string[] };
  pseudocode: { title: string; code: string };
  pythonCode: { title: string; code: string; explanation: string };
  runnableCode: { code: string; expectedOutput: string };
  lineByLineExplanation: LineExplanation[];
  lineByLine?: LineExplanation[];

  edgeCases: { case: string; handling: string; example: string }[];
  commonMistakes: CommonMistake[];
  applications: UseCaseItem[];
  practiceQuestions: PracticeQuestion[];
  quiz: QuizQuestion[];

  codingChallenge: ExerciseItem;

  summary: {
    keyTakeaways: string[];
    nextLessonId?: string;
    nextLessonTitle?: string;
    nextLessonModuleId?: string;
  };
}

// ============================================================
// PYTHON MASTERY LAB TYPES
// ============================================================

export type PythonConceptType =
  | 'execution-trace'
  | 'data-structure-visual'
  | 'oop-diagram'
  | 'memory-model'
  | 'none';

export interface PythonLessonSummary {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  order: number;
  readTimeMinutes: number;
  visualizerType: PythonConceptType;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  prerequisites?: string[];
}

export interface PythonModuleData {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  badge: string;
  estimatedHours: number;
  topicsCount: number;
  lessons: PythonLessonSummary[];
}

export interface PythonLessonContent {
  id: string;
  moduleId: string;
  title: string;
  subtitle: string;
  order: number;
  readTimeMinutes: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  visualizerType: PythonConceptType;

  objectives: string[];
  prerequisites: string[];
  previousLesson?: { id: string; title: string; moduleId: string };

  analogy: { title: string; text: string; metaphor: string };
  problemSolved: { title: string; description?: string; text?: string; keyPoints: string[] };
  intuition: {
    overview: string;
    steps: { step: number; title: string; description: string }[];
  };

  codeExample: { title: string; code: string; explanation: string };
  runnableCode: { code: string; expectedOutput: string };
  lineByLineExplanation: LineExplanation[];
  lineByLine?: LineExplanation[];

  commonMistakes: CommonMistake[];
  bestPractices: string[];
  applications: UseCaseItem[];
  realWorldApplications?: any;
  practiceQuestions: PracticeQuestion[];
  quiz: QuizQuestion[];

  codingChallenge: ExerciseItem;

  summary: {
    keyTakeaways: string[];
    nextLessonId?: string;
    nextLessonTitle?: string;
    nextLessonModuleId?: string;
  };
}

// ============================================================
// JAVA MASTERY LAB TYPES
// ============================================================

export type JavaConceptType =
  | 'jvm-architecture'
  | 'memory-model'
  | 'control-flow'
  | 'call-stack'
  | 'oop-hierarchy'
  | 'array-algorithm'
  | 'collections-visual'
  | 'none';

export interface JavaLessonSummary {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  order: number;
  readTimeMinutes: number;
  visualizerType: JavaConceptType;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  prerequisites?: string[];
}

export interface JavaModuleData {
  id: string;
  number: number;
  order?: number;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  badge: string;
  estimatedHours: number;
  topicsCount: number;
  lessons: JavaLessonSummary[];
}

export interface JavaLessonContent {
  id: string;
  moduleId: string;
  title: string;
  subtitle: string;
  order: number;
  readTimeMinutes: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  visualizerType: JavaConceptType;

  objectives: string[];
  prerequisites: string[];
  previousLesson?: { id: string; title: string; moduleId: string };

  analogy: { title: string; text: string; metaphor: string };
  problemSolved: { title: string; description?: string; text?: string; keyPoints: string[] };
  intuition: {
    overview: string;
    steps: { step: number; title: string; description: string }[];
  };

  visualExplanation?: { title: string; description: string; features: string[] };
  codeExample: { title: string; code: string; explanation: string };
  runnableCode: { code: string; expectedOutput: string };
  lineByLineExplanation: LineExplanation[];
  lineByLine?: LineExplanation[];

  commonMistakes: CommonMistake[];
  bestPractices: string[];
  applications: UseCaseItem[];
  realWorldApplications?: any;
  practiceQuestions: PracticeQuestion[];
  quiz: QuizQuestion[];

  codingChallenge: JavaExerciseItem;

  summary: {
    keyTakeaways: string[];
    nextLessonId?: string;
    nextLessonTitle?: string;
    nextLessonModuleId?: string;
  };
}

