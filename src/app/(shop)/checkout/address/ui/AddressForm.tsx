'use client';

import { useEffect } from 'react';

import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { IoArrowForwardOutline } from 'react-icons/io5';

import { Address, Country } from '@/interfaces';
import { useAddressStore } from '@/store';
import { deleteUserAddress, setUserAddress } from '@/actions';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type FormInput = {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  postalCode: string;
  city: string;
  country: string;
  phone: string;
  remembreAddress: boolean;
};

interface Props {
  countries: Country[];
  userStoreAddress?: Partial<Address>;
}

export const AddressForm = ({ countries, userStoreAddress = {} }: Props) => {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { isValid },
    reset,
  } = useForm<FormInput>({
    defaultValues: {
      ...userStoreAddress,
      remembreAddress: false,
    },
  });

  const { data: session } = useSession({
    required: true,
  });

  const setAddress = useAddressStore((store) => store.setAddress);
  const getAddress = useAddressStore((store) => store.shippingAddress);

  useEffect(() => {
    if (getAddress.firstName) {
      reset(getAddress);
    }
  }, [getAddress]);

  const onSubmit = async (data: FormInput) => {
    setAddress(data);

    const { remembreAddress, ...address } = data;

    if (data.remembreAddress) {
      await setUserAddress(address, session!.user.id);
    } else {
      await deleteUserAddress(session!.user.id);
    }

    router.push('/checkout');
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-5'
    >
      <div className='mb-2 flex flex-col'>
        <span>Name</span>
        <input
          type='text'
          className='rounded-md border bg-gray-200 p-2'
          {...register('firstName', { required: true })}
        />
      </div>

      <div className='mb-2 flex flex-col'>
        <span>Last Name</span>
        <input
          type='text'
          className='rounded-md border bg-gray-200 p-2'
          {...register('lastName', { required: true })}
        />
      </div>

      <div className='mb-2 flex flex-col'>
        <span>Address</span>
        <input
          type='text'
          className='rounded-md border bg-gray-200 p-2'
          {...register('address', { required: true })}
        />
      </div>

      <div className='mb-2 flex flex-col'>
        <span>Address 2 (optional)</span>
        <input
          type='text'
          className='rounded-md border bg-gray-200 p-2'
          {...register('address2')}
        />
      </div>

      <div className='mb-2 flex flex-col'>
        <span>Postal Code</span>
        <input
          type='text'
          className='rounded-md border bg-gray-200 p-2'
          {...register('postalCode', { required: true })}
        />
      </div>

      <div className='mb-2 flex flex-col'>
        <span>City</span>
        <input
          type='text'
          className='rounded-md border bg-gray-200 p-2'
          {...register('city', { required: true })}
        />
      </div>

      <div className='mb-2 flex flex-col'>
        <span>Country</span>
        <select
          className='rounded-md border bg-gray-200 p-2'
          {...register('country', { required: true })}
        >
          <option value=''>[ Select a country ]</option>
          {countries.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div className='mb-2 flex flex-col'>
        <span>Phone</span>
        <input
          type='text'
          className='rounded-md border bg-gray-200 p-2'
          {...register('phone', { required: true })}
        />
      </div>

      <div className='mb-2 flex flex-col sm:mt-1'>
        <div className='mb-10 inline-flex items-center'>
          <label
            className='relative flex cursor-pointer items-center rounded-full p-3'
            htmlFor='checkbox'
          >
            <input
              type='checkbox'
              className="before:content[''] border-blue-gray-200 before:bg-blue-gray-500 peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border transition-all before:absolute before:left-2/4 before:top-2/4 before:block before:h-12 before:w-12 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:opacity-0 before:transition-opacity checked:border-stone-950 checked:bg-stone-950 checked:before:bg-stone-950 hover:before:opacity-10"
              id='checkbox'
              {...register('remembreAddress')}
            />
            <div className='pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-3.5 w-3.5'
                viewBox='0 0 20 20'
                fill='currentColor'
                stroke='currentColor'
                strokeWidth='1'
              >
                <path
                  fillRule='evenodd'
                  d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </div>
          </label>
          <span className='text-sm'>Remember address?</span>
        </div>

        {/* <button className='btn-primary flex w-full justify-center sm:w-1/2' type='submit'> */}
        <button
          disabled={!isValid}
          className={clsx('flex w-full justify-center sm:w-1/2', {
            'btn-primary': isValid,
            'btn-disabled': !isValid,
          })}
          type='submit'
        >
          Next
          <IoArrowForwardOutline size={25} />
        </button>
      </div>
    </form>
  );
};
