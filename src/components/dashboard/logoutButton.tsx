"use client";

import { redirect, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";

export const LogoutButton = ({ session }: { session: Session | null }) => {
  const router = useRouter();

  const handleLogout = async () => {
    if (!session) {
      redirect("/");
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/account/api/logout/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.access}`,
            TOKEN: session?.token,
          },
        }
      );

      if (response.ok) {
        toast.success("خروج با موفقیت انجام شد.");
        signOut();
        router.push("/");
      } else {
        throw new Error("Logout failed");
      }
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
