'use client';

import React, { useState } from 'react';
import {
  RevisionTopic,
  RevisionSubject,
  RevisionFilterOptions,
} from '@/data/revision/types';
import { PlannedTopic } from '@/data/revision/plannedTopics';
import { REVISION_SUBJECTS } from '@/data/revision/categories';
import {
  Search,
  CheckCircle2,
  Bookmark,
  Star,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Clock,
  Layers,
  Filter,
} from 'lucide-react';

interface TopicSidebarProps {
  topics: RevisionTopic[];
  plannedTopics: PlannedTopic[];
  activeTopicId: string | null;
  onSelectTopic: (topicId: string) => void;
  filters: RevisionFilterOptions;
  onUpdateFilters: (partial: Partial<RevisionFilterOptions>) => void;
  bookmarkedIds: string[];
  revisedIds: string[];
  onToggleBookmark: (topicId: string) => void;
  subjectCategories: string[];
}

export const TopicSidebar: React.FC<TopicSidebarProps> = ({
  topics,
  plannedTopics,
  activeTopicId,
  onSelectTopic,
  filters,
  onUpdateFilters,
  bookmarkedIds,
  revisedIds,
  onToggleBookmark,
  subjectCategories,
}) => {
  const [showPlanned, setShowPlanned] = useState<boolean>(false);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  const toggleCategory = (cat: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [cat]: prev[cat] === undefined ? false : !prev[cat],
    }));
  };

  // Group topics by category
  const groupedTopics = subjectCategories.reduce((acc, cat) => {
    acc[cat] = topics.filter((t) => t.category === cat);
    return acc;
  }, {} as Record<string, RevisionTopic[]>);

  // Group planned topics by category
  const groupedPlanned = plannedTopics.reduce((acc, pt) => {
    if (!acc[pt.category]) acc[pt.category] = [];
    acc[pt.category].push(pt);
    return acc;
  }, {} as Record<string, PlannedTopic[]>);

  return (
    <aside className="w-full lg:w-80 shrink-0 bg-slate-900/95 border-r border-slate-800 flex flex-col h-full max-h-[calc(100vh-3.5rem)] overflow-hidden">
      {/* Search & Filter Header */}
      <div className="p-3.5 border-b border-slate-800 space-y-2.5">
        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search 65+ visual short notes..."
            value={filters.searchQuery}
            onChange={(e) => onUpdateFilters({ searchQuery: e.target.value })}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        {/* Quick Filter Badges */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] no-scrollbar">
          <button
            onClick={() =>
              onUpdateFilters({
                status: filters.status === 'bookmarked' ? 'all' : 'bookmarked',
              })
            }
            className={`flex items-center gap-1 px-2 py-1 rounded-lg border transition-all ${
              filters.status === 'bookmarked'
                ? 'bg-amber-950/60 border-amber-500/50 text-amber-300 font-semibold'
                : 'border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <Bookmark className="w-3 h-3 text-amber-400" />
            <span>Saved ({bookmarkedIds.length})</span>
          </button>

          <button
            onClick={() =>
              onUpdateFilters({
                status: filters.status === 'revised' ? 'all' : 'revised',
              })
            }
            className={`flex items-center gap-1 px-2 py-1 rounded-lg border transition-all ${
              filters.status === 'revised'
                ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300 font-semibold'
                : 'border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span>Revised ({revisedIds.length})</span>
          </button>

          <button
            onClick={() =>
              onUpdateFilters({
                isInterviewFavoriteOnly: !filters.isInterviewFavoriteOnly,
              })
            }
            className={`flex items-center gap-1 px-2 py-1 rounded-lg border transition-all ${
              filters.isInterviewFavoriteOnly
                ? 'bg-purple-950/60 border-purple-500/50 text-purple-300 font-semibold'
                : 'border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <Star className="w-3 h-3 text-purple-400" />
            <span>Top Picks</span>
          </button>
        </div>
      </div>

      {/* Category List Scroll Area */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {subjectCategories.map((category) => {
          const catTopics = groupedTopics[category] || [];
          const catPlanned = groupedPlanned[category] || [];
          const totalInCat = catTopics.length;
          const isCollapsed = expandedCategories[category] === false;

          // If filtering and no topics match, skip category unless has planned
          if (catTopics.length === 0 && catPlanned.length === 0 && filters.searchQuery) {
            return null;
          }

          return (
            <div key={category} className="space-y-1">
              {/* Category Accordion Header */}
              <button
                onClick={() => toggleCategory(category)}
                className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-slate-300 hover:bg-slate-800/50 transition-colors text-left"
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="text-[11px] font-bold text-slate-400 truncate">
                    {category}
                  </span>
                  <span className="px-1.5 py-0.2 rounded-full bg-slate-800 font-mono text-[10px] text-slate-400">
                    {totalInCat}
                  </span>
                </div>
                {isCollapsed ? (
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                )}
              </button>

              {/* Topics inside Category */}
              {!isCollapsed && (
                <div className="space-y-1 pl-2">
                  {catTopics.map((topic) => {
                    const isActive = topic.id === activeTopicId;
                    const isBookmarked = bookmarkedIds.includes(topic.id);
                    const isRevised = revisedIds.includes(topic.id);

                    return (
                      <div
                        key={topic.id}
                        onClick={() => onSelectTopic(topic.id)}
                        className={`group relative flex items-center justify-between px-3 py-2 rounded-xl text-xs cursor-pointer transition-all ${
                          isActive
                            ? 'bg-indigo-600 text-white font-semibold shadow-md'
                            : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0 pr-2">
                          {isRevised ? (
                            <CheckCircle2
                              className={`w-3.5 h-3.5 shrink-0 ${
                                isActive ? 'text-white' : 'text-emerald-400'
                              }`}
                            />
                          ) : (
                            <div
                              className={`w-2 h-2 rounded-full shrink-0 ${
                                isActive ? 'bg-white' : 'bg-slate-600'
                              }`}
                            />
                          )}
                          <span className="truncate">{topic.title}</span>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          {topic.isInterviewFavorite && (
                            <span
                              className={`text-[10px] px-1 rounded ${
                                isActive
                                  ? 'bg-indigo-700 text-indigo-100'
                                  : 'bg-purple-950/60 text-purple-400 border border-purple-500/30'
                              }`}
                              title="Interview Favorite"
                            >
                              ★
                            </span>
                          )}

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleBookmark(topic.id);
                            }}
                            className={`p-1 rounded hover:bg-slate-700/60 transition-colors ${
                              isBookmarked
                                ? 'text-amber-400'
                                : 'text-slate-500 hover:text-slate-300'
                            }`}
                            title={isBookmarked ? 'Remove bookmark' : 'Bookmark note'}
                          >
                            <Bookmark
                              className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`}
                            />
                          </button>
                        </div>
                      </div>
                    );
                  })}

                  {/* Empty state within category */}
                  {catTopics.length === 0 && catPlanned.length === 0 && (
                    <div className="text-[11px] text-slate-500 px-3 py-1 font-mono italic">
                      No topics match active filters
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {/* Planned Topics Drawer Toggle */}
        {plannedTopics.length > 0 && (
          <div className="pt-4 border-t border-slate-800">
            <button
              onClick={() => setShowPlanned(!showPlanned)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-400 hover:text-slate-200 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-purple-400" />
                <span>Planned Roadmap ({plannedTopics.length})</span>
              </div>
              {showPlanned ? (
                <ChevronDown className="w-3.5 h-3.5" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5" />
              )}
            </button>

            {showPlanned && (
              <div className="mt-2 space-y-1.5 pl-2">
                {plannedTopics.map((pt) => (
                  <div
                    key={pt.id}
                    className="p-2.5 rounded-lg bg-slate-950/40 border border-slate-800/60 text-slate-400 space-y-1"
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-slate-300 truncate">
                        {pt.title}
                      </span>
                      <span className="px-1.5 py-0.5 rounded text-[9px] bg-slate-800 text-slate-400 font-mono">
                        {pt.plannedQuarter}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 line-clamp-1">{pt.subtitle}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
};
