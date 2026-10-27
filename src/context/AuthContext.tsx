'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { getSupabaseBrowserClient, isSupabaseConfigured } from '@/lib/supabase/client';

export type UserRole = 'student' | 'owner' | 'admin';

export interface UserProfile {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  role: UserRole;
  created_at?: string;
  updated_at?: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  isLoading: boolean;
  isConfigured: boolean;
  isEmailVerified: boolean;
  isOwner: boolean;
  isAdmin: boolean;
  signUp: (params: {
    fullName: string;
    email: string;
    password: string;
  }) => Promise<{ error?: string; requireVerification?: boolean }>;
  signInWithEmail: (params: {
    email: string;
    password: string;
  }) => Promise<{ error?: string; unverified?: boolean }>;
  signInWithGoogle: (targetRedirect?: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  resendVerificationEmail: (email: string) => Promise<{ error?: string; success?: boolean }>;
  resetPasswordForEmail: (email: string) => Promise<{ error?: string; success?: boolean }>;
  updatePassword: (newPassword: string) => Promise<{ error?: string; success?: boolean }>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isConfigured, setIsConfigured] = useState<boolean>(false);

  const fetchProfile = useCallback(async (userId: string, userEmail?: string, userMetaName?: string) => {
    try {
      const supabase = getSupabaseBrowserClient();
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        console.warn('[AuthContext] Profile fetch warning:', error.message);
      }

      if (data) {
        setProfile(data as UserProfile);
      } else {
        // Fallback default profile from auth metadata
        setProfile({
          id: userId,
          email: userEmail || null,
          full_name: userMetaName || null,
          avatar_url: null,
          role: 'student',
        });
      }
    } catch (err) {
      console.warn('[AuthContext] Profile lookup error:', err);
    }
  }, []);

  useEffect(() => {
    const configured = isSupabaseConfigured();
    setIsConfigured(configured);

    if (!configured) {
      setIsLoading(false);
      return;
    }

    const supabase = getSupabaseBrowserClient();

    // 1. Initial Session Check
    supabase.auth
      .getSession()
      .then(({ data: { session: initialSession }, error }) => {
        if (error) {
          console.warn('[AuthContext] Session retrieval error:', error.message);
        }
        setSession(initialSession);
        setUser(initialSession?.user || null);

        if (initialSession?.user) {
          const userMeta = initialSession.user.user_metadata || {};
          fetchProfile(
            initialSession.user.id,
            initialSession.user.email,
            userMeta.full_name || userMeta.name
          );
        }
      })
      .finally(() => {
        setIsLoading(false);
      });

    // 2. Real-time Auth State Listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      setSession(currentSession);
      const currentUser = currentSession?.user || null;
      setUser(currentUser);

      if (currentUser) {
        const userMeta = currentUser.user_metadata || {};
        await fetchProfile(
          currentUser.id,
          currentUser.email,
          userMeta.full_name || userMeta.name
        );
      } else {
        setProfile(null);
      }

      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [fetchProfile]);

  const refreshProfile = useCallback(async () => {
    if (user) {
      const userMeta = user.user_metadata || {};
      await fetchProfile(user.id, user.email, userMeta.full_name || userMeta.name);
    }
  }, [user, fetchProfile]);

  // Derived flags
  const isEmailVerified = Boolean(user && (user.email_confirmed_at || user.confirmed_at));
  const isOwner = profile?.role === 'owner';
  const isAdmin = profile?.role === 'owner' || profile?.role === 'admin';

  // --- Auth Actions ---

  const signUp = async ({
    fullName,
    email,
    password,
  }: {
    fullName: string;
    email: string;
    password: string;
  }): Promise<{ error?: string; requireVerification?: boolean }> => {
    if (!isConfigured) {
      return { error: 'Authentication service is not configured. Please supply Supabase environment variables.' };
    }

    const supabase = getSupabaseBrowserClient();
    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');
    const emailRedirectTo = `${siteUrl}/auth/callback`;

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          data: {
            full_name: fullName.trim(),
            name: fullName.trim(),
          },
          emailRedirectTo,
        },
      });

      if (error) {
        return { error: error.message };
      }

      // If user identities array is empty in Supabase, an account already exists with this email
      if (data.user && data.user.identities && data.user.identities.length === 0) {
        return {
          error: 'An account with this email address already exists. Please sign in or use password recovery.',
        };
      }

      // If confirmation email was dispatched
      const unconfirmed = !data.user?.email_confirmed_at && !data.session;
      return { requireVerification: unconfirmed };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An unexpected error occurred during signup.';
      return { error: msg };
    }
  };

  const signInWithEmail = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<{ error?: string; unverified?: boolean }> => {
    if (!isConfigured) {
      return { error: 'Authentication service is not configured. Please supply Supabase environment variables.' };
    }

    const supabase = getSupabaseBrowserClient();

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (error) {
        if (error.message.toLowerCase().includes('email not confirmed')) {
          return {
            error: 'Your email address has not been confirmed yet. Please verify your email before logging in.',
            unverified: true,
          };
        }
        return { error: error.message };
      }

      // Check if email confirmed flag is present on the logged in user
      if (data.user && !data.user.email_confirmed_at && !data.user.confirmed_at) {
        // Enforce email confirmation requirement
        await supabase.auth.signOut();
        return {
          error: 'Please confirm your email address before accessing the learning platform.',
          unverified: true,
        };
      }

      return {};
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An unexpected login error occurred.';
      return { error: msg };
    }
  };

  const signInWithGoogle = async (targetRedirect?: string): Promise<{ error?: string }> => {
    if (!isConfigured) {
      return { error: 'Authentication service is not configured. Please supply Supabase environment variables.' };
    }

    const supabase = getSupabaseBrowserClient();
    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');

    const nextPath = targetRedirect ? `?next=${encodeURIComponent(targetRedirect)}` : '';
    const redirectTo = `${siteUrl}/auth/callback${nextPath}`;

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo,
          queryParams: {
            access_type: 'offline',
            prompt: 'select_account',
          },
        },
      });

      if (error) {
        return { error: error.message };
      }

      return {};
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to initialize Google Sign-In.';
      return { error: msg };
    }
  };

  const signOut = async () => {
    try {
      const supabase = getSupabaseBrowserClient();
      await supabase.auth.signOut();
    } catch (err) {
      console.warn('[AuthContext] Sign out error:', err);
    } finally {
      setUser(null);
      setSession(null);
      setProfile(null);
    }
  };

  const resendVerificationEmail = async (email: string): Promise<{ error?: string; success?: boolean }> => {
    if (!isConfigured) {
      return { error: 'Authentication service is not configured.' };
    }

    const supabase = getSupabaseBrowserClient();
    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');

    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email.trim().toLowerCase(),
        options: {
          emailRedirectTo: `${siteUrl}/auth/callback`,
        },
      });

      if (error) {
        return { error: error.message };
      }
      return { success: true };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to resend confirmation email.';
      return { error: msg };
    }
  };

  const resetPasswordForEmail = async (email: string): Promise<{ error?: string; success?: boolean }> => {
    if (!isConfigured) {
      return { error: 'Authentication service is not configured.' };
    }

    const supabase = getSupabaseBrowserClient();
    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
        redirectTo: `${siteUrl}/reset-password`,
      });

      if (error) {
        return { error: error.message };
      }
      return { success: true };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to send password reset email.';
      return { error: msg };
    }
  };

  const updatePassword = async (newPassword: string): Promise<{ error?: string; success?: boolean }> => {
    if (!isConfigured) {
      return { error: 'Authentication service is not configured.' };
    }

    const supabase = getSupabaseBrowserClient();

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        return { error: error.message };
      }
      return { success: true };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to update password.';
      return { error: msg };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        isLoading,
        isConfigured,
        isEmailVerified,
        isOwner,
        isAdmin,
        signUp,
        signInWithEmail,
        signInWithGoogle,
        signOut,
        resendVerificationEmail,
        resetPasswordForEmail,
        updatePassword,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

