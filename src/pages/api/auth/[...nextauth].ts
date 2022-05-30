import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async session({ session, token, user }: any) {
      session.user.role = user.role;
      if (user.role === Role.student) session.user.usn = user.usn;
      return session;
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});
