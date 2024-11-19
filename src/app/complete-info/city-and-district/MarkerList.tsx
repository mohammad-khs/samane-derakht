"use client";
import { FC } from "react";
import { handleMarkerClick } from "./plantTreeMap";
import { ProvinceData } from "./page";
import { Session } from "next-auth";
import { useCompleteInfoContext } from "@/context/completeInfo";
import { X } from "lucide-react";

interface MarkerListProps {
  data: ProvinceData | null;
  session: Session | null;
}

const MarkerList: FC<MarkerListProps> = ({ data, session }) => {
  const { selectedMarkers, setSelectedMarkers } = useCompleteInfoContext();
  return (
    <>
      {data &&
        selectedMarkers.map((marker) => (
          <div
            className="flex justify py-2 gap-3 items-center px-3 bg-[#e4e4e4] rounded-lg my-4"
            key={marker.id}
          >
            <button
              onClick={() => {
                handleMarkerClick(
                  marker,
                  session,
                  selectedMarkers,
                  setSelectedMarkers,
                  data.empty_tree_allowed
                );
              }}
              className="bg-red-600 text-white text-sm rounded-full p-1"
            >
              <X className="w-4 h-4" />
            </button>
            <div
              className="flex flex-col gap-2 sm:flex-row sm:gap-3 text-sm"
              dir="rtl"
            >
              <div>مکان: {marker.province_name}</div>
              <div> عرض جغرافیای: {marker.latitud}</div>
              <div>طول جغرافیای: {marker.longtitud}</div>
            </div>
          </div>
        ))}
    </>
  );
};

export default MarkerList;
