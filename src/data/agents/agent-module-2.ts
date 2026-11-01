import { ModuleData, LessonContent } from '@/lib/types';

// =========================================================================
// MODULE 4: Agent State and Memory (p9-m4)
// =========================================================================
export const p9m4Data: ModuleData = {
  id: 'p9-m4',
  number: 4,
  title: 'Agent State & Memory Systems',
  subtitle: 'Working Memory, Long-Term Recall, Recursive Summarization & Privacy',
  description:
    'Design hierarchical memory architectures for autonomous systems. Master working scratchpads, sliding conversation buffers, recursive summarization, semantic vector recall, and enterprise privacy retention boundaries.',
  icon: 'Brain',
  badge: 'Phase 9 · AI Agents',
  estimatedHours: 3,
  topicsCount: 1,
  lessons: [
    {
      id: 'agent-04-state-memory',
      moduleId: 'p9-m4',
      title: 'Agent-04: Working State, Memory Tiers & Compaction',
      description:
        'Working memory vs persistent memory, dialogue history management, LRU eviction, recursive summarization, and secure cross-session retention.',
      order: 1,
      readTimeMinutes: 34,
      visualizerType: 'agent-memory-state-explorer',
      difficulty: 'Intermediate',
    },
  ],
};

// =========================================================================
// MODULE 5: Planning & Task Decomposition (p9-m5)
// =========================================================================
export const p9m5Data: ModuleData = {
  id: 'p9-m5',
  number: 5,
  title: 'Planning & Task Decomposition',
  subtitle: 'Hierarchical Subtasks, DAG Execution, Dynamic Replanning & Overhead Limits',
  description:
    'Decompose complex multi-step objectives into executable Directed Acyclic Graphs (DAGs). Master Plan-and-Execute architectures, topological ordering, parallel branch resolution, and automated replanning upon tool failure.',
  icon: 'GitBranch',
  badge: 'Phase 9 · AI Agents',
  estimatedHours: 3,
  topicsCount: 1,
  lessons: [
    {
      id: 'agent-05-planning',
      moduleId: 'p9-m5',
      title: 'Agent-05: Task Decomposition, DAG Planning & Dynamic Replanning',
      description:
        'Hierarchical subtask trees, topological dependency scheduling, parallel branches, failure replanning, and planning overhead trade-offs.',
      order: 1,
      readTimeMinutes: 35,
      visualizerType: 'agent-planning-explorer',
      difficulty: 'Advanced',
    },
  ],
};

// =========================================================================
// MODULE 6: Workflow Orchestration (p9-m6)
// =========================================================================
export const p9m6Data: ModuleData = {
  id: 'p9-m6',
  number: 6,
  title: 'Workflow Orchestration & State Graphs',
  subtitle: 'Sequential Chaining, Conditional Branching, Parallelism & Idempotency',
  description:
    'Engineer deterministic, graph-based agent orchestration systems (LangGraph / Temporal pattern). Contrast open-ended loops with stateful workflows, implement conditional routing, and guarantee failure recovery with idempotent retries.',
  icon: 'Workflow',
  badge: 'Phase 9 · AI Agents',
  estimatedHours: 3,
  topicsCount: 1,
  lessons: [
    {
      id: 'agent-06-orchestration',
      moduleId: 'p9-m6',
      title: 'Agent-06: Workflow Orchestration, State Machines & Idempotent Retries',
      description:
        'Graph state machines, conditional routers, parallel branch joins, state accumulation, and idempotent retry policies.',
      order: 1,
      readTimeMinutes: 33,
      visualizerType: 'agent-workflow-graph-explorer',
      difficulty: 'Intermediate',
    },
  ],
};

// =========================================================================
// LESSON CONTENTS (Modules 4 - 6)
// =========================================================================
export const agentModule2Lessons: Record<string, LessonContent> = {
  'agent-04-state-memory': {
    id: 'agent-04-state-memory',
    moduleId: 'p9-m4',
    title: 'Agent-04: Working State, Memory Tiers & Compaction',
    subtitle: 'From Ephemeral Scratchpads to Long-Term Episodic Recall & Context Compaction',
    order: 1,
    readTimeMinutes: 34,
    difficulty: 'Intermediate',
    visualizerType: 'agent-memory-state-explorer',

    objectives: [
      'Architect a 3-tier memory model: Working State (Scratchpad), Short-Term History, and Long-Term Episodic Recall',
      'Implement context compaction via sliding window eviction and recursive LLM summarization',
      'Utilize vector databases as persistent semantic memory across disparate user sessions',
      'Manage session state isolation to prevent cross-tenant data contamination in multi-user applications',
      'Apply data privacy retention policies (GDPR Right to Be Forgotten, TTL-based eviction)',
    ],
    prerequisites: [
      'Agent-02: Core Architecture & Control Loops',
      'Phase 8: Embeddings & Vector Search fundamentals',
    ],
    previousLesson: {
      id: 'agent-03-tool-calling',
      title: 'Agent-03: Tool Calling, Function Schemas & Error Handling',
      moduleId: 'p9-m3',
    },

    analogy: {
      title: 'The Working Desk, Whiteboard, and Secure Filing Cabinet',
      text: 'Imagine an executive assistant operating in an office. The open notepad right under their pen is working memory (scratchpad)—holding immediate calculation steps and active variables for the current phone call. The large whiteboard on the wall is short-term dialogue memory—holding bullet points of what the manager requested during today’s meetings. When the whiteboard fills up, the assistant does not erase everything at random; they condense five meeting notes into three key action items (recursive summarization). Finally, the steel filing cabinet across the room is long-term episodic memory—holding customer profiles, past year preferences, and corporate policies indexed by topic (vector semantic search).',
      metaphor: 'Working memory is RAM; short-term dialogue is cache; episodic memory is indexed disk storage.',
    },

    problemSolved: {
      title: 'Overcoming the Finite Context Window and Long-Horizon Amnesia',
      description:
        'LLMs possess strictly bounded context windows. As multi-step agent trajectories proceed, raw conversation tokens quickly saturate the window, causing dramatic latency spikes, excessive inference costs, and degradation in instruction following. Memory systems systematically prune, summarize, and retrieve relevant facts on demand.',
      keyPoints: [
        'Context Saturation Prevention: Replaces thousand-token dialogue blocks with concise 50-token semantic summaries',
        'Cross-Session Continuity: Recalls user preferences and past project decisions days or weeks later',
        'State Isolation: Ensures confidential customer records do not leak into another user’s prompt buffer',
        'Deterministic State Persistence: Saves execution progress to durable databases so interrupted jobs resume cleanly',
      ],
    },

    intuition: {
      overview:
        'Memory management operates across three distinct temporal tiers, balancing immediate execution fidelity against long-term storage efficiency.',
      steps: [
        {
          step: 1,
          title: 'Working Memory (Ephemeral Scratchpad)',
          description:
            'Maintains active loop variables, intermediate math, and tool responses. Discarded as soon as the immediate task completes.',
        },
        {
          step: 2,
          title: 'Short-Term History (Dialogue Buffer)',
          description:
            'Tracks recent conversational turns. Managed via sliding windows (K most recent turns) or recursive summarization.',
        },
        {
          step: 3,
          title: 'Long-Term Semantic Store (Episodic Memory)',
          description:
            'Stores past facts, user preferences, and run summaries in a vector database, queried via cosine similarity.',
        },
      ],
    },

    mathematics: {
      overview:
        'Context memory compaction can be formalized as an information-theoretic lossy compression problem subject to token budget constraints.',
      foundations: [
        {
          name: 'Memory Budget Constraint',
          latex: 'L_{\\text{prompt}}(t) = |M_{\\text{work}}| + |M_{\\text{dialogue}}| + |M_{\\text{episodic}}| \\le B_{\\max}',
          explanation:
            'The total token sum of working scratchpad, dialogue buffer, and retrieved episodic memory must remain strictly below budget ceiling B_max.',
        },
        {
          name: 'Recursive Summarization Function',
          latex: 'M_{\\text{sum}}^{(k)} = \\text{LLM}_{\\text{summarize}}\\left( M_{\\text{sum}}^{(k-1)} \\cup \\{u_{t-m}, \\dots, u_t\\} \\right)',
          explanation:
            'Past summary M_sum is updated recursively with new conversation turns u_t, compressing token footprint while preserving salient constraints.',
        },
        {
          name: 'Episodic Memory Retrieval Utility',
          latex: '\\text{Score}(m_i, q) = \\alpha \\cdot \\cos(\\mathbf{e}_{m_i}, \\mathbf{e}_q) + \\beta \\cdot \\text{Recency}(m_i) + \\gamma \\cdot \\text{Importance}(m_i)',
          explanation:
            'Ranking candidate long-term memories combines semantic similarity with temporal decay and explicit importance weights (Generative Agents formulation).',
        },
      ],
    },

    derivation: {
      title: 'Derivation of Memory Compression Ratio and Token Cost Reduction',
      objective: 'Calculate the asymptotic token savings of recursive summarization over naive history concatenation.',
      steps: [
        {
          step: 1,
          label: 'Naive History Quadratic Token Growth',
          latex: '\\text{Tokens}_{\\text{naive}}(N) = \\sum_{i=1}^N i \\cdot L_{\\text{turn}} = \\frac{N(N+1)}{2} L_{\\text{turn}} = \\mathcal{O}(N^2)',
          explanation: 'Re-submitting the full uncompressed conversation on every step incurs quadratic cumulative token consumption.',
        },
        {
          step: 2,
          label: 'Bounded Summary Linear Growth',
          latex: '\\text{Tokens}_{\\text{compact}}(N) = \\sum_{i=1}^N (L_{\\text{summary}} + L_{\\text{recent}}) = N \\cdot (L_{\\text{sum}} + K \\cdot L_{\\text{turn}}) = \\mathcal{O}(N)',
          explanation: 'Maintaining a constant-size summary plus K recent turns reduces total trajectory token accumulation from O(N^2) to linear O(N).',
        },
        {
          step: 3,
          label: 'Cost Ratio Asymptote',
          latex: '\\lim_{N \\to \\infty} \\frac{\\text{Cost}_{\\text{compact}}}{\\text{Cost}_{\\text{naive}}} = \\lim_{N \\to \\infty} \\frac{2(L_{\\text{sum}} + K L_{\\text{turn}})}{(N+1) L_{\\text{turn}}} = 0',
          explanation: 'On long horizons, memory compaction provides orders-of-magnitude reduction in operational API expenditures.',
        },
      ],
    },

    variables: [
      { symbol: 'M_{\\text{work}}', name: 'Working Memory', description: 'Ephemeral scratchpad holding immediate variables' },
      { symbol: 'M_{\\text{sum}}', name: 'Recursive Summary', description: 'Dense text distillation of past interaction history' },
      { symbol: 'B_{\\max}', name: 'Context Token Budget', description: 'Maximum allowable prompt tokens for memory' },
      { symbol: '\\alpha, \\beta, \\gamma', name: 'Memory Utility Weights', description: 'Balancing factors for relevance, recency, and importance' },
    ],

    numericalExample: {
      scenario: 'Comparing token load over 20 agent iterations with and without recursive summarization (turn length = 120 tokens, summary = 80 tokens)',
      dataset: [
        { approach: 'Naive Full History', formula: '20 * 21 / 2 * 120', tokens: 25200, costAt2PerM: '$0.0504' },
        { approach: 'Recursive Summary (K=2)', formula: '20 * (80 + 2 * 120)', tokens: 6400, costAt2PerM: '$0.0128' },
      ],
      calculations: [
        { step: 'Compute Naive Tokens', math: '(20 * 21 / 2) * 120', result: '25,200 tokens' },
        { step: 'Compute Compact Tokens', math: '20 * (80 + 240)', result: '6,400 tokens' },
        { step: 'Token Reduction Ratio', math: '1 - (6400 / 25200)', result: '74.6% token savings' },
      ],
      finalConclusion: 'Memory compaction slashed token expenditure by 74.6% while preserving essential user constraints.',
    },

    visualExplanation: {
      title: 'Tri-Tier Agent Memory Architecture',
      description: 'Observe how data flows between fast volatile scratchpads and persistent storage.',
      features: [
        'Working Memory: Active tool outputs & intermediate variables (cleared each turn)',
        'Short-Term Buffer: Last K turns + condensed summary block injected in system prompt',
        'Long-Term Store: Vector DB holding user profile embeddings, queried selectively via cosine similarity',
        'Privacy Boundary: Strict cryptographic user ID segregation prevents cross-tenant access',
      ],
    },

    scratchCode: {
      title: 'Sliding Window & Summarization Memory Buffer in Pure Python',
      code: `class AgentMemoryManager:
    def __init__(self, max_buffer_turns=3):
        self.max_buffer_turns = max_buffer_turns
        self.summary = ""
        self.buffer = []
        self.episodic_store = {}

    def add_turn(self, role: str, content: str):
        self.buffer.append({"role": role, "content": content})
        if len(self.buffer) > self.max_buffer_turns * 2:
            self._compact_buffer()

    def _compact_buffer(self):
        # Evict oldest turns and fold into summary
        old_turns = self.buffer[:2]
        self.buffer = self.buffer[2:]
        evicted_text = "; ".join([f"{t['role']}: {t['content']}" for t in old_turns])
        
        # Simulate LLM summary update
        if not self.summary:
            self.summary = f"[Summary of early conversation: {evicted_text}]"
        else:
            self.summary += f" [Updated: {evicted_text}]"
        print(f"--> Compacted Memory! New Summary length: {len(self.summary)} chars")

    def get_prompt_context(self):
        parts = []
        if self.summary:
            parts.append(f"PAST CONTEXT SUMMARY: {self.summary}")
        for t in self.buffer:
            parts.append(f"{t['role'].upper()}: {t['content']}")
        return "\\n".join(parts)

# Simulate 8 conversational turns
mem = AgentMemoryManager(max_buffer_turns=2)
turns = [
    ("user", "My company is BioPharma Inc, founded in 2018."),
    ("assistant", "Noted. How can I assist BioPharma today?"),
    ("user", "We focus strictly on mRNA vaccine research."),
    ("assistant", "Understood. mRNA oncology and infectious diseases."),
    ("user", "What is our Q3 clinical trial deadline?"),
    ("assistant", "Your trial deadline is September 30."),
    ("user", "Please format all upcoming dates in ISO 8601."),
    ("assistant", "Will use YYYY-MM-DD format for all schedules.")
]

for role, text in turns:
    mem.add_turn(role, text)

print("\\nFinal Context Injected to Prompt:\\n" + mem.get_prompt_context())`,
      explanation:
        'Demonstrates sliding window eviction and recursive summarization in pure Python, maintaining bounded context length across indefinite turns.',
    },

    sklearnCode: {
      title: 'Persistent Vector Memory Search with Cosine Similarity',
      code: `import numpy as np

class VectorMemoryStore:
    def __init__(self):
        self.memories = []
        self.embeddings = []

    def store(self, text: str, vector: list):
        self.memories.append(text)
        self.embeddings.append(np.array(vector, dtype=float))

    def recall(self, query_vector: list, top_k=2):
        if not self.embeddings:
            return []
        q = np.array(query_vector, dtype=float)
        q_norm = q / (np.linalg.norm(q) + 1e-9)
        
        scores = []
        for idx, emb in enumerate(self.embeddings):
            e_norm = emb / (np.linalg.norm(emb) + 1e-9)
            sim = float(np.dot(q_norm, e_norm))
            scores.append((sim, self.memories[idx]))
            
        scores.sort(key=lambda x: x[0], reverse=True)
        return scores[:top_k]

store = VectorMemoryStore()
# Store mock memories with 3D normalized embeddings
store.store("User prefers concise bullet points without pleasantries.", [0.9, 0.1, 0.0])
store.store("Operating currency is GBP; financial year ends March 31.", [0.1, 0.9, 0.2])
store.store("Customer server cluster runs Debian 12 on AWS.", [0.0, 0.3, 0.9])

# Query for writing preferences
matches = store.recall([0.85, 0.15, 0.0], top_k=1)
print("Top Recalled Memory:", matches[0][1], f"(Similarity: {matches[0][0]:.3f})")`,
      explanation:
        'Implements lightweight episodic memory retrieval using vector dot product similarity to recall persistent user preferences across sessions.',
    },

    runnableCode: {
      code: `def simulate_memory_tiers():
    working_scratchpad = "Step 2/3: Computed mean=42.1, std_dev=3.2"
    short_term_dialogue = ["User: 'Calculate metric'", "Agent: 'Fetching data'"]
    recalled_long_term = "Preference: Format floats to 2 decimal places"
    
    prompt = f"""--- System Memory ---
Episodic: {recalled_long_term}
History: {'; '.join(short_term_dialogue)}
Scratchpad: {working_scratchpad}
Action: Generate final formatted report."""
    return prompt

print(simulate_memory_tiers())`,
      expectedOutput: `--- System Memory ---
Episodic: Preference: Format floats to 2 decimal places
History: User: 'Calculate metric'; Agent: 'Fetching data'
Scratchpad: Step 2/3: Computed mean=42.1, std_dev=3.2
Action: Generate final formatted report.`,
    },

    lineByLineExplanation: [
      { lines: '2-4', codeSnippet: 'working_scratchpad = ...; short_term_dialogue = ...', explanation: 'Initializes the three distinct temporal memory tiers.' },
      { lines: '6-11', codeSnippet: 'prompt = f"""--- System Memory ---...', explanation: 'Synthesizes all tiers into an organized system prompt without polluting the main reasoning context.' },
    ],

    hyperparameters: [
      { name: 'max_buffer_turns', defaultVal: '4', range: '2 - 10', effect: 'Number of raw dialogue turns preserved before compaction', recommendation: 'Keep at 3-5 turns to maintain immediate conversational nuance.' },
      { name: 'memory_retrieval_top_k', defaultVal: '2', range: '1 - 5', effect: 'Number of episodic memories recalled per turn', recommendation: 'Recall only top 2-3 memories to prevent prompt bloat.' },
    ],

    assumptions: [
      { assumption: 'Summarization Fidelity', whyItMatters: 'Lossy compression may drop subtle user constraints', howToVerify: 'Instruct the summarizer to specifically extract named entities and rules.' },
      { assumption: 'Tenant Isolation', whyItMatters: 'Cross-tenant memory leakage causes severe compliance and privacy breaches', howToVerify: 'Enforce user_id partitioning in all vector queries and database tables.' },
    ],

    commonMistakes: [
      {
        mistake: 'Persisting raw conversation transcripts forever without a Time-To-Live (TTL)',
        solution: 'Apply retention policies (e.g. 30 days) and automated anonymization.',
        whyWrong: 'Violates GDPR compliance and inflates database storage costs indefinitely.',
        howToFix: 'Add created_at timestamps and automated scheduled deletion jobs.',
      },
      {
        mistake: 'Storing API keys or passwords in the long-term agent memory store',
        solution: 'Run regex PII and secret scrubbers before writing memories to vector databases.',
        whyWrong: 'Exposes credentials to prompt injection attacks and unauthorized retrieval.',
        howToFix: 'Implement an automated pre-storage redaction interceptor.',
      },
    ],

    realWorldUseCases: [
      { industry: 'Personal Assistants', application: 'Executive AI Co-Pilot', benefit: 'Remembers user schedule preferences, preferred airlines, and VIP contact lists across months.' },
      { industry: 'Customer CRM', application: 'Enterprise Relationship Manager', benefit: 'Maintains long-term interaction history and past negotiations across sales conversations.' },
    ],

    practiceQuestions: [
      {
        id: 'pq-mem-1',
        question: 'What is the key advantage of recursive summarization over a naive sliding window that drops old turns?',
        hint: 'What happens to crucial constraints mentioned in turn 1?',
        answer: 'Recursive summarization preserves essential facts and constraints established early in the conversation, whereas a sliding window permanently discards them once they age out.',
        explanation: 'Summaries retain semantic essence while discarding redundant token filler.',
      },
      {
        id: 'pq-mem-2',
        question: 'How does episodic memory differ from working memory in an autonomous agent?',
        hint: 'Consider persistence and scope.',
        answer: 'Working memory is volatile and scoped strictly to the current multi-step loop; episodic memory is persistent across days or sessions, stored externally in a database.',
        explanation: 'Working memory clears upon task termination; episodic memory persists in durable storage.',
      },
      {
        id: 'pq-mem-3',
        question: 'Why must agent memory systems enforce strict multi-tenant isolation?',
        hint: 'What if User A and User B share the same company platform?',
        answer: 'To prevent confidential or private data from one user from being retrieved and injected into another user’s prompt buffer.',
        explanation: 'Strict cryptographic user and organization scoping is mandatory for enterprise security.',
      },
    ],

    quiz: [
      {
        id: 'qz-mem-1',
        question: 'Which tier of agent memory is best suited for storing intermediate scratchpad calculations?',
        options: ['Long-Term Episodic Vector Store', 'Working Memory / Scratchpad', 'Public Cloud CDN', 'Permanent Archival Tape'],
        correctIndex: 1,
        explanation: 'Working memory is ephemeral, fast, and specifically designed for active loop calculations.',
      },
      {
        id: 'qz-mem-2',
        question: 'If an agent conversation reaches 100 turns, what is the asymptotic token complexity of uncompressed naive prompt re-submission?',
        options: ['O(1)', 'O(log N)', 'O(N^2)', 'O(N!)'],
        correctIndex: 2,
        explanation: 'Re-submitting all past turns on every step results in quadratic O(N^2) cumulative token consumption.',
      },
      {
        id: 'qz-mem-3',
        question: 'What should be done before writing text into an agent’s persistent long-term memory?',
        options: [
          'Run automated secret and PII scrubbers to prevent credential leakage',
          'Translate the text into binary machine code',
          'Delete all other memories in the database',
          'Increase the temperature to 1.0',
        ],
        correctIndex: 0,
        explanation: 'Scrubbing PII and secrets prevents sensitive credentials from being stored and later exposed via retrieval.',
      },
    ],

    independentExercise: {
      id: 'ex-04-lru-memory',
      title: 'Build an LRU Memory Eviction Cache',
      problem: 'Write a Python class `LRUMemory(capacity)` with methods `put(key, val, importance)` and `get(key)`. When capacity is exceeded, evict the item with the lowest importance score. Return the evicted key.',
      hints: ['Store items in a dictionary and find min importance when len > capacity.'],
      starterCode: `class LRUMemory:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.data = {}

    def put(self, key: str, val: str, importance: float):
        # TODO: Implement eviction
        pass

    def get(self, key: str):
        return self.data.get(key, {}).get("val")

mem = LRUMemory(capacity=2)
mem.put("k1", "Low pri", 0.2)
mem.put("k2", "High pri", 0.9)
evicted = mem.put("k3", "Med pri", 0.5)
print("Evicted:", evicted)
print("Remaining:", list(mem.data.keys()))`,
      solution: `class LRUMemory:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.data = {}

    def put(self, key: str, val: str, importance: float):
        evicted_key = None
        if len(self.data) >= self.capacity and key not in self.data:
            # Find item with lowest importance
            min_k = min(self.data.keys(), key=lambda k: self.data[k]["importance"])
            del self.data[min_k]
            evicted_key = min_k
            
        self.data[key] = {"val": val, "importance": importance}
        return evicted_key

    def get(self, key: str):
        return self.data.get(key, {}).get("val")

mem = LRUMemory(capacity=2)
mem.put("k1", "Low pri", 0.2)
mem.put("k2", "High pri", 0.9)
evicted = mem.put("k3", "Med pri", 0.5)
print("Evicted:", evicted)
print("Remaining:", list(mem.data.keys()))`,
    },

    summary: {
      keyTakeaways: [
        'Agent memory is divided into Working State, Short-Term History, and Long-Term Episodic Recall.',
        'Recursive summarization and sliding window buffers prevent quadratic context token growth.',
        'Episodic memory uses vector embeddings to retrieve relevant historical preferences across sessions.',
        'Strict tenant isolation, TTL retention policies, and secret scrubbing are essential enterprise requirements.',
      ],
      nextLessonId: 'agent-05-planning',
      nextLessonTitle: 'Agent-05: Task Decomposition, DAG Planning & Dynamic Replanning',
      nextLessonModuleId: 'p9-m5',
    },
  },

  'agent-05-planning': {
    id: 'agent-05-planning',
    moduleId: 'p9-m5',
    title: 'Agent-05: Task Decomposition, DAG Planning & Dynamic Replanning',
    subtitle: 'Breaking Complex Goals into Directed Acyclic Graphs with Adaptive Error Recovery',
    order: 1,
    readTimeMinutes: 35,
    difficulty: 'Advanced',
    visualizerType: 'agent-planning-explorer',

    objectives: [
      'Deconstruct ambiguous user objectives into structured subtask Directed Acyclic Graphs (DAGs)',
      'Distinguish sequential prerequisite dependencies from parallelizable execution branches',
      'Implement Plan-and-Execute (BabyAGI / Plan-and-Solve) architectures versus greedy step-by-step loops',
      'Design dynamic replanning routines that recalculate remaining task subgraphs upon tool failure',
      'Identify when upfront planning adds unnecessary latency and token overhead compared to direct execution',
    ],
    prerequisites: [
      'Agent-02: Core Architecture & Control Loops',
      'Basic graph theory concepts (DAGs, topological sorting, dependencies)',
    ],
    previousLesson: {
      id: 'agent-04-state-memory',
      title: 'Agent-04: Working State, Memory Tiers & Compaction',
      moduleId: 'p9-m4',
    },

    analogy: {
      title: 'The General Contractor and The Kitchen Remodel',
      text: 'A homeowner asking for a complete kitchen remodel cannot simply tell a carpenter to start hammering. A General Contractor first writes a structured blueprint: 1) Demolish cabinets, 2) Rough-in electrical and plumbing in parallel, 3) Install drywall, 4) Lay countertops, 5) Paint. Notice that electrical and plumbing can run simultaneously by independent specialists, but countertops cannot be installed before cabinets exist (dependency graph). If the custom quartz countertop arrives cracked (tool execution failure), the contractor does not demolish the house and start over; they execute an adaptive replan: install temporary plywood, proceed with painting, and reorder quartz from an expedited supplier.',
      metaphor: 'The initial plan is a DAG; tasks are graph nodes; dependencies are directed edges; replanning is graph mutation.',
    },

    problemSolved: {
      title: 'Preventing Myopic Greedy Failures on Long-Horizon Tasks',
      description:
        'Standard ReAct agents make greedy next-step decisions. On tasks requiring 8+ sequential steps, greedy agents frequently lose track of the overarching goal, execute redundant operations, or reach dead ends without knowing how to backtrack. Explicit planning creates an overarching roadmap and tracks milestone completion.',
      keyPoints: [
        'Global Horizon Visibility: The agent maintains an explicit list of pending, in-progress, and completed subgoals',
        'Parallel Speedup: Independent tasks execute concurrently rather than sequentially',
        'Resilience via Replanning: Failures prompt surgical modification of remaining tasks without restarting from scratch',
        'Cost Containment: Prevents wandering aimlessly across dozens of exploratory turns',
      ],
    },

    intuition: {
      overview:
        'A Plan-and-Execute agent decouples task planning (strategic macro-reasoning) from task execution (tactical micro-tool usage).',
      steps: [
        {
          step: 1,
          title: 'Macro Planning Phase',
          description:
            'A specialized planner LLM decomposes the user goal into a topologically sorted list of subtasks with explicit prerequisite IDs.',
        },
        {
          step: 2,
          title: 'Topological Dispatch',
          description:
            'The orchestrator identifies all tasks whose dependencies are fully satisfied and dispatches them (in parallel if independent).',
        },
        {
          step: 3,
          title: 'Execution & Verification',
          description:
            'Specialist worker agents execute assigned tools, validating return values against expected schemas.',
        },
        {
          step: 4,
          title: 'Dynamic Evaluation & Replanning',
          description:
            'If a subtask succeeds, dependent tasks unlock. If a subtask fails, the replanner mutates the remaining DAG with fallback alternatives.',
        },
      ],
    },

    mathematics: {
      overview:
        'An agent plan is formalized as a Directed Acyclic Graph G = (V, E) where vertices V represent subtasks and directed edges E represent strict dependency ordering.',
      foundations: [
        {
          name: 'Task Dependency DAG',
          latex: 'G = (V, E), \\quad e_{ij} = (v_i, v_j) \\in E \\iff v_i \\prec v_j',
          explanation:
            'Subtask v_j cannot begin execution until subtask v_i has completed and published its output payload into the state accumulator.',
        },
        {
          name: 'Topological Execution Readiness',
          latex: '\\text{Ready}(v_j) = \\text{True} \\iff \\forall v_i \\in \\text{Parents}(v_j), \\text{Status}(v_i) = \\text{COMPLETED}',
          explanation:
            'A subtask is ready for dispatch if and only if all parent dependency nodes report successful completion.',
        },
        {
          name: 'Dynamic Graph Mutation Function',
          latex: 'G_{t+1} = \\text{Replan}(G_t, v_{\\text{failed}}, e_{\\text{error}})',
          explanation:
            'Upon failure of task v_failed, the replanning operator prunes invalid downstream edges and inserts alternative subtask nodes.',
        },
      ],
    },

    derivation: {
      title: 'Derivation of Parallel Execution Time Reduction via Critical Path Analysis',
      objective: 'Calculate latency speedup of DAG parallelization compared to sequential execution.',
      steps: [
        {
          step: 1,
          label: 'Sequential Trajectory Latency',
          latex: 'T_{\\text{seq}} = \\sum_{i=1}^{|V|} t(v_i)',
          explanation: 'Running all subtasks sequentially takes time equal to the sum of all individual task execution times.',
        },
        {
          step: 2,
          label: 'Critical Path Bound',
          latex: 'T_{\\text{DAG}} = \\max_{p \\in \\text{Paths}(G)} \\sum_{v \\in p} t(v)',
          explanation: 'With parallel execution of independent branches, total latency is bounded strictly by the longest directed path (critical path).',
        },
        {
          step: 3,
          label: 'Theoretical Speedup Ratio',
          latex: 'S = \\frac{T_{\\text{seq}}}{T_{\\text{DAG}}} = \\frac{\\sum_{i} t(v_i)}{\\max_{p} \\sum_{v \\in p} t(v)} \\ge 1',
          explanation: 'Parallel DAG dispatch achieves substantial wall-clock speedups, especially for I/O bound tool invocations.',
        },
      ],
    },

    variables: [
      { symbol: 'G = (V, E)', name: 'Plan DAG', description: 'Graph of subtasks V and prerequisite edges E' },
      { symbol: 'v_{\\text{failed}}', name: 'Failed Task Node', description: 'Subtask that threw an unrecoverable runtime exception' },
      { symbol: 'T_{\\text{DAG}}', name: 'Critical Path Duration', description: 'Wall-clock time of the longest sequential dependency chain' },
      { symbol: 'S', name: 'Speedup Factor', description: 'Ratio of sequential latency to parallel DAG latency' },
    ],

    numericalExample: {
      scenario: 'Executing a 4-task market research plan: Task 1 (1.0s), Task 2a & 2b independent (2.0s and 2.5s), Task 3 dependent on both (1.5s)',
      dataset: [
        { task: 'T1: Parse Query', duration: 1.0, deps: 'none' },
        { task: 'T2a: Query Database', duration: 2.0, deps: 'T1' },
        { task: 'T2b: Fetch SEC Filing', duration: 2.5, deps: 'T1' },
        { task: 'T3: Synthesize Report', duration: 1.5, deps: 'T2a, T2b' },
      ],
      calculations: [
        { step: 'Sequential Total', math: '1.0 + 2.0 + 2.5 + 1.5', result: '7.0 seconds' },
        { step: 'Critical Path', math: '1.0 + max(2.0, 2.5) + 1.5 = 1.0 + 2.5 + 1.5', result: '5.0 seconds' },
        { step: 'Speedup Ratio', math: '7.0 / 5.0', result: '1.40x faster (28.6% latency reduction)' },
      ],
      finalConclusion: 'Parallel execution of independent retrieval branches saved 2.0 seconds of latency while preserving exact dependency contracts.',
    },

    visualExplanation: {
      title: 'Topological DAG Scheduling & Replanning Flow',
      description: 'Trace the lifecycle of subtask nodes from initial dependency resolution to failure rerouting.',
      features: [
        'Root Node: Executes immediately, unlocks child branches upon completion',
        'Parallel Fork: Dispatches multiple I/O queries concurrently to external APIs',
        'Dependency Barrier (Join): Waits until all prerequisite branches publish outputs',
        'Dynamic Replan: Replaces broken nodes with alternative tools without restarting verified parent tasks',
      ],
    },

    scratchCode: {
      title: 'Topological DAG Task Scheduler in Pure Python',
      code: `class TaskNode:
    def __init__(self, id, title, deps, action_fn):
        self.id = id
        self.title = title
        self.deps = deps
        self.action_fn = action_fn
        self.status = "pending"  # pending, completed, failed
        self.output = None

class DAGPlanner:
    def __init__(self):
        self.tasks = {}

    def add_task(self, id, title, deps, action_fn):
        self.tasks[id] = TaskNode(id, title, deps, action_fn)

    def execute_all(self):
        results = {}
        iteration = 0
        
        while any(t.status == "pending" for t in self.tasks.values()):
            iteration += 1
            # Find all tasks whose dependencies are satisfied
            ready_tasks = [
                t for t in self.tasks.values()
                if t.status == "pending" and all(self.tasks[d].status == "completed" for d in t.deps)
            ]
            
            if not ready_tasks:
                print("Deadlock or circular dependency detected!")
                break
                
            print(f"\\n[Batch {iteration}] Executing {len(ready_tasks)} ready tasks...")
            for t in ready_tasks:
                try:
                    # Pass outputs of dependencies
                    dep_outputs = {d: self.tasks[d].output for d in t.deps}
                    t.output = t.action_fn(dep_outputs)
                    t.status = "completed"
                    print(f"  -> Task [{t.id}] '{t.title}' COMPLETED. Output: {t.output}")
                except Exception as e:
                    t.status = "failed"
                    print(f"  -> Task [{t.id}] FAILED with error: {e}")
                    
        return {t.id: t.output for t in self.tasks.values() if t.status == "completed"}

planner = DAGPlanner()
planner.add_task("t1", "Extract Ticker", [], lambda _: "NVDA")
planner.add_task("t2a", "Fetch Current Stock Price", ["t1"], lambda d: f"Price({d['t1']}) = $140.00")
planner.add_task("t2b", "Fetch Analyst Consensus", ["t1"], lambda d: f"Rating({d['t1']}) = Strong Buy")
planner.add_task("t3", "Generate Executive Brief", ["t2a", "t2b"], lambda d: f"Brief: {d['t2a']} with consensus {d['t2b']}.")

res = planner.execute_all()
print("\\nFinal Brief:", res.get("t3"))`,
      explanation:
        'Implements a dependency-aware topological scheduler that executes ready tasks in parallel batches and feeds outputs into downstream nodes.',
    },

    sklearnCode: {
      title: 'Plan-and-Solve Dynamic Replanner Pattern',
      code: `import json

class PlanAndSolveAgent:
    def __init__(self):
        self.plan = []

    def create_initial_plan(self, goal: str):
        # Simulated LLM planner decomposing goal
        self.plan = [
            {"id": 1, "task": "Check inventory database for Item X", "tool": "sql_query", "status": "pending"},
            {"id": 2, "task": "Validate warehouse shipping rules", "tool": "policy_rag", "status": "pending"},
            {"id": 3, "task": "Book logistics courier", "tool": "shipping_api", "status": "pending"}
        ]
        return self.plan

    def replan_on_failure(self, failed_task_id: int, error_msg: str):
        print(f"\\n[Replanner] Intervening on Task #{failed_task_id} Failure: {error_msg}")
        # Mutate plan: Replace shipping_api with local courier backup
        new_plan = []
        for t in self.plan:
            if t["id"] == failed_task_id:
                new_plan.append({"id": t["id"], "task": "[Fallback] Dispatch internal fleet courier", "tool": "internal_fleet_api", "status": "pending"})
            else:
                new_plan.append(t)
        self.plan = new_plan
        return self.plan

agent = PlanAndSolveAgent()
plan = agent.create_initial_plan("Ship Item X to Customer")
print("Initial Plan:", [t["task"] for t in plan])
replanned = agent.replan_on_failure(3, "HTTP 503: External logistics gateway down")
print("Replanned:", [t["task"] for t in replanned])`,
      explanation:
        'Demonstrates runtime graph mutation where an unexpected tool failure triggers dynamic fallback insertion while preserving verified upstream progress.',
    },

    runnableCode: {
      code: `def trace_dag_execution():
    steps = [
        "1. [Root] Extracted requirements -> Entity: 'Server Cluster A'",
        "2. [Parallel Fork] Branch A: Ping server telemetry (OK, latency 12ms)",
        "3. [Parallel Fork] Branch B: Query error log database (Found 2 alerts)",
        "4. [Join Barrier] Synthesizing alerts with network latency -> Root cause identified."
    ]
    return "\\n".join(steps)

print(trace_dag_execution())`,
      expectedOutput: `1. [Root] Extracted requirements -> Entity: 'Server Cluster A'
2. [Parallel Fork] Branch A: Ping server telemetry (OK, latency 12ms)
3. [Parallel Fork] Branch B: Query error log database (Found 2 alerts)
4. [Join Barrier] Synthesizing alerts with network latency -> Root cause identified.`,
    },

    lineByLineExplanation: [
      { lines: '1-6', codeSnippet: 'steps = [ "1. [Root]...', explanation: 'Traces the execution stages of a fork-join DAG workflow with parallel execution branches.' },
      { lines: '7-8', codeSnippet: 'return "\\n".join(steps)', explanation: 'Produces verified trace output confirming synchronization at the join barrier.' },
    ],

    hyperparameters: [
      { name: 'max_subtasks', defaultVal: '6', range: '2 - 12', effect: 'Caps total nodes in generated plan', recommendation: 'Keep <= 8 subtasks; excessive decomposition degrades execution focus.' },
      { name: 'max_replan_attempts', defaultVal: '2', range: '1 - 4', effect: 'Limits how many times replanning can trigger', recommendation: 'Cap at 2 to avoid infinite replanning loops upon hard outages.' },
    ],

    assumptions: [
      { assumption: 'Acyclicity Enforcement', whyItMatters: 'Cycles in dependency graphs cause permanent scheduling deadlocks', howToVerify: 'Verify in-degree ordering or run cycle detection (Tarjan algorithm).' },
      { assumption: 'Subtask Independence', whyItMatters: 'Tasks marked parallel must not share mutable global state', howToVerify: 'Ensure each subtask operates in an isolated context.' },
    ],

    commonMistakes: [
      {
        mistake: 'Decomposing trivial, 1-step tasks into elaborate multi-node plans',
        solution: 'Use direct greedy execution for simple questions; reserve planning for complex multi-system workflows.',
        whyWrong: 'Adds 2-3 extra LLM generation round-trips, multiplying latency and token expenses unnecessarily.',
        howToFix: 'Add a complexity classifier upfront to bypass planning for straightforward queries.',
      },
      {
        mistake: 'Restarting the entire plan from Task 1 when Task 4 encounters a tool timeout',
        solution: 'Execute dynamic surgical replanning on only the failed node and its downstream dependents.',
        whyWrong: 'Discards expensive verified results and risks duplicate side-effects (e.g. charging credit cards twice).',
        howToFix: 'Mark completed nodes as immutable and mutate only remaining pending nodes.',
      },
    ],

    realWorldUseCases: [
      { industry: 'Software Engineering', application: 'Automated Code Migration Agent', benefit: 'Plans file-by-file refactoring, runs static type checks, compiles, and replans when tests fail.' },
      { industry: 'Supply Chain', application: 'Multimodal Freight Dispatcher', benefit: 'Coordinates customs clearances, freight bookings, and reroutes shipments dynamically when ports close.' },
    ],

    practiceQuestions: [
      {
        id: 'pq-plan-1',
        question: 'What is the critical path in a project DAG, and why does it dictate wall-clock execution time?',
        hint: 'Consider the longest sequential chain of dependent tasks.',
        answer: 'The critical path is the longest sequence of dependent tasks that must be executed one after another; overall execution cannot finish faster than this path even with infinite parallel workers.',
        explanation: 'Any delay on the critical path directly delays total project completion.',
      },
      {
        id: 'pq-plan-2',
        question: 'What is the difference between ReAct and Plan-and-Solve architectures?',
        hint: 'When does planning take place?',
        answer: 'ReAct decides its next action greedily one step at a time; Plan-and-Solve generates a global multi-step plan upfront, then executes tasks systematically with replanning upon failure.',
        explanation: 'Plan-and-Solve reduces wandering on long horizons by establishing an explicit roadmap.',
      },
      {
        id: 'pq-plan-3',
        question: 'Why must dependency graphs be strictly acyclic (no cycles)?',
        hint: 'What happens if Task A depends on Task B, and Task B depends on Task A?',
        answer: 'A cycle creates a circular deadlock where neither task can ever satisfy its preconditions, freezing the agent scheduler permanently.',
        explanation: 'Acyclic properties guarantee that at least one valid topological execution ordering exists.',
      },
    ],

    quiz: [
      {
        id: 'qz-plan-1',
        question: 'When should an AI agent system choose direct greedy execution over complex DAG planning?',
        options: [
          'When the user goal is simple, well-defined, and requires at most 1-2 straightforward tool calls',
          'When the task involves 15 interconnected enterprise databases',
          'When the system budget is infinite',
          'Never; all requests must generate a 10-node plan',
        ],
        correctIndex: 0,
        explanation: 'Generating complex plans for simple queries introduces unnecessary latency, token costs, and potential failure points.',
      },
      {
        id: 'qz-plan-2',
        question: 'In a DAG plan, which tasks can be safely executed in parallel?',
        options: [
          'Tasks that have a direct dependency edge between them',
          'Tasks that share no prerequisite dependencies on each other and whose parent tasks have both finished',
          'Only tasks that use the exact same tool with the same arguments',
          'No two tasks can ever run concurrently',
        ],
        correctIndex: 1,
        explanation: 'Tasks whose prerequisite dependencies have completed and that do not depend on one another can execute simultaneously.',
      },
      {
        id: 'qz-plan-3',
        question: 'What is surgical replanning?',
        options: [
          'Deleting the whole codebase and rewriting the application',
          'Modifying only the failed subtask and its downstream dependents while preserving verified upstream results',
          'Rerunning the exact same failed tool 100 times',
          'Asking the user to solve the problem manually',
        ],
        correctIndex: 1,
        explanation: 'Surgical replanning preserves completed work, mutating only the broken node and dependent branches.',
      },
    ],

    independentExercise: {
      id: 'ex-05-topological-sorter',
      title: 'Implement a Dependency Graph Validator',
      problem: 'Write a Python function `can_execute_plan(tasks)` where `tasks` is a dict of `{task_id: [dependency_ids]}`. Return `True` if the graph is valid and acyclic (can be executed to completion), or `False` if there is a cycle or missing dependency.',
      hints: ['Check that all dependency IDs exist in the dict and detect cycles using DFS or Kahn algorithm.'],
      starterCode: `def can_execute_plan(tasks: dict):
    # TODO: Check validity and cycles
    pass

# Test 1: Valid DAG
t_valid = {"A": [], "B": ["A"], "C": ["A", "B"]}
print("Valid DAG:", can_execute_plan(t_valid))

# Test 2: Cyclic Deadlock (A->B->A)
t_cycle = {"A": ["B"], "B": ["A"]}
print("Cyclic DAG:", can_execute_plan(t_cycle))`,
      solution: `def can_execute_plan(tasks: dict):
    # Verify all dependencies exist in task keys
    for t_id, deps in tasks.items():
        for d in deps:
            if d not in tasks:
                return False
                
    # Kahn's algorithm for topological sorting
    in_degree = {k: 0 for k in tasks}
    for t_id, deps in tasks.items():
        in_degree[t_id] = len(deps)
        
    queue = [k for k, deg in in_degree.items() if deg == 0]
    visited_count = 0
    
    # Reverse mapping: parent -> children
    children = {k: [] for k in tasks}
    for t_id, deps in tasks.items():
        for d in deps:
            children[d].append(t_id)
            
    while queue:
        curr = queue.pop(0)
        visited_count += 1
        for child in children[curr]:
            in_degree[child] -= 1
            if in_degree[child] == 0:
                queue.append(child)
                
    return visited_count == len(tasks)

t_valid = {"A": [], "B": ["A"], "C": ["A", "B"]}
print("Valid DAG:", can_execute_plan(t_valid))

t_cycle = {"A": ["B"], "B": ["A"]}
print("Cyclic DAG:", can_execute_plan(t_cycle))`,
    },

    summary: {
      keyTakeaways: [
        'Planning decomposes complex objectives into Directed Acyclic Graphs (DAGs) with explicit dependencies.',
        'Independent branches execute concurrently, reducing wall-clock latency to the critical path.',
        'Dynamic replanning modifies broken branches upon tool failure without discarding verified upstream progress.',
        'Do not over-plan: straightforward queries should execute directly without multi-node planning overhead.',
      ],
      nextLessonId: 'agent-06-orchestration',
      nextLessonTitle: 'Agent-06: Workflow Orchestration, State Machines & Idempotent Retries',
      nextLessonModuleId: 'p9-m6',
    },
  },

  'agent-06-orchestration': {
    id: 'agent-06-orchestration',
    moduleId: 'p9-m6',
    title: 'Agent-06: Workflow Orchestration, State Machines & Idempotent Retries',
    subtitle: 'Deterministic State Graphs, Conditional Branching, Join Barriers & Safe Recovery',
    order: 1,
    readTimeMinutes: 33,
    difficulty: 'Intermediate',
    visualizerType: 'agent-workflow-graph-explorer',

    objectives: [
      'Architect resilient state graph workflows (LangGraph / Temporal patterns) with explicit node transitions',
      'Implement conditional routers that evaluate model confidence scores before dispatching to specialists',
      'Manage global state accumulators across sequential, parallel, and looped execution branches',
      'Design idempotent retry policies with exponential backoff and jitter for flaky external APIs',
      'Establish clear boundaries between deterministic business workflows and non-deterministic agentic deliberation',
    ],
    prerequisites: [
      'Agent-02: Core Architecture & Control Loops',
      'Agent-05: Planning & Task Decomposition',
    ],
    previousLesson: {
      id: 'agent-05-planning',
      title: 'Agent-05: Task Decomposition, DAG Planning & Dynamic Replanning',
      moduleId: 'p9-m5',
    },

    analogy: {
      title: 'The Modern Automobile Assembly Line with Quality Inspector Gates',
      text: 'On a car manufacturing line, the vehicle chassis moves along a fixed steel conveyor track (deterministic workflow graph). At Station 1, the robotic arm welds the frame. At Station 2, the engine is bolted on. However, between Station 2 and Station 3, there is a laser inspection station (conditional router). If the laser detects a bolt torqued incorrectly, the track switches the chassis to a specialized diagnostic bay (specialist agent loop) where an experienced mechanic investigates the anomaly. Once repaired, the car merges back into the main conveyor line. The overall factory is deterministic and rigid, while the diagnostic bay is flexible and adaptive.',
      metaphor: 'The assembly track is the state machine graph; the diagnostic bay is the autonomous agent; the switch track is conditional routing.',
    },

    problemSolved: {
      title: 'Taming Agent Stochasticity in Enterprise Production Systems',
      description:
        'Fully autonomous agents running unconstrained while-loops are unpredictable: they can hallucinate non-existent steps, take meandering routes, or execute irreversible database writes prematurely. Graph-based orchestration anchors the agent inside a deterministic state machine, ensuring compliance with strict business rules while preserving reasoning flexibility at specific nodes.',
      keyPoints: [
        'Enforced Sequencing: Mandatory audit and validation steps cannot be skipped or bypassed by the model',
        'State Mutation Control: State transitions are governed by typed reducers, preventing corrupted memory',
        'Idempotency Guarantees: Re-executing a failed node does not create duplicate financial transactions',
        'Hybrid Reliability: Combines the 100% predictability of procedural code with the semantic power of LLMs',
      ],
    },

    intuition: {
      overview:
        'A graph orchestrator models an application as Nodes (functions/agents) connected by Edges (conditional transitions) operating over a shared typed State.',
      steps: [
        {
          step: 1,
          title: 'State Initialization',
          description:
            'A strongly-typed state dictionary is initialized with user inputs, credentials, and tracking metadata.',
        },
        {
          step: 2,
          title: 'Node Execution',
          description:
            'The active node executes its logic (Python code, SQL lookup, or LLM agent turn) and returns a state delta.',
        },
        {
          step: 3,
          title: 'State Reducer Update',
          description:
            'The orchestrator applies the state delta to the global state object using defined reducer rules.',
        },
        {
          step: 4,
          title: 'Conditional Edge Routing',
          description:
            'A conditional edge function inspects the updated state and selects the next destination node or terminates.',
        },
      ],
    },

    mathematics: {
      overview:
        'A graph workflow is a deterministic finite automaton (DFA) augmented with a state store: M = (Q, Sigma, delta, q_0, F).',
      foundations: [
        {
          name: 'State Transition Operator',
          latex: 'S_{t+1} = \\delta(S_t, f_v(S_t))',
          explanation:
            'Global state S_t is updated by state transition reducer delta taking current state and node computation f_v(S_t).',
        },
        {
          name: 'Conditional Router Decision',
          latex: '\\text{NextNode}(S) = \\begin{cases} v_{\\text{billing}} & \\text{if } P(\\text{intent} = \\text{refund}) \\ge \\theta \\\\ v_{\\text{tech}} & \\text{if } P(\\text{intent} = \\text{code}) \\ge \\theta \\\\ v_{\\text{escalate}} & \\text{otherwise} \\end{cases}',
          explanation:
            'Routing functions branch based on semantic classifier probabilities and explicit confidence threshold theta.',
        },
        {
          name: 'Idempotency Key Formulation',
          latex: 'K_{\\text{idemp}} = \\text{HMAC-SHA256}(\\text{session\\_id} \\parallel \\text{node\\_id} \\parallel \\text{step\\_count}, \\text{secret})',
          explanation:
            'Cryptographic tokens guarantee that re-running a failed node does not produce duplicate external mutations.',
        },
      ],
    },

    derivation: {
      title: 'Derivation of Exponential Backoff with Jitter for Resilient Retries',
      objective: 'Prevent thundering herd congestion when recovering from transient external API failures.',
      steps: [
        {
          step: 1,
          label: 'Deterministic Exponential Backoff',
          latex: 't_{\\text{wait}}(k) = t_{\\text{base}} \\cdot 2^k',
          explanation: 'Waiting exponentially longer on attempt k prevents hammering failing services.',
        },
        {
          step: 2,
          label: 'Thundering Herd Synchronization Risk',
          latex: '\\mathbb{E}[\\text{Load}(t)] = N_{\\text{clients}} \\cdot \\delta(t - t_{\\text{wait}})',
          explanation: 'Without randomization, hundreds of retrying clients re-hit the recovering server at the exact same millisecond.',
        },
        {
          step: 3,
          label: 'Full Jitter Randomization',
          latex: 't_{\\text{jitter}}(k) = \\text{Uniform}(0, \\min(t_{\\max}, t_{\\text{base}} \\cdot 2^k))',
          explanation: 'Injecting uniform random jitter decorrelates client retries, flattening server load and maximizing recovery probability.',
        },
      ],
    },

    variables: [
      { symbol: 'S_t', name: 'Workflow State', description: 'Typed dictionary representing the shared state accumulator' },
      { symbol: '\\theta', name: 'Confidence Threshold', description: 'Minimum probability required for autonomous specialist routing' },
      { symbol: 'K_{\\text{idemp}}', name: 'Idempotency Key', description: 'Unique transaction token preventing duplicate actions' },
      { symbol: 't_{\\text{jitter}}', name: 'Backoff Duration', description: 'Randomized sleep interval between retry attempts' },
    ],

    numericalExample: {
      scenario: 'Calculating exponential backoff intervals with base=1.0s, multiplier=2.0, max=16.0s across 4 retry attempts',
      dataset: [
        { attempt: 1, rawBackoff: '1.0 * 2^1 = 2.0s', jitterRange: '0.0s - 2.0s', sampledWait: '1.42s' },
        { attempt: 2, rawBackoff: '1.0 * 2^2 = 4.0s', jitterRange: '0.0s - 4.0s', sampledWait: '3.18s' },
        { attempt: 3, rawBackoff: '1.0 * 2^3 = 8.0s', jitterRange: '0.0s - 8.0s', sampledWait: '5.64s' },
        { attempt: 4, rawBackoff: '1.0 * 2^4 = 16.0s', jitterRange: '0.0s - 16.0s', sampledWait: '12.05s' },
      ],
      calculations: [
        { step: 'Compute Max Backoff Attempt 3', math: '1.0 * 2^3', result: '8.0 seconds' },
        { step: 'Sample Uniform Jitter', math: 'random(0.0, 8.0)', result: '5.64 seconds' },
        { step: 'Total Retry Delay', math: '1.42 + 3.18 + 5.64', result: '10.24 seconds cumulative' },
      ],
      finalConclusion: 'Jittered exponential backoff distributed retries safely over 10.24 seconds, allowing the remote service to recover.',
    },

    visualExplanation: {
      title: 'State Graph Architecture with Conditional Routing',
      description: 'Observe how typed state flows through nodes, conditional gates, and error handlers.',
      features: [
        'START Node: Validates auth token and initializes state accumulator',
        'Router Node: Evaluates query intent and dispatches to Billing vs Tech Specialist',
        'Specialist Node: Executes bounded ReAct loop with max 3 tool steps',
        'Audit Node: Appends trace logs, verifies outputs, and delivers final payload',
      ],
    },

    scratchCode: {
      title: 'State Graph Engine with Conditional Edges in Pure Python',
      code: `from typing import Dict, Any, Callable

class StateGraph:
    def __init__(self):
        self.nodes: Dict[str, Callable[[Dict[str, Any]], Dict[str, Any]]] = {}
        self.edges: Dict[str, str] = {}
        self.conditional_edges: Dict[str, Callable[[Dict[str, Any]], str]] = {}

    def add_node(self, name: str, fn: Callable[[Dict[str, Any]], Dict[str, Any]]):
        self.nodes[name] = fn

    def add_edge(self, from_node: str, to_node: str):
        self.edges[from_node] = to_node

    def add_conditional_edge(self, from_node: str, router_fn: Callable[[Dict[str, Any]], str]):
        self.conditional_edges[from_node] = router_fn

    def run(self, initial_state: Dict[str, Any], start_node: str):
        state = dict(initial_state)
        current = start_node
        
        while current != "__END__":
            print(f"-> Executing Node: [{current}]")
            node_fn = self.nodes.get(current)
            if not node_fn:
                raise ValueError(f"Node '{current}' not registered.")
                
            delta = node_fn(state)
            state.update(delta)
            
            # Determine next node
            if current in self.conditional_edges:
                current = self.conditional_edges[current](state)
            elif current in self.edges:
                current = self.edges[current]
            else:
                current = "__END__"
                
        return state

# Node Implementations
def classify_intent(s):
    query = s["user_query"].lower()
    if "refund" in query or "charge" in query:
        return {"intent": "billing"}
    return {"intent": "technical"}

def billing_worker(s):
    return {"resolution": "Refund of $49.00 processed via billing gateway."}

def tech_worker(s):
    return {"resolution": "Reset cache instructions dispatched."}

# Build Workflow Graph
workflow = StateGraph()
workflow.add_node("classify", classify_intent)
workflow.add_node("billing", billing_worker)
workflow.add_node("tech", tech_worker)

workflow.add_conditional_edge(
    "classify",
    lambda s: "billing" if s.get("intent") == "billing" else "tech"
)
workflow.add_edge("billing", "__END__")
workflow.add_edge("tech", "__END__")

final_state = workflow.run({"user_query": "I need a refund for my last invoice"}, "classify")
print("\\nWorkflow Result:", final_state.get("resolution"))`,
      explanation:
        'Implements a lightweight graph orchestrator mimicking the LangGraph pattern in pure Python with state accumulation and conditional edge dispatch.',
    },

    sklearnCode: {
      title: 'Idempotent Retry Wrapper with Exponential Backoff',
      code: `import time
import random

def execute_with_idempotent_retry(action_fn, idempotency_key: str, max_retries=3, base_wait=0.2):
    processed_keys = set()
    
    # Simulate existing completed transaction cache
    if idempotency_key in processed_keys:
        return {"status": "cached", "message": "Transaction already processed."}
        
    for attempt in range(1, max_retries + 1):
        try:
            print(f"Attempt {attempt} for key [{idempotency_key}]...")
            result = action_fn()
            processed_keys.add(idempotency_key)
            return {"status": "success", "result": result}
        except Exception as e:
            if attempt == max_retries:
                return {"status": "failed", "error": str(e)}
            # Jittered backoff
            sleep_time = random.uniform(0, base_wait * (2 ** attempt))
            print(f"  Transient failure ({e}). Retrying in {sleep_time:.2f}s...")
            time.sleep(sleep_time)

# Test with simulated flaky API that fails once
call_count = 0
def flaky_payment():
    global call_count
    call_count += 1
    if call_count == 1:
        raise ConnectionResetError("Remote server closed connection")
    return "Payment Transferred: $100.00"

res = execute_with_idempotent_retry(flaky_payment, idempotency_key="txn_uuid_88192")
print("Execution Result:", res)`,
      explanation:
        'Demonstrates safe idempotent retries with jittered backoff, ensuring network flickers do not create duplicate bank mutations.',
    },

    runnableCode: {
      code: `def simulate_conditional_routing(query, confidence):
    log = []
    log.append(f"Ingested Query: '{query}'")
    log.append(f"Intent Classification Confidence: {confidence:.2f}")
    
    if confidence < 0.70:
        destination = "Human Escalation Node"
    elif "sql" in query.lower() or "database" in query.lower():
        destination = "SQL Specialist Agent"
    else:
        destination = "General Q&A Agent"
        
    log.append(f"Routed To: [{destination}]")
    return "\\n".join(log)

print(simulate_conditional_routing("Query user purchase count from database", confidence=0.92))`,
      expectedOutput: `Ingested Query: 'Query user purchase count from database'
Intent Classification Confidence: 0.92
Routed To: [SQL Specialist Agent]`,
    },

    lineByLineExplanation: [
      { lines: '2-4', codeSnippet: 'log.append(f"Ingested Query...")...', explanation: 'Records input query and classifier confidence score.' },
      { lines: '6-11', codeSnippet: 'if confidence < 0.70: ... destination = ...', explanation: 'Evaluates guardrail confidence threshold before selecting specialized target node.' },
      { lines: '13-14', codeSnippet: 'log.append(f"Routed To: [{destination}]")', explanation: 'Outputs deterministic routing destination.' },
    ],

    hyperparameters: [
      { name: 'routing_confidence_threshold', defaultVal: '0.75', range: '0.5 - 0.9', effect: 'Minimum score to bypass human triage', recommendation: 'Set >= 0.75 for consequential financial or healthcare workflows.' },
      { name: 'max_retry_attempts', defaultVal: '3', range: '1 - 5', effect: 'Maximum tool re-executions', recommendation: 'Cap at 3 retries to prevent long request stalls.' },
    ],

    assumptions: [
      { assumption: 'Node Determinism', whyItMatters: 'Graph transitions must reliably converge on valid terminal states', howToVerify: 'Verify conditional edge functions with exhaustive test coverage.' },
      { assumption: 'State Reducer Immutability', whyItMatters: 'Direct mutation of global state objects can cause race conditions', howToVerify: 'Return state deltas and apply via immutable dict merging.' },
    ],

    commonMistakes: [
      {
        mistake: 'Retrying non-idempotent mutation APIs without idempotency tokens',
        solution: 'Always pass a unique transaction UUID with state-mutating requests.',
        whyWrong: 'Retrying on a network timeout can cause duplicate credit card charges or database records.',
        howToFix: 'Generate idempotency keys before the first call and reuse them across all retry attempts.',
      },
      {
        mistake: 'Creating an open-ended loop in the state graph without a counter threshold',
        solution: 'Track loop iterations in state and route to an exit node if count exceeds limit.',
        whyWrong: 'Nodes can endlessly bounce between each other, running up bills indefinitely.',
        howToFix: 'Enforce max_loop_iterations in the conditional routing function.',
      },
    ],

    realWorldUseCases: [
      { industry: 'Banking', application: 'Loan Approval Automation', benefit: 'Deterministic compliance checks, credit scoring, income verification, and underwriter escalation.' },
      { industry: 'HR Operations', application: 'Employee Onboarding Workflow', benefit: 'Provisions laptop hardware, sets up Active Directory, and schedules manager introductions.' },
    ],

    practiceQuestions: [
      {
        id: 'pq-orch-1',
        question: 'Why is graph-based orchestration preferred over free-form agent loops in regulated industries?',
        hint: 'Think about auditability and predictable constraints.',
        answer: 'Graph-based workflows strictly enforce mandatory compliance and verification steps that the model cannot hallucinate away or skip.',
        explanation: 'Enforces hard structural boundaries while allowing bounded autonomy within individual nodes.',
      },
      {
        id: 'pq-orch-2',
        question: 'What is the purpose of an idempotency key in distributed agent tool calls?',
        hint: 'What happens if a network packet drops after the server processed the payment?',
        answer: 'It ensures that if a network timeout causes the client to retry, the server recognizes the duplicate key and does not re-execute the mutation.',
        explanation: 'Idempotency keys prevent double-charging or duplicate record creation.',
      },
      {
        id: 'pq-orch-3',
        question: 'What is a join barrier in a parallel workflow graph?',
        hint: 'When does the downstream node begin?',
        answer: 'A join barrier is a synchronization point that pauses execution until all parallel branches have completed and published their state deltas.',
        explanation: 'Ensures downstream nodes have complete data from all prerequisite paths.',
      },
    ],

    quiz: [
      {
        id: 'qz-orch-1',
        question: 'In a graph-based workflow, what decides which node executes next?',
        options: [
          'The user pressing a physical button',
          'Conditional edge functions that inspect the updated global state',
          'Random number generators',
          'The client web browser cache',
        ],
        correctIndex: 1,
        explanation: 'Conditional edge functions evaluate state attributes (e.g. classification intent, error flags) to route execution.',
      },
      {
        id: 'qz-orch-2',
        question: 'Why should exponential backoff be combined with random jitter?',
        options: [
          'To make the code run slower on purpose',
          'To prevent the "thundering herd" problem where multiple retrying clients overwhelm the recovering server simultaneously',
          'To avoid using mathematical formulas',
          'To encrypt the network connection',
        ],
        correctIndex: 1,
        explanation: 'Jitter decorrelates client retry timings, spreading out traffic spikes and allowing the server to stabilize.',
      },
      {
        id: 'qz-orch-3',
        question: 'What is the recommended routing destination if intent classification confidence is below 70%?',
        options: [
          'A destructive database drop node',
          'A Human Escalation or clarification checkpoint',
          'Infinite retry loop',
          'Immediate application termination without explanation',
        ],
        correctIndex: 1,
        explanation: 'Low confidence indicates ambiguity; routing to human clarification prevents misguided autonomous actions.',
      },
    ],

    independentExercise: {
      id: 'ex-06-router-gate',
      title: 'Build a Confidence-Gated Router',
      problem: 'Write a Python function `route_request(query, confidence_score, threshold=0.75)` that returns `"human_triage"` if confidence is below threshold, `"refund_agent"` if "refund" is in query, and `"general_agent"` otherwise.',
      hints: ['Evaluate confidence threshold first before checking query text.'],
      starterCode: `def route_request(query: str, confidence_score: float, threshold: float = 0.75):
    # TODO: Implement routing logic
    pass

print(route_request("I want a refund", 0.85))
print(route_request("I want a refund", 0.60))
print(route_request("General info", 0.90))`,
      solution: `def route_request(query: str, confidence_score: float, threshold: float = 0.75):
    if confidence_score < threshold:
        return "human_triage"
    if "refund" in query.lower():
        return "refund_agent"
    return "general_agent"

print(route_request("I want a refund", 0.85))
print(route_request("I want a refund", 0.60))
print(route_request("General info", 0.90))`,
    },

    summary: {
      keyTakeaways: [
        'Graph-based workflow orchestration anchors agents within predictable state machines.',
        'Nodes execute discrete computation; conditional edges route execution based on updated state.',
        'Use idempotent retry policies with jittered exponential backoff for network resilience.',
        'Confidence gates route ambiguous or low-certainty requests to human review before action execution.',
      ],
      nextLessonId: 'agent-07-rag-agents',
      nextLessonTitle: 'Agent-07: Retrieval-Augmented Agents & Tool-Based Search',
      nextLessonModuleId: 'p9-m7',
    },
  },
};
