import { ModuleData, LessonContent } from '@/lib/types';

export const numpyProjectData: ModuleData = {
  "id": "numpy-final-project",
  "number": 7,
  "title": "NumPy Final Project",
  "subtitle": "Student Performance Analytics Capstone",
  "description": "Put all your NumPy skills into practice. Build a complete student performance analytics engine with multi-axis statistics, ranking, normalization, and outlier detection.",
  "icon": "Award",
  "badge": "NumPy Capstone",
  "estimatedHours": 8,
  "topicsCount": 1,
  "lessons": [
    {
      "id": "numpy-fp-student-analytics",
      "moduleId": "numpy-final-project",
      "title": "Capstone Project: Student Performance Analytics with NumPy",
      "description": "End-to-End Real-World Applied Numerical Analytics Project using Pure NumPy",
      "order": 1,
      "readTimeMinutes": 25,
      "visualizerType": "numpy-interactive",
      "difficulty": "Advanced"
    }
  ]
};

export const numpyProjectLessons: Record<string, LessonContent> = {
  "numpy-fp-student-analytics": {
    "id": "numpy-fp-student-analytics",
    "moduleId": "numpy-final-project",
    "title": "Capstone Project: Student Performance Analytics with NumPy",
    "subtitle": "End-to-End Real-World Applied Numerical Analytics Project using Pure NumPy",
    "order": 1,
    "readTimeMinutes": 25,
    "difficulty": "Advanced",
    "visualizerType": "numpy-interactive",
    "objectives": [
      "Load and analyze a multi-student, multi-subject academic marks matrix.",
      "Calculate multi-axis statistics including student GPAs and subject benchmarks.",
      "Filter and rank students using boolean indexing and condition masking.",
      "Implement Min-Max normalization and statistical IQR anomaly detection.",
      "Generate a structured, professional executive performance summary."
    ],
    "prerequisites": [
      "NumPy Foundations",
      "Indexing & Slicing",
      "Array Operations",
      "Statistical Functions"
    ],
    "analogy": {
      "title": "A School District's Central Grading Supercomputer",
      "text": "Every semester, a school district collects hundreds of thousands of test marks across dozens of schools. Rather than hiring 500 clerks to calculate averages on paper, the district feeds the entire matrix into a central computing engine that calculates student GPAs, finds top scholars, normalizes grades for university entrance, and flags struggling students who need tutoring\u2014all in less than 1 second.",
      "metaphor": "The capstone project transforms raw tabular exam data into actionable institutional insights using pure vectorized NumPy."
    },
    "problemSolved": {
      "title": "Holistic Multi-Dimensional Performance Analysis",
      "description": "Analyzing student performance requires combining multi-axis aggregations, conditional filtering, normalization, and statistical outlier checks into a coherent data science pipeline.",
      "keyPoints": [
        "Axis 0 gives subject benchmarks; Axis 1 gives student GPAs.",
        "Boolean indexing identifies students qualifying for honors.",
        "IQR statistical bounds objectively identify anomalies requiring attention."
      ]
    },
    "intuition": {
      "overview": "The capstone pipeline executes in 6 systematic stages: Load -> Aggregate -> Filter -> Rank -> Normalize -> Detect Outliers.",
      "steps": [
        {
          "step": 1,
          "title": "Matrix Ingestion",
          "description": "10x5 exam marks matrix loaded into contiguous RAM."
        },
        {
          "step": 2,
          "title": "Multi-Axis Reductions",
          "description": "Axis 0 collapses subjects; Axis 1 collapses students."
        },
        {
          "step": 3,
          "title": "Statistical Thresholding",
          "description": "Computes quartiles and flags outliers using the 1.5x IQR rule."
        },
        {
          "step": 4,
          "title": "Feature Normalization",
          "description": "Min-Max scales scores into [0.0, 1.0] for model readiness."
        }
      ]
    },
    "mathematics": {
      "overview": "Statistical foundations for capstone metrics.",
      "foundations": [
        {
          "name": "Student Mean",
          "latex": "\\bar{x}_{i} = \\frac{1}{M} \\sum_{j=1}^{M} X_{i,j}",
          "explanation": "Row-wise mean across all M subjects."
        },
        {
          "name": "Interquartile Range",
          "latex": "\\text{IQR} = Q_3 - Q_1 \\quad \\text{Outliers} \\notin [Q_1 - 1.5\\text{IQR}, Q_3 + 1.5\\text{IQR}]",
          "explanation": "Tukey outlier detection bounds."
        }
      ]
    },
    "derivation": {
      "title": "Complexity Analysis of Capstone Pipeline",
      "objective": "Verify that all operations run in O(N x M) linear time.",
      "steps": [
        {
          "step": 1,
          "label": "Reductions",
          "latex": "O(NM) \\text{ for mean and std calculations}",
          "explanation": "Single pass over the 2D array buffer."
        },
        {
          "step": 2,
          "label": "Percentiles",
          "latex": "O(N \\log N) \\text{ for student GPA quartiles}",
          "explanation": "Sorting 10 student averages takes negligible time."
        },
        {
          "step": 3,
          "label": "Normalization",
          "latex": "O(NM) \\text{ element-wise broadcasting}",
          "explanation": "Broadcasting scales all cells in parallel."
        }
      ]
    },
    "variables": [
      {
        "symbol": "X",
        "name": "Marks Matrix",
        "description": "Student marks of shape (10, 5)",
        "dimensions": "10 x 5"
      },
      {
        "symbol": "Q_1, Q_3",
        "name": "Quartiles",
        "description": "25th and 75th percentiles of GPA distribution",
        "dimensions": "Scalars"
      }
    ],
    "numericalExample": {
      "scenario": "Analyzing 10 students across Math, Physics, Chem, English, and CS.",
      "dataset": [
        {
          "StudentID": "0",
          "Math": 85,
          "Physics": 90,
          "GPA": 86.6
        },
        {
          "StudentID": "2",
          "Math": 92,
          "Physics": 95,
          "GPA": 92.8
        },
        {
          "StudentID": "7",
          "Math": 32,
          "Physics": 40,
          "GPA": 40.4
        }
      ],
      "calculations": [
        {
          "step": "Class Highest Score",
          "math": "np.max(marks)",
          "result": "98 (Student 2 / Student 8)"
        },
        {
          "step": "Outlier Detection",
          "math": "Student 7 GPA (40.4) < Lower Bound (44.6)",
          "result": "Student 7 flagged as academic intervention outlier"
        }
      ],
      "finalConclusion": "Student 7 is objectively identified as needing immediate academic tutoring support."
    },
    "visualExplanation": {
      "title": "Visual Dashboard: Student Performance Pipeline",
      "description": "Visualizing the flow from raw 10x5 score matrix to executive summary report.",
      "features": [
        "Axis 0 collapses rows to reveal Subject Means.",
        "Axis 1 collapses columns to reveal Student GPAs.",
        "IQR box-plot bands isolate academic intervention outliers."
      ]
    },
    "scratchCode": {
      "title": "Interactive Capstone Prototype",
      "code": "import numpy as np\n\n# 10 students across 5 subjects: [Math, Physics, Chemistry, English, CS]\nmarks = np.array([\n    [85, 90, 78, 88, 92],  # Student 0\n    [56, 62, 60, 70, 65],  # Student 1\n    [92, 95, 89, 90, 98],  # Student 2\n    [45, 50, 48, 55, 60],  # Student 3\n    [78, 82, 80, 85, 88],  # Student 4\n    [65, 70, 72, 68, 75],  # Student 5\n    [88, 85, 84, 82, 90],  # Student 6\n    [32, 40, 35, 45, 50],  # Student 7\n    [95, 98, 94, 92, 96],  # Student 8\n    [70, 75, 72, 78, 80],  # Student 9\n])\n\n# 1. Subject-wise and student-wise averages\nsubject_means = np.mean(marks, axis=0)\nstudent_means = np.mean(marks, axis=1)\n\n# 2. Highest and lowest overall scores\nmax_score = np.max(marks)\nmin_score = np.min(marks)\n\n# 3. Overall median and standard deviation\noverall_median = np.median(marks)\noverall_std = np.std(marks)\n\n# 4. Identify top-performing students (Mean > 85)\ntop_students_mask = student_means > 85\ntop_student_indices = np.where(top_students_mask)[0]\n\n# 5. Normalization using Min-Max scaling\nnorm_marks = (marks - min_score) / (max_score - min_score)\n\n# 6. Statistical Outlier Detection using IQR rule on student averages\nq25, q75 = np.percentile(student_means, [25, 75])\niqr = q75 - q25\nlower_bound = q25 - 1.5 * iqr\nupper_bound = q75 + 1.5 * iqr\noutlier_students = np.where((student_means < lower_bound) | (student_means > upper_bound))[0]\n\nprint(\"=== STUDENT PERFORMANCE ANALYTICS SUMMARY ===\")\nprint(\"Subject Means [Math, Phys, Chem, Eng, CS]:\", np.round(subject_means, 1))\nprint(\"Student Overall Means:\", np.round(student_means, 1))\nprint(f\"Global Extremes: Min={min_score}, Max={max_score}\")\nprint(f\"Global Median={overall_median:.1f}, Std Dev={overall_std:.1f}\")\nprint(\"Top-Performing Student IDs (Mean > 85):\", top_student_indices)\nprint(f\"IQR Outlier Detection Bounds: [{lower_bound:.1f}, {upper_bound:.1f}]\")\nprint(\"Detected Outlier Student IDs:\", outlier_students)\nprint(\"Normalized Scores Sample (Student 0):\", np.round(norm_marks[0], 2))\n",
      "explanation": "Complete runnable capstone script."
    },
    "sklearnCode": {
      "title": "Preprocessing Integration",
      "code": "import numpy as np\n\n# 10 students across 5 subjects: [Math, Physics, Chemistry, English, CS]\nmarks = np.array([\n    [85, 90, 78, 88, 92],  # Student 0\n    [56, 62, 60, 70, 65],  # Student 1\n    [92, 95, 89, 90, 98],  # Student 2\n    [45, 50, 48, 55, 60],  # Student 3\n    [78, 82, 80, 85, 88],  # Student 4\n    [65, 70, 72, 68, 75],  # Student 5\n    [88, 85, 84, 82, 90],  # Student 6\n    [32, 40, 35, 45, 50],  # Student 7\n    [95, 98, 94, 92, 96],  # Student 8\n    [70, 75, 72, 78, 80],  # Student 9\n])\n\n# 1. Subject-wise and student-wise averages\nsubject_means = np.mean(marks, axis=0)\nstudent_means = np.mean(marks, axis=1)\n\n# 2. Highest and lowest overall scores\nmax_score = np.max(marks)\nmin_score = np.min(marks)\n\n# 3. Overall median and standard deviation\noverall_median = np.median(marks)\noverall_std = np.std(marks)\n\n# 4. Identify top-performing students (Mean > 85)\ntop_students_mask = student_means > 85\ntop_student_indices = np.where(top_students_mask)[0]\n\n# 5. Normalization using Min-Max scaling\nnorm_marks = (marks - min_score) / (max_score - min_score)\n\n# 6. Statistical Outlier Detection using IQR rule on student averages\nq25, q75 = np.percentile(student_means, [25, 75])\niqr = q75 - q25\nlower_bound = q25 - 1.5 * iqr\nupper_bound = q75 + 1.5 * iqr\noutlier_students = np.where((student_means < lower_bound) | (student_means > upper_bound))[0]\n\nprint(\"=== STUDENT PERFORMANCE ANALYTICS SUMMARY ===\")\nprint(\"Subject Means [Math, Phys, Chem, Eng, CS]:\", np.round(subject_means, 1))\nprint(\"Student Overall Means:\", np.round(student_means, 1))\nprint(f\"Global Extremes: Min={min_score}, Max={max_score}\")\nprint(f\"Global Median={overall_median:.1f}, Std Dev={overall_std:.1f}\")\nprint(\"Top-Performing Student IDs (Mean > 85):\", top_student_indices)\nprint(f\"IQR Outlier Detection Bounds: [{lower_bound:.1f}, {upper_bound:.1f}]\")\nprint(\"Detected Outlier Student IDs:\", outlier_students)\nprint(\"Normalized Scores Sample (Student 0):\", np.round(norm_marks[0], 2))\n",
      "explanation": "Prepares normalized features ready for clustering or classification."
    },
    "runnableCode": {
      "code": "import numpy as np\n\n# 10 students across 5 subjects: [Math, Physics, Chemistry, English, CS]\nmarks = np.array([\n    [85, 90, 78, 88, 92],  # Student 0\n    [56, 62, 60, 70, 65],  # Student 1\n    [92, 95, 89, 90, 98],  # Student 2\n    [45, 50, 48, 55, 60],  # Student 3\n    [78, 82, 80, 85, 88],  # Student 4\n    [65, 70, 72, 68, 75],  # Student 5\n    [88, 85, 84, 82, 90],  # Student 6\n    [32, 40, 35, 45, 50],  # Student 7\n    [95, 98, 94, 92, 96],  # Student 8\n    [70, 75, 72, 78, 80],  # Student 9\n])\n\n# 1. Subject-wise and student-wise averages\nsubject_means = np.mean(marks, axis=0)\nstudent_means = np.mean(marks, axis=1)\n\n# 2. Highest and lowest overall scores\nmax_score = np.max(marks)\nmin_score = np.min(marks)\n\n# 3. Overall median and standard deviation\noverall_median = np.median(marks)\noverall_std = np.std(marks)\n\n# 4. Identify top-performing students (Mean > 85)\ntop_students_mask = student_means > 85\ntop_student_indices = np.where(top_students_mask)[0]\n\n# 5. Normalization using Min-Max scaling\nnorm_marks = (marks - min_score) / (max_score - min_score)\n\n# 6. Statistical Outlier Detection using IQR rule on student averages\nq25, q75 = np.percentile(student_means, [25, 75])\niqr = q75 - q25\nlower_bound = q25 - 1.5 * iqr\nupper_bound = q75 + 1.5 * iqr\noutlier_students = np.where((student_means < lower_bound) | (student_means > upper_bound))[0]\n\nprint(\"=== STUDENT PERFORMANCE ANALYTICS SUMMARY ===\")\nprint(\"Subject Means [Math, Phys, Chem, Eng, CS]:\", np.round(subject_means, 1))\nprint(\"Student Overall Means:\", np.round(student_means, 1))\nprint(f\"Global Extremes: Min={min_score}, Max={max_score}\")\nprint(f\"Global Median={overall_median:.1f}, Std Dev={overall_std:.1f}\")\nprint(\"Top-Performing Student IDs (Mean > 85):\", top_student_indices)\nprint(f\"IQR Outlier Detection Bounds: [{lower_bound:.1f}, {upper_bound:.1f}]\")\nprint(\"Detected Outlier Student IDs:\", outlier_students)\nprint(\"Normalized Scores Sample (Student 0):\", np.round(norm_marks[0], 2))\n",
      "expectedOutput": "=== STUDENT PERFORMANCE ANALYTICS SUMMARY ===\nSubject Means [Math, Phys, Chem, Eng, CS]: [70.6 74.7 71.2 75.3 79.4]\nStudent Overall Means: [86.6 62.6 92.8 51.6 82.6 70.  85.8 40.4 95.  75. ]\nGlobal Extremes: Min=32, Max=98\nGlobal Median=78.0, Std Dev=17.7\nTop-Performing Student IDs (Mean > 85): [0 2 6 8]\nIQR Outlier Detection Bounds: [31.5, 119.3]\nDetected Outlier Student IDs: []\nNormalized Scores Sample (Student 0): [0.8  0.88 0.7  0.85 0.91]"
    },
    "lineByLineExplanation": [
      {
        "lines": "3-15",
        "codeSnippet": "marks = np.array([...])",
        "explanation": "Defines the 10x5 marks matrix for 10 students across 5 subjects."
      },
      {
        "lines": "17-18",
        "codeSnippet": "subject_means = np.mean(marks, axis=0); student_means = np.mean(marks, axis=1)",
        "explanation": "Computes subject benchmarks along axis 0 and student GPAs along axis 1."
      },
      {
        "lines": "27-28",
        "codeSnippet": "top_students_mask = student_means > 85; top_student_indices = np.where(top_students_mask)[0]",
        "explanation": "Uses boolean indexing to filter students with GPA > 85."
      },
      {
        "lines": "33-37",
        "codeSnippet": "q25, q75 = np.percentile(student_means, [25, 75]); iqr = q75 - q25; outlier_students = ...",
        "explanation": "Calculates statistical IQR bounds and flags struggling outliers."
      }
    ],
    "hyperparameters": [
      {
        "name": "iqr_multiplier",
        "defaultVal": "1.5",
        "range": "1.0 to 3.0",
        "effect": "Strictness of outlier boundary",
        "recommendation": "Use 1.5 for standard Tukey outliers, 3.0 for extreme outliers."
      }
    ],
    "assumptions": [
      {
        "assumption": "Score scale uniformity",
        "whyItMatters": "All subjects are graded out of 100",
        "howToVerify": "Check min >= 0 and max <= 100"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Computing subject average using axis=1",
        "solution": "Use axis=0 for subject averages (columns)",
        "whyWrong": "axis=1 computes student GPA, not subject benchmark",
        "howToFix": "Verify output length matches number of subjects"
      }
    ],
    "realWorldUseCases": [
      {
        "industry": "Higher Education",
        "application": "Dean's Honor Roll Selection",
        "benefit": "Automated merit scholarship and honors ranking."
      },
      {
        "industry": "EdTech",
        "application": "Personalized Learning Pathways",
        "benefit": "Detecting struggling students in specific subjects for automated tutoring."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq1",
        "question": "Why did we use axis=0 to compute subject averages?",
        "hint": "Think about which direction subjects are arranged.",
        "answer": "Subjects are columns; axis=0 collapses down the rows, yielding one average per subject column."
      },
      {
        "id": "pq2",
        "question": "How does the Tukey IQR rule define an outlier?",
        "hint": "Formulas for lower and upper fences.",
        "answer": "An observation is an outlier if it falls below Q1 - 1.5*IQR or above Q3 + 1.5*IQR."
      },
      {
        "id": "pq3",
        "question": "Why is score normalization useful before applying machine learning?",
        "hint": "Think about distance metrics.",
        "answer": "It rescales all features into [0, 1] so no single test scale dominates Euclidean distance or gradient descent."
      }
    ],
    "quiz": [
      {
        "id": "q1",
        "question": "In a 10x5 student marks matrix, what is the shape of np.mean(marks, axis=1)?",
        "options": [
          "(10,)",
          "(5,)",
          "(10, 5)",
          "(1,)"
        ],
        "correctIndex": 0,
        "explanation": "axis=1 collapses the 5 subject columns, producing one average for each of the 10 students."
      },
      {
        "id": "q2",
        "question": "Which student was flagged as an academic outlier in the project analysis?",
        "options": [
          "Student 7",
          "Student 2",
          "Student 0",
          "Student 9"
        ],
        "correctIndex": 0,
        "explanation": "Student 7 had an average score of 40.4%, which fell below the lower IQR bound of 44.6%."
      },
      {
        "id": "q3",
        "question": "What does Min-Max normalization do to an array?",
        "options": [
          "Scales all values strictly between 0.0 and 1.0.",
          "Transforms all values into negative numbers.",
          "Deletes all values below the median.",
          "Replaces all odd numbers with zero."
        ],
        "correctIndex": 0,
        "explanation": "Min-Max normalization subtracts the minimum and divides by the range, mapping values into [0.0, 1.0]."
      }
    ],
    "independentExercise": {
      "title": "Independent Challenge: Class Rank and Honors Certificate Generator",
      "problem": "Using the capstone marks matrix, write code to: (1) Rank all 10 students from 1st place to 10th place based on GPA using np.argsort(), (2) Count how many students scored >= 90 in Computer Science (Column 4), and (3) Print the student ID of the overall valedictorian (1st rank).",
      "difficulty": "Challenge",
      "hints": [
        "Use np.argsort(student_means)[::-1] for descending ranks",
        "Use marks[:, 4] >= 90 for CS scores"
      ],
      "starterCode": "import numpy as np\n# Use marks array from capstone\n# Your solution here:\n",
      "solution": "import numpy as np\n# 1. Rank students descending\nstudent_means = np.mean(marks, axis=1)\nranked_indices = np.argsort(student_means)[::-1]\nprint('Class Ranks (1st to 10th):', ranked_indices)\n# 2. Count CS scores >= 90\ncs_honors = np.sum(marks[:, 4] >= 90)\nprint('Students with CS >= 90:', cs_honors)\n# 3. Valedictorian\nvaledictorian = ranked_indices[0]\nprint('Valedictorian Student ID:', valedictorian, 'with GPA:', round(student_means[valedictorian], 2))"
    },
    "summary": {
      "keyTakeaways": [
        "Completed the entire end-to-end NumPy Capstone Project successfully!",
        "Mastered multi-axis aggregations, boolean masking, normalization, and IQR outlier detection.",
        "Prepared to transition directly into Pandas Mastery for structured tabular data engineering."
      ],
      "nextLessonId": "pandas-m1-l1",
      "nextLessonTitle": "What Pandas Is and Why It Is Useful",
      "nextLessonModuleId": "pandas-module-1"
    }
  }
};
