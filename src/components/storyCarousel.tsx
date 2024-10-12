"use client";

import { FC } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

interface StoryCarouselProps {}

const sliderData = [
  {
    id: 1,
    icon: "love",
    occasion: "نامزدی",
  },
  {
    id: 2,
    icon: "marriage",
    occasion: "ازدواج",
  },
  {
    id: 3,
    icon: "childBirth",
    occasion: "تولد نوزاد",
  },
  {
    id: 4,
    icon: "celebration",
    occasion: "روز طبیعت",
  },
  {
    id: 5,
    icon: "birthDay",
    occasion: "تولد",
  },
  {
    id: 6,
    icon: "deathAnniversary",
    occasion: "سالگرد فوت",
  },
  {
    id: 7,
    icon: "funeral",
    occasion: "فوت",
  },
  {
    id: 8,
    icon: "nature",
    occasion: "طبیعت",
  },
  {
    id: 9,
    icon: "parentsBirthday",
    occasion: "تولد پدرومادر",
  },
];

const StoryCarousel: FC<StoryCarouselProps> = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  return (
    <>
      <div className="relative md:mx-5 lg:mx-8 xl:mx-10  mb-12">
        <div
          className="overflow-hidden relative my-12 w-full  flex items-center justify-center"
          ref={emblaRef}
        >
          <div className="flex h-full w-full">
            {sliderData?.map((item) => {
              return (
                <div className="relative mx-5 md:mx-10 xl:mx-14" key={item.id}>
                  <div className="flex flex-col justify-center items-center">
                    <div className="border-4 border-[#E3E5E9] w-16 h-16 rounded-full relative">
                      <Image
                        className="p-[10px]"
                        src={`svgs/storySvgs/${item.icon}.svg`}
                        fill
                        alt={`${item.occasion} icon`}
                      />
                    </div>
                    <div className="my-3">
                      <div className=" flex text-center w-full text-sm font-semibold">
                        <span className="w-full">{item.occasion}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default StoryCarousel;
