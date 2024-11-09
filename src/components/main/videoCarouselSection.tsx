import { FC } from "react";

import CustomerReviewsCarousel from "./customerReviewsCarousel";
import VideoCarousel from "./videoCarousel";

interface VideoCarouselSectionProps {}

const VideoCarouselSection: FC<VideoCarouselSectionProps> = async () => {
  const req = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/videos/`);
  const res = await req.json();

  return (
    <>
      <VideoCarousel hasPrevNextBtn videoCarouselData={res} />
    </>
  );
};

export default VideoCarouselSection;
