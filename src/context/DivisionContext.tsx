'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export type PlatformDivision = 'engineering' | 'doctor';

interface DivisionContextValue {
  division: PlatformDivision;
  setDivision: (next: PlatformDivision, options?: { navigateHome?: boolean }) => void;
}

const STORAGE_KEY = 'azurlearn_active_division';

const DivisionContext = createContext<DivisionContextValue>({
  division: 'engineering',
  setDivision: () => {},
});

export const DivisionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname() || '/';
  const router = useRouter();
  const [division, setDivisionState] = useState<PlatformDivision>('engineering');

  // Sync division from route, query parameter, or saved preference
  useEffect(() => {
    if (pathname === '/doctor' || pathname.startsWith('/doctor/')) {
      setDivisionState('doctor');
      return;
    }
    if (pathname === '/engineering' || pathname.startsWith('/engineering/')) {
      setDivisionState('engineering');
      return;
    }

    // Any existing engineering learning routes force engineering context
    if (
      pathname.startsWith('/curriculum') ||
      pathname.startsWith('/dsa') ||
      pathname.startsWith('/python') ||
      pathname.startsWith('/java') ||
      pathname.startsWith('/playground') ||
      pathname.startsWith('/code-lab') ||
      pathname.startsWith('/projects') ||
      pathname.startsWith('/formulas')
    ) {
      setDivisionState('engineering');
      return;
    }

    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const paramDiv = params.get('division');
      if (paramDiv === 'doctor' || paramDiv === 'engineering') {
        setDivisionState(paramDiv);
        try {
          localStorage.setItem(STORAGE_KEY, paramDiv);
        } catch {}
        return;
      }

      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved === 'doctor' || saved === 'engineering') {
          setDivisionState(saved);
        }
      } catch {}
    }
  }, [pathname]);

  const setDivision = useCallback(
    (next: PlatformDivision, options?: { navigateHome?: boolean }) => {
      setDivisionState(next);
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(STORAGE_KEY, next);
        } catch {}
      }

      const isDashboardRoute =
        pathname === '/' || pathname === '/engineering' || pathname === '/doctor';

      if (options?.navigateHome || !isDashboardRoute) {
        router.push(`/?division=${next}`);
        return;
      }

      if (pathname === '/engineering' && next === 'doctor') {
        router.push('/doctor');
        return;
      }
      if (pathname === '/doctor' && next === 'engineering') {
        router.push('/engineering');
        return;
      }

      if (typeof window !== 'undefined' && pathname === '/') {
        const url = new URL(window.location.href);
        url.searchParams.set('division', next);
        window.history.replaceState({}, '', url.toString());
      }
    },
    [pathname, router]
  );

  return (
    <DivisionContext.Provider value={{ division, setDivision }}>
      {children}
    </DivisionContext.Provider>
  );
};

export function useDivision() {
  return useContext(DivisionContext);
}
