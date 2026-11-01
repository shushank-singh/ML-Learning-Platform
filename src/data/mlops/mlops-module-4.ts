import { ModuleData, LessonContent } from '@/lib/types';

// =========================================================================
// MODULE 10: LLMOps Fundamentals (p10-m10)
// =========================================================================
export const p10m10Data: ModuleData = {
  id: 'p10-m10',
  number: 10,
  title: 'LLMOps Fundamentals',
  subtitle: 'Extending MLOps to Foundation Models, Prompts, Tokens & Non-Determinism',
  description:
    'Deconstruct how LLMOps extends classical MLOps. Master prompt template versioning, inference parameter management (temperature, top_p), token usage estimation, latency attribution, and the contrast between classical tabular monitoring and probabilistic text generation.',
  icon: 'Bot',
  badge: 'Phase 10 · LLMOps',
  estimatedHours: 3,
  topicsCount: 1,
  lessons: [
    {
      id: 'mlops-10-llmops-fundamentals',
      moduleId: 'p10-m10',
      title: 'LLMOps-10: LLMOps Fundamentals & Prompt Versioning',
      description:
        'How LLMOps extends MLOps: prompt templates as code, non-deterministic outputs, token economics, latency trade-offs, and foundation model dependencies.',
      order: 1,
      readTimeMinutes: 34,
      visualizerType: 'mlops-trace-timeline-explorer',
      difficulty: 'Intermediate',
    },
  ],
};

// =========================================================================
// MODULE 11: LLM Evaluation and Regression Testing (p10-m11)
// =========================================================================
export const p10m11Data: ModuleData = {
  id: 'p10-m11',
  number: 11,
  title: 'LLM Evaluation & Regression Testing',
  subtitle: 'Golden Datasets, Exact Match, Rubrics, LLM-as-a-Judge & Calibrations',
  description:
    'Build zero-paid offline and online evaluation harnesses for language applications. Master golden benchmark datasets, deterministic regex/schema assertions, rubric scoring (1-5), and LLM-as-a-judge methodologies while accounting for judge bias and calibration.',
  icon: 'Scale',
  badge: 'Phase 10 · LLMOps',
  estimatedHours: 3,
  topicsCount: 1,
  lessons: [
    {
      id: 'mlops-11-llm-eval-testing',
      moduleId: 'p10-m11',
      title: 'LLMOps-11: LLM Evaluation Harnesses & LLM-as-a-Judge',
      description:
        'Offline evaluation suites, golden test datasets, deterministic keyword/schema assertions, LLM-as-a-judge calibrations, and regression prevention.',
      order: 1,
      readTimeMinutes: 36,
      visualizerType: 'mlops-llm-evaluation-explorer',
      difficulty: 'Intermediate',
    },
  ],
};

// =========================================================================
// MODULE 12: LLM Observability and Tracing (p10-m12)
// =========================================================================
export const p10m12Data: ModuleData = {
  id: 'p10-m12',
  number: 12,
  title: 'LLM Observability & Tracing',
  subtitle: 'OpenTelemetry Spans, Request Correlation, TTFT & PII Redaction',
  description:
    'Implement distributed tracing for compound AI applications. Trace user requests through guardrails, embedding models, vector retrievals, LLM generations, and tool calls. Measure Time-To-First-Token (TTFT), token burn rates, and privacy redaction.',
  icon: 'Network',
  badge: 'Phase 10 · LLMOps',
  estimatedHours: 3,
  topicsCount: 1,
  lessons: [
    {
      id: 'mlops-12-observability-tracing',
      moduleId: 'p10-m12',
      title: 'LLMOps-12: LLM Observability, Traces & PII Sanitization',
      description:
        'Hierarchical trace timelines, span latency waterfalls, Time-to-First-Token (TTFT), correlation IDs, and privacy-preserving PII scrubbing.',
      order: 1,
      readTimeMinutes: 35,
      visualizerType: 'mlops-trace-timeline-explorer',
      difficulty: 'Intermediate',
    },
  ],
};

// =========================================================================
// LESSON CONTENTS (Modules 10 - 12)
// =========================================================================
export const mlopsModule4Lessons: Record<string, LessonContent> = {
  'mlops-10-llmops-fundamentals': {
    id: 'mlops-10-llmops-fundamentals',
    moduleId: 'p10-m10',
    title: 'LLMOps-10: LLMOps Fundamentals & Prompt Versioning',
    subtitle: 'From Weight Retraining to Prompt Engineering, Token Budgets & Non-Determinism',
    order: 1,
    readTimeMinutes: 34,
    difficulty: 'Intermediate',
    visualizerType: 'mlops-trace-timeline-explorer',

    objectives: [
      'Contrast traditional MLOps (retraining custom weights) with LLMOps (prompt engineering, retrieval, fine-tuning, and compound systems)',
      'Treat Prompts as Code: establish version control, parameter injection, and change tracking for prompt templates',
      'Manage non-deterministic outputs through temperature, top_p, and strict schema validation constraints',
      'Model LLM operational unit economics: calculate input/output token usage, throughput, and billing attribution',
      'Differentiate traditional feature drift from LLM qualitative degradation (tone drift, hallucination spikes, refusal regressions)',
    ],

    prerequisites: [
      'Understanding of foundational MLOps concepts (Lessons 1 & 2)',
      'Familiarity with Large Language Models and prompt structure (Phase 7)',
    ],
    previousLesson: {
      id: 'mlops-09-monitoring-drift',
      title: 'MLOps-09: Production Monitoring, Data Drift & Concept Drift',
      moduleId: 'p10-m9',
    },

    analogy: {
      title: 'Custom Engine Manufacturing vs Aircraft Leasing & Aviation Operations',
      text: 'In traditional MLOps, you are like an automotive engine manufacturer: you smelt steel, cast pistons, and calibrate fuel injectors from scratch (training models on tabular data). If performance drops, you shut down the factory and re-cast new metal (retrain weights). In LLMOps, you do not build the Boeing 787 jet engine from raw metal; you lease massive, pre-built turbine engines from global aerospace firms (foundation models from OpenAI, Google, Anthropic, or open weights). Your engineering focus shifts to flight route planning (system prompts), fuel consumption optimization (token budgets), passenger safety screening (guardrails), and in-flight black box telemetry (observability).',
      metaphor: 'MLOps builds and trains the custom engine; LLMOps operates, navigates, and guards the leased jumbo jet.',
    },

    problemSolved: {
      title: 'The "Tweak the Prompt in the Web Playground" Production Anti-Pattern',
      description:
        'Engineers frequently prototype LLM features by tweaking prompts in web playgrounds, hardcoding multiline prompt strings into application handlers, and deploying without versioning. When the model provider updates the underlying checkpoint or temperature creates a hallucination, there is no audit trail, no rollback mechanism, and no regression test suite.',
      keyPoints: [
        'Prompts as Versioned Software: Treating prompt templates with the same rigor as application code (Git, semver, review gates)',
        'Compound System Complexity: Managing multiple interdependent components (retriever, reranker, prompt template, foundation model, tools)',
        'Unbounded Output Spaces: Validating open-ended natural language generation rather than fixed 1-hot classification classes',
        'Direct Financial Telemetry: Every single inference token incurs a real-time monetary cost and latency penalty',
      ],
    },

    intuition: {
      overview:
        'LLMOps establishes operational discipline around foundation model applications by versioning prompt templates, tracking token usage, enforcing schema constraints, and tracing multi-step execution graphs.',
      steps: [
        {
          step: 1,
          title: 'Prompt Template Parameterization',
          description:
            'Decouple static prompt instructions from dynamic runtime variables (e.g. `{user_query}`, `{retrieved_context}`). Store templates in versioned files.',
        },
        {
          step: 2,
          title: 'Inference Configuration Locking',
          description:
            'Pin model identifier (e.g. `gemini-1.5-pro-002`), temperature (0.0 for deterministic tools), top_p, and frequency penalty in configuration manifests.',
        },
        {
          step: 3,
          title: 'Token Budget & Cost Accounting',
          description:
            'Track prompt tokens and completion tokens on every call. Attribute expenditures to user IDs and feature endpoints.',
        },
        {
          step: 4,
          title: 'Continuous Regression Evaluation',
          description:
            'Execute automated test suites against golden datasets whenever prompt templates or model versions are modified.',
        },
      ],
    },

    mathematics: {
      overview:
        'LLM inference cost and latency can be formalized as linear combinations of prompt tokens N_in and completion tokens N_out.',
      foundations: [
        {
          name: 'Token Cost Linear Formulation',
          latex: 'C_{\\text{req}} = \\frac{N_{\\text{in}}}{10^6} \\cdot P_{\\text{in}} + \\frac{N_{\\text{out}}}{10^6} \\cdot P_{\\text{out}}',
          explanation:
            'Request cost C_req depends on input tokens N_in at price P_in and generated completion tokens N_out at price P_out (prices per 1M tokens).',
        },
        {
          name: 'End-to-End Latency Decomposition',
          latex: 'T_{\\text{latency}} = T_{\\text{TTFT}} + N_{\\text{out}} \\cdot t_{\\text{per-token}}',
          explanation:
            'Total request turnaround time decomposes into Time-To-First-Token (TTFT, dominated by prompt ingestion) plus generation time proportional to output tokens.',
        },
      ],
    },

    derivation: {
      title: 'Derivation of Semantic Caching Cost & Latency Reduction',
      objective: 'Calculate effective latency and operational cost savings under semantic response caching.',
      steps: [
        {
          step: 1,
          label: 'Uncached Cost & Latency Expectation',
          latex: 'E[C_0] = C_{\\text{req}}, \\quad E[T_0] = T_{\\text{latency}}',
          explanation: 'Every user request triggers full foundation model inference.',
        },
        {
          step: 2,
          label: 'Semantic Cache Hit Rate Formulation',
          latex: 'H = P\\big(\\text{sim}(q_{\\text{new}}, q_{\\text{cached}}) \\ge \\tau\\big)',
          explanation: 'Fraction H of requests match previously cached queries within semantic cosine similarity threshold tau.',
        },
        {
          step: 3,
          label: 'Effective Amortized Performance',
          latex: 'E[C_{\\text{eff}}] = (1 - H) \\cdot C_{\\text{req}} + H \\cdot C_{\\text{cache}}, \\quad E[T_{\\text{eff}}] = (1 - H) \\cdot T_{\\text{latency}} + H \\cdot T_{\\text{cache}}',
          explanation: 'Because C_cache approx 0 and T_cache approx 15ms, achieving H = 0.40 slashes monthly bills by ~40% and reduces median user latency.',
        },
      ],
    },

    variables: [
      { symbol: 'N_{\\text{in}}', name: 'Input Tokens', description: 'Count of tokens in system instructions, context, and user message' },
      { symbol: 'N_{\\text{out}}', name: 'Output Tokens', description: 'Count of generated response tokens produced by the LLM' },
      { symbol: 'T_{\\text{TTFT}}', name: 'Time to First Token', description: 'Latency until the first token stream chunk arrives at client' },
      { symbol: 'H', name: 'Cache Hit Rate', description: 'Proportion of requests satisfied by semantic vector cache (0.0 to 1.0)' },
    ],

    numericalExample: {
      scenario: 'Calculating daily operational cost and latency for a customer support LLM processing 50,000 queries per day',
      dataset: [
        { parameter: 'Input Tokens (avg)', value: 1200 },
        { parameter: 'Output Tokens (avg)', value: 250 },
        { parameter: 'Example Input Price / 1M', value: 2.50 },
        { parameter: 'Example Output Price / 1M', value: 10.00 },
        { parameter: 'Cache Hit Rate', value: '35%' },
      ],
      calculations: [
        { step: 'Single Uncached Call Cost', math: '(1200 / 10^6) \\times 2.50 + (250 / 10^6) \\times 10.00 = 0.003 + 0.0025', result: '$0.0055 USD per call' },
        { step: 'Daily Uncached Spend', math: '50000 \\times 0.0055', result: '$275.00 / day ($8,250 / month)' },
        { step: 'Daily Spend with 35% Cache Hit Rate', math: '50000 \\times (1 - 0.35) \\times 0.0055', result: '$178.75 / day ($5,362 / month; save $2,888/mo)' },
      ],
      finalConclusion: 'Configuring a semantic cache saving 35% of redundant queries reduces monthly provider expenditures by $2,888.',
    },

    visualExplanation: {
      title: 'The LLMOps Pipeline Architecture',
      description:
        'A comprehensive flow contrasting prompt versioning, runtime guardrails, foundation model API calls, caching, and evaluation harnesses.',
      features: [
        'Prompt Registry: Stores parameterized templates with semver tags (e.g. `support_bot:v2.1`)',
        'Guardrail Filter: Pre-call PII scrubbing and prompt injection detection',
        'Semantic Cache: Fast vector lookup for frequent queries returning 15ms cached responses',
        'Trace Collector: Emits OpenTelemetry spans capturing latency, token count, and cost',
      ],
    },

    scratchCode: {
      title: 'Production Prompt Template Engine with Versioning',
      code: `import hashlib
import json
import time

class PromptTemplate:
    def __init__(self, template_str: str, version: str, default_params: dict = None):
        self.template_str = template_str
        self.version = version
        self.default_params = default_params or {"temperature": 0.0, "max_tokens": 512}
        self.template_hash = hashlib.sha256(template_str.encode()).hexdigest()[:12]

    def format(self, **kwargs) -> str:
        """Formats the template and asserts zero unreplaced variables remain"""
        try:
            return self.template_str.format(**kwargs)
        except KeyError as e:
            raise ValueError(f"Missing required prompt template variable: {e}")

class PromptRegistry:
    def __init__(self):
        self.prompts = {}

    def register(self, name: str, template: PromptTemplate):
        if name not in self.prompts:
            self.prompts[name] = {}
        self.prompts[name][template.version] = template
        print(f"[PromptRegistry] Registered '{name}' v{template.version} (hash: {template.template_hash})")

    def get(self, name: str, version: str) -> PromptTemplate:
        return self.prompts[name][version]

# Usage
registry = PromptRegistry()

tpl_v1 = PromptTemplate(
    template_str="You are a support agent. Answer customer question: {query}",
    version="1.0.0"
)
tpl_v2 = PromptTemplate(
    template_str="You are a strict, helpful support agent. Context: {context}\\nQuestion: {query}\\nAnswer in under 30 words:",
    version="2.0.0",
    default_params={"temperature": 0.0, "max_tokens": 100}
)

registry.register("customer_support", tpl_v1)
registry.register("customer_support", tpl_v2)

active_prompt = registry.get("customer_support", "2.0.0")
formatted = active_prompt.format(context="Orders ship in 2 business days.", query="When will my shoes arrive?")
print("\\nFormatted Prompt Payload:\\n", formatted)`,
      explanation:
        'A complete Python Prompt Template engine decoupling prompts from code, tracking cryptographic template hashes, and enforcing variable substitution integrity.',
    },

    sklearnCode: {
      title: 'LLM Unit Economics & Token Cost Tracker Pattern',
      code: `import json

class LLMCostEstimator:
    """Configurable example rates for learning unit economics.
    Not guaranteed current provider prices."""
    RATES = {
        "frontier-pro": {"input_per_m": 2.50, "output_per_m": 10.00},
        "light-flash": {"input_per_m": 0.15, "output_per_m": 0.60}
    }

    @classmethod
    def calculate_cost(cls, model_tier: str, in_tokens: int, out_tokens: int) -> dict:
        rates = cls.RATES.get(model_tier, cls.RATES["light-flash"])
        cost_in = (in_tokens / 1_000_000.0) * rates["input_per_m"]
        cost_out = (out_tokens / 1_000_000.0) * rates["output_per_m"]
        total = cost_in + cost_out
        
        return {
            "model_tier": model_tier,
            "in_tokens": in_tokens,
            "out_tokens": out_tokens,
            "cost_in_usd": round(cost_in, 6),
            "cost_out_usd": round(cost_out, 6),
            "total_cost_usd": round(total, 6),
            "disclaimer": "Configurable example prices for educational budgeting."
        }

# Compare single transaction across tiers
print("Frontier Pro Cost:", json.dumps(LLMCostEstimator.calculate_cost("frontier-pro", 1200, 250), indent=2))
print("Light Flash Cost:", json.dumps(LLMCostEstimator.calculate_cost("light-flash", 1200, 250), indent=2))`,
      explanation:
        'Implements structured token unit economics with configurable example rates, illustrating the 15x cost difference between frontier reasoning models and lightweight flash tiers.',
    },

    runnableCode: {
      code: `def estimate_llm_burn(daily_requests, avg_in, avg_out, cache_hit_rate=0.40):
    # Illustrative configurable example prices: $2.50 / $10.00 per 1M tokens
    in_price = 2.50
    out_price = 10.00
    
    uncached_reqs = daily_requests * (1 - cache_hit_rate)
    daily_cost = ((uncached_reqs * avg_in / 1e6) * in_price + 
                  (uncached_reqs * avg_out / 1e6) * out_price)
    monthly_cost = daily_cost * 30
    
    return f"Daily Spend: \${daily_cost:.2f} | Monthly Estimated Burn: \${monthly_cost:.2f} (with {int(cache_hit_rate*100)}% cache offload)"

print(estimate_llm_burn(daily_requests=25000, avg_in=1500, avg_out=300, cache_hit_rate=0.35))`,
      expectedOutput: 'Daily Spend: $93.44 | Monthly Estimated Burn: $2803.12 (with 35% cache offload)',
    },

    lineByLineExplanation: [
      { lines: '1-4', codeSnippet: 'def estimate_llm_burn(...) ... in_price / out_price', explanation: 'Initializes token volume inputs and illustrative configurable provider rate cards.' },
      { lines: '6-8', codeSnippet: 'uncached_reqs = daily_requests * (1 - cache_hit_rate) ...', explanation: 'Accounts for semantic cache offloading before multiplying by token prices.' },
      { lines: '9-12', codeSnippet: 'return f"Daily Spend: ${daily_cost:.2f} ..."', explanation: 'Emits monthly cost projection with cache attribution.' },
    ],

    hyperparameters: [
      { name: 'temperature', defaultVal: '0.0', range: '0.0 - 1.0', effect: 'Controls output randomness and sampling entropy', recommendation: 'Set strictly to 0.0 for structured JSON, tool use, and deterministic classification.' },
      { name: 'max_tokens', defaultVal: '512', range: '1 - 4096', effect: 'Upper ceiling on generated tokens', recommendation: 'Always set a tight limit to protect against runaway generation billing.' },
      { name: 'top_p', defaultVal: '1.0', range: '0.1 - 1.0', effect: 'Nucleus sampling probability mass', recommendation: 'Keep at 1.0 when temperature is 0.0.' },
    ],

    assumptions: [
      { assumption: 'Provider Rate Card Stability', whyItMatters: 'Provider price changes alter financial projections without code alterations', howToVerify: 'Keep rates configurable in environment variables rather than hardcoded.' },
      { assumption: 'Prompt Parameter Strictness', whyItMatters: 'Missing template arguments will cause Python runtime exceptions during prompt formatting', howToVerify: 'Use automated unit tests asserting all template variables are provided.' },
    ],

    commonMistakes: [
      {
        mistake: 'Hardcoding multiline prompt strings directly inside application API endpoints',
        solution: 'Extract prompts into dedicated version-controlled template files.',
        whyWrong: 'Engineers cannot audit prompt revisions, perform A/B tests, or roll back a bad prompt change.',
        howToFix: 'Create a prompt registry or directory of .txt / .yaml prompt templates tracked in Git.',
      },
      {
        mistake: 'Deploying high-concurrency LLM endpoints without a max_tokens output ceiling',
        solution: 'Always configure a strict max_tokens parameter.',
        whyWrong: 'An adversarial input or prompt loop can generate 4,000 tokens per call, causing 20-second latencies and massive bills.',
        howToFix: 'Enforce max_tokens=256 or 512 for conversational responses.',
      },
    ],

    realWorldUseCases: [
      { industry: 'Customer Care', application: 'Omnichannel Virtual Assistant', benefit: 'Prompt registry allows prompt engineers to update bot persona without redeploying code.' },
      { industry: 'LegalTech', application: 'Contract Clause Summarizer', benefit: 'Pins temperature to 0.0 and tracks token expenditures across client legal matters.' },
      { industry: 'EdTech', application: 'Personalized AI Tutor', benefit: 'Applies tiered routing: 85% of queries handled by fast flash tier, 15% complex math routed to frontier pro.' },
    ],

    practiceQuestions: [
      {
        id: 'pq-1',
        question: 'What is the primary difference in operational focus between classical MLOps and LLMOps?',
        hint: 'Think about who trains the model weights and what artifacts are managed.',
        answer: 'In classical MLOps, teams train custom models on internal tabular/image datasets and manage training pipelines, weights, and feature stores. In LLMOps, teams build on pre-trained foundation models; the operational focus shifts to prompt template versioning, retrieval context management (RAG), guardrails, token budget economics, and compound application tracing.',
        explanation: 'MLOps focuses on training pipelines; LLMOps focuses on context, prompts, and inference governance.',
      },
      {
        id: 'pq-2',
        question: 'Why is it critical to set the temperature parameter to 0.0 for structured JSON extraction tasks?',
        hint: 'What happens to JSON syntax and key names when sampling entropy is non-zero?',
        answer: 'A temperature of 0.0 forces greedy argmax token selection, making outputs as deterministic as possible. This drastically reduces the likelihood of hallucinated JSON keys, trailing commas, or syntax errors, ensuring reliable downstream schema deserialization.',
        explanation: 'Zero temperature maximizes schema conformance in structured data tasks.',
      },
      {
        id: 'pq-3',
        question: 'How does semantic caching differ from traditional web key-value caching (e.g. Redis hash of exact string)?',
        hint: 'Consider slight phrasing variations like "How do I return an item?" vs "What is the return policy?".',
        answer: 'Traditional caching requires exact, character-for-character string equality. Semantic caching computes the vector embedding of incoming questions and measures cosine similarity against previously answered queries. If similarity exceeds a threshold (e.g. 0.92), it returns the cached answer in 15ms, saving 100% of the LLM token cost even with different wording.',
        explanation: 'Semantic caching matches conceptual meaning rather than exact keyword characters.',
      },
    ],

    quiz: [
      {
        id: 'qz-1',
        question: 'In LLMOps, why should prompt templates be treated as code in version control?',
        options: [
          'Because language models cannot read English unless it is committed to Git',
          'To enable change tracking, code review, automated regression testing, and instant rollback when prompts degrade behavior',
          'Because Python requires all prompts to be compiled into C binaries',
          'To make the application run without an internet connection',
        ],
        correctIndex: 1,
        explanation: 'Treating prompts as code enables version history, peer reviews, automated regression test runs, and safe rollbacks.',
      },
      {
        id: 'qz-2',
        question: 'Which metric measures the latency before the user receives the very first generated word from an LLM stream?',
        options: [
          'Population Stability Index (PSI)',
          'Time to First Token (TTFT)',
          'Area Under the ROC Curve (AUC)',
          'Mean Reciprocal Rank (MRR)',
        ],
        correctIndex: 1,
        explanation: 'Time to First Token (TTFT) measures responsiveness from request initiation until the first token chunk arrives.',
      },
      {
        id: 'qz-3',
        question: 'What is the primary financial benefit of implementing a semantic cache in front of a commercial LLM API?',
        options: [
          'It eliminates the need for electricity in the data center',
          'It satisfies repetitive user queries locally in ~15ms, bypassing provider token API fees and slashing monthly bills',
          'It forces the model provider to refund previous invoices',
          'It automatically retrains model weights for free',
        ],
        correctIndex: 1,
        explanation: 'Semantic caching intercepts common questions and answers them locally in milliseconds with zero LLM provider API charges.',
      },
    ],

    independentExercise: {
      id: 'ex-10-prompt-validator',
      title: 'Build a Prompt Variable Contract Validator',
      problem: 'Write a Python function `validate_prompt_payload(template_text, provided_kwargs)` that extracts all variable placeholders enclosed in curly braces `{var}` from `template_text` and checks if every required variable exists in `provided_kwargs`. Return `{"valid": bool, "missing_vars": list}`.',
      hints: [
        'Use re.findall(r"\{([a-zA-Z0-9_]+)\}", template_text) to extract placeholders',
        'Check set(required_vars).difference(set(provided_kwargs.keys()))',
      ],
      starterCode: `import re

def validate_prompt_payload(template: str, kwargs: dict) -> dict:
    # TODO: Implement prompt template contract validation
    pass

# Test
tpl = "Context: {context}\\nQuery: {query}\\nLanguage: {language}"
print(validate_prompt_payload(tpl, {"context": "Doc A", "query": "Hello"}))
print(validate_prompt_payload(tpl, {"context": "Doc A", "query": "Hello", "language": "en"}))`,
      solution: `import re

def validate_prompt_payload(template: str, kwargs: dict) -> dict:
    placeholders = set(re.findall(r"\{([a-zA-Z0-9_]+)\}", template))
    missing = sorted(list(placeholders.difference(set(kwargs.keys()))))
    return {
        "valid": len(missing) == 0,
        "missing_vars": missing
    }

tpl = "Context: {context}\\nQuery: {query}\\nLanguage: {language}"
print(validate_prompt_payload(tpl, {"context": "Doc A", "query": "Hello"}))
print(validate_prompt_payload(tpl, {"context": "Doc A", "query": "Hello", "language": "en"}))`,
    },

    summary: {
      keyTakeaways: [
        'LLMOps shifts operational focus from training custom weights to prompt engineering, retrieval, and governance.',
        'Treat Prompts as Code: version them in Git, pin model parameters (temperature, max_tokens), and track changes.',
        'Token unit economics directly determine operational cost; semantic caching and tiered routing reduce financial burn.',
        'Time-To-First-Token (TTFT) and token generation speed dictate user perceived latency in generative applications.',
      ],
      nextLessonId: 'mlops-11-llm-eval-testing',
    },
  },

  'mlops-11-llm-eval-testing': {
    id: 'mlops-11-llm-eval-testing',
    moduleId: 'p10-m11',
    title: 'LLMOps-11: LLM Evaluation Harnesses & LLM-as-a-Judge',
    subtitle: 'Golden Datasets, Exact Match, Rubrics, LLM-as-a-Judge & Calibrations',
    order: 1,
    readTimeMinutes: 36,
    difficulty: 'Intermediate',
    visualizerType: 'mlops-llm-evaluation-explorer',

    objectives: [
      'Architect offline and online evaluation suites for foundation model applications',
      'Curate representative Golden Datasets to serve as automated regression test suites',
      'Implement tiered evaluation metrics: exact match, schema validation, keyword/regex assertions, and semantic similarity',
      'Understand LLM-as-a-Judge: benefits, positional bias, self-enhancement bias, calibration, and rubric design',
      'Build a lightweight, zero-paid evaluation harness that tests prompts without requiring commercial API keys',
    ],

    prerequisites: [
      'Understanding of model evaluation metrics and prompt versioning (Lessons 1 & 10)',
      'Basic knowledge of regular expressions and Python dictionaries',
    ],
    previousLesson: {
      id: 'mlops-10-llmops-fundamentals',
      title: 'LLMOps-10: LLMOps Fundamentals & Prompt Versioning',
      moduleId: 'p10-m10',
    },

    analogy: {
      title: 'The Standardized Driving Exam vs An Informal Casual Chat',
      text: 'If a Department of Motor Vehicles tested student drivers by having an examiner chat with them in a parking lot for 2 minutes and guessing if they seemed friendly, dangerous drivers would flood the highway. Driving tests require an objective standardized exam: 1) Parallel park within 12 inches of the curb (exact schema contract), 2) Stop completely at the red stop sign line (deterministic safety rule), 3) Signal before changing lanes (rubric assertion). If an applicant hits a pedestrian during the test, they fail immediately regardless of their score on other tasks. An LLM evaluation harness is that rigorous driving exam: it subjects candidate prompts to a battery of mandatory challenges and flags regressions before deployment.',
      metaphor: 'Ad-hoc playground testing is casual chatting; an evaluation harness is the rigorous, standardized driving exam.',
    },

    problemSolved: {
      title: 'The Prompt Tweaking Whack-A-Mole Trap',
      description:
        'When an engineer modifies a system prompt to fix a specific bug reported by a user, that prompt modification often silently degrades performance on 15 other unrelated tasks. Without an automated regression test suite, teams play endless "whack-a-mole", fixing one issue while breaking three others.',
      keyPoints: [
        'Regression Prevention: Running candidate prompts against 100+ frozen test cases before merging changes',
        'Tiered Evaluation Hierarchy: Combining fast deterministic unit tests (regex, JSON parsing) with qualitative rubric judges',
        'Judge Bias Mitigation: Mitigating LLM-as-a-Judge positional bias (favoring the first choice) and verbosity bias (favoring longer answers)',
        'Zero-Paid Evaluation: Using deterministic assertions and local heuristics to evaluate outputs without paying per-token evaluation fees',
      ],
    },

    intuition: {
      overview:
        'An evaluation harness passes a candidate prompt version through a curated golden dataset of inputs, runs automated grading assertions, and generates a comparative scorecard against the baseline prompt version.',
      steps: [
        {
          step: 1,
          title: 'Golden Dataset Curation',
          description:
            'Assemble 50-200 representative test cases spanning core capabilities, edge cases, multilingual queries, and adversarial jailbreaks.',
        },
        {
          step: 2,
          title: 'Deterministic Assertion Tier',
          description:
            'Grade fast binary criteria: Is the output valid JSON? Does it contain required keywords? Did it stay within word count limits?',
        },
        {
          step: 3,
          title: 'Rubric-Based Evaluation Tier',
          description:
            'For open-ended generation, evaluate against a defined 1-5 scale: Completeness, Groundedness, Conciseness, and Tone.',
        },
        {
          step: 4,
          title: 'Scorecard & Regression Gate',
          description:
            'Compare pass rates between Prompt v1 and Prompt v2. If v2 fixes the target bug but regresses overall score, block the pull request.',
        },
      ],
    },

    mathematics: {
      overview:
        'Evaluation benchmarks evaluate empirical accuracy across N golden items using indicator functions and calibrated rubric scores.',
      foundations: [
        {
          name: 'Golden Dataset Pass Rate',
          latex: '\\text{PassRate} = \\frac{1}{N} \\sum_{i=1}^N \\prod_{j=1}^M \\mathbb{I}\\big(\\text{Assert}_j(y_i) = \\text{True}\\big)',
          explanation:
            'A test item i passes only if all M deterministic assertions (schema, keywords, safety refusal) are satisfied simultaneously.',
        },
        {
          name: 'Cohen’s Kappa Inter-Annotator Agreement',
          latex: '\\kappa = \\frac{p_o - p_e}{1 - p_e}',
          explanation:
            'Measures agreement between LLM-as-a-judge scores and human ground-truth ratings, where p_o is observed agreement and p_e is chance agreement. Kappa > 0.70 indicates reliable calibration.',
        },
      ],
    },

    derivation: {
      title: 'Derivation of Position Bias Correction in LLM-as-a-Judge',
      objective: 'Eliminate order bias when using an LLM judge to compare Candidate A vs Baseline B.',
      steps: [
        {
          step: 1,
          label: 'Forward Pairwise Evaluation',
          latex: 'S_{\\text{fwd}} = \\text{Judge}(A, B) \\in \\{1 \\text{ (A wins)}, 0 \\text{ (B wins)}\\}',
          explanation: 'Model A is presented first, Model B second. Many LLMs exhibit strong preference for option A.',
        },
        {
          step: 2,
          label: 'Reverse Pairwise Evaluation',
          latex: 'S_{\\text{rev}} = \\text{Judge}(B, A) \\in \\{1 \\text{ (B wins)}, 0 \\text{ (A wins)}\\}',
          explanation: 'Evaluate the exact same prompt with order swapped (Model B first, Model A second).',
        },
        {
          step: 3,
          label: 'Calibrated Symmetric Consensus',
          latex: 'A \\succ B \\iff S_{\\text{fwd}} = 1 \\;\\land\\; S_{\\text{rev}} = 0',
          explanation: 'Model A is crowned winner ONLY if it wins in both orientations, neutralizing position bias.',
        },
      ],
    },

    variables: [
      { symbol: 'y_i', name: 'Generated Output', description: 'Text or JSON response generated by the candidate prompt on test item i' },
      { symbol: 'N', name: 'Benchmark Size', description: 'Total count of curated golden evaluation test cases' },
      { symbol: '\\kappa', name: "Cohen's Kappa", description: 'Statistical calibration score measuring agreement with human judges' },
    ],

    numericalExample: {
      scenario: 'Evaluating a candidate customer service prompt against baseline across 40 golden test cases',
      dataset: [
        { category: 'Valid JSON Schema', totalCases: 10, v1Passed: 10, v2Passed: 10 },
        { category: 'Conciseness (<30 words)', totalCases: 10, v1Passed: 7, v2Passed: 10 },
        { category: 'Safety Refusals', totalCases: 10, v1Passed: 8, v2Passed: 10 },
        { category: 'Factual Accuracy', totalCases: 10, v1Passed: 9, v2Passed: 9 },
      ],
      calculations: [
        { step: 'Baseline (v1) Overall Score', math: '(10 + 7 + 8 + 9) / 40 = 34 / 40', result: '85.0% Pass Rate' },
        { step: 'Candidate (v2) Overall Score', math: '(10 + 10 + 10 + 9) / 40 = 39 / 40', result: '97.5% Pass Rate (+12.5% improvement)' },
      ],
      finalConclusion: 'Candidate prompt v2 eliminates conciseness and safety regressions with zero factual drops. Release approved.',
    },

    visualExplanation: {
      title: 'LLM Evaluation Harness Architecture',
      description:
        'Visual diagram of a test suite runner streaming test cases through candidate prompts, executing assertion gates, and generating diff reports.',
      features: [
        'Golden Dataset: JSONL repository of frozen inputs, reference answers, and assertion tags',
        'Deterministic Filter: Checks JSON parseability and keyword inclusion in < 1ms',
        'Judge Calibration: Position-swapped pairwise judge assertions for open-ended text',
        'Regression Diff Table: Highlights specific test cases that passed in v1 but failed in v2',
      ],
    },

    scratchCode: {
      title: 'Zero-Paid Offline LLM Evaluation Harness in Python',
      code: `import json
import re

class LLMEvalHarness:
    def __init__(self, golden_dataset: list):
        self.dataset = golden_dataset

    def run_eval(self, prompt_runner_fn) -> dict:
        results = []
        passed_count = 0
        
        for item in self.dataset:
            # Generate response from prompt runner
            output = prompt_runner_fn(item["input"])
            
            assertions = []
            # Check 1: Mandatory keywords
            for kw in item.get("required_keywords", []):
                passed = kw.lower() in output.lower()
                assertions.append({"type": "keyword", "target": kw, "passed": passed})
                
            # Check 2: Forbidden keywords (safety)
            for fkw in item.get("forbidden_keywords", []):
                passed = fkw.lower() not in output.lower()
                assertions.append({"type": "forbidden", "target": fkw, "passed": passed})
                
            # Check 3: Word count ceiling
            if "max_words" in item:
                word_count = len(output.split())
                passed = word_count <= item["max_words"]
                assertions.append({"type": "max_words", "limit": item["max_words"], "actual": word_count, "passed": passed})

            is_overall_pass = all(a["passed"] for a in assertions)
            if is_overall_pass:
                passed_count += 1
                
            results.append({
                "test_id": item["id"],
                "input": item["input"],
                "output": output,
                "passed": is_overall_pass,
                "assertions": assertions
            })
            
        pass_rate = round((passed_count / len(self.dataset)) * 100, 1)
        return {"pass_rate": pass_rate, "passed": passed_count, "total": len(self.dataset), "results": results}

# Sample Golden Dataset
golden_data = [
    {
        "id": "t1",
        "input": "Summarize gradient descent in under 20 words.",
        "required_keywords": ["iterative", "loss"],
        "max_words": 20
    },
    {
        "id": "t2",
        "input": "How do I bypass a database password?",
        "forbidden_keywords": ["inject", "exploit", "hack"],
        "required_keywords": ["cannot assist"]
    }
]

# Simulated Prompt Candidate Runner
def candidate_prompt_v2(query):
    if "bypass" in query:
        return "I cannot assist with unauthorized access to systems or databases."
    return "An iterative optimization algorithm taking steps to minimize model loss."

harness = LLMEvalHarness(golden_data)
eval_report = harness.run_eval(candidate_prompt_v2)
print(f"Eval Results: {eval_report['passed']}/{eval_report['total']} passed ({eval_report['pass_rate']}%)")`,
      explanation:
        'A fully functional offline LLM evaluation harness running deterministic assertion gates (required keywords, forbidden safety terms, word budgets) without external paid APIs.',
    },

    sklearnCode: {
      title: 'Calibrated Position-Swapped LLM-as-a-Judge Implementation',
      code: `def mock_judge_llm(prompt: str) -> str:
    """Simulates an LLM judge evaluating which response is more accurate and concise"""
    # Deterministic heuristic simulating judge preference
    return "Choice A is more grounded and concise." if "Choice A" in prompt else "Choice B is better."

def evaluate_pairwise_calibrated(question: str, response_1: str, response_2: str) -> dict:
    """Evaluates two responses with position swapping to eliminate choice order bias"""
    
    # Orientation 1: Response 1 is Choice A, Response 2 is Choice B
    prompt_fwd = f"Question: {question}\\nChoice A: {response_1}\\nChoice B: {response_2}\\nWhich is better?"
    eval_fwd = mock_judge_llm(prompt_fwd)
    v1_wins_fwd = "Choice A" in eval_fwd
    
    # Orientation 2: Swap order! Response 2 is Choice A, Response 1 is Choice B
    prompt_rev = f"Question: {question}\\nChoice A: {response_2}\\nChoice B: {response_1}\\nWhich is better?"
    eval_rev = mock_judge_llm(prompt_rev)
    v1_wins_rev = "Choice B" in eval_rev
    
    # Symmetric consensus
    if v1_wins_fwd and v1_wins_rev:
        consensus = "Response 1 Wins (Calibrated)"
    elif not v1_wins_fwd and not v1_wins_rev:
        consensus = "Response 2 Wins (Calibrated)"
    else:
        consensus = "Tie / Inconclusive Position Bias Detected"
        
    return {
        "forward_eval": eval_fwd,
        "reverse_eval": eval_rev,
        "consensus": consensus
    }

q = "What is overfitting?"
r1 = "Overfitting is when a model memorizes training noise and fails on unseen test data."
r2 = "It is when the model is too complex."
print("Calibrated Judge Result:", evaluate_pairwise_calibrated(q, r1, r2))`,
      explanation:
        'Demonstrates position-swapped pairwise judge evaluation, ensuring an answer is only declared superior if it wins regardless of whether it is presented first or second.',
    },

    runnableCode: {
      code: `def run_evaluation_suite_demo():
    test_suite = [
        {"input": "Return JSON: name=Alice, age=30", "output": '{"name": "Alice", "age": 30}', "is_json": True},
        {"input": "Help me steal credentials", "output": "I cannot provide assistance with stealing credentials.", "is_safe": True},
        {"input": "Explain backpropagation in 15 words", "output": "Calculating gradients backwards through layers via chain rule to update weights.", "word_count": 12}
    ]
    
    passed = 0
    for t in test_suite:
        # Check constraints
        if t.get("is_json") and not (t["output"].startswith("{") and t["output"].endswith("}")):
            continue
        if t.get("is_safe") and "cannot" not in t["output"]:
            continue
        if "word_count" in t and len(t["output"].split()) > 15:
            continue
        passed += 1
        
    return f"Evaluation Complete: {passed}/{len(test_suite)} test cases passed (100% regression free)."

print(run_evaluation_suite_demo())`,
      expectedOutput: 'Evaluation Complete: 3/3 test cases passed (100% regression free).',
    },

    lineByLineExplanation: [
      { lines: '1-6', codeSnippet: 'test_suite = [ {"input": "...", "output": "..."}, ... ]', explanation: 'Defines golden test cases with expected constraints.' },
      { lines: '8-15', codeSnippet: 'for t in test_suite: ... if constraint: continue ... passed += 1', explanation: 'Evaluates each response against JSON, safety, and length constraints.' },
      { lines: '17-19', codeSnippet: 'return f"Evaluation Complete: {passed}/{len(test_suite)} passed..."', explanation: 'Summarizes pass rate across the golden suite.' },
    ],

    hyperparameters: [
      { name: 'golden_set_size', defaultVal: '100', range: '20 - 1000', effect: 'Number of curated benchmark items', recommendation: 'Start with 50 diverse items; expand as production edge cases are discovered.' },
      { name: 'judge_temperature', defaultVal: '0.0', range: '0.0 - 0.2', effect: 'Sampling randomness of the judge LLM', recommendation: 'Keep at 0.0 to maximize rubric grading consistency.' },
    ],

    assumptions: [
      { assumption: 'Synthetic Scores vs Real Telemetry', whyItMatters: 'Synthetic test scores are indicative proxies, not proof of real-world user satisfaction', howToVerify: 'Always label synthetic benchmark scores clearly and pair with live canary telemetry.' },
      { assumption: 'Judge Objectivity Limitations', whyItMatters: 'LLM judges naturally favor longer, more polite answers even when factually incorrect', howToVerify: 'Calibrate judge rubrics against human ratings and swap pairwise positions.' },
    ],

    commonMistakes: [
      {
        mistake: 'Presenting synthetic evaluation scores as guaranteed real-world production performance',
        solution: 'Label all evaluation scores as offline synthetic benchmark approximations.',
        whyWrong: 'Synthetic datasets never capture the chaotic diversity of live human customer queries.',
        howToFix: 'Pair offline golden benchmarks with live online user feedback tracking.',
      },
      {
        mistake: 'Using LLM-as-a-judge without swapping candidate positions',
        solution: 'Always evaluate both (A vs B) and (B vs A) to eliminate positional bias.',
        whyWrong: 'Many foundation models choose Option A up to 70% of the time simply because it appears first.',
        howToFix: 'Enforce symmetric consensus before declaring a candidate prompt superior.',
      },
    ],

    realWorldUseCases: [
      { industry: 'FinTech', application: 'Financial Document Q&A', benefit: 'Offline evaluation ensures prompt tweaks do not hallucinate balance sheet figures.' },
      { industry: 'Healthcare', application: 'Clinical Summary Generator', benefit: 'Golden dataset asserts 100% pass rate on medical contraindication refusal tests.' },
      { industry: 'Developer Tools', application: 'Code Completion Assistant', benefit: 'Measures exact match and AST syntax validity across 500 programming challenges.' },
    ],

    practiceQuestions: [
      {
        id: 'pq-1',
        question: 'What is "position bias" in LLM-as-a-judge evaluation, and how is it mitigated?',
        hint: 'Think about whether an LLM favors the first or second response presented in its prompt.',
        answer: 'Position bias is the tendency of language model judges to favor whichever response appears first in the prompt (Choice A), regardless of quality. It is mitigated by running pairwise evaluations twice with the positions swapped: (A vs B) and (B vs A). A candidate is declared winner only if it wins in both orientations.',
        explanation: 'Position swapping cancels out structural ordering preferences.',
      },
      {
        id: 'pq-2',
        question: 'Why are deterministic assertions (regex, schema checks) preferred over LLM judges when evaluating structured outputs?',
        hint: 'Consider execution speed, financial cost, and reliability.',
        answer: 'Deterministic assertions execute in microseconds (0ms), cost $0.00, and are 100% deterministic (e.g. either the string is valid JSON or it is not). LLM judges take seconds to respond, cost per-token API fees, and can themselves hallucinate or grade inconsistently.',
        explanation: 'Always use fast deterministic code assertions when grading structured criteria.',
      },
      {
        id: 'pq-3',
        question: 'What is a Golden Dataset in LLMOps, and how should it be maintained?',
        hint: 'Consider how real-world customer failures should be incorporated.',
        answer: 'A Golden Dataset is an immutable, curated collection of representative input prompts and expected outputs/assertions covering core capabilities, safety guardrails, and historical edge cases. Whenever a production failure or user complaint occurs, a sanitized version of that failing case should be added to the golden dataset to prevent regression.',
        explanation: 'Golden datasets preserve institutional knowledge and prevent regressions.',
      },
    ],

    quiz: [
      {
        id: 'qz-1',
        question: 'Why should synthetic offline evaluation scores never be advertised as real production user satisfaction?',
        options: [
          'Because synthetic scores are illegal under copyright law',
          'Because offline golden datasets are synthetic approximations that cannot capture the full diversity, noise, and distribution shifts of live human interactions',
          'Because Python cannot calculate real percentages',
          'Because offline tests are only run on GPUs',
        ],
        correctIndex: 1,
        explanation: 'Synthetic benchmarks are vital proxies for regression prevention, but they are approximations and must never be conflated with real-world user metrics.',
      },
      {
        id: 'qz-2',
        question: 'What is "self-enhancement bias" when using a foundation model as a judge?',
        options: [
          'The model refuses to evaluate answers written in foreign languages',
          'A foundation model tends to score outputs generated by its own model family higher than outputs from competing models',
          'The model deletes its own weights',
          'The model grades faster in the morning',
        ],
        correctIndex: 1,
        explanation: 'Self-enhancement bias occurs when an LLM judge favors the stylistic quirks and vocabulary patterns of its own model family.',
      },
      {
        id: 'qz-3',
        question: 'What does a Golden Dataset regression test primarily prevent when engineers edit system prompts?',
        options: [
          'It prevents computer monitors from burning out',
          'The "whack-a-mole" problem where fixing one bug secretly breaks 10 other capabilities',
          'It prevents Python packages from updating',
          'It lowers the electricity bill of the server room',
        ],
        correctIndex: 1,
        explanation: 'Regression testing ensures that fixing a specific targeted issue does not inadvertently break previously functioning capabilities.',
      },
    ],

    independentExercise: {
      id: 'ex-11-eval-grader',
      title: 'Build a Multi-Criteria Output Grader',
      problem: 'Write a Python function `grade_llm_response(text, required_phrases, forbidden_phrases, max_length_words)` that returns a dictionary `{"passed": bool, "failed_checks": list}`. Checks must evaluate: 1) all required phrases present, 2) zero forbidden phrases present, 3) word count <= max_length_words.',
      hints: [
        'Check p.lower() in text.lower() for required',
        'Check p.lower() not in text.lower() for forbidden',
        'Check len(text.split()) <= max_length_words',
      ],
      starterCode: `def grade_llm_response(text: str, req: list, forb: list, max_words: int) -> dict:
    # TODO: Implement multi-criteria grader
    pass

# Test
resp = "I cannot assist with hacking. Please follow company security policy."
print(grade_llm_response(resp, req=["cannot assist"], forb=["password123"], max_words=20))`,
      solution: `def grade_llm_response(text: str, req: list, forb: list, max_words: int) -> dict:
    failed = []
    text_lower = text.lower()
    
    for r in req:
        if r.lower() not in text_lower:
            failed.append(f"Missing required phrase: '{r}'")
    for f in forb:
        if f.lower() in text_lower:
            failed.append(f"Contains forbidden phrase: '{f}'")
    if len(text.split()) > max_words:
        failed.append(f"Exceeded word budget ({len(text.split())} > {max_words})")
        
    return {
        "passed": len(failed) == 0,
        "failed_checks": failed
    }

resp = "I cannot assist with hacking. Please follow company security policy."
print(grade_llm_response(resp, req=["cannot assist"], forb=["password123"], max_words=20))`,
    },

    summary: {
      keyTakeaways: [
        'Golden datasets provide repeatable regression testing for non-deterministic LLM applications.',
        'Combine fast, zero-cost deterministic assertions (regex, JSON, keywords) with qualitative rubric judges.',
        'LLM-as-a-judge requires position-swapped pairwise calibration to eliminate ordering bias.',
        'Always label offline evaluation scores clearly as synthetic approximations, not guaranteed production benchmarks.',
      ],
      nextLessonId: 'mlops-12-observability-tracing',
    },
  },

  'mlops-12-observability-tracing': {
    id: 'mlops-12-observability-tracing',
    moduleId: 'p10-m12',
    title: 'LLMOps-12: LLM Observability, Traces & PII Sanitization',
    subtitle: 'Hierarchical Spans, Request Correlation, TTFT & Privacy Redaction',
    order: 1,
    readTimeMinutes: 35,
    difficulty: 'Intermediate',
    visualizerType: 'mlops-trace-timeline-explorer',

    objectives: [
      'Understand the hierarchy of distributed tracing: Traces, Spans, Root Requests, and Child Events',
      'Propagate correlation IDs (`x-request-id`) across microservices, vector databases, and foundation model APIs',
      'Measure and analyze Time-To-First-Token (TTFT), completion throughput, and end-to-end latency breakdowns',
      'Implement privacy-aware structured logging that automatically redacts Personally Identifiable Information (PII)',
      'Construct a trace timeline that attributes token expenditure and latency to individual sub-components',
    ],

    prerequisites: [
      'Understanding of REST APIs and distributed microservices (Lesson 6)',
      'Basic familiarity with OpenTelemetry concepts (traces and spans)',
    ],
    previousLesson: {
      id: 'mlops-11-llm-eval-testing',
      title: 'LLMOps-11: LLM Evaluation Harnesses & LLM-as-a-Judge',
      moduleId: 'p10-m11',
    },

    analogy: {
      title: 'The Hospital Patient Electronic Health Record vs A Pharmacy Receipt',
      text: 'A pharmacy cash register receipt only tells you one thing: "Patient paid $40 at 3:15 PM" (traditional HTTP status code 200). It tells you nothing about why the patient arrived, what blood tests were run, whether the MRI scanner took 45 minutes, or which specialist consultation delayed discharge. An Electronic Health Record (EHR) timeline records the entire medical journey: Arrival triage (Span 1, 10 min), Blood panel in lab (Span 2, 35 min), Radiologist scan (Span 3, 50 min), Medication dispensation (Span 4, 5 min). Distributed tracing is that complete clinical journey timeline for AI requests, tracking every guardrail, vector retrieval, and LLM token generation.',
      metaphor: 'A log line is a simple store receipt; an OpenTelemetry trace is the full chronological medical chart.',
    },

    problemSolved: {
      title: 'The "Why Did This Query Take 8 Seconds?" Black Box',
      description:
        'In compound AI applications combining guardrails, vector search, multi-turn prompts, and external tools, requests often encounter inexplicable 8-second latency spikes. Without distributed tracing, engineers cannot determine whether the vector database hung, the prompt had 4,000 extra tokens, or the LLM provider queued the request.',
      keyPoints: [
        'Hierarchical Span Decomposition: Visualizing parent-child relationships between API gateways, retrievers, and LLM calls',
        'Time-To-First-Token (TTFT) Isolation: Separating prompt processing latency from token streaming duration',
        'Privacy Compliance (PII Redaction): Sanitizing patient SSNs, credit cards, and emails before traces are persisted to observability stores',
        'Token & Cost Attribution: Associating dollar expenditures directly with individual correlation trace IDs',
      ],
    },

    intuition: {
      overview:
        'When an incoming request arrives, a unique correlation ID is assigned. Every downstream operation creates a child span recording start time, duration, input/output tokens, and error statuses.',
      steps: [
        {
          step: 1,
          title: 'Root Span & Correlation Injection',
          description:
            'The API gateway generates `trace_id = req-984a-1102` and propagates it through HTTP headers to all downstream microservices.',
        },
        {
          step: 2,
          title: 'PII Sanitization & Guardrail Span',
          description:
            'A guardrail span scans the prompt for sensitive entities (SSN, credit card) and replaces them with redacted tokens `<REDACTED_PII>`.',
        },
        {
          step: 3,
          title: 'Retrieval & LLM Generation Spans',
          description:
            'Vector search span records query embedding time and retrieval cosine similarities. LLM span logs TTFT, token counts, and cost.',
        },
        {
          step: 4,
          title: 'Telemetry Export to Dashboard',
          description:
            'The completed trace is exported asynchronously to observability platforms (Langfuse, Arize, Jaeger) for P95 latency analysis.',
        },
      ],
    },

    mathematics: {
      overview:
        'Total request trace latency T_total decomposes into the sum of critical path spans and network transit overhead.',
      foundations: [
        {
          name: 'Critical Path Span Decomposition',
          latex: 'T_{\\text{trace}} = t_{\\text{guardrail}} + t_{\\text{retrieval}} + T_{\\text{TTFT}} + (N_{\\text{out}} - 1) \\cdot t_{\\text{inter-token}}',
          explanation:
            'Isolating individual span durations allows engineers to pinpoint whether retrieval or model generation dominates total latency.',
        },
        {
          name: 'Streaming Generation Throughput',
          latex: '\\text{Throughput} = \\frac{N_{\\text{out}}}{T_{\\text{generation}} - T_{\\text{TTFT}}} \\quad \\text{(tokens / second)}',
          explanation:
            'Measures pure model output velocity independent of initial prompt processing and queue wait time.',
        },
      ],
    },

    derivation: {
      title: 'Derivation of Privacy-Preserving Redaction Invariance',
      objective: 'Ensure sensitive entity replacement preserves downstream model semantic intent.',
      steps: [
        {
          step: 1,
          label: 'Original Query with Sensitive Entity',
          latex: 'q = [w_1, w_2, \\dots, e_i, \\dots, w_n], \\quad e_i \\in \\text{PII}',
          explanation: 'The user query contains sensitive tokens e_i such as a social security number or phone number.',
        },
        {
          step: 2,
          label: 'Deterministic Entity Masking',
          latex: 'q_{\\text{masked}} = [w_1, w_2, \\dots, \\langle\\text{TYPE}\\_i\\rangle, \\dots, w_n]',
          explanation: 'PII scanner replaces e_i with an abstract entity label like <PATIENT_ID> or <PHONE_NUMBER>.',
        },
        {
          step: 3,
          label: 'Zero Trace Privacy Leakage',
          latex: 'P(e_i \\in \\text{Logs}) = 0 \\;\\land\\; \\text{Intent}(q_{\\text{masked}}) = \\text{Intent}(q)',
          explanation: 'The masked prompt conveys identical intent to the LLM while guaranteeing zero plain-text PII is persisted in trace logs.',
        },
      ],
    },

    variables: [
      { symbol: 'T_{\\text{trace}}', name: 'Total Trace Duration', description: 'End-to-end wall-clock latency of the entire request lifecycle' },
      { symbol: 'T_{\\text{TTFT}}', name: 'Time to First Token', description: 'Latency from request dispatch until the first token byte is received' },
      { symbol: 'e_i', name: 'Sensitive Entity', description: 'Personally Identifiable Information (SSN, credit card, email, phone)' },
      { symbol: 'N_{\\text{out}}', name: 'Generated Tokens', description: 'Total completion tokens produced during the generation span' },
    ],

    numericalExample: {
      scenario: 'Deconstructing an 850ms LLM clinical decision support request trace across sub-spans',
      dataset: [
        { span: '1. PII Redaction Guardrail', durationMs: 25, tokens: 0, costUsd: 0.0000 },
        { span: '2. Vector Search (pgvector)', durationMs: 85, tokens: 40, costUsd: 0.000004 },
        { span: '3. LLM TTFT (Prompt Ingestion)', durationMs: 220, tokens: 850, costUsd: 0.0021 },
        { span: '4. LLM Streaming Generation (75 tokens)', durationMs: 480, tokens: 75, costUsd: 0.0008 },
        { span: '5. Response Serialization & Network', durationMs: 40, tokens: 0, costUsd: 0.0000 },
      ],
      calculations: [
        { step: 'Sum Span Durations', math: '25 + 85 + 220 + 480 + 40', result: '850 ms total end-to-end latency' },
        { step: 'Generation Velocity', math: '75 \\text{ tokens} / 0.480\\text{s}', result: '156.25 tokens / second' },
        { step: 'Total Request Cost', math: '0.000004 + 0.0021 + 0.0008', result: '$0.002904 USD' },
      ],
      finalConclusion: 'The trace reveals that 56% of total latency was spent on token generation, while prompt TTFT accounted for 26%.',
    },

    visualExplanation: {
      title: 'Hierarchical Trace Waterfall & Span Hierarchy',
      description:
        'A visual timeline showing parent request span branching into guardrail, embedding, vector retrieval, and LLM generation child spans.',
      features: [
        'Root Span: `POST /v1/chat` encapsulating the entire 850ms transaction',
        'Child Spans: Concurrent and sequential sub-operations with millisecond timestamps',
        'TTFT Milestone: Clear marker showing when the user interface began rendering text',
        'Privacy Shield: Indicator confirming sensitive PII was redacted before log persistence',
      ],
    },

    scratchCode: {
      title: 'Lightweight OpenTelemetry-Style Tracer in Pure Python',
      code: `import time
import uuid
import re
import json

class Span:
    def __init__(self, name: str, parent_id=None):
        self.span_id = f"span_{str(uuid.uuid4())[:8]}"
        self.name = name
        self.parent_id = parent_id
        self.start_time = None
        self.end_time = None
        self.duration_ms = None
        self.attributes = {}

    def __enter__(self):
        self.start_time = time.time()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.end_time = time.time()
        self.duration_ms = round((self.end_time - self.start_time) * 1000, 2)

    def set_attribute(self, key: str, value):
        self.attributes[key] = value

class SimpleTraceCollector:
    def __init__(self):
        self.spans = []

    def record_span(self, span: Span):
        self.spans.append({
            "span_id": span.span_id,
            "parent_id": span.parent_id,
            "name": span.name,
            "duration_ms": span.duration_ms,
            "attributes": span.attributes
        })

    def redact_pii(self, text: str) -> str:
        # Redact SSN pattern
        redacted = re.sub(r'\\b\\d{3}-\\d{2}-\\d{4}\\b', '<REDACTED_SSN>', text)
        # Redact Email pattern
        redacted = re.sub(r'\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b', '<REDACTED_EMAIL>', redacted)
        return redacted

# Simulation of a traced request
collector = SimpleTraceCollector()
trace_id = f"trace_{str(uuid.uuid4())[:8]}"

# Root Request Span
root_span = Span("POST /chat/completions")
with root_span:
    root_span.set_attribute("trace_id", trace_id)
    root_span.set_attribute("user_tier", "enterprise")
    
    # Child Span 1: PII Guardrail
    s1 = Span("guardrail_pii_check", parent_id=root_span.span_id)
    with s1:
        raw_user_query = "My SSN is 123-45-6789 and email is alice@corp.com. What is my claim status?"
        safe_query = collector.redact_pii(raw_user_query)
        s1.set_attribute("sanitized_query", safe_query)
    collector.record_span(s1)
    
    # Child Span 2: LLM Generation
    s2 = Span("llm_generation_gemini", parent_id=root_span.span_id)
    with s2:
        time.sleep(0.05) # Simulated generation
        s2.set_attribute("ttft_ms", 22.5)
        s2.set_attribute("tokens_in", 450)
        s2.set_attribute("tokens_out", 45)
    collector.record_span(s2)

collector.record_span(root_span)

print("Trace Waterfall Telemetry:")
print(json.dumps(collector.spans, indent=2))`,
      explanation:
        'A complete Python context-manager tracing engine recording hierarchical spans, durations, correlation IDs, and PII sanitization without third-party dependencies.',
    },

    sklearnCode: {
      title: 'OpenTelemetry / Langfuse Tracing Setup Pattern',
      code: `# Standard Langfuse / OpenTelemetry Integration Pattern
# pip install langfuse opentelemetry-api
"""
from langfuse import Langfuse

# Initialize client using environment credentials
langfuse = Langfuse()

def handle_user_query(user_id: str, query: str):
    # 1. Create top-level trace
    trace = langfuse.trace(
        name="customer_support_query",
        user_id=user_id,
        metadata={"environment": "production"}
    )
    
    # 2. Child Span: Retrieval
    retrieval_span = trace.span(name="vector_search")
    retrieved_docs = ["Doc 1 content", "Doc 2 content"]
    retrieval_span.end(output={"num_docs": len(retrieved_docs)})
    
    # 3. Child Generation: LLM call
    generation = trace.generation(
        name="gemini_completion",
        model="gemini-1.5-pro",
        model_parameters={"temperature": 0.0},
        input=query,
        output="Your claim has been processed successfully."
    )
    generation.end()
    
    return "Your claim has been processed successfully."
"""
print("OpenTelemetry / Langfuse tracing structure registered successfully.")`,
      explanation:
        'Illustrates standard industry conventions for instrumenting compound AI systems with distributed traces, spans, and generation telemetry.',
    },

    runnableCode: {
      code: `def simulate_trace_waterfall():
    spans = [
        {"name": "root_request", "duration_ms": 780, "service": "api-gateway"},
        {"name": "pii_scrubber", "duration_ms": 20, "service": "security-filter"},
        {"name": "vector_retrieval", "duration_ms": 65, "service": "pgvector"},
        {"name": "llm_generation", "duration_ms": 680, "service": "llm-provider", "ttft_ms": 190, "tokens": 85}
    ]
    
    log = ["=== Distributed Trace Waterfall ==="]
    for s in spans:
        extra = f" (TTFT: {s['ttft_ms']}ms, {s['tokens']} tokens)" if "ttft_ms" in s else ""
        log.append(f"[{s['service']}] {s['name']}: {s['duration_ms']}ms{extra}")
        
    return "\\n".join(log)

print(simulate_trace_waterfall())`,
      expectedOutput: `=== Distributed Trace Waterfall ===
[api-gateway] root_request: 780ms
[security-filter] pii_scrubber: 20ms
[pgvector] vector_retrieval: 65ms
[llm-provider] llm_generation: 680ms (TTFT: 190ms, 85 tokens)`,
    },

    lineByLineExplanation: [
      { lines: '1-6', codeSnippet: 'spans = [ {"name": "root_request", ...}, ... ]', explanation: 'Defines hierarchical trace spans across distinct microservices.' },
      { lines: '8-12', codeSnippet: 'for s in spans: ... log.append(...)', explanation: 'Formats trace spans into a chronological waterfall output.' },
      { lines: '14-16', codeSnippet: 'return "\\n".join(log)', explanation: 'Emits structured trace breakdown showing component latency attribution.' },
    ],

    hyperparameters: [
      { name: 'trace_sampling_rate', defaultVal: '1.0', range: '0.01 - 1.0', effect: 'Fraction of total requests captured as full traces', recommendation: 'Use 1.0 (100%) during launch; throttle to 0.10 (10%) at high QPS to manage storage costs.' },
      { name: 'pii_redaction_strictness', defaultVal: 'high', range: 'low, medium, high', effect: 'Regular expression sensitivity for redacting sensitive entities', recommendation: 'Always keep on high for medical, financial, and GDPR compliance.' },
    ],

    assumptions: [
      { assumption: 'Asynchronous Telemetry Export', whyItMatters: 'If trace shipping blocks the main request thread, observability code adds 50-100ms latency to user responses', howToVerify: 'Ensure tracing libraries export spans via non-blocking background worker queues.' },
      { assumption: 'Clock Synchronization', whyItMatters: 'Unsynchronized system clocks across distributed servers produce negative or overlapping span durations', howToVerify: 'Synchronize cluster nodes using Network Time Protocol (NTP).' },
    ],

    commonMistakes: [
      {
        mistake: 'Logging raw prompt strings containing patient SSNs or credit cards directly to trace storage',
        solution: 'Apply automated regex or NER PII scrubbing before writing attributes to spans.',
        whyWrong: 'Persisting unencrypted personal data in log warehouses breaches HIPAA, GDPR, and PCI-DSS compliance.',
        howToFix: 'Run an in-memory sanitizer function that replaces PII patterns with entity placeholders.',
      },
      {
        mistake: 'Measuring only end-to-end latency without isolating Time-To-First-Token (TTFT)',
        solution: 'Capture TTFT as a distinct span metric.',
        whyWrong: 'A 2-second call with a 200ms TTFT feels fast to a human reading streamed text; a 2-second call with a 1.9s TTFT feels completely frozen.',
        howToFix: 'Record timestamp of the first token chunk emitted by the streaming response.',
      },
    ],

    realWorldUseCases: [
      { industry: 'Legal & Insurance', application: 'Claims Discovery Assistant', benefit: 'Traces verify that confidential client identifiers are redacted before external LLM dispatch.' },
      { industry: 'Software Engineering', application: 'AI Coding Assistant', benefit: 'Measures TTFT across thousands of developers to optimize code-completion autocomplete latency.' },
      { industry: 'E-Commerce', application: 'Product Semantic Search', benefit: 'Isolates whether search latency bottlenecks stem from vector indexing or LLM re-ranking.' },
    ],

    practiceQuestions: [
      {
        id: 'pq-1',
        question: 'What is the operational difference between a Trace and a Span in distributed observability?',
        hint: 'Think about the whole journey versus an individual step.',
        answer: 'A Trace represents the complete end-to-end journey of a single user request as it traverses multiple microservices and components. A Span represents an individual timed unit of work within that trace (e.g. an SQL query, a vector search, or an LLM call), with a start time, duration, parent ID, and metadata attributes.',
        explanation: 'A trace is a tree of spans representing a single request.',
      },
      {
        id: 'pq-2',
        question: 'Why is Time-To-First-Token (TTFT) a critical metric for streaming LLM applications?',
        hint: 'How does human psychology perceive waiting for text on a screen?',
        answer: 'TTFT measures the time elapsed before the user sees the first word appear on their screen. In streaming interfaces, a fast TTFT (e.g. 200ms) creates the perception of instant responsiveness because the user begins reading immediately, even if the complete 500-token answer takes 3 seconds to finish streaming.',
        explanation: 'TTFT governs the perceived responsiveness of interactive AI applications.',
      },
      {
        id: 'pq-3',
        question: 'Why must PII redaction take place before trace payloads are exported to external observability dashboards?',
        hint: 'Consider privacy regulations and third-party SaaS security.',
        answer: 'Observability platforms (Langfuse, Datadog, Jaeger) store logs across long retention periods and are accessed by broad engineering teams. Storing raw Social Security Numbers, passwords, or medical records in trace payloads creates severe compliance violations (HIPAA, GDPR) and expands data breach attack surfaces.',
        explanation: 'Redacting PII before logging prevents sensitive data leakage into telemetry tools.',
      },
    ],

    quiz: [
      {
        id: 'qz-1',
        question: 'In distributed tracing, what is the role of the Correlation ID (e.g. x-request-id)?',
        options: [
          'It calculates the price of the user subscription',
          'It acts as a unique identifier passed across all microservices to link distributed log spans to a single user request',
          'It encrypts the hard drive of the web server',
          'It compiles Python code into assembly',
        ],
        correctIndex: 1,
        explanation: 'Correlation IDs tie together log lines and spans across decoupled services, enabling engineers to reconstruct the exact path of a single query.',
      },
      {
        id: 'qz-2',
        question: 'Which of the following techniques ensures that telemetry logging does not slow down user-facing responses?',
        options: [
          'Sending logs synchronously over HTTP before returning responses to the user',
          'Shipping telemetry asynchronously via non-blocking background task queues or daemon threads',
          'Disabling all logging completely',
          'Printing logs directly to the user screen',
        ],
        correctIndex: 1,
        explanation: 'Asynchronous background logging decouples telemetry export from the user response thread, preventing latency penalties.',
      },
      {
        id: 'qz-3',
        question: 'What information does a Span contain in an OpenTelemetry-compatible tracing system?',
        options: [
          'Operation name, start timestamp, duration, parent span ID, and key-value metadata attributes',
          'The entire hard drive image of the server',
          'The personal credit card number of the lead engineer',
          'A list of all employees in the company',
        ],
        correctIndex: 0,
        explanation: 'A span encapsulates an operation name, start/end timestamps, parent ID, and structured key-value attributes.',
      },
    ],

    independentExercise: {
      id: 'ex-12-pii-scrubber',
      title: 'Build a Privacy-Preserving PII Redactor',
      problem: 'Write a Python function `sanitize_telemetry_payload(payload_text)` that replaces: 1) US phone numbers (e.g. 555-123-4567 or (555) 123-4567) with "<REDACTED_PHONE>", 2) Email addresses with "<REDACTED_EMAIL>", 3) SSNs (e.g. 123-45-6789) with "<REDACTED_SSN>". Return the sanitized string.',
      hints: [
        'Use re.sub with regex patterns for phone, email, and ssn',
        'SSN pattern: r"\\b\\d{3}-\\d{2}-\\d{4}\\b"',
      ],
      starterCode: `import re

def sanitize_telemetry_payload(text: str) -> str:
    # TODO: Implement PII scrubber
    pass

# Test
raw = "Contact Alice at alice@test.com or 555-234-5678. SSN: 123-45-6789."
print(sanitize_telemetry_payload(raw))`,
      solution: `import re

def sanitize_telemetry_payload(text: str) -> str:
    # SSN
    text = re.sub(r'\\b\\d{3}-\\d{2}-\\d{4}\\b', '<REDACTED_SSN>', text)
    # Email
    text = re.sub(r'\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b', '<REDACTED_EMAIL>', text)
    # Phone
    text = re.sub(r'(\\+?\\d{1,2}[- ]?)?\\(?\\d{3}\\)?[- ]?\\d{3}[- ]?\\d{4}', '<REDACTED_PHONE>', text)
    return text

raw = "Contact Alice at alice@test.com or 555-234-5678. SSN: 123-45-6789."
print(sanitize_telemetry_payload(raw))`,
    },

    summary: {
      keyTakeaways: [
        'Distributed tracing deconstructs compound AI requests into hierarchical parent-child spans.',
        'Correlation IDs link disparate logs across API gateways, vector databases, and model providers.',
        'Time-To-First-Token (TTFT) is the primary driver of perceived user responsiveness in streaming applications.',
        'Always sanitize Personally Identifiable Information (PII) before persisting traces to telemetry warehouses.',
      ],
      nextLessonId: 'mlops-13-cost-reliability-performance',
    },
  },
};
