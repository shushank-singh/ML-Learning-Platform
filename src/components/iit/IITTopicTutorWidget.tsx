'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, X, Send, RefreshCw, AlertTriangle, LogIn, Lightbulb } from 'lucide-react';
import { TutorTrack } from '@/lib/tutor/constants';
import { ChatMessageRenderer } from '@/components/tutor/ChatMessageRenderer';
import { useAuth } from '@/context/AuthContext';
import { IITSubjectId } from '@/types/iit';

interface IITTopicTutorWidgetProps {
  chapterId: string;
  chapterTitle: string;
  subject: IITSubjectId;
  lessonTitle?: string;
}

interface Msg {
  id: string;
  role: 'user' | 'model';
  content: string;
  isError?: boolean;
}

function mapSubjectToTrack(subject: IITSubjectId): TutorTrack {
  if (subject === 'physics') return 'iit-physics';
  if (subject === 'chemistry') return 'iit-chemistry';
  return 'iit-maths';
}

export const IITTopicTutorWidget: React.FC<IITTopicTutorWidgetProps> = ({
  chapterId,
  chapterTitle,
  subject,
  lessonTitle,
}) => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | undefined>(undefined);
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: 'welcome',
      role: 'model',
      content: `Hi! I'm your **IIT JEE AI Tutor** for **${chapterTitle}**. Ask me to derive a formula, clarify a JEE Advanced trap, or guide you step-by-step on a tough problem!`,
    },
  ]);

  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open, loading]);

  const send = async (custom?: string) => {
    const text = (custom || input).trim();
    if (!text || loading) return;

    setMessages((prev) => [...prev, { id: `u-${Date.now()}`, role: 'user', content: text }]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          track: mapSubjectToTrack(subject),
          moduleId: chapterId,
          lessonTitle: lessonTitle ? `${chapterTitle} — ${lessonTitle}` : chapterTitle,
          history: messages
            .filter((m) => m.id !== 'welcome' && !m.isError)
            .slice(-6)
            .map((m) => ({ role: m.role, content: m.content })),
          conversationId,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        const msg =
          res.status === 401
            ? 'Please sign in to chat with the IIT JEE AI Tutor.'
            : data.error || 'Could not reach IIT AI Tutor.';
        setMessages((prev) => [
          ...prev,
          { id: `e-${Date.now()}`, role: 'model', content: msg, isError: true },
        ]);
      } else {
        if (data.conversationId) setConversationId(data.conversationId);
        setMessages((prev) => [
          ...prev,
          { id: `m-${Date.now()}`, role: 'model', content: data.reply },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `e-${Date.now()}`,
          role: 'model',
          content: 'Network error reaching the IIT AI Tutor.',
          isError: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-xs font-bold shadow-xl border border-amber-400/40"
      >
        <Sparkles className="w-4 h-4 text-amber-200" />
        <span>{open ? 'Close IIT Tutor' : 'Ask IIT AI Tutor'}</span>
      </button>

      {open && (
        <div
          className="fixed inset-y-0 right-0 z-50 w-full sm:w-[440px] bg-white dark:bg-slate-950 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col"
          role="dialog"
          aria-label="IIT JEE Chapter AI Tutor"
        >
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 font-bold text-sm text-slate-900 dark:text-white">
                <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="truncate">IIT JEE AI Tutor</span>
              </div>
              <p className="text-[11px] text-slate-500 truncate">{chapterTitle}</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="px-3 py-2 border-b border-slate-200 dark:border-slate-800 flex gap-1.5 overflow-x-auto bg-slate-50/70 dark:bg-slate-950">
            {[
              { label: 'Core Derivation', prompt: `Explain the most important derivation in ${chapterTitle} step by step with LaTeX.` },
              { label: 'JEE Traps', prompt: `What are the top negative-marking traps in ${chapterTitle} for JEE Main & Advanced?` },
              { label: 'Practice Problem', prompt: `Give me one JEE Advanced level problem from ${chapterTitle} without revealing the answer yet.` },
            ].map((chip) => (
              <button
                key={chip.label}
                type="button"
                disabled={loading}
                onClick={() => void send(chip.prompt)}
                className="whitespace-nowrap inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] font-semibold text-slate-700 dark:text-slate-300 hover:border-amber-400"
              >
                <Lightbulb className="w-3 h-3 text-amber-500" />
                <span>{chip.label}</span>
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {!user && (
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex items-center justify-between gap-2 text-xs">
                <span className="text-amber-800 dark:text-amber-200">Sign in to use the IIT AI Tutor.</span>
                <Link
                  href={`/login?redirectTo=/iit/chapters/${chapterId}`}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-600 text-white font-bold shrink-0"
                >
                  <LogIn className="w-3 h-3" /> Sign In
                </Link>
              </div>
            )}

            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[90%] rounded-2xl p-3 text-xs sm:text-sm ${
                    m.role === 'user'
                      ? 'bg-amber-600 text-white rounded-br-none'
                      : m.isError
                      ? 'bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200'
                      : 'bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-bl-none'
                  }`}
                >
                  {m.isError && <AlertTriangle className="w-3.5 h-3.5 inline mr-1" />}
                  {m.role === 'user' ? (
                    <span className="whitespace-pre-wrap">{m.content}</span>
                  ) : (
                    <ChatMessageRenderer content={m.content} tone="adaptive" />
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-slate-500 p-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-500" />
                <span>Solving from first principles...</span>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex items-end gap-2">
            <textarea
              rows={2}
              value={input}
              onChange={(e) => setInput(e.target.value.slice(0, 2000))}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  void send();
                }
              }}
              placeholder={`Ask any doubt in ${chapterTitle}...`}
              className="flex-1 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-2.5 text-xs focus:outline-none focus:border-amber-500 resize-none"
            />
            <button
              type="button"
              disabled={!input.trim() || loading}
              onClick={() => void send()}
              className="p-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-40 text-white"
              aria-label="Send IIT doubt"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
