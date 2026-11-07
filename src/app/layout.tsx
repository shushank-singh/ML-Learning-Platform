import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import '@/styles/globals.css';
import { AppShell } from '@/components/layout/AppShell';
import { AuthProvider } from '@/context/AuthContext';
import { PwaRegister } from '@/components/pwa/PwaRegister';

const inter = Inter({
  subsets: ['latin'],
  display: 'optional',
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  preload: false,
});

export const viewport: Viewport = {
  themeColor: '#2563eb',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'AzurLearn — From ML Foundations to Production AI',
  description:
    'Learn Machine Learning, Deep Learning, Transformers, LLMs, RAG, AI Agents, and MLOps through visual explanations, interactive labs, practical coding, and real-world projects.',
  applicationName: 'AzurLearn',
  manifest: '/manifest.webmanifest',
  icons: {
    icon: '/favicon.ico',
    apple: '/icons/apple-touch-icon.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'AzurLearn',
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function() {
              try {
                var saved = localStorage.getItem('ml_theme');
                if (saved === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            })();`,
          }}
        />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100`}>
        <AuthProvider>
          <AppShell>{children}</AppShell>
        </AuthProvider>
        <PwaRegister />
      </body>
    </html>
  );
}
