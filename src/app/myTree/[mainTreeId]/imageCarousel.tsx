"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { FC, useCallback } from "react";
import Image from "next/image";
import { CaretLeftIcon, CaretRightIcon } from "@radix-ui/react-icons";
import { mainCarouselCardData } from "@/types/mainCarousels";
import {
  DotButton,
  useDotButton,
} from "@/components/ui/emblaCarouselDotButton";

interface ImageCarouselProps {
  hasPrevNextBtn: boolean;
  cardsData: mainCarouselCardData[];
  background?: string;
}

const ImageCarousel: FC<ImageCarouselProps> = ({
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

  return (
    <div className="relative md:mx-5 lg:mx-8 xl:mx-10" dir="ltr">
      <div
        className="overflow-hidden relative my-12 w-full flex items-center justify-center"
        ref={emblaRef}
      >
        <div className="flex h-full  w-[500px]">
          {cardsData?.map((item) => (
            <div className=" relative mx-2 flex: 0 0 78%;" key={item.id}>
              <div
                className={`flex rounded-[20px] ${background} justify-center items-center`}
              >
                <div className="m-2 w-[278px] h-[170px] relative">
                  {item.image ? (
                    <Image
                      className="rounded-xl"
                      fill
                      referrerPolicy="no-referrer"
                      unoptimized
                      src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${item?.image}` || "#"}
                      alt="Carousel image"
                    />
                  ) : (
                    <div className="bg-[#d4cec9] flex justify-center items-center h-full w-full rounded-xl">
                      <div className="relative h-16 w-32">
                          <Image
                            alt="no pictures found"
                            fill
                            src={"/icon.png"}
                          />
                        </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
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
  );
};

export default ImageCarousel;
