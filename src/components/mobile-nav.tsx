"use client";

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
import { Droplets, InfoIcon, Menu, Package2 } from "lucide-react";
import Link from "next/link";
import { FaQuestion } from "react-icons/fa";
import SignInModalParent from "./authentication/signInModalParent";
import { usePathname } from "next/navigation";
import ShoppingCartButton from "./ui/shoppingCartButton";
import Notifications from "./ui/notifications";
import Image from "next/image";

interface MobileNavProps {
  disappearLg?: boolean;
}

export default function MobileNav({ disappearLg = false }: MobileNavProps) {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetDescription>
        <VisuallyHidden.Root>sidebar for moblie</VisuallyHidden.Root>
      </SheetDescription>
      <div
        className={`flex items-center justify-between p-5 ${
          disappearLg ? "lg:hidden" : "md:hidden"
        }`}
      >
        <div className="flex gap-3">
          <SignInModalParent>ثبت نام/ورود</SignInModalParent>
          <Notifications />
        </div>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <Menu className="h-8 w-8 text-[#383838]" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
      </div>
      <SheetContent side="right" className="flex flex-col">
        <SheetTitle>
          <VisuallyHidden.Root>menu</VisuallyHidden.Root>
        </SheetTitle>
        <Link href="/" className="absolute top-2 right-4 text-lg font-semibold">
          <div className="relative w-32 h-10">
            <Image alt="logo" className="" fill src={`/logo.png`} />
          </div>

          <span className="sr-only">سامانه درخت</span>
        </Link>
        <nav className="grid gap-2 mt-8 text-lg font-medium" dir="rtl">
          <Link
            href="/products"
            className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${
              pathname === "/products"
                ? "text-[#28D16C] hover:text-[#28D16C]"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Package2 className="h-5 w-5" />
            محصولات
          </Link>
          <div
            className={`mx-[-0.65rem] items-center gap-4 rounded-xl px-3 py-2 ${
              pathname === "/shopping-cart"
                ? "text-[#28D16C] hover:text-[#28D16C]"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <ShoppingCartButton isMobileNav={true} />
          </div>
          <Link
            href="/watering-trees"
            className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${
              pathname === "/watering-trees"
                ? "text-[#28D16C] hover:text-[#28D16C]"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Droplets className="h-5 w-5" />
            آبیاری درختان
          </Link>
          <Link
            href="/company/faq"
            className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${
              pathname === "/company/faq"
                ? "text-[#28D16C] hover:text-[#28D16C]"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <FaQuestion className="h-5 w-5" />
            سوالات متداول
          </Link>
          <Link
            href="/company/about-us"
            className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${
              pathname === "/company/about-us"
                ? "text-[#28D16C] hover:text-[#28D16C]"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <InfoIcon className="h-5 w-5" />
            درباره ما
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
