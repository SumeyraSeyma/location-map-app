import { create } from "zustand";
import axiosInstance from "../lib/axios";

const useLocationStore = create((set) => ({
  locations: [],
  loading: false,
  error: null,
  route: [],
  selectedLocation: null,
  setLocations: (locations) => set({ locations }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setRoute: (route) => set({ route }),
  setSelectedLocation: (location) => set({ selectedLocation: location }),
  resetSelectedLocation: () => set({ selectedLocation: null }),

  fetchLocations: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get("/locations");
      set({ locations: response.data });
    } catch (error) {
      set({ error: error.message || "Locations could not be fetched" });
      console.error("Error fetching locations:", error);
    } finally {
      set({ loading: false });
    }
  },

  fetchRoute: async (latitude, longitude) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get(
        `/locations/routes?latitude=${latitude}&longitude=${longitude}`
      );
      set({ route: response.data.route || [] });
    } catch (error) {
      set({ error: error.message || "Route could not be fetched" });
      console.error("Error fetching route:", error.response?.status, error);
    } finally {
      set({ loading: false });
    }
  },

  fetchLocationDetails: async (locationId) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get(`/locations/${locationId}`);
      set({ selectedLocation: response.data });
    } catch (error) {
      set({ error: error.message || "Location details could not be fetched" });
      console.error(
        "Error fetching location details:",
        error.response?.status,
        error
      );
    } finally {
      set({ loading: false });
    }
  },

  addLocation: async (location) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post("/locations", location);
      const newLocation = response.data;
      set((state) => ({ locations: [...state.locations, newLocation] }));
    } catch (error) {
      set({ error: error.message || "Location could not be added" });
    } finally {
      set({ loading: false });
    }
  },

  updateLocation: async (locationId, updatedLocation) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.put(
        `/locations/${locationId}`,
        updatedLocation
      );
      const updatedData = response.data;
      set((state) => ({
        locations: state.locations.map((location) =>
          location._id === locationId ? updatedData : location
        ),
      }));
    } catch (error) {
      set({ error: error.message || "Location could not be updated" });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useLocationStore;
