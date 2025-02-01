import Navbar from "@/components/navbar";
import type { Metadata } from "next";
import ClientDashboardLayout from "./clientDashboardLayout";

export const metadata: Metadata = {
  title: "داشبورد",
  description: "داشبورد شما",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#EBEBEB] min-h-screen">
      <header className="z-30 lg:shadow-md fixed top-0 left-0 w-full">
        <Navbar isDashboard />
      </header>

      <div className="flex pt-[56px]" dir="rtl">
        <ClientDashboardLayout>{children}</ClientDashboardLayout>
      </div>
    </div>
  );
}