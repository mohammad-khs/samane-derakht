"use client";

import { FC, useEffect, useState, useRef } from "react";
import { Button } from "./button";
import axios from "axios";
import { useSession } from "next-auth/react";
import { MailIcon } from "lucide-react";
import Link from "next/link";



interface NotificationType {
  id: string;
  notif_type: number;
  url_for_order: string | null;
  url_for_reply_comment: string | null;
  url_for_ticket: string | null;
  url_for_transaction: string | null;
}

const Notifications: FC = () => {
  const { data: session, status } = useSession();
  const [count, setCount] = useState(0);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
        setNotifications(response.data.data);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    if (status === "authenticated") {
      fetchData();
    }
  }, [session, status]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const getNotificationMessage = (notif_type: number) => {
    switch (notif_type) {
      case 1:
        return "پیام";
      case 2:
        return "ترد";
      case 3:
        return "تیکت";
      case 4:
        return "پایان سفارش";
      case 5:
        return "پاسخ در صفحه محصول";
      case 6:
        return "تراکنش";
      case 7:
        return "پاسخ در تاپیک درختان";
      default:
        return "هیچ پیام جدیدی نیست";
    }
  };

  return (
    <>
      {status === "authenticated" && (
        <div className="relative" ref={dropdownRef}>
          <Button
            className="relative p-2"
            variant="icon"
            onClick={toggleDropdown}
          >
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

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <div className="p-4">
                {notifications.length > 0 ? (
                  <ul className="space-y-2">
                    {notifications.map((notification) => (
                      <li
                        key={notification.id}
                        className="text-sm p-2 rounded bg-gray-50 hover:bg-gray-100 cursor-pointer"
                      >
                        <p>{getNotificationMessage(notification.notif_type)}</p>
                        {notification.url_for_reply_comment && (
                          <Link
                            href={'/products/چنار'}
                            className="text-xs text-[#28D16C] hover:underline"
                          >
                            دیدن کامنت
                          </Link>
                        )}
                        {notification.url_for_order && (
                          <Link
                            href={notification.url_for_order}
                            className="text-xs text-[#28D16C] hover:underline"
                          >
                            دیدن سفارش
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">هیچ پیام جدیدی نیست</p>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Notifications;
