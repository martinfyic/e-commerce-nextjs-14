'use server';
import bcrypt from 'bcryptjs';

import prisma from '@/lib/prisma';

export const newAccountUser = async (name: string, email: string, password: string) => {
  try {
    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email.toLowerCase(),
        password: bcrypt.hashSync(password),
      },
      select: {
        avatar: true,
        email: true,
        id: true,
        name: true,
        role: true,
      },
    });

    return {
      ok: true,
      message: 'Successfully created user',
      user: newUser,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'Could not create user',
    };
  }
};
