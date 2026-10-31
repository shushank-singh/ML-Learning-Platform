'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  X,
  Send,
  RotateCcw,
  AlertTriangle,
  Lightbulb,
  HelpCircle,
  Bug,
  BookOpen,
  Code2,
  RefreshCw,
  ChevronDown,
  Info,
} from 'lucide-react';
import { TutorTrack } from '@/lib/tutor/constants';
import { ChatMessageRenderer } from './ChatMessageRenderer';

export interface AITutorPanelProps {
  track: TutorTrack;
  moduleId?: string;
  lessonId?: string;
  lessonTitle?: string;
  language?: string;
  codeSnippet?: string;
  defaultOpen?: boolean;
}

interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
  isError?: boolean;
  isQuotaExhausted?: boolean;
}

const QUICK_ACTIONS = [
  { label: 'Explain Concept', icon: Lightbulb, prompt: 'Can you explain the main intuition behind this lesson in simple terms with an analogy?' },
  { label: 'Give Me a Hint', icon: HelpCircle, prompt: 'Can you give me a hint on how to approach the implementation or exercises without giving away the full solution?' },
  { label: 'Debug My Code', icon: Bug, prompt: 'Can you help me understand any potential bugs, edge cases, or errors in this lesson\'s code implementation?' },
  { label: 'Quiz Me', icon: BookOpen, prompt: 'Can you give me a short conceptual checkpoint question to test my understanding of this topic?' },
];

export const AITutorPanel: React.FC<AITutorPanelProps> = ({
  track,
  moduleId,
  lessonId,
  lessonTitle,
  language,
  codeSnippet,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      content: `Hello! I'm your **Complete AI & ML Academy Tutor** powered by the Gemini Developer Free Tier. 🎓\n\nI can help you understand mathematics, walk through algorithms, debug code, or test your comprehension on **${lessonTitle || 'this lesson'}**.\n\nWhat would you like to explore?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [attachCode, setAttachCode] = useState<boolean>(Boolean(codeSnippet && codeSnippet.trim().length > 0));
  const [conversationId, setConversationId] = useState<string | undefined>(undefined);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);
  const [isQuotaExhausted, setIsQuotaExhausted] = useState<boolean>(false);
  const [lastFailedMessage, setLastFailedMessage] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    setErrorNotice(null);
    setIsQuotaExhausted(false);
    setLastFailedMessage(null);

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Build conversation history for context (exclude welcome message)
      const historyTurns = messages
        .filter((m) => m.id !== 'welcome' && !m.isError)
        .slice(-6)
        .map((m) => ({ role: m.role, content: m.content }));

      const payload = {
        message: query,
        track,
        moduleId,
        lessonId,
        lessonTitle,
        language,
        codeSnippet: attachCode && codeSnippet ? codeSnippet : undefined,
        history: historyTurns,
        conversationId,
      };

      const res = await fetch('/api/ai-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        const errorMsg = data.error || 'Failed to get a response from the AI tutor.';
        const quotaHit = res.status === 429 || errorMsg.toLowerCase().includes('quota');

        setErrorNotice(errorMsg);
        setIsQuotaExhausted(quotaHit);
        setLastFailedMessage(query);

        setMessages((prev) => [
          ...prev,
          {
            id: `err-${Date.now()}`,
            role: 'model',
            content: `⚠️ **${errorMsg}**`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isError: true,
            isQuotaExhausted: quotaHit,
          },
        ]);
        return;
      }

      if (data.conversationId) {
        setConversationId(data.conversationId);
      }

      const modelMsg: Message = {
        id: `model-${Date.now()}`,
        role: 'model',
        content: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, modelMsg]);
    } catch (err: any) {
      console.error('AI Tutor request failed:', err);
      const networkError = 'Network error: could not connect to the AI Tutor endpoint.';
      setErrorNotice(networkError);
      setLastFailedMessage(query);

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

  const handleResetConversation = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'model',
        content: `Conversation reset. I'm ready to help you with **${lessonTitle || 'this lesson'}**. Ask me anything!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setConversationId(undefined);
    setErrorNotice(null);
    setIsQuotaExhausted(false);
    setLastFailedMessage(null);
  };

  const handleRetry = () => {
    if (lastFailedMessage) {
      handleSendMessage(lastFailedMessage);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* ========================================================================= */}
      {/* FLOATING ACTION LAUNCHER BUTTON */}
      {/* ========================================================================= */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        type="button"
        aria-label="Toggle AI Tutor Panel"
        className="fixed bottom-6 right-6 z-40 group flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-xs shadow-2xl hover:shadow-indigo-500/30 transition-all duration-200 transform hover:-translate-y-0.5 border border-indigo-400/30"
      >
        <div className="relative">
          <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        </div>
        <span className="font-semibold tracking-wide">
          {isOpen ? 'Close AI Tutor' : 'Ask AI Tutor'}
        </span>
        <span className="hidden sm:inline-block px-1.5 py-0.5 rounded-full bg-white/20 text-[10px] font-mono tracking-tighter">
          Free Tier
        </span>
      </button>

      {/* ========================================================================= */}
      {/* SLIDE-OUT COLLAPSIBLE DRAWER / PANEL */}
      {/* ========================================================================= */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out font-sans ${
          isOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none'
        }`}
        role="dialog"
        aria-label="AI Coding and Concept Tutor"
        aria-modal="true"
      >
        {/* Panel Header */}
        <div className="p-4 border-b border-slate-800 bg-slate-950/80 backdrop-blur flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shrink-0">
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-sm text-slate-100 truncate">
                  AI Concept Tutor
                </h3>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  Zero Cost
                </span>
              </div>
              <p className="text-[11px] text-slate-400 truncate">
                {lessonTitle || track.toUpperCase()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handleResetConversation}
              type="button"
              title="Reset Conversation"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              type="button"
              title="Close Drawer (Esc)"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Lesson Context Pill */}
        {lessonTitle && (
          <div className="px-4 py-2 bg-indigo-950/30 border-b border-indigo-900/40 flex items-center justify-between text-xs text-indigo-300 shrink-0">
            <div className="flex items-center gap-1.5 truncate">
              <BookOpen className="w-3.5 h-3.5 shrink-0 text-indigo-400" />
              <span className="font-medium truncate">Context: {lessonTitle}</span>
            </div>
            <span className="uppercase text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
              {track}
            </span>
          </div>
        )}

        {/* Suggested Quick Action Chips */}
        <div className="px-3 py-2 bg-slate-950/50 border-b border-slate-800/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
          {QUICK_ACTIONS.map((action, idx) => {
            const Icon = action.icon;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(action.prompt)}
                disabled={isLoading}
                className="whitespace-nowrap flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 transition-colors disabled:opacity-50"
              >
                <Icon className="w-3 h-3 text-indigo-400" />
                <span>{action.label}</span>
              </button>
            );
          })}
        </div>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[90%] rounded-2xl p-3.5 shadow-sm text-sm ${
                  msg.role === 'user'
                    ? 'bg-indigo-600 text-white rounded-br-none'
                    : msg.isError
                    ? 'bg-rose-950/40 border border-rose-800/60 text-rose-200 rounded-bl-none'
                    : 'bg-slate-800/90 text-slate-200 border border-slate-700/60 rounded-bl-none'
                }`}
              >
                {msg.role === 'model' && (
                  <div className="flex items-center gap-1.5 mb-1.5 pb-1 border-b border-slate-700/40 text-[11px] text-slate-400 font-semibold">
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    <span>AI Tutor</span>
                  </div>
                )}

                <ChatMessageRenderer content={msg.content} />

                <div
                  className={`mt-1.5 text-[10px] ${
                    msg.role === 'user' ? 'text-indigo-200 text-right' : 'text-slate-400'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex items-start gap-2">
              <div className="max-w-[85%] rounded-2xl rounded-bl-none p-3.5 bg-slate-800/90 border border-slate-700/60 text-slate-400 text-xs flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-400" />
                <span>Consulting Gemini Free Tier tutor model...</span>
              </div>
            </div>
          )}

          {/* Quota Exhausted Notice & Retry Button */}
          {errorNotice && (
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs space-y-2">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-semibold text-amber-200">
                    {isQuotaExhausted ? 'Free Tier Rate Limit' : 'Request Notice'}
                  </p>
                  <p className="text-[11px] text-amber-300/90 leading-relaxed">
                    {errorNotice}
                  </p>
                </div>
              </div>

              {lastFailedMessage && !isLoading && (
                <div className="pt-1 flex items-center gap-2">
                  <button
                    onClick={handleRetry}
                    type="button"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 text-[11px] font-semibold border border-amber-500/40 transition-colors"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Try Question Again</span>
                  </button>
                  <span className="text-[10px] text-amber-400/80">
                    User-initiated retry only
                  </span>
                </div>
              )}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Footer Area */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 shrink-0 space-y-2">
          {codeSnippet && (
            <div className="flex items-center justify-between text-xs px-1 text-slate-400">
              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={attachCode}
                  onChange={(e) => setAttachCode(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-800 text-indigo-600 focus:ring-0 focus:ring-offset-0"
                />
                <span className="flex items-center gap-1 text-[11px] text-slate-300">
                  <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                  Attach current lesson code snippet
                </span>
              </label>
              <span className="text-[10px] text-slate-500 font-mono">
                {input.length}/2000
              </span>
            </div>
          )}

          <div className="relative flex items-end gap-2 bg-slate-900 rounded-2xl border border-slate-800 p-2 focus-within:border-indigo-500 transition-colors">
            <textarea
              ref={textareaRef}
              rows={2}
              value={input}
              onChange={(e) => setInput(e.target.value.slice(0, 2000))}
              onKeyDown={handleKeyDown}
              placeholder="Ask a question about this topic, math derivation, or code..."
              disabled={isLoading}
              className="flex-1 bg-transparent border-0 resize-none text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-0 leading-relaxed font-sans"
            />

            <button
              onClick={() => handleSendMessage()}
              disabled={!input.trim() || isLoading}
              type="button"
              aria-label="Send question to AI Tutor"
              className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white disabled:text-slate-600 font-semibold transition-colors shrink-0 shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center justify-between px-1 text-[10px] text-slate-500">
            <span>Enter to send · Shift+Enter for newline</span>
            <span className="flex items-center gap-1">
              <Info className="w-3 h-3" />
              Zero charges guaranteed
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

