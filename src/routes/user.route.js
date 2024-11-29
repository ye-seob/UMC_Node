import express from "express";
import {
  handleListUserMissions,
  handleListUserReviews,
  handleUserSignUp,
  handleUserUpdate,
} from "../controllers/user.controller.js";
import {
  handleMissionComplete,
  handleMissionStart,
} from "../controllers/mission.controller.js";

const router = express.Router();

router.post("/signup", handleUserSignUp);
router.post("/missions/start", handleMissionStart);
router.get("/:userId/reviews", handleListUserReviews);
router.get("/:userId/missions", handleListUserMissions);
router.put("/users/update", handleUserUpdate);
router.post("/users/missions/complete", handleMissionComplete);

export default router;
