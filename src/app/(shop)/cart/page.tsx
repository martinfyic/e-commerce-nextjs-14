import Link from 'next/link';

import { Title } from '@/components';
import { OrderSummary, ProductsInCart } from './ui';

export default function CartPage() {
  return (
    <div className='mb-72 flex items-center justify-center px-10 sm:px-0'>
      <div className='flex w-[1000px] flex-col'>
        <Title title='Shopping Cart' />

        <div className='grid grid-cols-1 gap-10 sm:grid-cols-2'>
          {/* Cart */}
          <div className='mt-5 flex flex-col'>
            <span className='text-xl'>Items in cart</span>
            <Link href='/' className='mb-5 underline'>
              Continue shopping
            </Link>

            {/* Items Cart */}
            <ProductsInCart />
          </div>

          {/* Checkout */}
          <div className='flex h-fit flex-col rounded-xl bg-white p-3 shadow-xl sm:p-7'>
            <h2 className='mb-2 text-2xl font-semibold'>Order Summary</h2>
            <OrderSummary />
            <div className='mb-2 mt-5 w-full'>
              <Link href='/checkout/address' className='btn-primary flex justify-center'>
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
