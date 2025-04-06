import { FC } from "react";
import { Loader2Icon } from "lucide-react";
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

export type MainMapType = {
  id: string;
  title: string;
  city_name: string;
  longtitud: string;
  latitud: string;
  theme_tree: string;
};

const fetchMapData = async (): Promise<MainMapType[]> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/map/`);

    if (!res.ok) {
      throw new Error("Failed to fetch map data");
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching map data:", error);
    return [];
  }
};

const MapSection: FC = async () => {
  const data = await fetchMapData();

  return (
    <section className="flex flex-col md:flex-row justify-center mx-5 md:mx-10 items-center my-20">

        <DynamicCustomLeafletMap mapMarkerData={data} zoom={10} />
      
      
    </section>
  );
};

export default MapSection;
