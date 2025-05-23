import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import useLocationStore from "../store/locationStore";

const Map = () => {
  const { locations, route } = useLocationStore();
  const defaultCenter = [39.9334, 32.8597];

  const createCustomIcon = (color) => {
    return L.divIcon({
      className: "custom-marker",
      html: `<div style="background-color: ${color}; width: 10px; height: 10px; border-radius: 50%; border: 2px solid ${color};"></div>`,
      iconSize: [10, 10],
      iconAnchor: [5, 5],
    });
  };

  const markers = locations.map((loc) => (
    <Marker
      key={loc._id}
      position={[loc.latitude, loc.longitude]}
      icon={createCustomIcon(loc.color || "#000000")}
    />
  ));

  const routeLine =
    route.length > 0 ? (
      <Polyline
        positions={route.map((loc) => [loc.latitude, loc.longitude])}
        color="blue"
      />
    ) : null;

  return (
    <div className="w-full h-96 rounded-lg shadow-md overflow-hidden">
      <MapContainer center={defaultCenter} zoom={6} className="w-full h-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {markers}
        {routeLine}
      </MapContainer>
    </div>
  );
};

export default Map;
