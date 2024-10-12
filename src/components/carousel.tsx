"use client";

import { FC, useCallback, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { CaretLeftIcon, CaretRightIcon } from "@radix-ui/react-icons";
import { DotButton, useDotButton } from "./ui/emblaCarouselDotButton";
interface CarouselProps {
  hasPrevNextBtn: boolean;
}
const sliderData = [
  {
    id: 1,
    title:
      " و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله",
    url: "https://cdn.pixabay.com/photo/2013/10/02/23/03/mountains-190055_1280.jpg",
    name: "آقای رضا محمدی پور",
    icon: "love",
    time: "10 مرداد 1403 ",
    address: "شیراز،خیابان شیرازی، بین کوچه ۱۶و۱۸",
  },
  {
    id: 2,
    title:
      " و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله",
    url: "https://cdn.pixabay.com/photo/2013/07/18/20/26/sea-164989_1280.jpg",
    name: "آقای رضا محمدی پور",
    icon: "funeral",
    time: "10 مرداد 1403 ",
    address: "شیراز،خیابان شیرازی، بین کوچه ۱۶و۱۸",
  },
  {
    id: 3,
    title:
      " و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله",
    url: "https://cdn.pixabay.com/photo/2013/10/02/23/03/mountains-190055_1280.jpg",
    name: "آقای رضا محمدی پور",
    icon: "celebration",
    time: "10 مرداد 1403 ",
    address: "شیراز،خیابان شیرازی، بین کوچه ۱۶و۱۸",
  },
  {
    id: 4,
    title:
      " و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله",
    url: "https://cdn.pixabay.com/photo/2014/12/16/22/25/woman-570883_1280.jpg",
    name: "آقای محمد کشاورزی",
    icon: "birthday",
    time: "10 مرداد 1403 ",
    address: "شیراز،خیابان شیرازی، بین کوچه ۱۶و۱۸",
  },
  {
    id: 5,
    title:
      " و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله",
    url: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
    name: "آقای رضا محمدی پور",
    icon: "babysBirth",
    time: "10 مرداد 1403 ",
    address: "شیراز،خیابان شیرازی، بین کوچه ۱۶و۱۸",
  },
];

const Carousel: FC<CarouselProps> = ({ hasPrevNextBtn }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, slidesToScroll: "auto" },
    [Autoplay({ active: true, delay: 3000 })]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  return (
    <div className="relative md:mx-5 lg:mx-8 xl:mx-10">
      <div
        className="overflow-hidden relative my-12 w-full  flex items-center justify-center"
        ref={emblaRef}
      >
        <div className="flex h-full w-full ">
          {sliderData?.map((item) => {
            return (
              <div className="relative mx-5 md:mx-10" key={item.id}>
                <div className="flex flex-col rounded-xl bg-[#E7ECEE] justify-center items-center">
                  <div className=" m-2 w-[275px] md:w-[305px] h-[180px] relative">
                    <Image
                      className="rounded-xl"
                      fill
                      referrerPolicy="no-referrer"
                      unoptimized
                      src={item.url}
                      alt={"null"}
                    />
                    <div className="absolute right-2 top-2 rounded-xl px-2 py-1 text-xs font-semibold flex justify-center items-center bg-[#F0F3F4]">
                      <div>
                        <div className="text-[#242424]">{item.name}</div>
                        <div className="text-[#393939] text-sm">
                          {item.time}
                        </div>
                      </div>
                      <div className="relative h-5 w-5 ml-1">
                        <Image
                          src={"/svgs/person.svg"}
                          fill
                          alt="person icon"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="m-3">
                    <h1 className=" flex text-sm font-semibold">
                      <span className="">
                        {item.title}{" "}
                        <span className="text-green-700">بیشتر</span>
                      </span>
                      <div className="ml-2">
                        <div className="relative h-6 w-6 p-1 rounded-md justify-center flex bg-white">
                          <Image
                            src={`/svgs/storySvgs/${item.icon}.svg`}
                            className="p-[2px]"
                            fill
                            alt="map pin"
                          />
                        </div>
                      </div>
                    </h1>

                    <div className="text-sm flex justify-end w-full my-2">
                      <span className="">{item.address}</span>{" "}
                      <div className="relative h-6 w-6 p-1 rounded-md justify-center flex ml-2 bg-white">
                        <Image
                          src={"/svgs/siteMapPin.svg"}
                          className="p-[2px]"
                          fill
                          alt="map pin"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {hasPrevNextBtn ? (
        <>
          <button
            className="embla__prev absolute left-[-50px] top-32 z-40  hidden md:block"
            onClick={scrollPrev}
          >
            <CaretLeftIcon className="h-12 w-12  text-[#999999]" />
          </button>
          <button
            className="embla__next absolute right-[-50px] top-32 hidden md:block"
            onClick={scrollNext}
          >
            <CaretRightIcon className="h-12 w-12  text-[#999999]" />
          </button>
        </>
      ) : (
        ""
      )}

      <div className="embla__dots flex gap-3 justify-center items-center">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            className={"embla__dot rounded-full h-3 transition-all justify-center ".concat(
              index === selectedIndex
                ? " embla__dot--selected w-6 bg-[#484848]"
                : "bg-[#C9CCD1] w-3"
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
