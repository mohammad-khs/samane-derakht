"use client";

import { FC, useEffect, useState } from "react";
import Carousel from "./carousel";
import { mainCarouselCardData } from "@/types/mainCarousels";
import { fetcher } from "@/lib/utils";

interface MainCarouselProps {
  data?: mainCarouselCardData[];
  hasPrevNextBtn?: boolean;
  background?: string;
}

const fetchCarouselData = async (): Promise<mainCarouselCardData[]> => {
  try {
    const data = await fetcher(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/`);
    return data;
  } catch (error) {
    console.error("Error fetching carousel data:", error);
    return [];
  }
};

const MainCarousel: FC<MainCarouselProps> = ({
  data,
  hasPrevNextBtn = false,
  background,
}) => {
  const [carouselData, setCarouselData] = useState<mainCarouselCardData[]>(
    data || []
  );

  useEffect(() => {
    if (!data) {
      const fetchData = async () => {
        const fetchedData = await fetchCarouselData();
        setCarouselData(fetchedData);
      };
      fetchData();
    }
  }, [data]);

  return (
    carouselData.length > 0 && (
      <section>
        <Carousel
          background={background}
          cardsData={carouselData}
          hasPrevNextBtn={hasPrevNextBtn}
        />
      </section>
    )
  );
};

export default MainCarousel;
