import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import MobileNav from "@/components/mobile-nav";

const bYekan = localFont({
  src: "./fonts/BYekan.ttf",
  weight: "100 900",
});
const bYekanBold = localFont({
  src: "./fonts/BYekanBold.ttf",
  weight: "100 900",
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
      <body className={`${bYekan.className} ${bYekanBold.className} antialiased`}>
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
