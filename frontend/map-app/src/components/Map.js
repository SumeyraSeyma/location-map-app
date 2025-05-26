import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import useLocationStore from "../store/locationStore";

const Map = () => {
  const { locations, route } = useLocationStore();
  const defaultCenter = [39.9334, 32.8597];

  const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const calculateTotalDistance = () => {
    if (route.length < 2) return 0;
    let totalDistance = 0;
    for (let i = 0; i < route.length - 1; i++) {
      const loc1 = route[i];
      const loc2 = route[i + 1];
      const distance = haversineDistance(
        loc1.latitude,
        loc1.longitude,
        loc2.latitude,
        loc2.longitude
      );
      totalDistance += distance;
    }
    return totalDistance.toFixed(2);
  };

  const totalDistance = calculateTotalDistance();

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
    route.length > 0
      ? route.map((loc, index) => {
          if (index === route.length - 1) return null;
          const nextLoc = route[index + 1];
          const distance = haversineDistance(
            loc.latitude,
            loc.longitude,
            nextLoc.latitude,
            nextLoc.longitude
          ).toFixed(2);
          return (
            <Polyline
              key={index}
              positions={[
                [loc.latitude, loc.longitude],
                [nextLoc.latitude, nextLoc.longitude],
              ]}
              color="blue"
            >
              <Tooltip sticky>{distance} km</Tooltip>
            </Polyline>
          );
        })
      : null;

  return (
    <div className="w-full h-96 rounded-lg shadow-md overflow-hidden relative">
      {route.length > 1 && (
        <div className="absolute top-4 left-4 bg-white p-2 rounded-lg shadow-md z-[1000] text-sm ml-8">
          Total Distance: {totalDistance} km
        </div>
      )}
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
