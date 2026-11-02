/**
 * Complete Tech Learning Academy - Safe PWA Service Worker
 *
 * Strict Compliance:
 * - NO caching of authenticated pages or Supabase session tokens
 * - NO caching of API responses (/api/*)
 * - NO caching of AI Tutor conversations or streaming endpoints
 * - NO caching of private user progress or settings
 * - Pass-through network strategy for all dynamic requests
 */

const CACHE_NAME = 'ctla-static-v1';
const STATIC_ASSETS = [
  '/',
  '/manifest.webmanifest',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/icons/apple-touch-icon.png',
  '/favicon.ico',
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Pre-cache only public static branding assets; ignore failures gracefully
      return Promise.allSettled(
        STATIC_ASSETS.map((url) =>
          fetch(url, { cache: 'no-cache' })
            .then((res) => {
              if (res.ok) return cache.put(url, res);
            })
            .catch(() => {})
        )
      );
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // 1. Never intercept or cache non-GET requests (mutations, posts, etc.)
  if (event.request.method !== 'GET') {
    return;
  }

  // 2. Never intercept or cache Supabase auth or API calls
  if (
    url.hostname.includes('supabase.co') ||
    url.pathname.startsWith('/api/') ||
    url.pathname.startsWith('/auth/') ||
    url.pathname.startsWith('/ai-tutor')
  ) {
    return;
  }

  // 3. For public static icons & manifest: Stale-while-revalidate / Cache fallback
  if (
    url.pathname.startsWith('/icons/') ||
    url.pathname === '/manifest.webmanifest' ||
    url.pathname === '/manifest.json' ||
    url.pathname === '/favicon.ico'
  ) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        const fetchPromise = fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const resClone = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(event.request, resClone));
            }
            return networkResponse;
          })
          .catch(() => cached);
        return cached || fetchPromise;
      })
    );
    return;
  }

  // 4. For HTML navigations & all other requests: Network-first
  // Avoid breaking dynamic progress, fresh server state, or Supabase cookies
  event.respondWith(
    fetch(event.request).catch(async () => {
      // If offline and request is an HTML page navigation, fallback to cached root if available
      if (event.request.mode === 'navigate') {
        const cachedHome = await caches.match('/');
        if (cachedHome) return cachedHome;
      }
      return new Response('Network unavailable. Please reconnect to access the academy.', {
        status: 503,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      });
    })
  );
});

