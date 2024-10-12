import { FC } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import heroCity from "@/public/svgs/heroCity.svg";
interface HeroProps {}

const Hero: FC<HeroProps> = () => {
  return (
    <>
      <div className="relative mt-16 flex w-full h-[50vh] justify-center">
        <Image
          src={"/svgs/heroCity.svg"}
          alt="hero city"
          className=" object-cover"
          fill
        />
        <div className="absolute top-20 flex gap-5 flex-col">
          <h1 className="font-semibold text-2xl md:text-3xl mx-5 text-center lg:text-4xl text-[#363636]">
            هر نفر یک درخت،هردرخت یک داستان
          </h1>
          <div className="relative mx-8">
            <input
              className="py-2 outline-none lg:py-3 px-4 w-full shadow-md placeholder:text-[#5f5f5f] bg-transparent rounded-xl shadow-slate-300"
              type="text"
              dir="rtl"
              placeholder="جستجوی درخت"
            />
            <div className="absolute top-1 left-1">
              <Button
                className="flex justify-center items-center gap-1 bg-[#F2B93B] hover:bg-[#F2B93B] rounded-xl text-white"
                size={"resizble"}
              >
                <span>جستجو </span>
                <MagnifyingGlassIcon className="mt-1" />
              </Button>
            </div>
            <div className="text-[#5f5f5f] text-xs flex justify-center mt-3 text-center w-full">
              <div className="w-5/6 sm:w-3/4 font-semibold">
                خیلی راحت میتونی با سرچ درختی که میخوای روتوی باکس زیر سرچ کنی
                وظرف یک هفته تیم ما برات کاشتش روانجام بده
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
