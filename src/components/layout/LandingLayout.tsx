'use client';

import React from 'react';
import { ThemeToggle } from '@/components/shared/ThemeToggle';

interface LandingLayoutProps {
  children: React.ReactNode;
}

/**
 * LandingLayout: Clean, standalone layout for the root home dashboard (/).
 * Contains NO left sidebar, NO top navigation bar, and NO learning-specific menus.
 * Features an elegant, floating theme toggle in the top-right corner.
 */
export const LandingLayout: React.FC<LandingLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased font-sans transition-colors duration-200">
      {/* Floating Dark/Light Mode Switcher */}
      <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50">
        <ThemeToggle showLabel={false} className="shadow-lg backdrop-blur-md" />
      </div>

      <main className="w-full">
        {children}
      </main>
    </div>
  );
};
