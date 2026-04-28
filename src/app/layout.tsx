import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import ServiceWorkerProvider from '@/components/ServiceWorkerProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Habit Tracker',
  description: 'Track your habits daily',

  manifest: '/manifest.json',

  themeColor: '#2563eb',

  icons: {
    icon: '/icons/icon-192.png',
    apple: '/icons/icon-192.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen bg-linear-to-br from-blue-50 via-blue-100 to-blue-200 flex items-center justify-center">
        <ServiceWorkerProvider />
        <main className="w-full max-w-4xl p-4">{children}</main>
      </body>
    </html>
  );
}
