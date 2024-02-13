import Link from 'next/link';

import { Title } from '@/components';

export const metadata = {
  title: 'Shipping Address',
  description: 'On this page you will find the address form for shipping the product.',
};

export default function AddressPage() {
  return (
    <div className='mb-72 flex flex-col px-10 sm:items-center sm:justify-center sm:px-0'>
      <div className='flex  w-full flex-col justify-center text-left xl:w-[1000px]'>
        <Title title='Address' subTitle='Shipping address' />

        <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-5'>
          <div className='mb-2 flex flex-col'>
            <span>Name</span>
            <input type='text' className='rounded-md border bg-gray-200 p-2' />
          </div>

          <div className='mb-2 flex flex-col'>
            <span>Last Name</span>
            <input type='text' className='rounded-md border bg-gray-200 p-2' />
          </div>

          <div className='mb-2 flex flex-col'>
            <span>Address</span>
            <input type='text' className='rounded-md border bg-gray-200 p-2' />
          </div>

          <div className='mb-2 flex flex-col'>
            <span>Address 2 (optional)</span>
            <input type='text' className='rounded-md border bg-gray-200 p-2' />
          </div>

          <div className='mb-2 flex flex-col'>
            <span>Postal Code</span>
            <input type='text' className='rounded-md border bg-gray-200 p-2' />
          </div>

          <div className='mb-2 flex flex-col'>
            <span>City</span>
            <input type='text' className='rounded-md border bg-gray-200 p-2' />
          </div>

          <div className='mb-2 flex flex-col'>
            <span>Country</span>
            <select className='rounded-md border bg-gray-200 p-2'>
              <option value=''>[ Seleccione ]</option>
              <option value='UYU'>Uruguay</option>
            </select>
          </div>

          <div className='mb-2 flex flex-col'>
            <span>Phone</span>
            <input type='text' className='rounded-md border bg-gray-200 p-2' />
          </div>

          <div className='mb-2 flex flex-col sm:mt-10'>
            <Link
              href='/checkout'
              className='btn-primary flex w-full justify-center sm:w-1/2 '
            >
              Next
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
