import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { InfoIcon, Menu, Package2, ShoppingCart, Users } from "lucide-react";
import Link from "next/link";

import {
  FaChartLine,
  FaComments,
  FaEnvelope,
  FaHeadphones,
  FaHeart,
  FaQuestion,
  FaShoppingCart,
  FaTree,
  FaUserCircle,
  FaWallet,
} from "react-icons/fa";

export default function MobileNavDashboard() {
  return (
    <Sheet>
      <SheetDescription>
        <VisuallyHidden.Root>sidebar for moblie</VisuallyHidden.Root>
      </SheetDescription>

      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="shrink-0 h-full w-auto  m-5 p-1 lg:hidden"
        >
          <Menu className="h-8 w-8 text-[#383838]" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex gap-0 py-0 h-full pr-0 flex-col"
      >
        <SheetTitle>
          <VisuallyHidden.Root>menu</VisuallyHidden.Root>
        </SheetTitle>
        <div dir="rtl" className="flex h-full">
          <nav className="flex flex-col h-full justify-around items-center gap-2 text-lg w-20 bg-[#eaeaea] font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Button
                className="bg-[#28D16C] border-none"
                variant={"icon"}
                size={"resizbleIcon"}
              ></Button>
              <span className="sr-only">سامانه درخت</span>
            </Link>
            <Link
              href="/products"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <Package2 className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <InfoIcon className="h-5 w-5" />
            </Link>
            <Link
              href="/shopping-cart"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <ShoppingCart className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <FaQuestion className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <Users className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <FaHeadphones className="h-5 w-5" />
            </Link>
          </nav>
          <div className="flex flex-col items-center p-4 py-9 w-full h-full">
            {/* User Profile Section */}
            <div className="text-center mb-6">
              <div className="w-20 h-20 mx-auto rounded-full bg-gray-300 flex items-center justify-center">
                <FaUserCircle size={50} className="text-gray-600" />
              </div>
              <h2 className="text-lg font-bold mt-2">سید محمد امین حمیدی</h2>
              <p className="text-sm text-gray-500">09172173052</p>
            </div>
            {/* Navigation Links */}
            <div className="h-full">
              <nav className="flex flex-col gap-4 w-full">
                {[
                  {
                    icon: <FaShoppingCart />,
                    label: "سفارش‌ها",
                    href: "/dashboard/orders",
                  },
                  {
                    icon: <FaHeart />,
                    label: "لیست علاقه‌مندی‌ها",
                    href: "/dashboard/favorites",
                  },
                  { icon: <FaEnvelope />, label: "پیام‌ها", href: "" },
                  {
                    icon: <FaChartLine />,
                    label: "گزارش مالی",
                    href: "/dashboard/transactions",
                  },
                  { icon: <FaTree />, label: "درخت‌های من", href: "/dashboard/trees" },
                  { icon: <FaComments />, label: "دیدگاه‌های من", href: "" },
                  { icon: <FaWallet />, label: "برداشت مالی", href: "/dashboard/wallet" },
                  { icon: <FaUserCircle />, label: "صفحه اختصاصی", href: "" },
                ].map(({ icon, label, href }, index) => (
                  <a
                    key={index}
                    href={href}
                    className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition px-4"
                  >
                    <span className="text-xl">{icon}</span>
                    <span className="text-sm">{label}</span>
                  </a>
                ))}
              </nav>
              {/* Footer Action */}
            </div>
            <Link href="/dashboard/tickets">
              <div className="mt-auto bg-[#28D16C] text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-600 transition">
                پشتیبانی و تیکت
              </div>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
