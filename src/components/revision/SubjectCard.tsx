'use client';

import React from 'react';
import Link from 'next/link';
import { SubjectMeta } from '@/data/revision/types';
import { Sparkles, Bookmark, CheckCircle2, ArrowRight } from 'lucide-react';

interface SubjectCardProps {
  meta: SubjectMeta;
  totalTopics: number;
  revisedTopics: number;
  bookmarkedTopics: number;
  isSelected?: boolean;
  onSelect?: () => void;
}

export const SubjectCard: React.FC<SubjectCardProps> = ({
  meta,
  totalTopics,
  revisedTopics,
  bookmarkedTopics,
  isSelected,
  onSelect,
}) => {
  const percentage = totalTopics > 0 ? Math.round((revisedTopics / totalTopics) * 100) : 0;

  // Mini decorative SVG illustration based on subject type
  const renderIllustration = () => {
    switch (meta.illustrationType) {
      case 'neural-net':
        return (
          <svg className="w-full h-24 text-indigo-400/80" viewBox="0 0 200 90" fill="none">
            {/* Input to Hidden lines */}
            <line x1="30" y1="20" x2="100" y2="20" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
            <line x1="30" y1="20" x2="100" y2="45" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
            <line x1="30" y1="20" x2="100" y2="70" stroke="currentColor" strokeWidth="1" opacity="0.4" />
            <line x1="30" y1="45" x2="100" y2="20" stroke="currentColor" strokeWidth="1" opacity="0.4" />
            <line x1="30" y1="45" x2="100" y2="45" stroke="currentColor" strokeWidth="1.5" opacity="0.8" />
            <line x1="30" y1="45" x2="100" y2="70" stroke="currentColor" strokeWidth="1" opacity="0.4" />
            <line x1="30" y1="70" x2="100" y2="20" stroke="currentColor" strokeWidth="1" opacity="0.4" />
            <line x1="30" y1="70" x2="100" y2="45" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
            <line x1="30" y1="70" x2="100" y2="70" stroke="currentColor" strokeWidth="1" opacity="0.4" />
            {/* Hidden to Output lines */}
            <line x1="100" y1="20" x2="170" y2="35" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
            <line x1="100" y1="45" x2="170" y2="35" stroke="currentColor" strokeWidth="1.8" opacity="0.9" />
            <line x1="100" y1="70" x2="170" y2="55" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
            {/* Nodes */}
            <circle cx="30" cy="20" r="5" fill="#6366F1" />
            <circle cx="30" cy="45" r="5" fill="#6366F1" />
            <circle cx="30" cy="70" r="5" fill="#6366F1" />
            <circle cx="100" cy="20" r="6" fill="#8B5CF6" />
            <circle cx="100" cy="45" r="6" fill="#8B5CF6" />
            <circle cx="100" cy="70" r="6" fill="#8B5CF6" />
            <circle cx="170" cy="35" r="7" fill="#06B6D4" />
            <circle cx="170" cy="55" r="7" fill="#06B6D4" />
          </svg>
        );
      case 'data-flow':
        return (
          <svg className="w-full h-24 text-emerald-400/80" viewBox="0 0 200 90" fill="none">
            {/* Variable box to memory object */}
            <rect x="20" y="25" width="45" height="40" rx="6" fill="#059669" fillOpacity="0.2" stroke="#10B981" strokeWidth="1.5" />
            <text x="42" y="48" fill="#34D399" fontSize="11" fontWeight="bold" textAnchor="middle">val = x</text>
            <path d="M68 45 C 90 45, 95 30, 120 30" stroke="#10B981" strokeWidth="2" strokeDasharray="4 2" markerEnd="url(#arrow)" />
            <rect x="120" y="15" width="60" height="30" rx="8" fill="#047857" fillOpacity="0.3" stroke="#34D399" strokeWidth="1.5" />
            <text x="150" y="34" fill="#A7F3D0" fontSize="10" textAnchor="middle">[1, 2, 3]</text>
            <path d="M68 45 C 90 45, 95 65, 120 65" stroke="#10B981" strokeWidth="1.5" opacity="0.6" />
            <rect x="120" y="52" width="60" height="26" rx="6" fill="#047857" fillOpacity="0.2" stroke="#10B981" strokeWidth="1" />
            <text x="150" y="68" fill="#6EE7B7" fontSize="9" textAnchor="middle">0x7F2A</text>
          </svg>
        );
      case 'jvm-memory':
        return (
          <svg className="w-full h-24 text-amber-400/80" viewBox="0 0 200 90" fill="none">
            {/* Stack box */}
            <rect x="20" y="15" width="60" height="60" rx="6" fill="#D97706" fillOpacity="0.2" stroke="#F59E0B" strokeWidth="1.5" />
            <rect x="25" y="22" width="50" height="14" rx="3" fill="#B45309" fillOpacity="0.5" />
            <text x="50" y="33" fill="#FDE68A" fontSize="9" textAnchor="middle">main()</text>
            <rect x="25" y="40" width="50" height="14" rx="3" fill="#B45309" fillOpacity="0.7" />
            <text x="50" y="51" fill="#FDE68A" fontSize="9" textAnchor="middle">eval() [SP]</text>
            {/* Heap box */}
            <rect x="110" y="15" width="70" height="60" rx="8" fill="#B45309" fillOpacity="0.2" stroke="#F59E0B" strokeWidth="1.5" />
            <circle cx="130" cy="35" r="9" fill="#F59E0B" fillOpacity="0.4" stroke="#FDE68A" strokeWidth="1" />
            <circle cx="155" cy="50" r="12" fill="#D97706" fillOpacity="0.5" stroke="#FDE68A" strokeWidth="1" />
            <path d="M75 51 C 90 51, 95 40, 121 35" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3 3" />
          </svg>
        );
      case 'algorithm-tree':
        return (
          <svg className="w-full h-24 text-violet-400/80" viewBox="0 0 200 90" fill="none">
            {/* Tree edges */}
            <line x1="100" y1="18" x2="60" y2="45" stroke="#8B5CF6" strokeWidth="1.5" />
            <line x1="100" y1="18" x2="140" y2="45" stroke="#8B5CF6" strokeWidth="1.5" />
            <line x1="60" y1="45" x2="35" y2="72" stroke="#8B5CF6" strokeWidth="1" opacity="0.6" />
            <line x1="60" y1="45" x2="85" y2="72" stroke="#8B5CF6" strokeWidth="1" opacity="0.6" />
            <line x1="140" y1="45" x2="120" y2="72" stroke="#8B5CF6" strokeWidth="1" opacity="0.6" />
            <line x1="140" y1="45" x2="165" y2="72" stroke="#8B5CF6" strokeWidth="1" opacity="0.6" />
            {/* Nodes */}
            <circle cx="100" cy="18" r="8" fill="#7C3AED" stroke="#C4B5FD" strokeWidth="1.5" />
            <circle cx="60" cy="45" r="7" fill="#6D28D9" stroke="#DDD6FE" strokeWidth="1" />
            <circle cx="140" cy="45" r="7" fill="#6D28D9" stroke="#DDD6FE" strokeWidth="1" />
            <circle cx="35" cy="72" r="6" fill="#5B21B6" />
            <circle cx="85" cy="72" r="6" fill="#5B21B6" />
            <circle cx="120" cy="72" r="6" fill="#5B21B6" />
            <circle cx="165" cy="72" r="6" fill="#5B21B6" />
          </svg>
        );
    }
  };

  return (
    <div
      onClick={onSelect}
      className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 p-5 cursor-pointer bg-slate-900/90 hover:bg-slate-900 hover:shadow-xl ${
        isSelected
          ? `border-${meta.color.primary} ring-2 ring-${meta.color.primary}/30 shadow-lg shadow-${meta.color.primary}/10`
          : 'border-slate-800 hover:border-slate-700'
      }`}
    >
      {/* Top subtle glow */}
      <div
        className={`absolute -top-16 -right-16 w-36 h-36 rounded-full bg-gradient-to-br ${meta.color.gradient} opacity-20 blur-2xl group-hover:opacity-30 transition-opacity`}
      />

      {/* Header */}
      <div className="flex items-start justify-between gap-3 relative z-10">
        <div>
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${meta.color.bgBadge}`}
          >
            <Sparkles className="w-3 h-3" />
            {meta.name}
          </span>
          <h3 className="text-lg font-bold text-slate-100 mt-2 tracking-tight group-hover:text-white transition-colors">
            {meta.fullName}
          </h3>
        </div>
        <div className="text-right">
          <span className="text-xs font-mono font-semibold text-slate-400">
            {totalTopics} Topics
          </span>
        </div>
      </div>

      {/* Illustration container */}
      <div className="my-3 rounded-xl bg-slate-950/60 border border-slate-800/80 p-2 flex items-center justify-center relative overflow-hidden">
        {renderIllustration()}
      </div>

      {/* Description */}
      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
        {meta.shortDescription}
      </p>

      {/* Progress Bar & Stats */}
      <div className="space-y-2 pt-3 border-t border-slate-800/80">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-slate-400 font-medium flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            {revisedTopics} of {totalTopics} Revised
          </span>
          <span className="font-mono font-bold text-slate-200">{percentage}%</span>
        </div>

        {/* Progress bar line */}
        <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${meta.color.gradient} transition-all duration-500`}
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Bottom bar: Bookmarks & Explore CTA */}
        <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <Bookmark className="w-3 h-3 text-amber-400" />
            <span>{bookmarkedTopics} Bookmarked</span>
          </span>
          <span className="inline-flex items-center gap-1 text-slate-300 font-semibold group-hover:translate-x-0.5 transition-transform">
            <span>Revise Now</span>
            <ArrowRight className="w-3 h-3 text-slate-400" />
          </span>
        </div>
      </div>
    </div>
  );
};
