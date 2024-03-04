'use client';

import { useEffect, useState } from 'react';

import { PlaceOrderSkeleton } from './PlaceOrderSkeleton';
import { useAddressStore, useCartStore } from '@/store';
import { currencyFormat } from '@/utils';
import clsx from 'clsx';
import { placeOrder } from '@/actions';

export const PlaceOrder = () => {
  const [loaded, setLoaded] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const address = useAddressStore((state) => state.shippingAddress);
  const { itemsInCart, subTotal, tax, total } = useCartStore((state) =>
    state.getSummaryInformation()
  );
  const cart = useCartStore((state) => state.cart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <PlaceOrderSkeleton />;
  }

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);

    const productToOrder = cart.map((prod) => ({
      productId: prod.id,
      quantity: prod.quantity,
      size: prod.size,
    }));

    const resp = await placeOrder(productToOrder, address);

    setIsPlacingOrder(false);
  };

  return (
    <div className='flex flex-col rounded-xl bg-white p-3 shadow-xl sm:p-7'>
      <h2 className='mb-2 text-2xl font-semibold'>Shipping Address</h2>
      <div className='mb-10'>
        <p className='text-xl'>
          {address.firstName} {address.lastName}
        </p>
        <p>{address.address}</p>
        {address.address2 && <p>(Secondary address: {address.address2})</p>}
        <p>{address.city}</p>
        <p>{address.postalCode}</p>
        <p>{address.phone}</p>
      </div>

      {/* Divider */}
      <div className='mb-10 h-0.5 w-full rounded bg-gray-200' />

      <h2 className='mb-2 text-2xl font-semibold'>Order Summary</h2>
      <div className='grid grid-cols-2'>
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
      <div className='flex-1' />
      <div className='mb-2 mt-5 w-full'>
        <p className='mb-5'>
          {/* Disclaimer */}
          <span className='text-xs'>
            By clicking Place Order, you accept our{' '}
            <a href='#' target='_blank' rel='noopener noreferrer' className='underline'>
              terms and conditions
            </a>{' '}
            and{' '}
            <a href='#' target='_blank' rel='noopener noreferrer' className='underline'>
              privacy policies
            </a>
          </span>
        </p>
        <button
          onClick={onPlaceOrder}
          className={clsx('flex w-full justify-center', {
            'btn-primary': !isPlacingOrder,
            'btn-disabled': isPlacingOrder,
          })}
        >
          Place order
        </button>
      </div>
    </div>
  );
};
