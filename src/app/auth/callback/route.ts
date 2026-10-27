import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const tokenHash = requestUrl.searchParams.get('token_hash');
  const type = requestUrl.searchParams.get('type');
  const next = requestUrl.searchParams.get('next') || '/curriculum';

  // Prevent open redirect attacks by ensuring next is a relative URL
  const safeNext = next.startsWith('/') && !next.startsWith('//') ? next : '/curriculum';

  if (code) {
    const supabase = getSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(new URL(safeNext, requestUrl.origin));
    }
    console.error('[Auth Callback] Code exchange error:', error.message);
  } else if (tokenHash && type) {
    const supabase = getSupabaseServerClient();
    const { error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: type as any,
    });
    if (!error) {
      return NextResponse.redirect(new URL(safeNext, requestUrl.origin));
    }
    console.error('[Auth Callback] OTP verification error:', error.message);
  }

  // If code exchange failed or no code provided, redirect to login with notification
  return NextResponse.redirect(
    new URL(`/login?error=${encodeURIComponent('Authentication callback failed. Please try signing in again.')}`, requestUrl.origin)
  );
}

