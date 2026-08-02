"use client";
import { useEffect } from "react";
import { signOut } from "next-auth/react";
import { SessionProvider } from "next-auth/react";
import axios from "axios";
import { getMockResponse } from "@/mocks/mockSetup";

export interface AuthContextProps {
  children: React.ReactNode;
}

export default function AuthContext({ children }: AuthContextProps) {
  useEffect(() => {
    const originalFetch = global.fetch;
    let isSigningOut = false;

    const axiosInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (!isSigningOut && error?.response?.status === 400) {
          const errorMessage = error.response?.data?.[0]?.toLowerCase();
          if (errorMessage?.includes("jwt")) {
            console.log("this is error message", errorMessage);

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

    const axiosMockInterceptor = axios.interceptors.response.use(
      (response) => {
        const mockData = getMockResponse(response.config.url || "", response.config.method?.toUpperCase());
        if (mockData !== null) {
          return {
            ...response,
            data: mockData,
          };
        }
        return response;
      },
      (error) => {
        if (error.config) {
          const mockData = getMockResponse(error.config.url || "", error.config.method?.toUpperCase());
          if (mockData !== null) {
            return Promise.resolve({
              data: mockData,
              status: 200,
              statusText: "OK",
              headers: {},
              config: error.config,
            });
          }
        }
        return Promise.reject(error);
      }
    );

    global.fetch = async (input, init) => {
      const url = typeof input === "string" ? input : (input as Request).url;
      const method = init?.method || "GET";

      const mockData = getMockResponse(url, method);
      if (mockData !== null) {
        return new Response(JSON.stringify(mockData), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }

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
        } catch {
          console.log("Non-JSON response or parsing error");
        }
      }

      return response;
    };

    return () => {
      axios.interceptors.response.eject(axiosInterceptor);
      axios.interceptors.response.eject(axiosMockInterceptor);
      global.fetch = originalFetch;
    };
  }, []);

  return <SessionProvider>{children}</SessionProvider>;
}
