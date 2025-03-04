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

import { FaHeadphones, FaQuestion } from "react-icons/fa";

interface MobileNavProps {
  disappearLg?: boolean;
}

export default function MobileNav({ disappearLg = false }: MobileNavProps) {
  return (
    <Sheet>
      <SheetDescription>
        <VisuallyHidden.Root>sidebar for moblie</VisuallyHidden.Root>
      </SheetDescription>

      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={`shrink-0 h-full w-auto  m-5 p-1 ${
            disappearLg ? "lg:hidden" : "md:hidden"
          }`}
        >
          <Menu className="h-8 w-8 text-[#383838]" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col">
        <SheetTitle>
          <VisuallyHidden.Root>menu</VisuallyHidden.Root>
        </SheetTitle>
        <nav className="grid gap-2 text-lg font-medium" dir="rtl">
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
            محصولات
          </Link>
          <Link
            href="/company/about-us"
            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
          >
            <InfoIcon className="h-5 w-5" />
            درباره ما
          </Link>
          <Link
            href="/shopping-cart"
            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
          >
            <ShoppingCart className="h-5 w-5" />
            سبد خرید
          </Link>
          <Link
            href="/company/faq"
            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
          >
            <FaQuestion className="h-5 w-5" />
            سوالات متداول
          </Link>
          <Link
            href="#"
            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
          >
            <Users className="h-5 w-5" />
            تماس با ما
          </Link>
          <Link
            href="#"
            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
          >
            <FaHeadphones className="h-5 w-5" />
            پشتیبانی
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
