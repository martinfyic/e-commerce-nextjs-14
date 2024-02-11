'use client';

import Link from 'next/link';
import {
  IoCloseOutline,
  IoLogIn,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline,
} from 'react-icons/io5';

export const SideBar = () => {
  return (
    <div className=''>
      {/* black background */}
      <div className='fixed left-0 top-0 z-10 h-screen w-screen bg-black opacity-50' />

      {/* Blur */}
      <div className='fade-in fixed left-0 top-0 z-10 h-screen w-screen backdrop-blur-sm backdrop-filter' />

      {/* SideMenu */}
      <nav className='fixed right-0 top-0 z-20 h-screen w-[400px] transform bg-slate-100 p-5 shadow-2xl transition-all duration-300'>
        <IoCloseOutline
          size={50}
          className='absolute right-5 top-5 cursor-pointer'
          onClick={() => console.log('click')}
        />

        {/* Search input */}
        <div className='relative mt-14'>
          <IoSearchOutline size={15} className='absolute left-2 top-2 cursor-pointer' />
          <input
            type='text'
            placeholder='Search'
            className='w-full rounded border-b-2 border-gray-300 bg-gray-50 py-1 pl-10 pr-10 text-base focus:border-slate-900 focus:outline-none'
          />
        </div>

        {/* Menu */}
        <Link
          href='/'
          className='mt-10 flex items-center rounded p-2 transition-all hover:bg-slate-200/80'
        >
          <IoPersonOutline size={20} />
          <span className='ml-3 text-lg'>Profile</span>
        </Link>
        <Link
          href='/'
          className='mt-10 flex items-center rounded p-2 transition-all hover:bg-slate-200/80'
        >
          <IoTicketOutline size={20} />
          <span className='ml-3 text-lg'>Orders</span>
        </Link>
        <Link
          href='/'
          className='mt-10 flex items-center rounded p-2 transition-all hover:bg-slate-200/80'
        >
          <IoLogIn size={20} />
          <span className='ml-3 text-lg'>Sign In</span>
        </Link>
        <Link
          href='/'
          className='mt-10 flex items-center rounded p-2 transition-all hover:bg-slate-200/80'
        >
          <IoLogOutOutline size={20} />
          <span className='ml-3 text-lg'>Log Out</span>
        </Link>

        {/* Line Separator */}
        <div className='my-10 h-px w-full bg-gray-300' />

        {/* Admin Menu */}
        <Link
          href='/'
          className='mt-10 flex items-center rounded p-2 transition-all hover:bg-slate-200/80'
        >
          <IoShirtOutline size={20} />
          <span className='ml-3 text-lg'>Products</span>
        </Link>
        <Link
          href='/'
          className='mt-10 flex items-center rounded p-2 transition-all hover:bg-slate-200/80'
        >
          <IoTicketOutline size={20} />
          <span className='ml-3 text-lg'>Orders</span>
        </Link>
        <Link
          href='/'
          className='mt-10 flex items-center rounded p-2 transition-all hover:bg-slate-200/80'
        >
          <IoPeopleOutline size={20} />
          <span className='ml-3 text-lg'>Users</span>
        </Link>
      </nav>
    </div>
  );
};
