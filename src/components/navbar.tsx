import { FC } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => {
  return (
    <>
      <nav className="bg-[#E4E7E5] flex-row py-2 my-5 mx-2 hidden md:flex rounded-xl">
        <div className="flex justify-start items-center gap-4 ms-5 basis-1/3">
          <Button size={"resizble"} variant={"green"}>
            ثبت نام/ورود
          </Button>
          <Button
            className="relative p-2"
            size={"resizbleIcon"}
            variant={"icon"}
          >
            <Image
              className="p-1"
              alt="سبد فروشگاهی"
              fill
              src={"/svgs/shoppingCart.svg"}
            />
          </Button>
        </div>
        <div className="w-full flex gap-1 lg:gap-4 justify-center items-center basis-1/3">
          <Button size={"resizble"} variant={"ghost"}>
            پشتیبانی
          </Button>
          <Button size={"resizble"} variant={"ghost"}>
            تماس با ما
          </Button>
          <Button size={"resizble"} variant={"ghost"}>
            سوالات متداول
          </Button>
          <Button size={"resizble"} variant={"ghost"}>
            درباره ما
          </Button>
          <Button size={"resizble"} variant={"ghost"}>
            محصولات
          </Button>
        </div>
        <div className="flex justify-end items-center me-5 gap-3 basis-1/3">
          <span className="text-sm  font-semibold">سامانه درخت</span>
          <Button size={"icon"} variant={"green"}></Button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
