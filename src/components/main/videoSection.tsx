import { FC, Suspense } from "react";
import Video from "../ui/video";
import Image from "next/image";
import { Loader2Icon } from "lucide-react";



const VideoSection: FC = () => {
  return (
    <>
      <section className="flex flex-col md:flex-row justify-center mx-5 md:mx-10 items-center my-20">
        <div className="w-full  flex justify-center">
          <div className="w-full lg:w-10/12 border-2 p-3 rounded-[40px] shadow-2xl">
            <Suspense fallback={<Loader2Icon />}>
              <Video vidoAddress="/sampleVideo.mp4" />
            </Suspense>
          </div>
        </div>
        <div className="w-3/4 flex flex-col mt-10 md:mt-5 ms-10 gap-8 lg:ms-20 lg:mr-10">
          <h1 className="relative flex justify-end items-center  text-2xl md:text-xl lg:text-2xl xl:text-3xl">
            <span className="mx-2">
              <span>سامانه کاشت </span>
              <span className="font-semibold">درخت آنلاین</span>
            </span>
            <div className="absolute -right-10">
              <div className="relative">
                <Image
                  src={"/svgs/verticalBranchWithLeaves.svg"}
                  width={0}
                  height={0}
                  style={{ width: "100%", height: "auto" }}
                  alt="vertical Branch With Leaves"
                />
              </div>
            </div>
          </h1>
          <div className="text-base font-semibold border-r-4 pr-3">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
            استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز،
            و کاربردهای
          </div>
        </div>
      </section>
    </>
  );
};

export default VideoSection;
