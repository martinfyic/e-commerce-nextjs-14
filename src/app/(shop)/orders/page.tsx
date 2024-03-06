export const revalidate = 0;

import Link from 'next/link';
import { redirect } from 'next/navigation';

import { IoCardOutline } from 'react-icons/io5';

import { getOrdersByUser } from '@/actions';
import { Title } from '@/components';
import clsx from 'clsx';

export default async function OrdersPage() {
  const { ok, orders = [] } = await getOrdersByUser();

  if (!ok) {
    redirect('/auth/login');
  }

  return (
    <>
      <Title title='Orders' />

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
                Nombre completo
              </th>
              <th
                scope='col'
                className='px-6 py-4 text-left text-sm font-medium text-gray-900'
              >
                Estado
              </th>
              <th
                scope='col'
                className='px-6 py-4 text-left text-sm font-medium text-gray-900'
              >
                Opciones
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
    </>
  );
}

// TODO implementar pagination
