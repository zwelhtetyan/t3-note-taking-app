import { prisma } from '@/lib/prismaClient';
import { User } from '@/types';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },

  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as any;

        const user = await prisma.user.findUnique({ where: { email } });

        const validUser = password === user?.password;

        if (validUser) {
          return user;
        }

        return null;
      },
    }),
  ],

  callbacks: {
    async session({ session, token }): Promise<any> {
      const user: any = await prisma.user.findUnique({
        where: { id: token.sub },
      });

      const userInfo: User = {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        posts: user.posts,
      };

      return userInfo;
    },
  },
};

export default NextAuth(authOptions);
