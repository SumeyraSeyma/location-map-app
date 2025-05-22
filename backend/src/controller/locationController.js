import Location from "../models/Location.js";

export const getAllLocations = async (req, res) => {
  try {
    const locations = await Location.find();
    res.status(200).json(locations);
  } catch (error) {
    console.error("Error fetching locations:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getLocationById = async (req, res) => {
  const { id } = req.params;
  try {
    const location = await Location.findById(id);
    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }
    res.status(200).json(location);
  } catch (error) {
    console.error("Error fetching location:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const createLocation = async (req, res) => {
  const { name, latitude, longitude, color } = req.body;
  try {
    const newLocation = new Location({ name, latitude, longitude, color });
    await newLocation.save();
    res.status(201).json(newLocation);
  } catch (error) {
    console.error("Error creating location:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateLocation = async (req, res) => {
  const { id } = req.params;
  const { name, latitude, longitude, color } = req.body;
  try {
    const updatedLocation = await Location.findByIdAndUpdate(
      id,
      { name, latitude, longitude, color },
      { new: true }
    );
    if (!updatedLocation) {
      return res.status(404).json({ message: "Location not found" });
    }
    res.status(200).json(updatedLocation);
  } catch (error) {
    console.error("Error updating location:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const calculateRoute = async (req, res) => {
  const { latitude, longitude } = req.query;
  if (!latitude || !longitude) {
    return res.status(400).json({ message: "Latitude and longitude are required" });
  }

  try {
    const locations = await Location.find();
    if (locations.length === 0) {
      return res.status(404).json({ message: "No locations found" });
    }

    const haversineDistance = (lat1, lon1, lat2, lon2) => {
      const toRad = (value) => (value * Math.PI) / 180;
      const R = 6371; 
      const dLat = toRad(lat2 - lat1);
      const dLon = toRad(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c; 
    };

    const startPoint = { latitude: parseFloat(latitude), longitude: parseFloat(longitude) };
    let remainingLocations = [...locations];
    const route = [];
    let currentPoint = startPoint;

    while (remainingLocations.length > 0) {
      const distances = remainingLocations.map(loc => ({
        location: loc,
        distance: haversineDistance(
          currentPoint.latitude,
          currentPoint.longitude,
          loc.latitude,
          loc.longitude
        ),
      }));

      distances.sort((a, b) => a.distance - b.distance);
      const nearest = distances[0].location;
      route.push(nearest);

      remainingLocations = remainingLocations.filter(loc => loc._id.toString() !== nearest._id.toString());
      currentPoint = { latitude: nearest.latitude, longitude: nearest.longitude };
    }

    res.status(200).json({ route });
  } catch (error) {
    console.error("Error calculating route:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


