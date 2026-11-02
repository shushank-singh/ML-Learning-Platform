'use client';

import React from 'react';

interface IllustrationProps {
  className?: string;
}

/**
 * 1. Machine Learning Core / Foundations Illustration
 * Features: Scatter plot, optimal regression line, and margin boundaries.
 */
export const MLIllustration: React.FC<IllustrationProps> = ({ className = 'w-full h-full' }) => (
  <svg
    viewBox="0 0 320 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Machine Learning Regression and Classification Diagram"
  >
    <rect width="320" height="180" rx="16" fill="currentColor" className="text-slate-100/60 dark:text-slate-800/40" />
    {/* Grid lines */}
    <path d="M40 30 V150 M80 30 V150 M120 30 V150 M160 30 V150 M200 30 V150 M240 30 V150 M280 30 V150" stroke="currentColor" className="text-slate-200 dark:text-slate-800" strokeWidth="1" strokeDasharray="3 3" />
    <path d="M30 40 H290 M30 80 H290 M30 120 H290 M30 150 H290" stroke="currentColor" className="text-slate-200 dark:text-slate-800" strokeWidth="1" strokeDasharray="3 3" />
    
    {/* Axes */}
    <path d="M40 30 V150 H290" stroke="currentColor" className="text-slate-400 dark:text-slate-600" strokeWidth="2" strokeLinecap="round" />

    {/* Confidence Interval Band */}
    <path d="M40 140 Q 150 90 280 40 L 280 58 Q 150 108 40 152 Z" fill="#6366f1" fillOpacity="0.12" />

    {/* Optimal Decision / Regression Boundary */}
    <path d="M40 146 Q 150 99 280 49" stroke="#4f46e5" strokeWidth="3" strokeLinecap="round" />

    {/* Class A Data Points (Blue/Indigo) */}
    <circle cx="70" cy="125" r="4.5" fill="#4f46e5" />
    <circle cx="105" cy="112" r="4.5" fill="#4f46e5" />
    <circle cx="130" cy="95" r="5" fill="#6366f1" />
    <circle cx="165" cy="82" r="4.5" fill="#4f46e5" />
    <circle cx="190" cy="74" r="5.5" fill="#6366f1" />
    <circle cx="225" cy="58" r="4.5" fill="#4f46e5" />
    <circle cx="260" cy="45" r="5" fill="#6366f1" />

    {/* Class B Data Points (Cyan/Teal) */}
    <circle cx="65" cy="75" r="4.5" fill="#0ea5e9" fillOpacity="0.85" />
    <circle cx="95" cy="55" r="5" fill="#0ea5e9" fillOpacity="0.85" />
    <circle cx="135" cy="45" r="4.5" fill="#0ea5e9" fillOpacity="0.85" />
    <circle cx="170" cy="40" r="4.5" fill="#0ea5e9" fillOpacity="0.85" />

    {/* Residual Error Line */}
    <line x1="165" y1="82" x2="165" y2="92" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="2 2" />
    <circle cx="165" cy="92" r="2.5" fill="#f43f5e" />
  </svg>
);

/**
 * 2. Deep Learning Neural Network Architecture Illustration
 * Features: Multi-layer perceptron with input, hidden, and output neurons with forward weights.
 */
export const DLIllustration: React.FC<IllustrationProps> = ({ className = 'w-full h-full' }) => (
  <svg
    viewBox="0 0 320 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Deep Neural Network Architecture Diagram"
  >
    <rect width="320" height="180" rx="16" fill="currentColor" className="text-slate-100/60 dark:text-slate-800/40" />

    {/* Connecting Synaptic Weights */}
    {/* Input (col 60) to Hidden 1 (col 130) */}
    <g stroke="currentColor" className="text-indigo-300 dark:text-indigo-900/80" strokeWidth="1.2" opacity="0.65">
      <line x1="60" y1="50" x2="135" y2="40" />
      <line x1="60" y1="50" x2="135" y2="75" />
      <line x1="60" y1="50" x2="135" y2="110" />
      <line x1="60" y1="50" x2="135" y2="145" />

      <line x1="60" y1="90" x2="135" y2="40" stroke="#6366f1" strokeWidth="2" strokeOpacity="0.8" />
      <line x1="60" y1="90" x2="135" y2="75" />
      <line x1="60" y1="90" x2="135" y2="110" />
      <line x1="60" y1="90" x2="135" y2="145" />

      <line x1="60" y1="130" x2="135" y2="40" />
      <line x1="60" y1="130" x2="135" y2="75" />
      <line x1="60" y1="130" x2="135" y2="110" />
      <line x1="60" y1="130" x2="135" y2="145" />

      {/* Hidden 1 to Hidden 2 (col 210) */}
      <line x1="135" y1="40" x2="210" y2="50" />
      <line x1="135" y1="40" x2="210" y2="90" />
      <line x1="135" y1="40" x2="210" y2="130" />

      <line x1="135" y1="75" x2="210" y2="50" stroke="#8b5cf6" strokeWidth="2" strokeOpacity="0.8" />
      <line x1="135" y1="75" x2="210" y2="90" />
      <line x1="135" y1="75" x2="210" y2="130" />

      <line x1="135" y1="110" x2="210" y2="50" />
      <line x1="135" y1="110" x2="210" y2="90" />
      <line x1="135" y1="110" x2="210" y2="130" />

      <line x1="135" y1="145" x2="210" y2="50" />
      <line x1="135" y1="145" x2="210" y2="90" />
      <line x1="135" y1="145" x2="210" y2="130" />

      {/* Hidden 2 to Output (col 275) */}
      <line x1="210" y1="50" x2="275" y2="70" />
      <line x1="210" y1="50" x2="275" y2="110" />

      <line x1="210" y1="90" x2="275" y2="70" stroke="#10b981" strokeWidth="2.2" strokeOpacity="0.9" />
      <line x1="210" y1="90" x2="275" y2="110" />

      <line x1="210" y1="130" x2="275" y2="70" />
      <line x1="210" y1="130" x2="275" y2="110" />
    </g>

    {/* Layer Labels */}
    <text x="60" y="24" textAnchor="middle" fill="currentColor" className="text-slate-400 text-[10px] font-mono uppercase">Input</text>
    <text x="135" y="24" textAnchor="middle" fill="currentColor" className="text-slate-400 text-[10px] font-mono uppercase">Hidden 1</text>
    <text x="210" y="24" textAnchor="middle" fill="currentColor" className="text-slate-400 text-[10px] font-mono uppercase">Hidden 2</text>
    <text x="275" y="24" textAnchor="middle" fill="currentColor" className="text-slate-400 text-[10px] font-mono uppercase">Output</text>

    {/* Input Layer Nodes */}
    <circle cx="60" cy="50" r="9" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="2" />
    <circle cx="60" cy="90" r="9" fill="#c7d2fe" stroke="#4f46e5" strokeWidth="2.5" />
    <circle cx="60" cy="130" r="9" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="2" />

    {/* Hidden Layer 1 Nodes */}
    <circle cx="135" cy="40" r="9" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
    <circle cx="135" cy="75" r="9" fill="#ddd6fe" stroke="#7c3aed" strokeWidth="2.5" />
    <circle cx="135" cy="110" r="9" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
    <circle cx="135" cy="145" r="9" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />

    {/* Hidden Layer 2 Nodes */}
    <circle cx="210" cy="50" r="9" fill="#fae8ff" stroke="#a21caf" strokeWidth="2" />
    <circle cx="210" cy="90" r="9" fill="#f5d0fe" stroke="#a21caf" strokeWidth="2.5" />
    <circle cx="210" cy="130" r="9" fill="#fae8ff" stroke="#a21caf" strokeWidth="2" />

    {/* Output Layer Nodes */}
    <circle cx="275" cy="70" r="10" fill="#d1fae5" stroke="#059669" strokeWidth="2.5" />
    <circle cx="275" cy="110" r="10" fill="#fee2e2" stroke="#dc2626" strokeWidth="2" />
  </svg>
);

/**
 * 3. Transformers & Attention Architecture Illustration
 * Features: Query, Key, Value matrix dot product, Softmax scaled attention heatmap.
 */
export const TransformersIllustration: React.FC<IllustrationProps> = ({ className = 'w-full h-full' }) => (
  <svg
    viewBox="0 0 320 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Transformer Multi-Head Self-Attention Architecture Diagram"
  >
    <rect width="320" height="180" rx="16" fill="currentColor" className="text-slate-100/60 dark:text-slate-800/40" />

    {/* Q, K, V Matrix Blocks */}
    <g transform="translate(30, 35)">
      {/* Q Matrix */}
      <rect x="0" y="0" width="35" height="45" rx="6" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="1.8" />
      <text x="17.5" y="27" textAnchor="middle" fill="#4338ca" className="text-xs font-bold font-mono">Q</text>
      <text x="17.5" y="60" textAnchor="middle" fill="currentColor" className="text-slate-400 text-[9px] font-mono">Query</text>

      {/* Cross / Dot Product Operator */}
      <circle cx="50" cy="22.5" r="7" fill="currentColor" className="text-slate-200 dark:text-slate-700" />
      <text x="50" y="26" textAnchor="middle" fill="currentColor" className="text-slate-700 dark:text-slate-200 text-xs font-bold">×</text>

      {/* K Matrix Transpose */}
      <rect x="65" y="0" width="45" height="35" rx="6" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.8" />
      <text x="87.5" y="22" textAnchor="middle" fill="#6d28d9" className="text-xs font-bold font-mono">Kᵀ</text>
      <text x="87.5" y="60" textAnchor="middle" fill="currentColor" className="text-slate-400 text-[9px] font-mono">Key</text>

      {/* Scaled Divisor */}
      <path d="M120 22.5 H135" stroke="currentColor" className="text-slate-400" strokeWidth="2" />
      <text x="127.5" y="16" textAnchor="middle" fill="#6366f1" className="text-[10px] font-mono font-bold">√dₖ</text>
    </g>

    {/* Attention Heatmap Grid */}
    <g transform="translate(185, 30)">
      <rect x="0" y="0" width="90" height="90" rx="8" className="fill-white dark:fill-slate-900 stroke-slate-300 dark:stroke-slate-700" strokeWidth="1.5" />
      
      {/* Heatmap cells */}
      <rect x="5" y="5" width="23" height="23" rx="3" fill="#4f46e5" fillOpacity="0.9" />
      <rect x="33" y="5" width="23" height="23" rx="3" fill="#6366f1" fillOpacity="0.3" />
      <rect x="61" y="5" width="23" height="23" rx="3" fill="#6366f1" fillOpacity="0.1" />

      <rect x="5" y="33" width="23" height="23" rx="3" fill="#6366f1" fillOpacity="0.25" />
      <rect x="33" y="33" width="23" height="23" rx="3" fill="#4f46e5" fillOpacity="0.85" />
      <rect x="61" y="33" width="23" height="23" rx="3" fill="#6366f1" fillOpacity="0.4" />

      <rect x="5" y="61" width="23" height="23" rx="3" fill="#6366f1" fillOpacity="0.15" />
      <rect x="33" y="61" width="23" height="23" rx="3" fill="#6366f1" fillOpacity="0.35" />
      <rect x="61" y="61" width="23" height="23" rx="3" fill="#4f46e5" fillOpacity="0.95" />

      <text x="45" y="106" textAnchor="middle" fill="currentColor" className="text-slate-400 text-[10px] font-mono">Softmax(A)</text>
    </g>

    {/* Bottom Token Vector Flow */}
    <g transform="translate(30, 135)">
      <rect x="0" y="0" width="60" height="22" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="30" y="15" textAnchor="middle" fill="#15803d" className="text-[10px] font-mono font-semibold">Self-Attn</text>

      <path d="M65 11 H95" stroke="#16a34a" strokeWidth="2" strokeDasharray="3 3" />

      <rect x="100" y="0" width="70" height="22" rx="6" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
      <text x="135" y="15" textAnchor="middle" fill="#b45309" className="text-[10px] font-mono font-semibold">FeedForward</text>

      <path d="M175 11 H205" stroke="#d97706" strokeWidth="2" strokeDasharray="3 3" />

      <rect x="210" y="0" width="65" height="22" rx="6" fill="#e0e7ff" stroke="#4338ca" strokeWidth="1.5" />
      <text x="242.5" y="15" textAnchor="middle" fill="#3730a3" className="text-[10px] font-mono font-semibold">LayerNorm</text>
    </g>
  </svg>
);

/**
 * 4. Generative AI & LLMs Illustration
 * Features: Autoregressive token prediction, vocabulary logits probability distribution.
 */
export const GenAIIllustration: React.FC<IllustrationProps> = ({ className = 'w-full h-full' }) => (
  <svg
    viewBox="0 0 320 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Generative AI and Large Language Model Token Generation Diagram"
  >
    <rect width="320" height="180" rx="16" fill="currentColor" className="text-slate-100/60 dark:text-slate-800/40" />

    {/* Prompt Tokens */}
    <g transform="translate(25, 30)">
      <rect x="0" y="0" width="45" height="24" rx="6" fill="#e0e7ff" stroke="#6366f1" strokeWidth="1.5" />
      <text x="22.5" y="16" textAnchor="middle" fill="#4338ca" className="text-[11px] font-mono">The</text>

      <rect x="52" y="0" width="60" height="24" rx="6" fill="#e0e7ff" stroke="#6366f1" strokeWidth="1.5" />
      <text x="82" y="16" textAnchor="middle" fill="#4338ca" className="text-[11px] font-mono">model</text>

      <rect x="119" y="0" width="60" height="24" rx="6" fill="#e0e7ff" stroke="#6366f1" strokeWidth="1.5" />
      <text x="149" y="16" textAnchor="middle" fill="#4338ca" className="text-[11px] font-mono">predicts</text>

      <path d="M185 12 H215" stroke="#6366f1" strokeWidth="2" strokeDasharray="3 3" />
      <polygon points="215,8 223,12 215,16" fill="#6366f1" />

      {/* Target Predicted Token */}
      <rect x="228" y="0" width="65" height="24" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
      <text x="260.5" y="16" textAnchor="middle" fill="#15803d" className="text-[11px] font-mono font-bold">next</text>
    </g>

    {/* Logit Probability Distribution Bar Chart */}
    <g transform="translate(40, 80)">
      <line x1="0" y1="65" x2="245" y2="65" stroke="currentColor" className="text-slate-300 dark:text-slate-700" strokeWidth="1.5" />

      {/* Bar 1: "next" (Highest probability) */}
      <rect x="20" y="10" width="28" height="55" rx="4" fill="#10b981" />
      <text x="34" y="6" textAnchor="middle" fill="#059669" className="text-[10px] font-bold font-mono">68%</text>
      <text x="34" y="78" textAnchor="middle" fill="currentColor" className="text-slate-500 text-[10px] font-mono">"next"</text>

      {/* Bar 2: "tokens" */}
      <rect x="68" y="32" width="28" height="33" rx="4" fill="#6366f1" fillOpacity="0.8" />
      <text x="82" y="28" textAnchor="middle" fill="#4f46e5" className="text-[10px] font-bold font-mono">18%</text>
      <text x="82" y="78" textAnchor="middle" fill="currentColor" className="text-slate-500 text-[10px] font-mono">"tokens"</text>

      {/* Bar 3: "accurate" */}
      <rect x="116" y="48" width="28" height="17" rx="4" fill="#6366f1" fillOpacity="0.5" />
      <text x="130" y="44" textAnchor="middle" fill="#4f46e5" className="text-[10px] font-bold font-mono">9%</text>
      <text x="130" y="78" textAnchor="middle" fill="currentColor" className="text-slate-500 text-[10px] font-mono">"acc"</text>

      {/* Bar 4: other */}
      <rect x="164" y="57" width="28" height="8" rx="4" fill="#94a3b8" />
      <text x="178" y="53" textAnchor="middle" fill="#64748b" className="text-[10px] font-bold font-mono">5%</text>
      <text x="178" y="78" textAnchor="middle" fill="currentColor" className="text-slate-500 text-[10px] font-mono">other</text>

      {/* Temperature / Softmax curve overlay */}
      <path d="M5 63 C 25 15, 45 8, 80 35 C 115 50, 160 58, 220 64" stroke="#ec4899" strokeWidth="2" strokeDasharray="3 3" fill="none" />
    </g>
  </svg>
);

/**
 * 5. Retrieval-Augmented Generation (RAG) Illustration
 * Features: Knowledge Base Vector Index -> Semantic Cosine Match -> Augmentation -> Answer.
 */
export const RAGIllustration: React.FC<IllustrationProps> = ({ className = 'w-full h-full' }) => (
  <svg
    viewBox="0 0 320 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Retrieval-Augmented Generation Vector Search Diagram"
  >
    <rect width="320" height="180" rx="16" fill="currentColor" className="text-slate-100/60 dark:text-slate-800/40" />

    {/* Vector Database Cube / Store */}
    <g transform="translate(35, 40)">
      <rect x="0" y="0" width="75" height="90" rx="10" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="2" />
      <text x="37.5" y="24" textAnchor="middle" fill="#6d28d9" className="text-[10px] font-bold font-mono">Vector DB</text>

      {/* Internal vector points in 2D projection */}
      <circle cx="20" cy="45" r="4" fill="#a78bfa" />
      <circle cx="50" cy="40" r="4" fill="#a78bfa" />
      <circle cx="35" cy="65" r="5" fill="#7c3aed" />
      <circle cx="55" cy="72" r="4" fill="#a78bfa" />

      {/* Top-K Nearest Match Halo */}
      <circle cx="35" cy="65" r="9" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="2 2" fill="none" />
      <text x="37.5" y="105" textAnchor="middle" fill="currentColor" className="text-slate-400 text-[9px] font-mono">k=3 Chunks</text>
    </g>

    {/* Retrieval Arrow */}
    <g transform="translate(125, 75)">
      <path d="M0 10 H35" stroke="#8b5cf6" strokeWidth="2.5" />
      <polygon points="35,6 45,10 35,14" fill="#8b5cf6" />
      <text x="20" y="0" textAnchor="middle" fill="#7c3aed" className="text-[9px] font-mono font-bold">Dense Retr</text>
    </g>

    {/* Reranker & Prompt Synthesizer */}
    <g transform="translate(185, 30)">
      {/* Context Window */}
      <rect x="0" y="0" width="105" height="110" rx="12" className="fill-white dark:fill-slate-900 stroke-slate-300 dark:stroke-slate-700" strokeWidth="1.8" />
      <rect x="10" y="12" width="85" height="18" rx="5" fill="#f0fdf4" stroke="#22c55e" strokeWidth="1" />
      <text x="52.5" y="24" textAnchor="middle" fill="#15803d" className="text-[9px] font-semibold font-mono">Relevant Chunk 1</text>

      <rect x="10" y="36" width="85" height="18" rx="5" fill="#f0fdf4" stroke="#22c55e" strokeWidth="1" />
      <text x="52.5" y="48" textAnchor="middle" fill="#15803d" className="text-[9px] font-semibold font-mono">Relevant Chunk 2</text>

      <line x1="15" y1="64" x2="90" y2="64" stroke="currentColor" className="text-slate-200 dark:text-slate-700" strokeWidth="1" strokeDasharray="2 2" />

      {/* Grounded Generation Response */}
      <rect x="10" y="74" width="85" height="24" rx="6" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="1.5" />
      <text x="52.5" y="89" textAnchor="middle" fill="#4338ca" className="text-[9px] font-bold font-mono">Grounded Answer</text>
    </g>
  </svg>
);

/**
 * 6. AI Agents & Multi-Agent Systems Illustration
 * Features: Observe -> Plan / Reason -> Tool Call / Execution -> Environment Reflection loop.
 */
export const AgentsIllustration: React.FC<IllustrationProps> = ({ className = 'w-full h-full' }) => (
  <svg
    viewBox="0 0 320 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Autonomous AI Agent Reasoning and Execution Loop Diagram"
  >
    <rect width="320" height="180" rx="16" fill="currentColor" className="text-slate-100/60 dark:text-slate-800/40" />

    {/* Central Agent Reasoning Core */}
    <g transform="translate(160, 90)">
      <circle cx="0" cy="0" r="32" fill="#eff6ff" className="dark:fill-slate-900" stroke="#3b82f6" strokeWidth="2.5" />
      <circle cx="0" cy="0" r="24" fill="#dbeafe" className="dark:fill-blue-950/60" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="3 3" />
      <text x="0" y="-4" textAnchor="middle" fill="#1d4ed8" className="text-[10px] font-bold font-mono">LLM Core</text>
      <text x="0" y="9" textAnchor="middle" fill="#2563eb" className="text-[9px] font-mono">ReAct Loop</text>
    </g>

    {/* Node 1: Perception / Observation (Top) */}
    <g transform="translate(160, 24)">
      <rect x="-45" y="-12" width="90" height="24" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.8" />
      <text x="0" y="3" textAnchor="middle" fill="#15803d" className="text-[10px] font-semibold font-mono">Perceive Env</text>
      <path d="M0 12 V25" stroke="#16a34a" strokeWidth="2" strokeDasharray="2 2" />
    </g>

    {/* Node 2: Tool Calling & APIs (Right) */}
    <g transform="translate(260, 90)">
      <rect x="-35" y="-14" width="70" height="28" rx="8" fill="#fef3c7" stroke="#d97706" strokeWidth="1.8" />
      <text x="0" y="3" textAnchor="middle" fill="#b45309" className="text-[10px] font-semibold font-mono">Tool APIs</text>
      <path d="M-35 0 H-25" stroke="#d97706" strokeWidth="2" strokeDasharray="2 2" />
    </g>

    {/* Node 3: Environment Feedback (Bottom) */}
    <g transform="translate(160, 156)">
      <rect x="-45" y="-12" width="90" height="24" rx="8" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.8" />
      <text x="0" y="3" textAnchor="middle" fill="#6d28d9" className="text-[10px] font-semibold font-mono">Reflect &amp; Adapt</text>
      <path d="M0 -12 V-25" stroke="#7c3aed" strokeWidth="2" strokeDasharray="2 2" />
    </g>

    {/* Node 4: Episodic Memory (Left) */}
    <g transform="translate(60, 90)">
      <rect x="-35" y="-14" width="70" height="28" rx="8" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="1.8" />
      <text x="0" y="3" textAnchor="middle" fill="#4338ca" className="text-[10px] font-semibold font-mono">Memory</text>
      <path d="M35 0 H45" stroke="#4f46e5" strokeWidth="2" strokeDasharray="2 2" />
    </g>

    {/* Clockwise Orbital Cycle Arrows */}
    <path d="M195 55 Q 235 55 240 70" stroke="#3b82f6" strokeWidth="1.8" strokeLinecap="round" fill="none" />
    <path d="M245 110 Q 235 135 195 145" stroke="#3b82f6" strokeWidth="1.8" strokeLinecap="round" fill="none" />
    <path d="M125 145 Q 85 135 75 115" stroke="#3b82f6" strokeWidth="1.8" strokeLinecap="round" fill="none" />
    <path d="M75 70 Q 85 55 125 50" stroke="#3b82f6" strokeWidth="1.8" strokeLinecap="round" fill="none" />
  </svg>
);

/**
 * 7. MLOps & LLMOps Pipeline Illustration
 * Features: Continuous integration, experiment tracking, automated model release.
 */
export const MLOpsIllustration: React.FC<IllustrationProps> = ({ className = 'w-full h-full' }) => (
  <svg
    viewBox="0 0 320 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="MLOps Continuous Training and Delivery Pipeline Diagram"
  >
    <rect width="320" height="180" rx="16" fill="currentColor" className="text-slate-100/60 dark:text-slate-800/40" />

    {/* Pipeline Stages */}
    <g transform="translate(20, 65)">
      {/* Stage 1: Data Drift & Validation */}
      <rect x="0" y="0" width="55" height="48" rx="8" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.8" />
      <text x="27.5" y="22" textAnchor="middle" fill="#0369a1" className="text-[9px] font-mono font-bold">Data Drift</text>
      <text x="27.5" y="36" textAnchor="middle" fill="#0284c7" className="text-[8px] font-mono">PSI &lt; 0.1</text>

      <path d="M60 24 H75" stroke="#0284c7" strokeWidth="2" />
      <polygon points="75,20 83,24 75,28" fill="#0284c7" />

      {/* Stage 2: Distributed Training */}
      <rect x="85" y="0" width="58" height="48" rx="8" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.8" />
      <text x="114" y="22" textAnchor="middle" fill="#6d28d9" className="text-[9px] font-mono font-bold">Distributed</text>
      <text x="114" y="36" textAnchor="middle" fill="#7c3aed" className="text-[8px] font-mono">DDP / FSDP</text>

      <path d="M148 24 H163" stroke="#7c3aed" strokeWidth="2" />
      <polygon points="163,20 171,24 163,28" fill="#7c3aed" />

      {/* Stage 3: Model Evaluation Gate */}
      <rect x="173" y="0" width="55" height="48" rx="8" fill="#fef3c7" stroke="#d97706" strokeWidth="1.8" />
      <text x="200.5" y="22" textAnchor="middle" fill="#b45309" className="text-[9px] font-mono font-bold">Eval Gate</text>
      <text x="200.5" y="36" textAnchor="middle" fill="#d97706" className="text-[8px] font-mono">Pass@1 &gt; 92%</text>

      <path d="M233 24 H248" stroke="#d97706" strokeWidth="2" />
      <polygon points="248,20 256,24 248,28" fill="#d97706" />

      {/* Stage 4: Production Registry */}
      <rect x="258" y="0" width="50" height="48" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.8" />
      <text x="283" y="22" textAnchor="middle" fill="#15803d" className="text-[9px] font-mono font-bold">Registry</text>
      <text x="283" y="36" textAnchor="middle" fill="#16a34a" className="text-[8px] font-mono">v2.4 Prod</text>
    </g>

    {/* Top Metrics Telemetry Banner */}
    <g transform="translate(30, 20)">
      <rect x="0" y="0" width="260" height="26" rx="6" className="fill-white dark:fill-slate-900 stroke-slate-300 dark:stroke-slate-700" strokeWidth="1.2" />
      <text x="15" y="16" fill="#10b981" className="text-[10px] font-mono font-bold">● Live Monitoring</text>
      <text x="120" y="16" fill="currentColor" className="text-slate-500 text-[10px] font-mono">p99 Latency: 42ms</text>
      <text x="220" y="16" fill="currentColor" className="text-slate-500 text-[10px] font-mono">Err: 0.01%</text>
    </g>
  </svg>
);

/**
 * 8. AI Deployment, Cloud & Production Engineering Illustration
 * Features: Multi-region containerized autoscaling, token bucket rate limiter, GPU tensor parallelism.
 */
export const DeploymentIllustration: React.FC<IllustrationProps> = ({ className = 'w-full h-full' }) => (
  <svg
    viewBox="0 0 320 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Cloud AI Production Deployment and Inference Serving Diagram"
  >
    <rect width="320" height="180" rx="16" fill="currentColor" className="text-slate-100/60 dark:text-slate-800/40" />

    {/* Client Requests -> Load Balancer */}
    <g transform="translate(25, 45)">
      <rect x="0" y="15" width="40" height="30" rx="6" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="1.5" />
      <text x="20" y="33" textAnchor="middle" fill="#4338ca" className="text-[9px] font-mono font-bold">HTTPS</text>
      <path d="M45 30 H65" stroke="#4f46e5" strokeWidth="2" />
      <polygon points="65,27 72,30 65,33" fill="#4f46e5" />
    </g>

    {/* Envoy / NGINX Ingress Load Balancer */}
    <g transform="translate(100, 30)">
      <rect x="0" y="0" width="55" height="60" rx="8" fill="#f8fafc" className="dark:fill-slate-900" stroke="#0ea5e9" strokeWidth="2" />
      <text x="27.5" y="24" textAnchor="middle" fill="#0284c7" className="text-[10px] font-mono font-bold">Ingress</text>
      <text x="27.5" y="40" textAnchor="middle" fill="currentColor" className="text-slate-400 text-[8px] font-mono">Rate Limiter</text>
    </g>

    {/* Fan out to GPU Inference Workers */}
    <g transform="translate(180, 20)">
      {/* Worker 1: vLLM GPU Node A */}
      <rect x="0" y="0" width="105" height="26" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="52.5" y="16" textAnchor="middle" fill="#15803d" className="text-[9px] font-mono font-bold">vLLM Worker A (A100)</text>

      {/* Worker 2: vLLM GPU Node B */}
      <rect x="0" y="34" width="105" height="26" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="52.5" y="50" textAnchor="middle" fill="#15803d" className="text-[9px] font-mono font-bold">vLLM Worker B (A100)</text>

      {/* Worker 3: Autoscaled Replica */}
      <rect x="0" y="68" width="105" height="26" rx="6" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3 3" />
      <text x="52.5" y="84" textAnchor="middle" fill="#1d4ed8" className="text-[9px] font-mono font-semibold">+ K8s Autoscaling Node</text>
    </g>

    {/* Bottom Multi-AZ High Availability Bar */}
    <g transform="translate(30, 132)">
      <rect x="0" y="0" width="260" height="26" rx="6" fill="#fef2f2" className="dark:fill-slate-900" stroke="#f43f5e" strokeWidth="1.2" />
      <text x="15" y="16" fill="#e11d48" className="text-[10px] font-mono font-bold">Availability: 99.99%</text>
      <text x="145" y="16" fill="currentColor" className="text-slate-500 text-[10px] font-mono">Multi-AZ Failover</text>
    </g>
  </svg>
);

/**
 * 9. Phase 0 Orientation & Diagnostic Assessment Illustration
 */
export const Phase0Illustration: React.FC<IllustrationProps> = ({ className = 'w-full h-full' }) => (
  <svg
    viewBox="0 0 320 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Phase 0 Orientation and Skills Diagnostic Radar Diagram"
  >
    <rect width="320" height="180" rx="16" fill="currentColor" className="text-slate-100/60 dark:text-slate-800/40" />

    {/* Skills Readiness Radar / Pentagram */}
    <g transform="translate(160, 90)">
      {/* Outer Web */}
      <polygon points="0,-60 57,-18 35,48 -35,48 -57,-18" stroke="currentColor" className="text-slate-300 dark:text-slate-700" strokeWidth="1" fill="none" />
      {/* Mid Web */}
      <polygon points="0,-40 38,-12 23,32 -23,32 -38,-12" stroke="currentColor" className="text-slate-300 dark:text-slate-700" strokeWidth="1" fill="none" strokeDasharray="2 2" />
      {/* Inner Web */}
      <polygon points="0,-20 19,-6 12,16 -12,16 -19,-6" stroke="currentColor" className="text-slate-300 dark:text-slate-700" strokeWidth="1" fill="none" strokeDasharray="2 2" />

      {/* Actual Assessed Student Readiness Polygon */}
      <polygon points="0,-52 48,-14 30,40 -28,35 -45,-15" fill="#6366f1" fillOpacity="0.25" stroke="#4f46e5" strokeWidth="2.5" />

      {/* Axis Points */}
      <circle cx="0" cy="-52" r="4" fill="#4f46e5" />
      <circle cx="48" cy="-14" r="4" fill="#4f46e5" />
      <circle cx="30" cy="40" r="4" fill="#4f46e5" />
      <circle cx="-28" cy="35" r="4" fill="#4f46e5" />
      <circle cx="-45" cy="-15" r="4" fill="#4f46e5" />

      {/* Dimension Labels */}
      <text x="0" y="-68" textAnchor="middle" fill="#4f46e5" className="text-[9px] font-mono font-bold">Python</text>
      <text x="75" y="-18" textAnchor="start" fill="#4f46e5" className="text-[9px] font-mono font-bold">NumPy</text>
      <text x="45" y="60" textAnchor="start" fill="#4f46e5" className="text-[9px] font-mono font-bold">Calculus</text>
      <text x="-45" y="60" textAnchor="end" fill="#4f46e5" className="text-[9px] font-mono font-bold">LinAlg</text>
      <text x="-75" y="-18" textAnchor="end" fill="#4f46e5" className="text-[9px] font-mono font-bold">Stats</text>
    </g>
  </svg>
);

/**
 * 10. Data Structures & Algorithms (DSA) Illustration
 * Features: Binary search tree, array indices with two pointers, and stack/queue buffer.
 */
export const DSAIllustration: React.FC<IllustrationProps> = ({ className = 'w-full h-full' }) => (
  <svg
    viewBox="0 0 320 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Data Structures and Algorithms Trees and Pointers Diagram"
  >
    <rect width="320" height="180" rx="16" fill="currentColor" className="text-slate-100/60 dark:text-slate-800/40" />

    {/* Array with Two Pointers (Left: 0, Right: 5) */}
    <g transform="translate(30, 25)">
      {[0, 1, 2, 3, 4, 5].map((idx) => (
        <g key={idx} transform={`translate(${idx * 42}, 0)`}>
          <rect
            x="0"
            y="0"
            width="38"
            height="32"
            rx="6"
            className={idx === 1 || idx === 4 ? 'fill-violet-100 dark:fill-violet-950/80 stroke-violet-500' : 'fill-white dark:fill-slate-900 stroke-slate-300 dark:stroke-slate-700'}
            strokeWidth="1.5"
          />
          <text
            x="19"
            y="20"
            textAnchor="middle"
            className={`text-[11px] font-mono font-bold ${idx === 1 || idx === 4 ? 'fill-violet-600 dark:fill-violet-400' : 'fill-slate-700 dark:fill-slate-300'}`}
          >
            {[2, 7, 11, 15, 19, 23][idx]}
          </text>
        </g>
      ))}
      {/* Pointer labels */}
      <text x="61" y="44" textAnchor="middle" fill="#8b5cf6" className="text-[9px] font-mono font-bold">▲ L (p1)</text>
      <text x="187" y="44" textAnchor="middle" fill="#8b5cf6" className="text-[9px] font-mono font-bold">▲ R (p2)</text>
    </g>

    {/* Binary Search Tree Nodes & Branches */}
    <g transform="translate(40, 80)">
      {/* Edges */}
      <line x1="120" y1="18" x2="65" y2="48" stroke="#a78bfa" strokeWidth="2" />
      <line x1="120" y1="18" x2="175" y2="48" stroke="#a78bfa" strokeWidth="2" />
      <line x1="65" y1="48" x2="35" y2="78" stroke="#c4b5fd" strokeWidth="1.5" strokeDasharray="2 2" />
      <line x1="65" y1="48" x2="95" y2="78" stroke="#c4b5fd" strokeWidth="1.5" strokeDasharray="2 2" />
      <line x1="175" y1="48" x2="145" y2="78" stroke="#c4b5fd" strokeWidth="1.5" strokeDasharray="2 2" />
      <line x1="175" y1="48" x2="205" y2="78" stroke="#c4b5fd" strokeWidth="1.5" strokeDasharray="2 2" />

      {/* Root Node */}
      <circle cx="120" cy="18" r="14" fill="#7c3aed" />
      <text x="120" y="22" textAnchor="middle" fill="#ffffff" className="text-[10px] font-mono font-bold">50</text>

      {/* Level 1 Nodes */}
      <circle cx="65" cy="48" r="12" fill="#8b5cf6" />
      <text x="65" y="52" textAnchor="middle" fill="#ffffff" className="text-[9px] font-mono font-bold">25</text>

      <circle cx="175" cy="48" r="12" fill="#8b5cf6" />
      <text x="175" y="52" textAnchor="middle" fill="#ffffff" className="text-[9px] font-mono font-bold">75</text>

      {/* Level 2 Leaf Nodes */}
      <circle cx="35" cy="78" r="9" fill="#c4b5fd" />
      <text x="35" y="81" textAnchor="middle" fill="#5b21b6" className="text-[8px] font-mono font-bold">12</text>

      <circle cx="95" cy="78" r="9" fill="#c4b5fd" />
      <text x="95" y="81" textAnchor="middle" fill="#5b21b6" className="text-[8px] font-mono font-bold">38</text>

      <circle cx="145" cy="78" r="9" fill="#c4b5fd" />
      <text x="145" y="81" textAnchor="middle" fill="#5b21b6" className="text-[8px] font-mono font-bold">62</text>

      <circle cx="205" cy="78" r="9" fill="#c4b5fd" />
      <text x="205" y="81" textAnchor="middle" fill="#5b21b6" className="text-[8px] font-mono font-bold">90</text>
    </g>

    {/* Time Complexity Badge */}
    <g transform="translate(230, 140)">
      <rect x="0" y="0" width="75" height="24" rx="6" fill="#f5f3ff" className="dark:fill-slate-900" stroke="#8b5cf6" strokeWidth="1.2" />
      <text x="37.5" y="15" textAnchor="middle" fill="#7c3aed" className="text-[9px] font-mono font-bold">O(log N) BST</text>
    </g>
  </svg>
);

/**
 * 11. Python Language & Execution Mechanics Illustration
 * Features: Python memory references, bytecode compilation, objects, and list/dict mapping.
 */
export const PythonIllustration: React.FC<IllustrationProps> = ({ className = 'w-full h-full' }) => (
  <svg
    viewBox="0 0 320 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Python Language Execution and Memory Mechanics Diagram"
  >
    <rect width="320" height="180" rx="16" fill="currentColor" className="text-slate-100/60 dark:text-slate-800/40" />

    {/* Variable Names (Stack / Symbol Table) */}
    <g transform="translate(30, 30)">
      <rect x="0" y="0" width="80" height="120" rx="8" className="fill-white dark:fill-slate-900 stroke-emerald-500/50" strokeWidth="1.5" />
      <text x="40" y="22" textAnchor="middle" fill="#059669" className="text-[10px] font-mono font-bold">Stack Scope</text>
      <line x1="8" y1="30" x2="72" y2="30" stroke="#10b981" strokeWidth="1" strokeDasharray="2 2" />

      {/* Variables */}
      <rect x="10" y="40" width="60" height="24" rx="4" fill="#ecfdf5" className="dark:fill-emerald-950/60" stroke="#10b981" strokeWidth="1" />
      <text x="40" y="55" textAnchor="middle" fill="#047857" className="text-[9px] font-mono font-bold">x: id(0x1a)</text>

      <rect x="10" y="75" width="60" height="24" rx="4" fill="#ecfdf5" className="dark:fill-emerald-950/60" stroke="#10b981" strokeWidth="1" />
      <text x="40" y="90" textAnchor="middle" fill="#047857" className="text-[9px] font-mono font-bold">data: list</text>
    </g>

    {/* Pointer Arrows */}
    <path d="M100 82 H140" stroke="#10b981" strokeWidth="2" />
    <polygon points="140,79 146,82 140,85" fill="#10b981" />

    <path d="M100 117 C 120 117, 125 125, 140 125" stroke="#059669" strokeWidth="2" />
    <polygon points="140,122 146,125 140,128" fill="#059669" />

    {/* CPython Heap Memory / PyObject Boxes */}
    <g transform="translate(150, 45)">
      {/* PyObject Int */}
      <rect x="0" y="10" width="140" height="34" rx="6" fill="#f0fdf4" className="dark:fill-slate-900" stroke="#16a34a" strokeWidth="1.5" />
      <text x="12" y="28" fill="#15803d" className="text-[9px] font-mono font-bold">PyLongObject</text>
      <text x="12" y="38" fill="#475569" className="text-[8px] font-mono">ob_refcnt: 2 · val: 42</text>

      {/* PyListObject */}
      <rect x="0" y="55" width="140" height="50" rx="6" fill="#f0fdf4" className="dark:fill-slate-900" stroke="#16a34a" strokeWidth="1.5" />
      <text x="12" y="73" fill="#15803d" className="text-[9px] font-mono font-bold">PyListObject [items]</text>
      <text x="12" y="86" fill="#475569" className="text-[8px] font-mono">size: 3 · allocated: 4</text>
      <text x="12" y="97" fill="#059669" className="text-[8px] font-mono">[0x1a, 0x1b, 0x1c]</text>
    </g>

    {/* CPython Badge */}
    <g transform="translate(200, 15)">
      <rect x="0" y="0" width="100" height="22" rx="4" fill="#065f46" />
      <text x="50" y="15" textAnchor="middle" fill="#ffffff" className="text-[9px] font-mono font-bold">Python 3.12+ AST</text>
    </g>
  </svg>
);

/**
 * 12. Core Java & JVM Architecture Illustration
 * Features: JVM classloader, Heap (Young/Old gen), Metaspace, and Stack frames.
 */
export const JavaIllustration: React.FC<IllustrationProps> = ({ className = 'w-full h-full' }) => (
  <svg
    viewBox="0 0 320 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="JVM Architecture Stack and Garbage Collection Diagram"
  >
    <rect width="320" height="180" rx="16" fill="currentColor" className="text-slate-100/60 dark:text-slate-800/40" />

    {/* JVM Runtime Container */}
    <rect x="25" y="20" width="270" height="140" rx="10" className="fill-white dark:fill-slate-900 stroke-amber-500/60" strokeWidth="1.5" />
    <text x="40" y="38" fill="#d97706" className="text-[10px] font-mono font-bold">Java Virtual Machine (OpenJDK 21 LTS)</text>

    {/* JVM Heap Area */}
    <g transform="translate(35, 48)">
      <rect x="0" y="0" width="160" height="60" rx="6" fill="#fffbeb" className="dark:fill-amber-950/30" stroke="#f59e0b" strokeWidth="1.2" />
      <text x="10" y="16" fill="#b45309" className="text-[9px] font-mono font-bold">JVM Heap Memory</text>

      {/* Eden / Survivor / Tenured partitions */}
      <rect x="10" y="24" width="40" height="28" rx="4" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
      <text x="30" y="41" textAnchor="middle" fill="#92400e" className="text-[8px] font-mono font-bold">Eden</text>

      <rect x="54" y="24" width="40" height="28" rx="4" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
      <text x="74" y="41" textAnchor="middle" fill="#92400e" className="text-[8px] font-mono font-bold">S0 / S1</text>

      <rect x="98" y="24" width="52" height="28" rx="4" fill="#fed7aa" stroke="#ea580c" strokeWidth="1" />
      <text x="124" y="41" textAnchor="middle" fill="#9a3412" className="text-[8px] font-mono font-bold">Old Gen</text>
    </g>

    {/* Thread Stack Area */}
    <g transform="translate(205, 48)">
      <rect x="0" y="0" width="80" height="60" rx="6" fill="#fef2f2" className="dark:fill-rose-950/30" stroke="#ef4444" strokeWidth="1.2" />
      <text x="8" y="16" fill="#b91c1c" className="text-[9px] font-mono font-bold">Thread Stack</text>

      <rect x="8" y="24" width="64" height="14" rx="3" fill="#fee2e2" stroke="#dc2626" strokeWidth="0.8" />
      <text x="40" y="34" textAnchor="middle" fill="#991b1b" className="text-[7px] font-mono">Frame: main()</text>

      <rect x="8" y="40" width="64" height="14" rx="3" fill="#fee2e2" stroke="#dc2626" strokeWidth="0.8" />
      <text x="40" y="50" textAnchor="middle" fill="#991b1b" className="text-[7px] font-mono">Frame: run()</text>
    </g>

    {/* JIT Compiler & Metaspace bar */}
    <g transform="translate(35, 116)">
      <rect x="0" y="0" width="160" height="32" rx="6" fill="#f0fdf4" className="dark:fill-emerald-950/20" stroke="#10b981" strokeWidth="1" />
      <text x="80" y="20" textAnchor="middle" fill="#047857" className="text-[9px] font-mono font-bold">JIT C2 Compiler + Metaspace</text>
    </g>

    {/* GC Indicator */}
    <g transform="translate(205, 116)">
      <rect x="0" y="0" width="80" height="32" rx="6" fill="#e0f2fe" className="dark:fill-sky-950/20" stroke="#0284c7" strokeWidth="1" />
      <text x="40" y="20" textAnchor="middle" fill="#0369a1" className="text-[8px] font-mono font-bold">ZGC Concurrent</text>
    </g>
  </svg>
);
