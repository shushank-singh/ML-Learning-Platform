'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Bookmark,
  FileText,
  Search,
  Trash2,
  ExternalLink,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import { getProgress, saveNote, toggleBookmark } from '@/lib/storage';
import { UserProgressState } from '@/lib/types';
import { MODULES_CATALOG } from '@/data/modules/curriculum';

export default function NotesPage() {
  const [progress, setProgress] = useState<UserProgressState | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    setProgress(getProgress());
    const handleUpdate = () => setProgress(getProgress());
    window.addEventListener('ml_progress_updated', handleUpdate);
    return () => window.removeEventListener('ml_progress_updated', handleUpdate);
  }, []);

  const allLessons = MODULES_CATALOG.flatMap((m) => m.lessons);

  // Bookmarked lessons
  const bookmarkedLessons = allLessons.filter((l) =>
    progress?.bookmarks.includes(l.id)
  );

  // Lessons with notes
  const noteEntries = Object.entries(progress?.notes || {}).map(([lessonId, text]) => {
    const lesson = allLessons.find((l) => l.id === lessonId);
    return {
      lessonId,
      title: lesson?.title || lessonId,
      moduleId: lesson?.moduleId || 'module-3',
      text,
    };
  });

  const filteredNotes = noteEntries.filter(
    (n) =>
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteNote = (lessonId: string) => {
    saveNote(lessonId, '');
  };

  const handleRemoveBookmark = (lessonId: string) => {
    toggleBookmark(lessonId);
  };

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
          <Bookmark className="w-4 h-4" />
          <span>Personal Study Vault</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Bookmarks & Personal Notes
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
          Review your saved lesson bookmarks and personal study notes across all curriculum topics.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Bookmarks Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-amber-500 fill-current" />
              <span>Bookmarked Lessons ({bookmarkedLessons.length})</span>
            </h2>
          </div>

          {bookmarkedLessons.length > 0 ? (
            <div className="space-y-3">
              {bookmarkedLessons.map((l) => (
                <div
                  key={l.id}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex items-center justify-between gap-3 group hover:border-indigo-500/50 transition-colors"
                >
                  <div className="min-w-0">
                    <Link
                      href={`/curriculum/${l.moduleId}/${l.id}`}
                      className="font-semibold text-xs text-slate-900 dark:text-slate-100 hover:text-indigo-600 transition-colors block truncate"
                    >
                      {l.title}
                    </Link>
                    <span className="text-[10px] text-slate-400">
                      Module {l.moduleId.replace('module-', '')} · {l.difficulty}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <Link
                      href={`/curriculum/${l.moduleId}/${l.id}`}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600"
                      title="Open Lesson"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleRemoveBookmark(l.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 transition-colors"
                      title="Remove Bookmark"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500">
              No bookmarked lessons yet. Click the &quot;Bookmark&quot; button at the top of any lesson to pin it here.
            </div>
          )}
        </div>

        {/* Notes Column */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-500" />
              <span>Personal Study Notes ({noteEntries.length})</span>
            </h2>

            {noteEntries.length > 0 && (
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter notes..."
                  className="pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            )}
          </div>

          {filteredNotes.length > 0 ? (
            <div className="space-y-4">
              {filteredNotes.map((note) => (
                <div
                  key={note.lessonId}
                  className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <Link
                      href={`/curriculum/${note.moduleId}/${note.lessonId}`}
                      className="font-bold text-sm text-slate-900 dark:text-slate-100 hover:text-indigo-600 transition-colors inline-flex items-center gap-1.5"
                    >
                      <span>{note.title}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                    </Link>

                    <button
                      onClick={() => handleDeleteNote(note.lessonId)}
                      className="text-slate-400 hover:text-rose-500 p-1"
                      title="Delete Note"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-lg border border-slate-200 dark:border-slate-700/60 whitespace-pre-wrap leading-relaxed font-mono">
                    {note.text}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500">
              No personal notes saved yet. Use the notes sidebar on any lesson page to jot down derivations, key intuitions, or review questions.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
