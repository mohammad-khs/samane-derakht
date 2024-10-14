"use client";

import { FC, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useWindowDimensions } from "@/hooks/useWindowDimentions";
import StoryModal from "./ui/storyModal";

interface StoryCarouselProps {}

const sliderData = [
  {
    id: 1,
    icon: "love",
    url: "https://cdn.pixabay.com/photo/2014/12/16/22/25/woman-570883_1280.jpg",
    occasion: "نامزدی",
  },
  {
    id: 2,
    icon: "marriage",
    url: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
    occasion: "ازدواج",
  },
  {
    id: 3,
    icon: "childBirth",
    url: "https://cdn.pixabay.com/photo/2013/10/02/23/03/mountains-190055_1280.jpg",
    occasion: "تولد نوزاد",
  },
  {
    id: 4,
    icon: "celebration",
    url: "https://cdn.pixabay.com/photo/2013/07/18/20/26/sea-164989_1280.jpg",
    occasion: "روز طبیعت",
  },
  {
    id: 5,
    icon: "birthDay",
    url: "https://cdn.pixabay.com/photo/2013/10/02/23/03/mountains-190055_1280.jpg",
    occasion: "تولد",
  },
  {
    id: 6,
    icon: "deathAnniversary",
    url: "https://cdn.pixabay.com/photo/2014/12/16/22/25/woman-570883_1280.jpg",
    occasion: "سالگرد فوت",
  },
  {
    id: 7,
    icon: "funeral",
    url: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
    occasion: "فوت",
  },
  {
    id: 8,
    icon: "love",
    url: "https://cdn.pixabay.com/photo/2014/12/16/22/25/woman-570883_1280.jpg",
    occasion: "نامزدی",
  },
  {
    id: 9,
    icon: "marriage",
    url: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
    occasion: "ازدواج",
  },
  {
    id: 10,
    icon: "childBirth",
    url: "https://cdn.pixabay.com/photo/2013/10/02/23/03/mountains-190055_1280.jpg",
    occasion: "تولد نوزاد",
  },
];

const StoryCarousel: FC<StoryCarouselProps> = () => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState<number | null>(
    null
  );
  const handleCarouselActive = (storyWidth: number | undefined): boolean => {
    if (storyWidth !== undefined) {
      return storyWidth < 1024; // Adjust as needed
    }
    return false;
  };

  const storyWidth = useWindowDimensions().width;

  const [emblaRef] = useEmblaCarousel({
    loop: true,
    active: handleCarouselActive(storyWidth),
  });

  // Function to open a story by setting the active story index
  const openStory = (index: number) => {
    setCurrentStoryIndex(index);
  };

  // Close the modal
  const closeStory = () => {
    setCurrentStoryIndex(null);
  };

  return (
    <>
      <div className="relative md:mx-5 lg:mx-8 xl:mx-10  mb-12">
        <div
          className="overflow-hidden relative my-12 w-full flex items-center justify-center"
          ref={emblaRef}
        >
          <div className="flex h-full w-full">
            {sliderData?.map((item, index) => (
              <div className="relative mx-3 w-full  lg:w-full" key={item.id}>
                <button
                  onClick={() => openStory(index)}
                  className="flex flex-col justify-center items-center"
                >
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
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for viewing the story */}
      {currentStoryIndex !== null && (
        <StoryModal
          sliderData={sliderData}
          closeStory={closeStory}
          setCurrentStoryIndex={setCurrentStoryIndex}
          currentStoryIndex={currentStoryIndex}
        />
      )}
    </>
  );
};

export default StoryCarousel;
