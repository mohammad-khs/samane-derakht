"use client";

import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../components/ui/button";
import Image from "next/image";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

interface HeroProps {}

const Hero: FC<HeroProps> = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    if (searchValue.trim()) {
      const encodedSearch = encodeURIComponent(searchValue.trim());
      router.push(`/products?search=${encodedSearch}`);
    }
  };

  return (
    <header className="flex flex-col relative w-full h-full">
      <Image
        src={"/svgs/heroCity.svg"}
        alt="hero city"
        width={0}
        height={0}
        className="w-full h-auto"
        priority
      />

      <h1 className="md:absolute w-full md:top-20 font-semibold -order-10 text-2xl md:text-3xl text-center lg:text-4xl text-[#363636]">
        هر نفر یک درخت، هر درخت یک داستان
      </h1>
      
      <div className="lg:absolute justify-center w-full lg:top-28 flex gap-5 flex-col">
        <div className="relative w-3/5 lg:w-2/5 mx-auto my-4">
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="py-2 outline-none lg:py-3 px-4 w-full shadow-md placeholder:text-[#5f5f5f] bg-transparent rounded-xl shadow-slate-300"
            type="text"
            dir="rtl"
            placeholder="جستجوی درخت"
          />
          <div className="absolute top-1 left-1">
            <Button
              onClick={handleSearch}
              className="flex justify-center items-center gap-1 bg-[#F2B93B] hover:bg-[#F2B93B] rounded-xl text-white"
              size={"resizble"}
            >
              <span>جستجو </span>
              <MagnifyingGlassIcon className="mt-1" />
            </Button>
          </div>
          <div className="text-[#5f5f5f] hidden text-xs md:flex justify-center mt-3 text-center w-full">
            <div className="w-5/6 sm:w-3/4 font-semibold">
              خیلی راحت میتونی با سرچ درختی که میخوای روتوی باکس زیر سرچ کنی
              وظرف یک هفته تیم ما برات کاشتش روانجام بده
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;