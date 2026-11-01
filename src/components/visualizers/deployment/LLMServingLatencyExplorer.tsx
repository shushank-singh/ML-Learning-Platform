'use client';

import React, { useState, useEffect } from 'react';
import {
  Zap,
  Clock,
  Activity,
  Layers,
  Play,
  RotateCcw,
  Sparkles,
  Server,
  DollarSign,
  CheckCircle2,
} from 'lucide-react';

type ServingEngine = 'naive-pytorch' | 'vllm-paged' | 'speculative-decoding';

export const LLMServingLatencyExplorer: React.FC = () => {
  const [engine, setEngine] = useState<ServingEngine>('vllm-paged');
  const [promptTokens, setPromptTokens] = useState<number>(1024);
  const [outputTokens, setOutputTokens] = useState<number>(150);
  const [enableStreaming, setEnableStreaming] = useState<boolean>(true);

  // Simulation playback state
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [streamedTokenCount, setStreamedTokenCount] = useState<number>(0);

  // Latency metrics calculation
  // TTFT depends on prompt prefill speed
  const prefillSpeedTps = engine === 'naive-pytorch' ? 450 : engine === 'vllm-paged' ? 2400 : 2100;
  const ttftMs = Math.round((promptTokens / prefillSpeedTps) * 1000) + (engine === 'naive-pytorch' ? 120 : 35);

  // Inter-Token Latency (ITL) for autoregressive generation
  const itlMs = engine === 'naive-pytorch' ? 42 : engine === 'vllm-paged' ? 18 : 9; // speculative cuts ITL in half
  const totalGenMs = ttftMs + outputTokens * itlMs;
  const tokensPerSec = Math.round(1000 / itlMs);

  // Streaming simulation effect
  useEffect(() => {
    let timer: any;
    if (isSimulating) {
      if (streamedTokenCount < outputTokens) {
        timer = setTimeout(() => {
          setStreamedTokenCount((prev) => prev + (engine === 'speculative-decoding' ? 2 : 1));
        }, Math.max(10, itlMs));
      } else {
        setIsSimulating(false);
      }
    }
    return () => clearTimeout(timer);
  }, [isSimulating, streamedTokenCount, outputTokens, itlMs, engine]);

  const startSimulation = () => {
    setStreamedTokenCount(0);
    setIsSimulating(true);
  };

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 text-slate-100 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              MODULE 12 VISUALIZER
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-indigo-400" />
              Production LLM Serving &amp; Latency Dynamics Explorer
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Compare Time-to-First-Token (TTFT), Inter-Token Latency (ITL), vLLM PagedAttention, and Server-Sent Events (SSE).
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-indigo-400 font-semibold">
            TTFT: {ttftMs} ms
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-emerald-400 font-semibold">
            ITL: {itlMs} ms/token ({tokensPerSec} tps)
          </span>
        </div>
      </div>

      {/* Configuration Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
        <div>
          <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
            Serving Engine &amp; Optimizer
          </label>
          <div className="grid grid-cols-1 gap-1.5">
            {[
              { id: 'vllm-paged', label: '1. vLLM (PagedAttention)', desc: 'Continuous batching + non-contiguous KV cache' },
              { id: 'speculative-decoding', label: '2. Speculative Decoding', desc: 'Draft model (1B) + Verification target (70B)' },
              { id: 'naive-pytorch', label: '3. Naive PyTorch Loops', desc: 'Static batching without memory paging' },
            ].map((eng) => (
              <button
                key={eng.id}
                onClick={() => setEngine(eng.id as ServingEngine)}
                className={`p-2 rounded-lg text-left text-xs transition-all border ${
                  engine === eng.id
                    ? 'bg-indigo-950/60 border-indigo-500 text-indigo-200'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="font-semibold">{eng.label}</div>
                <div className="text-[10px] text-slate-500">{eng.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-300">Prompt Length</label>
                <span className="text-xs font-mono text-indigo-400 font-bold">{promptTokens} tokens</span>
              </div>
              <input
                type="range"
                min="128"
                max="4096"
                step="128"
                value={promptTokens}
                onChange={(e) => setPromptTokens(Number(e.target.value))}
                className="w-full accent-indigo-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-300">Tokens to Generate</label>
                <span className="text-xs font-mono text-indigo-400 font-bold">{outputTokens} tokens</span>
              </div>
              <input
                type="range"
                min="20"
                max="300"
                step="10"
                value={outputTokens}
                onChange={(e) => setOutputTokens(Number(e.target.value))}
                className="w-full accent-indigo-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-850 flex items-center justify-between">
            <span className="text-xs text-slate-300">Streaming (SSE)</span>
            <button
              onClick={() => setEnableStreaming(!enableStreaming)}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${
                enableStreaming ? 'bg-emerald-950 border-emerald-500 text-emerald-300' : 'bg-slate-800 border-slate-700 text-slate-400'
              }`}
            >
              {enableStreaming ? 'SSE Active (Sub-sec feedback)' : 'Buffered JSON (Blocks until end)'}
            </button>
          </div>
        </div>

        {/* Live Simulation Card */}
        <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="text-xs font-semibold text-white flex items-center justify-between">
              <span>Token Generation Sandbox</span>
              <span className="text-[10px] font-mono text-slate-500">LIVE RENDER</span>
            </div>
            <div className="text-xs text-slate-400">
              Total Request Latency: <strong className="text-white font-mono">{(totalGenMs / 1000).toFixed(2)}s</strong>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mt-1">
              <div
                className="h-full bg-indigo-500 rounded-full transition-all"
                style={{ width: `${Math.min(100, (streamedTokenCount / outputTokens) * 100)}%` }}
              />
            </div>
            <div className="text-[11px] font-mono text-indigo-300">
              Generated: {streamedTokenCount} / {outputTokens} tokens
            </div>
          </div>

          <button
            onClick={startSimulation}
            disabled={isSimulating}
            className="w-full mt-3 py-2 px-3 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white flex items-center justify-center gap-1.5 transition-all shadow-md shadow-indigo-600/30"
          >
            <Play className="w-3.5 h-3.5" />
            <span>{isSimulating ? 'Streaming...' : 'Simulate LLM Stream'}</span>
          </button>
        </div>
      </div>

      {/* Latency Waterfall Breakdown */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
        <div className="text-xs font-semibold text-slate-400 flex items-center justify-between">
          <span>LATENCY WATERFALL: PREFILL (TTFT) VS DECODE (ITL)</span>
          <span className="text-[11px] font-mono text-slate-500">USER PERCEPTION MODEL</span>
        </div>

        <div className="space-y-2 font-mono text-xs">
          <div className="flex items-center gap-3">
            <span className="w-36 text-slate-400 shrink-0">1. Prefill (TTFT):</span>
            <div className="flex-1 bg-slate-800 h-6 rounded-lg overflow-hidden flex items-center px-2">
              <div
                className="bg-amber-500/80 h-full rounded text-[10px] font-bold text-black flex items-center px-2"
                style={{ width: `${Math.max(10, Math.min(45, (ttftMs / totalGenMs) * 100))}%` }}
              >
                {ttftMs}ms
              </div>
            </div>
            <span className="text-amber-400 text-[11px] w-28 text-right shrink-0">Prompt Encoding</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="w-36 text-slate-400 shrink-0">2. Generation (Decode):</span>
            <div className="flex-1 bg-slate-800 h-6 rounded-lg overflow-hidden flex items-center px-2">
              <div
                className="bg-indigo-500 h-full rounded text-[10px] font-bold text-white flex items-center px-2"
                style={{ width: `${Math.max(25, 100 - (ttftMs / totalGenMs) * 100)}%` }}
              >
                {outputTokens * itlMs}ms ({outputTokens} tokens × {itlMs}ms)
              </div>
            </div>
            <span className="text-indigo-400 text-[11px] w-28 text-right shrink-0">Autoregressive</span>
          </div>
        </div>

        <div className="mt-3 p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed">
          {enableStreaming ? (
            <p>
              <strong className="text-emerald-400">Streaming Active (SSE):</strong> User perceives response in <strong className="text-white">{ttftMs}ms</strong> (Time to First Token), reading comfortably at {tokensPerSec} tokens/sec as tokens emit iteratively.
            </p>
          ) : (
            <p>
              <strong className="text-rose-400">Non-streaming (Buffered):</strong> User stares at blank spinner for full <strong className="text-white">{(totalGenMs / 1000).toFixed(2)} seconds</strong> before entire JSON payload arrives at once.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

