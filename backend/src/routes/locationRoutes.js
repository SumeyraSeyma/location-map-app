import { Router } from "express";

import {
  getAllLocations,
  getLocationById,
  createLocation,
  updateLocation,
} from "../controller/locationController.js";

const router = Router();

router.get("/", getAllLocations);
router.get("/:id", getLocationById);
router.post("/", createLocation);
router.put("/:id", updateLocation);

export default router;
