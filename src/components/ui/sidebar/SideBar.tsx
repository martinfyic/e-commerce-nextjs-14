'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useSession } from 'next-auth/react';
import clsx from 'clsx';
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

import { useCartStore, useUiStore, useAddressStore } from '@/store';
import { logout } from '@/actions';

export const SideBar = () => {
  const isSideMenuOpen = useUiStore((state) => state.isSideMenuOpen);
  const closeMenu = useUiStore((state) => state.closeSideMenu);
  const clearCart = useCartStore((state) => state.clearCart);
  const clearAddress = useAddressStore((state) => state.clearAddress);

  const { data: session } = useSession();
  const isAuthenticated = !!session?.user;
  const isAdminRole = session?.user.role === 'admin';

  const router = useRouter();

  const signInHandler = () => {
    closeMenu();
    router.refresh();
  };

  const handlerLogout = async () => {
    clearCart();
    clearAddress();
    await logout();
  };

  return (
    <div className=''>
      {/* black background */}
      {isSideMenuOpen && (
        <div className='fixed left-0 top-0 z-10 h-screen w-screen bg-black opacity-50' />
      )}

      {/* Blur */}
      {isSideMenuOpen && (
        <div
          className='fade-in fixed left-0 top-0 z-10 h-screen w-screen backdrop-blur-sm backdrop-filter'
          onClick={closeMenu}
        />
      )}

      {/* SideMenu */}
      <nav
        className={clsx(
          'fixed right-0 top-0 z-20 h-screen w-[400px] transform bg-slate-50 p-5 shadow-2xl transition-all duration-300',
          {
            'translate-x-full': !isSideMenuOpen,
          }
        )}
      >
        <IoCloseOutline
          size={40}
          className='absolute right-5 top-5 cursor-pointer'
          onClick={closeMenu}
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

        {!isAuthenticated && (
          <Link
            href='/auth/login'
            className='mt-10 flex items-center rounded p-2 transition-all hover:bg-slate-200/80'
            onClick={signInHandler}
          >
            <IoLogIn size={20} />
            <span className='ml-3 text-lg'>Sign In</span>
          </Link>
        )}

        {isAuthenticated && (
          <>
            <Link
              href='/profile'
              className='mt-10 flex items-center rounded p-2 transition-all hover:bg-slate-200/80'
              onClick={() => closeMenu()}
            >
              <IoPersonOutline size={20} />
              <span className='ml-3 text-lg'>Profile</span>
            </Link>

            <Link
              href='/orders'
              className='mt-10 flex items-center rounded p-2 transition-all hover:bg-slate-200/80'
              onClick={() => closeMenu()}
            >
              <IoTicketOutline size={20} />
              <span className='ml-3 text-lg'>Orders</span>
            </Link>
            <button
              className='mt-10 flex w-full items-center rounded p-2 transition-all hover:bg-slate-200/80'
              onClick={handlerLogout}
            >
              <IoLogOutOutline size={20} />
              <span className='ml-3 text-lg'>Log Out</span>
            </button>
          </>
        )}

        {/* Admin Menu */}
        {isAuthenticated && isAdminRole && (
          <>
            {/* Line Separator */}
            <div className='my-10 h-px w-full bg-gray-300' />
            <Link
              href='/'
              className='mt-10 flex items-center rounded p-2 transition-all hover:bg-slate-200/80'
            >
              <IoShirtOutline size={20} />
              <span className='ml-3 text-lg'>Products</span>
            </Link>
            <Link
              href='/admin/orders'
              className='mt-10 flex items-center rounded p-2 transition-all hover:bg-slate-200/80'
              onClick={() => closeMenu()}
            >
              <IoTicketOutline size={20} />
              <span className='ml-3 text-lg'>Orders</span>
            </Link>
            <Link
              href='/admin/users'
              className='mt-10 flex items-center rounded p-2 transition-all hover:bg-slate-200/80'
              onClick={() => closeMenu()}
            >
              <IoPeopleOutline size={20} />
              <span className='ml-3 text-lg'>Users</span>
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};
