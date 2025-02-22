"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function TransactionFailed() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const redirectTimer = setTimeout(() => {
      router.push("/");
    }, 10000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirectTimer);
    };
  }, [router]);

  return (
    <div
      dir="rtl"
      className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4"
    >
      <div className="text-center">
        <svg
          className="mx-auto h-16 w-16 text-red-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>

        <h1 className="mt-4 text-2xl font-bold text-gray-900">
          تراکنش ناموفق بود!
        </h1>

        <p className="mt-2 text-gray-600">
          متاسفانه عملیات پرداخت با مشکل مواجه شد. لطفا مجددا تلاش نمایید.
        </p>

        <p className="mt-4 text-gray-500">
          در حال انتقال به صفحه اصلی در {countdown} ثانیه...
        </p>
      </div>
    </div>
  );
}
