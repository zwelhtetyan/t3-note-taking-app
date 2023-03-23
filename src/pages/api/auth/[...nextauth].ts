import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { type NextAuthOptions } from "next-auth";
import { prisma } from "~/lib/prismaClient";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials.email.trim() || !credentials.password.trim()) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });

        if (!user) {
          throw new Error("Invalid credentials");
        }

        const matchPassword = await bcrypt.compare(
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
};

export default NextAuth(authOptions);
