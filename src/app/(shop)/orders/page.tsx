// https://tailwindcomponents.com/component/hoverable-table
import { Title } from '@/components';

import Link from 'next/link';
import { IoCardOutline } from 'react-icons/io5';

export default function OrdersPage() {
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
            <tr className='border-b bg-white transition duration-300 ease-in-out hover:bg-gray-100'>
              <td className='whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900'>
                1
              </td>
              <td className='whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900'>
                Mark
              </td>
              <td className='flex items-center whitespace-nowrap  px-6 py-4 text-sm font-light text-gray-900'>
                <IoCardOutline className='text-green-800' />
                <span className='mx-2 text-green-800'>Pagada</span>
              </td>
              <td className='px-6 text-sm font-light text-gray-900 '>
                <Link href='/orders/123' className='hover:underline'>
                  Ver orden
                </Link>
              </td>
            </tr>

            <tr className='border-b bg-white transition duration-300 ease-in-out hover:bg-gray-100'>
              <td className='whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900'>
                1
              </td>
              <td className='whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900'>
                Mark
              </td>
              <td className='flex items-center whitespace-nowrap  px-6 py-4 text-sm font-light text-gray-900'>
                <IoCardOutline className='text-red-800' />
                <span className='mx-2 text-red-800'>No Pagada</span>
              </td>
              <td className='px-6 text-sm font-light text-gray-900 '>
                <Link href='/orders/123' className='hover:underline'>
                  Ver orden
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
