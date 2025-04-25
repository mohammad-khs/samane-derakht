"use client";

import { FC, useEffect, useState } from "react";
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
    const data = await res.json();
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
