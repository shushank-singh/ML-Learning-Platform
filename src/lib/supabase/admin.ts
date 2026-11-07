import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Creates a privileged Supabase client using SUPABASE_SERVICE_ROLE_KEY.
 *
 * CRITICAL SECURITY INVARIANTS:
 * 1. This client must ONLY be instantiated inside secure server-side Node.js runtimes
 *    (Route Handlers, Webhooks, and Lifecycle daemons).
 * 2. It must NEVER be imported by or exposed to client components or browser bundles.
 * 3. SUPABASE_SERVICE_ROLE_KEY bypasses Row Level Security and is required for
 *    idempotent payment recording and entitlement provisioning.
 */
let adminClientInstance: SupabaseClient | null = null;

export function getSupabaseAdminClient(): SupabaseClient | null {
  const supabaseUrl =
    process.env.SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    '';

  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SERVICE_KEY ||
    '';

  if (!supabaseUrl || !serviceRoleKey) {
    return null;
  }

  if (!adminClientInstance) {
    adminClientInstance = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }

  return adminClientInstance;
}
