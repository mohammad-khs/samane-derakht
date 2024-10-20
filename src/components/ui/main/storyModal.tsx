"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { StoryImageId } from "./storyCarousel";
import { ArrowRight, EyeIcon, FrownIcon, MapPin } from "lucide-react";
import { CaretLeftIcon, CaretRightIcon } from "@radix-ui/react-icons";
import TreeIcon from "../treeIcon";

interface ImageData {
  id: string;
  story_name: string;
  image: string;
  seen_numbers: string;
  title: string;
  address: string;
}

interface StoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  imagesId: StoryImageId[];
  storyId: string;
}

const StoryModal: React.FC<StoryModalProps> = ({
  isOpen,
  onClose,
  imagesId,
  storyId,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const currentImageId: StoryImageId = imagesId[currentIndex];

  const fetchImageData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `https://treeone.liara.run/api/image/${storyId}/${currentImageId.id}`
      );
      const data = await res.json();
      setImageData(data);
    } catch (error) {
      console.error("Error fetching image data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [storyId, currentImageId]);

  useEffect(() => {
    if (isOpen && currentImageId) {
      fetchImageData();
    }
  }, [isOpen, currentImageId, fetchImageData]);

  const handleNext = () => {
    if (currentIndex < imagesId.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleOutsideClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).id === "story-modal-overlay") {
      setImageData(null);
      onClose();
    }
  };

  if (!isOpen || !imageData) {
    return null;
  }

  return (
    <div
      id="story-modal-overlay"
      onClick={handleOutsideClick}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40"
    >
      <div className="flex justify-center rounded-lg relative">
        <div className="carousel flex items-center justify-between">
          <div className="absolute sm:relative flex w-full sm:w-auto">
            <button
              className="z-50 rounded-full disabled:opacity-0 transition-colors hover:bg-white mx-2"
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              <CaretLeftIcon className="h-12 w-12 rounded-full text-[#999999]" />
            </button>
          </div>
          <div className="relative rounded-lg carousel-item text-center py-2 h-[650px] w-[360px]">
            {isLoading ? (
              <></>
            ) : imageData.image ? (
              <>
                <div className="relative py-4 w-full h-full">
                  <button
                    className="absolute z-50 right-4 text-white"
                    onClick={onClose}
                  >
                    <ArrowRight className="h-8 w-8" />
                  </button>
                  <Image
                    fill
                    className="rounded-lg animate-in fade-in"
                    src={`https://treeone.liara.run/${imageData.image}`}
                    alt={imageData.title}
                  />
                  <div className="absolute right-14 flex items-center justify-center gap-4">
                    <div
                      className="truncate w-20 text-white"
                      style={{ direction: "rtl" }}
                    >
                      {imageData?.title}
                    </div>
                    <div className="relative bg-white w-8 h-8 rounded-full">
                      <TreeIcon imageName={imageData.story_name} />
                    </div>
                  </div>
                  <div className="absolute mx-2 z-50 h-full flex justify-end items-center flex-col">
                    <div className="mb-32 flex items-center flex-col">
                      <EyeIcon className="text-white" />
                      <p className="text-white">{imageData?.seen_numbers}</p>
                    </div>
                  </div>

                  <div
                    aria-label={imageData?.address}
                    className="text-white absolute w-3/4 flex justify-end items-center gap-2 bottom-6 right-4"
                  >
                    <span className="truncate" style={{direction: "rtl"}}>{imageData?.address}</span>
                    {imageData?.address && <MapPin className="w-8" />}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="w-full h-full rounded-lg z-40 bg-slate-600 flex justify-center items-center">
                  <FrownIcon className="h-20 text-white w-20" />
                  {/* <div className="absolute top-0 left-0 mx-2 z-50 h-full flex items-end">
                    <EyeIcon className="text-white mb-36" />
                  </div> */}
                </div>
              </>
            )}
          </div>
          <div className="absolute sm:relative flex me-auto sm:me-0 w-full sm:w-auto justify-end items-center">
            <button
              className="z-50 rounded-full disabled:opacity-0 hover:bg-white transition-colors mx-2"
              onClick={handleNext}
              disabled={currentIndex === imagesId.length - 1}
            >
              <CaretRightIcon className="h-12 w-12 text-[#999999]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryModal;
