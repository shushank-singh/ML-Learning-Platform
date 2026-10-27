'use client';

import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { getInitialTheme, toggleTheme, ThemeMode } from '@/lib/theme';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '', showLabel = false }) => {
  const [theme, setLocalTheme] = useState<ThemeMode>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const initial = getInitialTheme();
    setLocalTheme(initial);

    const handleThemeChange = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setLocalTheme(isDark ? 'dark' : 'light');
    };

    window.addEventListener('ml_theme_changed', handleThemeChange);
    return () => window.removeEventListener('ml_theme_changed', handleThemeChange);
  }, []);

  const handleToggle = () => {
    const next = toggleTheme();
    setLocalTheme(next);
  };

  if (!mounted) {
    return (
      <div className={`p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 ${className}`}>
        <div className="w-4 h-4" />
      </div>
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      onClick={handleToggle}
      className={`inline-flex items-center gap-2 p-2.5 rounded-xl border transition-all duration-200 shadow-sm ${
        isDark
          ? 'bg-slate-900/90 hover:bg-slate-800 border-slate-700/80 text-amber-400 hover:text-amber-300'
          : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900'
      } ${className}`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-400" />
      ) : (
        <Moon className="w-4 h-4 text-slate-700" />
      )}
      {showLabel && (
        <span className="text-xs font-semibold">
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </span>
      )}
    </button>
  );
};

