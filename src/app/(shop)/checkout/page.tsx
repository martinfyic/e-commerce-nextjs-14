import Link from 'next/link';
import Image from 'next/image';

import { Title } from '@/components';
import { initialData } from '@/seed/seed';

export const metadata = {
  title: 'Check Order',
  description: 'On this page the customer will review the purchase order',
};

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

export default function CheckoutPage() {
  return (
    <div className='mb-72 flex items-center justify-center px-10 sm:px-0'>
      <div className='flex w-[1000px] flex-col'>
        <Title title='Check Order' />

        <div className='grid grid-cols-1 gap-10 sm:grid-cols-2'>
          {/* Cart */}
          <div className='mt-5 flex flex-col'>
            <span className='text-xl'>Adjust items</span>
            <Link href='/cart' className='mb-5 underline'>
              Edit cart
            </Link>

            {/* Items Cart */}
            {productsInCart.map((prod) => (
              <div key={prod.slug} className='my-2 flex'>
                <Image
                  src={`/products/${prod.images[0]}`}
                  alt={prod.title}
                  width={100}
                  height={100}
                  style={{
                    width: '100px',
                    height: '100px',
                  }}
                  className='mr-5 rounded'
                />
                <div>
                  <p>{prod.title}</p>
                  <p>${prod.price} x 1</p>
                  <p className='mt-1 font-semibold'>Subtotal: ${prod.price}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout */}
          <div className='flex flex-col rounded-xl bg-white p-3 shadow-xl sm:p-7'>
            <h2 className='mb-2 text-2xl font-semibold'>Shipping Address</h2>
            <div className='mb-10'>
              <p className='text-xl'>Martin Ferreira</p>
              <p>Av. Uruguay 1212</p>
              <p>Montevideo</p>
              <p>CP 10235</p>
              <p>+598 99 235 235</p>
            </div>

            {/* Divider */}
            <div className='mb-10 h-0.5 w-full rounded bg-gray-200' />

            <h2 className='mb-2 text-2xl font-semibold'>Order Summary</h2>
            <div className='grid grid-cols-2'>
              <span className='mb-2 text-left'>Nro of Products</span>
              <span className='mb-2 text-right'>3 Articles</span>

              <span className='mb-2 text-left'>Subtotal</span>
              <span className='mb-2 text-right'>$ 125</span>

              <span className='mb-2 text-left'>Taxes 22%</span>
              <span className='mb-2 text-right'>$ 27,5</span>

              <span className='mt-5 text-left text-2xl'>Total</span>
              <span className='mt-5 text-right text-2xl'>$ 152,5</span>
            </div>
            <div className='flex-1' />
            <div className='mb-2 mt-5 w-full'>
              <p className='mb-5'>
                {/* Disclaimer */}
                <span className='text-xs'>
                  By clicking Place Order, you accept our{' '}
                  <a
                    href='#'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='underline'
                  >
                    terms and conditions
                  </a>{' '}
                  and{' '}
                  <a
                    href='#'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='underline'
                  >
                    privacy policies
                  </a>
                </span>
              </p>
              <Link href='/orders/24551' className='btn-primary flex justify-center'>
                Place order
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
