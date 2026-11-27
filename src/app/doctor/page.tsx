'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { MedVerseDashboardHome } from '@/components/medverse/MedVerseDashboardHome';

const PlatformFooter = dynamic(
  () => import('@/components/dashboard/PlatformFooter').then((m) => m.PlatformFooter),
  { ssr: true }
);

export default function DoctorPlatformPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
        <MedVerseDashboardHome />
      </div>
      <PlatformFooter />
    </div>
  );
}
