export const revalidate = 0;

import { redirect } from 'next/navigation';

import { getPaginatedUsers } from '@/actions';
import { Pagination, Title } from '@/components';
import { UsersTable } from './ui/UsersTable';

export const metadata = {
  title: 'Manage Users',
  description: 'Administrative panel for user management',
};

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function OrdersPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { ok, users = [], totalPages = 1 } = await getPaginatedUsers({ page });

  if (!ok) {
    redirect('/auth/login');
  }

  return (
    <>
      <Title title='Manage Users' />

      <div className='mb-10'>
        <UsersTable users={users} />
      </div>
      <Pagination totalPages={totalPages} />
    </>
  );
}
