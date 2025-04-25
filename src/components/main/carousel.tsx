"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { FC, useCallback } from "react";
import { DotButton, useDotButton } from "../ui/emblaCarouselDotButton";
import Image from "next/image";
import { CaretLeftIcon, CaretRightIcon } from "@radix-ui/react-icons";
import { mainCarouselCardData } from "@/types/mainCarousels";
import { apiNameToIconName } from "@/helper/nameToIcon";
import { Frown } from "lucide-react";
import { DateFormatDMY, monthNumToMonthName } from "@/helper/dateHandler";
import Link from "next/link";

interface CarouselProps {
  hasPrevNextBtn: boolean;
  cardsData: mainCarouselCardData[];
  background?: string;
}

const Carousel: FC<CarouselProps> = ({
  hasPrevNextBtn,
  cardsData,
  background = "bg-[#E7ECEE]",
}) => {
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

  // If less than 3 items, render statically
  if (!cardsData || cardsData.length < 3) {
    return (
      <div className="relative md:mx-5  lg:mx-8 xl:mx-10">
        <div className="my-12 w-full flex items-center justify-center">
          <div className="flex h-full w-full ">
            {cardsData?.map((item) => (
              <div className=" relative mx-2" key={item.id}>
                <div
                  className={`flex flex-col rounded-xl ${background} justify-center items-center`}
                >
                  <div className="m-2 w-[278px] h-[165px] relative">
                    {item.image ? (
                      <Image
                        className="rounded-xl"
                        fill
                        referrerPolicy="no-referrer"
                        unoptimized
                        src={
                          `${process.env.NEXT_PUBLIC_API_BASE_URL}${item?.image}` ||
                          "#"
                        }
                        alt={"null"}
                      />
                    ) : (
                      <div className="bg-slate-700 flex justify-center items-center h-full w-full rounded-xl">
                        <Frown className="h-10 w-10" />
                      </div>
                    )}
                    <div className="absolute right-2 top-2 rounded-xl px-2 py-1 text-sm font-semibold flex justify-center items-center bg-[#F0F3F4]">
                      <div>
                        <div className="text-[#242424]">{item.title}</div>
                        <div
                          style={{ direction: "rtl" }}
                          className="text-[#393939] text-xs font-thin"
                        >
                          {item.irani && (
                            <div>
                              {(() => {
                                const dateInfo = DateFormatDMY(item.irani);
                                if (dateInfo) {
                                  return (
                                    <>
                                      {dateInfo.year}{" "}
                                      {monthNumToMonthName(dateInfo.month)}{" "}
                                      {dateInfo.day}
                                    </>
                                  );
                                }
                                return null;
                              })()}
                            </div>
                          )}
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
                    <Link href={`/myTree/${item.id}`}>
                      <h1 className=" flex text-sm font-semibold">
                        <span className="">
                          {item.desc}{" "}
                          <span className="text-green-700">بیشتر</span>
                        </span>
                        <div className="ml-2">
                          <div className="relative h-6 w-6 p-1 rounded-md justify-center flex bg-white">
                            <Image
                              src={`/svgs/storySvgs/${apiNameToIconName(
                                item.theme_name
                              )}.svg`}
                              className="p-[2px]"
                              fill
                              alt="map pin"
                            />
                          </div>
                        </div>
                      </h1>
                    </Link>
                    <div className="text-sm flex justify-end w-full my-2">
                      <span className="">
                        {item.location_name} ,{item.province_name}
                      </span>
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
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="relative md:mx-5  lg:mx-8 xl:mx-10">
        <div
          className="overflow-hidden relative my-12 w-full flex items-center justify-center"
          ref={emblaRef}
        >
          <div className="flex h-full w-full ">
            {cardsData?.map((item) => {
              return (
                <div className=" relative mx-2" key={item.id}>
                  <div
                    className={`flex flex-col rounded-xl ${background} justify-center items-center`}
                  >
                    <div className="m-2 w-[278px] h-[165px] relative">
                      {item.image ? (
                        <Image
                          className="rounded-xl"
                          fill
                          referrerPolicy="no-referrer"
                          unoptimized
                          src={
                            `${process.env.NEXT_PUBLIC_API_BASE_URL}${item?.image}` ||
                            "#"
                          }
                          alt={"null"}
                        />
                      ) : (
                        <div className="bg-slate-700 flex justify-center items-center h-full w-full rounded-xl">
                          <Frown className="h-10 w-10" />
                        </div>
                      )}
                      <div className="absolute right-2 top-2 rounded-xl px-2 py-1 text-sm font-semibold flex justify-center items-center bg-[#F0F3F4]">
                        <div>
                          <div className="text-[#242424]">{item.title}</div>
                          <div
                            style={{ direction: "rtl" }}
                            className="text-[#393939] text-xs font-thin"
                          >
                            {item.irani && (
                              <div>
                                {(() => {
                                  const dateInfo = DateFormatDMY(item.irani);
                                  if (dateInfo) {
                                    return (
                                      <>
                                        {dateInfo.year}{" "}
                                        {monthNumToMonthName(dateInfo.month)}{" "}
                                        {dateInfo.day}
                                      </>
                                    );
                                  }
                                  return null;
                                })()}
                              </div>
                            )}
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
                      <Link href={`/myTree/${item.id}`}>
                        <h1 className=" flex text-sm font-semibold">
                          <span className="">
                            {item.desc}{" "}
                            <span className="text-green-700">بیشتر</span>
                          </span>
                          <div className="ml-2">
                            <div className="relative h-6 w-6 p-1 rounded-md justify-center flex bg-white">
                              <Image
                                src={`/svgs/storySvgs/${apiNameToIconName(
                                  item.theme_name
                                )}.svg`}
                                className="p-[2px]"
                                fill
                                alt="map pin"
                              />
                            </div>
                          </div>
                        </h1>
                      </Link>

                      <div className="text-sm flex justify-end w-full my-2">
                        <span className="">
                          {" "}
                          {item.location_name} ,{item.province_name}
                        </span>{" "}
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
        {hasPrevNextBtn && (
          <div className="flex justify-between absolute top-1/2 -translate-y-1/2 w-full px-4">
            <button
              onClick={scrollPrev}
              className="bg-white rounded-full p-3 shadow-lg hover:scale-105 transition-transform hidden md:block"
            >
              <CaretLeftIcon className="h-6 w-6 text-[#999999]" />
            </button>
            <button
              onClick={scrollNext}
              className="bg-white rounded-full p-3 shadow-lg hover:scale-105 transition-transform hidden md:block"
            >
              <CaretRightIcon className="h-6 w-6 text-[#999999]" />
            </button>
          </div>
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
    </>
  );
};

export default Carousel;
