import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import os from 'os';

const execAsync = promisify(exec);

interface PistonFile {
  name: string;
  content: string;
}

interface PistonResponse {
  language: string;
  version: string;
  run?: {
    stdout: string;
    stderr: string;
    code: number;
    signal: string | null;
    output: string;
  };
  compile?: {
    stdout: string;
    stderr: string;
    code: number;
    signal: string | null;
    output: string;
  };
  message?: string;
}

export async function POST(req: NextRequest) {
  const startTime = Date.now();
  try {
    const body = await req.json();
    const { code, stdin = '' } = body;

    if (!code || typeof code !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Code is required for execution.' },
        { status: 400 }
      );
    }

    // Determine the Java class name to name the file properly
    const match = code.match(/public\s+class\s+([A-Za-z0-9_]+)/);
    const className = match ? match[1] : 'Main';
    const filename = `${className}.java`;

    // 1. Try Piston sandbox API first (isolated containerized JDK environment)
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch('https://emkc.org/api/v2/piston/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: 'java',
          version: '15.0.2',
          files: [{ name: filename, content: code }],
          stdin: stdin,
          run_timeout: 7000,
          compile_timeout: 7000,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data: PistonResponse = await response.json();
        const duration = Date.now() - startTime;

        // Check if there was a compilation failure
        if (data.compile && data.compile.code !== 0) {
          return NextResponse.json({
            success: false,
            phase: 'compile',
            stdout: data.compile.stdout || '',
            stderr: data.compile.stderr || data.compile.output || '',
            exitCode: data.compile.code,
            executionTimeMs: duration,
            isCompileError: true,
            runner: 'Piston Isolated OpenJDK Container',
          });
        }

        // Run phase results
        const run = data.run;
        const isRuntimeError = (run?.code ?? 0) !== 0 || !!(run?.stderr && run.stderr.trim().length > 0);

        return NextResponse.json({
          success: !isRuntimeError,
          phase: 'run',
          stdout: run?.stdout || run?.output || '',
          stderr: run?.stderr || '',
          exitCode: run?.code ?? 0,
          executionTimeMs: duration,
          isCompileError: false,
          isRuntimeError,
          runner: 'Piston Isolated OpenJDK Container',
        });
      }
    } catch (networkErr: any) {
      console.warn('Piston API unreachable or timed out, trying local execution fallback:', networkErr?.message);
    }

    // 2. Fallback to local JDK if installed on server
    try {
      const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'java-run-'));
      const filePath = path.join(tempDir, filename);
      fs.writeFileSync(filePath, code);

      // Compile
      try {
        await execAsync(`javac "${filePath}"`, { timeout: 6000 });
      } catch (compileErr: any) {
        fs.rmSync(tempDir, { recursive: true, force: true });
        return NextResponse.json({
          success: false,
          phase: 'compile',
          stdout: '',
          stderr: compileErr.stderr || compileErr.stdout || compileErr.message,
          exitCode: compileErr.code || 1,
          executionTimeMs: Date.now() - startTime,
          isCompileError: true,
          runner: 'Local JDK',
        });
      }

      // Execute with timeout and memory cap
      try {
        const runCmd = `java -Xmx128m -cp "${tempDir}" ${className}`;
        const { stdout, stderr } = await execAsync(runCmd, {
          timeout: 6000,
          maxBuffer: 1024 * 512,
        });

        fs.rmSync(tempDir, { recursive: true, force: true });
        return NextResponse.json({
          success: true,
          phase: 'run',
          stdout,
          stderr,
          exitCode: 0,
          executionTimeMs: Date.now() - startTime,
          isCompileError: false,
          runner: 'Local JDK',
        });
      } catch (runErr: any) {
        fs.rmSync(tempDir, { recursive: true, force: true });
        return NextResponse.json({
          success: false,
          phase: 'run',
          stdout: runErr.stdout || '',
          stderr: runErr.stderr || runErr.message,
          exitCode: runErr.code || 1,
          executionTimeMs: Date.now() - startTime,
          isCompileError: false,
          isRuntimeError: true,
          runner: 'Local JDK',
        });
      }
    } catch (localErr: any) {
      // Neither remote sandbox nor local JDK succeeded
      return NextResponse.json(
        {
          success: false,
          error:
            'Java execution service is currently unreachable.\n\nTo execute arbitrary Java code:\n1. Ensure an internet connection to reach the Piston Isolated OpenJDK sandbox, or\n2. Install OpenJDK (JDK 17+) locally on the server host and add javac/java to PATH.',
          executionTimeMs: Date.now() - startTime,
        },
        { status: 503 }
      );
    }
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: err.message || 'Unexpected server error while processing Java code.',
      },
      { status: 500 }
    );
  }
}
