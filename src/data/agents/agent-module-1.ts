import { ModuleData, LessonContent } from '@/lib/types';

// =========================================================================
// MODULE 1: Agentic Systems Fundamentals (p9-m1)
// =========================================================================
export const p9m1Data: ModuleData = {
  id: 'p9-m1',
  number: 1,
  title: 'Agentic Systems Fundamentals',
  subtitle: 'LLMs vs Agents, Environment Interaction, Bounded Autonomy & Trade-offs',
  description:
    'Deconstruct the leap from static single-turn LLM inference to dynamic autonomous AI agents. Master the formal definition of an agent operating within an external environment: perception, state representation, tool affordances, and bounded decision-making under uncertainty.',
  icon: 'Bot',
  badge: 'Phase 9 · AI Agents',
  estimatedHours: 3,
  topicsCount: 1,
  lessons: [
    {
      id: 'agent-01-fundamentals',
      moduleId: 'p9-m1',
      title: 'Agent-01: Agentic Systems Fundamentals',
      description:
        'Contrast LLM completions with agentic loops, formalize agent-environment interactions, define autonomy boundaries, and evaluate appropriate use cases.',
      order: 1,
      readTimeMinutes: 32,
      visualizerType: 'agent-control-loop-explorer',
      difficulty: 'Beginner',
    },
  ],
};

// =========================================================================
// MODULE 2: Agent Architecture (p9-m2)
// =========================================================================
export const p9m2Data: ModuleData = {
  id: 'p9-m2',
  number: 2,
  title: 'Agent Architecture',
  subtitle: 'Core Triad: Model, Memory, Tools & The Observe-Decide-Act-Evaluate Loop',
  description:
    'Examine the foundational architecture of production agent systems. Master the ReAct and OODA control loops, scratchpad memory maintenance, deterministic orchestrators, and runtime execution state machines.',
  icon: 'Cpu',
  badge: 'Phase 9 · AI Agents',
  estimatedHours: 3,
  topicsCount: 1,
  lessons: [
    {
      id: 'agent-02-architecture',
      moduleId: 'p9-m2',
      title: 'Agent-02: Core Architecture & Control Loops',
      description:
        'Dissect the model-instructions-tools-state triad, the ReAct control loop, state machines, and deterministic vs emergent behavior.',
      order: 1,
      readTimeMinutes: 34,
      visualizerType: 'agent-control-loop-explorer',
      difficulty: 'Intermediate',
    },
  ],
};

// =========================================================================
// MODULE 3: Tool Calling (p9-m3)
// =========================================================================
export const p9m3Data: ModuleData = {
  id: 'p9-m3',
  number: 3,
  title: 'Tool Calling & Schema Validation',
  subtitle: 'JSON Schemas, Parameter Type Checking, Permissions & Safe Execution',
  description:
    'Master function calling mechanics: how language models emit structured tool calls, runtime JSON schema validation, tool permission allowlists, error reflection, and defensive handling of malformed arguments.',
  icon: 'Wrench',
  badge: 'Phase 9 · AI Agents',
  estimatedHours: 3,
  topicsCount: 1,
  lessons: [
    {
      id: 'agent-03-tool-calling',
      moduleId: 'p9-m3',
      title: 'Agent-03: Tool Calling, Function Schemas & Error Handling',
      description:
        'JSON Schema definition, type coercion, parameter constraints, least-privilege allowlists, and feedback loops for self-healing tool calls.',
      order: 1,
      readTimeMinutes: 35,
      visualizerType: 'agent-tool-calling-explorer',
      difficulty: 'Intermediate',
    },
  ],
};

// =========================================================================
// LESSON CONTENTS (Modules 1 - 3)
// =========================================================================
export const agentModule1Lessons: Record<string, LessonContent> = {
  'agent-01-fundamentals': {
    id: 'agent-01-fundamentals',
    moduleId: 'p9-m1',
    title: 'Agent-01: Agentic Systems Fundamentals',
    subtitle: 'From Static LLM Prompting to Dynamic Environment-Interacting Autonomous Agents',
    order: 1,
    readTimeMinutes: 32,
    difficulty: 'Beginner',
    visualizerType: 'agent-control-loop-explorer',

    objectives: [
      'Differentiate standard single-turn LLM completions from multi-step autonomous AI agents',
      'Formalize the agent-environment interaction model (Perception, Action, Observation, Reward)',
      'Analyze the degrees of autonomy and identify why unbounded autonomy fails in enterprise systems',
      'Distinguish high-value agentic domains from workflows better solved with deterministic code or basic RAG',
      'Formulate agent decision loops mathematically as partially observable Markov decision processes (POMDP)',
    ],
    prerequisites: [
      'Familiarity with foundational Large Language Models and prompt engineering (Phase 7)',
      'Understanding of document retrieval and context conditioning (Phase 8: RAG)',
    ],
    previousLesson: {
      id: 'rag-15-production-rag-capstone',
      title: 'RAG-15: Production RAG Capstone Project',
      moduleId: 'p8-m15',
    },

    analogy: {
      title: 'The Encyclopedia versus The Research Apprentice',
      text: 'A standard LLM application is like an encyclopedic scholar sitting at an empty desk. If you ask a question, it recites an answer strictly from memory in a single breath. If the question requires looking up live inventory, filing a ticket, or verifying a calculation, it cannot reach into the world—it merely guesses what the answer ought to look like. An AI agent is a trained apprentice sitting in an office equipped with tools: a telephone (API caller), a computer terminal (code runner), a filing cabinet (database lookup), and a notepad (scratchpad memory). When given a goal, the apprentice forms a plan, dials external services, inspects the returned documents, corrects mistakes if a call fails, and only stops when the objective has been verified.',
      metaphor: 'An LLM is an engine of pure text prediction; an agent is an active cybernetic control system powered by that engine.',
    },

    problemSolved: {
      title: 'Why Prompt Engineering & Chains Fall Short for Open-Ended Tasks',
      description:
        'Traditional LLM workflows rely on rigid, predetermined sequences of prompts (chains). If an intermediate response is incomplete, contains invalid formatting, or encounters an unexpected API error, the entire pipeline crashes. Real-world tasks require adaptive branching, dynamic tool invocation, error recovery, and iterative refinement.',
      keyPoints: [
        'Dynamic Branching: The path to solution is determined at runtime based on environment observations, not hardcoded upfront',
        'External Grounding & Side Effects: Agents can query live databases, execute bash commands, and mutate state in external systems',
        'Self-Healing & Error Recovery: When a tool throws an error, the agent receives the error message as a new observation and attempts alternative strategies',
        'Bounded Scope: Modern enterprise agents enforce strict guardrails, allowlists, and step limits rather than unbounded runaway execution',
      ],
    },

    intuition: {
      overview:
        'An agent operates in a closed cybernetic loop with its environment. It perceives an initial user objective, inspects available tools, deliberates internally via chain-of-thought, executes an external action, and receives feedback.',
      steps: [
        {
          step: 1,
          title: 'Perception (Observation)',
          description:
            'The agent ingests the user prompt, system instructions, available tool schemas, and all prior historical turns and execution observations.',
        },
        {
          step: 2,
          title: 'Deliberation (Reasoning)',
          description:
            'The foundational model generates an internal scratchpad thought evaluating what information is missing and deciding whether to call a tool or produce a final answer.',
        },
        {
          step: 3,
          title: 'Action (Dispatch)',
          description:
            'If a tool is required, the agent emits structured function arguments. The host runtime intercepts this request, validates schemas, and executes the external routine.',
        },
        {
          step: 4,
          title: 'Feedback & Evaluation (State Update)',
          description:
            'The tool execution return value is appended back to the conversation as an environment observation, prompting the next iteration of the loop.',
        },
      ],
    },

    mathematics: {
      overview:
        'An AI agent interacting with an external software environment can be modeled as a Partially Observable Markov Decision Process (POMDP).',
      foundations: [
        {
          name: 'POMDP Formal Tuple',
          latex: '\\mathcal{M} = \\langle \\mathcal{S}, \\mathcal{A}, \\mathcal{T}, \\mathcal{R}, \\Omega, \\mathcal{O}, \\gamma \\rangle',
          explanation:
            'S is the true environment state, A is the action space (tools and text), T is transition probability P(s_{t+1}|s_t, a_t), R is reward function, Omega is observation space, O is observation probability P(o_t|s_t), and gamma is discount factor.',
        },
        {
          name: 'Belief State Update',
          latex: 'b_{t+1}(s) = \\eta \\cdot \\mathcal{O}(o_{t+1} \\mid s) \\sum_{s\' \\in \\mathcal{S}} \\mathcal{T}(s \\mid s\', a_t) b_t(s\')',
          explanation:
            'Because the LLM cannot see the entire database or server state directly, its context window represents a belief state b_t summarizing past history h_t = (o_0, a_0, o_1, ..., o_t).',
        },
        {
          name: 'ReAct Next-Step Probability',
          latex: 'P(a_t, c_t \\mid h_t, g) = \\prod_{k=1}^{K_t} P_{\\theta}(w_{t,k} \\mid w_{t,<k}, h_t, g)',
          explanation:
            'The model autoregressively samples reasoning trace c_t (thought) followed by action a_t conditioned on trajectory history h_t and user goal g.',
        },
      ],
    },

    derivation: {
      title: 'Derivation of Agent Trajectory Expected Utility and Bounded Step Limits',
      objective: 'Show how finite step budgets bound recursive divergence and guarantee termination.',
      steps: [
        {
          step: 1,
          label: 'Total Expected Trajectory Return',
          latex: 'J(\\pi_\\theta) = \\mathbb{E}_{\\tau \\sim \\pi_\\theta} \\left[ \\sum_{t=0}^T \\gamma^t R(s_t, a_t) \\right]',
          explanation: 'The agent policy pi_theta seeks to maximize cumulative task success rewards over a horizon T.',
        },
        {
          step: 2,
          label: 'Unbounded Horizon Divergence Risk',
          latex: '\\lim_{T \\to \\infty} \\mathbb{P}(\\text{Loop}(\\tau)) > 0',
          explanation: 'In cyclic state spaces without termination guarantees, open-ended loops consume infinite tokens and financial budget.',
        },
        {
          step: 3,
          label: 'Strict Finite Step Budget Bound',
          latex: 'T \\le T_{\\max} \\implies \\text{Cost}(\\tau) \\le T_{\\max} \\cdot (C_{\\text{prompt}} + C_{\\text{completion}})',
          explanation: 'Enforcing a strict runtime step cutoff T_max provides a deterministic upper bound on API expenditures and latency.',
        },
      ],
    },

    variables: [
      { symbol: '\\mathcal{S}', name: 'Environment State', description: 'Internal state of databases, files, APIs, and memory' },
      { symbol: '\\mathcal{A}', name: 'Action Space', description: 'Set of allowlisted tools and final answer terminations' },
      { symbol: 'o_t', name: 'Observation', description: 'JSON tool return payload or error string emitted by environment' },
      { symbol: 'c_t', name: 'Thought / Scratchpad', description: 'Internal reasoning tokens produced before tool dispatch' },
      { symbol: 'T_{\\max}', name: 'Max Step Limit', description: 'Hard execution ceiling preventing infinite recursion' },
    ],

    numericalExample: {
      scenario: 'Evaluating customer service agent token expenditure across a 3-step resolution trajectory',
      dataset: [
        { step: 1, inputTokens: 420, outputTokens: 85, costUSD: 0.0016 },
        { step: 2, inputTokens: 680, outputTokens: 110, costUSD: 0.0025 },
        { step: 3, inputTokens: 950, outputTokens: 140, costUSD: 0.0034 },
      ],
      calculations: [
        { step: 'Sum Input Tokens', math: '420 + 680 + 950', result: '2050 tokens' },
        { step: 'Sum Output Tokens', math: '85 + 110 + 140', result: '335 tokens' },
        { step: 'Compute Trajectory Cost', math: '0.0016 + 0.0025 + 0.0034', result: '$0.0075 USD' },
      ],
      finalConclusion: 'The multi-step agent resolved the inquiry in 3 bounded steps with total expenditure of $0.0075, well below the $0.05 budget ceiling.',
    },

    visualExplanation: {
      title: 'Agent vs Standard LLM Application Architecture',
      description:
        'Contrast the single unidirectional forward pass of a basic LLM call with the stateful cyclic loop of an agent.',
      features: [
        'Standard LLM: User Prompt -> Model Weights -> Static Answer (zero environmental interaction)',
        'AI Agent: User Goal -> Deliberation -> Tool Call -> Environment Mutation -> Observation -> Self-Evaluation',
        'State Persistence: Trajectory scratchpad accumulates verified observations across turns',
        'Circuit Breakers: Built-in step limits, time budgets, and token limits protect production stability',
      ],
    },

    scratchCode: {
      title: 'Minimal Deterministic Agent Loop in Pure Python',
      code: `class MinimalAgent:
    def __init__(self, tools, max_steps=4):
        self.tools = tools
        self.max_steps = max_steps
        self.trajectory = []

    def run(self, goal: str):
        print(f"[Agent] Goal initialized: {goal}")
        step = 0
        observation = f"Initial state for goal: {goal}"
        
        while step < self.max_steps:
            step += 1
            print(f"\\n--- Cycle {step}/{self.max_steps} ---")
            
            # Step 1: Deliberate
            thought, action = self._deliberate(step, observation)
            self.trajectory.append({"step": step, "thought": thought, "action": action})
            print(f"[Thought] {thought}")
            
            if action["tool"] == "final_answer":
                print(f"[Conclusion] {action['args']['answer']}")
                return {"status": "success", "steps": step, "answer": action['args']['answer']}
            
            # Step 2: Act & Observe
            tool_fn = self.tools.get(action["tool"])
            if not tool_fn:
                observation = f"Error: Tool '{action['tool']}' not in allowlist."
            else:
                observation = tool_fn(**action["args"])
            
            print(f"[Observation] {observation}")
            
        return {"status": "budget_exceeded", "steps": step, "answer": None}

    def _deliberate(self, step, obs):
        if step == 1:
            return "Need to check current account balance.", {"tool": "get_balance", "args": {"account_id": "ACC_101"}}
        elif step == 2:
            return "Balance verified. Ready to compute payout.", {"tool": "compute_interest", "args": {"principal": 12000, "rate": 0.05}}
        else:
            return "All metrics obtained.", {"tool": "final_answer", "args": {"answer": "Account ACC_101 interest calculated at $600.00."}}

# Mock Tools
tools = {
    "get_balance": lambda account_id: f"Balance for {account_id} is $12,000.00 USD.",
    "compute_interest": lambda principal, rate: f"Interest: {principal * rate:.2f} USD.",
}

agent = MinimalAgent(tools=tools, max_steps=5)
result = agent.run("Calculate interest payout for account ACC_101")
print("\\nResult:", result)`,
      explanation:
        'This pure Python implementation demonstrates the core agentic control loop without external paid dependencies: state observation, deliberate reasoning, tool execution, and termination evaluation.',
    },

    sklearnCode: {
      title: 'Production State Machine Pattern with Typed State',
      code: `from typing import TypedDict, List, Dict, Any, Optional

class AgentState(TypedDict):
    goal: str
    step_count: int
    max_steps: int
    scratchpad: List[str]
    is_completed: bool
    final_output: Optional[str]

def run_agent_state_machine(initial_goal: str) -> AgentState:
    state: AgentState = {
        "goal": initial_goal,
        "step_count": 0,
        "max_steps": 5,
        "scratchpad": [],
        "is_completed": False,
        "final_output": None
    }
    
    while not state["is_completed"] and state["step_count"] < state["max_steps"]:
        state["step_count"] += 1
        curr_step = state["step_count"]
        
        # State transition evaluation
        if curr_step == 1:
            state["scratchpad"].append("Action: Query inventory DB -> In Stock: 4 units.")
        elif curr_step == 2:
            state["scratchpad"].append("Action: Reserve item -> Reservation ID #res_9921.")
            state["is_completed"] = True
            state["final_output"] = "Successfully reserved item with ID #res_9921."
            
    return state

res = run_agent_state_machine("Reserve 1 unit of Item SKU-884")
print("Final State:", res)`,
      explanation:
        'Illustrates deterministic state-machine typing using TypedDict, ensuring full traceability and zero unhandled state leakage in production services.',
    },

    runnableCode: {
      code: `def simulate_agent():
    log = []
    goal = "Check server CPU and restart service if usage > 85%"
    log.append(f"Goal: {goal}")
    
    # Step 1: Observe CPU
    cpu_usage = 91.4
    log.append(f"Observed CPU Usage: {cpu_usage}%")
    
    # Step 2: Reason & Act
    if cpu_usage > 85:
        log.append("Reasoning: CPU exceeds 85% threshold. Executing safe service restart.")
        restart_status = "Service 'api-gateway' restarted successfully (exit code 0)."
        log.append(f"Observation: {restart_status}")
    else:
        log.append("Reasoning: CPU within acceptable limits. No restart required.")
        
    log.append("Status: Task Completed with zero errors.")
    return "\\n".join(log)

print(simulate_agent())`,
      expectedOutput: `Goal: Check server CPU and restart service if usage > 85%
Observed CPU Usage: 91.4%
Reasoning: CPU exceeds 85% threshold. Executing safe service restart.
Observation: Service 'api-gateway' restarted successfully (exit code 0).
Status: Task Completed with zero errors.`,
    },

    lineByLineExplanation: [
      { lines: '1-3', codeSnippet: 'def simulate_agent(): ... goal = "..."', explanation: 'Initializes the task objective and an audit log for trajectory recording.' },
      { lines: '5-7', codeSnippet: 'cpu_usage = 91.4 ... log.append(...)', explanation: 'Perceives external environment telemetry through a simulated sensor/tool.' },
      { lines: '9-14', codeSnippet: 'if cpu_usage > 85: ... restart_status = ...', explanation: 'Evaluates boundary condition and executes a consequential corrective tool action.' },
      { lines: '16-17', codeSnippet: 'log.append("Status: Task Completed...")', explanation: 'Terminates trajectory cleanly and produces human-readable completion telemetry.' },
    ],

    hyperparameters: [
      { name: 'max_iterations', defaultVal: '5', range: '1 - 20', effect: 'Caps total tool cycles', recommendation: 'Keep at 5-10 for task assistants to prevent runaway billing.' },
      { name: 'temperature', defaultVal: '0.0', range: '0.0 - 0.7', effect: 'Controls tool call determinism', recommendation: 'Use 0.0 for tool calling to avoid hallucinating schemas.' },
      { name: 'timeout_seconds', defaultVal: '30s', range: '5s - 120s', effect: 'Total runtime deadline', recommendation: 'Set strict timeouts on all external tool integrations.' },
    ],

    assumptions: [
      { assumption: 'Tool Output Grounding', whyItMatters: 'If tool output is inaccurate, agent reasons on false premises', howToVerify: 'Verify tool schemas with deterministic unit tests.' },
      { assumption: 'Action Idempotency', whyItMatters: 'Retrying non-idempotent tools causes duplicate payments/records', howToVerify: 'Require idempotency tokens on all state-mutating tools.' },
    ],

    commonMistakes: [
      {
        mistake: 'Deploying an autonomous agent for a linear, deterministic problem',
        solution: 'Use standard procedural Python code or DAG workflows when branching logic is known in advance.',
        whyWrong: 'Agents introduce non-zero failure probabilities, higher token latency, and unpredictable billing.',
        howToFix: 'Reserve autonomous agents solely for open-ended retrieval, complex troubleshooting, or dynamic research.',
      },
      {
        mistake: 'Allowing unbounded step iterations without circuit breakers',
        solution: 'Always configure a strict max_steps parameter and execution timeout.',
        whyWrong: 'Models can fall into circular loops repeating the same failed query endlessly.',
        howToFix: 'Track visited tool signatures and terminate immediately if consecutive duplicates occur.',
      },
    ],

    realWorldUseCases: [
      { industry: 'Customer Support', application: 'Automated Tier-2 Helpdesk', benefit: 'Resolves complex multi-system account inquiries without human intervention.' },
      { industry: 'DevOps & SRE', application: 'Automated Incident Triage', benefit: 'Inspects Prometheus logs, correlates traces, and runs remediation runbooks safely.' },
      { industry: 'FinTech', application: 'Credit Risk Document Audit', benefit: 'Retrieves tax returns, verifies salary stubs, and computes debt-to-income ratios.' },
    ],

    practiceQuestions: [
      {
        id: 'pq-1',
        question: 'What is the primary architectural difference between an LLM chain and an autonomous AI agent?',
        hint: 'Consider how next-step decisions are made.',
        answer: 'An LLM chain executes a fixed, hardcoded DAG of prompts regardless of runtime outcomes; an AI agent dynamically decides its next tool, path, and termination based on environment observations.',
        explanation: 'Agents exhibit dynamic runtime branching where intermediate tool feedback alters the subsequent action sequence.',
      },
      {
        id: 'pq-2',
        question: 'Why should the temperature parameter typically be set to 0.0 during tool calling?',
        hint: 'Think about JSON schema syntax precision.',
        answer: 'A temperature of 0.0 maximizes argmax decoding, drastically reducing syntax errors, malformed JSON braces, and hallucinated tool parameter names.',
        explanation: 'Tool invocation requires strict adherence to schema contracts rather than creative textual variation.',
      },
      {
        id: 'pq-3',
        question: 'What is a belief state in the context of a POMDP agent?',
        hint: 'How does the model understand the environment through limited context?',
        answer: 'A belief state represents the agent’s internal probabilistic representation of the true environment state, reconstructed from its context window of past observations and thoughts.',
        explanation: 'Because the agent cannot view the entire external server directly, its prompt scratchpad serves as its belief state.',
      },
    ],

    quiz: [
      {
        id: 'qz-1',
        question: 'Which of the following is an essential safeguard against agent infinite execution loops?',
        options: ['Increasing model temperature to 1.0', 'Enforcing a strict max_steps ceiling and execution timeout', 'Removing the system instructions', 'Disabling tool schema validation'],
        correctIndex: 1,
        explanation: 'Enforcing a strict max_steps ceiling halts agent execution if an error causes cyclic deliberation, preventing runaway costs.',
      },
      {
        id: 'qz-2',
        question: 'In which scenario is an autonomous agent LEAST appropriate compared to standard software?',
        options: [
          'Investigating an unknown production bug across 10 log services',
          'Calculating sales tax by looking up a standard zipcode in a fixed rate table',
          'Conducting multi-source competitive research across web articles',
          'Planning a multi-city travel itinerary with dynamic flight cancellations',
        ],
        correctIndex: 1,
        explanation: 'Looking up sales tax by zipcode is completely deterministic and should be implemented as a fast, 100% reliable SQL or key-value lookup, not an LLM agent.',
      },
      {
        id: 'qz-3',
        question: 'What constitutes the "Action" component in a ReAct agent loop?',
        options: [
          'The user typing a follow-up question',
          'The host computer shutting down',
          'The model emitting a structured tool invocation with validated parameters',
          'The prompt token count reaching maximum context limit',
        ],
        correctIndex: 2,
        explanation: 'Action represents the agent dispatching an explicit tool call (or delivering the final answer) into the host environment.',
      },
    ],

    independentExercise: {
      id: 'ex-01-agent-loop',
      title: 'Implement a Resilient Agent Step Budget Guard',
      problem: 'Write a Python function `safe_agent_loop(goal, max_budget_usd, cost_per_step)` that simulates step-by-step execution. Stop immediately if accumulated cost exceeds the budget or if 5 steps are completed. Return the final step count and total cost.',
      hints: [
        'Initialize accumulated_cost = 0.0 and step = 0',
        'Check cost_per_step against the remaining budget before initiating each cycle',
      ],
      starterCode: `def safe_agent_loop(goal: str, max_budget_usd: float, cost_per_step: float):
    # TODO: Implement step loop with budget and step bounds
    pass

# Test
print(safe_agent_loop("Research competitor", max_budget_usd=0.015, cost_per_step=0.004))`,
      solution: `def safe_agent_loop(goal: str, max_budget_usd: float, cost_per_step: float):
    step = 0
    total_cost = 0.0
    max_steps = 5
    
    while step < max_steps:
        if total_cost + cost_per_step > max_budget_usd:
            return {"status": "budget_halted", "steps": step, "cost": round(total_cost, 4)}
        step += 1
        total_cost += cost_per_step
        if step == 3:  # simulated early task completion
            return {"status": "success", "steps": step, "cost": round(total_cost, 4)}
            
    return {"status": "max_steps_halted", "steps": step, "cost": round(total_cost, 4)}

print(safe_agent_loop("Research competitor", max_budget_usd=0.015, cost_per_step=0.004))`,
    },

    summary: {
      keyTakeaways: [
        'An AI agent pairs an LLM reasoning engine with tools, environment observations, and an iterative control loop.',
        'Agents excel at dynamic, multi-step problem solving with branching paths and error recovery.',
        'Deterministic problems with known rules must remain standard software to guarantee 100% precision, zero latency, and zero token costs.',
        'Production agents require strict bounds: allowlisted tools, typed schemas, max step limits, and execution timeouts.',
      ],
      nextLessonId: 'agent-02-architecture',
      nextLessonTitle: 'Agent-02: Core Architecture & Control Loops',
      nextLessonModuleId: 'p9-m2',
    },
  },

  'agent-02-architecture': {
    id: 'agent-02-architecture',
    moduleId: 'p9-m2',
    title: 'Agent-02: Core Architecture & Control Loops',
    subtitle: 'Model, Instructions, Tools, State, and the Observe-Decide-Act-Evaluate Loop',
    order: 1,
    readTimeMinutes: 34,
    difficulty: 'Intermediate',
    visualizerType: 'agent-control-loop-explorer',

    objectives: [
      'Deconstruct the four core components of an agent runtime: Model, Instructions, Tools, and State',
      'Compare control loop topologies: ReAct (Reason + Act), Plan-and-Solve, and OODA (Observe-Orient-Decide-Act)',
      'Manage scratchpad token growth and prevent context window exhaustion across extended runs',
      'Architect deterministic state machines to orchestrate stochastic model completions reliably',
      'Design formal stop conditions and convergence criteria for autonomous task termination',
    ],
    prerequisites: [
      'Agent-01: Agentic Systems Fundamentals',
      'Knowledge of context window memory and token budgets',
    ],
    previousLesson: {
      id: 'agent-01-fundamentals',
      title: 'Agent-01: Agentic Systems Fundamentals',
      moduleId: 'p9-m1',
    },

    analogy: {
      title: 'The Air Traffic Controller at the Radar Console',
      text: 'An air traffic controller does not steer every airplane directly. Instead, they sit at a console (runtime environment) with a radar screen (state observations), an operations handbook (system instructions), communication radios (tools), and a flight progress strip board (scratchpad state). The controller continuously executes an OODA loop: Observe incoming transponder blips, Orient against sector weather, Decide which plane to sequence, and Act by transmitting clearance. If a pilot reports turbulence, the controller observes the deviation and recalculates routing immediately.',
      metaphor: 'The agent architecture is the console; the LLM is the controller; tools are the radio channels.',
    },

    problemSolved: {
      title: 'Preventing Hallucinated Actions Through Structured State Architecture',
      description:
        'When Large Language Models are asked to solve complex tasks in a single prompt, they frequently skip validation steps, hallucinate tool returns, or lose track of initial constraints. Explicit control loop architectures decouple thinking from executing and enforce rigorous state verification at every turn.',
      keyPoints: [
        'Decoupled Deliberation: Forces the model to articulate reasoning before committing to irreversible actions',
        'Clean State Isolation: Separates system prompt instructions from mutable tool observations',
        'Deterministic Flow: External Python/TypeScript orchestrator controls the execution loop, not the LLM',
        'State History Pruning: Maintains token budgets by archiving verbose tool outputs into structured summaries',
      ],
    },

    intuition: {
      overview:
        'The ReAct (Yao et al., 2022) architecture alternates between Thought, Action, and Observation tokens in a strictly managed sequence.',
      steps: [
        {
          step: 1,
          title: 'Thought Generation',
          description:
            'The LLM articulates an internal reasoning chain evaluating the current goal and prior observations.',
        },
        {
          step: 2,
          title: 'Structured Action Dispatch',
          description:
            'The LLM generates a strict tool call signature. The generation is paused immediately via stop-sequences.',
        },
        {
          step: 3,
          title: 'Host Environment Execution',
          description:
            'The host orchestrator executes the tool function safely in sandboxed code or network clients.',
        },
        {
          step: 4,
          title: 'Observation Feedback Injection',
          description:
            'The runtime injects the output string back into the prompt buffer, returning control to step 1.',
        },
      ],
    },

    mathematics: {
      overview:
        'The ReAct formulation factorizes trajectory generation into interleaved latent reasoning tokens and groundable external actions.',
      foundations: [
        {
          name: 'Trajectory Space Decomposition',
          latex: '\\tau = (c_1, a_1, o_1, c_2, a_2, o_2, \\dots, c_T, a_T, o_T)',
          explanation:
            'c_t is latent thought tokens, a_t is action tokens in tool space A, and o_t is external observation tokens in observation space O.',
        },
        {
          name: 'ReAct Likelihood Factorization',
          latex: 'P(\\tau \\mid x) = \\prod_{t=1}^T P_\\theta(c_t \\mid h_{<t}, x) P_\\theta(a_t \\mid h_{<t}, c_t, x) P_{\\text{env}}(o_t \\mid a_t)',
          explanation:
            'The language model generates thought c_t and action a_t, while the external environment generates observation o_t deterministically.',
        },
        {
          name: 'Context Token Growth Equation',
          latex: 'L_t = L_{\\text{sys}} + L_{\\text{goal}} + \\sum_{i=1}^t (|c_i| + |a_i| + |o_i|)',
          explanation:
            'Linear token accumulation over t iterations requires periodic compaction to avoid exceeding context window limits.',
        },
      ],
    },

    derivation: {
      title: 'Derivation of Trajectory Error Compounding vs Step Verification',
      objective: 'Demonstrate why step-by-step verified loops dramatically outperform monolithic chain generation.',
      steps: [
        {
          step: 1,
          label: 'Monolithic Error Probability',
          latex: '\\mathbb{P}(\\text{Success}_{\\text{mono}}) = \\prod_{i=1}^N (1 - \\epsilon_i) \\approx (1 - \\epsilon)^N \\to 0 \\text{ as } N \\gg 1',
          explanation: 'In open-loop single-turn generation, an error in step 1 propagates through all subsequent steps unchecked.',
        },
        {
          step: 2,
          label: 'Step-by-Step Verification with Error Correction',
          latex: '\\mathbb{P}(\\text{Corrected}_i) = \\epsilon_i \\cdot P_{\\text{heal}}',
          explanation: 'When environment feedback reports an error, the agent has probability P_heal of self-correcting via alternate paths.',
        },
        {
          step: 3,
          label: 'Verified Loop Reliability',
          latex: '\\mathbb{P}(\\text{Success}_{\\text{loop}}) = \\prod_{i=1}^N (1 - \\epsilon_i (1 - P_{\\text{heal}})) \\gg \\mathbb{P}(\\text{Success}_{\\text{mono}})',
          explanation: 'Closed-loop feedback dampens exponential error compounding, yielding orders-of-magnitude higher task success rates.',
        },
      ],
    },

    variables: [
      { symbol: 'c_t', name: 'Thought Trace', description: 'Internal scratchpad reasoning explaining intent' },
      { symbol: 'a_t', name: 'Action Token', description: 'JSON tool call emitted by the model' },
      { symbol: 'o_t', name: 'Observation Token', description: 'Data returned by external API or database' },
      { symbol: 'P_{\\text{heal}}', name: 'Self-Correction Probability', description: 'Probability agent recovers upon seeing tool error feedback' },
    ],

    numericalExample: {
      scenario: 'Comparing reliability of a 4-step task under open-loop vs verified closed-loop execution with 15% error rate',
      dataset: [
        { step: 1, pErr: 0.15, pHeal: 0.8 },
        { step: 2, pErr: 0.15, pHeal: 0.8 },
        { step: 3, pErr: 0.15, pHeal: 0.8 },
        { step: 4, pErr: 0.15, pHeal: 0.8 },
      ],
      calculations: [
        { step: 'Open-loop Success', math: '(1 - 0.15)^4 = 0.85^4', result: '52.2% Success Rate' },
        { step: 'Effective Closed-loop Error', math: '0.15 * (1 - 0.80)', result: '0.03 (3% failure per step)' },
        { step: 'Closed-loop Success', math: '(1 - 0.03)^4 = 0.97^4', result: '88.5% Success Rate' },
      ],
      finalConclusion: 'Adding verified observation feedback boosts task completion from 52.2% to 88.5% by enabling dynamic self-healing.',
    },

    visualExplanation: {
      title: 'State Transition Diagram of the ReAct Engine',
      description: 'Follow the circular flow of states managed by the orchestrator.',
      features: [
        'INIT: Validates schema allowlists and formats system message',
        'REASON: Generates thought tokens until action delimiter is encountered',
        'DISPATCH: Executes host tool function synchronously or asynchronously',
        'INSPECT: Validates tool return status; routes to TERMINATE if goal achieved or REASON if more data needed',
      ],
    },

    scratchCode: {
      title: 'ReAct Engine with Stop Sequences in Pure Python',
      code: `import re

class ReActLoop:
    def __init__(self, tools):
        self.tools = tools
        self.history = []

    def run(self, user_prompt, max_steps=4):
        self.history = [f"User Goal: {user_prompt}"]
        
        for step in range(1, max_steps + 1):
            # 1. Generate Thought & Action
            prompt_view = "\\n".join(self.history)
            thought, action_line = self._simulate_llm_react_turn(prompt_view, step)
            
            self.history.append(f"Thought {step}: {thought}")
            print(f"[Thought {step}] {thought}")
            
            # Check for final completion
            if "Final Answer:" in action_line:
                answer = action_line.replace("Final Answer:", "").strip()
                print(f"[Final Answer] {answer}")
                return answer
                
            # Parse action: Action: tool_name(arg="value")
            match = re.match(r"Action:\\s*(\\w+)\\((.*)\\)", action_line)
            if not match:
                self.history.append("Observation: Malformed action syntax.")
                continue
                
            tool_name, raw_args = match.groups()
            self.history.append(f"Action {step}: {tool_name}({raw_args})")
            print(f"[Action {step}] {tool_name}({raw_args})")
            
            # 2. Host Dispatch
            tool_fn = self.tools.get(tool_name)
            if tool_fn:
                obs = tool_fn(raw_args.strip('"\\''))
            else:
                obs = f"Error: Tool '{tool_name}' not found."
                
            self.history.append(f"Observation {step}: {obs}")
            print(f"[Observation {step}] {obs}\\n")
            
        return "Failed: Maximum step limit reached."

    def _simulate_llm_react_turn(self, context, step):
        if step == 1:
            return "Need to check current exchange rate for EUR to USD.", 'Action: get_fx_rate("EUR_USD")'
        elif step == 2:
            return "Exchange rate is 1.08. Now converting 500 Euros to USD.", 'Action: multiply("500*1.08")'
        else:
            return "Calculation confirmed at $540.00.", 'Final Answer: 500 EUR equals $540.00 USD at current rate.'

tools = {
    "get_fx_rate": lambda pair: "1.08 USD per EUR",
    "multiply": lambda expr: str(eval(expr)),
}

engine = ReActLoop(tools)
result = engine.run("Convert 500 EUR to USD")
print("Engine Result:", result)`,
      explanation:
        'Implements the classic ReAct parsing structure using regex action interception, prompt history accumulation, and simulated LLM token streams.',
    },

    sklearnCode: {
      title: 'State Machine Controller with Explicit Transitions',
      code: `from enum import Enum
from typing import Dict, Any

class AgentPhase(Enum):
    OBSERVE = "observe"
    DELIBERATE = "deliberate"
    EXECUTE_TOOL = "execute_tool"
    EVALUATE = "evaluate"
    TERMINATED = "terminated"

class ProductionController:
    def __init__(self, allowed_tools: Dict[str, Any]):
        self.phase = AgentPhase.OBSERVE
        self.tools = allowed_tools
        self.state = {"step": 0, "status": "running"}

    def transition(self, event_data: Dict[str, Any]):
        if self.phase == AgentPhase.OBSERVE:
            print("[Controller] State observed. Moving to DELIBERATE.")
            self.phase = AgentPhase.DELIBERATE
        elif self.phase == AgentPhase.DELIBERATE:
            if event_data.get("is_complete"):
                self.phase = AgentPhase.TERMINATED
            else:
                self.phase = AgentPhase.EXECUTE_TOOL
        elif self.phase == AgentPhase.EXECUTE_TOOL:
            print(f"[Controller] Executing tool: {event_data.get('tool_name')}")
            self.phase = AgentPhase.EVALUATE
        elif self.phase == AgentPhase.EVALUATE:
            self.state["step"] += 1
            self.phase = AgentPhase.OBSERVE

ctrl = ProductionController(allowed_tools={"lookup": lambda x: x})
print("Initial Phase:", ctrl.phase.value)
ctrl.transition({})
print("Next Phase:", ctrl.phase.value)`,
      explanation:
        'Demonstrates an explicit Finite State Machine (FSM) enforcing valid runtime transitions, preventing models from executing tools while in improper states.',
    },

    runnableCode: {
      code: `def trace_react_execution():
    steps = [
        {"type": "Thought", "content": "Query product ID for SKU-109"},
        {"type": "Action", "content": "db_lookup('SKU-109')"},
        {"type": "Observation", "content": "{'name': 'Ergonomic Desk', 'price': 349.00}"},
        {"type": "Thought", "content": "Price retrieved. Concluding answer."},
        {"type": "Final Answer", "content": "The Ergonomic Desk (SKU-109) costs $349.00."}
    ]
    
    trace = []
    for s in steps:
        trace.append(f"[{s['type']}] -> {s['content']}")
    return "\\n".join(trace)

print(trace_react_execution())`,
      expectedOutput: `[Thought] -> Query product ID for SKU-109
[Action] -> db_lookup('SKU-109')
[Observation] -> {'name': 'Ergonomic Desk', 'price': 349.00}
[Thought] -> Price retrieved. Concluding answer.
[Final Answer] -> The Ergonomic Desk (SKU-109) costs $349.00.`,
    },

    lineByLineExplanation: [
      { lines: '1-7', codeSnippet: 'steps = [ {"type": "Thought"...', explanation: 'Defines the sequence of interleaved Thought, Action, Observation, and Final Answer turns.' },
      { lines: '9-12', codeSnippet: 'for s in steps: trace.append(...)', explanation: 'Formats the trajectory log for human observability and automated unit assertions.' },
    ],

    hyperparameters: [
      { name: 'stop_sequences', defaultVal: '["\\nObservation:", "Observation 1:"]', range: 'String tokens', effect: 'Halts generation when tool call is emitted', recommendation: 'Always set stop tokens to prevent model hallucinating tool output.' },
      { name: 'scratchpad_compression_ratio', defaultVal: '0.4', range: '0.2 - 0.8', effect: 'Degree of token compaction', recommendation: 'Summarize tool outputs that exceed 500 tokens before appending to context.' },
    ],

    assumptions: [
      { assumption: 'Stop Sequence Enforcement', whyItMatters: 'If the model does not halt at Action, it will fabricate fake tool observations', howToVerify: 'Configure client runtime stop parameters.' },
      { assumption: 'Format Strictness', whyItMatters: 'Syntax drift causes regex or JSON parsers to throw exceptions', howToVerify: 'Use native OpenAI/Gemini tool calling APIs with structured JSON.' },
    ],

    commonMistakes: [
      {
        mistake: 'Allowing the LLM to generate its own "Observation:" text',
        solution: 'Use strict API stop sequences so generation ceases immediately after the tool call is produced.',
        whyWrong: 'The model will hallucinate a fake tool result instead of calling the actual external database.',
        howToFix: 'Intervene with host runtime execution before appending the genuine observation.',
      },
      {
        mistake: 'Passing raw uncompressed 50-page PDF tool returns into the agent prompt',
        solution: 'Pass summarized or chunked excerpts from tool returns.',
        whyWrong: 'Quickly exhausts the context window and dilutes attention away from core instructions.',
        howToFix: 'Sanitize and truncate tool returns before injecting into the scratchpad.',
      },
    ],

    realWorldUseCases: [
      { industry: 'Data Engineering', application: 'Automated ETL Pipeline Repair', benefit: 'Inspects failing Airflow task logs, identifies schema mismatch, and reruns DAGs.' },
      { industry: 'Security Operations', application: 'Phishing Email Analysis', benefit: 'Extracts sender IP, queries VirusTotal API, checks SPF/DKIM records, and quarantines mailbox.' },
    ],

    practiceQuestions: [
      {
        id: 'pq-arch-1',
        question: 'Why does the ReAct framework pair reasoning traces (Thoughts) with action execution (Actions)?',
        hint: 'What happens if a model acts without explaining its rationale?',
        answer: 'Reasoning traces allow the model to track progress, decompose intermediate variables, and maintain focus, while external actions ground the reasoning in real-world facts.',
        explanation: 'Empirical studies show reasoning before acting improves tool selection accuracy and reduces hallucinated parameters.',
      },
      {
        id: 'pq-arch-2',
        question: 'What is a stop sequence, and why is it mandatory when using raw prompt-based tool calling?',
        hint: 'Who should generate the Observation?',
        answer: 'A stop sequence is a token (like "\\nObservation:") that instructs the model to pause generation immediately so the host application can execute the tool and supply the real observation.',
        explanation: 'Without a stop sequence, the LLM will hallucinate what it guesses the tool returned.',
      },
      {
        id: 'pq-arch-3',
        question: 'How does an agent runtime handle an unexpected exception thrown by an external tool?',
        hint: 'Does the application crash?',
        answer: 'The runtime catches the exception and returns the error string (e.g. "Error: 404 Not Found") as the observation, allowing the model to adapt and choose an alternative path.',
        explanation: 'Treating tool exceptions as observations enables autonomous self-healing.',
      },
    ],

    quiz: [
      {
        id: 'qz-arch-1',
        question: 'Which sequence correctly represents one full cycle of the ReAct control loop?',
        options: [
          'Act -> Final Answer -> Thought',
          'Thought -> Action -> Environment Observation -> Next Thought',
          'Observation -> Action -> Final Answer -> Thought',
          'System Prompt -> Final Answer -> Shutdown',
        ],
        correctIndex: 1,
        explanation: 'ReAct alternates between internal deliberation (Thought), tool invocation (Action), and environment feedback (Observation).',
      },
      {
        id: 'qz-arch-2',
        question: 'What is the primary danger of failing to prune the agent scratchpad memory in long-running tasks?',
        options: [
          'The model gains too much real-time memory',
          'Context window saturation, degradation of instruction following, and exponential token cost growth',
          'The database undergoes irreversible physical corruption',
          'The LLM parameters become permanent weights',
        ],
        correctIndex: 1,
        explanation: 'Accumulating raw verbose tool observations exhausts context tokens and triggers the "lost-in-the-middle" attention degradation phenomenon.',
      },
      {
        id: 'qz-arch-3',
        question: 'In production agent design, what entity controls the while-loop driving the agent?',
        options: [
          'The Large Language Model itself',
          'The external deterministic host orchestrator / code runtime',
          'The database server',
          'The client web browser',
        ],
        correctIndex: 1,
        explanation: 'The host application controls the while-loop, enforcing hard budgets, authentication, timeouts, and state tracking.',
      },
    ],

    independentExercise: {
      id: 'ex-02-react-parser',
      title: 'Build a Safe ReAct Action & Thought Parser',
      problem: 'Write a Python function `parse_react_turn(text)` that accepts raw model output containing "Thought: <text>\\nAction: <tool_name>(<args>)" or "Thought: <text>\\nFinal Answer: <ans>". Return a structured dictionary with keys `thought`, `action_type`, `tool_name`, `args`, or `final_answer`.',
      hints: ['Use string splitting or regex to parse Thought and Action components.'],
      starterCode: `def parse_react_turn(text: str):
    # TODO: Parse into structured dict
    pass

# Test
raw = """Thought: Need user balance.
Action: get_balance(account_id="ACC_99")"""
print(parse_react_turn(raw))`,
      solution: `import re

def parse_react_turn(text: str):
    thought = ""
    if "Thought:" in text:
        thought_part = text.split("Thought:")[1]
        if "Action:" in thought_part:
            thought = thought_part.split("Action:")[0].strip()
        elif "Final Answer:" in thought_part:
            thought = thought_part.split("Final Answer:")[0].strip()
        else:
            thought = thought_part.strip()

    if "Final Answer:" in text:
        ans = text.split("Final Answer:")[1].strip()
        return {"thought": thought, "action_type": "finish", "final_answer": ans}
        
    action_match = re.search(r"Action:\\s*(\\w+)\\((.*?)\\)", text)
    if action_match:
        tool_name, args = action_match.groups()
        return {
            "thought": thought,
            "action_type": "tool_call",
            "tool_name": tool_name,
            "args": args.strip()
        }
        
    return {"thought": thought, "action_type": "unknown", "error": "Could not parse action"}

raw = """Thought: Need user balance.
Action: get_balance(account_id="ACC_99")"""
print(parse_react_turn(raw))`,
    },

    summary: {
      keyTakeaways: [
        'An agent runtime consists of Model, Instructions, Tools, and State.',
        'ReAct factorizes reasoning and execution into Thought -> Action -> Observation cycles.',
        'Stop sequences are critical to prevent models from hallucinating fake tool responses.',
        'Deterministic host orchestrators govern the loop, enforcing strict state machine transitions and budget ceilings.',
      ],
      nextLessonId: 'agent-03-tool-calling',
      nextLessonTitle: 'Agent-03: Tool Calling, Function Schemas & Error Handling',
      nextLessonModuleId: 'p9-m3',
    },
  },

  'agent-03-tool-calling': {
    id: 'agent-03-tool-calling',
    moduleId: 'p9-m3',
    title: 'Agent-03: Tool Calling, Function Schemas & Error Handling',
    subtitle: 'JSON Schema Validation, Parameter Constraints, Permission Scopes & Self-Healing',
    order: 1,
    readTimeMinutes: 35,
    difficulty: 'Intermediate',
    visualizerType: 'agent-tool-calling-explorer',

    objectives: [
      'Define rigorous JSON Schemas for tool parameter typing, constraints, and descriptions',
      'Implement defensive validation layers to catch missing fields, type errors, and malicious inputs',
      'Enforce least-privilege permission allowlists and categorize tools by consequential mutation risk',
      'Design structured error return payloads that enable the LLM to self-heal malformed tool invocations',
      'Prevent catastrophic SQL and shell injection vulnerabilities through parameterized tool wrappers',
    ],
    prerequisites: [
      'Agent-02: Core Architecture & Control Loops',
      'Familiarity with JSON Schema specification and REST APIs',
    ],
    previousLesson: {
      id: 'agent-02-architecture',
      title: 'Agent-02: Core Architecture & Control Loops',
      moduleId: 'p9-m2',
    },

    analogy: {
      title: 'The Pharmacy Prescription and The Licensed Pharmacist',
      text: 'A physician writing a prescription is like an LLM generating a tool call. The doctor specifies the medication name, dosage, frequency, and patient ID. However, the patient cannot walk directly to the chemical shelf and mix the drugs. A licensed pharmacist (the tool execution runtime) must first validate the prescription: Is this doctor authorized? Is the dosage within safe human limits? Does this drug fatally interact with the patient’s existing chart? If the handwriting is illegible or dosage is 1,000x too high, the pharmacist rejects the order, phones the doctor with clear error feedback, and waits for a corrected prescription.',
      metaphor: 'The LLM writes the prescription; the runtime validates the schema and safety bounds before dispensing the action.',
    },

    problemSolved: {
      title: 'Eliminating Runtime Crashes from Stochastic Model Outputs',
      description:
        'Large language models are probabilistic token predictors, not compiled programming languages. When invoking APIs, they occasionally pass string values where numbers are expected, omit mandatory parameters, invent imaginary enum options, or pass unescaped characters. Robust tool calling architectures wrap every tool in schema validators and error reflection mechanisms.',
      keyPoints: [
        'Schema Strictness: Rejects calls that deviate from required JSON Schema specifications',
        'Parameter Sanitization: Strips dangerous shell characters and quotes before execution',
        'Action Feedback Loop: Translates validation exceptions into clear natural language instructions for the model',
        'Permission Gating: Prevents privilege escalation by disallowing unauthorized tool invocation',
      ],
    },

    intuition: {
      overview:
        'Tool calling proceeds through a 4-stage pipeline: Schema Publishing -> Model Tool Selection -> Host Argument Validation -> Safe Execution & Observation Feedback.',
      steps: [
        {
          step: 1,
          title: 'Schema Publishing',
          description:
            'The runtime injects JSON schemas into the model context describing function names, descriptions, parameter types, and required properties.',
        },
        {
          step: 2,
          title: 'Structured Invocation',
          description:
            'The LLM selects an allowlisted tool and emits argument key-value pairs formatted as valid JSON.',
        },
        {
          step: 3,
          title: 'Defensive Validation',
          description:
            'The host validates arguments using Pydantic or JSONSchema. If validation fails, an actionable error is returned to the model immediately without executing the tool.',
        },
        {
          step: 4,
          title: 'Safe Execution & Return',
          description:
            'The verified routine executes within a timeout and sandbox, returning structured data or error codes.',
        },
      ],
    },

    mathematics: {
      overview:
        'Tool selection can be formalized as an argmax probability classification over registered function schemas.',
      foundations: [
        {
          name: 'Tool Selection Probability',
          latex: 'P(t_k \\mid x, \\mathcal{T}) = \\frac{\\exp(\\mathbf{h}_x^T \\mathbf{w}_{t_k})}{\\sum_{j=1}^{|\\mathcal{T}|} \\exp(\\mathbf{h}_x^T \\mathbf{w}_{t_j})}',
          explanation:
            'The model aligns its hidden state representation h_x of the user goal with semantic embeddings w_{t_k} of tool descriptions in catalog T.',
        },
        {
          name: 'Schema Parameter Constraint Indicator',
          latex: '\\mathbb{I}_{\\text{valid}}(\\mathbf{\\theta}) = \\prod_{p \\in \\mathcal{P}} \\mathbb{I}(v_p \\in \\text{Domain}(p)) \\cdot \\prod_{r \\in \\mathcal{R}} \\mathbb{I}(r \\in \\text{Keys}(\\mathbf{\\theta}))',
          explanation:
            'A tool call theta is valid if and only if all required keys r are present and all provided values v_p satisfy their defined domain constraints.',
        },
        {
          name: 'Tool Error Feedback Update',
          latex: 'P(\\mathbf{\\theta}_{t+1} \\mid h_t, e_t) > P(\\mathbf{\\theta}_t \\mid h_t)',
          explanation:
            'Conditioning the subsequent turn on explicit error feedback e_t substantially increases the probability of generating a compliant parameter set.',
        },
      ],
    },

    derivation: {
      title: 'Derivation of Tool Catalog Capacity Limits and Distractor Degradation',
      objective: 'Show how expanding tool sets degrades selection accuracy and increases token overhead.',
      steps: [
        {
          step: 1,
          label: 'Context Overhead of Tool Schemas',
          latex: 'C_{\\text{schema}} = \\sum_{i=1}^{M} \\text{Tokens}(\\text{Schema}_i) \\approx M \\cdot \\bar{L}_{\\text{schema}}',
          explanation: 'Providing M tool definitions consumes M * L_schema tokens on every turn, escalating latency and inference cost.',
        },
        {
          step: 2,
          label: 'Tool Selection Confusion with Distractors',
          latex: '\\mathbb{P}(\\text{Error}_{\\text{select}}) = 1 - \\prod_{k=1}^K (1 - P(\\text{confuse}(t_{\\text{target}}, t_{\\text{distractor}, k})))',
          explanation: 'As catalog size M grows, semantic overlap between distractor tools causes selection errors to rise exponentially.',
        },
        {
          step: 3,
          label: 'Optimal Scoping Principle',
          latex: '\\mathcal{T}_{\\text{active}} = \\text{RetrieveTools}(q, \\mathcal{T}_{\\text{all}}, k=5) \\implies |\\mathcal{T}_{\\text{active}}| \\ll |\\mathcal{T}_{\\text{all}}|',
          explanation: 'Production architectures dynamically filter the active tool set to Top-3 to Top-5 relevant tools per turn.',
        },
      ],
    },

    variables: [
      { symbol: '\\mathcal{T}', name: 'Tool Allowlist', description: 'Set of registered, authorized function interfaces' },
      { symbol: '\\mathbf{\\theta}', name: 'Parameter Arguments', description: 'Dictionary of inputs provided by the LLM' },
      { symbol: 'e_t', name: 'Validation Error Payload', description: 'Structured diagnostics sent back upon schema breach' },
      { symbol: 'M', name: 'Catalog Size', description: 'Total number of available tools in the system' },
    ],

    numericalExample: {
      scenario: 'Validating bank account transfer tool parameters and self-healing',
      dataset: [
        { attempt: 1, param: 'amount', value: -50.0, status: 'REJECTED: amount must be > 0' },
        { attempt: 2, param: 'amount', value: 50.0, status: 'ACCEPTED: 200 OK' },
      ],
      calculations: [
        { step: 'Check schema bounds', math: '-50.0 < 0 (Violates minimum: 1.0)', result: 'Trigger validation error' },
        { step: 'Format feedback string', math: '"Error: Parameter amount must be >= 1.0 USD."', result: 'Injected into prompt' },
        { step: 'Self-healed call', math: '50.0 >= 1.0 (Valid)', result: 'Dispatched to banking API' },
      ],
      finalConclusion: 'The defensive validation layer blocked a negative balance transfer attempt and prompted a valid self-correction.',
    },

    visualExplanation: {
      title: 'Defensive Tool Execution Pipeline',
      description: 'Trace how untrusted LLM tool calls pass through validation boundaries before hardware execution.',
      features: [
        '1. JSON Parser: Catches raw syntax errors, trailing commas, and unclosed quotes',
        '2. Schema Validator: Checks required keys, data types, min/max numbers, and string regexes',
        '3. Permission Checker: Enforces RBAC user authorization and allowlist membership',
        '4. Sandbox Execution: Runs code inside isolated containers with network and file restrictions',
      ],
    },

    scratchCode: {
      title: 'Robust Function Schema Validator in Pure Python',
      code: `import json
from typing import Dict, Any

class ToolValidator:
    def __init__(self, schemas: Dict[str, Any]):
        self.schemas = schemas

    def validate_and_call(self, tool_name: str, raw_args: Dict[str, Any], tool_implementations: Dict[str, Any]):
        schema = self.schemas.get(tool_name)
        if not schema:
            return {"success": False, "error": f"Tool '{tool_name}' is not in the authorized allowlist."}

        # Check required fields
        required = schema.get("required", [])
        for req in required:
            if req not in raw_args:
                return {"success": False, "error": f"Missing required parameter: '{req}'."}

        # Check parameter types and constraints
        properties = schema.get("properties", {})
        for key, val in raw_args.items():
            if key not in properties:
                return {"success": False, "error": f"Unexpected parameter: '{key}'."}
                
            expected_type = properties[key].get("type")
            if expected_type == "number" and not isinstance(val, (int, float)):
                return {"success": False, "error": f"Parameter '{key}' must be a number."}
            elif expected_type == "string" and not isinstance(val, str):
                return {"success": False, "error": f"Parameter '{key}' must be a string."}

            # Range checks
            if "minimum" in properties[key] and val < properties[key]["minimum"]:
                return {"success": False, "error": f"Parameter '{key}' must be >= {properties[key]['minimum']}."}

        # Safe execution
        fn = tool_implementations.get(tool_name)
        try:
            result = fn(**raw_args)
            return {"success": True, "output": result}
        except Exception as e:
            return {"success": False, "error": f"Execution error in {tool_name}: {str(e)}"}

# Define Schemas
schemas = {
    "send_payment": {
        "type": "object",
        "properties": {
            "recipient": {"type": "string"},
            "amount": {"type": "number", "minimum": 1.0}
        },
        "required": ["recipient", "amount"]
    }
}

tools = {
    "send_payment": lambda recipient, amount: "Successfully transferred " + str(round(amount, 2)) + " USD to " + recipient + "."
}

validator = ToolValidator(schemas)

# Test 1: Invalid parameter (below min)
bad_call = validator.validate_and_call("send_payment", {"recipient": "Alice", "amount": -10}, tools)
print("Invalid Call Result:", bad_call)

# Test 2: Valid parameter
good_call = validator.validate_and_call("send_payment", {"recipient": "Alice", "amount": 150.0}, tools)
print("Valid Call Result:", good_call)`,
      explanation:
        'Implements lightweight defensive schema validation with missing property detection, type checking, numerical bounds, and exception isolation.',
    },

    sklearnCode: {
      title: 'Pydantic-Driven Tool Schema Generation',
      code: `from typing import Optional
import json

# Simulating Pydantic Base-Model pattern without external binary
class ToolSchemaRegistry:
    @staticmethod
    def export_openai_schema(name: str, description: str, fields: dict):
        properties = {}
        required = []
        for f_name, f_meta in fields.items():
            properties[f_name] = {
                "type": f_meta["type"],
                "description": f_meta["description"]
            }
            if f_meta.get("required", False):
                required.append(f_name)
                
        return {
            "type": "function",
            "function": {
                "name": name,
                "description": description,
                "parameters": {
                    "type": "object",
                    "properties": properties,
                    "required": required
                }
            }
        }

schema = ToolSchemaRegistry.export_openai_schema(
    name="query_vector_store",
    description="Retrieve relevant document chunks by cosine similarity",
    fields={
        "query": {"type": "string", "description": "The search query", "required": True},
        "top_k": {"type": "number", "description": "Number of passages to return", "required": False}
    }
)

print(json.dumps(schema, indent=2))`,
      explanation:
        'Demonstrates structured schema export compatible with native OpenAI and Gemini function calling interfaces.',
    },

    runnableCode: {
      code: `def simulate_tool_dispatch():
    def transfer_money(to_acc, amount):
        if amount <= 0:
            raise ValueError("Amount must be strictly positive.")
        return "Transferred " + str(round(amount, 2)) + " USD to account " + to_acc + "."

    # Model emitted malformed call
    call = {"to_acc": "ACC-901", "amount": -25.0}
    try:
        res = transfer_money(**call)
    except Exception as e:
        res = f"Error: {e} -> Feedback returned to model to prompt correction."
        
    return res

print(simulate_tool_dispatch())`,
      expectedOutput: `Error: Amount must be strictly positive. -> Feedback returned to model to prompt correction.`,
    },

    lineByLineExplanation: [
      { lines: '2-5', codeSnippet: 'def transfer_money(to_acc, amount): ...', explanation: 'Defines business logic with strict internal precondition validation.' },
      { lines: '8-12', codeSnippet: 'call = {"amount": -25.0} ... try: ... except:', explanation: 'Catches invalid input and formulates an informative error observation for the next model turn.' },
    ],

    hyperparameters: [
      { name: 'max_active_tools', defaultVal: '5', range: '1 - 15', effect: 'Caps tools presented in system prompt', recommendation: 'Keep active tools <= 8 to maintain >95% selection precision.' },
      { name: 'strict_mode', defaultVal: 'True', range: 'Boolean', effect: 'Enforces exact JSON schema adherence', recommendation: 'Always enable strict mode on supported providers.' },
    ],

    assumptions: [
      { assumption: 'Allowlist Enforcement', whyItMatters: 'Unrestricted execution allows models to invoke arbitrary shell commands', howToVerify: 'Only route tools present in an immutable set.' },
      { assumption: 'Type Casting Safety', whyItMatters: 'Implicit coercion of strings to numbers can cause silent NaN errors', howToVerify: 'Reject types that do not match the JSON schema strictly.' },
    ],

    commonMistakes: [
      {
        mistake: 'Passing raw SQL strings directly into a database execution tool',
        solution: 'Use parameterized queries or structured filters (e.g. {"table": "users", "where": {"id": 12}}).',
        whyWrong: 'Enables SQL injection if user prompts or retrieved data contain malicious SQL commands.',
        howToFix: 'Constrain tools to parameterized stored procedures or read-only views.',
      },
      {
        mistake: 'Crashing the whole application when a tool throws an HTTP 500 error',
        solution: 'Catch all tool exceptions in the runtime harness and return the error message as an observation.',
        whyWrong: 'Terminates the user session instead of letting the agent attempt a fallback tool.',
        howToFix: 'Wrap every tool call in a defensive try/except block returning structured JSON error objects.',
      },
    ],

    realWorldUseCases: [
      { industry: 'E-Commerce', application: 'Order Management Agent', benefit: 'Safely looks up tracking IDs, processes returns, and cancels pending shipments within validated policies.' },
      { industry: 'Healthcare', application: 'Patient Appointment Scheduler', benefit: 'Verifies doctor availability, checks patient insurance status, and reserves calendar slots.' },
    ],

    practiceQuestions: [
      {
        id: 'pq-tool-1',
        question: 'Why is it dangerous to present 50 different tools to an LLM at once?',
        hint: 'Consider both context window cost and semantic confusion.',
        answer: 'Providing 50 tools inflates prompt token overhead and substantially increases the risk of the model selecting the wrong tool due to semantic distractor overlap.',
        explanation: 'Benchmark studies show tool selection accuracy drops significantly when distractor tools exceed 10-15.',
      },
      {
        id: 'pq-tool-2',
        question: 'What is the role of the "required" property in a JSON Schema tool definition?',
        hint: 'What happens if a parameter is omitted?',
        answer: 'The required array lists parameter names that must be present in the model’s generated argument object; any call missing a required field is rejected before execution.',
        explanation: 'Enforces mandatory data contracts before running backend functions.',
      },
      {
        id: 'pq-tool-3',
        question: 'How does providing explicit tool execution error messages aid the agent?',
        hint: 'What does the model do with the error message in the next turn?',
        answer: 'The model treats the error message as an observation, updates its reasoning scratchpad, and corrects its arguments in the subsequent step without crashing.',
        explanation: 'Action error feedback provides the essential gradient for autonomous self-healing.',
      },
    ],

    quiz: [
      {
        id: 'qz-tool-1',
        question: 'Which of the following tool calling practices is most critical for security?',
        options: [
          'Allowing the agent to generate and execute arbitrary bash strings with sudo privileges',
          'Enforcing strict parameter allowlists, type validation, and least-privilege sandboxing',
          'Hiding all tool schemas from the system prompt',
          'Using temperature 1.0 for creative parameter values',
        ],
        correctIndex: 1,
        explanation: 'Least-privilege execution and parameter validation prevent unauthorized mutations and arbitrary code execution.',
      },
      {
        id: 'qz-tool-2',
        question: 'If an agent emits an argument `{"age": "twenty-five"}` for a schema requiring integer `age`, what should the runtime do?',
        options: [
          'Crash the entire program immediately',
          'Execute the tool with the string anyway',
          'Reject the call with a structured validation error and return the error message to the model as an observation',
          'Guess the integer and delete the database',
        ],
        correctIndex: 2,
        explanation: 'Rejecting the call and returning clear error feedback allows the model to correct its argument to 25 on the next step.',
      },
      {
        id: 'qz-tool-3',
        question: 'What is a distractor tool?',
        options: [
          'A tool designed to test if the human operator is paying attention',
          'An irrelevant tool present in the model prompt that semantically confuses the tool selection decision',
          'A tool that intentionally produces random numbers',
          'A hardware interrupt signal',
        ],
        correctIndex: 1,
        explanation: 'Distractor tools are irrelevant tools in the catalog that dilute attention and increase the likelihood of incorrect tool invocation.',
      },
    ],

    independentExercise: {
      id: 'ex-03-schema-linter',
      title: 'Build a Parameter Bounds Checker',
      problem: 'Write a Python function `check_tool_args(schema, args)` that verifies: 1) all required keys in schema are in args, 2) no unexpected keys are passed, and 3) any number with `maximum` does not exceed it. Return `{"valid": True}` or `{"valid": False, "error": "<msg>"}`.',
      hints: ['Iterate through schema["required"] and schema["properties"].'],
      starterCode: `def check_tool_args(schema: dict, args: dict):
    # TODO: Implement checks
    pass

schema = {
    "required": ["user_id", "limit"],
    "properties": {
        "user_id": {"type": "string"},
        "limit": {"type": "number", "maximum": 100}
    }
}
print(check_tool_args(schema, {"user_id": "u1", "limit": 150}))`,
      solution: `def check_tool_args(schema: dict, args: dict):
    # Check required keys
    for req in schema.get("required", []):
        if req not in args:
            return {"valid": False, "error": f"Missing required parameter '{req}'"}
            
    # Check properties and limits
    props = schema.get("properties", {})
    for k, v in args.items():
        if k not in props:
            return {"valid": False, "error": f"Unexpected parameter '{k}'"}
        if props[k].get("type") == "number":
            max_val = props[k].get("maximum")
            if max_val is not None and v > max_val:
                return {"valid": False, "error": f"Parameter '{k}' exceeds maximum allowed value of {max_val}"}
                
    return {"valid": True}

schema = {
    "required": ["user_id", "limit"],
    "properties": {
        "user_id": {"type": "string"},
        "limit": {"type": "number", "maximum": 100}
    }
}
print(check_tool_args(schema, {"user_id": "u1", "limit": 150}))`,
    },

    summary: {
      keyTakeaways: [
        'Tool calling requires strict JSON Schemas defining types, required fields, and semantic descriptions.',
        'Defensive runtime validation catches malformed arguments before execution, returning clear error feedback to the model.',
        'Keep active tool sets small (<= 5-8 tools) to prevent semantic distractor confusion and reduce token overhead.',
        'Never pass unsanitized LLM strings into shell commands or raw SQL queries; enforce parameterized interfaces.',
      ],
      nextLessonId: 'agent-04-state-memory',
      nextLessonTitle: 'Agent-04: Agent State and Memory',
      nextLessonModuleId: 'p9-m4',
    },
  },
};
