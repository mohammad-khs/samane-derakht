import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./authProvider";
import { Check, X } from "lucide-react";

const YekanBakh = localFont({
  src: "./fonts/YekanBakh-VF.woff",
  weight: "400",
});

export const metadata: Metadata = {
  title: "سامانه درخت",
  description: "سامانه ای برای خرید گیاه ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
        style={{
          fontFamily: YekanBakh.style.fontFamily,
          fontVariationSettings: '"DOTS" 1',
        }}
      >
        <AuthProvider>
          <Toaster
            toastOptions={{
              success: {
                icon: <Check />,
                style: {
                  background: "#28D16C",
                  color: "white",
                },
              },
              error: {
                icon: <X />,
                style: {
                  background: "#dc2626",
                  color: "white",
                },
              },
            }}
            position="top-center"
          />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
