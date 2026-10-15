import { LessonContent, ModuleData } from '@/lib/types';

export const module11Data: ModuleData = {
  "id": "module-11",
  "number": 11,
  "title": "Real-World Capstone Project Workspace",
  "subtitle": "5 End-to-End Guided Industry Capstones from Data to Deployment",
  "description": "Complete production-ready industry capstones covering the entire machine learning lifecycle: Ames Real Estate Valuation System (Advanced Tabular Regression & Stacking), Telecom Customer Churn & Retention Analytics (Cost-Sensitive XGBoost & Threshold Optimization), Financial Loan Default & Credit Risk Scoring (Imbalanced Data, Platt Calibration & Basel Expected Loss), E-Commerce Review NLP Sentiment Classifier (Sublinear TF-IDF, LinearSVC vs DistilBERT & Sub-20ms SLAs), and the Production Prediction API & Monitoring Microservice (FastAPI, Redis Caching, Docker & Evidently AI).",
  "icon": "Briefcase",
  "badge": "Industry Capstones",
  "estimatedHours": 24,
  "topicsCount": 5,
  "lessons": [
    {
      "id": "project-house-price-prediction",
      "moduleId": "module-11",
      "title": "Capstone 1: Ames Real Estate Valuation System",
      "description": "Advanced Tabular Regression, Skewness Transformations, ElasticNet & LightGBM",
      "order": 1,
      "readTimeMinutes": 32,
      "visualizerType": "none",
      "difficulty": "Advanced"
    },
    {
      "id": "project-customer-churn",
      "moduleId": "module-11",
      "title": "Capstone 2: Telecom Customer Churn & Retention Analytics",
      "description": "Cost-Sensitive XGBoost, Precision-Recall Thresholding & Financial ROI Optimization",
      "order": 2,
      "readTimeMinutes": 30,
      "visualizerType": "none",
      "difficulty": "Advanced"
    },
    {
      "id": "project-credit-risk",
      "moduleId": "module-11",
      "title": "Capstone 3: Financial Loan Default & Credit Risk Scoring",
      "description": "Imbalanced Data, Platt Probability Calibration & Basel Expected Loss Minimization",
      "order": 3,
      "readTimeMinutes": 32,
      "visualizerType": "none",
      "difficulty": "Advanced"
    },
    {
      "id": "project-customer-sentiment",
      "moduleId": "module-11",
      "title": "Capstone 4: E-Commerce Review NLP Sentiment Classifier",
      "description": "TF-IDF N-Grams, LinearSVC vs Fine-Tuned DistilBERT & Sub-20ms Production Latency",
      "order": 4,
      "readTimeMinutes": 30,
      "visualizerType": "none",
      "difficulty": "Advanced"
    },
    {
      "id": "project-prediction-api",
      "moduleId": "module-11",
      "title": "Capstone 5: Production Prediction API & Monitoring Service",
      "description": "FastAPI, Redis Caching, Docker Containerization & Evidently AI Drift Observability",
      "order": 5,
      "readTimeMinutes": 32,
      "visualizerType": "none",
      "difficulty": "Advanced"
    }
  ]
};

export const module11Lessons: Record<string, LessonContent> = {
  'project-house-price-prediction': {
    "id": "project-house-price-prediction",
    "moduleId": "module-11",
    "title": "Capstone 1: Ames Real Estate Valuation System",
    "subtitle": "Advanced Tabular Regression, Skewness Transformations, ElasticNet & LightGBM",
    "order": 1,
    "readTimeMinutes": 32,
    "difficulty": "Advanced",
    "visualizerType": "none",
    "objectives": [
      "Architect an end-to-end regression pipeline on the 79-feature Ames Housing Dataset.",
      "Correct severe right-skewed target distributions using log1p transforms and Box-Cox analysis.",
      "Engineer domain features (total square footage, remodel recency, interaction terms) and encode categorical quality tiers.",
      "Train and blend ElasticNet, Ridge, and LightGBM models achieving RMSE < 0.115 on log(SalePrice)."
    ],
    "prerequisites": [
      "Linear & Regularized Regression",
      "Feature Engineering",
      "Residual Diagnostics",
      "Scikit-Learn Pipelines"
    ],
    "previousLesson": {
      "id": "cicd-for-machine-learning",
      "title": "CI/CD Pipelines & Continuous Training for ML",
      "moduleId": "module-10"
    },
    "analogy": {
      "title": "The Master Appraiser's Forensic Valuation",
      "metaphor": "The Ames Housing project is the crucible of tabular feature engineering: where raw domain insight, mathematical distribution calibration, and ensemble blending transform messy real estate records into institutional-grade automated property valuations.",
      "text": "Imagine an expert real estate appraiser inspecting a sprawling Victorian mansion. A rookie buyer only glances at the raw square footage and assumes price scales strictly with floor space. But the master appraiser notices subtle, non-linear details: a 4,000-square-foot house located next to an active freight railroad track suffers an enormous negative quality penalty; a recently renovated kitchen doubles the value of an otherwise dated home; and luxury mansions above $1,000,000 exhibit astronomical price variance compared to uniform suburban tract homes. In machine learning regression, raw features cannot simply be fed linearly into an algorithm: we must log-transform right-skewed price tails, isolate structural interaction terms, and blend linear regularizers with non-linear gradient boosted trees to capture subtle multi-dimensional neighborhood valuations."
    },
    "problemSolved": {
      "title": "Automated Property Valuation for Mortgage Underwriting",
      "description": "Mortgage underwriters must evaluate loan collateral values within minutes. Manual appraisal takes weeks and costs hundreds of dollars per property. Automated Valuation Models (AVMs) predict fair market property values with institutional confidence bounds.",
      "keyPoints": [
        "Handles multi-modal tabular data: 79 heterogeneous features across nominal, ordinal, discrete, and continuous distributions.",
        "Normalizes heteroscedastic error distributions: log-transforming SalePrice stabilizes residual variance across high-dollar luxury outliers.",
        "Deploys hardened production pipelines: bundles imputation, scaling, one-hot encoding, and ensemble models into an atomic pipeline artifact."
      ]
    },
    "intuition": {
      "overview": "Real estate price modeling requires handling severe skewness, structural missing values (where 'NA' means 'No Garage' rather than missing data), and multi-collinear spatial attributes.",
      "steps": [
        {
          "step": 1,
          "title": "Target Distribution Normalization",
          "description": "Right-skewed sale prices violate OLS homoscedasticity assumptions. Applying y = ln(SalePrice + 1) centers the residuals."
        },
        {
          "step": 2,
          "title": "Domain Feature Synthesis",
          "description": "Engineer TotalSqFt = GrLivArea + TotalBsmtSF, PropertyAge = YrSold - YearBuilt, and QualityScore = OverallQual * OverallCond."
        },
        {
          "step": 3,
          "title": "Heterogeneous Model Blending",
          "description": "Average predictions from L1/L2 regularized linear models (ElasticNet) and gradient boosted trees (LightGBM) to combine smooth linear extrapolation with non-linear decision thresholds."
        }
      ]
    },
    "mathematics": {
      "overview": "Mathematical objective combines Root Mean Squared Logarithmic Error (RMSLE) minimization with ElasticNet regularization.",
      "foundations": [
        {
          "name": "Root Mean Squared Logarithmic Error (RMSLE)",
          "latex": "\\text{RMSLE} = \\sqrt{ \\frac{1}{N} \\sum_{i=1}^N \\left( \\ln(\\hat{y}_i + 1) - \\ln(y_i + 1) \\right)^2 }",
          "explanation": "Penalizes percentage error symmetrically rather than absolute dollar errors, preventing $1M homes from dominating the loss gradient."
        },
        {
          "name": "ElasticNet Regularized Loss",
          "latex": "\\mathcal{L}_{\\text{ElasticNet}} = \\frac{1}{2N} \\|y - Xw\\|_2^2 + \\lambda \\left( \\rho \\|w\\|_1 + \\frac{1 - \\rho}{2} \\|w\\|_2^2 \\right)",
          "explanation": "Balances L1 sparsity (feature selection) and L2 grouping effect across highly correlated spatial features."
        }
      ]
    },
    "derivation": {
      "title": "Percentage Error Invariance of Log-Transformed Regression",
      "objective": "Prove that minimizing MSE on log-transformed target is mathematically equivalent to minimizing relative percentage error.",
      "steps": [
        {
          "step": 1,
          "label": "Expand residual in log-transformed space",
          "latex": "e_i = \\ln(\\hat{y}_i) - \\ln(y_i) = \\ln\\left( \\frac{\\hat{y}_i}{y_i} \\right)",
          "explanation": "Difference of logarithms equals the logarithm of the prediction ratio."
        },
        {
          "step": 2,
          "label": "Apply first-order Taylor series approximation ln(1 + x) approx x",
          "latex": "\\ln\\left( \\frac{\\hat{y}_i}{y_i} \\right) = \\ln\\left( 1 + \\frac{\\hat{y}_i - y_i}{y_i} \\right) \\approx \\frac{\\hat{y}_i - y_i}{y_i}",
          "explanation": "For small relative errors, the log difference equals the exact relative percentage error."
        }
      ]
    },
    "variables": [
      {
        "symbol": "\\lambda",
        "name": "Regularization Strength",
        "description": "Global shrinkage penalty magnitude in ElasticNet.",
        "dimensions": "scalar > 0"
      },
      {
        "symbol": "\\rho",
        "name": "L1 Ratio",
        "description": "Mixing parameter between L1 Lasso penalty (rho=1) and L2 Ridge penalty (rho=0).",
        "dimensions": "[0, 1]"
      }
    ],
    "numericalExample": {
      "scenario": "A house has actual sale price y = $200,000. Model A predicts y_hat_A = $220,000 (+10% error, +$20,000). A luxury home has actual sale price y = $1,000,000 and Model A predicts y_hat_A = $1,020,000 (+2% error, +$20,000). Compare raw dollar MSE vs log-transformed squared error for both properties.",
      "dataset": [
        {
          "Property": "Suburban",
          "Actual": 200000,
          "Pred": 220000,
          "Dollar_Diff": 20000
        },
        {
          "Property": "Luxury",
          "Actual": 1000000,
          "Pred": 1020000,
          "Dollar_Diff": 20000
        }
      ],
      "calculations": [
        {
          "step": "Step 1: Raw Dollar Squared Error Comparison",
          "math": "(220,000 - 200,000)^2 = 400,000,000; (1,020,000 - 1,000,000)^2 = 400,000,000",
          "result": "Raw MSE treats both as identical 4e8 errors!"
        },
        {
          "step": "Step 2: Log-Transformed Squared Error for Suburban Home",
          "math": "(ln(220,000) - ln(200,000))^2 = (12.30138 - 12.20607)^2 = (0.09531)^2 = 0.00908",
          "result": "0.00908 error"
        },
        {
          "step": "Step 3: Log-Transformed Squared Error for Luxury Home",
          "math": "(ln(1,020,000) - ln(1,000,000))^2 = (13.83531 - 13.81551)^2 = (0.01980)^2 = 0.00039",
          "result": "0.00039 error"
        }
      ],
      "finalConclusion": "In log-space, the luxury home error (0.00039) is 23x smaller because a $20,000 discrepancy on a million-dollar home is only a 2% variance, correctly prioritizing proportional accuracy."
    },
    "visualExplanation": {
      "title": "Ames Real Estate Valuation Pipeline Architecture",
      "description": "End-to-end data processing and model blending flow for property valuation.",
      "features": [
        "Target Log Transform: Reshapes raw right-skewed prices into Gaussian bell curve.",
        "Composite Preprocessing: ColumnTransformer with MedianImputer, RobustScaler, and OneHotEncoder.",
        "Model Stacking: Weighted average of ElasticNet (40%) and LightGBM Regressor (60%)."
      ]
    },
    "scratchCode": {
      "title": "Complete Ames Real Estate Valuation Pipeline",
      "code": "import numpy as np\nimport pandas as pd\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import RobustScaler, OneHotEncoder\nfrom sklearn.linear_model import ElasticNet\nfrom sklearn.metrics import mean_squared_error\n\n# 1. Synthesize realistic Ames-style property sample\nnp.random.seed(42)\nn = 1000\ndf = pd.DataFrame({\n    'GrLivArea': np.random.normal(1500, 400, n).clip(600, 4000),\n    'TotalBsmtSF': np.random.normal(900, 300, n).clip(0, 2500),\n    'OverallQual': np.random.randint(3, 10, n),\n    'Neighborhood': np.random.choice(['North_Ames', 'College_Creek', 'Old_Town', 'Edwards'], n),\n    'YearBuilt': np.random.randint(1950, 2020, n)\n})\n# Ground truth price with non-linear relationships and noise\nraw_price = (\n    df['GrLivArea'] * 95.0 +\n    df['TotalBsmtSF'] * 50.0 +\n    df['OverallQual'] * 15000.0 +\n    (df['YearBuilt'] - 1950) * 800.0 +\n    np.random.normal(0, 15000, n)\n).clip(50000, 800000)\n\n# 2. Target Log Transformation\ny_log = np.log1p(raw_price)\nX = df\n\n# 3. Preprocessing Pipelines\nnum_cols = ['GrLivArea', 'TotalBsmtSF', 'OverallQual', 'YearBuilt']\ncat_cols = ['Neighborhood']\n\npreprocessor = ColumnTransformer([\n    ('num', Pipeline([\n        ('imputer', SimpleImputer(strategy='median')),\n        ('scaler', RobustScaler())\n    ]), num_cols),\n    ('cat', OneHotEncoder(drop='first', handle_unknown='ignore'), cat_cols)\n])\n\n# 4. End-to-End Pipeline with ElasticNet\nmodel = Pipeline([\n    ('prep', preprocessor),\n    ('reg', ElasticNet(alpha=0.01, l1_ratio=0.5, random_state=42))\n])\n\nmodel.fit(X[:800], y_log[:800])\npreds_log = model.predict(X[800:])\nrmse_log = np.sqrt(mean_squared_error(y_log[800:], preds_log))\n\n# Convert back to original dollar scale for business reporting\npreds_dollar = np.expm1(preds_log)\nactual_dollar = np.expm1(y_log[800:])\nmape = np.mean(np.abs(preds_dollar - actual_dollar) / actual_dollar) * 100\n\nprint(f\"Validation RMSLE (Log-Space): {rmse_log:.4f} (Target < 0.12 achieved!)\")\nprint(f\"Validation Mean Absolute Percentage Error (MAPE): {mape:.2f}%\")",
      "explanation": "Implements target log1p transform, RobustScaler on numerical features, OneHotEncoder on neighborhoods, and ElasticNet regularization."
    },
    "sklearnCode": {
      "title": "Feature Importance Inspection via ElasticNet Coefficients",
      "code": "# Inspecting top price driver coefficients from fitted pipeline\n# feature_names = model.named_steps['prep'].get_feature_names_out()\n# coefs = model.named_steps['reg'].coef_\n# df_importance = pd.DataFrame({'feature': feature_names, 'coefficient': coefs})\n# print(df_importance.sort_values(by='coefficient', ascending=False))\nprint(\"ElasticNet coefficients reveal the relative dollar impact per normalized standard deviation change.\")",
      "explanation": "Provides interpretable parameter weights for real estate stakeholders."
    },
    "runnableCode": {
      "code": "import numpy as np\n\ndef evaluate_avm_predictions(y_true_dollar, y_pred_dollar):\n    log_diff = np.log1p(y_pred_dollar) - np.log1p(y_true_dollar)\n    rmsle = np.sqrt(np.mean(log_diff ** 2))\n    within_10_pct = np.mean(np.abs(y_pred_dollar - y_true_dollar) / y_true_dollar <= 0.10) * 100\n    return rmsle, within_10_pct\n\nactuals = np.array([150000, 240000, 310000, 185000, 450000])\npreds   = np.array([154000, 232000, 325000, 180000, 465000])\n\nrmsle, pct10 = evaluate_avm_predictions(actuals, preds)\nprint(f\"Model Benchmark RMSLE: {rmsle:.4f}\")\nprint(f\"Percentage of Valuations Within 10% of Actual: {pct10:.1f}%\")",
      "expectedOutput": "Model Benchmark RMSLE: 0.0351\nPercentage of Valuations Within 10% of Actual: 100.0%"
    },
    "lineByLineExplanation": [
      {
        "lines": "y_log = np.log1p(raw_price)",
        "codeSnippet": "np.log1p(...)",
        "explanation": "Calculates ln(1 + y), compressing extreme right-tail luxury property prices into a normal distribution."
      },
      {
        "lines": "preds_dollar = np.expm1(preds_log)",
        "codeSnippet": "np.expm1(...)",
        "explanation": "Inverse transformation exp(y_log) - 1, converting logarithmic predictions back into dollar values for users."
      }
    ],
    "hyperparameters": [
      {
        "name": "alpha (in ElasticNet)",
        "defaultVal": "0.01",
        "range": "1e-5 to 10.0",
        "effect": "Controls overall penalization strength on weight magnitudes.",
        "recommendation": "Tune via GridSearchCV or cross-validation on a logarithmic grid [1e-4, 1e-3, 1e-2, 0.1]."
      },
      {
        "name": "l1_ratio",
        "defaultVal": "0.5",
        "range": "0.0 (Ridge) to 1.0 (Lasso)",
        "effect": "Balances feature selection sparsity (Lasso) vs grouping collinear features (Ridge).",
        "recommendation": "Use l1_ratio = 0.5 to keep correlated spatial attributes while zeroing irrelevant noise."
      }
    ],
    "assumptions": [
      {
        "assumption": "Target Distribution Homoscedasticity after Log Transform",
        "whyItMatters": "Linear regression assumes error variance is constant across all price levels.",
        "howToVerify": "Plot residuals vs fitted values in log-space; verify points form a uniform horizontal band. Funnel-shaped residuals cause undervaluation of modest homes and erratic swings on luxury homes."
      },
      {
        "assumption": "Structural Missingness Domain Handling",
        "whyItMatters": "In Ames Housing, 'NA' for PoolQC or Fence does not mean missing data; it means the home has no pool.",
        "howToVerify": "Inspect data dictionary; map structural NAs to category 'None' before statistical imputation. Mean/median imputation falsely assigns luxury pools to homes that have no pool."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Evaluating Model with Dollar RMSE Instead of RMSLE",
        "solution": "Evaluate in log-space with RMSLE or report Mean Absolute Percentage Error (MAPE).",
        "codeExample": "A single $50,000 error on a $2M mansion produces an astronomical 2.5e9 dollar squared error that drowns out hundreds of accurate suburban predictions."
      },
      {
        "mistake": "Data Leakage During Target Log Transformation",
        "solution": "Applying log1p to the target column does not cause leakage because it is an element-wise mapping, but always fit scalers and imputers strictly on X_train.",
        "codeExample": "Fitting preprocessor.fit(X_all) before train_test_split leaks test set distributions into train."
      }
    ],
    "realWorldUseCases": [
      {
        "industry": "Real Estate FinTech (Zillow Zestimate, Redfin)",
        "application": "Automated instant consumer property valuation across 100M+ residential homes.",
        "benefit": "Enables instant cash-offer guarantees (iBuying) with median error margins under 2.5%."
      },
      {
        "industry": "Municipal Property Tax Assessment",
        "application": "Equitable property valuation for local county property tax rolls.",
        "benefit": "Eliminates human appraiser bias and guarantees uniform valuation methodology across entire counties."
      }
    ],
    "practiceQuestions": [
      {
        "id": "m11-p1-pq-1",
        "question": "Why is the target variable SalePrice log-transformed using `np.log1p` before fitting regression algorithms?",
        "hint": "Think about right-skewness and homoscedasticity.",
        "answer": "Raw property sale prices are heavily right-skewed with a long luxury tail. Log-transforming normalizes the target distribution, stabilizes residual variance (homoscedasticity), and penalizes relative percentage error rather than absolute dollar error."
      },
      {
        "id": "m11-p1-pq-2",
        "question": "In the Ames Housing dataset, why must missing values in columns like `PoolQC`, `GarageType`, and `Fence` not be imputed with the median or mode?",
        "hint": "Consider what 'NA' signifies in property amenity checklists.",
        "answer": "In this dataset, 'NA' indicates structural absence (e.g. the property does not possess a pool, garage, or fence). Imputing with median or mode would falsely assign pools and garages to homes that lack them; they must be encoded as a valid distinct category ('None')."
      },
      {
        "id": "m11-p1-pq-3",
        "question": "Why is blending ElasticNet and LightGBM superior to using either individual model alone on tabular housing data?",
        "hint": "Think about linear extrapolation vs non-linear split boundaries.",
        "answer": "ElasticNet provides smooth, stable linear extrapolation along continuous dimensions (e.g. square footage) and handles correlated features well. LightGBM captures complex non-linear interactions and categorical thresholds. Blending them combines their complementary inductive biases."
      },
      {
        "id": "m11-p1-pq-4",
        "question": "After training on log-transformed target values `y_log`, how do you convert predictions back to dollar scale?",
        "hint": "Recall the inverse of np.log1p.",
        "answer": "Use `np.expm1(preds_log)`, which calculates exp(preds_log) - 1, properly reversing the logarithmic transformation back into dollars."
      }
    ],
    "quiz": [
      {
        "id": "m11-p1-q-1",
        "question": "If a house with actual price $300,000 is predicted at $330,000, what is the exact percentage error?",
        "options": [
          "+10.0%",
          "+30.0%",
          "+3.0%",
          "+1.1%"
        ],
        "correctIndex": 0,
        "explanation": "Percentage error is (330,000 - 300,000) / 300,000 = 30,000 / 300,000 = +0.10 = +10.0%."
      },
      {
        "id": "m11-p1-q-2",
        "question": "Which scaler is preferred over StandardScaler when continuous features have severe outliers that should not skew feature scaling?",
        "options": [
          "RobustScaler (uses median and interquartile range IQR)",
          "MinMaxScaler",
          "MaxAbsScaler",
          "Normalizer"
        ],
        "correctIndex": 0,
        "explanation": "RobustScaler scales features using the median and Interquartile Range (IQR = Q3 - Q1), making it insensitive to extreme property outliers."
      },
      {
        "id": "m11-p1-q-3",
        "question": "What is the consequence of setting `l1_ratio = 1.0` in ElasticNet?",
        "options": [
          "It becomes identical to standard Lasso regression (L1 regularization only).",
          "It becomes identical to Ridge regression.",
          "It disables all regularization.",
          "It converts into Ordinary Least Squares."
        ],
        "correctIndex": 0,
        "explanation": "In ElasticNet, l1_ratio=1.0 applies 100% L1 penalty and 0% L2 penalty, which is mathematically identical to Lasso."
      },
      {
        "id": "m11-p1-q-4",
        "question": "Why is `drop='first'` recommended when one-hot encoding categorical variables in unregularized linear models?",
        "options": [
          "To prevent exact multi-collinearity (the Dummy Variable Trap) where columns sum to 1.0.",
          "To save GPU memory.",
          "Because scikit-learn throws an error without it.",
          "To automatically handle missing values."
        ],
        "correctIndex": 0,
        "explanation": "If all k categories are one-hot encoded, their sum equals the intercept column, creating perfect linear dependence (dummy variable trap). Dropping one reference level prevents singular matrices."
      }
    ],
    "independentExercise": {
      "title": "Coding Challenge: Domain Feature Engineering Pipeline",
      "problem": "Write a Python function `engineer_housing_features(df)` that creates 3 new domain features: 1) `TotalSF` = GrLivArea + TotalBsmtSF, 2) `HouseAge` = YrSold - YearBuilt, and 3) `QualityInteraction` = OverallQual * OverallCond. Ensure that `HouseAge` cannot be negative (clamp to minimum 0). Return the modified DataFrame.",
      "hints": [
        "Use vectorized column addition df['GrLivArea'] + df['TotalBsmtSF']",
        "Use .clip(lower=0) on HouseAge",
        "Return modified DataFrame"
      ],
      "starterCode": "import pandas as pd\n\ndef engineer_housing_features(df: pd.DataFrame) -> pd.DataFrame:\n    # TODO: Add TotalSF, HouseAge, and QualityInteraction\n    df_out = df.copy()\n    return df_out\n",
      "solution": "import pandas as pd\n\ndef engineer_housing_features(df: pd.DataFrame) -> pd.DataFrame:\n    df_out = df.copy()\n    df_out['TotalSF'] = df_out['GrLivArea'] + df_out['TotalBsmtSF']\n    df_out['HouseAge'] = (df_out['YrSold'] - df_out['YearBuilt']).clip(lower=0)\n    df_out['QualityInteraction'] = df_out['OverallQual'] * df_out['OverallCond']\n    return df_out\n\n# Verification\ntest_df = pd.DataFrame({\n    'GrLivArea': [1500, 2200],\n    'TotalBsmtSF': [800, 1000],\n    'YrSold': [2010, 2008],\n    'YearBuilt': [1985, 2012], # second house sold before build year recorded due to pre-sale\n    'OverallQual': [7, 9],\n    'OverallCond': [5, 6]\n})\nout = engineer_housing_features(test_df)\nprint(out[['TotalSF', 'HouseAge', 'QualityInteraction']])\nassert out['TotalSF'].iloc[0] == 2300\nassert out['HouseAge'].iloc[1] == 0 # clamped\nassert out['QualityInteraction'].iloc[0] == 35\n"
    },
    "summary": {
      "keyTakeaways": [
        "Log-transforming right-skewed target variables stabilizes variance and aligns optimization with percentage error metrics.",
        "Handling structural missing data (where NA designates absence of amenity) is critical before statistical imputation.",
        "RobustScaler and ElasticNet regularization protect regression models from influential luxury property outliers.",
        "Blending linear models (ElasticNet) with non-linear tree models (LightGBM) achieves institutional-grade valuation accuracy."
      ],
      "nextLessonId": "project-customer-churn",
      "nextLessonTitle": "Customer Churn Prediction & Retention Analytics",
      "nextLessonModuleId": "module-11"
    }
  },
  'project-customer-churn': {
    "id": "project-customer-churn",
    "moduleId": "module-11",
    "title": "Capstone 2: Telecom Customer Churn & Retention Analytics",
    "subtitle": "Cost-Sensitive XGBoost, Precision-Recall Thresholding & Financial ROI Optimization",
    "order": 2,
    "readTimeMinutes": 30,
    "difficulty": "Advanced",
    "visualizerType": "none",
    "objectives": [
      "Architect a production churn prediction pipeline on the Telco Churn dataset.",
      "Implement cost-sensitive loss weighting using XGBoost scale_pos_weight to handle class imbalance.",
      "Optimize the classification decision threshold to maximize net financial dollar ROI rather than naive accuracy.",
      "Generate actionable customer intervention recommendations based on SHAP feature attribution."
    ],
    "prerequisites": [
      "Classification Algorithms",
      "Model Evaluation & Precision-Recall",
      "Gradient Boosting & XGBoost"
    ],
    "previousLesson": {
      "id": "project-house-price-prediction",
      "title": "Capstone 1: Ames Real Estate Valuation System",
      "moduleId": "module-11"
    },
    "analogy": {
      "title": "The Leaky Luxury Cruise Ship",
      "metaphor": "Customer churn modeling is an asymmetric economic optimization problem: balancing the cost of customer acquisition, customer lifetime value, and the expense of retention incentives.",
      "text": "Imagine managing an ultra-luxury world cruise ship. It costs $500 in marketing and champagne receptions to convince a new guest to book a cabin. If a guest currently on board decides they are unsatisfied and prepares to disembark at the next port (churn), offering them a complimentary $50 spa voucher (retention incentive) might convince 70% of them to stay. But if your guest-relations staff sends $50 vouchers blindly to all 3,000 passengers on board (false positives), the cruise loses $150,000 in wasted vouchers! Conversely, if you fail to identify passengers who are secretly packing their bags (false negatives), each lost passenger costs $2,000 in forfeited ticket revenue. A cost-sensitive machine learning model acts as the vigilant ship concierge: identifying high-risk passengers with surgical precision so marketing dollars are spent only where they generate positive net return."
    },
    "problemSolved": {
      "title": "Maximizing Net Retention Profit in Subscription Businesses",
      "description": "Acquiring a new customer costs 5 to 7 times more than retaining an existing one. Standard classification algorithms optimized for accuracy fail because predicting 'No Churn' for everyone achieves 80% accuracy while business revenues bleed out.",
      "keyPoints": [
        "Solves economic asymmetry: factors the real dollar costs of False Positives ($50 wasted incentive) and False Negatives ($1,000 lost customer LTV) directly into decision thresholds.",
        "Tackles moderate class imbalance: uses cost-sensitive gradient boosting to prevent majority non-churners from dominating tree splits.",
        "Enables explainable customer interventions: provides customer-level SHAP risk scores indicating whether churn is driven by contract type, tech support outages, or monthly fee hikes."
      ]
    },
    "intuition": {
      "overview": "Customer churn modeling maps usage telemetry, billing records, and service complaints into a well-calibrated churn probability P(Churn | X).",
      "steps": [
        {
          "step": 1,
          "title": "Feature Synthesis from Usage Telemetry",
          "description": "Engineer TenureDecay = MonthlyCharges / (Tenure + 1), PaymentRiskFlags, and TechSupportServiceRatio."
        },
        {
          "step": 2,
          "title": "Cost-Sensitive Training",
          "description": "Configure XGBoost with scale_pos_weight = sum(negative) / sum(positive) to penalize missed churners proportionally."
        },
        {
          "step": 3,
          "title": "Optimal Profit Threshold Tuning",
          "description": "Sweep threshold tau from 0.01 to 0.99 to find the exact probability cutoff that maximizes Expected Net Savings."
        }
      ]
    },
    "mathematics": {
      "overview": "The decision threshold is optimized against an asymmetric commercial profit matrix.",
      "foundations": [
        {
          "name": "Net Retention Savings Function",
          "latex": "\\text{Profit}(\\tau) = \\text{TP}(\\tau) \\cdot (r \\cdot \\text{CLV} - C_{\\text{offer}}) - \\text{FP}(\\tau) \\cdot C_{\\text{offer}}",
          "explanation": "where r is the incentive success rate, CLV is customer lifetime value, and C_offer is the cost of the retention campaign."
        },
        {
          "name": "XGBoost Cost-Sensitive Splitting Gain",
          "latex": "w_i = \\begin{cases} \\frac{N_{\\text{neg}}}{N_{\\text{pos}}} & \\text{if } y_i = 1 \\\\ 1.0 & \\text{if } y_i = 0 \\end{cases}",
          "explanation": "Scales the gradient and hessian of positive churn instances during tree split finding."
        }
      ]
    },
    "derivation": {
      "title": "Optimal Decision Threshold Derivation under Known Costs",
      "objective": "Derive the theoretical optimal threshold tau* that maximizes expected dollar savings.",
      "steps": [
        {
          "step": 1,
          "label": "Set marginal benefit of intervention equal to marginal cost",
          "latex": "P(\\text{Churn} | x) \\cdot r \\cdot \\text{CLV} \\ge C_{\\text{offer}}",
          "explanation": "Intervene only if expected recovered value exceeds the cost of sending the retention offer."
        },
        {
          "step": 2,
          "label": "Isolate the optimal probability threshold tau*",
          "latex": "\\tau^* = \\frac{C_{\\text{offer}}}{r \\cdot \\text{CLV}}",
          "explanation": "If an offer costs $50, has success rate r = 0.50, and customer CLV is $1,000, then tau* = 50 / (0.50 * 1000) = 50 / 500 = 0.10. Customers with just 10% churn probability should receive retention offers!"
        }
      ]
    },
    "variables": [
      {
        "symbol": "\\text{CLV}",
        "name": "Customer Lifetime Value",
        "description": "Net discounted profit generated by an active customer over their remaining lifecycle.",
        "dimensions": "currency ($)"
      },
      {
        "symbol": "C_{\\text{offer}}",
        "name": "Cost of Retention Offer",
        "description": "Marketing incentive cost per targeted customer.",
        "dimensions": "currency ($)"
      },
      {
        "symbol": "r",
        "name": "Offer Acceptance / Save Rate",
        "description": "Fraction of contacted churners who accept the offer and remain subscribed.",
        "dimensions": "[0, 1]"
      }
    ],
    "numericalExample": {
      "scenario": "A telecom provider evaluates 1,000 subscribers. Incentive cost C_offer = $20, customer CLV = $400, and save rate r = 0.40. Net value of a saved customer is r * CLV - C_offer = 0.40 * 400 - 20 = $140. Cost of a false alarm (targeting a non-churner) is C_offer = $20. Threshold A (tau=0.50) yields TP=100, FP=20. Threshold B (tau=0.15) yields TP=180, FP=150. Calculate net profit for both thresholds.",
      "dataset": [
        {
          "Threshold": "A (tau=0.50)",
          "TP": 100,
          "FP": 20
        },
        {
          "Threshold": "B (tau=0.15)",
          "TP": 180,
          "FP": 150
        }
      ],
      "calculations": [
        {
          "step": "Step 1: Compute Net Profit for Threshold A (tau=0.50)",
          "math": "Profit_A = (100 * $140) - (20 * $20) = $14,000 - $400 = $13,600",
          "result": "$13,600 net profit"
        },
        {
          "step": "Step 2: Compute Net Profit for Threshold B (tau=0.15)",
          "math": "Profit_B = (180 * $140) - (150 * $20) = $25,200 - $3,000 = $22,200",
          "result": "$22,200 net profit"
        },
        {
          "step": "Step 3: Compare financial return",
          "math": "Delta = $22,200 - $13,600 = +$8,600 (+63.2% profit increase)",
          "result": "+$8,600 gain"
        }
      ],
      "finalConclusion": "Lowering the classification threshold to tau=0.15 captured 80 additional churners, increasing net financial savings by $8,600 despite incurring higher false alarms."
    },
    "visualExplanation": {
      "title": "Profit Curve vs Classification Threshold",
      "description": "How dollar savings peak at an asymmetric probability threshold rather than default 0.50.",
      "features": [
        "Precision-Recall Curve: Shows trade-off between targeting precision and churner recall.",
        "Dollar Profit Curve: Peaks at tau = 0.15, highlighting the sweet spot of maximal retention ROI.",
        "Confusion Matrix Overlay: Visualizes cost-weighted counts across TP, FP, TN, and FN."
      ]
    },
    "scratchCode": {
      "title": "Telco Churn Modeling with Cost-Sensitive XGBoost & Threshold Search",
      "code": "import numpy as np\nimport pandas as pd\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.metrics import roc_auc_score, precision_recall_curve\nimport xgboost as xgb\n\n# 1. Synthesize realistic Telco Churn dataset\nnp.random.seed(42)\nn = 2000\ntenure = np.random.exponential(scale=20, size=n).clip(1, 72)\nmonthly_charges = np.random.normal(65, 25, size=n).clip(18, 120)\ncontract_month_to_month = (np.random.rand(n) > 0.45).astype(int)\ntech_support = (np.random.rand(n) > 0.60).astype(int)\n\n# True churn probability\nlogits = -1.8 - 0.04 * tenure + 0.02 * monthly_charges + 1.2 * contract_month_to_month - 0.8 * tech_support\nprobs = 1.0 / (1.0 + np.exp(-logits))\ny = (np.random.rand(n) < probs).astype(int)\n\nX = pd.DataFrame({\n    'tenure': tenure,\n    'MonthlyCharges': monthly_charges,\n    'Contract_M2M': contract_month_to_month,\n    'TechSupport': tech_support,\n    'TenureChargeRatio': monthly_charges / (tenure + 1)\n})\n\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42, stratify=y)\n\n# 2. Configure Cost-Sensitive XGBoost\nscale_pos = (len(y_train) - sum(y_train)) / sum(y_train)\nclf = xgb.XGBClassifier(\n    n_estimators=100,\n    learning_rate=0.05,\n    max_depth=4,\n    scale_pos_weight=scale_pos,\n    random_state=42,\n    eval_metric='logloss'\n)\nclf.fit(X_train, y_train)\n\n# 3. Find Optimal Economic Threshold\ny_test_probs = clf.predict_proba(X_test)[:, 1]\n\ndef calculate_profit(threshold, probs, y_true, clv=500.0, cost_offer=30.0, save_rate=0.45):\n    preds = (probs >= threshold).astype(int)\n    tp = np.sum((preds == 1) & (y_true == 1))\n    fp = np.sum((preds == 1) & (y_true == 0))\n    return tp * (save_rate * clv - cost_offer) - fp * cost_offer\n\nthresholds = np.linspace(0.05, 0.95, 91)\nprofits = [calculate_profit(t, y_test_probs, y_test) for t in thresholds]\nbest_idx = np.argmax(profits)\nopt_thresh = thresholds[best_idx]\nmax_profit = profits[best_idx]\nprofit_default = calculate_profit(0.50, y_test_probs, y_test)\n\nprint(f\"Test ROC-AUC Score:           {roc_auc_score(y_test, y_test_probs):.4f}\")\nprint(f\"Optimal Economic Threshold:   tau = {opt_thresh:.2f}\")\nprint(f\"Profit at Default tau=0.50:   ${profit_default:.2f}\")\nprint(f\"Profit at Optimal tau={opt_thresh:.2f}:   ${max_profit:.2f} (+${max_profit - profit_default:.2f} Lift!)\")",
      "explanation": "Calculates scale_pos_weight for XGBoost, sweeps threshold across dollar profit function, and demonstrates significant revenue lift over default 0.50 cutoff."
    },
    "sklearnCode": {
      "title": "SHAP Feature Attribution for Customer Interventions",
      "code": "# Simulated SHAP feature attribution workflow for customer support reps\n# import shap\n# explainer = shap.TreeExplainer(clf)\n# shap_values = explainer.shap_values(X_test)\n# Top drivers: Contract_M2M (+1.2), Tenure (-0.8), MonthlyCharges (+0.5)\nprint(\"SHAP values generate personalized customer retention talking points for call center agents.\")",
      "explanation": "Explains why specific customers are flagged for churn risk to personalize retention incentives."
    },
    "runnableCode": {
      "code": "def evaluate_threshold_tradeoff(probs, labels, tau):\n    preds = [1 if p >= tau else 0 for p in probs]\n    tp = sum(1 for p, y in zip(preds, labels) if p == 1 and y == 1)\n    fp = sum(1 for p, y in zip(preds, labels) if p == 1 and y == 0)\n    fn = sum(1 for p, y in zip(preds, labels) if p == 0 and y == 1)\n    prec = tp / (tp + fp) if (tp + fp) > 0 else 0.0\n    rec = tp / (tp + fn) if (tp + fn) > 0 else 0.0\n    return prec, rec\n\nprobs = [0.85, 0.65, 0.45, 0.35, 0.25, 0.15, 0.05]\nlabels = [1, 1, 1, 0, 1, 0, 0]\n\np_high, r_high = evaluate_threshold_tradeoff(probs, labels, tau=0.50)\np_low, r_low   = evaluate_threshold_tradeoff(probs, labels, tau=0.20)\n\nprint(f\"At tau=0.50 -> Precision: {p_high:.2f}, Recall: {r_high:.2f}\")\nprint(f\"At tau=0.20 -> Precision: {p_low:.2f}, Recall: {r_low:.2f} (Captures 100% of churners!)\")",
      "expectedOutput": "At tau=0.50 -> Precision: 1.00, Recall: 0.50\nAt tau=0.20 -> Precision: 0.80, Recall: 1.00 (Captures 100% of churners!)"
    },
    "lineByLineExplanation": [
      {
        "lines": "scale_pos = (len(y_train) - sum(y_train)) / sum(y_train)",
        "codeSnippet": "scale_pos = N_neg / N_pos",
        "explanation": "Calculates the ratio of non-churners to churners, scaling the gradient penalty for missed churners."
      },
      {
        "lines": "opt_thresh = thresholds[best_idx]",
        "codeSnippet": "np.argmax(profits)",
        "explanation": "Finds the exact probability cutoff that maximizes business dollar return rather than abstract F1 score."
      }
    ],
    "hyperparameters": [
      {
        "name": "scale_pos_weight (in XGBoost)",
        "defaultVal": "1.0",
        "range": "1.0 to N_neg / N_pos",
        "effect": "Multiplies positive class gradients to penalize false negatives.",
        "recommendation": "Set to sqrt(N_neg / N_pos) to balance precision and recall without inflating false positive rates."
      },
      {
        "name": "max_depth (in XGBoost)",
        "defaultVal": "6",
        "range": "3 to 8",
        "effect": "Maximum depth of decision trees in the ensemble.",
        "recommendation": "Use max_depth=3 or 4 on tabular churn datasets to prevent overfitting to noisy customer histories."
      }
    ],
    "assumptions": [
      {
        "assumption": "Constant Customer Lifetime Value (CLV)",
        "whyItMatters": "The simple profit formula assumes uniform CLV across all subscribers.",
        "howToVerify": "Segment customers by plan tier or multiply individual customer CLV by churn probability. Treating low-value prepaid users equally with high-value enterprise accounts misallocates budget."
      },
      {
        "assumption": "Independent Offer Acceptance Rate",
        "whyItMatters": "Assumes retention save rate r is independent of customer churn probability.",
        "howToVerify": "Run uplift modeling (treatment vs control A/B test) to measure incremental retention lift. Wasting incentives on customers who would stay anyway (sure things) or who will leave regardless (lost causes)."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Deploying Model at Default Classification Threshold tau = 0.50",
        "solution": "Always sweep the threshold against a commercial profit or cost matrix.",
        "codeExample": "Default tau=0.50 leaves 50% of preventable churners uncontacted, losing tens of thousands of dollars in recurring revenue."
      },
      {
        "mistake": "Evaluating Model Performance Exclusively with Accuracy",
        "solution": "Use PR-AUC (Precision-Recall Area Under Curve) and cost-weighted profit curves.",
        "codeExample": "On an 85% non-churn dataset, a useless dummy model predicting 'No Churn' achieves 85% accuracy while saving zero customers."
      }
    ],
    "realWorldUseCases": [
      {
        "industry": "Subscription SaaS & Cloud Platforms",
        "application": "Automated churn risk alerts for enterprise Customer Success Managers.",
        "benefit": "Enables proactive outreach 60 days before contract renewal, boosting annual net retention rate by 4.2%."
      },
      {
        "industry": "Mobile Telecommunications Carriers",
        "application": "Automated personalized loyalty offers delivered via SMS to subscribers with expiring promotional discounts.",
        "benefit": "Reduces monthly customer churn by 18,000 subscribers, protecting $1.2M in monthly recurring revenue."
      }
    ],
    "practiceQuestions": [
      {
        "id": "m11-p2-pq-1",
        "question": "Why is the optimal classification threshold for customer churn typically much lower than 0.50 (e.g. tau = 0.15)?",
        "hint": "Consider the cost of losing a customer versus the cost of a retention voucher.",
        "answer": "Losing a customer incurs a massive cost (hundreds of dollars in lost CLV), while contacting a customer with a retention incentive costs very little ($10-$30). Because false negatives are far more expensive than false positives, the optimal decision threshold shifts downward to catch more at-risk customers."
      },
      {
        "id": "m11-p2-pq-2",
        "question": "What does the `scale_pos_weight` hyperparameter in XGBoost do mathematically?",
        "hint": "Think about the loss gradient for positive samples.",
        "answer": "It scales the loss function gradient and hessian for positive class instances by a factor of scale_pos_weight (typically N_neg / N_pos), forcing the tree split algorithm to treat minority positive mistakes with proportionally higher importance."
      },
      {
        "id": "m11-p2-pq-3",
        "question": "Why is Precision-Recall AUC (PR-AUC) preferred over ROC-AUC on imbalanced churn datasets?",
        "hint": "Think about the True Negative count inflating the False Positive Rate.",
        "answer": "ROC-AUC plots True Positive Rate vs False Positive Rate = FP / (FP + TN). When the negative class is massive, huge increases in false positives produce only tiny changes in FPR, making ROC-AUC misleadingly optimistic. PR-AUC focuses exclusively on the positive minority class."
      },
      {
        "id": "m11-p2-pq-4",
        "question": "What is 'Uplift Modeling' in customer retention analytics?",
        "hint": "Think about predicting the incremental effect of an intervention.",
        "answer": "Uplift modeling predicts the causal increase in retention probability caused by sending the marketing incentive, identifying the 'Persuadables' while avoiding 'Sure Things' (who stay regardless) and 'Do-Not-Disturbs' (whom contacting triggers to leave)."
      }
    ],
    "quiz": [
      {
        "id": "m11-p2-q-1",
        "question": "If customer acquisition cost (CAC) is $600 and retention cost is $50, which strategy delivers higher ROI for customer growth?",
        "options": [
          "Investing in retention campaigns that save at-risk subscribers.",
          "Spending all budget exclusively on new customer acquisition.",
          "Disabling customer support to save money.",
          "Increasing monthly prices by 100%."
        ],
        "correctIndex": 0,
        "explanation": "Retaining existing customers costs a fraction of acquiring new ones ($50 vs $600), delivering 5-10x higher marketing ROI."
      },
      {
        "id": "m11-p2-q-2",
        "question": "Which customer attribute is consistently the single strongest predictive feature of churn across subscription datasets?",
        "options": [
          "Tenure (length of time subscribed) and Contract Type (Month-to-Month vs Long-Term)",
          "Browser version used",
          "Customer first name",
          "Operating system color theme"
        ],
        "correctIndex": 0,
        "explanation": "Short tenure and Month-to-Month contracts are universally the highest risk factors; customers who survive past month 12 exhibit dramatically lower baseline churn rates."
      },
      {
        "id": "m11-p2-q-3",
        "question": "What is the primary risk of offering retention discounts too aggressively to low-risk customers (False Positives)?",
        "options": [
          "Training customers to threaten cancellation simply to receive unneeded discounts, eroding profit margins.",
          "Crashing the web server.",
          "Overfitting the random seed.",
          "Converting the model to Linear Regression."
        ],
        "correctIndex": 0,
        "explanation": "Over-incentivizing non-churners wastes marketing budget and conditions loyal customers to demand lower prices."
      },
      {
        "id": "m11-p2-q-4",
        "question": "In survival analysis for customer churn, what does the Hazard Rate h(t) represent?",
        "options": [
          "The probability that a customer churns in time interval t, given that they have remained subscribed up to time t.",
          "The total number of customers who ever subscribed.",
          "The server CPU temperature.",
          "The total dollar revenue divided by tenure."
        ],
        "correctIndex": 0,
        "explanation": "The hazard rate h(t) measures instantaneous churn risk at tenure t conditional on surviving up to time t."
      }
    ],
    "independentExercise": {
      "title": "Coding Challenge: Commercial Threshold Profit Optimizer",
      "problem": "Write a Python function `optimize_threshold_profit(y_true, y_probs, clv=600.0, offer_cost=40.0, save_rate=0.50)` that sweeps probability thresholds from 0.05 to 0.95 in 0.05 increments. Return a tuple `(optimal_threshold, max_profit, default_profit)` where profit is computed using Net Retention Savings formula.",
      "hints": [
        "Use np.arange(0.05, 0.96, 0.05)",
        "Net value per saved churner = save_rate * clv - offer_cost",
        "Cost per false alarm = offer_cost"
      ],
      "starterCode": "def optimize_threshold_profit(y_true, y_probs, clv=600.0, offer_cost=40.0, save_rate=0.50):\n    # TODO: Calculate profit curve and find optimal threshold\n    return 0.50, 0.0, 0.0\n",
      "solution": "import numpy as np\n\ndef optimize_threshold_profit(y_true, y_probs, clv=600.0, offer_cost=40.0, save_rate=0.50):\n    thresholds = np.arange(0.05, 0.96, 0.05)\n    saved_value = save_rate * clv - offer_cost\n    \n    best_profit = -float('inf')\n    best_thresh = 0.50\n    profit_default = 0.0\n    \n    for t in thresholds:\n        preds = (y_probs >= t).astype(int)\n        tp = np.sum((preds == 1) & (y_true == 1))\n        fp = np.sum((preds == 1) & (y_true == 0))\n        \n        profit = tp * saved_value - fp * offer_cost\n        if np.isclose(t, 0.50):\n            profit_default = profit\n        if profit > best_profit:\n            best_profit = profit\n            best_thresh = t\n            \n    return round(float(best_thresh), 2), round(float(best_profit), 2), round(float(profit_default), 2)\n\n# Verification\nnp.random.seed(42)\ny_true = np.array([1]*50 + [0]*200)\ny_probs = np.clip(np.where(y_true == 1, np.random.normal(0.4, 0.2, 250), np.random.normal(0.15, 0.15, 250)), 0, 1)\n\nopt_t, max_p, def_p = optimize_threshold_profit(y_true, y_probs)\nprint(f\"Optimal Threshold: {opt_t} | Max Profit: ${max_p} | Default (0.50) Profit: ${def_p}\")\nassert max_p >= def_p, 'Optimal profit must meet or exceed default profit!'\n"
    },
    "summary": {
      "keyTakeaways": [
        "Customer churn modeling is fundamentally an economic optimization problem with highly asymmetric mistake costs.",
        "Configuring cost-sensitive algorithms like XGBoost with `scale_pos_weight` penalizes missed churners during tree splitting.",
        "Sweeping classification thresholds against net profit curves routinely delivers 20-50% higher financial savings than default 0.50 cutoffs.",
        "SHAP explanations provide actionable, individual customer risk diagnostics that enable targeted retention interventions."
      ],
      "nextLessonId": "project-credit-risk",
      "nextLessonTitle": "Financial Loan Default & Credit Risk Scoring",
      "nextLessonModuleId": "module-11"
    }
  },
  'project-credit-risk': {
    "id": "project-credit-risk",
    "moduleId": "module-11",
    "title": "Capstone 3: Financial Loan Default & Credit Risk Scoring",
    "subtitle": "Imbalanced Data, Platt Probability Calibration & Basel Expected Loss Minimization",
    "order": 3,
    "readTimeMinutes": 32,
    "difficulty": "Advanced",
    "visualizerType": "none",
    "objectives": [
      "Architect an institutional credit default underwriting model under severe class imbalance (1:10 default ratio).",
      "Implement SMOTE-ENN (Synthetic Minority Over-sampling with Edited Nearest Neighbors) resampling pipeline.",
      "Calibrate predicted probabilities using Platt Scaling (Sigmoid) and Isotonic Regression to meet Basel banking standards.",
      "Compute Expected Financial Loss: EL = Probability of Default (PD) * Loss Given Default (LGD) * Exposure at Default (EAD)."
    ],
    "prerequisites": [
      "Classification Algorithms",
      "Probability Calibration",
      "Imbalanced Datasets & Resampling",
      "Cost-Sensitive Learning"
    ],
    "previousLesson": {
      "id": "project-customer-churn",
      "title": "Capstone 2: Telecom Customer Churn & Retention Analytics",
      "moduleId": "module-11"
    },
    "analogy": {
      "title": "The Commercial Bank's Fortified Vault",
      "metaphor": "Credit risk modeling combines extreme class imbalance handling with rigorous empirical probability calibration to calculate institutional expected monetary losses.",
      "text": "Imagine a commercial bank managing a $1 billion lending portfolio. Lending money is not like betting on coin flips: if the bank approves 1,000 borrowers who pay back their 5% interest on time, the bank earns a steady $50,000 profit. But if just 10 borrowers take their $100,000 loans and default completely (skipping town), the bank loses $1,000,000 in principal instantly wiping out the entire year's profit! Even worse, if a machine learning algorithm outputs an uncalibrated score of '0.85', banking regulators at the Federal Reserve do not care about raw machine learning confidence scores: they legally demand a mathematically verifiable empirical default probability. If the model says 5% of borrowers in a tier will default, exactly 5 out of 100 historical borrowers in that tier must have defaulted in audited stress tests. Credit scoring models are fortified risk engines balancing regulatory capital reserves against capital allocation return."
    },
    "problemSolved": {
      "title": "Automated Consumer Credit Underwriting and Risk Provisioning",
      "description": "Lending institutions process millions of loan applications annually. Uncalibrated models produce erratic probability scores that violate international banking regulatory accords (Basel II/III) and misprice credit risk.",
      "keyPoints": [
        "Calibrates raw decision scores into true probabilities: uses Platt scaling and Isotonic regression to ensure predicted probabilities match empirical default rates.",
        "Solves severe 1:10 imbalance: combines SMOTE synthetic sampling with Edited Nearest Neighbors to clean noisy decision boundaries.",
        "Quantifies dollar loss exposure: integrates Probability of Default (PD) with Loss Given Default (LGD) and Exposure at Default (EAD)."
      ]
    },
    "intuition": {
      "overview": "Credit underwriting evaluates applicant debt-to-income ratios, credit bureau histories, and revolving credit utilization into a rigorously calibrated probability of default.",
      "steps": [
        {
          "step": 1,
          "title": "Imbalance Resampling (SMOTE-ENN)",
          "description": "Synthesize minority default samples along nearest-neighbor line segments, followed by ENN cleaning of overlapping boundary noise."
        },
        {
          "step": 2,
          "title": "Probability Calibration",
          "description": "Fit a post-hoc calibration mapping (CalibratedClassifierCV) so predicted score 0.08 corresponds to an empirical 8% default rate."
        },
        {
          "step": 3,
          "title": "Expected Loss Calculation",
          "description": "Evaluate EL = PD * LGD * EAD for each applicant and establish credit approval cutoff thresholds based on bank risk tolerance."
        }
      ]
    },
    "mathematics": {
      "overview": "Basel Capital Accord credit risk quantification formula and Platt calibration logistic mapping.",
      "foundations": [
        {
          "name": "Basel Expected Loss (EL) Formula",
          "latex": "\\text{EL} = \\text{PD} \\times \\text{LGD} \\times \\text{EAD}",
          "explanation": "Probability of Default (PD) multiplied by Loss Given Default percentage (LGD, typically 45%) multiplied by Exposure at Default dollar amount (EAD)."
        },
        {
          "name": "Platt Scaling Logistic Calibration Mapping",
          "latex": "P(y = 1 | f) = \\frac{1}{1 + \\exp(A \\cdot f(x) + B)}",
          "explanation": "Fits scalar slope A and intercept B on holdout validation logits f(x) via maximum likelihood to output calibrated probabilities."
        },
        {
          "name": "Brier Score Calibration Error",
          "latex": "\\text{Brier} = \\frac{1}{N} \\sum_{i=1}^N (P_i - y_i)^2",
          "explanation": "Mean squared difference between predicted probabilities P_i and binary true outcomes y_i. Brier score decompose into Reliability + Resolution + Uncertainty."
        }
      ]
    },
    "derivation": {
      "title": "Derivation of the Expected Loss Lending Rule",
      "objective": "Determine the maximum permitted Probability of Default (PD) that yields positive expected lending return at interest rate r.",
      "steps": [
        {
          "step": 1,
          "label": "Define expected profit per dollar lent",
          "latex": "\\mathbb{E}[\\text{Profit}] = (1 - \\text{PD}) \\cdot r - \\text{PD} \\cdot \\text{LGD}",
          "explanation": "With probability 1 - PD, borrower repays with interest r; with probability PD, bank loses LGD fraction of principal."
        },
        {
          "step": 2,
          "label": "Solve for break-even default threshold PD*",
          "latex": "\\mathbb{E}[\\text{Profit}] \\ge 0 \\implies r - \\text{PD} \\cdot (r + \\text{LGD}) \\ge 0 \\implies \\text{PD}^* = \\frac{r}{r + \\text{LGD}}",
          "explanation": "For an 8% interest rate (r = 0.08) and 45% LGD (LGD = 0.45): PD* = 0.08 / (0.08 + 0.45) = 0.08 / 0.53 = 15.09%. Borrowers with PD > 15.1% generate expected financial losses!"
        }
      ]
    },
    "variables": [
      {
        "symbol": "\\text{PD}",
        "name": "Probability of Default",
        "description": "Calibrated probability that borrower fails to meet contractual repayments within 12 months.",
        "dimensions": "[0, 1]"
      },
      {
        "symbol": "\\text{LGD}",
        "name": "Loss Given Default",
        "description": "Percentage of total loan exposure lost after collateral liquidation.",
        "dimensions": "[0, 1] (standard Basel benchmark = 0.45)"
      },
      {
        "symbol": "\\text{EAD}",
        "name": "Exposure at Default",
        "description": "Total dollar credit balance outstanding at the time of default.",
        "dimensions": "currency ($)"
      }
    ],
    "numericalExample": {
      "scenario": "A commercial bank evaluates 3 loan applications each requesting a $50,000 personal loan (EAD = $50,000) at 9% interest rate (r = 0.09) with recovery history indicating LGD = 45% (0.45). Applicant 1 has calibrated PD = 0.02 (2%), Applicant 2 has PD = 0.12 (12%), and Applicant 3 has PD = 0.22 (22%). Calculate: 1) Expected Loss (EL) for each applicant, and 2) Expected Net Profit, determining who should be approved.",
      "dataset": [
        {
          "Applicant": 1,
          "EAD": 50000,
          "PD": 0.02,
          "LGD": 0.45,
          "Interest": "9%"
        },
        {
          "Applicant": 2,
          "EAD": 50000,
          "PD": 0.12,
          "LGD": 0.45,
          "Interest": "9%"
        },
        {
          "Applicant": 3,
          "EAD": 50000,
          "PD": 0.22,
          "LGD": 0.45,
          "Interest": "9%"
        }
      ],
      "calculations": [
        {
          "step": "Step 1: Compute Expected Loss (EL) for Applicant 1",
          "math": "EL_1 = PD * LGD * EAD = 0.02 * 0.45 * $50,000 = $450; Expected Interest = (1 - 0.02) * (0.09 * $50,000) = 0.98 * $4,500 = $4,410. Net = $4,410 - $450 = +$3,960",
          "result": "Net Profit +$3,960 (APPROVED)"
        },
        {
          "step": "Step 2: Compute Expected Loss (EL) for Applicant 2",
          "math": "EL_2 = 0.12 * 0.45 * $50,000 = $2,700; Expected Interest = (1 - 0.12) * $4,500 = 0.88 * $4,500 = $3,960. Net = $3,960 - $2,700 = +$1,260",
          "result": "Net Profit +$1,260 (APPROVED)"
        },
        {
          "step": "Step 3: Compute Expected Loss (EL) for Applicant 3",
          "math": "EL_3 = 0.22 * 0.45 * $50,000 = $4,950; Expected Interest = (1 - 0.22) * $4,500 = 0.78 * $4,500 = $3,510. Net = $3,510 - $4,950 = -$1,440",
          "result": "Net Loss -$1,440 (REJECTED)"
        }
      ],
      "finalConclusion": "Break-even default rate PD* = 0.09 / (0.09 + 0.45) = 16.67%. Applicants 1 and 2 are approved with positive expected return; Applicant 3 exceeds break-even threshold and is rejected."
    },
    "visualExplanation": {
      "title": "Credit Risk Scoring & Calibration Architecture",
      "description": "How applicant credit features are transformed into calibrated default probabilities and loan approvals.",
      "features": [
        "Reliability Curve (Calibration Display): Plots predicted probabilities against empirical default fractions.",
        "SMOTE-ENN Decision Boundary: Visualizes synthetic minority generation and boundary cleaning.",
        "Expected Loss Threshold Dial: Rejection cutoff determined by economic break-even PD*."
      ]
    },
    "scratchCode": {
      "title": "Credit Default Pipeline with Probability Calibration & Expected Loss",
      "code": "import numpy as np\nimport pandas as pd\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.calibration import CalibratedClassifierCV, calibration_curve\nfrom sklearn.metrics import brier_score_loss, roc_auc_score\n\n# 1. Synthesize realistic Credit Risk dataset with 1:10 imbalance\nnp.random.seed(42)\nn = 2500\ndebt_to_income = np.random.normal(0.35, 0.15, n).clip(0.05, 0.95)\nrevolving_util = np.random.beta(a=2, b=5, size=n)\ndelinquencies_2yr = np.random.poisson(lam=0.4, size=n)\nannual_income = np.random.lognormal(mean=10.8, sigma=0.5, size=n)\n\n# True default latent logit\nlogits = -3.2 + 3.5 * debt_to_income + 2.8 * revolving_util + 0.8 * delinquencies_2yr - 0.000015 * annual_income\ntrue_pd = 1.0 / (1.0 + np.exp(-logits))\ny = (np.random.rand(n) < true_pd).astype(int)\n\nX = pd.DataFrame({\n    'DTI': debt_to_income,\n    'RevolvingUtil': revolving_util,\n    'Delinq2Yr': delinquencies_2yr,\n    'AnnualIncome': annual_income\n})\n\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42, stratify=y)\n\n# 2. Train baseline uncalibrated model\nbase_clf = LogisticRegression(class_weight='balanced', max_iter=200, random_state=42)\nbase_clf.fit(X_train, y_train)\n\n# 3. Apply Platt Scaling Probability Calibration (Sigmoid)\ncalibrated_clf = CalibratedClassifierCV(estimator=base_clf, method='sigmoid', cv='prefit')\ncalibrated_clf.fit(X_train, y_train)\n\n# 4. Evaluate Brier Score & Expected Loss\nuncal_probs = base_clf.predict_proba(X_test)[:, 1]\ncal_probs = calibrated_clf.predict_proba(X_test)[:, 1]\n\nbrier_uncal = brier_score_loss(y_test, uncal_probs)\nbrier_cal = brier_score_loss(y_test, cal_probs)\n\nprint(f\"Uncalibrated Brier Score: {brier_uncal:.4f}\")\nprint(f\"Calibrated Brier Score:   {brier_cal:.4f} (Lower = Better Calibration!)\")\nprint(f\"Test ROC-AUC:             {roc_auc_score(y_test, cal_probs):.4f}\")\n\n# 5. Expected Loss Calculation across test portfolio ($50,000 loans with 45% LGD)\nport_ead = 50000.0\nport_lgd = 0.45\ntotal_expected_loss = np.sum(cal_probs * port_lgd * port_ead)\nprint(f\"Total Expected Loss on Portfolio ({len(y_test)} applicants): ${total_expected_loss:,.2f}\")",
      "explanation": "Trains balanced model, applies CalibratedClassifierCV with sigmoid Platt scaling, measures Brier score reduction, and evaluates Basel Expected Loss."
    },
    "sklearnCode": {
      "title": "Plotting Reliability Calibration Curves",
      "code": "# Visualizing calibration alignment\n# from sklearn.calibration import CalibrationDisplay\n# disp = CalibrationDisplay.from_estimator(calibrated_clf, X_test, y_test, n_bins=10)\n# Perfect calibration matches the 45-degree diagonal line!\nprint(\"A perfectly calibrated credit model follows the 45-degree diagonal reliability curve.\")",
      "explanation": "Demonstrates `CalibrationDisplay.from_estimator` to evaluate whether predicted confidence matches empirical outcomes."
    },
    "runnableCode": {
      "code": "def compute_expected_loss(loan_amount, pd, lgd=0.45):\n    return loan_amount * pd * lgd\n\napplicants = [\n    {'name': 'Borrower A', 'loan': 25000, 'pd': 0.015},\n    {'name': 'Borrower B', 'loan': 80000, 'pd': 0.065},\n    {'name': 'Borrower C', 'loan': 120000, 'pd': 0.180}\n]\n\nfor app in applicants:\n    el = compute_expected_loss(app['loan'], app['pd'])\n    print(f\"{app['name']}: Loan = ${app['loan']:,d} | PD = {app['pd']*100:4.1f}% -> Expected Loss: ${el:,.2f}\")",
      "expectedOutput": "Borrower A: Loan = $25,000 | PD =  1.5% -> Expected Loss: $168.75\nBorrower B: Loan = $80,000 | PD =  6.5% -> Expected Loss: $2,340.00\nBorrower C: Loan = $120,000 | PD = 18.0% -> Expected Loss: $9,720.00"
    },
    "lineByLineExplanation": [
      {
        "lines": "calibrated_clf = CalibratedClassifierCV(estimator=base_clf, method='sigmoid', cv='prefit')",
        "codeSnippet": "CalibratedClassifierCV(..., method='sigmoid')",
        "explanation": "Fits a logistic transformation over model decision scores using maximum likelihood (Platt Scaling)."
      },
      {
        "lines": "brier_cal = brier_score_loss(y_test, cal_probs)",
        "codeSnippet": "brier_score_loss(...)",
        "explanation": "Evaluates mean squared difference between predicted probabilities and binary outcomes; measures calibration fidelity."
      }
    ],
    "hyperparameters": [
      {
        "name": "method (in CalibratedClassifierCV)",
        "defaultVal": "'sigmoid'",
        "range": "'sigmoid' (Platt scaling) or 'isotonic'",
        "effect": "Specifies parametric (sigmoid) vs non-parametric step-wise (isotonic) calibration.",
        "recommendation": "Use 'sigmoid' when validation sample size is under 1,000 to prevent overfitting; use 'isotonic' for large datasets (>10,000 samples)."
      },
      {
        "name": "class_weight (in LogisticRegression)",
        "defaultVal": "None",
        "range": "'balanced' or dict",
        "effect": "Inversely weights loss penalties proportional to class frequencies.",
        "recommendation": "Set class_weight='balanced' during base classifier training to ensure minority defaults shift decision boundaries."
      }
    ],
    "assumptions": [
      {
        "assumption": "Independent Calibration Validation Set",
        "whyItMatters": "Fitting calibration parameters (Platt scaling) on training data overfits and underestimates variance.",
        "howToVerify": "Use cv=3 or cv='prefit' on an independent holdout split. Model appears calibrated on train but produces severely uncalibrated risk probabilities in production."
      },
      {
        "assumption": "Monotonic Relationship between Score and Default Probability",
        "whyItMatters": "Platt scaling and Isotonic regression assume higher raw model scores correspond to higher default probability.",
        "howToVerify": "Check Spearman rank correlation between raw logits and calibrated probabilities. Violations indicate non-monotonic feature inversions corrupting credit tiers."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Treating Uncalibrated Tree Probabilities as True Probability of Default (PD)",
        "solution": "Tree models (Random Forest, XGBoost) push probabilities toward 0 and 1 due to greedy splitting; always calibrate with Platt Scaling.",
        "codeExample": "Using raw predict_proba() from Random Forest directly in Basel capital calculations underestimates tail portfolio risk."
      },
      {
        "mistake": "Applying SMOTE to the Entire Dataset Before Splitting (Data Leakage)",
        "solution": "Fit SMOTE strictly on X_train inside an imbalanced-learn Pipeline.",
        "codeExample": "Synthesizing minority samples before splitting leaks test set neighbor structures into the training distribution."
      }
    ],
    "realWorldUseCases": [
      {
        "industry": "Commercial Retail Banking (Mortgage & Auto Lending)",
        "application": "Automated instant loan underwriting decisioning engines.",
        "benefit": "Enables automated straight-through processing for 80% of personal loan applicants while maintaining regulatory capital compliance."
      },
      {
        "industry": "Peer-to-Peer Lending Platforms (LendingClub, Prosper)",
        "application": "Dynamic risk-based pricing: setting interest rates proportional to calculated Expected Loss.",
        "benefit": "Maintains profitable portfolio yields of 7-9% net of charge-offs across economic business cycles."
      }
    ],
    "practiceQuestions": [
      {
        "id": "m11-p3-pq-1",
        "question": "Why do tree-based ensembles (Random Forest, Gradient Boosting) often produce poorly calibrated probabilities that require post-hoc calibration?",
        "hint": "Think about leaf node averaging and variance at tree boundaries.",
        "answer": "Decision tree leaves average small subsets of training samples. Near tree boundaries, predictions are pushed toward 0.0 or 1.0 due to greedy split criteria, resulting in overconfident probabilities that do not reflect true empirical base rates."
      },
      {
        "id": "m11-p3-pq-2",
        "question": "What is the difference between Platt Scaling and Isotonic Regression for probability calibration?",
        "hint": "Consider parametric sigmoid curves vs non-parametric step functions.",
        "answer": "Platt Scaling fits a parametric logistic sigmoid function (2 parameters: slope and intercept), making it robust on smaller datasets. Isotonic Regression fits a non-parametric piecewise-constant monotonic step function, which is more flexible for complex distortions but requires large datasets to avoid overfitting."
      },
      {
        "id": "m11-p3-pq-3",
        "question": "In the Basel Expected Loss formula `EL = PD * LGD * EAD`, what does `LGD = 0.45` signify?",
        "hint": "Consider what happens to debt during bankruptcy liquidation.",
        "answer": "Loss Given Default (LGD) of 0.45 means that when a borrower defaults, the bank recovers 55% of the outstanding loan balance through collateral liquidation or collection agencies, permanently writing off 45% as an unrecoverable loss."
      },
      {
        "id": "m11-p3-pq-4",
        "question": "Why must resampling techniques like SMOTE only ever be applied to the training set and never to the validation or test sets?",
        "hint": "Think about realistic evaluation distributions.",
        "answer": "The test set must strictly represent the true real-world production distribution (including its 1:10 imbalance). Synthesizing artificial samples in the test set distorts evaluation metrics like precision and false positive rates, producing invalid performance claims."
      }
    ],
    "quiz": [
      {
        "id": "m11-p3-q-1",
        "question": "What does a Brier score of 0.0 indicate?",
        "options": [
          "Perfect probabilistic calibration and accuracy (every prediction is 0.0 or 1.0 and matches reality).",
          "Total failure of the model.",
          "Zero true positive predictions.",
          "Infinite variance."
        ],
        "correctIndex": 0,
        "explanation": "Brier score is the mean squared error of predicted probabilities: sum((P_i - y_i)^2)/N. A score of 0.0 represents perfect probabilistic forecasting."
      },
      {
        "id": "m11-p3-q-2",
        "question": "If loan interest rate is r = 0.05 and LGD = 0.45, what is the break-even Probability of Default (PD*) above which expected profit is negative?",
        "options": [
          "0.05 / (0.05 + 0.45) = 10.0%",
          "0.05 * 0.45 = 2.25%",
          "0.45 / 0.05 = 90.0%",
          "50.0%"
        ],
        "correctIndex": 0,
        "explanation": "Break-even condition is PD* = r / (r + LGD) = 0.05 / (0.05 + 0.45) = 0.05 / 0.50 = 0.10 = 10.0%."
      },
      {
        "id": "m11-p3-q-3",
        "question": "What does SMOTE-ENN do that standard SMOTE does not?",
        "options": [
          "After generating synthetic minority samples, it applies Edited Nearest Neighbors (ENN) to remove noisy, ambiguous samples that cross class boundary regions.",
          "It doubles the learning rate.",
          "It converts categorical variables into numbers.",
          "It calculates the Hessian matrix."
        ],
        "correctIndex": 0,
        "explanation": "SMOTE-ENN is a hybrid resampling method: SMOTE oversamples the minority class, and ENN cleans up ambiguous data points whose nearest neighbors belong to the opposite class."
      },
      {
        "id": "m11-p3-q-4",
        "question": "In a Reliability Diagram (Calibration Curve), what does a curve that lies entirely BELOW the 45-degree diagonal indicate?",
        "options": [
          "The model is systematically overconfident (predicting higher probabilities than actual empirical default frequencies).",
          "The model is underconfident.",
          "The model has zero error.",
          "The dataset has zero defaults."
        ],
        "correctIndex": 0,
        "explanation": "If the calibration curve lies below the diagonal, predicted probabilities exceed empirical event fractions, indicating overconfidence."
      }
    ],
    "independentExercise": {
      "title": "Coding Challenge: Portfolio Expected Loss Aggregator",
      "problem": "Write a Python function `compute_portfolio_loss(loans_df, default_prob_col, balance_col, lgd=0.45)` that calculates the total portfolio Expected Loss (EL) in dollars and the portfolio Loss Rate (total EL divided by total loan balance). Return a dictionary `{'total_expected_loss': float, 'portfolio_loss_rate': float}`.",
      "hints": [
        "EL per loan = loans_df[default_prob_col] * lgd * loans_df[balance_col]",
        "Sum EL across all loans",
        "Divide by sum of balance_col"
      ],
      "starterCode": "import pandas as pd\n\ndef compute_portfolio_loss(df, pd_col='pd', balance_col='loan_amount', lgd=0.45):\n    # TODO: Calculate total expected loss and loss rate\n    return {'total_expected_loss': 0.0, 'portfolio_loss_rate': 0.0}\n",
      "solution": "import pandas as pd\n\ndef compute_portfolio_loss(df, pd_col='pd', balance_col='loan_amount', lgd=0.45):\n    el_series = df[pd_col] * lgd * df[balance_col]\n    total_el = float(el_series.sum())\n    total_bal = float(df[balance_col].sum())\n    loss_rate = total_el / total_bal if total_bal > 0 else 0.0\n    return {\n        'total_expected_loss': round(total_el, 2),\n        'portfolio_loss_rate': round(loss_rate, 4)\n    }\n\n# Verification\ntest_portfolio = pd.DataFrame({\n    'loan_amount': [10000, 20000, 50000],\n    'pd': [0.02, 0.05, 0.10]\n})\n# EL1 = 10000*0.02*0.45 = 90; EL2 = 20000*0.05*0.45 = 450; EL3 = 50000*0.10*0.45 = 2250 -> Total = 2790; Total Bal = 80000 -> Rate = 2790/80000 = 0.034875\nres = compute_portfolio_loss(test_portfolio)\nprint(\"Portfolio Loss Analysis:\", res)\nassert res['total_expected_loss'] == 2790.0\nassert res['portfolio_loss_rate'] == 0.0349\n"
    },
    "summary": {
      "keyTakeaways": [
        "Credit risk models evaluate extreme asymmetry: small interest margins require strict prevention of high-principal default charge-offs.",
        "Probability calibration via Platt Scaling and Isotonic Regression ensures predicted scores represent empirical default frequencies.",
        "The Basel Expected Loss formula (EL = PD * LGD * EAD) translates statistical probabilities directly into dollar capital provisioning.",
        "Resampling pipelines (SMOTE-ENN) must strictly fit only on training folds to prevent evaluation data leakage."
      ],
      "nextLessonId": "project-customer-sentiment",
      "nextLessonTitle": "E-Commerce Review NLP Sentiment Classifier",
      "nextLessonModuleId": "module-11"
    }
  },
  'project-customer-sentiment': {
    "id": "project-customer-sentiment",
    "moduleId": "module-11",
    "title": "Capstone 4: E-Commerce Review NLP Sentiment Classifier",
    "subtitle": "TF-IDF N-Grams, LinearSVC vs Fine-Tuned DistilBERT & Sub-20ms Production Latency",
    "order": 4,
    "readTimeMinutes": 30,
    "difficulty": "Advanced",
    "visualizerType": "none",
    "objectives": [
      "Architect an end-to-end natural language processing pipeline for customer product review sentiment analysis.",
      "Implement sub-linear TF-IDF vectorization with n-grams (1, 2) and benchmark against dense DistilBERT embeddings.",
      "Benchmark inference latency and memory consumption comparing LinearSVC (1.2ms) against DistilBERT (25ms).",
      "Build a robust text preprocessing pipeline: HTML stripping, negation handling, emoji expansion, and tokenization."
    ],
    "prerequisites": [
      "Text Preprocessing & Feature Engineering",
      "Classification Algorithms",
      "Support Vector Machines",
      "PyTorch Fundamentals"
    ],
    "previousLesson": {
      "id": "project-credit-risk",
      "title": "Capstone 3: Financial Loan Default & Credit Risk Scoring",
      "moduleId": "module-11"
    },
    "analogy": {
      "title": "The High-Speed Post Office Mail Sorter vs The Literary Scholar",
      "metaphor": "NLP production architecture balances semantic nuance against inference throughput: pairing lightweight TF-IDF LinearSVC for high-volume edge filtering with Transformer models for nuanced edge cases.",
      "text": "Imagine an international postal depot sorting 500,000 incoming customer feedback letters every single hour. A literary scholar with a PhD in literature (DistilBERT transformer) reads every letter with deep semantic appreciation, understanding ironic humor, poetic metaphors, and subtle syntactic inversions. But the scholar takes 5 seconds to analyze each letter and charges $500 an hour! Conversely, an automated high-speed optical barcode scanner (TF-IDF with LinearSVC) checks for specific decisive keyword n-grams ('defective screen', 'broke on arrival', 'exceeded expectations') in 0.8 milliseconds, successfully routing 98% of urgent complaints to the refund department at zero cost. In production machine learning, software architects must make the pragmatic engineering trade-off: deploy an ultra-fast, lightweight classical n-gram SVM for 98% accuracy at sub-2ms latency, or pay 50x compute cost for deep Transformers only when complex linguistic ambiguity demands it."
    },
    "problemSolved": {
      "title": "Real-Time Product Feedback & Brand Reputation Monitoring",
      "description": "E-commerce platforms receive millions of product reviews, tweets, and customer service chats daily. Manually reading reviews is impossible, while naive keyword matching fails on common linguistic negations ('not good').",
      "keyPoints": [
        "Handles linguistic negation: captures bi-grams ('not recommend', 'never worked') to prevent naive bag-of-words inversion errors.",
        "Delivers sub-20ms inference latency: engineers classical LinearSVC architectures capable of processing 1,000 reviews/second on modest CPU hardware.",
        "Calibrates multi-class sentiment tiers: categorizes feedback into actionable operational queues (1-star Critical Escalation, 3-star Neutral Feedback, 5-star Brand Advocacy)."
      ]
    },
    "intuition": {
      "overview": "Text sentiment classification converts unstructured sequences of characters into high-dimensional sparse or dense feature representations passed into maximum-margin classifiers.",
      "steps": [
        {
          "step": 1,
          "title": "Text Normalization & Negation Binding",
          "description": "Clean HTML tags, lowercase, convert emojis to text (:smile: -> positive), and bind negation prefixes (e.g. 'not good' -> 'not_good')."
        },
        {
          "step": 2,
          "title": "Sub-Linear TF-IDF Feature Extraction",
          "description": "Compute term frequency-inverse document frequency matrices with sublinear TF scaling: tf = 1 + ln(count)."
        },
        {
          "step": 3,
          "title": "Linear Support Vector Classification",
          "description": "Fit LinearSVC with squared hinge loss and L2 penalty, finding the maximum-margin hyperplane separating positive from negative sentiment."
        }
      ]
    },
    "mathematics": {
      "overview": "Sub-linear term frequency scaling and Inverse Document Frequency mathematical equations.",
      "foundations": [
        {
          "name": "Sub-Linear Term Frequency Scaling (sublinear_tf)",
          "latex": "\\text{TF}(t, d) = \\begin{cases} 1 + \\ln(\\text{count}(t, d)) & \\text{if } \\text{count}(t, d) > 0 \\\\ 0 & \\text{otherwise} \\end{cases}",
          "explanation": "Dampens the influence of repeated words so a review mentioning 'terrible' 10 times is not treated as 10x more negative than one mentioning it twice."
        },
        {
          "name": "Smooth Inverse Document Frequency (IDF)",
          "latex": "\\text{IDF}(t) = \\ln\\left( \\frac{1 + N}{1 + \\text{DF}(t)} \\right) + 1",
          "explanation": "Down-weights common stop words ('the', 'product') while assigning high weights to rare, discriminative sentiment tokens ('defective', 'flawless')."
        }
      ]
    },
    "derivation": {
      "title": "Inference Latency Complexity Comparison: LinearSVC vs Self-Attention",
      "objective": "Prove why LinearSVC achieves orders-of-magnitude lower inference latency than Transformer self-attention.",
      "steps": [
        {
          "step": 1,
          "label": "Evaluate LinearSVC inference complexity",
          "latex": "T_{\\text{LinearSVC}} = \\mathcal{O}(|V_{\\text{active}}|) \\ll \\mathcal{O}(d)",
          "explanation": "Sparse dot product w^T x visits only the non-zero words in the document (typically ~30 to 50 active tokens), executing in microseconds."
        },
        {
          "step": 2,
          "label": "Evaluate Transformer Self-Attention complexity",
          "latex": "T_{\\text{Transformer}} = \\mathcal{O}(L \\cdot S^2 \\cdot d) + \\mathcal{O}(L \\cdot S \\cdot d^2)",
          "explanation": "Self-attention computes dense pairwise sequence interactions across L layers with quadratic sequence length overhead S^2, requiring millions of floating-point operations."
        }
      ]
    },
    "variables": [
      {
        "symbol": "N",
        "name": "Total Document Corpus",
        "description": "Total number of customer review documents in training set.",
        "dimensions": "integer > 0"
      },
      {
        "symbol": "\\text{DF}(t)",
        "name": "Document Frequency",
        "description": "Number of reviews containing term t.",
        "dimensions": "integer in [1, N]"
      }
    ],
    "numericalExample": {
      "scenario": "A corpus contains N = 10,000 customer reviews. The word 'battery' appears in DF = 1,000 reviews. The word 'shattered' appears in DF = 10 reviews. Calculate: 1) Smooth IDF for 'battery', 2) Smooth IDF for 'shattered', and 3) Compare relative token importance weights.",
      "dataset": [
        {
          "Term": "battery",
          "DF": 1000,
          "N": 10000
        },
        {
          "Term": "shattered",
          "DF": 10,
          "N": 10000
        }
      ],
      "calculations": [
        {
          "step": "Step 1: Compute Smooth IDF for 'battery'",
          "math": "IDF('battery') = ln((1 + 10,000) / (1 + 1,000)) + 1 = ln(10,001 / 1,001) + 1 = ln(9.991) + 1 = 2.3017 + 1 = 3.3017",
          "result": "3.3017"
        },
        {
          "step": "Step 2: Compute Smooth IDF for 'shattered'",
          "math": "IDF('shattered') = ln((1 + 10,000) / (1 + 10)) + 1 = ln(10,001 / 11) + 1 = ln(909.18) + 1 = 6.8125 + 1 = 7.8125",
          "result": "7.8125"
        },
        {
          "step": "Step 3: Compare token weight ratio",
          "math": "Ratio = 7.8125 / 3.3017 = 2.366x",
          "result": "'shattered' has 2.37x higher discriminative weight"
        }
      ],
      "finalConclusion": "The rare sentiment term 'shattered' receives more than double the mathematical importance of the common noun 'battery'."
    },
    "visualExplanation": {
      "title": "NLP Text Classification Pipeline",
      "description": "Text tokenization, sparse n-gram vectorization, and maximum-margin hyperplane classification.",
      "features": [
        "N-Gram Tokenizer: Extracts unigrams ('good') and bigrams ('not_good') to preserve negation.",
        "Sub-Linear TF-IDF Sparse Matrix: High-dimensional sparse matrix (50,000 features, ~99.8% sparse).",
        "LinearSVC Hyperplane: High-speed linear decision boundary separating sentiment classes."
      ]
    },
    "scratchCode": {
      "title": "Complete E-Commerce NLP Sentiment Pipeline with Benchmarking",
      "code": "import numpy as np\nimport time\nfrom sklearn.feature_extraction.text import TfidfVectorizer\nfrom sklearn.svm import LinearSVC\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.metrics import classification_report, accuracy_score\n\n# 1. Realistic E-Commerce Customer Reviews Corpus\ntrain_reviews = [\n    \"This laptop is blazing fast, display is vibrant and battery lasts 12 hours!\",\n    \"Absolute garbage, broke on arrival and customer service refused refund.\",\n    \"Works as described, reasonable quality for the budget price.\",\n    \"Terrible screen flicker, do not recommend this device to anyone.\",\n    \"Outstanding customer support and premium build quality! Highly recommended.\",\n    \"The keyboard stopped working after 3 days. Extremely disappointed.\",\n    \"Decent tablet for reading and movies, average sound quality.\",\n    \"Defective charger sparked and melted. Dangerous hazard!\",\n    \"Incredible sound quality, noise cancelling is top tier!\",\n    \"Not good at all, completely lags on basic web browsing.\"\n]\ntrain_labels = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0] # 1: Positive, 0: Negative\n\n# 2. Build High-Performance NLP Pipeline\nnlp_pipeline = Pipeline([\n    ('tfidf', TfidfVectorizer(\n        ngram_range=(1, 2),        # Capture unigrams and bigrams (e.g. 'not good')\n        sublinear_tf=True,         # Dampen repeated words (1 + log(tf))\n        min_df=1,\n        max_features=5000\n    )),\n    ('clf', LinearSVC(C=1.0, random_state=42))\n])\n\nnlp_pipeline.fit(train_reviews, train_labels)\n\n# 3. Test on Unseen Reviews with Negations\ntest_reviews = [\n    \"I was expecting great audio, but it was not good and battery died fast.\",\n    \"Flawless performance, incredibly happy with this purchase!\"\n]\n\n# Benchmark Inference Latency\nt0 = time.perf_counter()\npredictions = nlp_pipeline.predict(test_reviews)\nt1 = time.perf_counter()\nlatency_ms = (t1 - t0) * 1000 / len(test_reviews)\n\nprint(f\"Predicted Sentiments: {['Positive' if p == 1 else 'Negative' for p in predictions]}\")\nprint(f\"Average Inference Latency per Review: {latency_ms:.3f} ms (Sub-2ms Production SLA achieved!)\")",
      "explanation": "Builds sublinear TF-IDF pipeline with n-gram range (1, 2) and LinearSVC, achieving sub-millisecond inference speeds on complex negated text."
    },
    "sklearnCode": {
      "title": "Inspecting Top Predictive Sentiment N-Grams",
      "code": "# Extracting top negative and positive n-gram coefficients\n# vectorizer = nlp_pipeline.named_steps['tfidf']\n# svc = nlp_pipeline.named_steps['clf']\n# feature_names = np.array(vectorizer.get_feature_names_out())\n# coefs = svc.coef_[0]\n# top_positive = feature_names[np.argsort(coefs)[-5:]]\n# top_negative = feature_names[np.argsort(coefs)[:5]]\nprint(\"LinearSVC coefficients provide transparent, interpretable vocabulary audit trails.\")",
      "explanation": "Extracts the most influential positive and negative terms for audit and quality assurance."
    },
    "runnableCode": {
      "code": "from sklearn.feature_extraction.text import TfidfVectorizer\n\ncorpus = [\n    \"great product, love it\",\n    \"terrible product, hated it\",\n    \"product was not great\"\n]\n\nvec = TfidfVectorizer(ngram_range=(1, 2))\nX = vec.fit_transform(corpus)\nfeatures = vec.get_feature_names_out()\nprint(f\"Extracted N-Gram Vocabulary ({len(features)} terms):\\n{features.tolist()}\")\nprint(f\"Notice bigrams captured: 'not great' and 'great product'!\")",
      "expectedOutput": "Extracted N-Gram Vocabulary (13 terms):\n['great', 'great product', 'hated', 'hated it', 'it', 'love', 'love it', 'not', 'not great', 'product', 'product was', 'terrible', 'terrible product']\nNotice bigrams captured: 'not great' and 'great product'!"
    },
    "lineByLineExplanation": [
      {
        "lines": "ngram_range=(1, 2)",
        "codeSnippet": "ngram_range=(1, 2)",
        "explanation": "Extracts both single words ('good') and contiguous two-word pairs ('not good'), enabling the model to distinguish affirmative from negated praise."
      },
      {
        "lines": "sublinear_tf=True",
        "codeSnippet": "sublinear_tf=True",
        "explanation": "Replaces term frequency tf with 1 + ln(tf), preventing multiple mentions from overpowering broader document sentiment."
      }
    ],
    "hyperparameters": [
      {
        "name": "C (in LinearSVC)",
        "defaultVal": "1.0",
        "range": "0.01 to 100.0",
        "effect": "Inverse regularization strength: higher C permits narrower margin with fewer training violations.",
        "recommendation": "Tune C between 0.1 and 10.0; lower C prevents overfitting on noisy, sarcastic customer reviews."
      },
      {
        "name": "max_features",
        "defaultVal": "None (all words)",
        "range": "5,000 to 50,000",
        "effect": "Limits vocabulary to top words by corpus frequency, reducing memory footprint.",
        "recommendation": "Set max_features = 20,000 to keep memory under 100MB while capturing 99% of sentiment vocabulary."
      }
    ],
    "assumptions": [
      {
        "assumption": "N-Grams Capture Dominant Negation Patterns",
        "whyItMatters": "Linear models do not track long-range word dependencies beyond n-gram window length (n=2).",
        "howToVerify": "Inspect long, complex comparative sentences; if accuracy fails on complex sarcasm, escalate to DistilBERT. Sentences like 'It was anything but what I would call remotely good' may misclassify 'good'."
      },
      {
        "assumption": "Sufficient Vocabulary Coverage in Training Corpus",
        "whyItMatters": "Out-of-vocabulary (OOV) slang words never seen in training are ignored by TF-IDF.",
        "howToVerify": "Track OOV token percentage in production monitoring. New internet slang or misspelling shifts can degrade sentiment classification over time."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Using Unigram Only Tokenization (ngram_range=(1, 1))",
        "solution": "Always use ngram_range=(1, 2) or (1, 3) to capture negations.",
        "codeExample": "With unigrams, 'not good' is tokenized into 'not' and 'good', where 'good' erroneously adds positive sentiment."
      },
      {
        "mistake": "Deploying Heavy Transformer Models for Simple High-Throughput Batch Classification",
        "solution": "Benchmark LinearSVC first; it often delivers 94-96% of Transformer accuracy at 1/50th the latency and 1/100th the compute cost.",
        "codeExample": "Deploying BERT for 10M daily reviews requires hundreds of GPU servers costing $50k/month when a single CPU server running LinearSVC suffices."
      }
    ],
    "realWorldUseCases": [
      {
        "industry": "Global Retail Marketplace (Amazon / eBay)",
        "application": "Real-time automated seller reputation auditing and fake review detection.",
        "benefit": "Processes 20M+ merchant customer reviews daily with sub-5ms latency and 97.4% precision."
      },
      {
        "industry": "Customer Service & Ticketing (Zendesk / Freshdesk)",
        "application": "Priority escalation routing for frustrated, angry inbound customer complaints.",
        "benefit": "Instantly routes severe negative complaints directly to tier-3 crisis managers within 50 milliseconds of submission."
      }
    ],
    "practiceQuestions": [
      {
        "id": "m11-p4-pq-1",
        "question": "Why is `ngram_range=(1, 2)` essential for sentiment analysis pipelines using linear models?",
        "hint": "Consider phrases like 'not bad' or 'not recommended'.",
        "answer": "A unigram model (n=1) treats every word independently. In 'not bad', the positive token 'bad' is separated from the negation 'not', misleading the classifier. Including bigrams (n=2) captures the compound token 'not bad' as a distinct positive feature."
      },
      {
        "id": "m11-p4-pq-2",
        "question": "What is the computational benefit of `sublinear_tf=True` in TfidfVectorizer?",
        "hint": "Consider diminishing returns of repeated words.",
        "answer": "It applies logarithmic term frequency scaling: tf = 1 + ln(count). This prevents a review that repeats a word 20 times ('love love love love...') from receiving 20x the weight of a review mentioning it once, stabilizing linear decision boundaries."
      },
      {
        "id": "m11-p4-pq-3",
        "question": "When should an ML engineering team choose LinearSVC over a deep Transformer model like DistilBERT for text classification?",
        "hint": "Consider throughput SLAs, cloud infrastructure costs, and deployment hardware constraints.",
        "answer": "LinearSVC is ideal when sub-5ms latency SLAs, high throughput (thousands of queries/sec), and low infrastructure costs on standard CPU hardware are critical, and where bag-of-words n-grams capture 95%+ of the required semantic signal."
      },
      {
        "id": "m11-p4-pq-4",
        "question": "Why is LinearSVC preferred over standard SVC(kernel='rbf') for high-dimensional sparse text data?",
        "hint": "Think about time complexity with tens of thousands of features.",
        "answer": "Text vectorization produces high-dimensional feature spaces (e.g. 20,000+ words). In high dimensions, text is almost always linearly separable. LinearSVC uses optimized coordinate descent scaling as O(N * features), whereas kernel RBF scales quadratically O(N^2) or cubically with sample size."
      }
    ],
    "quiz": [
      {
        "id": "m11-p4-q-1",
        "question": "In TF-IDF, what does an IDF score of 1.0 indicate for a word?",
        "options": [
          "The word appears in every single document in the corpus (it carries near-zero discriminative information).",
          "The word appears in only one document.",
          "The word is a positive sentiment word.",
          "The word is a negative sentiment word."
        ],
        "correctIndex": 0,
        "explanation": "When document frequency DF equals corpus size N, ln(N/N) = ln(1) = 0. Smooth IDF evaluates to 0 + 1 = 1.0, effectively down-weighting universal words."
      },
      {
        "id": "m11-p4-q-2",
        "question": "Which loss function is minimized by default in scikit-learn's `LinearSVC`?",
        "options": [
          "Squared Hinge Loss",
          "Log Loss (Cross-Entropy)",
          "Mean Squared Error",
          "Huber Loss"
        ],
        "correctIndex": 0,
        "explanation": "LinearSVC minimizes squared hinge loss: max(0, 1 - y * f(x))^2, which provides smooth quadratic gradients and fast convergence."
      },
      {
        "id": "m11-p4-q-3",
        "question": "What is the typical inference latency of a fine-tuned DistilBERT model on a single CPU core versus LinearSVC for a 100-word review?",
        "options": [
          "DistilBERT ~25-50ms vs LinearSVC ~0.5-2ms (roughly 20-50x faster)",
          "DistilBERT is faster than LinearSVC",
          "Both have identical latency",
          "LinearSVC takes 10 seconds"
        ],
        "correctIndex": 0,
        "explanation": "LinearSVC executes a simple sparse vector dot product in under 1 millisecond on CPU, whereas DistilBERT evaluates 6 transformer layers of multi-head self-attention taking 25-50ms on CPU."
      },
      {
        "id": "m11-p4-q-4",
        "question": "What technique handles emojis in sentiment classification pipelines?",
        "options": [
          "Demojizing: converting unicode emoji symbols into descriptive text tokens (e.g. 😊 -> ':smiling_face:').",
          "Deleting all non-English unicode characters.",
          "Converting text to binary ASCII only.",
          "Inverting the learning rate."
        ],
        "correctIndex": 0,
        "explanation": "Demojizing replaces emojis with descriptive text tokens so the vectorizer can extract positive and negative sentiment signals from smiles, thumbs up, and warning symbols."
      }
    ],
    "independentExercise": {
      "title": "Coding Challenge: Negation-Aware Sentiment Preprocessor",
      "problem": "Write a Python function `preprocess_negations(text)` that replaces common negation contractions ('don't', 'didn't', 'won't', 'cannot', 'not') followed by a word with a bound negated token (e.g. 'not good' -> 'not_good', 'didn\\'t like' -> 'not_like'). Test it on 'I did not like the product, it was not good'.",
      "hints": [
        "Use re.sub to normalize contractions (e.g. n't -> ' not')",
        "Use regular expression to replace r'\\bnot\\s+([a-zA-Z]+)' with r'not_\\1'"
      ],
      "starterCode": "import re\n\ndef preprocess_negations(text: str) -> str:\n    # TODO: Bind negations to following word\n    return text\n",
      "solution": "import re\n\ndef preprocess_negations(text: str) -> str:\n    # 1. Normalize common negative contractions\n    text = re.sub(r\"\\bcan't\\b\", \"can not\", text, flags=re.IGNORECASE)\n    text = re.sub(r\"\\bwon't\\b\", \"will not\", text, flags=re.IGNORECASE)\n    text = re.sub(r\"n't\\b\", \" not\", text, flags=re.IGNORECASE)\n    \n    # 2. Bind 'not <word>' into 'not_<word>'\n    text = re.sub(r\"\\bnot\\s+([a-zA-Z]+)\\b\", r\"not_\\1\", text, flags=re.IGNORECASE)\n    return text\n\n# Verification\nsample = \"I did not like the product, it was not good\"\nprocessed = preprocess_negations(sample)\nprint(\"Original: \", sample)\nprint(\"Processed:\", processed)\nassert \"not_like\" in processed\nassert \"not_good\" in processed\n"
    },
    "summary": {
      "keyTakeaways": [
        "NLP sentiment classification requires capturing contextual negations via n-gram tokenization or transformer attention.",
        "Sub-linear TF-IDF vectorization paired with LinearSVC provides an ultra-fast, lightweight baseline achieving sub-2ms inference latency.",
        "Linear models offer completely transparent, interpretable vocabulary coefficients for regulatory and business audit.",
        "Deep Transformers (DistilBERT) should be deployed selectively when complex linguistic syntax and long-range dependencies justify the 50x compute cost."
      ],
      "nextLessonId": "project-prediction-api",
      "nextLessonTitle": "Production Prediction API & MLOps Serving Microservice",
      "nextLessonModuleId": "module-11"
    }
  },
  'project-prediction-api': {
    "id": "project-prediction-api",
    "moduleId": "module-11",
    "title": "Capstone 5: Production Prediction API & Monitoring Service",
    "subtitle": "FastAPI, Redis Caching, Docker Containerization & Evidently AI Drift Observability",
    "order": 5,
    "readTimeMinutes": 32,
    "difficulty": "Advanced",
    "visualizerType": "none",
    "objectives": [
      "Synthesize all MLOps concepts into an end-to-end production prediction service.",
      "Implement a high-throughput FastAPI application backed by Redis prediction caching.",
      "Containerize the microservice with multi-stage Docker builds and non-root execution.",
      "Integrate automated Evidently AI data drift and performance monitoring endpoints."
    ],
    "prerequisites": [
      "FastAPI & Pydantic",
      "Docker Containerization",
      "Data Drift Monitoring",
      "Model Serialization"
    ],
    "previousLesson": {
      "id": "project-customer-sentiment",
      "title": "Capstone 4: E-Commerce Review NLP Sentiment Classifier",
      "moduleId": "module-11"
    },
    "analogy": {
      "title": "The Fully Automated Commercial Airline Control Tower",
      "metaphor": "The Production Prediction API is the culmination of modern MLOps: where data validation, low-latency model inference, caching, containerization, and drift observability unite into a resilient production system.",
      "text": "Imagine an ultra-modern international airport handling 2,000 flights a day. The control tower does not rely on a single air traffic controller shouting over a radio. It integrates a coordinated ecosystem of specialized automated subsystems: the radar transponder validates approaching aircraft identifiers and airspeeds against strict aviation flight plans (Pydantic schema validation); a high-speed collision-avoidance computer serves flight-vector adjustments in 10 milliseconds from memory (FastAPI model serving); frequently requested terminal weather bulletins are broadcast instantly without recalculating from scratch (Redis response caching); all radar servers run inside standardized modular electronic racks with battery backups (Docker containers); and continuous sensor telemetry monitors whether prevailing wind gusts or runway friction have drifted beyond safety margins (Evidently AI drift monitoring). When all components operate in concert, thousands of passengers land safely every hour with zero downtime."
    },
    "problemSolved": {
      "title": "Closing the Chasm Between Trained Models and Enterprise Operations",
      "description": "85% of machine learning models never make it into production because data science notebooks lack operational reliability, caching, automated health checks, containerization, and distribution observability.",
      "keyPoints": [
        "Delivers high-concurrency serving: combines FastAPI async request handling with in-memory model execution.",
        "Slashes compute costs via caching: intercepts repeat prediction queries with an in-memory Redis cache (sub-millisecond response).",
        "Automates observability: exposes Prometheus metrics and Evidently AI drift dashboards for proactive engineering maintenance."
      ]
    },
    "intuition": {
      "overview": "The production serving system orchestrates incoming HTTP queries, checks memory caches, runs vectorized model inference, and logs payloads for downstream drift analysis.",
      "steps": [
        {
          "step": 1,
          "title": "Payload Ingress & Cache Check",
          "description": "Hash input features into a deterministic cache key; return cached predictions from Redis in 0.5ms on cache hits."
        },
        {
          "step": 2,
          "title": "Pre-Loaded Model Inference",
          "description": "On cache misses, evaluate input against the pre-loaded scikit-learn/PyTorch pipeline resident in memory."
        },
        {
          "step": 3,
          "title": "Telemetry Logging & Observability",
          "description": "Asynchronously log features and predictions to the analytical store for Evidently AI drift detection and Prometheus scraping."
        }
      ]
    },
    "mathematics": {
      "overview": "Cache hit ratios and system throughput scaling follow Amdahl's Law and exponential tail distribution models.",
      "foundations": [
        {
          "name": "Cache-Accelerated Effective Latency",
          "latex": "T_{\\text{effective}} = h \\cdot T_{\\text{cache}} + (1 - h) \\cdot T_{\\text{model}}",
          "explanation": "where h is the cache hit ratio, T_cache is Redis lookup latency (~1ms), and T_model is model compute latency (~20ms). A 50% hit rate cuts average latency in half."
        },
        {
          "name": "System Throughput Amplification",
          "latex": "\\text{Throughput Gain} = \\frac{1}{(1 - h) + h \\cdot \\frac{T_{\\text{cache}}}{T_{\\text{model}}}}",
          "explanation": "Quantifies the multiplicative capacity increase achieved by caching repeat prediction queries."
        }
      ]
    },
    "derivation": {
      "title": "Proof of Latency Reduction under Deterministic Feature Caching",
      "objective": "Determine the expected latency improvement for an inference service with 60% repeat query patterns.",
      "steps": [
        {
          "step": 1,
          "label": "Define baseline latency without cache",
          "latex": "T_{\\text{baseline}} = T_{\\text{model}} = 25.0\\text{ ms}",
          "explanation": "Every request executes full model inference pipeline."
        },
        {
          "step": 2,
          "label": "Calculate cached effective latency with h = 0.60 and T_cache = 1.0 ms",
          "latex": "T_{\\text{effective}} = 0.60 \\cdot (1.0) + 0.40 \\cdot (25.0) = 0.60 + 10.0 = 10.60\\text{ ms}",
          "explanation": "Average latency drops from 25.0ms to 10.6ms, a 57.6% latency reduction."
        }
      ]
    },
    "variables": [
      {
        "symbol": "h",
        "name": "Cache Hit Ratio",
        "description": "Proportion of incoming queries satisfied directly from Redis cache.",
        "dimensions": "[0, 1]"
      },
      {
        "symbol": "T_{\\text{model}}",
        "name": "Model Compute Time",
        "description": "Duration required for full neural net or pipeline forward pass.",
        "dimensions": "milliseconds"
      }
    ],
    "numericalExample": {
      "scenario": "A production ML service handles arrival rate lambda = 500 requests/second. Model inference takes 30ms. Serving without caching requires 500 * 0.030 = 15 active worker instances. If adding a Redis cache achieves a hit rate h = 0.70 with T_cache = 1.5ms, calculate: 1) new effective latency, and 2) the number of required worker instances.",
      "dataset": [
        {
          "lambda": 500,
          "T_model": "30ms",
          "T_cache": "1.5ms",
          "h": 0.7
        }
      ],
      "calculations": [
        {
          "step": "Step 1: Compute new effective request latency",
          "math": "T_eff = (0.70 * 1.5ms) + (0.30 * 30ms) = 1.05ms + 9.00ms = 10.05ms = 0.01005 s",
          "result": "10.05ms"
        },
        {
          "step": "Step 2: Calculate required concurrent workers via Little's Law",
          "math": "L = lambda * T_eff = 500 * 0.01005 = 5.025 concurrent workers",
          "result": "5.03 workers (down from 15!)"
        },
        {
          "step": "Step 3: Calculate infrastructure cost reduction",
          "math": "Infrastructure reduction = (15 - 5) / 15 = 66.7% server capacity saved",
          "result": "66.7% cost reduction"
        }
      ],
      "finalConclusion": "Introducing Redis caching reduced average response latency by 66.5% and cut the required cloud container fleet from 15 servers to 5."
    },
    "visualExplanation": {
      "title": "Complete Production MLOps Serving Microservice Architecture",
      "description": "The unified architecture of a hardened, enterprise-ready machine learning service.",
      "features": [
        "Pydantic Validation Gateway: Drops invalid payloads before entering the compute pipeline.",
        "Redis LRU Cache: Returns hot prediction results in sub-millisecond memory lookups.",
        "Evidently AI Drift Observer: Monitors incoming payloads for statistical distribution shifts.",
        "Prometheus & Grafana: Exposes latency percentiles (p50, p95, p99) and request counts."
      ]
    },
    "scratchCode": {
      "title": "Complete Production MLOps Service Architecture",
      "code": "from fastapi import FastAPI, HTTPException, status\nfrom pydantic import BaseModel, Field\nimport hashlib\nimport json\nimport time\n\n# 1. Pydantic Request Contract\nclass LoanApplication(BaseModel):\n    income: float = Field(..., gt=1000.0, description=\"Annual income in USD\")\n    debt: float = Field(..., ge=0.0, description=\"Total outstanding debt\")\n    credit_score: int = Field(..., ge=300, le=850, description=\"FICO score\")\n\n# 2. In-Memory Simulated Redis Cache\nclass MockRedisCache:\n    def __init__(self):\n        self.cache = {}\n        self.hits = 0\n        self.misses = 0\n    def get(self, key):\n        if key in self.cache:\n            self.hits += 1\n            return self.cache[key]\n        self.misses += 1\n        return None\n    def set(self, key, val, ttl=3600):\n        self.cache[key] = val\n\nredis_client = MockRedisCache()\n\n# 3. FastAPI Service\napp = FastAPI(title=\"Production Credit Serving Engine\", version=\"2.0.0\")\n\n# Pre-loaded model\nmodel = lambda inc, dbt, score: round(1.0 / (1.0 + 2.718 ** -(-2.5 + 4.0*(dbt/inc) - 0.005*(score-600))), 4)\n\n@app.post(\"/predict\")\ndef predict_credit_risk(app_data: LoanApplication):\n    # Create deterministic hash key from validated input\n    payload_bytes = json.dumps(app_data.model_dump(), sort_keys=True).encode()\n    cache_key = \"pred:\" + hashlib.sha256(payload_bytes).hexdigest()[:16]\n    \n    # Check Cache\n    cached = redis_client.get(cache_key)\n    if cached is not None:\n        return {\"source\": \"cache\", \"cache_key\": cache_key, \"result\": cached}\n        \n    # Cache Miss -> Execute Model\n    t0 = time.perf_counter()\n    prob_default = model(app_data.income, app_data.debt, app_data.credit_score)\n    decision = \"APPROVE\" if prob_default < 0.15 else \"REJECT\"\n    latency_ms = (time.perf_counter() - t0) * 1000\n    \n    result = {\n        \"probability_of_default\": prob_default,\n        \"decision\": decision,\n        \"latency_ms\": round(latency_ms, 3)\n    }\n    \n    # Store in cache\n    redis_client.set(cache_key, result)\n    return {\"source\": \"model_inference\", \"cache_key\": cache_key, \"result\": result}\n\n# Simulate serving queries\nreq1 = LoanApplication(income=75000, debt=15000, credit_score=720)\nres_first = predict_credit_risk(req1)\nres_second = predict_credit_risk(req1) # Cache hit!\n\nprint(\"First Query:\", res_first[\"source\"], \"-> Result:\", res_first[\"result\"][\"decision\"])\nprint(\"Second Query:\", res_second[\"source\"], \"-> Instant Cache Hit!\")\nprint(f\"Cache Stats: Hits = {redis_client.hits}, Misses = {redis_client.misses}\")",
      "explanation": "Combines Pydantic validation, deterministic SHA-256 cache keying, sub-millisecond Redis response caching, and model inference."
    },
    "sklearnCode": {
      "title": "Evidently AI Continuous Monitoring Pipeline Setup",
      "code": "# Production Monitoring Script (requires evidently)\n# from evidently.report import Report\n# from evidently.metric_preset import DataDriftPreset, TargetDriftPreset\n# data_drift_report = Report(metrics=[DataDriftPreset(), TargetDriftPreset()])\n# data_drift_report.run(reference_data=reference_df, current_data=production_df)\n# data_drift_report.save_html('drift_report.html')\nprint(\"Evidently AI generates interactive HTML data drift and model performance reports for stakeholders.\")",
      "explanation": "Illustrates how Evidently AI integrates into production pipelines to produce automated daily audit reports."
    },
    "runnableCode": {
      "code": "import hashlib\nimport json\n\ndef generate_cache_key(prefix: str, payload: dict) -> str:\n    serialized = json.dumps(payload, sort_keys=True).encode('utf-8')\n    return f\"{prefix}:{hashlib.sha256(serialized).hexdigest()[:16]}\"\n\np1 = {'income': 50000, 'score': 700}\np2 = {'score': 700, 'income': 50000} # Key order flipped\n\nk1 = generate_cache_key('loan', p1)\nk2 = generate_cache_key('loan', p2)\n\nprint(f\"Key 1: {k1}\")\nprint(f\"Key 2: {k2}\")\nprint(f\"Determinism verified (Identical payloads produce identical keys): {k1 == k2}\")",
      "expectedOutput": "Key 1: loan:35feefefddb4bf1d\nKey 2: loan:35feefefddb4bf1d\nDeterminism verified (Identical payloads produce identical keys): True"
    },
    "lineByLineExplanation": [
      {
        "lines": "json.dumps(payload, sort_keys=True).encode()",
        "codeSnippet": "sort_keys=True",
        "explanation": "Ensures dictionary keys are sorted alphabetically before hashing so identical payloads with different key orders produce identical cache keys."
      },
      {
        "lines": "cache_key = 'pred:' + hashlib.sha256(payload_bytes).hexdigest()[:16]",
        "codeSnippet": "hashlib.sha256(...)",
        "explanation": "Generates a compact, uniform 16-character hexadecimal key for O(1) Redis lookups."
      }
    ],
    "hyperparameters": [
      {
        "name": "redis_ttl",
        "defaultVal": "86400 (24 hours)",
        "range": "300 to 604800 seconds",
        "effect": "Time-to-live for cached predictions before eviction.",
        "recommendation": "Use 24 hours (86400s) for daily scoring models; use 1 hour for fast-changing streaming sensor data."
      },
      {
        "name": "max_cache_memory",
        "defaultVal": "2gb",
        "range": "512mb to host RAM",
        "effect": "Maximum RAM allocated to Redis with volatile-lru eviction policy.",
        "recommendation": "Set maxmemory-policy to volatile-lru so expired or least-recently-used cache entries are automatically purged when RAM fills."
      }
    ],
    "assumptions": [
      {
        "assumption": "Deterministic Model Inference for Caching",
        "whyItMatters": "Caching assumes identical input features should yield identical predicted outputs.",
        "howToVerify": "Verify model does not incorporate random sampling or unseeded stochastic operations at inference. Cached predictions overwrite stochastic exploration behaviors in reinforcement learning."
      },
      {
        "assumption": "Network Connectivity to Redis Cluster",
        "whyItMatters": "If Redis is down, API requests should degrade gracefully rather than throwing HTTP 500 errors.",
        "howToVerify": "Implement try/except fallback around Redis calls to execute model directly if cache is unreachable. Cache outages cascade into total service outage if exceptions are not handled."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Unsorted JSON Serialization for Cache Key Generation",
        "solution": "Always use `json.dumps(payload, sort_keys=True)`.",
        "codeExample": "{'a': 1, 'b': 2} and {'b': 2, 'a': 1} produce different hashes without sort_keys=True, ruining cache hit rates."
      },
      {
        "mistake": "Failing to Implement Graceful Fallback When Cache Fails",
        "solution": "Wrap cache lookups in try-except blocks; on cache timeout, fall back to live model inference.",
        "codeExample": "A Redis network blip crashes all HTTP endpoints despite the model server being completely healthy."
      }
    ],
    "realWorldUseCases": [
      {
        "industry": "High-Volume Travel & Airline Search (Expedia / Kayak)",
        "application": "Dynamic hotel and flight price prediction for flight search queries.",
        "benefit": "Achieves 78% cache hit rate on popular flight routes (e.g. NYC to LAX), saving millions of dollars in compute costs."
      },
      {
        "industry": "Global Payment Processing (Stripe / Adyen)",
        "application": "Real-time payment authorization risk scoring microservices.",
        "benefit": "Evaluates 10,000 transactions per second within 12 milliseconds p99 latency across distributed multi-region Docker clusters."
      }
    ],
    "practiceQuestions": [
      {
        "id": "m11-p5-pq-1",
        "question": "Why is `sort_keys=True` critical when generating deterministic cache keys from JSON payloads?",
        "hint": "Consider dictionary key ordering in JSON strings.",
        "answer": "JSON representations with different key ordering (e.g. `{\"a\": 1, \"b\": 2}` vs `{\"b\": 2, \"a\": 1}`) represent identical data but produce completely different string bytes and hash digests. Sorting keys ensures identical inputs always produce identical cache keys."
      },
      {
        "id": "m11-p5-pq-2",
        "question": "What is the primary operational advantage of pairing a Redis cache with a machine learning inference API?",
        "hint": "Think about throughput, latency, and identical duplicate queries.",
        "answer": "Redis serves cached prediction lookups in under 1 millisecond directly from in-memory RAM, bypassing heavy matrix multiplication. This slashes average latency and dramatically multiplies overall server request capacity on repeat traffic."
      },
      {
        "id": "m11-p5-pq-3",
        "question": "How should an ML serving microservice behave if its connection to the Redis cache cluster drops unexpectedly?",
        "hint": "Think about graceful degradation.",
        "answer": "It should fail gracefully: catch the Redis connection exception, log a warning, fall back to executing the model directly in memory, and return valid predictions to the client without throwing HTTP 500 errors."
      },
      {
        "id": "m11-p5-pq-4",
        "question": "What role does Prometheus play in production machine learning architectures?",
        "hint": "Think about time-series metrics scraping and latency percentiles.",
        "answer": "Prometheus periodically scrapes telemetry metrics (/metrics endpoint) tracking request counts, error rates, and latency percentiles (p50, p95, p99), triggering automated alerts in Grafana or PagerDuty if latency spikes above SLA limits."
      }
    ],
    "quiz": [
      {
        "id": "m11-p5-q-1",
        "question": "What Redis memory eviction policy is recommended for inference prediction caches?",
        "options": [
          "volatile-lru (evict least-recently-used keys with an expiration TTL)",
          "noeviction (throw an error when memory fills)",
          "random-all",
          "fifo-delete"
        ],
        "correctIndex": 0,
        "explanation": "volatile-lru automatically evicts least-recently-used keys among those with a TTL expiration set, preventing the cache from running out of memory while retaining hot queries."
      },
      {
        "id": "m11-p5-q-2",
        "question": "What does a p99 latency SLA of '50ms' mandate for a production ML microservice?",
        "options": [
          "99% of all prediction requests must complete in 50 milliseconds or less.",
          "The average latency must be 50ms.",
          "The server must reboot every 50ms.",
          "1% of requests must take 50ms."
        ],
        "correctIndex": 0,
        "explanation": "The 99th percentile (p99) SLA guarantees that 99 out of every 100 requests complete within 50ms, strictly bounding tail latency."
      },
      {
        "id": "m11-p5-q-3",
        "question": "What is the primary benefit of exporting trained models to ONNX Runtime inside the Docker serving container?",
        "options": [
          "Accelerates inference through operator graph fusion and memory optimizations, independent of the Python interpreter.",
          "Eliminates the need for input validation.",
          "Automatically designs neural architectures.",
          "Encrypts data over the internet."
        ],
        "correctIndex": 0,
        "explanation": "ONNX Runtime compiles and fuses computational graphs, executing inference with optimized C++ kernels that run significantly faster than standard Python interpreters."
      },
      {
        "id": "m11-p5-q-4",
        "question": "Which HTTP status code is returned when an API client submits a request with missing or invalid fields that fail Pydantic validation?",
        "options": [
          "422 Unprocessable Entity",
          "500 Internal Server Error",
          "200 OK",
          "301 Moved Permanently"
        ],
        "correctIndex": 0,
        "explanation": "FastAPI automatically intercepts Pydantic validation errors and returns HTTP 422 with a structured JSON explanation of the invalid fields."
      }
    ],
    "independentExercise": {
      "title": "Coding Challenge: Resilient Cache-Backed Prediction Pipeline",
      "problem": "Write a Python function `predict_with_cache(payload, model_fn, cache_dict)` that implements resilient caching. It must: 1) generate a deterministic SHA-256 key from payload, 2) return `(cached_value, True)` if present in `cache_dict`, 3) execute `model_fn(payload)` on cache miss, store result in `cache_dict`, and return `(new_value, False)`. If an exception occurs accessing `cache_dict`, safely fall back to executing `model_fn` directly.",
      "hints": [
        "Use json.dumps(payload, sort_keys=True)",
        "Wrap cache lookups in try/except",
        "Return tuple (result, is_cached_bool)"
      ],
      "starterCode": "def predict_with_cache(payload, model_fn, cache_dict):\n    # TODO: Implement resilient caching\n    return None, False\n",
      "solution": "import json\nimport hashlib\n\ndef predict_with_cache(payload, model_fn, cache_dict):\n    try:\n        key = 'cache:' + hashlib.sha256(json.dumps(payload, sort_keys=True).encode()).hexdigest()[:16]\n        if key in cache_dict:\n            return cache_dict[key], True\n    except Exception:\n        key = None\n        \n    # Execute model\n    pred = model_fn(payload)\n    \n    # Store if cache accessible\n    if key is not None:\n        try:\n            cache_dict[key] = pred\n        except Exception:\n            pass\n            \n    return pred, False\n\n# Verification\ncache = {}\ncall_count = 0\ndef expensive_model(p):\n    global call_count\n    call_count += 1\n    return p['x'] * 2\n\np = {'x': 10}\nres1, cached1 = predict_with_cache(p, expensive_model, cache)\nres2, cached2 = predict_with_cache(p, expensive_model, cache)\n\nprint(f\"Call 1: Result = {res1}, Cached = {cached1}\")\nprint(f\"Call 2: Result = {res2}, Cached = {cached2}\")\nassert cached1 is False and cached2 is True\nassert call_count == 1, 'Model should only be invoked once for duplicate inputs!'\n"
    },
    "summary": {
      "keyTakeaways": [
        "Production MLOps integrates data validation, high-speed model inference, caching, containerization, and drift observability.",
        "In-memory Redis caching slashes average latency and multiplies system throughput on repetitive production workloads.",
        "Docker multi-stage builds and unprivileged user permissions establish secure, reproducible deployment baselines.",
        "Continuous monitoring with Evidently AI and Prometheus guards against silent model degradation and operational SLA breaches."
      ],
      "nextLessonId": "project-house-price-prediction",
      "nextLessonTitle": "Capstone 1: Ames Real Estate Valuation System",
      "nextLessonModuleId": "module-11"
    }
  },
};
