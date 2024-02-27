'use client';

import { useState } from 'react';
import Link from 'next/link';

import clsx from 'clsx';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IoAlertCircleOutline } from 'react-icons/io5';

import { login, newAccountUser } from '@/actions';

type FormInputs = {
  name: string;
  email: string;
  password: string;
};

export const NewAccountForm = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setErrorMessage('');

    const { email, name, password } = data;
    const resp = await newAccountUser(name, email, password);

    if (!resp.ok) {
      setErrorMessage(resp.message);
      return;
    }

    await login(email.toLowerCase(), password);

    reset();

    window.location.replace('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
      {errors.name?.type === 'required' && (
        <div
          className='flex items-center justify-start space-x-1 text-sm'
          aria-live='polite'
          aria-atomic='true'
        >
          <IoAlertCircleOutline size={25} className='h-5 w-5 text-red-500' />
          <p className='font-semibold text-red-500'>Full Name is required</p>
        </div>
      )}
      <label htmlFor='text'>Full Name</label>
      <input
        className={clsx('mb-5 rounded border bg-gray-200 px-5 py-2', {
          'border-red-500': errors.name,
        })}
        type='text'
        autoFocus
        {...register('name', { required: true })}
      />

      {errors.email?.type === 'required' && (
        <div
          className='flex items-center justify-start space-x-1 text-sm'
          aria-live='polite'
          aria-atomic='true'
        >
          <IoAlertCircleOutline size={25} className='h-5 w-5 text-red-500' />
          <p className='font-semibold text-red-500'>Email is required</p>
        </div>
      )}
      {errors.email?.type === 'pattern' && (
        <div
          className='flex items-center justify-start space-x-1 text-sm'
          aria-live='polite'
          aria-atomic='true'
        >
          <IoAlertCircleOutline size={25} className='h-5 w-5 text-red-500' />
          <p className='font-semibold text-red-500'>Valid email is required</p>
        </div>
      )}
      <label htmlFor='email'>Email</label>
      <input
        className={clsx('mb-5 rounded border bg-gray-200 px-5 py-2', {
          'border-red-500': errors.email,
        })}
        type='email'
        {...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
      />

      {errors.password?.type === 'required' && (
        <div
          className='flex items-center justify-start space-x-1 text-sm'
          aria-live='polite'
          aria-atomic='true'
        >
          <IoAlertCircleOutline size={25} className='h-5 w-5 text-red-500' />
          <p className='font-semibold text-red-500'>Password is required</p>
        </div>
      )}
      {errors.password?.type === 'minLength' && (
        <div
          className='flex items-center justify-start space-x-1 text-sm'
          aria-live='polite'
          aria-atomic='true'
        >
          <IoAlertCircleOutline size={25} className='h-5 w-5 text-red-500' />
          <p className='font-semibold text-red-500'>
            Password must contain 6 or more characters
          </p>
        </div>
      )}
      <label htmlFor='password'>Password</label>
      <input
        className={clsx('mb-5 rounded border bg-gray-200 px-5 py-2', {
          'border-red-500': errors.password,
        })}
        type='password'
        {...register('password', { required: true, minLength: 6 })}
      />

      <div className='my-2  h-8 ' aria-live='polite' aria-atomic='true'>
        {errorMessage && (
          <div
            className='flex items-center justify-center space-x-1 rounded bg-red-100 py-1'
            aria-live='polite'
            aria-atomic='true'
          >
            <IoAlertCircleOutline size={30} className='h-5 w-5 text-red-500' />
            <p className='text-md font-semibold text-red-500'>{errorMessage}</p>
          </div>
        )}
      </div>

      <button className='btn-primary'>Create account</button>

      {/* divisor l ine */}
      <div className='my-5 flex items-center'>
        <div className='flex-1 border-t border-gray-500'></div>
        <div className='px-2 text-gray-800'>Or</div>
        <div className='flex-1 border-t border-gray-500'></div>
      </div>

      <Link href='/auth/login' className='btn-secondary text-center'>
        Sign In
      </Link>
    </form>
  );
};
