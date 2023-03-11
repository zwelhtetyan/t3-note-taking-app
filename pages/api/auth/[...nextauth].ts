import { prisma } from '@/lib/prismaClient';
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

  // callbacks: {
  //   async jwt({ token, account, profile }) {
  //     // Persist the OAuth access_token and or the user id to the token right after signin
  //     // if (account) {
  //     //   token.accessToken = account.access_token
  //     //   token.id = profile.id
  //     // }

  //     console.log({ token, account, profile });
  //     return token;
  //   },

  //   async session({ session, token, user }) {
  //     // Send properties to the client, like an access_token and user id from a provider.

  //     console.log({ session, token });

  //     return session;
  //   },
  // },
};

export default NextAuth(authOptions);
