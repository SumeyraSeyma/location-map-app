import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  name: String,
  latitude: Number,
  longitude: Number,
  color: String,
  createdAt: { type: Date, default: Date.now },
});

const Location = mongoose.model("Location", locationSchema);

export default Location;
