export const revalidate = 604800; // aprox 7 días

import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

import { titleFont } from '@/config/fonts';
import {
  ProductMobileSlideShow,
  ProductSlideShow,
  StockLabel,
} from '@/components/product';
import { getProductBySlug } from '@/actions';
import { AddToCart } from './ui/AddToCart';
import { currencyFormat } from '@/utils';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  // fetch data
  const product = await getProductBySlug(slug);

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  return {
    title: product?.title || 'Product not found',
    description: product?.description || '',
    openGraph: {
      title: product?.title || 'Product not found',
      description: product?.description || '',
      images: [`/products/${product?.images[1]}`],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = params;

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className='mb-20 mt-5 grid grid-cols-1 gap-3 md:mx-auto md:max-w-5xl md:grid-cols-3'>
      {/* Slideshow */}
      <div className='col-span-1 md:col-span-2'>
        {/* Desktop slideshow */}
        <ProductSlideShow
          images={product.images}
          title={product.title}
          className='hidden md:block'
        />

        {/* Mobile slideshow */}
        <ProductMobileSlideShow
          images={product.images}
          title={product.title}
          className='block md:hidden'
        />
      </div>

      {/* Detalle */}
      <div className='col-span-1 px-5'>
        <StockLabel slug={product.slug} />
        <h1 className={`${titleFont.className} text-xl font-bold antialiased`}>
          {product.title}
        </h1>
        <p className='mb-5 text-lg'>{currencyFormat(product.price)}</p>

        <AddToCart product={product} />

        {/* Descripción */}
        <h3 className='text-sm font-bold'>Descripción</h3>
        <p className='font-light'>{product.description}</p>
      </div>
    </div>
  );
}
