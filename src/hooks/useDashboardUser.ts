// hooks/useDashboardUser.ts
"use client";

import { useState, useEffect } from "react";
import { Session } from "next-auth";
import toast from "react-hot-toast";
import { UserIdentity } from "@/types/dashboard";

export const useDashboardUser = (session: Session | null) => {
  const [user, setUser] = useState<UserIdentity | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!session) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/account/api/dashboard/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session.access}`,
              TOKEN: session.token,
            },
          }
        );

        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data: UserIdentity = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        toast.error("خطا در دریافت اطلاعات کاربر");
      }
    };

    fetchUserData();
  }, [session]);

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    session: Session
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("لطفاً فقط فایل تصویری انتخاب کنید.");
      return;
    }

    if (file.size > 1024 * 1024) {
      toast.error("حجم فایل نباید بیشتر از 1 مگابایت باشد.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/account/api/change-image/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session.access}`,
            TOKEN: session.token,
          },
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Failed to upload image");
      const data: { image: string } = await response.json();
      setUser((prev) => (prev ? { ...prev, image: data.image } : null));
      toast.success("تصویر پروفایل با موفقیت بروزرسانی شد");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("خطا در آپلود تصویر");
    }
  };

  return { user, handleImageChange };
};
