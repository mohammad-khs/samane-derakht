import CustomerReviews from "@/components/main/customerReviewsSection";
import FeatureSection from "@/app/featureSection";
import Hero from "@/app/hero";
import MapSection from "@/components/main/mapSection";
import StorySection from "@/components/main/storySection";
import { Button } from "@/components/ui/button";
import VideoSection from "@/components/main/videoSection";
import { CaretLeftIcon } from "@radix-ui/react-icons";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";
import VideoCarouselSection from "@/components/main/videoCarouselSection";
import MainCarousel from "@/components/main/mainCarousel";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import MobileNav from "@/components/mobile-nav";

export default function Home() {
  return (
    <>
      <main className="md:container md:mx-auto">
        <div className="my-5">
          <Navbar />
        </div>
        <MobileNav />

        <Suspense
          fallback={
            <div className="h-80 flex flex-col relative w-full z-50 bg-yellow-500">
              <Loader2 className="animate-spin z-50 flex justify-center items-center h-20 w-20 relative" />
            </div>
          }
        >
          <Hero />
        </Suspense>
        <Suspense
          fallback={
            <div className="h-20 z-50 w-full bg-red-800">
              <Loader2 className="animate-spin z-50 flex justify-center items-center h-20 w-20 relative" />
            </div>
          }
        >
          <StorySection />
        </Suspense>
        <div className="flex flex-col-reverse items-center mx-10 md:flex-row justify-between mt-14">
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
          <h1 className="text-[#383838] text-xl md:text-2xl font-semibold">
            درخت های کاشته شده توسط تیم ما
          </h1>
        </div>

        <MainCarousel />
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
          <div className="flex m-4">
            <Button
              className="justify-self-end md:justify-self-start"
              variant={"green"}
              size={"resizble"}
            >
              <CaretLeftIcon className="h-8 w-8" />
              مشاهده همه
            </Button>
          </div>
          <VideoCarouselSection />
        </div>
      </main>
      <Footer />
    </>
  );
}
