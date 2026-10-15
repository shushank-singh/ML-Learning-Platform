# ML Mastery Lab — Learn Machine Learning from Mathematics to Deployment

[![Next.js 14](https://img.shields.io/badge/Next.js-14.2-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![KaTeX](https://img.shields.io/badge/KaTeX-Math%20Rendering-green?style=flat)](https://katex.org/)
[![Pyodide](https://img.shields.io/badge/Pyodide-WASM%20Python-orange?style=flat&logo=webassembly)](https://pyodide.org/)

An interactive, production-quality educational web platform designed for engineers, students, and practitioners who know introductory programming and want to master every important machine learning algorithm from first-principles mathematics to production deployment.

---

## 🌟 Key Features

1. **Complete 12-Module Machine Learning Curriculum**
   - **Module 0**: Prerequisites & ML Foundations (Taxonomy, splits, ERM)
   - **Module 1**: Mathematics for ML (Vector spaces, SVD, gradients, Jacobians, Bayes, KL divergence)
   - **Module 2**: Data Preprocessing & Feature Engineering (Imputation, scalers, encoders, SMOTE)
   - **Module 3**: Linear & Regularized Regression (OLS, Normal Equation derivation, Ridge, Lasso, ElasticNet)
   - **Module 4**: Classification Algorithms (Logistic regression, SVM kernel trick, Decision Trees, Naive Bayes)
   - **Module 5**: Model Evaluation & Selection (Confusion matrices, ROC-AUC, nested CV, learning curves)
   - **Module 6**: Ensemble Learning (Bagging, Random Forests, AdaBoost, XGBoost, LightGBM, SHAP)
   - **Module 7**: Unsupervised Learning (K-Means, Lloyd heuristic, GMM, PCA, t-SNE, DBSCAN)
   - **Module 8**: Advanced Classical ML (Interpretability, drift detection, time-series forecasting)
   - **Module 9**: Neural Networks & Deep Learning Foundations (Perceptrons, backpropagation matrix calculus, Adam, PyTorch)
   - **Module 10**: ML Engineering & Deployment (Pipelines, joblib, FastAPI microservices, Docker, CI/CD)
   - **Module 11**: Real-World Projects (10 guided end-to-end industry capstones)

2. **Mandatory 20-Section Pedagogical Lesson Template**
   Every lesson includes:
   - Real-world physical analogy
   - Mathematical formulation & step-by-step derivation
   - Formula breakdown with dimension and symbol definitions
   - Hand-solved numerical walkthrough
   - Real-time interactive visualization laboratory
   - Vectorized NumPy from scratch & scikit-learn pipelines
   - Client-side runnable Python code with expected benchmark outputs
   - Line-by-line code explanations
   - Key hyperparameters and practical tuning ranges
   - Assumptions, failure modes, and debugging tips
   - Practice questions, interactive concept quizzes, and independent coding challenges
   - Summary & prerequisite-aware next lesson bridge

3. **Interactive Visual Laboratories (60 FPS SVG/Canvas)**
   - **OLS Simulator**: Live residual bars, slope/intercept drag, and minimal squared loss geometry.
   - **Gradient Descent Convergence**: Parameter update path along convex quadratic loss landscapes with learning rate control.
   - **Logistic Decision Boundary**: 2D classification probability contours and cross-entropy metrics.
   - **K-Means Lloyd Visualizer**: Step-by-step point assignment and centroid mean recomputation.
   - **Metrics & ROC Analyzer**: Dynamic threshold slider updating Confusion Matrix (TP, FP, TN, FN) and ROC-AUC curve.

4. **In-Browser Python Execution (Pyodide WebAssembly)**
   - Client-side isolated execution with Monaco Editor.
   - Pre-loaded with NumPy, SciPy, and Scikit-learn.
   - Live stdout/stderr console, execution timer, code copy, and one-click Google Colab export.

5. **Local Persistence & Spaced Revision Analytics**
   - Tracks daily study streaks, lesson completions, quiz score histories, and personal notes.
   - Identifies weak topics and surfaces spaced-revision recommendations.
   - One-click JSON progress backup export and import.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18.x or 20.x or 22.x
- npm 9+

### Installation
```bash
git clone https://github.com/your-username/ml-mastery-lab.git
cd ml-mastery-lab
npm install
```

### Running Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Running Verification Tests
```bash
npm test
```

### Production Build
```bash
npm run build
npm start
```

---

## 📁 Project Architecture

```
ml_learning_platform/
├── public/                 # Static assets & sample datasets
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── page.tsx        # Learning Dashboard
│   │   ├── curriculum/     # Syllabus & 20-section lessons
│   │   ├── playground/     # Interactive ML algorithm visualizers
│   │   ├── code-lab/       # Python Monaco Editor & Pyodide
│   │   ├── formulas/       # KaTeX formula reference
│   │   ├── quizzes/        # Diagnostic assessments
│   │   ├── projects/       # Real-world project lab
│   │   ├── notes/          # Bookmarks & study notes
│   │   ├── analytics/      # Mastery radar & streak analytics
│   │   └── settings/       # Theme, backup JSON, optional keys
│   ├── components/         # Reusable React components
│   │   ├── code/           # CodeRunner & Monaco wrapper
│   │   ├── layout/         # Navbar, Sidebar, SearchModal, AppShell
│   │   ├── lessons/        # 20-Section LessonView
│   │   ├── math/           # KaTeX MathBlock & MathInline
│   │   └── visualizers/    # 60fps interactive SVG visualizers
│   ├── data/               # Structured curriculum data & formulas
│   ├── lib/                # Storage engine, Pyodide bridge, types
│   └── styles/             # Global CSS & Tailwind configuration
└── tests/                  # Automated verification test suite
```

---

## 📜 License
MIT License. Built for rigorous machine learning education.
