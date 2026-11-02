import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import { AppShell } from '@/components/layout/AppShell';
import { AuthProvider } from '@/context/AuthContext';
import { PwaRegister } from '@/components/pwa/PwaRegister';

export const viewport: Viewport = {
  themeColor: '#2563eb',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'Complete Tech Learning Academy — From ML Foundations to Production AI',
  description:
    'Learn Machine Learning, Deep Learning, Transformers, ,DSA, Python,Java,LLMs, RAG, AI Agents, and MLOps through visual explanations, interactive labs, practical coding, and real-world projects.',
  applicationName: 'Complete Tech Learning Academy',
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48', type: 'image/png' },
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Learning Academy',
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100">
        <AuthProvider>
          <AppShell>{children}</AppShell>
        </AuthProvider>
        <PwaRegister />
      </body>
    </html>
  );
}
