'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

interface PaginationOptions {
  page?: number;
  take?: number;
}

export const getPaginatedUsers = async ({ page = 1, take = 25 }: PaginationOptions) => {
  const session = await auth();

  if (session?.user.role !== 'admin') {
    return {
      ok: false,
      message: 'You must have the administrator role',
    };
  }

  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  try {
    const users = await prisma.user.findMany({
      take: take,
      skip: (page - 1) * take,
      orderBy: {
        name: 'asc',
      },
    });

    const totalCount = await prisma.user.count();
    const totalPages = Math.ceil(totalCount / take);

    if (page >= totalPages) page = totalPages;

    return {
      ok: true,
      currentPage: page,
      totalPages: totalPages,
      users: users,
    };
  } catch (error) {
    console.log(error);
    throw new Error('Users could not be loaded');
  }
};
