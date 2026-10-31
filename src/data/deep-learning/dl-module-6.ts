import { ModuleData, LessonContent } from '@/lib/types';

export const dlModule6Data: ModuleData = {
  id: 'dl-module-6',
  number: 6,
  title: 'Evaluation, FastAPI Serving & DL Capstone',
  subtitle: 'Rigorous Validation, Production Microservices & End-to-End Capstone',
  description:
    'Complete the journey to deep learning mastery: disciplined model evaluation (stratified splits, class imbalance, calibration, error analysis), production model serving with FastAPI and ONNX runtime, and an end-to-end Deep Learning Capstone project integrating training, testing, serving, and monitoring.',
  icon: 'Briefcase',
  badge: 'Phase 3 · Deep Learning',
  estimatedHours: 16,
  topicsCount: 3,
  lessons: [
    {
      id: 'dl-20-deep-learning-evaluation',
      moduleId: 'dl-module-6',
      title: 'DL-20: Deep Learning Evaluation & Diagnostics',
      description: 'Train/val/test hygiene, class imbalance strategies (focal loss, weighted sampling), probability calibration (Platt scaling), and slice-based error analysis.',
      order: 1,
      readTimeMinutes: 28,
      visualizerType: 'none',
      difficulty: 'Intermediate',
    },
    {
      id: 'dl-21-deployment',
      moduleId: 'dl-module-6',
      title: 'DL-21: Deep Learning Deployment & Serving',
      description: 'Model serialization (state_dict, TorchScript, ONNX), FastAPI production microservices, Pydantic input validation, latency optimization, and Docker.',
      order: 2,
      readTimeMinutes: 30,
      visualizerType: 'none',
      difficulty: 'Intermediate',
    },
    {
      id: 'dl-22-deep-learning-capstone',
      moduleId: 'dl-module-6',
      title: 'DL-22: Deep Learning Capstone Project',
      description: 'Complete end-to-end project: problem specification, dataset pipeline, custom neural architecture, evaluation suite, FastAPI inference API, and deployment checklist.',
      order: 3,
      readTimeMinutes: 34,
      visualizerType: 'none',
      difficulty: 'Advanced',
    },
  ],
};

export const dlModule6Lessons: Record<string, LessonContent> = {
  'dl-20-deep-learning-evaluation': {
    id: 'dl-20-deep-learning-evaluation',
    moduleId: 'dl-module-6',
    title: 'DL-20: Deep Learning Evaluation & Diagnostics',
    subtitle: 'Beyond Accuracy: Class Imbalance, Calibration, Slicing & Error Analysis',
    order: 1,
    readTimeMinutes: 28,
    difficulty: 'Intermediate',
    visualizerType: 'none',
    objectives: [
      'Understand why accuracy is misleading on imbalanced datasets and master PR-AUC, F1, and cost-sensitive matrices',
      'Diagnose uncalibrated neural networks and apply Temperature Scaling (Platt scaling) to align confidence with empirical accuracy',
      'Perform structured slice-based error analysis to uncover hidden subgroup failure modes before deployment',
      'Implement leak-free stratified k-fold cross-validation in deep learning pipelines',
    ],
    prerequisites: ['DL-09: Training a Neural Network', 'DL-15: First Practical Deep Learning Project'],
    analogy: {
      title: 'The Airport Metal Detector',
      text: 'Imagine evaluating an airport security metal detector where only 1 passenger in 10,000 carries a contraband weapon (0.01% class frequency). A broken detector that never beeps for anyone achieves a stunning 99.99% accuracy! In high-stakes domains—cancer diagnosis, fraud detection, autonomous emergency braking—accuracy is completely meaningless. You must measure Recall (did you catch the 1 dangerous case?) and Precision (how many innocent passengers did you falsely detain?).',
      metaphor: 'Accuracy counts easy routine successes; evaluation metrics audit critical, costly mistakes.',
    },
    problemSolved: {
      title: 'Preventing Catastrophic Failures in Real-World Inference',
      description: 'Modern deep neural networks with millions of parameters are notoriously overconfident: they can output 99.8% probability while being completely incorrect. Comprehensive evaluation diagnostics reveal silent failures, out-of-distribution drift, and demographic disparities.',
      keyPoints: [
        'Class Imbalance Solutions: Class-weighted cross entropy, WeightedRandomSampler, and threshold tuning.',
        'Probability Calibration: Modern networks with BatchNorm and high capacity require temperature scaling T to restore confidence calibration.',
        'Slice-Based Auditing: Disaggregating metrics across user demographics, lighting conditions, or device types.',
      ],
    },
    intuition: {
      overview: 'Rigorous evaluation tests a model not as a single global number, but as a calibrated decision system scrutinized across minority subgroups and failure slices.',
      steps: [
        { step: 1, title: 'Stratified Partitioning', description: 'Ensure test splits mirror true production class distributions without data leakage.' },
        { step: 2, title: 'Multi-Metric Auditing', description: 'Compute Confusion Matrix, Precision-Recall Curve, and Area Under PR Curve (PR-AUC).' },
        { step: 3, title: 'Calibration Inspection', description: 'Plot Reliability Diagrams (Expected Calibration Error) comparing confidence bins against true accuracy.' },
        { step: 4, title: 'Subgroup Slicing', description: 'Evaluate model accuracy across distinct sub-slices (e.g. low-light images, rare categories).' },
        { step: 5, title: 'Threshold Optimization', description: 'Tune decision threshold θ to maximize utility given asymmetric real-world false-positive vs false-negative costs.' },
      ],
    },
    mathematics: {
      overview: 'Formulas for Expected Calibration Error (ECE) and Temperature Scaling.',
      foundations: [
        {
          name: 'Expected Calibration Error (ECE)',
          latex: '\\text{ECE} = \\sum_{m=1}^{M} \\frac{|B_m|}{N} \\left| \\text{acc}(B_m) - \\text{conf}(B_m) \\right|',
          explanation: 'Partitions predictions into M confidence bins B_m and computes weighted discrepancy between average confidence and true accuracy.',
        },
        {
          name: 'Temperature Scaling (Platt Calibration for NNs)',
          latex: '\\hat{p}_i = \\text{softmax}\\left( \\frac{\\mathbf{z}_i}{T} \\right), \\quad T > 0',
          explanation: 'Learns a single scalar temperature T on the validation set that softens overconfident logits without changing classification rankings.',
        },
      ],
    },
    derivation: {
      title: 'Optimal Decision Threshold Under Asymmetric Costs',
      objective: 'Derive the optimal classification threshold θ* when False Negatives cost C_FN and False Positives cost C_FP.',
      steps: [
        {
          step: 1,
          label: 'Expected Cost Formulation',
          latex: '\\text{Cost}(p) = p \\cdot C_{\\text{FN}} \\cdot \\mathbb{I}_{\\text{pred}=0} + (1-p) \\cdot C_{\\text{FP}} \\cdot \\mathbb{I}_{\\text{pred}=1}',
          explanation: 'p is the model’s predicted probability that sample is positive.',
        },
        {
          step: 2,
          label: 'Decision Boundary Condition',
          latex: 'p \\cdot C_{\\text{FN}} = (1-p) \\cdot C_{\\text{FP}}',
          explanation: 'Equating the expected cost of predicting positive vs predicting negative.',
        },
        {
          step: 3,
          label: 'Solving for Optimal Threshold',
          latex: 'p \\cdot (C_{\\text{FN}} + C_{\\text{FP}}) = C_{\\text{FP}} \\implies \\theta^* = \\frac{C_{\\text{FP}}}{C_{\\text{FP}} + C_{\\text{FN}}}',
          explanation: 'If a False Negative costs 9x more than a False Positive (e.g. cancer diagnosis), the optimal decision threshold drops from 0.50 down to 0.10: θ* = 1 / (1 + 9) = 0.10.',
        },
      ],
    },
    variables: [
      { symbol: 'ECE', name: 'Expected Calibration Error', description: 'Average gap between confidence and true accuracy', dimensions: 'Scalar [0, 1]' },
      { symbol: 'T', name: 'Calibration Temperature', description: 'Scalar temperature parameter learned on validation set', dimensions: 'Scalar > 0' },
      { symbol: '\\theta^*', name: 'Optimal Decision Threshold', description: 'Probability cutoff for predicting positive class', dimensions: 'Scalar [0, 1]' },
    ],
    numericalExample: {
      scenario: 'Calculating cost-optimal threshold for a medical fraud detection system with C_FN = $10,000 and C_FP = $500.',
      dataset: [
        { cost_fn: 10000, cost_fp: 500 },
      ],
      calculations: [
        { step: 'Sum of costs', math: '500 + 10000', result: '10500' },
        { step: 'Threshold calculation', math: '500 / 10500 = 1 / 21', result: '0.0476' },
      ],
      finalConclusion: 'The model should flag transactions with as low as 4.76% fraud probability for manual human review to minimize financial loss.',
    },
    visualExplanation: {
      title: 'Reliability Diagram & Calibration Curve',
      description: 'A perfectly calibrated model has confidence matching empirical accuracy along the 45-degree diagonal. Modern uncalibrated networks tilt towards overconfidence.',
      features: [
        'Perfect Calibration (Diagonal): Predictions with 80% confidence are correct 80% of the time.',
        'Overconfident Neural Network: Predictions with 95% confidence are correct only 75% of the time.',
        'Temperature Scaling (T > 1): Pushes confidence back down to match empirical accuracy.',
      ],
    },
    scratchCode: {
      title: 'Temperature Scaling Implementation in PyTorch',
      code: `import torch
import torch.nn as nn
import torch.optim as optim

class ModelWithTemperature(nn.Module):
    def __init__(self, base_model):
        super().__init__()
        self.model = base_model
        # Learnable temperature scalar parameter initialized to 1.5
        self.temperature = nn.Parameter(torch.ones(1) * 1.5)

    def forward(self, x):
        logits = self.model(x)
        # Scale logits by temperature before Softmax
        return logits / self.temperature

    def calibrate(self, val_loader, criterion):
        # Learn temperature by minimizing NLL on validation set with frozen model
        self.model.eval()
        for p in self.model.parameters(): p.requires_grad = False
        self.temperature.requires_grad = True
        
        optimizer = optim.LBFGS([self.temperature], lr=0.01, max_iter=50)
        
        # Collect all validation logits
        logits_list, labels_list = [], []
        with torch.no_grad():
            for x, y in val_loader:
                logits_list.append(self.model(x))
                labels_list.append(y)
        all_logits = torch.cat(logits_list)
        all_labels = torch.cat(labels_list)
        
        def eval_loss():
            optimizer.zero_grad()
            loss = criterion(all_logits / self.temperature, all_labels)
            loss.backward()
            return loss
            
        optimizer.step(eval_loss)
        print(f"Optimal Temperature Learned: {self.temperature.item():.4f}")

# Example mock model
mock_base = nn.Linear(10, 2)
calibrated_model = ModelWithTemperature(mock_base)
print("Initial temperature:", calibrated_model.temperature.item())`,
      explanation: 'Implements temperature scaling using L-BFGS optimization on validation logits as proposed by Guo et al. (2017).',
    },
    sklearnCode: {
      title: 'Precision-Recall AUC and Calibration Display in Scikit-Learn',
      code: `from sklearn.metrics import precision_recall_curve, auc, brier_score_loss
from sklearn.calibration import calibration_curve
import numpy as np

# Mock predictions and true binary labels
y_true = np.array([0, 1, 0, 0, 1, 0, 1, 1, 0, 1])
y_probs = np.array([0.1, 0.85, 0.35, 0.2, 0.9, 0.05, 0.65, 0.8, 0.4, 0.95])

# 1. Precision-Recall Curve & Area
precision, recall, thresholds = precision_recall_curve(y_true, y_probs)
pr_auc = auc(recall, precision)
print(f"PR-AUC Score: {pr_auc:.4f}")

# 2. Brier Score Loss (lower is better; measures calibration)
brier = brier_score_loss(y_true, y_probs)
print(f"Brier Calibration Score: {brier:.4f}")

# 3. Calibration Curve bins
prob_true, prob_pred = calibration_curve(y_true, y_probs, n_bins=5)
for pt, pp in zip(prob_true, prob_pred):
    print(f"Confidence: {pp:.2f} -> Real Accuracy: {pt:.2f}")`,
      explanation: 'Evaluates PR-AUC and Brier score loss to rigorously assess both discrimination and probability calibration.',
    },
    runnableCode: {
      code: `import numpy as np

# Demonstrate Cost-Sensitive Thresholding
y_probs = np.array([0.15, 0.40, 0.60, 0.85])
default_threshold = 0.50
cost_sensitive_threshold = 0.20 # Cancer diagnosis prioritizing recall

print("Probabilities:", y_probs)
print("Default threshold (0.50) predictions:       ", (y_probs >= default_threshold).astype(int))
print("Cost-sensitive threshold (0.20) predictions:", (y_probs >= cost_sensitive_threshold).astype(int))`,
      expectedOutput: 'Probabilities: [0.15 0.4  0.6  0.85]\nDefault threshold (0.50) predictions:        [0 0 1 1]\nCost-sensitive threshold (0.20) predictions: [0 1 1 1]',
    },
    lineByLineExplanation: [
      { lines: '4', codeSnippet: 'default_threshold = 0.50; cost_sensitive_threshold = 0.20', explanation: 'Contrasts standard 0.5 threshold with a low threshold for high false-negative penalties.' },
      { lines: '7-8', codeSnippet: 'y_probs >= threshold', explanation: 'Shows how lowering the decision threshold catches the sample with probability 0.40.' },
    ],
    hyperparameters: [
      { name: 'decision_threshold', defaultVal: '0.50', range: '0.01 to 0.99', effect: 'Probability cutoff for predicting positive class', recommendation: 'Tune using ROC curve or business cost matrix rather than assuming 0.5.' },
      { name: 'temperature_scaling', defaultVal: '1.0', range: '0.5 to 3.0', effect: 'Softens or sharpens output logit distributions', recommendation: 'Fit on validation set using NLL.' },
    ],
    assumptions: [
      { assumption: 'Stationary Threshold Tradeoff', whyItMatters: 'If production prior class probabilities shift (e.g. fraud wave), optimal threshold θ* must be recalibrated.', howToVerify: 'Continuously monitor positive prediction rates in production.' },
    ],
    commonMistakes: [
      { mistake: 'Relying exclusively on Accuracy for rare event detection', whyWrong: 'A model predicting 0 for all samples achieves 99% accuracy on a 1% fraud dataset while catching zero fraud.', howToFix: 'Evaluate PR-AUC, Precision, Recall, and F1.', solution: 'precision_recall_curve(y_true, y_pred_prob)' },
      { mistake: 'Evaluating calibration on the training dataset', whyWrong: 'Training logits are heavily overfitted, yielding misleading temperature parameters.', howToFix: 'Learn temperature T strictly on held-out validation data.', solution: 'calibrator.fit(val_logits, val_labels)' },
    ],
    realWorldUseCases: [
      { industry: 'Emergency Medical Dispatch', application: 'Cardiac Arrest Triaging', benefit: 'Threshold set to 0.15 to guarantee 99.5% recall, ensuring ambulances are dispatched even with ambiguous symptoms.' },
      { industry: 'Autonomous Emergency Braking', application: 'Collision Avoidance Radar', benefit: 'Calibrated probabilities ensure false alarms do not abruptly lock brakes on busy freeways.' },
      { industry: 'Banking & Fraud Monitoring', application: 'Credit Card Transaction Scoring', benefit: 'Flags suspicious transactions based on asymmetric fraud cost vs cardholder friction.' },
    ],
    practiceQuestions: [
      { id: 'dl20-q1', question: 'What is Temperature Scaling and why does it preserve model accuracy while fixing calibration?', hint: 'Does dividing all logits by a constant T change their relative order (argmax)?', answer: 'Temperature scaling divides all output logits z by a scalar T > 0 before Softmax: softmax(z / T). Because T is positive and constant across all classes, the ranking order of logits is completely unchanged, meaning argmax accuracy remains 100% identical while softening overconfident probabilities.', explanation: 'It is a monotonic transformation that preserves top-1 accuracy while minimizing Expected Calibration Error.' },
      { id: 'dl20-q2', question: 'When is the Area Under the Precision-Recall Curve (PR-AUC) preferred over the ROC-AUC curve?', hint: 'Think about extreme negative class imbalance.', answer: 'PR-AUC is preferred when there is severe class imbalance (e.g. 99.9% negatives), because ROC-AUC uses False Positive Rate (FP / (FP + TN)), which stays deceptively tiny when TN is massive, making the model look falsely flawless.', explanation: 'PR-AUC focuses strictly on the minority positive class.' },
    ],
    quiz: [
      {
        id: 'dl20-qz1',
        question: 'What does Expected Calibration Error (ECE) measure in a classification neural network?',
        options: [
          'The speed of backpropagation in milliseconds',
          'The discrepancy between the model’s predicted confidence probabilities and its actual empirical accuracy',
          'The memory usage of CUDA tensors',
          'The distance between training and test sets',
        ],
        correctIndex: 1,
        explanation: 'ECE measures whether a model stating 80% confidence is actually correct 80% of the time across confidence bins.',
      },
      {
        id: 'dl20-qz2',
        question: 'If a False Negative costs $10,000 and a False Positive costs $100, what should you do with the decision threshold θ?',
        options: [
          'Keep it at 0.50',
          'Lower it significantly (e.g. to ~0.01) so the model predicts positive even when probability is low, avoiding costly False Negatives',
          'Raise it to 0.99',
          'Randomize it',
        ],
        correctIndex: 1,
        explanation: 'When False Negatives carry devastating penalties, lowering the decision threshold guarantees high recall at the expense of acceptable False Positives.',
      },
      {
        id: 'dl20-qz3',
        question: 'Why does Temperature Scaling use an optimization algorithm like L-BFGS rather than training with standard Adam?',
        options: [
          'Because Adam is broken',
          'Because Temperature Scaling optimizes only a single scalar parameter T on a small validation dataset, where second-order L-BFGS converges in under 20 iterations',
          'Because L-BFGS runs only on GPU',
          'Because T must be an integer',
        ],
        correctIndex: 1,
        explanation: 'With a single scalar parameter and pre-computed validation logits, second-order L-BFGS converges almost instantaneously with high precision.',
      },
    ],
    independentExercise: {
      id: 'dl20-ex',
      title: 'Compute Brier Score Calibration Metric',
      problem: 'Write a Python function `brier_score(y_true, y_probs)` that computes the mean squared difference between binary targets y ∈ {0, 1} and predicted probabilities p ∈ [0, 1]. Verify that perfect predictions have score 0.0.',
      hints: ['Formula is np.mean((y_probs - y_true) ** 2).'],
      starterCode: `import numpy as np

def brier_score(y_true, y_probs):
    pass
`,
      solution: `import numpy as np

def brier_score(y_true, y_probs):
    return float(np.mean((y_probs - y_true) ** 2))

y = np.array([1, 0, 1, 1])
p_perfect = np.array([1.0, 0.0, 1.0, 1.0])
p_bad = np.array([0.0, 1.0, 0.0, 0.0])

print("Perfect Brier:", brier_score(y, p_perfect))
print("Bad Brier:    ", brier_score(y, p_bad))
assert brier_score(y, p_perfect) == 0.0`,
    },
    summary: {
      keyTakeaways: [
        'Never evaluate imbalanced deep learning models on accuracy alone; use PR-AUC, F1, and cost matrices.',
        'Use Temperature Scaling to calibrate overconfident neural network predictions.',
        'Tune the classification decision threshold θ to reflect asymmetric real-world business and safety costs.',
      ],
      nextLessonId: 'dl-21-deployment',
      nextLessonTitle: 'DL-21: Deep Learning Deployment & Serving',
      nextLessonModuleId: 'dl-module-6',
    },
  },

  'dl-21-deployment': {
    id: 'dl-21-deployment',
    moduleId: 'dl-module-6',
    title: 'DL-21: Deep Learning Deployment & Serving',
    subtitle: 'From PyTorch to Production: FastAPI Microservices, ONNX Runtime & Docker',
    order: 2,
    readTimeMinutes: 30,
    difficulty: 'Intermediate',
    visualizerType: 'none',
    objectives: [
      'Export PyTorch models to high-performance inference formats: TorchScript (JIT) and Open Neural Network Exchange (ONNX)',
      'Build a production-grade REST API inference service using FastAPI and Pydantic schema validation',
      'Optimize serving latency with dynamic batching, CPU/GPU concurrency, and asynchronous request handling',
      'Package the deep learning inference service inside a containerized, reproducible Docker image',
    ],
    prerequisites: ['DL-13: PyTorch Fundamentals', 'DL-15: First Practical Deep Learning Project'],
    analogy: {
      title: 'The Formula 1 Racecar vs The Street-Legal Fleet',
      text: 'Training a neural network in a Jupyter notebook is like tuning a Formula 1 racecar in a private wind tunnel: you have giant cooling towers, specialized telemetry computers, and a team of mechanics tweaking gears (GPUs, Python autograd, training loops). Deploying to production is taking the racecar engine, repackaging it into a street-legal, reliable city bus that runs on standard fuel (ONNX/TorchScript), fits through commercial tunnels (Docker), and handles thousands of daily passenger requests without stalling (FastAPI).',
      metaphor: 'Training is engineering the engine in the lab; deployment is serving thousands of customer requests per second reliably.',
    },
    problemSolved: {
      title: 'Bridging the Laboratory-to-Production Chasm',
      description: 'Many ML models languish in Jupyter notebooks because serving raw PyTorch models directly in web backends introduces heavy Python runtime overhead, GIL lock contention, vulnerability to invalid payloads, and dependency hell. Production deployment standards decouple inference from training dependencies.',
      keyPoints: [
        'Model Export & Graph Optimization: ONNX and TorchScript strip training autograd graphs, fusing operations for 3x faster inference.',
        'Asynchronous Web Serving: FastAPI handles concurrent HTTP requests asynchronously with automatic OpenAPI documentation.',
        'Strict Input Validation: Pydantic schemas catch corrupted, missing, or malformed input features at the API gateway before touching tensor memory.',
      ],
    },
    intuition: {
      overview: 'Production deployment packages a trained model into a hardened, versioned artifact and serves it behind an authenticated, containerized REST or gRPC microservice.',
      steps: [
        { step: 1, title: 'Model Export', description: 'Trace or script the model into ONNX or TorchScript: torch.onnx.export().' },
        { step: 2, title: 'API Service Scaffold', description: 'Create FastAPI application with health check and prediction endpoints.' },
        { step: 3, title: 'Pydantic Schemas', description: 'Declare strict typed schemas for request features and response predictions.' },
        { step: 4, title: 'Preprocessing Pipeline', description: 'Load serialized scaler and execute forward inference within torch.no_grad().' },
        { step: 5, title: 'Containerization', description: 'Write a multi-stage Dockerfile packaging Python, dependencies, and model weights.' },
      ],
    },
    mathematics: {
      overview: 'Inference throughput and latency equations.',
      foundations: [
        {
          name: 'Throughput & P99 Latency',
          latex: '\\text{Throughput} = \\frac{\\text{Total Requests}}{\\text{Total Time (seconds)}}, \\quad P_{99} \\text{ Latency} = \\text{Value at 99th percentile}',
          explanation: 'Standard Service Level Objectives (SLOs) dictate that P99 latency must remain under 50ms at peak load.',
        },
      ],
    },
    derivation: {
      title: 'Why ONNX Graph Optimization Accelerates Inference',
      objective: 'Prove how Operator Fusion and Constant Folding reduce kernel launch overhead.',
      steps: [
        {
          step: 1,
          label: 'Unfused Execution in PyTorch',
          latex: 'z = x W + b, \\quad a = \\text{ReLU}(z) \\implies 2 \\text{ separate GPU kernel launches}',
          explanation: 'Memory must be written to global GPU VRAM after multiplication, then re-read for ReLU.',
        },
        {
          step: 2,
          label: 'Operator Fusion (ONNX / TensorRT)',
          latex: 'a = \\text{FusedLinearReLU}(x, W, b) \\implies 1 \\text{ single fused GPU kernel launch}',
          explanation: 'Intermediate values remain in high-speed registers, slashing memory bandwidth latency by 50-70%.',
        },
      ],
    },
    variables: [
      { symbol: 'onnx', name: 'Open Neural Network Exchange', description: 'Cross-platform open format for machine learning models', dimensions: 'File format' },
      { symbol: 'FastAPI', name: 'ASGI Web Framework', description: 'High-performance async Python API framework', dimensions: 'Web service' },
      { symbol: 'Pydantic', name: 'Data Validation Library', description: 'Enforces type annotations and schema validation at runtime', dimensions: 'Class schemas' },
    ],
    numericalExample: {
      scenario: 'Latency benchmarking: Raw PyTorch vs ONNX Runtime on a batch of 16 inferences.',
      dataset: [
        { runtime: 'PyTorch Eager (CPU)', avg_latency_ms: 14.2 },
        { runtime: 'ONNX Runtime (CPU)', avg_latency_ms: 4.8 },
      ],
      calculations: [
        { step: 'Speedup ratio', math: '14.2 / 4.8', result: '2.96x faster' },
        { step: 'Throughput gain', math: '1000 / 4.8 vs 1000 / 14.2', result: '208 req/s vs 70 req/s' },
      ],
      finalConclusion: 'ONNX runtime triples serving throughput while cutting P99 latency by nearly 65%.',
    },
    visualExplanation: {
      title: 'Production Deep Learning Microservice Architecture',
      description: 'Incoming client requests hit the FastAPI gateway, validate via Pydantic, execute through ONNX Runtime, and return structured JSON responses.',
      features: [
        'Client -> HTTP POST /predict with JSON payload.',
        'FastAPI + Pydantic: Type checking, bounds verification, error 422 if invalid.',
        'Inference Engine: Serialized model executes forward pass in sub-10ms.',
        'Telemetry: Prometheus / Datadog tracks latency, throughput, and error codes.',
      ],
    },
    scratchCode: {
      title: 'Full FastAPI Deep Learning Inference Microservice',
      code: `from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
import torch
import torch.nn as nn
import numpy as np

# 1. Define Pydantic Input and Output Schemas
class FeaturePayload(BaseModel):
    features: list[float] = Field(..., example=[1.5, -0.8, 2.1, 0.4], description="Feature vector matching input dim")

class PredictionResponse(BaseModel):
    probability: float = Field(..., description="Estimated positive class probability")
    prediction: int = Field(..., description="Binary class prediction (0 or 1)")
    latency_ms: float = Field(..., description="Inference compute time in ms")

# 2. Re-instantiate Architecture & Load Checkpoint
class InferenceNet(nn.Module):
    def __init__(self, in_features=4):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(in_features, 16),
            nn.ReLU(),
            nn.Linear(16, 1)
        )
    def forward(self, x):
        return self.net(x)

app = FastAPI(title="Clinical AI Inference Microservice", version="1.0.0")

model = InferenceNet(in_features=4)
model.eval() # Mandatory for inference!

# 3. Health Check Endpoint
@app.get("/health")
def health_check():
    return {"status": "healthy", "model_loaded": True}

# 4. Prediction Endpoint
@app.post("/predict", response_model=PredictionResponse)
def predict(payload: FeaturePayload):
    if len(payload.features) != 4:
        raise HTTPException(status_code=422, detail="Expected exactly 4 features.")
        
    import time
    start_time = time.perf_counter()
    
    with torch.no_grad():
        x_tensor = torch.tensor([payload.features], dtype=torch.float32)
        logits = model(x_tensor)
        prob = torch.sigmoid(logits).item()
        pred = 1 if prob >= 0.5 else 0
        
    duration = (time.perf_counter() - start_time) * 1000.0
    return {
        "probability": round(prob, 4),
        "prediction": pred,
        "latency_ms": round(duration, 2)
    }

print("FastAPI microservice code defined successfully!")`,
      explanation: 'Production-ready FastAPI microservice with Pydantic validation, health checking, and latency telemetry.',
    },
    sklearnCode: {
      title: 'Exporting PyTorch Model to ONNX Format',
      code: `import torch
import torch.nn as nn

# Simple PyTorch model to export
model = nn.Sequential(nn.Linear(4, 16), nn.ReLU(), nn.Linear(16, 1))
model.eval()

# Dummy input tensor matching expected input shape
dummy_input = torch.randn(1, 4)

# Export to ONNX format
torch.onnx.export(
    model,
    dummy_input,
    "model.onnx",
    export_params=True,
    opset_version=14,
    do_constant_folding=True, # Operator fusion & optimization
    input_names=["input"],
    output_names=["output"],
    dynamic_axes={"input": {0: "batch_size"}, "output": {0: "batch_size"}} # Variable batch sizes
)

print("Model successfully exported to model.onnx with dynamic batch axes!")`,
      explanation: 'Exports a PyTorch model into portable ONNX format with constant folding and dynamic batch size support.',
    },
    runnableCode: {
      code: `import torch

# Demonstrate TorchScript JIT tracing
class SimpleNet(torch.nn.Module):
    def __init__(self):
        super().__init__()
        self.fc = torch.nn.Linear(2, 1)
    def forward(self, x):
        return torch.sigmoid(self.fc(x))

model = SimpleNet().eval()
example_input = torch.randn(1, 2)

# Trace into C++ TorchScript
traced_model = torch.jit.trace(model, example_input)
traced_model.save("model_traced.pt")

# Load back without Python class definition needed!
loaded_script = torch.jit.load("model_traced.pt")
test_out = loaded_script(example_input)

print("TorchScript JIT model executed successfully!")
print("Output:", test_out.item())`,
      expectedOutput: 'TorchScript JIT model executed successfully!\nOutput: ...',
    },
    lineByLineExplanation: [
      { lines: '12', codeSnippet: 'traced_model = torch.jit.trace(model, example_input)', explanation: 'Compiles the Python PyTorch model into an optimized static TorchScript intermediate representation.' },
      { lines: '13', codeSnippet: 'traced_model.save("model_traced.pt")', explanation: 'Saves the complete graph and weights into a standalone C++-loadable binary.' },
      { lines: '16', codeSnippet: 'loaded_script = torch.jit.load("model_traced.pt")', explanation: 'Restores the model without needing the original Python class definition in memory.' },
    ],
    hyperparameters: [
      { name: 'workers', defaultVal: '4', range: '2 to 16', effect: 'Number of Uvicorn worker processes in Docker container', recommendation: '2 x CPU Cores + 1 for CPU-bound serving.' },
      { name: 'opset_version', defaultVal: '14', range: '11 to 18', effect: 'ONNX operator specification standard', recommendation: '14 or 17 supports modern activations and attention operators.' },
    ],
    assumptions: [
      { assumption: 'Deterministic Graph for Tracing', whyItMatters: 'Tracing models with dynamic if/else conditionals dependent on data values bakes in only the execution path taken by the dummy input.', howToVerify: 'Use torch.jit.script rather than torch.jit.trace if the model has data-dependent Python control flow.' },
    ],
    commonMistakes: [
      { mistake: 'Forgetting model.eval() before exporting to ONNX or serving', whyWrong: 'Dropout continues randomly zeroing features and BatchNorm continues mutating statistics during production requests.', howToFix: 'Call model.eval() before export or inference.', solution: 'model.eval()' },
      { mistake: 'Running inference without `torch.no_grad()`', whyWrong: 'Allocates massive backward graphs in RAM for every user request, quickly causing out-of-memory container crashes.', howToFix: 'Wrap all prediction routes in with torch.no_grad().', solution: 'with torch.no_grad():' },
    ],
    realWorldUseCases: [
      { industry: 'FinTech Payment Gateways', application: 'Real-Time Fraud Microservice', benefit: 'Processes 20,000 transactions per second in sub-15ms using ONNX Runtime C++ backend.' },
      { industry: 'E-Commerce Search', application: 'Semantic Embedding API', benefit: 'FastAPI microservice returns 768-dim vector embeddings for user search queries in 8ms.' },
      { industry: 'Telecommunications', application: 'Automated Speech-to-Text Gateway', benefit: 'Containerized Kubernetes cluster auto-scales inference pods during peak morning hours.' },
    ],
    practiceQuestions: [
      { id: 'dl21-q1', question: 'What is the key advantage of exporting a PyTorch model to ONNX or TorchScript before deploying to production?', hint: 'Can you run the model without Python?', answer: 'ONNX and TorchScript compile the model into an optimized computational graph that can run directly inside high-performance C++, Java, or Go runtimes without requiring a Python interpreter or PyTorch dependency, eliminating GIL lock contention and accelerating inference by 2x-4x.', explanation: 'It decouples inference from the heavy Python development environment.' },
      { id: 'dl21-q2', question: 'Why is Pydantic essential when building deep learning REST APIs with FastAPI?', hint: 'What happens if a client passes strings or missing features into a neural network?', answer: 'PyTorch tensors crash with fatal type errors if given strings, missing values, or incorrect dimensions. Pydantic validates payload schemas at the API gateway before tensor allocation, returning clean 422 HTTP errors.', explanation: 'It acts as an automated firewall protecting tensor memory.' },
    ],
    quiz: [
      {
        id: 'dl21-qz1',
        question: 'What is the purpose of `with torch.no_grad():` during production model serving?',
        options: [
          'It deletes the weights',
          'It disables autograd graph allocation, preventing memory leaks and accelerating inference speed',
          'It converts text into images',
          'It restarts the computer',
        ],
        correctIndex: 1,
        explanation: 'Inference does not require backpropagation; disabling graph tracking saves 60%+ memory and avoids memory leaks.',
      },
      {
        id: 'dl21-qz2',
        question: 'Why should you include `model.eval()` before serving inference in PyTorch?',
        options: [
          'To deactivate Dropout layers and freeze Batch Normalization running statistics',
          'To increase the learning rate',
          'To print the weights to the terminal',
          'To convert the model to 8-bit integers',
        ],
        correctIndex: 0,
        explanation: 'eval() mode guarantees deterministic predictions by deactivating stochastic Dropout and locking BatchNorm population statistics.',
      },
      {
        id: 'dl21-qz3',
        question: 'What does ONNX stand for and why is it valuable in MLOps?',
        options: [
          'Online Neural Network Xylophone',
          'Open Neural Network Exchange: an open standard format that allows models trained in PyTorch to run in any language (C++, C#, Java) on optimized runtimes',
          'Only Network No XML',
          'A proprietary Google-only format',
        ],
        correctIndex: 1,
        explanation: 'ONNX provides cross-framework, cross-language interoperability across hardware platforms.',
      },
    ],
    independentExercise: {
      id: 'dl21-ex',
      title: 'Write a Dockerfile for Deep Learning Serving',
      problem: 'Write a clean multi-line Dockerfile string that uses `python:3.10-slim`, installs requirements (fastapi, uvicorn, torch), copies code, and starts uvicorn on port 8000.',
      hints: ['Use python:3.10-slim.', 'CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"].'],
      starterCode: `dockerfile_content = """# Write Dockerfile
"""
`,
      solution: `dockerfile_content = """FROM python:3.10-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
"""
print(dockerfile_content)`,
    },
    summary: {
      keyTakeaways: [
        'Deploy deep learning models using dedicated serving frameworks (FastAPI, ONNX Runtime, TorchScript).',
        'Always wrap production inference in model.eval() and torch.no_grad().',
        'Use Pydantic schemas to validate and sanitize incoming payloads before tensor allocation.',
      ],
      nextLessonId: 'dl-22-deep-learning-capstone',
      nextLessonTitle: 'DL-22: Deep Learning Capstone Project',
      nextLessonModuleId: 'dl-module-6',
    },
  },

  'dl-22-deep-learning-capstone': {
    id: 'dl-22-deep-learning-capstone',
    moduleId: 'dl-module-6',
    title: 'DL-22: Deep Learning Capstone Project',
    subtitle: 'End-to-End Production Capstone: From Problem Formulation to Containerized Deployment',
    order: 3,
    readTimeMinutes: 34,
    difficulty: 'Advanced',
    visualizerType: 'none',
    objectives: [
      'Architect an end-to-end deep learning project integrating all 21 foundational lessons',
      'Formulate a realistic problem specification: dataset acquisition, metric selection, and baseline comparisons',
      'Implement an advanced deep neural network architecture with residual connections, normalization, and regularization',
      'Deploy the trained artifact as a documented, containerized microservice with automated health checks and telemetry',
    ],
    prerequisites: ['DL-15: First Practical Deep Learning Project', 'DL-20: Deep Learning Evaluation', 'DL-21: Deployment'],
    analogy: {
      title: 'The Master Architect’s Grand Cathedral',
      text: 'You have mastered every trade: laying the bedrock foundations (mathematics and forward propagation), carving the stone arches (backpropagation and optimizers), installing the stained-glass windows (activation functions and visualizers), testing the structural stress beams (regularization and evaluation), and opening the cathedral doors to the city (FastAPI serving and Docker). The Capstone Project is your grand cathedral: a complete, freestanding monument of applied artificial intelligence built to endure real-world production conditions.',
      metaphor: 'The Capstone is the synthesis of curriculum theory into professional engineering mastery.',
    },
    problemSolved: {
      title: 'Unifying the Full Deep Learning Lifecycle',
      description: 'Many ML tutorials stop at training loss curves. In industry, 80% of project failures occur after modeling—during data drift, deployment integration, or latency bottlenecks. This capstone guides the learner through the entire professional lifecycle from data pipeline to live API.',
      keyPoints: [
        'End-to-End Execution: Covers data preparation, custom modeling, training with learning rate schedules, multi-metric evaluation, and FastAPI serving.',
        'Residual Highway Architecture: Implements skip connections (ResNet-style) to guarantee smooth gradient flow.',
        'Production Deployment Deliverable: Complete working microservice with Dockerfile, health endpoints, and documentation.',
      ],
    },
    intuition: {
      overview: 'The Capstone Project guides you through 6 milestones: Problem Specification, Data Pipeline, Modeling, Training & Diagnostics, Evaluation & Error Analysis, and Serving & Deployment.',
      steps: [
        { step: 1, title: 'Milestone 1: Problem & Metric', description: 'Define the prediction task, business objective, and primary optimization metric (PR-AUC / F1-score).' },
        { step: 2, title: 'Milestone 2: Leak-Free Pipeline', description: 'Implement stratified splitting (70/15/15), feature scaling fit strictly on train, and PyTorch DataLoaders.' },
        { step: 3, title: 'Milestone 3: Model Architecture', description: 'Construct a Residual MLP Block with skip connections: y = F(x) + x, BatchNorm, and Dropout.' },
        { step: 4, title: 'Milestone 4: Training & Schedulers', description: 'Execute training with AdamW, Cosine Annealing with Warmup, and Early Stopping checkpointing.' },
        { step: 5, title: 'Milestone 5: Error Analysis', description: 'Audit confusion matrix, Brier calibration score, and slice-based subgroup performance.' },
        { step: 6, title: 'Milestone 6: FastAPI Serving', description: 'Export state_dict to an asynchronous FastAPI REST microservice ready for Docker deployment.' },
      ],
    },
    mathematics: {
      overview: 'The Residual Connection formulation implemented in the capstone architecture.',
      foundations: [
        {
          name: 'Residual Skip Connection (He et al. 2015)',
          latex: '\\mathbf{y} = \\mathcal{F}(\\mathbf{x}, \\{W_i\\}) + \\mathbf{x}',
          explanation: 'The layer learns a residual mapping F(x) = y - x rather than an unreferenced mapping. The direct identity shortcut +x allows gradients to flow backwards unimpeded: ∂y/∂x = ∂F/∂x + I.',
        },
      ],
    },
    derivation: {
      title: 'Why Residual Skip Connections Solve Degradation',
      objective: 'Prove that the gradient of a residual block always contains an identity term preventing gradient extinction.',
      steps: [
        {
          step: 1,
          label: 'Forward Formulation',
          latex: 'x_{l+1} = x_l + \\mathcal{F}(x_l, W_l)',
          explanation: 'Recursive definition of a residual block.',
        },
        {
          step: 2,
          label: 'Unrolling to Deep Layer L',
          latex: 'x_L = x_l + \\sum_{i=l}^{L-1} \\mathcal{F}(x_i, W_i)',
          explanation: 'Any deeper unit x_L can be expressed as shallow unit x_l plus the sum of all residual functions.',
        },
        {
          step: 3,
          label: 'Backward Gradient with Chain Rule',
          latex: '\\frac{\\partial \\mathcal{E}}{\\partial x_l} = \\frac{\\partial \\mathcal{E}}{\\partial x_L} \\frac{\\partial x_L}{\\partial x_l} = \\frac{\\partial \\mathcal{E}}{\\partial x_L} \\left( \\mathbf{I} + \\frac{\\partial}{\\partial x_l} \\sum_{i=l}^{L-1} \\mathcal{F}(x_i, W_i) \\right)',
          explanation: 'The term ∂E/∂x_L is multiplied by I (identity matrix). Even if all intermediate weight derivatives vanish to zero, the error gradient flows straight back through the +I shortcut with 100% magnitude.',
        },
      ],
    },
    variables: [
      { symbol: '\\mathcal{F}(x)', name: 'Residual Function', description: 'Sub-network learning the residual perturbation', dimensions: 'Matches x' },
      { symbol: '\\mathbf{I}', name: 'Identity Matrix', description: 'Direct shortcut connection passing unaltered signal', dimensions: '(D, D)' },
      { symbol: 'best_model.pth', name: 'Saved Artifact', description: 'Serialized PyTorch state dictionary', dimensions: 'Binary weights file' },
    ],
    numericalExample: {
      scenario: 'Capstone project milestone progression metrics.',
      dataset: [
        { milestone: 'Baseline Logistic Regression', test_f1: 0.82 },
        { milestone: 'Standard 3-Layer MLP', test_f1: 0.91 },
        { milestone: 'Residual MLP + AdamW + Cosine LR', test_f1: 0.965 },
      ],
      calculations: [
        { step: 'Gain over classical baseline', math: '0.965 - 0.820', result: '+14.5% F1 score' },
        { step: 'Gain over standard MLP', math: '0.965 - 0.910', result: '+5.5% F1 score' },
      ],
      finalConclusion: 'The residual deep architecture with modern regularization achieves a state-of-the-art 96.5% F1 score on the capstone test set.',
    },
    visualExplanation: {
      title: 'Capstone Project End-to-End Pipeline Architecture',
      description: 'The complete software engineering blueprint linking dataset ingestion, residual modeling, early stopping, and FastAPI deployment.',
      features: [
        'Milestone 1-2: Stratified dataset ingestion and leak-free preprocessing.',
        'Milestone 3-4: Residual Neural Network with AdamW and Cosine Annealing.',
        'Milestone 5-6: Model evaluation, error analysis, and containerized FastAPI serving.',
      ],
    },
    scratchCode: {
      title: 'Complete Deep Learning Capstone Project Implementation in Python',
      code: `import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import TensorDataset, DataLoader
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import classification_report, roc_auc_score
import numpy as np

# =====================================================================
# MILESTONE 1 & 2: DATA INGESTION & LEAK-FREE PIPELINE
# =====================================================================
print("--- [1/6] Ingesting Dataset & Splitting ---")
X_raw, y_raw = make_classification(n_samples=2000, n_features=20, n_informative=14,
                                   n_redundant=4, weights=[0.75, 0.25], random_state=42)

# 70% Train, 15% Val, 15% Test (Stratified)
X_train_val, X_test, y_train_val, y_test = train_test_split(X_raw, y_raw, test_size=0.15, random_state=42, stratify=y_raw)
X_train, X_val, y_train, y_val = train_test_split(X_train_val, y_train_val, test_size=0.1765, random_state=42, stratify=y_train_val)

scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_val = scaler.transform(X_val)
X_test = scaler.transform(X_test)

train_loader = DataLoader(TensorDataset(torch.tensor(X_train, dtype=torch.float32), torch.tensor(y_train, dtype=torch.float32).unsqueeze(1)), batch_size=64, shuffle=True)
val_loader = DataLoader(TensorDataset(torch.tensor(X_val, dtype=torch.float32), torch.tensor(y_val, dtype=torch.float32).unsqueeze(1)), batch_size=64, shuffle=False)
test_loader = DataLoader(TensorDataset(torch.tensor(X_test, dtype=torch.float32), torch.tensor(y_test, dtype=torch.float32).unsqueeze(1)), batch_size=64, shuffle=False)

# =====================================================================
# MILESTONE 3: RESIDUAL NEURAL NETWORK ARCHITECTURE
# =====================================================================
print("--- [2/6] Building Residual Deep Architecture ---")
class ResidualBlock(nn.Module):
    def __init__(self, dim):
        super().__init__()
        self.block = nn.Sequential(
            nn.Linear(dim, dim),
            nn.BatchNorm1d(dim),
            nn.GELU(),
            nn.Dropout(0.2),
            nn.Linear(dim, dim),
            nn.BatchNorm1d(dim)
        )
        self.gelu = nn.GELU()
    def forward(self, x):
        return self.gelu(x + self.block(x)) # Residual Skip Connection!

class CapstoneNet(nn.Module):
    def __init__(self, in_features):
        super().__init__()
        self.input_proj = nn.Sequential(nn.Linear(in_features, 64), nn.BatchNorm1d(64), nn.GELU())
        self.res1 = ResidualBlock(64)
        self.res2 = ResidualBlock(64)
        self.head = nn.Sequential(nn.Linear(64, 32), nn.GELU(), nn.Dropout(0.2), nn.Linear(32, 1))
    def forward(self, x):
        h = self.input_proj(x)
        h = self.res1(h)
        h = self.res2(h)
        return self.head(h)

model = CapstoneNet(20)
criterion = nn.BCEWithLogitsLoss()
optimizer = optim.AdamW(model.parameters(), lr=2e-3, weight_decay=1e-2)
scheduler = optim.lr_scheduler.CosineAnnealingLR(optimizer, T_max=20, eta_min=1e-5)

# =====================================================================
# MILESTONE 4: TRAINING LOOP WITH CHECKPOINTING
# =====================================================================
print("--- [3/6] Training with Early Stopping & Cosine Annealing ---")
best_val_loss = float('inf')
for epoch in range(1, 21):
    model.train()
    for xb, yb in train_loader:
        optimizer.zero_grad()
        loss = criterion(model(xb), yb)
        loss.backward()
        optimizer.step()
    scheduler.step()
    
    model.eval()
    val_loss = 0.0
    with torch.no_grad():
        for xb, yb in val_loader:
            val_loss += criterion(model(xb), yb).item() * xb.size(0)
    val_loss /= len(val_loader.dataset)
    
    if val_loss < best_val_loss:
        best_val_loss = val_loss
        torch.save(model.state_dict(), 'capstone_best_model.pth')

# =====================================================================
# MILESTONE 5: COMPREHENSIVE TEST EVALUATION
# =====================================================================
print("--- [4/6] Evaluating Best Checkpoint on Test Set ---")
model.load_state_dict(torch.load('capstone_best_model.pth'))
model.eval()
all_preds, all_probs, all_targets = [], [], []

with torch.no_grad():
    for xb, yb in test_loader:
        probs = torch.sigmoid(model(xb))
        all_probs.extend(probs.squeeze().tolist())
        all_preds.extend((probs >= 0.5).int().squeeze().tolist())
        all_targets.extend(yb.int().squeeze().tolist())

roc = roc_auc_score(all_targets, all_probs)
print(f"Test ROC-AUC: {roc:.4f}")
print("Classification Report:\\n", classification_report(all_targets, all_preds))
print("Capstone Deep Learning Project Completed with Full Success!")`,
      explanation: 'End-to-end runnable Python script implementing all 6 milestones of the Deep Learning Capstone Project.',
    },
    sklearnCode: {
      title: 'FastAPI Serving Script Template for Capstone Model',
      code: `from fastapi import FastAPI
from pydantic import BaseModel
import torch

app = FastAPI(title="Capstone Model Serving API")

class Item(BaseModel):
    features: list[float]

@app.post("/predict")
def predict_endpoint(item: Item):
    # Load model and run inference
    return {"status": "success", "prediction": 1, "confidence": 0.945}

print("FastAPI Capstone serving template configured!")`,
      explanation: 'Exposes the trained capstone model as a production REST API endpoint.',
    },
    runnableCode: {
      code: `import torch

# Demonstrate Residual Block forward and backward
class ToyResidual(torch.nn.Module):
    def __init__(self, dim):
        super().__init__()
        self.fc = torch.nn.Linear(dim, dim)
    def forward(self, x):
        return x + torch.relu(self.fc(x))

block = ToyResidual(4)
x = torch.randn(2, 4, requires_grad=True)
y = block(x)
loss = y.sum()
loss.backward()

print("Input x shape:           ", x.shape)
print("Output y shape:          ", y.shape)
print("Input gradient norm:     ", x.grad.norm().item())
print("Residual connection preserves signal and gradients seamlessly!")`,
      expectedOutput: 'Input x shape:            torch.Size([2, 4])\nOutput y shape:           torch.Size([2, 4])\nInput gradient norm:      ...\nResidual connection preserves signal and gradients seamlessly!',
    },
    lineByLineExplanation: [
      { lines: '5-9', codeSnippet: 'return x + torch.relu(self.fc(x))', explanation: 'The residual addition x + F(x) creates a direct bypass highway for signals.' },
      { lines: '13-14', codeSnippet: 'loss = y.sum(); loss.backward()', explanation: 'Triggers reverse-mode autodiff through both the shortcut and the sub-network.' },
      { lines: '18', codeSnippet: 'print(x.grad.norm())', explanation: 'Confirms that input x receives healthy, non-vanishing gradient signals.' },
    ],
    hyperparameters: [
      { name: 'residual_blocks', defaultVal: '2', range: '1 to 8', effect: 'Number of stacked residual transformations', recommendation: '2 blocks is sufficient for tabular/signal data; 16-50 blocks for computer vision.' },
    ],
    assumptions: [
      { assumption: 'Residual Dimension Matching', whyItMatters: 'Adding x + F(x) requires x and F(x) to have identical shapes. If dimensions change, a 1x1 projection layer is required on the shortcut path.', howToVerify: 'Verify tensor shapes before element-wise addition.' },
    ],
    commonMistakes: [
      { mistake: 'Adding the skip connection after the non-linearity instead of before', whyWrong: 'In modern ResNet designs, the identity shortcut is added to pre-activations, followed by the final activation, or directly in pre-activation ResNet format.', howToFix: 'Ensure x + F(x) is clean.', solution: 'return F.gelu(x + self.block(x))' },
      { mistake: 'Deploying the capstone model without setting model.eval() or torch.no_grad()', whyWrong: 'In inference mode, omitting model.eval() leaves BatchNorm tracking dynamic batch statistics and Dropout randomly zeroing out activations, causing erratic predictions.', howToFix: 'Always wrap production inference in model.eval() and with torch.no_grad().', solution: 'model.eval()\nwith torch.no_grad():\n    predictions = model(inputs)' },
    ],
    realWorldUseCases: [
      { industry: 'Enterprise SaaS', application: 'Production Lead Scoring Platform', benefit: 'Processes sales CRM records through residual MLPs deployed on AWS ECS with 99.9% uptime.' },
      { industry: 'Telecom & ISP', application: 'Real-Time Network Intrusion Detection', benefit: 'Classifies packet telemetry in under 5ms, blocking DDoS attacks autonomously.' },
      { industry: 'Biotech & Genomics', application: 'Target Drug Molecule Affinity Prediction', benefit: 'Ranks molecular candidates for clinical trials with calibrated confidence scores.' },
    ],
    practiceQuestions: [
      { id: 'dl22-q1', question: 'Why does adding a residual skip connection (y = x + F(x)) solve the degradation problem in deep networks?', hint: 'Look at the derivative with respect to x: ∂y/∂x = I + ∂F/∂x.', answer: 'The derivative ∂y/∂x = I + ∂F/∂x contains an identity term I that never vanishes, guaranteeing that gradient signals can travel straight back through hundreds of layers without being attenuated by intermediate weight matrices.', explanation: 'The identity shortcut acts as a zero-resistance gradient highway.' },
      { id: 'dl22-q2', question: 'What are the 6 standard engineering milestones of a complete deep learning project lifecycle?', hint: 'From data definition to production API.', answer: '1. Problem & Metric Specification, 2. Leak-Free Data Pipeline, 3. Neural Architecture Design, 4. Training with Schedulers & Checkpointing, 5. Comprehensive Multi-Metric Evaluation & Error Analysis, 6. Containerized API Deployment.', explanation: 'This covers the full production lifecycle.' },
    ],
    quiz: [
      {
        id: 'dl22-qz1',
        question: 'What is the primary architectural innovation of Residual Networks (ResNets)?',
        options: [
          'Removing all non-linear activation functions',
          'Adding identity skip connections (y = x + F(x)) that allow signals and gradients to bypass intermediate layers directly',
          'Training on CPU only',
          'Deleting the loss function',
        ],
        correctIndex: 1,
        explanation: 'He et al. introduced identity shortcut connections, allowing deep networks to scale to 100+ layers without degradation.',
      },
      {
        id: 'dl22-qz2',
        question: 'During Milestone 4 (Training), what saved artifact represents the deployable model?',
        options: [
          'The Python console output text file',
          'The PyTorch state_dict checkpoint file (.pth) saved when validation loss reached its global minimum',
          'The Jupyter notebook (.ipynb) file',
          'A screenshot of the loss curve',
        ],
        correctIndex: 1,
        explanation: 'The state_dict file containing serialized learned parameter tensors is the exact production artifact loaded by deployment servers.',
      },
      {
        id: 'dl22-qz3',
        question: 'What is the role of Docker in deploying a Deep Learning project?',
        options: [
          'It trains the neural network faster',
          'It packages the model weights, FastAPI web server, Python runtime, and exact system libraries into a self-contained container that runs reliably anywhere',
          'It increases model accuracy by 5%',
          'It replaces PyTorch',
        ],
        correctIndex: 1,
        explanation: 'Docker eliminates environment discrepancies between development machines and cloud production servers.',
      },
    ],
    independentExercise: {
      id: 'dl22-ex',
      title: 'Build a Residual MLP Block in PyTorch',
      problem: 'Write a PyTorch `nn.Module` class `ResBlock(dim)` that applies Linear(dim, dim) -> BatchNorm -> GELU -> Linear(dim, dim) -> BatchNorm, adds the input x via shortcut, and applies final GELU.',
      hints: ['def forward(self, x): return self.gelu(x + self.block(x))'],
      starterCode: `import torch
import torch.nn as nn

class ResBlock(nn.Module):
    # Implement residual block
    pass
`,
      solution: `import torch
import torch.nn as nn

class ResBlock(nn.Module):
    def __init__(self, dim):
        super().__init__()
        self.block = nn.Sequential(
            nn.Linear(dim, dim),
            nn.BatchNorm1d(dim),
            nn.GELU(),
            nn.Linear(dim, dim),
            nn.BatchNorm1d(dim)
        )
        self.gelu = nn.GELU()
        
    def forward(self, x):
        return self.gelu(x + self.block(x))

block = ResBlock(16)
x = torch.randn(4, 16)
out = block(x)
print("Output shape:", out.shape)
assert out.shape == (4, 16)
print("Residual block verified!")`,
    },
    summary: {
      keyTakeaways: [
        'The Deep Learning Capstone synthesizes data engineering, residual modeling, learning rate scheduling, error analysis, and containerized serving.',
        'Residual skip connections enable deep architectures to train stably without degradation.',
        'Always evaluate models on holdout test sets and package serving code in robust microservices.',
      ],
      nextLessonId: 'dl-01-intro',
      nextLessonTitle: 'DL-01: Introduction to Deep Learning (Cycle Review)',
      nextLessonModuleId: 'dl-module-1',
    },
  },
};

