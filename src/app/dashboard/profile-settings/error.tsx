// app/error.tsx
"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("خطا:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-red-600 mb-4">خطایی رخ داد!</h1>

        <div className="mb-6">
          <p className="text-gray-600 mb-1">
            <span className="font-medium">پیام:</span> {error.message}
          </p>
          {error.digest && (
            <p className="text-gray-600">
              <span className="font-medium">کد خطا:</span> {error.digest}
            </p>
          )}
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            تلاش مجدد
          </button>
          <a
            href="/"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            بازگشت به خانه
          </a>
        </div>
      </div>
    </div>
  );
}
