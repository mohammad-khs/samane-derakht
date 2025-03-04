"use client";
import { FC } from "react";
import { handleMarkerClick } from "./plantTreeMap";

import { Session } from "next-auth";
import { useCompleteInfoContext } from "@/context/completeInfo";
import { X } from "lucide-react";
import { ProvinceData } from "@/types/complete-info";

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
              className="flex flex-col leading-6 gap-2 sm:flex-row sm:gap-3 text-sm"
              dir="rtl"
            >
              <div>استان: {marker.province_name}</div>
              <div>شهر: {marker.city_name}</div>
              <div className="text-xs leading-6"> عرض: {marker.latitud}</div>
              <div className="text-xs leading-6">طول: {marker.longtitud}</div>
            </div>
          </div>
        ))}
    </>
  );
};

export default MarkerList;
