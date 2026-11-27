import { ANATOMY_ASSETS, ANATOMY_ASSET_LIST } from './assets';
import { HEART_STRUCTURES, HEART_STRUCTURES_BY_ID } from './heartStructures';
import { SKELETON_STRUCTURES, SKELETON_STRUCTURES_BY_ID } from './skeletonStructures';
import {
  ORGAN_STRUCTURES_BY_ASSET,
  PATHOLOGY_TERRITORIES,
  BRAIN_STRUCTURES,
  LUNGS_STRUCTURES,
  KIDNEYS_STRUCTURES,
  LIVER_STRUCTURES,
  EYE_STRUCTURES,
} from './organStructures';
import { SCIENTIFIC_ANIMATIONS, SCIENTIFIC_ANIMATIONS_BY_ID } from './animations';
import {
  MBBS_PHASES,
  MBBS_SUBJECTS_CATALOG,
  MBBS_MODULES_CATALOG,
  MBBS_TOPICS_CATALOG,
  MBBS_CURRICULUM_STATS,
} from './curriculum';
import {
  MEDVERSE_NOTES,
  MEDVERSE_MCQS,
  MEDVERSE_FLASHCARDS,
  SYNTHETIC_CLINICAL_CASES,
} from './topicsContent';
import { AnatomicalStructureMetadata } from '@/types/medverse';

export {
  ANATOMY_ASSETS,
  ANATOMY_ASSET_LIST,
  HEART_STRUCTURES,
  HEART_STRUCTURES_BY_ID,
  SKELETON_STRUCTURES,
  SKELETON_STRUCTURES_BY_ID,
  BRAIN_STRUCTURES,
  LUNGS_STRUCTURES,
  KIDNEYS_STRUCTURES,
  LIVER_STRUCTURES,
  EYE_STRUCTURES,
  ORGAN_STRUCTURES_BY_ASSET,
  PATHOLOGY_TERRITORIES,
  SCIENTIFIC_ANIMATIONS,
  SCIENTIFIC_ANIMATIONS_BY_ID,
  MBBS_PHASES,
  MBBS_SUBJECTS_CATALOG,
  MBBS_MODULES_CATALOG,
  MBBS_TOPICS_CATALOG,
  MBBS_CURRICULUM_STATS,
  MEDVERSE_NOTES,
  MEDVERSE_MCQS,
  MEDVERSE_FLASHCARDS,
  SYNTHETIC_CLINICAL_CASES,
};

export function getStructuresForAsset(assetId: string): AnatomicalStructureMetadata[] {
  if (assetId === 'heart-bp3d') return HEART_STRUCTURES;
  if (assetId === 'skeleton-bp3d') return SKELETON_STRUCTURES;
  return ORGAN_STRUCTURES_BY_ASSET[assetId] || [];
}

export function getStructureMetadata(
  assetId: string,
  structureId: string
): AnatomicalStructureMetadata | null {
  if (assetId === 'heart-bp3d') return HEART_STRUCTURES_BY_ID[structureId] || null;
  if (assetId === 'skeleton-bp3d') return SKELETON_STRUCTURES_BY_ID[structureId] || null;
  const list = ORGAN_STRUCTURES_BY_ASSET[assetId];
  return list ? list.find((s) => s.id === structureId || s.meshId === structureId) || null : null;
}

export function getTopicById(topicId: string) {
  return MBBS_TOPICS_CATALOG.find((t) => t.id === topicId) || null;
}

export function getSubjectById(subjectId: string) {
  return MBBS_SUBJECTS_CATALOG.find((s) => s.id === subjectId) || null;
}

export function getModuleById(moduleId: string) {
  return MBBS_MODULES_CATALOG.find((m) => m.id === moduleId) || null;
}

export function getMCQsForTopic(topicId: string) {
  return MEDVERSE_MCQS.filter((q) => q.topicId === topicId);
}

export function getFlashcardsForTopic(topicId: string) {
  return MEDVERSE_FLASHCARDS.filter((c) => c.topicId === topicId);
}

export function getCasesForTopic(topicId: string) {
  return SYNTHETIC_CLINICAL_CASES.filter((c) => c.topicId === topicId);
}
