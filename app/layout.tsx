import type { Metadata } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ThemeProvider } from '@/hooks/useTheme';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nexvoracaptions.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'NexVora Captions — Find the Perfect Caption',
    template: '%s · NexVora Captions',
  },
  description: 'Discover thousands of captions for every mood, moment and social platform.',
  openGraph: {
    title: 'NexVora Captions',
    description: 'Discover thousands of captions for every mood, moment and social platform.',
    url: SITE_URL,
    siteName: 'NexVora Captions',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NexVora Captions',
    description: 'Discover thousands of captions for every mood, moment and social platform.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col font-body antialiased">
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
