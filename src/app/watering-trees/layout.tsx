import MobileNav from "@/components/mobile-nav";
import Navbar from "@/components/navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "داشبورد",
  description: "داشبورد شما",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#EBEBEB] min-h-screen">
      <header className="z-30 lg:shadow-md fixed top-0 left-0 w-full">
        <Navbar />
        <MobileNav />
      </header>

      <div className="pt-[56px] container" dir="rtl">
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
