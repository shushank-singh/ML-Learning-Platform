import { ModuleData, LessonContent } from '@/lib/types';

// =========================================================================
// MODULE 1: MLOps Fundamentals (p10-m1)
// =========================================================================
export const p10m1Data: ModuleData = {
  id: 'p10-m1',
  number: 1,
  title: 'MLOps Fundamentals',
  subtitle: 'From Experimental Code to Reproducible, Observable Production Systems',
  description:
    'Deconstruct the paradigm shift from exploratory machine learning notebooks to resilient production engineering. Master the complete ML lifecycle: data lineage, training reproducibility, automated validation gates, containerized serving, and telemetry feedback loops.',
  icon: 'RefreshCw',
  badge: 'Phase 10 · MLOps',
  estimatedHours: 3,
  topicsCount: 1,
  lessons: [
    {
      id: 'mlops-01-fundamentals',
      moduleId: 'p10-m1',
      title: 'MLOps-01: MLOps Fundamentals & Lifecycle',
      description:
        'Contrast traditional software engineering (DevOps) with ML systems, examine the ML lifecycle feedback loop, and formalize technical debt in ML codebases.',
      order: 1,
      readTimeMinutes: 35,
      visualizerType: 'mlops-lifecycle-explorer',
      difficulty: 'Beginner',
    },
  ],
};

// =========================================================================
// MODULE 2: Experiment Tracking (p10-m2)
// =========================================================================
export const p10m2Data: ModuleData = {
  id: 'p10-m2',
  number: 2,
  title: 'Experiment Tracking',
  subtitle: 'Runs, Parameters, Metrics, Artifacts & Multi-Trial Attribution',
  description:
    'Systematically log and compare model experiments. Master parameters, metrics, confusion matrices, and serialized model artifacts using clean abstractions and MLflow paradigms.',
  icon: 'Sliders',
  badge: 'Phase 10 · MLOps',
  estimatedHours: 3,
  topicsCount: 1,
  lessons: [
    {
      id: 'mlops-02-experiment-tracking',
      moduleId: 'p10-m2',
      title: 'MLOps-02: Experiment Tracking & Run Attribution',
      description:
        'Organize runs into experiments, log hyperparameter sweeps, visualize validation loss curves, and implement lightweight file-based and MLflow tracking.',
      order: 1,
      readTimeMinutes: 34,
      visualizerType: 'mlops-experiment-comparison-explorer',
      difficulty: 'Intermediate',
    },
  ],
};

// =========================================================================
// MODULE 3: Data and Model Versioning (p10-m3)
// =========================================================================
export const p10m3Data: ModuleData = {
  id: 'p10-m3',
  number: 3,
  title: 'Data & Model Versioning',
  subtitle: 'Dataset Immutability, Cryptographic Lineage, DVC & Artifact Storage',
  description:
    'Establish immutable data and model versioning. Understand why Git fails for gigabyte-scale datasets and models, master DVC content-addressable storage, and prevent data leakage across train/validation splits.',
  icon: 'Database',
  badge: 'Phase 10 · MLOps',
  estimatedHours: 3,
  topicsCount: 1,
  lessons: [
    {
      id: 'mlops-03-data-model-versioning',
      moduleId: 'p10-m3',
      title: 'MLOps-03: Data & Model Versioning (DVC & Git)',
      description:
        'Content-addressable storage, SHA-256 manifest pointers, dataset immutability, data leakage mitigation, and reproducible data pipelines.',
      order: 1,
      readTimeMinutes: 36,
      visualizerType: 'mlops-lifecycle-explorer',
      difficulty: 'Intermediate',
    },
  ],
};

// =========================================================================
// LESSON CONTENTS (Modules 1 - 3)
// =========================================================================
export const mlopsModule1Lessons: Record<string, LessonContent> = {
  'mlops-01-fundamentals': {
    id: 'mlops-01-fundamentals',
    moduleId: 'p10-m1',
    title: 'MLOps-01: MLOps Fundamentals & Lifecycle',
    subtitle: 'From Experimental Jupyter Notebooks to Reliable Production AI Services',
    order: 1,
    readTimeMinutes: 35,
    difficulty: 'Beginner',
    visualizerType: 'mlops-lifecycle-explorer',

    objectives: [
      'Define MLOps and understand why 85% of machine learning models fail to reach or sustain production',
      'Distinguish traditional software engineering (DevOps) from machine learning operations (MLOps)',
      'Trace the complete closed-loop ML lifecycle: data collection, preprocessing, training, validation, packaging, serving, and continuous monitoring',
      'Identify the hidden technical debt in machine learning systems (glue code, pipeline jungles, and dead experimental branches)',
      'Construct a mental model of reproducible ML environments and automated retraining triggers',
    ],

    prerequisites: [
      'Foundational machine learning concepts: training, loss functions, validation sets, and metrics (Phase 3 & 4)',
      'Basic familiarity with Python scripts and command-line execution',
    ],
    previousLesson: {
      id: 'agent-15-capstone',
      title: 'Agent-15: Autonomous Agent Capstone',
      moduleId: 'p9-m15',
    },

    analogy: {
      title: 'The Home Cook vs The Industrial Food Manufacturing Plant',
      text: 'Training a model in a local Jupyter notebook is like a talented chef cooking a single gourmet dinner in their home kitchen. The chef tastes as they go, adjusts salt by feeling, and plates a delicious dish. But if that dish must be reproduced 500,000 times a day across 12 countries with identical nutrition, zero food poisoning, strict refrigeration logs, automated ingredient supply chains, and instant recall capability when an ingredient spoils, home cooking is useless. You need industrial food science: automated temperature sensors, sterile packaging lines, batch tracking numbers, and rigorous quality control gates. MLOps is the industrial manufacturing plant for machine learning algorithms.',
      metaphor: 'Data science writes the recipe; MLOps engineers the automated, sterile factory that produces it at scale reliably.',
    },

    problemSolved: {
      title: 'Why Standard Software Engineering Fails for Machine Learning',
      description:
        'In traditional software, code is deterministic: if unit tests pass and code is compiled, behavior is predictable. In machine learning systems, behavior depends on three dynamic pillars: Code + Data + Model Weights. Code can remain 100% unchanged while the model degrades silently because incoming real-world customer data shifts over time.',
      keyPoints: [
        'Tripartite Dependency: System behavior is an emergent property of Code, Data, and Hyperparameters—not code alone',
        'Silent Failures: Traditional software throws HTTP 500 exceptions when broken; degraded ML models fail silently by returning confident, incorrect predictions',
        'Data Drift & Aging: A model trained on 2024 consumer transactions becomes progressively inaccurate in 2026 without any code errors',
        'Feedback Loops: Production predictions alter customer behavior, mutating future training data in unexpected feedback loops',
      ],
    },

    intuition: {
      overview:
        'MLOps formalizes a closed cybernetic loop where production telemetry continuously feeds back into data ingestion, validation, and automated retraining pipelines.',
      steps: [
        {
          step: 1,
          title: 'Data Lineage & Preprocessing',
          description:
            'Ingest raw data, validate schemas, detect missing features, and generate cryptographically hashed dataset splits (train, validation, test).',
        },
        {
          step: 2,
          title: 'Reproducible Training & Evaluation',
          description:
            'Execute deterministic training with fixed random seeds. Log parameters, loss curves, and artifact weights to an experiment tracker.',
        },
        {
          step: 3,
          title: 'Quality Gate & Packaging',
          description:
            'Assert candidate model metrics (accuracy, latency, fairness) exceed the current production champion. Package weights into a containerized microservice.',
        },
        {
          step: 4,
          title: 'Canary Serving & Telemetry Monitoring',
          description:
            'Deploy endpoints with progressive traffic splitting. Stream prediction latency, error rates, and feature distribution drift metrics to alerting dashboards.',
        },
      ],
    },

    mathematics: {
      overview:
        'The machine learning lifecycle can be formalized as finding and maintaining an empirical risk minimizer theta under non-stationary joint probability distributions P(X, Y).',
      foundations: [
        {
          name: 'Empirical Risk Minimization (ERM)',
          latex: '\\theta^* = \\arg\\min_{\\theta \\in \\Theta} \\frac{1}{N} \\sum_{i=1}^N \\mathcal{L}\\big(f_\\theta(x_i), y_i\\big) + \\lambda \\Omega(\\theta)',
          explanation:
            'Parameters theta are optimized on training dataset D_train drawn from distribution P_train(X, Y). Loss L measures prediction discrepancy, and Omega regularizes model complexity.',
        },
        {
          name: 'Distribution Shift Generalization Bound',
          latex: '\\mathcal{R}_{P_{\\text{prod}}}(\\theta) \\le \\mathcal{R}_{P_{\\text{train}}}(\\theta) + \\frac{1}{2} d_{\\mathcal{H}\\Delta\\mathcal{H}}(P_{\\text{train}}^X, P_{\\text{prod}}^X) + \\epsilon',
          explanation:
            'Production test risk is bounded by training risk plus the divergence distance between training feature distribution and live production feature distribution.',
        },
      ],
    },

    derivation: {
      title: 'Derivation of Production Risk Degradation Under Distribution Shift',
      objective: 'Demonstrate mathematically why model accuracy decays over time without continuous retraining.',
      steps: [
        {
          step: 1,
          label: 'True Risk Expectation',
          latex: 'R(f) = \\mathbb{E}_{(X,Y) \\sim P(X,Y)} [\\mathbb{I}(f(X) \\ne Y)]',
          explanation: 'The true error rate of hypothesis f is the expected misclassification probability under joint distribution P(X, Y).',
        },
        {
          step: 2,
          label: 'Joint Distribution Decomposition',
          latex: 'P(X, Y) = P(Y \\mid X) \\cdot P(X)',
          explanation: 'The data generating distribution factorizes into the conditional concept P(Y|X) and the marginal feature distribution P(X).',
        },
        {
          step: 3,
          label: 'Time-Dependent Risk Divergence',
          latex: '\\Delta R(t) = \\int |P_t(X) - P_0(X)| \\cdot P(Y \\mid X) \\, dX',
          explanation: 'As time t advances, covariate shift |P_t(X) - P_0(X)| widens, directly inflating the expected error rate delta R(t) unless parameters are updated.',
        },
      ],
    },

    variables: [
      { symbol: '\\theta', name: 'Model Parameters', description: 'Weights and biases of the trained estimator' },
      { symbol: 'P_{\\text{train}}(X)', name: 'Training Distribution', description: 'Marginal probability density of features in training dataset' },
      { symbol: 'P_{\\text{prod}}(X)', name: 'Production Distribution', description: 'Live feature distribution observed at prediction endpoints' },
      { symbol: 'd_{\\mathcal{H}\\Delta\\mathcal{H}}', name: 'Discrepancy Distance', description: 'Measure of statistical distance between feature domains' },
    ],

    numericalExample: {
      scenario: 'Comparing operational downtime and silent failure cost between manual ML scripts vs automated MLOps pipeline',
      dataset: [
        { system: 'Manual Notebook Workflow', deploymentDays: 14, silentErrorHours: 120, rollbackMinutes: 360 },
        { system: 'Automated MLOps Pipeline', deploymentDays: 0.2, silentErrorHours: 0.5, rollbackMinutes: 1 },
      ],
      calculations: [
        { step: 'Deployment Speedup Ratio', math: '14 \\text{ days} / 0.2 \\text{ days}', result: '70x faster deployment cycle' },
        { step: 'MTTD (Mean Time to Detect Degradation)', math: '120 \\text{ hrs} \\to 0.5 \\text{ hrs}', result: '99.6% reduction in silent model failure exposure' },
      ],
      finalConclusion: 'Automated validation gates and drift alerts reduce critical time-to-detect from 5 days to 30 minutes.',
    },

    visualExplanation: {
      title: 'The Closed-Loop MLOps Architecture',
      description:
        'A comprehensive visualization of data, training, validation, registry, and telemetry stages interconnected by automated triggers.',
      features: [
        'Versioned Storage: Git holds application code; DVC/S3 holds datasets; Registry holds model binaries',
        'CI/CD Gate: Blocks deployment if accuracy drops or if P95 inference latency exceeds 40ms SLA',
        'Progressive Delivery: Canary release splits 10% traffic to candidate model while monitoring errors',
        'Feedback Loop: Production telemetry alerts automatically re-trigger data ingestion and training',
      ],
    },

    scratchCode: {
      title: 'Minimal MLOps Lifecycle Pipeline in Pure Python',
      code: `import hashlib
import json
import time

class SimpleMLOpsLifecycle:
    def __init__(self, data_path: str, model_version: str):
        self.data_path = data_path
        self.model_version = model_version
        self.registry = {}

    def step_1_data_versioning(self, raw_data: str) -> str:
        # Cryptographic hash to guarantee data immutability
        data_hash = hashlib.sha256(raw_data.encode()).hexdigest()[:12]
        print(f"[Stage 1 - Data] Ingested dataset hash: sha256:{data_hash}")
        return data_hash

    def step_2_train_and_validate(self, data_hash: str) -> dict:
        print("[Stage 2 - Train] Fitting model with fixed random seed 42...")
        # Simulated metrics
        metrics = {"val_accuracy": 0.942, "p95_latency_ms": 18.5}
        print(f"[Stage 2 - Eval] Metrics logged: Acc={metrics['val_accuracy']}, P95={metrics['p95_latency_ms']}ms")
        return metrics

    def step_3_quality_gate(self, metrics: dict, min_acc=0.90, max_latency_ms=30.0) -> bool:
        passes_gate = metrics["val_accuracy"] >= min_acc and metrics["p95_latency_ms"] <= max_latency_ms
        status = "PASSED" if passes_gate else "FAILED"
        print(f"[Stage 3 - Gate] Quality Gate Status: {status}")
        return passes_gate

    def step_4_register_model(self, data_hash: str, metrics: dict):
        manifest = {
            "version": self.model_version,
            "data_hash": data_hash,
            "metrics": metrics,
            "timestamp": time.time(),
            "status": "STAGING"
        }
        self.registry[self.model_version] = manifest
        print(f"[Stage 4 - Registry] Model {self.model_version} published to Staging tier.")
        return manifest

# Execute minimal lifecycle
lifecycle = SimpleMLOpsLifecycle("data/customers.csv", "v1.0.0")
d_hash = lifecycle.step_1_data_versioning("id,age,income\\n1,25,50000\\n2,42,85000")
metrics = lifecycle.step_2_train_and_validate(d_hash)
if lifecycle.step_3_quality_gate(metrics):
    manifest = lifecycle.step_4_register_model(d_hash, metrics)
    print("Manifest:", json.dumps(manifest, indent=2))`,
      explanation:
        'This standalone Python script models the four foundational stages of MLOps without external heavy infrastructure: data fingerprinting, deterministic training, automated quality thresholds, and model registration.',
    },

    sklearnCode: {
      title: 'Scikit-learn Pipeline with Persistent Metadata Manifest',
      code: `import json
import numpy as np
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.metrics import f1_score

# 1. Deterministic Data Split
X, y = make_classification(n_samples=1000, n_features=5, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 2. Scikit-learn Pipeline (Prevents Data Leakage)
pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('classifier', LogisticRegression(random_state=42))
])

# 3. Fit pipeline strictly on training data
pipeline.fit(X_train, y_train)

# 4. Evaluate on uncorrupted test set
y_pred = pipeline.predict(X_test)
test_f1 = float(f1_score(y_test, y_pred))

# 5. Export Reproducibility Manifest
manifest = {
    "model_name": "churn_classifier",
    "version": "1.0.0",
    "pipeline_steps": [name for name, _ in pipeline.steps],
    "hyperparameters": {"C": 1.0, "random_state": 42},
    "metrics": {"test_f1": round(test_f1, 4)},
    "data_shape": list(X_train.shape)
}

print(json.dumps(manifest, indent=2))`,
      explanation:
        'Demonstrates an atomic Scikit-Learn pipeline bundling scaling and classification together to eliminate training-serving skew, alongside metadata manifest generation.',
    },

    runnableCode: {
      code: `def simulate_lifecycle():
    log = []
    log.append("1. Ingesting raw sensor data -> SHA-256 fingerprint verified.")
    log.append("2. Running automated schema check: 0 nulls detected in required fields.")
    log.append("3. Training LightGBM candidate model with seed=42.")
    log.append("4. Evaluating Quality Gate: Candidate F1=0.924 vs Baseline Champion F1=0.891 (+3.3%).")
    log.append("5. Packaging container image: ml-churn:v1.2.0.")
    log.append("6. Routing 10% canary traffic: Zero HTTP 5xx errors recorded over 1,000 requests.")
    log.append("7. Full promotion authorized. Automated MLOps lifecycle completed.")
    return "\\n".join(log)

print(simulate_lifecycle())`,
      expectedOutput: `1. Ingesting raw sensor data -> SHA-256 fingerprint verified.
2. Running automated schema check: 0 nulls detected in required fields.
3. Training LightGBM candidate model with seed=42.
4. Evaluating Quality Gate: Candidate F1=0.924 vs Baseline Champion F1=0.891 (+3.3%).
5. Packaging container image: ml-churn:v1.2.0.
6. Routing 10% canary traffic: Zero HTTP 5xx errors recorded over 1,000 requests.
7. Full promotion authorized. Automated MLOps lifecycle completed.`,
    },

    lineByLineExplanation: [
      { lines: '1-3', codeSnippet: 'def simulate_lifecycle(): ... SHA-256 fingerprint verified.', explanation: 'Validates raw input data integrity before compute resources are allocated.' },
      { lines: '4-5', codeSnippet: 'Evaluating Quality Gate: Candidate F1=0.924 vs Baseline Champion...', explanation: 'Compares candidate against champion in a deterministic quality assertion.' },
      { lines: '6-7', codeSnippet: 'Routing 10% canary traffic: Zero HTTP 5xx errors...', explanation: 'Validates live endpoint stability before cutting over 100% of user traffic.' },
    ],

    hyperparameters: [
      { name: 'random_seed', defaultVal: '42', range: 'Any integer', effect: 'Controls pseudorandom initialization', recommendation: 'Pin globally across NumPy, PyTorch, and Scikit-learn.' },
      { name: 'quality_gate_f1_delta', defaultVal: '+0.01', range: '-0.05 to +0.05', effect: 'Minimum required accuracy gain over champion', recommendation: 'Set >= 0.0 to prevent releasing regressed models.' },
      { name: 'canary_traffic_percent', defaultVal: '10%', range: '1% - 50%', effect: 'Fraction of live traffic routed to candidate', recommendation: 'Keep at 5-10% for initial 1-hour verification period.' },
    ],

    assumptions: [
      { assumption: 'Data Immutability', whyItMatters: 'If raw datasets are overwritten, historical models cannot be reproduced or audited', howToVerify: 'Store datasets in write-once-read-many (WORM) object storage with content hashing.' },
      { assumption: 'Train-Serving Transform Parity', whyItMatters: 'Applying different imputation or normalization in serving vs training produces corrupted predictions', howToVerify: 'Serialize the preprocessing pipeline inside the model artifact container.' },
    ],

    commonMistakes: [
      {
        mistake: 'Training models directly in non-versioned interactive notebooks without exported scripts',
        solution: 'Refactor exploratory notebooks into modular Python pipelines tracked in version control.',
        whyWrong: 'Cells executed out of order yield state that can never be reproduced by another engineer.',
        howToFix: 'Adopt a standard repo layout (src/data, src/models, src/pipelines) and run via CLI entrypoints.',
      },
      {
        mistake: 'Relying exclusively on standard software tests (unit tests) without ML quality gates',
        solution: 'Implement automated metric threshold assertions and latency checks in the CI/CD pipeline.',
        whyWrong: 'Code syntax can be 100% bug-free while the model predicts garbage due to bad training data.',
        howToFix: 'Create a dedicated evaluation stage asserting F1, ROC-AUC, and P95 latency before container build.',
      },
    ],

    realWorldUseCases: [
      { industry: 'FinTech', application: 'Credit Card Fraud Detection', benefit: 'Retrains daily on millions of transactions to combat evolving fraudster techniques.' },
      { industry: 'E-Commerce', application: 'Personalized Recommendation Engine', benefit: 'Deploys hourly model weight updates with automated canary traffic shifting.' },
      { industry: 'Healthcare', application: 'Diagnostic Imaging Triage', benefit: 'Maintains strict cryptographic audit trails of data, code, and weights for FDA compliance.' },
    ],

    practiceQuestions: [
      {
        id: 'pq-1',
        question: 'Why does standard DevOps continuous integration fail to ensure that a machine learning system works properly?',
        hint: 'Think about what determines ML system behavior beyond code.',
        answer: 'Standard DevOps only validates code syntax and deterministic logic. ML systems depend on Code, Data, and Model Weights. A code pipeline can pass all unit tests while the trained model fails completely due to corrupted training data or distribution drift.',
        explanation: 'MLOps requires testing data quality, model accuracy, and feature drift in addition to software code.',
      },
      {
        id: 'pq-2',
        question: 'What is the role of a model registry in the MLOps lifecycle?',
        hint: 'Consider how versioned artifacts are managed and promoted.',
        answer: 'A model registry serves as a centralized repository storing versioned model binaries, metadata manifests, input/output schemas, and stage transitions (Development -> Staging -> Production -> Archived).',
        explanation: 'The registry decouples model training from model deployment, enabling clean rollback and governance.',
      },
      {
        id: 'pq-3',
        question: 'What is canary deployment, and why is it preferred over immediate 100% cutover for ML models?',
        hint: 'What happens if a new model has unexpected edge-case errors?',
        answer: 'Canary deployment routes a small percentage (e.g. 5-10%) of live production traffic to the new candidate model while the remaining 90% stays on the stable champion. If errors, latency spikes, or invalid outputs occur, only a fraction of users are affected and traffic can be rolled back instantly.',
        explanation: 'Canary deployments minimize blast radius during release management.',
      },
    ],

    quiz: [
      {
        id: 'qz-1',
        question: 'Which of the following best defines the primary objective of MLOps?',
        options: [
          'Training the largest possible transformer model on thousands of GPUs',
          'Automating and standardizing the transition of ML models from experiments to reliable, observable production systems',
          'Replacing all machine learning algorithms with standard deterministic SQL queries',
          'Writing research papers with novel mathematical derivations',
        ],
        correctIndex: 1,
        explanation: 'MLOps focuses on operationalizing ML workflows: reproducibility, automation, testing, deployment, and monitoring in production.',
      },
      {
        id: 'qz-2',
        question: 'In contrast to classical software that crashes visibly with HTTP 500 errors, how do degraded ML models typically fail in production?',
        options: [
          'The server hardware immediately powers down',
          'They fail silently by returning valid HTTP 200 responses containing inaccurate or biased predictions',
          'The database schema is automatically deleted',
          'The network bandwidth drops to zero',
        ],
        correctIndex: 1,
        explanation: 'ML models fail silently: the API endpoint works fine and responds with 200 OK, but the predictions are degraded due to data drift or distribution shift.',
      },
      {
        id: 'qz-3',
        question: 'What is "train-serving skew" in machine learning operations?',
        options: [
          'The difference between training on GPU vs CPU',
          'A discrepancy in preprocessing logic, feature definitions, or data distributions between training and live production serving',
          'The difference in salary between data scientists and software engineers',
          'Running a model in a different timezone than the training cluster',
        ],
        correctIndex: 1,
        explanation: 'Train-serving skew happens when features are computed or normalized differently at inference time than during offline training.',
      },
    ],

    independentExercise: {
      id: 'ex-01-mlops-lifecycle',
      title: 'Build a Deterministic Quality Gate Function',
      problem: 'Write a Python function `evaluate_quality_gate(candidate_metrics, champion_metrics, max_allowed_latency_ms)` that returns a dictionary `{"approved": bool, "reason": str}`. The candidate is approved ONLY if its F1 score is >= champion F1 AND its P95 latency is <= max_allowed_latency_ms.',
      hints: [
        'Check candidate_metrics["f1"] >= champion_metrics["f1"]',
        'Check candidate_metrics["p95_latency_ms"] <= max_allowed_latency_ms',
        'Include clear rejection reasons if any condition fails',
      ],
      starterCode: `def evaluate_quality_gate(candidate: dict, champion: dict, max_latency_ms: float) -> dict:
    # TODO: Implement automated assertion gate
    pass

# Test
c_cand = {"f1": 0.932, "p95_latency_ms": 22.0}
c_champ = {"f1": 0.910, "p95_latency_ms": 25.0}
print(evaluate_quality_gate(c_cand, c_champ, max_latency_ms=30.0))`,
      solution: `def evaluate_quality_gate(candidate: dict, champion: dict, max_latency_ms: float) -> dict:
    if candidate["f1"] < champion["f1"]:
        return {
            "approved": False,
            "reason": f"F1 regression: candidate ({candidate['f1']}) < champion ({champion['f1']})"
        }
    if candidate["p95_latency_ms"] > max_latency_ms:
        return {
            "approved": False,
            "reason": f"Latency SLA breach: {candidate['p95_latency_ms']}ms > max {max_latency_ms}ms"
        }
    return {
        "approved": True,
        "reason": f"Quality gate passed: F1 gain of +{(candidate['f1'] - champion['f1']) * 100:.1f}%, latency within budget."
    }

c_cand = {"f1": 0.932, "p95_latency_ms": 22.0}
c_champ = {"f1": 0.910, "p95_latency_ms": 25.0}
print(evaluate_quality_gate(c_cand, c_champ, max_latency_ms=30.0))`,
    },

    summary: {
      keyTakeaways: [
        'MLOps bridges the divide between exploratory data science and 24/7 high-reliability production software.',
        'Production ML behavior is governed by Code + Data + Weights; changing any of the three alters system output.',
        'Silent failure is the dominant risk in ML; comprehensive drift monitoring and quality gates are required to catch it.',
        'Standardizing data lineage, experiment tracking, and containerized deployments ensures auditability and rapid rollback.',
      ],
      nextLessonId: 'mlops-02-experiment-tracking',
    },
  },

  'mlops-02-experiment-tracking': {
    id: 'mlops-02-experiment-tracking',
    moduleId: 'p10-m2',
    title: 'MLOps-02: Experiment Tracking & Run Attribution',
    subtitle: 'Parameters, Metrics, Artifacts & Multi-Trial Comparison',
    order: 1,
    readTimeMinutes: 34,
    difficulty: 'Intermediate',
    visualizerType: 'mlops-experiment-comparison-explorer',

    objectives: [
      'Define the core entities of experiment tracking: Experiments, Runs, Parameters, Metrics, and Artifacts',
      'Understand how uncontrolled hyperparameter tuning without tracking leads to lost model configurations and irreproducible results',
      'Compare runs across multiple metrics: validation loss, F1-score, inference latency, and model size',
      'Implement a lightweight local experiment tracker in Python using JSON and SQLite',
      'Explain the architectural design of MLflow and Weights & Biases for collaborative team experimentation',
    ],

    prerequisites: [
      'Understanding of hyperparameters (learning rate, batch size, regularization) and evaluation metrics (Phase 3 & 5)',
      'Basic knowledge of Python file I/O or dictionaries',
    ],
    previousLesson: {
      id: 'mlops-01-fundamentals',
      title: 'MLOps-01: MLOps Fundamentals & Lifecycle',
      moduleId: 'p10-m1',
    },

    analogy: {
      title: 'The Pharmaceutical Clinical Trial Ledger vs Scattered Post-it Notes',
      text: 'Imagine a medical laboratory developing a new medication. If researchers jot down chemical dosages on random paper napkins, change solvent concentrations without logging room temperature, and forget which test tube produced the promising blood pressure reduction, the FDA will immediately shut down the lab and the drug can never be approved. Medical science requires an immutable clinical ledger: every trial has a unique ID, exact milligrams of each compound, patient cohort parameters, hourly vital signs, and stored blood sample barcodes. Experiment tracking is that rigorous clinical trial ledger for machine learning algorithms.',
      metaphor: 'An experiment tracker is the immutable laboratory ledger that turns ad-hoc tweaking into reproducible scientific progress.',
    },

    problemSolved: {
      title: 'The "Which Model Checkpoint Generated This Metric?" Crisis',
      description:
        'Data scientists frequently train dozens of model variants over weeks of exploration. Without automated experiment tracking, engineers overwrite weight files (e.g. `model_final_v2_really_final.pkl`), lose the exact learning rate or feature subset that achieved peak accuracy, and cannot reproduce results when audited.',
      keyPoints: [
        'Hyperparameter Attribution: Direct mapping linking exact hyperparameters (learning rate, depth, l2 penalty) to observed metrics',
        'Metric History & Curves: Step-by-step recording of training and validation loss per epoch to diagnose overfitting or exploding gradients',
        'Artifact Persistence: Associating serialized model weights, confusion matrix plots, and feature importance tables with specific runs',
        'Collaborative Benchmarking: Unified team dashboard allowing engineers to filter and rank runs by custom multi-objective criteria',
      ],
    },

    intuition: {
      overview:
        'Experiment tracking groups related modeling efforts into hierarchical containers: An Experiment contains multiple Runs, and each Run logs Parameters (static inputs), Metrics (dynamic outputs over steps), and Artifacts (generated files).',
      steps: [
        {
          step: 1,
          title: 'Initialize Run Context',
          description:
            'Start an active run under a named experiment. Capture environmental metadata (git commit hash, timestamp, user, hardware specs).',
        },
        {
          step: 2,
          title: 'Log Static Parameters',
          description:
            'Record all inputs that remain fixed throughout the run: learning rate, batch size, optimizer type, dataset hash, and model architecture.',
        },
        {
          step: 3,
          title: 'Log Time-Series Metrics',
          description:
            'During training loops, log scalar values at each step/epoch: training loss, validation loss, accuracy, and GPU memory usage.',
        },
        {
          step: 4,
          title: 'Store Artifacts & Finalize',
          description:
            'Persist final weights, confusion matrix figures, and classification reports. Tag the run and designate champion status if benchmarks are beaten.',
        },
      ],
    },

    mathematics: {
      overview:
        'Hyperparameter optimization and run comparison can be formalized as mapping a parameter configuration space Theta to a multi-objective performance vector M.',
      foundations: [
        {
          name: 'Multi-Objective Evaluation Mapping',
          latex: 'M(\\boldsymbol{\\theta}) = \\big[ \\mathcal{L}_{\\text{val}}(\\boldsymbol{\\theta}), \\; 1 - \\text{F1}(\\boldsymbol{\\theta}), \\; \\text{Latency}(\\boldsymbol{\\theta}), \\; \\text{Size}(\\boldsymbol{\\theta}) \\big]^T',
          explanation:
            'Each run evaluated at parameter vector theta produces a multi-dimensional metric vector M(theta) balancing predictive quality against engineering constraints.',
        },
        {
          name: 'Pareto Frontier Dominance',
          latex: '\\boldsymbol{\\theta}_A \\succ \\boldsymbol{\\theta}_B \\iff \\forall i \\; M_i(\\boldsymbol{\\theta}_A) \\le M_i(\\boldsymbol{\\theta}_B) \\;\\land\\; \\exists j \\; M_j(\\boldsymbol{\\theta}_A) < M_j(\\boldsymbol{\\theta}_B)',
          explanation:
            'Run A Pareto-dominates Run B if it is at least as good in all metrics and strictly superior in at least one (e.g. higher F1 and lower latency).',
        },
      ],
    },

    derivation: {
      title: 'Derivation of Pareto Optimal Model Selection Under Latency Budget',
      objective: 'Show how multi-objective tracking selects the optimal run satisfying production SLA.',
      steps: [
        {
          step: 1,
          label: 'Constrained Optimization Formulation',
          latex: '\\boldsymbol{\\theta}^* = \\arg\\max_{\\boldsymbol{\\theta} \\in \\Theta} \\text{F1}(\\boldsymbol{\\theta}) \\quad \\text{subject to} \\quad \\text{Latency}(\\boldsymbol{\\theta}) \\le L_{\\max}',
          explanation: 'The production objective maximizes predictive utility F1 while strictly enforcing inference latency SLA L_max.',
        },
        {
          step: 2,
          label: 'Attribution Matrix Filter',
          latex: '\\mathcal{S} = \\{ r \\in \\text{Runs} \\mid r.\\text{latency} \\le 30\\text{ms} \\}',
          explanation: 'The experiment tracker filters the global run database down to the feasible set S respecting the engineering constraints.',
        },
        {
          step: 3,
          label: 'Optimal Run Selection',
          latex: 'r^* = \\arg\\max_{r \\in \\mathcal{S}} r.\\text{f1\\_score}',
          explanation: 'Among all feasible candidate runs satisfying the latency constraint, the model with maximal F1 is promoted.',
        },
      ],
    },

    variables: [
      { symbol: '\\boldsymbol{\\theta}', name: 'Hyperparameter Vector', description: 'Tuple of input parameters (lr, batch_size, weight_decay)' },
      { symbol: 'M', name: 'Metric Vector', description: 'Observed evaluation metrics across validation splits' },
      { symbol: 'L_{\\max}', name: 'Latency SLA Constraint', description: 'Maximum allowable P95 inference time in milliseconds' },
    ],

    numericalExample: {
      scenario: 'Evaluating three hyperparameter runs to select the best production candidate under a 20ms latency ceiling',
      dataset: [
        { runId: 'run-101', lr: 0.001, batchSize: 32, f1: 0.884, latencyMs: 14.2 },
        { runId: 'run-102', lr: 0.0003, batchSize: 32, f1: 0.938, latencyMs: 14.5 },
        { runId: 'run-103', lr: 0.0001, batchSize: 128, f1: 0.945, latencyMs: 38.0 },
      ],
      calculations: [
        { step: 'Filter by Latency SLA (<= 20ms)', math: '14.2 \\le 20 \\text{ (pass)}, \\; 14.5 \\le 20 \\text{ (pass)}, \\; 38.0 > 20 \\text{ (fail)}', result: 'Run-103 rejected due to SLA breach' },
        { step: 'Compare F1 of Feasible Runs', math: '0.938 \\text{ (run-102)} > 0.884 \\text{ (run-101)}', result: 'Run-102 wins by +5.4% F1 advantage' },
      ],
      finalConclusion: 'Run-102 is crowned champion because it maximizes predictive accuracy while honoring the 20ms production SLA.',
    },

    visualExplanation: {
      title: 'Experiment Tracking Data Hierarchy',
      description:
        'Illustration of how Experiments encapsulate Runs, which store structured Parameters, Metric time-series, and binary Artifacts.',
      features: [
        'Experiment Container: Logical project boundary (e.g. "churn-prediction-v2")',
        'Run Record: Immutable snapshot containing parameters, metrics, environment tags, and commit hash',
        'Metric Curves: Step-wise tracking of training vs validation loss to inspect convergence',
        'Artifact Store: Blob storage (S3/GCS/local) holding model weights and diagnostic plots',
      ],
    },

    scratchCode: {
      title: 'Zero-Dependency Local Experiment Tracker in Pure Python',
      code: `import json
import time
import os
import uuid

class LocalExperimentTracker:
    def __init__(self, experiment_name: str, base_dir="./experiments"):
        self.exp_name = experiment_name
        self.base_dir = os.path.join(base_dir, experiment_name)
        os.makedirs(self.base_dir, exist_ok=True)
        self.current_run = None

    def start_run(self, run_name: str):
        run_id = f"run_{str(uuid.uuid4())[:8]}"
        self.current_run = {
            "run_id": run_id,
            "run_name": run_name,
            "start_time": time.time(),
            "params": {},
            "metrics": {},
            "artifacts": []
        }
        print(f"[Tracker] Started run '{run_name}' (ID: {run_id})")
        return self

    def log_param(self, key: str, value):
        self.current_run["params"][key] = value

    def log_metric(self, key: str, value: float):
        if key not in self.current_run["metrics"]:
            self.current_run["metrics"][key] = []
        self.current_run["metrics"][key].append({"step": len(self.current_run["metrics"][key]) + 1, "value": value})

    def end_run(self):
        self.current_run["end_time"] = time.time()
        filepath = os.path.join(self.base_dir, f"{self.current_run['run_id']}.json")
        with open(filepath, "w") as f:
            json.dump(self.current_run, f, indent=2)
        print(f"[Tracker] Run saved to {filepath}")
        return self.current_run

# Simulation
tracker = LocalExperimentTracker("credit_risk")
tracker.start_run("lr_cosine_decay")
tracker.log_param("learning_rate", 0.0003)
tracker.log_param("batch_size", 64)
tracker.log_param("optimizer", "adamw")

# Simulate 3 epochs
for epoch, loss in enumerate([0.54, 0.32, 0.21], start=1):
    tracker.log_metric("val_loss", loss)

saved_run = tracker.end_run()
print("\\nRun Summary:\\n", json.dumps(saved_run, indent=2))`,
      explanation:
        'A complete, self-contained local experiment tracking engine in pure Python that creates structured JSON run manifests with parameters, stepped metrics, and unique run identifiers.',
    },

    sklearnCode: {
      title: 'MLflow Tracking API Integration Pattern',
      code: `# Conceptual / Standard MLflow Usage Pattern
# pip install mlflow (optional in production environments)
import json

class MockMLflowClient:
    """Demonstrates standard MLflow tracking semantics without external server"""
    def __init__(self):
        self.runs = []

    def log_params(self, params_dict: dict):
        print(f"[mlflow.log_params] Logging: {params_dict}")

    def log_metrics(self, metrics_dict: dict, step: int = None):
        print(f"[mlflow.log_metrics] Step {step}: {metrics_dict}")

    def log_artifact(self, local_path: str):
        print(f"[mlflow.log_artifact] Uploading artifact from {local_path} to artifact store")

# Standard MLflow workflow
mlflow = MockMLflowClient()

# 1. Start experiment context
print("[mlflow.set_experiment] Active: fraud_detection_xgboost")
mlflow.log_params({
    "max_depth": 6,
    "learning_rate": 0.05,
    "n_estimators": 200,
    "subsample": 0.8
})

# 2. Log epoch metrics
mlflow.log_metrics({"train_loss": 0.184, "val_loss": 0.212}, step=1)
mlflow.log_metrics({"train_loss": 0.112, "val_loss": 0.145}, step=2)

# 3. Save and log model artifact
mlflow.log_artifact("models/fraud_xgb.bin")`,
      explanation:
        'Illustrates the industry-standard MLflow API idioms: set_experiment, log_params, log_metrics, and log_artifact for centralized model telemetry.',
    },

    runnableCode: {
      code: `def run_comparison_demo():
    runs = [
        {"id": "r1", "lr": 0.01, "val_loss": 0.42, "f1": 0.81},
        {"id": "r2", "lr": 0.001, "val_loss": 0.24, "f1": 0.91},
        {"id": "r3", "lr": 0.0001, "val_loss": 0.31, "f1": 0.87},
    ]
    
    # Sort runs by highest F1 score
    sorted_runs = sorted(runs, key=lambda x: x["f1"], reverse=True)
    best_run = sorted_runs[0]
    
    return f"Best Run: {best_run['id']} with LR={best_run['lr']}, F1={best_run['f1']}, Val Loss={best_run['val_loss']}"

print(run_comparison_demo())`,
      expectedOutput: 'Best Run: r2 with LR=0.001, F1=0.91, Val Loss=0.24',
    },

    lineByLineExplanation: [
      { lines: '1-6', codeSnippet: 'runs = [ {"id": "r1", ...}, ... ]', explanation: 'Defines an array of logged trial runs containing hyperparameters and metrics.' },
      { lines: '8-9', codeSnippet: 'sorted_runs = sorted(runs, key=lambda x: x["f1"], reverse=True)', explanation: 'Ranks candidate runs by optimization objective (F1 score).' },
      { lines: '11-13', codeSnippet: 'return f"Best Run: {best_run[\'id\']}..."', explanation: 'Identifies the champion trial for staging promotion.' },
    ],

    hyperparameters: [
      { name: 'log_frequency_steps', defaultVal: '10', range: '1 - 1000', effect: 'How often scalar metrics are committed', recommendation: 'Log every 10-50 batches to balance metric granularity against network I/O.' },
      { name: 'artifact_compression', defaultVal: 'gzip', range: 'none, gzip, zstd', effect: 'Compresses weight files before upload', recommendation: 'Use gzip or zstd to reduce network transfer time to cloud buckets.' },
    ],

    assumptions: [
      { assumption: 'Metric Determinism', whyItMatters: 'If metric evaluation uses different random seeds or test data across runs, comparisons are invalid', howToVerify: 'Fix the test evaluation dataset and test split seed across all runs.' },
      { assumption: 'Parameter Immutability', whyItMatters: 'Changing parameters mid-run corrupts attribution analysis', howToVerify: 'Treat parameter dictionary as read-only once training commences.' },
    ],

    commonMistakes: [
      {
        mistake: 'Logging only final epoch metrics without tracking the full loss trajectory',
        solution: 'Log validation metrics at each epoch step.',
        whyWrong: 'You cannot detect whether a model was still learning, plateaued, or severely overfitting.',
        howToFix: 'Call tracker.log_metric("val_loss", loss, step=epoch) in the training loop.',
      },
      {
        mistake: 'Saving model weights to disk without saving the corresponding Git commit hash',
        solution: 'Always log the current git hash as a run tag.',
        whyWrong: 'If code changes after training, you can never reproduce the exact data transformations or model structure.',
        howToFix: 'Use git rev-parse HEAD or an automated tracker that logs code version automatically.',
      },
    ],

    realWorldUseCases: [
      { industry: 'Autonomous Vehicles', application: 'Perception Model Sweeps', benefit: 'Tracks thousands of hyperparameter runs across camera sensor modalities.' },
      { industry: 'Biotechnology', application: 'Protein Folding Optimization', benefit: 'Audits exact random seeds and architectures that generated candidate molecular structures.' },
      { industry: 'AdTech', application: 'Click-Through Rate (CTR) Models', benefit: 'Compares real-time feature ablation runs to determine which user signals improve revenue.' },
    ],

    practiceQuestions: [
      {
        id: 'pq-1',
        question: 'What is the structural difference between a Parameter and a Metric in experiment tracking?',
        hint: 'Consider when they are known and whether they change during execution.',
        answer: 'A Parameter is a static input configuration fixed before the run starts (e.g. learning rate, batch size, model depth). A Metric is a dynamic quantitative output observed and logged during or after execution (e.g. training loss per epoch, validation accuracy).',
        explanation: 'Parameters describe how the model was configured; Metrics measure how well it performed.',
      },
      {
        id: 'pq-2',
        question: 'Why is it critical to log the Git commit hash alongside model artifacts in an experiment tracking run?',
        hint: 'What happens if you need to debug the training script six months later?',
        answer: 'Logging the Git commit hash guarantees exact code reproducibility. If you ever need to inspect data cleaning transforms, debug unexpected predictions, or retrain the model, you can check out the exact historical codebase that produced the weights.',
        explanation: 'Model weights are meaningless without the code that defined their architecture and data pipeline.',
      },
      {
        id: 'pq-3',
        question: 'How does an experiment tracking system support multi-objective model selection?',
        hint: 'Think about trade-offs between accuracy and resource efficiency.',
        answer: 'It records both accuracy metrics (F1, AUC, loss) and operational metrics (P95 latency, model size in MB, memory usage). Engineers can plot Pareto frontiers and filter runs that exceed latency SLAs before picking the highest-accuracy model.',
        explanation: 'Production models must satisfy engineering SLAs, not just leaderboard accuracy.',
      },
    ],

    quiz: [
      {
        id: 'qz-1',
        question: 'In experiment tracking, which entity represents an individual training execution with fixed hyperparameters?',
        options: ['An Experiment', 'A Run', 'An Artifact Store', 'A Model Registry'],
        correctIndex: 1,
        explanation: 'A Run represents an individual trial execution that records specific parameters, metrics, and generated artifacts under an overarching Experiment.',
      },
      {
        id: 'qz-2',
        question: 'Which of the following is considered an Artifact rather than a Parameter or Metric?',
        options: ['learning_rate = 0.001', 'validation_f1_score = 0.92', 'confusion_matrix_plot.png', 'batch_size = 64'],
        correctIndex: 2,
        explanation: 'Files produced during a run (such as confusion matrix images, serialized weights, and schema manifests) are Artifacts.',
      },
      {
        id: 'qz-3',
        question: 'Why is comparing models based solely on test accuracy dangerous in production engineering?',
        options: [
          'High accuracy automatically causes computer hardware failure',
          'A model with 0.5% higher accuracy might have 10x higher inference latency or a 5GB memory footprint that violates production SLAs',
          'Test accuracy is never a real number',
          'Experiment trackers cannot record floating point numbers',
        ],
        correctIndex: 1,
        explanation: 'Production systems must honor real-world constraints such as latency budgets, memory limits, and compute costs alongside accuracy.',
      },
    ],

    independentExercise: {
      id: 'ex-02-experiment-filter',
      title: 'Filter Best Run Satisfying Multi-Objective SLA',
      problem: 'Write a Python function `select_champion_run(runs, max_latency_ms, min_f1)` that filters candidate runs meeting the SLA constraints and returns the run_id of the model with the lowest validation loss. If no runs qualify, return None.',
      hints: [
        'Iterate over runs and check r["latency_ms"] <= max_latency_ms and r["f1"] >= min_f1',
        'Among valid runs, find min(valid, key=lambda x: x["val_loss"])',
      ],
      starterCode: `def select_champion_run(runs: list, max_latency_ms: float, min_f1: float):
    # TODO: Filter and select optimal run
    pass

# Test data
runs_data = [
    {"run_id": "r1", "f1": 0.89, "latency_ms": 15.0, "val_loss": 0.32},
    {"run_id": "r2", "f1": 0.94, "latency_ms": 22.0, "val_loss": 0.18},
    {"run_id": "r3", "f1": 0.95, "latency_ms": 45.0, "val_loss": 0.12},
]
print(select_champion_run(runs_data, max_latency_ms=30.0, min_f1=0.90))`,
      solution: `def select_champion_run(runs: list, max_latency_ms: float, min_f1: float):
    valid = [r for r in runs if r["latency_ms"] <= max_latency_ms and r["f1"] >= min_f1]
    if not valid:
        return None
    best = min(valid, key=lambda x: x["val_loss"])
    return best["run_id"]

runs_data = [
    {"run_id": "r1", "f1": 0.89, "latency_ms": 15.0, "val_loss": 0.32},
    {"run_id": "r2", "f1": 0.94, "latency_ms": 22.0, "val_loss": 0.18},
    {"run_id": "r3", "f1": 0.95, "latency_ms": 45.0, "val_loss": 0.12},
]
print(select_champion_run(runs_data, max_latency_ms=30.0, min_f1=0.90))`,
    },

    summary: {
      keyTakeaways: [
        'Experiment tracking transforms subjective model tweaking into structured, reproducible science.',
        'Runs record static Parameters, dynamic step-wise Metrics, and binary output Artifacts.',
        'Logging git commit hashes and dataset versions guarantees that any historical checkpoint can be reproduced.',
        'Multi-objective evaluation balances predictive accuracy against latency and memory footprint SLAs.',
      ],
      nextLessonId: 'mlops-03-data-model-versioning',
    },
  },

  'mlops-03-data-model-versioning': {
    id: 'mlops-03-data-model-versioning',
    moduleId: 'p10-m3',
    title: 'MLOps-03: Data & Model Versioning (DVC & Git)',
    subtitle: 'Dataset Immutability, Cryptographic Lineage & Data Version Control',
    order: 1,
    readTimeMinutes: 36,
    difficulty: 'Intermediate',
    visualizerType: 'mlops-lifecycle-explorer',

    objectives: [
      'Understand why Git is fundamentally unsuited for large binary dataset and model weight versioning',
      'Explain the architecture of Data Version Control (DVC) and content-addressable storage (CAS)',
      'Construct cryptographic manifests linking code commits to immutable dataset and model hashes',
      'Identify and eliminate data leakage between training, validation, and test splits',
      'Implement a reproducible dataset split generator with SHA-256 integrity verification',
    ],

    prerequisites: [
      'Basic understanding of Git (commits, branches, pointers) and file hashing',
      'Familiarity with dataset splits (train/val/test) and feature scaling',
    ],
    previousLesson: {
      id: 'mlops-02-experiment-tracking',
      title: 'MLOps-02: Experiment Tracking & Run Attribution',
      moduleId: 'p10-m2',
    },

    analogy: {
      title: 'The Museum Artifact Archive vs The Exhibition Catalog',
      text: 'If a national museum attempted to store a 10-ton dinosaur fossil, 5,000 marble sculptures, and 200 ancient Roman chariots directly inside the pages of its printed paper catalog, the catalog would collapse under its own weight and could never be emailed or printed. Instead, the museum prints a lightweight paper catalog containing small barcode numbers and photographs (Git). The actual 10-ton dinosaur fossil is stored securely in an external climate-controlled warehouse (S3 / Blob Storage) under barcode #SHA256-4A9B. DVC acts as the museum archivist: it puts small pointer files in Git while storing large binary assets in remote object storage.',
      metaphor: 'Git tracks the lightweight barcodes; DVC and cloud storage house the multi-gigabyte fossils.',
    },

    problemSolved: {
      title: 'The Large-File Git Bloat & The "Which Dataset Was This Trained On?" Dilemma',
      description:
        'Committing 10GB datasets or multi-gigabyte PyTorch checkpoints to Git causes repositories to bloat, cloning to time out, and diffs to fail. Conversely, storing data in unversioned shared folders leads to silent dataset mutations, undocumented row deletions, and unrepeatable experiments.',
      keyPoints: [
        'Content-Addressable Storage (CAS): Files are indexed by the SHA-256 hash of their contents, guaranteeing immutability',
        'Pointer Files (.dvc): Small human-readable text files committed to Git containing hash pointers and file sizes',
        'Elimination of Data Leakage: Explicitly tracking and locking train/test splits prevents contamination from future data',
        'Zero-Duplication Caching: Multiple Git branches referencing the same dataset version share identical physical storage blocks',
      ],
    },

    intuition: {
      overview:
        'DVC bridges Git and remote object storage (S3, GCS, Azure Blob, or local NAS). When data changes, DVC computes a new cryptographic hash, stores the raw binary in remote cache, and writes a tiny pointer file into Git.',
      steps: [
        {
          step: 1,
          title: 'Track Large Artifact with DVC',
          description:
            'Execute `dvc add data/training.csv`. DVC calculates the SHA-256 hash of the file and moves it into the content-addressable cache.',
        },
        {
          step: 2,
          title: 'Generate Lightweight Pointer',
          description:
            'DVC writes `data/training.csv.dvc` containing the file hash and size. The raw `.csv` is automatically added to `.gitignore`.',
        },
        {
          step: 3,
          title: 'Commit Pointer to Git',
          description:
            'Commit the tiny `.dvc` pointer file to Git alongside the training code. The code commit and data hash are now inextricably bound.',
        },
        {
          step: 4,
          title: 'Push Artifact to Remote Storage',
          description:
            'Execute `dvc push` to sync large binary files to shared cloud object storage. Teammates run `git checkout` followed by `dvc pull`.',
        },
      ],
    },

    mathematics: {
      overview:
        'Content-addressable hashing maps any arbitrary data file to a fixed 256-bit hash using the cryptographic SHA-256 collision-resistant function.',
      foundations: [
        {
          name: 'Cryptographic Hash Function (SHA-256)',
          latex: 'h = \\text{SHA-256}(D) \\in \\{0, 1\\}^{256}',
          explanation:
            'Any alteration of even a single byte in dataset D completely randomizes hash h, guaranteeing tamper evidence and version immutability.',
        },
        {
          name: 'Collision Resistance Guarantee',
          latex: 'P\\big(\\text{SHA-256}(D_1) = \\text{SHA-256}(D_2) \\mid D_1 \\ne D_2\\big) < 2^{-128}',
          explanation:
            'It is computationally impossible for two distinct datasets to produce identical content pointers, ensuring zero ambiguous versions.',
        },
      ],
    },

    derivation: {
      title: 'Derivation of Data Leakage Contamination Probability',
      objective: 'Show mathematically how unversioned dynamic data splits introduce train-test leakage.',
      steps: [
        {
          step: 1,
          label: 'Independent Split Formulation',
          latex: 'D_{\\text{train}} \\cap D_{\\text{test}} = \\emptyset \\quad \\text{with fixed seed } s_0',
          explanation: 'A clean evaluation requires strict disjointness between training and test distributions.',
        },
        {
          step: 2,
          label: 'Random Dynamic Reshuffling Contamination',
          latex: 'P(x \\in D_{\\text{train}}^{(t_2)} \\mid x \\in D_{\\text{test}}^{(t_1)}) = \\frac{|D_{\\text{train}}|}{|D_{\\text{total}}|}, \\quad t_2 > t_1',
          explanation: 'If random splits are regenerated dynamically across runs without locked version manifests, past test samples leak into future training sets.',
        },
        {
          step: 3,
          label: 'Optimistic Performance Bias',
          latex: '\\mathbb{E}[\\text{Error}_{\\text{leaked}}] < \\mathbb{E}[\\text{Error}_{\\text{true}}]',
          explanation: 'Contaminated test evaluation drastically underestimates real-world error, leading to disastrous production surprises.',
        },
      ],
    },

    variables: [
      { symbol: 'D', name: 'Dataset Blob', description: 'Raw or preprocessed binary data table / images / audio' },
      { symbol: 'h', name: 'Content Hash', description: 'Hexadecimal SHA-256 digest identifying the exact dataset version' },
      { symbol: 's_0', name: 'Deterministic Seed', description: 'Fixed pseudo-random seed used for reproducible train/test partition' },
    ],

    numericalExample: {
      scenario: 'Verifying dataset integrity and storage savings across 3 versions using Content-Addressable Storage',
      dataset: [
        { version: 'v1.0', rawSizeGb: 12.0, uniqueBlocksGb: 12.0, hash: 'sha256:7f9a12...' },
        { version: 'v1.1 (5% new rows)', rawSizeGb: 12.6, uniqueBlocksGb: 0.6, hash: 'sha256:3c8b41...' },
        { version: 'v2.0 (Full re-scrape)', rawSizeGb: 15.0, uniqueBlocksGb: 15.0, hash: 'sha256:9e1d05...' },
      ],
      calculations: [
        { step: 'Naive Git Storage Requirement', math: '12.0 + 12.6 + 15.0 \\text{ GB}', result: '39.6 GB committed directly into Git repository' },
        { step: 'DVC Content-Addressable Storage', math: '12.0 + 0.6 + 15.0 \\text{ GB}', result: '27.6 GB in remote cache; Git repo remains < 2 MB' },
      ],
      finalConclusion: 'DVC pointers keep the local Git repository under 2 MB while versioning 39.6 GB of historical data immutably.',
    },

    visualExplanation: {
      title: 'Git + DVC Symbiosis Architecture',
      description:
        'Diagram showing how Git stores application code and .dvc pointer files, while DVC synchronizes heavy datasets to object storage.',
      features: [
        'Developer Repo: Holds train.py, dvc.yaml, and data.csv.dvc (small text files)',
        'Git Remote (GitHub): Tracks commit histories, code diffs, and small pointer files',
        'DVC Cache: Local content-addressable storage hashed by SHA-256',
        'Remote Storage (S3 / Blob): Centralized bucket holding massive raw binary datasets and model checkpoints',
      ],
    },

    scratchCode: {
      title: 'Python Dataset Hashing & Immutable Manifest Generator',
      code: `import hashlib
import json
import os

def generate_dataset_manifest(data_content: str, version_tag: str) -> dict:
    """Computes SHA-256 hash and generates a DVC-style reproducibility pointer"""
    # Compute SHA-256
    hasher = hashlib.sha256()
    hasher.update(data_content.encode('utf-8'))
    content_hash = hasher.hexdigest()
    
    manifest = {
        "schema_version": "2.0",
        "version_tag": version_tag,
        "outs": [
            {
                "path": "data/training_split.csv",
                "hash_algorithm": "sha256",
                "hash": content_hash,
                "size_bytes": len(data_content.encode('utf-8')),
                "n_records": len(data_content.strip().split('\\n')) - 1
            }
        ]
    }
    return manifest

# Test dataset
sample_csv = "user_id,age,balance,churn\\n101,34,4500.0,0\\n102,52,12000.5,1\\n103,28,950.0,0"
manifest = generate_dataset_manifest(sample_csv, "v1.2.0")
print("DVC-Style Pointer Manifest:")
print(json.dumps(manifest, indent=2))`,
      explanation:
        'Generates an immutable dataset manifest using SHA-256 content hashing, demonstrating how DVC and modern MLOps platforms bind dataset versions to code.',
    },

    sklearnCode: {
      title: 'Deterministic Partitioning with Cryptographic Verification',
      code: `import numpy as np
import hashlib
from sklearn.model_selection import train_test_split

def deterministic_data_partition(X, y, test_size=0.2, seed=42):
    # 1. Deterministic split
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=test_size, random_state=seed
    )
    
    # 2. Compute partition signatures to prevent data leakage
    train_sig = hashlib.sha256(X_train.tobytes()).hexdigest()[:12]
    test_sig = hashlib.sha256(X_test.tobytes()).hexdigest()[:12]
    
    return {
        "X_train": X_train,
        "X_test": X_test,
        "signatures": {
            "train_sha": train_sig,
            "test_sha": test_sig,
            "seed": seed
        }
    }

# Mock data
X = np.random.RandomState(42).randn(100, 4)
y = np.random.RandomState(42).randint(0, 2, 100)
partition = deterministic_data_partition(X, y)
print("Partition Signatures:", partition["signatures"])`,
      explanation:
        'Creates deterministic train/test splits with cryptographic byte-level signatures, ensuring train/test disjointness and zero accidental leakage.',
    },

    runnableCode: {
      code: `import hashlib

def verify_dataset_integrity(original_data, test_data):
    h1 = hashlib.sha256(original_data.encode()).hexdigest()
    h2 = hashlib.sha256(test_data.encode()).hexdigest()
    return "VERIFIED: Dataset matches exact historical hash." if h1 == h2 else "TAMPER_DETECTED: Dataset mutated!"

data_v1 = "customer_id,fico,churn\\n1,720,0\\n2,610,1"
print(verify_dataset_integrity(data_v1, data_v1))`,
      expectedOutput: 'VERIFIED: Dataset matches exact historical hash.',
    },

    lineByLineExplanation: [
      { lines: '1-3', codeSnippet: 'import hashlib ... def verify_dataset_integrity(...)', explanation: 'Imports Python cryptographic library and defines verification function.' },
      { lines: '4-6', codeSnippet: 'h1 = hashlib.sha256(...).hexdigest() ... return "VERIFIED" if h1 == h2', explanation: 'Computes SHA-256 digest of both datasets and checks equality.' },
      { lines: '8-9', codeSnippet: 'print(verify_dataset_integrity(data_v1, data_v1))', explanation: 'Confirms that identical inputs yield 100% matching cryptographic fingerprints.' },
    ],

    hyperparameters: [
      { name: 'hash_algorithm', defaultVal: 'sha256', range: 'sha256, md5', effect: 'Cryptographic hash used for content indexing', recommendation: 'Always use sha256 to guarantee zero hash collisions.' },
      { name: 'test_split_ratio', defaultVal: '0.20', range: '0.10 - 0.33', effect: 'Fraction of data reserved for evaluation', recommendation: 'Keep at 0.15 - 0.20 and pin split seed permanently.' },
    ],

    assumptions: [
      { assumption: 'Remote Storage Persistence', whyItMatters: 'If the remote S3/GCS cache bucket is deleted, .dvc pointers become dead links', howToVerify: 'Enable object versioning and replication on cloud storage buckets.' },
      { assumption: 'Data Immutability', whyItMatters: 'Overwriting files in-place without generating a new hash breaks reproducibility', howToVerify: 'Treat all dataset directories as read-only once registered.' },
    ],

    commonMistakes: [
      {
        mistake: 'Pushing multi-gigabyte CSV or H5 files directly into Git commits',
        solution: 'Use DVC or Git LFS to track files outside the Git tree.',
        whyWrong: 'The .git folder balloons permanently, cloning takes hours, and GitHub will reject pushes over 100MB.',
        howToFix: 'Add data/ to .gitignore and track files with dvc add data/dataset.csv.',
      },
      {
        mistake: 'Applying StandardScaler or normalizer before splitting into train and test sets',
        solution: 'Split raw data first; fit scaler strictly on train; transform test without fitting.',
        whyWrong: 'Data leakage! Test set mean and variance bleed into the training distribution, yielding overly optimistic test scores.',
        howToFix: 'Wrap transformers in a Scikit-Learn Pipeline or fit exclusively on X_train.',
      },
    ],

    realWorldUseCases: [
      { industry: 'Autonomous Driving', application: 'LiDAR & Video Dataset Tracking', benefit: 'Versions petabytes of drive footage across hundreds of test vehicles using DVC.' },
      { industry: 'Finance', application: 'Algorithmic Trading Training Sets', benefit: 'Guarantees point-in-time market data reproducibility to prevent lookahead bias.' },
      { industry: 'Medical Devices', application: 'Radiology Imaging Repositories', benefit: 'Provides immutable audit trails linking patient scans to trained diagnostic models.' },
    ],

    practiceQuestions: [
      {
        id: 'pq-1',
        question: 'Why does standard Git fail when used to version large binary datasets and deep learning model checkpoints?',
        hint: 'How does Git store file histories across commits?',
        answer: 'Git was engineered for text source code and stores complete delta histories in its internal .git directory. Committing multi-gigabyte binary files causes repository bloat, slow clone times, memory exhaustion during diffing, and hard file size rejections on hosting platforms like GitHub.',
        explanation: 'Git is optimized for text lines, not multi-gigabyte binary blobs.',
      },
      {
        id: 'pq-2',
        question: 'How does a .dvc pointer file solve the data versioning challenge without bloating Git?',
        hint: 'What does the .dvc file actually contain?',
        answer: 'A .dvc pointer file is a tiny text file (few bytes) containing the SHA-256 cryptographic hash and file size of the large asset. The small .dvc file is committed to Git, while the actual multi-gigabyte binary is stored in remote object storage (S3, GCS) indexed by that same hash.',
        explanation: 'Git tracks the pointer; cloud storage holds the heavy payload.',
      },
      {
        id: 'pq-3',
        question: 'Explain how fitting a feature scaler on the entire dataset prior to train/test splitting causes data leakage.',
        hint: 'What statistical properties of the test set are leaked to the scaler?',
        answer: 'Fitting a scaler computes the global mean and variance across all samples. If done prior to splitting, the training set effectively "knows" the distribution and boundary range of the test set. At test time, accuracy appears unrealistically high because test data was leaked during preprocessing.',
        explanation: 'Preprocessing parameters must be computed strictly from the training partition.',
      },
    ],

    quiz: [
      {
        id: 'qz-1',
        question: 'What is Content-Addressable Storage (CAS) as used by DVC?',
        options: [
          'A system that indexes files by user email addresses',
          'A storage paradigm where files are identified and stored based on the cryptographic hash of their contents',
          'A relational SQL table storing user passwords',
          'A DNS routing table for web domains',
        ],
        correctIndex: 1,
        explanation: 'Content-Addressable Storage uses the cryptographic hash (e.g. SHA-256) of the file content as its unique address and filename.',
      },
      {
        id: 'qz-2',
        question: 'Which of the following files SHOULD be committed to Git when using DVC?',
        options: ['The 15GB training_data.parquet file', 'The .dvc/cache directory', 'The lightweight training_data.parquet.dvc pointer file', 'The raw GPU memory dump'],
        correctIndex: 2,
        explanation: 'Only the tiny .dvc pointer file is committed to Git. The large data file and local cache are ignored by Git.',
      },
      {
        id: 'qz-3',
        question: 'How do you guarantee that a dataset split can be reproduced bit-for-bit in the future?',
        options: [
          'By running the training script without an internet connection',
          'By fixing the pseudorandom split seed (e.g. random_state=42) and saving the split manifests with cryptographic hashes',
          'By sorting the rows alphabetically and deleting half of them',
          'By using Python 2 instead of Python 3',
        ],
        correctIndex: 1,
        explanation: 'Fixing the random seed and saving content hashes guarantees that the partition can be reproduced identically on any machine.',
      },
    ],

    independentExercise: {
      id: 'ex-03-dvc-manifest',
      title: 'Build a Data Leakage Detector for Feature Splits',
      problem: 'Write a Python function `check_data_leakage(train_ids, test_ids)` that takes two lists of sample IDs. Return `{"has_leakage": bool, "overlapping_ids": list, "overlap_percentage": float}`. Overlap percentage is (overlap_count / total_unique_ids) * 100.',
      hints: [
        'Use set(train_ids).intersection(set(test_ids)) to find overlapping IDs',
        'Calculate total unique IDs using set(train_ids).union(set(test_ids))',
      ],
      starterCode: `def check_data_leakage(train_ids: list, test_ids: list) -> dict:
    # TODO: Implement leakage check
    pass

# Test
t_ids = ["usr_1", "usr_2", "usr_3", "usr_4", "usr_5"]
v_ids = ["usr_4", "usr_5", "usr_6", "usr_7"]
print(check_data_leakage(t_ids, v_ids))`,
      solution: `def check_data_leakage(train_ids: list, test_ids: list) -> dict:
    s_train = set(train_ids)
    s_test = set(test_ids)
    overlap = sorted(list(s_train.intersection(s_test)))
    total_unique = len(s_train.union(s_test))
    
    overlap_pct = round((len(overlap) / total_unique) * 100, 2) if total_unique > 0 else 0.0
    return {
        "has_leakage": len(overlap) > 0,
        "overlapping_ids": overlap,
        "overlap_percentage": overlap_pct
    }

t_ids = ["usr_1", "usr_2", "usr_3", "usr_4", "usr_5"]
v_ids = ["usr_4", "usr_5", "usr_6", "usr_7"]
print(check_data_leakage(t_ids, v_ids))`,
    },

    summary: {
      keyTakeaways: [
        'Git is designed for source code; DVC handles multi-gigabyte binary datasets and model checkpoints.',
        'Content-Addressable Storage (CAS) indexes data by SHA-256 hash, ensuring tamper-evident immutability.',
        'Lightweight .dvc pointer files in Git bind specific code commits to exact dataset versions.',
        'Prevent data leakage by splitting datasets before any preprocessing and recording partition cryptographic signatures.',
      ],
      nextLessonId: 'mlops-04-pipelines-automation',
    },
  },
};

