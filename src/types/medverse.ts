export type ContentStatus =
  | 'planned'
  | 'in_development'
  | 'ready_for_review'
  | 'medically_reviewed'
  | 'published';

export type MBBSPhaseId =
  | 'phase-1-preclinical'
  | 'phase-2-paraclinical'
  | 'phase-3-part1-clinical'
  | 'phase-3-part2-clinical';

export interface MBBSPhase {
  id: MBBSPhaseId;
  order: number;
  title: string;
  shortTitle: string;
  durationLabel: string;
  description: string;
  nmcCompetencyFocus: string;
}

export interface MBBSSubject {
  id: string;
  slug: string;
  phaseId: MBBSPhaseId;
  title: string;
  shortCode: string;
  departmentType: 'preclinical' | 'paraclinical' | 'clinical' | 'allied';
  description: string;
  nmcCodeRange: string;
  moduleIds: string[];
}

export interface MBBSModule {
  id: string;
  subjectId: string;
  title: string;
  organSystem: string;
  description: string;
  topicIds: string[];
}

export interface MedicalReference {
  id: string;
  citation: string;
  sourceType: 'textbook' | 'guideline' | 'ontology' | 'journal';
  url?: string;
}

export interface MBBSLearningObjective {
  code: string;
  statement: string;
}

export interface MBBSTopicSummary {
  id: string;
  moduleId: string;
  subjectId: string;
  phaseId: MBBSPhaseId;
  title: string;
  subtitle: string;
  status: ContentStatus;
  difficulty: 'Foundational' | 'Intermediate' | 'Clinical';
  estimatedMinutes: number;
  learningObjectives: MBBSLearningObjective[];
  assetId?: string;
  focusStructureIds?: string[];
  animationId?: string;
  hasShortNotes: boolean;
  mcqCount: number;
  flashcardCount: number;
  clinicalCaseIds?: string[];
  reviewerName?: string;
  lastReviewedAt?: string;
  contentVersion: string;
}

export interface AnatomyAssetMetadata {
  id: string;
  title: string;
  kind: 'glb_anatomical' | 'educational_schematic';
  modelUrl?: string;
  manifestUrl?: string;
  source: string;
  license: string;
  licenseUrl: string;
  attributionText: string;
  fileFormat: 'GLB' | 'Three.js Procedural Schematic';
  fileSizeBytes?: number;
  complexitySummary: string;
  supportedStructuresCount: number;
  supportedAnimationClips: string[];
  medicalReviewStatus: ContentStatus;
  limitationsNote: string;
  defaultCameraView: string;
  availableViews: Array<{
    id: string;
    label: string;
    direction: [number, number, number];
    targetOffset?: [number, number, number];
  }>;
}

export interface AnatomicalStructureMetadata {
  id: string;
  assetId: string;
  meshId: string;
  fmaId?: string;
  standardName: string;
  sourceName: string;
  group: string;
  subGroup?: string;
  color: string;
  location: string;
  anatomicalRelationships: string[];
  mainFunction: string;
  clinicalCorrelations: string[];
  relatedTopicIds: string[];
  relatedAnimationIds: string[];
  relatedQuizQuestionIds: string[];
  limitationsNote?: string;
  references: MedicalReference[];
}

export type AnimationRenderKind =
  | 'heart_blood_flow'
  | 'heart_conduction'
  | 'respiratory_mechanics'
  | 'renal_nephron'
  | 'neuro_action_potential'
  | 'sarcomere_contraction'
  | 'dna_replication';

export interface AnimationStepSpec {
  id: string;
  order: number;
  title: string;
  caption: string;
  explanation: string;
  startProgress: number; // 0..1
  endProgress: number; // 0..1
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
  highlightStructureIds: string[];
  calloutLabel?: string;
  calloutPosition?: [number, number, number];
  clinicalPearl?: string;
}

export interface ScientificAnimationSpec {
  id: string;
  title: string;
  system: string;
  topicId: string;
  assetId: string;
  renderKind: AnimationRenderKind;
  isSchematic: boolean;
  simplificationNotice: string;
  durationSeconds: number;
  status: ContentStatus;
  steps: AnimationStepSpec[];
  references: MedicalReference[];
}

export interface ComparisonTableData {
  title: string;
  headers: string[];
  rows: string[][];
}

export interface MBBSNoteSection {
  topicId: string;
  version: string;
  status: ContentStatus;
  author: string;
  reviewer: string;
  lastReviewedAt: string;
  sixtySecondSummary: string[];
  twoMinuteRevision: {
    coreConcept: string;
    essentialFacts: string[];
    highYieldSequence: string[];
    memoryAid: string;
  };
  detailedNotes: {
    coreConcept: string;
    definitions: Array<{ term: string; definition: string }>;
    classifications: Array<{ title: string; items: string[] }>;
    mechanismSteps: string[];
    importantRelationships: string[];
    comparisonTable?: ComparisonTableData;
    diagramCaptions: Array<{ title: string; description: string }>;
    clinicalCorrelations: string[];
    commonMistakes: string[];
    rapidRevisionSummary: string[];
  };
  references: MedicalReference[];
}

export interface MBBSMCQ {
  id: string;
  topicId: string;
  subjectId: string;
  questionType: 'single_best_answer' | 'structure_identification' | 'clinical_vignette';
  stem: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
  linkedStructureId?: string;
  linkedAssetId?: string;
  difficulty: 'Foundational' | 'Intermediate' | 'Clinical';
  sourceLabel: 'MedVerse Practice Item (Synthetic)';
}

export interface MBBSFlashcard {
  id: string;
  topicId: string;
  subjectId: string;
  front: string;
  back: string;
  clinicalHint?: string;
}

export interface SyntheticClinicalCase {
  id: string;
  title: string;
  subjectId: string;
  topicId: string;
  assetId?: string;
  focusStructureIds?: string[];
  animationId?: string;
  disclaimer: string;
  scenario: string;
  relevantHistory: string[];
  examinationAndFindings: string[];
  learningObjectives: string[];
  differentialDiagnosis: Array<{
    condition: string;
    supportingFeatures: string;
    rulingOutOrConfirming: string;
  }>;
  anatomyPhysiologyLink: string;
  questionIds: string[];
  references: MedicalReference[];
  status: ContentStatus;
}

export interface MedVerseAttemptRecord {
  questionId: string;
  topicId: string;
  subjectId: string;
  selectedIndex: number;
  isCorrect: boolean;
  answeredAt: string;
}

export interface MedVerseFlashcardReview {
  cardId: string;
  easeFactor: number;
  intervalDays: number;
  repetitions: number;
  nextReviewAt: string;
  lastReviewedAt: string;
}

export interface MedVerseStudySession {
  id: string;
  topicId: string;
  mode: 'anatomy' | 'animation' | 'notes' | 'quiz' | 'case';
  durationSeconds: number;
  recordedAt: string;
}

export interface MedVerseUserProgress {
  completedTopics: Record<string, boolean>;
  bookmarkedTopicIds: string[];
  bookmarkedStructureIds: string[];
  attempts: MedVerseAttemptRecord[];
  flashcardReviews: Record<string, MedVerseFlashcardReview>;
  studySessions: MedVerseStudySession[];
  lastVisitedTopicId?: string;
  updatedAt: string;
}
