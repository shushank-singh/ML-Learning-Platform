import { createBrowserClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | null = null;

/**
 * Parses browser cookies into an array of { name, value } objects for Supabase SSR.
 */
function parseBrowserCookies(cookieStr: string): Array<{ name: string; value: string }> {
  if (!cookieStr) return [];
  return cookieStr
    .split(';')
    .map((pair) => {
      const idx = pair.indexOf('=');
      if (idx < 0) return { name: pair.trim(), value: '' };
      const name = pair.slice(0, idx).trim();
      const rawVal = pair.slice(idx + 1).trim();
      let value = rawVal;
      try {
        value = decodeURIComponent(rawVal);
      } catch {
        value = rawVal;
      }
      return { name, value };
    })
    .filter((c) => Boolean(c.name));
}

/**
 * Serializes cookies adhering strictly to Session-Only authentication behavior.
 * When removing a cookie (maxAge === 0), it sets Max-Age=0 with an epoch expiration.
 * When persisting an active session (maxAge > 0), it deliberately omits Max-Age and Expires
 * so the browser treats the cookie as a session-scoped cookie that is cleared upon closing the browser session.
 */
function serializeBrowserCookie(name: string, value: string, options: any = {}): string {
  let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
  if (options.path) cookie += `; Path=${options.path}`;
  if (options.domain) cookie += `; Domain=${options.domain}`;

  if (options.maxAge === 0) {
    // Explicit cookie invalidation / removal on sign-out
    cookie += '; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
  // Deliberately omit maxAge and expires for positive maxAge values to ensure session-only lifetime

  if (options.sameSite) {
    const s = String(options.sameSite).toLowerCase();
    if (s === 'lax') cookie += '; SameSite=Lax';
    else if (s === 'strict') cookie += '; SameSite=Strict';
    else if (s === 'none') cookie += '; SameSite=None';
  }
  if (options.secure) cookie += '; Secure';
  return cookie;
}

/**
 * Clean up any legacy or persistent auth tokens in localStorage to prevent
 * accidental long-term persistence across browser sessions.
 */
export function clearPersistentAuthStorage(): void {
  if (typeof window === 'undefined') return;
  try {
    const keysToRemove: string[] = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      if (
        key &&
        (key.startsWith('sb-') ||
          key.includes('auth-token') ||
          key.includes('supabase.auth'))
      ) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach((k) => window.localStorage.removeItem(k));
  } catch (err) {
    console.warn('[Supabase] Failed to clear persistent storage keys:', err);
  }
}

/**
 * Returns a configured singleton browser Supabase client enforcing session-only cookies.
 * Supports both standard Next.js (NEXT_PUBLIC_*) and alternate (SUPABASE_*) naming conventions.
 */
export function getSupabaseBrowserClient(): SupabaseClient {
  if (client) return client;

  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    '';

  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    '';

  if (!supabaseUrl || !supabaseAnonKey) {
    if (typeof window !== 'undefined') {
      console.warn(
        '[Supabase] Missing credentials! Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file.'
      );
    }
  }

  // Provide safe dummy URL during build/unconfigured state so client creation never throws fatal exceptions
  const safeUrl = supabaseUrl || 'https://placeholder.supabase.co';
  const safeKey = supabaseAnonKey || 'placeholder-anon-key';

  // Clear legacy tokens from persistent local storage
  clearPersistentAuthStorage();

  client = createBrowserClient(safeUrl, safeKey, {
    cookies: {
      getAll() {
        if (typeof document === 'undefined') return [];
        return parseBrowserCookies(document.cookie);
      },
      setAll(cookiesToSet) {
        if (typeof document === 'undefined') return;
        cookiesToSet.forEach(({ name, value, options }) => {
          document.cookie = serializeBrowserCookie(name, value, options);
        });
      },
    },
  });

  return client;
}

/**
 * Convenience helper to determine whether valid Supabase configuration is present.
 */
export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY;
  return Boolean(url && key && !url.includes('placeholder'));
}
