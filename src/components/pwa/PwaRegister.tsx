'use client';

import { useEffect } from 'react';

/**
 * PwaRegister Component
 * Handles Service Worker registration for PWA installability.
 * Runs in client browser environment without blocking main thread render.
 */
export const PwaRegister: React.FC = () => {
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      window.location.protocol.startsWith('http')
    ) {
      const registerSW = () => {
        navigator.serviceWorker
          .register('/sw.js', { scope: '/' })
          .then((registration) => {
            registration.onupdatefound = () => {
              const installingWorker = registration.installing;
              if (installingWorker) {
                installingWorker.onstatechange = () => {
                  if (
                    installingWorker.state === 'installed' &&
                    navigator.serviceWorker.controller
                  ) {
                    console.log('[PWA] New content is available; please refresh.');
                  }
                };
              }
            };
          })
          .catch((err) => {
            console.warn('[PWA] ServiceWorker registration error:', err);
          });
      };

      // Defer service worker registration until main thread is idle to eliminate network competition during initial paint
      if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
        (window as any).requestIdleCallback(registerSW, { timeout: 4000 });
      } else {
        setTimeout(registerSW, 3000);
      }
    }
  }, []);

  return null;
};

