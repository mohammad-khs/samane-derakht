import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    access: string;
    token: string;
  }

  interface User {
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