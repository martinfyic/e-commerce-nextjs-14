'use client';

import { useEffect, useState } from 'react';

import { titleFont } from '@/config/fonts';
import { getStockBySlug } from '@/actions';

interface Props {
  slug: string;
}

export const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getStock();
  }, []);

  const getStock = async () => {
    const inStock = await getStockBySlug(slug);
    setStock(inStock);
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <h2
          className={`${titleFont.className} w-28 animate-pulse rounded bg-gray-100 text-lg font-bold antialiased`}
        >
          &nbsp;
        </h2>
      ) : (
        <h2
          className={`${titleFont.className} text-lg font-bold text-gray-700 antialiased`}
        >
          Stock: {stock}
        </h2>
      )}
    </>
  );
};
