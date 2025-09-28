import type { Metadata } from 'next';

import { ClerkProvider } from '@clerk/nextjs';
import { Geist, Geist_Mono } from 'next/font/google';
import '../globals.css';
import Header from '@/components/Header';
import { SanityLive } from '@/sanity/lib/live';
import { Toaster } from 'react-hot-toast';

import { VisualEditing } from 'next-sanity';
import { draftMode } from 'next/headers';
import DisableDraftModeBtn from '@/components/DisableDraftModeBtn';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'E-commerce store',
  description: 'E-commerce store demo',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider dynamic>
      <html lang='en'>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {(await draftMode()).isEnabled && (
            <>
              <VisualEditing />
              <DisableDraftModeBtn />
            </>
          )}
          <main>
            <Header />
            {children}
            <Toaster />
          </main>
          <SanityLive />
        </body>
      </html>
    </ClerkProvider>
  );
}
