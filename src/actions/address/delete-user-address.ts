'use server';

import prisma from '@/lib/prisma';

export const deleteUserAddress = async (userId: string) => {
  try {
    await prisma.userAddress.delete({
      where: {
        userId: userId,
      },
    });

    return {
      ok: false,
      message: 'User address deleted successfully',
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'Could not delete user address',
    };
  }
};
