import MobileNav from "@/components/mobile-nav";
import Navbar from "@/components/navbar";
import type { Metadata } from "next";
import DashboardSidebar from "./dashboardSidebar";

export const metadata: Metadata = {
  title: "داشبورد",
  description: "داشبورد شما",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-[#EBEBEB] min-h-screen">
      <header className="z-30 md:shadow-md fixed top-0 left-0 w-full">
        <Navbar isDashboard />
        <MobileNav />
      </header>

      <div className="flex pt-[56px]" dir="rtl">
        <aside className="w-64 bg-white shadow-lg h-[calc(100vh-56px)] fixed top-[56px]">
          <DashboardSidebar />
        </aside>

        <main className="flex-1 mr-[276px] m-4 md:my-8 p-4">{children}</main>
      </div>
    </div>
  );
}
