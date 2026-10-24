'use client';

import { RevisionStatus } from '@/data/revision/types';

const REVISION_STORAGE_KEY = 'ml_mastery_revision_progress_v1';

export interface RevisionStorageState {
  revisionStatus: Record<string, RevisionStatus>;
  bookmarks: string[];
  lastReviewed: Record<string, string>; // topicId -> ISO string
  recentTopicIds: string[];
  quizScores: Record<string, { score: number; total: number; timestamp: string }>;
  examModeEnabled: boolean;
  quickReviewModeEnabled: boolean;
}

const defaultRevisionState: RevisionStorageState = {
  revisionStatus: {},
  bookmarks: [],
  lastReviewed: {},
  recentTopicIds: [],
  quizScores: {},
  examModeEnabled: false,
  quickReviewModeEnabled: false,
};

export function getRevisionState(): RevisionStorageState {
  if (typeof window === 'undefined') return defaultRevisionState;
  try {
    const raw = localStorage.getItem(REVISION_STORAGE_KEY);
    if (!raw) {
      saveRevisionState(defaultRevisionState);
      return defaultRevisionState;
    }
    return { ...defaultRevisionState, ...JSON.parse(raw) };
  } catch (e) {
    console.error('Failed to parse revision progress from localStorage', e);
    return defaultRevisionState;
  }
}

export function saveRevisionState(state: RevisionStorageState): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(REVISION_STORAGE_KEY, JSON.stringify(state));
    window.dispatchEvent(new Event('ml_revision_updated'));
  } catch (e) {
    console.error('Failed to save revision progress to localStorage', e);
  }
}

export function toggleTopicBookmark(topicId: string): boolean {
  const state = getRevisionState();
  const exists = state.bookmarks.includes(topicId);
  if (exists) {
    state.bookmarks = state.bookmarks.filter((id) => id !== topicId);
  } else {
    state.bookmarks.push(topicId);
  }
  saveRevisionState(state);
  return !exists;
}

export function setTopicStatus(topicId: string, status: RevisionStatus): void {
  const state = getRevisionState();
  state.revisionStatus[topicId] = status;
  if (status === 'revised' || status === 'learning') {
    state.lastReviewed[topicId] = new Date().toISOString();
  }
  saveRevisionState(state);
}

export function toggleTopicRevised(topicId: string): boolean {
  const state = getRevisionState();
  const current = state.revisionStatus[topicId];
  const nextStatus: RevisionStatus = current === 'revised' ? 'not_started' : 'revised';
  state.revisionStatus[topicId] = nextStatus;
  state.lastReviewed[topicId] = new Date().toISOString();
  saveRevisionState(state);
  return nextStatus === 'revised';
}

export function recordTopicViewed(topicId: string): void {
  const state = getRevisionState();
  // Filter out if already in array and unshift to front
  state.recentTopicIds = [topicId, ...state.recentTopicIds.filter((id) => id !== topicId)].slice(0, 10);
  state.lastReviewed[topicId] = new Date().toISOString();
  if (!state.revisionStatus[topicId] || state.revisionStatus[topicId] === 'not_started') {
    state.revisionStatus[topicId] = 'learning';
  }
  saveRevisionState(state);
}

export function saveQuizScore(topicId: string, score: number, total: number): void {
  const state = getRevisionState();
  state.quizScores[topicId] = {
    score,
    total,
    timestamp: new Date().toISOString(),
  };
  saveRevisionState(state);
}

export function setExamMode(enabled: boolean): void {
  const state = getRevisionState();
  state.examModeEnabled = enabled;
  saveRevisionState(state);
}

export function setQuickReviewMode(enabled: boolean): void {
  const state = getRevisionState();
  state.quickReviewModeEnabled = enabled;
  saveRevisionState(state);
}

export function formatLastReviewed(isoDateString?: string): string {
  if (!isoDateString) return 'Not yet reviewed';
  try {
    const date = new Date(isoDateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  } catch {
    return 'Recently';
  }
}
