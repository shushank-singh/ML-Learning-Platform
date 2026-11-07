'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

declare global {
  interface Window {
    loadPyodide?: any;
    pyodideInstance?: any;
    isPyodideLoading?: boolean;
    _pyodideInitPromise?: Promise<any>;
  }
}

export interface PyodideRunResult {
  stdout: string;
  stderr: string;
  result?: any;
  executionTimeMs: number;
  error?: string;
}

// Global singleton loader to avoid duplicate script injection or race conditions
async function loadPyodideSingleton(onStatusChange?: (status: string) => void): Promise<any> {
  if (typeof window === 'undefined') return null;

  if (window.pyodideInstance) {
    return window.pyodideInstance;
  }

  if (window._pyodideInitPromise) {
    return window._pyodideInitPromise;
  }

  window._pyodideInitPromise = (async () => {
    window.isPyodideLoading = true;
    try {
      if (onStatusChange) onStatusChange('Loading Pyodide runtime script...');

      // Dynamically inject Pyodide CDN script on demand only
      if (!document.getElementById('pyodide-script')) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement('script');
          script.id = 'pyodide-script';
          script.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js';
          script.async = true;
          script.onload = () => resolve();
          script.onerror = () =>
            reject(new Error('Failed to load Pyodide script from CDN. You might be offline.'));
          document.head.appendChild(script);
        });
      }

      if (onStatusChange) onStatusChange('Initializing WebAssembly core...');
      const pyodide = await window.loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/',
      });

      if (onStatusChange) onStatusChange('Loading scientific packages (NumPy, SciPy, Scikit-learn)...');
      try {
        await pyodide.loadPackage(['numpy', 'scipy', 'scikit-learn']);
      } catch (pkgErr) {
        console.warn('Optional packages delayed or failed loading:', pkgErr);
      }

      window.pyodideInstance = pyodide;
      return pyodide;
    } finally {
      window.isPyodideLoading = false;
    }
  })();

  return window._pyodideInitPromise;
}

export function usePyodide() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingStatus, setLoadingStatus] = useState<string>('Ready to run Python');
  const [isReady, setIsReady] = useState<boolean>(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const pyodideRef = useRef<any>(null);

  useEffect(() => {
    // If Pyodide was already initialized in the session, link immediately
    if (typeof window !== 'undefined' && window.pyodideInstance) {
      pyodideRef.current = window.pyodideInstance;
      setIsReady(true);
      setLoadingStatus('Python environment ready (WASM, NumPy, Scikit-learn enabled)');
    }
  }, []);

  const initPyodide = useCallback(async (): Promise<any> => {
    if (pyodideRef.current || (typeof window !== 'undefined' && window.pyodideInstance)) {
      pyodideRef.current = window.pyodideInstance;
      setIsReady(true);
      return pyodideRef.current;
    }

    setIsLoading(true);
    setLoadingStatus('Initializing Python WASM environment...');
    setLoadError(null);

    try {
      const instance = await loadPyodideSingleton((status) => {
        setLoadingStatus(status);
      });
      pyodideRef.current = instance;
      setIsReady(true);
      setIsLoading(false);
      setLoadingStatus('Python environment ready (WASM, NumPy, Scikit-learn enabled)');
      return instance;
    } catch (err: any) {
      console.error('Pyodide load error:', err);
      const msg = err.message || 'Failed to initialize Python runtime';
      setLoadError(msg);
      setIsLoading(false);
      setLoadingStatus('Client-side Python could not be initialized');
      throw err;
    }
  }, []);

  const runCode = useCallback(
    async (code: string): Promise<PyodideRunResult> => {
      let pyodide = pyodideRef.current || (typeof window !== 'undefined' ? window.pyodideInstance : null);

      if (!pyodide) {
        try {
          pyodide = await initPyodide();
        } catch (initErr: any) {
          return {
            stdout: '',
            stderr: `Python initialization failed: ${initErr.message || String(initErr)}`,
            executionTimeMs: 0,
            error: initErr.message,
          };
        }
      }

      setIsRunning(true);
      const startTime = performance.now();

      try {
        // Python harness to capture stdout/stderr safely
        const wrapper = `
import sys
import io

_stdout_buffer = io.StringIO()
_stderr_buffer = io.StringIO()
_old_stdout = sys.stdout
_old_stderr = sys.stderr
sys.stdout = _stdout_buffer
sys.stderr = _stderr_buffer

_execution_result = None
try:
${code
  .split('\n')
  .map((line) => '    ' + line)
  .join('\n')}
except Exception as e:
    import traceback
    traceback.print_exc(file=sys.stderr)
finally:
    sys.stdout = _old_stdout
    sys.stderr = _old_stderr

(_stdout_buffer.getvalue(), _stderr_buffer.getvalue())
`;

        const [stdout, stderr] = await pyodide.runPythonAsync(wrapper);
        const endTime = performance.now();

        setIsRunning(false);
        return {
          stdout: stdout || '',
          stderr: stderr || '',
          executionTimeMs: Math.round(endTime - startTime),
        };
      } catch (e: any) {
        const endTime = performance.now();
        setIsRunning(false);
        return {
          stdout: '',
          stderr: e.message || String(e),
          executionTimeMs: Math.round(endTime - startTime),
          error: e.message,
        };
      }
    },
    [initPyodide]
  );

  return {
    isReady,
    isLoading,
    loadingStatus,
    loadError,
    isRunning,
    runCode,
    initPyodide,
  };
}
