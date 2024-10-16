import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import MobileNav from "@/components/mobile-nav";

const YekanBakhBlack = localFont({
  src: "./fonts/YekanBakh-Black.woff",

});
const YekanBakhRegular = localFont({
  src: "./fonts/YekanBakh-Regular.woff",

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
      <body className={`${YekanBakhBlack.className} ${YekanBakhRegular.className} antialiased`}>
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
