import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'E-commerce store',
  description: 'E-commerce store demo',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
