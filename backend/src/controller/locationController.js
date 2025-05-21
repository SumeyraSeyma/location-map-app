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

