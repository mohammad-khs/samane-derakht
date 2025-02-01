// config/dashboard.tsx
import { FaShoppingCart, FaHeart, FaEnvelope, FaChartLine, FaTree, FaComments, FaWallet, FaUserCircle, FaQuestion, FaHeadphones } from "react-icons/fa";
import { Package2, Info, ShoppingCart, Users } from "lucide-react";

export const navLinks = [
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
  { 
    icon: <FaEnvelope />,
    label: "پیام‌ها",
    href: "" 
  },
  {
    icon: <FaChartLine />,
    label: "گزارش مالی",
    href: "/dashboard/transactions",
  },
  {
    icon: <FaTree />,
    label: "درخت‌های من",
    href: "/dashboard/trees",
  },
  { 
    icon: <FaComments />,
    label: "دیدگاه‌های من",
    href: "" 
  },
  {
    icon: <FaWallet />,
    label: "برداشت مالی",
    href: "/dashboard/wallet",
  },
  {
    icon: <FaUserCircle />,
    label: "پنل کاربری",
    href: "/dashboard/profile-settings",
  },
];

export const mobileNavLinks = [
  {
    icon: <Package2 className="h-5 w-5" />,
    href: "/",
  },
  {
    icon: <Info className="h-5 w-5" />,
    href: "/company/about-us",
  },
  {
    icon: <ShoppingCart className="h-5 w-5" />,
    href: "/shopping-cart",
  },
  {
    icon: <FaQuestion className="h-5 w-5" />,
    href: "/company/faq",
  },
  {
    icon: <Users className="h-5 w-5" />,
    href: "#",
  },
  {
    icon: <FaHeadphones className="h-5 w-5" />,
    href: "#",
  },
];