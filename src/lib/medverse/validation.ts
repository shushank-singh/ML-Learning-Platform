import { z } from 'zod';

export const ContentStatusSchema = z.enum([
  'planned',
  'in_development',
  'ready_for_review',
  'medically_reviewed',
  'published',
]);

export const MBBSPhaseIdSchema = z.enum([
  'phase-1-preclinical',
  'phase-2-paraclinical',
  'phase-3-part1-clinical',
  'phase-3-part2-clinical',
]);

export const AnatomicalStructureMetadataSchema = z.object({
  id: z.string().min(2).max(120),
  assetId: z.string().min(2),
  meshId: z.string().min(1),
  fmaId: z.string().optional(),
  standardName: z.string().min(2).max(160),
  sourceName: z.string().min(2),
  group: z.string().min(2),
  subGroup: z.string().optional(),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  location: z.string().min(4),
  anatomicalRelationships: z.array(z.string().min(2)).min(1),
  mainFunction: z.string().min(4),
  clinicalCorrelations: z.array(z.string().min(2)).min(1),
  relatedTopicIds: z.array(z.string()),
  relatedAnimationIds: z.array(z.string()),
  relatedQuizQuestionIds: z.array(z.string()),
  limitationsNote: z.string().optional(),
});

export const AnimationStepSpecSchema = z
  .object({
    id: z.string().min(2),
    order: z.number().int().min(1),
    title: z.string().min(2),
    caption: z.string().min(4),
    explanation: z.string().min(8),
    startProgress: z.number().min(0).max(1),
    endProgress: z.number().min(0).max(1),
    cameraPosition: z.tuple([z.number(), z.number(), z.number()]),
    cameraTarget: z.tuple([z.number(), z.number(), z.number()]),
    highlightStructureIds: z.array(z.string()),
    calloutLabel: z.string().optional(),
    calloutPosition: z.tuple([z.number(), z.number(), z.number()]).optional(),
    clinicalPearl: z.string().optional(),
  })
  .refine((step) => step.endProgress >= step.startProgress, {
    message: 'Animation step endProgress must be >= startProgress',
  });

export const MBBSMCQSchema = z.object({
  id: z.string().min(2),
  topicId: z.string().min(2),
  subjectId: z.string().min(2),
  questionType: z.enum([
    'single_best_answer',
    'structure_identification',
    'clinical_vignette',
  ]),
  stem: z.string().min(10),
  options: z.tuple([z.string().min(1), z.string().min(1), z.string().min(1), z.string().min(1)]),
  correctIndex: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)]),
  explanation: z.string().min(10),
  linkedStructureId: z.string().optional(),
  linkedAssetId: z.string().optional(),
  difficulty: z.enum(['Foundational', 'Intermediate', 'Clinical']),
  sourceLabel: z.literal('MedVerse Practice Item (Synthetic)'),
});

export const TopicCreateOrUpdateSchema = z.object({
  id: z
    .string()
    .min(3)
    .max(100)
    .regex(/^[a-z0-9-]+$/, 'Topic ID must be lowercase alphanumeric with hyphens'),
  moduleId: z.string().min(2),
  subjectId: z.string().min(2),
  phaseId: MBBSPhaseIdSchema,
  title: z.string().min(3).max(180),
  subtitle: z.string().min(3).max(240),
  status: ContentStatusSchema,
  difficulty: z.enum(['Foundational', 'Intermediate', 'Clinical']),
  estimatedMinutes: z.number().int().min(1).max(240),
  assetId: z.string().optional(),
  focusStructureIds: z.array(z.string()).optional(),
  animationId: z.string().optional(),
  contentVersion: z.string().min(1).default('1.0.0'),
  reviewerName: z.string().optional(),
});

export const MedVersePinAnnotationSchema = z.object({
  id: z.string().min(2).max(100),
  assetId: z.string().min(2),
  structureId: z.string().min(1),
  position: z.tuple([z.number(), z.number(), z.number()]),
  title: z.string().min(1).max(120),
  note: z.string().max(600),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
  createdAt: z.string(),
});

export const MedVerseStudyCollectionSchema = z.object({
  id: z.string().min(2).max(100),
  name: z.string().min(1).max(120),
  assetId: z.string().min(2),
  selectedStructureId: z.string().nullable().optional(),
  hiddenStructureIds: z.array(z.string()).max(400),
  isolatedStructureId: z.string().nullable().optional(),
  xrayMode: z.boolean(),
  cameraView: z.string().min(1),
  note: z.string().max(600).optional(),
  createdAt: z.string(),
});

export const MedVerseProgressUpdateSchema = z.object({
  completedTopics: z.record(z.string(), z.boolean()).optional(),
  bookmarkedTopicIds: z.array(z.string()).max(500).optional(),
  bookmarkedStructureIds: z.array(z.string()).max(1000).optional(),
  pinAnnotations: z.array(MedVersePinAnnotationSchema).max(500).optional(),
  collections: z.array(MedVerseStudyCollectionSchema).max(200).optional(),
  attempts: z
    .array(
      z.object({
        questionId: z.string(),
        topicId: z.string(),
        subjectId: z.string(),
        selectedIndex: z.number().int().min(0).max(3),
        isCorrect: z.boolean(),
        answeredAt: z.string(),
      })
    )
    .max(5000)
    .optional(),
  flashcardReviews: z
    .record(
      z.string(),
      z.object({
        cardId: z.string(),
        easeFactor: z.number().min(1.3).max(4.0),
        intervalDays: z.number().int().min(1),
        repetitions: z.number().int().min(0),
        nextReviewAt: z.string(),
        lastReviewedAt: z.string(),
      })
    )
    .optional(),
  studySessions: z
    .array(
      z.object({
        id: z.string(),
        topicId: z.string(),
        mode: z.enum(['anatomy', 'animation', 'notes', 'quiz', 'case']),
        durationSeconds: z.number().min(0).max(86400),
        recordedAt: z.string(),
      })
    )
    .max(2000)
    .optional(),
  lastVisitedTopicId: z.string().optional(),
});
