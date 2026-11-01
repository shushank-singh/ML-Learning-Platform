import { ModuleData, LessonContent } from '@/lib/types';

// =========================================================================
// MODULE 1: AI Deployment Fundamentals (p11-m1)
// =========================================================================
export const p11m1Data: ModuleData = {
  id: 'p11-m1',
  number: 1,
  title: 'AI Deployment Fundamentals',
  subtitle: 'From Local Prototypes to Resilient Production Inference Systems',
  description:
    'Deconstruct the architectural shift from experimental Jupyter notebooks to production-grade AI services. Master deployment environments (development, staging, production), architectural patterns for classical ML, Deep Learning, and LLMs, request lifecycles, and trade-offs between latency, throughput, cost, and privacy.',
  icon: 'Server',
  badge: 'Phase 11 · AI Deployment',
  estimatedHours: 3,
  topicsCount: 1,
  lessons: [
    {
      id: 'deploy-01-fundamentals',
      moduleId: 'p11-m1',
      title: 'Deploy-01: AI Deployment Fundamentals & Architecture',
      description:
        'Local dev vs staging vs production, request-response lifecycles, microservice inference patterns, and deployment decision frameworks.',
      order: 1,
      readTimeMinutes: 35,
      visualizerType: 'deploy-architecture-explorer',
      difficulty: 'Beginner',
    },
  ],
};

// =========================================================================
// MODULE 2: Linux and Server Fundamentals (p11-m2)
// =========================================================================
export const p11m2Data: ModuleData = {
  id: 'p11-m2',
  number: 2,
  title: 'Linux and Server Fundamentals',
  subtitle: 'Processes, Ports, Resource Isolation & Server Administration for AI',
  description:
    'Master the operating system foundation powering AI infrastructure. Learn process management, systemd service daemons, environment variable hygiene, POSIX file permissions, logs, SSH administration, CPU/GPU hardware monitoring, and essential terminal troubleshooting tools.',
  icon: 'Terminal',
  badge: 'Phase 11 · AI Deployment',
  estimatedHours: 3,
  topicsCount: 1,
  lessons: [
    {
      id: 'deploy-02-linux-servers',
      moduleId: 'p11-m2',
      title: 'Deploy-02: Linux and Server Fundamentals for AI Systems',
      description:
        'Processes, ports, systemd daemons, POSIX permissions, SSH access, resource monitoring (htop, nvidia-smi), and server troubleshooting.',
      order: 1,
      readTimeMinutes: 34,
      visualizerType: 'deploy-architecture-explorer',
      difficulty: 'Intermediate',
    },
  ],
};

// =========================================================================
// MODULE 3: Networking, HTTP and DNS (p11-m3)
// =========================================================================
export const p11m3Data: ModuleData = {
  id: 'p11-m3',
  number: 3,
  title: 'Networking, HTTP and DNS',
  subtitle: 'Protocols, TLS Certificates, Reverse Proxies & Ingress Routing',
  description:
    'Trace the journey of inference data across modern computer networks. Understand HTTP methods, status codes, JSON wire payloads, DNS A/CNAME records, TLS 1.3 encryption, Nginx reverse proxies, CORS preflight negotiation, and common networking failure modes in production.',
  icon: 'Network',
  badge: 'Phase 11 · AI Deployment',
  estimatedHours: 3,
  topicsCount: 1,
  lessons: [
    {
      id: 'deploy-03-networking-http-dns',
      moduleId: 'p11-m3',
      title: 'Deploy-03: Networking, HTTP, DNS & Reverse Proxies',
      description:
        'HTTP request lifecycle, status code triage, TLS termination, Nginx reverse proxy configuration, CORS policies, and gateway debugging.',
      order: 1,
      readTimeMinutes: 36,
      visualizerType: 'deploy-http-journey-explorer',
      difficulty: 'Intermediate',
    },
  ],
};

// =========================================================================
// LESSON CONTENTS (Modules 1 - 3)
// =========================================================================
export const deploymentModule1Lessons: Record<string, LessonContent> = {
  'deploy-01-fundamentals': {
    id: 'deploy-01-fundamentals',
    moduleId: 'p11-m1',
    title: 'Deploy-01: AI Deployment Fundamentals & Architecture',
    subtitle: 'From Experimental Jupyter Notebooks to Resilient Production Inference Systems',
    order: 1,
    readTimeMinutes: 35,
    difficulty: 'Beginner',
    visualizerType: 'deploy-architecture-explorer',

    objectives: [
      'Contrast development, staging, and production environments for machine learning systems',
      'Analyze deployment architectures for tabular ML APIs, computer vision models, and LLM services',
      'Trace the end-to-end request-response inference lifecycle across network boundaries',
      'Evaluate architectural trade-offs across latency, throughput, compute cost, and data privacy',
      'Apply Little’s Law and queueing theory to determine concurrency capacity and server sizing',
    ],

    prerequisites: [
      'Basic Python programming and familiarity with REST APIs',
      'Core ML/Deep Learning model lifecycle concepts (Phases 3 & 10)',
    ],
    previousLesson: {
      id: 'mlops-15-production-capstone',
      title: 'MLOps-15: Production-Ready ML + LLM System Capstone',
      moduleId: 'p10-m15',
    },

    analogy: {
      title: 'The Home Kitchen vs. The Commercial Michelin Restaurant',
      text: 'Writing an ML model in a Jupyter notebook is like cooking a meal in your home kitchen: you experiment freely with pinch-of-this recipes, adjust heat on the fly, and serve one plate directly to yourself. Deploying to production is like opening a commercial 500-seat restaurant: ingredients must arrive through certified supply chains, every dish must be prepared to exact health codes in under 12 minutes, orders must be routed through a ticket queue, and if 50 customers arrive at once, the kitchen must scale line cooks horizontally without dropping plates.',
      metaphor: 'The notebook is your culinary sketchbook; the production deployment is the resilient commercial restaurant operation.',
    },

    problemSolved: {
      title: 'Bridging the Machine Learning "Valley of Death"',
      description:
        'Industry research shows that over 80% of enterprise machine learning models never make it to production. When models stay trapped in exploratory notebooks, they suffer from dependency drift, lack scalability, expose security vulnerabilities, and crash under concurrent traffic.',
      keyPoints: [
        'Notebooks hold mutable state, hardcoded file paths, and unpinned dependencies that fail outside the local laptop',
        'Production systems require deterministic reproducibility, automated health checks, and horizontal scalability',
        'Inference latency directly impacts user conversion and business revenue in customer-facing applications',
        'Separating staging and production prevents buggy model updates or schema breaking changes from reaching end users',
      ],
    },

    intuition: {
      overview:
        'Production AI deployment is about transforming serialized mathematical weights into a dependable, observable network service that responds correctly under heavy, concurrent load.',
      steps: [
        {
          step: 1,
          title: 'Isolation of Environments',
          description:
            'Development is where data scientists train and experiment. Staging is an exact mirror of production where automated integration tests run against synthetic data. Production is the secure, locked-down environment serving real user traffic.',
        },
        {
          step: 2,
          title: 'Model Packaging and Decoupling',
          description:
            'Weights are serialized into immutable formats (ONNX, Safetensors) and loaded inside a lightweight web service (FastAPI) decoupled from the original training pipelines.',
        },
        {
          step: 3,
          title: 'Edge Ingress and Routing',
          description:
            'Clients send HTTPS requests to a domain. A reverse proxy or load balancer terminates TLS, enforces rate limits, and routes payloads to healthy backend worker replicas.',
        },
        {
          step: 4,
          title: 'Inference Execution & Serialization',
          description:
            'The backend validates input schemas with Pydantic, transforms raw features into tensors, runs the model forward pass, and returns structured JSON output.',
        },
      ],
    },

    mathematics: {
      overview:
        'Capacity planning and latency analysis rely on fundamental queueing theory and Little’s Law to model server concurrency.',
      foundations: [
        {
          name: "Little's Law for Inference Concurrency",
          latex: 'L = \\lambda \\times W',
          explanation:
            'Average number of concurrent requests in the inference system (L) equals the arrival rate (lambda in req/sec) multiplied by average response time (W in seconds).',
        },
        {
          name: 'Server Utilization Factor (M/M/1 Queue)',
          latex: '\\rho = \\frac{\\lambda}{c \\times \\mu}',
          explanation:
            'Utilization rho equals arrival rate lambda divided by total service capacity (c servers times mean service rate mu per server). When rho approaches 1.0, queue delay spikes exponentially.',
        },
      ],
    },

    derivation: {
      title: 'Derivation of Average Queueing Delay in M/M/1 Server Systems',
      objective: 'Calculate how server utilization impacts inference response latency under increasing load.',
      steps: [
        {
          step: 1,
          label: 'System State Probability',
          latex: 'P_n = (1 - \\rho) \\rho^n',
          explanation: 'Probability that exactly n requests are in the system (either being served or waiting in the queue).',
        },
        {
          step: 2,
          label: 'Expected Requests in System (L)',
          latex: 'L = \\sum_{n=0}^{\\infty} n P_n = \\frac{\\rho}{1 - \\rho}',
          explanation: 'Sum of geometric progression gives expected in-flight request concurrency.',
        },
        {
          step: 3,
          label: 'Total Response Time (W) via Little’s Law',
          latex: 'W = \\frac{L}{\\lambda} = \\frac{1}{\\mu - \\lambda} = \\frac{1/\\mu}{1 - \\rho}',
          explanation: 'As server utilization rho approaches 90%, latency is multiplied by 10x over base processing time 1/mu.',
        },
      ],
    },

    variables: [
      { symbol: 'L', name: 'Concurrency', description: 'Average number of active requests in-flight inside the server' },
      { symbol: '\\lambda', name: 'Arrival Rate', description: 'Incoming requests per second (RPS) reaching the API' },
      { symbol: 'W', name: 'Latency (Duration)', description: 'Total round-trip time spent in the system (Queue + Compute)' },
      { symbol: '\\mu', name: 'Service Rate', description: 'Maximum requests a single worker can process per second' },
      { symbol: '\\rho', name: 'Utilization', description: 'Fraction of time the worker is busy processing requests (0 to 1)' },
    ],

    numericalExample: {
      scenario: 'Sizing an ML API serving an XGBoost credit risk model with 40ms average inference latency under 200 RPS peak load.',
      dataset: [
        { metric: 'Peak Traffic (lambda)', value: '200 RPS' },
        { metric: 'Mean Inference Time (1/mu)', value: '0.040 seconds (40 ms)' },
        { metric: 'Single Worker Service Rate (mu)', value: '25 RPS' },
      ],
      calculations: [
        {
          step: '1. Concurrency (In-flight requests)',
          math: 'L = 200 * 0.040',
          result: '8 concurrent requests',
        },
        {
          step: '2. Minimum Workers Needed at 100% load',
          math: 'Workers_min = 200 / 25',
          result: '8 workers',
        },
        {
          step: '3. Production Sizing with 60% Target Utilization',
          math: 'Workers_prod = ceil(8 / 0.60)',
          result: '14 worker processes across 4 CPU nodes',
        },
      ],
      finalConclusion: 'To maintain sub-50ms latency during traffic surges, provision at least 14 worker processes.',
    },

    visualExplanation: {
      title: 'Understanding the AI Deployment Architecture Explorer',
      description:
        'The interactive visualizer models a real-world multi-tier AI deployment, showcasing network hops, reverse proxy overhead, API gateway routing, optional Redis semantic caching, and compute tier sizing.',
      features: [
        'Switch between Monolithic CPU, Split GPU Worker, and Enterprise Hybrid architectures',
        'Adjust incoming RPS slider to observe latency degradation and Little’s Law concurrency shifts',
        'Toggle Redis Caching to observe a 38% drop in model load and sub-2ms response times for cache hits',
        'Inspect estimated monthly cloud compute bills calculated dynamically from replica counts',
      ],
    },

    scratchCode: {
      title: 'Python from Scratch: In-Memory Request Router and Concurrency Tracker',
      explanation: 'A lightweight request dispatcher implementing Little’s Law concurrency tracking, timing metrics, and simulated model inference.',
      code: `import time
import statistics

class MockInferenceEngine:
    """Simulates a trained model forward pass."""
    def predict(self, features: list[float]) -> dict:
        # Simulate tensor computation delay
        time.sleep(0.015)  # 15ms compute
        score = sum(features) / (len(features) or 1)
        return {"probability": round(1.0 / (1.0 + 2.718 ** (-score)), 4)}

class ProductionAPIRouter:
    def __init__(self, engine: MockInferenceEngine):
        self.engine = engine
        self.active_requests = 0
        self.latencies_ms: list[float] = []

    def dispatch(self, payload: dict) -> dict:
        self.active_requests += 1
        t_start = time.perf_counter()
        try:
            # 1. Validation
            if "features" not in payload or not isinstance(payload["features"], list):
                return {"status": 422, "error": "Invalid features payload"}

            # 2. Forward pass
            result = self.engine.predict(payload["features"])
            return {"status": 200, "data": result}
        finally:
            t_end = time.perf_counter()
            self.active_requests -= 1
            duration_ms = (t_end - t_start) * 1000.0
            self.latencies_ms.append(duration_ms)

    def get_metrics(self) -> dict:
        if not self.latencies_ms:
            return {"count": 0}
        return {
            "total_requests": len(self.latencies_ms),
            "p50_latency_ms": round(statistics.median(self.latencies_ms), 2),
            "p95_latency_ms": round(statistics.quantiles(self.latencies_ms, n=20)[18], 2),
            "active_concurrency": self.active_requests,
        }

if __name__ == "__main__":
    router = ProductionAPIRouter(MockInferenceEngine())
    for i in range(25):
        resp = router.dispatch({"features": [0.5, -0.2, 1.4]})
    metrics = router.get_metrics()
    print("Execution Metrics:", metrics)
`,
    },

    sklearnCode: {
      title: 'FastAPI Production Service with Health Probes & Timing Middleware',
      explanation: 'Complete production-grade FastAPI web service with Pydantic validation, timing headers, and readiness probes.',
      code: `from fastapi import FastAPI, Request, HTTPException
from pydantic import BaseModel, Field
import time
import numpy as np

app = FastAPI(title="Production AI Inference Service", version="1.0.0")

class InferenceRequest(BaseModel):
    user_id: str = Field(..., example="usr_12948")
    features: list[float] = Field(..., min_items=3, max_items=10)

class InferenceResponse(BaseModel):
    user_id: str
    prediction: int
    probability: float
    latency_ms: float

# Model state holder
model_state = {"loaded": True, "weights": np.array([0.45, -0.22, 0.88])}

@app.middleware("http")
async def add_timing_header(request: Request, call_next):
    start_time = time.perf_counter()
    response = await call_next(request)
    duration_ms = (time.perf_counter() - start_time) * 1000.0
    response.headers["X-Response-Time-Ms"] = f"{duration_ms:.2f}"
    return response

@app.get("/health/liveness")
def liveness():
    """Kubernetes liveness probe: indicates process is responsive."""
    return {"status": "alive"}

@app.get("/health/readiness")
def readiness():
    """Kubernetes readiness probe: indicates model weights are in memory."""
    if not model_state["loaded"]:
        raise HTTPException(status_code=503, detail="Model weights not yet initialized")
    return {"status": "ready", "model_version": "v1.2"}

@app.post("/v1/predict", response_model=InferenceResponse)
def predict(payload: InferenceRequest):
    t0 = time.perf_counter()
    x = np.array(payload.features[:3])
    raw_logit = float(np.dot(x, model_state["weights"]))
    prob = 1.0 / (1.0 + np.exp(-raw_logit))
    pred = 1 if prob >= 0.5 else 0
    t_ms = (time.perf_counter() - t0) * 1000.0

    return InferenceResponse(
        user_id=payload.user_id,
        prediction=pred,
        probability=round(prob, 4),
        latency_ms=round(t_ms, 2)
    )
`,
    },

    runnableCode: {
      code: `import time
import math

# Simulate Little's Law and API Concurrency
def compute_littles_law(arrival_rate_rps: float, latency_sec: float) -> float:
    return arrival_rate_rps * latency_sec

def simulate_inference_load():
    rps = 250.0  # 250 requests per second
    latency = 0.032  # 32 milliseconds average service time
    concurrency = compute_littles_law(rps, latency)
    
    print(f"=== INFERENCE CAPACITY DIAGNOSTICS ===")
    print(f"Arrival Rate (lambda):   {rps:.0f} req/sec")
    print(f"Service Latency (W):     {latency*1000:.1f} ms")
    print(f"In-Flight Concurrency:   {concurrency:.2f} active requests")
    print(f"Recommended Worker Pool: {math.ceil(concurrency * 1.5)} processes (with 50% headroom)")

simulate_inference_load()
`,
      expectedOutput: `=== INFERENCE CAPACITY DIAGNOSTICS ===
Arrival Rate (lambda):   250 req/sec
Service Latency (W):     32.0 ms
In-Flight Concurrency:   8.00 active requests
Recommended Worker Pool: 12 processes (with 50% headroom)`,
    },

    lineByLineExplanation: [
      {
        lines: '1-6',
        codeSnippet: 'compute_littles_law(arrival_rate_rps, latency_sec)',
        explanation: 'Applies Little’s Law L = lambda * W to calculate the continuous in-flight request concurrency.',
      },
      {
        lines: '7-12',
        codeSnippet: 'rps = 250.0; latency = 0.032; concurrency = compute_littles_law(rps, latency)',
        explanation: 'Multiplies 250 req/sec by 0.032s to find that exactly 8.0 requests are executing in memory concurrently at any given millisecond.',
      },
      {
        lines: '13-17',
        codeSnippet: 'Recommended Worker Pool: math.ceil(concurrency * 1.5)',
        explanation: 'Applies a standard 50% capacity safety margin (targeting 66% worker utilization) so traffic spikes do not cause latency explosions.',
      },
    ],

    hyperparameters: [
      {
        name: 'Worker Count (c)',
        defaultVal: '4',
        range: '1 to 64',
        effect: 'Determines parallel request execution capacity before requests queue up',
        recommendation: 'Size worker count based on available CPU cores (e.g. 2 * num_cores + 1 for I/O bound tasks).',
      },
      {
        name: 'Timeout Threshold',
        defaultVal: '5.0s',
        range: '1.0s to 30.0s',
        effect: 'Terminates runaway forward passes to prevent worker thread starvation',
        recommendation: 'Set to 3x your P99 expected latency.',
      },
    ],

    assumptions: [
      {
        assumption: 'Stateless Workers',
        whyItMatters: 'If workers save user state in memory, requests cannot be safely routed across different pods by load balancers.',
        howToVerify: 'Verify that any pod can fulfill any incoming prediction request without local session affinity.',
      },
    ],

    commonMistakes: [
      {
        mistake: 'Deploying exploratory Jupyter notebooks directly to production using headless web wrappers',
        solution: 'Refactor model code into clean, version-controlled Python modules with strict Pydantic schemas and unit tests.',
        whyWrong: 'Notebooks have uncontrolled execution order, hidden global state, and massive memory overhead.',
        howToFix: 'Export serialized weights and load them inside a clean FastAPI service.',
      },
      {
        mistake: 'Failing to separate staging from production environments',
        solution: 'Maintain an identical staging environment where automated integration tests validate new weights before release.',
        whyWrong: 'Pushing untested code or models directly to production risks catastrophic customer outages.',
        howToFix: 'Establish CI/CD pipelines that deploy to staging first, run smoke tests, and require sign-off.',
      },
    ],

    realWorldUseCases: [
      {
        title: 'FinTech Real-Time Fraud Scoring',
        description: 'Processing 4,000 credit card authorizations per second with sub-25ms P99 latency SLA using split microservices.',
      },
      {
        title: 'E-Commerce Recommendation System',
        description: 'Serving personalized product rankings to 50,000 concurrent mobile users with horizontal autoscaling pods.',
      },
    ],

    practiceQuestions: [
      {
        id: 'q1',
        question: 'What is the primary difference between development, staging, and production environments?',
        answer: 'Development is for exploratory experimentation; staging mirrors production configuration for automated testing; production serves live customer traffic with high reliability SLAs.',
        explanation: 'Strict separation prevents experimental code or unverified dependencies from breaking live production systems.',
      },
      {
        id: 'q2',
        question: 'According to Little’s Law, if an ML service receives 500 RPS and has an average latency of 20ms, what is the required concurrency?',
        answer: '10 concurrent in-flight requests (500 * 0.020 = 10).',
        explanation: 'Little’s Law states L = lambda * W. 500 req/s * 0.02s = 10 requests.',
      },
      {
        id: 'q3',
        question: 'Why should machine learning model inference services be designed as stateless applications?',
        answer: 'Stateless services allow horizontal load balancers to route incoming requests to any replica without session dependency or data loss.',
        explanation: 'Statelessness enables instant scaling, zero-downtime rolling updates, and automatic container self-healing.',
      },
    ],

    quiz: [
      {
        id: 'quiz-1',
        question: 'If an inference service experiences an arrival rate of 400 RPS with an average latency of 50ms, what is the average number of concurrent requests being processed?',
        options: ['8 requests', '20 requests', '50 requests', '200 requests'],
        correctIndex: 1,
        explanation: 'By Little’s Law, L = lambda * W = 400 * 0.050 = 20 in-flight requests.',
      },
      {
        id: 'quiz-2',
        question: 'Why is loading model weights inside a Jupyter notebook unsuitable for high-throughput production serving?',
        options: [
          'Notebooks cannot run Python code',
          'Notebooks maintain hidden global state and lack production process management, concurrency, and health probes',
          'Notebooks only support Scikit-learn, not PyTorch',
          'Notebooks are slower at linear algebra matrix multiplication',
        ],
        correctIndex: 1,
        explanation: 'Notebooks are designed for interactive experimentation, lacking ASGI process managers, connection pooling, and automated error handling.',
      },
      {
        id: 'quiz-3',
        question: 'What happens to queueing latency in an M/M/1 server system as utilization (rho) approaches 1.0 (100%)?',
        options: [
          'Queueing latency drops to 0',
          'Queueing latency remains completely flat',
          'Queueing latency spikes asymptotically toward infinity',
          'Queueing latency decreases linearly',
        ],
        correctIndex: 2,
        explanation: 'The queue delay formula W = (1/mu) / (1 - rho) demonstrates that latency grows asymptotically as utilization approaches 100%.',
      },
      {
        id: 'quiz-4',
        question: 'What is the role of a staging environment in modern AI deployment pipelines?',
        options: [
          'To train the deep learning model from scratch on raw GPUs',
          'To mirror production infrastructure and validate integration, performance, and schema compatibility before release',
          'To store cold archive backups of old datasets',
          'To run local unit tests on developer laptops',
        ],
        correctIndex: 1,
        explanation: 'Staging acts as the pre-production gatekeeper where automated integration tests and smoke checks ensure stability before user-facing deployment.',
      },
    ],

    independentExercise: {
      title: 'Build a Production Model Capacity & Sizing Calculator',
      problem:
        'Write a Python function `calculate_cluster_capacity(target_rps, avg_latency_ms, max_cpu_utilization)` that returns the required concurrency and recommended worker count with headroom.',
      hints: [
        'Convert avg_latency_ms to seconds by dividing by 1000',
        'Use Little’s Law L = target_rps * latency_sec',
        'Divide concurrency by max_cpu_utilization (e.g. 0.70) to ensure safe operational headroom',
      ],
      starterCode: `def calculate_cluster_capacity(target_rps: float, avg_latency_ms: float, max_cpu_utilization: float = 0.70) -> dict:
    # TODO: Implement Little's Law and worker sizing
    pass

# Test your implementation
print(calculate_cluster_capacity(500, 35, 0.65))
`,
      solution: `import math

def calculate_cluster_capacity(target_rps: float, avg_latency_ms: float, max_cpu_utilization: float = 0.70) -> dict:
    latency_sec = avg_latency_ms / 1000.0
    concurrency = target_rps * latency_sec
    recommended_workers = math.ceil(concurrency / max_cpu_utilization)
    return {
        "target_rps": target_rps,
        "concurrency_in_flight": round(concurrency, 2),
        "target_utilization": max_cpu_utilization,
        "recommended_workers": recommended_workers,
    }

print(calculate_cluster_capacity(500, 35, 0.65))
`,
    },

    summary: {
      keyTakeaways: [
        'Moving from notebooks to production requires isolating environments (Dev, Staging, Prod) and decoupling weights from training scripts',
        'Little’s Law (L = lambda * W) governs server concurrency: arrival rate multiplied by latency determines active in-flight requests',
        'Keeping server utilization below 70% prevents exponential queue delays and protects against traffic surges',
      ],
      nextLessonId: 'deploy-02-linux-servers',
      nextLessonTitle: 'Deploy-02: Linux and Server Fundamentals for AI Systems',
      nextLessonModuleId: 'p11-m2',
    },
  },

  'deploy-02-linux-servers': {
    id: 'deploy-02-linux-servers',
    moduleId: 'p11-m2',
    title: 'Deploy-02: Linux and Server Fundamentals for AI Systems',
    subtitle: 'Processes, Ports, Environment Variables & Production Server Administration',
    order: 1,
    readTimeMinutes: 34,
    difficulty: 'Intermediate',
    visualizerType: 'deploy-architecture-explorer',

    objectives: [
      'Master Linux process management, background daemons, signals (SIGTERM, SIGKILL), and systemd service units',
      'Manage network ports, socket binding, loopback addresses, and firewall security',
      'Enforce environment variable isolation and secure configuration without hardcoded values',
      'Audit POSIX file permissions (chmod, chown) and apply least-privilege principles to AI services',
      'Troubleshoot memory saturation, swap thrashing, CPU throttling, and GPU VRAM with standard CLI tools',
    ],

    prerequisites: [
      'Basic familiarity with command-line interfaces (Bash, PowerShell)',
      'Understanding of client-server application lifecycles (Deploy-01)',
    ],
    previousLesson: {
      id: 'deploy-01-fundamentals',
      title: 'Deploy-01: AI Deployment Fundamentals & Architecture',
      moduleId: 'p11-m1',
    },

    analogy: {
      title: 'The Operating System as Air Traffic Control',
      text: 'A Linux server is like a busy international airport. Processes are aircraft taxiing, taking off, and landing. Ports are assigned gates where specific flights connect to passengers. Memory and CPU cores are runways and terminal space. If one rogue aircraft refuses to vacate a gate, air traffic controllers don’t shut down the whole airport—they send a polite ground signal (SIGTERM), and if ignored, a tow truck forcibly clears the tarmac (SIGKILL). Systemd is the master flight scheduler ensuring failed services reboot automatically.',
      metaphor: 'Linux is the air traffic controller orchestrating hardware resources among competing containerized processes.',
    },

    problemSolved: {
      title: 'Operating Resilient Server Infrastructure',
      description:
        'Data scientists often struggle when moving from Windows/macOS laptops to remote Linux servers. Without solid fundamentals in Linux daemon management, memory limits, and permissions, model processes die silently on logout, leak memory into swap, or get killed by the Linux Out-Of-Memory (OOM) killer.',
      keyPoints: [
        'Running models interactively in SSH terminals causes processes to terminate immediately when the SSH connection drops',
        'Systemd provides robust supervisor management: auto-restart on crash, log aggregation, and cgroup resource limits',
        'POSIX permissions prevent unauthorized users or web applications from tampering with serialized model files',
        'Knowing how to inspect memory (/proc/meminfo) and GPU status (nvidia-smi) prevents sudden production outages',
      ],
    },

    intuition: {
      overview:
        'Linux server administration for AI centers on managing processes, isolating environment configurations, and monitoring hardware resources.',
      steps: [
        {
          step: 1,
          title: 'Daemonization and Supervision',
          description:
            'AI web servers should never run in an interactive shell. They are configured as systemd service units with Restart=always and ExecStart pointing to virtual environments.',
        },
        {
          step: 2,
          title: 'Ports and Network Sockets',
          description:
            'Services bind to network sockets (e.g. 0.0.0.0:8000 for all interfaces, 127.0.0.1:8000 for loopback behind reverse proxies).',
        },
        {
          step: 3,
          title: 'Least Privilege File Permissions',
          description:
            'Model files and API code belong to a dedicated unprivileged user (e.g. appuser UID 1000) with read-only permissions on weights (chmod 440) to prevent tampering.',
        },
        {
          step: 4,
          title: 'Signal Handling & Graceful Draining',
          description:
            'When rolling out new models, systemd sends SIGTERM. The API stops accepting new connections, finishes in-flight inferences within a grace period (e.g. 15s), and exits cleanly.',
        },
      ],
    },

    mathematics: {
      overview:
        'Memory allocation on Linux servers directly dictates container limits and swap thresholds.',
      foundations: [
        {
          name: 'Tensor Memory Footprint',
          latex: 'M_{\\text{bytes}} = \\prod_{i=1}^D d_i \\times B_{\\text{dtype}}',
          explanation:
            'The memory allocated by a multi-dimensional tensor of shape (d_1, d_2, ..., d_D) equals the product of dimensions multiplied by bytes per element (4 bytes for FP32, 2 bytes for FP16).',
        },
        {
          name: 'Linux OOM Score Calculation',
          latex: '\\text{oom\\_score} = \\min\\left(1000, \\frac{\\text{RSS} + \\text{swap}}{\\text{Total RAM}} \\times 1000\\right) + \\text{oom\\_score\\_adj}',
          explanation:
            'The Linux kernel Out-Of-Memory killer terminates the process with the highest oom_score when system RAM is exhausted.',
        },
      ],
    },

    derivation: {
      title: 'Derivation of Memory Allocation for Model Batch Processing',
      objective: 'Calculate the peak resident memory (RSS) required to run an inference batch on CPU.',
      steps: [
        {
          step: 1,
          label: 'Weight Memory',
          latex: 'M_{\\text{weights}} = P \\times B_{\\text{param}}',
          explanation: 'A model with P=100M parameters in FP32 requires 100 * 10^6 * 4 bytes = 400 MB.',
        },
        {
          step: 2,
          label: 'Activation Memory per Sample',
          latex: 'M_{\\text{act}} = \\sum_{l=1}^L A_l \\times B_{\\text{act}}',
          explanation: 'Sum of all intermediate feature map tensors during the forward pass.',
        },
        {
          step: 3,
          label: 'Total Peak Process Memory',
          latex: 'M_{\\text{total}} = M_{\\text{runtime}} + M_{\\text{weights}} + (B_{\\text{batch}} \\times M_{\\text{act}})',
          explanation: 'Process RSS includes Python runtime overhead (~120MB), loaded weights, and batch activation buffers.',
        },
      ],
    },

    variables: [
      { symbol: 'P', name: 'Parameter Count', description: 'Total trainable weights in the neural network or model' },
      { symbol: 'B_{\\text{param}}', name: 'Precision Bytes', description: 'Storage per parameter (4 for FP32, 2 for FP16, 1 for INT8)' },
      { symbol: 'B_{\\text{batch}}', name: 'Batch Size', description: 'Number of simultaneous inference samples being computed' },
      { symbol: 'RSS', name: 'Resident Set Size', description: 'Physical RAM currently held by the Linux process (excluding swap)' },
    ],

    numericalExample: {
      scenario: 'Calculating total RAM needed for a ResNet-50 computer vision API running on an Ubuntu server.',
      dataset: [
        { component: 'Python & PyTorch C++ Runtime', size: '180 MB' },
        { component: 'ResNet-50 Weights (25.5M FP32 params)', size: '102 MB' },
        { component: 'Activations per image (224x224x3)', size: '12 MB' },
        { component: 'Concurrent Batch Size', size: '8 images' },
      ],
      calculations: [
        {
          step: '1. Activation Buffer for Batch 8',
          math: '8 * 12 MB',
          result: '96 MB',
        },
        {
          step: '2. Total Process RSS',
          math: '180 MB + 102 MB + 96 MB',
          result: '378 MB',
        },
        {
          step: '3. Safe Container Memory Limit (cgroup)',
          math: '378 MB * 1.5 (safety buffer)',
          result: '567 MB (Set cgroup limit to 600 MB)',
        },
      ],
      finalConclusion: 'A container allocated 600 MB of RAM can comfortably serve 8 concurrent image inferences without triggering OOM-killer.',
    },

    visualExplanation: {
      title: 'Linux Process Architecture and Resource Isolation',
      description:
        'In production Linux environments, systemd supervisors isolate AI services inside dedicated cgroups, controlling memory limits and CPU quotas while capturing logs via journald.',
      features: [
        'systemd unit defines auto-restart triggers and graceful shutdown timeouts (TimeoutStopSec=15s)',
        'Standard streams stdout and stderr are automatically ingested into centralized journald logging',
        'cgroup enforcement prevents memory runaway from starving adjacent database or proxy processes',
      ],
    },

    scratchCode: {
      title: 'Python from Scratch: Linux System & Memory Diagnostics Inspector',
      explanation: 'Reads directly from the Linux /proc pseudo-filesystem to extract real-time system metrics without external dependencies.',
      code: `import os
import platform

class LinuxSystemInspector:
    """Reads OS telemetry directly from /proc on Linux (or simulated on other OS)."""
    
    @staticmethod
    def get_memory_info() -> dict:
        meminfo_path = "/proc/meminfo"
        if os.path.exists(meminfo_path):
            data = {}
            with open(meminfo_path, "r") as f:
                for line in f:
                    parts = line.split(":")
                    if len(parts) == 2:
                        key = parts[0].strip()
                        val = parts[1].strip().split()[0]
                        data[key] = int(val)
            total_mb = data.get("MemTotal", 0) // 1024
            avail_mb = data.get("MemAvailable", 0) // 1024
            used_mb = total_mb - avail_mb
            return {"total_mb": total_mb, "used_mb": used_mb, "available_mb": avail_mb}
        else:
            # Fallback mock for non-Linux dev environments
            return {"total_mb": 16384, "used_mb": 6240, "available_mb": 10144, "simulated": True}

    @staticmethod
    def inspect_process() -> dict:
        return {
            "pid": os.getpid(),
            "os": platform.system(),
            "env_vars_count": len(os.environ),
            "app_env": os.getenv("APP_ENV", "production"),
        }

if __name__ == "__main__":
    inspector = LinuxSystemInspector()
    print("Process Info:", inspector.inspect_process())
    print("Memory Info:", inspector.get_memory_info())
`,
    },

    sklearnCode: {
      title: 'Production systemd Service Unit Configuration (aiml-api.service)',
      explanation: 'Complete systemd unit definition running FastAPI under an unprivileged user with resource limits and logging.',
      code: `[Unit]
Description=Production AI Model Inference Service
After=network.target

[Service]
Type=simple
User=appuser
Group=appuser
WorkingDirectory=/opt/aiml_platform
Environment="PATH=/opt/aiml_platform/venv/bin"
Environment="APP_ENV=production"
Environment="PORT=8000"
ExecStart=/opt/aiml_platform/venv/bin/uvicorn src.main:app --host 0.0.0.0 --port 8000 --workers 4

# Resilience & Auto-Restart
Restart=always
RestartSec=5s
KillSignal=SIGTERM
TimeoutStopSec=15s

# Resource Isolation (cgroups)
MemoryMax=2G
CPUQuota=200%

# Security Sandbox
ProtectSystem=strict
ProtectHome=true
NoNewPrivileges=true
PrivateTmp=true

[Install]
WantedBy=multi-user.target
`,
    },

    runnableCode: {
      code: `import os

def test_environment_validation():
    # Simulate loading production configuration
    os.environ["API_KEY"] = "sec_prod_948f2a17"
    os.environ["MODEL_PATH"] = "/models/v2/model.safetensors"
    
    required_vars = ["API_KEY", "MODEL_PATH"]
    missing = [var for var in required_vars if not os.getenv(var)]
    
    print("=== LINUX SERVER CONFIG CHECK ===")
    if missing:
        print(f"FAILED: Missing environment variables: {missing}")
    else:
        print("SUCCESS: All required environment variables verified.")
        print(f"PID: {os.getpid()} | Model Target: {os.getenv('MODEL_PATH')}")

test_environment_validation()
`,
      expectedOutput: `=== LINUX SERVER CONFIG CHECK ===
SUCCESS: All required environment variables verified.
PID: <ANY_PID> | Model Target: /models/v2/model.safetensors`,
    },

    lineByLineExplanation: [
      {
        lines: '1-6',
        codeSnippet: 'os.environ["API_KEY"] = ...; os.environ["MODEL_PATH"] = ...',
        explanation: 'Sets environment variables in process memory, mimicking production secrets injection by container or systemd.',
      },
      {
        lines: '7-10',
        codeSnippet: 'required_vars = ["API_KEY", "MODEL_PATH"]; missing = [var for var in required_vars if not os.getenv(var)]',
        explanation: 'Performs pre-flight startup assertion to ensure critical configurations exist before loading model weights.',
      },
      {
        lines: '11-16',
        codeSnippet: 'if missing: ... else: print(...)',
        explanation: 'Validates configuration, logging process ID and target model path safely.',
      },
    ],

    hyperparameters: [
      {
        name: 'TimeoutStopSec',
        defaultVal: '15s',
        range: '5s to 60s',
        effect: 'Time systemd waits after SIGTERM before issuing uncatchable SIGKILL',
        recommendation: 'Allow sufficient time for current inference batches to complete gracefully.',
      },
      {
        name: 'MemoryMax',
        defaultVal: '2G',
        range: '512M to 64G',
        effect: 'Cgroup hard limit; kernel triggers OOM killer if exceeded',
        recommendation: 'Set to 1.5x expected peak process memory consumption.',
      },
    ],

    assumptions: [
      {
        assumption: 'Dedicated Service Account',
        whyItMatters: 'Running production web services as root UID 0 grants attackers full control of the host operating system if container escapes occur.',
        howToVerify: 'Run `id` inside the container or verify `User=appuser` in the systemd configuration.',
      },
    ],

    commonMistakes: [
      {
        mistake: 'Hardcoding secrets or database passwords in scripts committed to Git repositories',
        solution: 'Inject secrets at runtime via environment variables, Docker secrets, or cloud key vaults.',
        whyWrong: 'Committed secrets are permanently stored in git history and easily exposed.',
        howToFix: 'Use .env files for local dev only (added to .gitignore) and inject environment variables via CI/CD in production.',
      },
      {
        mistake: 'Leaving defunct child processes as zombies without proper reaping',
        solution: 'Use a proper init process (like tini or dumb-init) in Docker containers to reap orphaned zombie processes.',
        whyWrong: 'Zombie processes consume PID table entries until the operating system can spawn no new processes.',
        howToFix: 'Add `ENTRYPOINT ["/usr/bin/tini", "--"]` in Dockerfiles.',
      },
    ],

    realWorldUseCases: [
      {
        title: 'Cloud GPU Server Administration',
        description: 'Monitoring multi-GPU NVIDIA A10G instances using nvidia-smi and systemd unit logs to detect thermal throttling.',
      },
      {
        title: 'Production Edge Gateway Daemon',
        description: 'Operating low-latency inference endpoints on Debian Linux edge nodes with cgroup memory limits.',
      },
    ],

    practiceQuestions: [
      {
        id: 'q1',
        question: 'What is the key difference between SIGTERM (kill -15) and SIGKILL (kill -9)?',
        answer: 'SIGTERM politely requests the process to shut down, allowing it to close sockets, finish in-flight requests, and flush logs; SIGKILL terminates the process immediately via the kernel without cleanup.',
        explanation: 'Always send SIGTERM first during rolling deployments to allow graceful request draining.',
      },
      {
        id: 'q2',
        question: 'What does the Linux command `lsof -i :8000` accomplish?',
        answer: 'It lists all processes and PIDs currently holding network socket open on port 8000.',
        explanation: 'Essential for diagnosing "Address already in use" errors when launching API servers.',
      },
      {
        id: 'q3',
        question: 'Why should production AI applications execute under a non-root user (e.g. UID 1000)?',
        answer: 'To enforce the principle of least privilege. If a remote code execution vulnerability is exploited, the attacker does not gain root access to the host machine.',
        explanation: 'Non-root execution limits damage to only the unprivileged user’s files.',
      },
    ],

    quiz: [
      {
        id: 'quiz-1',
        question: 'Which Linux signal allows an AI API process to finish currently processing inferences before shutting down?',
        options: ['SIGKILL (kill -9)', 'SIGTERM (kill -15)', 'SIGSTOP', 'SIGSEGV'],
        correctIndex: 1,
        explanation: 'SIGTERM can be caught by the application to initiate graceful shutdown and request draining.',
      },
      {
        id: 'quiz-2',
        question: 'What is the primary role of systemd when hosting an AI web service on a Linux server?',
        options: [
          'To train PyTorch neural network weights',
          'To supervise the process, restart it automatically on failure, and enforce cgroup resource limits',
          'To format hard drives and create ext4 partitions',
          'To generate synthetic training datasets',
        ],
        correctIndex: 1,
        explanation: 'systemd is the standard Linux system and service manager that handles background supervision, logs, and restarts.',
      },
      {
        id: 'quiz-3',
        question: 'What does the Linux Out-Of-Memory (OOM) killer do when available RAM and swap are exhausted?',
        options: [
          'It slows down the CPU clock speed to 10%',
          'It terminates the process with the highest oom_score to prevent an operating system crash',
          'It automatically buys more RAM from the cloud provider',
          'It reboots the physical motherboard instantly',
        ],
        correctIndex: 1,
        explanation: 'The OOM killer identifies the most memory-intensive unprivileged process and terminates it to preserve kernel stability.',
      },
      {
        id: 'quiz-4',
        question: 'What is the difference between binding an API server to 127.0.0.1:8000 versus 0.0.0.0:8000?',
        options: [
          '127.0.0.1 is accessible to the entire public internet, whereas 0.0.0.0 is local only',
          '127.0.0.1 binds exclusively to the local loopback interface, whereas 0.0.0.0 binds to all available network interfaces',
          'There is no difference in Linux networking',
          '0.0.0.0 is only supported in Docker containers',
        ],
        correctIndex: 1,
        explanation: '127.0.0.1 only accepts connections from the same machine (ideal behind an Nginx reverse proxy), whereas 0.0.0.0 accepts traffic from any network interface.',
      },
    ],

    independentExercise: {
      title: 'Build a Safe Environment Variable Config Loader',
      problem:
        'Write a Python function `load_production_config(schema)` that validates that all required environment variables exist and parses typed values (int, float, bool) safely, raising descriptive errors if missing.',
      hints: [
        'Iterate over key-type pairs in schema',
        'Use os.getenv(key) and check for None',
        'Convert strings like "true" or "1" to boolean',
      ],
      starterCode: `import os

def load_production_config(schema: dict) -> dict:
    # TODO: Validate and cast environment variables
    pass

# Test schema: {"PORT": int, "DEBUG": bool, "MODEL_NAME": str}
`,
      solution: `import os

def load_production_config(schema: dict) -> dict:
    config = {}
    missing = []
    
    for key, expected_type in schema.items():
        val = os.getenv(key)
        if val is None:
            missing.append(key)
            continue
        try:
            if expected_type == bool:
                config[key] = val.lower() in ("true", "1", "yes")
            else:
                config[key] = expected_type(val)
        except ValueError:
            raise ValueError(f"Config '{key}' value '{val}' cannot be converted to {expected_type.__name__}")
            
    if missing:
        raise KeyError(f"Missing required environment variables: {missing}")
    return config

os.environ["PORT"] = "8080"
os.environ["DEBUG"] = "false"
os.environ["MODEL_NAME"] = "churn_detector_v1"
print(load_production_config({"PORT": int, "DEBUG": bool, "MODEL_NAME": str}))
`,
    },

    summary: {
      keyTakeaways: [
        'Production AI services must run as supervised background daemons (systemd) under unprivileged accounts (appuser)',
        'Use SIGTERM to initiate graceful draining of in-flight inference requests before rolling updates',
        'Monitor RAM and set cgroup memory limits to prevent sudden termination by the Linux OOM killer',
      ],
      nextLessonId: 'deploy-03-networking-http-dns',
      nextLessonTitle: 'Deploy-03: Networking, HTTP, DNS & Reverse Proxies',
      nextLessonModuleId: 'p11-m3',
    },
  },

  'deploy-03-networking-http-dns': {
    id: 'deploy-03-networking-http-dns',
    moduleId: 'p11-m3',
    title: 'Deploy-03: Networking, HTTP, DNS & Reverse Proxies',
    subtitle: 'From Client Address Bar to Model Microservice Ingress Routing',
    order: 1,
    readTimeMinutes: 36,
    difficulty: 'Intermediate',
    visualizerType: 'deploy-http-journey-explorer',

    objectives: [
      'Trace the end-to-end network path of an inference request from DNS resolution to TLS termination',
      'Diagnose and handle standard HTTP status codes in AI APIs (200, 202, 400, 422, 500, 502, 504)',
      'Configure Nginx reverse proxies with SSL/TLS termination, upstream load balancing, and rate limiting',
      'Deconstruct Cross-Origin Resource Sharing (CORS) preflight OPTIONS negotiations and header security',
      'Triage common production networking failures: 502 Bad Gateway, 504 Gateway Timeout, and Connection Refused',
    ],

    prerequisites: [
      'Deploy-01 (Deployment Fundamentals) and Deploy-02 (Linux & Ports)',
      'Basic understanding of JSON and client-side fetch requests',
    ],
    previousLesson: {
      id: 'deploy-02-linux-servers',
      title: 'Deploy-02: Linux and Server Fundamentals for AI Systems',
      moduleId: 'p11-m2',
    },

    analogy: {
      title: 'The Postal Routing & Customs Border System',
      text: 'Sending an inference request is like mailing a secure international parcel. The DNS resolver is the phone directory finding the physical coordinates of the country. The TCP handshake is the certified mail courier signing the transport ledger. TLS 1.3 is the tamper-evident armored envelope ensuring nobody reads the contents in transit. The Nginx reverse proxy is the customs border checkpoint: it inspects the passport (headers), verifies permissions (CORS), stops dangerous goods (rate limiting), and hands the parcel to the domestic courier (FastAPI worker) for final delivery.',
      metaphor: 'HTTP is the communication protocol; Nginx is the secure customs checkpoint guarding backend workers.',
    },

    problemSolved: {
      title: 'Resolving Production Ingress and Networking Bottlenecks',
      description:
        'AI applications frequently fail at the networking boundary. Developers encounter CORS blocking in web browsers, mysterious 502 Bad Gateway errors when workers crash, or 504 Gateway Timeouts when slow model forward passes exceed reverse proxy deadlines.',
      keyPoints: [
        'Exposing Python application servers directly to the public internet creates severe security and Denial-of-Service risks',
        'Nginx buffers slow client connections, terminates TLS certificates, and drops malformed traffic before it hits Python workers',
        'Proper CORS headers allow authorized frontend SPAs (React/Next.js) to query APIs across different domains without browser blocking',
        'Understanding status codes distinguishes client payload errors (422) from internal model crashes (500) and timeouts (504)',
      ],
    },

    intuition: {
      overview:
        'Networking for AI applications is a layered pipeline where edge proxies protect computationally heavy backend inference engines.',
      steps: [
        {
          step: 1,
          title: 'DNS Resolution',
          description:
            'Browser queries DNS nameservers for api.company.com, translating the human-readable domain into an IPv4 or IPv6 address (e.g. 198.51.100.42).',
        },
        {
          step: 2,
          title: 'TCP Handshake & TLS 1.3',
          description:
            'SYN -> SYN-ACK -> ACK establishes a reliable TCP connection on port 443. An ephemeral Diffie-Hellman cryptographic exchange establishes encrypted TLS in 1 round-trip.',
        },
        {
          step: 3,
          title: 'Reverse Proxy Routing & CORS Preflight',
          description:
            'Nginx inspects HTTP headers. For cross-origin requests, browser sends an OPTIONS preflight to verify Access-Control-Allow-Origin before sending the actual POST body.',
        },
        {
          step: 4,
          title: 'Internal Gateway Dispatch',
          description:
            'Nginx passes clean traffic over an internal socket or loopback (http://127.0.0.1:8000) to Uvicorn/FastAPI workers, adding X-Forwarded-For and X-Request-ID headers.',
        },
      ],
    },

    mathematics: {
      overview:
        'Network latency and transfer throughput obey the Bandwidth-Delay Product and round-trip time physics.',
      foundations: [
        {
          name: 'Bandwidth-Delay Product (BDP)',
          latex: '\\text{BDP} = \\text{Bandwidth (bytes/sec)} \\times \\text{RTT (sec)}',
          explanation:
            'The amount of unacknowledged data that can be in-flight in the network buffer between client and inference server.',
        },
        {
          name: 'TLS Handshake Latency',
          latex: 'T_{\\text{conn}} = \\text{RTT}_{\\text{DNS}} + \\text{RTT}_{\\text{TCP}} + (1 \\times \\text{RTT}_{\\text{TLS1.3}})',
          explanation:
            'Establishing a new secure connection takes approximately 3 round-trips before the first byte of HTTP payload can be transmitted.',
        },
      ],
    },

    derivation: {
      title: 'Derivation of End-to-End Latency Breakdown in AI APIs',
      objective: 'Calculate the total latency experienced by a client browser making an inference query.',
      steps: [
        {
          step: 1,
          label: 'Network Transport Time',
          latex: 'T_{\\text{net}} = \\text{RTT} + \\frac{\\text{Payload Size}}{\\text{Bandwidth}}',
          explanation: 'Round trip propagation delay plus serialization transfer time.',
        },
        {
          step: 2,
          label: 'Proxy Overhead and Validation',
          latex: 'T_{\\text{proxy}} = T_{\\text{nginx}} + T_{\\text{pydantic}}',
          explanation: 'Nginx header filtering (~2ms) plus Pydantic JSON parsing and schema validation (~1-2ms).',
        },
        {
          step: 3,
          label: 'Total Client Experienced Latency',
          latex: 'T_{\\text{total}} = T_{\\text{net}} + T_{\\text{proxy}} + T_{\\text{model}} + T_{\\text{serialize}}',
          explanation: 'Inference forward pass (T_model) represents the core computation; all other terms represent infrastructure overhead.',
        },
      ],
    },

    variables: [
      { symbol: 'RTT', name: 'Round Trip Time', description: 'Time taken for a data packet to travel from client to server and back' },
      { symbol: 'T_{\\text{net}}', name: 'Network Latency', description: 'Physical propagation and transmission delay over public internet' },
      { symbol: 'T_{\\text{proxy}}', name: 'Reverse Proxy Time', description: 'Overhead introduced by Nginx or Cloud Load Balancer' },
      { symbol: 'T_{\\text{model}}', name: 'Inference Compute Time', description: 'Execution time of tensor matrix multiplications in model' },
    ],

    numericalExample: {
      scenario: 'Analyzing why a 15ms ONNX model forward pass feels slow (110ms total) to an end user on a mobile device.',
      dataset: [
        { component: 'Mobile 4G Latency (RTT)', duration: '65 ms' },
        { component: 'TLS Termination & Nginx Ingress', duration: '4 ms' },
        { component: 'FastAPI Validation & JSON Deserialization', duration: '3 ms' },
        { component: 'Model Forward Pass', duration: '15 ms' },
        { component: 'JSON Response Serialization & Egress', duration: '23 ms' },
      ],
      calculations: [
        {
          step: '1. Total Round Trip Experienced',
          math: '65 + 4 + 3 + 15 + 23',
          result: '110 ms',
        },
        {
          step: '2. Proportion of Time Spent on ML Model',
          math: '(15 / 110) * 100',
          result: '13.6%',
        },
      ],
      finalConclusion: 'The ML model accounts for only 13.6% of the latency. Optimizing network hops and response payload size produces far greater user-facing speedups.',
    },

    visualExplanation: {
      title: 'Exploring the HTTP Request Journey Visualizer',
      description:
        'The interactive visualizer traces an inference packet through 7 sequential stages: DNS resolution, TCP/TLS handshake, Nginx reverse proxy, ASGI dispatch, Pydantic validation, model execution, and serialized response.',
      features: [
        'Simulate 200 OK (successful inference), 422 Unprocessable Entity, 504 Timeout, and CORS Blocked scenarios',
        'Inspect realistic HTTP headers, TLS ciphers, and JSON payloads at each layer',
        'Step through sequential phases with duration waterfalls to pinpoint latency bottlenecks',
      ],
    },

    scratchCode: {
      title: 'Python from Scratch: Socket-Level HTTP Parser & Status Code Router',
      explanation: 'Demonstrates how raw network TCP socket bytes are parsed into HTTP methods, paths, headers, and bodies.',
      code: `class RawHTTPRequestParser:
    """Parses raw HTTP/1.1 wire text into structured request object."""
    def __init__(self, raw_bytes: bytes):
        text = raw_bytes.decode("utf-8")
        parts = text.split("\\r\\n\\r\\n", 1)
        header_lines = parts[0].split("\\r\\n")
        self.body = parts[1] if len(parts) > 1 else ""

        # Request line: METHOD PATH VERSION
        req_line = header_lines[0].split()
        self.method = req_line[0]
        self.path = req_line[1]
        self.http_version = req_line[2]

        self.headers = {}
        for line in header_lines[1:]:
            if ":" in line:
                k, v = line.split(":", 1)
                self.headers[k.strip().lower()] = v.strip()

    def format_response(self, status_code: int, status_text: str, json_body: str) -> str:
        return (
            f"HTTP/1.1 {status_code} {status_text}\\r\\n"
            f"Content-Type: application/json\\r\\n"
            f"Content-Length: {len(json_body)}\\r\\n"
            f"Access-Control-Allow-Origin: *\\r\\n"
            f"Connection: close\\r\\n\\r\\n"
            f"{json_body}"
        )

# Test parser
sample_request = (
    b"POST /v1/predict HTTP/1.1\\r\\n"
    b"Host: api.aiml.com\\r\\n"
    b"Content-Type: application/json\\r\\n"
    b"Content-Length: 21\\r\\n\\r\\n"
    b'{"features": [1, 2, 3]}'
)
parser = RawHTTPRequestParser(sample_request)
print("Parsed Method:", parser.method)
print("Parsed Path:", parser.path)
print("Parsed Body:", parser.body)
print("Formatted Response:\\n" + parser.format_response(200, "OK", '{"status": "success"}'))
`,
    },

    sklearnCode: {
      title: 'Production Nginx Reverse Proxy Configuration (nginx.conf)',
      explanation: 'Complete Nginx configuration with TLS termination, rate limiting, CORS headers, and timeouts.',
      code: `# Define rate limiting zone (10 requests per second per IP)
limit_req_zone $binary_remote_addr zone=ai_limit:10m rate=10r/s;

upstream fastapi_backend {
    server 127.0.0.1:8000;
    server 127.0.0.1:8001;
    keepalive 32;
}

server {
    listen 80;
    server_name api.aiml-academy.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name api.aiml-academy.com;

    ssl_certificate /etc/letsencrypt/live/api.aiml-academy.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.aiml-academy.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;

    location / {
        # Rate limiting with burst buffer
        limit_req zone=ai_limit burst=20 nodelay;

        # CORS Headers for web frontends
        if ($request_method = 'OPTIONS') {
            add_header 'Access-Control-Allow-Origin' '*';
            add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
            add_header 'Access-Control-Allow-Headers' 'Authorization, Content-Type';
            add_header 'Access-Control-Max-Age' 86400;
            return 204;
        }

        # Upstream proxy parameters
        proxy_pass http://fastapi_backend;
        proxy_http_version 1.1;
        proxy_set_header Connection "";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Timeouts to prevent hung requests
        proxy_connect_timeout 5s;
        proxy_read_timeout 30s;
        proxy_send_timeout 10s;
    }
}
`,
    },

    runnableCode: {
      code: `def diagnose_http_status(status_code: int) -> dict:
    catalog = {
        200: ("OK", "Inference succeeded; payload returned."),
        202: ("Accepted", "Async task queued; poll /jobs/{id} for result."),
        400: ("Bad Request", "Malformed JSON syntax in request body."),
        422: ("Unprocessable Entity", "Pydantic validation failed on feature types/bounds."),
        500: ("Internal Server Error", "Uncaught exception inside model forward pass code."),
        502: ("Bad Gateway", "Nginx reached upstream socket, but FastAPI process crashed."),
        504: ("Gateway Timeout", "Model inference exceeded Nginx proxy_read_timeout threshold."),
    }
    name, diagnosis = catalog.get(status_code, ("Unknown", "Unregistered status code."))
    return {"status_code": status_code, "name": name, "diagnosis": diagnosis}

for code in [200, 422, 502, 504]:
    res = diagnose_http_status(code)
    print(f"HTTP {res['status_code']} {res['name']}: {res['diagnosis']}")
`,
      expectedOutput: `HTTP 200 OK: Inference succeeded; payload returned.
HTTP 422 Unprocessable Entity: Pydantic validation failed on feature types/bounds.
HTTP 502 Bad Gateway: Nginx reached upstream socket, but FastAPI process crashed.
HTTP 504 Gateway Timeout: Model inference exceeded Nginx proxy_read_timeout threshold.`,
    },

    lineByLineExplanation: [
      {
        lines: '1-12',
        codeSnippet: 'catalog = { 200: ..., 422: ..., 502: ..., 504: ... }',
        explanation: 'Maps critical HTTP status codes to root-cause production operational diagnostics.',
      },
      {
        lines: '13-15',
        codeSnippet: 'diagnose_http_status(status_code)',
        explanation: 'Returns actionable diagnostic advice for SREs and frontend developers troubleshooting API connectivity.',
      },
      {
        lines: '16-19',
        codeSnippet: 'for code in [200, 422, 502, 504]: ...',
        explanation: 'Iterates and prints exact failure distinctions between client schema errors (422), worker crashes (502), and timeouts (504).',
      },
    ],

    hyperparameters: [
      {
        name: 'proxy_read_timeout',
        defaultVal: '30s',
        range: '5s to 300s',
        effect: 'Maximum time Nginx waits for backend worker to produce model inference output before sending 504 Gateway Timeout',
        recommendation: 'Keep short (10-30s) for online APIs; offload longer jobs (>30s) to async task queues.',
      },
      {
        name: 'keepalive',
        defaultVal: '32',
        range: '8 to 128',
        effect: 'Maintains open TCP connections between Nginx and FastAPI to avoid handshake latency per request',
        recommendation: 'Enable keepalive connections on all internal upstreams.',
      },
    ],

    assumptions: [
      {
        assumption: 'TLS Termination at Reverse Proxy',
        whyItMatters: 'Offloading TLS decryption to Nginx frees Python workers to focus 100% of CPU cycles on tensor matrix multiplication.',
        howToVerify: 'Verify that Nginx listens on 443 with SSL certificates while proxying HTTP to internal loopback 127.0.0.1:8000.',
      },
    ],

    commonMistakes: [
      {
        mistake: 'Returning generic HTTP 500 Internal Server Error when client sends invalid feature types',
        solution: 'Use Pydantic schema validation to automatically return HTTP 422 Unprocessable Entity with clear field error messages.',
        whyWrong: '500 indicates server bugs, triggering false SRE alarms and confusing client developers.',
        howToFix: 'Let FastAPI handle validation exceptions natively or return explicit 4xx client errors.',
      },
      {
        mistake: 'Misconfiguring CORS by forgetting to handle OPTIONS preflight requests',
        solution: 'Include explicit handling for OPTIONS method returning 204 No Content with Access-Control-Allow-Origin headers.',
        whyWrong: 'Modern browsers block cross-origin POST requests if the preflight OPTIONS check fails.',
        howToFix: 'Use FastAPI CORSMiddleware or configure Nginx with OPTIONS return 204 block.',
      },
    ],

    realWorldUseCases: [
      {
        title: 'Global Edge Ingress for Speech Recognition',
        description: 'Using Cloudflare DNS and Anycast routing to terminate TLS at the edge closest to the user, reducing mobile network latency by 60ms.',
      },
      {
        title: 'Multi-Tenant Enterprise API Gateway',
        description: 'Enforcing rate limits and API key authentication at Nginx before forwarding verified queries to GPU inference pods.',
      },
    ],

    practiceQuestions: [
      {
        id: 'q1',
        question: 'What is the diagnostic difference between an HTTP 502 Bad Gateway and an HTTP 504 Gateway Timeout?',
        answer: '502 means the reverse proxy attempted to connect to the backend worker, but the worker process was down, crashed, or refused connection; 504 means the worker accepted connection but failed to produce a response within the timeout threshold.',
        explanation: '502 is an availability/crash issue; 504 is a latency/timeout issue.',
      },
      {
        id: 'q2',
        question: 'What is a CORS preflight request and when does the browser send it?',
        answer: 'It is an HTTP OPTIONS request sent automatically by web browsers before non-simple requests (like POST with application/json) to verify the server permits cross-origin communication.',
        explanation: 'CORS is enforced by browsers to protect users from malicious scripts making unauthorized cross-site requests.',
      },
      {
        id: 'q3',
        question: 'Why should Nginx or a cloud load balancer terminate TLS rather than the Python Uvicorn worker?',
        answer: 'Nginx has highly optimized C-based cryptographic routines and hardware acceleration; terminating at the proxy frees Python workers to focus solely on model execution.',
        explanation: 'It also simplifies SSL certificate renewal across multiple backend replicas.',
      },
    ],

    quiz: [
      {
        id: 'quiz-1',
        question: 'When a web client sends a POST request with invalid data types in the JSON body, which HTTP status code should a production FastAPI API return?',
        options: ['200 OK', '422 Unprocessable Entity', '500 Internal Server Error', '504 Gateway Timeout'],
        correctIndex: 1,
        explanation: 'HTTP 422 Unprocessable Entity indicates that the syntax is valid JSON, but the semantics fail schema validation.',
      },
      {
        id: 'quiz-2',
        question: 'An SRE observes Nginx returning HTTP 502 Bad Gateway errors to end users. What is the most likely root cause?',
        options: [
          'The client sent invalid authentication credentials',
          'The backend FastAPI/Uvicorn worker process crashed or was not running',
          'The model took 60 seconds to compute',
          'The domain DNS records expired',
        ],
        correctIndex: 1,
        explanation: '502 Bad Gateway indicates the upstream server was unreachable, crashed, or dropped the socket connection unexpectedly.',
      },
      {
        id: 'quiz-3',
        question: 'What header must an API server return to allow a frontend running at https://app.example.com to make API queries without CORS blocking?',
        options: [
          'Content-Type: application/json',
          'Access-Control-Allow-Origin: https://app.example.com (or *)',
          'X-Request-ID: req_12345',
          'Connection: keep-alive',
        ],
        correctIndex: 1,
        explanation: 'Access-Control-Allow-Origin explicitly grants the calling domain permission to access the API response.',
      },
      {
        id: 'quiz-4',
        question: 'How does TLS 1.3 improve network latency compared to older TLS 1.2 protocols?',
        options: [
          'It eliminates encryption completely',
          'It reduces the cryptographic handshake from 2 round-trips (RTT) to 1 RTT',
          'It forces all traffic over unencrypted UDP',
          'It compresses model weights automatically',
        ],
        correctIndex: 1,
        explanation: 'TLS 1.3 reduces the handshake to a single round-trip (1-RTT), cutting connection establishment latency in half.',
      },
    ],

    independentExercise: {
      title: 'Build a CORS Preflight and Header Validator Middleware',
      problem:
        'Write a Python function `process_cors_headers(origin, method, allowed_origins)` that inspects request headers, handles OPTIONS preflight, and returns appropriate CORS headers or raises a 403 Forbidden error for unauthorized origins.',
      hints: [
        'Check if origin is in allowed_origins or if allowed_origins contains "*"',
        'If method is OPTIONS, return 204 No Content with Access-Control-Allow-Methods and Access-Control-Allow-Headers',
      ],
      starterCode: `def process_cors_headers(origin: str, method: str, allowed_origins: list[str]) -> dict:
    # TODO: Implement CORS evaluation
    pass

# Test
print(process_cors_headers("https://frontend.com", "POST", ["https://frontend.com"]))
`,
      solution: `def process_cors_headers(origin: str, method: str, allowed_origins: list[str]) -> dict:
    is_allowed = "*" in allowed_origins or origin in allowed_origins
    if not is_allowed:
        return {"status": 403, "error": f"CORS origin '{origin}' is not permitted."}
        
    headers = {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Credentials": "true",
    }
    
    if method == "OPTIONS":
        headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
        headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization, X-Request-ID"
        headers["Access-Control-Max-Age"] = "86400"
        return {"status": 204, "headers": headers}
        
    return {"status": 200, "headers": headers}

print(process_cors_headers("https://frontend.com", "POST", ["https://frontend.com"]))
print(process_cors_headers("https://evil.com", "POST", ["https://frontend.com"]))
`,
    },

    summary: {
      keyTakeaways: [
        'Nginx acts as the front-line reverse proxy, terminating TLS 1.3, enforcing rate limits, and routing traffic to backend Uvicorn workers',
        'Distinguish client errors (400, 422) from infrastructure crashes (502 Bad Gateway) and model timeouts (504 Gateway Timeout)',
        'Configure CORS headers properly to permit authorized web applications to communicate across domains without browser interference',
      ],
      nextLessonId: 'deploy-04-docker-ai',
      nextLessonTitle: 'Deploy-04: Docker & Containerization for AI Systems',
      nextLessonModuleId: 'p11-m4',
    },
  },
};

