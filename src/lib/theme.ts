'use client';

export type ThemeMode = 'dark' | 'light';

export const THEME_STORAGE_KEY = 'ml_theme';

export function getInitialTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'dark';
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') {
      return saved;
    }
    // Check system preference if no saved theme
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
  } catch (e) {
    console.error('Failed to read theme preference', e);
  }
  return 'dark';
}

export function applyTheme(mode: ThemeMode): void {
  if (typeof window === 'undefined') return;
  try {
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem(THEME_STORAGE_KEY, 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem(THEME_STORAGE_KEY, 'light');
    }
    window.dispatchEvent(new Event('ml_theme_changed'));
  } catch (e) {
    console.error('Failed to apply theme', e);
  }
}

export function toggleTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'dark';
  const isDark = document.documentElement.classList.contains('dark');
  const next: ThemeMode = isDark ? 'light' : 'dark';
  applyTheme(next);
  return next;
}

