import { Router } from "express";

import {
  getAllLocations,
  getLocationById,
  createLocation,
  updateLocation,
  calculateRoute,
} from "../controller/locationController.js";

import {
  validateCreateLocation,
  validateUpdateLocation,
  validateRouteQuery,
} from "../middleware/validation.js";

const router = Router();

router.get("/routes",validateRouteQuery, calculateRoute)
router.get("/", getAllLocations);
router.get("/:id", getLocationById);
router.post("/", validateCreateLocation, createLocation);
router.put("/:id",validateUpdateLocation, updateLocation);

export default router;
