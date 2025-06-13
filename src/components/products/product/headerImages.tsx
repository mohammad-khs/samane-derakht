"use client";

import { TreeData } from "@/types/products";
import { Frown } from "lucide-react";
import Image from "next/image";
import { FC, useState } from "react";

interface HeaderImagesProps {
  treeData: TreeData;
}

export const FallbackImage = () => (
  <div className="bg-[#d4cec9] w-full rounded-lg h-full items-center justify-center flex">
    <div className="relative h-16 w-32">
      <Image alt="no pictures found" fill src={"/icon.png"} />
    </div>
  </div>
);

const FallbackThumbnail = () => (
  <div className="relative h-[73px] w-full sm:w-[94px] sm:h-[94px] rounded-lg border bg-[#d4cec9] items-center justify-center flex">
    <div className="relative h-8 w-16">
      <Image alt="no pictures found" fill src={"/icon.png"} />
    </div>
  </div>
);

const HeaderImages: FC<HeaderImagesProps> = ({ treeData }) => {
  const mainImageUrl = treeData.tree?.image
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/${treeData.tree.image}`
    : null;

  const [selectedImage, setSelectedImage] = useState(mainImageUrl);
  const [thumbnailImages, setThumbnailImages] = useState(
    treeData.images?.map((image) => ({
      id: image.id,
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/${image.image}`,
    })) || []
  );

  const handleThumbnailClick = (imageId: string, imageUrl: string) => {
    const updatedThumbnails = thumbnailImages.map((thumb) =>
      thumb.id === imageId ? { ...thumb, url: selectedImage! } : thumb
    );
    setThumbnailImages(updatedThumbnails);
    setSelectedImage(imageUrl);
  };
  return (
    <>
      <div className="grid gap-2 grid-flow-row">
        {/* Main Tree Image */}
        <div className="flex justify-center">
          <div className="border-2 border-[#D2D2D2] p-1 rounded-lg w-full sm:w-[400px] h-[300px]">
            {selectedImage ? (
              <div className="relative w-full h-full">
                <Image
                  alt={`تصویر ${treeData.tree?.name}`}
                  fill
                  className="rounded-lg"
                  src={selectedImage}
                />
              </div>
            ) : (
              <FallbackImage />
            )}
          </div>
        </div>

        {/* Thumbnails */}
        <div className="flex justify-evenly items-center">
          {thumbnailImages && thumbnailImages.length > 0
            ? thumbnailImages.map((image) => (
                <div
                  className="relative h-[72px] w-[72px] sm:w-[94px] sm:h-[94px] rounded-lg border cursor-pointer"
                  key={image.id}
                  onClick={() => handleThumbnailClick(image.id, image.url)}
                >
                  <Image
                    fill
                    className="rounded-lg"
                    alt={`${treeData.tree?.name} تصویر ${image.id}`}
                    src={image.url}
                  />
                </div>
              ))
            : Array(4)
                .fill(null)
                .map((_, index) => <FallbackThumbnail key={index} />)}
        </div>
      </div>
    </>
  );
};

export default HeaderImages;
