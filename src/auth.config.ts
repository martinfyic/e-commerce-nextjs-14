import NextAuth, { type NextAuthConfig } from 'next-auth';
import credentials from 'next-auth/providers/credentials';

import { z } from 'zod';
import bcrypt from 'bcryptjs';

import prisma from '@/lib/prisma';

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account',
  },
  providers: [
    credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        // Validamos usuarios en DB
        // Buscamos por correo
        const user = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });

        // Si no existe usuario
        if (!user) return null;

        // Comparamos password con db
        if (!bcrypt.compareSync(password, user.password)) return null;

        // Regresamos el usuario sin el password
        const { password: _, ...rest } = user;

        return rest;
      },
    }),
  ],
};

export const { signIn, signOut, auth } = NextAuth(authConfig);
