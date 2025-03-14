"use client";

import { FC } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import SignInModalParent from "./authentication/signInModalParent";
import ShoppingCartButton from "./ui/shoppingCartButton";
import { usePathname } from "next/navigation";
import Notifications from "./ui/notifications";

interface NavbarProps {
  isDashboard?: boolean;
  count?: number | undefined;
}

const Navbar: FC<NavbarProps> = ({ isDashboard = false, count }) => {
  const pathName = usePathname();

  const isActive = (path: string) => pathName === path;

  return (
    <>
      <nav
        className={`${
          isDashboard
            ? "bg-[#FFFFFF] shadow-md lg:flex"
            : "bg-[#E4E7E5] mx-2 rounded-xl md:flex"
        }  flex-row py-2 hidden`}
      >
        <div className="flex justify-start items-center gap-4 ms-5 basis-1/3">
          <SignInModalParent>ثبت نام/ورود</SignInModalParent>
          <ShoppingCartButton propCount={count} />
          <Notifications />
        </div>
        <div className="w-full flex gap-1 lg:gap-4 justify-center items-center basis-1/3">
          {/* <Button
            className={`font-semibold ${
              isActive("/support") ? "bg-white" : ""
            }`}
            size={"resizble"}
            variant={"ghost"}
          >
            پشتیبانی
          </Button> */}
          {/* <Button
            className={`font-semibold ${isActive("#") ? "bg-white" : ""}`}
            size={"resizble"}
            variant={"ghost"}
          >
            تماس با ما
          </Button> */}
          <Link href="/watering-trees">
            <Button
              className={`font-semibold ${
                isActive("/watering-trees") ? "bg-white" : ""
              }`}
              size={"resizble"}
              variant={"ghost"}
            >
              آبیاری درختان
            </Button>
          </Link>
          <Link href={"/company/faq"}>
            <Button
              className={`font-semibold ${
                isActive("/company/faq") ? "bg-white" : ""
              }`}
              size={"resizble"}
              variant={"ghost"}
            >
              سوالات متداول
            </Button>
          </Link>
          <Link href={"/company/about-us"}>
            <Button
              className={`font-semibold ${
                isActive("/company/about-us") ? "bg-white" : ""
              }`}
              size={"resizble"}
              variant={"ghost"}
            >
              درباره ما
            </Button>
          </Link>
          <Link href="/products">
            <Button
              className={`font-semibold ${
                isActive("/products") ? "bg-white" : ""
              }`}
              size={"resizble"}
              variant={"ghost"}
            >
              محصولات
            </Button>
          </Link>
        </div>
        <div className="me-5 basis-1/3">
          <Link href="/" className="flex justify-end gap-3 items-center">
            <span className="text-sm font-semibold">سامانه درخت</span>
            <Button size={"icon"} variant={"green"}></Button>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
