"use client";

import { redirect, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";
import { fetcher } from "@/lib/utils";

export const LogoutButton = ({ session }: { session: Session | null }) => {
  const router = useRouter();

  const handleLogout = async () => {
    if (!session) {
      redirect("/");
    }
    try {
      await fetcher(`${process.env.NEXT_PUBLIC_API_BASE_URL}/account/api/logout/`, "POST");
      toast.success("خروج با موفقیت انجام شد.");
      signOut();
      router.push("/");
    } catch (error) {
      toast.error("خطا در خروج از حساب کاربری.");
      console.error("Error during logout:", error);
    }
  };

  return (
    <button
      className="mt-auto text-white px-4 py-2 rounded-full shadow-lg bg-red-600 transition"
      onClick={handleLogout}
    >
      خروج
    </button>
  );
};
