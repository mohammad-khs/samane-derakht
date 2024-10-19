import { FC } from "react";

import CustomerReviewsCarousel from "./ui/main/customerReviewsCarousel";
import VideoCarousel from "./ui/main/videoCarousel";

interface VideoCarouselSectionProps {}

const VideoCarouselSection: FC<VideoCarouselSectionProps> = async () => {
  const req = await fetch("https://treeone.liara.run/api/videos/");
  const res = await req.json();

  return (
    <>
      <VideoCarousel hasPrevNextBtn videoCarouselData={res} />
    </>
  );
};

export default VideoCarouselSection;
