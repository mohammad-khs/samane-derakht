"use client";

import { useRef } from "react";
import { Session } from "next-auth";
import Link from "next/link";
import { useDashboardUser } from "@/hooks/useDashboardUser";
import { UserProfile } from "@/components/dashboard/userProfile";
import { NavLinks } from "@/components/dashboard/navLinks";
import { LogoutButton } from "@/components/dashboard/logoutButton";
import { navLinks } from "../config/dashboard";


export const DashboardSidebar = ({ session }: { session: Session | null }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user, handleImageChange } = useDashboardUser(session);

  return (
    <div className="flex flex-col items-center py-9 p-4 w-full h-full">
      <UserProfile
        user={user}
        onImageChange={(e) => session && handleImageChange(e, session)}
        fileInputRef={fileInputRef}
      />

      <div className="h-full w-full">
        <NavLinks links={navLinks} />
      </div>

      <Link href="/dashboard/tickets" className="w-full">
        <button className="mt-auto w-full bg-[#28D16C] text-white px-4 py-2 mb-4 rounded-full shadow-lg hover:bg-green-600 transition">
          پشتیبانی و تیکت
        </button>
      </Link>

      <LogoutButton session={session} />
    </div>
  );
};