import { FC } from "react";
import Carousel from "./main/carousel";
import { mainCarouselCardData } from "@/types/mainCarousels";

interface MainCarouselProps {}

const MainCarousel: FC<MainCarouselProps> = async ({}) => {
  const res = await fetch("https://treeone.liara.run/api/");
  const data: mainCarouselCardData[] = await res.json();
  return (
    <>
      <section>
        <Carousel cardsData={data} hasPrevNextBtn={false} />
      </section>
    </>
  );
};

export default MainCarousel;
