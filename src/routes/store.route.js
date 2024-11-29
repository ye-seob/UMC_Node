import express from "express";
import {
  handleListStoreMissions,
  handleListStoreReviews,
  handleAddStore,
} from "../controllers/store.contorller.js";
import { handleAddMission } from "../controllers/mission.controller.js";

const router = express.Router();
router.post("/", handleAddStore);
router.post("/:storeId/missions", handleAddMission);
router.get("/:storeId/reviews", handleListStoreReviews);
router.get(":storeId/missions", handleListStoreMissions);
export default router;
