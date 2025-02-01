"use client";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";
import { mobileNavLinks } from "../config/dashboard";
import { Session } from "next-auth";
import { DashboardSidebar } from "./dashboardSidebar";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export const MobileNavDashboard = ({
  session,
}: {
  session: Session | null;
}) => {
  return (
    <Sheet>
      <VisuallyHidden aria-describedby="dashboard menu">
        <SheetTitle>Menu</SheetTitle>
      </VisuallyHidden>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="shrink-0 h-full w-auto m-5 p-1 lg:hidden"
        >
          <Menu className="h-8 w-8 text-[#383838]" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="flex gap-0 py-0 h-full pr-0 flex-col"
      >
        <div dir="rtl" className="flex h-full">
          <nav className="flex flex-col h-full justify-around items-center gap-2 text-lg w-20 bg-[#eaeaea] font-medium">
            {mobileNavLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                {link.icon}
              </Link>
            ))}
          </nav>

          <DashboardSidebar session={session} />
        </div>
      </SheetContent>
    </Sheet>
  );
};
