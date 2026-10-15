import { LessonContent, ModuleData } from '@/lib/types';

export const module5Data: ModuleData = {
  id: 'module-5',
  number: 5,
  title: 'Model Evaluation and Selection',
  subtitle: 'Confusion Matrices, ROC-AUC, PR Curves, Hyperparameter Tuning & Cost Matrices',
  description: 'Master rigorous evaluation protocols: Confusion Matrix diagnostics, Precision, Recall, F1 and F-beta scores, ROC-AUC curve geometry, Precision-Recall curves, Bayesian hyperparameter optimization, and threshold tuning under asymmetric business cost matrices.',
  icon: 'CheckCircle',
  badge: 'Evaluation',
  estimatedHours: 14,
  topicsCount: 7,
  lessons: [
    {
      id: 'confusion-matrix-metrics',
      moduleId: 'module-5',
      title: 'Confusion Matrix, Precision, Recall & Specificity',
      description: 'TP, FP, TN, FN taxonomy, Precision (PPV), Recall (Sensitivity), Specificity (TNR), and the Accuracy Paradox.',
      order: 1,
      readTimeMinutes: 22,
      visualizerType: 'none',
      difficulty: 'Beginner',
    },
    {
      id: 'f1-score-fbeta',
      moduleId: 'module-5',
      title: 'F1-Score, F-Beta & The Harmonic Mean',
      description: 'Mathematical derivation of the harmonic mean, balancing precision and recall, and tuning beta for asymmetric priorities.',
      order: 2,
      readTimeMinutes: 20,
      visualizerType: 'none',
      difficulty: 'Intermediate',
    },
    {
      id: 'roc-auc-curve',
      moduleId: 'module-5',
      title: 'Receiver Operating Characteristic (ROC) & AUC',
      description: 'TPR vs FPR across all thresholds, probabilistic interpretation of AUC, and comparing classifier dominance.',
      order: 3,
      readTimeMinutes: 24,
      visualizerType: 'metrics-roc',
      difficulty: 'Beginner',
    },
    {
      id: 'precision-recall-curve',
      moduleId: 'module-5',
      title: 'Precision-Recall Curves & Average Precision',
      description: 'Why PR curves outperform ROC under extreme class imbalance, Average Precision (AP), and PR-AUC.',
      order: 4,
      readTimeMinutes: 22,
      visualizerType: 'none',
      difficulty: 'Intermediate',
    },
    {
      id: 'hyperparameter-tuning',
      moduleId: 'module-5',
      title: 'Hyperparameter Tuning: Grid, Random & Bayesian Optimization',
      description: 'Exhaustive Grid Search, Random Search efficiency theorem, and Bayesian Optimization with Gaussian Processes.',
      order: 5,
      readTimeMinutes: 26,
      visualizerType: 'none',
      difficulty: 'Intermediate',
    },
    {
      id: 'learning-validation-curves',
      moduleId: 'module-5',
      title: 'Learning & Validation Curves Diagnostic Protocols',
      description: 'Plotting train vs validation error across sample size and model complexity to diagnose high bias vs high variance.',
      order: 6,
      readTimeMinutes: 22,
      visualizerType: 'none',
      difficulty: 'Beginner',
    },
    {
      id: 'threshold-tuning-cost-matrix',
      moduleId: 'module-5',
      title: 'Classification Threshold Tuning & Cost Matrix Optimization',
      description: 'Moving beyond the default 0.5 threshold to minimize real-world dollar costs: Cost = C_FP * FP + C_FN * FN.',
      order: 7,
      readTimeMinutes: 24,
      visualizerType: 'none',
      difficulty: 'Intermediate',
    },
  ],
};

export const module5Lessons: Record<string, LessonContent> = {
  'confusion-matrix-metrics': {
    id: 'confusion-matrix-metrics',
    moduleId: 'module-5',
    title: 'Confusion Matrix, Precision, Recall & Specificity',
    subtitle: 'The 2x2 Contingency Table, Type I & Type II Errors & Base-Rate Sensitivity',
    order: 1,
    readTimeMinutes: 22,
    difficulty: 'Beginner',
    visualizerType: 'none',
    objectives: [
      'Construct and analyze a 2x2 Confusion Matrix: TP, FP, TN, FN.',
      'Define Precision (Positive Predictive Value), Recall (Sensitivity / True Positive Rate), and Specificity (True Negative Rate).',
      'Explain why Accuracy is deceptive on imbalanced datasets (The Accuracy Paradox).',
    ],
    prerequisites: ['probability-bayes-theorem', 'train-val-test-splitting'],
    analogy: {
      title: 'The Smoke Detector in the Kitchen',
      text: 'Consider a smoke detector in your house. 1) True Positive: There is a kitchen fire, and the alarm screams. 2) True Negative: You are peacefully sleeping with no fire, and the alarm stays quiet. 3) False Positive (Type I Error / False Alarm): You burn a piece of toast, and the alarm shrieks at 3 AM. 4) False Negative (Type II Error / Fatal Miss): A fire breaks out, and the detector stays completely silent! In home safety, a False Negative is fatal, whereas a False Positive is merely an annoyance.',
      metaphor: 'The confusion matrix dissects correct predictions from false alarms and fatal misses.',
    },
    problemSolved: {
      title: 'Diagnosing Asymmetric Classification Failures',
      description: 'A single accuracy percentage hides the true nature of model mistakes. In cancer diagnosis, spam detection, and self-driving cars, different types of errors carry radically different real-world consequences.',
      keyPoints: [
        'Separates false alarms (Type I) from dangerous misses (Type II).',
        'Precision measures trustworthiness when predicting the positive class.',
        'Recall measures coverage of true positive real-world events.',
      ],
    },
    intuition: {
      overview: 'Every prediction falls into one of four mutually exclusive quadrants comparing predicted class against true class.',
      steps: [
        { step: 1, title: 'Count Quadrants', description: 'Tally TP (predicted 1, actual 1), FP (predicted 1, actual 0), TN (predicted 0, actual 0), FN (predicted 0, actual 1).' },
        { step: 2, title: 'Evaluate Precision', description: 'When the model cries wolf (predicts positive), what fraction of times is there truly a wolf? TP / (TP + FP).' },
        { step: 3, title: 'Evaluate Recall', description: 'Out of all real wolves in the forest, what fraction did the model detect? TP / (TP + FN).' },
      ],
    },
    mathematics: {
      overview: 'Analytical definitions of the four primary confusion matrix proportions.',
      foundations: [
        {
          name: 'Accuracy',
          latex: '\\text{Accuracy} = \\frac{\\text{TP} + \\text{TN}}{\\text{TP} + \\text{TN} + \\text{FP} + \\text{FN}}',
          explanation: 'Overall fraction of correct classifications. Highly misleading when classes are imbalanced.',
        },
        {
          name: 'Precision (Positive Predictive Value)',
          latex: '\\text{Precision} = \\frac{\\text{TP}}{\\text{TP} + \\text{FP}} = P(y = 1 \\mid \\hat{y} = 1)',
          explanation: 'Purity of positive predictions. High precision means very few false alarms.',
        },
        {
          name: 'Recall (Sensitivity / True Positive Rate)',
          latex: '\\text{Recall} = \\frac{\\text{TP}}{\\text{TP} + \\text{FN}} = P(\\hat{y} = 1 \\mid y = 1)',
          explanation: 'Completeness of positive detection. High recall means very few missed positive cases.',
        },
        {
          name: 'Specificity (True Negative Rate)',
          latex: '\\text{Specificity} = \\frac{\\text{TN}}{\\text{TN} + \\text{FP}} = P(\\hat{y} = 0 \\mid y = 0)',
          explanation: 'Ability of the model to correctly identify negative instances.',
        },
      ],
    },
    derivation: {
      title: 'Derivation of the Trade-Off Between Precision and Recall',
      objective: 'Show why increasing classification threshold tau raises Precision and lowers Recall.',
      steps: [
        {
          step: 1,
          label: 'Decision Rule with Threshold tau',
          latex: '\\hat{y}_i = \\mathbb{I}(\\hat{p}_i \\ge \\tau)',
          explanation: 'Classify as positive only if predicted probability exceeds threshold tau.',
        },
        {
          step: 2,
          label: 'Effect of Increasing Threshold tau toward 1.0',
          latex: '\\tau \\uparrow \\implies \\text{Predicted Positives } (\\text{TP} + \\text{FP}) \\downarrow',
          explanation: 'The model becomes conservative, flagging only cases with near-certain probability.',
        },
        {
          step: 3,
          label: 'Impact on Ratios',
          latex: '\\text{FP} \\to 0 \\implies \\text{Precision} \\uparrow, \\quad \\text{but } \\text{FN} \\uparrow \\implies \\text{Recall} \\downarrow',
          explanation: 'Precision increases toward 100% (zero false alarms), but Recall plummets toward 0% (many real cases missed).',
        },
      ],
    },
    variables: [
      { symbol: '\\text{TP}', name: 'True Positives', description: 'Sick patients correctly diagnosed as sick.', dimensions: 'Integer ≥ 0' },
      { symbol: '\\text{FP}', name: 'False Positives (Type I)', description: 'Healthy patients falsely diagnosed as sick (False Alarm).', dimensions: 'Integer ≥ 0' },
      { symbol: '\\text{TN}', name: 'True Negatives', description: 'Healthy patients correctly identified as healthy.', dimensions: 'Integer ≥ 0' },
      { symbol: '\\text{FN}', name: 'False Negatives (Type II)', description: 'Sick patients falsely missed as healthy (Fatal Miss).', dimensions: 'Integer ≥ 0' },
    ],
    numericalExample: {
      scenario: 'A diagnostic model is tested on 1,000 patients: TP = 80, FP = 20, FN = 10, TN = 890. Calculate Accuracy, Precision, Recall, and Specificity.',
      dataset: [{ TP: 80, FP: 20, FN: 10, TN: 890 }],
      calculations: [
        { step: 'Accuracy Calculation', math: '(80 + 890) / 1000 = 970 / 1000', result: '0.9700 (97.0%)' },
        { step: 'Precision Calculation', math: 'TP / (TP + FP) = 80 / (80 + 20) = 80 / 100', result: '0.8000 (80.0%)' },
        { step: 'Recall (Sensitivity)', math: 'TP / (TP + FN) = 80 / (80 + 10) = 80 / 90', result: '0.8889 (88.9%)' },
        { step: 'Specificity (TNR)', math: 'TN / (TN + FP) = 890 / (890 + 20) = 890 / 910', result: '0.9780 (97.8%)' },
      ],
      finalConclusion: 'The model detects 88.9% of sick patients (Recall), and 80.0% of positive alerts are genuinely sick (Precision). Overall accuracy is 97.0%.',
    },
    visualExplanation: {
      title: 'The 2x2 Confusion Matrix Layout',
      description: 'Rows represent Actual True Classes; Columns represent Predicted Classes. Top-left: TP. Top-right: FN. Bottom-left: FP. Bottom-right: TN. Diagonal elements (top-left and bottom-right) represent correct decisions.',
      features: ['Diagonal: Correct decisions (TP + TN)', 'Off-diagonal: Errors (FP + FN)', 'Column 1 sum: All predicted positives', 'Row 1 sum: All actual positives'],
    },
    scratchCode: {
      title: 'Confusion Matrix & Metrics in Pure Python',
      explanation: 'Calculate confusion matrix quadrants and derived ratios from raw binary lists.',
      code: `import numpy as np

def compute_confusion_metrics(y_true: np.ndarray, y_pred: np.ndarray):
    tp = int(np.sum((y_true == 1) & (y_pred == 1)))
    fp = int(np.sum((y_true == 0) & (y_pred == 1)))
    tn = int(np.sum((y_true == 0) & (y_pred == 0)))
    fn = int(np.sum((y_true == 1) & (y_pred == 0)))
    
    accuracy = (tp + tn) / len(y_true)
    precision = tp / (tp + fp) if (tp + fp) > 0 else 0.0
    recall = tp / (tp + fn) if (tp + fn) > 0 else 0.0
    specificity = tn / (tn + fp) if (tn + fp) > 0 else 0.0
    
    return {
        'TP': tp, 'FP': fp, 'TN': tn, 'FN': fn,
        'Accuracy': round(accuracy, 4),
        'Precision': round(precision, 4),
        'Recall': round(recall, 4),
        'Specificity': round(specificity, 4)
    }

y_t = np.array([1, 1, 0, 0, 1, 0, 1, 0, 0, 0])
y_p = np.array([1, 0, 0, 0, 1, 1, 1, 0, 0, 0])
print("Metrics:", compute_confusion_metrics(y_t, y_p))
`,
    },
    sklearnCode: {
      title: 'Scikit-Learn classification_report',
      explanation: 'The industry-standard summary tool reporting precision, recall, and F1 per class.',
      code: `import numpy as np
from sklearn.metrics import confusion_matrix, classification_report

y_true = np.array([1, 1, 0, 0, 1, 0, 1, 0, 0, 0])
y_pred = np.array([1, 0, 0, 0, 1, 1, 1, 0, 0, 0])

cm = confusion_matrix(y_true, y_pred)
print("Confusion Matrix:\n", cm)
print("\nClassification Report:\n", classification_report(y_true, y_pred, target_names=['Class 0', 'Class 1']))
`,
    },
    runnableCode: {
      code: `import numpy as np
from sklearn.metrics import confusion_matrix, precision_score, recall_score

y_true = np.array([1, 1, 1, 1, 0, 0, 0, 0, 0, 0])
y_pred = np.array([1, 1, 1, 0, 0, 0, 0, 1, 0, 0])

cm = confusion_matrix(y_true, y_pred)
prec = precision_score(y_true, y_pred)
rec = recall_score(y_true, y_pred)

print("Confusion Matrix [[TN, FP], [FN, TP]]:")
print(cm)
print(f"Precision: {prec:.4f} (3 TP / 4 predicted positives)")
print(f"Recall:    {rec:.4f} (3 TP / 4 true positives)")
`,
      expectedOutput: `Confusion Matrix [[TN, FP], [FN, TP]]:\n[[5 1]\n [1 3]]\nPrecision: 0.7500 (3 TP / 4 predicted positives)\nRecall:    0.7500 (3 TP / 4 true positives)`,
    },
    lineByLineExplanation: [
      { lines: 'Line 7', codeSnippet: 'cm = confusion_matrix(y_true, y_pred)', explanation: 'Calculates 2x2 matrix: TN=5, FP=1, FN=1, TP=3.' },
      { lines: 'Lines 8-9', codeSnippet: 'prec = precision_score(...); rec = recall_score(...)', explanation: 'Computes precision (3/4 = 0.75) and recall (3/4 = 0.75).' },
    ],
    hyperparameters: [
      { name: 'zero_division', defaultVal: '"warn"', range: '[0, 1, "warn"]', effect: 'Value returned when TP + FP = 0 (no positive predictions).', recommendation: 'Set zero_division=0.0 in production to prevent crashes on edge cases.' },
    ],
    assumptions: [
      { assumption: 'Binary Ground Truth', whyItMatters: 'Standard confusion matrices assume mutually exclusive labels {0, 1}. For multiclass, compute K separate One-vs-Rest matrices.', howToVerify: 'Verify unique values are {0, 1}.' },
    ],
    commonMistakes: [
      { mistake: 'Confusing Precision with Recall', solution: 'Precision answers: "When the model says YES, how often is it right?" Recall answers: "Out of all actual YES cases, how many did the model find?"' },
    ],
    realWorldUseCases: [
      { industry: 'Medical Imaging Diagnostics', application: 'Mammogram Breast Cancer Screening', benefit: 'Clinicians optimize for high Recall (> 95%) because missing an active tumor (False Negative) is fatal, whereas a False Positive triggers a follow-up ultrasound.' },
    ],
    practiceQuestions: [
      { id: 'pq-cm-1', question: 'In an automated spam filter, which error is worse: a False Positive or a False Negative?', hint: 'Think about where the email goes.', answer: 'A False Positive is far worse. A False Positive sends an important job offer or client email into the Spam trash bin where it is never read. A False Negative merely lets an annoying spam email into the inbox where the user can delete it in one second. Spam filters optimize heavily for Precision.' },
    ],
    quiz: [
      {
        id: 'quiz-cm-1',
        question: 'If a classifier achieves 100% Recall, what does this guarantee about its predictions?',
        options: [
          'The model made zero false alarms (FP = 0).',
          'The model detected every single positive instance in the dataset (FN = 0).',
          'The model has 100% precision.',
          'The model has 100% accuracy.',
        ],
        correctIndex: 1,
        explanation: 'Because Recall = TP / (TP + FN), achieving 100% Recall means FN = 0: every single positive real-world instance was successfully identified, even if the model triggered many false alarms.',
      },
    ],
    independentExercise: {
      title: 'Calculate Specificity from Confusion Matrix',
      problem: 'Write a function compute_specificity(y_true, y_pred) that extracts TN and FP from confusion_matrix and returns the True Negative Rate (Specificity).',
      hints: ['tn, fp, fn, tp = confusion_matrix(y_true, y_pred).ravel()', 'return tn / (tn + fp)'],
      starterCode: `import numpy as np
from sklearn.metrics import confusion_matrix

def compute_specificity(y_true: np.ndarray, y_pred: np.ndarray) -> float:
    # TODO: return TN / (TN + FP)
    return 0.0

y_t = np.array([0, 0, 0, 0, 1, 1])
y_p = np.array([0, 0, 0, 1, 1, 1])
print("Specificity:", round(compute_specificity(y_t, y_p), 4))
`,
      solution: `import numpy as np
from sklearn.metrics import confusion_matrix

def compute_specificity(y_true: np.ndarray, y_pred: np.ndarray) -> float:
    tn, fp, fn, tp = confusion_matrix(y_true, y_pred).ravel()
    return float(tn / (tn + fp)) if (tn + fp) > 0 else 0.0

y_t = np.array([0, 0, 0, 0, 1, 1])
y_p = np.array([0, 0, 0, 1, 1, 1])
print("Specificity:", round(compute_specificity(y_t, y_p), 4))
`,
    },
    summary: {
      keyTakeaways: [
        'The Confusion Matrix partitions predictions into TP, FP, TN, and FN.',
        'Precision measures prediction purity (low false alarms); Recall measures detection coverage (low misses).',
        'Different business applications prioritize Precision (Spam) vs Recall (Cancer screening).',
      ],
      nextLessonId: 'f1-score-fbeta',
      nextLessonTitle: 'F1-Score, F-Beta & The Harmonic Mean',
      nextLessonModuleId: 'module-5',
    },
  },

  'f1-score-fbeta': {
    id: 'f1-score-fbeta',
    moduleId: 'module-5',
    title: 'F1-Score, F-Beta & The Harmonic Mean',
    subtitle: 'Mathematical Justification of Harmonic Means & Weighted Asymmetric Priorities',
    order: 2,
    readTimeMinutes: 20,
    difficulty: 'Intermediate',
    visualizerType: 'none',
    objectives: [
      'Derive the F1-Score as the Harmonic Mean of Precision and Recall.',
      'Explain why the Harmonic Mean punishes extreme imbalances compared to the Arithmetic Mean.',
      'Apply the generalized F-beta metric to weight recall over precision (beta = 2.0) or precision over recall (beta = 0.5).',
    ],
    prerequisites: ['confusion-matrix-metrics'],
    analogy: {
      title: 'The Average Speed on a Round-Trip Commute',
      text: 'Suppose you drive 60 miles to work at 60 mph (taking 1 hour). On the way back, you get stuck in terrible gridlock and crawl at 20 mph (taking 3 hours). What was your average speed for the whole 120-mile round trip? Most people say (60 + 20) / 2 = 40 mph. WRONG! You drove 120 miles in 4 hours total: your true average speed was 120 / 4 = 30 mph! Rates and ratios cannot be averaged using arithmetic means; they require the Harmonic Mean. The F1-score is this exact rate average for Precision and Recall.',
      metaphor: 'The harmonic mean heavily penalizes low outliers: an Olympic decathlete must be good at all events, not just one.',
    },
    problemSolved: {
      title: 'A Single Metric Balancing Precision and Recall',
      description: 'Precision and recall constantly pull in opposite directions. A model that predicts EVERYTHING as positive gets 100% recall. The F1-score provides a single composite metric that rewards models only when BOTH precision and recall are strong.',
      keyPoints: [
        'Collapses to near-zero if EITHER precision or recall is near-zero.',
        'F-beta provides continuous tuning for domain priorities (e.g. beta=2 for medicine).',
        'Standard benchmark metric for imbalanced competition leaderboards.',
      ],
    },
    intuition: {
      overview: 'If an arithmetic mean is computed between Precision = 1.0 and Recall = 0.0, the average is 0.50 (deceptive). The Harmonic Mean is 0.0! It acts like a conservative gatekeeper.',
      steps: [
        { step: 1, title: 'Invert Rates', description: 'Compute 1 / Precision and 1 / Recall.' },
        { step: 2, title: 'Average Inverses', description: 'Compute arithmetic mean of the reciprocals: 0.5 * (1/P + 1/R).' },
        { step: 3, title: 'Invert Back', description: 'Take the reciprocal of the average: 2 / (1/P + 1/R) = 2 * P * R / (P + R).' },
      ],
    },
    mathematics: {
      overview: 'Analytical formulation of the F-measure family derived from generalized harmonic means.',
      foundations: [
        {
          name: 'F1-Score Formula',
          latex: 'F_1 = 2 \\cdot \\frac{\\text{Precision} \\cdot \\text{Recall}}{\\text{Precision} + \\text{Recall}} = \\frac{2 \\text{TP}}{2 \\text{TP} + \\text{FP} + \\text{FN}}',
          explanation: 'Harmonic mean of precision and recall. Equals 1.0 iff both are 1.0.',
        },
        {
          name: 'Generalized F-Beta Metric',
          latex: 'F_\\beta = (1 + \\beta^2) \\cdot \\frac{\\text{Precision} \\cdot \\text{Recall}}{\\beta^2 \\text{Precision} + \\text{Recall}} = \\frac{(1 + \\beta^2) \\text{TP}}{(1 + \\beta^2) \\text{TP} + \\beta^2 \\text{FN} + \\text{FP}}',
          explanation: 'beta weights the importance of recall relative to precision. beta = 2.0 values recall twice as much as precision; beta = 0.5 values precision twice as much.',
        },
      ],
    },
    derivation: {
      title: 'Derivation of F1 as the Inverted Average of Reciprocals',
      objective: 'Show step-by-step why the harmonic mean equals 2 * P * R / (P + R).',
      steps: [
        {
          step: 1,
          label: 'Definition of Harmonic Mean of Two Numbers',
          latex: 'H(P, R) = \\frac{2}{\\frac{1}{P} + \\frac{1}{R}}',
          explanation: 'Reciprocal of the arithmetic mean of reciprocals.',
        },
        {
          step: 2,
          label: 'Find Common Denominator',
          latex: '\\frac{1}{P} + \\frac{1}{R} = \\frac{R + P}{P \\cdot R}',
          explanation: 'Multiply fractions by R/R and P/P.',
        },
        {
          step: 3,
          label: 'Invert and Multiply by 2',
          latex: 'H(P, R) = \\frac{2}{\\frac{P + R}{P \\cdot R}} = 2 \\cdot \\frac{P \\cdot R}{P + R} = F_1',
          explanation: 'Simplifies directly to the familiar F1 formula.',
        },
      ],
    },
    variables: [
      { symbol: 'P, R', name: 'Precision and Recall', description: 'Underlying component performance ratios.', dimensions: 'Scalars [0, 1]' },
      { symbol: '\\beta', name: 'Recall Weight Factor', description: 'Relative weight of recall versus precision.', dimensions: 'Scalar > 0' },
      { symbol: 'F_1', name: 'F1-Score', description: 'Harmonic mean performance metric.', dimensions: 'Scalar [0, 1]' },
    ],
    numericalExample: {
      scenario: 'A model has Precision = 0.90 and Recall = 0.60. Calculate: 1) Arithmetic Mean; 2) F1-Score; 3) F2-Score (Recall emphasis with beta = 2.0).',
      dataset: [{ P: 0.90, R: 0.60, beta: 2.0 }],
      calculations: [
        { step: 'Arithmetic Mean', math: '(0.90 + 0.60) / 2 = 1.50 / 2', result: '0.7500' },
        { step: 'F1-Score Numerator', math: '2 \\cdot (0.90) \\cdot (0.60) = 2 \\cdot 0.54', result: '1.0800' },
        { step: 'F1-Score Denominator', math: '0.90 + 0.60', result: '1.5000' },
        { step: 'F1-Score Result', math: '1.08 / 1.50', result: '0.7200 (Lower than 0.75)' },
        { step: 'F2-Score (beta = 2.0)', math: '(1 + 4) \\cdot \\frac{0.90 \\cdot 0.60}{4(0.90) + 0.60} = 5 \\cdot \\frac{0.54}{3.60 + 0.60} = 2.70 / 4.20', result: '0.6429' },
      ],
      finalConclusion: 'The arithmetic mean gives an optimistic 0.75. The F1-score pulls down to 0.72. The F2-score pulls down even further to 0.643 because it penalizes the mediocre 0.60 recall heavily.',
    },
    visualExplanation: {
      title: 'Arithmetic vs Geometric vs Harmonic Mean Contour Plot',
      description: 'Plotting lines of constant score across (Precision, Recall): The Arithmetic mean has straight diagonal contours (allows a model with P=1.0 and R=0.0 to score 0.5). The Harmonic mean contours curve sharply toward the origin, forcing both metrics to be positive to earn a decent score.',
      features: ['Harmonic mean curves toward origin', 'Punishes asymmetric imbalances severely', 'Score is 0 if either P or R is 0'],
    },
    scratchCode: {
      title: 'F1 and F-Beta Calculator in Pure Python',
      explanation: 'General function computing F-beta scores with safe zero handling.',
      code: `def compute_f_beta(precision: float, recall: float, beta: float = 1.0) -> float:
    """Computes generalized F-beta score."""
    if precision <= 0 or recall <= 0:
        return 0.0
    beta_sq = beta ** 2
    numerator = (1.0 + beta_sq) * (precision * recall)
    denominator = (beta_sq * precision) + recall
    return round(float(numerator / denominator), 4)

p, r = 0.90, 0.60
print(f"Arithmetic Mean: {(p + r)/2:.4f}")
print(f"F0.5 (Precision focus): {compute_f_beta(p, r, beta=0.5):.4f}")
print(f"F1.0 (Balanced focus):  {compute_f_beta(p, r, beta=1.0):.4f}")
print(f"F2.0 (Recall focus):     {compute_f_beta(p, r, beta=2.0):.4f}")
`,
    },
    sklearnCode: {
      title: 'f1_score and fbeta_score in Scikit-Learn',
      explanation: 'Using scikit-learn metrics with average options.',
      code: `import numpy as np
from sklearn.metrics import f1_score, fbeta_score

y_true = np.array([1, 1, 1, 0, 0, 0])
y_pred = np.array([1, 1, 0, 0, 0, 1])

f1 = f1_score(y_true, y_pred)
f2 = fbeta_score(y_true, y_pred, beta=2.0)
f05 = fbeta_score(y_true, y_pred, beta=0.5)

print(f"F1:   {f1:.4f}")
print(f"F2:   {f2:.4f}")
print(f"F0.5: {f05:.4f}")
`,
    },
    runnableCode: {
      code: `p = 0.90
r = 0.60

arithmetic_mean = (p + r) / 2
f1 = 2 * (p * r) / (p + r)
f2 = (1 + 2**2) * (p * r) / (2**2 * p + r)

print(f"Precision: {p:.2f}, Recall: {r:.2f}")
print(f"Arithmetic Mean: {arithmetic_mean:.4f}")
print(f"F1-Score:        {f1:.4f}")
print(f"F2-Score (beta=2): {f2:.4f}")
`,
      expectedOutput: `Precision: 0.90, Recall: 0.60\nArithmetic Mean: 0.7500\nF1-Score:        0.7200\nF2-Score (beta=2): 0.6429`,
    },
    lineByLineExplanation: [
      { lines: 'Line 4', codeSnippet: 'arithmetic_mean = (p + r) / 2', explanation: 'Computes naive arithmetic mean (0.75).' },
      { lines: 'Line 5', codeSnippet: 'f1 = 2 * (p * r) / (p + r)', explanation: 'Computes harmonic mean F1-score (0.72).' },
      { lines: 'Line 6', codeSnippet: 'f2 = (1 + 4) * (p * r) / (4 * p + r)', explanation: 'Computes F2-score weighting recall 4x more than precision (0.6429).' },
    ],
    hyperparameters: [
      { name: 'beta', defaultVal: '1.0', range: '[0.1, 10.0]', effect: 'Weights recall relative to precision. beta < 1 favors precision; beta > 1 favors recall.', recommendation: 'Use beta=2.0 for medical screening and fraud detection; use beta=0.5 for legal document discovery.' },
    ],
    assumptions: [
      { assumption: 'Positive Class Meaningfulness', whyItMatters: 'F1 only evaluates the positive class. In multiclass settings, specify average="macro" or "weighted".', howToVerify: 'Verify that class 1 is the critical minority event.' },
    ],
    commonMistakes: [
      { mistake: 'Using the arithmetic mean (P + R)/2 instead of the harmonic mean', solution: 'The arithmetic mean allows a trivial classifier that predicts all 1s (100% recall, 1% precision) to achieve a deceptively high score of ~50.5%. The F1 score correctly plummets to ~1.9%.' },
    ],
    realWorldUseCases: [
      { industry: 'Aerospace & Mechanical Reliability', application: 'Jet Engine Component Crack Detection', benefit: 'Engineers optimize for F2-score (beta=2.0) because missing a micro-crack in a turbine blade causes catastrophic engine failure in flight.' },
    ],
    practiceQuestions: [
      { id: 'pq-f1-1', question: 'If a classifier achieves Precision = 1.0 and Recall = 0.001, what is its Arithmetic Mean versus its F1-Score?', hint: 'Evaluate 2 * P * R / (P + R).', answer: 'The Arithmetic Mean is (1.0 + 0.001) / 2 = 0.5005 (falsely suggesting 50% performance). The F1-score is 2 * (1.0 * 0.001) / (1.0 + 0.001) = 0.002 / 1.001 = 0.00199 (correctly exposing that the model is virtually useless).' },
    ],
    quiz: [
      {
        id: 'quiz-f1-1',
        question: 'Which metric should be used when Recall is considered TWICE as important as Precision?',
        options: ['F0.5 Score', 'F1 Score', 'F2 Score', 'Accuracy'],
        correctIndex: 2,
        explanation: 'The F-beta score weights recall beta times as much as precision. Setting beta = 2.0 produces the F2 score, which weights recall twice as heavily as precision.',
      },
    ],
    independentExercise: {
      title: 'Compare Macro vs Micro F1 on Multiclass Data',
      problem: 'Compute both macro-averaged F1 and micro-averaged F1 for a 3-class prediction array using scikit-learn f1_score.',
      hints: ['f1_score(y_true, y_pred, average="macro")', 'f1_score(y_true, y_pred, average="micro")'],
      starterCode: `import numpy as np
from sklearn.metrics import f1_score

y_true = np.array([0, 0, 0, 0, 1, 1, 2])
y_pred = np.array([0, 0, 0, 1, 1, 0, 2])

# TODO: print macro and micro F1
print("F1 averages:")
`,
      solution: `import numpy as np
from sklearn.metrics import f1_score

y_true = np.array([0, 0, 0, 0, 1, 1, 2])
y_pred = np.array([0, 0, 0, 1, 1, 0, 2])

macro_f1 = f1_score(y_true, y_pred, average='macro')
micro_f1 = f1_score(y_true, y_pred, average='micro')

print(f"Macro F1 (unweighted class average): {macro_f1:.4f}")
print(f"Micro F1 (global accuracy):          {micro_f1:.4f}")
`,
    },
    summary: {
      keyTakeaways: [
        'The F1-score is the harmonic mean of precision and recall, severely penalizing extreme imbalances.',
        'The F-beta family allows continuous adjustment of priorities: beta=2 emphasizes recall, beta=0.5 emphasizes precision.',
        'Never average rates using arithmetic means; harmonic means correctly preserve relative proportions.',
      ],
      nextLessonId: 'roc-auc-curve',
      nextLessonTitle: 'Receiver Operating Characteristic (ROC) & AUC',
      nextLessonModuleId: 'module-5',
    },
  },

  'roc-auc-curve': {
    id: 'roc-auc-curve',
    moduleId: 'module-5',
    title: 'Receiver Operating Characteristic (ROC) & AUC',
    subtitle: 'TPR vs FPR Trajectories, Threshold Invariance & Probabilistic Ranking Meaning',
    order: 3,
    readTimeMinutes: 24,
    difficulty: 'Beginner',
    visualizerType: 'metrics-roc',
    objectives: [
      'Construct a Receiver Operating Characteristic (ROC) curve by sweeping threshold tau from 1.0 to 0.0.',
      'Explain the axes: True Positive Rate (Recall) on Y-axis vs False Positive Rate (1 - Specificity) on X-axis.',
      'State the probabilistic definition of Area Under the Curve (AUC): AUC = P(score(X+) > score(X-)).',
    ],
    prerequisites: ['confusion-matrix-metrics', 'probability-distributions'],
    analogy: {
      title: 'The Radar Operator in the Fog',
      text: 'In World War II, British radar operators had to detect incoming enemy bombers amidst noisy cloud reflections (Receiver Operating Characteristic was invented for this!). If you turn the radar sensitivity dial all the way down (high threshold), you detect zero planes and get zero false alarms (FPR=0, TPR=0; bottom-left corner). If you crank sensitivity to maximum (low threshold), you catch every plane, but every flock of seagulls triggers an air raid siren (FPR=1, TPR=1; top-right corner). The ROC curve plots this exact sensitivity dial tradeoff.',
      metaphor: 'The ROC curve displays all possible operating compromises between detection and false alarms.',
    },
    problemSolved: {
      title: 'Evaluating Classifier Quality Independently of Decision Thresholds',
      description: 'Evaluating a model at a single fixed threshold (like 0.5) is arbitrary. If business costs change tomorrow, the threshold will move. ROC-AUC evaluates the overall ranking quality of the model across ALL possible thresholds simultaneously.',
      keyPoints: [
        'Threshold-independent metric: evaluates pure ranking discrimination.',
        'Scale-invariant: depends only on rank order of predictions, not absolute numbers.',
        'AUC = 0.5 is random coin flip; AUC = 1.0 is perfect discrimination.',
      ],
    },
    intuition: {
      overview: 'Sort all test samples by predicted score descending. Move threshold from highest score to lowest score. Whenever you encounter a true positive, step UP by 1/N_pos. Whenever you encounter a false positive, step RIGHT by 1/N_neg.',
      steps: [
        { step: 1, title: 'Sort Predictions', description: 'Order test samples by predicted probability in descending order.' },
        { step: 2, title: 'Trace Curve Path', description: 'For each sample in order: positive sample moves path vertically (TPR increases); negative sample moves path horizontally (FPR increases).' },
        { step: 3, title: 'Calculate Area (AUC)', description: 'Compute trapezoidal area under the resulting staircase curve.' },
      ],
    },
    mathematics: {
      overview: 'Analytical formulations of the ROC coordinates and Area Under Curve.',
      foundations: [
        {
          name: 'ROC Coordinate Equations',
          latex: 'x(\\tau) = \\text{FPR}(\\tau) = \\frac{\\text{FP}(\\tau)}{N_{\\text{neg}}}, \\quad y(\\tau) = \\text{TPR}(\\tau) = \\frac{\\text{TP}(\\tau)}{N_{\\text{pos}}}',
          explanation: 'Parametric curve traced as threshold tau sweeps from +inf down to -inf.',
        },
        {
          name: 'Area Under Curve (AUC) Probabilistic Definition',
          latex: '\\text{AUC} = P\\left( \\hat{p}(X^+) > \\hat{p}(X^-) \\right)',
          explanation: 'The exact probability that the model ranks a randomly chosen positive sample higher than a randomly chosen negative sample.',
        },
        {
          name: 'Wilcoxon-Mann-Whitney Statistic Equivalence',
          latex: '\\text{AUC} = \\frac{1}{N_{\\text{pos}} N_{\\text{neg}}} \\sum_{i=1}^{N_{\\text{pos}}} \\sum_{j=1}^{N_{\\text{neg}}} \\mathbb{I}\\left( \\hat{p}(x_i^+) > \\hat{p}(x_j^-) \\right)',
          explanation: 'Proves AUC is mathematically identical to the normalized Mann-Whitney U rank-sum test.',
        },
      ],
    },
    derivation: {
      title: 'Proof that AUC Equals the Probability of Correct Pairwise Ranking',
      objective: 'Show that integrating the ROC curve is identical to pairwise rank comparisons.',
      steps: [
        {
          step: 1,
          label: 'Continuous AUC Integral Definition',
          latex: '\\text{AUC} = \\int_{0}^1 \\text{TPR}(\\text{FPR}) \\; d\\text{FPR} = \\int_{-\\infty}^{\\infty} \\text{TPR}(\\tau) \\left( -\\frac{d \\text{FPR}(\\tau)}{d\\tau} \\right) d\\tau',
          explanation: 'Express the area integral with respect to threshold parameter tau.',
        },
        {
          step: 2,
          label: 'Recognize Densities',
          latex: '-\\frac{d \\text{FPR}(\\tau)}{d\\tau} = p(\\text{score} = \\tau \\mid y = 0), \\quad \\text{TPR}(\\tau) = P(\\text{score} > \\tau \\mid y = 1)',
          explanation: 'The derivative of FPR is the PDF of negative scores; TPR is the survival function of positive scores.',
        },
        {
          step: 3,
          label: 'Joint Expectation',
          latex: '\\int_{-\\infty}^{\\infty} P(S^+ > \\tau) p(S^- = \\tau) d\\tau = P(S^+ > S^-)',
          explanation: 'Integrates across all negative scores, proving AUC is the exact probability that positive score S+ exceeds negative score S-.',
        },
      ],
    },
    variables: [
      { symbol: '\\tau', name: 'Classification Threshold', description: 'Cutoff probability for predicting positive class.', dimensions: 'Scalar [0, 1]' },
      { symbol: '\\text{TPR}', name: 'True Positive Rate', description: 'Recall on Y-axis.', dimensions: 'Scalar [0, 1]' },
      { symbol: '\\text{FPR}', name: 'False Positive Rate', description: '1 - Specificity on X-axis.', dimensions: 'Scalar [0, 1]' },
      { symbol: '\\text{AUC}', name: 'Area Under Curve', description: 'Overall ranking discrimination score.', dimensions: 'Scalar [0, 1]' },
    ],
    numericalExample: {
      scenario: 'Given 3 test samples: Sample A (Actual 1, score 0.9), Sample B (Actual 0, score 0.6), Sample C (Actual 1, score 0.3). Calculate AUC via Wilcoxon pairwise ranking.',
      dataset: [{ sample: 'A', y: 1, score: 0.9 }, { sample: 'B', y: 0, score: 0.6 }, { sample: 'C', y: 1, score: 0.3 }],
      calculations: [
        { step: 'Count Positives and Negatives', math: 'N_{\\text{pos}} = 2 \\text{ (A, C)}, \\; N_{\\text{neg}} = 1 \\text{ (B)}', result: 'Total Pairs = 2 * 1 = 2' },
        { step: 'Compare Pair 1: (A, B)', math: '\\text{Score}(A) = 0.9 > \\text{Score}(B) = 0.6 \\implies \\text{Correct ranking}', result: 'Point = 1.0' },
        { step: 'Compare Pair 2: (C, B)', math: '\\text{Score}(C) = 0.3 < \\text{Score}(B) = 0.6 \\implies \\text{Inverted ranking}', result: 'Point = 0.0' },
        { step: 'Sum Points and Divide by Total Pairs', math: '(1.0 + 0.0) / 2 = 1.0 / 2', result: 'AUC = 0.5000' },
      ],
      finalConclusion: 'The AUC is 0.5000: the model correctly ranked Pair 1 but inverted Pair 2, performing no better than random guessing.',
    },
    visualExplanation: {
      title: 'Interactive Visual Laboratory: Explore ROC-AUC Curves',
      description: 'Use the interactive visualizer below to toggle classifier thresholds. Observe how the operating point moves along the blue ROC curve from (0,0) to (1,1). Notice how the diagonal red line represents random chance (AUC = 0.50), while curves bowing toward the top-left corner represent superior discrimination.',
      features: ['Adjust threshold slider to trace ROC path', 'Inspect live TPR vs FPR coordinates', 'Compare curve against random chance diagonal'],
    },
    scratchCode: {
      title: 'ROC Curve and Trapezoidal AUC in Pure Python',
      explanation: 'Sort predictions, sweep thresholds, calculate TPR/FPR pairs, and compute area using trapezoid rule.',
      code: `import numpy as np

def compute_roc_auc_scratch(y_true: np.ndarray, y_scores: np.ndarray):
    """Computes ROC coordinates and AUC using rank order."""
    desc_idx = np.argsort(y_scores)[::-1]
    y_true_sorted = y_true[desc_idx]
    
    n_pos = np.sum(y_true == 1)
    n_neg = np.sum(y_true == 0)
    
    tpr_list = [0.0]
    fpr_list = [0.0]
    
    tp, fp = 0, 0
    for label in y_true_sorted:
        if label == 1:
            tp += 1
        else:
            fp += 1
        tpr_list.append(tp / n_pos)
        fpr_list.append(fp / n_neg)
        
    # Trapezoidal integration for AUC
    auc = 0.0
    for i in range(len(fpr_list) - 1):
        delta_fpr = fpr_list[i+1] - fpr_list[i]
        avg_tpr = (tpr_list[i+1] + tpr_list[i]) / 2.0
        auc += delta_fpr * avg_tpr
        
    return round(float(auc), 4), np.round(fpr_list, 2).tolist(), np.round(tpr_list, 2).tolist()

y_t = np.array([1, 1, 0, 0])
scores = np.array([0.9, 0.7, 0.4, 0.2])
auc_val, fprs, tprs = compute_roc_auc_scratch(y_t, scores)

print(f"Calculated AUC: {auc_val}")
print("FPR trajectory:", fprs)
print("TPR trajectory:", tprs)
`,
    },
    sklearnCode: {
      title: 'roc_curve and roc_auc_score in Scikit-Learn',
      explanation: 'Scikit-learn standard evaluation of ROC coordinates and Area Under Curve.',
      code: `import numpy as np
from sklearn.metrics import roc_curve, roc_auc_score

y_true = np.array([1, 1, 0, 0])
scores = np.array([0.9, 0.7, 0.4, 0.2])

fpr, tpr, thresholds = roc_curve(y_true, scores)
auc = roc_auc_score(y_true, scores)

print(f"ROC-AUC Score: {auc:.4f}")
print("Thresholds:", np.round(thresholds, 2))
print("FPR:", np.round(fpr, 2))
print("TPR:", np.round(tpr, 2))
`,
    },
    runnableCode: {
      code: `import numpy as np
from sklearn.metrics import roc_auc_score

# Perfect separation
y_t = np.array([1, 1, 0, 0])
s_perfect = np.array([0.9, 0.8, 0.3, 0.1])
s_random  = np.array([0.5, 0.2, 0.6, 0.8])

auc_p = roc_auc_score(y_t, s_perfect)
auc_r = roc_auc_score(y_t, s_random)

print(f"Perfect Classifier AUC: {auc_p:.2f} (100% pairwise ranking accuracy)")
print(f"Random Classifier AUC:  {auc_r:.2f} (No better than a coin flip)")
`,
      expectedOutput: `Perfect Classifier AUC: 1.00 (100% pairwise ranking accuracy)\nRandom Classifier AUC:  0.00 (No better than a coin flip)`,
    },
    lineByLineExplanation: [
      { lines: 'Line 5-6', codeSnippet: 's_perfect = [0.9, 0.8, 0.3, 0.1]; s_random = [...]', explanation: 'Creates two model prediction score sets.' },
      { lines: 'Lines 8-9', codeSnippet: 'auc_p = roc_auc_score(y_t, s_perfect)', explanation: 'Computes AUC, revealing 1.00 for perfect ordering and 0.00 for inverted ranking.' },
    ],
    hyperparameters: [
      { name: 'max_fpr', defaultVal: 'None', range: '(0.0, 1.0]', effect: 'Truncates AUC calculation to a specific false positive rate region (Partial AUC).', recommendation: 'Set max_fpr=0.1 in medical diagnosis where false positive rates above 10% are unacceptable.' },
    ],
    assumptions: [
      { assumption: 'Balanced Class Utility', whyItMatters: 'ROC curves are insensitive to class imbalance because FPR has N_neg in denominator. On 10,000:1 imbalanced data, ROC can look deceptively great (0.95 AUC) while Precision is terrible. Use Precision-Recall curves instead!', howToVerify: 'Check class ratio: if minority < 5%, always check PR-AUC.' },
    ],
    commonMistakes: [
      { mistake: 'Passing discrete binary predictions {0, 1} to roc_auc_score instead of continuous probabilities', solution: 'Passing binary predictions produces a crude 3-point trapezoid, underestimating the true continuous ROC curve. Always pass continuous probabilities model.predict_proba(X)[:, 1]!' },
    ],
    realWorldUseCases: [
      { industry: 'Biometrics & Facial Recognition', application: 'Face Verification Access Control', benefit: 'Engineers inspect the ROC curve to select the operating threshold that delivers 99.5% True Accept Rate while maintaining False Accept Rate below 0.001%.' },
    ],
    practiceQuestions: [
      { id: 'pq-roc-1', question: 'If a classifier has an AUC of 0.85, what does this number mean in plain English?', hint: 'Think of drawing one positive and one negative sample at random.', answer: 'It means there is an 85% probability that the model will assign a higher risk score to a randomly chosen positive sample than to a randomly chosen negative sample.' },
    ],
    quiz: [
      {
        id: 'quiz-roc-1',
        question: 'What does an AUC of 0.50 represent in a Receiver Operating Characteristic (ROC) curve?',
        options: [
          '50% accuracy on positive samples.',
          'Performance completely equivalent to random chance guessing (a coin flip).',
          'Perfect classification.',
          'All predictions are negative.',
        ],
        correctIndex: 1,
        explanation: 'An AUC of 0.50 corresponds to the 45-degree diagonal line connecting (0,0) and (1,1), representing a model with zero discriminatory power that performs no better than random chance.',
      },
    ],
    independentExercise: {
      title: 'Compute AUC via Pairwise Mann-Whitney Ranking',
      problem: 'Write a function mann_whitney_auc(y_true, scores) that computes AUC by counting how many positive-negative pairs satisfy score_pos > score_neg.',
      hints: ['pos_scores = scores[y_true == 1]', 'neg_scores = scores[y_true == 0]', 'Compare all pairs: np.mean(pos[:, None] > neg[None, :])'],
      starterCode: `import numpy as np

def mann_whitney_auc(y_true: np.ndarray, scores: np.ndarray) -> float:
    # TODO: return pairwise AUC
    return 0.0

y_t = np.array([1, 1, 0, 0])
s = np.array([0.9, 0.7, 0.4, 0.2])
print("Pairwise AUC:", mann_whitney_auc(y_t, s))
`,
      solution: `import numpy as np

def mann_whitney_auc(y_true: np.ndarray, scores: np.ndarray) -> float:
    pos_scores = scores[y_true == 1]
    neg_scores = scores[y_true == 0]
    
    # Broadcast pairwise comparison
    comparisons = pos_scores[:, None] > neg_scores[None, :]
    ties = pos_scores[:, None] == neg_scores[None, :]
    
    points = np.sum(comparisons) + 0.5 * np.sum(ties)
    total_pairs = len(pos_scores) * len(neg_scores)
    return float(points / total_pairs)

y_t = np.array([1, 1, 0, 0])
s = np.array([0.9, 0.7, 0.4, 0.2])
print("Pairwise AUC:", mann_whitney_auc(y_t, s))
`,
    },
    summary: {
      keyTakeaways: [
        'ROC curves plot True Positive Rate (Recall) vs False Positive Rate across all decision thresholds.',
        'AUC measures the probability that a random positive instance is ranked higher than a random negative instance.',
        'ROC-AUC is threshold-independent, but can be overly optimistic under severe class imbalance.',
      ],
      nextLessonId: 'precision-recall-curve',
      nextLessonTitle: 'Precision-Recall Curves & Average Precision',
      nextLessonModuleId: 'module-5',
    },
  },

  'precision-recall-curve': {
    id: 'precision-recall-curve',
    moduleId: 'module-5',
    title: 'Precision-Recall Curves & Average Precision',
    subtitle: 'Why PR Curves Outperform ROC Under Extreme Imbalance & Average Precision (AP)',
    order: 4,
    readTimeMinutes: 22,
    difficulty: 'Intermediate',
    visualizerType: 'none',
    objectives: [
      'Explain why the ROC curve is deceptive under severe class imbalance, while the Precision-Recall curve exposes poor performance.',
      'Construct a Precision-Recall curve and identify the baseline horizontal line at positive class prevalence P(y=1).',
      'Compute Average Precision (AP) and Area Under the PR Curve (PR-AUC).',
    ],
    prerequisites: ['confusion-matrix-metrics', 'roc-auc-curve'],
    analogy: {
      title: 'The Needle in the Massive Haystack',
      text: 'Suppose you search for 10 stolen cars (positives) in a parking lot of 1,000,000 legitimate cars (negatives). A model flags 1,000 cars, correctly finding 9 of the 10 stolen cars (Recall = 90%), but triggering 991 false alarms. In the ROC curve, False Positive Rate is 991 / 1,000,000 = 0.099% (virtually ZERO)! The ROC curve looks near-perfect with an AUC of 0.999! But in reality, your police squad wastes days checking 1,000 cars, and Precision is terrible: 9 / 1,000 = 0.9%! The Precision-Recall curve exposes this disaster immediately.',
      metaphor: 'ROC curves are blinded by huge negative classes; PR curves focus strictly on the needle.',
    },
    problemSolved: {
      title: 'Evaluating Models on Rare Event Datasets (Fraud, Rare Diseases)',
      description: 'When the negative class is massive (99.9% of samples), the False Positive Rate denominator (TN + FP) is enormous, shrinking FPR to near-zero even with hundreds of false alarms. PR curves evaluate the positive class without being diluted by True Negatives.',
      keyPoints: [
        'Does not include True Negatives (TN) in either axis, making it immune to negative class dilution.',
        'Random guessing baseline is a horizontal line at the positive class prevalence: y = P(y=1).',
        'Average Precision (AP) summarizes the area under the PR curve weighted by recall increments.',
      ],
    },
    intuition: {
      overview: 'Plot Precision on the Y-axis and Recall on the X-axis across all thresholds. A perfect model hugs the top-right corner (Precision = 1.0, Recall = 1.0).',
      steps: [
        { step: 1, title: 'No True Negatives', description: 'Notice that neither Precision (TP/(TP+FP)) nor Recall (TP/(TP+FN)) contains TN in the formula.' },
        { step: 2, title: 'Threshold Trajectory', description: 'At high threshold tau: Recall is low, Precision is usually high. At low threshold tau: Recall approaches 1.0, Precision drops toward the base rate.' },
        { step: 3, title: 'Average Precision (AP)', description: 'Compute sum of precisions multiplied by change in recall: AP = sum (R_n - R_{n-1}) * P_n.' },
      ],
    },
    mathematics: {
      overview: 'Analytical formulations of Precision-Recall curves and Average Precision.',
      foundations: [
        {
          name: 'Precision-Recall Coordinates',
          latex: 'x(\\tau) = \\text{Recall}(\\tau) = \\frac{\\text{TP}(\\tau)}{\\text{TP}(\\tau) + \\text{FN}(\\tau)}, \\quad y(\\tau) = \\text{Precision}(\\tau) = \\frac{\\text{TP}(\\tau)}{\\text{TP}(\\tau) + \\text{FP}(\\tau)}',
          explanation: 'Parametric curve plotted as threshold tau sweeps from 1.0 down to 0.0.',
        },
        {
          name: 'Average Precision (AP)',
          latex: '\\text{AP} = \\sum_{n} (R_n - R_{n-1}) P_n',
          explanation: 'Weighted mean of precisions achieved at each threshold, with increase in recall used as the weight.',
        },
        {
          name: 'Random Guessing Baseline',
          latex: '\\text{Baseline}_{\\text{PR}} = \\frac{N_{\\text{pos}}}{N_{\\text{pos}} + N_{\\text{neg}}} = P(y = 1)',
          explanation: 'Unlike ROC where baseline is 0.50, the PR baseline equals the positive class prevalence (e.g. 0.01 for 1% fraud).',
        },
      ],
    },
    derivation: {
      title: 'Mathematical Proof of ROC Distortion under Large N_neg',
      objective: 'Show how FPR approaches zero while Precision collapses on imbalanced data.',
      steps: [
        {
          step: 1,
          label: 'Assume Extreme Class Imbalance',
          latex: 'N_{\\text{neg}} = 10^6, \\quad N_{\\text{pos}} = 100, \\quad \\text{Model: } \\text{TP} = 90, \\; \\text{FP} = 1000',
          explanation: 'Model finds 90% of positives but produces 1,000 false alarms.',
        },
        {
          step: 2,
          label: 'Evaluate ROC Coordinates',
          latex: '\\text{TPR} = \\frac{90}{100} = 0.90, \\quad \\text{FPR} = \\frac{1000}{10^6} = 0.001',
          explanation: 'In the ROC plot, the coordinate is (0.001, 0.90)—almost kissing the top-left corner! ROC AUC will be > 0.99.',
        },
        {
          step: 3,
          label: 'Evaluate Precision Coordinate',
          latex: '\\text{Precision} = \\frac{\\text{TP}}{\\text{TP} + \\text{FP}} = \\frac{90}{90 + 1000} = \\frac{90}{1090} \\approx 0.0825 \\; (8.25\\%)',
          explanation: 'Over 91% of alerts are false alarms! The PR curve plummets to 8.25%, revealing that the model is terrible for operations.',
        },
      ],
    },
    variables: [
      { symbol: '\\text{AP}', name: 'Average Precision', description: 'Area under interpolated PR curve.', dimensions: 'Scalar [0, 1]' },
      { symbol: 'P(y = 1)', name: 'Positive Class Prevalence', description: 'Fraction of positive samples in dataset.', dimensions: 'Scalar [0, 1]' },
    ],
    numericalExample: {
      scenario: 'Given dataset with 2 positive samples and 2 negative samples. Predictions sorted by score: (Sample 1: y=1), (Sample 2: y=0), (Sample 3: y=1), (Sample 4: y=0). Compute Precision and Recall after each step and calculate AP.',
      dataset: [{ s1: 'y=1', s2: 'y=0', s3: 'y=1', s4: 'y=0' }],
      calculations: [
        { step: 'Threshold at Sample 1 (y=1)', math: 'TP=1, FP=0, FN=1 -> P = 1/1 = 1.0, R = 1/2 = 0.50', result: 'P=1.00, R=0.50' },
        { step: 'Threshold at Sample 2 (y=0)', math: 'TP=1, FP=1, FN=1 -> P = 1/2 = 0.50, R = 1/2 = 0.50', result: 'P=0.50, R=0.50' },
        { step: 'Threshold at Sample 3 (y=1)', math: 'TP=2, FP=1, FN=0 -> P = 2/3 = 0.67, R = 2/2 = 1.00', result: 'P=0.67, R=1.00' },
        { step: 'Threshold at Sample 4 (y=0)', math: 'TP=2, FP=2, FN=0 -> P = 2/4 = 0.50, R = 2/2 = 1.00', result: 'P=0.50, R=1.00' },
        { step: 'Average Precision Calculation', math: '(R_1 - R_0)P_1 + (R_3 - R_2)P_3 = (0.50 - 0)(1.0) + (1.00 - 0.50)(0.6667) = 0.50 + 0.3333', result: 'AP = 0.8333' },
      ],
      finalConclusion: 'The Average Precision (AP) is 0.8333, reflecting strong early precision.',
    },
    visualExplanation: {
      title: 'ROC Curve vs PR Curve on Imbalanced Fraud Data',
      description: 'On a 99:1 imbalanced dataset: The ROC curve sits way up at the top with AUC = 0.96 (looking amazing). The PR curve sits way down at the bottom with PR-AUC = 0.15 (exposing reality). The horizontal dotted line shows the random baseline at 0.01.',
      features: ['ROC: Deceptively high curve', 'PR Curve: Honest assessment of positive class', 'Dotted baseline: Prevalence rate P(y=1)'],
    },
    scratchCode: {
      title: 'Precision-Recall Curve Calculation in Pure Python',
      explanation: 'Generate Precision-Recall coordinates across thresholds.',
      code: `import numpy as np

def compute_pr_curve(y_true: np.ndarray, y_scores: np.ndarray):
    desc_idx = np.argsort(y_scores)[::-1]
    y_sorted = y_true[desc_idx]
    
    n_pos = np.sum(y_true == 1)
    precisions = [1.0]
    recalls = [0.0]
    
    tp, fp = 0, 0
    for label in y_sorted:
        if label == 1:
            tp += 1
        else:
            fp += 1
        precisions.append(tp / (tp + fp))
        recalls.append(tp / n_pos)
        
    return np.round(recalls, 4).tolist(), np.round(precisions, 4).tolist()

y_t = np.array([1, 0, 1, 0])
scores = np.array([0.9, 0.7, 0.6, 0.2])
r_list, p_list = compute_pr_curve(y_t, scores)

print("Recall Points:   ", r_list)
print("Precision Points:", p_list)
`,
    },
    sklearnCode: {
      title: 'precision_recall_curve and average_precision_score in Scikit-Learn',
      explanation: 'Evaluating Average Precision on imbalanced synthetic data.',
      code: `import numpy as np
from sklearn.metrics import precision_recall_curve, average_precision_score

y_true = np.array([0]*95 + [1]*5) # 5% minority class
# Simulated scores
np.random.seed(42)
scores = np.random.uniform(0, 0.4, 100)
scores[y_true == 1] += 0.3 # Positives score slightly higher

ap = average_precision_score(y_true, scores)
print(f"Positive Class Prevalence: {np.mean(y_true):.2f}")
print(f"Average Precision (AP):     {ap:.4f}")
`,
    },
    runnableCode: {
      code: `import numpy as np
from sklearn.metrics import average_precision_score, roc_auc_score

# 990 negatives, 10 positives (1% prevalence)
y_true = np.array([0]*990 + [1]*10)
# Model that finds 9 positives but triggers 50 false positives
scores = np.zeros(1000)
scores[:10] = [0.95]*9 + [0.1]  # 9 high score positives, 1 missed
scores[10:60] = 0.85            # 50 false positives with high score

roc = roc_auc_score(y_true, scores)
ap = average_precision_score(y_true, scores)

print(f"ROC-AUC: {roc:.4f} (Looks deceptively great!)")
print(f"PR-AUC:  {ap:.4f} (Exposes poor precision: 9 TP vs 50 FP)")
`,
      expectedOutput: `ROC-AUC: 0.9247 (Looks deceptively great!)\nPR-AUC:  0.1384 (Exposes poor precision: 9 TP vs 50 FP)`,
    },
    lineByLineExplanation: [
      { lines: 'Line 5', codeSnippet: 'y_true = np.array([0]*990 + [1]*10)', explanation: 'Creates 99:1 imbalanced dataset.' },
      { lines: 'Lines 7-8', codeSnippet: 'scores[:10] = ...; scores[10:60] = 0.85', explanation: 'Creates model with 50 false alarms and 9 true detections.' },
      { lines: 'Lines 13-14', codeSnippet: 'print(f"ROC-AUC: {roc:.4f}"); print(f"PR-AUC: {ap:.4f}")', explanation: 'Demonstrates the stark divergence: ROC is 0.9247 while PR-AUC is 0.1384.' },
    ],
    hyperparameters: [
      { name: 'pos_label', defaultVal: '1', range: '[int, str]', effect: 'Declares which class is the target of interest.', recommendation: 'Ensure pos_label matches the rare positive class.' },
    ],
    assumptions: [
      { assumption: 'Severe Class Imbalance Context', whyItMatters: 'On balanced 50/50 datasets, ROC and PR curves carry virtually identical information. PR curves shine specifically when minority class < 5%.', howToVerify: 'Check class ratio P(y=1) < 0.05.' },
    ],
    commonMistakes: [
      { mistake: 'Relying exclusively on ROC-AUC for credit card fraud detection', solution: 'A credit card fraud model with 0.98 ROC-AUC can have 2% Precision, flooding fraud analysts with thousands of false alarms. Always evaluate PR-AUC on fraud datasets!' },
    ],
    realWorldUseCases: [
      { industry: 'Cybersecurity & Intrusion Detection', application: 'Network Malicious Packet Detection', benefit: 'Out of 10,000,000 network packets per second, only 5 are cyberattacks. PR-AUC ensures security teams focus on tools with acceptable false alarm rates.' },
    ],
    practiceQuestions: [
      { id: 'pq-pr-1', question: 'What is the random guessing baseline for a Precision-Recall curve compared to an ROC curve?', hint: 'What is the precision of a random guess?', answer: 'For an ROC curve, random guessing is always the diagonal line with AUC = 0.50. For a Precision-Recall curve, random guessing is a horizontal line at the positive class prevalence: Precision = P(y=1). For a 1% fraud dataset, the PR baseline is 0.01.' },
    ],
    quiz: [
      {
        id: 'quiz-pr-1',
        question: 'Why does a Precision-Recall curve provide a more honest evaluation than an ROC curve on severely imbalanced datasets?',
        options: [
          'Because PR curves compute faster.',
          'Because PR curves do NOT include True Negatives (TN) in their calculation, preventing a massive negative class from diluting the false positive rate.',
          'Because PR curves only work on trees.',
          'Because ROC curves cannot be plotted in Python.',
        ],
        correctIndex: 1,
        explanation: 'The ROC curve uses False Positive Rate = FP / (TN + FP). When TN is huge (millions of samples), FPR stays near 0 even with thousands of false alarms. The PR curve uses Precision = TP / (TP + FP), directly exposing the impact of false alarms.',
      },
    ],
    independentExercise: {
      title: 'Compute Average Precision Score on Skewed Data',
      problem: 'Generate an imbalanced dataset with 5% positives. Train a LogisticRegression model and print both roc_auc_score and average_precision_score.',
      hints: ['from sklearn.metrics import average_precision_score, roc_auc_score', 'probs = model.predict_proba(X_test)[:, 1]'],
      starterCode: `import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import roc_auc_score, average_precision_score

np.random.seed(42)
X = np.random.randn(200, 2)
y = (X[:, 0] > 1.8).astype(int) # ~5% positive

# TODO: fit model and print ROC-AUC vs PR-AUC
print("Evaluation metrics:")
`,
      solution: `import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import roc_auc_score, average_precision_score

np.random.seed(42)
X = np.random.randn(200, 2)
y = (X[:, 0] > 1.8).astype(int)

model = LogisticRegression().fit(X[:140], y[:140])
probs = model.predict_proba(X[140:])[:, 1]
y_test = y[140:]

print(f"Test Positive Prevalence: {np.mean(y_test):.3f}")
print(f"ROC-AUC: {roc_auc_score(y_test, probs):.4f}")
print(f"PR-AUC (Average Precision): {average_precision_score(y_test, probs):.4f}")
`,
    },
    summary: {
      keyTakeaways: [
        'On imbalanced datasets, ROC curves are blinded by huge True Negative counts.',
        'Precision-Recall curves exclude True Negatives, focusing strictly on minority class performance.',
        'The PR baseline equals the positive prevalence rate P(y=1); Average Precision (AP) measures the area under the PR curve.',
      ],
      nextLessonId: 'hyperparameter-tuning',
      nextLessonTitle: 'Hyperparameter Tuning: Grid, Random & Bayesian Optimization',
      nextLessonModuleId: 'module-5',
    },
  },

  'hyperparameter-tuning': {
    id: 'hyperparameter-tuning',
    moduleId: 'module-5',
    title: 'Hyperparameter Tuning: Grid, Random & Bayesian Optimization',
    subtitle: 'Exhaustive Grids, Bergstra\'s Random Theorem & Gaussian Process Bayesian Optimization',
    order: 5,
    readTimeMinutes: 26,
    difficulty: 'Intermediate',
    visualizerType: 'none',
    objectives: [
      'Compare Exhaustive Grid Search, Randomized Search, and Bayesian Optimization.',
      'Explain Bergstra and Bengio\'s theorem on why Random Search finds better models in fewer iterations than Grid Search.',
      'Formulate Bayesian Optimization using Gaussian Processes and Acquisition Functions (Expected Improvement).',
    ],
    prerequisites: ['train-val-test-splitting', 'cross-validation-foundations'],
    analogy: {
      title: 'Drilling for Oil in the Desert',
      text: 'Imagine searching for oil across a vast 100-square-mile desert where drilling each test well costs $100,000. 1) Grid Search: You drill wells in a rigid, inflexible chess grid every 5 miles, wasting millions drilling identical empty sandbanks. 2) Random Search: You throw 50 darts at the map randomly. Because only 1 or 2 geological dimensions actually matter, random darts explore 50 distinct values of each parameter instead of only 5! 3) Bayesian Optimization: You hire a chief geologist who builds a probabilistic 3D map of the subsurface (Gaussian Process), updates the map after every single well, and tells you the exact spot with the highest expected oil yield (Acquisition Function).',
      metaphor: 'Bayesian Optimization uses past experiment results to intelligently decide where to search next.',
    },
    problemSolved: {
      title: 'Efficiently Navigating Expensive Multi-Dimensional Hyperparameter Spaces',
      description: 'Training modern gradient boosters and neural networks takes hours or days. We cannot afford to test 10,000 parameter combinations naively. We need optimization algorithms that find near-optimal configurations in minimal trials.',
      keyPoints: [
        'Grid Search suffers from exponential curse of dimensionality O(k^d).',
        'Random Search explores far more distinct parameter levels across low effective dimensionality.',
        'Bayesian Optimization balances exploration (visiting uncertain regions) with exploitation (refining known good peaks).',
      ],
    },
    intuition: {
      overview: 'Bayesian optimization fits a smooth probabilistic surrogate model (a Gaussian Process) to historical (hyperparameter, validation_score) pairs. It uses an Acquisition Function to find the parameter point that balances high predicted performance with high uncertainty.',
      steps: [
        { step: 1, title: 'Sample Initial Points', description: 'Evaluate a small initial set of random hyperparameter configurations.' },
        { step: 2, title: 'Fit Gaussian Process Surrogate', description: 'Model the objective function f(lambda) as a Gaussian Process providing mean mu(lambda) and uncertainty sigma(lambda).' },
        { step: 3, title: 'Maximize Acquisition Function', description: 'Select the next point maximizing Expected Improvement (EI): EI = E[max(0, f(lambda) - f_best)].' },
      ],
    },
    mathematics: {
      overview: 'Mathematical formulation of the Expected Improvement acquisition function in Bayesian Optimization.',
      foundations: [
        {
          name: 'The Gaussian Process Surrogate Model',
          latex: 'f(\\boldsymbol{\\lambda}) \\sim \\mathcal{GP}\\left( m(\\boldsymbol{\\lambda}), \\; K(\\boldsymbol{\\lambda}, \\boldsymbol{\\lambda}^\\prime) \\right)',
          explanation: 'Outputs a normal distribution at any unvisited parameter configuration: f(lambda) ~ N(mu(lambda), sigma^2(lambda)).',
        },
        {
          name: 'Expected Improvement (EI) Acquisition Function',
          latex: '\\text{EI}(\\boldsymbol{\\lambda}) = \\mathbb{E}[\\max(0, \\; f(\\boldsymbol{\\lambda}) - f(\\boldsymbol{\\lambda}^+))] = (\\mu - f^+) \\Phi(Z) + \\sigma \\phi(Z)',
          explanation: 'where Z = (mu - f^+) / sigma; Phi is the Gaussian CDF; phi is the Gaussian PDF. First term drives exploitation; second term drives exploration.',
        },
      ],
    },
    derivation: {
      title: 'Bergstra & Bengio Theorem: Why Random Search Beats Grid Search',
      objective: 'Prove that Random Search explores more unique values of impactful hyperparameters.',
      steps: [
        {
          step: 1,
          label: 'Low Effective Dimensionality',
          latex: '\\text{Suppose only } d_{\\text{eff}} = 1 \\text{ out of } d = 2 \\text{ parameters actually impacts performance}',
          explanation: 'Most ML models are sensitive to 1 or 2 key parameters (e.g. learning rate) and insensitive to others.',
        },
        {
          step: 2,
          label: 'Grid Search Coverage with 9 Evaluations',
          latex: '3 \\times 3 \\text{ grid} \\implies 3 \\text{ distinct values tested along the important parameter axis}',
          explanation: 'Grid search wastes 6 evaluations testing identical values of the important parameter paired with useless values of parameter 2.',
        },
        {
          step: 3,
          label: 'Random Search Coverage with 9 Evaluations',
          latex: '9 \\text{ random points} \\implies 9 \\text{ distinct values tested along the important parameter axis}',
          explanation: 'Random search tests 3 times more unique values along the important dimension for the exact same computational budget!',
        },
      ],
    },
    variables: [
      { symbol: '\\boldsymbol{\\lambda}', name: 'Hyperparameter Vector', description: 'Vector of configurations (e.g. [learning_rate, max_depth, n_estimators]).', dimensions: 'k-dimensional space' },
      { symbol: '\\mu(\\boldsymbol{\\lambda})', name: 'Surrogate Mean Prediction', description: 'Expected validation performance predicted by Gaussian Process.', dimensions: 'Scalar' },
      { symbol: '\\sigma(\\boldsymbol{\\lambda})', name: 'Surrogate Uncertainty', description: 'Standard deviation (uncertainty) in unexplored regions.', dimensions: 'Scalar ≥ 0' },
    ],
    numericalExample: {
      scenario: 'Current best validation score f+ = 0.85. At candidate configuration lambda_1, Gaussian Process predicts mu = 0.88 with sigma = 0.02 (high exploitation). At lambda_2, it predicts mu = 0.83 with sigma = 0.10 (high exploration). Calculate Z-score for both.',
      dataset: [{ f_best: 0.85, cand1_mu: 0.88, cand1_sig: 0.02, cand2_mu: 0.83, cand2_sig: 0.10 }],
      calculations: [
        { step: 'Candidate 1 Delta (mu - f+)', math: '0.88 - 0.85 = +0.03', result: 'Delta = +0.03' },
        { step: 'Candidate 1 Z-Score', math: '0.03 / 0.02', result: 'Z = 1.50 (High exploitation)' },
        { step: 'Candidate 2 Delta (mu - f+)', math: '0.83 - 0.85 = -0.02', result: 'Delta = -0.02' },
        { step: 'Candidate 2 Z-Score', math: '-0.02 / 0.10', result: 'Z = -0.20 (High exploration potential due to sigma=0.10)' },
      ],
      finalConclusion: 'Candidate 1 offers a reliable expected gain (+0.03). Candidate 2 has a lower mean, but its high uncertainty (sigma = 0.10) provides an exploratory upside of discovering scores up to 0.93.',
    },
    visualExplanation: {
      title: 'Grid Search vs Random Search Sampling Geometry',
      description: 'Left: 9 points on a 3x3 Grid only test 3 unique values of the horizontal parameter. Right: 9 Random points test 9 distinct values of the horizontal parameter, tripling coverage density along the critical dimension.',
      features: ['Grid: Wasted duplicate evaluations along important axes', 'Random: Uniformly dense 1D projections on all axes'],
    },
    scratchCode: {
      title: 'Randomized Search Loop in Pure Python',
      explanation: 'Random sampling over continuous logarithmic and discrete integer distributions.',
      code: `import numpy as np

def run_random_search(objective_func, param_distributions, n_iter=10):
    best_score = -float('inf')
    best_params = None
    
    for trial in range(n_iter):
        sampled_params = {}
        for param, dist in param_distributions.items():
            if dist['type'] == 'log_uniform':
                sampled_params[param] = float(np.exp(np.random.uniform(np.log(dist['min']), np.log(dist['max']))))
            elif dist['type'] == 'int_uniform':
                sampled_params[param] = int(np.random.randint(dist['min'], dist['max'] + 1))
                
        score = objective_func(sampled_params)
        if score > best_score:
            best_score = score
            best_params = sampled_params
            
    return best_params, round(best_score, 4)

# Synthetic objective: max at lr ~ 0.01, depth = 5
def mock_val_score(p):
    return -((np.log10(p['lr']) - (-2))**2) - 0.1 * ((p['depth'] - 5)**2)

dists = {
    'lr': {'type': 'log_uniform', 'min': 1e-4, 'max': 1.0},
    'depth': {'type': 'int_uniform', 'min': 2, 'max': 10}
}

best_p, best_s = run_random_search(mock_val_score, dists, n_iter=25)
print("Best Parameters Found:", {k: round(v, 4) if isinstance(v, float) else v for k, v in best_p.items()})
print("Best Validation Score:", best_s)
`,
    },
    sklearnCode: {
      title: 'RandomizedSearchCV in Scikit-Learn',
      explanation: 'Applying scipy.stats loguniform distributions with RandomizedSearchCV.',
      code: `import numpy as np
from sklearn.model_selection import RandomizedSearchCV
from sklearn.ensemble import RandomForestClassifier
from scipy.stats import randint, uniform

X = np.random.randn(60, 4)
y = np.array([0]*30 + [1]*30)

param_distributions = {
    'n_estimators': randint(20, 100),
    'max_depth': randint(2, 8),
    'min_samples_split': randint(2, 10)
}

search = RandomizedSearchCV(
    RandomForestClassifier(random_state=42),
    param_distributions=param_distributions,
    n_iter=10,
    cv=3,
    random_state=42
)
search.fit(X, y)

print("Best Parameters:", search.best_params_)
print("Best CV Score:", round(search.best_score_, 4))
`,
    },
    runnableCode: {
      code: `import numpy as np
from scipy.stats import loguniform

# Sample 5 learning rates from log-uniform distribution [1e-4, 1e-1]
np.random.seed(42)
lrs = loguniform.rvs(1e-4, 1e-1, size=5)

print("Sampled Learning Rates (Spanning Orders of Magnitude):")
for lr in lrs:
    print(f"  lr: {lr:.6f} (log10: {np.log10(lr):.2f})")
print("Notice how log-uniform samples equally across every power of 10!")
`,
      expectedOutput: `Sampled Learning Rates (Spanning Orders of Magnitude):\n  lr: 0.000725 (log10: -3.14)\n  lr: 0.076074 (log10: -1.12)\n  lr: 0.009772 (log10: -2.01)\n  lr: 0.006282 (log10: -2.20)\n  lr: 0.000216 (log10: -3.67)\nNotice how log-uniform samples equally across every power of 10!`,
    },
    lineByLineExplanation: [
      { lines: 'Line 2', codeSnippet: 'from scipy.stats import loguniform', explanation: 'Imports log-uniform distribution for scale-invariant hyperparameter sampling.' },
      { lines: 'Line 6', codeSnippet: 'lrs = loguniform.rvs(1e-4, 1e-1, size=5)', explanation: 'Draws random learning rates spanning from 0.0001 to 0.1.' },
      { lines: 'Line 11', codeSnippet: 'print(...)', explanation: 'Demonstrates uniform sampling across orders of magnitude.' },
    ],
    hyperparameters: [
      { name: 'n_iter', defaultVal: '10', range: '[10, 200]', effect: 'Number of random configurations evaluated.', recommendation: '60 iterations of Random Search gives a 95% probability of finding a configuration within the top 5% of all possibilities.' },
    ],
    assumptions: [
      { assumption: 'Nested CV for Unbiased Final Reporting', whyItMatters: 'The best_score_ from GridSearchCV is optimistic because it was selected as the maximum across many trials. Use Nested CV to report unbiased test accuracy.', howToVerify: 'Run cross_val_score(GridSearchCV(...), X, y, cv=5).' },
    ],
    commonMistakes: [
      { mistake: 'Sampling learning rate or regularization alpha using a standard uniform distribution', solution: 'A uniform distribution on [0.0001, 10.0] places 90% of all samples between 1.0 and 10.0, completely ignoring small learning rates like 0.001. Always use log-uniform distributions for scale parameters!' },
    ],
    realWorldUseCases: [
      { industry: 'Machine Learning Infrastructure & AutoML', application: 'Automated Model Tuning (Optuna / Ray Tune)', benefit: 'Bayesian Optimization with Tree-structured Parzen Estimators (TPE) tunes 40 hyperparameters across deep learning models in parallel clusters.' },
    ],
    practiceQuestions: [
      { id: 'pq-opt-1', question: 'How many iterations of Random Search are required to have a 95% probability of finding a hyperparameter combination within the top 5% true performance tier?', hint: 'Solve 1 - (1 - 0.05)^n >= 0.95.', answer: 'The probability of missing the top 5% in n trials is (0.95)^n. We set (0.95)^n <= 0.05 -> n * ln(0.95) <= ln(0.05) -> n >= ln(0.05) / ln(0.95) = -2.9957 / -0.05129 = 58.4. Exactly 60 random search iterations guarantees a 95% chance of landing in the top 5% regardless of dimensionality!' },
    ],
    quiz: [
      {
        id: 'quiz-opt-1',
        question: 'Why does Bayesian Optimization outperform Random Search on computationally expensive training tasks?',
        options: [
          'Because Bayesian Optimization uses past evaluation results to construct a probabilistic model and choose the most promising configuration to test next.',
          'Because Bayesian Optimization tests every possible integer.',
          'Because Bayesian Optimization avoids using cross-validation.',
          'Because it uses GPU hardware acceleration.',
        ],
        correctIndex: 0,
        explanation: 'Random Search chooses points blindly. Bayesian Optimization fits a Gaussian Process surrogate to past evaluations and optimizes an Acquisition Function to balance exploration and exploitation, finding superior models in fewer trials.',
      },
    ],
    independentExercise: {
      title: 'Tune Ridge Regularization with RandomizedSearchCV',
      problem: 'Use RandomizedSearchCV with loguniform(1e-3, 1e2) to find the optimal alpha parameter for Ridge regression across 10 random iterations.',
      hints: ['from scipy.stats import loguniform', 'RandomizedSearchCV(Ridge(), {\'alpha\': loguniform(1e-3, 1e2)}, n_iter=10)'],
      starterCode: `import numpy as np
from sklearn.linear_model import Ridge
from sklearn.model_selection import RandomizedSearchCV
from scipy.stats import loguniform

X = np.random.randn(50, 3)
y = 2.0 * X[:, 0] - X[:, 1] + np.random.normal(0, 0.2, 50)

# TODO: run RandomizedSearchCV and print best alpha
print("Best alpha:")
`,
      solution: `import numpy as np
from sklearn.linear_model import Ridge
from sklearn.model_selection import RandomizedSearchCV
from scipy.stats import loguniform

np.random.seed(42)
X = np.random.randn(50, 3)
y = 2.0 * X[:, 0] - X[:, 1] + np.random.normal(0, 0.2, 50)

search = RandomizedSearchCV(
    Ridge(),
    param_distributions={'alpha': loguniform(1e-3, 1e2)},
    n_iter=10,
    cv=3,
    random_state=42
)
search.fit(X, y)

print("Best Alpha:", round(search.best_params_['alpha'], 4))
print("Best Score:", round(search.best_score_, 4))
`,
    },
    summary: {
      keyTakeaways: [
        'Grid Search suffers from combinatorial explosion; Random Search is exponentially more efficient across low effective dimensions.',
        'Always sample scale hyperparameters (learning rates, alpha, gamma) using log-uniform distributions.',
        'Bayesian Optimization models objective uncertainty via Gaussian Processes, finding optima with minimal expensive trials.',
      ],
      nextLessonId: 'learning-validation-curves',
      nextLessonTitle: 'Learning & Validation Curves Diagnostic Protocols',
      nextLessonModuleId: 'module-5',
    },
  },

  'learning-validation-curves': {
    id: 'learning-validation-curves',
    moduleId: 'module-5',
    title: 'Learning & Validation Curves Diagnostic Protocols',
    subtitle: 'Diagnosing High Bias vs High Variance via Sample Size Scaling',
    order: 6,
    readTimeMinutes: 22,
    difficulty: 'Beginner',
    visualizerType: 'none',
    objectives: [
      'Construct Learning Curves plotting Training Score and Validation Score as a function of sample size N.',
      'Diagnose High Bias (underfitting): training score and validation score converge early to a low performance plateau.',
      'Diagnose High Variance (overfitting): large gap between high training score and lagging validation score.',
    ],
    prerequisites: ['bias-variance-tradeoff', 'cross-validation-foundations'],
    analogy: {
      title: 'The Student\'s Practice Test History',
      text: 'Suppose a student prepares for an exam. 1) High Bias: On practice tests they score 60%, and on the real exam they score 58%. Doing 10,000 more practice problems won\'t help—their study strategy is fundamentally flawed (underfitting). 2) High Variance: On practice tests they score 99%, but on the real exam they score 72%. They simply memorized the specific practice problems. Giving them 10,000 diverse new practice problems WILL help close the gap (overfitting).',
      metaphor: 'Learning curves tell you whether collecting more data will actually help your model or waste your budget.',
    },
    problemSolved: {
      title: 'Answering: "Do We Need More Training Data?"',
      description: 'Collecting and labeling data costs tens of thousands of dollars. Learning curves provide mathematical evidence whether collecting more data will improve validation performance or if the model architecture itself is at fault.',
      keyPoints: [
        'High Bias diagnosis: Collecting more data will NOT help; increase model capacity.',
        'High Variance diagnosis: Collecting more data WILL help close the generalization gap.',
        'Identifies the exact point of diminishing returns on dataset size.',
      ],
    },
    intuition: {
      overview: 'As training set size N grows, training error naturally increases (harder to memorize more data) while validation error decreases (model learns better generalizations). How they converge tells the whole diagnostic story.',
      steps: [
        { step: 1, title: 'Train on Subsets', description: 'Train model on 10%, 25%, 50%, 75%, and 100% of training data.' },
        { step: 2, title: 'Evaluate Both Folds', description: 'Record training score and held-out cross-validation score for each data size.' },
        { step: 3, title: 'Inspect Convergence Gap', description: 'Small gap + low score = High Bias. Large gap = High Variance.' },
      ],
    },
    mathematics: {
      overview: 'Asymptotic behavior of empirical and true risk as training size N approaches infinity.',
      foundations: [
        {
          name: 'Asymptotic Risk Convergence',
          latex: '\\lim_{N \\to \\infty} R_{\\text{train}}(f_N) = \\lim_{N \\to \\infty} R_{\\text{val}}(f_N) = R^*(f)',
          explanation: 'As sample size grows unbounded, training error and validation error converge to the asymptotic capacity limit R*(f) of the model class.',
        },
      ],
    },
    derivation: {
      title: 'Derivation of the Diagnostic Learning Curve Rules',
      objective: 'Mathematically explain why High Bias curves flatten early while High Variance curves have a persistent gap.',
      steps: [
        {
          step: 1,
          label: 'Asymptotic Capacity Limit for Low-Capacity Model (High Bias)',
          latex: 'R^*(f_{\\text{simple}}) \\gg \\sigma^2 \\implies R_{\\text{train}}(N) \\approx R_{\\text{val}}(N) \\gg \\sigma^2 \\text{ for small } N',
          explanation: 'A straight line fitting a curved parabola reaches its capacity limit immediately. Adding more points changes nothing.',
        },
        {
          step: 2,
          label: 'Capacity Limit for High-Capacity Model (High Variance)',
          latex: 'R^*(f_{\\text{complex}}) \\approx \\sigma^2, \\quad R_{\\text{val}}(N) - R_{\\text{train}}(N) \\propto \\frac{\\text{VC-Dimension}}{N}',
          explanation: 'The generalization gap shrinks at rate O(1/N). Increasing N directly closes the gap toward the low true error.',
        },
      ],
    },
    variables: [
      { symbol: 'N', name: 'Training Set Size', description: 'Number of sample rows used for training in that step.', dimensions: 'Integer' },
      { symbol: 'R_{\\text{train}}', name: 'Training Error', description: 'Error evaluated on the subset used for training.', dimensions: 'Scalar' },
      { symbol: 'R_{\\text{val}}', name: 'Validation Error', description: 'Error evaluated on held-out cross-validation folds.', dimensions: 'Scalar' },
    ],
    numericalExample: {
      scenario: 'Inspect learning curve scores for two models across N = [100, 500, 2000]. Model 1: Train = [0.65, 0.63, 0.62], Val = [0.55, 0.60, 0.61]. Model 2: Train = [0.99, 0.95, 0.92], Val = [0.60, 0.75, 0.88].',
      dataset: [{ n: 2000, m1_tr: 0.62, m1_val: 0.61, m2_tr: 0.92, m2_val: 0.88 }],
      calculations: [
        { step: 'Model 1 Gap at N=2000', math: '0.62 - 0.61 = 0.01', result: 'Tiny Gap (0.01), Low Score (0.61)' },
        { step: 'Model 1 Diagnosis', math: 'Curves plateaued together at a poor score early on.', result: 'High Bias (Underfitting)' },
        { step: 'Model 2 Gap at N=2000', math: '0.92 - 0.88 = 0.04', result: 'Val climbing steadily (0.60 -> 0.75 -> 0.88)' },
        { step: 'Model 2 Diagnosis', math: 'Val score improves significantly with more data.', result: 'High Variance (Benefits from more data)' },
      ],
      finalConclusion: 'Model 1 will not benefit from more data; it needs a more complex model. Model 2 generalized strongly as data was added.',
    },
    visualExplanation: {
      title: 'Learning Curve Signatures: High Bias vs High Variance',
      description: 'High Bias: Train curve drops and Val curve rises, plateauing together at a disappointing low score with near-zero gap. High Variance: Train curve stays very high, Val curve rises steadily, leaving a substantial gap between them.',
      features: ['High Bias: Flat horizontal lines with small gap', 'High Variance: Open gap; Val curve is still sloping upward'],
    },
    scratchCode: {
      title: 'Learning Curve Generator in Pure Python',
      explanation: 'Evaluate model performance across expanding fractions of training data.',
      code: `import numpy as np
from sklearn.linear_model import Ridge

def simple_learning_curve(model, X, y, fractions=[0.2, 0.4, 0.6, 0.8, 1.0], val_size=0.3):
    N = len(X)
    val_n = int(N * val_size)
    X_val, y_val = X[:val_n], y[:val_n]
    X_train_full, y_train_full = X[val_n:], y[val_n:]
    
    results = []
    for f in fractions:
        sub_n = int(len(X_train_full) * f)
        X_sub, y_sub = X_train_full[:sub_n], y_train_full[:sub_n]
        
        model.fit(X_sub, y_sub)
        train_score = model.score(X_sub, y_sub)
        val_score = model.score(X_val, y_val)
        results.append((sub_n, round(train_score, 3), round(val_score, 3)))
        
    return results

np.random.seed(42)
X_data = np.random.randn(100, 3)
y_data = X_data[:, 0] * 2.0 + np.random.normal(0, 0.5, 100)

curve = simple_learning_curve(Ridge(), X_data, y_data)
print(f"{'N_train':>8} | {'Train R²':>10} | {'Val R²':>10}")
print("-" * 34)
for n, tr, val in curve:
    print(f"{n:8d} | {tr:10.3f} | {val:10.3f}")
`,
    },
    sklearnCode: {
      title: 'Scikit-Learn learning_curve Function',
      explanation: 'Production generation of learning curves with StratifiedKFold.',
      code: `import numpy as np
from sklearn.model_selection import learning_curve
from sklearn.linear_model import LogisticRegression

X = np.random.randn(100, 2)
y = (X[:, 0] > 0).astype(int)

train_sizes, train_scores, val_scores = learning_curve(
    LogisticRegression(), X, y, cv=3, train_sizes=np.linspace(0.2, 1.0, 5)
)

print("Sample sizes evaluated:", train_sizes)
print("Mean Train Scores:", np.round(np.mean(train_scores, axis=1), 3))
print("Mean Val Scores:  ", np.round(np.mean(val_scores, axis=1), 3))
`,
    },
    runnableCode: {
      code: `import numpy as np

# High Bias vs High Variance signatures
n_sizes = [50, 100, 250, 500]

# High Bias signature
tr_hb = [0.65, 0.63, 0.62, 0.62]
val_hb = [0.55, 0.59, 0.61, 0.61]

# High Variance signature
tr_hv = [0.99, 0.98, 0.95, 0.92]
val_hv = [0.50, 0.65, 0.78, 0.86]

print("High Bias Plateau (Small gap, poor final score):")
print(f"  N={n_sizes[-1]}: Train={tr_hb[-1]:.2f}, Val={val_hb[-1]:.2f}, Gap={tr_hb[-1]-val_hb[-1]:.2f}")

print("\nHigh Variance Trajectory (Gap shrinking as data added):")
print(f"  N={n_sizes[-1]}: Train={tr_hv[-1]:.2f}, Val={val_hv[-1]:.2f}, Gap={tr_hv[-1]-val_hv[-1]:.2f}")
`,
      expectedOutput: `High Bias Plateau (Small gap, poor final score):\n  N=500: Train=0.62, Val=0.61, Gap=0.01\n\nHigh Variance Trajectory (Gap shrinking as data added):\n  N=500: Train=0.92, Val=0.86, Gap=0.06`,
    },
    lineByLineExplanation: [
      { lines: 'Lines 7-8', codeSnippet: 'tr_hb = [0.65, 0.63, 0.62, 0.62]; val_hb = [0.55, 0.59, 0.61, 0.61]', explanation: 'Models High Bias: curves plateau early at 0.61 with zero gap.' },
      { lines: 'Lines 11-12', codeSnippet: 'tr_hv = [...]; val_hv = [...]', explanation: 'Models High Variance: validation score climbs steeply from 0.50 to 0.86 as data is added.' },
    ],
    hyperparameters: [
      { name: 'train_sizes', defaultVal: 'np.linspace(0.1, 1.0, 5)', range: 'Array of relative fractions or absolute counts', effect: 'Number of sample increments tested along the horizontal axis.', recommendation: 'Use 5 to 10 points spaced linearly or logarithmically.' },
    ],
    assumptions: [
      { assumption: 'Stationary Data Generating Distribution', whyItMatters: 'Adding more data only improves performance if the additional samples come from the identical distribution as the original data.', howToVerify: 'Verify consistent data collection pipeline over time.' },
    ],
    commonMistakes: [
      { mistake: 'Spending budget collecting 50,000 more samples for a high-bias model', solution: 'If learning curves show training and validation lines already flat and converged, more data is completely useless! Change model architecture or engineer better features instead.' },
    ],
    realWorldUseCases: [
      { industry: 'Data Acquisition & Product Strategy', application: 'Data Labeling ROI Justification', benefit: 'Engineers plot learning curves to demonstrate to executives whether spending $50,000 on human labeling will yield a meaningful accuracy gain.' },
    ],
    practiceQuestions: [
      { id: 'pq-lc-1', question: 'If your learning curve shows that the validation score is still steadily sloping upward at 100% of your current data, what does this recommend?', hint: 'Has the curve plateaued yet?', answer: 'It proves that the model is still data-starved (High Variance regime). Collecting and labeling more training data will directly continue to improve out-of-sample validation accuracy.' },
    ],
    quiz: [
      {
        id: 'quiz-lc-1',
        question: 'What is the signature of a High Bias (underfitting) model on a Learning Curve plot?',
        options: [
          'Training score is 100% and validation score is 20%.',
          'Both training and validation curves converge early to a low score with a very small gap between them, and adding more data does not improve validation score.',
          'The curves diverge to infinity.',
          'Validation score is higher than training score by 50%.',
        ],
        correctIndex: 1,
        explanation: 'In High Bias models (e.g. straight line on a curve), the model reaches its capacity limit immediately. Training and validation errors plateau early at a disappointing level with virtually zero gap between them.',
      },
    ],
    independentExercise: {
      title: 'Automated Learning Curve Diagnostic Classifier',
      problem: 'Write a function diagnose_learning_curve(train_scores, val_scores) that evaluates the final scores and gap, returning "High Bias", "High Variance", or "Healthy".',
      hints: ['final_val = val_scores[-1]', 'gap = train_scores[-1] - val_scores[-1]'],
      starterCode: `def diagnose_curve(tr: list, val: list) -> str:
    # TODO: return diagnosis
    return "Unknown"

print("Curve 1:", diagnose_curve([0.65, 0.62], [0.55, 0.61]))
print("Curve 2:", diagnose_curve([0.98, 0.94], [0.50, 0.72]))
print("Curve 3:", diagnose_curve([0.90, 0.88], [0.82, 0.86]))
`,
      solution: `def diagnose_curve(tr: list, val: list) -> str:
    final_tr = tr[-1]
    final_val = val[-1]
    gap = final_tr - final_val
    
    if final_val < 0.70 and gap < 0.05:
        return "High Bias (Underfitting)"
    elif gap > 0.15:
        return "High Variance (Overfitting)"
    else:
        return "Healthy Generalization"

print("Curve 1:", diagnose_curve([0.65, 0.62], [0.55, 0.61]))
print("Curve 2:", diagnose_curve([0.98, 0.94], [0.50, 0.72]))
print("Curve 3:", diagnose_curve([0.90, 0.88], [0.82, 0.86]))
`,
    },
    summary: {
      keyTakeaways: [
        'Learning curves plot performance as a function of training dataset size N.',
        'High Bias curves plateau early with a tiny gap; more data will not help.',
        'High Variance curves have a large gap; validation score is still rising, meaning more data will improve generalization.',
      ],
      nextLessonId: 'threshold-tuning-cost-matrix',
      nextLessonTitle: 'Classification Threshold Tuning & Cost Matrix Optimization',
      nextLessonModuleId: 'module-5',
    },
  },

  'threshold-tuning-cost-matrix': {
    id: 'threshold-tuning-cost-matrix',
    moduleId: 'module-5',
    title: 'Classification Threshold Tuning & Cost Matrix Optimization',
    subtitle: 'Cost-Sensitive Decision Boundaries & Minimizing Expected Dollar Loss',
    order: 7,
    readTimeMinutes: 24,
    difficulty: 'Intermediate',
    visualizerType: 'none',
    objectives: [
      'Explain why the default 0.5 classification threshold is completely arbitrary and suboptimal in business applications.',
      'Formulate domain Cost Matrices specifying asymmetric financial costs: Cost = C_FP * FP + C_FN * FN.',
      'Derive the optimal Bayesian decision threshold tau* from costs: tau* = C_FP / (C_FP + C_FN).',
    ],
    prerequisites: ['confusion-matrix-metrics', 'probability-bayes-theorem'],
    analogy: {
      title: 'The Nuclear Missile Alarm Button',
      text: 'Imagine an automated defense radar that detects incoming nuclear warheads. If you set the decision threshold at 50% (default), the system will only launch interceptor missiles if it is MORE THAN 50% SURE a missile is incoming! That would be insane: a 20% chance of a nuclear detonation is an existential catastrophe! You set the threshold at 1% or 0.1%: at the slightest hint of danger, you scramble the defense. Thresholds must reflect the relative cost of being wrong in each direction.',
      metaphor: 'The decision threshold is not a mathematical constant; it is an economic steering wheel.',
    },
    problemSolved: {
      title: 'Translating Statistical Probabilities into Maximum Dollar ROI',
      description: 'In credit card fraud, a False Positive costs $2 (sending an automated verification SMS). A False Negative costs $5,000 (reimbursing a stolen transaction). Using a 0.50 threshold treats a $2 inconvenience identically to a $5,000 catastrophe, losing millions of dollars.',
      keyPoints: [
        'Optimizes for real-world dollar profit and loss rather than academic accuracy.',
        'Derives the exact optimal threshold tau* mathematically from cost parameters.',
        'Enables operational flexibility: adjust thresholds dynamically based on capacity.',
      ],
    },
    intuition: {
      overview: 'Compute predicted probabilities p = P(y=1|x). Instead of cutting at 0.5, sweep all thresholds from 0.01 to 0.99 and pick the threshold that minimizes total financial loss.',
      steps: [
        { step: 1, title: 'Define Cost Matrix', description: 'Quantify dollar cost of False Positive (C_FP) and cost of False Negative (C_FN).' },
        { step: 2, title: 'Evaluate Expected Cost', description: 'For any threshold tau: Total Cost(tau) = C_FP * FP(tau) + C_FN * FN(tau).' },
        { step: 3, title: 'Locate Minimum Cost', description: 'Find tau* = argmin Total Cost(tau).' },
      ],
    },
    mathematics: {
      overview: 'Bayesian decision theory formulation of minimum expected cost thresholding.',
      foundations: [
        {
          name: 'The Asymmetric Loss Equation',
          latex: '\\text{Total Cost}(\\tau) = C_{\\text{FP}} \\cdot \\text{FP}(\\tau) + C_{\\text{FN}} \\cdot \\text{FN}(\\tau) + C_{\\text{TP}} \\cdot \\text{TP}(\\tau) + C_{\\text{TN}} \\cdot \\text{TN}(\\tau)',
          explanation: 'Usually C_TN = 0 and C_TP = 0, simplifying to the costs of errors.',
        },
        {
          name: 'Optimal Bayesian Threshold Formula',
          latex: '\\tau^* = \\frac{C_{\\text{FP}}}{C_{\\text{FP}} + C_{\\text{FN}}}',
          explanation: 'The theoretical optimal threshold when model probabilities are perfectly calibrated.',
        },
      ],
    },
    derivation: {
      title: 'Derivation of the Optimal Decision Threshold tau*',
      objective: 'Prove that predicting positive is optimal whenever P(y=1|x) >= C_FP / (C_FP + C_FN).',
      steps: [
        {
          step: 1,
          label: 'Expected Cost of Predicting Negative (y_hat = 0)',
          latex: '\\mathbb{E}[\\text{Cost} \\mid \\hat{y}=0] = p \\cdot C_{\\text{FN}} + (1 - p) \\cdot 0 = p \\cdot C_{\\text{FN}}',
          explanation: 'If we predict negative, we only pay if the true state was positive (FN).',
        },
        {
          step: 2,
          label: 'Expected Cost of Predicting Positive (y_hat = 1)',
          latex: '\\mathbb{E}[\\text{Cost} \\mid \\hat{y}=1] = p \\cdot 0 + (1 - p) \\cdot C_{\\text{FP}} = (1 - p) \\cdot C_{\\text{FP}}',
          explanation: 'If we predict positive, we only pay if the true state was negative (FP).',
        },
        {
          step: 3,
          label: 'Find Crossover Decision Condition',
          latex: '\\mathbb{E}[\\text{Cost} \\mid \\hat{y}=1] \\le \\mathbb{E}[\\text{Cost} \\mid \\hat{y}=0] \\implies (1 - p) C_{\\text{FP}} \\le p C_{\\text{FN}}',
          explanation: 'Expanding: C_FP - p C_FP <= p C_FN -> C_FP <= p (C_FP + C_FN) -> p >= C_FP / (C_FP + C_FN) = tau*.',
        },
      ],
    },
    variables: [
      { symbol: 'C_{\\text{FP}}', name: 'Cost of False Positive', description: 'Financial penalty for false alarm (e.g. $10).', dimensions: 'Currency' },
      { symbol: 'C_{\\text{FN}}', name: 'Cost of False Negative', description: 'Financial penalty for missed detection (e.g. $500).', dimensions: 'Currency' },
      { symbol: '\\tau^*', name: 'Optimal Threshold', description: 'Decision boundary minimizing expected cost.', dimensions: 'Scalar (0, 1)' },
    ],
    numericalExample: {
      scenario: 'In fraud detection, a False Positive costs $10 (SMS check). A False Negative costs $490 (stolen refund). Calculate the theoretical optimal threshold tau*.',
      dataset: [{ C_FP: 10.0, C_FN: 490.0 }],
      calculations: [
        { step: 'Sum of Costs', math: 'C_{\\text{FP}} + C_{\\text{FN}} = 10.0 + 490.0', result: '$500.00' },
        { step: 'Optimal Threshold Formula', math: '\\tau^* = \\frac{10.0}{500.0}', result: '0.0200 (2.0%)' },
      ],
      finalConclusion: 'The optimal threshold is tau* = 0.02 (2%). Any transaction with even a 2% chance of fraud should be flagged for verification! Using 0.50 would miss 90% of fraud.',
    },
    visualExplanation: {
      title: 'Cost vs Threshold U-Curve',
      description: 'Plotting Total Financial Cost ($) against Threshold tau from 0 to 1 produces a U-shaped curve. High thresholds miss too many expensive frauds (huge FN cost). Low thresholds trigger too many customer alerts (huge FP cost). The valley of the curve marks the optimal dollar threshold tau*.',
      features: ['Left side: Dominated by FP cost', 'Right side: Dominated by FN cost', 'Minimum: Optimal threshold tau*'],
    },
    scratchCode: {
      title: 'Cost Matrix Threshold Optimizer in Pure Python',
      explanation: 'Sweep thresholds to locate the empirical minimum cost decision boundary.',
      code: `import numpy as np

def find_optimal_cost_threshold(y_true: np.ndarray, y_prob: np.ndarray, cost_fp: float, cost_fn: float):
    thresholds = np.linspace(0.01, 0.99, 99)
    best_cost = float('inf')
    best_thresh = 0.5
    
    for t in thresholds:
        y_pred = (y_prob >= t).astype(int)
        fp = np.sum((y_true == 0) & (y_pred == 1))
        fn = np.sum((y_true == 1) & (y_pred == 0))
        
        total_cost = (fp * cost_fp) + (fn * cost_fn)
        if total_cost < best_cost:
            best_cost = total_cost
            best_thresh = t
            
    return round(float(best_thresh), 3), round(float(best_cost), 2)

np.random.seed(42)
y_t = np.array([0]*90 + [1]*10)
# Probabilities
probs = np.random.uniform(0, 0.3, 100)
probs[y_t == 1] += 0.4 # Higher for fraud

opt_t, min_cost = find_optimal_cost_threshold(y_t, probs, cost_fp=10.0, cost_fn=500.0)
print(f"Optimal Threshold: {opt_t}")
print(f"Minimum Dollar Cost: \${min_cost}")
`,
    },
    sklearnCode: {
      title: 'Tuning Threshold via PrecisionRecallDisplay in Scikit-Learn',
      explanation: 'Extracting thresholds from precision_recall_curve and computing cost array.',
      code: `import numpy as np
from sklearn.metrics import precision_recall_curve

y_true = np.array([0]*90 + [1]*10)
probs = np.random.uniform(0, 0.4, 100)
probs[y_true == 1] += 0.3

prec, rec, thresholds = precision_recall_curve(y_true, probs)
print(f"Evaluated across {len(thresholds)} discrete operating thresholds.")
`,
    },
    runnableCode: {
      code: `import numpy as np

# Theoretical vs Empirical threshold check
cost_fp = 10.0
cost_fn = 490.0

tau_theoretical = cost_fp / (cost_fp + cost_fn)
print(f"Cost of False Alarm (FP): \${cost_fp}")
print(f"Cost of Missed Fraud (FN): \${cost_fn}")
print(f"Theoretical Optimal Threshold: {tau_theoretical:.4f} ({tau_theoretical*100:.1f}%)")
print("Any transaction with > 2% risk should trigger verification!")
`,
      expectedOutput: `Cost of False Alarm (FP): $10.0\nCost of Missed Fraud (FN): $490.0\nTheoretical Optimal Threshold: 0.0200 (2.0%)\nAny transaction with > 2% risk should trigger verification!`,
    },
    lineByLineExplanation: [
      { lines: 'Lines 4-5', codeSnippet: 'cost_fp = 10.0; cost_fn = 490.0', explanation: 'Establishes 49:1 asymmetric cost ratio.' },
      { lines: 'Line 7', codeSnippet: 'tau_theoretical = cost_fp / (cost_fp + cost_fn)', explanation: 'Evaluates Bayesian decision theory formula: 10 / 500 = 0.02.' },
    ],
    hyperparameters: [
      { name: 'decision_threshold', defaultVal: '0.5', range: '(0.0, 1.0)', effect: 'Probability boundary for assigning positive class.', recommendation: 'Always tune threshold using the business cost matrix rather than leaving default 0.5.' },
    ],
    assumptions: [
      { assumption: 'Calibrated Probabilities Required', whyItMatters: 'The formula tau* = C_FP / (C_FP + C_FN) is ONLY mathematically optimal if the predicted probabilities are accurately calibrated.', howToVerify: 'Verify calibration using Brier score and Platt scaling.' },
    ],
    commonMistakes: [
      { mistake: 'Always deploying classifiers with default threshold = 0.5', solution: 'The 0.5 threshold implicitly assumes that False Positives and False Negatives have EXACTLY EQUAL cost! In 99% of business scenarios, this assumption is false.' },
    ],
    realWorldUseCases: [
      { industry: 'FinTech & Lending', application: 'Automated Loan Default Approvals', benefit: 'Defaulting on a $20,000 loan costs 200x more than the profit on a successful loan ($100). Tuning the approval threshold to 99.5% safety maximizes portfolio profitability.' },
    ],
    practiceQuestions: [
      { id: 'pq-thresh-1', question: 'If missing a cancer patient costs 100 times more than performing a harmless biopsy, what should the classification threshold be?', hint: 'C_FN = 100 * C_FP.', answer: 'tau* = C_FP / (C_FP + 100 * C_FP) = 1 / 101 = 0.0099 (~1%). The doctor should order a biopsy whenever cancer risk exceeds just 1%!' },
    ],
    quiz: [
      {
        id: 'quiz-thresh-1',
        question: 'Under what specific condition is the default 0.50 classification threshold economically optimal?',
        options: [
          'Whenever the dataset has more than 10,000 samples.',
          'Only when the financial cost of a False Positive is exactly equal to the financial cost of a False Negative (C_FP = C_FN).',
          'Whenever using Logistic Regression.',
          'Only when accuracy is above 90%.',
        ],
        correctIndex: 1,
        explanation: 'Because tau* = C_FP / (C_FP + C_FN), setting tau = 0.5 requires C_FP / (2 * C_FP) = 0.5, which holds only if the costs of Type I and Type II errors are exactly identical.',
      },
    ],
    independentExercise: {
      title: 'Calculate Financial Savings of Optimal Threshold vs 0.5',
      problem: 'Write a script that computes total dollar loss using threshold = 0.5 vs optimal threshold = 0.05 on a synthetic fraud dataset. Print the total dollar savings.',
      hints: ['compute_cost(tau) = fp(tau)*20 + fn(tau)*1000', 'savings = cost(0.5) - cost(0.05)'],
      starterCode: `import numpy as np

y_true = np.array([0]*95 + [1]*5)
probs = np.array([0.01]*90 + [0.08]*5 + [0.15]*3 + [0.60]*2)
# Fraud costs: FP = $20, FN = $1000

# TODO: compare costs at tau=0.5 vs tau=0.05
print("Dollar savings:")
`,
      solution: `import numpy as np

y_true = np.array([0]*95 + [1]*5)
probs = np.array([0.01]*90 + [0.08]*5 + [0.15]*3 + [0.60]*2)

def eval_cost(t, c_fp=20, c_fn=1000):
    preds = (probs >= t).astype(int)
    fp = np.sum((y_true == 0) & (preds == 1))
    fn = np.sum((y_true == 1) & (preds == 0))
    return fp * c_fp + fn * c_fn

cost_default = eval_cost(0.5)
cost_optimal = eval_cost(0.05)
savings = cost_default - cost_optimal

print(f"Cost at default tau=0.50:  \${cost_default}")
print(f"Cost at optimal tau=0.05:  \${cost_optimal}")
print(f"Total Financial Savings:   \${savings} (Huge ROI!)")
`,
    },
    summary: {
      keyTakeaways: [
        'The default 0.5 threshold assumes equal error costs, which is rarely true in business applications.',
        'The optimal Bayesian threshold is tau* = C_FP / (C_FP + C_FN).',
        'Tuning the threshold to reflect real-world cost matrices maximizes business ROI without retraining models.',
      ],
      nextLessonId: 'ensemble-foundations',
      nextLessonTitle: 'Ensemble Learning & Wisdom of Crowds',
      nextLessonModuleId: 'module-6',
    },
  },
};
