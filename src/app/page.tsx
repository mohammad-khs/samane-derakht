import Carousel from "@/components/carousel";
import CustomerReviews from "@/components/customerReviews";
import FeatureSection from "@/components/featureSection";
import Hero from "@/components/hero";
import MapSection from "@/components/mapSection";
import StoryCarousel from "@/components/storyCarousel";
import { Button } from "@/components/ui/button";
import VideoCarousel from "@/components/videoCarousel";
import VideoSection from "@/components/videoSection";
import { CaretLeftIcon } from "@radix-ui/react-icons";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="flex flex-col-reverse items-center mx-5 md:flex-row justify-between mt-14">
        <div className="my-3">
          <Button
            className="justify-self-end md:justify-self-start"
            variant={"green"}
            size={"resizble"}
          >
            <CaretLeftIcon className="h-8 w-8" />
            مشاهده همه
          </Button>
        </div>
        <h1 className="text-[#383838] text-2xl font-semibold">
          درخت های کاشته شده توسط تیم ما
        </h1>
      </div>
      <StoryCarousel />
      <Carousel hasPrevNextBtn={false} />
      <VideoSection />
      <MapSection />
      <FeatureSection />
      <div className="my-12">
        <h1 className="font-semibold text-2xl md:text-3xl text-center text-[#383838]">
          نظرات مشتریان ما
        </h1>
        <CustomerReviews />
      </div>
      <div className="mx-5 my-3">
        <div className="flex ">
          <Button
            className="justify-self-end md:justify-self-start"
            variant={"green"}
            size={"resizble"}
          >
            <CaretLeftIcon className="h-8 w-8" />
            مشاهده همه
          </Button>
        </div>
        <VideoCarousel hasPrevNextBtn />
      </div>
    </>
  );
}
