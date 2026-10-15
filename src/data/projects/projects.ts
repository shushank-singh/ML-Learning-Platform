import { ProjectData } from '@/lib/types';

export const REAL_WORLD_PROJECTS: ProjectData[] = [
  {
    id: 'house-price-prediction',
    title: '1. House Price Prediction & Real Estate Valuation System',
    category: 'Regression & Tabular',
    difficulty: 'Beginner',
    duration: '6 - 8 hours',
    businessObjective: 'Predict residential property sale prices with an RMSE < 0.12 in log sale price to power an automated property valuation tool for mortgage underwriters.',
    datasetInfo: {
      name: 'Ames Housing Dataset (Extended)',
      description: 'Comprehensive property attributes including lot area, neighborhood, year built, overall quality score, and basement square footage.',
      featuresCount: 79,
      rowsCount: '2,930 houses',
      source: 'Ames Assessor Office / OpenML / Kaggle',
      dataDictionary: [
        { column: 'SalePrice', type: 'Float', description: 'Property sale price in USD (Target)' },
        { column: 'GrLivArea', type: 'Integer', description: 'Above grade living area square feet' },
        { column: 'OverallQual', type: 'Integer (1-10)', description: 'Rates overall material and finish quality' },
        { column: 'Neighborhood', type: 'Categorical', description: 'Physical location within Ames city limits' },
        { column: 'YearBuilt', type: 'Integer', description: 'Original construction date' },
      ],
    },
    edaChecklist: [
      'Plot target distribution: verify right skewness and apply log1p(SalePrice) transformation.',
      'Check correlation matrix heatmap between living area, quality, and sale price.',
      'Inspect missingness: identify structural missing values (e.g. No Basement vs missing observation).',
      'Examine scatter plots of GrLivArea vs SalePrice to detect agricultural outliers > 4,000 sq ft.',
    ],
    preprocessingPlan: [
      'Median imputation for numeric features (LotFrontage, MasVnrArea).',
      'Categorical encoding: Ordinal encoding for quality rankings; One-Hot Encoding with drop_first for nominal neighborhoods.',
      'Log transformation of target: y_train = np.log1p(y_train).',
      'RobustScaler for skewed numerical attributes.',
    ],
    baselineModel: 'Ordinary Least Squares LinearRegression (RMSE benchmark: ~0.185).',
    evaluationCriteria: [
      'Root Mean Squared Error (RMSE) on log(SalePrice)',
      'Mean Absolute Percentage Error (MAPE) on original dollar scale',
      'Adjusted R² score on 5-fold cross-validation',
    ],
    errorAnalysis: [
      'Calculate top 5% worst prediction residuals.',
      'Check whether errors correlate with luxury homes ($500k+) or historic heritage districts.',
      'Verify homoscedasticity using residual-vs-fitted scatter plots.',
    ],
    deploymentPlan: [
      'Serialize fitted scikit-learn Pipeline with joblib.',
      'Create FastAPI microservice endpoint /api/v1/predict-price with Pydantic schema validation.',
      'Containerize via Docker and deploy to AWS App Runner / Vercel serverless function.',
    ],
    deliverables: [
      '01_eda_and_feature_engineering.ipynb with correlation matrices',
      '02_model_selection_and_tuning.py with Ridge, Lasso, and LightGBM',
      'model.joblib serialized pipeline artifact',
      'main.py FastAPI microservice with Swagger documentation',
      'README.md with benchmark comparison tables and instructions',
    ],
    milestones: [
      {
        step: 1,
        title: 'Exploratory Data Analysis & Target Normalization',
        description: 'Load housing records, inspect distributions, and compute Skewness statistics.',
        tasks: ['Inspect column missing percentages', 'Log transform target SalePrice', 'Identify outlier coordinates'],
        starterCodeSnippet: `import numpy as np
import pandas as pd

# Load dataset and inspect skewness
# df['SalePrice_log'] = np.log1p(df['SalePrice'])
print("Target Skewness before:", 1.88, "after log1p:", 0.12)
`,
      },
      {
        step: 2,
        title: 'Pipeline Architecture & Feature Engineering',
        description: 'Construct ColumnTransformer for mixed numerical and categorical types.',
        tasks: ['Build StandardScaler pipeline', 'Apply OneHotEncoder(handle_unknown="ignore")', 'Calculate total square footage interaction'],
        starterCodeSnippet: `from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler, OneHotEncoder

# ct = ColumnTransformer(...)
print("Pipeline schema verified.")
`,
      },
      {
        step: 3,
        title: 'Model Benchmarking & Ridge/Lasso Tuning',
        description: 'Compare OLS, Ridge (L2), Lasso (L1), and ElasticNet using GridSearchCV.',
        tasks: ['Run 5-Fold cross validation', 'Tune alpha regularization hyperparameter', 'Extract top 10 most influential coefficients'],
        starterCodeSnippet: `from sklearn.linear_model import RidgeCV
# ridge = RidgeCV(alphas=np.logspace(-2, 3, 20), cv=5)
print("Optimal Alpha selected: 10.0")
`,
      },
    ],
  },
  {
    id: 'customer-churn',
    title: '3. Customer Churn Prediction & Retention Engine',
    category: 'Classification & Imbalanced Data',
    difficulty: 'Intermediate',
    duration: '8 - 10 hours',
    businessObjective: 'Predict telecom customer cancellations with an ROC-AUC > 0.85 and precision @ top 20% > 70% to optimize marketing retention campaigns and prevent $1.2M in annual recurring revenue loss.',
    datasetInfo: {
      name: 'Telco Customer Churn Dataset',
      description: 'Account tenure, contract terms, payment methods, monthly charges, internet services, and binary churn label.',
      featuresCount: 21,
      rowsCount: '7,043 customers',
      source: 'IBM Sample Data / Kaggle',
      dataDictionary: [
        { column: 'Churn', type: 'Binary (Yes/No)', description: 'Customer cancelled service in the past month (Target)' },
        { column: 'tenure', type: 'Integer', description: 'Number of months customer has stayed with company' },
        { column: 'Contract', type: 'Categorical', description: 'Month-to-month, One year, or Two year contract' },
        { column: 'MonthlyCharges', type: 'Float', description: 'The amount charged to customer monthly' },
        { column: 'TotalCharges', type: 'Float', description: 'Total cumulative amount charged' },
      ],
    },
    edaChecklist: [
      'Inspect class distribution: 26.5% churn vs 73.5% retained.',
      'Analyze churn rate across contract types (Month-to-month vs Two-year contracts).',
      'Investigate TotalCharges missing values (blank strings for tenure = 0 customers).',
      'Examine payment method vs churn: electronic check customers show highest churn frequency.',
    ],
    preprocessingPlan: [
      'Coerce TotalCharges to numeric and impute 0 for brand new customers (tenure = 0).',
      'Binary encoding for Yes/No attributes (Partner, Dependents, PhoneService).',
      'OneHotEncoding for multi-category contract and payment types.',
      'SMOTE (Synthetic Minority Over-sampling Technique) or class_weight="balanced" evaluation.',
    ],
    baselineModel: 'DummyClassifier (stratified) and LogisticRegression baseline (AUC: 0.79).',
    evaluationCriteria: [
      'ROC-AUC Score (Primary metric invariant to threshold)',
      'Precision-Recall AUC (PR-AUC for minority class)',
      'Cost-Benefit Matrix (Cost of false positive retention call $15 vs Cost of lost churn customer $450)',
    ],
    errorAnalysis: [
      'SHAP Force Plots for false negatives (customers who churned unexpectedly).',
      'Evaluate threshold curve: trade off high recall (catching 85% of churners) vs operational budget.',
    ],
    deploymentPlan: [
      'FastAPI serving endpoint providing churn probability score and top 3 risk drivers via SHAP.',
      'Batch inference script writing predictions nightly to Postgres retention queue.',
    ],
    deliverables: [
      'churn_pipeline.py with end-to-end preprocessing and training',
      'shap_explanations.ipynb showing top feature importances',
      'Dockerfile with tested dependency lockfile',
      'Cost-Benefit optimization matrix report',
    ],
    milestones: [
      {
        step: 1,
        title: 'Data Hygiene & Cohort Analysis',
        description: 'Clean whitespace, handle zero-tenure records, and graph tenure vs monthly charges.',
        tasks: ['Fix TotalCharges whitespace', 'Compute churn rates by tenure quartile', 'Generate risk cohorts'],
        starterCodeSnippet: `import pandas as pd
# df['TotalCharges'] = pd.to_numeric(df['TotalCharges'], errors='coerce').fillna(0)
print("Data cleaned. Baseline churn rate: 26.5%")
`,
      },
      {
        step: 2,
        title: 'Classifier Comparison: Logistic, Random Forest, XGBoost',
        description: 'Cross-validate multiple models with class balancing techniques.',
        tasks: ['Test class_weight="balanced"', 'Cross-validate with StratifiedKFold(n_splits=5)', 'Compare ROC curves'],
        starterCodeSnippet: `from sklearn.metrics import roc_auc_score
# rf_auc = 0.842; xgb_auc = 0.858
print("XGBoost achieved best ROC-AUC: 0.858")
`,
      },
      {
        step: 3,
        title: 'Decision Threshold Tuning & Cost Matrix',
        description: 'Determine optimal decision threshold minimizing net dollar loss.',
        tasks: ['Plot Precision-Recall curve', 'Calculate business cost curve across thresholds [0.1, 0.9]', 'Select threshold τ = 0.38'],
        starterCodeSnippet: `print("Optimal Threshold: 0.38 yields expected savings of $240,000/yr")
`,
      },
    ],
  },
  {
    id: 'credit-risk',
    title: '5. Credit Risk Classification & Default Probability',
    category: 'Risk Scoring & Calibrated ML',
    difficulty: 'Intermediate',
    duration: '8 - 10 hours',
    businessObjective: 'Estimate borrower Probability of Default (PD) to determine loan interest rates and loan approvals under Basel regulatory guidelines.',
    datasetInfo: {
      name: 'Credit Risk Scoring Dataset',
      description: 'Income, debt-to-income ratio, revolving credit utilization, delinquent payments, and loan status.',
      featuresCount: 16,
      rowsCount: '32,581 loan applications',
      source: 'Lending Club / Kaggle',
      dataDictionary: [
        { column: 'loan_status', type: 'Binary (0/1)', description: '1 if borrower defaulted, 0 if fully paid' },
        { column: 'person_income', type: 'Float', description: 'Annual reported borrower income' },
        { column: 'loan_percent_income', type: 'Float', description: 'Ratio of loan amount to annual income' },
        { column: 'cb_person_default_on_file', type: 'Categorical', description: 'Historical default on credit bureau file' },
      ],
    },
    edaChecklist: [
      'Examine extreme income outliers (e.g. reported $6M income with $1,000 loan).',
      'Plot debt ratio distributions and analyze correlation with loan defaults.',
      'Check calibration curves: verify whether 0.20 predicted risk actually defaults 20% of the time.',
    ],
    preprocessingPlan: [
      'Winsorize extreme outliers at 99th percentile.',
      'Weight of Evidence (WoE) and Information Value (IV) analysis for feature selection.',
      'Monotonic binning for credit bureau continuous variables.',
    ],
    baselineModel: 'Standard Logistic Regression with Weight of Evidence features (AUC: 0.82).',
    evaluationCriteria: ['ROC-AUC Score', 'Gini Coefficient (2*AUC - 1)', 'Brier Score (calibration quality)', 'Kolmogorov-Smirnov (KS) Statistic'],
    errorAnalysis: ['Examine high-risk approved applicants and false rejection rates.'],
    deploymentPlan: ['Scorecard generation with integer points scale and REST API microservice.'],
    deliverables: ['credit_scorecard.py', 'calibration_analysis.ipynb', 'regulatory_explainability_brief.md'],
    milestones: [
      {
        step: 1,
        title: 'Feature Binning & Weight of Evidence',
        description: 'Transform continuous features into monotonic risk bins.',
        tasks: ['Bin income and loan percentages', 'Calculate Information Value (IV)', 'Filter features with IV > 0.05'],
        starterCodeSnippet: `print("Calculated WoE and Information Value across 15 attributes.")`,
      },
      {
        step: 2,
        title: 'Calibrated Probability Estimation',
        description: 'Fit logistic model and calibrate probabilities with isotonic regression.',
        tasks: ['Fit CalibratedClassifierCV', 'Plot Brier score curve', 'Verify regulatory compliance'],
        starterCodeSnippet: `print("Calibrated Brier score: 0.068 (Strong probability alignment)")`,
      },
    ],
  },
  {
    id: 'customer-sentiment',
    title: '7. Customer Review Sentiment Classification',
    category: 'Natural Language Processing',
    difficulty: 'Intermediate',
    duration: '6 - 8 hours',
    businessObjective: 'Classify e-commerce product feedback in real-time into Positive, Neutral, or Negative sentiment to trigger immediate escalation for critical complaints.',
    datasetInfo: {
      name: 'Amazon Customer Reviews Dataset',
      description: 'Raw review text, star ratings (1 to 5), verified purchase badge, and helpful votes.',
      featuresCount: 6,
      rowsCount: '50,000 reviews',
      source: 'Amazon Product Data / Hugging Face',
      dataDictionary: [
        { column: 'review_text', type: 'String', description: 'Full customer written review' },
        { column: 'rating', type: 'Integer (1-5)', description: 'Star rating mapped to Negative (1-2), Neutral (3), Positive (4-5)' },
      ],
    },
    edaChecklist: [
      'Plot review length token distribution: verify median word count.',
      'Inspect common unigrams and bigrams across 1-star vs 5-star reviews.',
      'Check for bot/spam duplicate reviews.',
    ],
    preprocessingPlan: [
      'Lowercase conversion, punctuation removal, and contraction expansion.',
      'TF-IDF Vectorization with sublinear_tf=True and ngram_range=(1, 2).',
      'Max features vocabulary capped at 15,000 terms with min_df=5.',
    ],
    baselineModel: 'Multinomial Naive Bayes (F1-score: ~0.84).',
    evaluationCriteria: ['Macro F1-Score', 'Confusion matrix per sentiment class', 'Inference latency per review < 10ms'],
    errorAnalysis: ['Analyze sarcasm, negation words ("not good"), and neutral review ambiguities.'],
    deploymentPlan: ['FastAPI text endpoint serving tokenized TF-IDF pipeline with batch support.'],
    deliverables: ['nlp_pipeline.py', 'vocabulary_matrix.joblib', 'benchmark_report.md'],
    milestones: [
      {
        step: 1,
        title: 'Text Preprocessing & TF-IDF Vectorization',
        description: 'Clean text and compute term frequency-inverse document frequency matrices.',
        tasks: ['Tokenize text', 'Build TfidfVectorizer(ngram_range=(1, 2))', 'Inspect top TF-IDF keywords'],
        starterCodeSnippet: `from sklearn.feature_extraction.text import TfidfVectorizer
# vec = TfidfVectorizer(max_features=10000, stop_words='english')
print("TF-IDF matrix built: (50000, 10000)")`,
      },
      {
        step: 2,
        title: 'Model Comparison: Naive Bayes vs Linear SVM vs Logistic',
        description: 'Compare linear classifiers on sparse text representations.',
        tasks: ['Train MultinomialNB', 'Train LinearSVC(loss="hinge")', 'Tune C regularization'],
        starterCodeSnippet: `print("LinearSVC Macro F1: 0.892 (Best accuracy & fastest inference)")`,
      },
    ],
  },
  {
    id: 'prediction-api',
    title: '9. End-to-End Production ML Prediction API',
    category: 'ML Engineering & Architecture',
    difficulty: 'Advanced',
    duration: '10 - 12 hours',
    businessObjective: 'Engineer a production-grade, containerized REST API microservice serving real-time machine learning predictions with sub-30ms latency, Pydantic validation, health checks, and Docker deployment.',
    datasetInfo: {
      name: 'Production Pipeline Artifact',
      description: 'Serialized scikit-learn pipeline trained on multi-attribute customer data.',
      featuresCount: 12,
      rowsCount: 'Production Serving Environment',
      source: 'Internal Enterprise ML Architecture',
      dataDictionary: [
        { column: 'request_id', type: 'UUID', description: 'Unique trace identifier for observability' },
        { column: 'features', type: 'JSON Array', description: 'Validated schema inputs' },
      ],
    },
    edaChecklist: ['Verify model serialization compatibility across Python minor versions.', 'Benchmark inference RAM footprint.'],
    preprocessingPlan: ['Embed all preprocessing within the serialized Pipeline object so raw JSON is transformed identically.'],
    baselineModel: 'FastAPI with Uvicorn multi-worker process.',
    evaluationCriteria: ['P95 Latency < 40ms', 'Error rate 0.00% under 100 concurrent requests', 'Graceful 422 schema validation rejection'],
    errorAnalysis: ['Detect out-of-range inputs and log warnings to structured JSON logger.'],
    deploymentPlan: ['Multi-stage Dockerfile, non-root user, AWS ECS or GCP Cloud Run deployment.'],
    deliverables: ['app/main.py', 'app/schemas.py', 'Dockerfile', 'tests/test_api.py', 'locustfile.py (load testing)'],
    milestones: [
      {
        step: 1,
        title: 'FastAPI Microservice & Pydantic Schema',
        description: 'Define strict input validation schemas and response contracts.',
        tasks: ['Create Pydantic BaseModel with Field constraints', 'Implement /health and /predict endpoints', 'Test invalid JSON payloads'],
        starterCodeSnippet: `from pydantic import BaseModel, Field

class PredictionRequest(BaseModel):
    income: float = Field(..., gt=0, description="Annual income in USD")
    tenure_months: int = Field(..., ge=0, le=120)

print("Pydantic schema validated.")`,
      },
      {
        step: 2,
        title: 'Dockerization & Non-Root Container Security',
        description: 'Build minimal lightweight Docker container using python:3.11-slim.',
        tasks: ['Write multi-stage Dockerfile', 'Create non-root user appuser', 'Verify container build size < 250MB'],
        starterCodeSnippet: `print("Docker image built successfully: ml-api:v1.0 (185MB)")`,
      },
    ],
  },
];
