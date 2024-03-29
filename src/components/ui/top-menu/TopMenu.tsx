'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import { IoCartOutline, IoSearchOutline } from 'react-icons/io5';

import { titleFont } from '@/config/fonts';
import { useCartStore, useUiStore } from '@/store';

export const TopMenu = () => {
  const openMenu = useUiStore((store) => store.openSideMenu);
  const { itemsInCart } = useCartStore((store) => store.getSummaryInformation());

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  useState;
  return (
    <nav className='flex w-full items-center justify-between px-5'>
      {/* Logo */}
      <div>
        <Link href='/'>
          <span className={`${titleFont.className} font-bold antialiased`}>Sigma</span>
          <span> | Shop</span>
        </Link>
      </div>

      {/* Center Menu */}
      <div className='hidden sm:block'>
        <Link
          href='/gender/men'
          className='m-2 rounded-md p-2 transition-all hover:bg-gray-200/75'
        >
          Men
        </Link>
        <Link
          href='/gender/women'
          className='m-2 rounded-md p-2 transition-all hover:bg-gray-200/75'
        >
          Women
        </Link>
        <Link
          href='/gender/kid'
          className='m-2 rounded-md p-2 transition-all hover:bg-gray-200/75'
        >
          Kid
        </Link>
      </div>

      {/* Search, Cart, Menu */}
      <div className='flex items-center'>
        <Link href='/search' className='mx-2'>
          <IoSearchOutline className='h-5 w-5' />
        </Link>
        <Link href={itemsInCart === 0 && loaded ? '/empty' : '/cart'} className='mx-2'>
          <div className='relative'>
            {loaded && itemsInCart > 0 && (
              <span className='fade-in absolute -right-2 -top-2 rounded-full bg-slate-950 px-1 text-xs font-bold text-slate-300'>
                {itemsInCart}
              </span>
            )}

            <IoCartOutline className='h-5 w-5' />
          </div>
        </Link>

        <button
          className='m-2 rounded-md p-2 transition-all hover:bg-gray-200/75'
          onClick={openMenu}
        >
          Menu
        </button>
      </div>
    </nav>
  );
};
