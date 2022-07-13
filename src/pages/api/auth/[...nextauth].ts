import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { Role } from "@prisma/client";
import { PrismaAdapter } from "../../../../prisma/adapter";
import prisma from "../../../../lib/prisma";

export interface Session {
  user: {
    role: Role;
    email: string;
    name?: string;
    image?: string;
    branch?: string;
    validated?: string;
  };
  expires: string;
}

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async session({ session, token, user }: any) {
      session.user.role = user.role;
      if (user.role === Role.student) {
        session.user.image = user.details.image;
        session.user.branch = user.details.branch;
        session.user.validated = user.details.validated;
        session.user.offercount = user.details._count.offer;
      }

      return session;
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});
