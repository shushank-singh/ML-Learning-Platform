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

// All planned topics have been fully implemented across all 4 subjects!
// Zero blank topics remain.
export const PLANNED_REVISION_TOPICS: PlannedTopic[] = [];
