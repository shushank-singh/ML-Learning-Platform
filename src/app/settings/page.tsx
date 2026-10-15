'use client';

import React, { useState, useEffect } from 'react';
import {
  Settings,
  Sun,
  Moon,
  Database,
  Download,
  Upload,
  RotateCcw,
  Bot,
  Key,
  ShieldCheck,
  Check,
  AlertTriangle,
} from 'lucide-react';
import {
  exportProgressAsJSON,
  importProgressFromJSON,
  resetAllProgress,
  getProgress,
} from '@/lib/storage';

export default function SettingsPage() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [exportedJson, setExportedJson] = useState<string>('');
  const [importInput, setImportInput] = useState<string>('');
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [resetConfirm, setResetConfirm] = useState<boolean>(false);

  // Optional AI Tutor Key
  const [apiKey, setApiKey] = useState<string>('');
  const [keySaved, setKeySaved] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isDark = document.documentElement.classList.contains('dark');
      setTheme(isDark ? 'dark' : 'light');
      const storedKey = localStorage.getItem('ml_ai_tutor_key') || '';
      setApiKey(storedKey);
    }
  }, []);

  const handleThemeChange = (newTheme: 'dark' | 'light') => {
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('ml_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('ml_theme', 'light');
    }
  };

  const handleExport = () => {
    const json = exportProgressAsJSON();
    setExportedJson(json);

    // Trigger download
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ml_mastery_lab_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    if (!importInput.trim()) return;
    const ok = importProgressFromJSON(importInput);
    if (ok) {
      setImportStatus('Progress imported successfully!');
      setImportInput('');
      setTimeout(() => setImportStatus(null), 3000);
    } else {
      setImportStatus('Invalid JSON format. Please verify the backup payload.');
    }
  };

  const handleReset = () => {
    resetAllProgress();
    setResetConfirm(false);
    window.location.reload();
  };

  const handleSaveApiKey = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ml_ai_tutor_key', apiKey.trim());
      setKeySaved(true);
      setTimeout(() => setKeySaved(false), 2000);
    }
  };

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold">
          <Settings className="w-4 h-4" />
          <span>Application Configuration</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Platform Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Manage appearance, export/import study progress, configure optional backend credentials, and manage the optional AI tutor.
        </p>
      </div>

      <div className="space-y-6">
        {/* Appearance Section */}
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
            Interface Appearance
          </h2>
          <p className="text-xs text-slate-500">
            Select your preferred visual mode for mathematical formulas, charts, and code editors.
          </p>

          <div className="grid grid-cols-2 gap-4 max-w-sm">
            <button
              onClick={() => handleThemeChange('dark')}
              className={`p-4 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                theme === 'dark'
                  ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              <Moon className="w-4 h-4" />
              <span>Dark Mode (Default)</span>
            </button>

            <button
              onClick={() => handleThemeChange('light')}
              className={`p-4 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                theme === 'light'
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-600 shadow-sm'
                  : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              <Sun className="w-4 h-4" />
              <span>Light Mode</span>
            </button>
          </div>
        </div>

        {/* Local Storage & Backup Section */}
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-emerald-500" />
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Data Storage & Backup Management
            </h2>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            All your quiz scores, lesson checkboxes, study streaks, and personal notes are safely persisted in your browser via reactive local storage. You can export a JSON backup file at any time to preserve or migrate your work across devices.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={handleExport}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center gap-2 border border-slate-200 dark:border-slate-700 transition-colors shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>Download Progress JSON Backup</span>
            </button>
          </div>

          {/* Import JSON Box */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
              Restore from Backup JSON:
            </span>
            <textarea
              value={importInput}
              onChange={(e) => setImportInput(e.target.value)}
              placeholder="Paste JSON string exported from another session..."
              className="w-full h-20 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 focus:outline-none"
            />
            <div className="flex items-center gap-3">
              <button
                onClick={handleImport}
                disabled={!importInput.trim()}
                className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-semibold transition-colors shadow-sm"
              >
                Import JSON
              </button>
              {importStatus && (
                <span className="text-xs text-indigo-500 font-medium">
                  {importStatus}
                </span>
              )}
            </div>
          </div>

          {/* Factory Reset */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-rose-500 block">
                Reset All Learning Progress
              </span>
              <span className="text-[11px] text-slate-400">
                Clears all study streaks, completed lesson checkmarks, personal notes, and quiz histories.
              </span>
            </div>
            {!resetConfirm ? (
              <button
                onClick={() => setResetConfirm(true)}
                className="px-3 py-1.5 rounded-lg border border-rose-300 dark:border-rose-900 text-rose-600 dark:text-rose-400 text-xs font-semibold hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
              >
                Reset Progress
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleReset}
                  className="px-3 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 transition-colors"
                >
                  Confirm Reset
                </button>
                <button
                  onClick={() => setResetConfirm(false)}
                  className="px-2.5 py-1.5 text-xs text-slate-500"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Optional AI Tutor Integration */}
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-indigo-500" />
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Optional AI Math & Code Tutor (BYOK)
            </h2>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Configure an optional LLM API key (e.g. Google Gemini, Anthropic, or OpenAI) to enable live formula explanations and code debugging assistance. No API key is required to use any other platform feature.
          </p>

          <div className="space-y-2">
            <div className="relative">
              <Key className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-... or AIzaSy... (Optional API Key)"
                className="w-full pl-9 pr-4 py-2 text-xs font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                Never exposed to unauthorized servers; saved strictly in your client-side browser storage.
              </span>
              <button
                onClick={handleSaveApiKey}
                className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-sm"
              >
                {keySaved ? <Check className="w-3.5 h-3.5" /> : null}
                <span>{keySaved ? 'Saved' : 'Save Key'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Optional Supabase Integration Guide */}
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wide block">
            Optional Cloud Database Architecture:
          </span>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            To enable cross-device authenticated cloud sync, configure the following variables in your <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-slate-800 dark:text-slate-200">.env.local</code> file:
          </p>
          <pre className="p-3 rounded-lg bg-slate-950 text-indigo-300 font-mono text-xs overflow-x-auto border border-slate-800">
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
          </pre>
          <p className="text-[11px] text-slate-500">
            When unset, the application automatically runs in zero-friction offline-ready local storage mode.
          </p>
        </div>
      </div>
    </div>
  );
}
