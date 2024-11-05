import { FC } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import SignInModalParent from "./authentication/signInModalParent";
import ShoppingCartButton from "./ui/shoppingCartButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
interface NavbarProps {}

const Navbar: FC<NavbarProps> = async () => {
  const session = await getServerSession(authOptions);
  return (
    <>
      <nav className="bg-[#E4E7E5] flex-row py-2 mx-2 hidden md:flex rounded-xl">
        <div className="flex justify-start items-center gap-4 ms-5 basis-1/3">
          <SignInModalParent>ثبت نام/ورود</SignInModalParent>
          <ShoppingCartButton session={session} />
        </div>
        <div className="w-full flex gap-1 lg:gap-4 justify-center items-center basis-1/3">
          <Button className="font-semibold" size={"resizble"} variant={"ghost"}>
            پشتیبانی
          </Button>
          <Button className="font-semibold" size={"resizble"} variant={"ghost"}>
            تماس با ما
          </Button>
          <Button className="font-semibold" size={"resizble"} variant={"ghost"}>
            سوالات متداول
          </Button>
          <Button className="font-semibold" size={"resizble"} variant={"ghost"}>
            درباره ما
          </Button>
          <Link href={"/products"}>
            <Button
              className="font-semibold"
              size={"resizble"}
              variant={"ghost"}
            >
              محصولات
            </Button>
          </Link>
        </div>
        <div className=" me-5 basis-1/3">
          <Link href={"/"} className="flex justify-end  gap-3 items-center">
            <span className="text-sm font-semibold">سامانه درخت</span>
            <Button size={"icon"} variant={"green"}></Button>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
