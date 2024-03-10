export const revalidate = 0;

import Link from 'next/link';

import { IoAddCircleOutline } from 'react-icons/io5';

import { getPaginatedProductWithImages } from '@/actions';
import { Pagination, ProductImage, Title } from '@/components';
import { currencyFormat } from '@/utils/currencyFormat';

export const metadata = {
  title: 'Manage Products',
  description: 'Administrative panel for product management',
};

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function AdminProductsPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, totalPages } = await getPaginatedProductWithImages({
    page,
  });

  return (
    <>
      <Title title='Manage Products' />

      <div className='mb-5 flex items-center justify-end'>
        <Link
          href='/admin/product/new'
          className='btn-primary flex flex-row items-center gap-2'
        >
          New Product
          <IoAddCircleOutline size={30} />
        </Link>
      </div>

      <div className='mb-10'>
        <table className='min-w-full'>
          <thead className='border-b bg-gray-200'>
            <tr>
              <th
                scope='col'
                className='px-6 py-4 text-left text-sm font-medium text-gray-900'
              >
                Image
              </th>
              <th
                scope='col'
                className='px-6 py-4 text-left text-sm font-medium text-gray-900'
              >
                Title
              </th>
              <th
                scope='col'
                className='px-6 py-4 text-left text-sm font-medium text-gray-900'
              >
                Price
              </th>
              <th
                scope='col'
                className='px-6 py-4 text-left text-sm font-medium text-gray-900'
              >
                Gender
              </th>
              <th
                scope='col'
                className='px-6 py-4 text-left text-sm font-medium text-gray-900'
              >
                Stock
              </th>
              <th
                scope='col'
                className='px-6 py-4 text-left text-sm font-medium text-gray-900'
              >
                Sizes
              </th>
              <th
                scope='col'
                className='px-6 py-4 text-center text-sm font-medium text-gray-900'
              >
                Options
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr
                key={prod.id}
                className='border-b bg-white transition duration-300 ease-in-out hover:bg-gray-100'
              >
                <td className='whitespace-nowrap px-6 py-4'>
                  <Link href={`/product/${prod.slug}`}>
                    <ProductImage
                      src={prod.ProductImage[0]?.url}
                      alt={prod.title}
                      width={80}
                      height={80}
                      className='h-20 w-20 rounded-md object-cover'
                    />
                  </Link>
                </td>
                <td className='whitespace-nowrap px-6 py-4 text-sm font-semibold text-gray-900'>
                  <Link href={`/product/${prod.slug}`} className='hover:underline'>
                    {prod.title}
                  </Link>
                </td>
                <td className='whitespace-nowrap px-6 py-4 text-sm font-semibold text-gray-900'>
                  {currencyFormat(prod.price)}
                </td>
                <td className=' whitespace-nowrap  px-6 py-4 text-sm font-semibold uppercase text-gray-900'>
                  {prod.gender}
                </td>
                <td className='px-6 text-sm font-semibold text-gray-900'>
                  {prod.inStock}
                </td>
                <td className='px-6 text-sm font-semibold text-gray-900'>
                  {prod.sizes.join(', ')}
                </td>
                <td className='px-6 text-sm font-semibold text-gray-900'>
                  <Link
                    href={`/admin/product/${prod.slug}`}
                    className='mx-1 rounded-md bg-orange-300 px-4 py-2 transition-all duration-300 hover:bg-orange-600'
                  >
                    Edit
                  </Link>
                  <Link
                    href='#'
                    className='mx-1 rounded-md bg-red-300 px-4 py-2 transition-all duration-300 hover:bg-red-600'
                  >
                    Delete
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
