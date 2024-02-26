export const revalidate = 60;

import { notFound, redirect } from 'next/navigation';

import { Gender } from '@prisma/client';

import { Pagination, ProductGrid, Title } from '@/components';
import { getPaginatedProductWithImages } from '@/actions';
import { Metadata, ResolvingMetadata } from 'next';

interface Props {
  params: {
    gender: string;
  };
  searchParams: {
    page?: string;
  };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const gender = params.gender;

  return {
    title: `${gender.toLocaleUpperCase()}'s` || 'Product not found',
    description: `All ${gender}'s items` || '',
  };
}

const categories = ['men', 'women', 'kid', 'unisex'];

export default async function GenderPage({ params, searchParams }: Props) {
  const { gender } = params;

  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, totalPages } = await getPaginatedProductWithImages({
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
