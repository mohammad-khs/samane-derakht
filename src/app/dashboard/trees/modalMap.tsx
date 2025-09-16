"use client";

import { FC, useRef } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { Icon, latLng, Map } from "leaflet";

interface ModalMapProps {
  mapCenter: [number, number];
}

const ModalMap: FC<ModalMapProps> = ({ mapCenter }) => {
  const mapRef = useRef<Map>(null);

  const customIcon = new Icon({
    iconUrl: `/svgs/map_svgs/selectedMarker.svg`,
    iconSize: [70, 70],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
  });
  return (
    <>
      <div className="w-full border-2 p-3 rounded-[36px]">
        <MapContainer
          ref={mapRef}
          className="w-full rounded-3xl z-50 h-80"
          center={mapCenter}
          zoom={12}
          minZoom={6}
          scrollWheelZoom={true}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {
            <Marker
              icon={customIcon}
              position={latLng(Number(mapCenter[0]), Number(mapCenter[1]))}
            />
          }
        </MapContainer>
      </div>
    </>
  );
};

export default ModalMap;
