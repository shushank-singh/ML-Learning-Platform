import { RevisionSubject, RevisionTopic } from './types';

const subjectCache: Partial<Record<RevisionSubject, RevisionTopic[]>> = {};

/**
 * Lazily loads revision topics for a single subject so webpack splits each
 * subject's topic bank into its own on-demand chunk instead of bloating the
 * initial /revision-notes page bundle.
 */
export async function loadRevisionSubjectTopics(
  subject: RevisionSubject
): Promise<RevisionTopic[]> {
  if (subjectCache[subject]) {
    return subjectCache[subject]!;
  }

  let topics: RevisionTopic[] = [];
  switch (subject) {
    case 'ml': {
      const mod = await import('./mlTopics');
      topics = mod.ML_REVISION_TOPICS;
      break;
    }
    case 'python': {
      const mod = await import('./pythonTopics');
      topics = mod.PYTHON_REVISION_TOPICS;
      break;
    }
    case 'java': {
      const mod = await import('./javaTopics');
      topics = mod.JAVA_REVISION_TOPICS;
      break;
    }
    case 'dsa': {
      const mod = await import('./dsaTopics');
      topics = mod.DSA_REVISION_TOPICS;
      break;
    }
  }

  subjectCache[subject] = topics;
  return topics;
}
