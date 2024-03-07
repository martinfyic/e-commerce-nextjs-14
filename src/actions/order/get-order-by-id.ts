'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

export const getOrderById = async (id: string) => {
  try {
    const order = await prisma.order.findUnique({
      where: {
        id: id,
      },
      include: {
        OrderAddress: true,
        OrderItem: {
          select: {
            price: true,
            quantity: true,
            size: true,

            product: {
              select: {
                title: true,
                slug: true,

                ProductImage: {
                  select: {
                    url: true,
                  },
                  take: 1,
                },
              },
            },
          },
        },
      },
    });

    if (!order) throw new Error(`Error - id ${id} does not exist`);

    const session = await auth();
    if (!session) throw new Error('There is no user session');
    if (session.user.role === 'user') {
      if (session.user.id !== order?.userId) {
        throw new Error(`The id ${id} does not correspond to the session user`);
      }
    }

    return {
      ok: true,
      order,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'Error - Talk to administrator',
    };
  }
};
