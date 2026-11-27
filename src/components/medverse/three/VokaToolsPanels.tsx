'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  MapPin,
  FolderPlus,
  BookOpen,
  Trash2,
  ArrowRight,
  Stethoscope,
  Crosshair,
  Plus,
} from 'lucide-react';
import {
  MedVersePinAnnotation,
  MedVerseStudyCollection,
} from '@/types/medverse';
import {
  MBBS_SUBJECTS_CATALOG,
  MBBS_TOPICS_CATALOG,
  MEDVERSE_NOTES,
  PATHOLOGY_TERRITORIES,
} from '@/data/medverse';

interface VokaToolsPanelsProps {
  assetId: string;
  pins: MedVersePinAnnotation[];
  collections: MedVerseStudyCollection[];
  activeTerritoryId: string | null;
  onSelectTerritory: (id: string | null) => void;
  onFocusStructure: (structureId: string) => void;
  onDeletePin: (pinId: string) => void;
  onSaveCollection: (name: string, note: string) => void;
  onApplyCollection: (collection: MedVerseStudyCollection) => void;
  onDeleteCollection: (collectionId: string) => void;
  onOpenTopicPreset: (assetId: string | undefined, focusIds?: string[]) => void;
}

export const VokaToolsPanels: React.FC<VokaToolsPanelsProps> = ({
  assetId,
  pins,
  collections,
  activeTerritoryId,
  onSelectTerritory,
  onFocusStructure,
  onDeletePin,
  onSaveCollection,
  onApplyCollection,
  onDeleteCollection,
  onOpenTopicPreset,
}) => {
  const [tab, setTab] = useState<'pathology' | 'notes' | 'collections' | 'pins'>('pathology');
  const [collectionName, setCollectionName] = useState('');
  const [collectionNote, setCollectionNote] = useState('');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('all');

  const territories = PATHOLOGY_TERRITORIES[assetId] || [];
  const assetPins = useMemo(() => pins.filter((p) => p.assetId === assetId), [pins, assetId]);
  const publishedTopics = useMemo(
    () =>
      MBBS_TOPICS_CATALOG.filter(
        (t) =>
          t.status === 'published' &&
          (selectedSubjectId === 'all' || t.subjectId === selectedSubjectId)
      ),
    [selectedSubjectId]
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!collectionName.trim()) return;
    onSaveCollection(collectionName.trim(), collectionNote.trim());
    setCollectionName('');
    setCollectionNote('');
  };

  return (
    <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-3.5 space-y-3">
      {/* Sub-navigation tabs */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-slate-800 pb-2.5">
        <button
          type="button"
          onClick={() => setTab('pathology')}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-colors ${
            tab === 'pathology'
              ? 'bg-rose-600/25 border border-rose-500 text-rose-200'
              : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <Stethoscope className="w-3.5 h-3.5" />
          <span>Pathology Overlays ({territories.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setTab('notes')}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-colors ${
            tab === 'notes'
              ? 'bg-teal-600/25 border border-teal-500 text-teal-200'
              : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Subject Short Notes</span>
        </button>

        <button
          type="button"
          onClick={() => setTab('pins')}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-colors ${
            tab === 'pins'
              ? 'bg-amber-600/25 border border-amber-500 text-amber-200'
              : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <MapPin className="w-3.5 h-3.5" />
          <span>3D Pins ({assetPins.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setTab('collections')}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-colors ${
            tab === 'collections'
              ? 'bg-violet-600/25 border border-violet-500 text-violet-200'
              : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <FolderPlus className="w-3.5 h-3.5" />
          <span>Collections ({collections.length})</span>
        </button>
      </div>

      {/* TAB 1: HEALTHY VS PATHOLOGY TERRITORY COMPARISON */}
      {tab === 'pathology' && (
        <div className="space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[11px] text-slate-400">
              Compare <strong className="text-slate-200">Healthy Baseline</strong> against mapped clinical lesion/injury territories on this 3D model.
            </p>
            {activeTerritoryId && (
              <button
                type="button"
                onClick={() => onSelectTerritory(null)}
                className="text-[11px] font-bold text-teal-400 hover:underline shrink-0"
              >
                Restore Healthy View
              </button>
            )}
          </div>

          {territories.length === 0 ? (
            <p className="text-xs text-slate-500">No territory comparison presets mapped for this asset yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {territories.map((t) => {
                const isActive = activeTerritoryId === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => onSelectTerritory(isActive ? null : t.id)}
                    className={`text-left rounded-xl border p-3 transition-all space-y-1.5 ${
                      isActive
                        ? 'bg-rose-950/35 border-rose-500 text-white'
                        : 'bg-slate-950/70 border-slate-800 hover:border-rose-500/50 text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold">{t.title}</span>
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: t.highlightColor }}
                      />
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">{t.summary}</p>
                    <ul className="text-[10px] text-rose-200/90 space-y-0.5 pt-1">
                      {t.clinicalSigns.map((sign) => (
                        <li key={sign}>• {sign}</li>
                      ))}
                    </ul>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: SUBJECT -> TOPIC SHORT NOTES SYNCED TO 3D VIEWER */}
      {tab === 'notes' && (
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setSelectedSubjectId('all')}
              className={`px-2 py-1 rounded-lg text-[10px] font-bold ${
                selectedSubjectId === 'all' ? 'bg-teal-600 text-white' : 'bg-slate-800 text-slate-300'
              }`}
            >
              All Published Topics
            </button>
            {MBBS_SUBJECTS_CATALOG.filter((s) =>
              MBBS_TOPICS_CATALOG.some((t) => t.status === 'published' && t.subjectId === s.id)
            ).map((subj) => (
              <button
                key={subj.id}
                type="button"
                onClick={() => setSelectedSubjectId(subj.id)}
                className={`px-2 py-1 rounded-lg text-[10px] font-bold ${
                  selectedSubjectId === subj.id ? 'bg-teal-600 text-white' : 'bg-slate-800 text-slate-300'
                }`}
              >
                {subj.title}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 max-h-[260px] overflow-y-auto pr-1">
            {publishedTopics.map((topic) => {
              const note = MEDVERSE_NOTES[topic.id];
              return (
                <div
                  key={topic.id}
                  className="rounded-xl bg-slate-950/70 border border-slate-800 p-3 space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-xs font-bold text-white leading-snug">{topic.title}</h4>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-teal-300 shrink-0">
                      {topic.estimatedMinutes}m
                    </span>
                  </div>
                  {note && (
                    <ul className="space-y-1 text-[11px] text-slate-300">
                      {note.sixtySecondSummary.slice(0, 2).map((line, i) => (
                        <li key={i} className="leading-snug">
                          • {line}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="flex items-center justify-between gap-2 pt-1">
                    {topic.focusStructureIds && topic.focusStructureIds.length > 0 ? (
                      <button
                        type="button"
                        onClick={() => onOpenTopicPreset(topic.assetId, topic.focusStructureIds)}
                        className="inline-flex items-center gap-1 text-[10px] font-bold text-cyan-300 hover:underline"
                      >
                        <Crosshair className="w-3 h-3" />
                        <span>Focus on 3D</span>
                      </button>
                    ) : (
                      <span />
                    )}
                    <Link
                      href={`/doctor/topics/${topic.id}`}
                      className="inline-flex items-center gap-1 text-[10px] font-bold text-teal-400 hover:underline"
                    >
                      <span>Full Topic &amp; Quiz</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: 3D SURFACE PINS */}
      {tab === 'pins' && (
        <div className="space-y-2">
          <p className="text-[11px] text-slate-400">
            Activate <strong className="text-amber-300">Pin Mode</strong> in the viewport toolbar, then click anywhere on the 3D surface to attach persistent clinical notes.
          </p>
          {assetPins.length === 0 ? (
            <p className="text-xs text-slate-500">No 3D surface pins dropped on this model yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[200px] overflow-y-auto pr-1">
              {assetPins.map((pin) => (
                <div
                  key={pin.id}
                  className="flex items-start justify-between gap-2 rounded-xl bg-slate-950/80 border border-slate-800 p-2.5"
                >
                  <button
                    type="button"
                    onClick={() => onFocusStructure(pin.structureId)}
                    className="text-left space-y-0.5 min-w-0 flex-1"
                  >
                    <p className="text-xs font-bold text-amber-300 truncate">{pin.title}</p>
                    <p className="text-[11px] text-slate-300 line-clamp-2">{pin.note || pin.structureId}</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => onDeletePin(pin.id)}
                    aria-label={`Delete pin ${pin.title}`}
                    className="p-1 text-slate-500 hover:text-rose-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: PERSONAL STUDY COLLECTIONS */}
      {tab === 'collections' && (
        <div className="space-y-3">
          <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-12 gap-2">
            <input
              type="text"
              value={collectionName}
              onChange={(e) => setCollectionName(e.target.value)}
              placeholder="Collection view name (e.g. Left Ventricle X-Ray)"
              className="sm:col-span-5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-500"
            />
            <input
              type="text"
              value={collectionNote}
              onChange={(e) => setCollectionNote(e.target.value)}
              placeholder="Optional study note..."
              className="sm:col-span-5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-500"
            />
            <button
              type="submit"
              className="sm:col-span-2 inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Save View</span>
            </button>
          </form>

          {collections.length === 0 ? (
            <p className="text-xs text-slate-500">
              No saved 3D collections yet. Adjust X-Ray/Isolation/View and click Save View above.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[200px] overflow-y-auto pr-1">
              {collections.map((col) => (
                <div
                  key={col.id}
                  className="flex items-start justify-between gap-2 rounded-xl bg-slate-950/80 border border-slate-800 p-2.5"
                >
                  <button
                    type="button"
                    onClick={() => onApplyCollection(col)}
                    className="text-left space-y-0.5 min-w-0 flex-1"
                  >
                    <p className="text-xs font-bold text-violet-300 truncate">{col.name}</p>
                    <p className="text-[10px] font-mono text-slate-400">
                      {col.assetId} · {col.cameraView} {col.xrayMode ? '· X-Ray' : ''}
                    </p>
                    {col.note && <p className="text-[11px] text-slate-300 line-clamp-1">{col.note}</p>}
                  </button>
                  <button
                    type="button"
                    onClick={() => onDeleteCollection(col.id)}
                    aria-label={`Delete collection ${col.name}`}
                    className="p-1 text-slate-500 hover:text-rose-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
