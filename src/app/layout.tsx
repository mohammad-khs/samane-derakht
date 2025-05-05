import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AuthProvider from "./authProvider";
import MyToaster from "@/components/MyToaster";

const YekanBakh = localFont({
  src: "./fonts/YekanBakh-VF.woff",
  weight: "400",
});

export const metadata: Metadata = {
  title: "سامانه درخت",
  description: "سامانه ای برای خرید گیاه ",
  verification: {
    google: "nVw14BYRsFkZfAD1vL0JOx1wAHBrcFB64QsK9-U_YhU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/icon.png" />
        {/* Structured data for Google logo rich result */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "درخت من",
              url: "https://derakhtman.ir/",
              logo: "https://derakhtman.ir/icon.png",
            }),
          }}
        />
      </head>
      <body
        className={`antialiased`}
        style={{
          fontFamily: YekanBakh.style.fontFamily,
          fontVariationSettings: '"DOTS" 1',
        }}
      >
        <AuthProvider>
          <MyToaster />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
