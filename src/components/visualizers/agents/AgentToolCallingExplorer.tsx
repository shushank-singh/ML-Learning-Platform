'use client';

import React, { useState } from 'react';
import { Wrench, CheckCircle2, XCircle, AlertTriangle, Play, Shield, RefreshCw, FileCode, Check } from 'lucide-react';

interface ToolParam {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'array';
  description: string;
  required: boolean;
  allowedValues?: string[];
  min?: number;
  max?: number;
}

interface ToolDefinition {
  name: string;
  description: string;
  category: 'database' | 'payment' | 'email' | 'system';
  isDestructive: boolean;
  parameters: ToolParam[];
}

const REGISTERED_TOOLS: ToolDefinition[] = [
  {
    name: 'transfer_funds',
    description: 'Execute an account-to-account funds transfer with currency validation.',
    category: 'payment',
    isDestructive: true,
    parameters: [
      { name: 'recipient_account', type: 'string', description: 'IBAN or account ID', required: true },
      { name: 'amount', type: 'number', description: 'Transfer amount (USD)', required: true, min: 1, max: 10000 },
      { name: 'currency', type: 'string', description: 'Currency code', required: true, allowedValues: ['USD', 'EUR', 'GBP'] },
      { name: 'memo', type: 'string', description: 'Transaction notes', required: false },
    ],
  },
  {
    name: 'sql_read_query',
    description: 'Execute a read-only SQL query against customer and orders tables.',
    category: 'database',
    isDestructive: false,
    parameters: [
      { name: 'query', type: 'string', description: 'SELECT SQL query string', required: true },
      { name: 'max_rows', type: 'number', description: 'Limit row count', required: false, min: 1, max: 500 },
    ],
  },
];

export const AgentToolCallingExplorer: React.FC = () => {
  const [selectedToolIdx, setSelectedToolIdx] = useState(0);
  const tool = REGISTERED_TOOLS[selectedToolIdx];

  // Simulated LLM generated tool call inputs
  const [inputs, setInputs] = useState<Record<string, any>>({
    recipient_account: 'ACC-8831-902',
    amount: 250,
    currency: 'USD',
    memo: 'Invoice 104 payment',
  });

  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [executionResult, setExecutionResult] = useState<{
    status: 'success' | 'error' | 'idle';
    message: string;
    payload?: any;
  }>({ status: 'idle', message: 'Click "Validate & Execute Tool" to simulate runtime.' });

  const handleInputChange = (field: string, value: any) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  const handleValidateAndRun = () => {
    const errors: string[] = [];

    tool.parameters.forEach((param) => {
      const val = inputs[param.name];

      // Check required
      if (param.required && (val === undefined || val === null || val === '')) {
        errors.push(`Missing required parameter: "${param.name}".`);
        return;
      }

      if (val !== undefined && val !== '') {
        // Type check
        if (param.type === 'number') {
          const num = Number(val);
          if (isNaN(num)) {
            errors.push(`Parameter "${param.name}" must be a number, received: ${typeof val}.`);
          } else {
            if (param.min !== undefined && num < param.min) {
              errors.push(`Parameter "${param.name}" must be >= ${param.min}.`);
            }
            if (param.max !== undefined && num > param.max) {
              errors.push(`Parameter "${param.name}" exceeds maximum allowed limit of ${param.max}.`);
            }
          }
        }

        if (param.allowedValues && !param.allowedValues.includes(String(val))) {
          errors.push(
            `Parameter "${param.name}" must be one of [${param.allowedValues.join(', ')}]. Received "${val}".`
          );
        }

        // SQL injection detection check for sql tool
        if (tool.name === 'sql_read_query' && param.name === 'query') {
          const lower = String(val).toLowerCase();
          if (lower.includes('drop ') || lower.includes('delete ') || lower.includes('update ') || lower.includes('insert ')) {
            errors.push(`Security Policy Violation: Mutation commands (DROP, DELETE, UPDATE) are blocked in read-only tool.`);
          }
        }
      }
    });

    setValidationErrors(errors);

    if (errors.length > 0) {
      setExecutionResult({
        status: 'error',
        message: 'JSON Schema Validation Failed. Runtime rejected tool dispatch. Error feedback returned to model.',
      });
    } else {
      setExecutionResult({
        status: 'success',
        message: `Tool "${tool.name}" executed successfully within permission boundary.`,
        payload: {
          timestamp: new Date().toISOString(),
          invokedTool: tool.name,
          receivedParams: inputs,
          returnValue: {
            success: true,
            executionTimeMs: 42,
            transactionId: 'txn_mock_' + Math.floor(Math.random() * 90000 + 10000),
          },
        },
      });
    }
  };

  const injectInvalidData = () => {
    if (tool.name === 'transfer_funds') {
      setInputs({
        recipient_account: '', // Missing required
        amount: 50000, // Exceeds 10,000 max
        currency: 'BITCOIN', // Not in enum
        memo: 'Illegal test payload',
      });
    } else {
      setInputs({
        query: 'DROP TABLE customers;',
        max_rows: -5,
      });
    }
  };

  const injectValidData = () => {
    if (tool.name === 'transfer_funds') {
      setInputs({
        recipient_account: 'ACC-8831-902',
        amount: 250,
        currency: 'USD',
        memo: 'Invoice 104 payment',
      });
    } else {
      setInputs({
        query: 'SELECT customer_id, name, email FROM customers WHERE active = true LIMIT 10;',
        max_rows: 50,
      });
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-400 text-xs font-semibold uppercase tracking-wider">
            <Wrench className="w-3.5 h-3.5" />
            Function Schema & Tool Calling Engine
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">
            JSON Schema Parameter Validation & Guardrails
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Simulate how runtime engines parse tool calls from model tokens, validate bounds, and guard against malformed parameters.
          </p>
        </div>

        {/* Tool Selectors */}
        <div className="flex items-center gap-2">
          {REGISTERED_TOOLS.map((t, idx) => (
            <button
              key={t.name}
              onClick={() => {
                setSelectedToolIdx(idx);
                setValidationErrors([]);
                setExecutionResult({ status: 'idle', message: 'Ready to validate' });
                if (t.name === 'sql_read_query') {
                  setInputs({ query: 'SELECT * FROM orders WHERE status = "pending"', max_rows: 25 });
                } else {
                  setInputs({ recipient_account: 'ACC-8831-902', amount: 250, currency: 'USD', memo: 'Invoice 104 payment' });
                }
              }}
              className={`px-3 py-1.5 text-xs font-mono font-medium rounded-lg transition-all ${
                selectedToolIdx === idx
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {t.name}()
            </button>
          ))}
        </div>
      </div>

      {/* Grid: Schema Definition & Live Test Call */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: JSON Schema */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <FileCode className="w-4 h-4 text-sky-500" />
              Tool JSON Schema Specification
            </span>
            {tool.isDestructive ? (
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-200 dark:border-rose-800">
                Consequential / Mutation
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                Idempotent / Read-Only
              </span>
            )}
          </div>

          <div className="bg-slate-950 text-slate-200 p-4 rounded-xl font-mono text-xs overflow-x-auto max-h-[340px]">
            <pre className="text-emerald-400">
              {JSON.stringify(
                {
                  type: 'function',
                  function: {
                    name: tool.name,
                    description: tool.description,
                    parameters: {
                      type: 'object',
                      properties: tool.parameters.reduce((acc, p) => {
                        acc[p.name] = {
                          type: p.type,
                          description: p.description,
                          ...(p.allowedValues ? { enum: p.allowedValues } : {}),
                          ...(p.min !== undefined ? { minimum: p.min } : {}),
                          ...(p.max !== undefined ? { maximum: p.max } : {}),
                        };
                        return acc;
                      }, {} as Record<string, any>),
                      required: tool.parameters.filter((p) => p.required).map((p) => p.name),
                    },
                  },
                },
                null,
                2
              )}
            </pre>
          </div>
        </div>

        {/* Right: Simulated Model Argument Generation & Tester */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Simulated Tool Call Arguments (From LLM)
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={injectValidData}
                className="px-2 py-1 rounded text-[11px] font-medium bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 transition-all"
              >
                Preset: Valid Call
              </button>
              <button
                onClick={injectInvalidData}
                className="px-2 py-1 rounded text-[11px] font-medium bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 hover:bg-rose-200 transition-all"
              >
                Preset: Malformed Call
              </button>
            </div>
          </div>

          <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-3 bg-slate-50/50 dark:bg-slate-900/40">
            {tool.parameters.map((p) => (
              <div key={p.name} className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-mono font-medium text-slate-800 dark:text-slate-200">
                    {p.name} {p.required && <span className="text-rose-500 font-bold">*</span>}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    {p.type} {p.min !== undefined ? `[min: ${p.min}, max: ${p.max}]` : ''}
                  </span>
                </div>
                <input
                  type="text"
                  value={inputs[p.name] !== undefined ? inputs[p.name] : ''}
                  onChange={(e) => handleInputChange(p.name, e.target.value)}
                  className="w-full text-xs font-mono px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>
            ))}

            <button
              onClick={handleValidateAndRun}
              className="w-full py-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs rounded-lg transition-all flex items-center justify-center gap-1.5 mt-2"
            >
              <Play className="w-3.5 h-3.5" />
              Validate &amp; Execute Tool Call
            </button>
          </div>
        </div>
      </div>

      {/* Execution Feedback / Error Box */}
      <div
        className={`p-4 rounded-xl border text-xs transition-all ${
          executionResult.status === 'success'
            ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800'
            : executionResult.status === 'error'
            ? 'bg-rose-50 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800'
            : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700'
        }`}
      >
        <div className="flex items-center gap-2 font-bold mb-1">
          {executionResult.status === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
          {executionResult.status === 'error' && <XCircle className="w-4 h-4 text-rose-600" />}
          {executionResult.status === 'idle' && <Shield className="w-4 h-4 text-slate-500" />}
          <span
            className={
              executionResult.status === 'success'
                ? 'text-emerald-800 dark:text-emerald-300'
                : executionResult.status === 'error'
                ? 'text-rose-800 dark:text-rose-300'
                : 'text-slate-700 dark:text-slate-300'
            }
          >
            {executionResult.message}
          </span>
        </div>

        {validationErrors.length > 0 && (
          <div className="mt-2 space-y-1">
            <span className="font-semibold text-rose-700 dark:text-rose-300">Schema Violations Caught:</span>
            <ul className="list-disc list-inside space-y-0.5 text-rose-600 dark:text-rose-400 font-mono text-[11px]">
              {validationErrors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
            <p className="pt-2 text-[11px] text-slate-600 dark:text-slate-400 italic">
              Runtime action: The agent framework suppresses real tool invocation and returns this error payload back to the LLM so it can correct its call in the subsequent step.
            </p>
          </div>
        )}

        {executionResult.payload && (
          <div className="mt-2 bg-slate-900 text-slate-200 p-3 rounded-lg font-mono text-[11px] overflow-x-auto">
            <pre>{JSON.stringify(executionResult.payload, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

