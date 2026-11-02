'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  User as UserIcon,
  LogOut,
  ShieldCheck,
  Crown,
  ChevronDown,
  Mail,
  CheckCircle2,
  AlertCircle,
  LogIn,
  UserPlus,
  LayoutDashboard,
  BookOpen,
  BarChart2,
  Settings,
  Sun,
  Moon,
  Loader2,
  Sparkles,
} from 'lucide-react';
import { getInitialTheme, toggleTheme, ThemeMode } from '@/lib/theme';

interface UserMenuProps {
  className?: string;
}

export const UserMenu: React.FC<UserMenuProps> = ({ className = '' }) => {
  const { user, profile, isEmailVerified, isOwner, isAdmin, signOut, isSigningOut } = useAuth();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState<ThemeMode>('light');
  const menuRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Sync theme
  useEffect(() => {
    setTheme(getInitialTheme());
    const onThemeChanged = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setTheme(isDark ? 'dark' : 'light');
    };
    window.addEventListener('ml_theme_changed', onThemeChanged);
    return () => window.removeEventListener('ml_theme_changed', onThemeChanged);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleToggleTheme = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = toggleTheme();
    setTheme(next);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsOpen(false);
      router.push('/');
    } catch (err) {
      console.error('[UserMenu] Logout error:', err);
    }
  };

  // Unauthenticated: Compact, accessible Login/Signup buttons
  if (!user) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <LogIn className="w-3.5 h-3.5" />
          <span>Sign In</span>
        </Link>
        <Link
          href="/signup"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 rounded-xl shadow-sm shadow-indigo-600/30 transition-all hover:shadow-indigo-600/50"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>Sign Up</span>
        </Link>
      </div>
    );
  }

  // Authenticated State Data
  const displayName =
    profile?.full_name ||
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email?.split('@')[0] ||
    'Learner';
  const displayEmail = user.email || '';
  const initial = displayName.charAt(0).toUpperCase();

  const roleLabel = isOwner
    ? 'Platform Owner'
    : isAdmin
    ? 'Admin'
    : profile?.role
    ? profile.role.charAt(0).toUpperCase() + profile.role.slice(1)
    : 'Student';

  return (
    <div className={`relative ${className}`} ref={menuRef}>
      {/* Account Trigger Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-full border transition-all duration-200 shadow-sm group focus:outline-none focus:ring-2 focus:ring-indigo-500/40 ${
          isOpen
            ? 'border-indigo-400 dark:border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/40 ring-2 ring-indigo-500/20'
            : 'border-slate-200/90 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 hover:border-slate-300 dark:hover:border-slate-700'
        }`}
        aria-label="User account menu"
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        {/* Avatar Ring */}
        <div className="relative">
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 text-white font-bold text-xs flex items-center justify-center shadow-sm">
            {initial}
          </div>
          {isEmailVerified && (
            <span
              className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 shadow-xs"
              title="Verified Account"
            />
          )}
        </div>

        {/* Name & Role Text */}
        <div className="hidden sm:flex flex-col text-left leading-tight max-w-[120px]">
          <span className="text-xs font-semibold text-slate-800 dark:text-slate-100 truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {displayName}
          </span>
          <span className="text-[10px] text-slate-400 dark:text-slate-500 capitalize">
            {roleLabel}
          </span>
        </div>

        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-indigo-600 dark:text-indigo-400' : ''
          }`}
        />
      </button>

      {/* Redesigned Premium Profile Dropdown */}
      {isOpen && (
        <div
          ref={dropdownRef}
          role="menu"
          aria-orientation="vertical"
          className="absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xl shadow-indigo-950/15 py-2.5 z-50 text-slate-800 dark:text-slate-200 animate-in fade-in zoom-in-95 duration-150 divide-y divide-slate-100 dark:divide-slate-800/80 focus:outline-none"
        >
          {/* Section 1: Authenticated User Header */}
          <div className="px-4 py-3.5 space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 text-white font-extrabold text-base flex items-center justify-center shadow-md shadow-indigo-600/25 shrink-0">
                {initial}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
                    {displayName}
                  </h4>
                  {isOwner ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-[10px] font-bold text-amber-700 dark:text-amber-300">
                      <Crown className="w-3 h-3 text-amber-500 fill-current" />
                      <span>Owner</span>
                    </span>
                  ) : isAdmin ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950/60 border border-purple-300 dark:border-purple-800 text-[10px] font-bold text-purple-700 dark:text-purple-300">
                      <ShieldCheck className="w-3 h-3 text-purple-500" />
                      <span>Admin</span>
                    </span>
                  ) : (
                    <span className="text-[10px] uppercase font-semibold tracking-wider text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-900 px-2 py-0.5 rounded-full">
                      {roleLabel}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate flex items-center gap-1.5 mt-0.5">
                  <Mail className="w-3 h-3 shrink-0 text-slate-400" />
                  <span className="truncate">{displayEmail}</span>
                </p>
              </div>
            </div>

            {/* Email Verification Status Pill */}
            <div className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs">
              <span className="text-slate-500 dark:text-slate-400 text-[11px] font-medium">
                Verification Status
              </span>
              {isEmailVerified ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Verified</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                  <span>Pending</span>
                </span>
              )}
            </div>
          </div>

          {/* Section 2: Account Actions */}
          <div className="py-1.5 px-2 space-y-0.5">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group"
              role="menuitem"
            >
              <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-105 transition-transform">
                <LayoutDashboard className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col">
                <span>Learning Dashboard</span>
                <span className="text-[10px] text-slate-400 font-normal">Platform overview & resume</span>
              </div>
            </Link>

            <Link
              href="/curriculum"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group"
              role="menuitem"
            >
              <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-105 transition-transform">
                <BookOpen className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col">
                <span>Curriculum Syllabus</span>
                <span className="text-[10px] text-slate-400 font-normal">All 13 AI & ML phases</span>
              </div>
            </Link>

            <Link
              href="/analytics"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group"
              role="menuitem"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-900 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform">
                <BarChart2 className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col">
                <span>Learning Progress</span>
                <span className="text-[10px] text-slate-400 font-normal">Metrics, time & completed topics</span>
              </div>
            </Link>

            <Link
              href="/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group"
              role="menuitem"
            >
              <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 group-hover:scale-105 transition-transform">
                <Settings className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col">
                <span>Account &amp; Settings</span>
                <span className="text-[10px] text-slate-400 font-normal">Preferences and API configuration</span>
              </div>
            </Link>
          </div>

          {/* Section 3: Theme Toggle Row */}
          <div className="px-3 py-2 flex items-center justify-between text-xs">
            <span className="text-slate-500 dark:text-slate-400 font-medium">Appearance</span>
            <button
              onClick={handleToggleTheme}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              title="Toggle Light / Dark mode"
            >
              {theme === 'dark' ? (
                <>
                  <Moon className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Dark</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span>Light</span>
                </>
              )}
            </button>
          </div>

          {/* Section 4: Sign Out */}
          <div className="p-2">
            <button
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              role="menuitem"
            >
              {isSigningOut ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Signing Out...</span>
                </>
              ) : (
                <>
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out of Session</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
