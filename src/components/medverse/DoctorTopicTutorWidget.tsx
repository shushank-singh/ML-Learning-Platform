'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Send,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  ArrowUpRight,
  Stethoscope,
} from 'lucide-react';
import { MBBSTopicSummary } from '@/types/medverse';
import { TutorTrack } from '@/lib/tutor/constants';
import { ChatMessageRenderer } from '@/components/tutor/ChatMessageRenderer';
import { useAuth } from '@/context/AuthContext';

interface DoctorTopicTutorWidgetProps {
  topic: MBBSTopicSummary;
}

interface MiniMsg {
  id: string;
  role: 'user' | 'model';
  content: string;
}

function mapPhaseToTutorTrack(phaseId: MBBSTopicSummary['phaseId']): TutorTrack {
  if (phaseId === 'phase-1-preclinical') return 'mbbs-preclinical';
  if (phaseId === 'phase-2-paraclinical') return 'mbbs-paraclinical';
  return 'mbbs-clinical';
}

export const DoctorTopicTutorWidget: React.FC<DoctorTopicTutorWidgetProps> = ({ topic }) => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<MiniMsg[]>([]);

  const track = mapPhaseToTutorTrack(topic.phaseId);

  const askQuestion = async (q?: string) => {
    const text = (q || input).trim();
    if (!text || loading) return;

    const userMsg: MiniMsg = { id: `u-${Date.now()}`, role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    setOpen(true);

    try {
      const res = await fetch('/api/ai-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          track,
          moduleId: topic.moduleId,
          lessonId: topic.id,
          lessonTitle: topic.title,
          history: messages.slice(-4).map((m) => ({ role: m.role, content: m.content })),
          conversationId: conversationId || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        const msg =
          res.status === 401
            ? 'Please sign in first to ask the Personal Medical AI Tutor.'
            : data.error || 'Could not reach Medical AI Tutor.';
        setMessages((prev) => [...prev, { id: `e-${Date.now()}`, role: 'model', content: `⚠️ **${msg}**` }]);
      } else {
        if (data.conversationId) setConversationId(data.conversationId);
        setMessages((prev) => [...prev, { id: `m-${Date.now()}`, role: 'model', content: data.reply }]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: `e-${Date.now()}`, role: 'model', content: '⚠️ **Network error contacting AI Tutor.**' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-teal-200 dark:border-teal-800/70 bg-gradient-to-r from-teal-50/80 via-white to-cyan-50/70 dark:from-slate-900 dark:via-slate-900 dark:to-teal-950/30 p-4 space-y-3 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-2 text-left"
        >
          <span className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0">
            <Stethoscope className="w-4 h-4" />
          </span>
          <div>
            <div className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
              <span>Ask Personal Medical AI Tutor About This Topic</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-amber-300" />
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400">
              Instant MBBS doubt clarification, mnemonics &amp; viva practice on &ldquo;{topic.title}&rdquo;
            </p>
          </div>
        </button>

        <div className="flex items-center gap-2">
          <Link
            href="/doctor/ai-tutor"
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[11px] font-semibold text-teal-700 dark:text-teal-300 hover:border-teal-400"
          >
            <span>Full AI Tutor</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold"
          >
            <span>{open ? 'Hide' : 'Ask Doubt'}</span>
            {open ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="space-y-3 pt-2 border-t border-teal-200/70 dark:border-slate-800">
          <div className="flex flex-wrap gap-1.5">
            {[
              `Give me a quick 30-second viva summary + memory aid for ${topic.title}.`,
              `What are the most tested NEET-PG/MBBS clinical traps in ${topic.title}?`,
              `Ask me 1 clinical vignette question on ${topic.title} without revealing the answer yet.`,
            ].map((q, idx) => (
              <button
                key={idx}
                type="button"
                disabled={loading}
                onClick={() => void askQuestion(q)}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-teal-400 transition-colors"
              >
                {idx === 0 ? '💡 Mnemonic & Viva' : idx === 1 ? '⚠️ Common Exam Traps' : '🎯 Quiz Me'}
              </button>
            ))}
          </div>

          {messages.length > 0 && (
            <div className="max-h-72 overflow-y-auto space-y-2.5 rounded-xl bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 p-3">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`rounded-xl p-3 text-xs ${
                    m.role === 'user'
                      ? 'bg-teal-600 text-white ml-8'
                      : 'bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 mr-4'
                  }`}
                >
                  {m.role === 'user' ? m.content : <ChatMessageRenderer content={m.content} tone="adaptive" />}
                </div>
              ))}
              {loading && (
                <div className="flex items-center gap-2 text-xs text-slate-500 p-2">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-teal-600" />
                  <span>Thinking...</span>
                </div>
              )}
            </div>
          )}

          {!user && (
            <div className="text-[11px] text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-xl px-3 py-2 flex items-center justify-between gap-2">
              <span>Sign in with your free account to chat with the Medical AI Tutor.</span>
              <Link href={`/login?redirect=/doctor/topics/${topic.id}`} className="font-bold underline shrink-0">
                Sign In →
              </Link>
            </div>
          )}

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value.slice(0, 1000))}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  void askQuestion();
                }
              }}
              placeholder={`Ask any doubt about ${topic.title}...`}
              disabled={loading}
              className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-teal-500"
            />
            <button
              type="button"
              onClick={() => void askQuestion()}
              disabled={!input.trim() || loading}
              aria-label="Send topic doubt"
              className="p-2 rounded-xl bg-teal-600 hover:bg-teal-500 disabled:bg-slate-200 dark:disabled:bg-slate-800 text-white disabled:text-slate-400 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
