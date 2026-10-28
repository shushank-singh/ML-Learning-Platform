'use client';

import React from 'react';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { AITutorFullView } from '@/components/tutor/AITutorFullView';

export default function AITutorPage() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-slate-950 font-sans text-slate-100">
        <AITutorFullView />
      </div>
    </AuthGuard>
  );
}

