'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Send,
  Trash2,
  PlusCircle,
  MessageSquare,
  AlertTriangle,
  Lightbulb,
  HelpCircle,
  Bug,
  BookOpen,
  Code2,
  RefreshCw,
  Cpu,
  Layers,
  Terminal,
  Coffee,
  CheckCircle2,
  Info,
} from 'lucide-react';
import { TutorTrack } from '@/lib/tutor/constants';
import { ChatMessageRenderer } from './ChatMessageRenderer';

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

const TRACKS_METADATA: { id: TutorTrack; name: string; icon: any; color: string }[] = [
  { id: 'ml', name: 'Machine Learning', icon: Layers, color: 'text-indigo-400' },
  { id: 'dsa', name: 'DSA Lab', icon: Cpu, color: 'text-violet-400' },
  { id: 'python', name: 'Python Lab', icon: Terminal, color: 'text-emerald-400' },
  { id: 'java', name: 'Java Lab', icon: Coffee, color: 'text-amber-400' },
  { id: 'general', name: 'General CS', icon: Sparkles, color: 'text-cyan-400' },
];

export const AITutorFullView: React.FC = () => {
  const [conversations, setConversations] = useState<ConversationItem[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<TutorTrack>('ml');
  const [messages, setMessages] = useState<MessageItem[]>([
    {
      id: 'welcome',
      role: 'model',
      content: `Welcome to the **ML Mastery Lab AI Concept & Coding Tutor**! 🎓\n\nI am configured under the **Google Gemini Developer API Free Tier** with zero paid fallbacks.\n\nSelect a learning track or ask any question about Machine Learning math, Data Structures & Algorithms, Python, or Java.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState<string>('');
  const [codeSnippet, setCodeSnippet] = useState<string>('');
  const [showCodeInput, setShowCodeInput] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);
  const [isQuotaExhausted, setIsQuotaExhausted] = useState<boolean>(false);
  const [lastFailedMessage, setLastFailedMessage] = useState<string | null>(null);
  const [fetchingConversations, setFetchingConversations] = useState<boolean>(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Load conversations on mount
  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    setFetchingConversations(true);
    try {
      const res = await fetch('/api/ai-tutor/conversations');
      const data = await res.json();
      if (res.ok && data.success && Array.isArray(data.conversations)) {
        setConversations(data.conversations);
      }
    } catch (err) {
      console.warn('Could not load conversations:', err);
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
        } else {
          setMessages([
            {
              id: 'welcome',
              role: 'model',
              content: `Session resumed: **${data.conversation.title}**. What would you like to ask?`,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            },
          ]);
        }
      }
    } catch (err) {
      console.error('Failed to load conversation messages:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteConversation = async (convId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this conversation?')) return;

    try {
      const res = await fetch(`/api/ai-tutor/conversations/${convId}`, {
        method: 'DELETE',
      });
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
    setCodeSnippet('');
    setShowCodeInput(false);
    setMessages([
      {
        id: 'welcome',
        role: 'model',
        content: `New **${selectedTrack.toUpperCase()}** session started! Ask me any question, paste code to debug, or request an intuitive concept explanation.`,
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
          codeSnippet: showCodeInput && codeSnippet ? codeSnippet : undefined,
          history: historyTurns,
          conversationId: activeConversationId || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        const errorMsg = data.error || 'Failed to get a response from the AI tutor.';
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
        fetchConversations();
      }

      const modelMsg: MessageItem = {
        id: `model-${Date.now()}`,
        role: 'model',
        content: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, modelMsg]);
    } catch (err) {
      const networkError = 'Network error: could not connect to AI Tutor API.';
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

  const handleRetry = () => {
    if (lastFailedMessage) {
      handleSendMessage(lastFailedMessage);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Page Title & Zero Cost Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-xs font-semibold text-indigo-400">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Zero-Cost AI Coding & Concept Tutor</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-100">
            Shared AI Tutor Studio
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
            One unified, pedagogical assistant powered exclusively by Google Gemini Developer API Free Tier.
            Supports Machine Learning, DSA, Python, and Java.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleNewSession}
            type="button"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/20 transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Session</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Sidebar + Chat Window */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Track Selector & Conversation History */}
        <div className="lg:col-span-4 space-y-6">
          {/* Track Selector Card */}
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4 space-y-3 shadow-md">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Active Learning Track
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
              {TRACKS_METADATA.map((track) => {
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
                            content: `Switched track to **${track.name}**. How can I help you learn today?`,
                            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                          },
                        ]);
                      }
                    }}
                    type="button"
                    className={`flex items-center justify-between p-3 rounded-xl border text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-indigo-950/60 border-indigo-500/50 text-white shadow-sm'
                        : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${track.color}`} />
                      <span>{track.name}</span>
                    </div>
                    {isSelected && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Past Conversations List */}
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4 space-y-3 shadow-md">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Conversation History
              </h3>
              <span className="text-[10px] text-slate-500 font-mono">
                {conversations.length} saved
              </span>
            </div>

            {fetchingConversations ? (
              <div className="py-8 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-400" />
                <span>Loading sessions...</span>
              </div>
            ) : conversations.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-500 space-y-1">
                <MessageSquare className="w-6 h-6 mx-auto text-slate-600 mb-2" />
                <p>No saved conversations yet.</p>
                <p className="text-[11px] text-slate-600">Start asking questions to build your history!</p>
              </div>
            ) : (
              <div className="space-y-1.5 max-h-[360px] overflow-y-auto pr-1">
                {conversations.map((conv) => {
                  const isActive = activeConversationId === conv.id;
                  return (
                    <div
                      key={conv.id}
                      onClick={() => handleSelectConversation(conv.id)}
                      className={`group flex items-center justify-between p-2.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                        isActive
                          ? 'bg-indigo-900/40 border-indigo-500/50 text-indigo-200'
                          : 'bg-slate-950/40 border-slate-800/80 text-slate-300 hover:bg-slate-800/50 hover:text-white'
                      }`}
                    >
                      <div className="min-w-0 pr-2">
                        <p className="font-semibold truncate text-[11px]">
                          {conv.title}
                        </p>
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                          <span className="uppercase font-mono text-[9px] px-1 rounded bg-slate-800 text-slate-400">
                            {conv.track}
                          </span>
                          <span>·</span>
                          <span>{new Date(conv.updated_at).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <button
                        onClick={(e) => handleDeleteConversation(conv.id, e)}
                        type="button"
                        title="Delete conversation"
                        className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-rose-900/50 text-slate-400 hover:text-rose-300 transition-all shrink-0"
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

        {/* Right Column: Full Chat Experience */}
        <div className="lg:col-span-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col h-[750px] overflow-hidden">
          {/* Header */}
          <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
                <Sparkles className="w-4 h-4 text-amber-300" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-100">
                  {activeConversationId ? 'Active Conversation' : 'Interactive Tutoring'}
                </h3>
                <span className="text-[11px] text-slate-400">
                  Track: <strong className="text-indigo-400 uppercase">{selectedTrack}</strong>
                </span>
              </div>
            </div>

            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              Free Tier Verified
            </span>
          </div>

          {/* Quick Action Chips */}
          <div className="px-4 py-2.5 bg-slate-950/50 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto shrink-0">
            <button
              onClick={() => handleSendMessage('Can you explain the main theoretical concept in simple English with an analogy?')}
              type="button"
              disabled={isLoading}
              className="whitespace-nowrap flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 transition-colors"
            >
              <Lightbulb className="w-3.5 h-3.5 text-indigo-400" />
              <span>Explain Concept</span>
            </button>
            <button
              onClick={() => handleSendMessage('Give me a step-by-step hint for solving this kind of problem without giving away the full code.')}
              type="button"
              disabled={isLoading}
              className="whitespace-nowrap flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
              <span>Give Me a Hint</span>
            </button>
            <button
              onClick={() => handleSendMessage('Can you ask me a short checkpoint question to verify my understanding?')}
              type="button"
              disabled={isLoading}
              className="whitespace-nowrap flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
              <span>Quiz Me</span>
            </button>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-4 shadow-sm text-sm ${
                    msg.role === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-none'
                      : msg.isError
                      ? 'bg-rose-950/40 border border-rose-800/60 text-rose-200 rounded-bl-none'
                      : 'bg-slate-800/90 text-slate-200 border border-slate-700/60 rounded-bl-none'
                  }`}
                >
                  {msg.role === 'model' && (
                    <div className="flex items-center gap-1.5 mb-2 pb-1 border-b border-slate-700/40 text-xs text-slate-400 font-semibold">
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>AI Concept Tutor</span>
                    </div>
                  )}

                  <ChatMessageRenderer content={msg.content} />

                  <div
                    className={`mt-2 text-[10px] ${
                      msg.role === 'user' ? 'text-indigo-200 text-right' : 'text-slate-400'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-start gap-2">
                <div className="max-w-[80%] rounded-2xl rounded-bl-none p-3.5 bg-slate-800/90 border border-slate-700/60 text-slate-400 text-xs flex items-center gap-2">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-400" />
                  <span>AI Tutor is thinking...</span>
                </div>
              </div>
            )}

            {errorNotice && (
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs space-y-2">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-semibold text-amber-200">
                      {isQuotaExhausted ? 'Free Tier Rate Limit Notice' : 'Request Notice'}
                    </p>
                    <p className="text-xs text-amber-300/90 leading-relaxed">
                      {errorNotice}
                    </p>
                  </div>
                </div>

                {lastFailedMessage && !isLoading && (
                  <div className="pt-1 flex items-center gap-2">
                    <button
                      onClick={handleRetry}
                      type="button"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 text-xs font-semibold border border-amber-500/40 transition-colors"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Retry Question</span>
                    </button>
                    <span className="text-[11px] text-amber-400/80">
                      User-initiated retry only
                    </span>
                  </div>
                )}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Optional Code Snippet Input Area */}
          {showCodeInput && (
            <div className="px-4 py-2 bg-slate-950 border-t border-slate-800/80 space-y-1.5 shrink-0">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1 text-[11px]">
                  <Code2 className="w-3 h-3 text-indigo-400" />
                  Code to debug or inspect (optional):
                </span>
                <button
                  onClick={() => setShowCodeInput(false)}
                  className="text-[11px] text-slate-500 hover:text-slate-300"
                >
                  Hide Code Box
                </button>
              </div>
              <textarea
                rows={3}
                value={codeSnippet}
                onChange={(e) => setCodeSnippet(e.target.value.slice(0, 4000))}
                placeholder="// Paste your code snippet here..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 font-mono resize-none focus:outline-none focus:border-indigo-500"
              />
            </div>
          )}

          {/* Input Footer */}
          <div className="p-4 bg-slate-950 border-t border-slate-800 shrink-0 space-y-2">
            <div className="flex items-center justify-between text-xs px-1 text-slate-400">
              <button
                onClick={() => setShowCodeInput((prev) => !prev)}
                type="button"
                className="text-[11px] flex items-center gap-1 text-indigo-400 hover:text-indigo-300"
              >
                <Code2 className="w-3 h-3" />
                <span>{showCodeInput ? 'Hide Code Box' : 'Attach Code Snippet'}</span>
              </button>
              <span className="text-[10px] text-slate-500 font-mono">
                {input.length}/2000
              </span>
            </div>

            <div className="flex items-end gap-2 bg-slate-900 rounded-2xl border border-slate-800 p-2.5 focus-within:border-indigo-500 transition-colors">
              <textarea
                rows={2}
                value={input}
                onChange={(e) => setInput(e.target.value.slice(0, 2000))}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Ask a question about this track, debugging, mathematical formulas, or algorithms..."
                disabled={isLoading}
                className="flex-1 bg-transparent border-0 resize-none text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-0 leading-relaxed font-sans"
              />

              <button
                onClick={() => handleSendMessage()}
                disabled={!input.trim() || isLoading}
                type="button"
                aria-label="Send message"
                className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white disabled:text-slate-600 font-semibold transition-colors shrink-0 shadow-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-between px-1 text-[10px] text-slate-500">
              <span>Enter to send · Shift+Enter for newline</span>
              <span className="flex items-center gap-1 text-emerald-400">
                <Info className="w-3 h-3" />
                Zero paid fallbacks · Safe free-tier sandbox
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

