import { ModuleData, LessonContent } from '@/lib/types';

// =========================================================================
// MODULE 7: CI/CD for Machine Learning (p10-m7)
// =========================================================================
export const p10m7Data: ModuleData = {
  id: 'p10-m7',
  number: 7,
  title: 'CI/CD for Machine Learning',
  subtitle: 'Continuous Integration, Quality Gates, GitHub Actions & Test Automation',
  description:
    'Establish continuous integration and continuous delivery for machine learning systems. Design automated testing suites for preprocessing transforms, prediction invariants, API contracts, model accuracy quality gates, and automated deployment pipelines.',
  icon: 'GitCommit',
  badge: 'Phase 10 · MLOps',
  estimatedHours: 3,
  topicsCount: 1,
  lessons: [
    {
      id: 'mlops-07-cicd-ml',
      moduleId: 'p10-m7',
      title: 'MLOps-07: CI/CD for Machine Learning & Quality Gates',
      description:
        'Automated testing for ML: preprocessing parity tests, prediction sanity checks, model quality regression gates, and GitHub Actions CI workflows.',
      order: 1,
      readTimeMinutes: 35,
      visualizerType: 'mlops-cicd-quality-gate-explorer',
      difficulty: 'Intermediate',
    },
  ],
};

// =========================================================================
// MODULE 8: Model Registry and Release Management (p10-m8)
// =========================================================================
export const p10m8Data: ModuleData = {
  id: 'p10-m8',
  number: 8,
  title: 'Model Registry & Releases',
  subtitle: 'Model Lineage, Stage Promotion, Model Signatures & Canary Rollbacks',
  description:
    'Master production release engineering for machine learning. Understand model registry architectures (Dev -> Staging -> Production -> Archived), model signatures, backward compatibility, approval gates, shadow deployments, and 1-click automated rollbacks.',
  icon: 'GitPullRequest',
  badge: 'Phase 10 · MLOps',
  estimatedHours: 3,
  topicsCount: 1,
  lessons: [
    {
      id: 'mlops-08-registry-releases',
      moduleId: 'p10-m8',
      title: 'MLOps-08: Model Registry, Promotion & Release Strategies',
      description:
        'Model registry state machines, version metadata manifests, input/output signatures, canary routing, shadow traffic testing, and instant rollback runbooks.',
      order: 1,
      readTimeMinutes: 36,
      visualizerType: 'mlops-model-release-explorer',
      difficulty: 'Intermediate',
    },
  ],
};

// =========================================================================
// MODULE 9: ML Monitoring and Data Drift (p10-m9)
// =========================================================================
export const p10m9Data: ModuleData = {
  id: 'p10-m9',
  number: 9,
  title: 'ML Monitoring & Data Drift',
  subtitle: 'Covariate Shift, Concept Drift, Kolmogorov-Smirnov & PSI Telemetry',
  description:
    'Maintain visibility into live production models. Differentiate between data drift (covariate shift) and concept drift, calculate Kolmogorov-Smirnov statistics and Population Stability Index (PSI), and understand why drift alerts do not automatically prove accuracy degradation.',
  icon: 'Activity',
  badge: 'Phase 10 · MLOps',
  estimatedHours: 3,
  topicsCount: 1,
  lessons: [
    {
      id: 'mlops-09-monitoring-drift',
      moduleId: 'p10-m9',
      title: 'MLOps-09: Production Monitoring, Data Drift & Concept Drift',
      description:
        'Continuous telemetry: feature distribution tracking, Kolmogorov-Smirnov test, Population Stability Index (PSI), Prometheus metrics, and automated retraining alerts.',
      order: 1,
      readTimeMinutes: 38,
      visualizerType: 'mlops-data-drift-explorer',
      difficulty: 'Advanced',
    },
  ],
};

// =========================================================================
// LESSON CONTENTS (Modules 7 - 9)
// =========================================================================
export const mlopsModule3Lessons: Record<string, LessonContent> = {
  'mlops-07-cicd-ml': {
    id: 'mlops-07-cicd-ml',
    moduleId: 'p10-m7',
    title: 'MLOps-07: CI/CD for Machine Learning & Quality Gates',
    subtitle: 'Continuous Integration, Quality Gates, GitHub Actions & Test Automation',
    order: 1,
    readTimeMinutes: 35,
    difficulty: 'Intermediate',
    visualizerType: 'mlops-cicd-quality-gate-explorer',

    objectives: [
      'Architect a continuous integration and delivery pipeline specialized for machine learning (CI/CD4ML)',
      'Design three distinct tiers of ML automated tests: Preprocessing Tests, Prediction Invariant Tests, and Quality Gates',
      'Implement an automated quality gate that blocks deployment if candidate F1-score or latency regresses against baseline',
      'Construct a complete, illustrative GitHub Actions workflow YAML for linting, testing, and container deployment',
      'Eliminate flaky non-deterministic test failures by using pinned random seeds and synthetic mock datasets',
    ],

    prerequisites: [
      'Understanding of software unit testing (pytest) and the MLOps lifecycle (Lessons 1 & 4)',
      'Basic familiarity with Git branches and continuous integration concepts',
    ],
    previousLesson: {
      id: 'mlops-06-serving-apis',
      title: 'MLOps-06: Model Serving & REST APIs with FastAPI',
      moduleId: 'p10-m6',
    },

    analogy: {
      title: 'The Aircraft Pre-Flight Checklist vs Hope-Driven Flight',
      text: 'Before a commercial airliner takes off, the flight crew does not merely turn the key and hope for the best. They run an automated pre-flight instrument check: fuel purity sensors verify zero water contamination (data tests), rudder actuators test full left/right deflection without resistance (unit tests), avionics verify GPS lock (API contracts), and engine thrust output is measured against minimum runway takeoff thresholds (quality gates). If any single sensor fails, the flight is grounded immediately at the gate before passengers leave the tarmac. CI/CD for ML is the automated pre-flight checklist that prevents broken models from crashing into customer production environments.',
      metaphor: 'A pull request without ML quality gates is an uninspected aircraft taking off into a storm.',
    },

    problemSolved: {
      title: 'The "Code Passed Unit Tests But Model Is Broken" Paradox',
      description:
        'Standard software CI workflows only verify that Python code runs without syntax errors. In machine learning, a pull request can achieve 100% test coverage while silently breaking feature scalers, dropping model accuracy by 25%, or doubling prediction latency.',
      keyPoints: [
        'Preprocessing Invariant Tests: Asserting that missing value imputation and scaling produce identical outputs across test splits',
        'Directional Expectation Tests: Asserting that increasing a positive feature (e.g. credit score) never increases predicted risk',
        'Automated Benchmark Quality Gates: Automatically training or evaluating candidate models and halting deployment if baseline is not met',
        'Ephemeral Integration Testing: Spinning up temporary FastAPI containers in the CI runner to test live HTTP /predict endpoints',
      ],
    },

    intuition: {
      overview:
        'CI/CD for ML extends traditional software pipelines with data validation and statistical model performance assertions before building and promoting container images.',
      steps: [
        {
          step: 1,
          title: 'Code Quality & Static Analysis',
          description:
            'Execute Ruff linter and MyPy strict type checking to eliminate syntax errors, unhandled null pointers, and missing type contracts.',
        },
        {
          step: 2,
          title: 'Preprocessing & Invariant Unit Tests',
          description:
            'Run pytest on data transforms. Assert shape consistency, value boundary constraints (0 <= p <= 1), and directional behavior.',
        },
        {
          step: 3,
          title: 'Model Quality Gate Assertion',
          description:
            'Evaluate the candidate checkpoint against an immutable golden validation dataset. Assert: F1 >= Champion_F1 and P95_Latency <= 35ms.',
        },
        {
          step: 4,
          title: 'Security Scan & Container Build',
          description:
            'Scan Docker layers for CVE vulnerabilities and unencrypted secrets (git-secrets), build image, and push to container registry.',
        },
      ],
    },

    mathematics: {
      overview:
        'Quality gate evaluation tests the statistical hypothesis that candidate performance theta_c is non-inferior to baseline champion theta_0.',
      foundations: [
        {
          name: 'Non-Inferiority Hypothesis Gate',
          latex: 'H_0: \\text{F1}(\\theta_c) - \\text{F1}(\\theta_0) < -\\delta \\quad \\text{vs} \\quad H_1: \\text{F1}(\\theta_c) - \\text{F1}(\\theta_0) \\ge -\\delta',
          explanation:
            'The CI pipeline rejects candidate deployment if the null hypothesis H_0 cannot be rejected, guaranteeing the new model does not regress performance beyond tolerance delta.',
        },
        {
          name: 'Directional Invariant Assertion',
          latex: 'x_i^{(1)} > x_i^{(2)} \\;\\land\\; x_{-i}^{(1)} = x_{-i}^{(2)} \\implies f_\\theta(x^{(1)}) \\ge f_\\theta(x^{(2)})',
          explanation:
            'For monotonic features (e.g. higher income should not increase loan denial probability), tests assert monotonic non-decreasing output.',
        },
      ],
    },

    derivation: {
      title: 'Derivation of Quality Gate Confidence Intervals',
      objective: 'Calculate statistical significance when comparing candidate vs champion models on a finite validation set.',
      steps: [
        {
          step: 1,
          label: 'Validation Sample Variance',
          latex: '\\hat{\\sigma}^2 = \\frac{1}{N} \\sum_{i=1}^N \\big(\\mathcal{L}(\\theta_c, z_i) - \\mathcal{L}(\\theta_0, z_i) - \\Delta\\bar{\\mathcal{L}}\\big)^2',
          explanation: 'Computes sample variance of pairwise loss differences between candidate and champion across N validation instances.',
        },
        {
          step: 2,
          label: 'Pairwise Z-Score Formulation',
          latex: 'Z = \\frac{\\Delta\\bar{\\mathcal{L}}}{\\hat{\\sigma} / \\sqrt{N}}',
          explanation: 'Evaluates whether observed candidate improvement is statistically significant or merely random noise on validation data.',
        },
        {
          step: 3,
          label: 'Automated Deployment Gate Rule',
          latex: '\\text{Deploy} \\iff Z > 1.96 \\;\\land\\; P_{95}(\\text{Latency}) \\le \\text{SLA}',
          explanation: 'Promotes model if improvement exceeds 95% confidence threshold (Z > 1.96) AND operational latency SLA is satisfied.',
        },
      ],
    },

    variables: [
      { symbol: '\\theta_c', name: 'Candidate Model', description: 'Weights of the new model proposed in the pull request' },
      { symbol: '\\theta_0', name: 'Champion Model', description: 'Weights of the active production model serving live traffic' },
      { symbol: '\\delta', name: 'Regression Tolerance Margin', description: 'Allowable margin of regression (typically 0.0 or 0.005)' },
      { symbol: 'N', name: 'Validation Set Size', description: 'Number of independent golden evaluation samples used for gate assertions' },
    ],

    numericalExample: {
      scenario: 'Evaluating whether a candidate fraud classifier passes the CI/CD Quality Gate against the production champion',
      dataset: [
        { metric: 'Validation F1-Score', champion: 0.912, candidate: 0.934, threshold: '>= 0.912 (Champion)', status: 'PASS' },
        { metric: 'P95 Latency (ms)', champion: 24.0, candidate: 28.5, threshold: '<= 35.0 ms (SLA)', status: 'PASS' },
        { metric: 'Directional Invariant', champion: '100% pass', candidate: '100% pass', threshold: 'Zero violations', status: 'PASS' },
        { metric: 'Container Vulnerabilities', champion: 0, candidate: 0, threshold: '0 Critical / High', status: 'PASS' },
      ],
      calculations: [
        { step: 'Accuracy Delta', math: '0.934 - 0.912 = +0.022', result: '+2.2% F1 improvement' },
        { step: 'Latency Headroom', math: '35.0 - 28.5 = 6.5\\text{ms}', result: '6.5ms safety headroom below maximum SLA' },
      ],
      finalConclusion: 'All 4 quality gates passed. Automated CI pipeline commits candidate to staging container registry.',
    },

    visualExplanation: {
      title: 'ML CI/CD Pipeline Workflow Diagram',
      description:
        'A comprehensive flow showing git push triggering linting, unit tests, model evaluation, security scanning, container builds, and canary deployment.',
      features: [
        'Fast Feedback Loop: Linters and unit tests execute in < 60 seconds',
        'Model Gate: Evaluates candidate weights against frozen validation test set',
        'Ephemeral Service Test: Boots FastAPI container and tests curl /predict payload',
        'Artifact Publication: Pushes tagged container to registry only upon 100% test pass',
      ],
    },

    scratchCode: {
      title: 'Automated ML Quality Gate Test Suite in Python',
      code: `import pytest
import numpy as np

# Mock models & preprocessor for deterministic testing
class MockChampionModel:
    def predict_proba(self, X):
        return np.array([0.2, 0.4, 0.8, 0.1, 0.9])

class MockCandidateModel:
    def predict_proba(self, X):
        return np.array([0.15, 0.35, 0.85, 0.05, 0.95])

def compute_f1(y_true, y_probs, threshold=0.5):
    preds = (y_probs >= threshold).astype(int)
    tp = np.sum((preds == 1) & (y_true == 1))
    fp = np.sum((preds == 1) & (y_true == 0))
    fn = np.sum((preds == 0) & (y_true == 1))
    precision = tp / (tp + fp) if (tp + fp) > 0 else 0
    recall = tp / (tp + fn) if (tp + fn) > 0 else 0
    return 2 * (precision * recall) / (precision + recall) if (precision + recall) > 0 else 0

def test_preprocessing_invariants():
    """Assert scaler preserves non-negative constraints and handles zero variance"""
    raw_data = np.array([[10.0, 50.0], [20.0, 50.0], [30.0, 50.0]])
    # Simulate transformation
    transformed = (raw_data - raw_data.mean(axis=0)) / (raw_data.std(axis=0) + 1e-7)
    assert not np.isnan(transformed).any(), "NaN values produced during feature normalization"
    assert transformed.shape == (3, 2), "Feature dimensionality altered during transform"

def test_directional_monotonicity():
    """Assert increasing income never increases predicted risk score"""
    low_income_profile = [25, 30000, 700]
    high_income_profile = [25, 90000, 700]
    
    # Model risk logic: risk inversely proportional to income
    risk_low = 1.0 / (low_income_profile[1] / 1000.0)
    risk_high = 1.0 / (high_income_profile[1] / 1000.0)
    
    assert risk_high <= risk_low, "Directional expectation failed: higher income yielded higher risk"

def test_candidate_quality_gate():
    """Assert candidate model matches or exceeds champion F1-score"""
    y_true = np.array([0, 0, 1, 0, 1])
    champ = MockChampionModel()
    cand = MockCandidateModel()
    
    f1_champ = compute_f1(y_true, champ.predict_proba(None))
    f1_cand = compute_f1(y_true, cand.predict_proba(None))
    
    print(f"\\nChampion F1: {f1_champ:.3f} | Candidate F1: {f1_cand:.3f}")
    assert f1_cand >= f1_champ, f"Quality gate failure: Candidate F1 ({f1_cand}) < Champion F1 ({f1_champ})"

# Run the assertions directly
test_preprocessing_invariants()
test_directional_monotonicity()
test_candidate_quality_gate()
print("[CI/CD Gate] All automated ML test assertions PASSED!")`,
      explanation:
        'A complete Python test suite implementing three essential ML test paradigms: preprocessing invariance, directional monotonicity, and automated quality gate assertions.',
    },

    sklearnCode: {
      title: 'GitHub Actions CI/CD Workflow for Machine Learning',
      code: `# .github/workflows/ml-ci-cd.yml
# Production GitHub Actions Workflow for Machine Learning Systems
name: ML Pipeline CI/CD Quality Gate

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test_and_gate:
    runs-on: ubuntu-latest
    steps:
      - name: Check out repository
        uses: actions/checkout@v4

      - name: Set up Python 3.11
        uses: actions/setup-python@v5
        with:
          python-version: "3.11"
          cache: "pip"

      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          pip install ruff mypy pytest -r requirements.txt

      - name: 1. Code Lint & Type Checks
        run: |
          ruff check src/
          mypy src/ --ignore-missing-imports

      - name: 2. Preprocessing & Invariant Unit Tests
        run: |
          pytest tests/test_preprocessing.py tests/test_invariants.py -v

      - name: 3. Model Quality Gate
        run: |
          # Evaluates candidate model against baseline champion
          python scripts/evaluate_quality_gate.py --min-f1 0.90 --max-latency-ms 35.0

      - name: 4. Build & Scan Container Image
        if: github.ref == 'refs/heads/main'
        run: |
          docker build -t ml-service:\${{ github.sha }} .
          # Scan for vulnerabilities
          echo "Scanning container image with security gate..."`,
      explanation:
        'A comprehensive GitHub Actions workflow illustrating linting, invariant unit tests, statistical quality gates, and conditional container build steps.',
    },

    runnableCode: {
      code: `def run_ci_gate_simulation(cand_f1, champ_f1, cand_latency, max_latency):
    log = []
    log.append("--- GitHub Actions CI Quality Gate ---")
    log.append("1. Lint & Typing: 0 errors detected (ruff & mypy clean).")
    log.append("2. Invariant Tests: 12/12 directional tests passed.")
    
    # Check Accuracy Gate
    if cand_f1 >= champ_f1:
        log.append(f"3. Accuracy Gate: PASSED (Candidate F1={cand_f1} >= Champion={champ_f1}).")
    else:
        log.append(f"3. Accuracy Gate: FAILED (Candidate F1={cand_f1} < Champion={champ_f1}).")
        return "\\n".join(log) + "\\n>>> CI STATUS: BLOCKED <<<"
        
    # Check Latency Gate
    if cand_latency <= max_latency:
        log.append(f"4. Latency Gate: PASSED (P95={cand_latency}ms <= SLA={max_latency}ms).")
    else:
        log.append(f"4. Latency Gate: FAILED (P95={cand_latency}ms > SLA={max_latency}ms).")
        return "\\n".join(log) + "\\n>>> CI STATUS: BLOCKED <<<"
        
    log.append("5. Container Build: Authorized. Pushing image to registry.")
    return "\\n".join(log) + "\\n>>> CI STATUS: SUCCESS (All Gates Passed) <<<"

print(run_ci_gate_simulation(cand_f1=0.925, champ_f1=0.910, cand_latency=28.0, max_latency=35.0))`,
      expectedOutput: `--- GitHub Actions CI Quality Gate ---
1. Lint & Typing: 0 errors detected (ruff & mypy clean).
2. Invariant Tests: 12/12 directional tests passed.
3. Accuracy Gate: PASSED (Candidate F1=0.925 >= Champion=0.91).
4. Latency Gate: PASSED (P95=28.0ms <= SLA=35.0ms).
5. Container Build: Authorized. Pushing image to registry.
>>> CI STATUS: SUCCESS (All Gates Passed) <<<`,
    },

    lineByLineExplanation: [
      { lines: '1-6', codeSnippet: 'run_ci_gate_simulation(...) ... log.append(...)', explanation: 'Simulates step-wise progression of automated CI workflow.' },
      { lines: '8-13', codeSnippet: 'if cand_f1 >= champ_f1: ... else: return BLOCKED', explanation: 'Enforces non-inferiority accuracy gate; halts pipeline if regression detected.' },
      { lines: '15-20', codeSnippet: 'if cand_latency <= max_latency: ... else: return BLOCKED', explanation: 'Enforces operational SLA latency gate before allowing deployment.' },
    ],

    hyperparameters: [
      { name: 'gate_f1_threshold', defaultVal: '0.90', range: '0.50 - 0.99', effect: 'Minimum allowable F1 score on validation set', recommendation: 'Set equal to or slightly above the current champion model.' },
      { name: 'p95_latency_ceiling', defaultVal: '35.0ms', range: '5ms - 500ms', effect: 'Maximum acceptable P95 response time', recommendation: 'Calibrate based on business user experience requirements and SLAs.' },
    ],

    assumptions: [
      { assumption: 'Validation Set Freshness', whyItMatters: 'Evaluating against a stale 2-year-old validation set approves models that will fail on modern data', howToVerify: 'Rotate and re-sample golden evaluation sets on a monthly cadence.' },
      { assumption: 'Deterministic Test Environments', whyItMatters: 'Unpinned random seeds cause intermittent CI test failures that destroy developer trust', howToVerify: 'Hardcode random seeds in all test fixtures.' },
    ],

    commonMistakes: [
      {
        mistake: 'Training models on random unseeded splits inside CI test runners',
        solution: 'Use pre-computed golden validation sets with fixed seeds for gate evaluation.',
        whyWrong: 'Tests will pass or fail randomly depending on the random split, leading to flaky CI runs.',
        howToFix: 'Store an immutable validation set in DVC/S3 and point CI scripts to it.',
      },
      {
        mistake: 'Skipping directional invariance tests and relying solely on global accuracy metrics',
        solution: 'Write explicit unit tests asserting monotonicity (e.g. higher down payment lowers risk).',
        whyWrong: 'A model can have 92% accuracy while containing embarrassing, nonsensical edge-case behaviors.',
        howToFix: 'Create synthetic edge-case pairs and assert expected directional output ordering.',
      },
    ],

    realWorldUseCases: [
      { industry: 'Automotive', application: 'Autonomous Driver-Assist Vision', benefit: 'CI blocks software merges if pedestrian detection recall drops on safety test clips.' },
      { industry: 'FinTech', application: 'Credit Risk Scoring', benefit: 'Verifies strict monotonicity and demographic fairness criteria on every git commit.' },
      { industry: 'Retail', application: 'Search Ranking Recommender', benefit: 'Automated CI/CD deploys re-ranked candidate models to canary clusters daily.' },
    ],

    practiceQuestions: [
      {
        id: 'pq-1',
        question: 'What is a directional invariance test in machine learning, and why is it important?',
        hint: 'Think about how a human expert expects predictions to behave when one input changes.',
        answer: 'A directional invariance test (or metamorphic test) asserts that changing a feature in a known direction causes the model prediction to change in the expected direction (or remain unchanged). For instance, increasing a customer’s credit score should never increase their loan default risk. These tests catch counter-intuitive bugs that overall accuracy scores hide.',
        explanation: 'Directional tests guarantee that models behave logically on edge cases.',
      },
      {
        id: 'pq-2',
        question: 'What is the role of a model quality gate in a CI/CD pipeline?',
        hint: 'What does the gate prevent from happening in production?',
        answer: 'A model quality gate is an automated checkpoint in CI/CD that evaluates a newly trained model against predetermined accuracy, latency, and fairness thresholds. If the candidate model regresses compared to the production champion, the gate fails, stopping the deployment and preventing degraded models from reaching users.',
        explanation: 'Quality gates protect production from statistical regressions.',
      },
      {
        id: 'pq-3',
        question: 'Why should full end-to-end model training generally be decoupled from fast pull-request CI checks?',
        hint: 'How long does training a large model take compared to a developer waiting for PR feedback?',
        answer: 'Training complex models can take hours or days and require expensive GPU hardware. Running full training on every git push creates massive developer bottlenecks. Instead, PR CI runs fast linting, unit tests, and evaluates pre-trained model checkpoints; heavy retraining is offloaded to scheduled or triggered pipeline workflows.',
        explanation: 'Decoupling keeps developer pull request feedback loops fast (< 5 minutes).',
      },
    ],

    quiz: [
      {
        id: 'qz-1',
        question: 'Which of the following tests is an example of an ML Preprocessing Invariant test?',
        options: [
          'Checking if the company logo renders on the login screen',
          'Asserting that feature normalization handles zero-variance columns without producing NaN values',
          'Testing the billing credit card processing gateway',
          'Verifying the GitHub repository password',
        ],
        correctIndex: 1,
        explanation: 'Testing that feature scaling handles zero variance without generating NaNs is a classic preprocessing invariant test.',
      },
      {
        id: 'qz-2',
        question: 'If a pull request introduces code that passes all unit tests but reduces validation F1-score from 0.92 to 0.84, what should happen in a mature MLOps system?',
        options: [
          'The pull request is automatically merged because unit tests passed',
          'The CI/CD Quality Gate fails and blocks deployment, notifying the team of the accuracy regression',
          'The server is immediately deleted',
          'The model is deployed anyway to test on real customers',
        ],
        correctIndex: 1,
        explanation: 'The Quality Gate detects the 8% F1 drop and halts deployment, preventing a regressed model from reaching production.',
      },
      {
        id: 'qz-3',
        question: 'Why should random seeds be pinned when executing ML test suites in continuous integration?',
        options: [
          'To make the test code run faster',
          'To ensure tests are 100% deterministic and eliminate flaky random test failures',
          'Because Python crashes if random seeds are omitted',
          'To encrypt the test results',
        ],
        correctIndex: 1,
        explanation: 'Pinning seeds eliminates non-deterministic variance, ensuring that tests pass or fail for genuine code reasons rather than random chance.',
      },
    ],

    independentExercise: {
      id: 'ex-07-cicd-gate',
      title: 'Implement an Automated Pull Request Quality Gate',
      problem: 'Write a Python function `ci_quality_gate(cand_metrics, champ_metrics, max_allowed_p95_ms)` that returns a dictionary `{"status": "PASSED" | "FAILED", "violations": list}`. Violations should record if candidate F1 < champion F1, or if candidate P95 latency > max_allowed_p95_ms.',
      hints: [
        'Initialize violations = []',
        'Check cand_metrics["f1"] < champ_metrics["f1"]',
        'Check cand_metrics["p95_ms"] > max_allowed_p95_ms',
      ],
      starterCode: `def ci_quality_gate(cand: dict, champ: dict, max_p95_ms: float) -> dict:
    # TODO: Implement CI Gate logic
    pass

# Test
c_cand = {"f1": 0.88, "p95_ms": 42.0}
c_champ = {"f1": 0.91, "p95_ms": 25.0}
print(ci_quality_gate(c_cand, c_champ, max_p95_ms=35.0))`,
      solution: `def ci_quality_gate(cand: dict, champ: dict, max_p95_ms: float) -> dict:
    violations = []
    if cand["f1"] < champ["f1"]:
        violations.append(f"F1 regression: candidate ({cand['f1']}) < champion ({champ['f1']})")
    if cand["p95_ms"] > max_p95_ms:
        violations.append(f"Latency SLA violation: candidate ({cand['p95_ms']}ms) > max ({max_p95_ms}ms)")
        
    return {
        "status": "PASSED" if len(violations) == 0 else "FAILED",
        "violations": violations
    }

c_cand = {"f1": 0.88, "p95_ms": 42.0}
c_champ = {"f1": 0.91, "p95_ms": 25.0}
print(ci_quality_gate(c_cand, c_champ, max_p95_ms=35.0))`,
    },

    summary: {
      keyTakeaways: [
        'CI/CD for ML requires testing both traditional code logic and statistical model performance.',
        'Directional invariant tests assert logical consistency across monotonic feature boundaries.',
        'Automated quality gates block deployment if candidate accuracy, latency, or fairness metrics regress.',
        'Decoupling fast pull-request tests from long-running model training ensures rapid developer velocity.',
      ],
      nextLessonId: 'mlops-08-registry-releases',
    },
  },

  'mlops-08-registry-releases': {
    id: 'mlops-08-registry-releases',
    moduleId: 'p10-m8',
    title: 'MLOps-08: Model Registry, Promotion & Release Strategies',
    subtitle: 'Model Lineage, Stage Promotion, Model Signatures & Canary Rollbacks',
    order: 1,
    readTimeMinutes: 36,
    difficulty: 'Intermediate',
    visualizerType: 'mlops-model-release-explorer',

    objectives: [
      'Understand the architecture and role of a Model Registry (MLflow Model Registry, AWS SageMaker Registry)',
      'Manage model lifecycle state transitions: Development -> Staging -> Production -> Archived',
      'Define Model Signatures (typed inputs and outputs) to enforce contract compatibility across releases',
      'Implement progressive deployment patterns: Shadow Deployments, Canary Releases, and A/B Testing',
      'Design an automated circuit breaker that triggers instant rollback if production error rates spike',
    ],

    prerequisites: [
      'Understanding of experiment tracking and FastAPI serving (Lessons 2 & 6)',
      'Basic familiarity with web traffic routing and load balancers',
    ],
    previousLesson: {
      id: 'mlops-07-cicd-ml',
      title: 'MLOps-07: CI/CD for Machine Learning & Quality Gates',
      moduleId: 'p10-m7',
    },

    analogy: {
      title: 'The Broadway Cast Understudy vs Immediate Opening Night Lead',
      text: 'When a theater company hires a new actor for a lead Broadway role, they never put the actor directly on stage on opening night without rehearsal. First, the actor learns the lines in the rehearsal room (Development). Next, they perform full dress rehearsals backstage (Staging). Then, during technical previews, they perform for 10% of the audience to test acoustics and timing (Canary). If the actor suddenly forgets their lines, the seasoned veteran lead (Champion) steps back onto the stage immediately (Rollback). A model registry is the theater company stage manager, orchestrating promotions and instant understudy substitutions.',
      metaphor: 'The registry is the stage manager; Canary is the preview performance; Rollback is the seasoned understudy.',
    },

    problemSolved: {
      title: 'The High-Risk 100% "Big Bang" Deployment Hazard',
      description:
        'Switching 100% of live production traffic to a new model version instantaneously creates massive operational risk. If the new model contains an edge-case memory leak, an unhandled zero-division, or unexpected latency on mobile clients, all users experience downtime simultaneously.',
      keyPoints: [
        'Centralized Governance: Decoupling model training from deployment so releases are controlled by release managers, not ad-hoc scripts',
        'Model Signatures: Enforcing strict schema contracts between input tensors/features and output predictions',
        'Shadow Deployments (Dark Traffic): Mirroring 100% of live traffic to the candidate model without returning its predictions to users',
        'Canary & Circuit Breakers: Gradually increasing traffic (5% -> 25% -> 100%) with automated rollbacks if error budgets are breached',
      ],
    },

    intuition: {
      overview:
        'A model registry tracks registered models across named stages. Promotion follows a strict progression guarded by approvals, automated telemetry, and fallback runbooks.',
      steps: [
        {
          step: 1,
          title: 'Model Registration',
          description:
            'A trained model is logged with its serialized weights, dependencies, and input/output schema signature, receiving version `v1.0.0`.',
        },
        {
          step: 2,
          title: 'Promotion to Staging',
          description:
            'The candidate is moved to Staging for integration testing and load benchmarking against simulated production traffic.',
        },
        {
          step: 3,
          title: 'Canary Traffic Allocation',
          description:
            'In production, an Envoy/Kubernetes router directs 10% of requests to the candidate and 90% to the active champion.',
        },
        {
          step: 4,
          title: 'Automated Rollback or Promotion',
          description:
            'If the candidate error rate stays below 0.5% and latency satisfies SLA, traffic is ramped to 100% and previous champion is archived.',
        },
      ],
    },

    mathematics: {
      overview:
        'Progressive traffic routing can be modeled as a Bernoulli mixture distribution over Champion M_0 and Challenger M_1.',
      foundations: [
        {
          name: 'Traffic Mixture Distribution',
          latex: 'P(y \\mid x; \\alpha) = (1 - \\alpha) \\cdot P_{M_0}(y \\mid x) + \\alpha \\cdot P_{M_1}(y \\mid x)',
          explanation:
            'Traffic split parameter alpha in [0, 1] controls the fraction of incoming user requests evaluated by challenger model M_1.',
        },
        {
          name: 'Circuit Breaker Error Rate Bound',
          latex: '\\text{Rollback Triggered} \\iff \\frac{1}{K} \\sum_{i=1}^K \\mathbb{I}(\\text{HTTP}_i \\ge 500) > \\epsilon_{\\text{SLA}}',
          explanation:
            'If the sliding window error rate over K consecutive canary requests exceeds threshold epsilon_SLA (e.g. 1.0%), routing reverts immediately to alpha = 0.',
        },
      ],
    },

    derivation: {
      title: 'Derivation of Blast Radius Reduction via Canary Deployment',
      objective: 'Calculate the expected user incident impact under canary routing versus immediate 100% cutover.',
      steps: [
        {
          step: 1,
          label: 'Immediate 100% Cutover Blast Radius',
          latex: 'B_{\\text{immediate}} = N_{\\text{users}} \\cdot P(\\text{Failure} \\mid M_1)',
          explanation: 'In a full cutover, any unhandled failure affects the entire active user base N_users.',
        },
        {
          step: 2,
          label: 'Canary Blast Radius',
          latex: 'B_{\\text{canary}}(\\alpha) = \\alpha \\cdot N_{\\text{users}} \\cdot P(\\text{Failure} \\mid M_1)',
          explanation: 'Restricting challenger traffic to alpha = 0.05 limits potential user impact to exactly 5% of traffic.',
        },
        {
          step: 3,
          label: 'Impact Reduction Factor',
          latex: '\\frac{B_{\\text{canary}}}{B_{\\text{immediate}}} = \\alpha = 0.05 \\implies 95\\% \\text{ reduction in user disruption}',
          explanation: 'Canary routing reduces operational user risk by 95% while verifying real-world telemetry.',
        },
      ],
    },

    variables: [
      { symbol: 'M_0', name: 'Champion Model', description: 'Active stable model handling baseline traffic in production' },
      { symbol: 'M_1', name: 'Challenger Model', description: 'Candidate model undergoing canary or shadow evaluation' },
      { symbol: '\\alpha', name: 'Traffic Allocation Ratio', description: 'Fraction of live traffic routed to challenger (0.05 to 1.0)' },
      { symbol: '\\epsilon_{\\text{SLA}}', name: 'Error Budget Threshold', description: 'Maximum allowable 5xx error rate before circuit breaker trips' },
    ],

    numericalExample: {
      scenario: 'Monitoring an active 10% canary release serving 10,000 requests over 1 hour',
      dataset: [
        { model: 'Champion (v1.0.0)', trafficPercent: 90, requests: 9000, errors: 9, p95Ms: 24.1 },
        { model: 'Challenger (v1.1.0)', trafficPercent: 10, requests: 1000, errors: 28, p95Ms: 16.5 },
      ],
      calculations: [
        { step: 'Champion Error Rate', math: '9 / 9000 = 0.001', result: '0.10% error rate (healthy)' },
        { step: 'Challenger Error Rate', math: '28 / 1000 = 0.028', result: '2.80% error rate (exceeds 1.0% SLA threshold)' },
      ],
      finalConclusion: 'Challenger error rate (2.8%) breached the 1.0% error budget. Circuit breaker trips, reverting traffic to 100% Champion.',
    },

    visualExplanation: {
      title: 'Model Registry State Transitions & Canary Routing',
      description:
        'A comprehensive visualization of lifecycle stages (Dev -> Staging -> Production -> Archived) and proxy traffic splitting.',
      features: [
        'Stage Promotion: Explicit approval gate required to move versions from Staging to Production',
        'Model Signatures: JSON schema validating feature names, tensor types, and output contracts',
        'Smart Routing Proxy: Weighted traffic splitter directing 90% to Champion and 10% to Challenger',
        'Automated Circuit Breaker: Instant fallback cutover if challenger 5xx error rate spikes',
      ],
    },

    scratchCode: {
      title: 'Local Model Registry State Machine in Pure Python',
      code: `import time

class ModelRegistry:
    def __init__(self):
        self.registry = {}

    def register_model(self, model_name: str, version: str, signature: dict, artifact_uri: str):
        if model_name not in self.registry:
            self.registry[model_name] = {}
            
        entry = {
            "version": version,
            "stage": "DEVELOPMENT",
            "signature": signature,
            "artifact_uri": artifact_uri,
            "created_at": time.time(),
            "history": [f"Registered in DEVELOPMENT at {time.ctime()}"]
        }
        self.registry[model_name][version] = entry
        print(f"[Registry] Model '{model_name}' version {version} registered in DEVELOPMENT.")
        return entry

    def transition_stage(self, model_name: str, version: str, new_stage: str):
        valid_stages = ["DEVELOPMENT", "STAGING", "PRODUCTION", "ARCHIVED"]
        if new_stage not in valid_stages:
            raise ValueError(f"Invalid stage '{new_stage}'. Must be one of {valid_stages}")
            
        entry = self.registry[model_name][version]
        old_stage = entry["stage"]
        
        # If moving to PRODUCTION, archive any existing production version
        if new_stage == "PRODUCTION":
            for v, data in self.registry[model_name].items():
                if data["stage"] == "PRODUCTION" and v != version:
                    data["stage"] = "ARCHIVED"
                    data["history"].append(f"Auto-demoted to ARCHIVED on {time.ctime()}")
                    print(f"[Registry] Demoted previous champion {v} to ARCHIVED.")
                    
        entry["stage"] = new_stage
        entry["history"].append(f"Transitioned {old_stage} -> {new_stage} at {time.ctime()}")
        print(f"[Registry] Model '{model_name}' v{version} transitioned: {old_stage} -> {new_stage}.")

# Demonstration
reg = ModelRegistry()
sig = {"inputs": ["age: int", "income: float"], "outputs": ["churn_prob: float"]}

reg.register_model("churn_predictor", "1.0.0", sig, "s3://models/churn/v1.0.0.bin")
reg.transition_stage("churn_predictor", "1.0.0", "PRODUCTION")

reg.register_model("churn_predictor", "1.1.0", sig, "s3://models/churn/v1.1.0.bin")
reg.transition_stage("churn_predictor", "1.1.0", "STAGING")
reg.transition_stage("churn_predictor", "1.1.0", "PRODUCTION")

print("\\nRegistry Status for 'churn_predictor':")
for v, d in reg.registry["churn_predictor"].items():
    print(f"  Version {v}: Stage = {d['stage']}")`,
      explanation:
        'A complete Python Model Registry state machine managing version metadata, input/output signatures, stage transitions, and automated champion archival.',
    },

    sklearnCode: {
      title: 'MLflow Model Registry API Integration Pattern',
      code: `# Conceptual / Standard MLflow Registry Pattern
# pip install mlflow
"""
import mlflow
from mlflow.tracking import MlflowClient

client = MlflowClient()
model_name = "credit_risk_classifier"

# 1. Register candidate from existing experiment run
run_id = "exp_run_889a01"
model_uri = f"runs:/{run_id}/model"
reg_model = mlflow.register_model(model_uri=model_uri, name=model_name)

# 2. Transition candidate to Staging
client.transition_model_version_stage(
    name=model_name,
    version=reg_model.version,
    stage="Staging",
    archive_existing_versions=False
)

# 3. Promote to Production with Automated Archival of Champion
client.transition_model_version_stage(
    name=model_name,
    version=reg_model.version,
    stage="Production",
    archive_existing_versions=True  # Automatically demotes current Champion to Archived
)
"""
print("MLflow Model Registry promotion pattern registered successfully.")`,
      explanation:
        'Demonstrates the canonical MLflow Client workflow for registering models from runs and transitioning stages with automated champion archival.',
    },

    runnableCode: {
      code: `def simulate_canary_routing(traffic_split_percent, error_spike=False):
    log = []
    log.append(f"Traffic Split: {100 - traffic_split_percent}% Champion | {traffic_split_percent}% Challenger")
    
    if error_spike:
        challenger_errors = 3.8 # %
        log.append(f"ALERT: Challenger 5xx error rate spiked to {challenger_errors}% (Threshold: 1.0%).")
        log.append("CIRCUIT BREAKER TRIPPED! Reverting traffic split to 100% Champion / 0% Challenger.")
        log.append("Status: Immediate automated rollback completed in 18ms.")
    else:
        challenger_errors = 0.2 # %
        log.append(f"Challenger 5xx error rate: {challenger_errors}% (within budget).")
        log.append("Canary test healthy. Safe to promote Challenger to 100% Production.")
    return "\\n".join(log)

print(simulate_canary_routing(traffic_split_percent=10, error_spike=True))`,
      expectedOutput: `Traffic Split: 90% Champion | 10% Challenger
ALERT: Challenger 5xx error rate spiked to 3.8% (Threshold: 1.0%).
CIRCUIT BREAKER TRIPPED! Reverting traffic split to 100% Champion / 0% Challenger.
Status: Immediate automated rollback completed in 18ms.`,
    },

    lineByLineExplanation: [
      { lines: '1-3', codeSnippet: 'def simulate_canary_routing(...) ... Traffic Split', explanation: 'Initializes the progressive canary traffic division between models.' },
      { lines: '5-9', codeSnippet: 'if error_spike: ... CIRCUIT BREAKER TRIPPED! Reverting...', explanation: 'Evaluates error SLA and triggers instantaneous automated rollback.' },
      { lines: '11-13', codeSnippet: 'else: Challenger error rate: 0.2% ... Safe to promote', explanation: 'Authorizes promotion when canary telemetry remains healthy.' },
    ],

    hyperparameters: [
      { name: 'canary_step_size', defaultVal: '10%', range: '5% - 25%', effect: 'Incremental traffic percentage increase', recommendation: 'Increase in stages: 10% -> 25% -> 50% -> 100% over 24 hours.' },
      { name: 'error_budget_threshold', defaultVal: '1.0%', range: '0.1% - 5.0%', effect: 'Maximum acceptable 5xx error rate before rollback', recommendation: 'Keep at 0.5% - 1.0% for business-critical APIs.' },
    ],

    assumptions: [
      { assumption: 'Backward Schema Compatibility', whyItMatters: 'If Challenger alters input or output schemas without versioning, existing clients crash', howToVerify: 'Assert model input/output signatures in registry before promotion.' },
      { assumption: 'Stateless Serving', whyItMatters: 'If models store state across user requests, canary traffic splitting causes state desynchronization', howToVerify: 'Ensure all inference services are 100% stateless.' },
    ],

    commonMistakes: [
      {
        mistake: 'Overwriting the production model weights directly on the server without registry versioning',
        solution: 'Use a Model Registry with immutable version tags and semantic stage transitions.',
        whyWrong: 'If the new model has a catastrophic bug, you cannot roll back because the previous file was overwritten.',
        howToFix: 'Never overwrite weight files; deploy new versions alongside old ones and swap traffic pointers.',
      },
      {
        mistake: 'Promoting a model to production without testing it under live shadow or canary traffic',
        solution: 'Always route a small fraction of traffic through Canary or Shadow before 100% cutover.',
        whyWrong: 'Synthetic offline validation cannot test real-world client latency distributions, timeouts, or concurrency.',
        howToFix: 'Adopt a mandatory 24-hour canary bake period before archiving the champion.',
      },
    ],

    realWorldUseCases: [
      { industry: 'E-Commerce', application: 'Checkout Recommendation Model', benefit: 'Canary testing verifies that new recommendation algorithms do not decrease checkout conversion rates.' },
      { industry: 'Streaming', application: 'Video Bitrate Adaptation Classifier', benefit: 'Shadow testing verifies model inference speed across millions of mobile devices without impacting stream quality.' },
      { industry: 'Banking', application: 'Fraud Detection Engine', benefit: 'Model registry maintains full historical lineage of every model version for federal financial audits.' },
    ],

    practiceQuestions: [
      {
        id: 'pq-1',
        question: 'What is a Shadow Deployment (Dark Traffic), and how does it differ from a Canary Deployment?',
        hint: 'Consider whether users receive predictions from the new model in each strategy.',
        answer: 'In a Shadow Deployment, live production requests are mirrored to the new model, but its predictions are discarded and only the stable champion responses are returned to users. This tests real-world latency and stability with zero risk to user experience. In a Canary Deployment, a small fraction (e.g. 5-10%) of users actually receive predictions from the new model to test business outcomes.',
        explanation: 'Shadow deployments carry zero user risk; canary deployments test real end-user feedback.',
      },
      {
        id: 'pq-2',
        question: 'What is a Model Signature, and why is it essential for production governance?',
        hint: 'Think about software interfaces and API contracts.',
        answer: 'A Model Signature defines the formal schema specification of the model inputs (feature names, data types, shapes) and outputs (prediction types, probabilities). It acts as a strict contract, ensuring that downstream services calling the model know exactly what data format to send and expect, preventing breaking changes across model versions.',
        explanation: 'Signatures prevent data format mismatches across model updates.',
      },
      {
        id: 'pq-3',
        question: 'How does an automated circuit breaker protect production stability during a canary release?',
        hint: 'What happens if the canary model throws unexpected 500 errors?',
        answer: 'An automated circuit breaker continuously monitors the canary model error rate and latency against strict SLA limits (e.g. error rate > 1.0%). If the threshold is breached, the circuit breaker trips immediately, cutting traffic to the challenger model and restoring 100% traffic to the proven champion within milliseconds, preventing an extended outage.',
        explanation: 'Circuit breakers automatically contain the blast radius of bad releases.',
      },
    ],

    quiz: [
      {
        id: 'qz-1',
        question: 'What happens to the existing production Champion when a Challenger model is promoted to Production in a standard registry?',
        options: [
          'The champion weights are permanently deleted from the hard drive',
          'The existing champion is demoted to the "Archived" stage and kept for rapid rollback capability',
          'The champion is renamed to "Development"',
          'The model registry shuts down',
        ],
        correctIndex: 1,
        explanation: 'Promoting a new model to Production transitions the previous champion to "Archived", preserving its artifact for instant rollback if needed.',
      },
      {
        id: 'qz-2',
        question: 'In a Shadow Deployment, what happens to the predictions generated by the candidate model?',
        options: [
          'They are sent to the customer immediately',
          'They are logged for latency and comparison analysis, but discarded without affecting the customer',
          'They are printed on physical paper',
          'They replace the database records',
        ],
        correctIndex: 1,
        explanation: 'Shadow deployments log outputs and latency for analysis without returning them to the live client.',
      },
      {
        id: 'qz-3',
        question: 'What is the primary benefit of canary releases over immediate 100% cutovers?',
        options: [
          'Canary releases make models train 10x faster',
          'They drastically limit the blast radius of potential bugs to a tiny percentage of users, enabling instant rollback',
          'They eliminate the need for writing unit tests',
          'They allow using unpinned random seeds',
        ],
        correctIndex: 1,
        explanation: 'Canary deployments minimize blast radius: if an error occurs, only 5-10% of users are exposed before the release is halted.',
      },
    ],

    independentExercise: {
      id: 'ex-08-registry-state',
      title: 'Build a Model Stage Transition Validator',
      problem: 'Write a Python function `validate_stage_transition(current_stage, target_stage)` that enforces valid transitions: 1) DEV can only move to STAGING, 2) STAGING can move to PROD or DEV, 3) PROD can only move to ARCHIVED. Return `{"valid": bool, "error": str}`.',
      hints: [
        'Define allowed_transitions = {"DEV": ["STAGING"], "STAGING": ["PRODUCTION", "DEV"], "PRODUCTION": ["ARCHIVED"]}',
      ],
      starterCode: `def validate_stage_transition(current: str, target: str) -> dict:
    # TODO: Enforce state machine rules
    pass

# Test
print(validate_stage_transition("DEV", "PRODUCTION"))
print(validate_stage_transition("STAGING", "PRODUCTION"))`,
      solution: `def validate_stage_transition(current: str, target: str) -> dict:
    allowed = {
        "DEV": ["STAGING"],
        "STAGING": ["PRODUCTION", "DEV"],
        "PRODUCTION": ["ARCHIVED"],
        "ARCHIVED": ["STAGING"]
    }
    if current not in allowed or target not in allowed[current]:
        return {"valid": False, "error": f"Invalid transition: {current} -> {target}"}
    return {"valid": True, "error": None}

print(validate_stage_transition("DEV", "PRODUCTION"))
print(validate_stage_transition("STAGING", "PRODUCTION"))`,
    },

    summary: {
      keyTakeaways: [
        'Model Registries centralize model governance, decoupling training from deployment.',
        'Stage transitions (Dev -> Staging -> Production -> Archived) structure the release lifecycle.',
        'Progressive canary and shadow deployments verify real-world performance with minimal blast radius.',
        'Automated circuit breakers provide instantaneous rollback if error budgets or latency SLAs are breached.',
      ],
      nextLessonId: 'mlops-09-monitoring-drift',
    },
  },

  'mlops-09-monitoring-drift': {
    id: 'mlops-09-monitoring-drift',
    moduleId: 'p10-m9',
    title: 'MLOps-09: Production Monitoring, Data Drift & Concept Drift',
    subtitle: 'Covariate Shift, Concept Drift, Kolmogorov-Smirnov & PSI Telemetry',
    order: 1,
    readTimeMinutes: 38,
    difficulty: 'Advanced',
    visualizerType: 'mlops-data-drift-explorer',

    objectives: [
      'Differentiate between Data Drift (Covariate Shift) and Concept Drift in production ML systems',
      'Understand why drift alerts do not automatically prove that a model has become inaccurate',
      'Compute the Kolmogorov-Smirnov (KS) statistic for continuous feature distributions',
      'Calculate the Population Stability Index (PSI) to detect statistical changes across population bins',
      'Construct an automated drift monitoring service that streams Prometheus metrics and triggers retraining alerts',
    ],

    prerequisites: [
      'Understanding of probability distributions (mean, variance, cumulative distribution functions) from Phase 2',
      'Familiarity with production serving endpoints and logging (Lesson 6)',
    ],
    previousLesson: {
      id: 'mlops-08-registry-releases',
      title: 'MLOps-08: Model Registry, Promotion & Release Strategies',
      moduleId: 'p10-m8',
    },

    analogy: {
      title: 'The Coastal Weather Barometer vs The Structural Earthquake Sensor',
      text: 'Imagine living in a seaside town. A barometer on your porch measures atmospheric air pressure. When a storm blows in, the air pressure drops sharply (Data Drift / Covariate Shift). The barometer does not mean your house has collapsed; it simply means the outside weather conditions have changed. However, if an earthquake shakes the ground and cracks your house foundation so the walls lean sideways (Concept Drift), the fundamental structural relationship between weight and support has changed. Data drift measures shifts in input weather; concept drift measures whether your model relationship with ground-truth reality has cracked.',
      metaphor: 'Data drift is a shift in the environment weather P(X); concept drift is a change in the laws of reality P(Y|X).',
    },

    problemSolved: {
      title: 'The Silent Model Decay Problem',
      description:
        'Once a model is deployed, incoming customer behavior, economic conditions, and seasonality mutate the input data distribution. The API continues to return HTTP 200 OK responses with zero software exceptions, but business conversion rates plummet because the model predictions are no longer valid.',
      keyPoints: [
        'Covariate Shift Detection: Statistical monitoring of input features P(X) against the training baseline',
        'Concept Drift Awareness: Tracking whether the relationship P(Y|X) has changed when ground-truth labels eventually arrive',
        'Non-Parametric Tests: Using the Kolmogorov-Smirnov (KS) test to detect distribution changes without assuming Gaussianity',
        'Standardized Industry Metric (PSI): Calculating the Population Stability Index to categorize drift into Green (<0.1), Yellow (0.1-0.2), and Red (>=0.2)',
      ],
    },

    intuition: {
      overview:
        'Monitoring compares a reference dataset (training baseline) against an analysis dataset (live production stream). Discrepancies are quantified using statistical distance metrics and reported to telemetry dashboards.',
      steps: [
        {
          step: 1,
          title: 'Capture Prediction Payloads',
          description:
            'A lightweight background worker samples live inference input vectors and logs them into a telemetry warehouse (e.g. Parquet in S3).',
        },
        {
          step: 2,
          title: 'Compute Statistical Distance',
          description:
            'A scheduled job (e.g. daily) calculates KS-statistic and PSI for each feature against the reference training distribution.',
        },
        {
          step: 3,
          title: 'Evaluate Drift Thresholds',
          description:
            'If PSI >= 0.20 or KS p-value < 0.05, mark the feature as drifted. If multiple core features drift, elevate alert level to Warning.',
        },
        {
          step: 4,
          title: 'Ground Truth Verification & Retraining Trigger',
          description:
            'Sample ground-truth labels to evaluate if true accuracy dropped. If confirmed, trigger automated retraining pipeline.',
        },
      ],
    },

    mathematics: {
      overview:
        'Data drift measures changes in marginal feature density P(X), while concept drift measures changes in conditional label distribution P(Y|X).',
      foundations: [
        {
          name: 'Joint Distribution Factorization',
          latex: 'P(X, Y) = P(Y \\mid X) \\cdot P(X)',
          explanation:
            'Covariate shift occurs when P_prod(X) != P_train(X) while P(Y|X) remains constant. Concept drift occurs when P_prod(Y|X) != P_train(Y|X).',
        },
        {
          name: 'Kolmogorov-Smirnov (KS) Statistic',
          latex: 'D = \\sup_x |F_{\\text{ref}}(x) - F_{\\text{prod}}(x)|',
          explanation:
            'D is the maximum vertical distance between the empirical cumulative distribution functions (ECDF) of the reference and production feature values.',
        },
        {
          name: 'Population Stability Index (PSI)',
          latex: '\\text{PSI} = \\sum_{b=1}^B \\big(P_{\\text{prod}}(b) - P_{\\text{ref}}(b)\\big) \\cdot \\ln\\left( \\frac{P_{\\text{prod}}(b)}{P_{\\text{ref}}(b)} \\right)',
          explanation:
            'Symmetric KL-divergence across B quantile bins. PSI < 0.1 indicates stability; 0.1 <= PSI < 0.2 indicates moderate shift; PSI >= 0.2 indicates significant drift.',
        },
      ],
    },

    derivation: {
      title: 'Derivation of the Population Stability Index (PSI)',
      objective: 'Show how PSI derives from symmetric Kullback-Leibler (KL) divergence across discrete bins.',
      steps: [
        {
          step: 1,
          label: 'Forward KL Divergence',
          latex: 'D_{KL}(P \\parallel Q) = \\sum_{b=1}^B P(b) \\ln\\frac{P(b)}{Q(b)}',
          explanation: 'Measures information entropy lost when approximating production distribution P with reference Q.',
        },
        {
          step: 2,
          label: 'Reverse KL Divergence',
          latex: 'D_{KL}(Q \\parallel P) = \\sum_{b=1}^B Q(b) \\ln\\frac{Q(b)}{P(b)} = - \\sum_{b=1}^B Q(b) \\ln\\frac{P(b)}{Q(b)}',
          explanation: 'Measures entropy lost in the opposite direction.',
        },
        {
          step: 3,
          label: 'Symmetric PSI Summation',
          latex: '\\text{PSI} = D_{KL}(P \\parallel Q) + D_{KL}(Q \\parallel P) = \\sum_{b=1}^B \\big(P(b) - Q(b)\\big) \\ln\\frac{P(b)}{Q(b)}',
          explanation: 'Summing forward and reverse KL divergences yields the symmetric, non-negative Population Stability Index.',
        },
      ],
    },

    variables: [
      { symbol: 'F_{\\text{ref}}(x)', name: 'Reference ECDF', description: 'Empirical cumulative distribution function of training baseline' },
      { symbol: 'F_{\\text{prod}}(x)', name: 'Production ECDF', description: 'Empirical cumulative distribution function of live inference stream' },
      { symbol: 'D', name: 'KS Distance', description: 'Maximum vertical divergence between cumulative distribution curves (0.0 to 1.0)' },
      { symbol: 'B', name: 'Quantile Bins', description: 'Number of frequency buckets used for PSI calculation (typically 10 deciles)' },
    ],

    numericalExample: {
      scenario: 'Calculating Population Stability Index (PSI) across 3 bins for an annual income feature',
      dataset: [
        { bin: 'Low (<$40k)', refPct: 0.30, prodPct: 0.15 },
        { bin: 'Mid ($40k-$80k)', refPct: 0.50, prodPct: 0.50 },
        { bin: 'High (>$80k)', refPct: 0.20, prodPct: 0.35 },
      ],
      calculations: [
        { step: 'Bin 1 Contribution', math: '(0.15 - 0.30) \\times \\ln(0.15 / 0.30) = -0.15 \\times (-0.693)', result: '0.104' },
        { step: 'Bin 2 Contribution', math: '(0.50 - 0.50) \\times \\ln(0.50 / 0.50) = 0.0 \\times 0.0', result: '0.000' },
        { step: 'Bin 3 Contribution', math: '(0.35 - 0.20) \\times \\ln(0.35 / 0.20) = 0.15 \\times (0.559)', result: '0.084' },
        { step: 'Total PSI', math: '0.104 + 0.000 + 0.084', result: '0.188' },
      ],
      finalConclusion: 'Total PSI = 0.188 falls into the Yellow Warning band (0.10 - 0.20), indicating moderate shift. Monitor ground truth labels.',
    },

    visualExplanation: {
      title: 'ECDF Distribution Comparison & Quantile Drift',
      description:
        'A graphical explanation contrasting baseline cumulative distribution against production distribution, highlighting the maximum divergence D.',
      features: [
        'ECDF Curves: Baseline (Blue) vs Production (Amber) showing maximum separation D',
        'Quantile Bins: Division into 10 buckets for Population Stability Index aggregation',
        'Alert Thresholds: Green (<0.1: Stable), Yellow (0.1-0.2: Warning), Red (>=0.2: Critical Drift)',
        'Concept Drift Disconnect: Visualizing how input distribution shifts without changing decision boundaries',
      ],
    },

    scratchCode: {
      title: 'Population Stability Index (PSI) Calculator in Pure Python',
      code: `import math

def calculate_psi(reference: list, production: list, num_bins: int = 5) -> dict:
    """Calculates Population Stability Index (PSI) across quantile buckets"""
    # 1. Determine quantile bin edges from reference data
    sorted_ref = sorted(reference)
    n_ref = len(sorted_ref)
    bin_edges = []
    
    for i in range(1, num_bins):
        idx = int(i * (n_ref / num_bins))
        bin_edges.append(sorted_ref[idx])
        
    def get_bin_counts(data, edges):
        counts = [0] * (len(edges) + 1)
        for val in data:
            placed = False
            for b_idx, edge in enumerate(edges):
                if val <= edge:
                    counts[b_idx] += 1
                    placed = True
                    break
            if not placed:
                counts[-1] += 1
        return counts

    ref_counts = get_bin_counts(reference, bin_edges)
    prod_counts = get_bin_counts(production, bin_edges)
    
    total_ref = len(reference)
    total_prod = len(production)
    
    psi_total = 0.0
    bin_details = []
    
    for r_cnt, p_cnt in zip(ref_counts, prod_counts):
        # Add epsilon to prevent division by zero
        r_pct = max(0.0001, r_cnt / total_ref)
        p_pct = max(0.0001, p_cnt / total_prod)
        
        contribution = (p_pct - r_pct) * math.log(p_pct / r_pct)
        psi_total += contribution
        bin_details.append({"ref_pct": round(r_pct, 3), "prod_pct": round(p_pct, 3), "psi": round(contribution, 4)})
        
    status = "GREEN (Stable)" if psi_total < 0.10 else "YELLOW (Moderate)" if psi_total < 0.20 else "RED (Significant Drift)"
    
    return {
        "psi_score": round(psi_total, 4),
        "status": status,
        "bin_details": bin_details
    }

# Simulation: Baseline vs Shifted production data
ref_data = [20, 22, 25, 28, 30, 32, 35, 38, 40, 45, 50, 55, 60]
prod_data = [35, 38, 40, 42, 45, 48, 50, 55, 60, 62, 65, 70, 75] # shifted higher

res = calculate_psi(ref_data, prod_data, num_bins=4)
print(f"PSI Score: {res['psi_score']} | Status: {res['status']}")`,
      explanation:
        'A complete Python implementation of the Population Stability Index (PSI) calculating symmetric KL-divergence across quantile bins without external dependencies.',
    },

    sklearnCode: {
      title: 'Kolmogorov-Smirnov 2-Sample Drift Test with Scipy',
      code: `# Standard SciPy / Evidently AI Drift Testing Pattern
# pip install scipy
import numpy as np

def run_ks_drift_test(reference_feature: np.ndarray, production_feature: np.ndarray, alpha: float = 0.05):
    """Computes Kolmogorov-Smirnov 2-sample test for continuous distribution shift"""
    # Sort both datasets to construct empirical CDFs
    n1 = len(reference_feature)
    n2 = len(production_feature)
    
    data1 = np.sort(reference_feature)
    data2 = np.sort(production_feature)
    
    data_all = np.concatenate([data1, data2])
    
    # Evaluate empirical CDFs at all observation points
    cdf1 = np.searchsorted(data1, data_all, side='right') / n1
    cdf2 = np.searchsorted(data2, data_all, side='right') / n2
    
    # KS-statistic is maximum vertical divergence
    ks_stat = float(np.max(np.abs(cdf1 - cdf2)))
    
    # Asymptotic critical value approximation
    critical_val = 1.36 * np.sqrt((n1 + n2) / (n1 * n2))
    has_drift = ks_stat > critical_val
    
    return {
        "ks_statistic": round(ks_stat, 4),
        "critical_value": round(critical_val, 4),
        "has_drift": has_drift,
        "alert": "DRIFT DETECTED" if has_drift else "DISTRIBUTION STABLE"
    }

# Mock evaluation
ref = np.random.RandomState(42).normal(loc=50.0, scale=10.0, size=500)
prod = np.random.RandomState(99).normal(loc=58.0, scale=12.0, size=500) # shifted mean and variance

result = run_ks_drift_test(ref, prod)
print("KS Test Result:", result)`,
      explanation:
        'Calculates the Kolmogorov-Smirnov 2-sample test directly, comparing empirical cumulative distribution functions to identify statistically significant feature drift.',
    },

    runnableCode: {
      code: `def simulate_drift_assessment(psi_score, ks_distance):
    log = []
    log.append(f"PSI Score: {psi_score:.3f} | KS Distance: {ks_distance:.3f}")
    
    if psi_score >= 0.20 or ks_distance >= 0.25:
        log.append("CRITICAL: Significant Covariate Shift detected on feature 'annual_income'.")
        log.append("Action: PagerDuty alert dispatched to MLOps team. Sampling ground truth labels.")
    elif psi_score >= 0.10:
        log.append("WARNING: Moderate feature divergence detected.")
        log.append("Action: Increment Prometheus drift counter; no retraining needed yet.")
    else:
        log.append("HEALTHY: Feature distribution matches training baseline.")
        
    log.append("Pedagogical Note: Data drift alone does NOT prove accuracy loss. Ground truth needed.")
    return "\\n".join(log)

print(simulate_drift_assessment(psi_score=0.245, ks_distance=0.312))`,
      expectedOutput: `PSI Score: 0.245 | KS Distance: 0.312
CRITICAL: Significant Covariate Shift detected on feature 'annual_income'.
Action: PagerDuty alert dispatched to MLOps team. Sampling ground truth labels.
Pedagogical Note: Data drift alone does NOT prove accuracy loss. Ground truth needed.`,
    },

    lineByLineExplanation: [
      { lines: '1-3', codeSnippet: 'def simulate_drift_assessment(...) ... PSI & KS', explanation: 'Ingests statistical drift metrics from telemetry analyzer.' },
      { lines: '5-12', codeSnippet: 'if psi_score >= 0.20: ... elif psi_score >= 0.10: ...', explanation: 'Classifies metric into industry-standard Green / Yellow / Red tiers.' },
      { lines: '13-14', codeSnippet: 'log.append("Pedagogical Note: Data drift alone does NOT prove...")', explanation: 'Reinforces the critical distinction between covariate shift and concept drift.' },
    ],

    hyperparameters: [
      { name: 'psi_num_bins', defaultVal: '10', range: '5 - 20', effect: 'Number of quantile buckets used for PSI calculation', recommendation: 'Use 10 decile bins for datasets with > 1,000 samples.' },
      { name: 'ks_alpha_threshold', defaultVal: '0.05', range: '0.01 - 0.10', effect: 'Significance level p-value for KS test', recommendation: 'Set to 0.01 or 0.05 to balance false alarms against detection sensitivity.' },
    ],

    assumptions: [
      { assumption: 'Sufficient Sample Size', whyItMatters: 'Calculating PSI or KS on fewer than 100 samples produces high variance and false drift alerts', howToVerify: 'Accumulate at least 500-1,000 production inference samples before computing drift.' },
      { assumption: 'Stationary Reference Set', whyItMatters: 'Comparing live data against an outdated baseline from 2 years ago triggers perpetual drift alarms', howToVerify: 'Update the reference baseline whenever a newly retrained model is promoted.' },
    ],

    commonMistakes: [
      {
        mistake: 'Assuming that a data drift alert automatically proves that model accuracy has degraded',
        solution: 'Always evaluate ground truth feedback or business metrics before claiming accuracy loss.',
        whyWrong: 'A model may have learned invariant decision boundaries that classify shifted data accurately.',
        howToFix: 'Treat data drift as an indicator to sample ground truth labels and verify concept drift.',
      },
      {
        mistake: 'Using uniform-width bins instead of quantile (equal-frequency) bins for PSI calculations',
        solution: 'Bin reference data using quantiles (e.g. deciles) so each reference bucket contains ~10% of samples.',
        whyWrong: 'Uniform-width bins can leave outlier buckets empty, causing division by zero or inflated logs.',
        howToFix: 'Calculate bin edges from reference dataset quantiles using np.percentile.',
      },
    ],

    realWorldUseCases: [
      { industry: 'FinTech', application: 'Mortgage Default Modeling', benefit: 'Detects macro-economic interest rate shifts and warns risk teams before default losses occur.' },
      { industry: 'Healthcare', application: 'Patient Deterioration Monitor', benefit: 'Monitors hospital ICU telemetry to detect sensor calibration drift across new monitor hardware.' },
      { industry: 'E-Commerce', application: 'Black Friday Conversion Predictors', benefit: 'Distinguishes temporary seasonal holiday traffic surges from permanent customer behavior changes.' },
    ],

    practiceQuestions: [
      {
        id: 'pq-1',
        question: 'What is the precise mathematical and operational difference between Data Drift (Covariate Shift) and Concept Drift?',
        hint: 'Consider P(X) versus P(Y|X).',
        answer: 'Data Drift (Covariate Shift) is a change in the marginal input feature distribution P(X) while the conditional relationship P(Y|X) remains unchanged. Concept Drift is a change in the conditional relationship P(Y|X) itself, meaning the true real-world label associated with a given feature vector has changed (e.g. what used to be a reasonable loan is now a default due to high interest rates).',
        explanation: 'Data drift shifts inputs; concept drift changes the relationship between inputs and outputs.',
      },
      {
        id: 'pq-2',
        question: 'Why does an alert for data drift NOT necessarily mean the production model has degraded in accuracy?',
        hint: 'Consider how decision boundaries relate to shifted data points.',
        answer: 'If the model learned a robust, invariant decision boundary, the input data distribution may shift along dimensions that do not cross the decision threshold. The model may classify the shifted samples with 100% accuracy. Proving accuracy degradation requires comparing predictions against actual ground-truth labels (concept evaluation).',
        explanation: 'Models can remain accurate despite covariate shift if the boundary remains valid.',
      },
      {
        id: 'pq-3',
        question: 'How are the three numerical bands of the Population Stability Index (PSI) interpreted in production systems?',
        hint: 'What are the cutoff thresholds at 0.10 and 0.20?',
        answer: 'PSI < 0.10 indicates negligible change (Green / Stable). 0.10 <= PSI < 0.20 indicates moderate distribution shift (Yellow / Warning), warranting close monitoring of ground truth. PSI >= 0.20 indicates significant distribution change (Red / Alert), requiring investigation and potential automated pipeline retraining.',
        explanation: 'PSI < 0.1 is healthy; 0.1-0.2 is warning; >= 0.2 is critical drift.',
      },
    ],

    quiz: [
      {
        id: 'qz-1',
        question: 'What does the Kolmogorov-Smirnov (KS) statistic measure between two feature distributions?',
        options: [
          'The ratio of their standard deviations',
          'The maximum vertical distance between their empirical cumulative distribution functions (ECDF)',
          'The difference between their minimum values',
          'The time it takes to compute their matrix inverse',
        ],
        correctIndex: 1,
        explanation: 'The KS statistic D represents the supremum (maximum vertical distance) between the reference and production empirical cumulative distribution curves.',
      },
      {
        id: 'qz-2',
        question: 'In banking risk systems, a feature with a Population Stability Index (PSI) of 0.26 should be categorized into which tier?',
        options: [
          'Green (No significant change)',
          'Yellow (Slight shift)',
          'Red (Significant shift / Action required)',
          'Blue (Cold archive)',
        ],
        correctIndex: 2,
        explanation: 'Any PSI value of 0.20 or greater falls into the Red category, signaling significant distribution drift.',
      },
      {
        id: 'qz-3',
        question: 'Which of the following events represents Concept Drift rather than Covariate Shift?',
        options: [
          'A retailer expands to a new country and customer ages shift from average 30 to 45 years',
          'During high inflation, customers with previously safe $60k incomes begin defaulting on loans at a 3x higher rate',
          'Website visitors shift from using Safari to Google Chrome',
          'More users submit transactions on mobile phones rather than desktop computers',
        ],
        correctIndex: 1,
        explanation: 'When the same income ($60k) produces a fundamentally different outcome (3x higher default rate), P(Y|X) has changed—which is Concept Drift.',
      },
    ],

    independentExercise: {
      id: 'ex-09-psi-classifier',
      title: 'Classify Feature Drift Severity',
      problem: 'Write a Python function `classify_drift_severity(psi_score, ks_pvalue)` that returns: 1) "CRITICAL" if psi_score >= 0.20 or ks_pvalue < 0.01, 2) "WARNING" if psi_score >= 0.10 or ks_pvalue < 0.05, 3) "HEALTHY" otherwise.',
      hints: [
        'Check critical condition first: psi_score >= 0.20 or ks_pvalue < 0.01',
        'Check warning condition next: psi_score >= 0.10 or ks_pvalue < 0.05',
      ],
      starterCode: `def classify_drift_severity(psi: float, ks_p: float) -> str:
    # TODO: Implement drift classification
    pass

# Test
print(classify_drift_severity(psi=0.24, ks_p=0.005))
print(classify_drift_severity(psi=0.12, ks_p=0.04))
print(classify_drift_severity(psi=0.04, ks_p=0.45))`,
      solution: `def classify_drift_severity(psi: float, ks_p: float) -> str:
    if psi >= 0.20 or ks_p < 0.01:
        return "CRITICAL"
    if psi >= 0.10 or ks_p < 0.05:
        return "WARNING"
    return "HEALTHY"

print(classify_drift_severity(psi=0.24, ks_p=0.005))
print(classify_drift_severity(psi=0.12, ks_p=0.04))
print(classify_drift_severity(psi=0.04, ks_p=0.45))`,
    },

    summary: {
      keyTakeaways: [
        'Covariate shift is an input distribution change P(X); concept drift is a true relationship change P(Y|X).',
        'Data drift alerts do not prove accuracy loss; ground truth labels or business metrics must be verified.',
        'The Kolmogorov-Smirnov test measures continuous distribution divergence via cumulative distribution curves.',
        'Population Stability Index (PSI) evaluates bucketed shift: <0.1 is stable, 0.1-0.2 is warning, >=0.2 is critical.',
      ],
      nextLessonId: 'mlops-10-llmops-fundamentals',
    },
  },
};
