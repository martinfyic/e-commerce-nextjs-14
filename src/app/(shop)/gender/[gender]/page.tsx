export const revalidate = 60;

import { notFound, redirect } from 'next/navigation';

import { Gender } from '@prisma/client';

import { Pagination, ProductGrid, Title } from '@/components';
import { getPaginatedProductWithImages } from '@/actions';

interface Props {
  params: {
    gender: string;
  };
  searchParams: {
    page?: string;
  };
}

const categories = ['men', 'women', 'kid', 'unisex'];

export default async function GenderPage({ params, searchParams }: Props) {
  const { gender } = params;

  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, currentPage, totalPages } = await getPaginatedProductWithImages({
    page,
    gender: gender as Gender,
  });

  if (products.length === 0) {
    redirect(`/gender/${gender}`);
  }

  const labels: Record<string, string> = {
    kid: "Kid's articles",
    men: "Men's articles",
    unisex: "Unisex's articles",
    women: "Women's articles",
  };

  if (!categories.includes(gender)) {
    notFound();
  }

  return (
    <>
      <Title title={labels[gender]} className='mb-2' />

      <ProductGrid products={products} />

      <Pagination totalPages={totalPages} />
    </>
  );
}
