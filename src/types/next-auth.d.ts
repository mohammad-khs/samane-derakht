import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    access: string;
    token: string;
  }

  interface Session {
    access: string;
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    access: string;
    token: string;
  }
}
