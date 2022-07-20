// Using Module Augmentation
// https://next-auth.js.org/getting-started/typescript

import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
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
}
