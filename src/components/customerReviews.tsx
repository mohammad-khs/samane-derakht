"use client";

import { FC } from "react";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { DotButton, useDotButton } from "./ui/emblaCarouselDotButton";

interface CustomerReviewsProps {}

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

const CustomerReviews: FC<CustomerReviewsProps> = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, slidesToScroll: "auto" },
    [Autoplay({ active: true, delay: 4000 })]
  );

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);
  return (
    <>
      <div className="relative md:mx-5 lg:mx-8 xl:mx-10">
        <div
          className="overflow-hidden relative my-12 w-full  flex items-center justify-center"
          ref={emblaRef}
        >
          <div className="flex h-full w-full ">
            {sliderData?.map((item) => {
              return (
                <div className="relative mx-5 md:mx-10" key={item.id}>
                  <div className="flex flex-col w-[280px] md:w-[320px] rounded-xl border-2 border-[#E3E5E9] justify-center items-center">
                    <div className=" m-2 w-[275px] md:w-[305px]  relative">
                      <div className="rounded-xl px-2 py-1 font-semibold flex justify-end items-center">
                        <div>
                          <div className="text-[#242424]">{item.name}</div>
                          <div className="text-[#888888] text-sm">
                            {item.occasion}
                          </div>
                        </div>
                        <div className="m-2 relative rounded-full border-2 w-20 h-20 border-[#DBDBDB]">
                          <Image
                            className="p-3"
                            src={`/svgs/storySvgs/${item.icon}.svg`}
                            alt={`${item.icon} icon`}
                            fill
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
                      </h1>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

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

export default CustomerReviews;
