import { FC } from "react";
import VideoCarousel from "./videoCarousel";
import { fetcher } from "@/lib/utils";
import { videoCarouselCardData } from "@/types/mainCarousels";

const fetchVideos = async (): Promise<videoCarouselCardData[]> => {
  try {
    const data = await fetcher(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/videos/`
    );
    return data;
  } catch (error) {
    console.error("Error fetching videos data:", error);
    return [];
  }
};

const VideoCarouselSection: FC = async () => {
  const data = await fetchVideos();

  return (
    <>
      <VideoCarousel hasPrevNextBtn videoCarouselData={data} />
    </>
  );
};

export default VideoCarouselSection;
