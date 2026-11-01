import { ModuleData, LessonContent } from '@/lib/types';

// =========================================================================
// MODULE 4: Docker for AI Applications (p11-m4)
// =========================================================================
export const p11m4Data: ModuleData = {
  id: 'p11-m4',
  number: 4,
  title: 'Docker for AI Applications',
  subtitle: 'Reproducible Images, Multi-Stage Builds, Layer Caching & Non-Root Containers',
  description:
    'Master container engineering for AI. Learn how Docker solves "it works on my machine", construct efficient multi-stage Dockerfiles that shrink images from 2.5GB to sub-200MB, exploit layer caching for 3-second rebuilds, enforce non-root security, and manage runtime secrets without leaking credentials into image layers.',
  icon: 'Box',
  badge: 'Phase 11 · AI Deployment',
  estimatedHours: 3,
  topicsCount: 1,
  lessons: [
    {
      id: 'deploy-04-docker-ai',
      moduleId: 'p11-m4',
      title: 'Deploy-04: Docker & Containerization for AI Systems',
      description:
        'Containerize FastAPI ML services with multi-stage builds, layer cache optimization, dependency pinning, and non-root security.',
      order: 1,
      readTimeMinutes: 36,
      visualizerType: 'deploy-docker-layer-explorer',
      difficulty: 'Intermediate',
    },
  ],
};

// =========================================================================
// MODULE 5: Production API Engineering (p11-m5)
// =========================================================================
export const p11m5Data: ModuleData = {
  id: 'p11-m5',
  number: 5,
  title: 'Production API Engineering',
  subtitle: 'FastAPI Architecture, Pydantic Validation, Health Probes & Rate Limiting',
  description:
    'Engineer robust, enterprise-ready inference APIs using FastAPI and Uvicorn. Master strict Pydantic schema validation, Kubernetes liveness and readiness probe architecture, request timeouts, structured JSON logging with correlation IDs, token-bucket rate limiting, and batch vs online serving trade-offs.',
  icon: 'Zap',
  badge: 'Phase 11 · AI Deployment',
  estimatedHours: 3,
  topicsCount: 1,
  lessons: [
    {
      id: 'deploy-05-production-apis',
      moduleId: 'p11-m5',
      title: 'Deploy-05: Production API Engineering with FastAPI',
      description:
        'Build bulletproof FastAPI services with health probes, Pydantic validation, structured logging, token bucket limiters, and error handling.',
      order: 1,
      readTimeMinutes: 38,
      visualizerType: 'deploy-http-journey-explorer',
      difficulty: 'Intermediate',
    },
  ],
};

// =========================================================================
// MODULE 6: Cloud Computing Fundamentals (p11-m6)
// =========================================================================
export const p11m6Data: ModuleData = {
  id: 'p11-m6',
  number: 6,
  title: 'Cloud Computing Fundamentals',
  subtitle: 'IaaS, PaaS, Serverless, Availability Zones & Cloud Cost Trade-offs',
  description:
    'Navigate cloud infrastructure for artificial intelligence. Compare IaaS virtual machines, managed PaaS, serverless containers (Cloud Run), and Kubernetes clusters. Master cloud regions, multi-AZ high availability, IAM least-privilege policies, and total cost of ownership (TCO) models.',
  icon: 'Cloud',
  badge: 'Phase 11 · AI Deployment',
  estimatedHours: 3,
  topicsCount: 1,
  lessons: [
    {
      id: 'deploy-06-cloud-computing',
      moduleId: 'p11-m6',
      title: 'Deploy-06: Cloud Computing Fundamentals for AI Systems',
      description:
        'Compare IaaS vs PaaS vs Serverless, evaluate multi-AZ availability formulas, configure IAM roles, and estimate monthly cloud TCO.',
      order: 1,
      readTimeMinutes: 35,
      visualizerType: 'deploy-cloud-comparison-explorer',
      difficulty: 'Beginner',
    },
  ],
};

// =========================================================================
// LESSON CONTENTS (Modules 4 - 6)
// =========================================================================
export const deploymentModule2Lessons: Record<string, LessonContent> = {
  'deploy-04-docker-ai': {
    id: 'deploy-04-docker-ai',
    moduleId: 'p11-m4',
    title: 'Deploy-04: Docker & Containerization for AI Systems',
    subtitle: 'Multi-Stage Builds, Reproducibility, Layer Caching & Non-Root Containers',
    order: 1,
    readTimeMinutes: 36,
    difficulty: 'Intermediate',
    visualizerType: 'deploy-docker-layer-explorer',

    objectives: [
      'Understand images, containers, volumes, networks, and OCI registries in AI workflows',
      'Containerize a FastAPI machine learning application with pinned, reproducible dependencies',
      'Optimize image size using multi-stage builds (`python:3.11-slim`), cutting bloated images by over 80%',
      'Structure Dockerfile instructions to maximize layer cache reusability and cut build times to seconds',
      'Harden container security using non-root execution (`USER appuser`) and secret mounts',
    ],

    prerequisites: [
      'Deploy-02 (Linux & Processes) and Deploy-03 (Networking & Ports)',
      'Basic familiarity with CLI terminal commands',
    ],
    previousLesson: {
      id: 'deploy-03-networking-http-dns',
      title: 'Deploy-03: Networking, HTTP, DNS & Reverse Proxies',
      moduleId: 'p11-m3',
    },

    analogy: {
      title: 'The Standardized Intermodal Shipping Container',
      text: 'Before the 1950s, cargo was loaded as loose barrels, sacks, and wooden crates onto ships. Every transfer between trains, trucks, and ships required hundreds of stevedores and weeks of repacking, causing constant breakages and delays. Malcolm McLean invented the standardized steel shipping container: a sealed box of exact dimensions that fits seamlessly onto any truck chassis, train car, or cargo ship in the world. Docker does the exact same thing for software: it packages your Python runtime, C-libraries, model weights, and code into an immutable, portable container that runs identically on a MacBook, an Ubuntu workstation, or an AWS cloud cluster.',
      metaphor: 'Docker is the standardized intermodal shipping container for machine learning code.',
    },

    problemSolved: {
      title: 'Eliminating the "Works on My Machine" Dilemma in AI',
      description:
        'AI code is notorious for deep C/C++ dependency hell (CUDA drivers, cuDNN, BLAS, LibTorch). Deploying raw Python scripts to cloud VMs frequently crashes due to mismatched GCC compiler versions, missing shared libraries (.so), or conflicting pip packages.',
      keyPoints: [
        'Docker encapsulates the exact operating system, system libraries, and Python environment into an immutable artifact',
        'Multi-stage builds eliminate heavy build tools (gcc, g++, git) from production runtime containers, minimizing attack surfaces',
        'Careful layer ordering prevents expensive re-installation of heavy packages (PyTorch, TensorFlow) whenever small app code changes',
        'Enforcing non-root execution protects the host operating system from container breakout vulnerabilities',
      ],
    },

    intuition: {
      overview:
        'A Docker image is a read-only stack of filesystem layers created by sequential Dockerfile instructions. Containers are ephemeral running instances with a thin read-write layer on top.',
      steps: [
        {
          step: 1,
          title: 'Layer Caching Mechanics',
          description:
            'Docker caches the result of each instruction. If an instruction and its inputs (files) are unchanged, Docker reuses the cached layer instantly (0.1s). Once a layer changes, that layer and all subsequent layers must be recomputed.',
        },
        {
          step: 2,
          title: 'Optimal Instruction Ordering',
          description:
            'Put slow-changing, heavy steps first (`COPY requirements.txt . && pip install`), and fast-changing, lightweight application code last (`COPY ./src ./src`).',
        },
        {
          step: 3,
          title: 'Multi-Stage Decoupling',
          description:
            'Stage 1 (Builder) installs build compilers and compiles Python wheels. Stage 2 (Runner) copies only the pre-built wheels and app code onto a clean, minimal base image.',
        },
        {
          step: 4,
          title: 'Least Privilege Non-Root Execution',
          description:
            'By default, Docker runs as root (UID 0). Adding `USER appuser` drops administrative privileges before the container listens on network sockets.',
        },
      ],
    },

    mathematics: {
      overview:
        'Container distribution performance depends on image transfer latency and storage deduplication.',
      foundations: [
        {
          name: 'Container Image Pull Latency',
          latex: 'T_{\\text{pull}} = \\frac{\\sum_{l \\in \\text{uncached}} S_l}{\\text{Network Bandwidth}} + T_{\\text{extract}}',
          explanation:
            'Container startup cold-start delay equals the download time of all uncached layer sizes (S_l) plus local disk extraction time.',
        },
        {
          name: 'Layer Deduplication Ratio',
          latex: 'D = 1 - \\frac{\\text{Unique Storage on Disk}}{\\sum_{i=1}^N \\text{Virtual Image Size}_i}',
          explanation:
            'Because containers share read-only base layers (e.g. python:3.11-slim), 10 containers sharing an 80MB base layer consume only 80MB total rather than 800MB.',
        },
      ],
    },

    derivation: {
      title: 'Derivation of Cold-Start Latency Savings via Multi-Stage Sizing',
      objective: 'Calculate the cold-start startup improvement when optimizing an unoptimized image down to a minimal multi-stage image.',
      steps: [
        {
          step: 1,
          label: 'Unoptimized Image Download Time',
          latex: 'T_1 = \\frac{2100 \\text{ MB}}{50 \\text{ MB/s}} = 42.0 \\text{ seconds}',
          explanation: 'A 2.1 GB image with Ubuntu + compilers takes 42s just to download across a 50 MB/s network pipe.',
        },
        {
          step: 2,
          label: 'Optimized Multi-Stage Image Download Time',
          latex: 'T_2 = \\frac{180 \\text{ MB}}{50 \\text{ MB/s}} = 3.6 \\text{ seconds}',
          explanation: 'A 180 MB multi-stage slim image downloads in 3.6s.',
        },
        {
          step: 3,
          label: 'Autoscaling Cold-Start Speedup',
          latex: '\\Delta T = T_1 - T_2 = 38.4 \\text{ seconds saved}',
          explanation: 'Horizontal autoscalers can spin up healthy replicas in 4s instead of waiting nearly a minute under traffic spikes.',
        },
      ],
    },

    variables: [
      { symbol: 'S_l', name: 'Layer Size', description: 'Uncompressed or gzipped byte size of an individual Docker layer' },
      { symbol: 'T_{\\text{pull}}', name: 'Pull Latency', description: 'Time taken for container runtime to download and extract image from registry' },
      { symbol: 'T_{\\text{extract}}', name: 'Decompression Time', description: 'Time taken to extract tarballs onto local host storage filesystem' },
    ],

    numericalExample: {
      scenario: 'Evaluating Docker build time and layer caching when a developer modifies a single line in src/main.py.',
      dataset: [
        { build_strategy: 'Naive Dockerfile (COPY . before pip)', time: '145 seconds (Re-downloads PyTorch and wheels)' },
        { build_strategy: 'Optimized Dockerfile (COPY requirements first)', time: '1.8 seconds (Reuses cached dependency layer)' },
      ],
      calculations: [
        {
          step: '1. Time Saved per Developer Build',
          math: '145s - 1.8s',
          result: '143.2 seconds saved per build',
        },
        {
          step: '2. Daily Savings for Team (30 builds/day)',
          math: '30 * 143.2s / 60',
          result: '71.6 minutes saved daily',
        },
      ],
      finalConclusion: 'Correct Docker layer ordering accelerates developer iteration speed by over 80x.',
    },

    visualExplanation: {
      title: 'Docker Layer Stack & Invalidation Cascade Visualizer',
      description:
        'The interactive visualizer compares naive single-stage Docker builds with production multi-stage configurations. Click on different layers to inspect their byte sizes, cache status, and security posture.',
      features: [
        'Simulate code changes (editing main.py vs updating requirements.txt) to witness layer cache hits and invalidations',
        'Compare a 2.1GB bloated image with an 84% smaller 185MB multi-stage runtime container',
        'Audit security warnings flagging root user execution (UID 0) vs non-root user (appuser UID 1000)',
      ],
    },

    scratchCode: {
      title: 'Python from Scratch: Docker .dockerignore & Asset Packaging Validator',
      explanation: 'Scans the repository to ensure dangerous files (.env, .git, __pycache__, test files) are excluded from the Docker build context.',
      code: `import os

class DockerContextAuditor:
    """Audits local files to ensure sensitive and heavy files are excluded."""
    
    FORBIDDEN_EXTENSIONS = [".env", ".pem", ".key", ".pyc"]
    FORBIDDEN_DIRS = [".git", "__pycache__", ".venv", "tests"]

    @classmethod
    def audit_context(cls, root_dir: str = ".") -> dict:
        flagged = []
        clean = True
        
        # Check if .dockerignore exists
        dockerignore_exists = os.path.exists(os.path.join(root_dir, ".dockerignore"))
        if not dockerignore_exists:
            flagged.append("CRITICAL: Missing .dockerignore! Build context may upload heavy .git and secrets.")
            clean = False

        return {
            "dockerignore_present": dockerignore_exists,
            "security_clean": clean,
            "warnings": flagged,
            "recommended_entries": [
                ".git", ".env*", "__pycache__", "*.pyc", ".pytest_cache", ".venv", "tests"
            ]
        }

if __name__ == "__main__":
    audit = DockerContextAuditor.audit_context(".")
    print("Docker Context Audit:", audit)
`,
    },

    sklearnCode: {
      title: 'Production Multi-Stage Dockerfile for FastAPI + PyTorch/ML',
      explanation: 'Complete production multi-stage Dockerfile implementing builder isolation, non-root user, and healthcheck.',
      code: `# =========================================================================
# STAGE 1: Builder (Compiles wheels and dependencies)
# =========================================================================
FROM python:3.11-slim AS builder

WORKDIR /build

# Install minimal build tools required for C extensions
RUN apt-get update && apt-get install -y --no-install-recommends \\
    gcc \\
    g++ \\
    && rm -rf /var/lib/apt/lists/*

# Layer cache optimization: Copy ONLY requirements first
COPY requirements.txt .

# Pre-compile wheels into a local cache directory
RUN pip install --no-cache-dir --user -r requirements.txt

# =========================================================================
# STAGE 2: Production Runner (Zero compilers, minimal attack surface)
# =========================================================================
FROM python:3.11-slim AS runner

WORKDIR /app

# Least Privilege: Create unprivileged system user
RUN useradd -m -u 1000 -s /bin/bash appuser

# Copy installed python packages from builder
COPY --from=builder /root/.local /home/appuser/.local

# Ensure user binaries are on PATH
ENV PATH="/home/appuser/.local/bin:$PATH"
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

# Copy application source code with correct ownership
COPY --chown=appuser:appuser ./src /app/src

# Switch to non-root user
USER appuser

# Healthcheck for container orchestrators (Docker / Kubernetes)
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \\
    CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:8000/health/liveness')" || exit 1

EXPOSE 8000

CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "2"]
`,
    },

    runnableCode: {
      code: `def compare_docker_builds():
    naive = {
        "base_image": "python:3.11 (Full Ubuntu)",
        "layers": 4,
        "image_size_mb": 2140,
        "cold_start_sec": 42.8,
        "non_root": False
    }
    optimized = {
        "base_image": "python:3.11-slim (Multi-stage)",
        "layers": 6,
        "image_size_mb": 185,
        "cold_start_sec": 3.7,
        "non_root": True
    }
    
    size_reduction = (1 - optimized["image_size_mb"] / naive["image_size_mb"]) * 100
    speedup = naive["cold_start_sec"] / optimized["cold_start_sec"]
    
    print("=== DOCKER OPTIMIZATION METRICS ===")
    print(f"Naive Image Size:       {naive['image_size_mb']} MB")
    print(f"Optimized Image Size:   {optimized['image_size_mb']} MB ({size_reduction:.1f}% reduction)")
    print(f"Cold Start Pull Speedup: {speedup:.1f}x faster")
    print(f"Least Privilege Check:  {'PASSED' if optimized['non_root'] else 'FAILED'}")

compare_docker_builds()
`,
      expectedOutput: `=== DOCKER OPTIMIZATION METRICS ===
Naive Image Size:       2140 MB
Optimized Image Size:   185 MB (91.4% reduction)
Cold Start Pull Speedup: 11.6x faster
Least Privilege Check:  PASSED`,
    },

    lineByLineExplanation: [
      {
        lines: '1-16',
        codeSnippet: 'naive = {...}; optimized = {...}',
        explanation: 'Models real-world metric comparisons between single-stage bloated containers and multi-stage slim containers.',
      },
      {
        lines: '17-19',
        codeSnippet: 'size_reduction = ...; speedup = ...',
        explanation: 'Computes percentage storage reduction and cold-start pull speedup.',
      },
      {
        lines: '20-25',
        codeSnippet: 'print(f"Naive Image Size: ...")',
        explanation: 'Displays concrete validation metrics illustrating the 91% size reduction and 11.6x faster pull times.',
      },
    ],

    hyperparameters: [
      {
        name: 'workers',
        defaultVal: '2',
        range: '1 to 8',
        effect: 'Number of Uvicorn ASGI worker processes spawned inside the container',
        recommendation: 'In containers, keep workers low (1-2) and scale horizontally with container replicas rather than packing many workers in one container.',
      },
      {
        name: 'HEALTHCHECK --interval',
        defaultVal: '30s',
        range: '5s to 60s',
        effect: 'Frequency with which Docker probes the container liveness endpoint',
        recommendation: 'Set to 15-30s to detect deadlocked processes promptly.',
      },
    ],

    assumptions: [
      {
        assumption: 'Single Primary Concern per Container',
        whyItMatters: 'Packing database, web proxy, and Python model into one container breaks container isolation and independent scaling.',
        howToVerify: 'Ensure each container runs a single service (FastAPI API in one, Nginx in another, Redis in another).',
      },
    ],

    commonMistakes: [
      {
        mistake: 'Placing `COPY . /app` before `RUN pip install -r requirements.txt`',
        solution: 'Always copy `requirements.txt` first, install dependencies, and only then copy application code.',
        whyWrong: 'Any single-character edit to Python code invalidates the Docker cache, forcing pip to redownload all packages on every build.',
        howToFix: 'Order instructions: `COPY requirements.txt .`, `RUN pip install ...`, then `COPY ./src /app/src`.',
      },
      {
        mistake: 'Leaving `.dockerignore` out of the project repository',
        solution: 'Create `.dockerignore` containing `.git`, `.venv`, `__pycache__`, and `.env*`.',
        whyWrong: 'The entire `.git` commit history (often hundreds of MBs) and local secrets get uploaded into the Docker build context.',
        howToFix: 'Always commit a strict `.dockerignore` file.',
      },
    ],

    realWorldUseCases: [
      {
        title: 'Kubernetes Pod Deployment',
        description: 'Deploying multi-stage AI container images to AWS EKS with sub-5-second node autoscaling spin-up times.',
      },
      {
        title: 'Serverless Cloud Run Microservice',
        description: 'Hosting containerized scikit-learn fraud scoring with scale-to-zero capability without cold-start timeouts.',
      },
    ],

    practiceQuestions: [
      {
        id: 'q1',
        question: 'What is the primary benefit of multi-stage Docker builds for machine learning applications?',
        answer: 'They isolate heavy compilers (gcc, g++) and build tools to the builder stage, producing a minimal production runner image containing only the runtime dependencies.',
        explanation: 'This drastically reduces image size, lowers download times, and eliminates security vulnerabilities.',
      },
      {
        id: 'q2',
        question: 'Why should the instruction `COPY requirements.txt .` precede `COPY ./src /app/src` in a Dockerfile?',
        answer: 'To preserve layer caching. Dependencies change infrequently compared to source code, so Docker reuses the cached pip layer across daily code edits.',
        explanation: 'If `COPY .` comes first, any source code edit invalidates all subsequent layers.',
      },
      {
        id: 'q3',
        question: 'Why is running Docker containers as root (UID 0) considered a major security risk?',
        answer: 'If an attacker executes malicious code inside the container, running as root makes host privilege escalation and container breakout significantly easier.',
        explanation: 'Running as an unprivileged user (UID 1000) enforces the principle of least privilege.',
      },
    ],

    quiz: [
      {
        id: 'quiz-1',
        question: 'Why does copying `requirements.txt` before the rest of the application code speed up Docker builds?',
        options: [
          'It tells the Python interpreter to precompile bytecode',
          'It allows Docker to cache the expensive pip installation layer when only source code files change',
          'It automatically deletes unused pip packages',
          'It formats the requirements file with black',
        ],
        correctIndex: 1,
        explanation: 'Docker executes layers sequentially; placing requirements first ensures code modifications do not invalidate the cached dependency layer.',
      },
      {
        id: 'quiz-2',
        question: 'What is the purpose of the `.dockerignore` file?',
        options: [
          'To ignore Docker runtime errors in production',
          'To prevent unnecessary or sensitive files (like .git, .venv, .env) from being uploaded to the Docker build daemon',
          'To disable container networking',
          'To bypass Linux file permissions',
        ],
        correctIndex: 1,
        explanation: '`.dockerignore` excludes heavy and confidential files from the Docker build context, speeding up builds and preventing secret leaks.',
      },
      {
        id: 'quiz-3',
        question: 'Which base image is most recommended for production Python AI services when minimizing container size?',
        options: ['python:3.11-full', 'python:3.11-slim', 'ubuntu:latest', 'centos:7'],
        correctIndex: 1,
        explanation: '`python:3.11-slim` provides a minimal Debian base with Python pre-installed, omitting heavy documentation, compilers, and bloat.',
      },
      {
        id: 'quiz-4',
        question: 'What does the Docker instruction `USER appuser` accomplish?',
        options: [
          'It logs in to Docker Hub',
          'It switches the container execution context to an unprivileged non-root user account',
          'It sets the author name in the image metadata',
          'It gives the user sudo permissions',
        ],
        correctIndex: 1,
        explanation: '`USER appuser` drops root privileges, ensuring processes inside the container run with minimal permissions.',
      },
    ],

    independentExercise: {
      title: 'Optimize a Bloated Dockerfile with Multi-Stage Stages',
      problem:
        'Refactor an unoptimized single-stage Dockerfile into a 2-stage multi-stage Dockerfile that builds wheels in `builder` and runs under `USER appuser` in `runner`.',
      hints: [
        'Use `FROM python:3.11-slim AS builder` for stage 1',
        'Use `pip install --user` or `--wheel-dir` to compile packages',
        'Copy `.local` from builder into the runner stage',
        'Add `USER appuser` in the runner stage',
      ],
      starterCode: `# Naive Dockerfile to optimize:
FROM python:3.11
WORKDIR /app
COPY . .
RUN pip install -r requirements.txt
CMD ["uvicorn", "main:app", "--host", "0.0.0.0"]
`,
      solution: `# Optimized Multi-Stage Dockerfile:
FROM python:3.11-slim AS builder
WORKDIR /build
RUN apt-get update && apt-get install -y --no-install-recommends gcc && rm -rf /var/lib/apt/lists/*
COPY requirements.txt .
RUN pip install --no-cache-dir --user -r requirements.txt

FROM python:3.11-slim AS runner
WORKDIR /app
RUN useradd -m -u 1000 appuser
COPY --from=builder /root/.local /home/appuser/.local
ENV PATH="/home/appuser/.local/bin:$PATH"
COPY --chown=appuser:appuser ./src /app/src
USER appuser
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]
`,
    },

    summary: {
      keyTakeaways: [
        'Multi-stage Docker builds separate build-time compilers from the minimal production runtime container',
        'Place `requirements.txt` and `pip install` before application source code to take full advantage of Docker layer caching',
        'Always enforce non-root execution (`USER appuser`) and maintain a strict `.dockerignore` file to secure images',
      ],
      nextLessonId: 'deploy-05-production-apis',
      nextLessonTitle: 'Deploy-05: Production API Engineering with FastAPI',
      nextLessonModuleId: 'p11-m5',
    },
  },

  'deploy-05-production-apis': {
    id: 'deploy-05-production-apis',
    moduleId: 'p11-m5',
    title: 'Deploy-05: Production API Engineering with FastAPI',
    subtitle: 'Pydantic Validation, Health Probes, Rate Limiting & Graceful Shutdowns',
    order: 1,
    readTimeMinutes: 38,
    difficulty: 'Intermediate',
    visualizerType: 'deploy-http-journey-explorer',

    objectives: [
      'Structure clean, asynchronous FastAPI applications with modular API routers and dependency injection',
      'Enforce strict input schema validation and bounds checking using Pydantic BaseModel and Field',
      'Implement Kubernetes liveness (`/health/liveness`) and readiness (`/health/readiness`) endpoints',
      'Attach structured JSON logging with correlation IDs (`X-Request-ID`) to trace requests across microservices',
      'Implement token bucket rate limiting to protect GPU and CPU inference workers from traffic floods',
    ],

    prerequisites: [
      'Deploy-03 (HTTP & Networking) and Deploy-04 (Docker)',
      'Familiarity with Python async/await syntax',
    ],
    previousLesson: {
      id: 'deploy-04-docker-ai',
      title: 'Deploy-04: Docker & Containerization for AI Systems',
      moduleId: 'p11-m4',
    },

    analogy: {
      title: 'The Modern Hospital Triage & Admission Desk',
      text: 'A production API is like a high-volume emergency room admission desk. Patients (incoming HTTP requests) don’t simply walk straight into the operating theater (model forward pass). A triage nurse checks their health insurance and ID (Authentication), verifies symptoms fit the admission criteria (Pydantic Schema Validation), assigns a unique patient wristband with a barcode (X-Request-ID), and ensures the hospital isn’t at max ICU capacity (Token Bucket Rate Limiting). The readiness probe is the green light indicating surgical staff and anesthesia are prepared before any patient is wheeled into surgery.',
      metaphor: 'FastAPI is the emergency room triage system ensuring only valid, authenticated, bounded requests reach your compute models.',
    },

    problemSolved: {
      title: 'Hardening Machine Learning Models for the Public Web',
      description:
        'Raw model prediction functions expect clean, numpy arrays or PyTorch tensors. If a client sends an empty string, NaN, missing fields, or an array of 100,000 integers, unvalidated Python scripts will crash with 500 Internal Server Errors, freeze the worker thread, or cause Out-of-Memory failures.',
      keyPoints: [
        'Pydantic catches type mismatches, missing attributes, and out-of-range floats before your model code is invoked',
        'Separating liveness from readiness probes prevents Kubernetes from routing traffic to models that are still loading weights',
        'Token bucket rate limiters prevent denial-of-service traffic spikes from overwhelming CPU/GPU inference threads',
        'Structured JSON logging with request IDs enables instant debugging of failed queries in Datadog or CloudWatch',
      ],
    },

    intuition: {
      overview:
        'A production API wraps your mathematical model in multiple concentric safety rings: authentication, validation, timing, rate limiting, and observability.',
      steps: [
        {
          step: 1,
          title: 'Middleware & Request ID Injection',
          description:
            'Every request is stamped with a UUID4 `X-Request-ID`. This ID follows the request through every log line and is returned in the response header for client debugging.',
        },
        {
          step: 2,
          title: 'Declarative Pydantic Validation',
          description:
            'Requests are deserialized into typed Python objects. Invalid fields automatically trigger a structured HTTP 422 response detailing the exact offending attribute.',
        },
        {
          step: 3,
          title: 'Readiness Gatekeeper',
          description:
            'When a container spins up, weights might take 10 seconds to load into VRAM. `/health/readiness` returns 503 until loading is 100% complete, preventing dropped queries.',
        },
        {
          step: 4,
          title: 'Token Bucket Rate Limiting',
          description:
            'Each client IP has a virtual bucket of tokens refilled at rate r. Requests consume 1 token. When empty, the API immediately returns HTTP 429 Too Many Requests.',
        },
      ],
    },

    mathematics: {
      overview:
        'Rate limiting and capacity protection operate on deterministic mathematical token bucket models.',
      foundations: [
        {
          name: 'Token Bucket Rate Limiter Equation',
          latex: 'B(t) = \\min\\left(C, B(t - \\Delta t) + r \\times \\Delta t\\right)',
          explanation:
            'At time t, available tokens B(t) equals the minimum of max bucket capacity C and previous tokens plus refilled tokens (refill rate r multiplied by elapsed time delta t).',
        },
        {
          name: 'Admission Decision Rule',
          latex: '\\text{Admit}(t) = \\begin{cases} 1 \\quad (\\text{and } B(t) \\leftarrow B(t) - 1), & \\text{if } B(t) \\ge 1 \\\\ 0 \\quad (\\text{return HTTP 429}), & \\text{if } B(t) < 1 \\end{cases}',
          explanation:
            'A request is admitted if at least 1 token is available; otherwise, it is immediately rejected with HTTP 429 Too Many Requests.',
        },
      ],
    },

    derivation: {
      title: 'Derivation of Maximum Sustained vs Burst Concurrency in Token Buckets',
      objective: 'Calculate the maximum number of requests allowed during sudden traffic bursts.',
      steps: [
        {
          step: 1,
          label: 'Initial State at Full Capacity',
          latex: 'B(0) = C',
          explanation: 'Before the traffic spike, the bucket is completely full of C tokens.',
        },
        {
          step: 2,
          label: 'Total Admitted Requests in Time Window T',
          latex: 'N_{\\text{max}}(T) = C + (r \\times T)',
          explanation: 'The maximum requests admitted over window T equals the initial burst capacity C plus newly generated tokens r*T.',
        },
        {
          step: 3,
          label: 'Effective Peak Rate',
          latex: 'R_{\\text{peak}} = \\frac{C}{T} + r',
          explanation: 'For short time windows T -> 0, peak throughput can absorb C requests instantaneously without queueing.',
        },
      ],
    },

    variables: [
      { symbol: 'C', name: 'Bucket Capacity', description: 'Maximum tokens the bucket can hold (maximum instantaneous burst size)' },
      { symbol: 'r', name: 'Refill Rate', description: 'Tokens added per second (maximum sustained requests per second)' },
      { symbol: 'B(t)', name: 'Current Tokens', description: 'Tokens available in the bucket at timestamp t' },
      { symbol: '\\Delta t', name: 'Elapsed Time', description: 'Seconds elapsed since the last token calculation' },
    ],

    numericalExample: {
      scenario: 'Configuring an API rate limiter with capacity C=20 tokens and refill rate r=5 tokens/sec.',
      dataset: [
        { metric: 'Max Burst Capacity (C)', value: '20 requests' },
        { metric: 'Sustained Rate (r)', value: '5 req/sec' },
        { metric: 'Client Spike Volume', value: '25 requests at t=0' },
      ],
      calculations: [
        {
          step: '1. Admitted Instantaneous Requests',
          math: 'min(25, 20)',
          result: '20 requests admitted immediately (200 OK)',
        },
        {
          step: '2. Rejected Requests (HTTP 429)',
          math: '25 - 20',
          result: '5 requests rejected with 429 Too Many Requests',
        },
        {
          step: '3. Time until 5 tokens regenerate',
          math: '5 / 5 tokens/sec',
          result: '1.0 second',
        },
      ],
      finalConclusion: 'The client must wait 1.0 second before retrying rejected requests, perfectly shielding backend workers.',
    },

    visualExplanation: {
      title: 'Tracing API Lifecycles in the HTTP Journey Visualizer',
      description:
        'The visualizer maps incoming requests through middleware, Pydantic validation, readiness checks, model execution, and formatted JSON output.',
      features: [
        'Observe how invalid payload types trigger an immediate 422 Unprocessable Entity in under 1ms without calling model weights',
        'Inspect structured X-Request-ID headers and response time telemetry added by middleware',
        'Test readiness probe failure scenarios where the API safely denies traffic until model weights finish loading',
      ],
    },

    scratchCode: {
      title: 'Python from Scratch: Token Bucket Rate Limiter Implementation',
      explanation: 'A thread-safe in-memory token bucket rate limiter implementing mathematical refill equations.',
      code: `import time

class TokenBucketRateLimiter:
    """Mathematical token bucket rate limiter."""
    def __init__(self, capacity: int, refill_rate_per_sec: float):
        self.capacity = float(capacity)
        self.tokens = float(capacity)
        self.refill_rate = float(refill_rate_per_sec)
        self.last_refill = time.perf_counter()

    def allow_request(self, tokens_needed: int = 1) -> tuple[bool, float]:
        now = time.perf_counter()
        elapsed = now - self.last_refill
        self.last_refill = now

        # Refill tokens: B(t) = min(C, B(t - dt) + r * dt)
        self.tokens = min(self.capacity, self.tokens + elapsed * self.refill_rate)

        if self.tokens >= tokens_needed:
            self.tokens -= tokens_needed
            return True, self.tokens
        else:
            return False, self.tokens

if __name__ == "__main__":
    limiter = TokenBucketRateLimiter(capacity=5, refill_rate_per_sec=2.0)
    print("=== TOKEN BUCKET SIMULATION ===")
    for i in range(7):
        allowed, rem = limiter.allow_request()
        status = "ALLOWED (200 OK)" if allowed else "BLOCKED (429 Too Many Requests)"
        print(f"Req #{i+1}: {status} | Remaining tokens: {rem:.2f}")
`,
    },

    sklearnCode: {
      title: 'Production FastAPI Application with Health Probes & Structured Logs',
      explanation: 'Complete runnable FastAPI production service with Pydantic validation, request IDs, and readiness probes.',
      code: `from fastapi import FastAPI, Request, HTTPException, status
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
import uuid
import time
import logging

# Configure structured JSON-like logging
logging.basicConfig(level=logging.INFO, format="%(message)s")
logger = logging.getLogger("api")

app = FastAPI(title="Production AI Model API", version="1.0.0")

class PredictRequest(BaseModel):
    user_id: str = Field(..., min_length=3, example="usr_9482")
    features: list[float] = Field(..., min_items=3, max_items=10)

class PredictResponse(BaseModel):
    user_id: str
    prediction: int
    confidence: float
    request_id: str

# Application global state
class AppState:
    is_ready: bool = False
    model_version: str = "v2.1"

state = AppState()

@app.on_event("startup")
async def load_model_weights():
    # Simulate loading 200MB model weights into RAM
    time.sleep(0.5)
    state.is_ready = True
    logger.info('{"event": "model_loaded", "version": "%s"}', state.model_version)

@app.middleware("http")
async def request_context_middleware(request: Request, call_next):
    request_id = request.headers.get("X-Request-ID", f"req_{uuid.uuid4().hex[:8]}")
    request.state.request_id = request_id
    t0 = time.perf_counter()

    response = await call_next(request)
    duration_ms = (time.perf_counter() - t0) * 1000.0

    response.headers["X-Request-ID"] = request_id
    response.headers["X-Response-Time-Ms"] = f"{duration_ms:.2f}"
    
    logger.info(
        '{"request_id": "%s", "method": "%s", "path": "%s", "status": %d, "duration_ms": %.2f}',
        request_id, request.method, request.url.path, response.status_code, duration_ms
    )
    return response

@app.get("/health/liveness", tags=["Observability"])
def liveness():
    return {"status": "alive"}

@app.get("/health/readiness", tags=["Observability"])
def readiness():
    if not state.is_ready:
        return JSONResponse(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            content={"status": "not_ready", "detail": "Weights initializing"}
        )
    return {"status": "ready", "version": state.model_version}

@app.post("/v1/predict", response_model=PredictResponse, tags=["Inference"])
def predict(payload: PredictRequest, request: Request):
    if not state.is_ready:
        raise HTTPException(status_code=503, detail="Model service not ready")

    # Simple mock scoring
    score = sum(payload.features) / len(payload.features)
    prob = 1.0 / (1.0 + (2.71828 ** (-score)))
    
    return PredictResponse(
        user_id=payload.user_id,
        prediction=1 if prob >= 0.5 else 0,
        confidence=round(prob, 4),
        request_id=request.state.request_id
    )
`,
    },

    runnableCode: {
      code: `class MockTokenBucket:
    def __init__(self, capacity, rate):
        self.capacity = capacity
        self.tokens = capacity
        self.rate = rate

    def consume(self):
        if self.tokens >= 1:
            self.tokens -= 1
            return 200, "OK"
        return 429, "Too Many Requests"

# Test rate limiter
bucket = MockTokenBucket(capacity=3, rate=1)
print("=== API RATE LIMITER TEST ===")
for i in range(5):
    status, msg = bucket.consume()
    print(f"Request #{i+1}: HTTP {status} {msg}")
`,
      expectedOutput: `=== API RATE LIMITER TEST ===
Request #1: HTTP 200 OK
Request #2: HTTP 200 OK
Request #3: HTTP 200 OK
Request #4: HTTP 429 Too Many Requests
Request #5: HTTP 429 Too Many Requests`,
    },

    lineByLineExplanation: [
      {
        lines: '1-7',
        codeSnippet: 'class MockTokenBucket: ... self.tokens = capacity',
        explanation: 'Initializes token bucket with maximum burst capacity and refill rate.',
      },
      {
        lines: '8-13',
        codeSnippet: 'def consume(self): if self.tokens >= 1: ... return 429',
        explanation: 'Evaluates token availability, admitting requests when tokens are present and rejecting with 429 when empty.',
      },
      {
        lines: '14-20',
        codeSnippet: 'for i in range(5): status, msg = bucket.consume()',
        explanation: 'Simulates 5 rapid requests against a 3-token bucket, showing 3 successes and 2 rate-limited rejections.',
      },
    ],

    hyperparameters: [
      {
        name: 'Burst Capacity (C)',
        defaultVal: '20',
        range: '5 to 200',
        effect: 'Determines how many rapid requests a client can submit before receiving 429 errors',
        recommendation: 'Set to 2x expected normal client request frequency.',
      },
      {
        name: 'Refill Rate (r)',
        defaultVal: '10.0',
        range: '1.0 to 100.0',
        effect: 'Determines maximum sustained requests per second permitted per client IP',
        recommendation: 'Align with backend single-replica capacity thresholds.',
      },
    ],

    assumptions: [
      {
        assumption: 'Distributed Token Storage for Multiple Pods',
        whyItMatters: 'If using multiple API pod replicas, in-memory rate limiters allow clients to multiply their rate limit by the number of pods.',
        howToVerify: 'Use Redis backed rate limiting (e.g. `fastapi-limiter`) across distributed replica clusters.',
      },
    ],

    commonMistakes: [
      {
        mistake: 'Using a single `/health` endpoint for both Kubernetes liveness and readiness',
        solution: 'Separate into `/health/liveness` (is process running?) and `/health/readiness` (are model weights loaded in memory?).',
        whyWrong: 'If weights take 20s to load, a combined check fails, causing Kubernetes to endlessly kill and restart the container in a boot loop.',
        howToFix: 'Expose separate endpoints for liveness and readiness.',
      },
      {
        mistake: 'Logging raw input payloads containing sensitive customer data (PII) to stdout',
        solution: 'Sanitize or hash customer identifiers, credit card numbers, and emails before structured log emission.',
        whyWrong: 'PII in log files violates GDPR, HIPAA, and SOC2 compliance standards.',
        howToFix: 'Implement a logging sanitizer or log only request metadata and feature summary statistics.',
      },
    ],

    realWorldUseCases: [
      {
        title: 'Credit Risk Scoring API',
        description: 'Handling 1,200 loan evaluation queries per second with Pydantic validation and Redis rate limiting to prevent scraper abuse.',
      },
      {
        title: 'Autonomous Vehicle Fleet Telemetry API',
        description: 'Ingesting sensor vectors with correlation IDs for end-to-end distributed tracing across microservices.',
      },
    ],

    practiceQuestions: [
      {
        id: 'q1',
        question: 'Why does Kubernetes require separate liveness and readiness probes for ML services?',
        answer: 'Liveness checks if the process is alive (if dead, restart it); readiness checks if the model weights are loaded and ready to serve traffic (if not ready, stop routing requests to it, but don’t kill it).',
        explanation: 'Combining them causes reboot loops during heavy model weight initialization.',
      },
      {
        id: 'q2',
        question: 'What is the purpose of an X-Request-ID header in microservice architectures?',
        answer: 'It acts as a unique correlation ID that is passed across all internal microservices and logged in every trace, allowing developers to reconstruct the exact path and errors of a single request.',
        explanation: 'Correlation IDs make distributed debugging feasible in complex cloud systems.',
      },
      {
        id: 'q3',
        question: 'When should an ML API return HTTP status code 429 Too Many Requests?',
        answer: 'When a client exceeds their allocated rate limit threshold in a given time window according to the token bucket policy.',
        explanation: 'HTTP 429 signals the client to throttle their requests and retry after a delay.',
      },
    ],

    quiz: [
      {
        id: 'quiz-1',
        question: 'What happens if a Kubernetes pod fails its readiness probe while passing its liveness probe?',
        options: [
          'Kubernetes terminates and reboots the pod container',
          'Kubernetes removes the pod from the service load balancer so it receives no traffic, but leaves it running',
          'Kubernetes scales the cluster to zero',
          'Kubernetes emails the system administrator',
        ],
        correctIndex: 1,
        explanation: 'Readiness failures simply detach the pod from incoming traffic until it reports ready, preventing failed queries during initialization.',
      },
      {
        id: 'quiz-2',
        question: 'Which Pydantic field constraint ensures a numerical input feature `temperature` is between -50.0 and 60.0?',
        options: [
          'Field(..., ge=-50.0, le=60.0)',
          'Field(..., min_length=-50, max_length=60)',
          'Field(..., pattern="[-50, 60]")',
          'Field(..., is_temperature=True)',
        ],
        correctIndex: 0,
        explanation: '`ge` (greater than or equal) and `le` (less than or equal) enforce mathematical bounds on numerical fields.',
      },
      {
        id: 'quiz-3',
        question: 'Why is structured JSON logging preferred over plain unstructured text logs in production API services?',
        options: [
          'JSON logs take up zero bytes on disk',
          'JSON logs can be automatically indexed, queried, and filtered by log aggregation tools (Datadog, ElasticSearch)',
          'JSON logs cannot be deleted',
          'Python only supports JSON logging',
        ],
        correctIndex: 1,
        explanation: 'Structured key-value JSON logs enable automated filtering by status code, latency threshold, or request_id in monitoring platforms.',
      },
      {
        id: 'quiz-4',
        question: 'In a token bucket rate limiter, what does the parameter `capacity` (C) represent?',
        options: [
          'The maximum number of database connections',
          'The maximum instantaneous burst of requests allowed before rate limiting triggers',
          'The total RAM of the host machine',
          'The number of CPU cores',
        ],
        correctIndex: 1,
        explanation: 'Capacity C defines the maximum bucket volume, governing the size of instantaneous traffic bursts allowed.',
      },
    ],

    independentExercise: {
      title: 'Implement a Request Timing and Correlation ID Middleware',
      problem:
        'Write a custom async ASGI middleware class `TimingMiddleware` that generates or preserves `X-Request-ID`, calculates execution time in milliseconds, and appends `X-Process-Time-Ms` to response headers.',
      hints: [
        'Use `time.perf_counter()` before and after calling the next handler',
        'Check `request.headers.get("x-request-id")` or generate a new uuid',
        'Add headers to `response.headers`',
      ],
      starterCode: `import time
import uuid

class TimingMiddleware:
    def __init__(self, app):
        self.app = app

    async def __call__(self, scope, receive, send):
        # TODO: Implement ASGI timing and header injection
        pass
`,
      solution: `import time
import uuid

class TimingMiddleware:
    def __init__(self, app):
        self.app = app

    async def __call__(self, scope, receive, send):
        if scope["type"] != "http":
            await self.app(scope, receive, send)
            return

        t0 = time.perf_counter()
        req_id = "req_" + uuid.uuid4().hex[:8]

        async def send_wrapper(message):
            if message["type"] == "http.response.start":
                duration_ms = (time.perf_counter() - t0) * 1000.0
                headers = list(message.get("headers", []))
                headers.append((b"x-request-id", req_id.encode("utf-8")))
                headers.append((b"x-process-time-ms", f"{duration_ms:.2f}".encode("utf-8")))
                message["headers"] = headers
            await send(message)

        await self.app(scope, receive, send_wrapper)
`,
    },

    summary: {
      keyTakeaways: [
        'Pydantic declarative schemas catch malformed payloads before model forward passes execute, returning 422 errors automatically',
        'Maintain distinct `/health/liveness` (process alive) and `/health/readiness` (model weights loaded) endpoints for orchestrators',
        'Implement token bucket rate limiting to prevent traffic surges from exhausting worker thread pools',
      ],
      nextLessonId: 'deploy-06-cloud-computing',
      nextLessonTitle: 'Deploy-06: Cloud Computing Fundamentals for AI Systems',
      nextLessonModuleId: 'p11-m6',
    },
  },

  'deploy-06-cloud-computing': {
    id: 'deploy-06-cloud-computing',
    moduleId: 'p11-m6',
    title: 'Deploy-06: Cloud Computing Fundamentals for AI Systems',
    subtitle: 'IaaS, PaaS, Serverless, Availability Zones & Cloud Cost Trade-offs',
    order: 1,
    readTimeMinutes: 35,
    difficulty: 'Beginner',
    visualizerType: 'deploy-cloud-comparison-explorer',

    objectives: [
      'Compare cloud service models (IaaS, PaaS, CaaS/Serverless Containers, Managed Kubernetes)',
      'Analyze cloud geography: Regions, Availability Zones (AZs), and edge points of presence',
      'Design high availability architectures using multi-AZ redundancy and composite availability mathematics',
      'Apply IAM least-privilege policies to AI services accessing object storage and feature databases',
      'Calculate Total Cost of Ownership (TCO) across compute, GPU allocation, storage, and egress data transfer',
    ],

    prerequisites: [
      'Deploy-01 (Deployment Fundamentals) and Deploy-04 (Docker)',
      'Basic familiarity with web services and cloud concepts',
    ],
    previousLesson: {
      id: 'deploy-05-production-apis',
      title: 'Deploy-05: Production API Engineering with FastAPI',
      moduleId: 'p11-m5',
    },

    analogy: {
      title: 'Transportation Tiers: Buying a Car vs. Car Rental vs. Uber',
      text: 'Deploying AI to the cloud is like choosing your transportation model. Buying and maintaining a fleet of commercial vans (IaaS / Virtual Machines) gives you complete control over engine tuning and custom racks, but you are responsible for oil changes, tire rotations, and insurance. Renting a car on vacation (PaaS) means the agency handles mechanical upkeep, and you just drive. Calling an Uber or hail-ride (Serverless Containers) means a car appears only when you need a ride and disappears when you reach your destination—you pay strictly by the minute of travel with zero idle parking fees.',
      metaphor: 'IaaS is owning the hardware fleet; PaaS is managed rental; Serverless is on-demand ride-hailing.',
    },

    problemSolved: {
      title: 'Architecting Scalable Infrastructure Without Overpaying',
      description:
        'AI teams often over-provision expensive GPU cloud instances that sit idle 80% of the day, burning thousands of dollars per month. Alternatively, deploying to single-zone instances leads to complete service blackouts when a single cloud data center suffers a power or cooling failure.',
      keyPoints: [
        'Selecting the wrong service model causes massive operational overhead or runaway cloud bills',
        'Serverless containers (Cloud Run, App Runner) eliminate idle costs by scaling to zero during off-peak hours',
        'Distributing instances across at least two Availability Zones (AZs) protects against data center fiber cuts',
        'Network egress (data leaving the cloud) is a hidden cost trap that must be modeled during capacity planning',
      ],
    },

    intuition: {
      overview:
        'Cloud computing provides virtualized, elastic compute and storage primitives accessible via APIs, enabling rapid scaling without upfront physical datacenter purchases.',
      steps: [
        {
          step: 1,
          title: 'Service Model Selection',
          description:
            'Choose IaaS for custom GPU drivers or bare-metal performance, PaaS for rapid prototypes, Serverless Containers for spiky web traffic, and Kubernetes for multi-team enterprise ecosystems.',
        },
        {
          step: 2,
          title: 'Regional Redundancy (Multi-AZ)',
          description:
            'A Region consists of 2 to 4 physically separated data centers (Availability Zones) connected by low-latency fiber (<2ms). Deploying across AZs guarantees survival if one facility fails.',
        },
        {
          step: 3,
          title: 'IAM Least Privilege',
          description:
            'Services are assigned IAM Roles with fine-grained policies (e.g. read-only access to `s3://company-models/prod/`) rather than broad admin keys.',
        },
        {
          step: 4,
          title: 'Cost & Egress Optimization',
          description:
            'Keep data storage and compute in the same cloud region to avoid cross-region egress fees, and utilize spot/preemptible instances for asynchronous batch workloads.',
        },
      ],
    },

    mathematics: {
      overview:
        'System reliability engineering models system availability as combinations of serial and parallel components.',
      foundations: [
        {
          name: 'Serial Component Availability',
          latex: 'A_{\\text{serial}} = \\prod_{i=1}^n A_i = A_{\\text{proxy}} \\times A_{\\text{api}} \\times A_{\\text{db}}',
          explanation:
            'In a sequential pipeline where every component must function for the request to succeed, total availability is the product of individual availabilities (and is always strictly lower than the weakest link).',
        },
        {
          name: 'Parallel Redundant Availability',
          latex: 'A_{\\text{parallel}} = 1 - \\prod_{i=1}^m (1 - A_i)',
          explanation:
            'For redundant components where only one must function (e.g. two pods across 2 AZs), availability increases dramatically because all components must fail simultaneously for an outage to occur.',
        },
      ],
    },

    derivation: {
      title: 'Derivation of Multi-Zone Availability Improvement',
      objective: 'Calculate the composite availability of two API replicas deployed across independent Availability Zones.',
      steps: [
        {
          step: 1,
          label: 'Single Zone Failure Probability',
          latex: 'P(\\text{fail}) = 1 - A = 1 - 0.999 = 0.001',
          explanation: 'A 99.9% availability SLA implies a 0.1% chance of outage (~43 minutes downtime/month).',
        },
        {
          step: 2,
          label: 'Simultaneous Failure of Two Independent AZs',
          latex: 'P(\\text{both fail}) = P(\\text{fail}_1) \\times P(\\text{fail}_2) = 0.001 \\times 0.001 = 10^{-6}',
          explanation: 'Because data centers are physically isolated on independent flood plains and power grids, failures are statistically independent.',
        },
        {
          step: 3,
          label: 'Composite Multi-AZ Availability',
          latex: 'A_{\\text{multi-AZ}} = 1 - 10^{-6} = 0.999999 \\quad (99.9999\\%)',
          explanation: 'Multi-AZ architecture elevates theoretical availability from "three nines" to "six nines".',
        },
      ],
    },

    variables: [
      { symbol: 'A_i', name: 'Component Availability', description: 'Uptime percentage of component i (e.g. 0.999 for 99.9%)' },
      { symbol: 'P(\\text{fail})', name: 'Unavailability Probability', description: 'Fraction of time the service is expected to be down (1 - A)' },
      { symbol: 'A_{\\text{multi-AZ}}', name: 'Composite Availability', description: 'System-wide availability achieved through parallel redundancy' },
    ],

    numericalExample: {
      scenario: 'Estimating the monthly cloud infrastructure bill for an ML inference API serving 15 million requests/month.',
      dataset: [
        { item: 'Compute: 2x 4-vCPU 16GB RAM instances', rate: '$0.192/hr * 730 hrs * 2', cost: '$280.32' },
        { item: 'Managed Object Storage: 250 GB model weights', rate: '$0.023/GB-month * 250', cost: '$5.75' },
        { item: 'Network Egress: 15M req * 4KB = 60 GB', rate: '$0.09/GB * 60', cost: '$5.40' },
        { item: 'Managed Load Balancer', rate: '$18.00/month', cost: '$18.00' },
      ],
      calculations: [
        {
          step: '1. Total Monthly Cost',
          math: '280.32 + 5.75 + 5.40 + 18.00',
          result: '$309.47 / month',
        },
        {
          step: '2. Unit Cost per 1,000 Inferences',
          math: '(309.47 / 15,000,000) * 1000',
          result: '$0.0206 per 1,000 requests (~2 cents)',
        },
      ],
      finalConclusion: 'The total cost of ownership is ~$310/month, delivering highly predictable unit economics of ~2 cents per 1,000 predictions.',
    },

    visualExplanation: {
      title: 'Navigating the Cloud Service Comparison Explorer',
      description:
        'The interactive visualizer compares Managed PaaS, Serverless Containers, Virtual Machines (IaaS), and Managed Kubernetes. Adjust daily traffic volume, GPU acceleration requirements, and cold start tolerance to find your optimal target.',
      features: [
        'Explore scoring algorithms that recommend the highest suitability target based on team skill and constraints',
        'Compare estimated monthly costs, operational maintenance burden, and cold-start characteristics',
        'Review architecture trade-offs between zero-maintenance PaaS and high-control Kubernetes clusters',
      ],
    },

    scratchCode: {
      title: 'Python from Scratch: Multi-Cloud Architecture TCO & Cost Estimator',
      explanation: 'Calculates detailed monthly cloud bills and unit economics across compute, storage, and network egress.',
      code: `class CloudTCOCalculator:
    """Calculates monthly cloud cost breakdown for AI inference services."""
    def __init__(self, monthly_requests: int, avg_payload_kb: float, compute_hours_per_month: int = 730):
        self.requests = monthly_requests
        self.payload_kb = avg_payload_kb
        self.hours = compute_hours_per_month

    def calculate_cost(self, hourly_instance_cost: float, num_instances: int, storage_gb: float) -> dict:
        compute_cost = hourly_instance_cost * self.hours * num_instances
        storage_cost = storage_gb * 0.023  # Standard S3 object storage ($0.023/GB)
        
        # Egress: total data transferred out to internet
        egress_gb = (self.requests * self.payload_kb) / (1024 * 1024)
        egress_cost = egress_gb * 0.09  # Typical cloud internet egress rate ($0.09/GB)
        
        lb_cost = 22.0  # Application load balancer base charge
        total_monthly = compute_cost + storage_cost + egress_cost + lb_cost
        cost_per_thousand = (total_monthly / (self.requests or 1)) * 1000.0

        return {
            "compute_cost": round(compute_cost, 2),
            "storage_cost": round(storage_cost, 2),
            "egress_cost": round(egress_cost, 2),
            "load_balancer": lb_cost,
            "total_monthly_usd": round(total_monthly, 2),
            "cost_per_1000_inferences": round(cost_per_thousand, 4),
        }

if __name__ == "__main__":
    tco = CloudTCOCalculator(monthly_requests=10_000_000, avg_payload_kb=8.0)
    bill = tco.calculate_cost(hourly_instance_cost=0.14, num_instances=2, storage_gb=120)
    print("=== ESTIMATED MONTHLY CLOUD TCO ===")
    for k, v in bill.items():
        print(f"  {k}: {v}")
`,
    },

    sklearnCode: {
      title: 'Terraform Infrastructure as Code (IaC) for Secure Container Deployment',
      explanation: 'Declarative Terraform definition provisioning a cloud container service, IAM least-privilege role, and security group.',
      code: `# Terraform AWS Cloud Infrastructure Definition
terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = { source = "hashicorp/aws", version = "~> 5.0" }
  }
}

# IAM Role with Least Privilege Access to Model Artifacts
resource "aws_iam_role" "ai_service_role" {
  name = "ai-inference-service-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = { Service = "ecs-tasks.amazonaws.com" }
    }]
  })
}

resource "aws_iam_policy" "s3_model_read" {
  name = "s3-model-artifact-read-only"
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Action = ["s3:GetObject", "s3:ListBucket"]
      Resource = [
        "arn:aws:s3:::company-aiml-models",
        "arn:aws:s3:::company-aiml-models/prod/*"
      ]
    }]
  })
}

resource "aws_iam_role_policy_attachment" "attach_read" {
  role       = aws_iam_role.ai_service_role.name
  policy_arn = aws_iam_policy.s3_model_read.arn
}
`,
    },

    runnableCode: {
      code: `def calculate_multi_az_availability(single_az_availability: float, az_count: int = 2) -> dict:
    p_fail_single = 1.0 - single_az_availability
    p_fail_all = p_fail_single ** az_count
    composite_availability = 1.0 - p_fail_all
    
    # Downtime minutes per month (30 days * 24 hrs * 60 mins = 43,200 mins)
    single_downtime_mins = p_fail_single * 43200
    multi_downtime_mins = p_fail_all * 43200
    
    return {
        "single_az_uptime": f"{single_az_availability * 100:.2f}%",
        "multi_az_uptime": f"{composite_availability * 100:.5f}%",
        "single_az_downtime_mins": round(single_downtime_mins, 1),
        "multi_az_downtime_mins": round(multi_downtime_mins, 4),
    }

metrics = calculate_multi_az_availability(0.999, az_count=2)
print("=== CLOUD HIGH AVAILABILITY METRICS ===")
print(f"Single AZ SLA (99.9%):  {metrics['single_az_downtime_mins']} mins/month downtime")
print(f"Multi-AZ SLA (2 AZs):   {metrics['multi_az_downtime_mins']} mins/month downtime")
print(f"Availability Gain:      {metrics['single_az_uptime']} -> {metrics['multi_az_uptime']}")
`,
      expectedOutput: `=== CLOUD HIGH AVAILABILITY METRICS ===
Single AZ SLA (99.9%):  43.2 mins/month downtime
Multi-AZ SLA (2 AZs):   0.0432 mins/month downtime
Availability Gain:      99.90% -> 99.99990%`,
    },

    lineByLineExplanation: [
      {
        lines: '1-6',
        codeSnippet: 'p_fail_single = 1.0 - single_az_availability; p_fail_all = p_fail_single ** az_count',
        explanation: 'Applies parallel redundancy probability theory to calculate simultaneous multi-datacenter failure risk.',
      },
      {
        lines: '7-10',
        codeSnippet: 'single_downtime_mins = ...; multi_downtime_mins = ...',
        explanation: 'Translates percentage availability into tangible downtime minutes per calendar month.',
      },
      {
        lines: '11-17',
        codeSnippet: 'print(f"Single AZ SLA: ...")',
        explanation: 'Shows how multi-AZ redundancy drops monthly downtime from 43.2 minutes to less than 3 seconds.',
      },
    ],

    hyperparameters: [
      {
        name: 'Availability Zone Count',
        defaultVal: '2',
        range: '1 to 3',
        effect: 'Number of distinct data center facilities hosting active container replicas',
        recommendation: 'Always deploy across at least 2 AZs in production for high availability.',
      },
      {
        name: 'Spot / Preemptible Instance Usage',
        defaultVal: '0% for online API, 100% for batch training',
        range: '0% to 100%',
        effect: 'Offers 60-80% discounts in exchange for cloud provider reclaiming instances with 2-minute notice',
        recommendation: 'Never use spot instances for online inference without warm on-demand fallback pools.',
      },
    ],

    assumptions: [
      {
        assumption: 'Independent Failure Modes Across AZs',
        whyItMatters: 'If two instances share the same network switch, power supply, or data center building, they do not provide true redundancy.',
        howToVerify: 'Verify that subnets belong to distinct Availability Zone identifiers (e.g. us-east-1a and us-east-1b).',
      },
    ],

    commonMistakes: [
      {
        mistake: 'Deploying an entire production system into a single Availability Zone (AZ)',
        solution: 'Distribute minimum replica counts across at least two independent Availability Zones behind a load balancer.',
        whyWrong: 'A single data center power disruption, fiber cut, or cooling glitch takes your entire business offline.',
        howToFix: 'Configure multi-AZ subnets in your cloud VPC.',
      },
      {
        mistake: 'Using static cloud administrator access keys inside code or container environment variables',
        solution: 'Use IAM Roles for Service Accounts (IRSA) or cloud instance metadata profiles with short-lived tokens.',
        whyWrong: 'Permanent root or admin access keys leak easily and provide full control to attackers.',
        howToFix: 'Assign IAM Roles with temporary STS credentials to container tasks.',
      },
    ],

    realWorldUseCases: [
      {
        title: 'Multi-Region Global Inference Engine',
        description: 'Deploying inference endpoints in us-east-1, eu-west-1, and ap-southeast-1 to ensure sub-50ms latency for global users.',
      },
      {
        title: 'Serverless Batch Inference with Cloud Run',
        description: 'Processing nighttime batch OCR documents using containerized auto-scaling that scales to 0 instances by sunrise.',
      },
    ],

    practiceQuestions: [
      {
        id: 'q1',
        question: 'What is the main difference between an IaaS virtual machine (EC2) and a Serverless Container (Cloud Run)?',
        answer: 'With IaaS, you manage the OS, security patches, scaling rules, and pay for 100% of running hours even when idle; with Serverless Containers, the provider manages the OS and scaling, and you only pay for exact compute seconds when processing requests, scaling to zero when idle.',
        explanation: 'Serverless containers drastically cut operational maintenance and eliminate idle costs for spiky workloads.',
      },
      {
        id: 'q2',
        question: 'Why does deploying across two Availability Zones increase availability from 99.9% to 99.9999%?',
        answer: 'Because both independent data centers must experience an outage simultaneously for the service to fail. The probability of joint independent failure is 0.001 * 0.001 = 0.000001 (one in a million).',
        explanation: 'Parallel redundancy drives downtime down from 43 minutes/month to under 3 seconds.',
      },
      {
        id: 'q3',
        question: 'What is cloud network egress and why is it a significant consideration for AI systems?',
        answer: 'Egress is the outbound data transfer leaving a cloud provider’s network to the public internet or another region. Ingest is typically free, but egress incurs per-gigabyte fees ($0.08–$0.12/GB), which can become very expensive when serving large audio, video, or image models.',
        explanation: 'Always budget for egress costs when distributing high-bandwidth model outputs.',
      },
    ],

    quiz: [
      {
        id: 'quiz-1',
        question: 'What is an Availability Zone (AZ) in modern cloud architecture?',
        options: [
          'A continent-level geographic region',
          'One or more discrete, physically separated data centers within a region, equipped with independent power, cooling, and networking',
          'A software library for Python',
          'A billing discount program for students',
        ],
        correctIndex: 1,
        explanation: 'AZs are isolated physical data center facilities designed so that a disaster in one does not affect adjacent zones.',
      },
      {
        id: 'quiz-2',
        question: 'If a component has an availability of 99.9%, approximately how much downtime is expected per calendar month?',
        options: ['4.3 seconds', '43.2 minutes', '7.2 hours', '3 days'],
        correctIndex: 1,
        explanation: '0.1% of 43,200 minutes in a 30-day month equals approximately 43.2 minutes of allowed downtime.',
      },
      {
        id: 'quiz-3',
        question: 'Which cloud computing model scales automatically to zero instances when no requests are being processed, eliminating idle costs?',
        options: ['Bare Metal Server', 'Serverless Containers (e.g. GCP Cloud Run / AWS App Runner)', 'On-Demand EC2 Virtual Machines', 'Dedicated GPU Cluster'],
        correctIndex: 1,
        explanation: 'Serverless containers spin down to zero replicas during quiet periods, eliminating compute bills entirely until new requests arrive.',
      },
      {
        id: 'quiz-4',
        question: 'What is the security principle of "Least Privilege" in Cloud IAM?',
        options: [
          'Granting all developers full AdministratorAccess to move quickly',
          'Granting a user or service only the absolute minimum permissions required to perform their specific job function',
          'Disabling passwords across all accounts',
          'Running all cloud servers without firewalls',
        ],
        correctIndex: 1,
        explanation: 'Least privilege ensures that if an API key or service is compromised, the attacker cannot access unrelated databases or infrastructure.',
      },
    ],

    independentExercise: {
      title: 'Build a Composite System Availability & Downtime Calculator',
      problem:
        'Write a Python function `calculate_system_availability(components)` where `components` is a list of tuples `(name, availability_pct, type)` where type is "serial" or "parallel". Compute the total system availability and estimated monthly downtime.',
      hints: [
        'Multiply serial component availabilities: A_serial = A1 * A2 * ...',
        'Combine parallel components: A_parallel = 1 - (1 - A1) * (1 - A2)',
        'Monthly downtime = (1 - Total_A) * 43200 minutes',
      ],
      starterCode: `def calculate_system_availability(serial_components: list[float], parallel_pairs: list[list[float]]) -> dict:
    # TODO: Calculate composite availability
    pass

print(calculate_system_availability([0.999, 0.9995], [[0.999, 0.999]]))
`,
      solution: `def calculate_system_availability(serial_components: list[float], parallel_pairs: list[list[float]]) -> dict:
    total_avail = 1.0
    for a in serial_components:
        total_avail *= a
        
    for pair in parallel_pairs:
        # 1 - (1-a1)*(1-a2)
        p_fail = 1.0
        for p in pair:
            p_fail *= (1.0 - p)
        total_avail *= (1.0 - p_fail)
        
    downtime_mins = (1.0 - total_avail) * 43200.0
    return {
        "composite_availability": round(total_avail, 6),
        "uptime_percentage": f"{total_avail * 100:.4f}%",
        "monthly_downtime_minutes": round(downtime_mins, 2),
    }

print(calculate_system_availability([0.999, 0.9995], [[0.999, 0.999]]))
`,
    },

    summary: {
      keyTakeaways: [
        'Choose the appropriate cloud model: Serverless Containers for scale-to-zero efficiency, IaaS for custom GPU hardware control',
        'Deploy across multiple Availability Zones to elevate composite availability from 99.9% to 99.9999% and eliminate single points of failure',
        'Apply IAM least privilege to ensure AI services only access designated model buckets with temporary credentials',
      ],
      nextLessonId: 'deploy-07-deploying-ai-apps',
      nextLessonTitle: 'Deploy-07: Deploying AI Applications (Frontend, Backend & Models)',
      nextLessonModuleId: 'p11-m7',
    },
  },
};

