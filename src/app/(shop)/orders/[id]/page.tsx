import Link from 'next/link';
import Image from 'next/image';

import clsx from 'clsx';
import { IoCardOutline } from 'react-icons/io5';

import { Title } from '@/components';
import { initialData } from '@/seed/seed';

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

interface Props {
  params: {
    id: string;
  };
}

export default function OrderPage({ params }: Props) {
  const { id } = params;

  //TODO verificar si id corresponde al user

  return (
    <div className='mb-72 flex items-center justify-center px-10 sm:px-0'>
      <div className='flex w-[1000px] flex-col'>
        <Title title={`Order #${id}`} />

        <div className='grid grid-cols-1 gap-10 sm:grid-cols-2'>
          {/* Cart */}
          <div className='mt-5 flex flex-col'>
            <div
              className={clsx(
                'mb-5 flex items-center rounded-lg px-3.5 py-2 text-xs font-bold text-white',
                {
                  'bg-red-500': false,
                  'bg-green-500': true,
                }
              )}
            >
              <IoCardOutline size={25} />
              {/* <span className='mx-2'>Pending Payment</span> */}
              <span className='mx-2'>Order Paid</span>
            </div>

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
              <div
                className={clsx(
                  'mb-5 flex items-center rounded-lg px-3.5 py-2 text-xs font-bold text-white',
                  {
                    'bg-red-500': false,
                    'bg-green-500': true,
                  }
                )}
              >
                <IoCardOutline size={25} />
                {/* <span className='mx-2'>Pending Payment</span> */}
                <span className='mx-2'>Order Paid</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
