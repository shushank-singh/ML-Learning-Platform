'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

declare global {
  interface Window {
    loadPyodide?: any;
    pyodideInstance?: any;
    isPyodideLoading?: boolean;
  }
}

export interface PyodideRunResult {
  stdout: string;
  stderr: string;
  result?: any;
  executionTimeMs: number;
  error?: string;
}

export function usePyodide() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadingStatus, setLoadingStatus] = useState<string>('Initializing Python WASM environment...');
  const [isReady, setIsReady] = useState<boolean>(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const pyodideRef = useRef<any>(null);

  useEffect(() => {
    let isMounted = true;

    async function initPyodide() {
      if (typeof window === 'undefined') return;

      if (window.pyodideInstance) {
        pyodideRef.current = window.pyodideInstance;
        if (isMounted) {
          setIsReady(true);
          setIsLoading(false);
          setLoadingStatus('Python environment ready (NumPy, SciPy, Scikit-learn available)');
        }
        return;
      }

      if (window.isPyodideLoading) {
        // Poll for existing loading instance
        const checkInterval = setInterval(() => {
          if (window.pyodideInstance) {
            pyodideRef.current = window.pyodideInstance;
            if (isMounted) {
              setIsReady(true);
              setIsLoading(false);
              setLoadingStatus('Python environment ready');
            }
            clearInterval(checkInterval);
          }
        }, 300);
        return;
      }

      window.isPyodideLoading = true;

      try {
        if (isMounted) setLoadingStatus('Loading Pyodide runtime script...');
        
        // Dynamically inject script if not present
        if (!document.getElementById('pyodide-script')) {
          await new Promise<void>((resolve, reject) => {
            const script = document.createElement('script');
            script.id = 'pyodide-script';
            script.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js';
            script.async = true;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error('Failed to load Pyodide script from CDN. You might be offline.'));
            document.head.appendChild(script);
          });
        }

        if (isMounted) setLoadingStatus('Initializing WebAssembly core...');
        const pyodide = await window.loadPyodide({
          indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/',
        });

        if (isMounted) setLoadingStatus('Loading NumPy and basic scientific packages...');
        try {
          await pyodide.loadPackage(['numpy', 'scipy', 'scikit-learn']);
        } catch (pkgErr) {
          console.warn('Optional packages delayed or failed loading:', pkgErr);
        }

        window.pyodideInstance = pyodide;
        pyodideRef.current = pyodide;

        if (isMounted) {
          setIsReady(true);
          setIsLoading(false);
          setLoadingStatus('Python environment ready (WASM, NumPy, Scikit-learn enabled)');
        }
      } catch (err: any) {
        console.error('Pyodide load error:', err);
        if (isMounted) {
          setLoadError(err.message || 'Failed to initialize Python runtime');
          setIsLoading(false);
          setLoadingStatus('Client-side Python could not be initialized');
        }
      } finally {
        window.isPyodideLoading = false;
      }
    }

    initPyodide();

    return () => {
      isMounted = false;
    };
  }, []);

  const runCode = useCallback(
    async (code: string): Promise<PyodideRunResult> => {
      if (!pyodideRef.current) {
        return {
          stdout: '',
          stderr: 'Python engine is not initialized yet. Please wait for WebAssembly to load, or check your internet connection.',
          executionTimeMs: 0,
          error: 'Python engine not ready',
        };
      }

      setIsRunning(true);
      const startTime = performance.now();

      try {
        const pyodide = pyodideRef.current;

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
    []
  );

  return {
    isReady,
    isLoading,
    loadingStatus,
    loadError,
    isRunning,
    runCode,
  };
}
