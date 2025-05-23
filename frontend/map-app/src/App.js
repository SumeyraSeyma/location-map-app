import { useEffect } from "react";
import Map from "./components/Map";
import LocationForm from "./components/LocationForm";
import LocationList from "./components/LocationList";

import useLocationStore from "./store/locationStore";

function App() {
  const { fetchLocations, loading, error } = useLocationStore();

  useEffect(() => {
    fetchLocations();
  }, [fetchLocations]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Location Management App</h1>
      {error && <p className="text-red-600 mb-2">Error: {error}</p>}
      <div className="mt-6">
        <Map />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div className="col-span-1">
          <LocationForm />
        </div>
        <div className="col-span-1">
          <LocationList />
        </div>
      </div>
    </div>
  );
}

export default App;
