import type { Metadata } from 'next';

import { inter } from '@/config/fonts';
import { Provider } from '@/components';

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
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
