"use client";

import { FC, Suspense, useCallback, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { CaretLeftIcon, CaretRightIcon } from "@radix-ui/react-icons";
import { DotButton, useDotButton } from "./ui/emblaCarouselDotButton";
import { Loader2Icon } from "lucide-react";
import Video from "./ui/video";

interface VideoCarouselProps {
  hasPrevNextBtn: boolean;
}

const sliderData = [
  {
    id: 1,
    title:
      " و با استفاده از طراحان گرافیک است، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله",
    name: "رضا محمدی پور",
    icon: "love",
    time: "10 مرداد 1403",
    occasion: "به مناسبت نامزدی",
  },
  {
    id: 2,
    title:
      " و با استفاده از طراحان گرافیک است، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله",
    name: "رضا محمدی پور",
    icon: "marriage",
    time: "10 مرداد 1403",
    occasion: "به مناسبت نامزدی",
  },
  {
    id: 3,
    title:
      " و با استفاده از طراحان گرافیک است، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله",
    name: "علی رضا مرتضوی",
    icon: "childBirth",
    time: "10 مرداد 1403 ",
    occasion: "به مناسبت تولد نوزاد",
  },
  {
    id: 4,
    title:
      " و با استفاده از طراحان گرافیک است، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله",
    name: "رضا صادقی",
    icon: "celebration",
    time: "10 مرداد 1403 ",
    occasion: "به مناسبت روز طبیعت",
  },
  {
    id: 5,
    title:
      " و با استفاده از طراحان گرافیک است، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله",
    name: "محمد کشاورزی",
    icon: "birthDay",
    time: "10 مرداد 1403 ",
    occasion: "به مناسبت تولد",
  },
  {
    id: 6,
    title:
      " و با استفاده از طراحان گرافیک است، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله",
    name: "محمد رضایی",
    icon: "deathAnniversary",
    time: "10 مرداد 1403 ",
    occasion: "به مناسبت تولد نوزاد",
  },
];

const VideoCarousel: FC<VideoCarouselProps> = ({ hasPrevNextBtn }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, slidesToScroll: "auto" },
    [
      Autoplay({
        active: true,
        delay: 3500,
        stopOnFocusIn: true,
        stopOnMouseEnter: true,
      }),
    ]
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
    <>
      <div className="relative md:mx-5 lg:mx-8 xl:mx-10  mb-12">
        <div
          className="overflow-hidden relative my-12 w-full  flex items-center justify-center"
          ref={emblaRef}
        >
          <div className="flex h-full w-full ">
            {sliderData?.map((item) => {
              return (
                <div className="relative mx-2 md:mx-5 " key={item.id}>
                  <div className="flex flex-col w-[280px] md:w-[320px]   justify-center items-center">
                    <div className=" m-2 w-[275px] md:w-[305px]  relative">
                      <div className="flex flex-col justify-center items-center">
                        <div className="m-2 border-2 border-[#E3E5E9] p-1 rounded-3xl relative">
                          <Suspense fallback={<Loader2Icon />}>
                            <Video vidoAddress="/sampleVideo.mp4" />
                          </Suspense>
                        </div>
                        <div className="m-3">
                          <div className="text-sm mx-2 font-semibold">
                            <span className="">{item.title}</span>
                          </div>
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
    </>
  );
};

export default VideoCarousel;
