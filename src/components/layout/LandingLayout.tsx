'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { UserMenu } from '@/components/auth/UserMenu';

interface LandingLayoutProps {
  children: React.ReactNode;
}

/**
 * LandingLayout: Clean, standalone layout for the root home dashboard (/) and auth pages.
 * Features an elegant floating header with UserMenu & ThemeToggle.
 */
export const LandingLayout: React.FC<LandingLayoutProps> = ({ children }) => {
  const pathname = usePathname() || '/';
  const isAuthPage =
    pathname === '/login' ||
    pathname === '/signup' ||
    pathname === '/forgot-password' ||
    pathname === '/reset-password' ||
    pathname.startsWith('/auth');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased font-sans transition-colors duration-200">
      {/* Floating Header Actions */}
      <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 flex items-center gap-2.5">
        {!isAuthPage && <UserMenu className="shadow-lg backdrop-blur-md" />}
        <ThemeToggle showLabel={false} className="shadow-lg backdrop-blur-md" />
      </div>

      <main className="w-full">
        {children}
      </main>
    </div>
  );
};
