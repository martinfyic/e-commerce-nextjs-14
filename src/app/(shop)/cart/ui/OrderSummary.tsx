'use client';

import { useEffect, useState } from 'react';

import { useCartStore } from '@/store';
import { currencyFormat } from '@/utils';
import { OrderSummarySkeleton } from './OrderSummarySkeleton';

export const OrderSummary = () => {
  const [loaded, setLoaded] = useState(false);

  const { itemsInCart, subTotal, tax, total } = useCartStore((store) =>
    store.getSummaryInformation()
  );

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <OrderSummarySkeleton />;
  }

  return (
    <div className='mt-2 grid grid-cols-2'>
      <span className='mb-2 text-left'>Nro of Products</span>
      <span className='mb-2 text-right'>
        {itemsInCart === 1 ? '1 Article' : `${itemsInCart} Articles`}
      </span>

      <span className='mb-2 text-left'>Subtotal</span>
      <span className='mb-2 text-right'>{currencyFormat(subTotal)}</span>

      <span className='mb-2 text-left'>Taxes 22%</span>
      <span className='mb-2 text-right'>{currencyFormat(tax)}</span>

      <span className='mt-5 text-left text-xl font-semibold'>Total</span>
      <span className='mt-5 text-right text-xl font-semibold'>
        {currencyFormat(total)}
      </span>
    </div>
  );
};
