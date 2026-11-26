import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

/**
 * Next.js Middleware for Session-Only Authentication & Route Guarding.
 *
 * Performance-optimized:
 * - Public pages (/, /pricing, /plans, etc.) skip remote auth checks completely (0ms).
 * - Unauthenticated requests without any Supabase auth cookie skip client creation.
 * - Background <Link> prefetch requests with an existing session cookie skip remote
 *   getUser() calls so sidebar/navigation prefetching stays instantaneous; actual page
 *   navigations and Server Components perform full getUser() verification.
 */
export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const pathname = request.nextUrl.pathname;

  // Skip static assets, Next internal files, manifest, and service worker
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/icons') ||
    pathname.startsWith('/api') ||
    pathname === '/manifest.webmanifest' ||
    pathname === '/sw.js' ||
    pathname === '/favicon.ico' ||
    pathname.endsWith('.png') ||
    pathname.endsWith('.jpg') ||
    pathname.endsWith('.svg') ||
    pathname.endsWith('.ico')
  ) {
    return response;
  }

  const isAuthRoute =
    pathname === '/login' ||
    pathname === '/signup' ||
    pathname === '/forgot-password' ||
    pathname === '/reset-password';

  const isProtectedRoute =
    pathname.startsWith('/curriculum') ||
    pathname.startsWith('/ai-tutor') ||
    pathname.startsWith('/code-lab') ||
    pathname.startsWith('/playground') ||
    pathname.startsWith('/revision-notes') ||
    pathname.startsWith('/quizzes') ||
    pathname.startsWith('/projects') ||
    pathname.startsWith('/notes') ||
    pathname.startsWith('/analytics') ||
    pathname.startsWith('/settings') ||
    pathname.startsWith('/dsa') ||
    pathname.startsWith('/python') ||
    pathname.startsWith('/java') ||
    pathname.startsWith('/formulas');

  // Public pages (e.g. /, /pricing, /plans) need no auth round-trip in middleware
  if (!isAuthRoute && !isProtectedRoute) {
    return response;
  }

  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    '';
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    '';

  const isConfigured = Boolean(
    supabaseUrl &&
    supabaseKey &&
    !supabaseUrl.includes('placeholder') &&
    !supabaseKey.includes('placeholder')
  );

  // If Supabase is unconfigured, allow requests through so developers see setup instructions via AuthGuard
  if (!isConfigured) {
    return response;
  }

  // Fast path: if no Supabase auth cookie exists, avoid instantiating client or calling Supabase
  const hasAuthCookie = request.cookies.getAll().some((c) => c.name.startsWith('sb-'));
  if (!hasAuthCookie) {
    if (isProtectedRoute) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set(
        'redirectTo',
        pathname + (request.nextUrl.search || '')
      );
      return NextResponse.redirect(loginUrl);
    }
    return response;
  }

  // Fast path for Next.js <Link> background prefetches when a session cookie is present;
  // full Server Components & non-prefetch navigations still verify via supabase.auth.getUser().
  const isPrefetch =
    request.headers.get('next-router-prefetch') === '1' ||
    request.headers.get('purpose') === 'prefetch';
  if (isPrefetch && isProtectedRoute) {
    return response;
  }

  // Create server client tied to the current request cookies
  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        // Enforce Session-Only cookie lifecycle
        if (options && typeof options.maxAge === 'number' && options.maxAge > 0) {
          const { maxAge, expires, ...sessionOptions } = options;
          request.cookies.set({ name, value });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({ name, value, ...sessionOptions });
        } else {
          request.cookies.set({ name, value });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({ name, value, ...options });
        }
      },
      remove(name: string, options: CookieOptions) {
        request.cookies.set({ name, value: '' });
        response = NextResponse.next({
          request: {
            headers: request.headers,
          },
        });
        response.cookies.set({ name, value: '', ...options, maxAge: 0 });
      },
    },
  });

  // Verify authenticated session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If authenticated user visits login/signup, redirect to curriculum
  if (user && isAuthRoute) {
    const rawRedirect = request.nextUrl.searchParams.get('redirectTo') || '/curriculum';
    const safeRedirect =
      rawRedirect.startsWith('/') && !rawRedirect.startsWith('//')
        ? rawRedirect
        : '/curriculum';
    return NextResponse.redirect(new URL(safeRedirect, request.url));
  }

  // If unauthenticated user visits protected route, redirect to login with intended destination
  if (!user && isProtectedRoute) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set(
      'redirectTo',
      pathname + (request.nextUrl.search || '')
    );
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|manifest.webmanifest|icons/.*).*)',
  ],
};
