'use client';

import React, { useState } from 'react';
import { AlgorithmType, LessonContent } from '@/lib/types';
import { VisualizerDispatcher } from '../visualizers/VisualizerDispatcher';
import {
  Layers,
  Sparkles,
  TrendingUp,
  GitBranch,
  Network,
  Maximize2,
  Info,
  Sliders,
  CheckCircle2,
} from 'lucide-react';

interface TopicVisualizerProps {
  lesson: LessonContent;
}

export const TopicVisualizer: React.FC<TopicVisualizerProps> = ({ lesson }) => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'diagram' | 'interactive'>('diagram');

  // Determine specific topic visualization category from lesson attributes
  const getTopicDiagramType = (): string => {
    const id = lesson.id.toLowerCase();
    const title = lesson.title.toLowerCase();
    const mod = lesson.moduleId.toLowerCase();

    if (mod.startsWith('numpy') || id.startsWith('numpy') || lesson.visualizerType === 'numpy-interactive') {
      return 'numpy-array-architecture';
    }
    if (mod.startsWith('pandas') || id.startsWith('pandas') || lesson.visualizerType === 'pandas-interactive') {
      return 'pandas-dataframe-architecture';
    }

    if (id.includes('bias-variance') || title.includes('bias-variance') || id.includes('overfitting')) {
      return 'bias-variance';
    }
    if (id.includes('svm') || title.includes('support vector') || lesson.visualizerType === 'svm-boundary') {
      return 'svm-margin';
    }
    if (id.includes('ridge') || id.includes('lasso') || id.includes('elastic-net') || title.includes('regulariz')) {
      return 'regularization';
    }
    if (id.includes('random-forest') || id.includes('bagging') || title.includes('random forest')) {
      return 'random-forest';
    }
    if (id.includes('adaboost') || id.includes('gradient-boost') || id.includes('xgboost') || id.includes('lightgbm') || id.includes('catboost')) {
      return 'boosting';
    }
    if (id.includes('naive-bayes') || title.includes('naive bayes')) {
      return 'naive-bayes';
    }
    if (id.includes('cross-validation') || id.includes('train-val') || title.includes('cross-validation') || id.includes('split')) {
      return 'cross-validation';
    }
    if (id.includes('imput') || id.includes('scale') || id.includes('standard') || id.includes('encode') || id.includes('preprocess')) {
      return 'preprocessing';
    }
    if (id.includes('outlier') || title.includes('outlier') || id.includes('box-plot')) {
      return 'outlier-detection';
    }
    if (id.includes('confusion-matrix') || id.includes('roc') || id.includes('precision-recall') || id.includes('metrics')) {
      return 'evaluation-metrics';
    }
    if (id.includes('activation') || title.includes('activation') || lesson.visualizerType === 'activation-explorer') {
      return 'activation-functions';
    }
    if (id.includes('backprop') || title.includes('backpropagation') || id.includes('chain-rule')) {
      return 'backpropagation';
    }
    if (id.includes('cnn') || id.includes('convolut') || title.includes('convolution') || lesson.visualizerType === 'cnn-convolution-explorer') {
      return 'cnn-kernel';
    }
    if (lesson.visualizerType === 'gradient-descent-playground' || lesson.visualizerType === 'loss-explorer') {
      return 'gradient-descent-landscape';
    }
    if (lesson.visualizerType === 'overfitting-explorer') {
      return 'bias-variance';
    }
    if (lesson.visualizerType === 'neuron-calculator' || lesson.visualizerType === 'forward-prop-explorer' || lesson.visualizerType === 'attention-explorer') {
      return 'neural-net-architecture';
    }
    if (id.includes('dbscan') || title.includes('dbscan')) {
      return 'dbscan';
    }
    if (id.includes('hierarchical') || id.includes('dendrogram') || title.includes('hierarchical')) {
      return 'hierarchical-clustering';
    }
    if (id.includes('pca') || id.includes('svd') || id.includes('eigen') || title.includes('principal component')) {
      return 'pca-projection';
    }
    if (id.includes('mlops') || id.includes('deploy') || id.includes('pipeline') || id.includes('docker') || mod === 'module-10') {
      return 'mlops-pipeline';
    }
    if (id.includes('knn') || lesson.visualizerType === 'knn') {
      return 'knn-neighborhood';
    }
    if (id.includes('decision-tree') || lesson.visualizerType === 'decision-tree') {
      return 'decision-tree-split';
    }
    if (id.includes('logistic') || lesson.visualizerType === 'logistic-boundary') {
      return 'logistic-sigmoid';
    }
    if (id.includes('gradient-descent') || lesson.visualizerType === 'gradient-descent') {
      return 'gradient-descent-landscape';
    }
    if (id.includes('linear-regression') || lesson.visualizerType === 'linear-regression') {
      return 'linear-regression-fit';
    }
    if (mod === 'module-9' || id.includes('neural') || lesson.visualizerType === 'neural-net') {
      return 'neural-net-architecture';
    }
    if (mod === 'module-1' || id.includes('vector') || id.includes('matrix')) {
      return 'vector-matrix-math';
    }
    if (mod === 'module-0' || id.includes('paradigms') || id.includes('workflow')) {
      return 'ml-taxonomy';
    }
    return 'generic-ml-concept';
  };

  const diagramType = getTopicDiagramType();
  const hasInteractiveLab = lesson.visualizerType !== 'none';

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
      {/* Top Header with diagram mode switch if interactive lab exists */}
      <div className="p-4 sm:px-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <Sparkles className="w-4 h-4" />
          </span>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <span>{lesson.visualExplanation.title}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 font-semibold">
                Interactive Visual System
              </span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {lesson.visualExplanation.description}
            </p>
          </div>
        </div>

        {hasInteractiveLab && (
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-200/80 dark:bg-slate-800 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('diagram')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'diagram'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Diagram View
            </button>
            <button
              onClick={() => setActiveTab('interactive')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'interactive'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Interactive Parameter Lab</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Visual Display Area */}
      <div className="p-4 sm:p-6">
        {hasInteractiveLab && activeTab === 'interactive' ? (
          <div className="space-y-4">
            <VisualizerDispatcher type={lesson.visualizerType} />
          </div>
        ) : (
          <div className="space-y-4">
            {/* Topic Specific Educational SVG Diagram */}
            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto text-slate-200">
              {renderSvgDiagram(diagramType, lesson, selectedNode, setSelectedNode)}
            </div>

            {/* Visual Highlights & Key Inspection Cards */}
            {lesson.visualExplanation.features && lesson.visualExplanation.features.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                {lesson.visualExplanation.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-xs space-y-1"
                  >
                    <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100">
                      <span className="w-5 h-5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-mono text-[10px]">
                        {idx + 1}
                      </span>
                      <span>Key Visual Component</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed pl-7">
                      {feat}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Helper renderer for topic-specific educational diagrams
function renderSvgDiagram(
  diagramType: string,
  lesson: LessonContent,
  selectedNode: string | null,
  setSelectedNode: (id: string | null) => void
) {
  switch (diagramType) {
    case 'numpy-array-architecture':
      return (
        <svg viewBox="0 0 700 270" className="w-full h-auto max-w-3xl mx-auto select-none">
          <rect width="700" height="270" fill="#0B1120" rx="10" />
          <defs>
            <linearGradient id="npGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0891B2" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0E7490" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Section 1: Memory Header */}
          <rect x="40" y="25" width="280" height="90" rx="8" fill="url(#npGrad)" stroke="#06B6D4" strokeWidth="1.5" />
          <text x="180" y="50" fill="#22D3EE" fontSize="13" fontWeight="bold" textAnchor="middle">
            NumPy Array Internal Architecture
          </text>
          <text x="60" y="75" fill="#94A3B8" fontSize="11" fontFamily="monospace">
            • Data Pointer: 0x7ffd98b0
          </text>
          <text x="60" y="95" fill="#94A3B8" fontSize="11" fontFamily="monospace">
            • dtype: float64 (8 bytes/elem)
          </text>

          {/* Section 2: Strides & Shape */}
          <rect x="360" y="25" width="300" height="90" rx="8" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
          <text x="510" y="50" fill="#E2E8F0" fontSize="13" fontWeight="bold" textAnchor="middle">
            Shape &amp; Strides Metadata
          </text>
          <text x="380" y="75" fill="#A5B4FC" fontSize="11" fontFamily="monospace">
            • shape: (3, 4) [rows, cols]
          </text>
          <text x="380" y="95" fill="#A5B4FC" fontSize="11" fontFamily="monospace">
            • strides: (32, 8) [row jump, col jump]
          </text>

          {/* Section 3: Contiguous C Memory Buffer */}
          <rect x="40" y="140" width="620" height="100" rx="8" fill="#0F172A" stroke="#334155" strokeWidth="1" />
          <text x="60" y="165" fill="#38BDF8" fontSize="12" fontWeight="bold">
            Contiguous C-Memory Buffer (Flat 1D physical RAM):
          </text>

          {/* Array Cells */}
          {[0, 1, 2, 3, 4, 5, 6, 7].map((val, idx) => (
            <g key={idx} transform={`translate(${60 + idx * 70}, 180)`}>
              <rect width="64" height="42" rx="6" fill="#1E293B" stroke="#06B6D4" strokeWidth="1.2" />
              <text x="32" y="25" fill="#E0F2FE" fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                val_{val}
              </text>
              <text x="32" y="55" fill="#64748B" fontSize="9" fontFamily="monospace" textAnchor="middle">
                +{val * 8}B
              </text>
            </g>
          ))}
        </svg>
      );

    case 'pandas-dataframe-architecture':
      return (
        <svg viewBox="0 0 700 270" className="w-full h-auto max-w-3xl mx-auto select-none">
          <rect width="700" height="270" fill="#0B1120" rx="10" />
          <defs>
            <linearGradient id="pdGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#059669" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#047857" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Index Header */}
          <rect x="40" y="25" width="130" height="35" rx="6" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
          <text x="105" y="48" fill="#CBD5E1" fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
            Row Index
          </text>

          {/* Column Headers */}
          <rect x="180" y="25" width="150" height="35" rx="6" fill="url(#pdGrad)" stroke="#10B981" strokeWidth="1.5" />
          <text x="255" y="48" fill="#6EE7B7" fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
            Series: &apos;Name&apos; [obj]
          </text>

          <rect x="340" y="25" width="150" height="35" rx="6" fill="url(#pdGrad)" stroke="#10B981" strokeWidth="1.5" />
          <text x="415" y="48" fill="#6EE7B7" fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
            Series: &apos;Salary&apos; [int]
          </text>

          <rect x="500" y="25" width="160" height="35" rx="6" fill="url(#pdGrad)" stroke="#10B981" strokeWidth="1.5" />
          <text x="580" y="48" fill="#6EE7B7" fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
            Series: &apos;Rating&apos; [flt]
          </text>

          {/* Rows */}
          {[
            { idx: '0 (E101)', c1: 'Alice', c2: '$95,000', c3: '4.8' },
            { idx: '1 (E102)', c1: 'Bob', c2: '$62,000', c3: '3.9' },
            { idx: '2 (E103)', c1: 'Charlie', c2: '$88,000', c3: '4.5' },
          ].map((r, rIdx) => (
            <g key={rIdx} transform={`translate(0, ${70 + rIdx * 45})`}>
              <rect x="40" y="0" width="130" height="38" rx="6" fill="#1E293B" stroke="#334155" strokeWidth="1" />
              <text x="105" y="24" fill="#94A3B8" fontSize="11" fontFamily="monospace" textAnchor="middle">
                {r.idx}
              </text>

              <rect x="180" y="0" width="150" height="38" rx="6" fill="#0F172A" stroke="#334155" strokeWidth="1" />
              <text x="255" y="24" fill="#E2E8F0" fontSize="11" fontFamily="monospace" textAnchor="middle">
                {r.c1}
              </text>

              <rect x="340" y="0" width="150" height="38" rx="6" fill="#0F172A" stroke="#059669" strokeWidth="1.2" />
              <text x="415" y="24" fill="#A7F3D0" fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                {r.c2}
              </text>

              <rect x="500" y="0" width="160" height="38" rx="6" fill="#0F172A" stroke="#334155" strokeWidth="1" />
              <text x="580" y="24" fill="#E2E8F0" fontSize="11" fontFamily="monospace" textAnchor="middle">
                {r.c3}
              </text>
            </g>
          ))}

          {/* Under-the-hood BlockManager footer */}
          <rect x="40" y="215" width="620" height="38" rx="6" fill="#064E3B" stroke="#10B981" strokeWidth="1.5" />
          <text x="350" y="239" fill="#D1FAE5" fontSize="11" fontWeight="bold" textAnchor="middle">
            BlockManager: Columns of the same dtype share contiguous homogeneous NumPy arrays underneath
          </text>
        </svg>
      );

    case 'bias-variance':
      return (
        <svg viewBox="0 0 700 280" className="w-full h-auto max-w-3xl mx-auto select-none">
          <rect width="700" height="280" fill="#0B1120" rx="8" />
          {/* Underfitting & Overfitting zones */}
          <rect x="70" y="30" width="160" height="200" fill="#3B82F6" fillOpacity="0.07" />
          <text x="150" y="55" fill="#60A5FA" fontSize="12" fontWeight="bold" textAnchor="middle">Underfitting Zone</text>
          <text x="150" y="72" fill="#93C5FD" fontSize="10" textAnchor="middle">High Bias (Rigid Assumptions)</text>

          <rect x="460" y="30" width="170" height="200" fill="#EF4444" fillOpacity="0.07" />
          <text x="545" y="55" fill="#F87171" fontSize="12" fontWeight="bold" textAnchor="middle">Overfitting Zone</text>
          <text x="545" y="72" fill="#FCA5A5" fontSize="10" textAnchor="middle">High Variance (Noise Sensitivity)</text>

          {/* Sweet Spot Vertical Line */}
          <line x1="340" y1="30" x2="340" y2="230" stroke="#10B981" strokeWidth="2" strokeDasharray="5 4" />
          <circle cx="340" cy="130" r="7" fill="#10B981" />
          <text x="340" y="118" fill="#34D399" fontSize="11" fontWeight="bold" textAnchor="middle">Optimal Sweet Spot</text>

          {/* Axes */}
          <line x1="70" y1="230" x2="650" y2="230" stroke="#475569" strokeWidth="2" />
          <line x1="70" y1="30" x2="70" y2="230" stroke="#475569" strokeWidth="2" />
          <text x="360" y="260" fill="#94A3B8" fontSize="12" fontWeight="bold" textAnchor="middle">Model Complexity (Degree / Tree Depth / Weights) →</text>
          <text x="30" y="130" fill="#94A3B8" fontSize="12" fontWeight="bold" textAnchor="middle" transform="rotate(-90 30 130)">Error Rate →</text>

          {/* Irreducible Error */}
          <line x1="70" y1="210" x2="650" y2="210" stroke="#64748B" strokeWidth="1.5" strokeDasharray="4 4" />
          <text x="640" y="204" fill="#94A3B8" fontSize="10" textAnchor="end">Irreducible Noise σ²</text>

          {/* Bias Squared Curve (Decreasing) */}
          <path d="M 80 50 Q 180 150 630 205" fill="none" stroke="#3B82F6" strokeWidth="3" />
          <text x="110" y="95" fill="#60A5FA" fontSize="12" fontWeight="bold">Bias²</text>

          {/* Variance Curve (Increasing) */}
          <path d="M 80 220 Q 300 210 630 50" fill="none" stroke="#F59E0B" strokeWidth="3" />
          <text x="600" y="90" fill="#FBBF24" fontSize="12" fontWeight="bold">Variance</text>

          {/* Total Expected Error Curve (U-Shape) */}
          <path d="M 80 85 Q 340 185 630 75" fill="none" stroke="#EC4899" strokeWidth="3.5" />
          <text x="490" y="145" fill="#F472B6" fontSize="13" fontWeight="bold">Total Expected Error</text>
        </svg>
      );

    case 'svm-margin':
      return (
        <svg viewBox="0 0 700 280" className="w-full h-auto max-w-3xl mx-auto select-none">
          <rect width="700" height="280" fill="#0B1120" rx="8" />
          {/* Decision Boundary w·x + b = 0 */}
          <line x1="120" y1="240" x2="580" y2="40" stroke="#6366F1" strokeWidth="3" />
          <text x="590" y="45" fill="#818CF8" fontSize="11" fontWeight="bold">w · x + b = 0 (Hyperplane)</text>

          {/* Margin Lines */}
          <line x1="70" y1="205" x2="530" y2="5" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="4 3" />
          <line x1="170" y1="275" x2="630" y2="75" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="4 3" />

          {/* Margin Width Annotation */}
          <line x1="280" y1="170" x2="330" y2="135" stroke="#10B981" strokeWidth="2" markerEnd="url(#arrow)" />
          <text x="320" y="160" fill="#34D399" fontSize="11" fontWeight="bold">Margin = 2 / ||w||</text>

          {/* Positive Class Points (Blue circles) */}
          <circle cx="150" cy="100" r="6" fill="#3B82F6" />
          <circle cx="210" cy="80" r="6" fill="#3B82F6" />
          <circle cx="260" cy="60" r="6" fill="#3B82F6" />
          <circle cx="340" cy="50" r="6" fill="#3B82F6" />
          {/* Positive Support Vector with highlight ring */}
          <circle cx="270" cy="120" r="9" fill="none" stroke="#F59E0B" strokeWidth="2.5" />
          <circle cx="270" cy="120" r="5" fill="#3B82F6" />
          <text x="285" y="120" fill="#FCD34D" fontSize="10" fontWeight="bold">Support Vector (y = +1)</text>

          {/* Negative Class Points (Rose squares) */}
          <rect x="420" y="210" width="10" height="10" fill="#F43F5E" />
          <rect x="480" y="190" width="10" height="10" fill="#F43F5E" />
          <rect x="520" y="170" width="10" height="10" fill="#F43F5E" />
          {/* Negative Support Vector with highlight ring */}
          <circle cx="430" cy="160" r="9" fill="none" stroke="#F59E0B" strokeWidth="2.5" />
          <rect x="425" y="155" width="10" height="10" fill="#F43F5E" />
          <text x="445" y="165" fill="#FCD34D" fontSize="10" fontWeight="bold">Support Vector (y = -1)</text>

          <text x="350" y="260" fill="#94A3B8" fontSize="11" textAnchor="middle">
            Only the Support Vectors determine the decision boundary; moving other points changes nothing.
          </text>
        </svg>
      );

    case 'regularization':
      return (
        <svg viewBox="0 0 700 280" className="w-full h-auto max-w-3xl mx-auto select-none">
          <rect width="700" height="280" fill="#0B1120" rx="8" />
          {/* Left: L2 Ridge Circle Penalty */}
          <g transform="translate(180, 140)">
            {/* Coordinate axes */}
            <line x1="-120" y1="0" x2="120" y2="0" stroke="#475569" strokeWidth="1.5" />
            <line x1="0" y1="-100" x2="0" y2="100" stroke="#475569" strokeWidth="1.5" />
            <text x="125" y="4" fill="#94A3B8" fontSize="10">w₁</text>
            <text x="-4" y="-105" fill="#94A3B8" fontSize="10">w₂</text>

            {/* L2 Ball: Circle */}
            <circle cx="0" cy="0" r="60" fill="#3B82F6" fillOpacity="0.15" stroke="#3B82F6" strokeWidth="2" />
            {/* OLS Loss Ellipses */}
            <ellipse cx="65" cy="-65" rx="55" ry="35" transform="rotate(-30 65 -65)" fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3 2" />
            <ellipse cx="65" cy="-65" rx="80" ry="50" transform="rotate(-30 65 -65)" fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3 2" />
            {/* Intersection Point */}
            <circle cx="42" cy="-42" r="5" fill="#10B981" />

            <text x="0" y="85" fill="#60A5FA" fontSize="12" fontWeight="bold" textAnchor="middle">Ridge (L2 Norm Ball)</text>
            <text x="0" y="100" fill="#94A3B8" fontSize="9" textAnchor="middle">Smooth shrinkage: w ≈ 0 but never exactly 0</text>
          </g>

          {/* Right: L1 Lasso Diamond Penalty */}
          <g transform="translate(520, 140)">
            {/* Coordinate axes */}
            <line x1="-120" y1="0" x2="120" y2="0" stroke="#475569" strokeWidth="1.5" />
            <line x1="0" y1="-100" x2="0" y2="100" stroke="#475569" strokeWidth="1.5" />
            <text x="125" y="4" fill="#94A3B8" fontSize="10">w₁</text>
            <text x="-4" y="-105" fill="#94A3B8" fontSize="10">w₂</text>

            {/* L1 Ball: Diamond */}
            <polygon points="0,-60 60,0 0,60 -60,0" fill="#EC4899" fillOpacity="0.15" stroke="#EC4899" strokeWidth="2" />
            {/* OLS Loss Ellipses touching the sharp diamond corner! */}
            <ellipse cx="65" cy="-65" rx="55" ry="35" transform="rotate(-30 65 -65)" fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3 2" />
            {/* Corner intersection */}
            <circle cx="0" cy="-60" r="5" fill="#10B981" />
            <text x="15" y="-62" fill="#34D399" fontSize="10" fontWeight="bold">w₁ = 0 (Sparse!)</text>

            <text x="0" y="85" fill="#F472B6" fontSize="12" fontWeight="bold" textAnchor="middle">Lasso (L1 Diamond Corner)</text>
            <text x="0" y="100" fill="#94A3B8" fontSize="9" textAnchor="middle">Sharp corners hit axes: forces exact 0s for feature selection</text>
          </g>
        </svg>
      );

    case 'random-forest':
      return (
        <svg viewBox="0 0 700 280" className="w-full h-auto max-w-3xl mx-auto select-none">
          <rect width="700" height="280" fill="#0B1120" rx="8" />
          {/* Dataset Box */}
          <rect x="270" y="20" width="160" height="40" rx="6" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
          <text x="350" y="45" fill="#F8FAFC" fontSize="11" fontWeight="bold" textAnchor="middle">Original Dataset (N samples, D features)</text>

          {/* Arrows splitting into 3 bootstrap trees */}
          <line x1="320" y1="60" x2="160" y2="100" stroke="#6366F1" strokeWidth="1.5" strokeDasharray="3 2" />
          <line x1="350" y1="60" x2="350" y2="100" stroke="#6366F1" strokeWidth="1.5" strokeDasharray="3 2" />
          <line x1="380" y1="60" x2="540" y2="100" stroke="#6366F1" strokeWidth="1.5" strokeDasharray="3 2" />

          {/* Tree 1 */}
          <g transform="translate(160, 140)">
            <rect x="-60" y="-35" width="120" height="70" rx="8" fill="#1E1B4B" stroke="#6366F1" strokeWidth="1.5" />
            <text x="0" y="-15" fill="#A5B4FC" fontSize="11" fontWeight="bold" textAnchor="middle">Tree 1 (Bootstrap 1)</text>
            <text x="0" y="2" fill="#94A3B8" fontSize="9" textAnchor="middle">Random √D features</text>
            <rect x="-40" y="14" width="80" height="16" rx="4" fill="#3B82F6" />
            <text x="0" y="26" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">Predict: Class A</text>
          </g>

          {/* Tree 2 */}
          <g transform="translate(350, 140)">
            <rect x="-60" y="-35" width="120" height="70" rx="8" fill="#1E1B4B" stroke="#6366F1" strokeWidth="1.5" />
            <text x="0" y="-15" fill="#A5B4FC" fontSize="11" fontWeight="bold" textAnchor="middle">Tree 2 (Bootstrap 2)</text>
            <text x="0" y="2" fill="#94A3B8" fontSize="9" textAnchor="middle">Random √D features</text>
            <rect x="-40" y="14" width="80" height="16" rx="4" fill="#3B82F6" />
            <text x="0" y="26" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">Predict: Class A</text>
          </g>

          {/* Tree 3 */}
          <g transform="translate(540, 140)">
            <rect x="-60" y="-35" width="120" height="70" rx="8" fill="#1E1B4B" stroke="#6366F1" strokeWidth="1.5" />
            <text x="0" y="-15" fill="#A5B4FC" fontSize="11" fontWeight="bold" textAnchor="middle">Tree 3 (Bootstrap 3)</text>
            <text x="0" y="2" fill="#94A3B8" fontSize="9" textAnchor="middle">Random √D features</text>
            <rect x="-40" y="14" width="80" height="16" rx="4" fill="#F43F5E" />
            <text x="0" y="26" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">Predict: Class B</text>
          </g>

          {/* Arrows converging to majority vote */}
          <line x1="160" y1="180" x2="310" y2="225" stroke="#10B981" strokeWidth="2" />
          <line x1="350" y1="180" x2="350" y2="225" stroke="#10B981" strokeWidth="2" />
          <line x1="540" y1="180" x2="390" y2="225" stroke="#10B981" strokeWidth="2" />

          {/* Majority Voting Aggregation Box */}
          <rect x="250" y="225" width="200" height="40" rx="8" fill="#064E3B" stroke="#10B981" strokeWidth="2" />
          <text x="350" y="244" fill="#A7F3D0" fontSize="11" fontWeight="bold" textAnchor="middle">Ensemble Majority Vote</text>
          <text x="350" y="258" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">Final Consensus: Class A (2 vs 1)</text>
        </svg>
      );

    case 'boosting':
      return (
        <svg viewBox="0 0 700 280" className="w-full h-auto max-w-3xl mx-auto select-none">
          <rect width="700" height="280" fill="#0B1120" rx="8" />
          <text x="350" y="30" fill="#94A3B8" fontSize="11" textAnchor="middle" fontWeight="bold">
            Sequential Ensemble: Each new learner corrects the pseudo-residuals of all prior trees
          </text>

          {/* Stage 1 */}
          <g transform="translate(120, 110)">
            <rect x="-50" y="-45" width="100" height="90" rx="8" fill="#1E293B" stroke="#3B82F6" strokeWidth="2" />
            <text x="0" y="-25" fill="#60A5FA" fontSize="11" fontWeight="bold" textAnchor="middle">Tree 1 (Weak)</text>
            <text x="0" y="-5" fill="#94A3B8" fontSize="9" textAnchor="middle">Fit to target y</text>
            <text x="0" y="15" fill="#F87171" fontSize="10" fontWeight="bold" textAnchor="middle">Residual r₁ = y - ŷ₁</text>
            <rect x="-40" y="24" width="80" height="15" rx="3" fill="#3B82F6" fillOpacity="0.3" />
            <text x="0" y="35" fill="#93C5FD" fontSize="8" textAnchor="middle">Weights: Equal</text>
          </g>

          <line x1="175" y1="110" x2="265" y2="110" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 3" />
          <text x="220" y="100" fill="#FCD34D" fontSize="9" textAnchor="middle">Shrunk by η</text>

          {/* Stage 2 */}
          <g transform="translate(320, 110)">
            <rect x="-50" y="-45" width="100" height="90" rx="8" fill="#1E293B" stroke="#F59E0B" strokeWidth="2" />
            <text x="0" y="-25" fill="#FBBF24" fontSize="11" fontWeight="bold" textAnchor="middle">Tree 2 (Corrector)</text>
            <text x="0" y="-5" fill="#94A3B8" fontSize="9" textAnchor="middle">Fit to residual r₁</text>
            <text x="0" y="15" fill="#F87171" fontSize="10" fontWeight="bold" textAnchor="middle">Residual r₂ = r₁ - ηŷ₂</text>
            <rect x="-40" y="24" width="80" height="15" rx="3" fill="#F59E0B" fillOpacity="0.3" />
            <text x="0" y="35" fill="#FDE68A" fontSize="8" textAnchor="middle">Boost Errors</text>
          </g>

          <line x1="375" y1="110" x2="465" y2="110" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 3" />
          <text x="420" y="100" fill="#FCD34D" fontSize="9" textAnchor="middle">Shrunk by η</text>

          {/* Stage 3 */}
          <g transform="translate(520, 110)">
            <rect x="-50" y="-45" width="100" height="90" rx="8" fill="#1E293B" stroke="#10B981" strokeWidth="2" />
            <text x="0" y="-25" fill="#34D399" fontSize="11" fontWeight="bold" textAnchor="middle">Tree M (Fine-tune)</text>
            <text x="0" y="-5" fill="#94A3B8" fontSize="9" textAnchor="middle">Fit to residual r_M-1</text>
            <text x="0" y="15" fill="#10B981" fontSize="10" fontWeight="bold" textAnchor="middle">Error approaches 0</text>
            <rect x="-40" y="24" width="80" height="15" rx="3" fill="#10B981" fillOpacity="0.3" />
            <text x="0" y="35" fill="#A7F3D0" fontSize="8" textAnchor="middle">Low Bias</text>
          </g>

          {/* Final Combined Model */}
          <rect x="170" y="210" width="360" height="45" rx="8" fill="#1E1B4B" stroke="#6366F1" strokeWidth="2" />
          <text x="350" y="230" fill="#C7D2FE" fontSize="11" fontWeight="bold" textAnchor="middle">
            Final Prediction: ŷ = ŷ₀ + η · f₁(x) + η · f₂(x) + ... + η · f_M(x)
          </text>
          <text x="350" y="246" fill="#818CF8" fontSize="9" textAnchor="middle">
            Gradient Boosting = Gradient Descent directly in function/tree space!
          </text>
        </svg>
      );

    case 'cross-validation':
      return (
        <svg viewBox="0 0 700 280" className="w-full h-auto max-w-3xl mx-auto select-none">
          <rect width="700" height="280" fill="#0B1120" rx="8" />
          <text x="350" y="30" fill="#94A3B8" fontSize="12" fontWeight="bold" textAnchor="middle">
            K-Fold Cross-Validation (K = 5 Folds) Workflow
          </text>

          {/* 5 Rows for 5 Folds */}
          {[0, 1, 2, 3, 4].map((foldIdx) => (
            <g key={foldIdx} transform={`translate(100, ${55 + foldIdx * 38})`}>
              <text x="-20" y="18" fill="#CBD5E1" fontSize="10" fontWeight="bold" textAnchor="end">
                Fold {foldIdx + 1}
              </text>
              {[0, 1, 2, 3, 4].map((blockIdx) => {
                const isVal = blockIdx === foldIdx;
                return (
                  <g key={blockIdx} transform={`translate(${blockIdx * 98}, 0)`}>
                    <rect
                      x="0"
                      y="0"
                      width="92"
                      height="26"
                      rx="4"
                      fill={isVal ? '#EF4444' : '#3B82F6'}
                      fillOpacity={isVal ? 0.85 : 0.45}
                      stroke={isVal ? '#F87171' : '#60A5FA'}
                      strokeWidth="1.5"
                    />
                    <text
                      x="46"
                      y="17"
                      fill="#FFFFFF"
                      fontSize="10"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {isVal ? 'Validation' : 'Training'}
                    </text>
                  </g>
                );
              })}
            </g>
          ))}

          {/* Summary Banner */}
          <rect x="150" y="248" width="400" height="24" rx="4" fill="#1E293B" stroke="#475569" />
          <text x="350" y="264" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle">
            Cross-Validation Score = (Score₁ + Score₂ + Score₃ + Score₄ + Score₅) / 5
          </text>
        </svg>
      );

    case 'evaluation-metrics':
      return (
        <svg viewBox="0 0 700 280" className="w-full h-auto max-w-3xl mx-auto select-none">
          <rect width="700" height="280" fill="#0B1120" rx="8" />
          {/* Confusion Matrix 2x2 */}
          <g transform="translate(120, 45)">
            <text x="130" y="-15" fill="#CBD5E1" fontSize="12" fontWeight="bold" textAnchor="middle">
              The 2×2 Confusion Matrix
            </text>
            <text x="-40" y="65" fill="#94A3B8" fontSize="10" fontWeight="bold" textAnchor="middle" transform="rotate(-90 -40 65)">
              Actual Ground Truth
            </text>
            <text x="130" y="10" fill="#94A3B8" fontSize="10" fontWeight="bold" textAnchor="middle">
              Predicted Class →
            </text>

            {/* Labels */}
            <text x="60" y="26" fill="#93C5FD" fontSize="10" textAnchor="middle">Predicted +1</text>
            <text x="180" y="26" fill="#FCA5A5" fontSize="10" textAnchor="middle">Predicted -1</text>

            {/* TP */}
            <rect x="10" y="35" width="105" height="65" rx="6" fill="#065F46" stroke="#10B981" strokeWidth="2" />
            <text x="62" y="60" fill="#34D399" fontSize="13" fontWeight="bold" textAnchor="middle">True Positive (TP)</text>
            <text x="62" y="78" fill="#A7F3D0" fontSize="9" textAnchor="middle">Correctly flagged positive</text>

            {/* FN */}
            <rect x="125" y="35" width="105" height="65" rx="6" fill="#7F1D1D" stroke="#EF4444" strokeWidth="2" />
            <text x="177" y="60" fill="#F87171" fontSize="13" fontWeight="bold" textAnchor="middle">False Negative (FN)</text>
            <text x="177" y="78" fill="#FCA5A5" fontSize="9" textAnchor="middle">Type II Error (Missed!)</text>

            {/* FP */}
            <rect x="10" y="110" width="105" height="65" rx="6" fill="#7F1D1D" stroke="#EF4444" strokeWidth="2" />
            <text x="62" y="135" fill="#F87171" fontSize="13" fontWeight="bold" textAnchor="middle">False Positive (FP)</text>
            <text x="62" y="153" fill="#FCA5A5" fontSize="9" textAnchor="middle">Type I Error (False Alarm)</text>

            {/* TN */}
            <rect x="125" y="110" width="105" height="65" rx="6" fill="#065F46" stroke="#10B981" strokeWidth="2" />
            <text x="177" y="135" fill="#34D399" fontSize="13" fontWeight="bold" textAnchor="middle">True Negative (TN)</text>
            <text x="177" y="153" fill="#A7F3D0" fontSize="9" textAnchor="middle">Correctly flagged negative</text>
          </g>

          {/* Metric Formulas on the Right */}
          <g transform="translate(420, 50)">
            <rect x="0" y="0" width="230" height="200" rx="8" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
            <text x="115" y="24" fill="#F8FAFC" fontSize="12" fontWeight="bold" textAnchor="middle">Metric Formulas</text>

            {/* Accuracy */}
            <text x="20" y="55" fill="#60A5FA" fontSize="11" fontWeight="bold">Accuracy</text>
            <text x="20" y="70" fill="#CBD5E1" fontSize="10">= (TP + TN) / Total</text>

            {/* Precision */}
            <text x="20" y="100" fill="#F59E0B" fontSize="11" fontWeight="bold">Precision (Reliability of alarms)</text>
            <text x="20" y="115" fill="#CBD5E1" fontSize="10">= TP / (TP + FP)</text>

            {/* Recall */}
            <text x="20" y="145" fill="#10B981" fontSize="11" fontWeight="bold">Recall / Sensitivity (Coverage)</text>
            <text x="20" y="160" fill="#CBD5E1" fontSize="10">= TP / (TP + FN)</text>

            {/* F1 Score */}
            <text x="20" y="185" fill="#EC4899" fontSize="10" fontWeight="bold">F1 = 2 · (P · R) / (P + R)</text>
          </g>
        </svg>
      );

    case 'deep-learning':
    case 'neural-net-architecture':
    case 'backpropagation':
      return (
        <svg viewBox="0 0 700 280" className="w-full h-auto max-w-3xl mx-auto select-none">
          <rect width="700" height="280" fill="#0B1120" rx="8" />
          <text x="350" y="25" fill="#94A3B8" fontSize="12" fontWeight="bold" textAnchor="middle">
            Multi-Layer Perceptron: Forward Propagation & Backward Gradient Flow
          </text>

          {/* Layers: Input, Hidden 1, Hidden 2, Output */}
          {/* Input Layer */}
          <g transform="translate(100, 140)">
            <text x="0" y="-85" fill="#60A5FA" fontSize="11" fontWeight="bold" textAnchor="middle">Input Layer</text>
            {[-60, -20, 20, 60].map((y, i) => (
              <g key={i}>
                <circle cx="0" cy={y} r="14" fill="#1E3A8A" stroke="#3B82F6" strokeWidth="2" />
                <text x="0" y={y + 4} fill="#DBEAFE" fontSize="9" fontWeight="bold" textAnchor="middle">x_{i + 1}</text>
              </g>
            ))}
          </g>

          {/* Hidden Layer 1 */}
          <g transform="translate(260, 140)">
            <text x="0" y="-85" fill="#A855F7" fontSize="11" fontWeight="bold" textAnchor="middle">Hidden Layer</text>
            {[-70, -35, 0, 35, 70].map((y, i) => (
              <g key={i}>
                <circle cx="0" cy={y} r="14" fill="#581C87" stroke="#A855F7" strokeWidth="2" />
                <text x="0" y={y + 4} fill="#F3E8FF" fontSize="9" fontWeight="bold" textAnchor="middle">h_{i + 1}</text>
              </g>
            ))}
          </g>

          {/* Output Layer */}
          <g transform="translate(440, 140)">
            <text x="0" y="-85" fill="#10B981" fontSize="11" fontWeight="bold" textAnchor="middle">Output Layer</text>
            {[-30, 30].map((y, i) => (
              <g key={i}>
                <circle cx="0" cy={y} r="15" fill="#064E3B" stroke="#10B981" strokeWidth="2" />
                <text x="0" y={y + 4} fill="#D1FAE5" fontSize="10" fontWeight="bold" textAnchor="middle">ŷ_{i + 1}</text>
              </g>
            ))}
          </g>

          {/* Connecting Synapses (Illustrative subset) */}
          <g stroke="#475569" strokeWidth="1" strokeOpacity="0.5">
            {[-60, -20, 20, 60].map((y1, i) =>
              [-70, -35, 0, 35, 70].map((y2, j) => (
                <line key={`${i}-${j}`} x1="114" y1={140 + y1} x2="246" y2={140 + y2} />
              ))
            )}
            {[-70, -35, 0, 35, 70].map((y1, i) =>
              [-30, 30].map((y2, j) => (
                <line key={`${i}-${j}`} x1="274" y1={140 + y1} x2="425" y2={140 + y2} />
              ))
            )}
          </g>

          {/* Forward and Backward Flow Banners */}
          <g transform="translate(520, 90)">
            <rect x="0" y="0" width="160" height="42" rx="6" fill="#1E293B" stroke="#3B82F6" strokeWidth="1.5" />
            <text x="80" y="18" fill="#60A5FA" fontSize="10" fontWeight="bold" textAnchor="middle">Forward Pass →</text>
            <text x="80" y="32" fill="#94A3B8" fontSize="8" textAnchor="middle">z = Wx + b, a = σ(z)</text>
          </g>

          <g transform="translate(520, 150)">
            <rect x="0" y="0" width="160" height="42" rx="6" fill="#1E293B" stroke="#F43F5E" strokeWidth="1.5" />
            <text x="80" y="18" fill="#FB7185" fontSize="10" fontWeight="bold" textAnchor="middle">← Backpropagation</text>
            <text x="80" y="32" fill="#94A3B8" fontSize="8" textAnchor="middle">∂L/∂W via Chain Rule</text>
          </g>

          <text x="350" y="260" fill="#94A3B8" fontSize="10" textAnchor="middle">
            Every weight W receives an update proportional to its contribution to total loss L: W ← W - η · ∂L/∂W
          </text>
        </svg>
      );

    case 'mlops-pipeline':
      return (
        <svg viewBox="0 0 700 280" className="w-full h-auto max-w-3xl mx-auto select-none">
          <rect width="700" height="280" fill="#0B1120" rx="8" />
          <text x="350" y="28" fill="#F8FAFC" fontSize="12" fontWeight="bold" textAnchor="middle">
            End-to-End Production MLOps Engineering Architecture
          </text>

          {/* 5 Pipeline Stages */}
          {[
            { title: '1. Ingestion & Validation', desc: 'Schema checks, null alerts', color: '#3B82F6', icon: '📥' },
            { title: '2. Continuous Training', desc: 'Pipelines & experiment tracking', color: '#8B5CF6', icon: '⚙️' },
            { title: '3. Model Registry', desc: 'Versioning, metadata, approvals', color: '#EC4899', icon: '📦' },
            { title: '4. Container Serving', desc: 'Docker, FastAPI, Kubernetes', color: '#10B981', icon: '🚀' },
            { title: '5. Drift Monitoring', desc: 'Data drift & latency alarms', color: '#F59E0B', icon: '📊' },
          ].map((stage, idx) => (
            <g key={idx} transform={`translate(${30 + idx * 132}, 65)`}>
              <rect x="0" y="0" width="118" height="130" rx="8" fill="#1E293B" stroke={stage.color} strokeWidth="2" />
              <text x="59" y="32" fontSize="20" textAnchor="middle">{stage.icon}</text>
              <text x="59" y="60" fill={stage.color} fontSize="10" fontWeight="bold" textAnchor="middle">
                {stage.title}
              </text>
              <text x="59" y="82" fill="#94A3B8" fontSize="8" textAnchor="middle">
                {stage.desc}
              </text>
              <circle cx="59" cy="112" r="8" fill={stage.color} fillOpacity="0.2" />
              <text x="59" y="116" fill={stage.color} fontSize="9" fontWeight="bold" textAnchor="middle">
                ✓
              </text>
            </g>
          ))}

          {/* Feedback loop arrow from Monitoring back to Training */}
          <path d="M 620 200 L 620 230 L 225 230 L 225 200" fill="none" stroke="#F59E0B" strokeWidth="2" strokeDasharray="5 3" />
          <text x="420" y="245" fill="#FCD34D" fontSize="10" fontWeight="bold" textAnchor="middle">
            Automatic Trigger Retraining on Concept Drift or Performance Degradation
          </text>
        </svg>
      );

    default:
      // Universal clean algorithm concept diagram with intuition steps
      return (
        <svg viewBox="0 0 700 280" className="w-full h-auto max-w-3xl mx-auto select-none">
          <rect width="700" height="280" fill="#0B1120" rx="8" />
          <text x="350" y="32" fill="#F8FAFC" fontSize="13" fontWeight="bold" textAnchor="middle">
            Algorithm Flow & Structural Architecture: {lesson.title}
          </text>

          {/* 3 Step Boxes from lesson.intuition.steps */}
          {lesson.intuition.steps.slice(0, 3).map((st, i) => (
            <g key={i} transform={`translate(${50 + i * 215}, 65)`}>
              <rect
                x="0"
                y="0"
                width="175"
                height="140"
                rx="10"
                fill="#1E293B"
                stroke="#6366F1"
                strokeWidth="2"
              />
              <circle cx="30" cy="30" r="14" fill="#4F46E5" />
              <text x="30" y="35" fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="middle">
                {st.step}
              </text>
              <text x="55" y="34" fill="#C7D2FE" fontSize="11" fontWeight="bold">
                Stage {st.step}
              </text>
              <text x="14" y="65" fill="#F1F5F9" fontSize="11" fontWeight="bold">
                {st.title.length > 20 ? st.title.slice(0, 20) + '...' : st.title}
              </text>
              <foreignObject x="14" y="75" width="150" height="55">
                <p className="text-[10px] text-slate-300 leading-tight">
                  {st.description.length > 80 ? st.description.slice(0, 80) + '...' : st.description}
                </p>
              </foreignObject>
            </g>
          ))}

          {/* Flow Arrows connecting the 3 stages */}
          <line x1="230" y1="135" x2="260" y2="135" stroke="#818CF8" strokeWidth="2.5" markerEnd="url(#arrow)" />
          <line x1="445" y1="135" x2="475" y2="135" stroke="#818CF8" strokeWidth="2.5" markerEnd="url(#arrow)" />

          {/* Bottom takeaway pill */}
          <rect x="150" y="230" width="400" height="30" rx="15" fill="#312E81" stroke="#818CF8" strokeWidth="1.5" />
          <text x="350" y="250" fill="#E0E7FF" fontSize="11" fontWeight="bold" textAnchor="middle">
            Objective: Minimize loss and generalize to unseen data distribution
          </text>
        </svg>
      );
  }
}
