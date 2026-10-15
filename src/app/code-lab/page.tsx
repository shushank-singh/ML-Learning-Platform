'use client';

import React, { useState } from 'react';
import {
  Terminal,
  Sparkles,
  Play,
  RotateCcw,
  Copy,
  Download,
  ExternalLink,
  Code2,
  FileCode,
} from 'lucide-react';
import { CodeRunner } from '@/components/code/CodeRunner';

const STARTER_TEMPLATES = [
  {
    id: 'ols-scratch',
    title: 'OLS Normal Equation from Scratch (NumPy)',
    code: `import numpy as np

# 1. Generate synthetic linear data: y = 3.5 * x + 10 + noise
np.random.seed(42)
N = 50
X = np.linspace(1, 10, N).reshape(-1, 1)
noise = np.random.normal(0, 2.0, N)
y = 3.5 * X.ravel() + 10.0 + noise

# 2. Augment X with ones column for bias
X_aug = np.hstack([np.ones((N, 1)), X])

# 3. Analytical Normal Equation: w* = (X^T X)^(-1) X^T y
XtX = X_aug.T @ X_aug
XtY = X_aug.T @ y
w_opt = np.linalg.inv(XtX) @ XtY

intercept, slope = w_opt[0], w_opt[1]
print("--- Ordinary Least Squares Results ---")
print(f"Optimal Intercept (b): {intercept:.4f}")
print(f"Optimal Slope (w):     {slope:.4f}")

# 4. Compute R^2 Score
y_pred = X_aug @ w_opt
r2 = 1 - (np.sum((y - y_pred)**2) / np.sum((y - np.mean(y))**2))
print(f"R-squared Coefficient: {r2:.4f}")
`,
  },
  {
    id: 'logistic-gd',
    title: 'Logistic Regression with Gradient Descent (NumPy)',
    code: `import numpy as np

def sigmoid(z):
    return 1.0 / (1.0 + np.exp(-np.clip(z, -250, 250)))

# Generate synthetic 2-class dataset
np.random.seed(42)
N = 100
X = np.random.randn(N, 2)
# Decision boundary around x1 + 1.5 * x2 > 0
y = (X[:, 0] + 1.5 * X[:, 1] > 0).astype(int)

# Initialize weights and hyperparameters
weights = np.zeros(2)
bias = 0.0
lr = 0.5
epochs = 200

# Training loop
for epoch in range(epochs):
    logits = X @ weights + bias
    preds = sigmoid(logits)
    
    # Compute cross-entropy loss
    eps = 1e-15
    loss = -np.mean(y * np.log(preds + eps) + (1 - y) * np.log(1 - preds + eps))
    
    # Compute gradients
    dw = (1.0 / N) * (X.T @ (preds - y))
    db = (1.0 / N) * np.sum(preds - y)
    
    weights -= lr * dw
    bias -= lr * db

# Evaluate Accuracy
final_preds = (sigmoid(X @ weights + bias) >= 0.5).astype(int)
acc = np.mean(final_preds == y) * 100

print("--- Logistic Regression Results ---")
print(f"Learned Weights: w1={weights[0]:.3f}, w2={weights[1]:.3f}")
print(f"Learned Bias:    {bias:.3f}")
print(f"Final Training Accuracy: {acc:.1f}%")
`,
  },
  {
    id: 'sklearn-pipeline',
    title: 'Scikit-Learn Pipeline with Cross-Validation',
    code: `import numpy as np
from sklearn.datasets import make_classification
from sklearn.model_selection import cross_val_score, StratifiedKFold
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import Pipeline

# Generate benchmark classification problem
X, y = make_classification(n_samples=250, n_features=10, n_informative=5, random_state=42)

# Build two production pipelines
pipe_logistic = Pipeline([
    ('scaler', StandardScaler()),
    ('clf', LogisticRegression(C=1.0, random_state=42))
])

pipe_rf = Pipeline([
    ('clf', RandomForestClassifier(n_estimators=50, random_state=42))
])

cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
scores_log = cross_val_score(pipe_logistic, X, y, cv=cv, scoring='roc_auc')
scores_rf = cross_val_score(pipe_rf, X, y, cv=cv, scoring='roc_auc')

print("--- 5-Fold Cross Validation Results (ROC-AUC) ---")
print(f"Logistic Regression: {scores_log.mean():.4f} (+/- {scores_log.std():.4f})")
print(f"Random Forest:       {scores_rf.mean():.4f} (+/- {scores_rf.std():.4f})")
`,
  },
  {
    id: 'kmeans-scratch',
    title: 'K-Means Lloyd Clustering Algorithm (NumPy)',
    code: `import numpy as np

# Generate 3 2D point clusters
np.random.seed(42)
c1 = np.random.randn(25, 2) + np.array([2, 2])
c2 = np.random.randn(25, 2) + np.array([8, 8])
c3 = np.random.randn(25, 2) + np.array([2, 8])
X = np.vstack([c1, c2, c3])

K = 3
# Random initialization of centroids
centroids = X[np.random.choice(len(X), K, replace=False)]

# Run 10 iterations of Lloyd's algorithm
for iteration in range(10):
    # Step 1: Assign each point to closest centroid
    distances = np.linalg.norm(X[:, np.newaxis, :] - centroids[np.newaxis, :, :], axis=2)
    clusters = np.argmin(distances, axis=1)
    
    # Step 2: Recompute centroid positions as mean of clusters
    new_centroids = np.array([X[clusters == k].mean(axis=0) for k in range(K)])
    if np.allclose(centroids, new_centroids):
        print(f"K-Means converged at iteration {iteration + 1}!")
        break
    centroids = new_centroids

print("Final Cluster Centroids:\\n", np.round(centroids, 3))
`,
  },
];

export default function CodeLabPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>(STARTER_TEMPLATES[0].id);
  const activeTemplate = STARTER_TEMPLATES.find((t) => t.id === selectedTemplate) || STARTER_TEMPLATES[0];

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
          <Terminal className="w-4 h-4" />
          <span>Client-Side Pyodide Python Engine (WASM)</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Python Coding Studio
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
          Write, modify, and execute Python code directly inside your browser. Loaded with standard scientific packages including NumPy, SciPy, and Scikit-learn.
        </p>
      </div>

      {/* Starter Templates Picker */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide mr-2 flex items-center gap-1">
          <FileCode className="w-3.5 h-3.5" />
          Starter Templates:
        </span>
        {STARTER_TEMPLATES.map((tmpl) => (
          <button
            key={tmpl.id}
            onClick={() => setSelectedTemplate(tmpl.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              selectedTemplate === tmpl.id
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
          >
            {tmpl.title.split('(')[0].trim()}
          </button>
        ))}
      </div>

      {/* Code Runner Instance */}
      <CodeRunner
        key={activeTemplate.id}
        initialCode={activeTemplate.code}
        title={activeTemplate.title}
      />
    </div>
  );
}
