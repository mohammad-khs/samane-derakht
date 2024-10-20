import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import MobileNav from "@/components/mobile-nav";

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
        <div className="md:container md:mx-auto">
          <Navbar />
          <MobileNav />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
