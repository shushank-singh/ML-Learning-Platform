'use client';

import React, { useState } from 'react';
import {
  GitBranch,
  ArrowRight,
  Database,
  Sliders,
  Cpu,
  TrendingDown,
  CheckCircle2,
  BarChart2,
  Workflow,
} from 'lucide-react';
import { LessonContent } from '@/lib/types';

interface LessonWorkflowProps {
  lesson: LessonContent;
}

export const LessonWorkflow: React.FC<LessonWorkflowProps> = ({ lesson }) => {
  const [activeStage, setActiveStage] = useState<number>(0);

  // Standard ordered pipeline stages customized to the algorithm
  const defaultStages = [
    {
      num: 1,
      title: 'Data Preparation & Encoding',
      action: 'Construct feature design matrix X and target vector y. Verify missing values, apply scaling, and split into train/validation sets.',
      input: 'Raw feature columns & records',
      output: 'Clean normalized arrays X ∈ ℝ^{N×D}, y ∈ ℝ^N',
      icon: Database,
    },
    {
      num: 2,
      title: 'Parameter Initialization',
      action: 'Initialize weights W, biases b, cluster centroids, or tree root nodes according to the initialization protocol (e.g. zeros, random Gaussian, or K-Means++).',
      input: 'Hyperparameters & feature dimensionality D',
      output: 'Initial state vector W_0, b_0',
      icon: Sliders,
    },
    {
      num: 3,
      title: 'Forward Projection & Hypothesis',
      action: 'Pass training instances through the model hypothesis function to calculate continuous projections ŷ or class probabilities P(y=1|x).',
      input: 'Batch features X and current parameters W',
      output: 'Model predictions ŷ = f(X; W)',
      icon: Cpu,
    },
    {
      num: 4,
      title: 'Loss / Objective Evaluation',
      action: 'Compare predictions ŷ against ground truth y using the loss objective (MSE, Log Loss, Gini Impurity, or Margin Slack).',
      input: 'Predictions ŷ and true labels y',
      output: 'Scalar loss J(W) or split quality criterion',
      icon: TrendingDown,
    },
    {
      num: 5,
      title: 'Optimization & Weight Update',
      action: 'Compute analytical gradient ∇J or analytical Normal Equation solution, and adjust parameter state in the direction of steepest descent.',
      input: 'Gradient vector ∇_W J and learning rate η',
      output: 'Updated parameters W_{t+1} ← W_t - η ∇J',
      icon: GitBranch,
    },
    {
      num: 6,
      title: 'Convergence Check & Stopping',
      action: 'Test if change in loss ||J_{t+1} - J_t|| < ε or maximum iterations reached. Early stop if validation loss starts climbing.',
      input: 'Loss trajectory over epochs',
      output: 'Optimal parameter weights W*',
      icon: CheckCircle2,
    },
    {
      num: 7,
      title: 'Inference & Generalization',
      action: 'Apply the trained model W* to previously unseen test data to calculate final evaluation metrics and confidence intervals.',
      input: 'Unseen test matrix X_test',
      output: 'Final predictions ŷ_test & diagnostic scores',
      icon: BarChart2,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <Workflow className="w-5 h-5" />
          </span>
          <div>
            <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest block">
              Section G · Execution Pipeline
            </span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Step-by-Step Algorithm Workflow
            </h2>
          </div>
        </div>

        <span className="text-xs px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold">
          7-Stage Ordered Pipeline
        </span>
      </div>

      {/* Workflow Horizontal Interactive Stepper */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Understand how data flows through the algorithm from ingestion to final prediction before looking at Python code:
        </p>

        {/* Timeline Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {defaultStages.map((stage, idx) => {
            const isSelected = idx === activeStage;
            const Icon = stage.icon;
            return (
              <button
                key={stage.num}
                onClick={() => setActiveStage(idx)}
                className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all ${
                  isSelected
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-md'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className={`text-[10px] font-mono font-bold ${isSelected ? 'text-indigo-200' : 'text-slate-400'}`}>
                    0{stage.num}
                  </span>
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-indigo-500'}`} />
                </div>
                <span className="text-[11px] font-bold leading-tight truncate">
                  {stage.title.split('&')[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Stage Detail Card */}
        {defaultStages[activeStage] && (
          <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                Stage {defaultStages[activeStage].num} of 7: {defaultStages[activeStage].title}
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                Data Transformation
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-normal">
              {defaultStages[activeStage].action}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1">
                  Input State:
                </span>
                <span className="font-mono text-slate-700 dark:text-slate-300 font-semibold">
                  {defaultStages[activeStage].input}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] font-mono text-emerald-500 uppercase block mb-1">
                  Output State:
                </span>
                <span className="font-mono text-emerald-700 dark:text-emerald-300 font-semibold">
                  {defaultStages[activeStage].output}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
