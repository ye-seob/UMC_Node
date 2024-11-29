import express from "express";
import {
  handleListStoreMissions,
  handleListStoreReviews,
  handleStoreAdd,
} from "../controllers/store.contorller.js";
import { handleMissionAdd } from "../controllers/mission.controller.js";

const router = express.Router();
router.post("/", handleStoreAdd);
router.post("/:storeId/missions", handleMissionAdd);
router.get("/:storeId/reviews", handleListStoreReviews);
router.get(":storeId/missions", handleListStoreMissions);
export default router;
