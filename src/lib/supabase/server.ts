import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { SupabaseClient } from '@supabase/supabase-js';

/**
 * Creates a server-side Supabase client for Route Handlers, Server Actions, and Server Components.
 * Enforces session-only cookie lifetime by stripping persistent maxAge so that cookies
 * are discarded when the browser session terminates.
 */
export function getSupabaseServerClient(): SupabaseClient {
  const cookieStore = cookies();

  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    'https://placeholder.supabase.co';

  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    'placeholder-anon-key';

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        try {
          // Enforce session-only cookies: if maxAge > 0, strip maxAge and expires
          if (options && typeof options.maxAge === 'number' && options.maxAge > 0) {
            const { maxAge, expires, ...sessionOptions } = options;
            cookieStore.set({ name, value, ...sessionOptions });
          } else {
            cookieStore.set({ name, value, ...options });
          }
        } catch {
          // Can be safely ignored if called from a Server Component
        }
      },
      remove(name: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value: '', ...options, maxAge: 0 });
        } catch {
          // Can be safely ignored if called from a Server Component
        }
      },
    },
  });
}
