import Footer from "@/components/footer";
import MobileNav from "@/components/mobile-nav";
import Navbar from "@/components/navbar";
import { CompleteInfoProvider } from "@/context/completeInfo";
import type { Metadata } from "next";
import ProgressBar from "../progressBar";

export const metadata: Metadata = {
  title: "تکمیل اطلاعات",
  description: "قسمت تکمیل اطلاعات برای درگاه خرید",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-[#EBEBEB]">
      <div className="md:container md:mx-auto md:pt-5">
        <Navbar />
        <MobileNav />
        <header className="bg-white mx-4 mt-4 rounded-xl">
          <div className="w-full flex justify-center">
            <div className="w-full md:w-4/5 lg:w-3/5">
              <ProgressBar step="4" />
            </div>
          </div>
        </header>
        <main>{children}</main>
      </div>
      <Footer sponsors={false} />
    </div>
  );
}
