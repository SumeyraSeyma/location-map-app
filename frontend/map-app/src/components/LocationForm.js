import { useState, useEffect } from "react";
import useLocationStore from "../store/locationStore";

const LocationForm = () => {
  const {
    selectedLocation,
    resetSelectedLocation,
    addLocation,
    updateLocation,
    loading,
    error,
  } = useLocationStore();

  const [formData, setFormData] = useState({
    name: "",
    latitude: "",
    longitude: "",
    color: "#ff0000",
  });

  useEffect(() => {
    if (selectedLocation) {
      setFormData({
        name: selectedLocation.name || "",
        latitude: selectedLocation.latitude || "",
        longitude: selectedLocation.longitude || "",
        color: selectedLocation.color || "#ff0000",
      });
    } else {
      setFormData({
        name: "",
        latitude: "",
        longitude: "",
        color: "#ff0000",
      });
    }
  }, [selectedLocation]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const locationData = {
      name: formData.name,
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude),
      color: formData.color,
    };

    try {
      if (selectedLocation) {
        await updateLocation(selectedLocation._id, locationData);
        resetSelectedLocation();
      } else {
        await addLocation(locationData);
      }
      setFormData({ name: "", latitude: "", longitude: "", color: "#ff0000" });
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-semibold mb-4">
        {selectedLocation ? "Edit Location" : "Add New Location"}
      </h2>
      {loading && <p className="text-yellow-600 mb-2"> Loading...</p>}
      {error && <p className="text-red-600 mb-2"> Error: {error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {" "}
            Location Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {" "}
            Latitude{" "}
          </label>
          <input
            type="number"
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
            step="any"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {" "}
            Longitude{" "}
          </label>
          <input
            type="number"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
            step="any"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {" "}
            Color{" "}
          </label>
          <input
            type="color"
            name="color"
            value={formData.color}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
          disabled={loading}
        >
          {selectedLocation ? "Update Location" : "Add Location"}
        </button>
      </form>
    </div>
  );
};

export default LocationForm;
