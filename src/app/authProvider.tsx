"use client";
import { useEffect } from "react";
import { signOut } from "next-auth/react";
import { SessionProvider } from "next-auth/react";
import axios from "axios";

export interface AuthContextProps {
  children: React.ReactNode;
}

export default function AuthContext({ children }: AuthContextProps) {
  useEffect(() => {
    const originalFetch = global.fetch;
    let isSigningOut = false;

    // Axios interceptor
    const axiosInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (!isSigningOut && error?.response?.status === 400) {
          const errorMessage = error.response?.data?.[0]?.toLowerCase();
          if (errorMessage?.includes("jwt")) {
            console.log("this is error message",errorMessage);

            console.log("JWT error detected, signing out");
            isSigningOut = true;
            signOut({
              callbackUrl: "/",
              redirect: true,
            });
          }
        }
        return Promise.reject(error);
      }
    );

    // Fetch interceptor
    global.fetch = async (input, init) => {
      const response = await originalFetch(input, init);

      if (!isSigningOut && response.status === 400) {
        try {
          const data = await response.clone().json();
          if (data.some((msg: string) => msg.toLowerCase().includes("jwt"))) {
            console.log(data);

            console.log("JWT error detected in fetch, signing out");
            isSigningOut = true;
            await signOut({
              callbackUrl: "/",
              redirect: true,
            });
          }
        } catch (e) {
          console.log("Non-JSON response or parsing error");
        }
      }

      return response;
    };

    return () => {
      axios.interceptors.response.eject(axiosInterceptor);
      global.fetch = originalFetch;
    };
  }, []);

  return <SessionProvider>{children}</SessionProvider>;
}
