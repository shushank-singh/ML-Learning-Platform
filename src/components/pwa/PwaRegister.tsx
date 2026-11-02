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
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js', { scope: '/' })
          .then((registration) => {
            // Check for service worker updates periodically
            registration.onupdatefound = () => {
              const installingWorker = registration.installing;
              if (installingWorker) {
                installingWorker.onstatechange = () => {
                  if (
                    installingWorker.state === 'installed' &&
                    navigator.serviceWorker.controller
                  ) {
                    // New content available
                    console.log('[PWA] New content is available; please refresh.');
                  }
                };
              }
            };
          })
          .catch((err) => {
            console.warn('[PWA] ServiceWorker registration error:', err);
          });
      });
    }
  }, []);

  return null;
};

