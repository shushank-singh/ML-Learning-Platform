'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { LandingLayout } from './LandingLayout';
import { MLLayout } from './MLLayout';
import { DSALayout } from './DSALayout';
import { PythonLayout } from './PythonLayout';
import { JavaLayout } from './JavaLayout';

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

  // 1. Home Dashboard or Auth Pages: Standalone layout without sidebar or topbar
  if (
    pathname === '/' ||
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
