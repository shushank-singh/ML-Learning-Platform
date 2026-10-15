'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getLesson } from '@/data/modules/curriculum';
import { LessonView } from '@/components/lessons/LessonView';

export default function LessonDetailPage() {
  const params = useParams();
  const moduleId = params?.moduleId as string;
  const lessonId = params?.lessonId as string;

  if (!moduleId || !lessonId) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-xl font-bold">Invalid lesson path</h1>
      </div>
    );
  }

  const lesson = getLesson(moduleId, lessonId);

  return <LessonView lesson={lesson} />;
}
