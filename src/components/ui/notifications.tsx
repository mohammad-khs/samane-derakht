"use client";

import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { Button } from "./button";
import axios from "axios";
import { useSession } from "next-auth/react";
import { MailIcon } from "lucide-react";

interface NotificationsProps {}

const Notifications: FC<NotificationsProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: session, status } = useSession();

  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/account/api/mynotifications/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: session?.access ? `Bearer ${session.access}` : "",
              TOKEN: session?.token ?? "",
            },
          }
        );
        setCount(response.data.count);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    if (status === "authenticated") {
      fetchData();
    }
  }, [session, status]);

  return (
    <>
      {status === "authenticated" && (
        <Link href="/shopping-cart">
          <Button className="relative p-2" variant="icon">
            <div className="flex justify-center gap-3 items-center">
              <div className="relative w-6 h-6">
                <MailIcon />
              </div>
              {count > 0 && (
                <div className="rounded-full h-4 w-4 flex justify-center items-center text-white font-semibold bg-red-600">
                  <div className="text-[10px] leading-none">
                    {count > 9 ? `+9` : count}
                  </div>
                </div>
              )}
            </div>
          </Button>
        </Link>
      )}
    </>
  );
};

export default Notifications;
