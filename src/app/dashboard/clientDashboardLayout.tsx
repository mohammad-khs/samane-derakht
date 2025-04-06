"use client";

import { useState } from "react";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { MobileNavDashboard } from "./mobileNavDashboard";
import { DashboardSidebar } from "./dashboardSidebar";
import SignInModalParent from "@/components/authentication/signInModalParent";

export default function ClientDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const { data: session } = useSession();
  return (
    <>
      <div className="absolute lg:hidden m-6 top-0 left-0">
        <SignInModalParent>ثبت نام/ورود</SignInModalParent>
      </div>
      <div className="absolute top-0 right-0">
        <MobileNavDashboard session={session} />
      </div>
      <aside
        className={`hidden lg:flex w-64 bg-white shadow-lg h-[calc(100vh-56px)] fixed top-[56px] 
    transition-transform duration-300 ease-in-out z-20 ${
      isOpen ? "translate-x-0" : "translate-x-full"
    }`}
      >
        <DashboardSidebar session={session} />
      </aside>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`hidden lg:flex fixed top-[56px]  h-[calc(100vh-56px)] w-10 items-center justify-center
    bg-white shadow-lg transition-all duration-300 ease-in-out
    ${isOpen ? "right-64" : "right-0"}`}
      >
        {isOpen ? (
          <FaCaretRight className="text-[#373737]" />
        ) : (
          <FaCaretLeft className="text-[#373737]" />
        )}
      </button>
      <main
        className={`flex-1 m-4 md:my-8 sm:p-4 relative container
            transition-margin duration-300 ease-in-out ${
              isOpen ? "lg:mr-[300px]" : "lg:mr-12"
            }`}
      >
        {children}
      </main>
    </>
  );
}
