import { FC } from "react";

import CustomerReviewsCarousel from "./customerReviewsCarousel";
import VideoCarousel from "./videoCarousel";

interface VideoCarouselSectionProps {}
const fetchVideos = async (): Promise<[]> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/videos/`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch videos data");
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching videos data:", error);
    return [];
  }
};

const VideoCarouselSection: FC<VideoCarouselSectionProps> = async () => {
  const data = await fetchVideos();

  return (
    <>
      <VideoCarousel hasPrevNextBtn videoCarouselData={data} />
    </>
  );
};

export default VideoCarouselSection;
