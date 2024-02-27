'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useFormState, useFormStatus } from 'react-dom';

import { IoAlertCircleOutline } from 'react-icons/io5';

import { authenticate } from '@/actions';
import clsx from 'clsx';

export const LoginForm = () => {
  const [message, dispatch] = useFormState(authenticate, undefined);

  useEffect(() => {
    if (message === 'Success') {
      //utilizo window.location en vez de usar router.replace para que cuando hagamos el login se actualice y cambie el estado del sidebar
      window.location.replace('/');
    }
  }, [message]);

  return (
    <form action={dispatch} className='flex flex-col'>
      <label htmlFor='email'>Email</label>
      <input
        className='mb-5 rounded border bg-gray-200 px-5 py-2'
        type='email'
        name='email'
      />

      <label htmlFor='password'>Password</label>
      <input
        className='mb-5 rounded border bg-gray-200 px-5 py-2'
        type='password'
        name='password'
      />

      <div className='my-2  h-8 ' aria-live='polite' aria-atomic='true'>
        {message && message !== 'Success' && (
          <div
            className='flex items-center justify-center space-x-1 rounded bg-red-100 py-1'
            aria-live='polite'
            aria-atomic='true'
          >
            <IoAlertCircleOutline size={30} className='h-5 w-5 text-red-500' />
            <p className='text-md font-semibold text-red-500'>{message}</p>
          </div>
        )}
      </div>

      <LoginButton />

      {/* divisor l ine */}
      <div className='my-5 flex items-center'>
        <div className='flex-1 border-t border-gray-500'></div>
        <div className='px-2 text-gray-800'>Or</div>
        <div className='flex-1 border-t border-gray-500'></div>
      </div>

      <Link href='/auth/new-account' className='btn-secondary text-center'>
        Create a new account
      </Link>
    </form>
  );
};

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type='submit'
      className={clsx({
        'btn-primary': !pending,
        'btn-disabled': pending,
      })}
      disabled={pending}
    >
      Sign In
    </button>
  );
}
