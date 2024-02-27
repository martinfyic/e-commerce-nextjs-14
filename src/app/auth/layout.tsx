import { redirect } from 'next/navigation';

import { auth } from '../../auth.config';

export default async function ShopLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (session?.user) redirect('/');

  return (
    <main className='flex justify-center'>
      <div className='w-full px-10 sm:w-[350px]'>{children}</div>
    </main>
  );
}
