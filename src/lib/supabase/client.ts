import { createBrowserClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | null = null;

/**
 * Returns a configured singleton browser Supabase client.
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
    // If running in development without credentials, warn cleanly
    if (typeof window !== 'undefined') {
      console.warn(
        '[Supabase] Missing credentials! Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file.'
      );
    }
  }

  // Provide dummy URL during build/unconfigured state so client creation never throws fatal exceptions
  const safeUrl = supabaseUrl || 'https://placeholder.supabase.co';
  const safeKey = supabaseAnonKey || 'placeholder-anon-key';

  client = createBrowserClient(safeUrl, safeKey);
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

