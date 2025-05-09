import Footer from "@/components/footer";
import MobileNav from "@/components/mobile-nav";
import Navbar from "@/components/navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "درخت های کاشته شده",
  description: "صفحه درخت کاشته شده",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#EBEBEB] min-h-screen">
      <header className="z-30 lg:shadow-md w-full">
        <Navbar isDashboard />
        <MobileNav disappearLg={true} />
      </header>

      <main className="p-2 sm:p-8 container" dir="rtl">
        {children}
      </main>
      <div className="mt-auto">
        <Footer sponsors={false} />
      </div>
    </div>
  );
}
