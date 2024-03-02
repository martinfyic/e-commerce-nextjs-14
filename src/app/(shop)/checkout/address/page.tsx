import { Title } from '@/components';
import { AddressForm } from './ui/AddressForm';
import { getCountries, getUserAddress } from '@/actions';
import { auth } from '@/auth.config';

export const metadata = {
  title: 'Shipping Address',
  description: 'On this page you will find the address form for shipping the product.',
};

export default async function AddressPage() {
  const countries = await getCountries();

  const session = await auth();

  if (!session?.user) {
    return (
      <h3 className='m-2 bg-red-500 p-2 text-center text-5xl text-red-200'>
        There is no user session
      </h3>
    );
  }

  const userAddress = (await getUserAddress(session.user.id)) ?? undefined;

  return (
    <div className='mb-72 flex flex-col px-10 sm:items-center sm:justify-center sm:px-0'>
      <div className='flex  w-full flex-col justify-center text-left xl:w-[1000px]'>
        <Title title='Address' subTitle='Shipping address' />

        <AddressForm countries={countries} userStoreAddress={userAddress} />
      </div>
    </div>
  );
}
