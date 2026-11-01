'use client';

import React, { useState } from 'react';
import { ShieldAlert, CheckCircle2, XCircle, AlertTriangle, Lock, UserCheck, History, Clock } from 'lucide-react';

interface QueuedAction {
  id: string;
  tool: string;
  category: 'read' | 'update' | 'financial' | 'destructive';
  riskScore: number; // 0 to 1
  requiresHumanApproval: boolean;
  params: Record<string, any>;
  status: 'pending' | 'approved' | 'rejected' | 'auto_executed';
  reason: string;
}

const SAMPLE_ACTIONS: QueuedAction[] = [
  {
    id: 'act-01',
    tool: 'fetch_user_profile',
    category: 'read',
    riskScore: 0.1,
    requiresHumanApproval: false,
    params: { userId: 'usr_8812' },
    status: 'auto_executed',
    reason: 'Read-only operation with strict RLS scoping. Zero external mutation risk.',
  },
  {
    id: 'act-02',
    tool: 'update_notification_preference',
    category: 'update',
    riskScore: 0.35,
    requiresHumanApproval: false,
    params: { userId: 'usr_8812', emailAlerts: true },
    status: 'auto_executed',
    reason: 'Low consequence user configuration change. Fully reversible.',
  },
  {
    id: 'act-03',
    tool: 'wire_payment_transfer',
    category: 'financial',
    riskScore: 0.92,
    requiresHumanApproval: true,
    params: { amount: 8400.0, currency: 'USD', beneficiary: 'Acme Logistics Ltd' },
    status: 'pending',
    reason: 'High financial consequence: Irreversible bank wire transfer exceeding $5,000 threshold.',
  },
  {
    id: 'act-04',
    tool: 'purge_customer_records',
    category: 'destructive',
    riskScore: 0.98,
    requiresHumanApproval: true,
    params: { table: 'inactive_leads', olderThanDays: 365 },
    status: 'pending',
    reason: 'Destructive deletion: Permanent removal of customer records without soft-delete flag.',
  },
];

export const AgentHITLApprovalExplorer: React.FC = () => {
  const [actions, setActions] = useState<QueuedAction[]>(SAMPLE_ACTIONS);
  const [auditLogs, setAuditLogs] = useState<string[]>([
    '[System] HITL Guardrails Engine initialized with $5,000 threshold.',
    '[Action: act-01] Auto-executed read query without human gating.',
    '[Action: act-02] Auto-executed configuration update without human gating.',
  ]);

  const handleApprove = (id: string) => {
    setActions((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'approved' } : a))
    );
    setAuditLogs((prev) => [
      ...prev,
      `[HUMAN APPROVED] Action ${id} was signed and executed by Operator at ${new Date().toLocaleTimeString()}.`,
    ]);
  };

  const handleReject = (id: string) => {
    setActions((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'rejected' } : a))
    );
    setAuditLogs((prev) => [
      ...prev,
      `[HUMAN REJECTED] Action ${id} was BLOCKED by Operator at ${new Date().toLocaleTimeString()}. Agent received AbortSignal.`,
    ]);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <UserCheck className="w-3.5 h-3.5" />
            Human-in-the-Loop (HITL) Checkpoints
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">
            Consequential Action Gating &amp; Approval Boundaries
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Differentiate safe autonomous operations from irreversible side effects requiring signed human consent.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-800 font-semibold flex items-center gap-1">
            <Lock className="w-3.5 h-3.5" />
            Threshold: Risk Score &gt; 0.70
          </span>
        </div>
      </div>

      {/* Action Pipeline Table */}
      <div className="space-y-3">
        {actions.map((act) => (
          <div
            key={act.id}
            className={`p-4 rounded-xl border transition-all ${
              act.status === 'pending'
                ? 'border-amber-300 dark:border-amber-700 bg-amber-50/40 dark:bg-amber-950/20'
                : act.status === 'approved'
                ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/20 dark:bg-emerald-950/10'
                : act.status === 'rejected'
                ? 'border-rose-300 dark:border-rose-800 bg-rose-50/20 dark:bg-rose-950/10'
                : 'border-slate-200 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-850/30'
            }`}
          >
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-900 dark:text-slate-100">
                    {act.tool}()
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      act.category === 'destructive' || act.category === 'financial'
                        ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {act.category}
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono">
                    Risk: {(act.riskScore * 100).toFixed(0)}%
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">{act.reason}</p>
                <div className="bg-slate-900 p-2 rounded text-[11px] font-mono text-slate-300 max-w-xl overflow-x-auto">
                  {JSON.stringify(act.params)}
                </div>
              </div>

              {/* Status and Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                {act.status === 'pending' ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleApprove(act.id)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-all flex items-center gap-1 shadow-xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Approve Action
                    </button>
                    <button
                      onClick={() => handleReject(act.id)}
                      className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs transition-all flex items-center gap-1 shadow-xs"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      Reject &amp; Abort
                    </button>
                  </div>
                ) : (
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold ${
                      act.status === 'approved' || act.status === 'auto_executed'
                        ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                        : 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300'
                    }`}
                  >
                    {act.status === 'approved' && <CheckCircle2 className="w-3.5 h-3.5" />}
                    {act.status === 'rejected' && <XCircle className="w-3.5 h-3.5" />}
                    {act.status === 'auto_executed' && <CheckCircle2 className="w-3.5 h-3.5 text-slate-500" />}
                    {act.status.toUpperCase()}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Audit Trail Log */}
      <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 bg-slate-950 text-slate-300 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 border-b border-slate-800 pb-2">
          <History className="w-3.5 h-3.5" />
          <span>Immutable HITL Audit Log (SOC2 / ISO 27001 Compliance)</span>
        </div>
        <div className="font-mono text-[11px] space-y-1 max-h-32 overflow-y-auto">
          {auditLogs.map((log, i) => (
            <div key={i} className="text-slate-400">
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

