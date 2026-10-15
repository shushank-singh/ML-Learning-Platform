'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  CheckSquare,
  Award,
  AlertCircle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  BookOpen,
  ArrowRight,
  Flame,
} from 'lucide-react';
import { getProgress, recordQuizScore } from '@/lib/storage';
import { UserProgressState } from '@/lib/types';
import confetti from 'canvas-confetti';

interface ExamQuestion {
  id: string;
  category: string;
  type: 'MCQ' | 'Formula' | 'Code Prediction';
  question: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const QUESTION_BANK: ExamQuestion[] = [
  {
    id: 'q-ols-normal',
    category: 'Regression',
    type: 'Formula',
    question: 'What is the closed-form analytical solution (Normal Equation) for Ordinary Least Squares regression weights?',
    options: [
      'w* = (XᵀX)⁻¹ Xᵀy',
      'w* = Xᵀ (X Xᵀ)⁻¹ y',
      'w* = (Xᵀ y)⁻¹ Xᵀ X',
      'w* = (XᵀX + λI) Xᵀy',
    ],
    correctIndex: 0,
    explanation: 'Setting ∇w [ 1/2 ||y - Xw||² ] = -Xᵀ(y - Xw) = 0 yields XᵀXw = Xᵀy, which inverts to w* = (XᵀX)⁻¹Xᵀy when XᵀX is full rank.',
  },
  {
    id: 'q-bias-variance',
    category: 'Model Evaluation',
    type: 'MCQ',
    question: 'Increasing the maximum depth of a Decision Tree from 3 to 25 will typically:',
    options: [
      'Increase bias and decrease variance, causing underfitting.',
      'Decrease bias and increase variance, increasing the risk of overfitting.',
      'Leave bias and variance unchanged.',
      'Guarantee better generalization on unseen test data.',
    ],
    correctIndex: 1,
    explanation: 'Deeper trees have higher model capacity, allowing them to fit intricate training patterns (lower bias), but becoming very sensitive to noise (higher variance).',
  },
  {
    id: 'q-log-loss-grad',
    category: 'Classification',
    type: 'Formula',
    question: 'What is the gradient of the Binary Cross-Entropy loss with respect to weight vector w in Logistic Regression?',
    options: [
      '∇w J = (1/N) Xᵀ (ŷ - y)',
      '∇w J = (1/N) Xᵀ (y - ŷ)²',
      '∇w J = - (1/N) X (ŷ - y)',
      '∇w J = (XᵀX)⁻¹ ŷ',
    ],
    correctIndex: 0,
    explanation: 'Due to the chain rule cancellation of σ(z)(1 - σ(z)), the gradient simplifies cleanly to (1/N) Xᵀ(ŷ - y).',
  },
  {
    id: 'q-code-pred',
    category: 'Code Lab',
    type: 'Code Prediction',
    question: 'What is the output of the following NumPy code snippet?',
    codeSnippet: `import numpy as np
X = np.array([[1, 2], [3, 4]])
w = np.array([2, 1])
print(X @ w)`,
    options: [
      '[4, 10]',
      '[5, 11]',
      '[[2, 2], [6, 4]]',
      '14',
    ],
    correctIndex: 0,
    explanation: 'Row 1: 1*2 + 2*1 = 4. Row 2: 3*2 + 4*1 = 10. The result is array [4, 10].',
  },
  {
    id: 'q-roc-auc',
    category: 'Evaluation',
    type: 'MCQ',
    question: 'A completely uninformative random guess binary classifier will produce a Receiver Operating Characteristic (ROC) AUC of:',
    options: [
      '0.00',
      '0.50',
      '1.00',
      '-1.00',
    ],
    correctIndex: 1,
    explanation: 'A random classifier creates an ROC diagonal line from (0, 0) to (1, 1), forming a triangle with area 0.50.',
  },
  {
    id: 'q-l1-sparsity',
    category: 'Regularization',
    type: 'MCQ',
    question: 'Why does Lasso (L1) regularization induce exact zero coefficients while Ridge (L2) only shrinks them towards zero?',
    options: [
      'L1 uses a higher learning rate during gradient updates.',
      'The diamond-shaped L1 constraint region has sharp corners on coordinate axes where elliptical loss contours frequently touch.',
      'Ridge regularization is not differentiable.',
      'Lasso can only be used on single-feature datasets.',
    ],
    correctIndex: 1,
    explanation: 'Geometrically, the non-differentiable sharp vertices of the L1 ball ||w||₁ ≤ C intersect quadratic level curves directly at coordinate axes where w_j = 0.',
  },
  {
    id: 'q-kmeans-wcss',
    category: 'Unsupervised',
    type: 'MCQ',
    question: 'Lloyd’s heuristic for K-Means clustering is mathematically guaranteed to:',
    options: [
      'Find the global optimum of the Within-Cluster Sum of Squares (WCSS).',
      'Monotonically decrease (or keep constant) WCSS at every step until reaching a local minimum.',
      'Automatically find the optimal number of clusters K without human tuning.',
      'Always converge in exactly 3 iterations.',
    ],
    correctIndex: 1,
    explanation: 'Both the Assignment step and Update step strictly minimize or maintain WCSS, ensuring convergence to a local minimum (though not necessarily the global optimum).',
  },
];

export default function QuizzesPage() {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [progress, setProgress] = useState<UserProgressState | null>(null);

  useEffect(() => {
    setProgress(getProgress());
    const handleUpdate = () => setProgress(getProgress());
    window.addEventListener('ml_progress_updated', handleUpdate);
    return () => window.removeEventListener('ml_progress_updated', handleUpdate);
  }, []);

  const handleSelect = (qId: string, optIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const handleSubmit = () => {
    let s = 0;
    QUESTION_BANK.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        s++;
      }
    });
    setScore(s);
    setIsSubmitted(true);
    recordQuizScore('final-assessment', s, QUESTION_BANK.length);

    if (s / QUESTION_BANK.length >= 0.7) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setScore(0);
  };

  const pct = Math.round((score / QUESTION_BANK.length) * 100);

  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
          <CheckSquare className="w-4 h-4" />
          <span>Evaluation & Diagnostic Center</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Comprehensive Machine Learning Assessment
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
          Test your mastery across derivations, loss functions, code outputs, and diagnostic tradeoffs. Instant answers, full explanations, and spaced revision tracking.
        </p>
      </div>

      {/* Score Banner when Submitted */}
      {isSubmitted && (
        <div
          className={`p-6 rounded-2xl border ${
            pct >= 70
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
              : 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200'
          } shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4`}
        >
          <div className="flex items-center gap-4">
            <div
              className={`p-3 rounded-xl ${
                pct >= 70 ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'
              }`}
            >
              <Award className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs uppercase font-bold tracking-wider block">
                {pct >= 70 ? 'Assessment Passed! Outstanding Work' : 'Review Recommended'}
              </span>
              <h2 className="text-2xl font-extrabold">
                Score: {score} / {QUESTION_BANK.length} ({pct}%)
              </h2>
              <p className="text-xs opacity-90 mt-0.5">
                {pct >= 70
                  ? 'You demonstrated strong conceptual and mathematical command across core ML disciplines.'
                  : 'Check the detailed explanations below to identify and strengthen weak mathematical concepts.'}
              </p>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 shadow-sm flex items-center gap-1.5 shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake Exam</span>
          </button>
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-6">
        {QUESTION_BANK.map((q, idx) => {
          const selected = selectedAnswers[q.id];
          const isAnswered = selected !== undefined;
          const isCorrect = selected === q.correctIndex;

          return (
            <div
              key={q.id}
              className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                  Question {idx + 1} of {QUESTION_BANK.length}
                </span>
                <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  {q.category} · {q.type}
                </span>
              </div>

              <h3 className="font-semibold text-sm sm:text-base text-slate-900 dark:text-slate-100">
                {q.question}
              </h3>

              {q.codeSnippet && (
                <pre className="p-3 rounded-lg bg-slate-950 text-emerald-400 font-mono text-xs overflow-x-auto border border-slate-800">
                  {q.codeSnippet}
                </pre>
              )}

              {/* Options */}
              <div className="space-y-2">
                {q.options.map((opt, oIdx) => {
                  let btnStyle =
                    'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700';

                  if (selected === oIdx) {
                    btnStyle =
                      'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-semibold';
                  }

                  if (isSubmitted) {
                    if (oIdx === q.correctIndex) {
                      btnStyle =
                        'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-semibold';
                    } else if (selected === oIdx) {
                      btnStyle =
                        'border-rose-600 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300';
                    }
                  }

                  return (
                    <button
                      key={oIdx}
                      disabled={isSubmitted}
                      onClick={() => handleSelect(q.id, oIdx)}
                      className={`w-full text-left p-3 rounded-xl border text-xs flex items-center justify-between transition-colors ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {isSubmitted && oIdx === q.correctIndex && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      )}
                      {isSubmitted && selected === oIdx && oIdx !== q.correctIndex && (
                        <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Dropdown on Submit */}
              {isSubmitted && (
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  <span className="font-bold text-slate-900 dark:text-slate-100 block mb-1">
                    Mathematical & Engineering Rationale:
                  </span>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Submit Action */}
      {!isSubmitted && (
        <div className="flex justify-end pt-2">
          <button
            onClick={handleSubmit}
            disabled={Object.keys(selectedAnswers).length < QUESTION_BANK.length}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs transition-colors shadow-md"
          >
            Submit Final Assessment ({Object.keys(selectedAnswers).length}/{QUESTION_BANK.length} Answered)
          </button>
        </div>
      )}
    </div>
  );
}
