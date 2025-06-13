"use client";
import Image from "next/image";
import { FC, useState } from "react";
import { DotButton, useDotButton } from "../ui/emblaCarouselDotButton";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { CommentCarouselCardData } from "@/types/mainCarousels";
import { apiNameToIconName } from "@/helper/nameToIcon";
import { X } from "lucide-react";

interface CustomerReviewsCarouselProps {
  customerReviewsData: CommentCarouselCardData[];
}

const MAX_TEXT_LENGTH = 100;

const CustomerReviewsCarousel: FC<CustomerReviewsCarouselProps> = ({
  customerReviewsData,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, slidesToScroll: "auto" },
    [Autoplay({ active: true, delay: 4000 })]
  );

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] =
    useState<CommentCarouselCardData | null>(null);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const handleShowMore = (review: CommentCarouselCardData) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="relative md:mx-5 lg:mx-8 xl:mx-10">
        <div
          className="overflow-hidden relative my-12 w-full flex items-center justify-center"
          ref={emblaRef}
        >
          <div className="flex h-full w-full">
            {customerReviewsData?.map((item) => {
              const isTextLong = item.text.length > MAX_TEXT_LENGTH;
              const displayedText = isTextLong
                ? `${item.text.substring(0, MAX_TEXT_LENGTH)}...`
                : item.text;

              return (
                <div className="relative mx-5 md:mx-10" key={item.id}>
                  <div className="flex flex-col w-[280px] md:w-[320px] rounded-xl border-2 border-[#E3E5E9] justify-center items-center">
                    <div className="m-2 w-[275px] md:w-[305px] relative">
                      <div className="rounded-xl px-2 py-1 font-semibold flex justify-end items-center">
                        <div>
                          <div className="text-[#242424]">{item.username}</div>
                          <div className="text-[#888888] text-sm">
                            {item.source}
                          </div>
                        </div>
                        <div className="m-2 relative rounded-full border-2 w-20 h-20 border-[#DBDBDB]">
                          <Image
                            className="p-3"
                            src={`/svgs/storySvgs/${apiNameToIconName(
                              item.theme_name
                            )}.svg`}
                            alt={`${item.theme_name} icon`}
                            fill
                          />
                        </div>
                      </div>
                    </div>
                    <div className="m-3">
                      <h1 className="flex text-sm font-semibold">
                        <span dir="rtl">{displayedText}</span>
                      </h1>
                      {isTextLong && (
                        <button
                          onClick={() => handleShowMore(item)}
                          className="text-[#28d16c] text-sm mt-2 hover:underline"
                        >
                          نمایش بیشتر
                        </button>
                      )}
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

      {isModalOpen && selectedReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-bold">{selectedReview.username}</h2>
                <p className="text-gray-500">{selectedReview.source}</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X />
              </button>
            </div>
            <div className="relative rounded-full border-2 w-20 h-20 border-[#DBDBDB] mb-4">
              <Image
                className="p-3"
                src={`/svgs/storySvgs/${apiNameToIconName(
                  selectedReview.theme_name
                )}.svg`}
                alt={`${selectedReview.theme_name} icon`}
                fill
              />
            </div>
            <p className="text-gray-700 whitespace-pre-line">
              {selectedReview.text}
            </p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 px-4 py-2 bg-[#28d16c] text-white rounded hover:bg-[#20ac58]"
            >
              بستن
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomerReviewsCarousel;
