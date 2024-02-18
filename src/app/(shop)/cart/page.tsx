import Link from 'next/link';
import Image from 'next/image';

import { Title } from '@/components';
import { initialData } from '@/seed/seed';
import { QuantitySelector } from '@/components/product';

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

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
                  <p>${prod.price}</p>
                  <QuantitySelector quantity={2} />
                  <button className='mt-3 underline'>Remove</button>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout */}
          <div className='flex h-fit flex-col rounded-xl bg-white p-3 shadow-xl sm:p-7'>
            <h2 className='mb-2 text-2xl font-semibold'>Order Summary</h2>
            <div className='grid grid-cols-2'>
              <span className='mb-2 text-left'>Nro of Products</span>
              <span className='mb-2 text-right'>3 Articles</span>

              <span className='mb-2 text-left'>Subtotal</span>
              <span className='mb-2 text-right'>$ 125</span>

              <span className='mb-2 text-left'>Taxes 22%</span>
              <span className='mb-2 text-right'>$ 27,5</span>

              <span className='mt-5 text-left text-xl font-semibold'>Total</span>
              <span className='mt-5 text-right text-xl font-semibold'>$ 152,5</span>
            </div>
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
