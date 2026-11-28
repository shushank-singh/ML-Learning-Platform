'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { IITDashboardHome } from '@/components/iit/IITDashboardHome';

const PlatformFooter = dynamic(
  () => import('@/components/dashboard/PlatformFooter').then((m) => m.PlatformFooter),
  { ssr: true }
);

export default function IITPlatformPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200">
      <IITDashboardHome />
      <PlatformFooter />
    </div>
  );
}
