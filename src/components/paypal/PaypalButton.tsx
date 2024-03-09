'use client';

import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import type {
  CreateOrderData,
  CreateOrderActions,
  OnApproveData,
  OnApproveActions,
} from '@paypal/paypal-js';

import { PaypalButtonSkeleton } from './PaypalButtonSkeleton';
import { paypalCheckPayment, setTransactionId } from '@/actions';

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
          invoice_id: orderId,
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

  const onApprove = async (
    data: OnApproveData,
    actions: OnApproveActions
  ): Promise<void> => {
    const details = await actions.order?.capture();
    if (!details || !details.id) return;

    // llamamos nuestro server action para realizar la comprobación, el details.id es el transactionId que asociamos a la order.
    await paypalCheckPayment(details.id);
  };

  return (
    <div className='relative z-0'>
      {isPending ? <PaypalButtonSkeleton /> : null}
      <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
    </div>
  );
};
