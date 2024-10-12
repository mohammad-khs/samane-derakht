"use client";
import { FC } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import Image from "next/image";
interface SponSorsProps {}

const SponSors: FC<SponSorsProps> = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    AutoScroll({ stopOnInteraction: false }),
  ]);
  return (
    <>
      <div className="py-5 bg-[#EEF3F0]">
        <h1 className="text-[#383838] text-2xl mt-2 mb-4 text-center">
          اسپانسرهای ما
        </h1>
        <div className="overflow-hidden font-semibold" ref={emblaRef}>
          <div className="flex">
            <div className="embla__slide flex justify-center items-center gap-4">
              <span>شیراز سبز</span>
              <div className="relative h-10 w-10">
                <Image
                  src={"/svgs/sponsors/shirazSabz.svg"}
                  fill
                  alt="شیراز سبز لوگو"
                />
              </div>
            </div>
            <div className="embla__slide flex justify-center items-center gap-4">
              <span>گیاه دارو اراک </span>
              <div className="relative h-10 w-10">
                <Image
                  src={"/svgs/sponsors/giahDaroArak.svg"}
                  fill
                  alt="گیاه دارو اراک لوگو"
                />
              </div>
            </div>
            <div className="embla__slide flex justify-center items-center gap-4">
              <span>پیشینیان سبز</span>
              <div className="relative h-10 w-10">
                <Image
                  src={"/svgs/sponsors/pishinianSabz.svg"}
                  fill
                  alt="پیشینیان سبز لوگو"
                />
              </div>
            </div>
            <div className="embla__slide flex justify-center items-center gap-4">
              <span>گسترگیاه</span>
              <div className="relative h-10 w-10">
                <Image
                  src={"/svgs/sponsors/gostargiah.svg"}
                  fill
                  alt="گسترگیاه لوگو"
                />
              </div>
            </div>
            <div className="embla__slide flex justify-center items-center gap-4">
              <span>گل گهر</span>
              <div className="relative h-10 w-10">
                <Image
                  src={"/svgs/sponsors/golgohar.svg"}
                  fill
                  alt="گل گهر لوگو"
                />
              </div>
            </div>
            <div className="embla__slide flex justify-center items-center gap-4">
              <span>شیرازگل</span>
              <div className="relative h-10 w-10">
                <Image
                  src={"/svgs/sponsors/shirazgol.svg"}
                  fill
                  alt="شیراز گل"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SponSors;
