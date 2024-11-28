import Footer from "@/components/footer";
import MobileNav from "@/components/mobile-nav";
import Navbar from "@/components/navbar";
import { CompleteInfoProvider } from "@/context/completeInfo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "درگاه خرید",
  description: "قسمت انتخاب نحوه خرید در درگاه خرید",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-[#EBEBEB]">
      <div className="md:container md:mx-auto md:pt-5 min-h-[65vh]">
        <Navbar />
        <MobileNav />
        <main className="bg-white m-4 md:my-8 rounded-xl">{children}</main>
      </div>
      <Footer sponsors={false} />
    </div>
  );
}
