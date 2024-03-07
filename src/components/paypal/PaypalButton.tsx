'use client';

import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import type { CreateOrderData, CreateOrderActions } from '@paypal/paypal-js';

import { PaypalButtonSkeleton } from './PaypalButtonSkeleton';
import { setTransactionId } from '@/actions';

interface Props {
  orderId: string;
  amount: number;
}

export const PaypalButton = ({ amount, orderId }: Props) => {
  const [{ isPending }] = usePayPalScriptReducer();

  const roundedAmount = (Math.round(amount * 100) / 100).toString();

  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions
  ): Promise<string> => {
    const transactionId = await actions.order.create({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: roundedAmount,
          },
        },
      ],
    });

    const { ok, message } = await setTransactionId(transactionId, orderId);

    if (!ok) {
      throw new Error(message);
    }

    return transactionId;
  };

  return (
    <>
      {isPending ? <PaypalButtonSkeleton /> : null}
      <PayPalButtons createOrder={createOrder} />
    </>
  );
};
