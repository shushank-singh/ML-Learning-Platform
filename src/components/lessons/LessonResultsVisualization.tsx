'use client';

import React from 'react';
import {
  BarChart2,
  TrendingUp,
  Eye,
  AlertTriangle,
  CheckCircle2,
  Sliders,
  Layers,
} from 'lucide-react';
import { LessonContent } from '@/lib/types';

interface LessonResultsVisualizationProps {
  lesson: LessonContent;
}

export const LessonResultsVisualization: React.FC<LessonResultsVisualizationProps> = ({
  lesson,
}) => {
  // Generate structured observation checklist based on lesson type
  const getObservationGuide = () => {
    const id = lesson.id.toLowerCase();
    const mod = lesson.moduleId.toLowerCase();

    if (mod === 'module-3' || id.includes('regression')) {
      return {
        chartType: 'Fitted Regression Plane & Residual Scatter Plot',
        xAxis: 'Predictor Features (e.g. Size, Age, Normalized Inputs)',
        yAxis: 'Target Response ŷ vs True Observed y',
        patternsToLookFor: [
          'Linear alignment of data points around the regression line or hyperplane',
          'Residual points randomly scattered around 0 with uniform vertical spread (homoscedasticity)',
          'Absence of banana-shaped curvature (which would indicate missing non-linear polynomial features)',
        ],
        validConclusions: 'You can quantify the linear marginal rate of change per unit feature increase and calculate prediction confidence intervals.',
        invalidConclusions: 'You cannot claim direct causal mechanics purely from correlation coefficients without randomized control experiments.',
      };
    }

    if (mod === 'module-4' || id.includes('classification') || id.includes('svm') || id.includes('logistic')) {
      return {
        chartType: 'Decision Boundary Contour & Probability Sigmoid',
        xAxis: 'Feature 1 (Normalized Input Coordinate)',
        yAxis: 'Feature 2 (Orthogonal Feature Axis)',
        patternsToLookFor: [
          'Clear spatial margin separating class clusters with minimal overlap',
          'Smooth boundary transition rather than erratic jagged loops (which indicate overfitting)',
          'Confidence probability gradients fading smoothly from 0.0 to 1.0 around the 0.5 decision threshold',
        ],
        validConclusions: 'You can identify which class is most probable given a new feature coordinate and measure classification margin certainty.',
        invalidConclusions: 'A 100% training accuracy boundary with complex loops does not imply good generalization on unseen real-world test sets.',
      };
    }

    if (mod === 'module-7' || id.includes('kmeans') || id.includes('pca') || id.includes('cluster')) {
      return {
        chartType: 'Cluster Voronoi Partitions & Principal Variance Projections',
        xAxis: 'Principal Component 1 (Direction of Maximum Data Variance)',
        yAxis: 'Principal Component 2 (Orthogonal Second-Order Variance Axis)',
        patternsToLookFor: [
          'Distinct isolated island groupings with high intra-cluster density and wide inter-cluster separation',
          'Centroids sitting near the center of mass of their assigned cluster points',
          'Elbow curvature in inertia plots showing diminishing returns for additional clusters K',
        ],
        validConclusions: 'You can discover natural latent customer or biological segments without needing external ground-truth labels.',
        invalidConclusions: 'Clusters found by K-Means assume convex spherical distributions and may misrepresent arbitrary manifold shapes.',
      };
    }

    return {
      chartType: 'Metric Convergence Curve & Training Trajectory',
      xAxis: 'Optimization Epochs / Complexity Steps',
      yAxis: 'Objective Loss & Validation Performance',
      patternsToLookFor: [
        'Monotonic decrease in training loss with smooth asymptotic leveling off',
        'Validation score tracking training score closely before starting to diverge (indicating the onset of overfitting)',
        'Gradient magnitudes shrinking toward zero as parameters reach optimal stationary points',
      ],
      validConclusions: 'You can verify whether optimization converged successfully and detect the exact point where regularization is needed.',
      invalidConclusions: 'Fast convergence does not guarantee that the model found the global minimum if non-convex landscapes or poor learning rates are involved.',
    };
  };

  const guide = getObservationGuide();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <BarChart2 className="w-5 h-5" />
          </span>
          <div>
            <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest block">
              Section I · Output Diagnostics
            </span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Results & Visualization Interpretation Guide
            </h2>
          </div>
        </div>

        <span className="text-xs px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold">
          What the Charts Mean
        </span>
      </div>

      <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1">
            Visual Diagnostic Standard: {guide.chartType}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            When running this model, these are the visual cues and coordinate axes you must inspect:
          </p>
        </div>

        {/* Axes Definition Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80">
            <span className="text-[10px] font-mono text-indigo-500 uppercase font-bold block mb-1">
              Horizontal X-Axis Represents:
            </span>
            <span className="font-semibold text-slate-900 dark:text-slate-100">
              {guide.xAxis}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80">
            <span className="text-[10px] font-mono text-indigo-500 uppercase font-bold block mb-1">
              Vertical Y-Axis Represents:
            </span>
            <span className="font-semibold text-slate-900 dark:text-slate-100">
              {guide.yAxis}
            </span>
          </div>
        </div>

        {/* What Patterns to Look For */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
            <Eye className="w-4 h-4 text-emerald-500" />
            <span>Target Diagnostic Patterns to Look For:</span>
          </h4>
          <div className="space-y-2">
            {guide.patternsToLookFor.map((pat, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800 flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                <span className="leading-relaxed">{pat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* What Can vs Cannot be Concluded */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/40 text-xs space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-emerald-800 dark:text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Valid Statistical Conclusions</span>
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              {guide.validConclusions}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 text-xs space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-amber-800 dark:text-amber-300">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Unwarranted Conclusions & Traps</span>
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              {guide.invalidConclusions}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
