"use client";

import { useState, useEffect, useRef } from "react";
import { FC } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { Icon, latLng, LatLng } from "leaflet";
import { FullscreenIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Province, ProvinceMarker } from "./page";

interface PlantTreeMapProps {
  zoom?: number;
  initialPostion?: LatLng;
  mapMarkerData?: ProvinceMarker[];
  searchedProvince: Province | undefined;
}

const PlantTreeMap: FC<PlantTreeMapProps> = ({
  zoom = 12,
  initialPostion = latLng(35.74472, 51.375265),
  mapMarkerData,
  searchedProvince,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [mapCenter, setMapCenter] = useState(initialPostion);
  const mapRef = useRef<any>(null); // Ref for the main map container

  useEffect(() => {
    if (searchedProvince) {
      const newCenter = latLng(
        Number(searchedProvince.latitud),
        Number(searchedProvince.longtitud)
      );
      setMapCenter(newCenter); // Update the center state
      if (mapRef.current) {
        mapRef.current.setView(newCenter, zoom); // Update the main map view
      }
    }
  }, [searchedProvince, zoom]);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
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
          ref={mapRef}
          className="w-full rounded-3xl z-30 h-80"
          center={mapCenter}
          zoom={zoom}
          minZoom={9}
          scrollWheelZoom={true}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {mapMarkerData?.map((marker) => {
            const customIcon = new Icon({
              iconUrl: `/svgs/map_svgs/natureD.svg`,
              iconSize: [70, 70],
              iconAnchor: [22, 94],
              popupAnchor: [-3, -76],
            });
            return (
              <Marker
                icon={customIcon}
                position={latLng(
                  Number(marker.latitud),
                  Number(marker.longtitud)
                )}
                key={marker.id}
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
              center={mapCenter} // Use the same mapCenter for the fullscreen map
              zoom={zoom}
              minZoom={7}
              scrollWheelZoom={true}
              zoomControl={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {mapMarkerData?.map((marker) => {
                const customIcon = new Icon({
                  iconUrl: `/svgs/map_svgs/natureD.svg`,
                  iconSize: [70, 70],
                  iconAnchor: [22, 94],
                  popupAnchor: [-3, -76],
                });
                return (
                  <Marker
                    icon={customIcon}
                    position={latLng(
                      Number(marker.latitud),
                      Number(marker.longtitud)
                    )}
                    key={marker.id}
                  />
                );
              })}
            </MapContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default PlantTreeMap;
