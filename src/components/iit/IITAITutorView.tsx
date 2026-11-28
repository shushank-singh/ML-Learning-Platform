'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Send,
  Trash2,
  PlusCircle,
  MessageSquare,
  AlertTriangle,
  Lightbulb,
  BookOpen,
  RefreshCw,
  Atom,
  FlaskConical,
  Sigma,
  GraduationCap,
  CheckCircle2,
  LogIn,
  ClipboardPlus,
} from 'lucide-react';
import { TutorTrack } from '@/lib/tutor/constants';
import { isIITTutorTrack } from '@/lib/tutor/promptBuilder';
import { ChatMessageRenderer } from '@/components/tutor/ChatMessageRenderer';
import { useAuth } from '@/context/AuthContext';

interface ConversationItem {
  id: string;
  title: string;
  track: TutorTrack;
  created_at: string;
  updated_at: string;
}

interface MessageItem {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
  isError?: boolean;
}

const IIT_TRACKS: { id: TutorTrack; name: string; sub: string; icon: any; color: string }[] = [
  {
    id: 'iit',
    name: 'All IIT JEE (PCM)',
    sub: 'Cross-subject doubts, Main & Advanced strategy',
    icon: GraduationCap,
    color: 'text-amber-600 dark:text-amber-400',
  },
  {
    id: 'iit-physics',
    name: 'Physics (Class 11–12)',
    sub: 'Mechanics, Thermo, Electrodynamics, Optics, Modern',
    icon: Atom,
    color: 'text-sky-600 dark:text-sky-400',
  },
  {
    id: 'iit-chemistry',
    name: 'Chemistry (Phys · Org · Inorg)',
    sub: 'Equilibria, Mechanisms, CFT, NCERT Trends',
    icon: FlaskConical,
    color: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    id: 'iit-maths',
    name: 'Mathematics (Class 11–12)',
    sub: 'Calculus, Algebra, Coordinate, Vectors & 3D',
    icon: Sigma,
    color: 'text-violet-600 dark:text-violet-400',
  },
];

export const IITAITutorView: React.FC = () => {
  const { user, isLoading: authLoading } = useAuth();
  const [conversations, setConversations] = useState<ConversationItem[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<TutorTrack>('iit');
  const [messages, setMessages] = useState<MessageItem[]>([
    {
      id: 'welcome',
      role: 'model',
      content:
        'Welcome to your **IIT JEE AI Mentor**!\n\nAsk any concept doubt, derivation, reaction mechanism, or multi-concept problem across **Physics**, **Chemistry**, and **Mathematics** (Class 11 & 12).\n\nAll equations render in crisp LaTeX (`$...$` / `$$...$$`). Paste a tricky PYQ or ask for a Socratic hint!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [problemContext, setProblemContext] = useState('');
  const [showProblemBox, setShowProblemBox] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);
  const [lastFailedMessage, setLastFailedMessage] = useState<string | null>(null);
  const [fetchingConversations, setFetchingConversations] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (user) {
      void fetchConversations();
    } else {
      setConversations([]);
    }
  }, [user]);

  const fetchConversations = async () => {
    setFetchingConversations(true);
    try {
      const res = await fetch('/api/ai-tutor/conversations');
      const data = await res.json();
      if (res.ok && data.success && Array.isArray(data.conversations)) {
        setConversations(
          data.conversations.filter((c: ConversationItem) => isIITTutorTrack(c.track))
        );
      }
    } catch {
      // Non-fatal
    } finally {
      setFetchingConversations(false);
    }
  };

  const handleSelectConversation = async (convId: string) => {
    setActiveConversationId(convId);
    setErrorNotice(null);
    setIsLoading(true);
    try {
      const res = await fetch(`/api/ai-tutor/conversations/${convId}`);
      const data = await res.json();
      if (res.ok && data.success) {
        if (data.conversation?.track) {
          setSelectedTrack(data.conversation.track as TutorTrack);
        }
        if (Array.isArray(data.messages) && data.messages.length > 0) {
          setMessages(
            data.messages.map((m: any) => ({
              id: m.id,
              role: m.role,
              content: m.content,
              timestamp: new Date(m.created_at).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              }),
            }))
          );
        }
      }
    } catch (err) {
      console.error('Failed to load IIT conversation:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteConversation = async (convId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Delete this IIT JEE doubt session?')) return;
    try {
      const res = await fetch(`/api/ai-tutor/conversations/${convId}`, { method: 'DELETE' });
      if (res.ok) {
        setConversations((prev) => prev.filter((c) => c.id !== convId));
        if (activeConversationId === convId) handleNewSession();
      }
    } catch {}
  };

  const handleNewSession = () => {
    setActiveConversationId(null);
    setErrorNotice(null);
    setLastFailedMessage(null);
    setProblemContext('');
    setShowProblemBox(false);
    setMessages([
      {
        id: 'welcome',
        role: 'model',
        content: `New **IIT JEE AI Tutor** session started (**${selectedTrack.toUpperCase()}**). What concept or problem are we tackling?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const handleSendMessage = async (customPrompt?: string) => {
    const textToSend = (customPrompt || input).trim();
    if (!textToSend || isLoading) return;

    setErrorNotice(null);
    setLastFailedMessage(null);

    const userMsg: MessageItem = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const historyTurns = messages
        .filter((m) => m.id !== 'welcome' && !m.isError)
        .slice(-6)
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch('/api/ai-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          track: selectedTrack,
          codeSnippet: showProblemBox && problemContext ? problemContext : undefined,
          history: historyTurns,
          conversationId: activeConversationId || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        const errorMsg =
          res.status === 401
            ? 'Please sign in with your free account to ask the IIT JEE AI Tutor.'
            : data.error || 'Failed to reach IIT JEE AI Tutor.';
        setErrorNotice(errorMsg);
        setLastFailedMessage(textToSend);
        setMessages((prev) => [
          ...prev,
          {
            id: `err-${Date.now()}`,
            role: 'model',
            content: `⚠️ **${errorMsg}**`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isError: true,
          },
        ]);
        return;
      }

      if (data.conversationId && !activeConversationId) {
        setActiveConversationId(data.conversationId);
        void fetchConversations();
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `model-${Date.now()}`,
          role: 'model',
          content: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch {
      const networkError = 'Network error: could not connect to the IIT AI Tutor API.';
      setErrorNotice(networkError);
      setLastFailedMessage(textToSend);
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'model',
          content: `⚠️ **${networkError}**`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-white via-amber-50/40 to-orange-50/40 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/70 border border-amber-200 dark:border-amber-800 text-xs font-semibold text-amber-700 dark:text-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>IIT JEE AI Doubt Mentor · Google Gemini Free Tier</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Physics, Chemistry &amp; Maths AI Tutor
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
            Get step-by-step derivations, Socratic hints on JEE Advanced problems, reaction mechanisms, and negative-marking trap checks with full LaTeX rendering.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {!authLoading && !user && (
            <Link
              href="/login?redirectTo=/iit/ai-tutor"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In to Chat</span>
            </Link>
          )}
          <button
            onClick={handleNewSession}
            type="button"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Session</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-4 space-y-5">
          <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 space-y-3 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Select JEE Subject Focus
            </h3>
            <div className="space-y-2">
              {IIT_TRACKS.map((track) => {
                const Icon = track.icon;
                const isSelected = selectedTrack === track.id;
                return (
                  <button
                    key={track.id}
                    type="button"
                    onClick={() => setSelectedTrack(track.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border text-left text-xs transition-all ${
                      isSelected
                        ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-500 text-slate-900 dark:text-white'
                        : 'bg-slate-50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <div className="flex items-start gap-2.5 min-w-0">
                      <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${track.color}`} />
                      <div className="min-w-0">
                        <div className="font-bold truncate">{track.name}</div>
                        <div className="text-[10px] opacity-80 truncate">{track.sub}</div>
                      </div>
                    </div>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Saved JEE Doubt Sessions
              </h3>
              <span className="text-[10px] text-slate-500 font-mono">{conversations.length} saved</span>
            </div>

            {!user ? (
              <div className="py-6 text-center text-xs text-slate-500 space-y-2">
                <MessageSquare className="w-6 h-6 mx-auto text-slate-400" />
                <p>Sign in to save your IIT JEE doubt history.</p>
              </div>
            ) : fetchingConversations ? (
              <div className="py-6 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-500" />
                <span>Loading history...</span>
              </div>
            ) : conversations.length === 0 ? (
              <div className="py-6 text-center text-xs text-slate-500">No saved JEE sessions yet.</div>
            ) : (
              <div className="space-y-1.5 max-h-[300px] overflow-y-auto pr-1">
                {conversations.map((conv) => (
                  <div
                    key={conv.id}
                    onClick={() => void handleSelectConversation(conv.id)}
                    className={`group flex items-center justify-between p-2.5 rounded-xl border text-xs cursor-pointer ${
                      activeConversationId === conv.id
                        ? 'bg-amber-50 dark:bg-amber-900/40 border-amber-500'
                        : 'bg-slate-50 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    <div className="min-w-0 pr-2">
                      <p className="font-semibold truncate text-[11px]">{conv.title}</p>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {new Date(conv.updated_at).toLocaleDateString()}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => void handleDeleteConversation(conv.id, e)}
                      className="opacity-0 group-hover:opacity-100 p-1 rounded text-slate-400 hover:text-rose-500"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-[700px] overflow-hidden">
          <div className="p-4 bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 flex items-center justify-center text-amber-600 dark:text-amber-400">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  {activeConversationId ? 'Resumed Doubt Session' : 'Interactive JEE Tutoring'}
                </h3>
                <span className="text-[11px] text-slate-500 uppercase font-mono">{selectedTrack}</span>
              </div>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30">
              LaTeX Enabled
            </span>
          </div>

          <div className="px-4 py-2.5 bg-slate-50/70 dark:bg-slate-950/50 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2 overflow-x-auto shrink-0">
            {[
              { label: 'Derive First Principles', prompt: 'Derive the core formula from first principles and show limiting checks.' },
              { label: 'JEE Main vs Adv Depth', prompt: 'Explain the key conceptual difference between JEE Main and JEE Advanced questions on this topic.' },
              { label: 'Spot Common Traps', prompt: 'List the top 3 negative-marking traps and sign errors students make here.' },
              { label: 'Quiz Me (PYQ Style)', prompt: 'Ask me a JEE Advanced style problem without revealing the solution yet so I can attempt it.' },
            ].map((chip) => (
              <button
                key={chip.label}
                type="button"
                disabled={isLoading}
                onClick={() => void handleSendMessage(chip.prompt)}
                className="whitespace-nowrap flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-amber-400"
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                <span>{chip.label}</span>
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div
                  className={`max-w-[85%] rounded-2xl p-4 text-sm shadow-xs ${
                    msg.role === 'user'
                      ? 'bg-amber-600 text-white rounded-br-none'
                      : msg.isError
                      ? 'bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200'
                      : 'bg-slate-100 dark:bg-slate-800/90 text-slate-900 dark:text-slate-200 border border-slate-200 dark:border-slate-700/60 rounded-bl-none'
                  }`}
                >
                  {msg.role === 'user' ? (
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                  ) : (
                    <ChatMessageRenderer content={msg.content} tone="adaptive" />
                  )}
                  <div className={`mt-2 text-[10px] ${msg.role === 'user' ? 'text-amber-100 text-right' : 'text-slate-500'}`}>
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-slate-500 p-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-500" />
                <span>Working through equations &amp; concepts...</span>
              </div>
            )}

            {errorNotice && lastFailedMessage && !isLoading && (
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs flex items-center justify-between gap-2">
                <span className="flex items-center gap-1.5 text-amber-800 dark:text-amber-200">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  {errorNotice}
                </span>
                <button
                  type="button"
                  onClick={() => void handleSendMessage(lastFailedMessage)}
                  className="px-2.5 py-1 rounded-lg bg-amber-600 text-white font-bold shrink-0"
                >
                  Retry
                </button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {showProblemBox && (
            <div className="px-4 py-2 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>Paste JEE problem statement or your partial attempt:</span>
                <button type="button" onClick={() => setShowProblemBox(false)} className="hover:underline">
                  Hide
                </button>
              </div>
              <textarea
                rows={3}
                value={problemContext}
                onChange={(e) => setProblemContext(e.target.value.slice(0, 4000))}
                placeholder="e.g., A solid sphere rolls without slipping on an incline of 30 deg..."
                className="w-full rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2 text-xs resize-none focus:outline-none focus:border-amber-500"
              />
            </div>
          )}

          <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-[11px] text-slate-500">
              <button
                type="button"
                onClick={() => setShowProblemBox((p) => !p)}
                className="inline-flex items-center gap-1 text-amber-700 dark:text-amber-400 font-semibold hover:underline"
              >
                <ClipboardPlus className="w-3.5 h-3.5" />
                <span>{showProblemBox ? 'Hide Problem Box' : 'Attach Problem / Attempt'}</span>
              </button>
              <span className="font-mono">{input.length}/2000</span>
            </div>

            <div className="flex items-end gap-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-2.5 focus-within:border-amber-500">
              <textarea
                rows={2}
                value={input}
                onChange={(e) => setInput(e.target.value.slice(0, 2000))}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    void handleSendMessage();
                  }
                }}
                placeholder="Ask your Physics, Chemistry, or Mathematics doubt..."
                disabled={isLoading}
                className="flex-1 bg-transparent border-0 resize-none text-xs sm:text-sm focus:outline-none leading-relaxed"
              />
              <button
                type="button"
                disabled={!input.trim() || isLoading}
                onClick={() => void handleSendMessage()}
                aria-label="Send IIT JEE question"
                className="p-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-40 text-white shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
