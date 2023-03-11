import { prisma } from '@/lib/prismaClient';
import NextAuth, { NextAuthOptions } from 'next-auth';
import { getToken } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials, req) {
        console.log(credentials);
        const { email, password } = credentials as any;

        const user = await prisma.user.findUnique({ where: { email } });

        console.log('users is: ', user);

        // const user = await res.json();

        // if (res.ok && user) {
        //   return user;
        // }

        return null;
      },
    }),
  ],
};

export default NextAuth(authOptions);
