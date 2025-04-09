// app/not-found.tsx
"use client";

import Link from "next/link";
import localFont from "next/font/local";

const YekanBakh = localFont({
  src: "./fonts/YekanBakh-VF.woff",
  weight: "400",
});

export default function NotFound() {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`${YekanBakh.className} antialiased`}
        style={{
          fontVariationSettings: '"DOTS" 1',
        }}
      >
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl w-full">
            <h1 className="text-3xl font-bold text-blue-600 mb-4">
              صفحه مورد نظر یافت نشد!
            </h1>

            <div className="mb-6">
              <p className="text-gray-600 mb-4">
                آدرس وارد شده ممکن است اشتباه باشد یا صفحه حذف شده باشد.
              </p>

              <div className="flex items-center bg-yellow-50 p-4 rounded-lg">
                <svg
                  className="w-6 h-6 text-yellow-700 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span className="text-yellow-700">
                  آدرس را بررسی کرده و دوباره امتحان کنید
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <Link
                href="/"
                className="px-4 py-2 bg-[#28D16C] text-white rounded-md transition-colors hover:bg-[#1fa758]"
              >
                بازگشت به صفحه اصلی
              </Link>

              <button
                onClick={() => window.history.back()}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                بازگشت به صفحه قبلی
              </button>
            </div>

            <div className="mt-8 text-sm text-gray-500">
              <p>
                اگر فکر می کنید این خطا اشتباه است لطفا به پشتیبانی ایمیل دهید
              </p>
              <p >ایمیل : derakhtemanofficial@gmail.com</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
