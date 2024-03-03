import Link from 'next/link';
import Image from 'next/image';

import { IoCartOutline } from 'react-icons/io5';

import { Title } from '@/components';
import { ProductsInCart } from './ui/ProductsInCart';
import { PlaceOrder } from './ui/PlaceOrder';

export const metadata = {
  title: 'Check Order',
  description: 'On this page the customer will review the purchase order',
};

export default function CheckoutPage() {
  return (
    <div className='mb-72 flex items-center justify-center px-10 sm:px-0'>
      <div className='flex w-[1000px] flex-col'>
        <Title title='Check Order' />

        <div className='grid grid-cols-1 gap-10 sm:grid-cols-2'>
          {/* Cart */}
          <div className='mt-5 flex flex-col'>
            <span className='text-xl'>Adjust items</span>
            <Link
              href='/cart'
              className='mb-5 flex flex-row items-center gap-1 px-4 py-2 underline transition-all duration-300 hover:font-semibold'
            >
              Edit cart
              <IoCartOutline size={20} />
            </Link>

            {/* Items Cart */}
            <ProductsInCart />
          </div>

          {/* Checkout */}
          <PlaceOrder />
        </div>
      </div>
    </div>
  );
}
