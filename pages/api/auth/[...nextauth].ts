import { prisma } from '@/lib/prismaClient';
import { User } from '@/types';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as any;

        const user: any = await prisma.user.findUnique({ where: { email } });

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
