"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavLink } from "@/types/dashboard";

interface NavLinksProps {
  links: NavLink[];
}

export const NavLinks = ({ links }: NavLinksProps) => {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-4 w-full">
      {links.map(({ icon, label, href }, index) => {
        const isActive = pathname === href;
        return (
          <Link
            key={index}
            className={`flex items-center gap-2 transition px-4 ${
              isActive ? "text-green-600" : "text-gray-700 hover:text-green-600"
            }`}
            href={href}
          >
            <span className="text-xl">{icon}</span>
            <span className="text-sm">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
};
