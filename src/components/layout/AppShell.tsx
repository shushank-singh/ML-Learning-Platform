'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { LandingLayout } from './LandingLayout';

const MLLayout = dynamic(() => import('./MLLayout').then((m) => m.MLLayout), { ssr: true });
const DSALayout = dynamic(() => import('./DSALayout').then((m) => m.DSALayout), { ssr: true });
const PythonLayout = dynamic(() => import('./PythonLayout').then((m) => m.PythonLayout), { ssr: true });
const JavaLayout = dynamic(() => import('./JavaLayout').then((m) => m.JavaLayout), { ssr: true });
const MedVerseLayout = dynamic(() => import('./MedVerseLayout').then((m) => m.MedVerseLayout), { ssr: true });
const IITLayout = dynamic(() => import('./IITLayout').then((m) => m.IITLayout), { ssr: true });

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

  // Clean Embed Mode for MedVerse iframe embedding (`/doctor/embed`)
  if (pathname === '/doctor/embed') {
    return <main className="min-h-screen w-full bg-slate-950">{children}</main>;
  }

  // 1. Public Standalone Pages (Home, Engineering/Doctor Dashboards, Pricing, Plans, Certificate Verification, Auth): Standalone layout without sidebar or AuthGuard
  if (
    pathname === '/' ||
    pathname === '/engineering' ||
    pathname === '/doctor' ||
    pathname === '/pricing' ||
    pathname === '/plans' ||
    pathname.startsWith('/verify') ||
    pathname === '/login' ||
    pathname === '/signup' ||
    pathname === '/forgot-password' ||
    pathname === '/reset-password' ||
    pathname.startsWith('/auth')
  ) {
    return <LandingLayout>{children}</LandingLayout>;
  }

  // 2. IIT JEE Preparation Sub-Routes (and /iit uses IITLayout for full sidebar + dashboard)
  if (pathname === '/iit' || pathname.startsWith('/iit/')) {
    return <IITLayout>{children}</IITLayout>;
  }

  // 3. MedVerse 3D Doctor (MBBS) Sub-Routes
  if (pathname.startsWith('/doctor/')) {
    return <MedVerseLayout>{children}</MedVerseLayout>;
  }

  // 4. DSA Learning Environment
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
