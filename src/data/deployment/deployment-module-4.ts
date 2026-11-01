import { ModuleData, LessonContent } from '@/lib/types';

// =========================================================================
// MODULE 10: Background Jobs and Async Inference (p11-m10)
// =========================================================================
export const p11m10Data: ModuleData = {
  id: 'p11-m10',
  number: 10,
  title: 'Background Jobs and Async Inference',
  subtitle: 'Task Queues, Worker Pools, Polling Patterns & Webhook Callbacks',
  description:
    'Decouple heavy, long-running AI inference workloads from synchronous web APIs. Master HTTP 202 Accepted response patterns, message brokers (Redis, RabbitMQ), worker state machines, client polling vs webhook callbacks, exponential backoff with full jitter, and idempotent task deduplication.',
  icon: 'ListTree',
  badge: 'Phase 11 · AI Deployment',
  estimatedHours: 3,
  topicsCount: 1,
  lessons: [
    {
      id: 'deploy-10-background-async-jobs',
      moduleId: 'p11-m10',
      title: 'Deploy-10: Background Jobs & Asynchronous Inference',
      description:
        'Implement 202 Accepted async task queues, polling status endpoints, webhook push notifications, and exponential backoff retry schedules.',
      order: 1,
      readTimeMinutes: 36,
      visualizerType: 'deploy-async-job-queue-explorer',
      difficulty: 'Intermediate',
    },
  ],
};

// =========================================================================
// MODULE 11: GPU and Deep Learning Serving (p11-m11)
// =========================================================================
export const p11m11Data: ModuleData = {
  id: 'p11-m11',
  number: 11,
  title: 'GPU and Deep Learning Serving',
  subtitle: 'VRAM Allocation, Batching, Cold Starts, Quantization & Serving Engines',
  description:
    'Deploy and optimize deep neural networks on hardware accelerators. Master GPU VRAM budgeting, host-to-device transfers, dynamic batching, INT8/INT4 quantization trade-offs, cold-start mitigation, and specialized serving engines (Triton, ONNX Runtime, TensorRT) with zero required GPU hardware.',
  icon: 'Cpu',
  badge: 'Phase 11 · AI Deployment',
  estimatedHours: 3,
  topicsCount: 1,
  lessons: [
    {
      id: 'deploy-11-gpu-dl-serving',
      moduleId: 'p11-m11',
      title: 'Deploy-11: GPU Acceleration & Deep Learning Serving',
      description:
        'Calculate VRAM allocation, analyze the Roofline model, explore dynamic batching throughput, and evaluate quantization trade-offs.',
      order: 1,
      readTimeMinutes: 38,
      visualizerType: 'deploy-gpu-resource-explorer',
      difficulty: 'Advanced',
    },
  ],
};

// =========================================================================
// MODULE 12: Production LLM Serving (p11-m12)
// =========================================================================
export const p11m12Data: ModuleData = {
  id: 'p11-m12',
  number: 12,
  title: 'Production LLM Serving',
  subtitle: 'Hosted APIs vs Open Weights, Token Streaming, vLLM & Fallback Routing',
  description:
    'Operate large language models at scale. Compare hosted commercial APIs with self-hosted open-weight models, implement Server-Sent Events (SSE) token streaming, optimize Time-to-First-Token (TTFT) and Inter-Token Latency (ITL), master vLLM PagedAttention continuous batching, and configure tiered fallback routing.',
  icon: 'Sparkles',
  badge: 'Phase 11 · AI Deployment',
  estimatedHours: 3,
  topicsCount: 1,
  lessons: [
    {
      id: 'deploy-12-production-llm-serving',
      moduleId: 'p11-m12',
      title: 'Deploy-12: Production LLM Serving & Streaming Architectures',
      description:
        'Stream LLM tokens via Server-Sent Events, analyze TTFT vs ITL metrics, configure vLLM continuous batching, and implement tiered model fallbacks.',
      order: 1,
      readTimeMinutes: 38,
      visualizerType: 'deploy-llm-serving-latency-explorer',
      difficulty: 'Advanced',
    },
  ],
};

// =========================================================================
// LESSON CONTENTS (Modules 10 - 12)
// =========================================================================
export const deploymentModule4Lessons: Record<string, LessonContent> = {
  'deploy-10-background-async-jobs': {
    id: 'deploy-10-background-async-jobs',
    moduleId: 'p11-m10',
    title: 'Deploy-10: Background Jobs & Asynchronous Inference',
    subtitle: 'Job Queues, Worker Pools, Polling Patterns & Webhook Callbacks',
    order: 1,
    readTimeMinutes: 36,
    difficulty: 'Intermediate',
    visualizerType: 'deploy-async-job-queue-explorer',

    objectives: [
      'Distinguish synchronous request-response from asynchronous background task execution',
      'Implement the HTTP 202 Accepted polling lifecycle with task ID generation and status endpoints',
      'Construct a resilient background worker loop with task state machines (QUEUED, RUNNING, SUCCESS, FAILED)',
      'Apply exponential backoff with full jitter to recover from transient GPU CUDA OOMs or network glitches',
      'Enforce idempotency keys to prevent duplicate computation and billing on retransmitted tasks',
    ],

    prerequisites: [
      'Deploy-05 (FastAPI) and Deploy-09 (Scaling & Load Balancing)',
      'Basic understanding of multi-threading or async event loops in Python',
    ],
    previousLesson: {
      id: 'deploy-09-scaling-load-balancing',
      title: 'Deploy-09: Scaling & Load Balancing AI Inference Services',
      moduleId: 'p11-m9',
    },

    analogy: {
      title: 'The Coffee Shop Order Beeper / Buzzer System',
      text: 'Synchronous APIs are like ordering a custom pour-over coffee while standing at the cash register: you refuse to step aside, forcing all 40 customers behind you to wait 8 minutes until your drink is brewed. Asynchronous job queues are the vibrating order buzzer: you order, the cashier immediately hands you a numbered buzzer (Task ID) in 3 seconds (HTTP 202 Accepted), you go sit down (non-blocking), and when your buzzer vibrates (webhook or status poll), you collect your coffee from the counter.',
      metaphor: 'HTTP 202 is the vibrating buzzer; the barista queue is the background Celery/Redis worker pool.',
    },

    problemSolved: {
      title: 'Preventing Gateway Timeouts on Heavy AI Workloads',
      description:
        'Modern generative AI models—such as Stable Diffusion generating high-resolution images (15s) or Whisper transcribing an hour of audio (45s)—far exceed standard web proxy timeouts (typically 5 to 30 seconds). Holding open synchronous HTTP connections exhausts server socket pools and causes 504 Gateway Timeouts.',
      keyPoints: [
        'Holding open synchronous HTTP connections for minutes consumes expensive web server thread slots',
        'Asynchronous job queues decouple client intake (sub-15ms) from compute-intensive execution',
        'If a worker crashes mid-task, dead-letter queues and retry policies re-enqueue the job without losing customer data',
        'Idempotency keys ensure that if a mobile client disconnects and retries, the model does not run twice',
      ],
    },

    intuition: {
      overview:
        'Async architectures use message brokers as buffers between lightweight ingress APIs and dedicated worker clusters.',
      steps: [
        {
          step: 1,
          title: 'Task Submission & Admission',
          description:
            'Client submits an inference payload. The API generates a UUID task ID, enqueues the job payload into a Redis/RabbitMQ queue, and returns HTTP 202 Accepted with a polling URL in under 15ms.',
        },
        {
          step: 2,
          title: 'Worker Task Consumption',
          description:
            'Independent background worker instances poll the queue, update the task state to PROCESSING, and run the heavy model forward pass.',
        },
        {
          step: 3,
          title: 'Result Storage & Notification',
          description:
            'When inference finishes, the worker writes output to a database or object store, marks state as SUCCESS, and optionally triggers an HTTP POST webhook back to the client.',
        },
        {
          step: 4,
          title: 'Jittered Retries & Dead-Letter Handling',
          description:
            'If a worker suffers a transient GPU error, the task is rescheduled using exponential backoff with randomized jitter to prevent thundering herd retries.',
        },
      ],
    },

    mathematics: {
      overview:
        'Retry schedules in distributed queues employ randomized exponential backoff to avoid synchronized queue thundering herds.',
      foundations: [
        {
          name: 'Exponential Backoff with Full Jitter Formula',
          latex: 't_{\\text{delay}} = \\text{Uniform}\\left(0, \\min(t_{\\text{max}}, t_{\\text{base}} \\times 2^{k-1})\\right)',
          explanation:
            'For retry attempt k, delay is a uniformly distributed random value between 0 and the exponentially capped backoff limit, spreading retries evenly across time.',
        },
        {
          name: 'Queue Draining Rate (M/M/c Queue)',
          latex: 'T_{\\text{drain}} = \\frac{N_{\\text{queued}}}{c \\times \\mu}',
          explanation:
            'Time required to drain a queue backlog of N tasks given c worker processes running at individual completion rate mu.',
        },
      ],
    },

    derivation: {
      title: 'Derivation of Full Jitter vs Naive Exponential Backoff Collision Rate',
      objective: 'Calculate why naive exponential backoff causes server meltdowns under transient database outages.',
      steps: [
        {
          step: 1,
          label: 'Naive Deterministic Backoff Collision',
          latex: 't_{\\text{naive}}(k) = t_{\\text{base}} \\times 2^{k-1}',
          explanation: 'If 100 concurrent tasks fail simultaneously at t=0, all 100 tasks retry at the exact same millisecond t=2s, then t=4s, repeatedly crashing the database.',
        },
        {
          step: 2,
          label: 'Full Jitter Probability Density',
          latex: 'f(t) = \\frac{1}{t_{\\text{cap}}(k)}, \\quad 0 \\le t \\le t_{\\text{cap}}(k)',
          explanation: 'Full jitter randomizes retry timestamps uniformly across the entire backoff interval.',
        },
        {
          step: 3,
          label: 'Peak Concurrent Retry Load Reduction',
          latex: '\\text{Peak Load}_{\\text{jitter}} \\approx \\frac{\\text{Total Failed Tasks}}{t_{\\text{cap}}(k)} \\ll \\text{Total Failed Tasks}',
          explanation: 'Full jitter flattens the retry impulse spike into a smooth, manageable background trickle.',
        },
      ],
    },

    variables: [
      { symbol: 't_{\\text{base}}', name: 'Base Delay', description: 'Initial retry backoff delay (typically 1.0 second)' },
      { symbol: 't_{\\text{max}}', name: 'Maximum Delay Cap', description: 'Upper ceiling on retry backoff (e.g. 30.0 or 60.0 seconds)' },
      { symbol: 'k', name: 'Attempt Number', description: 'Sequential retry iteration count (1, 2, 3...)' },
      { symbol: 'N_{\\text{queued}}', name: 'Queue Depth', description: 'Total backlog tasks waiting in the broker queue' },
    ],

    numericalExample: {
      scenario: 'Calculating full jitter retry delays for a task experiencing 4 consecutive transient GPU CUDA memory allocation errors.',
      dataset: [
        { attempt: 'Attempt 1 (k=1)', max_delay: '1.0 * 2^0 = 1.0s', range: '[0.0, 1.0s]' },
        { attempt: 'Attempt 2 (k=2)', max_delay: '1.0 * 2^1 = 2.0s', range: '[0.0, 2.0s]' },
        { attempt: 'Attempt 3 (k=3)', max_delay: '1.0 * 2^2 = 4.0s', range: '[0.0, 4.0s]' },
        { attempt: 'Attempt 4 (k=4)', max_delay: '1.0 * 2^3 = 8.0s', range: '[0.0, 8.0s]' },
      ],
      calculations: [
        {
          step: '1. Sample Jittered Delays',
          math: 'Random sample within each range',
          result: 'k=1: 0.42s | k=2: 1.68s | k=3: 2.15s | k=4: 7.34s',
        },
        {
          step: '2. Total Elapsed Recovery Window',
          math: '0.42 + 1.68 + 2.15 + 7.34',
          result: '11.59 seconds before 4th attempt',
        },
      ],
      finalConclusion: 'Jitter spreads out worker retries across an 11.6-second window, giving the GPU manager ample time to recover.',
    },

    visualExplanation: {
      title: 'Exploring the Async Job Queue Visualizer',
      description:
        'The interactive visualizer simulates an asynchronous task queue broker (Redis/Celery) feeding worker pools. Enqueue long-running tasks, observe worker status transitions, and test failure injection.',
      features: [
        'Enqueue diverse workloads: Whisper Audio Transcription (~35s), SDXL Image Generation (~18s), and Batch Embeddings',
        'Toggle Client Polling vs Webhook Callback delivery patterns',
        'Inject simulated CUDA Out-Of-Memory errors to observe exponential backoff retries and state transitions',
      ],
    },

    scratchCode: {
      title: 'Python from Scratch: In-Memory Async Task Queue & Worker Pool',
      explanation: 'A pure Python asynchronous task queue implementing state management, job submission, and background worker threads.',
      code: `import queue
import threading
import time
import uuid

class AsyncTaskQueue:
    """Lightweight in-memory task queue demonstrating 202 Accepted patterns."""
    def __init__(self, num_workers: int = 2):
        self.task_queue = queue.Queue()
        self.task_store: dict[str, dict] = {}
        self.workers = []
        self.running = True

        for i in range(num_workers):
            t = threading.Thread(target=self._worker_loop, args=(f"worker-{i+1}",), daemon=True)
            t.start()
            self.workers.append(t)

    def submit_job(self, task_type: str, payload: dict) -> str:
        task_id = f"task_{uuid.uuid4().hex[:8]}"
        self.task_store[task_id] = {
            "id": task_id,
            "type": task_type,
            "status": "QUEUED",
            "progress": 0,
            "result": None,
            "created_at": time.time(),
        }
        self.task_queue.put((task_id, task_type, payload))
        return task_id

    def get_status(self, task_id: str) -> dict:
        return self.task_store.get(task_id, {"status": "NOT_FOUND"})

    def _worker_loop(self, worker_name: str):
        while self.running:
            try:
                task_id, task_type, payload = self.task_queue.get(timeout=1.0)
            except queue.Empty:
                continue

            self.task_store[task_id]["status"] = "PROCESSING"
            self.task_store[task_id]["worker"] = worker_name
            
            # Simulate long-running inference compute
            time.sleep(0.05)
            self.task_store[task_id]["progress"] = 100
            self.task_store[task_id]["status"] = "SUCCESS"
            self.task_store[task_id]["result"] = {"output": f"Generated result for {task_type}"}
            self.task_queue.task_done()

if __name__ == "__main__":
    q = AsyncTaskQueue(num_workers=2)
    job_id = q.submit_job("image_gen", {"prompt": "A futuristic city in watercolor"})
    print(f"Submitted Job: {job_id} | Status: {q.get_status(job_id)['status']}")
    time.sleep(0.1)
    print(f"Polling Status: {job_id} | Status: {q.get_status(job_id)['status']}")
`,
    },

    sklearnCode: {
      title: 'FastAPI Asynchronous 202 Accepted Task Router with Polling Endpoints',
      explanation: 'Production FastAPI router implementing asynchronous submission, status polling, and webhook dispatch.',
      code: `from fastapi import FastAPI, BackgroundTasks, HTTPException, status
from pydantic import BaseModel, Field
import uuid
import time

app = FastAPI(title="Async Inference Service")

class SubmitJobRequest(BaseModel):
    model_type: str = Field(..., example="whisper_audio")
    input_data: str
    idempotency_key: str = Field(..., example="req_unique_948a")

class JobStatusResponse(BaseModel):
    job_id: str
    status: str
    progress: int
    result: dict | None = None

# In-memory storage for local demonstration
JOBS_DB: dict[str, dict] = {}
IDEMPOTENCY_CACHE: dict[str, str] = {}

def execute_heavy_inference(job_id: str):
    """Background task function executed outside the request thread."""
    JOBS_DB[job_id]["status"] = "PROCESSING"
    # Simulate multi-step compute
    for p in [25, 50, 75, 100]:
        time.sleep(0.05)
        JOBS_DB[job_id]["progress"] = p
    JOBS_DB[job_id]["status"] = "SUCCESS"
    JOBS_DB[job_id]["result"] = {"prediction": "Transcription complete", "confidence": 0.98}

@app.post("/v1/tasks", status_code=status.HTTP_202_ACCEPTED)
def submit_task(payload: SubmitJobRequest, bg_tasks: BackgroundTasks):
    # Enforce idempotency: return existing job if key re-submitted
    if payload.idempotency_key in IDEMPOTENCY_CACHE:
        existing_id = IDEMPOTENCY_CACHE[payload.idempotency_key]
        return {"job_id": existing_id, "poll_url": f"/v1/tasks/{existing_id}", "status": "DEDUPLICATED"}

    job_id = f"job_{uuid.uuid4().hex[:8]}"
    JOBS_DB[job_id] = {"job_id": job_id, "status": "QUEUED", "progress": 0, "result": None}
    IDEMPOTENCY_CACHE[payload.idempotency_key] = job_id

    # Enqueue background execution
    bg_tasks.add_task(execute_heavy_inference, job_id)

    return {
        "job_id": job_id,
        "poll_url": f"/v1/tasks/{job_id}",
        "status": "QUEUED",
        "message": "Task accepted. Poll status endpoint for results."
    }

@app.get("/v1/tasks/{job_id}", response_model=JobStatusResponse)
def get_task_status(job_id: str):
    if job_id not in JOBS_DB:
        raise HTTPException(status_code=404, detail="Job not found")
    return JOBS_DB[job_id]
`,
    },

    runnableCode: {
      code: `import random

def compute_full_jitter_delay(base_sec: float, max_sec: float, attempt: int) -> float:
    # Exponential cap: min(max_sec, base_sec * 2^(attempt - 1))
    cap = min(max_sec, base_sec * (2.0 ** (attempt - 1)))
    # Full jitter: Uniform random between 0 and cap
    return round(random.uniform(0.0, cap), 3)

# Deterministic seed for reproducible testing
random.seed(42)

print("=== EXPONENTIAL BACKOFF WITH FULL JITTER ===")
for k in range(1, 6):
    delay = compute_full_jitter_delay(base_sec=1.0, max_sec=16.0, attempt=k)
    cap = min(16.0, 1.0 * (2.0 ** (k - 1)))
    print(f"Attempt #{k}: Range [0.0, {cap:4.1f}s] -> Delay: {delay:5.3f}s")
`,
      expectedOutput: `=== EXPONENTIAL BACKOFF WITH FULL JITTER ===
Attempt #1: Range [0.0,  1.0s] -> Delay: 0.639s
Attempt #2: Range [0.0,  2.0s] -> Delay: 0.050s
Attempt #3: Range [0.0,  4.0s] -> Delay: 1.100s
Attempt #4: Range [0.0,  8.0s] -> Delay: 1.786s
Attempt #5: Range [0.0, 16.0s] -> Delay: 11.783s`,
    },

    lineByLineExplanation: [
      {
        lines: '1-6',
        codeSnippet: 'def compute_full_jitter_delay(base_sec, max_sec, attempt): cap = min(...); return random.uniform(...)',
        explanation: 'Calculates the exponential ceiling and draws a uniform random delay between 0 and the ceiling.',
      },
      {
        lines: '7-12',
        codeSnippet: 'for k in range(1, 6): delay = compute_full_jitter_delay(...)',
        explanation: 'Generates jittered delays across 5 sequential attempts, proving that retry timings are spread out safely.',
      },
    ],

    hyperparameters: [
      {
        name: 'Retry Max Attempts',
        defaultVal: '3',
        range: '1 to 5',
        effect: 'Maximum times a failed background job is retried before routing to Dead-Letter Queue (DLQ)',
        recommendation: 'Keep at 3 attempts; persistent failures indicate permanent data corruptions.',
      },
      {
        name: 'Task Polling Interval',
        defaultVal: '2.0s',
        range: '0.5s to 10.0s',
        effect: 'Frequency with which client polls `GET /tasks/{id}`',
        recommendation: 'Recommend 2-3s polling with exponential backoff on client side to avoid polling storms.',
      },
    ],

    assumptions: [
      {
        assumption: 'Idempotent Background Jobs',
        whyItMatters: 'If a worker dies after writing output but before acknowledging the broker, the task will be redelivered and run a second time.',
        howToVerify: 'Ensure worker operations check existing database state or idempotency keys before executing expensive computations.',
      },
    ],

    commonMistakes: [
      {
        mistake: 'Running heavy 60-second deep learning inference directly inside a synchronous FastAPI route handler',
        solution: 'Return HTTP 202 Accepted immediately and execute the model forward pass in a background worker pool.',
        whyWrong: 'Long-running synchronous calls block Uvicorn worker threads and cause reverse proxy 504 timeouts.',
        howToFix: 'Adopt the 202 Accepted task queue pattern.',
      },
      {
        mistake: 'Using naive deterministic exponential backoff (e.g. sleep 2s, 4s, 8s) across all workers',
        solution: 'Always apply randomized Full Jitter (`random.uniform(0, backoff)`).',
        whyWrong: 'When a shared database recovers, all retrying workers reconnect at the exact same millisecond, crashing the database again.',
        howToFix: 'Randomize retry intervals.',
      },
    ],

    realWorldUseCases: [
      {
        title: 'Generative AI Image Generation Service',
        description: 'Accepting prompt requests in 12ms (HTTP 202) and processing diffusion denoising steps in dedicated background GPU workers.',
      },
      {
        title: 'Video Subtitling & Transcription Pipeline',
        description: 'Processing 2-hour video uploads asynchronously with progress updates (0% -> 100%) and webhook callbacks upon completion.',
      },
    ],

    practiceQuestions: [
      {
        id: 'q1',
        question: 'Why should a long-running AI inference task return HTTP status 202 Accepted rather than HTTP 200 OK?',
        answer: 'HTTP 202 Accepted signals to the client that the request was syntactically valid and enqueued for processing, but execution has not yet finished.',
        explanation: 'It allows the client to release the socket immediately and poll or wait for a webhook.',
      },
      {
        id: 'q2',
        question: 'What is an Idempotency Key and how does it prevent duplicate billing in AI APIs?',
        answer: 'A unique client-supplied token (e.g. UUID) for a specific operation. If a network glitch occurs and the client retries the request, the server recognizes the key, skips re-running the model, and returns the existing result.',
        explanation: 'Idempotency prevents duplicate charges and wasted GPU cycles.',
      },
      {
        id: 'q3',
        question: 'What is a Dead-Letter Queue (DLQ)?',
        answer: 'A specialized secondary queue where tasks that repeatedly fail all retry attempts are routed for developer inspection and debugging without blocking the primary queue.',
        explanation: 'DLQs isolate poisoned or corrupt payloads.',
      },
    ],

    quiz: [
      {
        id: 'quiz-1',
        question: 'Which HTTP status code is officially designated for asynchronous requests that have been queued for processing but are not yet complete?',
        options: ['200 OK', '202 Accepted', '301 Moved Permanently', '409 Conflict'],
        correctIndex: 1,
        explanation: 'HTTP 202 Accepted indicates that the server has accepted the request for background processing.',
      },
      {
        id: 'quiz-2',
        question: 'Why is "Full Jitter" added to exponential backoff retry algorithms in distributed AI worker systems?',
        options: [
          'To intentionally slow down the neural network',
          'To randomize retry intervals and avoid synchronized thundering herd spikes that crash recovered databases or GPUs',
          'To encrypt the network packets',
          'To increase GPU temperature',
        ],
        correctIndex: 1,
        explanation: 'Full jitter spreads out retry attempts uniformly, preventing thundering herds from overwhelming recovered services.',
      },
      {
        id: 'quiz-3',
        question: 'What is the main difference between Client Polling and Webhook Callbacks for asynchronous inference results?',
        options: [
          'Polling requires the client to repeatedly query the API for status; Webhooks have the server push results to a client URL when finished',
          'Webhooks only work on Windows',
          'Polling is only used for databases',
          'There is no difference in network architecture',
        ],
        correctIndex: 0,
        explanation: 'Polling is client-driven (pull); webhooks are server-driven (push).',
      },
      {
        id: 'quiz-4',
        question: 'What happens if a client submits an inference request with an Idempotency Key that was already processed 5 minutes ago?',
        options: [
          'The server deletes the database',
          'The server recognizes the duplicate key and immediately returns the previously computed result without re-executing inference',
          'The server re-runs the model from scratch and charges the user twice',
          'The server raises a 500 error',
        ],
        correctIndex: 1,
        explanation: 'Idempotency ensures that duplicate requests produce the exact same outcome without duplicate execution.',
      },
    ],

    independentExercise: {
      title: 'Build a Jittered Exponential Backoff Retry Executor',
      problem:
        'Write a Python function `execute_with_retry(task_fn, max_retries=3, base_delay=1.0)` that executes an unreliable function, catching exceptions and retrying with full jitter, returning the result if successful or raising the final exception if all retries fail.',
      hints: [
        'Use a while loop or for loop over range(max_retries)',
        'Compute cap = base_delay * (2 ** attempt)',
        'Call `time.sleep(random.uniform(0, cap))` before retrying',
      ],
      starterCode: `import time
import random

def execute_with_retry(task_fn, max_retries: int = 3, base_delay: float = 0.5):
    # TODO: Implement retry loop with jitter
    pass
`,
      solution: `import time
import random

def execute_with_retry(task_fn, max_retries: int = 3, base_delay: float = 0.5):
    attempt = 0
    while True:
        try:
            return task_fn()
        except Exception as e:
            attempt += 1
            if attempt >= max_retries:
                raise e
            cap = base_delay * (2.0 ** (attempt - 1))
            delay = random.uniform(0.0, cap)
            time.sleep(delay)
`,
    },

    summary: {
      keyTakeaways: [
        'Use HTTP 202 Accepted and async task queues to decouple long-running model inference from web request timeouts',
        'Apply exponential backoff with full jitter to avoid thundering herds when recovering from transient GPU errors',
        'Enforce idempotency keys on task submissions to prevent duplicate execution when clients retry over flaky networks',
      ],
      nextLessonId: 'deploy-11-gpu-dl-serving',
      nextLessonTitle: 'Deploy-11: GPU Acceleration & Deep Learning Serving',
      nextLessonModuleId: 'p11-m11',
    },
  },

  'deploy-11-gpu-dl-serving': {
    id: 'deploy-11-gpu-dl-serving',
    moduleId: 'p11-m11',
    title: 'Deploy-11: GPU Acceleration & Deep Learning Serving',
    subtitle: 'VRAM Allocation, Batching, Cold Starts, Quantization & Serving Engines',
    order: 1,
    readTimeMinutes: 38,
    difficulty: 'Advanced',
    visualizerType: 'deploy-gpu-resource-explorer',

    objectives: [
      'Calculate exact GPU VRAM allocation across model weights, KV caches, activations, and CUDA runtime overhead',
      'Analyze the Roofline model: determine whether an inference workload is Memory-Bandwidth-Bound or Compute-Bound',
      'Evaluate weight quantization trade-offs (FP16 vs INT8 vs INT4 AWQ/GPTQ) on memory footprint and inference speed',
      'Optimize serving throughput using dynamic batching without violating per-request latency SLAs',
      'Compare deep learning serving engines (ONNX Runtime, NVIDIA Triton Inference Server, TensorRT) conceptually and via benchmarks',
    ],

    prerequisites: [
      'Deploy-01 (Deployment Fundamentals) and Deploy-05 (FastAPI)',
      'Foundational understanding of tensor matrices and neural network layers',
    ],
    previousLesson: {
      id: 'deploy-10-background-async-jobs',
      title: 'Deploy-10: Background Jobs & Asynchronous Inference',
      moduleId: 'p11-m10',
    },

    analogy: {
      title: 'The High-Speed Bullet Train vs. A Fleet of Delivery Scooters',
      text: 'Running deep learning models on CPU vs GPU is like transporting passengers across a metropolis. A modern multi-core CPU is like a fleet of 8 agile delivery scooters: each scooter can navigate narrow alleys, make sharp decisions, and run complex branching logic with almost zero startup delay. A modern GPU (e.g. NVIDIA A100) is a massive 2,048-seat high-speed bullet train: it takes minutes to power on and load passengers onto the platform (cold starts and host-to-device transfers), but once rolling on a straight track of massive matrix multiplications, it moves 10,000 passengers simultaneously with unmatched throughput.',
      metaphor: 'CPUs excel at complex sequential logic; GPUs are high-throughput parallel matrix engines.',
    },

    problemSolved: {
      title: 'Mastering GPU VRAM Constraints and Avoiding CUDA OOMs',
      description:
        'GPU memory (VRAM) is scarce and expensive. If an inference worker allocates even 1 megabyte beyond the physical GPU card capacity (e.g. 16.01 GB on an NVIDIA T4 16GB), PyTorch crashes violently with `CUDA Out of Memory` (OOM). Furthermore, GPUs deployed with batch size 1 sit 90% idle, wasting thousands of dollars in cloud spend.',
      keyPoints: [
        'Model weights, activation buffers, KV caches, and CUDA contexts must all fit within physical VRAM',
        'Dynamic batching groups asynchronous incoming requests into unified tensor batches, increasing GPU utilization by 5x to 10x',
        'INT8 and INT4 quantization shrinks model sizes by 50% to 75%, allowing large models to run on affordable GPUs',
        'The Roofline model reveals whether adding more compute cores or faster memory bandwidth will speed up inference',
      ],
    },

    intuition: {
      overview:
        'Serving deep learning models requires balancing tensor memory footprints against hardware memory bandwidth and operational intensity.',
      steps: [
        {
          step: 1,
          title: 'Weight Loading & VRAM Reservation',
          description:
            'When the serving engine boots, model weights are transferred over PCIe bus into GPU High-Bandwidth Memory (HBM). PyTorch reserves ~1.2GB for CUDA context kernels.',
        },
        {
          step: 2,
          title: 'Dynamic Batching Aggregation',
          description:
            'Rather than running inferences one-by-one, the server queues requests for up to 5ms (max queue delay), combining up to 8 queries into a single matrix GEMM operation.',
        },
        {
          step: 3,
          title: 'Weight Quantization',
          description:
            'Weights are compressed from 16-bit floats (FP16) to 8-bit integers (INT8) or 4-bit integers (INT4 AWQ), drastically reducing memory bandwidth traffic from HBM to compute cores.',
        },
        {
          step: 4,
          title: 'Engine Optimization (ONNX / TensorRT)',
          description:
            'Serving engines fuse adjacent layers (e.g. Conv + BatchNorm + ReLU into a single fused kernel), eliminating intermediate memory round-trips.',
        },
      ],
    },

    mathematics: {
      overview:
        'The Roofline model and VRAM formulation govern performance limits on modern GPU accelerators.',
      foundations: [
        {
          name: 'The Roofline Model & Operational Intensity (OI)',
          latex: '\\text{Attainable Performance (FLOPs/s)} = \\min\\left(\\text{Peak Compute}, \\text{Memory Bandwidth} \\times \\text{OI}\\right)',
          explanation:
            'Operational Intensity (OI) equals FLOPs divided by Bytes transferred. If OI is low, performance is strictly throttled by GPU memory bandwidth (Memory-Bound); if OI is high, performance reaches peak compute tensor cores (Compute-Bound).',
        },
        {
          name: 'Total GPU VRAM Footprint Equation',
          latex: 'VRAM_{\\text{total}} = (P \\times B_{\\text{prec}}) + VRAM_{\\text{KV}} + VRAM_{\\text{act}}(B) + VRAM_{\\text{CUDA}}',
          explanation:
            'Total VRAM equals weights footprint (Parameters P times bytes per precision) plus KV cache plus batch activation buffers plus CUDA runtime context (~1.2 GB).',
        },
      ],
    },

    derivation: {
      title: 'Derivation of Memory Bandwidth Limitation in Autoregressive Inference',
      objective: 'Calculate why single-user token generation on LLMs is strictly memory-bandwidth bound.',
      steps: [
        {
          step: 1,
          label: 'Bytes Transferred per Token (Batch = 1)',
          latex: '\\text{Bytes} = P \\times B_{\\text{prec}}',
          explanation: 'To generate a single token for 1 user, every single parameter in the model must be read from HBM into the ALU registers.',
        },
        {
          step: 2,
          label: 'FLOPs Executed per Token',
          latex: '\\text{FLOPs} = 2 \\times P',
          explanation: 'Each parameter participates in one multiply-accumulate operation (2 FLOPs).',
        },
        {
          step: 3,
          label: 'Operational Intensity (OI)',
          latex: '\\text{OI} = \\frac{2 \\times P}{P \\times 2 \\text{ bytes (FP16)}} = 1.0 \\text{ FLOP / Byte}',
          explanation: 'An A100 GPU requires an OI of >150 FLOPs/Byte to saturate compute cores. At OI=1.0, 99% of compute cores sit idle waiting for memory transfer!',
        },
      ],
    },

    variables: [
      { symbol: 'P', name: 'Parameter Count', description: 'Total parameters in the model (e.g. 8 Billion for LLaMA-3 8B)' },
      { symbol: 'B_{\\text{prec}}', name: 'Precision Bytes', description: '2.0 bytes for FP16, 1.0 byte for INT8, 0.55 bytes for INT4' },
      { symbol: '\\text{OI}', name: 'Operational Intensity', description: 'Arithmetic operations performed per byte of memory loaded (FLOPs / Byte)' },
      { symbol: 'B', name: 'Batch Size', description: 'Number of parallel requests combined into a single matrix operation' },
    ],

    numericalExample: {
      scenario: 'Calculating exact VRAM required to serve a 7-Billion parameter model in FP16 vs INT4 on an NVIDIA A10G (24GB VRAM).',
      dataset: [
        { parameter: 'Model Size (P)', value: '7,000,000,000 parameters' },
        { parameter: 'FP16 Precision Bytes', value: '2.0 bytes / param' },
        { parameter: 'INT4 Precision Bytes', value: '0.55 bytes / param' },
        { parameter: 'KV Cache & Activations (Batch=8)', value: '2.8 GB' },
        { parameter: 'CUDA Context Overhead', value: '1.4 GB' },
      ],
      calculations: [
        {
          step: '1. FP16 Weights Memory',
          math: '(7 * 10^9 * 2) / (1024^3)',
          result: '13.04 GB weights',
        },
        {
          step: '2. Total FP16 VRAM Needed',
          math: '13.04 + 2.8 + 1.4',
          result: '17.24 GB (Fits comfortably within 24GB A10G)',
        },
        {
          step: '3. Total INT4 VRAM Needed',
          math: '((7 * 10^9 * 0.55) / 1024^3) + 2.8 + 1.4',
          result: '3.58 + 2.8 + 1.4 = 7.78 GB (Can now fit on a cheap 16GB T4 GPU!)',
        },
      ],
      finalConclusion: 'INT4 quantization reduces total memory from 17.2GB to 7.8GB, allowing deployment on an affordable $0.55/hr T4 instead of a costly A100.',
    },

    visualExplanation: {
      title: 'GPU Memory (VRAM) & Throughput Calculator Visualizer',
      description:
        'The interactive visualizer calculates real-time VRAM allocation and evaluates compatibility across NVIDIA T4, A10G, L4, and A100 GPUs.',
      features: [
        'Select model presets (LLaMA-3 8B, LLaMA-3 70B, ViT-Large, Whisper) and see weights, KV cache, and CUDA memory breakdowns',
        'Switch between FP16, INT8, and INT4 AWQ quantization to see memory shrink by up to 72%',
        'Test batch sizes and context lengths to trigger automated CUDA Out-Of-Memory (OOM) alerts on undersized hardware',
      ],
    },

    scratchCode: {
      title: 'Python from Scratch: Hardware-Agnostic Inference Benchmark Simulator',
      explanation: 'Simulates tensor matrix multiplication throughput and batch scaling dynamics without requiring GPU hardware.',
      code: `import time
import statistics

class MockServingBenchmark:
    """Simulates batching throughput and latency scaling across CPU and GPU modes."""
    
    @staticmethod
    def simulate_forward_pass(batch_size: int, is_gpu: bool = True) -> dict:
        # Base latency model: GPU has higher startup overhead but flattens across batches
        if is_gpu:
            base_overhead_ms = 4.0
            per_sample_ms = 1.2
        else:
            base_overhead_ms = 2.0
            per_sample_ms = 8.5 # CPU scales linearly with batch

        total_latency_ms = base_overhead_ms + (per_sample_ms * (batch_size ** 0.6 if is_gpu else batch_size))
        throughput_items_per_sec = (batch_size / (total_latency_ms / 1000.0))

        return {
            "mode": "GPU" if is_gpu else "CPU",
            "batch_size": batch_size,
            "latency_ms": round(total_latency_ms, 2),
            "throughput_items_per_sec": round(throughput_items_per_sec, 1),
        }

if __name__ == "__main__":
    print("=== INFERENCE BATCHING THROUGHPUT BENCHMARK ===")
    for b in [1, 4, 8, 16]:
        gpu_res = MockServingBenchmark.simulate_forward_pass(b, is_gpu=True)
        cpu_res = MockServingBenchmark.simulate_forward_pass(b, is_gpu=False)
        print(f"Batch {b:2d} | GPU: {gpu_res['latency_ms']:5.1f}ms ({gpu_res['throughput_items_per_sec']:5.1f} item/s) | CPU: {cpu_res['latency_ms']:5.1f}ms ({cpu_res['throughput_items_per_sec']:5.1f} item/s)")
`,
    },

    sklearnCode: {
      title: 'ONNX Runtime Optimized Inference Session with Dynamic Batching',
      explanation: 'Production ONNX Runtime execution script utilizing graph optimization and thread tuning.',
      code: `import numpy as np

# Note: onnxruntime execution pattern demonstration
class OptimizedONNXInferenceSession:
    """Demonstrates graph-optimized model execution with ONNX Runtime."""
    def __init__(self, model_weights_path: str):
        self.model_path = model_weights_path
        # In real code: import onnxruntime as ort; self.session = ort.InferenceSession(...)
        self.providers = ["CUDAExecutionProvider", "CPUExecutionProvider"]
        print(f"Loaded ONNX session with providers: {self.providers}")

    def predict_batch(self, input_batch: np.ndarray) -> np.ndarray:
        # Simulated tensor forward pass with fused kernels
        # output = self.session.run(None, {"input": input_batch})[0]
        batch_size = input_batch.shape[0]
        scores = np.mean(input_batch, axis=-1)
        probabilities = 1.0 / (1.0 + np.exp(-scores))
        return probabilities
`,
    },

    runnableCode: {
      code: `def calculate_vram_requirement(params_billions: float, precision_bytes: float, batch_size: int, kv_cache_gb: float) -> dict:
    weights_gb = (params_billions * 1e9 * precision_bytes) / (1024 ** 3)
    cuda_overhead_gb = 1.4
    total_vram_gb = weights_gb + kv_cache_gb + cuda_overhead_gb
    
    return {
        "params": f"{params_billions}B",
        "precision_bytes": precision_bytes,
        "weights_gb": round(weights_gb, 2),
        "total_vram_gb": round(total_vram_gb, 2),
        "fits_t4_16gb": total_vram_gb <= 16.0,
        "fits_a10g_24gb": total_vram_gb <= 24.0,
    }

print("=== VRAM ALLOCATION & GPU COMPATIBILITY ===")
res_fp16 = calculate_vram_requirement(8.0, 2.0, batch_size=4, kv_cache_gb=1.8)
res_int4 = calculate_vram_requirement(8.0, 0.55, batch_size=4, kv_cache_gb=1.8)
print("8B Model (FP16):", res_fp16)
print("8B Model (INT4):", res_int4)
`,
      expectedOutput: `=== VRAM ALLOCATION & GPU COMPATIBILITY ===
8B Model (FP16): {'params': '8.0B', 'precision_bytes': 2.0, 'weights_gb': 14.9, 'total_vram_gb': 18.1, 'fits_t4_16gb': False, 'fits_a10g_24gb': True}
8B Model (INT4): {'params': '8.0B', 'precision_bytes': 0.55, 'weights_gb': 4.1, 'total_vram_gb': 7.3, 'fits_t4_16gb': True, 'fits_a10g_24gb': True}`,
    },

    lineByLineExplanation: [
      {
        lines: '1-6',
        codeSnippet: 'weights_gb = ... total_vram_gb = weights_gb + kv_cache_gb + cuda_overhead_gb',
        explanation: 'Applies the universal GPU VRAM allocation equation incorporating precision bytes and CUDA runtime overhead.',
      },
      {
        lines: '7-13',
        codeSnippet: 'fits_t4_16gb = total_vram_gb <= 16.0; fits_a10g_24gb = total_vram_gb <= 24.0',
        explanation: 'Evaluates whether the calculated memory fits within hardware capacity limits to prevent CUDA OOMs.',
      },
      {
        lines: '14-19',
        codeSnippet: 'res_fp16 = ... res_int4 = ...',
        explanation: 'Demonstrates that INT4 quantization unlocks deployment on a 16GB T4 GPU (7.3GB needed vs 18.1GB for FP16).',
      },
    ],

    hyperparameters: [
      {
        name: 'max_batch_size',
        defaultVal: '8',
        range: '1 to 64',
        effect: 'Maximum number of requests aggregated into a unified matrix forward pass',
        recommendation: 'Set to 8-16 for online inference to maximize throughput without exceeding latency SLA.',
      },
      {
        name: 'max_queue_delay_microseconds',
        defaultVal: '5000 (5ms)',
        range: '1000 to 50000',
        effect: 'How long dynamic batching waits for more requests to arrive before executing forward pass',
        recommendation: 'Keep between 2ms and 10ms to balance throughput against per-request latency.',
      },
    ],

    assumptions: [
      {
        assumption: 'PCIe Transfer Bottleneck',
        whyItMatters: 'Moving input tensors from CPU host RAM to GPU VRAM across PCIe can take longer than the inference computation itself for small models.',
        howToVerify: 'Keep small models (e.g. Scikit-learn, small XGBoost) on CPU; reserve GPUs for large deep networks and LLMs.',
      },
    ],

    commonMistakes: [
      {
        mistake: 'Deploying small tabular models (e.g. Random Forest, Logistic Regression) to expensive cloud GPUs',
        solution: 'Deploy tabular models to CPU instances using ONNX Runtime or Treelite.',
        whyWrong: 'PCIe transfer overhead makes GPU execution slower than modern multi-core CPUs, while costing 10x more.',
        howToFix: 'Reserve GPU instances strictly for deep learning models that exceed high operational intensity thresholds.',
      },
      {
        mistake: 'Failing to account for CUDA runtime context memory (~1.2 GB), causing sudden OOM crashes',
        solution: 'Always add a 1.5 GB safety buffer on top of weights and activations when calculating required VRAM.',
        whyWrong: 'A 15.2 GB model will immediately crash on a 16 GB GPU because the CUDA runtime pushes total allocation over 16.5 GB.',
        howToFix: 'Include CUDA context overhead in all capacity planning formulas.',
      },
    ],

    realWorldUseCases: [
      {
        title: 'Autonomous Vehicle Object Detection',
        description: 'Using TensorRT INT8 calibration to run YOLO vision models at 120 FPS on an embedded NVIDIA Jetson GPU with sub-8ms latency.',
      },
      {
        title: 'Large-Scale Audio Transcription',
        description: 'Running Whisper-Large with dynamic batching on Triton Inference Server to process 40 parallel phone calls on a single A10G GPU.',
      },
    ],

    practiceQuestions: [
      {
        id: 'q1',
        question: 'What is the Roofline Model and how does it categorize deep learning inference performance?',
        answer: 'The Roofline Model maps attainable performance against Operational Intensity (FLOPs/Byte). Workloads with low operational intensity are Memory-Bound (limited by memory bandwidth), while workloads with high intensity are Compute-Bound (limited by GPU tensor core speeds).',
        explanation: 'It tells engineers whether to optimize memory access or arithmetic operations.',
      },
      {
        id: 'q2',
        question: 'What is dynamic batching in modern inference servers (like Triton or TorchServe)?',
        answer: 'It queues independent incoming requests for a few milliseconds to form a combined batch, executing them together in a single GPU matrix forward pass to dramatically increase throughput.',
        explanation: 'Dynamic batching amortizes weight loading overhead across multiple requests.',
      },
      {
        id: 'q3',
        question: 'How does INT8 quantization affect model memory and inference throughput?',
        answer: 'It reduces parameter size from 16 bits (FP16) to 8 bits (INT8), cutting weights VRAM by 50% and doubling memory transfer speeds, often with less than 0.5% degradation in model accuracy.',
        explanation: 'INT8 also leverages specialized INT8 tensor cores on modern GPUs.',
      },
    ],

    quiz: [
      {
        id: 'quiz-1',
        question: 'Approximately how much VRAM is required strictly to store the weights of an 8-Billion parameter neural network in standard FP16 precision?',
        options: ['4 GB', '8 GB', '14.9 GB (~16 GB)', '64 GB'],
        correctIndex: 2,
        explanation: '8 * 10^9 parameters * 2 bytes = 16 * 10^9 bytes = 14.9 GB of raw weights.',
      },
      {
        id: 'quiz-2',
        question: 'Why is generating tokens for a single user in an LLM considered a Memory-Bandwidth-Bound workload?',
        options: [
          'Because the CPU is turned off',
          'Because all model weights must be loaded from HBM into registers to compute just 1 token, resulting in a low Operational Intensity (~1.0 FLOP/Byte)',
          'Because Python cannot handle math',
          'Because the internet connection is too slow',
        ],
        correctIndex: 1,
        explanation: 'Each parameter is read from memory to execute only 2 FLOPs per token, bottlenecking on memory bandwidth rather than compute cores.',
      },
      {
        id: 'quiz-3',
        question: 'What happens when a deep learning model attempts to allocate more VRAM than the physical GPU card possesses?',
        options: [
          'The GPU automatically compresses the weights with zero latency',
          'The process crashes immediately with a CUDA Out of Memory (OOM) error',
          'The GPU seamlessly writes to the floppy drive',
          'The model accuracy increases',
        ],
        correctIndex: 1,
        explanation: 'Unlike CPU virtual memory which pages to swap, GPU memory exhaustion results in an immediate fatal CUDA OOM exception.',
      },
      {
        id: 'quiz-4',
        question: 'Which deep learning inference engine is developed by NVIDIA specifically for multi-model, multi-framework GPU serving with dynamic batching?',
        options: ['NVIDIA Triton Inference Server', 'Flask', 'Apache Spark', 'SQLite'],
        correctIndex: 0,
        explanation: 'Triton is NVIDIA’s flagship production inference server supporting dynamic batching, concurrent model execution, and model pipelining.',
      },
    ],

    independentExercise: {
      title: 'Calculate Model Quantization Memory Footprint and Savings',
      problem:
        'Write a Python function `quantization_savings(params_billions, base_precision="fp16", target_precision="int4")` that computes the weights footprint in GB for both precisions, the percentage memory reduction, and recommends the smallest suitable GPU from [16, 24, 40, 80] GB.',
      hints: [
        'FP16 = 2.0 bytes/param, INT8 = 1.0 byte/param, INT4 = 0.55 bytes/param',
        'Convert bytes to GB by dividing by (1024^3)',
        'Add 1.5 GB for CUDA context before finding smallest GPU',
      ],
      starterCode: `def quantization_savings(params_billions: float, base_precision: str = "fp16", target_precision: str = "int4") -> dict:
    # TODO: Compute memory savings
    pass

print(quantization_savings(13.0, "fp16", "int4"))
`,
      solution: `def quantization_savings(params_billions: float, base_precision: str = "fp16", target_precision: str = "int4") -> dict:
    prec_map = {"fp32": 4.0, "fp16": 2.0, "int8": 1.0, "int4": 0.55}
    b_base = prec_map[base_precision.lower()]
    b_target = prec_map[target_precision.lower()]
    
    base_gb = (params_billions * 1e9 * b_base) / (1024 ** 3)
    target_gb = (params_billions * 1e9 * b_target) / (1024 ** 3)
    reduction_pct = (1.0 - target_gb / base_gb) * 100.0
    
    # Required VRAM with 1.5GB overhead
    vram_needed = target_gb + 1.5
    gpu_pool = [16, 24, 40, 80]
    recommended_gpu = next((g for g in gpu_pool if g >= vram_needed), "Multi-GPU Required")
    
    return {
        "params": f"{params_billions}B",
        "base_footprint_gb": round(base_gb, 2),
        "target_footprint_gb": round(target_gb, 2),
        "reduction_percentage": round(reduction_pct, 1),
        "vram_with_overhead_gb": round(vram_needed, 2),
        "recommended_gpu_size_gb": recommended_gpu,
    }

print(quantization_savings(13.0, "fp16", "int4"))
`,
    },

    summary: {
      keyTakeaways: [
        'Total GPU VRAM is governed by weights footprint, KV caches, activation buffers, and ~1.2GB of CUDA runtime context',
        'Use weight quantization (INT8 / INT4 AWQ) to compress models by up to 72%, fitting larger architectures onto single commodity GPUs',
        'Dynamic batching amortizes memory bandwidth overhead by executing multiple concurrent queries in a single tensor operation',
      ],
      nextLessonId: 'deploy-12-production-llm-serving',
      nextLessonTitle: 'Deploy-12: Production LLM Serving & Streaming Architectures',
      nextLessonModuleId: 'p11-m12',
    },
  },

  'deploy-12-production-llm-serving': {
    id: 'deploy-12-production-llm-serving',
    moduleId: 'p11-m12',
    title: 'Deploy-12: Production LLM Serving & Streaming Architectures',
    subtitle: 'Hosted APIs vs Open Weights, Token Streaming, vLLM & Fallback Routing',
    order: 1,
    readTimeMinutes: 38,
    difficulty: 'Advanced',
    visualizerType: 'deploy-llm-serving-latency-explorer',

    objectives: [
      'Evaluate hosted commercial APIs (Gemini, Claude, OpenAI) vs self-hosted open-weight models (LLaMA, Mistral, Qwen)',
      'Implement real-time token streaming using Server-Sent Events (SSE) and measure Time-to-First-Token (TTFT)',
      'Deconstruct vLLM PagedAttention continuous batching and contrast with naive static batching',
      'Calculate KV cache memory scaling across sequence lengths and concurrent request volumes',
      'Design tiered fallback routing architectures with rate-limit handling and zero-paid mock alternatives',
    ],

    prerequisites: [
      'Deploy-05 (FastAPI) and Deploy-11 (GPU Serving)',
      'Familiarity with transformer architecture fundamentals (Phase 6 & 7)',
    ],
    previousLesson: {
      id: 'deploy-11-gpu-dl-serving',
      title: 'Deploy-11: GPU Acceleration & Deep Learning Serving',
      moduleId: 'p11-m11',
    },

    analogy: {
      title: 'The Real-Time News Teleprompter vs. The Daily Printed Newspaper',
      text: 'Non-streaming LLM responses are like waiting for tomorrow morning’s printed newspaper: the presses must finish writing and printing all 50 pages before the paperboy throws it onto your driveway, leaving you waiting with zero information for 12 seconds. Token streaming via Server-Sent Events (SSE) is a live news teleprompter: words appear in real-time as the anchor speaks them. You begin reading the first word in 250 milliseconds (Time-to-First-Token), completely transforming the user’s perception of speed.',
      metaphor: 'Streaming is a live teleprompter; non-streaming is waiting for tomorrow’s printed paper.',
    },

    problemSolved: {
      title: 'Overcoming the Latency and Memory Bottlenecks of LLMs',
      description:
        'Large Language Models generate text autoregressively, one token at a time. A 200-token response can take 4 to 10 seconds. If an API buffers the entire output before replying, end-users perceive the application as unresponsive and abandon the page.',
      keyPoints: [
        'Streaming Server-Sent Events (SSE) drops perceived latency from seconds down to sub-500ms TTFT',
        'Naive PyTorch loops waste 60-80% of GPU memory through KV cache memory fragmentation',
        'vLLM PagedAttention applies virtual memory paging to KV caches, enabling 4x higher concurrency',
        'Tiered model routing routes simple queries to fast, cheap models (e.g. Gemini Flash) and falls back on heavy models',
      ],
    },

    intuition: {
      overview:
        'Production LLM serving separates request processing into two distinct phases: prompt prefill (parallel matrix multiplication) and autoregressive token generation (sequential memory-bound decode).',
      steps: [
        {
          step: 1,
          title: 'Prompt Prefill Phase (TTFT)',
          description:
            'The entire input prompt (e.g. 1,024 tokens) is processed in parallel across attention heads in a single forward pass, populating the initial Key-Value (KV) cache.',
        },
        {
          step: 2,
          title: 'Autoregressive Decode Loop (ITL)',
          description:
            'The model iteratively predicts token N+1, appends its KV vector to cache, and emits the token over an HTTP streaming connection (SSE) to the client.',
        },
        {
          step: 3,
          title: 'vLLM PagedAttention Dynamic Allocation',
          description:
            'Rather than pre-allocating contiguous memory for the maximum possible context window, vLLM allocates small non-contiguous memory blocks on-demand, eliminating fragmentation.',
        },
        {
          step: 4,
          title: 'Tiered Fallback Routing',
          description:
            'The API gateway routes queries to low-cost fast endpoints. If the provider returns HTTP 429 (Rate Limit) or 503, the gateway catches the exception and immediately retries against a secondary model.',
        },
      ],
    },

    mathematics: {
      overview:
        'KV Cache memory scaling governs the maximum concurrency an LLM serving engine can sustain.',
      foundations: [
        {
          name: 'KV Cache Memory per Request Equation',
          latex: 'M_{\\text{KV}} = 2 \\times n_{\\text{layers}} \\times n_{\\text{heads}} \\times d_{\\text{head}} \\times s \\times B_{\\text{bytes}}',
          explanation:
            'Memory required to store Keys and Values (factor of 2) across all layers, attention heads, dimension per head, context sequence length s, and bytes per precision.',
        },
        {
          name: 'Total Concurrent Context Capacity',
          latex: 'N_{\\text{concurrent}} = \\left\\lfloor \\frac{\\text{Available VRAM} - VRAM_{\\text{weights}}}{M_{\\text{KV}}(s_{\\text{max}})} \\right\\rfloor',
          explanation:
            'Total simultaneous users an LLM instance can serve before running out of KV cache memory.',
        },
      ],
    },

    derivation: {
      title: 'Derivation of LLaMA-2 7B KV Cache Scaling at 4K Context',
      objective: 'Calculate the exact KV cache memory required per user for a 7B model at 4,096 tokens in FP16.',
      steps: [
        {
          step: 1,
          label: 'Architecture Dimensions',
          latex: 'n_{\\text{layers}} = 32, \\quad n_{\\text{heads}} = 32, \\quad d_{\\text{head}} = 128, \\quad B_{\\text{bytes}} = 2 \\text{ (FP16)}',
          explanation: 'Standard LLaMA 7B architecture parameters.',
        },
        {
          step: 2,
          label: 'Bytes per Token',
          latex: '2 \\times 32 \\times 32 \\times 128 \\times 2 = 524,288 \\text{ bytes} = 0.50 \\text{ MB / token}',
          explanation: 'Every single token added to context consumes 0.5 MB of HBM memory across the layer stack.',
        },
        {
          step: 3,
          label: 'Memory for 4,096 Tokens',
          latex: 'M_{\\text{KV}}(4096) = 4096 \\times 0.50 \\text{ MB} = 2,048 \\text{ MB} = 2.0 \\text{ GB / user}',
          explanation: 'Serving just 10 concurrent users at 4K context consumes 20 GB of VRAM purely for KV caches!',
        },
      ],
    },

    variables: [
      { symbol: 'n_{\\text{layers}}', name: 'Transformer Layers', description: 'Number of decoder blocks in the architecture (e.g. 32 for 7B, 80 for 70B)' },
      { symbol: 'n_{\\text{heads}}', name: 'Attention Heads', description: 'Number of key-value attention heads' },
      { symbol: 'd_{\\text{head}}', name: 'Head Dimension', description: 'Hidden dimension per head (typically 64 or 128)' },
      { symbol: 's', name: 'Sequence Length', description: 'Total tokens currently in the prompt + generated response' },
    ],

    numericalExample: {
      scenario: 'Comparing user-perceived responsiveness for non-streaming vs streaming responses on a 150-token output.',
      dataset: [
        { metric: 'Time-to-First-Token (TTFT)', value: '320 ms (0.32s)' },
        { metric: 'Inter-Token Latency (ITL)', value: '22 ms / token (~45 tokens/sec)' },
        { metric: 'Total Tokens Generated', value: '150 tokens' },
      ],
      calculations: [
        {
          step: '1. Total Generation Duration',
          math: '320ms + (150 * 22ms)',
          result: '320ms + 3,300ms = 3,620 ms (3.62s)',
        },
        {
          step: '2. Non-Streaming Perceived Latency',
          math: 'Full duration',
          result: '3.62 seconds (User stares at blank spinner for 3.6s)',
        },
        {
          step: '3. Streaming Perceived Latency',
          math: 'TTFT only',
          result: '0.32 seconds (User starts reading in 320ms while reading comfortably)',
        },
      ],
      finalConclusion: 'Streaming improves perceived time-to-value by 11.3x without changing raw compute time.',
    },

    visualExplanation: {
      title: 'LLM Serving & Streaming Latency Dynamics Explorer',
      description:
        'The interactive visualizer compares naive PyTorch loops, vLLM continuous batching, and speculative decoding. Adjust prompt token length and output size, and click "Simulate LLM Stream" to see real-time token rendering.',
      features: [
        'Watch live token-by-token streaming emulation rendered at calculated millisecond intervals',
        'Compare TTFT prefill latency vs decode generation latency in a visual waterfall breakdown',
        'Test speculative decoding where small draft models predict tokens in advance, cutting Inter-Token Latency in half',
      ],
    },

    scratchCode: {
      title: 'Python from Scratch: Server-Sent Events (SSE) Streaming Generator',
      explanation: 'Implements the official W3C Server-Sent Events streaming format protocol in pure Python.',
      code: `import time
import json

class MockLLMStreamer:
    """Simulates an autoregressive LLM generating Server-Sent Events."""
    
    @staticmethod
    def generate_tokens(prompt: str, max_tokens: int = 10):
        # 1. Simulate Prompt Prefill (TTFT)
        time.sleep(0.04)  # 40ms TTFT
        
        words = ["Production", "LLM", "systems", "require", "low", "latency", "streaming", "and", "caching."]
        
        for i in range(min(max_tokens, len(words))):
            token = words[i]
            # Inter-token delay (ITL)
            time.sleep(0.02)  # 20ms ITL (~50 tokens/sec)
            
            # SSE Protocol: "event: message\\ndata: {...}\\n\\n"
            payload = json.dumps({"index": i, "token": token, "finish_reason": None})
            yield f"data: {payload}\\n\\n"
            
        done_payload = json.dumps({"index": max_tokens, "token": "", "finish_reason": "stop"})
        yield f"data: {done_payload}\\n\\n"

if __name__ == "__main__":
    streamer = MockLLMStreamer()
    print("=== LIVE SSE TOKEN STREAM ===")
    for chunk in streamer.generate_tokens("What is MLOps?", max_tokens=6):
        print(chunk.strip())
`,
    },

    sklearnCode: {
      title: 'FastAPI Production Streaming Endpoint with StreamingResponse & Fallbacks',
      explanation: 'Complete production FastAPI router implementing Server-Sent Events and automated secondary model fallbacks.',
      code: `from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
import time
import json

app = FastAPI(title="Production LLM Gateway")

class ChatRequest(BaseModel):
    prompt: str
    model: str = "gemini-flash"

def stream_llm_response(prompt: str):
    """Generator streaming SSE formatted tokens."""
    tokens = ["Scalable", "AI", "systems", "rely", "on", "streaming", "architectures."]
    for token in tokens:
        time.sleep(0.03)  # 30ms inter-token latency
        data = json.dumps({"token": token + " "})
        yield f"data: {data}\\n\\n"
    yield "data: [DONE]\\n\\n"

@app.post("/v1/chat/completions/stream")
def chat_stream(request: ChatRequest):
    try:
        # Route request: if primary fails, fallback to secondary
        return StreamingResponse(
            stream_llm_response(request.prompt),
            media_type="text/event-stream",
            headers={
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
                "X-Model-Provider": request.model
            }
        )
    except Exception as e:
        # Fallback router logic
        raise HTTPException(status_code=503, detail=f"Model provider failed: {str(e)}")
`,
    },

    runnableCode: {
      code: `def calculate_kv_cache_memory(num_layers: int, num_heads: int, head_dim: int, seq_len: int, batch_size: int) -> dict:
    # 2 * num_layers * num_heads * head_dim * seq_len * batch_size * 2 bytes (FP16)
    bytes_per_token = 2 * num_layers * num_heads * head_dim * 2
    total_bytes = bytes_per_token * seq_len * batch_size
    total_gb = total_bytes / (1024 ** 3)
    
    return {
        "context_tokens": seq_len,
        "batch_size": batch_size,
        "bytes_per_token_mb": round(bytes_per_token / (1024 ** 2), 2),
        "total_kv_cache_gb": round(total_gb, 2),
    }

print("=== KV CACHE MEMORY CONSUMPTION ===")
# LLaMA 7B at 2K context vs 8K context
print("LLaMA 7B (2K tokens, batch 4):", calculate_kv_cache_memory(32, 32, 128, 2048, 4))
print("LLaMA 7B (8K tokens, batch 4):", calculate_kv_cache_memory(32, 32, 128, 8192, 4))
`,
      expectedOutput: `=== KV CACHE MEMORY CONSUMPTION ===
LLaMA 7B (2K tokens, batch 4): {'context_tokens': 2048, 'batch_size': 4, 'bytes_per_token_mb': 0.5, 'total_kv_cache_gb': 4.0}
LLaMA 7B (8K tokens, batch 4): {'context_tokens': 8192, 'batch_size': 4, 'bytes_per_token_mb': 0.5, 'total_kv_cache_gb': 16.0}`,
    },

    lineByLineExplanation: [
      {
        lines: '1-6',
        codeSnippet: 'bytes_per_token = 2 * num_layers * num_heads * head_dim * 2; total_bytes = bytes_per_token * seq_len * batch_size',
        explanation: 'Calculates exact Key and Value tensor footprint per token across all multi-head attention layers in FP16 precision.',
      },
      {
        lines: '7-12',
        codeSnippet: 'print("LLaMA 7B (2K tokens, batch 4) ...")',
        explanation: 'Shows how scaling context length from 2K to 8K quadruples VRAM consumption from 4.0GB to 16.0GB for just 4 concurrent users.',
      },
    ],

    hyperparameters: [
      {
        name: 'max_model_len (Context Window)',
        defaultVal: '4096',
        range: '2048 to 131072',
        effect: 'Maximum tokens allocated for prompt + generated response',
        recommendation: 'Cap context window to actual expected needs to preserve VRAM for concurrency.',
      },
      {
        name: 'gpu_memory_utilization',
        defaultVal: '0.90',
        range: '0.70 to 0.95',
        effect: 'Fraction of GPU VRAM vLLM reserves for weights and dynamic KV cache paging',
        recommendation: 'Set to 0.90 on dedicated inference instances.',
      },
    ],

    assumptions: [
      {
        assumption: 'Streaming Chunk Compatibility',
        whyItMatters: 'Reverse proxies (Nginx) may buffer HTTP responses by default, breaking streaming and forcing all tokens to arrive at once.',
        howToVerify: 'Add header `X-Accel-Buffering: no` and set `proxy_buffering off;` in Nginx configuration.',
      },
    ],

    commonMistakes: [
      {
        mistake: 'Allowing Nginx to buffer Server-Sent Events (SSE) responses',
        solution: 'Disable proxy buffering in Nginx by adding `proxy_buffering off;` or setting header `X-Accel-Buffering: no`.',
        whyWrong: 'Nginx holds tokens in memory until 4KB of buffer fills up, destroying the real-time streaming user experience.',
        howToFix: 'Ensure reverse proxies pass SSE chunks through without buffering.',
      },
      {
        mistake: 'Using naive static batching where short 50-token requests are forced to wait for 1,000-token requests to finish',
        solution: 'Use vLLM or continuous iteration-level batching engines.',
        whyWrong: 'Static batching forces fast queries to wait for slow queries, causing latency degradation for short requests.',
        howToFix: 'Adopt continuous batching engines that insert new requests on every token iteration.',
      },
    ],

    realWorldUseCases: [
      {
        title: 'Customer Support Chatbot Gateway',
        description: 'Serving 500 concurrent streaming chat sessions with vLLM PagedAttention on two NVIDIA A10G GPUs with 240ms TTFT.',
      },
      {
        title: 'Multi-Model Fallback Router',
        description: 'Routing queries to low-cost Gemini Flash, automatically failing over to Claude 3.5 Sonnet if rate limits are exceeded.',
      },
    ],

    practiceQuestions: [
      {
        id: 'q1',
        question: 'What is Time-to-First-Token (TTFT) and why is it the most critical latency metric in interactive LLM applications?',
        answer: 'TTFT is the duration between the user sending a prompt and the first generated token appearing on their screen. It dictates user perception of speed; once tokens start flowing, users read comfortably at 30-50 tokens/sec.',
        explanation: 'Low TTFT makes an application feel instant and responsive.',
      },
      {
        id: 'q2',
        question: 'How does vLLM’s PagedAttention solve memory fragmentation in LLM serving?',
        answer: 'It adapts the virtual memory paging concepts of operating systems to KV caches, allocating small fixed-size memory blocks (e.g. 16 tokens) on demand rather than pre-allocating large contiguous memory buffers for every user.',
        explanation: 'PagedAttention recovers up to 80% of wasted memory, dramatically boosting concurrent user capacity.',
      },
      {
        id: 'q3',
        question: 'What is the role of Server-Sent Events (SSE) in LLM web interfaces?',
        answer: 'SSE provides a standardized, unidirectional persistent HTTP connection (`text/event-stream`) allowing the server to push tokens in real time to the browser as they are generated.',
        explanation: 'SSE is simpler and more firewall-friendly than WebSockets for unidirectional text streaming.',
      },
    ],

    quiz: [
      {
        id: 'quiz-1',
        question: 'What HTTP Content-Type header is required for Server-Sent Events (SSE) token streaming?',
        options: ['application/json', 'text/event-stream', 'multipart/form-data', 'application/octet-stream'],
        correctIndex: 1,
        explanation: '`text/event-stream` is the official W3C MIME type that tells browsers to expect a continuous stream of events.',
      },
      {
        id: 'quiz-2',
        question: 'What is the difference between Time-to-First-Token (TTFT) and Inter-Token Latency (ITL)?',
        options: [
          'TTFT is prompt prefill latency until the first token arrives; ITL is the time between each subsequent generated token',
          'TTFT is for images, ITL is for text',
          'TTFT is measured in minutes, ITL in hours',
          'There is no difference in LLM metrics',
        ],
        correctIndex: 0,
        explanation: 'TTFT measures initial responsiveness; ITL measures streaming smoothness and reading speed.',
      },
      {
        id: 'quiz-3',
        question: 'Why does doubling an LLM’s context sequence length (e.g. from 4K to 8K tokens) double its KV cache memory footprint per user?',
        options: [
          'Because the model weights double in size',
          'Because KV cache memory scales linearly with sequence length: each token requires storing keys and values across all attention layers',
          'Because the GPU voltage doubles',
          'Because Python integers use more bytes',
        ],
        correctIndex: 1,
        explanation: 'M_KV = 2 * layers * heads * head_dim * seq_len * bytes. Memory scales directly with sequence length.',
      },
      {
        id: 'quiz-4',
        question: 'What is the primary architectural advantage of continuous iteration-level batching (as implemented in vLLM) over static batching?',
        options: [
          'It deletes the model weights after each request',
          'It allows new requests to join the batch and completed requests to leave on every single token iteration, preventing fast requests from waiting on long requests',
          'It forces all users to use the exact same prompt',
          'It turns off GPU fans to save electricity',
        ],
        correctIndex: 1,
        explanation: 'Continuous batching maximizes GPU utilization by dynamically recycling finished slots token-by-token.',
      },
    ],

    independentExercise: {
      title: 'Build a Multi-Provider Fallback Router',
      problem:
        'Write a Python function `route_llm_request(prompt, providers)` that attempts inference against a primary provider. If the primary raises an exception (e.g. RateLimit 429), it logs a warning and falls back to the secondary provider, returning the successful result and provider metadata.',
      hints: [
        'Iterate through the list of provider callables',
        'Use try...except Exception to catch failures and continue to the next provider',
        'Raise RuntimeError if all providers fail',
      ],
      starterCode: `def route_llm_request(prompt: str, providers: list[dict]) -> dict:
    # TODO: Implement tiered fallback routing
    pass
`,
      solution: `def route_llm_request(prompt: str, providers: list[dict]) -> dict:
    errors = []
    for p in providers:
        name = p["name"]
        fn = p["call_fn"]
        try:
            result = fn(prompt)
            return {"provider": name, "result": result, "fallback_count": len(errors)}
        except Exception as e:
            errors.append(f"{name}: {str(e)}")
            
    raise RuntimeError(f"All model providers failed! Errors: {errors}")
`,
    },

    summary: {
      keyTakeaways: [
        'Implement Server-Sent Events (SSE) streaming to reduce user-perceived latency (TTFT) from seconds down to sub-500ms',
        'Adopt continuous batching engines (vLLM) to eliminate KV cache fragmentation and serve 4x higher user concurrency',
        'Configure tiered fallback routers to protect applications against commercial provider rate limits and service outages',
      ],
      nextLessonId: 'deploy-13-security-reliability',
      nextLessonTitle: 'Deploy-13: Production AI Security, Privacy & Reliability',
      nextLessonModuleId: 'p11-m13',
    },
  },
};
