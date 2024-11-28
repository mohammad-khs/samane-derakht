import { CompleteInfoProvider } from "@/context/completeInfo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "تکمیل اطلاعات",
  description: "قسمت تکمیل اطلاعات برای درگاه خرید",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <CompleteInfoProvider>{children}</CompleteInfoProvider>;
}
