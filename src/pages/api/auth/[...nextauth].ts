import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient, Role } from "@prisma/client";
import { PrismaAdapter } from "../../../../prisma/adapter";

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

const prisma = new PrismaClient();

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async session({ session, token, user }: any) {
      session.user.role = user.role;
      if (user.role === Role.student) {
        session.user.image = user.details.image;
        session.user.branch = user.details.branch;
        session.user.validated = user.details.validated;
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
