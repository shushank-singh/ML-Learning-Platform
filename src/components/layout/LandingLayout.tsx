'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';
import { UserMenu } from '@/components/auth/UserMenu';

interface LandingLayoutProps {
  children: React.ReactNode;
}

/**
 * LandingLayout: Premium layout for platform home dashboard and standalone pages.
 * Features the Academy Navigation Bar with full responsive drawer, search and UserMenu integration.
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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased font-sans transition-colors duration-200 flex flex-col">
      {/* Primary Navigation Bar (includes UserMenu & ThemeToggle) */}
      <Navbar isAuthPage={isAuthPage} />

      <main className="flex-1 w-full">
        {children}
      </main>
    </div>
  );
};
