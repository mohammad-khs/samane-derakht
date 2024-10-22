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
import {
  Home,
  InfoIcon,
  LineChart,
  Menu,
  Package,
  Package2,
  ShoppingCart,
  Users,
  Users2Icon,
} from "lucide-react";
import Link from "next/link";
import { GroupIcon } from "@radix-ui/react-icons";
import { FaHeadphones, FaQuestion } from "react-icons/fa";

export default function MobileNav() {
  return (
    <Sheet>
      <SheetDescription>
        <VisuallyHidden.Root>sidebar for moblie</VisuallyHidden.Root>
      </SheetDescription>

      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="shrink-0 h-full w-auto  m-5 p-1 md:hidden"
        >
          <Menu className="h-8 w-8 text-[#383838]" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <SheetTitle>
          <VisuallyHidden.Root>menu</VisuallyHidden.Root>
        </SheetTitle>
        <nav className="grid gap-2 text-lg font-medium">
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
            href="products"
            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
          >
            <Package2 className="h-5 w-5" />
            محصولات
          </Link>
          <Link
            href="#"
            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
          >
            <InfoIcon className="h-5 w-5" />
            درباره ما
          </Link>
          <Link
            href="#"
            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
          >
            <ShoppingCart className="h-5 w-5" />
            سبد خرید
          </Link>
          <Link
            href="#"
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
