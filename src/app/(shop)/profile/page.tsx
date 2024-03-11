import { auth } from '@/auth.config';
import { Title } from '@/components';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) redirect('/');

  const profileImage = session.user.image
    ? session.user.image
    : 'https://res.cloudinary.com/dboafhu31/image/upload/v1625318266/imagen_2021-07-03_091743_vtbkf8.png';

  return (
    <>
      <Title title='Profile User' />
      <div className='grid-cols-4 grid-rows-2 gap-2  rounded-xl bg-white p-4 md:grid'>
        <div className='h-56 shadow-xl md:col-span-1 '>
          <div className='relative flex h-full w-full'>
            <Image
              src={profileImage}
              className='m-auto h-44 w-44'
              alt={session.user.name}
              height={200}
              width={200}
            />
          </div>
        </div>
        <div className='h-56 space-y-2 p-4 shadow-xl md:col-span-3'>
          <div className='flex '>
            <span className='whitespace-no-wrap w-2/6 rounded-l border bg-blue-50 px-4 py-2 text-sm font-bold uppercase'>
              #ID:
            </span>
            <input
              className='-ml-1 w-4/6 cursor-default rounded-md rounded-l-none  border-l-0 border-gray-300 px-4 shadow-sm focus:outline-none'
              type='text'
              value={session.user.id.split('-').at(-1)}
            />
          </div>
          <div className='flex '>
            <span className='whitespace-no-wrap w-2/6 rounded-l border bg-blue-50 px-4 py-2 text-sm font-bold uppercase'>
              Name:
            </span>
            <input
              className='-ml-1 w-4/6 cursor-default rounded-md rounded-l-none  border-l-0 border-gray-300 px-4 shadow-sm focus:outline-none'
              type='text'
              value={session.user.name}
            />
          </div>
          <div className='flex '>
            <span className='whitespace-no-wrap w-2/6 rounded-l border bg-blue-50 px-4 py-2 text-sm font-bold uppercase'>
              Email:
            </span>
            <input
              className='-ml-1 w-4/6 cursor-default rounded-md rounded-l-none  border-l-0 border-gray-300 px-4 shadow-sm focus:outline-none'
              type='text'
              value={session.user.email}
            />
          </div>
          <div className='flex '>
            <span className='whitespace-no-wrap w-2/6 rounded-l border bg-blue-50 px-4 py-2 text-sm font-bold uppercase'>
              Role:
            </span>
            <input
              className='-ml-1 w-4/6 cursor-default rounded-md rounded-l-none  border-l-0 border-gray-300 px-4 capitalize shadow-sm focus:outline-none'
              type='text'
              value={session.user.role}
            />
          </div>
        </div>
      </div>
    </>
  );
}
