'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

interface PaginationOptions {
  page?: number;
  take?: number;
}

export const getPaginatedOrders = async ({ page = 1, take = 25 }: PaginationOptions) => {
  const session = await auth();

  if (session?.user.role !== 'admin') {
    return {
      ok: false,
      message: 'Must be authenticated',
    };
  }

  try {
    const orders = await prisma.order.findMany({
      take: take,
      skip: (page - 1) * take,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        OrderAddress: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    const totalCount = await prisma.order.count();
    const totalPages = Math.ceil(totalCount / take);

    if (page >= totalPages) page = totalPages;

    return {
      ok: true,
      currentPage: page,
      totalPages: totalPages,
      orders: orders,
    };
  } catch (error) {
    console.log(error);
    throw new Error('Orders could not be loaded');
  }
};
