'use client';

import { UserProgressState } from './types';

const STORAGE_KEY = 'ml_mastery_lab_progress_v1';

const defaultState: UserProgressState = {
  completedLessons: {},
  bookmarks: [],
  notes: {},
  quizScores: {},
  streak: {
    currentStreak: 1,
    longestStreak: 1,
    lastActiveDate: new Date().toISOString().split('T')[0],
  },
  totalMinutesLearned: 45,
  weakTopics: [],
};

export function getProgress(): UserProgressState {
  if (typeof window === 'undefined') return defaultState;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      saveProgress(defaultState);
      return defaultState;
    }
    const parsed = JSON.parse(raw);
    return { ...defaultState, ...parsed };
  } catch (e) {
    console.error('Failed to parse progress from localStorage', e);
    return defaultState;
  }
}

export function saveProgress(state: UserProgressState): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    window.dispatchEvent(new Event('ml_progress_updated'));
  } catch (e) {
    console.error('Failed to save progress to localStorage', e);
  }
}

export function toggleLessonCompletion(lessonId: string): boolean {
  const state = getProgress();
  const isDone = !state.completedLessons[lessonId];
  state.completedLessons[lessonId] = isDone;

  // Update streak if completing a lesson
  if (isDone) {
    updateStreak(state);
  }

  saveProgress(state);
  return isDone;
}

export function toggleBookmark(lessonId: string): boolean {
  const state = getProgress();
  const exists = state.bookmarks.includes(lessonId);
  if (exists) {
    state.bookmarks = state.bookmarks.filter((id) => id !== lessonId);
  } else {
    state.bookmarks.push(lessonId);
  }
  saveProgress(state);
  return !exists;
}

export function saveNote(lessonId: string, noteContent: string): void {
  const state = getProgress();
  if (!noteContent.trim()) {
    delete state.notes[lessonId];
  } else {
    state.notes[lessonId] = noteContent;
  }
  saveProgress(state);
}

export function recordQuizScore(lessonOrModuleId: string, score: number, total: number): void {
  const state = getProgress();
  state.quizScores[lessonOrModuleId] = {
    score,
    total,
    timestamp: new Date().toISOString(),
  };

  const percentage = (score / total) * 100;
  if (percentage < 70) {
    if (!state.weakTopics.includes(lessonOrModuleId)) {
      state.weakTopics.push(lessonOrModuleId);
    }
  } else {
    state.weakTopics = state.weakTopics.filter((id) => id !== lessonOrModuleId);
  }

  updateStreak(state);
  saveProgress(state);
}

export function logStudyTime(minutes: number): void {
  const state = getProgress();
  state.totalMinutesLearned = (state.totalMinutesLearned || 0) + minutes;
  updateStreak(state);
  saveProgress(state);
}

function updateStreak(state: UserProgressState): void {
  const today = new Date().toISOString().split('T')[0];
  const lastActive = state.streak.lastActiveDate;

  if (lastActive === today) {
    return;
  }

  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  if (lastActive === yesterday) {
    state.streak.currentStreak += 1;
    if (state.streak.currentStreak > state.streak.longestStreak) {
      state.streak.longestStreak = state.streak.currentStreak;
    }
  } else {
    state.streak.currentStreak = 1;
  }
  state.streak.lastActiveDate = today;
}

export function exportProgressAsJSON(): string {
  const state = getProgress();
  return JSON.stringify(state, null, 2);
}

export function importProgressFromJSON(jsonString: string): boolean {
  try {
    const parsed = JSON.parse(jsonString);
    if (parsed && typeof parsed === 'object') {
      saveProgress({ ...defaultState, ...parsed });
      return true;
    }
    return false;
  } catch (e) {
    console.error('Failed to import JSON progress', e);
    return false;
  }
}

export function resetAllProgress(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event('ml_progress_updated'));
}
