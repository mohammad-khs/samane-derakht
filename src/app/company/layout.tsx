import Footer from "@/components/footer";
import MobileNav from "@/components/mobile-nav";
import Navbar from "@/components/navbar";
import type { Metadata } from "next";
import Image from "next/image";

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
      <header className="z-30 fixed top-0 left-0 w-full">
        <Navbar isDashboard />
        <MobileNav disappearLg={true} />
      </header>
      <div className="lg:relative lg:mt-14 w-full h-72 object-cover">
        <Image
          priority
          src="/svgs/contact-us/contactUsHeader.svg"
          width={0}
          height={0}
          alt="contact us header"
          className="w-full h-72 object-cover absolute -top-4 "
        />
      </div>

      <div className="md:container md:mx-auto md:pt-5 min-h-[65vh]">
        <main className="m-4 md:my-8 rounded-xl" dir="rtl">
          {children}
        </main>
      </div>
      <Footer sponsors={false} />
    </div>
  );
}
