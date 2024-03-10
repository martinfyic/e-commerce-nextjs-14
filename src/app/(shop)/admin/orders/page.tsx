export const revalidate = 0;

import Link from 'next/link';
import { redirect } from 'next/navigation';

import { IoCardOutline } from 'react-icons/io5';
import clsx from 'clsx';

import { getPaginatedOrders } from '@/actions';
import { Pagination, Title } from '@/components';

export const metadata = {
  title: 'Manage Orders',
  description: 'Administrative panel for order management',
};

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function AdminOrdersPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { ok, orders = [], totalPages = 1 } = await getPaginatedOrders({ page });

  if (!ok) {
    redirect('/auth/login');
  }

  return (
    <>
      <Title title='Manage Orders' />

      <div className='mb-10'>
        <table className='min-w-full'>
          <thead className='border-b bg-gray-200'>
            <tr>
              <th
                scope='col'
                className='px-6 py-4 text-left text-sm font-medium text-gray-900'
              >
                #ID
              </th>
              <th
                scope='col'
                className='px-6 py-4 text-left text-sm font-medium text-gray-900'
              >
                User Name
              </th>
              <th
                scope='col'
                className='px-6 py-4 text-left text-sm font-medium text-gray-900'
              >
                Created At
              </th>
              <th
                scope='col'
                className='px-6 py-4 text-left text-sm font-medium text-gray-900'
              >
                Status
              </th>
              <th
                scope='col'
                className='px-6 py-4 text-left text-sm font-medium text-gray-900'
              >
                Options
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className='border-b bg-white transition duration-300 ease-in-out hover:bg-gray-100'
              >
                <td className='whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900'>
                  {order.id.split('-').at(-1)}
                </td>
                <td className='whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900'>
                  {order.OrderAddress?.firstName} {order.OrderAddress?.lastName}
                </td>
                <td className='whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900'>
                  {order.createdAt.toLocaleString()}
                </td>
                <td className='flex items-center whitespace-nowrap  px-6 py-4 text-sm font-light text-gray-900'>
                  <IoCardOutline
                    className={clsx({
                      'text-green-800': order.isPaid,
                      'text-red-500': !order.isPaid,
                    })}
                  />
                  {order.isPaid ? (
                    <span className='mx-2 text-green-800'>Paid</span>
                  ) : (
                    <span className='mx-2 text-red-500'>Unpaid</span>
                  )}
                </td>
                <td className='px-6 text-sm font-light text-gray-900 '>
                  <Link href={`/orders/${order.id}`} className='hover:underline'>
                    Ver orden
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination totalPages={totalPages} />
    </>
  );
}
