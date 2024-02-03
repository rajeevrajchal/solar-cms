import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export type LOCATION_SELECTOR = {
  lat: number;
  lng: number;
};

interface DraggableMarkerProps {
  center: LOCATION_SELECTOR;
  changeLocation: (location: LOCATION_SELECTOR) => void;
}

const DraggableMarker = (props: DraggableMarkerProps) => {
  const { center, changeLocation } = props;

  useMapEvents({
    click(e) {
      changeLocation(
        e?.latlng || {
          lat: null,
          lng: null,
        }
      );
    },
    moveend: (e: any) => {
      changeLocation(
        e?.latlng || {
          lat: null,
          lng: null,
        }
      );
    },
  });

  return <Marker draggable position={center} />;
};

interface LocationSelectorProps {
  location: LOCATION_SELECTOR;
  changeLocation: (location: LOCATION_SELECTOR) => void;
}

const LocationSelector = (props: LocationSelectorProps) => {
  const { location, changeLocation } = props;

  return (
    <MapContainer
      center={location}
      zoom={18}
      scrollWheelZoom
      style={{
        minHeight: "30vh",
        height: "100%",
        width: "100%",
        borderRadius: "4px",
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <DraggableMarker center={location} changeLocation={changeLocation} />
    </MapContainer>
  );
};

export default LocationSelector;
