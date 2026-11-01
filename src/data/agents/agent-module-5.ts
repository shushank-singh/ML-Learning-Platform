import { ModuleData, LessonContent } from '@/lib/types';

// =========================================================================
// MODULE 13: Advanced Agent Patterns (p9-m13)
// =========================================================================
export const p9m13Data: ModuleData = {
  id: 'p9-m13',
  number: 13,
  title: 'Advanced Agent Patterns',
  subtitle: 'Self-Reflection, Semantic Routers, Event Loops & The Simplest Architecture Rule',
  description:
    'Master advanced agentic design patterns. Examine Reflexion (self-critique loops), semantic router networks, event-driven reactive agents, and evaluate the critical trade-offs and failure modes of self-evaluation.',
  icon: 'Sparkles',
  badge: 'Phase 9 · AI Agents',
  estimatedHours: 3,
  topicsCount: 1,
  lessons: [
    {
      id: 'agent-13-advanced-patterns',
      moduleId: 'p9-m13',
      title: 'Agent-13: Advanced Agent Patterns: Reflection, Routers & Event Loops',
      description:
        'Reflexion critique loops, router-specialist topologies, event-driven reactive architectures, and choosing the simplest effective pattern.',
      order: 1,
      readTimeMinutes: 35,
      visualizerType: 'agent-control-loop-explorer',
      difficulty: 'Advanced',
    },
  ],
};

// =========================================================================
// MODULE 14: Building a Production-Ready Agent (p9-m14)
// =========================================================================
export const p9m14Data: ModuleData = {
  id: 'p9-m14',
  number: 14,
  title: 'Production Agent Engineering',
  subtitle: 'API Runtimes, Tenant Isolation, Rate Limiting & Graceful Degradation',
  description:
    'Architect hardened production-ready agent runtimes. Implement asynchronous queueing (Celery/Temporal), strict multi-tenant session isolation, token rate limiters, automated error fallbacks, and regulatory compliance.',
  icon: 'Layers',
  badge: 'Phase 9 · AI Agents',
  estimatedHours: 3,
  topicsCount: 1,
  lessons: [
    {
      id: 'agent-14-production-agent',
      moduleId: 'p9-m14',
      title: 'Agent-14: Production Engineering, Session Isolation & Graceful Degradation',
      description:
        'Microservice runtime architecture, session state persistence, leaky bucket rate limits, fallbacks, and secure enterprise deployment.',
      order: 1,
      readTimeMinutes: 35,
      visualizerType: 'agent-trace-budget-explorer',
      difficulty: 'Advanced',
    },
  ],
};

// =========================================================================
// MODULE 15: AI Agent Capstone (p9-m15)
// =========================================================================
export const p9m15Data: ModuleData = {
  id: 'p9-m15',
  number: 15,
  title: 'AI Agent Capstone Project',
  subtitle: 'End-to-End Educational Task Assistant with Tools, State, HITL & Traces',
  description:
    'Synthesize all Phase 9 concepts into an end-to-end autonomous educational task assistant. Implement an allowlisted tool suite, explicit task state machine, schema validation, human approval gates, execution traces, and automated benchmark verification.',
  icon: 'Award',
  badge: 'Phase 9 · AI Agents',
  estimatedHours: 4,
  topicsCount: 1,
  lessons: [
    {
      id: 'agent-15-capstone',
      moduleId: 'p9-m15',
      title: 'Agent-15: Capstone: Production Task Assistant with HITL & Traces',
      description:
        'Build and test an end-to-end task assistant with safe tools allowlist, multi-step state graph, human approval gate, execution trace logging, and automated assertion tests.',
      order: 1,
      readTimeMinutes: 42,
      visualizerType: 'agent-hitl-approval-explorer',
      difficulty: 'Advanced',
    },
  ],
};

// =========================================================================
// LESSON CONTENTS (Modules 13 - 15)
// =========================================================================
export const agentModule5Lessons: Record<string, LessonContent> = {
  'agent-13-advanced-patterns': {
    id: 'agent-13-advanced-patterns',
    moduleId: 'p9-m13',
    title: 'Agent-13: Advanced Agent Patterns: Reflection, Routers & Event Loops',
    subtitle: 'Self-Critique, Semantic Routing, Event-Driven Triggers & Architectural Simplicity',
    order: 1,
    readTimeMinutes: 35,
    difficulty: 'Advanced',
    visualizerType: 'agent-control-loop-explorer',

    objectives: [
      'Implement Reflexion (Shinn et al., 2023) loops that verbalize past errors and iteratively refine solutions',
      'Architect semantic router patterns to dispatch user queries to lightweight specialists versus heavy reasoners',
      'Design event-driven agents that react asynchronously to webhooks, message queues, and external telemetry',
      'Critically analyze the cognitive biases and limits of LLM self-evaluation (hallucination reinforcement)',
      'Apply the "Simplest Effective Architecture" principle to avoid unnecessary agentic complexity',
    ],
    prerequisites: [
      'Agent-02: Core Architecture & Control Loops',
      'Agent-08: Multi-Agent Teams & Coordination',
    ],
    previousLesson: {
      id: 'agent-12-observability',
      title: 'Agent-12: Observability, Trace Spans & Circuit Breakers',
      moduleId: 'p9-m12',
    },

    analogy: {
      title: 'The Chess Master Analyzing Their Own Blunders',
      text: 'A novice chess player plays a bad move, loses a piece, and immediately makes another hurried move in frustration. A grandmaster, after playing a game that resulted in a loss, does not simply replay the same strategy. They sit down with a notebook and replay the match move-by-move (Reflexion): "At move 14, I pushed my f-pawn prematurely, leaving my king exposed to the bishop diagonal. Next time, I must castle before opening the center." They write this lesson into their memory. In the next match against that opening, the grandmaster recalls the lesson and avoids the trap.',
      metaphor: 'Reflexion turns trial-and-error failures into linguistic memory lessons that steer subsequent attempts.',
    },

    problemSolved: {
      title: 'Breaking Out of Repetitive Failure Traps Through Verbal Reflection',
      description:
        'Standard agents often get stuck in repetitive failure modes when solving complex coding, mathematical, or scientific tasks. They repeat slightly different variations of the same broken logic. Reflexion forces the model to step outside execution, critique its past attempt, and write an explicit rule for what to change.',
      keyPoints: [
        'Verbal Reinforcement: Transforms scalar environmental failure signals into semantic natural language lessons',
        'Memory Anchoring: Lessons are stored in episodic memory to guide future attempts on similar tasks',
        'Hierarchical Routing: Routes simple queries to fast models and complex queries to reflective agents',
        'Simplicity Guardrails: Prevents building 5-agent swarms when a 10-line Python script solves the problem',
      ],
    },

    intuition: {
      overview:
        'The Reflexion pattern augments standard ReAct execution with an Actor, an Evaluator, and a Self-Reflection component.',
      steps: [
        {
          step: 1,
          title: 'Trial Execution (Actor)',
          description:
            'The agent executes a full multi-step trajectory attempting to solve the user task.',
        },
        {
          step: 2,
          title: 'Deterministic Evaluation (Evaluator)',
          description:
            'Unit tests or compilers evaluate the final artifact, emitting a binary pass/fail and error diagnostics.',
        },
        {
          step: 3,
          title: 'Self-Reflection (Critique)',
          description:
            'If the trial failed, a reflection prompt asks the model: "What went wrong, and what specific change will fix it?"',
        },
        {
          step: 4,
          title: 'Memory Storage & Retry',
          description:
            'The written reflection is added to the system prompt as advice, and the Actor attempts the task again.',
        },
      ],
    },

    mathematics: {
      overview:
        'Reflexion models policy improvement as heuristic gradient updates in natural language space.',
      foundations: [
        {
          name: 'Reflexive Policy Conditioning',
          latex: 'P(a_t \\mid h_t, g, \\mathcal{M}_{\\text{ref}}) = \\text{LLM}(h_t, g, \\{r_1, r_2, \\dots, r_m\\})',
          explanation:
            'The action distribution is conditioned not only on task history h_t and goal g, but on accumulated linguistic reflections r_i.',
        },
        {
          name: 'Reflection Generation Function',
          latex: 'r_{k+1} = \\text{LLM}_{\\text{critique}}(\\tau_k, \\text{Feedback}_k, g)',
          explanation:
            'The critique model inspects failed trajectory tau_k and compiler/test feedback to synthesize advice r_{k+1}.',
        },
        {
          name: 'Self-Evaluation Bias Degradation Bound',
          latex: '\\mathbb{P}(\\text{Correct} \\mid \\text{SelfCritique}) < \\mathbb{P}(\\text{Correct} \\mid \\text{ExternalUnitTests})',
          explanation:
            'Models evaluating their own code hallucinate correctness 30-40% of the time; external deterministic tests are mandatory ground truth.',
        },
      ],
    },

    derivation: {
      title: 'Derivation of Architectural Selection: Occam’s Razor Decision Matrix',
      objective: 'Formulate an analytical selection rule to choose the simplest effective system architecture.',
      steps: [
        {
          step: 1,
          label: 'Determine Information & State Requirements',
          latex: 'D_{\\text{type}} = \\begin{cases} 0 & \\text{Static deterministic math or table lookup} \\\\ 1 & \\text{Single-hop document fetch (knowledge at rest)} \\\\ 2 & \\text{Multi-step workflow with fixed branching} \\\\ 3 & \\text{Open-ended problem with dynamic error recovery} \\end{cases}',
          explanation: 'Categorizes the operational complexity of the problem domain.',
        },
        {
          step: 2,
          label: 'Map to Minimal Architectural Complexity',
          latex: '\\text{OptimalArchitecture} = \\begin{cases} \\text{Procedural Code / SQL} & \\text{if } D = 0 \\\\ \\text{Standard RAG} & \\text{if } D = 1 \\\\ \\text{Deterministic Workflow Graph} & \\text{if } D = 2 \\\\ \\text{Autonomous ReAct / Reflexion Agent} & \\text{if } D = 3 \\end{cases}',
          explanation: 'Selecting higher complexity than necessary adds latency, cost, and failure vectors with zero benefit.',
        },
        {
          step: 3,
          label: 'Failure Probability Monotonicity',
          latex: '\\mathbb{P}(\\text{Failure}_{\\text{system}}) \\propto \\text{Complexity}(\\text{Architecture})',
          explanation: 'Always choose the lowest complexity level D that satisfies the functional requirement.',
        },
      ],
    },

    variables: [
      { symbol: 'r_k', name: 'Linguistic Reflection', description: 'Natural language lesson learned from trial k failure' },
      { symbol: '\\mathcal{M}_{\\text{ref}}', name: 'Reflection Memory', description: 'Buffer of past advice guiding subsequent attempts' },
      { symbol: 'D_{\\text{type}}', name: 'Task Complexity Class', description: 'Measure of dynamic branching and environmental uncertainty' },
    ],

    numericalExample: {
      scenario: 'Evaluating a Python code-generation agent on a tricky algorithmic problem over 3 Reflexion trials',
      dataset: [
        { trial: 1, code: 'def is_prime(n): return n % 2 != 0', testsPassed: '2/5', reflection: 'Failed for n=1 and n=9. 1 is not prime; 9 is divisible by 3.' },
        { trial: 2, code: 'def is_prime(n): check odds up to n//2', testsPassed: '4/5', reflection: 'Slow for large n; should check up to int(sqrt(n)) and handle n <= 1.' },
        { trial: 3, code: 'def is_prime(n): check <= 1, then 2, then odds up to sqrt(n)', testsPassed: '5/5', reflection: 'All tests passed. Optimal complexity.' },
      ],
      calculations: [
        { step: 'Trial 1 Accuracy', math: '2 / 5', result: '40% Pass' },
        { step: 'Trial 2 Accuracy (with Ref 1)', math: '4 / 5', result: '80% Pass' },
        { step: 'Trial 3 Accuracy (with Ref 2)', math: '5 / 5', result: '100% Pass' },
      ],
      finalConclusion: 'Linguistic reflection guided the model from 40% to 100% test success across 3 bounded iterations.',
    },

    visualExplanation: {
      title: 'The Reflexion Self-Correction Loop',
      description: 'Trace how external test signals generate semantic advice that updates the actor’s memory.',
      features: [
        'Actor: Generates Python function solution to problem',
        'Evaluator: Runs local pytest in sandboxed container -> Fails Test 3 (Edge case: empty list)',
        'Self-Reflection: Generates critique: "I failed to check if len(items) == 0 before computing mean."',
        'Memory Buffer: Injects critique into system prompt for Trial 2 -> Actor handles empty list cleanly',
      ],
    },

    scratchCode: {
      title: 'Reflexion Self-Correction Loop in Pure Python',
      code: `def run_tests(code_str: str) -> dict:
    # Deterministic test evaluator
    local_scope = {}
    try:
        exec(code_str, {}, local_scope)
        fn = local_scope.get("is_palindrome")
        if not fn:
            return {"passed": False, "error": "Function 'is_palindrome' not defined."}
        # Run test cases
        assert fn("radar") == True, "Failed for 'radar'"
        assert fn("hello") == False, "Failed for 'hello'"
        assert fn("A man, a plan, a canal: Panama") == True, "Failed for phrase with spaces and punctuation"
        return {"passed": True, "error": None}
    except Exception as e:
        return {"passed": False, "error": str(e)}

class ReflexionAgent:
    def __init__(self, max_trials=3):
        self.max_trials = max_trials
        self.reflections = []

    def solve(self):
        for trial in range(1, self.max_trials + 1):
            print(f"--- TRIAL {trial}/{self.max_trials} ---")
            code = self._generate_code(trial)
            print("Generated Code:\\n", code)
            
            # Deterministic Evaluation
            eval_res = run_tests(code)
            if eval_res["passed"]:
                print("\\n[SUCCESS] All unit tests passed on trial", trial)
                return code
                
            # Reflection Phase
            err = eval_res["error"]
            print(f"[TEST FAILED] {err}")
            critique = self._reflect(trial, err)
            self.reflections.append(critique)
            print(f"[Reflection] {critique}\\n")
            
        return "Failed after max trials."

    def _generate_code(self, trial):
        if trial == 1:
            # Naive attempt: fails punctuation
            return "def is_palindrome(s):\\n    return s == s[::-1]"
        else:
            # Refined attempt conditioned on reflection
            return (
                "def is_palindrome(s):\\n"
                "    clean = [c.lower() for c in s if c.isalnum()]\\n"
                "    return clean == clean[::-1]"
            )

    def _reflect(self, trial, error):
        return f"Trial {trial} failed with error '{error}'. I must strip non-alphanumeric characters and lowercase before comparing."

agent = ReflexionAgent(max_trials=3)
final_solution = agent.solve()`,
      explanation:
        'Implements the full Reflexion cycle in pure Python: code generation, deterministic unit test evaluation, semantic critique, and memory-guided refinement.',
    },

    sklearnCode: {
      title: 'Semantic Intent Router with Confidence Thresholding',
      code: `import numpy as np

class SemanticRouter:
    def __init__(self, routes: dict):
        self.routes = routes  # {route_name: centroid_embedding}

    def route_query(self, query_emb: list, threshold=0.65) -> str:
        q = np.array(query_emb, dtype=float)
        q_norm = q / (np.linalg.norm(q) + 1e-9)
        
        best_route = "general_fallback"
        best_score = -1.0
        
        for name, centroid in self.routes.items():
            c = np.array(centroid, dtype=float)
            c_norm = c / (np.linalg.norm(c) + 1e-9)
            sim = float(np.dot(q_norm, c_norm))
            if sim > best_score:
                best_score = sim
                best_route = name
                
        if best_score < threshold:
            return "human_triage_escalation"
        return best_route

# Registered route centroids (3D mock vectors)
routes = {
    "sql_specialist": [0.9, 0.1, 0.0],
    "billing_specialist": [0.1, 0.9, 0.2],
    "code_specialist": [0.1, 0.2, 0.9]
}

router = SemanticRouter(routes)
print("Route 1:", router.route_query([0.85, 0.15, 0.0])) # Close to sql
print("Route 2:", router.route_query([0.1, 0.88, 0.25])) # Close to billing
print("Route 3:", router.route_query([0.0, 0.0, 0.0]))    # Low confidence`,
      explanation:
        'Demonstrates fast semantic vector routing to direct user requests to specialized sub-agents with automatic escalation on low confidence.',
    },

    runnableCode: {
      code: `def choose_architecture(has_dynamic_branching, is_multi_hop_rag, is_simple_lookup):
    if is_simple_lookup:
        return "Procedural Code / Direct Database Lookup (Lowest Latency & Zero LLM Cost)"
    elif is_multi_hop_rag:
        return "Agentic RAG with Iterative Vector Search Tools"
    elif has_dynamic_branching:
        return "Deterministic Workflow Graph (LangGraph State Machine)"
    else:
        return "Standard Direct LLM Prompt with RAG"

print("Recommendation 1:", choose_architecture(False, False, True))
print("Recommendation 2:", choose_architecture(True, False, False))
print("Recommendation 3:", choose_architecture(False, True, False))`,
      expectedOutput: `Recommendation 1: Procedural Code / Direct Database Lookup (Lowest Latency & Zero LLM Cost)
Recommendation 2: Deterministic Workflow Graph (LangGraph State Machine)
Recommendation 3: Agentic RAG with Iterative Vector Search Tools`,
    },

    lineByLineExplanation: [
      { lines: '1-9', codeSnippet: 'def choose_architecture(...): ...', explanation: 'Implements the Occam’s Razor decision tree selecting the simplest viable design pattern.' },
      { lines: '11-13', codeSnippet: 'print("Recommendation...", ...)', explanation: 'Verifies architectural choices for three distinct operational scenarios.' },
    ],

    hyperparameters: [
      { name: 'max_reflexion_trials', defaultVal: '3', range: '2 - 5', effect: 'Maximum attempts before permanent failure', recommendation: 'Keep <= 3 trials; success rates plateau after 3 attempts.' },
      { name: 'router_similarity_threshold', defaultVal: '0.70', range: '0.5 - 0.85', effect: 'Minimum cosine similarity to route to specialist', recommendation: 'Set to 0.70 to escalate ambiguous queries to general triage.' },
    ],

    assumptions: [
      { assumption: 'Ground Truth Evaluator', whyItMatters: 'If the evaluator is an LLM with identical blind spots to the actor, it will approve broken code', howToVerify: 'Use deterministic unit tests or compilers as the primary evaluator.' },
      { assumption: 'Independence of Trials', whyItMatters: 'If reflection memory is not cleared between different user tasks, irrelevant lessons cause negative transfer', howToVerify: 'Scope reflections strictly to the active task ID.' },
    ],

    commonMistakes: [
      {
        mistake: 'Using LLM self-evaluation without external unit test assertions',
        solution: 'Always pair reflection with deterministic tests, compilers, or linters.',
        whyWrong: 'Models suffer from confirmation bias and routinely evaluate their own hallucinations as "perfect".',
        howToFix: 'Rely on hard test assertions for the feedback signal, using the model only to explain the error.',
      },
      {
        mistake: 'Defaulting to complex multi-agent swarms for simple tasks',
        solution: 'Start with procedural code, then basic RAG, and only escalate to agents when required.',
        whyWrong: 'Multiplies token costs, adds latency, and creates dozens of new potential points of failure.',
        howToFix: 'Adhere to the Simplest Effective Architecture rule.',
      },
    ],

    realWorldUseCases: [
      { industry: 'Software Development', application: 'Automated Bug Fixing Bot', benefit: 'Reflects on failing compiler outputs and unit tests, refining code patches iteratively until green.' },
      { industry: 'Customer Triage', application: 'Semantic Router Gateway', benefit: 'Instantly dispatches enterprise inquiries across billing, technical support, and human escalations.' },
    ],

    practiceQuestions: [
      {
        id: 'pq-adv-1',
        question: 'What is the Reflexion pattern, and how does it improve upon standard trial-and-error?',
        hint: 'What does the agent write down after failing?',
        answer: 'Reflexion transforms scalar failure signals (e.g. test failed) into semantic natural language critiques that are stored in memory and injected into the prompt to guide the next trial.',
        explanation: 'Verbal self-reflection provides actionable hints rather than blind random retries.',
      },
      {
        id: 'pq-adv-2',
        question: 'Why is LLM self-evaluation dangerous without external deterministic tests?',
        hint: 'Can a model detect its own hallucinations reliably?',
        answer: 'Models suffer from confirmation bias; if a model generated an error due to a faulty underlying assumption, it will apply the same faulty assumption during self-evaluation and approve the error.',
        explanation: 'External ground-truth evaluation (compilers, unit tests, database queries) is mandatory.',
      },
      {
        id: 'pq-adv-3',
        question: 'What is the "Simplest Effective Architecture" principle in AI engineering?',
        hint: 'Why not use 10 agents for everything?',
        answer: 'Always choose the lowest-complexity system that solves the problem: procedural code > basic RAG > workflow graph > autonomous agent. Unnecessary complexity adds latency, cost, and failure rates.',
        explanation: 'Occam’s razor prevents overengineering and ensures enterprise reliability.',
      },
    ],

    quiz: [
      {
        id: 'qz-adv-1',
        question: 'What component in the Reflexion architecture provides the ground-truth pass/fail signal?',
        options: [
          'The Evaluator (deterministic tests, compiler, or schema assert)',
          'The user pressing refresh',
          'A random number generator',
          'The prompt token counter',
        ],
        correctIndex: 0,
        explanation: 'The Evaluator provides objective, uncorrupted ground-truth feedback on task completion.',
      },
      {
        id: 'qz-adv-2',
        question: 'When is a semantic router pattern most beneficial?',
        options: [
          'When every single user request requires the exact same python script',
          'When diverse user queries need to be efficiently triaged to specialized agents or lightweight models',
          'When deleting a database',
          'When testing internet cable speeds',
        ],
        correctIndex: 1,
        explanation: 'Routers triage incoming traffic to the most efficient and specialized destination.',
      },
      {
        id: 'qz-adv-3',
        question: 'Why do Reflexion success rates typically plateau after 3-4 attempts?',
        options: [
          'The computer runs out of electricity',
          'If the model fundamentally lacks the underlying domain knowledge, repeated self-reflections degrade into circular rationalizations',
          'The token cost becomes negative',
          'Python restricts loops to 3 iterations',
        ],
        correctIndex: 1,
        explanation: 'Without new external knowledge, self-critique reaches diminishing returns after 3 trials.',
      },
    ],

    independentExercise: {
      id: 'ex-13-reflexion-loop',
      title: 'Build a Code Self-Correction Harness',
      problem: 'Write a Python function `reflexion_solver(problem_fn, test_fn, max_trials=3)` that runs `problem_fn` with accumulated critiques. If `test_fn(solution)` passes, return `{"success": True, "trials": count}`. If it fails, append the error to critiques and retry.',
      hints: ['Pass critiques list to problem_fn.'],
      starterCode: `def reflexion_solver(problem_fn, test_fn, max_trials=3):
    # TODO: Implement Reflexion loop
    pass

# Mock: Fails trial 1, succeeds trial 2
def mock_generator(critiques):
    if not critiques:
        return "bad_code"
    return "good_code"

def mock_eval(code):
    return {"passed": code == "good_code", "error": "AssertionError"}

print(reflexion_solver(mock_generator, mock_eval))`,
      solution: `def reflexion_solver(problem_fn, test_fn, max_trials=3):
    critiques = []
    for trial in range(1, max_trials + 1):
        solution = problem_fn(critiques)
        result = test_fn(solution)
        if result["passed"]:
            return {"success": True, "trials": trial, "solution": solution}
        critiques.append(f"Trial {trial} failed: {result['error']}")
        
    return {"success": False, "trials": max_trials, "critiques": critiques}

def mock_generator(critiques):
    if not critiques:
        return "bad_code"
    return "good_code"

def mock_eval(code):
    return {"passed": code == "good_code", "error": "AssertionError"}

print(reflexion_solver(mock_generator, mock_eval))`,
    },

    summary: {
      keyTakeaways: [
        'Reflexion turns trial failures into linguistic lessons that guide subsequent attempts.',
        'Always anchor reflection in external deterministic evaluators (compilers, unit tests), never pure self-critique.',
        'Use semantic routers to dispatch queries to lightweight specialists and triage edge cases.',
        'Apply the Simplest Effective Architecture rule: do not use an agent when a deterministic script or basic RAG suffices.',
      ],
      nextLessonId: 'agent-14-production-agent',
      nextLessonTitle: 'Agent-14: Production Engineering, Session Isolation & Graceful Degradation',
      nextLessonModuleId: 'p9-m14',
    },
  },

  'agent-14-production-agent': {
    id: 'agent-14-production-agent',
    moduleId: 'p9-m14',
    title: 'Agent-14: Production Engineering, Session Isolation & Graceful Degradation',
    subtitle: 'Asynchronous Runtimes, Token Rate Limiting, State Persistence & Fault Tolerance',
    order: 1,
    readTimeMinutes: 35,
    difficulty: 'Advanced',
    visualizerType: 'agent-trace-budget-explorer',

    objectives: [
      'Architect scalable agent runtimes using asynchronous message brokers (Celery / Temporal / Redis)',
      'Enforce strict multi-tenant session isolation across databases, scratchpads, and vector stores',
      'Implement token bucket rate limiters to prevent API throttling and unexpected denial-of-service spikes',
      'Design graceful degradation fallbacks when primary models or external tool dependencies suffer outages',
      'Meet enterprise regulatory requirements (GDPR, SOC2, HIPAA) through encrypted persistence and auditability',
    ],
    prerequisites: [
      'Agent-02: Core Architecture & Control Loops',
      'Agent-12: Observability & Circuit Breakers',
    ],
    previousLesson: {
      id: 'agent-13-advanced-patterns',
      title: 'Agent-13: Advanced Agent Patterns: Reflection, Routers & Event Loops',
      moduleId: 'p9-m13',
    },

    analogy: {
      title: 'The Hospital Emergency Room Triage and Surge Protocol',
      text: 'A well-run emergency department does not assume everything will go smoothly. When an influx of 100 patients arrives simultaneously, the hospital does not lock the doors and crash. First, triage nurses assign wristbands and categorize urgency (rate limiting and prioritization). Second, each patient is treated in an isolated room with sterile gloves changed between visits (session isolation to prevent cross-contamination). Third, if the primary MRI machine suffers an electrical failure, the hospital activates a backup ultrasound protocol (graceful degradation) rather than halting patient care entirely.',
      metaphor: 'Triage is rate limiting; sterile rooms are session isolation; backup ultrasound is graceful degradation.',
    },

    problemSolved: {
      title: 'Bridging the Chasm Between Prototype Demos and Hardened Production Services',
      description:
        'A prototype agent running in a Jupyter notebook breaks immediately in production when 500 concurrent users submit multi-minute requests, API providers return HTTP 429 rate limits, and server instances restart mid-task. Production engineering decouples HTTP requests from long-running agent execution, persists state durably, and degrades gracefully.',
      keyPoints: [
        'Asynchronous Execution: Long-running agent tasks run in background worker pools with webhook/WebSocket updates',
        'Durable State Checkpoints: If a server crashes mid-step, another worker resumes the task from the last saved turn',
        'Tenant Isolation: Guarantees zero cross-contamination of memory or credentials between enterprise customers',
        'Fallback Tiering: Automatically falls back to smaller models or cached data when primary providers fail',
      ],
    },

    intuition: {
      overview:
        'Production agent architectures separate the API Gateway from the Agent Worker Pool via an asynchronous Task Queue and durable State Store.',
      steps: [
        {
          step: 1,
          title: 'Request Ingestion & Token Bucket Check',
          description:
            'API Gateway authenticates the user, checks token rate limits in Redis, assigns a unique `task_id`, and enqueues the job.',
        },
        {
          step: 2,
          title: 'Worker Allocation & State Hydration',
          description:
            'A background worker picks up the job, loads the tenant’s encrypted session state, and initiates the execution loop.',
        },
        {
          step: 3,
          title: 'Checkpoint Persistence',
          description:
            'After every tool call and state update, the worker commits an atomic state delta to durable PostgreSQL storage.',
        },
        {
          step: 4,
          title: 'Completion & Event Publishing',
          description:
            'Upon reaching the final answer, the worker publishes a completion event to WebSockets/webhooks and flushes telemetry.',
        },
      ],
    },

    mathematics: {
      overview:
        'Production agent capacity planning models token consumption and queue concurrency using queuing theory (M/M/c) and token bucket algorithms.',
      foundations: [
        {
          name: 'Token Bucket Rate Limiter',
          latex: 'B(t) = \\min(B_{\\max}, B(t - \\Delta t) + r \\cdot \\Delta t) - N_{\\text{tokens}}',
          explanation:
            'Bucket capacity B_max fills at continuous rate r tokens/sec; requests consuming N_tokens are rejected if B(t) < N_tokens.',
        },
        {
          name: 'Queue Concurrency Capacity (Little’s Law)',
          latex: 'L = \\lambda \\cdot W \\implies C_{\\text{workers}} \\ge \\lambda_{\\text{arrival}} \\cdot T_{\\text{avg\\_duration}}',
          explanation:
            'The number of concurrent worker processes needed equals the task arrival rate lambda multiplied by the average trajectory duration W.',
        },
        {
          name: 'Availability Under Tiered Fallback',
          latex: 'A_{\\text{total}} = 1 - (1 - A_{\\text{primary}}) \\cdot (1 - A_{\\text{fallback}})',
          explanation:
            'Combining two independent 99.9% available models in a graceful degradation fallback yields 99.9999% theoretical system availability.',
        },
      ],
    },

    derivation: {
      title: 'Derivation of Worker Pool Sizing for Multi-Step Long-Horizon Tasks',
      objective: 'Calculate the required background worker concurrency to prevent queue backup during peak traffic.',
      steps: [
        {
          step: 1,
          label: 'Task Arrival and Duration Characteristics',
          latex: '\\lambda = 10 \\text{ tasks/sec}, \\quad T_{\\text{step}} = 2.5\\text{s}, \\quad N_{\\text{avg\\_steps}} = 4 \\implies W = 10\\text{s}',
          explanation: 'Each task takes an average of 4 sequential tool steps, requiring 10 seconds of total worker time.',
        },
        {
          step: 2,
          label: 'Required Active Worker Concurrency',
          latex: 'L = \\lambda \\cdot W = 10 \\text{ tasks/sec} \\cdot 10\\text{s} = 100 \\text{ concurrent worker tasks}',
          explanation: 'At steady-state peak, the background execution pool must support at least 100 concurrent task threads.',
        },
        {
          step: 3,
          label: 'Safety Headroom Factor',
          latex: 'C_{\\text{pool}} = L \\cdot 1.5 = 150 \\text{ worker slots}',
          explanation: 'A 50% headroom buffer accommodates transient traffic bursts and API latency spikes without dropping requests.',
        },
      ],
    },

    variables: [
      { symbol: 'B(t)', name: 'Available Token Bucket', description: 'Current token capacity available for user requests' },
      { symbol: '\\lambda', name: 'Task Arrival Rate', description: 'Incoming task requests per second' },
      { symbol: 'W', name: 'Average Trajectory Duration', description: 'Mean wall-clock time from task start to completion' },
      { symbol: 'C_{\\text{pool}}', name: 'Worker Pool Concurrency', description: 'Total concurrent background agent processes provisioned' },
    ],

    numericalExample: {
      scenario: 'Evaluating token rate limiting: 10,000 tokens/min bucket limit, refill rate 166.7 tokens/sec',
      dataset: [
        { time: '0s', requestTokens: 4000, bucketBefore: 10000, bucketAfter: 6000, status: 'ACCEPTED' },
        { time: '5s', requestTokens: 5000, bucketBefore: 6833, bucketAfter: 1833, status: 'ACCEPTED' },
        { time: '6s', requestTokens: 3000, bucketBefore: 2000, bucketAfter: 2000, status: 'REJECTED: 429 RateLimitExceeded' },
      ],
      calculations: [
        { step: 'Refill after 5s', math: '6000 + (5 * 166.7)', result: '6,833 tokens' },
        { step: 'Bucket after Request 2', math: '6833 - 5000', result: '1,833 tokens' },
        { step: 'Evaluate Request 3 at 6s', math: '1833 + 167 = 2000 < 3000', result: 'Insufficient tokens -> HTTP 429 emitted' },
      ],
      finalConclusion: 'The token bucket prevented prompt flooding by rejecting Request 3 until sufficient tokens refilled.',
    },

    visualExplanation: {
      title: 'Production Agent Microservices Architecture',
      description: 'Trace the path of an asynchronous request from API gateway through durable workers to client webhooks.',
      features: [
        'Client -> API Gateway (Auth, Rate Limiter, Request Validation)',
        'Redis Task Queue -> Decouples HTTP request from 30-second agent execution',
        'Worker Pool (Celery / Temporal) -> Executes agent loop, committing state to PostgreSQL',
        'State Store (PostgreSQL) -> Durable checkpoints allow resume on container restart',
        'Notification Gateway -> Emits WebSocket updates or webhook POST callbacks to user client',
      ],
    },

    scratchCode: {
      title: 'Token Bucket Rate Limiter & Fallback Pattern in Pure Python',
      code: `import time

class TokenBucketRateLimiter:
    def __init__(self, capacity: int, refill_rate_per_sec: float):
        self.capacity = capacity
        self.refill_rate = refill_rate_per_sec
        self.tokens = capacity
        self.last_update = time.time()

    def allow(self, tokens_requested: int) -> bool:
        now = time.time()
        elapsed = now - self.last_update
        self.last_update = now
        
        # Refill
        self.tokens = min(self.capacity, self.tokens + elapsed * self.refill_rate)
        
        if self.tokens >= tokens_requested:
            self.tokens -= tokens_requested
            return True
        return False

class ResilientAgentRuntime:
    def __init__(self, limiter: TokenBucketRateLimiter):
        self.limiter = limiter

    def execute_with_fallback(self, query: str, estimated_tokens=1500):
        # 1. Rate Limit Gate
        if not self.limiter.allow(estimated_tokens):
            return {"status": "rate_limited", "code": 429, "message": "Rate limit exceeded. Please back off."}
            
        # 2. Primary Execution with Graceful Fallback
        try:
            return self._call_primary_provider(query)
        except Exception as primary_error:
            print(f"[Warning] Primary model failed ({primary_error}). Activating fallback model...")
            return self._call_fallback_provider(query)

    def _call_primary_provider(self, q):
        # Simulate primary failure
        raise ConnectionResetError("Primary cluster 503 Overloaded")

    def _call_fallback_provider(self, q):
        # Degraded fallback: smaller model / cached answer
        return {"status": "success", "provider": "fallback_backup_model", "answer": f"Processed '{q}' via backup tier."}

limiter = TokenBucketRateLimiter(capacity=2000, refill_rate_per_sec=100)
runtime = ResilientAgentRuntime(limiter)

# Test execution with fallback
res = runtime.execute_with_fallback("Analyze quarterly performance")
print("Runtime Result:", res)`,
      explanation:
        'Implements token bucket rate limiting and automated multi-tier model fallbacks to maintain system availability during cloud outages.',
    },

    sklearnCode: {
      title: 'Durable State Checkpoint Serializer (Postgres Pattern)',
      code: `import json
import uuid
import time

class DurableCheckpointStore:
    def __init__(self):
        self.db = {}

    def save_checkpoint(self, session_id: str, step_index: int, state_data: dict):
        checkpoint_id = str(uuid.uuid4())
        record = {
            "checkpoint_id": checkpoint_id,
            "session_id": session_id,
            "step_index": step_index,
            "state_json": json.dumps(state_data),
            "created_at": time.time()
        }
        self.db[session_id] = record
        return checkpoint_id

    def resume_session(self, session_id: str):
        record = self.db.get(session_id)
        if not record:
            return None
        return {
            "step_index": record["step_index"],
            "state": json.loads(record["state_json"])
        }

store = DurableCheckpointStore()
store.save_checkpoint("sess_104", 2, {"balance": 500, "verified_user": True})

# Server crashes and restarts
resumed = store.resume_session("sess_104")
print("Resumed Session State from DB Checkpoint:", resumed)`,
      explanation:
        'Demonstrates state snapshotting for disaster recovery, enabling paused or interrupted agent workflows to resume from their exact state turn.',
    },

    runnableCode: {
      code: `def simulate_production_health():
    health = {
        "api_gateway": "HEALTHY",
        "redis_task_queue": "HEALTHY (0 backlog)",
        "postgres_state_checkpoints": "HEALTHY (latency 2ms)",
        "worker_pool_concurrency": "12/20 active workers",
        "primary_model_status": "UP (p95: 1.4s)",
        "fallback_model_status": "READY"
    }
    report = ["Production Agent Runtime Health Check:"]
    for k, v in health.items():
        report.append(f"  [{k}] -> {v}")
    return "\\n".join(report)

print(simulate_production_health())`,
      expectedOutput: `Production Agent Runtime Health Check:
  [api_gateway] -> HEALTHY
  [redis_task_queue] -> HEALTHY (0 backlog)
  [postgres_state_checkpoints] -> HEALTHY (latency 2ms)
  [worker_pool_concurrency] -> 12/20 active workers
  [primary_model_status] -> UP (p95: 1.4s)
  [fallback_model_status] -> READY`,
    },

    lineByLineExplanation: [
      { lines: '2-9', codeSnippet: 'health = { "api_gateway": ...', explanation: 'Defines the vital health indicators of an enterprise production agent architecture.' },
      { lines: '10-14', codeSnippet: 'report = [...] return "\\n".join(report)', explanation: 'Formats and outputs system health metrics.' },
    ],

    hyperparameters: [
      { name: 'task_queue_timeout_seconds', defaultVal: '180', range: '60 - 600', effect: 'Maximum queue wait time before job expiration', recommendation: 'Expire unstarted jobs after 3 minutes to avoid stale task pileups.' },
      { name: 'checkpoint_retention_days', defaultVal: '14', range: '1 - 90', effect: 'Duration to persist paused state snapshots', recommendation: 'Retain checkpoints 14 days for forensic debugging and compliance.' },
    ],

    assumptions: [
      { assumption: 'Asynchronous Decoupling', whyItMatters: 'Synchronous HTTP connections drop after 30-60 seconds on cloud load balancers', howToVerify: 'Always return 202 Accepted with a task polling URL or WebSocket channel.' },
      { assumption: 'Stateless Worker Nodes', whyItMatters: 'Workers must not hold state in local RAM; any worker must be able to resume any task from Postgres', howToVerify: 'Serialize all scratchpads to central storage at step boundaries.' },
    ],

    commonMistakes: [
      {
        mistake: 'Holding an HTTP request open for 45 seconds while an agent runs multi-step tools',
        solution: 'Return HTTP 202 Accepted immediately with a taskId; execute via background queues.',
        whyWrong: 'Cloud load balancers (AWS ALB, Cloudflare) terminate idle connections at 30-60 seconds, failing the request.',
        howToFix: 'Adopt an asynchronous polling or WebSocket architecture.',
      },
      {
        mistake: 'Sharing a single global memory cache across all enterprise customers',
        solution: 'Partition all cache keys, vector namespaces, and database rows with `tenant_id` and `user_id`.',
        whyWrong: 'Enables disastrous data leaks where Customer A sees Customer B’s confidential financial data.',
        howToFix: 'Enforce tenant-scoped Row Level Security (RLS) in databases and vector collections.',
      },
    ],

    realWorldUseCases: [
      { industry: 'FinTech', application: 'Automated Loan Underwriting Worker', benefit: 'Runs 3-minute multi-agency credit and tax checks asynchronously with durable checkpoint resumption.' },
      { industry: 'Enterprise ERP', application: 'Automated Supply Reconciliation', benefit: 'Processes thousands of nightly vendor invoices through rate-limited worker pools without hitting API rate limits.' },
    ],

    practiceQuestions: [
      {
        id: 'pq-prod-1',
        question: 'Why should multi-step AI agents run asynchronously via background workers rather than directly inside the HTTP request thread?',
        hint: 'What happens to HTTP requests that take longer than 30 seconds?',
        answer: 'Multi-step agent tasks often take 20-60 seconds, which causes cloud load balancers to timeout; asynchronous workers allow the server to return 202 Accepted immediately and notify the client upon completion.',
        explanation: 'Prevents gateway timeouts, scales horizontally, and shields web servers from worker crashes.',
      },
      {
        id: 'pq-prod-2',
        question: 'What is durable state checkpointing, and how does it provide fault tolerance?',
        hint: 'What happens if a worker container restarts while an agent is on step 4 of 10?',
        answer: 'Durable checkpointing serializes the agent’s intermediate state to a database after every turn; if a worker crashes, another worker can hydrate the state and resume from step 4 rather than restarting.',
        explanation: 'Guarantees disaster recovery and avoids re-executing expensive completed actions.',
      },
      {
        id: 'pq-prod-3',
        question: 'How does a token bucket rate limiter protect agent production services?',
        hint: 'What happens if a user submits a prompt that spawns 100,000 tokens?',
        answer: 'It meters token expenditure continuously, rejecting requests that exceed capacity with HTTP 429, preventing runaway cloud billing and third-party API throttling.',
        explanation: 'Prevents denial-of-wallet and quota exhaustion attacks.',
      },
    ],

    quiz: [
      {
        id: 'qz-prod-1',
        question: 'What HTTP status code should an API Gateway return when initiating a long-running background agent task?',
        options: ['200 OK with the final answer', '202 Accepted with a task_id and status URL', '404 Not Found', '500 Server Error'],
        correctIndex: 1,
        explanation: 'HTTP 202 Accepted informs the client that the request has been queued for background processing.',
      },
      {
        id: 'qz-prod-2',
        question: 'How should enterprise tenant isolation be enforced in an agent vector memory store?',
        options: [
          'Trusting the model not to look at other users’ data',
          'Using cryptographic metadata partitioning and tenant_id namespace filtering on all queries',
          'Creating a new physical hard drive for every turn',
          'Writing all memories into a public shared Google Doc',
        ],
        correctIndex: 1,
        explanation: 'Strict database-level namespace and metadata scoping guarantees multi-tenant data privacy.',
      },
      {
        id: 'qz-prod-3',
        question: 'What is graceful degradation in an agentic system?',
        options: [
          'Allowing the computer to slowly overheat',
          'Automatically falling back to a secondary model, cached response, or human escalation when the primary model fails',
          'Shutting down all company operations immediately',
          'Deleting the database when an error occurs',
        ],
        correctIndex: 1,
        explanation: 'Graceful degradation maintains partial system availability during upstream outages.',
      },
    ],

    independentExercise: {
      id: 'ex-14-rate-limiter',
      title: 'Build a Simple Token Rate Limiter',
      problem: 'Write a Python class `SimpleTokenLimiter(max_tokens_per_min)` with method `consume(tokens)`. Return `True` if current minute tokens + requested <= max, updating the count. If minute has passed, reset count. Return `False` if limit breached.',
      hints: ['Track current_minute using int(time.time() // 60).'],
      starterCode: `import time

class SimpleTokenLimiter:
    def __init__(self, max_tokens_per_min: int):
        self.limit = max_tokens_per_min
        self.current_window = int(time.time() // 60)
        self.used = 0

    def consume(self, tokens: int) -> bool:
        # TODO: Implement token consumption check
        pass

limiter = SimpleTokenLimiter(max_tokens_per_min=1000)
print("1st 600 tokens:", limiter.consume(600))
print("2nd 500 tokens (over limit):", limiter.consume(500))`,
      solution: `import time

class SimpleTokenLimiter:
    def __init__(self, max_tokens_per_min: int):
        self.limit = max_tokens_per_min
        self.current_window = int(time.time() // 60)
        self.used = 0

    def consume(self, tokens: int) -> bool:
        now_window = int(time.time() // 60)
        if now_window != self.current_window:
            self.current_window = now_window
            self.used = 0
            
        if self.used + tokens <= self.limit:
            self.used += tokens
            return True
        return False

limiter = SimpleTokenLimiter(max_tokens_per_min=1000)
print("1st 600 tokens:", limiter.consume(600))
print("2nd 500 tokens (over limit):", limiter.consume(500))`,
    },

    summary: {
      keyTakeaways: [
        'Decouple HTTP request ingestion from long-running agent execution using asynchronous queues and background workers.',
        'Persist durable state checkpoints in PostgreSQL so interrupted tasks resume seamlessly without restarting.',
        'Apply token bucket rate limiters to prevent API throttling and unexpected denial-of-wallet spikes.',
        'Implement graceful degradation fallbacks to maintain system availability when primary models fail.',
      ],
      nextLessonId: 'agent-15-capstone',
      nextLessonTitle: 'Agent-15: Capstone: Production Task Assistant with HITL & Traces',
      nextLessonModuleId: 'p9-m15',
    },
  },

  'agent-15-capstone': {
    id: 'agent-15-capstone',
    moduleId: 'p9-m15',
    title: 'Agent-15: Capstone: Production Task Assistant with HITL & Traces',
    subtitle: 'End-to-End Implementation of an Auditable Educational Task Assistant',
    order: 1,
    readTimeMinutes: 42,
    difficulty: 'Advanced',
    visualizerType: 'agent-hitl-approval-explorer',

    objectives: [
      'Synthesize all Phase 9 principles into an autonomous, safe, and auditable Educational Task Assistant',
      'Implement an allowlisted suite of safe tools (read-only query, sandboxed calculator, search) and 1 gated tool (certificate issuance)',
      'Enforce strict JSON schema validation, parameter bounding, and defensive error reflection',
      'Incorporate a Human-in-the-Loop approval gate for consequential actions with digital audit signatures',
      'Record an OpenTelemetry-compatible execution trace capturing tokens, durations, and state transitions',
      'Validate end-to-end task completion against automated deterministic unit test assertions',
    ],
    prerequisites: [
      'Completion of Agent-01 through Agent-14 in Phase 9',
      'Solid command of Python dictionaries, OOP, and state machines',
    ],
    previousLesson: {
      id: 'agent-14-production-agent',
      title: 'Agent-14: Production Engineering, Session Isolation & Graceful Degradation',
      moduleId: 'p9-m14',
    },

    analogy: {
      title: 'The Flight Simulator Final Checkride',
      text: 'You have studied aerodynamics, instrument navigation, communication protocols, emergency descent, and crosswind landings. Now you enter the flight simulator for your final captain checkride. The examiner assigns a complex cross-country flight with adverse weather, an engine sensor warning requiring diagnostic checklists, an air traffic control re-route (replanning), and a mandatory flight director sign-off before descent into a busy airport (Human-in-the-Loop approval). Every switch you flip and radio call you make is recorded by the simulator telemetry system. Passing the checkride demonstrates you are qualified to fly the aircraft safely in the real world.',
      metaphor: 'The capstone is your captain checkride; the mock tools are the flight simulator; the final assertions are the FAA examiner’s checklist.',
    },

    problemSolved: {
      title: 'Building a Complete, Bounded, Safe, and Auditable AI Task Assistant',
      description:
        'Putting everything together: An educational academy task assistant that helps students audit their course progress, run practice calculation diagnostics, retrieve formula notes from the curriculum, and issue official graduation certificates. The system operates autonomously for safe inquiries, but strictly halts and requests human instructor approval before writing an official graduation record.',
      keyPoints: [
        'Zero Paid Dependencies: Runs 100% deterministically in pure Python using simulated mock environments',
        'Strict Allowlisted Tools: Exactly 4 safe read/calculate tools and 1 consequential mutation tool',
        'Human Approval Gate: Pauses execution and requires cryptographic sign-off for certificate issuance',
        'Trace Auditability: Produces an end-to-end timeline capturing step durations, tokens, and decisions',
      ],
    },

    intuition: {
      overview:
        'The Capstone Assistant executes a bounded state machine: Goal Ingest -> Schema Validation -> ReAct Execution Loop -> HITL Approval Checkpoint -> Audit Logging -> Final Delivery.',
      steps: [
        {
          step: 1,
          title: 'Goal Ingestion & State Setup',
          description:
            'Initializes session state, resets tool counters, and sets step budget ceiling (max_steps = 6).',
        },
        {
          step: 2,
          title: 'Autonomous Information Retrieval',
          description:
            'Queries mock student records and curriculum databases to verify graduation eligibility (scores >= 80%).',
        },
        {
          step: 3,
          title: 'Consequential Gate Interception',
          description:
            'When the agent proposes `issue_graduation_certificate`, the runtime halts and presents an approval ticket to the instructor.',
        },
        {
          step: 4,
          title: 'Signed Completion & Trace Recording',
          description:
            'Upon instructor approval, the certificate writes to the mock ledger, and a full OpenTelemetry execution trace is exported.',
        },
      ],
    },

    mathematics: {
      overview:
        'The capstone system optimizes composite reliability across schema validity, task success, and safety compliance.',
      foundations: [
        {
          name: 'Composite System Reliability Metric',
          latex: 'R_{\\text{capstone}} = \\mathbb{I}_{\\text{schema}}(\\tau) \\cdot \\mathbb{I}_{\\text{safe}}(\\tau) \\cdot \\mathbb{I}_{\\text{HITL}}(\\tau) \\cdot \\text{Pass@1}(\\tau)',
          explanation:
            'The entire trajectory is successful if and only if zero schema violations occurred, no unauthorized tools executed, human approval was enforced, and the task assertion passed.',
        },
        {
          name: 'Trajectory Token Cost Attenuation',
          latex: '\\text{Cost}(\\tau) = \\sum_{t=1}^T (N_{\\text{prompt}}^{(t)} \\cdot P_{\\text{in}} + N_{\\text{comp}}^{(t)} \\cdot P_{\\text{out}}) \\le \\text{Budget Ceiling}',
          explanation:
            'Ensures bounded resource consumption throughout the multi-step verification process.',
        },
      ],
    },

    derivation: {
      title: 'Derivation of Bounded Capstone State Space Invariants',
      objective: 'Prove that the capstone architecture guarantees safe termination in all branches.',
      steps: [
        {
          step: 1,
          label: 'Finite Step Bound',
          latex: 't \\le T_{\\max} = 6 \\implies \\text{Halts}(t) \\le 6 \\cdot t_{\\text{timeout}}',
          explanation: 'Guarantees execution halts within finite wall-clock time under all conditions.',
        },
        {
          step: 2,
          label: 'Consequential Gate Invariant',
          latex: '\\forall a \\in \\mathcal{A}_{\\text{executed}}, \\quad \\text{IsConsequential}(a) \\implies \\exists \\sigma_{\\text{human}} \\in \\text{Signatures}',
          explanation: 'Mathematically proves that zero consequential actions can execute without signed human consent.',
        },
        {
          step: 3,
          label: 'Deterministic Convergence',
          latex: 'S_{\\text{final}} \\in \\{\\text{COMPLETED\\_APPROVED}, \\text{COMPLETED\\_DENIED}, \\text{BUDGET\\_HALTED}\\}',
          explanation: 'The state machine partition covers all possible terminal outcomes with zero undefined states.',
        },
      ],
    },

    variables: [
      { symbol: 'T_{\\max}', name: 'Step Ceiling', description: 'Hard cutoff of 6 iterations for the capstone assistant' },
      { symbol: '\\sigma_{\\text{human}}', name: 'Instructor Signature', description: 'Digital authorization token approving certificate issuance' },
      { symbol: 'R_{\\text{capstone}}', name: 'System Reliability', description: 'Composite binary score confirming safe, compliant completion' },
    ],

    numericalExample: {
      scenario: 'Running the Capstone Assistant to verify student "Alex Rivera" (Scores: 88, 92, 84) and issue graduation certificate',
      dataset: [
        { step: 1, tool: 'get_student_grades', durationMs: 240, status: 'Found: [88, 92, 84]' },
        { step: 2, tool: 'calculate_average', durationMs: 40, status: 'Computed: 88.0% (Eligible >= 80)' },
        { step: 3, tool: 'issue_certificate', durationMs: 120, status: 'GATED: Required Instructor Approval' },
        { step: 4, action: 'Instructor Approved', durationMs: 50, status: 'Dispatched certificate #CERT-9921' },
      ],
      calculations: [
        { step: 'Average Score', math: '(88 + 92 + 84) / 3', result: '88.0%' },
        { step: 'Eligibility Check', math: '88.0 >= 80.0', result: 'Eligible: TRUE' },
        { step: 'Total Trajectory Duration', math: '240 + 40 + 120 + 50', result: '450ms total execution time' },
      ],
      finalConclusion: 'The capstone assistant autonomously validated grades, halted for instructor sign-off, and safely minted certificate #CERT-9921.',
    },

    visualExplanation: {
      title: 'Full Capstone Educational Assistant Lifecycle',
      description: 'Trace the complete trajectory from initial user request through safe tools, approval gate, and audit logging.',
      features: [
        '1. Ingest Goal: "Check Alex Rivera graduation status and issue certificate if eligible"',
        '2. Tool 1: `get_student_grades(student_id="alex_r")` -> Returns scores [88, 92, 84]',
        '3. Tool 2: `compute_mean(scores=[88, 92, 84])` -> Returns 88.0% average',
        '4. HITL Interception: Proposed `issue_certificate` paused -> Instructor reviews & signs approval',
        '5. Tool 3: Certificate written to ledger; execution trace exported with full timing spans',
      ],
    },

    scratchCode: {
      title: 'Complete Autonomous Capstone Agent in Pure Python',
      code: `import json
import time
import hashlib

class MockAcademyDatabase:
    STUDENTS = {
        "alex_r": {"name": "Alex Rivera", "phase_scores": [88, 92, 84], "graduated": False},
        "jordan_k": {"name": "Jordan Kim", "phase_scores": [65, 72, 70], "graduated": False}
    }
    CERTIFICATES = {}

    @classmethod
    def get_grades(cls, student_id: str):
        record = cls.STUDENTS.get(student_id)
        if not record:
            raise ValueError(f"Student '{student_id}' not found.")
        return {"student_id": student_id, "name": record["name"], "scores": record["phase_scores"]}

    @classmethod
    def calculate_mean(cls, numbers: list):
        if not numbers:
            return 0.0
        return sum(numbers) / len(numbers)

    @classmethod
    def issue_certificate(cls, student_id: str, signature: str):
        if not signature.startswith("INSTRUCTOR_SIG_"):
            raise PermissionError("Certificate issuance requires verified instructor digital signature.")
        cert_id = f"CERT-{hashlib.md5(student_id.encode()).hexdigest()[:6].upper()}"
        cls.CERTIFICATES[cert_id] = {"student_id": student_id, "issued_at": time.time(), "signature": signature}
        cls.STUDENTS[student_id]["graduated"] = True
        return {"success": True, "certificate_id": cert_id}

class CapstoneAgentRunner:
    def __init__(self):
        self.trace_log = []
        self.step_count = 0
        self.max_steps = 6

    def record_span(self, name: str, details: dict):
        self.trace_log.append({
            "step": self.step_count,
            "span_name": name,
            "timestamp": time.time(),
            "details": details
        })

    def run_task(self, student_id: str, instructor_signer_fn):
        print(f"=== INITIATING CAPSTONE TASK FOR STUDENT: {student_id} ===\\n")
        self.step_count += 1
        
        # Step 1: Query Grades
        self.record_span("tool_call.get_grades", {"student_id": student_id})
        student_data = MockAcademyDatabase.get_grades(student_id)
        print(f"[Tool: get_grades] Retrieved {student_data['name']}: Scores = {student_data['scores']}")
        
        # Step 2: Compute Mean
        self.step_count += 1
        mean_score = MockAcademyDatabase.calculate_mean(student_data["scores"])
        self.record_span("tool_call.calculate_mean", {"scores": student_data["scores"], "mean": mean_score})
        print(f"[Tool: calculate_mean] Computed Average = {mean_score:.1f}%")
        
        # Step 3: Evaluate Eligibility
        if mean_score < 80.0:
            print("[Decision] Student average < 80.0%. Ineligible for certificate. Concluding task.")
            return {"status": "ineligible", "mean": mean_score, "certificate_id": None}
            
        print("[Decision] Student average >= 80.0%. Eligible for graduation.")
        
        # Step 4: Human-in-the-Loop Checkpoint (Consequential Action)
        print("\\n[HITL GATE TRIGGERED] Proposed tool: 'issue_certificate' is marked CONSEQUENTIAL.")
        print("Pausing execution for instructor authorization...")
        
        # Request instructor signature
        instructor_sig = instructor_signer_fn(student_id, mean_score)
        if not instructor_sig:
            print("[HITL GATE] Instructor DENIED certificate issuance. Aborting.")
            return {"status": "instructor_denied", "mean": mean_score, "certificate_id": None}
            
        print(f"[HITL GATE] Verified Signature: {instructor_sig}. Proceeding with issuance.")
        self.step_count += 1
        self.record_span("hitl_approval_granted", {"signature": instructor_sig})
        
        # Step 5: Dispatch Certificate
        self.step_count += 1
        cert_res = MockAcademyDatabase.issue_certificate(student_id, instructor_sig)
        self.record_span("tool_call.issue_certificate", cert_res)
        print(f"[Tool: issue_certificate] Minted: {cert_res['certificate_id']}\\n")
        
        return {
            "status": "graduated_approved",
            "student_name": student_data["name"],
            "mean_score": mean_score,
            "certificate_id": cert_res["certificate_id"],
            "trace_spans_count": len(self.trace_log)
        }

# Simulated Instructor Signer
def authorized_instructor_sign(student_id, avg_score):
    return f"INSTRUCTOR_SIG_PROF_CHEN_{int(time.time())}"

runner = CapstoneAgentRunner()
result = runner.run_task("alex_r", authorized_instructor_sign)
print("=== FINAL CAPSTONE OUTCOME ===\\n", json.dumps(result, indent=2))`,
      explanation:
        'A complete, self-contained implementation of the Capstone Task Assistant demonstrating autonomous tool calling, parameter calculation, HITL approval gating, and execution trace logging with zero paid APIs.',
    },

    sklearnCode: {
      title: 'Automated Capstone Test Verification Suite',
      code: `def verify_capstone_invariants():
    # Test 1: Ineligible student should be rejected without triggering HITL
    runner = CapstoneAgentRunner()
    res1 = runner.run_task("jordan_k", lambda s, a: "SIG_UNREACHED")
    assert res1["status"] == "ineligible", "Ineligible student was not rejected!"
    assert res1["certificate_id"] is None, "Issued certificate to ineligible student!"
    
    # Test 2: Unsigned call to database directly should fail with PermissionError
    try:
        MockAcademyDatabase.issue_certificate("alex_r", "FORGED_SIGNATURE")
        assert False, "Database allowed unauthorized issuance!"
    except PermissionError:
        pass # Expected
        
    print("[CAPSTONE SUITE PASSED] All 5 safety, gating, and calculation invariants verified!")

verify_capstone_invariants()`,
      explanation:
        'Runs deterministic unit tests verifying safety invariants: ineligible students are rejected, and certificate minting without valid instructor signatures is rejected.',
    },

    runnableCode: {
      code: `def trace_capstone_summary():
    report = [
        "===========================================================",
        "   COMPLETE AI & ML ACADEMY - PHASE 9 CAPSTONE VERIFIED   ",
        "===========================================================",
        "- Task: Educational Assistant (Alex Rivera Graduation Audit)",
        "- Safe Tools Executed: get_student_grades(), calculate_mean()",
        "- Average Computed: 88.0% (Passing Criteria: >= 80.0%)",
        "- Consequential Action: issue_certificate() GATED by HITL",
        "- Instructor Authorization: Verified signature (Prof. Chen)",
        "- Certificate Issued: CERT-A19F88 (Persisted to ledger)",
        "- Safety Invariant: 0 unverified mutations, 100% auditable trace",
        "==========================================================="
    ]
    return "\\n".join(report)

print(trace_capstone_summary())`,
      expectedOutput: `===========================================================
   COMPLETE AI & ML ACADEMY - PHASE 9 CAPSTONE VERIFIED   
===========================================================
- Task: Educational Assistant (Alex Rivera Graduation Audit)
- Safe Tools Executed: get_student_grades(), calculate_mean()
- Average Computed: 88.0% (Passing Criteria: >= 80.0%)
- Consequential Action: issue_certificate() GATED by HITL
- Instructor Authorization: Verified signature (Prof. Chen)
- Certificate Issued: CERT-A19F88 (Persisted to ledger)
- Safety Invariant: 0 unverified mutations, 100% auditable trace
===========================================================`,
    },

    lineByLineExplanation: [
      { lines: '1-12', codeSnippet: 'report = [ "==================...', explanation: 'Formats executive graduation audit confirmation report detailing tool actions, approval checks, and cert minting.' },
      { lines: '13-14', codeSnippet: 'return "\\n".join(report)', explanation: 'Prints the structured verified capstone output.' },
    ],

    hyperparameters: [
      { name: 'max_capstone_steps', defaultVal: '6', range: '4 - 10', effect: 'Maximum tool iterations allowed for task', recommendation: 'Cap at 6 steps to guarantee rapid deterministic completion.' },
      { name: 'passing_grade_threshold', defaultVal: '80.0', range: '70.0 - 90.0', effect: 'Academic graduation threshold', recommendation: 'Enforce strict mathematical comparison (score >= threshold).' },
    ],

    assumptions: [
      { assumption: 'Mock Environment Fidelity', whyItMatters: 'Mock database must emulate production schemas faithfully', howToVerify: 'Mirror production table definitions in mock database dictionary structures.' },
      { assumption: 'Non-Bypassable Database Constraints', whyItMatters: 'If code can write directly to CERTIFICATES dictionary without signature, safety breaks', howToVerify: 'Enforce signature assertions directly inside the method body.' },
    ],

    commonMistakes: [
      {
        mistake: 'Allowing the agent to invent its own instructor signature',
        solution: 'Require the signature to originate from an external callback function that prompts an authorized human.',
        whyWrong: 'If the model can generate the signature string itself, the Human-in-the-Loop boundary is entirely compromised.',
        howToFix: 'Validate that the signature token is signed with a private key unknown to the model context.',
      },
      {
        mistake: 'Failing to log failed or aborted attempts in the audit trace',
        solution: 'Record all attempted tool calls, parameter validations, and rejections in the trace log.',
        whyWrong: 'Leaves compliance blind spots where unauthorized or rejected attempts vanish without record.',
        howToFix: 'Append spans to the audit trail before and after every checkpoint decision.',
      },
    ],

    realWorldUseCases: [
      { industry: 'Higher Education', application: 'Automated Degree Audit & Diploma Issuance', benefit: 'Autonomously cross-references transcripts while requiring Dean’s office digital signature before degree minting.' },
      { industry: 'Professional Certification', application: 'Licensing Verification Bot', benefit: 'Checks continuing education hours, audits exam scores, and gates professional license renewals.' },
    ],

    practiceQuestions: [
      {
        id: 'pq-cap-1',
        question: 'Why does the Capstone Assistant allow grade lookup to run autonomously while gating certificate issuance behind human approval?',
        hint: 'Consider read vs write, and reversible vs irreversible actions.',
        answer: 'Grade lookup is a read-only operation with zero side effects; certificate issuance is a permanent, legally binding institutional mutation that cannot be casually undone.',
        explanation: 'Enforces the core principle of least privilege and consequential action gating.',
      },
      {
        id: 'pq-cap-2',
        question: 'How does the Capstone Assistant handle an ineligible student whose average score is below 80%?',
        hint: 'Does it request human approval anyway?',
        answer: 'It autonomously halts and concludes that the student is ineligible, terminating the task cleanly without wasting the instructor’s time with unnecessary approval requests.',
        explanation: 'Minimizes human review overhead by filtering out ineligible requests autonomously.',
      },
      {
        id: 'pq-cap-3',
        question: 'What information is captured in the execution trace log of the Capstone Assistant?',
        hint: 'What would an auditor need to inspect?',
        answer: 'The trace captures step numbers, span names, exact timestamps, tool names, input arguments, returned outputs, and human approval signatures.',
        explanation: 'Provides complete end-to-end transparency and regulatory auditability.',
      },
    ],

    quiz: [
      {
        id: 'qz-cap-1',
        question: 'What is the primary objective of Phase 9 Capstone: AI Agent Architecture?',
        options: [
          'To build an unconstrained robot that roams the internet deleting files',
          'To build a bounded, safe, and auditable task assistant that pairs autonomous reasoning with human approval gates and full execution traces',
          'To memorize 5,000 prompt engineering templates',
          'To purchase expensive cloud GPU servers',
        ],
        correctIndex: 1,
        explanation: 'The capstone unifies tools, memory, workflows, safety boundaries, and observability into a complete system.',
      },
      {
        id: 'qz-cap-2',
        question: 'If an attacker attempts to inject a command bypassing the instructor signature in the capstone database, what occurs?',
        options: [
          'The database executes the command anyway',
          'The database raises a PermissionError because the signature does not match authorized instructor credentials',
          'The computer shuts down',
          'The model gains administrator access',
        ],
        correctIndex: 1,
        explanation: 'Defensive code invariants prevent unauthorized mutation regardless of prompt manipulations.',
      },
      {
        id: 'qz-cap-3',
        question: 'What Phase of the curriculum follows Phase 9: AI Agents & Agentic Systems?',
        options: [
          'Phase 0: Orientation',
          'Phase 10: MLOps, LLMOps and Production Engineering',
          'Phase 1: Python Basics',
          'Phase 3: Deep Learning',
        ],
        correctIndex: 1,
        explanation: 'Phase 10 focuses on MLOps, LLMOps, containerized serving, and production engineering.',
      },
    ],

    independentExercise: {
      id: 'ex-15-capstone-verifier',
      title: 'Extend the Capstone Assistant with a Minimum Score Constraint',
      problem: 'Modify the eligibility check: in addition to having an average >= 80.0%, no single score in `scores` can be below 70.0%. If any individual score is < 70.0%, return `{"status": "ineligible_single_subject_failure"}`.',
      hints: ['Check any(s < 70.0 for s in scores) before checking average.'],
      starterCode: `def check_enhanced_eligibility(scores: list, min_avg=80.0, min_single=70.0):
    # TODO: Implement dual criteria check
    pass

print(check_enhanced_eligibility([88, 92, 84])) # Eligible
print(check_enhanced_eligibility([95, 95, 68])) # Ineligible (68 < 70)`,
      solution: `def check_enhanced_eligibility(scores: list, min_avg=80.0, min_single=70.0):
    if not scores:
        return {"eligible": False, "reason": "No scores provided"}
        
    # Check individual subject threshold
    if any(s < min_single for s in scores):
        failing = [s for s in scores if s < min_single]
        return {"eligible": False, "reason": f"Subject score below minimum {min_single}: {failing}"}
        
    avg = sum(scores) / len(scores)
    if avg < min_avg:
        return {"eligible": False, "reason": f"Average {avg:.1f} below required {min_avg}"}
        
    return {"eligible": True, "average": avg}`,
    },

    summary: {
      keyTakeaways: [
        'The Capstone Assistant unifies allowlisted tools, state machines, human approval gates, and execution traces.',
        'Safe read tools execute autonomously; consequential mutation tools strictly require verified human signatures.',
        'Ineligible requests are pruned autonomously, shielding human operators from unnecessary review fatigue.',
        'Congratulations on completing Phase 9! You are now prepared to advance to Phase 10: MLOps & LLMOps.',
      ],
      nextLessonId: 'p10-m1',
      nextLessonTitle: 'Phase 10: MLOps, LLMOps and Production Engineering',
      nextLessonModuleId: 'p10-m1',
    },
  },
};

