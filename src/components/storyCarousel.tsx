"use client";

import { FC, useEffect, useState } from "react";
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
  {
    id: 10,
    icon: "parentsBirthday",
    occasion: "تولد پدرومادر",
  },
];

const StoryCarousel: FC<StoryCarouselProps> = () => {
  type WindowDimentions = {
    width: number | undefined;
    height: number | undefined;
  };

  const useWindowDimensions = (): WindowDimentions => {
    const [windowDimensions, setWindowDimensions] = useState<WindowDimentions>({
      width: undefined,
      height: undefined,
    });
    useEffect(() => {
      function handleResize(): void {
        setWindowDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      handleResize();
      window.addEventListener("resize", handleResize);
      return (): void => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount

    return windowDimensions;
  };

  const handleCarouselActive = (storyWidth: number | undefined): boolean => {
    if (storyWidth !== undefined) {
      if (storyWidth >= 1024) {
        return false;
      }
      return true;
    }
    return false;
  };

  const storyWidth = useWindowDimensions().width;

  const [emblaRef] = useEmblaCarousel({
    loop: true,
    active: handleCarouselActive(storyWidth),
  });

  return (
    <>
      <div className="relative md:mx-5 lg:mx-8 xl:mx-10  mb-12">
        <div
          className="overflow-hidden relative my-12 w-full flex items-center justify-center"
          ref={emblaRef}
        >
          <div className="flex h-full w-full">
            {sliderData?.map((item) => {
              return (
                <div className="relative mx-3  lg:w-full" key={item.id}>
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
