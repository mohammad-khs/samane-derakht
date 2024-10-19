"use client";

import { apiNameToIconName } from "@/helper/nameToIcon";
import { useWindowDimensions } from "@/hooks/useWindowDimentions";
import { Story } from "@/types/mainCarousels";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { FC, useState } from "react";
import StoryModal from "./storyModal";

interface StoryCarouselProps {
  stories: Story[];
}

export interface StoryImageId {
  id: string;
}

const StoryCarousel: FC<StoryCarouselProps> = ({ stories }) => {
  const [currentStory, setCurrentStory] = useState<Story | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagesId, setImagesId] = useState<StoryImageId[]>([{ id: "" }]); // Store fetched image data
  const [storyId, setStoryId] = useState<string>("");

  const storyWidth = useWindowDimensions().width;
  const [emblaRef] = useEmblaCarousel({
    loop: true,
    active: storyWidth !== undefined && storyWidth < 1024,
  });

  const handleOpenModal = async (story: Story) => {
    setImagesId([{ id: "" }]);
    setStoryId("");
    setCurrentStory(null);
    setIsModalOpen(false);
    try {
      const res = await fetch(
        `https://treeone.liara.run/api/story/${story.id}/`
      );
      if (res.status === 429) {
        console.log("Rate limit exceeded. Please try again later.");
        return;
      }

      const data = await res.json();
      setImagesId(data);
      setStoryId(story.id);
      setCurrentStory(story);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching story images:", error);
    }
  };

  return (
    <>
      <div className="relative md:mx-5 lg:mx-8 xl:mx-10 mb-12">
        <div
          className="overflow-hidden relative my-12 w-full flex items-center justify-center"
          ref={emblaRef}
        >
          <div className="flex h-full w-full">
            {stories?.map((story) => (
              <div className="relative mx-3 w-full lg:w-full" key={story.id}>
                <button
                  onClick={() => handleOpenModal(story)}
                  className="flex flex-col justify-center items-center"
                >
                  <div className="border-4 border-[#E3E5E9] w-16 h-16 rounded-full relative">
                    <Image
                      className="p-[10px]"
                      src={`svgs/storySvgs/${apiNameToIconName(
                        story.name
                      )}.svg`}
                      fill
                      alt={`${story.name} icon`}
                    />
                  </div>
                  <div className="my-3">
                    <div className="flex text-center w-full text-sm font-semibold">
                      <span className="w-full">{story.name}</span>
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Render modal */}
      {currentStory && (
        <StoryModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          imagesId={imagesId}
          storyId={storyId}
        />
      )}
    </>
  );
};

export default StoryCarousel;
