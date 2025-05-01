import {
  FaShoppingCart,
  FaHeart,
  FaChartLine,
  FaTree,
  FaWallet,
  FaUserCircle,
  FaQuestion,
} from "react-icons/fa";
import { Info, Droplets, HomeIcon } from "lucide-react";
import ShoppingCartButton from "@/components/ui/shoppingCartButton";

export const navLinks = [
  {
    icon: <FaUserCircle />,
    label: "پنل کاربری",
    href: "/dashboard/profile-settings",
  },
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
  // {
  //   icon: <FaEnvelope />,
  //   label: "پیام‌ها",
  //   href: "",
  // },
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
  // {
  //   icon: <FaComments />,
  //   label: "دیدگاه‌های من",
  //   href: "",
  // },
  {
    icon: <FaWallet />,
    label: "برداشت مالی",
    href: "/dashboard/wallet",
  },
];

export const mobileNavLinks = [
  {
    icon: <HomeIcon className="h-5 w-5" />,
    href: "/",
  },
  {
    icon: <Info className="h-5 w-5" />,
    href: "/company/about-us",
  },
  {
    icon: <ShoppingCartButton isSideBar={true} />,
    href: "/shopping-cart", 
  },
  {
    icon: <FaQuestion className="h-5 w-5" />,
    href: "/company/faq",
  },
  {
    icon: <Droplets className="h-5 w-5" />,
    href: "/watering-trees",
  },
];
