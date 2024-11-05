import axios from "axios";
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
          const otpResponse = await axios.post(
            "https://treeone.liara.run/account/api/verify/",
            { otp },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${credentials?.token}`,
              },
            }
          );

          if (!otpResponse.data) throw new Error("Failed to verify OTP");

          const { access, token } = await otpResponse.data;
          return { id: "placeholder-id", access, token };
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
