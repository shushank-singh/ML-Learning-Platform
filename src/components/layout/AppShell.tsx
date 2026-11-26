'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { LandingLayout } from './LandingLayout';

const MLLayout = dynamic(() => import('./MLLayout').then((m) => m.MLLayout), { ssr: true });
const DSALayout = dynamic(() => import('./DSALayout').then((m) => m.DSALayout), { ssr: true });
const PythonLayout = dynamic(() => import('./PythonLayout').then((m) => m.PythonLayout), { ssr: true });
const JavaLayout = dynamic(() => import('./JavaLayout').then((m) => m.JavaLayout), { ssr: true });

interface AppShellProps {
  children: React.ReactNode;
}

/**
 * AppShell: Environment Layout Dispatcher
 *
 * Dispatches to dedicated, isolated layouts based on active route:
 * - `/` -> LandingLayout (Standalone home dashboard with NO sidebar and NO topbar)
 * - `/dsa/*` -> DSALayout (DSA-exclusive sidebar & topbar)
 * - `/python/*` -> PythonLayout (Python-exclusive sidebar & topbar)
 * - `/java/*` -> JavaLayout (Java-exclusive sidebar & topbar)
 * - ML routes (`/curriculum`, `/playground`, `/formulas`, etc.) -> MLLayout (ML-exclusive sidebar & topbar)
 */
export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const pathname = usePathname() || '/';

  // 1. Public Standalone Pages (Home, Pricing, Plans, Auth): Standalone layout without sidebar or AuthGuard
  if (
    pathname === '/' ||
    pathname === '/pricing' ||
    pathname === '/plans' ||
    pathname === '/login' ||
    pathname === '/signup' ||
    pathname === '/forgot-password' ||
    pathname === '/reset-password' ||
    pathname.startsWith('/auth')
  ) {
    return <LandingLayout>{children}</LandingLayout>;
  }

  // 2. DSA Learning Environment
  if (pathname.startsWith('/dsa')) {
    return <DSALayout>{children}</DSALayout>;
  }

  // 3. Python Learning Environment
  if (pathname.startsWith('/python')) {
    return <PythonLayout>{children}</PythonLayout>;
  }

  // 4. Java Learning Environment
  if (pathname.startsWith('/java')) {
    return <JavaLayout>{children}</JavaLayout>;
  }

  // 5. Machine Learning Environment
  return <MLLayout>{children}</MLLayout>;
};
