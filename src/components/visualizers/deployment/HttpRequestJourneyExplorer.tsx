'use client';

import React, { useState } from 'react';
import {
  Globe,
  Network,
  Shield,
  Layers,
  Cpu,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Clock,
  Play,
  RotateCcw,
  FileText,
  AlertTriangle,
} from 'lucide-react';

type Scenario = 'success-200' | 'validation-422' | 'timeout-504' | 'cors-blocked';

export const HttpRequestJourneyExplorer: React.FC = () => {
  const [scenario, setScenario] = useState<Scenario>('success-200');
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const steps = [
    {
      id: 'dns',
      title: '1. DNS Resolution & IP Discovery',
      latency: '14 ms',
      actor: 'Browser / DNS Resolver',
      desc: 'Browser queries recursive DNS resolver for api.aiml-academy.com. Returns A record IP: 198.51.100.42.',
      headers: 'UDP Port 53 -> A 198.51.100.42 (TTL: 300s)',
      status: 'ok',
    },
    {
      id: 'tcp-tls',
      title: '2. TCP 3-Way Handshake & TLS 1.3',
      latency: '22 ms',
      actor: 'Transport Layer (TCP / TLS)',
      desc: 'SYN -> SYN-ACK -> ACK establishes reliable TCP connection on Port 443. Ephemeral Diffie-Hellman keys exchanged for TLS encryption.',
      headers: 'TLS_AES_256_GCM_SHA384 | SNI: api.aiml-academy.com',
      status: scenario === 'cors-blocked' ? 'error' : 'ok',
    },
    {
      id: 'reverse-proxy',
      title: '3. Nginx Reverse Proxy & CORS Filter',
      latency: '3 ms',
      actor: 'Nginx Ingress / ALB',
      desc: scenario === 'cors-blocked'
        ? 'CORS Preflight (OPTIONS) rejected: Origin "https://untrusted-site.xyz" is missing in Access-Control-Allow-Origin header.'
        : 'Terminates TLS, validates Host header, verifies CORS headers (Access-Control-Allow-Origin: *), injects X-Forwarded-For: 203.0.113.19.',
      headers: 'Host: api.aiml-academy.com\nX-Request-ID: req_9f2a7c81',
      status: scenario === 'cors-blocked' ? 'error' : 'ok',
    },
    {
      id: 'fastapi-routing',
      title: '4. FastAPI ASGI Routing & Auth',
      latency: '2 ms',
      actor: 'FastAPI / Uvicorn Worker',
      desc: 'Uvicorn receives HTTP request stream, dispatches to FastAPI app. Dependency injection verifies Bearer API key in Authorization header.',
      headers: 'POST /v1/models/churn/predict HTTP/1.1\nContent-Type: application/json',
      status: 'ok',
    },
    {
      id: 'pydantic',
      title: '5. Pydantic Request Validation',
      latency: '1 ms',
      actor: 'Pydantic Model Validator',
      desc: scenario === 'validation-422'
        ? 'Validation Failed: field "monthly_charges" received string "invalid_number", expected float. Generates 422 Unprocessable Entity.'
        : 'Incoming JSON parsed into ChurnPredictRequest: tenure (int >= 0), monthly_charges (float > 0.0), contract_type (Literal["Month", "OneYear"]).',
      headers: scenario === 'validation-422' ? 'HTTP 422 Unprocessable Entity' : 'Schema validated successfully',
      status: scenario === 'validation-422' ? 'error' : 'ok',
    },
    {
      id: 'model-inference',
      title: '6. Model Inference Engine',
      latency: scenario === 'timeout-504' ? '10000 ms' : '28 ms',
      actor: 'PyTorch / ONNX Runtime',
      desc: scenario === 'timeout-504'
        ? 'Worker thread pool starved or GPU worker hung. Gateway timeout threshold (5.0s) exceeded. Returns 504 Gateway Timeout.'
        : 'Feature vector fed to ONNX runtime session. Computes sigmoid output = 0.842 (High Churn Risk).',
      headers: 'Inference runtime: 28.4ms | Batches: 1',
      status: scenario === 'timeout-504' ? 'error' : 'ok',
    },
    {
      id: 'http-response',
      title: '7. Serialized JSON Response',
      latency: '2 ms',
      actor: 'FastAPI -> Client Browser',
      desc: scenario === 'success-200'
        ? 'HTTP/1.1 200 OK with Content-Type: application/json. Body: {"prediction": 1, "probability": 0.842, "model_version": "v2.1"}.'
        : scenario === 'validation-422'
        ? 'HTTP/1.1 422 Unprocessable Entity with error detail array identifying invalid input fields.'
        : scenario === 'timeout-504'
        ? 'HTTP/1.1 504 Gateway Timeout with error response indicating upstream inference timeout.'
        : 'CORS policy blocked response headers from reaching frontend script execution environment.',
      headers: scenario === 'success-200' ? 'HTTP/1.1 200 OK\nContent-Type: application/json' : 'Status: Error response sent',
      status: scenario === 'success-200' ? 'ok' : 'error',
    },
  ];

  const currentStep = steps[activeStepIndex];

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 text-slate-100 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-sky-500/20 text-sky-400 border border-sky-500/30">
              MODULE 3 &amp; 5 VISUALIZER
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Network className="w-5 h-5 text-sky-400" />
              Interactive HTTP Request Journey &amp; Lifecycle Explorer
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Trace packet flow from browser DNS queries, TLS handshakes, and reverse proxy routing to FastAPI Pydantic validation.
          </p>
        </div>

        {/* Scenario Switcher */}
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'success-200', label: '200 OK', color: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/40' },
            { id: 'validation-422', label: '422 Validation Error', color: 'text-amber-400 border-amber-500/40 bg-amber-950/40' },
            { id: 'timeout-504', label: '504 Timeout', color: 'text-rose-400 border-rose-500/40 bg-rose-950/40' },
            { id: 'cors-blocked', label: 'CORS Blocked', color: 'text-purple-400 border-purple-500/40 bg-purple-950/40' },
          ].map((sc) => (
            <button
              key={sc.id}
              onClick={() => {
                setScenario(sc.id as Scenario);
                setActiveStepIndex(0);
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
                scenario === sc.id ? `${sc.color} ring-1 ring-white/20` : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
              }`}
            >
              {sc.label}
            </button>
          ))}
        </div>
      </div>

      {/* Steps Visual Progress Tracker */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {steps.map((st, i) => {
          const isSelected = activeStepIndex === i;
          const isPast = activeStepIndex > i;
          return (
            <button
              key={st.id}
              onClick={() => setActiveStepIndex(i)}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'border-sky-500 bg-sky-950/40 ring-1 ring-sky-500/50 shadow-md'
                  : isPast
                  ? 'border-slate-800 bg-slate-900/60 opacity-80'
                  : 'border-slate-800 bg-slate-950 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-slate-400">STEP {i + 1}</span>
                {st.status === 'ok' ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <XCircle className="w-3.5 h-3.5 text-rose-400" />
                )}
              </div>
              <div className="text-xs font-semibold text-slate-200 truncate mt-1">{st.title.split('. ')[1]}</div>
              <div className="text-[10px] font-mono text-slate-500 mt-0.5">{st.latency}</div>
            </button>
          );
        })}
      </div>

      {/* Active Step Deep Dive Card */}
      <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-xs font-mono">
              {activeStepIndex + 1}
            </span>
            <h4 className="text-sm sm:text-base font-bold text-white">{currentStep.title}</h4>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-sky-400" />
              Duration: <strong className="text-white">{currentStep.latency}</strong>
            </span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
              {currentStep.actor}
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {currentStep.desc}
        </p>

        {/* Technical Header / Wire Payload */}
        <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 font-mono text-xs">
          <div className="text-[10px] text-slate-500 font-semibold mb-1 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-sky-400" />
            PROTOCOL HEADERS &amp; WIRE METADATA
          </div>
          <pre className="text-slate-300 whitespace-pre-wrap overflow-x-auto text-[11px]">
            {currentStep.headers}
          </pre>
        </div>

        {/* Step Navigation Controls */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
            disabled={activeStepIndex === 0}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-slate-200 transition-all"
          >
            ← Previous Step
          </button>
          <div className="text-xs text-slate-500 font-mono">
            Step {activeStepIndex + 1} of {steps.length}
          </div>
          <button
            onClick={() => setActiveStepIndex((prev) => Math.min(steps.length - 1, prev + 1))}
            disabled={activeStepIndex === steps.length - 1}
            className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-sky-600 hover:bg-sky-500 disabled:opacity-40 disabled:hover:bg-sky-600 text-white transition-all flex items-center gap-1.5"
          >
            <span>Next Step</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

