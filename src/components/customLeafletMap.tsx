"use client";

import { FC } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { Icon, latLng, LatLng } from "leaflet";

const geojson = {
  features: [
    {
      id: 1,
      geometry: {
        coordinates: latLng(35.699736, 51.338057),
        icon: "loveD",
      },
    },
    {
      id: 2,
      geometry: {
        coordinates: latLng(35.74472, 51.375265),
        icon: "babysBirthD",
      },
    },
    {
      id: 3,
      geometry: {
        coordinates: latLng(35.70019216, 51.4055941),
        icon: "funeralD",
      },
    },
  ],
};
interface CustomMapboxProps {
  zoom?: number;
  initialPostion?: LatLng;
}

const CustomMapbox: FC<CustomMapboxProps> = ({
  zoom = 14,
  initialPostion = latLng(35.74472, 51.375265),
}) => {
  return (
    <MapContainer
      className="rounded-3xl w-full h-80"
      center={initialPostion}
      zoom={zoom}
      minZoom={11}
      scrollWheelZoom={true}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {geojson.features.map((marker) => {
        const customIcom = new Icon({
          iconUrl: `/svgs/map_svgs/${marker.geometry.icon}.svg`,
          iconSize: [70, 70], // size of the icon
          iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
          popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
        });
        return (
          <Marker
            icon={customIcom}
            position={marker.geometry.coordinates}
            key={marker.id}
          >
            {/* <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup> */}
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default CustomMapbox;
