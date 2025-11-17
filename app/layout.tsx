
import type { Metadata } from 'next';
import { Inter, Orbitron, Rajdhani } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });
const orbitron = Orbitron({ 
  subsets: ['latin'],
  variable: '--font-orbitron'
});
const rajdhani = Rajdhani({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-rajdhani'
});

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'DiskHound - Never Lose A Disk Again | NFC Disc Golf Trackers',
  description: 'Stop losing expensive discs! DiskHound NFC trackers help you find your discs instantly with smartphone alerts. Waterproof, lightweight, and works with iPhone 7+ & Android 4.0+. Starting at $9.99.',
  keywords: 'disc golf tracker, NFC sticker, lost disc finder, disc golf accessories, disc tracking, iPhone disc golf, Android disc golf',
  openGraph: {
    title: 'DiskHound - Never Lose A Disk Again',
    description: 'Stop losing expensive discs! NFC trackers with instant phone alerts. Find discs in seconds.',
    url: 'https://diskhound.com',
    siteName: 'DiskHound',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'DiskHound NFC Disc Golf Trackers'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DiskHound - Never Lose A Disk Again',
    description: 'NFC disc golf trackers with instant phone alerts. Find discs in seconds.',
    images: ['/og-image.png']
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg'
  },
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'https://diskhound.com'),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#00ffff" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="DiscHound" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </head>
      <body className={`${inter.className} ${orbitron.variable} ${rajdhani.variable}`}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
