'use client';

import React, { useState } from 'react';
import {
  ListTree,
  Clock,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Plus,
  Play,
  Server,
  Zap,
  RotateCcw,
  Check,
} from 'lucide-react';

interface JobItem {
  id: string;
  name: string;
  type: 'whisper-transcribe' | 'stable-diffusion' | 'batch-embed';
  status: 'QUEUED' | 'PROCESSING' | 'SUCCESS' | 'RETRYING' | 'FAILED';
  progress: number;
  workerId?: string;
  retries: number;
  durationSec: number;
}

export const AsyncJobQueueExplorer: React.FC = () => {
  const [workersCount, setWorkersCount] = useState<number>(2);
  const [deliveryMode, setDeliveryMode] = useState<'polling' | 'webhook'>('polling');
  const [injectFailure, setInjectFailure] = useState<boolean>(false);

  const [jobs, setJobs] = useState<JobItem[]>([
    {
      id: 'job_48a1',
      name: 'Whisper-Large (45 min Audio Podcast)',
      type: 'whisper-transcribe',
      status: 'PROCESSING',
      progress: 68,
      workerId: 'worker-gpu-1',
      retries: 0,
      durationSec: 4.8,
    },
    {
      id: 'job_92c3',
      name: 'SDXL 1024x1024 (50 Denoising Steps)',
      type: 'stable-diffusion',
      status: 'QUEUED',
      progress: 0,
      retries: 0,
      durationSec: 0,
    },
    {
      id: 'job_11b7',
      name: 'Document Corpus Embedding (50k Chunks)',
      type: 'batch-embed',
      status: 'SUCCESS',
      progress: 100,
      workerId: 'worker-cpu-2',
      retries: 0,
      durationSec: 12.4,
    },
  ]);

  const addJob = (type: JobItem['type']) => {
    const id = `job_${Math.random().toString(36).substring(2, 6)}`;
    const names = {
      'whisper-transcribe': 'Whisper Audio Transcription (10m WAV)',
      'stable-diffusion': 'FLUX Image Generation (4 Steps)',
      'batch-embed': 'Batch Embeddings Vectorization (2k rows)',
    };
    const newJob: JobItem = {
      id,
      name: names[type],
      type,
      status: 'QUEUED',
      progress: 0,
      retries: 0,
      durationSec: 0,
    };
    setJobs((prev) => [newJob, ...prev]);
  };

  const simulateTick = () => {
    setJobs((prev) =>
      prev.map((job) => {
        if (job.status === 'QUEUED') {
          return {
            ...job,
            status: 'PROCESSING',
            workerId: 'worker-gpu-1',
            progress: 15,
          };
        }
        if (job.status === 'PROCESSING') {
          if (injectFailure && job.retries === 0) {
            return {
              ...job,
              status: 'RETRYING',
              retries: 1,
              progress: 20,
            };
          }
          if (job.progress >= 90) {
            return {
              ...job,
              status: 'SUCCESS',
              progress: 100,
            };
          }
          return {
            ...job,
            progress: job.progress + 35,
          };
        }
        if (job.status === 'RETRYING') {
          return {
            ...job,
            status: 'PROCESSING',
            progress: 40,
          };
        }
        return job;
      })
    );
  };

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 text-slate-100 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-teal-500/20 text-teal-400 border border-teal-500/30">
              MODULE 10 VISUALIZER
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <ListTree className="w-5 h-5 text-teal-400" />
              Asynchronous Background Job Queue &amp; Worker Explorer
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Explore 202 Accepted polling patterns, Celery/Redis FIFO queues, idempotent task retries, and webhook callbacks.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={simulateTick}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-teal-600 hover:bg-teal-500 text-white flex items-center gap-1.5 transition-all shadow-md shadow-teal-600/20"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Step Worker Loop</span>
          </button>
        </div>
      </div>

      {/* Control Configuration */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
        <div>
          <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
            Enqueue New Long-Running Task
          </label>
          <div className="grid grid-cols-1 gap-1.5">
            <button
              onClick={() => addJob('whisper-transcribe')}
              className="p-2 rounded-lg text-left text-xs bg-slate-900 border border-slate-800 hover:border-teal-500 text-slate-300 transition-all flex items-center justify-between"
            >
              <span>+ Audio Transcription (Whisper)</span>
              <span className="text-[10px] text-teal-400 font-mono">~35s</span>
            </button>
            <button
              onClick={() => addJob('stable-diffusion')}
              className="p-2 rounded-lg text-left text-xs bg-slate-900 border border-slate-800 hover:border-teal-500 text-slate-300 transition-all flex items-center justify-between"
            >
              <span>+ Image Generation (SDXL)</span>
              <span className="text-[10px] text-teal-400 font-mono">~18s</span>
            </button>
            <button
              onClick={() => addJob('batch-embed')}
              className="p-2 rounded-lg text-left text-xs bg-slate-900 border border-slate-800 hover:border-teal-500 text-slate-300 transition-all flex items-center justify-between"
            >
              <span>+ Large Batch Embedding</span>
              <span className="text-[10px] text-teal-400 font-mono">~45s</span>
            </button>
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
            Result Delivery Pattern
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setDeliveryMode('polling')}
              className={`p-2 rounded-lg text-left text-xs border transition-all ${
                deliveryMode === 'polling'
                  ? 'bg-teal-950/60 border-teal-500 text-teal-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              <div className="font-semibold">Client Polling</div>
              <div className="text-[10px] text-slate-500">GET /jobs/id every 2s</div>
            </button>
            <button
              onClick={() => setDeliveryMode('webhook')}
              className={`p-2 rounded-lg text-left text-xs border transition-all ${
                deliveryMode === 'webhook'
                  ? 'bg-teal-950/60 border-teal-500 text-teal-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              <div className="font-semibold">Webhook Callback</div>
              <div className="text-[10px] text-slate-500">POST to callback_url</div>
            </button>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-850 flex items-center justify-between">
            <span className="text-xs text-slate-300">Failure Injection</span>
            <button
              onClick={() => setInjectFailure(!injectFailure)}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${
                injectFailure
                  ? 'bg-rose-950 border-rose-500 text-rose-300'
                  : 'bg-slate-800 border-slate-700 text-slate-400'
              }`}
            >
              {injectFailure ? 'CUDA OOM Sim Active' : 'Normal Operations'}
            </button>
          </div>
        </div>

        {/* Protocol Spec Box */}
        <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 text-xs font-mono space-y-1.5">
          <div className="text-[10px] text-slate-500 font-semibold flex items-center justify-between">
            <span>CLIENT / API CONTRACT</span>
            <span className="text-teal-400">HTTP 202 ACCEPTED</span>
          </div>
          <div className="p-2 rounded bg-slate-950 border border-slate-800 text-[11px] text-slate-300">
            <code>POST /v1/infer/async</code>
            <div className="text-teal-300 mt-1">
              {`{ "status": "QUEUED", "job_id": "job_48a1", "poll_url": "/v1/jobs/job_48a1" }`}
            </div>
          </div>
          <div className="text-[10px] text-slate-400">
            Non-blocking contract: API returns in 12ms; inference runs in dedicated background worker pool.
          </div>
        </div>
      </div>

      {/* Live Job Queue Items */}
      <div className="space-y-2">
        <div className="text-xs font-semibold text-slate-400 flex items-center justify-between">
          <span>TASK QUEUE BACKLOG &amp; WORKER ASSIGNMENT</span>
          <span className="text-[10px] font-mono text-slate-500">FIFO REDIS BROKER</span>
        </div>

        <div className="space-y-2">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="min-w-0 flex items-center gap-2.5">
                <span className="text-[11px] font-mono font-bold text-teal-400 bg-teal-950/60 px-2 py-0.5 rounded border border-teal-800 shrink-0">
                  {job.id}
                </span>
                <div className="truncate">
                  <div className="font-semibold text-white truncate">{job.name}</div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    Worker: {job.workerId || 'Pending queue slot...'}
                    {job.retries > 0 && <span className="text-amber-400 ml-2 font-bold">(Retrying attempt #{job.retries})</span>}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                <div className="w-24 sm:w-32 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      job.status === 'SUCCESS' ? 'bg-emerald-400' : job.status === 'RETRYING' ? 'bg-amber-400' : 'bg-teal-400'
                    }`}
                    style={{ width: `${job.progress}%` }}
                  />
                </div>

                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                    job.status === 'SUCCESS'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      : job.status === 'PROCESSING'
                      ? 'bg-teal-950 text-teal-300 border border-teal-800 animate-pulse'
                      : job.status === 'RETRYING'
                      ? 'bg-amber-950 text-amber-300 border border-amber-800'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {job.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

