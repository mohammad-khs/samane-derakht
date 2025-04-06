import Footer from "@/components/footer";
import MobileNav from "@/components/mobile-nav";
import Navbar from "@/components/navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "درگاه خرید",
  description: "قسمت انتخاب نحوه خرید در درگاه خرید",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-[#EBEBEB]">
      <header className="z-30 fixed top-0 left-0 w-full">
        <Navbar isDashboard />
        <MobileNav disappearLg={true} />
      </header>

      {children}

      <Footer sponsors={false} />
    </div>
  );
}
