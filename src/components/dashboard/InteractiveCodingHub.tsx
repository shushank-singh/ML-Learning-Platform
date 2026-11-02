'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Terminal,
  Code2,
  Coffee,
  TreePine,
  Sliders,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Layers,
  Zap,
} from 'lucide-react';
import { CodeRunner } from '@/components/code/CodeRunner';
import { JavaCodeRunner } from '@/components/java/JavaCodeRunner';

type HubLanguage = 'python' | 'java' | 'dsa' | 'visualizers';

interface CodingTemplate {
  id: string;
  title: string;
  description: string;
  code: string;
}

const PYTHON_TEMPLATES: CodingTemplate[] = [
  {
    id: 'py-numpy-ols',
    title: 'OLS Normal Equation (NumPy)',
    description: 'Analytical least squares: w = (X^T X)^(-1) X^T y from scratch.',
    code: `import numpy as np

# 1. Generate synthetic linear data: y = 2.5 * x + 5.0 + noise
np.random.seed(42)
N = 30
X = np.linspace(1, 10, N).reshape(-1, 1)
noise = np.random.normal(0, 1.2, N)
y = 2.5 * X.ravel() + 5.0 + noise

# 2. Add bias column (vector of ones)
X_aug = np.hstack([np.ones((N, 1)), X])

# 3. Normal Equation: w* = (X^T X)^(-1) X^T y
XtX = X_aug.T @ X_aug
XtY = X_aug.T @ y
w_opt = np.linalg.inv(XtX) @ XtY

intercept, slope = w_opt[0], w_opt[1]
print("--- Ordinary Least Squares Results ---")
print(f"Optimal Intercept (b): {intercept:.4f} (True: 5.0)")
print(f"Optimal Slope (w):     {slope:.4f} (True: 2.5)")

# 4. Coefficient of Determination R^2
y_pred = X_aug @ w_opt
r2 = 1.0 - (np.sum((y - y_pred)**2) / np.sum((y - np.mean(y))**2))
print(f"R-squared Score:       {r2:.4f}")
`,
  },
  {
    id: 'py-sigmoid',
    title: 'Vectorized Sigmoid & Log-Loss',
    description: 'Binary logistic activation with numerically stable clipping.',
    code: `import numpy as np

def sigmoid(z):
    # Clip z to prevent numerical overflow in exp(-z)
    z_clipped = np.clip(z, -250, 250)
    return 1.0 / (1.0 + np.exp(-z_clipped))

def binary_cross_entropy(y_true, y_prob):
    eps = 1e-15
    y_p = np.clip(y_prob, eps, 1.0 - eps)
    return -np.mean(y_true * np.log(y_p) + (1.0 - y_true) * np.log(1.0 - y_p))

# Test logits
z_vals = np.array([-5.0, -1.0, 0.0, 1.5, 4.0])
probs = sigmoid(z_vals)
print("Logits:      ", z_vals)
print("Probabilities:", np.round(probs, 4))

y_true = np.array([0, 0, 1, 1, 1])
loss = binary_cross_entropy(y_true, probs)
print(f"Binary Cross-Entropy Loss: {loss:.4f}")
`,
  },
  {
    id: 'py-pca',
    title: 'Covariance PCA Step-by-Step',
    description: 'Centering, covariance matrix, and eigenvalue decomposition.',
    code: `import numpy as np

# Synthetic 2D data with high correlation
np.random.seed(42)
X = np.random.randn(50, 2) @ np.array([[2.0, 1.0], [0.5, 1.5]])

# 1. Zero-center the feature columns
X_centered = X - np.mean(X, axis=0)

# 2. Sample covariance matrix: C = (X_c^T X_c) / (N - 1)
N = X.shape[0]
cov_matrix = (X_centered.T @ X_centered) / (N - 1)

# 3. Eigendecomposition of symmetric matrix
eigenvalues, eigenvectors = np.linalg.eigh(cov_matrix)

# Sort eigenvectors by descending eigenvalue
idx = np.argsort(eigenvalues)[::-1]
eigenvalues = eigenvalues[idx]
eigenvectors = eigenvectors[:, idx]

explained_variance = eigenvalues / np.sum(eigenvalues)
print("--- PCA Results ---")
print("Eigenvalues:         ", np.round(eigenvalues, 4))
print("Explained Variance %:", np.round(explained_variance * 100, 2))
print("First Principal Component (PC1):", np.round(eigenvectors[:, 0], 4))
`,
  },
];

const JAVA_TEMPLATES: CodingTemplate[] = [
  {
    id: 'java-binary-search',
    title: 'Binary Search Implementation',
    description: 'O(log N) optimal logarithmic search on sorted arrays.',
    code: `public class Main {
    public static int binarySearch(int[] arr, int target) {
        int left = 0;
        int right = arr.length - 1;

        while (left <= right) {
            // Avoid integer overflow bug (left + right) / 2
            int mid = left + (right - left) / 2;

            if (arr[mid] == target) {
                return mid;
            } else if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return -1; // Not found
    }

    public static void main(String[] args) {
        int[] sortedNumbers = {3, 9, 14, 21, 28, 35, 42, 56, 68, 77, 89, 95};
        int target = 42;

        int index = binarySearch(sortedNumbers, target);
        System.out.println("--- Java Binary Search Result ---");
        System.out.println("Target value: " + target);
        System.out.println("Found at index: " + index);
    }
}
`,
  },
  {
    id: 'java-hashmap',
    title: 'HashMap Frequency Counter',
    description: 'O(1) average lookup hash table for token counts.',
    code: `import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        String[] tokens = {"apple", "banana", "apple", "cherry", "banana", "apple", "date"};

        Map<String, Integer> freqMap = new HashMap<>();
        for (String token : tokens) {
            freqMap.put(token, freqMap.getOrDefault(token, 0) + 1);
        }

        System.out.println("--- Token Frequency Distribution ---");
        for (Map.Entry<String, Integer> entry : freqMap.entrySet()) {
            System.out.println(entry.getKey() + " -> " + entry.getValue());
        }
    }
}
`,
  },
];

const DSA_TEMPLATES: CodingTemplate[] = [
  {
    id: 'dsa-two-pointers',
    title: 'Two Pointers (Two Sum Sorted)',
    description: 'Find two indices summing to target in O(N) time and O(1) space.',
    code: `def two_sum_sorted(numbers, target):
    left = 0
    right = len(numbers) - 1

    while left < right:
        current_sum = numbers[left] + numbers[right]
        if current_sum == target:
            return (left, right)
        elif current_sum < target:
            left += 1
        else:
            right -= 1

    return None

# Test with a sorted array
arr = [2, 7, 11, 15, 19, 28]
target_val = 26
result = two_sum_sorted(arr, target_val)

print("--- Two Pointers: Two Sum (Sorted) ---")
print(f"Array:  {arr}")
print(f"Target: {target_val}")
if result:
    print(f"Match found at indices: {result} ({arr[result[0]]} + {arr[result[1]]} = {target_val})")
else:
    print("No pair sums to target.")
`,
  },
  {
    id: 'dsa-sliding-window',
    title: 'Sliding Window (Max Sum Subarray)',
    description: 'Fixed-size window moving across array in O(N) time.',
    code: `def max_sub_array_of_size_k(k, arr):
    if len(arr) < k:
        return 0

    max_sum = 0
    window_sum = sum(arr[:k])
    max_sum = window_sum

    for i in range(k, len(arr)):
        window_sum += arr[i] - arr[i - k]
        max_sum = max(max_sum, window_sum)

    return max_sum

data = [2, 1, 5, 1, 3, 2, 8, 4, 1]
window_size = 3
max_val = max_sub_array_of_size_k(window_size, data)

print("--- Sliding Window Algorithm ---")
print(f"Array: {data}")
print(f"Window size K: {window_size}")
print(f"Maximum Subarray Sum: {max_val}")
`,
  },
];

export const InteractiveCodingHub: React.FC = () => {
  const [activeLang, setActiveLang] = useState<HubLanguage>('python');
  const [activePyTemplate, setActivePyTemplate] = useState<string>(PYTHON_TEMPLATES[0].id);
  const [activeJavaTemplate, setActiveJavaTemplate] = useState<string>(JAVA_TEMPLATES[0].id);
  const [activeDsaTemplate, setActiveDsaTemplate] = useState<string>(DSA_TEMPLATES[0].id);

  const currentPy = PYTHON_TEMPLATES.find((t) => t.id === activePyTemplate) || PYTHON_TEMPLATES[0];
  const currentJava = JAVA_TEMPLATES.find((t) => t.id === activeJavaTemplate) || JAVA_TEMPLATES[0];
  const currentDsa = DSA_TEMPLATES.find((t) => t.id === activeDsaTemplate) || DSA_TEMPLATES[0];

  return (
    <section id="coding-hub" className="space-y-6 scroll-mt-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-400 text-xs font-semibold">
            <Terminal className="w-3.5 h-3.5" />
            <span>💻 Interactive Multi-Language Coding Hub</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Interactive Coding &amp; Algorithm Hub
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            Execute real Python (Pyodide), Java (OpenJDK), and DSA code directly in your browser. Select a language to test algorithms, run numerical proofs, or explore machine learning formulas.
          </p>
        </div>

        {/* Language Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-x-auto shrink-0">
          <button
            onClick={() => setActiveLang('python')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeLang === 'python'
                ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Code2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>Python (NumPy)</span>
          </button>

          <button
            onClick={() => setActiveLang('java')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeLang === 'java'
                ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Coffee className="w-3.5 h-3.5 text-amber-500" />
            <span>Java (OpenJDK)</span>
          </button>

          <button
            onClick={() => setActiveLang('dsa')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeLang === 'dsa'
                ? 'bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <TreePine className="w-3.5 h-3.5 text-purple-500" />
            <span>DSA Algorithms</span>
          </button>

          <button
            onClick={() => setActiveLang('visualizers')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeLang === 'visualizers'
                ? 'bg-white dark:bg-slate-900 text-cyan-600 dark:text-cyan-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-cyan-500" />
            <span>Visualizers</span>
          </button>
        </div>
      </div>

      {/* 1. Python Tab */}
      {activeLang === 'python' && (
        <div className="space-y-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-6 shadow-sm">
          {/* Template pills */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Select Exercise Template:
              </span>
              {PYTHON_TEMPLATES.map((tmpl) => (
                <button
                  key={tmpl.id}
                  onClick={() => setActivePyTemplate(tmpl.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    activePyTemplate === tmpl.id
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {tmpl.title}
                </button>
              ))}
            </div>

            <Link
              href="/code-lab"
              className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              <span>Open Full Python Code Lab</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            💡 {currentPy.description}
          </p>

          <CodeRunner
            key={currentPy.id}
            initialCode={currentPy.code}
            title={`Python Studio: ${currentPy.title}`}
          />
        </div>
      )}

      {/* 2. Java Tab */}
      {activeLang === 'java' && (
        <div className="space-y-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-6 shadow-sm">
          {/* Template pills */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Select Java Template:
              </span>
              {JAVA_TEMPLATES.map((tmpl) => (
                <button
                  key={tmpl.id}
                  onClick={() => setActiveJavaTemplate(tmpl.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    activeJavaTemplate === tmpl.id
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {tmpl.title}
                </button>
              ))}
            </div>

            <Link
              href="/java"
              className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline"
            >
              <span>Open Java Mastery Lab</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            💡 {currentJava.description}
          </p>

          <JavaCodeRunner
            key={currentJava.id}
            initialCode={currentJava.code}
            title={`Java Execution Studio: ${currentJava.title}`}
          />
        </div>
      )}

      {/* 3. DSA Tab */}
      {activeLang === 'dsa' && (
        <div className="space-y-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-6 shadow-sm">
          {/* Template pills */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Select Algorithm Pattern:
              </span>
              {DSA_TEMPLATES.map((tmpl) => (
                <button
                  key={tmpl.id}
                  onClick={() => setActiveDsaTemplate(tmpl.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    activeDsaTemplate === tmpl.id
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {tmpl.title}
                </button>
              ))}
            </div>

            <Link
              href="/dsa"
              className="inline-flex items-center gap-1 text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline"
            >
              <span>Explore 106 DSA Topics</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            💡 {currentDsa.description}
          </p>

          <CodeRunner
            key={currentDsa.id}
            initialCode={currentDsa.code}
            title={`DSA Algorithm Runner: ${currentDsa.title}`}
          />
        </div>
      )}

      {/* 4. Visualizers Tab */}
      {activeLang === 'visualizers' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <Link
            href="/playground?tab=regression"
            className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500/60 bg-slate-50/50 dark:bg-slate-850 hover:bg-indigo-50/30 transition-all group space-y-2.5"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400 font-bold">
                OLS Regression
              </span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              📈 Least Squares Residuals
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Manipulate slope w and bias b to visually minimize sum of squared error distances.
            </p>
          </Link>

          <Link
            href="/playground?tab=gradient"
            className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500/60 bg-slate-50/50 dark:bg-slate-850 hover:bg-emerald-50/30 transition-all group space-y-2.5"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-bold">
                Gradient Descent
              </span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              ⚡ Loss Surface Trajectory
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Adjust learning rate step size α, trace iterations down the convex parabola.
            </p>
          </Link>

          <Link
            href="/playground?tab=classification"
            className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-cyan-500/60 bg-slate-50/50 dark:bg-slate-850 hover:bg-cyan-50/30 transition-all group space-y-2.5"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-400 font-bold">
                Logistic Boundary
              </span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-600 group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              🎯 Decision Hyperplanes
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Calibrate separating line w₁x₁ + w₂x₂ + b = 0 and observe probability sigmoids.
            </p>
          </Link>

          <Link
            href="/playground?tab=kmeans"
            className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-violet-500/60 bg-slate-50/50 dark:bg-slate-850 hover:bg-violet-50/30 transition-all group space-y-2.5"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-400 font-bold">
                K-Means Lloyd
              </span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-violet-600 group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              🌐 Cluster Centroids
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Step through assignment and update phases while tracking within-cluster inertia.
            </p>
          </Link>
        </div>
      )}
    </section>
  );
};

