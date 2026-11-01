import { ModuleData, LessonContent } from '@/lib/types';

// =========================================================================
// MODULE 7: Retrieval-Augmented Agents (p9-m7)
// =========================================================================
export const p9m7Data: ModuleData = {
  id: 'p9-m7',
  number: 7,
  title: 'Retrieval-Augmented Agents',
  subtitle: 'Retrieval as a Dynamic Tool, Multi-Hop Search & Standard RAG vs Agentic RAG',
  description:
    'Integrate vector search and enterprise knowledge retrieval as first-class agent tools. Master iterative multi-hop retrieval, evidence evaluation, grounded citation generation, and understand when standard RAG pipelines outperform complex agentic RAG systems.',
  icon: 'Search',
  badge: 'Phase 9 · AI Agents',
  estimatedHours: 3,
  topicsCount: 1,
  lessons: [
    {
      id: 'agent-07-rag-agents',
      moduleId: 'p9-m7',
      title: 'Agent-07: Retrieval-Augmented Agents & Tool-Based Search',
      description:
        'Retrieval tools, multi-hop evidence evaluation, citation attribution, and architectural trade-offs between standard RAG and agentic RAG.',
      order: 1,
      readTimeMinutes: 34,
      visualizerType: 'rag-citation-grounding-explorer',
      difficulty: 'Intermediate',
    },
  ],
};

// =========================================================================
// MODULE 8: Multi-Agent Systems (p9-m8)
// =========================================================================
export const p9m8Data: ModuleData = {
  id: 'p9-m8',
  number: 8,
  title: 'Multi-Agent Systems & Coordination',
  subtitle: 'Supervisor-Worker Hierarchies, Peer Handoffs, Context Isolation & Overhead',
  description:
    'Architect collaborative multi-agent teams with specialized domain roles. Master supervisor-worker coordination, peer handoff protocols, context isolation to prevent prompt pollution, parallel aggregation, and failure mode mitigation.',
  icon: 'Users',
  badge: 'Phase 9 · AI Agents',
  estimatedHours: 3,
  topicsCount: 1,
  lessons: [
    {
      id: 'agent-08-multi-agent',
      moduleId: 'p9-m8',
      title: 'Agent-08: Multi-Agent Teams, Handoffs & Context Isolation',
      description:
        'Supervisor-worker patterns, message-passing handoff protocols, role specialization, shared blackboard vs isolated context, and coordination overhead.',
      order: 1,
      readTimeMinutes: 36,
      visualizerType: 'agent-multiagent-handoff-explorer',
      difficulty: 'Advanced',
    },
  ],
};

// =========================================================================
// MODULE 9: Human-in-the-Loop Agents (p9-m9)
// =========================================================================
export const p9m9Data: ModuleData = {
  id: 'p9-m9',
  number: 9,
  title: 'Human-in-the-Loop (HITL) Safeguards',
  subtitle: 'Approval Checkpoints, Consequential Action Gating & Audit Logging',
  description:
    'Design fail-safe human approval gates for production agent systems. Classify actions into reversible queries vs irreversible mutations (financial wire transfers, destructive deletions), enforce escalation thresholds, and build immutable audit trails for compliance.',
  icon: 'UserCheck',
  badge: 'Phase 9 · AI Agents',
  estimatedHours: 3,
  topicsCount: 1,
  lessons: [
    {
      id: 'agent-09-human-in-the-loop',
      moduleId: 'p9-m9',
      title: 'Agent-09: Human-in-the-Loop Safeguards & Approval Gates',
      description:
        'Consequential action detection, approval checkpoints, confidence escalation, cryptographically verifiable audit logs, and timeout handling.',
      order: 1,
      readTimeMinutes: 33,
      visualizerType: 'agent-hitl-approval-explorer',
      difficulty: 'Intermediate',
    },
  ],
};

// =========================================================================
// LESSON CONTENTS (Modules 7 - 9)
// =========================================================================
export const agentModule3Lessons: Record<string, LessonContent> = {
  'agent-07-rag-agents': {
    id: 'agent-07-rag-agents',
    moduleId: 'p9-m7',
    title: 'Agent-07: Retrieval-Augmented Agents & Tool-Based Search',
    subtitle: 'From Static Context Injection to Dynamic Multi-Hop Document Investigation',
    order: 1,
    readTimeMinutes: 34,
    difficulty: 'Intermediate',
    visualizerType: 'rag-citation-grounding-explorer',

    objectives: [
      'Contrast static RAG (retrieve-then-generate) with dynamic agentic RAG (interleaved search tools)',
      'Implement multi-hop question answering where query 2 depends on document results from query 1',
      'Evaluate retrieved passage relevance autonomously and reformulate failed search queries',
      'Enforce grounded citation attribution linking generated claims directly to source chunk IDs',
      'Formulate objective criteria for choosing standard RAG vs agentic RAG to prevent overengineering',
    ],
    prerequisites: [
      'Phase 8: RAG Fundamentals & Vector Search (RAG-01 to RAG-06)',
      'Agent-03: Tool Calling & Schema Validation',
    ],
    previousLesson: {
      id: 'agent-06-orchestration',
      title: 'Agent-06: Workflow Orchestration, State Machines & Idempotent Retries',
      moduleId: 'p9-m6',
    },

    analogy: {
      title: 'The Static Book Report versus The Investigative Journalist',
      text: 'Standard RAG is like a student writing a book report who is handed exactly three photocopied encyclopedia pages before beginning. Regardless of whether those pages contain the full answer or raise new contradictions, the student must write the essay immediately with what they have. An Agentic RAG system is an investigative journalist. The journalist conducts an initial search, reads the evidence, notices that Page 2 mentions an obscure subsidiary company ("Acme Cayman Ltd"), halts, formulates a brand-new search query specifically targeting that subsidiary, reads the follow-up disclosures, cross-references dates, and only compiles the final article when all missing puzzle pieces have been verified.',
      metaphor: 'Standard RAG is a single document fetch; Agentic RAG is an iterative research investigation.',
    },

    problemSolved: {
      title: 'Solving Complex Multi-Hop Questions That Break Standard RAG',
      description:
        'Standard RAG fails on questions requiring relational chaining (e.g., "What was the revenue of the company that acquired DeepMind in the year after the acquisition?"). A single embedding similarity search cannot match the second-hop entity ("Google 2015 revenue") because the entity name is unknown until the first query ("Who acquired DeepMind?") has been executed. Agentic RAG solves this naturally through sequential tool calls.',
      keyPoints: [
        'Multi-Hop Reasoning: Chains multiple vector queries dynamically based on intermediate findings',
        'Query Reformulation: If initial search returns zero hits, the agent rewrites terms using synonyms',
        'Evidence Verification: Self-checks whether retrieved passages actually answer the prompt before drafting',
        'Contradiction Resolution: Reconciles conflicting dates across different document versions',
      ],
    },

    intuition: {
      overview:
        'In an agentic RAG system, the vector database is not a rigid pipeline step—it is an allowlisted tool `query_knowledge_base(query, top_k)` that the model invokes whenever needed.',
      steps: [
        {
          step: 1,
          title: 'Initial Query Formulation',
          description:
            'The agent analyzes the user prompt and emits an initial targeted search query to the retrieval tool.',
        },
        {
          step: 2,
          title: 'Passage Inspection & Relevance Check',
          description:
            'The agent inspects returned chunk snippets. It assesses whether sufficient evidence exists to answer the question.',
        },
        {
          step: 3,
          title: 'Follow-Up Hop (If Needed)',
          description:
            'If key entities or dates remain ambiguous, the agent formulates a second, refined query targeting the missing data.',
        },
        {
          step: 4,
          title: 'Grounded Synthesis & Citation',
          description:
            'The agent drafts the final response, attaching bracketed citations [Chunk-ID] to every factual claim.',
        },
      ],
    },

    mathematics: {
      overview:
        'Multi-hop retrieval factorizes the search path into a sequential Markov chain of queries q_t and document sets D_t.',
      foundations: [
        {
          name: 'Multi-Hop Retrieval Trajectory',
          latex: 'P(D_{1:K}, y \\mid x) = \\prod_{k=1}^K P_{\\text{agent}}(q_k \\mid x, D_{<k}) P_{\\text{retriever}}(D_k \\mid q_k) \\cdot P_{\\text{gen}}(y \\mid x, D_{1:K})',
          explanation:
            'Each search query q_k is conditioned on the original question x and all previous document sets D_<k retrieved so far.',
        },
        {
          name: 'Faithfulness Grounding Ratio',
          latex: '\\text{Faithfulness}(y, D) = \\frac{|\\text{Claims}(y) \\cap \\text{EntailedBy}(D)|}{|\\text{Claims}(y)|}',
          explanation:
            'The proportion of discrete atomic claims in output y that are strictly logically entailed by the retrieved context corpus D.',
        },
        {
          name: 'Standard RAG vs Agentic RAG Complexity Frontier',
          latex: '\\text{Cost}_{\\text{std}} = 1 \\text{ LLM Call} + 1 \\text{ Vector Query} \\ll \\text{Cost}_{\\text{agentic}} = K \\text{ LLM Calls} + K \\text{ Vector Queries}',
          explanation:
            'Agentic RAG multiplies cost and latency by factor K; it should only be used when multi-hop dependency is strictly required.',
        },
      ],
    },

    derivation: {
      title: 'Derivation of Standard RAG vs Agentic RAG Decision Boundary',
      objective: 'Formulate an analytical criteria for when agentic RAG is justified over standard RAG.',
      steps: [
        {
          step: 1,
          label: 'Single-Hop vs Multi-Hop Information Need',
          latex: 'H(x) = \\text{Number of dependent entity hops required to answer } x',
          explanation: 'If H(x) = 1, all necessary keywords are present in the original prompt x.',
        },
        {
          step: 2,
          label: 'Retrieval Recall Deficit for H > 1',
          latex: '\\text{Recall}_{\\text{std}}(x) \\approx \\prod_{h=1}^{H(x)} \\text{Recall}(h) \\to 0 \\text{ as } H(x) \\ge 2',
          explanation: 'Standard RAG recall drops exponentially on multi-hop questions because downstream keywords are missing.',
        },
        {
          step: 3,
          label: 'Optimal Architecture Selection Rule',
          latex: '\\text{Architecture}(x) = \\begin{cases} \\text{Standard RAG} & \\text{if } H(x) = 1 \\\\ \\text{Agentic RAG} & \\text{if } H(x) \\ge 2 \\text{ or corpus requires iterative disambiguation} \\end{cases}',
          explanation: 'Use fast standard RAG for 90% of direct document lookups; route to Agentic RAG only when multi-hop dependency is detected.',
        },
      ],
    },

    variables: [
      { symbol: 'q_k', name: 'Hop k Query', description: 'Search string dynamically formulated by the agent at step k' },
      { symbol: 'D_k', name: 'Retrieved Chunks', description: 'Document passages returned by the vector index for query q_k' },
      { symbol: 'H(x)', name: 'Hop Complexity', description: 'Number of sequential entity dependencies in user prompt x' },
      { symbol: '\\text{Faithfulness}', name: 'Grounding Score', description: 'Percentage of factual claims backed by explicit citations' },
    ],

    numericalExample: {
      scenario: 'Evaluating latency and cost for Standard RAG vs 2-Hop Agentic RAG',
      dataset: [
        { type: 'Standard RAG', queries: 1, llmTurns: 1, latencySec: 1.2, costUSD: 0.003 },
        { type: 'Agentic RAG (2-Hop)', queries: 2, llmTurns: 3, latencySec: 4.6, costUSD: 0.014 },
      ],
      calculations: [
        { step: 'Compute Latency Multiplier', math: '4.6 / 1.2', result: '3.83x higher latency' },
        { step: 'Compute Cost Multiplier', math: '0.014 / 0.003', result: '4.67x higher token expenditure' },
        { step: 'Multi-hop Accuracy Gain', math: '88% (Agentic) vs 22% (Standard)', result: '+66% accuracy boost on multi-hop queries' },
      ],
      finalConclusion: 'Agentic RAG is 3.8x slower and 4.7x more expensive, but achieves 88% accuracy on multi-hop queries where Standard RAG fails.',
    },

    visualExplanation: {
      title: 'Multi-Hop Agentic RAG Trajectory Flow',
      description: 'Trace how an agent performs iterative document lookups to resolve dependent facts.',
      features: [
        'Hop 1: Query "Who founded BioTech Ltd?" -> Retrieves: "Founded by Dr. Marcus Vance in 2014"',
        'Reasoning Hop: Agent notes Dr. Marcus Vance graduated from MIT in 2008',
        'Hop 2: Query "Marcus Vance MIT doctoral dissertation topic" -> Retrieves: "Synthetic mRNA Delivery"',
        'Final Synthesis: Connects both pieces with citations [Doc-1] and [Doc-2]',
      ],
    },

    scratchCode: {
      title: '2-Hop Agentic RAG Engine in Pure Python',
      code: `class MockCorpus:
    DATA = {
        "acq": "Acme Corp acquired RoboticsLab in November 2024 for $450 million.",
        "robotics": "RoboticsLab was founded by Elena Rostova, who previously led autonomous navigation at CyberDynamics.",
        "cyber": "CyberDynamics filed for IPO on NASDAQ in 2021 with a valuation of $2.1 billion."
    }
    
    @classmethod
    def search(cls, query: str):
        query = query.lower()
        results = []
        for k, text in cls.DATA.items():
            if any(term in text.lower() for term in query.split()):
                results.append({"id": k, "snippet": text})
        return results

class AgenticRAG:
    def __init__(self, max_hops=3):
        self.max_hops = max_hops
        self.history = []

    def answer(self, question: str):
        print(f"Goal: {question}\\n")
        context = []
        
        # Step 1: Hop 1 Search
        q1 = "Acme Corp acquired RoboticsLab"
        print(f"[Agent] Hop 1 Query: '{q1}'")
        res1 = MockCorpus.search(q1)
        doc1 = res1[0]["snippet"]
        print(f"[Retrieved Doc 1] {doc1}\\n")
        
        # Step 2: Deliberate on intermediate findings
        print("[Agent] Thought: Found acquisition of RoboticsLab. Now need founder Elena Rostova's previous company.")
        q2 = "Elena Rostova CyberDynamics"
        print(f"[Agent] Hop 2 Query: '{q2}'")
        res2 = MockCorpus.search(q2)
        doc2 = res2[0]["snippet"]
        print(f"[Retrieved Doc 2] {doc2}\\n")
        
        # Step 3: Synthesize with citations
        final_answer = (
            f"Acme Corp acquired RoboticsLab [acq], which was founded by Elena Rostova. "
            f"Rostova previously worked at CyberDynamics, which IPO'd at a $2.1B valuation in 2021 [cyber]."
        )
        return final_answer

rag = AgenticRAG()
ans = rag.answer("What was the previous company and valuation history of the founder of the firm Acme Corp acquired?")
print("Final Answer with Citations:\\n", ans)`,
      explanation:
        'Demonstrates multi-hop relational retrieval where the second query is dynamically constructed from facts discovered in the first document.',
    },

    sklearnCode: {
      title: 'Automated Citation Grounding & Faithfulness Verifier',
      code: `import re

def verify_grounded_citations(generated_text: str, document_store: dict):
    # Extract [chunk_id] citations from text
    citations = re.findall(r"\\[(.*?)\\]", generated_text)
    print(f"Detected Citations: {citations}")
    
    audit_results = []
    for cit in citations:
        if cit in document_store:
            audit_results.append({"citation": cit, "status": "VERIFIED", "source": document_store[cit][:40] + "..."})
        else:
            audit_results.append({"citation": cit, "status": "UNGROUNDED_HALLUCINATION", "source": None})
            
    is_fully_grounded = all(r["status"] == "VERIFIED" for r in audit_results)
    return {"fully_grounded": is_fully_grounded, "details": audit_results}

docs = {
    "acq": "Acme Corp acquired RoboticsLab in November 2024.",
    "cyber": "CyberDynamics filed for IPO on NASDAQ in 2021."
}

text = "Acme acquired RoboticsLab [acq] and CyberDynamics went public in 2021 [cyber] and founded in 1990 [fake_doc]."
res = verify_grounded_citations(text, docs)
print("\\nAudit Report:", res)`,
      explanation:
        'Audits generated text for hallucinated or unbacked citation tags against the verified ingested document store.',
    },

    runnableCode: {
      code: `def trace_agentic_rag():
    steps = [
        "User: 'Who is the CEO of the company that makes the Falcon 9 rocket?'",
        "Agent Hop 1: query_kb('makes Falcon 9 rocket') -> Returns: 'SpaceX manufactures Falcon 9.'",
        "Agent Hop 2: query_kb('SpaceX current CEO') -> Returns: 'Elon Musk is the CEO of SpaceX.'",
        "Agent Final: 'Elon Musk is the CEO of SpaceX [doc_2], the company that manufactures the Falcon 9 [doc_1].'"
    ]
    return "\\n".join(steps)

print(trace_agentic_rag())`,
      expectedOutput: `User: 'Who is the CEO of the company that makes the Falcon 9 rocket?'
Agent Hop 1: query_kb('makes Falcon 9 rocket') -> Returns: 'SpaceX manufactures Falcon 9.'
Agent Hop 2: query_kb('SpaceX current CEO') -> Returns: 'Elon Musk is the CEO of SpaceX.'
Agent Final: 'Elon Musk is the CEO of SpaceX [doc_2], the company that manufactures the Falcon 9 [doc_1].'`,
    },

    lineByLineExplanation: [
      { lines: '1-5', codeSnippet: 'steps = [ "User: ...", "Agent Hop 1: ...', explanation: 'Demonstrates multi-hop query resolution where Hop 2 resolves the entity discovered in Hop 1.' },
      { lines: '7-8', codeSnippet: 'return "\\n".join(steps)', explanation: 'Prints the structured trace showing grounded citation formatting.' },
    ],

    hyperparameters: [
      { name: 'max_retrieval_hops', defaultVal: '3', range: '1 - 5', effect: 'Maximum search iterations allowed', recommendation: 'Cap at 2-3 hops to avoid runaway token latency.' },
      { name: 'top_k_per_hop', defaultVal: '3', range: '1 - 6', effect: 'Passages retrieved per search tool call', recommendation: 'Keep at 2-3 focused chunks to preserve context clarity.' },
    ],

    assumptions: [
      { assumption: 'Document Grounding', whyItMatters: 'If retrieved passages contain outdated or conflicting facts, the agent may hallucinate synthesis', howToVerify: 'Inspect metadata timestamps and prioritize recent authoritative sources.' },
      { assumption: 'Citation Traceability', whyItMatters: 'Uncited claims cannot be verified by human auditors', howToVerify: 'Require bracketed chunk IDs on all factual claims in the system prompt.' },
    ],

    commonMistakes: [
      {
        mistake: 'Using Agentic RAG for simple direct questions that Standard RAG solves in 1 step',
        solution: 'Use Standard RAG by default; escalate to Agentic RAG only for multi-hop or low-confidence queries.',
        whyWrong: 'Triples latency (from 1s to 4s+) and token costs without any quality improvement on direct queries.',
        howToFix: 'Classify query hop complexity upfront.',
      },
      {
        mistake: 'Allowing the agent to generate citations to imaginary document IDs that do not exist',
        solution: 'Validate all emitted citation tags against the set of actually retrieved chunk IDs.',
        whyWrong: 'Creates an illusion of grounded accuracy while delivering fabricated facts.',
        howToFix: 'Run an automated post-generation citation linter.',
      },
    ],

    realWorldUseCases: [
      { industry: 'Legal Tech', application: 'Case Law Precedent Analysis', benefit: 'Searches trial court rulings, traces appeals to Supreme Court precedents, and cross-references citations.' },
      { industry: 'Biomedical Research', application: 'Drug Interaction Discovery', benefit: 'Queries clinical trial literature across multi-protein pathway dependencies.' },
    ],

    practiceQuestions: [
      {
        id: 'pq-rag-1',
        question: 'What is a multi-hop query, and why does standard RAG fail to answer it reliably?',
        hint: 'Think about information dependency.',
        answer: 'A multi-hop query requires discovering an intermediate fact or entity before the second question can even be formulated; standard RAG fails because the second entity is not present in the initial prompt.',
        explanation: 'Single-step vector similarity cannot search for unknown intermediate entities.',
      },
      {
        id: 'pq-rag-2',
        question: 'How does an agent evaluate whether retrieved passages are sufficient to answer a prompt?',
        hint: 'What does the model inspect in its scratchpad?',
        answer: 'The agent inspects the returned text against its internal checklist of required variables; if required information is missing, it reformulates a follow-up query instead of guessing.',
        explanation: 'Autonomous relevance evaluation prevents premature completion and hallucination.',
      },
      {
        id: 'pq-rag-3',
        question: 'What are the two major trade-offs of Agentic RAG compared to Standard RAG?',
        hint: 'Consider performance metrics.',
        answer: 'Significantly higher latency (multiple sequential LLM turns) and substantially higher token expenditure.',
        explanation: 'Each hop requires an extra LLM generation and vector query round-trip.',
      },
    ],

    quiz: [
      {
        id: 'qz-rag-1',
        question: 'In which scenario is Agentic RAG strictly superior to Standard RAG?',
        options: [
          'Looking up the return policy for a shoe store from a single FAQ page',
          'Answering a multi-hop question where entity B is discovered only after finding entity A in an earlier document',
          'Translating a sentence from English to French',
          'Writing a creative fictional poem about a robot',
        ],
        correctIndex: 1,
        explanation: 'Multi-hop questions require sequential discovery of unknown intermediate entities that cannot be queried simultaneously.',
      },
      {
        id: 'qz-rag-2',
        question: 'What does a citation grounding verifier check?',
        options: [
          'Whether the font style is Helvetica or Times New Roman',
          'Whether every cited document ID in the generated answer exists in the set of actually retrieved passages',
          'Whether the computer is connected to the internet',
          'Whether the user has paid their subscription',
        ],
        correctIndex: 1,
        explanation: 'It verifies that citations map to genuine source chunks and were not fabricated by the model.',
      },
      {
        id: 'qz-rag-3',
        question: 'What is the recommended maximum number of retrieval hops for a production task assistant?',
        options: ['100 hops', '2 to 3 hops', '0 hops', '50 hops'],
        correctIndex: 1,
        explanation: 'Capping at 2-3 hops prevents latency explosions while solving 98% of multi-hop questions.',
      },
    ],

    independentExercise: {
      id: 'ex-07-citation-checker',
      title: 'Build a Post-Generation Citation Linter',
      problem: 'Write a Python function `lint_citations(text, valid_chunk_ids)` that finds all `[id]` citations in `text`. Return `{"valid": True, "citations": [...]}` if all citations exist in `valid_chunk_ids`, or `{"valid": False, "invalid_citations": [...]}` if any hallucinated IDs are found.',
      hints: ['Use re.findall(r"\\[(.*?)\\]", text) and set differences.'],
      starterCode: `def lint_citations(text: str, valid_chunk_ids: list):
    # TODO: Implement citation verification
    pass

valid = ["doc_1", "doc_2"]
t1 = "Sales grew 10% [doc_1] and profit doubled [doc_2]."
t2 = "Sales grew 10% [doc_1] but costs tripled [fake_99]."
print("Test 1:", lint_citations(t1, valid))
print("Test 2:", lint_citations(t2, valid))`,
      solution: `import re

def lint_citations(text: str, valid_chunk_ids: list):
    found = re.findall(r"\\[(.*?)\\]", text)
    valid_set = set(valid_chunk_ids)
    invalid = [c for c in found if c not in valid_set]
    
    if invalid:
        return {"valid": False, "invalid_citations": invalid}
    return {"valid": True, "citations": found}

valid = ["doc_1", "doc_2"]
t1 = "Sales grew 10% [doc_1] and profit doubled [doc_2]."
t2 = "Sales grew 10% [doc_1] but costs tripled [fake_99]."
print("Test 1:", lint_citations(t1, valid))
print("Test 2:", lint_citations(t2, valid))`,
    },

    summary: {
      keyTakeaways: [
        'Agentic RAG treats document retrieval as a callable tool, enabling multi-hop relational search.',
        'Standard RAG should remain the default for direct single-hop queries to preserve speed and low cost.',
        'Enforce grounded citations [chunk_id] and validate that emitted IDs exist in the retrieved corpus.',
        'Cap multi-hop trajectories at 2-3 hops to prevent latency explosions and focus dilution.',
      ],
      nextLessonId: 'agent-08-multi-agent',
      nextLessonTitle: 'Agent-08: Multi-Agent Teams, Handoffs & Context Isolation',
      nextLessonModuleId: 'p9-m8',
    },
  },

  'agent-08-multi-agent': {
    id: 'agent-08-multi-agent',
    moduleId: 'p9-m8',
    title: 'Agent-08: Multi-Agent Teams, Handoffs & Context Isolation',
    subtitle: 'Supervisor-Worker Hierarchies, Structured Message Handoffs & Reducing Coordination Noise',
    order: 1,
    readTimeMinutes: 36,
    difficulty: 'Advanced',
    visualizerType: 'agent-multiagent-handoff-explorer',

    objectives: [
      'Compare multi-agent team topologies: Hierarchical (Supervisor-Worker), Peer Network, and Sequential Pipeline',
      'Implement structured handoff protocols specifying sender, recipient, objective, and typed context payloads',
      'Enforce context isolation to prevent scratchpad pollution and prompt token bloat across specialized subagents',
      'Coordinate parallel worker execution and synthesize heterogeneous outputs into a unified report',
      'Analyze the failure modes of multi-agent systems: coordination overhead, infinite ping-pong loops, and role confusion',
    ],
    prerequisites: [
      'Agent-02: Core Architecture & Control Loops',
      'Agent-06: Workflow Orchestration & State Graphs',
    ],
    previousLesson: {
      id: 'agent-07-rag-agents',
      title: 'Agent-07: Retrieval-Augmented Agents & Tool-Based Search',
      moduleId: 'p9-m7',
    },

    analogy: {
      title: 'The Film Production Crew and The Department Heads',
      text: 'A movie is never produced by a single person attempting to direct, act, operate cameras, mix sound, and compose the musical score all at once. Doing so results in cognitive exhaustion and mediocre output. Instead, a Film Director (Supervisor Orchestrator) oversees specialized department heads: the Director of Photography handles lighting and lenses; the Sound Engineer handles boom mics; the Costume Designer handles wardrobe. The Director communicates via structured call sheets (handoff protocol). When the scene is shot, the Director does not inspect every individual lighting cable; they receive the finished audio and video reels (context isolation) and synthesize them in the editing room.',
      metaphor: 'The Director is the supervisor agent; department heads are specialist worker agents; call sheets are handoffs.',
    },

    problemSolved: {
      title: 'Overcoming Prompt Distraction and Capability Dilution in Single Agents',
      description:
        'As an agent is tasked with diverse responsibilities (e.g. database querying, statistical coding, security auditing, and prose writing), its system prompt swells with dozens of contradictory instructions and dozens of tools. The model suffers from attention dilution, invoking the wrong tools or forgetting formatting rules. Multi-agent architecture splits responsibilities across focused, specialized subagents.',
      keyPoints: [
        'Role Specialization: Each agent has a concise system prompt and only 2-3 relevant domain tools',
        'Context Cleanliness: Raw intermediate tool scraping noise from Worker A is filtered before handing off to Worker B',
        'Parallel Throughput: Multiple specialists work on independent subtasks simultaneously',
        'Modular Maintainability: Individual agents can be upgraded or prompted independently without breaking other roles',
      ],
    },

    intuition: {
      overview:
        'A Supervisor-Worker multi-agent system uses a lead orchestrator that receives the initial user prompt, plans assignments, delegates to workers via explicit handoffs, and aggregates the results.',
      steps: [
        {
          step: 1,
          title: 'Goal Ingestion & Decomposition',
          description:
            'The Supervisor agent breaks down the master objective into domain-specific subtasks.',
        },
        {
          step: 2,
          title: 'Targeted Delegation (Handoff)',
          description:
            'The Supervisor formats a clean handoff message containing only the necessary instructions and context for a specific worker.',
        },
        {
          step: 3,
          title: 'Autonomous Worker Execution',
          description:
            'The specialist worker executes its internal ReAct loop within its narrow tool boundary, producing a structured return payload.',
        },
        {
          step: 4,
          title: 'Synthesis & Quality Audit',
          description:
            'The Supervisor receives the worker payload, evaluates quality, optionally routes to a Critic agent, and delivers the final synthesis.',
        },
      ],
    },

    mathematics: {
      overview:
        'Multi-agent coordination can be modeled as a decentralized partially observable Markov decision process (Dec-POMDP) or hierarchical control policy.',
      foundations: [
        {
          name: 'Hierarchical Policy Factorization',
          latex: '\\pi(a_t^{(1)}, \\dots, a_t^{(K)} \\mid s_t) = \\pi_{\\text{sup}}(w_t \\mid s_t) \\cdot \\prod_{k=1}^K \\pi_k(a_t^{(k)} \\mid s_t, w_t^{(k)})',
          explanation:
            'The supervisor policy pi_sup assigns goal vectors w_t to specialist workers pi_k, who execute actions a_t^(k) within their assigned sub-spaces.',
        },
        {
          name: 'Context Token Pollution Reduction',
          latex: 'L_{\\text{isolated}} = \\sum_{k=1}^K (L_{\\text{prompt}}^{(k)} + L_{\\text{summary}}^{(k)}) \\ll K \\cdot \\sum_{k=1}^K L_{\\text{raw\\_steps}}^{(k)} = L_{\\text{shared}}',
          explanation:
            'Isolating context boundaries and passing only distilled summaries keeps prompt lengths small, avoiding quadratic context blowup.',
        },
        {
          name: 'Coordination Overhead Function',
          latex: 'C_{\\text{coord}}(K) = \\mathcal{O}(K^2 \\cdot L_{\\text{msg}}) \\text{ (Peer Mesh)} \\quad \\text{vs} \\quad \\mathcal{O}(K \\cdot L_{\\text{msg}}) \\text{ (Supervisor)}',
          explanation:
            'Fully-connected peer agent networks incur quadratic communication overhead; centralized supervisor topologies scale linearly O(K).',
        },
      ],
    },

    derivation: {
      title: 'Derivation of Communication Overhead: Peer Mesh vs Supervisor Star Topology',
      objective: 'Prove why hierarchical supervisor architectures are drastically more scalable than free-form peer debates.',
      steps: [
        {
          step: 1,
          label: 'Peer-to-Peer Mesh Communication Channels',
          latex: 'N_{\\text{channels}} = \\frac{K(K - 1)}{2} = \\mathcal{O}(K^2)',
          explanation: 'In a free-form network where every agent debates with every other agent, message volume scales quadratically with team size K.',
        },
        {
          step: 2,
          label: 'Supervisor Star Topology Channels',
          latex: 'N_{\\text{star}} = 2(K - 1) = \\mathcal{O}(K)',
          explanation: 'With a central supervisor, each specialist communicates strictly through the orchestrator (outbound delegation and return payload).',
        },
        {
          step: 3,
          label: 'Token and Convergence Advantage',
          latex: '\\lim_{K \\to 10} \\frac{N_{\\text{star}}}{N_{\\text{channels}}} = \\frac{18}{45} = 0.40 \\implies 60\\% \\text{ reduction in chatter}',
          explanation: 'Supervisor hierarchies prevent endless circular debates and ensure finite, directed convergence.',
        },
      ],
    },

    variables: [
      { symbol: 'K', name: 'Team Size', description: 'Number of specialized subagents participating in the system' },
      { symbol: '\\pi_{\\text{sup}}', name: 'Supervisor Policy', description: 'Lead orchestrator assigning subtasks and synthesizing returns' },
      { symbol: '\\pi_k', name: 'Worker Policy', description: 'Domain-specific specialist policy operating within restricted tool boundaries' },
      { symbol: 'w_t^{(k)}', name: 'Handoff Contract', description: 'Structured JSON message specifying objective and isolated payload for worker k' },
    ],

    numericalExample: {
      scenario: 'Comparing token expenditure for a financial analysis task: Monolithic Single Agent vs 3-Agent Supervisor Team',
      dataset: [
        { setup: 'Monolithic Agent (all tools in one prompt)', steps: 12, promptTokensPerStep: 4200, totalTokens: 50400 },
        { setup: '3-Agent Isolated Team (Researcher, Coder, Critic)', steps: 12, avgPromptTokens: 1100, totalTokens: 13200 },
      ],
      calculations: [
        { step: 'Monolithic Total Tokens', math: '12 * 4200', result: '50,400 tokens' },
        { step: 'Multi-Agent Isolated Tokens', math: '12 * 1100', result: '13,200 tokens' },
        { step: 'Efficiency Improvement', math: '1 - (13200 / 50400)', result: '73.8% token reduction' },
      ],
      finalConclusion: 'Context isolation saved 73.8% of prompt tokens by shielding specialists from thousands of irrelevant scratchpad observations.',
    },

    visualExplanation: {
      title: 'Supervisor-Worker Handoff Architecture',
      description: 'Trace the clean delegation and return contracts between the lead orchestrator and domain specialists.',
      features: [
        'User Prompt -> Enters Supervisor (Lead Orchestrator)',
        'Delegation 1: Passes query to Research Specialist -> Returns raw verified facts',
        'Delegation 2: Passes facts to Code Specialist -> Executes Python math in sandbox -> Returns clean JSON',
        'Delegation 3: Passes drafted summary to Critic Specialist -> Audits against policy rules',
        'Delivery: Supervisor presents polished, verified answer to user',
      ],
    },

    scratchCode: {
      title: 'Supervisor-Worker Multi-Agent System in Pure Python',
      code: `from typing import Dict, Any

class AgentWorker:
    def __init__(self, name: str, role_prompt: str, tools: dict):
        self.name = name
        self.role_prompt = role_prompt
        self.tools = tools

    def execute(self, task_payload: Dict[str, Any]) -> Dict[str, Any]:
        print(f"[{self.name}] Received task: {task_payload.get('objective')}")
        # Isolated execution using only domain tools
        tool_name = task_payload.get("tool")
        tool_fn = self.tools.get(tool_name)
        if not tool_fn:
            return {"status": "error", "message": f"Tool '{tool_name}' not available to {self.name}"}
            
        result = tool_fn(**task_payload.get("args", {}))
        print(f"[{self.name}] Completed execution. Returning verified payload.\\n")
        return {"status": "success", "worker": self.name, "output": result}

class SupervisorAgent:
    def __init__(self, workers: Dict[str, AgentWorker]):
        self.workers = workers

    def run_collaborative_task(self, user_goal: str):
        print(f"=== SUPERVISOR RECEIVED GOAL: '{user_goal}' ===\\n")
        
        # Step 1: Delegate research to Researcher
        research_handoff = {
            "objective": "Find latest inflation rates for Q3 2026",
            "tool": "search_db",
            "args": {"query": "US Q3 2026 CPI"}
        }
        r_out = self.workers["researcher"].execute(research_handoff)
        
        # Step 2: Delegate math to Analyst (context isolation: passes only r_out['output'])
        analyst_handoff = {
            "objective": "Compute annualized rate from raw monthly points",
            "tool": "compute_rate",
            "args": {"monthly_points": [0.2, 0.3, 0.2]}
        }
        a_out = self.workers["analyst"].execute(analyst_handoff)
        
        # Step 3: Synthesize final answer
        summary = (
            f"Executive Briefing: Based on verified research ({r_out['output']}), "
            f"our quantitative analysis computes annualized inflation at {a_out['output']}."
        )
        return summary

# Instantiate Specialists
researcher = AgentWorker(
    name="ResearchSpecialist",
    role_prompt="Search corporate database for factual points.",
    tools={"search_db": lambda query: "CPI points: Jul=0.2%, Aug=0.3%, Sep=0.2%"}
)

analyst = AgentWorker(
    name="MathAnalyst",
    role_prompt="Run quantitative computations.",
    tools={"compute_rate": lambda monthly_points: f"{sum(monthly_points) * 4:.1f}% annualized"}
)

supervisor = SupervisorAgent(workers={"researcher": researcher, "analyst": analyst})
final_report = supervisor.run_collaborative_task("Prepare Q3 inflation executive brief")
print("=== FINAL SUPERVISOR REPORT ===\\n", final_report)`,
      explanation:
        'Demonstrates clean supervisor delegation, worker execution in isolated environments, and final synthesis in pure Python.',
    },

    sklearnCode: {
      title: 'Typed Handoff Message Contract',
      code: `from typing import TypedDict, Optional, Dict, Any
import json

class AgentHandoffEnvelope(TypedDict):
    trace_id: str
    sender_agent: str
    recipient_agent: str
    task_objective: str
    context_payload: Dict[str, Any]
    priority: str
    timeout_sec: int

def create_handoff(sender: str, recipient: str, objective: str, payload: dict) -> str:
    envelope: AgentHandoffEnvelope = {
        "trace_id": "tr_agent_" + str(hash(objective) % 10000),
        "sender_agent": sender,
        "recipient_agent": recipient,
        "task_objective": objective,
        "context_payload": payload,
        "priority": "HIGH",
        "timeout_sec": 30
    }
    return json.dumps(envelope, indent=2)

handoff_json = create_handoff(
    sender="LeadOrchestrator",
    recipient="CodeExecutionSpecialist",
    objective="Run unit tests on refactored auth module",
    payload={"file_path": "auth.py", "test_suite": "tests/test_auth.py"}
)

print(handoff_json)`,
      explanation:
        'Defines an immutable, typed envelope contract for inter-agent communication, ensuring zero ambiguous message parsing.',
    },

    runnableCode: {
      code: `def simulate_team_execution():
    log = []
    log.append("Supervisor: Received user goal 'Analyze competitor Q3 churn'.")
    log.append("Handoff -> Researcher: Extracted peer median churn = 6.2%.")
    log.append("Handoff -> Analyst: Company churn is 4.8%; computed outperformance = +1.4pp.")
    log.append("Handoff -> Critic: Verified zero ungrounded claims. Approved.")
    log.append("Supervisor Final: 'Company outperformed peers by 1.4 percentage points (4.8% vs 6.2%).'")
    return "\\n".join(log)

print(simulate_team_execution())`,
      expectedOutput: `Supervisor: Received user goal 'Analyze competitor Q3 churn'.
Handoff -> Researcher: Extracted peer median churn = 6.2%.
Handoff -> Analyst: Company churn is 4.8%; computed outperformance = +1.4pp.
Handoff -> Critic: Verified zero ungrounded claims. Approved.
Supervisor Final: 'Company outperformed peers by 1.4 percentage points (4.8% vs 6.2%).'`,
    },

    lineByLineExplanation: [
      { lines: '1-6', codeSnippet: 'log = [] ... log.append("Handoff -> Researcher...")', explanation: 'Traces the sequential handoff pipeline from Supervisor to Researcher, Analyst, Critic, and Final delivery.' },
      { lines: '7-8', codeSnippet: 'return "\\n".join(log)', explanation: 'Prints the verified multi-agent communication trace.' },
    ],

    hyperparameters: [
      { name: 'max_team_members', defaultVal: '4', range: '2 - 8', effect: 'Caps number of active subagents', recommendation: 'Keep teams <= 4 members to minimize coordination overhead.' },
      { name: 'max_handoff_cycles', defaultVal: '6', range: '2 - 12', effect: 'Caps total inter-agent message exchanges', recommendation: 'Enforce strict limits to avoid infinite ping-pong discussions.' },
    ],

    assumptions: [
      { assumption: 'Context Isolation Fidelity', whyItMatters: 'If handoffs omit crucial constraints, the specialist will hallucinate invalid assumptions', howToVerify: 'Include explicit constraint fields in the handoff envelope schema.' },
      { assumption: 'Role Distinction', whyItMatters: 'Overlapping role descriptions cause agents to debate who should execute a task', howToVerify: 'Ensure each worker’s system prompt has zero tool overlap with peers.' },
    ],

    commonMistakes: [
      {
        mistake: 'Dumping the entire 10,000-token conversation history into every subagent prompt',
        solution: 'Pass only the filtered input payload specifically needed for that subagent’s task.',
        whyWrong: 'Eliminates the entire token-saving and attention-focus benefit of multi-agent architectures.',
        howToFix: 'Enforce strict context isolation with structured JSON handoff envelopes.',
      },
      {
        mistake: 'Allowing free-form unstructured peer chatter between agents without a supervisor',
        solution: 'Use a hierarchical supervisor or strict deterministic state machine to control turns.',
        whyWrong: 'Agents can enter infinite agreeable loops ("I agree with your suggestion, what do you think?").',
        howToFix: 'Designate one agent as the termination authority with an explicit stop condition.',
      },
    ],

    realWorldUseCases: [
      { industry: 'Software Engineering', application: 'Automated PR Review Team', benefit: 'Architecture Critic, Security Scanner, Code Style Linter, and Test Runner collaborate on pull requests.' },
      { industry: 'Financial Advisory', application: 'Equity Research Desk', benefit: 'Macro Analyst, Fundamental Auditor, and Valuation Modeler draft collaborative initiation reports.' },
    ],

    practiceQuestions: [
      {
        id: 'pq-multi-1',
        question: 'What is context isolation in a multi-agent system, and why is it critical?',
        hint: 'What does a worker agent see in its prompt?',
        answer: 'Context isolation means each specialist worker receives only the specific data payload needed for its task, shielding it from raw tool observations and scratchpad noise generated by other agents.',
        explanation: 'Keeps prompts short, prevents distraction, and lowers operational token costs.',
      },
      {
        id: 'pq-multi-2',
        question: 'Why does a hierarchical supervisor topology scale better than a fully-connected peer mesh?',
        hint: 'Consider the number of communication channels.',
        answer: 'Supervisor topologies scale linearly O(K) in communication volume, whereas peer meshes scale quadratically O(K^2), leading to coordination bloat and circular debates.',
        explanation: 'Centralized orchestrators keep message volume focused and deterministic.',
      },
      {
        id: 'pq-multi-3',
        question: 'What is an infinite ping-pong loop in multi-agent systems?',
        hint: 'What happens when two agents critique each other endlessly?',
        answer: 'A failure mode where two or more agents pass tasks back and forth indefinitely without making forward progress or reaching a termination criteria.',
        explanation: 'Must be prevented by capping total handoff cycles and enforcing a supervisor exit decision.',
      },
    ],

    quiz: [
      {
        id: 'qz-multi-1',
        question: 'What is the primary role of a Supervisor agent in a hierarchical team?',
        options: [
          'Running every database query personally',
          'Decomposing the master goal, delegating subtasks to specialists, and synthesizing final answers',
          'Shutting down the server when memory is full',
          'Translating English into binary numbers',
        ],
        correctIndex: 1,
        explanation: 'The Supervisor coordinates workflow, delegates tasks to specialists, and unifies returns.',
      },
      {
        id: 'qz-multi-2',
        question: 'Which of the following is an effective defense against circular multi-agent chatter?',
        options: [
          'Enforcing a hard max_handoff_cycles ceiling in the orchestrator runtime',
          'Increasing the number of agents to 50',
          'Allowing agents to write to each other’s system prompts',
          'Disabling all JSON schema validation',
        ],
        correctIndex: 0,
        explanation: 'A hard ceiling on inter-agent message exchanges guarantees termination.',
      },
      {
        id: 'qz-multi-3',
        question: 'Why should tools be partitioned across specialized subagents rather than given to one monolithic agent?',
        options: [
          'To make the system slower on purpose',
          'To reduce prompt distractor confusion and maintain high tool selection accuracy',
          'Because Python does not allow more than 2 functions per file',
          'To require more API subscriptions',
        ],
        correctIndex: 1,
        explanation: 'Keeping tool catalogs small per agent avoids semantic confusion and improves call precision.',
      },
    ],

    independentExercise: {
      id: 'ex-08-handoff-validator',
      title: 'Build a Handoff Envelope Validator',
      problem: 'Write a Python function `validate_handoff(envelope, valid_agents)` that checks if: 1) sender and recipient are in `valid_agents`, 2) sender != recipient, and 3) `task_objective` is a non-empty string. Return `{"valid": True}` or `{"valid": False, "error": "<reason>"}`.',
      hints: ['Verify keys in envelope dictionary.'],
      starterCode: `def validate_handoff(envelope: dict, valid_agents: list):
    # TODO: Implement checks
    pass

agents = ["Supervisor", "Researcher", "Analyst"]
h1 = {"sender": "Supervisor", "recipient": "Researcher", "task_objective": "Fetch data"}
h2 = {"sender": "Researcher", "recipient": "Researcher", "task_objective": "Loop"}
print("Test 1:", validate_handoff(h1, agents))
print("Test 2:", validate_handoff(h2, agents))`,
      solution: `def validate_handoff(envelope: dict, valid_agents: list):
    sender = envelope.get("sender")
    recipient = envelope.get("recipient")
    objective = envelope.get("task_objective")
    
    if sender not in valid_agents:
        return {"valid": False, "error": f"Invalid sender '{sender}'"}
    if recipient not in valid_agents:
        return {"valid": False, "error": f"Invalid recipient '{recipient}'"}
    if sender == recipient:
        return {"valid": False, "error": "Self-handoffs not permitted"}
    if not objective or not isinstance(objective, str) or not objective.strip():
        return {"valid": False, "error": "Missing or empty task_objective"}
        
    return {"valid": True}

agents = ["Supervisor", "Researcher", "Analyst"]
h1 = {"sender": "Supervisor", "recipient": "Researcher", "task_objective": "Fetch data"}
h2 = {"sender": "Researcher", "recipient": "Researcher", "task_objective": "Loop"}
print("Test 1:", validate_handoff(h1, agents))
print("Test 2:", validate_handoff(h2, agents))`,
    },

    summary: {
      keyTakeaways: [
        'Multi-agent architectures divide complex responsibilities among focused, specialized domain workers.',
        'Supervisor-Worker topologies scale linearly O(K) and prevent circular peer debates.',
        'Context isolation shields specialists from raw intermediate scratchpad noise, reducing token costs by >70%.',
        'Enforce typed handoff envelopes, role distinction, and strict message cycle caps.',
      ],
      nextLessonId: 'agent-09-human-in-the-loop',
      nextLessonTitle: 'Agent-09: Human-in-the-Loop Safeguards & Approval Gates',
      nextLessonModuleId: 'p9-m9',
    },
  },

  'agent-09-human-in-the-loop': {
    id: 'agent-09-human-in-the-loop',
    moduleId: 'p9-m9',
    title: 'Agent-09: Human-in-the-Loop Safeguards & Approval Gates',
    subtitle: 'Consequential Action Classification, Permission Gating & Cryptographic Audit Trails',
    order: 1,
    readTimeMinutes: 33,
    difficulty: 'Intermediate',
    visualizerType: 'agent-hitl-approval-explorer',

    objectives: [
      'Classify agent tools into safe read-only operations versus irreversible consequential mutations',
      'Implement asynchronous human approval checkpoints that pause execution until explicit authorization is granted',
      'Design confidence-based escalation thresholds to trigger human review for ambiguous requests',
      'Construct immutable, tamper-evident audit logs capturing user consent, parameter hashes, and timestamps',
      'Handle approval timeouts and rejections gracefully with clean abort signals and state rollbacks',
    ],
    prerequisites: [
      'Agent-03: Tool Calling & Schema Validation',
      'Agent-06: Workflow Orchestration & State Graphs',
    ],
    previousLesson: {
      id: 'agent-08-multi-agent',
      title: 'Agent-08: Multi-Agent Teams, Handoffs & Context Isolation',
      moduleId: 'p9-m8',
    },

    analogy: {
      title: 'The Dual-Key Nuclear Submarine Missile Launch',
      text: 'On a naval submarine, no single automated sensor or computer algorithm can fire a missile independently. While navigational tracking and sonar pinging run autonomously (safe read-only operations), turning on the weapon firing circuits requires two independent physical keys turned simultaneously by the Captain and the Executive Officer (Human-in-the-Loop approval gate). In an enterprise agent, querying customer addresses is automated; wiring $50,000 to an offshore bank requires an authorized operator to inspect the transfer sheet, verify the amount, and digitally sign approval.',
      metaphor: 'Read actions are sonar pings; consequential actions require the Captain’s physical key.',
    },

    problemSolved: {
      title: 'Preventing Catastrophic Autonomous Side Effects in Mission-Critical Systems',
      description:
        'Even the most advanced LLMs make occasional reasoning errors or fall prey to adversarial prompt injection. If an autonomous agent is given unrestricted authority to delete databases, modify production firewalls, or transfer money, a single failure can cause millions of dollars in damages. Human-in-the-Loop (HITL) checkpoints create an unskippable safety boundary before consequential side effects execute.',
      keyPoints: [
        'Consequential Action Boundary: Disallows automated execution of irreversible financial, legal, or destructive mutations',
        'Asynchronous Checkpoints: Suspends workflow state safely in durable storage while waiting for human sign-off',
        'Accountability & Auditability: Records which authorized operator approved each specific tool invocation',
        'Reversible Rollbacks: If approval is rejected, state machines abort cleanly without partial corruption',
      ],
    },

    intuition: {
      overview:
        'A HITL checkpoint intercepts proposed tool calls. If the tool is flagged as consequential or confidence is low, the orchestrator freezes the agent loop and alerts a human operator.',
      steps: [
        {
          step: 1,
          title: 'Risk Classification',
          description:
            'The runtime inspects the tool registry tag (e.g. `is_consequential: True`) and validates parameter values against monetary/destructive thresholds.',
        },
        {
          step: 2,
          title: 'Checkpoint Interception',
          description:
            'Execution is paused. The proposed tool name, exact arguments, reason, and confidence score are saved to an approval queue.',
        },
        {
          step: 3,
          title: 'Human Review & Verification',
          description:
            'An operator reviews the proposal in an operations dashboard, inspecting for anomalies, and clicks "Approve" or "Reject".',
        },
        {
          step: 4,
          title: 'Signed Dispatch or Rollback',
          description:
            'If approved, the runtime signs an authorization token and executes the tool. If rejected, an abort signal returns feedback to the agent.',
        },
      ],
    },

    mathematics: {
      overview:
        'HITL gating can be formalized as a risk threshold decision function over expected loss L(a) and model confidence c.',
      foundations: [
        {
          name: 'Expected Consequence Loss',
          latex: '\\mathbb{E}[\\text{Loss}(a, s)] = P(\\text{Error} \\mid a, s) \\cdot \\text{Impact}(a)',
          explanation:
            'The risk of action a is the product of execution error probability and the severity of impact (e.g. monetary cost or data loss).',
        },
        {
          name: 'HITL Escalation Decision Rule',
          latex: '\\text{DispatchPolicy}(a) = \\begin{cases} \\text{AutoExecute} & \\text{if } \\mathbb{E}[\\text{Loss}(a)] < \\lambda_{\\text{risk}} \\text{ and } c_a \\ge \\theta_{\\text{conf}} \\\\ \\text{RequireHumanGate} & \\text{otherwise} \\end{cases}',
          explanation:
            'Actions exceeding risk threshold lambda_risk or falling below confidence threshold theta_conf require explicit human approval.',
        },
        {
          name: 'Cryptographic Audit Signature',
          latex: '\\sigma_{\\text{audit}} = \\text{Sign}_{K_{\\text{priv}}}(\\text{ActionID} \\parallel \\text{ParamsHash} \\parallel \\text{ApproverID} \\parallel t_{\\text{timestamp}})',
          explanation:
            'Cryptographic signatures guarantee non-repudiation and prevent tampering with execution authorizations.',
        },
      ],
    },

    derivation: {
      title: 'Derivation of Risk Gating Cost-Benefit Equilibrium',
      objective: 'Calculate the optimal confidence threshold that minimizes cumulative cost of errors vs human review overhead.',
      steps: [
        {
          step: 1,
          label: 'Total System Cost Equation',
          latex: 'C_{\\text{total}}(\\theta) = C_{\\text{human}} \\cdot \\mathbb{P}(c < \\theta) + C_{\\text{error}} \\cdot \\mathbb{P}(c \\ge \\theta \\land \\text{Incorrect})',
          explanation: 'Setting threshold theta too high wastes human labor; setting it too low allows costly catastrophic autonomous errors.',
        },
        {
          step: 2,
          label: 'Optimal Threshold Derivative',
          latex: '\\frac{d C_{\\text{total}}}{d \\theta} = 0 \\implies \\theta^* = 1 - \\frac{C_{\\text{human}}}{C_{\\text{error}}} \\cdot f_{\\text{marginal}}',
          explanation: 'When error cost C_error is massive (financial loss), optimal threshold theta* approaches 1.0 (mandatory human review).',
        },
        {
          step: 3,
          label: 'Categorical Separation Rule',
          latex: 'C_{\\text{error}}(\\text{DeleteTable}) \\to \\infty \\implies \\theta^* = 1.0 \\quad (\\text{Never auto-execute})',
          explanation: 'Irreversible destructive mutations require 100% human sign-off regardless of model confidence.',
        },
      ],
    },

    variables: [
      { symbol: '\\lambda_{\\text{risk}}', name: 'Risk Tolerance Ceiling', description: 'Threshold above which human approval is strictly mandatory' },
      { symbol: 'C_{\\text{human}}', name: 'Operator Review Cost', description: 'Cost and latency of engaging a human reviewer' },
      { symbol: 'C_{\\text{error}}', name: 'Catastrophic Error Cost', description: 'Financial or legal damages resulting from an incorrect autonomous action' },
      { symbol: '\\sigma_{\\text{audit}}', name: 'Audit Signature', description: 'Digital signature authenticating the human operator’s approval' },
    ],

    numericalExample: {
      scenario: 'Evaluating approval gating for a payment agent handling 100 transactions with $5,000 human review threshold',
      dataset: [
        { tier: 'Low (< $500)', count: 70, action: 'Auto-Executed', humanReviews: 0, errors: 0 },
        { tier: 'Med ($500 - $5,000)', count: 25, action: 'Auto-Executed (Confidence > 95%)', humanReviews: 0, errors: 0 },
        { tier: 'High (> $5,000)', count: 5, action: 'HITL Approval Gated', humanReviews: 5, blockedMistakes: 1 },
      ],
      calculations: [
        { step: 'Auto-Execution Rate', math: '(70 + 25) / 100', result: '95% Autonomous Throughput' },
        { step: 'Human Interventions', math: '5 out of 100 transactions', result: '5% Review Overhead' },
        { step: 'Catastrophic Loss Prevented', math: '1 erroneous $18,000 transfer intercepted', result: '$18,000 Saved' },
      ],
      finalConclusion: 'The HITL checkpoint achieved 95% autonomous throughput while successfully intercepting an unauthorized $18,000 transfer.',
    },

    visualExplanation: {
      title: 'Human-in-the-Loop Checkpoint Interception Flow',
      description: 'Observe how the orchestrator halts execution and awaits cryptographic authorization before mutation.',
      features: [
        'Agent Proposes: `wire_transfer(amount=$12,500, to="Supplier X")`',
        'Classifier: Checks metadata -> Tagged `consequential = True` (Exceeds $5,000 limit)',
        'State Freeze: Saves workflow state to Postgres DB; publishes approval ticket to Slack/Dashboard',
        'Human Reviewer: Inspects invoice -> Signs approval with private key -> Resumes workflow',
      ],
    },

    scratchCode: {
      title: 'HITL Approval Gate & Audit Logger in Pure Python',
      code: `import hashlib
import time

class HITLGate:
    def __init__(self, high_risk_threshold=5000):
        self.high_risk_threshold = high_risk_threshold
        self.pending_approvals = {}
        self.audit_log = []

    def request_execution(self, tool_name: str, args: dict, operator_available=True):
        amount = args.get("amount", 0)
        is_high_risk = amount >= self.high_risk_threshold or tool_name.startswith("destructive_")
        
        req_id = "req_" + hashlib.md5(f"{tool_name}{args}{time.time()}".encode()).hexdigest()[:8]
        
        if not is_high_risk:
            # Low risk: Auto-execute
            self.audit_log.append(f"[AUTO-EXECUTED] {tool_name} with args {args}")
            return {"status": "executed", "result": f"Executed {tool_name} successfully."}
            
        # High risk: Checkpoint intercept
        print(f"\\n[HITL ALERT] High-risk action intercepted! Tool: '{tool_name}' (Amount: " + str(amount) + " USD)")
        print(f"Checkpoint ID: {req_id} -> Pausing execution and notifying operator...")
        self.pending_approvals[req_id] = {"tool": tool_name, "args": args, "status": "pending"}
        
        # Simulate operator decision
        if operator_available:
            return self.resolve_approval(req_id, approved=True, operator_id="admin_user_01")
        return {"status": "paused", "checkpoint_id": req_id}

    def resolve_approval(self, req_id: str, approved: bool, operator_id: str):
        record = self.pending_approvals.get(req_id)
        if not record:
            return {"status": "error", "message": "Unknown checkpoint"}
            
        if approved:
            record["status"] = "approved"
            self.audit_log.append(f"[HUMAN APPROVED] Req {req_id} approved by {operator_id} for {record['tool']}.")
            print(f"[Operator: {operator_id}] APPROVED request {req_id}. Dispatching tool.")
            return {"status": "executed", "result": f"Executed {record['tool']} with verified human consent."}
        else:
            record["status"] = "rejected"
            self.audit_log.append(f"[HUMAN REJECTED] Req {req_id} BLOCKED by {operator_id}.")
            print(f"[Operator: {operator_id}] REJECTED request {req_id}. Aborting tool.")
            return {"status": "aborted", "reason": "Operator denied authorization."}

gate = HITLGate(high_risk_threshold=1000)

# 1. Safe Low-Risk Call
res1 = gate.request_execution("fetch_invoice", {"invoice_id": 104})
print("Result 1:", res1)

# 2. Consequential High-Risk Call
res2 = gate.request_execution("wire_transfer", {"amount": 8500, "beneficiary": "Acme Supplier"})
print("Result 2:", res2)

print("\\nImmutable Audit Log:")
for entry in gate.audit_log:
    print(" ", entry)`,
      explanation:
        'Implements risk threshold evaluation, state suspension, simulated operator sign-off, and permanent audit logging in pure Python.',
    },

    sklearnCode: {
      title: 'Cryptographic Audit Trail Token Generator',
      code: `import hmac
import hashlib
import json

def generate_signed_audit_token(secret_key: str, action_data: dict) -> str:
    # Serialize canonically
    canonical_payload = json.dumps(action_data, sort_keys=True)
    signature = hmac.new(
        secret_key.encode(),
        canonical_payload.encode(),
        hashlib.sha256
    ).hexdigest()
    
    token = {
        "payload": action_data,
        "hmac_sha256": signature
    }
    return json.dumps(token, indent=2)

audit_record = {
    "action": "delete_customer_database",
    "approver": "security_officer_42",
    "timestamp_utc": "2026-11-01T10:00:00Z",
    "justification": "GDPR Right to Be Forgotten request #88192"
}

signed_token = generate_signed_audit_token("enterprise_audit_secret_key", audit_record)
print(signed_token)`,
      explanation:
        'Generates HMAC-SHA256 digital signatures over approved action payloads to guarantee non-repudiation in SOC2 audits.',
    },

    runnableCode: {
      code: `def simulate_hitl_checkpoint():
    log = []
    log.append("Agent proposed tool: 'refund_customer(order_id=402, amount=$240)'")
    log.append("Risk Policy Check: Amount < $500 threshold -> Auto-approved.")
    log.append("Agent proposed tool: 'wire_settlement(recipient='supplier', amount=$12500)'")
    log.append("Risk Policy Check: Amount >= $5000 -> HITL Gate Triggered.")
    log.append("Operator 'admin_sarah' reviewed invoice: SIGNED & APPROVED.")
    log.append("Audit: Action logged with SHA-256 signature. Execution complete.")
    return "\\n".join(log)

print(simulate_hitl_checkpoint())`,
      expectedOutput: `Agent proposed tool: 'refund_customer(order_id=402, amount=$240)'
Risk Policy Check: Amount < $500 threshold -> Auto-approved.
Agent proposed tool: 'wire_settlement(recipient='supplier', amount=$12500)'
Risk Policy Check: Amount >= $5000 -> HITL Gate Triggered.
Operator 'admin_sarah' reviewed invoice: SIGNED & APPROVED.
Audit: Action logged with SHA-256 signature. Execution complete.`,
    },

    lineByLineExplanation: [
      { lines: '1-4', codeSnippet: 'log.append("Agent proposed tool: \'refund_customer...")', explanation: 'Evaluates low-risk action against policy thresholds and permits auto-execution.' },
      { lines: '5-7', codeSnippet: 'log.append("Agent proposed tool: \'wire_settlement...")...', explanation: 'Detects high-value transaction, pauses loop, and records human operator sign-off.' },
    ],

    hyperparameters: [
      { name: 'consequential_amount_threshold', defaultVal: '$5,000', range: '$100 - $50,000', effect: 'Monetary cutoff requiring human sign-off', recommendation: 'Set conservatively ($500 - $2,500) during initial deployment.' },
      { name: 'approval_timeout_minutes', defaultVal: '60', range: '5 - 1440', effect: 'Duration before unapproved checkpoints abort', recommendation: 'Abort and alert after 60 minutes to prevent zombie state.' },
    ],

    assumptions: [
      { assumption: 'Non-Bypassability', whyItMatters: 'If agents can trigger raw network calls outside the tool wrapper, HITL gates are useless', howToVerify: 'Enforce network egress firewalling allowing only the broker runtime to connect.' },
      { assumption: 'Operator Competence', whyItMatters: 'Rubber-stamping operators defeat the purpose of human review', howToVerify: 'Display synthesized contextual reasoning and diff previews in the UI.' },
    ],

    commonMistakes: [
      {
        mistake: 'Blocking the main application worker thread synchronously while waiting for a human',
        solution: 'Use asynchronous task checkpoints (e.g. Temporal, Celery, or Postgres state persistence).',
        whyWrong: 'Ties up server memory and worker connections for hours while waiting for human response.',
        howToFix: 'Serialize agent state to database and resume via webhook callback upon operator sign-off.',
      },
      {
        mistake: 'Failing to log who approved a destructive action',
        solution: 'Log the exact authenticated user ID, IP address, and timestamp with an HMAC signature.',
        whyWrong: 'Prevents incident forensics and violates enterprise SOC2/ISO 27001 audit compliance.',
        howToFix: 'Bind human identity tokens directly into the immutable audit envelope.',
      },
    ],

    realWorldUseCases: [
      { industry: 'Corporate Banking', application: 'Treasury Wire Processing', benefit: 'Allows automated invoice reconciliation while requiring CFO biometric sign-off on transfers > $25k.' },
      { industry: 'Cybersecurity', application: 'Firewall Remediation Agent', benefit: 'Investigates DDoS attacks autonomously; requires SRE confirmation before applying BGP route drops.' },
    ],

    practiceQuestions: [
      {
        id: 'pq-hitl-1',
        question: 'What is the difference between a reversible and an irreversible action in agent safety?',
        hint: 'Can you undo the operation with zero side effects?',
        answer: 'Reversible actions (e.g. querying a database, reading a document) can be rolled back with zero permanent external harm; irreversible actions (e.g. sending payments, deleting records, sending external emails) cannot be undone once executed.',
        explanation: 'Irreversible actions represent the critical boundary where HITL gates are mandatory.',
      },
      {
        id: 'pq-hitl-2',
        question: 'How should an agent runtime handle a situation where a human operator rejects a proposed tool action?',
        hint: 'Does the whole system crash?',
        answer: 'The runtime should inject an observation indicating "Action denied by operator: <justification>", allowing the agent to formulate an alternative non-destructive strategy.',
        explanation: 'Treating human rejection as a reasoned observation enables graceful fallback.',
      },
      {
        id: 'pq-hitl-3',
        question: 'Why are cryptographic HMAC signatures recommended for audit log entries?',
        hint: 'What if an attacker tries to edit the database log?',
        answer: 'HMAC signatures guarantee non-repudiation and tamper-evidence, ensuring logs cannot be retroactively altered or deleted by malicious actors.',
        explanation: 'Essential for passing formal SOC2, HIPAA, and ISO 27001 regulatory audits.',
      },
    ],

    quiz: [
      {
        id: 'qz-hitl-1',
        question: 'Which of the following operations should ALWAYS require human confirmation before execution?',
        options: [
          'Reading a customer profile from an authenticated SQL database',
          'Formatting a Markdown bulleted list',
          'Executing an irreversible $25,000 international bank wire transfer',
          'Computing the square root of 144',
        ],
        correctIndex: 2,
        explanation: 'Financial mutations are irreversible and carry severe liability; they must be gated behind human approval.',
      },
      {
        id: 'qz-hitl-2',
        question: 'What architectural pattern should be used to wait for a human approval that might take 4 hours?',
        options: [
          'A while(true) sleep loop holding an active HTTP connection open',
          'Serializing state to a durable database and pausing execution asynchronously until an approval webhook arrives',
          'Restarting the server every 10 seconds',
          'Executing the tool anyway after 5 seconds',
        ],
        correctIndex: 1,
        explanation: 'Durable asynchronous state persistence frees system resources while waiting indefinitely for human sign-off.',
      },
      {
        id: 'qz-hitl-3',
        question: 'What is confidence-based escalation?',
        options: [
          'Giving the agent more self-confidence through positive reinforcement prompts',
          'Automatically routing low-confidence or ambiguous decisions to a human operator',
          'Increasing the temperature parameter to 2.0',
          'Deleting all tools when confidence drops below 50%',
        ],
        correctIndex: 1,
        explanation: 'When model confidence is low, routing to a human prevents errors caused by hallucination.',
      },
    ],

    independentExercise: {
      id: 'ex-09-action-classifier',
      title: 'Build a Consequential Action Classifier',
      problem: 'Write a Python function `classify_action_risk(tool_name, args, destructive_tools, max_safe_amount=1000)` that returns `"SAFE"` for read/low-risk actions, or `"REQUIRES_APPROVAL"` if `tool_name` is in `destructive_tools` or if `args.get("amount", 0) > max_safe_amount`.',
      hints: ['Check membership in destructive_tools first, then inspect amount.'],
      starterCode: `def classify_action_risk(tool_name: str, args: dict, destructive_tools: list, max_safe_amount: float = 1000):
    # TODO: Implement classification
    pass

destructives = ["drop_table", "purge_logs", "send_bulk_email"]
print("Test 1:", classify_action_risk("read_sql", {"table": "users"}, destructives))
print("Test 2:", classify_action_risk("wire_funds", {"amount": 2500}, destructives))
print("Test 3:", classify_action_risk("drop_table", {"table": "temp"}, destructives))`,
      solution: `def classify_action_risk(tool_name: str, args: dict, destructive_tools: list, max_safe_amount: float = 1000):
    if tool_name in destructive_tools:
        return "REQUIRES_APPROVAL"
    if args.get("amount", 0) > max_safe_amount:
        return "REQUIRES_APPROVAL"
    return "SAFE"

destructives = ["drop_table", "purge_logs", "send_bulk_email"]
print("Test 1:", classify_action_risk("read_sql", {"table": "users"}, destructives))
print("Test 2:", classify_action_risk("wire_funds", {"amount": 2500}, destructives))
print("Test 3:", classify_action_risk("drop_table", {"table": "temp"}, destructives))`,
    },

    summary: {
      keyTakeaways: [
        'Differentiate safe reversible read operations from irreversible consequential mutations.',
        'Human-in-the-Loop checkpoints freeze agent execution before high-risk tools dispatch.',
        'Use asynchronous state persistence (checkpoints) to wait for human review without thread exhaustion.',
        'Maintain immutable, cryptographically signed audit logs capturing operator identity and parameters.',
      ],
      nextLessonId: 'agent-10-evaluation',
      nextLessonTitle: 'Agent-10: Agent Evaluation, Benchmarks & Trajectory Metrics',
      nextLessonModuleId: 'p9-m10',
    },
  },
};
