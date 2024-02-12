import { notFound } from 'next/navigation';

import { initialData } from '@/seed/seed';
import { titleFont } from '@/config/fonts';
import { QuantitySelector, SizeSelector } from '@/components/product';

interface Props {
  params: {
    slug: string;
  };
}

export default function ProductPage({ params }: Props) {
  const { slug } = params;

  const product = initialData.products.find((prod) => prod.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <div className='mb-20 mt-5 grid grid-cols-1 gap-3 md:grid-cols-3'>
      {/* Slideshow */}
      <div className='col-span-1 md:col-span-2'>
        <h1>{product.title}</h1>
      </div>

      {/* Detalle */}
      <div className='col-span-1 px-5'>
        <h1 className={`${titleFont.className} text-xl font-bold antialiased`}>
          {product.title}
        </h1>
        <p className='mb-5 text-lg'>${product.price}</p>

        {/* Selector de talla */}
        <SizeSelector availableSizes={product.sizes} selectedSize={product.sizes[0]} />

        {/* Selector de cantidad */}
        <QuantitySelector quantity={3} />

        {/* Botón agregar al carrito */}
        <button className='btn-primary my-5'>Add to cart</button>

        {/* Descripción */}
        <h3 className='text-sm font-bold'>Descripción</h3>
        <p className='font-light'>{product.description}</p>
      </div>
    </div>
  );
}
