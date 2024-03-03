'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import { useCartStore } from '@/store';
import { currencyFormat } from '@/utils/currencyFormat';
import { ProductsInCartSkeleton } from './ProductsInCartSkeleton';

export const ProductsInCart = () => {
  const [loaded, setLoaded] = useState(false);
  const productsInCart = useCartStore((store) => store.cart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <ProductsInCartSkeleton />;
  }

  return (
    <>
      {productsInCart.map((prod) => (
        <div key={`${prod.slug}-${prod.size}`} className='my-2 flex'>
          <Image
            src={`/products/${prod.image}`}
            alt={prod.title}
            width={100}
            height={100}
            style={{
              width: '100px',
              height: '100px',
            }}
            className='mr-5 rounded shadow-md'
          />

          <div>
            <span>
              <p className='font-semibold'>
                {prod.size} - {prod.title} ({prod.quantity})
              </p>
            </span>
            <p>{currencyFormat(prod.price)}</p>
          </div>
        </div>
      ))}
    </>
  );
};
