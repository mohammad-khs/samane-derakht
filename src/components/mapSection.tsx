import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { CaretLeftIcon } from "@radix-ui/react-icons";
import dynamic from "next/dynamic";

const DynamicCustomLeafletMap = dynamic(
  () => import("@/components/customLeafletMap"),
  {
    ssr: false,
    loading: () => (
      <div className="h-72 flex justify-center items-center">
        <Loader2Icon className="animate-spin h-9 w-9" />
      </div>
    ),
  }
);
interface MapSectionProps {}

export type MainMapType = {
  id: string;
  title: string;
  city_name: string;
  longtitud: string;
  latitud: string;
  theme_tree: string;
};

const MapSection: FC<MapSectionProps> = async () => {
  const req = await fetch("https://treeone.liara.run/api/map/");
  const data: MainMapType[] = await req.json();

  return (
    <>
      <section className="flex flex-col md:flex-row justify-center mx-5 md:mx-10 items-center my-20">
        <div className="w-full border-2 p-3 rounded-[40px]">
          <DynamicCustomLeafletMap mapMarkerData={data} zoom={10} />
        </div>
        <div className="w-3/4 flex flex-col mt-5 ms-10 gap-8 lg:ms-20 lg:mr-10">
          <h1 className="font-semibold text-2xl md:text-xl lg:text-2xl xl:text-3xl">
            درخت های کاشته شده توسط تیم ما
          </h1>
          <div className="text-base font-semibold">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
            استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز،
            و کاربردهای
          </div>
          <div className="flex ">
            <div className="basis-1/2 hidden md:block"></div>
            <Button
              className="justify-self-end md:justify-self-start"
              variant={"green"}
              size={"resizble"}
            >
              <CaretLeftIcon className="h-8 w-8" />
              مشاهده همه
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default MapSection;
