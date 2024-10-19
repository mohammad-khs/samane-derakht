"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ImageData {
  id: string;
  story_name: string;
  image: string;
  seen_numbers: string;
  title: string;
}

async function ServerSideComponent({ storyId }: { storyId: string }) {
  const [fetchedStoryImages, setFetchedStoryImages] = useState<ImageData[]>();
  useEffect(() => {
    const fetchStoryImageIds = async () => {
      const res = await fetch(
        `https://treeone.liara.run/api/story/${storyId}/`,
        {
          cache: "no-store", // Optional: To prevent caching
        }
      );
      const data: ImageData[] = await res.json();

      setFetchedStoryImages(data);
    };
    fetchStoryImageIds();
  }, [storyId]);

  return (
    <>
      {fetchedStoryImages?.map((image) => (
        <div key={image.id} className="embla__slide relative w-full h-64">
          <Image
            src={`https://treeone.liara.run/${image.image}`}
            alt={image.title}
            className="w-full h-full object-cover rounded-md"
          />
          <div className="absolute bottom-0 bg-black bg-opacity-50 text-white p-2 w-full">
            <h3>{image.title}</h3>
            <p>{image.story_name}</p>
          </div>
        </div>
      ))}
    </>
  );
}

export default ServerSideComponent;
