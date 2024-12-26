import Navbar from "@/components/navbar";
import type { Metadata } from "next";
import DashboardSidebar from "./dashboardSidebar";
import MobileNavDashboard from "./mobileNavDashboard";

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
      <header className="z-30 lg:shadow-md fixed top-0 left-0 w-full">
        <Navbar isDashboard />
        <MobileNavDashboard />
      </header>

      <div className="flex pt-[56px]" dir="rtl">
        <aside className="hidden lg:block w-64 bg-white shadow-lg h-[calc(100vh-56px)] fixed top-[56px]">
          <DashboardSidebar />
        </aside>

        <main className="flex-1 lg:mr-[276px] m-4 md:my-8 p-4">{children}</main>
      </div>
    </div>
  );
}
