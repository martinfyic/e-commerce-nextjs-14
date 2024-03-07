'use client';

import { SessionProvider } from 'next-auth/react';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

interface Props {
  children: React.ReactNode;
}

// PayPal config
const initialOptions = {
  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? '',
};

export const Providers = ({ children }: Props) => {
  return (
    <PayPalScriptProvider options={initialOptions}>
      <SessionProvider>{children}</SessionProvider>
    </PayPalScriptProvider>
  );
};
