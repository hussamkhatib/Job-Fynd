import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient, Role } from "@prisma/client";
import { PrismaAdapter } from "../../../../prisma/adapter";

export interface Session {
  user: {
    name: string;
    email: string;
    image: string;
    role: Role;
  };
  expires: string;
}

const prisma = new PrismaClient();

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async session({ session, token, user }: any) {
      session.user.role = user.role;
      session.user.image = user.details.image;
      session.user.name = user.details.name;

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
