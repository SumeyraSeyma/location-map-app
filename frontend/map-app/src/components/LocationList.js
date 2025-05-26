import { useState } from 'react';
import useLocationStore from '../store/locationStore';

const LocationList = () => {
  const { locations, setSelectedLocation, fetchRoute, loading } = useLocationStore();
  const [startLat, setStartLat] = useState('');
  const [startLon, setStartLon] = useState('');

  const handleRouteCalculation = async () => {
    if (startLat && startLon) {
      await fetchRoute(startLat, startLon);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Location List</h2>
      {loading && <p className="text-yellow-600 mb-2"> Loading...</p>}
      {locations.length === 0 ? (
        <p className="text-gray-500"> No locations found.</p>
      ) : (
        <ul className="space-y-2 h-48 overflow-y-auto">
          {locations.map((loc) => (
            <li key={loc._id} className="flex justify-between items-center p-2 bg-gray-100 rounded-md">
              <span>{loc.name} ({loc.latitude}, {loc.longitude})</span>
              <button
                className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
                onClick={() => setSelectedLocation(loc)}
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-6">
        <h3 className="text-xl font-medium mb-3"> Calculate Route</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="number"
            className="p-2 border border-gray-300 rounded-md"
            placeholder="Start Latitude"
            value={startLat}
            onChange={(e) => setStartLat(e.target.value)}
            step="any"
          />
          <input
            type="number"
            className="p-2 border border-gray-300 rounded-md"
            placeholder="Start Longitude"
            value={startLon}
            onChange={(e) => setStartLon(e.target.value)}
            step="any"
          />
        </div>
        <button
          className="mt-4 w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
          onClick={handleRouteCalculation}
          disabled={loading || !startLat || !startLon}
        >
            Calculate
        </button>
      </div>
    </div>
  );
};

export default LocationList;