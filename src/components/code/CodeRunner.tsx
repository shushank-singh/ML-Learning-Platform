'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Play, RotateCcw, Copy, Check, Download, Terminal, AlertCircle, ExternalLink, Clock } from 'lucide-react';
import { usePyodide, PyodideRunResult } from '@/lib/pyodide';

// Dynamically import Monaco Editor to prevent SSR issues
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div className="h-64 flex items-center justify-center bg-slate-900 text-slate-400 font-mono text-sm">
      Loading Python Code Studio...
    </div>
  ),
});

interface CodeRunnerProps {
  initialCode: string;
  expectedOutput?: string;
  title?: string;
  readOnly?: boolean;
}

export const CodeRunner: React.FC<CodeRunnerProps> = ({
  initialCode,
  expectedOutput,
  title = 'Interactive Python Playground (NumPy & Scikit-learn Ready)',
  readOnly = false,
}) => {
  const [code, setCode] = useState<string>(initialCode.trim());
  const [runResult, setRunResult] = useState<PyodideRunResult | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const { isReady, isLoading, loadingStatus, loadError, isRunning, runCode } = usePyodide();

  const handleRun = async () => {
    const result = await runCode(code);
    setRunResult(result);
  };

  const handleReset = () => {
    setCode(initialCode.trim());
    setRunResult(null);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/x-python' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ml_mastery_exercise.py';
    a.click();
    URL.revokeObjectURL(url);
  };

  const openInColab = () => {
    const encoded = encodeURIComponent(code);
    window.open(`https://colab.research.google.com/#create=true`, '_blank');
  };

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden my-6">
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-indigo-500" />
          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 font-mono">
            {title}
          </span>
          {isLoading && (
            <span className="text-[11px] text-amber-500 flex items-center gap-1 font-mono">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping inline-block"></span>
              {loadingStatus}
            </span>
          )}
          {isReady && !isLoading && (
            <span className="text-[11px] text-emerald-500 flex items-center gap-1 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
              Pyodide WASM Engine Active
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 mt-2 sm:mt-0">
          <button
            onClick={handleCopy}
            className="p-1.5 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            title="Copy Python Code"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
          </button>
          <button
            onClick={handleDownload}
            className="p-1.5 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            title="Download .py file"
          >
            <Download className="w-4 h-4" />
          </button>
          <button
            onClick={openInColab}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors"
            title="Open Google Colab"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Colab</span>
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            title="Reset to Starter Code"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          {!readOnly && (
            <button
              onClick={handleRun}
              disabled={isRunning || !isReady}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md bg-emerald-600 hover:bg-emerald-700 text-white transition-colors disabled:opacity-50 shadow-sm"
            >
              <Play className="w-3.5 h-3.5" />
              {isRunning ? 'Running...' : 'Run Code'}
            </button>
          )}
        </div>
      </div>

      {/* Editor Body */}
      <div className="border-b border-slate-200 dark:border-slate-800">
        <div className="h-64 sm:h-72 w-full">
          <MonacoEditor
            height="100%"
            language="python"
            theme="vs-dark"
            value={code}
            onChange={(val) => setCode(val || '')}
            options={{
              minimap: { enabled: false },
              fontSize: 13,
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              lineNumbers: 'on',
              scrollBeyondLastLine: false,
              wordWrap: 'on',
              readOnly,
              automaticLayout: true,
              tabSize: 4,
            }}
          />
        </div>
      </div>

      {/* Output Console Pane */}
      <div className="bg-slate-950 p-4 font-mono text-xs text-slate-300">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-semibold tracking-wider text-[11px] uppercase">Terminal Output</span>
            {runResult && (
              <span className="text-[10px] text-slate-500 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {runResult.executionTimeMs}ms
              </span>
            )}
          </div>
          {runResult && (
            <button
              onClick={() => setRunResult(null)}
              className="text-[10px] text-slate-500 hover:text-slate-300 transition-colors"
            >
              Clear Console
            </button>
          )}
        </div>

        {/* Status or Result */}
        {loadError && (
          <div className="p-3 bg-rose-950/40 border border-rose-800 rounded text-rose-300 flex items-start gap-2 mb-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
            <div>
              <p className="font-semibold">WebAssembly Python Loading Notice:</p>
              <p className="text-[11px] text-rose-300/80">{loadError}</p>
              <p className="text-[11px] mt-1 text-slate-400">
                You can copy this snippet or click &quot;Colab&quot; above to run directly in Google Colab.
              </p>
            </div>
          </div>
        )}

        {runResult ? (
          <div>
            {runResult.stdout && (
              <pre className="text-emerald-400 whitespace-pre-wrap leading-relaxed">
                {runResult.stdout}
              </pre>
            )}
            {runResult.stderr && (
              <pre className="text-rose-400 whitespace-pre-wrap leading-relaxed mt-2">
                {runResult.stderr}
              </pre>
            )}
            {!runResult.stdout && !runResult.stderr && (
              <span className="text-slate-500 italic">Code executed with no stdout output.</span>
            )}
          </div>
        ) : (
          <div className="space-y-1">
            <div className="text-slate-500 italic">
              Click &quot;Run Code&quot; above to compile and execute in client-side Pyodide WebAssembly.
            </div>
            {expectedOutput && (
              <div className="mt-3 pt-2 border-t border-slate-800/80">
                <span className="text-slate-400 text-[10px] uppercase font-semibold block mb-1">
                  Expected Benchmark Output:
                </span>
                <pre className="text-slate-400 text-[11px] bg-slate-900/80 p-2.5 rounded border border-slate-800 whitespace-pre-wrap">
                  {expectedOutput}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
