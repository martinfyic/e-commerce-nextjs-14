'use client';

import { useState } from 'react';

import { QuantitySelector, SizeSelector } from '@/components/product';
import { CartProduct, Product, Size } from '@/interfaces';
import { useCartStore } from '@/store';

interface Props {
  product: Product;
}
export const AddToCart = ({ product }: Props) => {
  const addProductToCart = useCartStore((state) => state.addProductToCart);

  const [selectedSize, setSelectedSize] = useState<Size | undefined>();
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  const [posted, setPosted] = useState<boolean>(false);

  const addToCart = () => {
    setPosted(true);
    if (!selectedSize) return;

    const cartProduct: CartProduct = {
      id: product.id,
      image: product.images[0],
      price: product.price,
      quantity: selectedQuantity,
      size: selectedSize,
      slug: product.slug,
      title: product.title,
    };

    addProductToCart(cartProduct);
    setPosted(false);
    setSelectedQuantity(1);
    setSelectedSize(undefined);
  };

  return (
    <>
      {posted && !selectedSize && (
        <p className='fade-in my-2 text-red-500'>You must select the available size</p>
      )}

      {/* Selector de talla */}
      <SizeSelector
        availableSizes={product.sizes}
        selectedSize={selectedSize}
        onSelectedSize={setSelectedSize}
      />

      {/* Selector de cantidad */}
      <QuantitySelector
        quantity={selectedQuantity}
        onQuantityChanged={setSelectedQuantity}
      />

      {/* Botón agregar al carrito */}
      <button onClick={addToCart} className='btn-primary my-5'>
        Add to cart
      </button>
    </>
  );
};
