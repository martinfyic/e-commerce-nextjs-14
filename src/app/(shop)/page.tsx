export const revalidate = 60;

import { redirect } from 'next/navigation';

import { getPaginatedProductWithImages } from '@/actions';
import { Pagination, ProductGrid, Title } from '@/components';

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function Home({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, totalPages } = await getPaginatedProductWithImages({
    page,
  });

  if (products.length === 0) {
    redirect('/');
  }
  return (
    <>
      <Title title='Market' subTitle='All the products' className='mb-2' />

      <ProductGrid products={products} />

      <Pagination totalPages={totalPages} />
    </>
  );
}
