import { titleFont } from '@/config/fonts';
import Link from 'next/link';
import { IoCartOutline, IoSearchOutline } from 'react-icons/io5';

export const TopMenu = () => {
  return (
    <nav className='flex w-full items-center justify-between px-5'>
      {/* Logo */}
      <div>
        <Link href='/'>
          <span className={`${titleFont.className} font-bold antialiased`}>
            E-commerce
          </span>
          <span> | Shop</span>
        </Link>
      </div>

      {/* Center Menu */}
      <div className='hidden sm:block'>
        <Link
          href='/category/men'
          className='m-2 rounded-md p-2 transition-all hover:bg-gray-200/75'
        >
          Men
        </Link>
        <Link
          href='/category/women'
          className='m-2 rounded-md p-2 transition-all hover:bg-gray-200/75'
        >
          Women
        </Link>
        <Link
          href='/category/kids'
          className='m-2 rounded-md p-2 transition-all hover:bg-gray-200/75'
        >
          Kids
        </Link>
      </div>

      {/* Search, Cart, Menu */}
      <div className='flex items-center'>
        <Link href='/search' className='mx-2'>
          <IoSearchOutline className='h-5 w-5' />
        </Link>
        <Link href='/cart' className='mx-2'>
          <div className='relative'>
            <span className='absolute -right-2 -top-2 rounded-full bg-slate-950 px-1 text-xs font-bold text-slate-300'>
              3
            </span>
            <IoCartOutline className='h-5 w-5' />
          </div>
        </Link>

        <button className='m-2 rounded-md p-2 transition-all hover:bg-gray-200/75'>
          Menu
        </button>
      </div>
    </nav>
  );
};