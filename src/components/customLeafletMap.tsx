"use client";

import { useState } from "react";
import { FC } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { Icon, latLng, LatLng } from "leaflet";
import { MainMapType } from "./main/mapSection";
import { apiNameToIconName } from "@/helper/nameToIcon";
import { Button } from "./ui/button";
import { FullscreenIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { CaretLeftIcon } from "@radix-ui/react-icons";

interface CustomMapboxProps {
  zoom?: number;
  initialPostion?: LatLng;
  mapMarkerData: MainMapType[];
}

const CustomMapbox: FC<CustomMapboxProps> = ({
  zoom = 12,
  initialPostion = latLng(35.74472, 51.375265),
  mapMarkerData,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const router = useRouter();
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      {/* Button to open modal */}

      {/* Initial map with original sizing */}
      <div className="w-full border-2 p-3 rounded-[40px]">
        <div className="relative rounded-3xl w-full z-40 h-80">
          <Button
            className="absolute top-4 right-4 z-50"
            size={"icon"}
            variant={"green"}
            onClick={openModal}
          >
            <FullscreenIcon />
          </Button>
          <MapContainer
            className="w-full rounded-3xl z-30 h-80"
            center={initialPostion}
            zoom={zoom}
            minZoom={10}
            scrollWheelZoom={true}
            zoomControl={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {mapMarkerData.map((marker) => {
              const customIcon = new Icon({
                iconUrl: `/svgs/map_svgs/${apiNameToIconName(
                  marker.theme_tree
                )}D.svg`,
                iconSize: [70, 70], // size of the icon
                iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
                popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
              });
              return (
                <Marker
                  icon={customIcon}
                  position={latLng(
                    Number(marker.latitud),
                    Number(marker.longtitud)
                  )}
                  key={marker.id}
                  eventHandlers={{
                    click: () => {
                      router.push(`/myTree/${marker.id}/`);
                    },
                  }}
                />
              );
            })}
          </MapContainer>
        </div>

        {/* Modal for fullscreen map */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
            <div className="relative w-full h-full">
              <button
                className="absolute top-4 right-4 text-white bg-red-500 rounded-full p-2 hover:bg-red-600 z-50"
                onClick={closeModal}
              >
                <X />
              </button>
              <MapContainer
                className="w-full h-full z-40"
                center={initialPostion}
                zoom={zoom}
                minZoom={7}
                scrollWheelZoom={true}
                zoomControl={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {mapMarkerData.map((marker) => {
                  const customIcon = new Icon({
                    iconUrl: `/svgs/map_svgs/${apiNameToIconName(
                      marker.theme_tree
                    )}D.svg`,
                    iconSize: [70, 70], // size of the icon
                    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
                    popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
                  });
                  return (
                    <Marker
                      icon={customIcon}
                      position={latLng(
                        Number(marker.latitud),
                        Number(marker.longtitud)
                      )}
                      key={marker.id}
                      eventHandlers={{
                        click: () => {
                          router.push(`/myTree/${marker.id}/`);
                        },
                      }}
                    />
                  );
                })}
              </MapContainer>
            </div>
          </div>
        )}
      </div>

      <div className="w-3/4 flex flex-col mt-5 ms-10 gap-8 lg:ms-20 lg:mr-10">
        <h1 className="font-semibold text-2xl md:text-xl lg:text-2xl xl:text-3xl">
          درخت های کاشته شده توسط تیم ما
        </h1>
        <div className="text-base font-semibold">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
          استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
          ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و
          کاربردهای
        </div>
        <div className="flex">
          <div className="basis-1/2 hidden md:block"></div>
          <Button
            className="justify-self-end md:justify-self-start"
            variant="green"
            size="resizble"
            onClick={openModal}
          >
            <CaretLeftIcon className="h-8 w-8" />
            مشاهده همه
          </Button>
        </div>
      </div>
    </>
  );
};

export default CustomMapbox;
