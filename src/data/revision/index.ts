import { RevisionTopic, RevisionSubject, RevisionFilterOptions } from './types';
import { ML_REVISION_TOPICS } from './mlTopics';
import { PYTHON_REVISION_TOPICS } from './pythonTopics';
import { JAVA_REVISION_TOPICS } from './javaTopics';
import { DSA_REVISION_TOPICS } from './dsaTopics';
import { PLANNED_REVISION_TOPICS, PlannedTopic } from './plannedTopics';
import { REVISION_SUBJECTS } from './categories';

export * from './types';
export * from './categories';
export * from './plannedTopics';

export const ALL_REVISION_TOPICS: RevisionTopic[] = [
  ...ML_REVISION_TOPICS,
  ...PYTHON_REVISION_TOPICS,
  ...JAVA_REVISION_TOPICS,
  ...DSA_REVISION_TOPICS,
];

export function getTopicsBySubject(subject: RevisionSubject): RevisionTopic[] {
  switch (subject) {
    case 'ml':
      return ML_REVISION_TOPICS;
    case 'python':
      return PYTHON_REVISION_TOPICS;
    case 'java':
      return JAVA_REVISION_TOPICS;
    case 'dsa':
      return DSA_REVISION_TOPICS;
    default:
      return [];
  }
}

export function getTopicById(id: string): RevisionTopic | undefined {
  return ALL_REVISION_TOPICS.find((t) => t.id === id);
}

export function getPlannedTopicsBySubject(subject: RevisionSubject): PlannedTopic[] {
  return PLANNED_REVISION_TOPICS.filter((t) => t.subject === subject);
}

export function filterTopics(
  topics: RevisionTopic[],
  filters: RevisionFilterOptions,
  bookmarkedIds: string[] = [],
  revisedIds: string[] = []
): RevisionTopic[] {
  return topics.filter((t) => {
    // Subject filter
    if (filters.subject !== 'all' && t.subject !== filters.subject) {
      return false;
    }

    // Category filter
    if (filters.category && filters.category !== 'All' && t.category !== filters.category) {
      return false;
    }

    // Difficulty filter
    if (filters.difficulty !== 'all' && t.difficulty !== filters.difficulty) {
      return false;
    }

    // Interview favorite
    if (filters.isInterviewFavoriteOnly && !t.isInterviewFavorite) {
      return false;
    }

    // Bookmark / Status filter
    if (filters.status === 'bookmarked') {
      if (!bookmarkedIds.includes(t.id)) return false;
    } else if (filters.status === 'revised') {
      if (!revisedIds.includes(t.id)) return false;
    } else if (filters.status === 'learning') {
      if (revisedIds.includes(t.id) || !bookmarkedIds.includes(t.id)) {
        // learning could be started or in progress
      }
    }

    // Search query
    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase();
      const matchTitle = t.title.toLowerCase().includes(q);
      const matchSubtitle = t.subtitle.toLowerCase().includes(q);
      const matchOneLiner = t.quickRecall.oneLiner.toLowerCase().includes(q);
      const matchTags = t.tags.some((tag) => tag.toLowerCase().includes(q));
      const matchCategory = t.category.toLowerCase().includes(q);
      if (!matchTitle && !matchSubtitle && !matchOneLiner && !matchTags && !matchCategory) {
        return false;
      }
    }

    return true;
  });
}

export function getSubjectStats(
  subject: RevisionSubject,
  revisedIds: string[] = [],
  bookmarkedIds: string[] = []
) {
  const topics = getTopicsBySubject(subject);
  const total = topics.length;
  const revised = topics.filter((t) => revisedIds.includes(t.id)).length;
  const bookmarked = topics.filter((t) => bookmarkedIds.includes(t.id)).length;
  const percentage = total > 0 ? Math.round((revised / total) * 100) : 0;

  return {
    total,
    revised,
    bookmarked,
    percentage,
  };
}
