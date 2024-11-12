import { FC } from "react";
import Carousel from "./carousel";
import { mainCarouselCardData } from "@/types/mainCarousels";

interface MainCarouselProps {
  data?: mainCarouselCardData[];
  hasPrevNextBtn?: boolean;
  background?: string;
}

const fetchCarouselData = async (): Promise<mainCarouselCardData[]> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/`);

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching carousel data:", error);
    return [];
  }
};

const MainCarousel: FC<MainCarouselProps> = async ({
  data,
  hasPrevNextBtn = false,
  background,
}) => {
  const carouselData = data || (await fetchCarouselData());

  return (
    <section>
      <Carousel
        background={background}
        cardsData={carouselData}
        hasPrevNextBtn={hasPrevNextBtn}
      />
    </section>
  );
};

export default MainCarousel;
