'use client';

import React, { useState } from 'react';
import {
  HeartPulse,
  FlaskConical,
  Pill,
  Scan,
  CheckCircle2,
  AlertTriangle,
  Activity,
  Sparkles,
} from 'lucide-react';
import {
  ECG_PRESETS,
  ABG_PRESETS,
  PHARMA_CARDS,
} from '@/data/doctorDashboardConfig';

type ClinicalTab = 'ecg' | 'abg' | 'pharma' | 'atlas';

const ATLAS_PREVIEWS = [
  {
    title: 'Thoracic CT & Mediastinum',
    tag: 'Radiology · 1st/Final Prof',
    summary: 'Cross-sectional landmarks at T4 sternal angle: aortic arch, carina, SVC & pulmonary trunk.',
  },
  {
    title: 'Brachial Plexus Lesion Map',
    tag: 'Anatomy · Neuro',
    summary: 'Roots (C5–T1) -> Trunks -> Divisions -> Cords -> Branches with Erb & Klumpke palsy localization.',
  },
  {
    title: 'Circle of Willis & Stroke Zones',
    tag: 'Neuroanatomy · Medicine',
    summary: 'ACA, MCA, PCA vascular territories correlated with cortical sensory-motor deficits.',
  },
  {
    title: 'Nephron Segmental Transport',
    tag: 'Physiology · Pharmacology',
    summary: 'PCT, Loop of Henle, DCT & Collecting Duct ion channels paired with diuretic drug targets.',
  },
];

export const DoctorClinicalHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ClinicalTab>('ecg');
  const [selectedEcgId, setSelectedEcgId] = useState<string>(ECG_PRESETS[0].id);
  const [selectedAbgId, setSelectedAbgId] = useState<string>(ABG_PRESETS[0].id);
  const [selectedPharmaId, setSelectedPharmaId] = useState<string>(PHARMA_CARDS[0].id);

  const currentEcg = ECG_PRESETS.find((e) => e.id === selectedEcgId) || ECG_PRESETS[0];
  const currentAbg = ABG_PRESETS.find((a) => a.id === selectedAbgId) || ABG_PRESETS[0];
  const currentPharma = PHARMA_CARDS.find((p) => p.id === selectedPharmaId) || PHARMA_CARDS[0];

  return (
    <section id="clinical-hub" className="space-y-6 scroll-mt-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 text-xs font-semibold">
            <Activity className="w-3.5 h-3.5" />
            <span>🏥 Interactive Clinical &amp; Diagnostic Hub (Design Preview)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Clinical Simulators &amp; Medical Visual Labs
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            Preview how medical learners will interact with ECG rhythm strips, ABG acid-base calculators, pharmacology receptor mechanisms, and anatomical atlas overlays.
          </p>
        </div>

        {/* Simulator Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-x-auto shrink-0">
          <button
            onClick={() => setActiveTab('ecg')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'ecg'
                ? 'bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <HeartPulse className="w-3.5 h-3.5 text-rose-500" />
            <span>ECG Lab</span>
          </button>

          <button
            onClick={() => setActiveTab('abg')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'abg'
                ? 'bg-white dark:bg-slate-900 text-cyan-600 dark:text-cyan-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <FlaskConical className="w-3.5 h-3.5 text-cyan-500" />
            <span>ABG Interpreter</span>
          </button>

          <button
            onClick={() => setActiveTab('pharma')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'pharma'
                ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Pill className="w-3.5 h-3.5 text-emerald-500" />
            <span>Pharmacology MOA</span>
          </button>

          <button
            onClick={() => setActiveTab('atlas')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'atlas'
                ? 'bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Scan className="w-3.5 h-3.5 text-teal-500" />
            <span>Anatomy &amp; Radiology</span>
          </button>
        </div>
      </div>

      {/* 1. ECG Lab Preview */}
      {activeTab === 'ecg' && (
        <div className="space-y-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Select Rhythm Strip:
              </span>
              {ECG_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => setSelectedEcgId(preset.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    selectedEcgId === preset.id
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
            <span className="text-[11px] font-mono text-slate-400">25 mm/s · Interactive Preview</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            <div className="lg:col-span-7 p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-300 font-semibold">{currentEcg.rhythmName}</span>
                <span className="text-emerald-400 font-bold">HR: {currentEcg.hr}</span>
              </div>
              <svg className="w-full h-28" viewBox="0 0 360 90" fill="none">
                <line x1="0" y1="20" x2="360" y2="20" stroke="#334155" strokeDasharray="3 3" />
                <line x1="0" y1="55" x2="360" y2="55" stroke="#334155" strokeDasharray="3 3" />
                <path
                  d={currentEcg.svgPath}
                  fill="none"
                  stroke={currentEcg.strokeColor}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="grid grid-cols-3 gap-2 text-[11px] font-mono text-slate-300 pt-1 border-t border-slate-800">
                <div>Rate: <span className="text-white font-semibold">{currentEcg.hr}</span></div>
                <div>PR: <span className="text-white font-semibold">{currentEcg.prInterval}</span></div>
                <div>QRS: <span className="text-white font-semibold">{currentEcg.qrsDuration}</span></div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-3">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Waveform Interpretation
                </span>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {currentEcg.interpretation}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Bedside Management Pearl
                </span>
                <p className="text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed">
                  {currentEcg.managementPearl}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. ABG Lab Preview */}
      {activeTab === 'abg' && (
        <div className="space-y-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-6 shadow-sm">
          <div className="flex flex-wrap items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Select Acid-Base Panel:
            </span>
            {ABG_PRESETS.map((abg) => (
              <button
                key={abg.id}
                onClick={() => setSelectedAbgId(abg.id)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  selectedAbgId === abg.id
                    ? 'bg-cyan-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {abg.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-900 text-white">
              <span className="text-[10px] text-slate-400 uppercase font-mono block">Arterial pH</span>
              <span className="text-xl font-extrabold font-mono text-cyan-300">{currentAbg.ph}</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Ref: 7.35–7.45</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900 text-white">
              <span className="text-[10px] text-slate-400 uppercase font-mono block">PaCO2</span>
              <span className="text-xl font-extrabold font-mono text-amber-300">{currentAbg.paco2}</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Ref: 35–45 mmHg</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900 text-white">
              <span className="text-[10px] text-slate-400 uppercase font-mono block">HCO3-</span>
              <span className="text-xl font-extrabold font-mono text-emerald-300">{currentAbg.hco3}</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Ref: 22–26 mEq/L</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900 text-white">
              <span className="text-[10px] text-slate-400 uppercase font-mono block">Anion Gap</span>
              <span className="text-sm sm:text-base font-extrabold font-mono text-rose-300">{currentAbg.anionGap}</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Ref: 8–12 mEq/L</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">{currentAbg.diagnosis}</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-mono">{currentAbg.compensationCheck}</p>
            </div>
            <div className="p-4 rounded-xl bg-cyan-50/70 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-900/60 space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-400">
                Top Differential Etiologies
              </span>
              <div className="flex flex-wrap gap-1.5">
                {currentAbg.commonCauses.map((cause) => (
                  <span
                    key={cause}
                    className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-cyan-200 dark:border-cyan-800 text-[11px] font-medium text-slate-700 dark:text-slate-300"
                  >
                    {cause}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Pharmacology MOA Explorer */}
      {activeTab === 'pharma' && (
        <div className="space-y-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-6 shadow-sm">
          <div className="flex flex-wrap items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Select Prototype Drug:
            </span>
            {PHARMA_CARDS.map((card) => (
              <button
                key={card.id}
                onClick={() => setSelectedPharmaId(card.id)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  selectedPharmaId === card.id
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {card.drugName.split(' (')[0]}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                {currentPharma.classLabel}
              </span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {currentPharma.drugName}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                <span className="font-semibold text-slate-800 dark:text-slate-200">Target: </span>
                {currentPharma.target}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                <span className="font-semibold text-slate-800 dark:text-slate-200">MOA: </span>
                {currentPharma.moa}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/50 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Clinical Indications
              </span>
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                {currentPharma.indications.map((ind) => (
                  <li key={ind} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    <span>{ind}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-900/50 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" /> Contraindications &amp; Pearl
              </span>
              <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                {currentPharma.contraindications.map((ci) => (
                  <li key={ci} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                    <span>{ci}</span>
                  </li>
                ))}
              </ul>
              <p className="text-[11px] text-rose-800 dark:text-rose-300 pt-2 border-t border-rose-200/60 dark:border-rose-900/60 font-medium">
                High-Yield: {currentPharma.highYieldPearl}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 4. Anatomy & Radiology Atlas Preview */}
      {activeTab === 'atlas' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          {ATLAS_PREVIEWS.map((item) => (
            <div
              key={item.title}
              className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 space-y-2.5"
            >
              <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 font-bold">
                {item.tag}
              </span>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {item.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {item.summary}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
