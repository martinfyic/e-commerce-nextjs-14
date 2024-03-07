import type { Metadata } from 'next';

import { inter } from '@/config/fonts';
import { Providers } from '@/components';

import './globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s - Sigma | Shop',
    default: 'Home - Sigma | Shop',
  },
  description: 'Practice of a product store with Next.js, main page',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='es'>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
