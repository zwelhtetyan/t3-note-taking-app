import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type NextAuthOptions } from "next-auth";
import { prisma } from "~/lib/prismaClient";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import GitHubProvider from "next-auth/providers/github";

interface Credentials {
  email: string;
  password: string;
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  jwt: { secret: process.env.JWT_SECRET },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials: Credentials) {
        if (!credentials.email.trim() || !credentials.password.trim()) {
          throw new Error("Invalid credentials");
        }
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });
        if (!user) {
          throw new Error("Invalid credentials");
        }
        const matchPassword = bcrypt.compareSync(
          credentials.password,
          user.password
        );
        if (!matchPassword) {
          throw new Error("Invalid credentials");
        }
        return user;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // console.log({ session, token });

      session.user.id = token.sub;

      return session;
    },
  },
};

export default NextAuth(authOptions);
