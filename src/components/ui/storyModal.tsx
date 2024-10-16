import { CaretLeftIcon, CaretRightIcon } from "@radix-ui/react-icons";
import { X } from "lucide-react";
import Image from "next/image";
import { Dispatch, FC, SetStateAction, useEffect, useRef } from "react";

interface StoryModalProps {
  closeStory: () => void;
  sliderData: {
    id: number;
    icon: string;
    url: string;
    occasion: string;
  }[];
  setCurrentStoryIndex: Dispatch<SetStateAction<number | null>>;
  currentStoryIndex: number;
}

const StoryModal: FC<StoryModalProps> = ({
  closeStory,
  sliderData,
  setCurrentStoryIndex,
  currentStoryIndex,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      closeStory();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const nextStory = () => {
    setCurrentStoryIndex((prev) =>
      prev !== null && prev < sliderData.length - 1 ? prev + 1 : 0
    );
  };

  const prevStory = () => {
    setCurrentStoryIndex((prev) =>
      prev !== null && prev > 0 ? prev - 1 : sliderData.length - 1
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="relative w-full h-full sm:w-[360px] sm:h-[720px] flex flex-col items-center"
      >
        <button
          className="absolute top-4 right-4 flex z-50 text-white text-2xl"
          onClick={closeStory}
        >
          <X className="w-7 h-7 md:w-8 md:h-8" />
        </button>
        <Image
          src={sliderData[currentStoryIndex]?.url}
          fill
          unoptimized
          alt="Story Image"
        />

        <div className="absolute left-0 h-full flex md:-left-28 px-2 my-auto items-center">
          <button className="text-white" onClick={prevStory}>
            <CaretLeftIcon className="h-12 w-12  text-[#999999]" />
          </button>
        </div>
        <div className="absolute right-0 h-full flex md:-right-28 px-2 my-auto items-center">
          <button className="text-white" onClick={nextStory}>
            <CaretRightIcon className="h-12 w-12  text-[#999999]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryModal;
