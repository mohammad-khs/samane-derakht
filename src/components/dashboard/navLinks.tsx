"use client";

import Link from "next/link";
import { NavLink } from "@/types/dashboard";

interface NavLinksProps {
  links: NavLink[];
}

export const NavLinks = ({ links }: NavLinksProps) => (
  <nav className="flex flex-col gap-4 w-full">
    {links.map(({ icon, label, href }, index) => (
      <Link
        key={index}
        className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition px-4"
        href={href}
      >
        <span className="text-xl">{icon}</span>
        <span className="text-sm">{label}</span>
      </Link>
    ))}
  </nav>
);
