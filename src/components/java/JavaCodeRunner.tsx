'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import {
  Play,
  RotateCcw,
  Copy,
  Check,
  Download,
  Terminal,
  AlertCircle,
  Clock,
  Keyboard,
  ShieldCheck,
  Maximize2,
  Minimize2,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div className="h-64 flex items-center justify-center bg-slate-900 text-slate-400 font-mono text-sm">
      Loading Java Code Studio...
    </div>
  ),
});

interface JavaCodeRunnerProps {
  initialCode: string;
  expectedOutput?: string;
  title?: string;
}

interface ExecutionResult {
  success: boolean;
  phase?: 'compile' | 'run';
  stdout: string;
  stderr: string;
  exitCode?: number;
  executionTimeMs?: number;
  isCompileError?: boolean;
  isRuntimeError?: boolean;
  runner?: string;
  error?: string;
}

export const JavaCodeRunner: React.FC<JavaCodeRunnerProps> = ({
  initialCode,
  expectedOutput,
  title = 'Interactive Java Execution Studio (OpenJDK Sandbox)',
}) => {
  const [code, setCode] = useState<string>(initialCode.trim());
  const [stdin, setStdin] = useState<string>('');
  const [showStdin, setShowStdin] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const handleRun = async () => {
    setIsRunning(true);
    setResult(null);

    try {
      const response = await fetch('/api/execute-java', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, stdin }),
      });

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      setResult({
        success: false,
        stdout: '',
        stderr: err.message || 'Network error communicating with Java execution runner.',
        error: 'Network request failed. Please check your connection.',
      });
    } finally {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setCode(initialCode.trim());
    setResult(null);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    // Extract class name
    const match = code.match(/public\s+class\s+([A-Za-z0-9_]+)/);
    const className = match ? match[1] : 'Main';
    const blob = new Blob([code], { type: 'text/x-java-source' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${className}.java`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className={`rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden my-6 transition-all ${
        isFullscreen ? 'fixed inset-4 z-50 flex flex-col shadow-2xl' : ''
      }`}
    >
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-amber-500" />
          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 font-mono">
            {title}
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-900/60">
            <ShieldCheck className="w-3 h-3 text-amber-500" />
            Isolated Sandbox
          </span>
        </div>

        <div className="flex items-center gap-1.5 mt-2 sm:mt-0">
          <button
            onClick={() => setShowStdin(!showStdin)}
            className={`px-2 py-1 text-xs font-semibold rounded flex items-center gap-1 transition-colors ${
              showStdin
                ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
            title="Provide Standard Input (Scanner System.in)"
          >
            <Keyboard className="w-3.5 h-3.5" />
            <span className="text-[11px]">Stdin</span>
          </button>

          <button
            onClick={handleCopy}
            className="p-1.5 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            title="Copy Java Code"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
          </button>

          <button
            onClick={handleDownload}
            className="p-1.5 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            title="Download .java file"
          >
            <Download className="w-4 h-4" />
          </button>

          <button
            onClick={handleReset}
            className="p-1.5 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            title="Reset to Initial Program"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors hidden sm:block"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          <button
            onClick={handleRun}
            disabled={isRunning}
            className="ml-2 px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-semibold text-xs flex items-center gap-1.5 shadow-sm transition-all disabled:opacity-50"
          >
            <Play className={`w-3.5 h-3.5 fill-current ${isRunning ? 'animate-spin' : ''}`} />
            <span>{isRunning ? 'Compiling & Running...' : 'Run Code'}</span>
          </button>
        </div>
      </div>

      {/* Stdin Drawer (If open) */}
      {showStdin && (
        <div className="bg-slate-50 dark:bg-slate-800/80 p-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Standard Input (Passed to System.in):
            </span>
            <span className="text-[10px] text-slate-400 font-mono">Simulate user input</span>
          </div>
          <textarea
            value={stdin}
            onChange={(e) => setStdin(e.target.value)}
            rows={2}
            placeholder="Enter input here (each line will be read by scanner.nextLine())..."
            className="w-full text-xs font-mono p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>
      )}

      {/* Monaco Editor Container */}
      <div className={isFullscreen ? 'flex-1 min-h-[300px]' : 'h-72'}>
        <MonacoEditor
          height="100%"
          language="java"
          theme="vs-dark"
          value={code}
          onChange={(newVal) => setCode(newVal || '')}
          options={{
            minimap: { enabled: false },
            fontSize: 13,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 4,
            padding: { top: 12, bottom: 12 },
          }}
        />
      </div>

      {/* Execution Results / Output Terminal */}
      {result && (
        <div className="border-t border-slate-200 dark:border-slate-800 bg-slate-950 text-slate-200 p-4 font-mono text-xs">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                Execution Terminal
              </span>
              {result.runner && (
                <span className="text-[10px] text-slate-500 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                  {result.runner}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              {result.executionTimeMs !== undefined && (
                <span className="flex items-center gap-1 text-[11px] text-slate-400">
                  <Clock className="w-3 h-3 text-amber-400" />
                  {result.executionTimeMs}ms
                </span>
              )}
              {result.success ? (
                <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Exit Code: 0 (Success)
                </span>
              ) : (
                <span className="flex items-center gap-1 text-[11px] text-red-400 font-bold">
                  <XCircle className="w-3.5 h-3.5" />
                  Exit Code: {result.exitCode ?? 1} (Failed)
                </span>
              )}
            </div>
          </div>

          {/* Compilation Error Output */}
          {result.isCompileError && (
            <div className="p-3 rounded-lg bg-red-950/60 border border-red-800/80 text-red-300 whitespace-pre-wrap leading-relaxed">
              <div className="font-bold text-red-400 mb-1 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>javac Compilation Error:</span>
              </div>
              {result.stderr}
            </div>
          )}

          {/* Runtime Error Output */}
          {result.isRuntimeError && (
            <div className="p-3 rounded-lg bg-amber-950/60 border border-amber-800/80 text-amber-300 whitespace-pre-wrap leading-relaxed">
              <div className="font-bold text-amber-400 mb-1 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Java Runtime Exception:</span>
              </div>
              {result.stderr}
            </div>
          )}

          {/* Standard Output */}
          {result.stdout && (
            <div className="mt-2 text-emerald-400 whitespace-pre-wrap leading-relaxed">
              {result.stdout}
            </div>
          )}

          {/* Generic Error Output */}
          {result.error && (
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 whitespace-pre-wrap leading-relaxed">
              {result.error}
            </div>
          )}
        </div>
      )}

      {/* Expected Output Collapsible Reference */}
      {expectedOutput && !result && (
        <div className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 px-4 py-2 flex items-center justify-between text-xs">
          <span className="text-slate-500 font-mono">Expected Output:</span>
          <code className="text-emerald-600 dark:text-emerald-400 font-mono font-semibold">
            {expectedOutput}
          </code>
        </div>
      )}
    </div>
  );
};
