import { notFound } from 'next/navigation';

import { initialData } from '@/seed/seed';
import { ProductGrid, Title } from '@/components';
import { Category } from '@/interfaces';

const seedProducts = initialData.products;

interface Props {
  params: {
    id: Category;
  };
}

const categories = ['men', 'women', 'kid', 'unisex'];

export default function CategoryPage({ params }: Props) {
  const { id } = params;
  const products = seedProducts.filter((product) => product.gender === id);

  const labels: Record<Category, string> = {
    kid: "Kid's articles",
    men: "Men's articles",
    unisex: "Unisex's articles",
    women: "Women's articles",
  };

  if (!categories.includes(id)) {
    notFound();
  }

  return (
    <>
      <Title title={labels[id]} className='mb-2' />

      <ProductGrid products={products} />
    </>
  );
}
