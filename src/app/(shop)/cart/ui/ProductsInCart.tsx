'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { useCartStore } from '@/store';
import { QuantitySelector } from '@/components';
import { currencyFormat } from '@/utils/currencyFormat';
import { ProductsInCartSkeleton } from './ProductsInCartSkeleton';

export const ProductsInCart = () => {
  const [loaded, setLoaded] = useState(false);
  const productsInCart = useCartStore((store) => store.cart);
  const updateProductQuantity = useCartStore((store) => store.updateProductQuantity);
  const removeProduct = useCartStore((store) => store.removeProduct);

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
          <Link href={`/product/${prod.slug}`}>
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
          </Link>

          <div>
            <Link
              href={`/product/${prod.slug}`}
              className='hover:underline hover:opacity-70'
            >
              <p className='font-semibold'>
                {prod.size} - {prod.title}
              </p>
            </Link>
            <p>{currencyFormat(prod.price)}</p>
            <QuantitySelector
              quantity={prod.quantity}
              onQuantityChanged={(quantity) => updateProductQuantity(prod, quantity)}
            />
            <button className='mt-3 underline' onClick={() => removeProduct(prod)}>
              Remove
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
