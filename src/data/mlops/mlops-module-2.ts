import { ModuleData, LessonContent } from '@/lib/types';

// =========================================================================
// MODULE 4: ML Pipelines and Automation (p10-m4)
// =========================================================================
export const p10m4Data: ModuleData = {
  id: 'p10-m4',
  number: 4,
  title: 'ML Pipelines & DAG Automation',
  subtitle: 'Directed Acyclic Graphs, Task Dependencies, Idempotency & Retries',
  description:
    'Design and orchestrate production-grade machine learning pipelines. Master Directed Acyclic Graphs (DAGs), task dependencies, step-wise caching, idempotent executions, and automated retry policies with exponential backoff.',
  icon: 'Zap',
  badge: 'Phase 10 · MLOps',
  estimatedHours: 3,
  topicsCount: 1,
  lessons: [
    {
      id: 'mlops-04-pipelines-automation',
      moduleId: 'p10-m4',
      title: 'MLOps-04: ML Pipelines & DAG Automation',
      description:
        'Deconstruct pipeline stages: ingestion, validation, preprocessing, training, evaluation, and registration into an idempotent, retry-resilient DAG.',
      order: 1,
      readTimeMinutes: 34,
      visualizerType: 'mlops-pipeline-dag-explorer',
      difficulty: 'Intermediate',
    },
  ],
};

// =========================================================================
// MODULE 5: Model Packaging and Reproducible Environments (p10-m5)
// =========================================================================
export const p10m5Data: ModuleData = {
  id: 'p10-m5',
  number: 5,
  title: 'Model Packaging & Environments',
  subtitle: 'Dependency Pinning, Safe Serialization, Safetensors & Multi-Stage Docker',
  description:
    'Package models safely for zero-downtime production deployment. Avoid pickle deserialization vulnerabilities using Safetensors and checksums, pin dependencies strictly, and engineer lightweight multi-stage Docker containers with non-root security.',
  icon: 'Package',
  badge: 'Phase 10 · MLOps',
  estimatedHours: 3,
  topicsCount: 1,
  lessons: [
    {
      id: 'mlops-05-packaging-environments',
      moduleId: 'p10-m5',
      title: 'MLOps-05: Model Packaging & Docker Environments',
      description:
        'Dependency locking, safe model serialization (safetensors vs pickle), multi-stage Docker builds, non-root runtimes, and train-serving consistency.',
      order: 1,
      readTimeMinutes: 36,
      visualizerType: 'mlops-cicd-quality-gate-explorer',
      difficulty: 'Intermediate',
    },
  ],
};

// =========================================================================
// MODULE 6: Model Serving and API Deployment (p10-m6)
// =========================================================================
export const p10m6Data: ModuleData = {
  id: 'p10-m6',
  number: 6,
  title: 'Model Serving & API Deployment',
  subtitle: 'Batch vs Online Inference, FastAPI, Pydantic Validation & Health Probes',
  description:
    'Expose machine learning models as high-throughput REST APIs. Master FastAPI asynchronous request handling, strict Pydantic input/output schemas, model loading lifecycles, and Kubernetes-compatible health (/healthz) and readiness (/ready) probes.',
  icon: 'Server',
  badge: 'Phase 10 · MLOps',
  estimatedHours: 3,
  topicsCount: 1,
  lessons: [
    {
      id: 'mlops-06-serving-apis',
      moduleId: 'p10-m6',
      title: 'MLOps-06: Model Serving & REST APIs with FastAPI',
      description:
        'Design low-latency inference microservices: FastAPI lifespan context, Pydantic type validation, batching vs real-time streaming, and health probes.',
      order: 1,
      readTimeMinutes: 35,
      visualizerType: 'mlops-model-release-explorer',
      difficulty: 'Intermediate',
    },
  ],
};

// =========================================================================
// LESSON CONTENTS (Modules 4 - 6)
// =========================================================================
export const mlopsModule2Lessons: Record<string, LessonContent> = {
  'mlops-04-pipelines-automation': {
    id: 'mlops-04-pipelines-automation',
    moduleId: 'p10-m4',
    title: 'MLOps-04: ML Pipelines & DAG Automation',
    subtitle: 'Directed Acyclic Graphs, Task Dependencies, Idempotency & Retries',
    order: 1,
    readTimeMinutes: 34,
    difficulty: 'Intermediate',
    visualizerType: 'mlops-pipeline-dag-explorer',

    objectives: [
      'Formalize an ML workflow as a Directed Acyclic Graph (DAG) of discrete, decoupled tasks',
      'Understand the principle of idempotency and why non-idempotent pipeline steps cause data corruption',
      'Implement step-level caching to prevent re-running expensive stages when code and data inputs remain unchanged',
      'Design fault-tolerant pipelines with automatic retry strategies and exponential backoff for transient failures',
      'Build a modular Python pipeline that executes ingestion, validation, training, and registration sequentially or concurrently',
    ],

    prerequisites: [
      'Understanding of the MLOps lifecycle and data versioning (Lessons 1 & 3)',
      'Basic knowledge of graph data structures and task dependencies',
    ],
    previousLesson: {
      id: 'mlops-03-data-model-versioning',
      title: 'MLOps-03: Data & Model Versioning (DVC & Git)',
      moduleId: 'p10-m3',
    },

    analogy: {
      title: 'The Modern Automobile Assembly Line',
      text: 'Imagine a modern car assembly factory. Station 1 stamps the steel chassis. Station 2 paints the body. Station 3 installs the electric drivetrain. Station 4 mounts the wheels. If Station 2 runs out of paint, the factory does not throw away the already-stamped steel chassis and start over from raw ore; it halts Station 2, alarms the technician, and resumes once paint is refilled. Moreover, the factory is idempotent: passing a painted chassis through Station 2 twice will not apply a double-coat if sensors detect it was already completed. An ML pipeline is an automated assembly line where intermediate artifacts are cached and steps are isolated.',
      metaphor: 'A monolithic script is a craftsman hand-carving a car from a tree trunk; a DAG pipeline is an automated, cached assembly line.',
    },

    problemSolved: {
      title: 'The Monolithic Script Trap & Catastrophic Restarts',
      description:
        'Engineers often write single 2,000-line Python scripts that load data, normalize features, train for 8 hours, and evaluate. If the script encounters a minor network timeout during final model registration at hour 7.9, the entire process crashes and all 8 hours of GPU training are permanently lost.',
      keyPoints: [
        'Decoupled Task Boundaries: Each stage (ingest, preprocess, train, eval) is an independent function with explicit inputs/outputs',
        'Artifact Caching (Idempotency): If inputs have not changed, the orchestrator reuses previous outputs in 0 milliseconds',
        'Transient Error Resilience: Network hiccups or temporary API rate limits automatically trigger exponential backoff retries',
        'Parallel Execution: Independent branches (e.g. data validation and baseline drift calculation) run concurrently on worker pools',
      ],
    },

    intuition: {
      overview:
        'A DAG pipeline represents execution as a directed graph where nodes are compute tasks and directed edges represent data dependencies. Execution follows topological sorting.',
      steps: [
        {
          step: 1,
          title: 'Topological Dependency Resolution',
          description:
            'The orchestrator inspects the DAG to identify root nodes with zero dependencies (e.g. raw data ingestion) and schedules them first.',
        },
        {
          step: 2,
          title: 'Cache Fingerprint Evaluation',
          description:
            'Before executing a node, the runner computes a hash of the node code + input artifact hashes. If an identical hash exists in cache, the node is skipped.',
        },
        {
          step: 3,
          title: 'Fault-Tolerant Step Execution',
          description:
            'Nodes execute in isolated sub-processes or containers. If a transient error occurs, the retry policy pauses with exponential backoff.',
        },
        {
          step: 4,
          title: 'Downstream State Propagation',
          description:
            'Upon successful completion, output artifact manifests are registered, unblocking child nodes in the DAG.',
        },
      ],
    },

    mathematics: {
      overview:
        'A pipeline is formalized as a finite Directed Acyclic Graph G = (V, E) where vertices V are operations and edges E subset of V x V represent data lineage constraints.',
      foundations: [
        {
          name: 'Topological Order Condition',
          latex: '(u, v) \\in E \\implies \\text{order}(u) < \\text{order}(v)',
          explanation:
            'Any dependency node u must finish successfully and emit verified artifacts before dependent child node v can be scheduled.',
        },
        {
          name: 'Exponential Backoff Retry Schedule',
          latex: 't_{\\text{wait}}(k) = \\min\\big(t_{\\max}, \\; t_0 \\cdot 2^k + \\mathcal{U}(0, \\delta)\\big)',
          explanation:
            'When task execution fails at attempt k, retry wait time scales exponentially with added jitter U(0, delta) to prevent thundering herd crashes.',
        },
      ],
    },

    derivation: {
      title: 'Derivation of Critical Path DAG Latency vs Sequential Execution',
      objective: 'Calculate the total pipeline wall-clock time under concurrent execution.',
      steps: [
        {
          step: 1,
          label: 'Sequential Execution Duration',
          latex: 'T_{\\text{seq}} = \\sum_{v \\in V} t(v)',
          explanation: 'Running all tasks sequentially sums the individual durations of every node in the graph.',
        },
        {
          step: 2,
          label: 'Critical Path Formulation',
          latex: 'T_{\\text{DAG}} = \\max_{p \\in \\mathcal{P}} \\sum_{v \\in p} t(v)',
          explanation: 'Under parallel scheduling, the total runtime equals the length of the longest path P through the DAG from root to sink.',
        },
        {
          step: 3,
          label: 'Concurrency Speedup',
          latex: 'S = \\frac{T_{\\text{seq}}}{T_{\\text{DAG}}} \\ge 1.0',
          explanation: 'Any parallel branch (e.g. data validation running concurrently with drift baseline computation) reduces total wall-clock latency.',
        },
      ],
    },

    variables: [
      { symbol: 'G = (V, E)', name: 'Pipeline Graph', description: 'Vertices V are execution tasks; edges E are dependency requirements' },
      { symbol: 't(v)', name: 'Task Duration', description: 'Execution wall-clock time required for node v' },
      { symbol: 'k', name: 'Retry Count', description: 'Current retry iteration after a transient failure' },
      { symbol: 't_0', name: 'Initial Backoff Base', description: 'Starting delay before the first retry attempt (e.g. 1.0 second)' },
    ],

    numericalExample: {
      scenario: 'Comparing execution duration between sequential execution vs parallel DAG with cached steps',
      dataset: [
        { node: 'ingest_data', durationSec: 15, isCached: 'true' },
        { node: 'validate_schemas', durationSec: 20, isCached: 'false' },
        { node: 'preprocess_features', durationSec: 35, isCached: 'false' },
        { node: 'train_model', durationSec: 120, isCached: 'false' },
        { node: 'check_drift_baseline', durationSec: 30, isCached: 'false' },
        { node: 'evaluate_metrics', durationSec: 25, isCached: 'false' },
        { node: 'register_model', durationSec: 10, isCached: 'false' },
      ],
      calculations: [
        { step: 'Full Sequential Runtime', math: '15 + 20 + 35 + 120 + 30 + 25 + 10', result: '255 seconds' },
        { step: 'DAG with Ingest Cache & Parallel Branching', math: '0 \\text{ (cached)} + 20 + 35 + \\max(120, 30) + 25 + 10', result: '210 seconds (45s speedup)' },
      ],
      finalConclusion: 'Caching the 15-second ingestion and running drift validation concurrently with training saves 45 seconds total execution time.',
    },

    visualExplanation: {
      title: 'DAG Pipeline Execution & Retry State Machine',
      description:
        'A visual representation of tasks flowing through states: Pending -> Running -> (Failed -> Retry Backoff) -> Succeeded -> Downstream Unlocked.',
      features: [
        'Idempotent Caching: Unmodified tasks transition directly from Pending to Cached in 0ms',
        'Branching Concurrency: Model training and baseline drift checks run simultaneously after preprocessing',
        'Circuit Breaker: Hard stop if retries exceed maximum threshold (e.g. 3 attempts)',
        'Dependency Barrier: Model registration waits for both evaluation metrics AND drift checks to pass',
      ],
    },

    scratchCode: {
      title: 'Lightweight DAG Orchestrator in Pure Python',
      code: `import time

class Task:
    def __init__(self, name, fn, deps=None, is_cached=False):
        self.name = name
        self.fn = fn
        self.deps = deps or []
        self.is_cached = is_cached
        self.result = None

class DAGRunner:
    def __init__(self):
        self.tasks = {}

    def add_task(self, task: Task):
        self.tasks[task.name] = task

    def run(self):
        completed = {}
        print("=== Starting DAG Execution ===")
        
        while len(completed) < len(self.tasks):
            progress_made = False
            for name, task in self.tasks.items():
                if name in completed:
                    continue
                # Check if all dependencies are satisfied
                if all(dep in completed for dep in task.deps):
                    if task.is_cached:
                        print(f"[CACHE HIT] Task '{name}' skipped. Loaded previous artifact.")
                        task.result = f"cached_output_{name}"
                    else:
                        print(f"[RUNNING] Task '{name}'...")
                        task.result = task.fn(completed)
                        print(f"[COMPLETED] Task '{name}' finished.")
                    
                    completed[name] = task.result
                    progress_made = True
                    break
            
            if not progress_made:
                raise RuntimeError("Deadlock or circular dependency detected in DAG!")
                
        print("=== DAG Completed Successfully ===")
        return completed

# Define pipeline stages
runner = DAGRunner()
runner.add_task(Task("ingest", lambda ctx: "raw_data_sha256:88fa", is_cached=True))
runner.add_task(Task("validate", lambda ctx: f"validated_{ctx['ingest']}", deps=["ingest"]))
runner.add_task(Task("preprocess", lambda ctx: f"features_{ctx['validate']}", deps=["validate"]))
runner.add_task(Task("train", lambda ctx: f"weights_{ctx['preprocess']}", deps=["preprocess"]))
runner.add_task(Task("evaluate", lambda ctx: f"metrics_f1_0.93_{ctx['train']}", deps=["train"]))
runner.add_task(Task("register", lambda ctx: f"registered_{ctx['evaluate']}", deps=["evaluate"]))

results = runner.run()
print("\\nFinal Registry Output:", results["register"])`,
      explanation:
        'A complete Python DAG orchestrator that resolves task dependencies dynamically, supports artifact caching, and prevents circular dependency deadlocks.',
    },

    sklearnCode: {
      title: 'Scikit-learn Transformer Pipeline with Retry Wrapper',
      code: `import time
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.impute import SimpleImputer
import numpy as np

def execute_with_retry(fn, max_retries=3, base_delay=0.1):
    """Executes an operation with exponential backoff retry logic"""
    attempt = 0
    while attempt < max_retries:
        try:
            return fn()
        except Exception as e:
            attempt += 1
            if attempt == max_retries:
                raise RuntimeError(f"Step failed permanently after {max_retries} attempts: {e}")
            wait_time = base_delay * (2 ** (attempt - 1))
            print(f"[Warning] Step failed: {e}. Retrying in {wait_time:.2f}s (Attempt {attempt}/{max_retries})...")
            time.sleep(wait_time)

# Building a resilient preprocessing pipeline
X_raw = np.array([[25.0, 50000.0], [np.nan, 85000.0], [42.0, np.nan]])

preprocessor = Pipeline([
    ('imputer', SimpleImputer(strategy='median')),
    ('scaler', StandardScaler())
])

# Execute preprocessing inside fault-tolerant runner
clean_X = execute_with_retry(lambda: preprocessor.fit_transform(X_raw))
print("Transformed Feature Matrix:\\n", clean_X)`,
      explanation:
        'Wraps Scikit-learn feature transformations in a robust exponential backoff retry loop, protecting data preparation stages from transient infrastructure glitches.',
    },

    runnableCode: {
      code: `def simulate_dag():
    execution_trace = []
    # Step 1: Ingest (cached)
    execution_trace.append("Step 1 [ingest]: CACHE HIT (sha256:4a8b). Skipped 400ms.")
    # Step 2: Validate
    execution_trace.append("Step 2 [validate]: Schema checked (0 errors). Duration: 120ms.")
    # Step 3: Train
    execution_trace.append("Step 3 [train]: LightGBM fitted in 850ms.")
    # Step 4: Quality Gate
    execution_trace.append("Step 4 [eval]: Quality gate verified (F1=0.92 >= 0.90 threshold).")
    # Step 5: Register
    execution_trace.append("Step 5 [register]: Published model-v1.1.0 to staging.")
    return "\\n".join(execution_trace)

print(simulate_dag())`,
      expectedOutput: `Step 1 [ingest]: CACHE HIT (sha256:4a8b). Skipped 400ms.
Step 2 [validate]: Schema checked (0 errors). Duration: 120ms.
Step 3 [train]: LightGBM fitted in 850ms.
Step 4 [eval]: Quality gate verified (F1=0.92 >= 0.90 threshold).
Step 5 [register]: Published model-v1.1.0 to staging.`,
    },

    lineByLineExplanation: [
      { lines: '1-3', codeSnippet: 'execution_trace.append("Step 1 [ingest]: CACHE HIT...")', explanation: 'Demonstrates idempotent step skipping when previous input hash matches.' },
      { lines: '4-7', codeSnippet: 'Step 2 [validate] -> Step 3 [train] -> Step 4 [eval]', explanation: 'Executes dependent sequential stages according to topological sort.' },
      { lines: '8-9', codeSnippet: 'Step 5 [register]: Published model-v1.1.0 to staging.', explanation: 'Finalizes the DAG by committing candidate weights to model registry.' },
    ],

    hyperparameters: [
      { name: 'max_retries', defaultVal: '3', range: '1 - 10', effect: 'Number of retry attempts before task aborts', recommendation: 'Set to 3 for network/API calls; set to 0 for deterministic syntax or data errors.' },
      { name: 'backoff_factor', defaultVal: '2.0', range: '1.5 - 4.0', effect: 'Exponential multiplier for delay between attempts', recommendation: 'Use 2.0 with random jitter to avoid thundering herd contention.' },
      { name: 'max_concurrency', defaultVal: '4', range: '1 - 32', effect: 'Maximum concurrent worker tasks executed', recommendation: 'Tune to available CPU cores and GPU VRAM capacity.' },
    ],

    assumptions: [
      { assumption: 'Idempotency', whyItMatters: 'Executing a task multiple times must yield identical results without duplicate rows or corruptions', howToVerify: 'Run the stage twice consecutively and verify output files are bit-for-bit identical.' },
      { assumption: 'Acyclicity', whyItMatters: 'Circular dependencies (A depends on B, B depends on A) cause permanent pipeline deadlocks', howToVerify: 'Run topological sort validation on DAG initialization.' },
    ],

    commonMistakes: [
      {
        mistake: 'Retrying on non-transient deterministic errors (such as missing required columns or syntax errors)',
        solution: 'Distinguish between transient network/timeout exceptions and permanent data validation failures.',
        whyWrong: 'Retrying a broken CSV schema will fail 100% of the time, burning compute time and delaying developer feedback.',
        howToFix: 'Catch specific transient exceptions (e.g. ConnectionError, TimeoutError) for retries; fail fast on ValueError.',
      },
      {
        mistake: 'Hardcoding absolute local file paths (/Users/alice/data.csv) inside pipeline steps',
        solution: 'Use relative paths or environment variables (DATA_DIR) managed by the pipeline configuration.',
        whyWrong: 'The pipeline will crash immediately when run on a teammate machine, CI runner, or cloud container.',
        howToFix: 'Pass input and output directories as parameters to task functions.',
      },
    ],

    realWorldUseCases: [
      { industry: 'Media & Streaming', application: 'Daily Recommendation Retraining', benefit: 'Airflow/Prefect DAG retrains collaborative filtering models overnight with automated retries.' },
      { industry: 'Supply Chain', application: 'Demand Forecasting Pipelines', benefit: 'Executes parallel DAG branches for 500 regional warehouses simultaneously.' },
      { industry: 'Security', application: 'Malware Detection Classifier', benefit: 'Automated DAG ingests binary samples, validates hashes, and deploys updated threat rules every 4 hours.' },
    ],

    practiceQuestions: [
      {
        id: 'pq-1',
        question: 'What is idempotency in the context of an ML pipeline stage, and why is it essential?',
        hint: 'What happens if a pipeline step is executed twice with the same inputs?',
        answer: 'A pipeline stage is idempotent if executing it multiple times with identical inputs produces the exact same output without side-effects or state corruption. It is essential because if a pipeline crashes midway and restarts, previously completed steps can be re-run safely without creating duplicate database records or altered weights.',
        explanation: 'Idempotency guarantees that pipeline restarts are safe and deterministic.',
      },
      {
        id: 'pq-2',
        question: 'Why is exponential backoff with jitter preferred over immediate retries when a pipeline task fails?',
        hint: 'Think about what happens when hundreds of workers fail simultaneously against an overloaded database.',
        answer: 'Immediate retries hammer the struggling service repeatedly, worsening the outage. Exponential backoff progressively increases delay between attempts, and adding random jitter spreads retry times across workers, preventing the "thundering herd" problem and allowing the downstream service time to recover.',
        explanation: 'Jittered exponential backoff prevents distributed systems from crashing their own infrastructure.',
      },
      {
        id: 'pq-3',
        question: 'How does step caching accelerate machine learning experimentation in a DAG orchestrator?',
        hint: 'Consider a 2-hour data cleaning step followed by a 5-minute training hyperparameter change.',
        answer: 'The orchestrator computes a fingerprint hash of the task code and its input datasets. If the inputs and code have not changed since the last execution, the orchestrator skips the compute step entirely and returns the cached artifact immediately (0ms). Data scientists can tweak downstream training scripts without re-waiting for massive upstream data processing.',
        explanation: 'Caching eliminates redundant compute across pipeline runs.',
      },
    ],

    quiz: [
      {
        id: 'qz-1',
        question: 'What does the acronym DAG stand for in pipeline orchestration?',
        options: [
          'Data Acquisition Gateway',
          'Directed Acyclic Graph',
          'Distributed Analytics Generator',
          'Deterministic Algorithm Grid',
        ],
        correctIndex: 1,
        explanation: 'DAG stands for Directed Acyclic Graph, representing workflows where tasks flow in a single direction without infinite cycles.',
      },
      {
        id: 'qz-2',
        question: 'Which of the following scenarios justifies an automated retry with exponential backoff?',
        options: [
          'A Python SyntaxError in the training code',
          'A temporary HTTP 503 Service Unavailable timeout when downloading raw data from cloud storage',
          'A ValueError because a mandatory column is missing from the CSV',
          'A division-by-zero exception in feature normalization',
        ],
        correctIndex: 1,
        explanation: 'Temporary network or HTTP 503 timeouts are transient errors suitable for retries. Code bugs or missing columns are deterministic and will fail identically every time.',
      },
      {
        id: 'qz-3',
        question: 'In a DAG where Task C depends on both Task A and Task B, when can Task C be scheduled to run?',
        options: [
          'As soon as Task A finishes, regardless of Task B',
          'Before Task A starts',
          'Only after BOTH Task A and Task B have completed successfully',
          'Task C runs randomly',
        ],
        correctIndex: 2,
        explanation: 'In a dependency DAG, a child task can only be scheduled once all parent dependency nodes have completed successfully.',
      },
    ],

    independentExercise: {
      id: 'ex-04-exponential-backoff',
      title: 'Build an Exponential Backoff Retry Simulator',
      problem: 'Write a Python function `simulate_retry_policy(max_retries, base_delay_sec, max_delay_sec)` that returns a list of scheduled wait times for each retry attempt k from 1 to max_retries using the formula min(max_delay_sec, base_delay_sec * (2 ** (k - 1))).',
      hints: [
        'Iterate k from 1 to max_retries',
        'Compute delay = base_delay_sec * (2 ** (k - 1)) and clamp to max_delay_sec',
      ],
      starterCode: `def simulate_retry_policy(max_retries: int, base_delay_sec: float, max_delay_sec: float) -> list:
    # TODO: Implement backoff schedule
    pass

# Test
print(simulate_retry_policy(max_retries=4, base_delay_sec=1.0, max_delay_sec=10.0))`,
      solution: `def simulate_retry_policy(max_retries: int, base_delay_sec: float, max_delay_sec: float) -> list:
    schedule = []
    for k in range(1, max_retries + 1):
        delay = min(max_delay_sec, base_delay_sec * (2 ** (k - 1)))
        schedule.append(round(delay, 2))
    return schedule

print(simulate_retry_policy(max_retries=4, base_delay_sec=1.0, max_delay_sec=10.0))`,
    },

    summary: {
      keyTakeaways: [
        'DAGs decouple complex ML workflows into modular, independently testable, and cacheable stages.',
        'Idempotent task design ensures that interrupted pipeline executions can resume without corrupting data.',
        'Transient failures should be handled via jittered exponential backoff; deterministic errors should fail immediately.',
        'Parallelizing independent branches and caching unchanged upstream tasks drastically accelerates experiment iteration.',
      ],
      nextLessonId: 'mlops-05-packaging-environments',
    },
  },

  'mlops-05-packaging-environments': {
    id: 'mlops-05-packaging-environments',
    moduleId: 'p10-m5',
    title: 'MLOps-05: Model Packaging & Docker Environments',
    subtitle: 'Dependency Pinning, Safe Serialization, Safetensors & Multi-Stage Docker',
    order: 1,
    readTimeMinutes: 36,
    difficulty: 'Intermediate',
    visualizerType: 'mlops-cicd-quality-gate-explorer',

    objectives: [
      'Understand the catastrophic security risks of Python pickle deserialization (arbitrary remote code execution)',
      'Adopt safe, zero-code-execution serialization formats like Safetensors, ONNX, and checksum-verified artifacts',
      'Pin application dependencies deterministically using lockfiles (poetry.lock, pip-tools, conda-lock)',
      'Construct minimal multi-stage Dockerfiles for ML applications that strip build compilers and enforce non-root users',
      'Eliminate train-serving skew by packaging preprocessors and model weights into unified container runtimes',
    ],

    prerequisites: [
      'Familiarity with Python packages, virtual environments, and command-line execution',
      'Basic understanding of Docker containers and images',
    ],
    previousLesson: {
      id: 'mlops-04-pipelines-automation',
      title: 'MLOps-04: ML Pipelines & DAG Automation',
      moduleId: 'p10-m4',
    },

    analogy: {
      title: 'The Sealed Sterile Medical Vial vs Unlabeled Open Tupperware',
      text: 'Imagine receiving a liquid medication in an unsealed, handwritten plastic Tupperware container from a stranger. Because the lid is loose and there is no tamper-evident seal, anyone could have slipped poison into the liquid before you drink it. In Python, loading an untrusted `.pkl` (pickle) file is identical to drinking from that unsealed container: pickle is not a data format; it is a full bytecode execution engine that can execute arbitrary malicious terminal commands (`os.system("rm -rf /")`) the millisecond you call `pickle.load()`. Safetensors and signed containers are sterile, hermetically sealed medical vials: only raw numerical tensor bytes can pass through, with zero possibility of code execution.',
      metaphor: 'Pickle is an open door to arbitrary code execution; Safetensors and signed Docker containers are sterile, tamper-evident vaults.',
    },

    problemSolved: {
      title: 'The "It Works on My Laptop!" Production Disaster',
      description:
        'A model trained on macOS with NumPy 1.24 and Python 3.11 often fails or produces silent numerical drift when deployed to an Ubuntu server with NumPy 1.26 and Python 3.10. Furthermore, deploying raw pickle files exposes production infrastructure to critical Remote Code Execution (RCE) vulnerabilities.',
      keyPoints: [
        'Safe Serialization: Moving away from vulnerable pickle files to formats like Safetensors that store raw tensor buffers without arbitrary code execution',
        'Bit-Level Dependency Locking: Pinning exact package versions and OS dependencies to prevent silent runtime discrepancies',
        'Multi-Stage Docker Builds: Compiling C++ libraries (PyTorch/LightGBM) in a heavy builder stage, then copying only binaries to a slim runtime image',
        'Least-Privilege Security: Running containerized ML services as an unprivileged non-root user (UID 10001) to mitigate container breakout exploits',
      ],
    },

    intuition: {
      overview:
        'Production packaging encapsulates the model weights, preprocessing logic, runtime dependencies, and OS environment into an immutable, portable OCI container image.',
      steps: [
        {
          step: 1,
          title: 'Serialize Safely',
          description:
            'Export model parameters using Safetensors or ONNX, accompanied by a cryptographic SHA-256 integrity checksum.',
        },
        {
          step: 2,
          title: 'Pin Exact Dependencies',
          description:
            'Generate a deterministic lockfile (e.g. `requirements.lock` with hashes) locking every sub-dependency version.',
        },
        {
          step: 3,
          title: 'Multi-Stage Container Build',
          description:
            'Stage 1 (Builder) installs compilers and builds wheels. Stage 2 (Runner) copies only final Python packages onto a slim, hardened base image.',
        },
        {
          step: 4,
          title: 'Enforce Least Privilege',
          description:
            'Drop root privileges inside the container, configure health check instructions, and package the minimal inference runtime.',
        },
      ],
    },

    mathematics: {
      overview:
        'Safe tensor serialization stores weights as contiguous memory-mapped byte arrays without executable code instructions.',
      foundations: [
        {
          name: 'Memory-Mapped Tensor Deserialization',
          latex: 'W_i = \\text{mmap}\\big(\\text{file\\_descriptor}, \\; \\text{offset}_i, \\; \\text{length}_i\\big)',
          explanation:
            'Safetensors maps disk bytes directly into RAM/GPU memory via zero-copy mmap, eliminating deserialization CPU overhead and preventing code execution.',
        },
        {
          name: 'Cryptographic Artifact Hash Verification',
          latex: '\\text{Verify}(A, h) = \\begin{cases} 1 & \\text{if } \\text{SHA-256}(A) = h \\\\ 0 & \\text{otherwise (reject)} \\end{cases}',
          explanation:
            'Before any model weights are loaded into GPU memory, the host verifies that the file hash matches the signed manifest, blocking tampering.',
        },
      ],
    },

    derivation: {
      title: 'Derivation of Container Image Size Reduction via Multi-Stage Builds',
      objective: 'Calculate the attack surface and size reduction of multi-stage Docker builds.',
      steps: [
        {
          step: 1,
          label: 'Single-Stage Naive Image Size',
          latex: 'S_{\\text{single}} = S_{\\text{OS}} + S_{\\text{gcc/build-tools}} + S_{\\text{pip-cache}} + S_{\\text{runtime}}',
          explanation: 'A naive build includes heavy C/C++ compilers, package build caches, and dev tools (often 2.5GB+).',
        },
        {
          step: 2,
          label: 'Multi-Stage Stripped Image Size',
          latex: 'S_{\\text{multi}} = S_{\\text{slim-OS}} + S_{\\text{runtime-only}}',
          explanation: 'The final stage copies only compiled binary wheels onto a minimal slim OS without build tools or pip cache.',
        },
        {
          step: 3,
          label: 'Attack Surface & Memory Compression',
          latex: '\\Delta S = S_{\\text{single}} - S_{\\text{multi}} > 1.8\\text{ GB} \\implies \\text{Cold start } \\propto \\frac{S_{\\text{multi}}}{\\text{Bandwidth}}',
          explanation: 'Reducing container image size from 2.5GB to 400MB accelerates Kubernetes pod auto-scaling cold-start times by over 80%.',
        },
      ],
    },

    variables: [
      { symbol: 'A', name: 'Serialized Model Artifact', description: 'Binary file containing weight tensors (.safetensors, .onnx, or .bin)' },
      { symbol: 'h', name: 'Integrity Checksum', description: 'Expected SHA-256 hash verified prior to deserialization' },
      { symbol: 'S_{\\text{multi}}', name: 'Multi-Stage Image Size', description: 'Final compressed size of the production container image' },
    ],

    numericalExample: {
      scenario: 'Comparing container image size, cold-start pull time, and CVE vulnerability count across Docker build strategies',
      dataset: [
        { strategy: 'Naive Single-Stage (Full Ubuntu + GCC)', sizeMb: 2450, pullTimeSec: 42.0, cveCount: 142 },
        { strategy: 'Multi-Stage Python Slim + Non-Root', sizeMb: 380, pullTimeSec: 6.5, cveCount: 4 },
      ],
      calculations: [
        { step: 'Image Size Reduction', math: '(2450 - 380) / 2450 \\times 100', result: '84.5% reduction in disk and network footprint' },
        { step: 'Cold-Start Auto-Scale Speedup', math: '42.0\\text{s} \\to 6.5\\text{s}', result: '6.4x faster pod provisioning during traffic spikes' },
      ],
      finalConclusion: 'Multi-stage builds eliminate 138 CVE security vulnerabilities and reduce pod cold-start latency from 42s to 6.5s.',
    },

    visualExplanation: {
      title: 'Multi-Stage Docker Architecture for ML Serving',
      description:
        'A visual comparison showing how heavy build dependencies are discarded in Stage 1, leaving only sterile runtime binaries in Stage 2.',
      features: [
        'Stage 1 (Builder): Python 3.11-slim + gcc + g++ -> compiles C-extensions into /app/wheels',
        'Discarded: Compilers, temporary build cache, and dev headers discarded at build boundary',
        'Stage 2 (Runtime): Clean Python 3.11-slim base -> installs wheels from Stage 1',
        'Hardening: USER 10001 (non-root), Read-Only root filesystem, minimal attack surface',
      ],
    },

    scratchCode: {
      title: 'Safe Weight Serialization & Verification in Pure Python',
      code: `import hashlib
import json
import struct

class SafeTensorSerializer:
    """Demonstrates minimal zero-code-execution tensor serialization concept"""
    
    @staticmethod
    def save(weights_dict: dict, filepath: str) -> str:
        # Format: JSON Header (metadata & offsets) + Contiguous Raw Float Bytes
        header = {}
        raw_bytes = bytearray()
        offset = 0
        
        for name, values in weights_dict.items():
            byte_data = struct.pack(f"{len(values)}f", *values)
            header[name] = {"offset": offset, "length": len(byte_data), "shape": [len(values)]}
            raw_bytes.extend(byte_data)
            offset += len(byte_data)
            
        header_bytes = json.dumps(header).encode('utf-8')
        # Prepend 4-byte header length
        header_len = struct.pack("I", len(header_bytes))
        
        with open(filepath, "wb") as f:
            f.write(header_len)
            f.write(header_bytes)
            f.write(raw_bytes)
            
        # Compute SHA-256 for integrity verification
        with open(filepath, "rb") as f:
            sha = hashlib.sha256(f.read()).hexdigest()
        return sha

    @staticmethod
    def load(filepath: str, expected_sha: str) -> dict:
        with open(filepath, "rb") as f:
            content = f.read()
            
        actual_sha = hashlib.sha256(content).hexdigest()
        if actual_sha != expected_sha:
            raise SecurityError(f"Integrity check failed! Expected {expected_sha}, got {actual_sha}")
            
        header_len = struct.unpack("I", content[:4])[0]
        header = json.loads(content[4:4+header_len].decode('utf-8'))
        raw_start = 4 + header_len
        
        tensors = {}
        for name, meta in header.items():
            start = raw_start + meta["offset"]
            end = start + meta["length"]
            floats = struct.unpack(f"{meta['shape'][0]}f", content[start:end])
            tensors[name] = list(floats)
        return tensors

# Demonstration
weights = {"layer1.weight": [0.42, -0.18, 0.95], "layer1.bias": [0.05]}
sha = SafeTensorSerializer.save(weights, "model.safeweights")
print(f"[SafeSerializer] Saved model. Checksum: sha256:{sha[:16]}...")

loaded = SafeTensorSerializer.load("model.safeweights", expected_sha=sha)
print("[SafeSerializer] Safely loaded weights without code execution:", loaded)`,
      explanation:
        'A pure Python demonstration of safe tensor serialization: stores metadata as JSON and raw floats as bytes, completely bypassing pickle code-execution exploits.',
    },

    sklearnCode: {
      title: 'Production Dockerfile Specification for ML Inference',
      code: `# Multi-Stage Dockerfile for High-Performance ML Inference
# =========================================================================
# STAGE 1: Builder (Compiles dependencies)
# =========================================================================
FROM python:3.11-slim AS builder

WORKDIR /build
RUN apt-get update && apt-get install -y --no-install-recommends \\
    build-essential gcc \\
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir --user -r requirements.txt

# =========================================================================
# STAGE 2: Hardened Production Runtime
# =========================================================================
FROM python:3.11-slim AS runner

WORKDIR /app

# Create unprivileged non-root user
RUN groupadd -g 10001 appgroup && \\
    useradd -u 10001 -g appgroup -s /bin/bash -m appuser

# Copy installed Python packages from builder
COPY --from=builder /root/.local /home/appuser/.local
ENV PATH=/home/appuser/.local/bin:$PATH

# Copy application code & model artifacts
COPY --chown=appuser:appgroup src/ /app/src/
COPY --chown=appuser:appgroup models/ /app/models/

# Switch to non-root user
USER 10001

EXPOSE 8000
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \\
    CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:8000/healthz')" || exit 1

CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "2"]`,
      explanation:
        'A production-grade multi-stage Dockerfile: builds in Stage 1, copies only required packages into Stage 2, runs as unprivileged user 10001, and includes health check assertions.',
    },

    runnableCode: {
      code: `def verify_packaging_security(filename: str, has_checksum: bool, is_non_root: bool):
    checks = []
    if filename.endswith(".safetensors") or filename.endswith(".onnx"):
        checks.append("PASSED: Safe serialization format (zero arbitrary code execution).")
    else:
        checks.append("WARNING: Insecure format detected (avoid raw pickle).")
        
    if has_checksum:
        checks.append("PASSED: Cryptographic SHA-256 integrity digest verified.")
    else:
        checks.append("FAILED: Missing integrity checksum.")
        
    if is_non_root:
        checks.append("PASSED: Container runtime enforces non-root UID (10001).")
    else:
        checks.append("FAILED: Container running as root (security hazard).")
        
    return "\\n".join(checks)

print(verify_packaging_security("model.safetensors", has_checksum=True, is_non_root=True))`,
      expectedOutput: `PASSED: Safe serialization format (zero arbitrary code execution).
PASSED: Cryptographic SHA-256 integrity digest verified.
PASSED: Container runtime enforces non-root UID (10001).`,
    },

    lineByLineExplanation: [
      { lines: '1-6', codeSnippet: 'if filename.endswith(".safetensors") ... PASSED: Safe serialization', explanation: 'Ensures format is memory-mapped data rather than executable pickle bytecode.' },
      { lines: '7-11', codeSnippet: 'if has_checksum: ... PASSED: SHA-256 integrity digest verified', explanation: 'Validates that the file has not been altered or tampered with in transit.' },
      { lines: '12-16', codeSnippet: 'if is_non_root: ... PASSED: Container enforces non-root UID', explanation: 'Enforces container security hardening by preventing root execution.' },
    ],

    hyperparameters: [
      { name: 'python_version', defaultVal: '3.11-slim', range: '3.10-slim to 3.12-slim', effect: 'Base container OS image', recommendation: 'Always use Debian -slim or Alpine to minimize vulnerabilities.' },
      { name: 'container_user_uid', defaultVal: '10001', range: '10000 - 65535', effect: 'User ID under which processes run', recommendation: 'Never use UID 0 (root) in production containers.' },
      { name: 'uvicorn_workers', defaultVal: '2', range: '1 - 8', effect: 'Number of ASGI worker processes', recommendation: 'Set to (2 x CPU cores) for I/O bound APIs; 1 worker per GPU for GPU models.' },
    ],

    assumptions: [
      { assumption: 'Architecture Compatibility', whyItMatters: 'Docker images built on ARM64 (Apple Silicon) will crash on x86_64 cloud servers unless cross-compiled', howToVerify: 'Use docker buildx build --platform linux/amd64 for cloud target.' },
      { assumption: 'Dependency Immutability', whyItMatters: 'Unpinned dependencies (e.g. scikit-learn without version) install breaking changes on subsequent builds', howToVerify: 'Pin exact hashes with pip freeze or poetry.lock.' },
    ],

    commonMistakes: [
      {
        mistake: 'Using pickle.load() on model files downloaded from unverified external URLs',
        solution: 'Use Safetensors or ONNX, or verify cryptographic SHA-256 signatures before loading.',
        whyWrong: 'Pickle files can execute arbitrary shell commands (e.g. reverse shells, data exfiltration) upon loading.',
        howToFix: 'Convert PyTorch weights to Safetensors format using safetensors.torch.save_file().',
      },
      {
        mistake: 'Running Docker containers as the default root user in production Kubernetes clusters',
        solution: 'Define USER appuser (UID 10001) in the Dockerfile.',
        whyWrong: 'A vulnerability in FastAPI or an image library could allow attackers to break out to the host node.',
        howToFix: 'Create appgroup and appuser and switch to USER 10001 before EXPOSE and CMD.',
      },
    ],

    realWorldUseCases: [
      { industry: 'Defense & Aerospace', application: 'Classified Inference Services', benefit: 'Safetensors and hardened containers meet strict zero-trust air-gapped security mandates.' },
      { industry: 'Telecommunications', application: '5G Network Anomaly Detection', benefit: 'Multi-stage slim containers deploy to thousands of edge base-station nodes rapidly.' },
      { industry: 'FinTech', application: 'Automated Loan Underwriting', benefit: 'Cryptographic SHA-256 manifests ensure model binary provenance for banking regulatory audits.' },
    ],

    practiceQuestions: [
      {
        id: 'pq-1',
        question: 'Why is Python pickle inherently insecure for loading model weights in production services?',
        hint: 'What does pickle actually do when deserializing an object?',
        answer: 'Python pickle is a Turing-complete serialization format. Deserializing an object executes Python bytecode, meaning a malicious actor can craft a pickle file that invokes arbitrary system commands (such as os.system or downloading malware) during loading without importing any external libraries.',
        explanation: 'Pickle executes code during deserialization; formats like Safetensors only load raw numbers.',
      },
      {
        id: 'pq-2',
        question: 'What are the two major advantages of multi-stage Docker builds for machine learning applications?',
        hint: 'Consider image size and security attack surface.',
        answer: '1) Drastic image size reduction: Compilers (gcc, g++), build caches, and temporary files are discarded, shrinking images by up to 85% and accelerating auto-scaling cold starts. 2) Security hardening: Removing compilers and package managers removes tools an attacker could use if they gain unauthorized shell access.',
        explanation: 'Multi-stage builds produce smaller, faster, and more secure containers.',
      },
      {
        id: 'pq-3',
        question: 'Why must containerized ML applications run under a non-root user (e.g. UID 10001)?',
        hint: 'Consider the principle of least privilege in cloud security.',
        answer: 'If an application running as root is compromised via an exploit (e.g. buffer overflow in an image parser), the attacker gains root privileges inside the container, drastically increasing the likelihood of a container-escape vulnerability that compromises the underlying host virtual machine.',
        explanation: 'Running as non-root limits the blast radius of any security breach.',
      },
    ],

    quiz: [
      {
        id: 'qz-1',
        question: 'Which model serialization format was engineered specifically to prevent arbitrary code execution vulnerabilities?',
        options: ['Pickle (.pkl)', 'Safetensors (.safetensors)', 'Shelve (.shlv)', 'Marshal (.marshal)'],
        correctIndex: 1,
        explanation: 'Safetensors was created by Hugging Face specifically to store raw tensor buffers safely without any executable code.',
      },
      {
        id: 'qz-2',
        question: 'What is the primary purpose of a Docker multi-stage build?',
        options: [
          'Running multiple models at the same time on one computer',
          'Separating the heavy build environment from the minimal runtime environment to reduce container size and vulnerabilities',
          'Allowing Docker to run without installing Python',
          'Translating Python code directly into Java bytecode',
        ],
        correctIndex: 1,
        explanation: 'Multi-stage builds leave compilers and temporary build artifacts in early stages, resulting in a tiny, secure final container.',
      },
      {
        id: 'qz-3',
        question: 'Why should requirements.txt files pin exact package versions (e.g. scikit-learn==1.4.2)?',
        options: [
          'Because Python cannot run unpinned packages',
          'To prevent breaking changes or numerical differences caused by automatic minor/major package updates in the future',
          'Because pinned files download faster from the internet',
          'To make the file look longer',
        ],
        correctIndex: 1,
        explanation: 'Exact pinning guarantees that building the container today, next week, or next year produces identical software environments.',
      },
    ],

    independentExercise: {
      id: 'ex-05-docker-validator',
      title: 'Audit Dockerfile Instructions for Production Compliance',
      problem: 'Write a Python function `audit_dockerfile(dockerfile_text)` that checks for three security best practices: 1) Has multi-stage build ("FROM ... AS"), 2) Enforces non-root user ("USER" followed by a non-root name or UID), 3) Implements a HEALTHCHECK ("HEALTHCHECK"). Return a dictionary with boolean flags and an overall "is_production_ready" boolean.',
      hints: [
        'Check for "AS" in FROM lines',
        'Check for "USER" keyword followed by non-root',
        'Check for "HEALTHCHECK" keyword',
      ],
      starterCode: `def audit_dockerfile(dockerfile_text: str) -> dict:
    # TODO: Implement Dockerfile compliance audit
    pass

# Test sample
df_sample = """
FROM python:3.11-slim AS builder
RUN pip install torch
FROM python:3.11-slim AS runner
USER 10001
HEALTHCHECK CMD curl http://localhost:8000/healthz
"""
print(audit_dockerfile(df_sample))`,
      solution: `def audit_dockerfile(dockerfile_text: str) -> dict:
    has_multistage = "AS" in dockerfile_text and dockerfile_text.count("FROM") >= 2
    has_user = "USER" in dockerfile_text and "USER root" not in dockerfile_text and "USER 0" not in dockerfile_text
    has_healthcheck = "HEALTHCHECK" in dockerfile_text
    
    return {
        "multi_stage": has_multistage,
        "non_root_user": has_user,
        "has_healthcheck": has_healthcheck,
        "is_production_ready": has_multistage and has_user and has_healthcheck
    }

df_sample = """
FROM python:3.11-slim AS builder
RUN pip install torch
FROM python:3.11-slim AS runner
USER 10001
HEALTHCHECK CMD curl http://localhost:8000/healthz
"""
print(audit_dockerfile(df_sample))`,
    },

    summary: {
      keyTakeaways: [
        'Pickle files are hazardous in production due to arbitrary remote code execution vulnerabilities; use Safetensors or ONNX.',
        'Deterministic lockfiles and pinned dependencies prevent silent numerical drift and train-serving skew.',
        'Multi-stage Docker builds reduce container sizes by 80%+, eliminating compilers and accelerating auto-scaling cold starts.',
        'Always run production containers as unprivileged non-root users (e.g. UID 10001) with active health check probes.',
      ],
      nextLessonId: 'mlops-06-serving-apis',
    },
  },

  'mlops-06-serving-apis': {
    id: 'mlops-06-serving-apis',
    moduleId: 'p10-m6',
    title: 'MLOps-06: Model Serving & REST APIs with FastAPI',
    subtitle: 'Batch vs Online Inference, FastAPI, Pydantic Validation & Health Probes',
    order: 1,
    readTimeMinutes: 35,
    difficulty: 'Intermediate',
    visualizerType: 'mlops-model-release-explorer',

    objectives: [
      'Compare batch inference (offline high-throughput) versus online inference (real-time low-latency REST/gRPC)',
      'Build a production-grade inference service using FastAPI and asynchronous request handling',
      'Enforce strict input and output contracts using Pydantic data models to prevent malformed inference payloads',
      'Manage model memory lifecycle using FastAPI lifespan context managers (load on startup, clean on shutdown)',
      'Implement standardized Kubernetes-compatible health (/healthz) and readiness (/ready) endpoints',
    ],

    prerequisites: [
      'Understanding of REST APIs (HTTP methods, status codes, JSON payloads)',
      'Basic knowledge of Python type hints and classes',
    ],
    previousLesson: {
      id: 'mlops-05-packaging-environments',
      title: 'MLOps-05: Model Packaging & Docker Environments',
      moduleId: 'p10-m5',
    },

    analogy: {
      title: 'The Drive-Thru Window vs The Overnight Freight Shipping Container',
      text: 'Batch inference is like shipping cargo via overnight freight trains. You accumulate 500,000 customer packages, load them onto train cars at 2:00 AM, and process them all in bulk over 4 hours. Throughput is enormous and cost per package is low, but a customer waiting for their package must wait until morning. Online inference is like a fast-food drive-thru window: a customer pulls up, orders a meal (HTTP POST request), the kitchen cooks it immediately, and hands it through the window in under 400 milliseconds. FastAPI is the drive-thru order management system: it checks that the order is valid (Pydantic), routes it to the chef, and ensures orders do not crash the restaurant.',
      metaphor: 'Batch inference processes massive datasets overnight; online inference delivers millisecond answers to live users.',
    },

    problemSolved: {
      title: 'The Fragile Script-in-Production Anti-Pattern',
      description:
        'Loading a 500MB model inside every incoming HTTP request handler re-allocates memory on every call, causing 2-second latencies and instant Out-Of-Memory (OOM) crashes under load. Furthermore, unvalidated JSON dictionaries crash Python processes when unexpected datatypes or missing keys are passed.',
      keyPoints: [
        'Lifespan Memory Management: Load model weights once into RAM/GPU at server startup; share across all requests in zero-copy read-only mode',
        'Pydantic Schema Validation: Reject malformed inputs automatically with HTTP 422 Unprocessable Entity before calling model code',
        'Asynchronous Throughput: FastAPI ASGI architecture handles concurrent I/O operations without blocking worker threads',
        'Kubernetes Probes: /healthz checks if process is alive; /ready checks if model weights are loaded and ready to serve traffic',
      ],
    },

    intuition: {
      overview:
        'A production ML API wraps an in-memory trained estimator inside a typed web framework. Incoming requests are validated against schemas, processed through the estimator, and formatted into typed response envelopes.',
      steps: [
        {
          step: 1,
          title: 'Startup & Model Hydration (Lifespan)',
          description:
            'When the FastAPI application boots, the lifespan context loads the model artifact, verifies checksums, and warms up the inference engine.',
        },
        {
          step: 2,
          title: 'Readiness Probe Check',
          description:
            'Kubernetes or load balancers probe `/ready`. The endpoint returns HTTP 200 OK only after model weights are loaded, preventing dropped traffic.',
        },
        {
          step: 3,
          title: 'Request Ingestion & Validation',
          description:
            'A client sends JSON. Pydantic validates data types, ranges, and missing fields. If invalid, a clear error response is returned instantly.',
        },
        {
          step: 4,
          title: 'Inference Execution & Response',
          description:
            'The preprocessor transforms valid features; the model computes predictions; and the API returns a structured, typed JSON response with latency metadata.',
        },
      ],
    },

    mathematics: {
      overview:
        'Inference performance is governed by Queuing Theory (Little’s Law) balancing arrival rate lambda, service time W, and concurrency L.',
      foundations: [
        {
          name: "Little's Law in Serving Systems",
          latex: 'L = \\lambda \\cdot W',
          explanation:
            'Average concurrent requests in system L equals arrival rate lambda multiplied by average request turnaround time W. Reducing model latency W directly multiplies endpoint throughput capacity.',
        },
        {
          name: 'Percentile Latency Formulation (P95 / P99)',
          latex: 'P_{95} = \\inf \\{ t \\in \\mathbb{R} \\mid F(t) \\ge 0.95 \\}',
          explanation:
            'P95 latency is the time within which 95% of incoming inference requests are completed, representing real-world user experience far better than mean latency.',
        },
      ],
    },

    derivation: {
      title: 'Derivation of Batch vs Online Inference Throughput Trade-off',
      objective: 'Demonstrate why dynamic batching optimizes GPU efficiency while trading latency.',
      steps: [
        {
          step: 1,
          label: 'Single-Sample Online Latency',
          latex: 't_{\\text{online}} = t_{\\text{overhead}} + t_{\\text{compute}}(1)',
          explanation: 'In online inference (batch size = 1), framework and memory transfer overhead dominate compute time.',
        },
        {
          step: 2,
          label: 'Batched Vectorized Latency',
          latex: 't_{\\text{batch}}(B) = t_{\\text{overhead}} + B \\cdot \\frac{t_{\\text{compute}}(B)}{B}',
          explanation: 'Running batch B amortizes memory bandwidth and kernel launch overhead across B samples.',
        },
        {
          step: 3,
          label: 'Throughput Maximization',
          latex: '\\text{Throughput}(B) = \\frac{B}{t_{\\text{batch}}(B)} \\gg \\frac{1}{t_{\\text{online}}}',
          explanation: 'Increasing batch size B boosts overall throughput samples/sec at the expense of slight tail latency increase for the first sample.',
        },
      ],
    },

    variables: [
      { symbol: '\\lambda', name: 'Request Arrival Rate', description: 'Incoming queries per second (QPS / RPS)' },
      { symbol: 'W', name: 'Service Time', description: 'End-to-end request latency including preprocessing and model forward pass' },
      { symbol: 'B', name: 'Batch Size', description: 'Number of inference records processed concurrently in a single matrix operation' },
      { symbol: 'P_{95}', name: '95th Percentile Latency', description: 'Latency threshold under which 95% of queries complete' },
    ],

    numericalExample: {
      scenario: 'Evaluating throughput and concurrency requirements under Little’s Law for an ML recommendation endpoint',
      dataset: [
        { qps: 200, avgLatencySec: 0.045, p95LatencySec: 0.080 }, // 45ms average
        { qps: 1000, avgLatencySec: 0.045, p95LatencySec: 0.085 },
      ],
      calculations: [
        { step: 'Required Concurrency at 200 QPS', math: 'L = 200 \\times 0.045', result: '9 concurrent worker threads needed' },
        { step: 'Required Concurrency at 1000 QPS', math: 'L = 1000 \\times 0.045', result: '45 concurrent worker threads needed' },
      ],
      finalConclusion: 'At 1,000 QPS and 45ms service latency, the cluster must support 45 concurrent execution threads to prevent request queue backlog.',
    },

    visualExplanation: {
      title: 'FastAPI Inference Microservice Architecture',
      description:
        'A blueprint showing client requests entering ASGI server, being validated by Pydantic, processed by shared in-memory model, and monitored via health endpoints.',
      features: [
        'ASGI Worker Pool: Uvicorn workers manage concurrent HTTP requests without thread starvation',
        'Lifespan Warmup: Model loaded once during startup into shared memory',
        'Pydantic Guard: Rejects invalid fields with HTTP 422 before touching the ML model',
        'K8s Health Matrix: /healthz (liveness probe) and /ready (readiness probe)',
      ],
    },

    scratchCode: {
      title: 'Complete Production FastAPI Inference Service',
      code: `from contextlib import asynccontextmanager
from typing import List
import time

# Mock FastAPI & Pydantic primitives in pure Python for demonstration
class PredictionRequest:
    def __init__(self, age: int, credit_score: int, annual_income: float):
        if not (18 <= age <= 100):
            raise ValueError("Age must be between 18 and 100")
        if not (300 <= credit_score <= 850):
            raise ValueError("Credit score must be between 300 and 850")
        if annual_income < 0:
            raise ValueError("Income must be non-negative")
        self.age = age
        self.credit_score = credit_score
        self.annual_income = annual_income

class MockInferenceApp:
    def __init__(self):
        self.model = None
        self.is_ready = False

    def lifespan_startup(self):
        print("[Lifespan] Loading model weights into memory...")
        # Simulate loading LightGBM weights
        self.model = {"weights": [0.02, 0.005, 0.0001], "threshold": 0.5}
        self.is_ready = True
        print("[Lifespan] Model loaded successfully. Service READY.")

    def healthz(self):
        """Liveness probe: verifies process is alive"""
        return {"status": "ok"}

    def ready(self):
        """Readiness probe: verifies model is hydrated and ready to serve"""
        if not self.is_ready:
            return {"status": "loading", "code": 503}
        return {"status": "ready", "code": 200}

    def predict(self, req: PredictionRequest):
        if not self.is_ready:
            raise RuntimeError("Model not ready to serve traffic")
        start = time.time()
        # Mock inference computation
        score = (req.age * self.model["weights"][0] +
                 req.credit_score * self.model["weights"][1] +
                 req.annual_income * self.model["weights"][2])
        prob = min(1.0, max(0.0, score / 10.0))
        prediction = 1 if prob >= self.model["threshold"] else 0
        latency_ms = round((time.time() - start) * 1000, 3)
        
        return {
            "prediction": prediction,
            "probability": round(prob, 4),
            "model_version": "v1.2.0",
            "latency_ms": latency_ms
        }

# Execution
app = MockInferenceApp()
app.lifespan_startup()
print("Health:", app.healthz())
print("Readiness:", app.ready())

req = PredictionRequest(age=35, credit_score=740, annual_income=85000.0)
resp = app.predict(req)
print("Prediction Response:", resp)`,
      explanation:
        'A comprehensive inference service demonstrating lifespan model hydration, strict parameter validation bounds, health/readiness endpoints, and latency reporting.',
    },

    sklearnCode: {
      title: 'FastAPI Production Implementation with Pydantic Schemas',
      code: `# Standard Production FastAPI Implementation
# pip install fastapi uvicorn pydantic scikit-learn
import numpy as np
from contextlib import asynccontextmanager

# Conceptual code representation
"""
from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel, Field

class LoanFeatureInput(BaseModel):
    age: int = Field(..., ge=18, le=100, description="Applicant age in years")
    annual_income: float = Field(..., ge=0.0, description="Annual income in USD")
    debt_to_income: float = Field(..., ge=0.0, le=1.0, description="DTI ratio between 0 and 1")

class LoanPredictionOutput(BaseModel):
    approved: bool
    risk_score: float
    model_version: str

ml_models = {}

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Load model once
    print("Loading production model into memory...")
    ml_models["classifier"] = lambda x: 0.12 # mock model
    yield
    # Shutdown: Clean memory
    ml_models.clear()

app = FastAPI(title="Loan Underwriting ML API", lifespan=lifespan)

@app.get("/healthz", status_code=status.HTTP_200_OK)
def health_check():
    return {"status": "healthy"}

@app.get("/ready", status_code=status.HTTP_200_OK)
def readiness_check():
    if "classifier" not in ml_models:
        raise HTTPException(status_code=503, detail="Model hydrating")
    return {"status": "ready"}

@app.post("/predict", response_model=LoanPredictionOutput)
def predict(payload: LoanFeatureInput):
    score = ml_models["classifier"](payload)
    return LoanPredictionOutput(
        approved=score < 0.35,
        risk_score=score,
        model_version="loan_risk_v2.1"
    )
"""
print("FastAPI schema & lifespan pattern registered successfully.")`,
      explanation:
        'The canonical FastAPI production pattern: asynccontextmanager lifespan for model loading, Pydantic Field constraints for parameter bounds, and distinct healthz/ready routes.',
    },

    runnableCode: {
      code: `def simulate_api_call(age, credit_score, income):
    if not (18 <= age <= 100):
        return {"error": "HTTP 422: Age must be 18-100", "status_code": 422}
    
    # Feature vector calculation
    prob = round((credit_score / 850.0) * 0.7 + (min(income, 100000) / 100000.0) * 0.3, 3)
    return {
        "status_code": 200,
        "data": {
            "approved": prob > 0.65,
            "credit_score": credit_score,
            "approval_probability": prob,
            "model_version": "v1.2.0"
        }
    }

print(simulate_api_call(age=29, credit_score=740, income=85000))
print(simulate_api_call(age=15, credit_score=740, income=85000))`,
      expectedOutput: `{'status_code': 200, 'data': {'approved': True, 'credit_score': 740, 'approval_probability': 0.865, 'model_version': 'v1.2.0'}}
{'error': 'HTTP 422: Age must be 18-100', 'status_code': 422}`,
    },

    lineByLineExplanation: [
      { lines: '1-3', codeSnippet: 'if not (18 <= age <= 100): return 422', explanation: 'Enforces schema validation contracts before invoking the predictive model.' },
      { lines: '5-6', codeSnippet: 'prob = round(...) ... approval_probability', explanation: 'Computes probability using validated numerical features.' },
      { lines: '7-14', codeSnippet: 'return { "status_code": 200, "data": ... }', explanation: 'Returns structured JSON payload containing business prediction and metadata.' },
    ],

    hyperparameters: [
      { name: 'concurrency_workers', defaultVal: '2', range: '1 - 16', effect: 'Number of worker processes handling queries', recommendation: 'Set to 2-4 workers per container to prevent CPU thrashing.' },
      { name: 'request_timeout_sec', defaultVal: '5.0s', range: '0.5s - 30s', effect: 'Maximum time before client request is timed out', recommendation: 'Set to 2.0-5.0s to prevent hung threads from consuming memory.' },
      { name: 'max_batch_size', defaultVal: '32', range: '1 - 256', effect: 'Maximum batch size for dynamic batching', recommendation: 'Use batch=1 for low latency; batch=32-64 for high-throughput GPU workloads.' },
    ],

    assumptions: [
      { assumption: 'Model Thread-Safety', whyItMatters: 'If model.predict() modifies internal state, concurrent requests cause race conditions and corrupted predictions', howToVerify: 'Ensure model is used strictly in read-only inference mode or protect with threading locks.' },
      { assumption: 'Memory Availability', whyItMatters: 'If container memory limit is lower than model size + working buffer, OOM killer kills process', howToVerify: 'Provision container RAM to at least 2.5x the serialized model weight size.' },
    ],

    commonMistakes: [
      {
        mistake: 'Loading model weights inside the prediction route function instead of global/lifespan context',
        solution: 'Load model weights once inside the lifespan context manager.',
        whyWrong: 'Every single API request will read the 500MB model from disk, causing massive latency and immediate OOM crashes.',
        howToFix: 'Use FastAPI lifespan or module-level caching so the model is loaded exactly once into RAM at startup.',
      },
      {
        mistake: 'Accepting raw untyped dictionaries (def predict(data: dict)) without schema validation',
        solution: 'Always declare typed Pydantic models with explicit field constraints.',
        whyWrong: 'Missing keys, string inputs where floats are expected, or NaN values will crash the prediction code with 500 errors.',
        howToFix: 'Create a Pydantic BaseModel with ge, le, and type constraints for every feature.',
      },
    ],

    realWorldUseCases: [
      { industry: 'FinTech', application: 'Real-time Fraud Scoring API', benefit: 'Scores card transactions in under 25ms to authorize point-of-sale terminal purchases.' },
      { industry: 'Healthcare', application: 'Emergency Room Triage Classifier', benefit: 'Validates vital signs and predicts admission probability with strict schema typing.' },
      { industry: 'Logistics', application: 'Dynamic Delivery ETA Service', benefit: 'Handles 10,000 requests/sec across containerized FastAPI clusters behind Envoy load balancers.' },
    ],

    practiceQuestions: [
      {
        id: 'pq-1',
        question: 'What is the operational difference between the /healthz liveness probe and the /ready readiness probe?',
        hint: 'Think about what each probe tells Kubernetes to do with the container.',
        answer: '/healthz (liveness) checks whether the web server process is alive; if it fails, Kubernetes kills and restarts the container. /ready (readiness) checks whether the model weights have finished loading into memory and are ready to serve traffic; if it fails, Kubernetes keeps the container running but temporarily routes traffic to other healthy pods.',
        explanation: 'Liveness triggers container restarts; readiness controls traffic routing.',
      },
      {
        id: 'pq-2',
        question: 'Why should machine learning models be loaded using the FastAPI lifespan context manager?',
        hint: 'Consider when the model should be placed in RAM and when memory should be released.',
        answer: 'The lifespan context manager executes setup code before the server begins accepting requests and teardown code when the server shuts down. This ensures model weights are loaded into memory once at startup and are shared read-only across all incoming requests, eliminating redundant disk I/O and latency.',
        explanation: 'Lifespan guarantees that models are hydrated before any user requests arrive.',
      },
      {
        id: 'pq-3',
        question: 'In what scenarios should an organization choose batch inference over real-time online inference?',
        hint: 'Consider user wait tolerance, throughput, and compute cost.',
        answer: 'Batch inference is chosen when predictions do not need to be returned instantly (e.g. generating nightly recommendation emails, computing monthly credit scores, or analyzing historical log archives). Batch inference is significantly cheaper and achieves much higher throughput because compute can be scheduled during off-peak hours using optimized matrix batching.',
        explanation: 'Batch inference maximizes throughput when millisecond latency is not required.',
      },
    ],

    quiz: [
      {
        id: 'qz-1',
        question: 'Which HTTP status code is returned by FastAPI when an incoming request fails Pydantic schema validation?',
        options: ['200 OK', '404 Not Found', '422 Unprocessable Entity', '500 Internal Server Error'],
        correctIndex: 2,
        explanation: 'FastAPI automatically returns HTTP 422 Unprocessable Entity with detailed JSON describing which fields failed validation.',
      },
      {
        id: 'qz-2',
        question: 'What happens if you load a machine learning model inside the FastAPI route function instead of during startup?',
        options: [
          'The model becomes 10x more accurate',
          'Every incoming request reloads the model from disk into RAM, causing extreme latency spikes and memory crashes',
          'The internet connection immediately disconnects',
          'FastAPI automatically turns into a batch pipeline',
        ],
        correctIndex: 1,
        explanation: 'Loading the model inside the request handler re-reads the model on every single call, destroying performance and causing out-of-memory errors.',
      },
      {
        id: 'qz-3',
        question: 'According to Little’s Law (L = lambda * W), what is the direct consequence of halving the model inference latency W?',
        options: [
          'The model accuracy is cut in half',
          'The endpoint requires half as many concurrent in-flight requests to handle the same arrival rate lambda, doubling available capacity',
          'The server memory usage doubles',
          'The database schema is deleted',
        ],
        correctIndex: 1,
        explanation: 'Reducing service time W reduces the number of concurrent in-flight requests L, allowing the same hardware to handle higher throughput.',
      },
    ],

    independentExercise: {
      id: 'ex-06-pydantic-validator',
      title: 'Build a Strict Feature Validation Engine',
      problem: 'Write a Python function `validate_feature_payload(payload: dict)` that validates: 1) "age" is an int between 18 and 100, 2) "income" is a float >= 0.0, 3) "fico" is an int between 300 and 850. If valid, return `{"valid": True, "cleaned": payload}`. If invalid, return `{"valid": False, "error": str}`.',
      hints: [
        'Check isinstance for types (int, float)',
        'Check boundary conditions for age and fico',
      ],
      starterCode: `def validate_feature_payload(payload: dict) -> dict:
    # TODO: Implement strict schema verification
    pass

# Test
print(validate_feature_payload({"age": 32, "income": 75000.0, "fico": 720}))
print(validate_feature_payload({"age": 14, "income": 75000.0, "fico": 720}))`,
      solution: `def validate_feature_payload(payload: dict) -> dict:
    if "age" not in payload or not isinstance(payload["age"], int) or not (18 <= payload["age"] <= 100):
        return {"valid": False, "error": "Field 'age' must be an integer between 18 and 100"}
    if "income" not in payload or not isinstance(payload["income"], (int, float)) or payload["income"] < 0:
        return {"valid": False, "error": "Field 'income' must be a non-negative number"}
    if "fico" not in payload or not isinstance(payload["fico"], int) or not (300 <= payload["fico"] <= 850):
        return {"valid": False, "error": "Field 'fico' must be an integer between 300 and 850"}
    return {"valid": True, "cleaned": payload}

print(validate_feature_payload({"age": 32, "income": 75000.0, "fico": 720}))
print(validate_feature_payload({"age": 14, "income": 75000.0, "fico": 720}))`,
    },

    summary: {
      keyTakeaways: [
        'Online inference requires low latency and strict schema validation; batch inference prioritizes massive bulk throughput.',
        'Load model weights once during startup using FastAPI lifespan contexts to prevent latency and OOM disasters.',
        'Use Pydantic models with field constraints to reject malformed inputs automatically with HTTP 422.',
        'Expose /healthz (liveness) and /ready (readiness) probes to enable reliable orchestration by Kubernetes and load balancers.',
      ],
      nextLessonId: 'mlops-07-cicd-ml',
    },
  },
};
