'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Product } from '@/interfaces';

interface Props {
  product: Product;
}

export const ProductGridItem = ({ product }: Props) => {
  const [displayImage, setDisplayImage] = useState(product.images[0]);

  return (
    <div className='fade-in overflow-hidden rounded-md'>
      <Link href={`/product/${product.slug}`}>
        <Image
          src={`/products/${displayImage}`}
          alt={product.title}
          className='w-full object-cover'
          width={500}
          height={500}
          onMouseEnter={() => setDisplayImage(product.images[1])}
          onMouseLeave={() => setDisplayImage(product.images[0])}
        />
      </Link>
      <div className='flex flex-col p-4'>
        <Link href={`/product/${product.slug}`} className='hover:text-slate-600'>
          {product.title}
        </Link>
        <span className='font-bold'>$ {product.price}</span>
      </div>
    </div>
  );
};
