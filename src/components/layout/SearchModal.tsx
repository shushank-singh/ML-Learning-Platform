'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Search, X, BookOpen, Compass, Calculator, ArrowRight, Code } from 'lucide-react';
import { MODULES_CATALOG } from '@/data/modules/curriculum';
import { MODULES_CATALOG_DSA } from '@/data/dsa/curriculum';
import { MODULES_CATALOG_PYTHON } from '@/data/python/curriculum';
import { MODULES_CATALOG_JAVA } from '@/data/java/curriculum';

interface SearchResult {
  title: string;
  category: 'Lesson' | 'Formula' | 'Algorithm' | 'Project';
  url: string;
  description: string;
  badge?: string;
}

const SEARCH_DATABASE: SearchResult[] = [
  {
    title: 'Visual Short Notes & 60s Revision System',
    category: 'Algorithm',
    url: '/revision-notes',
    description: 'Quick visual revision for Machine Learning, Python, Java, and DSA with animated diagrams and recall quizzes.',
    badge: 'Visual Notes',
  },
  // Lessons & Algorithms
  {
    title: 'Ordinary Least Squares & Linear Regression',
    category: 'Lesson',
    url: '/curriculum/module-3/linear-regression',
    description: 'Derivation of normal equation, residual minimization, MSE loss, and gradient descent.',
    badge: 'Module 3',
  },
  {
    title: 'Multiple Linear Regression & Normal Equation',
    category: 'Lesson',
    url: '/curriculum/module-3/multiple-regression',
    description: 'Vectorized formulation θ = (XᵀX)⁻¹Xᵀy, multicollinearity, VIF, and Gauss-Markov assumptions.',
    badge: 'Module 3',
  },
  {
    title: 'Ridge (L2) and Lasso (L1) Regularization',
    category: 'Lesson',
    url: '/curriculum/module-3/regularization',
    description: 'Constrained optimization, L1 sparsity vs L2 weight decay, bias-variance tradeoff.',
    badge: 'Module 3',
  },
  {
    title: 'Logistic Regression & Binary Cross-Entropy',
    category: 'Lesson',
    url: '/curriculum/module-4/logistic-regression',
    description: 'Sigmoid link function, log-loss derivation, gradient of cross-entropy, decision thresholding.',
    badge: 'Module 4',
  },
  {
    title: 'Support Vector Machines & The Kernel Trick',
    category: 'Lesson',
    url: '/curriculum/module-4/svm',
    description: 'Maximum margin hyperplane, hinge loss, dual formulation, RBF Gaussian kernel.',
    badge: 'Module 4',
  },
  {
    title: 'Decision Trees, Gini Impurity & Information Gain',
    category: 'Lesson',
    url: '/curriculum/module-4/decision-trees',
    description: 'Recursive greedy partitioning, CART algorithm, entropy, pruning strategies.',
    badge: 'Module 4',
  },
  {
    title: 'Random Forests & Bagging Ensembles',
    category: 'Lesson',
    url: '/curriculum/module-6/random-forest',
    description: 'Bootstrap aggregation, feature subsampling, out-of-bag error estimation, variance reduction.',
    badge: 'Module 6',
  },
  {
    title: 'Gradient Boosting & XGBoost Internals',
    category: 'Lesson',
    url: '/curriculum/module-6/gradient-boosting',
    description: 'Sequential residual fitting, shrinkage, second-order Taylor expansion, histogram binning.',
    badge: 'Module 6',
  },
  {
    title: 'K-Means Clustering & Lloyd Algorithm',
    category: 'Lesson',
    url: '/curriculum/module-7/kmeans',
    description: 'Non-convex objective, WCSS minimization, Lloyd heuristic, Elbow and Silhouette evaluation.',
    badge: 'Module 7',
  },
  {
    title: 'Principal Component Analysis (PCA)',
    category: 'Lesson',
    url: '/curriculum/module-7/pca',
    description: 'Covariance matrix eigendecomposition, maximum variance projection, SVD relationship.',
    badge: 'Module 7',
  },
  {
    title: 'Confusion Matrix, ROC Curve & Precision-Recall',
    category: 'Lesson',
    url: '/curriculum/module-5/evaluation-metrics',
    description: 'Threshold selection, Type I and II errors, Sensitivity vs Specificity, AUC score.',
    badge: 'Module 5',
  },
  {
    title: 'Artificial Neural Networks & Backpropagation',
    category: 'Lesson',
    url: '/curriculum/module-9/neural-networks',
    description: 'Chain rule matrix calculus, vanishing gradients, Adam optimizer, activation functions.',
    badge: 'Module 9',
  },

  // Formulas
  {
    title: 'Normal Equation: θ = (XᵀX)⁻¹Xᵀy',
    category: 'Formula',
    url: '/formulas#normal-equation',
    description: 'Analytical closed-form global minimum for Ordinary Least Squares.',
  },
  {
    title: 'Sigmoid Logistic Function: σ(z) = 1 / (1 + e⁻ᶻ)',
    category: 'Formula',
    url: '/formulas#sigmoid',
    description: 'Maps real values into probabilities [0, 1].',
  },
  {
    title: 'Binary Cross-Entropy Loss: -[y log ŷ + (1 - y) log(1 - ŷ)]',
    category: 'Formula',
    url: '/formulas#log-loss',
    description: 'Negative log likelihood loss for Bernoulli classification.',
  },
  {
    title: 'Gradient Descent Parameter Update: θ := θ - α∇J(θ)',
    category: 'Formula',
    url: '/formulas#gradient-descent',
    description: 'First-order iterative optimization step.',
  },

  // Visualizers & Tools
  {
    title: 'Interactive ML Algorithm Playground',
    category: 'Algorithm',
    url: '/playground',
    description: 'Live parameter sliders for Regression, Gradient Descent, Decision Boundaries, and K-Means.',
  },
  {
    title: 'Python WebAssembly Code Lab',
    category: 'Algorithm',
    url: '/code-lab',
    description: 'In-browser Python IDE with NumPy, Scikit-learn, and Pandas execution.',
  },

  // Projects
  {
    title: 'Project 1: House Price Regression System',
    category: 'Project',
    url: '/projects/house-price-prediction',
    description: 'End-to-end regression pipeline, feature engineering, and regularization.',
  },
  {
    title: 'Project 3: Customer Churn Classification Engine',
    category: 'Project',
    url: '/projects/customer-churn',
    description: 'Imbalanced dataset handling, SMOTE, ROC-AUC optimization, and SHAP interpretability.',
  },
];

const DSA_SEARCH_ITEMS: SearchResult[] = MODULES_CATALOG_DSA.flatMap((mod) =>
  mod.lessons.map((lesson) => ({
    title: lesson.title,
    category: 'Algorithm' as const,
    url: `/dsa/${mod.id}/${lesson.id}`,
    description: lesson.description,
    badge: `DSA M${mod.number}`,
  }))
);

const PYTHON_SEARCH_ITEMS: SearchResult[] = MODULES_CATALOG_PYTHON.flatMap((mod) =>
  mod.lessons.map((lesson) => ({
    title: lesson.title,
    category: 'Lesson' as const,
    url: `/python/${mod.id}/${lesson.id}`,
    description: lesson.description,
    badge: `Python M${mod.number}`,
  }))
);

const JAVA_SEARCH_ITEMS: SearchResult[] = MODULES_CATALOG_JAVA.flatMap((mod) =>
  mod.lessons.map((lesson) => ({
    title: lesson.title,
    category: 'Lesson' as const,
    url: `/java/${mod.id}/${lesson.id}`,
    description: lesson.description,
    badge: `Java M${mod.number}`,
  }))
);

const ML_SEARCH_ITEMS: SearchResult[] = MODULES_CATALOG.flatMap((mod) =>
  mod.lessons.map((lesson) => ({
    title: lesson.title,
    category: 'Lesson' as const,
    url: `/curriculum/${mod.id}/${lesson.id}`,
    description: lesson.description,
    badge: mod.id.startsWith('dl-module') ? 'Deep Learning' : mod.id.startsWith('numpy') ? 'NumPy' : mod.id.startsWith('pandas') ? 'Pandas' : `AI & ML M${mod.number}`,
  }))
);

const ALL_SEARCH_ITEMS: SearchResult[] = [
  ...SEARCH_DATABASE,
  ...ML_SEARCH_ITEMS,
  ...DSA_SEARCH_ITEMS,
  ...PYTHON_SEARCH_ITEMS,
  ...JAVA_SEARCH_ITEMS,
];

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const filtered = useMemo(() => {
    if (!query.trim()) return ALL_SEARCH_ITEMS.slice(0, 6);
    const q = query.toLowerCase();
    return ALL_SEARCH_ITEMS.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.badge?.toLowerCase().includes(q)
    );
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input Bar */}
        <div className="flex items-center px-4 border-b border-slate-200 dark:border-slate-800">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search algorithms, formulas, derivations, or concepts (e.g. OLS, SVM, ROC, Bayes)..."
            autoFocus
            className="w-full px-3 py-4 text-sm bg-transparent text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-slate-100 dark:divide-slate-800/60">
          {filtered.length > 0 ? (
            filtered.map((item, idx) => (
              <Link
                key={idx}
                href={item.url}
                onClick={onClose}
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors group"
              >
                <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5">
                  {item.category === 'Lesson' && <BookOpen className="w-4 h-4" />}
                  {item.category === 'Formula' && <Calculator className="w-4 h-4" />}
                  {item.category === 'Algorithm' && <Compass className="w-4 h-4" />}
                  {item.category === 'Project' && <Code className="w-4 h-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                      {item.title}
                    </span>
                    {item.badge && (
                      <span className="px-2 py-0.5 text-[10px] font-mono font-semibold rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                    {item.description}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
              </Link>
            ))
          ) : (
            <div className="py-10 text-center text-sm text-slate-500">
              No matching algorithms or formulas found for &quot;{query}&quot;.
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500">
          <span>Navigate with mouse or arrow keys</span>
          <span className="flex items-center gap-1 font-mono">
            <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-[10px]">
              ESC
            </kbd>{' '}
            to close
          </span>
        </div>
      </div>
    </div>
  );
};
