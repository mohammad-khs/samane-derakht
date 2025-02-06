"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          مشکلی پیش آمده.
        </h1>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            جزئیات ارور:
          </h2>
          <p className="text-gray-600 mb-1">
            <span className="font-medium">Message:</span> {error.message}
          </p>
          {error.digest && (
            <p className="text-gray-600">
              <span className="font-medium">Digest:</span> {error.digest}
            </p>
          )}
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-[#28D16C] text-white rounded-md transition-colors"
          >
            دوباره امتحان کنید
          </button>
          <a
            href="/"
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            به خانه باز گردید
          </a>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>اگر مشکل برقرار بود لطفا به تیم پشتیبانی ما ایمیل دهید</p>
          <p>Email: support@domain.com</p>
        </div>
      </div>
    </div>
  );
}
