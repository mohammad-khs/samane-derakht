import { getMockResponse } from "@/mocks/mockSetup";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: { label: "Phone", type: "text" },
        otp: { label: "OTP", type: "text" },
        token: { label: "Token", type: "text" },
      },
      authorize: async (credentials) => {
        console.log("credentials:", credentials?.otp);
        console.log("credentials:", credentials?.phone);
        const otp = credentials?.otp;
        try {
          const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
          const verifyUrl = `${baseUrl}/account/api/verify/`;
          const mockData = getMockResponse(verifyUrl, "POST");
          if (mockData !== null) {
            const { access, token } = mockData as { access: string; token: string };
            return { id: "placeholder-id", access, token };
          }
          throw new Error("Failed to verify OTP");
        } catch (error) {
          console.error("Error in authorize function:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.access = user.access;
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      session.access = token.access;
      session.token = token.token;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
};

export default NextAuth(authOptions);
