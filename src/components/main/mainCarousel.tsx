import { FC } from "react";
import Carousel from "./carousel";
import { mainCarouselCardData } from "@/types/mainCarousels";

interface MainCarouselProps {
  data?: mainCarouselCardData[];
  hasPrevNextBtn?: boolean;
  background?: string;
}

const MainCarousel: FC<MainCarouselProps> = async ({
  data,
  hasPrevNextBtn = false,
  background,
}) => {
  if (!data) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/`);
    const fetchedData: mainCarouselCardData[] = await res.json();

    return (
      <>
        <section>
          <Carousel
            background={background}
            cardsData={fetchedData}
            hasPrevNextBtn={hasPrevNextBtn}
          />
        </section>
      </>
    );
  }

  return (
    <>
      <section>
        <Carousel
          background={background}
          cardsData={data}
          hasPrevNextBtn={hasPrevNextBtn}
        />
      </section>
    </>
  );
};

export default MainCarousel;
