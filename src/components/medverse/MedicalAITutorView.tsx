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
  HelpCircle,
  BookOpen,
  ClipboardPlus,
  RefreshCw,
  Stethoscope,
  Microscope,
  HeartPulse,
  CheckCircle2,
  Info,
  LogIn,
} from 'lucide-react';
import { TutorTrack } from '@/lib/tutor/constants';
import { isMedicalTutorTrack } from '@/lib/tutor/promptBuilder';
import { ChatMessageRenderer } from '@/components/tutor/ChatMessageRenderer';
import { useAuth } from '@/context/AuthContext';

interface ConversationItem {
  id: string;
  title: string;
  track: TutorTrack;
  module_id: string | null;
  lesson_id: string | null;
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

const MEDICAL_TRACKS: { id: TutorTrack; name: string; sub: string; icon: any; color: string }[] = [
  {
    id: 'medical',
    name: 'All MBBS Doubts',
    sub: 'Cross-year concepts, NEET-PG / NEXT',
    icon: Stethoscope,
    color: 'text-teal-600 dark:text-teal-400',
  },
  {
    id: 'mbbs-preclinical',
    name: '1st Year · Pre-clinical',
    sub: 'Anatomy, Physiology, Biochemistry',
    icon: HeartPulse,
    color: 'text-rose-600 dark:text-rose-400',
  },
  {
    id: 'mbbs-paraclinical',
    name: '2nd Year · Para-clinical',
    sub: 'Pathology, Pharma, Micro, FMT, CM',
    icon: Microscope,
    color: 'text-cyan-600 dark:text-cyan-400',
  },
  {
    id: 'mbbs-clinical',
    name: '3rd & Final Year · Clinical',
    sub: 'Med, Surg, OBG, Peds, Ortho, ENT, Eye, Radio',
    icon: ClipboardPlus,
    color: 'text-violet-600 dark:text-violet-400',
  },
];

export const MedicalAITutorView: React.FC = () => {
  const { user, isLoading: authLoading } = useAuth();
  const [conversations, setConversations] = useState<ConversationItem[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<TutorTrack>('medical');
  const [messages, setMessages] = useState<MessageItem[]>([
    {
      id: 'welcome',
      role: 'model',
      content:
        `Welcome to your **Personal Medical AI Tutor** 🩺✨\n\nAsk any MBBS doubt across **1st Year Pre-clinical**, **2nd Year Para-clinical**, **3rd Year ENT/Eye/PSM/FMT**, or **Final Year Clinical Subjects**.\n\nI can break down mechanisms step-by-step, draw clear comparison tables, share memory aids 💡, or quiz you OSCE-style! *(Educational study aid only — not real clinical medical advice.)*`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [caseContext, setCaseContext] = useState('');
  const [showCaseBox, setShowCaseBox] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);
  const [isQuotaExhausted, setIsQuotaExhausted] = useState(false);
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
          data.conversations.filter((c: ConversationItem) => isMedicalTutorTrack(c.track))
        );
      }
    } catch {
      // Non-fatal preview fallback
    } finally {
      setFetchingConversations(false);
    }
  };

  const handleSelectConversation = async (convId: string) => {
    setActiveConversationId(convId);
    setErrorNotice(null);
    setIsQuotaExhausted(false);
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
      console.error('Failed to load conversation:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteConversation = async (convId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Delete this medical study session?')) return;
    try {
      const res = await fetch(`/api/ai-tutor/conversations/${convId}`, { method: 'DELETE' });
      if (res.ok) {
        setConversations((prev) => prev.filter((c) => c.id !== convId));
        if (activeConversationId === convId) {
          handleNewSession();
        }
      }
    } catch (err) {
      console.error('Failed to delete conversation:', err);
    }
  };

  const handleNewSession = () => {
    setActiveConversationId(null);
    setErrorNotice(null);
    setIsQuotaExhausted(false);
    setLastFailedMessage(null);
    setCaseContext('');
    setShowCaseBox(false);
    setMessages([
      {
        id: 'welcome',
        role: 'model',
        content: `New **Medical AI Tutor** session started (${selectedTrack.replace('mbbs-', '').toUpperCase()}). Ask any anatomy, pathophysiology, drug mechanism, or clinical case doubt! 🩺`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const handleSendMessage = async (customPrompt?: string) => {
    const textToSend = (customPrompt || input).trim();
    if (!textToSend || isLoading) return;

    setErrorNotice(null);
    setIsQuotaExhausted(false);
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
          codeSnippet: showCaseBox && caseContext ? caseContext : undefined,
          history: historyTurns,
          conversationId: activeConversationId || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        const errorMsg =
          res.status === 401
            ? 'Please sign in with your free account to ask the Personal Medical AI Tutor.'
            : data.error || 'Failed to reach Medical AI Tutor.';
        const quotaHit = res.status === 429 || errorMsg.toLowerCase().includes('quota');

        setErrorNotice(errorMsg);
        setIsQuotaExhausted(quotaHit);
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
      const networkError = 'Network error: could not connect to the Medical AI Tutor API.';
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
      {/* Header */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-white via-teal-50/40 to-cyan-50/40 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/70 border border-teal-200 dark:border-teal-800 text-xs font-semibold text-teal-700 dark:text-teal-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-amber-300" />
            <span>Personal Medical AI Tutor · Google Gemini Free Tier</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            🩺 MBBS AI Doubt &amp; Concept Tutor
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            Ask doubts across all 4 MBBS Years (1st–Final Year), compare differential diagnoses, request mnemonics, or test yourself with viva/OSCE questions.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {!authLoading && !user && (
            <Link
              href="/login?redirect=/doctor/ai-tutor"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In to Chat</span>
            </Link>
          )}
          <button
            onClick={handleNewSession}
            type="button"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-sm transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Session</span>
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Phase/Track Selector & Conversation History */}
        <div className="lg:col-span-4 space-y-5">
          <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 space-y-3 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Select MBBS Study Scope
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
              {MEDICAL_TRACKS.map((track) => {
                const Icon = track.icon;
                const isSelected = selectedTrack === track.id;
                return (
                  <button
                    key={track.id}
                    onClick={() => {
                      setSelectedTrack(track.id);
                      if (!activeConversationId) {
                        setMessages([
                          {
                            id: 'welcome',
                            role: 'model',
                            content: `Switched focus to **${track.name}** (${track.sub}). What medical topic or doubt can I clarify? 🩺`,
                            timestamp: new Date().toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            }),
                          },
                        ]);
                      }
                    }}
                    type="button"
                    className={`flex items-center justify-between p-3 rounded-xl border text-left text-xs transition-all ${
                      isSelected
                        ? 'bg-teal-50 dark:bg-teal-950/60 border-teal-500 text-slate-900 dark:text-white shadow-xs'
                        : 'bg-slate-50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-start gap-2.5 min-w-0">
                      <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${track.color}`} />
                      <div className="min-w-0">
                        <div className="font-bold truncate">{track.name}</div>
                        <div className="text-[10px] opacity-80 truncate">{track.sub}</div>
                      </div>
                    </div>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Saved Medical Doubts
              </h3>
              <span className="text-[10px] text-slate-500 font-mono">{conversations.length} saved</span>
            </div>

            {!user ? (
              <div className="py-6 text-center text-xs text-slate-500 space-y-2">
                <MessageSquare className="w-6 h-6 mx-auto text-slate-400" />
                <p>Sign in to save your MBBS doubt history across sessions.</p>
              </div>
            ) : fetchingConversations ? (
              <div className="py-8 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-teal-500" />
                <span>Loading history...</span>
              </div>
            ) : conversations.length === 0 ? (
              <div className="py-6 text-center text-xs text-slate-500 space-y-1">
                <MessageSquare className="w-6 h-6 mx-auto text-slate-400 mb-1" />
                <p>No medical conversations yet.</p>
              </div>
            ) : (
              <div className="space-y-1.5 max-h-[320px] overflow-y-auto pr-1">
                {conversations.map((conv) => {
                  const isActive = activeConversationId === conv.id;
                  return (
                    <div
                      key={conv.id}
                      onClick={() => handleSelectConversation(conv.id)}
                      className={`group flex items-center justify-between p-2.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                        isActive
                          ? 'bg-teal-50 dark:bg-teal-900/40 border-teal-500 text-teal-900 dark:text-teal-200'
                          : 'bg-slate-50 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                      }`}
                    >
                      <div className="min-w-0 pr-2">
                        <p className="font-semibold truncate text-[11px]">{conv.title}</p>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {new Date(conv.updated_at).toLocaleDateString()}
                        </span>
                      </div>
                      <button
                        onClick={(e) => handleDeleteConversation(conv.id, e)}
                        type="button"
                        title="Delete conversation"
                        className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-rose-100 dark:hover:bg-rose-900/50 text-slate-400 hover:text-rose-600 dark:hover:text-rose-300 transition-all shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right: Interactive Medical Chat Stream */}
        <div className="lg:col-span-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-[720px] overflow-hidden">
          <div className="p-4 bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-teal-600/20 border border-teal-200 dark:border-teal-500/40 flex items-center justify-center text-teal-600 dark:text-teal-400">
                <Stethoscope className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                  {activeConversationId ? 'Resumed Study Session' : 'Interactive Medical Tutoring'}
                </h3>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  Track: <strong className="text-teal-700 dark:text-teal-400 uppercase">{selectedTrack}</strong>
                </span>
              </div>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30">
              Free Tier Verified
            </span>
          </div>

          {/* Medical Starter Chips */}
          <div className="px-4 py-2.5 bg-slate-50/70 dark:bg-slate-950/50 border-b border-slate-200 dark:border-slate-800/80 flex items-center gap-2 overflow-x-auto shrink-0">
            <button
              onClick={() =>
                handleSendMessage(
                  'Explain the high-yield mechanism and clinical correlations of this system simply with bullet points and emojis.'
                )
              }
              type="button"
              disabled={isLoading}
              className="whitespace-nowrap flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60 transition-colors"
            >
              <Lightbulb className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span>Explain Mechanism</span>
            </button>
            <button
              onClick={() =>
                handleSendMessage(
                  'Give me a high-yield MBBS comparison table and memorable mnemonic to never confuse look-alike conditions.'
                )
              }
              type="button"
              disabled={isLoading}
              className="whitespace-nowrap flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60 transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>Mnemonic &amp; Table</span>
            </button>
            <button
              onClick={() =>
                handleSendMessage(
                  'Ask me a NEET-PG / NEXT style clinical vignette MCQ without revealing the answer yet so I can test myself!'
                )
              }
              type="button"
              disabled={isLoading}
              className="whitespace-nowrap flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
              <span>Quiz Me (OSCE / MCQ)</span>
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-4 shadow-xs text-sm ${
                    msg.role === 'user'
                      ? 'bg-teal-600 text-white rounded-br-none'
                      : msg.isError
                      ? 'bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 text-rose-900 dark:text-rose-200 rounded-bl-none'
                      : 'bg-slate-100 dark:bg-slate-800/90 text-slate-900 dark:text-slate-200 border border-slate-200 dark:border-slate-700/60 rounded-bl-none'
                  }`}
                >
                  {msg.role === 'model' && (
                    <div className="flex items-center gap-1.5 mb-2 pb-1 border-b border-slate-200 dark:border-slate-700/40 text-xs text-slate-500 dark:text-slate-400 font-semibold">
                      <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                      <span>Personal Medical AI Tutor</span>
                    </div>
                  )}

                  {msg.role === 'user' ? (
                    <div className="whitespace-pre-wrap leading-relaxed">{msg.content}</div>
                  ) : (
                    <ChatMessageRenderer content={msg.content} tone="adaptive" />
                  )}

                  <div
                    className={`mt-2 text-[10px] ${
                      msg.role === 'user' ? 'text-teal-100 text-right' : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-start gap-2">
                <div className="rounded-2xl rounded-bl-none p-3.5 bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/60 text-slate-500 dark:text-slate-400 text-xs flex items-center gap-2">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-teal-600 dark:text-teal-400" />
                  <span>Reviewing textbook correlations...</span>
                </div>
              </div>
            )}

            {errorNotice && (
              <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 text-amber-900 dark:text-amber-300 text-xs space-y-2">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">
                      {isQuotaExhausted ? 'Free Tier Rate Limit Notice' : 'Session Notice'}
                    </p>
                    <p className="opacity-90 leading-relaxed">{errorNotice}</p>
                  </div>
                </div>
                {lastFailedMessage && !isLoading && (
                  <button
                    onClick={() => handleSendMessage(lastFailedMessage)}
                    type="button"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-900 dark:text-amber-200 text-xs font-semibold border border-amber-500/40"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Retry Question</span>
                  </button>
                )}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Optional Case / Lab Note Context */}
          {showCaseBox && (
            <div className="px-4 py-2 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 space-y-1.5 shrink-0">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1 text-[11px]">
                  <ClipboardPlus className="w-3 h-3 text-teal-600 dark:text-teal-400" />
                  Paste MCQ stem, lab values, or ward case summary (optional):
                </span>
                <button
                  type="button"
                  onClick={() => setShowCaseBox(false)}
                  className="text-[11px] hover:underline"
                >
                  Hide
                </button>
              </div>
              <textarea
                rows={3}
                value={caseContext}
                onChange={(e) => setCaseContext(e.target.value.slice(0, 4000))}
                placeholder="e.g. 55M smoker, ECG II/III/aVF STE, V4R +ve, BP 85/55..."
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-xs text-slate-900 dark:text-slate-200 resize-none focus:outline-none focus:border-teal-500"
              />
            </div>
          )}

          {/* Input Footer */}
          <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 shrink-0 space-y-2">
            <div className="flex items-center justify-between text-xs px-1 text-slate-500 dark:text-slate-400">
              <button
                onClick={() => setShowCaseBox((prev) => !prev)}
                type="button"
                className="text-[11px] flex items-center gap-1 text-teal-700 dark:text-teal-400 hover:underline font-medium"
              >
                <ClipboardPlus className="w-3 h-3" />
                <span>{showCaseBox ? 'Hide Case / Lab Box' : 'Attach Case / MCQ Context'}</span>
              </button>
              <span className="text-[10px] font-mono">{input.length}/2000</span>
            </div>

            <div className="flex items-end gap-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-2.5 focus-within:border-teal-500 transition-colors">
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
                placeholder="Ask your MBBS doubt (e.g., 'Why does RCA occlusion cause AV block?' or 'Differentiate Pemphigus vs Pemphigoid')..."
                disabled={isLoading}
                className="flex-1 bg-transparent border-0 resize-none text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-0 leading-relaxed"
              />
              <button
                onClick={() => void handleSendMessage()}
                disabled={!input.trim() || isLoading}
                type="button"
                aria-label="Send medical question"
                className="p-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 disabled:bg-slate-200 dark:disabled:bg-slate-800 text-white disabled:text-slate-400 dark:disabled:text-slate-600 transition-colors shrink-0 shadow-xs"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-between px-1 text-[10px] text-slate-500">
              <span>Enter to send · Shift+Enter for newline</span>
              <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400">
                <Info className="w-3 h-3" />
                Study support only · Not clinical patient advice
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
