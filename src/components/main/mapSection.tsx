"use client";

import { FC, useEffect, useState } from "react";
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
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching map data:", error);
    return [];
  }
};

const MapSection: FC = () => {
  const [data, setData] = useState<MainMapType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedData = await fetchMapData();
        setData(fetchedData);
      } catch (error) {
        console.error("Error loading map data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);
  if (isLoading) {
    return (
      <div className="h-72 flex justify-center items-center">
        <Loader2Icon className="animate-spin h-9 w-9" />
      </div>
    );
  }

  return (
    <section className="flex flex-col md:flex-row justify-center mx-5 md:mx-10 items-center my-20">
      <DynamicCustomLeafletMap mapMarkerData={data} zoom={10} />
    </section>
  );
};

export default MapSection;
